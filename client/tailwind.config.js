/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'primary' : "#B30E08"
      }
    },
  },
  plugins: [],
  corePlugins :{
    preflight:false
  }
}