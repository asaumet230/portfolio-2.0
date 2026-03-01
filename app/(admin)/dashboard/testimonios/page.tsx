'use client';

import { useState, useEffect } from 'react';
import { DataTable } from '@/components/admin/tables/DataTable';
import { Modal } from '@/components/admin/modals/Modal';
import { DeleteConfirmModal } from '@/components/admin/modals/DeleteConfirmModal';
import { apiClient } from '@/helpers/apiClient';
import toast from 'react-hot-toast';

interface Testimonial {
  _id: string;
  clientName: string;
  company: string;
  content: string;
  rating?: number;
}

export default function TestimoniosPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({ clientName: '', company: '', content: '', rating: 5 });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/testimonials');
      setTestimonials(response.testimonials || []);
    } catch (error) {
      toast.error('Error al cargar testimonios');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setFormData({
      clientName: testimonial.clientName,
      company: testimonial.company,
      content: testimonial.content,
      rating: testimonial.rating || 5,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.clientName || !formData.content) {
      toast.error('Nombre y contenido son requeridos');
      return;
    }
    try {
      if (selectedTestimonial) {
        await apiClient.put(`/testimonials/${selectedTestimonial._id}`, formData);
        toast.success('Testimonial actualizado');
      } else {
        await apiClient.post('/testimonials', formData);
        toast.success('Testimonial creado');
      }
      setIsModalOpen(false);
      setFormData({ clientName: '', company: '', content: '', rating: 5 });
      fetchTestimonials();
    } catch (error: any) {
      toast.error(error.message || 'Error al guardar');
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedTestimonial) return;
    try {
      await apiClient.delete(`/testimonials/${selectedTestimonial._id}`);
      toast.success('Testimonial eliminado');
      setIsDeleteModalOpen(false);
      fetchTestimonials();
    } catch (error: any) {
      toast.error(error.message || 'Error al eliminar');
    }
  };

  const columns = [
    { key: 'clientName' as const, label: 'Cliente' },
    { key: 'company' as const, label: 'Empresa' },
    {
      key: 'content' as const,
      label: 'Contenido',
      render: (content: string) => content.substring(0, 50) + '...',
    },
    {
      key: 'rating' as const,
      label: 'Rating',
      render: (rating: number) => `⭐ ${rating || '-'}`,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Testimonios</h1>
        <button
          onClick={() => {
            setSelectedTestimonial(null);
            setFormData({ clientName: '', company: '', content: '', rating: 5 });
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          + Nuevo Testimonio
        </button>
      </div>

      <DataTable columns={columns} data={testimonials} loading={loading} onEdit={handleEdit} onDelete={handleDelete} emptyMessage="No hay testimonios" />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedTestimonial ? 'Editar Testimonio' : 'Nuevo Testimonio'}
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
          <input type="text" placeholder="Nombre del cliente" value={formData.clientName} onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <input type="text" placeholder="Empresa" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <textarea placeholder="Contenido del testimonio" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 h-24" />
          <select value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600">
            <option value="5">⭐⭐⭐⭐⭐ 5 estrellas</option>
            <option value="4">⭐⭐⭐⭐ 4 estrellas</option>
            <option value="3">⭐⭐⭐ 3 estrellas</option>
            <option value="2">⭐⭐ 2 estrellas</option>
            <option value="1">⭐ 1 estrella</option>
          </select>
        </div>
      </Modal>

      <DeleteConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} title="Eliminar Testimonio" message={`¿Estás seguro que deseas eliminar el testimonio de "${selectedTestimonial?.clientName}"?`} />
    </div>
  );
}
