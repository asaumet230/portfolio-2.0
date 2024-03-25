'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from './navbar.module.css';

interface Props {
  path: string;
  name: string;
}

export const NavbarLink = ({path, name}: Props) => {

  const pathname = usePathname();

  return (
    <li>
      <Link 
        href={path} 
        className={`text-white mx-4 ${styles['navbar-links']} ${ pathname === path && styles['navbar-selected-link'] }`}> {name} </Link>
    </li>
  )
}

export default NavbarLink;