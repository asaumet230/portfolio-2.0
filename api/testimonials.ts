import { notFound } from "next/navigation";
import { TestimonialsResponse } from "@/interfaces";

export const getTestimonials = async (): Promise<TestimonialsResponse> => {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/testimonials`, {
            signal: controller.signal,
            next: {
                revalidate: 86400,
            }
        });
        
        clearTimeout(timeout);
        const data = await res.json();
        
        return {
            ok: data.ok,
            message: data.message || 'Testimonios obtenidos correctamente',
            testimonials: data.testimonials || [],
        };

    } catch (error) {
        console.log('Error fetching testimonials:', error);
        return {
            ok: false,
            message: 'Error al obtener testimonios',
            testimonials: [],
        };
    }
}

export default getTestimonials;
