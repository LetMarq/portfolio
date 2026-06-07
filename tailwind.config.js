/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        win98: ["Windows95", "sans-serif"],
      },
    },
  },
  plugins: [],
};
