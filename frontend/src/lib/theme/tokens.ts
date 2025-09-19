/**
 * AIDYN Design Tokens
 * Generated from design-tokens.json based on AIDYN Technologies visual references
 * 
 * This file provides typed access to design tokens and CSS variable generation.
 */

// AIDYN Color Palette - Extracted from visual references
export const colors = {
  primary: {
    50: '#e5ffff',
    100: '#ccfffe',
    200: '#99fffd',
    300: '#66fffc',
    400: '#33fffb',
    500: '#00e5ff', // AIDYN Primary Cyan - main brand color
    600: '#00bff3',
    700: '#0099cc',
    800: '#007399',
    900: '#004d66',
    950: '#002633',
  },
  secondary: {
    50: '#e5f2ff',
    100: '#ccebff',
    200: '#99d6ff',
    300: '#66c2ff',
    400: '#33adff',
    500: '#007bff', // AIDYN Secondary Blue - logo and buttons
    600: '#00b4ff',
    700: '#0056b3',
    800: '#003f80',
    900: '#00284d',
    950: '#00111a',
  },
  accent: {
    50: '#e5fff5',
    100: '#ccffea',
    200: '#99ffd6',
    300: '#66ffc1',
    400: '#33ffad',
    500: '#1ed98b', // AIDYN Logo Green - accent brand color
    600: '#00ff7f',
    700: '#00cc66',
    800: '#00994d',
    900: '#006633',
    950: '#00331a',
  },
  dark: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0a0f25', // AIDYN Main Dark Background
    950: '#000812', // AIDYN Darkest Background
  },
  success: {
    500: '#32cd32', // AIDYN Success Green
    600: '#00ff7f',
  },
  warning: {
    500: '#ffa500', // AIDYN Warning Orange
    600: '#ff8c00',
  },
  danger: {
    500: '#ff4b4b', // AIDYN Error Red
    600: '#e81123',
  },
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  }
} as const;

// AIDYN Typography - Based on brand typefaces
export const typography = {
  fontFamily: {
    primary: ['Aidyn Sans', 'Inter', 'system-ui', 'sans-serif'], // Main UI font
    display: ['Aidvitneum', 'Aidyn Sans', 'Inter', 'system-ui', 'sans-serif'], // Display font
    mono: ['Fira Code', 'JetBrains Mono', 'Consolas', 'monospace'], // Code font
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px - base size
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  }
} as const;

// AIDYN Spacing Scale
export const spacing = {
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem',  // 40px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
  20: '5rem',    // 80px
  24: '6rem',    // 96px
  32: '8rem',    // 128px
} as const;

// AIDYN Border Radius
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px - AIDYN standard
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
} as const;

// AIDYN Shadows and Glow Effects - Based on visual references
export const shadows = {
  soft: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  glowPrimary: '0 0 20px rgba(0, 229, 255, 0.4)',      // AIDYN Cyan glow
  glowSecondary: '0 0 20px rgba(0, 123, 255, 0.4)',    // AIDYN Blue glow
  glowAccent: '0 0 20px rgba(30, 217, 139, 0.4)',      // AIDYN Green glow
  glowSuccess: '0 0 15px rgba(50, 205, 50, 0.3)',
  glowDanger: '0 0 15px rgba(255, 75, 75, 0.3)',
} as const;

// AIDYN Animation Timing
export const timing = {
  fast: '150ms',
  normal: '250ms',
  slow: '350ms',
  ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
} as const;

// AIDYN Theme Variants
export const themeVariants = {
  aidynPrimary: 'aidyn-primary',
  aidynSecondary: 'aidyn-secondary',
  aidynAccent: 'aidyn-accent',
  aidynSuccess: 'aidyn-success',
  aidynWarning: 'aidyn-warning',
  aidynDanger: 'aidyn-danger',
} as const;

// Type definitions for better TypeScript support
export type ColorKey = keyof typeof colors;
export type ColorVariant = keyof typeof colors.primary;
export type FontFamily = keyof typeof typography.fontFamily;
export type FontWeight = keyof typeof typography.fontWeight;
export type FontSize = keyof typeof typography.fontSize;
export type SpacingKey = keyof typeof spacing;
export type BorderRadiusKey = keyof typeof borderRadius;
export type ShadowKey = keyof typeof shadows;
export type TimingKey = keyof typeof timing;
export type ThemeVariant = keyof typeof themeVariants;

// Utility functions for token access
export const getColor = (color: ColorKey, variant: ColorVariant = '500') => {
  return colors[color][variant as keyof typeof colors[ColorKey]];
};

export const getFontFamily = (family: FontFamily) => {
  return typography.fontFamily[family].join(', ');
};

export const validateToken = (category: string, key: string): boolean => {
  const tokenCategories = {
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
    timing,
  };
  
  return !!(tokenCategories as any)[category]?.[key];
};

// CSS Custom Properties generator for runtime theme switching
export const generateCSSVariables = (theme: 'light' | 'dark' = 'light') => {
  const isDark = theme === 'dark';
  
  return {
    // AIDYN Brand Colors
    '--aidyn-primary': colors.primary[500],
    '--aidyn-primary-foreground': isDark ? colors.neutral[50] : colors.dark[950],
    '--aidyn-secondary': colors.secondary[500],
    '--aidyn-secondary-foreground': isDark ? colors.neutral[50] : colors.dark[950],
    '--aidyn-accent': colors.accent[500],
    '--aidyn-accent-foreground': isDark ? colors.neutral[50] : colors.dark[950],
    
    // Theme-aware colors
    '--aidyn-background': isDark ? colors.dark[950] : colors.neutral[50],
    '--aidyn-foreground': isDark ? colors.neutral[50] : colors.dark[950],
    '--aidyn-muted': isDark ? colors.dark[800] : colors.neutral[100],
    '--aidyn-muted-foreground': isDark ? colors.neutral[400] : colors.neutral[600],
    '--aidyn-border': isDark ? colors.dark[700] : colors.neutral[200],
    '--aidyn-input': isDark ? colors.dark[800] : colors.neutral[50],
    '--aidyn-ring': colors.primary[500],
    
    // Status colors
    '--aidyn-success': colors.success[500],
    '--aidyn-warning': colors.warning[500],
    '--aidyn-danger': colors.danger[500],
  };
};

// CSS Variables as strings for Tailwind config
export const cssVariables = {
  primary: {
    DEFAULT: 'hsl(var(--aidyn-primary))',
    foreground: 'hsl(var(--aidyn-primary-foreground))',
  },
  secondary: {
    DEFAULT: 'hsl(var(--aidyn-secondary))',
    foreground: 'hsl(var(--aidyn-secondary-foreground))',
  },
  accent: {
    DEFAULT: 'hsl(var(--aidyn-accent))',
    foreground: 'hsl(var(--aidyn-accent-foreground))',
  },
  background: 'hsl(var(--aidyn-background))',
  foreground: 'hsl(var(--aidyn-foreground))',
  muted: {
    DEFAULT: 'hsl(var(--aidyn-muted))',
    foreground: 'hsl(var(--aidyn-muted-foreground))',
  },
  border: 'hsl(var(--aidyn-border))',
  input: 'hsl(var(--aidyn-input))',
  ring: 'hsl(var(--aidyn-ring))',
  success: 'hsl(var(--aidyn-success))',
  warning: 'hsl(var(--aidyn-warning))',
  danger: 'hsl(var(--aidyn-danger))',
};