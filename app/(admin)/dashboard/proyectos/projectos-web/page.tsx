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
  images: string[];
}

export default function ProjectosWebPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [expandedTech, setExpandedTech] = useState<Set<string>>(new Set());

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

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const paginatedProjects = projects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const columns = [
    {
      key: 'images' as const,
      label: 'Foto',
      render: (images: string[]) => images?.[0] ? (
        <img
          src={images[0]}
          alt="thumbnail"
          className="w-32 h-20 object-cover rounded"
        />
      ) : <span className="text-gray-400">—</span>,
    },
    { key: 'name' as const, label: 'Nombre' },
    {
      key: 'technologies' as const,
      label: 'Tecnologías',
      render: (tech: string[], row: Project) => {
        const isExpanded = expandedTech.has(row._id);
        const visible = isExpanded ? tech : tech.slice(0, 3);
        const remaining = tech.length - 3;
        return (
          <div className="flex flex-wrap gap-1 max-w-[200px]">
            {visible.map((t) => (
              <span key={t} className="px-2 py-0.5 bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 text-xs rounded border border-violet-200 dark:border-violet-700 capitalize">
                {t}
              </span>
            ))}
            {!isExpanded && remaining > 0 && (
              <button
                onClick={() => setExpandedTech((prev) => new Set(prev).add(row._id))}
                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition cursor-pointer"
              >
                +{remaining}
              </button>
            )}
            {isExpanded && (
              <button
                onClick={() => setExpandedTech((prev) => { const s = new Set(prev); s.delete(row._id); return s; })}
                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition cursor-pointer"
              >
                ver menos
              </button>
            )}
          </div>
        );
      },
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

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          {projects.length} proyectos · página {currentPage} de {totalPages || 1}
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
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div
        key={`${currentPage}-${itemsPerPage}`}
        style={{ animation: 'fadeIn 0.3s ease-in-out' }}
      >
        <DataTable
          columns={columns}
          data={paginatedProjects}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          emptyMessage="No hay proyectos web"
        />
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
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
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Siguiente →
          </button>
        </div>
      )}

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
