/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#6F9DE2",
        purple: "#9871F3",
        danger: "#F05D6C",
        "gray-100": "#DAE4F2",
        "gray-200": "#C8D0DA",
        "gray-300": "#95A1B1",
        "gray-400": "#6F7D90",
        "gray-500": "#2A313C",
        "gray-600": "#21252C",
        "gray-700": "#191D24",
        "gray-800": "#13161B",
        "gray-900": "#0F1216",
      },
      fontFamily: {
        heading: ["var(--font-oxanium)", "sans-serif"],
        sans: ["var(--font-montserrat)", "sans-serif"],
      },
      borderRadius: {
        xl: "0.625rem",
      },
    },
  },
  plugins: [],
}