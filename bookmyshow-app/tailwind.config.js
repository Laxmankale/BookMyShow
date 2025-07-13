/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f84464',
        secondary: '#333338',
        accent: '#ff6b6b',
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}