'use client';

import Image from 'next/image';

import { useAppSelector } from '@/store';

export const Card = () => {

    const darkMode = useAppSelector(state => state.theme.darkMode);

    return (
        <div className='border border-gray-200 rounded-xl hover:shadow-lg hover:scale-105 transition-transform duration-300'>
            <Image
                className='rounded-t-xl w-full object-cover'
                src={ darkMode?  '/images/sharpconvert-card-dark.webp' : '/images/sharpconvert-card-light.webp'}
                alt='convertidor-de-imagenes'
                width={100}
                height={100}
            />
            <div className='px-6 pt-3 pb-6 flex-col justify-between items-center align-middle'>
                <h3 className="text-center mb-2 text-base">Transforma tus imágenes a JPG, PNG, WebP o AVIF fácilmente</h3>
                <p className='text-center text-base font-light mb-4'>Con SharpConvert puedes cambiar el formato de tus imágenes sin complicaciones. Solo súbelas, elige el tipo de archivo y descárgalas. Rápido, seguro y sin marcas de agua.</p>
                <div className='w-full text-center'>
                    <a href="/herramientas/convertidor-de-imagenes" className="card-button ">Ir a herramienta</a>
                </div>
            </div>
        </div>
    )
}

export default Card