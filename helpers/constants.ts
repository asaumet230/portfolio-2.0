import { ICard, IMenuLink } from "@/interfaces";


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
      {
        name: 'Comprimir imágenes gratis',
        url: '/herramientas/comprimir-imagenes-gratis',
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




export const cardsData: ICard[] = [
  {
    title: 'Convertidor de imágenes',
    description: 'Transforma tus imágenes a JPG, PNG, WebP o AVIF fácilmente',
    image: {
      light: '/images/sharpconvert-card-light.webp',
      dark: '/images/sharpconvert-card-dark.webp',
    },
    url: '/herramientas/convertidor-de-imagenes',
    alt: 'convertidor-de-imagenes',
  },
  {
    title: 'Comprimir imágenes gratis',
    description: 'Reduce el tamaño de tus imágenes sin perder calidad',
    image: {
      light: '/images/compressly-card-light.webp',
      dark: '/images/compressly-card-dark.webp',
    },
    url: '/herramientas/comprimir-imagenes-gratis',
    alt: 'comprimir-imagenes-gratis',
  },
];