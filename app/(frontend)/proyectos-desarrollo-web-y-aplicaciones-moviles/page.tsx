import Link from 'next/link';
import { Metadata } from 'next';

import { MobilProjects, Separator, WebProjects } from "@/components";
import { getProjects } from "@/api";


export const metadata: Metadata = {
  title: 'Proyectos destacados web y móviles | Andres Felipe Saumet',
  description: 'Descubre cómo transformo ideas en proyectos web y móviles efectivos con tecnologías de vanguardia. Explora mis trabajos exitosos, entra ya.',
  keywords: "desarrollo web, aplicaciones móviles, desarrollo web full stack,",
  robots: "index, follow",
  openGraph: {
    title: "Proyectos destacados web y móviles | Andres Felipe Saumet",
    description: "Descubre cómo transformo ideas en proyectos web y móviles efectivos con tecnologías de vanguardia. Explora mis trabajos exitosos, entra ya.",
    url: "https://www.andressaumet.com/proyectos-desarrollo-web-y-aplicaciones-moviles",
    type: "website",
    images: [
      {
        url: "https://www.andressaumet.com/_next/image?url=%2Fimages%2Fandres-saumet-dark.webp&w=1200&q=75",
        width: 800,
        height: 600,
        alt: "Proyectos de Desarrollo Web y Aplicaciones Móviles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proyectos destacados web y móviles | Andres Felipe Saumett",
    description: "Descubre cómo transformo ideas en proyectos web y móviles efectivos con tecnologías de vanguardia. Explora mis trabajos exitosos, entra ya.",
    images: [
      {
        url: "https://www.andressaumet.com/_next/image?url=%2Fimages%2Fandres-saumet-dark.webp&w=1200&q=75",
        alt: "Proyectos de Desarrollo Web y Aplicaciones Móviles",
      },
    ],
  },
};

export default async function PageTrabajos() {

  const webProjects = await getProjects('web');
  const mobilProjects = await getProjects('mobil');

  return (
    <>
      <header className="section">
        <div className="mt-14 mb-14">
          <h1 className="text-center">Proyectos de Desarrollo Web Full Stack y Aplicaciones Móviles</h1>
          <div className="flex justify-center">
            <Separator />
          </div>
          <p className="text-justify">
            Descubre cómo <Link href={'/'} className='font-bold hover:text-secondary-color dark:hover:text-indigo-600'>Andres Felipe Saumet</Link> transforma ideas en soluciones efectivas mediante el uso de tecnologías de vanguardia. En esta sección, presento una selección de mis trabajos más exitosos en <strong>desarrollos web full stack </strong> y en <strong>aplicaciones móviles</strong>. cada proyecto es una muestra de mi dedicación y experiencia. Mis soluciones son innovadoras y han transformado ideas en aplicaciones impactantes con <strong>funcionalidades robustas</strong>, mejorando la experiencia del usuario.
          </p>
          <p className="text-justify mt-2">
            Explora cada proyecto para entender el alcance de mis habilidades técnicas y mi enfoque creativo en la solución de problemas complejos.
          </p>
        </div>
      </header>
      <main>
        <WebProjects projects={webProjects.projects} />
        <MobilProjects projects={mobilProjects.projects} />
      </main>
    </>
  )
}
