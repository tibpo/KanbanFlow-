import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "Segoe UI", "sans-serif"],
      },
      colors: {
        cream: "#FAF8F5",
        crimson: {
          DEFAULT: "#9F1239",
          dark: "#881337",
          light: "#FFF1F2",
          border: "#FECDD3",
        },
        stoneink: "#1C1917",
      },
    },
  },
  plugins: [],
};

export default config;
