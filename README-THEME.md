# AIDYN Design System - Integration Guide

## 📋 Overview

Complete AIDYN design system integration for MCP-Hub frontend. This system is built from official AIDYN visual references and provides a comprehensive set of design tokens, components, and assets aligned with AIDYN Technologies brand guidelines.

## 🎨 AIDYN Color Palette

### Primary Brand Colors
```css
/* AIDYN Primary (Cyan) - Main brand color */
--aidyn-primary-500: #00e5ff    /* Extracted from UI references */

/* AIDYN Secondary (Blue) - Logo and buttons */  
--aidyn-secondary-500: #007bff  /* From logo and interface elements */

/* AIDYN Accent (Green) - Logo highlight */
--aidyn-accent-500: #1ed98b     /* Exact logo green color */

/* AIDYN Dark Backgrounds */
--aidyn-dark-900: #0a0f25       /* Main dark background */
--aidyn-dark-950: #000812       /* Darkest background */
```

### Status Colors
```css
--aidyn-success: #32cd32         /* Success states */
--aidyn-warning: #ffa500         /* Warning states */  
--aidyn-danger: #ff4b4b          /* Error states */
```

## 📂 Asset Directory Structure

```
frontend/
├── public/
│   ├── fonts/                  # AIDYN brand typefaces
│   │   ├── aidyn-sans-light.woff2
│   │   ├── aidyn-sans-regular.woff2
│   │   ├── aidyn-sans-medium.woff2
│   │   ├── aidyn-sans-semibold.woff2
│   │   ├── aidvitneum-medium.woff2
│   │   └── aidvitneum-bold.woff2
│   ├── icons/                  # PWA icons (72px to 512px)
│   │   ├── icon-72x72.png
│   │   ├── icon-96x96.png
│   │   ├── icon-128x128.png
│   │   ├── icon-144x144.png
│   │   ├── icon-152x152.png
│   │   ├── icon-192x192.png
│   │   ├── icon-384x384.png
│   │   └── icon-512x512.png
│   └── media/
│       ├── illustrations/      # WebP images (@1x/@2x)
│       │   ├── hero-illustration.webp
│       │   ├── hero-illustration@2x.webp
│       │   ├── dashboard-graphic.webp
│       │   └── dashboard-graphic@2x.webp
│       └── lottie/             # JSON animations
│           ├── loading-spinner.json
│           ├── ai-processing.json
│           └── email-send.json
└── src/
    ├── styles/
    │   ├── tokens/
    │   │   └── design-tokens.json     # DTCG standard tokens
    │   └── index.css                  # Main stylesheet
    └── lib/theme/
        ├── tokens.ts                  # TypeScript token mappings
        └── shadcn-theme.ts           # Component variants
```

## 🧩 Component Usage

### AIDYN Buttons
```tsx
import { Button } from '@/components/ui/button'

// Primary brand button (cyan with glow)
<Button variant="aidyn-primary">Primary Action</Button>

// Secondary button (blue) 
<Button variant="aidyn-secondary">Secondary</Button>

// Accent button (green)
<Button variant="aidyn-accent">Accent Action</Button>

// Outline variants
<Button variant="aidyn-outline-primary">Outline Primary</Button>

// Ghost variants
<Button variant="aidyn-ghost-primary">Ghost Primary</Button>

// Link style
<Button variant="aidyn-link">Link Button</Button>
```

### AIDYN Badges
```tsx
import { Badge } from '@/components/ui/badge'

// Status indicators
<Badge variant="aidyn-success">Active</Badge>
<Badge variant="aidyn-danger">Error</Badge> 
<Badge variant="aidyn-warning">Pending</Badge>

// Soft variants (subtle backgrounds)
<Badge variant="aidyn-soft-primary">Soft Primary</Badge>

// Outline variants
<Badge variant="aidyn-outline-primary">Outline</Badge>
```

### AIDYN Inputs
```tsx
import { Input } from '@/components/ui/input'

// Default input
<Input placeholder="Enter text..." />

// AIDYN branded focus states
<Input variant="aidyn-primary" placeholder="Primary input" />
<Input variant="aidyn-secondary" placeholder="Secondary input" />

// Error state
<Input variant="aidyn-danger" aria-invalid={true} />
```

### AIDYN Cards  
```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Themed cards with gradients
<Card variant="aidyn-primary" size="lg">
  <CardHeader>
    <CardTitle>AIDYN Primary Card</CardTitle>
  </CardHeader>
  <CardContent>Card content with AIDYN styling</CardContent>
</Card>

// Glass effect card
<Card variant="aidyn-glass">Glass card with backdrop blur</Card>

// Glowing card
<Card variant="aidyn-glow">Card with cyan glow effect</Card>
```

### AIDYN Tabs
```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

<Tabs defaultValue="tab1">
  <TabsList variant="aidyn-primary">
    <TabsTrigger variant="aidyn-primary" value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger variant="aidyn-primary" value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

## 🔧 Design Token Access

### TypeScript Usage
```tsx
import { colors, typography, spacing } from '@/lib/theme/tokens'

const customStyle = {
  backgroundColor: colors.primary[500],     // #00e5ff
  fontFamily: typography.fontFamily.primary.join(', '),
  padding: spacing[4],                      // 1rem
  borderRadius: borderRadius.lg,            // 0.5rem
}
```

### CSS Custom Properties
```css
.custom-element {
  background-color: hsl(var(--aidyn-primary-500));
  color: hsl(var(--aidyn-primary-foreground));
  border: 1px solid hsl(var(--aidyn-border));
}
```

### Tailwind Classes
```html
<!-- AIDYN brand colors -->
<div class="bg-aidyn-primary-500 text-aidyn-primary-50">
<div class="border-aidyn-secondary-500 text-aidyn-secondary-500">

<!-- AIDYN shadows and effects -->
<div class="shadow-aidyn-glow-primary">
<div class="shadow-aidyn-soft">

<!-- AIDYN animations -->
<div class="aidyn-pulse-glow">
<div class="aidyn-fade-in">
```

## 🌓 Theme Switching

### Automatic Theme Detection
```tsx
import { applyAidynTheme } from '@/lib/theme/shadcn-theme'

// Apply light theme
applyAidynTheme('light')

// Apply dark theme  
applyAidynTheme('dark')

// System preference detection
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
applyAidynTheme(prefersDark ? 'dark' : 'light')
```

### CSS-based Theme Toggle
```tsx
// Toggle dark class on document element
const toggleTheme = () => {
  document.documentElement.classList.toggle('dark')
}
```

## 📱 PWA Configuration

### Manifest Colors
The PWA manifest is configured with AIDYN brand colors:
```json
{
  "theme_color": "#000812",        // AIDYN dark background
  "background_color": "#000000",   // Black
  "icons": [
    // Icons should use AIDYN cyan (#00e5ff) and blue (#007bff)
  ]
}
```

## 🎯 Style Guide & Testing

### Development Route
Visit `/style-guide` in development mode to:
- Preview complete color palette
- Test component variants and states  
- Validate typography hierarchy
- Compare with AIDYN reference images
- Toggle between light/dark themes

### Component State Testing
The style guide includes interactive examples of:
- Button states (default, hover, active, focus, disabled)
- Input validation states
- Badge color variants
- Card layouts and effects
- Typography specimens

## 🔄 Asset Integration Workflow

### 1. Adding AIDYN Fonts
```bash
# 1. Place .woff2 files in public/fonts/
cp aidyn-sans-*.woff2 frontend/public/fonts/
cp aidvitneum-*.woff2 frontend/public/fonts/

# 2. Fonts are already configured in src/styles/index.css
# 3. Test with style guide: npm run dev → /style-guide
```

### 2. Adding PWA Icons
```bash
# 1. Generate icons in required sizes (72px to 512px)
# 2. Use AIDYN colors: #00e5ff (cyan), #007bff (blue)  
# 3. Place in public/icons/
cp icon-*.png frontend/public/icons/

# 4. Icons are referenced in public/manifest.json
```

### 3. Adding Illustrations
```bash
# 1. Export as WebP format (@1x and @2x)
# 2. Place in public/media/illustrations/
cp hero-illustration*.webp frontend/public/media/illustrations/

# 3. Usage in components:
# <img src="/media/illustrations/hero-illustration.webp" 
#      srcSet="/media/illustrations/hero-illustration@2x.webp 2x" />
```

### 4. Adding Lottie Animations  
```bash
# 1. Export JSON from After Effects
# 2. Use AIDYN colors in animations
# 3. Place in public/media/lottie/
cp *.json frontend/public/media/lottie/

# 4. Usage with lottie-web or react-lottie-player
```

## ✅ Quality Assurance Checklist

### Visual Conformity
- [ ] Colors match AIDYN reference images exactly
- [ ] Typography uses correct font families and weights
- [ ] Component spacing follows AIDYN grid system
- [ ] Glow effects match interface mockups
- [ ] Dark/light themes are consistent

### Accessibility Standards
- [ ] Color contrast ratios ≥ 4.5:1 (WCAG AA)
- [ ] Focus rings visible on all interactive elements
- [ ] Keyboard navigation works properly
- [ ] Screen reader compatibility maintained
- [ ] Touch targets ≥ 44px on mobile

### Technical Validation  
- [ ] All fonts load without FOUC (Flash of Unstyled Content)
- [ ] Design tokens validate against DTCG schema
- [ ] TypeScript types are properly exported
- [ ] CSS variables work in both themes
- [ ] PWA manifest validates

### Performance
- [ ] Font files use `font-display: swap`
- [ ] Images are optimized (WebP format)
- [ ] Lottie animations are < 100KB each
- [ ] Critical CSS is inlined if needed
- [ ] No unused CSS in production build

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production  
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint

# Docker development
docker compose up --build
```

## 🔍 Troubleshooting

### Fonts Not Loading
```bash
# 1. Check file paths in public/fonts/
ls -la frontend/public/fonts/

# 2. Verify @font-face declarations in src/styles/index.css
# 3. Check browser network tab for 404 errors
# 4. Ensure font-display: swap is set
```

### Colors Incorrect
```bash  
# 1. Verify CSS custom properties in DevTools
# 2. Check design-tokens.json for correct hex values
# 3. Validate Tailwind config imports tokens correctly
# 4. Compare with AIDYN reference images
```

### Components Not Styled
```bash
# 1. Check component imports use AIDYN variants
# 2. Verify shadcn-theme.ts exports are correct  
# 3. Ensure Tailwind includes all AIDYN classes
# 4. Test component props in style guide
```

## 📞 Support & Documentation

### Key Files Reference
- `src/styles/tokens/design-tokens.json` - Source of truth for all design tokens
- `src/lib/theme/tokens.ts` - TypeScript token definitions and utilities  
- `src/lib/theme/shadcn-theme.ts` - Component variant definitions
- `src/styles/index.css` - CSS custom properties and base styles
- `tailwind.config.ts` - Tailwind configuration with AIDYN extensions

### External Resources
- [Design Tokens Community Group](https://tr.designtokens.org/format/) - Token format specification
- [shadcn/ui Documentation](https://ui.shadcn.com/) - Base component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility framework documentation

---

**Version**: 1.0.0  
**Last Updated**: September 2024  
**Compatibility**: React 18+, TypeScript 5+, Tailwind 3+, Vite 5+

**🎨 AIDYN Design System is ready for production use**