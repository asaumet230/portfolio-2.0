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
  name: string;
  description: string;
  url?: string;
}

export default function HerramientasPage() {
  const { data: session } = useSession();
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '', url: '' });

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
    setFormData({ name: tool.name, description: tool.description, url: tool.url || '' });
    setIsModalOpen(true);
  };

  const handleDelete = (tool: Tool) => {
    setSelectedTool(tool);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name) {
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
      setFormData({ name: '', description: '', url: '' });
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
    { key: 'name' as const, label: 'Nombre' },
    { key: 'description' as const, label: 'Descripción' },
    { key: 'url' as const, label: 'URL' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Herramientas</h1>
        <button
          onClick={() => {
            setSelectedTool(null);
            setFormData({ name: '', description: '', url: '' });
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          + Nueva Herramienta
        </button>
      </div>

      <DataTable columns={columns} data={tools} loading={loading} onEdit={handleEdit} onDelete={handleDelete} emptyMessage="No hay herramientas" />

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
          <input type="text" placeholder="Nombre" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <textarea placeholder="Descripción" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 h-24" />
          <input type="url" placeholder="URL (opcional)" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
        </div>
      </Modal>

      <DeleteConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} title="Eliminar Herramienta" message={`¿Estás seguro que deseas eliminar "${selectedTool?.name}"?`} />
    </div>
  );
}
