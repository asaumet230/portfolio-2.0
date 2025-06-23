import { Metadata } from "next";

import { CompresslyDetails, ImagesCompressor } from "@/components";


export const metadata: Metadata = {
  title: "Comprimir Imágenes Gratis y sin Perder Calidad | Compressly",
  description: "Reduce el tamaño de tus imágenes JPG, PNG, WebP o AVIF sin perder calidad. Compressly es una herramienta gratuita, rápida, privada y sin marcas de agua.",
  robots: "index, follow",
  keywords: [
    "comprimir imágenes",
    "comprimir una imagen sin perder calidad",
    "comprimir imágenes gratis",
    "comprimir imágenes jpg online y gratis",
    "comprimir imágenes png gratis",
    "comprimir imágenes tiff",
    "programa para comprimir imágenes gratis",
    "reducir tamaño de imágenes sin perder calidad online",
    "comprimir imágenes jpg gratis",
    "comprimir imágenes en pdf",
    "cómo comprimir una foto",
    "compressly"
  ],
  openGraph: {
    title: "Comprimir Imágenes Gratis y sin Perder Calidad | Compressly",
    description: "Utiliza Compressly para reducir el tamaño de tus imágenes directamente desde tu navegador. Totalmente gratis, seguro y sin necesidad de registro.",
    images: [
      "https://www.andressaumet.com/images/compressly-dark.webp",
      "https://www.andressaumet.com/images/compressly-light.webp"
    ],
    url: "https://www.andressaumet.com/herramientas/comprimir-imagenes-gratis",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Comprimir Imágenes Gratis y sin Perder Calidad | Compressly",
    description: "Reduce el peso de tus imágenes JPG, PNG o WebP sin comprometer su calidad. Gratis, rápido y 100% privado.",
    images: [
      "https://www.andressaumet.com/images/compressly-dark.webp",
      "https://www.andressaumet.com/images/compressly-light.webp"
    ],
  }
}

export default function CompresorImagenesPage() {
    return (
        <div className="w-full mx-auto flex flex-col min-h-screen items-center justify-center bg-gray-50 dark:bg-gradient-to-tr to-[#262f3a] from-[#0d1117]">
            <main className="w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="bg-white max-w-3xl mx-auto rounded-lg shadow-md py-10 px-6 sm:px-8 my-10 dark:bg-gray-700">
                    <header>
                        <h1
                            id="compress-images-form"
                            className="text-3xl text-center font-bold sm:text-4xl">Comprimir Imágenes Gratis</h1>
                    </header>
                    <ImagesCompressor />
                </div>
                    <CompresslyDetails />
            </main>
        </div>
    );
}