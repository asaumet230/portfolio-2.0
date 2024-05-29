import type { Metadata } from "next";

import { Footer, Navbar, SocialShareSidebar } from "@/components";
import { lato, leagueOfSpartan } from "@/fonts";

import "./globals.css";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


export const metadata: Metadata = {
  title: "Desarrollador Web & Movíl | Andres Felipe Saumet",
  description: "Desarrollo magnificas aplicaciones",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="es">
      <body className={`${ lato.variable } ${ leagueOfSpartan.variable }`}>
        <div>
          <Navbar />
          <SocialShareSidebar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
