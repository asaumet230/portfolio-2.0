

import { lato, leagueOfSpartan } from "@/fonts";

import { Providers } from "@/store/Porviders";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import "./globals.css";


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="es">
      <body className={`${lato.variable} ${leagueOfSpartan.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
