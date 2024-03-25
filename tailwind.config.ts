import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'primary-color': '#1D1A39',
        'secondary-color': '#451952',
        'tertiary-color': '#662549',
        'quaternary-color': '#AE445A',
        'quinary-color': '#F39F5A',
        'senary-color': '#E8BCB9',
      }
    },
  },
  plugins: [],
};
export default config;
