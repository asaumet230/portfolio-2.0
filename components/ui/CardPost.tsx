import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { GrFormNextLink } from 'react-icons/gr';

export const CardPost = () => {

    return (

        <article className="pb-6 px-10 border-b">
            <div>
                <Image
                    src="/images/posts/desarrollador-estresado.webp"
                    alt="estres-al-programar"
                    width={600}
                    height={200}
                    className="w-full" />
            </div>
            <div>
                <div className="flex justify-between align-middle items-center mt-4">
                    <h2 className="max-[920px]:text-lg">Estres al programar</h2>
                    <p className="font-semibold max-[920px]:text-sm">17 de Junio del 2024</p>
                </div>
                <p className="mt-3 font-light max-[920px]:text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur architecto alias necessitatibus natus blanditiis iure, eius obcaecati dolorum temporibus, dicta libero asperiores id. Aliquid, hic dicta? Consectetur culpa odit architecto...</p>
                <div className="mt-3 flex">
                    <p className='uppercase text-sm mr-1'>Categoría:</p>
                    <Link href={""} className="uppercase text-sm hover:text-[#7b7db0]">Typescript</Link>
                </div>

                <div className="flex justify-between align-middle items-center mt-3">
                    <div className="w-32">
                        <Link href={""} className="font-bold uppercase hover:text-[#7b7db0] flex items-center max-[920px]:text-sm">
                            Leer Más
                            <GrFormNextLink size={25} />
                        </Link>
                    </div>
                    <div>
                        <p className="font-semibold capitalize max-[920px]:text-sm">Autor: Andres Saumet</p>
                    </div>
                </div>
            </div>

        </article>

    )
}

export default CardPost