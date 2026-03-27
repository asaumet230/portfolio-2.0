import { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CardPost, PostSideBar } from '@/components';

const API_BASE = process.env.NEXT_PUBLIC_API_PATH || 'http://localhost:8080/api';

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

async function getCategory(slug: string): Promise<Category | null> {
  try {
    const res = await fetch(`${API_BASE}/article-categories/${slug}`, { next: { revalidate: 3600 } });
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

  return {
    title: `${category.name} | Blog de Tecnología | Andres Saumet`,
    description: category.description || `Artículos sobre ${category.name}: tutoriales, guías y recursos de desarrollo web y móvil por Andres Saumet.`,
    alternates: {
      canonical: `https://www.andressaumet.com/blog-de-tecnologia/categoria/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} | Blog de Tecnología | Andres Saumet`,
      description: category.description || `Artículos sobre ${category.name}`,
      url: `https://www.andressaumet.com/blog-de-tecnologia/categoria/${category.slug}`,
      type: 'website',
      locale: 'es_CO',
      siteName: 'Andres Saumet',
    },
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategory(params.slug);

  if (!category) notFound();

  return (
    <div className="container mx-auto px-4 pt-10 pb-20">
      {/* Header */}
      <header className="text-center mb-12 max-w-2xl mx-auto">
        <nav className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2 mb-4">
          <Link href="/blog-de-tecnologia" className="hover:text-[#7b7db0] transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-300">Categoría</span>
          <span>/</span>
          <span className="text-[#7b7db0] font-medium">{category.name}</span>
        </nav>
        <span className="text-xs font-semibold uppercase tracking-widest text-[#7b7db0]">Categoría</span>
        <h1 className="mt-2 text-4xl font-bold">{category.name}</h1>
        {category.description && (
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-base leading-relaxed">
            {category.description}
          </p>
        )}
      </header>

      {/* Layout */}
      <div className="flex gap-10 max-[920px]:flex-col items-start">
        <main className="flex-1 min-w-0">
          <Suspense fallback={<div className="animate-pulse space-y-4">{[1,2,3].map(i => <div key={i} className="h-48 bg-gray-100 dark:bg-gray-800 rounded-xl" />)}</div>}>
            <CardPost categorySlug={params.slug} />
          </Suspense>
        </main>
        <PostSideBar />
      </div>
    </div>
  );
}
