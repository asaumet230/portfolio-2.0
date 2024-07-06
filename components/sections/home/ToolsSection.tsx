import Image from 'next/image';

import { ProgressBar, Separator } from "@/components/ui";
import { ITool } from '@/interfaces';


interface Props {
  tools: ITool[];
}

export const ToolsSection = ({ tools }: Props) => {

  return (

    <section className="mt-20">
      <div className="section">
        <h2 className="text-4xl text-center mb-1 max-[920px]:text-3xl max-[920px]:mb-0">Herramientas</h2>
        <div className="flex justify-center">
          <Separator />
        </div>

        <p className="w-11/12 text-center mx-auto max-[920px]:w-full">Explora los lenguajes de programación y herramientas que impulsan mi trabajo. Uso potentes frameworks que convierten mis ideas en realidad. Estas tecnologías no solo son herramientas, son fuentes de inspiración para mi crecimiento profesional.</p>


        <div className="grid grid-cols-3 my-10 gap-4 mx-auto max-[920px]:grid-cols-2">
          {
            tools.map(({ image, title, progress }) => (
              <div className="pt-4 pb-5 flex flex-col justify-center items-center" key={image}>
                <Image
                  src={image}
                  alt={title}
                  width={70}
                  height={70} 
                  priority={ false}
                  />
                <h3 className="my-3 capitalize text-xl">{title}</h3>
                <ProgressBar progress={progress} />
              </div>
            ))
          }
        </div>

      </div>
    </section>

  )
}

export default ToolsSection;