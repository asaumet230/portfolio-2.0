'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ArrowLeftIcon, FileTextIcon } from '@radix-ui/react-icons';
import toast from 'react-hot-toast';
import { apiClient } from '@/helpers/apiClient';
import { triggerRevalidation } from '@/helpers/revalidation';

interface RobotsPage {
  _id?: string;
  slug: string;
  pageTitle: string;
  url: string;
  robotsTxtContent?: string;
  updatedAt?: string;
}

export default function RobotsTxtPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [page, setPage] = useState<RobotsPage | null>(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchRobots = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/seo/pages/robots-txt');
        const robotsPage = response.page as RobotsPage;
        setPage(robotsPage);
        setContent(robotsPage.robotsTxtContent || '');
      } catch {
        toast.error('Error al cargar robots.txt');
      } finally {
        setLoading(false);
      }
    };

    fetchRobots();
  }, []);

  const handleSave = async () => {
    if (!content.trim()) {
      toast.error('El contenido de robots.txt es requerido');
      return;
    }

    try {
      setSaving(true);
      const token = (session as any)?.accessToken;
      await apiClient.put('/seo/pages/robots-txt', { robotsTxtContent: content }, token);
      await triggerRevalidation({ type: 'robots' }).catch((error) =>
        console.error('Error revalidating robots.txt:', error)
      );
      toast.success('Robots.txt actualizado correctamente');
    } catch (error: any) {
      toast.error(error.message || 'Error al guardar robots.txt');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Cargando robots.txt...</div>;
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/sitemap"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <ArrowLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Robots.txt</h1>
          <a
            href="/robots.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 hover:underline"
          >
            {page?.url || 'https://www.andressaumet.com/robots.txt'}
          </a>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-5">
        <div className="flex items-start gap-3 border-b border-gray-100 dark:border-gray-700 pb-4">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300">
            <FileTextIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Editor de robots.txt</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Edita el archivo exacto que se servirá públicamente en <code>/robots.txt</code>.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Contenido</label>
            <span className="text-xs text-gray-400">{content.length}/5000</span>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={16}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm font-mono leading-6 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-y"
            spellCheck={false}
          />
          {page?.updatedAt && (
            <p className="text-xs text-gray-400">
              Última actualización: {new Date(page.updatedAt).toLocaleDateString('es-CO', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Link
          href="/dashboard/sitemap"
          className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition"
        >
          Cancelar
        </Link>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? 'Guardando...' : 'Guardar robots.txt'}
        </button>
      </div>
    </div>
  );
}
