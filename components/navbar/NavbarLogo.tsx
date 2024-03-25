import Link from "next/link";
import Image from "next/image";

import styles from './navbar.module.css';

export const NavbarLogo = () => {
  return (
    <div>
        <Link href={'/'} className="flex items-center">
            <Image 
              width={60}
              height={60}
              src='/images/logo-andres-saumet.png' 
              alt="Andres Saumet Desarrollador Web & Móvil"/>
              <span className={`text-white text-2xl uppercase font-semibold ${styles['navbar-logo']}`}>andres saumet</span>
        </Link>
    </div>
  )
}

export default NavbarLogo;