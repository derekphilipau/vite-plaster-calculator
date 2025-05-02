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
        accent: '#8B4513', // Saddle brown - more earthy
        accentSoft: '#A4703A',
        highlight: '#FF3333', // Match accent for consistency
        brand: '#A0522D', // Sienna - warmer, vintage feel
        paper: {
          ink: '#3A3025', // Dark sepia for main text
          light: '#F5F5DC', // Your clay color
          aged: '#E8E4D9', // Slightly darker clay for contrast
          link: '#8B4513', // Saddle brown for links
          border: '#D3CBBA', // Lighter border color for paper feel
        }
      },
      fontFamily: {
        sans: ['"Josefin Sans"', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
};
