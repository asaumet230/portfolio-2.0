import { 
  AboutMeSection,
  ExperienceSection,
  HomeBanner, 
  SkillsSection, 
  ToolsSection 
} from '@/components';



export default function HomePage() {
  return (
    <main>
      <HomeBanner />
      <ToolsSection />
      <SkillsSection />
      <ExperienceSection />
      <AboutMeSection />
    </main>
  );
}
