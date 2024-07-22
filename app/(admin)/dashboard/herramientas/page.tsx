import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Herramientas",
  description: "Herramientas Sección de administración del sitio web",
  keywords: "dashboard, administración",
  robots: "noindex, nofollow",
  openGraph: {
      title: "Dashboard",
      description: "Sección de administración del sitio web",
      url: "https://www.andressaumet.com/dashboard",
      type: "website",
      images: [
          {
              url: "https://www.andressaumet.com/_next/image?url=%2Fimages%2Fandres-saumet-dark.webp&w=1200&q=75",
              width: 800,
              height: 600,
              alt: "Dashboard",
          },
      ],
  },
  twitter: {
      card: "summary_large_image",
      title: "Dashboard",
      description: "Sección de administración del sitio web",
      images: [
          {
              url: "https://www.andressaumet.com/_next/image?url=%2Fimages%2Fandres-saumet-dark.webp&w=1200&q=75",
              alt: "Dashboard",
          },
      ],
  },
};

export default function HerramientasPage() {
  return (
    <div>
      <h1>Herramientas</h1>
    </div>
  );
}