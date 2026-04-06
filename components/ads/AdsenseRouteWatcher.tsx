'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Debe coincidir exactamente con las exclusiones configuradas en AdSense.
const EXCLUDED_EXACT = new Set([
  '/',
  '/contactame',
  '/politica-privacidad-y-proteccion-datos',
  '/proyectos-desarrollo-web-y-aplicaciones-moviles',
  '/terminos-y-condiciones',
]);

const EXCLUDED_PREFIXES = ['/dashboard', '/proyectos/'];

function isExcludedFromAds(p: string): boolean {
  if (EXCLUDED_EXACT.has(p)) return true;
  return EXCLUDED_PREFIXES.some((prefix) => p.startsWith(prefix));
}

// Extrae solo el pathname de un href (strip query string y hash).
function extractPathname(href: string): string | null {
  if (!href) return null;
  if (href.startsWith('/')) return href.split('?')[0].split('#')[0];
  try {
    const url = new URL(href, window.location.origin);
    if (url.origin === window.location.origin) return url.pathname;
  } catch {}
  return null;
}

// Por qué este enfoque:
// AdSense evalúa si una página está excluida UNA SOLA VEZ al cargar su script.
// En navegación SPA ese estado no se resetea, por eso:
//   - los ads persisten al navegar a páginas excluidas
//   - los ads no aparecen al navegar a páginas incluidas desde una excluida
//
// La única solución confiable es forzar un reload completo del browser cuando
// se cruza la frontera entre zonas. AdSense re-inicializa desde cero y evalúa
// la URL correctamente.
//
// Implementación: escucha clics en fase de CAPTURA (antes que Next.js Link,
// que escucha en burbuja). Si el destino cruza la frontera de ads,
// llamamos e.preventDefault() — Next.js ve defaultPrevented=true y cancela
// su navegación SPA — y luego usamos window.location.href para la recarga.
//
// Navegaciones dentro de la misma zona (artículo→artículo, inicio→contacto)
// siguen siendo SPA normales sin ningún impacto.
export function AdsenseRouteWatcher() {
  const pathname = usePathname();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Ignorar clics modificados (abrir en nueva pestaña, etc.)
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as Element).closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;

      // Ignorar enlaces externos, nuevas pestañas y descargas
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return;

      const href = anchor.getAttribute('href') ?? '';
      const targetPathname = extractPathname(href);
      if (!targetPathname) return;

      const currentExcluded = isExcludedFromAds(pathname);
      const targetExcluded = isExcludedFromAds(targetPathname);

      // Solo forzar reload cuando se cruza la frontera de ads
      if (currentExcluded !== targetExcluded) {
        e.preventDefault(); // Next.js Link verá defaultPrevented=true y no navegará en SPA
        window.location.href = href;
      }
    };

    // Fase de captura = se ejecuta ANTES que el handler de Next.js Link
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [pathname]);

  // Fallback: si se llega a una página excluida vía back/forward del navegador
  // (no interceptado por el click handler), limpiar los auto-ads del DOM.
  useEffect(() => {
    if (isExcludedFromAds(pathname)) {
      document.querySelectorAll<HTMLElement>('ins.adsbygoogle').forEach((el) => el.remove());
    }
  }, [pathname]);

  return null;
}

export default AdsenseRouteWatcher;
