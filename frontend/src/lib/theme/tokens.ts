/**
 * AIDYN Design Tokens
 * Generated from design-tokens.json
 * 
 * This file provides typed access to design tokens and validation.
 */

// Color Palette
export const colors = {
  primary: {
    50: '#e5ffff',
    100: '#ccfffe',
    200: '#99fffd',
    300: '#66fffc',
    400: '#33fffb',
    500: '#00e5ff', // Main primary color (AIDYN Cyan)
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
    500: '#007bff', // Main secondary color (AIDYN Blue)
    600: '#00b4ff',
    700: '#0056b3',
    800: '#003f80',
    900: '#00284d',
    950: '#00111a',
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
    900: '#0a0f25', // Main AIDYN dark background
    950: '#000812', // Darkest AIDYN background
  },
  accent: {
    50: '#e5fff5',
    100: '#ccffea',
    200: '#99ffd6',
    300: '#66ffc1',
    400: '#33ffad',
    500: '#1ed98b', // AIDYN Logo Green
    600: '#00ff7f',
    700: '#00cc66',
    800: '#00994d',
    900: '#006633',
    950: '#00331a',
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

// Typography
export const typography = {
  fontFamily: {
    primary: ['Aidyn Sans', 'Inter', 'system-ui', 'sans-serif'],
    secondary: ['Aidvitneum', 'Inter', 'system-ui', 'sans-serif'],
    mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  }
} as const;

// Spacing
export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
} as const;

// Border Radius
export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const;

// Shadows
export const shadows = {
  soft: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  glowPrimary: '0 0 20px rgba(0, 229, 255, 0.4)', // AIDYN Cyan glow
  glowSecondary: '0 0 20px rgba(0, 123, 255, 0.4)', // AIDYN Blue glow
  glowAccent: '0 0 20px rgba(30, 217, 139, 0.4)', // AIDYN Green glow
  glowSuccess: '0 0 15px rgba(50, 205, 50, 0.3)',
  glowDanger: '0 0 15px rgba(255, 75, 75, 0.3)',
} as const;

// Animation Timing
export const timing = {
  fast: '150ms',
  normal: '250ms',
  slow: '350ms',
  ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
} as const;

// Theme variants
export const themeVariants = {
  aidynPrimary: 'aidyn-primary',
  aidynSecondary: 'aidyn-secondary',
  aidynSuccess: 'aidyn-success',
  aidynWarning: 'aidyn-warning',
  aidynDanger: 'aidyn-danger',
} as const;

// Type definitions
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

// Utility functions
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

// CSS custom properties generator for runtime theme switching
export const generateCSSVariables = (theme: 'light' | 'dark' = 'light') => {
  const isDark = theme === 'dark';
  
  return {
    '--aidyn-primary': colors.primary[500],
    '--aidyn-primary-foreground': isDark ? colors.neutral[50] : colors.neutral[950],
    '--aidyn-secondary': colors.secondary[500],
    '--aidyn-secondary-foreground': isDark ? colors.neutral[50] : colors.neutral[950],
    '--aidyn-dark': colors.dark[950],
    '--aidyn-dark-foreground': colors.neutral[50],
    '--aidyn-background': isDark ? colors.dark[950] : colors.neutral[50],
    '--aidyn-foreground': isDark ? colors.neutral[50] : colors.dark[950],
    '--aidyn-muted': isDark ? colors.dark[800] : colors.neutral[100],
    '--aidyn-muted-foreground': isDark ? colors.neutral[400] : colors.neutral[600],
    '--aidyn-border': isDark ? colors.dark[700] : colors.neutral[200],
    '--aidyn-input': isDark ? colors.dark[800] : colors.neutral[50],
    '--aidyn-ring': colors.primary[500],
    '--aidyn-success': colors.success[500],
    '--aidyn-warning': colors.warning[500],
    '--aidyn-danger': colors.danger[500],
  };
};