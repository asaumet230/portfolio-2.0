'use client'

import { useEffect } from "react";
import { MdNightsStay, MdSunny } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/store";

import { isDarkMode, toggleDarkMode } from "@/store/themeMode/themeSlice";
import 'animate.css';

export const DarkMode = () => {

    const darkMode = useAppSelector(state => state.theme.darkMode);
    const dispatch = useAppDispatch();
  
    useEffect(() => {

        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const localStorageThemeMode = localStorage.getItem('darkMode');

        if(localStorageThemeMode !== null) {

            dispatch( isDarkMode( JSON.parse(localStorageThemeMode) ));

        } else {

            if (typeof window === 'undefined') return;
            dispatch(isDarkMode(darkModeMediaQuery.matches));
        }

        const updateTheme = (e: MediaQueryListEvent) => dispatch(isDarkMode(e.matches));

        darkModeMediaQuery.addEventListener('change', updateTheme);

        return () => darkModeMediaQuery.removeEventListener('change', updateTheme);

    }, [ dispatch ]);


    return (
        <div className="flex items-center cursor-pointer ml-3" onClick={() => dispatch(toggleDarkMode())}>
            {
                darkMode ?
                    <MdNightsStay
                        size={25}
                        className="animate__animated animate__fadeIn" /> :
                    <MdSunny
                        size={25}
                        className="animate__animated animate__fadeIn" />
            }
        </div>
    )
}

export default DarkMode;