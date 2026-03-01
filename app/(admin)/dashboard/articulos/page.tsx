'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { DataTable } from '@/components/admin/tables/DataTable';
import { Modal } from '@/components/admin/modals/Modal';
import { DeleteConfirmModal } from '@/components/admin/modals/DeleteConfirmModal';
import { apiClient } from '@/helpers/apiClient';
import toast from 'react-hot-toast';

interface Article {
  _id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  published: boolean;
  author?: string;
}

export default function ArticulosPage() {
  const { data: session } = useSession();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState({ title: '', slug: '', content: '', category: '', published: false, author: '' });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/articles');
      setArticles(response.articles || []);
    } catch (error) {
      toast.error('Error al cargar artículos');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (article: Article) => {
    setSelectedArticle(article);
    setFormData({
      title: article.title,
      slug: article.slug,
      content: article.content,
      category: article.category,
      published: article.published,
      author: article.author || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = (article: Article) => {
    setSelectedArticle(article);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      toast.error('Título y contenido son requeridos');
      return;
    }
    try {
      const token = (session as any)?.accessToken;
      if (selectedArticle) {
        await apiClient.put(`/articles/${selectedArticle._id}`, formData, token);
        toast.success('Artículo actualizado');
      } else {
        await apiClient.post('/articles', formData, token);
        toast.success('Artículo creado');
      }
      setIsModalOpen(false);
      setFormData({ title: '', slug: '', content: '', category: '', published: false, author: '' });
      fetchArticles();
    } catch (error: any) {
      toast.error(error.message || 'Error al guardar');
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedArticle) return;
    try {
      const token = (session as any)?.accessToken;
      await apiClient.delete(`/articles/${selectedArticle._id}`, token);
      toast.success('Artículo eliminado');
      setIsDeleteModalOpen(false);
      fetchArticles();
    } catch (error: any) {
      toast.error(error.message || 'Error al eliminar');
    }
  };

  const columns = [
    { key: 'title' as const, label: 'Título' },
    { key: 'category' as const, label: 'Categoría' },
    { key: 'author' as const, label: 'Autor' },
    {
      key: 'published' as const,
      label: 'Estado',
      render: (published: boolean) => (published ? '✅ Publicado' : '📝 Borrador'),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Artículos</h1>
        <button
          onClick={() => {
            setSelectedArticle(null);
            setFormData({ title: '', slug: '', content: '', category: '', published: false, author: '' });
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          + Nuevo Artículo
        </button>
      </div>

      <DataTable columns={columns} data={articles} loading={loading} onEdit={handleEdit} onDelete={handleDelete} emptyMessage="No hay artículos" />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedArticle ? 'Editar Artículo' : 'Nuevo Artículo'}
        size="xl"
        footer={
          <>
            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition">
              Cancelar
            </button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded transition">
              Guardar
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <input type="text" placeholder="Título" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <input type="text" placeholder="Slug" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <input type="text" placeholder="Categoría" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <input type="text" placeholder="Autor" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <textarea placeholder="Contenido del artículo" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 h-32" />
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={formData.published} onChange={(e) => setFormData({ ...formData, published: e.target.checked })} className="rounded" />
            <span className="text-gray-700 dark:text-gray-300">Publicado</span>
          </label>
        </div>
      </Modal>

      <DeleteConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} title="Eliminar Artículo" message={`¿Estás seguro que deseas eliminar "${selectedArticle?.title}"?`} />
    </div>
  );
}
