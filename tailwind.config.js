/** @type {import('tailwindcss').Config} */

module.exports = {
  plugins: [
    require('@tailwindcss/typography')
  ],
  theme: {
    extend: {
      colors: {
        developmint: {
          500: "#199922",
          300: "#75c17a"
        }
      }
    }
  }
}
