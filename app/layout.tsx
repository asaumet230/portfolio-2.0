import type { Metadata } from "next";

import { lato, monserrat } from "@/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="es">
      <body className={`${ lato.variable } ${ monserrat.variable }`}>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
