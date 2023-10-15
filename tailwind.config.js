/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      keyframes: {
        fade: {
          "0%": {
            transform: "scale(3)",
            opacity: 0,
          },
          "50%": {
            transform: "scale(2)",
          },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
      animation: {
        fade: "fade 1.5s ease-in-out 1",
      },
    },
  },
  plugins: [
    plugin(({ theme, addUtilities }) => {
      const neonUtilities = {};
      const colors = theme("colors");
      for (const color in colors) {
        const color1 = colors[color]["500"];
        const color2 = colors[color]["700"];
        neonUtilities[`.neon-${color}`] = {
          boxShadow: `0 0 5px ${color1}, 0 0 20px ${color2}`,
        };
      }
      addUtilities(neonUtilities);
    }),
  ],
};
