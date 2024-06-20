import Image from 'next/image';
import { FaGithub } from 'react-icons/fa6';
import { HiDevicePhoneMobile } from 'react-icons/hi2';
import { SiDart, SiFlutter } from 'react-icons/si';

import styles from './projects.module.css';


export const MobilProjectDescription = () => {

  return (
    <article className='grid grid-cols-2 bg-white border border-slate-300 rounded-xl justify-between max-[1305px]:grid-cols-1'>
      <div className='w-full p-4 bg-slate-300 rounded-tl-xl rounded-bl-xl flex justify-center align-middle items-center max-[985px]:p-3 max-[985px]:rounded-tr-xl max-[985px]:rounded-bl-none'>
        <Image
          className='images'
          height="300"
          width="169"
          src='/images/proyects/cinemapedia-app-1.webp' 
          alt='cinemapedia-app-1' />
        <Image
          className='images max-[750px]:hidden'
          height="300"
          width="169"
          src='/images/proyects/cinemapedia-app-2.webp' 
          alt='cinemapedia-app-2' />
      </div>

      <div className='py-6 px-10'>
        <h3 className='text-xl capitalize'>Cinemapedia</h3>
        <p className='font-light text-sm  mt-1 leading-relaxed'>Desarrollé una aplicación con Flutter y Dart, utilizando el patrón de diseño Domain-Driven Design (DDD) para proporcionar una guía completa de películas que incluye descripciones detalladas, calificaciones y tráilers. Esta solución, diseñada especialmente para cinéfilos, facilita la exploración y descubrimiento de nuevos filmes a través de una interfaz intuitiva, mejorando significativamente la experiencia de selección de contenido cinematográfico.</p>
        <h4 className='text-lg text-left mt-4 capitalize'>tecnologías usadas:</h4>
        <div className='flex justify-evenly mt-3 w-9/12 mx-auto'>
          <SiFlutter size={35} />
          <SiDart size={35} />
        </div>
        <h4 className='text-lg text-left mt-4 capitalize'>código fuente:</h4>
        <div className='mt-4 flex mx-auto justify-center'>
          <a href="https://www.eferta.com" className={styles['card-button']}>
            <HiDevicePhoneMobile />
            <p className='capitalize ml-1'>app</p>
          </a>
          <a href="https://www.eferta.com" className={`${styles['card-button']} ml-2`}>
            <FaGithub />
            <p className='capitalize ml-1'>Codígo</p>
          </a>
        </div>
      </div>
    </article>
  )
}

export default MobilProjectDescription;