import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { convertBuffer } from './convertBuffer';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const format = (formData.get('format') as string)?.toLowerCase() || 'webp';

    if (!file) {
      return NextResponse.json({ error: 'No se recibió archivo' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Subir a Cloudinary
    const uploadResult = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'temporal',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(buffer);
    });

    const imageUrl = uploadResult.secure_url;
    const publicId = uploadResult.public_id;

    // Descargar y convertir
    const cloudinaryRes = await fetch(imageUrl);
    const imageBuffer = Buffer.from(await cloudinaryRes.arrayBuffer());
    const { base64, sizeKB } = await convertBuffer(imageBuffer, format);

    // Borrar temporal
    await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });

    return NextResponse.json({
      file: {
        name: `${file.name.split('.')[0]}.${format}`,
        base64,
        sizeKB,
      },
    });

  } catch (err: any) {
    console.error('Error:', err);
    return NextResponse.json({ error: 'Error interno', detail: err.message }, { status: 500 });
  }
}
