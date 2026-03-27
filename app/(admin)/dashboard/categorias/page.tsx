'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { apiClient } from '@/helpers/apiClient';
import toast from 'react-hot-toast';
import { Pencil1Icon } from '@radix-ui/react-icons';

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
  const [categories, setCategories] = useState<ArticleCategory[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Categorías</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gestiona el SEO de cada categoría del blog
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Cargando categorías...</div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No hay categorías. Crea una desde la sección de Artículos.
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
                      <span
                        className={`inline-block px-2 py-0.5 text-xs rounded font-medium border ${
                          cat.seoMetadata.robots === 'index, follow'
                            ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700'
                            : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700'
                        }`}
                      >
                        {cat.seoMetadata.robots}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell text-gray-500 dark:text-gray-400 text-xs">
                    {cat.updatedAt
                      ? new Date(cat.updatedAt).toLocaleDateString('es-CO', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })
                      : '—'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/dashboard/categorias/${cat.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded transition"
                    >
                      <Pencil1Icon className="w-3.5 h-3.5" />
                      Editar SEO
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
