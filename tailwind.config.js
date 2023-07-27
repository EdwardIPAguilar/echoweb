/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        ProductSans: ['ProductSans', 'sans-serif'],
        'redaction': ['redaction', 'serif'],
        'intel': ['intel', 'mono'],
      }
    },
  },
  plugins: [],
}

