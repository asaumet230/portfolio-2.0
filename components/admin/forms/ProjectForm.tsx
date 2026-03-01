'use client';

import { useState } from 'react';
import { ImageUploader } from './ImageUploader';
import { RichTextEditor } from './RichTextEditor';
import toast from 'react-hot-toast';

interface SEOMetadata {
  author?: string;
  canonical?: string;
  description?: string;
  keywords?: string[];
  ogDescription?: string;
  ogImage?: string;
  ogTitle?: string;
  title?: string;
}

interface PolicyDocument {
  content?: string;
  effectiveDate?: string;
}

interface ProjectFormData {
  name: string;
  slug: string;
  description: string;
  projectGoal?: string;
  category: 'web' | 'mobil';
  technologies: string[];
  images: string[];
  urlApp?: string;
  urlRepository?: string;
  seoMetadata?: SEOMetadata;
  hasPrivacyPolicy?: boolean;
  hasTermsOfService?: boolean;
  privacyPolicy?: PolicyDocument;
  termsOfService?: PolicyDocument;
  active?: boolean;
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
    projectGoal: initialData?.projectGoal || '',
    category: initialData?.category || 'web',
    technologies: initialData?.technologies || [],
    images: initialData?.images || [],
    urlApp: initialData?.urlApp || '',
    urlRepository: initialData?.urlRepository || '',
    seoMetadata: {
      author: initialData?.seoMetadata?.author || '',
      canonical: initialData?.seoMetadata?.canonical || '',
      description: initialData?.seoMetadata?.description || '',
      keywords: initialData?.seoMetadata?.keywords || [],
      ogDescription: initialData?.seoMetadata?.ogDescription || '',
      ogImage: initialData?.seoMetadata?.ogImage || '',
      ogTitle: initialData?.seoMetadata?.ogTitle || '',
      title: initialData?.seoMetadata?.title || '',
    },
    hasPrivacyPolicy: initialData?.hasPrivacyPolicy || false,
    hasTermsOfService: initialData?.hasTermsOfService || false,
    privacyPolicy: {
      content: initialData?.privacyPolicy?.content || '',
      effectiveDate: initialData?.privacyPolicy?.effectiveDate || new Date().toISOString().split('T')[0],
    },
    termsOfService: {
      content: initialData?.termsOfService?.content || '',
      effectiveDate: initialData?.termsOfService?.effectiveDate || new Date().toISOString().split('T')[0],
    },
    active: initialData?.active !== false,
  });

  const [techInput, setTechInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    goal: false,
    seo: false,
    urls: false,
    images: false,
    policies: false,
    advanced: false,
  });

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

  const addKeyword = () => {
    if (keywordInput.trim() && formData.seoMetadata) {
      const newKeywords = formData.seoMetadata.keywords || [];
      setFormData({
        ...formData,
        seoMetadata: {
          ...formData.seoMetadata,
          keywords: [...newKeywords, keywordInput.trim()],
        },
      });
      setKeywordInput('');
    }
  };

  const removeKeyword = (index: number) => {
    if (formData.seoMetadata) {
      setFormData({
        ...formData,
        seoMetadata: {
          ...formData.seoMetadata,
          keywords: formData.seoMetadata.keywords?.filter((_, i) => i !== index) || [],
        },
      });
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const SectionHeader = ({ title, section }: { title: string; section: keyof typeof expandedSections }) => (
    <button
      type="button"
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
    >
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</h3>
      <span className="text-xl">{expandedSections[section] ? '▼' : '▶'}</span>
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* SECCIÓN 1: INFORMACIÓN BÁSICA */}
      <SectionHeader title="📝 Información Básica" section="basic" />
      {expandedSections.basic && (
        <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
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

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Descripción *
            </label>
            <RichTextEditor
              value={formData.description}
              onChange={(content) => setFormData({ ...formData, description: content })}
              placeholder="Descripción detallada del proyecto..."
              height="h-48"
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
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech, index) => (
                <div
                  key={index}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {tech}
                  <button type="button" onClick={() => removeTechnology(index)} className="hover:text-red-600">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN 2: OBJETIVO DEL PROYECTO */}
      <SectionHeader title="🎯 Objetivo del Proyecto" section="goal" />
      {expandedSections.goal && (
        <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Objetivo del Proyecto
            </label>
            <RichTextEditor
              value={formData.projectGoal || ''}
              onChange={(content) => setFormData({ ...formData, projectGoal: content })}
              placeholder="Describe el objetivo principal del proyecto..."
              height="h-40"
            />
          </div>
        </div>
      )}

      {/* SECCIÓN 3: SEO */}
      <SectionHeader title="🔍 SEO y Meta Datos" section="seo" />
      {expandedSections.seo && (
        <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Título SEO
            </label>
            <input
              type="text"
              value={formData.seoMetadata?.title || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  seoMetadata: { ...formData.seoMetadata, title: e.target.value },
                })
              }
              className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              placeholder="Ej: Chilo E-commerce - Ropa y Accesorios Online"
              maxLength={60}
            />
            <p className="text-sm text-gray-500 mt-1">{formData.seoMetadata?.title?.length || 0}/60</p>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Meta Descripción
              <span className="text-sm text-gray-500 ml-2">{formData.seoMetadata?.description?.length || 0}/160</span>
            </label>
            <RichTextEditor
              value={formData.seoMetadata?.description || ''}
              onChange={(content) =>
                setFormData({
                  ...formData,
                  seoMetadata: { ...formData.seoMetadata, description: content.substring(0, 160) },
                })
              }
              placeholder="Descripción para buscadores..."
              height="h-32"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Keywords
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                className="flex-1 px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                placeholder="Ej: ecommerce, ropa online..."
              />
              <button
                type="button"
                onClick={addKeyword}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Agregar
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.seoMetadata?.keywords?.map((keyword, index) => (
                <div
                  key={index}
                  className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {keyword}
                  <button type="button" onClick={() => removeKeyword(index)} className="hover:text-red-600">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              OG Title (Redes Sociales)
            </label>
            <input
              type="text"
              value={formData.seoMetadata?.ogTitle || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  seoMetadata: { ...formData.seoMetadata, ogTitle: e.target.value },
                })
              }
              className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              placeholder="Título para compartir en redes sociales"
              maxLength={60}
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              OG Description (Redes Sociales)
            </label>
            <textarea
              value={formData.seoMetadata?.ogDescription || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  seoMetadata: { ...formData.seoMetadata, ogDescription: e.target.value },
                })
              }
              className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 h-20"
              placeholder="Descripción para compartir en redes sociales"
              maxLength={160}
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              OG Image URL (Imagen para redes sociales)
            </label>
            <input
              type="url"
              value={formData.seoMetadata?.ogImage || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  seoMetadata: { ...formData.seoMetadata, ogImage: e.target.value },
                })
              }
              className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Canonical URL
            </label>
            <input
              type="url"
              value={formData.seoMetadata?.canonical || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  seoMetadata: { ...formData.seoMetadata, canonical: e.target.value },
                })
              }
              className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              placeholder="https://www.example.com/proyecto"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Autor
            </label>
            <input
              type="text"
              value={formData.seoMetadata?.author || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  seoMetadata: { ...formData.seoMetadata, author: e.target.value },
                })
              }
              className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              placeholder="Ej: Andres Saumet"
            />
          </div>
        </div>
      )}

      {/* SECCIÓN 4: URLs */}
      <SectionHeader title="🔗 URLs del Proyecto" section="urls" />
      {expandedSections.urls && (
        <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              URL en Vivo (urlApp)
            </label>
            <input
              type="url"
              value={formData.urlApp || ''}
              onChange={(e) => setFormData({ ...formData, urlApp: e.target.value })}
              className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              placeholder="https://www.ejemplo.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              URL Repositorio (GitHub)
            </label>
            <input
              type="url"
              value={formData.urlRepository || ''}
              onChange={(e) => setFormData({ ...formData, urlRepository: e.target.value })}
              className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              placeholder="https://github.com/usuario/repo"
            />
          </div>
        </div>
      )}

      {/* SECCIÓN 5: IMÁGENES */}
      <SectionHeader title="🖼️ Imágenes" section="images" />
      {expandedSections.images && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <ImageUploader
            images={formData.images}
            onChange={(images) => setFormData({ ...formData, images })}
          />
        </div>
      )}

      {/* SECCIÓN 6: POLÍTICAS LEGALES */}
      <SectionHeader title="📋 Políticas Legales" section="policies" />
      {expandedSections.policies && (
        <div className="space-y-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          {/* Política de Privacidad */}
          <div className="border-b pb-6">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">🔐 Política de Privacidad</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Fecha Efectiva
                </label>
                <input
                  type="date"
                  value={formData.privacyPolicy?.effectiveDate || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      privacyPolicy: {
                        ...formData.privacyPolicy,
                        effectiveDate: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Contenido
                </label>
                <RichTextEditor
                  value={formData.privacyPolicy?.content || ''}
                  onChange={(content) =>
                    setFormData({
                      ...formData,
                      privacyPolicy: {
                        ...formData.privacyPolicy,
                        content,
                      },
                    })
                  }
                  placeholder="Contenido completo de la política de privacidad..."
                  height="h-48"
                />
              </div>
            </div>
          </div>

          {/* Términos de Servicio */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">⚖️ Términos y Condiciones</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Fecha Efectiva
                </label>
                <input
                  type="date"
                  value={formData.termsOfService?.effectiveDate || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      termsOfService: {
                        ...formData.termsOfService,
                        effectiveDate: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Contenido
                </label>
                <RichTextEditor
                  value={formData.termsOfService?.content || ''}
                  onChange={(content) =>
                    setFormData({
                      ...formData,
                      termsOfService: {
                        ...formData.termsOfService,
                        content,
                      },
                    })
                  }
                  placeholder="Contenido completo de términos y condiciones..."
                  height="h-48"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN 7: AVANZADO */}
      <SectionHeader title="⚙️ Configuración Avanzada" section="advanced" />
      {expandedSections.advanced && (
        <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.hasPrivacyPolicy || false}
              onChange={(e) => setFormData({ ...formData, hasPrivacyPolicy: e.target.checked })}
              className="rounded"
            />
            <span className="text-gray-700 dark:text-gray-300">Tiene Política de Privacidad</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.hasTermsOfService || false}
              onChange={(e) => setFormData({ ...formData, hasTermsOfService: e.target.checked })}
              className="rounded"
            />
            <span className="text-gray-700 dark:text-gray-300">Tiene Términos y Condiciones</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.active || false}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="rounded"
            />
            <span className="text-gray-700 dark:text-gray-300">Proyecto Activo</span>
          </label>
        </div>
      )}

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
