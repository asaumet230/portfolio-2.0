import { AuthBackground, RegisterForm, } from "@/components";

export default function RegistrarsePage() {

  return (
    <main>
      <div className="h-screen bg-gray-100 flex">

        <AuthBackground
          image={"/images/register-background.webp"}
          title={"Crea tu cuenta"}
          message={"Únete a nuestra comunidad. Completa el formulario para crear tu cuenta y comenzar a disfrutar de todos nuestros beneficios."} />

        <RegisterForm />
      </div>
    </main>
  );
}