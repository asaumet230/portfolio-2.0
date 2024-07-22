import type { Metadata } from "next";

import {
  AboutMeSection,
  ExperienceSection,
  HomeBanner,
  SkillsSection,
  ToolsSection,
  TestimonialsSection,
} from '@/components';

import { getTools, getTestimonials, getExperiences } from "@/api";

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

  return (
    <>
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
