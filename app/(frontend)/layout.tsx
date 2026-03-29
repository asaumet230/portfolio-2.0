import FrontendShell from '@/components/layouts/FrontendShell';

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return <FrontendShell>{children}</FrontendShell>;
}
