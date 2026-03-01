'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { apiClient } from '@/helpers/apiClient';
import { ProjectForm } from '@/components/admin/forms/ProjectForm';
import toast from 'react-hot-toast';

interface SEOMetadata {
  author?: string;
  canonical?: string;
  description?: string;
  keywords?: string[];
  ogDescription?: string;
  ogImage?: string;
  ogTitle?: string;
  title?: string;
}

interface Project {
  _id: string;
  name: string;
  slug: string;
  description: string;
  projectGoal?: string;
  category: 'web' | 'mobil';
  technologies: string[];
  images: string[];
  urlApp?: string;
  urlRepository?: string;
  seoMetadata?: SEOMetadata;
  hasPrivacyPolicy?: boolean;
  active?: boolean;
}

export default function EditProjectPage({ params }: { params: { slug: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await apiClient.get(`/projects/${params.slug}`);
        if (response.ok && response.project) {
          setProject(response.project);
        } else {
          toast.error('Proyecto no encontrado');
          router.push('/dashboard/proyectos/projectos-moviles');
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        toast.error('Error al cargar el proyecto');
        router.push('/dashboard/proyectos/projectos-moviles');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.slug, router]);

  const handleSubmit = async (formData: any) => {
    if (!project?._id) return;

    setSubmitting(true);
    try {
      const token = (session as any)?.accessToken;
      const response = await apiClient.put(`/projects/${project._id}`, formData, token);
      if (response.ok) {
        toast.success('Proyecto actualizado exitosamente');
        router.push('/dashboard/proyectos/projectos-moviles');
      } else {
        toast.error(response.message || 'Error al actualizar el proyecto');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Error al actualizar el proyecto');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-8">Cargando...</div>;
  }

  if (!project) {
    return <div className="p-8">Proyecto no encontrado</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Editar Proyecto Móvil: {project.name}</h1>
      <ProjectForm
        initialData={project}
        onSubmit={handleSubmit}
        isLoading={submitting}
      />
    </div>
  );
}
