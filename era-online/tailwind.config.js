const defaultTheme = require("tailwindcss/defaultTheme");

const fontFamily = defaultTheme.fontFamily;
fontFamily["sans"] = [
  "Roboto", // <-- Roboto is a default sans font now
  "system-ui",
];

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          blue: "#004587",
          cyan: "#149EE0",
          orange: "#f38336",
          orangeDark: "#FF6B1C",
          gray: "#3b5f79",
          grayMain: "#60889f",
          grayLight: "#C1CAD1",
          grayDark: "#2a4860",
        },
        secondary: {
          pink: "#FC0064",
          violet: "#7231A5",
          turquoise: "#00C0B4",
          red: "#FA0036",
          green: "#00C587",
          purple: "#B90089",
        },
      },
    },
    fontFamily: fontFamily,
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
