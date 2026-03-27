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
  excerpt: string;
  category: string;
  featuredImage: string;
  tags: string[];
  published: boolean;
  author?: string;
  createdAt: string;
}

interface ArticleCategory {
  _id: string;
  name: string;
  slug: string;
}

export default function ArticulosPage() {
  const { data: session } = useSession();
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<ArticleCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState({ title: '', slug: '', content: '', category: '', published: false, author: '' });
  const [expandedTags, setExpandedTags] = useState<Set<string>>(new Set());
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleTogglePublished = async (article: Article) => {
    if (togglingId === article._id) return;
    const token = (session as any)?.accessToken;
    const newValue = !article.published;
    setTogglingId(article._id);
    setArticles((prev) => prev.map((a) => a._id === article._id ? { ...a, published: newValue } : a));
    try {
      await apiClient.put(`/articles/${article._id}`, { published: newValue }, token);
    } catch (error: any) {
      setArticles((prev) => prev.map((a) => a._id === article._id ? { ...a, published: article.published } : a));
      toast.error(error.message || 'Error al actualizar estado');
    } finally {
      setTogglingId(null);
    }
  };

  useEffect(() => {
    if (session) fetchData();
  }, [session]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    const token = (session as any)?.accessToken;
    try {
      setLoading(true);
      const [articlesRes, categoriesRes] = await Promise.all([
        apiClient.get('/articles/admin/all', token),
        apiClient.get('/article-categories'),
      ]);
      setArticles(articlesRes.articles || []);
      setCategories(categoriesRes.articleCategories || categoriesRes.categories || []);
    } catch (error) {
      toast.error('Error al cargar artículos');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (categoryId: string) => {
    const found = categories.find((c) => c._id === categoryId);
    return found ? found.name : categoryId;
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
      fetchData();
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
      fetchData();
    } catch (error: any) {
      toast.error(error.message || 'Error al eliminar');
    }
  };

  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const paginatedArticles = articles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const ArticleImage = ({ src, title }: { src?: string; title: string }) => {
    const [error, setError] = useState(false);
    const initial = title?.[0]?.toUpperCase() || '?';
    if (src && !error) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={title}
          onError={() => setError(true)}
          className="w-14 h-14 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
        />
      );
    }
    return (
      <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {initial}
      </div>
    );
  };

  const columns = [
    {
      key: 'featuredImage',
      label: 'Imagen',
      render: (value: string, row: Article) => <ArticleImage src={value} title={row.title} />,
    },
    { key: 'title' as const, label: 'Título' },
    {
      key: 'category',
      label: 'Categoría',
      render: (value: string) => (
        <span className="inline-block px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs rounded font-medium border border-blue-200 dark:border-blue-700 whitespace-nowrap">
          {getCategoryName(value)}
        </span>
      ),
    },
    {
      key: 'tags',
      label: 'Tags',
      render: (value: string[], row: Article) => {
        const isExpanded = expandedTags.has(row._id);
        const tags = value || [];
        const visible = isExpanded ? tags : tags.slice(0, 3);
        const remaining = tags.length - 3;
        return (
          <div className="flex flex-wrap gap-1 max-w-[200px]">
            {visible.map((tag) => (
              <span key={tag} className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded border border-gray-200 dark:border-gray-600">
                {tag}
              </span>
            ))}
            {!isExpanded && remaining > 0 && (
              <button
                onClick={() => setExpandedTags((prev) => new Set(prev).add(row._id))}
                className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 text-xs rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition cursor-pointer"
              >
                +{remaining}
              </button>
            )}
            {isExpanded && (
              <button
                onClick={() => setExpandedTags((prev) => { const s = new Set(prev); s.delete(row._id); return s; })}
                className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 text-xs rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition cursor-pointer"
              >
                ver menos
              </button>
            )}
          </div>
        );
      },
    },
    {
      key: 'published' as const,
      label: 'Publicado',
      render: (published: boolean, row: Article) => (
        <button
          onClick={() => handleTogglePublished(row)}
          disabled={togglingId === row._id}
          className="flex items-center gap-2 group"
          title={published ? 'Despublicar' : 'Publicar'}
        >
          <div className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${published ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'} ${togglingId === row._id ? 'opacity-50' : ''}`}>
            <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${published ? 'translate-x-5' : 'translate-x-0'}`} />
          </div>
          <span className={`text-xs font-medium ${published ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`}>
            {published ? 'Sí' : 'No'}
          </span>
        </button>
      ),
    },
    {
      key: 'createdAt',
      label: 'Creado',
      render: (value: string) => (
        <span className="text-gray-500 dark:text-gray-400 text-xs whitespace-nowrap">
          {new Date(value).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
      ),
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

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          {articles.length} artículos · página {currentPage} de {totalPages || 1}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Mostrar</span>
          {[5, 10, 20].map((n) => (
            <button
              key={n}
              onClick={() => handleItemsPerPageChange(n)}
              className={`w-10 py-1 text-sm rounded border transition text-center ${
                itemsPerPage === n
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div key={`${currentPage}-${itemsPerPage}`} style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
        <DataTable columns={columns} data={paginatedArticles} loading={loading} onEdit={handleEdit} onDelete={handleDelete} emptyMessage="No hay artículos" />
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            ← Anterior
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 text-sm rounded border transition ${
                currentPage === page
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Siguiente →
          </button>
        </div>
      )}

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
