import { getMonetizationSettings } from '@/api/monetization';

const defaultAdsTxt = '';

export async function GET() {
  const settings = await getMonetizationSettings();
  const content = settings.adsTxtContent?.trim() || defaultAdsTxt;

  return new Response(`${content}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
