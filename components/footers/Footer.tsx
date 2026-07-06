'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { SocialMediaLinks } from '../ui';
import { FaPhone } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

export const Footer = () => {
  const { data: session } = useSession();
  return (
    <div className='bg-slate-100 pt-8 dark:bg-[#262f3a]'>
      <div className='section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>

        <div className='text-center max-[640px]:py-1'>
          <h3 className='text-xl max-[640px]:text-lg'>Paginas</h3>
          <nav className='py-3'>
            <ul>
              <li className='py-1'>
                <Link href={'/proyectos-desarrollo-web-y-aplicaciones-moviles'}>Proyectos Destacados</Link>
              </li>
              <li className='py-1'>
                <Link href={'/contactame'}>Contactame</Link>
              </li>
              <li className='py-1'>
                <Link href={'/blog-de-tecnologia'}>Blog de Tecnología</Link>
              </li>
              {session ? (
                <li className='py-1'>
                  <Link href={'/dashboard'}>Dashboard</Link>
                </li>
              ) : (
                <>
                  <li className='py-1'>
                    <Link href={'/login'}>Inicia Sesión</Link>
                  </li>
                  <li className='py-1'>
                    <Link href={'/registro'}>Registrate</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>

       <div className='text-center max-[640px]:py-1'>
          <h3 className='text-xl max-[640px]:text-lg'>Herramientas</h3>
          <nav className='py-3'>
            <ul>
              <li className='py-1'>
                <Link href={'/herramientas/convertidor-de-imagenes'}>Convertidor de imágenes</Link>
              </li>
              <li className='py-1'>
                <Link href={'/herramientas/comprimir-imagenes-gratis'}>Comprimir imágenes gratis</Link>
              </li>
              <li className='py-1'>
                <Link href={'/herramientas/mayusculas-minusculas'}>Minúscula a Mayúscula</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className='text-center max-[640px]:py-1'>
          <h3 className='text-xl max-[640px]:text-lg'>Políticas</h3>
          <nav className='py-3'>
            <ul>
              <li className='py-1'>
                <Link href={'/terminos-y-condiciones'}>Términos y condiciones</Link>
              </li>
              <li className='py-1'>
                <Link href={'/politica-privacidad-y-proteccion-datos'}>Política de privacidad</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className='text-center max-[640px]:py-1'>
          <h3 className='text-xl max-[640px]:text-lg'>Sigueme en Redes</h3>
          <nav className='py-3'>
            <SocialMediaLinks
              isNextTo={false}
              size={25}
              marginStyle='mx-2'/>
          </nav>
          <ul className='space-y-3 text-base mt-5'>
            <li>
              <h3 className='text-xl max-[640px]:text-lg'>Andres Saumet Software Developer</h3>
            </li>
            <li>
              <a
                href='tel:+573017826682'
                className='flex items-center justify-center gap-2 hover:opacity-70 transition-opacity'
                aria-label='Llamar a Andres Saumet'
              >
                <FaPhone className='shrink-0 text-black dark:text-white' size={14} />
                <span>+57 301 782 6682</span>
              </a>
            </li>
            <li>
              <a
                href='https://maps.app.goo.gl/K9cTSD5XAx21f6qB7'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-start justify-center gap-2 hover:opacity-70 transition-opacity'
                aria-label='Ver ubicación en Google Maps'
              >
                <FaLocationDot className='mt-0.5 shrink-0 text-black dark:text-white' size={15} />
                <span>Calle 26 # 2A - 36,<br />Santa Marta - Magdalena</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='w-11/12 mx-auto pt-5 pb-1'>
        <p className='text-center font-light py-2 max-[500px]:text-sm'> Todos los derechos reservados <strong>Andres Saumet { new Date().getFullYear() } ©</strong></p>
      </div>
    </div>
  )
}

export default Footer;