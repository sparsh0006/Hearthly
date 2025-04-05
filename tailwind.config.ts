module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'calmi-orange': '#FFD700', // The yellow/orange color from the design
        'calmi-dark': '#1A1A1A',
        'calmi-light': '#FFFFFF',
      },
    },
  },
  plugins: [],
}