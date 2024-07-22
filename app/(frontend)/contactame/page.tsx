import { Metadata } from "next";
import { ContactSection } from "@/components";


export const metadata: Metadata = {
  title: "Contáctame | Andres Felipe Saumet Desarrollo Web y Móvil",
  description: "Ponte en contacto con Andrés Felipe Saumet para consultas, cotizaciones y colaboraciones.",
  keywords: "contacto, Andres Felipe Saumet, desarrollo web, desarrollo móvil",
  robots: "index, follow",
  openGraph: {
    title: "Contáctame | Andres Felipe Saumet Desarrollo Web y Móvil",
    description: "Ponte en contacto con Andrés Felipe Saumet para consultas, cotizaciones y colaboraciones.",
    url: "https://www.andressaumet.com/contactame",
    type: "website",
    images: [
      {
        url: "https://www.andressaumet.com/_next/image?url=%2Fimages%2Fandres-saumet-dark.webp&w=1200&q=75",
        width: 800,
        height: 600,
        alt: "Contáctame | Andres Felipe Saumet Desarrollo Web y Móvil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contáctame | Andres Felipe Saumet Desarrollo Web y Móvil",
    description: "Ponte en contacto con Andrés Felipe Saumet para consultas, cotizaciones y colaboraciones.",
    images: [
      {
        url: "https://www.andressaumet.com/_next/image?url=%2Fimages%2Fandres-saumet-dark.webp&w=1200&q=75",
        alt: "Contáctame | Andres Felipe Saumet Desarrollo Web y Móvil",
      },
    ],
  },
};

export default async function ContactPage() {
  return (
    <div className="bg-slate-200 py-20 dark:bg-[#0d1117]">
      <ContactSection />
    </div>
  );
}
