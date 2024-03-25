import { Lato, Montserrat } from "next/font/google";

export const lato = Lato({
    weight: ['100', '300', '400', '700', '900'],
    style:['normal', 'italic'],
    subsets: ['latin'],
    variable: '--font-lato',
});
  

export const monserrat = Montserrat({
    weight: ['100', '300', '400', '700', '900'],
    style:['normal', 'italic'],
    subsets: ['latin'],
    variable: '--font-monserrat',
});
  