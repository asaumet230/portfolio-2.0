type ArticleRevalidationPayload = {
  type: 'article';
  slug: string;
  oldSlug?: string;
  categorySlug?: string;
  oldCategorySlug?: string;
};

type CategoryRevalidationPayload = {
  type: 'category';
  slug: string;
  oldSlug?: string;
};

type ProjectRevalidationPayload = {
  type: 'project';
  slug: string;
  oldSlug?: string;
  category: 'web' | 'mobil';
  oldCategory?: 'web' | 'mobil';
  hasPrivacyPolicy?: boolean;
  hadPrivacyPolicy?: boolean;
  hasTermsOfService?: boolean;
  hadTermsOfService?: boolean;
};

type RobotsRevalidationPayload = {
  type: 'robots';
};

export type RevalidationPayload =
  | ArticleRevalidationPayload
  | CategoryRevalidationPayload
  | ProjectRevalidationPayload
  | RobotsRevalidationPayload;

export async function triggerRevalidation(payload: RevalidationPayload) {
  const response = await fetch('/api/revalidate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || 'Failed to revalidate content');
  }

  return response.json();
}
