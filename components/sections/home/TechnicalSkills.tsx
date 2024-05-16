import { ProgressBar, Separator } from "@/components/ui";
import Image from 'next/image';


export const TechnicalSkills = () => {
  return (
    
    <section className="mt-14">
        <div className="section">
          <h2 className="text-4xl text-center mb-1 max-[920px]:text-3xl max-[920px]:mb-0">Herramientas</h2>
          <div className="flex justify-center">
              <Separator />
          </div>

          <p className="max-[920px]:text-center">Explora los lenguajes de programación y herramientas que impulsan mi trabajo. Descubre potentes frameworks y plataformas que convierten mis ideas en realidad. Estas tecnologías no solo son herramientas, son fuentes de inspiración para mi crecimiento profesional.</p>
          
          
            <div className="grid grid-cols-3 my-10 gap-4 mx-auto max-[920px]:grid-cols-2 ">
              <div className="pt-4 pb-4 flex flex-col justify-center items-center">
                <Image 
                  src="/images/tools/javascript.webp" 
                  alt="javascript" 
                  width={90} 
                  height={90}/>
                  <h3 className="my-3">Javascript</h3>
                  <ProgressBar progress={80} />
              </div>
              <div className="pt-4 pb-4 flex flex-col justify-center items-center">
                <Image 
                  src="/images/tools/typescript.webp" 
                  alt="Typescript" 
                  width={90} 
                  height={90}/>
                  <h3 className="my-3">Typescript</h3>
                  <ProgressBar progress={70} />
              </div>
              <div className="pt-4 pb-4 flex flex-col justify-center items-center">
                <Image 
                  src="/images/tools/dart.webp" 
                  alt="dart" 
                  width={90} 
                  height={90}/>
                  <h3 className="my-3">Dart</h3>
                  <ProgressBar progress={75} />
              </div>
          
             
            </div>
          
      
        </div>
    </section>
   
  )
}

export default TechnicalSkills;