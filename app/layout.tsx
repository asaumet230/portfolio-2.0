import type { Metadata } from "next";

import { NavBar, NavbarLogo } from "@/components";
import { navbarLinks } from "@/helpers";
import { lato, monserrat } from "@/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Ingeniero de Software | Andres Saumet",
  description: "Desarrollador Fullstack Web y Móvil. Descubre soluciones que impulsaran el éxito de tu negocio",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="es">
      <body className={`${ lato.variable } ${ monserrat.variable }`}>
        <div className="section-background">
          <header className="flex justify-between items-center container p-4">
            <NavbarLogo />
            <NavBar navbarLinks={navbarLinks} />
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
