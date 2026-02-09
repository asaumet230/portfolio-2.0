'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";

import { AiFillProject } from "react-icons/ai";
import { BiSolidChevronDown, BiSolidChevronRight } from "react-icons/bi";
import { BsFileEarmarkPost, BsTools } from "react-icons/bs";
import { FaCircleUser, FaUser, FaUsers } from "react-icons/fa6";
import { IoClose, IoLogOut } from "react-icons/io5";
import { IoMdHome, IoMdMenu } from "react-icons/io";
import { MdReviews, MdWork } from "react-icons/md";

import { LoadingModal } from '@/components';

import 'animate.css';


const menuItemList = [
    {
        title: 'Dashboard',
        icon: <IoMdHome size={20} className="mr-3" />,
        hasSubmenu: false,
        path: '/dashboard',
    },
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
        title: 'trabajos',
        icon: <MdWork size={20} className="mr-3" />,
        hasSubmenu: false,
        path: '/dashboard/trabajos',
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

    const router = useRouter();
    const { data: session, status } = useSession();

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push('/login');
    };

    if (status === 'loading') {
        return <LoadingModal />;
    }

    if (status === 'unauthenticated') {
        return null;
    }

    const userName = session?.user?.name || 'Usuario';

    return (

        <div className="h-full bg-gray-100">
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
                    <span className="text-white text-sm tracking-widest">
                        Bienvenido {userName}
                    </span>
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

            <div className="flex h-screen">
                <div
                    className={`bg-gray-200 p-4 min-h-full flex flex-col ${isMenuVisible ? 'w-full fixed animate__animated animate__slideInLeft animate__faster' : 'hidden'} lg:block lg:w-60 lg:relative`}>
                    <aside className="flex-1">
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

                    {/* Logout button con mismo diseño que el menú */}
                    <div className="mt-auto pt-8 border-t border-gray-300">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center p-2 hover:bg-gray-300 hover:cursor-pointer rounded transition-colors"
                        >
                            <IoLogOut size={20} className="mr-3" />
                            <span className="capitalize">Cerrar sesión</span>
                        </button>
                    </div>
                </div>

                <div className="flex-1 mx-auto p-4 overflow-x-auto">
                    <main>
                       {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
