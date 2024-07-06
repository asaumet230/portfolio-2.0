import { notFound } from 'next/navigation';

import { 
  AboutMeSection,
  ExperienceSection,
  HomeBanner, 
  SkillsSection, 
  ToolsSection,
  TestimonialsSection, 
} from '@/components';

import { TestimonialsResponse, ToolResponse } from '@/interfaces';

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

const getTestimonials = async () => {

  try {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/testimonials`);
    const data:TestimonialsResponse = await res.json()
    return data;
    
  } catch (error) {

    console.log(error);
    notFound();
  }
}



export default async function HomePage(){

  const { tools } = await getTools();
  const { testimonials } = await getTestimonials();

  return (
    <>
      <HomeBanner />
      <main>
        <ToolsSection tools={tools}/>
        <SkillsSection />
        <ExperienceSection />
        <AboutMeSection />
        <TestimonialsSection  testimonials={testimonials}/>
      </main>
    </>
  );
}
