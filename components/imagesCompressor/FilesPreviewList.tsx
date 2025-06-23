import { ImagePreview } from '@/interfaces';

import 'animate.css';

import { CompressPreviewProgressBar, CompressRemoveFileButton, DonwloadImage } from '.';

interface FilePreviewListProps {
    filesPreviewList: ImagePreview[];
    handleRemoveFile: (index: number) => void;
    isLoading: boolean;
};

export const FilesPreviewList = ({ filesPreviewList, handleRemoveFile, isLoading }: FilePreviewListProps) => {

    return (
        <div className="w-full min-h-32 max-w-3xl mt-6 space-y-4 animate__animated animate__fadeIn">
            {
                filesPreviewList.map((item, index) => (

                    <div key={index} className="flex items-center justify-between bg-gray-50 border border-gray-300 dark:border-2 dark:border-gray-400 p-2 rounded-lg shadow-md">

                        <img src={item.url} alt={item.file.name} className="w-12 h-12 object-cover rounded-lg mr-2 sm:mr-4 border border-gray-300" />

                        <div className="flex-1 text-left space-y-1">
                            <p className="text-sm font-semibold text-gray-500"> Nombre: {item.file.name}</p>

                            <p className="text-sm text-gray-500">
                                Tamaño: {item.originalSizeKB} KB
                            </p>
                        </div>
                         <div className={`flex flex-col items-center justify-center ${!isLoading && 'hidden'} w-7/12 sm:w-6/12 sm:flex-row`}>
                         
                            {isLoading && (<CompressPreviewProgressBar ImageProgress={item.progress} />)}

                            {isLoading && !item.completed && (
                                <p className="text-sm font-semibold mx-3 mb-2 animate-pulse dark:text-black">
                                    {item.progress < 100 && 'Comprimiendo...'}
                                </p>
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