/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0E1113",
        "search-background": "#333D42",
        "post-hover": "#181C1F",
        primary: "#004224",
      },
      width: {
        lgS: "900px",
        mdS: "644px",
        smS: "480px",
        chat: "750px",
      },
      height: {
        chat: "500px",
      },
      spacing: {
        unset: "unset",
      },
    },
    plugins: [],
  },
};
