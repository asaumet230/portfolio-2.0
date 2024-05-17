import { IMenuLink } from "@/interfaces";

export const menuData: IMenuLink[] = [
    {
      name: 'Inicio',
      url: '/',
    },
    {
      name: 'trabajos',
      url: '/trabajos',
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

 interface Tool {
  imageUrl: string;
  title: string;
  progressPercent: number; 
 }
  
export const toolsData: Tool[] = [
  {
    imageUrl: '/images/tools/javascript.webp',
    title: 'Javascript',
    progressPercent: 85,
  },
  {
    imageUrl: '/images/tools/typescript.webp',
    title: 'Typescript',
    progressPercent: 80,
  },
  {
    imageUrl: '/images/tools/dart.webp',
    title: 'Dart',
    progressPercent: 78,
  },
  {
    imageUrl: '/images/tools/reactjs.webp',
    title: 'React js',
    progressPercent: 85,
  },
  {
    imageUrl: '/images/tools/nextjs.webp',
    title: 'Next js',
    progressPercent: 80,
  },
  {
    imageUrl: '/images/tools/flutter.webp',
    title: 'Flutter',
    progressPercent: 80,
  },
  {
    imageUrl: '/images/tools/angular.webp',
    title: 'Angular',
    progressPercent: 70,
  },
];