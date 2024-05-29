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
