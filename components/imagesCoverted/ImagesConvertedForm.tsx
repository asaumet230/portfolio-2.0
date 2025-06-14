'use client'

import { useRef, useState } from 'react';

import Swal from 'sweetalert2';

import { UploadProgressOverlay } from '..';

import {
    ConvertActions,
    ConvertedImageGallery,
    DownloadActions,
    FilePreviewList,
    FileUploader,
    FormatSelector,
    EmptyFileNotice
} from '.';

import { useAppDispatch, useAppSelector } from '@/store';
import { isImagesLoad, isSelectedFiles } from '@/store/imageComponentsLoad/imagesComponentsLoad';

import { ConvertedFile, ImagePreview } from '@/interfaces';
import { compressImageBeforeUpload, generateZipFromConverted, uploadAndConvertImage } from '@/helpers';


export const ImagesForm = () => {

    const [conversionFinished, setConversionFinished] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [outputFormat, setOutputFormat] = useState('webp');
    const [urls, setUrls] = useState<string[]>([]);

    const [filePreviews, setFilePreviews] = useState<ImagePreview[]>([]);
    const [filesToConvert, setFilesToConvert] = useState<FileList | null>(null);
    const [imagesData, setImagesData] = useState<ConvertedFile[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch();
    const imagesLoad = useAppSelector(state => state.imagesComponentsLoad.isImagesLoad);

    const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
        'image/avif',
    ];

    const validateAndStoreFiles = (files: FileList | null) => {

        const MAX_IMAGE_SIZE_MB = 12;

        if (!files || files.length === 0) {
            Swal.fire('¡Ups!', 'Selecciona al menos una imagen.', 'warning');
            return;
        }

        const invalidFiles = Array.from(files).filter(file => !allowedTypes.includes(file.type));
        if (invalidFiles.length > 0) {
            Swal.fire('Formato inválido', 'Solo se permiten imágenes en formato jpg, jpeg, png, webp y avif', 'error');
            return;
        }

        if (files.length > 5) {
            Swal.fire('¡Ups!', 'Solo se permiten hasta 5 imágenes a la vez.', 'warning');
            return;
        }

        const oversizedFiles = Array.from(files).filter(file => file.size / 1024 / 1024 > MAX_IMAGE_SIZE_MB);
        if (oversizedFiles.length > 0) {
            const names = oversizedFiles.map(f => f.name).join(', ');
            Swal.fire('Imagen muy grande', `Estas imágenes superan los ${MAX_IMAGE_SIZE_MB} MB: ${names}`, 'error');
            return;
        }


        const sameFormatImages = Array.from(files).every(file => {
            const fileExt = file.name.split('.').pop()?.toLowerCase();
            return fileExt === outputFormat.toLowerCase();
        });

        if (sameFormatImages) {
            Swal.fire(
                'Formato inválido',
                `Todas las imágenes ya están en formato .${outputFormat}. Por favor selecciona un formato de salida diferente.`,
                'warning'
            );
            return;
        }

        const newPreviews = Array.from(files).map(file => ({
            file,
            url: URL.createObjectURL(file),
            originalSizeKB: +(file.size / 1024).toFixed(2),
            progress: 0
        }));

        setFilesToConvert(files);
        dispatch(isSelectedFiles(true));
        setFilePreviews(newPreviews);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        validateAndStoreFiles(files);
    };

    const handleConvert = async () => {

        if (!filesToConvert || filesToConvert.length === 0) {
            Swal.fire('¡Ups!', 'Primero debes seleccionar imágenes válidas.', 'warning');
            return;
        }

        setIsLoading(true);
        const updatedUrls: string[] = [];

        for (let i = 0; i < filePreviews.length; i++) {
            const preview = filePreviews[i];

            try {

                const compressedFile = await compressImageBeforeUpload(preview.file);
                const converted = await uploadAndConvertImage(compressedFile, outputFormat, (percent) => {
                    setFilePreviews(prev =>
                        prev.map((p, idx) =>
                            idx === i ? { ...p, progress: percent } : p
                        )
                    );
                });

                setFilePreviews(prev =>
                    prev.map((p, idx) =>
                        idx === i ? { ...p, convertedSizeKB: converted.sizeKB, progress: 100, completed: true } : p
                    )
                );

                updatedUrls.push(`data:image/${outputFormat};base64,${converted.base64}`);

            } catch (error) {
                console.error(`Fallo al convertir imagen ${preview.file.name}`, error);
            }
        }

        setUrls(updatedUrls);
        setConversionFinished(true);

        const successfulPreviews = filePreviews.filter((_, i) => updatedUrls[i]);
        const imagesData = successfulPreviews.map((preview, index) => ({
            base64: updatedUrls[index].split(',').pop()!,
            name: preview.file.name,
            sizeKB: preview.convertedSizeKB ?? 0,
        }));

        setImagesData(imagesData);

        if (updatedUrls.length === 0) {
            Swal.fire('Error', 'No se pudo convertir ninguna imagen.', 'error');
        } else if (updatedUrls.length < filePreviews.length) {
            Swal.fire('¡Parcialmente convertido!', `Se convirtieron ${updatedUrls.length} de ${filePreviews.length} imágenes.`, 'warning');
        } else {
            Swal.fire('¡Listo!', 'Las imágenes fueron convertidas con éxito.', 'success');
        }
    };

    const handleDownloadAllAsZip = async () => {
        
        if (!urls || urls.length === 0) {
            Swal.fire('¡Ups!', 'Primero debes convertir las imágenes.', 'warning');
            return;
        }

        await generateZipFromConverted(imagesData, outputFormat);
    };

    const handleDownloadByUrl = (url: string, filename: string) => {

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleRemoveFile = (index: number) => {

        if (filePreviews.length === 1) {
            return handleReset();
        }

        const updated = [...filePreviews];

        updated.splice(index, 1);
        setFilePreviews(updated);

        const updatedFiles = new DataTransfer();
        updated.forEach(p => updatedFiles.items.add(p.file));
        setFilesToConvert(updatedFiles.files);
    };

    const handleReset = () => {
        setUrls([]);
        setFilePreviews([]);
        setOutputFormat('webp');
        setFilesToConvert(null);
        setConversionFinished(false);
        setIsDragging(false);
        setIsLoading(false);
        dispatch(isImagesLoad(false));
        dispatch(isSelectedFiles(false));
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className='flex flex-col items-center justify-center'>

            {
                filePreviews.length === 0 && (
                    <FormatSelector
                        outputFormat={outputFormat}
                        setOutputFormat={setOutputFormat} />
                )
            }

            <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => validateAndStoreFiles(e.target.files)}
                className="hidden" />

            {
                filePreviews.length === 0 ? (

                    <FileUploader
                        handleDrop={handleDrop}
                        setIsDragging={setIsDragging}
                        isDragging={isDragging}
                        fileInputRef={fileInputRef}
                    />

                ) : (
                    <UploadProgressOverlay filesToConvert={filesToConvert} />
                )
            }

            {
                imagesLoad && !conversionFinished && (
                    <ConvertActions
                        filesToConvert={filesToConvert}
                        handleConvert={handleConvert}
                        handleReset={handleReset} 
                        isLoading={isLoading}/>
                )
            }
            {
                imagesLoad && conversionFinished && (
                    <DownloadActions
                        filesToConvert={filesToConvert}
                        handleDownloadAllAsZip={handleDownloadAllAsZip}
                        handleReset={handleReset} />
                )
            }

            {
                imagesLoad && (
                    <FilePreviewList
                        filePreviews={filePreviews}
                        urls={urls}
                        isLoading={isLoading}
                        outputFormat={outputFormat}
                        handleDownloadByUrl={handleDownloadByUrl}
                        handleRemoveFile={handleRemoveFile} />
                )
            }

            {
                filePreviews.length === 0 && (<EmptyFileNotice noticeText='No has seleccionado ningún archivo, selecciona hasta 5 imágenes por carga ( máx. 12 MB cada una ).' />)
            }

            {urls.length > 0 && (
                <ConvertedImageGallery
                    urls={urls}
                    filePreviews={filePreviews}
                    outputFormat={outputFormat}
                    handleDownloadByUrl={handleDownloadByUrl} />
            )
            }

        </div>
    );
};

export default ImagesForm;
