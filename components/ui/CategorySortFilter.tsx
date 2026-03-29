'use client';

import { useState, Suspense } from 'react';
import { CardPost } from '@/components';

interface CategorySortFilterProps {
  categorySlug: string;
  initialArticles?: {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    featuredImage: string;
    category: { _id: string; name: string; slug: string } | string;
    tags: string[];
    published: boolean;
    createdAt: string;
  }[];
  initialTotal?: number;
  initialTotalPages?: number;
}

export const CategorySortFilter = ({
  categorySlug,
  initialArticles = [],
  initialTotal = 0,
  initialTotalPages = 1,
}: CategorySortFilterProps) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [total, setTotal] = useState<number | null>(initialTotal);

  return (
    <div>
      {/* Count + sort row */}
      <div className="flex items-center justify-between mb-5 px-4 md:px-8">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {total !== null && total > 0 && (
            <>
              <span className="text-[#7b7db0] font-bold text-base">{total}</span>
              {' '}artículo{total !== 1 ? 's' : ''}
            </>
          )}
        </p>

        <select
          value={sortOrder}
          onChange={(e) => { setSortOrder(e.target.value as 'asc' | 'desc'); setTotal(null); }}
          className="h-10 pl-3 pr-8 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7b7db0] focus:border-[#7b7db0] cursor-pointer"
        >
          <option value="desc">Más nuevo primero</option>
          <option value="asc">Más antiguo primero</option>
        </select>
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
          categorySlug={categorySlug}
          sortOrder={sortOrder}
          onTotalChange={setTotal}
          initialArticles={initialArticles}
          initialTotal={initialTotal}
          initialTotalPages={initialTotalPages}
          initialSortOrder="desc"
        />
      </Suspense>
    </div>
  );
};

export default CategorySortFilter;
