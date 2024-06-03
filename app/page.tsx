import { 
  AboutMeSection,
  ExperienceSection,
  HomeBanner, 
  SkillsSection, 
  ToolsSection,
  TestimonialsSection, 
} from '@/app/components';



export default function HomePage() {
  return (
    <main>
      <HomeBanner />
      <ToolsSection />
      <SkillsSection />
      <ExperienceSection />
      <AboutMeSection />
      <TestimonialsSection />
    </main>
  );
}
