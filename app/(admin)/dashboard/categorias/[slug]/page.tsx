'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { apiClient } from '@/helpers/apiClient';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, UploadIcon, TrashIcon, ImageIcon } from '@radix-ui/react-icons';

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
  description: string;
}

interface ArticleCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  seoMetadata?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    canonical?: string;
    robots?: string;
  };
}

const ROBOTS_OPTIONS = [
  'index, follow',
  'noindex, follow',
  'index, nofollow',
  'noindex, nofollow',
];

export default function EditCategoriaSeoPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { data: session } = useSession();
  const [category, setCategory] = useState<ArticleCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [ogImageName, setOgImageName] = useState('');
  const [contentForm, setContentForm] = useState<ContentForm>({ name: '', description: '' });
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

  useEffect(() => {
    fetchCategory();
  }, [slug]);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/article-categories');
      const cats: ArticleCategory[] = response.categories || [];
      const found = cats.find((c) => c.slug === slug);

      if (!found) {
        toast.error('Categoría no encontrada');
        router.push('/dashboard/categorias');
        return;
      }

      setCategory(found);
      setContentForm({ name: found.name || '', description: found.description || '' });
      const seo = found.seoMetadata || {};
      setForm({
        title: seo.title || '',
        description: seo.description || '',
        keywords: Array.isArray(seo.keywords) ? seo.keywords.join(', ') : '',
        ogTitle: seo.ogTitle || '',
        ogDescription: seo.ogDescription || '',
        ogImage: seo.ogImage || '',
        canonical: seo.canonical || '',
        robots: seo.robots || 'index, follow',
      });
      if (seo.ogImage) {
        const parts = seo.ogImage.split('/');
        setOgImageName(parts[parts.length - 1].split('.')[0]);
      }
    } catch {
      toast.error('Error al cargar la categoría');
      router.push('/dashboard/categorias');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!contentForm.name.trim()) {
      toast.error('El nombre de la categoría es requerido');
      return;
    }
    if (!form.title) {
      toast.error('El título SEO es requerido');
      return;
    }
    if (!form.description) {
      toast.error('La descripción SEO es requerida');
      return;
    }

    try {
      setSaving(true);
      const token = (session as any)?.accessToken;
      const seoPayload = {
        ...form,
        keywords: form.keywords.split(',').map((k) => k.trim()).filter(Boolean),
      };

      await Promise.all([
        apiClient.put(`/article-categories/${category!._id}`, {
          name: contentForm.name.trim(),
          description: contentForm.description.trim(),
        }, token),
        apiClient.put(`/article-categories/${category!._id}/seo`, seoPayload, token),
      ]);

      toast.success('Categoría actualizada correctamente');
    } catch (error: any) {
      toast.error(error.message || 'Error al guardar');
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

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Cargando...</div>;
  }

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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 capitalize">
            {category?.name}
          </h1>
          <p className="text-sm text-gray-400">Categoría · /{category?.slug}</p>
        </div>
      </div>

      {/* Page Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-5">
        <div className="border-b border-gray-100 dark:border-gray-700 pb-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Información de la página</h2>
          <p className="text-xs text-gray-400 mt-0.5">Estos campos se muestran directamente en la página pública de la categoría</p>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nombre <span className="text-[#7b7db0] text-xs font-normal ml-1">— H1 de la página</span>
          </label>
          <input
            type="text"
            value={contentForm.name}
            onChange={(e) => setContentForm({ ...contentForm, name: e.target.value })}
            placeholder="ej: Desarrollo Web"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Descripción <span className="text-[#7b7db0] text-xs font-normal ml-1">— párrafo debajo del H1</span>
            </label>
            <span className={`text-xs ${contentForm.description.length > 300 ? 'text-red-500' : 'text-gray-400'}`}>
              {contentForm.description.length}/300
            </span>
          </div>
          <textarea
            value={contentForm.description}
            onChange={(e) => setContentForm({ ...contentForm, description: e.target.value })}
            rows={3}
            placeholder="Descripción visible en la página pública de la categoría..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
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
        {field('URL Canónica', 'canonical', 'Evita contenido duplicado, ej: https://www.andressaumet.com/blog-de-tecnologia/categoria/' + (category?.slug || ''))}
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
          disabled={saving}
          className="px-5 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </div>
  );
}
