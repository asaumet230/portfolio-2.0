'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { apiClient } from '@/helpers/apiClient';
import { triggerRevalidation } from '@/helpers/revalidation';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, UploadIcon, TrashIcon, ImageIcon } from '@radix-ui/react-icons';
import { RichTextEditor } from '@/components/admin/forms/RichTextEditor';

interface SeoForm {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonical: string;
  robots: string;
}

interface ContentForm {
  name: string;
  slug: string;
  description: string;
}

const ROBOTS_OPTIONS = [
  'index, follow',
  'noindex, follow',
  'index, nofollow',
  'noindex, nofollow',
];

const toSlug = (str: string) =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

export default function NuevaCategoriaPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [ogImageName, setOgImageName] = useState('');
  const [slugEdited, setSlugEdited] = useState(false);

  const [contentForm, setContentForm] = useState<ContentForm>({
    name: '',
    slug: '',
    description: '',
  });

  const [form, setForm] = useState<SeoForm>({
    title: '',
    description: '',
    keywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    canonical: '',
    robots: 'index, follow',
  });

  const handleNameChange = (name: string) => {
    setContentForm((prev) => ({
      ...prev,
      name,
      slug: slugEdited ? prev.slug : toSlug(name),
    }));
  };

  const handleSlugChange = (slug: string) => {
    setSlugEdited(true);
    setContentForm((prev) => ({ ...prev, slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, '') }));
  };

  const handleSave = async () => {
    if (!contentForm.name.trim()) {
      toast.error('El nombre de la categoría es requerido');
      return;
    }
    if (!contentForm.slug.trim()) {
      toast.error('El slug es requerido');
      return;
    }

    try {
      setSaving(true);
      const token = (session as any)?.accessToken;

      const created = await apiClient.post('/article-categories', {
        name: contentForm.name.trim(),
        slug: contentForm.slug.trim(),
        description: contentForm.description || undefined,
      }, token);

      const categoryId = created?.category?._id;

      if (categoryId && (form.title || form.description || form.ogTitle || form.ogDescription || form.ogImage || form.canonical || form.keywords)) {
        const seoPayload = {
          ...form,
          keywords: form.keywords.split(',').map((k) => k.trim()).filter(Boolean),
        };
        await apiClient.put(`/article-categories/${categoryId}/seo`, seoPayload, token);
      }

      await triggerRevalidation({
        type: 'category',
        slug: contentForm.slug.trim(),
      }).catch((error) => console.error('Error revalidating category:', error));

      toast.success('Categoría creada correctamente');
      router.push('/dashboard/categorias');
    } catch (error: any) {
      toast.error(error.message || 'Error al crear la categoría');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append('file', file);
      if (ogImageName) formData.append('name', ogImageName);

      const res = await fetch('/api/upload-og', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error al subir imagen');
      setForm((prev) => ({ ...prev, ogImage: data.url }));
      if (!ogImageName) {
        const parts = (data.url as string).split('/');
        setOgImageName(parts[parts.length - 1].split('.')[0]);
      }
      toast.success('Imagen subida correctamente');
    } catch (err: any) {
      toast.error(err.message || 'Error al subir imagen');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const field = (label: string, key: keyof SeoForm, hint?: string) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
      <input
        type="text"
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
      />
    </div>
  );

  const textarea = (label: string, key: keyof SeoForm, maxLength: number, hint?: string) => (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <span className={`text-xs ${form[key].length > maxLength ? 'text-red-500' : 'text-gray-400'}`}>
          {form[key].length}/{maxLength}
        </span>
      </div>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
      <textarea
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
      />
    </div>
  );

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/categorias"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <ArrowLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {contentForm.name || 'Nueva categoría'}
          </h1>
          <p className="text-sm text-gray-400">
            Categoría{contentForm.slug ? ` · /${contentForm.slug}` : ''}
          </p>
        </div>
      </div>

      {/* Page Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-5">
        <div className="border-b border-gray-100 dark:border-gray-700 pb-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Información de la página</h2>
          <p className="text-xs text-gray-400 mt-0.5">Estos campos se muestran directamente en la página pública de la categoría</p>
        </div>

        {/* Name */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nombre <span className="text-red-400">*</span>
            <span className="text-[#7b7db0] text-xs font-normal ml-1">— H1 de la página</span>
          </label>
          <input
            type="text"
            value={contentForm.name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="ej: Desarrollo Web"
            autoFocus
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
        </div>

        {/* Slug */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Slug <span className="text-red-400">*</span>
            <span className="text-xs text-gray-400 font-normal ml-1">— se genera automáticamente</span>
          </label>
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
            <span className="px-3 py-2 text-sm text-gray-400 bg-gray-50 dark:bg-gray-700 border-r border-gray-300 dark:border-gray-600 shrink-0">
              /categoria/
            </span>
            <input
              type="text"
              value={contentForm.slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="desarrollo-web"
              className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Descripción <span className="text-[#7b7db0] text-xs font-normal ml-1">— párrafo debajo del H1</span>
          </label>
          <RichTextEditor
            value={contentForm.description}
            onChange={(html) => setContentForm({ ...contentForm, description: html })}
            placeholder="Descripción visible en la página pública de la categoría..."
            height="h-44"
          />
          <p className="text-xs text-gray-400">Este texto aparece como párrafo introductorio en la página de la categoría, no en Google (para eso usa la Descripción SEO)</p>
        </div>
      </div>

      {/* Basic SEO */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-5">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 pb-3">
          SEO Básico
        </h2>
        {textarea('Título', 'title', 70, 'Máximo 70 caracteres — se muestra en Google y pestañas del navegador')}
        {textarea('Descripción', 'description', 165, 'Máximo 165 caracteres — se muestra en los resultados de búsqueda')}
        {field('Keywords', 'keywords', 'Separadas por comas: javascript, react, next.js, ...')}
        {field('URL Canónica', 'canonical', `Evita contenido duplicado, ej: https://www.andressaumet.com/blog-de-tecnologia/categoria/${contentForm.slug || '...'}`)}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Robots</label>
          <select
            value={form.robots}
            onChange={(e) => setForm({ ...form, robots: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          >
            {ROBOTS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Open Graph */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-5">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 pb-3">
          Open Graph (Redes Sociales)
        </h2>
        {field('OG Título', 'ogTitle', 'Título al compartir en redes sociales')}
        {textarea('OG Descripción', 'ogDescription', 165, 'Descripción al compartir en redes sociales')}

        {/* OG Image */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">OG Imagen</label>
          <p className="text-xs text-gray-400">1200×630px recomendado — se recorta automáticamente al subir</p>

          <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 h-40 bg-gray-100 dark:bg-gray-700">
            {form.ogImage ? (
              <>
                <img
                  src={form.ogImage}
                  alt="OG preview"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, ogImage: '' }))}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                  title="Eliminar imagen"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400 dark:text-gray-500">
                <ImageIcon className="w-12 h-12" />
                <span className="text-sm font-medium">Imagen OG</span>
                <span className="text-xs">1200 × 630 px</span>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <label className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition cursor-pointer shrink-0 ${
              uploadingImage
                ? 'opacity-60 cursor-not-allowed bg-blue-400 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}>
              <UploadIcon className="w-4 h-4" />
              {uploadingImage ? 'Subiendo...' : 'Subir imagen'}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="hidden"
              />
            </label>
            <input
              type="text"
              placeholder="nombre-de-la-imagen (para SEO)"
              value={ogImageName}
              onChange={(e) =>
                setOgImageName(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))
              }
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
          {form.ogImage && (
            <p className="text-xs text-gray-400 truncate">
              URL:{' '}
              <a href={form.ogImage} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {form.ogImage}
              </a>
            </p>
          )}
        </div>

        {/* OG Preview */}
        {(form.ogTitle || form.ogDescription) && (
          <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden mt-2">
            {form.ogImage && (
              <div className="bg-gray-100 dark:bg-gray-700 h-40 overflow-hidden">
                <img
                  src={form.ogImage}
                  alt="OG preview"
                  className="object-cover w-full h-full"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            )}
            <div className="p-3 bg-gray-50 dark:bg-gray-750">
              <p className="text-xs text-gray-400 uppercase tracking-wide">andressaumet.com</p>
              <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 mt-0.5">
                {form.ogTitle || form.title}
              </p>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                {form.ogDescription || form.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Link
          href="/dashboard/categorias"
          className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition"
        >
          Cancelar
        </Link>
        <button
          onClick={handleSave}
          disabled={saving || !contentForm.name.trim() || !contentForm.slug.trim()}
          className="px-5 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? 'Creando...' : 'Crear categoría'}
        </button>
      </div>
    </div>
  );
}
