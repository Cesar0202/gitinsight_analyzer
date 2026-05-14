/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Renombramos para evitar conflictos con clases internas de Tailwind
        'editorial-bg': '#F5F5F3', 
        'editorial-black': '#000000',
        'editorial-gray': '#555555',
        'editorial-muted': '#A1A1A1',
        card: '#FFFFFF',
        accent: {
          lavender: '#E8E8FF',
          mint: '#E8F5F1',
          beige: '#F0EFE9',
        }
      },
      borderRadius: {
        '2xl': '1rem',    
        '3xl': '1.5rem',  
        '4xl': '1.75rem', 
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-.04em',
        tighter: '-.02em',
      }
    },
  },
  plugins: [],
}
