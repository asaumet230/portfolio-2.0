import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  user: User | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  token: null,
  user: null,
  error: null,
};

const API_BASE = process.env.NEXT_PUBLIC_API_PATH || 'http://localhost:8080/api';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Login failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred'
      );
    }
  }
);

export const renewToken = createAsyncThunk(
  'auth/renewToken',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE}/auth/renew`, {
        method: 'GET',
        headers: {
          'x-token': token,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Token renewal failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred'
      );
    }
  }
);

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get('auth-token');

      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await fetch(`${API_BASE}/auth/renew`, {
        method: 'GET',
        headers: {
          'x-token': token,
        },
      });

      if (!response.ok) {
        Cookies.remove('auth-token');
        return rejectWithValue('Token invalid or expired');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      Cookies.remove('auth-token');
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.error = null;
      Cookies.remove('auth-token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;

      // Save token to cookies
      Cookies.set('auth-token', action.payload.token, {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      });
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.error = action.payload as string;
    });

    // Renew Token
    builder.addCase(renewToken.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(renewToken.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;

      // Update token in cookies
      Cookies.set('auth-token', action.payload.token, {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      });
    });
    builder.addCase(renewToken.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.error = action.payload as string;
      Cookies.remove('auth-token');
    });

    // Check Auth
    builder.addCase(checkAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;
    });
    builder.addCase(checkAuth.rejected, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.error = null;
    });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
