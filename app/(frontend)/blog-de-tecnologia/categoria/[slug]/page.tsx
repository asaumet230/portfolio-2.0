import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CategorySortFilter, PostSideBar } from '@/components';

const API_BASE = process.env.NEXT_PUBLIC_API_PATH || 'http://localhost:8080/api';

interface SeoMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
  robots?: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  seoMetadata?: SeoMetadata;
}

async function getCategory(slug: string): Promise<Category | null> {
  try {
    const res = await fetch(`${API_BASE}/article-categories/slug/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.category || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = await getCategory(params.slug);
  if (!category) return { title: 'Categoría no encontrada' };

  const seo = category.seoMetadata;
  const fallbackTitle = `${category.name} | Blog de Tecnología | Andres Saumet`;
  const fallbackDesc = `Artículos sobre ${category.name}: tutoriales, guías y recursos de desarrollo web y móvil por Andres Saumet.`;
  const fallbackCanonical = `https://www.andressaumet.com/blog-de-tecnologia/categoria/${category.slug}`;

  return {
    title: seo?.title || fallbackTitle,
    description: seo?.description || fallbackDesc,
    keywords: seo?.keywords || [],
    robots: seo?.robots || 'index, follow',
    authors: [{ name: 'Andres Felipe Saumet', url: 'https://www.andressaumet.com' }],
    alternates: {
      canonical: seo?.canonical || fallbackCanonical,
    },
    openGraph: {
      title: seo?.ogTitle || seo?.title || fallbackTitle,
      description: seo?.ogDescription || seo?.description || fallbackDesc,
      url: seo?.canonical || fallbackCanonical,
      type: 'website',
      locale: 'es_CO',
      siteName: 'Andres Saumet',
      images: seo?.ogImage
        ? [{ url: seo.ogImage, width: 1200, height: 630, alt: seo?.ogTitle || fallbackTitle }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.ogTitle || seo?.title || fallbackTitle,
      description: seo?.ogDescription || seo?.description || fallbackDesc,
      images: seo?.ogImage ? [{ url: seo.ogImage, alt: seo?.ogTitle || fallbackTitle }] : [],
    },
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategory(params.slug);

  if (!category) notFound();

  return (
    <div className="container mx-auto px-4 pt-10 pb-20">
      {/* Header */}
      <header className="mb-10 w-full mx-auto md:w-[85%]">
        <nav className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-4">
          <Link href="/blog-de-tecnologia" className="hover:text-[#7b7db0] transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-300">Categoría</span>
          <span>/</span>
          <span className="text-[#7b7db0] font-medium">{category.name}</span>
        </nav>
        <span className="block text-xs font-semibold uppercase tracking-widest text-[#7b7db0] text-center">
          Blog de Tecnología
        </span>
        <h1 className="mt-2 text-4xl font-bold text-center">{category.name}</h1>
        {category.description && (
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-base leading-relaxed text-justify px-4 md:px-8">
            {category.description}
          </p>
        )}
      </header>

      {/* Layout: articles + sidebar */}
      <div className="flex gap-10 max-[920px]:flex-col items-start">
        <main className="flex-1 min-w-0">
          <CategorySortFilter categorySlug={params.slug} />
        </main>
        <PostSideBar />
      </div>
    </div>
  );
}
