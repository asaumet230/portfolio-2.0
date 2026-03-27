'use client';

import { useState, useEffect, Suspense } from 'react';
import { CardPost } from '@/components';

const API_BASE = process.env.NEXT_PUBLIC_API_PATH || 'http://localhost:8080/api';

interface Category {
  _id: string;
  name: string;
  slug: string;
}

export const BlogCategoryFilter = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loadingCats, setLoadingCats] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/article-categories`)
      .then((r) => r.json())
      .then((d) => setCategories(d.categories || []))
      .catch(() => {})
      .finally(() => setLoadingCats(false));
  }, []);

  const handleSelect = (slug: string) => {
    setSelected((prev) => (prev === slug ? null : slug));
  };

  const pillBase =
    'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer';
  const pillActive = 'bg-[#7b7db0] text-white shadow-sm';
  const pillInactive =
    'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-[#7b7db0]/10 hover:text-[#7b7db0] dark:hover:text-[#9b9dd0]';

  return (
    <div>
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-6 px-4 md:px-8">
        <button
          onClick={() => setSelected(null)}
          className={`${pillBase} ${selected === null ? pillActive : pillInactive}`}
        >
          Todos
        </button>

        {loadingCats
          ? [1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-8 w-28 bg-gray-100 dark:bg-gray-700 rounded-full animate-pulse"
              />
            ))
          : categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => handleSelect(cat.slug)}
                className={`${pillBase} ${selected === cat.slug ? pillActive : pillInactive}`}
              >
                {cat.name}
              </button>
            ))}
      </div>

      {/* Articles grid filtered by selected category */}
      <Suspense
        fallback={
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-100 dark:bg-gray-800 rounded-xl" />
            ))}
          </div>
        }
      >
        <CardPost categorySlug={selected ?? undefined} />
      </Suspense>
    </div>
  );
};

export default BlogCategoryFilter;
