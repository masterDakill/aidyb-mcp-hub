/**
 * AIDYN shadcn/ui Theme Extensions
 * 
 * This file provides custom variants and theme configurations for shadcn/ui components
 * using AIDYN design tokens extracted from visual references.
 */

import { type VariantProps, cva } from 'class-variance-authority'
import { colors } from './tokens'

// AIDYN Button variants - Based on interface references
export const aidynButtonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Primary variants using AIDYN colors
        'aidyn-primary': 
          'bg-aidyn-primary text-aidyn-dark-950 shadow-aidyn-glow-primary hover:bg-aidyn-primary-600 focus-visible:ring-aidyn-primary-500',
        'aidyn-secondary': 
          'bg-aidyn-secondary text-white shadow-aidyn-glow-secondary hover:bg-aidyn-secondary-600 focus-visible:ring-aidyn-secondary-500',
        'aidyn-accent': 
          'bg-aidyn-accent text-aidyn-dark-950 shadow-aidyn-glow-accent hover:bg-aidyn-accent-600 focus-visible:ring-aidyn-accent-500',
        'aidyn-success': 
          'bg-aidyn-success text-white shadow-aidyn-glow-success hover:bg-aidyn-success-600 focus-visible:ring-aidyn-success-500',
        'aidyn-warning': 
          'bg-aidyn-warning text-aidyn-dark-950 shadow hover:bg-aidyn-warning-600 focus-visible:ring-aidyn-warning-500',
        'aidyn-danger': 
          'bg-aidyn-danger text-white shadow-aidyn-glow-danger hover:bg-aidyn-danger-600 focus-visible:ring-aidyn-danger-500',
        
        // Outline variants
        'aidyn-outline-primary': 
          'border border-aidyn-primary-500 text-aidyn-primary-500 bg-transparent hover:bg-aidyn-primary-50 dark:hover:bg-aidyn-primary-950 focus-visible:ring-aidyn-primary-500',
        'aidyn-outline-secondary': 
          'border border-aidyn-secondary-500 text-aidyn-secondary-500 bg-transparent hover:bg-aidyn-secondary-50 dark:hover:bg-aidyn-secondary-950 focus-visible:ring-aidyn-secondary-500',
        'aidyn-outline-accent': 
          'border border-aidyn-accent-500 text-aidyn-accent-500 bg-transparent hover:bg-aidyn-accent-50 dark:hover:bg-aidyn-accent-950 focus-visible:ring-aidyn-accent-500',
        
        // Ghost variants
        'aidyn-ghost-primary': 
          'text-aidyn-primary-500 hover:bg-aidyn-primary-50 dark:hover:bg-aidyn-primary-950 hover:text-aidyn-primary-600 focus-visible:ring-aidyn-primary-500',
        'aidyn-ghost-secondary': 
          'text-aidyn-secondary-500 hover:bg-aidyn-secondary-50 dark:hover:bg-aidyn-secondary-950 hover:text-aidyn-secondary-600 focus-visible:ring-aidyn-secondary-500',
        'aidyn-ghost-accent': 
          'text-aidyn-accent-500 hover:bg-aidyn-accent-50 dark:hover:bg-aidyn-accent-950 hover:text-aidyn-accent-600 focus-visible:ring-aidyn-accent-500',
        
        // Link variant
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

// AIDYN Badge variants - Status indicators matching app interfaces
export const aidynBadgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        // Solid variants
        'aidyn-primary': 
          'border-transparent bg-aidyn-primary text-aidyn-dark-950 shadow hover:bg-aidyn-primary-600',
        'aidyn-secondary': 
          'border-transparent bg-aidyn-secondary text-white shadow hover:bg-aidyn-secondary-600',
        'aidyn-accent': 
          'border-transparent bg-aidyn-accent text-aidyn-dark-950 shadow hover:bg-aidyn-accent-600',
        'aidyn-success': 
          'border-transparent bg-aidyn-success text-white shadow hover:bg-aidyn-success-600',
        'aidyn-warning': 
          'border-transparent bg-aidyn-warning text-aidyn-dark-950 shadow hover:bg-aidyn-warning-600',
        'aidyn-danger': 
          'border-transparent bg-aidyn-danger text-white shadow hover:bg-aidyn-danger-600',
        
        // Outline variants
        'aidyn-outline-primary': 
          'border-aidyn-primary-500 text-aidyn-primary-500 hover:bg-aidyn-primary-50 dark:hover:bg-aidyn-primary-950',
        'aidyn-outline-secondary': 
          'border-aidyn-secondary-500 text-aidyn-secondary-500 hover:bg-aidyn-secondary-50 dark:hover:bg-aidyn-secondary-950',
        'aidyn-outline-accent': 
          'border-aidyn-accent-500 text-aidyn-accent-500 hover:bg-aidyn-accent-50 dark:hover:bg-aidyn-accent-950',
        
        // Soft variants - subtle background with colored text
        'aidyn-soft-primary': 
          'border-transparent bg-aidyn-primary-100 text-aidyn-primary-800 hover:bg-aidyn-primary-200 dark:bg-aidyn-primary-950 dark:text-aidyn-primary-200',
        'aidyn-soft-secondary': 
          'border-transparent bg-aidyn-secondary-100 text-aidyn-secondary-800 hover:bg-aidyn-secondary-200 dark:bg-aidyn-secondary-950 dark:text-aidyn-secondary-200',
        'aidyn-soft-accent': 
          'border-transparent bg-aidyn-accent-100 text-aidyn-accent-800 hover:bg-aidyn-accent-200 dark:bg-aidyn-accent-950 dark:text-aidyn-accent-200',
      },
    },
    defaultVariants: {
      variant: 'aidyn-primary',
    },
  }
)

// AIDYN Input variants - Focus states with brand colors
export const aidynInputVariants = cva(
  'flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'focus-visible:ring-ring',
        'aidyn-primary': 
          'border-aidyn-primary-200 focus-visible:border-aidyn-primary-500 focus-visible:ring-aidyn-primary-500 focus-visible:shadow-aidyn-glow-primary',
        'aidyn-secondary': 
          'border-aidyn-secondary-200 focus-visible:border-aidyn-secondary-500 focus-visible:ring-aidyn-secondary-500 focus-visible:shadow-aidyn-glow-secondary',
        'aidyn-accent': 
          'border-aidyn-accent-200 focus-visible:border-aidyn-accent-500 focus-visible:ring-aidyn-accent-500 focus-visible:shadow-aidyn-glow-accent',
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

// AIDYN Tabs variants - Navigation matching interface designs
export const aidynTabsListVariants = cva(
  'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
  {
    variants: {
      variant: {
        default: '',
        'aidyn-primary': 'bg-aidyn-primary-50 border border-aidyn-primary-200 dark:bg-aidyn-primary-950 dark:border-aidyn-primary-800',
        'aidyn-secondary': 'bg-aidyn-secondary-50 border border-aidyn-secondary-200 dark:bg-aidyn-secondary-950 dark:border-aidyn-secondary-800',
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
          'data-[state=active]:bg-aidyn-primary data-[state=active]:text-aidyn-dark-950 data-[state=active]:shadow-aidyn-glow-primary hover:bg-aidyn-primary-100 dark:hover:bg-aidyn-primary-900',
        'aidyn-secondary': 
          'data-[state=active]:bg-aidyn-secondary data-[state=active]:text-white data-[state=active]:shadow-aidyn-glow-secondary hover:bg-aidyn-secondary-100 dark:hover:bg-aidyn-secondary-900',
        'aidyn-accent': 
          'data-[state=active]:bg-aidyn-accent data-[state=active]:text-aidyn-dark-950 data-[state=active]:shadow-aidyn-glow-accent hover:bg-aidyn-accent-100 dark:hover:bg-aidyn-accent-900',
        'aidyn-dark': 
          'data-[state=active]:bg-aidyn-dark data-[state=active]:text-white data-[state=active]:shadow-aidyn-soft hover:bg-aidyn-dark-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

// AIDYN Card variants - Themed cards with optional glow effects
export const aidynCardVariants = cva(
  'rounded-xl border bg-card text-card-foreground shadow',
  {
    variants: {
      variant: {
        default: '',
        'aidyn-primary': 
          'border-aidyn-primary-200 bg-gradient-to-br from-aidyn-primary-50 to-white shadow-aidyn-soft dark:from-aidyn-primary-950 dark:to-aidyn-dark-900 dark:border-aidyn-primary-800',
        'aidyn-secondary': 
          'border-aidyn-secondary-200 bg-gradient-to-br from-aidyn-secondary-50 to-white shadow-aidyn-soft dark:from-aidyn-secondary-950 dark:to-aidyn-dark-900 dark:border-aidyn-secondary-800',
        'aidyn-accent': 
          'border-aidyn-accent-200 bg-gradient-to-br from-aidyn-accent-50 to-white shadow-aidyn-soft dark:from-aidyn-accent-950 dark:to-aidyn-dark-900 dark:border-aidyn-accent-800',
        'aidyn-dark': 
          'border-aidyn-dark-700 bg-gradient-to-br from-aidyn-dark-900 to-aidyn-dark-800 shadow-aidyn-medium',
        'aidyn-glow': 
          'border-aidyn-primary-500 bg-aidyn-dark-950 shadow-aidyn-glow-primary',
        'aidyn-glass': 
          'border-white/20 bg-white/10 backdrop-blur-md shadow-aidyn-large dark:border-aidyn-primary-500/20 dark:bg-aidyn-primary-500/5',
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

// Export variant types for TypeScript support
export type AidynButtonVariants = VariantProps<typeof aidynButtonVariants>
export type AidynBadgeVariants = VariantProps<typeof aidynBadgeVariants>
export type AidynInputVariants = VariantProps<typeof aidynInputVariants>
export type AidynTabsVariants = VariantProps<typeof aidynTabsListVariants>
export type AidynCardVariants = VariantProps<typeof aidynCardVariants>

// AIDYN Theme configuration for CSS custom properties
export const aidynThemeConfig = {
  light: {
    '--background': '0 0% 100%',
    '--foreground': '0 8 18',  // aidyn-dark-950
    '--card': '0 0% 100%',
    '--card-foreground': '0 8 18',
    '--popover': '0 0% 100%',
    '--popover-foreground': '0 8 18',
    '--primary': '194 100% 50%',  // aidyn-primary-500
    '--primary-foreground': '0 8 18',
    '--secondary': '211 100% 50%',  // aidyn-secondary-500
    '--secondary-foreground': '0 0% 98%',
    '--muted': '210 40% 98%',
    '--muted-foreground': '215 16% 47%',
    '--accent': '151 85% 51%',  // aidyn-accent-500
    '--accent-foreground': '0 8 18',
    '--destructive': '0 100% 64%',  // aidyn-danger-500
    '--destructive-foreground': '210 40% 98%',
    '--border': '214 32% 91%',
    '--input': '214 32% 91%',
    '--ring': '194 100% 50%',  // aidyn-primary-500
    '--radius': '0.75rem',
  },
  dark: {
    '--background': '0 8 18',  // aidyn-dark-950
    '--foreground': '210 40% 98%',
    '--card': '10 15 37',  // aidyn-dark-900
    '--card-foreground': '210 40% 98%',
    '--popover': '10 15 37',
    '--popover-foreground': '210 40% 98%',
    '--primary': '194 100% 50%',  // aidyn-primary-500
    '--primary-foreground': '0 8 18',
    '--secondary': '211 100% 50%',  // aidyn-secondary-500
    '--secondary-foreground': '0 8 18',
    '--muted': '30 41 59',  // aidyn-dark-800
    '--muted-foreground': '148 163 184',
    '--accent': '151 85% 51%',  // aidyn-accent-500
    '--accent-foreground': '0 8 18',
    '--destructive': '0 100% 64%',  // aidyn-danger-500
    '--destructive-foreground': '210 40% 98%',
    '--border': '51 65 85',  // aidyn-dark-700
    '--input': '51 65 85',
    '--ring': '194 100% 50%',  // aidyn-primary-500
  },
}

// Utility function to apply AIDYN theme
export const applyAidynTheme = (theme: 'light' | 'dark' = 'light') => {
  const root = document.documentElement
  const themeColors = aidynThemeConfig[theme]
  
  Object.entries(themeColors).forEach(([property, value]) => {
    root.style.setProperty(property, value)
  })
}