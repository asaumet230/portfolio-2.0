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

  const schema = {
    "@context": "http://schema.org",
    "@type": "Person",
    "name": "Andres Felipe Saumet",
    "url": "https://www.andressaumet.com/",
    "jobTitle": ["Desarrollador Web", "Desarrollador Móvil"],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Universidad del Norte",
      "additionalType": "EducationalOrganization",
      "educationalCredentialAwarded": "Especialización en Evaluación Financiera y de Proyectos"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Santa Marta, Colombia"
    },
    "email": "contacto@andressaumet.com",
    "telephone": "+57-300-123-4567",
    "skill": [
      "HTML", "CSS", "JavaScript", "TypeScript", "React", "Angular", "Node.js", "Dart", "Flutter", "Next.js", "Docker", "Kubernetes", "Git", "PostgreSQL", "MongoDB"
    ],
    "hasOccupation": [
      {
        "@type": "Occupation",
        "name": "Freelance Web & Mobile Developer",
        "yearsInOccupation": 4
      }
    ],
    "memberOf": {
      "@type": "Organization",
      "name": "Freelance Developer Community"
    }
  }


  const [toolsResponse, testimonialsResponse, experiencesResponse] = await Promise.all([
    getTools(),
    getTestimonials(),
    getExperiences(),
  ]);

  return (
    <>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

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
