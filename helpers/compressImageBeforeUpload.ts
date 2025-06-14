import imageCompression from 'browser-image-compression';

export const compressImageBeforeUpload = async (file: File): Promise<File> => {

    const options = {
        maxSizeMB: 4.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    };

    try {

        const compressedFile = await imageCompression(file, options);
        return compressedFile;

    } catch (error: any) {

        console.error('Error al comprimir la imagen:', error.message || error);
        return file;

    }
};
