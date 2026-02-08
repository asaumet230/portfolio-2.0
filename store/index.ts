import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import imagesReducer from "./imageComponentsLoad/imagesComponentsLoad";
import modalReducer from './searchModal/searchModalSlice';
import sidebarReducer from './sidebar/sidebarSlice';
import themeReducer from './themeMode/themeSlice';
import authReducer from './auth/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        imagesComponentsLoad: imagesReducer,
        modal: modalReducer,
        sidebar: sidebarReducer,
        theme: themeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
