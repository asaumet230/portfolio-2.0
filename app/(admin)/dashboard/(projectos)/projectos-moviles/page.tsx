import Link from "next/link";
import { SiDart, SiFlutter } from "react-icons/si";

import { AdminPorjectsTable } from "@/components";
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



export default function ProjectosMovilesPage() {

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