import { Metadata } from "next";

import { getMonetizationSettings } from "@/api/monetization";
import { AdsenseLeaderboard } from "@/components/ads";
import { TextCaseProDetails, TextConverterForm } from "@/components";
import { toJsonLd } from "@/helpers";

export const metadata: Metadata = {
  title: "Convertidor de Mayúsculas y Minúsculas Online Gratis | TextCasePro",
  description: "Convierte texto a MAYÚSCULAS, minúsculas, tipo oración o capitalizado online gratis. Ideal para Word, Excel y Google Docs, sin instalar nada.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.andressaumet.com/herramientas/mayusculas-minusculas",
  },
  keywords: [
    "mayusculas y minusculas",
    "convertidor de mayusculas y minusculas",
    "minuscula a mayuscula",
    "mayusculas a minusculas",
    "mayúsculas y minúsculas",
    "convertidor de mayúsculas y minúsculas",
    "mayúsculas a minúsculas",
    "minúscula a mayúscula",
    "convertir mayúsculas a minúsculas",
    "convertir minúsculas a mayúsculas",
    "pasar texto a mayúsculas",
    "pasar texto a minúsculas",
  ],
  openGraph: {
    title: "Convertidor de Mayúsculas y Minúsculas Online Gratis | TextCasePro",
    description: "Transforma tu texto entre mayúsculas y minúsculas directamente desde el navegador. Compatible con Excel, Word y Google Docs. Sin instalar nada.",
    images: [
      "https://www.andressaumet.com/images/textcasepro-light.webp",
      "https://www.andressaumet.com/images/textcasepro-dark.webp",
    ],
    url: "https://www.andressaumet.com/herramientas/mayusculas-minusculas",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Convertidor de Mayúsculas y Minúsculas Online Gratis | TextCasePro",
    description: "Convierte tu texto fácil y rápido entre mayúsculas y minúsculas sin perder formato. 100% gratis y online.",
    images: [
      "https://www.andressaumet.com/images/textcasepro-light.webp",
      "https://www.andressaumet.com/images/textcasepro-dark.webp",
    ],
  }
}

export default async function MayusculasMinusculasPage() {
  const monetization = await getMonetizationSettings();
  const showAds = monetization.enabled && monetization.toolAdsEnabled;

  const toolSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': 'https://www.andressaumet.com/herramientas/mayusculas-minusculas#webapp',
        url: 'https://www.andressaumet.com/herramientas/mayusculas-minusculas',
        name: 'TextCasePro - Convertidor de Mayúsculas y Minúsculas',
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
            name: 'Convertidor de Mayúsculas y Minúsculas',
            item: 'https://www.andressaumet.com/herramientas/mayusculas-minusculas',
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-16 dark:bg-gradient-to-tr to-[#262f3a] from-[#0d1117]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(toolSchema) }}
      />
      <div className="w-11/12 flex flex-col items-center mx-auto p-10 bg-white shadow-2xl rounded-lg  dark:bg-gray-700">
        <header className="mb-10">
          <h1
            id='conver-text-form'
            className="text-2xl sm:text-3xl text-center font-bold">Convertidor de mayúsculas y minúsculas online</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-base text-center leading-relaxed max-w-2xl mx-auto">
            Convierte cualquier texto a MAYÚSCULAS, minúsculas, tipo oración o capitalizado en segundos.
          </p>
        </header>
        {showAds && monetization.toolTopSlot && (
          <AdsenseLeaderboard clientId={monetization.clientId} slot={monetization.toolTopSlot} />
        )}
        <TextConverterForm />
      </div>
      {showAds && monetization.toolBottomSlot && (
        <AdsenseLeaderboard clientId={monetization.clientId} slot={monetization.toolBottomSlot} />
      )}
      <TextCaseProDetails />
    </main>
  );
}
