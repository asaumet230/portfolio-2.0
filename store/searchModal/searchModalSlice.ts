import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISearchModal {
    isModalOpen: boolean;
}

const initialState: ISearchModal = {
    isModalOpen: false,
}

export const searchModalSlice = createSlice({
  name: 'searchModal',
  initialState,
  reducers: {
    toggleModal( state, action:PayloadAction<boolean> ) {
        state.isModalOpen = action.payload;
    }
  }
});

export const { toggleModal } = searchModalSlice.actions

export default searchModalSlice.reducer
