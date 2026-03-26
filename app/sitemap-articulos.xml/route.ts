const BASE = 'https://www.andressaumet.com';
const API = process.env.NEXT_PUBLIC_API_PATH || 'http://localhost:8080/api';

function urlEntry(loc: string, lastmod: string) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
}

export async function GET() {
  let entries: string[] = [];

  try {
    const res = await fetch(`${API}/articles?limit=1000`, { next: { revalidate: 3600 } });
    const data = await res.json();
    const articles = (data.articles || []) as { slug: string; updatedAt?: string }[];

    entries = articles.map((a) =>
      urlEntry(
        `${BASE}/blog-de-tecnologia/${a.slug}`,
        a.updatedAt ? new Date(a.updatedAt).toISOString() : new Date().toISOString()
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
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
