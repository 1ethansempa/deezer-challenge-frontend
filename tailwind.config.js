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
        "primary-black": "#0E0F09",
        "smoky-black": "#0F0A0A",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
