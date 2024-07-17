'use client'

import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa6';
import 'animate.css';

import { SocialMediaLinks } from '.';
import styles from './ui.module.css';


export const SocialShareSidebar = () => {

  const [socialSidebar, setSocialSidebar] = useState(false);

  const toggleVisibility = () => {

    if (window.scrollY > 480) {
      setSocialSidebar(true);
    } else if (window.scrollY < 480) {
      setSocialSidebar(false);
    }
  }

  const ScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  useEffect(() => {

    document.addEventListener('scroll', toggleVisibility);

    return () => {
      document.removeEventListener('scroll', toggleVisibility);
    }
  }, [socialSidebar]);


  return (
    <>
      {
        socialSidebar && (
          <div className={`${styles['social-share-sidebar']} animate__animated animate__fadeIn`}>
            <p className={`rotate-90 my-10 font-semibold uppercase ${styles['social-share-message']}`}>Sigueme</p>
            <nav className='rotate-90 my-8 w-full'>
              <SocialMediaLinks
                isNextTo={true}
                size={23}
                marginStyle={'my-3 mx-1'} />
            </nav>
            <div className={`${styles['social-back-top-button']} bg-black hover:bg-slate-500 dark:bg-slate-500 dark:hover:bg-white dark:hover:text-black`} onClick={ScrollTop}>
              <FaArrowUp />
            </div>
          </div>
        )
      }
    </>
  )
}

export default SocialShareSidebar;