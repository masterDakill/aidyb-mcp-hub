/**
 * AIDYN shadcn/ui Theme Extensions
 * 
 * This file provides custom variants and theme configurations for shadcn/ui components
 * using AIDYN design tokens.
 */

import { type VariantProps, cva } from 'class-variance-authority'
import { colors } from './tokens'

// Button variants with AIDYN styling
export const aidynButtonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        'aidyn-primary': 
          'bg-aidyn-primary text-white shadow hover:bg-aidyn-primary-600 focus-visible:ring-aidyn-primary-500',
        'aidyn-secondary': 
          'bg-aidyn-secondary text-white shadow hover:bg-aidyn-secondary-600 focus-visible:ring-aidyn-secondary-500',
        'aidyn-accent': 
          'bg-aidyn-accent text-white shadow hover:bg-aidyn-accent-600 focus-visible:ring-aidyn-accent-500',
        'aidyn-success': 
          'bg-aidyn-success text-white shadow hover:bg-aidyn-success-600 focus-visible:ring-aidyn-success-500',
        'aidyn-warning': 
          'bg-aidyn-warning text-white shadow hover:bg-aidyn-warning-600 focus-visible:ring-aidyn-warning-500',
        'aidyn-danger': 
          'bg-aidyn-danger text-white shadow hover:bg-aidyn-danger-600 focus-visible:ring-aidyn-danger-500',
        'aidyn-outline-primary': 
          'border border-aidyn-primary-500 text-aidyn-primary-500 bg-transparent hover:bg-aidyn-primary-50 focus-visible:ring-aidyn-primary-500',
        'aidyn-outline-secondary': 
          'border border-aidyn-secondary-500 text-aidyn-secondary-500 bg-transparent hover:bg-aidyn-secondary-50 focus-visible:ring-aidyn-secondary-500',
        'aidyn-outline-accent': 
          'border border-aidyn-accent-500 text-aidyn-accent-500 bg-transparent hover:bg-aidyn-accent-50 focus-visible:ring-aidyn-accent-500',
        'aidyn-ghost-primary': 
          'text-aidyn-primary-500 hover:bg-aidyn-primary-50 hover:text-aidyn-primary-600 focus-visible:ring-aidyn-primary-500',
        'aidyn-ghost-secondary': 
          'text-aidyn-secondary-500 hover:bg-aidyn-secondary-50 hover:text-aidyn-secondary-600 focus-visible:ring-aidyn-secondary-500',
        'aidyn-link': 
          'text-aidyn-primary-500 underline-offset-4 hover:underline hover:text-aidyn-primary-600',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'aidyn-primary',
      size: 'default',
    },
  }
)

// Badge variants with AIDYN styling
export const aidynBadgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        'aidyn-primary': 
          'border-transparent bg-aidyn-primary text-white shadow hover:bg-aidyn-primary-600',
        'aidyn-secondary': 
          'border-transparent bg-aidyn-secondary text-white shadow hover:bg-aidyn-secondary-600',
        'aidyn-success': 
          'border-transparent bg-aidyn-success text-white shadow hover:bg-aidyn-success-600',
        'aidyn-warning': 
          'border-transparent bg-aidyn-warning text-white shadow hover:bg-aidyn-warning-600',
        'aidyn-danger': 
          'border-transparent bg-aidyn-danger text-white shadow hover:bg-aidyn-danger-600',
        'aidyn-outline-primary': 
          'border-aidyn-primary-500 text-aidyn-primary-500 hover:bg-aidyn-primary-50',
        'aidyn-outline-secondary': 
          'border-aidyn-secondary-500 text-aidyn-secondary-500 hover:bg-aidyn-secondary-50',
        'aidyn-soft-primary': 
          'border-transparent bg-aidyn-primary-100 text-aidyn-primary-800 hover:bg-aidyn-primary-200',
        'aidyn-soft-secondary': 
          'border-transparent bg-aidyn-secondary-100 text-aidyn-secondary-800 hover:bg-aidyn-secondary-200',
      },
    },
    defaultVariants: {
      variant: 'aidyn-primary',
    },
  }
)

// Input variants with AIDYN styling
export const aidynInputVariants = cva(
  'flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'focus-visible:ring-ring',
        'aidyn-primary': 
          'border-aidyn-primary-200 focus-visible:border-aidyn-primary-500 focus-visible:ring-aidyn-primary-500',
        'aidyn-secondary': 
          'border-aidyn-secondary-200 focus-visible:border-aidyn-secondary-500 focus-visible:ring-aidyn-secondary-500',
        'aidyn-success': 
          'border-aidyn-success-200 focus-visible:border-aidyn-success-500 focus-visible:ring-aidyn-success-500',
        'aidyn-warning': 
          'border-aidyn-warning-200 focus-visible:border-aidyn-warning-500 focus-visible:ring-aidyn-warning-500',
        'aidyn-danger': 
          'border-aidyn-danger-200 focus-visible:border-aidyn-danger-500 focus-visible:ring-aidyn-danger-500',
      },
      size: {
        default: 'h-9',
        sm: 'h-8 text-xs',
        lg: 'h-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

// Tabs variants with AIDYN styling
export const aidynTabsListVariants = cva(
  'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
  {
    variants: {
      variant: {
        default: '',
        'aidyn-primary': 'bg-aidyn-primary-50 border border-aidyn-primary-200',
        'aidyn-secondary': 'bg-aidyn-secondary-50 border border-aidyn-secondary-200',
        'aidyn-dark': 'bg-aidyn-dark-800 border border-aidyn-dark-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export const aidynTabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow',
  {
    variants: {
      variant: {
        default: '',
        'aidyn-primary': 
          'data-[state=active]:bg-aidyn-primary data-[state=active]:text-white data-[state=active]:shadow-aidyn-soft hover:bg-aidyn-primary-100',
        'aidyn-secondary': 
          'data-[state=active]:bg-aidyn-secondary data-[state=active]:text-white data-[state=active]:shadow-aidyn-soft hover:bg-aidyn-secondary-100',
        'aidyn-dark': 
          'data-[state=active]:bg-aidyn-dark data-[state=active]:text-white data-[state=active]:shadow-aidyn-soft hover:bg-aidyn-dark-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

// Card variants with AIDYN styling
export const aidynCardVariants = cva(
  'rounded-xl border bg-card text-card-foreground shadow',
  {
    variants: {
      variant: {
        default: '',
        'aidyn-primary': 
          'border-aidyn-primary-200 bg-gradient-to-br from-aidyn-primary-50 to-white shadow-aidyn-soft',
        'aidyn-secondary': 
          'border-aidyn-secondary-200 bg-gradient-to-br from-aidyn-secondary-50 to-white shadow-aidyn-soft',
        'aidyn-dark': 
          'border-aidyn-dark-700 bg-gradient-to-br from-aidyn-dark-900 to-aidyn-dark-800 shadow-aidyn-medium',
        'aidyn-glass': 
          'border-white/20 bg-white/10 backdrop-blur-md shadow-aidyn-large',
      },
      size: {
        default: 'p-6',
        sm: 'p-4',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

// Export types
export type AidynButtonVariants = VariantProps<typeof aidynButtonVariants>
export type AidynBadgeVariants = VariantProps<typeof aidynBadgeVariants>
export type AidynInputVariants = VariantProps<typeof aidynInputVariants>
export type AidynTabsVariants = VariantProps<typeof aidynTabsListVariants>
export type AidynCardVariants = VariantProps<typeof aidynCardVariants>

// Theme configuration for CSS custom properties
export const aidynThemeConfig = {
  light: {
    '--background': '0 0% 100%',
    '--foreground': `${colors.dark[950]}`,
    '--card': '0 0% 100%',
    '--card-foreground': `${colors.dark[950]}`,
    '--popover': '0 0% 100%',
    '--popover-foreground': `${colors.dark[950]}`,
    '--primary': `${colors.primary[500]}`,
    '--primary-foreground': '0 0% 98%',
    '--secondary': `${colors.secondary[500]}`,
    '--secondary-foreground': '0 0% 98%',
    '--muted': '210 40% 98%',
    '--muted-foreground': '215.4 16.3% 46.9%',
    '--accent': '210 40% 96%',
    '--accent-foreground': '222.2 84% 4.9%',
    '--destructive': '0 84.2% 60.2%',
    '--destructive-foreground': '210 40% 98%',
    '--border': '214.3 31.8% 91.4%',
    '--input': '214.3 31.8% 91.4%',
    '--ring': `${colors.primary[500]}`,
    '--radius': '0.75rem',
  },
  dark: {
    '--background': `${colors.dark[950]}`,
    '--foreground': '210 40% 98%',
    '--card': `${colors.dark[900]}`,
    '--card-foreground': '210 40% 98%',
    '--popover': `${colors.dark[900]}`,
    '--popover-foreground': '210 40% 98%',
    '--primary': `${colors.primary[500]}`,
    '--primary-foreground': '0 0% 9%',
    '--secondary': `${colors.secondary[500]}`,
    '--secondary-foreground': '0 0% 9%',
    '--muted': '217.2 32.6% 17.5%',
    '--muted-foreground': '215 20.2% 65.1%',
    '--accent': '217.2 32.6% 17.5%',
    '--accent-foreground': '210 40% 98%',
    '--destructive': '0 62.8% 30.6%',
    '--destructive-foreground': '210 40% 98%',
    '--border': '217.2 32.6% 17.5%',
    '--input': '217.2 32.6% 17.5%',
    '--ring': `${colors.primary[500]}`,
    '--radius': '0.75rem',
  },
}

// Utility function to apply theme
export const applyAidynTheme = (theme: 'light' | 'dark' = 'light') => {
  const root = document.documentElement
  const themeColors = aidynThemeConfig[theme]
  
  Object.entries(themeColors).forEach(([property, value]) => {
    root.style.setProperty(property, value)
  })
}