import sharp from 'sharp';

const formatHandlers: Record<string, (img: sharp.Sharp) => sharp.Sharp> = {
    webp: (img) => img.webp({ quality: 80 }),
    jpeg: (img) => img.jpeg({ quality: 80 }),
    jpg: (img) => img.jpeg({ quality: 80 }),
    png: (img) => img.png({ quality: 80 }),
    avif: (img) => img.avif({ quality: 80 }),
};

export const convertBuffer = async (buffer: Buffer, format: string): Promise<{ base64: string; sizeKB: number }> => {

    const img = sharp(buffer);
    const handler = formatHandlers[format];

    if (!handler) throw new Error(`Formato no soportado: ${format}`);

    const converted = await handler(img).toBuffer();

    return {
        base64: converted.toString('base64'),
        sizeKB: +(converted.length / 1024).toFixed(2),
    };
};
