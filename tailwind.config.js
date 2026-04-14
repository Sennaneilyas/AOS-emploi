// tailwind.config.js
import typography from '@tailwindcss/typography'
import lineClamp from '@tailwindcss/line-clamp'
import flowbite from 'flowbite/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
    // ← Correct path for flowbite-react 0.12.x (replaces the old tailwind subpath)
    './node_modules/flowbite-react/dist/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1B2A4A',
          light: '#2D4270',
          dark: '#121E35',
        },
        brand: {
          orange: '#F26522',   // pending M. KHALISSI confirm
        },
        'gray-soft': '#F4F6F9',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        arabic: ['Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [
    typography,   // @tailwindcss/typography — prose classes for WP content
    flowbite,     // flowbite/plugin — Flowbite component utilities
  ],
}