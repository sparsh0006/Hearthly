import type { Config } from 'tailwindcss';

const config: Config = {
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
        'calmi-dark-secondary': '#0a0a0a', // A slightly lighter shade for secondary elements
        'calmi-purple': {
          100: '#CDC1FF',
          200: '#B2A4FF',
          300: '#8F7FF6',
          400: '#7563E8',
          500: '#5B49D6',
        },
        'calmi-black': {
          DEFAULT: '#000000',
          100: '#0a0a0a',
          200: '#121212',
          300: '#1a1a1a',
          400: '#222222',
        },
      },
      transitionProperty: {
        'max-height': 'max-height',
      },
      backgroundColor: {
        'dark': '#000000',
        'dark-secondary': '#0a0a0a',
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Enable dark mode support
};

export default config;