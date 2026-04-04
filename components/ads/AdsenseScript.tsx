import Script from 'next/script';

interface AdsenseScriptProps {
  clientId: string;
}

export function AdsenseScript({ clientId }: AdsenseScriptProps) {
  if (!clientId) return null;

  return (
    <Script
      id="adsense-script"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
    />
  );
}

export default AdsenseScript;
