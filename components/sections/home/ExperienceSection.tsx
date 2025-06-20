import { ExperienceItemSection, Separator } from "@/components";
import { IExperience } from "@/interfaces";


interface Props {
    experiencies: IExperience[];
}

export const ExperienceSection = ({ experiencies = []}:Props) => {

    
    return (
        <section className="mt-20">
            <div className="section">
                <h2 className="text-4xl text-center mb-1 max-[920px]:text-3xl max-[920px]:mb-0">Experiencia</h2>
                <div className="flex justify-center">
                    <Separator />
                </div>
                <p className="w-10/12 text-left mx-auto max-[920px]:w-full max-[920px]:text-center">Descubre mi experiencia laboral da un recorrido por los roles y proyectos que han moldeado mi carrera y ampliado mi pericia técnica.</p>
                <table className="table-auto w-10/12 mx-auto mt-14 mb-10 max-[640px]:w-full ">
                    <thead>
                        <tr className="border-b border-b-gray-200">
                            <th className="pb-4 text-left uppercase font-semibold tracking-widest pl-2 max-[620px]:text-sm">compañia</th>
                            <th className="pb-4 text-left uppercase font-semibold tracking-widest max-[620px]:text-sm">cargo</th>
                            <th className="pb-4 text-left uppercase font-semibold tracking-widest max-[620px]:text-sm">año</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {
                        experiencies.map((experience)=> (
                                <ExperienceItemSection key={experience.url} {...experience}/>
                            ))
                        }
                        
                    </tbody>
                </table>

            </div>
        </section>
    )
}

export default ExperienceSection;