'use client';

import { CSSProperties, useEffect } from 'react';
import { usePathname } from 'next/navigation';

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

interface InsElementProps {
  clientId: string;
  slot: string;
  style?: CSSProperties;
  format?: string;
  layoutKey?: string;
  fullWidthResponsive?: boolean;
}

// Componente interno aislado: cuando recibe un nuevo `key` React lo desmonta y
// vuelve a montar completamente, creando un <ins> limpio sin el atributo
// data-adsbygoogle-status="done" que bloquearía la re-inicialización del slot.
function InsElement({ clientId, slot, style, format = 'auto', layoutKey, fullWidthResponsive = true }: InsElementProps) {
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {}
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', ...style }}
      data-ad-client={clientId}
      data-ad-slot={slot}
      // Unidades de tamaño fijo: sin data-ad-format ni full-width-responsive,
      // de lo contrario Google sirve responsive e ignora el width/height del style
      data-ad-format={format || undefined}
      data-ad-layout-key={layoutKey}
      data-full-width-responsive={format ? (fullWidthResponsive ? 'true' : 'false') : undefined}
    />
  );
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
  const pathname = usePathname();

  if (!clientId || !slot) return null;

  return (
    <div className={`my-8 ${className}`}>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
        {label}
      </p>
      <InsElement
        key={`${pathname}-${slot}`}
        clientId={clientId}
        slot={slot}
        style={style}
        format={format}
        layoutKey={layoutKey}
        fullWidthResponsive={fullWidthResponsive}
      />
    </div>
  );
}

export default AdsenseSlot;
