'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { DataTable } from '@/components/admin/tables/DataTable';
import { Modal } from '@/components/admin/modals/Modal';
import { DeleteConfirmModal } from '@/components/admin/modals/DeleteConfirmModal';
import { apiClient } from '@/helpers/apiClient';
import toast from 'react-hot-toast';
import { FaInstagram, FaFacebook, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa';

interface Testimonial {
  _id: string;
  name: string;
  major: string;
  image: string;
  content: string;
  url?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
}

export default function TestimoniosPage() {
  const { data: session } = useSession();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({ name: '', major: '', content: '', url: '', instagram: '', facebook: '', linkedin: '', twitter: '' });

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
      name: testimonial.name,
      major: testimonial.major,
      content: testimonial.content,
      url: testimonial.url || '',
      instagram: testimonial.instagram || '',
      facebook: testimonial.facebook || '',
      linkedin: testimonial.linkedin || '',
      twitter: testimonial.twitter || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.content) {
      toast.error('Nombre y contenido son requeridos');
      return;
    }
    try {
      const token = (session as any)?.accessToken;
      if (selectedTestimonial) {
        await apiClient.put(`/testimonials/${selectedTestimonial._id}`, formData, token);
        toast.success('Testimonial actualizado');
      } else {
        await apiClient.post('/testimonials', formData, token);
        toast.success('Testimonial creado');
      }
      setIsModalOpen(false);
      setFormData({ name: '', major: '', content: '', url: '', instagram: '', facebook: '', linkedin: '', twitter: '' });
      fetchTestimonials();
    } catch (error: any) {
      toast.error(error.message || 'Error al guardar');
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedTestimonial) return;
    try {
      const token = (session as any)?.accessToken;
      await apiClient.delete(`/testimonials/${selectedTestimonial._id}`, token);
      toast.success('Testimonial eliminado');
      setIsDeleteModalOpen(false);
      fetchTestimonials();
    } catch (error: any) {
      toast.error(error.message || 'Error al eliminar');
    }
  };

  const columns = [
    {
      key: 'image' as const,
      label: 'Foto',
      render: (value: string, row: Testimonial) =>
        value ? (
          <img
            src={value}
            alt={row.name}
            className="w-10 h-10 object-cover rounded-full border border-gray-200 dark:border-gray-600"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-400 text-xs">
            N/A
          </div>
        ),
    },
    { key: 'name' as const, label: 'Cliente' },
    {
      key: 'major' as const,
      label: 'Cargo / Empresa',
      render: (value: string) => (
        <span className="inline-block px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs rounded font-medium border border-blue-200 dark:border-blue-700">
          {value}
        </span>
      ),
    },
    {
      key: 'content' as const,
      label: 'Testimonio',
      render: (content: string) =>
        content?.length > 60 ? content.substring(0, 60) + '...' : content,
    },
    {
      key: 'url' as const,
      label: 'Links',
      render: (_: string, row: Testimonial) => (
        <div className="flex gap-3 items-center">
          {row.url && (
            <a href={row.url} target="_blank" rel="noopener noreferrer" title="Sitio web" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition">
              <FaGlobe size={16} />
            </a>
          )}
          {row.instagram && (
            <a href={row.instagram} target="_blank" rel="noopener noreferrer" title="Instagram" className="text-gray-600 dark:text-gray-400 hover:text-pink-500 transition">
              <FaInstagram size={16} />
            </a>
          )}
          {row.facebook && (
            <a href={row.facebook} target="_blank" rel="noopener noreferrer" title="Facebook" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition">
              <FaFacebook size={16} />
            </a>
          )}
          {row.linkedin && (
            <a href={row.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-gray-600 dark:text-gray-400 hover:text-blue-700 transition">
              <FaLinkedin size={16} />
            </a>
          )}
          {row.twitter && (
            <a href={row.twitter} target="_blank" rel="noopener noreferrer" title="Twitter" className="text-gray-600 dark:text-gray-400 hover:text-sky-500 transition">
              <FaTwitter size={16} />
            </a>
          )}
          {!row.url && !row.instagram && !row.facebook && !row.linkedin && !row.twitter && (
            <span className="text-gray-400 text-xs">-</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Testimonios</h1>
        <button
          onClick={() => {
            setSelectedTestimonial(null);
            setFormData({ name: '', major: '', content: '', url: '', instagram: '', facebook: '', linkedin: '', twitter: '' });
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
          <input type="text" placeholder="Nombre del cliente" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <input type="text" placeholder="Cargo / Empresa" value={formData.major} onChange={(e) => setFormData({ ...formData, major: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <textarea placeholder="Contenido del testimonio" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 h-24" />
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Redes sociales (opcional)</p>
          <input type="url" placeholder="Sitio web" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <input type="url" placeholder="Instagram" value={formData.instagram} onChange={(e) => setFormData({ ...formData, instagram: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <input type="url" placeholder="Facebook" value={formData.facebook} onChange={(e) => setFormData({ ...formData, facebook: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <input type="url" placeholder="LinkedIn" value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <input type="url" placeholder="Twitter / X" value={formData.twitter} onChange={(e) => setFormData({ ...formData, twitter: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
        </div>
      </Modal>

      <DeleteConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} title="Eliminar Testimonio" message={`¿Estás seguro que deseas eliminar el testimonio de "${selectedTestimonial?.name}"?`} />
    </div>
  );
}
