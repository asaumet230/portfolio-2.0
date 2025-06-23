'use client'

import { useRef, useState } from 'react';

import imageCompression from 'browser-image-compression';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

import { EmptyFileNotice } from '../ui';

import { 
    CompressActions, 
    CompressProgressImagesUpload, 
    DownloadZipImages, 
    FilesPreviewList, 
    FilesUploader 
} from '.';

import { validateFiles } from '@/helpers';
import { ImagePreview } from '@/interfaces';


export const ImagesCompressor = () => {


    const [filePreviews, setFilePreviews] = useState<ImagePreview[]>([]);
    const [isUploadImages, setIsUploadImages] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isConversionComplete, setIsConversionComplete] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImagesPreview = (files: FileList | null) => {

        if (!validateFiles(files) || files === null) return;

        const previews: ImagePreview[] = Array.from(files).map(file => ({
            file,
            url: URL.createObjectURL(file),
            originalSizeKB: +(file.size / 1024).toFixed(2),
            progress: 0
        }));

        setFilePreviews(previews);
    }

    const handleCompressFiles = async () => {

        setIsLoading(true);

        for (const image of filePreviews) {

            const { file, url } = image

            const compressedBlob = await imageCompression(file, {
                maxSizeMB: 1,
                useWebWorker: true,
                onProgress: (progress) => {
                    setFilePreviews(prev =>
                        prev.map(item =>
                            item.file.name === file.name
                                ? { ...item, progress }
                                : item
                        )
                    )
                }
            });

            const compressedFile = new File([compressedBlob], file.name, {
                type: file.type,
                lastModified: file.lastModified
            });

            const newUrl = URL.createObjectURL(compressedFile)
            URL.revokeObjectURL(url)

            const blob = await fetch(newUrl).then(res => res.blob())
            const exactSizeKB = +(blob.size / 1024).toFixed(2)

            setFilePreviews(prev =>
                prev.map(item =>
                    item.file.name === file.name
                        ? {
                            ...item,
                            file: compressedFile,
                            url: newUrl,
                            convertedSizeKB: exactSizeKB,
                            progress: 100,
                            completed: true
                        }
                        : item
                )
            );
        }

        setIsConversionComplete(true);
        Swal.fire('¡Listo!', 'Las imágenes fueron convertidas con éxito.', 'success');
    }

    const handleReset = () => {

        filePreviews.forEach(preview => {
            URL.revokeObjectURL(preview.url)
        })

        setFilePreviews([]);
        setIsUploadImages(false);
        setIsConversionComplete(false);
        setIsLoading(false);
    }

    const handleRemoveFile = (index: number) => {

        setFilePreviews(prev => {

            URL.revokeObjectURL(prev[index].url)
            return prev.filter((_, i) => i !== index)
        });

        if (filePreviews.length === 1) {
            setFilePreviews([]);
            setIsConversionComplete(false);
            setIsUploadImages(false);
            setIsLoading(false);
        }
    }

    const handleDownloadAllAsZip = async () => {

        const zip = new JSZip()

        for (const preview of filePreviews) {

            const file = preview.file
            const blob = new Blob([file], { type: file.type })

            const originalName = file.name.split('.')[0]
            const extension = file.name.split('.').pop() || 'jpg'
            const filename = `${originalName}.${extension}`

            zip.file(filename, blob)
        }

        const content = await zip.generateAsync({ type: 'blob' })
        saveAs(content, 'imagenes-comprimidas.zip')
    }

    return (
        <div className="bg-white p-6 dark:bg-gray-700">

            <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => handleImagesPreview(e.target.files)}
                className="hidden" />

            {
                filePreviews.length === 0 ?
                    (<FilesUploader
                        fileInputRef={fileInputRef}
                        handleImagesPreview={handleImagesPreview} />) :
                    (

                        !isUploadImages && (
                            <CompressProgressImagesUpload
                                filesPreviewList={filePreviews}
                                setIsUploadImages={setIsUploadImages} />
                        )
                    )
            }

            {
                
                filePreviews.length === 0 && (<EmptyFileNotice noticeText='No hay archivos seleccionados, carga hasta 10 imágenes por subida ( máx. 18 MB cada una )' />)
            
            }

            {
                (isUploadImages && filePreviews.length > 0 && !isConversionComplete) && (
                    <CompressActions
                        handleCompressFiles={handleCompressFiles}
                        handleReset={handleReset}
                        filePreviews={filePreviews}
                        isLoading={isLoading} />
                )
            }

            {
                isConversionComplete && (
                    <DownloadZipImages
                        filesPreviews={filePreviews}
                        handleReset={handleReset}
                        handleDownloadAllAsZip={handleDownloadAllAsZip} />)
            }

            {
                (
                    isUploadImages && filePreviews.length > 0) && (
                    <FilesPreviewList
                        filesPreviewList={filePreviews}
                        handleRemoveFile={handleRemoveFile}
                        isLoading={isLoading} />
                )
            }


        </div>
    )
}

export default ImagesCompressor;