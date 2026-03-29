import type { Metadata } from "next";
import dynamic from "next/dynamic";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import {
  AboutMeSection,
  ExperienceSection,
  HomeBanner,
  SkillsSection,
  ToolsSection,
} from '@/components';

import { getTools, getTestimonials, getExperiences } from "@/api";
import { toJsonLd } from "@/helpers";

const TestimonialsSection = dynamic(
  () => import('@/components/sections/home/TestimonialsSection').then((mod) => mod.TestimonialsSection),
  {
    loading: () => <section className="mt-20 mb-20"><div className="section h-48 animate-pulse rounded-2xl bg-slate-100 dark:bg-[#1b2430]" /></section>,
  }
);

export const metadata: Metadata = {
  title: "Desarrollo Web y Desarrollos de Apps | Andres Felipe Saumet",
  description: "Ofrecemos servicios de desarrollo web y desarrollo de apps móviles. Especializado en tecnologías como React, Angular, Node.js, Flutter y más.",
  robots: "index, follow",
  keywords: [
    "desarrolladoras de software",
    "empresa desarrolladora de software",
    "desarrollo web",
    "soluciones web",
    "servicios de desarrollo de software",
    "React",
    "Nextjs",
    "Angular",
    "Node.js",
    "Flutter",
    "desarrollo móvil"
  ],
  openGraph: {
    title: "Desarrollo Web y Desarrollos de Apps | Andres Felipe Saumet",
    description: "Ofrecemos servicios de desarrollo web y desarrollo de apps móviles. Especializado en tecnologías como React, Angular, Node.js, Flutter y más.",
    images: ["https://www.andressaumet.com/_next/image?url=%2Fimages%2Fandres-saumet-dark.webp&w=1200&q=75", "https://www.andressaumet.com/_next/image?url=%2Fimages%2Fandres-saumet-light.webp&w=1200&q=75"],
    url: "https://www.andressaumet.com/",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Desarrollo Web y Desarrollos de Apps | Andres Felipe Saumet",
    description: "Ofrecemos servicios de desarrollo web y desarrollo de apps móviles. Especializado en tecnologías como React, Angular, Node.js, Flutter y más.",
    images: ["https://www.andressaumet.com/_next/image?url=%2Fimages%2Fandres-saumet-dark.webp&w=1200&q=75", "https://www.andressaumet.com/_next/image?url=%2Fimages%2Fandres-saumet-light.webp&w=1200&q=75"],
  }
}

export default async function HomePage() {

  const [toolsResponse, testimonialsResponse, experiencesResponse] = await Promise.all([
    getTools(),
    getTestimonials(),
    getExperiences(),
  ]);

  const homeSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://www.andressaumet.com/#person',
        name: 'Andres Felipe Saumet',
        url: 'https://www.andressaumet.com/',
        image: 'https://www.andressaumet.com/images/andres-saumet-light.webp',
        jobTitle: 'Desarrollador Web y Móvil Full Stack',
        sameAs: [
          'https://www.linkedin.com/in/andresfelipesaumet/',
          'https://github.com/asaumet230',
          'https://x.com/SaumetAndres',
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://www.andressaumet.com/#service',
        name: 'Andres Saumet Web & Mobile Developer',
        url: 'https://www.andressaumet.com/',
        description: 'Servicios de desarrollo web y aplicaciones móviles con Next.js, React, Node.js, Flutter y TypeScript.',
        provider: {
          '@id': 'https://www.andressaumet.com/#person',
        },
        areaServed: 'CO',
        serviceType: ['Desarrollo web', 'Aplicaciones móviles', 'SEO técnico', 'Desarrollo full stack'],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.andressaumet.com/#website',
        url: 'https://www.andressaumet.com/',
        name: 'Andres Saumet',
        inLanguage: 'es-CO',
        publisher: {
          '@id': 'https://www.andressaumet.com/#person',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(homeSchema) }}
      />
      <HomeBanner />
      <main>
        <ToolsSection tools={toolsResponse.tools} />
        <SkillsSection />
        <ExperienceSection experiencies={experiencesResponse.experiences} />
        <AboutMeSection />
        <TestimonialsSection testimonials={testimonialsResponse.testimonials} />
      </main>

    </>
  );
}
