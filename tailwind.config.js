module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "2xs": { raw: "(max-width: 360px)" },
        xs: { raw: "(max-width: 480px)" },
        sm: { raw: "(max-width: 640px)" },
        md: { raw: "(max-width: 960px)" },
        lg: { raw: "(max-width: 1024px)" },
        xl: { raw: "(max-width: 1280px)" },
        "2xl": { raw: "(max-width: 1366px)" },
      },
    },
  },
  plugins: [],
}
