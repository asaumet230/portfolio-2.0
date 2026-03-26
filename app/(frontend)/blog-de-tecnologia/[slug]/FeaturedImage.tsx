'use client';

import { useState } from 'react';
import Image from 'next/image';

const Placeholder = () => (
  <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-gray-300 dark:text-gray-600">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <span className="text-sm font-medium">Sin imagen destacada</span>
  </div>
);

export function FeaturedImage({ src, alt }: { src?: string; alt: string }) {
  const [error, setError] = useState(false);

  return (
    <div className="w-full h-52 sm:h-64 md:h-80 overflow-hidden bg-gray-100 dark:bg-gray-700">
      {src && !error ? (
        <Image
          src={src}
          alt={alt}
          width={900}
          height={500}
          className="w-full h-full object-cover"
          priority
          onError={() => setError(true)}
        />
      ) : (
        <Placeholder />
      )}
    </div>
  );
}
