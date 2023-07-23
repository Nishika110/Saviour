/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors"
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}","./index.html"],
  theme: {
    extend: {
      colors:{
        "primary":"#F1F1F1",
        "secondary": "#E70000",
        "base": "#FFFDEF",
        "reddish":"#C50000"
      },
    }
  },
  plugins: [],
  corePlugins:{
    preflight:false,
  },
}

