import Link from 'next/link';
import Image from 'next/image';
import {
  FaBootstrap,
  FaCss3,
  FaDesktop,
  FaGithub,
  FaWordpress,
  FaNodeJs,
  FaAngular,
  FaReact,
} from 'react-icons/fa6';
import { SiDart, SiTypescript } from 'react-icons/si';
import { RiFlutterFill, RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri';
import { GrGatsbyjs } from 'react-icons/gr';
import { IoLogoJavascript } from 'react-icons/io';

import { IProject } from '@/interfaces';
import styles from './projects.module.css';

const iconsGuide = [
  {
    name: 'bootstrap',
    icon: <FaBootstrap size={35} />
  },
  {
    name: 'wordpress',
    icon: <FaWordpress size={35} />
  },
  {
    name: 'css',
    icon: <FaCss3 size={35} />
  },
  {
    name: 'nextjs',
    icon: <RiNextjsFill size={35} />
  },
  {
    name: 'typescript',
    icon: <SiTypescript size={35} />
  },
  {
    name: 'nodejs',
    icon: <FaNodeJs size={35} />
  },
  {
    name: 'angular',
    icon: <FaAngular size={35} />
  },
  {
    name: 'gastby',
    icon: <GrGatsbyjs size={35} />
  },
  {
    name: 'reactjs',
    icon: <FaReact size={35} />
  },
  {
    name: 'javascript',
    icon: <IoLogoJavascript size={35} />
  },
  {
    name: 'flutter',
    icon: <RiFlutterFill size={35} />
  },
  {
    name: 'dart',
    icon: <SiDart size={35} />
  },
  {
    name: 'tailwind',
    icon: <RiTailwindCssFill size={35} />
  },
];

interface Props {
  project: IProject;
}

export const WebProjectDescription = ({ project }: Props) => {

  const iconsTecnologies: any[] = [];

  project.tecnologies.forEach(tecnology => {

    iconsGuide.forEach(icon => {

      if (tecnology === icon.name) {
        iconsTecnologies.push(icon);
      }
    });
  });

  return (
    <article className={`rounded-xl border border-slate-200 card-shadow bg-white ${styles['card-effect']} dark:bg-[#262f3a]`}>
      <Link href={`/proyectos/${project.slug}`}>
        <Image
          priority
          className='rounded-t-xl w-full hover:opacity-90 transition-opacity cursor-pointer'
          width={350}
          height={170}
          src={project.images[0]}
          alt={project.name} />
      </Link>
      <div className="py-8 px-8">
        <Link href={`/proyectos/${project.slug}`}>
          <h3 className='text-xl text-center capitalize hover:text-secondary-color dark:hover:text-indigo-600 transition-colors cursor-pointer'>{project.name}</h3>
        </Link>
        <p className='font-light text-sm mt-1 text-center leading-relaxed'>{project.description}</p>
        <div>
          <h4 className='text-lg text-left mt-4 capitalize font-medium'>tecnologías usadas:</h4>
          <div className='flex justify-between items-center my-4 w-11/12 mx-auto'>
            {
              iconsTecnologies.map(({ name, icon }) => (
                <div key={name} className='flex flex-col justify-center items-center align-middle'>
                  {icon}
                  <p className='font-light text-center capitalize mt-1'>{name}</p>
                </div>
              ))
            }
          </div>
        </div>
        <div>
          <h4 className='text-lg text-left mt-4 capitalize font-medium'>Enlaces:</h4>

          <div className='mt-4 flex mx-auto justify-center'>
            <Link href={`/proyectos/${project.slug}`} className={`${styles['card-button']} card-button-dark`}>
              <FaDesktop className='dark:text-slate-300' />
              <p className='capitalize ml-1 dark:text-slate-300'>Ver Más</p>
            </Link>
          </div>

        </div>
      </div>
    </article>
  )
}

export default WebProjectDescription;