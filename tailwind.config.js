module.exports = {
  purge: {
    content: ["./pages/*.tsx", "./components/common/*.tsx"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        "lf-font": "Poppins, sans-serif",
      },
      colors: {
        "lf-teal": "#0FCCCE",
        "lf-teal-dark": "#006B78",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["hover"],
    },
  },
  plugins: [],
};
