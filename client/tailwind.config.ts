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
        "hero-pattern": "url('/sparkles.jpg')",
      },
      colors: {
        pink: "#F13AB1",
        red: "#E72744",
        orange: "#FD913C",
        flame: "#F05524",
        metal: "#29303E",
      },

      keyframes: {
        "translate-animation": {
          "0%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(20px, -20px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      transitionProperty: {
        width: "width",
      },
      height: {
        "screen-75": "75vh",
      },
    },
    animation: {
      translate: "translate-animation 1.5s linear infinite",
      spin: "spin 1s linear infinite",
    },
  },
  plugins: [],
};
export default config;
