import ReCaptchaProvider from '@/components/providers/ReCaptchaProvider';

export default function DeleteAccountLayout({ children }: { children: React.ReactNode }) {
  return <ReCaptchaProvider>{children}</ReCaptchaProvider>;
}
