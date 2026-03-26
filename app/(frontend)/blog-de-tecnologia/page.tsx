import { Metadata } from "next";
import { CardPost, PostSideBar } from "@/components";

export const metadata: Metadata = {
  title: "Blog de Tecnología y Programación | Andres Saumet",
  description: "Blog de tecnología de Andres Saumet: tutoriales de desarrollo web y móvil, herramientas gratuitas y guías para empresas que quieren digitalizar su negocio.",
  keywords: [
    "blog de tecnología",
    "blog de informática",
    "blog de informática y tecnología",
    "blog de desarrollo web",
    "tutoriales de programación",
    "Next.js tutorial español",
    "Flutter tutorial español",
    "desarrollo web Colombia",
    "herramientas para desarrolladores",
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Dart",
    "Andres Saumet",
  ],
  robots: "index, follow",
  authors: [{ name: "Andres Felipe Saumet", url: "https://www.andressaumet.com" }],
  category: "tecnología",
  alternates: {
    canonical: "https://www.andressaumet.com/blog-de-tecnologia",
  },
  openGraph: {
    title: "Blog de Tecnología y Programación | Andres Saumet",
    description: "Blog de tecnología de Andres Saumet: tutoriales de desarrollo web y móvil, herramientas gratuitas y guías para empresas que quieren digitalizar su negocio.",
    url: "https://www.andressaumet.com/blog-de-tecnologia",
    type: "website",
    locale: "es_CO",
    siteName: "Andres Saumet",
    images: [
      {
        url: "https://www.andressaumet.com/_next/image?url=%2Fimages%2Fandres-saumet-dark.webp&w=1200&q=75",
        width: 1200,
        height: 630,
        alt: "Blog de Tecnología y Programación | Andres Saumet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog de Tecnología y Programación | Andres Saumet",
    description: "Blog de tecnología de Andres Saumet: tutoriales de desarrollo web y móvil, herramientas gratuitas y guías para empresas que quieren digitalizar su negocio.",
    images: [
      {
        url: "https://www.andressaumet.com/_next/image?url=%2Fimages%2Fandres-saumet-dark.webp&w=1200&q=75",
        alt: "Blog de Tecnología y Programación | Andres Saumet",
      },
    ],
  },
};

export default function Blog() {
  return (
    <div className="container mx-auto px-4 pt-10 pb-20">
      {/* Header */}
      <header className="mb-10 w-full mx-auto md:w-[85%]">
        <span className="block text-xs font-semibold uppercase tracking-widest text-[#7b7db0] text-center">Blog de Tecnología</span>
        <h1 className="mt-2 text-4xl font-bold text-center">Desarrollo Web y Móvil con Andres Saumet</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-base leading-relaxed text-justify px-4 md:px-8">
          Aprende desarrollo web con <strong className="text-gray-700 dark:text-gray-300">Next.js, React y Node.js</strong> y desarrollo móvil con <strong className="text-gray-700 dark:text-gray-300">Flutter y Dart</strong>. Tutoriales prácticos, guías de SEO técnico y herramientas gratuitas para desarrolladores. Si eres empresa o emprendedor buscando digitalizar tu negocio, aquí encuentras contenido que te guía desde la idea hasta el lanzamiento.
        </p>
      </header>

      {/* Layout: articles + sidebar */}
      <div className="flex gap-10 max-[920px]:flex-col items-start">
        {/* Articles grid */}
        <main className="flex-1 min-w-0">
          <CardPost />
        </main>

        {/* Sidebar */}
        <PostSideBar />
      </div>
    </div>
  );
}
