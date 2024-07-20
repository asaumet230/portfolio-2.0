'use client'

import { useState } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";


export const HomeBannerTitle = () => {

    const [ loop, setLoop ] = useState<boolean>(true);

    const [ text ] = useTypewriter({
        words: ['Especialista en Desarrollo Web | Aplicaciones Móviles'],
        loop: 1,
        typeSpeed: 80,
        onLoopDone: () => {
            setTimeout(()=> {
                setLoop(false);
            },2000);
        },
    });

    return (
        <h1 className="text-5xl capitalize mb-4 max-[920px]:text-3xl max-[920px]:mb-2 max-[640px]:text-3xl dark:text-indigo-600">
            { text }
            { loop && <Cursor /> }
        </h1>
    )
}

export default HomeBannerTitle;