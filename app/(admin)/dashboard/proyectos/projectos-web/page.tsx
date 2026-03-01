'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { DataTable } from '@/components/admin/tables/DataTable';
import { DeleteConfirmModal } from '@/components/admin/modals/DeleteConfirmModal';
import { apiClient } from '@/helpers/apiClient';
import toast from 'react-hot-toast';

interface Project {
  _id: string;
  name: string;
  category: string;
  technologies: string[];
  description: string;
  slug: string;
}

export default function ProjectosWebPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/projects/category/web');
      setProjects(response.projects || []);
    } catch (error) {
      toast.error('Error al cargar los proyectos');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    router.push(`/dashboard/proyectos/projectos-web/${project.slug}`);
  };

  const handleDelete = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProject) return;
    try {
      const token = (session as any)?.accessToken;
      await apiClient.delete(`/projects/${selectedProject._id}`, token);
      toast.success('Proyecto eliminado');
      setIsDeleteModalOpen(false);
      fetchProjects();
    } catch (error: any) {
      toast.error(error.message || 'Error al eliminar');
    }
  };

  const columns = [
    { key: 'name' as const, label: 'Nombre' },
    {
      key: 'technologies' as const,
      label: 'Tecnologías',
      render: (tech: string[]) => tech.slice(0, 3).join(', ') + (tech.length > 3 ? '...' : ''),
    },
    {
      key: 'description' as const,
      label: 'Descripción',
      render: (desc: string) => desc.substring(0, 50) + '...',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Proyectos Web
        </h1>
        <button
          onClick={() => router.push('/dashboard/proyectos/nuevo')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          + Nuevo Proyecto
        </button>
      </div>

      <DataTable
        columns={columns}
        data={projects}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No hay proyectos web"
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Eliminar Proyecto"
        message={`¿Estás seguro que deseas eliminar el proyecto "${selectedProject?.name}"?`}
      />
    </div>
  );
}
