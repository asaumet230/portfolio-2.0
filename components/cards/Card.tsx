'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useAppSelector } from '@/store';
import { ICard } from '@/interfaces';


export const Card = ({ title, description, image, url, alt }: ICard) => {

    const darkMode = useAppSelector(state => state.theme.darkMode);

    return (
        <div className='flex flex-col h-full border border-gray-200 rounded-xl hover:shadow-lg hover:scale-105 transition-transform duration-300'>
            <Image
                className='rounded-t-xl w-full h-40 object-contains px-2'
                src={darkMode ? image.dark : image.light}
                alt={alt}
                width={100}
                height={100}
            />
            <div className='flex flex-col justify-between flex-1 px-6 pt-3 pb-6 text-center'>
                <h3 className="mb-2 text-base font-semibold">{title}</h3>
                <p className='text-center text-base font-light mb-4'>{description}</p>
                <div className='w-full text-center'>
                    <Link href={url} className="card-button ">Ir a herramienta</Link>
                </div>
            </div>
        </div>
    )
}

export default Card;