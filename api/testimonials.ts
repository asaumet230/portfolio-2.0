import { notFound } from "next/navigation";

import { TestimonialsResponse } from "@/interfaces";

export const getTestimonials = async (): Promise<TestimonialsResponse> => {

    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/testimonials`, {

            next: {
                revalidate: 86400, // 24 horas en segundos
            }
        });
        const data = await res.json();
        
        return {
            ok: data.ok,
            message: data.message || 'Testimonios obtenidos correctamente',
            testimonials: data.testimonials,
        };

    } catch (error) {
        console.log(error);
        notFound();
    }
}

export default getTestimonials;
