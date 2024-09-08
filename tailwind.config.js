/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    screens: {
      ...defaultTheme.screens,
      'md': '900px',
      '3md': '700px',
      '2md': '680px',
      'xs': '550px',
      '2xs': '350px',
    },
    extend: {
    },
  },
  plugins: [],
}