"use client"

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/store';
import { toggleModal } from '@/store/searchModal/searchModalSlice';
import { IoIosSearch } from 'react-icons/io';

import styles from './ui.module.css';

const API_BASE = process.env.NEXT_PUBLIC_API_PATH || 'http://localhost:8080/api';

interface ArticleResult {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
}

interface StaticResult {
  name: string;
  description: string;
  url: string;
  icon?: string;
}

const TOOLS: StaticResult[] = [
  { name: 'Convertidor de imágenes', description: 'Convierte imágenes a diferentes formatos web', url: '/herramientas/convertidor-de-imagenes', icon: '🖼️' },
  { name: 'Comprimir imágenes gratis', description: 'Reduce el peso de tus imágenes sin perder calidad', url: '/herramientas/comprimir-imagenes-gratis', icon: '📦' },
  { name: 'Minúscula a Mayúscula', description: 'Convierte texto de minúsculas a mayúsculas', url: '/herramientas/minuscula-a-mayuscula', icon: '🔡' },
];

const PAGES: StaticResult[] = [
  { name: 'Inicio', description: 'Página principal del portafolio', url: '/' },
  { name: 'Proyectos Destacados', description: 'Proyectos de desarrollo web y móvil', url: '/proyectos-desarrollo-web-y-aplicaciones-moviles' },
  { name: 'Blog de Tecnología', description: 'Artículos sobre desarrollo web y móvil', url: '/blog-de-tecnologia' },
  { name: 'Herramientas', description: 'Herramientas gratuitas para desarrolladores', url: '/herramientas' },
  { name: 'Contáctame', description: 'Contacta a Andres Saumet para tu proyecto', url: '/contactame' },
  { name: 'Política de Privacidad', description: 'Política de privacidad y datos personales', url: '/politica-privacidad-y-proteccion-datos' },
  { name: 'Términos y Condiciones', description: 'Términos y condiciones de uso del sitio', url: '/terminos-y-condiciones' },
];

function filterStatic(list: StaticResult[], term: string): StaticResult[] {
  const lower = term.toLowerCase();
  return list.filter(
    (item) =>
      item.name.toLowerCase().includes(lower) ||
      item.description.toLowerCase().includes(lower)
  );
}

export const SearchModal = () => {
  const isModalOpen = useAppSelector((state) => state.modal.isModalOpen);
  const dispatch = useAppDispatch();

  const [term, setTerm] = useState('');
  const [articles, setArticles] = useState<ArticleResult[]>([]);
  const [tools, setTools] = useState<StaticResult[]>([]);
  const [pages, setPages] = useState<StaticResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      resetAll();
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch(toggleModal(false));
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [dispatch]);

  const resetAll = () => {
    setTerm('');
    setArticles([]);
    setTools([]);
    setPages([]);
    setHasSearched(false);
    setSearching(false);
  };

  const close = () => dispatch(toggleModal(false));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTerm(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!value.trim()) {
      setArticles([]);
      setTools([]);
      setPages([]);
      setHasSearched(false);
      setSearching(false);
      return;
    }

    setSearching(true);

    debounceRef.current = setTimeout(async () => {
      setTools(filterStatic(TOOLS, value.trim()));
      setPages(filterStatic(PAGES, value.trim()));

      try {
        const res = await fetch(`${API_BASE}/articles?q=${encodeURIComponent(value.trim())}&limit=5`);
        const data = await res.json();
        setArticles(data.articles || []);
      } catch {
        setArticles([]);
      } finally {
        setSearching(false);
        setHasSearched(true);
      }
    }, 350);
  };

  const totalResults = articles.length + tools.length + pages.length;
  const showEmpty = hasSearched && !searching && totalResults === 0;

  if (!isModalOpen) return null;

  return (
    <div
      className={`${styles['search-modal']} animate__animated animate__faster animate__fadeIn`}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div className="w-full max-w-2xl mx-auto px-4">

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-white text-lg font-bold">¿Qué estás buscando?</h2>
          <button
            onClick={close}
            className="text-white/70 hover:text-white text-sm font-medium transition-colors cursor-pointer"
          >
            Cerrar ✕
          </button>
        </div>

        {/* Input */}
        <div className="relative">
          <IoIosSearch size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={term}
            onChange={handleChange}
            placeholder="Busca artículos, herramientas, páginas..."
            className="w-full rounded-xl py-3.5 pl-11 pr-10 text-sm bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7b7db0] focus:border-[#7b7db0]"
          />
          {searching && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[#7b7db0] border-t-transparent animate-spin" />
          )}
        </div>

        {/* Results dropdown */}
        {term.trim() && (
          <div className="mt-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden max-h-[55vh] overflow-y-auto">

            {searching && (
              <div className="px-4 py-4 text-sm text-gray-400 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border-2 border-[#7b7db0] border-t-transparent animate-spin" />
                Buscando...
              </div>
            )}

            {showEmpty && (
              <div className="px-4 py-4 text-sm text-gray-400 dark:text-gray-500">
                Sin resultados para &ldquo;{term}&rdquo;
              </div>
            )}

            {/* Artículos */}
            {articles.length > 0 && (
              <div>
                <p className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  Artículos
                </p>
                <ul>
                  {articles.map((r, i) => (
                    <li key={r._id} className={i !== 0 ? 'border-t border-gray-100 dark:border-gray-700' : ''}>
                      <Link
                        href={`/blog-de-tecnologia/${r.slug}`}
                        onClick={close}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-[#7b7db0]/5 dark:hover:bg-[#7b7db0]/10 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-700 mt-0.5">
                          {r.featuredImage ? (
                            <Image src={r.featuredImage} alt={r.title} width={40} height={40} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#7b7db0]/50">
                              <IoIosSearch size={14} />
                            </div>
                          )}
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
              </div>
            )}

            {/* Herramientas */}
            {tools.length > 0 && (
              <div className={articles.length > 0 ? 'border-t border-gray-100 dark:border-gray-700' : ''}>
                <p className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  Herramientas
                </p>
                <ul>
                  {tools.map((t, i) => (
                    <li key={t.url} className={i !== 0 ? 'border-t border-gray-100 dark:border-gray-700' : ''}>
                      <Link
                        href={t.url}
                        onClick={close}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-[#7b7db0]/5 dark:hover:bg-[#7b7db0]/10 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#7b7db0]/10 flex items-center justify-center text-lg shrink-0">
                          {t.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-[#7b7db0] line-clamp-1 transition-colors">
                            {t.name}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                            {t.description}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Páginas */}
            {pages.length > 0 && (
              <div className={(articles.length > 0 || tools.length > 0) ? 'border-t border-gray-100 dark:border-gray-700' : ''}>
                <p className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  Páginas
                </p>
                <ul>
                  {pages.map((p, i) => (
                    <li key={p.url} className={i !== 0 ? 'border-t border-gray-100 dark:border-gray-700' : ''}>
                      <Link
                        href={p.url}
                        onClick={close}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-[#7b7db0]/5 dark:hover:bg-[#7b7db0]/10 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0 text-base">
                          📄
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-[#7b7db0] line-clamp-1 transition-colors">
                            {p.name}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                            {p.description}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
