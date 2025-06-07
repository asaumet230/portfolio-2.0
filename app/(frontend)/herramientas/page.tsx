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
            <section className="mt-10">
                <p>
                    En esta sección encontrarás una selección de <strong>herramientas útiles para desarrolladores</strong> y <strong>diseñadores web</strong> que te ayudarán a optimizar tu flujo de trabajo. Desde <strong>generadores de paletas de colores</strong> hasta <strong>compresores de imágenes</strong> y <strong>componentes en Tailwind</strong>, cada herramienta ha sido diseñada para ser práctica, rápida y fácil de usar.
                </p>
                <br />
                <p>
                    Todas las <strong>herramientas online</strong> están disponibles de forma gratuita y pueden usarse directamente desde el navegador, sin necesidad de instalar nada. El objetivo es facilitarte el desarrollo y diseño web con recursos simples, pero potentes.
                    Explora las categorías, guarda tus favoritas y no olvides compartirlas si te resultan útiles. Seguimos creando más funcionalidades pensadas especialmente para la comunidad creativa y de código.
                </p>
            </section>

            <section className="mt-14">
                <h2 className="text-center mb-14">Recursos online que agilizan tu trabajo diario</h2>
                <CardsGrid />
            </section>

        </div>
    );
}