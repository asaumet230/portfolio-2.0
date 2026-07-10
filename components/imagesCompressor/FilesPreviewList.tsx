import { ImagePreview } from '@/interfaces';

import { FaMagnifyingGlass } from 'react-icons/fa6';

import 'animate.css';

import { CompressPreviewProgressBar, CompressRemoveFileButton, DonwloadImage } from '.';

interface FilePreviewListProps {
    filesPreviewList: ImagePreview[];
    handleRemoveFile: (index: number) => void;
    handleCompareFile: (item: ImagePreview) => void;
    isLoading: boolean;
};

export const FilesPreviewList = ({ filesPreviewList, handleRemoveFile, handleCompareFile, isLoading }: FilePreviewListProps) => {

    return (
        <div className="w-full min-h-32 max-w-3xl mt-6 space-y-4 animate__animated animate__fadeIn">
            {
                filesPreviewList.map((item, index) => (

                    <div key={item.id ?? index} className="flex items-center justify-between bg-gray-50 border border-gray-300 dark:border-2 dark:border-gray-400 p-2 rounded-lg shadow-md">

                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.url} alt={item.file.name} className="w-12 h-12 object-cover rounded-lg mr-2 sm:mr-4 border border-gray-300" />

                        <div className="flex-1 text-left space-y-1">
                            <p className="text-sm font-semibold text-gray-500"> Nombre: {item.file.name}</p>

                            <p className="text-sm text-gray-500">
                                Tamaño: {item.originalSizeKB} KB
                            </p>

                            {item.completed && item.convertedSizeKB !== undefined && (
                                item.keptOriginal ? (
                                    <p className="text-sm text-green-600 font-semibold">
                                        Ya estaba optimizada, se conserva la original
                                    </p>
                                ) : (
                                    <p className="text-sm text-green-600 font-semibold">
                                        Comprimido: {item.convertedSizeKB} KB · Ahorro: {Math.max(0, Math.round((1 - item.convertedSizeKB / item.originalSizeKB) * 100))}%
                                    </p>
                                )
                            )}

                            {item.error && (
                                <p className="text-sm text-red-500 font-semibold">
                                    ⚠ {item.error}
                                </p>
                            )}
                        </div>
                         <div className={`flex flex-col items-center justify-center ${!(isLoading || item.completed) && 'hidden'} w-7/12 sm:w-6/12 sm:flex-row`}>

                            {isLoading && !item.completed && !item.error && (<CompressPreviewProgressBar ImageProgress={item.progress} />)}

                            {isLoading && !item.completed && !item.error && (
                                <p className="text-sm font-semibold mx-3 mb-2 animate-pulse dark:text-black">
                                    {item.progress < 100 && 'Comprimiendo...'}
                                </p>
                            )}

                            {item.completed && !item.keptOriginal && (
                                <button
                                    onClick={() => handleCompareFile(item)}
                                    className='flex items-center justify-center cursor-pointer text-white py-0.5 px-3 mb-1 mr-0 sm:mr-2 border rounded-lg bg-purple-600 hover:bg-purple-700'>
                                    <span className='text-sm'>Comparar</span>
                                    <FaMagnifyingGlass className="text-sm ml-1" />
                                </button>
                            )}

                            {
                                item.completed && <DonwloadImage
                                    file={item.file}
                                    convertedSizeKB={item.convertedSizeKB} />
                            }
                        </div>
                        {
                            !isLoading && (
                                <CompressRemoveFileButton
                                    index={index}
                                    handleRemoveFile={handleRemoveFile} />
                            )
                        }
                    </div>
                ))}
        </div>
    )
}

export default FilesPreviewList;
