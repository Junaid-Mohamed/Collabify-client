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
          light: '#9F7AEA', // Light purple
          DEFAULT: '#6B46C1', // Main purple shade
          dark: '#44337A', // Dark purple
        },
        secondary: {
          light: '#FDE68A', // Light yellow
          DEFAULT: '#FBBF24', // Main yellow shade
          dark: '#B7791F', // Dark yellow
        },
      },
    },
  },
  plugins: [],
}

