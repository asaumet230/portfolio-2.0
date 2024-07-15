'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {  useAppSelector } from '@/store';

export const Logo = () => {

  const darkMode = useAppSelector(state => state.theme.darkMode );

  return (
    <div>
      <Link href="/">
        <Image
          priority
          height={100}
          width={170}
          src={ darkMode ? "/images/logo-andres-saumet-dark-1.webp" : "/images/logo-andres-saumet.webp" }
          alt={"logo-andres-saumet"} className='images' />
      </Link>
    </div>
  )
}

export default Logo;