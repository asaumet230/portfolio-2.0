import React from 'react'

import styles from './ui.module.css';

interface Props {
    width: string;
    height: string;
    color: string;
}

export const Spinner = ({ height, width, color }: Props) => {
    return (
        <div className={styles.spinner} style={{
            width: `${width}px`,
            height: `${height}px`,
        }}>
            <div className={styles['double-bounce1']} style={{
                backgroundColor: color,
            }}></div>
            <div className={styles['double-bounce2']} style={{
                backgroundColor: color,
            }}></div>
        </div>
    )
}

export default Spinner;