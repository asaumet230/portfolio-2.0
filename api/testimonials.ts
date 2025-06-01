import { notFound } from "next/navigation";

import { TestimonialsResponse } from "@/interfaces";

export const getTestimonials = async (): Promise<TestimonialsResponse> => {

    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/testimonials`, {

            next: {
                revalidate: 86400, // 24 horas en segundos
            }
        });
        const data: TestimonialsResponse = await res.json()
        return data;

    } catch (error) {
        console.log(error);
        notFound();
    }
}

export default getTestimonials;