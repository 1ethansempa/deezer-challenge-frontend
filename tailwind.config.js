/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        "custom-yellow": "#FFEC00",
        "dark-white": "#F6F6F6",
        "subtle-white": "#9c9c9c",
        "primary-black": "#0E0F09",
        "smoky-black": "#0F0A0A",
        "light-gray": "#E9E9E9",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
