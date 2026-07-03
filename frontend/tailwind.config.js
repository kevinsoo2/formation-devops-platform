/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './contexts/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6c63ff',
        'primary-dark': '#5a52d5',
        secondary: '#f50057',
        dark: '#0f0f23',
        card: '#1a1a2e',
        surface: '#16213e',
        border: '#2a2a4a',
      },
    },
  },
  plugins: [],
};
