/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#0A48E0",
          700: "#0A2E87",
        },
        secondary: {
          500: "#65D6D6",
          700: "#00A5A5",
          900: "#1E84BE",
        },
        "gray-color": {
          500: "#494747",
          700: "#342E34",
        },
      },

      boxShadow: {
        innerwhite:
          "white 0px 54px 55px, white 0px -12px 30px, white 0px 4px 6px, white 0px 12px 13px, white 0px -3px 5px;",
      },
    },

    fontFamily: {
      playfair: ["Playfair Display", "serif"],
    },

    container: {
      center: true,
    },
  },
  plugins: [],
};
