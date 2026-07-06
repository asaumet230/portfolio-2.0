'use client';

import { useEffect, useState } from 'react';

import { AdsenseSlot } from './AdsenseSlot';

interface AdsenseLeaderboardProps {
  clientId: string;
  slot: string;
}

// Banner horizontal de tamaño fijo: 728x90 en desktop, 320x100 en móvil.
// Mide el viewport una sola vez al montar y renderiza UN solo <ins> del
// tamaño correcto — ocultar el otro con CSS generaría impresiones inválidas
// para AdSense. Altura fija = cero CLS.
export function AdsenseLeaderboard({ clientId, slot }: AdsenseLeaderboardProps) {
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    setSize(
      window.innerWidth >= 1024
        ? { width: 728, height: 90 }
        : { width: 320, height: 100 }
    );
  }, []);

  if (!size) return null;

  return (
    <div className="text-center">
      <AdsenseSlot
        clientId={clientId}
        slot={slot}
        style={{ display: 'inline-block', width: size.width, height: size.height }}
        format=""
      />
    </div>
  );
}

export default AdsenseLeaderboard;
