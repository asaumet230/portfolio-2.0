'use client'
import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {

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
    <div>
      <Link href="/">
        <Image
          priority
          height={100}
          width={170}
          src={isDarkImage === 'light' ? "/images/logo-andres-saumet.webp" : "/images/logo-andres-saumet-dark-1.webp"}
          alt={"logo-andres-saumet"} className='images' />
      </Link>
    </div>
  )
}

export default Logo;