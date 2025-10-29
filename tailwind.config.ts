import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0b0d10',
        foreground: '#e6e7e9',
        muted: '#9aa0a6',
        accent: '#7dd3fc'
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0,0,0,0.35)'
      },
      borderRadius: {
        '2xl': '1.25rem'
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
  plugins: [],
}

export default config

