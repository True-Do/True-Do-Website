/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  // darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        background: '#D9D6CC',
        accent: '#ECEBE6',
        'light-off-white': '#F7F5E9',
        'text-dark': '#344E41',
        'text-light': '#4cac7c',

        'dark-bg': '#181818',
        'dark-accent-hover': '#212124',
        'dark-accent': '#18181B',
        'text-dark-1': '#344E41',
        'text-dark-2': '#F7F5E9',
        'text-main-dark': '#eefce3',

        'dark-green': {
          100: '#d6dcd9',
          200: '#aeb8b3',
          300: '#85958d',
          400: '#5d7167',
          500: '#344e41',
          600: '#2a3e34',
          700: '#1f2f27',
          800: '#151f1a',
          900: '#0a100d',
        },

        'dark-gray': {
          100: '#d1d1d1',
          200: '#a3a3a4',
          300: '#747476',
          400: '#464649',
          500: '#18181b',
          600: '#131316',
          700: '#0e0e10',
          800: '#0a0a0b',
          900: '#050505',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar')],
};
