import { Metadata } from "next";

import { ImagesForm, SharpConvertDetails } from "@/components";

export const metadata: Metadata = {
  title: "Convertidor de Imágenes Online Gratis | SharpConvert",
  description: "Convierte tus imágenes fácilmente a JPG, PNG, WebP o AVIF con nuestro convertidor gratuito. Rápido, seguro, sin marcas de agua y sin registro.",
  robots: "index, follow",
  keywords: [
    "convertidor de imágenes",
    "convertir imágenes online",
    "convertidor JPG",
    "convertidor PNG",
    "convertidor WebP",
    "convertidor AVIF",
    "convertidor gratuito de imágenes",
    "convertir sin perder calidad",
    "convertidor sin marcas de agua",
    "SharpConvert"
  ],
  openGraph: {
    title: "Convertidor de Imágenes Online Gratis | SharpConvert",
    description: "Convierte imágenes a JPG, PNG, WebP o AVIF sin instalar programas. Fácil, rápido y gratuito con SharpConvert.",
    images: [
      "https://www.andressaumet.com/images/sharpconvert-dark.webp",
      "https://www.andressaumet.com/images/sharpconvert-light.webp"
    ],
    url: "https://www.andressaumet.com/",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Convertidor de Imágenes Online Gratis | SharpConvert",
    description: "Convierte tus imágenes sin perder calidad con SharpConvert. Gratis, rápido y sin marcas de agua.",
    images: [
      "https://www.andressaumet.com/images/sharpconvert-dark.webp",
      "https://www.andressaumet.com/images/sharpconvert-light.webp"
    ],
  }
}


export default function ConvertidorImagenPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gradient-to-tr to-[#262f3a] from-[#0d1117]">
      <main className="w-full max-w-5xl mx-auto">
        <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md py-10 px-6 sm:px-8 my-10 dark:bg-gray-700">
          <header>
            <h1
              id="converitor-images-form"
              className="text-3xl text-center mb-1 sm:mb-5 sm:text-4xl font-bold ">Convertidor de imágenes</h1>
          </header>
          <ImagesForm />
        </div>
        <SharpConvertDetails />
      </main>
    </div>
  );
}