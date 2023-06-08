/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        ProductSans: ['ProductSans', 'sans-serif'],
        RedactionItalic: ['RedactionItalic', 'sans-serif']
      }
    },
  },
  plugins: [],
}

