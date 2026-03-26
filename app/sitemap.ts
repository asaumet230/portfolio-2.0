import { MetadataRoute } from 'next';

const API = process.env.NEXT_PUBLIC_API_PATH || 'http://localhost:8080/api';
const BASE = 'https://www.andressaumet.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                                                                    lastModified: new Date(), changeFrequency: 'daily',   priority: 1   },
    { url: `${BASE}/proyectos-desarrollo-web-y-aplicaciones-moviles`,              lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/blog-de-tecnologia`,                                           lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/herramientas`,                                                 lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/contactame`,                                                   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/politica-privacidad-y-proteccion-datos`,                       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE}/terminos-y-condiciones`,                                       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];

  const [projectRoutes, articleRoutes, categoryRoutes] = await Promise.all([
    (async (): Promise<MetadataRoute.Sitemap> => {
      try {
        const [w, m] = await Promise.all([
          fetch(`${API}/projects/category/web`,   { next: { revalidate: 86400 } }).then(r => r.json()),
          fetch(`${API}/projects/category/mobil`, { next: { revalidate: 86400 } }).then(r => r.json()),
        ]);
        return [...(w.projects || []), ...(m.projects || [])].map((p: { slug: string; updatedAt?: string }) => ({
          url: `${BASE}/proyectos/${p.slug}`,
          lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.8,
        }));
      } catch { return []; }
    })(),

    (async (): Promise<MetadataRoute.Sitemap> => {
      try {
        const data = await fetch(`${API}/articles?limit=1000`, { next: { revalidate: 3600 } }).then(r => r.json());
        return (data.articles || []).map((a: { slug: string; updatedAt?: string }) => ({
          url: `${BASE}/blog-de-tecnologia/${a.slug}`,
          lastModified: a.updatedAt ? new Date(a.updatedAt) : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }));
      } catch { return []; }
    })(),

    (async (): Promise<MetadataRoute.Sitemap> => {
      try {
        const data = await fetch(`${API}/article-categories`, { next: { revalidate: 86400 } }).then(r => r.json());
        return (data.categories || []).map((c: { slug: string; updatedAt?: string }) => ({
          url: `${BASE}/blog-de-tecnologia/categoria/${c.slug}`,
          lastModified: c.updatedAt ? new Date(c.updatedAt) : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        }));
      } catch { return []; }
    })(),
  ]);

  return [...staticRoutes, ...projectRoutes, ...articleRoutes, ...categoryRoutes];
}
