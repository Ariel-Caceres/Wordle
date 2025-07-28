/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        girar: {
          '0%, 100%': { transform: 'translateY(1%)' },
          '50%': { transform: 'translateY(-10%)' },
        },
        tresCorazones: {
          '0%, 100%': { transform: 'translateY(1%)' },
          '50%': { transform: 'translateY(-50%)' },
        },
        cincoCorazones: {
          '0%, 100%': { transform: 'translateY(1%)' },
          '50%': { transform: 'translateY(-90%)' },
        },
      },
      animation: {
        girar: 'girar 1s ease-in-out infinite',
        tresCorazones: 'tresCorazones 1s ease-in-out infinite',
        cincoCorazones: 'cincoCorazones 1s ease-in-out infinite',
      }
    }
  },
  plugins: [],
}
