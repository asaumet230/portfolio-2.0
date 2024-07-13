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
  title: "Desarrollador Web & Movíl | Andres Felipe Saumet",
  description: "Desarrollo magnificas aplicaciones",
};

export default async function HomePage() {

  const [ toolsResponse, testimonialsResponse, experiencesResponse ] = await Promise.all([
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
