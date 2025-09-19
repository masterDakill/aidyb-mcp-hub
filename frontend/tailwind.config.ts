import type { Config } from 'tailwindcss'
import { designTokens } from './src/lib/theme/tokens'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './index.html'
  ],
  theme: {
    fontFamily: {
      sans: ['Aidyn Sans', 'system-ui', 'sans-serif'],
      display: ['Aidvitneum', 'Aidyn Sans', 'system-ui', 'sans-serif'],
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Couleurs Aidyn (seront remplacées par les tokens GenSpark)
        'aidyn-primary': 'hsl(var(--aidyn-primary))',
        'aidyn-accent': 'hsl(var(--aidyn-accent))',
        // Couleurs shadcn existantes
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      spacing: {
        // Seront remplacés par les tokens GenSpark
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        // Seront remplacés par les tokens GenSpark
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        // Seront remplacés par les tokens GenSpark
        'aidyn-soft': '0 2px 8px rgba(11, 18, 32, 0.12)',
        'aidyn-medium': '0 4px 16px rgba(11, 18, 32, 0.16)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
      },
      transitionTimingFunction: {
        // Seront remplacés par les tokens GenSpark
        'aidyn-ease': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config

export default config