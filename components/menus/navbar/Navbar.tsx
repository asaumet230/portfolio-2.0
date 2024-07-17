'use client'

import { FaSearch } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { useAppDispatch } from "@/store";
import { toggleModal } from "@/store/searchModal/searchModalSlice";
import { toggleSidebar } from "@/store/sidebar/sidebarSlice";

import { NavbarMenuLink } from './';
import { DarkMode, Logo, SystemMode } from '@/components/ui';

import { menuData } from '@/helpers';

import styles from './navbar.module.css';

export const Navbar = () => {

  const dispatch = useAppDispatch();

  return (
    <header className="container p-3 flex justify-between items-center max-[500px]:px-0">
      <Logo />
      <div className="flex">
        <nav className={styles['display-desktop-menu']}>
          <ul className="flex">
            {
              menuData.map((props) => (
                  <NavbarMenuLink key={props.url} {...props} />
                )
              )
            }
          </ul>
        </nav>

        <div className={`cursor-pointer ${styles['display-mobile-menu']}`} onClick={() => dispatch( toggleSidebar(true) )}>
          <TiThMenu size={20} />
        </div>


        <div className={`ml-12 px-4 py-2 cursor-pointer ${styles['display-search-link']}`} onClick={()=> dispatch( toggleModal(true) )}>
          <FaSearch />
          <p className="links capitalize ml-2">buscar</p>
        </div>
        <DarkMode />
        <SystemMode />
      </div>

    </header>
  )
}

export default Navbar;