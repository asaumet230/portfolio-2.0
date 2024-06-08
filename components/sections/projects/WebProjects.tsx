import ProjectDescription from "./ProjectDescription";

export const WebProjects = () => {
  return (
    <section className="mb-14 py-12 bg-slate-50">

      <div className="section pb-8">
        <h2 className="text-center">Soluciones Web Avanzadas</h2>
        <p className="font-light text-center first-letter:capitalize">mis soluciones web estan diseñadas para maximizar la usabilidad y la eficacia. Cada proyecto destaca por su enfoque innovador y técnico en el desarrollo web.</p>
      </div>

      <div className="grid grid-cols-3 gap-8 w-9/12 mt-4 mx-auto max-[920px]:grid-cols-2 max-[640px]:grid-cols-1">

          <ProjectDescription />
          <ProjectDescription />
          <ProjectDescription />
       

      </div>
    </section>
  )
}

export default WebProjects;