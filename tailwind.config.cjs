/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
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
}
