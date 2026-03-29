'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { DataTable } from '@/components/admin/tables/DataTable';
import { Modal } from '@/components/admin/modals/Modal';
import { DeleteConfirmModal } from '@/components/admin/modals/DeleteConfirmModal';
import { apiClient } from '@/helpers/apiClient';
import toast from 'react-hot-toast';
import { FaBuilding, FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaLink } from 'react-icons/fa';

interface Experience {
  _id: string;
  company: string;
  city: string;
  position: string;
  year: number;
  url: string;
  createdAt: string;
}

const inputClass = 'w-full pl-10 pr-3 py-2 border rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500';
const iconClass  = 'absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4';

const thisYear = new Date().getFullYear();
const YEARS = Array.from({ length: thisYear - 1989 + 1 }, (_, i) => thisYear + 1 - i);

const EMPTY_FORM = {
  company:  '',
  city:     '',
  position: '',
  year:     thisYear,
  url:      '',
};

export default function ExperienciasPage() {
  const { data: session } = useSession();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => { fetchExperiences(); }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/experiences');
      setExperiences(response.experiences || []);
    } catch {
      toast.error('Error al cargar experiencias');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (experience: Experience) => {
    setSelectedExperience(experience);
    setFormData({
      company:  experience.company,
      city:     experience.city,
      position: experience.position,
      year:     experience.year,
      url:      experience.url,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (experience: Experience) => {
    setSelectedExperience(experience);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.company || !formData.position || !formData.city) {
      toast.error('Empresa, cargo y ciudad son requeridos');
      return;
    }
    try {
      const token = (session as any)?.accessToken;
      const payload = {
        company:  formData.company,
        city:     formData.city,
        position: formData.position,
        year:     formData.year,
        url:      formData.url,
      };
      if (selectedExperience) {
        await apiClient.put(`/experiences/${selectedExperience._id}`, payload, token);
        toast.success('Experiencia actualizada');
      } else {
        await apiClient.post('/experiences', payload, token);
        toast.success('Experiencia creada');
      }
      setIsModalOpen(false);
      setFormData(EMPTY_FORM);
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
    {
      key: 'position' as const,
      label: 'Cargo',
      render: (value: string) => (
        <span className="inline-block px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs rounded font-medium border border-blue-200 dark:border-blue-700 capitalize">
          {value}
        </span>
      ),
    },
    {
      key: 'city',
      label: 'Ciudad',
      render: (value: string) => <span className="capitalize">{value}</span>,
    },
    {
      key: 'year',
      label: 'Año',
      render: (value: number) => (
        <span className="inline-block px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded font-medium border border-gray-200 dark:border-gray-600">
          {value}
        </span>
      ),
    },
    {
      key: 'url',
      label: 'URL',
      render: (value: string) =>
        value && value !== '/' ? (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-xs truncate max-w-[140px] block">
            {value.replace(/^https?:\/\//, '')}
          </a>
        ) : (
          <span className="text-gray-400 text-xs">—</span>
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Experiencias Laborales</h1>
        <button
          onClick={() => { setSelectedExperience(null); setFormData(EMPTY_FORM); setIsModalOpen(true); }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm font-medium"
        >
          + Nueva Experiencia
        </button>
      </div>

      <DataTable columns={columns} data={experiences} loading={loading} onEdit={handleEdit} onDelete={handleDelete} emptyMessage="No hay experiencias" />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedExperience ? 'Editar Experiencia' : 'Nueva Experiencia'}
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
        <div className="space-y-3">

          <div className="relative">
            <FaBuilding className={iconClass} />
            <input
              type="text"
              placeholder="Empresa *"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="relative">
            <FaBriefcase className={iconClass} />
            <input
              type="text"
              placeholder="Cargo / Puesto *"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="relative">
            <FaMapMarkerAlt className={iconClass} />
            <input
              type="text"
              placeholder="Ciudad *"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="relative">
            <FaCalendarAlt className={iconClass} />
            <select
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
              className={inputClass}
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <FaLink className={iconClass} />
            <input
              type="url"
              placeholder="URL (https://...)"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className={inputClass}
            />
          </div>

        </div>
      </Modal>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Eliminar Experiencia"
        message={`¿Estás seguro que deseas eliminar la experiencia en "${selectedExperience?.company}"?`}
      />
    </div>
  );
}
