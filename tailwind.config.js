/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',

  theme: {
    container: {
      center: true,
    },

    extend: {
      colors: {
        primary: '#58005d',
        secondary: '#824485',
        success: '#BFDD00',
        error: '#ef4444',
      },
      fontSize: {
        '20xl': '7rem',
      },
      container: {
        center: true,
        screens: {
          xl: '1140px',
        },
      },
    },
  },
  plugins: [],
};
