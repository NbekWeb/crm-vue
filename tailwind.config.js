/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  content: [],
  theme: {
    extend: {
      colors: {
        "blue-400": "#1B5AAD",
        "blue-500": "#2F80ED",
        "black-800": "#06070A",
        "pink-600": "rgb(233, 234, 249)",
        "gray-300": "#DDE6F3",
        "gray-400": "#e5e7eb",
        "gray-500": "#4F4F4F",
        "gray-600": "#48505E",
        "gray-700": "#333",
        "green-500": "#219653",
        "red-500": "#EB5757",
        "black-700":'#1C1D20'
      },
     
    },
  },
  plugins: [],
};
