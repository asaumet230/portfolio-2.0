import { FaBroom, FaSyncAlt } from "react-icons/fa";

import 'animate.css';

interface ConvertActionsProps {
    filesToConvert: FileList | null;
    handleConvert: () => void;
    handleReset: () => void;
    isLoading: boolean;
}

export const ConvertActions = ({ filesToConvert, handleConvert, handleReset, isLoading }: ConvertActionsProps) => {

    return (
        <div className='flex flex-col sm:flex-row gap-4 justify-center w-10/12 sm:w-7/12 md:w-9/12 my-10 animate__animated animate__fadeIn'>
            <button
                disabled={isLoading}
                className={`flex justify-center items-center gap-2 w-full p-3 font-semibold rounded-md text-base transition-colors 
                    ${isLoading ? 'bg-yellow-600 text-gray-200 cursor-not-allowed' : 'bg-yellow-500 text-black hover:bg-yellow-600'}`}
                onClick={handleConvert}>
                <FaSyncAlt className="text-sm" />
                <p>{filesToConvert?.length === 1 ? 'Convertir imagen' : 'Convertir imágenes'}</p>
            </button>

            <button
                disabled={isLoading}
                className={`flex justify-center items-center gap-2 w-full p-3 font-semibold rounded-md text-base transition-colors 
                    ${isLoading ? 'bg-green-800 text-gray-200 cursor-not-allowed' : 'bg-green-700 text-white hover:bg-green-800'}`}
                onClick={handleReset}>
                <FaBroom className="text-sm" />
                Limpiar
            </button>
        </div>
    )
}

export default ConvertActions;