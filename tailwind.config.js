/** @type {import('tailwindcss').Config} */
export default {
  plugins: ["prettier-plugin-tailwindcss"],
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./.storybook/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {},
      boxShadow: {},
      dropShadow: {},
    },
  },
};
