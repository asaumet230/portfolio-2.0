import Image from 'next/image';

import { Separator } from '@/components';

import styles from './homeSections.module.css';

export const AboutMeSection = () => {
  return (
    <section className="mt-20">
      <div className="section">
        <h2 className="text-4xl text-center mb-1 max-[920px]:text-3xl max-[920px]:mb-0">Acerca de Mi</h2>
        <div className="flex justify-center">
          <Separator />
        </div>
        <div className='grid grid-cols-2 gap-8 mt-8 max-[920px]:flex flex-col'>
          <Image
            className={styles['profile-image']}
            src='/images/perfil-1.webp'
            alt='Perfil-1'
            width='600'
            height='600' />
          <div>
            <p className='font-light mb-4 text-justify first-letter:text-6xl first-letter:font-bold first-letter:mr-3 first-letter:float-left'>
              Con cuatro años de experiencia en el desarrollo web fullstack y una sólida formación como ingeniero industrial graduado de la Universidad del Norte, he cultivado un dominio técnico en una variedad de tecnologías, incluyendo lenguajes de programación como Dart, JavaScript y TypeScript. Mi habilidad técnica abarca desde front-end y back-end hasta el desarrollo de aplicaciones móviles, utilizando frameworks líderes como React, Angular, Next.js y Flutter.
            </p>
            <p className='font-light text-justify mb-4'>
              Especializado en la creación de interfaces elegantes y funcionales con HTML, CSS y Tailwind, también gestiono complejas interacciones de backend utilizando Node.js y bases de datos robustas como PostgreSQL y MongoDB. Mi enfoque práctico y creativo se complementa con una sólida comprensión de metodologías ágiles, particularmente SCRUM, lo que me permite trabajar eficazmente tanto de manera individual como en equipo.
            </p>
            <p className='font-light text-justify mb-4'>
              Además, tengo conocimientos prácticos de herramientas esenciales como Docker y Kubernetes, y uso Git para un control de versiones meticuloso, asegurando una gestión eficiente del código en todos los proyectos. Mi formación en ingeniería industrial se complementa con una especialización en Evaluación Financiera y de Proyectos de la Universidad de los Andes, lo que enriquece mi perspectiva y capacidad analítica en la gestión de proyectos tecnológicos. Mi versatilidad y capacidad para adaptarme a nuevos desafíos tecnológicos me convierten en un activo valioso para cualquier equipo, impulsando la innovación y la excelencia técnica en cada proyecto.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMeSection;