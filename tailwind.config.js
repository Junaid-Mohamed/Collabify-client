/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {

          light: '#DED0DE', // Light purple
          DEFAULT: '#C5ADC5', // Main purple shade
          dark: '#A48BA4', // Dark purple
        },
        secondary: {
          light: '#DED0DE', // Light yellow
          DEFAULT: '#C5ADC5', // Main yellow shade
          dark: '#A48BA4', // Dark yellow
        },
      },
    },
  },
  plugins: [],
}

