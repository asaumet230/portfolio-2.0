import Link from 'next/link';

import { SocialMediaLinks } from '../ui';

export const Footer = () => {
  return (
    <div className='bg-slate-100 pt-8'>
      <div className='section grid grid-cols-3 max-[640px]:grid-cols-1'>

        <div className='text-center max-[640px]:py-1'>
          <h3 className='text-xl max-[640px]:text-lg'>Paginas</h3>
          <nav className='py-3'>
            <ul>
              <li className='py-1'>
                <Link href={'/proyectos-destacados'}>Proyectos Destacados</Link>
              </li>
              <li className='py-1'>
                <Link href={'/contactame'}>Contactame</Link>
              </li>
              <li className='py-1'>
                <Link href={'/blog'}>Blog</Link>
              </li>
              <li className='py-1'>
                <Link href={'/login'}>Inicia Sesión</Link>
              </li>
              <li className='py-1'>
                <Link href={'/registro'}>Registrate</Link>
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
              size={25} 
              marginStyle='mx-2'/>
          </nav>
        </div>
      </div>
      <div className='w-11/12 mx-auto pt-5 pb-1'>
        <p className='text-center font-light py-2 max-[500px]:text-sm'> Todos los derechos reservados <strong>Andres Saumet { new Date().getFullYear() } ©</strong></p>
      </div>
    </div>
  )
}

export default Footer;