'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { FaUser, FaUserPlus } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';

import { useAppDispatch, useAppSelector } from '@/store';

import { toggleSidebar } from '@/store/sidebar/sidebarSlice';
import { toggleModal } from '@/store/searchModal/searchModalSlice';

import SidebarLinks from './SidebarLinks';
import { menuData } from '@/helpers';

import styles from './sidebar.module.css';

export const Sidebar = () => {

  const darkMode = useAppSelector(state => state.theme.darkMode);
  const isSidebarOpen = useAppSelector(state => state.sidebar.isSidebarOpen);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleNavigation = (path: string) => {
    dispatch(toggleSidebar(false));
    router.push(path);
  }

  const handleSearch = () => {
    dispatch(toggleModal(true));
    dispatch(toggleSidebar(false));
  }

  return (
    <>
      {
        isSidebarOpen ? (
          <div className={`${styles['sidebar-container']} dark:bg-gradient-to-tr to-[#262f3a] from-[#0d1117] animate__animated animate__faster animate__slideInLeft`}>
            <div className='p-8 h-full flex flex-col justify-between'>

              <div className='flex justify-between items-center'>
                <div>
                  <Image
                    priority
                    height={110}
                    width={180}
                    src={darkMode ? "/images/logo-andres-saumet-dark.webp" : "/images/logo-andres-saumet.webp"}
                    className='images'
                    alt={"logo-andres-saumet"} />
                </div>
                <div>
                  <p className='links font-bold cursor-pointer ml-4' onClick={() => dispatch(toggleSidebar(false))}> Cerrar X</p>
                </div>
              </div>

              <nav className='mt-8'>
                <ul>
                  {
                    menuData.map((link) => (
                      <SidebarLinks {...link} key={link.url} />
                    ))
                  }
                </ul>
              </nav>

              <div className={`flex items-center py-5 px-3 cursor-pointer ${styles['display-search-link']}`} onClick={handleSearch}>
                <FaSearch />
                <p className="links capitalize ml-2">buscar</p>
              </div>

              <div className='flex-col flex-1'></div>
              <hr />

              <div className='links p-3 mt-3 flex cursor-pointer' onClick={() => handleNavigation('/login')}>
                <FaUser />
                <p className='ml-2'>Iniciar Sesión</p>
              </div>
              <div className='links p-3 flex cursor-pointer' onClick={() => handleNavigation('/registro')}>
                <FaUserPlus />
                <p className='ml-2'>Registrarse</p>
              </div>
            </div>
          </div>
        ) : (<></>)
      }
    </>

  )
}

export default Sidebar;