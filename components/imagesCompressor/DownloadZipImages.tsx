import { FaSyncAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";

import 'animate.css';

import { ImagePreview } from "@/interfaces";

interface DownloadZipImagesProps {
    filesPreviews: ImagePreview[];
    handleDownloadAllAsZip: () => void;
    handleReset: () => void;
};

export const DownloadZipImages = ({filesPreviews, handleDownloadAllAsZip, handleReset }: DownloadZipImagesProps) => {
    return (
        <div className='flex flex-col gap-4 justify-center w-10/12 mx-auto sm:flex-row  sm:w-7/12 md:w-9/12 my-10 animate__animated animate__fadeIn'>
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
    )
}

export default DownloadZipImages;