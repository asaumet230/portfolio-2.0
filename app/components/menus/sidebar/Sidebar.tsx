import Link from 'next/link';
import { FaUser } from 'react-icons/fa6';

import { menuData } from '@/app/helpers';
import { DarkMode } from '@/app/components/ui';

import styles from './sidebar.module.css';
import SidebarLinks from './SidebarLinks';


export const Sidebar = () => {
  return (
    <div className={styles['sidebar-container']}>
      <div className='p-8 h-full flex flex-col justify-between'>

        <div className='text-right flex justify-between items-center'>
          <DarkMode />
          <p className='links font-bold cursor-pointer'>Cerrar X</p>
        </div>
        <nav className='mt-8'>
          <ul>
            {
              menuData.map((link) => (
                <SidebarLinks {...link} key={link.url}/>
              ))
            }
          </ul>
        </nav>

        <div className='flex-col flex-1'></div>
        <hr />
        <div className='links p-3 mt-3 flex cursor-pointer'>
          <FaUser />
          <p className='ml-2'>Iniciar Sesión</p>
        </div>


      </div>
    </div>
  )
}

export default Sidebar;