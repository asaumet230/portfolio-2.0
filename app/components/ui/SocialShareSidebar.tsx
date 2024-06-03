'use client'

import { useState, useEffect } from 'react';

import {
  FaLinkedin,
  FaSquareXTwitter,
  FaSquareInstagram,
  FaArrowUp
} from 'react-icons/fa6';

import 'animate.css';

import styles from './ui.module.css';

export const SocialShareSidebar = () => {

  const [ socialSidebar, setSocialSidebar ] = useState(false);

  const toggleVisibility = () => {

    if (window.scrollY > 480) {
      setSocialSidebar(true);
    } else if (window.scrollY < 480) {
      setSocialSidebar(false);
    }
  }

  const ScrollTop = () => {
    window.scrollTo({
        top:0,
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
            <div>
              <ul>
                <li className='my-3 cursor-pointer transition-all ease-in-out hover:scale-125'>
                  <a 
                    href="https://www.instagram.com/pipesaumet/" 
                    target="_blank" 
                    rel="noopener noreferrer"><FaSquareInstagram size={22} /></a>
                  
                </li>
                <li className='my-3 cursor-pointer transition-all ease-in-out hover:scale-125'>
                  <a 
                    href="https://twitter.com/SaumetAndres" 
                    target="_blank" 
                    rel="noopener noreferrer"><FaSquareXTwitter size={22} /></a>
                </li>
                <li className='my-3 cursor-pointer transition-all ease-in-out hover:scale-125'>
                  <a 
                    href="https://www.linkedin.com/in/andresfelipesaumet/" 
                    target="_blank" 
                    rel="noopener noreferrer"><FaLinkedin size={22} /></a>
                </li>
              </ul>
            </div>
            <div className={styles['social-back-top-button']} onClick={ScrollTop}>
              <FaArrowUp />
            </div>
          </div>
        )
      }
    </>
  )
}

export default SocialShareSidebar;