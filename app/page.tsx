import { HomeBanner, SkillsSection, ToolsSection } from '@/components';
import ExperienceSection from '@/components/sections/home/ExperienceSection';


export default function HomePage() {
  return (
    <main>
      <HomeBanner />
      <ToolsSection />
      <SkillsSection />
      <ExperienceSection />
    </main>
  );
}
