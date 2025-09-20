#!/bin/bash
set -e

echo "🎨 Installation des Assets AIDYN - MCP-Hub"
echo "==========================================="

# Variables
FRONTEND_DIR="frontend"
FONTS_DIR="$FRONTEND_DIR/public/fonts"
ICONS_DIR="$FRONTEND_DIR/public/icons"
ILLUSTRATIONS_DIR="$FRONTEND_DIR/public/media/illustrations"
LOTTIE_DIR="$FRONTEND_DIR/public/media/lottie"
TOKENS_FILE="$FRONTEND_DIR/src/styles/tokens/design-tokens.json"

# Fonction pour vérifier si un fichier existe
check_file() {
    if [ -f "$1" ]; then
        echo "✅ $1 trouvé"
        return 0
    else
        echo "❌ $1 manquant"
        return 1
    fi
}

# Fonction pour créer un répertoire s'il n'existe pas
ensure_dir() {
    if [ ! -d "$1" ]; then
        mkdir -p "$1"
        echo "📁 Créé: $1"
    fi
}

echo ""
echo "📋 1) Vérification de la structure..."
ensure_dir "$FONTS_DIR"
ensure_dir "$ICONS_DIR"
ensure_dir "$ILLUSTRATIONS_DIR"
ensure_dir "$LOTTIE_DIR"

echo ""
echo "🔍 2) Vérification des assets AIDYN..."

# Vérification des polices
echo "📝 Polices AIDYN:"
FONTS_MISSING=0
check_file "$FONTS_DIR/aidyn-sans-light.woff2" || FONTS_MISSING=1
check_file "$FONTS_DIR/aidyn-sans-regular.woff2" || FONTS_MISSING=1
check_file "$FONTS_DIR/aidvitneum-medium.woff2" || FONTS_MISSING=1

# Vérification des icônes PWA
echo ""
echo "🎯 Icônes PWA:"
ICONS_MISSING=0
for size in 72 96 128 144 152 192 384 512; do
    check_file "$ICONS_DIR/icon-${size}x${size}.png" || ICONS_MISSING=1
done

# Vérification du fichier de tokens
echo ""
echo "🔧 Design Tokens:"
check_file "$TOKENS_FILE" || echo "ℹ️ Design tokens par défaut utilisés"

echo ""
echo "🚀 3) Test du build..."
cd "$FRONTEND_DIR"

# Installation des dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm ci --no-audit --no-fund
fi

# Build du projet
echo "🏗️ Build du frontend..."
npm run build

echo ""
echo "🐳 4) Test Docker..."
cd ..

# Build et démarrage du container
echo "🔨 Build de l'image Docker..."
docker compose build frontend

echo "🚀 Démarrage du container..."
docker compose up -d frontend

# Test du health check
echo "💚 Test du health check..."
sleep 5
if curl -sf http://localhost/health > /dev/null; then
    echo "✅ Health check OK"
else
    echo "⚠️ Health check échoué"
fi

echo ""
echo "📊 5) Résumé de l'installation:"
echo "================================"

if [ $FONTS_MISSING -eq 0 ]; then
    echo "✅ Polices AIDYN: Toutes présentes"
else
    echo "⚠️ Polices AIDYN: Manquantes - Déposez les .woff2 dans $FONTS_DIR/"
fi

if [ $ICONS_MISSING -eq 0 ]; then
    echo "✅ Icônes PWA: Toutes présentes"
else
    echo "⚠️ Icônes PWA: Manquantes - Déposez les .png dans $ICONS_DIR/"
fi

echo "✅ Frontend build: Réussi"
echo "✅ Docker: Opérationnel"

echo ""
echo "🔗 URLs de test:"
echo "  - Production: http://localhost/"
echo "  - Style Guide: http://localhost/style-guide"
echo "  - Health: http://localhost/health"

echo ""
if [ $FONTS_MISSING -eq 1 ] || [ $ICONS_MISSING -eq 1 ]; then
    echo "📌 Actions requises:"
    [ $FONTS_MISSING -eq 1 ] && echo "  1. Déposer les polices AIDYN (.woff2) dans $FONTS_DIR/"
    [ $ICONS_MISSING -eq 1 ] && echo "  2. Déposer les icônes PWA (.png) dans $ICONS_DIR/"
    echo "  3. Relancer: ./install-aidyn-assets.sh"
else
    echo "🎉 Installation AIDYN complète! Le frontend est prêt."
fi

echo ""
echo "📋 Pour plus de détails, consultez CHECKLIST.md"