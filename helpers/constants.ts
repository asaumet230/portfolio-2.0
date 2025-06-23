import { IMenuLink } from "@/interfaces";


export const menuData: IMenuLink[] = [
  {
    name: 'Inicio',
    url: '/',
  },
  {
    name: 'proyectos destacados',
    url: '/proyectos-desarrollo-web-y-aplicaciones-moviles',
  },
  {
    name: 'Herramientas',
    url: '/herramientas',
    children: [
      {
        name: 'Convertidor de imágenes',
        url: '/herramientas/convertidor-de-imagenes',
      },
    ]
  },
  {
    name: 'contactame',
    url: '/contactame',
  },
  {
    name: 'blog',
    url: '/blog',
  },
];