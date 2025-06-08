import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IImagesLoad {
  isImagesLoad: boolean;
  isSelectedFiles: boolean;
}

const initialState: IImagesLoad = {
  isImagesLoad: false,
  isSelectedFiles: false,
}

export const imagesComponentsLoad = createSlice({
  name: 'imagesComponentsLoad',
  initialState,
  reducers: {
    isImagesLoad(state, action: PayloadAction<boolean>) {
      state.isImagesLoad = action.payload;
    },
    isSelectedFiles(state, action: PayloadAction<boolean>) {
      state.isSelectedFiles = action.payload;
    },
  }
});

export const { isImagesLoad, isSelectedFiles } = imagesComponentsLoad.actions

export default imagesComponentsLoad.reducer
