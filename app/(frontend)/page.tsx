import { notFound } from 'next/navigation';

import {
  AboutMeSection,
  ExperienceSection,
  HomeBanner,
  SkillsSection,
  ToolsSection,
  TestimonialsSection,
} from '@/components';

import { ExperiencesResponse, TestimonialsResponse, ToolResponse } from '@/interfaces';

const getTools = async (): Promise<ToolResponse> => {

  try {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/tools`);
    const data: ToolResponse = await res.json();
    return data;

  } catch (error) {
    console.log(error);
    notFound();
  }
}

const getTestimonials = async (): Promise<TestimonialsResponse> => {

  try {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/testimonials`);
    const data: TestimonialsResponse = await res.json()
    return data;

  } catch (error) {
    console.log(error);
    notFound();
  }
}


const getExperiences = async (): Promise<ExperiencesResponse> => {

  try {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/experiences`);
    const data: ExperiencesResponse = await res.json()
    return data;

  } catch (error) {
    console.log(error);
    notFound();
  }


}


export default async function HomePage() {

  const [toolsResponse, testimonialsResponse, experiencesResponse] = await Promise.all([
    getTools(),
    getTestimonials(),
    getExperiences()
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
