'use client';

import { useState } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';
import { FaImage, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export function ImageUploader({
  images = [],
  onChange,
  maxImages = 5,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remaining = maxImages - images.length;
    const toUpload = files.slice(0, remaining);

    if (files.length > remaining) {
      toast.error(`Solo puedes agregar ${remaining} imagen(es) más`);
    }

    setUploading(true);
    const uploaded: string[] = [];

    for (const file of toUpload) {
      try {
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/upload-project-image', { method: 'POST', body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error al subir');
        uploaded.push(data.url);
      } catch (err: any) {
        toast.error(`Error subiendo ${file.name}: ${err.message}`);
      }
    }

    if (uploaded.length) {
      onChange([...images, ...uploaded]);
      toast.success(`${uploaded.length} imagen(es) subida(s) a Cloudinary`);
    }

    setUploading(false);
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <label className={`block border-2 border-dashed rounded-lg p-8 text-center transition cursor-pointer ${
        uploading || images.length >= maxImages
          ? 'border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed'
          : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
      }`}>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading || images.length >= maxImages}
          className="hidden"
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-blue-500">
            <FaSpinner className="w-8 h-8 animate-spin" />
            <p className="text-sm font-medium">Subiendo a Cloudinary...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500">
            <FaImage className="w-8 h-8" />
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {images.length >= maxImages ? `Límite alcanzado (${maxImages})` : 'Arrastra imágenes o haz clic'}
            </p>
            <p className="text-xs">PNG, JPG, GIF (máx 5MB) · {images.length}/{maxImages}</p>
          </div>
        )}
      </label>

      {/* Grid de imágenes */}
      {images.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Imágenes agregadas
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((url, index) => (
              <div key={index} className="relative group">
                <div className="relative w-full h-32 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                  <img
                    src={url}
                    alt={`Imagen ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition"
                >
                  <TrashIcon className="w-3.5 h-3.5" />
                </button>
                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
