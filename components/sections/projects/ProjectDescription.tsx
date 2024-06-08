import Image from 'next/image';
import { FaBootstrap, FaCss3, FaDesktop, FaGithub, FaWordpress } from 'react-icons/fa6';

import styles from './projects.module.css';

export const ProjectDescription = () => {

  return (
    <article className={`border rounded-xl card-shadow bg-white ${styles['card-effect']}`}>
          <Image
            className='images rounded-t-xl'
            width={350}
            height={170}
            src="/images/proyects/proyecto-1.png"
            alt="proyecto-1" />
          <div className="py-8 px-8">
            <h3 className='text-xl text-center capitalize'>eferta ecommerce</h3>
            <p className='font-light text-sm mt-1 text-center'>Desarrollé un eCommerce multivendedor en WordPress, integrando CSS y Bootstrap para un diseño responsivo y fácil gestión por parte de cada tienda.</p>
            <div>
              <h4 className='text-lg text-left mt-4 capitalize'>tecnologías usadas:</h4>
              <div className='flex justify-evenly mt-3 w-9/12 mx-auto'>
                <FaBootstrap size={35} />
                <FaCss3 size={35} />
                <FaWordpress size={35} />
              </div>
            </div>
            <div>
              <h4 className='text-lg text-left mt-4 capitalize'>código fuente:</h4>

              <div className='mt-4 flex mx-auto justify-center'>
                <a href="https://www.eferta.com" className={styles['card-button']}>
                  <FaDesktop />
                  <p className='capitalize ml-1'>app</p>
                </a>
                <a href="https://www.eferta.com" className={`${styles['card-button']} ml-2`}>
                  <FaGithub />
                  <p className='capitalize ml-1'>Codígo</p>
                </a>
              </div>

            </div>
          </div>
        </article>
  )
}

export default ProjectDescription