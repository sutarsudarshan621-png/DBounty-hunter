/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        surface: "#13131c",
        accent: "#6c5ce7",
      },
    },
  },
  plugins: [],
};
