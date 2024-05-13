import type { Metadata } from "next";

import { Navbar } from "@/components/menus";
import { lato, leagueOfSpartan } from "@/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="es">
      <body className={`${ lato.variable } ${ leagueOfSpartan.variable }`}>
        <div>
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
