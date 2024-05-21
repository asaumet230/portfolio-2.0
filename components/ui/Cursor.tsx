'use client'

import { useEffect } from 'react';

export const Cursor = () => {
   

    useEffect(() => {
        document.addEventListener('mousemove', (e) => {
            const cursor = document.getElementById('custom-cursor')!;
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        return () => {
            document.removeEventListener('mousemove', () => {});
        }
    }, []);

    return (
        <div
            id="custom-cursor"
            style={{
                position: 'fixed',
                pointerEvents: 'none',
                left: '0',
                top: '0',
                zIndex: '10000'
            }}>
            <svg width="30" height="30" viewBox="0 0 32 32">
                <circle cx="15" cy="15" r="10" fill="transparent" stroke="black" strokeWidth="1" />
                <circle cx="15" cy="15" r="2" fill="black" />
            </svg>
        </div>
    )
}

export default Cursor;