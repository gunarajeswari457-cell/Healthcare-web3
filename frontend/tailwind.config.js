/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        brandPrimary: '#6d28d9', // Purple
        brandSecondary: '#06b6d4', // Cyan
        darkBg: '#0f172a',
        darkCard: '#1e293b'
      }
    },
  },
  plugins: [],
}
