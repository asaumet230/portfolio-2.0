'use client'

import { FC, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

import { useAppDispatch } from '@/store';
import { IMenuLink } from '@/interfaces';
import { toggleSidebar } from '@/store/sidebar/sidebarSlice';

export const SidebarLinks: FC<IMenuLink> = ({ name, url, children }) => {

    const [openSubmenu, setOpenSubmenu] = useState(false);

    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleNavigation = (path: string) => {
        dispatch(toggleSidebar(false));
        router.push(path);
    };

    const isActive = pathname === url;

    return (
        <li className={`links`}>

            <div
                onClick={() => {
                    if (children) {
                        setOpenSubmenu(prev => !prev);
                    } else {
                        handleNavigation(url);
                    }
                }}
                className={`flex items-center justify-between py-4 px-4 cursor-pointer ${isActive ? 'text-secondary-color dark:text-indigo-600 font-semibold' : ''}`}>
                <span>{name}</span>
                {children &&( <IoChevronUp className={`dark:text-gray-300 ${openSubmenu? 'rotate-180 transition duration-200':'rotate-0 transition duration-200'}`} />) }
            </div>

            {children && openSubmenu && (
                <ul className="ml-4 dark:border-gray-700 pl-4 space-y-2">
                    {children.map(child => (
                        <li
                            key={child.url}
                            onClick={() => handleNavigation(child.url)}
                            className={`text-sm py-2 px-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${pathname === child.url ? 'bg-gray-100 dark:bg-gray-800 font-medium' : ''}`}>
                            {child.name}
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default SidebarLinks;
