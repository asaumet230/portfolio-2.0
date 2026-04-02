import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { RevalidationPayload } from '@/helpers/revalidation';

const addProjectLegalPaths = (
  paths: Set<string>,
  slug: string,
  category: 'web' | 'mobil',
  hasPrivacyPolicy?: boolean,
  hasTermsOfService?: boolean
) => {
  if (hasPrivacyPolicy) {
    paths.add(`/proyectos/${slug}/privacy-policy`);
  }

  if (hasTermsOfService) {
    paths.add(`/proyectos/${slug}/terms-of-service`);
  }

  if (category === 'mobil') {
    paths.add(`/proyectos/${slug}/delete-account`);
  }
};

const addSharedSitemapPaths = (paths: Set<string>, specificSitemap: string) => {
  paths.add('/sitemap.xml');
  paths.add('/sitemap-index.xml');
  paths.add(specificSitemap);
};

const getPathsToRevalidate = (payload: RevalidationPayload) => {
  const paths = new Set<string>();

  switch (payload.type) {
    case 'article':
      paths.add('/blog-de-tecnologia');
      paths.add(`/blog-de-tecnologia/${payload.slug}`);
      if (payload.oldSlug && payload.oldSlug !== payload.slug) {
        paths.add(`/blog-de-tecnologia/${payload.oldSlug}`);
      }
      if (payload.categorySlug) {
        paths.add(`/blog-de-tecnologia/categoria/${payload.categorySlug}`);
      }
      if (payload.oldCategorySlug && payload.oldCategorySlug !== payload.categorySlug) {
        paths.add(`/blog-de-tecnologia/categoria/${payload.oldCategorySlug}`);
      }
      addSharedSitemapPaths(paths, '/sitemap-articulos.xml');
      break;

    case 'category':
      paths.add('/blog-de-tecnologia');
      paths.add(`/blog-de-tecnologia/categoria/${payload.slug}`);
      if (payload.oldSlug && payload.oldSlug !== payload.slug) {
        paths.add(`/blog-de-tecnologia/categoria/${payload.oldSlug}`);
      }
      addSharedSitemapPaths(paths, '/sitemap-categorias.xml');
      break;

    case 'project':
      paths.add('/proyectos-desarrollo-web-y-aplicaciones-moviles');
      paths.add(`/proyectos/${payload.slug}`);
      addProjectLegalPaths(paths, payload.slug, payload.category, payload.hasPrivacyPolicy, payload.hasTermsOfService);

      if (payload.oldSlug && payload.oldSlug !== payload.slug) {
        paths.add(`/proyectos/${payload.oldSlug}`);
        addProjectLegalPaths(
          paths,
          payload.oldSlug,
          payload.oldCategory || payload.category,
          payload.hadPrivacyPolicy,
          payload.hadTermsOfService
        );
      }

      addSharedSitemapPaths(paths, '/sitemap-proyectos.xml');
      break;

    case 'robots':
      paths.add('/robots.txt');
      break;
  }

  return paths;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as RevalidationPayload;
    const paths = getPathsToRevalidate(payload);

    paths.forEach((path) => revalidatePath(path));

    return NextResponse.json({
      revalidated: true,
      paths: Array.from(paths),
    });
  } catch (error) {
    return NextResponse.json(
      {
        revalidated: false,
        message: error instanceof Error ? error.message : 'Failed to revalidate content',
      },
      { status: 500 }
    );
  }
}
