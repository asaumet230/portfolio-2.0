'use client'

import { useState } from 'react';

import { FaXmark } from 'react-icons/fa6';

import 'animate.css';

import { ImagePreview } from '@/interfaces';

interface CompareSliderModalProps {
    item: ImagePreview;
    onClose: () => void;
}

export const CompareSliderModal = ({ item, onClose }: CompareSliderModalProps) => {

    const [sliderPosition, setSliderPosition] = useState(50);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 animate__animated animate__fadeIn animate__faster"
            role="dialog"
            aria-modal="true"
            aria-label="Comparar imagen original y comprimida"
            onClick={onClose}>

            <div
                className="bg-white dark:bg-gray-700 rounded-lg shadow-xl max-w-3xl w-full p-4"
                onClick={(e) => e.stopPropagation()}>

                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-base sm:text-lg truncate pr-4 dark:text-white">{item.file.name}</h3>
                    <button
                        onClick={onClose}
                        aria-label="Cerrar comparación"
                        className="flex items-center justify-center p-2 rounded-full text-gray-600 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-600 transition-colors">
                        <FaXmark className="text-xl" />
                    </button>
                </div>

                <div className="relative w-full h-[55vh] sm:h-[60vh] bg-gray-900 rounded-md overflow-hidden select-none">

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={item.originalUrl ?? item.url}
                        alt={`${item.file.name} original`}
                        draggable={false}
                        className="absolute inset-0 w-full h-full object-contain" />

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={item.url}
                        alt={`${item.file.name} comprimida`}
                        draggable={false}
                        className="absolute inset-0 w-full h-full object-contain"
                        style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }} />

                    <div
                        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md pointer-events-none"
                        style={{ left: `${sliderPosition}%` }} />

                    <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded pointer-events-none">
                        Original · {item.originalSizeKB} KB
                    </span>
                    <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded pointer-events-none">
                        Comprimida · {item.convertedSizeKB} KB
                    </span>

                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={sliderPosition}
                        onChange={(e) => setSliderPosition(+e.target.value)}
                        aria-label="Deslizar para comparar original y comprimida"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize" />
                </div>

                <p className="text-center text-sm text-gray-500 dark:text-gray-300 mt-3">
                    Desliza para comparar: izquierda original, derecha comprimida.
                </p>
            </div>
        </div>
    )
}

export default CompareSliderModal;
