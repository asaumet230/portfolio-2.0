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
      <div className={`${styles.progressBar}`}>
        <div
          className='h-full bg-gradient-to-r to-[#8183b6] from-[#abb1e4] transition-all ease-in-out duration-200 text-center dark:bg-gradient-to-r dark:from-indigo-500 dark:to-indigo-700'
          style={{ width: `${progressBar}%` }}></div>
      </div>

    </div>
  );
};

export default ProgressBar;
