# Dockerfile pour Nginx reverse proxy
FROM nginx:alpine

# Copier la configuration personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Supprimer la configuration par défaut
RUN rm /etc/nginx/conf.d/default.conf.bak 2>/dev/null || true

# Créer le répertoire pour le frontend (sera monté par volume)
RUN mkdir -p /usr/share/nginx/html

# Health check tools
RUN apk add --no-cache wget

# Exposer le port
EXPOSE 80

# Lancer nginx
CMD ["nginx", "-g", "daemon off;"]