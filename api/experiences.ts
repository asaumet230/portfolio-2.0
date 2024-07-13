import { notFound } from "next/navigation";

import { ExperiencesResponse } from "@/interfaces";

export const getExperiences = async (): Promise<ExperiencesResponse> => {

    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/experiences`, {
            next: {
                revalidate: 86400, // 24 horas en segundos
            }
        });
        const data: ExperiencesResponse = await res.json()
        return data;

    } catch (error) {
        console.log(error);
        notFound();
    }
}

export default getExperiences;