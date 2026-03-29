import { Metadata } from "next";
import Link from "next/link";
import { BlogCategoryFilter, PostSideBar } from "@/components";
import { toJsonLd } from "@/helpers";

const API_BASE = process.env.NEXT_PUBLIC_API_PATH || 'http://localhost:8080/api';

async function getCategories() {
  try {
    const res = await fetch(`${API_BASE}/article-categories`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.categories || [];
  } catch {
    return [];
  }
}

async function getRecentArticles() {
  try {
    const res = await fetch(`${API_BASE}/articles?page=1&limit=4`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.articles || [];
  } catch {
    return [];
  }
}

async function getInitialArticles(query = '') {
  try {
    const params = new URLSearchParams({ page: '1', limit: '6', sort: 'desc' });
    if (query) params.append('q', query);
    const res = await fetch(`${API_BASE}/articles?${params}`, { next: { revalidate: 3600 } });
    if (!res.ok) return { articles: [], total: 0, totalPages: 1 };
    const data = await res.json();
    return {
      articles: data.articles || [],
      total: data.total || 0,
      totalPages: data.totalPages || 1,
    };
  } catch {
    return { articles: [], total: 0, totalPages: 1 };
  }
}

export const metadata: Metadata = {
  title: "Blog de Tecnología y Programación | Andres Saumet",
  description: "Blog de tecnología de Andres Saumet: tutoriales de desarrollo web y móvil, herramientas gratuitas y guías para empresas que quieren digitalizar su negocio.",
  keywords: [
    "blog de tecnología",
    "blog de informática",
    "blog de informática y tecnología",
    "blog de desarrollo web",
    "tutoriales de programación",
    "Next.js tutorial español",
    "Flutter tutorial español",
    "desarrollo web Colombia",
    "herramientas para desarrolladores",
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Dart",
    "Andres Saumet",
  ],
  robots: "index, follow",
  authors: [{ name: "Andres Felipe Saumet", url: "https://www.andressaumet.com" }],
  category: "tecnología",
  alternates: {
    canonical: "https://www.andressaumet.com/blog-de-tecnologia",
  },
  openGraph: {
    title: "Blog de Tecnología y Programación | Andres Saumet",
    description: "Blog de tecnología de Andres Saumet: tutoriales de desarrollo web y móvil, herramientas gratuitas y guías para empresas que quieren digitalizar su negocio.",
    url: "https://www.andressaumet.com/blog-de-tecnologia",
    type: "website",
    locale: "es_CO",
    siteName: "Andres Saumet",
    images: [
      {
        url: "https://www.andressaumet.com/_next/image?url=%2Fimages%2Fandres-saumet-dark.webp&w=1200&q=75",
        width: 1200,
        height: 630,
        alt: "Blog de Tecnología y Programación | Andres Saumet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog de Tecnología y Programación | Andres Saumet",
    description: "Blog de tecnología de Andres Saumet: tutoriales de desarrollo web y móvil, herramientas gratuitas y guías para empresas que quieren digitalizar su negocio.",
    images: [
      {
        url: "https://www.andressaumet.com/_next/image?url=%2Fimages%2Fandres-saumet-dark.webp&w=1200&q=75",
        alt: "Blog de Tecnología y Programación | Andres Saumet",
      },
    ],
  },
};

export default async function Blog({ searchParams }: { searchParams?: { q?: string } }) {
  const query = searchParams?.q || '';
  const [categories, recentArticles, initialArticlesData] = await Promise.all([
    getCategories(),
    getRecentArticles(),
    getInitialArticles(query),
  ]);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': 'https://www.andressaumet.com/blog-de-tecnologia#blog',
        url: 'https://www.andressaumet.com/blog-de-tecnologia',
        name: 'Blog de Tecnología y Programación | Andres Saumet',
        description: metadata.description,
        inLanguage: 'es-CO',
        publisher: {
          '@type': 'Person',
          '@id': 'https://www.andressaumet.com/#person',
          name: 'Andres Felipe Saumet',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: 'https://www.andressaumet.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog de Tecnología',
            item: 'https://www.andressaumet.com/blog-de-tecnologia',
          },
        ],
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 pt-10 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(blogSchema) }}
      />
      {/* Header */}
      <header className="mb-10 w-full mx-auto md:w-[85%]">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-4">
          <Link href="/" className="hover:text-[#7b7db0] transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-[#7b7db0] font-medium">Blog de Tecnología</span>
        </nav>

        <span className="block text-xs font-semibold uppercase tracking-widest text-[#7b7db0] text-center">Blog de Tecnología</span>
        <h1 className="mt-2 text-4xl font-bold text-center">Desarrollo Web y Móvil con Andres Saumet</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-base leading-relaxed text-justify px-4 md:px-8">
          Aprende desarrollo web con <strong className="text-gray-700 dark:text-gray-300">Next.js, React y Node.js</strong> y desarrollo móvil con <strong className="text-gray-700 dark:text-gray-300">Flutter y Dart</strong>. Tutoriales prácticos, guías de SEO técnico y herramientas gratuitas para desarrolladores. Si eres empresa o emprendedor buscando digitalizar tu negocio, aquí encuentras contenido que te guía desde la idea hasta el lanzamiento.
        </p>
      </header>

      {/* Layout: articles + sidebar */}
      <div className="flex gap-10 max-[920px]:flex-col items-start">
        {/* Articles grid with category filter */}
        <main className="flex-1 min-w-0">
          <BlogCategoryFilter
            initialCategories={categories}
            initialArticles={initialArticlesData.articles}
            initialTotal={initialArticlesData.total}
            initialTotalPages={initialArticlesData.totalPages}
            initialQuery={query}
          />
        </main>

        {/* Sidebar */}
        <PostSideBar initialCategories={categories} initialRecent={recentArticles} />
      </div>
    </div>
  );
}
