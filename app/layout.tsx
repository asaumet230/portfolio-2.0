import { lato, leagueOfSpartan } from "@/fonts";
import type { Metadata } from "next";

import { Providers } from "@/store/Porviders";

import { GoogleTagManagerBody, GoogleTagManagerHead } from "@/components";

import "./globals.css";

const googleTagManagerId = 'GTM-WP7JP549';

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/images/favicon.png', type: 'image/png' },
    ],
    shortcut: ['/images/favicon.png'],
    apple: [{ url: '/images/favicon.png' }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="es">
      <head>
        <GoogleTagManagerHead gtmId={googleTagManagerId} />
      </head>
      <body className={`${lato.variable} ${leagueOfSpartan.variable}`}>
        <GoogleTagManagerBody gtmId={googleTagManagerId} />

        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
