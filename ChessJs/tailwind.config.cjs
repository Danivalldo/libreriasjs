/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html, js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        chessblue: "#86afcf",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
