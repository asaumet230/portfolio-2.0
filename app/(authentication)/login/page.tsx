import { Metadata } from "next";

import { AuthBackground, LoginForm } from "@/components";


export const metadata: Metadata = {
  title: "Iniciar Sesión | Andres Felipe Saumet",
  description: "Accede a tu cuenta ingresando tus credenciales.",
  keywords: "iniciar sesión, login, acceder, cuenta, usuario, contraseña",
  robots: "index, follow",
  openGraph: {
    title: "Iniciar Sesión | Andres Felipe Saumet",
    description: "Accede a tu cuenta ingresando tus credenciales.",
    url: "https://www.andressaumet.com/login",
    type: "website",
    images: [
      {
        url: "https://www.andressaumet.com/_next/image?url=%2Fimages%2Fandres-saumet-dark.webp&w=1200&q=75",
        width: 800,
        height: 600,
        alt: "Iniciar Sesión | Andres Felipe Saumet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iniciar Sesión | Andres Felipe Saumet",
    description: "Accede a tu cuenta ingresando tus credenciales.",
    images: [
      {
        url: "https://www.andressaumet.com/_next/image?url=%2Fimages%2Fandres-saumet-dark.webp&w=1200&q=75",
        alt: "Iniciar Sesión | Andres Felipe Saumet",
      },
    ],
  },
};

export default function LoginPage() {

  return (
    <main>
      <div className="h-screen bg-gray-100 flex dark:bg-gradient-to-tr to-[#262f3a] from-[#0d1117] dark:text-slate-300">

        <AuthBackground
          image={"/images/login-background.webp"}
          title={"Bienvenido de Nuevo"}
          message={"Por favor, ingresa tus credenciales para acceder a tu cuenta. Nos alegra verte de nuevo."} />

        <LoginForm />
      </div>
    </main>
  );
}