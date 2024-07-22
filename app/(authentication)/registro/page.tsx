import { Metadata } from "next";

import { AuthBackground, RegisterForm, } from "@/components";

export const metadata: Metadata = {
  title: "Registro | Andres Felipe Saumet",
  description: "Crea tu cuenta y únete a nuestra comunidad.",
  keywords: "registro, crear cuenta, unirse, comunidad, beneficios",
  robots: "index, follow",
  openGraph: {
    title: "Registro | Andres Felipe Saumet",
    description: "Crea tu cuenta y únete a nuestra comunidad.",
    url: "https://www.andressaumet.com/registro",
    type: "website",
    images: [
      {
        url: "https://www.andressaumet.com/_next/image?url=%2Fimages%2Fandres-saumet-dark.webp&w=1200&q=75",
        width: 800,
        height: 600,
        alt: "Registro | Andres Felipe Saumet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Registro | Andres Felipe Saumet",
    description: "Crea tu cuenta y únete a nuestra comunidad.",
    images: [
      {
        url: "https://www.andressaumet.com/_next/image?url=%2Fimages%2Fandres-saumet-dark.webp&w=1200&q=75",
        alt: "Registro | Andres Felipe Saumet",
      },
    ],
  },
};

export default function RegistrarsePage() {

  return (
    <main>
      <div className="h-screen flex bg-gray-100 dark:bg-gradient-to-tr to-[#262f3a] from-[#0d1117] dark:text-slate-300">

        <AuthBackground
          image={"/images/register-background.webp"}
          title={"Crea tu cuenta"}
          message={"Únete a nuestra comunidad. Completa el formulario para crear tu cuenta y comenzar a disfrutar de todos nuestros beneficios."} />

        <RegisterForm />
      </div>
    </main>
  );
}