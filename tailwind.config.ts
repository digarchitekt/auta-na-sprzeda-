import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0a0a0a',
          elevated: '#111111',
          card: '#161616',
          border: '#262626',
        },
        accent: {
          DEFAULT: '#e11d2e',
          hover: '#c4172a',
          muted: '#7a0f1c',
        },
        text: {
          primary: '#f5f5f5',
          secondary: '#b8b8b8',
          // Bumped from #737373 (4.33:1, fails WCAG AA) to #9a9a9a (~5.5:1, passes AA)
          muted: '#9a9a9a',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['var(--font-bebas)', 'var(--font-inter)', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [],
};

export default config;
