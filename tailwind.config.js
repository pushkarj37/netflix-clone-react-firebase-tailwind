/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily:{
        'nsans-light':['Nsans Light'],
        'nsans-medium':['Nsans Medium'],
        'nsans-bold':['Nsans Bold'],
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}