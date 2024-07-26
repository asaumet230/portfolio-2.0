import Link from "next/link";
import { Metadata } from "next";
import { SiDart, SiFlutter } from "react-icons/si";

import { AdminPorjectsTable } from "@/components";
import { getProjects } from "@/api";

import { IProjectTableColumns, IProjectTableRow } from "@/interfaces";


const mobileColumnsTitle: IProjectTableColumns[] = [
  {
    id: 'columna-1',
    title: 'titulo',
  },
  {
    id: 'columna-2',
    title: 'descripción',

  },
  {
    id: 'columna-3',
    title: 'tecnologías',
  },
  {
    id: 'columna-4',
    title: 'repositorio',
  },
  {
    id: 'columna-5',
    title: 'link Projecto',
  },
  {
    id: 'columna-6',
    title: 'imagenes',
  },
];

export const metadata: Metadata = {
  title: "Dashboard | Proyectos Móviles",
  description: "Proyectos Web y Móviles Sección de administración del sitio web",
  keywords: "dashboard, administración",
  robots: "noindex, nofollow",
  openGraph: {
      title: "Dashboard",
      description: "Sección de administración del sitio web",
      url: "https://www.andressaumet.com/dashboard",
      type: "website",
      images: [
          {
              url: "https://www.andressaumet.com/_next/image?url=%2Fimages%2Fandres-saumet-dark.webp&w=1200&q=75",
              width: 800,
              height: 600,
              alt: "Dashboard",
          },
      ],
  },
  twitter: {
      card: "summary_large_image",
      title: "Dashboard",
      description: "Sección de administración del sitio web",
      images: [
          {
              url: "https://www.andressaumet.com/_next/image?url=%2Fimages%2Fandres-saumet-dark.webp&w=1200&q=75",
              alt: "Dashboard",
          },
      ],
  },
};


const mobilProjects: IProjectTableRow[] = [
  {
    id: 'proyecto-1',
    title: 'cinemapedia',
    description: 'Desarrollé una aplicación con Flutter y Dart, utilizando el patrón de diseño Domain-Driven Design (DDD) para proporcionar una guía completa de películas que incluye descripciones detalladas, calificaciones y tráilers. Esta solución, diseñada especialmente para cinéfilos, facilita la exploración y descubrimiento de nuevos filmes a través de una interfaz intuitiva, mejorando significativamente la experiencia de selección de contenido cinematográfico.',
    tecnologies: [
      {
        id: 'icon1',
        icon: <SiFlutter size={35} />
      },

      {
        id: 'icon2',
        icon: <SiDart size={35} />,
      },

    ],
    repositorie: '/https://github.com/asaumet230/drinkology-frontend-v2.0.0',
    projectLink: '/https://github.com/asaumet230/drinkology-frontend-v2.0.0',
    images: [
      '/images/proyects/cinemapedia-app-1.webp',
      '/images/proyects/cinemapedia-app-2.webp',
    ],
  }
];





export default async function ProjectosMovilesPage() {


  const { projects } = await getProjects('mobil');


  console.log(projects);

  return (
    <div className="w-full bg-white p-4 rounded-lg card-shadow">

      <h1 className="text-center mb-6">Tabla de Projectos Movíles</h1>

      <div className="mt-5 mb-6 flex justify-end mr-4">
        <Link href={"/dashboard/nuevo-proyecto"} className="bg-blue-600 py-2 px-5 text-white rounded text-sm font-bold hover:bg-blue-500">
          Nuevo Proyecto
        </Link>
      </div>

      <AdminPorjectsTable
        columnsTitle={mobileColumnsTitle}
        projects={mobilProjects} />
    </div>
  );
}