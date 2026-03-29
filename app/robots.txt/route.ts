const API_BASE = process.env.NEXT_PUBLIC_API_PATH || 'http://localhost:8080/api';
const SITE_URL = 'https://www.andressaumet.com';

const DEFAULT_ROBOTS = `User-agent: *
Allow: /

Host: ${SITE_URL}
Sitemap: ${SITE_URL}/sitemap.xml`;

async function getRobotsContent(): Promise<string> {
  try {
    const res = await fetch(`${API_BASE}/seo/pages/robots-txt`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) return DEFAULT_ROBOTS;

    const data = await res.json();
    const content = data?.page?.robotsTxtContent;

    return typeof content === 'string' && content.trim() ? content.trim() : DEFAULT_ROBOTS;
  } catch {
    return DEFAULT_ROBOTS;
  }
}

export async function GET() {
  const content = await getRobotsContent();

  return new Response(`${content}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
