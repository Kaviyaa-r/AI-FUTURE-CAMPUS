/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0F',
        card: '#12121A',
        purple: '#7C3AED',
        purpleLight: '#A78BFA',
        teal: '#06B6D4',
        tealLight: '#67E8F9',
        border: 'rgba(124,58,237,0.2)',
        text: '#F1F0FF',
        muted: '#6B7280',
        error: '#EF4444',
        success: '#10B981',
        warning: '#F59E0B',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-purple': '0 8px 32px 0 rgba(124, 58, 237, 0.15)',
        'glass-teal': '0 8px 32px 0 rgba(6, 182, 212, 0.15)',
      },
    },
  },
  plugins: [],
}
