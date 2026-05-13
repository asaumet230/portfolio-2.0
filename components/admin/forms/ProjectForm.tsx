'use client';

import { useState, useEffect } from 'react';
import { TrashIcon, UploadIcon } from '@radix-ui/react-icons';
import { ImageUploader } from './ImageUploader';
import { RichTextEditor } from './RichTextEditor';
import toast from 'react-hot-toast';
import {
  FaProjectDiagram, FaLink, FaTag, FaSearch, FaHeading,
  FaAlignLeft, FaGlobe, FaGithub, FaUser, FaImage,
  FaChevronDown, FaChevronRight, FaShieldAlt, FaCog,
  FaBullseye, FaCalendarAlt, FaHashtag,
} from 'react-icons/fa';

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

const inputClass = 'w-full pl-10 pr-3 py-2 border rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500';
const inputErrorClass = 'w-full pl-10 pr-3 py-2 border-2 border-red-500 rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400';
const iconClass = 'absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4';

const FieldError = ({ msg }: { msg?: string }) =>
  msg ? <p className="text-red-500 text-xs mt-1 flex items-center gap-1">⚠ {msg}</p> : null;

const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
    {children} <span className="text-red-500">*</span>
  </label>
);

const todayDate = () => new Date().toISOString().split('T')[0];

const normalizeDateInput = (value?: string, fallback = '') => {
  if (!value) return fallback;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return fallback;

  return parsed.toISOString().split('T')[0];
};

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
      effectiveDate: normalizeDateInput(initialData?.privacyPolicy?.effectiveDate, todayDate()),
    },
    termsOfService: {
      content: initialData?.termsOfService?.content || '',
      effectiveDate: normalizeDateInput(initialData?.termsOfService?.effectiveDate, todayDate()),
    },
    active: initialData?.active !== false,
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const VALID_TECHNOLOGIES = [
    'wordpress','css','bootstrap','nextjs','typescript','nodejs',
    'angular','gatsby','reactjs','javascript','flutter','dart','tailwind',
  ];

  const [techInput, setTechInput] = useState('');
  const [techSuggestions, setTechSuggestions] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [uploadingOg, setUploadingOg] = useState(false);
  const [ogImageName, setOgImageName] = useState(() => {
    const ogImage = initialData?.seoMetadata?.ogImage || '';
    if (!ogImage) return '';
    const parts = ogImage.split('/');
    return parts[parts.length - 1]?.split('.')[0] || '';
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    goal: false,
    seo: false,
    urls: false,
    images: false,
    policies: false,
    advanced: false,
  });

  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '').trim();

  const isValidUrl = (url: string) => {
    try { new URL(url); return true; } catch { return false; }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = 'El nombre es requerido';
    if (!formData.slug.trim()) errors.slug = 'El slug es requerido';
    if (!stripHtml(formData.description)) errors.description = 'La descripción es requerida';
    if (formData.description.length > 2000) errors.description = `La descripción excede 2000 caracteres (actualmente ${formData.description.length})`;
    if (formData.technologies.length === 0) errors.technologies = 'Agrega al menos 1 tecnología';
    if (formData.images.length === 0) errors.images = 'Agrega al menos 1 imagen';
    if (!formData.urlApp?.trim()) errors.urlApp = 'La URL del proyecto en vivo es requerida';
    else if (!isValidUrl(formData.urlApp)) errors.urlApp = 'La URL del proyecto no es válida';
    if (!formData.urlRepository?.trim()) errors.urlRepository = 'La URL del repositorio es requerida';
    else if (!isValidUrl(formData.urlRepository)) errors.urlRepository = 'La URL del repositorio no es válida';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      // Auto-abrir sección con errores
      const basicErrors = ['name', 'slug', 'description', 'technologies'];
      const urlErrors = ['urlApp', 'urlRepository'];
      const imageErrors = ['images'];
      const hasBasic = basicErrors.some(k => errors[k]);
      const hasUrls = urlErrors.some(k => errors[k]);
      const hasImages = imageErrors.some(k => errors[k]);
      setExpandedSections(prev => ({
        ...prev,
        basic: prev.basic || hasBasic,
        urls: prev.urls || hasUrls,
        images: prev.images || hasImages,
      }));
      toast.error('Completa los campos requeridos marcados en rojo');
      return;
    }

    setFieldErrors({});
    try {
      await onSubmit({
        ...formData,
        privacyPolicy: formData.privacyPolicy
          ? {
              ...formData.privacyPolicy,
              effectiveDate: normalizeDateInput(formData.privacyPolicy.effectiveDate),
            }
          : undefined,
        termsOfService: formData.termsOfService
          ? {
              ...formData.termsOfService,
              effectiveDate: normalizeDateInput(formData.termsOfService.effectiveDate),
            }
          : undefined,
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addTechnology = (value?: string) => {
    const tech = (value || techInput).trim().toLowerCase();
    if (!tech) return;
    if (!VALID_TECHNOLOGIES.includes(tech)) {
      toast.error(`"${tech}" no es válida. Selecciona una de las sugerencias.`);
      return;
    }
    if (formData.technologies.includes(tech)) {
      toast.error('Ya agregaste esa tecnología');
      return;
    }
    setFormData({ ...formData, technologies: [...formData.technologies, tech] });
    setTechInput('');
    setTechSuggestions([]);
    setFieldErrors(p => ({ ...p, technologies: '' }));
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
    setExpandedSections({ ...expandedSections, [section]: !expandedSections[section] });
  };

  const handleOgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingOg(true);
      const fd = new FormData();
      fd.append('file', file);
      fd.append('name', ogImageName || `${formData.slug || 'project'}-og`);

      const res = await fetch('/api/upload-og', { method: 'POST', body: fd });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error al subir imagen OG');

      setFormData((prev) => ({
        ...prev,
        seoMetadata: {
          ...prev.seoMetadata,
          ogImage: data.url,
        },
      }));

      if (!ogImageName) {
        const parts = (data.url as string).split('/');
        setOgImageName(parts[parts.length - 1]?.split('.')[0] || '');
      }

      toast.success('Imagen Open Graph subida');
    } catch (error: any) {
      toast.error(error.message || 'Error al subir imagen OG');
    } finally {
      setUploadingOg(false);
      e.target.value = '';
    }
  };

  const SectionToggle = ({ title, section, icon: Icon }: { title: string; section: keyof typeof expandedSections; icon: React.ComponentType<{ className?: string }> }) => (
    <button
      type="button"
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between py-1 text-left group"
    >
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
      </div>
      {expandedSections[section]
        ? <FaChevronDown className="w-3 h-3 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition" />
        : <FaChevronRight className="w-3 h-3 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition" />
      }
    </button>
  );

  if (!mounted) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {/* Información Básica */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <SectionToggle title="Información Básica" section="basic" icon={FaProjectDiagram} />
        {expandedSections.basic && (
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <RequiredLabel>Nombre del proyecto</RequiredLabel>
                <div className="relative">
                  <FaProjectDiagram className={iconClass} />
                  <input type="text" placeholder="Ej: Mi App Web" value={formData.name}
                    onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setFieldErrors(p => ({ ...p, name: '' })); }}
                    className={fieldErrors.name ? inputErrorClass : inputClass} />
                </div>
                <FieldError msg={fieldErrors.name} />
              </div>
              <div>
                <RequiredLabel>Slug</RequiredLabel>
                <div className="relative">
                  <FaLink className={iconClass} />
                  <input type="text" placeholder="mi-app-web" value={formData.slug}
                    onChange={(e) => { setFormData({ ...formData, slug: e.target.value }); setFieldErrors(p => ({ ...p, slug: '' })); }}
                    className={fieldErrors.slug ? inputErrorClass : inputClass} />
                </div>
                <FieldError msg={fieldErrors.slug} />
              </div>
            </div>

            <div className="relative">
              <FaTag className={`${iconClass} top-[20px]`} />
              <select value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as 'web' | 'mobil' })}
                className={inputClass}>
                <option value="web">Web</option>
                <option value="mobil">Móvil</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <RequiredLabel>Descripción</RequiredLabel>
                <span className={`text-xs ${formData.description.length > 2000 ? 'text-red-500 font-semibold' : 'text-gray-400'}`}>
                  {formData.description.length}/2000 chars HTML
                </span>
              </div>
              <RichTextEditor
                value={formData.description}
                onChange={(content) => { setFormData({ ...formData, description: content }); setFieldErrors(p => ({ ...p, description: '' })); }}
                placeholder="Descripción del proyecto (máx. 2000 caracteres incluyendo HTML)..."
                height="h-48"
              />
              <FieldError msg={fieldErrors.description} />
            </div>

            <div className="pt-4 border-t dark:border-gray-700">
              <RequiredLabel>Tecnologías</RequiredLabel>
            </div>
            <div className="relative">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <FaHashtag className={iconClass} />
                  <input
                    type="text"
                    placeholder="Escribe para buscar: reactjs, nextjs, flutter..."
                    value={techInput}
                    onChange={(e) => {
                      const val = e.target.value;
                      setTechInput(val);
                      setTechSuggestions(
                        val.trim()
                          ? VALID_TECHNOLOGIES.filter(
                              (t) => t.includes(val.toLowerCase()) && !formData.technologies.includes(t)
                            )
                          : []
                      );
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') { e.preventDefault(); addTechnology(); }
                      if (e.key === 'Escape') setTechSuggestions([]);
                    }}
                    className={fieldErrors.technologies && formData.technologies.length === 0 ? inputErrorClass : inputClass}
                    autoComplete="off"
                  />
                </div>
                <button type="button" onClick={() => addTechnology()}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm font-medium shrink-0">
                  Agregar
                </button>
              </div>
              {/* Sugerencias */}
              {techSuggestions.length > 0 && (
                <ul className="absolute z-10 left-0 right-16 mt-1 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded shadow-lg overflow-hidden">
                  {techSuggestions.map((tech) => (
                    <li key={tech}>
                      <button
                        type="button"
                        onMouseDown={(e) => { e.preventDefault(); addTechnology(tech); }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-600 transition"
                      >
                        {tech}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {/* Todas las disponibles cuando el input está vacío y en foco */}
              <p className="text-xs text-gray-400 mt-1">
                Disponibles: {VALID_TECHNOLOGIES.filter(t => !formData.technologies.includes(t)).join(', ')}
              </p>
            </div>
            <FieldError msg={fieldErrors.technologies} />
            {formData.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, index) => (
                  <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm rounded border border-blue-200 dark:border-blue-700">
                    {tech}
                    <button type="button" onClick={() => removeTechnology(index)} className="hover:text-red-500 transition ml-1">&times;</button>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Objetivo del Proyecto */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <SectionToggle title="Objetivo del Proyecto" section="goal" icon={FaBullseye} />
        {expandedSections.goal && (
          <div className="pt-2">
            <RichTextEditor
              value={formData.projectGoal || ''}
              onChange={(content) => setFormData({ ...formData, projectGoal: content })}
              placeholder="Describe el objetivo principal del proyecto..."
              height="h-40"
            />
          </div>
        )}
      </div>

      {/* SEO y Meta Datos */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <SectionToggle title="SEO y Meta Datos" section="seo" icon={FaSearch} />
        {expandedSections.seo && (
          <div className="space-y-4 pt-2">
            <div className="relative">
              <FaHeading className={iconClass} />
              <input type="text" placeholder="Título SEO" value={formData.seoMetadata?.title || ''}
                onChange={(e) => setFormData({ ...formData, seoMetadata: { ...formData.seoMetadata, title: e.target.value } })}
                className={inputClass} maxLength={60} />
              <p className="text-xs text-gray-400 mt-1 text-right">{formData.seoMetadata?.title?.length || 0}/60</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Meta Descripción
                <span className="text-gray-400 font-normal ml-2">{formData.seoMetadata?.description?.length || 0}/160</span>
              </label>
              <RichTextEditor
                value={formData.seoMetadata?.description || ''}
                onChange={(content) => setFormData({ ...formData, seoMetadata: { ...formData.seoMetadata, description: content.substring(0, 160) } })}
                placeholder="Descripción para buscadores..."
                height="h-32"
              />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 pt-4 border-t dark:border-gray-700">Keywords</h3>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <FaTag className={iconClass} />
                <input type="text" placeholder="Ej: ecommerce, ropa online..." value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                  className={inputClass} />
              </div>
              <button type="button" onClick={addKeyword}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm font-medium">
                Agregar
              </button>
            </div>
            {(formData.seoMetadata?.keywords?.length || 0) > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.seoMetadata?.keywords?.map((keyword, index) => (
                  <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-sm rounded border border-green-200 dark:border-green-700">
                    {keyword}
                    <button type="button" onClick={() => removeKeyword(index)} className="hover:text-red-500 transition ml-1">&times;</button>
                  </span>
                ))}
              </div>
            )}

            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 pt-4 border-t dark:border-gray-700">Open Graph</h3>

            <div className="relative">
              <FaHeading className={iconClass} />
              <input type="text" placeholder="OG Title (Redes Sociales)" value={formData.seoMetadata?.ogTitle || ''}
                onChange={(e) => setFormData({ ...formData, seoMetadata: { ...formData.seoMetadata, ogTitle: e.target.value } })}
                className={inputClass} maxLength={60} />
            </div>

            <div className="relative">
              <FaAlignLeft className={iconClass} />
              <textarea placeholder="OG Description" value={formData.seoMetadata?.ogDescription || ''}
                onChange={(e) => setFormData({ ...formData, seoMetadata: { ...formData.seoMetadata, ogDescription: e.target.value } })}
                className="w-full pl-10 pr-3 py-2 border rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-20"
                maxLength={160} />
            </div>

            <div className="relative">
              <FaImage className={iconClass} />
              <input type="url" placeholder="OG Image URL (https://...)" value={formData.seoMetadata?.ogImage || ''}
                onChange={(e) => setFormData({ ...formData, seoMetadata: { ...formData.seoMetadata, ogImage: e.target.value } })}
                className={inputClass} />
            </div>

            <div className="border rounded dark:border-gray-600 overflow-hidden h-44 bg-gray-50 dark:bg-gray-700 relative">
              {formData.seoMetadata?.ogImage ? (
                <>
                  <img
                    src={formData.seoMetadata.ogImage}
                    alt="Open Graph"
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData,
                      seoMetadata: { ...formData.seoMetadata, ogImage: '' },
                    })}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded transition"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400 dark:text-gray-500">
                  <FaImage className="w-10 h-10" />
                  <span className="text-sm">Imagen Open Graph del proyecto</span>
                  <span className="text-xs">1200 × 630 px recomendado</span>
                </div>
              )}
            </div>

            <label className={`inline-flex items-center gap-2 px-4 py-2 text-sm rounded transition cursor-pointer ${
              uploadingOg ? 'opacity-60 cursor-not-allowed bg-blue-400 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}>
              <UploadIcon className="w-4 h-4" />
              {uploadingOg ? 'Subiendo...' : 'Subir imagen OG'}
              <input
                type="file"
                accept="image/*"
                onChange={handleOgUpload}
                disabled={uploadingOg}
                className="hidden"
              />
            </label>

            <div className="relative">
              <FaGlobe className={`${iconClass} text-green-500`} />
              <input type="url" placeholder="Canonical URL" value={formData.seoMetadata?.canonical || ''}
                onChange={(e) => setFormData({ ...formData, seoMetadata: { ...formData.seoMetadata, canonical: e.target.value } })}
                className={inputClass} />
            </div>

            <div className="relative">
              <FaUser className={iconClass} />
              <input type="text" placeholder="Autor" value={formData.seoMetadata?.author || ''}
                onChange={(e) => setFormData({ ...formData, seoMetadata: { ...formData.seoMetadata, author: e.target.value } })}
                className={inputClass} />
            </div>
          </div>
        )}
      </div>

      {/* URLs del Proyecto */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <SectionToggle title="URLs del Proyecto" section="urls" icon={FaGlobe} />
        {expandedSections.urls && (
          <div className="space-y-4 pt-2">
            <div>
              <RequiredLabel>URL en Vivo</RequiredLabel>
              <div className="relative">
                <FaGlobe className={`${iconClass} text-green-500`} />
                <input type="url" placeholder="https://mi-proyecto.com" value={formData.urlApp || ''}
                  onChange={(e) => { setFormData({ ...formData, urlApp: e.target.value }); setFieldErrors(p => ({ ...p, urlApp: '' })); }}
                  className={fieldErrors.urlApp ? inputErrorClass : inputClass} />
              </div>
              <FieldError msg={fieldErrors.urlApp} />
            </div>
            <div>
              <RequiredLabel>URL Repositorio</RequiredLabel>
              <div className="relative">
                <FaGithub className={`${iconClass} text-gray-800 dark:text-gray-300`} />
                <input type="url" placeholder="https://github.com/usuario/repo" value={formData.urlRepository || ''}
                  onChange={(e) => { setFormData({ ...formData, urlRepository: e.target.value }); setFieldErrors(p => ({ ...p, urlRepository: '' })); }}
                  className={fieldErrors.urlRepository ? inputErrorClass : inputClass} />
              </div>
              <FieldError msg={fieldErrors.urlRepository} />
            </div>
          </div>
        )}
      </div>

      {/* Imágenes */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <SectionToggle title="Imágenes" section="images" icon={FaImage} />
        {expandedSections.images && (
          <div className="pt-2">
            <RequiredLabel>Imágenes del proyecto</RequiredLabel>
            <ImageUploader
              images={formData.images}
              onChange={(images) => { setFormData({ ...formData, images }); setFieldErrors(p => ({ ...p, images: '' })); }}
            />
            <FieldError msg={fieldErrors.images} />
          </div>
        )}
      </div>

      {/* Políticas Legales */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <SectionToggle title="Políticas Legales" section="policies" icon={FaShieldAlt} />
        {expandedSections.policies && (
          <div className="space-y-6 pt-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Política de Privacidad</h3>
              <div className="space-y-4">
                <div className="relative">
                  <FaCalendarAlt className={iconClass} />
                  <input type="date" value={formData.privacyPolicy?.effectiveDate || ''}
                    onChange={(e) => setFormData({ ...formData, privacyPolicy: { ...formData.privacyPolicy, effectiveDate: e.target.value } })}
                    className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contenido</label>
                  <RichTextEditor
                    value={formData.privacyPolicy?.content || ''}
                    onChange={(content) => setFormData({ ...formData, privacyPolicy: { ...formData.privacyPolicy, content } })}
                    placeholder="Contenido completo de la política de privacidad..."
                    height="h-48"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Términos y Condiciones</h3>
              <div className="space-y-4">
                <div className="relative">
                  <FaCalendarAlt className={iconClass} />
                  <input type="date" value={formData.termsOfService?.effectiveDate || ''}
                    onChange={(e) => setFormData({ ...formData, termsOfService: { ...formData.termsOfService, effectiveDate: e.target.value } })}
                    className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contenido</label>
                  <RichTextEditor
                    value={formData.termsOfService?.content || ''}
                    onChange={(content) => setFormData({ ...formData, termsOfService: { ...formData.termsOfService, content } })}
                    placeholder="Contenido completo de términos y condiciones..."
                    height="h-48"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Configuración Avanzada */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <SectionToggle title="Configuración Avanzada" section="advanced" icon={FaCog} />
        {expandedSections.advanced && (
          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={formData.hasPrivacyPolicy || false}
                onChange={(e) => setFormData({ ...formData, hasPrivacyPolicy: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500" />
              <span className="text-gray-700 dark:text-gray-300 text-sm">Tiene Política de Privacidad</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={formData.hasTermsOfService || false}
                onChange={(e) => setFormData({ ...formData, hasTermsOfService: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500" />
              <span className="text-gray-700 dark:text-gray-300 text-sm">Tiene Términos y Condiciones</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={formData.active || false}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500" />
              <span className="text-gray-700 dark:text-gray-300 text-sm">Proyecto Activo</span>
            </label>
          </div>
        )}
      </div>

      {/* Botones */}
      <div className="flex gap-4">
        <button type="button" onClick={() => window.history.back()}
          className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition text-sm font-medium">
          Cancelar
        </button>
        <button type="submit" disabled={isLoading}
          className="flex-1 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded transition disabled:opacity-50 text-sm font-medium">
          {isLoading ? 'Guardando...' : 'Guardar Proyecto'}
        </button>
      </div>
    </form>
  );
}
