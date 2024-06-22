'use client'

import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';


export default function AuthenticationLayout({ children }: { children: React.ReactNode; }) {

  const recaptchaKey: string | undefined = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? 'NOT RECAPTCHA KEY';

  return (
    <>
      <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
        {children}
      </GoogleReCaptchaProvider>
    </>
  );
}