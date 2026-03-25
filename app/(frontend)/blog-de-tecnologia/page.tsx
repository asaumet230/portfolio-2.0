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
    <div className="container flex max-[920px]:flex-col pt-8 pb-16">
      <div className="w-9/12 max-[920px]:w-full mr-6 max-[920px]:mr-none">
        <header className="pt-4 mb-8 px-10">
          <h1 className="text-left max-[920px]:text-center">Explora la Innovación: Blog de Desarrollo Web y Móvil</h1>
          <p className="text-justify mt-6 max-[640px]:text-pretty">Bienvenido a mi blog de Andres Saumet Desarrollador Web & movíl, donde comparto mis conocimientos y experiencias como desarrollador web y móvil especializado en JavaScript, TypeScript, React, Dart y Flutter. Aquí encontrarás tutoriales, guías, estudios de caso, y las últimas tendencias en tecnología, diseñados para ayudarte a mejorar tus habilidades y mantenerse al día en el mundo del desarrollo de software. ¡Únete a nuestra comunidad y lleva tu carrera al siguiente nivel!</p>
        </header>
        <main>
          <CardPost />
        </main>
      </div>
      <PostSideBar />
    </div>
  )
}
