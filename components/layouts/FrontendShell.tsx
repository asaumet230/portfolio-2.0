'use client'

import dynamic from 'next/dynamic';
import { Footer, Navbar } from '@/components';
import { CookieBanner } from '@/components/ui/CookieBanner';

const SearchModal = dynamic(() => import('@/components/ui/SearchModal').then((mod) => mod.SearchModal), {
  ssr: false,
});

const Sidebar = dynamic(() => import('@/components/menus/sidebars/Sidebar').then((mod) => mod.Sidebar), {
  ssr: false,
});

const SocialShareSidebar = dynamic(
  () => import('@/components/ui/SocialShareSidebar').then((mod) => mod.SocialShareSidebar),
  { ssr: false }
);

export default function FrontendShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark:bg-gradient-to-tr to-[#262f3a] from-[#0d1117] dark:text-slate-300">
      <SearchModal />
      <Sidebar />
      <Navbar />
      <SocialShareSidebar />
      {children}
      <CookieBanner />
      <Footer />
    </div>
  );
}
