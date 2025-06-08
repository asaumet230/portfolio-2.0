import { RefObject } from "react";

import Image from "next/image";

import { FaUpload } from "react-icons/fa6";

import { useAppSelector } from "@/store";

import 'animate.css';

interface FileUploaderProps {
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    setIsDragging: (dragging: boolean) => void;
    isDragging: boolean;
    fileInputRef: RefObject<HTMLInputElement | null>;
}

export const FileUploader = ({
    handleDrop,
    setIsDragging,
    isDragging,
    fileInputRef
}: FileUploaderProps) => {

    const darkMode = useAppSelector(state => state.theme.darkMode);

    return (
        <div
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={
                `my-10 w-full bg-gray-100 dark:bg-gray-500 max-w-md h-80 border-2 border-dashed rounded-lg flex flex-col items-center justify-center animate__animated animate__fadeIn
                        ${isDragging ? 'border-indigo-500 bg-indigo-100 dark:border-indigo-500 dark:bg-indigo-100' : 'border-gray-400 dark:border-slate-300'}`}>

            <Image
                width={100}
                height={100}
                src={ darkMode? '/images/imagen-drag-drop-dark.webp' : '/images/imagen-drag-drop-ligth.webp' }
                alt='no-hay-fotos' />
            <p className="text-gray-500 mt-2 text-base font-medium text-center px-4 dark:text-slate-200"> Arrastra y suelta tus imágenes aquí o </p>

            <button
                onClick={() => fileInputRef.current!.click()}
                className="flex items-center mt-6 px-3 py-2 cursor-pointer bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition">
                <FaUpload className="text-md mr-2" />
                <p>Seleccionar imágenes</p>
            </button>
        </div>
    )
}

export default FileUploader;