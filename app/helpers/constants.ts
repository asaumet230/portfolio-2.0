import { 
    FaBrain, 
    FaClock, 
    FaComments, 
    FaGraduationCap, 
    FaLightbulb, 
    FaUsers,
 } from 'react-icons/fa';

import { 
  IExperienceItem, 
  IMenuLink, 
  ISkills, 
  ITestimonial, 
  ITool 
} from "@/app/interfaces";


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



export const experienceItemSectionData: IExperienceItem[] = [
  {
    city: 'santa marta',
    company: 'freelance',
    position: 'web & mobil developer',
    url: '/',
    year: '2024',
  },
  {
    city: 'santa marta',
    company: 'chilo',
    position: 'project manager',
    url: 'https://www.chilo.com.co/',
    year: '2023',
  },
  {
    city: 'bogota D.C',
    company: 'eferta',
    position: 'junior developer',
    url: 'https://www.eferta.com/',
    year: '2022',
  },
  {
    city: 'santa marta',
    company: 'partyAf',
    position: 'frontend developer',
    url: 'https://www.partiaf.com/',
    year: '2021',
  },
];




export const testimonialsData: ITestimonial[] = [
  {
    name: 'angelica galvis',
    content: 'Su persistencia, ingenio y profesionalismo lo destacan en el campo. Con una habilidad excepcional para interpretar conceptos de diseño, demuestra proactividad y una capacidad innata para convertir ideas en soluciones efectivas. Es sin duda un colaborador invaluable y un verdadero impulsor de proyectos exitosos.',
    major: 'Diseñador UI | UX',
    instagram: 'https://www.instagram.com/angelica_galvis_morales/',
    image: '/images/testimonials/angelica-galvis.webp'
  },
  {
    name: 'gustavo charris',
    content: 'Es un profesional excepcional y una gran persona, siempre cumpliendo con los plazos establecidos. Demuestra habilidad tanto en entornos colaborativos como trabajando de manera independiente, adaptándose a cualquier escenario con eficacia y dedicación. Además sabe usar metodologías agiles como SCRUM',
    major: 'Consultor SEO',
    instagram: 'https://www.instagram.com/tavocharris/',
    linkedin: 'https://www.linkedin.com/in/gustavo-charris-castaneda/',
    image: '/images/testimonials/gustavo-charris.webp',
  },
  {
    name: 'jorge romero',
    content: 'Es un individuo admirable y un profesional sobresaliente, dotado de un amplio conocimiento en programación. Posee una excepcional habilidad para resolver problemas algorítmicos complejos y destaca por su capacidad de trabajar eficazmente bajo presión. Sin duda, su aporte es fundamental en cualquier equipo.',
    major: 'Ingeniero de Sistemas',
    instagram: 'https://www.instagram.com/jorgea_romero_saumeth/',
    linkedin: 'https://www.linkedin.com/in/jorge-armando-romero-saumeth-b48b0b34/',
    image: '/images/testimonials/jorge-romero.webp',

  },
]; 