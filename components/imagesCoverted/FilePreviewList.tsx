import { PreviewProgressBar } from "../ui";
import { DownloadInfo, RemoveFileButton } from ".";

import { ImagePreview } from "@/interfaces";

import 'animate.css';

interface FilePreviewListProps {
    filePreviews: ImagePreview[];
    urls: string[];
    isLoading: boolean;
    outputFormat: string;
    handleDownloadByUrl: (url: string, filename: string) => void;
    handleRemoveFile: (index: number) => void;
};

export const FilePreviewList = ({
    filePreviews,
    urls,
    isLoading,
    outputFormat,
    handleDownloadByUrl,
    handleRemoveFile
}: FilePreviewListProps) => {
    return (
        <div className="w-full min-h-32 max-w-3xl mt-6 space-y-4 animate__animated animate__fadeIn">
            {
                filePreviews.map((item, index) => (

                    <div key={index} className="flex items-center justify-between bg-gray-50 border border-gray-300 dark:border-2 dark:border-gray-400 p-2 rounded-lg shadow-md ">

                        <img src={item.url} alt={item.file.name} className="w-12 h-12 object-cover rounded-lg mr-2 sm:mr-4 border border-gray-300" />

                        <div className="flex-1 text-left space-y-1">
                            <p className="text-sm font-semibold text-gray-500"> Nombre: {item.file.name}</p>

                            <p className="text-sm text-gray-500">
                                Tamaño: {item.originalSizeKB} KB
                            </p>

                        </div>


                        <div className={`flex flex-col items-center justify-center ${!isLoading && 'hidden'} w-6/12 sm:flex-row`}>
                            {isLoading && (<PreviewProgressBar ImageProgress={item.progress} />)}

                            {isLoading && !item.completed && (
                                <p className="text-sm font-semibold mx-3 mb-2 animate-pulse">
                                    {item.progress < 100 ? 'Subiendo...' : 'Convirtiendo...'}
                                </p>
                            )}

                            {

                                item.completed && urls[index] && (
                                    <DownloadInfo
                                        urls={urls}
                                        filePreviews={filePreviews}
                                        index={index}
                                        outputFormat={outputFormat}
                                        handleDownloadByUrl={handleDownloadByUrl}
                                    />
                                )
                            }
                        </div>


                        {
                            !isLoading && (
                                <RemoveFileButton
                                    index={index}
                                    handleRemoveFile={handleRemoveFile} />
                            )
                        }

                    </div>
                ))}
        </div>
    )
}

export default FilePreviewList