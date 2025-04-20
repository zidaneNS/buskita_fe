/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    safelist: [
      'col-start-1', 'col-start-2', 'col-start-3',
      'col-start-4', 'col-start-5', 'col-start-6'
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  