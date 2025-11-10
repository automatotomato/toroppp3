/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          main: '#1e5a8e',
          accent: '#B80c09',
        },
      },
    },
  },
  plugins: [],
};
