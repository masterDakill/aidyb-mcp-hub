import type { Config } from 'tailwindcss'
import { colors, typography, spacing, borderRadius, shadows, timing } from './src/lib/theme/tokens'

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
      sans: typography.fontFamily.primary,
      display: typography.fontFamily.secondary,
      mono: typography.fontFamily.mono,
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
        // AIDYN Brand Colors
        'aidyn-primary': {
          DEFAULT: colors.primary[500], // #00e5ff Cyan
          50: colors.primary[50],
          100: colors.primary[100],
          200: colors.primary[200],
          300: colors.primary[300],
          400: colors.primary[400],
          500: colors.primary[500],
          600: colors.primary[600],
          700: colors.primary[700],
          800: colors.primary[800],
          900: colors.primary[900],
          950: colors.primary[950],
        },
        'aidyn-secondary': {
          DEFAULT: colors.secondary[500], // #007bff Blue
          50: colors.secondary[50],
          100: colors.secondary[100],
          200: colors.secondary[200],
          300: colors.secondary[300],
          400: colors.secondary[400],
          500: colors.secondary[500],
          600: colors.secondary[600],
          700: colors.secondary[700],
          800: colors.secondary[800],
          900: colors.secondary[900],
          950: colors.secondary[950],
        },
        'aidyn-accent': {
          DEFAULT: colors.accent[500], // #1ed98b Green (Logo)
          50: colors.accent[50],
          100: colors.accent[100],
          200: colors.accent[200],
          300: colors.accent[300],
          400: colors.accent[400],
          500: colors.accent[500],
          600: colors.accent[600],
          700: colors.accent[700],
          800: colors.accent[800],
          900: colors.accent[900],
          950: colors.accent[950],
        },
        'aidyn-dark': {
          DEFAULT: colors.dark[950],
          50: colors.dark[50],
          100: colors.dark[100],
          200: colors.dark[200],
          300: colors.dark[300],
          400: colors.dark[400],
          500: colors.dark[500],
          600: colors.dark[600],
          700: colors.dark[700],
          800: colors.dark[800],
          900: colors.dark[900],
          950: colors.dark[950],
        },
        'aidyn-success': {
          DEFAULT: colors.success[500],
          500: colors.success[500],
          600: colors.success[600],
        },
        'aidyn-warning': {
          DEFAULT: colors.warning[500],
          500: colors.warning[500],
          600: colors.warning[600],
        },
        'aidyn-danger': {
          DEFAULT: colors.danger[500],
          500: colors.danger[500],
          600: colors.danger[600],
        },
        // shadcn/ui colors with CSS variables for theme switching
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
        ...spacing,
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        ...borderRadius,
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'aidyn-soft': shadows.soft,
        'aidyn-medium': shadows.medium,
        'aidyn-large': shadows.large,
        'aidyn-glow-primary': shadows.glowPrimary,
        'aidyn-glow-secondary': shadows.glowSecondary,
        'aidyn-glow-accent': shadows.glowAccent,
        'aidyn-glow-success': shadows.glowSuccess,
        'aidyn-glow-danger': shadows.glowDanger,
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
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: `0 0 5px ${colors.primary[500]}30, 0 0 10px ${colors.primary[500]}20, 0 0 15px ${colors.primary[500]}10` 
          },
          '50%': { 
            boxShadow: `0 0 10px ${colors.primary[500]}50, 0 0 20px ${colors.primary[500]}30, 0 0 30px ${colors.primary[500]}20` 
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionTimingFunction: {
        'aidyn-ease': timing.ease,
        'aidyn-ease-in': timing.easeIn,
        'aidyn-ease-out': timing.easeOut,
      },
      transitionDuration: {
        'aidyn-fast': timing.fast,
        'aidyn-normal': timing.normal,
        'aidyn-slow': timing.slow,
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config

export default config