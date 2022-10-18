/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'panal': {
          '500': '#144552',
          '700': '#0e3039',
        },
      }
    },
  },
  plugins: [],
}
