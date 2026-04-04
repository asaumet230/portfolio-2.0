'use client';

import { CSSProperties, useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdsenseSlotProps {
  clientId: string;
  slot: string;
  className?: string;
  style?: CSSProperties;
  format?: 'auto' | 'fluid' | string;
  layoutKey?: string;
  fullWidthResponsive?: boolean;
  label?: string;
}

export function AdsenseSlot({
  clientId,
  slot,
  className = '',
  style,
  format = 'auto',
  layoutKey,
  fullWidthResponsive = true,
  label = 'Publicidad',
}: AdsenseSlotProps) {
  useEffect(() => {
    if (!clientId || !slot) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {}
  }, [clientId, slot]);

  if (!clientId || !slot) return null;

  return (
    <div className={`my-8 ${className}`}>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
        {label}
      </p>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout-key={layoutKey}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  );
}

export default AdsenseSlot;
