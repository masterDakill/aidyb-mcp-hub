#!/bin/bash
# Script de vérification de santé MCP-Hub

set -e

echo "🏥 Health Check MCP-Hub"
echo "======================="

# Couleurs pour l'affichage
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour tester un endpoint
test_endpoint() {
    local url=$1
    local name=$2
    local expected_pattern=$3

    echo -n "Testing $name ($url)... "

    if response=$(curl -sf --max-time 10 "$url" 2>/dev/null); then
        if [[ -z "$expected_pattern" ]] || echo "$response" | grep -q "$expected_pattern"; then
            echo -e "${GREEN}✅ OK${NC}"
            return 0
        else
            echo -e "${RED}❌ FAIL${NC} (unexpected response: $response)"
            return 1
        fi
    else
        echo -e "${RED}❌ FAIL${NC} (connection error)"
        return 1
    fi
}

# Fonction pour vérifier les conteneurs
check_containers() {
    echo -e "\n📊 État des conteneurs:"
    echo "------------------------"

    # Liste des conteneurs attendus
    containers=("mcphub-postgres" "mcphub-mail-parser" "mcphub-metamcp" "mcphub-nginx")

    all_running=true
    for container in "${containers[@]}"; do
        if docker ps --format "table {{.Names}}\t{{.Status}}" | grep -q "$container"; then
            status=$(docker ps --format "table {{.Names}}\t{{.Status}}" | grep "$container" | awk '{for(i=2;i<=NF;i++) printf "%s ", $i; print ""}')
            echo -e "${GREEN}✅${NC} $container: $status"
        else
            echo -e "${RED}❌${NC} $container: NOT RUNNING"
            all_running=false
        fi
    done

    return $all_running
}

# Fonction pour vérifier les volumes
check_volumes() {
    echo -e "\n💾 Volumes persistants:"
    echo "----------------------"

    volumes=("mcphub-postgres-data" "mcphub-metamcp-data" "mcphub-frontend-dist")

    for volume in "${volumes[@]}"; do
        if docker volume inspect "$volume" >/dev/null 2>&1; then
            size=$(docker volume inspect "$volume" --format '{{.Mountpoint}}' | xargs du -sh 2>/dev/null | cut -f1 || echo "N/A")
            echo -e "${GREEN}✅${NC} $volume: $size"
        else
            echo -e "${RED}❌${NC} $volume: NOT FOUND"
        fi
    done
}

# Attendre que les services soient prêts
echo "⏳ Attente du démarrage des services (30s max)..."
sleep 5

# Vérifier les conteneurs
if ! check_containers; then
    echo -e "\n${RED}❌ Certains conteneurs ne sont pas démarrés${NC}"
    exit 1
fi

# Vérifier les volumes
check_volumes

# Tests des endpoints
echo -e "\n🌐 Tests des endpoints:"
echo "----------------------"

# Test de la PWA (frontend)
test_endpoint "http://localhost/" "Frontend PWA" ""

# Test de l'endpoint de santé nginx
test_endpoint "http://localhost/health" "Nginx Health" "nginx-healthy"

# Test de l'API mail-parser via nginx
test_endpoint "http://localhost/api/health" "Mail Parser API" ""

# Test direct de MetaMCP
test_endpoint "http://localhost:3001/health" "MetaMCP Direct" ""

# Résumé final
echo -e "\n🎯 Résumé:"
echo "----------"

# Vérifier que tous les services répondent
frontend_ok=false
nginx_ok=false
api_ok=false
metamcp_ok=false

curl -sf "http://localhost/" >/dev/null 2>&1 && frontend_ok=true
curl -sf "http://localhost/health" >/dev/null 2>&1 && nginx_ok=true
curl -sf "http://localhost/api/health" >/dev/null 2>&1 && api_ok=true
curl -sf "http://localhost:3001/health" >/dev/null 2>&1 && metamcp_ok=true

if $frontend_ok && $nginx_ok && $api_ok && $metamcp_ok; then
    echo -e "${GREEN}🎉 Tous les services sont opérationnels !${NC}"
    echo ""
    echo "Accès:"
    echo "  • Frontend PWA: http://localhost/"
    echo "  • API Mail Parser: http://localhost/api/"
    echo "  • MetaMCP: http://localhost:3001/"
    echo "  • MetaMCP UI: http://localhost:12008/"
    exit 0
else
    echo -e "${RED}❌ Certains services ne répondent pas correctement${NC}"
    echo ""
    echo "Pour diagnostiquer:"
    echo "  make logs    # Voir les logs"
    echo "  make ps      # État des conteneurs"
    exit 1
fi