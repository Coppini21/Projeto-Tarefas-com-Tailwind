/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "index.html",
    './src/**/*.jsx'
  ],
  theme: {
    screens: {
      'md': { 'max': '767px' },
      // => @media (max-width: 767px) { ... }
      'lg': { 'max': '1024px'},
    },

    extend: {
      width: {
        '650': '40rem',
        '767': '48rem',
        '850': '54rem',
      }

    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
