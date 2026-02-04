import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1B3D2F",
          dark: "#152E24",
          light: "#2D5A47",
          accent: "#C4D84A",
        },
        sage: {
          50: "#F5F7F5",
          100: "#E8F0E8",
          200: "#E0E5E0",
          300: "#B2C4B2",
          400: "#778573",
          500: "#4A7C59",
        },
        earth: {
          100: "#F9F9F7",
          200: "#B2AF9B",
          300: "#A98E6A",
          400: "#916E4A",
          500: "#685741",
          600: "#4C301C",
          700: "#1A120D",
        },
      },
      fontFamily: {
        sans: ["Inter", "SF Pro", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)",
        modal: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
