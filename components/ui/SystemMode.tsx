'use client'

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { TbDeviceDesktopMinus, TbDeviceDesktopOff } from 'react-icons/tb';

import { isDarkMode, toggleSystemMode } from '@/store/themeMode/themeSlice';
import { changeThemeMode } from '@/helpers';

export const SystemMode = () => {

    const systemMode = useAppSelector(state => state.theme.systemMode);
    const dispatch = useAppDispatch();
   
    const setSystemMode = () => {

        if (typeof window === 'undefined' || !!systemMode ) return;

        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        dispatch( toggleSystemMode(!systemMode) );
        dispatch(isDarkMode(darkModeMediaQuery.matches));

        changeThemeMode(darkModeMediaQuery.matches);
        localStorage.setItem('systemMode', JSON.stringify(!systemMode));
        localStorage.removeItem('darkMode'); 
    }

    useEffect(() => {

        const localStorageSystemMode = localStorage.getItem('systemMode');

        if(localStorageSystemMode !== null ) {

            const themeMode:boolean = JSON.parse(localStorageSystemMode);

            dispatch( toggleSystemMode(themeMode) );
            localStorage.setItem('systemMode', JSON.stringify(themeMode));
        }
     
    }, [ dispatch ]);

    return (
        <div className="flex items-center cursor-pointer ml-3" onClick={ setSystemMode }>
            {
                systemMode ?
                    <TbDeviceDesktopMinus
                        size={25}
                        className="animate__animated animate__fadeIn" /> :
                    <TbDeviceDesktopOff
                        size={25}
                        className="animate__animated animate__fadeIn" />
            }
        </div>
    )
}

export default SystemMode;