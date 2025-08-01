/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-1': '4px 4px 10px rgba(0,0,0,0.25)',
        'rojo-suave': '0px 4px 12px rgba(255, 51, 102, 0.4)',
      },
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
        girarIconos: {
          '0%, 100%': { transform: 'translateX(1%)' },
          '50%': { transform: 'translateX(-90%)' },
        }
      },
      animation: {
        girar: 'girar 1s ease-in-out infinite',
        tresCorazones: 'tresCorazones 1s ease-in-out infinite',
        cincoCorazones: 'cincoCorazones 1s ease-in-out infinite',
        girarIconos: "girarIconos 1s ease-in-out infinite"
      }
    }
  },
  plugins: [],
}
