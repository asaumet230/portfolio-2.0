import Link from 'next/link';
import { FaLinkedin, FaSquareInstagram, FaSquareXTwitter } from 'react-icons/fa6';

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
            </ul>
          </nav>
        </div>
        <div className='text-center max-[640px]:py-1'>
          <h3 className='text-xl max-[640px]:text-lg'>Políticas</h3>
          <nav className='py-3'>
            <ul>
              <li className='py-1'>
                <Link href={'/terminos-condiciones'}>Términos y condiciones</Link>
              </li>
              <li className='py-1'>
                <Link href={'/politica-privacidad'}>Política de privacidad</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className='text-center max-[640px]:py-1'>
          <h3 className='text-xl max-[640px]:text-lg'>Sigueme en Redes</h3>
          <nav className='py-3'>
            <ul className='flex justify-center'>
              <li className='my-1 mx-2  transition-all ease-in-out hover:scale-125'>
                <a href="https://www.instagram.com/pipesaumet/" target="_blank" rel="noopener noreferrer"><FaSquareInstagram size={24} /></a>
              </li>
              <li className='my-1 mx-2 transition-all ease-in-out hover:scale-125'>
                <a href="https://twitter.com/SaumetAndres" target="_blank" rel="noopener noreferrer"><FaSquareXTwitter size={24} /></a>
              </li>
              <li className='my-1 mx-2 transition-all ease-in-out hover:scale-125'>
                <a href="https://www.linkedin.com/in/andresfelipesaumet/" target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} /></a>
              </li>
            </ul>
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