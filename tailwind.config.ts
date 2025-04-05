module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'calmi-orange': '#B2A4FF', // The violet color from the design
        'calmi-dark': '#000000',
        'calmi-light': '#FFFFFF',
        'calmi-dark-secondary': '#000000', // A slightly lighter shade for secondary elements
      },
    },
  },
  plugins: [],
}