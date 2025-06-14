
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ConvertedImage } from '@/interfaces';

export const generateZipFromConverted = async (images: ConvertedImage[], format: string) => {
    
    const zip = new JSZip();

    images.forEach((image, index) => {
        const base64Data = image.base64.split(',').pop()!;
        zip.file(`imagen-${index + 1}.${format}`, base64Data, { base64: true });
    });

    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, 'imagenes-convertidas.zip');
};
