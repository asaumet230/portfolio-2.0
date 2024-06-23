'use client'
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { AiFillProject } from "react-icons/ai";
import { BiSolidChevronDown, BiSolidChevronRight } from "react-icons/bi";
import { BsFileEarmarkPost, BsTools } from "react-icons/bs";
import { FaCircleUser, FaUser, FaUsers } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { MdReviews } from "react-icons/md";

import 'animate.css';

const menuItemList = [
    {
        title: 'projectos',
        icon: <AiFillProject size={20} className="mr-3" />,
        hasSubmenu: true,
        path: '#',
        submenu: [
            {
                title: 'projectos web',
                path: '/dashboard/projectos-web',
            },
            {
                title: 'projectos movíles',
                path: '/dashboard/projectos-moviles',
            },
        ]
    },
    {
        title: 'herramientas',
        icon: <BsTools size={20} className="mr-3" />,
        hasSubmenu: false,
        path: '/dashboard/herramientas',
    },
    {
        title: 'testimonios',
        icon: <MdReviews size={20} className="mr-3" />,
        hasSubmenu: false,
        path: '/dashboard/testimonios',
    },
    {
        title: 'artículos',
        icon: <BsFileEarmarkPost size={20} className="mr-3" />,
        hasSubmenu: false,
        path: '/dashboard/articulos',
    },
    {
        title: 'usuarios',
        icon: <FaUsers size={20} className="mr-3" />,
        hasSubmenu: false,
        path: '/dashboard/usuarios',
    },
    {
        title: 'perfil',
        icon: <FaUser size={18} className="mr-3" />,
        hasSubmenu: false,
        path: '/dashboard/perfil',
    },
];


export default function DashboardLayout({ children }: { children: React.ReactNode; }) {

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (

        <div className="h-screen bg-gray-100 overflow-hidden">
            <nav className="bg-gray-800 p-4 flex items-center justify-between">

                <div>
                    <Link href={"/"}>
                        <Image
                            priority
                            height={100}
                            width={170}
                            src={"/images/logo-andres-saumet-blanco.webp"}
                            alt={"logo-andres-saumet-blanco"}
                            className="images" />
                    </Link>
                </div>

                <div className="hidden lg:flex items-center space-x-4">
                    <span className="text-white text-sm tracking-widest">Bienvenido Andres Saumet</span>
                    <FaCircleUser
                        color="#ffffff"
                        size={25} />
                </div>
                <div
                    onClick={() => setIsMenuVisible(!isMenuVisible)}
                    className="cursor-pointer lg:hidden">
                    {isMenuVisible ?
                        <IoClose
                            color="#ffffff"
                            size={25}
                            className="animate__animated animate__fadeIn" /> :

                        <IoMdMenu
                            size={25}
                            color="#ffffff"
                            className="animate__animated animate__fadeIn" />}
                </div>
            </nav>

            <div className="flex">
                <div
                    className={` bg-gray-200 min-h-screen overflow-y-visible p-4  ${isMenuVisible ? 'w-full fixed animate__animated animate__slideInLeft animate__faster' : 'hidden'} lg:block lg:w-60 lg:relative`}>
                    <aside>
                        <nav>
                            <ul className="space-y-2 tracking-wide">
                                {
                                    menuItemList.map(({ title, icon, hasSubmenu, path, submenu }) => (

                                        <li key={path}>
                                            <div className="flex items-center justify-between p-2 hover:bg-gray-300 hover:cursor-pointer">

                                                {
                                                    hasSubmenu ?
                                                        <div className="flex justify-between items-center" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                                            <Link href={path} className="flex items-center">
                                                                {icon}
                                                                <span className="capitalize">{title}</span>
                                                            </Link>

                                                            <BiSolidChevronDown size={18} className=" ml-16" />
                                                        </div> :
                                                        <Link href={path} className="flex items-center">
                                                            {icon}
                                                            <span className="capitalize">{title}</span>
                                                        </Link>
                                                }

                                            </div>

                                            {
                                                hasSubmenu && (
                                                    <ul className={`ml-4 ${isMenuOpen ? 'block animate__animated animate__fadeIn' : 'hidden'}`}>
                                                        {
                                                            submenu!.map(({ title, path }) => (

                                                                <li key={path}>
                                                                    <Link href={path} className="p-2 hover:bg-gray-300 hover:cursor-pointer flex items-center capitalize">
                                                                        <BiSolidChevronRight size={18} />
                                                                        {title}
                                                                    </Link>
                                                                </li>

                                                            ))
                                                        }
                                                    </ul>
                                                )
                                            }
                                        </li>
                                    ))
                                }
                            </ul>
                        </nav>
                    </aside>
                </div>

                <div className="h-screen flex-1 mx-auto p-4 bg-red-300">
                    <main className="bg-blue-300">
                       {children}
                    </main>
                </div>
            </div>
        </div>
    );
}