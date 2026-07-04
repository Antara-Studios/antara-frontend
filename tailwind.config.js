/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        cream: '#FDFBF7',
        warm: {
          50: '#FDF8F3',
          100: '#F5EFE6',
          200: '#EDE0D0',
          300: '#E0CCBA',
          400: '#C9B49A',
        },
        espresso: {
          DEFAULT: '#2C1810',
          light: '#4A2C1C',
          50: '#F7F0EB',
        },
        gold: {
          DEFAULT: '#C9A96E',
          light: '#DFC088',
          dark: '#A8883A',
        },
        sage: {
          DEFAULT: '#7A8C6E',
          light: '#9AAD8C',
          dark: '#5C6E52',
        },
        blush: '#E8C4B8',
        champagne: '#F0E2C8',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-delay': 'float 8s ease-in-out 2s infinite',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.32,0.72,0,1) forwards',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
        shimmer: {
          from: { backgroundPosition: '-200% 0' },
          to: { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        '*': {
          '--tw-ring-color': 'transparent',
        },
      })
    },
  ],
}
