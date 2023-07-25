/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors"
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}","./index.html"],
  theme: {
    extend: {
      colors:{
        "primary":"#F1F1F1",//white
        "secondary": "#E70000",//red
        "base": "#FFFDEF",//yellowish white
        "reddish":"#C50000"//redish
      },
    }
  },
  plugins: [],
  corePlugins:{
    preflight:false,
  },
}

