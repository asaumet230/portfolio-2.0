import { lato, leagueOfSpartan } from "@/fonts";

import { Providers } from "@/store/Porviders";

import { GoogleTagManagerBody, GoogleTagManagerHead } from "@/components";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import "./globals.css";

const googleTagManagerId = 'GTM-WP7JP549'

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
