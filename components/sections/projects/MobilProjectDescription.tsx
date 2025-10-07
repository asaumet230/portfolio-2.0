import Link from 'next/link';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa6';
import { HiDevicePhoneMobile } from 'react-icons/hi2';
import { SiDart, SiFlutter } from 'react-icons/si';

import styles from './projects.module.css';
import { IProject } from '@/interfaces';

interface Props {
  project: IProject;
}


export const MobilProjectDescription = ({ project }: Props) => {

  return (
    <article className='grid grid-cols-2 bg-white border border-slate-300 rounded-xl justify-between max-[1305px]:grid-cols-1 dark:bg-[#262f3a]'>
      <div className='w-full p-4 bg-slate-300 rounded-tl-xl rounded-bl-xl flex justify-center align-middle items-center max-[985px]:p-3 max-[985px]:rounded-tr-xl max-[985px]:rounded-bl-none'>


        {
          project.images.length > 1 ? (
            <>
              <Image
                priority
                className='object-contain'
                height="400"
                width="225"
                src={project.images[0]}
                alt={project.name} />
              <Image
                priority
                className='object-contain max-[750px]:hidden'
                height="400"
                width="225"
                src={project.images[1]}
                alt={project.name} />
            </>
          ) : (
            <Image
              priority
              className='object-contain'
              height="400"
              width="225"
              src={project.images[0]}
              alt={project.name} />
          )
        }
      </div>

      <div className='py-6 px-10'>
        <Link href={`/proyectos/${project.slug}`}>
          <h3 className='text-xl capitalize hover:text-secondary-color dark:hover:text-indigo-600 transition-colors cursor-pointer'>{project.name}</h3>
        </Link>
        <p className='font-light text-sm  mt-1 leading-relaxed'>{project.description}</p>
        <h4 className='text-lg text-left mt-4 capitalize'>tecnologías usadas:</h4>
        <div className='flex justify-evenly mt-3 w-9/12 mx-auto'>
          <div>
            <SiFlutter size={35} />
            <p className='font-light text-center capitalize mt-2'>Flutter</p>
          </div>
          <div>
            <SiDart size={35} />
            <p className='font-light text-center capitalize mt-2'>Dart</p>
          </div>
        </div>
        <h4 className='text-lg text-left mt-4 capitalize'>Enlaces:</h4>
        <div className='mt-4 flex mx-auto justify-center'>
          <Link href={`/proyectos/${project.slug}`} className={`${styles['card-button']} card-button-dark`}>
            <HiDevicePhoneMobile className='dark:text-slate-300' />
            <p className='capitalize ml-1 dark:text-slate-300'>Ver Más</p>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default MobilProjectDescription;