'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

const ImagePlaceholder = () => (
  <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-600">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  </div>
);

function Thumb({ src, alt, size }: { src: string; alt: string; size: number }) {
  const [error, setError] = useState(false);
  if (!src || error) return <ImagePlaceholder />;
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="w-full h-full object-cover"
      onError={() => setError(true)}
    />
  );
}

const API_BASE = process.env.NEXT_PUBLIC_API_PATH || 'http://localhost:8080/api';

interface Category {
  _id: string;
  name: string;
  slug: string;
  articleCount?: number;
}

interface RecentArticle {
  _id: string;
  title: string;
  slug: string;
  featuredImage: string;
  createdAt: string;
}

interface SearchResult {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
}

export const PostSideBar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [recent, setRecent] = useState<RecentArticle[]>([]);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/article-categories`)
      .then((r) => r.json())
      .then((d) => setCategories(d.categories || []))
      .catch(() => {});

    fetch(`${API_BASE}/articles?page=1&limit=4`)
      .then((r) => r.json())
      .then((d) => setRecent(d.articles || []))
      .catch(() => {});
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearch(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!value.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setSearching(true);
    setShowDropdown(true);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`${API_BASE}/articles?q=${encodeURIComponent(value.trim())}&limit=5`);
        const data = await res.json();
        setResults(data.articles || []);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 350);
  };

  const handleResultClick = () => {
    setSearch('');
    setResults([]);
    setShowDropdown(false);
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' });

  return (
    <aside className="w-72 max-[920px]:w-full max-[920px]:mt-10 shrink-0 space-y-5">

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
          Buscar
        </h3>
        <div ref={searchRef} className="relative">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <IoIosSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Busca un artículo..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => search.trim() && setShowDropdown(true)}
                className="w-full rounded-lg py-2.5 pl-9 pr-4 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7b7db0] focus:border-[#7b7db0]"
              />
            </div>
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl z-50 overflow-hidden">
              {searching ? (
                <div className="px-4 py-3 text-sm text-gray-400 dark:text-gray-500 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full border-2 border-[#7b7db0] border-t-transparent animate-spin" />
                  Buscando...
                </div>
              ) : results.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-400 dark:text-gray-500">
                  Sin resultados para &ldquo;{search}&rdquo;
                </div>
              ) : (
                <ul>
                  {results.map((r, i) => (
                    <li key={r._id} className={i !== 0 ? 'border-t border-gray-100 dark:border-gray-700' : ''}>
                      <Link
                        href={`/blog-de-tecnologia/${r.slug}`}
                        onClick={handleResultClick}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-[#7b7db0]/5 dark:hover:bg-[#7b7db0]/10 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-700 mt-0.5">
                          <Thumb src={r.featuredImage} alt={r.title} size={40} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-[#7b7db0] line-clamp-1 transition-colors">
                            {r.title}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-1 mt-0.5">
                            {r.excerpt}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">
          Categorías
        </h3>
        {categories.length === 0 ? (
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <ul className="space-y-0.5">
            {categories.map((cat) => (
              <li key={cat._id}>
                <Link
                  href={`/blog-de-tecnologia/categoria/${cat.slug}`}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-[#7b7db0]/10 hover:text-[#7b7db0] dark:hover:text-[#9b9dd0] transition-colors group cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7b7db0]/50 group-hover:bg-[#7b7db0] transition-colors shrink-0" />
                    <span className="group-hover:translate-x-0.5 transition-transform">{cat.name}</span>
                  </span>
                  {cat.articleCount !== undefined && (
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full shrink-0">
                      {cat.articleCount}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Recent Articles */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
          Últimos Artículos
        </h3>
        {recent.length === 0 ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-full" />
                  <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-4">
            {recent.map((article) => (
              <li key={article._id} className='cursor-pointer'>
                <Link
                  href={`/blog-de-tecnologia/${article.slug}`}
                  className="flex gap-3 group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-700">
                    <Thumb src={article.featuredImage} alt={article.title} size={56} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#7b7db0] transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {formatDate(article.createdAt)}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

    </aside>
  );
};

export default PostSideBar;
