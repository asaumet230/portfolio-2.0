'use client';

import { useState, useEffect, Suspense } from 'react';
import { CardPost } from '@/components';

const API_BASE = process.env.NEXT_PUBLIC_API_PATH || 'http://localhost:8080/api';

interface Category {
  _id: string;
  name: string;
  slug: string;
}

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

interface BlogCategoryFilterProps {
  initialCategories?: Category[];
  initialArticles?: Article[];
  initialTotal?: number;
  initialTotalPages?: number;
  initialQuery?: string;
}

export const BlogCategoryFilter = ({
  initialCategories = [],
  initialArticles = [],
  initialTotal = 0,
  initialTotalPages = 1,
  initialQuery = '',
}: BlogCategoryFilterProps) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [selected, setSelected] = useState<string>('');
  const [loadingCats, setLoadingCats] = useState(initialCategories.length === 0);
  const [total, setTotal] = useState<number | null>(initialTotal);
  const shouldFetchCategories = initialCategories.length === 0;

  useEffect(() => {
    if (shouldFetchCategories) {
      fetch(`${API_BASE}/article-categories`)
        .then((r) => r.json())
        .then((d) => setCategories(d.categories || []))
        .catch(() => {})
        .finally(() => setLoadingCats(false));
    }
  }, [shouldFetchCategories]);

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
          initialArticles={initialArticles}
          initialTotal={initialTotal}
          initialTotalPages={initialTotalPages}
          initialQuery={initialQuery}
        />
      </Suspense>
    </div>
  );
};

export default BlogCategoryFilter;
