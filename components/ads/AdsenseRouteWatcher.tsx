'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// Páginas excluidas de anuncios automáticos (deben coincidir con la
// configuración de exclusión en el panel de AdSense).
const EXCLUDED_EXACT = new Set([
  '/',
  '/contactame',
  '/politica-privacidad-y-proteccion-datos',
  '/proyectos-desarrollo-web-y-aplicaciones-moviles',
  '/terminos-y-condiciones',
]);

const EXCLUDED_PREFIXES = ['/dashboard', '/proyectos/'];

function isExcludedFromAds(pathname: string): boolean {
  if (EXCLUDED_EXACT.has(pathname)) return true;
  return EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

// En navegación SPA, AdSense no re-evalúa la página en cada cambio de ruta.
// Este componente corrige dos problemas:
//   1. Auto-ads inyectados por AdSense persisten en el DOM al navegar a páginas
//      excluidas → los eliminamos manualmente.
//   2. Los slots manuales (AdsenseSlot) tienen su propio mecanismo de remount
//      vía key; este componente solo gestiona los auto-ads del layout.
export function AdsenseRouteWatcher() {
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);

  useEffect(() => {
    // Ignorar el primer render: AdSense maneja la carga inicial de forma nativa.
    if (prevPathname.current === null) {
      prevPathname.current = pathname;
      return;
    }

    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;

    if (isExcludedFromAds(pathname)) {
      // Eliminar todos los elementos <ins> que AdSense haya inyectado
      // fuera del árbol de React (p.ej. en el layout persistente).
      // Los slots manuales (AdsenseSlot) ya son desmontados por React al
      // cambiar de página, por lo que aquí solo quedan los auto-ads.
      document.querySelectorAll<HTMLElement>('ins.adsbygoogle').forEach((el) => {
        el.remove();
      });
    }
  }, [pathname]);

  return null;
}

export default AdsenseRouteWatcher;
