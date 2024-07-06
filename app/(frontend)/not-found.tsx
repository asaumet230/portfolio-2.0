import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { BsFileEarmarkPost } from "react-icons/bs";
import { GrContact } from "react-icons/gr";
import { MdAppShortcut } from "react-icons/md";

interface ErrorData {
    title: string;
    subtitle: string;
    icon: JSX.Element;
    url: string;
}

const errorData: ErrorData[] = [
    {
        title: 'Inicio',
        subtitle: 'Todo comienza aqui',
        icon: <AiFillHome color="#312e81" size={30} />,
        url: "/",
    },
    {
        title: 'Blog',
        subtitle: 'Lee nuestros increíbles artículos',
        icon: <BsFileEarmarkPost color="#312e81" size={30} />,
        url: '/blog',
    },
    {
        title: 'Proyectos Destacados',
        subtitle: 'Explora nuestros proyectos más importantes',
        icon: <GrContact color="#312e81" size={30} />,
        url: '/proyectos-destacados',
    },
    {
        title: 'Contactame',
        subtitle: 'Contactame para responder tus preguntas',
        icon: <MdAppShortcut color="#312e81" size={30} />,
        url: '/contactame'
    },
];

export default function NotFoundPage() {


    return (
        <div className="w-8/12 mx-auto max-[720px]:w-11/12 mb-20">
            <div className="flex flex-col">

                <div className="flex flex-col items-center mt-20 text-center">
                    <div className="text-indigo-500 font-bold text-7xl"> 404 </div>

                    <div className="font-bold text-2xl xl:text-4xl lg:text-5xl md:text-4xl mt-5">
                        Ups! Lo sentimos esta página no existe
                    </div>

                    <div className="text-gray-500 font-medium md:text-xl lg:text-2xl mt-4">
                        No se pudo encontrar la página que estás buscando.
                    </div>
                </div>


                <div className="flex flex-col w-8/12 mt-20 mx-auto max-[720px]:w-10/12">
                    <div className="text-gray-400 font-bold uppercase text-center">
                        Continua con
                    </div>

                    <div className="flex flex-col items-stretch mt-5">
                        {
                            errorData.map(({ title, subtitle, icon, url }) => (

                                <Link href={url} key={subtitle}>
                                    <div className="flex flex-row group px-4 py-8 border-t hover:cursor-pointer transition-all duration-200 delay-100">
                                        <div className="rounded-xl bg-blue-100 px-3 py-2 md:py-4">
                                            {icon}
                                        </div>
                                        <div className="grow flex flex-col pl-5 pt-2">
                                            <div className="font-bold text-sm md:text-lg lg:text-xl group-hover:underline">
                                                {title}
                                            </div>
                                            <div className="font-semibold text-sm md:text-md lg:text-lg text-gray-400 group-hover:text-gray-500 transition-all duration-200 delay-100">
                                                {subtitle}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

