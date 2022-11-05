/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern: /(row|col)-(span|start|end)-[1-2]?[0-9]/,
    }
  ],
  theme: {
    extend: {
      colors: {
        'panal': {
          '100': '#728f97',
          '200': '#5b7d86',
          '300': '#436a75',
          '400': '#2c5863',
          '500': '#144552',
          '700': '#0e3039',
        },
      }
    },
  },
  plugins: [],
};
