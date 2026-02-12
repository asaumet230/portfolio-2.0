import { notFound } from "next/navigation";

import { ExperiencesResponse } from "@/interfaces";

export const getExperiences = async (): Promise<ExperiencesResponse> => {

    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/experiences`, {
            next: {
                revalidate: 86400, // 24 horas en segundos
            }
        });
        const data = await res.json();
        
        return {
            ok: data.ok,
            message: data.message || 'Experiencias obtenidas correctamente',
            experiences: data.experiences,
        };

    } catch (error) {
        console.log(error);
        notFound();
    }
}

export default getExperiences;
