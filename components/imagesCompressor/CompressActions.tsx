import { FaBroom, FaSyncAlt } from "react-icons/fa";

import 'animate.css';

import { ImagePreview } from "@/interfaces";

interface CompressActionsProps {
    filePreviews: ImagePreview[];
    handleCompressFiles: () => void;
    handleReset: () => void;
    isLoading: boolean;
}

export const CompressActions = ({ filePreviews, handleCompressFiles, handleReset, isLoading }: CompressActionsProps) => {

    return (
        <div className='flex flex-col gap-4 justify-center mx-auto w-10/12 my-10 sm:flex-row sm:w-7/12 md:w-9/12 animate__animated animate__fadeIn'>
            <button
                disabled={isLoading}
                className={`flex justify-center items-center gap-2 cursor-pointer w-full p-3 font-semibold rounded-md text-base transition-colors 
                    ${isLoading ? 'bg-yellow-600 text-gray-200 cursor-not-allowed' : 'bg-yellow-500 text-black hover:bg-yellow-600'}`}
                onClick={handleCompressFiles}>
                <FaSyncAlt className="text-sm" />
                <p>{filePreviews?.length === 1 ? 'Comprimir imagen' : 'Comprimir imágenes'}</p>
            </button>

            <button
                disabled={isLoading}
                className={`flex justify-center items-center gap-2 cursor-pointer w-full p-3 font-semibold rounded-md text-base transition-colors 
                    ${isLoading ? 'bg-green-800 text-gray-200 cursor-not-allowed' : 'bg-green-700 text-white hover:bg-green-800'}`}
                onClick={handleReset}>
                <FaBroom className="text-sm" />
                Limpiar
            </button>
        </div>
    )
}

export default CompressActions;