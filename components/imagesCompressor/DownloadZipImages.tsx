import { FaSyncAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";

import 'animate.css';

import { ImagePreview } from "@/interfaces";

interface DownloadZipImagesProps {
    filesPreviews: ImagePreview[];
    handleDownloadAllAsZip: () => void;
    handleReset: () => void;
};

const formatSize = (sizeKB: number) =>
    sizeKB >= 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${Math.round(sizeKB)} KB`;

export const DownloadZipImages = ({filesPreviews, handleDownloadAllAsZip, handleReset }: DownloadZipImagesProps) => {

    const completedFiles = filesPreviews.filter(item => item.completed && item.convertedSizeKB !== undefined);
    const totalOriginalKB = completedFiles.reduce((acc, item) => acc + item.originalSizeKB, 0);
    const totalFinalKB = completedFiles.reduce((acc, item) => acc + (item.convertedSizeKB ?? 0), 0);
    const savedKB = totalOriginalKB - totalFinalKB;
    const savedPercent = totalOriginalKB > 0 ? Math.round((savedKB / totalOriginalKB) * 100) : 0;

    return (
        <div className="animate__animated animate__fadeIn">
            {savedKB > 0 && (
                <p className="text-center text-base font-semibold text-green-600 mt-10 dark:text-green-400">
                    🎉 Ahorraste {formatSize(savedKB)} ({savedPercent}%) en {completedFiles.length} {completedFiles.length === 1 ? 'imagen' : 'imágenes'}
                </p>
            )}

            <div className='flex flex-col gap-4 justify-center w-10/12 mx-auto sm:flex-row  sm:w-7/12 md:w-9/12 my-10'>
                <button
                    className='flex justify-center items-center gap-2 cursor-pointer w-full p-3 font-semibold bg-blue-600 text-white rounded-md text-base hover:bg-blue-700 transition-colors'
                    onClick={handleDownloadAllAsZip}>
                    <FaDownload className="text-sm" />
                    <p>{filesPreviews?.length === 1? 'Descargar imagen' : 'Descargar todas'}</p>
                </button>

                <button
                    className='flex justify-center items-center gap-2 cursor-pointer w-full p-3 font-semibold bg-purple-700 text-white rounded-md text-base hover:bg-purple-800 transition-colors'
                    onClick={handleReset}>
                    <FaSyncAlt className="text-sm" />
                    <p>Comprimir más</p>
                </button>
            </div>
        </div>
    )
}

export default DownloadZipImages;
