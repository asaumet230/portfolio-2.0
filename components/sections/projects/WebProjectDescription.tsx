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

      if(tecnology === icon.name) {
        iconsTecnologies.push(icon);
      }
    });
  });

  return (
    <article className={`rounded-xl border border-slate-200 card-shadow bg-white ${styles['card-effect']}`}>
      <Image
        priority
        className='rounded-t-xl w-full'
        width={350}
        height={170}
        src={project.images[0]}
        alt={project.name} />
      <div className="py-8 px-8">
        <h3 className='text-xl text-center capitalize'>{project.name}</h3>
        <p className='font-light text-sm mt-1 text-center leading-relaxed'>{project.description}</p>
        <div>
          <h4 className='text-lg text-left mt-4 capitalize font-medium'>tecnologías usadas:</h4>
          <div className='flex justify-between items-center my-4 w-11/12 mx-auto'>
            {
              iconsTecnologies.map(({name, icon}) => (
                <div key={name} className='flex flex-col justify-center items-center align-middle'>
                  {icon}
                  <p className='font-light text-center capitalize mt-1'>{name}</p>
                </div>
              ))
            }
          </div>
        </div>
        <div>
          <h4 className='text-lg text-left mt-4 capitalize font-medium'>Url App & código fuente:</h4>

          <div className='mt-4 flex mx-auto justify-center'>
            <a href={project.urlApp} className={styles['card-button']}>
              <FaDesktop />
              <p className='capitalize ml-1'>app</p>
            </a>
            <a href={project.urlRepository} className={`${styles['card-button']} ml-2`}>
              <FaGithub />
              <p className='capitalize ml-1'>Codígo</p>
            </a>
          </div>

        </div>
      </div>
    </article>
  )
}

export default WebProjectDescription;