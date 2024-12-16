/** @type {import('tailwindcss').Config} */
import scrollbar from 'tailwind-scrollbar'; // Use ES module import

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [ scrollbar],
}