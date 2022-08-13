/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern':
          "url(https://raw.githubusercontent.com/rudyjm3/intro-component-with-signup-form/main/images/bg-intro-desktop.png)",
      },
      colors: {
        "regal-black": "	#050505",
      },
    },
  },
  plugins: [],
};
