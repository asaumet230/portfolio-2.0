'use client'

import { useEffect, useState } from "react";

import 'animate.css';

import { ImagePreview } from "@/interfaces";

interface UploadProgressOverlayProps {
    filesPreviewList: ImagePreview[];
    setIsUploadImages: (isUpload: boolean) => void;
}


export const CompressProgressImagesUpload = ({ filesPreviewList, setIsUploadImages }: UploadProgressOverlayProps) => {

    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {

        if (uploadProgress < 100) {
            const timer = setTimeout(() => {
                setUploadProgress(prev => prev + 10);
            }, 150);

            return () => clearTimeout(timer);
        }

    }, [uploadProgress]);


    useEffect(() => {
        if (uploadProgress === 100) {
            setIsUploadImages(true);
        }
    }, [uploadProgress]);

    return (
        <div className="h-96 w-full mx-auto flex flex-col items-center justify-center animate__animated animate__fadeIn">

            <h2 className="text-lg text-gray-700 font-medium mb-2">{filesPreviewList?.length === 1 ? 'Cargando imagen...' : 'Cargando imágenes...'}</h2>
            <div className="relative w-11/12 sm:w-9/12 md:w-7/12 h-8 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }} />
                <span className={`absolute inset-0 flex items-center justify-center ${uploadProgress > 50 ? 'text-white' : 'text-gray-900'} font-semibold text-sm `}>
                    {uploadProgress}%
                </span>
            </div>
        </div>
    );
};

export default CompressProgressImagesUpload;