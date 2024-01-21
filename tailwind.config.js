/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: "#1877f2",
        textLightColor: "#7F7F7F",
      },
      animation: {
        "appear-left": "appear 1s linear ",
      },
      keyframes: {
        appear: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
