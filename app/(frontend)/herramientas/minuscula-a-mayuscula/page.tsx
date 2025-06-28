import { Metadata } from "next";

import { TextCaseProDetails, TextConverterForm } from "@/components";

export const metadata: Metadata = {
  title: "Convertir de minúscula a mayúscula online | TextCasePro",
  description: "Convierte texto de minúscula a mayúscula de forma rápida, gratuita y online. Ideal para Excel, Word o cualquier otro editor. ¡Sin registros ni instalaciones!",
  robots: "index, follow",
  keywords: [
    "minúscula a mayúscula",
    "de minúscula a mayúscula",
    "pasar minúscula a mayúscula",
    "convertir minúscula a mayúscula en excel",
    "como cambiar de minúscula a mayúscula en excel",
    "cambiar minúscula a mayúscula en excel",
    "como pasar de minúscula a mayúscula en excel",
    "convertir de minúscula a mayúscula",
    "letra a minúscula y mayúscula",
    "minúscula y mayúscula",
    "cambiar de minúscula a mayúscula en word",
    "minuscula a mayuscula online",
    "como pasar letra minúscula a mayúscula en excel",
    "formula para pasar de minúscula a mayúscula en excel",
    "cambiar de minúscula a mayúscula con teclado"
  ],
  openGraph: {
    title: "Convertir de minúscula a mayúscula online | TextCasePro",
    description: "Transforma tu texto de minúscula a mayúscula directamente desde el navegador. Compatible con Excel, Word y Google Docs. Sin instalar nada.",
    images: [
      "https://www.andressaumet.com/images/textcasepro-light.webp",
      "https://www.andressaumet.com/images/textcasepro-dark.webp",
    ],
    url: "https://www.andressaumet.com/herramientas/minuscula-a-mayuscula",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Convertir de minúscula a mayúscula online | TextCasePro",
    description: "Convierte tu texto fácil y rápido. De minúscula a mayúscula sin perder formato. 100% gratis y online.",
    images: [
      "https://www.andressaumet.com/images/textcasepro-light.webp",
      "https://www.andressaumet.com/images/textcasepro-dark.webp",
    ],
  }
}

export default function MinusculaAMayusculaPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-16 dark:bg-gradient-to-tr to-[#262f3a] from-[#0d1117]">
      <div className="w-11/12 flex flex-col items-center mx-auto p-10 bg-white shadow-2xl rounded-lg  dark:bg-gray-700">
        <header className="mb-10">
          <h1
            id='conver-text-form'
            className="text-2xl sm:text-3xl text-center font-bold">Convierte texto de minúscula a mayúscula online</h1>
        </header>
        <TextConverterForm />
      </div>
      <TextCaseProDetails />
    </main>
  );
}