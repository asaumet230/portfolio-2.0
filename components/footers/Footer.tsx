import Link from 'next/link';

import { SocialMediaLinks } from '../ui';

export const Footer = () => {
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
                <Link href={'/herramientas/minuscula-a-mayuscula'}>Minúscula a Mayúscula</Link>
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
        </div>
      </div>
      <div className='w-11/12 mx-auto pt-5 pb-1'>
        <p className='text-center font-light py-2 max-[500px]:text-sm'> Todos los derechos reservados <strong>Andres Saumet { new Date().getFullYear() } ©</strong></p>
      </div>
    </div>
  )
}

export default Footer;