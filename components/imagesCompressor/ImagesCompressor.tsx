'use client'

import { useRef, useState } from 'react';

import imageCompression from 'browser-image-compression';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

import { EmptyFileNotice } from '../ui';

import {
    CompressActions,
    CompressionOptions,
    DownloadZipImages,
    FilesPreviewList,
    FilesUploader
} from '.';

import { CompressionMode } from './CompressionOptions';

import { validateFiles } from '@/helpers';
import { ImagePreview } from '@/interfaces';


export const ImagesCompressor = () => {


    const [filePreviews, setFilePreviews] = useState<ImagePreview[]>([]);
    const [isUploadImages, setIsUploadImages] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isConversionComplete, setIsConversionComplete] = useState(false);
    const [compressionMode, setCompressionMode] = useState<CompressionMode>('recommended');
    const [targetSizeKB, setTargetSizeKB] = useState(100);
    const [maxDimension, setMaxDimension] = useState<number | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImagesPreview = (files: FileList | null) => {

        if (!validateFiles(files) || files === null) return;

        const previews: ImagePreview[] = Array.from(files).map(file => ({
            id: crypto.randomUUID(),
            file,
            url: URL.createObjectURL(file),
            originalSizeKB: +(file.size / 1024).toFixed(2),
            progress: 0
        }));

        setFilePreviews(previews);
        setIsUploadImages(true);
    }

    const getCompressionSettings = () => {

        const resize = maxDimension ? { maxWidthOrHeight: maxDimension } : {};

        switch (compressionMode) {
            case 'high':
                return { maxSizeMB: 4, initialQuality: 0.9, ...resize };
            case 'max':
                return { maxSizeMB: 0.3, initialQuality: 0.6, ...resize };
            case 'target':
                return { maxSizeMB: Math.max(targetSizeKB, 10) / 1024, ...resize };
            default:
                return { maxSizeMB: 1, ...resize };
        }
    }

    const updatePreview = (id: string | undefined, changes: Partial<ImagePreview>) => {
        setFilePreviews(prev =>
            prev.map(item => item.id === id ? { ...item, ...changes } : item)
        );
    }

    const handleCompressFiles = async () => {

        setIsLoading(true);

        let failedCount = 0;

        for (const image of filePreviews) {

            const { id, file, url } = image;

            try {

                const compressedBlob = await imageCompression(file, {
                    ...getCompressionSettings(),
                    useWebWorker: true,
                    onProgress: (progress) => updatePreview(id, { progress })
                });

                // Si la imagen ya estaba optimizada y no se redimensionó, conservar la original
                if (compressedBlob.size >= file.size && !maxDimension) {
                    updatePreview(id, {
                        convertedSizeKB: +(file.size / 1024).toFixed(2),
                        progress: 100,
                        completed: true,
                        keptOriginal: true
                    });
                    continue;
                }

                const compressedFile = new File([compressedBlob], file.name, {
                    type: file.type,
                    lastModified: file.lastModified
                });

                const newUrl = URL.createObjectURL(compressedFile);
                URL.revokeObjectURL(url);

                updatePreview(id, {
                    file: compressedFile,
                    url: newUrl,
                    convertedSizeKB: +(compressedFile.size / 1024).toFixed(2),
                    progress: 100,
                    completed: true
                });

            } catch (error) {
                failedCount++;
                updatePreview(id, { progress: 0, error: 'No se pudo comprimir esta imagen' });
            }
        }

        setIsConversionComplete(true);

        if (failedCount === 0) {
            Swal.fire('¡Listo!', 'Las imágenes fueron comprimidas con éxito.', 'success');
        } else if (failedCount < filePreviews.length) {
            Swal.fire('Atención', `Se comprimieron ${filePreviews.length - failedCount} de ${filePreviews.length} imágenes. ${failedCount === 1 ? 'Una no se pudo procesar' : `${failedCount} no se pudieron procesar`}.`, 'warning');
        } else {
            Swal.fire('¡Ups!', 'No se pudo comprimir ninguna imagen. Intenta con otros archivos.', 'error');
        }
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

            if (preview.error) continue;

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
        <div className="bg-white p-2 sm:p-6 dark:bg-gray-700">

            <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => handleImagesPreview(e.target.files)}
                className="hidden" />

            {
                filePreviews.length === 0 && (
                    <FilesUploader
                        fileInputRef={fileInputRef}
                        handleImagesPreview={handleImagesPreview} />
                )
            }

            {

                filePreviews.length === 0 && (<EmptyFileNotice noticeText='No hay archivos seleccionados, carga hasta 20 imágenes por subida ( máx. 18 MB cada una )' />)

            }

            {
                (isUploadImages && filePreviews.length > 0 && !isConversionComplete) && (
                    <>
                        <CompressionOptions
                            compressionMode={compressionMode}
                            setCompressionMode={setCompressionMode}
                            targetSizeKB={targetSizeKB}
                            setTargetSizeKB={setTargetSizeKB}
                            maxDimension={maxDimension}
                            setMaxDimension={setMaxDimension}
                            isLoading={isLoading} />
                        <CompressActions
                            handleCompressFiles={handleCompressFiles}
                            handleReset={handleReset}
                            filePreviews={filePreviews}
                            isLoading={isLoading} />
                    </>
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
