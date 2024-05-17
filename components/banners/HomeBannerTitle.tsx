'use client'

import { useState } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";

export const HomeBannerTitle = () => {

    const [ loop, setLoop ] = useState<boolean>(true);

    const [ text ] = useTypewriter({
        words: ['desarrollador web | móvil'],
        loop: 1,
        typeSpeed: 80,
        onLoopDone: () => {
            setTimeout(()=> {
                setLoop(false);
            },2000);
        },
    });

    return (
        <h1 className="text-5xl capitalize mb-4 max-[920px]:text-3xl max-[920px]:mb-2">
            { text }
            { loop && <Cursor /> }
        </h1>
    )
}

export default HomeBannerTitle;