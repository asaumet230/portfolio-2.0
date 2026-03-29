'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiClient } from '@/helpers/apiClient';
import toast from 'react-hot-toast';
import { Pencil2Icon, GlobeIcon } from '@radix-ui/react-icons';

interface PageSeo {
  _id: string;
  slug: string;
  pageTitle: string;
  url: string;
  title: string;
  description: string;
  robots: string;
  updatedAt?: string;
}

export default function PaginasPage() {
  const [pages, setPages] = useState<PageSeo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/seo/pages');
      setPages(response.pages || []);
    } catch {
      toast.error('Error al cargar las páginas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Páginas</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gestiona el SEO de cada página estática del sitio
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Cargando páginas...</div>
      ) : pages.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No hay páginas. Ejecuta el seed para cargar las páginas iniciales.
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              <tr>
                <th className="px-6 py-3 text-left font-medium">Página</th>
                <th className="px-6 py-3 text-left font-medium hidden md:table-cell">Título SEO</th>
                <th className="px-6 py-3 text-left font-medium hidden lg:table-cell">Robots</th>
                <th className="px-6 py-3 text-left font-medium hidden lg:table-cell">Actualizado</th>
                <th className="px-6 py-3 text-right font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {pages.map((page) => (
                <tr key={page._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <GlobeIcon className="w-4 h-4 text-gray-400 shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{page.pageTitle}</p>
                        <a
                          href={page.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 hover:underline"
                        >
                          {page.url}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <p className="text-gray-700 dark:text-gray-300 truncate max-w-xs">{page.title}</p>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span
                      className={`inline-block px-2 py-0.5 text-xs rounded font-medium border ${
                        page.robots === 'index, follow'
                          ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700'
                          : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700'
                      }`}
                    >
                      {page.robots}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell text-gray-500 dark:text-gray-400 text-xs">
                    {page.updatedAt
                      ? new Date(page.updatedAt).toLocaleDateString('es-CO', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })
                      : '—'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/dashboard/paginas/${page.slug}`}
                      className="p-2 hover:bg-yellow-100 dark:hover:bg-yellow-900 rounded transition inline-flex"
                      title="Editar"
                    >
                      <Pencil2Icon className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
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
