'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

import { apiClient } from '@/helpers/apiClient';
import { ProjectForm } from '@/components/admin/forms/ProjectForm';

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

interface PolicyDocument {
  content?: string;
  effectiveDate?: string;
}

interface ProjectFormData {
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
  hasTermsOfService?: boolean;
  privacyPolicy?: PolicyDocument;
  termsOfService?: PolicyDocument;
  active?: boolean;
}

export default function NewProjectPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (formData: ProjectFormData) => {
    setSubmitting(true);

    try {
      const token = (session as any)?.accessToken;
      const response = await apiClient.post('/projects', formData, token);

      if (response.ok) {
        toast.success('Proyecto creado exitosamente');
        const target = formData.category === 'mobil'
          ? '/dashboard/proyectos/projectos-moviles'
          : '/dashboard/proyectos/projectos-web';
        router.push(target);
      } else {
        toast.error(response.message || 'Error al crear el proyecto');
      }
    } catch (error: any) {
      console.error('Error creating project:', error);
      toast.error(error.message || 'Error al crear el proyecto');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/proyectos/projectos-web" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          <ArrowLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Nuevo Proyecto</h1>
      </div>

      <ProjectForm onSubmit={handleSubmit} isLoading={submitting} />
    </div>
  );
}
