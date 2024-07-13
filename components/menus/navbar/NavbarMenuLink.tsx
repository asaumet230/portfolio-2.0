'use client'

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { IMenuLink } from '@/interfaces';


export const NavbarMenuLink:FC<IMenuLink> = ({ name, url }) => {

    const pathname = usePathname();

    return (
        <li className={`links px-4 py-2 ${ (pathname === url) && 'bg-[#e2e6f0] transition-all ease-in-out duration-200 rounded-xl dark:bg-[#2e374ad1] dark:border border-[#6e7681]' } `}>
            <Link href={url}>{name}</Link>
        </li>
    )
}

export default NavbarMenuLink;