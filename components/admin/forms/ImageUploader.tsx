'use client';

import { useState } from 'react';
import { TrashIcon, UploadIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
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
    const files = e.target.files;
    if (!files) return;

    if (images.length + files.length > maxImages) {
      toast.error(`Máximo ${maxImages} imágenes permitidas`);
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();

      Array.from(files).forEach((file) => {
        formData.append('file', file);
      });

      // Aquí iría la integración con Cloudinary
      // Por ahora, usar URLs locales para desarrollo
      const newImages = Array.from(files).map((file) => {
        return URL.createObjectURL(file);
      });

      onChange([...images, ...newImages]);
      toast.success('Imágenes agregadas');
    } catch (error: any) {
      toast.error('Error al subir imágenes');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-gray-700 dark:text-gray-300 font-medium mb-2 block">
          Imágenes ({images.length}/{maxImages})
        </span>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading || images.length >= maxImages}
            className="hidden"
            id="image-upload"
          />

          <label htmlFor="image-upload" className="cursor-pointer">
            <UploadIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400">
              {uploading ? 'Subiendo...' : 'Arrastra imágenes o haz clic'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              PNG, JPG, GIF (máx 5MB)
            </p>
          </label>
        </div>
      </label>

      {/* Image Grid */}
      {images.length > 0 && (
        <div>
          <h4 className="text-gray-700 dark:text-gray-300 font-medium mb-3">
            Imágenes agregadas
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="relative w-full h-32 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                  <Image
                    src={image}
                    alt={`Project image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>

                {/* Index Badge */}
                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
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
