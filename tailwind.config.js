/** @type {import('tailwindcss').Config} */

import tailwindcssBgPatterns from 'tailwindcss-bg-patterns'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  safelist: [
    // Patrones
    'pattern-lines',
    'pattern-vertical-lines',
    'pattern-diagonal-lines',
    'pattern-rectangles',
    'pattern-rhombus',
    'pattern-dots',
    'pattern-boxes',
    'pattern-cross',
    'pattern-zigzag',
    'pattern-zigzag-3d',
    'pattern-isometric',
    'pattern-wavy',
    'pattern-triangles',
    'pattern-moon',
    'pattern-paper',

    // Tamaños
    'pattern-size-1',
    'pattern-size-2',
    'pattern-size-4',
    'pattern-size-6',
    'pattern-size-8',
    'pattern-size-16',
    'pattern-size-20',
    'pattern-size-24',
    'pattern-size-32',

    // Colores
    'pattern-indigo-500',
    'pattern-green-500',
    'pattern-red-500',

    // Otros estilos
    'pattern-bg-transparent',
    'pattern-opacity-60',
  ],
  darkMode: 'selector',
  theme: {
    patterns: {
      opacities: {
        100: '1',
        80: '.80',
        60: '.60',
        40: '.40',
        20: '.20',
        10: '.10',
        5: '.05',
      },
      sizes: {
        1: '0.25rem',
        2: '0.5rem',
        4: '1rem',
        6: '1.5rem',
        8: '2rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        32: '8rem',
      },
    },
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
    tailwindcssBgPatterns,
    function (api) {
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
}
