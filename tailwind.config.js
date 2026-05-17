/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cyber-dark': '#0a0420', 'cyber-deep': '#1a0b3d', 'cyber-mid': '#2d1b69',
        'neon-purple': '#a855f7', 'neon-purple-light': '#c084fc', 'neon-purple-dark': '#7c3aed',
        'neon-green': '#22c55e',
      },
      fontFamily: { heading: ['"Plus Jakarta Sans"', 'sans-serif'], body: ['Inter', 'sans-serif'] },
      animation: {
        'float': 'float 6s ease-in-out infinite', 'float-delay': 'float 6s ease-in-out 2s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite', 'scan-line': 'scanLine 8s linear infinite',
      },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        pulseGlow: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.7' } },
        scanLine: { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100%)' } },
      },
    },
  },
  plugins: [],
};