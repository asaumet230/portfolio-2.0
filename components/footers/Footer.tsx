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
                <Link href={'/trabajos'}>Trabajos</Link>
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
              <li className='my-1 mx-2'>
                <a href="/"><FaSquareInstagram size={24} /></a>
              </li>
              <li className='my-1 mx-2'>
                <a href="/"><FaSquareXTwitter size={24} /></a>
              </li>
              <li className='my-1 mx-2'>
                <a href="/"><FaLinkedin size={24} /></a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className='w-11/12 mx-auto pt-5'>
        <p className='text-center font-light py-2'> Todos los derechos reservados <strong>Andres Saumet { new Date().getFullYear() } ©</strong></p>
      </div>
    </div>
  )
}

export default Footer;