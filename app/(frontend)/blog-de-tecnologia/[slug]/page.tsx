import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PostSideBar, AuthorBio } from '@/components';
import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FeaturedImage } from './FeaturedImage';

const API_BASE = process.env.NEXT_PUBLIC_API_PATH || 'http://localhost:8080/api';
const SITE_URL = 'https://www.andressaumet.com';

interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: { _id: string; name: string; slug: string } | string;
  tags: string[];
  published: boolean;
  createdAt: string;
  seoMetadata?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    canonical?: string;
  };
}

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const res = await fetch(`${API_BASE}/articles/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.article || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticle(params.slug);
  if (!article) return { title: 'Artículo no encontrado' };

  const seo = article.seoMetadata;
  const title = seo?.title || article.title;
  const description = seo?.description || article.excerpt;
  const image = seo?.ogImage || article.featuredImage;

  return {
    title: `${title} | Andres Saumet`,
    description,
    keywords: seo?.keywords || article.tags,
    alternates: {
      canonical: seo?.canonical || `${SITE_URL}/blog-de-tecnologia/${article.slug}`,
    },
    openGraph: {
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      url: `${SITE_URL}/blog-de-tecnologia/${article.slug}`,
      type: 'article',
      locale: 'es_CO',
      siteName: 'Andres Saumet',
      images: image ? [{ url: image, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      images: image ? [image] : [],
    },
  };
}

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article || !article.published) notFound();

  const categoryName =
    typeof article.category === 'object' && article.category !== null
      ? article.category.name
      : '';
  const categorySlug =
    typeof article.category === 'object' && article.category !== null
      ? article.category.slug
      : '';

  const articleUrl = `${SITE_URL}/blog-de-tecnologia/${article.slug}`;
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(article.title);

  return (
    <div className="container mx-auto px-4 pt-6 md:pt-10 pb-20">

      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 dark:text-gray-500 mb-6 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-[#7b7db0] transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/blog-de-tecnologia" className="hover:text-[#7b7db0] transition-colors">Blog</Link>
        {categoryName && (
          <>
            <span>/</span>
            <Link href={`/blog-de-tecnologia/categoria/${categorySlug}`} className="hover:text-[#7b7db0] transition-colors">
              {categoryName}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-gray-600 dark:text-gray-300 truncate max-w-[180px] md:max-w-xs">{article.title}</span>
      </nav>

      <div className="flex gap-10 max-[920px]:flex-col items-start">

        {/* Main content */}
        <main className="flex-1 min-w-0">

          {/* Article card */}
          <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700 overflow-hidden">

            {/* Featured Image */}
            <FeaturedImage src={article.featuredImage} alt={article.title} />

            <div className="p-5 sm:p-7 md:p-10">

              {/* Category + Date */}
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                {categoryName && (
                  <Link
                    href={`/blog-de-tecnologia/categoria/${categorySlug}`}
                    className="text-xs font-semibold uppercase tracking-widest text-[#7b7db0] hover:text-[#5a5c8a] transition-colors"
                  >
                    {categoryName}
                  </Link>
                )}
                <span className="text-xs text-gray-400 dark:text-gray-500">{formatDate(article.createdAt)}</span>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight mb-3">{article.title}</h1>

              {/* Excerpt */}
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-light leading-relaxed mb-5 border-l-4 border-[#7b7db0]/40 pl-4 italic">
                {article.excerpt}
              </p>

              {/* Author + Tags */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-6 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#7b7db0] flex items-center justify-center text-white text-xs font-bold shrink-0">AS</div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Andres Saumet</span>
                </div>
                {article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div
                className="prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-none mt-8 prose-headings:font-bold prose-a:text-[#7b7db0] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Author Bio */}
              <AuthorBio />

              {/* Share + Back */}
              <div className="mt-12 pt-6 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                {/* Share buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400 dark:text-gray-500">Compartir:</span>
                  <a
                    href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Compartir en WhatsApp"
                    className="w-9 h-9 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors"
                  >
                    <FaWhatsapp size={16} />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Compartir en X"
                    className="w-9 h-9 rounded-full bg-black hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white flex items-center justify-center transition-colors"
                  >
                    <FaXTwitter size={16} />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Compartir en LinkedIn"
                    className="w-9 h-9 rounded-full bg-[#0077B5] hover:bg-[#005f8e] text-white flex items-center justify-center transition-colors"
                  >
                    <FaLinkedinIn size={16} />
                  </a>
                </div>

                {/* Back button */}
                <Link
                  href="/blog-de-tecnologia"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-[#7b7db0] text-[#7b7db0] text-sm font-semibold hover:bg-[#7b7db0] hover:text-white transition-all duration-200 self-start sm:self-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Volver al Blog
                </Link>
              </div>
            </div>
          </article>
        </main>

        {/* Sidebar */}
        <PostSideBar />
      </div>
    </div>
  );
}
