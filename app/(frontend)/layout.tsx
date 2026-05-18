import { getMonetizationSettings } from '@/api/monetization';
import { AdsenseScript, AdsenseRouteWatcher } from '@/components/ads';
import FrontendShell from '@/components/layouts/FrontendShell';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Andres Saumet Software Developer',
  telephone: '+573017826682',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle 26 # 2A - 36',
    addressLocality: 'Santa Marta',
    addressRegion: 'Magdalena',
    addressCountry: 'CO',
  },
  url: 'https://www.andressaumet.com',
  hasMap: 'https://maps.app.goo.gl/K9cTSD5XAx21f6qB7',
};

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const monetization = await getMonetizationSettings();

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {monetization.enabled && <AdsenseScript clientId={monetization.clientId} />}
      {monetization.enabled && <AdsenseRouteWatcher />}
      <FrontendShell>{children}</FrontendShell>
    </>
  );
}
