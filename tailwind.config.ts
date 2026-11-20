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
        background: "var(--background)",
        surface: "var(--surface)",
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
          light: "var(--primary-light)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          hover: "var(--secondary-hover)",
        },
        teal: {
          DEFAULT: "var(--teal)",
          light: "var(--teal-light)",
        },
        lavender: {
          DEFAULT: "var(--lavender)",
          light: "var(--lavender-light)",
        },
        sky: {
          DEFAULT: "var(--sky)",
          soft: "var(--sky-soft)",
        },
        text: {
          main: "var(--text-main)",
          body: "var(--text-body)",
          muted: "var(--text-muted)",
        },
        border: "var(--border)",
      },
      fontFamily: {
        heading: ["var(--font-manrope)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      borderRadius: {
        xl: "14px",
        "2xl": "18px",
        "3xl": "24px",
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(32, 44, 60, 0.04)",
        card: "0 4px 20px -2px rgba(32, 44, 60, 0.06)",
        hover: "0 10px 30px -4px rgba(32, 44, 60, 0.1)",
        glow: "0 0 25px rgba(49, 91, 130, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
