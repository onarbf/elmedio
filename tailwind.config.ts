import type { Config } from 'tailwindcss'
import type { PluginAPI } from 'tailwindcss/types/config'
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'selector',
  theme: {
    screens: {
      // Breakpoints invertidos usando max-width
      '2xl': { max: '1535px' },
      xl: { max: '1279px' },
      lg: { max: '1023px' },
      md: { max: '767px' },
      sm: { max: '639px' },
    },

    extend: {
      fontSize: {
        base: '1rem', // Default base font size
      },
      colors: {
        'blue-color': {
          100: 'var(--blue-color-100)',
          200: 'var(--blue-color-200)',
          300: 'var(--blue-color-300)',
          400: 'var(--blue-color-400)',
          500: 'var(--blue-color-500)',
          600: 'var(--blue-color-600)',
          700: 'var(--blue-color-700)',
          800: 'var(--blue-color-800)',
          900: 'var(--blue-color-900)',
        },
        grey: {
          100: 'var(--grey-100)',
          200: 'var(--grey-200)',
          300: 'var(--grey-300)',
          400: 'var(--grey-400)',
          500: 'var(--grey-500)',
          600: 'var(--grey-600)',
          700: 'var(--grey-700)',
          800: 'var(--grey-800)',
          900: 'var(--grey-900)',
        },
        main: {
          100: 'var(--main-100)',
          200: 'var(--main-200)',
          300: 'var(--main-300)',
          400: 'var(--main-400)',
          500: 'var(--main-500)',
          600: 'var(--main-600)',
          700: 'var(--main-700)',
          800: 'var(--main-800)',
          900: 'var(--main-900)',
        },
        primary: {
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'var(--primary-400)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
          800: 'var(--primary-800)',
          900: 'var(--primary-900)',
        },
      },
      utilities: {
        '.unset-all': {
          all: 'unset',
        },
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        serif: ['Times New Roman', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [
    function (api: PluginAPI) {
      const { addBase } = api
      addBase({
        '@media (min-width: 768px)': {
          html: {
            fontSize: '18px', // Aumentar a 18px (1rem = 18px)
          },
        },
        '@media (max-width: 767px)': {
          html: {
            fontSize: '16px', // Mantener 16px (1rem = 16px)
          },
        },
      })
    },
  ],
} satisfies Config
