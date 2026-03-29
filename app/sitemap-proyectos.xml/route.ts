const BASE = 'https://www.andressaumet.com';
const API = process.env.NEXT_PUBLIC_API_PATH || 'http://localhost:8080/api';

function urlEntry(loc: string, lastmod: string) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
}

export async function GET() {
  let entries: string[] = [];

  try {
    const [webRes, mobilRes] = await Promise.all([
      fetch(`${API}/projects/category/web`, { next: { revalidate: 86400 } }),
      fetch(`${API}/projects/category/mobil`, { next: { revalidate: 86400 } }),
    ]);

    const [webData, mobilData] = await Promise.all([webRes.json(), mobilRes.json()]);
    const projects = [
      ...(webData.projects || []),
      ...(mobilData.projects || []),
    ] as { slug: string; updatedAt?: string; category?: string }[];

    const projectEntries = await Promise.all(
      projects.map(async (project) => {
        const lastmod = project.updatedAt ? new Date(project.updatedAt).toISOString() : new Date().toISOString();
        const urls = [urlEntry(`${BASE}/proyectos/${project.slug}`, lastmod)];

        try {
          const detailRes = await fetch(`${API}/projects/${project.slug}`, { next: { revalidate: 86400 } });
          if (!detailRes.ok) return urls;

          const detailData = await detailRes.json();
          const detailProject = detailData.project as {
            hasPrivacyPolicy?: boolean;
            termsOfService?: { content?: string };
            category?: string;
          } | undefined;

          if (detailProject?.hasPrivacyPolicy) {
            urls.push(urlEntry(`${BASE}/proyectos/${project.slug}/privacy-policy`, lastmod));
          }

          if (detailProject?.termsOfService?.content) {
            urls.push(urlEntry(`${BASE}/proyectos/${project.slug}/terms-of-service`, lastmod));
          }

          if ((detailProject?.category || project.category) === 'mobil') {
            urls.push(urlEntry(`${BASE}/proyectos/${project.slug}/delete-account`, lastmod));
          }
        } catch {
          return urls;
        }

        return urls;
      })
    );

    entries = projectEntries.flat();
  } catch {
    entries = [];
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
