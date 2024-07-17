import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ThemeState {
  darkMode: boolean;
  systemMode: boolean;
}

const initialState: ThemeState = {
  darkMode: false,
  systemMode: true,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {

    isDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
    },

    toggleDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
      state.systemMode = false;
    },

    toggleSystemMode(state, action: PayloadAction<boolean>) {
      state.systemMode = action.payload;
    }
  }
});

export const { isDarkMode, toggleDarkMode, toggleSystemMode } = themeSlice.actions;

export default themeSlice.reducer;