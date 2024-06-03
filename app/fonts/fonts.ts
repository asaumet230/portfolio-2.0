import { Lato, League_Spartan } from "next/font/google";

export const lato = Lato({
    weight: ['100', '300', '400', '700', '900'],
    style:['normal', 'italic'],
    subsets: ['latin'],
    variable: '--font-lato',
});
  

export const leagueOfSpartan = League_Spartan({
    weight: ['100', '300', '400', '700', '900'],
    style:['normal'],
    subsets: ['latin'],
    variable: '--font-league-spartan',
});
  