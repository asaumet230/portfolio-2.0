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
      <div className="w-10/12 md:w-9/12 mx-auto mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Hablemos de tu proyecto
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed max-w-2xl mx-auto">
          ¿Tienes una idea, un proyecto en mente o necesitas una cotización? Estoy disponible para colaborar en
          proyectos de <strong className="text-gray-700 dark:text-gray-300">desarrollo web con Next.js y React</strong>,{' '}
          <strong className="text-gray-700 dark:text-gray-300">aplicaciones móviles con Flutter</strong> y asesorías
          técnicas para startups y empresas. Puedes escribirme desde el formulario y te respondo en menos de 24 horas.
          Si aún estás en fase de planeación, también puedo ayudarte a definir la arquitectura y el alcance de tu
          producto digital.
        </p>
      </div>
      <ContactSection />
    </div>
  );
}
