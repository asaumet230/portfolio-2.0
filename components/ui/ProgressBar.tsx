'use client'

import { FC, useEffect, useState } from 'react';
import styles from './ui.module.css';


interface Props {
  progress: number
}

export const ProgressBar: FC<Props> = ({ progress = 0 }) => {

  const [progressBar, setProgressBar] = useState(0);
  const [initProgress, setInitProgress] = useState(false);


  const setProgress = () => {
    if(window.scrollY >= 480) {
      setInitProgress(true);
    } else {
      setInitProgress(false);
    }
  }

  useEffect(()=> {

    window.addEventListener('scroll', setProgress);

    return () => {
      window.removeEventListener('scroll', setProgress);
    }
  });


  useEffect(() => {

    if(!initProgress) return;

    const interval = setInterval(() => {

      setProgressBar((prevProgress: number) => {

        const newProgress = prevProgress + 10;
        return newProgress <= progress ? newProgress : progress;

      });

    }, 50);

    return () => {
      clearInterval(interval);
    };

  }, [progress, initProgress]);


  return (

    <div>
      <p className='text-xl text-center font-bold mb-1'>{progressBar} %</p>
      <div className={`${styles.progressBar} w-36 max-[400px]:w-44`}>
        <div
          className={styles.progress}
          style={{ width: `${progressBar}%` }}></div>
      </div>

    </div>
  );
};

export default ProgressBar;
