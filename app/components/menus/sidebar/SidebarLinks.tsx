'use client'

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { IMenuLink } from '@/app/interfaces';

export const SidebarLinks: FC<IMenuLink> = ({ name, url }) => {

    const pathname = usePathname();

    return (
        <li className={`links py-5 px-3 cursor-pointer ${(pathname === url) && 'text-secondary-color'}`} key={url}>
            <Link href={url}>{name}</Link>
        </li>
    )
}

export default SidebarLinks