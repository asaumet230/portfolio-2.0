import { ProgressBar, Separator } from "@/components/ui";
import { toolsData } from "@/helpers";
import Image from 'next/image';


export const ToolsSection = () => {
  return (

    <section className="mt-14">
      <div className="section">
        <h2 className="text-4xl text-center mb-1 max-[920px]:text-3xl max-[920px]:mb-0">Herramientas</h2>
        <div className="flex justify-center">
          <Separator />
        </div>

        <p className="max-[920px]:text-center">Explora los lenguajes de programación y herramientas que impulsan mi trabajo. Descubre potentes frameworks y plataformas que convierten mis ideas en realidad. Estas tecnologías no solo son herramientas, son fuentes de inspiración para mi crecimiento profesional.</p>


        <div className="grid grid-cols-3 my-10 gap-4 mx-auto max-[920px]:grid-cols-2 ">
          {
            toolsData.map(({ imageUrl, title, progressPercent }) => (
              <div className="pt-4 pb-5 flex flex-col justify-center items-center" key={imageUrl}>
                <Image
                  src={imageUrl}
                  alt={title}
                  width={90}
                  height={90} />
                <h3 className="my-3 capitalize">{title}</h3>
                <ProgressBar progress={progressPercent} />
              </div>
            ))
          }
        </div>

      </div>
    </section>

  )
}

export default ToolsSection;