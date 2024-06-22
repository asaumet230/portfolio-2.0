import React from 'react'

import styles from './ui.module.css';

export const Spinner = () => {
    return (
        <div className={styles.spinner}>
            <div className={styles['double-bounce1']}></div>
            <div className={styles['double-bounce2']}></div>
        </div>
    )
}

export default Spinner;