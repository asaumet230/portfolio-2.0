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
        <div className='grid grid-cols-2 gap-8 mt-8 max-[920px]:flex flex-col mx-2'>
          <Image
            className={styles['profile-image']}
            src='/images/perfil-1.webp'
            alt='Perfil-1'
            width='600'
            height='600' />
          <div>
            <p className="font-light mb-4 text-justify first-letter:text-6xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:capitalize max-[640px]:text-pretty">con cuatro años de experiencia en el desarrollo <strong>web fullstack</strong>  e <strong>movíl</strong> y una sólida formación como ingeniero industrial graduado de la <strong>Universidad del Norte</strong>, he cultivado un dominio técnico en una variedad de tecnologías, incluyendo lenguajes de programación como <strong>Dart</strong>, <strong>JavaScript</strong> y <strong>TypeScript</strong>. Mi habilidad técnica abarca desde <strong>front-end</strong> y <strong>back-end</strong> hasta el desarrollo de aplicaciones móviles, utilizando frameworks líderes como <strong>React</strong>, <strong>Angular</strong>, <strong>Next.js</strong> y <strong>Flutter</strong>.</p>
            <p className="font-light text-justify mb-4 max-[640px]:text-pretty">Especializado en la creación de interfaces elegantes y funcionales con <strong>HTML</strong>, <strong>CSS</strong> y <strong>Tailwind</strong>, también gestiono complejas interacciones de backend utilizando <strong>Node.js</strong> y bases de datos robustas como<strong> PostgreSQL</strong> y <strong>MongoDB</strong>. Mi enfoque práctico y creativo se complementa con una sólida comprensión de metodologías ágiles, particularmente <strong>SCRUM</strong>, lo que me permite trabajar eficazmente tanto de manera individual como en equipo.</p>
            <p className="font-light text-justify mb-4 max-[640px]:text-pretty">Además, tengo conocimientos prácticos de herramientas esenciales como <strong>Docker</strong> y<strong> Kubernetes</strong>, y uso<strong> Git</strong> para un control de versiones meticuloso, asegurando una gestión eficiente del código en todos los proyectos. Mi formación en ingeniería industrial se complementa con una especialización en <strong>Evaluación Financiera y de Proyectos</strong> de la <strong>Universidad de los Andes</strong>, lo que enriquece mi perspectiva y capacidad analítica en la gestión de proyectos tecnológicos. Mi versatilidad y capacidad para adaptarme a nuevos desafíos tecnológicos me convierten en un activo valioso para cualquier equipo, impulsando la innovación y la excelencia técnica en cada proyecto.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMeSection;