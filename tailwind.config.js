module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("prettier-plugin-tailwindcss"),
    function ({ addVariant }) {
      addVariant("child", "& > *");
    },
  ],
};
