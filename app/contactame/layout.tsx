'use client'

import React from 'react';
import { GoogleReCaptchaProvider } from '@google-recaptcha/react';

export default function ContactameLayout({ children }: { children: React.ReactNode; }) {
  return (
    <>
      <GoogleReCaptchaProvider 
          type="v2-checkbox"
        siteKey="6Lchwd0cAAAAAJY52mW2Ywal7dWzLs1_dooY3wRY">
          { children }
      </GoogleReCaptchaProvider>
    </>
  );
}