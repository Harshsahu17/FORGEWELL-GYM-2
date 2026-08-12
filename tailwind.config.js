/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          hover:   'rgb(var(--accent-hover) / <alpha-value>)',
        },
        shadow: 'rgb(var(--shadow) / <alpha-value>)',
        bg: {
          primary:   'rgb(var(--bg-primary) / <alpha-value>)',
          secondary: 'rgb(var(--bg-secondary) / <alpha-value>)',
          card:      'rgb(var(--bg-card) / <alpha-value>)',
        },
        ink: {
          primary:   'rgb(var(--ink-primary) / <alpha-value>)',
          secondary: 'rgb(var(--ink-secondary) / <alpha-value>)',
        },
        border: 'rgb(var(--border) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body:    ['"Outfit"', 'sans-serif'],
        mono:    ['"Space Mono"', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(3.2rem, 7vw, 6.5rem)', { lineHeight: '1.08', letterSpacing: '-0.03em', fontWeight: '800' }],
        'section': ['clamp(2.2rem, 4.5vw, 3.8rem)', { lineHeight: '1.12', letterSpacing: '-0.02em', fontWeight: '700' }],
      },
      spacing: {
        'section': 'clamp(5rem, 10vw, 9.5rem)',
      },
      maxWidth: {
        'content': '1280px',
      },
      boxShadow: {
        'card-soft': '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 20px 40px -15px rgba(0, 0, 0, 0.1)',
        'glow-accent': '0 0 40px -10px rgb(var(--accent) / 0.35)',
      }
    },
  },
  plugins: [],
};
