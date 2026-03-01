import { MetadataRoute } from 'next';
import { getProjects } from '@/api/projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.andressaumet.com';

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/proyectos-desarrollo-web-y-aplicaciones-moviles`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/herramientas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contactame`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/politica-privacidad-y-proteccion-datos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terminos-y-condiciones`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // Dynamic routes - projects
  try {
    const [webProjects, mobilProjects] = await Promise.all([
      getProjects('web'),
      getProjects('mobil'),
    ]);

    const projectRoutes: MetadataRoute.Sitemap = [
      ...webProjects.projects.map((project) => ({
        url: `${baseUrl}/proyectos/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      })),
      ...mobilProjects.projects.map((project) => ({
        url: `${baseUrl}/proyectos/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      })),
    ];

    return [...staticRoutes, ...projectRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticRoutes;
  }
}
