import type { Metadata } from "next";

import { Navbar } from "@/components";
import { lato, leagueOfSpartan } from "@/fonts";

import "./globals.css";
// import Cursor from "@/components/ui/Cursor";


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
          {/* <Cursor /> */}
          {children}
        </div>
      </body>
    </html>
  );
}
