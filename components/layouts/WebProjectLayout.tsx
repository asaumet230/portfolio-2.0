import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaShieldAlt } from 'react-icons/fa';
import { SiFlutter, SiDart, SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiNodedotjs, SiAngular, SiWordpress, SiBootstrap, SiTailwindcss, SiCss3, SiGatsby } from 'react-icons/si';
import { IProject } from '@/interfaces';
import { Separator } from '@/components';

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

export const WebProjectLayout = ({ project, slug }: Props) => {
  return (
    <>
      {/* Breadcrumbs */}
      <nav className="section pt-8 pb-4">
        <div className="flex items-center gap-2 text-sm flex-wrap">
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
        </div>
      </nav>

      <header className="relative w-full h-[60vh] min-h-[450px] max-h-[600px] overflow-hidden">
        <Image
          src={project.images[0]}
          alt={project.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </header>

      <main className="section py-12 md:py-16">
          
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

            <div className="lg:col-span-2 space-y-10">

            <div className="space-y-3">
              <span className="inline-block px-4 py-1.5 bg-secondary-color dark:bg-indigo-600 text-white text-xs font-semibold rounded-full uppercase tracking-wide">
                Desarrollo Web
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black capitalize drop-shadow-lg dark:text-gray-300 ">
                {project.name}
              </h1>
            </div>

                <section>
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-secondary-color dark:bg-indigo-600 rounded-full"></span>
                    Acerca del Proyecto
                  </h2>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-justify text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {project.description}
                    </p>
                  </div>
                </section>
              

              {/* Galería de imágenes mejorada - Grid 2 columnas */}
              {project.images.length >= 1 && (
                <section>
                  <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-secondary-color dark:bg-indigo-600 rounded-full"></span>
                    Galería del Proyecto
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.images.slice(0).map((image, index) => (
                      <div
                        key={index}
                        className="group relative h-64 overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300">
                        <Image
                          src={image}
                          alt={`${project.name} - captura ${index + 2}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"/>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>
                    ))}
                  </div>
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
                        href={`/proyectos/${slug}/privacy`}
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-indigo-400 hover:underline font-semibold">
                        Ver Política de Privacidad
                        <FaExternalLinkAlt size={14} />
                      </Link>
                    </div>
                  </div>
                </section>
              )}
            </div>

            <aside className="lg:col-span-1 space-y-6">

              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 sticky top-6">
                <h3 className="text-xl font-bold mb-4">Tecnologías</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tecnologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-sm font-medium capitalize hover:bg-secondary-color hover:text-white dark:hover:bg-indigo-600 transition-colors duration-200">
                      {getTechIcon(tech)}
                      {tech}
                    </span>
                  ))}
                </div>

                <Separator />

                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-3">Objetivo del Proyecto</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {project.projectGoal}
                  </p>
                </div>

                <Separator />
              
                <div className="space-y-3 mt-6">
                  <h3 className="text-xl font-bold mb-4">Enlaces</h3>

                  {project.urlApp && (
                    <Link
                      href={project.urlApp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full px-6 py-3.5 bg-secondary-color dark:bg-indigo-600 text-white rounded-xl hover:bg-opacity-90 hover:shadow-lg transition-all duration-300 font-semibold">
                      <FaExternalLinkAlt size={18} />
                      Ver Web
                    </Link>
                  )}
  
                </div>

  
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Tipo de Proyecto</p>
                    <p className="capitalize">Aplicación Web</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};
