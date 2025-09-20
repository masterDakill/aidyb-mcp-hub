# 🔧 Guide de Conversion des Assets AIDYN

Ce guide vous explique comment traiter les assets générés pour les optimiser pour production.

## 📱 **Conversion des Icônes PWA**

### Redimensionnement avec ImageMagick
```bash
# Installation d'ImageMagick (si nécessaire)
apt-get install imagemagick  # Ubuntu/Debian
brew install imagemagick     # macOS

# À partir de l'icône source 1024x1024
convert frontend/public/icons/icon-512x512-source.png -resize 512x512 frontend/public/icons/icon-512x512.png
convert frontend/public/icons/icon-512x512-source.png -resize 384x384 frontend/public/icons/icon-384x384.png
convert frontend/public/icons/icon-512x512-source.png -resize 192x192 frontend/public/icons/icon-192x192.png
convert frontend/public/icons/icon-512x512-source.png -resize 152x152 frontend/public/icons/icon-152x152.png
convert frontend/public/icons/icon-512x512-source.png -resize 144x144 frontend/public/icons/icon-144x144.png
convert frontend/public/icons/icon-512x512-source.png -resize 128x128 frontend/public/icons/icon-128x128.png
convert frontend/public/icons/icon-512x512-source.png -resize 96x96 frontend/public/icons/icon-96x96.png
convert frontend/public/icons/icon-512x512-source.png -resize 72x72 frontend/public/icons/icon-72x72.png
```

### Script Automatique de Redimensionnement
```bash
#!/bin/bash
# resize-icons.sh

SIZES=(72 96 128 144 152 192 384 512)
SOURCE="frontend/public/icons/icon-512x512-source.png"
OUTPUT_DIR="frontend/public/icons/"

for size in "${SIZES[@]}"; do
  echo "Generating ${size}x${size} icon..."
  convert "$SOURCE" -resize "${size}x${size}" "${OUTPUT_DIR}icon-${size}x${size}.png"
done

echo "✅ All PWA icons generated!"
```

## 🖼️ **Optimisation des Illustrations**

### Conversion PNG vers WebP
```bash
# Avec cwebp (Google WebP tools)
cwebp -q 85 frontend/public/media/illustrations/hero-tech.png -o frontend/public/media/illustrations/hero-tech.webp
cwebp -q 85 frontend/public/media/illustrations/dashboard.png -o frontend/public/media/illustrations/dashboard.webp
cwebp -q 85 frontend/public/media/illustrations/error-state.png -o frontend/public/media/illustrations/error-state.webp

# Créer les versions @2x (haute résolution)
cwebp -q 90 -resize 1920 1080 frontend/public/media/illustrations/hero-tech.png -o frontend/public/media/illustrations/hero-tech@2x.webp
```

### Script Batch de Conversion WebP
```bash
#!/bin/bash
# convert-to-webp.sh

INPUT_DIR="frontend/public/media/illustrations/"
QUALITY=85

for file in "${INPUT_DIR}"*.png; do
  filename=$(basename "$file" .png)
  echo "Converting $filename.png to WebP..."
  cwebp -q $QUALITY "$file" -o "${INPUT_DIR}${filename}.webp"
  
  # Créer version @2x
  cwebp -q 90 -resize 2048 0 "$file" -o "${INPUT_DIR}${filename}@2x.webp"
done
```

## 🎬 **Conversion des Animations**

### MP4 vers Lottie JSON avec After Effects
1. Importer les fichiers MP4 dans After Effects
2. Exporter avec le plugin Bodymovin (Lottie)
3. Paramètres recommandés :
   - Format : JSON
   - Optimisation : Activée
   - Compression : gzip
   - Segments : Activés

### Alternative avec LottieFiles
1. Uploader les MP4 sur https://lottiefiles.com/
2. Utiliser leur convertisseur automatique
3. Télécharger les fichiers JSON optimisés

### Exemple d'implémentation React
```jsx
import Lottie from 'lottie-react'
import loadingAnimation from '/media/lottie/loading.json'

function LoadingSpinner() {
  return (
    <Lottie
      animationData={loadingAnimation}
      loop={true}
      style={{ width: 64, height: 64 }}
    />
  )
}
```

## 🔤 **Génération des Polices WOFF2**

### Avec FontForge (recommandé)
1. Utiliser le specimen généré comme référence visuelle
2. Créer les polices avec FontForge ou FontLab
3. Exporter en format WOFF2

### Alternative avec outils en ligne
1. **Calligraphr** - Génération de polices à partir d'écriture manuscrite
2. **FontStruct** - Création de polices modulaires
3. **BirdFont** - Éditeur de polices open source

### Nommage des fichiers
```
frontend/public/fonts/
├── aidyn-sans-light.woff2     (300)
├── aidyn-sans-regular.woff2   (400)
├── aidyn-sans-medium.woff2    (500)
├── aidyn-sans-semibold.woff2  (600)
├── aidvitneum-medium.woff2    (500)
└── aidvitneum-bold.woff2      (700)
```

## ✅ **Activation dans le Code**

### 1. Décommenter les fonts dans CSS
```css
/* Décommenter dans src/styles/index.css */
@font-face {
  font-family: 'Aidyn Sans';
  src: url('/fonts/aidyn-sans-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

### 2. Restaurer les icônes PWA
```json
// Dans public/manifest.json
{
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable any"
    }
    // ... autres tailles
  ]
}
```

### 3. Utiliser les illustrations
```jsx
// Exemple d'utilisation React
<img 
  src="/media/illustrations/hero-tech.webp"
  srcSet="/media/illustrations/hero-tech@2x.webp 2x"
  alt="AIDYN Technology Hero"
  loading="lazy"
/>
```

## 🎯 **Validation Finale**

### Tests à effectuer
- [ ] Toutes les icônes PWA s'affichent correctement
- [ ] Les illustrations se chargent en WebP
- [ ] Les animations Lottie fonctionnent
- [ ] Les polices se chargent sans erreur 404
- [ ] Le style guide affiche les bonnes couleurs AIDYN

### Outils de validation
- **PWA**: Lighthouse audit
- **WebP**: Vérification navigateur DevTools
- **Fonts**: FontFace Observer pour le chargement
- **Lottie**: Test des animations en boucle

---

**🎉 Félicitations ! Votre design system AIDYN est maintenant complet et optimisé pour la production !**