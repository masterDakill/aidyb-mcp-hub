#!/bin/bash
# 🎨 AIDYN Assets Installation Script
# Télécharge et installe tous les assets AIDYN générés dans le bon dossier

echo "🎯 Installation des assets AIDYN pour MCP-Hub..."

# Créer les dossiers de destination
mkdir -p frontend/public/icons
mkdir -p frontend/public/media/illustrations
mkdir -p frontend/public/media/lottie
mkdir -p frontend/public/fonts

echo "📁 Dossiers créés..."

# Télécharger les icônes PWA
echo "📱 Téléchargement des icônes PWA..."
curl -o "frontend/public/icons/icon-512x512-source.png" "https://cdn1.genspark.ai/user-upload-image/3_generated/a17e9d52-661d-4b00-82e6-2a933b915770"
curl -o "frontend/public/icons/icons-pack.png" "https://cdn1.genspark.ai/user-upload-image/3_generated/45944c69-c891-42ea-b8c1-9a9412f392a3"

# Télécharger les illustrations
echo "🎨 Téléchargement des illustrations..."
curl -o "frontend/public/media/illustrations/hero-tech.png" "https://cdn1.genspark.ai/user-upload-image/3_generated/f1be181e-3480-4c19-a06a-863777e916e6"
curl -o "frontend/public/media/illustrations/dashboard.png" "https://cdn1.genspark.ai/user-upload-image/3_generated/1239bd82-a032-4397-81f7-188beb336aea"
curl -o "frontend/public/media/illustrations/error-state.png" "https://cdn1.genspark.ai/user-upload-image/3_generated/e31f7e7e-2bbb-4ac7-8574-0106c72783c0"

# Télécharger les animations
echo "🎬 Téléchargement des animations..."
curl -o "frontend/public/media/lottie/loading.mp4" "https://cdn1.genspark.ai/user-upload-image/1/02a45200-2da3-44cb-a0db-0b20ac6217c8.mp4"
curl -o "frontend/public/media/lottie/success.mp4" "https://cdn1.genspark.ai/user-upload-image/1/bffde8d5-7a91-4397-b9eb-db0d20ed65c1.mp4"

# Télécharger le specimen de fonte
echo "🔤 Téléchargement du specimen de fonte..."
curl -o "frontend/public/fonts/aidyn-sans-specimen.png" "https://cdn1.genspark.ai/user-upload-image/3_generated/cd569158-13cb-420b-9acd-934e469d11f9"

echo "✅ Tous les assets AIDYN ont été téléchargés !"

# Instructions post-installation
echo ""
echo "📋 PROCHAINES ÉTAPES :"
echo "1. Redimensionner les icônes PWA avec ImageMagick ou Photoshop"
echo "2. Convertir les PNG en WebP optimisé"
echo "3. Convertir les MP4 en format Lottie JSON si nécessaire"
echo "4. Décommenter les @font-face dans src/styles/index.css"
echo "5. Restaurer les icônes dans public/manifest.json"
echo ""
echo "🔗 Consultez AIDYN-ASSETS-GENERATED.md pour les détails complets"

# Rendre le script exécutable
chmod +x install-aidyn-assets.sh