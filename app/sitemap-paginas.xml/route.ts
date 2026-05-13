const BASE = 'https://www.andressaumet.com';

const PAGES = [
  { loc: `${BASE}/`,                                                      lastmod: new Date().toISOString(), changefreq: 'daily',   priority: '1.0' },
  { loc: `${BASE}/proyectos-desarrollo-web-y-aplicaciones-moviles`,       lastmod: new Date().toISOString(), changefreq: 'weekly',  priority: '0.8' },
  { loc: `${BASE}/blog-de-tecnologia`,                                    lastmod: new Date().toISOString(), changefreq: 'weekly',  priority: '0.7' },
  { loc: `${BASE}/herramientas`,                                          lastmod: new Date().toISOString(), changefreq: 'weekly',  priority: '0.7' },
  { loc: `${BASE}/contactame`,                                            lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.6' },
  { loc: `${BASE}/politica-privacidad-y-proteccion-datos`,                lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.3' },
  { loc: `${BASE}/terminos-y-condiciones`,                                lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.3' },
];

function urlEntry(p: { loc: string; lastmod: string; changefreq: string; priority: string }) {
  return `  <url>
    <loc>${p.loc}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`;
}

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(urlEntry).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
