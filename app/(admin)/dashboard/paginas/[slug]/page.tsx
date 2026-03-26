'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { apiClient } from '@/helpers/apiClient';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, UploadIcon, TrashIcon, ImageIcon } from '@radix-ui/react-icons';

interface PageSeoForm {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonical: string;
  robots: string;
}

interface PageSeo extends PageSeoForm {
  _id: string;
  slug: string;
  pageTitle: string;
  url: string;
}

const ROBOTS_OPTIONS = [
  'index, follow',
  'noindex, follow',
  'index, nofollow',
  'noindex, nofollow',
];

export default function EditPageSeoPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { data: session } = useSession();
  const [page, setPage] = useState<PageSeo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [ogImageName, setOgImageName] = useState('');
  const [form, setForm] = useState<PageSeoForm>({
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
    fetchPage();
  }, [slug]);

  const fetchPage = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/seo/pages/${slug}`);
      const p: PageSeo = response.page;
      setPage(p);
      setForm({
        title: p.title || '',
        description: p.description || '',
        keywords: Array.isArray((p as any).keywords) ? (p as any).keywords.join(', ') : '',
        ogTitle: p.ogTitle || '',
        ogDescription: p.ogDescription || '',
        ogImage: p.ogImage || '',
        canonical: p.canonical || '',
        robots: p.robots || 'index, follow',
      });
      // Extract image name from existing Cloudinary URL if present
      if (p.ogImage) {
        const parts = p.ogImage.split('/');
        const filename = parts[parts.length - 1].split('.')[0];
        setOgImageName(filename);
      }
    } catch {
      toast.error('Error al cargar la página');
      router.push('/dashboard/paginas');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
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
      const payload = {
        ...form,
        keywords: form.keywords
          .split(',')
          .map((k) => k.trim())
          .filter(Boolean),
      };
      await apiClient.put(`/seo/pages/${slug}`, payload, token);
      toast.success('SEO actualizado correctamente');
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
      // Extract name from returned URL if not set
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

  const field = (label: string, key: keyof PageSeoForm, hint?: string) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
      <input
        type="text"
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
      />
    </div>
  );

  const textarea = (label: string, key: keyof PageSeoForm, maxLength: number, hint?: string) => (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <span
          className={`text-xs ${
            form[key].length > maxLength ? 'text-red-500' : 'text-gray-400'
          }`}
        >
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
          href="/dashboard/paginas"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <ArrowLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {page?.pageTitle}
          </h1>
          <a
            href={page?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 hover:underline"
          >
            {page?.url}
          </a>
        </div>
      </div>

      {/* Basic SEO */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-5">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 pb-3">
          SEO Básico
        </h2>
        {textarea('Título', 'title', 70, 'Máximo 70 caracteres — se muestra en Google y pestañas del navegador')}
        {textarea('Descripción', 'description', 165, 'Máximo 165 caracteres — se muestra en los resultados de búsqueda')}
        {field('Keywords', 'keywords', 'Separadas por comas: next.js developer, desarrollador web colombia, ...')}
        {field('URL Canónica', 'canonical', 'Evita contenido duplicado, ej: https://www.andressaumet.com/proyectos')}
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

        {/* OG Image field con upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">OG Imagen</label>
          <p className="text-xs text-gray-400">1200×630px recomendado — se recorta automáticamente al subir</p>

          {/* Preview / placeholder */}
          <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 h-40 bg-gray-100 dark:bg-gray-700">
            {form.ogImage ? (
              <>
                <img
                  src={form.ogImage}
                  alt="OG preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = 'none';
                    const parent = img.parentElement;
                    if (parent && !parent.querySelector('.img-error-placeholder')) {
                      const div = document.createElement('div');
                      div.className = 'img-error-placeholder flex flex-col items-center justify-center h-full gap-2 text-gray-400 absolute inset-0';
                      div.innerHTML = `<svg width="48" height="48" viewBox="0 0 15 15" fill="currentColor"><path d="M2.5 1C1.67 1 1 1.67 1 2.5v10c0 .83.67 1.5 1.5 1.5h10c.83 0 1.5-.67 1.5-1.5v-10C14 1.67 13.33 1 12.5 1h-10zm0 1h10c.28 0 .5.22.5.5v7.09l-2.15-2.14a.5.5 0 00-.7 0L7 11.09l-1.65-1.64a.5.5 0 00-.7 0L2 12V2.5c0-.28.22-.5.5-.5zm7 2a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"/></svg><span style="font-size:12px">Imagen no disponible</span>`;
                      parent.appendChild(div);
                    }
                  }}
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

          {/* Nombre de imagen + upload */}
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
              onChange={(e) => setOgImageName(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
          {form.ogImage && (
            <p className="text-xs text-gray-400 truncate">
              URL: <a href={form.ogImage} target="_blank" rel="noopener noreferrer" className="hover:underline">{form.ogImage}</a>
            </p>
          )}
        </div>

        {/* OG Preview */}
        {(form.ogTitle || form.ogDescription) && (
          <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden mt-2">
            {form.ogImage && (
              <div className="bg-gray-100 dark:bg-gray-700 h-40 flex items-center justify-center text-xs text-gray-400 overflow-hidden">
                <img src={form.ogImage} alt="OG preview" className="object-cover w-full h-full" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
            )}
            <div className="p-3 bg-gray-50 dark:bg-gray-750">
              <p className="text-xs text-gray-400 uppercase tracking-wide">{page?.url?.replace('https://', '')}</p>
              <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 mt-0.5">{form.ogTitle || form.title}</p>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{form.ogDescription || form.description}</p>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Link
          href="/dashboard/paginas"
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
