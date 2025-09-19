# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Clear cache and reinstall to avoid ARM64 issues
RUN rm -rf node_modules package-lock.json && \
    npm cache clean --force && \
    npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

# Install wget for health checks
RUN apk add --no-cache wget

# Create placeholder icons directory
RUN mkdir -p /usr/share/nginx/html/icons

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]