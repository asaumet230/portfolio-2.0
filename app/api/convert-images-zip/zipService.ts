import archiver from 'archiver';
import { PassThrough } from 'stream';

export const createZipWithImages = async (
  files: { buffer: Buffer; name: string }[]
): Promise<{ buffer: Buffer; fileName: string }> => {
  const archive = archiver('zip', { zlib: { level: 9 } });
  const stream = new PassThrough();

  const chunks: Buffer[] = [];

  stream.on('data', (chunk) => chunks.push(chunk));

  const finalizePromise = new Promise<void>((resolve, reject) => {
    stream.on('end', resolve);
    stream.on('error', reject);
  });

  archive.pipe(stream);

  for (const file of files) {
    archive.append(file.buffer, { name: file.name });
  }

  archive.finalize();

  await finalizePromise;

  const buffer = Buffer.concat(chunks);
  const fileName = `imagenes-${Date.now()}.zip`;

  return { buffer, fileName };
};
