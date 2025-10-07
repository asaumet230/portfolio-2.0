'use client'

import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaShieldAlt, FaApple, FaGooglePlay, FaFileContract } from 'react-icons/fa';
import { SiFlutter, SiDart, SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiNodedotjs, SiAngular, SiWordpress, SiBootstrap, SiTailwindcss, SiCss3, SiGatsby } from 'react-icons/si';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { IProject } from '@/interfaces';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './MobileProjectLayout.module.css';

interface Props {
  project: IProject;
  slug: string;
}

const getTechIcon = (tech: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
    'flutter': <SiFlutter size={18} />,
    'dart': <SiDart size={18} />,
    'reactjs': <SiReact size={18} />,
    'nextjs': <SiNextdotjs size={18} />,
    'typescript': <SiTypescript size={18} />,
    'javascript': <SiJavascript size={18} />,
    'nodejs': <SiNodedotjs size={18} />,
    'angular': <SiAngular size={18} />,
    'wordpress': <SiWordpress size={18} />,
    'bootstrap': <SiBootstrap size={18} />,
    'tailwind': <SiTailwindcss size={18} />,
    'css': <SiCss3 size={18} />,
    'gatsby': <SiGatsby size={18} />,
  };

  return iconMap[tech.toLowerCase()] || null;
};

export const MobileProjectLayout = ({ project, slug }: Props) => {
  return (
    <>

      <header className="relative w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
        <div className="section">

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm mb-8 flex-wrap">
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-400 hover:text-secondary-color dark:hover:text-indigo-400 transition-colors"
            >
              Inicio
            </Link>
            <span className="text-gray-400 dark:text-gray-600">/</span>
            <Link
              href="/proyectos-desarrollo-web-y-aplicaciones-moviles"
              className="text-gray-600 dark:text-gray-400 hover:text-secondary-color dark:hover:text-indigo-400 transition-colors"
            >
              Proyectos
            </Link>
            <span className="text-gray-400 dark:text-gray-600">/</span>
            <span className="text-gray-900 dark:text-gray-100 font-semibold capitalize">
              {project.name}
            </span>
          </nav>

          <div className="flex flex-col items-center">
            <div className="relative aspect-[9/16] w-full max-w-sm mx-auto">

             
                <Image
                  src={project.images[0]}
                  alt={project.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              
            </div>

      
            <div className="mt-8 text-center">
              <span className="inline-block px-4 py-1.5 bg-secondary-color dark:bg-indigo-600 text-white text-xs font-semibold rounded-full uppercase tracking-wide mb-3">
                Aplicación Móvil
              </span>
              <h1 className="text-3xl md:text-4xl font-bold capitalize">
                {project.name}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="section py-12 md:py-16">
        <div className="max-w-5xl mx-auto space-y-10">

      
          <section>
            <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
              Acerca del Proyecto
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-4">Tecnologías</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tecnologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-sm font-medium capitalize hover:bg-secondary-color hover:text-white dark:hover:bg-indigo-600 transition-colors duration-200"
                    >
                      {getTechIcon(tech)}
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-4">Descripción</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed text-justify whitespace-pre-line">
                  {project.longDescription}
                </p>
              </div>
            </div>
          </section>

     
          <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 ">
            <h3 className="text-xl font-bold mb-4">Enlaces</h3>

            <div className="grid grid-cols-2 gap-6">
              {
                <Link
                  href={project.urlPlayStore || project.urlApp }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-800 hover:shadow-lg transition-all duration-300 text-sm font-semibold"
                >
                  <FaGooglePlay size={16} />
                  <span className="hidden sm:inline">Play Store</span>
                </Link>
              }

              {
                <Link
                  href={project.urlAppleStore || project.urlApp }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-black dark:hover:bg-gray-600 hover:shadow-lg transition-all duration-300 text-sm font-semibold"
                >
                  <FaApple size={16} />
                  <span className="hidden sm:inline">App Store</span>
                </Link>
              }

            </div>
          </section>

          {project.projectGoal && (
            <section className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4">🎯 Objetivo del Proyecto</h2>
              <p className="text-justify text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {project.projectGoal}
              </p>
            </section>
          )}

          {project.images.length > 1 && (
            <section>
              <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
                Capturas de Pantalla
              </h2>

              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                centeredSlides={true}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                className={`w-full pb-12 ${styles.swiperGallery}`}
              >
                {project.images.slice(1).map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative aspect-[9/16] w-full max-w-xs mx-auto rounded-2xl overflow-hidden">
                      <Image
                        src={image}
                        alt={`${project.name} - captura ${index + 2}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>
          )}          
          {project.hasPrivacyPolicy && (
            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-6 md:p-8 rounded-2xl border border-blue-100 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500 dark:bg-indigo-600 rounded-full flex items-center justify-center">
                  <FaShieldAlt className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Política de Privacidad</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Esta aplicación cuenta con su propia política de privacidad que detalla cómo manejamos y protegemos tus datos.
                  </p>
                  <Link
                    href={`/proyectos/${slug}/privacy-policy`}
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-indigo-400 hover:underline font-semibold"
                  >
                    Ver Política de Privacidad
                    <FaExternalLinkAlt size={14} />
                  </Link>
                </div>
              </div>
            </section>
          )}

          {project.termsOfService && (
            <section className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 p-6 md:p-8 rounded-2xl border border-amber-100 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-500 dark:bg-orange-600 rounded-full flex items-center justify-center">
                  <FaFileContract className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Términos y Condiciones</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Lee los términos de servicio que rigen el uso de esta aplicación y establece los derechos y responsabilidades.
                  </p>
                  <Link
                    href={`/proyectos/${slug}/terms-of-service`}
                    className="inline-flex items-center gap-2 text-amber-600 dark:text-orange-400 hover:underline font-semibold"
                  >
                    Ver Términos y Condiciones
                    <FaExternalLinkAlt size={14} />
                  </Link>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
};
