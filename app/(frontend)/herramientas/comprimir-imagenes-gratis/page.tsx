import { Metadata } from "next";

import { getMonetizationSettings } from "@/api/monetization";
import { AdsenseLeaderboard } from "@/components/ads";
import { CompresslyDetails, ImagesCompressor } from "@/components";
import { toJsonLd } from "@/helpers";


export const metadata: Metadata = {
  title: "Comprimir Imágenes Gratis Online | JPG, PNG, WebP y AVIF",
  description: "Comprime imágenes JPG, PNG, WebP y AVIF online gratis. Tus fotos nunca salen de tu navegador: sin subir archivos ni registrarte. Descarga individual o en ZIP.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.andressaumet.com/herramientas/comprimir-imagenes-gratis",
  },
  keywords: [
    "comprimir imágenes",
    "comprimir imágenes gratis",
    "comprimir imágenes online",
    "comprimir jpg",
    "comprimir imagen jpg",
    "comprimir png",
    "comprimir webp",
    "comprimir fotos",
    "reducir peso de imagen",
    "reducir tamaño de imágenes",
    "comprimir imagen a 100 kb",
    "compressly",
  ],
  openGraph: {
    title: "Comprimir Imágenes Gratis Online | JPG, PNG, WebP y AVIF",
    description: "Reduce el peso de tus imágenes directamente en tu navegador, sin subirlas a ningún servidor. Gratis, sin registro y con descarga individual o en ZIP.",
    images: [
      "https://www.andressaumet.com/images/compressly-dark.webp",
      "https://www.andressaumet.com/images/compressly-light.webp"
    ],
    url: "https://www.andressaumet.com/herramientas/comprimir-imagenes-gratis",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Comprimir Imágenes Gratis Online | JPG, PNG, WebP y AVIF",
    description: "Comprime imágenes JPG, PNG, WebP y AVIF gratis y sin que tus fotos salgan de tu navegador. Rápido, privado y sin registro.",
    images: [
      "https://www.andressaumet.com/images/compressly-dark.webp",
      "https://www.andressaumet.com/images/compressly-light.webp"
    ],
  }
}

const BASE_URL = "https://www.andressaumet.com/herramientas/comprimir-imagenes-gratis";

const faqItems = [
  {
    question: "¿Cómo comprimir una imagen gratis?",
    answer: "Sube tu imagen JPG, PNG, WebP o AVIF, elige el nivel de compresión y descárgala optimizada en segundos. Es gratis, no requiere registro y todo ocurre en tu navegador.",
  },
  {
    question: "¿Cómo comprimir un JPG online?",
    answer: "Arrastra tus archivos JPG o JPEG a la herramienta, selecciona el nivel de compresión que prefieras y descarga cada imagen o todas juntas en un ZIP.",
  },
  {
    question: "¿Cómo reducir el peso de una foto a 100 KB o menos?",
    answer: "Selecciona la opción de tamaño exacto, elige 100 KB (o escribe el valor que necesites) y la herramienta ajustará la compresión para acercarse lo máximo posible a ese peso. Ideal para trámites y formularios con límite de tamaño.",
  },
  {
    question: "¿Qué diferencia hay entre comprimir y redimensionar una imagen?",
    answer: "Comprimir reduce el peso del archivo (KB o MB); redimensionar cambia el ancho y alto en píxeles. Esta herramienta hace ambas cosas: comprime el archivo y, si lo deseas, también puedes redimensionarlo eligiendo el tamaño máximo del lado más largo (1920, 1280 u 800 píxeles).",
  },
  {
    question: "¿Puedo redimensionar la imagen además de comprimirla?",
    answer: "Sí. Junto al nivel de compresión hay una opción de redimensionar que ajusta el lado más largo de la imagen a 1920, 1280 u 800 píxeles, manteniendo la proporción original. Si eliges 'Original', las dimensiones no cambian.",
  },
  {
    question: "¿La herramienta elimina los metadatos EXIF de las fotos?",
    answer: "Sí. Al comprimir, la imagen se vuelve a generar y los metadatos EXIF —incluida la ubicación GPS, la fecha y los datos de la cámara— se eliminan automáticamente. Es una capa extra de privacidad antes de compartir tus fotos.",
  },
  {
    question: "¿Puedo comprimir varias imágenes a la vez?",
    answer: "Sí, puedes subir hasta 20 imágenes por lote, de máximo 18 MB cada una, y comprimirlas todas en una sola pasada.",
  },
  {
    question: "¿Se pierde calidad al comprimir una imagen?",
    answer: "La compresión reduce el peso del archivo manteniendo una buena calidad visual. En el nivel recomendado la diferencia es prácticamente imperceptible; en máxima compresión se prioriza el menor peso posible.",
  },
  {
    question: "¿Qué formatos de imagen soporta?",
    answer: "JPG, JPEG, PNG, WebP y AVIF.",
  },
  {
    question: "¿Puedo descargar todas las imágenes en ZIP?",
    answer: "Sí. Puedes descargar cada imagen comprimida por separado o todas juntas en un único archivo ZIP.",
  },
  {
    question: "¿Funciona desde el celular?",
    answer: "Sí, funciona en cualquier navegador de celular, tablet o computador, sin instalar aplicaciones.",
  },
  {
    question: "¿Mis imágenes se suben a algún servidor?",
    answer: "No. Toda la compresión se realiza directamente en tu navegador: tus imágenes nunca salen de tu dispositivo, lo que garantiza tu privacidad.",
  },
];

export default async function CompresorImagenesPage() {
    const monetization = await getMonetizationSettings();
    const showAds = monetization.enabled && monetization.toolAdsEnabled;

    const toolSchema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebApplication',
                '@id': `${BASE_URL}#webapp`,
                url: BASE_URL,
                name: 'Compressly - Compresor de Imágenes Online',
                description: metadata.description,
                applicationCategory: 'UtilitiesApplication',
                operatingSystem: 'Web',
                inLanguage: 'es-CO',
                isAccessibleForFree: true,
                offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                },
                author: {
                    '@type': 'Person',
                    '@id': 'https://www.andressaumet.com/#person',
                    name: 'Andres Felipe Saumet',
                },
            },
            {
                '@type': 'FAQPage',
                '@id': `${BASE_URL}#faq`,
                mainEntity: faqItems.map(({ question, answer }) => ({
                    '@type': 'Question',
                    name: question,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: answer,
                    },
                })),
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Inicio',
                        item: 'https://www.andressaumet.com/',
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Herramientas',
                        item: 'https://www.andressaumet.com/herramientas',
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: 'Comprimir Imágenes Gratis',
                        item: BASE_URL,
                    },
                ],
            },
        ],
    };

    return (
        <div className="w-full mx-auto flex flex-col min-h-screen items-center justify-center bg-gray-50 dark:bg-gradient-to-tr to-[#262f3a] from-[#0d1117]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: toJsonLd(toolSchema) }}
            />
            <main className="w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="bg-white max-w-3xl mx-auto rounded-lg shadow-md py-10 px-6 sm:px-8 my-10 dark:bg-gray-700">
                    <header>
                        <h1
                            id="compress-images-form"
                            className="text-3xl text-center font-bold sm:text-4xl">Comprimir imágenes gratis online</h1>
                        <p className="mt-3 text-gray-600 dark:text-gray-300 text-base text-center leading-relaxed max-w-2xl mx-auto">
                            Comprime imágenes JPG, PNG, WebP y AVIF gratis desde tu navegador. Reduce el peso de tus fotos manteniendo una buena calidad visual, sin instalar programas y sin subir tus archivos a ningún servidor.
                        </p>
                    </header>
                    {showAds && monetization.toolTopSlot && (
                        <AdsenseLeaderboard clientId={monetization.clientId} slot={monetization.toolTopSlot} />
                    )}
                    <ImagesCompressor />
                    <p className="text-center text-sm text-gray-500 dark:text-gray-300 mt-4">
                        🔐 Tus imágenes se procesan directamente en tu navegador. No necesitas registrarte ni instalar nada.
                    </p>
                </div>
                {showAds && monetization.toolBottomSlot && (
                    <AdsenseLeaderboard clientId={monetization.clientId} slot={monetization.toolBottomSlot} />
                )}
                    <CompresslyDetails />
            </main>
        </div>
    );
}
