import { getMonetizationSettings } from '@/api/monetization';
import { AdsenseScript } from '@/components/ads';
import FrontendShell from '@/components/layouts/FrontendShell';

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const monetization = await getMonetizationSettings();

  return (
    <>
      {monetization.enabled && <AdsenseScript clientId={monetization.clientId} />}
      <FrontendShell>{children}</FrontendShell>
    </>
  );
}
