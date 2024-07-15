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
      action.payload ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
    },
    isSystemMode (state, action: PayloadAction<boolean>){
      state.systemMode = action.payload;
      localStorage.setItem('systemMode', JSON.stringify(state.systemMode));
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      state.systemMode = false;
      state.darkMode ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
      localStorage.setItem('systemMode', JSON.stringify(state.systemMode));
    },
    toggleSystemMode(state) {
      state.systemMode = true;
      localStorage.setItem('systemMode', JSON.stringify(state.systemMode));
      localStorage.removeItem('darkMode'); 
    }
  }
});

export const { isDarkMode, isSystemMode, toggleDarkMode, toggleSystemMode } = themeSlice.actions;

export default themeSlice.reducer;