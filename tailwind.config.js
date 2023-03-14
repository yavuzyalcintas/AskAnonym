/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        loader: "pulse 1s linear infinite, bounce 1s linear infinite"
      }
    },
    fontFamily: {
      inter: ["var(--font-inter)", ...fontFamily.sans]
    }
  },
  plugins: [
    // ...
    require("@tailwindcss/forms")
  ],
  darkMode: "class"
};
