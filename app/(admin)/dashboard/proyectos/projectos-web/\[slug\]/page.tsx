'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ProjectForm } from '@/components/admin/forms/ProjectForm';
import { apiClient } from '@/helpers/apiClient';
import toast from 'react-hot-toast';

interface Project {
  _id: string;
  name: string;
  slug: string;
  description: string;
  metaDescription?: string;
  category: string;
  technologies: string[];
  images: string[];
  liveUrl?: string;
  repositoryUrl?: string;
  active: boolean;
}

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [slug]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/projects/${slug}`);
      setProject(response.project);
    } catch (error) {
      toast.error('Error al cargar el proyecto');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: any) => {
    if (!project) return;

    try {
      setSaving(true);
      await apiClient.put(`/projects/${project._id}`, formData);
      toast.success('Proyecto actualizado exitosamente');
      router.push('/dashboard/proyectos/projectos-web');
    } catch (error: any) {
      toast.error(error.message || 'Error al actualizar proyecto');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <p className="text-red-800 dark:text-red-200">Proyecto no encontrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Editar Proyecto: {project.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Actualiza la información detallada del proyecto
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
        <ProjectForm
          initialData={project}
          onSubmit={handleSubmit}
          isLoading={saving}
        />
      </div>
    </div>
  );
}
