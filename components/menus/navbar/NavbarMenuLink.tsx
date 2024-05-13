'use client'

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { IMenuLink } from '@/interfaces';

import styles from './navbar.module.css';


export const NavbarMenuLink:FC<IMenuLink> = ({ name, url }) => {

    const pathname = usePathname();

    return (
        <li className={`links px-4 py-2 capitalize ${ (pathname === url) && styles['active-link'] }`}>
            <Link href={url}>{name}</Link>
        </li>
    )
}

export default NavbarMenuLink;