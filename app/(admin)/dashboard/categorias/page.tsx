'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { apiClient } from '@/helpers/apiClient';
import toast from 'react-hot-toast';
import { Pencil1Icon, PlusIcon, Cross2Icon } from '@radix-ui/react-icons';

interface ArticleCategory {
  _id: string;
  slug: string;
  name: string;
  description?: string;
  seoMetadata?: {
    title?: string;
    robots?: string;
    ogImage?: string;
  };
  updatedAt?: string;
}

interface NewCategoryForm {
  name: string;
  slug: string;
  description: string;
}

const toSlug = (str: string) =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const CategoryThumb = ({ src, alt }: { src?: string; alt: string }) => {
  const [error, setError] = useState(false);
  if (!src || error) {
    return (
      <div className="w-20 h-11 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-20 h-11 rounded-lg overflow-hidden shrink-0 border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
      <Image
        src={src}
        alt={alt}
        width={80}
        height={44}
        className="w-full h-full object-cover object-center"
        onError={() => setError(true)}
      />
    </div>
  );
};

export default function CategoriasPage() {
  const { data: session } = useSession();
  const [categories, setCategories] = useState<ArticleCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [slugEdited, setSlugEdited] = useState(false);
  const [newForm, setNewForm] = useState<NewCategoryForm>({ name: '', slug: '', description: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/article-categories');
      setCategories(response.categories || []);
    } catch {
      toast.error('Error al cargar las categorías');
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (name: string) => {
    setNewForm((prev) => ({
      ...prev,
      name,
      slug: slugEdited ? prev.slug : toSlug(name),
    }));
  };

  const handleSlugChange = (slug: string) => {
    setSlugEdited(true);
    setNewForm((prev) => ({ ...prev, slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, '') }));
  };

  const handleOpenModal = () => {
    setNewForm({ name: '', slug: '', description: '' });
    setSlugEdited(false);
    setShowModal(true);
  };

  const handleCreate = async () => {
    if (!newForm.name.trim()) { toast.error('El nombre es requerido'); return; }
    if (!newForm.slug.trim()) { toast.error('El slug es requerido'); return; }

    try {
      setCreating(true);
      const token = (session as any)?.accessToken;
      await apiClient.post('/article-categories', {
        name: newForm.name.trim(),
        slug: newForm.slug.trim(),
        description: newForm.description.trim() || undefined,
      }, token);
      toast.success('Categoría creada correctamente');
      setShowModal(false);
      fetchCategories();
    } catch (error: any) {
      toast.error(error.message || 'Error al crear la categoría');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Categorías</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gestiona el SEO de cada categoría del blog
          </p>
        </div>
        <button
          onClick={handleOpenModal}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
        >
          <PlusIcon className="w-4 h-4" />
          Nueva categoría
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Cargando categorías...</div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No hay categorías. Crea la primera con el botón de arriba.
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              <tr>
                <th className="px-6 py-3 text-left font-medium">Categoría</th>
                <th className="px-6 py-3 text-left font-medium hidden md:table-cell">Título SEO</th>
                <th className="px-6 py-3 text-left font-medium hidden lg:table-cell">Robots</th>
                <th className="px-6 py-3 text-left font-medium hidden lg:table-cell">Actualizado</th>
                <th className="px-6 py-3 text-right font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {categories.map((cat) => (
                <tr key={cat._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <CategoryThumb src={cat.seoMetadata?.ogImage} alt={cat.name} />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                          {cat.name}
                        </p>
                        <p className="text-xs text-gray-400">/{cat.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    {cat.seoMetadata?.title ? (
                      <p className="text-gray-700 dark:text-gray-300 truncate max-w-xs">
                        {cat.seoMetadata.title}
                      </p>
                    ) : (
                      <span className="text-xs text-amber-500 dark:text-amber-400">Sin configurar</span>
                    )}
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    {cat.seoMetadata?.robots ? (
                      <span className={`inline-block px-2 py-0.5 text-xs rounded font-medium border ${
                        cat.seoMetadata.robots === 'index, follow'
                          ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700'
                          : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700'
                      }`}>
                        {cat.seoMetadata.robots}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell text-gray-500 dark:text-gray-400 text-xs">
                    {cat.updatedAt
                      ? new Date(cat.updatedAt).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })
                      : '—'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/dashboard/categorias/${cat.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded transition"
                    >
                      <Pencil1Icon className="w-3.5 h-3.5" />
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal nueva categoría */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Nueva categoría</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <Cross2Icon className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 space-y-4">
              {/* Name */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nombre <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={newForm.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="ej: Desarrollo Web"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  autoFocus
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
                    value={newForm.slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    placeholder="desarrollo-web"
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Descripción <span className="text-xs text-gray-400 font-normal ml-1">— opcional</span>
                </label>
                <textarea
                  value={newForm.description}
                  onChange={(e) => setNewForm({ ...newForm, description: e.target.value })}
                  rows={3}
                  placeholder="Breve descripción de esta categoría..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                />
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreate}
                disabled={creating || !newForm.name.trim() || !newForm.slug.trim()}
                className="px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {creating ? 'Creando...' : 'Crear categoría'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
