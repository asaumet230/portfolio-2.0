'use client'

import { FC } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store';

import { IMenuLink } from '@/interfaces';
import { toggleSidebar } from '@/store/sidebar/sidebarSlice';

export const SidebarLinks: FC<IMenuLink> = ({ name, url }) => {

    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();

    const handleNavigation = (path: string) => {
        dispatch(toggleSidebar(false));
        router.push(path);
    }

    return (
        <li
            className={`links py-5 px-3 cursor-pointer ${(pathname === url) && 'text-secondary-color dark:text-indigo-600'}`}
            key={url}
            onClick={() => handleNavigation(url)}>
            {name}
        </li>
    )
}

export default SidebarLinks