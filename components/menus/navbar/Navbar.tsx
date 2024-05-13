import { FaSearch } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";

import { NavbarMenuLink } from './';
import { Logo } from '@/components/ui';

import { menuData } from '@/helpers';

import styles from './navbar.module.css';

export const Navbar = () => {

  return (
    <header className="container p-3 flex justify-between items-center">
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

        <div className={`cursor-pointer ${styles['display-mobile-menu']}`}>
          <TiThMenu size={20} />
        </div>


        <div className={`ml-12 px-4 py-2 cursor-pointer ${styles['display-search-link']}`}>
          <FaSearch />
          <p className="links capitalize ml-2">buscar</p>
        </div>
      </div>

    </header>
  )
}

export default Navbar;