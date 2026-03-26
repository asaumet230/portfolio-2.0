const BASE = 'https://www.andressaumet.com';
const API = process.env.NEXT_PUBLIC_API_PATH || 'http://localhost:8080/api';

function urlEntry(loc: string, lastmod: string) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
}

export async function GET() {
  let entries: string[] = [];

  try {
    const res = await fetch(`${API}/article-categories`, { next: { revalidate: 86400 } });
    const data = await res.json();
    const categories = (data.categories || []) as { slug: string; updatedAt?: string }[];

    entries = categories.map((c) =>
      urlEntry(
        `${BASE}/blog-de-tecnologia/categoria/${c.slug}`,
        c.updatedAt ? new Date(c.updatedAt).toISOString() : new Date().toISOString()
      )
    );
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
