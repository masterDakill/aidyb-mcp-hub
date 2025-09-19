# AIDYN Design System - Guide d'Intégration

## 📋 Vue d'ensemble

Ce projet intègre le design system AIDYN dans MCP-Hub. Le système de design est basé sur les tokens extraits des références visuelles fournies et implémente un thème cohérent avec les couleurs, typographies et composants AIDYN.

## 🎨 Couleurs Principales

```css
/* Couleurs AIDYN principales */
Primary (Vert):   #22cf6e   /* Couleur principale de marque */
Secondary (Cyan): #00d2c7   /* Couleur d'accent */
Dark (Slate):     #0b1220   /* Couleur sombre principale */
Success:          #22cf6e   /* États positifs */
Warning:          #eab308   /* États d'attention */
Danger:           #ef4444   /* États d'erreur */
```

## 📂 Structure des Assets

### Polices AIDYN
```
frontend/public/fonts/
├── aidyn-sans-light.woff2      (300)
├── aidyn-sans-regular.woff2    (400)
└── aidvitneum-medium.woff2     (500)
```

**⚠️ TODO:** Remplacer les polices placeholder par les vraies polices AIDYN une fois reçues.

### Icônes PWA
```
frontend/public/icons/
├── icon-72x72.png
├── icon-96x96.png
├── icon-128x128.png
├── icon-144x144.png
├── icon-152x152.png
├── icon-192x192.png
├── icon-384x384.png
└── icon-512x512.png
```

### Médias et Illustrations
```
frontend/public/media/
├── illustrations/          (fichiers WebP @1x/@2x)
└── lottie/                (animations JSON)
```

### Design Tokens
```
frontend/src/styles/tokens/
└── design-tokens.json      (tokens standard Design Tokens Community Group)

frontend/src/lib/theme/
├── tokens.ts              (tokens TypeScript avec validation)
└── shadcn-theme.ts        (variantes composants shadcn/ui)
```

## 🚀 Démarrage Rapide

### 1. Installation et Démarrage
```bash
# Démarrage avec Docker
docker compose up --build

# Ou développement local
cd frontend
npm install
npm run dev
```

### 2. Accès Style Guide
Visitez `/style-guide` (en développement) pour voir tous les composants et tester la conformité visuelle.

### 3. Tests de Conformité
- [ ] Vérifier les couleurs par rapport aux références AIDYN
- [ ] Tester le contraste (WCAG AA minimum)
- [ ] Valider les focus rings sur tous les composants
- [ ] Tester le mode sombre/clair
- [ ] Vérifier la responsivité

## 🎯 Variantes Composants AIDYN

### Boutons
```tsx
<Button variant="aidyn-primary">Action Principale</Button>
<Button variant="aidyn-secondary">Action Secondaire</Button>
<Button variant="aidyn-outline-primary">Outline</Button>
<Button variant="aidyn-ghost-primary">Ghost</Button>
```

### Badges
```tsx
<Badge variant="aidyn-primary">Primaire</Badge>
<Badge variant="aidyn-success">Succès</Badge>
<Badge variant="aidyn-soft-primary">Soft</Badge>
```

### Inputs
```tsx
<Input variant="aidyn-primary" placeholder="Input principal" />
<Input variant="aidyn-danger" aria-invalid={true} />
```

### Cards
```tsx
<Card variant="aidyn-primary" size="lg">
  Contenu de la card avec thème AIDYN
</Card>
```

## 🔧 Personnalisation Avancée

### Utilisation des Tokens en TypeScript
```tsx
import { colors, typography, spacing } from '@/lib/theme/tokens'

const customStyle = {
  backgroundColor: colors.primary[500],
  fontFamily: typography.fontFamily.primary.join(', '),
  padding: spacing[4]
}
```

### Classes Tailwind AIDYN
```css
/* Couleurs */
.bg-aidyn-primary-500
.text-aidyn-secondary-500
.border-aidyn-dark-200

/* Ombres */
.shadow-aidyn-soft
.shadow-aidyn-glow-primary

/* Animations */
.animate-pulse-glow
.transition-aidyn-normal
```

## 📁 Guide d'Ajout d'Assets

### Ajout de Polices AIDYN
1. Placer les fichiers `.woff2` dans `frontend/public/fonts/`
2. Mettre à jour les `@font-face` dans `frontend/src/styles/index.css`
3. Tester avec la page style guide

### Ajout d'Illustrations
1. Exporter en WebP (formats @1x et @2x)
2. Placer dans `frontend/public/media/illustrations/`
3. Noms descriptifs : `hero-illustration@2x.webp`

### Ajout d'Animations Lottie
1. Exporter en JSON depuis After Effects
2. Placer dans `frontend/public/media/lottie/`
3. Importer avec `import animationData from '/media/lottie/loading.json'`

### Ajout d'Icônes PWA
1. Générer les tailles requises (72px à 512px)
2. Format PNG avec fond transparent ou coloré
3. Placer dans `frontend/public/icons/`
4. Mettre à jour `manifest.json` si nécessaire

## 🎨 Thèmes et Mode Sombre

### Basculement Automatique
```tsx
import { applyAidynTheme } from '@/lib/theme/shadcn-theme'

// Application du thème
applyAidynTheme('dark') // ou 'light'
```

### Variables CSS Custom
```css
:root {
  --aidyn-primary: #22cf6e;
  --aidyn-secondary: #00d2c7;
  --aidyn-dark: #0b1220;
}

.dark {
  --aidyn-background: var(--aidyn-dark);
  --aidyn-foreground: #f8fafc;
}
```

## ✅ Checklist de Contrôle Qualité

### Contraste et Accessibilité
- [ ] Ratios de contraste ≥ 4.5:1 (texte normal)
- [ ] Ratios de contraste ≥ 3:1 (texte large)
- [ ] Focus rings visibles sur tous les éléments interactifs
- [ ] États hover/active/disabled clairement définis

### Responsive Design
- [ ] Breakpoints cohérents (mobile, tablet, desktop)
- [ ] Textes lisibles sur toutes les tailles
- [ ] Éléments interactifs accessibles au toucher (44px min)

### Performance
- [ ] Polices avec `font-display: swap`
- [ ] Images optimisées (WebP, tailles appropriées)
- [ ] CSS critique inline si nécessaire

### Conformité AIDYN
- [ ] Couleurs exactes selon les références
- [ ] Typographie cohérente
- [ ] Espacements et rayons conformes
- [ ] Ombres et effets visuels corrects

## 🔄 Workflow de Mise à Jour

### Mise à Jour des Tokens
1. Modifier `frontend/src/styles/tokens/design-tokens.json`
2. Régénérer `frontend/src/lib/theme/tokens.ts`
3. Mettre à jour `tailwind.config.ts`
4. Tester avec la page style guide
5. Valider la conformité visuelle

### Ajout de Nouvelles Variantes
1. Étendre les variantes dans `shadcn-theme.ts`
2. Ajouter les types TypeScript correspondants
3. Mettre à jour les composants concernés
4. Documenter dans le style guide
5. Ajouter les tests de régression

## 🐛 Dépannage

### Polices Non Chargées
- Vérifier les chemins dans `/public/fonts/`
- Contrôler les `@font-face` dans `index.css`
- Inspecter la console pour les erreurs 404

### Couleurs Incorrectes
- Vérifier les variables CSS dans DevTools
- Contrôler l'import des tokens TypeScript
- Valider la configuration Tailwind

### Composants Non Stylés
- Vérifier les imports des variantes AIDYN
- Contrôler les props passées aux composants
- Inspecter les classes CSS générées

## 📞 Support

Pour les questions spécifiques au design system AIDYN :
1. Consulter la page style guide (`/style-guide`)
2. Vérifier les tokens dans `frontend/src/lib/theme/`
3. Comparer avec les références visuelles originales

---

**Version:** 1.0.0
**Dernière mise à jour:** $(date +%Y-%m-%d)
**Compatibilité:** React 18+, TypeScript 5+, Tailwind 3+