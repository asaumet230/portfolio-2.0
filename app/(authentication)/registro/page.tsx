import { AuthBackground, RegisterForm, } from "@/components";

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