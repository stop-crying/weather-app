/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      sm: "375px",
      lg : "1440px",
      xl : "1900px"
      
    },
    fontFamily: {
      'bai': ["bai", "san-serif"],
    },
    extend: {},
  },
  plugins: [],
}

