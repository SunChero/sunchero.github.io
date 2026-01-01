export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#101325',
        primary: '#c79000',
        surface: '#212047',
      },
      fontFamily: {
        sans: ['"Titillium Web"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0px 4px 64px rgba(255, 209, 90, 0.46)',
      },
      keyframes: {
        progress: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress)' },
        },
        blink: {
          '0%,100%': { opacity: '0' },
          '50%': { opacity: '.6' },
        },
        sticky: {
          '0%': { transform: 'translateY(-120px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        progress: 'progress 3s ease-out forwards',
        blink: 'blink 2s infinite',
        sticky: 'sticky 1s ease-out',
      },
    },
  },
  plugins: [],
}
