import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ISidebar {
    isSidebarOpen: boolean;
}

const initialState: ISidebar = {
    isSidebarOpen: false,
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar(state, action:PayloadAction<boolean> ) {
        state.isSidebarOpen = action.payload;
    }
  }
});

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;