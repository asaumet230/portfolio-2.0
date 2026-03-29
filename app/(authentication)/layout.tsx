import React from 'react';
import ReCaptchaProvider from '@/components/providers/ReCaptchaProvider';

export default function AuthenticationLayout({ children }: { children: React.ReactNode; }) {
  return <ReCaptchaProvider>{children}</ReCaptchaProvider>;
}
