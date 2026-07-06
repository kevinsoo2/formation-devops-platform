export const extraModules3 = [

  // ============================================================
  // DOCKER - Module 9: Docker et microservices
  // ============================================================
  {
    id: 'docker-09',
    courseId: 'docker',
    title: 'Docker et microservices',
    duration: '4h',
    orderIndex: 9,
    theoryContent: `# Docker et microservices

## 1. Introduction aux microservices avec Docker

L'architecture microservices décompose une application monolithique en services indépendants, chacun ayant sa propre responsabilité. Docker est l'outil idéal pour containeriser ces services, garantissant isolation, portabilité et scalabilité individuelle.

### Principes fondamentaux

- **Single Responsibility** : chaque service fait une seule chose bien
- **Indépendance** : chaque service peut être déployé, mis à jour et scalé séparément
- **Communication** : les services communiquent via des APIs (REST, gRPC, messages)
- **Résilience** : la défaillance d'un service n'entraîne pas la chute de tout le système

## 2. Patterns de décomposition

### Décomposition par domaine métier (Domain-Driven Design)

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    APPLICATION E-COMMERCE                 │
├──────────┬──────────┬──────────┬──────────┬────────────┤
│  Users   │  Catalog │  Orders  │ Payments │ Notifications│
│ Service  │ Service  │ Service  │ Service  │   Service    │
│ (Node.js)│ (Python) │  (Java)  │  (Go)    │  (Node.js)  │
│ Port 3001│ Port 3002│ Port 3003│ Port 3004│  Port 3005  │
└────┬─────┴────┬─────┴────┬─────┴────┬─────┴──────┬─────┘
     │          │          │          │            │
     └──────────┴──────────┴──────────┴────────────┘
                        │
              ┌─────────┴─────────┐
              │   API Gateway     │
              │   (Nginx/Traefik) │
              │   Port 80/443     │
              └───────────────────┘
\`\`\`

### Strangler Fig Pattern

Pour migrer progressivement un monolithe vers des microservices :

\`\`\`bash
# Phase 1 : Proxy devant le monolithe
# docker-compose.yml
services:
  gateway:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf

  monolith:
    image: myapp-monolith:latest
    expose:
      - "8080"

  # Phase 2 : Extraire le premier service
  user-service:
    build: ./services/users
    expose:
      - "3001"
    environment:
      - DATABASE_URL=postgres://db:5432/users
\`\`\`

## 3. Communication inter-services

### Communication synchrone (REST/gRPC)

\`\`\`yaml
# docker-compose.yml - Services communicant via REST
services:
  order-service:
    build: ./order-service
    environment:
      - USER_SERVICE_URL=http://user-service:3001
      - CATALOG_SERVICE_URL=http://catalog-service:3002
      - PAYMENT_SERVICE_URL=http://payment-service:3004
    networks:
      - backend

  user-service:
    build: ./user-service
    expose:
      - "3001"
    networks:
      - backend

  catalog-service:
    build: ./catalog-service
    expose:
      - "3002"
    networks:
      - backend

networks:
  backend:
    driver: bridge
\`\`\`

### Communication asynchrone (Message Broker)

\`\`\`yaml
services:
  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"
    volumes:
      - rabbitmq-data:/var/lib/rabbitmq
    healthcheck:
      test: rabbitmq-diagnostics -q ping
      interval: 10s
      timeout: 5s
      retries: 5

  order-service:
    build: ./order-service
    environment:
      - RABBITMQ_URL=amqp://rabbitmq:5672
    depends_on:
      rabbitmq:
        condition: service_healthy

  notification-service:
    build: ./notification-service
    environment:
      - RABBITMQ_URL=amqp://rabbitmq:5672
    depends_on:
      rabbitmq:
        condition: service_healthy

volumes:
  rabbitmq-data:
\`\`\`

## 4. API Gateway avec Docker

### Configuration Nginx comme API Gateway

\`\`\`nginx
# nginx.conf
upstream user_service {
    server user-service:3001;
}
upstream catalog_service {
    server catalog-service:3002;
}
upstream order_service {
    server order-service:3003;
}

server {
    listen 80;

    # Rate limiting
    limit_req_zone \\\$binary_remote_addr zone=api:10m rate=10r/s;

    location /api/users {
        limit_req zone=api burst=20;
        proxy_pass http://user_service;
        proxy_set_header Host \\\$host;
        proxy_set_header X-Real-IP \\\$remote_addr;
    }

    location /api/catalog {
        proxy_pass http://catalog_service;
        proxy_set_header Host \\\$host;
    }

    location /api/orders {
        proxy_pass http://order_service;
        proxy_set_header Host \\\$host;
    }

    # Health check endpoint
    location /health {
        access_log off;
        return 200 '{"status":"healthy"}';
        add_header Content-Type application/json;
    }
}
\`\`\`

### Traefik comme reverse proxy dynamique

\`\`\`yaml
services:
  traefik:
    image: traefik:v3.0
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
    ports:
      - "80:80"
      - "8080:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro

  user-service:
    build: ./user-service
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.users.rule=PathPrefix(\\\`/api/users\\\`)"
      - "traefik.http.services.users.loadbalancer.server.port=3001"

  catalog-service:
    build: ./catalog-service
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.catalog.rule=PathPrefix(\\\`/api/catalog\\\`)"
      - "traefik.http.services.catalog.loadbalancer.server.port=3002"
\`\`\`

## 5. Health Checks et résilience

### Configuration des health checks Docker

\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .

HEALTHCHECK --interval=15s --timeout=5s --start-period=30s --retries=3 \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

\`\`\`yaml
# docker-compose.yml avec health checks
services:
  api:
    build: .
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 15s
      timeout: 5s
      retries: 3
      start_period: 30s
    deploy:
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
\`\`\`

## 6. Circuit Breaker Pattern

Le circuit breaker protège un service contre les appels répétés à un service défaillant :

\`\`\`javascript
// circuit-breaker.js
class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout = options.resetTimeout || 30000;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.failureCount = 0;
    this.lastFailureTime = null;
  }

  async call(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime >= this.resetTimeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
    }
  }
}
\`\`\`

## 7. Docker Networking pour microservices

\`\`\`yaml
# Réseau isolé par domaine
services:
  # Frontend network
  web-app:
    networks:
      - frontend
      - backend

  # Services internes uniquement sur backend
  user-service:
    networks:
      - backend
      - database

  order-service:
    networks:
      - backend
      - database
      - messaging

  # Bases de données isolées
  user-db:
    image: postgres:16
    networks:
      - database

  rabbitmq:
    networks:
      - messaging

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true  # Pas d'accès internet
  database:
    driver: bridge
    internal: true
  messaging:
    driver: bridge
    internal: true
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Microservices avec Docker

### Exercice 1 : Créer une architecture microservices

\`\`\`bash
mkdir -p microservices-tp/{gateway,user-service,product-service,order-service}
cd microservices-tp

# Créer le service utilisateur
cat > user-service/server.js << 'EOF'
const express = require('express');
const app = express();
app.use(express.json());

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

app.get('/health', (req, res) => res.json({ status: 'healthy' }));
app.get('/api/users', (req, res) => res.json(users));
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  user ? res.json(user) : res.status(404).json({ error: 'Not found' });
});

app.listen(3001, () => console.log('User service on port 3001'));
EOF

cat > user-service/Dockerfile << 'EOF'
FROM node:20-alpine
WORKDIR /app
RUN npm init -y && npm install express
COPY server.js .
HEALTHCHECK --interval=10s --timeout=3s CMD wget -qO- http://localhost:3001/health || exit 1
EXPOSE 3001
CMD ["node", "server.js"]
EOF
\`\`\`

### Exercice 2 : Configurer l'API Gateway

\`\`\`bash
cat > gateway/nginx.conf << 'EOF'
events { worker_connections 1024; }
http {
  upstream users { server user-service:3001; }
  upstream products { server product-service:3002; }
  upstream orders { server order-service:3003; }

  server {
    listen 80;
    location /api/users { proxy_pass http://users; }
    location /api/products { proxy_pass http://products; }
    location /api/orders { proxy_pass http://orders; }
    location /health { return 200 '{"gateway":"ok"}'; }
  }
}
EOF
\`\`\`

### Exercice 3 : Docker Compose multi-services

\`\`\`yaml
# docker-compose.yml
services:
  gateway:
    image: nginx:alpine
    ports: ["80:80"]
    volumes: ["./gateway/nginx.conf:/etc/nginx/nginx.conf"]
    depends_on:
      user-service: { condition: service_healthy }
      product-service: { condition: service_healthy }

  user-service:
    build: ./user-service
    networks: [backend]
    healthcheck:
      test: wget -qO- http://localhost:3001/health || exit 1
      interval: 10s

  product-service:
    build: ./product-service
    networks: [backend]

  order-service:
    build: ./order-service
    environment:
      - USER_SERVICE_URL=http://user-service:3001
      - PRODUCT_SERVICE_URL=http://product-service:3002
    networks: [backend]

networks:
  backend:
    driver: bridge
\`\`\`

### Exercice 4 : Ajouter un message broker

\`\`\`bash
# Ajouter RabbitMQ pour la communication asynchrone
# Tester l'envoi de messages entre order-service et notification-service
docker compose up -d rabbitmq
docker compose exec rabbitmq rabbitmqctl list_queues
\`\`\`

### Exercice 5 : Tester la résilience

\`\`\`bash
# Arrêter un service et vérifier le comportement
docker compose stop user-service
curl http://localhost/api/orders  # Doit retourner une erreur gracieuse
docker compose start user-service
# Vérifier que le circuit breaker se referme
curl http://localhost/api/orders  # Doit fonctionner à nouveau
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Les microservices décomposent une application en services indépendants avec responsabilité unique',
      'Docker Compose orchestre plusieurs services avec réseaux isolés et health checks',
      'L\'API Gateway (Nginx/Traefik) centralise le routage et le rate limiting',
      'La communication peut être synchrone (REST/gRPC) ou asynchrone (RabbitMQ/Kafka)',
      'Le pattern Circuit Breaker protège contre les cascades de pannes',
      'Les réseaux Docker internes isolent les services par domaine de sécurité',
      'Chaque service a son propre Dockerfile optimisé avec health check',
      'Le Strangler Fig Pattern permet de migrer progressivement un monolithe'
    ]),
  },


  // ============================================================
  // DOCKER - Module 10: Projet final Docker
  // ============================================================
  {
    id: 'docker-10',
    courseId: 'docker',
    title: 'Projet final Docker',
    duration: '5h',
    orderIndex: 10,
    theoryContent: `# Projet final Docker : Application multi-services complète

## Objectif du projet

Construire une application web complète avec les composants suivants :
- **Frontend** : Application React servie par Nginx
- **Backend API** : Node.js/Express avec authentification
- **Base de données** : PostgreSQL avec persistance
- **Cache** : Redis pour les sessions et le caching
- **Reverse Proxy** : Nginx avec SSL et load balancing
- **Monitoring** : Healthchecks et logs centralisés

## 1. Architecture de l'application

\`\`\`
                    ┌─────────────────┐
                    │   Client Web    │
                    └────────┬────────┘
                             │ HTTPS (443)
                    ┌────────▼────────┐
                    │  Reverse Proxy  │
                    │     Nginx       │
                    │   (SSL/LB)      │
                    └───┬─────────┬───┘
                        │         │
              ┌─────────▼──┐  ┌──▼─────────┐
              │  Frontend   │  │  Backend    │
              │  (React +   │  │  API        │
              │   Nginx)    │  │  (Node.js)  │
              │  Port 80    │  │  Port 3000  │
              └─────────────┘  └──┬──────┬──┘
                                  │      │
                        ┌─────────▼┐  ┌──▼──────┐
                        │PostgreSQL │  │  Redis   │
                        │ Port 5432 │  │Port 6379 │
                        └──────────┘  └──────────┘
\`\`\`

## 2. Structure du projet

\`\`\`bash
projet-final/
├── docker-compose.yml
├── docker-compose.prod.yml
├── .env
├── .env.production
├── frontend/
│   ├── Dockerfile
│   ├── Dockerfile.prod
│   ├── nginx.conf
│   ├── src/
│   └── package.json
├── backend/
│   ├── Dockerfile
│   ├── Dockerfile.prod
│   ├── src/
│   ├── package.json
│   └── .dockerignore
├── proxy/
│   ├── nginx.conf
│   ├── ssl/
│   └── conf.d/
├── database/
│   ├── init.sql
│   └── backup.sh
└── monitoring/
    └── healthcheck.sh
\`\`\`

## 3. Dockerfile optimisé pour le Backend

\`\`\`dockerfile
# backend/Dockerfile.prod
# Stage 1: Installation des dépendances
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && \\
    npm cache clean --force

# Stage 2: Image de production
FROM node:20-alpine AS runner
WORKDIR /app

# Sécurité : utilisateur non-root
RUN addgroup -g 1001 -S nodejs && \\
    adduser -S nodeuser -u 1001 -G nodejs

# Copier les dépendances
COPY --from=deps --chown=nodeuser:nodejs /app/node_modules ./node_modules
COPY --chown=nodeuser:nodejs src/ ./src/
COPY --chown=nodeuser:nodejs package.json ./

# Variables d'environnement
ENV NODE_ENV=production
ENV PORT=3000

USER nodeuser
EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=5s --start-period=20s --retries=3 \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "src/server.js"]
\`\`\`

## 4. Dockerfile multi-stage pour le Frontend

\`\`\`dockerfile
# frontend/Dockerfile.prod
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serveur Nginx
FROM nginx:alpine AS runner
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Sécurité
RUN chown -R nginx:nginx /usr/share/nginx/html && \\
    chmod -R 755 /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=3s \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
\`\`\`

## 5. Docker Compose complet

\`\`\`yaml
# docker-compose.prod.yml
services:
  proxy:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./proxy/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./proxy/ssl:/etc/nginx/ssl:ro
    depends_on:
      frontend:
        condition: service_healthy
      backend:
        condition: service_healthy
    restart: unless-stopped
    networks:
      - frontend-net

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
    expose:
      - "80"
    restart: unless-stopped
    networks:
      - frontend-net
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:80/"]
      interval: 30s
      timeout: 5s
      retries: 3

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
    expose:
      - "3000"
    environment:
      - DATABASE_URL=postgres://app_user:\\\${DB_PASSWORD}@postgres:5432/appdb
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=\\\${JWT_SECRET}
      - NODE_ENV=production
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    restart: unless-stopped
    networks:
      - frontend-net
      - backend-net
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'

  postgres:
    image: postgres:16-alpine
    environment:
      - POSTGRES_DB=appdb
      - POSTGRES_USER=app_user
      - POSTGRES_PASSWORD=\\\${DB_PASSWORD}
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app_user -d appdb"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped
    networks:
      - backend-net

  redis:
    image: redis:7-alpine
    command: redis-server --maxmemory 128mb --maxmemory-policy allkeys-lru
    volumes:
      - redis-data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5
    restart: unless-stopped
    networks:
      - backend-net

volumes:
  postgres-data:
  redis-data:

networks:
  frontend-net:
    driver: bridge
  backend-net:
    driver: bridge
    internal: true
\`\`\`

## 6. Configuration Nginx Reverse Proxy

\`\`\`nginx
# proxy/nginx.conf
events { worker_connections 1024; }

http {
    upstream frontend {
        server frontend:80;
    }
    upstream backend {
        server backend:3000;
    }

    # Rate limiting
    limit_req_zone \\\$binary_remote_addr zone=api:10m rate=20r/s;
    limit_req_zone \\\$binary_remote_addr zone=login:10m rate=5r/m;

    server {
        listen 80;
        server_name localhost;

        # API Backend
        location /api/ {
            limit_req zone=api burst=40 nodelay;
            proxy_pass http://backend;
            proxy_set_header Host \\\$host;
            proxy_set_header X-Real-IP \\\$remote_addr;
            proxy_set_header X-Forwarded-For \\\$proxy_add_x_forwarded_for;
            proxy_connect_timeout 10s;
            proxy_read_timeout 30s;
        }

        # Login endpoint avec rate limit strict
        location /api/auth/login {
            limit_req zone=login burst=3;
            proxy_pass http://backend;
        }

        # Frontend (SPA)
        location / {
            proxy_pass http://frontend;
            proxy_set_header Host \\\$host;
        }

        # Health check
        location /nginx-health {
            access_log off;
            return 200 'OK';
        }
    }
}
\`\`\`

## 7. Optimisations de production

### .dockerignore

\`\`\`
node_modules
npm-debug.log
.git
.gitignore
.env
Dockerfile*
docker-compose*
README.md
.vscode
coverage
tests
\`\`\`

### Script de déploiement

\`\`\`bash
#!/bin/bash
# deploy.sh
set -e

echo "=== Déploiement Production ==="

# Vérifier les variables d'environnement
if [ ! -f .env.production ]; then
  echo "ERREUR: .env.production manquant"
  exit 1
fi

# Charger les variables
export $(cat .env.production | xargs)

# Build des images
docker compose -f docker-compose.prod.yml build --no-cache

# Déployer avec zero-downtime
docker compose -f docker-compose.prod.yml up -d --remove-orphans

# Attendre que tous les services soient healthy
echo "Attente des health checks..."
sleep 10
docker compose -f docker-compose.prod.yml ps

# Vérifier le statut
if docker compose -f docker-compose.prod.yml ps | grep -q "unhealthy"; then
  echo "ERREUR: Services non healthy - rollback"
  docker compose -f docker-compose.prod.yml down
  exit 1
fi

echo "=== Déploiement réussi ==="
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Projet final Docker

### Étape 1 : Initialiser le projet

\`\`\`bash
mkdir -p projet-final/{frontend,backend/src,proxy,database}
cd projet-final

# Backend Express
cat > backend/src/server.js << 'BACKEND'
const express = require('express');
const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));
app.get('/api/status', (req, res) => res.json({ service: 'backend', version: '1.0.0' }));
app.listen(3000, () => console.log('Backend ready on port 3000'));
BACKEND

cat > backend/package.json << 'PKG'
{"name":"backend","version":"1.0.0","main":"src/server.js","dependencies":{"express":"^4.18.0"}}
PKG
\`\`\`

### Étape 2 : Créer les Dockerfiles optimisés

\`\`\`bash
# Dockerfile backend multi-stage
cat > backend/Dockerfile << 'EOF'
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --production

FROM node:20-alpine
WORKDIR /app
RUN adduser -S appuser
COPY --from=deps /app/node_modules ./node_modules
COPY src/ ./src/
USER appuser
HEALTHCHECK --interval=10s CMD wget -qO- http://localhost:3000/health || exit 1
EXPOSE 3000
CMD ["node", "src/server.js"]
EOF
\`\`\`

### Étape 3 : Docker Compose avec tous les services

\`\`\`bash
cat > docker-compose.yml << 'EOF'
services:
  proxy:
    image: nginx:alpine
    ports: ["80:80"]
    volumes: ["./proxy/nginx.conf:/etc/nginx/nginx.conf:ro"]
    depends_on:
      backend: { condition: service_healthy }
  backend:
    build: ./backend
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/app
      - REDIS_URL=redis://cache:6379
    depends_on:
      db: { condition: service_healthy }
      cache: { condition: service_healthy }
    networks: [app-net]
  db:
    image: postgres:16-alpine
    environment: { POSTGRES_DB: app, POSTGRES_USER: user, POSTGRES_PASSWORD: pass }
    volumes: [db-data:/var/lib/postgresql/data]
    healthcheck:
      test: pg_isready -U user -d app
      interval: 5s
    networks: [app-net]
  cache:
    image: redis:7-alpine
    healthcheck:
      test: redis-cli ping
      interval: 5s
    networks: [app-net]
volumes:
  db-data:
networks:
  app-net:
EOF
\`\`\`

### Étape 4 : Lancer et tester

\`\`\`bash
docker compose up -d --build
docker compose ps
curl http://localhost/api/status
docker compose logs backend
\`\`\`

### Étape 5 : Monitoring et optimisation

\`\`\`bash
# Vérifier la taille des images
docker images | grep projet-final
# Analyser les layers
docker history projet-final-backend
# Monitorer les ressources
docker stats --no-stream
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Un projet Docker complet inclut frontend, backend, DB, cache et reverse proxy',
      'Les Dockerfiles multi-stage réduisent drastiquement la taille des images de production',
      'Docker Compose orchestre tous les services avec dépendances et health checks',
      'Les réseaux internes isolent la base de données du monde extérieur',
      'Le reverse proxy Nginx gère SSL, rate limiting et load balancing',
      'Les volumes nommés assurent la persistance des données entre redémarrages',
      'Le fichier .dockerignore évite de copier des fichiers inutiles dans l\'image',
      'Un script de déploiement vérifie les health checks avant de valider'
    ]),
  },



  // ============================================================
  // KUBERNETES - Module 9: Kubernetes en production
  // ============================================================
  {
    id: 'k8s-09',
    courseId: 'kubernetes',
    title: 'Kubernetes en production',
    duration: '4h',
    orderIndex: 9,
    theoryContent: `# Kubernetes en production

## 1. Checklist de production

Déployer Kubernetes en production nécessite une préparation rigoureuse. Voici les éléments essentiels à mettre en place avant de recevoir du trafic réel.

### Checklist pré-production

\`\`\`
✅ Haute disponibilité du control plane (3+ masters)
✅ etcd en cluster avec sauvegardes automatiques
✅ RBAC configuré avec principe du moindre privilège
✅ Network Policies pour l'isolation réseau
✅ Pod Security Standards appliqués
✅ Resource Requests et Limits sur tous les pods
✅ Pod Disruption Budgets configurés
✅ Monitoring et alerting opérationnels
✅ Logging centralisé
✅ Stratégie de backup et disaster recovery testée
✅ Upgrade path documenté et testé
\`\`\`

## 2. Sauvegarde et restauration d'etcd

etcd contient tout l'état du cluster. Sa sauvegarde est critique.

\`\`\`bash
# Sauvegarde manuelle d'etcd
ETCDCTL_API=3 etcdctl snapshot save /backup/etcd-snapshot.db \\
  --endpoints=https://127.0.0.1:2379 \\
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \\
  --cert=/etc/kubernetes/pki/etcd/server.crt \\
  --key=/etc/kubernetes/pki/etcd/server.key

# Vérifier la sauvegarde
ETCDCTL_API=3 etcdctl snapshot status /backup/etcd-snapshot.db --write-table

# Restauration d'etcd
ETCDCTL_API=3 etcdctl snapshot restore /backup/etcd-snapshot.db \\
  --name=master-1 \\
  --data-dir=/var/lib/etcd-restored \\
  --initial-cluster=master-1=https://192.168.1.10:2380 \\
  --initial-advertise-peer-urls=https://192.168.1.10:2380

# CronJob pour sauvegarde automatique
\`\`\`

\`\`\`yaml
# backup-cronjob.yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: etcd-backup
  namespace: kube-system
spec:
  schedule: "0 */6 * * *"  # Toutes les 6 heures
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: backup
            image: bitnami/etcd:latest
            command:
            - /bin/sh
            - -c
            - |
              etcdctl snapshot save /backup/etcd-\\\$(date +%Y%m%d-%H%M).db \\
                --endpoints=https://etcd:2379 \\
                --cacert=/certs/ca.crt \\
                --cert=/certs/client.crt \\
                --key=/certs/client.key
              # Garder seulement les 7 derniers backups
              ls -t /backup/etcd-*.db | tail -n +8 | xargs rm -f
            volumeMounts:
            - name: backup-volume
              mountPath: /backup
            - name: etcd-certs
              mountPath: /certs
          restartPolicy: OnFailure
          volumes:
          - name: backup-volume
            persistentVolumeClaim:
              claimName: etcd-backup-pvc
          - name: etcd-certs
            secret:
              secretName: etcd-client-certs
\`\`\`

## 3. Stratégies de mise à jour du cluster

### Upgrade des nodes

\`\`\`bash
# 1. Drainer le node (évacuer les pods)
kubectl drain node-1 --ignore-daemonsets --delete-emptydir-data

# 2. Mettre à jour kubeadm
apt-get update && apt-get install -y kubeadm=1.29.0-1.1
kubeadm upgrade plan
kubeadm upgrade apply v1.29.0  # Sur le premier master
kubeadm upgrade node           # Sur les autres nodes

# 3. Mettre à jour kubelet et kubectl
apt-get install -y kubelet=1.29.0-1.1 kubectl=1.29.0-1.1
systemctl daemon-reload
systemctl restart kubelet

# 4. Remettre le node en service
kubectl uncordon node-1

# 5. Vérifier
kubectl get nodes
kubectl get pods --all-namespaces | grep -v Running
\`\`\`

## 4. Pod Disruption Budgets (PDB)

Les PDB garantissent qu'un minimum de pods reste disponible pendant les opérations de maintenance.

\`\`\`yaml
# pdb.yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: webapp-pdb
spec:
  minAvailable: 2          # Au moins 2 pods toujours up
  # ou: maxUnavailable: 1  # Au plus 1 pod down à la fois
  selector:
    matchLabels:
      app: webapp
---
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: database-pdb
spec:
  maxUnavailable: 0  # Jamais interrompre la DB
  selector:
    matchLabels:
      app: database
      role: primary
\`\`\`

## 5. Maintenance des nodes

\`\`\`bash
# Marquer un node comme non-schedulable (pas de nouveaux pods)
kubectl cordon node-2

# Drainer un node (déplacer les pods existants)
kubectl drain node-2 \\
  --ignore-daemonsets \\
  --delete-emptydir-data \\
  --grace-period=60 \\
  --timeout=120s

# Effectuer la maintenance (upgrade OS, kernel, etc.)
ssh node-2 "apt-get update && apt-get upgrade -y && reboot"

# Remettre en service
kubectl uncordon node-2

# Vérifier que les pods reviennent
kubectl get pods -o wide | grep node-2
\`\`\`

## 6. Disaster Recovery

### Plan de reprise

\`\`\`bash
# 1. Sauvegarder etcd (état du cluster)
# 2. Sauvegarder les PersistentVolumes (données applicatives)
# 3. Sauvegarder les manifestes (GitOps)
# 4. Documenter la procédure de restauration

# Velero pour le backup complet
velero install --provider aws \\
  --bucket velero-backups \\
  --secret-file ./credentials

# Backup d'un namespace entier
velero backup create production-backup \\
  --include-namespaces production \\
  --include-resources '*'

# Restauration
velero restore create --from-backup production-backup

# Backup planifié
velero schedule create daily-backup \\
  --schedule="0 2 * * *" \\
  --include-namespaces production,staging \\
  --ttl 168h  # Rétention 7 jours
\`\`\`

## 7. Resource Quotas et Limits

\`\`\`yaml
# resource-quota.yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: production-quota
  namespace: production
spec:
  hard:
    requests.cpu: "20"
    requests.memory: 40Gi
    limits.cpu: "40"
    limits.memory: 80Gi
    pods: "100"
    persistentvolumeclaims: "20"
    services.loadbalancers: "5"
---
# limit-range.yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: default-limits
  namespace: production
spec:
  limits:
  - default:
      cpu: 500m
      memory: 512Mi
    defaultRequest:
      cpu: 100m
      memory: 128Mi
    max:
      cpu: "4"
      memory: 8Gi
    min:
      cpu: 50m
      memory: 64Mi
    type: Container
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Kubernetes en production

### Exercice 1 : Configurer les Pod Disruption Budgets

\`\`\`bash
# Créer un déploiement avec 5 réplicas
kubectl create deployment webapp --image=nginx:alpine --replicas=5

# Appliquer un PDB
cat <<EOF | kubectl apply -f -
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: webapp-pdb
spec:
  minAvailable: 3
  selector:
    matchLabels:
      app: webapp
EOF

# Tester : drainer un node ne devrait pas descendre en dessous de 3
kubectl drain node-1 --ignore-daemonsets --dry-run=client
kubectl get pdb webapp-pdb
\`\`\`

### Exercice 2 : Backup et restauration etcd

\`\`\`bash
# Sauvegarder etcd
ETCDCTL_API=3 etcdctl snapshot save /tmp/etcd-backup.db \\
  --endpoints=https://127.0.0.1:2379 \\
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \\
  --cert=/etc/kubernetes/pki/etcd/server.crt \\
  --key=/etc/kubernetes/pki/etcd/server.key

# Vérifier
ETCDCTL_API=3 etcdctl snapshot status /tmp/etcd-backup.db -w table
\`\`\`

### Exercice 3 : Resource Quotas

\`\`\`bash
# Créer un namespace avec quotas
kubectl create namespace production
kubectl apply -f resource-quota.yaml
kubectl apply -f limit-range.yaml

# Vérifier les quotas
kubectl get resourcequota -n production
kubectl describe resourcequota production-quota -n production
\`\`\`

### Exercice 4 : Simuler un upgrade de node

\`\`\`bash
# Cordon, drain, maintenance, uncordon
kubectl cordon worker-1
kubectl drain worker-1 --ignore-daemonsets --delete-emptydir-data
kubectl get pods -o wide  # Vérifier la redistribution
kubectl uncordon worker-1
\`\`\`

### Exercice 5 : Velero backup

\`\`\`bash
# Installer Velero et créer un backup planifié
velero schedule create daily --schedule="0 2 * * *" --include-namespaces production
velero backup get
velero restore create --from-backup daily-20240115
\`\`\`
`,
    keyPoints: JSON.stringify([
      'La checklist production couvre HA, RBAC, monitoring, backup et PDB',
      'etcd doit être sauvegardé régulièrement car il contient tout l\'état du cluster',
      'Les PDB garantissent un minimum de pods disponibles pendant la maintenance',
      'kubectl drain évacue les pods avant maintenance, uncordon remet en service',
      'Velero permet le backup complet de namespaces incluant les PersistentVolumes',
      'Les Resource Quotas limitent la consommation par namespace',
      'Les upgrades se font node par node : drain, upgrade, uncordon',
      'Un plan de disaster recovery doit être documenté et testé régulièrement'
    ]),
  },



  // ============================================================
  // KUBERNETES - Module 10: Projet final Kubernetes
  // ============================================================
  {
    id: 'k8s-10',
    courseId: 'kubernetes',
    title: 'Projet final Kubernetes',
    duration: '5h',
    orderIndex: 10,
    theoryContent: `# Projet final Kubernetes : De zéro à la production

## Objectif

Déployer une application complète sur Kubernetes avec tous les éléments de production : Deployments, Services, Ingress, HPA, PDB, ConfigMaps, Secrets, monitoring et logging.

## 1. Architecture cible

\`\`\`
Internet
    │
    ▼
┌──────────────┐
│   Ingress    │  (nginx-ingress-controller)
│  Controller  │
└──────┬───────┘
       │
  ┌────┴────┐
  │         │
  ▼         ▼
┌──────┐  ┌──────┐
│ /app │  │ /api │
│ SVC  │  │ SVC  │
└──┬───┘  └──┬───┘
   │         │
   ▼         ▼
┌──────┐  ┌──────┐    ┌──────┐   ┌───────┐
│Front │  │Back  │───▶│ DB   │   │ Redis │
│ 3x   │  │ 3x  │    │ 1x   │   │  1x   │
└──────┘  └──────┘    └──────┘   └───────┘
\`\`\`

## 2. Namespace et RBAC

\`\`\`yaml
# namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    env: production
---
# service-account.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: app-service-account
  namespace: production
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: app-role
  namespace: production
rules:
- apiGroups: [""]
  resources: ["configmaps", "secrets"]
  verbs: ["get", "list"]
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: app-role-binding
  namespace: production
subjects:
- kind: ServiceAccount
  name: app-service-account
roleRef:
  kind: Role
  name: app-role
  apiGroup: rbac.authorization.k8s.io
\`\`\`

## 3. ConfigMaps et Secrets

\`\`\`yaml
# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: production
data:
  APP_ENV: "production"
  LOG_LEVEL: "info"
  CACHE_TTL: "3600"
  MAX_CONNECTIONS: "100"
---
# secret.yaml (à créer avec kubectl create secret)
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
  namespace: production
type: Opaque
data:
  DB_PASSWORD: cGFzc3dvcmQxMjM=  # base64
  JWT_SECRET: bXlfc2VjcmV0X2tleQ==
  REDIS_PASSWORD: cmVkaXNfcGFzcw==
\`\`\`

## 4. Deployment Backend avec toutes les bonnes pratiques

\`\`\`yaml
# backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: production
  labels:
    app: backend
    version: v1.0.0
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
        version: v1.0.0
    spec:
      serviceAccountName: app-service-account
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
      containers:
      - name: backend
        image: myregistry/backend:1.0.0
        ports:
        - containerPort: 3000
          protocol: TCP
        envFrom:
        - configMapRef:
            name: app-config
        env:
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: DB_PASSWORD
        resources:
          requests:
            cpu: 200m
            memory: 256Mi
          limits:
            cpu: 500m
            memory: 512Mi
        livenessProbe:
          httpGet:
            path: /health/live
            port: 3000
          initialDelaySeconds: 15
          periodSeconds: 20
          failureThreshold: 3
        readinessProbe:
          httpGet:
            path: /health/ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 10
        startupProbe:
          httpGet:
            path: /health/live
            port: 3000
          failureThreshold: 30
          periodSeconds: 2
      topologySpreadConstraints:
      - maxSkew: 1
        topologyKey: kubernetes.io/hostname
        whenUnsatisfiable: DoNotSchedule
        labelSelector:
          matchLabels:
            app: backend
\`\`\`

## 5. Service et Ingress

\`\`\`yaml
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: backend-svc
  namespace: production
spec:
  selector:
    app: backend
  ports:
  - port: 80
    targetPort: 3000
  type: ClusterIP
---
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  namespace: production
  annotations:
    nginx.ingress.kubernetes.io/rate-limit: "100"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - app.example.com
    secretName: app-tls
  rules:
  - host: app.example.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend-svc
            port:
              number: 80
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-svc
            port:
              number: 80
\`\`\`

## 6. HPA (Horizontal Pod Autoscaler)

\`\`\`yaml
# hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: backend-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: backend
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
      - type: Pods
        value: 2
        periodSeconds: 60
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Pods
        value: 1
        periodSeconds: 120
\`\`\`

## 7. Base de données avec StatefulSet

\`\`\`yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
  namespace: production
spec:
  serviceName: postgres
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:16-alpine
        ports:
        - containerPort: 5432
        env:
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: DB_PASSWORD
        volumeMounts:
        - name: data
          mountPath: /var/lib/postgresql/data
        resources:
          requests:
            cpu: 500m
            memory: 1Gi
          limits:
            cpu: "2"
            memory: 4Gi
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 20Gi
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Projet final Kubernetes

### Étape 1 : Préparer le namespace

\`\`\`bash
kubectl create namespace production
kubectl config set-context --current --namespace=production

# Appliquer les RBAC
kubectl apply -f namespace.yaml
kubectl apply -f service-account.yaml
\`\`\`

### Étape 2 : Déployer les ConfigMaps et Secrets

\`\`\`bash
kubectl create secret generic app-secrets \\
  --from-literal=DB_PASSWORD=secretpass123 \\
  --from-literal=JWT_SECRET=my_jwt_key \\
  -n production

kubectl apply -f configmap.yaml
kubectl get configmaps,secrets -n production
\`\`\`

### Étape 3 : Déployer la base de données

\`\`\`bash
kubectl apply -f postgres-statefulset.yaml
kubectl wait --for=condition=ready pod/postgres-0 --timeout=120s
kubectl exec -it postgres-0 -- psql -U postgres -c "SELECT version();"
\`\`\`

### Étape 4 : Déployer le backend avec HPA et PDB

\`\`\`bash
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl apply -f hpa.yaml
kubectl apply -f pdb.yaml

# Vérifier
kubectl get pods,svc,hpa,pdb -n production
kubectl top pods -n production
\`\`\`

### Étape 5 : Configurer l'Ingress et tester

\`\`\`bash
kubectl apply -f ingress.yaml
kubectl get ingress -n production

# Tester le scaling
kubectl run load-test --image=busybox --rm -it -- \\
  sh -c "while true; do wget -qO- http://backend-svc/api/status; done"

# Observer le HPA
kubectl get hpa -w
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Un déploiement production comprend RBAC, ConfigMaps, Secrets, Probes et Resources',
      'Le RollingUpdate avec maxUnavailable=0 garantit le zero-downtime',
      'Les trois types de probes (liveness, readiness, startup) assurent la fiabilité',
      'Le HPA scale automatiquement selon CPU/mémoire avec politiques de stabilisation',
      'L\'Ingress centralise le routage HTTPS avec certificats TLS automatiques',
      'Les StatefulSets gèrent les applications stateful comme les bases de données',
      'TopologySpreadConstraints distribue les pods sur différents nodes',
      'Les PDB protègent les applications pendant les opérations de maintenance'
    ]),
  },



  // ============================================================
  // TERRAFORM - Module 9: Terraform et Kubernetes
  // ============================================================
  {
    id: 'tf-09',
    courseId: 'terraform',
    title: 'Terraform et Kubernetes',
    duration: '4h',
    orderIndex: 9,
    theoryContent: `# Terraform et Kubernetes

## 1. Introduction

Terraform peut non seulement provisionner l'infrastructure sous-jacente d'un cluster Kubernetes, mais aussi gérer les ressources à l'intérieur du cluster lui-même : namespaces, deployments, services, RBAC, et même des charts Helm. Cette approche unifie la gestion de l'infrastructure et des applications sous un même outil.

## 2. Le provider Kubernetes

\`\`\`hcl
# providers.tf
terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.25"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.12"
    }
  }
}

# Configuration via kubeconfig
provider "kubernetes" {
  config_path    = "~/.kube/config"
  config_context = "production-cluster"
}

# Ou via un cluster EKS provisionné par Terraform
provider "kubernetes" {
  host                   = module.eks.cluster_endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_ca_cert)
  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    command     = "aws"
    args        = ["eks", "get-token", "--cluster-name", module.eks.cluster_name]
  }
}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}
\`\`\`

## 3. Gestion des Namespaces

\`\`\`hcl
# namespaces.tf
resource "kubernetes_namespace" "environments" {
  for_each = toset(["production", "staging", "development"])

  metadata {
    name = each.value
    labels = {
      environment = each.value
      managed-by  = "terraform"
    }
    annotations = {
      "team" = "platform"
    }
  }
}

resource "kubernetes_resource_quota" "production" {
  metadata {
    name      = "production-quota"
    namespace = kubernetes_namespace.environments["production"].metadata[0].name
  }

  spec {
    hard = {
      "requests.cpu"    = "20"
      "requests.memory" = "40Gi"
      "limits.cpu"      = "40"
      "limits.memory"   = "80Gi"
      pods              = "100"
    }
  }
}

resource "kubernetes_limit_range" "production" {
  metadata {
    name      = "default-limits"
    namespace = kubernetes_namespace.environments["production"].metadata[0].name
  }

  spec {
    limit {
      type = "Container"
      default = {
        cpu    = "500m"
        memory = "512Mi"
      }
      default_request = {
        cpu    = "100m"
        memory = "128Mi"
      }
    }
  }
}
\`\`\`

## 4. RBAC avec Terraform

\`\`\`hcl
# rbac.tf
resource "kubernetes_service_account" "app" {
  metadata {
    name      = "app-service-account"
    namespace = "production"
  }
}

resource "kubernetes_role" "app_role" {
  metadata {
    name      = "app-role"
    namespace = "production"
  }

  rule {
    api_groups = [""]
    resources  = ["configmaps", "secrets"]
    verbs      = ["get", "list", "watch"]
  }

  rule {
    api_groups = ["apps"]
    resources  = ["deployments"]
    verbs      = ["get", "list", "watch"]
  }
}

resource "kubernetes_role_binding" "app_binding" {
  metadata {
    name      = "app-role-binding"
    namespace = "production"
  }

  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "Role"
    name      = kubernetes_role.app_role.metadata[0].name
  }

  subject {
    kind      = "ServiceAccount"
    name      = kubernetes_service_account.app.metadata[0].name
    namespace = "production"
  }
}

# ClusterRole pour le monitoring
resource "kubernetes_cluster_role" "monitoring" {
  metadata {
    name = "monitoring-role"
  }

  rule {
    api_groups = [""]
    resources  = ["nodes", "pods", "services", "endpoints"]
    verbs      = ["get", "list", "watch"]
  }

  rule {
    api_groups = [""]
    resources  = ["pods/log"]
    verbs      = ["get"]
  }
}
\`\`\`

## 5. Déployer des applications avec Helm provider

\`\`\`hcl
# helm-releases.tf
resource "helm_release" "nginx_ingress" {
  name       = "nginx-ingress"
  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"
  namespace  = "ingress-system"
  version    = "4.9.0"

  create_namespace = true

  set {
    name  = "controller.replicaCount"
    value = "3"
  }

  set {
    name  = "controller.resources.requests.cpu"
    value = "200m"
  }

  set {
    name  = "controller.resources.requests.memory"
    value = "256Mi"
  }

  set {
    name  = "controller.metrics.enabled"
    value = "true"
  }
}

resource "helm_release" "cert_manager" {
  name       = "cert-manager"
  repository = "https://charts.jetstack.io"
  chart      = "cert-manager"
  namespace  = "cert-manager"
  version    = "1.14.0"

  create_namespace = true

  set {
    name  = "installCRDs"
    value = "true"
  }
}

resource "helm_release" "prometheus" {
  name       = "prometheus"
  repository = "https://prometheus-community.github.io/helm-charts"
  chart      = "kube-prometheus-stack"
  namespace  = "monitoring"
  version    = "55.0.0"

  create_namespace = true

  values = [
    file("values/prometheus-values.yaml")
  ]
}
\`\`\`

## 6. Deployments Kubernetes via Terraform

\`\`\`hcl
# app-deployment.tf
resource "kubernetes_deployment" "backend" {
  metadata {
    name      = "backend"
    namespace = "production"
    labels = {
      app     = "backend"
      version = var.app_version
    }
  }

  spec {
    replicas = var.backend_replicas

    selector {
      match_labels = {
        app = "backend"
      }
    }

    template {
      metadata {
        labels = {
          app     = "backend"
          version = var.app_version
        }
      }

      spec {
        service_account_name = kubernetes_service_account.app.metadata[0].name

        container {
          name  = "backend"
          image = "\\\${var.registry}/backend:\\\${var.app_version}"

          port {
            container_port = 3000
          }

          env_from {
            config_map_ref {
              name = kubernetes_config_map.app_config.metadata[0].name
            }
          }

          resources {
            requests = {
              cpu    = "200m"
              memory = "256Mi"
            }
            limits = {
              cpu    = "500m"
              memory = "512Mi"
            }
          }

          liveness_probe {
            http_get {
              path = "/health"
              port = 3000
            }
            initial_delay_seconds = 15
            period_seconds        = 20
          }

          readiness_probe {
            http_get {
              path = "/ready"
              port = 3000
            }
            initial_delay_seconds = 5
            period_seconds        = 10
          }
        }
      }
    }
  }
}
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Terraform et Kubernetes

### Exercice 1 : Configurer le provider Kubernetes

\`\`\`bash
mkdir terraform-k8s && cd terraform-k8s

cat > providers.tf << 'EOF'
terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.25"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.12"
    }
  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}
EOF

terraform init
\`\`\`

### Exercice 2 : Créer des namespaces avec RBAC

\`\`\`bash
cat > namespaces.tf << 'EOF'
resource "kubernetes_namespace" "app" {
  for_each = toset(["production", "staging"])
  metadata {
    name = each.value
    labels = { managed-by = "terraform" }
  }
}
EOF

terraform plan
terraform apply -auto-approve
kubectl get namespaces --show-labels
\`\`\`

### Exercice 3 : Déployer nginx-ingress avec Helm

\`\`\`bash
cat > helm.tf << 'EOF'
resource "helm_release" "nginx" {
  name       = "ingress-nginx"
  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"
  namespace  = "ingress-system"
  create_namespace = true
}
EOF

terraform apply -auto-approve
kubectl get pods -n ingress-system
\`\`\`

### Exercice 4 : Déployer une application complète

\`\`\`bash
# Créer deployment + service + ingress via Terraform
terraform apply -auto-approve
kubectl get all -n production
curl -H "Host: app.example.com" http://localhost
\`\`\`

### Exercice 5 : Gérer les secrets avec Terraform

\`\`\`bash
# Créer des secrets Kubernetes depuis Terraform
# Utiliser sensitive = true pour les variables
terraform plan
terraform apply
kubectl get secrets -n production
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Le provider Kubernetes permet de gérer les ressources K8s comme du code Terraform',
      'Le provider Helm déploie et gère les charts Helm de manière déclarative',
      'for_each permet de créer plusieurs namespaces et ressources dynamiquement',
      'Le RBAC (Roles, RoleBindings, ServiceAccounts) se gère entièrement via Terraform',
      'Les Helm releases supportent des values files et des set pour la configuration',
      'Terraform unifie la gestion de l\'infra cloud et des ressources Kubernetes',
      'Les secrets Kubernetes peuvent être créés via Terraform avec sensitive = true',
      'L\'approche Infrastructure as Code garantit la reproductibilité des environnements'
    ]),
  },

  // ============================================================
  // TERRAFORM - Module 10: Projet final Terraform
  // ============================================================
  {
    id: 'tf-10',
    courseId: 'terraform',
    title: 'Projet final Terraform',
    duration: '5h',
    orderIndex: 10,
    theoryContent: `# Projet final Terraform : Infrastructure cloud complète

## Objectif

Provisionner une infrastructure AWS complète de zéro à la production : VPC, sous-réseaux, security groups, instances EC2, base de données RDS, stockage S3, rôles IAM, et load balancer.

## 1. Structure du projet

\`\`\`
projet-final/
├── main.tf
├── providers.tf
├── variables.tf
├── outputs.tf
├── terraform.tfvars
├── modules/
│   ├── networking/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── compute/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── database/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   └── storage/
│       ├── main.tf
│       ├── variables.tf
│       └── outputs.tf
└── environments/
    ├── dev.tfvars
    ├── staging.tfvars
    └── prod.tfvars
\`\`\`

## 2. Module Networking (VPC)

\`\`\`hcl
# modules/networking/main.tf
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "\\\${var.project}-vpc"
    Environment = var.environment
  }
}

resource "aws_subnet" "public" {
  count                   = length(var.public_subnet_cidrs)
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  availability_zone       = var.availability_zones[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "\\\${var.project}-public-\\\${count.index + 1}"
    Type = "public"
  }
}

resource "aws_subnet" "private" {
  count             = length(var.private_subnet_cidrs)
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet_cidrs[count.index]
  availability_zone = var.availability_zones[count.index]

  tags = {
    Name = "\\\${var.project}-private-\\\${count.index + 1}"
    Type = "private"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  tags   = { Name = "\\\${var.project}-igw" }
}

resource "aws_nat_gateway" "main" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public[0].id
  tags          = { Name = "\\\${var.project}-nat" }
}

resource "aws_eip" "nat" {
  domain = "vpc"
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
  tags = { Name = "\\\${var.project}-public-rt" }
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.main.id
  }
  tags = { Name = "\\\${var.project}-private-rt" }
}

resource "aws_route_table_association" "public" {
  count          = length(aws_subnet.public)
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private" {
  count          = length(aws_subnet.private)
  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private.id
}
\`\`\`

## 3. Security Groups

\`\`\`hcl
# modules/compute/security_groups.tf
resource "aws_security_group" "alb" {
  name_prefix = "\\\${var.project}-alb-"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "app" {
  name_prefix = "\\\${var.project}-app-"
  vpc_id      = var.vpc_id

  ingress {
    from_port       = 3000
    to_port         = 3000
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "db" {
  name_prefix = "\\\${var.project}-db-"
  vpc_id      = var.vpc_id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.app.id]
  }
}
\`\`\`

## 4. Base de données RDS

\`\`\`hcl
# modules/database/main.tf
resource "aws_db_subnet_group" "main" {
  name       = "\\\${var.project}-db-subnet"
  subnet_ids = var.private_subnet_ids
}

resource "aws_db_instance" "main" {
  identifier     = "\\\${var.project}-db"
  engine         = "postgres"
  engine_version = "16.1"
  instance_class = var.db_instance_class

  allocated_storage     = 20
  max_allocated_storage = 100
  storage_encrypted     = true

  db_name  = var.db_name
  username = var.db_username
  password = var.db_password

  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [var.db_security_group_id]

  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "Mon:04:00-Mon:05:00"

  multi_az            = var.environment == "production"
  skip_final_snapshot = var.environment != "production"

  tags = {
    Name        = "\\\${var.project}-database"
    Environment = var.environment
  }
}
\`\`\`

## 5. S3 et IAM

\`\`\`hcl
# modules/storage/main.tf
resource "aws_s3_bucket" "assets" {
  bucket = "\\\${var.project}-assets-\\\${var.environment}"
  tags   = { Environment = var.environment }
}

resource "aws_s3_bucket_versioning" "assets" {
  bucket = aws_s3_bucket.assets.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "assets" {
  bucket = aws_s3_bucket.assets.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# IAM Role pour l'application
resource "aws_iam_role" "app" {
  name = "\\\${var.project}-app-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy" "s3_access" {
  name = "s3-access"
  role = aws_iam_role.app.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action   = ["s3:GetObject", "s3:PutObject", "s3:ListBucket"]
      Effect   = "Allow"
      Resource = [
        aws_s3_bucket.assets.arn,
        "\\\${aws_s3_bucket.assets.arn}/*"
      ]
    }]
  })
}
\`\`\`

## 6. Variables et Outputs

\`\`\`hcl
# variables.tf
variable "project" {
  description = "Nom du projet"
  type        = string
  default     = "formation-devops"
}

variable "environment" {
  description = "Environnement (dev, staging, production)"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR du VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "db_password" {
  description = "Mot de passe de la base de données"
  type        = string
  sensitive   = true
}

# outputs.tf
output "vpc_id" {
  value = module.networking.vpc_id
}

output "alb_dns_name" {
  value = module.compute.alb_dns_name
}

output "rds_endpoint" {
  value     = module.database.endpoint
  sensitive = true
}
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Projet final Terraform

### Étape 1 : Initialiser le projet

\`\`\`bash
mkdir -p projet-terraform/{modules/{networking,compute,database,storage},environments}
cd projet-terraform

cat > providers.tf << 'EOF'
terraform {
  required_version = ">= 1.6"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.30"
    }
  }
  backend "s3" {
    bucket = "terraform-state-formation"
    key    = "production/terraform.tfstate"
    region = "eu-west-1"
  }
}
provider "aws" {
  region = var.aws_region
}
EOF

terraform init
\`\`\`

### Étape 2 : Créer le module VPC

\`\`\`bash
# Implémenter le module networking
terraform plan -var-file=environments/dev.tfvars
terraform apply -var-file=environments/dev.tfvars
\`\`\`

### Étape 3 : Ajouter la base de données

\`\`\`bash
# Module database avec RDS PostgreSQL
terraform plan -target=module.database
terraform apply -target=module.database
\`\`\`

### Étape 4 : Déployer par environnement

\`\`\`bash
# Dev
terraform workspace new dev
terraform apply -var-file=environments/dev.tfvars

# Production
terraform workspace new production
terraform apply -var-file=environments/prod.tfvars
\`\`\`

### Étape 5 : Valider et documenter

\`\`\`bash
terraform output
terraform state list
terraform graph | dot -Tpng > infra-graph.png
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Un projet Terraform structuré utilise des modules pour networking, compute, database et storage',
      'Le module VPC crée subnets publics/privés, IGW, NAT gateway et route tables',
      'Les Security Groups suivent le principe du moindre privilège entre les couches',
      'RDS avec multi_az et backup automatique assure la haute disponibilité en production',
      'S3 avec versioning et encryption protège les assets de l\'application',
      'Les IAM Roles et Policies contrôlent finement les accès aux services AWS',
      'Les workspaces ou var-files séparent les environnements dev/staging/prod',
      'Le backend S3 centralise le state file pour le travail en équipe'
    ]),
  },



  // ============================================================
  // ANSIBLE - Module 9: Ansible et la sécurité
  // ============================================================
  {
    id: 'ans-09',
    courseId: 'ansible',
    title: 'Ansible et la sécurité',
    duration: '4h',
    orderIndex: 9,
    theoryContent: `# Ansible et la sécurité

## 1. Introduction au hardening avec Ansible

Ansible est un outil puissant pour automatiser le hardening (durcissement) des serveurs, la conformité aux standards de sécurité (CIS Benchmarks, STIG), la gestion des patches et la rotation des secrets. L'automatisation garantit que les configurations de sécurité sont appliquées de manière cohérente sur toute l'infrastructure.

## 2. CIS Benchmarks avec Ansible

Les CIS (Center for Internet Security) Benchmarks sont des guides de configuration sécurisée reconnus mondialement.

\`\`\`yaml
# roles/cis-hardening/tasks/main.yml
---
- name: "CIS 1.1.1 - Désactiver les systèmes de fichiers non utilisés"
  copy:
    dest: /etc/modprobe.d/cis-disable-fs.conf
    content: |
      install cramfs /bin/true
      install freevxfs /bin/true
      install jffs2 /bin/true
      install hfs /bin/true
      install hfsplus /bin/true
      install squashfs /bin/true
      install udf /bin/true
    mode: '0644'

- name: "CIS 1.3.1 - Installer AIDE (détection d'intrusion)"
  apt:
    name: aide
    state: present

- name: "CIS 1.3.2 - Initialiser la base AIDE"
  command: aideinit
  args:
    creates: /var/lib/aide/aide.db

- name: "CIS 1.4.1 - Permissions sur bootloader"
  file:
    path: /boot/grub/grub.cfg
    owner: root
    group: root
    mode: '0400'

- name: "CIS 5.2.1 - Configuration SSH sécurisée"
  template:
    src: sshd_config.j2
    dest: /etc/ssh/sshd_config
    owner: root
    group: root
    mode: '0600'
    validate: '/usr/sbin/sshd -T -f %s'
  notify: restart sshd
\`\`\`

\`\`\`jinja2
# templates/sshd_config.j2
# CIS Benchmark SSH Configuration
Protocol 2
LogLevel VERBOSE
MaxAuthTries 4
PermitRootLogin no
PermitEmptyPasswords no
PasswordAuthentication {{ 'yes' if ssh_allow_password else 'no' }}
X11Forwarding no
MaxStartups 10:30:60
ClientAliveInterval 300
ClientAliveCountMax 0
LoginGraceTime 60
AllowUsers {{ ssh_allowed_users | join(' ') }}
Banner /etc/issue.net
Ciphers aes256-gcm@openssh.com,aes128-gcm@openssh.com,aes256-ctr
MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com
KexAlgorithms curve25519-sha256,diffie-hellman-group16-sha512
\`\`\`

## 3. Gestion des patches

\`\`\`yaml
# roles/patch-management/tasks/main.yml
---
- name: "Mettre à jour le cache apt"
  apt:
    update_cache: yes
    cache_valid_time: 3600

- name: "Installer les mises à jour de sécurité uniquement"
  apt:
    upgrade: dist
    default_release: "{{ ansible_distribution_release }}-security"
  register: security_updates
  when: patch_security_only | default(true)

- name: "Installer toutes les mises à jour"
  apt:
    upgrade: full
  register: full_updates
  when: not (patch_security_only | default(true))

- name: "Vérifier si un reboot est nécessaire"
  stat:
    path: /var/run/reboot-required
  register: reboot_required

- name: "Reboot si nécessaire"
  reboot:
    reboot_timeout: 300
    msg: "Reboot pour appliquer les patches de sécurité"
  when: reboot_required.stat.exists and patch_allow_reboot | default(false)

- name: "Configurer les mises à jour automatiques"
  template:
    src: 50unattended-upgrades.j2
    dest: /etc/apt/apt.conf.d/50unattended-upgrades
  notify: restart unattended-upgrades
\`\`\`

## 4. Rotation des secrets avec Ansible Vault

\`\`\`yaml
# rotate-secrets.yml
---
- name: "Rotation des secrets"
  hosts: all
  vars_files:
    - vault/secrets.yml
  tasks:
    - name: "Générer un nouveau mot de passe pour la DB"
      set_fact:
        new_db_password: "{{ lookup('password', '/dev/null length=32 chars=ascii_letters,digits') }}"
      run_once: true
      delegate_to: localhost

    - name: "Mettre à jour le mot de passe PostgreSQL"
      postgresql_user:
        name: "{{ db_user }}"
        password: "{{ new_db_password }}"
        encrypted: yes
      delegate_to: "{{ db_host }}"
      run_once: true

    - name: "Mettre à jour la configuration de l'application"
      template:
        src: app-config.j2
        dest: /opt/app/.env
        owner: app
        group: app
        mode: '0600'
      notify: restart application

    - name: "Sauvegarder le nouveau secret dans le vault"
      copy:
        content: "db_password: {{ new_db_password }}"
        dest: "{{ playbook_dir }}/vault/secrets.yml"
      delegate_to: localhost
      run_once: true

    - name: "Chiffrer le vault"
      command: ansible-vault encrypt {{ playbook_dir }}/vault/secrets.yml
      delegate_to: localhost
      run_once: true
\`\`\`

## 5. Firewall et règles iptables

\`\`\`yaml
# roles/firewall/tasks/main.yml
---
- name: "Installer UFW"
  apt:
    name: ufw
    state: present

- name: "Politique par défaut - bloquer tout le trafic entrant"
  ufw:
    direction: incoming
    policy: deny

- name: "Autoriser le trafic sortant"
  ufw:
    direction: outgoing
    policy: allow

- name: "Autoriser SSH depuis le réseau d'administration"
  ufw:
    rule: allow
    port: "22"
    proto: tcp
    src: "{{ admin_network }}"
    comment: "SSH admin access"

- name: "Autoriser les ports applicatifs"
  ufw:
    rule: allow
    port: "{{ item.port }}"
    proto: "{{ item.proto | default('tcp') }}"
    src: "{{ item.src | default('any') }}"
    comment: "{{ item.comment }}"
  loop: "{{ firewall_rules }}"

- name: "Activer UFW"
  ufw:
    state: enabled
    logging: "on"
\`\`\`

## 6. Compliance scanning avec Ansible

\`\`\`yaml
# compliance-scan.yml
---
- name: "Scan de conformité CIS"
  hosts: all
  tasks:
    - name: "Vérifier les permissions /etc/passwd"
      stat:
        path: /etc/passwd
      register: passwd_stat

    - name: "FAIL si permissions incorrectes sur /etc/passwd"
      assert:
        that:
          - passwd_stat.stat.mode == '0644'
          - passwd_stat.stat.uid == 0
        fail_msg: "VIOLATION CIS 6.1.2: /etc/passwd permissions incorrectes"
        success_msg: "OK: /etc/passwd conforme"

    - name: "Vérifier qu'aucun utilisateur n'a un UID 0 sauf root"
      shell: "awk -F: '($3 == 0) { print $1 }' /etc/passwd"
      register: uid_zero_users
      changed_when: false

    - name: "FAIL si utilisateur non-root avec UID 0"
      assert:
        that: uid_zero_users.stdout_lines == ['root']
        fail_msg: "VIOLATION: Utilisateurs avec UID 0: {{ uid_zero_users.stdout_lines }}"

    - name: "Vérifier les ports en écoute"
      shell: "ss -tlnp | grep LISTEN"
      register: listening_ports
      changed_when: false

    - name: "Générer le rapport de conformité"
      template:
        src: compliance-report.j2
        dest: "/tmp/compliance-report-{{ inventory_hostname }}.html"
      delegate_to: localhost
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Sécurité avec Ansible

### Exercice 1 : Hardening SSH

\`\`\`bash
mkdir -p ansible-security/{roles/ssh-hardening/{tasks,templates,handlers},inventory}
cd ansible-security

cat > roles/ssh-hardening/tasks/main.yml << 'EOF'
---
- name: Configurer SSH de manière sécurisée
  template:
    src: sshd_config.j2
    dest: /etc/ssh/sshd_config
    validate: '/usr/sbin/sshd -T -f %s'
  notify: restart sshd

- name: Désactiver les algorithmes faibles
  lineinfile:
    path: /etc/ssh/sshd_config
    regexp: "^{{ item.key }}"
    line: "{{ item.key }} {{ item.value }}"
  loop:
    - { key: "Ciphers", value: "aes256-gcm@openssh.com,aes256-ctr" }
    - { key: "MACs", value: "hmac-sha2-512-etm@openssh.com" }
  notify: restart sshd
EOF

ansible-playbook -i inventory/hosts site.yml --check --diff
\`\`\`

### Exercice 2 : Scan de conformité

\`\`\`bash
cat > compliance-scan.yml << 'EOF'
---
- hosts: all
  tasks:
    - name: Vérifier /etc/passwd permissions
      stat: { path: /etc/passwd }
      register: p
    - assert:
        that: p.stat.mode == '0644'
        fail_msg: "VIOLATION: permissions /etc/passwd"
EOF

ansible-playbook compliance-scan.yml -i inventory/hosts
\`\`\`

### Exercice 3 : Gestion des patches

\`\`\`bash
ansible all -m apt -a "upgrade=safe" --check
ansible all -m shell -a "cat /var/run/reboot-required 2>/dev/null || echo 'No reboot needed'"
\`\`\`

### Exercice 4 : Configuration du firewall

\`\`\`bash
cat > firewall.yml << 'EOF'
---
- hosts: all
  become: yes
  tasks:
    - name: Install and configure UFW
      apt: { name: ufw, state: present }
    - ufw: { direction: incoming, policy: deny }
    - ufw: { rule: allow, port: "22", src: "10.0.0.0/8" }
    - ufw: { rule: allow, port: "443" }
    - ufw: { state: enabled }
EOF

ansible-playbook firewall.yml --check --diff
\`\`\`

### Exercice 5 : Rotation des secrets avec Vault

\`\`\`bash
ansible-vault create vault/secrets.yml
ansible-vault edit vault/secrets.yml
ansible-playbook rotate-secrets.yml --ask-vault-pass
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Ansible automatise le hardening CIS/STIG de manière cohérente sur toute l\'infrastructure',
      'La configuration SSH sécurisée désactive root login, limite les algorithmes et active le logging',
      'La gestion des patches automatise les mises à jour de sécurité avec reboot conditionnel',
      'Ansible Vault chiffre les secrets et permet leur rotation automatisée',
      'Les règles firewall UFW/iptables sont gérées de manière déclarative',
      'Le compliance scanning vérifie automatiquement la conformité aux standards',
      'Les templates Jinja2 permettent de personnaliser les configurations par environnement',
      'L\'idempotence d\'Ansible garantit que le hardening est toujours dans l\'état souhaité'
    ]),
  },

  // ============================================================
  // ANSIBLE - Module 10: Projet final Ansible
  // ============================================================
  {
    id: 'ans-10',
    courseId: 'ansible',
    title: 'Projet final Ansible',
    duration: '5h',
    orderIndex: 10,
    theoryContent: `# Projet final Ansible : Infrastructure complète automatisée

## Objectif

Configurer une infrastructure complète avec Ansible : serveurs web (Nginx), application backend, base de données PostgreSQL, monitoring (Prometheus + Node Exporter), backup automatisé et sécurité, le tout orchestré par des playbooks modulaires.

## 1. Structure du projet

\`\`\`
projet-final-ansible/
├── ansible.cfg
├── inventory/
│   ├── production/
│   │   ├── hosts.yml
│   │   └── group_vars/
│   │       ├── all.yml
│   │       ├── webservers.yml
│   │       └── databases.yml
│   └── staging/
├── playbooks/
│   ├── site.yml          # Playbook principal
│   ├── webservers.yml
│   ├── databases.yml
│   ├── monitoring.yml
│   └── security.yml
├── roles/
│   ├── common/
│   ├── nginx/
│   ├── app/
│   ├── postgresql/
│   ├── monitoring/
│   ├── backup/
│   └── security/
└── vault/
    └── secrets.yml
\`\`\`

## 2. Inventaire dynamique

\`\`\`yaml
# inventory/production/hosts.yml
all:
  children:
    webservers:
      hosts:
        web-01:
          ansible_host: 192.168.1.10
        web-02:
          ansible_host: 192.168.1.11
    appservers:
      hosts:
        app-01:
          ansible_host: 192.168.1.20
        app-02:
          ansible_host: 192.168.1.21
    databases:
      hosts:
        db-01:
          ansible_host: 192.168.1.30
          postgresql_role: primary
        db-02:
          ansible_host: 192.168.1.31
          postgresql_role: replica
    monitoring:
      hosts:
        monitor-01:
          ansible_host: 192.168.1.40
\`\`\`

## 3. Rôle Nginx (Web Server)

\`\`\`yaml
# roles/nginx/tasks/main.yml
---
- name: Installer Nginx
  apt:
    name: nginx
    state: present
    update_cache: yes

- name: Configurer le site principal
  template:
    src: vhost.conf.j2
    dest: /etc/nginx/sites-available/{{ app_name }}
    mode: '0644'
  notify: reload nginx

- name: Activer le site
  file:
    src: /etc/nginx/sites-available/{{ app_name }}
    dest: /etc/nginx/sites-enabled/{{ app_name }}
    state: link
  notify: reload nginx

- name: Supprimer le site par défaut
  file:
    path: /etc/nginx/sites-enabled/default
    state: absent
  notify: reload nginx

- name: Configurer les certificats SSL
  include_tasks: ssl.yml
  when: ssl_enabled | default(true)

- name: Vérifier la configuration Nginx
  command: nginx -t
  changed_when: false
\`\`\`

## 4. Rôle PostgreSQL

\`\`\`yaml
# roles/postgresql/tasks/main.yml
---
- name: Installer PostgreSQL
  apt:
    name:
      - postgresql-16
      - postgresql-client-16
      - python3-psycopg2
    state: present

- name: Configurer PostgreSQL
  template:
    src: postgresql.conf.j2
    dest: /etc/postgresql/16/main/postgresql.conf
  notify: restart postgresql

- name: Configurer pg_hba.conf
  template:
    src: pg_hba.conf.j2
    dest: /etc/postgresql/16/main/pg_hba.conf
  notify: restart postgresql

- name: Créer la base de données
  postgresql_db:
    name: "{{ db_name }}"
    encoding: UTF-8
    lc_collate: fr_FR.UTF-8
    state: present
  become_user: postgres

- name: Créer l'utilisateur applicatif
  postgresql_user:
    name: "{{ db_user }}"
    password: "{{ db_password }}"
    db: "{{ db_name }}"
    priv: "ALL"
    state: present
  become_user: postgres

- name: Configurer la réplication
  include_tasks: replication.yml
  when: postgresql_role == 'replica'
\`\`\`

## 5. Rôle Monitoring

\`\`\`yaml
# roles/monitoring/tasks/main.yml
---
- name: Installer Node Exporter
  include_tasks: node_exporter.yml

- name: Installer Prometheus (sur monitoring server)
  include_tasks: prometheus.yml
  when: "'monitoring' in group_names"

- name: Configurer les alertes
  template:
    src: alert_rules.yml.j2
    dest: /etc/prometheus/rules/alerts.yml
  when: "'monitoring' in group_names"
  notify: reload prometheus
\`\`\`

## 6. Rôle Backup

\`\`\`yaml
# roles/backup/tasks/main.yml
---
- name: Installer les outils de backup
  apt:
    name:
      - borgbackup
      - python3-pexpect
    state: present

- name: Créer le répertoire de backup
  file:
    path: "{{ backup_dir }}"
    state: directory
    owner: root
    mode: '0700'

- name: Initialiser le repo Borg
  command: borg init --encryption=repokey {{ backup_repo }}
  args:
    creates: "{{ backup_repo }}/config"
  environment:
    BORG_PASSPHRASE: "{{ backup_passphrase }}"

- name: Déployer le script de backup
  template:
    src: backup.sh.j2
    dest: /usr/local/bin/backup.sh
    mode: '0700'

- name: Configurer le cron de backup
  cron:
    name: "Backup quotidien"
    hour: "2"
    minute: "0"
    job: "/usr/local/bin/backup.sh >> /var/log/backup.log 2>&1"
\`\`\`

## 7. Playbook principal

\`\`\`yaml
# playbooks/site.yml
---
- name: Configuration de base pour tous les serveurs
  hosts: all
  become: yes
  roles:
    - common
    - security

- name: Configuration des serveurs web
  hosts: webservers
  become: yes
  roles:
    - nginx

- name: Configuration des serveurs applicatifs
  hosts: appservers
  become: yes
  roles:
    - app

- name: Configuration des bases de données
  hosts: databases
  become: yes
  roles:
    - postgresql
    - backup

- name: Configuration du monitoring
  hosts: all
  become: yes
  roles:
    - role: monitoring
      tags: ['monitoring']
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Projet final Ansible

### Étape 1 : Structurer le projet

\`\`\`bash
mkdir -p projet-ansible/{inventory/production/group_vars,playbooks,roles/{common,nginx,postgresql,monitoring,backup,security}/{tasks,templates,handlers,defaults}}
cd projet-ansible

cat > ansible.cfg << 'EOF'
[defaults]
inventory = inventory/production
roles_path = roles
retry_files_enabled = false
host_key_checking = false

[privilege_escalation]
become = true
become_method = sudo
EOF
\`\`\`

### Étape 2 : Créer le rôle common

\`\`\`bash
cat > roles/common/tasks/main.yml << 'EOF'
---
- name: Mettre à jour les packages
  apt: { update_cache: yes, cache_valid_time: 3600 }
- name: Installer les packages de base
  apt:
    name: [curl, wget, vim, htop, tree, unzip, jq]
    state: present
- name: Configurer le timezone
  timezone: { name: Europe/Paris }
- name: Configurer NTP
  apt: { name: chrony, state: present }
EOF
\`\`\`

### Étape 3 : Déployer Nginx avec SSL

\`\`\`bash
cat > roles/nginx/tasks/main.yml << 'EOF'
---
- name: Installer Nginx
  apt: { name: nginx, state: present }
- name: Déployer la configuration
  template: { src: vhost.conf.j2, dest: "/etc/nginx/sites-available/app" }
  notify: reload nginx
- name: Activer le site
  file:
    src: /etc/nginx/sites-available/app
    dest: /etc/nginx/sites-enabled/app
    state: link
EOF

ansible-playbook playbooks/site.yml --tags nginx --check
\`\`\`

### Étape 4 : Configurer PostgreSQL avec backup

\`\`\`bash
ansible-playbook playbooks/databases.yml --check --diff
ansible-playbook playbooks/databases.yml
# Vérifier la connexion
ansible databases -m postgresql_ping
\`\`\`

### Étape 5 : Déployer le monitoring complet

\`\`\`bash
ansible-playbook playbooks/monitoring.yml
# Vérifier les exporters
ansible all -m uri -a "url=http://localhost:9100/metrics"
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Un projet Ansible complet utilise des rôles modulaires pour chaque composant',
      'L\'inventaire sépare les environnements avec des group_vars spécifiques',
      'Le playbook site.yml orchestre tous les rôles dans l\'ordre correct',
      'Le rôle common installe les prérequis et configure la base de chaque serveur',
      'PostgreSQL est configuré avec réplication, utilisateurs et backup automatique',
      'Le monitoring déploie Node Exporter sur tous les serveurs et Prometheus centralisé',
      'Les backups utilisent Borg avec chiffrement et rétention automatique via cron',
      'La sécurité est un rôle transverse appliqué à tous les serveurs en premier'
    ]),
  },



  // ============================================================
  // GITLAB CI - Module 9: GitLab CI pour monorepos
  // ============================================================
  {
    id: 'glci-09',
    courseId: 'gitlab-ci',
    title: 'GitLab CI pour monorepos',
    duration: '3h30',
    orderIndex: 9,
    theoryContent: `# GitLab CI pour monorepos

## 1. Introduction

Un monorepo contient plusieurs projets ou services dans un seul dépôt Git. GitLab CI offre des fonctionnalités puissantes pour gérer efficacement les pipelines dans ce contexte : détection des changements, exécution conditionnelle, cache par composant et pipelines DAG.

## 2. Structure d'un monorepo

\`\`\`
monorepo/
├── .gitlab-ci.yml        # Pipeline principal
├── services/
│   ├── api/
│   │   ├── .gitlab-ci.yml
│   │   ├── Dockerfile
│   │   └── src/
│   ├── frontend/
│   │   ├── .gitlab-ci.yml
│   │   ├── Dockerfile
│   │   └── src/
│   └── worker/
│       ├── .gitlab-ci.yml
│       ├── Dockerfile
│       └── src/
├── libs/
│   ├── common/
│   └── auth/
└── infrastructure/
    └── terraform/
\`\`\`

## 3. Rules:changes pour l'exécution conditionnelle

\`\`\`yaml
# .gitlab-ci.yml
stages:
  - lint
  - test
  - build
  - deploy

# Template de base pour les services
.service-template:
  image: node:20-alpine
  cache:
    key: "\\\${CI_JOB_NAME}-\\\${CI_COMMIT_REF_SLUG}"
    paths:
      - node_modules/

# API Service - s'exécute uniquement si le code API change
api:lint:
  extends: .service-template
  stage: lint
  script:
    - cd services/api
    - npm ci
    - npm run lint
  rules:
    - changes:
        - services/api/**/*
        - libs/common/**/*
        - libs/auth/**/*

api:test:
  extends: .service-template
  stage: test
  script:
    - cd services/api
    - npm ci
    - npm test -- --coverage
  rules:
    - changes:
        - services/api/**/*
        - libs/common/**/*
        - libs/auth/**/*
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: services/api/coverage/cobertura-coverage.xml

api:build:
  stage: build
  image: docker:24
  services:
    - docker:24-dind
  script:
    - docker build -t registry.example.com/app/api:\\\${CI_COMMIT_SHA} services/api/
    - docker push registry.example.com/app/api:\\\${CI_COMMIT_SHA}
  rules:
    - changes:
        - services/api/**/*
      if: \\\$CI_COMMIT_BRANCH == "main"

# Frontend Service
frontend:lint:
  extends: .service-template
  stage: lint
  script:
    - cd services/frontend
    - npm ci
    - npm run lint
  rules:
    - changes:
        - services/frontend/**/*
        - libs/common/**/*

frontend:test:
  extends: .service-template
  stage: test
  script:
    - cd services/frontend
    - npm ci
    - npm test
  rules:
    - changes:
        - services/frontend/**/*
        - libs/common/**/*
\`\`\`

## 4. Needs (DAG) pour l'exécution optimisée

\`\`\`yaml
# Pipeline DAG - les jobs s'exécutent dès que leurs dépendances sont prêtes
api:deploy:
  stage: deploy
  needs:
    - api:test
    - api:build
  script:
    - kubectl set image deployment/api api=registry.example.com/app/api:\\\${CI_COMMIT_SHA}
  rules:
    - changes:
        - services/api/**/*
      if: \\\$CI_COMMIT_BRANCH == "main"

frontend:deploy:
  stage: deploy
  needs:
    - frontend:test
    - frontend:build
  script:
    - kubectl set image deployment/frontend frontend=registry.example.com/app/frontend:\\\${CI_COMMIT_SHA}
  rules:
    - changes:
        - services/frontend/**/*
      if: \\\$CI_COMMIT_BRANCH == "main"
\`\`\`

## 5. Cache par composant

\`\`\`yaml
# Cache séparé pour chaque service
api:test:
  cache:
    key:
      files:
        - services/api/package-lock.json
      prefix: api
    paths:
      - services/api/node_modules/
    policy: pull-push

frontend:test:
  cache:
    key:
      files:
        - services/frontend/package-lock.json
      prefix: frontend
    paths:
      - services/frontend/node_modules/
    policy: pull-push
\`\`\`

## 6. Parallel matrix pour les tests multi-environnement

\`\`\`yaml
test:
  stage: test
  parallel:
    matrix:
      - SERVICE: [api, frontend, worker]
        NODE_VERSION: ["18", "20"]
  image: node:\\\${NODE_VERSION}-alpine
  script:
    - cd services/\\\${SERVICE}
    - npm ci
    - npm test
  rules:
    - changes:
        - services/\\\${SERVICE}/**/*

# Matrix pour les builds Docker multi-plateforme
build:docker:
  stage: build
  parallel:
    matrix:
      - SERVICE: api
        DOCKERFILE: services/api/Dockerfile
      - SERVICE: frontend
        DOCKERFILE: services/frontend/Dockerfile
      - SERVICE: worker
        DOCKERFILE: services/worker/Dockerfile
  script:
    - docker build -f \\\${DOCKERFILE} -t registry/\\\${SERVICE}:\\\${CI_COMMIT_SHA} .
    - docker push registry/\\\${SERVICE}:\\\${CI_COMMIT_SHA}
\`\`\`

## 7. Trigger de pipelines downstream

\`\`\`yaml
# Déclencher un pipeline dans un autre projet
deploy:infrastructure:
  stage: deploy
  trigger:
    project: devops/infrastructure
    branch: main
    strategy: depend
  rules:
    - changes:
        - infrastructure/**/*
      if: \\\$CI_COMMIT_BRANCH == "main"

# Child pipeline par include
include:
  - local: services/api/.gitlab-ci.yml
    rules:
      - changes:
          - services/api/**/*
  - local: services/frontend/.gitlab-ci.yml
    rules:
      - changes:
          - services/frontend/**/*
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : GitLab CI pour monorepos

### Exercice 1 : Configurer un pipeline monorepo

\`\`\`yaml
# Créer un .gitlab-ci.yml qui détecte les changements
# et n'exécute que les jobs nécessaires
stages: [lint, test, build, deploy]

api:test:
  stage: test
  script: cd services/api && npm test
  rules:
    - changes: [services/api/**/*]

frontend:test:
  stage: test
  script: cd services/frontend && npm test
  rules:
    - changes: [services/frontend/**/*]
\`\`\`

### Exercice 2 : Implémenter le DAG avec needs

\`\`\`yaml
# Configurer les dépendances entre jobs
# pour une exécution optimisée
api:build:
  stage: build
  needs: [api:lint, api:test]
  script: docker build services/api/

api:deploy:
  stage: deploy
  needs: [api:build]
  script: kubectl apply -f k8s/api/
\`\`\`

### Exercice 3 : Cache par composant

\`\`\`yaml
# Configurer un cache séparé pour chaque service
# basé sur le lock file spécifique
api:install:
  cache:
    key:
      files: [services/api/package-lock.json]
    paths: [services/api/node_modules/]
\`\`\`

### Exercice 4 : Matrix builds

\`\`\`yaml
# Tester tous les services en parallèle
# avec différentes versions de Node.js
test:
  parallel:
    matrix:
      - SERVICE: [api, frontend, worker]
  script:
    - cd services/\\\${SERVICE}
    - npm ci && npm test
\`\`\`

### Exercice 5 : Trigger downstream

\`\`\`yaml
# Déclencher le pipeline d'infrastructure
# quand les fichiers Terraform changent
deploy:infra:
  trigger:
    project: team/infrastructure
    strategy: depend
  rules:
    - changes: [infrastructure/**/*]
\`\`\`
`,
    keyPoints: JSON.stringify([
      'rules:changes détecte les fichiers modifiés pour exécuter uniquement les jobs concernés',
      'Le DAG (needs) permet l\'exécution parallèle de jobs indépendants entre stages',
      'Le cache par composant utilise le lock file comme clé pour optimiser les installations',
      'parallel:matrix exécute les mêmes tests sur plusieurs services ou versions simultanément',
      'Les triggers downstream lancent des pipelines dans d\'autres projets automatiquement',
      'include avec rules permet de charger conditionnellement des configurations enfant',
      'Les libs partagées dans rules:changes déclenchent les builds des services dépendants',
      'La stratégie depend sur les triggers attend la fin du pipeline déclenché'
    ]),
  },

  // ============================================================
  // GITLAB CI - Module 10: Projet final GitLab CI
  // ============================================================
  {
    id: 'glci-10',
    courseId: 'gitlab-ci',
    title: 'Projet final GitLab CI',
    duration: '5h',
    orderIndex: 10,
    theoryContent: `# Projet final GitLab CI : Pipeline complet de production

## Objectif

Construire un pipeline CI/CD complet incluant : lint, tests unitaires et d'intégration, build Docker, scan de sécurité, déploiement en staging automatique et déploiement en production avec validation manuelle.

## 1. Pipeline complet

\`\`\`yaml
# .gitlab-ci.yml
stages:
  - validate
  - test
  - build
  - scan
  - deploy-staging
  - integration-test
  - deploy-production

variables:
  DOCKER_IMAGE: \\\$CI_REGISTRY_IMAGE:\\\$CI_COMMIT_SHA
  DOCKER_IMAGE_LATEST: \\\$CI_REGISTRY_IMAGE:latest
  KUBE_NAMESPACE_STAGING: staging
  KUBE_NAMESPACE_PROD: production

# === STAGE: VALIDATE ===
lint:
  stage: validate
  image: node:20-alpine
  script:
    - npm ci
    - npm run lint
    - npm run format:check
  cache:
    key:
      files: [package-lock.json]
    paths: [node_modules/]

security:audit:
  stage: validate
  image: node:20-alpine
  script:
    - npm audit --audit-level=high
  allow_failure: true

# === STAGE: TEST ===
unit-tests:
  stage: test
  image: node:20-alpine
  services:
    - postgres:16-alpine
    - redis:7-alpine
  variables:
    POSTGRES_DB: testdb
    POSTGRES_USER: test
    POSTGRES_PASSWORD: test
    DATABASE_URL: "postgresql://test:test@postgres:5432/testdb"
    REDIS_URL: "redis://redis:6379"
  script:
    - npm ci
    - npm run test:unit -- --coverage
  artifacts:
    reports:
      junit: junit-report.xml
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
    paths:
      - coverage/
  coverage: '/Lines\\s*:\\s*(\\d+\\.?\\d*)%/'

# === STAGE: BUILD ===
build:docker:
  stage: build
  image: docker:24
  services:
    - docker:24-dind
  before_script:
    - docker login -u \\\$CI_REGISTRY_USER -p \\\$CI_REGISTRY_PASSWORD \\\$CI_REGISTRY
  script:
    - docker build --cache-from \\\$DOCKER_IMAGE_LATEST -t \\\$DOCKER_IMAGE -t \\\$DOCKER_IMAGE_LATEST .
    - docker push \\\$DOCKER_IMAGE
    - docker push \\\$DOCKER_IMAGE_LATEST
  rules:
    - if: \\\$CI_COMMIT_BRANCH == "main"
    - if: \\\$CI_MERGE_REQUEST_IID

# === STAGE: SCAN ===
container-scan:
  stage: scan
  image: aquasec/trivy:latest
  script:
    - trivy image --exit-code 1 --severity HIGH,CRITICAL \\\$DOCKER_IMAGE
  allow_failure: true
  needs: [build:docker]

sast:
  stage: scan
  image: semgrep/semgrep:latest
  script:
    - semgrep scan --config=auto --json --output=semgrep-report.json .
  artifacts:
    reports:
      sast: semgrep-report.json
  allow_failure: true

# === STAGE: DEPLOY STAGING ===
deploy:staging:
  stage: deploy-staging
  image: bitnami/kubectl:latest
  environment:
    name: staging
    url: https://staging.example.com
  script:
    - kubectl config use-context staging
    - kubectl set image deployment/app app=\\\$DOCKER_IMAGE -n \\\$KUBE_NAMESPACE_STAGING
    - kubectl rollout status deployment/app -n \\\$KUBE_NAMESPACE_STAGING --timeout=120s
  needs: [build:docker, container-scan]
  rules:
    - if: \\\$CI_COMMIT_BRANCH == "main"

# === STAGE: INTEGRATION TESTS ===
integration-tests:
  stage: integration-test
  image: node:20-alpine
  script:
    - npm ci
    - npm run test:e2e -- --base-url=https://staging.example.com
  needs: [deploy:staging]
  rules:
    - if: \\\$CI_COMMIT_BRANCH == "main"
  artifacts:
    when: always
    paths:
      - test-results/

# === STAGE: DEPLOY PRODUCTION ===
deploy:production:
  stage: deploy-production
  image: bitnami/kubectl:latest
  environment:
    name: production
    url: https://app.example.com
  script:
    - kubectl config use-context production
    - kubectl set image deployment/app app=\\\$DOCKER_IMAGE -n \\\$KUBE_NAMESPACE_PROD
    - kubectl rollout status deployment/app -n \\\$KUBE_NAMESPACE_PROD --timeout=180s
  needs: [integration-tests]
  rules:
    - if: \\\$CI_COMMIT_BRANCH == "main"
      when: manual  # Gate manuelle pour la production
  allow_failure: false
\`\`\`

## 2. Rollback automatique

\`\`\`yaml
rollback:production:
  stage: deploy-production
  image: bitnami/kubectl:latest
  script:
    - kubectl rollout undo deployment/app -n production
    - kubectl rollout status deployment/app -n production --timeout=120s
  environment:
    name: production
    action: stop
  rules:
    - if: \\\$CI_COMMIT_BRANCH == "main"
      when: manual
\`\`\`

## 3. Notifications

\`\`\`yaml
notify:success:
  stage: .post
  image: curlimages/curl:latest
  script:
    - |
      curl -X POST "\\\$SLACK_WEBHOOK_URL" \\
        -H 'Content-Type: application/json' \\
        -d "{
          \\"text\\": \\"✅ Deployment successful\\",
          \\"blocks\\": [{
            \\"type\\": \\"section\\",
            \\"text\\": {
              \\"type\\": \\"mrkdwn\\",
              \\"text\\": \\"*Deployment réussi* \\\\n Pipeline: \\\$CI_PIPELINE_URL \\\\n Commit: \\\$CI_COMMIT_SHORT_SHA \\\\n Auteur: \\\$CI_COMMIT_AUTHOR\\"
            }
          }]
        }"
  rules:
    - if: \\\$CI_COMMIT_BRANCH == "main"
      when: on_success

notify:failure:
  stage: .post
  image: curlimages/curl:latest
  script:
    - |
      curl -X POST "\\\$SLACK_WEBHOOK_URL" \\
        -H 'Content-Type: application/json' \\
        -d "{\\"text\\": \\"❌ Pipeline FAILED: \\\$CI_PIPELINE_URL\\"}"
  rules:
    - if: \\\$CI_COMMIT_BRANCH == "main"
      when: on_failure
\`\`\`

## 4. Variables et configuration

\`\`\`yaml
# Variables CI/CD à configurer dans GitLab Settings
# CI_REGISTRY_USER / CI_REGISTRY_PASSWORD : auto
# KUBE_CONFIG : kubeconfig base64
# SLACK_WEBHOOK_URL : URL du webhook Slack
# SONAR_TOKEN : token SonarQube
# TRIVY_SEVERITY : HIGH,CRITICAL
\`\`\`

## 5. Merge Request Pipeline

\`\`\`yaml
# Pipeline allégé pour les Merge Requests
mr:lint:
  extends: lint
  rules:
    - if: \\\$CI_MERGE_REQUEST_IID

mr:test:
  extends: unit-tests
  rules:
    - if: \\\$CI_MERGE_REQUEST_IID

mr:build:
  extends: build:docker
  rules:
    - if: \\\$CI_MERGE_REQUEST_IID
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Projet final GitLab CI

### Étape 1 : Créer le pipeline de base

\`\`\`yaml
# Commencer par lint + test + build
stages: [validate, test, build]

lint:
  stage: validate
  script: npm run lint

test:
  stage: test
  script: npm test -- --coverage
  coverage: '/Lines\\s*:\\s*(\\d+\\.?\\d*)%/'
\`\`\`

### Étape 2 : Ajouter le build Docker

\`\`\`yaml
build:
  stage: build
  image: docker:24
  services: [docker:24-dind]
  script:
    - docker login -u \\\$CI_REGISTRY_USER -p \\\$CI_REGISTRY_PASSWORD \\\$CI_REGISTRY
    - docker build -t \\\$CI_REGISTRY_IMAGE:\\\$CI_COMMIT_SHA .
    - docker push \\\$CI_REGISTRY_IMAGE:\\\$CI_COMMIT_SHA
\`\`\`

### Étape 3 : Scanner l'image Docker

\`\`\`yaml
scan:
  stage: scan
  image: aquasec/trivy:latest
  script:
    - trivy image --exit-code 0 --severity HIGH,CRITICAL \\\$CI_REGISTRY_IMAGE:\\\$CI_COMMIT_SHA
  needs: [build]
\`\`\`

### Étape 4 : Déploiement staging automatique

\`\`\`yaml
deploy:staging:
  stage: deploy
  script:
    - kubectl set image deployment/app app=\\\$CI_REGISTRY_IMAGE:\\\$CI_COMMIT_SHA
    - kubectl rollout status deployment/app --timeout=120s
  environment: { name: staging, url: https://staging.example.com }
\`\`\`

### Étape 5 : Gate manuelle pour la production

\`\`\`yaml
deploy:production:
  stage: deploy-prod
  script:
    - kubectl set image deployment/app app=\\\$CI_REGISTRY_IMAGE:\\\$CI_COMMIT_SHA -n production
  environment: { name: production }
  when: manual
  needs: [deploy:staging]
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Un pipeline complet couvre lint, test, build, scan, deploy staging et deploy prod',
      'Le build Docker utilise le registry GitLab intégré avec cache multi-layer',
      'Trivy et Semgrep scannent les vulnérabilités dans l\'image et le code',
      'Le déploiement staging est automatique, la production nécessite une validation manuelle',
      'Les tests d\'intégration s\'exécutent contre l\'environnement staging après déploiement',
      'Le rollback est disponible en un clic via un job manuel',
      'Les notifications Slack informent l\'équipe du succès ou de l\'échec',
      'Les Merge Request pipelines exécutent un sous-ensemble pour feedback rapide'
    ]),
  },



  // ============================================================
  // GIT AVANCÉ - Module 9: Git et la sécurité
  // ============================================================
  {
    id: 'git-09',
    courseId: 'git-avance',
    title: 'Git et la sécurité',
    duration: '3h',
    orderIndex: 9,
    theoryContent: `# Git et la sécurité

## 1. Signed Commits avec GPG

Les commits signés permettent de vérifier l'identité de l'auteur et l'intégrité du code. C'est essentiel pour la chaîne de confiance dans le supply chain logiciel.

### Configuration GPG

\`\`\`bash
# Générer une clé GPG
gpg --full-generate-key
# Choisir : RSA and RSA, 4096 bits, expiration 1 an

# Lister les clés
gpg --list-secret-keys --keyid-format=long

# Exporter la clé publique (pour GitHub/GitLab)
gpg --armor --export VOTRE_KEY_ID

# Configurer Git pour signer automatiquement
git config --global user.signingkey VOTRE_KEY_ID
git config --global commit.gpgsign true
git config --global tag.gpgSign true

# Signer un commit manuellement
git commit -S -m "Commit signé avec GPG"

# Vérifier un commit signé
git log --show-signature -1
git verify-commit HEAD

# Vérifier un tag signé
git verify-tag v1.0.0
\`\`\`

## 2. SSH Signing (Git 2.34+)

Alternative plus simple à GPG, utilisant les clés SSH existantes.

\`\`\`bash
# Configurer Git pour signer avec SSH
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub
git config --global commit.gpgsign true

# Fichier de clés autorisées pour la vérification
git config --global gpg.ssh.allowedSignersFile ~/.ssh/allowed_signers

# Créer le fichier allowed_signers
echo "user@example.com ssh-ed25519 AAAAC3..." > ~/.ssh/allowed_signers

# Vérifier un commit signé SSH
git log --show-signature -1
\`\`\`

## 3. Branch Protection Rules

\`\`\`yaml
# Configuration GitHub Branch Protection (via API)
# POST /repos/{owner}/{repo}/branches/{branch}/protection
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["ci/tests", "ci/lint", "security/scan"]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "required_approving_review_count": 2,
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true,
    "require_last_push_approval": true
  },
  "required_signatures": true,
  "restrictions": {
    "users": [],
    "teams": ["release-team"]
  },
  "allow_force_pushes": false,
  "allow_deletions": false,
  "required_linear_history": true
}
\`\`\`

## 4. CODEOWNERS

\`\`\`bash
# .github/CODEOWNERS (GitHub) ou CODEOWNERS (GitLab)
# Chaque ligne définit un pattern et les reviewers requis

# Global owners
* @team-lead @senior-dev

# Backend
/src/api/ @backend-team
/src/services/ @backend-team
/src/database/ @backend-team @dba-team

# Frontend
/src/components/ @frontend-team
/src/pages/ @frontend-team

# Infrastructure
/terraform/ @devops-team
/kubernetes/ @devops-team
/.github/workflows/ @devops-team

# Sécurité
/src/auth/ @security-team @backend-team
/src/middleware/security* @security-team

# Documentation
/docs/ @tech-writers
*.md @tech-writers

# Configuration sensible
.env* @security-team
*secret* @security-team
docker-compose*.yml @devops-team
\`\`\`

## 5. Git Hooks pour la sécurité

\`\`\`bash
#!/bin/bash
# .git/hooks/pre-commit - Détection de secrets

echo "🔍 Vérification des secrets..."

# Patterns à détecter
PATTERNS=(
  'AKIA[0-9A-Z]{16}'           # AWS Access Key
  'password\s*=\s*["\x27].+'   # Hardcoded passwords
  'api[_-]?key\s*=\s*["\x27].+'  # API keys
  'secret\s*=\s*["\x27].+'    # Secrets
  'BEGIN (RSA|DSA|EC) PRIVATE KEY' # Private keys
  'ghp_[a-zA-Z0-9]{36}'       # GitHub tokens
  'glpat-[a-zA-Z0-9_-]{20}'   # GitLab tokens
)

FOUND=0
for pattern in "\\\${PATTERNS[@]}"; do
  MATCHES=$(git diff --cached --diff-filter=ACM | grep -iP "$pattern" 2>/dev/null)
  if [ ! -z "$MATCHES" ]; then
    echo "⚠️  Secret potentiel détecté: $pattern"
    echo "$MATCHES"
    FOUND=1
  fi
done

if [ $FOUND -eq 1 ]; then
  echo "❌ Commit bloqué - secrets détectés"
  echo "Utilisez git-secrets ou gitleaks pour plus de détails"
  exit 1
fi

echo "✅ Aucun secret détecté"
exit 0
\`\`\`

## 6. Outils de sécurité Git

\`\`\`bash
# gitleaks - Scanner de secrets
gitleaks detect --source=. --report-format=json --report-path=gitleaks-report.json

# Configuration gitleaks
# .gitleaks.toml
[allowlist]
  description = "Allowed patterns"
  paths = ["test/", "docs/"]

[[rules]]
  id = "aws-access-key"
  description = "AWS Access Key"
  regex = '''AKIA[0-9A-Z]{16}'''
  tags = ["aws", "credentials"]

# git-secrets (AWS)
git secrets --install
git secrets --register-aws
git secrets --scan

# trufflehog - Analyse de l'historique complet
trufflehog git file://. --since-commit HEAD~50 --json
\`\`\`

## 7. Commit Verification Policy

\`\`\`bash
# Vérifier que tous les commits récents sont signés
git log --pretty=format:"%H %G? %GS %s" HEAD~10..HEAD
# G = Good signature, B = Bad, U = Untrusted, N = No signature

# Script de vérification CI
#!/bin/bash
UNSIGNED=$(git log --pretty=format:"%H %G?" origin/main..HEAD | grep " N$" | wc -l)
if [ "$UNSIGNED" -gt 0 ]; then
  echo "❌ $UNSIGNED commits non signés détectés"
  git log --pretty=format:"%H %G? %an: %s" origin/main..HEAD | grep " N "
  exit 1
fi
echo "✅ Tous les commits sont signés"
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Git et la sécurité

### Exercice 1 : Configurer GPG signing

\`\`\`bash
# Générer une clé GPG
gpg --full-generate-key

# Configurer Git
KEY_ID=$(gpg --list-secret-keys --keyid-format=long | grep sec | awk '{print $2}' | cut -d'/' -f2)
git config --global user.signingkey $KEY_ID
git config --global commit.gpgsign true

# Créer un commit signé et vérifier
git commit --allow-empty -S -m "Test commit signé"
git log --show-signature -1
\`\`\`

### Exercice 2 : Mettre en place CODEOWNERS

\`\`\`bash
cat > CODEOWNERS << 'EOF'
* @team-lead
/src/api/ @backend-team
/src/frontend/ @frontend-team
/terraform/ @devops-team
/.github/ @devops-team
EOF
git add CODEOWNERS && git commit -m "Add CODEOWNERS"
\`\`\`

### Exercice 3 : Hook pre-commit anti-secrets

\`\`\`bash
# Installer gitleaks
# Créer un hook qui bloque les commits avec secrets
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
gitleaks protect --staged --exit-code 1
EOF
chmod +x .git/hooks/pre-commit

# Tester avec un faux secret
echo "AWS_KEY=AKIAIOSFODNN7EXAMPLE" > test.txt
git add test.txt
git commit -m "test"  # Doit être bloqué
\`\`\`

### Exercice 4 : Scanner l'historique

\`\`\`bash
# Scanner tout l'historique pour des secrets
gitleaks detect --source=. --report-format=json
trufflehog git file://. --json | jq '.SourceMetadata'
\`\`\`

### Exercice 5 : Branch protection

\`\`\`bash
# Configurer les protections via gh CLI
gh api repos/{owner}/{repo}/branches/main/protection \\
  --method PUT \\
  --field required_pull_request_reviews='{"required_approving_review_count":2}' \\
  --field enforce_admins=true \\
  --field required_signatures=true
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Les commits signés GPG ou SSH vérifient l\'identité de l\'auteur et l\'intégrité du code',
      'git config commit.gpgsign true active la signature automatique de tous les commits',
      'Les Branch Protection Rules exigent reviews, CI verte et signatures pour merger',
      'CODEOWNERS assigne automatiquement les reviewers selon les fichiers modifiés',
      'Les hooks pre-commit détectent les secrets avant qu\'ils n\'entrent dans l\'historique',
      'gitleaks et trufflehog scannent l\'historique complet pour les secrets exposés',
      'SSH signing (Git 2.34+) est une alternative plus simple à GPG',
      'La vérification des signatures en CI garantit la chaîne de confiance du code'
    ]),
  },

  // ============================================================
  // GIT AVANCÉ - Module 10: Projet final Git
  // ============================================================
  {
    id: 'git-10',
    courseId: 'git-avance',
    title: 'Projet final Git',
    duration: '4h',
    orderIndex: 10,
    theoryContent: `# Projet final Git : Mise en place d'un workflow complet

## Objectif

Mettre en place un dépôt Git complet avec : stratégie de branching, hooks automatisés, intégration CI, automatisation des releases et génération de changelog.

## 1. Stratégie de branching (GitFlow simplifié)

\`\`\`
main ────●────────●────────●──── (releases tagguées)
          \\      /          \\
develop ───●──●──●────●──●───●── (intégration continue)
             \\  /      \\  /
feature/xxx ──●──       ──●──    (fonctionnalités)
\`\`\`

\`\`\`bash
# Initialisation du workflow
git init my-project && cd my-project
git checkout -b develop

# Convention de nommage des branches
# feature/JIRA-123-description
# bugfix/JIRA-456-description
# hotfix/JIRA-789-description
# release/v1.2.0

# Créer une feature
git checkout -b feature/PROJ-42-user-auth develop
# ... développement ...
git checkout develop
git merge --no-ff feature/PROJ-42-user-auth
git branch -d feature/PROJ-42-user-auth

# Créer une release
git checkout -b release/v1.0.0 develop
# ... derniers ajustements ...
git checkout main
git merge --no-ff release/v1.0.0
git tag -a v1.0.0 -m "Release 1.0.0"
git checkout develop
git merge --no-ff release/v1.0.0
\`\`\`

## 2. Conventional Commits

\`\`\`bash
# Format: type(scope): description
# Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore

# Exemples
git commit -m "feat(auth): add JWT token refresh mechanism"
git commit -m "fix(api): handle null response in user endpoint"
git commit -m "docs(readme): update installation instructions"
git commit -m "perf(db): add index on users.email column"
git commit -m "ci(pipeline): add SonarQube analysis step"

# Breaking change
git commit -m "feat(api)!: change response format for /users endpoint

BREAKING CHANGE: The response now returns an object with a 'data' wrapper instead of a direct array."
\`\`\`

## 3. Hooks Git avec Husky

\`\`\`bash
# Installation
npm install --save-dev husky lint-staged commitlint @commitlint/config-conventional

# Initialiser Husky
npx husky init

# Hook pre-commit (lint-staged)
echo "npx lint-staged" > .husky/pre-commit

# Hook commit-msg (validation du message)
echo "npx commitlint --edit \\\$1" > .husky/commit-msg

# Configuration lint-staged (package.json)
# "lint-staged": {
#   "*.{js,ts}": ["eslint --fix", "prettier --write"],
#   "*.{json,md,yml}": ["prettier --write"]
# }

# Configuration commitlint
# commitlint.config.js
# module.exports = {
#   extends: ['@commitlint/config-conventional'],
#   rules: {
#     'scope-enum': [2, 'always', ['api', 'auth', 'db', 'ui', 'ci', 'docs']],
#     'subject-max-length': [2, 'always', 72]
#   }
# };
\`\`\`

## 4. Génération automatique du Changelog

\`\`\`bash
# Avec standard-version ou release-please
npm install --save-dev standard-version

# Générer le changelog et bumper la version
npx standard-version                    # Auto-detect (patch/minor/major)
npx standard-version --release-as minor # Forcer minor
npx standard-version --first-release    # Première release

# Le CHANGELOG.md est généré automatiquement :
# ## [1.2.0] - 2024-01-15
# ### Features
# * **auth**: add JWT refresh mechanism (PROJ-42)
# * **api**: implement pagination on /users endpoint
# ### Bug Fixes
# * **db**: fix connection pool exhaustion under load
# ### Performance
# * **api**: add Redis caching for user profiles
\`\`\`

## 5. Automatisation des releases avec GitHub Actions

\`\`\`yaml
# .github/workflows/release.yml
name: Release
on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Generate changelog and tag
        run: |
          git config user.name "github-actions"
          git config user.email "actions@github.com"
          npx standard-version
          git push --follow-tags origin main

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          tag_name: v\\\${{ steps.version.outputs.version }}
          body_path: CHANGELOG.md
          generate_release_notes: true
\`\`\`

## 6. Git Worktrees pour le travail parallèle

\`\`\`bash
# Travailler sur plusieurs branches simultanément
git worktree add ../hotfix-branch hotfix/critical-fix
git worktree add ../feature-branch feature/new-ui
git worktree list
git worktree remove ../hotfix-branch
\`\`\`

## 7. Configuration .gitattributes

\`\`\`bash
# .gitattributes
# Normalisation des fins de ligne
* text=auto eol=lf
*.bat text eol=crlf
*.ps1 text eol=crlf

# Fichiers binaires
*.png binary
*.jpg binary
*.pdf binary
*.zip binary

# Git LFS
*.psd filter=lfs diff=lfs merge=lfs -text
*.sketch filter=lfs diff=lfs merge=lfs -text

# Merge strategies
package-lock.json merge=ours
yarn.lock merge=ours

# Diff pour certains formats
*.md diff=markdown
*.rb diff=ruby
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Projet final Git

### Étape 1 : Initialiser le projet avec les conventions

\`\`\`bash
mkdir git-project && cd git-project
git init
npm init -y
npm install --save-dev husky lint-staged @commitlint/cli @commitlint/config-conventional standard-version

npx husky init
echo "npx lint-staged" > .husky/pre-commit
echo "npx commitlint --edit \\\$1" > .husky/commit-msg
\`\`\`

### Étape 2 : Configurer le branching model

\`\`\`bash
git checkout -b develop
git checkout -b feature/initial-setup

# Créer la structure du projet
echo "# Mon Projet" > README.md
git add -A
git commit -m "feat: initial project setup"
\`\`\`

### Étape 3 : Mettre en place CODEOWNERS et protection

\`\`\`bash
cat > CODEOWNERS << 'EOF'
* @team-lead
/src/ @dev-team
/infra/ @devops-team
EOF
git add CODEOWNERS
git commit -m "ci: add CODEOWNERS for automatic review assignment"
\`\`\`

### Étape 4 : Générer le premier changelog

\`\`\`bash
git checkout develop
git merge --no-ff feature/initial-setup
git checkout main
git merge --no-ff develop
npx standard-version --first-release
git push --follow-tags
\`\`\`

### Étape 5 : Simuler un cycle de release complet

\`\`\`bash
# Feature development
git checkout -b feature/user-api develop
git commit --allow-empty -m "feat(api): add user CRUD endpoints"
git commit --allow-empty -m "test(api): add unit tests for user service"
git checkout develop && git merge --no-ff feature/user-api

# Release
git checkout -b release/v1.1.0 develop
git checkout main && git merge --no-ff release/v1.1.0
npx standard-version
cat CHANGELOG.md
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Le GitFlow simplifié structure le travail avec main, develop et feature branches',
      'Conventional Commits (feat/fix/docs...) permettent la génération automatique du changelog',
      'Husky + lint-staged + commitlint automatisent la validation à chaque commit',
      'standard-version ou release-please gèrent le versioning sémantique automatiquement',
      'CODEOWNERS et branch protection assurent la qualité des code reviews',
      '.gitattributes normalise les fins de ligne et configure Git LFS',
      'Les worktrees permettent de travailler sur plusieurs branches en parallèle',
      'L\'automatisation CI/CD crée les releases et tags automatiquement sur main'
    ]),
  },



  // ============================================================
  // JENKINS - Module 9: Jenkins Pipelines avancés
  // ============================================================
  {
    id: 'jen-09',
    courseId: 'jenkins',
    title: 'Jenkins Pipelines avancés',
    duration: '4h',
    orderIndex: 9,
    theoryContent: `# Jenkins Pipelines avancés

## 1. Parallel Stages

Les stages parallèles accélèrent considérablement l'exécution du pipeline en lançant simultanément des tâches indépendantes.

\`\`\`groovy
pipeline {
    agent any
    stages {
        stage('Tests en parallèle') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'npm run test:unit'
                    }
                }
                stage('Integration Tests') {
                    steps {
                        sh 'npm run test:integration'
                    }
                }
                stage('E2E Tests') {
                    agent { label 'selenium' }
                    steps {
                        sh 'npm run test:e2e'
                    }
                }
                stage('Security Scan') {
                    steps {
                        sh 'npm audit --audit-level=high'
                    }
                }
            }
        }
    }
}
\`\`\`

## 2. Matrix Builds

\`\`\`groovy
pipeline {
    agent none
    stages {
        stage('Build Matrix') {
            matrix {
                axes {
                    axis {
                        name 'PLATFORM'
                        values 'linux', 'macos', 'windows'
                    }
                    axis {
                        name 'NODE_VERSION'
                        values '18', '20', '22'
                    }
                }
                excludes {
                    exclude {
                        axis { name 'PLATFORM'; values 'macos' }
                        axis { name 'NODE_VERSION'; values '18' }
                    }
                }
                stages {
                    stage('Build') {
                        agent { label "\\\${PLATFORM}" }
                        steps {
                            sh "nvm use \\\${NODE_VERSION} && npm ci && npm test"
                        }
                    }
                }
            }
        }
    }
}
\`\`\`

## 3. Input et Milestones

\`\`\`groovy
pipeline {
    agent any
    stages {
        stage('Deploy Staging') {
            steps {
                sh 'kubectl apply -f k8s/staging/'
            }
        }
        stage('Approval') {
            steps {
                timeout(time: 24, unit: 'HOURS') {
                    input message: 'Déployer en production ?',
                          ok: 'Oui, déployer',
                          submitter: 'admin,release-managers',
                          parameters: [
                              choice(name: 'STRATEGY', choices: ['rolling', 'blue-green', 'canary'],
                                     description: 'Stratégie de déploiement'),
                              string(name: 'REASON', defaultValue: '',
                                     description: 'Raison du déploiement')
                          ]
                }
            }
        }
        stage('Deploy Production') {
            steps {
                milestone(ordinal: 1, label: 'Production Deploy')
                sh "kubectl apply -f k8s/production/"
            }
        }
    }
}
\`\`\`

## 4. Shared Libraries avancées

\`\`\`groovy
// vars/deployPipeline.groovy - Pipeline réutilisable complet
def call(Map config) {
    pipeline {
        agent { kubernetes { yaml config.podTemplate ?: defaultPodTemplate() } }
        
        environment {
            APP_NAME = config.appName
            REGISTRY = config.registry ?: 'registry.company.com'
        }

        stages {
            stage('Checkout') {
                steps { checkout scm }
            }
            stage('Build') {
                steps {
                    container('builder') {
                        sh config.buildCommand ?: 'npm ci && npm run build'
                    }
                }
            }
            stage('Test') {
                parallel {
                    stage('Unit') {
                        steps { sh config.testCommand ?: 'npm test' }
                    }
                    stage('Lint') {
                        steps { sh config.lintCommand ?: 'npm run lint' }
                    }
                }
            }
            stage('Docker Build & Push') {
                steps {
                    container('docker') {
                        sh """
                            docker build -t \\\${REGISTRY}/\\\${APP_NAME}:\\\${BUILD_NUMBER} .
                            docker push \\\${REGISTRY}/\\\${APP_NAME}:\\\${BUILD_NUMBER}
                        """
                    }
                }
            }
            stage('Deploy') {
                when { branch 'main' }
                steps {
                    container('kubectl') {
                        sh "kubectl set image deployment/\\\${APP_NAME} app=\\\${REGISTRY}/\\\${APP_NAME}:\\\${BUILD_NUMBER}"
                    }
                }
            }
        }
        post {
            failure {
                slackSend(channel: config.slackChannel ?: '#ci-alerts',
                         color: 'danger',
                         message: "FAILED: \\\${APP_NAME} #\\\${BUILD_NUMBER}")
            }
            success {
                slackSend(channel: config.slackChannel ?: '#ci-alerts',
                         color: 'good',
                         message: "SUCCESS: \\\${APP_NAME} #\\\${BUILD_NUMBER}")
            }
        }
    }
}
\`\`\`

## 5. Error Handling Patterns

\`\`\`groovy
pipeline {
    agent any
    stages {
        stage('Deploy') {
            steps {
                script {
                    try {
                        sh 'kubectl apply -f k8s/'
                        sh 'kubectl rollout status deployment/app --timeout=120s'
                    } catch (Exception e) {
                        echo "Déploiement échoué: \\\${e.message}"
                        sh 'kubectl rollout undo deployment/app'
                        error("Rollback effectué - déploiement annulé")
                    }
                }
            }
        }
    }
    post {
        always {
            junit '**/test-results/*.xml'
            archiveArtifacts artifacts: '**/build/**', allowEmptyArchive: true
        }
        failure {
            script {
                def cause = currentBuild.getBuildCauses('hudson.model.Cause\\\$UserIdCause')
                def user = cause ? cause[0].userId : 'automated'
                slackSend(message: "Build #\\\${BUILD_NUMBER} FAILED (triggered by \\\${user})")
            }
        }
        unstable {
            echo "Build instable - tests flaky détectés"
        }
        fixed {
            slackSend(color: 'good', message: "Build #\\\${BUILD_NUMBER} is back to normal!")
        }
    }
}
\`\`\`

## 6. Credentials et secrets

\`\`\`groovy
pipeline {
    agent any
    environment {
        DOCKER_CREDS = credentials('docker-registry-creds')
        AWS_CREDS = credentials('aws-credentials')
        SONAR_TOKEN = credentials('sonarqube-token')
    }
    stages {
        stage('Build') {
            steps {
                withCredentials([
                    usernamePassword(credentialsId: 'docker-registry-creds',
                                   usernameVariable: 'DOCKER_USER',
                                   passwordVariable: 'DOCKER_PASS'),
                    file(credentialsId: 'kubeconfig',
                         variable: 'KUBECONFIG')
                ]) {
                    sh "docker login -u \\\${DOCKER_USER} -p \\\${DOCKER_PASS} registry.com"
                    sh "kubectl --kubeconfig=\\\${KUBECONFIG} get pods"
                }
            }
        }
    }
}
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Jenkins Pipelines avancés

### Exercice 1 : Créer un pipeline parallèle

\`\`\`groovy
// Jenkinsfile avec tests parallèles
pipeline {
    agent any
    stages {
        stage('Parallel Tests') {
            parallel {
                stage('Unit') { steps { sh 'npm test:unit' } }
                stage('Lint') { steps { sh 'npm run lint' } }
                stage('Security') { steps { sh 'npm audit' } }
            }
        }
    }
}
\`\`\`

### Exercice 2 : Matrix build multi-version

\`\`\`groovy
// Tester sur plusieurs versions de Node.js
pipeline {
    agent none
    stages {
        stage('Matrix') {
            matrix {
                axes {
                    axis { name 'NODE'; values '18', '20', '22' }
                }
                stages {
                    stage('Test') {
                        agent { docker { image "node:\\\${NODE}-alpine" } }
                        steps { sh 'npm ci && npm test' }
                    }
                }
            }
        }
    }
}
\`\`\`

### Exercice 3 : Pipeline avec approbation manuelle

\`\`\`groovy
stage('Approve Production') {
    steps {
        timeout(time: 1, unit: 'HOURS') {
            input message: 'Deploy to production?', submitter: 'admin'
        }
    }
}
\`\`\`

### Exercice 4 : Shared Library

\`\`\`groovy
// Créer une shared library avec un pipeline template
// vars/standardPipeline.groovy
// Utiliser dans Jenkinsfile: standardPipeline(appName: 'my-app')
\`\`\`

### Exercice 5 : Gestion des erreurs avec rollback

\`\`\`groovy
stage('Deploy') {
    steps {
        script {
            try {
                sh 'kubectl apply -f k8s/'
            } catch (e) {
                sh 'kubectl rollout undo deployment/app'
                error("Rollback effectué")
            }
        }
    }
}
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Les stages parallèles exécutent simultanément les tests unitaires, intégration et E2E',
      'Matrix builds testent automatiquement toutes les combinaisons plateforme/version',
      'Le step input avec timeout permet l\'approbation manuelle avant la production',
      'Les Shared Libraries encapsulent des pipelines complets réutilisables entre projets',
      'try/catch dans script{} permet le rollback automatique en cas d\'échec',
      'Les milestones empêchent les builds concurrents de se dépasser',
      'withCredentials accède aux secrets sans les exposer dans les logs',
      'Le bloc post gère always/success/failure/fixed/unstable pour les notifications'
    ]),
  },

  // ============================================================
  // JENKINS - Module 10: Projet final Jenkins
  // ============================================================
  {
    id: 'jen-10',
    courseId: 'jenkins',
    title: 'Projet final Jenkins',
    duration: '5h',
    orderIndex: 10,
    theoryContent: `# Projet final Jenkins : Pipeline CI/CD complet

## Objectif

Construire un pipeline Jenkins complet multi-branch : build Docker, tests, analyse de code, déploiement sur Kubernetes avec notifications et rollback.

## 1. Jenkinsfile complet

\`\`\`groovy
@Library('shared-lib') _

pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: node
    image: node:20-alpine
    command: ['sleep', 'infinity']
  - name: docker
    image: docker:24-dind
    securityContext:
      privileged: true
  - name: kubectl
    image: bitnami/kubectl:latest
    command: ['sleep', 'infinity']
"""
        }
    }

    environment {
        REGISTRY = 'registry.company.com'
        APP_NAME = 'my-application'
        IMAGE_TAG = "\\\${REGISTRY}/\\\${APP_NAME}:\\\${BUILD_NUMBER}"
        SONAR_URL = 'http://sonarqube:9000'
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    env.GIT_COMMIT_MSG = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                    env.GIT_AUTHOR = sh(script: 'git log -1 --pretty=%an', returnStdout: true).trim()
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                container('node') {
                    sh 'npm ci'
                }
            }
        }

        stage('Quality Checks') {
            parallel {
                stage('Lint') {
                    steps {
                        container('node') {
                            sh 'npm run lint'
                        }
                    }
                }
                stage('Unit Tests') {
                    steps {
                        container('node') {
                            sh 'npm run test:unit -- --coverage'
                        }
                    }
                    post {
                        always {
                            junit 'test-results/junit.xml'
                            publishHTML(target: [
                                reportName: 'Coverage Report',
                                reportDir: 'coverage/lcov-report',
                                reportFiles: 'index.html'
                            ])
                        }
                    }
                }
                stage('Security Audit') {
                    steps {
                        container('node') {
                            sh 'npm audit --audit-level=high || true'
                        }
                    }
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                container('node') {
                    withSonarQubeEnv('SonarQube') {
                        sh """
                            npx sonar-scanner \\
                                -Dsonar.projectKey=\\\${APP_NAME} \\
                                -Dsonar.sources=src \\
                                -Dsonar.tests=tests \\
                                -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
                        """
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Docker Build & Push') {
            when { branch 'main' }
            steps {
                container('docker') {
                    sh """
                        docker build -t \\\${IMAGE_TAG} -t \\\${REGISTRY}/\\\${APP_NAME}:latest .
                        docker push \\\${IMAGE_TAG}
                        docker push \\\${REGISTRY}/\\\${APP_NAME}:latest
                    """
                }
            }
        }

        stage('Deploy to Staging') {
            when { branch 'main' }
            steps {
                container('kubectl') {
                    sh """
                        kubectl set image deployment/\\\${APP_NAME} \\
                            app=\\\${IMAGE_TAG} -n staging
                        kubectl rollout status deployment/\\\${APP_NAME} \\
                            -n staging --timeout=120s
                    """
                }
            }
        }

        stage('Integration Tests') {
            when { branch 'main' }
            steps {
                container('node') {
                    sh 'npm run test:e2e -- --base-url=https://staging.company.com'
                }
            }
        }

        stage('Deploy to Production') {
            when { branch 'main' }
            steps {
                timeout(time: 24, unit: 'HOURS') {
                    input message: 'Déployer en production ?',
                          submitter: 'release-managers'
                }
                container('kubectl') {
                    sh """
                        kubectl set image deployment/\\\${APP_NAME} \\
                            app=\\\${IMAGE_TAG} -n production
                        kubectl rollout status deployment/\\\${APP_NAME} \\
                            -n production --timeout=180s
                    """
                }
            }
        }
    }

    post {
        success {
            slackSend(channel: '#deployments', color: 'good',
                message: "✅ \\\${APP_NAME} #\\\${BUILD_NUMBER} deployed by \\\${GIT_AUTHOR}")
        }
        failure {
            slackSend(channel: '#deployments', color: 'danger',
                message: "❌ \\\${APP_NAME} #\\\${BUILD_NUMBER} FAILED")
            container('kubectl') {
                sh "kubectl rollout undo deployment/\\\${APP_NAME} -n staging || true"
            }
        }
        always {
            cleanWs()
        }
    }
}
\`\`\`

## 2. Configuration Multi-branch

\`\`\`groovy
// Multibranch Pipeline Configuration
// - Source: GitHub/GitLab
// - Behaviors: Discover branches, Discover PRs
// - Build Configuration: Jenkinsfile in repo
// - Scan interval: 1 minute (or webhook)
\`\`\`

## 3. Rollback automatique

\`\`\`groovy
stage('Canary Deploy') {
    steps {
        script {
            sh "kubectl set image deployment/\\\${APP_NAME}-canary app=\\\${IMAGE_TAG} -n production"
            sleep(time: 5, unit: 'MINUTES')
            
            def errorRate = sh(script: """
                curl -s "http://prometheus:9090/api/v1/query?query=rate(http_errors_total[5m])" | jq '.data.result[0].value[1]'
            """, returnStdout: true).trim().toFloat()
            
            if (errorRate > 0.05) {
                sh "kubectl rollout undo deployment/\\\${APP_NAME}-canary -n production"
                error("Canary failed: error rate \\\${errorRate} > 5%")
            }
        }
    }
}
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Projet final Jenkins

### Étape 1 : Créer le Jenkinsfile multi-stage

\`\`\`groovy
pipeline {
    agent any
    stages {
        stage('Build') { steps { sh 'npm ci' } }
        stage('Test') { steps { sh 'npm test' } }
        stage('Docker') {
            steps { sh 'docker build -t app:\\\${BUILD_NUMBER} .' }
        }
    }
}
\`\`\`

### Étape 2 : Ajouter les tests parallèles

\`\`\`groovy
stage('Quality') {
    parallel {
        stage('Lint') { steps { sh 'npm run lint' } }
        stage('Unit') { steps { sh 'npm run test:unit' } }
        stage('Security') { steps { sh 'npm audit' } }
    }
}
\`\`\`

### Étape 3 : Intégrer SonarQube

\`\`\`groovy
stage('SonarQube') {
    steps {
        withSonarQubeEnv('SonarQube') {
            sh 'npx sonar-scanner'
        }
    }
}
stage('Quality Gate') {
    steps { waitForQualityGate abortPipeline: true }
}
\`\`\`

### Étape 4 : Déployer sur Kubernetes

\`\`\`groovy
stage('Deploy') {
    when { branch 'main' }
    steps {
        sh "kubectl set image deployment/app app=registry/app:\\\${BUILD_NUMBER}"
        sh "kubectl rollout status deployment/app --timeout=120s"
    }
}
\`\`\`

### Étape 5 : Notifications et rollback

\`\`\`groovy
post {
    failure {
        sh 'kubectl rollout undo deployment/app || true'
        slackSend(color: 'danger', message: "Build FAILED")
    }
    success {
        slackSend(color: 'good', message: "Deployed successfully")
    }
}
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Un pipeline complet couvre checkout, build, test, analyse, déploiement et notifications',
      'Les agents Kubernetes Pod Templates fournissent les containers nécessaires à chaque étape',
      'waitForQualityGate bloque le pipeline si la qualité du code est insuffisante',
      'Le déploiement production utilise input pour une approbation manuelle par les release managers',
      'Le bloc post failure effectue automatiquement un rollback en cas d\'échec',
      'Multi-branch Pipeline découvre automatiquement les branches et Pull Requests',
      'Le canary deployment vérifie le taux d\'erreur avant de scaler à 100%',
      'Les Shared Libraries permettent de standardiser les pipelines entre tous les projets'
    ]),
  },



  // ============================================================
  // ARTIFACTORY - Module 9: Artifactory pour DevSecOps
  // ============================================================
  {
    id: 'art-09',
    courseId: 'artifactory',
    title: 'Artifactory pour DevSecOps',
    duration: '3h30',
    orderIndex: 9,
    theoryContent: `# Artifactory pour DevSecOps

## 1. Introduction

La sécurité de la chaîne d'approvisionnement logicielle (Software Supply Chain Security) est devenue critique. Artifactory, couplé à JFrog Xray, offre des fonctionnalités avancées pour la conformité des licences, le scan de vulnérabilités, le contrôle d'accès granulaire et l'application de politiques de sécurité.

## 2. Scan de vulnérabilités avec Xray

\`\`\`bash
# Configuration Xray via API
curl -u admin:password -X POST "http://localhost:8082/xray/api/v2/policies" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "security-critical",
    "type": "security",
    "rules": [{
      "name": "block-critical-vulns",
      "criteria": {
        "min_severity": "High"
      },
      "actions": {
        "block_download": {
          "active": true,
          "unscanned": true
        },
        "fail_build": true,
        "notify_deployer": true
      }
    }]
  }'

# Créer un Watch (surveillance)
curl -u admin:password -X POST "http://localhost:8082/xray/api/v2/watches" \\
  -H "Content-Type: application/json" \\
  -d '{
    "general_data": {
      "name": "production-watch",
      "active": true
    },
    "project_resources": {
      "resources": [{
        "type": "repository",
        "name": "docker-prod-local"
      }]
    },
    "assigned_policies": [{
      "name": "security-critical",
      "type": "security"
    }]
  }'

# Scanner un build
jf rt build-scan my-app 42
\`\`\`

## 3. Conformité des licences

\`\`\`bash
# Politique de licence
curl -u admin:password -X POST "http://localhost:8082/xray/api/v2/policies" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "license-compliance",
    "type": "license",
    "rules": [{
      "name": "block-copyleft",
      "criteria": {
        "banned_licenses": ["GPL-2.0", "GPL-3.0", "AGPL-3.0"],
        "allow_unknown": false
      },
      "actions": {
        "block_download": { "active": true },
        "notify_deployer": true
      }
    }]
  }'

# Vérifier les licences d'un artefact
curl -u admin:password "http://localhost:8082/xray/api/v1/component/details" \\
  -H "Content-Type: application/json" \\
  -d '{"component_details": [{"component_id": "npm://express:4.18.2"}]}'
\`\`\`

## 4. Access Tokens et RBAC

\`\`\`bash
# Créer un groupe avec permissions restreintes
curl -u admin:password -X PUT "http://localhost:8082/artifactory/api/security/groups/ci-readers" \\
  -H "Content-Type: application/json" \\
  -d '{"name":"ci-readers","description":"Read-only CI access"}'

# Créer une permission target
curl -u admin:password -X PUT "http://localhost:8082/artifactory/api/v2/security/permissions/ci-deploy" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "ci-deploy",
    "repo": {
      "include-patterns": ["**"],
      "exclude-patterns": [],
      "repositories": ["libs-release-local", "docker-local"],
      "actions": {
        "groups": {
          "ci-deployers": ["read", "deploy", "annotate"]
        }
      }
    }
  }'

# Créer un token scopé avec expiration
curl -u admin:password -X POST "http://localhost:8082/access/api/v1/tokens" \\
  -H "Content-Type: application/json" \\
  -d '{
    "username": "ci-service",
    "scope": "member-of-groups:ci-deployers",
    "expires_in": 86400,
    "refreshable": true,
    "description": "CI/CD pipeline token - daily rotation"
  }'
\`\`\`

## 5. Policies Enforcement

\`\`\`bash
# Bloquer les images Docker sans tag spécifique
# (interdire :latest en production)
curl -u admin:password -X PUT "http://localhost:8082/artifactory/api/repositories/docker-prod-local" \\
  -H "Content-Type: application/json" \\
  -d '{
    "key": "docker-prod-local",
    "rclass": "local",
    "packageType": "docker",
    "dockerApiVersion": "V2",
    "blockPushingSchema1": true,
    "dockerTagRetention": 10
  }'

# Webhook pour audit trail
curl -u admin:password -X POST "http://localhost:8082/artifactory/api/system/webhooks" \\
  -H "Content-Type: application/json" \\
  -d '{
    "key": "security-audit",
    "url": "http://siem:8080/api/events",
    "events": ["storage.afterCreate", "storage.afterDelete", "security.userLocked"],
    "enabled": true
  }'
\`\`\`

## 6. Signature et provenance des artefacts

\`\`\`bash
# Signer un artefact avec cosign (pour Docker)
cosign sign --key cosign.key registry.company.com/app:1.0.0

# Vérifier la signature
cosign verify --key cosign.pub registry.company.com/app:1.0.0

# Ajouter des métadonnées SBOM (Software Bill of Materials)
syft registry.company.com/app:1.0.0 -o spdx-json > sbom.json
curl -u admin:password -T sbom.json \\
  "http://localhost:8082/artifactory/sbom-local/app/1.0.0/sbom.json;build.name=app;build.number=1"
\`\`\`

## 7. Audit et reporting

\`\`\`bash
# Rapport de vulnérabilités
curl -u admin:password "http://localhost:8082/xray/api/v1/reports/vulnerabilities" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "weekly-vuln-report",
    "resources": {
      "repositories": [{"name": "docker-prod-local"}]
    },
    "filters": {
      "severities": ["High", "Critical"],
      "has_remediation": true
    }
  }'

# Historique des accès
curl -u admin:password "http://localhost:8082/artifactory/api/v1/system/audit" \\
  -G -d "start_date=2024-01-01" -d "end_date=2024-01-31"
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Artifactory DevSecOps

### Exercice 1 : Configurer une politique de sécurité

\`\`\`bash
# Créer une politique qui bloque les vulnérabilités critiques
curl -u admin:password -X POST "http://localhost:8082/xray/api/v2/policies" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "block-critical",
    "type": "security",
    "rules": [{"name": "critical-rule", "criteria": {"min_severity": "Critical"}, "actions": {"block_download": {"active": true}}}]
  }'
\`\`\`

### Exercice 2 : Implémenter le RBAC

\`\`\`bash
# Créer des groupes et permissions pour CI/CD
curl -u admin:password -X PUT "http://localhost:8082/artifactory/api/security/groups/dev-team" \\
  -H "Content-Type: application/json" \\
  -d '{"name":"dev-team"}'

# Assigner des permissions read/deploy sur les repos
curl -u admin:password -X PUT "http://localhost:8082/artifactory/api/v2/security/permissions/dev-perms" \\
  -H "Content-Type: application/json" \\
  -d '{"name":"dev-perms","repo":{"repositories":["libs-release-local"],"actions":{"groups":{"dev-team":["read","deploy"]}}}}'
\`\`\`

### Exercice 3 : Politique de conformité des licences

\`\`\`bash
# Bloquer les licences GPL dans les repos de production
# Vérifier la licence d'un package npm
curl -u admin:password "http://localhost:8082/xray/api/v1/component/details" \\
  -d '{"component_details":[{"component_id":"npm://lodash:4.17.21"}]}'
\`\`\`

### Exercice 4 : Générer un SBOM

\`\`\`bash
# Installer syft et générer un SBOM
curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh | sh
syft dir:./my-app -o spdx-json > sbom.json
# Upload le SBOM dans Artifactory
\`\`\`

### Exercice 5 : Audit trail

\`\`\`bash
# Configurer un webhook pour le SIEM
# Vérifier les accès récents aux repos production
curl -u admin:password "http://localhost:8082/artifactory/api/v1/system/audit"
\`\`\`
`,
    keyPoints: JSON.stringify([
      'JFrog Xray scanne automatiquement les artefacts pour les vulnérabilités et licences',
      'Les Policies bloquent le téléchargement d\'artefacts avec des vulnérabilités critiques',
      'Le RBAC granulaire contrôle l\'accès par groupe, repo et type d\'opération',
      'Les tokens scopés avec expiration remplacent les mots de passe pour le CI/CD',
      'Les licences copyleft (GPL, AGPL) peuvent être automatiquement bloquées en production',
      'cosign signe les images Docker pour garantir leur provenance',
      'Le SBOM (Software Bill of Materials) documente toutes les dépendances d\'un artefact',
      'Les webhooks d\'audit envoient les événements de sécurité vers un SIEM'
    ]),
  },

  // ============================================================
  // ARTIFACTORY - Module 10: Projet final Artifactory
  // ============================================================
  {
    id: 'art-10',
    courseId: 'artifactory',
    title: 'Projet final Artifactory',
    duration: '5h',
    orderIndex: 10,
    theoryContent: `# Projet final Artifactory : Configuration entreprise complète

## Objectif

Mettre en place un Artifactory d'entreprise avec : dépôts locaux, distants et virtuels pour Maven, npm et Docker, intégration CI/CD avec Build Info, pipeline de promotion, politiques de rétention et nettoyage automatisé.

## 1. Topologie des dépôts

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                VIRTUAL REPOSITORIES                       │
│                                                          │
│  maven-virtual ──┬── libs-release-local                  │
│                  ├── libs-snapshot-local                  │
│                  └── maven-central-remote                 │
│                                                          │
│  npm-virtual ────┬── npm-local                           │
│                  └── npm-remote (registry.npmjs.org)      │
│                                                          │
│  docker-virtual ─┬── docker-dev-local                    │
│                  ├── docker-staging-local                 │
│                  ├── docker-prod-local                    │
│                  └── docker-hub-remote                    │
└─────────────────────────────────────────────────────────┘

Pipeline de promotion Docker :
docker-dev-local → docker-staging-local → docker-prod-local
\`\`\`

## 2. Script de création des dépôts

\`\`\`bash
#!/bin/bash
# setup-repos.sh - Configuration complète des dépôts
ARTIF="http://localhost:8082/artifactory"
AUTH="-u admin:password"

echo "=== Création des dépôts Maven ==="
curl $AUTH -X PUT "$ARTIF/api/repositories/libs-release-local" \\
  -H "Content-Type: application/json" \\
  -d '{"key":"libs-release-local","rclass":"local","packageType":"maven","handleReleases":true,"handleSnapshots":false}'

curl $AUTH -X PUT "$ARTIF/api/repositories/libs-snapshot-local" \\
  -H "Content-Type: application/json" \\
  -d '{"key":"libs-snapshot-local","rclass":"local","packageType":"maven","handleReleases":false,"handleSnapshots":true,"maxUniqueSnapshots":5}'

curl $AUTH -X PUT "$ARTIF/api/repositories/maven-central-remote" \\
  -H "Content-Type: application/json" \\
  -d '{"key":"maven-central-remote","rclass":"remote","packageType":"maven","url":"https://repo1.maven.org/maven2","retrievalCachePeriodSecs":7200}'

curl $AUTH -X PUT "$ARTIF/api/repositories/maven-virtual" \\
  -H "Content-Type: application/json" \\
  -d '{"key":"maven-virtual","rclass":"virtual","packageType":"maven","repositories":["libs-release-local","libs-snapshot-local","maven-central-remote"],"defaultDeploymentRepo":"libs-release-local"}'

echo "=== Création des dépôts Docker ==="
for env in dev staging prod; do
  curl $AUTH -X PUT "$ARTIF/api/repositories/docker-\\\${env}-local" \\
    -H "Content-Type: application/json" \\
    -d "{\"key\":\"docker-\\\${env}-local\",\"rclass\":\"local\",\"packageType\":\"docker\",\"dockerApiVersion\":\"V2\"}"
done

curl $AUTH -X PUT "$ARTIF/api/repositories/docker-hub-remote" \\
  -H "Content-Type: application/json" \\
  -d '{"key":"docker-hub-remote","rclass":"remote","packageType":"docker","url":"https://registry-1.docker.io","externalDependenciesEnabled":true}'

echo "=== Création des dépôts npm ==="
curl $AUTH -X PUT "$ARTIF/api/repositories/npm-local" \\
  -H "Content-Type: application/json" \\
  -d '{"key":"npm-local","rclass":"local","packageType":"npm"}'

curl $AUTH -X PUT "$ARTIF/api/repositories/npm-remote" \\
  -H "Content-Type: application/json" \\
  -d '{"key":"npm-remote","rclass":"remote","packageType":"npm","url":"https://registry.npmjs.org"}'

curl $AUTH -X PUT "$ARTIF/api/repositories/npm-virtual" \\
  -H "Content-Type: application/json" \\
  -d '{"key":"npm-virtual","rclass":"virtual","packageType":"npm","repositories":["npm-local","npm-remote"],"defaultDeploymentRepo":"npm-local"}'

echo "✅ Tous les dépôts créés"
\`\`\`

## 3. Pipeline de promotion

\`\`\`bash
#!/bin/bash
# promote.sh - Promotion d'un artefact entre environnements
APP_NAME=\\\$1
VERSION=\\\$2
FROM_ENV=\\\$3
TO_ENV=\\\$4

echo "Promotion de \\\${APP_NAME}:\\\${VERSION} de \\\${FROM_ENV} vers \\\${TO_ENV}"

# Copier l'image Docker
curl $AUTH -X POST \\
  "$ARTIF/api/docker/docker-\\\${FROM_ENV}-local/v2/promote" \\
  -H "Content-Type: application/json" \\
  -d "{
    \"targetRepo\": \"docker-\\\${TO_ENV}-local\",
    \"dockerRepository\": \"\\\${APP_NAME}\",
    \"tag\": \"\\\${VERSION}\",
    \"copy\": true
  }"

# Mettre à jour les propriétés
curl $AUTH -X PUT \\
  "$ARTIF/api/storage/docker-\\\${TO_ENV}-local/\\\${APP_NAME}/\\\${VERSION}?properties=promoted.from=\\\${FROM_ENV};promoted.date=$(date -I);promoted.by=\\\${USER}"

echo "✅ Promotion réussie"
\`\`\`

## 4. Politique de rétention et cleanup

\`\`\`bash
#!/bin/bash
# cleanup.sh - Nettoyage automatique des anciens artefacts
echo "=== Cleanup des snapshots > 30 jours ==="
curl $AUTH -X POST "$ARTIF/api/search/aql" \\
  -H "Content-Type: text/plain" \\
  -d 'items.find({
    "repo":"libs-snapshot-local",
    "modified":{"$before":"30d"},
    "type":"file"
  }).include("name","repo","path","size")' | \\
  python3 -c "
import json, sys
data = json.load(sys.stdin)
total = 0
for item in data.get('results', []):
    path = f\\\"{item['repo']}/{item['path']}/{item['name']}\\\"
    total += item.get('size', 0)
print(f'Fichiers à supprimer: {len(data.get(\"results\", []))}')
print(f'Espace à libérer: {total/1024/1024:.1f} Mo')
"

echo "=== Cleanup des images Docker non taguées ==="
curl $AUTH -X POST "$ARTIF/api/search/aql" \\
  -H "Content-Type: text/plain" \\
  -d 'items.find({
    "repo":{"$match":"docker-dev-*"},
    "modified":{"$before":"14d"},
    "type":"file",
    "name":"manifest.json"
  })'
\`\`\`

## 5. Intégration Build Info

\`\`\`bash
# Pipeline CI complet avec Build Info
BUILD_NAME="my-app"
BUILD_NUMBER="\\\${CI_PIPELINE_ID}"

# 1. Collecter l'environnement
jf rt build-collect-env $BUILD_NAME $BUILD_NUMBER

# 2. Ajouter les infos Git
jf rt build-add-git $BUILD_NAME $BUILD_NUMBER

# 3. Upload avec Build Info
jf rt upload "target/*.jar" "libs-release-local/com/company/app/\\\${VERSION}/" \\
  --build-name=$BUILD_NAME --build-number=$BUILD_NUMBER

# 4. Docker build avec Build Info
jf rt docker-push registry/app:\\\${VERSION} docker-dev-local \\
  --build-name=$BUILD_NAME --build-number=$BUILD_NUMBER

# 5. Publier le Build Info
jf rt build-publish $BUILD_NAME $BUILD_NUMBER

# 6. Promouvoir le build
jf rt build-promote $BUILD_NAME $BUILD_NUMBER docker-staging-local \\
  --status="Staged" --comment="Promoted by CI pipeline"
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Projet final Artifactory

### Étape 1 : Créer la topologie complète des dépôts

\`\`\`bash
# Exécuter le script de setup
chmod +x setup-repos.sh
./setup-repos.sh

# Vérifier les dépôts créés
jf rt repo-list | grep -E "local|remote|virtual"
\`\`\`

### Étape 2 : Configurer npm et Docker

\`\`\`bash
# Configurer npm pour utiliser Artifactory
npm config set registry http://localhost:8082/artifactory/api/npm/npm-virtual/

# Configurer Docker
docker login localhost:8082
docker pull nginx:alpine
docker tag nginx:alpine localhost:8082/docker-dev-local/myapp:1.0
docker push localhost:8082/docker-dev-local/myapp:1.0
\`\`\`

### Étape 3 : Pipeline de promotion

\`\`\`bash
# Promouvoir de dev vers staging
./promote.sh myapp 1.0 dev staging

# Vérifier les propriétés
curl -u admin:password "$ARTIF/api/storage/docker-staging-local/myapp/1.0?properties"
\`\`\`

### Étape 4 : Build Info complet

\`\`\`bash
jf rt build-collect-env my-app 1
jf rt upload "*.jar" libs-release-local/ --build-name=my-app --build-number=1
jf rt build-publish my-app 1
jf rt build-promote my-app 1 libs-staging-local --status="Tested"
\`\`\`

### Étape 5 : Cleanup automatisé

\`\`\`bash
# Lancer le cleanup et vérifier l'espace récupéré
./cleanup.sh
curl -u admin:password "$ARTIF/api/storageinfo" | python3 -m json.tool
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Une topologie entreprise sépare les dépôts par format (Maven, npm, Docker) et par environnement',
      'Les dépôts virtuels offrent un point d\'entrée unique aux développeurs et au CI',
      'La promotion copie les artefacts entre repos (dev→staging→prod) avec métadonnées',
      'Le Build Info trace la relation complète entre code source, build et artefacts déployés',
      'Les politiques de rétention nettoient automatiquement les snapshots et images anciennes',
      'AQL permet des requêtes complexes pour identifier les artefacts à nettoyer',
      'Les scripts de setup automatisent la création reproductible de l\'infrastructure Artifactory',
      'L\'intégration JFrog CLI dans le CI publie automatiquement le Build Info'
    ]),
  },



  // ============================================================
  // SONARQUBE - Module 9: SonarQube et la dette technique
  // ============================================================
  {
    id: 'sq-09',
    courseId: 'sonarqube',
    title: 'SonarQube et la dette technique',
    duration: '3h30',
    orderIndex: 9,
    theoryContent: `# SonarQube et la dette technique

## 1. Comprendre la dette technique

La dette technique représente le coût futur de la maintenance causé par des choix de conception ou d'implémentation sous-optimaux. SonarQube la mesure en temps estimé pour corriger tous les code smells.

### Métriques de dette technique

\`\`\`bash
# Obtenir la dette technique d'un projet
curl -u token: "http://localhost:9000/api/measures/component?component=my-project&metricKeys=sqale_index,sqale_debt_ratio,effort_to_reach_maintainability_rating_a"

# sqale_index : dette en minutes
# sqale_debt_ratio : dette / temps de dev (%)
# Rating : A (<=5%), B (6-10%), C (11-20%), D (21-50%), E (>50%)
\`\`\`

## 2. Stratégies de remédiation

### Approche Clean as You Code

\`\`\`
Stratégie recommandée :
1. Configurer le Quality Gate sur le NOUVEAU code uniquement
2. Ne jamais merger de nouveau code avec de la dette
3. Réduire progressivement l'ancienne dette par refactoring opportuniste
4. Dédier 20% du temps sprint au refactoring technique

Métriques à suivre :
- New Code : coverage >= 80%, debt ratio = 0%, 0 bugs/vulns
- Overall : tendance à la baisse sur le temps
\`\`\`

### Priorisation des issues

\`\`\`bash
# Trouver les fichiers les plus endettés
curl -u token: "http://localhost:9000/api/measures/component_tree?component=my-project&metricKeys=sqale_index&qualifiers=FIL&s=sqale_index&asc=false&ps=20"

# Issues par sévérité
curl -u token: "http://localhost:9000/api/issues/search?componentKeys=my-project&types=CODE_SMELL&severities=BLOCKER,CRITICAL&ps=50"

# Issues par effort de correction (les quick wins)
curl -u token: "http://localhost:9000/api/issues/search?componentKeys=my-project&types=CODE_SMELL&s=EFFORT&asc=true&ps=20"
\`\`\`

## 3. Amélioration de la couverture

\`\`\`bash
# Identifier les fichiers sans couverture
curl -u token: "http://localhost:9000/api/measures/component_tree?component=my-project&metricKeys=coverage,uncovered_lines&qualifiers=FIL&s=uncovered_lines&asc=false&ps=20"

# Configurer les exclusions de couverture
# sonar-project.properties
# sonar.coverage.exclusions=**/config/**,**/dto/**,**/entity/**,**/*Config.java

# Rapport de couverture JaCoCo (Java)
# mvn clean verify jacoco:report
# sonar-scanner -Dsonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml

# Rapport Jest (JavaScript)
# jest --coverage --coverageReporters=lcov
# sonar-scanner -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
\`\`\`

## 4. Métriques de refactoring

\`\`\`bash
# Suivre l'évolution de la dette dans le temps
curl -u token: "http://localhost:9000/api/measures/search_history?component=my-project&metrics=sqale_index,coverage,bugs,code_smells&ps=30"

# Comparer entre deux analyses
curl -u token: "http://localhost:9000/api/measures/component?component=my-project&metricKeys=new_technical_debt,new_code_smells,new_bugs,new_coverage&branch=develop"

# Dashboard personnalisé pour le tech debt
curl -u token: "http://localhost:9000/api/measures/component?component=my-project&metricKeys=sqale_index,sqale_debt_ratio,reliability_remediation_effort,security_remediation_effort,duplicated_lines_density"
\`\`\`

## 5. Quality Profiles personnalisés

\`\`\`bash
# Créer un profil personnalisé
curl -u token: -X POST "http://localhost:9000/api/qualityprofiles/create?name=Company+Standard&language=java"

# Copier un profil existant
curl -u token: -X POST "http://localhost:9000/api/qualityprofiles/copy?fromKey=SONAR_WAY_KEY&toName=My+Custom+Profile"

# Activer/désactiver des règles
curl -u token: -X POST "http://localhost:9000/api/qualityprofiles/activate_rule?key=PROFILE_KEY&rule=java:S1135"

# Changer la sévérité d'une règle
curl -u token: -X POST "http://localhost:9000/api/qualityprofiles/activate_rule?key=PROFILE_KEY&rule=java:S1135&severity=MINOR"

# Associer le profil à un projet
curl -u token: -X POST "http://localhost:9000/api/qualityprofiles/add_project?qualityProfile=Company+Standard&project=my-project&language=java"
\`\`\`

## 6. Gestion des faux positifs

\`\`\`bash
# Marquer une issue comme faux positif
curl -u token: -X POST "http://localhost:9000/api/issues/do_transition?issue=ISSUE_KEY&transition=falsepositive"

# Marquer comme Won't Fix
curl -u token: -X POST "http://localhost:9000/api/issues/do_transition?issue=ISSUE_KEY&transition=wontfix"

# Annotations dans le code pour supprimer
# Java: @SuppressWarnings("java:S1135")
# JavaScript: // NOSONAR
# ou // sonar-ignore-next-line

# Bulk close des issues
curl -u token: -X POST "http://localhost:9000/api/issues/bulk_change?issues=ISSUE1,ISSUE2&do_transition=falsepositive&comment=Legacy+code+accepted"
\`\`\`

## 7. Rapport d'évolution

\`\`\`bash
# Script de reporting hebdomadaire
#!/bin/bash
PROJECT="my-project"
TOKEN="sqa_xxx"

echo "=== Rapport SonarQube - $(date -I) ==="
METRICS=$(curl -s -u $TOKEN: "http://localhost:9000/api/measures/component?component=$PROJECT&metricKeys=bugs,vulnerabilities,code_smells,coverage,sqale_index,sqale_debt_ratio")

echo "$METRICS" | python3 -c "
import json, sys
data = json.load(sys.stdin)
measures = {m['metric']: m['value'] for m in data['component']['measures']}
print(f'Bugs: {measures.get(\"bugs\", \"N/A\")}')
print(f'Vulnérabilités: {measures.get(\"vulnerabilities\", \"N/A\")}')
print(f'Code Smells: {measures.get(\"code_smells\", \"N/A\")}')
print(f'Couverture: {measures.get(\"coverage\", \"N/A\")}%')
print(f'Dette technique: {int(measures.get(\"sqale_index\", 0))/60:.0f} heures')
print(f'Ratio dette: {measures.get(\"sqale_debt_ratio\", \"N/A\")}%')
"
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Dette technique avec SonarQube

### Exercice 1 : Analyser la dette technique

\`\`\`bash
# Lancer une analyse et examiner les métriques de dette
sonar-scanner -Dsonar.projectKey=debt-analysis
curl -s -u token: "http://localhost:9000/api/measures/component?component=debt-analysis&metricKeys=sqale_index,sqale_debt_ratio"
\`\`\`

### Exercice 2 : Identifier les quick wins

\`\`\`bash
# Trouver les issues avec le moins d'effort de correction
curl -s -u token: "http://localhost:9000/api/issues/search?componentKeys=debt-analysis&types=CODE_SMELL&s=EFFORT&asc=true&ps=10"
\`\`\`

### Exercice 3 : Améliorer la couverture

\`\`\`bash
# Identifier les fichiers avec 0% de couverture
curl -s -u token: "http://localhost:9000/api/measures/component_tree?component=debt-analysis&metricKeys=coverage&qualifiers=FIL&s=coverage&asc=true&ps=10"
# Écrire des tests pour les fichiers les plus critiques
\`\`\`

### Exercice 4 : Créer un Quality Profile personnalisé

\`\`\`bash
# Copier Sonar Way et ajuster les règles
curl -u token: -X POST "http://localhost:9000/api/qualityprofiles/copy?fromKey=SONAR_WAY&toName=Team+Profile"
# Désactiver les règles non pertinentes, ajuster les sévérités
\`\`\`

### Exercice 5 : Script de suivi hebdomadaire

\`\`\`bash
# Créer un script qui génère un rapport de dette technique
# avec l'évolution sur les 4 dernières semaines
curl -u token: "http://localhost:9000/api/measures/search_history?component=debt-analysis&metrics=sqale_index,coverage&ps=4"
\`\`\`
`,
    keyPoints: JSON.stringify([
      'La dette technique se mesure en temps de remédiation (sqale_index) et ratio (sqale_debt_ratio)',
      'L\'approche Clean as You Code concentre l\'effort sur le nouveau code uniquement',
      'La priorisation par effort identifie les quick wins (peu d\'effort, grande amélioration)',
      'Les Quality Profiles personnalisés adaptent les règles au contexte du projet',
      'La couverture s\'améliore en ciblant les fichiers critiques non couverts',
      'Les faux positifs se gèrent via l\'API ou les annotations @SuppressWarnings/NOSONAR',
      'Le suivi historique des métriques mesure l\'efficacité de la stratégie de remédiation',
      'Dédier 20% du temps sprint au refactoring technique est une bonne pratique'
    ]),
  },

  // ============================================================
  // SONARQUBE - Module 10: Projet final SonarQube
  // ============================================================
  {
    id: 'sq-10',
    courseId: 'sonarqube',
    title: 'Projet final SonarQube',
    duration: '4h',
    orderIndex: 10,
    theoryContent: `# Projet final SonarQube : Configuration complète

## Objectif

Configurer SonarQube de bout en bout : Quality Gates personnalisés, profils de qualité sur mesure, intégration CI/CD, analyse multi-module, génération de rapports et tableau de bord de suivi.

## 1. Quality Gate personnalisé

\`\`\`bash
# Créer un Quality Gate strict pour la production
QG_ID=$(curl -s -u token: -X POST "http://localhost:9000/api/qualitygates/create?name=Production+Gate" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")

# Ajouter les conditions
curl -u token: -X POST "http://localhost:9000/api/qualitygates/create_condition?gateId=$QG_ID&metric=new_coverage&op=LT&error=80"
curl -u token: -X POST "http://localhost:9000/api/qualitygates/create_condition?gateId=$QG_ID&metric=new_duplicated_lines_density&op=GT&error=3"
curl -u token: -X POST "http://localhost:9000/api/qualitygates/create_condition?gateId=$QG_ID&metric=new_reliability_rating&op=GT&error=1"
curl -u token: -X POST "http://localhost:9000/api/qualitygates/create_condition?gateId=$QG_ID&metric=new_security_rating&op=GT&error=1"
curl -u token: -X POST "http://localhost:9000/api/qualitygates/create_condition?gateId=$QG_ID&metric=new_maintainability_rating&op=GT&error=1"
curl -u token: -X POST "http://localhost:9000/api/qualitygates/create_condition?gateId=$QG_ID&metric=new_security_hotspots_reviewed&op=LT&error=100"

# Appliquer le Quality Gate à un projet
curl -u token: -X POST "http://localhost:9000/api/qualitygates/select?projectKey=my-project&gateId=$QG_ID"
\`\`\`

## 2. Analyse multi-module

\`\`\`properties
# sonar-project.properties pour un projet multi-module
sonar.projectKey=company:monorepo
sonar.projectName=Company Monorepo
sonar.projectVersion=2.0.0

# Définir les modules
sonar.modules=api,frontend,worker,shared

# Module API (Java/Spring)
api.sonar.projectName=API Service
api.sonar.sources=src/main/java
api.sonar.tests=src/test/java
api.sonar.java.binaries=target/classes
api.sonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml

# Module Frontend (TypeScript/React)
frontend.sonar.projectName=Frontend App
frontend.sonar.sources=src
frontend.sonar.tests=src/__tests__
frontend.sonar.javascript.lcov.reportPaths=coverage/lcov.info
frontend.sonar.exclusions=**/node_modules/**,**/*.spec.ts

# Module Worker (Python)
worker.sonar.projectName=Worker Service
worker.sonar.sources=src
worker.sonar.tests=tests
worker.sonar.python.coverage.reportPaths=coverage.xml

# Module Shared (TypeScript)
shared.sonar.projectName=Shared Library
shared.sonar.sources=src
shared.sonar.tests=tests
\`\`\`

## 3. Intégration CI/CD complète

\`\`\`yaml
# GitLab CI avec SonarQube
sonarqube:
  stage: quality
  image: sonarsource/sonar-scanner-cli:latest
  variables:
    SONAR_HOST_URL: "http://sonarqube:9000"
    SONAR_TOKEN: \\\${SONAR_TOKEN}
  script:
    - sonar-scanner
      -Dsonar.qualitygate.wait=true
      -Dsonar.projectKey=\\\${CI_PROJECT_PATH_SLUG}
      -Dsonar.projectVersion=\\\${CI_COMMIT_TAG:-\\\${CI_COMMIT_SHORT_SHA}}
  allow_failure: false
  rules:
    - if: \\\$CI_COMMIT_BRANCH == "main"
    - if: \\\$CI_MERGE_REQUEST_IID
\`\`\`

\`\`\`groovy
// Jenkins avec Quality Gate
stage('SonarQube') {
    steps {
        withSonarQubeEnv('SonarQube') {
            sh 'mvn sonar:sonar'
        }
    }
}
stage('Quality Gate') {
    steps {
        timeout(time: 5, unit: 'MINUTES') {
            waitForQualityGate abortPipeline: true
        }
    }
}
\`\`\`

## 4. Webhooks et notifications

\`\`\`bash
# Configurer un webhook pour la CI
curl -u token: -X POST "http://localhost:9000/api/webhooks/create" \\
  -d "name=Jenkins" \\
  -d "url=http://jenkins:8080/sonarqube-webhook/" \\
  -d "project=my-project"

# Webhook payload (ce que SonarQube envoie) :
# {
#   "analysedAt": "2024-01-15T10:30:00+0000",
#   "project": {"key": "my-project", "name": "My Project"},
#   "qualityGate": {
#     "status": "OK" ou "ERROR",
#     "conditions": [...]
#   }
# }
\`\`\`

## 5. Génération de rapports

\`\`\`bash
#!/bin/bash
# generate-report.sh - Rapport de qualité complet
TOKEN="sqa_xxx"
PROJECT="my-project"

echo "<!DOCTYPE html><html><head><title>Quality Report</title></head><body>"
echo "<h1>Rapport Qualité - $PROJECT - $(date -I)</h1>"

# Métriques globales
METRICS=$(curl -s -u $TOKEN: "http://localhost:9000/api/measures/component?component=$PROJECT&metricKeys=bugs,vulnerabilities,code_smells,coverage,duplicated_lines_density,ncloc,sqale_index")

echo "$METRICS" | python3 -c "
import json, sys
data = json.load(sys.stdin)
m = {x['metric']: x['value'] for x in data['component']['measures']}
print('<table border=\"1\">')
print(f'<tr><td>Lignes de code</td><td>{m.get(\"ncloc\", \"N/A\")}</td></tr>')
print(f'<tr><td>Bugs</td><td>{m.get(\"bugs\", 0)}</td></tr>')
print(f'<tr><td>Vulnérabilités</td><td>{m.get(\"vulnerabilities\", 0)}</td></tr>')
print(f'<tr><td>Code Smells</td><td>{m.get(\"code_smells\", 0)}</td></tr>')
print(f'<tr><td>Couverture</td><td>{m.get(\"coverage\", 0)}%</td></tr>')
print(f'<tr><td>Duplications</td><td>{m.get(\"duplicated_lines_density\", 0)}%</td></tr>')
print(f'<tr><td>Dette technique</td><td>{int(m.get(\"sqale_index\", 0))/60:.0f}h</td></tr>')
print('</table>')
"

echo "</body></html>"
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Projet final SonarQube

### Étape 1 : Créer un Quality Gate personnalisé

\`\`\`bash
# Créer un Quality Gate strict
curl -u admin:admin -X POST "http://localhost:9000/api/qualitygates/create?name=Strict+Gate"
# Ajouter les conditions : coverage >= 80%, 0 bugs, 0 vulns
\`\`\`

### Étape 2 : Configurer un Quality Profile

\`\`\`bash
# Copier Sonar Way et l'adapter
curl -u admin:admin -X POST "http://localhost:9000/api/qualityprofiles/copy?fromKey=SONAR_WAY&toName=Team+Profile"
# Activer des règles supplémentaires pour la sécurité
\`\`\`

### Étape 3 : Analyser un projet multi-module

\`\`\`bash
# Créer un sonar-project.properties multi-module
# Lancer l'analyse
sonar-scanner
# Vérifier les résultats par module dans l'UI
\`\`\`

### Étape 4 : Intégrer dans le CI/CD

\`\`\`bash
# Configurer le webhook pour Jenkins/GitLab
# Vérifier que le pipeline s'arrête si Quality Gate = ERROR
curl -u token: "http://localhost:9000/api/qualitygates/project_status?projectKey=my-project"
\`\`\`

### Étape 5 : Générer un rapport HTML

\`\`\`bash
# Exécuter le script de reporting
chmod +x generate-report.sh
./generate-report.sh > quality-report.html
# Ouvrir le rapport et analyser les tendances
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Les Quality Gates personnalisés définissent les critères de qualité minimum pour la production',
      'L\'analyse multi-module permet de scanner un monorepo avec des langages différents par module',
      'sonar.qualitygate.wait=true bloque le pipeline CI si le Quality Gate échoue',
      'Les webhooks notifient Jenkins/GitLab du résultat de l\'analyse en temps réel',
      'Les rapports HTML automatisés permettent un suivi régulier de la qualité',
      'Les Quality Profiles personnalisés adaptent les règles d\'analyse au contexte',
      'La couverture par module identifie les services nécessitant plus de tests',
      'L\'intégration CI/CD garantit que tout code mergé respecte les standards de qualité'
    ]),
  },



  // ============================================================
  // DOORS - Module 9: DOORS et le cycle en V
  // ============================================================
  {
    id: 'doors-09',
    courseId: 'doors',
    title: 'DOORS et le cycle en V',
    duration: '4h',
    orderIndex: 9,
    theoryContent: `# DOORS et le cycle en V

## 1. Le cycle en V et la traçabilité

Le cycle en V est un modèle de développement où chaque phase de spécification correspond à une phase de vérification. DOORS est l'outil de référence pour gérer cette traçabilité bidirectionnelle.

\`\`\`
Besoins Stakeholder ←→ Tests d'acceptation
    ↓                        ↑
Exigences Système ←→ Tests Système
    ↓                        ↑
Exigences Logiciel ←→ Tests d'Intégration
    ↓                        ↑
Conception détaillée ←→ Tests Unitaires
         ↓          ↑
       Implémentation
\`\`\`

## 2. Structure des modules dans DOORS

\`\`\`
Projet DOORS/
├── 01-Stakeholder Requirements/
│   └── STK-REQ (Module Formal)
├── 02-System Requirements/
│   └── SYS-REQ (Module Formal)
├── 03-Software Requirements/
│   ├── SW-REQ-Frontend (Module Formal)
│   └── SW-REQ-Backend (Module Formal)
├── 04-Architecture/
│   └── ARCH-Design (Module Formal)
├── 05-Test Specifications/
│   ├── TST-System (Module Formal)
│   ├── TST-Integration (Module Formal)
│   └── TST-Unit (Module Formal)
└── 06-Traceability/
    ├── STK-to-SYS (Link Module)
    ├── SYS-to-SW (Link Module)
    └── SW-to-TST (Link Module)
\`\`\`

## 3. Matrice de vérification (Requirements Verification Matrix)

\`\`\`
// Script DXL pour générer la matrice de vérification
void generateVerificationMatrix() {
    Module srcMod = read("/Project/02-System Requirements/SYS-REQ", true)
    Module tgtMod = read("/Project/05-Test Specifications/TST-System", true)
    
    Object src
    for src in srcMod do {
        string reqId = src."ID"
        string reqText = src."Object Text"
        string status = "NOT COVERED"
        int linkCount = 0
        
        Link outLink
        for outLink in src -> "*" do {
            Object tgt = target(outLink)
            if (module(tgt) == tgtMod) {
                linkCount++
                string testResult = tgt."Test Result"
                if (testResult == "PASS") status = "VERIFIED"
                else if (testResult == "FAIL") status = "FAILED"
                else status = "COVERED"
            }
        }
        
        if (linkCount == 0) status = "NOT COVERED"
        print reqId "\\t" status "\\t" linkCount " test(s)\\t" reqText[0:50] "\\n"
    }
    close(srcMod)
    close(tgtMod)
}
\`\`\`

## 4. Analyse de couverture (Coverage Analysis)

\`\`\`
// DXL - Rapport de couverture des exigences
pragma runLim, 0

Module m = current
Object o
int total = 0
int covered = 0
int notCovered = 0
int partial = 0

for o in m do {
    if (o."Object Type" == "Requirement") {
        total++
        int downLinks = 0
        Link lnk
        for lnk in o -> "*" do { downLinks++ }
        
        if (downLinks == 0) {
            notCovered++
            o."Coverage Status" = "NOT COVERED"
        } else if (downLinks >= 2) {
            covered++
            o."Coverage Status" = "FULLY COVERED"
        } else {
            partial++
            o."Coverage Status" = "PARTIALLY COVERED"
        }
    }
}

print "=== Rapport de Couverture ===\\n"
print "Total exigences: " total "\\n"
print "Couvertes: " covered " (" (covered*100/total) "%)\\n"
print "Partiellement: " partial " (" (partial*100/total) "%)\\n"
print "Non couvertes: " notCovered " (" (notCovered*100/total) "%)\\n"
\`\`\`

## 5. Gap Analysis

L'analyse des écarts identifie les exigences sans liens descendant (non implémentées) ou sans liens ascendant (orphelines).

\`\`\`
// DXL - Gap Analysis
void gapAnalysis(Module m) {
    Object o
    Buffer report = create
    int orphans = 0
    int noChildren = 0
    
    for o in m do {
        if (o."Object Type" != "Requirement") continue
        
        // Vérifier les liens entrants (parent)
        int inLinks = 0
        Link lnk
        for lnk in o <- "*" do { inLinks++ }
        
        // Vérifier les liens sortants (enfant)
        int outLinks = 0
        for lnk in o -> "*" do { outLinks++ }
        
        if (inLinks == 0) {
            orphans++
            report += o."ID" " - ORPHELIN (pas de parent)\\n"
        }
        if (outLinks == 0) {
            noChildren++
            report += o."ID" " - LEAF (pas d'enfant/test)\\n"
        }
    }
    
    print "Orphelins: " orphans "\\n"
    print "Sans enfant: " noChildren "\\n"
    print stringOf(report)
    delete(report)
}
\`\`\`

## 6. Baselines et gestion de configuration

\`\`\`
// Créer une baseline pour figer l'état des exigences
// DXL Script
void createProjectBaseline(string baselineName, string description) {
    Module m
    string modules[] = {
        "/Project/01-STK-REQ",
        "/Project/02-SYS-REQ",
        "/Project/03-SW-REQ",
        "/Project/05-TST-System"
    }
    
    int i
    for (i = 0; i < sizeof(modules); i++) {
        m = read(modules[i], false)
        if (!null m) {
            create(baseline(m), baselineName, description)
            print "Baseline created for: " modules[i] "\\n"
            close(m)
        }
    }
}
\`\`\`

## 7. Traçabilité de bout en bout

\`\`\`
Exigence Stakeholder (STK-001)
    → satisfait_par → Exigence Système (SYS-003, SYS-004)
        → raffinée_par → Exigence Logiciel (SW-012)
            → implémentée_par → Code (module.c:fonction_x)
            → vérifiée_par → Test Unitaire (TU-045)
        → vérifiée_par → Test Système (TS-008)
    → validée_par → Test d'Acceptation (TA-002)
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : DOORS et le cycle en V

### Exercice 1 : Créer la structure projet

\`\`\`
Créer un projet DOORS avec les modules :
- 01-Stakeholder Requirements (STK-REQ)
- 02-System Requirements (SYS-REQ)
- 03-Software Requirements (SW-REQ)
- 05-Test Specifications (TST-SYS, TST-INT)
Définir les types de liens : satisfies, refines, verifies
\`\`\`

### Exercice 2 : Remplir les exigences

\`\`\`
Créer 10 exigences stakeholder, 20 système, 30 logiciel
Établir les liens de traçabilité descendante
Vérifier qu'aucune exigence n'est orpheline
\`\`\`

### Exercice 3 : Matrice de traçabilité

\`\`\`
Exécuter le script DXL de génération de matrice
Identifier les gaps (exigences non couvertes par des tests)
Documenter les écarts et les actions correctives
\`\`\`

### Exercice 4 : Coverage Analysis

\`\`\`
Exécuter le script de couverture
Objectif : 100% des exigences système doivent avoir au moins un test
Créer les tests manquants pour les exigences non couvertes
\`\`\`

### Exercice 5 : Créer une baseline

\`\`\`
Figer l'état des exigences avec une baseline "V1.0-Release"
Comparer avec la baseline précédente
Identifier les exigences ajoutées/modifiées/supprimées
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Le cycle en V associe chaque niveau d\'exigence à un niveau de test correspondant',
      'La traçabilité bidirectionnelle garantit que chaque exigence est implémentée et testée',
      'La matrice de vérification croise exigences et tests avec leur statut (PASS/FAIL)',
      'L\'analyse de couverture identifie les exigences sans test associé',
      'La Gap Analysis détecte les exigences orphelines et les feuilles sans descendant',
      'Les scripts DXL automatisent la génération de rapports de conformité',
      'Les baselines figent l\'état des exigences à un instant T pour la gestion de configuration',
      'La traçabilité de bout en bout va du besoin stakeholder au test d\'acceptation'
    ]),
  },

  // ============================================================
  // DOORS - Module 10: Projet final DOORS
  // ============================================================
  {
    id: 'doors-10',
    courseId: 'doors',
    title: 'Projet final DOORS',
    duration: '5h',
    orderIndex: 10,
    theoryContent: `# Projet final DOORS : Gestion des exigences complète

## Objectif

Créer un projet DOORS complet avec traçabilité multi-niveaux : des besoins stakeholder aux tests d'acceptation, en passant par les exigences système et logiciel, avec baselines et rapports de conformité.

## 1. Structure complète du projet

\`\`\`
PROJET : Système de Contrôle Aérien
├── 00-Project Management/
│   ├── PM-Plan (Document informel)
│   └── PM-Standards (Document informel)
├── 01-Stakeholder Needs/
│   └── STK-NEEDS (Module Formal - 15 besoins)
├── 02-System Requirements/
│   ├── SYS-FUNC (Module Formal - 40 exigences fonctionnelles)
│   └── SYS-PERF (Module Formal - 20 exigences performance)
├── 03-Software Requirements/
│   ├── SW-HMI (Module Formal - 25 exigences IHM)
│   ├── SW-CTRL (Module Formal - 30 exigences contrôle)
│   └── SW-COM (Module Formal - 15 exigences communication)
├── 04-Test Plans/
│   ├── TP-Acceptance (Module Formal)
│   ├── TP-System (Module Formal)
│   ├── TP-Integration (Module Formal)
│   └── TP-Unit (Module Formal)
├── 05-Traceability/
│   ├── STK-to-SYS (Link Module)
│   ├── SYS-to-SW (Link Module)
│   └── REQ-to-TEST (Link Module)
└── 06-Baselines/
    ├── BL-V1.0-Initial
    ├── BL-V1.1-Review
    └── BL-V2.0-Release
\`\`\`

## 2. Attributs des exigences

\`\`\`
Chaque exigence possède les attributs suivants :

| Attribut | Type | Valeurs possibles |
|----------|------|-------------------|
| ID | String | STK-001, SYS-FUNC-042 |
| Object Type | Enum | Heading, Requirement, Information |
| Priority | Enum | Must, Should, Could, Won't |
| Status | Enum | Draft, Under Review, Approved, Deleted |
| Verification Method | Enum | Test, Analysis, Inspection, Demonstration |
| Safety Level | Enum | DAL-A, DAL-B, DAL-C, DAL-D, DAL-E |
| Compliance | Enum | Compliant, Non-Compliant, N/A |
| Owner | String | Nom du responsable |
| Change Request | String | CR-xxx |
\`\`\`

## 3. Scripts DXL essentiels

\`\`\`
// Script 1: Numérotation automatique des exigences
void autoNumber(Module m, string prefix) {
    Object o
    int count = 0
    for o in m do {
        if (o."Object Type" == "Requirement") {
            count++
            string id = prefix "-" padLeft(count "", 3, '0')
            o."ID" = id
        }
    }
    print "Numérotation terminée: " count " exigences\\n"
}

// Script 2: Export vers Excel/CSV
void exportCSV(Module m, string filename) {
    Stream out = write(filename)
    out << "ID;Text;Priority;Status;Verification;Coverage\\n"
    
    Object o
    for o in m do {
        if (o."Object Type" == "Requirement") {
            int links = 0
            Link lnk
            for lnk in o -> "*" do { links++ }
            
            out << o."ID" ";"
            out << o."Object Text" ";"
            out << o."Priority" ";"
            out << o."Status" ";"
            out << o."Verification Method" ";"
            out << (links > 0 ? "Covered" : "NOT Covered") "\\n"
        }
    }
    close(out)
    print "Export terminé: " filename "\\n"
}

// Script 3: Rapport de conformité complet
void complianceReport() {
    Module m = current
    Object o
    int total = 0, approved = 0, tested = 0, compliant = 0
    
    for o in m do {
        if (o."Object Type" == "Requirement") {
            total++
            if (o."Status" == "Approved") approved++
            
            Link lnk
            bool hasTest = false
            for lnk in o -> "*" do {
                Object tgt = target(lnk)
                if (tgt."Object Type" == "Test Case") hasTest = true
            }
            if (hasTest) tested++
            if (o."Compliance" == "Compliant") compliant++
        }
    }
    
    print "=== RAPPORT DE CONFORMITÉ ===\\n"
    print "Total exigences: " total "\\n"
    print "Approuvées: " approved "/" total " (" (approved*100/total) "%)\\n"
    print "Avec tests: " tested "/" total " (" (tested*100/total) "%)\\n"
    print "Conformes: " compliant "/" total " (" (compliant*100/total) "%)\\n"
    
    if (tested < total) {
        print "\\n⚠️  ALERTE: " (total - tested) " exigences sans test!\\n"
    }
}
\`\`\`

## 4. Workflow de validation

\`\`\`
Draft → Under Review → Approved → Baselined
  ↓         ↓
Deleted   Rejected → Draft (modifié)

Transitions autorisées :
- Draft → Under Review : auteur
- Under Review → Approved : reviewer + manager
- Under Review → Rejected : reviewer
- Approved → Baselined : configuration manager
- Any → Deleted : avec Change Request
\`\`\`

## 5. Impact Analysis

\`\`\`
// DXL - Analyse d'impact d'un changement
void impactAnalysis(Object changedReq) {
    print "=== Impact Analysis pour: " changedReq."ID" " ===\\n"
    print "Exigence: " changedReq."Object Text" "\\n\\n"
    
    // Liens descendants (impactés par le changement)
    print "--- Éléments impactés (downstream) ---\\n"
    Link lnk
    for lnk in changedReq -> "*" do {
        Object tgt = target(lnk)
        print "  → " tgt."ID" " [" module(tgt) "] " tgt."Object Text"[0:60] "\\n"
        
        // Niveau 2
        Link lnk2
        for lnk2 in tgt -> "*" do {
            Object tgt2 = target(lnk2)
            print "    → " tgt2."ID" " [" module(tgt2) "]\\n"
        }
    }
    
    // Liens ascendants (source du changement)
    print "\\n--- Sources (upstream) ---\\n"
    for lnk in changedReq <- "*" do {
        Object src = source(lnk)
        print "  ← " src."ID" " [" module(src) "]\\n"
    }
}
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Projet final DOORS

### Étape 1 : Créer la structure projet complète

\`\`\`
1. Créer le projet "Système de Contrôle"
2. Créer les modules formels pour chaque niveau
3. Définir les attributs personnalisés
4. Configurer les types de liens
\`\`\`

### Étape 2 : Rédiger les exigences multi-niveaux

\`\`\`
1. 15 besoins stakeholder (STK-001 à STK-015)
2. 40 exigences système (SYS-001 à SYS-040)
3. 70 exigences logiciel réparties en 3 modules
4. Associer priorité, méthode de vérification et propriétaire
\`\`\`

### Étape 3 : Établir la traçabilité complète

\`\`\`
1. Liens STK → SYS (chaque STK vers 2-3 SYS)
2. Liens SYS → SW (chaque SYS vers 1-3 SW)
3. Liens SW → TST (chaque SW vers au moins 1 test)
4. Vérifier : 0 exigences orphelines
\`\`\`

### Étape 4 : Exécuter les analyses

\`\`\`
1. Lancer le script de couverture → objectif 100%
2. Lancer la Gap Analysis → corriger les écarts
3. Générer la matrice de vérification
4. Exporter le rapport de conformité en CSV
\`\`\`

### Étape 5 : Créer les baselines

\`\`\`
1. Baseline V1.0 : état initial approuvé
2. Modifier 5 exigences (simuler un Change Request)
3. Baseline V1.1 : après modifications
4. Comparer V1.0 et V1.1 : lister les changements
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Un projet DOORS complet couvre stakeholder→système→logiciel→tests avec traçabilité',
      'Les attributs personnalisés (Priority, Status, Verification Method) enrichissent chaque exigence',
      'Les scripts DXL automatisent la numérotation, l\'export et les rapports de conformité',
      'L\'analyse d\'impact identifie toutes les exigences affectées par un changement',
      'La couverture 100% signifie que chaque exigence a au moins un test associé',
      'Les baselines figent l\'état des exigences pour la gestion de configuration',
      'Le workflow de validation (Draft→Review→Approved) contrôle le cycle de vie',
      'L\'export CSV/HTML permet de partager les rapports avec les parties prenantes'
    ]),
  },



  // ============================================================
  // CLEARCASE - Module 9: Maintenance et performance ClearCase
  // ============================================================
  {
    id: 'cc-09',
    courseId: 'clearcase',
    title: 'Maintenance et performance ClearCase',
    duration: '3h30',
    orderIndex: 9,
    theoryContent: `# Maintenance et performance ClearCase

## 1. VOB Scrubbing

Le scrubbing nettoie les données dérivées (DO) expirées des VOBs, libérant de l'espace disque significatif.

\`\`\`bash
# Scrubbing des Derived Objects
cleartool space -vob /vobs/project_vob
scrubber -e -p /vobs/project_vob

# Scrubber avec politique de rétention (garder 7 jours)
scrubber -e -k 7 /vobs/project_vob

# Scrubbing des VOBs d'administration
vob_scrubber -a -p /vobs/admin_vob

# Planifier le scrubbing automatique (crontab)
# 0 2 * * 0 /opt/rational/clearcase/bin/scrubber -e -k 14 /vobs/project_vob >> /var/log/scrubber.log 2>&1

# Vérifier l'espace après scrubbing
cleartool space -vob /vobs/project_vob
df -h /vobstore
\`\`\`

## 2. Lock Management

\`\`\`bash
# Verrouiller une branche (empêcher les checkouts)
cleartool lock brtype:release_1.0@/vobs/project_vob

# Verrouiller avec exceptions (certains utilisateurs autorisés)
cleartool lock -nuser admin,build_user brtype:main@/vobs/project_vob

# Verrouiller un VOB complet
cleartool lock vob:/vobs/project_vob

# Verrouiller un élément spécifique
cleartool lock /vobs/project_vob/src/main.c

# Lister les verrous actifs
cleartool lslock -l -all /vobs/project_vob

# Déverrouiller
cleartool unlock brtype:release_1.0@/vobs/project_vob

# Verrou obsolète sur un type de branche
cleartool lock -obsolete brtype:old_feature@/vobs/project_vob
\`\`\`

## 3. Performance Tuning

\`\`\`bash
# Optimiser les vues dynamiques
# Augmenter le cache view_server
export CCASE_MNTRPC_THREADS=32
export CCASE_VIEW_CACHE_SIZE=8192

# Configurer le MVFS (Multi-Version File System)
cat >> /var/adm/rational/clearcase/config/mvfs.conf << 'EOF'
mvfs_largeinit = 4000
mvfs_threadhashsize = 256
mvfs_rpchandles = 128
mvfs_dncregmax = 4000
EOF

# Recharger la configuration MVFS
cleartool setsite -mvfsopt mvfs_largeinit=4000

# Vérifier les statistiques MVFS
cleartool lsview -host $(hostname) -l | grep "cache"
cat /proc/mvfs/stats

# Optimiser les specs de configuration
# Éviter les rules trop complexes
# Préférer les config specs avec time rules limitées
cleartool catcs
\`\`\`

## 4. Storage Management

\`\`\`bash
# Analyser l'utilisation du stockage
cleartool space -vob /vobs/project_vob -a
cleartool describe -l vob:/vobs/project_vob

# Identifier les grosses versions
cleartool find /vobs/project_vob -type f -name "*.o" -print
cleartool find /vobs/project_vob -version "created_since(01-Jan-2023)" -print | wc -l

# Déplacer un VOB storage
cleartool lock vob:/vobs/project_vob
# Copier le storage
rsync -av /vobstore/project_vob.vbs /new_storage/project_vob.vbs
cleartool unregister -vob /vobstore/project_vob.vbs
cleartool register -vob /new_storage/project_vob.vbs
cleartool unlock vob:/vobs/project_vob

# Cleanup des vues orphelines
cleartool lsview -long | grep "stale"
cleartool rmview -all -uuid view_uuid

# Reformater un VOB (compaction)
cleartool reformatvob /vobs/project_vob
\`\`\`

## 5. Monitoring et diagnostics

\`\`\`bash
# Vérifier la santé des VOBs
cleartool checkvob -data -pool /vobs/project_vob

# Statistiques du serveur
cleartool hostinfo -l
cleartool lsvob -l /vobs/project_vob

# Tracer les opérations lentes
export TRACE_SUBSYS=mvfs
cleartool setview -trace my_view

# Logs ClearCase
tail -f /var/adm/rational/clearcase/log/vobd_log
tail -f /var/adm/rational/clearcase/log/view_log

# Test de connectivité
cleartool lsvob -host vob_server
cleartool hostinfo -l vob_server
albd_list -h vob_server
\`\`\`

## 6. Cleanup automatisé

\`\`\`bash
#!/bin/bash
# maintenance.sh - Script de maintenance hebdomadaire ClearCase
LOG=/var/log/clearcase_maintenance.log
echo "=== Maintenance ClearCase $(date) ===" >> $LOG

# 1. Scrubbing des DOs
echo "Scrubbing..." >> $LOG
scrubber -e -k 14 /vobs/project_vob >> $LOG 2>&1

# 2. Nettoyage des vues inutilisées (pas d'accès > 90 jours)
echo "Cleanup des vues stale..." >> $LOG
cleartool lsview -long | grep -B5 "Last accessed.*202[0-2]" | grep "Tag:" | awk '{print $2}' >> $LOG

# 3. Vérification d'intégrité
echo "Check VOB integrity..." >> $LOG
cleartool checkvob -fix /vobs/project_vob >> $LOG 2>&1

# 4. Espace disque
echo "Espace disque:" >> $LOG
cleartool space -vob /vobs/project_vob >> $LOG

echo "=== Maintenance terminée ===" >> $LOG
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Maintenance ClearCase

### Exercice 1 : VOB Scrubbing

\`\`\`bash
# Vérifier l'espace avant
cleartool space -vob /vobs/project_vob
# Exécuter le scrubbing (DOs de plus de 7 jours)
scrubber -e -k 7 /vobs/project_vob
# Vérifier l'espace après
cleartool space -vob /vobs/project_vob
\`\`\`

### Exercice 2 : Gestion des verrous

\`\`\`bash
# Verrouiller une branche de release
cleartool lock brtype:release_1.0@/vobs/project_vob
# Tenter un checkout (doit échouer)
cleartool checkout -nc /vobs/project_vob/src/main.c
# Déverrouiller
cleartool unlock brtype:release_1.0@/vobs/project_vob
\`\`\`

### Exercice 3 : Diagnostics de performance

\`\`\`bash
# Analyser les stats MVFS
cat /proc/mvfs/stats
# Identifier les config specs complexes
cleartool catcs
# Optimiser : réduire le nombre de rules
\`\`\`

### Exercice 4 : Intégrité du VOB

\`\`\`bash
# Vérifier l'intégrité
cleartool checkvob -data /vobs/project_vob
# Réparer si nécessaire
cleartool checkvob -fix /vobs/project_vob
\`\`\`

### Exercice 5 : Script de maintenance automatisé

\`\`\`bash
# Créer un script cron pour maintenance hebdomadaire
# Scrubbing + check intégrité + rapport espace
chmod +x maintenance.sh
crontab -e  # Ajouter: 0 3 * * 0 /opt/scripts/maintenance.sh
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Le scrubbing nettoie les Derived Objects expirés et libère de l\'espace disque',
      'Les locks contrôlent l\'accès aux branches et éléments pendant les releases',
      'Le tuning MVFS (cache, threads) améliore la performance des vues dynamiques',
      'cleartool space et checkvob surveillent l\'espace et l\'intégrité des VOBs',
      'Les vues stale (non utilisées) doivent être supprimées régulièrement',
      'reformatvob compacte un VOB pour récupérer l\'espace des versions supprimées',
      'La maintenance planifiée (cron) automatise scrubbing, vérification et reporting',
      'Les logs vobd_log et view_log aident au diagnostic des problèmes de performance'
    ]),
  },

  // ============================================================
  // CLEARCASE - Module 10: Projet final ClearCase
  // ============================================================
  {
    id: 'cc-10',
    courseId: 'clearcase',
    title: 'Projet final ClearCase',
    duration: '5h',
    orderIndex: 10,
    theoryContent: `# Projet final ClearCase : UCM complet

## Objectif

Mettre en place un projet UCM (Unified Change Management) complet : composants, streams, activités, baselines, workflow deliver/rebase, et intégration avec le processus de développement.

## 1. Architecture UCM

\`\`\`
┌─────────────────────────────────────────┐
│           UCM PROJECT                    │
│                                          │
│  ┌─────────────────────────────────┐    │
│  │     Integration Stream          │    │
│  │  (baseline: APP_V2.0_BL3)      │    │
│  └──────┬──────────────┬──────────┘    │
│         │              │                 │
│  ┌──────▼─────┐ ┌─────▼──────┐         │
│  │ Dev Stream │ │ Dev Stream  │         │
│  │  (Alice)   │ │   (Bob)     │         │
│  │ activity:  │ │ activity:   │         │
│  │ feat-login │ │ fix-perf    │         │
│  └────────────┘ └─────────────┘         │
│                                          │
│  Components: [app_component,             │
│               lib_component,             │
│               test_component]            │
└─────────────────────────────────────────┘
\`\`\`

## 2. Création du projet UCM

\`\`\`bash
# 1. Créer les VOBs (composant et PVOB admin)
cleartool mkvob -ucmproject -tag /vobs/project_pvob -stgloc vob_storage
cleartool mkvob -tag /vobs/app_vob -stgloc vob_storage
cleartool mkvob -tag /vobs/lib_vob -stgloc vob_storage

# 2. Créer les composants
cleartool mkcomp -root /vobs/app_vob/src app_component@/vobs/project_pvob
cleartool mkcomp -root /vobs/lib_vob/lib lib_component@/vobs/project_pvob

# 3. Créer le projet UCM
cleartool mkproject -in RootFolder@/vobs/project_pvob \\
  -policy POLICY_INTERPROJECT_DELIVER \\
  -comment "Projet principal de développement" \\
  my_project@/vobs/project_pvob

# 4. Créer le stream d'intégration
cleartool mkstream -integration \\
  -in my_project@/vobs/project_pvob \\
  -baseline app_INITIAL@/vobs/project_pvob,lib_INITIAL@/vobs/project_pvob \\
  integration_stream@/vobs/project_pvob

# 5. Créer les streams de développement
cleartool mkstream \\
  -in my_project@/vobs/project_pvob \\
  -target integration_stream@/vobs/project_pvob \\
  alice_dev@/vobs/project_pvob

cleartool mkstream \\
  -in my_project@/vobs/project_pvob \\
  -target integration_stream@/vobs/project_pvob \\
  bob_dev@/vobs/project_pvob
\`\`\`

## 3. Workflow de développement UCM

\`\`\`bash
# === CYCLE DE VIE D'UNE ACTIVITÉ ===

# 1. Créer une vue pour le stream de dev
cleartool mkview -tag alice_view -stream alice_dev@/vobs/project_pvob -stgloc view_storage

# 2. Se placer dans la vue
cleartool setview alice_view

# 3. Créer et set une activité
cleartool mkactivity -headline "Implémenter l'authentification" feat_auth@/vobs/project_pvob
cleartool setactivity feat_auth@/vobs/project_pvob

# 4. Développer (checkout, modifier, checkin)
cleartool checkout -c "Add auth module" /vobs/app_vob/src/auth.c
# ... modification du fichier ...
cleartool checkin -c "Implement JWT authentication" /vobs/app_vob/src/auth.c

# 5. Compléter l'activité
cleartool chactivity -complete feat_auth@/vobs/project_pvob
\`\`\`

## 4. Deliver et Rebase

\`\`\`bash
# === DELIVER : du stream de dev vers l'intégration ===
cleartool deliver -stream alice_dev@/vobs/project_pvob \\
  -to integration_stream@/vobs/project_pvob \\
  -activities feat_auth@/vobs/project_pvob \\
  -complete

# En cas de conflit
cleartool deliver -stream alice_dev@/vobs/project_pvob -force
# Résoudre les conflits
cleartool findmerge . -fver .../integration_stream/LATEST -merge
cleartool deliver -complete

# === REBASE : synchroniser le stream de dev avec l'intégration ===
cleartool rebase -stream bob_dev@/vobs/project_pvob \\
  -baseline APP_V2.0_BL2@/vobs/project_pvob \\
  -complete

# Vérifier le statut
cleartool lsstream -l alice_dev@/vobs/project_pvob
\`\`\`

## 5. Baselines

\`\`\`bash
# Créer une baseline d'intégration
cleartool mkbl -view integration_view \\
  -component app_component@/vobs/project_pvob \\
  -full \\
  APP_V2.0_BL3@/vobs/project_pvob

# Promouvoir une baseline (changer son niveau)
cleartool chbl -level RELEASED APP_V2.0_BL3@/vobs/project_pvob

# Niveaux de promotion : INITIAL → BUILT → TESTED → RELEASED → REJECTED

# Lister les baselines
cleartool lsbl -component app_component@/vobs/project_pvob

# Comparer deux baselines
cleartool diffbl -activities APP_V2.0_BL2 APP_V2.0_BL3
\`\`\`

## 6. Politiques du projet

\`\`\`bash
# Configurer les politiques UCM
cleartool chproject -policy POLICY_DELIVER_REQUIRE_REBASE my_project@/vobs/project_pvob
cleartool chproject -policy POLICY_DELIVER_NCO_DEVSTR my_project@/vobs/project_pvob

# Politiques disponibles :
# POLICY_INTERPROJECT_DELIVER - autorise deliver entre projets
# POLICY_DELIVER_REQUIRE_REBASE - forcer le rebase avant deliver
# POLICY_DELIVER_NCO_DEVSTR - no checkout during deliver
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Projet final ClearCase UCM

### Étape 1 : Créer l'infrastructure UCM

\`\`\`bash
# Créer le PVOB et les VOBs composants
cleartool mkvob -ucmproject -tag /vobs/tp_pvob -stgloc vob_stg
cleartool mkvob -tag /vobs/tp_app -stgloc vob_stg
# Créer les composants et le projet
cleartool mkcomp -root /vobs/tp_app app_comp@/vobs/tp_pvob
cleartool mkproject -in RootFolder@/vobs/tp_pvob tp_project@/vobs/tp_pvob
\`\`\`

### Étape 2 : Configurer les streams

\`\`\`bash
# Stream d'intégration + 2 streams de développement
cleartool mkstream -integration -in tp_project integration@/vobs/tp_pvob
cleartool mkstream -in tp_project -target integration dev_alice@/vobs/tp_pvob
cleartool mkstream -in tp_project -target integration dev_bob@/vobs/tp_pvob
\`\`\`

### Étape 3 : Cycle de développement complet

\`\`\`bash
# Créer une vue, une activité, développer, deliver
cleartool mkview -tag alice_v -stream dev_alice@/vobs/tp_pvob
cleartool setview alice_v
cleartool mkactivity -headline "Feature X" feat_x@/vobs/tp_pvob
cleartool setactivity feat_x
# ... développer ...
cleartool deliver -complete
\`\`\`

### Étape 4 : Créer des baselines et promouvoir

\`\`\`bash
cleartool mkbl -full APP_BL1@/vobs/tp_pvob
cleartool chbl -level TESTED APP_BL1@/vobs/tp_pvob
cleartool chbl -level RELEASED APP_BL1@/vobs/tp_pvob
\`\`\`

### Étape 5 : Rebase et résolution de conflits

\`\`\`bash
cleartool rebase -stream dev_bob -baseline APP_BL1 -complete
# Simuler un conflit et le résoudre
cleartool findmerge . -merge
\`\`\`
`,
    keyPoints: JSON.stringify([
      'UCM structure le développement avec projets, streams, activités et baselines',
      'Le stream d\'intégration centralise les deliveries de tous les développeurs',
      'Le deliver pousse les changements du stream de dev vers l\'intégration',
      'Le rebase synchronise un stream de dev avec la dernière baseline d\'intégration',
      'Les baselines marquent un état stable avec niveaux de promotion (BUILT→TESTED→RELEASED)',
      'Les composants regroupent les éléments liés dans un même VOB',
      'Les politiques UCM imposent le rebase avant deliver et contrôlent le workflow',
      'diffbl compare les activités entre deux baselines pour le suivi des changements'
    ]),
  },



  // ============================================================
  // KLOCWORK - Module 9 & 10
  // ============================================================
  {
    id: 'kw-09',
    courseId: 'klocwork',
    title: 'Klocwork et les standards industriels',
    duration: '3h30',
    orderIndex: 9,
    theoryContent: `# Klocwork et les standards industriels

## 1. Standards supportés

Klocwork supporte les principaux standards de sécurité et de sûreté industrielle pour le code C/C++/Java : MISRA C/C++, CERT C/C++, AUTOSAR C++14, CWE, IEC 61508, ISO 26262, et DO-178C.

## 2. Configuration AUTOSAR C++14

\`\`\`bash
# Activer les checkers AUTOSAR
kwcheck run --checkers autosar -b kw_build
kwadmin set-project-property my_project AUTOSAR.enabled true

# Lister les règles AUTOSAR actives
kwcheck list-checkers | grep AUTOSAR

# Exemple de violations AUTOSAR :
# AUTOSAR.A0-1-1 : variable non utilisée
# AUTOSAR.A2-10-1 : identifiant cache un identifiant externe
# AUTOSAR.A5-1-1 : opérateur de conversion implicite
# AUTOSAR.M0-1-3 : code mort détecté

# Configurer la sévérité par règle
cat > autosar_config.kb << 'EOF'
checker AUTOSAR.A0-1-1 severity=mandatory
checker AUTOSAR.A2-10-1 severity=required
checker AUTOSAR.M0-1-3 severity=advisory
EOF
kwcheck import autosar_config.kb
\`\`\`

## 3. IEC 61508 et ISO 26262

\`\`\`bash
# IEC 61508 - Sûreté fonctionnelle (systèmes industriels)
# Niveaux SIL (Safety Integrity Level) 1-4
kwcheck run --taxonomy "IEC 61508" -b kw_build

# ISO 26262 - Sûreté automobile
# Niveaux ASIL (A, B, C, D)
kwcheck run --taxonomy "ISO 26262" -b kw_build

# Configurer selon le niveau de sûreté
# SIL-3/4 ou ASIL-C/D : toutes les règles obligatoires
# SIL-1/2 ou ASIL-A/B : règles requises seulement
cat > safety_config.kb << 'EOF'
# Configuration SIL-3
taxonomy "IEC 61508"
compliance_level SIL-3
exclude_advisory false
EOF
\`\`\`

## 4. Custom taxonomies

\`\`\`bash
# Créer une taxonomie personnalisée
cat > company_taxonomy.kb << 'EOF'
# Taxonomie entreprise combinant plusieurs standards
taxonomy "Company Safety Standard"
description "Standard interne basé sur MISRA + CERT + AUTOSAR"

# Inclure les règles MISRA obligatoires
include MISRA.RULE.1.1
include MISRA.RULE.1.2
include MISRA.RULE.8.1

# Inclure les règles CERT critiques
include CERT.ARR.30-C
include CERT.ERR.30-C
include CERT.MEM.35-C

# Inclure les règles AUTOSAR requises
include AUTOSAR.A0-1-1
include AUTOSAR.A2-10-1

# Exclure les règles non applicables
exclude MISRA.RULE.21.2  # Pas applicable dans notre contexte
EOF

kwadmin import-taxonomy company_taxonomy.kb
kwcheck run --taxonomy "Company Safety Standard" -b kw_build
\`\`\`

## 5. Certification evidence

\`\`\`bash
# Générer les preuves pour certification
kwcheck report --format=xml --output=certification_evidence.xml \\
  --taxonomy "IEC 61508" --compliance-level SIL-3

# Rapport détaillé avec justifications des déviations
kwcheck report --format=pdf --include-deviations \\
  --output=compliance_report.pdf

# Export des métriques pour le dossier de sûreté
kwcheck metrics --project my_project \\
  --metrics "total_issues,critical_issues,open_deviations" \\
  --format csv > metrics_history.csv

# Traçabilité : lier les résultats aux exigences
kwcheck set-issue-property ISSUE_ID \\
  requirement_id="SRS-SAFETY-042" \\
  justification="Deviation acceptée - risque mitigé par test TST-108"
\`\`\`

## 6. Intégration CI/CD avec compliance gate

\`\`\`bash
#!/bin/bash
# ci_compliance_check.sh
PROJECT="my_safety_project"
TAXONOMY="IEC 61508"
MAX_CRITICAL=0
MAX_HIGH=5

# Lancer l'analyse
kwinject make -j4
kwcheck run --taxonomy "$TAXONOMY" -b kw_build

# Compter les issues
CRITICAL=$(kwcheck list --severity Critical --status Analyze | wc -l)
HIGH=$(kwcheck list --severity High --status Analyze | wc -l)

echo "Résultats compliance $TAXONOMY:"
echo "  Critical: $CRITICAL (max: $MAX_CRITICAL)"
echo "  High: $HIGH (max: $MAX_HIGH)"

if [ $CRITICAL -gt $MAX_CRITICAL ] || [ $HIGH -gt $MAX_HIGH ]; then
    echo "❌ COMPLIANCE GATE FAILED"
    kwcheck report --format=html --output=compliance_failure.html
    exit 1
fi
echo "✅ COMPLIANCE GATE PASSED"
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Standards industriels avec Klocwork

### Exercice 1 : Configurer MISRA C pour un projet

\`\`\`bash
# Créer un projet avec MISRA C:2012
kwinject make -C src/
kwcheck create -b kw_build --taxonomy "MISRA C:2012"
kwcheck run
kwcheck list --severity Critical,Error
\`\`\`

### Exercice 2 : Analyse AUTOSAR C++14

\`\`\`bash
# Activer les checkers AUTOSAR
kwcheck run --checkers autosar -b kw_build
kwcheck list --taxonomy "AUTOSAR C++14" | head -20
\`\`\`

### Exercice 3 : Créer une taxonomie personnalisée

\`\`\`bash
# Combiner MISRA + CERT pour votre projet
# Configurer les sévérités adaptées
# Exclure les règles non applicables avec justification
kwadmin import-taxonomy company_taxonomy.kb
\`\`\`

### Exercice 4 : Générer les preuves de certification

\`\`\`bash
# Rapport XML pour l'organisme de certification
kwcheck report --format=xml --taxonomy "IEC 61508" --output=evidence.xml
# Documenter les déviations acceptées
\`\`\`

### Exercice 5 : Gate CI/CD de conformité

\`\`\`bash
# Intégrer le script de compliance dans le pipeline
# Vérifier que le build échoue si des issues critiques existent
./ci_compliance_check.sh
echo "Exit code: $?"
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Klocwork supporte MISRA C/C++, CERT, AUTOSAR, CWE, IEC 61508 et ISO 26262',
      'Les niveaux de sûreté (SIL/ASIL) déterminent le jeu de règles à appliquer',
      'Les taxonomies personnalisées combinent des règles de plusieurs standards',
      'Les déviations documentées justifient les exceptions pour la certification',
      'Le rapport de conformité fournit les preuves nécessaires aux organismes certificateurs',
      'L\'intégration CI/CD bloque les builds non conformes aux standards de sûreté',
      'Les métriques historiques démontrent l\'amélioration continue de la conformité',
      'La traçabilité vers les exigences lie chaque issue à une exigence de sûreté'
    ]),
  },

  {
    id: 'kw-10',
    courseId: 'klocwork',
    title: 'Projet final Klocwork',
    duration: '5h',
    orderIndex: 10,
    theoryContent: `# Projet final Klocwork : Analyse complète d'un projet C/C++

## Objectif

Configurer une analyse Klocwork complète pour un projet C/C++ : build specification, checkers personnalisés, intégration CI/CD, rapports de conformité et gestion des faux positifs.

## 1. Build specification

\`\`\`bash
# Capturer la compilation avec kwinject
cd /path/to/project
kwinject --output kw_build.out make -j8 clean all

# Alternative avec CMake
mkdir build && cd build
kwinject cmake .. -DCMAKE_BUILD_TYPE=Release
kwinject make -j8

# Vérifier le build spec
kwcheck list-conf -b kw_build.out
\`\`\`

## 2. Configuration des checkers

\`\`\`bash
# Lister tous les checkers disponibles
kwcheck list-checkers --all

# Créer un profil de configuration
cat > project_checkers.kb << 'EOF'
# Activer les checkers critiques
checker MISRA.RULE.1.* enable
checker MISRA.RULE.8.* enable
checker CERT.* enable
checker SV.* enable        # Security Vulnerabilities
checker NPD.* enable       # Null Pointer Dereference
checker MLK.* enable       # Memory Leak
checker UNINIT.* enable    # Uninitialized variables
checker ABV.* enable       # Array Bounds Violation
checker PORTING.* enable   # Portability issues

# Désactiver les checkers non pertinents
checker METRICS.* disable  # Métriques uniquement
checker STYLE.* disable    # Style cosmétique

# Configurer les sévérités
severity MISRA.RULE.1.1 Critical
severity NPD.CHECK Error
severity MLK.MUST Error
severity SV.TAINTED.INJECTION Critical
EOF

kwcheck import project_checkers.kb
\`\`\`

## 3. Analyse locale et serveur

\`\`\`bash
# Analyse locale (développeur)
kwcheck create --build-spec kw_build.out
kwcheck run
kwcheck list --severity Critical,Error --status Analyze
kwcheck list --groupby file --sort-by severity

# Soumission au serveur Klocwork
kwbuildproject --url http://kw-server:8080/my_project -b kw_build.out
kwadmin load my_project --url http://kw-server:8080

# Vérifier le dashboard
kwadmin get-project-status --url http://kw-server:8080 my_project
\`\`\`

## 4. Gestion des faux positifs

\`\`\`bash
# Marquer un faux positif dans le code
// kwnotrace: NPD.CHECK - ptr validé par assert en amont
void process(Data* ptr) {
    assert(ptr != NULL);
    ptr->value = 42;  // Klocwork ignore cette issue
}

# Marquer via l'API
kwcheck set-status ISSUE_ID "Not a Problem" \\
  --comment "Faux positif: variable initialisée dans le constructeur"

# Exporter les exclusions
kwcheck export-config --issues-filter "status=Not a Problem" > exclusions.kb
\`\`\`

## 5. Rapport de conformité complet

\`\`\`bash
# Générer un rapport HTML détaillé
kwcheck report \\
  --format html \\
  --output compliance_report.html \\
  --include-metrics \\
  --include-trends \\
  --taxonomy "MISRA C:2012"

# Rapport CSV pour Excel
kwcheck report \\
  --format csv \\
  --output issues_export.csv \\
  --fields "id,file,line,severity,checker,message,status"

# Métriques de qualité
kwcheck metrics \\
  --output metrics.json \\
  --format json \\
  --metrics "files_analyzed,total_issues,critical,error,warning,fixed_since_last"
\`\`\`

## 6. Intégration Jenkins

\`\`\`groovy
pipeline {
    agent any
    stages {
        stage('Build & Analyze') {
            steps {
                sh 'kwinject make -j8 -b kw_build.out'
                sh 'kwcheck create -b kw_build.out'
                sh 'kwcheck run'
            }
        }
        stage('Compliance Gate') {
            steps {
                script {
                    def critical = sh(script: 'kwcheck list --severity Critical --status Analyze | wc -l', returnStdout: true).trim().toInteger()
                    if (critical > 0) {
                        sh 'kwcheck report --format html --output compliance.html'
                        archiveArtifacts 'compliance.html'
                        error("\\\${critical} issues critiques détectées")
                    }
                }
            }
        }
        stage('Upload to Server') {
            steps {
                sh 'kwbuildproject --url http://kw-server:8080/project -b kw_build.out'
                sh 'kwadmin load project --url http://kw-server:8080'
            }
        }
    }
}
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Projet final Klocwork

### Étape 1 : Créer le build specification

\`\`\`bash
cd my-c-project
kwinject make clean all -b kw_build.out
kwcheck list-conf -b kw_build.out
\`\`\`

### Étape 2 : Configurer les checkers

\`\`\`bash
# Importer la configuration MISRA + CERT
kwcheck import project_checkers.kb
kwcheck list-checkers --enabled | wc -l
\`\`\`

### Étape 3 : Analyser et trier les résultats

\`\`\`bash
kwcheck run
kwcheck list --severity Critical,Error
kwcheck list --groupby checker --sort-by count
# Identifier les faux positifs et les marquer
\`\`\`

### Étape 4 : Intégrer dans le CI

\`\`\`bash
# Créer le script de gate
# S'assurer que le build échoue si issues critiques > 0
./ci_compliance_check.sh || exit 1
\`\`\`

### Étape 5 : Rapport final

\`\`\`bash
kwcheck report --format html --output final_report.html \\
  --include-metrics --taxonomy "MISRA C:2012"
# Ouvrir le rapport et vérifier la conformité
\`\`\`
`,
    keyPoints: JSON.stringify([
      'kwinject capture la compilation pour créer le build specification nécessaire à l\'analyse',
      'Les fichiers .kb configurent les checkers, sévérités et exclusions du projet',
      'L\'analyse locale (kwcheck) donne un feedback rapide au développeur',
      'Le serveur Klocwork centralise les résultats et suit l\'évolution dans le temps',
      'Les annotations //kwnotrace suppriment les faux positifs directement dans le code',
      'L\'intégration CI/CD bloque les builds avec des issues de sévérité Critical/Error',
      'Les rapports HTML/CSV documentent la conformité pour les audits',
      'La combinaison MISRA+CERT+custom couvre à la fois sûreté et sécurité'
    ]),
  },



  // ============================================================
  // JIRA - Module 9 & 10
  // ============================================================
  {
    id: 'jira-09',
    courseId: 'jira',
    title: 'Jira pour les équipes distribuées',
    duration: '3h',
    orderIndex: 9,
    theoryContent: `# Jira pour les équipes distribuées

## 1. Collaboration cross-timezone

Les équipes distribuées géographiquement nécessitent des pratiques adaptées dans Jira : workflows asynchrones, documentation dans les tickets, time tracking et SLA management.

## 2. Workflows asynchrones

\`\`\`yaml
# Workflow adapté aux équipes distribuées
States:
  - Open (Assignee: Product Owner)
  - Ready for Dev (Assignee: automatic via round-robin)
  - In Progress (Developer picks up)
  - In Review (async code review - 24h SLA)
  - Ready for QA (timezone handoff)
  - Testing (QA team)
  - Done

Transitions avec automation:
  - "Start Progress" → assign au développeur, log start time
  - "Submit for Review" → notify reviewers, start 24h SLA timer
  - "Approve" → move to Ready for QA, assign QA from next timezone
  - "Reject" → back to In Progress, add comment obligatoire
\`\`\`

## 3. Automation Rules pour le handoff

\`\`\`json
{
  "name": "Timezone Handoff - Assign QA",
  "trigger": { "type": "field_value_changed", "field": "status", "value": "Ready for QA" },
  "conditions": [
    { "type": "issue_type", "value": "Story" }
  ],
  "actions": [
    {
      "type": "assign_issue",
      "value": "{{#smart_assign}}team=QA,timezone=next{{/smart_assign}}"
    },
    {
      "type": "add_comment",
      "value": "🌍 Handoff: Ticket prêt pour QA. Assigné automatiquement au prochain timezone actif."
    },
    {
      "type": "send_notification",
      "value": { "channel": "#qa-team", "message": "New ticket ready for testing: {{issue.key}}" }
    }
  ]
}
\`\`\`

## 4. Time Tracking et SLA

\`\`\`bash
# API REST - Créer un SLA
curl -u admin:token -X POST "http://jira:8080/rest/api/2/sla" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Review SLA",
    "description": "Code review must complete within 24h",
    "calendars": ["business_hours_global"],
    "goals": [
      {"status": "In Review", "duration": "24h", "priority": ["High", "Critical"]}
    ]
  }'

# Rapport de temps par timezone
curl -u admin:token "http://jira:8080/rest/api/2/search" \\
  -G --data-urlencode "jql=project=PROJ AND timespent > 0 ORDER BY updated DESC" \\
  --data-urlencode "fields=summary,timespent,assignee,status"
\`\`\`

## 5. Dashboards pour équipes distribuées

\`\`\`
Dashboard "Global Team Status":
├── Gadget: Wallboard (statut en temps réel)
├── Gadget: Activity Stream (dernières 24h)
├── Gadget: SLA Health (% dans les délais)
├── Gadget: Workload by Timezone
│   - EMEA: 12 tickets in progress
│   - Americas: 8 tickets in progress
│   - APAC: 5 tickets in progress
├── Gadget: Blocked Issues (cross-team dependencies)
└── Gadget: Sprint Burndown
\`\`\`

## 6. Communication patterns

\`\`\`yaml
# Structure de commentaire asynchrone recommandée
Comment Template:
  Context: "Pourquoi j'écris ce commentaire"
  Decision/Question: "Ce qui nécessite une action"
  Options: "Les alternatives considérées"
  Deadline: "Quand une réponse est nécessaire"
  Fallback: "Ce qui se passe si pas de réponse"

# Exemple:
# CONTEXT: L'API users retourne 500 en charge
# QUESTION: Faut-il ajouter du caching Redis ou augmenter les replicas?
# OPTIONS: A) Redis (2j dev) B) HPA +3 replicas (30min)
# DEADLINE: Réponse nécessaire avant demain 10h CET
# FALLBACK: Si pas de réponse, je pars sur option B (reversible)
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Jira pour équipes distribuées

### Exercice 1 : Créer un workflow async

\`\`\`
Configurer un workflow avec les états :
Open → Ready → In Progress → In Review (24h SLA) → QA → Done
Ajouter des transitions avec commentaire obligatoire
\`\`\`

### Exercice 2 : Automation rules de handoff

\`\`\`
Créer une rule : quand status = "Ready for QA"
→ Assigner au prochain QA disponible
→ Poster un commentaire de contexte
→ Notifier le canal Slack #qa-team
\`\`\`

### Exercice 3 : Dashboard multi-timezone

\`\`\`
Créer un dashboard avec :
- Activity stream des dernières 24h
- Workload par assignee/timezone
- SLA compliance chart
- Blocked issues filter
\`\`\`

### Exercice 4 : Time tracking report

\`\`\`
JQL: project = PROJ AND timespent > 0 AND updated >= -7d
Exporter le rapport de temps par personne et par jour
Analyser la répartition du travail entre timezones
\`\`\`

### Exercice 5 : SLA monitoring

\`\`\`
Configurer un SLA "Review within 24h"
Vérifier le % de tickets dans les délais
Créer une alerte quand SLA < 90%
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Les workflows asynchrones incluent des SLA et des notifications automatiques de handoff',
      'Les automation rules assignent automatiquement les tickets au prochain timezone actif',
      'Le time tracking par timezone identifie les déséquilibres de charge entre équipes',
      'Les dashboards globaux montrent le statut en temps réel pour toutes les timezones',
      'Les commentaires structurés (Context/Question/Deadline/Fallback) améliorent la communication async',
      'Les SLA mesurent le temps de réponse et alertent quand les délais sont dépassés',
      'Les notifications cross-timezone évitent les blocages par manque de communication',
      'Les rapports de vélocité par timezone aident à équilibrer la charge de travail'
    ]),
  },

  {
    id: 'jira-10',
    courseId: 'jira',
    title: 'Projet final Jira',
    duration: '5h',
    orderIndex: 10,
    theoryContent: `# Projet final Jira : Configuration complète

## Objectif

Configurer un projet Jira de A à Z : workflows personnalisés, écrans, schémas de permissions, automation rules, boards, dashboards et reporting.

## 1. Création du projet

\`\`\`bash
# Créer le projet via API REST
curl -u admin:token -X POST "http://jira:8080/rest/api/2/project" \\
  -H "Content-Type: application/json" \\
  -d '{
    "key": "DEVOPS",
    "name": "DevOps Platform",
    "projectTypeKey": "software",
    "lead": "admin",
    "description": "Projet de la plateforme DevOps"
  }'
\`\`\`

## 2. Workflow personnalisé

\`\`\`
Statuts:
  Backlog → Selected → In Progress → Code Review → QA → Staging → Production → Done

Transitions:
  - "Select for Sprint": Backlog → Selected (Scrum Master)
  - "Start Work": Selected → In Progress (Developer)
  - "Submit Review": In Progress → Code Review (Developer)
  - "Approve": Code Review → QA (Reviewer)
  - "Reject": Code Review → In Progress (Reviewer, comment requis)
  - "QA Pass": QA → Staging (QA Engineer)
  - "QA Fail": QA → In Progress (QA, comment requis)
  - "Deploy Prod": Staging → Production (Release Manager)
  - "Verify": Production → Done (Product Owner)

Post-functions:
  - "Start Work": assign to current user, log work start
  - "Deploy Prod": update fix version, send release notification
\`\`\`

## 3. Automation Rules

\`\`\`json
[
  {
    "name": "Auto-assign on Sprint Start",
    "trigger": "sprint_started",
    "action": "assign_from_capacity_planning"
  },
  {
    "name": "Close sub-tasks when parent Done",
    "trigger": "parent_status_changed_to_done",
    "action": "transition_subtasks_to_done"
  },
  {
    "name": "Notify on SLA breach",
    "trigger": "sla_breached",
    "action": "escalate_to_team_lead"
  },
  {
    "name": "Auto-label PR linked issues",
    "trigger": "development_branch_created",
    "action": "add_label_in_development"
  }
]
\`\`\`

## 4. Boards Scrum et Kanban

\`\`\`
Board Scrum "Sprint Board":
  Columns: Backlog | Selected | In Progress | Review | QA | Done
  Swimlanes: by Priority (Critical/High on top)
  Quick Filters:
    - "My Issues": assignee = currentUser()
    - "Blocked": status = Blocked OR flagged = Impediment
    - "No Estimate": originalEstimate is EMPTY

Board Kanban "Ops Board":
  Columns: To Do | In Progress | Review | Done
  WIP Limits: In Progress=5, Review=3
  Swimlanes: by Issue Type (Bug/Task/Improvement)
\`\`\`

## 5. JQL avancé pour le reporting

\`\`\`bash
# Vélocité par sprint
JQL: project = DEVOPS AND sprint in openSprints() AND status = Done

# Bugs critiques non résolus
JQL: project = DEVOPS AND type = Bug AND priority in (Critical, Blocker) AND status != Done

# Tickets sans estimation
JQL: project = DEVOPS AND sprint in openSprints() AND originalEstimate is EMPTY AND type in (Story, Task)

# Lead time (cycle time)
JQL: project = DEVOPS AND status changed to "Done" after -30d ORDER BY resolved DESC

# Workload par développeur
JQL: project = DEVOPS AND sprint in openSprints() AND assignee is not EMPTY AND status != Done
\`\`\`

## 6. Permissions Scheme

\`\`\`
Roles:
  - Admin: Full project admin
  - Developer: Create/Edit issues, transition, comment
  - QA: Transition QA states, add attachments
  - Viewer: View only, add comments
  - Release Manager: Deploy transitions, manage versions

Permissions:
  - Browse Project: All roles
  - Create Issues: Developer, QA, Admin
  - Edit Issues: Developer (own), Admin (all)
  - Transition Issues: Based on workflow conditions
  - Delete Issues: Admin only
  - Manage Sprints: Admin, Scrum Master
  - Administer Project: Admin only
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Projet final Jira

### Étape 1 : Créer le projet et le workflow

\`\`\`
1. Créer un projet Scrum "DEVOPS"
2. Configurer le workflow personnalisé (8 statuts)
3. Ajouter les post-functions et conditions de transition
4. Associer le workflow au projet
\`\`\`

### Étape 2 : Configurer les boards

\`\`\`
1. Board Scrum avec swimlanes par priorité
2. Quick Filters : My Issues, Blocked, No Estimate
3. WIP limits sur les colonnes Review et QA
4. Board Kanban pour l'équipe Ops
\`\`\`

### Étape 3 : Automation Rules

\`\`\`
1. Auto-assign quand un sprint démarre
2. Notification Slack quand un bug Critical est créé
3. Escalade automatique après 48h sans mouvement
4. Fermer les sous-tâches quand le parent est Done
\`\`\`

### Étape 4 : Dashboards et reporting

\`\`\`
1. Dashboard équipe : burndown, vélocité, cumulative flow
2. Dashboard management : SLA, lead time, bug trends
3. Rapports JQL personnalisés
\`\`\`

### Étape 5 : Permissions et sécurité

\`\`\`
1. Configurer les rôles (Admin, Dev, QA, Viewer)
2. Appliquer le scheme de permissions
3. Tester les restrictions d'accès par rôle
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Un workflow personnalisé reflète le processus réel de l\'équipe avec les bonnes transitions',
      'Les automation rules éliminent les tâches manuelles récurrentes (assign, notify, escalate)',
      'Les boards Scrum et Kanban avec WIP limits visualisent le flux de travail',
      'Le JQL avancé permet de créer des filtres et rapports personnalisés puissants',
      'Le scheme de permissions contrôle finement qui peut faire quoi par rôle',
      'Les dashboards combinent gadgets pour une vue complète de l\'état du projet',
      'Les Quick Filters sur les boards aident à se concentrer sur les priorités',
      'La configuration complète inclut workflows, screens, fields et notifications'
    ]),
  },



  // ============================================================
  // CONFLUENCE, BITBUCKET, PROMETHEUS, GRAFANA, HELM, ARGOCD
  // ============================================================
  {
    id: 'conf-09', courseId: 'confluence', title: 'Confluence comme base de connaissances', duration: '3h', orderIndex: 9,
    theoryContent: `# Confluence comme base de connaissances

## 1. Architecture de l'information

Une base de connaissances efficace repose sur une architecture d'information réfléchie : taxonomie, hiérarchie des espaces, conventions de nommage et cycle de vie du contenu.

## 2. Structure recommandée

\`\`\`
Espace "Engineering Knowledge Base"
├── 🏠 Home (landing page avec navigation)
├── 📋 Getting Started/
│   ├── Onboarding Guide
│   ├── Development Environment Setup
│   └── Architecture Overview
├── 🔧 How-To Guides/
│   ├── Deployment Procedures
│   ├── Troubleshooting Guides
│   └── Runbooks
├── 📐 Architecture Decisions/
│   ├── ADR-001: Database Choice
│   ├── ADR-002: API Design
│   └── Template: ADR
├── 📚 API Documentation/
│   ├── REST API Reference
│   ├── GraphQL Schema
│   └── SDK Documentation
├── 🔄 Processes/
│   ├── Release Process
│   ├── Incident Response
│   └── Code Review Guidelines
└── 📦 Archive/
    └── (pages obsolètes)
\`\`\`

## 3. Optimisation de la recherche

\`\`\`bash
# Labels pour la catégorisation
# Ajouter des labels via l'API REST
curl -u admin:token -X POST "http://confluence:8090/rest/api/content/PAGE_ID/label" \\
  -H "Content-Type: application/json" \\
  -d '[{"prefix":"global","name":"runbook"},{"prefix":"global","name":"production"},{"prefix":"global","name":"database"}]'

# Conventions de labels :
# type: runbook, how-to, adr, reference, tutorial
# team: backend, frontend, devops, qa
# status: draft, review, approved, deprecated
# tech: kubernetes, docker, postgresql, redis

# Recherche CQL (Confluence Query Language)
# Trouver les runbooks de production
CQL: type = page AND label = "runbook" AND label = "production" AND space = "ENG"

# Pages modifiées récemment par l'équipe DevOps
CQL: type = page AND label = "devops" AND lastModified > "2024-01-01"

# Pages sans mise à jour depuis 6 mois (potentiellement obsolètes)
CQL: type = page AND space = "ENG" AND lastModified < "2023-07-01"
\`\`\`

## 4. Content Lifecycle Management

\`\`\`yaml
Cycle de vie d'une page :
  Draft → Review → Published → Maintenance → Deprecated → Archived

Règles :
  - Chaque page a un "Owner" (responsable de la mise à jour)
  - Review trimestrielle obligatoire pour les runbooks
  - Pages sans modification > 12 mois → notification au owner
  - Pages deprecated depuis > 3 mois → archivage automatique

Macros utiles :
  - Status macro : afficher le statut de la page (Draft/Current/Deprecated)
  - Info panel : "Last reviewed: 2024-01-15 by @alice"
  - Page Properties : métadonnées structurées
  - Content Report : lister les pages par label/espace
\`\`\`

## 5. Templates de pages

\`\`\`html
<!-- Template: Runbook -->
<h2>Résumé</h2>
<p>Description courte du problème et de la solution</p>

<h2>Symptômes</h2>
<ul><li>Alerte : nom de l'alerte</li><li>Impact : description de l'impact utilisateur</li></ul>

<h2>Diagnostic</h2>
<ac:structured-macro ac:name="code"><ac:parameter ac:name="language">bash</ac:parameter>
<ac:plain-text-body># Commandes de diagnostic
kubectl get pods -n production
kubectl logs deployment/app -n production --tail=100
</ac:plain-text-body></ac:structured-macro>

<h2>Résolution</h2>
<p>Étapes de résolution numérotées</p>

<h2>Prévention</h2>
<p>Actions pour éviter que le problème se reproduise</p>

<h2>Historique</h2>
<table><tr><th>Date</th><th>Occurrence</th><th>Résolution</th><th>Durée</th></tr></table>
\`\`\`

## 6. Intégration avec Jira

\`\`\`bash
# Lier une page Confluence à un ticket Jira
curl -u admin:token -X POST "http://confluence:8090/rest/api/content/PAGE_ID/link" \\
  -H "Content-Type: application/json" \\
  -d '{"type":"jira","value":{"issueKey":"PROJ-123"}}'

# Macros Jira dans Confluence :
# - Jira Issues macro : afficher une liste de tickets filtrée par JQL
# - Jira Chart macro : burndown, pie chart de statuts
# - Create Jira Issue macro : bouton pour créer un ticket depuis la page
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Base de connaissances Confluence

### Exercice 1 : Structurer l'espace
\`\`\`
Créer un espace "Engineering KB" avec la hiérarchie :
Getting Started, How-To, ADR, Processes, Archive
Définir les labels de catégorisation
\`\`\`

### Exercice 2 : Créer un template Runbook
\`\`\`
Créer un template avec : Résumé, Symptômes, Diagnostic, Résolution, Prévention
Utiliser les macros : code, status, info panel, expand
Tester en créant 3 runbooks à partir du template
\`\`\`

### Exercice 3 : Optimiser la recherche
\`\`\`
Ajouter des labels à toutes les pages existantes
Créer un Content Report macro sur la page d'accueil
Tester la recherche CQL pour trouver les runbooks production
\`\`\`

### Exercice 4 : Intégration Jira
\`\`\`
Ajouter un Jira Issues macro filtrant les bugs ouverts
Lier les pages de documentation aux epics Jira correspondants
\`\`\`

### Exercice 5 : Audit du contenu
\`\`\`
Identifier les pages obsolètes (> 6 mois sans mise à jour)
Assigner un owner à chaque page
Configurer des rappels de review trimestriels
\`\`\`
`,
    keyPoints: JSON.stringify([
      'L\'architecture de l\'information structure les espaces par type de contenu (runbook, ADR, how-to)',
      'Les labels systématiques (type, team, status, tech) améliorent la recherche',
      'Le CQL (Confluence Query Language) permet des recherches avancées multi-critères',
      'Le cycle de vie du contenu (Draft→Published→Deprecated→Archived) évite l\'information obsolète',
      'Les templates standardisent la création de runbooks, ADR et documentation',
      'L\'intégration Jira affiche les tickets liés directement dans les pages',
      'L\'audit régulier identifie les pages obsolètes et assigne des responsables',
      'La page d\'accueil avec Content Report offre une navigation centralisée'
    ]),
  },

  {
    id: 'conf-10', courseId: 'confluence', title: 'Projet final Confluence', duration: '4h', orderIndex: 10,
    theoryContent: `# Projet final Confluence : Knowledge Base d'équipe

## Objectif

Créer une base de connaissances complète pour une équipe technique : espaces structurés, templates personnalisés, macros avancées, intégration Jira, contrôle d'accès et gouvernance du contenu.

## 1. Structure multi-espaces

\`\`\`
Espaces à créer :
├── ENG - Engineering (documentation technique)
├── OPS - Operations (runbooks, incidents)
├── ARCH - Architecture (ADR, diagrammes)
├── ONBOARD - Onboarding (nouveaux arrivants)
└── TEAM - Team (meetings, retrospectives)

Chaque espace contient :
├── Home page (navigation + search)
├── Templates (spécifiques à l'espace)
├── Page tree (hiérarchie logique)
└── Labels convention (documentée)
\`\`\`

## 2. Macros avancées

\`\`\`
Macros essentielles à maîtriser :
- Page Properties + Page Properties Report : métadonnées structurées
- Table of Contents : navigation intra-page
- Excerpt + Excerpt Include : réutilisation de contenu
- Panel (Info, Note, Warning, Tip) : mise en valeur
- Expand : sections repliables pour le contenu long
- Draw.io : diagrammes intégrés
- Code Block : snippets avec coloration syntaxique
- Status : badges visuels (In Progress, Done, Deprecated)
- Roadmap Planner : timeline visuelle
- Content Report Table : lister pages par critères
\`\`\`

## 3. Contrôle d'accès

\`\`\`bash
# Permissions par espace via API
curl -u admin:token -X PUT "http://confluence:8090/rest/api/space/OPS/permission" \\
  -H "Content-Type: application/json" \\
  -d '{
    "subjects": {"group": {"results": [{"name": "ops-team"}]}},
    "operation": {"key": "write", "target": "page"}
  }'

# Restrictions sur une page spécifique
curl -u admin:token -X PUT "http://confluence:8090/rest/api/content/PAGE_ID/restriction" \\
  -H "Content-Type: application/json" \\
  -d '{"results": [{"operation": "update", "restrictions": {"group": [{"name": "senior-devs"}]}}]}'

# Modèle de permissions :
# ENG space : read=all-staff, write=engineering
# OPS space : read=engineering+ops, write=ops-team
# ARCH space : read=all-staff, write=architects+tech-leads
\`\`\`

## 4. Automation et API

\`\`\`bash
# Créer une page via API
curl -u admin:token -X POST "http://confluence:8090/rest/api/content" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "page",
    "title": "Incident Report - 2024-01-15",
    "space": {"key": "OPS"},
    "body": {
      "storage": {
        "value": "<h2>Incident Summary</h2><p>...</p>",
        "representation": "storage"
      }
    },
    "metadata": {
      "labels": [{"name": "incident"}, {"name": "production"}, {"name": "resolved"}]
    }
  }'

# Script d'audit des pages obsolètes
curl -u admin:token "http://confluence:8090/rest/api/content/search?cql=type=page+AND+lastModified<2023-06-01+AND+space=ENG&limit=50" | \\
  python3 -c "
import json, sys
data = json.load(sys.stdin)
for page in data['results']:
    print(f'{page[\"title\"]} - Last modified: {page[\"history\"][\"lastUpdated\"][\"when\"][:10]}')
"
\`\`\`

## 5. Gouvernance du contenu

\`\`\`yaml
Politique de gouvernance :
  Création:
    - Toute page doit utiliser un template approuvé
    - Labels obligatoires : type + team + status
    - Owner assigné à la création

  Maintenance:
    - Review trimestrielle pour les runbooks et procédures
    - Notification automatique au owner si page > 6 mois sans update
    - Archivage automatique après 3 mois en statut "deprecated"

  Qualité:
    - Vérification orthographique avant publication
    - Peer review pour les ADR et les procédures critiques
    - Version historique conservée (Confluence natif)
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Projet final Confluence

### Étape 1 : Créer les espaces et la structure
\`\`\`
1. Créer les espaces ENG, OPS, ARCH, ONBOARD
2. Configurer les permissions par groupe
3. Créer les pages d'accueil avec navigation
4. Définir la convention de labels
\`\`\`

### Étape 2 : Templates personnalisés
\`\`\`
1. Template "Runbook" avec les sections standard
2. Template "ADR" (Architecture Decision Record)
3. Template "Meeting Notes" avec action items
4. Créer 3 pages à partir de chaque template
\`\`\`

### Étape 3 : Macros et contenu riche
\`\`\`
1. Page Properties Report pour lister tous les runbooks
2. Draw.io pour un diagramme d'architecture
3. Jira Issues macro pour les bugs liés
4. Content Report pour les pages récemment modifiées
\`\`\`

### Étape 4 : Intégration et API
\`\`\`
1. Lier les pages aux tickets Jira
2. Script de création automatique de pages incident
3. Export des métriques d'utilisation
\`\`\`

### Étape 5 : Gouvernance
\`\`\`
1. Audit : identifier les pages sans owner
2. Identifier les pages obsolètes via CQL
3. Configurer les notifications de review
4. Documenter la politique de gouvernance
\`\`\`
`,
    keyPoints: JSON.stringify([
      'La structure multi-espaces sépare les préoccupations (Engineering, Ops, Architecture)',
      'Les templates standardisent la création de contenu et garantissent la qualité',
      'Les macros avancées (Page Properties, Content Report) créent des vues dynamiques',
      'Le contrôle d\'accès par espace et par page protège l\'information sensible',
      'L\'API REST automatise la création de pages (incidents, rapports, changelogs)',
      'La gouvernance définit les règles de création, maintenance et archivage',
      'L\'intégration Jira relie la documentation aux tickets et projets',
      'L\'audit régulier maintient la qualité et la pertinence de la base de connaissances'
    ]),
  },

  {
    id: 'bb-09', courseId: 'bitbucket', title: 'Bitbucket pour l\'entreprise', duration: '3h30', orderIndex: 9,
    theoryContent: `# Bitbucket pour l'entreprise

## 1. Gouvernance des dépôts

En entreprise, Bitbucket nécessite des standards de gouvernance : conventions de nommage, templates de dépôts, audit logging et compliance.

## 2. Project Templates et standards

\`\`\`bash
# Créer un projet avec des conventions
curl -u admin:token -X POST "http://bitbucket:7990/rest/api/1.0/projects" \\
  -H "Content-Type: application/json" \\
  -d '{"key":"DEVOPS","name":"DevOps Platform","description":"Microservices de la plateforme"}'

# Template de repository (à appliquer à chaque nouveau repo)
# Fichiers standard obligatoires :
# - README.md (template)
# - .gitignore (par langage)
# - CODEOWNERS
# - .editorconfig
# - bitbucket-pipelines.yml (CI/CD)
# - CONTRIBUTING.md

# Hook pre-receive pour enforcer les conventions
#!/bin/bash
# hooks/pre-receive - Vérifier le format des commits
while read oldrev newrev refname; do
  commits=$(git rev-list $oldrev..$newrev)
  for commit in $commits; do
    msg=$(git log --format=%s -n 1 $commit)
    if ! echo "$msg" | grep -qE "^(feat|fix|docs|refactor|test|ci|chore)(\(.+\))?: .{10,}$"; then
      echo "ERROR: Commit message does not follow Conventional Commits: $msg"
      exit 1
    fi
  done
done
\`\`\`

## 3. Audit Logging

\`\`\`bash
# Accéder aux logs d'audit
curl -u admin:token "http://bitbucket:7990/rest/audit/1.0/events?limit=100"

# Événements audités :
# - Repository created/deleted/forked
# - Branch permission changed
# - User added/removed from project
# - Pull request merged/declined
# - SSH key added/removed

# Exporter vers un SIEM
curl -u admin:token "http://bitbucket:7990/rest/audit/1.0/events?startDate=2024-01-01&endDate=2024-01-31" \\
  | jq '.values[] | {timestamp: .createdDate, action: .action, user: .user.name, details: .details}'
\`\`\`

## 4. Branch Permissions et Merge Checks

\`\`\`bash
# Protéger la branche main
curl -u admin:token -X POST "http://bitbucket:7990/rest/branch-permissions/2.0/projects/DEVOPS/repos/api/restrictions" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "fast-forward-only",
    "matcher": {"id": "refs/heads/main", "type": {"id": "PATTERN"}},
    "users": [],
    "groups": ["release-managers"]
  }'

# Merge checks obligatoires
curl -u admin:token -X PUT "http://bitbucket:7990/rest/api/1.0/projects/DEVOPS/repos/api/settings/merge-checks" \\
  -H "Content-Type: application/json" \\
  -d '{
    "com.atlassian.bitbucket.server.bitbucket-bundled-hooks:requiredApprovers": {"count": 2},
    "com.atlassian.bitbucket.server.bitbucket-build:requiredBuilds": {"count": 1},
    "com.atlassian.bitbucket.server.bitbucket-bundled-hooks:noDeletedCode": true
  }'
\`\`\`

## 5. Compliance et reporting

\`\`\`bash
# Rapport de compliance : repos sans branch protection
curl -u admin:token "http://bitbucket:7990/rest/api/1.0/projects/DEVOPS/repos?limit=100" | \\
  jq -r '.values[].slug' | while read repo; do
    PROTECTIONS=$(curl -s -u admin:token "http://bitbucket:7990/rest/branch-permissions/2.0/projects/DEVOPS/repos/$repo/restrictions" | jq '.values | length')
    if [ "$PROTECTIONS" -eq 0 ]; then
      echo "⚠️  $repo : AUCUNE protection de branche"
    fi
  done

# Repos sans pipeline CI
curl -u admin:token "http://bitbucket:7990/rest/api/1.0/projects/DEVOPS/repos?limit=100" | \\
  jq -r '.values[].slug' | while read repo; do
    HAS_PIPELINE=$(curl -s -u admin:token "http://bitbucket:7990/rest/api/1.0/projects/DEVOPS/repos/$repo/browse/bitbucket-pipelines.yml" | jq -r '.type // "missing"')
    if [ "$HAS_PIPELINE" = "missing" ]; then
      echo "⚠️  $repo : pas de pipeline CI"
    fi
  done
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Bitbucket entreprise

### Exercice 1 : Standards de repository
\`\`\`bash
# Créer un template repo avec les fichiers obligatoires
# README.md, CODEOWNERS, .editorconfig, bitbucket-pipelines.yml
\`\`\`

### Exercice 2 : Branch permissions
\`\`\`bash
# Protéger main : 2 reviewers, build requis, no force push
# Protéger release/* : only release-managers can push
\`\`\`

### Exercice 3 : Hooks pre-receive
\`\`\`bash
# Enforcer Conventional Commits sur tous les repos
# Bloquer les commits avec secrets (AWS keys, tokens)
\`\`\`

### Exercice 4 : Audit et compliance
\`\`\`bash
# Script de vérification : tous les repos doivent avoir
# branch protection + pipeline + CODEOWNERS
\`\`\`

### Exercice 5 : PR templates
\`\`\`bash
# Configurer un template de Pull Request
# Checklist : tests, docs, no secrets, reviewer assigned
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Les project templates standardisent la configuration des nouveaux repositories',
      'Les hooks pre-receive bloquent les commits non conformes (messages, secrets)',
      'Les branch permissions protègent main et release avec reviewers et builds obligatoires',
      'L\'audit logging trace toutes les actions pour la compliance et la sécurité',
      'Les merge checks exigent approbations, builds verts et absence de code supprimé',
      'Les scripts de compliance vérifient que tous les repos respectent les standards',
      'Les PR templates guident les développeurs avec une checklist de qualité',
      'La gouvernance centralisée assure la cohérence entre tous les projets'
    ]),
  },

  {
    id: 'bb-10', courseId: 'bitbucket', title: 'Projet final Bitbucket', duration: '4h', orderIndex: 10,
    theoryContent: `# Projet final Bitbucket : Workflow Git complet

## Objectif

Mettre en place un workflow Git complet sur Bitbucket : repositories organisés, branching strategy, PR templates, pipelines CI avec webhooks, et quality gates intégrés.

## 1. Organisation des repositories

\`\`\`bash
# Structure de projet
curl -u admin:token -X POST "http://bitbucket:7990/rest/api/1.0/projects" \\
  -H "Content-Type: application/json" \\
  -d '{"key":"PLATFORM","name":"Platform Services"}'

# Créer les repos
for repo in api-gateway user-service catalog-service shared-libs infra-terraform; do
  curl -u admin:token -X POST "http://bitbucket:7990/rest/api/1.0/projects/PLATFORM/repos" \\
    -H "Content-Type: application/json" \\
    -d "{\"name\":\"$repo\",\"scmId\":\"git\"}"
done
\`\`\`

## 2. Branching Strategy et protections

\`\`\`bash
# Branching model
# main: production-ready code
# develop: integration branch
# feature/*: new features
# release/*: release preparation
# hotfix/*: production fixes

# Protections
# main: 2 approvals + CI green + no direct push
# develop: 1 approval + CI green
# release/*: release-managers only

# Configurer le branching model
curl -u admin:token -X PUT "http://bitbucket:7990/rest/branch-utils/1.0/projects/PLATFORM/repos/api-gateway/branchmodel/configuration" \\
  -H "Content-Type: application/json" \\
  -d '{
    "development": {"refId": "refs/heads/develop"},
    "production": {"refId": "refs/heads/main"},
    "types": [
      {"id": "FEATURE", "prefix": "feature/"},
      {"id": "BUGFIX", "prefix": "bugfix/"},
      {"id": "RELEASE", "prefix": "release/"},
      {"id": "HOTFIX", "prefix": "hotfix/"}
    ]
  }'
\`\`\`

## 3. Bitbucket Pipelines

\`\`\`yaml
# bitbucket-pipelines.yml
image: node:20

definitions:
  caches:
    npm: node_modules
  steps:
    - step: &lint
        name: Lint
        caches: [npm]
        script:
          - npm ci
          - npm run lint
    - step: &test
        name: Test
        caches: [npm]
        script:
          - npm ci
          - npm test -- --coverage
        artifacts:
          - coverage/**
    - step: &build
        name: Build Docker
        services: [docker]
        script:
          - docker build -t \\\${DOCKER_REGISTRY}/\\\${BITBUCKET_REPO_SLUG}:\\\${BITBUCKET_COMMIT} .
          - docker push \\\${DOCKER_REGISTRY}/\\\${BITBUCKET_REPO_SLUG}:\\\${BITBUCKET_COMMIT}
    - step: &deploy-staging
        name: Deploy Staging
        deployment: staging
        script:
          - kubectl set image deployment/app app=\\\${DOCKER_REGISTRY}/\\\${BITBUCKET_REPO_SLUG}:\\\${BITBUCKET_COMMIT} -n staging

pipelines:
  default:
    - step: *lint
    - step: *test
  branches:
    main:
      - step: *lint
      - step: *test
      - step: *build
      - step: *deploy-staging
      - step:
          name: Deploy Production
          deployment: production
          trigger: manual
          script:
            - kubectl set image deployment/app app=\\\${DOCKER_REGISTRY}/\\\${BITBUCKET_REPO_SLUG}:\\\${BITBUCKET_COMMIT} -n production

  pull-requests:
    '**':
      - step: *lint
      - step: *test
\`\`\`

## 4. Webhooks et intégrations

\`\`\`bash
# Webhook pour Slack
curl -u admin:token -X PUT "http://bitbucket:7990/rest/api/1.0/projects/PLATFORM/repos/api-gateway/webhooks" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Slack Notifications",
    "url": "https://hooks.slack.com/services/xxx",
    "events": ["pr:opened", "pr:merged", "pr:declined", "repo:refs_changed"],
    "active": true
  }'
\`\`\`

## 5. Code Quality Integration

\`\`\`bash
# SonarQube integration via build status
# Le pipeline envoie le résultat SonarQube comme build status
curl -u admin:token -X POST "http://bitbucket:7990/rest/build-status/1.0/commits/\\\${COMMIT_SHA}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "state": "SUCCESSFUL",
    "key": "sonarqube",
    "name": "SonarQube Quality Gate",
    "url": "http://sonarqube:9000/dashboard?id=api-gateway",
    "description": "Quality Gate passed"
  }'
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Projet final Bitbucket

### Étape 1 : Créer les repositories
\`\`\`bash
# Créer un projet avec 3 repos de microservices
# Configurer le branching model (main + develop)
\`\`\`

### Étape 2 : Configurer les protections
\`\`\`bash
# main: 2 approvals + CI green + no direct push
# develop: 1 approval + CI green
# Configurer les merge checks
\`\`\`

### Étape 3 : Écrire les pipelines CI/CD
\`\`\`yaml
# lint → test → build docker → deploy staging → deploy prod (manual)
# Pipeline PR : lint + test uniquement
\`\`\`

### Étape 4 : Webhooks et notifications
\`\`\`bash
# Configurer Slack pour les PR opened/merged
# Configurer le webhook SonarQube quality gate
\`\`\`

### Étape 5 : Tester le workflow complet
\`\`\`bash
# Créer une feature branch, faire un PR
# Vérifier les checks automatiques
# Merger et vérifier le déploiement staging
\`\`\`
`,
    keyPoints: JSON.stringify([
      'L\'organisation en projects regroupe les repos de microservices liés',
      'Le branching model (main/develop/feature/release) structure le flux de développement',
      'Les pipelines Bitbucket automatisent lint, test, build Docker et déploiement',
      'Les branch permissions et merge checks protègent les branches principales',
      'Les webhooks notifient Slack et déclenchent des actions sur les événements Git',
      'Le déploiement production via trigger manual ajoute une gate de sécurité',
      'L\'intégration SonarQube affiche le Quality Gate comme build status sur les PRs',
      'Les PR templates et CODEOWNERS standardisent le processus de code review'
    ]),
  },



  {
    id: 'prom-09', courseId: 'prometheus', title: 'Prometheus et le cloud natif', duration: '4h', orderIndex: 9,
    theoryContent: `# Prometheus et le cloud natif

## 1. Kubernetes Service Discovery

Prometheus découvre automatiquement les cibles à monitorer dans Kubernetes via les mécanismes de Service Discovery.

\`\`\`yaml
# prometheus.yml - Kubernetes SD
scrape_configs:
  # Découvrir les pods avec l'annotation prometheus.io/scrape
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_port, __meta_kubernetes_pod_ip]
        action: replace
        target_label: __address__
        regex: (.+);(.+)
        replacement: \\\${2}:\\\${1}
      - source_labels: [__meta_kubernetes_namespace]
        target_label: namespace
      - source_labels: [__meta_kubernetes_pod_name]
        target_label: pod

  # Découvrir les services
  - job_name: 'kubernetes-services'
    kubernetes_sd_configs:
      - role: service
    relabel_configs:
      - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scrape]
        action: keep
        regex: true

  # Découvrir les nodes
  - job_name: 'kubernetes-nodes'
    kubernetes_sd_configs:
      - role: node
    relabel_configs:
      - action: labelmap
        regex: __meta_kubernetes_node_label_(.+)
\`\`\`

## 2. Service Mesh Metrics (Istio/Envoy)

\`\`\`yaml
# Scraper les métriques Envoy/Istio
- job_name: 'istio-mesh'
  kubernetes_sd_configs:
    - role: pod
  relabel_configs:
    - source_labels: [__meta_kubernetes_pod_container_name]
      action: keep
      regex: istio-proxy

# Métriques clés du service mesh :
# istio_requests_total - nombre de requêtes
# istio_request_duration_milliseconds - latence
# istio_tcp_connections_opened_total - connexions TCP
# envoy_cluster_upstream_rq_xx - codes de réponse par cluster
\`\`\`

## 3. OpenTelemetry Integration

\`\`\`yaml
# OTEL Collector configuration
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  prometheus:
    config:
      scrape_configs:
        - job_name: 'otel-collector'
          static_configs:
            - targets: ['localhost:8888']

exporters:
  prometheus:
    endpoint: 0.0.0.0:8889
    namespace: otel
  otlp:
    endpoint: tempo:4317

processors:
  batch:
    timeout: 10s
  memory_limiter:
    limit_mib: 512

service:
  pipelines:
    metrics:
      receivers: [otlp, prometheus]
      processors: [batch, memory_limiter]
      exporters: [prometheus]
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp]
\`\`\`

## 4. Métriques applicatives (instrumentation)

\`\`\`javascript
// Instrumentation Node.js avec prom-client
const promClient = require('prom-client');

// Métriques standard
promClient.collectDefaultMetrics({ prefix: 'app_' });

// Histogramme de latence HTTP
const httpDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 5]
});

// Counter de requêtes
const httpRequests = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

// Middleware Express
app.use((req, res, next) => {
  const end = httpDuration.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.route?.path || req.path, status_code: res.statusCode });
    httpRequests.inc({ method: req.method, route: req.route?.path || req.path, status_code: res.statusCode });
  });
  next();
});

// Endpoint /metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});
\`\`\`

## 5. Alerting cloud-native

\`\`\`yaml
# Alertes Kubernetes essentielles
groups:
  - name: kubernetes-alerts
    rules:
      - alert: PodCrashLooping
        expr: rate(kube_pod_container_status_restarts_total[15m]) > 0
        for: 5m
        labels: { severity: critical }
        annotations:
          summary: "Pod {{ \\\$labels.namespace }}/{{ \\\$labels.pod }} crash looping"

      - alert: PodNotReady
        expr: kube_pod_status_ready{condition="true"} == 0
        for: 10m
        labels: { severity: warning }

      - alert: HighMemoryUsage
        expr: container_memory_usage_bytes / container_spec_memory_limit_bytes > 0.9
        for: 5m
        labels: { severity: warning }
        annotations:
          summary: "Container {{ \\\$labels.container }} using >90% memory limit"

      - alert: HPAMaxedOut
        expr: kube_horizontalpodautoscaler_status_current_replicas == kube_horizontalpodautoscaler_spec_max_replicas
        for: 15m
        labels: { severity: warning }
        annotations:
          summary: "HPA {{ \\\$labels.horizontalpodautoscaler }} at max replicas"
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Prometheus cloud natif

### Exercice 1 : Kubernetes Service Discovery
\`\`\`yaml
# Configurer Prometheus pour découvrir les pods annotés
# Ajouter les annotations aux pods : prometheus.io/scrape: "true"
# Vérifier dans Prometheus UI > Targets
\`\`\`

### Exercice 2 : Instrumenter une application
\`\`\`javascript
// Ajouter prom-client à une app Node.js
// Créer un histogram pour la latence HTTP
// Vérifier les métriques sur /metrics
\`\`\`

### Exercice 3 : OTEL Collector
\`\`\`yaml
# Déployer un OTEL Collector
# Configurer receiver OTLP + exporter Prometheus
# Vérifier les métriques dans Prometheus
\`\`\`

### Exercice 4 : Alertes Kubernetes
\`\`\`yaml
# Configurer les alertes : PodCrashLooping, HighMemory, HPAMaxed
# Tester en simulant un crash de pod
# Vérifier dans Alertmanager
\`\`\`

### Exercice 5 : Dashboard Service Mesh
\`\`\`
# Créer un dashboard Grafana avec :
# - Request rate par service
# - P99 latency par route
# - Error rate (5xx)
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Kubernetes SD découvre automatiquement les pods, services et nodes à monitorer',
      'Les annotations prometheus.io/scrape contrôlent quels pods sont scrapés',
      'OpenTelemetry Collector unifie la collecte de métriques, traces et logs',
      'L\'instrumentation applicative (prom-client) expose des métriques métier personnalisées',
      'Les métriques Istio/Envoy mesurent la latence et les erreurs du service mesh',
      'Les alertes cloud-native surveillent CrashLooping, Memory, HPA et readiness',
      'Le relabeling transforme les métadonnées Kubernetes en labels Prometheus',
      'L\'architecture metrics pipeline collecte, filtre et route les métriques à grande échelle'
    ]),
  },

  {
    id: 'prom-10', courseId: 'prometheus', title: 'Projet final Prometheus', duration: '5h', orderIndex: 10,
    theoryContent: `# Projet final Prometheus : Monitoring complet

## Objectif

Déployer une stack de monitoring complète : Prometheus pour les métriques, alerting avec Alertmanager, dashboards Grafana, node exporters sur tous les serveurs, et runbooks pour chaque alerte.

## 1. Architecture de la stack

\`\`\`yaml
# docker-compose.yml - Stack complète
services:
  prometheus:
    image: prom/prometheus:latest
    ports: ["9090:9090"]
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - ./prometheus/rules:/etc/prometheus/rules
      - prometheus-data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.retention.time=30d'

  alertmanager:
    image: prom/alertmanager:latest
    ports: ["9093:9093"]
    volumes:
      - ./alertmanager/alertmanager.yml:/etc/alertmanager/alertmanager.yml

  grafana:
    image: grafana/grafana:latest
    ports: ["3000:3000"]
    volumes:
      - ./grafana/provisioning:/etc/grafana/provisioning
      - grafana-data:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin

  node-exporter:
    image: prom/node-exporter:latest
    ports: ["9100:9100"]
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.sysfs=/host/sys'

  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    ports: ["8080:8080"]
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro

  blackbox-exporter:
    image: prom/blackbox-exporter:latest
    ports: ["9115:9115"]

volumes:
  prometheus-data:
  grafana-data:
\`\`\`

## 2. Configuration Prometheus

\`\`\`yaml
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

alerting:
  alertmanagers:
    - static_configs:
        - targets: ['alertmanager:9093']

rule_files:
  - /etc/prometheus/rules/*.yml

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']

  - job_name: 'blackbox-http'
    metrics_path: /probe
    params:
      module: [http_2xx]
    static_configs:
      - targets:
          - https://app.example.com
          - https://api.example.com
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: blackbox-exporter:9115
\`\`\`

## 3. Alerting Rules

\`\`\`yaml
# rules/infrastructure.yml
groups:
  - name: infrastructure
    rules:
      - alert: HighCPU
        expr: 100 - (avg by(instance)(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
        for: 5m
        labels: { severity: warning }
        annotations:
          summary: "CPU > 80% on {{ \\\$labels.instance }}"
          runbook_url: "https://wiki.company.com/runbooks/high-cpu"

      - alert: DiskSpaceLow
        expr: (node_filesystem_avail_bytes{fstype!="tmpfs"} / node_filesystem_size_bytes) * 100 < 15
        for: 10m
        labels: { severity: critical }
        annotations:
          summary: "Disk < 15% on {{ \\\$labels.instance }}:{{ \\\$labels.mountpoint }}"

      - alert: ServiceDown
        expr: probe_success{job="blackbox-http"} == 0
        for: 2m
        labels: { severity: critical }
        annotations:
          summary: "Service {{ \\\$labels.instance }} is DOWN"
\`\`\`

## 4. Alertmanager Configuration

\`\`\`yaml
# alertmanager.yml
global:
  slack_api_url: 'https://hooks.slack.com/services/xxx'

route:
  receiver: 'slack-default'
  group_by: ['alertname', 'severity']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  routes:
    - match: { severity: critical }
      receiver: 'pagerduty-critical'
      repeat_interval: 1h
    - match: { severity: warning }
      receiver: 'slack-warnings'

receivers:
  - name: 'slack-default'
    slack_configs:
      - channel: '#monitoring'
        title: '{{ .CommonLabels.alertname }}'
        text: '{{ range .Alerts }}{{ .Annotations.summary }}{{ end }}'

  - name: 'pagerduty-critical'
    pagerduty_configs:
      - service_key: '<pagerduty-key>'
        severity: critical

  - name: 'slack-warnings'
    slack_configs:
      - channel: '#monitoring-warnings'
\`\`\`

## 5. Grafana Dashboards

\`\`\`json
{
  "dashboard": {
    "title": "Infrastructure Overview",
    "panels": [
      {"title": "CPU Usage", "type": "timeseries", "expr": "100 - (avg by(instance)(rate(node_cpu_seconds_total{mode='idle'}[5m])) * 100)"},
      {"title": "Memory Usage", "type": "gauge", "expr": "(1 - node_memory_MemAvailable_bytes/node_memory_MemTotal_bytes) * 100"},
      {"title": "Disk Usage", "type": "stat", "expr": "(1 - node_filesystem_avail_bytes/node_filesystem_size_bytes) * 100"},
      {"title": "Network I/O", "type": "timeseries", "expr": "rate(node_network_receive_bytes_total[5m])"}
    ]
  }
}
\`\`\`
`,
    practiceContent: `## Travaux Pratiques : Projet final Prometheus

### Étape 1 : Déployer la stack
\`\`\`bash
docker compose up -d
# Vérifier : Prometheus (9090), Grafana (3000), Alertmanager (9093)
curl http://localhost:9090/-/healthy
\`\`\`

### Étape 2 : Configurer les targets
\`\`\`bash
# Ajouter node-exporter, cadvisor, blackbox
# Vérifier dans Prometheus > Targets que tout est UP
\`\`\`

### Étape 3 : Créer les alerting rules
\`\`\`bash
# CPU > 80%, Disk < 15%, Service Down
# Vérifier dans Prometheus > Rules
# Simuler une alerte et vérifier Alertmanager
\`\`\`

### Étape 4 : Dashboards Grafana
\`\`\`bash
# Importer le dashboard Node Exporter Full (ID: 1860)
# Créer un dashboard custom avec les métriques clés
# Configurer les alertes Grafana
\`\`\`

### Étape 5 : Runbooks
\`\`\`bash
# Documenter la procédure pour chaque alerte
# Lier les runbooks aux annotations des alertes
# Tester le workflow complet : alerte → notification → runbook → résolution
\`\`\`
`,
    keyPoints: JSON.stringify([
      'La stack complète inclut Prometheus, Alertmanager, Grafana, Node Exporter et Blackbox',
      'Node Exporter collecte les métriques système (CPU, mémoire, disque, réseau)',
      'Blackbox Exporter surveille la disponibilité des endpoints HTTP/HTTPS',
      'Les alerting rules déclenchent sur des seuils avec des durées de confirmation (for)',
      'Alertmanager route les alertes vers Slack, PagerDuty ou email selon la sévérité',
      'Les dashboards Grafana visualisent l\'état de l\'infrastructure en temps réel',
      'Chaque alerte doit avoir un runbook_url pointant vers la procédure de résolution',
      'La rétention Prometheus (30d) et les recording rules optimisent les performances'
    ]),
  },



  {
    id: 'graf-09', courseId: 'grafana', title: 'Grafana pour l\'entreprise', duration: '3h30', orderIndex: 9,
    theoryContent: `# Grafana pour l'entreprise\n\n## 1. Multi-tenancy avec Organizations\n\nGrafana supporte le multi-tenancy via les Organizations, permettant d'isoler les dashboards, data sources et utilisateurs par équipe ou client.\n\n\`\`\`bash\n# Créer une organisation\ncurl -u admin:admin -X POST "http://grafana:3000/api/orgs" \\\\\n  -H "Content-Type: application/json" \\\\\n  -d '{"name":"Team Backend"}'\n\n# Ajouter un utilisateur à une org\ncurl -u admin:admin -X POST "http://grafana:3000/api/orgs/2/users" \\\\\n  -H "Content-Type: application/json" \\\\\n  -d '{"loginOrEmail":"alice@company.com","role":"Editor"}'\n\`\`\`\n\n## 2. Provisioning at Scale\n\n\`\`\`yaml\n# provisioning/datasources/prometheus.yml\napiVersion: 1\ndatasources:\n  - name: Prometheus-Prod\n    type: prometheus\n    access: proxy\n    url: http://prometheus-prod:9090\n    isDefault: true\n    jsonData:\n      timeInterval: 15s\n  - name: Loki-Prod\n    type: loki\n    access: proxy\n    url: http://loki:3100\n\n# provisioning/dashboards/default.yml\napiVersion: 1\nproviders:\n  - name: 'default'\n    folder: 'Infrastructure'\n    type: file\n    options:\n      path: /etc/grafana/dashboards\n      foldersFromFilesStructure: true\n\`\`\`\n\n## 3. LDAP/SSO Authentication\n\n\`\`\`ini\n# grafana.ini\n[auth.ldap]\nenabled = true\nconfig_file = /etc/grafana/ldap.toml\n\n[auth.generic_oauth]\nenabled = true\nname = Keycloak\nclient_id = grafana\nclient_secret = secret\nscopes = openid profile email\nauth_url = https://keycloak/auth/realms/company/protocol/openid-connect/auth\ntoken_url = https://keycloak/auth/realms/company/protocol/openid-connect/token\napi_url = https://keycloak/auth/realms/company/protocol/openid-connect/userinfo\nrole_attribute_path = contains(groups[*], 'admin') && 'Admin' || 'Viewer'\n\`\`\`\n\n## 4. SLO Dashboards\n\n\`\`\`\n# Calcul SLI/SLO\n# SLI = successful requests / total requests\n# SLO = SLI >= 99.9% over 30 days\n\n# PromQL pour SLI\nsum(rate(http_requests_total{status!~"5.."}[30d])) / sum(rate(http_requests_total[30d]))\n\n# Error budget remaining\n1 - ((1 - (sum(rate(http_requests_total{status!~"5.."}[30d])) / sum(rate(http_requests_total[30d])))) / (1 - 0.999))\n\`\`\`\n\n## 5. On-Call Integration\n\n\`\`\`yaml\n# Grafana OnCall configuration\n# Escalation chain:\n# 1. Notify primary on-call via Slack (immediate)\n# 2. If not acknowledged in 5min → page via PagerDuty\n# 3. If not acknowledged in 15min → escalate to secondary\n# 4. If not acknowledged in 30min → notify engineering manager\n\`\`\``,
    practiceContent: `## Travaux Pratiques : Grafana entreprise\n\n### Exercice 1 : Multi-org setup\n\`\`\`bash\n# Créer 3 organisations (Backend, Frontend, Ops)\n# Assigner les utilisateurs aux bonnes orgs\n# Vérifier l'isolation des dashboards\n\`\`\`\n\n### Exercice 2 : Provisioning as Code\n\`\`\`bash\n# Configurer les datasources via YAML\n# Provisionner des dashboards depuis des fichiers JSON\n# Redémarrer Grafana et vérifier le chargement automatique\n\`\`\`\n\n### Exercice 3 : Dashboard SLO\n\`\`\`bash\n# Créer un dashboard avec :\n# - SLI actuel (gauge)\n# - Error budget remaining (%)\n# - Burn rate (vitesse de consommation du budget)\n\`\`\`\n\n### Exercice 4 : SSO Configuration\n\`\`\`bash\n# Configurer l'authentification OAuth2/OIDC\n# Mapper les groupes LDAP aux rôles Grafana\n# Tester le login SSO\n\`\`\`\n\n### Exercice 5 : Alerting et On-Call\n\`\`\`bash\n# Configurer une chaîne d'escalade\n# Tester avec une alerte simulée\n# Vérifier la notification et l'acquittement\n\`\`\``,
    keyPoints: JSON.stringify(['Les Organizations isolent dashboards et data sources par équipe ou tenant', 'Le provisioning YAML automatise la configuration des datasources et dashboards', 'L\'authentification LDAP/OAuth2 centralise la gestion des accès', 'Les SLO dashboards mesurent SLI, error budget et burn rate', 'Grafana OnCall gère l\'escalade avec notifications multi-canal', 'Les Teams structurent les permissions sur les dossiers de dashboards', 'Le provisioning as code permet le déploiement reproductible via GitOps', 'Les alertes Grafana supportent multi-condition et templates de notification']),
  },

  {
    id: 'graf-10', courseId: 'grafana', title: 'Projet final Grafana', duration: '5h', orderIndex: 10,
    theoryContent: `# Projet final Grafana : Observabilité complète\n\n## Objectif\n\nConstruire une plateforme d'observabilité complète avec Grafana : métriques (Prometheus), logs (Loki), traces (Tempo), alerting et dashboards unifiés.\n\n## 1. Stack LGTM (Loki, Grafana, Tempo, Mimir)\n\n\`\`\`yaml\nservices:\n  grafana:\n    image: grafana/grafana:latest\n    ports: ["3000:3000"]\n    volumes:\n      - ./grafana/provisioning:/etc/grafana/provisioning\n    environment:\n      - GF_FEATURE_TOGGLES_ENABLE=traceqlEditor\n\n  prometheus:\n    image: prom/prometheus:latest\n    ports: ["9090:9090"]\n    volumes: ["./prometheus.yml:/etc/prometheus/prometheus.yml"]\n\n  loki:\n    image: grafana/loki:latest\n    ports: ["3100:3100"]\n    command: -config.file=/etc/loki/local-config.yaml\n\n  tempo:\n    image: grafana/tempo:latest\n    ports: ["3200:3200", "4317:4317"]\n    command: ["-config.file=/etc/tempo.yaml"]\n    volumes: ["./tempo.yaml:/etc/tempo.yaml"]\n\n  promtail:\n    image: grafana/promtail:latest\n    volumes:\n      - /var/log:/var/log:ro\n      - ./promtail.yml:/etc/promtail/config.yml\n    command: -config.file=/etc/promtail/config.yml\n\`\`\`\n\n## 2. Datasources unifiées\n\n\`\`\`yaml\n# provisioning/datasources/all.yml\napiVersion: 1\ndatasources:\n  - name: Prometheus\n    type: prometheus\n    url: http://prometheus:9090\n    isDefault: true\n  - name: Loki\n    type: loki\n    url: http://loki:3100\n    jsonData:\n      derivedFields:\n        - name: TraceID\n          datasourceUid: tempo\n          matcherRegex: "traceID=(\\\\\\\\w+)"\n          url: '\\\${__value.raw}'\n  - name: Tempo\n    type: tempo\n    url: http://tempo:3200\n    jsonData:\n      tracesToLogs:\n        datasourceUid: loki\n        tags: ['service.name']\n      tracesToMetrics:\n        datasourceUid: prometheus\n\`\`\`\n\n## 3. Dashboard metrics + logs + traces\n\n\`\`\`\nDashboard "Service Overview":\n├── Row: Key Metrics\n│   ├── Request Rate (Prometheus)\n│   ├── Error Rate (Prometheus)\n│   ├── P95 Latency (Prometheus)\n│   └── Active Users (Prometheus)\n├── Row: Logs\n│   ├── Error Logs (Loki: {level="error"})\n│   └── Recent Logs (Loki: {service="app"})\n├── Row: Traces\n│   ├── Slow Traces (Tempo: duration > 1s)\n│   └── Error Traces (Tempo: status = error)\n└── Row: Infrastructure\n    ├── CPU/Memory (Prometheus + node-exporter)\n    └── Container Stats (cAdvisor)\n\nCorrelation:\n- Click on error log → jump to trace (via traceID)\n- Click on slow trace → see correlated metrics\n- Click on metric spike → filter logs by time range\n\`\`\`\n\n## 4. Alerting unifié\n\n\`\`\`yaml\n# Grafana Alert Rules\ngroups:\n  - name: SLO Alerts\n    rules:\n      - alert: ErrorBudgetBurning\n        expr: |\n          1 - (sum(rate(http_requests_total{status!~"5.."}[1h]))\n          / sum(rate(http_requests_total[1h]))) > 0.001\n        for: 5m\n        labels: { severity: warning }\n        annotations:\n          summary: "Error rate consuming SLO budget faster than expected"\n\n  - name: Log Alerts\n    rules:\n      - alert: HighErrorLogRate\n        expr: sum(rate({level="error"}[5m])) > 10\n        for: 5m\n        labels: { severity: critical }\n\`\`\`\n\n## 5. On-Call avec escalade\n\n\`\`\`\nEscalation Policy:\n  Step 1: Notify #alerts-channel (Slack) → Wait 5min\n  Step 2: Page primary on-call (PagerDuty) → Wait 10min\n  Step 3: Page secondary on-call → Wait 15min\n  Step 4: Notify engineering-manager\n\nSchedules:\n  Primary: Weekly rotation (Alice, Bob, Charlie)\n  Secondary: Weekly rotation (offset by 1)\n\`\`\``,
    practiceContent: `## Travaux Pratiques : Projet final Grafana\n\n### Étape 1 : Déployer la stack LGTM\n\`\`\`bash\ndocker compose up -d\n# Vérifier : Grafana (3000), Prometheus (9090), Loki (3100), Tempo (3200)\n\`\`\`\n\n### Étape 2 : Configurer les datasources\n\`\`\`bash\n# Provisioning YAML pour Prometheus, Loki, Tempo\n# Configurer les corrélations (logs↔traces, traces↔metrics)\n\`\`\`\n\n### Étape 3 : Créer le dashboard unifié\n\`\`\`bash\n# Métriques : request rate, error rate, latency\n# Logs : filtrer par service et niveau\n# Traces : visualiser les spans lents\n\`\`\`\n\n### Étape 4 : Configurer l'alerting\n\`\`\`bash\n# Alertes sur métriques (error budget)\n# Alertes sur logs (taux d'erreurs)\n# Contact points : Slack + PagerDuty\n\`\`\`\n\n### Étape 5 : Tester la corrélation\n\`\`\`bash\n# Générer du trafic avec erreurs\n# Naviguer : metric spike → logs → trace → root cause\n# Documenter le workflow d'investigation\n\`\`\``,
    keyPoints: JSON.stringify(['La stack LGTM (Loki+Grafana+Tempo+Mimir) offre l\'observabilité complète', 'Les datasources corrélées permettent de naviguer entre métriques, logs et traces', 'Le provisioning as code déploie datasources et dashboards automatiquement', 'Les alertes unifiées combinent métriques Prometheus et logs Loki', 'L\'escalade on-call notifie progressivement selon la sévérité et le temps', 'La corrélation logs↔traces via traceID accélère le diagnostic', 'Les SLO dashboards mesurent la fiabilité avec error budget et burn rate', 'Le workflow d\'investigation va du symptôme (alerte) à la cause racine (trace)']),
  },



  {
    id: 'helm-09', courseId: 'helm', title: 'Helm Charts marketplace', duration: '3h30', orderIndex: 9,
    theoryContent: `# Helm Charts marketplace\n\n## 1. Packaging pour la distribution\n\nPublier un Helm chart signifie le rendre disponible pour d'autres équipes ou la communauté. Cela nécessite un packaging propre, une documentation complète et un hosting fiable.\n\n## 2. Structure d'un chart publiable\n\n\`\`\`bash\nmy-app/\n├── Chart.yaml          # Métadonnées du chart\n├── Chart.lock          # Lock des dépendances\n├── values.yaml         # Valeurs par défaut\n├── values.schema.json  # Validation des values\n├── README.md           # Documentation\n├── LICENSE             # Licence\n├── .helmignore         # Fichiers à exclure\n├── templates/\n│   ├── _helpers.tpl    # Template helpers\n│   ├── deployment.yaml\n│   ├── service.yaml\n│   ├── ingress.yaml\n│   ├── hpa.yaml\n│   ├── serviceaccount.yaml\n│   ├── configmap.yaml\n│   ├── secret.yaml\n│   ├── NOTES.txt       # Post-install message\n│   └── tests/\n│       └── test-connection.yaml\n└── charts/             # Dépendances\n\`\`\`\n\n## 3. Chart.yaml complet\n\n\`\`\`yaml\napiVersion: v2\nname: my-app\ndescription: A complete web application Helm chart\ntype: application\nversion: 1.2.0\nappVersion: "2.0.0"\nhome: https://github.com/company/my-app\nsources:\n  - https://github.com/company/my-app\nmaintainers:\n  - name: DevOps Team\n    email: devops@company.com\nkeywords:\n  - web\n  - nodejs\n  - microservice\nannotations:\n  artifacthub.io/category: integration-delivery\n  artifacthub.io/license: MIT\ndependencies:\n  - name: postgresql\n    version: "13.x.x"\n    repository: "https://charts.bitnami.com/bitnami"\n    condition: postgresql.enabled\n  - name: redis\n    version: "18.x.x"\n    repository: "https://charts.bitnami.com/bitnami"\n    condition: redis.enabled\n\`\`\`\n\n## 4. OCI Registry\n\n\`\`\`bash\n# Publier sur un OCI registry (Docker Hub, ECR, GCR, Harbor)\nhelm package my-app/\nhelm push my-app-1.2.0.tgz oci://registry.company.com/charts\n\n# Installer depuis un OCI registry\nhelm install my-release oci://registry.company.com/charts/my-app --version 1.2.0\n\n# Login au registry\nhelm registry login registry.company.com -u admin -p password\n\n# Lister les tags\ncurl -s "https://registry.company.com/v2/charts/my-app/tags/list" | jq\n\`\`\`\n\n## 5. Chart Museum (self-hosted)\n\n\`\`\`bash\n# Déployer Chart Museum\ndocker run -d --name chartmuseum \\\\\n  -p 8080:8080 \\\\\n  -e STORAGE=local \\\\\n  -e STORAGE_LOCAL_ROOTDIR=/charts \\\\\n  -v /data/charts:/charts \\\\\n  chartmuseum/chartmuseum:latest\n\n# Ajouter le repo\nhelm repo add company http://chartmuseum:8080\nhelm repo update\n\n# Publier un chart\ncurl --data-binary "@my-app-1.2.0.tgz" http://chartmuseum:8080/api/charts\n\n# Chercher\nhelm search repo company/\n\`\`\`\n\n## 6. Signing et vérification\n\n\`\`\`bash\n# Signer un chart avec GPG\nhelm package --sign --key 'DevOps Team' --keyring ~/.gnupg/pubring.gpg my-app/\n\n# Cela génère : my-app-1.2.0.tgz et my-app-1.2.0.tgz.prov\n\n# Vérifier la signature lors de l'installation\nhelm install my-release company/my-app --verify --keyring ~/.gnupg/pubring.gpg\n\n# Vérifier manuellement\nhelm verify my-app-1.2.0.tgz\n\`\`\`\n\n## 7. Documentation automatique\n\n\`\`\`bash\n# Utiliser helm-docs pour générer le README\n# Installer: go install github.com/norwoodj/helm-docs/cmd/helm-docs@latest\nhelm-docs --chart-search-root ./charts\n\n# Les commentaires dans values.yaml deviennent la doc :\n# -- Number of replicas for the deployment\nreplicaCount: 3\n# -- Container image repository\nimage:\n  # -- Image repository\n  repository: myapp\n  # -- Image tag (defaults to chart appVersion)\n  tag: ""\n\`\`\``,
    practiceContent: `## Travaux Pratiques : Helm Charts marketplace\n\n### Exercice 1 : Packager un chart\n\`\`\`bash\nhelm create my-chart\n# Personnaliser Chart.yaml avec métadonnées complètes\nhelm package my-chart/\nhelm lint my-chart/\n\`\`\`\n\n### Exercice 2 : Publier sur OCI registry\n\`\`\`bash\nhelm registry login registry.example.com\nhelm push my-chart-1.0.0.tgz oci://registry.example.com/charts\nhelm install test oci://registry.example.com/charts/my-chart\n\`\`\`\n\n### Exercice 3 : Chart Museum self-hosted\n\`\`\`bash\n# Déployer Chart Museum\n# Publier le chart\n# Installer depuis le repo\n\`\`\`\n\n### Exercice 4 : Signer le chart\n\`\`\`bash\nhelm package --sign --key 'My Key' my-chart/\nhelm verify my-chart-1.0.0.tgz\n\`\`\`\n\n### Exercice 5 : Documenter avec helm-docs\n\`\`\`bash\n# Ajouter des commentaires dans values.yaml\n# Générer le README automatiquement\nhelm-docs\ncat my-chart/README.md\n\`\`\``,
    keyPoints: JSON.stringify(['Un chart publiable inclut Chart.yaml complet, README, LICENSE et values.schema.json', 'Les OCI registries (Docker Hub, ECR, Harbor) hébergent les charts comme des images', 'Chart Museum offre un hosting self-hosted simple pour les charts internes', 'La signature GPG garantit l\'intégrité et l\'authenticité des charts', 'helm-docs génère automatiquement la documentation depuis les commentaires values.yaml', 'Les dépendances (postgresql, redis) sont déclarées dans Chart.yaml avec conditions', 'Le fichier NOTES.txt affiche les instructions post-installation', 'values.schema.json valide les paramètres fournis par l\'utilisateur']),
  },

  {
    id: 'helm-10', courseId: 'helm', title: 'Projet final Helm', duration: '5h', orderIndex: 10,
    theoryContent: `# Projet final Helm : Chart complet avec CI/CD\n\n## Objectif\n\nCréer et déployer un Helm chart complet pour une application web : app + base de données + ingress + monitoring, avec des values par environnement et intégration CI/CD.\n\n## 1. Chart avec dépendances\n\n\`\`\`yaml\n# Chart.yaml\napiVersion: v2\nname: webapp\nversion: 1.0.0\nappVersion: "2.0.0"\ndependencies:\n  - name: postgresql\n    version: "13.2.0"\n    repository: "https://charts.bitnami.com/bitnami"\n    condition: postgresql.enabled\n  - name: redis\n    version: "18.3.0"\n    repository: "https://charts.bitnami.com/bitnami"\n    condition: redis.enabled\n\`\`\`\n\n## 2. Templates complets\n\n\`\`\`yaml\n# templates/deployment.yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: {{ include "webapp.fullname" . }}\n  labels: {{- include "webapp.labels" . | nindent 4 }}\nspec:\n  replicas: {{ .Values.replicaCount }}\n  selector:\n    matchLabels: {{- include "webapp.selectorLabels" . | nindent 6 }}\n  template:\n    metadata:\n      labels: {{- include "webapp.selectorLabels" . | nindent 8 }}\n      annotations:\n        checksum/config: {{ include (print $.Template.BasePath "/configmap.yaml") . | sha256sum }}\n    spec:\n      containers:\n      - name: {{ .Chart.Name }}\n        image: "{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}"\n        ports:\n        - containerPort: {{ .Values.service.targetPort }}\n        envFrom:\n        - configMapRef:\n            name: {{ include "webapp.fullname" . }}-config\n        - secretRef:\n            name: {{ include "webapp.fullname" . }}-secrets\n        resources: {{- toYaml .Values.resources | nindent 10 }}\n        livenessProbe:\n          httpGet:\n            path: {{ .Values.probes.liveness.path }}\n            port: {{ .Values.service.targetPort }}\n        readinessProbe:\n          httpGet:\n            path: {{ .Values.probes.readiness.path }}\n            port: {{ .Values.service.targetPort }}\n\`\`\`\n\n## 3. Values par environnement\n\n\`\`\`yaml\n# values-production.yaml\nreplicaCount: 3\nimage:\n  repository: registry.company.com/webapp\n  tag: "2.0.0"\nresources:\n  requests: { cpu: 200m, memory: 256Mi }\n  limits: { cpu: 500m, memory: 512Mi }\ningress:\n  enabled: true\n  hosts:\n    - host: app.company.com\n      paths: [{ path: /, pathType: Prefix }]\n  tls:\n    - secretName: app-tls\n      hosts: [app.company.com]\nautoscaling:\n  enabled: true\n  minReplicas: 3\n  maxReplicas: 10\n  targetCPUUtilization: 70\npostgresql:\n  enabled: true\n  auth:\n    existingSecret: webapp-db-credentials\nredis:\n  enabled: true\n  auth:\n    existingSecret: webapp-redis-credentials\n\`\`\`\n\n## 4. CI/CD Pipeline\n\n\`\`\`yaml\n# .gitlab-ci.yml\nhelm-lint:\n  stage: validate\n  script:\n    - helm lint ./chart\n    - helm template ./chart -f chart/values-production.yaml\n\nhelm-package:\n  stage: build\n  script:\n    - helm dependency update ./chart\n    - helm package ./chart\n    - helm push webapp-*.tgz oci://registry.company.com/charts\n\nhelm-deploy-staging:\n  stage: deploy\n  script:\n    - helm upgrade --install webapp ./chart \\\\\n        -f chart/values-staging.yaml \\\\\n        -n staging --create-namespace \\\\\n        --set image.tag=\\\\$CI_COMMIT_SHA \\\\\n        --wait --timeout 5m\n\nhelm-deploy-prod:\n  stage: deploy\n  when: manual\n  script:\n    - helm upgrade --install webapp ./chart \\\\\n        -f chart/values-production.yaml \\\\\n        -n production \\\\\n        --set image.tag=\\\\$CI_COMMIT_TAG \\\\\n        --wait --timeout 10m --atomic\n\`\`\`\n\n## 5. Tests Helm\n\n\`\`\`yaml\n# templates/tests/test-connection.yaml\napiVersion: v1\nkind: Pod\nmetadata:\n  name: "{{ include \\"webapp.fullname\\" . }}-test"\n  annotations:\n    "helm.sh/hook": test\nspec:\n  containers:\n  - name: test\n    image: busybox\n    command: ['wget', '--spider', 'http://{{ include "webapp.fullname" . }}:{{ .Values.service.port }}/health']\n  restartPolicy: Never\n\`\`\`\n\n\`\`\`bash\n# Lancer les tests\nhelm test webapp -n production\n\`\`\``,
    practiceContent: `## Travaux Pratiques : Projet final Helm\n\n### Étape 1 : Créer le chart\n\`\`\`bash\nhelm create webapp\n# Personnaliser les templates : deployment, service, ingress, HPA\n# Ajouter les dépendances PostgreSQL et Redis\nhelm dependency update webapp/\n\`\`\`\n\n### Étape 2 : Values par environnement\n\`\`\`bash\n# Créer values-dev.yaml, values-staging.yaml, values-production.yaml\n# Tester le rendu : helm template webapp -f values-production.yaml\n\`\`\`\n\n### Étape 3 : Déployer en staging\n\`\`\`bash\nhelm upgrade --install webapp ./webapp \\\\\n  -f webapp/values-staging.yaml -n staging --create-namespace\nkubectl get all -n staging\nhelm test webapp -n staging\n\`\`\`\n\n### Étape 4 : Pipeline CI/CD\n\`\`\`bash\n# helm lint + helm template (validation)\n# helm package + helm push (publication)\n# helm upgrade --install --atomic (déploiement)\n\`\`\`\n\n### Étape 5 : Rollback\n\`\`\`bash\nhelm history webapp -n production\nhelm rollback webapp 1 -n production\nkubectl get pods -n production\n\`\`\``,
    keyPoints: JSON.stringify(['Un chart complet inclut deployment, service, ingress, HPA, configmap et secrets', 'Les values par environnement (dev/staging/prod) paramètrent le même chart', 'Les dépendances (PostgreSQL, Redis) se déclarent dans Chart.yaml avec conditions', 'helm upgrade --install --atomic garantit un rollback automatique en cas d\'échec', 'Les tests Helm vérifient la connectivité post-déploiement', 'Le pipeline CI/CD lint, package, push et déploie le chart automatiquement', 'Le checksum des configmaps force un redéploiement quand la config change', 'helm history et helm rollback permettent de revenir à une version précédente']),
  },



  {
    id: 'argo-09', courseId: 'argocd', title: 'ArgoCD et la sécurité', duration: '3h30', orderIndex: 9,
    theoryContent: `# ArgoCD et la sécurité\n\n## 1. RBAC dans ArgoCD\n\nArgoCD implémente un modèle RBAC granulaire qui contrôle l'accès aux applications, projets et clusters.\n\n\`\`\`csv\n# argocd-rbac-cm ConfigMap\n# Format: p, <role>, <resource>, <action>, <project>/<object>, allow/deny\n\npolicy.csv: |\n  # Rôle admin du projet production\n  p, role:prod-admin, applications, *, production/*, allow\n  p, role:prod-admin, clusters, get, *, allow\n  p, role:prod-admin, repositories, get, *, allow\n\n  # Rôle développeur (read-only en prod, full en dev)\n  p, role:developer, applications, get, production/*, allow\n  p, role:developer, applications, *, development/*, allow\n  p, role:developer, applications, sync, staging/*, allow\n\n  # Rôle viewer (read-only partout)\n  p, role:viewer, applications, get, */*, allow\n  p, role:viewer, logs, get, */*, allow\n\n  # Mapping groupes OIDC -> rôles\n  g, devops-team, role:admin\n  g, backend-team, role:developer\n  g, qa-team, role:viewer\n\`\`\`\n\n## 2. SSO avec OIDC\n\n\`\`\`yaml\n# argocd-cm ConfigMap\ndata:\n  url: https://argocd.company.com\n  oidc.config: |\n    name: Keycloak\n    issuer: https://keycloak.company.com/auth/realms/company\n    clientID: argocd\n    clientSecret: \\$oidc.keycloak.clientSecret\n    requestedScopes: ["openid", "profile", "email", "groups"]\n    groupsClaim: groups\n\`\`\`\n\n## 3. Sealed Secrets\n\n\`\`\`bash\n# Installer le contrôleur Sealed Secrets\nhelm install sealed-secrets bitnami/sealed-secrets -n kube-system\n\n# Chiffrer un secret\nkubectl create secret generic db-creds \\\\\n  --from-literal=password=supersecret \\\\\n  --dry-run=client -o yaml | \\\\\n  kubeseal --controller-name=sealed-secrets -o yaml > sealed-db-creds.yaml\n\n# Le sealed secret peut être commité dans Git en toute sécurité\ncat sealed-db-creds.yaml\n# apiVersion: bitnami.com/v1alpha1\n# kind: SealedSecret\n# spec:\n#   encryptedData:\n#     password: AgBy3i4OJSWK+...  (chiffré avec la clé du cluster)\n\`\`\`\n\n## 4. External Secrets Operator\n\n\`\`\`yaml\n# ExternalSecret - synchronise depuis AWS Secrets Manager, Vault, etc.\napiVersion: external-secrets.io/v1beta1\nkind: ExternalSecret\nmetadata:\n  name: app-secrets\nspec:\n  refreshInterval: 1h\n  secretStoreRef:\n    name: aws-secrets-manager\n    kind: ClusterSecretStore\n  target:\n    name: app-secrets\n    creationPolicy: Owner\n  data:\n    - secretKey: DB_PASSWORD\n      remoteRef:\n        key: production/app/database\n        property: password\n    - secretKey: API_KEY\n      remoteRef:\n        key: production/app/api\n        property: key\n\`\`\`\n\n## 5. Audit et compliance\n\n\`\`\`bash\n# ArgoCD génère des events Kubernetes pour chaque sync\nkubectl get events -n argocd --field-selector reason=SyncSuccess\n\n# Notifications pour audit trail\napiVersion: notifications.argoproj.io/v1alpha1\nkind: Notification\nspec:\n  triggers:\n    - name: on-sync-succeeded\n      template: sync-audit\n    - name: on-sync-failed\n      template: sync-failed-audit\n  templates:\n    - name: sync-audit\n      message: |\n        App: {{.app.metadata.name}}\n        Status: Synced\n        Author: {{.app.status.operationState.operation.initiatedBy.username}}\n        Revision: {{.app.status.sync.revision}}\n        Time: {{.app.status.operationState.finishedAt}}\n\`\`\`\n\n## 6. Network Policies\n\n\`\`\`yaml\n# Isoler ArgoCD du réseau applicatif\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: argocd-server-network-policy\n  namespace: argocd\nspec:\n  podSelector:\n    matchLabels:\n      app.kubernetes.io/name: argocd-server\n  policyTypes: [Ingress, Egress]\n  ingress:\n    - from:\n        - namespaceSelector:\n            matchLabels: { name: ingress-system }\n      ports:\n        - port: 8080\n  egress:\n    - to:\n        - ipBlock: { cidr: 0.0.0.0/0 }  # Accès aux repos Git\n      ports:\n        - port: 443\n\`\`\``,
    practiceContent: `## Travaux Pratiques : ArgoCD et la sécurité\n\n### Exercice 1 : Configurer le RBAC\n\`\`\`bash\n# Créer des rôles : admin, developer, viewer\n# Associer les groupes SSO aux rôles\n# Tester les permissions avec différents utilisateurs\n\`\`\`\n\n### Exercice 2 : Sealed Secrets\n\`\`\`bash\n# Installer Sealed Secrets controller\n# Chiffrer un secret avec kubeseal\n# Commiter le SealedSecret dans Git\n# Vérifier que ArgoCD le déchiffre correctement\n\`\`\`\n\n### Exercice 3 : External Secrets\n\`\`\`bash\n# Configurer un SecretStore vers un provider\n# Créer un ExternalSecret\n# Vérifier la synchronisation automatique\n\`\`\`\n\n### Exercice 4 : SSO Configuration\n\`\`\`bash\n# Configurer OIDC avec un fournisseur d'identité\n# Mapper les groupes vers les rôles ArgoCD\n# Tester le login SSO\n\`\`\`\n\n### Exercice 5 : Audit trail\n\`\`\`bash\n# Configurer les notifications pour chaque sync\n# Vérifier les events Kubernetes\n# Exporter vers un système de log centralisé\n\`\`\``,
    keyPoints: JSON.stringify(['Le RBAC ArgoCD contrôle l\'accès par application, projet et action (get/sync/delete)', 'L\'intégration SSO/OIDC centralise l\'authentification via Keycloak, Okta ou Azure AD', 'Sealed Secrets chiffre les secrets pour les stocker en toute sécurité dans Git', 'External Secrets Operator synchronise les secrets depuis Vault, AWS SM ou GCP SM', 'Les Network Policies isolent ArgoCD et limitent les flux réseau autorisés', 'L\'audit trail trace chaque sync avec l\'utilisateur, la révision et le timestamp', 'Les notifications ArgoCD alertent sur les syncs réussis et échoués', 'Le principe du moindre privilège s\'applique : read en prod, write en dev']),
  },

  {
    id: 'argo-10', courseId: 'argocd', title: 'Projet final ArgoCD', duration: '5h', orderIndex: 10,
    theoryContent: `# Projet final ArgoCD : GitOps complet\n\n## Objectif\n\nImplémenter un workflow GitOps complet avec ArgoCD : structure de repo, App of Apps pattern, déploiement multi-environnement, monitoring de la synchronisation et disaster recovery.\n\n## 1. Structure du repo GitOps\n\n\`\`\`\ngitops-repo/\n├── apps/                    # App of Apps (racine)\n│   ├── Chart.yaml\n│   ├── values.yaml\n│   └── templates/\n│       ├── api-app.yaml\n│       ├── frontend-app.yaml\n│       ├── worker-app.yaml\n│       └── infra-app.yaml\n├── environments/\n│   ├── development/\n│   │   ├── api/\n│   │   │   ├── kustomization.yaml\n│   │   │   └── patches/\n│   │   └── frontend/\n│   ├── staging/\n│   │   ├── api/\n│   │   └── frontend/\n│   └── production/\n│       ├── api/\n│       │   ├── kustomization.yaml\n│       │   ├── deployment-patch.yaml\n│       │   └── hpa.yaml\n│       └── frontend/\n├── base/                    # Manifestes de base\n│   ├── api/\n│   │   ├── deployment.yaml\n│   │   ├── service.yaml\n│   │   └── kustomization.yaml\n│   └── frontend/\n└── infrastructure/          # Components infra\n    ├── cert-manager/\n    ├── ingress-nginx/\n    ├── monitoring/\n    └── sealed-secrets/\n\`\`\`\n\n## 2. App of Apps Pattern\n\n\`\`\`yaml\n# apps/templates/api-app.yaml\napiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: api-{{ .Values.environment }}\n  namespace: argocd\n  finalizers:\n    - resources-finalizer.argocd.argoproj.io\nspec:\n  project: {{ .Values.environment }}\n  source:\n    repoURL: {{ .Values.repoURL }}\n    targetRevision: {{ .Values.targetRevision }}\n    path: environments/{{ .Values.environment }}/api\n  destination:\n    server: {{ .Values.cluster }}\n    namespace: {{ .Values.environment }}\n  syncPolicy:\n    automated:\n      prune: true\n      selfHeal: true\n    syncOptions:\n      - CreateNamespace=true\n      - ApplyOutOfSyncOnly=true\n    retry:\n      limit: 3\n      backoff:\n        duration: 5s\n        factor: 2\n        maxDuration: 3m\n\`\`\`\n\n## 3. Multi-environnement avec Kustomize\n\n\`\`\`yaml\n# base/api/kustomization.yaml\napiVersion: kustomize.config.k8s.io/v1beta1\nkind: Kustomization\nresources:\n  - deployment.yaml\n  - service.yaml\n\n# environments/production/api/kustomization.yaml\napiVersion: kustomize.config.k8s.io/v1beta1\nkind: Kustomization\nresources:\n  - ../../../base/api\n  - hpa.yaml\n  - pdb.yaml\npatches:\n  - path: deployment-patch.yaml\nnamePrefix: prod-\nnamespace: production\n\n# environments/production/api/deployment-patch.yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: api\nspec:\n  replicas: 3\n  template:\n    spec:\n      containers:\n      - name: api\n        resources:\n          requests: { cpu: 500m, memory: 512Mi }\n          limits: { cpu: "1", memory: 1Gi }\n\`\`\`\n\n## 4. Sync Waves et Hooks\n\n\`\`\`yaml\n# Ordre de déploiement avec sync waves\n# Wave -1 : Namespace et secrets\n# Wave 0 : Base de données\n# Wave 1 : Application\n# Wave 2 : Ingress et monitoring\n\napiVersion: v1\nkind: Namespace\nmetadata:\n  name: production\n  annotations:\n    argocd.argoproj.io/sync-wave: "-1"\n---\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: postgres\n  annotations:\n    argocd.argoproj.io/sync-wave: "0"\n---\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: api\n  annotations:\n    argocd.argoproj.io/sync-wave: "1"\n\`\`\`\n\n## 5. Monitoring et Notifications\n\n\`\`\`yaml\n# Notifications ArgoCD\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: argocd-notifications-cm\ndata:\n  service.slack: |\n    token: \\$slack-token\n  trigger.on-sync-succeeded: |\n    - send: [app-sync-succeeded]\n  trigger.on-sync-failed: |\n    - send: [app-sync-failed]\n  template.app-sync-succeeded: |\n    slack:\n      attachments: |\n        [{\n          "color": "#18be52",\n          "title": "✅ {{ .app.metadata.name }} synced",\n          "text": "Revision: {{ .app.status.sync.revision | trunc 7 }}"\n        }]\n\`\`\`\n\n## 6. Disaster Recovery\n\n\`\`\`bash\n# Backup ArgoCD\nkubectl get applications -n argocd -o yaml > backup-apps.yaml\nkubectl get appprojects -n argocd -o yaml > backup-projects.yaml\nkubectl get secrets -n argocd -l argocd.argoproj.io/secret-type=repository -o yaml > backup-repos.yaml\n\n# Restauration\nkubectl apply -f backup-apps.yaml\nkubectl apply -f backup-projects.yaml\nkubectl apply -f backup-repos.yaml\n\n# Comme tout est dans Git, la restauration est simple :\n# 1. Réinstaller ArgoCD\n# 2. Reconfigurer les repos et credentials\n# 3. Appliquer l'App of Apps → tout se resynchronise automatiquement\n\`\`\``,
    practiceContent: `## Travaux Pratiques : Projet final ArgoCD\n\n### Étape 1 : Créer la structure GitOps\n\`\`\`bash\nmkdir -p gitops/{apps/templates,base/api,environments/{dev,staging,prod}/api,infrastructure}\n# Créer les manifestes de base (deployment, service)\n# Créer les kustomizations par environnement\n\`\`\`\n\n### Étape 2 : App of Apps\n\`\`\`bash\n# Créer le chart App of Apps\n# Déployer : chaque Application gère un environnement\nargocd app create root-app --repo gitops-repo --path apps --dest-server https://kubernetes.default.svc\n\`\`\`\n\n### Étape 3 : Multi-environnement\n\`\`\`bash\n# dev : 1 replica, resources minimales\n# staging : 2 replicas, resources moyennes\n# prod : 3 replicas, HPA, PDB, resources complètes\nargocd app list\nargocd app sync api-production\n\`\`\`\n\n### Étape 4 : Notifications et monitoring\n\`\`\`bash\n# Configurer les notifications Slack\n# Vérifier les events de sync\n# Dashboard Grafana pour ArgoCD metrics\n\`\`\`\n\n### Étape 5 : Disaster Recovery\n\`\`\`bash\n# Backup des applications et projets\n# Simuler une perte du cluster\n# Restaurer ArgoCD + App of Apps → tout revient automatiquement\n\`\`\``,
    keyPoints: JSON.stringify(['Le pattern App of Apps déploie et gère toutes les applications depuis une seule racine', 'La structure GitOps sépare base, environments et infrastructure dans le repo', 'Kustomize avec patches adapte les manifestes de base par environnement', 'Les Sync Waves ordonnent le déploiement (namespace → DB → app → ingress)', 'automated + selfHeal maintient l\'état du cluster synchronisé avec Git en permanence', 'Les notifications alertent sur chaque sync réussi ou échoué via Slack', 'Le disaster recovery est simplifié : tout l\'état est dans Git', 'Le retry avec backoff exponentiel gère les erreurs transitoires de sync']),
  },

];
