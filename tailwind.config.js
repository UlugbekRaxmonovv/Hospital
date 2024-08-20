/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      backdropBlur: {
        'xs': '2px',
        '3xl': '40px',
      },
    },
  },
  plugins: [],
}