# 🎨 Guide d'Intégration Design GenSpark - MCP-Hub

Ce guide explique comment intégrer les exports design de GenSpark dans le frontend MCP-Hub.

## 📁 Structure des Assets

L'arborescence suivante a été préparée pour recevoir les exports GenSpark :

```
frontend/
├─ public/
│   ├─ fonts/                    # 📝 Placer les .woff2 ici
│   │   ├─ aidyn-sans-regular.woff2
│   │   ├─ aidyn-sans-light.woff2
│   │   └─ aidvitneum-medium.woff2
│   ├─ icons/                    # 📝 Placer les icônes PWA ici
│   │   ├─ icon-72x72.png
│   │   ├─ icon-96x96.png
│   │   ├─ icon-128x128.png
│   │   ├─ icon-144x144.png
│   │   ├─ icon-152x152.png
│   │   ├─ icon-192x192.png
│   │   ├─ icon-384x384.png
│   │   └─ icon-512x512.png
│   └─ media/
│       ├─ illustrations/        # 📝 Placer les .webp ici
│       │   ├─ hero-image.webp
│       │   ├─ hero-image@2x.webp
│       │   └─ ...
│       └─ lottie/              # 📝 Placer les .json Lottie ici
│           ├─ loading-animation.json
│           └─ ...
├─ src/
│   ├─ styles/tokens/           # 📝 Placer design-tokens.json ici
│   │   └─ design-tokens.json
│   ├─ assets/
│   │   ├─ icons/               # 📝 SVG pour import ES6 (optionnel)
│   │   └─ media/               # 📝 Assets pour bundler (optionnel)
│   └─ ...
```

## 🚀 Instructions d'Intégration

### 1. Fonts (.woff2)

**Destination :** `public/fonts/`

```bash
# Copier les fonts exportées de GenSpark
cp exports/fonts/*.woff2 public/fonts/
```

**Noms attendus :**
- `aidyn-sans-regular.woff2` (Aidyn Sans Regular - 400)
- `aidyn-sans-light.woff2` (Aidyn Sans Light - 300)
- `aidvitneum-medium.woff2` (Aidvitneum Medium - 500)

Les `@font-face` sont déjà configurées dans `src/styles/index.css`.

### 2. Design Tokens (.json)

**Destination :** `src/styles/tokens/design-tokens.json`

```bash
# Copier le fichier de tokens
cp exports/design-tokens.json src/styles/tokens/
```

**Format attendu :**
```json
{
  "colors": {
    "primary": { "50": "#...", "900": "#0B1220", ... },
    "secondary": { ... },
    "neutral": { ... },
    "semantic": { "success": "#...", "error": "#...", ... }
  },
  "spacing": { "0": "0", "1": "0.25rem", ... },
  "typography": {
    "fontFamily": { "sans": ["Aidyn Sans", ...], ... },
    "fontSize": { "sm": { "size": "0.875rem", "lineHeight": "1.25rem" }, ... },
    "fontWeight": { "normal": 400, "medium": 500, ... }
  },
  "borderRadius": { "sm": "0.125rem", ... },
  "boxShadow": { "sm": "0 1px 2px ...", ... },
  "motion": {
    "duration": { "fast": "150ms", ... },
    "easing": { "aidyn": "cubic-bezier(0.25, 0.1, 0.25, 1)", ... }
  }
}
```

### 3. Icônes PWA (.png)

**Destination :** `public/icons/`

```bash
# Copier les icônes PWA
cp exports/icons/pwa/*.png public/icons/
```

**Tailles requises :** 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512

### 4. Illustrations (.webp)

**Destination :** `public/media/illustrations/`

```bash
# Copier les illustrations
cp exports/illustrations/*.webp public/media/illustrations/
```

**Format recommandé :** @1x et @2x pour support Retina.

### 5. Animations Lottie (.json)

**Destination :** `public/media/lottie/`

```bash
# Copier les animations
cp exports/lottie/*.json public/media/lottie/
```

## 🔧 Activation du Thème

### Méthode 1 : Développement Local

```bash
# 1. Placer tous les assets selon les instructions ci-dessus
# 2. Redémarrer le serveur de développement
npm run dev
```

### Méthode 2 : Build de Production

```bash
# 1. Placer tous les assets
# 2. Rebuilder l'image Docker
docker compose build frontend
docker compose up -d
```

## 🎨 Utilisation des Composants

### Variantes Aidyn

Les composants shadcn/ui ont été étendus avec des variantes Aidyn :

```tsx
// Boutons
<Button variant="aidyn-primary">Action principale</Button>
<Button variant="aidyn-secondary">Action secondaire</Button>

// Badges
<Badge variant="aidyn-primary">Statut</Badge>
<Badge variant="aidyn-success">Succès</Badge>

// Inputs
<Input variant="aidyn-primary" />
<Input variant="aidyn-error" aria-invalid />

// Tabs
<TabsList variant="aidyn-primary">
  <TabsTrigger variant="aidyn-primary">Onglet</TabsTrigger>
</TabsList>
```

### Classes Utilitaires

```tsx
// Couleurs Aidyn
className="bg-aidyn-primary text-white"
className="text-aidyn-primary border-aidyn-primary"

// Shadows
className="shadow-aidyn-soft"
className="shadow-aidyn-medium"

// Animations
className="animate-fade-in"
className="transition-all duration-200 ease-aidyn"
```

## 🔍 Vérification

### Checklist Post-Intégration

- [ ] **Fonts** : Les polices Aidyn Sans et Aidvitneum s'affichent correctement
- [ ] **Couleurs** : Le thème sombre utilise `#0B1220` comme arrière-plan
- [ ] **Icônes PWA** : Les icônes s'affichent dans le manifest et à l'installation
- [ ] **Tokens** : Les design tokens sont chargés sans erreur console
- [ ] **Composants** : Les variantes `aidyn-*` fonctionnent sur Button/Badge/Input/Tabs

### Tests Visuels

1. **Mode sombre/clair** : `Ctrl+Shift+I` → Application → Storage → Local Storage → Basculer `theme`
2. **Fonts** : Inspecter un élément de texte → Computed → `font-family`
3. **PWA** : Chrome → `...` → "Installer MCP-Hub" → Vérifier l'icône
4. **Responsive** : DevTools → Toggle device toolbar

## 🐛 Dépannage

### Fonts ne s'affichent pas
```bash
# Vérifier que les fichiers existent
ls -la public/fonts/
# Vérifier la console browser pour erreurs 404
```

### Design tokens non chargés
```bash
# Vérifier le fichier JSON
cat src/styles/tokens/design-tokens.json
# Vérifier la syntaxe JSON
npx jsonlint src/styles/tokens/design-tokens.json
```

### Build Docker échoue
```bash
# Nettoyer et rebuilder
docker compose down
docker compose build --no-cache frontend
docker compose up -d
```

## 📞 Support

En cas de problème :
1. Vérifier que tous les fichiers sont aux bons emplacements
2. Consulter la console navigateur pour erreurs
3. Vérifier les logs Docker : `docker compose logs frontend`

---

**Version :** 1.0
**Dernière MAJ :** $(date +%Y-%m-%d)
**Compatible :** MCP-Hub Frontend PWA