/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // colors: {
      //   primary: '#0077B6',    // green
      //   secondary: '#90E0EF',  // yellow
      //   accent: '#F94144',     // blue
      //   neutral: '#F8F9FA',    // light gray (page background)
      //   dark: '#212529',       // dark gray (text)
      // },
      colors: {
        primary: '#4F772D',    // green
        secondary: '#F9C74F',  // yellow
        accent: '#E65F5C',     // blue
        neutral: '#F7F7F2',    // light gray (page background)
        dark: '#42352B',       // dark gray (text)
      },

      //  colors: {
      //   primary: '#824DFE',    // green
      //   secondary: '#4DD4FF',  // yellow
      //   accent: '#A8FF33',     // blue
      //   neutral: '#1A1A1A',    // light gray (page background)
      //   dark: '#F0F0F0',       // dark gray (text)
      // },
    },
  },
  plugins: [],
}