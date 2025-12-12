import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Height classes that come dynamically from CMS
    "h-32",
    "h-36",
    "h-40",
    "h-28",
    "h-30",
    "h-44",
    "h-48",
    "h-52",
    "h-56",
    "h-60",
    "h-64",
    "h-72",
    "h-80",
    "h-96",
  ],
  theme: {
    extend: {
      colors: {
        primario: "var(--color-primario)",
        secundario: "var(--color-secundario)",
        suave: "var(--color-suave)",
        blanco: "var(--color-blanco)",
        destacado: "var(--color-destacado)",
      },
    },
  },
};
export default config;
