'use client'

import { useState } from "react";
import { MdNightsStay, MdSunny } from "react-icons/md";

import 'animate.css';


export const DarkMode = () => {

    const [ darkMode, setDarkMode ] = useState(false);

    return (
        <div className="flex items-center cursor-pointer ml-3" onClick={ () => setDarkMode(!darkMode) }>
            {
                darkMode ? 
                <MdNightsStay 
                    size={25} 
                    className="animate__animated animate__fadeIn"/> : 
                <MdSunny 
                    size={25} 
                    className="animate__animated animate__fadeIn"/>
            }
        </div>
    )
}

export default DarkMode;