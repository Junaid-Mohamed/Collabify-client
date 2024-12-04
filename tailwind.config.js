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
          light: '#D3D5EE', // Light yellow
          DEFAULT: '#B2B5E0', // Main yellow shade
          dark: '#9093C0', // Dark yellow
        },
      },
    },
  },
  plugins: [],
}

