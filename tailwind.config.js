/** @type {import('tailwindcss').Config} */
module.exports = {
  // mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /grid-cols-.+/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /row-start-.+/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /row-span-.+/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /col-start-.+/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /col-span-.+/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
  ],
  theme: {
    extend: {
      colors: {
        pwhite: {
          100: '#F3F3F3',
          200: '#F3F3F3',
          300: '#F3F3F3',
          400: '#F3F3F3',
          500: '#F3F3F3',
          600: '#F3F3F3',
          700: '#F3F3F3',
          800: '#F3F3F3',
          900: '#F3F3F3',
          DEFAULT: '#F3F3F3'
        },
        pdarkgreen: {
          100: '#27353A',
          200: '#27353A',
          300: '#27353A',
          400: '#27353A',
          500: '#27353A',
          600: '#27353A',
          700: '#27353A',
          800: '#27353A',
          900: '#27353A',
          DEFAULT: '#27353A'
        },
        pblue: {
          100: '#A8CEE0',
          200: '#A8CEE0',
          300: '#A8CEE0',
          400: '#A8CEE0',
          500: '#A8CEE0',
          600: '#A8CEE0',
          700: '#A8CEE0',
          800: '#A8CEE0',
          900: '#A8CEE0',
          DEFAULT: '#A8CEE0'
        },
        plightgreen: {
          100: '#00E38C',
          200: '#00E38C',
          300: '#00E38C',
          400: '#00E38C',
          500: '#00E38C',
          600: '#00E38C',
          700: '#00E38C',
          800: '#00E38C',
          900: '#00E38C',
          DEFAULT: '#00E38C'
        }
      },
      gridRowStart: {
        '8': '8',
        '9': '9',
        '10': '10',
        '11': '11',
        '12': '12',
        '13': '13',
      },
      gridTemplateRows: {
        'auto-4': 'repeat(4, 100px) auto',
        'auto-5': 'repeat(5, 100px) auto',
        'auto-6': 'repeat(6, 100px) auto',
        'auto-7': 'repeat(7, 100px) auto',
        'auto-8': 'repeat(8, 100px) auto',
        'auto-9': 'repeat(9, 100px) auto',
        'auto-10': 'repeat(10, 100px) auto',
      }
    },
  },
  plugins: [],
}
