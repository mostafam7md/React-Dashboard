/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#E6F3FF',
          100: '#CCE8FF',
          200: '#99D1FF',
          300: '#66BAFF',
          400: '#33A3FF',
          500: '#0E8CFF',
          600: '#0072E0',
          700: '#0059B3',
          800: '#004085',
          900: '#002A59'
        }
      },
      boxShadow: { soft: '0 2px 10px rgba(0,0,0,0.08)' },
      borderRadius: { xl2: '1rem' }
    }
  },
  plugins: []
}
