import { 
  AboutMeSection,
  ExperienceSection,
  HomeBanner, 
  SkillsSection, 
  ToolsSection,
  TestimonialsSection, 
} from '@/components';



export default function HomePage() {
  return (
    <>
      <HomeBanner />
      <main>
        <ToolsSection />
        <SkillsSection />
        <ExperienceSection />
        <AboutMeSection />
        <TestimonialsSection />
      </main>
    </>
  );
}
