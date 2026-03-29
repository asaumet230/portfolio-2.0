'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store';

const COOKIE_CONSENT_KEY = 'cookieConsentAccepted';

export function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [accepted, setAccepted] = useState(true);
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  useEffect(() => {
    setMounted(true);
    const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    setAccepted(storedConsent === 'true');
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    setAccepted(true);
  };

  if (!mounted || accepted) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-4xl">
      <div className={`overflow-hidden rounded-[28px] border backdrop-blur-xl ${
        darkMode
          ? 'border-slate-600/80 bg-[#111827]/96 shadow-[0_24px_80px_rgba(0,0,0,0.45)]'
          : 'border-slate-200/80 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.18)]'
      }`}>
        <div className={`absolute inset-0 ${
          darkMode
            ? 'bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.16),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(123,125,176,0.12),_transparent_32%)]'
            : 'bg-[radial-gradient(circle_at_top_left,_rgba(123,125,176,0.14),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.16),_transparent_35%)]'
        }`} />
        <div className="relative flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between md:p-6">
          <div className="flex gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
              darkMode
                ? 'bg-indigo-500/20 text-indigo-200'
                : 'bg-[#7b7db0]/12 text-[#7b7db0]'
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1.12 5.22a1.25 1.25 0 1 1-1.768 1.768 1.25 1.25 0 0 1 1.768-1.768ZM8.75 14.5a1.75 1.75 0 1 1 1.75-1.75 1.75 1.75 0 0 1-1.75 1.75Zm5.25 2a2.25 2.25 0 1 1 2.25-2.25A2.252 2.252 0 0 1 14 16.5Zm2.25-6a1.5 1.5 0 1 1 1.5-1.5 1.502 1.502 0 0 1-1.5 1.5Z" />
              </svg>
            </div>

            <div className="space-y-2">
              <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                darkMode
                  ? 'border-indigo-300/25 bg-indigo-400/15 text-indigo-100'
                  : 'border-[#7b7db0]/20 bg-[#7b7db0]/10 text-[#686a9b]'
              }`}>
                Privacidad
              </span>
              <p className={`text-base font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Este sitio utiliza cookies
              </p>
              <p className={`max-w-2xl text-sm leading-6 ${darkMode ? 'text-slate-200' : 'text-gray-600'}`}>
            Uso cookies para mejorar la experiencia, analizar el tráfico y optimizar el sitio.
            Puedes leer más en{' '}
            <Link
              href="/politica-privacidad-y-proteccion-datos"
              className={`font-semibold underline underline-offset-4 transition ${
                darkMode
                  ? 'text-indigo-200 decoration-indigo-200/40 hover:text-white'
                  : 'text-[#686a9b] decoration-[#7b7db0]/30 hover:text-[#4f5177]'
              }`}
            >
              política de privacidad
            </Link>{' '}
            y{' '}
            <Link
              href="/terminos-y-condiciones"
              className={`font-semibold underline underline-offset-4 transition ${
                darkMode
                  ? 'text-indigo-200 decoration-indigo-200/40 hover:text-white'
                  : 'text-[#686a9b] decoration-[#7b7db0]/30 hover:text-[#4f5177]'
              }`}
            >
              términos y condiciones
            </Link>.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end md:justify-center">
            <button
              type="button"
              onClick={handleAccept}
              className={`inline-flex min-w-[140px] items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 ${
                darkMode
                  ? 'bg-indigo-500 shadow-[0_14px_34px_rgba(99,102,241,0.35)] hover:bg-indigo-400 hover:shadow-[0_18px_42px_rgba(99,102,241,0.45)]'
                  : 'bg-[#7b7db0] shadow-[0_10px_30px_rgba(123,125,176,0.35)] hover:bg-[#686a9b] hover:shadow-[0_16px_38px_rgba(104,106,155,0.4)]'
              }`}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;
