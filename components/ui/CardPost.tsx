'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiLink, FiCheck } from 'react-icons/fi';

const API_BASE = process.env.NEXT_PUBLIC_API_PATH || 'http://localhost:8080/api';

interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  category: { _id: string; name: string; slug: string } | string;
  tags: string[];
  published: boolean;
  createdAt: string;
}

const ArticleImage = ({ src, alt }: { src: string; alt: string }) => {
  const [error, setError] = React.useState(false);
  if (!src || error) return <ImagePlaceholder />;
  return (
    <Image
      src={src}
      alt={alt}
      width={600}
      height={300}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      onError={() => setError(true)}
    />
  );
};

const ImagePlaceholder = () => (
  <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#7b7db0]/20 via-[#7b7db0]/10 to-indigo-100 dark:from-[#7b7db0]/30 dark:via-gray-800 dark:to-gray-700">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#7b7db0]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <span className="text-xs text-[#7b7db0]/70 font-medium tracking-wide">Andres Saumet</span>
  </div>
);

const SITE_URL = 'https://www.andressaumet.com';

const ShareButtons = ({ slug, title }: { slug: string; title: string }) => {
  const [copied, setCopied] = useState(false);
  const url = `${SITE_URL}/blog-de-tecnologia/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openShare = (shareUrl: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  const buttons = [
    {
      label: 'Compartir en WhatsApp',
      icon: <FaWhatsapp size={15} />,
      className: 'bg-green-500 hover:bg-green-600 text-white',
      onClick: openShare(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`),
    },
    {
      label: 'Compartir en X',
      icon: <FaXTwitter size={15} />,
      className: 'bg-black hover:bg-gray-800 text-white dark:bg-gray-700 dark:hover:bg-gray-600',
      onClick: openShare(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`),
    },
    {
      label: 'Compartir en LinkedIn',
      icon: <FaLinkedinIn size={15} />,
      className: 'bg-[#0077B5] hover:bg-[#005f8e] text-white',
      onClick: openShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`),
    },
    {
      label: copied ? '¡Copiado!' : 'Copiar enlace',
      icon: copied ? <FiCheck size={15} /> : <FiLink size={15} />,
      className: copied ? 'bg-[#7b7db0] text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-600 dark:text-gray-200',
      onClick: handleCopy,
    },
  ];

  return (
    <div
      className="flex items-center gap-2"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
    >
      <span className="text-xs text-gray-400 dark:text-gray-500">Compartir</span>
      {buttons.map((btn) => (
        <button
          key={btn.label}
          title={btn.label}
          onClick={btn.onClick}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0 ${btn.className}`}
        >
          {btn.icon}
        </button>
      ))}
    </div>
  );
};

interface CardPostProps {
  categorySlug?: string;
  onTotalChange?: (total: number) => void;
  sortOrder?: 'asc' | 'desc';
}

export const CardPost = ({ categorySlug, onTotalChange, sortOrder = 'desc' }: CardPostProps = {}) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 6;

  useEffect(() => {
    setPage(1);
  }, [categorySlug, searchQuery, sortOrder]);

  useEffect(() => {
    fetchArticles(page);
  }, [page, categorySlug, searchQuery, sortOrder]);

  const fetchArticles = async (p: number) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ page: String(p), limit: String(limit) });
      if (categorySlug) params.append('category', categorySlug);
      if (searchQuery) params.append('q', searchQuery);
      if (sortOrder) params.append('sort', sortOrder);
      const res = await fetch(`${API_BASE}/articles?${params}`);
      const data = await res.json();
      const fetchedTotal = data.total || 0;
      setArticles(data.articles || []);
      setTotalPages(data.totalPages || 1);
      setTotal(fetchedTotal);
      onTotalChange?.(fetchedTotal);
    } catch {
      setArticles([]);
      onTotalChange?.(0);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' });

  const getCategoryName = (category: Article['category']) =>
    typeof category === 'object' && category !== null ? category.name : '';

  const getCategorySlug = (category: Article['category']) =>
    typeof category === 'object' && category !== null ? category.slug : '';

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="h-48 bg-gray-200 dark:bg-gray-700" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="px-8 py-16 text-center text-gray-500 dark:text-gray-400">
        No hay artículos publicados en esta categoría aún.
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8">
      {!onTotalChange && (
        <div className="flex items-center justify-between mb-5">
          {searchQuery && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {total} resultado{total !== 1 ? 's' : ''} para <strong className="text-gray-700 dark:text-gray-300">"{searchQuery}"</strong>
            </p>
          )}
          {!searchQuery && total > 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {total} artículo{total !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
        {articles.map((article) => {
          const catName = getCategoryName(article.category);
          const catSlug = getCategorySlug(article.category);

          return (
            <Link
              key={article._id}
              href={`/blog-de-tecnologia/${article.slug}`}
              className="group rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-md border border-slate-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
            >
              {/* Image */}
              <div className="overflow-hidden h-48 bg-gray-100 dark:bg-gray-700">
                <ArticleImage src={article.featuredImage} alt={article.title} />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1 bg-slate-50 dark:bg-gray-800">
                {/* Category + Date */}
                <div className="flex items-center justify-between mb-3">
                  {catName ? (
                    <span
                      onClick={(e) => { e.preventDefault(); window.location.href = `/blog-de-tecnologia/categoria/${catSlug}`; }}
                      className="text-xs font-semibold uppercase tracking-wider text-[#7b7db0] hover:text-[#5a5c8a] transition-colors cursor-pointer"
                    >
                      {catName}
                    </span>
                  ) : <span />}
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {formatDate(article.createdAt)}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-base font-bold leading-snug mb-2 group-hover:text-[#7b7db0] transition-colors line-clamp-2">
                  {article.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-gray-600 dark:text-gray-400 font-light line-clamp-3 flex-1">
                  {article.excerpt}
                </p>

                {/* Tags */}
                {article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {article.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Share + Leer más */}
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between gap-2">
                  <ShareButtons slug={article.slug} title={article.title} />
                  <span className="text-xs font-bold uppercase text-[#7b7db0] group-hover:text-[#5a5c8a] transition-colors shrink-0">
                    Leer más →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            ← Anterior
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-2 text-sm rounded-lg border transition ${
                page === p
                  ? 'bg-[#7b7db0] text-white border-[#7b7db0]'
                  : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
};

export default CardPost;
