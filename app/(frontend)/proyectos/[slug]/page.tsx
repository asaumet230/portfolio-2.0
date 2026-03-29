import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { getProjectBySlug, getProjects } from "@/api/projects";
import { WebProjectLayout, MobileProjectLayout } from "@/components/layouts";
import { toJsonLd } from "@/helpers";

interface Props {
  params: {
    slug: string;
  }
}

export async function generateStaticParams() {
  try {
    const [webProjects, mobilProjects] = await Promise.all([
      getProjects('web'),
      getProjects('mobil'),
    ]);

    return [
      ...webProjects.projects.map(p => ({ slug: p.slug })),
      ...mobilProjects.projects.map(p => ({ slug: p.slug })),
    ];
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const { slug } = params;

  try {
    const { project } = await getProjectBySlug(slug);

    return {
      title: `${project.name} | Proyecto de Andrés Felipe Saumet`,
      description: project.description,
      keywords: `${project.name}, ${project.technologies.join(', ')}, ${project.category}`,
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
    const webProjectSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CreativeWork',
          '@id': `https://www.andressaumet.com/proyectos/${slug}#project`,
          name: project.name,
          description: project.description,
          url: `https://www.andressaumet.com/proyectos/${slug}`,
          image: project.images,
          creator: {
            '@type': 'Person',
            name: 'Andres Felipe Saumet',
            url: 'https://www.andressaumet.com/',
          },
          keywords: project.technologies,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.andressaumet.com/' },
            { '@type': 'ListItem', position: 2, name: 'Proyectos', item: 'https://www.andressaumet.com/proyectos-desarrollo-web-y-aplicaciones-moviles' },
            { '@type': 'ListItem', position: 3, name: project.name, item: `https://www.andressaumet.com/proyectos/${slug}` },
          ],
        },
      ],
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(webProjectSchema) }}
        />
        <WebProjectLayout project={project} slug={slug} />
      </>
    );
  } else {
    const mobileProjectSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          '@id': `https://www.andressaumet.com/proyectos/${slug}#app`,
          name: project.name,
          description: project.description,
          url: `https://www.andressaumet.com/proyectos/${slug}`,
          image: project.images,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'iOS',
          offers: project.urlAppleStore || project.urlApp ? {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            url: project.urlAppleStore || project.urlApp,
          } : undefined,
          author: {
            '@type': 'Person',
            name: 'Andres Felipe Saumet',
            url: 'https://www.andressaumet.com/',
          },
          keywords: project.technologies,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.andressaumet.com/' },
            { '@type': 'ListItem', position: 2, name: 'Proyectos', item: 'https://www.andressaumet.com/proyectos-desarrollo-web-y-aplicaciones-moviles' },
            { '@type': 'ListItem', position: 3, name: project.name, item: `https://www.andressaumet.com/proyectos/${slug}` },
          ],
        },
      ],
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(mobileProjectSchema) }}
        />
        <MobileProjectLayout project={project} slug={slug} />
      </>
    );
  }
}
