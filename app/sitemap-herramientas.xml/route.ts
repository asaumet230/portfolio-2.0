const BASE = 'https://www.andressaumet.com';

const TOOLS = [
  { loc: `${BASE}/herramientas`,                               changefreq: 'weekly',  priority: '0.7' },
  { loc: `${BASE}/herramientas/convertidor-de-imagenes`,       changefreq: 'monthly', priority: '0.6' },
  { loc: `${BASE}/herramientas/comprimir-imagenes-gratis`,     changefreq: 'monthly', priority: '0.6' },
  { loc: `${BASE}/herramientas/mayusculas-minusculas`,         changefreq: 'monthly', priority: '0.6' },
];

function urlEntry(loc: string, changefreq: string, priority: string) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${TOOLS.map((t) => urlEntry(t.loc, t.changefreq, t.priority)).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
