export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clay: '#F5F5DC',
        accent: '#ff3333',
        highlight: '#ff3333',
        brand: '#ff7d00',
      },
      fontFamily: {
        sans: ['"Josefin Sans"', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
};
