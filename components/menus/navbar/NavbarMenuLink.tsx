'use client'

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { IoChevronDown } from 'react-icons/io5';

import { IMenuLink } from '@/interfaces';


export const NavbarMenuLink: FC<IMenuLink> = ({ name, url, children }) => {

    const pathname = usePathname();

    return (
        <li className={`relative group links px-4 py-2 ${(pathname === url) && 'bg-[#e2e6f0] transition-all ease-in-out duration-200 rounded-xl dark:bg-[#2e374ad1] dark:border border-[#6e7681]'} `}>

            {
                !children ? <Link href={url}>{name}</Link> : (
                    <div className="flex items-center justify-center gap-1">
                        <Link href={url}>{name}</Link>
                        <IoChevronDown className="text-lg font-bold group-hover:rotate-180 transition-all duration-200" />
                    </div>
                )
            }
            
            {
                children && (
                    <ul
                        className={`absolute top-full py-3 bg-white dark:bg-[#1f2937] shadow-lg border border-gray-100 rounded-lg z-10 min-w-[250px] opacity-0 dark:border dark:border-gray-600  group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200`}>
                        {
                            children.map((child) => (
                                <li key={child.url} className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${(pathname === child.url) && 'bg-[#e2e6f0] transition-all ease-in-out duration-200 dark:bg-[#2e374ad1]'} `}>
                                    <Link href={child.url} className="block text-sm font-base text-gray-800 dark:text-gray-200">
                                        {child.name}
                                    </Link>
                                </li>
                            )
                            )
                        }
                    </ul>
                )
            }
        </li>
    )
}

export default NavbarMenuLink;