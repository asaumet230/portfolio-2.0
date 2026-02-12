import { notFound } from "next/navigation";
import { ExperiencesResponse } from "@/interfaces";

export const getExperiences = async (): Promise<ExperiencesResponse> => {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/experiences`, {
            signal: controller.signal,
            next: {
                revalidate: 86400,
            }
        });
        
        clearTimeout(timeout);
        const data = await res.json();
        
        return {
            ok: data.ok,
            message: data.message || 'Experiencias obtenidas correctamente',
            experiences: data.experiences || [],
        };

    } catch (error) {
        console.log('Error fetching experiences:', error);
        return {
            ok: false,
            message: 'Error al obtener experiencias',
            experiences: [],
        };
    }
}

export default getExperiences;
