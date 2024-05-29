import type { Metadata } from "next";

import { Navbar, SocialShareSidebar } from "@/components";
import { lato, leagueOfSpartan } from "@/fonts";

import "./globals.css";


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
        </div>
      </body>
    </html>
  );
}
