'use client';

import Image from 'next/image';

import { useAppSelector } from '@/store';

export const Card = () => {

    const darkMode = useAppSelector(state => state.theme.darkMode);

    return (
        <div className='border border-gray-200 rounded-xl hover:shadow-lg hover:scale-105 transition-transform duration-300'>
            <Image
                className='rounded-t-xl w-full object-cover '
                src={ darkMode?  '/images/convertidor-formato-imagen-dark.webp' : '/images/convertidor-formato-imagen.webp'}
                alt='convertidor-formato-imagen'
                width={200}
                height={200}
            />
            <div className='px-6 pt-3 pb-6 flex-col justify-between items-center align-middle'>
                <h3 className="text-center mb-2 text-base">Convertidor de imágenes: pasa de PNG a JPG, WebP y más</h3>
                <p className='text-center text-base font-light mb-4'>Convierte tus imágenes fácilmente entre formatos como PNG, JPG y WebP. Rápido, sin instalar nada y directo desde el navegador.</p>
                <div className='w-full text-center'>
                    <a href="/herramientas/convertidor-imagen" className="card-button ">Ir a herramienta</a>
                </div>
            </div>
        </div>
    )
}

export default Card