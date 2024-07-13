import { MobilProjects, Separator, WebProjects } from "@/components";
import { getProjects } from "@/api";

export default async function PageTrabajos() {

  const webProjects = await getProjects('web');
  const mobilProjects = await getProjects('mobil');

  return (
    <>
      <header className="section">
        <div className="mt-14 mb-14">
          <h1 className="text-center">Proyectos Destacados Web y Móvil</h1>
          <div className="flex justify-center">
            <Separator />
          </div>
          <p className="text-justify">
            Bienvenido a la sección de <strong>Proyectos Destacados</strong>, donde presento una selección de mis trabajos más exitosos en <strong>desarrollo web</strong> y <strong>móvil</strong>. Aquí descubrirás cómo mis soluciones <strong>innovadoras</strong> han transformado ideas en <strong>aplicaciones impactantes</strong> y funcionalidades <strong>robustas</strong> que mejoran la <strong>experiencia del usuario</strong>. Explora cada proyecto para entender el alcance de mis habilidades técnicas y mi enfoque creativo en la solución de problemas complejos.
          </p>
        </div>
      </header>
      <main>
        <WebProjects projects={webProjects.projects} />
        <MobilProjects projects={mobilProjects.projects} />
      </main>
    </>
  )
}
