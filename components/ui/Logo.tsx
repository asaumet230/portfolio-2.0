'use client'

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/store';

export const Logo = () => {

  const darkMode = useAppSelector(state => state.theme.darkMode);
  const pathname = usePathname();

  function getLogoSrc(pathname: string, darkMode: boolean): string {

    switch (true) {
      case pathname.startsWith('/herramientas/convertidor-de-imagenes'):
        return darkMode
          ? '/images/sharpconvert-dark.webp'
          : '/images/sharpconvert-light.webp';

      case pathname.startsWith('/herramientas/comprimir-imagenes-gratis'):
        return darkMode
          ? '/images/compressly-dark.webp'
          : '/images/compressly-light.webp';

      case pathname.startsWith('/herramientas/minuscula-a-mayuscula'):
        return darkMode
          ? '/images/textcasepro-dark.webp'
          : '/images/textcasepro-light.webp'

      default:
        return darkMode
          ? '/images/logo-andres-saumet-dark.webp'
          : '/images/logo-andres-saumet.webp';
    }
  }

  function getLogoDimensions(pathname: string): { width: number; height: number } {

    switch (true) {

      case pathname.startsWith('/herramientas/convertidor-de-imagenes'):
        return { width: 125, height: 125 };

      case pathname.startsWith('/herramientas/comprimir-imagenes-gratis'):
        return { width: 129, height: 129 };

      case pathname.startsWith('/herramientas/minuscula-a-mayuscula'):
        return { width: 125, height: 125 };

      default:
        return { width: 170, height: 100 };
    }
  }

  const logoSrc = getLogoSrc(pathname, darkMode);
  const { width, height } = getLogoDimensions(pathname);

  return (
    <div>
      <Link href="/">
        <Image
          priority
          height={height}
          width={width}
          src={logoSrc}
          alt={"logo-andres-saumet"} className='images' />
      </Link>
    </div>
  )
}

export default Logo;