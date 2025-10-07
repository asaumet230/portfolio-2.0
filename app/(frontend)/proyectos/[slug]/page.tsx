import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getProjectBySlug } from "@/api/projects";
import { WebProjectLayout, MobileProjectLayout } from "@/components/layouts";

interface Props {
  params: {
    slug: string;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const { slug } = params;

  try {
    const { project } = await getProjectBySlug(slug);

    return {
      title: `${project.name} | Proyecto de Andrés Felipe Saumet`,
      description: project.description,
      keywords: `${project.name}, ${project.tecnologies.join(', ')}, ${project.category}`,
      robots: "index, follow",
      openGraph: {
        title: `${project.name} | Proyecto de Andrés Felipe Saumet`,
        description: project.description,
        url: `https://www.andressaumet.com/proyectos/${slug}`,
        type: "website",
        images: [
          {
            url: project.images[0],
            width: 1200,
            height: 630,
            alt: project.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${project.name} | Proyecto de Andrés Felipe Saumet`,
        description: project.description,
        images: [
          {
            url: project.images[0],
            alt: project.name,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: 'Proyecto no encontrado',
      description: 'El proyecto que buscas no existe',
    };
  }
}

export default async function ProjectDetailPage({ params }: Props) {

  const { slug } = params;

  let project;

  try {
    const response = await getProjectBySlug(slug);
    project = response.project;
  } catch (error) {
    notFound();
  }

  if (project.category === 'web') {
    return <WebProjectLayout project={project} slug={slug} />;
  } else {
    return <MobileProjectLayout project={project} slug={slug} />;
  }
}
