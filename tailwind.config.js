const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.zinc,
      },
      fontFamily: {
        bitter: ['Bitter', 'sans-serif'],
        comfortaa: ['Comfortaa', 'sans-serif'],
        'crimson-pro': ['CrimsonPro', 'sans-serif'],
        pixelify: ['PixelifySans', 'sans-serif'],
        nunito: ['NunitoSans', 'sans-serif'],
        'source-code-pro': ['SourceCodePro', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
