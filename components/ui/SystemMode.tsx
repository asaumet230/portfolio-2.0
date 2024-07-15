'use client'

import { useAppDispatch, useAppSelector } from '@/store';
import { useEffect } from 'react';
import { TbDeviceDesktopMinus, TbDeviceDesktopOff } from 'react-icons/tb';

import { isDarkMode, isSystemMode, toggleSystemMode } from '@/store/themeMode/themeSlice';

export const SystemMode = () => {

    const systemMode = useAppSelector(state => state.theme.systemMode);
    const dispatch = useAppDispatch();
   
    const setSystemMode = () => {

        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        if( systemMode ) return;
        dispatch( toggleSystemMode() );

        if (typeof window === 'undefined') return;
        dispatch(isDarkMode(darkModeMediaQuery.matches));
    }

    useEffect(() => {

        const localStorageSystemMode = localStorage.getItem('systemMode');

        if(localStorageSystemMode !== null ) {
            dispatch( isSystemMode(JSON.parse(localStorageSystemMode)) );
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