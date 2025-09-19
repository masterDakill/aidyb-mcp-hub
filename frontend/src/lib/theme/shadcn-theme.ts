/**
 * Mapping des design tokens vers les variantes shadcn/ui
 *
 * Ce fichier définit les variantes pour les composants shadcn/ui
 * en utilisant les design tokens de GenSpark.
 */

import { cva, type VariantProps } from 'class-variance-authority'
import { designTokens } from './tokens'

/**
 * Variantes pour le composant Button
 */
export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-aidyn-primary text-white hover:bg-aidyn-primary/90 active:bg-aidyn-primary/80',
        destructive: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        // Variantes Aidyn spécifiques
        'aidyn-primary': 'bg-aidyn-primary text-white hover:bg-aidyn-primary/90 shadow-aidyn-soft',
        'aidyn-secondary': 'bg-aidyn-accent text-aidyn-primary border border-aidyn-primary/20 hover:bg-aidyn-accent/80',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        // Tailles Aidyn spécifiques
        'aidyn-compact': 'h-8 px-3 text-xs',
        'aidyn-large': 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

/**
 * Variantes pour le composant Badge
 */
export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-red-500 text-white hover:bg-red-600',
        outline: 'text-foreground border-border',
        // Variantes Aidyn spécifiques
        'aidyn-primary': 'border-transparent bg-aidyn-primary text-white',
        'aidyn-accent': 'border-aidyn-primary bg-aidyn-accent text-aidyn-primary',
        'aidyn-success': 'border-transparent bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        'aidyn-warning': 'border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        'aidyn-danger': 'border-transparent bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

/**
 * Variantes pour le composant Input
 */
export const inputVariants = cva(
  'flex w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'h-10 px-3 py-2',
        // Variantes Aidyn spécifiques
        'aidyn-primary': 'border-aidyn-primary/30 focus-visible:ring-aidyn-primary',
        'aidyn-error': 'border-red-500 focus-visible:ring-red-500',
        'aidyn-success': 'border-green-500 focus-visible:ring-green-500',
      },
      size: {
        default: 'h-10 px-3 py-2',
        sm: 'h-9 px-3 py-2 text-sm',
        lg: 'h-11 px-4 py-3',
        // Tailles Aidyn spécifiques
        'aidyn-compact': 'h-8 px-2 py-1 text-xs',
        'aidyn-large': 'h-12 px-4 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

/**
 * Variantes pour le composant Tabs
 */
export const tabsListVariants = cva(
  'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
  {
    variants: {
      variant: {
        default: '',
        // Variantes Aidyn spécifiques
        'aidyn-primary': 'bg-aidyn-accent border border-aidyn-primary/20',
        'aidyn-minimal': 'bg-transparent border-b border-border p-0 h-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        // Variantes Aidyn spécifiques
        'aidyn-primary': 'data-[state=active]:bg-aidyn-primary data-[state=active]:text-white',
        'aidyn-minimal': 'rounded-none border-b-2 border-transparent data-[state=active]:border-aidyn-primary data-[state=active]:bg-transparent px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

/**
 * Utilitaires pour les classes CSS dynamiques
 */
export const aidynThemeClasses = {
  // Couleurs principales
  primary: {
    bg: 'bg-aidyn-primary',
    text: 'text-aidyn-primary',
    border: 'border-aidyn-primary',
    ring: 'ring-aidyn-primary',
  },
  accent: {
    bg: 'bg-aidyn-accent',
    text: 'text-aidyn-accent',
    border: 'border-aidyn-accent',
    ring: 'ring-aidyn-accent',
  },
  // Shadows
  shadow: {
    soft: 'shadow-aidyn-soft',
    medium: 'shadow-aidyn-medium',
  },
  // Animations
  animation: {
    fadeIn: 'animate-fade-in',
  },
  // Transitions
  transition: {
    aidyn: 'transition-all duration-200 ease-aidyn',
  },
} as const

/**
 * Types pour les variantes
 */
export type ButtonVariants = VariantProps<typeof buttonVariants>
export type BadgeVariants = VariantProps<typeof badgeVariants>
export type InputVariants = VariantProps<typeof inputVariants>
export type TabsListVariants = VariantProps<typeof tabsListVariants>
export type TabsTriggerVariants = VariantProps<typeof tabsTriggerVariants>

/**
 * Fonction helper pour combiner les classes avec les variantes Aidyn
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(' ')
}

/**
 * Fonction pour générer des classes dynamiques avec les tokens
 */
export function getAidynTokenClass(
  property: 'bg' | 'text' | 'border' | 'ring',
  tokenPath: string
): string {
  // Cette fonction sera étendue pour mapper les tokens GenSpark
  // vers les classes Tailwind appropriées
  return `${property}-[${tokenPath}]`
}