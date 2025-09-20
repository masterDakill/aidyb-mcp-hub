# ✅ CHECKLIST — Finalisation Frontend AIDYN (MCP-Hub)

## 1) Assets de marque
- [ ] Polices WOFF2 déposées → `frontend/public/fonts/` (Aidyn Sans, Aidvitneum)
- [ ] Icônes PWA déposées → `frontend/public/icons/icon-{72,96,128,144,152,192,384,512}.png`
- [ ] Illustrations WebP (optionnel) → `frontend/public/media/illustrations/`
- [ ] Animations Lottie (optionnel) → `frontend/public/media/lottie/`
- [ ] `@font-face` dé-commentés si nécessaire → `frontend/src/styles/index.css`

## 2) QA visuelle
- [ ] `/style-guide` OK (dev **et** docker)
- [ ] Contrastes AA OK (texte normal ≥ 4.5:1)
- [ ] Focus ring visibles, états hover/active/disabled
- [ ] Dark/Light fonctionnels
- [ ] Responsive OK (sm/md/lg/xl)

## 3) Build & Docker
```bash
cd frontend
npm ci && npm run build
cd ..
docker compose up -d --build
curl -sf http://localhost/health && echo OK
```

## 4) URLs de test
- **Prod:** http://localhost/ (Docker)
- **Dev:** http://localhost:5173/ (Vite)
- **Health:** http://localhost/health
- **Style Guide:** http://localhost/style-guide

## 5) GitHub & déploiement
- [ ] Repo créé : `https://github.com/masterDakill/aidyn-mcp-hub`
- [ ] Code pushé sur main
- [ ] Assets commités (sans secrets .env)
- [ ] Build Docker OK en prod

## 6) Validation finale
- [ ] Marque AIDYN cohérente (logo, couleurs, typo)
- [ ] PWA installable (manifest.json OK)
- [ ] Performance acceptable (Lighthouse > 90)
- [ ] Erreurs console = 0

## 📞 Next steps
1. **Déposer les assets réels** (fonts/icons)
2. **Valider visuellement** le /style-guide
3. **Déployer** en staging/prod selon besoin
4. **Documenter** les variantes Aidyn pour l'équipe

---
**Created:** $(date +%Y-%m-%d)  
**Project:** MCP-Hub Frontend PWA  
**Design System:** AIDYN Technologies  
