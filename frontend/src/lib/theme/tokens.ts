/**
 * Design Tokens - Système de design Aidyn
 *
 * Ce fichier charge et valide les design tokens exportés de GenSpark.
 * Les tokens seront importés depuis src/styles/tokens/design-tokens.json
 * une fois que les exports de GenSpark seront disponibles.
 */

// Schema de validation des design tokens
interface DesignTokens {
  colors: {
    primary: Record<string, string>
    secondary: Record<string, string>
    neutral: Record<string, string>
    semantic: Record<string, string>
  }
  spacing: Record<string, string>
  typography: {
    fontFamily: Record<string, string[]>
    fontSize: Record<string, { size: string; lineHeight: string }>
    fontWeight: Record<string, number>
  }
  borderRadius: Record<string, string>
  boxShadow: Record<string, string>
  motion: {
    duration: Record<string, string>
    easing: Record<string, string>
  }
}

// Tokens par défaut (placeholder pour GenSpark)
export const designTokens: DesignTokens = {
  colors: {
    primary: {
      50: '#f0f4ff',
      100: '#e0eaff',
      200: '#c7d8ff',
      300: '#a4bcff',
      400: '#8195ff',
      500: '#656eff',
      600: '#5145ff',
      700: '#4236e3',
      800: '#352db7',
      900: '#0B1220', // Couleur principale Aidyn
      950: '#000000'
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617'
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a'
    },
    semantic: {
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6'
    }
  },
  spacing: {
    '0': '0',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
    '32': '8rem'
  },
  typography: {
    fontFamily: {
      sans: ['Aidyn Sans', 'system-ui', 'sans-serif'],
      display: ['Aidvitneum', 'Aidyn Sans', 'system-ui', 'sans-serif']
    },
    fontSize: {
      xs: { size: '0.75rem', lineHeight: '1rem' },
      sm: { size: '0.875rem', lineHeight: '1.25rem' },
      base: { size: '1rem', lineHeight: '1.5rem' },
      lg: { size: '1.125rem', lineHeight: '1.75rem' },
      xl: { size: '1.25rem', lineHeight: '1.75rem' },
      '2xl': { size: '1.5rem', lineHeight: '2rem' },
      '3xl': { size: '1.875rem', lineHeight: '2.25rem' },
      '4xl': { size: '2.25rem', lineHeight: '2.5rem' }
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  },
  boxShadow: {
    sm: '0 1px 2px 0 rgba(11, 18, 32, 0.05)',
    base: '0 1px 3px 0 rgba(11, 18, 32, 0.1), 0 1px 2px 0 rgba(11, 18, 32, 0.06)',
    md: '0 4px 6px -1px rgba(11, 18, 32, 0.1), 0 2px 4px -1px rgba(11, 18, 32, 0.06)',
    lg: '0 10px 15px -3px rgba(11, 18, 32, 0.1), 0 4px 6px -2px rgba(11, 18, 32, 0.05)',
    xl: '0 20px 25px -5px rgba(11, 18, 32, 0.1), 0 10px 10px -5px rgba(11, 18, 32, 0.04)',
    '2xl': '0 25px 50px -12px rgba(11, 18, 32, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(11, 18, 32, 0.06)',
    none: 'none'
  },
  motion: {
    duration: {
      fast: '150ms',
      base: '200ms',
      slow: '300ms',
      slower: '500ms'
    },
    easing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      aidyn: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
    }
  }
}

/**
 * Fonction pour charger les design tokens depuis GenSpark
 * Cette fonction sera utilisée une fois que design-tokens.json sera disponible
 */
export async function loadDesignTokens(): Promise<DesignTokens> {
  try {
    // TODO: Charger depuis src/styles/tokens/design-tokens.json
    // const tokens = await import('../styles/tokens/design-tokens.json')
    // return validateTokens(tokens.default)

    // Pour l'instant, retourne les tokens par défaut
    return designTokens
  } catch (error) {
    console.warn('Design tokens GenSpark non trouvés, utilisation des tokens par défaut')
    return designTokens
  }
}

/**
 * Validation des design tokens
 */
function validateTokens(tokens: any): DesignTokens {
  // TODO: Ajouter la validation du schéma
  return tokens as DesignTokens
}

// Export des tokens individuels pour faciliter l'utilisation
export const {
  colors,
  spacing,
  typography,
  borderRadius,
  boxShadow,
  motion
} = designTokens