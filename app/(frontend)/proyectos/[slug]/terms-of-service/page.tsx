import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getProjectBySlug } from "@/api/projects";
import { Separator } from "@/components";

interface Props {
  params: {
    slug: string;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const { slug } = params;

  try {
    const { project } = await getProjectBySlug(slug);

    if (!project.termsOfService) {
      return {
        title: 'Términos y Condiciones no disponibles',
        description: 'Este proyecto no tiene términos y condiciones',
      };
    }

    return {
      title: `Términos y Condiciones - ${project.name} | Andrés Felipe Saumet`,
      description: `Términos y condiciones de la aplicación ${project.name}. Conoce las reglas de uso.`,
      keywords: `términos y condiciones, ${project.name}, términos de servicio, legal`,
      robots: "index, follow",
      openGraph: {
        title: `Términos y Condiciones - ${project.name}`,
        description: `Términos y condiciones de la aplicación ${project.name}`,
        url: `https://www.andressaumet.com/proyectos/${slug}/terms-of-service`,
        type: "website",
      },
      twitter: {
        card: "summary",
        title: `Términos y Condiciones - ${project.name}`,
        description: `Términos y condiciones de la aplicación ${project.name}`,
      },
    };
  } catch (error) {
    return {
      title: 'Términos y Condiciones no encontrados',
      description: 'Los términos y condiciones que buscas no existen',
    };
  }
}

export default async function TermsOfServicePage({ params }: Props) {

  const { slug } = params;

  let project;

  try {
    const response = await getProjectBySlug(slug);
    project = response.project;
  } catch (error) {
    notFound();
  }

  // Si el proyecto no tiene términos de servicio, mostrar 404
  if (!project.termsOfService) {
    notFound();
  }

  return (
    <>
      <header className="section">
        <div className="mt-14 mb-14">
          <h1 className="text-center">Terms of Service</h1>
          <div className="flex justify-center">
            <Separator />
          </div>
          <p className="text-center text-2xl font-semibold mt-4 capitalize">
            {project.name}
          </p>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
            Effective Date: {project.termsOfService.effectiveDate}
          </p>
        </div>
      </header>

      <main className="section">
        <div className="max-w-4xl mx-auto">
          
          <article
            className="privacy-policy-content"
            dangerouslySetInnerHTML={{ __html: project.termsOfService.content }}
          />

         
          <div className="my-12 pt-8 border-t border-gray-300 dark:border-gray-700 flex flex-col sm:flex-row gap-4 sm:justify-between">
            <Link
              href={`/proyectos/${slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary-color dark:bg-indigo-600 text-white rounded-lg hover:bg-opacity-90 hover:shadow-lg transition-all duration-300 font-semibold justify-center sm:justify-start"
            >
              <span>←</span>
              <span>Volver al Proyecto</span>
            </Link>
            <Link
              href="/proyectos-desarrollo-web-y-aplicaciones-moviles"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-secondary-color dark:border-indigo-600 text-secondary-color dark:text-indigo-600 rounded-lg hover:bg-secondary-color hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300 font-semibold justify-center sm:justify-start"
            >
              <span>Ver Todos los Proyectos</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
