import { CardsGrid } from "@/components";

export const metadata = {
    title: 'Herramientas para Desarrolladores | Andres Saumet',
    description: 'Accede a utilidades web creadas por y para desarrolladores. Conversores, generadores, analizadores y más.',
    robots: "index, follow",
    openGraph: {
        title: "Herramientas para Desarrolladores | Andres Saumet",
        description: "Accede a utilidades web creadas por y para desarrolladores. Conversores, generadores, analizadores y más.",
        url: "https://www.andressaumet.com/herramientas",
        type: "website",
        images: [
            {
                url: "https://www.andressaumet.com/_next/image?url=%2Fimages%2Fherramientas-desarrolladores.webp&w=1200&q=75",
                width: 800,
                height: 600,
                alt: "Herramientas para Desarrolladores | Andres Saumet",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Herramientas para Desarrolladores | Andres Saumet",
        description: "Accede a utilidades web creadas por y para desarrolladores. Conversores, generadores, analizadores y más.",
        images: [
            {
                url: "https://www.andressaumet.com/_next/image?url=%2Fimages%2Fherramientas-desarrolladores.webp&w=1200&q=75",
                alt: "Herramientas para Desarrolladores | Andres Saumet",
            },
        ],
    }
};


export default function Herramientas() {

    return (
        <div className="tools flex-col pt-8 pb-16">
            <h1 className="text-center mt-5">Herramientas gratuitas para desarrolladores y diseñadores web</h1>
            <section className="mt-10 max-w-3xl mx-auto">
                <p>
                    En esta sección encontrarás una selección de <strong>herramientas útiles para desarrolladores</strong> y <strong>diseñadores web</strong> que te ayudarán a optimizar tu flujo de trabajo. Desde <strong>generadores de paletas de colores</strong> hasta <strong>compresores de imágenes</strong> y <strong>componentes en Tailwind</strong>, cada herramienta ha sido diseñada para ser práctica, rápida y fácil de usar.
                </p>
                <br />
                <p>
                    Todas las <strong>herramientas online</strong> están disponibles de forma gratuita y pueden usarse directamente desde el navegador, sin necesidad de instalar nada. El objetivo es facilitarte el desarrollo y diseño web con recursos simples, pero potentes.
                    Explora las categorías, guarda tus favoritas y no olvides compartirlas si te resultan útiles. Seguimos creando más funcionalidades pensadas especialmente para la comunidad creativa y de código.
                </p>
                <br />
                <p>
                    Si trabajas con imágenes, encontrarás herramientas para <strong>convertir formatos</strong> como PNG, JPG o WebP y para <strong>comprimir imágenes</strong> sin perder calidad visible, ideales para mejorar el rendimiento de tus sitios web. Si trabajas con texto, tenemos utilidades para transformar mayúsculas, minúsculas y formatos de cadena frecuentes en el desarrollo. Todas las herramientas funcionan del lado del cliente, lo que significa que tus archivos nunca se suben a ningún servidor externo, garantizando tu privacidad y velocidad de procesamiento.
                </p>
            </section>

            <section className="mt-14">
                <h2 className="text-center mb-14">Recursos online que agilizan tu trabajo diario</h2>
                <CardsGrid />
            </section>

            <section className="mt-16 max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-8">Preguntas frecuentes sobre las herramientas</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-lg mb-2">¿Las herramientas son completamente gratuitas?</h3>
                        <p className="text-gray-600 dark:text-gray-400">Sí, todas las herramientas disponibles en esta sección son <strong>100% gratuitas</strong> y no requieren registro ni cuenta. Puedes usarlas tantas veces como necesites sin ningún costo.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">¿Mis archivos se suben a algún servidor?</h3>
                        <p className="text-gray-600 dark:text-gray-400">No. Todas las herramientas procesan tus archivos <strong>directamente en tu navegador</strong>, del lado del cliente. Tus imágenes, textos o documentos nunca salen de tu dispositivo, lo que garantiza total privacidad y velocidad.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">¿Qué tipo de herramientas encontraré aquí?</h3>
                        <p className="text-gray-600 dark:text-gray-400">Actualmente hay herramientas para <strong>conversión y compresión de imágenes</strong> (PNG, JPG, WebP) y para <strong>transformación de texto</strong>. Se irán agregando más utilidades enfocadas en tareas frecuentes de desarrollo web, diseño y productividad para programadores.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">¿Puedo usar estas herramientas en móvil?</h3>
                        <p className="text-gray-600 dark:text-gray-400">Sí, todas están diseñadas con <strong>diseño responsivo</strong> y funcionan correctamente en dispositivos móviles y tablets, además de en escritorio.</p>
                    </div>
                </div>
            </section>

        </div>
    );
}