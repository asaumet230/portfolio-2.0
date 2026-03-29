const BASE_URL = 'https://www.andressaumet.com';
const API = process.env.NEXT_PUBLIC_API_PATH || 'http://localhost:8080/api';

interface SitemapEntry {
  url: string;
  lastModified?: Date | string;
  changeFrequency?: string;
  priority?: number;
}

const STATIC_PAGES: SitemapEntry[] = [
  { url: `${BASE_URL}/`,                                                priority: 1,   changeFrequency: 'daily',   lastModified: new Date() },
  { url: `${BASE_URL}/proyectos-desarrollo-web-y-aplicaciones-moviles`, priority: 0.8, changeFrequency: 'weekly',  lastModified: new Date() },
  { url: `${BASE_URL}/blog-de-tecnologia`,                              priority: 0.7, changeFrequency: 'weekly',  lastModified: new Date() },
  { url: `${BASE_URL}/herramientas`,                                    priority: 0.7, changeFrequency: 'weekly',  lastModified: new Date() },
  { url: `${BASE_URL}/contactame`,                                      priority: 0.6, changeFrequency: 'monthly', lastModified: new Date() },
  { url: `${BASE_URL}/politica-privacidad-y-proteccion-datos`,          priority: 0.3, changeFrequency: 'monthly', lastModified: new Date() },
  { url: `${BASE_URL}/terminos-y-condiciones`,                          priority: 0.3, changeFrequency: 'monthly', lastModified: new Date() },
];

async function fetchProjects(): Promise<SitemapEntry[]> {
  try {
    const [webRes, mobilRes] = await Promise.all([
      fetch(`${API}/projects/category/web`, { next: { revalidate: 86400 } }),
      fetch(`${API}/projects/category/mobil`, { next: { revalidate: 86400 } }),
    ]);
    const [webData, mobilData] = await Promise.all([webRes.json(), mobilRes.json()]);
    const projects = [...(webData.projects || []), ...(mobilData.projects || [])] as {
      slug: string;
      updatedAt?: string;
      category?: string;
    }[];

    const projectEntries = await Promise.all(
      projects.map(async (project) => {
        const lastModified = project.updatedAt ? new Date(project.updatedAt) : new Date();
        const entries: SitemapEntry[] = [
          {
            url: `${BASE_URL}/proyectos/${project.slug}`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
          },
        ];

        try {
          const detailRes = await fetch(`${API}/projects/${project.slug}`, { next: { revalidate: 86400 } });
          if (!detailRes.ok) return entries;

          const detailData = await detailRes.json();
          const detailProject = detailData.project as {
            hasPrivacyPolicy?: boolean;
            termsOfService?: { content?: string };
            category?: string;
          } | undefined;

          if (detailProject?.hasPrivacyPolicy) {
            entries.push({
              url: `${BASE_URL}/proyectos/${project.slug}/privacy-policy`,
              lastModified,
              changeFrequency: 'monthly',
              priority: 0.7,
            });
          }

          if (detailProject?.termsOfService?.content) {
            entries.push({
              url: `${BASE_URL}/proyectos/${project.slug}/terms-of-service`,
              lastModified,
              changeFrequency: 'monthly',
              priority: 0.7,
            });
          }

          if ((detailProject?.category || project.category) === 'mobil') {
            entries.push({
              url: `${BASE_URL}/proyectos/${project.slug}/delete-account`,
              lastModified,
              changeFrequency: 'monthly',
              priority: 0.7,
            });
          }
        } catch {
          return entries;
        }

        return entries;
      })
    );

    return projectEntries.flat();
  } catch {
    return [];
  }
}

async function fetchArticles(): Promise<SitemapEntry[]> {
  try {
    const res = await fetch(`${API}/articles?limit=1000`, { next: { revalidate: 3600 } });
    const data = await res.json();
    const articles = (data.articles || []) as { slug: string; updatedAt?: string }[];
    return articles.map((a) => ({
      url: `${BASE_URL}/blog-de-tecnologia/${a.slug}`,
      lastModified: a.updatedAt ? new Date(a.updatedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch {
    return [];
  }
}

async function fetchCategories(): Promise<SitemapEntry[]> {
  try {
    const res = await fetch(`${API}/article-categories`, { next: { revalidate: 86400 } });
    const data = await res.json();
    const categories = (data.categories || []) as { slug: string; updatedAt?: string }[];
    return categories.map((c) => ({
      url: `${BASE_URL}/blog-de-tecnologia/categoria/${c.slug}`,
      lastModified: c.updatedAt ? new Date(c.updatedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));
  } catch {
    return [];
  }
}

function priorityColor(priority: number) {
  if (priority >= 0.9) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  if (priority >= 0.7) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
  if (priority >= 0.5) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
  return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
}

function freqLabel(freq: string) {
  const map: Record<string, string> = {
    always: 'Siempre', hourly: 'Cada hora', daily: 'Diario',
    weekly: 'Semanal', monthly: 'Mensual', yearly: 'Anual', never: 'Nunca',
  };
  return map[freq] ?? freq;
}

const SUB_SITEMAPS = [
  { label: 'Páginas',    href: '/sitemap-paginas.xml' },
  { label: 'Proyectos',  href: '/sitemap-proyectos.xml' },
  { label: 'Artículos',  href: '/sitemap-articulos.xml' },
  { label: 'Categorías', href: '/sitemap-categorias.xml' },
];

export default async function SitemapPage() {
  const [projects, articles, categories] = await Promise.all([
    fetchProjects(),
    fetchArticles(),
    fetchCategories(),
  ]);

  const baseProjectEntries = projects.filter((entry) => {
    const path = entry.url.replace(BASE_URL, '');
    return !path.endsWith('/privacy-policy') && !path.endsWith('/terms-of-service') && !path.endsWith('/delete-account');
  });

  const legalProjectEntries = projects.filter((entry) => {
    const path = entry.url.replace(BASE_URL, '');
    return path.endsWith('/privacy-policy') || path.endsWith('/terms-of-service') || path.endsWith('/delete-account');
  });

  const sections = [
    { label: 'Páginas estáticas', entries: STATIC_PAGES },
    { label: 'Proyectos',         entries: baseProjectEntries },
    { label: 'Legal / Funcional', entries: legalProjectEntries },
    { label: 'Artículos',         entries: articles },
    { label: 'Categorías',        entries: categories },
  ];

  const total = sections.reduce((acc, s) => acc + s.entries.length, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Sitemap</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {total} URLs indexadas en total
          </p>
        </div>
        <a
          href="/sitemap-index.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-900 dark:bg-indigo-600 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-indigo-500 transition"
        >
          Ver índice XML ↗
        </a>
      </div>

      {/* Sub-sitemap links */}
      <div className="flex gap-2 flex-wrap">
        {SUB_SITEMAPS.map((s) => (
          <a
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            {s.label} ↗
          </a>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-3 flex-wrap">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColor(1)}`}>Alta ≥ 0.9</span>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColor(0.7)}`}>Media ≥ 0.7</span>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColor(0.5)}`}>Baja ≥ 0.5</span>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColor(0.2)}`}>Muy baja &lt; 0.5</span>
      </div>

      {/* Sections */}
      {sections.map(({ label, entries }) =>
        entries.length > 0 ? (
          <section key={label}>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              {label} ({entries.length})
            </h2>
            <SitemapTable entries={entries} />
          </section>
        ) : null
      )}
    </div>
  );
}

function SitemapTable({ entries }: { entries: SitemapEntry[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs tracking-wide">
          <tr>
            <th className="px-4 py-3 text-left">URL</th>
            <th className="px-4 py-3 text-center w-28">Prioridad</th>
            <th className="px-4 py-3 text-center w-32">Frecuencia</th>
            <th className="px-4 py-3 text-center w-36">Última mod.</th>
            <th className="px-4 py-3 text-center w-16">Ver</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {entries.map((entry) => {
            const path = entry.url.replace(BASE_URL, '') || '/';
            const priority = entry.priority ?? 0.5;
            const freq = entry.changeFrequency ?? 'weekly';
            const lastMod = entry.lastModified
              ? new Date(entry.lastModified).toLocaleDateString('es-CO', {
                  day: '2-digit', month: 'short', year: 'numeric',
                })
              : '—';

            return (
              <tr key={entry.url} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="px-4 py-3 font-mono text-gray-700 dark:text-gray-300 truncate max-w-xs">
                  {path}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${priorityColor(priority)}`}>
                    {priority.toFixed(1)}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-gray-500 dark:text-gray-400">
                  {freqLabel(freq)}
                </td>
                <td className="px-4 py-3 text-center text-gray-500 dark:text-gray-400">
                  {lastMod}
                </td>
                <td className="px-4 py-3 text-center">
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    ↗
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
