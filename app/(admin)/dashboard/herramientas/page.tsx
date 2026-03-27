'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { DataTable } from '@/components/admin/tables/DataTable';
import { Modal } from '@/components/admin/modals/Modal';
import { DeleteConfirmModal } from '@/components/admin/modals/DeleteConfirmModal';
import { apiClient } from '@/helpers/apiClient';
import toast from 'react-hot-toast';

interface Tool {
  _id: string;
  title: string;
  description: string;
  images: string[];
  progress: number;
}

export default function HerramientasPage() {
  const { data: session } = useSession();
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '', progress: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalPages = Math.ceil(tools.length / itemsPerPage);
  const paginatedTools = tools.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/tools');
      setTools(response.tools || []);
    } catch (error) {
      toast.error('Error al cargar herramientas');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tool: Tool) => {
    setSelectedTool(tool);
    setFormData({ title: tool.title, description: tool.description, progress: tool.progress });
    setIsModalOpen(true);
  };

  const handleDelete = (tool: Tool) => {
    setSelectedTool(tool);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title) {
      toast.error('El nombre es requerido');
      return;
    }
    try {
      const token = (session as any)?.accessToken;
      if (selectedTool) {
        await apiClient.put(`/tools/${selectedTool._id}`, formData, token);
        toast.success('Herramienta actualizada');
      } else {
        await apiClient.post('/tools', formData, token);
        toast.success('Herramienta creada');
      }
      setIsModalOpen(false);
      setFormData({ title: '', description: '', progress: 0 });
      fetchTools();
    } catch (error: any) {
      toast.error(error.message || 'Error al guardar');
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedTool) return;
    try {
      const token = (session as any)?.accessToken;
      await apiClient.delete(`/tools/${selectedTool._id}`, token);
      toast.success('Herramienta eliminada');
      setIsDeleteModalOpen(false);
      fetchTools();
    } catch (error: any) {
      toast.error(error.message || 'Error al eliminar');
    }
  };

  const columns = [
    {
      key: 'images' as const,
      label: 'Icono',
      render: (value: string[]) =>
        value?.[0] ? (
          <img
            src={value[0]}
            alt="tool icon"
            className="w-10 h-10 object-contain rounded bg-gray-100 dark:bg-gray-700 p-1"
          />
        ) : (
          <span className="text-gray-400">-</span>
        ),
    },
    { key: 'title' as const, label: 'Nombre' },
    {
      key: 'progress' as const,
      label: 'Progreso',
      render: (value: number) => {
        const style = value >= 80
          ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700'
          : value >= 50
          ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700'
          : 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700';
        return (
          <span className={`inline-block px-2 py-0.5 text-xs rounded font-medium border ${style}`}>
            {value}%
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Herramientas</h1>
        <button
          onClick={() => {
            setSelectedTool(null);
            setFormData({ title: '', description: '', progress: 0 });
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          + Nueva Herramienta
        </button>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          {tools.length} herramientas · página {currentPage} de {totalPages || 1}
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
        <DataTable columns={columns} data={paginatedTools} loading={loading} onEdit={handleEdit} onDelete={handleDelete} emptyMessage="No hay herramientas" />
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
        title={selectedTool ? 'Editar Herramienta' : 'Nueva Herramienta'}
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
          <input type="text" placeholder="Nombre" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <textarea placeholder="Descripción" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 h-24" />
          <input type="number" placeholder="Progreso (0-100)" min={0} max={100} value={formData.progress} onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
        </div>
      </Modal>

      <DeleteConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} title="Eliminar Herramienta" message={`¿Estás seguro que deseas eliminar "${selectedTool?.title}"?`} />
    </div>
  );
}
