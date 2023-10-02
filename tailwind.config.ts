import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern: /(row|col|grid)-(span|start|end|rows|cols)-[1-2]?[0-9]/,
      variants: ["md"],
    },
    {
      pattern: /hidden|block/,
      variants: ["xl", "lg", "md", "sm", "xs"],
    },
  ],
  theme: {
    extend: {
      colors: {
        panal: {
          "100": "#728f97",
          "200": "#5b7d86",
          "300": "#436a75",
          "400": "#2c5863",
          "500": "#144552",
          "700": "#0e3039",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
