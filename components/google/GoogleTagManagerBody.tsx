'use client';
import { useEffect, useState } from 'react';

interface Props {
    gtmId: string;
}

export const GoogleTagManagerBody = ({ gtmId }: Props) => {

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <></>;
    }

    return (
        <noscript>
            <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
        </noscript>
    )
}

export default GoogleTagManagerBody