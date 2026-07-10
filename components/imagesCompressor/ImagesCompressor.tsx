'use client'

import { useEffect, useRef, useState } from 'react';

import imageCompression from 'browser-image-compression';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

import { EmptyFileNotice } from '../ui';

import {
    CompareSliderModal,
    CompressActions,
    CompressionOptions,
    DownloadZipImages,
    FilesPreviewList,
    FilesUploader
} from '.';

import { CompressionMode } from './CompressionOptions';

import { validateFiles } from '@/helpers';
import { ImagePreview } from '@/interfaces';

const MAX_FILES_PER_BATCH = 20;
const PARALLEL_COMPRESSIONS = 3;


export const ImagesCompressor = () => {


    const [filePreviews, setFilePreviews] = useState<ImagePreview[]>([]);
    const [isUploadImages, setIsUploadImages] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isConversionComplete, setIsConversionComplete] = useState(false);
    const [compressionMode, setCompressionMode] = useState<CompressionMode>('recommended');
    const [targetSizeKB, setTargetSizeKB] = useState(100);
    const [maxDimension, setMaxDimension] = useState<number | null>(null);
    const [compareItem, setCompareItem] = useState<ImagePreview | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const revokePreviewUrls = (preview: ImagePreview) => {
        URL.revokeObjectURL(preview.url);
        if (preview.originalUrl && preview.originalUrl !== preview.url) {
            URL.revokeObjectURL(preview.originalUrl);
        }
    }

    const handleImagesPreview = (files: FileList | null) => {

        if (!validateFiles(files) || files === null) return;

        if (filePreviews.length + files.length > MAX_FILES_PER_BATCH) {
            Swal.fire('¡Ups!', `Solo se permiten hasta ${MAX_FILES_PER_BATCH} imágenes en total por lote.`, 'warning');
            return;
        }

        const previews: ImagePreview[] = Array.from(files).map(file => {
            const url = URL.createObjectURL(file);
            return {
                id: crypto.randomUUID(),
                file,
                url,
                originalUrl: url,
                originalSizeKB: +(file.size / 1024).toFixed(2),
                progress: 0
            };
        });

        setFilePreviews(prev => [...prev, ...previews]);
        setIsUploadImages(true);
        setIsConversionComplete(false);
        setIsLoading(false);
    }

    // Pegar imágenes desde el portapapeles (Ctrl+V / Cmd+V)
    useEffect(() => {
        const handlePaste = (e: ClipboardEvent) => {

            if (isLoading) return;

            const images = Array.from(e.clipboardData?.files ?? [])
                .filter(file => file.type.startsWith('image/'));

            if (images.length === 0) return;

            const dataTransfer = new DataTransfer();
            images.forEach(file => dataTransfer.items.add(file));
            handleImagesPreview(dataTransfer.files);
        };

        window.addEventListener('paste', handlePaste);
        return () => window.removeEventListener('paste', handlePaste);
    });

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

    const compressOne = async (image: ImagePreview): Promise<boolean> => {

        const { id, file } = image;

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
                return true;
            }

            const compressedFile = new File([compressedBlob], file.name, {
                type: file.type,
                lastModified: file.lastModified
            });

            updatePreview(id, {
                file: compressedFile,
                url: URL.createObjectURL(compressedFile),
                convertedSizeKB: +(compressedFile.size / 1024).toFixed(2),
                progress: 100,
                completed: true
            });
            return true;

        } catch (error) {
            updatePreview(id, { progress: 0, error: 'No se pudo comprimir esta imagen' });
            return false;
        }
    }

    const handleCompressFiles = async () => {

        setIsLoading(true);

        // Solo las pendientes: permite agregar imágenes tras una compresión previa y reintentar fallidas
        const pendingImages = filePreviews.filter(item => !item.completed);
        setFilePreviews(prev =>
            prev.map(item => item.error ? { ...item, error: undefined, progress: 0 } : item)
        );

        const queue = [...pendingImages];
        let failedCount = 0;

        const workers = Array.from(
            { length: Math.min(PARALLEL_COMPRESSIONS, queue.length) },
            async () => {
                let image = queue.shift();
                while (image) {
                    const succeeded = await compressOne(image);
                    if (!succeeded) failedCount++;
                    image = queue.shift();
                }
            }
        );

        await Promise.all(workers);

        setIsConversionComplete(true);

        const total = pendingImages.length;

        if (failedCount === 0) {
            Swal.fire('¡Listo!', 'Las imágenes fueron comprimidas con éxito.', 'success');
        } else if (failedCount < total) {
            Swal.fire('Atención', `Se comprimieron ${total - failedCount} de ${total} imágenes. ${failedCount === 1 ? 'Una no se pudo procesar' : `${failedCount} no se pudieron procesar`}.`, 'warning');
        } else {
            Swal.fire('¡Ups!', 'No se pudo comprimir ninguna imagen. Intenta con otros archivos.', 'error');
        }
    }

    const handleAddMoreFiles = () => {
        fileInputRef.current?.click();
    }

    const handleReset = () => {

        filePreviews.forEach(revokePreviewUrls);

        setFilePreviews([]);
        setIsUploadImages(false);
        setIsConversionComplete(false);
        setIsLoading(false);
        setCompareItem(null);
    }

    const handleRemoveFile = (index: number) => {

        setFilePreviews(prev => {

            revokePreviewUrls(prev[index])
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
                onChange={(e) => {
                    handleImagesPreview(e.target.files);
                    e.target.value = '';
                }}
                className="hidden" />

            {
                filePreviews.length === 0 && (
                    <FilesUploader
                        fileInputRef={fileInputRef}
                        handleImagesPreview={handleImagesPreview} />
                )
            }

            {

                filePreviews.length === 0 && (<EmptyFileNotice noticeText='No hay archivos seleccionados, carga hasta 20 imágenes por subida ( máx. 18 MB cada una ) o pégalas con Ctrl+V' />)

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
                            handleAddMoreFiles={handleAddMoreFiles}
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
                        handleCompareFile={setCompareItem}
                        isLoading={isLoading} />
                )
            }

            {
                compareItem && (
                    <CompareSliderModal
                        item={compareItem}
                        onClose={() => setCompareItem(null)} />
                )
            }


        </div>
    )
}

export default ImagesCompressor;
