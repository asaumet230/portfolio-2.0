'use client'

import { useEffect, useState } from "react";
import { MdNightsStay, MdSunny } from "react-icons/md";

import 'animate.css';


export const DarkMode = () => {

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const updateTheme = (e: MediaQueryListEvent) => {

            if (e.matches) {
                setDarkMode(true);
                document.documentElement.classList.add('dark');

            } else {
                setDarkMode(false);
                document.documentElement.classList.remove('dark');
            }
        };

        if (darkModeMediaQuery.matches) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        }

        darkModeMediaQuery.addEventListener('change', updateTheme);

        return () => {
            darkModeMediaQuery.removeEventListener('change', updateTheme);
        };
    }, []);

    const toggleDarkMode = () => {
        if (darkMode) {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        } else {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    };

    return (
        <div className="flex items-center cursor-pointer ml-3" onClick={toggleDarkMode}>
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