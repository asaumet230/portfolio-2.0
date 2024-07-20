export interface ITestimonial {
    name: string;
    content: string;
    major: string;
    url?: string;
    image: string;
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
}

export interface TestimonialsResponse {
    ok: boolean;
    message: string;
    testimonials: ITestimonial[];
}
