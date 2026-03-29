'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { apiClient } from '@/helpers/apiClient';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, UploadIcon, TrashIcon } from '@radix-ui/react-icons';
import { RichTextEditor } from '@/components/admin/forms/RichTextEditor';
import { FaHeading, FaUser, FaTag, FaAlignLeft, FaImage, FaList, FaLink, FaSearch, FaShareAlt } from 'react-icons/fa';

interface ArticleCategory { _id: string; name: string; slug: string; }

interface SeoForm {
  title: string; description: string; keywords: string;
  ogTitle: string; ogDescription: string; ogImage: string;
  canonical: string; robots: string;
}

const ROBOTS_OPTIONS = ['index, follow', 'noindex, follow', 'index, nofollow', 'noindex, nofollow'];

const inputClass = 'w-full pl-10 pr-3 py-2 border rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500';
const iconClass  = 'absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4';
const plainInput = 'w-full px-3 py-2 border rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500';
const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1';

export default function NuevoArticuloPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [saving, setSaving]                     = useState(false);
  const [uploadingFeatured, setUploadingFeatured] = useState(false);
  const [uploadingOg, setUploadingOg]           = useState(false);
  const [ogImageName, setOgImageName]           = useState('');
  const [categories, setCategories]             = useState<ArticleCategory[]>([]);

  const [form, setForm] = useState({
    title: '', slug: '', excerpt: '', content: '',
    category: '', tags: '', author: '', featuredImage: '', published: false,
  });

  const [seo, setSeo] = useState<SeoForm>({
    title: '', description: '', keywords: '',
    ogTitle: '', ogDescription: '', ogImage: '',
    canonical: '', robots: 'index, follow',
  });

  useEffect(() => {
    apiClient.get('/article-categories').then((r) => setCategories(r.categories || [])).catch(() => {});
  }, []);

  // Auto slug from title
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      slug: prev.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    }));
  }, [form.title]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error('El título es requerido');    return; }
    if (!form.slug.trim())  { toast.error('El slug es requerido');      return; }
    if (!form.content)      { toast.error('El contenido es requerido'); return; }
    try {
      setSaving(true);
      const token = (session as any)?.accessToken;
      const res = await apiClient.post('/articles', {
        title: form.title.trim(), slug: form.slug.trim(), excerpt: form.excerpt,
        content: form.content, category: form.category,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        author: form.author.trim(), featuredImage: form.featuredImage, published: form.published,
      }, token);
      const newId = res.article?._id;
      if (newId) {
        await apiClient.put(`/articles/${newId}/seo`, {
          ...seo,
          keywords: seo.keywords.split(',').map((k) => k.trim()).filter(Boolean),
        }, token).catch(() => {});
      }
      toast.success('Artículo creado');
      router.push('/dashboard/articulos');
    } catch (error: any) {
      toast.error(error.message || 'Error al crear el artículo');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({
      title: '', slug: '', excerpt: '', content: '',
      category: '', tags: '', author: '', featuredImage: '', published: false,
    });
    setSeo({
      title: '', description: '', keywords: '',
      ogTitle: '', ogDescription: '', ogImage: '',
      canonical: '', robots: 'index, follow',
    });
    setOgImageName('');
    toast('Cambios cancelados');
  };

  const handleFeaturedUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    try {
      setUploadingFeatured(true);
      const fd = new FormData(); fd.append('file', file);
      const res = await fetch('/api/upload-og', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setForm((p) => ({ ...p, featuredImage: data.url }));
      toast.success('Imagen destacada subida');
    } catch (err: any) { toast.error(err.message); }
    finally { setUploadingFeatured(false); e.target.value = ''; }
  };

  const handleOgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    try {
      setUploadingOg(true);
      const fd = new FormData(); fd.append('file', file);
      if (ogImageName) fd.append('name', ogImageName);
      const res = await fetch('/api/upload-og', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSeo((p) => ({ ...p, ogImage: data.url }));
      if (!ogImageName) {
        const parts = (data.url as string).split('/');
        setOgImageName(parts[parts.length - 1].split('.')[0]);
      }
      toast.success('Imagen OG subida');
    } catch (err: any) { toast.error(err.message); }
    finally { setUploadingOg(false); e.target.value = ''; }
  };

  return (
    <div className="space-y-8 max-w-4xl" style={{ animation: 'fadeIn 0.3s ease-in-out' }}>

      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/articulos" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          <ArrowLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {form.title || 'Nuevo artículo'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Crear nuevo artículo</p>
        </div>
        <button
          onClick={() => setForm((p) => ({ ...p, published: !p.published }))}
          className={`shrink-0 px-3 py-1.5 text-xs font-semibold rounded-full border transition ${
            form.published
              ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600'
          }`}
        >
          {form.published ? 'Publicado' : 'Borrador'}
        </button>
      </div>

      {/* Contenido */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Contenido</h2>

        <div className="relative">
          <FaHeading className={iconClass} />
          <input
            type="text" placeholder="Título del artículo *" autoFocus
            value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Slug <span className="text-[#7b7db0] text-xs font-normal ml-1">— URL del artículo</span>
          </label>
          <div className="flex items-center border rounded dark:border-gray-600 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
            <span className="px-3 py-2 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 text-sm border-r dark:border-gray-600 shrink-0 select-none">
              /articulo/
            </span>
            <input
              type="text" placeholder="ej: flutter-en-2024"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })}
              className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">Se genera automáticamente desde el título.</p>
        </div>

        <div className="relative">
          <FaAlignLeft className={iconClass} />
          <input
            type="text" placeholder="Resumen / Excerpt"
            value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <FaList className={iconClass} />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass}>
              <option value="">— Sin categoría —</option>
              {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
          <div className="relative">
            <FaUser className={iconClass} />
            <input
              type="text" placeholder="Autor"
              value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <div className="relative">
          <FaTag className={iconClass} />
          <input
            type="text" placeholder="Tags (separados por comas)"
            value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className={inputClass}
          />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 pt-4 border-t dark:border-gray-700">
          Imagen destacada
        </h3>

        <div className="border rounded dark:border-gray-600 overflow-hidden h-44 bg-gray-50 dark:bg-gray-700 relative">
          {form.featuredImage ? (
            <>
              <img src={form.featuredImage} alt="Featured" className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <button type="button" onClick={() => setForm((p) => ({ ...p, featuredImage: '' }))}
                className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded transition">
                <TrashIcon className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400 dark:text-gray-500">
              <FaImage className="w-10 h-10" />
              <span className="text-sm">Imagen destacada del artículo</span>
              <span className="text-xs">1200 × 630 px recomendado</span>
            </div>
          )}
        </div>
        <label className={`inline-flex items-center gap-2 px-4 py-2 text-sm rounded transition cursor-pointer ${
          uploadingFeatured ? 'opacity-60 cursor-not-allowed bg-blue-400 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}>
          <UploadIcon className="w-4 h-4" />
          {uploadingFeatured ? 'Subiendo...' : 'Subir imagen'}
          <input type="file" accept="image/*" onChange={handleFeaturedUpload} disabled={uploadingFeatured} className="hidden" />
        </label>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 pt-4 border-t dark:border-gray-700">
          Contenido *
        </h3>
        <RichTextEditor
          value={form.content}
          onChange={(html) => setForm({ ...form, content: html })}
          placeholder="Escribe el contenido del artículo..."
          height="h-96"
        />

      </div>

      {/* SEO Básico */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          <FaSearch className="inline w-4 h-4 mr-2 text-gray-400" />
          SEO Básico
        </h2>

        <div>
          <div className="flex justify-between mb-1">
            <label className={labelClass.replace('mb-1', '')}>Título SEO</label>
            <span className={`text-xs ${seo.title.length > 60 ? 'text-red-500' : 'text-gray-400'}`}>{seo.title.length}/60</span>
          </div>
          <p className="text-xs text-gray-400 mb-1">Máximo 60 caracteres — se muestra en Google y pestañas del navegador</p>
          <textarea rows={2} maxLength={60} value={seo.title} onChange={(e) => setSeo({ ...seo, title: e.target.value })}
            className={`${plainInput} resize-none`} />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className={labelClass.replace('mb-1', '')}>Descripción SEO</label>
            <span className={`text-xs ${seo.description.length > 165 ? 'text-red-500' : 'text-gray-400'}`}>{seo.description.length}/165</span>
          </div>
          <p className="text-xs text-gray-400 mb-1">Máximo 165 caracteres — se muestra en los resultados de búsqueda</p>
          <textarea rows={3} value={seo.description} onChange={(e) => setSeo({ ...seo, description: e.target.value })}
            className={`${plainInput} resize-none`} />
        </div>

        <div>
          <label className={labelClass}>Keywords</label>
          <p className="text-xs text-gray-400 mb-1">Separadas por comas: javascript, flutter, mobile, ...</p>
          <input type="text" value={seo.keywords} onChange={(e) => setSeo({ ...seo, keywords: e.target.value })} className={plainInput} />
        </div>

        <div className="relative">
          <FaLink className={iconClass} />
          <input type="text" placeholder="URL Canónica" value={seo.canonical} onChange={(e) => setSeo({ ...seo, canonical: e.target.value })} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Robots</label>
          <select value={seo.robots} onChange={(e) => setSeo({ ...seo, robots: e.target.value })} className={plainInput}>
            {ROBOTS_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      </div>

      {/* Open Graph */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          <FaShareAlt className="inline w-4 h-4 mr-2 text-gray-400" />
          Open Graph (Redes Sociales)
        </h2>

        <div>
          <label className={labelClass}>OG Título</label>
          <p className="text-xs text-gray-400 mb-1">Título al compartir en redes sociales</p>
          <input type="text" value={seo.ogTitle} onChange={(e) => setSeo({ ...seo, ogTitle: e.target.value })} className={plainInput} />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className={labelClass.replace('mb-1', '')}>OG Descripción</label>
            <span className={`text-xs ${seo.ogDescription.length > 165 ? 'text-red-500' : 'text-gray-400'}`}>{seo.ogDescription.length}/165</span>
          </div>
          <textarea rows={3} value={seo.ogDescription} onChange={(e) => setSeo({ ...seo, ogDescription: e.target.value })}
            className={`${plainInput} resize-none`} />
        </div>

        <div>
          <label className={labelClass}>OG Imagen</label>
          <p className="text-xs text-gray-400 mb-1">1200×630px recomendado</p>
          <div className="border rounded dark:border-gray-600 overflow-hidden h-40 bg-gray-50 dark:bg-gray-700 relative">
            {seo.ogImage ? (
              <>
                <img src={seo.ogImage} alt="OG" className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <button type="button" onClick={() => setSeo((p) => ({ ...p, ogImage: '' }))}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded transition">
                  <TrashIcon className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400 dark:text-gray-500">
                <FaImage className="w-8 h-8" />
                <span className="text-xs">1200 × 630 px</span>
              </div>
            )}
          </div>
          <div className="flex gap-2 mt-2">
            <label className={`flex items-center gap-2 px-4 py-2 text-sm rounded transition cursor-pointer shrink-0 ${
              uploadingOg ? 'opacity-60 cursor-not-allowed bg-blue-400 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}>
              <UploadIcon className="w-4 h-4" />
              {uploadingOg ? 'Subiendo...' : 'Subir imagen'}
              <input type="file" accept="image/*" onChange={handleOgUpload} disabled={uploadingOg} className="hidden" />
            </label>
            <input type="text" placeholder="nombre-para-seo" value={ogImageName}
              onChange={(e) => setOgImageName(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))}
              className={plainInput} />
          </div>
        </div>

        {(seo.ogTitle || seo.ogDescription) && (
          <div className="border rounded dark:border-gray-600 overflow-hidden">
            {seo.ogImage && (
              <div className="h-36 overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img src={seo.ogImage} alt="OG preview" className="object-cover w-full h-full"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
            )}
            <div className="p-3 bg-gray-50 dark:bg-gray-900">
              <p className="text-xs text-gray-400 uppercase tracking-wide">andressaumet.com</p>
              <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 mt-0.5">{seo.ogTitle || seo.title}</p>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{seo.ogDescription || seo.description}</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            disabled={saving}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !form.title.trim() || !form.slug.trim()}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Guardar artículo'}
          </button>
        </div>
      </div>

    </div>
  );
}
