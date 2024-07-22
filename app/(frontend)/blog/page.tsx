import { Metadata } from "next";
import { CardPost, PostSideBar } from "@/components";


export const metadata: Metadata = {
  title: "Blog Desarrollo Web y Móvil | Andres Saumet",
  description: "Explora tutoriales, noticias y tendencias en desarrollo web y móvil.Explora tutoriales, noticias y tendencias en desarrollo web y móvil.",
  keywords: "blog, Andres Saumet, desarrollo web, desarrollo móvil, JavaScript, TypeScript, React, Flutter, Dart",
  robots: "index, follow",
  openGraph: {
    title: "Blog Desarrollo Web y Móvil | Andres Saumet",
    description: "Tutoriales y tendencias en desarrollo web y móvil.",
    url: "https://www.andressaumet.com/blog",
    type: "website",
    images: [
      {
        url: "https://www.andressaumet.com/_next/image?url=%2Fimages%2Fandres-saumet-dark.webp&w=1200&q=75",
        width: 800,
        height: 600,
        alt: "Blog Desarrollo Web y Móvil | Andres Saumet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Desarrollo Web y Móvil | Andres Saumet",
    description: "Tutoriales y tendencias en desarrollo web y móvil.",
    images: [
      {
        url: "https://www.andressaumet.com/_next/image?url=%2Fimages%2Fandres-saumet-dark.webp&w=1200&q=75",
        alt: "Blog Desarrollo Web y Móvil | Andres Saumet",
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
          <p className="text-justify mt-6 max-[640px]:text-pretty">Bienvenido al blog de Andres Saumet Desarrollador Web & movíl, donde comparto mis conocimientos y experiencias como desarrollador web y móvil especializado en JavaScript, TypeScript, React, Dart y Flutter. Aquí encontrarás tutoriales, guías, estudios de caso, y las últimas tendencias en tecnología, diseñados para ayudarte a mejorar tus habilidades y mantenerse al día en el mundo del desarrollo de software. ¡Únete a nuestra comunidad y lleva tu carrera al siguiente nivel!</p>
        </header>
        <main>
          <CardPost />
        </main>
      </div>
      <PostSideBar />
    </div>
  )
}
