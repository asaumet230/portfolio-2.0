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
  const [selected, setSelected] = useState<string>('');
  const [loadingCats, setLoadingCats] = useState(true);
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/article-categories`)
      .then((r) => r.json())
      .then((d) => setCategories(d.categories || []))
      .catch(() => {})
      .finally(() => setLoadingCats(false));
  }, []);

  return (
    <div>
      {/* Count + select row */}
      <div className="flex items-center justify-between mb-5 px-4 md:px-8">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {total !== null && total > 0 && (
            <>
              <span className="text-[#7b7db0] font-bold text-base">{total}</span>
              {' '}artículo{total !== 1 ? 's' : ''}
            </>
          )}
        </p>

        {loadingCats ? (
          <div className="h-10 w-48 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse" />
        ) : (
          <select
            value={selected}
            onChange={(e) => { setSelected(e.target.value); setTotal(null); }}
            className="h-10 pl-3 pr-8 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7b7db0] focus:border-[#7b7db0] cursor-pointer"
          >
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Articles grid */}
      <Suspense
        fallback={
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-100 dark:bg-gray-800 rounded-xl" />
            ))}
          </div>
        }
      >
        <CardPost
          categorySlug={selected || undefined}
          onTotalChange={setTotal}
        />
      </Suspense>
    </div>
  );
};

export default BlogCategoryFilter;
