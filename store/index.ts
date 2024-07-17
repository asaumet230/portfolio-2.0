import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import themeReducer from './themeMode/themeSlice';
import modalReducer from './searchModal/searchModalSlice';
import sidebarReducer from './sidebar/sidebarSlice';

export const store = configureStore({
    reducer: {
       theme: themeReducer,
       modal: modalReducer,
       sidebar: sidebarReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch  

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
