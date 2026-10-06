import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f0f7f3',
          100: '#d9ede3',
          200: '#b3dbc7',
          300: '#80c2a3',
          400: '#4fa07d',
          500: '#4A7C59', // Ana yeşil
          600: '#3a6347',
          700: '#2d4e38',
          800: '#243e2d',
          900: '#1c3024',
        },
        accent: {
          50:  '#fef5ee',
          100: '#fde8d4',
          200: '#fad0a8',
          300: '#f6b172',
          400: '#f08a3d',
          500: '#E07B39', // Turuncu CTA
          600: '#c9611f',
          700: '#a84b1a',
          800: '#883c18',
          900: '#6e3216',
        },
        cream: {
          50:  '#FAFAF7', // Ana arka plan
          100: '#F5F0E8', // İkincil arka plan
          200: '#ede7d8',
          300: '#dfd6c2',
          400: '#cdc0a5',
          500: '#b8a885',
        },
        forest: {
          dark: '#2C3E35',
          DEFAULT: '#3D5245',
          light: '#4A7C59',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #f0f7f3 0%, #F5F0E8 100%)',
        'gradient-green': 'linear-gradient(135deg, #4A7C59 0%, #2D5A3D 100%)',
      },
      boxShadow: {
        'soft': '0 2px 20px rgba(0,0,0,0.06)',
        'card': '0 4px 24px rgba(74,124,89,0.08)',
        'hover': '0 8px 32px rgba(74,124,89,0.14)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
