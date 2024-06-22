import { AuthBackground, LoginForm } from "@/components";

export default function LoginPage() {


  return (
    <main>
      <div className="h-screen bg-gray-100 flex">
        
        <AuthBackground 
          image={"/images/login-background.webp"} 
          title={"Bienvenido de Nuevo"} 
          message={"Por favor, ingresa tus credenciales para acceder a tu cuenta. Nos alegra verte de nuevo."} />
        
        <LoginForm />
      </div>
    </main>
  );
}