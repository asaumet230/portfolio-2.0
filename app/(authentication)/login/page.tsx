import { AuthBackground, LoginForm } from "@/components";

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