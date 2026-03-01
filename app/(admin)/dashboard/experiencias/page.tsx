'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { DataTable } from '@/components/admin/tables/DataTable';
import { Modal } from '@/components/admin/modals/Modal';
import { DeleteConfirmModal } from '@/components/admin/modals/DeleteConfirmModal';
import { apiClient } from '@/helpers/apiClient';
import toast from 'react-hot-toast';

interface Experience {
  _id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  isCurrently?: boolean;
}

export default function ExperienciasPage() {
  const { data: session } = useSession();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    description: '',
    startDate: '',
    endDate: '',
    isCurrently: false,
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/experiences');
      setExperiences(response.experiences || []);
    } catch (error) {
      toast.error('Error al cargar experiencias');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (experience: Experience) => {
    setSelectedExperience(experience);
    setFormData({
      company: experience.company,
      position: experience.position,
      description: experience.description,
      startDate: experience.startDate,
      endDate: experience.endDate || '',
      isCurrently: experience.isCurrently || false,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (experience: Experience) => {
    setSelectedExperience(experience);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.company || !formData.position) {
      toast.error('Empresa y puesto son requeridos');
      return;
    }
    try {
      const token = (session as any)?.accessToken;
      if (selectedExperience) {
        await apiClient.put(`/experiences/${selectedExperience._id}`, formData, token);
        toast.success('Experiencia actualizada');
      } else {
        await apiClient.post('/experiences', formData, token);
        toast.success('Experiencia creada');
      }
      setIsModalOpen(false);
      setFormData({ company: '', position: '', description: '', startDate: '', endDate: '', isCurrently: false });
      fetchExperiences();
    } catch (error: any) {
      toast.error(error.message || 'Error al guardar');
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedExperience) return;
    try {
      const token = (session as any)?.accessToken;
      await apiClient.delete(`/experiences/${selectedExperience._id}`, token);
      toast.success('Experiencia eliminada');
      setIsDeleteModalOpen(false);
      fetchExperiences();
    } catch (error: any) {
      toast.error(error.message || 'Error al eliminar');
    }
  };

  const columns = [
    { key: 'company' as const, label: 'Empresa' },
    { key: 'position' as const, label: 'Puesto' },
    {
      key: 'startDate' as const,
      label: 'Período',
      render: (start: string, row: Experience) => {
        const end = row.endDate || (row.isCurrently ? 'Actualmente' : '-');
        return `${start} - ${end}`;
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Experiencias Laborales</h1>
        <button
          onClick={() => {
            setSelectedExperience(null);
            setFormData({ company: '', position: '', description: '', startDate: '', endDate: '', isCurrently: false });
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          + Nueva Experiencia
        </button>
      </div>

      <DataTable columns={columns} data={experiences} loading={loading} onEdit={handleEdit} onDelete={handleDelete} emptyMessage="No hay experiencias" />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedExperience ? 'Editar Experiencia' : 'Nueva Experiencia'}
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
          <input type="text" placeholder="Empresa" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <input type="text" placeholder="Puesto/Cargo" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <textarea placeholder="Descripción" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 h-24" />
          <input type="date" placeholder="Fecha inicio" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={formData.isCurrently} onChange={(e) => setFormData({ ...formData, isCurrently: e.target.checked, endDate: e.target.checked ? '' : formData.endDate })} className="rounded" />
            <span className="text-gray-700 dark:text-gray-300">Trabajo actualmente aquí</span>
          </label>
          {!formData.isCurrently && (
            <input type="date" placeholder="Fecha fin" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          )}
        </div>
      </Modal>

      <DeleteConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} title="Eliminar Experiencia" message={`¿Estás seguro que deseas eliminar la experiencia en "${selectedExperience?.company}"?`} />
    </div>
  );
}
