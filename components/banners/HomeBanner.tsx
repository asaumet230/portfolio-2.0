'use client'
import { useEffect, useState } from 'react';

import Image from 'next/image';

import { Separator } from '../ui';
import { HomeBannerTitle } from './';

export const HomeBanner = () => {

  const [isDarkImage, setIsDarkImage] = useState('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {

      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDarkImage(darkModeMediaQuery.matches ? 'dark' : 'light');

      const handleChange = (e: MediaQueryListEvent) => {
        setIsDarkImage(e.matches ? 'dark' : 'light');
      };

      darkModeMediaQuery.addEventListener('change', handleChange);
      return () => darkModeMediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  return (
    <header className="pt-6">
      <div className="container grid grid-cols-2 max-[920px]:flex flex-col-reverse">

        <div className="flex flex-col justify-center text-left p-3 max-[920px]:text-center">
          <p className="font-semibold text-2xl capitalize mb-4 max-[920px]:text-xl">Hola soy Andres Felipe,</p>
          <HomeBannerTitle />

          <div className="max-[920px]:flex justify-center">
            <Separator />
          </div>

          <p className="text-lg mb-8 pr-8 max-[920px]:pr-0">Explora el arte de la tecnología a través de mi portafolio, donde mis 4 años de experiencia en desarrollo web y móvil se traducen en soluciones creativas y robustas para cada desafío digital.</p>

          <div>
            <a
              href='#about-me-section'
              className="btn w-40">Mas Información</a>
          </div>

        </div>

        <div className="bg-slate-200 flex justify-center animate__animated animate__fadeIn dark:bg-transparent">
          <Image
            priority
            className='images'
            width={600}
            height={600}
            src={isDarkImage === 'light' ? "/images/andres-felipe-saumet-desarrollador-web-movil.webp" : "/images/andres-felipe-saumet-desarrollador-web-movil-dark.webp"}
            alt="andres-felipe-saumet" />
        </div>

      </div>
    </header>
  )
}

export default HomeBanner;