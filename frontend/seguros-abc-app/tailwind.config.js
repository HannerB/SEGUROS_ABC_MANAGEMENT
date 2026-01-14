/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0693e3',
          hover: '#0580c7',
          light: '#38b6ff',
          dark: '#0574b8'
        },
        accent: {
          DEFAULT: '#9b51e0',
          hover: '#8a3fd1',
          light: '#b57be8'
        },
        dark: '#32373c',
        neutral: {
          DEFAULT: '#abb8c3',
          light: '#d1d9e0',
          dark: '#8a9199'
        }
      }
    },
  },
  plugins: [],
}
