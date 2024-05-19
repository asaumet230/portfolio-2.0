import { IMenuLink, ISkills, ITool } from "@/interfaces";
import { FaBrain } from "react-icons/fa";

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

 
  
export const toolsData: ITool[] = [
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


export const skillsData: ISkills[] = [

  {
    title: 'pensamiento crítico',
    content: 'Aptitud para analizar situaciones o problemas, identificar patrones y explorar soluciones basadas en una evaluación lógica y detallada.',
  },
  {
    title: 'trabajo en equipo',
    content: 'Experiencia trabajando en equipos multidisciplinarios y habilidad para colaborar y apoyar a los compañeros en la consecución de metas comunes.'
  },
  {
    title: 'comunicación efectiva',
    content: 'Capacidad para explicar conceptos técnicos de manera clara a audiencias no técnicas y colaborar efectivamente con colegas y clientes.'
  },
  {
    title: 'gestión del tiempo',
    content: 'Competencia para manejar múltiples tareas y proyectos al mismo tiempo, priorizando eficazmente para cumplir con los plazos establecidos.'
  },
  {
    title: 'creatividad',
    content: 'Capacidad para pensar fuera de lo establecido y generar ideas innovadoras que pueden traducirse en mejoras de productos.'
  },
  {
    title: 'aprendizaje continuo',
    content: 'Compromiso con el desarrollo personal y profesional, buscando constantemente ampliar conocimientos y habilidades.'
  },
];