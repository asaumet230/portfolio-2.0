'use client'

import { useEffect } from "react";
import { MdNightsStay, MdSunny } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/store";

import { isDarkMode, toggleDarkMode } from "@/store/themeMode/themeSlice";
import { SocialMediaMessage } from ".";
import { changeThemeMode } from "@/helpers";
import 'animate.css';


export const DarkMode = () => {

    const darkMode = useAppSelector(state => state.theme.darkMode);
    const dispatch = useAppDispatch();


    useEffect(() => {

        if (typeof window === 'undefined') return;

        const localStorageThemeMode = localStorage.getItem('darkMode');
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        if (localStorageThemeMode !== null) {

            const themeMode: boolean = JSON.parse(localStorageThemeMode);
            dispatch(isDarkMode(themeMode));
            changeThemeMode(themeMode);

        } else {

            dispatch(isDarkMode(darkModeMediaQuery.matches));
            changeThemeMode(darkModeMediaQuery.matches);

        }

        const updateTheme = (e: MediaQueryListEvent) => {
            dispatch(isDarkMode(e.matches));
            changeThemeMode(e.matches);
        };

        darkModeMediaQuery.addEventListener('change', updateTheme);
        return () => darkModeMediaQuery.removeEventListener('change', updateTheme);

    }, [dispatch]);


    const setDarkMode = (mode: boolean) => {

        dispatch(toggleDarkMode(mode));
        changeThemeMode(mode);
        localStorage.setItem('darkMode', JSON.stringify(mode));
        localStorage.setItem('systemMode', JSON.stringify(false));
    }


    return (
        <div className="flex items-center cursor-pointer ml-3" onClick={() => setDarkMode(!darkMode)}>
            {
                darkMode ?
                    (<div className="group relative">
                        <SocialMediaMessage title="Modo Noche" isNextTo={true} />
                        <MdNightsStay
                            size={20}
                            className="animate__animated animate__fadeIn" />
                    </div>)
                    :
                    (<div className="group relative">
                        <SocialMediaMessage title="Modo Día" isNextTo={true} />
                        <MdSunny
                            size={20}
                            className="animate__animated animate__fadeIn" />
                    </div>)

            }
        </div>
    )
}

export default DarkMode;