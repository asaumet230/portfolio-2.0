'use client';

import { useState } from 'react';
import { ImageUploader } from './ImageUploader';
import toast from 'react-hot-toast';

interface ProjectFormData {
  name: string;
  slug: string;
  description: string;
  metaDescription: string;
  category: 'web' | 'mobil';
  technologies: string[];
  images: string[];
  liveUrl: string;
  repositoryUrl?: string;
  active: boolean;
}

interface ProjectFormProps {
  initialData?: Partial<ProjectFormData>;
  onSubmit: (data: ProjectFormData) => Promise<void>;
  isLoading?: boolean;
}

export function ProjectForm({
  initialData,
  onSubmit,
  isLoading = false,
}: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    metaDescription: initialData?.metaDescription || '',
    category: initialData?.category || 'web',
    technologies: initialData?.technologies || [],
    images: initialData?.images || [],
    liveUrl: initialData?.liveUrl || '',
    repositoryUrl: initialData?.repositoryUrl || '',
    active: initialData?.active !== false,
  });

  const [techInput, setTechInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.slug || !formData.description) {
      toast.error('Nombre, slug y descripción son requeridos');
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      });
      setTechInput('');
    }
  };

  const removeTechnology = (index: number) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nombre y Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Nombre del Proyecto *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            placeholder="Ej: Chilo E-commerce"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Slug *
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            placeholder="ej: chilo"
          />
        </div>
      </div>

      {/* Categoría */}
      <div>
        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          Categoría *
        </label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value as 'web' | 'mobil' })}
          className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="web">Web</option>
          <option value="mobil">Móvil</option>
        </select>
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          Descripción *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 h-32"
          placeholder="Descripción detallada del proyecto..."
        />
      </div>

      {/* Meta Descripción (SEO) */}
      <div>
        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          Meta Descripción (SEO)
          <span className="text-sm text-gray-500 ml-2">{formData.metaDescription.length}/160</span>
        </label>
        <textarea
          value={formData.metaDescription}
          onChange={(e) =>
            setFormData({
              ...formData,
              metaDescription: e.target.value.substring(0, 160),
            })
          }
          className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 h-20"
          placeholder="Descripción para buscadores (máx 160 caracteres)..."
          maxLength={160}
        />
      </div>

      {/* Tecnologías */}
      <div>
        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          Tecnologías
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
            className="flex-1 px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            placeholder="Ej: React, TypeScript..."
          />
          <button
            type="button"
            onClick={addTechnology}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Agregar
          </button>
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2">
          {formData.technologies.map((tech, index) => (
            <div
              key={index}
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTechnology(index)}
                className="hover:text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* URLs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            URL en Vivo
          </label>
          <input
            type="url"
            value={formData.liveUrl}
            onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
            className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Repositorio GitHub
          </label>
          <input
            type="url"
            value={formData.repositoryUrl || ''}
            onChange={(e) => setFormData({ ...formData, repositoryUrl: e.target.value })}
            className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            placeholder="https://github.com/..."
          />
        </div>
      </div>

      {/* Imágenes */}
      <ImageUploader
        images={formData.images}
        onChange={(images) => setFormData({ ...formData, images })}
      />

      {/* Estado */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.active}
          onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
          className="rounded"
        />
        <span className="text-gray-700 dark:text-gray-300">Proyecto Activo</span>
      </label>

      {/* Botones */}
      <div className="flex gap-4 pt-4 border-t">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded transition disabled:opacity-50"
        >
          {isLoading ? 'Guardando...' : 'Guardar Proyecto'}
        </button>
      </div>
    </form>
  );
}
