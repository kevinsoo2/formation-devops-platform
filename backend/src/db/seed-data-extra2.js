export const extraModules2 = [

  {
    id: 'docker-06',
    courseId: 'docker',
    title: 'Docker Swarm',
    duration: '3h',
    orderIndex: 6,
    theoryContent: `## Docker Swarm - Orchestration Native

### Introduction à Docker Swarm

Docker Swarm est le moteur d'orchestration natif intégré à Docker Engine. Il permet de transformer un groupe de machines Docker en un cluster unifié et hautement disponible. Contrairement à Kubernetes, Swarm privilégie la simplicité de mise en place et d'utilisation.

### Architecture du cluster Swarm

\`\`\`
┌─────────────────────────────────────────────────────┐
│                   SWARM CLUSTER                       │
│                                                       │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐       │
│  │  Manager  │  │  Manager  │  │  Manager  │       │
│  │  (Leader) │  │ (Follower)│  │ (Follower)│       │
│  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘       │
│        │               │               │             │
│        └───────────────┼───────────────┘             │
│                        │ Raft Consensus              │
│  ┌─────────┐  ┌───────┴───┐  ┌─────────┐          │
│  │ Worker 1│  │  Worker 2  │  │ Worker 3│          │
│  │ [Task]  │  │  [Task]    │  │ [Task]  │          │
│  └─────────┘  └────────────┘  └─────────┘          │
└─────────────────────────────────────────────────────┘
\`\`\`

### Initialisation du cluster

\`\`\`bash
# Initialiser le premier manager
docker swarm init --advertise-addr 192.168.1.10

# Obtenir le token pour ajouter des workers
docker swarm join-token worker

# Obtenir le token pour ajouter des managers
docker swarm join-token manager

# Rejoindre le cluster en tant que worker
docker swarm join --token SWMTKN-xxx 192.168.1.10:2377

# Lister les noeuds du cluster
docker node ls
\`\`\`

### Services et réplication

Un service Swarm définit l'état souhaité d'une application. Swarm maintient automatiquement cet état.

\`\`\`bash
# Créer un service répliqué
docker service create --name webapp \\
  --replicas 3 \\
  --publish 8080:80 \\
  nginx:alpine

# Lister les services
docker service ls

# Voir les tâches d'un service
docker service ps webapp

# Mettre à l'échelle un service
docker service scale webapp=5

# Inspecter un service
docker service inspect --pretty webapp
\`\`\`

### Rolling Updates

Les mises à jour progressives permettent de déployer sans interruption de service :

\`\`\`bash
# Mettre à jour l'image avec rolling update
docker service update \\
  --image nginx:1.25 \\
  --update-parallelism 2 \\
  --update-delay 10s \\
  --update-failure-action rollback \\
  webapp

# Rollback en cas de problème
docker service rollback webapp

# Configurer la politique de mise à jour
docker service update \\
  --update-order start-first \\
  --update-monitor 30s \\
  webapp
\`\`\`

### Gestion des Secrets

Docker Swarm intègre un gestionnaire de secrets chiffré :

\`\`\`bash
# Créer un secret
echo "motdepasse123" | docker secret create db_password -

# Créer un secret depuis un fichier
docker secret create tls_cert ./server.crt

# Utiliser un secret dans un service
docker service create --name api \\
  --secret db_password \\
  --secret tls_cert \\
  mon-api:latest

# Lister les secrets
docker secret ls
\`\`\`

Dans le conteneur, les secrets sont montés dans \`/run/secrets/\` :

\`\`\`bash
# Lecture du secret dans l'application
cat /run/secrets/db_password
\`\`\`

### Docker Stacks

Les stacks permettent de déployer des applications multi-services via un fichier Compose :

\`\`\`yaml
# docker-stack.yml
version: "3.8"
services:
  web:
    image: mon-app:latest
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
      restart_policy:
        condition: on-failure
    ports:
      - "80:3000"
    secrets:
      - db_password
    networks:
      - frontend

  db:
    image: postgres:15
    deploy:
      placement:
        constraints:
          - node.role == manager
    volumes:
      - db-data:/var/lib/postgresql/data
    secrets:
      - db_password
    networks:
      - backend

networks:
  frontend:
    driver: overlay
  backend:
    driver: overlay
    internal: true

volumes:
  db-data:

secrets:
  db_password:
    external: true
\`\`\`

\`\`\`bash
# Déployer une stack
docker stack deploy -c docker-stack.yml mon-app

# Lister les stacks
docker stack ls

# Voir les services d'une stack
docker stack services mon-app

# Supprimer une stack
docker stack rm mon-app
\`\`\`

### Réseau Overlay et contraintes

\`\`\`bash
# Créer un réseau overlay
docker network create --driver overlay --attachable mon-reseau

# Réseau overlay chiffré
docker network create --driver overlay --opt encrypted securenet

# Contraintes de placement
docker service create --constraint 'node.hostname == serveur01' nginx
docker service create --constraint 'node.role == worker' nginx

# Labels personnalisés
docker node update --label-add zone=europe serveur01
docker service create --constraint 'node.labels.zone == europe' nginx
\`\`\`

### Health Checks et comparaison

Swarm redémarre automatiquement les conteneurs défaillants grâce aux health checks.

| Critère | Docker Swarm | Kubernetes |
|---------|-------------|------------|
| Complexité | Simple | Complexe |
| Setup | Minutes | Heures |
| Scaling | Bon | Excellent |
| Écosystème | Limité | Très riche |
| Production | PME | Enterprise |`,
    practiceContent: `## Travaux Pratiques - Docker Swarm

### TP1 : Création d'un cluster Swarm

Initialisez un cluster Swarm avec 1 manager et 2 workers en utilisant docker-machine ou des VMs. Testez la haute disponibilité :

\`\`\`bash
# Sur le manager
docker swarm init --advertise-addr eth0

# Récupérer le token et joindre les workers
TOKEN=\\\$(docker swarm join-token -q worker)
# Sur chaque worker
docker swarm join --token \\\$TOKEN manager-ip:2377

# Vérifier le cluster
docker node ls

# Tester la résilience
docker node update --availability drain worker-01
docker service ps webapp  # Observer la redistribution
docker node update --availability active worker-01
\`\`\`

### TP2 : Déploiement d'une stack complète

Créez un fichier stack pour une application web avec Redis et PostgreSQL. Configurez 3 réplicas pour le frontend, des health checks, et des contraintes de placement. Déployez avec \`docker stack deploy\`. Vérifiez que tous les services sont bien distribués sur les noeuds.

\`\`\`bash
# Déployer et monitorer
docker stack deploy -c docker-stack.yml myapp
docker stack services myapp
docker service logs myapp_web -f
\`\`\`

### TP3 : Rolling updates et rollbacks

Déployez une v1 de votre application, puis effectuez un rolling update vers v2 avec \`--update-delay 10s\`. Simulez une erreur et pratiquez le rollback automatique. Observez le comportement avec \`docker service ps\`. Documentez les différentes stratégies de mise à jour (start-first vs stop-first).

### TP4 : Gestion des secrets et réseau

Créez des secrets pour les credentials de base de données. Montez-les dans vos services et vérifiez qu'ils sont accessibles dans \`/run/secrets/\`. Testez la rotation des secrets en créant une nouvelle version et en mettant à jour le service. Configurez un réseau overlay chiffré entre les services.`,
    keyPoints: JSON.stringify(['Architecture Manager/Worker avec consensus Raft', 'Services répliqués et mode global', 'Rolling updates avec rollback automatique', 'Secrets chiffrés intégrés au cluster', 'Stacks pour déploiements multi-services', 'Réseaux overlay pour communication inter-noeuds', 'Contraintes de placement et labels', 'Health checks et self-healing automatique']),
  },

  {
    id: 'docker-07',
    courseId: 'docker',
    title: 'CI/CD avec Docker',
    duration: '3h',
    orderIndex: 7,
    theoryContent: `## CI/CD avec Docker

### Introduction

Docker est devenu un pilier fondamental des pipelines CI/CD modernes. Il garantit la reproductibilité des builds, isole les environnements de test et simplifie les déploiements. Ce module couvre les bonnes pratiques pour intégrer Docker dans vos workflows d'intégration et déploiement continus.

### Multi-stage Builds pour la CI

Les builds multi-étapes permettent de séparer la compilation du packaging final :

\`\`\`dockerfile
# Étape 1 : Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Étape 2 : Tests
FROM builder AS tester
RUN npm ci
RUN npm run test
RUN npm run lint

# Étape 3 : Image finale
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
EXPOSE 3000
USER node
CMD ["node", "dist/server.js"]
\`\`\`

### GitHub Actions avec Docker

\`\`\`yaml
name: CI/CD Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \\\${{ github.actor }}
          password: \\\${{ secrets.GITHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ghcr.io/\\\${{ github.repository }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
\`\`\`

### Stratégies de cache Docker en CI

\`\`\`
┌──────────────────────────────────────────┐
│          Stratégies de Cache              │
│                                          │
│  1. Cache Registry (--cache-from)        │
│     └─ Stocké dans le registry           │
│                                          │
│  2. Cache GitHub Actions (type=gha)      │
│     └─ Stocké dans le cache GHA          │
│                                          │
│  3. Cache local (type=local)             │
│     └─ Stocké sur le runner              │
│                                          │
│  4. Cache inline (--cache-to inline)     │
│     └─ Embarqué dans l'image             │
└──────────────────────────────────────────┘
\`\`\`

\`\`\`bash
# Build avec cache depuis le registry
docker build \\
  --cache-from=mon-app:latest \\
  --tag mon-app:new \\
  --build-arg BUILDKIT_INLINE_CACHE=1 .

# Cache local avec BuildKit
docker buildx build \\
  --cache-from=type=local,src=/tmp/.buildx-cache \\
  --cache-to=type=local,dest=/tmp/.buildx-cache-new \\
  --tag mon-app:latest .
\`\`\`

### Registries de conteneurs

| Registry | Usage | Avantages |
|----------|-------|-----------|
| Docker Hub | Public/privé | Popularité, images officielles |
| GHCR | GitHub | Intégré aux Actions |
| ECR | AWS | IAM, scanning intégré |
| GCR/Artifact | GCP | Intégré à GKE |
| ACR | Azure | Intégré à AKS |
| Harbor | Self-hosted | Contrôle total, scanning |

### Tagging et versioning

\`\`\`bash
# Stratégie de tags recommandée
docker tag mon-app:build ghcr.io/org/app:latest
docker tag mon-app:build ghcr.io/org/app:v1.2.3
docker tag mon-app:build ghcr.io/org/app:sha-abc1234

# Semantic versioning automatique
VERSION=\\\$(git describe --tags --always)
docker build -t mon-app:\\\$VERSION .
\`\`\`

### Scanning de sécurité dans le pipeline

\`\`\`bash
# Avec Trivy
trivy image --severity HIGH,CRITICAL mon-app:latest

# Avec Docker Scout
docker scout cves mon-app:latest --only-severity critical,high

# Avec Snyk
snyk container test mon-app:latest
\`\`\`

### Pipeline complet avec tests d'intégration

\`\`\`yaml
services:
  app:
    build: .
    depends_on:
      db:
        condition: service_healthy
  db:
    image: postgres:15
    healthcheck:
      test: ["CMD-SHELL", "pg_isready"]
      interval: 5s
      timeout: 5s
      retries: 5
\`\`\`

\`\`\`bash
# Lancer les tests d'intégration avec Docker Compose
docker compose -f docker-compose.test.yml up --build --abort-on-container-exit
EXIT_CODE=\\\$?
docker compose -f docker-compose.test.yml down -v
exit \\\$EXIT_CODE
\`\`\`

### Bonnes pratiques Dockerfiles en CI

\`\`\`dockerfile
# Utiliser des images de base légères et versionnées
FROM alpine:3.19

# Fixer les versions des dépendances
RUN apk add --no-cache curl=8.5.0-r0

# Labels pour la traçabilité
LABEL org.opencontainers.image.source="https://github.com/mon/repo"
LABEL org.opencontainers.image.revision="abc123"
\`\`\``,
    practiceContent: `## Travaux Pratiques - CI/CD avec Docker

### TP1 : Dockerfile multi-stage optimisé

Créez un Dockerfile multi-stage pour une application Node.js avec trois étapes : build, test et production. L'image finale ne doit pas contenir les devDependencies ni les fichiers source TypeScript. Mesurez la taille de l'image finale vs une image standard.

\`\`\`bash
# Comparer les tailles
docker build -t app:standard -f Dockerfile.standard .
docker build -t app:multistage -f Dockerfile.multistage .
docker images | grep app
\`\`\`

### TP2 : Pipeline GitHub Actions complet

Mettez en place un workflow GitHub Actions qui :
- Build l'image Docker avec cache GHA activé
- Lance les tests unitaires dans un conteneur dédié
- Scanne les vulnérabilités avec Trivy (fail si critique)
- Push vers GHCR si les tests passent
- Déploie automatiquement sur la branche main

Créez les fichiers : .github/workflows/ci.yml, Dockerfile, docker-compose.test.yml

### TP3 : Tests d'intégration containerisés

Créez un docker-compose.test.yml qui lance votre application avec une base PostgreSQL et un Redis. Exécutez les tests d'intégration et assurez-vous que le pipeline échoue proprement si un test échoue. Gérez correctement le cleanup des volumes et conteneurs après les tests.

### TP4 : Registry privé et scanning

Configurez un registry Harbor local avec Docker Compose. Poussez une image, activez le scanning automatique avec Trivy intégré, et configurez une politique qui bloque les images avec des vulnérabilités critiques. Testez le workflow complet de push, scan, et validation.`,
    keyPoints: JSON.stringify(['Multi-stage builds pour séparer build et runtime', 'Cache Docker pour accélérer les pipelines CI', 'Intégration GitHub Actions avec Docker Buildx', 'Registries conteneurs et stratégies de tagging', 'Scanning de sécurité automatisé dans le pipeline', 'Tests intégration avec Docker Compose en CI', 'Bonnes pratiques Dockerfile pour la production', 'Versioning sémantique des images Docker']),
  },

  {
    id: 'docker-08',
    courseId: 'docker',
    title: 'Troubleshooting Docker',
    duration: '3h',
    orderIndex: 8,
    theoryContent: `## Troubleshooting Docker

### Introduction au débogage Docker

Le troubleshooting Docker est une compétence essentielle pour tout ingénieur DevOps. Ce module couvre les techniques et outils pour diagnostiquer et résoudre les problèmes courants liés aux conteneurs, réseaux, stockage et performances.

### Débogage des conteneurs

\`\`\`bash
# Voir les logs d'un conteneur
docker logs mon-conteneur
docker logs --tail 100 -f mon-conteneur
docker logs --since 2h mon-conteneur

# Inspecter un conteneur en détail
docker inspect mon-conteneur
docker inspect --format '{{.State.ExitCode}}' mon-conteneur
docker inspect --format '{{.NetworkSettings.IPAddress}}' mon-conteneur

# Accéder à un conteneur en cours d'exécution
docker exec -it mon-conteneur /bin/sh
docker exec -it mon-conteneur bash

# Déboguer un conteneur arrêté
docker commit conteneur-crash debug-image
docker run -it debug-image /bin/sh

# Voir les processus dans un conteneur
docker top mon-conteneur
\`\`\`

### Problèmes réseau courants

\`\`\`
┌─────────────────────────────────────────────────┐
│         Diagnostic Réseau Docker                 │
│                                                  │
│  Symptôme          │  Vérification              │
│  ──────────────────┼──────────────────────────  │
│  Pas de connexion  │  docker network inspect    │
│  DNS échoue        │  docker exec dig/nslookup  │
│  Port inaccessible │  docker port / iptables    │
│  Latence élevée    │  docker exec ping/tracert  │
│  Paquets perdus    │  tcpdump dans le conteneur │
└─────────────────────────────────────────────────┘
\`\`\`

\`\`\`bash
# Vérifier la connectivité réseau
docker network ls
docker network inspect bridge

# Tester la résolution DNS
docker exec mon-conteneur nslookup service-name
docker exec mon-conteneur cat /etc/resolv.conf

# Vérifier les ports publiés
docker port mon-conteneur
ss -tlnp | grep docker

# Déboguer avec netshoot
docker run --net=container:mon-conteneur -it nicolaka/netshoot bash
\`\`\`

### Problèmes de stockage

\`\`\`bash
# Espace disque utilisé par Docker
docker system df
docker system df -v

# Nettoyer les ressources inutilisées
docker system prune -a --volumes

# Vérifier les volumes
docker volume ls
docker volume inspect mon-volume

# Problèmes de permissions
docker exec mon-conteneur ls -la /app/data
docker exec mon-conteneur id

# Vérifier les montages
docker inspect --format '{{json .Mounts}}' mon-conteneur | jq
\`\`\`

### Problèmes de performance

\`\`\`bash
# Statistiques en temps réel
docker stats
docker stats --no-stream --format "table {{.Name}}\\t{{.CPUPerc}}\\t{{.MemUsage}}"

# Profiling avec les events Docker
docker events --since 1h
docker events --filter 'event=oom'

# Vérifier les OOM kills
dmesg | grep -i oom
docker inspect --format '{{.State.OOMKilled}}' mon-conteneur
\`\`\`

### Problèmes de build

\`\`\`bash
# Build avec sortie détaillée
docker build --no-cache --progress=plain .

# Déboguer une étape de build
docker build --target builder -t debug-build .
docker run -it debug-build /bin/sh

# Vérifier le context de build trop volumineux
du -sh .
cat .dockerignore
\`\`\`

### Logs et monitoring

\`\`\`bash
# Configurer le driver de logs
docker run --log-driver=json-file \\
  --log-opt max-size=10m \\
  --log-opt max-file=3 \\
  mon-app

# Vérifier la configuration des logs
docker info --format '{{.LoggingDriver}}'
\`\`\`

### Commandes de diagnostic essentielles

| Problème | Commande | Description |
|----------|----------|-------------|
| Crash | docker logs -f | Voir les erreurs |
| Réseau | docker exec curl | Connectivité |
| Disque | docker system df | Espace utilisé |
| Mémoire | docker stats | Usage mémoire |
| Process | docker top | Processus actifs |
| Config | docker inspect | Configuration |
| Events | docker events | Événements |

### Daemon Docker

\`\`\`bash
# Vérifier le statut du daemon
systemctl status docker
journalctl -u docker --since "1 hour ago"

# Mode debug du daemon dans /etc/docker/daemon.json
# {"debug": true, "log-level": "debug"}
sudo systemctl restart docker

# Vérifier la configuration
docker info
docker version
\`\`\``,
    practiceContent: `## Travaux Pratiques - Troubleshooting Docker

### TP1 : Diagnostic de conteneurs défaillants

Lancez un conteneur qui crashe au démarrage. Utilisez \`docker logs\`, \`docker inspect\` et \`docker commit\` pour identifier la cause. Pratiquez la technique du conteneur de debug en commitant l'image et en y accédant en shell interactif.

\`\`\`bash
# Lancer un conteneur problématique
docker run --name crash-test alpine sh -c "exit 137"
docker inspect --format '{{.State.ExitCode}}' crash-test
# Code 137 = OOM kill, 139 = segfault, 1 = erreur app

# Déboguer en commitant l'état
docker commit crash-test debug:latest
docker run -it debug:latest /bin/sh
\`\`\`

### TP2 : Résolution de problèmes réseau

Créez deux conteneurs sur des réseaux différents et diagnostiquez pourquoi ils ne communiquent pas. Utilisez netshoot pour capturer le trafic, vérifier le DNS et tester la connectivité. Résolvez le problème en connectant les conteneurs au bon réseau.

\`\`\`bash
docker network create net-a
docker network create net-b
docker run -d --name svc-a --network net-a nginx
docker run -d --name svc-b --network net-b nginx
# Diagnostiquer et résoudre la communication
\`\`\`

### TP3 : Optimisation des performances

Lancez un conteneur sans limites de ressources qui consomme trop de mémoire. Identifiez le problème avec \`docker stats\` et \`dmesg\`. Configurez des limites mémoire et CPU appropriées, puis vérifiez que le conteneur fonctionne correctement sous contraintes.

### TP4 : Nettoyage et gestion de l'espace disque

Simulez un système Docker avec beaucoup de ressources orphelines (images dangling, volumes non utilisés, conteneurs arrêtés). Utilisez \`docker system df\` pour analyser, puis nettoyez sélectivement avec des filtres. Mettez en place un script de nettoyage automatique planifié via cron.`,
    keyPoints: JSON.stringify(['Commandes docker logs et inspect pour le diagnostic', 'Débogage réseau avec netshoot et tcpdump', 'Gestion de espace disque avec docker system df', 'Détection des OOM kills et limites de ressources', 'Techniques de debug des builds échoués', 'Centralisation des logs avec drivers appropriés', 'Diagnostic du daemon Docker et journalctl', 'Conteneurs de debug avec docker commit']),
  },

  {
    id: 'k8s-06',
    courseId: 'kubernetes',
    title: 'Operators et CRDs',
    duration: '3h',
    orderIndex: 6,
    theoryContent: `## Operators et Custom Resource Definitions (CRDs)

### Introduction aux CRDs

Les Custom Resource Definitions permettent d'étendre l'API Kubernetes avec vos propres types de ressources. Combinées avec un contrôleur personnalisé, elles forment un Operator qui automatise la gestion d'applications complexes.

### Architecture d'un Operator

\`\`\`
┌────────────────────────────────────────────────────┐
│              Pattern Operator                        │
│                                                     │
│  ┌──────────┐     ┌────────────┐    ┌──────────┐  │
│  │   User   │────>│  API Server │<───│ Operator │  │
│  │ (kubectl)│     │             │    │Controller│  │
│  └──────────┘     └──────┬─────┘    └────┬─────┘  │
│                          │                │         │
│                   ┌──────┴──────┐   Reconcile      │
│                   │    etcd     │    Loop           │
│                   │ (CRD state) │         │        │
│                   └─────────────┘         ▼        │
│                                    ┌────────────┐  │
│                                    │  Resources │  │
│                                    │ (Pods,Svc) │  │
│                                    └────────────┘  │
└────────────────────────────────────────────────────┘
\`\`\`

### Création d'une CRD

\`\`\`yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: databases.app.example.com
spec:
  group: app.example.com
  versions:
    - name: v1
      served: true
      storage: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                engine:
                  type: string
                  enum: ["postgres", "mysql", "mongodb"]
                version:
                  type: string
                replicas:
                  type: integer
                  minimum: 1
                  maximum: 5
                storage:
                  type: string
              required: ["engine", "version"]
            status:
              type: object
              properties:
                phase:
                  type: string
                readyReplicas:
                  type: integer
      subresources:
        status: {}
      additionalPrinterColumns:
        - name: Engine
          type: string
          jsonPath: .spec.engine
        - name: Phase
          type: string
          jsonPath: .status.phase
  scope: Namespaced
  names:
    plural: databases
    singular: database
    kind: Database
    shortNames:
      - db
\`\`\`

### Utilisation de la Custom Resource

\`\`\`yaml
apiVersion: app.example.com/v1
kind: Database
metadata:
  name: production-db
spec:
  engine: postgres
  version: "15"
  replicas: 3
  storage: "100Gi"
\`\`\`

\`\`\`bash
# Appliquer la CRD puis créer une instance
kubectl apply -f database-crd.yaml
kubectl apply -f production-db.yaml
kubectl get databases
kubectl get db
kubectl describe db production-db
\`\`\`

### Le pattern Reconciliation Loop

\`\`\`
Observe → Compare → Act → Repeat
   │         │        │
   │         │        └─ Créer/Modifier/Supprimer des ressources
   │         └─ État actuel vs état désiré
   └─ Watch sur les Custom Resources
\`\`\`

### Operator SDK

\`\`\`bash
# Initialiser un projet Operator
operator-sdk init --domain example.com --repo github.com/mon/operator

# Créer une API et un contrôleur
operator-sdk create api --group app --version v1 --kind Database --resource --controller

# Structure du projet générée
# ├── api/v1/database_types.go
# ├── controllers/database_controller.go
# ├── config/crd/ rbac/ manager/
# └── main.go
\`\`\`

### Exemples d'Operators populaires

| Operator | Usage | Fonctionnalités |
|----------|-------|-----------------|
| Prometheus | Monitoring | Auto-discovery, AlertManager |
| Cert-Manager | Certificats | Let's Encrypt automatique |
| Strimzi | Kafka | Cluster, topics, users |
| Zalando Postgres | BDD | HA, backups, failover |
| ArgoCD | GitOps | Sync, rollback, multi-cluster |

### Niveaux de maturité

\`\`\`
Niveau 1 : Installation basique (Helm-like)
Niveau 2 : Mises à jour gérées (upgrades)
Niveau 3 : Cycle de vie complet (backup/restore)
Niveau 4 : Monitoring intégré (metrics, alerts)
Niveau 5 : Auto-pilote (auto-scaling, tuning)
\`\`\`

### RBAC pour les Operators

\`\`\`yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: database-operator
rules:
  - apiGroups: ["app.example.com"]
    resources: ["databases", "databases/status"]
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
  - apiGroups: ["apps"]
    resources: ["statefulsets"]
    verbs: ["get", "list", "watch", "create", "update", "delete"]
  - apiGroups: [""]
    resources: ["services", "configmaps", "secrets", "pods"]
    verbs: ["get", "list", "watch", "create", "update", "delete"]
\`\`\``,
    practiceContent: `## Travaux Pratiques - Operators et CRDs

### TP1 : Création d'une CRD

Définissez une CRD pour un type "WebApp" qui accepte des propriétés comme image, replicas, port et ingress. Appliquez-la au cluster et créez plusieurs instances. Vérifiez avec kubectl.

\`\`\`bash
# Appliquer votre CRD
kubectl apply -f webapp-crd.yaml

# Créer une instance
kubectl apply -f my-webapp.yaml

# Vérifier les instances créées
kubectl get webapps -o wide
kubectl describe webapp my-app

# Tester la validation du schema
kubectl apply -f invalid-webapp.yaml  # doit échouer
\`\`\`

### TP2 : Operator avec Operator SDK

Initialisez un projet Operator avec operator-sdk en Go. Implémentez la logique de réconciliation pour créer automatiquement un Deployment et un Service quand une ressource WebApp est créée. Testez localement avec \`make run\`. Observez que modifier la CR met à jour les ressources gérées.

### TP3 : Validation et webhooks

Ajoutez des webhooks de validation à votre CRD pour empêcher les valeurs invalides (ex: replicas > 10, ports réservés). Implémentez aussi un webhook de mutation qui ajoute des labels par défaut. Testez que les requêtes invalides sont rejetées avec un message d'erreur clair et compréhensible.

### TP4 : Operator existant - Prometheus

Installez l'Operator Prometheus avec Helm. Créez des ServiceMonitor pour surveiller vos applications. Créez des PrometheusRule pour les alertes. Observez comment l'Operator crée et configure automatiquement les instances Prometheus selon vos ressources personnalisées déployées dans le cluster.`,
    keyPoints: JSON.stringify(['CRDs pour étendre API Kubernetes avec types personnalisés', 'Pattern Operator avec boucle de réconciliation', 'Operator SDK pour scaffolding en Go ou Ansible', 'Niveaux de maturité des Operators de 1 à 5', 'Validation avec OpenAPI schema et webhooks', 'RBAC approprié pour les contrôleurs Operator', 'OperatorHub et catalogue des Operators communautaires', 'Gestion du cycle de vie complet des applications']),
  },

  {
    id: 'k8s-07',
    courseId: 'kubernetes',
    title: 'Service Mesh avec Istio',
    duration: '3h',
    orderIndex: 7,
    theoryContent: `## Service Mesh avec Istio

### Qu'est-ce qu'un Service Mesh ?

Un Service Mesh est une couche d'infrastructure dédiée à la gestion de la communication entre microservices. Istio est le service mesh le plus populaire pour Kubernetes, offrant gestion du trafic, sécurité et observabilité sans modifier le code applicatif.

### Architecture d'Istio

\`\`\`
┌──────────────────────────────────────────────────────┐
│                    Control Plane                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │                    istiod                        │ │
│  │  ┌─────────┐  ┌──────────┐  ┌──────────────┐  │ │
│  │  │  Pilot  │  │  Citadel │  │    Galley    │  │ │
│  │  │(routing)│  │ (certs)  │  │   (config)   │  │ │
│  │  └─────────┘  └──────────┘  └──────────────┘  │ │
│  └─────────────────────────────────────────────────┘ │
│                         │                             │
│                    Data Plane                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐    │
│  │   Pod A    │  │   Pod B    │  │   Pod C    │    │
│  │ ┌────────┐ │  │ ┌────────┐ │  │ ┌────────┐ │    │
│  │ │  App   │ │  │ │  App   │ │  │ │  App   │ │    │
│  │ ├────────┤ │  │ ├────────┤ │  │ ├────────┤ │    │
│  │ │ Envoy  │ │  │ │ Envoy  │ │  │ │ Envoy  │ │    │
│  │ │sidecar │ │  │ │sidecar │ │  │ │sidecar │ │    │
│  │ └────────┘ │  │ └────────┘ │  │ └────────┘ │    │
│  └────────────┘  └────────────┘  └────────────┘    │
└──────────────────────────────────────────────────────┘
\`\`\`

### Installation d'Istio

\`\`\`bash
# Télécharger istioctl
curl -L https://istio.io/downloadIstio | sh -
export PATH=\\\$PWD/istio-1.20/bin:\\\$PATH

# Installer avec le profil demo
istioctl install --set profile=demo -y

# Activer l'injection sidecar automatique
kubectl label namespace default istio-injection=enabled

# Vérifier l'installation
istioctl verify-install
kubectl get pods -n istio-system
\`\`\`

### Gestion du trafic - VirtualService

\`\`\`yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: webapp
spec:
  hosts:
    - webapp
  http:
    - match:
        - headers:
            x-version:
              exact: "canary"
      route:
        - destination:
            host: webapp
            subset: v2
    - route:
        - destination:
            host: webapp
            subset: v1
          weight: 90
        - destination:
            host: webapp
            subset: v2
          weight: 10
---
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: webapp
spec:
  host: webapp
  subsets:
    - name: v1
      labels:
        version: v1
    - name: v2
      labels:
        version: v2
\`\`\`

### Sécurité mTLS

\`\`\`yaml
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: default
spec:
  mtls:
    mode: STRICT
---
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: allow-frontend
spec:
  selector:
    matchLabels:
      app: backend
  rules:
    - from:
        - source:
            principals: ["cluster.local/ns/default/sa/frontend"]
      to:
        - operation:
            methods: ["GET", "POST"]
            paths: ["/api/*"]
\`\`\`

### Observabilité

\`\`\`bash
# Accéder aux dashboards intégrés
istioctl dashboard kiali
istioctl dashboard grafana
istioctl dashboard jaeger

# Métriques disponibles automatiquement
# istio_requests_total
# istio_request_duration_milliseconds
# istio_tcp_connections_opened_total
\`\`\`

### Circuit Breaker

\`\`\`yaml
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: backend-cb
spec:
  host: backend
  trafficPolicy:
    outlierDetection:
      consecutive5xxErrors: 3
      interval: 30s
      baseEjectionTime: 60s
      maxEjectionPercent: 50
\`\`\`

### Gateway Ingress

\`\`\`yaml
apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  name: main-gateway
spec:
  selector:
    istio: ingressgateway
  servers:
    - port:
        number: 443
        name: https
        protocol: HTTPS
      tls:
        mode: SIMPLE
        credentialName: tls-secret
      hosts:
        - "app.example.com"
\`\`\``,
    practiceContent: `## Travaux Pratiques - Service Mesh Istio

### TP1 : Installation et injection sidecar

Installez Istio sur votre cluster avec le profil demo. Déployez l'application de démonstration bookinfo et activez l'injection automatique de sidecars. Vérifiez que chaque pod contient 2 conteneurs (app + envoy).

\`\`\`bash
# Installer Istio
istioctl install --set profile=demo
kubectl label ns default istio-injection=enabled

# Déployer bookinfo
kubectl apply -f samples/bookinfo/platform/kube/bookinfo.yaml
kubectl get pods  # Vérifier 2/2 READY pour chaque pod
kubectl describe pod productpage-xxx  # Voir le sidecar istio-proxy
\`\`\`

### TP2 : Canary deployment avec Istio

Déployez deux versions de votre application (v1 et v2). Configurez un VirtualService pour envoyer 90% du trafic vers v1 et 10% vers v2. Augmentez progressivement le trafic vers v2 et observez les métriques dans Kiali. Testez aussi le routage par headers pour cibler les beta-testeurs.

### TP3 : Sécurité mTLS et politiques

Activez mTLS strict sur votre namespace. Créez des AuthorizationPolicies pour que seul le frontend puisse accéder au backend. Testez qu'un pod non autorisé reçoit une erreur 403. Vérifiez le chiffrement avec \`istioctl proxy-config\`.

\`\`\`bash
# Vérifier le mTLS actif
istioctl proxy-config secret productpage-xxx
kubectl exec deploy/sleep -- curl -s backend:8080  # doit échouer
\`\`\`

### TP4 : Observabilité avec Kiali et Jaeger

Générez du trafic avec un outil de charge comme fortio. Explorez le graphe de service dans Kiali, les métriques dans Grafana et les traces distribuées dans Jaeger. Identifiez les goulots d'étranglement et les services les plus lents dans votre architecture microservices.`,
    keyPoints: JSON.stringify(['Architecture sidecar proxy avec Envoy', 'Gestion du trafic avec VirtualService et DestinationRule', 'Canary deployments et traffic splitting', 'Sécurité mTLS automatique entre services', 'AuthorizationPolicy pour contrôle accès', 'Observabilité avec Kiali Grafana et Jaeger', 'Circuit breaker et outlier detection', 'Gateway Ingress pour trafic externe']),
  },
  {
    id: 'k8s-08',
    courseId: 'kubernetes',
    title: 'Multi-tenancy et coûts',
    duration: '3h',
    orderIndex: 8,
    theoryContent: `## Multi-tenancy et optimisation des coûts Kubernetes

### Introduction à la multi-tenancy

La multi-tenancy dans Kubernetes permet de partager un cluster entre plusieurs équipes ou projets tout en assurant l'isolation, la sécurité et une répartition équitable des ressources.

### Modèles d'isolation

\`\`\`
┌──────────────────────────────────────────────────┐
│          Niveaux d'isolation K8s                  │
│                                                   │
│  Niveau 1 : Namespace (soft isolation)           │
│  ├── ResourceQuotas                              │
│  ├── LimitRanges                                 │
│  └── NetworkPolicies                             │
│                                                   │
│  Niveau 2 : Node isolation                       │
│  ├── NodeAffinity / Taints                       │
│  ├── Dedicated node pools                        │
│  └── RuntimeClass (gVisor/Kata)                  │
│                                                   │
│  Niveau 3 : Cluster virtuel (vCluster)           │
│  ├── API Server dédié                            │
│  └── Isolation complète du control plane         │
└──────────────────────────────────────────────────┘
\`\`\`

### Resource Quotas

\`\`\`yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: team-frontend-quota
  namespace: team-frontend
spec:
  hard:
    requests.cpu: "10"
    requests.memory: 20Gi
    limits.cpu: "20"
    limits.memory: 40Gi
    pods: "50"
    services: "10"
    persistentvolumeclaims: "20"
---
apiVersion: v1
kind: LimitRange
metadata:
  name: default-limits
  namespace: team-frontend
spec:
  limits:
    - default:
        cpu: "500m"
        memory: "512Mi"
      defaultRequest:
        cpu: "100m"
        memory: "128Mi"
      max:
        cpu: "4"
        memory: "8Gi"
      type: Container
\`\`\`

### Network Policies

\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all-ingress
  namespace: team-frontend
spec:
  podSelector: {}
  policyTypes:
    - Ingress
    - Egress
  ingress: []
  egress:
    - to:
        - namespaceSelector:
            matchLabels:
              name: kube-system
      ports:
        - protocol: UDP
          port: 53
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-same-namespace
  namespace: team-frontend
spec:
  podSelector: {}
  ingress:
    - from:
        - podSelector: {}
\`\`\`

### Karpenter pour optimisation des coûts

\`\`\`yaml
apiVersion: karpenter.sh/v1beta1
kind: NodePool
metadata:
  name: default
spec:
  template:
    spec:
      requirements:
        - key: karpenter.sh/capacity-type
          operator: In
          values: ["spot", "on-demand"]
        - key: karpenter.k8s.aws/instance-category
          operator: In
          values: ["c", "m", "r"]
  limits:
    cpu: 1000
    memory: 1000Gi
  disruption:
    consolidationPolicy: WhenUnderutilized
    expireAfter: 720h
\`\`\`

### Stratégies de réduction des coûts

| Stratégie | Économie | Risque |
|-----------|----------|--------|
| Spot instances | 60-90% | Interruptions |
| Right-sizing | 20-40% | Sous-provisioning |
| HPA Autoscaling | 30-50% | Latence au scale |
| Karpenter | 30-60% | Complexité |
| Réservations | 30-50% | Engagement long |

### Vertical Pod Autoscaler

\`\`\`yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: webapp-vpa
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: webapp
  updatePolicy:
    updateMode: "Auto"
  resourcePolicy:
    containerPolicies:
      - containerName: webapp
        minAllowed:
          cpu: 50m
          memory: 64Mi
        maxAllowed:
          cpu: 2000m
          memory: 4Gi
\`\`\`

### Outils de suivi des coûts

\`\`\`bash
# Kubecost - visibilité des coûts
helm install kubecost cost-analyzer \\
  --repo https://kubecost.github.io/cost-analyzer/ \\
  --namespace kubecost --create-namespace

# OpenCost - alternative open source
kubectl apply -f https://raw.githubusercontent.com/opencost/opencost/develop/kubernetes/opencost.yaml

# Surveiller l'utilisation
kubectl top pods -n team-frontend --sort-by=cpu
kubectl top nodes
\`\`\``,
    practiceContent: `## Travaux Pratiques - Multi-tenancy et coûts

### TP1 : Configuration multi-tenant

Créez un environnement multi-tenant avec 3 namespaces (team-a, team-b, shared). Appliquez des ResourceQuotas et LimitRanges à chaque namespace. Testez que les limites sont respectées en tentant de dépasser les quotas avec des déploiements excessifs.

\`\`\`bash
# Créer les namespaces avec labels
kubectl create ns team-a
kubectl label ns team-a team=a
kubectl apply -f quota-team-a.yaml -n team-a

# Tester le dépassement
kubectl run test --image=nginx -n team-a --requests='cpu=100,memory=8Gi'
# Doit échouer si le quota est dépassé
\`\`\`

### TP2 : Isolation réseau

Implémentez des NetworkPolicies pour isoler complètement les namespaces entre eux, tout en autorisant la communication avec les services partagés (DNS, monitoring). Validez avec des tests de connectivité entre pods de différents namespaces. Documentez les règles appliquées.

### TP3 : Optimisation avec Karpenter

Configurez Karpenter avec un NodePool utilisant des instances spot et on-demand en fallback. Déployez une charge variable et observez comment Karpenter provisionne et consolide les noeuds automatiquement. Mesurez les économies réalisées par rapport à un cluster statique.

### TP4 : Analyse des coûts avec Kubecost

Installez Kubecost sur votre cluster. Générez du trafic sur différents namespaces pendant 1 heure. Analysez les coûts par namespace et par label. Identifiez les ressources sur-provisionnées et proposez des recommandations d'optimisation en configurant le VPA en mode recommend.`,
    keyPoints: JSON.stringify(['Isolation par namespaces avec ResourceQuotas', 'LimitRanges pour valeurs par défaut des conteneurs', 'NetworkPolicies pour isolation réseau entre tenants', 'Karpenter pour provisioning intelligent des noeuds', 'Instances Spot pour réduction des coûts compute', 'VPA et HPA pour right-sizing automatique', 'Kubecost et OpenCost pour visibilité financière', 'Hierarchical Namespaces pour héritage de politiques']),
  },

  {
    id: 'tf-06',
    courseId: 'terraform',
    title: 'Terraform Cloud et Enterprise',
    duration: '3h',
    orderIndex: 6,
    theoryContent: `## Terraform Cloud et Enterprise

### Introduction

Terraform Cloud (TFC) et Terraform Enterprise (TFE) sont les solutions HashiCorp pour la collaboration en équipe sur l'infrastructure as code. Ils offrent des fonctionnalités avancées comme les remote runs, l'estimation des coûts, les politiques Sentinel et la gestion des workspaces.

### Architecture Terraform Cloud

\`\`\`
┌──────────────────────────────────────────────────────┐
│                 Terraform Cloud                        │
│                                                       │
│  ┌────────────┐  ┌────────────┐  ┌──────────────┐  │
│  │ Workspaces │  │  VCS Integ │  │   Registry   │  │
│  │            │  │  (GitHub)  │  │  (Modules)   │  │
│  └─────┬──────┘  └──────┬─────┘  └──────────────┘  │
│        │                 │                            │
│  ┌─────┴─────────────────┴─────────────────────┐    │
│  │              Run Pipeline                     │    │
│  │  Plan → Cost Est. → Sentinel → Apply         │    │
│  └──────────────────────────────────────────────┘    │
│                                                       │
│  ┌──────────┐  ┌──────────────┐  ┌────────────┐    │
│  │  State   │  │   Variables  │  │   Teams    │    │
│  │ (remote) │  │  (encrypted) │  │   (RBAC)   │    │
│  └──────────┘  └──────────────┘  └────────────┘    │
└──────────────────────────────────────────────────────┘
\`\`\`

### Configuration des Workspaces

\`\`\`hcl
terraform {
  cloud {
    organization = "mon-entreprise"
    workspaces {
      name = "production-infra"
    }
  }
}
\`\`\`

### Politiques Sentinel

Sentinel est le framework de Policy as Code de HashiCorp :

\`\`\`python
# sentinel/restrict-instance-types.sentinel
import "tfplan/v2" as tfplan

allowed_types = ["t3.micro", "t3.small", "t3.medium", "m5.large"]

main = rule {
  all tfplan.resource_changes as _, rc {
    rc.type is "aws_instance" implies
      rc.change.after.instance_type in allowed_types
  }
}

# sentinel/require-tags.sentinel
import "tfplan/v2" as tfplan

mandatory_tags = ["environment", "team", "cost-center"]

main = rule {
  all tfplan.resource_changes as _, rc {
    all mandatory_tags as tag {
      rc.change.after.tags contains tag
    }
  }
}
\`\`\`

### Estimation des coûts

\`\`\`
┌─────────────────────────────────────────┐
│         Cost Estimation Report           │
│                                          │
│  Resource                 Monthly Cost   │
│  ─────────────────────────────────────   │
│  + aws_instance.web       +85.00 USD     │
│  + aws_rds_instance.db    +150.00 USD    │
│  ~ aws_instance.api       +30.00 USD     │
│                                          │
│  Total monthly change:    +265.00 USD    │
│  New monthly total:       1,432.00 USD   │
└─────────────────────────────────────────┘
\`\`\`

### Run Triggers et workflows

\`\`\`
Workspace A (réseau)
    │
    ├── trigger ──> Workspace B (compute)
    │                    │
    │                    └── trigger ──> Workspace C (app)
    │
    └── trigger ──> Workspace D (database)
\`\`\`

### Teams et RBAC

| Rôle | Permissions |
|------|-------------|
| Admin | Tout gérer |
| Write | Plan + Apply |
| Plan | Plan uniquement |
| Read | Lecture seule |
| Custom | Granulaire |

### Private Registry

\`\`\`hcl
module "vpc" {
  source  = "app.terraform.io/mon-org/vpc/aws"
  version = "~> 3.0"

  cidr_block  = "10.0.0.0/16"
  environment = var.environment
}
\`\`\`

### Variable Sets

\`\`\`bash
# Variables d'environnement partagées entre workspaces
# Variable Sets permettent de définir une fois, utiliser partout
# Exemples : AWS credentials, tags communs, région par défaut

# API Terraform Cloud
curl -s \\
  --header "Authorization: Bearer \\\$TFC_TOKEN" \\
  --header "Content-Type: application/vnd.api+json" \\
  https://app.terraform.io/api/v2/organizations/mon-org/workspaces
\`\`\`

### Speculative Plans

Les speculative plans s'exécutent automatiquement sur les Pull Requests via l'intégration VCS. Ils permettent de prévisualiser les changements sans risque d'application. Le résultat est affiché directement dans la PR sous forme de commentaire avec le plan détaillé.`,
    practiceContent: `## Travaux Pratiques - Terraform Cloud

### TP1 : Configuration initiale TFC

Créez un compte Terraform Cloud et configurez un workspace connecté à votre repository Git. Migrez un état Terraform local vers le backend remote. Configurez les variables d'environnement AWS et les variables Terraform sensibles.

\`\`\`bash
# Migrer l'état vers TFC
terraform login
terraform init -migrate-state

# Vérifier que l'état est bien sur TFC
terraform state list
terraform show
\`\`\`

### TP2 : Pipeline VCS complet

Configurez l'intégration VCS pour que chaque Pull Request déclenche un speculative plan. Observez le plan dans l'interface TFC et dans les commentaires de la PR. Configurez l'auto-apply sur main et vérifiez que l'apply s'exécute automatiquement après merge.

### TP3 : Politiques Sentinel

Écrivez des politiques Sentinel qui imposent : tags obligatoires (environment, team, cost-center) sur toutes les ressources, types d'instances autorisés uniquement t3 et m5, et régions AWS limitées à eu-west. Testez que les violations bloquent le pipeline avec un message explicatif clair.

\`\`\`bash
# Structure des policies
sentinel/
  restrict-instance-types.sentinel
  require-tags.sentinel
  allowed-regions.sentinel
  sentinel.hcl
\`\`\`

### TP4 : Workspaces chaînés avec run triggers

Créez trois workspaces (network, compute, application) avec des run triggers entre eux. Le workspace réseau déclenche compute qui déclenche application. Utilisez les remote state data sources pour passer les outputs (vpc_id, subnet_ids) entre workspaces. Testez le déclenchement en chaîne.`,
    keyPoints: JSON.stringify(['Workspaces pour séparer environnements et équipes', 'Remote runs dans environnement sécurisé', 'Estimation automatique des coûts infrastructure', 'Sentinel pour Policy as Code et gouvernance', 'Intégration VCS avec speculative plans sur PR', 'Variable Sets partagés entre workspaces', 'Private Module Registry pour réutilisation', 'Run Triggers pour orchestration multi-workspace']),
  },
  {
    id: 'tf-07',
    courseId: 'terraform',
    title: 'Patterns avancés',
    duration: '3h',
    orderIndex: 7,
    theoryContent: `## Patterns Terraform Avancés

### Introduction

Les patterns avancés Terraform permettent de gérer des infrastructures complexes avec élégance. Ce module couvre les techniques de déploiement zero-downtime, les stratégies blue-green, la création conditionnelle et les bonnes pratiques pour count et for_each.

### Zero-Downtime Deployment

\`\`\`hcl
resource "aws_instance" "web" {
  ami           = var.ami_id
  instance_type = var.instance_type

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "web-server"
  }
}

resource "aws_autoscaling_group" "web" {
  name             = "web-asg"
  min_size         = 2
  max_size         = 6
  desired_capacity = 3
  launch_template {
    id      = aws_launch_template.web.id
    version = "$Latest"
  }

  instance_refresh {
    strategy = "Rolling"
    preferences {
      min_healthy_percentage = 75
      instance_warmup        = 300
    }
  }

  lifecycle {
    create_before_destroy = true
  }
}
\`\`\`

### Blue-Green Infrastructure

\`\`\`
┌─────────────────────────────────────────────┐
│         Blue-Green Deployment                │
│                                              │
│  ┌─────────┐         ┌─────────┐           │
│  │  Blue   │◄──ALB──►│  Green  │           │
│  │ (active)│   swap   │ (idle)  │           │
│  └─────────┘         └─────────┘           │
│                                              │
│  1. Deploy to Green                         │
│  2. Test Green                              │
│  3. Switch ALB to Green                     │
│  4. Blue becomes idle                       │
└─────────────────────────────────────────────┘
\`\`\`

\`\`\`hcl
variable "active_environment" {
  type    = string
  default = "blue"
}

resource "aws_lb_target_group" "blue" {
  name     = "tg-blue"
  port     = 80
  protocol = "HTTP"
  vpc_id   = var.vpc_id
  health_check {
    path = "/health"
  }
}

resource "aws_lb_target_group" "green" {
  name     = "tg-green"
  port     = 80
  protocol = "HTTP"
  vpc_id   = var.vpc_id
  health_check {
    path = "/health"
  }
}

resource "aws_lb_listener_rule" "main" {
  listener_arn = aws_lb_listener.main.arn
  priority     = 1
  action {
    type             = "forward"
    target_group_arn = var.active_environment == "blue" ? aws_lb_target_group.blue.arn : aws_lb_target_group.green.arn
  }
  condition {
    path_pattern { values = ["/*"] }
  }
}
\`\`\`

### Count vs for_each

\`\`\`hcl
# COUNT - pour des ressources identiques
resource "aws_instance" "worker" {
  count         = var.worker_count
  ami           = var.ami_id
  instance_type = "t3.medium"
  tags = { Name = "worker-\\\${count.index}" }
}

# FOR_EACH avec une map - préféré pour ressources nommées
variable "subnets" {
  type = map(object({
    cidr = string
    az   = string
  }))
  default = {
    public-a  = { cidr = "10.0.1.0/24", az = "eu-west-1a" }
    public-b  = { cidr = "10.0.2.0/24", az = "eu-west-1b" }
    private-a = { cidr = "10.0.3.0/24", az = "eu-west-1a" }
  }
}

resource "aws_subnet" "this" {
  for_each          = var.subnets
  vpc_id            = aws_vpc.main.id
  cidr_block        = each.value.cidr
  availability_zone = each.value.az
  tags = { Name = each.key }
}
\`\`\`

### Création conditionnelle

\`\`\`hcl
resource "aws_cloudwatch_metric_alarm" "high_cpu" {
  count       = var.enable_monitoring ? 1 : 0
  alarm_name  = "high-cpu"
  metric_name = "CPUUtilization"
  namespace   = "AWS/EC2"
  threshold   = 80
}

output "alarm_arn" {
  value = var.enable_monitoring ? aws_cloudwatch_metric_alarm.high_cpu[0].arn : null
}
\`\`\`

### Dynamic blocks

\`\`\`hcl
variable "ingress_rules" {
  type = list(object({
    port        = number
    protocol    = string
    cidr_blocks = list(string)
  }))
}

resource "aws_security_group" "web" {
  name   = "web-sg"
  vpc_id = var.vpc_id

  dynamic "ingress" {
    for_each = var.ingress_rules
    content {
      from_port   = ingress.value.port
      to_port     = ingress.value.port
      protocol    = ingress.value.protocol
      cidr_blocks = ingress.value.cidr_blocks
    }
  }
}
\`\`\`

### Moved blocks pour refactoring

\`\`\`hcl
moved {
  from = aws_instance.web
  to   = aws_instance.application
}

moved {
  from = aws_instance.web
  to   = module.compute.aws_instance.web
}
\`\`\`

### Pattern Module Composition

\`\`\`hcl
module "network" {
  source = "./modules/network"
  cidr   = var.vpc_cidr
}

module "database" {
  source     = "./modules/database"
  subnet_ids = module.network.private_subnet_ids
  vpc_id     = module.network.vpc_id
}

module "application" {
  source      = "./modules/application"
  subnet_ids  = module.network.public_subnet_ids
  db_endpoint = module.database.endpoint
}
\`\`\``,
    practiceContent: `## Travaux Pratiques - Patterns Avancés Terraform

### TP1 : Blue-Green deployment

Implémentez une infrastructure blue-green avec un ALB et deux target groups. Créez une variable pour basculer le trafic entre blue et green. Testez le basculement et vérifiez le zero-downtime avec curl en boucle pendant la transition.

\`\`\`bash
# Déployer en blue
terraform apply -var="active_environment=blue"

# Basculer vers green (zero-downtime)
terraform apply -var="active_environment=green"

# Vérifier avec curl en parallèle
while true; do curl -s http://lb-url/version; sleep 0.5; done
\`\`\`

### TP2 : for_each et dynamic blocks

Créez un module réseau qui utilise for_each pour créer des subnets à partir d'une map. Ajoutez des security groups avec des dynamic blocks pour les règles d'ingress variables. Testez l'ajout et la suppression d'éléments de la map sans impacter les autres ressources existantes.

### TP3 : Création conditionnelle avancée

Développez un module qui crée optionnellement un CloudWatch alarm, un WAF et un CDN selon des variables booléennes. Testez que désactiver une feature ne détruit pas les autres. Utilisez les outputs conditionnels avec des ternaires pour gérer les cas où la ressource n'existe pas.

### TP4 : Refactoring avec moved blocks

Restructurez un projet Terraform monolithique en modules séparés (network, compute, database). Utilisez les moved blocks pour migrer les ressources sans les recréer. Vérifiez avec \`terraform plan\` qu'aucune ressource n'est détruite ou recréée pendant la migration.`,
    keyPoints: JSON.stringify(['Zero-downtime avec create_before_destroy lifecycle', 'Blue-Green infrastructure avec basculement ALB', 'Création conditionnelle avec count ternaire', 'for_each préféré à count pour ressources nommées', 'Dynamic blocks pour règles variables', 'Moved blocks pour refactoring sans destruction', 'Pattern composition de modules', 'Instance refresh pour rolling updates ASG']),
  },

  {
    id: 'tf-08',
    courseId: 'terraform',
    title: 'Multi-cloud avec Terraform',
    duration: '3h',
    orderIndex: 8,
    theoryContent: `## Multi-cloud avec Terraform

### Introduction au Multi-cloud

Le multi-cloud consiste à utiliser plusieurs fournisseurs cloud pour répartir les charges, éviter le vendor lock-in et optimiser les coûts. Terraform est l'outil idéal pour cette approche grâce à son abstraction par providers.

### Architecture Multi-cloud

\`\`\`
┌──────────────────────────────────────────────────────┐
│              Architecture Multi-Cloud                  │
│                                                       │
│  ┌─────────────┐    ┌─────────────┐    ┌──────────┐ │
│  │     AWS     │    │     GCP     │    │  Azure   │ │
│  │  ┌───────┐  │    │  ┌───────┐  │    │ ┌──────┐ │ │
│  │  │  EKS  │  │    │  │  GKE  │  │    │ │ AKS  │ │ │
│  │  └───────┘  │    │  └───────┘  │    │ └──────┘ │ │
│  │  ┌───────┐  │    │  ┌───────┐  │    │ ┌──────┐ │ │
│  │  │  RDS  │  │    │  │CloudSQL│  │    │ │AzuDB │ │ │
│  │  └───────┘  │    │  └───────┘  │    │ └──────┘ │ │
│  └──────┬──────┘    └──────┬──────┘    └────┬─────┘ │
│         └──────────────────┼────────────────┘        │
│                    Terraform (Orchestrator)            │
└──────────────────────────────────────────────────────┘
\`\`\`

### Configuration multi-provider

\`\`\`hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "eu-west-1"
  default_tags {
    tags = {
      ManagedBy   = "terraform"
      Environment = var.environment
    }
  }
}

provider "google" {
  project = var.gcp_project
  region  = "europe-west1"
}
\`\`\`

### Dépendances cross-provider (VPN)

\`\`\`hcl
resource "aws_vpn_gateway" "main" {
  vpc_id = aws_vpc.main.id
  tags   = { Name = "vpn-to-gcp" }
}

resource "google_compute_vpn_gateway" "main" {
  name    = "vpn-to-aws"
  network = google_compute_network.main.id
}

resource "google_compute_vpn_tunnel" "to_aws" {
  name          = "tunnel-to-aws"
  peer_ip       = aws_vpn_connection.main.tunnel1_address
  shared_secret = var.vpn_shared_secret
  vpn_gateway   = google_compute_vpn_gateway.main.id
  local_traffic_selector  = ["10.1.0.0/16"]
  remote_traffic_selector = ["10.0.0.0/16"]
}
\`\`\`

### Modules partagés multi-cloud

\`\`\`hcl
variable "cloud_provider" {
  type = string
  validation {
    condition     = contains(["aws", "gcp"], var.cloud_provider)
    error_message = "Provider doit etre aws ou gcp."
  }
}

module "eks" {
  source = "./aws"
  count  = var.cloud_provider == "aws" ? 1 : 0
  cluster_name = var.cluster_name
  node_count   = var.node_count
}

module "gke" {
  source = "./gcp"
  count  = var.cloud_provider == "gcp" ? 1 : 0
  cluster_name = var.cluster_name
  node_count   = var.node_count
}

output "cluster_endpoint" {
  value = var.cloud_provider == "aws" ? module.eks[0].endpoint : module.gke[0].endpoint
}
\`\`\`

### DNS multi-cloud avec failover

\`\`\`hcl
resource "aws_route53_health_check" "primary" {
  fqdn              = "api-aws.example.com"
  port              = 443
  type              = "HTTPS"
  resource_path     = "/health"
  failure_threshold = 3
}

resource "aws_route53_record" "api" {
  zone_id = var.zone_id
  name    = "api.example.com"
  type    = "A"
  failover_routing_policy {
    type = "PRIMARY"
  }
  set_identifier  = "primary"
  health_check_id = aws_route53_health_check.primary.id
  alias {
    name    = aws_lb.main.dns_name
    zone_id = aws_lb.main.zone_id
  }
}
\`\`\`

### Comparaison des services cloud

| Service | AWS | GCP | Azure |
|---------|-----|-----|-------|
| Compute | EC2 | Compute Engine | VMs |
| K8s | EKS | GKE | AKS |
| Serverless | Lambda | Cloud Functions | Functions |
| BDD | RDS | Cloud SQL | Azure DB |
| Storage | S3 | GCS | Blob |
| CDN | CloudFront | Cloud CDN | Azure CDN |

### State management multi-cloud

\`\`\`hcl
terraform {
  backend "s3" {
    bucket         = "terraform-state-multicloud"
    key            = "global/terraform.tfstate"
    region         = "eu-west-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
\`\`\``,
    practiceContent: `## Travaux Pratiques - Multi-cloud Terraform

### TP1 : Infrastructure multi-provider

Configurez un projet Terraform avec les providers AWS et GCP simultanément. Créez un VPC dans chaque cloud avec des CIDR compatibles (10.0.0.0/16 pour AWS, 10.1.0.0/16 pour GCP). Documentez les différences d'API entre les deux providers pour des ressources équivalentes.

\`\`\`bash
# Initialiser avec les deux providers
terraform init
terraform plan -var="gcp_project=mon-projet"
terraform apply
\`\`\`

### TP2 : Connectivité cross-cloud

Établissez une connexion VPN IPSec entre AWS et GCP en utilisant Terraform. Déployez un service simple dans chaque cloud et vérifiez la communication inter-cloud via le tunnel VPN. Mesurez la latence entre les deux environnements avec ping et traceroute.

### TP3 : Module abstrait multi-cloud

Créez un module Terraform qui abstrait la création d'un cluster Kubernetes. Le module doit supporter AWS (EKS) et GCP (GKE) via une variable cloud_provider. Utilisez le pattern de module conditionnel avec count. Testez le déploiement dans les deux clouds avec les mêmes variables d'entrée et comparez les outputs.

### TP4 : DNS failover multi-cloud

Implémentez un failover DNS avec Route53 entre une application sur AWS (primaire) et GCP (secondaire). Configurez des health checks HTTPS avec un intervalle de 30 secondes et simulez une panne du primaire en arrêtant le service. Observez le basculement automatique vers le secondaire et mesurez le temps de failover en tenant compte du TTL DNS configuré.`,
    keyPoints: JSON.stringify(['Configuration multi-provider dans un même projet', 'Gestion des dépendances cross-cloud VPN et peering', 'Modules abstraits pour portabilité entre clouds', 'DNS failover pour haute disponibilité multi-cloud', 'Comparaison des services équivalents entre providers', 'State management centralisé pour multi-cloud', 'Stratégies de migration progressive entre clouds', 'Coûts et compromis du multi-cloud']),
  },

  {
    id: 'ans-06',
    courseId: 'ansible',
    title: 'Ansible pour Windows',
    duration: '3h',
    orderIndex: 6,
    theoryContent: `## Ansible pour Windows

### Introduction

Ansible peut gérer des systèmes Windows efficacement. La connexion se fait via WinRM (Windows Remote Management) au lieu de SSH. Ce module couvre la configuration WinRM, les modules Windows, Chocolatey, DSC et la gestion Active Directory.

### Architecture de connexion

\`\`\`
┌──────────────────────────────────────────────────┐
│         Connexion Ansible vers Windows            │
│                                                   │
│  ┌──────────────┐         ┌──────────────────┐  │
│  │   Ansible    │  WinRM  │   Windows Host   │  │
│  │  Controller  │────────>│                  │  │
│  │   (Linux)    │  HTTPS  │  ┌────────────┐  │  │
│  └──────────────┘  :5986  │  │ PowerShell │  │  │
│                           │  └────────────┘  │  │
│                           └──────────────────┘  │
└──────────────────────────────────────────────────┘
\`\`\`

### Configuration WinRM

\`\`\`powershell
# Activer WinRM sur le serveur Windows
Enable-PSRemoting -Force
winrm quickconfig -transport:https

# Script Ansible pour configurer WinRM
powershell -ExecutionPolicy Bypass -File ConfigureRemotingForAnsible.ps1

# Vérifier la configuration
winrm enumerate winrm/config/listener
\`\`\`

### Inventaire Windows

\`\`\`ini
[windows_servers]
win-web01 ansible_host=192.168.1.50
win-db01 ansible_host=192.168.1.51

[windows_servers:vars]
ansible_user=admin@DOMAIN.LOCAL
ansible_password=MotDePasse123
ansible_connection=winrm
ansible_winrm_transport=ntlm
ansible_winrm_server_cert_validation=ignore
ansible_port=5986
\`\`\`

### Modules Windows essentiels

\`\`\`yaml
# Installation de logiciels
- name: Installer un MSI
  ansible.windows.win_package:
    path: https://example.com/installer.msi
    state: present
    arguments: /quiet /norestart

# Gestion des services
- name: Démarrer IIS
  ansible.windows.win_service:
    name: W3SVC
    start_mode: auto
    state: started

# Registre Windows
- name: Configurer une clé
  ansible.windows.win_regedit:
    path: HKLM:\\SOFTWARE\\MonApp
    name: Version
    data: "2.0"
    type: string

# Commandes PowerShell
- name: Configurer firewall
  ansible.windows.win_powershell:
    script: |
      New-NetFirewallRule -DisplayName "Allow HTTP" -Direction Inbound -Port 80 -Protocol TCP -Action Allow

# Features Windows
- name: Installer IIS
  ansible.windows.win_feature:
    name:
      - Web-Server
      - Web-Asp-Net45
    state: present
    include_management_tools: yes
\`\`\`

### Chocolatey

\`\`\`yaml
# Installer des paquets avec Chocolatey
- name: Installer les outils de développement
  chocolatey.chocolatey.win_chocolatey:
    name:
      - git
      - nodejs
      - vscode
      - 7zip
      - python
    state: present

# Mettre à jour tous les paquets
- name: Mettre à jour Chocolatey
  chocolatey.chocolatey.win_chocolatey:
    name: all
    state: latest
\`\`\`

### DSC (Desired State Configuration)

\`\`\`yaml
- name: Configurer IIS via DSC
  ansible.windows.win_dsc:
    resource_name: WindowsFeature
    Name: Web-Server
    Ensure: Present
    IncludeAllSubFeature: true

- name: Site web IIS via DSC
  ansible.windows.win_dsc:
    resource_name: xWebsite
    Name: MonSite
    PhysicalPath: C:\\inetpub\\MonSite
    State: Started
\`\`\`

### Active Directory

\`\`\`yaml
# Créer un utilisateur AD
- name: Créer utilisateur
  microsoft.ad.user:
    name: jean.dupont
    firstname: Jean
    surname: Dupont
    password: TempPass123!
    state: present
    path: "OU=Users,DC=domain,DC=local"
    groups:
      add:
        - Developers
        - VPN-Users

# Joindre un serveur au domaine
- name: Joindre le domaine
  microsoft.ad.membership:
    dns_domain_name: domain.local
    domain_admin_user: admin@domain.local
    domain_admin_password: AdminPass123
    state: domain
    reboot: true
\`\`\`

### Playbook complet serveur Windows

\`\`\`yaml
---
- name: Configurer serveur web Windows
  hosts: windows_servers
  tasks:
    - name: Installer les features
      ansible.windows.win_feature:
        name: "{{ item }}"
        state: present
      loop:
        - Web-Server
        - NET-Framework-45-Core

    - name: Installer outils Chocolatey
      chocolatey.chocolatey.win_chocolatey:
        name: "{{ item }}"
        state: present
      loop:
        - dotnet-sdk
        - urlrewrite

    - name: Configurer le service
      ansible.windows.win_service:
        name: MonService
        start_mode: auto
        state: started
\`\`\``,
    practiceContent: `## Travaux Pratiques - Ansible pour Windows

### TP1 : Configuration WinRM et connexion

Configurez WinRM sur un serveur Windows (VM ou conteneur Windows). Testez la connexion depuis votre contrôleur Ansible avec win_ping. Configurez HTTPS avec un certificat auto-signé et testez les différents transports (ntlm, kerberos, credssp).

\`\`\`bash
# Tester la connexion
ansible windows_servers -m ansible.windows.win_ping -i inventory/windows.ini

# Vérifier les facts Windows
ansible windows_servers -m ansible.windows.setup -i inventory/windows.ini

# Tester une commande simple
ansible windows_servers -m ansible.windows.win_shell -a "Get-Service" -i inventory/windows.ini
\`\`\`

### TP2 : Provisioning avec Chocolatey

Créez un playbook qui installe un environnement de développement complet avec Chocolatey : Git, VS Code, Node.js, Python, Docker Desktop. Gérez les configurations post-installation (variables PATH, paramètres VS Code via JSON). Vérifiez que tous les outils sont fonctionnels après installation.

### TP3 : Gestion IIS complète

Écrivez un rôle Ansible qui installe et configure IIS avec plusieurs sites web, des bindings HTTPS, des pools d'applications et le URL Rewrite. Déployez une application web statique et vérifiez son accessibilité. Configurez les logs IIS et la rotation automatique des fichiers de log.

### TP4 : Active Directory automation

Automatisez la création de 50 utilisateurs AD depuis un fichier CSV avec les colonnes nom, prénom, département, groupe. Créez les OUs nécessaires, les groupes de sécurité et attribuez les permissions. Implémentez un playbook de désactivation des comptes inactifs depuis plus de 90 jours avec rapport email.`,
    keyPoints: JSON.stringify(['Connexion WinRM avec HTTPS et authentification NTLM', 'Modules win_package win_service win_feature', 'Chocolatey pour gestion des paquets Windows', 'DSC intégré pour configuration déclarative', 'Gestion Active Directory avec collection microsoft.ad', 'PowerShell scripts via win_powershell', 'Inventaire Windows avec variables de connexion', 'Rôles réutilisables pour provisioning Windows']),
  },

  {
    id: 'ans-07',
    courseId: 'ansible',
    title: 'Ansible et le Cloud',
    duration: '3h',
    orderIndex: 7,
    theoryContent: `## Ansible et le Cloud

### Introduction

Ansible dispose de collections riches pour les principaux fournisseurs cloud : AWS, GCP et Azure. Ce module couvre le provisioning d'infrastructure cloud, les inventaires dynamiques et les patterns d'automatisation cloud.

### Collections Cloud

\`\`\`bash
# Installer les collections cloud
ansible-galaxy collection install amazon.aws
ansible-galaxy collection install google.cloud
ansible-galaxy collection install azure.azcollection

# Vérifier les installations
ansible-galaxy collection list | grep -E "amazon|google|azure"
\`\`\`

### Modules AWS essentiels

\`\`\`yaml
---
- name: Provisioning AWS
  hosts: localhost
  connection: local
  collections:
    - amazon.aws
  tasks:
    - name: Créer le VPC
      amazon.aws.ec2_vpc_net:
        name: "vpc-production"
        cidr_block: "10.0.0.0/16"
        region: eu-west-1
        tags:
          Environment: production
      register: vpc

    - name: Créer le subnet public
      amazon.aws.ec2_vpc_subnet:
        vpc_id: "{{ vpc.vpc.id }}"
        cidr: "10.0.1.0/24"
        az: eu-west-1a
        map_public: yes
      register: subnet

    - name: Security group web
      amazon.aws.ec2_security_group:
        name: web-sg
        description: "Acces web"
        vpc_id: "{{ vpc.vpc.id }}"
        rules:
          - proto: tcp
            ports: [80, 443]
            cidr_ip: 0.0.0.0/0

    - name: Lancer instance EC2
      amazon.aws.ec2_instance:
        name: "web-server-01"
        instance_type: t3.medium
        image_id: ami-0abcdef1234567890
        subnet_id: "{{ subnet.subnet.id }}"
        security_groups: [web-sg]
        key_name: ma-cle-ssh
        wait: yes
      register: ec2

    - name: Créer un bucket S3
      amazon.aws.s3_bucket:
        name: mon-app-assets-prod
        versioning: yes
        encryption: AES256
\`\`\`

### Modules GCP

\`\`\`yaml
- name: Provisioning GCP
  hosts: localhost
  connection: local
  tasks:
    - name: Créer réseau VPC
      google.cloud.gcp_compute_network:
        name: production-network
        auto_create_subnetworks: false
        project: mon-projet-gcp
        auth_kind: serviceaccount
        service_account_file: /path/to/sa.json

    - name: Instance GCE
      google.cloud.gcp_compute_instance:
        name: web-server-01
        machine_type: e2-medium
        zone: europe-west1-b
        project: mon-projet-gcp
        disks:
          - auto_delete: true
            boot: true
            initialize_params:
              source_image: projects/debian-cloud/global/images/family/debian-12
\`\`\`

### Inventaire dynamique AWS

\`\`\`yaml
# inventory/aws_ec2.yml
plugin: amazon.aws.aws_ec2
regions:
  - eu-west-1
  - eu-west-3
filters:
  tag:Environment:
    - production
    - staging
  instance-state-name: running
keyed_groups:
  - key: tags.Role
    prefix: role
  - key: placement.availability_zone
    prefix: az
compose:
  ansible_host: public_ip_address
  ansible_user: "'ec2-user'"
\`\`\`

\`\`\`bash
# Tester l'inventaire dynamique
ansible-inventory -i inventory/aws_ec2.yml --graph
ansible-inventory -i inventory/aws_ec2.yml --list
\`\`\`

### Inventaire dynamique GCP

\`\`\`yaml
# inventory/gcp.yml
plugin: google.cloud.gcp_compute
projects:
  - mon-projet-gcp
zones:
  - europe-west1-b
filters:
  - status = RUNNING
auth_kind: serviceaccount
service_account_file: /path/to/sa.json
keyed_groups:
  - key: labels.role
    prefix: role
compose:
  ansible_host: networkInterfaces[0].accessConfigs[0].natIP
\`\`\`

### Pattern Cloud Provisioning

\`\`\`
┌──────────────────────────────────────────────┐
│       Workflow Ansible + Cloud                │
│                                              │
│  1. Provisioner l'infra (modules cloud)      │
│  2. Rafraîchir l'inventaire dynamique        │
│  3. Configurer les instances (SSH/WinRM)     │
│  4. Déployer les applications                │
│  5. Valider le déploiement                   │
└──────────────────────────────────────────────┘
\`\`\`

### Authentification Cloud

| Provider | Méthode | Variable |
|----------|---------|----------|
| AWS | Access Key | AWS_ACCESS_KEY_ID |
| AWS | IAM Role | Instance profile |
| GCP | Service Account | GCP_SERVICE_ACCOUNT_FILE |
| Azure | Service Principal | AZURE_CLIENT_ID |`,
    practiceContent: `## Travaux Pratiques - Ansible et le Cloud

### TP1 : Provisioning AWS complet

Créez un playbook qui provisionne un environnement complet sur AWS : VPC avec subnets publics et privés, security groups pour web et base de données, une instance EC2 et un bucket S3. Utilisez register pour chaîner les ressources et les tags pour l'organisation.

\`\`\`bash
# Configurer les credentials AWS
export AWS_ACCESS_KEY_ID=xxx
export AWS_SECRET_ACCESS_KEY=xxx

# Lancer le provisioning
ansible-playbook provision-aws.yml -v

# Vérifier les ressources créées
ansible-playbook verify-aws.yml
\`\`\`

### TP2 : Inventaire dynamique multi-cloud

Configurez un inventaire dynamique AWS (aws_ec2.yml) et un inventaire GCP (gcp.yml). Créez un inventaire combiné qui regroupe les instances par rôle (web, db, cache) quel que soit le cloud source. Testez avec \`ansible-inventory --graph\` et exécutez un playbook de vérification sur l'ensemble.

### TP3 : Infrastructure as Code workflow complet

Développez un workflow en 4 playbooks : provisioning cloud, configuration des serveurs, déploiement applicatif et smoke tests. Utilisez un playbook maître qui orchestre les 4 étapes avec import_playbook. Implémentez un rollback automatique si les smoke tests échouent en détruisant les nouvelles instances.

### TP4 : Scaling dynamique avec métriques

Écrivez un playbook qui interroge CloudWatch pour obtenir la charge CPU moyenne. Si elle dépasse 80%, le playbook lance de nouvelles instances EC2 et les configure automatiquement. Si elle descend sous 30%, il termine les instances excédentaires. Testez avec une charge artificielle.`,
    keyPoints: JSON.stringify(['Collections amazon.aws google.cloud et azure', 'Provisioning complet VPC EC2 RDS S3 avec Ansible', 'Inventaire dynamique AWS avec plugin aws_ec2', 'Inventaire dynamique GCP avec filtres et groupes', 'Pattern provision puis configure puis deploy', 'Authentification par access keys ou IAM roles', 'Modules GCP pour compute network et storage', 'Orchestration multi-playbook pour workflow complet']),
  },
  {
    id: 'ans-08',
    courseId: 'ansible',
    title: 'Performance et scaling Ansible',
    duration: '3h',
    orderIndex: 8,
    theoryContent: `## Performance et Scaling Ansible

### Introduction

Lorsque les inventaires passent de dizaines à des milliers d'hôtes, les performances deviennent critiques. Ce module couvre l'exécution asynchrone, Mitogen, le cache des facts, le mode pull et les stratégies pour les grands inventaires.

### Exécution asynchrone

\`\`\`yaml
- name: Tâches asynchrones
  hosts: all
  tasks:
    - name: Mise à jour système (async)
      ansible.builtin.apt:
        upgrade: dist
        update_cache: yes
      async: 3600
      poll: 0
      register: apt_update

    - name: Copier les configurations
      ansible.builtin.copy:
        src: configs/
        dest: /etc/myapp/

    - name: Attendre la fin de la mise à jour
      ansible.builtin.async_status:
        jid: "{{ apt_update.ansible_job_id }}"
      register: job_result
      until: job_result.finished
      retries: 60
      delay: 30
\`\`\`

### Mitogen - Accélérateur

\`\`\`
┌──────────────────────────────────────────────┐
│       Ansible standard vs Mitogen             │
│                                              │
│  Standard : SSH > Shell > Python > Module    │
│  (Nouvelle connexion par tâche)              │
│                                              │
│  Mitogen : SSH > Python persistent > Module  │
│  (Connexion réutilisée, transfert optimisé)  │
│                                              │
│  Gain typique : 2x à 7x plus rapide         │
└──────────────────────────────────────────────┘
\`\`\`

\`\`\`ini
# ansible.cfg optimisé avec Mitogen
[defaults]
strategy_plugins = /path/to/mitogen/ansible_mitogen/plugins/strategy
strategy = mitogen_linear
forks = 50
gathering = smart
fact_caching = jsonfile
fact_caching_connection = /tmp/ansible_facts_cache
fact_caching_timeout = 3600

[ssh_connection]
pipelining = True
ssh_args = -o ControlMaster=auto -o ControlPersist=60s
\`\`\`

### Cache des Facts

\`\`\`ini
# Cache JSON file
[defaults]
gathering = smart
fact_caching = jsonfile
fact_caching_connection = /tmp/ansible_facts
fact_caching_timeout = 7200

# Cache Redis (environnements distribués)
[defaults]
fact_caching = community.general.redis
fact_caching_connection = localhost:6379:0
fact_caching_timeout = 3600
\`\`\`

### Mode Pull avec ansible-pull

\`\`\`
┌──────────────────────────────────────────────┐
│         Push vs Pull                          │
│                                              │
│  Push : Controller SSH vers N hosts (goulet) │
│  Pull : Chaque host git pull et apply local  │
│  (Scaling horizontal infini)                 │
└──────────────────────────────────────────────┘
\`\`\`

\`\`\`bash
# ansible-pull sur chaque host
ansible-pull -U https://github.com/org/config.git \\
  -i localhost, -d /opt/ansible-local --clean local.yml

# Automatiser avec cron (toutes les 15 minutes)
# */15 * * * * /usr/bin/ansible-pull -U URL local.yml
\`\`\`

### Stratégies d'exécution

\`\`\`yaml
# Stratégie free - ne pas attendre les hôtes lents
- name: Configuration rapide
  hosts: all
  strategy: free
  tasks:
    - name: Installer nginx
      ansible.builtin.apt:
        name: nginx
        state: present

# Rolling update avec serial
- name: Rolling update
  hosts: webservers
  serial:
    - 1
    - "30%"
    - "100%"
  tasks:
    - name: Mettre à jour
      ansible.builtin.copy:
        src: app.tar.gz
        dest: /opt/app/
\`\`\`

### Optimisations réseau

\`\`\`ini
[ssh_connection]
pipelining = True
ssh_args = -o ControlMaster=auto -o ControlPersist=300s

[defaults]
forks = 100
timeout = 30
host_key_checking = False
\`\`\`

### Gestion des grands inventaires

\`\`\`bash
# Limiter l'exécution à un sous-ensemble
ansible-playbook site.yml --limit "webservers:&production"
ansible-playbook site.yml --limit "host1,host2,host3"

# Pré-charger les données une seule fois
- name: Charger les données
  ansible.builtin.set_fact:
    users_list: "{{ lookup('file', 'users.json') | from_json }}"
  run_once: true
  delegate_to: localhost
\`\`\`

### Benchmarking

\`\`\`bash
# Profiler avec callback
# ansible.cfg: callbacks_enabled = ansible.posix.profile_tasks

# Résultat typique :
# Install packages -------- 45.23s
# Configure service ------- 12.67s
# Copy files -------------- 8.45s

# Mesurer le temps total
time ansible-playbook site.yml
\`\`\``,
    practiceContent: `## Travaux Pratiques - Performance Ansible

### TP1 : Benchmarking et profiling

Activez le callback profile_tasks et exécutez un playbook sur 10+ hôtes. Identifiez les tâches les plus lentes. Comparez les temps avec et sans pipelining, en variant le nombre de forks (5, 20, 50). Documentez les résultats dans un tableau comparatif.

\`\`\`bash
# Avec profiling activé
ANSIBLE_CALLBACKS_ENABLED=profile_tasks ansible-playbook site.yml

# Comparer les forks
time ansible-playbook site.yml -f 5
time ansible-playbook site.yml -f 20
time ansible-playbook site.yml -f 50
\`\`\`

### TP2 : Optimisation avec Mitogen

Installez Mitogen et configurez-le dans ansible.cfg. Exécutez le même playbook avec et sans Mitogen sur 20+ hôtes. Documentez les gains de performance obtenus pour chaque type de tâche (copy, template, package, service). Créez un graphique comparatif.

### TP3 : Mode Pull avec ansible-pull

Configurez ansible-pull sur 3 serveurs de test. Créez un repository Git avec un playbook local.yml qui installe et configure nginx. Configurez un cron pour l'exécution toutes les 15 minutes. Vérifiez que les changements pushés au repo sont appliqués automatiquement sur tous les serveurs. Testez le comportement en cas d'erreur Git.

### TP4 : Scaling à grande échelle

Simulez un inventaire de 200+ hôtes avec des conteneurs Docker. Optimisez le playbook pour minimiser le temps total : fact caching jsonfile, stratégie free, serial batching, et run_once pour les tâches uniques. Documentez chaque optimisation et son impact mesuré sur le temps total d'exécution du playbook.`,
    keyPoints: JSON.stringify(['Exécution asynchrone avec async et poll', 'Mitogen pour accélération 2x à 7x des playbooks', 'Fact caching avec jsonfile ou Redis', 'Mode Pull avec ansible-pull pour scaling horizontal', 'Stratégie free pour ne pas attendre les hôtes lents', 'Pipelining SSH et ControlPersist pour connexions', 'Serial et batching pour rolling updates contrôlés', 'Profiling avec callback profile_tasks']),
  },

  {
    id: 'glci-06',
    courseId: 'gitlab-ci',
    title: 'Container Registry et packages',
    duration: '3h',
    orderIndex: 6,
    theoryContent: `## Container Registry et Packages GitLab

### Introduction

GitLab intègre un Container Registry et un Package Registry directement dans la plateforme. Cela permet de stocker et distribuer vos images Docker et packages (NPM, Maven, PyPI) sans service externe.

### Container Registry GitLab

\`\`\`
┌──────────────────────────────────────────────────┐
│         GitLab Container Registry                 │
│                                                   │
│  ┌──────────┐    ┌────────────┐    ┌──────────┐ │
│  │ Pipeline │───>│  Registry  │<───│  Deploy  │ │
│  │  Build   │    │  (images)  │    │  (Pull)  │ │
│  └──────────┘    └────────────┘    └──────────┘ │
│                                                   │
│  URL: registry.gitlab.com/group/project          │
└──────────────────────────────────────────────────┘
\`\`\`

### Build et push dans le pipeline

\`\`\`yaml
variables:
  IMAGE_TAG: \\\$CI_REGISTRY_IMAGE:\\\$CI_COMMIT_SHA
  IMAGE_LATEST: \\\$CI_REGISTRY_IMAGE:latest

build-image:
  stage: build
  image: docker:24
  services:
    - docker:24-dind
  variables:
    DOCKER_TLS_CERTDIR: "/certs"
  before_script:
    - docker login -u \\\$CI_REGISTRY_USER -p \\\$CI_REGISTRY_PASSWORD \\\$CI_REGISTRY
  script:
    - docker build --cache-from \\\$IMAGE_LATEST -t \\\$IMAGE_TAG -t \\\$IMAGE_LATEST .
    - docker push \\\$IMAGE_TAG
    - docker push \\\$IMAGE_LATEST

# Avec Kaniko (sans Docker-in-Docker)
build-kaniko:
  stage: build
  image:
    name: gcr.io/kaniko-project/executor:v1.19.0-debug
    entrypoint: [""]
  script:
    - |
      /kaniko/executor \\
        --context \\\$CI_PROJECT_DIR \\
        --dockerfile \\\$CI_PROJECT_DIR/Dockerfile \\
        --destination \\\$IMAGE_TAG \\
        --destination \\\$IMAGE_LATEST \\
        --cache=true
\`\`\`

### Package Registry NPM

\`\`\`yaml
publish-npm:
  stage: deploy
  image: node:20
  script:
    - echo "@scope:registry=https://\\\${CI_SERVER_HOST}/api/v4/projects/\\\${CI_PROJECT_ID}/packages/npm/" > .npmrc
    - echo "//\\\${CI_SERVER_HOST}/api/v4/projects/\\\${CI_PROJECT_ID}/packages/npm/:_authToken=\\\${CI_JOB_TOKEN}" >> .npmrc
    - npm publish
  rules:
    - if: \\\$CI_COMMIT_TAG
\`\`\`

### Package Registry PyPI

\`\`\`yaml
publish-pypi:
  stage: deploy
  image: python:3.12
  script:
    - pip install build twine
    - python -m build
    - TWINE_PASSWORD=\\\$CI_JOB_TOKEN TWINE_USERNAME=gitlab-ci-token twine upload --repository-url https://gitlab.com/api/v4/projects/\\\$CI_PROJECT_ID/packages/pypi dist/*
  rules:
    - if: \\\$CI_COMMIT_TAG
\`\`\`

### Cleanup Policies

\`\`\`bash
# Paramètres de la cleanup policy :
# cadence: 1d, 7d, 14d, 1month
# keep_n: nombre de tags à garder (5, 10, 25, 50)
# older_than: supprimer tags plus vieux que 7d, 14d, 30d
# name_regex_delete: regex des tags à supprimer
# name_regex_keep: regex à garder (prioritaire)

# Nettoyage manuel via API
curl --request DELETE --header "PRIVATE-TOKEN: token" \\
  "https://gitlab.com/api/v4/projects/ID/registry/repositories/REPO_ID/tags/TAG"

# Bulk delete
curl --request DELETE --header "PRIVATE-TOKEN: token" \\
  --data "name_regex_delete=.*" --data "keep_n=5" \\
  "https://gitlab.com/api/v4/projects/ID/registry/repositories/REPO_ID/tags"
\`\`\`

### Multi-arch images

\`\`\`yaml
build-multiarch:
  stage: build
  image: docker:24
  services:
    - docker:24-dind
  before_script:
    - docker login -u \\\$CI_REGISTRY_USER -p \\\$CI_REGISTRY_PASSWORD \\\$CI_REGISTRY
    - docker buildx create --use
  script:
    - docker buildx build --platform linux/amd64,linux/arm64 --push -t \\\$IMAGE_TAG .
\`\`\`

### Container Scanning

\`\`\`yaml
container_scanning:
  stage: test
  image: registry.gitlab.com/security-products/container-scanning
  variables:
    CS_IMAGE: \\\$IMAGE_TAG
  script:
    - gtcs scan
  artifacts:
    reports:
      container_scanning: gl-container-scanning-report.json
\`\`\`

### Bonnes pratiques

| Pratique | Description |
|----------|-------------|
| Tags immutables | Utiliser SHA au lieu de latest en prod |
| Scanning auto | Scanner chaque image avant déploiement |
| Cleanup régulier | Supprimer les images non utilisées |
| Multi-arch | Supporter amd64 et arm64 |
| Cache layers | Utiliser cache-from pour builds rapides |`,
    practiceContent: `## Travaux Pratiques - Container Registry et Packages

### TP1 : Pipeline de build d'images

Créez un pipeline GitLab CI qui build une image Docker, la push sur le Container Registry du projet avec les tags SHA et latest. Configurez le cache multi-layer pour accélérer les builds successifs. Implémentez aussi la version Kaniko comme alternative à DinD et comparez les temps de build.

\`\`\`bash
# Vérifier les images dans le registry via API
curl --header "PRIVATE-TOKEN: token" \\
  "https://gitlab.com/api/v4/projects/ID/registry/repositories"

# Lister les tags d'un repository
curl --header "PRIVATE-TOKEN: token" \\
  "https://gitlab.com/api/v4/projects/ID/registry/repositories/REPO_ID/tags"
\`\`\`

### TP2 : Publication de packages NPM et PyPI

Configurez la publication d'un package NPM scoped sur le registry GitLab. Le pipeline doit publier automatiquement lors d'un tag Git. Configurez un second projet qui consomme ce package. Faites de même avec un package Python via PyPI registry.

### TP3 : Politique de nettoyage automatisée

Configurez une cleanup policy pour votre Container Registry : garder les 10 derniers tags, supprimer les images de plus de 30 jours, mais toujours garder les tags v* (releases). Écrivez un script qui vérifie l'espace utilisé avant et après nettoyage. Automatisez ce script dans un pipeline schedulé hebdomadaire.

### TP4 : Scanning de sécurité des images

Intégrez le container scanning GitLab dans votre pipeline. Analysez les résultats dans le Security Dashboard. Identifiez les vulnérabilités critiques, corrigez-les en mettant à jour l'image de base dans votre Dockerfile, et vérifiez que le scan suivant ne remonte plus ces CVE. Documentez le processus de remédiation.`,
    keyPoints: JSON.stringify(['Container Registry intégré à chaque projet GitLab', 'Build images avec Docker-in-Docker ou Kaniko', 'Package Registry NPM Maven PyPI NuGet', 'Publication automatique sur tag avec CI_JOB_TOKEN', 'Cleanup policies pour gestion espace stockage', 'Images multi-architecture avec buildx', 'Container scanning intégré au pipeline', 'Variables prédéfinies CI_REGISTRY pour authentification']),
  },

  {
    id: 'glci-07',
    courseId: 'gitlab-ci',
    title: 'Monitoring des pipelines',
    duration: '3h',
    orderIndex: 7,
    theoryContent: `## Monitoring des Pipelines GitLab CI

### Introduction

Le monitoring des pipelines est essentiel pour la fiabilité et la performance CI/CD. Ce module couvre l'analyse des artefacts, les métriques, les dashboards et les techniques d'optimisation.

### Métriques clés

\`\`\`
┌─────────────────────────────────────────────────────┐
│          Métriques Pipeline CI/CD                     │
│                                                      │
│  Durée ────────────────────── temps total pipeline   │
│  Taux succès ──────────────── pourcentage réussite   │
│  Queue time ───────────────── attente des runners    │
│  Job duration ─────────────── temps par job          │
│  MTTR ─────────────────────── temps de réparation    │
│  Flaky tests ──────────────── tests instables        │
│  Coverage ─────────────────── couverture de code     │
└─────────────────────────────────────────────────────┘
\`\`\`

### API GitLab pour les métriques

\`\`\`bash
# Récupérer les pipelines récentes
curl --header "PRIVATE-TOKEN: token" \\
  "https://gitlab.com/api/v4/projects/ID/pipelines?per_page=100&status=success"

# Durée moyenne des pipelines
curl --header "PRIVATE-TOKEN: token" \\
  "https://gitlab.com/api/v4/projects/ID/pipelines?per_page=50" | \\
  jq '[.[].duration] | add / length'

# Jobs d'un pipeline
curl --header "PRIVATE-TOKEN: token" \\
  "https://gitlab.com/api/v4/projects/ID/pipelines/PIPE_ID/jobs"
\`\`\`

### Artefacts et rapports

\`\`\`yaml
test:
  stage: test
  script:
    - npm test -- --coverage --reporters=jest-junit
  artifacts:
    when: always
    reports:
      junit: junit.xml
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
    paths:
      - coverage/
    expire_in: 30 days
  coverage: '/All files[^|]*\\|[^|]*\\s+([\\d.]+)/'
\`\`\`

### Optimisation - Cache

\`\`\`yaml
default:
  cache:
    key:
      files:
        - package-lock.json
    paths:
      - node_modules/
    policy: pull

install:
  stage: setup
  cache:
    key:
      files:
        - package-lock.json
    paths:
      - node_modules/
    policy: push
  script:
    - npm ci
\`\`\`

### Parallélisation des tests

\`\`\`yaml
test:
  stage: test
  parallel: 4
  script:
    - npx jest --shard=\\\$CI_NODE_INDEX/\\\$CI_NODE_TOTAL
  artifacts:
    reports:
      junit: junit.xml

deploy:
  stage: deploy
  parallel:
    matrix:
      - ENVIRONMENT: [staging, production]
        REGION: [eu-west-1, us-east-1]
\`\`\`

### Exécution conditionnelle

\`\`\`yaml
workflow:
  rules:
    - if: \\\$CI_PIPELINE_SOURCE == "merge_request_event"
    - if: \\\$CI_COMMIT_BRANCH == "main"

backend-test:
  stage: test
  rules:
    - changes:
        - backend/**/*
        - shared/**/*
  script:
    - cd backend && npm test

frontend-test:
  stage: test
  rules:
    - changes:
        - frontend/**/*
  script:
    - cd frontend && npm test
\`\`\`

### Tests flaky et retry

\`\`\`yaml
test:
  script:
    - npm test
  retry:
    max: 2
    when:
      - script_failure
\`\`\`

### Alerting

\`\`\`yaml
notify-failure:
  stage: .post
  script:
    - |
      curl -X POST -H 'Content-type: application/json' \\
        --data '{"text":"Pipeline failed - '\\\$CI_PIPELINE_URL'"}' \\
        \\\$SLACK_WEBHOOK_URL
  rules:
    - if: \\\$CI_COMMIT_BRANCH == "main"
      when: on_failure
\`\`\`

### Tableau de bord objectifs

| Métrique | Objectif | Alerte |
|----------|----------|--------|
| Durée pipeline | < 10 min | > 15 min |
| Taux succès | > 95% | < 90% |
| Queue time | < 30s | > 2 min |
| Coverage | > 80% | < 70% |
| Tests flaky | < 2% | > 5% |
| MTTR | < 30 min | > 1h |

### Dashboard Grafana

\`\`\`
# Requêtes Prometheus utiles
avg(gitlab_ci_pipeline_duration_seconds{status="success"})

sum(rate(gitlab_ci_pipeline_status{status="success"}[1h])) /
sum(rate(gitlab_ci_pipeline_status[1h])) * 100

avg(gitlab_ci_queue_duration_seconds)

# Nombre de jobs par runner
sum by (runner) (gitlab_ci_active_jobs)

# Taux d'échec par projet sur les dernières 24 heures
sum(rate(gitlab_ci_pipeline_status{status="failed"}[24h])) by (project)
\`\`\``,
    practiceContent: `## Travaux Pratiques - Monitoring des Pipelines

### TP1 : Analyse des métriques pipeline

Utilisez l'API GitLab pour extraire les métriques de vos 50 dernières pipelines. Calculez la durée moyenne, le taux de succès, le temps de queue et identifiez les jobs les plus lents. Créez un script bash qui génère un rapport CSV quotidien avec ces métriques.

\`\`\`bash
# Script d'extraction des métriques
curl -s --header "PRIVATE-TOKEN: token" \\
  "https://gitlab.com/api/v4/projects/ID/pipelines?per_page=50" | \\
  jq -r '.[] | [.id, .status, .duration, .created_at] | @csv' > report.csv

# Calculer les statistiques
awk -F',' '{sum+=\\\$3; count++} END {print "Moyenne:", sum/count "s"}' report.csv
\`\`\`

### TP2 : Optimisation du temps de pipeline

Prenez un pipeline existant de plus de 15 minutes. Appliquez les techniques d'optimisation : cache des dépendances avec policy push/pull, parallélisation des tests avec shard, exécution conditionnelle par fichiers modifiés. Mesurez le gain après chaque optimisation et documentez les résultats.

### TP3 : Dashboard Grafana avec Prometheus

Configurez Prometheus pour collecter les métriques GitLab CI (gitlab_ci_pipeline_duration, gitlab_ci_active_jobs). Créez un dashboard Grafana avec les panels : durée moyenne par jour, taux de succès, queue time et nombre de pipelines. Ajoutez des alertes email pour les anomalies détectées.

### TP4 : Alerting et rapports hebdomadaires

Configurez des notifications Slack pour les échecs sur main via webhook. Créez un job CI schedulé qui génère un rapport hebdomadaire des métriques (durée moyenne, tendance succès, régression coverage). Implémentez la détection automatique de régression de performance en comparant avec la semaine précédente.`,
    keyPoints: JSON.stringify(['Métriques clés durée succès queue time et coverage', 'API GitLab pour extraction de données pipelines', 'Artefacts JUnit et Cobertura pour rapports', 'Optimisation avec cache parallélisation et rules', 'Dashboard Grafana avec métriques Prometheus', 'Détection automatique des tests flaky', 'Alerting Slack webhook en cas echec pipeline', 'Exécution conditionnelle selon fichiers modifiés']),
  },
  {
    id: 'glci-08',
    courseId: 'gitlab-ci',
    title: 'Migration vers GitLab CI',
    duration: '3h',
    orderIndex: 8,
    theoryContent: `## Migration vers GitLab CI

### Introduction

Migrer vers GitLab CI depuis Jenkins ou GitHub Actions est un projet courant dans les organisations qui modernisent leur toolchain DevOps actuel. Ce module fournit les correspondances entre systèmes, les stratégies de migration progressive et les pièges à éviter.

### Correspondances Jenkins vers GitLab CI

\`\`\`
┌──────────────────────────────────────────────────┐
│       Jenkins              │  GitLab CI           │
│  ─────────────────────────┼────────────────────  │
│  Jenkinsfile              │  .gitlab-ci.yml      │
│  pipeline { }             │  stages + jobs       │
│  stage('Build')           │  stages: [build]     │
│  steps { }                │  script:             │
│  agent any                │  image: / tags:      │
│  post { always }          │  after_script / .post│
│  when { branch }          │  rules: - if:        │
│  environment { }          │  variables:          │
│  credentials()            │  CI/CD Variables     │
│  parallel { }             │  parallel:           │
│  Shared Libraries         │  include: templates  │
└──────────────────────────────────────────────────┘
\`\`\`

### Exemple de conversion Jenkinsfile

\`\`\`groovy
// Jenkinsfile original
pipeline {
    agent { docker { image 'node:20' } }
    stages {
        stage('Install') { steps { sh 'npm ci' } }
        stage('Test') { steps { sh 'npm test' } }
        stage('Deploy') {
            when { branch 'main' }
            steps { sh 'npm run deploy' }
        }
    }
    post { failure { slackSend message: "Failed" } }
}
\`\`\`

\`\`\`yaml
# Équivalent GitLab CI
image: node:20
stages: [install, test, deploy]

install:
  stage: install
  script: npm ci
  cache:
    key: { files: [package-lock.json] }
    paths: [node_modules/]

test:
  stage: test
  script: npm test

deploy:
  stage: deploy
  script: npm run deploy
  rules:
    - if: \\\$CI_COMMIT_BRANCH == "main"

notify-failure:
  stage: .post
  script: curl -X POST \\\$SLACK_WEBHOOK -d '{"text":"Failed"}'
  when: on_failure
\`\`\`

### Correspondances GitHub Actions

\`\`\`
┌──────────────────────────────────────────────────┐
│  GitHub Actions         │  GitLab CI             │
│  ───────────────────────┼──────────────────────  │
│  on: push/PR            │  workflow: rules       │
│  runs-on: ubuntu        │  image: ubuntu         │
│  uses: actions/xxx      │  include: templates    │
│  strategy.matrix        │  parallel: matrix      │
│  needs: [job]           │  needs: [job]          │
│  if: condition          │  rules: - if:          │
│  services:              │  services:             │
│  concurrency            │  resource_group:       │
└──────────────────────────────────────────────────┘
\`\`\`

### Stratégie de migration progressive

\`\`\`
Phase 1 : Audit (2 semaines)
├── Inventaire des jobs et plugins
├── Mapping des credentials
└── Priorisation des projets

Phase 2 : Pilote (2 semaines)
├── Migration de 2-3 projets simples
├── Formation de l'équipe
└── Documentation des patterns

Phase 3 : Migration massive (4 semaines)
├── Migration par lots de 5-10 projets
├── Dual-run pendant la transition
└── Support aux équipes

Phase 4 : Décommission (2 semaines)
├── Vérification finale
├── Archivage des logs Jenkins
└── Suppression du serveur
\`\`\`

### Mapping des plugins

| Plugin Jenkins | GitLab CI |
|----------------|-----------|
| Credentials | CI/CD Variables |
| Docker Pipeline | services + DinD |
| Git | Intégré nativement |
| JUnit | artifacts:reports:junit |
| Slack | Script curl webhook |
| SonarQube | Script + variables |

### Templates réutilisables

\`\`\`yaml
include:
  - local: '.gitlab/ci/templates.yml'
  - project: 'devops/ci-templates'
    file: '/docker-build.yml'
  - template: Security/SAST.gitlab-ci.yml

.base-test:
  image: node:20
  cache:
    key: node-deps
    paths: [node_modules/]
  before_script: [npm ci]

unit-test:
  extends: .base-test
  script: npm run test:unit

integration-test:
  extends: .base-test
  script: npm run test:integration
\`\`\``,
    practiceContent: `## Travaux Pratiques - Migration vers GitLab CI

### TP1 : Migration depuis Jenkins

Prenez un Jenkinsfile existant avec 5+ stages, des credentials, des post-actions et une exécution parallèle. Convertissez-le en .gitlab-ci.yml fonctionnel. Validez la syntaxe avec le linter GitLab CI et comparez les résultats d'exécution des deux systèmes en dual-run.

\`\`\`bash
# Valider votre fichier .gitlab-ci.yml
curl --header "PRIVATE-TOKEN: token" \\
  --header "Content-Type: application/json" \\
  --data '{"content":"'"$(cat .gitlab-ci.yml)"'"}' \\
  "https://gitlab.com/api/v4/ci/lint"
\`\`\`

### TP2 : Migration depuis GitHub Actions

Convertissez un workflow GitHub Actions complet (build, test avec services PostgreSQL, deploy conditionnel avec environments) en pipeline GitLab CI équivalent. Portez attention aux services Docker, au cache, aux conditions d'exécution et aux variables d'environnement. Testez les deux en parallèle pendant une semaine.

### TP3 : Templates CI partagées

Créez un projet GitLab dédié aux templates CI partagées. Implémentez des templates pour : build Docker multi-stage, tests Node.js avec coverage, et deploy Kubernetes. Documentez chaque template avec des exemples d'utilisation. Configurez l'include depuis un projet externe et testez avec 3 projets consommateurs différents.

### TP4 : Plan de migration complet

Rédigez un plan de migration détaillé pour une équipe de 20 développeurs passant de Jenkins à GitLab CI. Incluez : inventaire complet des 30 pipelines existantes, mapping des 15 plugins utilisés, calendrier de formation sur 3 sessions, timeline de 8 semaines avec dual-run, critères de succès mesurables et plan de rollback documenté.`,
    keyPoints: JSON.stringify(['Correspondances Jenkins stages vers GitLab CI jobs', 'Conversion GitHub Actions vers workflow rules', 'Stratégie dual-run pour migration sans risque', 'Templates et includes pour remplacer Shared Libraries', 'CI/CD Variables pour migrer les credentials', 'Linter GitLab CI pour validation de syntaxe', 'Environments protégés pour remplacer approval gates', 'Migration progressive en 4 phases avec rollback']),
  },

  {
    id: 'git-06',
    courseId: 'git-avance',
    title: "Git pour l'open source",
    duration: '3h',
    orderIndex: 6,
    theoryContent: `## Git pour l'Open Source

### Introduction

Contribuer à l'open source requiert une maîtrise du forking workflow, des conventions de contribution et des bonnes pratiques de collaboration. Ce module couvre le workflow complet, la revue de PR et le rôle de mainteneur.

### Le Forking Workflow

\`\`\`
┌──────────────────────────────────────────────────────┐
│              Forking Workflow                          │
│                                                       │
│  ┌─────────────────┐        ┌─────────────────┐     │
│  │  Upstream Repo  │        │   Your Fork     │     │
│  │  (original)     │◄─ PR ──│   (copy)        │     │
│  └────────┬────────┘        └────────┬────────┘     │
│           │                          │               │
│     fetch upstream             push origin           │
│           │                          │               │
│           ▼                          ▼               │
│  ┌─────────────────────────────────────────────┐    │
│  │            Local Repository                  │    │
│  │   origin = your fork                         │    │
│  │   upstream = original repo                   │    │
│  └─────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────┘
\`\`\`

\`\`\`bash
# 1. Cloner votre fork
git clone https://github.com/votre-user/projet.git
cd projet

# 2. Ajouter le remote upstream
git remote add upstream https://github.com/original/projet.git

# 3. Synchroniser votre fork
git fetch upstream
git checkout main
git merge upstream/main
git push origin main

# 4. Créer une branche pour votre contribution
git checkout -b feature/ma-contribution

# 5. Commiter et pousser vers votre fork
git commit -m "feat: ajouter la fonctionnalité X"
git push origin feature/ma-contribution

# 6. Créer une Pull Request
\`\`\`

### Contributing Guidelines

\`\`\`markdown
# Guide de Contribution

## Comment contribuer
1. Forker le repository
2. Créer une branche depuis main
3. Suivre les conventions de code
4. Écrire des tests
5. Soumettre une Pull Request

## Convention de commits
- feat: nouvelle fonctionnalité
- fix: correction de bug
- docs: documentation
- refactor: refactoring
- test: ajout de tests

## Style de code
- ESLint + Prettier
- Coverage minimum : 80%
\`\`\`

### Rédiger une bonne Pull Request

\`\`\`markdown
## Description
Ajoute le support OAuth2 Google. Closes #123

## Changements
- Ajout provider OAuth2
- Tests unitaires et intégration
- Documentation mise à jour

## Checklist
- [x] Tests ajoutés
- [x] Documentation mise à jour
- [x] Lint passe sans erreur
- [x] Commits suivent la convention
\`\`\`

### Revue de Pull Requests

\`\`\`bash
# Récupérer une PR pour la tester
git fetch upstream pull/456/head:pr-456
git checkout pr-456
npm test
git checkout main
git branch -D pr-456

# Ou avec GitHub CLI
gh pr checkout 456
\`\`\`

| Action | Description |
|--------|-------------|
| Lire le contexte | Comprendre l'issue |
| Tester localement | Vérifier que ça marche |
| Commentaires constructifs | Suggérer des alternatives |
| Répondre vite | < 24h pour les revues |

### Rôle de mainteneur

\`\`\`bash
# Merger avec squash
git checkout main
git merge --squash feature-branch
git commit -m "feat: description (#456)"

# Gérer les releases
git tag -a v1.2.0 -m "Release 1.2.0"
git push upstream v1.2.0

# Cherry-pick vers branche maintenance
git checkout release/1.1
git cherry-pick abc1234
\`\`\`

### Fichiers essentiels open source

\`\`\`
README.md              # Description, installation
CONTRIBUTING.md        # Guide de contribution
CODE_OF_CONDUCT.md     # Code de conduite
LICENSE                # MIT, Apache, GPL...
CHANGELOG.md           # Historique versions
.github/
  ISSUE_TEMPLATE/      # Templates d'issues
  PULL_REQUEST_TEMPLATE.md
  CODEOWNERS           # Responsables par dossier
\`\`\`

### CODEOWNERS

\`\`\`
* @org/core-team
/src/api/ @org/backend-team
/src/components/ @org/frontend-team
/infrastructure/ @org/devops-team
Dockerfile @org/devops-team
\`\`\`

### Gestion des issues et labels

\`\`\`bash
good first issue    # Pour les débutants
help wanted         # Contribution bienvenue
bug                 # Rapport de bug
enhancement         # Nouvelle fonctionnalité
priority: high      # Urgent
\`\`\``,
    practiceContent: `## Travaux Pratiques - Git pour l'Open Source

### TP1 : Forking workflow complet

Forkez un projet open source de test (ou créez-en un entre collègues). Configurez les remotes origin et upstream. Synchronisez votre fork avec upstream, créez une branche feature, faites une modification significative et soumettez une Pull Request. Pratiquez la résolution de conflits lors du rebase sur upstream/main après que d'autres PRs ont été mergées.

\`\`\`bash
# Workflow complet
git remote add upstream https://github.com/original/repo.git
git fetch upstream
git checkout -b feature/improvement
# ... modifications ...
git push origin feature/improvement
# Créer PR, gérer les retours de review
git fetch upstream && git rebase upstream/main
git push origin feature/improvement --force-with-lease
\`\`\`

### TP2 : Mise en place d'un projet open source

Créez un repository avec tous les fichiers essentiels : README détaillé, CONTRIBUTING avec conventions, CODE_OF_CONDUCT, LICENSE MIT, templates d'issues (bug report, feature request) et PR template avec checklist. Configurez les branch protection rules, les labels et le fichier CODEOWNERS.

### TP3 : Revue de code collaborative

Pratiquez la revue de 3 Pull Requests soumises par des collègues : récupérez-les localement, testez-les, laissez des commentaires constructifs avec suggestions inline. Distinguez les commentaires bloquants des nitpicks. Utilisez les suggestions GitHub pour proposer des corrections directes que l'auteur peut accepter en un clic.

### TP4 : Gestion de release et maintenance

Créez un workflow de release complet : tagging sémantique depuis les conventional commits, génération automatique du CHANGELOG, création de la release GitHub avec notes. Pratiquez le cherry-pick d'un hotfix depuis main vers une branche release/1.x de maintenance.`,
    keyPoints: JSON.stringify(['Forking workflow avec remotes origin et upstream', 'Synchronisation régulière avec upstream/main', 'CONTRIBUTING.md avec conventions et processus', 'Pull Request template avec checklist de qualité', 'CODEOWNERS pour assignation automatique reviewers', 'Conventional Commits pour historique propre', 'Rôle de mainteneur et gestion des releases', 'Labels et templates pour gestion des issues']),
  },
  {
    id: 'git-07',
    courseId: 'git-avance',
    title: 'Automatisation Git',
    duration: '3h',
    orderIndex: 7,
    theoryContent: `## Automatisation Git

### Introduction

L'automatisation Git applique des standards de qualité de manière cohérente. Ce module couvre GitHub Actions pour l'automatisation, le framework pre-commit, la génération de CHANGELOG et le semantic release.

### GitHub Actions pour automatisation

\`\`\`yaml
# .github/workflows/labeler.yml
name: Pull Request Labeler
on:
  pull_request:
    types: [opened, synchronize]
jobs:
  label:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/labeler@v5
        with:
          repo-token: \\\${{ secrets.GITHUB_TOKEN }}

# .github/workflows/stale.yml
name: Stale Issues
on:
  schedule:
    - cron: '0 8 * * 1'
jobs:
  stale:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/stale@v9
        with:
          stale-issue-message: 'Issue inactive depuis 30 jours.'
          days-before-stale: 30
          days-before-close: 7
\`\`\`

### Framework pre-commit

\`\`\`yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.5.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-json
      - id: check-merge-conflict
      - id: detect-private-key
      - id: no-commit-to-branch
        args: ['--branch', 'main']

  - repo: https://github.com/commitizen-tools/commitizen
    rev: v3.13.0
    hooks:
      - id: commitizen

  - repo: https://github.com/pre-commit/mirrors-eslint
    rev: v8.56.0
    hooks:
      - id: eslint
        files: \\.[jt]sx?$

  - repo: https://github.com/antonbabenko/pre-commit-terraform
    rev: v1.86.0
    hooks:
      - id: terraform_fmt
      - id: terraform_validate
\`\`\`

\`\`\`bash
# Installation et utilisation
pip install pre-commit
pre-commit install
pre-commit install --hook-type commit-msg
pre-commit run --all-files
pre-commit autoupdate
\`\`\`

### Conventional Changelog

\`\`\`bash
npm install -g conventional-changelog-cli
conventional-changelog -p angular -i CHANGELOG.md -s
\`\`\`

\`\`\`markdown
# Changelog
## [1.3.0] - 2024-01-15
### Features
- **auth**: ajout OAuth2 Google (#123)
- **api**: endpoint recherche avancée (#145)
### Bug Fixes
- **ui**: correction affichage mobile (#134)
\`\`\`

### Semantic Release

\`\`\`json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    ["@semantic-release/npm", { "npmPublish": true }],
    ["@semantic-release/git", {
      "assets": ["CHANGELOG.md", "package.json"]
    }],
    "@semantic-release/github"
  ]
}
\`\`\`

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
      - run: npm ci
      - run: npx semantic-release
        env:
          GITHUB_TOKEN: \\\${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: \\\${{ secrets.NPM_TOKEN }}
\`\`\`

### Versioning automatique

\`\`\`
┌──────────────────────────────────────────────────┐
│      Semantic Versioning automatique              │
│                                                   │
│  Commit Type        │  Version Bump              │
│  ───────────────────┼──────────────────────────  │
│  fix:               │  PATCH  (1.0.0 → 1.0.1)   │
│  feat:              │  MINOR  (1.0.0 → 1.1.0)   │
│  BREAKING CHANGE:   │  MAJOR  (1.0.0 → 2.0.0)   │
│  chore/docs/style:  │  Pas de release            │
└──────────────────────────────────────────────────┘
\`\`\`

### Commitizen

\`\`\`bash
npm install -g commitizen cz-conventional-changelog
# Utilisation interactive
git add .
npx cz
# ? Select type: feat
# ? Scope: auth
# ? Short description: add Google OAuth
\`\`\`

### Git Hooks personnalisés

\`\`\`bash
#!/bin/sh
# .git/hooks/prepare-commit-msg
BRANCH_NAME=\\\$(git symbolic-ref --short HEAD)
TICKET=\\\$(echo \\\$BRANCH_NAME | grep -oE '[A-Z]+-[0-9]+')
if [ -n "\\\$TICKET" ]; then
  sed -i.bak -e "1s/^/[\\\$TICKET] /" \\\$1
fi
\`\`\``,
    practiceContent: `## Travaux Pratiques - Automatisation Git

### TP1 : Configuration pre-commit complète

Installez le framework pre-commit dans un projet existant. Configurez des hooks pour : trailing whitespace, validation YAML/JSON, lint ESLint, format Terraform et validation des messages de commit conventionnels. Testez que les commits avec du trailing whitespace ou des messages non conventionnels sont rejetés automatiquement.

\`\`\`bash
# Installer et configurer
pip install pre-commit
pre-commit install
pre-commit install --hook-type commit-msg

# Tester sur tout le code existant
pre-commit run --all-files

# Tester un commit invalide
echo "bad  " > test.txt && git add test.txt
git commit -m "invalid message"  # doit échouer
\`\`\`

### TP2 : Semantic Release end-to-end

Configurez semantic-release dans un projet Node.js avec le fichier .releaserc.json. Créez une série de commits (fix, feat, feat avec BREAKING CHANGE). Exécutez semantic-release et vérifiez que les versions sont incrémentées correctement, le CHANGELOG est généré et la release GitHub est créée avec les notes automatiques.

### TP3 : GitHub Actions automation suite

Créez une suite de workflows GitHub Actions : labeling automatique des PRs selon les fichiers modifiés (labeler.yml), fermeture des issues stales après 30 jours (stale.yml), assignation automatique des reviewers depuis CODEOWNERS, et vérification du format des commits dans les PRs.

### TP4 : Pipeline complet de release automatisée

Implémentez le cycle complet : pre-commit hooks locaux qui valident le code et le format des commits, CI qui vérifie tout sur chaque PR, semantic-release sur merge dans main qui gère versioning + CHANGELOG + release GitHub + publication NPM. Testez 5 cycles de contribution complets de bout en bout.`,
    keyPoints: JSON.stringify(['GitHub Actions pour labeling et stale management', 'Framework pre-commit avec hooks de qualité', 'Conventional Commits pour historique sémantique', 'Semantic Release pour versioning automatique', 'CHANGELOG généré depuis les messages de commit', 'Commitizen pour interface interactive de commit', 'Git hooks personnalisés avec prepare-commit-msg', 'Workflow complet de release automatisée']),
  },

  {
    id: 'git-08',
    courseId: 'git-avance',
    title: 'Récupération et forensics',
    duration: '3h',
    orderIndex: 8,
    theoryContent: `## Récupération et Forensics Git

### Introduction

Git est conçu pour ne jamais perdre de données. Même après des opérations destructives, les commits restent récupérables grâce au reflog. Ce module couvre la récupération, la réparation, les techniques de forensics et rerere.

### Reflog

\`\`\`bash
# Le reflog enregistre TOUTES les modifications de HEAD
git reflog
git reflog show main
git reflog --date=relative

# Conservé 90 jours (référencés) / 30 jours (orphelins)
\`\`\`

### Récupération de commits perdus

\`\`\`
┌──────────────────────────────────────────────────┐
│      Scénarios de récupération                    │
│                                                   │
│  Situation              │  Solution              │
│  ──────────────────────┼───────────────────────  │
│  reset --hard accidentel│  reflog + reset        │
│  rebase raté            │  reflog + reset        │
│  branche supprimée      │  reflog + checkout     │
│  commit amendé perdu    │  reflog + cherry-pick  │
│  stash droppé           │  fsck + show           │
│  fichier supprimé       │  log + checkout        │
└──────────────────────────────────────────────────┘
\`\`\`

\`\`\`bash
# Après un reset --hard accidentel
git reflog
git reset --hard HEAD@{2}

# Branche supprimée
git reflog | grep "feature/ma-branche"
git checkout -b feature/ma-branche abc1234

# Stash supprimé
git fsck --unreachable | grep commit
git show SHA_DU_STASH
git stash apply SHA_DU_STASH

# Fichier supprimé dans un ancien commit
git log --all --full-history -- chemin/fichier.txt
git checkout abc1234 -- chemin/fichier.txt
\`\`\`

### Réparation de repositories

\`\`\`bash
# Vérifier l'intégrité
git fsck --full
git fsck --lost-found

# Objets perdus dans .git/lost-found/
ls .git/lost-found/other/
ls .git/lost-found/commit/
git show SHA_OBJET

# Réparer et nettoyer
git gc --prune=now
git repack -a -d
git verify-pack -v .git/objects/pack/pack-SHA.idx
\`\`\`

### Git Blame

\`\`\`bash
git blame fichier.js
git blame -L 10,20 fichier.js
git blame --since="2024-01-01" fichier.js

# Ignorer les commits de formatage
git blame --ignore-revs-file .git-blame-ignore-revs fichier.js

# .git-blame-ignore-revs
# abc1234  Reformatage prettier
# def5678  Migration ESLint
\`\`\`

### Git Log Forensics

\`\`\`bash
# Rechercher dans l'historique
git log --all --oneline --grep="bug fix"

# Pickaxe - code ajouté ou supprimé
git log -S "functionName" --all
git log -G "regex_pattern" --all

# Évolution d'un fichier
git log --follow -p -- chemin/fichier.js

# Statistiques contributeurs
git shortlog -sn --all

# Gros fichiers dans l'historique
git rev-list --objects --all | \\
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \\
  sed -n 's/^blob //p' | sort -rnk2 | head -20
\`\`\`

### Git Bisect

\`\`\`bash
# Recherche binaire du commit fautif
git bisect start
git bisect bad HEAD
git bisect good v1.0.0

# Automatiser avec un script
git bisect start HEAD v1.0.0
git bisect run npm test

# Terminer
git bisect reset
git bisect log
\`\`\`

### Git Rerere

Rerere mémorise vos résolutions de conflits pour les réappliquer automatiquement :

\`\`\`bash
# Activer rerere
git config --global rerere.enabled true

# Voir les résolutions enregistrées
git rerere status
git rerere diff

# Oublier une résolution
git rerere forget chemin/fichier.js
\`\`\`

\`\`\`
┌──────────────────────────────────────────────────┐
│            Fonctionnement de Rerere               │
│                                                   │
│  Merge 1 : Conflit → Résolution manuelle         │
│  └── Rerere enregistre le pattern                │
│                                                   │
│  Merge 2 : Même conflit détecté                  │
│  └── Rerere applique automatiquement             │
│                                                   │
│  Utile pour : rebases fréquents,                 │
│  cherry-pick entre branches, long-lived branches │
└──────────────────────────────────────────────────┘
\`\`\`

### Maintenance préventive

\`\`\`bash
git gc --aggressive --prune=now
git count-objects -v
git branch --merged main | grep -v main | xargs git branch -d
git remote prune origin
git fetch --prune
\`\`\``,
    practiceContent: `## Travaux Pratiques - Récupération et Forensics

### TP1 : Récupération de commits perdus

Simulez des scénarios de perte : reset --hard de 5 commits, suppression de branche avec commits non mergés, rebase destructif qui perd des commits. Pour chaque cas, utilisez le reflog pour retrouver et récupérer les données perdues. Documentez la procédure étape par étape pour chaque scénario.

\`\`\`bash
# Scénario 1 : reset --hard
git reset --hard HEAD~5
git reflog  # trouver le SHA
git reset --hard HEAD@{1}

# Scénario 2 : branche supprimée
git branch -D feature/important
git reflog | grep feature/important
git checkout -b feature/important SHA
\`\`\`

### TP2 : Git Bisect automatisé

Créez un repository avec 30+ commits et introduisez un bug au commit 15. Écrivez un script de test qui détecte le bug (exit code 1 si bug présent). Utilisez git bisect run avec ce script pour trouver automatiquement le commit fautif. Comparez le temps avec une recherche manuelle (30 étapes) vs bisect (5 étapes).

### TP3 : Forensics avancé avec blame et log

Analysez un repository existant complexe : identifiez qui a introduit une fonction spécifique avec blame, trouvez quand un fichier a été renommé avec log --follow, cherchez quand une variable a été supprimée avec log -S. Configurez .git-blame-ignore-revs pour 3 commits de formatage et vérifiez que blame est plus lisible.

### TP4 : Rerere pour conflits récurrents

Activez rerere globalement. Créez un scénario réaliste : une branche feature longue qui doit être rebasée régulièrement sur un main qui évolue au même endroit. Résolvez le conflit une première fois et vérifiez que les rebases suivants appliquent automatiquement la même résolution sans intervention manuelle.`,
    keyPoints: JSON.stringify(['Reflog pour retrouver tout historique des actions Git', 'Récupération après reset hard et rebase destructif', 'Git fsck pour vérifier et réparer les repositories', 'Git blame avec ignore-revs pour forensics propre', 'Git log -S pickaxe pour recherche dans historique', 'Git bisect pour trouver le commit fautif par dichotomie', 'Rerere pour réutiliser les résolutions de conflits', 'Maintenance préventive avec gc et prune réguliers']),
  },

  {
    id: 'jen-06',
    courseId: 'jenkins',
    title: 'Jenkins Shared Libraries',
    duration: '3h',
    orderIndex: 6,
    theoryContent: `## Jenkins Shared Libraries

### Introduction

Les Shared Libraries Jenkins factorisent et réutilisent du code entre pipelines. Elles maintiennent la cohérence dans les organisations avec de nombreux projets.

### Structure d'une Shared Library

\`\`\`
┌──────────────────────────────────────────────────┐
│        Structure Shared Library                   │
│                                                   │
│  shared-library/                                 │
│  ├── vars/                                       │
│  │   ├── buildDockerImage.groovy  (global var)  │
│  │   ├── buildDockerImage.txt     (help)        │
│  │   ├── deployToK8s.groovy                     │
│  │   └── notifySlack.groovy                     │
│  ├── src/                                        │
│  │   └── com/myorg/                             │
│  │       ├── Docker.groovy        (classes)     │
│  │       └── Utils.groovy                       │
│  ├── resources/                                  │
│  │   └── templates/                             │
│  └── test/                                       │
│      └── vars/                                   │
└──────────────────────────────────────────────────┘
\`\`\`

### Global Variables (vars/)

\`\`\`groovy
// vars/buildDockerImage.groovy
def call(Map config = [:]) {
    def imageName = config.imageName ?: error("imageName requis")
    def tag = config.tag ?: env.BUILD_NUMBER
    def registry = config.registry ?: "ghcr.io/mon-org"
    def fullImage = "\${registry}/\${imageName}:\${tag}"

    echo "Construction: \${fullImage}"
    docker.withRegistry("https://\${registry}", 'registry-creds') {
        def image = docker.build(fullImage, "-f Dockerfile .")
        image.push()
        image.push('latest')
    }
    return fullImage
}
\`\`\`

\`\`\`groovy
// vars/deployToK8s.groovy
def call(Map config = [:]) {
    def namespace = config.namespace ?: 'default'
    def manifest = config.manifest ?: 'k8s/deployment.yaml'
    withKubeConfig([credentialsId: "kubeconfig-\${config.cluster}"]) {
        sh "kubectl apply -f \${manifest} -n \${namespace}"
        sh "kubectl rollout status deployment/\${config.appName} -n \${namespace}"
    }
}
\`\`\`

\`\`\`groovy
// vars/notifySlack.groovy
def call(Map config = [:]) {
    def status = config.status ?: currentBuild.currentResult
    def color = status == 'SUCCESS' ? 'good' : 'danger'
    slackSend(
        channel: config.channel ?: '#ci-cd',
        color: color,
        message: "\${env.JOB_NAME} #\${env.BUILD_NUMBER} - \${status}"
    )
}
\`\`\`

### Pipeline standard réutilisable

\`\`\`groovy
// vars/standardPipeline.groovy
def call(Map config = [:]) {
    pipeline {
        agent { label config.agent ?: 'docker' }
        environment {
            APP_NAME = config.appName
        }
        stages {
            stage('Build') {
                steps {
                    script {
                        buildDockerImage(imageName: env.APP_NAME)
                    }
                }
            }
            stage('Test') {
                steps { sh config.testCommand ?: 'npm test' }
            }
            stage('Deploy') {
                when { branch 'main' }
                steps {
                    script {
                        deployToK8s(appName: env.APP_NAME)
                    }
                }
            }
        }
        post {
            always { script { notifySlack() } }
        }
    }
}
\`\`\`

### Classes dans src/

\`\`\`groovy
// src/com/myorg/Docker.groovy
package com.myorg

class Docker implements Serializable {
    def script
    Docker(script) { this.script = script }

    def build(String image, String tag) {
        script.sh "docker build -t \${image}:\${tag} ."
        return "\${image}:\${tag}"
    }

    def scan(String image) {
        script.sh "trivy image --severity HIGH,CRITICAL \${image}"
    }
}
\`\`\`

### Utilisation dans un Jenkinsfile

\`\`\`groovy
@Library('my-shared-lib') _

standardPipeline(
    appName: 'mon-api',
    testCommand: 'npm run test:ci',
    namespace: 'production'
)

// Ou utilisation modulaire
@Library('my-shared-lib@v2.0') _
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                script { buildDockerImage(imageName: 'app', tag: 'v1') }
            }
        }
    }
}
\`\`\`

### Testing et versioning

\`\`\`groovy
// test avec jenkins-pipeline-unit
import com.lesfurets.jenkins.unit.BasePipelineTest
class BuildTest extends BasePipelineTest {
    void testBuild() {
        def script = loadScript("vars/buildDockerImage.groovy")
        script.call(imageName: 'test-app')
    }
}
\`\`\`

\`\`\`bash
# Versioning par tags
git tag -a v1.0.0 -m "Release 1.0.0"
# Usage: @Library('my-shared-lib@v1.0.0') _
\`\`\``,
    practiceContent: `## Travaux Pratiques - Jenkins Shared Libraries

### TP1 : Création d'une Shared Library

Créez une Shared Library avec la structure standard (vars/, src/, resources/). Implémentez trois global variables : buildDockerImage (build, tag, push), deployToK8s (apply manifest, rollout status) et notifySlack (succès/échec). Ajoutez un fichier .txt pour chaque variable avec la documentation d'usage.

\`\`\`bash
# Structure à créer
mkdir -p shared-library/{vars,src/com/myorg,resources/templates,test/vars}
# Créer les fichiers groovy dans vars/
# Publier dans un repo Git dédié
\`\`\`

### TP2 : Pipeline standard factorisé

Créez une variable standardPipeline qui encapsule un pipeline complet configurable (build Docker, tests, scan sécurité, deploy K8s, notification). Utilisez-la depuis 3 projets différents (API Node.js, API Java, Frontend React) en ne changeant que les paramètres. Vérifiez que tous les projets utilisent le même workflow.

### TP3 : Classes et utilitaires avancés

Implémentez des classes dans src/ pour Docker (build, push, scan), Kubernetes (deploy, rollback, status) et Notifications (Slack, email). Utilisez-les depuis vos global vars en instanciant avec \`new com.myorg.Docker(this)\`. Respectez le pattern Serializable pour la compatibilité avec la sérialisation Jenkins.

### TP4 : Tests unitaires de la library

Configurez un projet Gradle avec jenkins-pipeline-unit pour tester vos Shared Libraries. Écrivez des tests unitaires pour chaque global variable en mockant les méthodes Jenkins (sh, docker, withCredentials). Mettez en place un pipeline CI dans la library qui exécute les tests et bloque le merge si un test échoue.`,
    keyPoints: JSON.stringify(['Structure vars/ src/ resources/ pour Shared Libraries', 'Global Variables avec méthode call() dans vars/', 'Classes Groovy dans src/ avec pattern Serializable', 'Pipeline standard factorisé et configurable', 'Chargement avec annotation Library et versioning', 'Tests unitaires avec jenkins-pipeline-unit', 'Versioning par tags Git pour stabilité', 'Documentation intégrée avec fichiers .txt']),
  },
  {
    id: 'jen-07',
    courseId: 'jenkins',
    title: 'Jenkins Configuration as Code',
    duration: '3h',
    orderIndex: 7,
    theoryContent: `## Jenkins Configuration as Code (JCasC)

### Introduction

JCasC permet de configurer Jenkins entièrement via YAML. Toute la configuration est versionnée, reproductible et auditable. Ce module couvre JCasC, seed jobs, Job DSL et la configuration Docker.

### Principe JCasC

\`\`\`
┌──────────────────────────────────────────────────┐
│      Jenkins Configuration as Code               │
│                                                   │
│  ┌──────────┐    ┌─────────────┐    ┌────────┐  │
│  │  YAML    │───>│   JCasC     │───>│Jenkins │  │
│  │  Config  │    │   Plugin    │    │  Live  │  │
│  └──────────┘    └─────────────┘    └────────┘  │
│                                                   │
│  Fichiers versionnés dans Git :                  │
│  ├── jenkins.yaml  (config principale)           │
│  ├── credentials.yaml (secrets)                  │
│  └── jobs.yaml (seed jobs)                       │
└──────────────────────────────────────────────────┘
\`\`\`

### Configuration YAML principale

\`\`\`yaml
jenkins:
  systemMessage: "Jenkins - Configuration as Code"
  numExecutors: 0
  mode: EXCLUSIVE

  securityRealm:
    ldap:
      configurations:
        - server: ldap.example.com
          rootDN: "dc=example,dc=com"
          userSearch: "uid={0}"

  authorizationStrategy:
    roleBased:
      roles:
        global:
          - name: "admin"
            permissions: ["Overall/Administer"]
            entries:
              - group: "jenkins-admins"
          - name: "developer"
            permissions: ["Job/Build", "Job/Read"]
            entries:
              - group: "developers"

  clouds:
    - docker:
        name: "docker-cloud"
        templates:
          - labelString: "docker-agent"
            dockerTemplateBase:
              image: "jenkins/agent:latest"
            instanceCap: 10
\`\`\`

### Credentials

\`\`\`yaml
credentials:
  system:
    domainCredentials:
      - credentials:
          - usernamePassword:
              id: "github-token"
              username: "jenkins-bot"
              password: "\\\${GITHUB_TOKEN}"
          - string:
              id: "slack-webhook"
              secret: "\\\${SLACK_WEBHOOK_URL}"
          - basicSSHUserPrivateKey:
              id: "ssh-deploy-key"
              username: "deploy"
              privateKeySource:
                directEntry:
                  privateKey: "\\\${SSH_PRIVATE_KEY}"
\`\`\`

### Seed Jobs et Job DSL

\`\`\`yaml
jobs:
  - script: |
      folder('applications') {
          displayName('Applications')
      }
      multibranchPipelineJob('applications/frontend') {
          branchSources {
              github {
                  id('frontend-repo')
                  repoOwner('mon-org')
                  repository('frontend')
                  credentialsId('github-token')
              }
          }
          orphanedItemStrategy {
              discardOldItems { numToKeep(10) }
          }
      }
\`\`\`

\`\`\`groovy
// Job DSL dynamique
def projects = [
    [name: 'api-users', repo: 'api-users'],
    [name: 'api-orders', repo: 'api-orders'],
    [name: 'frontend', repo: 'frontend-app'],
]

projects.each { project ->
    multibranchPipelineJob("applications/\${project.name}") {
        branchSources {
            github {
                id(project.name)
                repoOwner('mon-org')
                repository(project.repo)
                credentialsId('github-token')
            }
        }
    }
}
\`\`\`

### Docker Compose pour Jenkins

\`\`\`yaml
version: '3.8'
services:
  jenkins:
    image: jenkins/jenkins:lts-jdk17
    ports:
      - "8080:8080"
      - "50000:50000"
    volumes:
      - jenkins-data:/var/jenkins_home
      - ./casc:/var/jenkins_home/casc_configs
    environment:
      - CASC_JENKINS_CONFIG=/var/jenkins_home/casc_configs
      - JAVA_OPTS=-Djenkins.install.runSetupWizard=false
      - GITHUB_TOKEN
      - SLACK_WEBHOOK_URL
volumes:
  jenkins-data:
\`\`\`

\`\`\`dockerfile
FROM jenkins/jenkins:lts-jdk17
ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"
ENV CASC_JENKINS_CONFIG="/var/jenkins_home/casc_configs"
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt
COPY casc/ /var/jenkins_home/casc_configs/
\`\`\`

### Validation et API

\`\`\`bash
# Valider la configuration
curl -X POST "http://jenkins:8080/configuration-as-code/check" \\
  -u admin:token -F "casc=@jenkins.yaml"

# Appliquer
curl -X POST "http://jenkins:8080/configuration-as-code/apply" \\
  -u admin:token -F "casc=@jenkins.yaml"

# Exporter la config actuelle
curl "http://jenkins:8080/configuration-as-code/export" \\
  -u admin:token > current.yaml
\`\`\``,
    practiceContent: `## Travaux Pratiques - Jenkins Configuration as Code

### TP1 : Configuration JCasC complète

Créez une configuration JCasC qui définit : le système (message, executors à 0), la sécurité (matrice de rôles admin/developer/reader), les credentials (GitHub token, SSH key, Slack webhook) et un cloud Docker pour les agents. Déployez Jenkins avec Docker Compose et vérifiez que tout est automatiquement configuré sans wizard.

\`\`\`bash
# Lancer Jenkins avec JCasC
docker compose up -d
sleep 30  # attendre le démarrage

# Vérifier la configuration appliquée
curl -u admin:token http://localhost:8080/configuration-as-code/export
\`\`\`

### TP2 : Seed Jobs dynamiques avec Job DSL

Implémentez un seed job qui crée automatiquement des multibranch pipelines pour 10 repositories d'une organisation GitHub. Le seed job doit se déclencher via webhook quand un nouveau repo est créé. Utilisez Job DSL pour générer les jobs dynamiquement depuis une liste ou l'API GitHub.

### TP3 : Image Docker Jenkins personnalisée

Créez un Dockerfile qui pré-installe 15+ plugins requis (JCasC, Job DSL, Docker, Git, Slack, Kubernetes, credentials). L'image embarque la configuration JCasC et doit démarrer sans aucune action manuelle. Testez le cycle : build image, docker run, vérifier que les jobs existent et les credentials sont configurées.

### TP4 : GitOps pour la configuration Jenkins

Versionnez toute la configuration Jenkins dans un repo Git (YAML JCasC, Job DSL scripts, plugins.txt, Dockerfile). Mettez en place un pipeline qui applique automatiquement les changements quand le YAML est modifié sur main. Testez le rollback en revertant un commit et vérifiant que la configuration revient à l'état précédent.`,
    keyPoints: JSON.stringify(['JCasC pour configuration Jenkins déclarative en YAML', 'Credentials gérées avec variables environnement', 'Seed Jobs pour création automatique de pipelines', 'Job DSL pour définition programmatique des jobs', 'Docker Compose avec JCasC pour déploiement reproductible', 'Plugins pré-installés via plugins.txt et CLI', 'Validation et export de configuration via API', 'GitOps avec application automatique des changements']),
  },
  {
    id: 'jen-08',
    courseId: 'jenkins',
    title: 'Migration depuis Jenkins',
    duration: '3h',
    orderIndex: 8,
    theoryContent: `## Migration depuis Jenkins

### Introduction

Migrer depuis Jenkins vers GitLab CI ou GitHub Actions est stratégique pour moderniser les pipelines CI/CD. Ce module couvre les stratégies, correspondances et outils de migration.

### Pourquoi migrer

\`\`\`
┌──────────────────────────────────────────────────┐
│  Problèmes Jenkins       │  Solutions modernes   │
│  ────────────────────────┼─────────────────────  │
│  Maintenance serveur     │  SaaS managed         │
│  Plugins instables       │  Features intégrées   │
│  Configuration manuelle  │  Config as Code natif │
│  Scaling complexe        │  Auto-scaling runners │
│  Sécurité (plugins)      │  Mises à jour auto    │
│  Jenkinsfile complexes   │  YAML simple          │
└──────────────────────────────────────────────────┘
\`\`\`

### Conversion Jenkins vers GitLab CI

\`\`\`groovy
// Jenkinsfile
pipeline {
    agent { docker { image 'node:20' } }
    stages {
        stage('Install') { steps { sh 'npm ci' } }
        stage('Test') {
            parallel {
                stage('Unit') { steps { sh 'npm run test:unit' } }
                stage('E2E') { steps { sh 'npm run test:e2e' } }
            }
        }
        stage('Deploy') {
            when { branch 'main' }
            input { message 'Deployer ?' }
            steps { sh 'deploy.sh' }
        }
    }
    post { failure { slackSend message: "Failed" } }
}
\`\`\`

\`\`\`yaml
# GitLab CI équivalent
image: node:20
stages: [install, test, deploy]

install:
  stage: install
  script: npm ci
  cache:
    key: { files: [package-lock.json] }
    paths: [node_modules/]

test-unit:
  stage: test
  script: npm run test:unit

test-e2e:
  stage: test
  script: npm run test:e2e

deploy:
  stage: deploy
  script: deploy.sh
  environment:
    name: production
  when: manual
  rules:
    - if: \\\$CI_COMMIT_BRANCH == "main"

notify:
  stage: .post
  script: curl -X POST \\\$SLACK_WEBHOOK -d '{"text":"Failed"}'
  when: on_failure
\`\`\`

### Conversion Jenkins vers GitHub Actions

\`\`\`yaml
name: CI/CD
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        test: [unit, e2e]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run test:\\\${{ matrix.test }}

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - run: ./deploy.sh
\`\`\`

### Stratégie de migration

\`\`\`
Phase 1 : Audit (2 semaines)
├── Inventaire jobs et plugins
├── Mapping credentials
└── Priorisation

Phase 2 : Pilote (2 semaines)
├── 3 projets simples migrés
├── Formation équipe
└── Documentation patterns

Phase 3 : Migration (4 semaines)
├── Lots de 5-10 projets
├── Dual-run parallèle
└── Support continu

Phase 4 : Décommission (2 semaines)
├── Vérification finale
├── Archivage logs
└── Suppression Jenkins
\`\`\`

### Mapping plugins

| Plugin Jenkins | GitLab CI | GitHub Actions |
|----------------|-----------|----------------|
| Credentials | CI/CD Variables | Secrets |
| Docker Pipeline | services + DinD | docker/build-push |
| JUnit | reports:junit | test-reporter |
| Slack | curl webhook | slack-github-action |
| Kubernetes | kubectl script | k8s-deploy |

### Outils de migration

\`\`\`bash
# GitHub Actions Importer (outil officiel)
gh actions-importer audit --output-dir audit
gh actions-importer dry-run jenkins \\
  --source-url http://jenkins:8080 \\
  --output-dir converted

# Exporter la liste des plugins Jenkins installés
curl -s "http://jenkins:8080/pluginManager/api/json?depth=1" \\
  -u admin:token | jq '.plugins[].shortName'

# Valider le fichier .gitlab-ci.yml converti
curl --header "PRIVATE-TOKEN: token" \\
  --data "content=ci_content_here" \\
  "https://gitlab.com/api/v4/projects/ID/ci/lint"
\`\`\`

### Pièges courants

\`\`\`
1. Shared Libraries complexes
   → Convertir en templates progressivement

2. Plugins sans équivalent direct
   → Souvent remplaçable par un script bash

3. Permissions granulaires
   → Environments protégés + RBAC

4. Webhooks et intégrations
   → Mettre à jour tous les hooks

5. Historique des builds
   → Archiver avant migration

6. Variables et secrets
   → Migrer les credentials une par une avec vérification
   → Tester chaque secret dans un job de validation dédié
\`\`\``,
    practiceContent: `## Travaux Pratiques - Migration depuis Jenkins

### TP1 : Audit complet d'une instance Jenkins

Effectuez un audit détaillé d'une instance Jenkins : listez tous les jobs (freestyle, pipeline, multibranch), plugins installés avec versions, credentials configurées et agents. Créez un document de mapping complet vers GitLab CI ou GitHub Actions pour chaque élément.

\`\`\`bash
# Lister les plugins
curl -s "http://jenkins:8080/pluginManager/api/json?depth=1" \\
  -u admin:token | jq '.plugins[] | .shortName + ":" + .version'

# Lister tous les jobs
curl -s "http://jenkins:8080/api/json?tree=jobs[name,color,_class]" \\
  -u admin:token | jq '.jobs[] | .name + " (" + ._class + ")"'

# Exporter les credentials (noms uniquement)
curl -s "http://jenkins:8080/credentials/store/system/domain/_/api/json" \\
  -u admin:token | jq '.credentials[].id'
\`\`\`

### TP2 : Conversion d'un Jenkinsfile complexe

Prenez un Jenkinsfile avec : stages parallèles, conditions when, input pour approbation, credentials binding, post-actions (success/failure/always). Convertissez-le en GitLab CI ET en GitHub Actions. Comparez la lisibilité, les fonctionnalités et le nombre de lignes entre les trois versions.

### TP3 : Migration automatisée avec outils

Utilisez GitHub Actions Importer pour convertir automatiquement 5 Jenkinsfiles variés (simple, parallèle, avec Docker, avec paramètres). Évaluez la qualité de chaque conversion, documentez les ajustements manuels nécessaires et les fonctionnalités non supportées par l'outil automatique.

### TP4 : Plan de migration organisationnel

Rédigez un plan complet pour migrer 50 jobs Jenkins vers GitLab CI en 10 semaines. Incluez : inventaire catégorisé (simple/moyen/complexe), calendrier semaine par semaine, plan de formation 3 sessions, stratégie dual-run, critères de succès (temps pipeline, taux succès), et plan de rollback documenté avec procédure étape par étape.`,
    keyPoints: JSON.stringify(['Correspondances Jenkins vers GitLab CI et GitHub Actions', 'Migration en 4 phases audit pilote massive décommission', 'GitHub Actions Importer pour conversion automatique', 'Dual-run pendant la transition pour sécurité', 'Mapping des plugins vers fonctionnalités natives', 'Gestion des credentials vers secrets et variables', 'Templates et includes pour remplacer Shared Libraries', 'Pièges courants et stratégies de contournement']),
  },

  {
    id: 'art-06',
    courseId: 'artifactory',
    title: 'Build Integration',
    duration: '3h',
    orderIndex: 6,
    theoryContent: `## Build Integration avec JFrog Artifactory

### Introduction à l'intégration des builds

L'intégration des builds dans Artifactory permet de capturer les métadonnées complètes de chaque build : dépendances résolues, artefacts produits, variables d'environnement et informations de promotion. Cette traçabilité est essentielle pour la conformité et la reproductibilité.

### Architecture Build Info

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    BUILD PIPELINE                         │
│                                                           │
│  ┌──────────┐    ┌──────────┐    ┌──────────────┐      │
│  │  Source  │───▶│  Build   │───▶│  Artifacts   │      │
│  │  Code    │    │  Tool    │    │  (.jar/.npm)  │      │
│  └──────────┘    └────┬─────┘    └──────┬───────┘      │
│                       │                  │               │
│                       ▼                  ▼               │
│              ┌────────────────────────────────┐         │
│              │       BUILD INFO              │         │
│              │  - Dependencies resolved      │         │
│              │  - Artifacts deployed         │         │
│              │  - Environment variables      │         │
│              │  - VCS revision               │         │
│              └────────────┬──────────────────┘         │
│                           ▼                             │
│              ┌────────────────────────┐                 │
│              │    ARTIFACTORY         │                 │
│              │  Build Info Storage    │                 │
│              └────────────────────────┘                 │
└─────────────────────────────────────────────────────────┘
\`\`\`

### Intégration Maven

\`\`\`xml
<!-- settings.xml pour Maven avec Artifactory -->
<settings>
  <servers>
    <server>
      <id>artifactory-releases</id>
      <username>\\\${env.ARTIFACTORY_USER}</username>
      <password>\\\${env.ARTIFACTORY_PASSWORD}</password>
    </server>
    <server>
      <id>artifactory-snapshots</id>
      <username>\\\${env.ARTIFACTORY_USER}</username>
      <password>\\\${env.ARTIFACTORY_PASSWORD}</password>
    </server>
  </servers>
  <profiles>
    <profile>
      <id>artifactory</id>
      <repositories>
        <repository>
          <id>artifactory-releases</id>
          <url>https://company.jfrog.io/artifactory/libs-release</url>
          <releases><enabled>true</enabled></releases>
          <snapshots><enabled>false</enabled></snapshots>
        </repository>
      </repositories>
    </profile>
  </profiles>
  <activeProfiles>
    <activeProfile>artifactory</activeProfile>
  </activeProfiles>
</settings>
\`\`\`

### Intégration Gradle

\`\`\`groovy
// build.gradle avec plugin Artifactory
plugins {
    id 'com.jfrog.artifactory' version '4.31.0'
    id 'maven-publish'
}

artifactory {
    contextUrl = "https://company.jfrog.io/artifactory"
    publish {
        repository {
            repoKey = 'libs-release-local'
            username = project.findProperty('artifactory_user') ?: 'admin'
            password = project.findProperty('artifactory_password') ?: ''
        }
        defaults {
            publications('mavenJava')
            publishArtifacts = true
            publishBuildInfo = true
            publishPom = true
        }
    }
    resolve {
        repository {
            repoKey = 'libs-release'
            username = project.findProperty('artifactory_user') ?: 'admin'
            password = project.findProperty('artifactory_password') ?: ''
        }
    }
}

publishing {
    publications {
        mavenJava(MavenPublication) {
            from components.java
            artifact sourceJar
        }
    }
}
\`\`\`

### Intégration npm

\`\`\`bash
# Configuration .npmrc pour Artifactory
registry=https://company.jfrog.io/artifactory/api/npm/npm-remote/
//company.jfrog.io/artifactory/api/npm/npm-local/:_authToken=TOKEN
always-auth=true

# Publication npm vers Artifactory
npm publish --registry https://company.jfrog.io/artifactory/api/npm/npm-local/

# Collecte du build info npm
jf npm-config --repo-resolve=npm-remote --repo-deploy=npm-local
jf npm install --build-name=mon-app --build-number=42
jf npm publish --build-name=mon-app --build-number=42
jf rt build-publish mon-app 42
\`\`\`

### Promotion de builds

\`\`\`bash
# Promouvoir un build de staging vers production
jf rt build-promote mon-app 42 libs-release-local \\
  --status="Released" \\
  --comment="Approved by QA team" \\
  --source-repo=libs-staging-local \\
  --include-dependencies \\
  --copy

# Vérifier le statut de promotion
jf rt curl -XGET "/api/build/mon-app/42"
\`\`\`

### Release Bundles (Distribution)

\`\`\`bash
# Créer un Release Bundle
jf ds release-bundle-create mon-app-bundle 1.0.0 \\
  --spec=release-spec.json \\
  --sign

# Fichier release-spec.json
{
  "files": [
    {
      "pattern": "libs-release-local/com/company/mon-app/1.0.0/*",
      "target": "prod-releases/"
    }
  ]
}

# Distribuer le bundle vers des Edge nodes
jf ds release-bundle-distribute mon-app-bundle 1.0.0 \\
  --dist-rules=dist-rules.json

# dist-rules.json
{
  "distribution_rules": [
    {
      "site_name": "edge-paris",
      "city_name": "Paris",
      "country_codes": ["FR"]
    }
  ]
}
\`\`\`

### Build Info dans les pipelines CI/CD

\`\`\`yaml
# Jenkinsfile avec Artifactory plugin
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                script {
                    def server = Artifactory.server 'my-artifactory'
                    def rtMaven = Artifactory.newMavenBuild()
                    rtMaven.resolver server: server, releaseRepo: 'libs-release', snapshotRepo: 'libs-snapshot'
                    rtMaven.deployer server: server, releaseRepo: 'libs-release-local', snapshotRepo: 'libs-snapshot-local'
                    def buildInfo = rtMaven.run pom: 'pom.xml', goals: 'clean install'
                    server.publishBuildInfo buildInfo
                }
            }
        }
        stage('Promote') {
            steps {
                script {
                    def server = Artifactory.server 'my-artifactory'
                    def promotionConfig = [
                        buildName: env.JOB_NAME,
                        buildNumber: env.BUILD_NUMBER,
                        targetRepo: 'libs-release-local',
                        status: 'Released'
                    ]
                    server.promote promotionConfig
                }
            }
        }
    }
}
\`\`\``,
    practiceContent: `### TP1 : Intégration Maven complète

Configurez un projet Maven multi-modules avec Artifactory. Déployez les artefacts avec capture du build info. Vérifiez dans l'interface Artifactory que toutes les dépendances transitives sont listées. Ajoutez des propriétés personnalisées (version Java, OS de build) au build info.

### TP2 : Pipeline npm avec promotion

Créez un package npm et configurez sa publication vers un dépôt staging. Implémentez un workflow de promotion automatique : après validation des tests d'intégration, promouvez vers le dépôt de production. Vérifiez la traçabilité complète via l'API Build Info.

### TP3 : Release Bundles multi-composants

Créez un Release Bundle contenant des artefacts de 3 projets différents (backend Java, frontend npm, Docker image). Signez le bundle, puis distribuez-le vers un Edge node simulé. Documentez le processus de rollback si un composant est défectueux.

### TP4 : Audit de builds et compliance

Utilisez l'API Build Info pour extraire tous les builds des 30 derniers jours. Générez un rapport montrant : les dépendances communes entre projets, les versions obsolètes, les builds sans promotion, et les artefacts orphelins. Proposez un plan de nettoyage.`,
    keyPoints: JSON.stringify(['Capture automatique du build info avec dépendances et artefacts', 'Intégration native Maven Gradle et npm via plugins dédiés', 'Promotion de builds entre dépôts staging et production', 'Release Bundles pour distribution cohérente multi-sites', 'Traçabilité complète du code source aux artefacts déployés', 'Signature et vérification des Release Bundles', 'Intégration CI/CD Jenkins GitLab GitHub Actions', 'Propriétés et métadonnées personnalisées sur les builds']),
  },


  {
    id: 'art-07',
    courseId: 'artifactory',
    title: 'Artifactory REST API et automatisation',
    duration: '3h',
    orderIndex: 7,
    theoryContent: `## Artifactory REST API et automatisation

### Introduction à l'API REST Artifactory

L'API REST d'Artifactory est extrêmement riche et permet d'automatiser toutes les opérations : gestion des dépôts, recherche d'artefacts, administration des utilisateurs, et monitoring. Maîtriser cette API est essentiel pour industrialiser la gestion des artefacts.

### Authentification et configuration

\`\`\`bash
# Authentification par token API
export ARTIFACTORY_URL="https://company.jfrog.io/artifactory"
export ARTIFACTORY_TOKEN="votre-api-token"

# Test de connexion
curl -H "Authorization: Bearer \\\${ARTIFACTORY_TOKEN}" \\
  "\\\${ARTIFACTORY_URL}/api/system/ping"

# Obtenir les informations système
curl -H "Authorization: Bearer \\\${ARTIFACTORY_TOKEN}" \\
  "\\\${ARTIFACTORY_URL}/api/system/version"

# Créer un token d'accès
curl -X POST -H "Authorization: Bearer \\\${ARTIFACTORY_TOKEN}" \\
  "\\\${ARTIFACTORY_URL}/api/security/token" \\
  -d "username=deploy-bot" \\
  -d "scope=member-of-groups:deployers" \\
  -d "expires_in=86400"
\`\`\`

### AQL - Artifactory Query Language

\`\`\`bash
# Recherche basique par nom
curl -X POST -H "Authorization: Bearer \\\${ARTIFACTORY_TOKEN}" \\
  -H "Content-Type: text/plain" \\
  "\\\${ARTIFACTORY_URL}/api/search/aql" \\
  -d 'items.find({"name": {"\\$match": "*.jar"}})'

# Recherche avec filtres multiples
curl -X POST -H "Authorization: Bearer \\\${ARTIFACTORY_TOKEN}" \\
  -H "Content-Type: text/plain" \\
  "\\\${ARTIFACTORY_URL}/api/search/aql" \\
  -d 'items.find({
    "repo": "libs-release-local",
    "type": "file",
    "created": {"\\$gt": "2024-01-01"},
    "size": {"\\$gt": "1048576"}
  }).include("name","repo","path","size","created")
  .sort({"\\$desc": ["created"]})
  .limit(50)'

# Recherche par propriétés
curl -X POST -H "Authorization: Bearer \\\${ARTIFACTORY_TOKEN}" \\
  -H "Content-Type: text/plain" \\
  "\\\${ARTIFACTORY_URL}/api/search/aql" \\
  -d 'items.find({
    "@build.name": "mon-application",
    "@build.number": {"\\$gt": "100"}
  }).include("name","path","@build.name","@build.number")'

# Statistiques de téléchargement
curl -X POST -H "Authorization: Bearer \\\${ARTIFACTORY_TOKEN}" \\
  -H "Content-Type: text/plain" \\
  "\\\${ARTIFACTORY_URL}/api/search/aql" \\
  -d 'items.find({
    "repo": "libs-release-local",
    "stat.downloads": {"\\$gt": 0}
  }).include("name","stat.downloads","stat.downloaded")
  .sort({"\\$desc": ["stat.downloads"]})
  .limit(20)'
\`\`\`

### Gestion des propriétés

\`\`\`bash
# Ajouter des propriétés à un artefact
curl -X PUT -H "Authorization: Bearer \\\${ARTIFACTORY_TOKEN}" \\
  "\\\${ARTIFACTORY_URL}/api/storage/libs-release-local/com/app/1.0/app-1.0.jar?properties=quality.gate=passed;tested.by=jenkins;deploy.env=staging"

# Lire les propriétés
curl -H "Authorization: Bearer \\\${ARTIFACTORY_TOKEN}" \\
  "\\\${ARTIFACTORY_URL}/api/storage/libs-release-local/com/app/1.0/app-1.0.jar?properties"

# Rechercher par propriétés
curl -H "Authorization: Bearer \\\${ARTIFACTORY_TOKEN}" \\
  "\\\${ARTIFACTORY_URL}/api/search/prop?quality.gate=passed&repos=libs-release-local"

# Supprimer une propriété
curl -X DELETE -H "Authorization: Bearer \\\${ARTIFACTORY_TOKEN}" \\
  "\\\${ARTIFACTORY_URL}/api/storage/libs-release-local/com/app/1.0/app-1.0.jar?properties=tested.by"
\`\`\`

### Statistiques de téléchargement

\`\`\`bash
# Statistiques d'un artefact
curl -H "Authorization: Bearer \\\${ARTIFACTORY_TOKEN}" \\
  "\\\${ARTIFACTORY_URL}/api/storage/libs-release-local/com/app/1.0/app-1.0.jar?stats"

# Artefacts les plus téléchargés (via AQL)
curl -X POST -H "Authorization: Bearer \\\${ARTIFACTORY_TOKEN}" \\
  -H "Content-Type: text/plain" \\
  "\\\${ARTIFACTORY_URL}/api/search/aql" \\
  -d 'items.find({"repo":"libs-release-local","type":"file"})
  .include("name","path","stat.downloads")
  .sort({"\\$desc":["stat.downloads"]}).limit(10)'
\`\`\`

### Nettoyage automatisé

\`\`\`bash
# Script de nettoyage des snapshots anciens
#!/bin/bash
DAYS_OLD=30
REPO="libs-snapshot-local"

# Trouver les artefacts de plus de 30 jours
RESULTS=$(curl -s -X POST \\
  -H "Authorization: Bearer \\\${ARTIFACTORY_TOKEN}" \\
  -H "Content-Type: text/plain" \\
  "\\\${ARTIFACTORY_URL}/api/search/aql" \\
  -d "items.find({
    \\"repo\\": \\"\\\${REPO}\\",
    \\"type\\": \\"file\\",
    \\"created\\": {\\\"\\\\\\$before\\\": \\\"\\\${DAYS_OLD}d\\\"}
  }).include(\\"repo\\",\\"path\\",\\"name\\")")

# Parser et supprimer
echo "\\\${RESULTS}" | jq -r '.results[] | "\\(.repo)/\\(.path)/\\(.name)"' | while read FILE; do
  echo "Suppression: \\\${FILE}"
  curl -X DELETE -H "Authorization: Bearer \\\${ARTIFACTORY_TOKEN}" \\
    "\\\${ARTIFACTORY_URL}/\\\${FILE}"
done

# Nettoyage avec politique de rétention
# Garder seulement les 5 dernières versions
curl -X POST -H "Authorization: Bearer \\\${ARTIFACTORY_TOKEN}" \\
  -H "Content-Type: text/plain" \\
  "\\\${ARTIFACTORY_URL}/api/search/aql" \\
  -d 'items.find({"repo":"npm-local","type":"file","name":{"\\$match":"mon-package-*.tgz"}})
  .sort({"\\$desc":["created"]}).offset(5)' | \\
  jq -r '.results[] | .repo + "/" + .path + "/" + .name' | \\
  xargs -I {} curl -X DELETE -H "Authorization: Bearer \\\${ARTIFACTORY_TOKEN}" "\\\${ARTIFACTORY_URL}/{}"
\`\`\`

### Gestion des dépôts via API

\`\`\`bash
# Créer un dépôt local
curl -X PUT -H "Authorization: Bearer \\\${ARTIFACTORY_TOKEN}" \\
  -H "Content-Type: application/json" \\
  "\\\${ARTIFACTORY_URL}/api/repositories/new-maven-local" \\
  -d '{
    "key": "new-maven-local",
    "rclass": "local",
    "packageType": "maven",
    "description": "Dépôt Maven pour nouvelle équipe",
    "handleReleases": true,
    "handleSnapshots": false
  }'

# Lister tous les dépôts
curl -H "Authorization: Bearer \\\${ARTIFACTORY_TOKEN}" \\
  "\\\${ARTIFACTORY_URL}/api/repositories"

# Obtenir l'utilisation stockage
curl -H "Authorization: Bearer \\\${ARTIFACTORY_TOKEN}" \\
  "\\\${ARTIFACTORY_URL}/api/storageinfo"
\`\`\``,
    practiceContent: `### TP1 : Requêtes AQL avancées

Écrivez 10 requêtes AQL couvrant différents cas : recherche par date, par taille, par propriétés, avec jointures sur les statistiques de téléchargement. Créez un rapport des artefacts inutilisés depuis 90 jours avec leur taille totale.

### TP2 : Script de nettoyage intelligent

Développez un script bash ou Python qui implémente une politique de rétention : garder les N dernières versions de chaque artefact, supprimer les snapshots de plus de X jours, protéger les artefacts marqués comme "production". Ajoutez un mode dry-run et un rapport détaillé.

### TP3 : Automatisation de la gestion des propriétés

Créez un pipeline CI qui ajoute automatiquement des propriétés aux artefacts publiés : hash du commit Git, branche, résultat des tests, couverture de code. Implémentez ensuite une recherche qui trouve tous les artefacts d'une branche spécifique ayant passé les tests.

### TP4 : Dashboard de monitoring

Construisez un script qui interroge l'API toutes les heures et collecte : espace disque utilisé par dépôt, nombre de téléchargements par jour, artefacts les plus populaires, et dépôts inactifs. Exportez les données en format compatible avec Grafana ou un tableur.`,
    keyPoints: JSON.stringify(['AQL comme langage puissant de recherche dans Artifactory', 'Gestion des propriétés pour métadonnées personnalisées', 'Statistiques de téléchargement pour analyse usage', 'Scripts de nettoyage automatisé avec politiques de rétention', 'Création et gestion de dépôts via API REST', 'Authentification par token avec scopes et expiration', 'Monitoring stockage et utilisation via endpoints dédiés', 'Intégration API dans les pipelines CI/CD pour automatisation']),
  },


  {
    id: 'art-08',
    courseId: 'artifactory',
    title: 'Multi-site et Edge nodes',
    duration: '3h',
    orderIndex: 8,
    theoryContent: `## Multi-site et Edge Nodes Artifactory

### Introduction à l'architecture multi-site

Dans les organisations distribuées géographiquement, un seul serveur Artifactory ne suffit pas. La stratégie multi-site permet d'avoir des instances Artifactory proches des équipes de développement tout en maintenant la cohérence globale des artefacts.

### Topologies de déploiement

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│              TOPOLOGIE HUB AND SPOKE                         │
│                                                               │
│                  ┌──────────────┐                            │
│                  │   HUB (HQ)   │                            │
│                  │  Artifactory │                            │
│                  │   Primary    │                            │
│                  └──────┬───────┘                            │
│           ┌─────────────┼─────────────┐                     │
│           │             │             │                      │
│    ┌──────▼─────┐ ┌────▼───────┐ ┌──▼──────────┐          │
│    │ Edge Paris │ │ Edge Tokyo │ │ Edge New York│          │
│    │ (lecture)  │ │ (lecture)  │ │ (lecture)    │          │
│    └────────────┘ └────────────┘ └─────────────┘          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              TOPOLOGIE MULTI-MASTER                           │
│                                                               │
│    ┌────────────┐         ┌────────────┐                    │
│    │  Site A    │◄───────▶│  Site B    │                    │
│    │ (Master)   │  Sync   │ (Master)   │                    │
│    └─────┬──────┘ bidir   └──────┬─────┘                    │
│          │                       │                           │
│    ┌─────▼──────┐         ┌─────▼──────┐                   │
│    │  Edge A1   │         │  Edge B1   │                   │
│    └────────────┘         └────────────┘                   │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Configuration de la réplication Push

\`\`\`bash
# Créer une réplication push (source vers destination)
curl -X PUT -H "Authorization: Bearer \\\${TOKEN}" \\
  -H "Content-Type: application/json" \\
  "\\\${ARTIFACTORY_URL}/api/replications/libs-release-local" \\
  -d '{
    "url": "https://edge-paris.company.com/artifactory/libs-release-local",
    "username": "replicator",
    "password": "encrypted-pass",
    "enabled": true,
    "cronExp": "0 0/15 * * * ?",
    "syncDeletes": true,
    "syncProperties": true,
    "syncStatistics": false,
    "pathPrefix": "",
    "enableEventReplication": true
  }'

# Déclencher manuellement une réplication
curl -X POST -H "Authorization: Bearer \\\${TOKEN}" \\
  "\\\${ARTIFACTORY_URL}/api/replications/execute/libs-release-local"

# Vérifier le statut de réplication
curl -H "Authorization: Bearer \\\${TOKEN}" \\
  "\\\${ARTIFACTORY_URL}/api/replications/libs-release-local"
\`\`\`

### Configuration de la réplication Pull

\`\`\`bash
# Sur le site distant, configurer le pull
curl -X PUT -H "Authorization: Bearer \\\${EDGE_TOKEN}" \\
  -H "Content-Type: application/json" \\
  "\\\${EDGE_URL}/api/replications/libs-release-local" \\
  -d '{
    "url": "https://hq.company.com/artifactory/libs-release-local",
    "username": "replicator",
    "password": "encrypted-pass",
    "enabled": true,
    "cronExp": "0 0 */2 * * ?",
    "syncDeletes": true,
    "syncProperties": true
  }'
\`\`\`

### Federation de dépôts

\`\`\`bash
# Créer un dépôt fédéré (réplication bidirectionnelle automatique)
curl -X PUT -H "Authorization: Bearer \\\${TOKEN}" \\
  -H "Content-Type: application/json" \\
  "\\\${ARTIFACTORY_URL}/api/repositories/shared-libs-federated" \\
  -d '{
    "key": "shared-libs-federated",
    "rclass": "federated",
    "packageType": "maven",
    "members": [
      {
        "url": "https://site-a.company.com/artifactory/shared-libs-federated",
        "enabled": true
      },
      {
        "url": "https://site-b.company.com/artifactory/shared-libs-federated",
        "enabled": true
      }
    ]
  }'
\`\`\`

### Edge Nodes

\`\`\`bash
# Configuration d'un Edge node (lecture seule optimisée)
# L'Edge node est une instance légère pour le pull uniquement

# Vérifier le type de licence
curl -H "Authorization: Bearer \\\${EDGE_TOKEN}" \\
  "\\\${EDGE_URL}/api/system/licenses"

# Configurer le smart remote repository sur l'Edge
curl -X PUT -H "Authorization: Bearer \\\${EDGE_TOKEN}" \\
  -H "Content-Type: application/json" \\
  "\\\${EDGE_URL}/api/repositories/libs-release-edge" \\
  -d '{
    "key": "libs-release-edge",
    "rclass": "remote",
    "packageType": "maven",
    "url": "https://hq.company.com/artifactory/libs-release-local",
    "username": "edge-reader",
    "password": "encrypted",
    "storeArtifactsLocally": true,
    "retrievalCachePeriodSecs": 600
  }'
\`\`\`

### Distribution globale avec JFrog Distribution

\`\`\`bash
# Créer des règles de distribution
curl -X POST -H "Authorization: Bearer \\\${TOKEN}" \\
  -H "Content-Type: application/json" \\
  "\\\${ARTIFACTORY_URL}/api/v1/distribution/distribute" \\
  -d '{
    "name": "app-v2.1.0",
    "version": "2.1.0",
    "dry_run": false,
    "distribution_rules": [
      {
        "site_name": "edge-*",
        "city_name": "*",
        "country_codes": ["FR", "DE", "US"]
      }
    ]
  }'

# Monitoring de la distribution
curl -H "Authorization: Bearer \\\${TOKEN}" \\
  "\\\${ARTIFACTORY_URL}/api/v1/release_bundle/app-v2.1.0/2.1.0/distribution"
\`\`\`

### Résolution de conflits

\`\`\`
Stratégies de résolution :
┌────────────────┬──────────────────────────────────────┐
│ Stratégie      │ Description                          │
├────────────────┼──────────────────────────────────────┤
│ Source wins    │ L'artefact source écrase la dest.   │
│ Target wins   │ L'artefact destination est conservé  │
│ Newest wins   │ Le plus récent (timestamp) gagne     │
│ Manual        │ Alerte pour résolution manuelle       │
└────────────────┴──────────────────────────────────────┘
\`\`\``,
    practiceContent: `### TP1 : Mise en place réplication Push

Configurez une réplication push entre deux instances Artifactory (utilisez Docker pour simuler). Publiez un artefact sur le site principal et vérifiez sa réplication automatique. Testez la réplication événementielle vs planifiée et mesurez les délais.

### TP2 : Dépôt fédéré multi-sites

Créez un dépôt fédéré entre deux instances. Publiez des artefacts sur chaque site et vérifiez la synchronisation bidirectionnelle. Simulez une panne réseau et observez le comportement de réconciliation au retour.

### TP3 : Edge node pour équipe distante

Déployez un Edge node et configurez le smart remote repository. Mesurez les temps de téléchargement avec et sans Edge (cache local). Configurez les politiques de pré-chargement pour les artefacts critiques.

### TP4 : Distribution globale de release

Créez un Release Bundle contenant votre application complète. Configurez des règles de distribution géographiques. Exécutez la distribution, vérifiez l'intégrité sur chaque Edge, et documentez la procédure de rollback global.`,
    keyPoints: JSON.stringify(['Topologies Hub-and-Spoke et Multi-Master selon les besoins', 'Réplication Push et Pull avec synchronisation planifiée ou événementielle', 'Dépôts fédérés pour réplication bidirectionnelle automatique', 'Edge Nodes comme cache de lecture proche des équipes', 'JFrog Distribution pour livraison globale coordonnée', 'Résolution de conflits configurable par stratégie', 'Release Bundles signés pour distribution sécurisée', 'Monitoring et alertes sur la santé de la réplication']),
  },


  {
    id: 'sq-06',
    courseId: 'sonarqube',
    title: 'SonarQube pour multi-langages',
    duration: '3h',
    orderIndex: 6,
    theoryContent: `## SonarQube pour multi-langages

### Introduction à l'analyse multi-langages

Les projets modernes utilisent souvent plusieurs langages simultanément. SonarQube supporte plus de 30 langages et permet d'analyser un projet polyglotte en une seule passe. La clé est de bien configurer les analyseurs et comprendre les spécificités de chaque langage.

### Langages supportés et analyseurs

\`\`\`
┌──────────────────────────────────────────────────────────┐
│           SUPPORT MULTI-LANGAGES SONARQUBE                │
│                                                            │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │
│  │  Java   │  │ Python  │  │  JS/TS  │  │  C/C++  │   │
│  │ 600+    │  │ 200+    │  │ 350+    │  │ 500+    │   │
│  │ règles  │  │ règles  │  │ règles  │  │ règles  │   │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘   │
│       │            │            │            │          │
│       └────────────┴────────────┴────────────┘          │
│                         │                                │
│              ┌──────────▼──────────┐                    │
│              │   SONARQUBE SERVER  │                    │
│              │   Quality Profiles  │                    │
│              │   Quality Gates     │                    │
│              └─────────────────────┘                    │
└──────────────────────────────────────────────────────────┘
\`\`\`

### Configuration Java avancée

\`\`\`properties
# sonar-project.properties pour Java
sonar.projectKey=mon-projet-java
sonar.sources=src/main/java
sonar.tests=src/test/java
sonar.java.source=17
sonar.java.target=17
sonar.java.binaries=target/classes
sonar.java.libraries=target/dependency/*.jar
sonar.java.test.binaries=target/test-classes

# Couverture JaCoCo
sonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml

# Exclusions spécifiques Java
sonar.exclusions=**/generated/**,**/dto/**
sonar.coverage.exclusions=**/config/**,**/Application.java
\`\`\`

### Configuration Python

\`\`\`properties
# Configuration Python
sonar.python.version=3.11
sonar.python.coverage.reportPaths=coverage.xml
sonar.python.xunit.reportPath=test-results.xml

# Pylint et Bandit integration
sonar.python.pylint.reportPaths=pylint-report.txt
sonar.python.bandit.reportPaths=bandit-report.json
\`\`\`

\`\`\`bash
# Génération des rapports pour SonarQube
pytest --cov=src --cov-report=xml:coverage.xml --junitxml=test-results.xml
pylint src/ --output-format=parseable > pylint-report.txt
bandit -r src/ -f json -o bandit-report.json
\`\`\`

### Configuration JavaScript/TypeScript

\`\`\`properties
# Configuration JS/TS
sonar.sources=src
sonar.tests=tests,__tests__
sonar.typescript.lcov.reportPaths=coverage/lcov.info
sonar.javascript.lcov.reportPaths=coverage/lcov.info

# ESLint report integration
sonar.eslint.reportPaths=eslint-report.json

# Exclusions frontend typiques
sonar.exclusions=**/node_modules/**,**/dist/**,**/build/**,**/*.spec.ts
sonar.test.inclusions=**/*.spec.ts,**/*.test.ts,**/__tests__/**
\`\`\`

\`\`\`bash
# Génération du rapport ESLint pour SonarQube
npx eslint src/ --format json -o eslint-report.json
npx jest --coverage --coverageReporters=lcov
\`\`\`

### Configuration C/C++

\`\`\`properties
# Configuration C/C++ (nécessite build-wrapper)
sonar.cfamily.build-wrapper-output=bw-output
sonar.cfamily.threads=4
sonar.cfamily.cache.enabled=true
sonar.cfamily.cache.path=.sonar-cache

# Couverture gcov/llvm-cov
sonar.cfamily.gcov.reportsPath=coverage-reports
sonar.cfamily.llvm-cov.reportPath=coverage.json
\`\`\`

\`\`\`bash
# Build avec le build-wrapper SonarQube
build-wrapper-linux-x86-64 --out-dir bw-output make clean all

# Génération couverture
gcov -b -c src/*.c
lcov --capture --directory . --output-file coverage.info
genhtml coverage.info --output-directory coverage-html
\`\`\`

### Profils de qualité personnalisés

\`\`\`bash
# Créer un profil personnalisé via API
curl -X POST -u admin:admin \\
  "http://sonarqube:9000/api/qualityprofiles/create" \\
  -d "language=java&name=Company-Java-Strict"

# Activer des règles spécifiques
curl -X POST -u admin:admin \\
  "http://sonarqube:9000/api/qualityprofiles/activate_rule" \\
  -d "key=Company-Java-Strict&rule=java:S1135" \\
  -d "severity=BLOCKER"

# Héritage de profils
curl -X POST -u admin:admin \\
  "http://sonarqube:9000/api/qualityprofiles/change_parent" \\
  -d "qualityProfile=Company-Java-Strict&parentQualityProfile=Sonar%20way&language=java"
\`\`\`

### Exclusions et inclusions par langage

\`\`\`properties
# Projet multi-langages complet
sonar.projectKey=full-stack-app
sonar.sources=backend/src,frontend/src,scripts
sonar.tests=backend/tests,frontend/__tests__

# Exclusions globales
sonar.exclusions=**/node_modules/**,**/vendor/**,**/generated/**

# Exclusions par langage
sonar.java.exclusions=**/dto/**,**/entity/**
sonar.python.exclusions=**/migrations/**
sonar.typescript.exclusions=**/*.stories.tsx

# Fichiers suffixes
sonar.java.file.suffixes=.java,.jav
sonar.python.file.suffixes=.py
sonar.typescript.file.suffixes=.ts,.tsx
\`\`\``,
    practiceContent: `### TP1 : Projet full-stack multi-langages

Créez un projet avec backend Java (Spring Boot), frontend TypeScript (React), et scripts Python. Configurez SonarQube pour analyser les trois langages en une seule passe avec des profils de qualité adaptés à chaque langage.

### TP2 : Profils de qualité personnalisés

Créez des profils personnalisés pour chaque langage avec des règles spécifiques à votre organisation. Configurez l'héritage depuis les profils Sonar way, ajoutez des règles de sécurité OWASP, et désactivez les règles non pertinentes avec justification.

### TP3 : Intégration rapports externes

Configurez l'import des rapports externes : JaCoCo pour Java, coverage.py pour Python, Istanbul/Jest pour TypeScript, gcov pour C++. Vérifiez que la couverture est correctement agrégée au niveau projet dans SonarQube.

### TP4 : Gestion des faux positifs multi-langages

Identifiez les faux positifs fréquents dans chaque langage. Documentez les méthodes de résolution : annotations @SuppressWarnings, commentaires // NOSONAR, exclusions de fichiers, et règles personnalisées. Créez un guide pour votre équipe.`,
    keyPoints: JSON.stringify(['Support de plus de 30 langages avec règles spécifiques', 'Configuration adaptée par langage dans sonar-project.properties', 'Profils de qualité personnalisés avec héritage', 'Import de rapports externes JaCoCo Jest coverage.py gcov', 'Exclusions granulaires par langage et par type de fichier', 'Build-wrapper obligatoire pour analyse C et C++', 'Analyse projet polyglotte en une seule passe', 'Règles de sécurité OWASP adaptées à chaque langage']),
  },


  {
    id: 'sq-07',
    courseId: 'sonarqube',
    title: 'Métriques et reporting',
    duration: '3h',
    orderIndex: 7,
    theoryContent: `## Métriques et Reporting SonarQube

### Introduction aux métriques de qualité

SonarQube collecte et agrège des dizaines de métriques sur la qualité du code. Comprendre ces métriques et savoir les exploiter dans des rapports est essentiel pour piloter l'amélioration continue de la qualité logicielle.

### Métriques principales

\`\`\`
┌─────────────────────────────────────────────────────────┐
│              TABLEAU DE BORD MÉTRIQUES                    │
│                                                           │
│  ┌────────────────┐  ┌────────────────┐                │
│  │ Fiabilité      │  │ Sécurité       │                │
│  │ Bugs: 23       │  │ Vulns: 5       │                │
│  │ Rating: B      │  │ Rating: C      │                │
│  │ Effort: 4h     │  │ Hotspots: 12   │                │
│  └────────────────┘  └────────────────┘                │
│                                                           │
│  ┌────────────────┐  ┌────────────────┐                │
│  │ Maintenabilité │  │ Couverture     │                │
│  │ Smells: 156    │  │ Global: 72%    │                │
│  │ Debt: 12j      │  │ New code: 85%  │                │
│  │ Rating: A      │  │ Tests: 342     │                │
│  └────────────────┘  └────────────────┘                │
│                                                           │
│  ┌────────────────┐  ┌────────────────┐                │
│  │ Duplications   │  │ Complexité     │                │
│  │ Blocs: 34      │  │ Cognitive: 234 │                │
│  │ Lignes: 2.1%   │  │ Cyclomatic: 89 │                │
│  │ Fichiers: 12   │  │ Max/fn: 15     │                │
│  └────────────────┘  └────────────────┘                │
└─────────────────────────────────────────────────────────┘
\`\`\`

### Portfolios (Enterprise Edition)

\`\`\`
Les Portfolios permettent d'agréger les métriques de plusieurs projets :

Organisation hiérarchique :
├── Portfolio Direction Technique
│   ├── Sous-portfolio Backend
│   │   ├── Service Auth (Java)
│   │   ├── Service API (Java)
│   │   └── Service Worker (Python)
│   ├── Sous-portfolio Frontend
│   │   ├── App Web (React/TS)
│   │   └── App Mobile (React Native)
│   └── Sous-portfolio Infrastructure
│       ├── Terraform configs
│       └── Ansible playbooks
\`\`\`

\`\`\`bash
# Créer un portfolio via API
curl -X POST -u admin:admin \\
  "http://sonarqube:9000/api/views/create" \\
  -d "key=direction-technique&name=Direction%20Technique&visibility=private"

# Ajouter des projets au portfolio
curl -X POST -u admin:admin \\
  "http://sonarqube:9000/api/views/add_project" \\
  -d "key=direction-technique&project=service-auth"

# Créer un sous-portfolio
curl -X POST -u admin:admin \\
  "http://sonarqube:9000/api/views/add_sub_view" \\
  -d "key=direction-technique&name=Backend&subKey=backend-portfolio"
\`\`\`

### Génération de rapports PDF

\`\`\`bash
# Plugin PDF Report (Community)
# Installation via marketplace ou manuellement
# Télécharger le rapport PDF d'un projet
curl -u admin:admin -o rapport.pdf \\
  "http://sonarqube:9000/api/governance/pdf?componentKey=mon-projet"

# Script de génération automatique hebdomadaire
#!/bin/bash
PROJECTS=$(curl -s -u admin:admin \\
  "http://sonarqube:9000/api/projects/search?ps=500" | jq -r '.components[].key')

for PROJECT in \\\${PROJECTS}; do
  curl -s -u admin:admin -o "reports/\\\${PROJECT}.pdf" \\
    "http://sonarqube:9000/api/governance/pdf?componentKey=\\\${PROJECT}"
done
\`\`\`

### Badges de qualité

\`\`\`markdown
# Intégration de badges dans README.md

## Badges SonarQube pour mon projet

![Quality Gate](https://sonarqube.company.com/api/project_badges/measure?project=mon-projet&metric=alert_status)
![Coverage](https://sonarqube.company.com/api/project_badges/measure?project=mon-projet&metric=coverage)
![Bugs](https://sonarqube.company.com/api/project_badges/measure?project=mon-projet&metric=bugs)
![Code Smells](https://sonarqube.company.com/api/project_badges/measure?project=mon-projet&metric=code_smells)
![Technical Debt](https://sonarqube.company.com/api/project_badges/measure?project=mon-projet&metric=sqale_index)
![Duplications](https://sonarqube.company.com/api/project_badges/measure?project=mon-projet&metric=duplicated_lines_density)
\`\`\`

\`\`\`bash
# Générer un token pour badges publics
curl -X POST -u admin:admin \\
  "http://sonarqube:9000/api/project_badges/token" \\
  -d "project=mon-projet"

# Badge avec token (projets privés)
# https://sonarqube.company.com/api/project_badges/measure?project=mon-projet&metric=coverage&token=TOKEN
\`\`\`

### Analyse de tendances

\`\`\`bash
# Historique des mesures via API
curl -u admin:admin \\
  "http://sonarqube:9000/api/measures/search_history?component=mon-projet&metrics=coverage,bugs,vulnerabilities,code_smells&ps=100"

# Métriques sur le nouveau code (période)
curl -u admin:admin \\
  "http://sonarqube:9000/api/measures/component?component=mon-projet&metricKeys=new_coverage,new_bugs,new_vulnerabilities,new_code_smells&additionalFields=periods"

# Export des métriques pour analyse externe
curl -s -u admin:admin \\
  "http://sonarqube:9000/api/measures/component_tree?component=mon-projet&metricKeys=ncloc,coverage,bugs&ps=500&strategy=leaves" | \\
  jq '.components[] | [.name, (.measures[] | .value)] | @csv' > metrics.csv
\`\`\`

### Webhooks et notifications

\`\`\`bash
# Configurer un webhook pour notifications
curl -X POST -u admin:admin \\
  "http://sonarqube:9000/api/webhooks/create" \\
  -d "name=Slack%20Notifications&url=https://hooks.slack.com/services/XXX&project=mon-projet"

# Format du payload webhook
{
  "analysedAt": "2024-01-15T10:30:00",
  "project": { "key": "mon-projet", "name": "Mon Projet" },
  "qualityGate": {
    "status": "ERROR",
    "conditions": [
      { "metric": "coverage", "operator": "LESS_THAN", "value": "65", "status": "ERROR", "errorThreshold": "80" }
    ]
  }
}
\`\`\``,
    practiceContent: `### TP1 : Dashboard métriques personnalisé

Créez un portfolio SonarQube regroupant 5 projets par équipe. Configurez des sous-portfolios par domaine technique. Analysez les tendances sur 3 mois et identifiez les projets nécessitant une attention prioritaire.

### TP2 : Rapports automatisés

Implémentez un script qui génère un rapport hebdomadaire au format HTML contenant : résumé Quality Gate par projet, top 10 des fichiers les plus problématiques, évolution de la dette technique, et nouveaux problèmes introduits. Envoyez-le par email aux tech leads.

### TP3 : Badges et visibilité

Configurez les badges SonarQube sur tous les README.md de vos projets. Créez un tableau de bord centralisé (page HTML ou Grafana) affichant l'état de tous les projets. Ajoutez des alertes quand un badge passe au rouge.

### TP4 : Analyse de tendances et prédiction

Exportez l'historique complet des métriques via l'API. Créez des graphiques d'évolution dans un outil de votre choix (Python matplotlib, Grafana). Identifiez les corrélations entre dette technique et nombre de bugs. Proposez des objectifs trimestriels basés sur les tendances.`,
    keyPoints: JSON.stringify(['Métriques de fiabilité sécurité maintenabilité et couverture', 'Portfolios pour vue agrégée multi-projets hiérarchique', 'Rapports PDF automatisés pour la direction', 'Badges intégrables dans README et documentation', 'Analyse de tendances via historique des mesures', 'Webhooks pour notifications Slack Teams email', 'Export CSV et JSON pour analyse externe', 'Quality Gate comme indicateur synthétique de santé']),
  },


  {
    id: 'sq-08',
    courseId: 'sonarqube',
    title: 'SonarQube Cloud et scaling',
    duration: '3h',
    orderIndex: 8,
    theoryContent: `## SonarQube Cloud et Scaling

### Introduction à SonarCloud

SonarCloud est la version SaaS de SonarQube, hébergée et maintenue par Sonar. Elle offre les mêmes capacités d'analyse avec l'avantage d'une infrastructure gérée, des intégrations natives avec GitHub, GitLab et Azure DevOps, et un modèle de tarification par lignes de code analysées.

### SonarCloud vs SonarQube

\`\`\`
┌───────────────────┬──────────────────┬──────────────────┐
│ Critère           │ SonarCloud       │ SonarQube        │
├───────────────────┼──────────────────┼──────────────────┤
│ Hébergement       │ SaaS (Sonar)     │ Self-hosted      │
│ Maintenance       │ Automatique      │ À votre charge   │
│ Intégration Git   │ Native           │ Plugin/Config    │
│ PR Decoration     │ Intégré          │ Configuration    │
│ Tarification      │ Par LOC          │ Par instance     │
│ Personnalisation  │ Limitée          │ Totale           │
│ Plugins custom    │ Non              │ Oui              │
│ Data residency    │ EU/US            │ Votre infra      │
│ Branches         │ Illimitées       │ Selon édition    │
└───────────────────┴──────────────────┴──────────────────┘
\`\`\`

### Configuration SonarCloud

\`\`\`yaml
# .github/workflows/sonarcloud.yml
name: SonarCloud Analysis
on:
  push:
    branches: [main, develop]
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  sonarcloud:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: \\\${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: \\\${{ secrets.SONAR_TOKEN }}
        with:
          args: >
            -Dsonar.organization=mon-org
            -Dsonar.projectKey=mon-org_mon-projet
\`\`\`

\`\`\`properties
# sonar-project.properties pour SonarCloud
sonar.organization=mon-org
sonar.projectKey=mon-org_mon-projet
sonar.sources=src
sonar.tests=tests
sonar.javascript.lcov.reportPaths=coverage/lcov.info
\`\`\`

### Scaling SonarQube - Architecture haute performance

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│            ARCHITECTURE SONARQUBE SCALÉE                      │
│                                                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  Analyser   │  │  Analyser   │  │  Analyser   │        │
│  │  (CI Job 1) │  │  (CI Job 2) │  │  (CI Job N) │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│         │                │                │                 │
│         └────────────────┼────────────────┘                 │
│                          ▼                                   │
│              ┌───────────────────────┐                      │
│              │    Load Balancer      │                      │
│              └───────────┬───────────┘                      │
│         ┌────────────────┼────────────────┐                 │
│         ▼                ▼                ▼                 │
│  ┌────────────┐   ┌────────────┐   ┌────────────┐         │
│  │ App Node 1 │   │ App Node 2 │   │ App Node 3 │         │
│  │ (Web+CE)   │   │ (Web+CE)   │   │ (CE only)  │         │
│  └─────┬──────┘   └─────┬──────┘   └─────┬──────┘         │
│        └─────────────────┼─────────────────┘                │
│                          ▼                                   │
│              ┌───────────────────────┐                      │
│              │   PostgreSQL HA       │                      │
│              │   (Primary+Replica)   │                      │
│              └───────────────────────┘                      │
│                          │                                   │
│              ┌───────────────────────┐                      │
│              │  Elasticsearch Cluster│                      │
│              │  (3 nodes minimum)    │                      │
│              └───────────────────────┘                      │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Configuration des Compute Engine Workers

\`\`\`properties
# sonar.properties - Configuration des workers
sonar.ce.workerCount=4

# Mémoire pour les workers CE
sonar.ce.javaOpts=-Xmx2g -Xms512m -XX:+HeapDumpOnOutOfMemoryError

# Mémoire pour le serveur web
sonar.web.javaOpts=-Xmx2g -Xms512m

# Elasticsearch
sonar.search.javaOpts=-Xmx2g -Xms2g
sonar.search.port=9001
\`\`\`

### Optimisation de la base de données

\`\`\`sql
-- PostgreSQL optimisations pour SonarQube
-- postgresql.conf
shared_buffers = 4GB
effective_cache_size = 12GB
work_mem = 256MB
maintenance_work_mem = 1GB
max_connections = 200
checkpoint_completion_target = 0.9
wal_buffers = 64MB
random_page_cost = 1.1

-- Vérifier les requêtes lentes
SELECT pid, now() - pg_stat_activity.query_start AS duration, query
FROM pg_stat_activity
WHERE state != 'idle' AND duration > interval '5 seconds'
ORDER BY duration DESC;

-- Maintenance régulière
VACUUM ANALYZE;
REINDEX DATABASE sonarqube;

-- Nettoyage de l'historique (garder 30 jours)
-- Via API SonarQube
-- sonar.dbcleaner.daysBeforeDeletingClosedIssues=30
-- sonar.dbcleaner.hoursBeforeKeepingOnlyOneSnapshotByDay=24
\`\`\`

### Monitoring de SonarQube

\`\`\`bash
# Health check
curl -s "http://sonarqube:9000/api/system/health" | jq '.'

# Statut du Compute Engine
curl -s -u admin:admin "http://sonarqube:9000/api/ce/activity_status" | jq '.'

# File d'attente des analyses
curl -s -u admin:admin "http://sonarqube:9000/api/ce/component?component=mon-projet" | jq '.'

# Métriques JMX pour Prometheus
# Activer dans sonar.properties:
# sonar.web.javaAdditionalOpts=-Dcom.sun.management.jmxremote
\`\`\`

### Migration vers SonarCloud

\`\`\`bash
# Export des profils de qualité
curl -u admin:admin \\
  "http://sonarqube:9000/api/qualityprofiles/backup?language=java&qualityProfile=Mon-Profil" \\
  -o java-profile.xml

# Import dans SonarCloud
curl -X POST -H "Authorization: Bearer \\\${SONARCLOUD_TOKEN}" \\
  "https://sonarcloud.io/api/qualityprofiles/restore" \\
  -F "backup=@java-profile.xml" \\
  -F "organization=mon-org"
\`\`\``,
    practiceContent: `### TP1 : Migration vers SonarCloud

Prenez un projet existant analysé par SonarQube self-hosted et migrez-le vers SonarCloud. Exportez les profils de qualité, configurez l'intégration GitHub Actions, et vérifiez que les résultats sont cohérents entre les deux plateformes.

### TP2 : Scaling des Compute Engine workers

Configurez un SonarQube avec 4 workers CE. Lancez 10 analyses simultanées et observez le comportement. Mesurez les temps de traitement, identifiez les goulots d'étranglement (CPU, mémoire, I/O database), et ajustez la configuration.

### TP3 : Optimisation PostgreSQL pour SonarQube

Configurez PostgreSQL avec les paramètres optimaux pour SonarQube. Comparez les performances avant/après sur une base avec 50 projets et 1 million de lignes analysées. Mettez en place la maintenance automatique (VACUUM, REINDEX).

### TP4 : Monitoring et alertes

Mettez en place un monitoring complet de SonarQube : health checks, taille de la file CE, temps d'analyse moyen, espace disque Elasticsearch. Configurez des alertes Prometheus/Grafana quand la file dépasse 10 tâches ou qu'une analyse prend plus de 30 minutes.`,
    keyPoints: JSON.stringify(['SonarCloud comme alternative SaaS avec intégrations Git natives', 'Scaling horizontal avec multiples Compute Engine workers', 'Architecture haute disponibilité avec load balancer', 'Optimisation PostgreSQL pour bases volumineuses', 'Monitoring santé via API system health et métriques JMX', 'Migration progressive self-hosted vers Cloud', 'Dimensionnement mémoire JVM par composant', 'Nettoyage et maintenance régulière de la base de données']),
  },


  {
    id: 'doors-06',
    courseId: 'doors',
    title: 'Workflows et processus',
    duration: '3h',
    orderIndex: 6,
    theoryContent: `## Workflows et processus dans IBM DOORS

### Introduction aux workflows de requirements

La gestion des exigences ne se limite pas à la rédaction. Elle implique des processus rigoureux de revue, validation, approbation et traçabilité des modifications. IBM DOORS fournit des mécanismes puissants pour implémenter ces workflows dans les projets réglementés.

### Cycle de vie d'une exigence

\`\`\`
┌─────────────────────────────────────────────────────────┐
│           CYCLE DE VIE D'UNE EXIGENCE                    │
│                                                           │
│  ┌────────┐    ┌──────────┐    ┌───────────┐           │
│  │ Draft  │───▶│ In Review│───▶│ Approved  │           │
│  └────┬───┘    └─────┬────┘    └─────┬─────┘           │
│       │              │               │                   │
│       │         ┌────▼────┐    ┌────▼──────┐           │
│       │         │Rejected │    │ Baselined │           │
│       │         └────┬────┘    └─────┬─────┘           │
│       │              │               │                   │
│       ◀──────────────┘         ┌────▼──────┐           │
│                                │ Change     │           │
│                                │ Request    │           │
│                                └─────┬─────┘           │
│                                      │                   │
│                                ┌────▼──────┐           │
│                                │ Modified  │           │
│                                └───────────┘           │
└─────────────────────────────────────────────────────────┘
\`\`\`

### Configuration des attributs de workflow

\`\`\`dxl
// DXL - Définition des attributs de workflow
// Créer l'attribut Status
AttrDef ad = create(mod, "Status", attrEnumeration)
add(ad, "Draft")
add(ad, "In Review")
add(ad, "Approved")
add(ad, "Rejected")
add(ad, "Baselined")
add(ad, "Change Requested")

// Créer l'attribut Reviewer
AttrDef adReviewer = create(mod, "Assigned Reviewer", attrString)

// Créer l'attribut Review Date
AttrDef adDate = create(mod, "Review Date", attrDate)

// Créer l'attribut Approval Authority
AttrDef adAuthority = create(mod, "Approval Authority", attrString)
\`\`\`

### Implémentation du workflow de revue

\`\`\`dxl
// DXL - Script de transition de workflow
void transitionToReview(Object obj) {
    string currentStatus = obj."Status"
    if (currentStatus != "Draft") {
        warn("Seuls les requirements en Draft peuvent passer en Review")
        return
    }
    
    // Vérifier que le reviewer est assigné
    string reviewer = obj."Assigned Reviewer"
    if (reviewer == "") {
        warn("Veuillez assigner un reviewer avant de soumettre")
        return
    }
    
    // Effectuer la transition
    obj."Status" = "In Review"
    obj."Review Date" = dateOf(today)
    
    // Notification
    sendNotification(reviewer, "Nouvelle exigence à revoir: " identifier(obj))
}

// Script d'approbation
void approveRequirement(Object obj) {
    string currentStatus = obj."Status"
    if (currentStatus != "In Review") {
        warn("Seuls les requirements In Review peuvent etre approuvés")
        return
    }
    
    string currentUser = getenv("DOORS_USER")
    string assignedReviewer = obj."Assigned Reviewer"
    
    if (currentUser != assignedReviewer) {
        warn("Seul le reviewer assigné peut approuver")
        return
    }
    
    obj."Status" = "Approved"
    obj."Approval Authority" = currentUser
    obj."Approval Date" = dateOf(today)
}
\`\`\`

### Change Requests (Demandes de modification)

\`\`\`dxl
// DXL - Gestion des Change Requests
Module crModule = read("/project/Change_Requests", true)

// Créer une CR liée à une exigence
void createChangeRequest(Object reqObj, string reason, string impact) {
    Module crMod = edit("/project/Change_Requests", true)
    Object crObj = create(crMod)
    
    crObj."CR Title" = "Modification de " identifier(reqObj)
    crObj."Reason" = reason
    crObj."Impact Analysis" = impact
    crObj."Status" = "Submitted"
    crObj."Requested By" = getenv("DOORS_USER")
    crObj."Request Date" = dateOf(today)
    crObj."Priority" = "Medium"
    
    // Créer le lien vers l'exigence impactée
    link(crObj -> reqObj, "impacts")
    
    save(crMod)
    close(crMod)
}

// Analyser l'impact d'une CR
void analyzeImpact(Object crObj) {
    // Trouver toutes les exigences liées
    Link lnk
    Object targetObj
    int impactCount = 0
    
    for lnk in crObj -> "*" do {
        targetObj = target(lnk)
        // Vérifier les liens descendants
        Link childLink
        for childLink in targetObj -> "*" do {
            impactCount++
        }
    }
    
    crObj."Impact Count" = impactCount ""
    crObj."Impact Assessment" = "Completed"
}
\`\`\`

### Notifications et alertes

\`\`\`dxl
// DXL - Système de notifications
void sendNotification(string recipient, string message) {
    // Via email DOORS
    string subject = "[DOORS] Action requise"
    string body = message "\\n\\nConnectez-vous a DOORS pour traiter cette demande."
    
    // Utilisation de l'API email DOORS
    sendMail(recipient, subject, body)
}

// Trigger automatique sur changement de statut
void onStatusChange(Object obj, string oldValue, string newValue) {
    if (newValue == "In Review") {
        string reviewer = obj."Assigned Reviewer"
        sendNotification(reviewer, 
            "Exigence " identifier(obj) " soumise pour revue.\\n" \\
            "Titre: " obj."Object Heading" "")
    }
    
    if (newValue == "Rejected") {
        string author = obj."Created By"
        sendNotification(author,
            "Exigence " identifier(obj) " rejetee.\\n" \\
            "Commentaire: " obj."Review Comment" "")
    }
    
    if (newValue == "Approved") {
        // Notifier le PM
        sendNotification("pm@company.com",
            "Exigence " identifier(obj) " approuvee et prete pour baseline.")
    }
}
\`\`\`

### Baselines et historique

\`\`\`dxl
// DXL - Création de baseline après approbation complète
void createBaselineIfReady(Module mod) {
    Object obj
    bool allApproved = true
    
    for obj in mod do {
        if (obj."Status" != "Approved" and obj."Status" != "Baselined") {
            allApproved = false
            break
        }
    }
    
    if (allApproved) {
        string blName = "BL_" dateOf(today) "_approved"
        Baseline bl = create(mod, blName)
        
        // Marquer tous les objets comme baselined
        for obj in mod do {
            obj."Status" = "Baselined"
            obj."Baseline Reference" = blName
        }
        
        print "Baseline " blName " creee avec succes"
    } else {
        warn("Toutes les exigences ne sont pas encore approuvees")
    }
}
\`\`\``,
    practiceContent: `### TP1 : Implémentation d'un workflow complet

Créez un module DOORS avec le cycle de vie complet : Draft, In Review, Approved, Rejected, Baselined. Implémentez les scripts DXL de transition avec vérifications de permissions. Testez chaque transition et documentez les cas d'erreur.

### TP2 : Système de Change Requests

Développez un module de Change Requests lié au module d'exigences. Implémentez la création automatique de CR, l'analyse d'impact (combien d'exigences filles et de tests affectés), et le workflow d'approbation de la CR avant modification.

### TP3 : Notifications et reporting de workflow

Configurez les notifications automatiques à chaque transition de workflow. Créez un tableau de bord DXL montrant : exigences par statut, temps moyen en revue, taux de rejet, et CR en attente. Exportez ces métriques hebdomadairement.

### TP4 : Audit trail et conformité

Implémentez un système d'audit complet : qui a modifié quoi, quand, et pourquoi. Créez un rapport de conformité montrant que toutes les exigences ont suivi le workflow complet avant baseline. Simulez un audit réglementaire.`,
    keyPoints: JSON.stringify(['Cycle de vie complet Draft Review Approved Baselined', 'Scripts DXL pour transitions avec vérification de permissions', 'Change Requests liées aux exigences avec analyse impact', 'Notifications automatiques par email à chaque transition', 'Baselines créées uniquement quand tout est approuvé', 'Audit trail complet pour conformité réglementaire', 'Rôles et permissions par phase du workflow', 'Métriques de processus temps en revue et taux rejet']),
  },


  {
    id: 'doors-07',
    courseId: 'doors',
    title: 'DOORS Next Generation (DNG)',
    duration: '3h',
    orderIndex: 7,
    theoryContent: `## DOORS Next Generation (DNG)

### Introduction à DOORS Next Generation

DOORS Next Generation (DNG) est la version web moderne de la plateforme de gestion des exigences IBM. Basée sur l'architecture Jazz et les standards OSLC (Open Services for Lifecycle Collaboration), DNG offre une expérience collaborative en temps réel avec des capacités de traçabilité avancées.

### Architecture DNG et Jazz Platform

\`\`\`
┌─────────────────────────────────────────────────────────┐
│              JAZZ PLATFORM ARCHITECTURE                   │
│                                                           │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐    │
│  │    DNG      │  │     RTC      │  │    RQM     │    │
│  │ Requirements│  │ Change Mgmt  │  │   Quality  │    │
│  └──────┬──────┘  └──────┬───────┘  └─────┬──────┘    │
│         │                │               │              │
│         └────────────────┼───────────────┘              │
│                          │ OSLC                          │
│              ┌───────────▼───────────┐                  │
│              │   Jazz Team Server    │                  │
│              │   (JTS)               │                  │
│              ├───────────────────────┤                  │
│              │   - Authentication    │                  │
│              │   - User Management   │                  │
│              │   - Project Areas     │                  │
│              │   - Process Config    │                  │
│              └───────────┬───────────┘                  │
│                          │                              │
│              ┌───────────▼───────────┐                  │
│              │      Database         │                  │
│              │   (DB2 / Oracle)      │                  │
│              └───────────────────────┘                  │
└─────────────────────────────────────────────────────────┘
\`\`\`

### Client web et modules

\`\`\`
Fonctionnalités du client web DNG :
- Édition collaborative en temps réel
- Rich text avec images et tableaux
- Vues personnalisables (colonnes, filtres, groupes)
- Diagrammes intégrés (Use Case, Activity)
- Commentaires et discussions en contexte
- Historique complet avec comparaison de versions
- Tags et catégorisation
- Recherche plein texte avancée
\`\`\`

### Gestion des liens OSLC

\`\`\`
Types de liens OSLC dans DNG :
┌────────────────────────┬────────────────────────────────┐
│ Type de lien           │ Usage                          │
├────────────────────────┼────────────────────────────────┤
│ Satisfies/SatisfiedBy  │ Exigence satisfaite par design │
│ Validates/ValidatedBy  │ Test qui valide une exigence   │
│ Tracks/TrackedBy       │ Work item qui implémente       │
│ Implements/ImplementedBy│ Code qui implémente           │
│ AffectedBy             │ Impacté par un changement      │
│ Decomposes/DecomposedBy│ Décomposition hiérarchique     │
│ Constrains/ConstrainedBy│ Contrainte entre exigences    │
│ Refines/RefinedBy      │ Raffinement d'une exigence     │
└────────────────────────┴────────────────────────────────┘
\`\`\`

\`\`\`bash
# Requête OSLC pour obtenir les exigences
curl -H "Accept: application/rdf+xml" \\
  -H "OSLC-Core-Version: 2.0" \\
  "https://jazz.company.com/rm/views?oslc.where=dcterms:title=\\"Exigence%20securite\\"" \\
  --user admin:password

# Créer un lien OSLC entre exigence et test
curl -X POST \\
  -H "Content-Type: application/rdf+xml" \\
  -H "OSLC-Core-Version: 2.0" \\
  "https://jazz.company.com/rm/links" \\
  -d '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
       xmlns:oslc_rm="http://open-services.net/ns/rm#">
    <oslc_rm:Requirement rdf:about="https://jazz/rm/resources/req123">
      <oslc_rm:validatedBy rdf:resource="https://jazz/qm/testcase/456"/>
    </oslc_rm:Requirement>
  </rdf:RDF>'
\`\`\`

### Migration depuis DOORS Classic

\`\`\`
Plan de migration DOORS Classic vers DNG :

Phase 1 : Préparation (2-4 semaines)
├── Inventaire des modules DOORS Classic
├── Analyse des scripts DXL à migrer
├── Identification des intégrations externes
├── Formation des administrateurs DNG
└── Configuration Jazz Team Server

Phase 2 : Migration pilote (2-3 semaines)
├── Sélection d'un projet non critique
├── Export REQIF depuis DOORS Classic
├── Import dans DNG
├── Vérification des données et liens
└── Tests utilisateurs

Phase 3 : Migration massive (4-8 semaines)
├── Migration par lots planifiés
├── Vérification automatisée post-migration
├── Migration des baselines historiques
├── Mise à jour des processus
└── Dual-run pendant la transition

Phase 4 : Décommissionnement (2-4 semaines)
├── Vérification finale de complétude
├── Archivage DOORS Classic (lecture seule)
├── Transfert des utilisateurs
└── Documentation finale
\`\`\`

\`\`\`bash
# Export ReqIF depuis DOORS Classic
# Dans DOORS: File > Export > ReqIF
# Ou via DXL:
# exportReqIF(mod, "/export/module.reqif", options)

# Import ReqIF dans DNG via API
curl -X POST \\
  -H "Content-Type: multipart/form-data" \\
  "https://jazz.company.com/rm/reqif/import" \\
  -F "file=@module.reqif" \\
  -F "projectArea=MonProjet" \\
  --user admin:password
\`\`\`

### Modules et structure dans DNG

\`\`\`
Organisation DNG :
├── Project Area : Projet Avionique
│   ├── Component : Système de Navigation
│   │   ├── Module : Exigences Système
│   │   ├── Module : Exigences Logiciel
│   │   └── Collection : Revue Sprint 12
│   ├── Component : Système Communication
│   │   ├── Module : Exigences Radio
│   │   └── Module : Spécifications Interface
│   └── Stream : Version 2.0
│       ├── Baseline : BL_2.0_RC1
│       └── Change Set : CS_fix_req_234
\`\`\`

### Configuration Management dans DNG

\`\`\`bash
# DNG supporte le versioning via configurations
# Global Configuration permet de lier les versions entre outils

# Créer un stream
curl -X POST \\
  -H "Content-Type: application/json" \\
  "https://jazz.company.com/gc/configuration" \\
  -d '{
    "type": "stream",
    "name": "Version 3.0 Development",
    "description": "Stream de developpement v3",
    "baselineOf": "baseline_v2_final"
  }' \\
  --user admin:password

# Créer une baseline
curl -X POST \\
  -H "Content-Type: application/json" \\
  "https://jazz.company.com/gc/baseline" \\
  -d '{
    "name": "BL_v3_RC1",
    "stream": "stream_v3_dev",
    "description": "Release Candidate 1"
  }' \\
  --user admin:password
\`\`\``,
    practiceContent: `### TP1 : Découverte du client web DNG

Créez un projet dans DNG avec 3 composants et 5 modules. Utilisez les fonctionnalités collaboratives : édition simultanée, commentaires, tags. Créez des vues personnalisées avec filtres et comparez avec l'expérience DOORS Classic.

### TP2 : Liens OSLC et traçabilité cross-outils

Configurez les liens OSLC entre DNG (exigences), RTC (work items) et RQM (cas de test). Créez une matrice de traçabilité complète montrant la couverture des exigences par les tests et l'implémentation.

### TP3 : Migration pilote ReqIF

Exportez un module de 100 exigences depuis DOORS Classic au format ReqIF. Importez-le dans DNG et vérifiez : contenu texte, attributs, liens internes, et structure hiérarchique. Documentez les écarts et ajustements nécessaires.

### TP4 : Configuration Management

Créez un stream de développement à partir d'une baseline. Effectuez des modifications dans un change set, puis livrez-les. Créez une nouvelle baseline et comparez-la avec la précédente. Pratiquez le merge de change sets conflictuels.`,
    keyPoints: JSON.stringify(['DNG basé sur Jazz Platform et standards OSLC', 'Client web avec édition collaborative en temps réel', 'Liens OSLC pour traçabilité cross-outils RTC RQM', 'Migration depuis Classic via export ReqIF', 'Configuration Management avec streams et baselines', 'Modules collections et composants pour organisation', 'Change Sets pour isolation des modifications', 'Global Configuration pour cohérence multi-outils']),
  },


  {
    id: 'doors-08',
    courseId: 'doors',
    title: 'Certification et normes',
    duration: '3h',
    orderIndex: 8,
    theoryContent: `## Certification et normes avec IBM DOORS

### Introduction à la conformité réglementaire

Dans les industries critiques (aéronautique, automobile, médical, ferroviaire), la gestion des exigences doit respecter des normes strictes. IBM DOORS est le standard de facto pour démontrer la conformité grâce à sa traçabilité complète et ses capacités d'audit.

### Normes principales et leur application

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│              NORMES ET INDUSTRIES                              │
│                                                               │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ DO-178C    │  │ ISO 26262  │  │ IEC 62304  │            │
│  │ Aéronautique│  │ Automobile │  │ Médical    │            │
│  │ Niveaux A-E│  │ ASIL A-D   │  │ Classes A-C│            │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘            │
│        │               │               │                     │
│  ┌─────▼──────┐  ┌─────▼──────┐  ┌─────▼──────┐           │
│  │ EN 50128   │  │ IEC 61508  │  │ CENELEC    │           │
│  │ Ferroviaire│  │ Industriel │  │ EN 50129   │           │
│  │ SIL 0-4   │  │ SIL 1-4   │  │ Railway    │           │
│  └────────────┘  └────────────┘  └────────────┘           │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### DO-178C - Logiciel aéronautique

\`\`\`
Niveaux DAL (Design Assurance Level) :
┌───────┬────────────────────────────────────────────────────┐
│ Level │ Description et exigences DOORS                     │
├───────┼────────────────────────────────────────────────────┤
│ A     │ Catastrophique - Traçabilité bidirectionnelle      │
│       │ complète, revue indépendante, 100% couverture     │
│ B     │ Dangereux - Même que A avec relaxation mineure    │
│ C     │ Majeur - Traçabilité et couverture structurelle   │
│ D     │ Mineur - Traçabilité basique requise              │
│ E     │ Sans effet - Pas d'exigence spécifique            │
└───────┴────────────────────────────────────────────────────┘

Objectifs DO-178C dans DOORS :
- Traçabilité System Req → HLR → LLR → Code → Tests
- Couverture bidirectionnelle vérifiable
- Baselines pour chaque phase de certification
- Analyse d'impact sur toute modification
- Evidence de revue et approbation
\`\`\`

\`\`\`dxl
// DXL - Vérification conformité DO-178C
void checkDO178Compliance(Module mod) {
    Object obj
    int totalReqs = 0
    int withTraceDown = 0
    int withTraceUp = 0
    int withReview = 0
    
    for obj in mod do {
        if (obj."Object Type" == "Requirement") {
            totalReqs++
            
            // Vérifier trace descendante (vers LLR ou code)
            Link lnk
            bool hasDown = false
            for lnk in obj -> "*" do {
                hasDown = true
                break
            }
            if (hasDown) withTraceDown++
            
            // Vérifier trace ascendante (depuis SysReq)
            bool hasUp = false
            for lnk in obj <- "*" do {
                hasUp = true
                break
            }
            if (hasUp) withTraceUp++
            
            // Vérifier statut de revue
            if (obj."Review Status" == "Approved") {
                withReview++
            }
        }
    }
    
    print "=== Rapport Conformité DO-178C ===\\n"
    print "Total exigences: " totalReqs "\\n"
    print "Trace descendante: " withTraceDown "/" totalReqs 
          " (" (withTraceDown * 100 / totalReqs) "%)\\n"
    print "Trace ascendante: " withTraceUp "/" totalReqs 
          " (" (withTraceUp * 100 / totalReqs) "%)\\n"
    print "Revues complètes: " withReview "/" totalReqs 
          " (" (withReview * 100 / totalReqs) "%)\\n"
    
    if (withTraceDown < totalReqs || withTraceUp < totalReqs) {
        print "\\n*** ATTENTION: Traçabilité incomplète ***\\n"
    }
}
\`\`\`

### ISO 26262 - Automobile

\`\`\`
ASIL (Automotive Safety Integrity Level) :
┌──────┬────────────────────────────────────────┐
│ ASIL │ Méthodes requises dans DOORS           │
├──────┼────────────────────────────────────────┤
│ D    │ Inspection formelle, traçabilité       │
│      │ bidirectionnelle, analyse impact,      │
│      │ revue indépendante                     │
│ C    │ Semi-formal verification, walk-through │
│ B    │ Walk-through, traçabilité basique      │
│ A    │ Vérification informelle                │
│ QM   │ Quality Management standard            │
└──────┴────────────────────────────────────────┘
\`\`\`

\`\`\`dxl
// DXL - Structure ISO 26262 dans DOORS
// Attributs requis par ISO 26262
AttrDef asilLevel = create(mod, "ASIL Level", attrEnumeration)
add(asilLevel, "QM")
add(asilLevel, "ASIL A")
add(asilLevel, "ASIL B")
add(asilLevel, "ASIL C")
add(asilLevel, "ASIL D")

AttrDef safetyRelevant = create(mod, "Safety Relevant", attrBoolean)
AttrDef verificationMethod = create(mod, "Verification Method", attrEnumeration)
add(verificationMethod, "Inspection")
add(verificationMethod, "Analysis")
add(verificationMethod, "Test")
add(verificationMethod, "Review")
\`\`\`

### IEC 62304 - Logiciel médical

\`\`\`
Classes de sécurité logicielle :
┌─────────┬─────────────────────────────────────────────┐
│ Classe  │ Exigences documentaires DOORS               │
├─────────┼─────────────────────────────────────────────┤
│ C       │ Mort ou blessure grave possible             │
│         │ Documentation complète exigée               │
│         │ Traçabilité SW Req → Architecture → Tests  │
│ B       │ Blessure non grave possible                 │
│         │ Documentation détaillée                     │
│ A       │ Pas de risque blessure                      │
│         │ Documentation basique suffisante            │
└─────────┴─────────────────────────────────────────────┘
\`\`\`

### Génération de preuves de conformité (Compliance Evidence)

\`\`\`dxl
// DXL - Génération rapport de conformité
void generateComplianceReport(Module mod, string standard) {
    Stream outFile = write("/reports/compliance_" standard ".html")
    
    outFile << "<html><head><title>Rapport Conformité " standard "</title></head>"
    outFile << "<body><h1>Rapport de Conformité " standard "</h1>"
    outFile << "<h2>Module: " name(mod) "</h2>"
    outFile << "<p>Date: " dateOf(today) "</p>"
    
    // Matrice de traçabilité
    outFile << "<h3>Matrice de Traçabilité</h3>"
    outFile << "<table border='1'>"
    outFile << "<tr><th>ID</th><th>Titre</th><th>Trace Up</th><th>Trace Down</th><th>Status</th></tr>"
    
    Object obj
    for obj in mod do {
        if (obj."Object Type" == "Requirement") {
            outFile << "<tr>"
            outFile << "<td>" identifier(obj) "</td>"
            outFile << "<td>" obj."Object Heading" "</td>"
            
            // Compter liens montants
            int upCount = 0
            Link lnk
            for lnk in obj <- "*" do { upCount++ }
            outFile << "<td>" upCount "</td>"
            
            // Compter liens descendants
            int downCount = 0
            for lnk in obj -> "*" do { downCount++ }
            outFile << "<td>" downCount "</td>"
            
            outFile << "<td>" obj."Status" "</td>"
            outFile << "</tr>"
        }
    }
    
    outFile << "</table>"
    outFile << "<h3>Résumé</h3>"
    outFile << "<p>Couverture traçabilité: calcul automatique</p>"
    outFile << "</body></html>"
    
    close(outFile)
}
\`\`\`

### Audit et revue réglementaire

\`\`\`
Checklist audit DOORS pour certification :
□ Toutes les exigences ont un identifiant unique stable
□ Traçabilité bidirectionnelle complète et vérifiable
□ Baselines créées à chaque phase du projet
□ Historique complet des modifications accessible
□ Revues documentées avec signatures électroniques
□ Analyse d'impact réalisée pour chaque changement
□ Aucune exigence orpheline (sans lien montant/descendant)
□ Attributs de conformité remplis pour chaque exigence
□ Rapports de couverture tests/exigences disponibles
□ Processus de Change Request tracé et approuvé
\`\`\``,
    practiceContent: `### TP1 : Structure DO-178C dans DOORS

Créez la structure complète d'un projet aéronautique DAL B : System Requirements, High-Level Requirements, Low-Level Requirements, Test Cases. Implémentez la traçabilité bidirectionnelle et vérifiez la couverture à 100%.

### TP2 : Rapport de conformité ISO 26262

Développez un script DXL qui vérifie automatiquement la conformité ISO 26262 ASIL D : attributs obligatoires remplis, traçabilité complète, méthode de vérification assignée, revues documentées. Générez un rapport HTML/PDF pour l'auditeur.

### TP3 : Simulation d'audit réglementaire

Préparez un module pour un audit de certification. Créez les baselines requises, les rapports de traçabilité, les preuves de revue. Jouez le rôle de l'auditeur : vérifiez chaque point de la checklist et documentez les non-conformités trouvées.

### TP4 : Gap analysis multi-normes

Comparez les exigences documentaires de DO-178C, ISO 26262 et IEC 62304. Identifiez les attributs communs et spécifiques à chaque norme. Créez un template DOORS réutilisable qui satisfait les trois normes simultanément pour un projet multi-domaine.`,
    keyPoints: JSON.stringify(['DO-178C pour aéronautique avec niveaux DAL A à E', 'ISO 26262 pour automobile avec niveaux ASIL A à D', 'IEC 62304 pour dispositifs médicaux classes A à C', 'Traçabilité bidirectionnelle obligatoire pour certification', 'Scripts DXL pour vérification automatique de conformité', 'Génération de preuves compliance pour auditeurs', 'Baselines à chaque phase pour historique réglementaire', 'Analyse impact obligatoire avant toute modification']),
  },


  {
    id: 'cc-06',
    courseId: 'clearcase',
    title: 'ClearCase MultiSite',
    duration: '3h',
    orderIndex: 6,
    theoryContent: `## ClearCase MultiSite

### Introduction à ClearCase MultiSite

ClearCase MultiSite permet de distribuer des VOBs (Versioned Object Bases) sur plusieurs sites géographiques tout en maintenant la cohérence des données. Chaque site possède une réplique du VOB et les modifications sont synchronisées via un mécanisme de mastership.

### Architecture MultiSite

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│            CLEARCASE MULTISITE ARCHITECTURE                    │
│                                                               │
│  Site Paris (Master)          Site New York (Replica)         │
│  ┌──────────────────┐        ┌──────────────────┐           │
│  │   VOB Replica    │        │   VOB Replica    │           │
│  │   /vobs/projet   │◄──────▶│   /vobs/projet   │           │
│  │                  │  Sync  │                  │           │
│  │  Branch: main   │  Pkt   │  Branch: main   │           │
│  │  Branch: dev_eu │        │  Branch: dev_us │           │
│  │  (master: Paris)│        │  (master: NY)   │           │
│  └────────┬─────────┘        └────────┬─────────┘           │
│           │                           │                      │
│  ┌────────▼─────────┐        ┌───────▼──────────┐          │
│  │  Shipping Server │        │  Shipping Server │          │
│  │  (multitool)     │        │  (multitool)     │          │
│  └──────────────────┘        └──────────────────┘          │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Concepts fondamentaux

\`\`\`
Mastership (propriété) :
- Chaque élément a un master unique (un site)
- Seul le master peut modifier l'élément
- Le mastership peut être transféré entre sites
- Les branches peuvent avoir des masters différents

Types de répliques :
┌──────────────┬────────────────────────────────────┐
│ Type         │ Description                        │
├──────────────┼────────────────────────────────────┤
│ Full         │ Copie complète du VOB              │
│ Partial      │ Sous-ensemble sélectionné          │
│ Read-only    │ Lecture seule, pas de mastership   │
└──────────────┴────────────────────────────────────┘
\`\`\`

### Configuration des répliques

\`\`\`bash
# Créer une réplique d'un VOB existant
multitool mkreplica -export -workdir /tmp/export \\
  -tag /vobs/projet@paris_replica \\
  replica:newyork@/vobs/projet

# Exporter les modifications (création de paquets sync)
multitool syncreplica -export -workdir /tmp/export \\
  -fship replica:newyork@/vobs/projet

# Importer les paquets de synchronisation
multitool syncreplica -import -workdir /tmp/import \\
  -receive /packets/incoming

# Vérifier l'état des répliques
multitool lsreplica -long /vobs/projet

# Voir l'historique de synchronisation
multitool lsepoch replica:newyork@/vobs/projet
\`\`\`

### Gestion du mastership

\`\`\`bash
# Voir le master actuel d'un élément
cleartool describe -fmt "%[master]p" brtype:dev_feature@/vobs/projet

# Demander le transfert de mastership
multitool reqmaster -comment "Besoin de modifier la branche" \\
  brtype:dev_feature@/vobs/projet

# Transférer le mastership (côté master actuel)
multitool chmaster -comment "Transfert vers NY" \\
  replica:newyork@/vobs/projet \\
  brtype:dev_feature@/vobs/projet

# Transfert en masse (toutes les branches d'un développeur)
multitool chmaster -all -comment "Relocalisation equipe" \\
  replica:newyork@/vobs/projet \\
  brtype:usr_john_*@/vobs/projet
\`\`\`

### Synchronisation et planification

\`\`\`bash
# Script de synchronisation automatique (cron)
#!/bin/bash
VOBS="/vobs/projet /vobs/lib_common /vobs/tools"
REMOTE_REPLICA="newyork"
WORKDIR="/var/clearcase/sync"
LOG="/var/log/clearcase/sync.log"

echo "$(date) - Début synchronisation" >> \\\${LOG}

for VOB in \\\${VOBS}; do
    echo "Export \\\${VOB} vers \\\${REMOTE_REPLICA}" >> \\\${LOG}
    multitool syncreplica -export \\
        -workdir \\\${WORKDIR} \\
        -fship replica:\\\${REMOTE_REPLICA}@\\\${VOB} 2>> \\\${LOG}
done

# Importer les paquets reçus
for PACKET in \\\${WORKDIR}/incoming/*.pkt; do
    if [ -f "\\\${PACKET}" ]; then
        echo "Import \\\${PACKET}" >> \\\${LOG}
        multitool syncreplica -import \\
            -workdir \\\${WORKDIR} \\
            -receive "\\\${PACKET}" 2>> \\\${LOG}
        rm "\\\${PACKET}"
    fi
done

echo "$(date) - Fin synchronisation" >> \\\${LOG}
\`\`\`

### Résolution de conflits

\`\`\`bash
# Lister les conflits de mastership
multitool lsmaster -conflict /vobs/projet

# Résoudre un conflit de type "evil twin"
# (même nom créé sur deux sites indépendamment)
cleartool merge -to /vobs/projet/src/file.c@@/main/dev_paris/LATEST \\
  /vobs/projet/src/file.c@@/main/dev_ny/LATEST

# Résoudre un conflit de réservation
cleartool unreserve /vobs/projet/src/conflict.c

# Forcer la résolution (à utiliser avec précaution)
multitool resyncmaster -override \\
  /vobs/projet/src/problematic_file.c
\`\`\`

### Monitoring et maintenance

\`\`\`bash
# Vérifier la santé des répliques
multitool lsreplica -long /vobs/projet | grep -E "epoch|last sync"

# Rapport de synchronisation
multitool syncreport -detailed /vobs/projet

# Vérifier la connectivité entre sites
multitool ping replica:newyork@/vobs/projet

# Nettoyage des paquets obsolètes
find /var/clearcase/sync -name "*.pkt" -mtime +7 -delete
\`\`\``,
    practiceContent: `### TP1 : Configuration MultiSite basique

Créez un VOB et configurez une réplique sur un second serveur ClearCase. Effectuez des modifications sur chaque site et synchronisez. Vérifiez que les modifications sont correctement propagées dans les deux sens.

### TP2 : Gestion du mastership

Simulez un scénario multi-équipes : l'équipe Paris est master de la branche dev_eu, New York est master de dev_us. Transférez le mastership d'une branche entre sites. Documentez la procédure et les cas où le transfert est bloqué.

### TP3 : Résolution de conflits MultiSite

Provoquez intentionnellement un conflit evil twin (même fichier créé sur deux sites). Résolvez le conflit en utilisant les outils multitool. Documentez la procédure et créez un guide de résolution pour votre équipe.

### TP4 : Automatisation de la synchronisation

Implémentez un script de synchronisation planifié avec : scheduling différencié (toutes les 15min pour le VOB principal, toutes les 2h pour les autres), monitoring des échecs, alertes email en cas de désynchronisation supérieure à 4h, et rapport quotidien de santé.`,
    keyPoints: JSON.stringify(['Répliques distribuées avec mastership par élément', 'Synchronisation par paquets exportés et importés', 'Transfert de mastership entre sites pour modifications', 'Evil twins comme conflit typique multi-site', 'Scripts cron pour synchronisation automatique planifiée', 'Monitoring santé avec lsreplica et syncreport', 'Résolution conflits avec merge et resyncmaster', 'Planification synchronisation adaptée au fuseau horaire']),
  },


  {
    id: 'cc-07',
    courseId: 'clearcase',
    title: 'Automatisation ClearCase',
    duration: '3h',
    orderIndex: 7,
    theoryContent: `## Automatisation ClearCase

### Introduction à l'automatisation cleartool

L'automatisation ClearCase repose principalement sur cleartool, l'interface en ligne de commande qui expose toutes les fonctionnalités. Combiné avec des scripts shell, Perl ou Python, cleartool permet d'industrialiser les opérations de gestion de configuration les plus complexes.

### Scripting cleartool avancé

\`\`\`bash
# Format de sortie personnalisé avec -fmt
cleartool lshistory -fmt "%d | %u | %En | %o | %Nc\\n" \\
  -since yesterday /vobs/projet/src/...

# Variables de format utiles :
# %d  = date
# %u  = utilisateur  
# %En = nom élément
# %o  = opération (checkin, checkout, mkelem...)
# %Nc = commentaire (sans newline)
# %Vn = version
# %Bn = branche

# Lister tous les checkouts de l'équipe
cleartool lscheckout -avobs -fmt "%u\\t%En\\t%d\\n" | sort

# Trouver les fichiers modifiés entre deux labels
cleartool find /vobs/projet -version "lbtype(REL_2.0) && !lbtype(REL_1.0)" \\
  -print

# Comparer deux configurations (config specs)
cleartool catcs -tag view_v1 > /tmp/cs_v1.txt
cleartool catcs -tag view_v2 > /tmp/cs_v2.txt
diff /tmp/cs_v1.txt /tmp/cs_v2.txt
\`\`\`

### Triggers avancés

\`\`\`bash
# Créer un trigger pre-checkin pour vérifier les commentaires
cleartool mktrtype -element -all -preop checkin \\
  -exec "/opt/triggers/check_comment.sh" \\
  -comment "Vérifie que le commentaire est non vide et conforme" \\
  VERIFY_COMMENT@/vobs/projet

# Script du trigger check_comment.sh
#!/bin/bash
COMMENT="\\\${CLEARCASE_COMMENT}"
if [ -z "\\\${COMMENT}" ]; then
    echo "ERREUR: Un commentaire est obligatoire pour le checkin"
    exit 1
fi

# Vérifier format du commentaire (JIRA-XXX: description)
if ! echo "\\\${COMMENT}" | grep -qE "^[A-Z]+-[0-9]+:"; then
    echo "ERREUR: Le commentaire doit commencer par un ticket JIRA (ex: PROJ-123: description)"
    exit 1
fi

exit 0

# Trigger post-checkin pour notification
cleartool mktrtype -element -all -postop checkin \\
  -exec "/opt/triggers/notify_checkin.sh" \\
  -comment "Notifie l equipe des checkins" \\
  NOTIFY_CHECKIN@/vobs/projet

# Script notify_checkin.sh
#!/bin/bash
ELEMENT="\\\${CLEARCASE_PN}"
USER="\\\${CLEARCASE_USER}"
VERSION="\\\${CLEARCASE_ID_STR}"
COMMENT="\\\${CLEARCASE_COMMENT}"

# Envoi notification Slack/Teams
curl -X POST "https://hooks.slack.com/services/XXX" \\
  -H "Content-Type: application/json" \\
  -d "{
    \\"text\\": \\"Checkin par \\\${USER}: \\\${ELEMENT} (v\\\${VERSION})\\n\\\${COMMENT}\\"
  }"
\`\`\`

### Attributs personnalisés (mkattr)

\`\`\`bash
# Créer un type d'attribut
cleartool mkattype -vtype string -default "" \\
  -comment "Statut de revue du code" \\
  CODE_REVIEW_STATUS@/vobs/projet

cleartool mkattype -vtype integer -default 0 \\
  -comment "Score qualité 0-100" \\
  QUALITY_SCORE@/vobs/projet

cleartool mkattype -vtype string -enum "pending,approved,rejected" \\
  -default "pending" \\
  -comment "Approbation release" \\
  RELEASE_APPROVAL@/vobs/projet

# Appliquer des attributs aux versions
cleartool mkattr CODE_REVIEW_STATUS \\"approved\\" \\
  /vobs/projet/src/main.c@@/main/dev/4

cleartool mkattr QUALITY_SCORE 85 \\
  /vobs/projet/src/main.c@@/main/dev/4

# Rechercher par attribut
cleartool find /vobs/projet -version "attr_sub(CODE_REVIEW_STATUS,==,\\"approved\\")" -print

# Lister les attributs d'une version
cleartool describe -aattr -all /vobs/projet/src/main.c@@/main/dev/LATEST
\`\`\`

### Opérations batch

\`\`\`bash
# Checkout en masse pour migration
#!/bin/bash
FILES_TO_MODIFY=$(cat files_to_update.txt)
BRANCH="migration_v3"

for FILE in \\\${FILES_TO_MODIFY}; do
    echo "Processing: \\\${FILE}"
    # Créer la branche si nécessaire
    cleartool mkbranch -nc \\\${BRANCH} "\\\${FILE}" 2>/dev/null
    # Checkout
    cleartool checkout -nc -branch \\\${BRANCH} "\\\${FILE}"
    if [ $? -ne 0 ]; then
        echo "ERREUR checkout: \\\${FILE}" >> errors.log
        continue
    fi
    # Appliquer la modification (exemple: sed)
    sed -i 's/old_api_call/new_api_call/g' "\\\${FILE}"
    # Checkin
    cleartool checkin -c "Migration API v3: remplacement old_api_call" "\\\${FILE}"
done

# Labeling en masse
cleartool mklbtype -comment "Release 2.5.0" REL_2_5_0@/vobs/projet
cleartool mklabel -recurse REL_2_5_0 /vobs/projet/src/...
cleartool mklabel -recurse REL_2_5_0 /vobs/projet/include/...

# Rapport des versions entre deux labels
cleartool find /vobs/projet -version \\
  "lbtype(REL_2_5_0) && !lbtype(REL_2_4_0)" \\
  -exec 'cleartool describe -fmt "%En %Vn %u %d\\n" "%CLEARCASE_XPN%"'
\`\`\`

### Intégration avec les outils externes

\`\`\`bash
# Intégration Jenkins avec ClearCase
# Jenkinsfile utilisant le plugin ClearCase SCM
# Checkout dynamique dans le pipeline
cleartool startview build_view_\\\${BUILD_NUMBER}
cleartool setcs -tag build_view_\\\${BUILD_NUMBER} /config/build_cs.txt

# Après le build, appliquer le label
if [ "\\\${BUILD_STATUS}" == "SUCCESS" ]; then
    cleartool mklbtype -nc BUILD_\\\${BUILD_NUMBER}@/vobs/projet 2>/dev/null
    cleartool mklabel -recurse BUILD_\\\${BUILD_NUMBER} /vobs/projet/src/...
fi

# Extraction des métriques pour reporting
echo "Rapport activité ClearCase - $(date)"
echo "================================="
echo "Checkins aujourd'hui:"
cleartool lshistory -since today -avobs -fmt "%u\\n" | sort | uniq -c | sort -rn
echo ""
echo "Fichiers checkés out:"
cleartool lscheckout -avobs | wc -l
echo ""
echo "Branches actives:"
cleartool lstype -kind brtype -short /vobs/projet | wc -l
\`\`\`

### Maintenance automatisée

\`\`\`bash
# Nettoyage des vues obsolètes
#!/bin/bash
DAYS_INACTIVE=90

cleartool lsview -long | grep -B5 "Last accessed" | \\
  awk -v days=\\\${DAYS_INACTIVE} '
    /Tag:/ { tag=$2 }
    /Last accessed/ { 
      if (systime() - mktime($3) > days*86400) 
        print tag 
    }' | while read VIEW; do
    echo "Suppression vue inactive: \\\${VIEW}"
    cleartool rmview -tag \\\${VIEW}
done

# Nettoyage des branches mergées
cleartool find /vobs/projet -type d -branch "brtype(feature_*)" \\
  -exec 'echo "%CLEARCASE_XPN%"' | while read BRANCH; do
    # Vérifier si merge complet vers main
    UNMERGED=$(cleartool findmerge "\\\${BRANCH}" -fver .../main/LATEST -print 2>/dev/null | wc -l)
    if [ "\\\${UNMERGED}" -eq 0 ]; then
        echo "Branche mergée, candidate suppression: \\\${BRANCH}"
    fi
done
\`\`\``,
    practiceContent: `### TP1 : Triggers de conformité

Implémentez un ensemble de triggers : vérification format commentaire (ticket JIRA obligatoire), interdiction de checkin sur main directement, notification Slack sur les checkins, et vérification automatique que le fichier compile avant checkin.

### TP2 : Attributs et workflow personnalisé

Créez un système d'attributs pour gérer le code review : statut (pending/approved/rejected), reviewer, date de revue, score qualité. Développez un script qui génère un rapport des fichiers en attente de revue par développeur.

### TP3 : Migration batch automatisée

Écrivez un script de migration qui : checkout 200 fichiers, applique une transformation (changement d'API, mise à jour de copyright), checkin avec commentaire standardisé, et gère les erreurs (fichier locked, conflit). Ajoutez un mode dry-run.

### TP4 : Reporting et métriques

Créez un tableau de bord automatisé qui collecte quotidiennement : nombre de checkins par développeur, fichiers restés checkout plus de 48h, branches sans activité depuis 30 jours, et taille des VOBs. Exportez en CSV pour import dans un outil de BI.`,
    keyPoints: JSON.stringify(['Cleartool fmt pour extraction de données formatées', 'Triggers pre et post opération pour validation et notification', 'Attributs personnalisés pour métadonnées sur les versions', 'Opérations batch pour modifications en masse', 'Labels automatiques liés aux builds CI', 'Maintenance automatisée vues et branches obsolètes', 'Intégration Jenkins via plugin ou scripts shell', 'Rapports et métriques activité pour pilotage']),
  },


  {
    id: 'cc-08',
    courseId: 'clearcase',
    title: 'ClearCase vs Git',
    duration: '3h',
    orderIndex: 8,
    theoryContent: `## ClearCase vs Git - Comparaison et coexistence

### Introduction à la comparaison

ClearCase et Git représentent deux philosophies radicalement différentes de la gestion de configuration. Comprendre leurs forces respectives est essentiel pour choisir le bon outil selon le contexte, ou pour planifier une migration progressive.

### Comparaison architecturale

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│           COMPARAISON ARCHITECTURALE                          │
│                                                               │
│  ClearCase (Centralisé)           Git (Distribué)            │
│  ┌──────────────────┐            ┌──────────────────┐       │
│  │    VOB Server    │            │  Remote (bare)   │       │
│  │  (source of truth)│            │  (convention)    │       │
│  └────────┬─────────┘            └────────┬─────────┘       │
│           │                               │                  │
│     ┌─────┼─────┐                  ┌─────┼─────┐           │
│     │     │     │                  │     │     │            │
│  ┌──▼──┐┌─▼──┐┌─▼──┐          ┌──▼──┐┌─▼──┐┌─▼──┐       │
│  │View ││View││View│          │Clone││Clone││Clone│       │
│  │(thin)││    ││    │          │(full)│(full)│(full)│       │
│  └─────┘└────┘└────┘          └─────┘└─────┘└─────┘       │
│                                                               │
│  - Vues dynamiques              - Chaque clone = copie      │
│  - Réseau obligatoire           - Travail hors ligne        │
│  - Verrouillage fichiers        - Merge-based workflow      │
│  - Historique sur serveur       - Historique local complet  │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Tableau comparatif détaillé

\`\`\`
┌────────────────────┬──────────────────────┬──────────────────────┐
│ Critère            │ ClearCase            │ Git                  │
├────────────────────┼──────────────────────┼──────────────────────┤
│ Modèle             │ Centralisé           │ Distribué            │
│ Granularité        │ Par fichier          │ Par snapshot         │
│ Branching          │ Par élément          │ Par repo (léger)     │
│ Merge              │ Automatique avancé   │ 3-way merge          │
│ Gros fichiers      │ Natif               │ Git LFS requis       │
│ Binaires           │ Excellent           │ Moyen                │
│ Performance        │ Réseau-dépendant    │ Local = rapide       │
│ Scalabilité        │ > 1M fichiers       │ Monorepo limité      │
│ Apprentissage      │ Complexe            │ Moyen puis avancé    │
│ Coût               │ Licence onéreuse    │ Gratuit (open source)│
│ Écosystème         │ IBM fermé           │ Immense (GitHub...)  │
│ CI/CD              │ Limité              │ Natif (Actions, GL)  │
│ Audit              │ Complet natif       │ git log + outils     │
│ Vues dynamiques    │ Oui (transparent)   │ Non (worktrees)      │
│ Config Spec        │ Très puissant       │ Pas d'équivalent     │
└────────────────────┴──────────────────────┴──────────────────────┘
\`\`\`

### Quand utiliser ClearCase

\`\`\`
ClearCase reste pertinent quand :
- Projets réglementés (DO-178C, ISO 26262) avec audit natif
- Dépôts très volumineux (millions de fichiers)
- Besoin de verrouillage strict (fichiers binaires CAO)
- Vues dynamiques pour composition complexe
- Historique existant qu'on ne peut pas migrer
- Équipes habituées et productives avec ClearCase
- Intégration forte avec ClearQuest existante
\`\`\`

### Quand migrer vers Git

\`\`\`
La migration vers Git est recommandée quand :
- Nouvelles équipes sans historique ClearCase
- Besoin de CI/CD moderne (GitHub Actions, GitLab CI)
- Développeurs travaillant à distance/hors ligne
- Besoin d'un écosystème riche (PR, code review)
- Coût de licence ClearCase trop élevé
- Recrutement difficile de profils ClearCase
- Intégration cloud native requise
\`\`\`

### Approches hybrides

\`\`\`bash
# Approche 1 : Git-ClearCase bridge
# Utiliser git-cc pour synchronisation bidirectionnelle

# Installation git-cc
pip install git-cc

# Initialiser le bridge
git cc init /vobs/projet main

# Pull depuis ClearCase vers Git
git cc pull

# Push depuis Git vers ClearCase
git cc push

# Approche 2 : ClearCase comme archive, Git pour le dev actif
# Export de l'historique ClearCase vers Git
cleartool find /vobs/projet -version "created_since(2020-01-01)" -print | \\
  while read VERSION; do
    # Extraire métadonnées
    DATE=$(cleartool describe -fmt "%d" "\\\${VERSION}")
    USER=$(cleartool describe -fmt "%u" "\\\${VERSION}")
    COMMENT=$(cleartool describe -fmt "%Nc" "\\\${VERSION}")
    # Reconstruire dans Git avec les mêmes métadonnées
  done

# Approche 3 : Miroir lecture seule
# ClearCase trigger qui pousse vers Git à chaque checkin
#!/bin/bash
# post-checkin trigger
FILE="\\\${CLEARCASE_PN}"
BRANCH="\\\${CLEARCASE_BRTYPE}"
COMMENT="\\\${CLEARCASE_COMMENT}"

cd /opt/git-mirror/projet
git checkout "\\\${BRANCH}" 2>/dev/null || git checkout -b "\\\${BRANCH}"
cp "\\\${FILE}" "./\\\${FILE#/vobs/projet/}"
git add .
git commit -m "\\\${COMMENT}" --author="\\\${CLEARCASE_USER} <\\\${CLEARCASE_USER}@company.com>"
git push origin "\\\${BRANCH}"
\`\`\`

### Migration progressive

\`\`\`
Plan de migration ClearCase vers Git :

Phase 1 : Évaluation (4 semaines)
├── Inventaire VOBs (taille, nombre fichiers, branches)
├── Analyse des config specs utilisées
├── Identification des triggers à reproduire
├── Cartographie des intégrations (ClearQuest, Jenkins)
└── Estimation effort et risques

Phase 2 : Préparation (4-6 semaines)
├── Choix plateforme Git (GitHub, GitLab, Bitbucket)
├── Définition stratégie branching Git (GitFlow, trunk)
├── Migration pilote (1 VOB non critique)
├── Formation équipes (2-3 jours par groupe)
└── Mise en place CI/CD sur projet pilote

Phase 3 : Migration par lots (8-16 semaines)
├── Export historique avec git-cc ou cc2git
├── Vérification intégrité post-migration
├── Dual-run (ClearCase lecture, Git écriture)
├── Migration des processus de build
└── Adaptation des workflows de revue

Phase 4 : Finalisation (4 semaines)
├── ClearCase en lecture seule (archive)
├── Redirection des utilisateurs vers Git
├── Suppression des licences ClearCase
└── Documentation des équivalences pour référence
\`\`\`

### Coexistence et bonnes pratiques

\`\`\`bash
# Git worktrees comme alternative aux vues dynamiques
git worktree add ../projet-feature-A feature-A
git worktree add ../projet-release-2.0 release/2.0
git worktree list

# Git submodules comme alternative aux VOBs multiples
git submodule add https://github.com/company/lib-common.git libs/common
git submodule add https://github.com/company/lib-ui.git libs/ui
git submodule update --init --recursive

# Git LFS pour les binaires (alternative ClearCase natif)
git lfs track "*.bin" "*.dll" "*.so" "*.a"
git lfs track "*.psd" "*.ai" "*.dwg"
git add .gitattributes
\`\`\``,
    practiceContent: `### TP1 : Analyse comparative sur un projet réel

Prenez un projet existant dans ClearCase et évaluez sa migration vers Git. Analysez : taille totale, nombre de branches actives, fichiers binaires, config specs utilisées, triggers en place. Rédigez un rapport de faisabilité avec estimation d'effort.

### TP2 : Bridge Git-ClearCase

Mettez en place un bridge bidirectionnel entre un VOB ClearCase et un dépôt Git. Testez les scénarios : commit Git reflété dans ClearCase, checkin ClearCase visible dans Git. Documentez les limitations et cas d'erreur.

### TP3 : Migration pilote complète

Effectuez la migration complète d'un petit VOB (100-500 fichiers) vers Git. Préservez l'historique des 2 dernières années, les labels comme tags Git, et les branches actives. Vérifiez que git blame correspond aux informations ClearCase.

### TP4 : Plan de migration organisationnel

Rédigez un plan de migration complet pour une organisation de 200 développeurs utilisant ClearCase depuis 15 ans. Incluez : planning sur 12 mois, budget formation, gestion du changement, critères Go/No-Go par phase, et plan de communication.`,
    keyPoints: JSON.stringify(['ClearCase centralisé avec vues vs Git distribué avec clones', 'ClearCase supérieur pour gros binaires et audit réglementaire', 'Git supérieur pour CI/CD écosystème et travail distribué', 'Approches hybrides avec bridges et miroirs possibles', 'Migration progressive en 4 phases sur 6 à 12 mois', 'Git worktrees et submodules comme alternatives aux vues et multi-VOBs', 'Git LFS nécessaire pour les fichiers binaires volumineux', 'Formation et gestion du changement critiques pour le succès']),
  },


  {
    id: 'kw-06',
    courseId: 'klocwork',
    title: 'Analyse C++ avancée',
    duration: '3h',
    orderIndex: 6,
    theoryContent: `## Analyse C++ avancée avec Klocwork

### Introduction à l'analyse C++ avec Klocwork

Klocwork excelle dans l'analyse statique de code C et C++, avec un support natif des standards MISRA, CERT, et AUTOSAR. L'analyse C++ avancée couvre les templates, le C++ moderne (C++17/20/23), la gestion mémoire et la détection des comportements indéfinis.

### Checkers MISRA C++ dans Klocwork

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│            CHECKERS MISRA C++ 2023                             │
│                                                               │
│  Catégories principales :                                     │
│  ┌──────────────────┬──────────────────────────────────┐    │
│  │ Règle            │ Description                      │    │
│  ├──────────────────┼──────────────────────────────────┤    │
│  │ MISRA.LITERAL    │ Utilisation de littéraux         │    │
│  │ MISRA.INIT       │ Initialisation des variables     │    │
│  │ MISRA.CAST       │ Conversions de types             │    │
│  │ MISRA.PTR        │ Manipulation de pointeurs        │    │
│  │ MISRA.MEM        │ Gestion mémoire                  │    │
│  │ MISRA.EXCEPT     │ Gestion des exceptions           │    │
│  │ MISRA.VIRTUAL    │ Fonctions virtuelles             │    │
│  │ MISRA.TEMPLATE   │ Utilisation des templates        │    │
│  └──────────────────┴──────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Configuration pour C++ moderne

\`\`\`
# kwbuildproject - Configuration C++17/20
kwbuildproject --tables-directory /path/to/tables \\
  -o buildspec.out \\
  --cxx-compiler g++ \\
  --cxx-std c++20 \\
  --system-includes /usr/include/c++/12

# .klocwork/project.conf
language=cxx
cxx_standard=c++20
compiler=gcc
compiler_version=12
enable_threads=true
enable_exceptions=true

# Activation des checkers spécifiques C++ moderne
checker.enable=MISRA.CPP.2023
checker.enable=CXX.SMARTPTR
checker.enable=CXX.MOVE_SEMANTIC
checker.enable=CXX.LAMBDA
checker.enable=CXX.CONSTEXPR
checker.enable=AUTOSAR.CPP14
\`\`\`

### Analyse des templates C++

\`\`\`cpp
// Exemples de problèmes détectés par Klocwork dans les templates

// KW: CXX.TEMPLATE.DEPENDENT - Nom dépendant non qualifié
template<typename T>
class Container {
    typename T::iterator begin();  // OK - typename requis
    T::iterator end();             // ERREUR détectée par KW
};

// KW: CXX.TEMPLATE.SPEC - Spécialisation partielle incorrecte
template<typename T, typename U>
class Pair { /* ... */ };

template<typename T>
class Pair<T, T> { /* ... */ };  // OK

// KW: CXX.MOVE_SEMANTIC - Utilisation après move
template<typename T>
void process(T&& value) {
    auto moved = std::move(value);
    // KW détecte: utilisation de 'value' après move
    std::cout << value.size();  // DEFECT: use-after-move
}

// KW: CXX.SMARTPTR - Problèmes avec smart pointers
void example() {
    auto ptr = std::make_unique<Widget>();
    auto raw = ptr.get();
    ptr.reset();
    // KW détecte: utilisation de raw après reset
    raw->doSomething();  // DEFECT: dangling pointer
}
\`\`\`

### Gestion des faux positifs

\`\`\`cpp
// Méthode 1 : Annotations dans le code
void safe_function() {
    // klocwork suppress CXX.NULL_PTR
    int* ptr = get_validated_pointer();
    *ptr = 42;  // Supprimé car validé en amont
}

// Méthode 2 : Fichier de tuning (.kb)
// Contenu de project_tuning.kb :
// suppress;CXX.NULL_PTR;file=src/validated/*.cpp
// suppress;MISRA.CAST;function=legacy_adapter::convert

// Méthode 3 : Via l'interface web Klocwork
// Status: Not a Problem, justification requise

// Méthode 4 : Knowledge Base partagée
// kwadmin import-tuning --project myproject tuning.kb
\`\`\`

\`\`\`bash
# Gestion en masse des faux positifs
# Exporter les issues marquées comme faux positifs
kwquery --project myproject \\
  --status "Not a Problem" \\
  --format csv > false_positives.csv

# Appliquer un fichier de tuning
kwadmin --url http://klocwork:8080 \\
  import-tuning --project myproject \\
  --file company_tuning.kb

# Créer un rapport des faux positifs par checker
kwquery --project myproject \\
  --status "Not a Problem" \\
  --group-by checker \\
  --format json | jq '.[] | .checker + ": " + (.count | tostring)'
\`\`\`

### Analyse de la gestion mémoire

\`\`\`
Défauts mémoire détectés par Klocwork :
┌──────────────────────┬────────────────────────────────────┐
│ Checker              │ Problème détecté                   │
├──────────────────────┼────────────────────────────────────┤
│ MLK - Memory Leak    │ Fuite mémoire (alloc sans free)   │
│ NPD - Null Pointer   │ Déréférencement pointeur null     │
│ UFM - Uninitialized  │ Utilisation mémoire non initialisée│
│ FNR - Free Non-alloc │ Free sur pointeur non alloué      │
│ ITER.END             │ Déréférencement itérateur end()    │
│ ABV - Array Bounds   │ Dépassement de tableau            │
│ UAF - Use After Free │ Utilisation après libération      │
│ DBF - Double Free    │ Double libération                  │
└──────────────────────┴────────────────────────────────────┘
\`\`\`

### Intégration AUTOSAR C++14

\`\`\`bash
# Activer le profil AUTOSAR complet
kwcheck run --project myproject \\
  --taxonomy "AUTOSAR C++14" \\
  --build-spec buildspec.out

# Règles AUTOSAR critiques :
# A0-1-1: Code mort non autorisé
# A2-10-1: Noms de variables distincts
# A5-1-1: Lambdas au lieu de foncteurs quand possible
# A7-1-5: auto avec type déductible uniquement
# A12-8-6: Move constructor ne doit pas lever
# A15-5-1: Toutes exceptions dans terminate handler
\`\`\``,
    practiceContent: `### TP1 : Analyse MISRA C++ complète

Configurez Klocwork avec le profil MISRA C++ 2023 complet sur un projet embarqué. Analysez un code de 10000 lignes et classifiez les violations par sévérité. Créez un plan de remédiation priorisé avec estimation d'effort.

### TP2 : Détection problèmes C++ moderne

Écrivez un programme C++20 utilisant : concepts, ranges, coroutines, modules. Analysez-le avec Klocwork et identifiez les défauts liés aux nouvelles fonctionnalités. Documentez les patterns sûrs vs les patterns à éviter.

### TP3 : Gestion des faux positifs à grande échelle

Sur un projet avec 500+ issues Klocwork, triez les faux positifs en utilisant les trois méthodes (annotations code, fichier tuning, interface web). Mesurez le ratio signal/bruit avant et après. Partagez le tuning entre 3 projets similaires.

### TP4 : Conformité AUTOSAR C++14

Configurez un projet automotive avec le profil AUTOSAR C++14 complet. Analysez une library de contrôle moteur. Générez le rapport de conformité montrant le pourcentage de règles satisfaites par catégorie (Required, Advisory, Automated).`,
    keyPoints: JSON.stringify(['Support MISRA C++ 2023 avec catégorisation par règle', 'Analyse templates et C++ moderne C++17 C++20 C++23', 'Détection use-after-move et dangling pointers smart', 'Gestion faux positifs par annotations tuning et interface web', 'Checkers mémoire MLK NPD UFM UAF DBF ABV', 'Profil AUTOSAR C++14 pour industrie automobile', 'Knowledge Base partageable entre projets similaires', 'Analyse incrémentale pour feedback rapide développeur']),
  },


  {
    id: 'kw-07',
    courseId: 'klocwork',
    title: 'Klocwork pour Java et C#',
    duration: '3h',
    orderIndex: 7,
    theoryContent: `## Klocwork pour Java et C#

### Introduction à l'analyse Java et C#

Klocwork étend ses capacités d'analyse statique au-delà du C/C++ avec un support complet pour Java et C#. Les checkers sont adaptés aux patterns spécifiques de chaque langage : Spring Framework, frameworks .NET, injection de dépendances, et sérialisation.

### Checkers Java dans Klocwork

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│              CHECKERS JAVA KLOCWORK                            │
│                                                               │
│  Sécurité (OWASP Top 10) :                                   │
│  ├── SV.SQL - Injection SQL                                  │
│  ├── SV.XSS - Cross-Site Scripting                           │
│  ├── SV.PATH - Path Traversal                                │
│  ├── SV.LDAP - Injection LDAP                                │
│  ├── SV.HTTP_SPLIT - HTTP Response Splitting                 │
│  └── SV.SERIAL - Désérialisation non sûre                   │
│                                                               │
│  Fiabilité :                                                  │
│  ├── JD.NPE - NullPointerException potentiel                │
│  ├── JD.LOCK - Deadlock potentiel                            │
│  ├── JD.RC - Race condition                                  │
│  ├── JD.RESOURCE - Fuite de ressources                       │
│  └── JD.UNCHECKED - Exception non gérée                     │
│                                                               │
│  Spring Framework :                                           │
│  ├── SPRING.INJECT - Injection incorrecte                    │
│  ├── SPRING.SCOPE - Scope bean incorrect                     │
│  └── SPRING.TRANSACT - Transaction mal configurée            │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Configuration Java avec Spring

\`\`\`bash
# Build spec pour projet Maven/Spring
kwmaven --output buildspec.out clean compile

# Pour Gradle
kwgradle --output buildspec.out clean compileJava

# Analyse avec checkers Spring activés
kwbuildproject --tables-directory tables \\
  --project myproject \\
  buildspec.out

# Configuration spécifique Spring
# .klocwork/analysis.conf
java.framework=spring
java.spring.version=6
java.spring.scan-components=true
checker.enable=SPRING.*
checker.enable=SV.*
checker.enable=JD.*
\`\`\`

\`\`\`java
// Exemples de défauts détectés dans Spring

// SV.SQL - Injection SQL détectée
@Repository
public class UserDao {
    // DEFECT: concaténation directe dans requête SQL
    public User findByName(String name) {
        String query = "SELECT * FROM users WHERE name = '" + name + "'";
        return jdbcTemplate.queryForObject(query, new UserMapper());
    }
    
    // CORRECT: utilisation de paramètres
    public User findByNameSafe(String name) {
        return jdbcTemplate.queryForObject(
            "SELECT * FROM users WHERE name = ?",
            new UserMapper(), name);
    }
}

// JD.RESOURCE - Fuite de ressource détectée
public void processFile(String path) {
    // DEFECT: stream non fermé en cas d'exception
    InputStream is = new FileInputStream(path);
    process(is);
    is.close();  // Non atteint si process() lève
}

// CORRECT: try-with-resources
public void processFileSafe(String path) {
    try (InputStream is = new FileInputStream(path)) {
        process(is);
    }
}

// JD.NPE - NullPointerException potentiel
public void handleUser(Optional<User> optUser) {
    // DEFECT: get() sans vérification isPresent()
    User user = optUser.get();
    System.out.println(user.getName());
}
\`\`\`

### Analyse C# et .NET

\`\`\`
Checkers C# spécifiques :
┌──────────────────────┬────────────────────────────────────┐
│ Checker              │ Détection                          │
├──────────────────────┼────────────────────────────────────┤
│ CS.NPE               │ NullReferenceException            │
│ CS.SQL               │ Injection SQL (EF, ADO.NET)       │
│ CS.XSS               │ XSS dans ASP.NET/Razor           │
│ CS.DISPOSE           │ IDisposable non disposé           │
│ CS.ASYNC_DEADLOCK    │ Deadlock async/await              │
│ CS.LINQ              │ Enumeration multiple              │
│ CS.UNSAFE            │ Code unsafe non nécessaire        │
│ CS.CONCURRENT        │ Problèmes collections concurrentes│
└──────────────────────┴────────────────────────────────────┘
\`\`\`

\`\`\`bash
# Build spec pour projet .NET
kwdotnet --output buildspec.out \\
  msbuild MySolution.sln /p:Configuration=Release

# Analyse avec profil .NET
kwbuildproject --tables-directory tables \\
  --project myproject-dotnet \\
  buildspec.out

# Configuration C#
# .klocwork/analysis.conf
dotnet.framework=net8.0
dotnet.nullable=enable
checker.enable=CS.*
checker.enable=SV.*
\`\`\`

\`\`\`csharp
// Exemples de défauts C# détectés

// CS.ASYNC_DEADLOCK - Deadlock async potentiel
public class MyController : Controller
{
    // DEFECT: .Result bloque le thread UI/request
    public ActionResult GetData()
    {
        var data = GetDataAsync().Result; // DEADLOCK!
        return View(data);
    }
    
    // CORRECT: async all the way
    public async Task<ActionResult> GetDataCorrect()
    {
        var data = await GetDataAsync();
        return View(data);
    }
}

// CS.DISPOSE - IDisposable non disposé
public void ProcessDatabase()
{
    // DEFECT: SqlConnection non disposée
    var conn = new SqlConnection(connString);
    conn.Open();
    var cmd = conn.CreateCommand();
    cmd.CommandText = "SELECT 1";
    cmd.ExecuteNonQuery();
    // Pas de Dispose/Close!
}

// CS.LINQ - Enumeration multiple
public void AnalyzeData(IEnumerable<int> source)
{
    // DEFECT: source énumérée deux fois
    var count = source.Count();
    var sum = source.Sum();
    // Si source est un IQueryable, 2 requêtes DB!
}
\`\`\`

### Intégration avec les IDEs

\`\`\`bash
# Plugin IntelliJ IDEA pour Java
# Installation via: Settings > Plugins > Klocwork
# Configuration du serveur:
# URL: http://klocwork:8080
# Project: myproject

# Plugin Visual Studio pour C#
# Installation via: Extensions > Klocwork
# Analyse locale avant commit:
kwcheck run --project myproject-dotnet \\
  --build-spec buildspec.out \\
  --report local_report.xml

# Plugin Eclipse
# Intégration similaire avec vue des issues dans l'IDE
\`\`\`

### Règles personnalisées pour frameworks

\`\`\`
# Créer un checker personnalisé pour Spring Security
# custom_checker.kcfg
<checker name="CUSTOM.SPRING.NOAUTH" severity="Critical">
  <description>Endpoint sans authentification</description>
  <pattern>
    method.annotation != "PreAuthorize" AND
    method.annotation != "Secured" AND
    class.annotation contains "RestController"
  </pattern>
</checker>

# Checker pour Entity Framework
<checker name="CUSTOM.EF.N_PLUS_1" severity="High">
  <description>Potentiel problème N+1 avec lazy loading</description>
  <pattern>
    navigation.property.access IN loop AND
    NOT query.includes(navigation.property)
  </pattern>
</checker>
\`\`\``,
    practiceContent: `### TP1 : Analyse Spring Boot complète

Configurez Klocwork sur un projet Spring Boot avec : REST controllers, JPA repositories, service layer. Analysez les vulnérabilités OWASP (injection SQL, XSS), les fuites de ressources, et les NPE potentiels. Corrigez les 10 défauts les plus critiques.

### TP2 : Analyse ASP.NET Core

Analysez un projet ASP.NET Core avec Entity Framework. Identifiez les problèmes de deadlock async/await, les IDisposable non gérés, et les requêtes N+1. Comparez les résultats Klocwork avec les warnings du compilateur C#.

### TP3 : Checkers personnalisés par framework

Créez 3 checkers personnalisés pour votre framework : vérification que tous les endpoints ont une annotation d'autorisation, détection des logs contenant des données sensibles, et vérification des validations d'entrée. Testez-les sur votre codebase.

### TP4 : Intégration IDE et workflow développeur

Configurez le plugin Klocwork dans IntelliJ (Java) et Visual Studio (C#). Mesurez le temps d'analyse locale. Implémentez un workflow pre-commit qui bloque si des défauts critiques sont introduits. Comparez avec l'analyse serveur complète.`,
    keyPoints: JSON.stringify(['Checkers OWASP Top 10 pour Java injection SQL XSS path traversal', 'Support Spring Framework avec détection scope et transaction', 'Analyse C# avec détection deadlock async et IDisposable', 'Détection NullPointerException et NullReferenceException', 'Build specs via kwmaven kwgradle et kwdotnet', 'Plugins IDE IntelliJ Visual Studio et Eclipse', 'Checkers personnalisés pour frameworks métier', 'Analyse de sécurité adaptée aux patterns modernes']),
  },


  {
    id: 'kw-08',
    courseId: 'klocwork',
    title: 'Rapports et tableaux de bord',
    duration: '3h',
    orderIndex: 8,
    theoryContent: `## Rapports et tableaux de bord Klocwork

### Introduction au reporting Klocwork

Klocwork offre des capacités de reporting étendues pour suivre l'évolution de la qualité du code dans le temps. Les tableaux de bord permettent aux managers et aux équipes de visualiser les tendances, identifier les zones à risque, et mesurer l'efficacité des efforts de remédiation.

### Interface web Klocwork Review

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│            KLOCWORK REVIEW DASHBOARD                          │
│                                                               │
│  ┌─────────────────────────────────────────────────┐        │
│  │  Projet: Système Navigation v3.2                 │        │
│  │  Dernière analyse: 15/01/2024 08:30              │        │
│  │  LOC: 450,000 | Fichiers: 2,340                  │        │
│  └─────────────────────────────────────────────────┘        │
│                                                               │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐              │
│  │ Critiques  │ │ Élevés     │ │ Moyens     │              │
│  │    12      │ │    45      │ │   156      │              │
│  │  ▼ -3     │ │  ▼ -12    │ │  ▲ +5     │              │
│  └────────────┘ └────────────┘ └────────────┘              │
│                                                               │
│  Tendance 30 jours:                                          │
│  250 ┤                                                       │
│  200 ┤    ╲                                                  │
│  150 ┤      ╲──╲                                            │
│  100 ┤          ╲──────                                     │
│   50 ┤                                                       │
│      └──┬──┬──┬──┬──┬──┬──                                 │
│        S1  S2  S3  S4  S5  S6                                │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Rapports personnalisés via API

\`\`\`bash
# Requête des issues par sévérité
kwquery --url http://klocwork:8080 \\
  --project navigation-system \\
  --severity Critical,High \\
  --status "New,Existing" \\
  --format json > critical_issues.json

# Rapport par développeur
kwquery --url http://klocwork:8080 \\
  --project navigation-system \\
  --group-by owner \\
  --status "New" \\
  --format csv > issues_by_developer.csv

# Rapport par module/composant
kwquery --url http://klocwork:8080 \\
  --project navigation-system \\
  --group-by directory \\
  --severity Critical \\
  --format json | jq '.[] | select(.count > 5)'

# Historique des métriques
kwquery --url http://klocwork:8080 \\
  --project navigation-system \\
  --history \\
  --metric "total_issues,critical_issues,code_lines" \\
  --from "2024-01-01" \\
  --to "2024-06-30" \\
  --format csv > metrics_history.csv
\`\`\`

### Analyse de tendances

\`\`\`bash
# Script d'analyse de tendances
#!/bin/bash
PROJECT="navigation-system"
KW_URL="http://klocwork:8080"

# Collecter les données des 12 dernières semaines
for i in $(seq 0 11); do
    DATE=$(date -d "-\\\${i} weeks" +%Y-%m-%d)
    CRITICAL=$(kwquery --url \\\${KW_URL} --project \\\${PROJECT} \\
        --severity Critical --date "\\\${DATE}" --count)
    HIGH=$(kwquery --url \\\${KW_URL} --project \\\${PROJECT} \\
        --severity High --date "\\\${DATE}" --count)
    TOTAL=$(kwquery --url \\\${KW_URL} --project \\\${PROJECT} \\
        --date "\\\${DATE}" --count)
    echo "\\\${DATE},\\\${CRITICAL},\\\${HIGH},\\\${TOTAL}"
done > trend_data.csv

# Calcul de la densité de défauts
LOC=$(kwquery --url \\\${KW_URL} --project \\\${PROJECT} --metric code_lines)
DEFECTS=$(kwquery --url \\\${KW_URL} --project \\\${PROJECT} --count)
DENSITY=$(echo "scale=2; \\\${DEFECTS} * 1000 / \\\${LOC}" | bc)
echo "Densité de défauts: \\\${DENSITY} défauts/KLOC"
\`\`\`

### Densité de défauts et métriques qualité

\`\`\`
Métriques clés suivies :
┌─────────────────────────┬──────────────────────────────────┐
│ Métrique                │ Formule / Description            │
├─────────────────────────┼──────────────────────────────────┤
│ Densité défauts         │ Défauts / KLOC                   │
│ Taux de correction      │ Défauts fixés / Total défauts    │
│ Temps moyen résolution  │ Somme(jours fix) / Nb fixés     │
│ Taux introduction       │ Nouveaux défauts / builds        │
│ Couverture analyse      │ Fichiers analysés / Total        │
│ Faux positifs ratio     │ FP / Total issues                │
│ Défauts par sévérité    │ Distribution Critical/High/Med   │
│ Technical debt (jours)  │ Effort estimé remédiation        │
└─────────────────────────┴──────────────────────────────────┘

Objectifs typiques par industrie :
┌─────────────────────┬───────────────────┬───────────────┐
│ Industrie           │ Densité cible     │ Critiques max │
├─────────────────────┼───────────────────┼───────────────┤
│ Aéronautique (DAL A)│ < 0.1 défauts/KLOC│ 0             │
│ Automobile (ASIL D) │ < 0.5 défauts/KLOC│ 0             │
│ Médical (Classe C)  │ < 1.0 défauts/KLOC│ 0             │
│ Industriel général  │ < 5.0 défauts/KLOC│ < 5           │
│ IT/Web              │ < 10 défauts/KLOC │ < 20          │
└─────────────────────┴───────────────────┴───────────────┘
\`\`\`

### Rapports de conformité

\`\`\`bash
# Génération rapport MISRA compliance
kwreport --url http://klocwork:8080 \\
  --project navigation-system \\
  --taxonomy "MISRA C 2012" \\
  --format pdf \\
  --output misra_compliance_report.pdf

# Rapport de couverture des règles
kwreport --url http://klocwork:8080 \\
  --project navigation-system \\
  --report-type rule-coverage \\
  --taxonomy "MISRA C++ 2023" \\
  --format html \\
  --output rule_coverage.html

# Rapport pour audit (toutes les déviations justifiées)
kwquery --url http://klocwork:8080 \\
  --project navigation-system \\
  --status "Not a Problem" \\
  --format detailed-csv \\
  --fields "id,checker,file,line,owner,comment,date" \\
  > deviations_justified.csv
\`\`\`

### Intégration Grafana/Prometheus

\`\`\`bash
# Exporter les métriques Klocwork vers Prometheus
# Script de collecte (exécuté par cron toutes les heures)
#!/bin/bash
PROJECTS="nav-system comm-system ctrl-system"
METRICS_FILE="/var/lib/prometheus/klocwork_metrics.prom"

echo "# HELP klocwork_issues_total Total issues by severity" > \\\${METRICS_FILE}
echo "# TYPE klocwork_issues_total gauge" >> \\\${METRICS_FILE}

for PROJECT in \\\${PROJECTS}; do
    for SEVERITY in Critical High Medium Low; do
        COUNT=$(kwquery --url http://klocwork:8080 \\
            --project \\\${PROJECT} \\
            --severity \\\${SEVERITY} --count)
        echo "klocwork_issues_total{project=\\"\\\${PROJECT}\\",severity=\\"\\\${SEVERITY}\\"} \\\${COUNT}" >> \\\${METRICS_FILE}
    done
    
    # Densité
    LOC=$(kwquery --url http://klocwork:8080 --project \\\${PROJECT} --metric code_lines)
    echo "klocwork_code_lines{project=\\"\\\${PROJECT}\\"} \\\${LOC}" >> \\\${METRICS_FILE}
done

echo "# HELP klocwork_last_analysis_timestamp Last analysis time" >> \\\${METRICS_FILE}
echo "# TYPE klocwork_last_analysis_timestamp gauge" >> \\\${METRICS_FILE}
echo "klocwork_last_analysis_timestamp $(date +%s)" >> \\\${METRICS_FILE}
\`\`\`

### Alertes et seuils

\`\`\`bash
# Configuration des alertes (CI/CD gate)
# Script de quality gate dans le pipeline
#!/bin/bash
PROJECT="navigation-system"
KW_URL="http://klocwork:8080"

CRITICAL=$(kwquery --url \\\${KW_URL} --project \\\${PROJECT} \\
    --severity Critical --status New --count)
HIGH=$(kwquery --url \\\${KW_URL} --project \\\${PROJECT} \\
    --severity High --status New --count)

echo "Nouveaux défauts - Critiques: \\\${CRITICAL}, Élevés: \\\${HIGH}"

if [ "\\\${CRITICAL}" -gt 0 ]; then
    echo "ÉCHEC: Défauts critiques détectés!"
    exit 1
fi

if [ "\\\${HIGH}" -gt 5 ]; then
    echo "ÉCHEC: Trop de défauts élevés (> 5)!"
    exit 1
fi

echo "Quality gate PASSED"
exit 0
\`\`\``,
    practiceContent: `### TP1 : Tableau de bord multi-projets

Créez un tableau de bord Klocwork affichant 5 projets avec : tendance des défauts sur 3 mois, densité par KLOC, distribution par sévérité, et top 10 fichiers les plus problématiques. Exportez les données vers un format importable dans Excel.

### TP2 : Rapport de conformité MISRA

Générez un rapport de conformité MISRA C complet pour un projet embarqué. Incluez : règles respectées, règles violées avec localisation, déviations justifiées, et plan de remédiation. Formatez-le pour présentation à un auditeur externe.

### TP3 : Intégration Grafana

Configurez l'export des métriques Klocwork vers Prometheus. Créez un dashboard Grafana avec : gauge pour les défauts critiques, graphe de tendance, heatmap par composant, et alertes quand un seuil est dépassé. Testez les alertes.

### TP4 : Quality gate CI/CD

Implémentez un quality gate dans votre pipeline CI : bloque si nouveaux défauts critiques, avertit si densité dépasse le seuil, génère un rapport delta entre les builds. Testez avec un commit introduisant intentionnellement des défauts.`,
    keyPoints: JSON.stringify(['Dashboard web avec tendances et distribution par sévérité', 'API kwquery pour extraction de données et rapports personnalisés', 'Densité de défauts par KLOC comme métrique principale', 'Rapports de conformité MISRA et AUTOSAR pour certification', 'Intégration Prometheus et Grafana pour monitoring continu', 'Quality gates dans CI/CD avec seuils par sévérité', 'Analyse de tendances sur historique pour mesurer amélioration', 'Objectifs de densité adaptés par industrie et criticité']),
  },


  {
    id: 'jira-06',
    courseId: 'jira',
    title: 'Jira Service Management',
    duration: '3h',
    orderIndex: 6,
    theoryContent: `## Jira Service Management

### Introduction à Jira Service Management

Jira Service Management (JSM) étend Jira avec des capacités ITSM complètes : portail client, gestion des SLA, files d'attente priorisées, base de connaissances et gestion des incidents. Il unifie le support IT, le service client et les opérations DevOps dans une seule plateforme.

### Architecture JSM

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│              JIRA SERVICE MANAGEMENT                           │
│                                                               │
│  ┌────────────────┐   ┌────────────────┐                   │
│  │  Portail Client│   │  Agents (Jira) │                   │
│  │  (externe)     │   │  (interne)     │                   │
│  └───────┬────────┘   └───────┬────────┘                   │
│          │                     │                             │
│          └─────────┬───────────┘                             │
│                    ▼                                          │
│  ┌─────────────────────────────────┐                        │
│  │        REQUEST TYPES            │                        │
│  │  IT Help | Access | Hardware    │                        │
│  └──────────────┬──────────────────┘                        │
│                 │                                            │
│  ┌──────────────▼──────────────────┐                        │
│  │          QUEUES                  │                        │
│  │  ┌─────┐ ┌──────┐ ┌────────┐  │                        │
│  │  │ P1  │ │ VIP  │ │ Réseau │  │                        │
│  │  └─────┘ └──────┘ └────────┘  │                        │
│  └──────────────┬──────────────────┘                        │
│                 │                                            │
│  ┌──────────────▼──────────────────┐                        │
│  │        SLA ENGINE               │                        │
│  │  Time to first response: 1h    │                        │
│  │  Time to resolution: 4h        │                        │
│  └──────────────┬──────────────────┘                        │
│                 │                                            │
│  ┌──────────────▼──────────────────┐                        │
│  │     KNOWLEDGE BASE              │                        │
│  │  Articles | FAQ | Runbooks      │                        │
│  └─────────────────────────────────┘                        │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Configuration du portail client

\`\`\`
Types de requêtes recommandés :
┌────────────────────────┬────────────────────────────────────┐
│ Catégorie              │ Types de requêtes                  │
├────────────────────────┼────────────────────────────────────┤
│ IT Support             │ Problème technique, Reset password │
│ Accès et permissions   │ Nouveau compte, Accès VPN, Droits │
│ Matériel               │ Nouvel équipement, Réparation      │
│ Logiciel               │ Installation, Mise à jour, Licence│
│ Réseau                 │ WiFi, Firewall, DNS                │
│ Incidents              │ Service down, Dégradation          │
│ Changements            │ Demande de changement, RFC         │
└────────────────────────┴────────────────────────────────────┘
\`\`\`

### Configuration des SLA

\`\`\`
SLA par priorité :
┌──────────┬──────────────────┬─────────────────┬──────────────┐
│ Priorité │ First Response   │ Resolution      │ Calendrier   │
├──────────┼──────────────────┼─────────────────┼──────────────┤
│ P1       │ 15 minutes       │ 1 heure         │ 24/7         │
│ P2       │ 30 minutes       │ 4 heures        │ 24/7         │
│ P3       │ 2 heures         │ 8 heures        │ Heures ouvrées│
│ P4       │ 8 heures         │ 3 jours         │ Heures ouvrées│
│ P5       │ 24 heures        │ 5 jours         │ Heures ouvrées│
└──────────┴──────────────────┴─────────────────┴──────────────┘

Configuration SLA avancée (JQL) :
- Démarrer: issue.created
- Pause: status = "Waiting for customer"
- Reprendre: status changed from "Waiting for customer"
- Objectif atteint: status = "Resolved" OR status = "Done"
\`\`\`

### Files d'attente (Queues)

\`\`\`
Queues recommandées pour une équipe support :
├── Tous les tickets ouverts (JQL: status != Done)
├── Non assignés (JQL: assignee = EMPTY AND status != Done)
├── P1/P2 urgents (JQL: priority in (Highest, High))
├── SLA en danger (JQL: breached() OR remainingTime() < "30m")
├── En attente client (JQL: status = "Waiting for customer")
├── Mes tickets (JQL: assignee = currentUser())
└── Escalations (JQL: labels = "escalated")
\`\`\`

### Gestion des incidents

\`\`\`
Processus de gestion des incidents :
1. Détection (alerte monitoring ou signalement)
2. Classification (P1-P5, impact, urgence)
3. Investigation (runbook, logs, timeline)
4. Communication (page statut, notifications)
5. Résolution (fix, workaround, rollback)
6. Post-incident review (blameless postmortem)

Intégration avec outils de monitoring :
- PagerDuty → JSM : création automatique incident P1
- Prometheus → JSM : alertes deviennent tickets
- StatusPage → JSM : mise à jour statut public
- Opsgenie → JSM : on-call et escalation
\`\`\`

\`\`\`bash
# Créer un incident via API JSM
curl -X POST \\
  -H "Authorization: Basic \\\${JIRA_TOKEN}" \\
  -H "Content-Type: application/json" \\
  "https://company.atlassian.net/rest/api/3/issue" \\
  -d '{
    "fields": {
      "project": {"key": "ITSM"},
      "issuetype": {"name": "Incident"},
      "summary": "Service API indisponible",
      "priority": {"name": "Highest"},
      "description": {
        "type": "doc",
        "version": 1,
        "content": [{"type": "paragraph", "content": [{"type": "text", "text": "API gateway retourne 503 depuis 14:30"}]}]
      },
      "customfield_10001": "Production",
      "labels": ["incident", "api", "critical"]
    }
  }'

# Mettre à jour le SLA
curl -X PUT \\
  -H "Authorization: Basic \\\${JIRA_TOKEN}" \\
  -H "Content-Type: application/json" \\
  "https://company.atlassian.net/rest/api/3/issue/ITSM-456/transitions" \\
  -d '{"transition": {"id": "21"}}'
\`\`\`

### Base de connaissances

\`\`\`
Organisation de la Knowledge Base :
├── Getting Started
│   ├── Comment se connecter au VPN
│   ├── Configurer son poste de travail
│   └── Demander un accès
├── Troubleshooting
│   ├── WiFi ne fonctionne pas
│   ├── Imprimante non détectée
│   └── Email ne se synchronise pas
├── Procédures IT
│   ├── Déploiement en production
│   ├── Rotation des credentials
│   └── Restauration de backup
└── FAQ
    ├── Comment changer mon mot de passe
    ├── Horaires du support
    └── Demander du matériel
\`\`\``,
    practiceContent: `### TP1 : Configuration portail client complet

Créez un projet JSM avec 6 types de requêtes organisés en 3 catégories. Configurez le portail client avec branding personnalisé, formulaires dynamiques (champs conditionnels), et auto-assignation basée sur le type de requête.

### TP2 : SLA et files d'attente

Configurez 5 niveaux de SLA avec calendriers business différenciés (24/7 pour P1, heures ouvrées pour le reste). Créez des files d'attente personnalisées avec JQL et configurez les alertes quand un SLA est à risque (< 30min restantes).

### TP3 : Processus incident management

Implémentez le processus complet de gestion d'incidents : détection via webhook Prometheus, création automatique de ticket P1, escalation si non pris en 5min, communication via StatusPage, et template de postmortem à la clôture.

### TP4 : Base de connaissances et self-service

Créez une base de connaissances avec 15 articles couvrant les demandes les plus fréquentes. Configurez la suggestion automatique d'articles quand un client crée une requête. Mesurez le taux de self-service (tickets évités grâce aux articles).`,
    keyPoints: JSON.stringify(['Portail client externe avec formulaires et catégories', 'SLA configurables par priorité avec calendriers business', 'Files d attente JQL pour priorisation intelligente', 'Gestion des incidents avec détection et escalation', 'Base de connaissances pour self-service client', 'Intégration monitoring Prometheus PagerDuty Opsgenie', 'Automatisation création tickets via API REST', 'Métriques ITSM temps réponse résolution et satisfaction']),
  },


  {
    id: 'jira-07',
    courseId: 'jira',
    title: 'Portfolio et Roadmaps',
    duration: '3h',
    orderIndex: 7,
    theoryContent: `## Portfolio et Roadmaps Jira

### Introduction à Advanced Roadmaps

Advanced Roadmaps (anciennement Portfolio for Jira) est l'outil de planification stratégique de Jira. Il permet de visualiser le travail de plusieurs équipes sur un horizon long terme, planifier la capacité, gérer les dépendances cross-projets, et communiquer la roadmap aux parties prenantes.

### Architecture des plans

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│            ADVANCED ROADMAPS - STRUCTURE                       │
│                                                               │
│  ┌─────────────────────────────────────────────────┐        │
│  │              PLAN STRATÉGIQUE                     │        │
│  │  Horizon: 12 mois | Sources: 5 projets          │        │
│  └───────────────────┬─────────────────────────────┘        │
│                      │                                       │
│  ┌───────────────────▼─────────────────────────────┐        │
│  │  Initiatives (Epics cross-project)               │        │
│  │  ├── Migration Cloud (Q1-Q2)                     │        │
│  │  ├── Refonte UX (Q2-Q3)                          │        │
│  │  └── Scaling Performance (Q3-Q4)                 │        │
│  └───────────────────┬─────────────────────────────┘        │
│                      │                                       │
│  ┌───────────────────▼─────────────────────────────┐        │
│  │  Équipes et capacité                             │        │
│  │  ├── Team Backend (5 dev, 80% capacité)          │        │
│  │  ├── Team Frontend (4 dev, 90% capacité)         │        │
│  │  └── Team DevOps (3 dev, 70% capacité)           │        │
│  └───────────────────┬─────────────────────────────┘        │
│                      │                                       │
│  ┌───────────────────▼─────────────────────────────┐        │
│  │  Sprints et releases                             │        │
│  │  ├── Sprint 45-48 → Release 3.5 (mars)          │        │
│  │  ├── Sprint 49-52 → Release 3.6 (avril)         │        │
│  │  └── Sprint 53-56 → Release 4.0 (juin)          │        │
│  └─────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Capacity Planning

\`\`\`
Configuration de la capacité :
┌────────────────────┬──────────┬────────────┬──────────────┐
│ Équipe             │ Membres  │ Vélocité   │ Disponibilité│
├────────────────────┼──────────┼────────────┼──────────────┤
│ Backend            │ 5        │ 35 pts/spr │ 80%          │
│ Frontend           │ 4        │ 28 pts/spr │ 90%          │
│ Mobile             │ 3        │ 21 pts/spr │ 85%          │
│ DevOps             │ 3        │ 18 pts/spr │ 70%          │
│ QA                 │ 2        │ 15 pts/spr │ 95%          │
└────────────────────┴──────────┴────────────┴──────────────┘

Facteurs de réduction :
- Vacances et congés : configuration par personne
- Overhead (meetings, support) : 15-25% typique
- Bug fixing non planifié : 10-20% buffer
- Formation et R&D : 10% recommandé
\`\`\`

### Cross-project tracking

\`\`\`bash
# JQL pour cross-project dependencies
# Trouver les bloqueurs cross-projet
project in (BACKEND, FRONTEND, MOBILE) AND 
  issueFunction in linkedIssuesOf("project = BACKEND AND type = Epic", "blocks") AND
  status != Done

# Épics partagées entre équipes
type = Epic AND 
  (project = BACKEND OR project = FRONTEND) AND 
  fixVersion = "Release 3.5"

# Travail non planifié dans le trimestre
project in (BACKEND, FRONTEND, DEVOPS) AND
  created >= startOfQuarter() AND
  sprint is EMPTY AND
  type in (Bug, Task)
\`\`\`

### Vues et scénarios

\`\`\`
Types de vues Advanced Roadmaps :
├── Timeline View
│   └── Gantt-like avec dépendances et jalons
├── Board View  
│   └── Kanban cross-équipes par initiative
├── List View
│   └── Tableau détaillé avec métriques
└── Dependencies View
    └── Graphe des dépendances entre issues

Scénarios (What-if) :
- Scénario A : Toutes les features prévues (optimiste)
- Scénario B : Sans la feature X (capacité réduite)
- Scénario C : Ajout d'une équipe contractor (Q3)
- Comparaison des dates de livraison entre scénarios
\`\`\`

### Règles d'auto-scheduling

\`\`\`
Configuration auto-scheduler :
- Respecter les dépendances (finish-to-start)
- Prioriser par rang (drag & drop dans le backlog)
- Ne pas dépasser la capacité de l'équipe
- Considérer les skills requis vs disponibles
- Avertir si date cible impossible à tenir
- Proposer des alternatives quand conflit détecté

Paramètres :
- Sprint length: 2 semaines
- Planning increment: trimestre
- Estimation: story points
- Assignment: par équipe (pas par individu)
\`\`\`

### Roadmap publique et communication

\`\`\`bash
# Partage de roadmap via lien public
# Settings > Advanced Roadmaps > Share > Create public link

# Export de la roadmap
# File > Export > PNG/PDF pour présentation

# Intégration Confluence
# Utiliser le macro "Jira Roadmap" dans une page Confluence
# Synchronisation automatique des données

# API pour extraire les données roadmap
curl -H "Authorization: Basic \\\${JIRA_TOKEN}" \\
  "https://company.atlassian.net/rest/agile/1.0/board/42/epic" | \\
  jq '.values[] | {key, summary: .fields.summary, status: .fields.status.name}'

# Rapport trimestriel automatisé
curl -H "Authorization: Basic \\\${JIRA_TOKEN}" \\
  "https://company.atlassian.net/rest/api/3/search?jql=type=Epic+AND+fixVersion+in+(3.5,3.6)+ORDER+BY+priority" | \\
  jq '.issues[] | {key, summary: .fields.summary, progress: .fields.progress}'
\`\`\`

### Métriques de portfolio

\`\`\`
KPIs de pilotage portfolio :
┌─────────────────────────┬──────────────────────────────────┐
│ KPI                     │ Description                      │
├─────────────────────────┼──────────────────────────────────┤
│ % completion by epic    │ Story points done / total        │
│ On-track ratio          │ Epics dans les temps / total     │
│ Dependency health       │ Blockers non résolus             │
│ Capacity utilization    │ Points planifiés / capacité      │
│ Scope creep             │ Issues ajoutées post-planning    │
│ Velocity trend          │ Évolution vélocité par sprint    │
│ Release predictability  │ Dates tenues vs planifiées       │
│ Cross-team alignment    │ Dépendances résolues à temps     │
└─────────────────────────┴──────────────────────────────────┘
\`\`\``,
    practiceContent: `### TP1 : Plan roadmap multi-équipes

Créez un plan Advanced Roadmaps couvrant 3 équipes et 6 mois. Configurez les sources (3 boards Jira), la capacité par équipe, et les sprints. Ajoutez 5 initiatives (epics) avec dépendances et laissez l'auto-scheduler proposer le planning.

### TP2 : Capacity planning et scénarios

Configurez la capacité détaillée : vacances, overhead, buffer bugs. Créez 3 scénarios (optimiste, réaliste, dégradé) et comparez les dates de livraison. Identifiez le chemin critique et les équipes en surcharge.

### TP3 : Dépendances cross-projets

Modélisez 10 dépendances entre 3 projets. Utilisez la vue Dependencies pour identifier les risques. Créez des alertes quand une dépendance bloquée retarde un jalon. Proposez un plan de mitigation pour les 3 risques principaux.

### TP4 : Communication roadmap aux stakeholders

Créez une page Confluence avec la roadmap intégrée. Configurez un rapport mensuel automatique montrant : progression par initiative, risques principaux, changements de scope, et prévisions mises à jour. Présentez-le format exécutif.`,
    keyPoints: JSON.stringify(['Advanced Roadmaps pour planification stratégique multi-équipes', 'Capacity planning avec vélocité congés et overhead', 'Cross-project tracking des dépendances et blockers', 'Scénarios what-if pour comparer options de planning', 'Auto-scheduler respectant dépendances et capacité', 'Vues timeline board list et dependencies', 'Partage roadmap via Confluence et liens publics', 'KPIs portfolio completion velocity et predictability']),
  },


  {
    id: 'jira-08',
    courseId: 'jira',
    title: 'Migration et scaling Jira',
    duration: '3h',
    orderIndex: 8,
    theoryContent: `## Migration et Scaling Jira

### Introduction au scaling Jira

Quand une instance Jira supporte des centaines de projets et des milliers d'utilisateurs, les défis de performance, maintenance et évolution deviennent critiques. Ce module couvre les stratégies de scaling (Data Center), la migration vers le cloud, et l'optimisation des instances à grande échelle.

### Jira Data Center vs Cloud

\`\`\`
┌───────────────────┬──────────────────┬──────────────────────┐
│ Critère           │ Data Center      │ Cloud                │
├───────────────────┼──────────────────┼──────────────────────┤
│ Hébergement       │ Self-managed     │ Atlassian-managed    │
│ Scaling           │ Nodes horizontaux│ Automatique          │
│ Personnalisation  │ Totale (plugins) │ Limitée (Forge apps) │
│ Maintenance       │ Votre charge     │ Incluse              │
│ Coût              │ Licence + infra  │ Abonnement/user      │
│ Compliance        │ Full control     │ SOC2, ISO            │
│ Performance       │ Vous optimisez   │ Atlassian optimise   │
│ Migration         │ Server → DC easy │ Server/DC → Cloud    │
│ Disaster Recovery │ À configurer     │ Inclus               │
│ Data Residency    │ Votre choix      │ Régions limitées     │
└───────────────────┴──────────────────┴──────────────────────┘
\`\`\`

### Architecture Data Center

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│            JIRA DATA CENTER CLUSTER                            │
│                                                               │
│         ┌───────────────────────────┐                        │
│         │      Load Balancer        │                        │
│         │    (HAProxy / AWS ALB)    │                        │
│         └─────────────┬─────────────┘                        │
│              ┌────────┼────────┐                             │
│              │        │        │                              │
│        ┌─────▼──┐ ┌──▼─────┐ ┌▼───────┐                   │
│        │ Node 1 │ │ Node 2 │ │ Node 3 │                   │
│        │ (Jira) │ │ (Jira) │ │ (Jira) │                   │
│        └────┬───┘ └───┬────┘ └───┬────┘                   │
│             │         │          │                           │
│        ┌────▼─────────▼──────────▼────┐                    │
│        │    Shared File System        │                    │
│        │    (NFS / EFS / Azure Files) │                    │
│        └──────────────┬───────────────┘                    │
│                       │                                      │
│        ┌──────────────▼───────────────┐                    │
│        │    Database (PostgreSQL)     │                    │
│        │    Primary + Read Replica    │                    │
│        └──────────────────────────────┘                    │
│                                                               │
│        ┌──────────────────────────────┐                    │
│        │    Ehcache / Hazelcast       │                    │
│        │    (Cluster cache)           │                    │
│        └──────────────────────────────┘                    │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Migration vers le Cloud

\`\`\`bash
# Étapes de migration Jira Server/DC vers Cloud

# 1. Évaluation pré-migration
# Jira Cloud Migration Assistant (JCMA)
# Installation: Administration > Find new apps > "Cloud Migration Assistant"

# 2. Vérification des apps/plugins
# Liste des apps sans équivalent Cloud
curl -H "Authorization: Basic \\\${TOKEN}" \\
  "https://company.atlassian.net/rest/plugins/1.0/" | \\
  jq '.plugins[] | {key: .key, name: .name, version: .version}'

# 3. Nettoyage pré-migration
# Supprimer les projets archivés
# Purger les pièces jointes obsolètes
# Désactiver les workflows non utilisés

# 4. Test de migration (dry-run)
# Utiliser un site cloud de test
# Migrer un projet pilote
# Vérifier : issues, historique, pièces jointes, liens

# 5. Migration production
# Fenêtre de maintenance planifiée
# Mode lecture seule sur l'ancien serveur
# Exécution de la migration
# Vérification post-migration
# Redirection DNS

# 6. Post-migration
# Former les utilisateurs aux différences Cloud
# Migrer les automatisations (ScriptRunner → Automation)
# Adapter les intégrations API (URLs changent)
\`\`\`

### Performance tuning

\`\`\`bash
# JVM tuning pour Jira Data Center
# setenv.sh
JVM_MINIMUM_MEMORY="4096m"
JVM_MAXIMUM_MEMORY="16384m"
JVM_SUPPORT_RECOMMENDED_ARGS="-XX:+UseG1GC -XX:MaxGCPauseMillis=200 -XX:+ParallelRefProcEnabled -XX:+ExplicitGCInvokesConcurrent"

# Paramètres de connexion database
# dbconfig.xml
<pool-min-size>20</pool-min-size>
<pool-max-size>100</pool-max-size>
<pool-max-idle>20</pool-max-idle>
<pool-remove-abandoned>true</pool-remove-abandoned>
<pool-remove-abandoned-timeout>300</pool-remove-abandoned-timeout>

# Index optimization
# Administration > System > Indexing > Re-index
# Planifier pendant les heures creuses

# Queries lentes - identifier via logs
grep "Long running" /var/atlassian/jira/log/atlassian-jira.log | \\
  awk -F'|' '{print $3}' | sort | uniq -c | sort -rn | head -20
\`\`\`

### Nettoyage et maintenance

\`\`\`bash
# Script de nettoyage Jira
#!/bin/bash
JIRA_URL="https://jira.company.com"
TOKEN="Basic \\\${ENCODED_CREDS}"

# Projets sans activité depuis 1 an
echo "=== Projets inactifs ==="
curl -s -H "Authorization: \\\${TOKEN}" \\
  "\\\${JIRA_URL}/rest/api/2/project" | \\
  jq -r '.[].key' | while read PROJECT; do
    LAST_ISSUE=$(curl -s -H "Authorization: \\\${TOKEN}" \\
      "\\\${JIRA_URL}/rest/api/2/search?jql=project=\\\${PROJECT}+ORDER+BY+updated+DESC&maxResults=1" | \\
      jq -r '.issues[0].fields.updated // "never"')
    echo "\\\${PROJECT}: dernière activité \\\${LAST_ISSUE}"
done

# Custom fields non utilisés
curl -s -H "Authorization: \\\${TOKEN}" \\
  "\\\${JIRA_URL}/rest/api/2/field" | \\
  jq '[.[] | select(.custom == true)] | length'

# Workflows avec 0 projets associés
echo "=== Workflows orphelins ==="
curl -s -H "Authorization: \\\${TOKEN}" \\
  "\\\${JIRA_URL}/rest/api/2/workflow" | \\
  jq '.[] | select(.steps == null) | .name'

# Schémas de notification excessifs
echo "=== Notifications excessives ==="
curl -s -H "Authorization: \\\${TOKEN}" \\
  "\\\${JIRA_URL}/rest/api/2/notificationscheme" | jq '.values | length'
\`\`\`

### Automatisation de la gouvernance

\`\`\`bash
# Rapport de santé hebdomadaire
#!/bin/bash
echo "=== Rapport Santé Jira - $(date) ==="
echo ""
echo "Utilisateurs actifs (30j): $(curl -s ... | jq '.total')"
echo "Issues créées cette semaine: $(curl -s ... | jq '.total')"
echo "Issues résolues cette semaine: $(curl -s ... | jq '.total')"
echo "Projets actifs: $(curl -s ... | jq '. | length')"
echo ""
echo "Espace disque attachments: $(du -sh /var/atlassian/jira/data/attachments)"
echo "Taille base de données: $(psql -c 'SELECT pg_size_pretty(pg_database_size(current_database()));')"
echo ""
echo "Top 5 projets par volume:"
# ...requête volume par projet
\`\`\``,
    practiceContent: `### TP1 : Architecture Data Center

Concevez l'architecture d'un cluster Jira Data Center pour 5000 utilisateurs. Dimensionnez : nombre de nodes, RAM/CPU par node, type de base de données, stockage partagé. Justifiez chaque choix et estimez le coût infrastructure annuel.

### TP2 : Plan de migration vers le Cloud

Utilisez le Cloud Migration Assistant sur votre instance. Documentez : apps incompatibles, custom fields à migrer, workflows complexes à adapter. Créez un plan de migration en 3 phases avec calendrier et critères Go/No-Go.

### TP3 : Performance tuning

Identifiez les problèmes de performance sur une instance Jira chargée. Analysez les logs pour trouver les requêtes lentes, optimisez la JVM, ajustez le pool de connexions, et re-indexez. Mesurez l'amélioration avant/après.

### TP4 : Nettoyage et gouvernance

Exécutez un audit complet de votre instance : projets inactifs, custom fields inutilisés, workflows orphelins, permissions excessives. Proposez un plan de nettoyage priorisé avec estimation du gain (performance, clarté, maintenance).`,
    keyPoints: JSON.stringify(['Data Center pour haute disponibilité avec cluster de nodes', 'Migration Cloud via Migration Assistant avec dry-run', 'Performance tuning JVM database et indexation', 'Nettoyage projets inactifs et custom fields orphelins', 'Gouvernance avec rapports de santé automatisés', 'Dimensionnement cluster selon nombre utilisateurs', 'Stratégie migration apps et automatisations vers Cloud', 'Monitoring performance avec analyse logs et métriques']),
  },


  {
    id: 'conf-06',
    courseId: 'confluence',
    title: 'Confluence pour les équipes techniques',
    duration: '3h',
    orderIndex: 6,
    theoryContent: `## Confluence pour les équipes techniques

### Introduction à la documentation technique dans Confluence

Confluence est devenu l'outil central de documentation pour les équipes techniques. Au-delà du wiki classique, il permet de créer des ADR (Architecture Decision Records), des runbooks opérationnels, des postmortems structurés, et de maintenir une documentation vivante liée au code.

### Architecture Decision Records (ADR)

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│            TEMPLATE ADR DANS CONFLUENCE                        │
│                                                               │
│  # ADR-{numero}: {titre de la décision}                      │
│                                                               │
│  ## Statut                                                    │
│  [Proposé | Accepté | Remplacé | Déprécié]                  │
│                                                               │
│  ## Contexte                                                  │
│  Quel est le problème ou la situation qui nécessite          │
│  une décision architecturale ?                               │
│                                                               │
│  ## Options considérées                                       │
│  | Option | Avantages | Inconvénients | Score |             │
│  |--------|-----------|---------------|-------|             │
│  | A      | ...       | ...           | 7/10  |             │
│  | B      | ...       | ...           | 5/10  |             │
│                                                               │
│  ## Décision                                                  │
│  Nous choisissons l'option X parce que...                    │
│                                                               │
│  ## Conséquences                                              │
│  - Positives: ...                                            │
│  - Négatives: ...                                            │
│  - Risques: ...                                              │
│                                                               │
│  ## Participants                                              │
│  - Décideur: @architecte                                     │
│  - Consultés: @team-backend                                  │
│  - Date: 2024-01-15                                          │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Runbooks opérationnels

\`\`\`
Structure d'un runbook :
├── Titre et version
├── Quand utiliser ce runbook
│   └── Conditions de déclenchement (alerte, symptômes)
├── Prérequis
│   ├── Accès requis (SSH, console, VPN)
│   ├── Outils nécessaires
│   └── Contacts d'escalation
├── Procédure pas à pas
│   ├── Étape 1: Diagnostic initial
│   │   └── Commandes de vérification
│   ├── Étape 2: Action corrective
│   │   └── Commandes avec variables
│   ├── Étape 3: Vérification post-action
│   │   └── Critères de succès
│   └── Étape 4: Communication
│       └── Template de message
├── Rollback
│   └── Procédure si l'action empire la situation
└── Historique des exécutions
    └── Tableau date/opérateur/résultat
\`\`\`

\`\`\`markdown
## Runbook: Base de données PostgreSQL saturée

### Déclencheur
Alerte: "PostgreSQL disk usage > 85%"

### Prérequis
- Accès SSH aux serveurs DB (demander via JSM si nécessaire)
- Rôle: superuser PostgreSQL
- Contact escalation: @dba-team (Slack #dba-support)

### Procédure

**Étape 1: Vérifier l'espace disque**
\\\`\\\`\\\`bash
df -h /var/lib/postgresql/
du -sh /var/lib/postgresql/14/main/*
\\\`\\\`\\\`

**Étape 2: Identifier les tables volumineuses**
\\\`\\\`\\\`sql
SELECT schemaname, tablename, 
       pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC 
LIMIT 10;
\\\`\\\`\\\`

**Étape 3: Nettoyage des WAL et vacuum**
\\\`\\\`\\\`bash
# Vérifier les WAL accumulés
ls -la /var/lib/postgresql/14/main/pg_wal/ | wc -l

# Forcer un checkpoint et vacuum
psql -c "CHECKPOINT;"
vacuumdb --all --analyze
\\\`\\\`\\\`

**Étape 4: Vérification**
- Espace disque < 75%
- Pas d'erreurs dans les logs PostgreSQL
- Application répond normalement

### Rollback
Si vacuum cause des locks prolongés:
\\\`\\\`\\\`bash
# Identifier et tuer le vacuum problématique
SELECT pid, query FROM pg_stat_activity WHERE query LIKE 'autovacuum%';
SELECT pg_cancel_backend(PID);
\\\`\\\`\\\`
\`\`\`

### Templates de postmortem

\`\`\`
## Postmortem: {Titre de l'incident}

**Date incident:** YYYY-MM-DD
**Durée:** Xh Ymin
**Impact:** Description de l'impact utilisateur
**Sévérité:** P1/P2/P3
**Auteur:** @ingénieur
**Réviseurs:** @team

### Résumé
2-3 phrases décrivant ce qui s'est passé.

### Timeline
| Heure | Événement |
|-------|-----------|
| 14:30 | Alerte CPU > 95% reçue |
| 14:35 | Investigation commence |
| 14:50 | Cause identifiée: requête N+1 |
| 15:00 | Fix déployé en production |
| 15:10 | Métriques revenues à la normale |

### Cause racine
Description technique de la cause fondamentale.

### Facteurs contributifs
- Code review n'a pas détecté le problème
- Pas de test de charge sur ce endpoint
- Monitoring insuffisant sur ce service

### Actions correctives
| Action | Responsable | Deadline | Ticket |
|--------|-------------|----------|--------|
| Ajouter test de charge | @dev | 2024-02-01 | PROJ-456 |
| Améliorer monitoring | @devops | 2024-01-30 | OPS-789 |
| Revoir process CR | @lead | 2024-02-15 | PROC-12 |

### Leçons apprises
- Ce qui a bien fonctionné
- Ce qui peut être amélioré
- Où nous avons eu de la chance
\`\`\`

### Documentation as Code

\`\`\`bash
# Synchronisation docs depuis Git vers Confluence
# Utiliser l'outil "Mark" ou "Confluence Publisher"

# Installation mark (Markdown to Confluence)
go install github.com/kovetskiy/mark@latest

# Configuration .markrc
username = "user@company.com"
password = "api-token"
base_url = "https://company.atlassian.net/wiki"

# En-tête du fichier Markdown pour ciblage Confluence
# <!-- Space: DEVOPS -->
# <!-- Parent: Architecture -->
# <!-- Title: ADR-042: Choix de message broker -->

# Publication
mark -f docs/adr/adr-042.md

# Intégration CI/CD - publier les docs à chaque merge
# .github/workflows/docs.yml
# on push to main: mark -f docs/**/*.md
\`\`\`

### Organisation des espaces techniques

\`\`\`
Structure recommandée :
├── Espace: Engineering
│   ├── Architecture
│   │   ├── ADRs (Architecture Decision Records)
│   │   ├── Diagrammes C4 et séquence
│   │   └── API Contracts
│   ├── Runbooks
│   │   ├── Par service (auth, api, worker...)
│   │   └── Par type (database, network, deploy)
│   ├── Postmortems
│   │   ├── 2024 (par date)
│   │   └── Index par service impacté
│   ├── Onboarding
│   │   ├── Setup environnement dev
│   │   ├── Architecture overview
│   │   └── Process et conventions
│   └── RFC (Request for Comments)
│       ├── En cours de discussion
│       └── Archivées
\`\`\``,
    practiceContent: `### TP1 : Création d'un système ADR

Créez un espace Confluence dédié aux ADRs. Implémentez le template avec numérotation automatique. Rédigez 3 ADRs couvrant des décisions réelles de votre projet. Ajoutez un index avec statuts et liens, et configurez les notifications pour les nouvelles ADRs.

### TP2 : Runbooks opérationnels

Rédigez 5 runbooks couvrant les incidents les plus fréquents de votre infrastructure. Incluez des commandes copy-paste, des screenshots annotés, et des critères de succès mesurables. Testez chaque runbook en simulation et corrigez les ambiguïtés.

### TP3 : Documentation as Code

Configurez la publication automatique de documentation Markdown depuis votre dépôt Git vers Confluence. Utilisez mark ou un outil similaire. Intégrez dans votre CI/CD pour que chaque merge sur main mette à jour les pages Confluence automatiquement.

### TP4 : Template postmortem et processus

Créez le template de postmortem dans Confluence. Rédigez un postmortem pour un incident récent en suivant le format blameless. Organisez une revue d'équipe et créez les tickets d'actions correctives liés au postmortem dans Jira.`,
    keyPoints: JSON.stringify(['ADR templates pour tracer les décisions architecturales', 'Runbooks structurés avec commandes et critères de succès', 'Postmortems blameless avec timeline et actions correctives', 'Documentation as Code avec sync Git vers Confluence', 'Organisation par espace architecture runbooks et RFC', 'Templates réutilisables pour standardiser la documentation', 'Intégration CI/CD pour publication automatique', 'Liens bidirectionnels avec Jira pour traçabilité actions']),
  },


  {
    id: 'conf-07',
    courseId: 'confluence',
    title: 'Automatisation Confluence',
    duration: '3h',
    orderIndex: 7,
    theoryContent: `## Automatisation Confluence

### Introduction à l'automatisation

L'automatisation de Confluence permet de réduire les tâches répétitives : création de pages à partir de templates, mise à jour automatique de tableaux de bord, archivage programmé, et workflows d'approbation. ScriptRunner, les automatisations natives et l'API REST sont les outils principaux.

### API REST Confluence

\`\`\`bash
# Créer une page
curl -X POST \\
  -H "Authorization: Basic \\\${CONFLUENCE_TOKEN}" \\
  -H "Content-Type: application/json" \\
  "https://company.atlassian.net/wiki/rest/api/content" \\
  -d '{
    "type": "page",
    "title": "Sprint 45 - Retrospective",
    "space": {"key": "TEAM"},
    "ancestors": [{"id": "123456"}],
    "body": {
      "storage": {
        "value": "<h2>Ce qui a bien fonctionné</h2><ul><li></li></ul><h2>À améliorer</h2><ul><li></li></ul>",
        "representation": "storage"
      }
    }
  }'

# Mettre à jour une page existante
curl -X PUT \\
  -H "Authorization: Basic \\\${CONFLUENCE_TOKEN}" \\
  -H "Content-Type: application/json" \\
  "https://company.atlassian.net/wiki/rest/api/content/789012" \\
  -d '{
    "version": {"number": 2},
    "title": "Page mise à jour",
    "type": "page",
    "body": {
      "storage": {
        "value": "<p>Contenu actualisé automatiquement le '"$(date)"'</p>",
        "representation": "storage"
      }
    }
  }'

# Rechercher des pages
curl -H "Authorization: Basic \\\${CONFLUENCE_TOKEN}" \\
  "https://company.atlassian.net/wiki/rest/api/content/search?cql=space=TEAM+AND+type=page+AND+title~sprint" | \\
  jq '.results[] | {id, title: .title}'

# Obtenir les enfants d'une page
curl -H "Authorization: Basic \\\${CONFLUENCE_TOKEN}" \\
  "https://company.atlassian.net/wiki/rest/api/content/123456/child/page?limit=50" | \\
  jq '.results[] | {id, title: .title, lastModified: .version.when}'
\`\`\`

### ScriptRunner pour Confluence

\`\`\`groovy
// ScriptRunner - Création automatique de pages de sprint
import com.atlassian.confluence.pages.Page
import com.atlassian.confluence.pages.PageManager
import com.atlassian.confluence.spaces.SpaceManager

def pageManager = ComponentLocator.getComponent(PageManager)
def spaceManager = ComponentLocator.getComponent(SpaceManager)

def space = spaceManager.getSpace("TEAM")
def parentPage = pageManager.getPage(space, "Sprints 2024")

// Créer la page de sprint
def sprintNumber = 45
def page = new Page()
page.setTitle("Sprint \${sprintNumber} - Planning")
page.setSpace(space)
page.setParentPage(parentPage)
page.setBodyAsString("""
<h2>Objectifs du Sprint</h2>
<ac:task-list>
  <ac:task><ac:task-body>Objectif 1</ac:task-body></ac:task>
  <ac:task><ac:task-body>Objectif 2</ac:task-body></ac:task>
</ac:task-list>
<h2>Capacité</h2>
<table>
  <tr><th>Membre</th><th>Jours dispo</th><th>Points</th></tr>
</table>
""")

pageManager.saveContentEntity(page, null)
\`\`\`

### Workflows d'approbation

\`\`\`
Workflow de publication documentation :

┌────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Draft  │───▶│ In Review│───▶│ Approved │───▶│Published │
└────────┘    └─────┬────┘    └──────────┘    └──────────┘
                    │
                    ▼
              ┌──────────┐
              │ Rejected │──── (retour Draft)
              └──────────┘

Configuration :
- Draft: auteur peut éditer
- In Review: reviewer notifié, page verrouillée
- Approved: label "approved" ajouté
- Published: page déplacée vers espace public
\`\`\`

### Tâches planifiées (Scheduled tasks)

\`\`\`bash
# Script cron pour rapport hebdomadaire automatique
#!/bin/bash
# Exécuté chaque lundi à 8h00

CONFLUENCE_URL="https://company.atlassian.net/wiki"
TOKEN="Basic \\\${ENCODED_CREDS}"
PARENT_PAGE_ID="456789"
SPACE_KEY="REPORTS"

# Collecter les données de la semaine
WEEK=$(date +%Y-W%V)
ISSUES_CREATED=$(curl -s -H "Authorization: Basic \\\${JIRA_TOKEN}" \\
  "https://company.atlassian.net/rest/api/3/search?jql=created>=startOfWeek(-1)+AND+created<startOfWeek()" | \\
  jq '.total')
ISSUES_RESOLVED=$(curl -s -H "Authorization: Basic \\\${JIRA_TOKEN}" \\
  "https://company.atlassian.net/rest/api/3/search?jql=resolved>=startOfWeek(-1)+AND+resolved<startOfWeek()" | \\
  jq '.total')

# Créer la page de rapport
CONTENT="<h2>Rapport Semaine \\\${WEEK}</h2>
<table>
<tr><td>Issues créées</td><td>\\\${ISSUES_CREATED}</td></tr>
<tr><td>Issues résolues</td><td>\\\${ISSUES_RESOLVED}</td></tr>
<tr><td>Ratio</td><td>$(echo "scale=1; \\\${ISSUES_RESOLVED}/\\\${ISSUES_CREATED}*100" | bc)%</td></tr>
</table>"

curl -X POST \\
  -H "Authorization: \\\${TOKEN}" \\
  -H "Content-Type: application/json" \\
  "\\\${CONFLUENCE_URL}/rest/api/content" \\
  -d "{
    \\"type\\": \\"page\\",
    \\"title\\": \\"Rapport \\\${WEEK}\\",
    \\"space\\": {\\"key\\": \\"\\\${SPACE_KEY}\\"},
    \\"ancestors\\": [{\\"id\\": \\"\\\${PARENT_PAGE_ID}\\"}],
    \\"body\\": {\\"storage\\": {\\"value\\": \\"\\\${CONTENT}\\", \\"representation\\": \\"storage\\"}}
  }"
\`\`\`

### Opérations en masse (Bulk operations)

\`\`\`bash
# Déplacer toutes les pages d'un espace vers un autre
#!/bin/bash
SOURCE_SPACE="OLD_DOCS"
TARGET_SPACE="NEW_DOCS"
TARGET_PARENT="987654"

# Obtenir toutes les pages de l'espace source
PAGES=$(curl -s -H "Authorization: Basic \\\${TOKEN}" \\
  "\\\${CONFLUENCE_URL}/rest/api/content?spaceKey=\\\${SOURCE_SPACE}&type=page&limit=200" | \\
  jq -r '.results[] | .id')

for PAGE_ID in \\\${PAGES}; do
    # Déplacer la page
    curl -X PUT -H "Authorization: Basic \\\${TOKEN}" \\
      -H "Content-Type: application/json" \\
      "\\\${CONFLUENCE_URL}/rest/api/content/\\\${PAGE_ID}" \\
      -d "{
        \\"version\\": {\\"number\\": \$(curl -s -H \\"Authorization: Basic \\\${TOKEN}\\" \\
          \\"\\\${CONFLUENCE_URL}/rest/api/content/\\\${PAGE_ID}\\" | jq '.version.number + 1')},
        \\"ancestors\\": [{\\"id\\": \\"\\\${TARGET_PARENT}\\"}],
        \\"type\\": \\"page\\"
      }"
    echo "Page \\\${PAGE_ID} déplacée"
done

# Ajouter un label à toutes les pages d'une arborescence
add_label_recursive() {
    local PARENT_ID=$1
    local LABEL=$2
    
    CHILDREN=$(curl -s -H "Authorization: Basic \\\${TOKEN}" \\
      "\\\${CONFLUENCE_URL}/rest/api/content/\\\${PARENT_ID}/child/page" | \\
      jq -r '.results[].id')
    
    for CHILD in \\\${CHILDREN}; do
        curl -X POST -H "Authorization: Basic \\\${TOKEN}" \\
          -H "Content-Type: application/json" \\
          "\\\${CONFLUENCE_URL}/rest/api/content/\\\${CHILD}/label" \\
          -d "[{\\"prefix\\": \\"global\\", \\"name\\": \\"\\\${LABEL}\\"}]"
        add_label_recursive \\\${CHILD} \\\${LABEL}
    done
}
\`\`\``,
    practiceContent: `### TP1 : Création automatique de pages de sprint

Développez un script qui crée automatiquement les pages de sprint (planning, daily notes, retro) à partir d'un template. Déclenchez-le à chaque début de sprint. Incluez les données Jira (capacité, objectifs) directement dans la page.

### TP2 : Workflow d'approbation documentation

Implémentez un workflow d'approbation pour les pages de documentation technique : soumission, revue (avec commentaires), approbation, publication. Utilisez les labels et restrictions Confluence pour gérer les transitions.

### TP3 : Rapports automatisés hebdomadaires

Créez un script cron qui génère chaque lundi un rapport combinant : métriques Jira (velocity, bugs), métriques SonarQube (couverture, dette), et statut des déploiements. Publiez-le automatiquement dans Confluence avec graphiques.

### TP4 : Migration et réorganisation en masse

Écrivez un script qui réorganise un espace Confluence entier : déplace les pages selon une nouvelle arborescence, ajoute des labels manquants, archive les pages non modifiées depuis 1 an, et génère un rapport des pages orphelines (sans parent logique).`,
    keyPoints: JSON.stringify(['API REST pour création mise à jour et recherche de pages', 'ScriptRunner pour automatisations complexes côté serveur', 'Workflows approbation avec labels et restrictions', 'Tâches planifiées pour rapports hebdomadaires automatiques', 'Opérations bulk pour déplacement et labeling en masse', 'CQL Confluence Query Language pour recherches avancées', 'Intégration Jira pour données dynamiques dans les pages', 'Templates programmables pour standardisation documentation']),
  },


  {
    id: 'conf-08',
    courseId: 'confluence',
    title: 'Analytics et gouvernance',
    duration: '3h',
    orderIndex: 8,
    theoryContent: `## Analytics et gouvernance Confluence

### Introduction à la gouvernance Confluence

Sans gouvernance, Confluence devient rapidement un cimetière de documentation obsolète. L'analytics et la gouvernance permettent de mesurer l'utilisation réelle, identifier les contenus à archiver, et maintenir un wiki sain et utile pour les équipes.

### Analytics des pages

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│            MÉTRIQUES CONFLUENCE                                │
│                                                               │
│  ┌────────────────────────────────────────────────┐         │
│  │  Page: "Architecture Microservices"             │         │
│  │  Vues (30j): 342    Vues uniques: 89           │         │
│  │  Likes: 12          Commentaires: 5            │         │
│  │  Dernière mise à jour: il y a 15 jours         │         │
│  │  Auteur: @architecte                           │         │
│  └────────────────────────────────────────────────┘         │
│                                                               │
│  Tendance de consultation :                                   │
│  50 ┤      ╱╲                                                │
│  40 ┤     ╱  ╲    ╱╲                                       │
│  30 ┤    ╱    ╲  ╱  ╲                                      │
│  20 ┤   ╱      ╲╱    ╲                                     │
│  10 ┤  ╱                ╲                                    │
│     └──┬──┬──┬──┬──┬──┬──                                  │
│       L  M  M  J  V  S  D                                   │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Extraction des analytics via API

\`\`\`bash
# Obtenir les analytics d'une page
curl -H "Authorization: Basic \\\${TOKEN}" \\
  "https://company.atlassian.net/wiki/rest/api/content/123456/analytics?fromDate=2024-01-01&toDate=2024-01-31" | \\
  jq '{views: .views.count, uniqueViews: .views.uniqueCount}'

# Pages les plus consultées d'un espace
curl -H "Authorization: Basic \\\${TOKEN}" \\
  "https://company.atlassian.net/wiki/rest/api/analytics/content/top?spaceKey=TEAM&limit=20&fromDate=2024-01-01" | \\
  jq '.results[] | {title: .content.title, views: .views}'

# Pages jamais consultées (candidates à l'archivage)
#!/bin/bash
SPACE="TEAM"
ALL_PAGES=$(curl -s -H "Authorization: Basic \\\${TOKEN}" \\
  "\\\${CONFLUENCE_URL}/rest/api/content?spaceKey=\\\${SPACE}&type=page&limit=500" | \\
  jq -r '.results[] | "\\(.id)|\\(.title)"')

echo "Pages sans vue depuis 90 jours:"
echo "\\\${ALL_PAGES}" | while IFS='|' read ID TITLE; do
    VIEWS=$(curl -s -H "Authorization: Basic \\\${TOKEN}" \\
      "\\\${CONFLUENCE_URL}/rest/api/content/\\\${ID}/analytics?fromDate=$(date -d '-90 days' +%Y-%m-%d)" | \\
      jq '.views.count // 0')
    if [ "\\\${VIEWS}" -eq 0 ]; then
        echo "  [0 vues] \\\${TITLE} (ID: \\\${ID})"
    fi
done
\`\`\`

### Nettoyage des espaces

\`\`\`bash
# Script d'audit d'un espace Confluence
#!/bin/bash
SPACE="ENGINEERING"
CONFLUENCE_URL="https://company.atlassian.net/wiki"
TOKEN="Basic \\\${ENCODED_CREDS}"

echo "=== Audit Espace \\\${SPACE} ==="

# Nombre total de pages
TOTAL=$(curl -s -H "Authorization: \\\${TOKEN}" \\
  "\\\${CONFLUENCE_URL}/rest/api/content?spaceKey=\\\${SPACE}&type=page&limit=0" | \\
  jq '.size')
echo "Pages totales: \\\${TOTAL}"

# Pages non modifiées depuis 1 an
OLD_PAGES=$(curl -s -H "Authorization: \\\${TOKEN}" \\
  "\\\${CONFLUENCE_URL}/rest/api/content/search?cql=space=\\\${SPACE}+AND+type=page+AND+lastModified<now('-365d')&limit=500" | \\
  jq '.size')
echo "Pages > 1 an sans modification: \\\${OLD_PAGES}"

# Pages sans label
UNLABELED=$(curl -s -H "Authorization: \\\${TOKEN}" \\
  "\\\${CONFLUENCE_URL}/rest/api/content/search?cql=space=\\\${SPACE}+AND+type=page+AND+label+is+null&limit=500" | \\
  jq '.size')
echo "Pages sans label: \\\${UNLABELED}"

# Taille des pièces jointes
echo "Top 10 pages par taille d'attachments:"
curl -s -H "Authorization: \\\${TOKEN}" \\
  "\\\${CONFLUENCE_URL}/rest/api/content/search?cql=space=\\\${SPACE}+AND+type=attachment&limit=100" | \\
  jq '.results | group_by(.container.id) | map({page: .[0].container.title, count: length}) | sort_by(-.count) | .[0:10]'
\`\`\`

### Conformité et archivage

\`\`\`bash
# Politique d'archivage automatique
#!/bin/bash
# Exécuté mensuellement

ARCHIVE_SPACE="ARCHIVE"
ARCHIVE_PARENT_ID="111222"

# Trouver les pages à archiver (critères multiples)
CANDIDATES=$(curl -s -H "Authorization: Basic \\\${TOKEN}" \\
  "\\\${CONFLUENCE_URL}/rest/api/content/search?cql=space=TEAM+AND+type=page+AND+lastModified<now('-365d')+AND+label!=keep" | \\
  jq -r '.results[] | "\\(.id)|\\(.title)"')

echo "Pages candidates à l'archivage:"
echo "\\\${CANDIDATES}" | while IFS='|' read ID TITLE; do
    echo "  Archivage: \\\${TITLE}"
    
    # Ajouter le label "archived"
    curl -X POST -H "Authorization: Basic \\\${TOKEN}" \\
      -H "Content-Type: application/json" \\
      "\\\${CONFLUENCE_URL}/rest/api/content/\\\${ID}/label" \\
      -d '[{"prefix": "global", "name": "archived"}]'
    
    # Option: déplacer vers espace archives
    # curl -X PUT ... (move page to archive space)
done

# Rapport de conformité
echo ""
echo "=== Rapport Conformité ==="
echo "Pages avec label 'confidential' sans restriction d'accès:"
curl -s -H "Authorization: Basic \\\${TOKEN}" \\
  "\\\${CONFLUENCE_URL}/rest/api/content/search?cql=space=TEAM+AND+label=confidential" | \\
  jq -r '.results[] | .id' | while read ID; do
    RESTRICTIONS=$(curl -s -H "Authorization: Basic \\\${TOKEN}" \\
      "\\\${CONFLUENCE_URL}/rest/api/content/\\\${ID}/restriction" | jq '.results | length')
    if [ "\\\${RESTRICTIONS}" -eq 0 ]; then
        TITLE=$(curl -s -H "Authorization: Basic \\\${TOKEN}" \\
          "\\\${CONFLUENCE_URL}/rest/api/content/\\\${ID}" | jq -r '.title')
        echo "  ALERTE: '\\\${TITLE}' marquée confidentielle mais sans restriction!"
    fi
done
\`\`\`

### Gouvernance des espaces

\`\`\`
Règles de gouvernance recommandées :
┌─────────────────────────────┬────────────────────────────────┐
│ Règle                       │ Automatisation                 │
├─────────────────────────────┼────────────────────────────────┤
│ Chaque page a un owner      │ Alert si créateur a quitté     │
│ Labels obligatoires         │ Rapport pages sans label       │
│ Revue annuelle              │ Notification à l'anniversaire  │
│ Archivage après 18 mois     │ Script mensuel d'archivage    │
│ Pas de duplication          │ Détection titres similaires    │
│ Nomenclature respectée      │ Validation titre via API       │
│ Confidentialité correcte    │ Audit restrictions mensuelles  │
│ Templates utilisés          │ Rapport pages hors template    │
└─────────────────────────────┴────────────────────────────────┘
\`\`\`

### Dashboard de santé d'espace

\`\`\`bash
# Génération d'un rapport de santé mensuel
#!/bin/bash
SPACE="ENGINEERING"

# Score de santé (0-100)
TOTAL_PAGES=$(get_metric "total_pages")
STALE_PAGES=$(get_metric "pages_not_updated_180d")
UNLABELED=$(get_metric "pages_without_labels")
ORPHANS=$(get_metric "pages_without_views_90d")

STALE_RATIO=$(echo "scale=2; \\\${STALE_PAGES} / \\\${TOTAL_PAGES} * 100" | bc)
HEALTH_SCORE=$(echo "100 - \\\${STALE_RATIO} - (\\\${UNLABELED} / \\\${TOTAL_PAGES} * 50)" | bc)

echo "Score de santé espace \\\${SPACE}: \\\${HEALTH_SCORE}/100"
echo "  Pages obsolètes (>180j): \\\${STALE_PAGES} (\\\${STALE_RATIO}%)"
echo "  Pages sans label: \\\${UNLABELED}"
echo "  Pages orphelines: \\\${ORPHANS}"
\`\`\``,
    practiceContent: `### TP1 : Audit complet d'un espace

Exécutez un audit complet d'un espace Confluence de production : nombre de pages par âge, taux de pages consultées, pages sans owner (créateur parti), pages dupliquées. Produisez un rapport avec recommandations priorisées.

### TP2 : Politique d'archivage automatisée

Implémentez une politique d'archivage : notification aux owners 2 semaines avant archivage, label "keep" pour protéger une page, déplacement vers un espace archives, et rapport des pages archivées ce mois. Testez sur un espace de dev.

### TP3 : Dashboard de gouvernance

Créez un dashboard (page Confluence ou Grafana) montrant la santé des espaces : score global, tendance de pages obsolètes, top contributeurs, espaces en déclin. Automatisez la mise à jour hebdomadaire des métriques.

### TP4 : Conformité et sécurité

Auditez les restrictions d'accès : pages marquées confidentielles sans restriction, espaces ouverts à "tout le monde", pages avec des informations sensibles (regex sur mots de passe, tokens). Générez un rapport de conformité et corrigez les problèmes.`,
    keyPoints: JSON.stringify(['Analytics de consultation pour mesurer utilité des pages', 'Identification pages obsolètes et candidates archivage', 'Audit automatisé labels restrictions et owners', 'Politique archivage avec notification et protection', 'Score de santé par espace pour pilotage gouvernance', 'Détection pages confidentielles sans restriction accès', 'Rapports mensuels de conformité automatisés', 'Règles de gouvernance avec automatisation associée']),
  },


  {
    id: 'bb-06',
    courseId: 'bitbucket',
    title: 'Code Review avancé',
    duration: '3h',
    orderIndex: 6,
    theoryContent: `## Code Review avancé dans Bitbucket

### Introduction au code review efficace

Le code review est l'un des processus les plus impactants pour la qualité logicielle. Bitbucket offre des fonctionnalités avancées pour structurer les revues : CODEOWNERS, auto-reviewers, merge checks, et stratégies de merge configurables par branche.

### CODEOWNERS

\`\`\`bash
# Fichier CODEOWNERS (à la racine du dépôt)
# Syntaxe: pattern @user-ou-equipe

# Propriétaires par défaut pour tout le repo
* @team-leads

# Backend Java
backend/src/main/** @backend-team @senior-java-dev
backend/src/test/** @backend-team

# Frontend React
frontend/src/components/** @frontend-team
frontend/src/hooks/** @frontend-team @react-expert
frontend/src/styles/** @design-system-team

# Infrastructure
terraform/** @devops-team @security-team
docker/** @devops-team
.github/workflows/** @devops-team @team-leads

# Configuration sensible
**/security/** @security-team
**/auth/** @security-team @backend-team

# Documentation
docs/** @tech-writers @team-leads
*.md @tech-writers

# Database migrations
**/migrations/** @dba-team @backend-team
\`\`\`

### Auto-reviewers et merge checks

\`\`\`
Configuration des merge checks :
┌─────────────────────────────────────────────────────────────┐
│ Branch: main                                                  │
│                                                               │
│ ☑ Minimum approvals: 2                                       │
│ ☑ No unresolved tasks                                        │
│ ☑ Minimum successful builds: 1                               │
│ ☑ No changes requested                                       │
│ ☑ All code owners approved                                   │
│ ☑ No incomplete merge checks                                │
│                                                               │
│ Branch: develop                                               │
│                                                               │
│ ☑ Minimum approvals: 1                                       │
│ ☑ Minimum successful builds: 1                               │
│ □ No changes requested (désactivé pour dev)                  │
└─────────────────────────────────────────────────────────────┘

Auto-reviewers rules:
- Si le PR modifie des fichiers .tf → ajouter @devops-team
- Si le PR modifie des migrations → ajouter @dba-team
- Si le PR a plus de 500 lignes → ajouter @architect
- Si le PR touche /security/ → ajouter @security-lead
\`\`\`

### Stratégies de merge

\`\`\`
┌────────────────────┬──────────────────────────────────────────┐
│ Stratégie          │ Usage recommandé                         │
├────────────────────┼──────────────────────────────────────────┤
│ Merge commit       │ Historique complet, traçabilité PR       │
│ Squash             │ Features complexes → 1 commit propre    │
│ Fast-forward only  │ Branches linéaires, historique minimal   │
│ Rebase + merge     │ Historique linéaire avec merge commits   │
└────────────────────┴──────────────────────────────────────────┘

Configuration par branche :
- main: Squash only (historique propre)
- develop: Merge commit (traçabilité)
- release/*: Fast-forward only (stabilité)
- feature/*: Libre choix du développeur
\`\`\`

### Workflow de review structuré

\`\`\`
Processus de code review recommandé :

1. Auteur crée le PR
   ├── Description claire avec contexte
   ├── Checklist de self-review complétée
   ├── Tests passent en CI
   └── Taille < 400 lignes (idéalement < 200)

2. Auto-assignment des reviewers
   ├── CODEOWNERS notifiés automatiquement
   ├── Round-robin pour équilibrer la charge
   └── Reviewer spécialisé si fichiers sensibles

3. Review
   ├── Reviewer vérifie en < 24h (SLA)
   ├── Commentaires constructifs et spécifiques
   ├── Suggestions de code inline
   └── Approve / Request changes / Comment

4. Itération
   ├── Auteur adresse les commentaires
   ├── Résolution des tâches
   └── Re-request review si major changes

5. Merge
   ├── Tous les checks passent (CI + approvals)
   ├── Branche source supprimée automatiquement
   └── Notification à l'équipe
\`\`\`

### Commentaires de review efficaces

\`\`\`markdown
# Bons patterns de commentaires

## Suggestion de code (inline)
\\\`\\\`\\\`suggestion
// Utiliser Optional au lieu de null check
return Optional.ofNullable(user)
    .map(User::getEmail)
    .orElse("unknown");
\\\`\\\`\\\`

## Question (non-bloquant)
> nit: Pourquoi ce choix plutôt que X ?
> Je suis curieux du raisonnement, pas bloquant.

## Problème (bloquant)
> **blocker**: Cette requête est vulnérable à l'injection SQL.
> Utiliser des paramètres préparés à la place.

## Praise (encouragement)
> **nice**: Excellente utilisation du pattern Strategy ici !
> Ça rend le code très extensible.

# Préfixes recommandés pour l'équipe
- nit: cosmétique, non bloquant
- suggestion: amélioration optionnelle
- question: demande de clarification
- blocker: doit être corrigé avant merge
- nice: bon travail à souligner
\`\`\`

### Métriques de code review

\`\`\`bash
# Extraire les métriques de review via API Bitbucket
# Temps moyen avant première review
curl -H "Authorization: Bearer \\\${BB_TOKEN}" \\
  "https://api.bitbucket.org/2.0/repositories/company/project/pullrequests?state=MERGED&pagelen=50" | \\
  jq '[.values[] | {
    created: .created_on,
    first_comment: (.participants[] | select(.role == "REVIEWER") | .participated_on) // null,
    merged: .updated_on
  }]'

# Taille moyenne des PRs (lignes modifiées)
curl -H "Authorization: Bearer \\\${BB_TOKEN}" \\
  "https://api.bitbucket.org/2.0/repositories/company/project/pullrequests/42/diffstat" | \\
  jq '[.values[] | .lines_added + .lines_removed] | add'

# PRs en attente depuis plus de 48h
curl -H "Authorization: Bearer \\\${BB_TOKEN}" \\
  "https://api.bitbucket.org/2.0/repositories/company/project/pullrequests?state=OPEN" | \\
  jq '[.values[] | select((.created_on | fromdate) < (now - 172800))] | length'
\`\`\``,
    practiceContent: `### TP1 : Configuration CODEOWNERS complète

Créez un fichier CODEOWNERS pour un projet avec : backend (3 équipes par domaine), frontend (2 équipes), infra, et sécurité. Testez que les bons reviewers sont assignés automatiquement pour chaque type de modification.

### TP2 : Merge checks et branch permissions

Configurez les merge checks pour 3 branches (main, develop, release). Implémentez des règles différenciées : main nécessite 2 approvals + CODEOWNERS + CI, develop 1 approval + CI, release fast-forward seulement. Testez chaque scénario.

### TP3 : Métriques de review et SLA

Développez un script qui collecte les métriques de code review : temps de première réponse, nombre d'itérations moyen, taille des PRs, charge par reviewer. Définissez des SLA (review < 24h) et créez des alertes quand ils sont dépassés.

### TP4 : Guide de code review pour l'équipe

Rédigez un guide de code review incluant : conventions de commentaires (préfixes), checklist de review par type de PR, exemples de bons et mauvais commentaires. Intégrez-le dans le template de PR et mesurez l'adoption sur 1 mois.`,
    keyPoints: JSON.stringify(['CODEOWNERS pour assignation automatique de reviewers par zone', 'Merge checks configurables par branche avec approvals minimum', 'Stratégies de merge adaptées au type de branche', 'Auto-reviewers basés sur les fichiers modifiés', 'Conventions de commentaires avec préfixes nit blocker suggestion', 'Métriques de review temps réponse et charge par reviewer', 'SLA de review avec alertes pour PRs en attente', 'Taille de PR optimale inférieure à 400 lignes']),
  },


  {
    id: 'bb-07',
    courseId: 'bitbucket',
    title: 'Bitbucket et Jira intégration profonde',
    duration: '3h',
    orderIndex: 7,
    theoryContent: `## Bitbucket et Jira - Intégration profonde

### Introduction à l'intégration Bitbucket-Jira

L'intégration entre Bitbucket et Jira va bien au-delà du simple lien. Le Dev Panel de Jira, les Smart Commits, l'automation, et la création de branches depuis les tickets forment un écosystème où le code et la gestion de projet sont intimement liés.

### Dev Panel dans Jira

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│  JIRA ISSUE: PROJ-123 - Implémenter l'authentification 2FA  │
│                                                               │
│  ┌───────────────────────────────────────────────────┐      │
│  │  DEVELOPMENT PANEL                                 │      │
│  │                                                     │      │
│  │  Branches:                                          │      │
│  │  └── feature/PROJ-123-2fa-auth (Bitbucket)         │      │
│  │                                                     │      │
│  │  Commits (3):                                       │      │
│  │  ├── abc1234 "PROJ-123: Add TOTP generation"       │      │
│  │  ├── def5678 "PROJ-123: Add QR code display"       │      │
│  │  └── ghi9012 "PROJ-123: Add backup codes"          │      │
│  │                                                     │      │
│  │  Pull Requests:                                     │      │
│  │  └── PR #42: "feat: 2FA authentication" (OPEN)     │      │
│  │      2 approvals, CI passing                        │      │
│  │                                                     │      │
│  │  Deployments:                                       │      │
│  │  ├── staging: deployed 2h ago ✓                    │      │
│  │  └── production: pending                            │      │
│  └───────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Smart Commits

\`\`\`bash
# Format des Smart Commits
# ISSUE_KEY #command parameter

# Transitionner un ticket
git commit -m "PROJ-123 #done Implémentation complète du 2FA"
git commit -m "PROJ-123 #in-progress Début du développement"
git commit -m "PROJ-123 #code-review PR prête pour review"

# Logger du temps
git commit -m "PROJ-123 #time 2h 30m Développement module TOTP"
git commit -m "PROJ-123 #time 1h Tests unitaires"

# Ajouter un commentaire
git commit -m "PROJ-123 #comment Nécessite mise à jour de la doc API"

# Combiner plusieurs actions
git commit -m "PROJ-123 #time 3h #comment Fix edge case tokens expirés #done"

# Plusieurs tickets dans un commit
git commit -m "PROJ-123 PROJ-124 #done Implémentation 2FA et notification email"
\`\`\`

### Automation Rules Bitbucket-Jira

\`\`\`
Règles d'automatisation recommandées :

1. Quand un PR est créé → Transitionner le ticket en "In Review"
   Trigger: Pull Request Created
   Condition: PR title contains issue key
   Action: Transition issue to "In Review"

2. Quand un PR est mergé → Transitionner en "Done"
   Trigger: Pull Request Merged
   Condition: Target branch = main
   Action: Transition issue to "Done"
   Action: Add comment "Merged via PR #{{pullRequest.id}}"

3. Quand une branche est créée → Transitionner en "In Progress"
   Trigger: Branch Created
   Condition: Branch name matches "feature/PROJ-*"
   Action: Transition issue to "In Progress"
   Action: Assign to branch creator

4. Quand un déploiement réussit → Notifier
   Trigger: Deployment Successful
   Condition: Environment = production
   Action: Add comment "Déployé en production"
   Action: Add label "deployed"

5. Quand le build échoue → Alerter
   Trigger: Build Failed
   Condition: Branch = main OR develop
   Action: Create subtask "Fix broken build"
   Action: Assign to last committer
\`\`\`

### Création de branches depuis Jira

\`\`\`bash
# Convention de nommage automatique
# Depuis Jira: bouton "Create branch" sur un ticket

# Patterns configurés :
# Bug: bugfix/PROJ-123-description-courte
# Story: feature/PROJ-123-description-courte  
# Task: task/PROJ-123-description-courte
# Hotfix: hotfix/PROJ-123-description-courte

# Configuration dans Bitbucket Repository Settings > Branching model
# Production branch: main
# Development branch: develop
# Branch prefixes:
#   Feature: feature/
#   Bugfix: bugfix/
#   Hotfix: hotfix/
#   Release: release/

# API pour créer une branche liée à un ticket
curl -X POST \\
  -H "Authorization: Bearer \\\${BB_TOKEN}" \\
  -H "Content-Type: application/json" \\
  "https://api.bitbucket.org/2.0/repositories/company/project/refs/branches" \\
  -d '{
    "name": "feature/PROJ-123-2fa-auth",
    "target": {"hash": "develop"}
  }'
\`\`\`

### Déploiements et traçabilité

\`\`\`yaml
# bitbucket-pipelines.yml avec tracking des déploiements
pipelines:
  branches:
    main:
      - step:
          name: Deploy to Production
          deployment: production
          script:
            - pipe: atlassian/ssh-run:0.4.1
              variables:
                SSH_USER: deploy
                SERVER: prod.company.com
                COMMAND: ./deploy.sh
          after-script:
            # Les déploiements apparaissent dans le Dev Panel Jira
            - echo "Deployment tracked automatically"

    develop:
      - step:
          name: Deploy to Staging
          deployment: staging
          script:
            - ./deploy-staging.sh

# Environnements configurés dans Bitbucket Settings > Deployments
# - test (tracked, non-restricté)
# - staging (tracked, non-restricté)
# - production (tracked, restricté aux admins)
\`\`\`

### Reporting cross-outils

\`\`\`bash
# Rapport de productivité développeur (Jira + Bitbucket)
#!/bin/bash
DEVELOPER="john.doe"
PERIOD="2024-01"

echo "=== Rapport \\\${DEVELOPER} - \\\${PERIOD} ==="

# Tickets résolus (Jira)
RESOLVED=$(curl -s -H "Authorization: Basic \\\${JIRA_TOKEN}" \\
  "https://company.atlassian.net/rest/api/3/search?jql=assignee=\\\${DEVELOPER}+AND+resolved>=2024-01-01+AND+resolved<2024-02-01" | \\
  jq '.total')
echo "Tickets résolus: \\\${RESOLVED}"

# PRs mergées (Bitbucket)
PRS=$(curl -s -H "Authorization: Bearer \\\${BB_TOKEN}" \\
  "https://api.bitbucket.org/2.0/repositories/company/project/pullrequests?state=MERGED&q=author.nickname=\\\${DEVELOPER}" | \\
  jq '.size')
echo "PRs mergées: \\\${PRS}"

# Commits (Bitbucket)
COMMITS=$(curl -s -H "Authorization: Bearer \\\${BB_TOKEN}" \\
  "https://api.bitbucket.org/2.0/repositories/company/project/commits?include=main" | \\
  jq "[.values[] | select(.author.raw | contains(\\"\\\\\\$\{DEVELOPER}\\"))] | length")
echo "Commits: \\\${COMMITS}"

# Reviews effectuées
REVIEWS=$(curl -s -H "Authorization: Bearer \\\${BB_TOKEN}" \\
  "https://api.bitbucket.org/2.0/repositories/company/project/pullrequests?state=MERGED" | \\
  jq "[.values[] | select(.reviewers[]?.nickname == \\"\\\${DEVELOPER}\\")] | length")
echo "Reviews effectuées: \\\${REVIEWS}"
\`\`\``,
    practiceContent: `### TP1 : Smart Commits workflow complet

Configurez les Smart Commits pour votre projet. Testez toutes les commandes : transition (3 statuts), time tracking, et commentaires. Vérifiez que le Dev Panel Jira affiche correctement les commits, branches et PRs liés.

### TP2 : Automation rules Bitbucket-Jira

Implémentez 5 règles d'automatisation couvrant le cycle complet : branche créée → In Progress, PR créée → In Review, PR mergée → Done, build échoué → alerte, déploiement → commentaire. Testez chaque règle et vérifiez les transitions.

### TP3 : Branching model et conventions

Configurez le branching model Bitbucket avec les conventions d'équipe. Testez la création de branches depuis Jira pour chaque type de ticket. Vérifiez que les noms de branches suivent la convention et que le lien ticket-branche est automatique.

### TP4 : Dashboard de productivité cross-outils

Créez un rapport mensuel automatisé combinant données Jira et Bitbucket : tickets par développeur, PRs mergées, temps de cycle (ticket créé → déployé), taux de review. Identifiez les goulots d'étranglement et proposez des améliorations de processus.`,
    keyPoints: JSON.stringify(['Dev Panel Jira affichant branches commits PRs et déploiements', 'Smart Commits pour transition time tracking et commentaires', 'Automation rules pour synchroniser statuts automatiquement', 'Création de branches depuis Jira avec conventions nommage', 'Tracking déploiements visible dans les tickets Jira', 'Branching model configurable par type de ticket', 'Reporting cross-outils pour métriques de productivité', 'Traçabilité complète du ticket au déploiement production']),
  },


  {
    id: 'bb-08',
    courseId: 'bitbucket',
    title: 'Scaling Bitbucket',
    duration: '3h',
    orderIndex: 8,
    theoryContent: `## Scaling Bitbucket

### Introduction au scaling Bitbucket

Quand une organisation dépasse plusieurs centaines de développeurs et des milliers de dépôts, Bitbucket doit être configuré pour supporter la charge. Bitbucket Data Center offre le clustering, les mirrors pour la distribution géographique, et Git LFS pour les gros fichiers.

### Architecture Bitbucket Data Center

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│            BITBUCKET DATA CENTER CLUSTER                       │
│                                                               │
│         ┌───────────────────────────┐                        │
│         │     Load Balancer         │                        │
│         │  (HAProxy / AWS ALB)      │                        │
│         └─────────┬─────────────────┘                        │
│           ┌───────┼───────┐                                  │
│           │       │       │                                   │
│     ┌─────▼──┐┌──▼────┐┌─▼──────┐                          │
│     │Node 1  ││Node 2 ││Node 3  │                          │
│     │(Jira+  ││(Jira+ ││(Jira+  │                          │
│     │ Git)   ││ Git)  ││ Git)   │                          │
│     └────┬───┘└───┬───┘└───┬────┘                          │
│          │        │        │                                 │
│     ┌────▼────────▼────────▼────┐                           │
│     │   NFS / Shared Storage    │                           │
│     │   (Git repositories)      │                           │
│     └───────────────────────────┘                           │
│                    │                                          │
│     ┌──────────────▼───────────────┐                        │
│     │   PostgreSQL / Oracle        │                        │
│     │   (metadata, users, perms)   │                        │
│     └──────────────────────────────┘                        │
│                                                               │
│     ┌──────────────────────────────┐                        │
│     │   Elasticsearch              │                        │
│     │   (search, code indexing)    │                        │
│     └──────────────────────────────┘                        │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Smart Mirrors pour distribution géographique

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│            BITBUCKET MIRRORS                                   │
│                                                               │
│  Site Principal (Paris)        Mirror (New York)              │
│  ┌──────────────────┐        ┌──────────────────┐           │
│  │ Bitbucket DC     │        │ Bitbucket Mirror │           │
│  │ (read + write)   │◄──────▶│ (read only)      │           │
│  │                  │  sync  │                  │           │
│  │ 2000 repos       │        │ 2000 repos       │           │
│  └──────────────────┘        └──────────────────┘           │
│                                                               │
│  Avantages :                                                  │
│  - Clone/fetch depuis le mirror local (rapide)               │
│  - Push redirigé vers le primary (transparent)               │
│  - Synchronisation automatique et continue                   │
│  - Pas de configuration client (DNS/routing)                 │
└─────────────────────────────────────────────────────────────┘
\`\`\`

\`\`\`bash
# Configuration d'un mirror
# Sur le serveur mirror, configurer la connexion au primary
# bitbucket.properties
plugin.bitbucket-mirror.upstream.url=https://bitbucket-primary.company.com
plugin.bitbucket-mirror.upstream.username=mirror-user
plugin.bitbucket-mirror.upstream.password=encrypted-token

# Vérifier la synchronisation
curl -u admin:password \\
  "https://bitbucket-mirror.company.com/rest/mirroring/1.0/status"

# Forcer la synchronisation d'un repo
curl -X POST -u admin:password \\
  "https://bitbucket-mirror.company.com/rest/mirroring/1.0/sync/project/PROJ/repos/my-repo"
\`\`\`

### Git LFS (Large File Storage)

\`\`\`bash
# Installation et configuration Git LFS
git lfs install

# Tracker les fichiers volumineux
git lfs track "*.bin"
git lfs track "*.dll"
git lfs track "*.so"
git lfs track "*.a"
git lfs track "*.lib"
git lfs track "*.psd"
git lfs track "*.ai"
git lfs track "assets/videos/**"
git lfs track "test-data/*.zip"

# Vérifier le .gitattributes
cat .gitattributes
# *.bin filter=lfs diff=lfs merge=lfs -text
# *.dll filter=lfs diff=lfs merge=lfs -text

# Migrer des fichiers existants vers LFS
git lfs migrate import --include="*.bin,*.dll" --everything

# Vérifier les fichiers LFS
git lfs ls-files
git lfs status

# Statistiques LFS
git lfs env
\`\`\`

\`\`\`
Stratégie LFS recommandée :
┌─────────────────────┬────────────┬────────────────────────┐
│ Type de fichier     │ Seuil LFS  │ Justification          │
├─────────────────────┼────────────┼────────────────────────┤
│ Binaires compilés   │ > 100 KB   │ Ne diff pas utilement  │
│ Assets graphiques   │ Tous       │ Volumineux, binaires   │
│ Données de test     │ > 1 MB     │ Encombrent le clone    │
│ Vidéos/audio        │ Tous       │ Très volumineux        │
│ Archives            │ > 5 MB     │ Pas de diff possible   │
│ Modèles ML          │ Tous       │ Très gros, fréquents   │
└─────────────────────┴────────────┴────────────────────────┘
\`\`\`

### Maintenance et performance

\`\`\`bash
# Housekeeping des dépôts Git
# Bitbucket effectue le GC automatiquement mais on peut forcer
curl -X POST -u admin:password \\
  "https://bitbucket.company.com/rest/git/1.0/maintenance/gc" \\
  -H "Content-Type: application/json" \\
  -d '{"slug": "my-repo", "project": "PROJ"}'

# Vérifier la taille des dépôts
curl -u admin:password \\
  "https://bitbucket.company.com/rest/api/1.0/projects/PROJ/repos/my-repo" | \\
  jq '{size: .size, forks: .forks}'

# Identifier les gros dépôts
curl -u admin:password \\
  "https://bitbucket.company.com/rest/api/1.0/projects/PROJ/repos?limit=100" | \\
  jq '.values | sort_by(-.size) | .[0:10] | .[] | {name: .slug, size_mb: (.size/1048576 | floor)}'

# Monitoring des performances
# Vérifier les requêtes Git lentes
grep "slow" /var/atlassian/bitbucket/log/atlassian-bitbucket-access.log | \\
  awk '{print $NF, $0}' | sort -rn | head -20

# Vérifier l'utilisation mémoire du cache Git
curl -u admin:password \\
  "https://bitbucket.company.com/rest/api/1.0/admin/git/caching"
\`\`\`

### Stratégie de scaling

\`\`\`
Recommandations de dimensionnement :
┌──────────────────┬────────┬────────┬────────┬────────────┐
│ Utilisateurs     │ Nodes  │ CPU/n  │ RAM/n  │ Storage    │
├──────────────────┼────────┼────────┼────────┼────────────┤
│ < 500            │ 2      │ 4 cores│ 8 GB   │ SSD 500GB  │
│ 500 - 2000      │ 3      │ 8 cores│ 16 GB  │ SSD 1TB    │
│ 2000 - 5000     │ 4-5    │ 16 cors│ 32 GB  │ SSD 2TB    │
│ > 5000           │ 6+     │ 16+    │ 64 GB  │ NVMe 4TB+  │
└──────────────────┴────────┴────────┴────────┴────────────┘

+ Mirrors par site géographique (> 100ms latence)
+ Git LFS server séparé pour gros fichiers
+ CDN pour les artifacts de build

Checklist performance :
□ NFS/storage avec IOPS > 3000
□ Réseau inter-nodes > 10 Gbps
□ PostgreSQL optimisé (shared_buffers, work_mem)
□ Elasticsearch avec SSD dédié
□ Git GC planifié hors heures de pointe
□ Monitoring JMX activé
\`\`\``,
    practiceContent: `### TP1 : Architecture Data Center

Concevez l'architecture d'un cluster Bitbucket Data Center pour 3000 développeurs sur 3 sites géographiques. Incluez : nombre de nodes, configuration réseau, stockage partagé, mirrors, et estimez le coût infrastructure.

### TP2 : Configuration Git LFS

Migrez un dépôt existant contenant 2 GB de binaires vers Git LFS. Configurez les patterns de tracking, exécutez la migration, vérifiez l'intégrité. Mesurez l'amélioration : temps de clone, taille du .git, et performance des PR.

### TP3 : Monitoring et maintenance

Mettez en place le monitoring d'une instance Bitbucket : temps de réponse des opérations Git (clone, push, fetch), utilisation CPU/RAM par node, taille des dépôts, et file d'attente des tâches de fond. Créez des alertes pour les seuils critiques.

### TP4 : Plan de capacity planning

Analysez la croissance de votre instance sur 12 mois : nombre de dépôts, taille totale, nombre de push/jour, pic de charge. Projetez les besoins à 2 ans et proposez un plan d'évolution avec étapes de scaling et budget associé.`,
    keyPoints: JSON.stringify(['Data Center avec clustering horizontal pour haute disponibilité', 'Smart Mirrors pour performance géographique transparente', 'Git LFS pour gérer les fichiers binaires volumineux', 'Dimensionnement par nombre utilisateurs et charge Git', 'Housekeeping et GC automatique des dépôts', 'Monitoring performances avec logs et métriques JMX', 'Stockage partagé NFS avec IOPS élevés requis', 'Mirrors en lecture seule avec push redirigé transparent']),
  },


  {
    id: 'prom-06',
    courseId: 'prometheus',
    title: 'Prometheus Operator (Kubernetes)',
    duration: '3h',
    orderIndex: 6,
    theoryContent: `## Prometheus Operator pour Kubernetes

### Introduction au Prometheus Operator

Le Prometheus Operator simplifie le déploiement et la configuration de Prometheus dans Kubernetes. Il introduit des Custom Resource Definitions (CRDs) qui permettent de déclarer la configuration de monitoring de manière native Kubernetes, rendant le monitoring aussi simple que le déploiement d'une application.

### Architecture Prometheus Operator

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│            PROMETHEUS OPERATOR ARCHITECTURE                    │
│                                                               │
│  ┌────────────────────────────────────────────────┐         │
│  │              OPERATOR (Controller)              │         │
│  │  Watches CRDs → Configures Prometheus          │         │
│  └────────────────────┬───────────────────────────┘         │
│                       │ manages                              │
│  ┌────────────────────▼───────────────────────────┐         │
│  │              PROMETHEUS INSTANCE                 │         │
│  │  (StatefulSet with persistent storage)          │         │
│  └────────────────────┬───────────────────────────┘         │
│                       │ scrapes                              │
│  ┌────────────────────▼───────────────────────────┐         │
│  │         TARGETS (discovered via CRDs)           │         │
│  │  ┌──────────────┐  ┌──────────────────┐       │         │
│  │  │ServiceMonitor│  │  PodMonitor      │       │         │
│  │  │(services)    │  │  (pods directs)  │       │         │
│  │  └──────────────┘  └──────────────────┘       │         │
│  │  ┌──────────────┐  ┌──────────────────┐       │         │
│  │  │PrometheusRule│  │  AlertmanagerCfg │       │         │
│  │  │(alerting)    │  │  (notifications) │       │         │
│  │  └──────────────┘  └──────────────────┘       │         │
│  └────────────────────────────────────────────────┘         │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### ServiceMonitor

\`\`\`yaml
# ServiceMonitor pour scraper un service
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: api-service-monitor
  namespace: monitoring
  labels:
    team: backend
spec:
  namespaceSelector:
    matchNames:
      - production
      - staging
  selector:
    matchLabels:
      app: api-service
  endpoints:
    - port: metrics
      interval: 15s
      path: /metrics
      scrapeTimeout: 10s
      honorLabels: true
      metricRelabelings:
        - sourceLabels: [__name__]
          regex: 'go_.*'
          action: drop
    - port: metrics
      interval: 60s
      path: /metrics/expensive
      scrapeTimeout: 30s
\`\`\`

### PodMonitor

\`\`\`yaml
# PodMonitor pour pods sans service (jobs, workers)
apiVersion: monitoring.coreos.com/v1
kind: PodMonitor
metadata:
  name: batch-jobs-monitor
  namespace: monitoring
spec:
  namespaceSelector:
    matchNames:
      - batch-processing
  selector:
    matchLabels:
      type: batch-worker
  podMetricsEndpoints:
    - port: metrics
      interval: 30s
      path: /actuator/prometheus
    - port: jmx-exporter
      interval: 60s
      relabelings:
        - sourceLabels: [__meta_kubernetes_pod_label_job_type]
          targetLabel: job_type
\`\`\`

### PrometheusRule

\`\`\`yaml
# PrometheusRule pour les alertes
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: api-alerts
  namespace: monitoring
  labels:
    prometheus: main
    role: alert-rules
spec:
  groups:
    - name: api-service.rules
      rules:
        - alert: HighErrorRate
          expr: |
            sum(rate(http_requests_total{status=~"5.."}[5m])) by (service)
            /
            sum(rate(http_requests_total[5m])) by (service)
            > 0.05
          for: 5m
          labels:
            severity: critical
            team: backend
          annotations:
            summary: "Taux d'erreur élevé sur {{ \\\$labels.service }}"
            description: "Le service {{ \\\$labels.service }} a un taux d'erreur de {{ \\\$value | humanizePercentage }} depuis 5 minutes."
            runbook_url: "https://wiki.company.com/runbooks/high-error-rate"

        - alert: HighLatency
          expr: |
            histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, service))
            > 2
          for: 10m
          labels:
            severity: warning
            team: backend
          annotations:
            summary: "Latence P99 élevée sur {{ \\\$labels.service }}"
            description: "P99 latency is {{ \\\$value }}s for {{ \\\$labels.service }}"

    - name: kubernetes-resources.rules
      rules:
        - alert: PodCrashLooping
          expr: rate(kube_pod_container_status_restarts_total[15m]) > 0
          for: 15m
          labels:
            severity: warning
          annotations:
            summary: "Pod {{ \\\$labels.pod }} en CrashLoopBackOff"

        - alert: PodNotReady
          expr: kube_pod_status_ready{condition="true"} == 0
          for: 5m
          labels:
            severity: critical
          annotations:
            summary: "Pod {{ \\\$labels.pod }} non ready depuis 5m"
\`\`\`

### Intégration Thanos pour le long-term storage

\`\`\`yaml
# Prometheus avec Thanos sidecar
apiVersion: monitoring.coreos.com/v1
kind: Prometheus
metadata:
  name: prometheus-main
  namespace: monitoring
spec:
  replicas: 2
  retention: 24h
  retentionSize: 50GB
  thanos:
    image: quay.io/thanos/thanos:v0.34.0
    objectStorageConfig:
      key: thanos.yaml
      name: thanos-objstore-config
  serviceMonitorSelector:
    matchLabels:
      team: backend
  ruleSelector:
    matchLabels:
      prometheus: main
  alerting:
    alertmanagers:
      - namespace: monitoring
        name: alertmanager-main
        port: web
  resources:
    requests:
      memory: 4Gi
      cpu: 2
    limits:
      memory: 8Gi
      cpu: 4
  storage:
    volumeClaimTemplate:
      spec:
        storageClassName: fast-ssd
        resources:
          requests:
            storage: 100Gi
\`\`\`

\`\`\`yaml
# Secret pour Thanos object storage
apiVersion: v1
kind: Secret
metadata:
  name: thanos-objstore-config
  namespace: monitoring
stringData:
  thanos.yaml: |
    type: S3
    config:
      bucket: prometheus-longterm
      endpoint: s3.eu-west-1.amazonaws.com
      region: eu-west-1
      access_key: AKIAIOSFODNN7EXAMPLE
      secret_key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
\`\`\`

### Installation via Helm (kube-prometheus-stack)

\`\`\`bash
# Installation du stack complet
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm install monitoring prometheus-community/kube-prometheus-stack \\
  --namespace monitoring --create-namespace \\
  --set prometheus.prometheusSpec.retention=7d \\
  --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.resources.requests.storage=50Gi \\
  --set grafana.adminPassword=SecurePass123 \\
  --set alertmanager.alertmanagerSpec.storage.volumeClaimTemplate.spec.resources.requests.storage=10Gi

# Vérifier l'installation
kubectl get prometheuses -n monitoring
kubectl get servicemonitors --all-namespaces
kubectl get prometheusrules -n monitoring
\`\`\``,
    practiceContent: `### TP1 : Déploiement kube-prometheus-stack

Installez le kube-prometheus-stack complet avec Helm dans un cluster Kubernetes. Vérifiez que Prometheus scrape automatiquement les composants Kubernetes (kubelet, kube-state-metrics, node-exporter). Accédez à Grafana et explorez les dashboards pré-installés.

### TP2 : ServiceMonitor personnalisé

Déployez une application avec un endpoint /metrics. Créez un ServiceMonitor pour la scraper. Vérifiez dans Prometheus que les métriques apparaissent. Ajoutez du relabeling pour enrichir les métriques avec des labels Kubernetes.

### TP3 : PrometheusRule et alertes

Créez un ensemble de PrometheusRules couvrant : taux d'erreur HTTP, latence P99, utilisation CPU/mémoire pods, et restarts. Configurez l'Alertmanager pour router les alertes critiques vers Slack et les warnings vers email.

### TP4 : Thanos pour haute disponibilité

Configurez Prometheus en mode HA (2 répliques) avec Thanos sidecar. Configurez le stockage S3 pour la rétention long-terme. Déployez Thanos Query pour fédérer les deux instances et vérifiez la déduplication des données.`,
    keyPoints: JSON.stringify(['Prometheus Operator avec CRDs pour configuration native Kubernetes', 'ServiceMonitor pour découverte automatique des services', 'PodMonitor pour pods sans service associé', 'PrometheusRule pour alertes déclaratives', 'Thanos sidecar pour stockage long-terme objet S3', 'kube-prometheus-stack comme déploiement complet Helm', 'Relabeling pour enrichir métriques avec métadonnées K8s', 'Haute disponibilité avec répliques et déduplication Thanos']),
  },


  {
    id: 'prom-07',
    courseId: 'prometheus',
    title: 'Haute disponibilité Prometheus',
    duration: '3h',
    orderIndex: 7,
    theoryContent: `## Haute disponibilité Prometheus

### Introduction à la HA Prometheus

Prometheus en standalone présente un single point of failure. Pour les environnements de production, il faut mettre en place une architecture haute disponibilité qui garantit la continuité du monitoring même en cas de panne d'un noeud. Les solutions principales sont : la fédération, Thanos, et Cortex.

### Architectures HA

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│  Option 1: RÉPLIQUES SIMPLES                                  │
│                                                               │
│  ┌──────────────┐     ┌──────────────┐                      │
│  │ Prometheus A │     │ Prometheus B │                      │
│  │ (même config)│     │ (même config)│                      │
│  └──────┬───────┘     └──────┬───────┘                      │
│         │                    │                               │
│         └────────┬───────────┘                               │
│                  ▼                                            │
│         ┌────────────────┐                                   │
│         │  Load Balancer │  (sticky sessions ou round-robin)│
│         └────────────────┘                                   │
│                                                               │
│  Avantages: Simple, pas de composant supplémentaire          │
│  Inconvénients: Données dupliquées, pas de vue globale      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Option 2: THANOS                                             │
│                                                               │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                      │
│  │Prom + S │ │Prom + S │ │Prom + S │  S = Thanos Sidecar  │
│  │Cluster A│ │Cluster B│ │Cluster C│                      │
│  └────┬────┘ └────┬────┘ └────┬────┘                      │
│       │           │           │                             │
│       └───────────┼───────────┘                             │
│                   ▼                                          │
│       ┌───────────────────────┐                             │
│       │    Thanos Query       │ (vue globale, dédup)       │
│       └───────────┬───────────┘                             │
│                   │                                          │
│       ┌───────────▼───────────┐                             │
│       │   Thanos Store GW     │ (accès object storage)     │
│       └───────────┬───────────┘                             │
│                   ▼                                          │
│       ┌───────────────────────┐                             │
│       │   Object Storage      │ (S3, GCS, Azure Blob)      │
│       │   (rétention longue)  │                             │
│       └───────────────────────┘                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Option 3: CORTEX / MIMIR                                     │
│                                                               │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                      │
│  │Prom     │ │Prom     │ │Prom     │  remote_write        │
│  │Cluster A│ │Cluster B│ │Cluster C│────────┐             │
│  └─────────┘ └─────────┘ └─────────┘        │             │
│                                               ▼             │
│       ┌────────────────────────────────────────────┐       │
│       │            CORTEX / MIMIR                    │       │
│       │  ┌──────────┐ ┌─────────┐ ┌────────────┐  │       │
│       │  │Distributor│ │Ingester │ │ Store GW   │  │       │
│       │  └──────────┘ └─────────┘ └────────────┘  │       │
│       │  Multi-tenant, haute disponibilité native  │       │
│       └────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Fédération Prometheus

\`\`\`yaml
# prometheus-federation.yml
# Instance fédératrice qui agrège les métriques de plusieurs Prometheus
global:
  scrape_interval: 30s
  evaluation_interval: 30s

scrape_configs:
  - job_name: 'federated-cluster-a'
    scrape_interval: 30s
    honor_labels: true
    metrics_path: '/federate'
    params:
      match[]:
        - '{job=~".+"}'
        - '{__name__=~"job:.*"}'
    static_configs:
      - targets: ['prometheus-cluster-a:9090']
        labels:
          cluster: 'cluster-a'

  - job_name: 'federated-cluster-b'
    scrape_interval: 30s
    honor_labels: true
    metrics_path: '/federate'
    params:
      match[]:
        - '{job=~".+"}'
        - '{__name__=~"job:.*"}'
    static_configs:
      - targets: ['prometheus-cluster-b:9090']
        labels:
          cluster: 'cluster-b'
\`\`\`

### Configuration Thanos complète

\`\`\`yaml
# Thanos Query - point d'entrée pour les requêtes
apiVersion: apps/v1
kind: Deployment
metadata:
  name: thanos-query
spec:
  replicas: 2
  template:
    spec:
      containers:
        - name: thanos-query
          image: quay.io/thanos/thanos:v0.34.0
          args:
            - query
            - --log.level=info
            - --query.replica-label=prometheus_replica
            - --store=dnssrv+_grpc._tcp.thanos-sidecar.monitoring.svc
            - --store=dnssrv+_grpc._tcp.thanos-store-gateway.monitoring.svc
            - --store=dnssrv+_grpc._tcp.thanos-ruler.monitoring.svc
          ports:
            - name: http
              containerPort: 10902
            - name: grpc
              containerPort: 10901
\`\`\`

\`\`\`yaml
# Thanos Store Gateway - accès au stockage objet
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: thanos-store-gateway
spec:
  replicas: 2
  template:
    spec:
      containers:
        - name: thanos-store
          image: quay.io/thanos/thanos:v0.34.0
          args:
            - store
            - --data-dir=/data
            - --objstore.config-file=/etc/thanos/objstore.yaml
            - --index-cache-size=500MB
            - --chunk-pool-size=2GB
          volumeMounts:
            - name: data
              mountPath: /data
            - name: objstore-config
              mountPath: /etc/thanos
\`\`\`

### Thanos Compactor

\`\`\`yaml
# Thanos Compactor - downsampling et compaction
apiVersion: apps/v1
kind: Deployment
metadata:
  name: thanos-compactor
spec:
  replicas: 1  # ATTENTION: un seul replica!
  template:
    spec:
      containers:
        - name: thanos-compact
          image: quay.io/thanos/thanos:v0.34.0
          args:
            - compact
            - --data-dir=/data
            - --objstore.config-file=/etc/thanos/objstore.yaml
            - --retention.resolution-raw=30d
            - --retention.resolution-5m=180d
            - --retention.resolution-1h=365d
            - --compact.concurrency=4
            - --downsample.concurrency=4
            - --wait
\`\`\`

### Long-term storage et rétention

\`\`\`
Stratégie de rétention multi-niveau :
┌──────────────────┬──────────────┬────────────────────────┐
│ Résolution       │ Rétention    │ Usage                  │
├──────────────────┼──────────────┼────────────────────────┤
│ Raw (15s)        │ 30 jours     │ Debugging, investigation│
│ 5 minutes        │ 6 mois       │ Trends, capacity plan  │
│ 1 heure          │ 1 an         │ Reporting long-terme   │
└──────────────────┴──────────────┴────────────────────────┘

Estimation stockage (par série, par jour) :
- Raw 15s: ~5.76 KB/série/jour
- 5min: ~288 bytes/série/jour
- 1h: ~24 bytes/série/jour

Pour 100,000 séries actives :
- Raw 30j: ~16 GB
- 5min 180j: ~5 GB
- 1h 365j: ~880 MB
\`\`\``,
    practiceContent: `### TP1 : Fédération Prometheus

Déployez 3 instances Prometheus (simulant 3 clusters) et une instance fédératrice. Configurez la fédération pour agréger les métriques. Créez des alertes sur la vue fédérée et vérifiez qu'elles fonctionnent même si un cluster est down.

### TP2 : Déploiement Thanos complet

Déployez l'architecture Thanos complète : sidecars sur 2 Prometheus, Query, Store Gateway, et Compactor. Configurez le stockage objet (MinIO en local). Vérifiez la déduplication et la requête sur données historiques.

### TP3 : Rétention et downsampling

Configurez le Thanos Compactor avec les 3 niveaux de résolution. Générez des métriques de test sur 30 jours. Vérifiez que le downsampling fonctionne et que les requêtes sur de longues périodes sont performantes.

### TP4 : Disaster recovery monitoring

Simulez la perte d'un noeud Prometheus. Vérifiez que Thanos Query continue de servir les données. Testez la restauration depuis l'object storage. Documentez le RTO/RPO de votre architecture de monitoring.`,
    keyPoints: JSON.stringify(['Répliques simples pour HA basique sans vue globale', 'Thanos pour vue globale multi-clusters et stockage long-terme', 'Cortex et Mimir comme alternatives multi-tenant', 'Fédération pour agrégation hiérarchique entre Prometheus', 'Thanos Compactor pour downsampling et gestion rétention', 'Store Gateway pour requêtes sur données historiques', 'Déduplication automatique des répliques via Query', 'Estimation stockage basée sur nombre de séries et résolution']),
  },


  {
    id: 'prom-08',
    courseId: 'prometheus',
    title: "Monitoring d'applications",
    duration: '3h',
    orderIndex: 8,
    theoryContent: `## Monitoring d'applications avec Prometheus

### Introduction à l'instrumentation

Le monitoring d'applications consiste à instrumenter le code pour exposer des métriques métier et techniques. Les client libraries Prometheus sont disponibles pour tous les langages majeurs et permettent de créer des métriques custom adaptées à chaque application.

### Types de métriques et usage

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│            TYPES DE MÉTRIQUES PROMETHEUS                       │
│                                                               │
│  ┌────────────────┐  Usage: Valeur instantanée              │
│  │    GAUGE       │  Exemples: température, connexions      │
│  │  (jauge)       │  actives, queue size                    │
│  └────────────────┘                                          │
│                                                               │
│  ┌────────────────┐  Usage: Compteur monotone croissant     │
│  │   COUNTER      │  Exemples: requêtes totales, erreurs,  │
│  │  (compteur)    │  bytes transférés                       │
│  └────────────────┘                                          │
│                                                               │
│  ┌────────────────┐  Usage: Distribution de valeurs         │
│  │  HISTOGRAM     │  Exemples: latence requêtes, taille    │
│  │ (histogramme)  │  payload, durée traitement             │
│  └────────────────┘                                          │
│                                                               │
│  ┌────────────────┐  Usage: Quantiles pré-calculés          │
│  │   SUMMARY      │  Exemples: latence P50/P90/P99         │
│  │  (résumé)      │  (côté client, non agrégeable)         │
│  └────────────────┘                                          │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Instrumentation Go

\`\`\`go
package main

import (
    "net/http"
    "time"
    "github.com/prometheus/client_golang/prometheus"
    "github.com/prometheus/client_golang/prometheus/promhttp"
)

var (
    httpRequestsTotal = prometheus.NewCounterVec(
        prometheus.CounterOpts{
            Name: "http_requests_total",
            Help: "Total des requêtes HTTP",
        },
        []string{"method", "endpoint", "status"},
    )

    httpRequestDuration = prometheus.NewHistogramVec(
        prometheus.HistogramOpts{
            Name:    "http_request_duration_seconds",
            Help:    "Durée des requêtes HTTP en secondes",
            Buckets: []float64{.005, .01, .025, .05, .1, .25, .5, 1, 2.5, 5, 10},
        },
        []string{"method", "endpoint"},
    )

    activeConnections = prometheus.NewGauge(
        prometheus.GaugeOpts{
            Name: "active_connections",
            Help: "Nombre de connexions actives",
        },
    )

    ordersProcessed = prometheus.NewCounterVec(
        prometheus.CounterOpts{
            Name: "orders_processed_total",
            Help: "Commandes traitées par statut",
        },
        []string{"status", "payment_method"},
    )
)

func init() {
    prometheus.MustRegister(httpRequestsTotal)
    prometheus.MustRegister(httpRequestDuration)
    prometheus.MustRegister(activeConnections)
    prometheus.MustRegister(ordersProcessed)
}

func instrumentedHandler(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        activeConnections.Inc()
        defer activeConnections.Dec()

        recorder := &statusRecorder{ResponseWriter: w, statusCode: 200}
        next.ServeHTTP(recorder, r)

        duration := time.Since(start).Seconds()
        httpRequestsTotal.WithLabelValues(r.Method, r.URL.Path, 
            http.StatusText(recorder.statusCode)).Inc()
        httpRequestDuration.WithLabelValues(r.Method, r.URL.Path).Observe(duration)
    })
}

func main() {
    http.Handle("/metrics", promhttp.Handler())
    http.ListenAndServe(":8080", nil)
}
\`\`\`

### Instrumentation Python (Flask)

\`\`\`python
from flask import Flask, request
from prometheus_client import (
    Counter, Histogram, Gauge, 
    generate_latest, CollectorRegistry, CONTENT_TYPE_LATEST
)
import time

app = Flask(__name__)

# Métriques
REQUEST_COUNT = Counter(
    'http_requests_total',
    'Total HTTP requests',
    ['method', 'endpoint', 'status']
)

REQUEST_LATENCY = Histogram(
    'http_request_duration_seconds',
    'HTTP request latency',
    ['method', 'endpoint'],
    buckets=[.005, .01, .025, .05, .1, .25, .5, 1, 2.5, 5]
)

ACTIVE_REQUESTS = Gauge(
    'http_active_requests',
    'Number of active HTTP requests'
)

# Métriques métier
ORDERS_TOTAL = Counter(
    'business_orders_total',
    'Total orders processed',
    ['status', 'region']
)

REVENUE_TOTAL = Counter(
    'business_revenue_euros_total',
    'Total revenue in euros',
    ['product_category']
)

CART_SIZE = Histogram(
    'business_cart_items',
    'Number of items per cart',
    buckets=[1, 2, 3, 5, 10, 20, 50]
)

@app.before_request
def before_request():
    request.start_time = time.time()
    ACTIVE_REQUESTS.inc()

@app.after_request
def after_request(response):
    ACTIVE_REQUESTS.dec()
    latency = time.time() - request.start_time
    REQUEST_COUNT.labels(
        method=request.method,
        endpoint=request.path,
        status=response.status_code
    ).inc()
    REQUEST_LATENCY.labels(
        method=request.method,
        endpoint=request.path
    ).observe(latency)
    return response

@app.route('/metrics')
def metrics():
    return generate_latest(), 200, {'Content-Type': CONTENT_TYPE_LATEST}
\`\`\`

### Instrumentation Java (Spring Boot)

\`\`\`java
// Spring Boot avec Micrometer (auto-config Prometheus)
// pom.xml dependencies:
// - spring-boot-starter-actuator
// - micrometer-registry-prometheus

// application.yml
// management:
//   endpoints:
//     web:
//       exposure:
//         include: prometheus,health,info
//   metrics:
//     tags:
//       application: mon-service

@RestController
public class OrderController {
    
    private final Counter ordersCounter;
    private final Timer orderProcessingTime;
    private final AtomicInteger activeOrders;
    
    public OrderController(MeterRegistry registry) {
        this.ordersCounter = Counter.builder("orders.created.total")
            .description("Total orders created")
            .tag("service", "order-api")
            .register(registry);
            
        this.orderProcessingTime = Timer.builder("orders.processing.duration")
            .description("Order processing time")
            .publishPercentiles(0.5, 0.9, 0.99)
            .register(registry);
            
        this.activeOrders = registry.gauge("orders.active", new AtomicInteger(0));
    }
    
    @PostMapping("/orders")
    public Order createOrder(@RequestBody OrderRequest req) {
        activeOrders.incrementAndGet();
        try {
            return orderProcessingTime.record(() -> {
                Order order = processOrder(req);
                ordersCounter.increment();
                return order;
            });
        } finally {
            activeOrders.decrementAndGet();
        }
    }
}
\`\`\`

### Exemplars (corrélation métriques-traces)

\`\`\`go
// Exemplars pour corréler métriques et traces distribuées
httpRequestDuration.WithLabelValues("GET", "/api/orders").
    (Observe)(duration, prometheus.Labels{
        "traceID": span.SpanContext().TraceID().String(),
    })

// Dans Grafana, les exemplars permettent de cliquer
// sur un point de métrique et voir la trace associée
\`\`\`

### Bonnes pratiques de nommage

\`\`\`
Convention de nommage :
┌────────────────────────────────────────────────────────────┐
│ Règle                    │ Exemple                         │
├──────────────────────────┼─────────────────────────────────┤
│ snake_case               │ http_requests_total             │
│ Suffixe _total (counter) │ errors_total                    │
│ Suffixe _seconds (durée) │ request_duration_seconds        │
│ Suffixe _bytes (taille)  │ response_size_bytes             │
│ Suffixe _info (metadata) │ build_info                      │
│ Préfixe namespace        │ myapp_orders_total              │
│ Labels dimension données │ method="GET" status="200"       │
│ Pas de label haute card. │ Éviter user_id comme label      │
└──────────────────────────┴─────────────────────────────────┘
\`\`\``,
    practiceContent: `### TP1 : Instrumentation application Go/Python

Instrumentez une application REST avec les 4 types de métriques : counter pour les requêtes, histogram pour la latence, gauge pour les connexions actives, et métriques métier (commandes, revenus). Vérifiez les métriques dans Prometheus.

### TP2 : Métriques métier personnalisées

Ajoutez 5 métriques métier à votre application : nombre de commandes par statut, valeur du panier moyen, temps de traitement par type, taux de conversion, et utilisateurs actifs. Créez un dashboard Grafana dédié aux métriques business.

### TP3 : Exemplars et corrélation

Configurez les exemplars sur vos histogrammes pour lier les métriques aux traces distribuées (OpenTelemetry). Démontrez le workflow : alerte sur latence élevée → clic sur exemplar → trace distribuée → identification du goulot.

### TP4 : Optimisation de la cardinalité

Analysez la cardinalité de vos métriques (nombre de séries temporelles). Identifiez les labels à haute cardinalité (user_id, request_id). Corrigez en utilisant des buckets ou en supprimant les labels problématiques. Mesurez l'impact sur la performance Prometheus.`,
    keyPoints: JSON.stringify(['Quatre types de métriques counter gauge histogram summary', 'Client libraries pour Go Python Java et tous langages majeurs', 'Métriques métier en plus des métriques techniques', 'Conventions nommage snake_case avec suffixes standard', 'Exemplars pour corrélation métriques et traces distribuées', 'Micrometer avec Spring Boot pour intégration automatique', 'Éviter labels haute cardinalité pour performance', 'Histogrammes avec buckets adaptés au cas usage']),
  },


  {
    id: 'graf-06',
    courseId: 'grafana',
    title: 'Grafana Loki (logs)',
    duration: '3h',
    orderIndex: 6,
    theoryContent: `## Grafana Loki - Agrégation de logs

### Introduction à Loki

Grafana Loki est un système d'agrégation de logs inspiré de Prometheus. Contrairement à Elasticsearch, Loki n'indexe pas le contenu des logs mais uniquement les labels (métadonnées). Cela le rend beaucoup plus économique en stockage et plus simple à opérer, tout en offrant des capacités de recherche puissantes via LogQL.

### Architecture Loki

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    LOKI ARCHITECTURE                           │
│                                                               │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                      │
│  │Promtail │ │Promtail │ │FluentBit│   Agents de collecte  │
│  │(node 1) │ │(node 2) │ │(node 3) │                      │
│  └────┬────┘ └────┬────┘ └────┬────┘                      │
│       │           │           │                             │
│       └───────────┼───────────┘                             │
│                   ▼                                          │
│       ┌───────────────────────┐                             │
│       │     DISTRIBUTOR       │  (répartition)             │
│       └───────────┬───────────┘                             │
│                   ▼                                          │
│       ┌───────────────────────┐                             │
│       │      INGESTER         │  (écriture)                │
│       │  (in-memory + WAL)    │                             │
│       └───────────┬───────────┘                             │
│                   ▼                                          │
│       ┌───────────────────────┐                             │
│       │   OBJECT STORAGE      │  (S3, GCS, filesystem)     │
│       │   Chunks + Index      │                             │
│       └───────────────────────┘                             │
│                   ▲                                          │
│       ┌───────────┴───────────┐                             │
│       │      QUERIER          │  (lecture)                  │
│       └───────────────────────┘                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### LogQL - Langage de requête

\`\`\`bash
# Requêtes de base - Stream selector
{app="api-gateway"}
{namespace="production", container="nginx"}
{job="varlogs"} |= "error"

# Filtres de ligne
{app="api-gateway"} |= "error"              # contient "error"
{app="api-gateway"} != "healthcheck"         # ne contient pas
{app="api-gateway"} |~ "status=[45]\\\\d{2}"    # regex match
{app="api-gateway"} !~ "GET /health"         # regex ne match pas

# Pipeline de parsing
{app="api-gateway"} 
  | json                                      # parse JSON
  | status >= 400                             # filtre sur champ parsé
  | line_format "{{.method}} {{.path}} {{.status}} {{.duration}}"

# Parsing logfmt
{app="backend"} 
  | logfmt                                    # parse key=value
  | duration > 1s                             # filtre durée
  | level = "error"

# Parsing regex
{app="nginx"} 
  | regexp "(?P<ip>[\\\\d.]+) .* (?P<status>\\\\d{3}) (?P<bytes>\\\\d+)"
  | status = "500"

# Métriques depuis les logs (LogQL metrics)
# Taux d'erreurs par seconde
rate({app="api-gateway"} |= "error" [5m])

# Nombre de requêtes par statut
sum by (status) (
  count_over_time(
    {app="api-gateway"} | json | __error__="" [5m]
  )
)

# P99 latence depuis les logs
quantile_over_time(0.99,
  {app="api-gateway"} | json | unwrap duration [5m]
) by (endpoint)

# Top 5 des endpoints les plus lents
topk(5,
  avg_over_time(
    {app="api-gateway"} | json | unwrap response_time [1h]
  ) by (endpoint)
)
\`\`\`

### Configuration Promtail

\`\`\`yaml
# promtail-config.yaml
server:
  http_listen_port: 9080

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  # Logs Kubernetes
  - job_name: kubernetes-pods
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_label_app]
        target_label: app
      - source_labels: [__meta_kubernetes_namespace]
        target_label: namespace
      - source_labels: [__meta_kubernetes_pod_name]
        target_label: pod
    pipeline_stages:
      - docker: {}
      - json:
          expressions:
            level: level
            msg: message
            timestamp: time
      - labels:
          level:
      - timestamp:
          source: timestamp
          format: RFC3339Nano

  # Logs fichiers système
  - job_name: system
    static_configs:
      - targets: [localhost]
        labels:
          job: varlogs
          __path__: /var/log/*.log
    pipeline_stages:
      - regex:
          expression: '(?P<timestamp>\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}) (?P<level>\\w+) (?P<message>.*)'
      - labels:
          level:
\`\`\`

### Corrélation logs et métriques

\`\`\`
Dans Grafana, la corrélation fonctionne via :
1. Labels communs entre Prometheus et Loki
   - app, namespace, pod, service
2. Derived fields dans les datasources Loki
   - Extraire traceID des logs → lien vers Tempo
3. Split view dans Explore
   - Métriques à gauche, logs à droite, même timerange
4. Annotations depuis Loki sur les dashboards
   - Afficher les déploiements comme annotations
\`\`\`

### Labels et bonnes pratiques

\`\`\`
Règles pour les labels Loki :
┌─────────────────────────────────────────────────────────────┐
│ ✓ BON                          │ ✗ MAUVAIS                  │
├────────────────────────────────┼────────────────────────────┤
│ {app="api", env="prod"}       │ {user_id="12345"}          │
│ {namespace="payment"}         │ {request_id="abc-def"}     │
│ {level="error"}               │ {timestamp="..."}          │
│ {region="eu-west-1"}          │ {message="..."}            │
│                                │                            │
│ Cardinalité faible (< 100)    │ Cardinalité haute          │
│ Stable dans le temps          │ Change à chaque requête    │
│ Utile pour filtrer            │ Utile seulement pour grep  │
└────────────────────────────────┴────────────────────────────┘

Astuce: Utilisez les pipeline stages pour extraire 
les données à haute cardinalité DANS le log, pas comme label.
\`\`\``,
    practiceContent: `### TP1 : Déploiement Loki et Promtail

Déployez Loki et Promtail dans Kubernetes via Helm. Configurez Promtail pour collecter les logs de tous les pods avec enrichissement des labels Kubernetes. Vérifiez dans Grafana Explore que les logs apparaissent avec les bons labels.

### TP2 : LogQL avancé

Écrivez 10 requêtes LogQL couvrant : filtrage par niveau, parsing JSON et logfmt, extraction de métriques depuis les logs (taux erreurs, latence P99), et agrégation par label. Comparez les performances entre filtrage par label et grep dans le contenu.

### TP3 : Pipeline de parsing Promtail

Configurez un pipeline Promtail complexe pour des logs multi-formats : JSON pour l'API, logfmt pour les workers, et regex pour les logs legacy. Ajoutez des labels extraits dynamiquement et des transformations de timestamp.

### TP4 : Corrélation métriques-logs-traces

Configurez la corrélation dans Grafana : métriques Prometheus avec les mêmes labels que Loki, derived fields pour lier les traceIDs aux traces Tempo. Démontrez le workflow d'investigation : alerte → dashboard → logs → trace.`,
    keyPoints: JSON.stringify(['Loki indexe les labels pas le contenu pour économie stockage', 'LogQL inspiré de PromQL pour requêtes de logs puissantes', 'Promtail comme agent de collecte avec pipeline de parsing', 'Labels à faible cardinalité pour performance optimale', 'Métriques extraites des logs via rate et count_over_time', 'Corrélation avec Prometheus via labels communs', 'Pipeline stages pour parsing JSON logfmt et regex', 'Derived fields pour navigation vers les traces distribuées']),
  },


  {
    id: 'graf-07',
    courseId: 'grafana',
    title: 'Grafana Tempo (traces)',
    duration: '3h',
    orderIndex: 7,
    theoryContent: `## Grafana Tempo - Traces distribuées

### Introduction au tracing distribué

Le tracing distribué permet de suivre une requête à travers tous les services d'une architecture microservices. Grafana Tempo est un backend de traces haute performance qui stocke les traces de manière économique en utilisant uniquement le stockage objet, sans indexation.

### Architecture Tempo

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    TEMPO ARCHITECTURE                          │
│                                                               │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                      │
│  │Service A│ │Service B│ │Service C│   (instrumented)      │
│  │  (OTLP) │ │ (Jaeger)│ │(Zipkin) │                      │
│  └────┬────┘ └────┬────┘ └────┬────┘                      │
│       │           │           │                             │
│       └───────────┼───────────┘                             │
│                   ▼                                          │
│       ┌───────────────────────┐                             │
│       │     DISTRIBUTOR       │  (multi-protocol)          │
│       │  OTLP/Jaeger/Zipkin  │                             │
│       └───────────┬───────────┘                             │
│                   ▼                                          │
│       ┌───────────────────────┐                             │
│       │      INGESTER         │  (WAL + in-memory)         │
│       └───────────┬───────────┘                             │
│                   ▼                                          │
│       ┌───────────────────────┐                             │
│       │   OBJECT STORAGE      │  (S3/GCS)                  │
│       │   (traces compressées)│                             │
│       └───────────┬───────────┘                             │
│                   ▲                                          │
│       ┌───────────┴───────────┐                             │
│       │      QUERIER          │                             │
│       └───────────┬───────────┘                             │
│                   ▲                                          │
│       ┌───────────┴───────────┐                             │
│       │   QUERY FRONTEND      │  (TraceQL)                 │
│       └───────────────────────┘                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### TraceQL - Langage de requête

\`\`\`bash
# Recherche par attribut de span
{ span.http.method = "POST" && span.http.status_code >= 400 }

# Recherche par service
{ resource.service.name = "api-gateway" }

# Durée de span
{ span.http.method = "GET" && duration > 2s }

# Combinaison de conditions
{ resource.service.name = "payment-service" && 
  span.http.status_code = 500 && 
  duration > 1s }

# Recherche par nom de span
{ name = "db.query" && duration > 500ms }

# Attributs personnalisés
{ span.user.id = "user-123" }
{ span.order.total > 100 }

# Recherche structurelle (parent-enfant)
{ resource.service.name = "api-gateway" } >> { resource.service.name = "database" && duration > 1s }

# Agrégations TraceQL
{ resource.service.name = "api-gateway" } | count() by (span.http.status_code)
{ duration > 1s } | avg(duration) by (resource.service.name)
\`\`\`

### Instrumentation OpenTelemetry

\`\`\`python
# Python - Instrumentation avec OpenTelemetry
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.instrumentation.flask import FlaskInstrumentor
from opentelemetry.instrumentation.requests import RequestsInstrumentor
from opentelemetry.instrumentation.sqlalchemy import SQLAlchemyInstrumentor

# Configuration
provider = TracerProvider(
    resource=Resource.create({"service.name": "payment-service"})
)
processor = BatchSpanProcessor(
    OTLPSpanExporter(endpoint="http://tempo:4317", insecure=True)
)
provider.add_span_processor(processor)
trace.set_tracer_provider(provider)

# Auto-instrumentation des frameworks
FlaskInstrumentor().instrument_app(app)
RequestsInstrumentor().instrument()
SQLAlchemyInstrumentor().instrument(engine=db_engine)

# Instrumentation manuelle pour logique métier
tracer = trace.get_tracer(__name__)

@app.route('/orders', methods=['POST'])
def create_order():
    with tracer.start_as_current_span("create_order") as span:
        span.set_attribute("order.customer_id", request.json['customer_id'])
        
        with tracer.start_as_current_span("validate_payment"):
            payment_result = validate_payment(request.json['payment'])
            span.set_attribute("payment.method", request.json['payment']['method'])
        
        with tracer.start_as_current_span("save_order"):
            order = save_to_database(request.json)
            span.set_attribute("order.id", order.id)
            span.set_attribute("order.total", order.total)
        
        return jsonify(order.to_dict())
\`\`\`

### Span metrics (métriques dérivées des traces)

\`\`\`yaml
# tempo-config.yaml - Activation des span metrics
metrics_generator:
  ring:
    kvstore:
      store: memberlist
  processor:
    service_graphs:
      enabled: true
      dimensions:
        - http.method
        - http.status_code
    span_metrics:
      enabled: true
      dimensions:
        - http.method
        - http.route
        - http.status_code
      histogram_buckets: [0.002, 0.004, 0.008, 0.016, 0.032, 0.064, 0.128, 0.256, 0.512, 1.024, 2.048]
  storage:
    path: /var/tempo/metrics
    remote_write:
      - url: http://prometheus:9090/api/v1/write
\`\`\`

### Service Graph

\`\`\`
Le Service Graph est généré automatiquement depuis les traces :

┌────────┐     ┌─────────────┐     ┌──────────┐
│ Client │────▶│ API Gateway │────▶│ Auth Svc │
└────────┘     └──────┬──────┘     └──────────┘
                      │
              ┌───────┼───────┐
              ▼       ▼       ▼
        ┌─────────┐ ┌─────┐ ┌──────────┐
        │Order Svc│ │Cart │ │Payment   │
        └────┬────┘ │ Svc │ │  Svc     │
             │      └─────┘ └────┬─────┘
             ▼                   ▼
        ┌─────────┐        ┌─────────┐
        │PostgreSQL│        │ Stripe  │
        └─────────┘        │  API    │
                           └─────────┘

Métriques par edge :
- Request rate (req/s)
- Error rate (%)
- Latency P50/P90/P99
\`\`\`

### Configuration Grafana pour Tempo

\`\`\`yaml
# grafana datasource provisioning
apiVersion: 1
datasources:
  - name: Tempo
    type: tempo
    url: http://tempo:3200
    jsonData:
      httpMethod: GET
      tracesToLogsV2:
        datasourceUid: loki
        filterByTraceID: true
        filterBySpanID: true
      tracesToMetrics:
        datasourceUid: prometheus
        queries:
          - name: "Request rate"
            query: "sum(rate(traces_spanmetrics_calls_total{\\\$__tags}[5m]))"
          - name: "Error rate"
            query: "sum(rate(traces_spanmetrics_calls_total{status_code=\\"STATUS_CODE_ERROR\\",\\\$__tags}[5m]))"
      serviceMap:
        datasourceUid: prometheus
      nodeGraph:
        enabled: true
      search:
        hide: false
      lokiSearch:
        datasourceUid: loki
\`\`\``,
    practiceContent: `### TP1 : Déploiement Tempo et instrumentation

Déployez Tempo dans Kubernetes et instrumentez 3 microservices avec OpenTelemetry (auto + manuel). Vérifiez dans Grafana que les traces apparaissent avec tous les spans. Ajoutez des attributs personnalisés métier.

### TP2 : TraceQL pour investigation

Utilisez TraceQL pour investiguer des problèmes : trouvez les traces avec erreurs, les requêtes lentes, les patterns d'appel anormaux. Comparez avec la recherche par traceID. Créez des requêtes sauvegardées pour les scénarios d'investigation fréquents.

### TP3 : Service Graph et span metrics

Activez le metrics generator dans Tempo. Configurez les span metrics vers Prometheus. Créez un dashboard avec le service graph montrant les dépendances, et des panels pour le taux d'erreur et la latence par service dérivés des traces.

### TP4 : Corrélation complète métriques-logs-traces

Configurez la corrélation bidirectionnelle : métriques → traces (via exemplars), logs → traces (via traceID), traces → logs (via Loki). Démontrez un workflow d'investigation complet depuis une alerte jusqu'à la ligne de log problématique.`,
    keyPoints: JSON.stringify(['Tempo stocke les traces sur object storage sans indexation', 'TraceQL pour recherche de traces par attributs et durée', 'OpenTelemetry comme standard instrumentation multi-langage', 'Span metrics pour dériver des métriques Prometheus des traces', 'Service Graph automatique depuis les relations entre spans', 'Corrélation traces vers logs via traceID dans Loki', 'Multi-protocol supporté OTLP Jaeger et Zipkin', 'Instrumentation auto et manuelle pour couverture complète']),
  },


  {
    id: 'graf-08',
    courseId: 'grafana',
    title: 'Grafana as Code',
    duration: '3h',
    orderIndex: 8,
    theoryContent: `## Grafana as Code

### Introduction au Grafana as Code

Gérer Grafana de manière déclarative permet de versionner les dashboards, automatiser les déploiements, et garantir la cohérence entre environnements. Les outils principaux sont le provisioning natif, le provider Terraform, et Grizzly pour la gestion GitOps.

### Provisioning natif Grafana

\`\`\`yaml
# /etc/grafana/provisioning/datasources/datasources.yaml
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
    editable: false
    jsonData:
      timeInterval: 15s
      httpMethod: POST

  - name: Loki
    type: loki
    access: proxy
    url: http://loki:3100
    jsonData:
      derivedFields:
        - name: TraceID
          matcherRegex: "traceID=(\\\\w+)"
          url: "\\\${__value.raw}"
          datasourceUid: tempo

  - name: Tempo
    type: tempo
    access: proxy
    url: http://tempo:3200
\`\`\`

\`\`\`yaml
# /etc/grafana/provisioning/dashboards/dashboards.yaml
apiVersion: 1
providers:
  - name: 'default'
    orgId: 1
    folder: 'Provisioned'
    type: file
    disableDeletion: true
    updateIntervalSeconds: 30
    options:
      path: /var/lib/grafana/dashboards
      foldersFromFilesStructure: true
\`\`\`

### Terraform Provider Grafana

\`\`\`hcl
# main.tf - Provider configuration
terraform {
  required_providers {
    grafana = {
      source  = "grafana/grafana"
      version = "~> 2.0"
    }
  }
}

provider "grafana" {
  url  = "https://grafana.company.com"
  auth = var.grafana_api_key
}

# Datasource
resource "grafana_data_source" "prometheus" {
  type = "prometheus"
  name = "Prometheus Production"
  url  = "http://prometheus-prod:9090"

  json_data_encoded = jsonencode({
    httpMethod   = "POST"
    timeInterval = "15s"
  })
}

# Folder
resource "grafana_folder" "platform" {
  title = "Platform Engineering"
}

# Dashboard depuis fichier JSON
resource "grafana_dashboard" "api_overview" {
  folder      = grafana_folder.platform.id
  config_json = file("dashboards/api-overview.json")

  overwrite = true
}

# Alert rule
resource "grafana_rule_group" "api_alerts" {
  name             = "API Alerts"
  folder_uid       = grafana_folder.platform.uid
  interval_seconds = 60

  rule {
    name      = "High Error Rate"
    condition = "C"

    data {
      ref_id = "A"
      relative_time_range {
        from = 300
        to   = 0
      }
      datasource_uid = grafana_data_source.prometheus.uid
      model = jsonencode({
        expr = "sum(rate(http_requests_total{status=~\"5..\"}[5m])) / sum(rate(http_requests_total[5m]))"
      })
    }

    data {
      ref_id = "C"
      relative_time_range {
        from = 0
        to   = 0
      }
      datasource_uid = "__expr__"
      model = jsonencode({
        type       = "threshold"
        conditions = [{ evaluator = { type = "gt", params = [0.05] } }]
      })
    }
  }
}

# Contact point
resource "grafana_contact_point" "slack" {
  name = "Slack DevOps"

  slack {
    url     = var.slack_webhook_url
    title   = "{{ .CommonLabels.alertname }}"
    text    = "{{ range .Alerts }}{{ .Annotations.description }}{{ end }}"
    channel = "#alerts-production"
  }
}

# Notification policy
resource "grafana_notification_policy" "default" {
  contact_point = grafana_contact_point.slack.name
  group_by      = ["alertname", "service"]

  policy {
    matcher {
      label = "severity"
      match = "="
      value = "critical"
    }
    contact_point = grafana_contact_point.slack.name
    group_wait    = "30s"
    group_interval = "5m"
  }
}
\`\`\`

### Grizzly - GitOps pour Grafana

\`\`\`bash
# Installation Grizzly
go install github.com/grafana/grizzly/cmd/grr@latest

# Configuration
export GRAFANA_URL=https://grafana.company.com
export GRAFANA_TOKEN=glsa_xxx

# Pull des ressources existantes
grr pull -t Dashboard
grr pull -t Datasource
grr pull -t AlertRuleGroup

# Structure des fichiers
# dashboards/
# ├── platform/
# │   ├── api-overview.yaml
# │   ├── kubernetes-cluster.yaml
# │   └── business-metrics.yaml
# └── team-backend/
#     ├── service-auth.yaml
#     └── service-payment.yaml

# Exemple de dashboard en YAML (Grizzly format)
# dashboards/platform/api-overview.yaml
apiVersion: grizzly.grafana.com/v1alpha1
kind: Dashboard
metadata:
  folder: Platform
  name: api-overview
spec:
  title: "API Overview"
  tags: ["api", "production"]
  panels:
    - title: "Request Rate"
      type: timeseries
      datasource: Prometheus
      targets:
        - expr: 'sum(rate(http_requests_total[5m])) by (service)'

# Diff avant application
grr diff dashboards/

# Apply (push vers Grafana)
grr apply dashboards/

# Watch mode (sync continu)
grr watch dashboards/
\`\`\`

### CI/CD pour dashboards

\`\`\`yaml
# .github/workflows/grafana-deploy.yml
name: Deploy Grafana Dashboards
on:
  push:
    branches: [main]
    paths: ['grafana/**']
  pull_request:
    paths: ['grafana/**']

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Validate dashboard JSON
        run: |
          for f in grafana/dashboards/**/*.json; do
            echo "Validating \\\${f}..."
            jq empty "\\\${f}" || exit 1
          done

      - name: Lint dashboards
        run: |
          npx @grafana/dashboard-linter lint grafana/dashboards/

  deploy-staging:
    if: github.ref == 'refs/heads/main'
    needs: validate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to staging
        env:
          GRAFANA_URL: https://grafana-staging.company.com
          GRAFANA_TOKEN: \\\${{ secrets.GRAFANA_STAGING_TOKEN }}
        run: |
          grr apply grafana/dashboards/
          grr apply grafana/alerting/

  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to production
        env:
          GRAFANA_URL: https://grafana.company.com
          GRAFANA_TOKEN: \\\${{ secrets.GRAFANA_PROD_TOKEN }}
        run: |
          grr apply grafana/dashboards/
          grr apply grafana/alerting/
\`\`\`

### Dashboard comme bibliothèque

\`\`\`bash
# Utiliser Jsonnet pour des dashboards modulaires
# lib/panels.libsonnet
{
  httpRequestRate(service):: {
    title: 'Request Rate - ' + service,
    type: 'timeseries',
    targets: [{
      expr: 'sum(rate(http_requests_total{service="' + service + '"}[5m])) by (method)',
    }],
  },
  
  errorRate(service):: {
    title: 'Error Rate - ' + service,
    type: 'stat',
    targets: [{
      expr: 'sum(rate(http_requests_total{service="' + service + '",status=~"5.."}[5m])) / sum(rate(http_requests_total{service="' + service + '"}[5m]))',
    }],
  },
}

# dashboards/service-template.jsonnet
local panels = import '../lib/panels.libsonnet';
local grafonnet = import 'github.com/grafana/grafonnet/gen/grafonnet-latest/main.libsonnet';

grafonnet.dashboard.new('Service: ' + std.extVar('service'))
+ grafonnet.dashboard.withPanels([
    panels.httpRequestRate(std.extVar('service')),
    panels.errorRate(std.extVar('service')),
])

# Génération
jsonnet -e 'std.extVar("service")' --ext-str service=payment dashboards/service-template.jsonnet > out/payment.json
\`\`\``,
    practiceContent: `### TP1 : Provisioning complet Grafana

Configurez le provisioning natif de Grafana pour 3 datasources et 5 dashboards organisés en dossiers. Déployez via Docker Compose et vérifiez que tout est disponible sans configuration manuelle au démarrage.

### TP2 : Terraform pour Grafana

Écrivez la configuration Terraform complète pour votre stack Grafana : datasources, folders, dashboards, alertes, contact points, et notification policies. Implémentez le workflow plan/apply et versionner dans Git.

### TP3 : Pipeline CI/CD dashboards

Créez un pipeline GitHub Actions qui : valide le JSON des dashboards, exécute un linter, déploie en staging, attend approbation manuelle, puis déploie en production. Ajoutez des tests de smoke (vérifier que les datasources répondent).

### TP4 : Bibliothèque de dashboards Jsonnet

Créez une bibliothèque Jsonnet avec des panels réutilisables (request rate, error rate, latency, resources). Générez 5 dashboards de service à partir du même template. Intégrez la génération dans le pipeline CI/CD.`,
    keyPoints: JSON.stringify(['Provisioning natif pour datasources et dashboards au boot', 'Terraform provider pour gestion déclarative complète', 'Grizzly pour workflow GitOps pull diff et apply', 'CI/CD pipeline avec validation linting et déploiement', 'Jsonnet et Grafonnet pour dashboards modulaires réutilisables', 'Versionning Git de toute la configuration Grafana', 'Environnements staging et production avec promotion', 'Dashboard as library avec panels et templates partagés']),
  },


  {
    id: 'helm-06',
    courseId: 'helm',
    title: 'Helm Secrets et sécurité',
    duration: '3h',
    orderIndex: 6,
    theoryContent: `## Helm Secrets et sécurité

### Introduction à la gestion des secrets Helm

Les charts Helm contiennent souvent des valeurs sensibles (mots de passe, tokens, clés API) qui ne doivent pas être stockées en clair dans Git. Plusieurs solutions existent : helm-secrets avec SOPS, Sealed Secrets, et age encryption. Chacune a ses avantages selon le workflow et l'infrastructure.

### helm-secrets avec SOPS

\`\`\`bash
# Installation du plugin helm-secrets
helm plugin install https://github.com/jkroepke/helm-secrets

# SOPS (Secrets OPerationS) supporte :
# - AWS KMS
# - GCP KMS
# - Azure Key Vault
# - age (local, simple)
# - PGP (legacy)

# Configuration .sops.yaml à la racine du projet
creation_rules:
  - path_regex: values/secrets\\..*\\.yaml
    age: "age1qy7dfsrrq4eyprf5aq7k0nf5k0wh8r6xlw4pqgnv7n7d4wc06lqq2hzl5v"
  - path_regex: secrets/production/.*
    kms: "arn:aws:kms:eu-west-1:123456789:key/abc-def-123"
  - path_regex: secrets/staging/.*
    gcp_kms: "projects/my-project/locations/global/keyRings/my-ring/cryptoKeys/my-key"

# Créer un fichier de secrets
cat > values/secrets.production.yaml << EOF
dbPassword: SuperSecret123!
apiKey: sk-abc123def456
redis:
  password: RedisPass789
smtp:
  username: noreply@company.com
  password: SmtpSecret
EOF

# Chiffrer le fichier
sops -e -i values/secrets.production.yaml

# Le fichier chiffré ressemble à :
# dbPassword: ENC[AES256_GCM,data:xxx,iv:yyy,tag:zzz]
# apiKey: ENC[AES256_GCM,data:xxx,iv:yyy,tag:zzz]

# Utiliser avec helm-secrets
helm secrets upgrade mon-app ./mon-chart \\
  -f values/values.yaml \\
  -f values/secrets.production.yaml \\
  --namespace production

# Déchiffrer pour debug (temporaire)
helm secrets decrypt values/secrets.production.yaml

# Éditer les secrets chiffrés
helm secrets edit values/secrets.production.yaml
\`\`\`

### Age encryption

\`\`\`bash
# age est une alternative moderne à PGP, plus simple
# Installation
# brew install age  (macOS)
# apt install age   (Ubuntu)

# Générer une paire de clés
age-keygen -o key.txt
# Public key: age1qy7dfsrrq4eyprf5aq7k0nf5k0wh8r6xlw4pqgnv7n7d4wc06lqq2hzl5v

# Configurer SOPS pour utiliser age
export SOPS_AGE_KEY_FILE=~/.config/sops/age/keys.txt

# .sops.yaml
creation_rules:
  - age: "age1qy7dfsrrq4eyprf5aq7k0nf5k0wh8r6xlw4pqgnv7n7d4wc06lqq2hzl5v,age1abc...second-recipient"

# Chiffrer
sops -e secrets.yaml > secrets.enc.yaml

# Déchiffrer
sops -d secrets.enc.yaml

# Dans CI/CD, exporter la clé privée comme variable
# SOPS_AGE_KEY contient la clé privée directement
export SOPS_AGE_KEY="AGE-SECRET-KEY-1ABC..."
\`\`\`

### Sealed Secrets (Bitnami)

\`\`\`bash
# Installation du controller dans le cluster
helm repo add sealed-secrets https://bitnami-labs.github.io/sealed-secrets
helm install sealed-secrets sealed-secrets/sealed-secrets \\
  --namespace kube-system

# Installation du client kubeseal
# brew install kubeseal

# Créer un SealedSecret
kubectl create secret generic db-creds \\
  --from-literal=password=SuperSecret123 \\
  --dry-run=client -o yaml | \\
  kubeseal --format yaml > sealed-db-creds.yaml

# Le SealedSecret peut être commité en toute sécurité
cat sealed-db-creds.yaml
# apiVersion: bitnami.com/v1alpha1
# kind: SealedSecret
# metadata:
#   name: db-creds
# spec:
#   encryptedData:
#     password: AgBy8h3k... (chiffré avec la clé du cluster)

# Appliquer le SealedSecret
kubectl apply -f sealed-db-creds.yaml
# Le controller déchiffre et crée le Secret Kubernetes

# Intégration dans un chart Helm
# templates/sealed-secret.yaml
apiVersion: bitnami.com/v1alpha1
kind: SealedSecret
metadata:
  name: {{ .Release.Name }}-secrets
spec:
  encryptedData:
    db-password: {{ .Values.sealedSecrets.dbPassword }}
    api-key: {{ .Values.sealedSecrets.apiKey }}
\`\`\`

### External Secrets Operator

\`\`\`yaml
# ExternalSecret - synchroniser depuis un vault externe
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: app-secrets
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: aws-secrets-manager
    kind: SecretStore
  target:
    name: app-secrets
    creationPolicy: Owner
  data:
    - secretKey: db-password
      remoteRef:
        key: production/database
        property: password
    - secretKey: api-key
      remoteRef:
        key: production/api-keys
        property: main-key

---
# SecretStore pour AWS Secrets Manager
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: aws-secrets-manager
spec:
  provider:
    aws:
      service: SecretsManager
      region: eu-west-1
      auth:
        jwt:
          serviceAccountRef:
            name: external-secrets-sa
\`\`\`

### Bonnes pratiques sécurité Helm

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│            BONNES PRATIQUES SECRETS HELM                       │
│                                                               │
│  ✓ Ne JAMAIS commiter de secrets en clair dans Git          │
│  ✓ Utiliser SOPS/age pour les secrets dans le repo          │
│  ✓ Préférer External Secrets pour les vaults existants      │
│  ✓ Rotation automatique des secrets (refreshInterval)       │
│  ✓ Least privilege : RBAC minimal pour accès secrets        │
│  ✓ Audit : qui accède à quels secrets quand                 │
│  ✓ Séparation environnements (clés différentes)             │
│  ✓ Backup des clés de chiffrement (disaster recovery)       │
│                                                               │
│  ✗ Ne PAS stocker de secrets dans values.yaml non chiffrés  │
│  ✗ Ne PAS utiliser des ConfigMaps pour des données sensibles│
│  ✗ Ne PAS partager des clés entre environnements            │
│  ✗ Ne PAS hardcoder des secrets dans les templates          │
└─────────────────────────────────────────────────────────────┘
\`\`\``,
    practiceContent: `### TP1 : Configuration helm-secrets avec SOPS et age

Installez helm-secrets et configurez SOPS avec age. Créez un fichier de secrets chiffré pour une application (database, API keys, SMTP). Déployez le chart en utilisant helm secrets. Vérifiez que les secrets sont correctement injectés dans les pods.

### TP2 : Sealed Secrets workflow

Déployez le controller Sealed Secrets. Créez des SealedSecrets pour 3 environnements (dev, staging, prod). Intégrez-les dans un chart Helm. Testez la rotation d'un secret et vérifiez que le pod est redémarré avec la nouvelle valeur.

### TP3 : External Secrets avec vault

Configurez External Secrets Operator avec un vault (HashiCorp Vault ou AWS Secrets Manager simulé). Synchronisez 5 secrets vers Kubernetes. Testez le refreshInterval et la rotation automatique. Vérifiez les logs d'audit.

### TP4 : Audit sécurité des charts Helm

Auditez un chart Helm existant pour les problèmes de sécurité : secrets en clair, images sans tag fixe, containers en root, pas de SecurityContext, pas de NetworkPolicies. Corrigez tous les problèmes et documentez les changements.`,
    keyPoints: JSON.stringify(['helm-secrets avec SOPS pour chiffrement dans Git', 'Age comme alternative moderne et simple à PGP', 'Sealed Secrets pour chiffrement côté cluster Kubernetes', 'External Secrets Operator pour synchronisation depuis vaults', 'SOPS supporte AWS KMS GCP KMS et Azure Key Vault', 'Rotation automatique des secrets avec refreshInterval', 'Séparation des clés de chiffrement par environnement', 'Audit et RBAC minimal pour accès aux secrets']),
  },


  {
    id: 'helm-07',
    courseId: 'helm',
    title: 'Helmfile et environnements',
    duration: '3h',
    orderIndex: 7,
    theoryContent: `## Helmfile et gestion des environnements

### Introduction à Helmfile

Helmfile est un outil déclaratif pour gérer plusieurs releases Helm. Il permet de décrire l'état désiré de toutes les releases d'un cluster dans un seul fichier, avec support des environnements, des sélecteurs, et de la synchronisation. C'est l'équivalent de Terraform pour Helm.

### Structure Helmfile

\`\`\`yaml
# helmfile.yaml - Fichier principal
repositories:
  - name: bitnami
    url: https://charts.bitnami.com/bitnami
  - name: ingress-nginx
    url: https://kubernetes.github.io/ingress-nginx
  - name: prometheus-community
    url: https://prometheus-community.github.io/helm-charts

environments:
  development:
    values:
      - environments/development/values.yaml
    secrets:
      - environments/development/secrets.yaml
  staging:
    values:
      - environments/staging/values.yaml
    secrets:
      - environments/staging/secrets.yaml
  production:
    values:
      - environments/production/values.yaml
    secrets:
      - environments/production/secrets.yaml

---

helmDefaults:
  wait: true
  timeout: 300
  createNamespace: true
  cleanupOnFail: true

releases:
  - name: ingress-nginx
    namespace: ingress-system
    chart: ingress-nginx/ingress-nginx
    version: 4.8.3
    values:
      - values/ingress-nginx/common.yaml
      - values/ingress-nginx/{{ .Environment.Name }}.yaml

  - name: postgresql
    namespace: database
    chart: bitnami/postgresql
    version: 13.2.0
    values:
      - values/postgresql/common.yaml
      - values/postgresql/{{ .Environment.Name }}.yaml
    secrets:
      - values/postgresql/secrets.{{ .Environment.Name }}.yaml

  - name: api-backend
    namespace: application
    chart: ./charts/api-backend
    values:
      - values/api-backend/common.yaml
      - values/api-backend/{{ .Environment.Name }}.yaml
    set:
      - name: image.tag
        value: {{ env "IMAGE_TAG" | default "latest" }}
    labels:
      tier: application
      team: backend

  - name: monitoring
    namespace: monitoring
    chart: prometheus-community/kube-prometheus-stack
    version: 54.0.0
    values:
      - values/monitoring/common.yaml
      - values/monitoring/{{ .Environment.Name }}.yaml
    labels:
      tier: infrastructure
      team: devops
\`\`\`

### Fichiers de valeurs par environnement

\`\`\`yaml
# environments/production/values.yaml
global:
  environment: production
  domain: app.company.com
  replicas: 3
  resources:
    requests:
      cpu: 500m
      memory: 512Mi
    limits:
      cpu: 2000m
      memory: 2Gi

# environments/development/values.yaml
global:
  environment: development
  domain: app.dev.company.com
  replicas: 1
  resources:
    requests:
      cpu: 100m
      memory: 128Mi
    limits:
      cpu: 500m
      memory: 512Mi
\`\`\`

\`\`\`yaml
# values/api-backend/common.yaml (partagé entre envs)
replicaCount: {{ .Values.global.replicas }}
image:
  repository: registry.company.com/api-backend
  pullPolicy: IfNotPresent
ingress:
  enabled: true
  hostname: api.{{ .Values.global.domain }}
resources: {{ toYaml .Values.global.resources | nindent 2 }}

# values/api-backend/production.yaml (override production)
autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 10
  targetCPU: 70
podDisruptionBudget:
  enabled: true
  minAvailable: 2
\`\`\`

### Commandes Helmfile

\`\`\`bash
# Appliquer toutes les releases pour un environnement
helmfile -e production apply

# Diff avant application (dry-run amélioré)
helmfile -e production diff

# Sync (apply sans confirmation)
helmfile -e production sync

# Appliquer seulement certaines releases (sélecteurs)
helmfile -e production -l tier=application apply
helmfile -e production -l team=backend apply
helmfile -e production -l name=api-backend apply

# Lister les releases
helmfile -e production list

# Détruire un environnement
helmfile -e development destroy

# Template (voir le résultat sans appliquer)
helmfile -e staging template > rendered.yaml

# Fetch les charts (télécharger sans installer)
helmfile -e production fetch

# Lint toutes les releases
helmfile -e production lint
\`\`\`

### Organisation multi-fichiers

\`\`\`
Structure recommandée :
├── helmfile.yaml            # Fichier principal
├── helmfile.d/              # Sous-fichiers par domaine
│   ├── 00-infrastructure.yaml
│   ├── 10-database.yaml
│   ├── 20-messaging.yaml
│   ├── 30-application.yaml
│   └── 40-monitoring.yaml
├── environments/
│   ├── development/
│   │   ├── values.yaml
│   │   └── secrets.yaml
│   ├── staging/
│   │   ├── values.yaml
│   │   └── secrets.yaml
│   └── production/
│       ├── values.yaml
│       └── secrets.yaml
├── values/
│   ├── api-backend/
│   │   ├── common.yaml
│   │   ├── development.yaml
│   │   ├── staging.yaml
│   │   └── production.yaml
│   └── postgresql/
│       ├── common.yaml
│       └── production.yaml
└── charts/                  # Charts locaux
    └── api-backend/
        ├── Chart.yaml
        ├── values.yaml
        └── templates/
\`\`\`

\`\`\`yaml
# helmfile.d/30-application.yaml
releases:
  - name: api-backend
    namespace: {{ .Values.global.namespace | default "application" }}
    chart: ./charts/api-backend
    installed: {{ .Values.global.environment != "development" | default true }}
    values:
      - values/api-backend/common.yaml
      - values/api-backend/{{ .Environment.Name }}.yaml
    hooks:
      - events: ["presync"]
        command: "kubectl"
        args: ["apply", "-f", "manifests/namespace.yaml"]
      - events: ["postsync"]
        command: "./scripts/smoke-test.sh"
        args: ["{{ .Values.global.domain }}"]
    labels:
      tier: application

  - name: worker
    namespace: application
    chart: ./charts/worker
    needs:
      - database/postgresql
      - messaging/rabbitmq
    values:
      - values/worker/common.yaml
      - values/worker/{{ .Environment.Name }}.yaml
    labels:
      tier: application
\`\`\`

### Hooks et dépendances

\`\`\`yaml
# Dépendances entre releases
releases:
  - name: postgresql
    namespace: database
    chart: bitnami/postgresql

  - name: rabbitmq
    namespace: messaging
    chart: bitnami/rabbitmq

  - name: api-backend
    namespace: application
    chart: ./charts/api-backend
    needs:
      - database/postgresql        # attend que postgres soit prêt
      - messaging/rabbitmq         # attend que rabbit soit prêt

  - name: frontend
    namespace: application
    chart: ./charts/frontend
    needs:
      - application/api-backend    # attend que l'API soit prête
\`\`\``,
    practiceContent: `### TP1 : Helmfile multi-environnements

Créez un helmfile.yaml gérant 5 releases (ingress, database, cache, backend, frontend) pour 3 environnements. Configurez les valeurs par environnement : 1 replica en dev, 3 en production, domaines différents, resources adaptées. Testez le déploiement complet.

### TP2 : Sélecteurs et déploiement partiel

Organisez vos releases avec des labels (tier, team, criticality). Testez les déploiements partiels : seulement l'infrastructure, seulement les apps d'une équipe, tout sauf le monitoring. Documentez les commandes pour chaque scénario opérationnel.

### TP3 : Helmfile diff et CI/CD

Intégrez helmfile dans votre pipeline CI/CD. Sur les PRs, exécutez helmfile diff pour montrer les changements. Sur merge vers main, exécutez helmfile apply pour staging puis production (avec gate d'approbation). Ajoutez des smoke tests post-déploiement.

### TP4 : Migration vers Helmfile

Prenez un cluster existant avec 10+ releases Helm manuelles. Documentez l'état actuel. Créez le helmfile.yaml correspondant. Exécutez helmfile diff pour vérifier la concordance. Effectuez la migration et validez que rien n'a changé.`,
    keyPoints: JSON.stringify(['Helmfile comme déclaration de l état désiré multi-releases', 'Environnements avec values et secrets par contexte', 'Sélecteurs par labels pour déploiement partiel ciblé', 'Diff avant apply pour revue des changements', 'Dépendances entre releases avec needs', 'Organisation multi-fichiers helmfile.d par domaine', 'Hooks presync et postsync pour actions complémentaires', 'Intégration CI/CD avec diff sur PR et apply sur merge']),
  },


  {
    id: 'helm-08',
    courseId: 'helm',
    title: 'Debugging et migration Helm',
    duration: '3h',
    orderIndex: 8,
    theoryContent: `## Debugging et migration Helm

### Introduction au debugging Helm

Le debugging des charts Helm est une compétence essentielle car les erreurs de template peuvent être cryptiques. De la génération des manifests au déploiement effectif, chaque étape peut échouer. Comprendre les outils de debug et les erreurs courantes accélère considérablement le troubleshooting.

### Commandes de debug template

\`\`\`bash
# Rendre les templates sans installer (dry-run client)
helm template mon-release ./mon-chart \\
  -f values.yaml \\
  --debug \\
  > rendered.yaml

# Dry-run côté serveur (validation API Kubernetes)
helm install mon-release ./mon-chart \\
  -f values.yaml \\
  --dry-run=server \\
  --debug

# Rendre un seul template
helm template mon-release ./mon-chart \\
  -s templates/deployment.yaml \\
  -f values.yaml

# Voir les valeurs calculées
helm get values mon-release -n production
helm get values mon-release -n production --all  # inclut defaults

# Voir les manifests déployés
helm get manifest mon-release -n production

# Voir les hooks
helm get hooks mon-release -n production

# Voir les notes
helm get notes mon-release -n production

# Historique des révisions
helm history mon-release -n production
\`\`\`

### Erreurs courantes et solutions

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│            ERREURS COURANTES HELM                              │
│                                                               │
│  Erreur: "YAML parse error"                                  │
│  Cause: Indentation incorrecte dans les templates            │
│  Fix: Utiliser nindent au lieu de indent, vérifier les       │
│       blocs multilignes avec |, >, et les tirets             │
│                                                               │
│  Erreur: "nil pointer evaluating interface {}"               │
│  Cause: Accès à une valeur inexistante dans Values           │
│  Fix: Utiliser default ou vérifier avec if/with              │
│       {{ .Values.config.port | default 8080 }}               │
│       {{ with .Values.config }}...{{ end }}                  │
│                                                               │
│  Erreur: "release already exists"                            │
│  Cause: Release en état failed ou pending                    │
│  Fix: helm uninstall puis réinstaller, ou --replace          │
│                                                               │
│  Erreur: "resource already exists and is not managed by Helm"│
│  Cause: Ressource créée manuellement ou par un autre tool    │
│  Fix: Ajouter les annotations helm.sh/resource-policy       │
│       ou adopter avec kubectl annotate                       │
│                                                               │
│  Erreur: "UPGRADE FAILED: another operation in progress"     │
│  Cause: Release bloquée en état pending-upgrade              │
│  Fix: helm rollback ou supprimer le secret de release        │
└─────────────────────────────────────────────────────────────┘
\`\`\`

\`\`\`bash
# Débloquer une release en état pending
# ATTENTION: opération dangereuse
kubectl get secrets -n production -l owner=helm,status=pending-upgrade

# Méthode 1: Rollback
helm rollback mon-release 0 -n production

# Méthode 2: Forcer l'état (dernier recours)
kubectl patch secret sh.helm.release.v1.mon-release.v5 -n production \\
  -p '{"metadata":{"labels":{"status":"deployed"}}}'

# Adopter une ressource existante
kubectl annotate deployment mon-app \\
  meta.helm.sh/release-name=mon-release \\
  meta.helm.sh/release-namespace=production
kubectl label deployment mon-app \\
  app.kubernetes.io/managed-by=Helm
\`\`\`

### Debugging avec des fonctions template

\`\`\`yaml
# Utiliser printf pour debug dans les templates
# templates/debug.yaml (à supprimer après debug)
{{- if .Values.debug }}
apiVersion: v1
kind: ConfigMap
metadata:
  name: debug-values
data:
  all-values: |
{{ .Values | toYaml | indent 4 }}
  computed-name: {{ include "mychart.fullname" . }}
  release-info: |
    Name: {{ .Release.Name }}
    Namespace: {{ .Release.Namespace }}
    IsUpgrade: {{ .Release.IsUpgrade }}
    Revision: {{ .Release.Revision }}
  capabilities: |
    KubeVersion: {{ .Capabilities.KubeVersion }}
    APIVersions: {{ .Capabilities.APIVersions | join ", " }}
{{- end }}

# Fonctions utiles pour debug
# toYaml - convertir en YAML pour inspection
# typeOf - vérifier le type d'une valeur
# kindOf - similaire à typeOf
# required - échouer avec message si valeur absente
{{ required "dbPassword est obligatoire!" .Values.database.password }}
\`\`\`

### Migration Helm v2 vers v3

\`\`\`bash
# Vérifier les releases Helm v2 existantes
helm2 list --all

# Plugin de migration officiel
helm plugin install https://github.com/helm/helm-2to3

# Étape 1: Migrer la configuration
helm 2to3 move config

# Étape 2: Migrer les releases une par une
helm 2to3 convert mon-release --dry-run
helm 2to3 convert mon-release

# Étape 3: Nettoyer les données Helm v2
helm 2to3 cleanup --dry-run
helm 2to3 cleanup

# Différences majeures v2 vs v3:
# - Tiller supprimé (sécurité RBAC native)
# - Releases stockées dans des Secrets (pas ConfigMaps)
# - Releases scope par namespace
# - Validation JSON Schema pour values
# - Commandes simplifiées (install/upgrade fusionnées via --install)
# - .Capabilities.APIVersions plus précis
\`\`\`

### Problèmes courants et solutions avancées

\`\`\`bash
# Problème: Template génère du YAML invalide
# Solution: Tester avec kubeval ou kubeconform
helm template mon-release ./mon-chart | kubeval --strict
helm template mon-release ./mon-chart | kubeconform -strict

# Problème: Hooks bloquent le déploiement
helm upgrade mon-release ./mon-chart --no-hooks
# Ou supprimer le hook bloqué:
kubectl delete job mon-release-migrate -n production

# Problème: CRDs ne sont pas mises à jour
# Helm ne met pas à jour les CRDs après l'install initial
kubectl apply -f ./mon-chart/crds/

# Problème: Ordre de déploiement incorrect
# Utiliser les weights dans les hooks
metadata:
  annotations:
    "helm.sh/hook": pre-install
    "helm.sh/hook-weight": "-5"  # exécuté avant weight 0

# Problème: Secrets pas mis à jour dans les pods
# Utiliser un checksum pour forcer le rolling update
spec:
  template:
    metadata:
      annotations:
        checksum/config: {{ include (print .Template.BasePath "/configmap.yaml") . | sha256sum }}
        checksum/secret: {{ include (print .Template.BasePath "/secret.yaml") . | sha256sum }}

# Problème: Helm upgrade timeout
helm upgrade mon-release ./mon-chart \\
  --timeout 10m \\
  --wait \\
  --atomic  # rollback automatique si échec
\`\`\`

### Tests des charts

\`\`\`bash
# Tests intégrés Helm
# templates/tests/test-connection.yaml
apiVersion: v1
kind: Pod
metadata:
  name: "{{ .Release.Name }}-test"
  annotations:
    "helm.sh/hook": test
spec:
  containers:
    - name: test
      image: busybox
      command: ['wget', '--spider', 'http://{{ .Release.Name }}:{{ .Values.service.port }}']
  restartPolicy: Never

# Exécuter les tests
helm test mon-release -n production

# Tests avec chart-testing (ct)
ct lint --charts ./charts/
ct install --charts ./charts/ --namespace test

# Tests unitaires avec helm-unittest
helm plugin install https://github.com/helm-unittest/helm-unittest
helm unittest ./mon-chart/
\`\`\``,
    practiceContent: `### TP1 : Debugging template avancé

Prenez un chart Helm complexe qui échoue à l'installation. Utilisez helm template --debug, dry-run=server, et les fonctions de debug pour identifier et corriger 5 erreurs différentes : indentation, nil pointer, type mismatch, required manquant, et YAML invalide.

### TP2 : Migration v2 vers v3

Sur un cluster avec 10 releases Helm v2, exécutez la migration complète vers v3. Documentez chaque étape, les erreurs rencontrées, et les vérifications post-migration. Confirmez que toutes les releases fonctionnent identiquement après migration.

### TP3 : Tests unitaires de charts

Écrivez des tests unitaires pour un chart complexe couvrant : valeurs par défaut, overrides, conditions (if/with), boucles (range), et helpers. Atteignez une couverture de 90% des templates. Intégrez les tests dans le pipeline CI.

### TP4 : Troubleshooting en production

Simulez 5 scénarios problématiques en production : release en pending-upgrade, hook bloqué, rollback nécessaire, conflit de ressources existantes, et timeout. Résolvez chaque situation et créez un runbook d'intervention pour votre équipe.`,
    keyPoints: JSON.stringify(['helm template debug pour inspection des manifests générés', 'dry-run server pour validation API Kubernetes', 'Erreurs courantes nil pointer YAML parse et pending state', 'Migration v2 vers v3 avec plugin 2to3 par étapes', 'Adoption de ressources existantes via annotations Helm', 'Tests unitaires avec helm-unittest pour validation templates', 'Atomic et rollback automatique en cas de timeout', 'Checksum annotations pour forcer redéploiement sur changement']),
  },


  {
    id: 'argo-06',
    courseId: 'argocd',
    title: 'ArgoCD et Helm',
    duration: '3h',
    orderIndex: 6,
    theoryContent: `## ArgoCD et Helm

### Introduction à la gestion Helm avec ArgoCD

ArgoCD supporte nativement Helm comme source d'applications. Il peut déployer des charts depuis des repositories Helm, des charts locaux dans Git, et gérer les values files par environnement. L'intégration permet de combiner la puissance des templates Helm avec le GitOps d'ArgoCD.

### Application Helm dans ArgoCD

\`\`\`yaml
# Application ArgoCD avec chart Helm depuis un repo
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: api-backend-production
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://charts.company.com
    chart: api-backend
    targetRevision: 2.1.0
    helm:
      releaseName: api-backend
      values: |
        replicaCount: 3
        image:
          repository: registry.company.com/api-backend
          tag: v1.5.2
        ingress:
          enabled: true
          hostname: api.company.com
        resources:
          requests:
            cpu: 500m
            memory: 512Mi
          limits:
            cpu: 2000m
            memory: 2Gi
        autoscaling:
          enabled: true
          minReplicas: 3
          maxReplicas: 10
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
\`\`\`

### Values files par environnement dans Git

\`\`\`yaml
# Application avec values files depuis Git
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: api-backend-staging
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/company/deployment-configs.git
    targetRevision: main
    path: charts/api-backend
    helm:
      releaseName: api-backend
      valueFiles:
        - values.yaml
        - values-staging.yaml
      parameters:
        - name: image.tag
          value: "latest"
  destination:
    server: https://kubernetes.default.svc
    namespace: staging
\`\`\`

\`\`\`
Structure du dépôt de déploiement :
├── charts/
│   └── api-backend/
│       ├── Chart.yaml
│       ├── values.yaml              # Valeurs par défaut
│       ├── values-development.yaml  # Override dev
│       ├── values-staging.yaml      # Override staging
│       ├── values-production.yaml   # Override production
│       └── templates/
│           ├── deployment.yaml
│           ├── service.yaml
│           ├── ingress.yaml
│           └── hpa.yaml
\`\`\`

### Multi-sources (Helm + values séparés)

\`\`\`yaml
# ArgoCD 2.6+ : Multiple sources
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: api-backend
  namespace: argocd
spec:
  project: default
  sources:
    # Source 1: Le chart Helm (depuis un repo Helm)
    - repoURL: https://charts.company.com
      chart: api-backend
      targetRevision: 2.1.0
      helm:
        releaseName: api-backend
        valueFiles:
          # Référence au fichier dans la source 2
          - \\\$values/environments/production/api-backend.yaml
    # Source 2: Les values (depuis Git)
    - repoURL: https://github.com/company/helm-values.git
      targetRevision: main
      ref: values
  destination:
    server: https://kubernetes.default.svc
    namespace: production
\`\`\`

### Auto-sync et gestion des mises à jour

\`\`\`yaml
# Application avec auto-sync conditionnel
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: api-backend
  namespace: argocd
  annotations:
    notifications.argoproj.io/subscribe.on-sync-succeeded.slack: devops-channel
    notifications.argoproj.io/subscribe.on-sync-failed.slack: devops-alerts
spec:
  source:
    repoURL: https://github.com/company/deployments.git
    path: apps/api-backend/production
    helm:
      valueFiles:
        - values.yaml
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
      allowEmpty: false
    syncOptions:
      - CreateNamespace=true
      - PruneLast=true
      - ApplyOutOfSyncOnly=true
      - ServerSideApply=true
    retry:
      limit: 3
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m
\`\`\`

### Workflow de mise à jour d'image

\`\`\`bash
# Stratégie 1: ArgoCD Image Updater
# Mise à jour automatique de l'image tag
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: api-backend
  annotations:
    argocd-image-updater.argoproj.io/image-list: backend=registry.company.com/api-backend
    argocd-image-updater.argoproj.io/backend.update-strategy: semver
    argocd-image-updater.argoproj.io/backend.allow-tags: "regexp:^v\\\\d+\\\\.\\\\d+\\\\.\\\\d+$"
    argocd-image-updater.argoproj.io/backend.helm.image-name: image.repository
    argocd-image-updater.argoproj.io/backend.helm.image-tag: image.tag
    argocd-image-updater.argoproj.io/write-back-method: git
spec:
  # ...

# Stratégie 2: CI met à jour le values file dans Git
# Dans le pipeline CI après build de l'image:
git clone git@github.com:company/deployments.git
cd deployments/apps/api-backend/production
yq e '.image.tag = env(NEW_TAG)' -i values.yaml
git add values.yaml
git commit -m "chore: update api-backend to \\\${NEW_TAG}"
git push

# ArgoCD détecte le changement et sync automatiquement
\`\`\`

### Helm hooks et ArgoCD

\`\`\`yaml
# Les Helm hooks sont supportés mais avec des différences
# ArgoCD convertit les hooks Helm en ArgoCD resource hooks

# Hook de migration de base de données
apiVersion: batch/v1
kind: Job
metadata:
  name: db-migration
  annotations:
    # Hook Helm classique:
    # "helm.sh/hook": pre-upgrade
    # Équivalent ArgoCD:
    argocd.argoproj.io/hook: PreSync
    argocd.argoproj.io/hook-delete-policy: HookSucceeded
spec:
  template:
    spec:
      containers:
        - name: migrate
          image: registry.company.com/api-backend:{{ .Values.image.tag }}
          command: ["./migrate", "up"]
      restartPolicy: Never
  backoffLimit: 3
\`\`\``,
    practiceContent: `### TP1 : Déploiement Helm via ArgoCD

Créez une Application ArgoCD qui déploie un chart Helm depuis un repository. Configurez les values inline et par fichier. Testez la mise à jour en changeant la version du chart et vérifiez le sync automatique.

### TP2 : Multi-environnements avec values files

Configurez 3 Applications ArgoCD (dev, staging, prod) utilisant le même chart Helm mais des values files différents depuis Git. Testez le workflow : modification des values en staging, validation, puis promotion vers production.

### TP3 : Image Updater automatique

Configurez ArgoCD Image Updater pour mettre à jour automatiquement le tag d'image quand une nouvelle version est poussée au registry. Testez avec la stratégie semver et vérifiez que le write-back Git crée bien un commit.

### TP4 : Migration Helm standalone vers ArgoCD

Prenez 5 releases Helm déployées manuellement et migrez-les vers ArgoCD. Créez les manifests Application, importez les values existants, et vérifiez que ArgoCD montre l'état "Synced" sans diff. Documentez les pièges de la migration.`,
    keyPoints: JSON.stringify(['Support natif des charts Helm comme source Application', 'Values files par environnement dans Git avec multi-sources', 'ArgoCD Image Updater pour mise à jour automatique des tags', 'Multi-sources pour séparer chart et values dans des repos différents', 'Auto-sync avec self-heal et prune pour GitOps complet', 'Hooks Helm convertis en resource hooks ArgoCD', 'Write-back Git pour traçabilité des changements automatiques', 'Retry policy pour résilience des synchronisations']),
  },


  {
    id: 'argo-07',
    courseId: 'argocd',
    title: 'Progressive Delivery avec Argo Rollouts',
    duration: '3h',
    orderIndex: 7,
    theoryContent: `## Progressive Delivery avec Argo Rollouts

### Introduction au Progressive Delivery

Le Progressive Delivery étend le continuous delivery en ajoutant des mécanismes de contrôle progressif : canary deployments, blue-green, et analyse automatique. Argo Rollouts remplace le Deployment Kubernetes standard par un contrôleur avancé qui gère ces stratégies de manière déclarative.

### Architecture Argo Rollouts

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│            ARGO ROLLOUTS ARCHITECTURE                          │
│                                                               │
│  ┌──────────────────────────────────────────────────┐       │
│  │                  ROLLOUT CRD                       │       │
│  │  (remplace Deployment pour progressive delivery)  │       │
│  └───────────────────────┬──────────────────────────┘       │
│                          │                                   │
│         ┌────────────────┼────────────────┐                 │
│         ▼                ▼                ▼                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  │  Stable RS   │ │  Canary RS   │ │AnalysisRun   │       │
│  │  (v1 - 90%)  │ │  (v2 - 10%) │ │(metrics check)│       │
│  └──────────────┘ └──────────────┘ └──────────────┘       │
│                                           │                  │
│                                    ┌──────▼──────┐          │
│                                    │ Prometheus  │          │
│                                    │ (métriques) │          │
│                                    └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Canary Deployment

\`\`\`yaml
# Rollout avec stratégie Canary
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: api-backend
spec:
  replicas: 10
  selector:
    matchLabels:
      app: api-backend
  template:
    metadata:
      labels:
        app: api-backend
    spec:
      containers:
        - name: api
          image: registry.company.com/api-backend:v2.0.0
          ports:
            - containerPort: 8080
  strategy:
    canary:
      canaryService: api-backend-canary
      stableService: api-backend-stable
      trafficRouting:
        istio:
          virtualServices:
            - name: api-backend-vsvc
              routes:
                - primary
        # Alternative: nginx
        # nginx:
        #   stableIngress: api-backend-stable
        #   annotationPrefix: nginx.ingress.kubernetes.io
      steps:
        - setWeight: 5
        - pause: {duration: 2m}
        - analysis:
            templates:
              - templateName: success-rate
            args:
              - name: service-name
                value: api-backend-canary
        - setWeight: 20
        - pause: {duration: 5m}
        - analysis:
            templates:
              - templateName: success-rate
              - templateName: latency-check
        - setWeight: 50
        - pause: {duration: 10m}
        - analysis:
            templates:
              - templateName: success-rate
              - templateName: latency-check
              - templateName: error-rate
        - setWeight: 100
\`\`\`

### Blue-Green Deployment

\`\`\`yaml
# Rollout avec stratégie Blue-Green
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: api-backend
spec:
  replicas: 5
  selector:
    matchLabels:
      app: api-backend
  template:
    metadata:
      labels:
        app: api-backend
    spec:
      containers:
        - name: api
          image: registry.company.com/api-backend:v2.0.0
  strategy:
    blueGreen:
      activeService: api-backend-active
      previewService: api-backend-preview
      autoPromotionEnabled: false
      autoPromotionSeconds: 300
      prePromotionAnalysis:
        templates:
          - templateName: smoke-tests
        args:
          - name: preview-url
            value: "http://api-backend-preview:8080"
      postPromotionAnalysis:
        templates:
          - templateName: success-rate
      scaleDownDelaySeconds: 30
      abortScaleDownDelaySeconds: 30
\`\`\`

### AnalysisTemplate

\`\`\`yaml
# Template d'analyse basé sur Prometheus
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: success-rate
spec:
  args:
    - name: service-name
  metrics:
    - name: success-rate
      interval: 30s
      count: 10
      successCondition: result[0] >= 0.95
      failureCondition: result[0] < 0.90
      failureLimit: 3
      provider:
        prometheus:
          address: http://prometheus:9090
          query: |
            sum(rate(http_requests_total{service="{{args.service-name}}",status!~"5.."}[5m]))
            /
            sum(rate(http_requests_total{service="{{args.service-name}}"}[5m]))

---
# Template vérification latence
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: latency-check
spec:
  args:
    - name: service-name
  metrics:
    - name: p99-latency
      interval: 60s
      count: 5
      successCondition: result[0] < 0.5
      failureCondition: result[0] > 2.0
      failureLimit: 2
      provider:
        prometheus:
          address: http://prometheus:9090
          query: |
            histogram_quantile(0.99,
              sum(rate(http_request_duration_seconds_bucket{service="{{args.service-name}}"}[5m]))
              by (le)
            )

---
# Template avec test HTTP (smoke test)
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: smoke-tests
spec:
  args:
    - name: preview-url
  metrics:
    - name: smoke-test
      count: 1
      provider:
        job:
          spec:
            template:
              spec:
                containers:
                  - name: smoke
                    image: curlimages/curl
                    command:
                      - sh
                      - -c
                      - |
                        curl -sf {{args.preview-url}}/health && 
                        curl -sf {{args.preview-url}}/api/v1/status
                restartPolicy: Never
            backoffLimit: 2
\`\`\`

### Traffic Split avec Istio/Nginx

\`\`\`yaml
# VirtualService Istio pour traffic split
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: api-backend-vsvc
spec:
  hosts:
    - api.company.com
  http:
    - name: primary
      route:
        - destination:
            host: api-backend-stable
          weight: 90
        - destination:
            host: api-backend-canary
          weight: 10
\`\`\`

### Commandes kubectl argo rollouts

\`\`\`bash
# Installation du plugin kubectl
kubectl argo rollouts version

# Voir le statut d'un rollout
kubectl argo rollouts get rollout api-backend -n production --watch

# Promouvoir manuellement (passer au step suivant)
kubectl argo rollouts promote api-backend -n production

# Promouvoir complètement (skip all steps)
kubectl argo rollouts promote api-backend -n production --full

# Abort (rollback immédiat)
kubectl argo rollouts abort api-backend -n production

# Retry après un abort
kubectl argo rollouts retry rollout api-backend -n production

# Dashboard web
kubectl argo rollouts dashboard
\`\`\``,
    practiceContent: `### TP1 : Canary deployment avec analyse

Déployez une application avec Argo Rollouts en stratégie canary. Configurez 4 étapes (5%, 20%, 50%, 100%) avec des pauses et analyses Prometheus entre chaque étape. Simulez un déploiement réussi puis un déploiement avec erreurs (auto-rollback).

### TP2 : Blue-Green avec smoke tests

Implémentez un déploiement blue-green avec pré-promotion analysis. Configurez des smoke tests automatiques sur l'environnement preview. Testez la promotion automatique après succès et le rollback après échec des tests.

### TP3 : AnalysisTemplates avancés

Créez 5 AnalysisTemplates couvrant : success rate, latence P99, taux d'erreur, test HTTP, et vérification custom (job Kubernetes). Combinez-les dans un rollout multi-étapes et testez chaque scénario (succès, échec, inconclusive).

### TP4 : Traffic splitting avec service mesh

Configurez le traffic routing avec Istio ou Nginx Ingress. Implémentez un canary basé sur les headers (version beta pour certains utilisateurs) en plus du weight-based routing. Visualisez le trafic dans Grafana pendant le rollout.`,
    keyPoints: JSON.stringify(['Rollout CRD remplace Deployment pour progressive delivery', 'Canary avec steps progressifs et pauses configurables', 'Blue-Green avec promotion manuelle ou automatique', 'AnalysisTemplate pour validation automatique par métriques', 'Traffic split via Istio Nginx ou AWS ALB', 'Rollback automatique si métriques dégradées', 'Plugin kubectl argo rollouts pour gestion interactive', 'Combinaison multiple analyses par étape de canary']),
  },


  {
    id: 'argo-08',
    courseId: 'argocd',
    title: 'ArgoCD en entreprise',
    duration: '3h',
    orderIndex: 8,
    theoryContent: `## ArgoCD en entreprise

### Introduction à ArgoCD à grande échelle

Déployer ArgoCD pour une équipe est simple. Le déployer pour une entreprise entière avec des centaines d'applications, de multiples clusters, et des exigences de sécurité strictes nécessite une architecture soigneusement pensée : multi-tenancy, isolation, audit, et patterns de gestion à grande échelle.

### Multi-tenancy et Projects

\`\`\`yaml
# AppProject pour isolation par équipe
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: team-backend
  namespace: argocd
spec:
  description: "Projet pour l'équipe Backend"
  
  # Repos autorisés
  sourceRepos:
    - 'https://github.com/company/backend-*'
    - 'https://charts.company.com'
  
  # Destinations autorisées
  destinations:
    - namespace: 'backend-*'
      server: 'https://kubernetes.default.svc'
    - namespace: 'backend-*'
      server: 'https://cluster-staging.company.com'
  
  # Resources autorisées (whitelist)
  clusterResourceWhitelist:
    - group: ''
      kind: Namespace
  namespaceResourceWhitelist:
    - group: 'apps'
      kind: Deployment
    - group: 'apps'
      kind: StatefulSet
    - group: ''
      kind: Service
    - group: ''
      kind: ConfigMap
    - group: ''
      kind: Secret
    - group: 'networking.k8s.io'
      kind: Ingress
  
  # Resources interdites (blacklist)
  namespaceResourceBlacklist:
    - group: ''
      kind: ResourceQuota
    - group: 'rbac.authorization.k8s.io'
      kind: '*'
  
  # Rôles RBAC dans le projet
  roles:
    - name: developer
      description: "Développeurs - lecture + sync"
      policies:
        - p, proj:team-backend:developer, applications, get, team-backend/*, allow
        - p, proj:team-backend:developer, applications, sync, team-backend/*, allow
        - p, proj:team-backend:developer, logs, get, team-backend/*, allow
      groups:
        - company:team-backend-devs
    
    - name: admin
      description: "Admins - accès complet au projet"
      policies:
        - p, proj:team-backend:admin, applications, *, team-backend/*, allow
        - p, proj:team-backend:admin, repositories, *, team-backend/*, allow
      groups:
        - company:team-backend-leads
\`\`\`

### App of Apps Pattern

\`\`\`yaml
# L'App of Apps est le pattern standard pour gérer des centaines d'applications
# Une Application "root" pointe vers un dossier contenant d'autres Applications

# apps/root-app.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: root-applications
  namespace: argocd
spec:
  project: platform
  source:
    repoURL: https://github.com/company/argocd-apps.git
    targetRevision: main
    path: apps
  destination:
    server: https://kubernetes.default.svc
    namespace: argocd
  syncPolicy:
    automated:
      prune: true
      selfHeal: true

# Structure du dépôt argocd-apps:
# apps/
# ├── team-backend/
# │   ├── api-service.yaml
# │   ├── worker-service.yaml
# │   └── database.yaml
# ├── team-frontend/
# │   ├── web-app.yaml
# │   └── cdn-config.yaml
# ├── platform/
# │   ├── ingress-nginx.yaml
# │   ├── cert-manager.yaml
# │   ├── monitoring.yaml
# │   └── logging.yaml
# └── _templates/
#     └── application-template.yaml
\`\`\`

\`\`\`yaml
# apps/team-backend/api-service.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: api-service
  namespace: argocd
  labels:
    team: backend
    tier: application
    env: production
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: team-backend
  source:
    repoURL: https://github.com/company/backend-deployments.git
    targetRevision: main
    path: api-service/production
  destination:
    server: https://kubernetes.default.svc
    namespace: backend-production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
\`\`\`

### ApplicationSet pour génération dynamique

\`\`\`yaml
# ApplicationSet - générer des Applications automatiquement
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: backend-services
  namespace: argocd
spec:
  generators:
    # Générateur par dossier Git
    - git:
        repoURL: https://github.com/company/backend-deployments.git
        revision: main
        directories:
          - path: "services/*"
    
    # Générateur par cluster
    - clusters:
        selector:
          matchLabels:
            environment: production
    
    # Générateur matriciel (service x cluster)
    - matrix:
        generators:
          - git:
              repoURL: https://github.com/company/deployments.git
              revision: main
              directories:
                - path: "services/*"
          - clusters:
              selector:
                matchLabels:
                  tier: production

  template:
    metadata:
      name: '{{path.basename}}-{{name}}'
      labels:
        team: backend
    spec:
      project: team-backend
      source:
        repoURL: https://github.com/company/backend-deployments.git
        targetRevision: main
        path: '{{path}}'
      destination:
        server: '{{server}}'
        namespace: 'backend-{{path.basename}}'
      syncPolicy:
        automated:
          prune: true
          selfHeal: true
\`\`\`

### Audit et conformité

\`\`\`bash
# ArgoCD génère des événements Kubernetes pour chaque action
kubectl get events -n argocd --field-selector reason=ResourceUpdated

# Notifications pour audit
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  annotations:
    notifications.argoproj.io/subscribe.on-sync-succeeded.slack: audit-channel
    notifications.argoproj.io/subscribe.on-sync-failed.slack: audit-channel
    notifications.argoproj.io/subscribe.on-health-degraded.pagerduty: production-alerts

# RBAC audit - qui peut faire quoi
# argocd-rbac-cm ConfigMap
policy.csv: |
  # Format: p, subject, resource, action, project/app, allow/deny
  p, role:readonly, applications, get, *, allow
  p, role:readonly, logs, get, *, allow
  p, role:admin, applications, *, *, allow
  p, role:admin, clusters, *, *, allow
  p, role:admin, repositories, *, *, allow
  
  # Mapping groupes OIDC → rôles
  g, company:platform-team, role:admin
  g, company:developers, role:readonly
  g, company:team-backend-leads, proj:team-backend:admin

# Diffs et historique
# ArgoCD stocke l'historique de chaque sync
# Accessible via UI ou API
argocd app history api-service
argocd app diff api-service --revision HEAD~1
\`\`\`

### Haute disponibilité ArgoCD

\`\`\`yaml
# Configuration HA pour ArgoCD en production
# values-ha.yaml pour le chart ArgoCD
controller:
  replicas: 2
  env:
    - name: ARGOCD_CONTROLLER_REPLICAS
      value: "2"

server:
  replicas: 3
  autoscaling:
    enabled: true
    minReplicas: 3
    maxReplicas: 7

repoServer:
  replicas: 3
  autoscaling:
    enabled: true
    minReplicas: 3
    maxReplicas: 10

redis-ha:
  enabled: true
  replicas: 3

applicationSet:
  replicas: 2
\`\`\`

### Sécurité et isolation

\`\`\`
Checklist sécurité ArgoCD entreprise :
┌─────────────────────────────────────────────────────────────┐
│ □ SSO/OIDC configuré (pas de comptes locaux)               │
│ □ RBAC granulaire par projet et équipe                     │
│ □ AppProjects avec restrictions destinations               │
│ □ Resource whitelist stricte par projet                    │
│ □ Audit logs activés et centralisés                       │
│ □ Secrets gérés via External Secrets (pas en clair)       │
│ □ Network policies entre namespaces                        │
│ □ Repository credentials rotés régulièrement              │
│ □ Clusters enregistrés avec service accounts dédiés       │
│ □ Notifications configurées pour toutes les syncs         │
│ □ Backup régulier de la configuration ArgoCD              │
│ □ Disaster recovery plan documenté et testé               │
└─────────────────────────────────────────────────────────────┘
\`\`\``,
    practiceContent: `### TP1 : Multi-tenancy avec AppProjects

Créez 3 AppProjects pour 3 équipes avec des restrictions différentes : repos autorisés, namespaces cibles, types de ressources. Configurez les rôles RBAC (developer, admin) et testez que les restrictions sont bien appliquées.

### TP2 : App of Apps et ApplicationSet

Implémentez le pattern App of Apps pour gérer 10+ applications. Créez un ApplicationSet qui génère automatiquement une Application par dossier dans un dépôt Git. Testez l'ajout et la suppression d'une application en créant/supprimant un dossier.

### TP3 : ArgoCD multi-clusters

Enregistrez 3 clusters dans ArgoCD (dev, staging, prod). Déployez la même application sur les 3 clusters avec des configurations différentes. Utilisez un ApplicationSet matriciel (service x cluster) pour la gestion à grande échelle.

### TP4 : Audit et disaster recovery

Configurez l'audit complet : notifications sur chaque sync, export des logs vers un SIEM, alertes sur les sync failures. Testez le disaster recovery : sauvegardez la configuration ArgoCD, simulez une perte, et restaurez. Mesurez le RTO.`,
    keyPoints: JSON.stringify(['AppProjects pour isolation multi-tenant par équipe', 'App of Apps pattern pour gestion centralisée à grande échelle', 'ApplicationSet pour génération dynamique par Git ou clusters', 'RBAC granulaire avec intégration SSO et OIDC', 'Audit via notifications événements et historique des syncs', 'Haute disponibilité avec répliques controller server et repo', 'Restriction resources et destinations par projet', 'Disaster recovery avec backup et plan de restauration']),
  },
];
