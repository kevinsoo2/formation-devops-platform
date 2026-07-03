// V3 New courses and modules - Deeply enriched content
export const v3Courses = [
  {
    id: 'docker', title: 'Docker', subtitle: 'Conteneurisation d\'applications',
    description: 'Maîtrisez Docker pour conteneuriser vos applications. Images, containers, Dockerfile, docker-compose et bonnes pratiques de production.',
    icon: '🐳', color: '#2496ED', duration: '12 heures', level: 'Débutant à Intermédiaire', category: 'Conteneurisation',
    prerequisites: JSON.stringify(['Connaissances Linux de base', 'Familiarité avec la ligne de commande', 'Notions de réseau TCP/IP']),
    objectives: JSON.stringify(['Comprendre l\'architecture Docker et les containers', 'Écrire des Dockerfiles optimisés multi-stage', 'Utiliser Docker Compose pour orchestrer des services', 'Gérer les volumes et réseaux Docker', 'Publier des images sur un registry', 'Appliquer les bonnes pratiques de sécurité']),
  },
  {
    id: 'kubernetes', title: 'Kubernetes', subtitle: 'Orchestration de containers',
    description: 'Apprenez Kubernetes pour orchestrer vos containers en production. Pods, Deployments, Services, Ingress, Helm et monitoring.',
    icon: '☸️', color: '#326CE5', duration: '16 heures', level: 'Intermédiaire à Avancé', category: 'Orchestration',
    prerequisites: JSON.stringify(['Maîtrise de Docker', 'Connaissances réseau (TCP/IP, DNS, Load Balancing)', 'Familiarité avec YAML']),
    objectives: JSON.stringify(['Comprendre l\'architecture complète de Kubernetes', 'Déployer et gérer des applications', 'Configurer Services, Ingress et NetworkPolicies', 'Gérer le stockage persistant', 'Utiliser Helm et GitOps', 'Monitoring avec Prometheus et Grafana']),
  },
  {
    id: 'terraform', title: 'Terraform', subtitle: 'Infrastructure as Code',
    description: 'Maîtrisez Terraform pour gérer votre infrastructure en tant que code. HCL, providers, state, modules et CI/CD.',
    icon: '🏗️', color: '#7B42BC', duration: '14 heures', level: 'Intermédiaire', category: 'Infrastructure as Code',
    prerequisites: JSON.stringify(['Connaissances cloud (AWS/GCP/Azure)', 'Familiarité avec la CLI', 'Notions de réseau et infrastructure']),
    objectives: JSON.stringify(['Maîtriser le langage HCL', 'Configurer les providers cloud', 'Gérer le state et les backends distants', 'Créer des modules réutilisables', 'Utiliser les workspaces', 'Intégrer Terraform dans un pipeline CI/CD']),
  },
  {
    id: 'ansible', title: 'Ansible', subtitle: 'Automatisation de configuration',
    description: 'Découvrez Ansible pour automatiser la configuration de vos serveurs. Playbooks, roles, Galaxy, Vault et intégration CI/CD.',
    icon: '⚙️', color: '#EE0000', duration: '12 heures', level: 'Débutant à Intermédiaire', category: 'Automatisation',
    prerequisites: JSON.stringify(['Connaissances Linux', 'SSH configuré', 'Familiarité avec YAML']),
    objectives: JSON.stringify(['Installer et configurer Ansible', 'Écrire des playbooks complexes', 'Gérer les inventories dynamiques', 'Créer des roles réutilisables', 'Utiliser Ansible Galaxy et Vault', 'Intégrer Ansible dans un pipeline CI/CD']),
  },
  {
    id: 'gitlab-ci', title: 'GitLab CI', subtitle: 'CI/CD intégré à GitLab',
    description: 'Maîtrisez GitLab CI/CD pour automatiser vos pipelines. Configuration YAML avancée, runners, environnements et déploiement.',
    icon: '🦊', color: '#FC6D26', duration: '10 heures', level: 'Intermédiaire', category: 'CI/CD',
    prerequisites: JSON.stringify(['Maîtrise de Git', 'Connaissances Docker', 'Notions de CI/CD']),
    objectives: JSON.stringify(['Écrire des fichiers .gitlab-ci.yml avancés', 'Configurer et gérer les runners', 'Optimiser les pipelines avec cache et DAG', 'Gérer les environnements de déploiement', 'Configurer la sécurité (SAST, DAST)', 'Mettre en place des pipelines multi-projets']),
  },
  {
    id: 'git-avance', title: 'Git Avancé', subtitle: 'Maîtrise avancée de Git',
    description: 'Allez au-delà des bases de Git. Rebase interactif, cherry-pick, bisect, hooks, sous-modules et stratégies de branching avancées.',
    icon: '🔀', color: '#F05032', duration: '10 heures', level: 'Avancé', category: 'Gestion de code source',
    prerequisites: JSON.stringify(['Maîtrise des bases Git (commit, branch, merge)', 'Expérience avec branches et merge requests', 'Ligne de commande Linux/Unix']),
    objectives: JSON.stringify(['Maîtriser le rebase interactif', 'Utiliser cherry-pick et bisect efficacement', 'Configurer des hooks Git automatisés', 'Gérer les sous-modules et subtrees', 'Choisir la bonne stratégie de branching', 'Maintenir de grands dépôts Git']),
  },
  {
    id: 'prometheus', title: 'Prometheus', subtitle: 'Monitoring et alerting',
    description: 'Maîtrisez Prometheus pour monitorer vos infrastructures et applications. Métriques, PromQL, alertes et intégration avec Grafana.',
    icon: '🔥', color: '#E6522C', duration: '10 heures', level: 'Intermédiaire', category: 'Monitoring',
    prerequisites: JSON.stringify(['Connaissances Linux', 'Notions de conteneurisation Docker', 'Familiarité avec les métriques système']),
    objectives: JSON.stringify(['Installer et configurer Prometheus', 'Comprendre les types de métriques', 'Écrire des requêtes PromQL', 'Configurer des règles d\'alerting', 'Instrumenter une application', 'Intégrer avec AlertManager']),
  },
  {
    id: 'grafana', title: 'Grafana', subtitle: 'Dashboards et visualisation',
    description: 'Apprenez Grafana pour créer des dashboards professionnels. Panels, variables, alertes et sources de données multiples.',
    icon: '📊', color: '#F46800', duration: '8 heures', level: 'Débutant à Intermédiaire', category: 'Monitoring',
    prerequisites: JSON.stringify(['Notions de monitoring', 'Connaissances Prometheus recommandées', 'Familiarité avec les métriques']),
    objectives: JSON.stringify(['Installer et configurer Grafana', 'Créer des dashboards professionnels', 'Utiliser les variables et templates', 'Configurer les alertes Grafana', 'Connecter plusieurs datasources', 'Partager et exporter des dashboards']),
  },
  {
    id: 'helm', title: 'Helm', subtitle: 'Gestionnaire de packages Kubernetes',
    description: 'Maîtrisez Helm pour déployer et gérer vos applications Kubernetes. Charts, values, releases et repositories.',
    icon: '⎈', color: '#0F1689', duration: '8 heures', level: 'Intermédiaire', category: 'Orchestration',
    prerequisites: JSON.stringify(['Maîtrise de Kubernetes', 'Connaissances YAML', 'Familiarité avec les déploiements K8s']),
    objectives: JSON.stringify(['Comprendre l\'architecture Helm', 'Utiliser des charts existants', 'Créer des charts personnalisés', 'Gérer les values et templates', 'Administrer les releases', 'Configurer des repositories privés']),
  },
  {
    id: 'argocd', title: 'ArgoCD', subtitle: 'GitOps et déploiement continu',
    description: 'Découvrez ArgoCD pour implémenter le GitOps. Synchronisation automatique, applications, et déploiement déclaratif sur Kubernetes.',
    icon: '🐙', color: '#EF7B4D', duration: '8 heures', level: 'Intermédiaire à Avancé', category: 'CI/CD',
    prerequisites: JSON.stringify(['Maîtrise de Kubernetes', 'Connaissances Git avancées', 'Familiarité avec Helm']),
    objectives: JSON.stringify(['Installer et configurer ArgoCD', 'Comprendre les principes GitOps', 'Créer et gérer des Applications', 'Configurer la synchronisation automatique', 'Gérer les environnements multiples', 'Implémenter des stratégies de rollback']),
  },
];



export const v3Modules = [
  // ============================================================
  // DOCKER - Module 1: Introduction et installation Docker
  // ============================================================
  {
    id: 'docker-01',
    courseId: 'docker',
    title: 'Introduction et installation Docker',
    duration: '4h',
    orderIndex: 1,
    videoUrl: 'https://www.youtube.com/watch?v=3c-iBn73dDE',
    theoryContent: `# Introduction et Installation de Docker

## 1. Histoire et Contexte

### L'évolution de la virtualisation

Avant Docker, le déploiement d'applications passait par des machines virtuelles (VMs) complètes. Chaque VM embarquait un OS complet, consommant des ressources considérables. En 2013, Solomon Hykes a présenté Docker lors d'une conférence PyCon, révolutionnant le monde du déploiement applicatif.

Docker repose sur des technologies Linux existantes :
- **cgroups** (Control Groups) : limitent les ressources CPU, mémoire, I/O
- **namespaces** : isolent les processus, réseau, filesystem, utilisateurs
- **Union File System** (OverlayFS) : système de fichiers par couches

### Docker vs Machines Virtuelles

\`\`\`
+-------------------------------------------+
|        MACHINES VIRTUELLES                |
+-------------------------------------------+
|  App A  |  App B  |  App C               |
|  Bins   |  Bins   |  Bins                |
|  Guest  |  Guest  |  Guest               |
|   OS    |   OS    |   OS                 |
+-------------------------------------------+
|          HYPERVISEUR                      |
+-------------------------------------------+
|          HOST OS                          |
+-------------------------------------------+
|          INFRASTRUCTURE                   |
+-------------------------------------------+

+-------------------------------------------+
|           CONTAINERS                      |
+-------------------------------------------+
|  App A  |  App B  |  App C               |
|  Bins   |  Bins   |  Bins                |
+-------------------------------------------+
|          DOCKER ENGINE                    |
+-------------------------------------------+
|          HOST OS (kernel partagé)         |
+-------------------------------------------+
|          INFRASTRUCTURE                   |
+-------------------------------------------+
\`\`\`

**Avantages des containers** :
- Démarrage en secondes (vs minutes pour une VM)
- Empreinte mémoire réduite (Mo vs Go)
- Densité accrue (plus de containers par hôte)
- Portabilité garantie (fonctionne partout)
- Isolation des processus

## 2. Architecture Docker

### Composants principaux

\`\`\`
+--------------------------------------------------+
|                  CLIENT DOCKER                    |
|  docker build | docker pull | docker run         |
+--------------------------------------------------+
            |  REST API (socket Unix/TCP)
            v
+--------------------------------------------------+
|              DOCKER DAEMON (dockerd)             |
|  +--------------------------------------------+ |
|  |            containerd                       | |
|  |  +------+  +------+  +------+             | |
|  |  | runc |  | runc |  | runc |  (OCI)      | |
|  |  +------+  +------+  +------+             | |
|  +--------------------------------------------+ |
+--------------------------------------------------+
            |
            v
+--------------------------------------------------+
|  Images  |  Containers  |  Networks  |  Volumes  |
+--------------------------------------------------+
\`\`\`

- **Docker Client (docker CLI)** : interface utilisateur, envoie des commandes au daemon
- **Docker Daemon (dockerd)** : processus principal, gère images, containers, réseaux, volumes
- **containerd** : runtime de haut niveau, gère le cycle de vie des containers
- **runc** : runtime OCI de bas niveau, crée et exécute les containers
- **Docker Registry** : stockage et distribution des images (Docker Hub, registres privés)

### Le format OCI (Open Container Initiative)

Docker a contribué à la standardisation via l'OCI :
- **Runtime Specification** : comment exécuter un container
- **Image Specification** : format des images
- **Distribution Specification** : comment distribuer les images

## 3. Installation de Docker

### Installation sur Ubuntu/Debian

\`\`\`bash
# Désinstaller les anciennes versions
sudo apt-get remove docker docker-engine docker.io containerd runc

# Installer les prérequis
sudo apt-get update
sudo apt-get install -y \\
    ca-certificates \\
    curl \\
    gnupg \\
    lsb-release

# Ajouter la clé GPG officielle Docker
sudo mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \\
    sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Ajouter le dépôt Docker
echo "deb [arch=$(dpkg --print-architecture) \\
    signed-by=/etc/apt/keyrings/docker.gpg] \\
    https://download.docker.com/linux/ubuntu \\
    $(lsb_release -cs) stable" | \\
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Installer Docker Engine
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io \\
    docker-buildx-plugin docker-compose-plugin

# Ajouter l'utilisateur au groupe docker (évite sudo)
sudo usermod -aG docker \\\${USER}
newgrp docker

# Vérifier l'installation
docker --version
docker run hello-world
\`\`\`

### Installation sur CentOS/RHEL

\`\`\`bash
# Désinstaller les anciennes versions
sudo yum remove docker docker-client docker-client-latest \\
    docker-common docker-latest docker-latest-logrotate \\
    docker-logrotate docker-engine

# Installer les utilitaires
sudo yum install -y yum-utils

# Ajouter le dépôt Docker
sudo yum-config-manager --add-repo \\
    https://download.docker.com/linux/centos/docker-ce.repo

# Installer Docker Engine
sudo yum install -y docker-ce docker-ce-cli containerd.io \\
    docker-buildx-plugin docker-compose-plugin

# Démarrer et activer Docker
sudo systemctl start docker
sudo systemctl enable docker

# Ajouter l'utilisateur au groupe docker
sudo usermod -aG docker \\\${USER}

# Vérifier
docker run hello-world
\`\`\`

## 4. Configuration du Daemon Docker

### Le fichier daemon.json

Le fichier \\\`/etc/docker/daemon.json\\\` permet de configurer le comportement du daemon :

\`\`\`json
{
  "data-root": "/var/lib/docker",
  "storage-driver": "overlay2",
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "default-address-pools": [
    { "base": "172.17.0.0/16", "size": 24 }
  ],
  "dns": ["8.8.8.8", "8.8.4.4"],
  "registry-mirrors": ["https://mirror.gcr.io"],
  "insecure-registries": ["registry.local:5000"],
  "live-restore": true,
  "userland-proxy": false,
  "experimental": false,
  "metrics-addr": "0.0.0.0:9323",
  "default-runtime": "runc",
  "default-ulimits": {
    "nofile": { "Name": "nofile", "Hard": 65536, "Soft": 65536 }
  }
}
\`\`\`

Après modification :
\`\`\`bash
sudo systemctl daemon-reload
sudo systemctl restart docker
\`\`\`

## 5. Commandes Essentielles Docker

### Gestion des containers

\`\`\`bash
# Lancer un container
docker run [OPTIONS] IMAGE [COMMAND]

# Options courantes de docker run
docker run -d                    # Mode détaché (arrière-plan)
docker run -it                   # Mode interactif avec terminal
docker run --name mon-container  # Nommer le container
docker run -p 8080:80           # Mapper port hôte:container
docker run -P                    # Mapper tous les ports EXPOSE
docker run -e VAR=value         # Variable d'environnement
docker run --env-file .env      # Fichier de variables
docker run -v /host:/container  # Bind mount
docker run --mount type=volume,src=vol,dst=/data  # Volume
docker run --network mon-reseau # Réseau spécifique
docker run --rm                 # Supprimer après arrêt
docker run --restart=unless-stopped  # Politique de redémarrage
docker run --memory=512m        # Limite mémoire
docker run --cpus=1.5           # Limite CPU
docker run -w /app              # Répertoire de travail
docker run --user 1000:1000     # Utilisateur spécifique

# Lister les containers
docker ps                  # Containers en cours d'exécution
docker ps -a               # Tous les containers
docker ps -q               # IDs uniquement
docker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"

# Exécuter une commande dans un container
docker exec -it container_name bash
docker exec -it container_name sh
docker exec container_name ls /app
docker exec -u root container_name apt-get update

# Voir les logs
docker logs container_name           # Tous les logs
docker logs -f container_name        # Suivre en temps réel
docker logs --tail 100 container_name # 100 dernières lignes
docker logs --since 1h container_name # Depuis 1 heure
docker logs -t container_name        # Avec timestamps

# Inspecter un container
docker inspect container_name
docker inspect --format '{{.NetworkSettings.IPAddress}}' container_name
docker inspect --format '{{json .Config.Env}}' container_name

# Copier des fichiers
docker cp container_name:/path/file ./local_file
docker cp ./local_file container_name:/path/file

# Statistiques en temps réel
docker stats
docker stats container_name
docker stats --format "table {{.Name}}\\t{{.CPUPerc}}\\t{{.MemUsage}}"

# Processus dans un container
docker top container_name

# Arrêter, démarrer, redémarrer
docker stop container_name        # Arrêt gracieux (SIGTERM)
docker kill container_name        # Arrêt forcé (SIGKILL)
docker start container_name       # Redémarrer un container arrêté
docker restart container_name     # Redémarrer
docker pause container_name       # Mettre en pause
docker unpause container_name     # Reprendre

# Supprimer
docker rm container_name          # Supprimer un container arrêté
docker rm -f container_name       # Forcer la suppression
docker container prune            # Supprimer tous les containers arrêtés

# Nettoyage global
docker system prune               # Containers arrêtés + images dangling
docker system prune -a            # + toutes images non utilisées
docker system prune --volumes     # + volumes non utilisés
docker system df                  # Espace disque utilisé
\`\`\`

### Gestion des images

\`\`\`bash
# Télécharger une image
docker pull nginx                 # Tag latest par défaut
docker pull nginx:1.25-alpine     # Tag spécifique
docker pull registry.example.com/app:v2  # Registry privé

# Construire une image
docker build -t mon-app:v1 .             # Build depuis le répertoire courant
docker build -t mon-app:v1 -f Dockerfile.prod .  # Dockerfile spécifique
docker build --no-cache -t mon-app:v1 .  # Sans cache
docker build --build-arg VERSION=1.0 .   # Arguments de build
docker build --target production .        # Stage spécifique (multi-stage)

# Lister les images
docker images                     # Toutes les images
docker images -q                  # IDs uniquement
docker images --filter "dangling=true"  # Images orphelines

# Taguer une image
docker tag mon-app:v1 registry.example.com/mon-app:v1
docker tag mon-app:v1 mon-app:latest

# Pusher une image
docker login registry.example.com
docker push registry.example.com/mon-app:v1

# Historique des layers
docker history mon-app:v1
docker history --no-trunc mon-app:v1

# Sauvegarder/Charger (export fichier tar)
docker save -o mon-app.tar mon-app:v1
docker load -i mon-app.tar

# Export/Import (filesystem d'un container)
docker export container_name > container.tar
docker import container.tar mon-image:imported

# Supprimer des images
docker rmi image_name             # Supprimer une image
docker rmi -f image_name          # Forcer
docker image prune                # Supprimer les images dangling
docker image prune -a             # Supprimer toutes les images non utilisées
\`\`\`

## 6. Docker Registry

### Docker Hub

Docker Hub est le registry public par défaut :
\`\`\`bash
# Se connecter
docker login
docker login -u username

# Pousser une image
docker tag mon-app:v1 username/mon-app:v1
docker push username/mon-app:v1

# Rechercher des images
docker search nginx
docker search --filter "is-official=true" nginx
\`\`\`

### Registry privé

Déployer son propre registry :
\`\`\`bash
# Lancer un registry local
docker run -d -p 5000:5000 --name registry \\
    -v registry-data:/var/lib/registry \\
    registry:2

# Utiliser le registry local
docker tag mon-app:v1 localhost:5000/mon-app:v1
docker push localhost:5000/mon-app:v1
docker pull localhost:5000/mon-app:v1

# Lister les images du registry
curl http://localhost:5000/v2/_catalog
curl http://localhost:5000/v2/mon-app/tags/list
\`\`\`

### Configuration TLS pour le registry

\`\`\`bash
# Générer un certificat auto-signé
mkdir -p certs
openssl req -newkey rsa:4096 -nodes -sha256 \\
    -keyout certs/domain.key -x509 -days 365 \\
    -out certs/domain.crt \\
    -subj "/CN=registry.example.com"

# Lancer le registry avec TLS
docker run -d -p 443:443 --name registry \\
    -v $(pwd)/certs:/certs \\
    -e REGISTRY_HTTP_ADDR=0.0.0.0:443 \\
    -e REGISTRY_HTTP_TLS_CERTIFICATE=/certs/domain.crt \\
    -e REGISTRY_HTTP_TLS_KEY=/certs/domain.key \\
    registry:2
\`\`\`

## 7. Bonnes Pratiques

| Pratique | Description |
|----------|-------------|
| Un process par container | Facilite le scaling et le monitoring |
| Images minimales | Utiliser alpine ou distroless |
| Tags explicites | Éviter :latest en production |
| Pas de données dans l'image | Utiliser volumes pour la persistance |
| Variables d'environnement | Pour la configuration runtime |
| Health checks | Vérifier la santé des containers |
| Limites de ressources | --memory et --cpus en production |
| Logs sur stdout/stderr | Facilite la collecte centralisée |
| Utilisateur non-root | Sécurité renforcée |
| .dockerignore | Réduire le contexte de build |

## 8. Troubleshooting

| Problème | Solution |
|----------|----------|
| Permission denied sur socket | Ajouter l'utilisateur au groupe docker |
| Port already in use | docker ps pour trouver le container, ou lsof -i :port |
| No space left on device | docker system prune -a --volumes |
| Container exits immediately | Vérifier CMD/ENTRYPOINT, docker logs |
| Cannot connect to daemon | sudo systemctl start docker |
| Image pull rate limit | docker login ou utiliser un mirror |
| DNS resolution fails | Configurer dns dans daemon.json |
| OOM Killed | Augmenter --memory ou optimiser l'application |
`,
    practiceContent: `# Travaux Pratiques : Introduction et Installation Docker

## TP 1 : Installation et vérification

### Objectif
Installer Docker et vérifier le bon fonctionnement de l'environnement.

### Étapes

\`\`\`bash
# 1. Vérifier la version installée
docker --version
docker info

# 2. Lancer le container de test
docker run hello-world

# 3. Explorer les informations système
docker system info
docker system df

# 4. Vérifier que le daemon fonctionne
systemctl status docker
docker ps
\`\`\`

### Validation
- Docker est installé et le daemon tourne
- Le container hello-world s'exécute correctement
- docker info affiche les informations du système

## TP 2 : Manipulation de containers

### Objectif
Maîtriser les commandes de base pour gérer les containers.

### Étapes

\`\`\`bash
# 1. Lancer un serveur web nginx
docker run -d --name web-server -p 8080:80 nginx:1.25-alpine

# 2. Vérifier que le container tourne
docker ps
curl http://localhost:8080

# 3. Inspecter le container
docker inspect web-server
docker inspect --format '{{.NetworkSettings.IPAddress}}' web-server

# 4. Voir les logs
docker logs web-server
docker logs -f web-server

# 5. Exécuter une commande dans le container
docker exec -it web-server sh
ls /usr/share/nginx/html/
cat /etc/nginx/nginx.conf
exit

# 6. Voir les statistiques
docker stats web-server --no-stream

# 7. Voir les processus
docker top web-server

# 8. Arrêter et redémarrer
docker stop web-server
docker start web-server
docker restart web-server

# 9. Nettoyer
docker stop web-server
docker rm web-server
\`\`\`

### Validation
- Le serveur nginx répond sur le port 8080
- Vous pouvez exécuter des commandes dans le container
- Les logs sont accessibles

## TP 3 : Gestion des images

### Objectif
Comprendre le fonctionnement des images Docker et du registry.

### Étapes

\`\`\`bash
# 1. Télécharger différentes images
docker pull alpine:3.18
docker pull ubuntu:22.04
docker pull node:18-alpine

# 2. Comparer les tailles
docker images --format "table {{.Repository}}:{{.Tag}}\\t{{.Size}}"

# 3. Inspecter les layers
docker history node:18-alpine

# 4. Sauvegarder et charger une image
docker save -o alpine-backup.tar alpine:3.18
ls -lh alpine-backup.tar
docker rmi alpine:3.18
docker load -i alpine-backup.tar
docker images | grep alpine

# 5. Taguer une image
docker tag alpine:3.18 mon-registry/alpine:custom
docker images | grep alpine

# 6. Lancer un registry local
docker run -d -p 5000:5000 --name registry registry:2
docker tag alpine:3.18 localhost:5000/alpine:3.18
docker push localhost:5000/alpine:3.18
curl http://localhost:5000/v2/_catalog

# 7. Nettoyer
docker stop registry && docker rm registry
docker system prune -f
\`\`\`

### Validation
- Vous comprenez la différence de taille entre les images
- Vous savez sauvegarder et restaurer des images
- Le registry local fonctionne

## TP 4 : Réseaux et communication inter-containers

### Objectif
Mettre en place la communication entre containers via les réseaux Docker.

### Étapes

\`\`\`bash
# 1. Créer un réseau personnalisé
docker network create app-network
docker network ls
docker network inspect app-network

# 2. Lancer une base de données Redis
docker run -d --name redis --network app-network redis:7-alpine

# 3. Tester la connectivité DNS
docker run --rm --network app-network alpine ping -c 3 redis

# 4. Lancer une application qui utilise Redis
docker run -d --name app --network app-network \\
    -e REDIS_HOST=redis -e REDIS_PORT=6379 \\
    -p 3000:3000 node:18-alpine \\
    sh -c "echo 'Redis accessible à redis:6379' && sleep 3600"

# 5. Vérifier la communication
docker exec app ping -c 2 redis

# 6. Inspecter le réseau
docker network inspect app-network

# 7. Nettoyer
docker stop redis app
docker rm redis app
docker network rm app-network
\`\`\`

### Validation
- Les containers communiquent via le nom DNS
- Le réseau personnalisé isole les services
- La résolution DNS fonctionne entre containers

## TP 5 : Configuration du daemon et monitoring

### Objectif
Configurer le daemon Docker et mettre en place un monitoring basique.

### Étapes

\`\`\`bash
# 1. Examiner la configuration actuelle
docker info | grep -E "Storage|Logging|Root"

# 2. Créer une configuration daemon.json (en test)
cat << 'EOF'
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "storage-driver": "overlay2",
  "live-restore": true
}
EOF

# 3. Lancer plusieurs containers pour le monitoring
docker run -d --name web1 -p 8081:80 nginx:alpine
docker run -d --name web2 -p 8082:80 nginx:alpine
docker run -d --name web3 -p 8083:80 nginx:alpine

# 4. Surveiller les ressources
docker stats --no-stream --format \\
    "table {{.Name}}\\t{{.CPUPerc}}\\t{{.MemUsage}}\\t{{.NetIO}}"

# 5. Vérifier l'espace disque
docker system df
docker system df -v

# 6. Nettoyer proprement
docker stop web1 web2 web3
docker rm web1 web2 web3
docker system prune -f
\`\`\`

### Validation
- Vous savez configurer le daemon Docker
- Le monitoring des containers fonctionne
- L'espace disque est maîtrisé
`,
    keyPoints: JSON.stringify([
      'Docker utilise les namespaces et cgroups Linux pour isoler les processus sans hyperviseur',
      'L\'architecture comprend le client CLI, le daemon dockerd, containerd et runc (OCI)',
      'Installation via le dépôt officiel (apt/yum) - toujours utiliser la version Docker CE/EE',
      'Le fichier daemon.json configure le comportement global (logs, storage, DNS, mirrors)',
      'docker run avec -d (détaché), -p (ports), -v (volumes), -e (env), --network (réseau)',
      'docker exec -it pour entrer dans un container, docker logs -f pour suivre les logs',
      'Docker Hub est le registry public par défaut, on peut déployer un registry privé',
      'docker system prune pour nettoyer, docker stats pour monitorer les ressources'
    ]),
  },


  // ============================================================
  // DOCKER - Module 2: Dockerfile et optimisation d'images
  // ============================================================
  {
    id: 'docker-02',
    courseId: 'docker',
    title: 'Dockerfile et optimisation d\'images',
    duration: '4h',
    orderIndex: 2,
    videoUrl: 'https://www.youtube.com/watch?v=HG6yIjZapSA',
    theoryContent: `# Dockerfile et Optimisation d'Images

## 1. Introduction au Dockerfile

Un Dockerfile est un fichier texte contenant toutes les instructions nécessaires pour construire une image Docker. Chaque instruction crée une nouvelle couche (layer) dans l'image finale.

### Fonctionnement du build

\`\`\`
+--------------------------------------------------+
|              PROCESSUS DE BUILD                   |
+--------------------------------------------------+
|                                                  |
|  Dockerfile  ──►  Build Context  ──►  Image     |
|                                                  |
|  Instruction 1 ──► Layer 1 (cached)             |
|  Instruction 2 ──► Layer 2 (cached)             |
|  Instruction 3 ──► Layer 3 (rebuild)            |
|  Instruction 4 ──► Layer 4 (rebuild)            |
|                                                  |
|  Si un layer change, tous les suivants sont      |
|  reconstruits (invalidation du cache)            |
+--------------------------------------------------+
\`\`\`

## 2. Référence complète des instructions Dockerfile

### FROM - Image de base

\`\`\`dockerfile
# Syntaxe
FROM [--platform=<platform>] <image>[:<tag>] [AS <name>]

# Exemples
FROM ubuntu:22.04
FROM node:18-alpine AS builder
FROM --platform=linux/amd64 golang:1.21
FROM scratch  # Image vide (pour binaires statiques)
\`\`\`

### RUN - Exécuter des commandes

\`\`\`dockerfile
# Forme shell (exécute dans /bin/sh -c)
RUN apt-get update && apt-get install -y curl

# Forme exec (pas de shell)
RUN ["apt-get", "install", "-y", "curl"]

# Bonnes pratiques : combiner les commandes avec &&
RUN apt-get update && \\
    apt-get install -y --no-install-recommends \\
      curl \\
      wget \\
      git && \\
    rm -rf /var/lib/apt/lists/*
\`\`\`

### COPY et ADD - Copier des fichiers

\`\`\`dockerfile
# COPY - Copie simple (recommandé)
COPY package*.json ./
COPY src/ ./src/
COPY --chown=node:node . .
COPY --from=builder /app/dist ./dist

# ADD - Copie + fonctionnalités supplémentaires
ADD https://example.com/file.tar.gz /tmp/   # Téléchargement URL
ADD archive.tar.gz /app/                      # Auto-extraction
# Préférer COPY sauf pour l'extraction d'archives
\`\`\`

### WORKDIR - Répertoire de travail

\`\`\`dockerfile
WORKDIR /app
# Crée le répertoire s'il n'existe pas
# Les chemins relatifs dans RUN, COPY, CMD sont relatifs à WORKDIR
WORKDIR /app/src
RUN pwd  # Affiche /app/src
\`\`\`

### ENV et ARG - Variables

\`\`\`dockerfile
# ENV - Variables d'environnement (persistantes dans le container)
ENV NODE_ENV=production
ENV APP_PORT=3000
ENV PATH="/app/node_modules/.bin:\\\${PATH}"

# ARG - Arguments de build (disponibles uniquement pendant le build)
ARG NODE_VERSION=18
ARG BUILD_DATE
FROM node:\\\${NODE_VERSION}-alpine

# Utilisation combinée
ARG VERSION=1.0
ENV APP_VERSION=\\\${VERSION}
\`\`\`

### EXPOSE - Ports documentés

\`\`\`dockerfile
# Documente les ports (ne les publie PAS)
EXPOSE 3000
EXPOSE 80/tcp
EXPOSE 443/tcp
EXPOSE 8080/udp
# Il faut toujours -p au runtime pour publier
\`\`\`

### VOLUME - Points de montage

\`\`\`dockerfile
# Crée un point de montage pour les données persistantes
VOLUME /data
VOLUME ["/data", "/logs"]
# Préférer les volumes nommés au runtime (-v name:/path)
\`\`\`

### USER - Utilisateur d'exécution

\`\`\`dockerfile
# Créer et utiliser un utilisateur non-root
RUN groupadd -r appgroup && useradd -r -g appgroup appuser
USER appuser:appgroup

# Avec Alpine
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Ou utiliser un utilisateur existant
USER node  # Existe dans les images node officielles
\`\`\`

### ENTRYPOINT et CMD - Commande de démarrage

\`\`\`dockerfile
# CMD - Commande par défaut (peut être écrasée)
CMD ["node", "server.js"]
CMD ["npm", "start"]

# ENTRYPOINT - Point d'entrée fixe
ENTRYPOINT ["node", "server.js"]
# docker run mon-image --port 3000  →  node server.js --port 3000

# Combinaison ENTRYPOINT + CMD (pattern recommandé)
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "server.js"]
# CMD fournit les arguments par défaut à ENTRYPOINT

# Forme shell vs exec
CMD node server.js          # Shell form: /bin/sh -c node server.js (PID != 1)
CMD ["node", "server.js"]   # Exec form: node server.js (PID 1, reçoit les signaux)
\`\`\`

### HEALTHCHECK - Vérification de santé

\`\`\`dockerfile
# Vérifier que l'application répond
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\
    CMD curl -f http://localhost:3000/health || exit 1

# Désactiver le healthcheck
HEALTHCHECK NONE

# Avec wget (pour alpine sans curl)
HEALTHCHECK --interval=30s --timeout=5s \\
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1
\`\`\`

### LABEL - Métadonnées

\`\`\`dockerfile
LABEL maintainer="devops@example.com"
LABEL version="1.0"
LABEL description="Application web de production"
LABEL org.opencontainers.image.source="https://github.com/org/repo"
LABEL org.opencontainers.image.created="\\\${BUILD_DATE}"
\`\`\`

### STOPSIGNAL - Signal d'arrêt

\`\`\`dockerfile
# Signal envoyé au process pour l'arrêt gracieux
STOPSIGNAL SIGTERM  # Par défaut
STOPSIGNAL SIGQUIT  # Pour nginx par exemple
STOPSIGNAL 9        # SIGKILL (non recommandé)
\`\`\`

### SHELL - Shell par défaut

\`\`\`dockerfile
# Changer le shell utilisé pour les instructions RUN en forme shell
SHELL ["/bin/bash", "-c"]
RUN echo "Now using bash"

# Utile pour Windows
SHELL ["powershell", "-Command"]
\`\`\`

### ONBUILD - Instructions différées

\`\`\`dockerfile
# S'exécute quand l'image est utilisée comme base
ONBUILD COPY . /app
ONBUILD RUN npm install
# Utile pour les images de base d'entreprise
\`\`\`

## 3. Multi-stage Builds

Les multi-stage builds permettent d'utiliser plusieurs FROM dans un seul Dockerfile pour créer des images finales minimales.

### Exemple complet Node.js

\`\`\`dockerfile
# Stage 1 : Installation des dépendances
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2 : Build de l'application
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3 : Image de production
FROM node:18-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Créer un utilisateur non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copier uniquement les fichiers nécessaires
COPY --from=builder /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./

# Sécurité
USER appuser
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s \\
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "dist/server.js"]
\`\`\`

### Exemple Go (binaire statique)

\`\`\`dockerfile
# Stage 1 : Build
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /app/server .

# Stage 2 : Image finale minimale
FROM scratch
COPY --from=builder /app/server /server
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
EXPOSE 8080
ENTRYPOINT ["/server"]
\`\`\`

### Exemple Java/Maven

\`\`\`dockerfile
# Stage 1 : Build avec Maven
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

# Stage 2 : Runtime minimal
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
RUN addgroup -S spring && adduser -S spring -G spring
USER spring
EXPOSE 8080
HEALTHCHECK --interval=30s CMD wget -q --spider http://localhost:8080/actuator/health || exit 1
ENTRYPOINT ["java", "-jar", "app.jar"]
\`\`\`

## 4. Le fichier .dockerignore

Le .dockerignore réduit le contexte de build envoyé au daemon :

\`\`\`
# .dockerignore
node_modules
npm-debug.log*
.git
.gitignore
.env
.env.*
!.env.example
Dockerfile*
docker-compose*
.dockerignore
README.md
docs/
tests/
coverage/
.nyc_output
.vscode
.idea
*.md
LICENSE
.DS_Store
Thumbs.db
dist/
build/
tmp/
*.log
\`\`\`

## 5. Optimisation du cache des layers

### Ordre optimal des instructions

\`\`\`dockerfile
# ❌ MAUVAIS : Chaque changement de code invalide tout
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "server.js"]

# ✅ BON : Le code change plus souvent que les dépendances
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./        # Change rarement
RUN npm ci                   # Utilise le cache si package.json n'a pas changé
COPY . .                     # Change souvent, mais npm ci est en cache
CMD ["node", "server.js"]
\`\`\`

### Techniques d'optimisation

\`\`\`dockerfile
# 1. Combiner les RUN pour réduire les layers
RUN apt-get update && \\
    apt-get install -y --no-install-recommends \\
      curl wget git && \\
    apt-get clean && \\
    rm -rf /var/lib/apt/lists/*

# 2. Utiliser --mount=type=cache pour le cache de package managers
RUN --mount=type=cache,target=/root/.npm npm ci

# 3. Utiliser --mount=type=secret pour les secrets de build
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm ci

# 4. Copier les fichiers par spécificité croissante
COPY package*.json ./
COPY tsconfig*.json ./
COPY src/ ./src/
\`\`\`

## 6. Sécurité des images Docker

### Principes de sécurité

\`\`\`dockerfile
# 1. Utiliser un utilisateur non-root
FROM node:18-alpine
RUN addgroup -S app && adduser -S app -G app
USER app

# 2. Image minimale (alpine ou distroless)
FROM gcr.io/distroless/nodejs18-debian11
COPY --from=builder /app/dist /app
CMD ["/app/server.js"]

# 3. Pas de secrets dans l'image
# ❌ JAMAIS
ENV API_KEY=my-secret-key
COPY .env .

# ✅ Utiliser les secrets de build ou runtime
RUN --mount=type=secret,id=api_key cat /run/secrets/api_key

# 4. Scanner les vulnérabilités
# docker scout cves mon-image:v1
# trivy image mon-image:v1
# snyk container test mon-image:v1
\`\`\`

### Mode Rootless Docker

\`\`\`bash
# Installer Docker en mode rootless
dockerd-rootless-setuptool.sh install

# Configurer l'environnement
export PATH=/home/user/bin:\\\${PATH}
export DOCKER_HOST=unix:///run/user/1000/docker.sock
\`\`\`

## 7. BuildKit

BuildKit est le nouveau builder par défaut de Docker (depuis Docker 23.0) :

\`\`\`bash
# Activer BuildKit (si pas par défaut)
export DOCKER_BUILDKIT=1

# Fonctionnalités BuildKit
docker build --progress=plain .    # Logs détaillés
docker build --ssh default .       # Forwarding SSH
docker build --secret id=env,src=.env .  # Secrets de build

# Build multi-plateforme
docker buildx create --use
docker buildx build --platform linux/amd64,linux/arm64 \\
    -t mon-app:v1 --push .

# Cache distant
docker buildx build \\
    --cache-from type=registry,ref=registry/cache \\
    --cache-to type=registry,ref=registry/cache \\
    -t mon-app:v1 .
\`\`\`

## 8. Comparaison des tailles d'images

| Image de base | Taille | Sécurité | Usage |
|---------------|--------|----------|-------|
| ubuntu:22.04 | ~77MB | Moyen | Dev, bases complètes |
| debian:12-slim | ~74MB | Moyen | Bases Debian minimales |
| alpine:3.18 | ~7MB | Bon | Production, minimal |
| distroless | ~20MB | Excellent | Production, pas de shell |
| scratch | 0MB | Maximal | Binaires statiques (Go, Rust) |

## 9. Bonnes pratiques récapitulatives

1. **Une responsabilité par image** : un seul processus principal
2. **Multi-stage builds** : séparer build et runtime
3. **Images minimales** : alpine ou distroless en production
4. **Ordre des layers** : du moins fréquent au plus fréquent
5. **Utilisateur non-root** : USER dans le Dockerfile
6. **HEALTHCHECK** : toujours définir un health check
7. **Labels OCI** : métadonnées standardisées
8. **Pas de secrets** : utiliser --secret ou les runtime secrets
9. **.dockerignore** : exclure tout ce qui n'est pas nécessaire
10. **Scanner régulièrement** : docker scout, trivy, snyk
`,
    practiceContent: `# Travaux Pratiques : Dockerfile et Optimisation d'Images

## TP 1 : Écrire un Dockerfile basique

### Objectif
Créer une image Docker pour une application Node.js simple.

### Étapes

\`\`\`bash
# 1. Créer l'application
mkdir docker-tp && cd docker-tp
cat > package.json << 'EOF'
{
  "name": "docker-tp",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": { "start": "node server.js" },
  "dependencies": { "express": "^4.18.0" }
}
EOF

cat > server.js << 'EOF'
const express = require('express');
const app = express();
app.get('/', (req, res) => res.json({ status: 'ok', version: '1.0' }));
app.get('/health', (req, res) => res.status(200).send('OK'));
app.listen(3000, () => console.log('Server running on port 3000'));
EOF
\`\`\`

\`\`\`dockerfile
# 2. Écrire le Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

\`\`\`bash
# 3. Construire et tester
docker build -t mon-app:v1 .
docker run -d -p 3000:3000 --name test-app mon-app:v1
curl http://localhost:3000
docker logs test-app
docker stop test-app && docker rm test-app
\`\`\`

### Validation
- L'image se build sans erreur
- L'application répond sur le port 3000

## TP 2 : Optimisation multi-stage

### Objectif
Réduire la taille de l'image avec un multi-stage build.

### Étapes

\`\`\`dockerfile
# Dockerfile.optimized
# Stage 1 : Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2 : Production
FROM node:18-alpine AS production
WORKDIR /app
RUN addgroup -S app && adduser -S app -G app

COPY --from=builder --chown=app:app /app/node_modules ./node_modules
COPY --chown=app:app package*.json ./
COPY --chown=app:app server.js ./

USER app
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s \\
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1
CMD ["node", "server.js"]
\`\`\`

\`\`\`bash
# Comparer les tailles
docker build -t mon-app:basic -f Dockerfile .
docker build -t mon-app:optimized -f Dockerfile.optimized .
docker images | grep mon-app
\`\`\`

### Validation
- L'image optimisée est plus petite
- L'application tourne en tant qu'utilisateur non-root
- Le healthcheck fonctionne

## TP 3 : .dockerignore et cache

### Objectif
Optimiser le contexte de build et le cache des layers.

### Étapes

\`\`\`bash
# 1. Créer le .dockerignore
cat > .dockerignore << 'EOF'
node_modules
npm-debug.log*
.git
.gitignore
Dockerfile*
docker-compose*
.dockerignore
README.md
.env
*.md
EOF

# 2. Observer la taille du contexte de build
docker build -t test:context .
# La première ligne montre "Sending build context to Docker daemon"

# 3. Tester le cache
docker build -t mon-app:v1 .    # Premier build
# Modifier server.js
echo "// comment" >> server.js
docker build -t mon-app:v2 .    # Seul COPY . . est rebuild
\`\`\`

### Validation
- Le contexte de build est réduit
- Le cache des layers fonctionne correctement
- npm install n'est pas relancé si package.json ne change pas

## TP 4 : Build multi-plateforme et sécurité

### Objectif
Construire des images pour plusieurs architectures et scanner les vulnérabilités.

### Étapes

\`\`\`bash
# 1. Créer un builder multi-plateforme
docker buildx create --name multiarch --use
docker buildx inspect --bootstrap

# 2. Build pour multiple architectures
docker buildx build --platform linux/amd64,linux/arm64 \\
    -t mon-app:multiarch --load .

# 3. Scanner les vulnérabilités
docker scout cves mon-app:optimized
# ou avec trivy
# trivy image mon-app:optimized

# 4. Vérifier l'utilisateur d'exécution
docker run --rm mon-app:optimized whoami
docker run --rm mon-app:optimized id
\`\`\`

### Validation
- L'image supporte plusieurs architectures
- Les vulnérabilités connues sont identifiées
- L'application ne tourne pas en root

## TP 5 : Dockerfile avancé avec HEALTHCHECK et secrets

### Objectif
Créer un Dockerfile complet de production avec toutes les bonnes pratiques.

### Étapes

\`\`\`dockerfile
# Dockerfile.production
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \\
    npm ci --only=production

FROM node:18-alpine AS production
WORKDIR /app

# Métadonnées
LABEL org.opencontainers.image.title="Mon App"
LABEL org.opencontainers.image.version="1.0.0"

# Sécurité
RUN apk add --no-cache dumb-init && \\
    addgroup -S app && adduser -S app -G app
    
COPY --from=deps --chown=app:app /app/node_modules ./node_modules
COPY --chown=app:app . .

USER app
ENV NODE_ENV=production
EXPOSE 3000
STOPSIGNAL SIGTERM

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \\
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
\`\`\`

\`\`\`bash
docker build -t mon-app:production -f Dockerfile.production .
docker run -d --name prod-app -p 3000:3000 mon-app:production
docker inspect prod-app | grep -A5 Health
\`\`\`

### Validation
- dumb-init gère correctement les signaux
- Le healthcheck rapporte l'état du container
- Les labels OCI sont présents (docker inspect)
`,
    keyPoints: JSON.stringify([
      'Chaque instruction Dockerfile crée un layer - optimiser l\'ordre pour maximiser le cache',
      'Multi-stage builds séparent build et runtime, réduisant considérablement la taille finale',
      'FROM scratch ou distroless pour les images les plus minimales et sécurisées',
      'ENTRYPOINT définit le binaire fixe, CMD fournit les arguments par défaut modifiables',
      'HEALTHCHECK permet à Docker de vérifier automatiquement la santé du container',
      'USER non-root obligatoire en production - créer un utilisateur dédié',
      '.dockerignore réduit le contexte de build et accélère la construction',
      'BuildKit apporte le cache distant, les secrets de build et le multi-plateforme'
    ]),
  },


  // ============================================================
  // DOCKER - Module 3: Docker Compose et orchestration
  // ============================================================
  {
    id: 'docker-03',
    courseId: 'docker',
    title: 'Docker Compose et orchestration',
    duration: '4h',
    orderIndex: 3,
    videoUrl: 'https://www.youtube.com/watch?v=SXwC9fSwct8',
    theoryContent: `# Docker Compose et Orchestration

## 1. Introduction à Docker Compose

Docker Compose est un outil pour définir et exécuter des applications multi-containers. Un fichier YAML décrit tous les services, réseaux et volumes nécessaires.

### Architecture d'une application multi-services

\`\`\`
+--------------------------------------------------+
|            APPLICATION MULTI-SERVICES             |
+--------------------------------------------------+
|                                                  |
|  +--------+    +--------+    +--------+         |
|  | Frontend|    | Backend|    |  Worker |         |
|  | (React) |    | (Node) |    | (Python)|        |
|  +----+---+    +----+---+    +----+---+         |
|       |             |             |              |
|  +----v---+    +----v---+    +----v---+         |
|  | Nginx  |    |  API   |    |  Celery |         |
|  | :80    |    | :3000  |    |         |         |
|  +--------+    +----+---+    +----+---+         |
|                     |             |              |
|                +----v---+    +----v---+         |
|                |  Redis  |    | RabbitMQ|         |
|                | :6379  |    | :5672  |         |
|                +--------+    +--------+         |
|                     |                            |
|                +----v---+                        |
|                |PostgreSQL|                       |
|                | :5432   |                       |
|                +---------+                       |
+--------------------------------------------------+
\`\`\`

## 2. Référence complète docker-compose.yml

### Structure de base

\`\`\`yaml
# docker-compose.yml
version: '3.8'  # Obsolète depuis Compose v2, mais encore supporté

services:
  # Définition des services (containers)
  app:
    image: node:18-alpine
    # ou build depuis un Dockerfile
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
      args:
        NODE_ENV: production
      target: production
      cache_from:
        - registry.example.com/app:cache

volumes:
  # Définition des volumes nommés
  pgdata:
    driver: local

networks:
  # Définition des réseaux
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true  # Pas d'accès internet
\`\`\`

### Configuration complète d'un service

\`\`\`yaml
services:
  api:
    # Image ou build
    image: mon-app:latest
    build:
      context: .
      dockerfile: Dockerfile
      args:
        VERSION: "1.0"
      target: production

    # Nom du container
    container_name: api-server

    # Commande et entrypoint
    command: ["node", "server.js"]
    entrypoint: ["docker-entrypoint.sh"]

    # Ports
    ports:
      - "3000:3000"           # host:container
      - "127.0.0.1:3001:3001" # Bind sur localhost uniquement
      - "8080-8090:8080-8090" # Range de ports

    # Variables d'environnement
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres
      - DB_PORT=5432
    env_file:
      - .env
      - .env.production

    # Volumes
    volumes:
      - ./src:/app/src          # Bind mount (dev)
      - node_modules:/app/node_modules  # Volume nommé
      - /app/tmp                # Volume anonyme
      - type: bind
        source: ./config
        target: /app/config
        read_only: true

    # Réseaux
    networks:
      - frontend
      - backend
    
    # Dépendances
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started

    # Health check
    healthcheck:
      test: ["CMD", "wget", "--spider", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

    # Politique de redémarrage
    restart: unless-stopped
    # Options: no, always, on-failure, unless-stopped

    # Ressources (mode deploy pour Swarm/Compose v3)
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
      update_config:
        parallelism: 1
        delay: 10s
        order: start-first

    # Logging
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"

    # Sécurité
    user: "1000:1000"
    read_only: true
    tmpfs:
      - /tmp
      - /run
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE

    # Profils (activation conditionnelle)
    profiles:
      - debug
      - monitoring
\`\`\`

### Services avec dépendances complètes

\`\`\`yaml
services:
  # Application frontend
  frontend:
    build:
      context: ./frontend
      target: production
    ports:
      - "80:80"
    depends_on:
      api:
        condition: service_healthy
    networks:
      - frontend

  # API backend
  api:
    build:
      context: ./backend
      target: production
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://user:pass@postgres:5432/app
      REDIS_URL: redis://redis:6379
      JWT_SECRET_FILE: /run/secrets/jwt_secret
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    secrets:
      - jwt_secret
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - frontend
      - backend

  # Base de données PostgreSQL
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
      POSTGRES_DB: app
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./init-scripts:/docker-entrypoint-initdb.d
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d app"]
      interval: 10s
      timeout: 5s
      retries: 5
    secrets:
      - db_password
    networks:
      - backend

  # Cache Redis
  redis:
    image: redis:7-alpine
    command: redis-server --requirepass redis_pass --maxmemory 256mb
    volumes:
      - redis-data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "-a", "redis_pass", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - backend

  # Worker de tâches asynchrones
  worker:
    build:
      context: ./backend
      target: production
    command: ["node", "worker.js"]
    environment:
      REDIS_URL: redis://redis:6379
      DATABASE_URL: postgres://user:pass@postgres:5432/app
    depends_on:
      redis:
        condition: service_healthy
      postgres:
        condition: service_healthy
    deploy:
      replicas: 2
    networks:
      - backend

volumes:
  pgdata:
  redis-data:

networks:
  frontend:
  backend:
    internal: true

secrets:
  db_password:
    file: ./secrets/db_password.txt
  jwt_secret:
    file: ./secrets/jwt_secret.txt
\`\`\`

## 3. Networking Docker

### Types de réseaux

\`\`\`bash
# Lister les réseaux
docker network ls

# Types disponibles
# bridge  : réseau par défaut, communication via IP/DNS
# host    : partage le réseau de l'hôte (pas d'isolation)
# overlay : communication entre nœuds Swarm
# macvlan : attribue une MAC address au container
# none    : pas de réseau
\`\`\`

### Réseau bridge (défaut)

\`\`\`bash
# Créer un réseau bridge personnalisé
docker network create --driver bridge \\
    --subnet 172.20.0.0/16 \\
    --gateway 172.20.0.1 \\
    --ip-range 172.20.240.0/20 \\
    mon-reseau

# Connecter un container existant
docker network connect mon-reseau container_name
docker network disconnect mon-reseau container_name

# Inspecter
docker network inspect mon-reseau
\`\`\`

### Réseau host

\`\`\`bash
# Le container utilise directement le réseau de l'hôte
docker run --network host nginx
# nginx est accessible sur les ports de l'hôte directement
# Pas de NAT, performances maximales
# Attention : pas d'isolation réseau !
\`\`\`

### Réseau overlay (Swarm)

\`\`\`bash
# Créer un réseau overlay (nécessite Swarm)
docker network create --driver overlay \\
    --attachable \\
    --encrypted \\
    mon-overlay

# Les services Swarm sur différents nœuds communiquent via overlay
\`\`\`

### Réseau macvlan

\`\`\`bash
# Chaque container obtient sa propre MAC address
docker network create -d macvlan \\
    --subnet=192.168.1.0/24 \\
    --gateway=192.168.1.1 \\
    -o parent=eth0 \\
    macvlan-net

# Le container apparaît comme un hôte physique sur le réseau
docker run --network macvlan-net --ip 192.168.1.100 nginx
\`\`\`

## 4. Volumes Docker

### Types de volumes

\`\`\`bash
# 1. Volumes nommés (recommandé pour la production)
docker volume create mon-volume
docker run -v mon-volume:/data nginx
docker volume ls
docker volume inspect mon-volume

# 2. Bind mounts (développement)
docker run -v $(pwd)/src:/app/src nginx
docker run --mount type=bind,source=$(pwd)/src,target=/app/src nginx

# 3. tmpfs (données temporaires en mémoire)
docker run --tmpfs /tmp:size=100m nginx
docker run --mount type=tmpfs,destination=/tmp,tmpfs-size=100m nginx
\`\`\`

### Gestion des volumes

\`\`\`bash
# Créer un volume avec des options
docker volume create --driver local \\
    --opt type=nfs \\
    --opt o=addr=192.168.1.1,rw \\
    --opt device=:/path/to/dir \\
    nfs-volume

# Backup d'un volume
docker run --rm -v mon-volume:/data -v $(pwd):/backup \\
    alpine tar czf /backup/volume-backup.tar.gz -C /data .

# Restaurer un volume
docker run --rm -v mon-volume:/data -v $(pwd):/backup \\
    alpine tar xzf /backup/volume-backup.tar.gz -C /data

# Supprimer les volumes non utilisés
docker volume prune
docker volume rm mon-volume
\`\`\`

## 5. Docker Swarm (notions)

Docker Swarm est l'orchestrateur intégré à Docker :

\`\`\`bash
# Initialiser un Swarm
docker swarm init --advertise-addr 192.168.1.10

# Rejoindre un Swarm (workers)
docker swarm join --token SWMTKN-xxx 192.168.1.10:2377

# Déployer un stack (depuis docker-compose.yml)
docker stack deploy -c docker-compose.yml mon-app

# Gestion des services
docker service ls
docker service ps mon-app_api
docker service scale mon-app_api=5
docker service logs mon-app_api
docker service update --image mon-app:v2 mon-app_api

# Nœuds du cluster
docker node ls
docker node inspect node-name
\`\`\`

## 6. Monitoring et Logging

### cAdvisor (monitoring containers)

\`\`\`yaml
# docker-compose.monitoring.yml
services:
  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    ports:
      - "8080:8080"
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:rw
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro

  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin
    volumes:
      - grafana-data:/var/lib/grafana

volumes:
  prometheus-data:
  grafana-data:
\`\`\`

### Configuration des logs

\`\`\`yaml
# Logging avec différents drivers
services:
  app:
    image: mon-app
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "5"
        tag: "{{.Name}}/{{.ID}}"

  app-syslog:
    image: mon-app
    logging:
      driver: syslog
      options:
        syslog-address: "tcp://logserver:514"
        tag: "mon-app"

  app-fluentd:
    image: mon-app
    logging:
      driver: fluentd
      options:
        fluentd-address: "localhost:24224"
        tag: "docker.{{.Name}}"
\`\`\`

## 7. Commandes Docker Compose

\`\`\`bash
# Démarrer les services
docker compose up                # Premier plan
docker compose up -d             # Détaché
docker compose up --build        # Rebuild les images
docker compose up --force-recreate  # Recréer les containers
docker compose up --scale api=3  # Scaling

# Arrêter
docker compose down              # Arrêter et supprimer containers
docker compose down -v           # + supprimer les volumes
docker compose down --rmi all    # + supprimer les images

# Gestion des services
docker compose ps                # État des services
docker compose logs              # Logs de tous les services
docker compose logs -f api       # Suivre les logs d'un service
docker compose exec api sh       # Shell dans un service
docker compose run api npm test  # Exécuter une commande ponctuelle

# Build
docker compose build             # Rebuild toutes les images
docker compose build --no-cache api  # Rebuild sans cache

# Scaling
docker compose up -d --scale worker=3

# Profils
docker compose --profile debug up -d
docker compose --profile monitoring up -d

# Configuration
docker compose config            # Valider et afficher la config
docker compose config --services # Lister les services
\`\`\`

## 8. Patterns avancés

### Extend et override

\`\`\`yaml
# docker-compose.yml (base)
services:
  api:
    build: ./backend
    ports:
      - "3000:3000"

# docker-compose.override.yml (dev, chargé automatiquement)
services:
  api:
    volumes:
      - ./backend/src:/app/src
    environment:
      - DEBUG=true

# docker-compose.prod.yml (production)
services:
  api:
    image: registry.example.com/api:latest
    deploy:
      replicas: 3
\`\`\`

\`\`\`bash
# Développement (charge automatiquement override)
docker compose up

# Production
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
\`\`\`

### Wait-for pattern

\`\`\`yaml
services:
  api:
    build: .
    depends_on:
      postgres:
        condition: service_healthy
    command: >
      sh -c "
        echo 'Waiting for DB...' &&
        until nc -z postgres 5432; do sleep 1; done &&
        echo 'DB is ready!' &&
        node server.js
      "
\`\`\`

## 9. Tableau comparatif des orchestrateurs

| Fonctionnalité | Docker Compose | Docker Swarm | Kubernetes |
|----------------|---------------|--------------|------------|
| Complexité | Faible | Moyenne | Élevée |
| Usage | Dev/test, petite prod | Petite/moyenne prod | Grande production |
| Scaling | Manuel | Automatique | Automatique + HPA |
| Rolling update | Non | Oui | Oui + canary |
| Service discovery | DNS | DNS + VIP | DNS + Service |
| Load balancing | Non | Oui (ingress) | Oui (Service/Ingress) |
| Self-healing | restart policy | Oui | Oui (probes) |
| Multi-host | Non | Oui | Oui |
| Secrets | Fichiers | Swarm secrets | K8s Secrets |
`,
    practiceContent: `# Travaux Pratiques : Docker Compose et Orchestration

## TP 1 : Application multi-services

### Objectif
Déployer une application complète avec frontend, backend, base de données et cache.

### Étapes

\`\`\`yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - api
    networks:
      - frontend

  api:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:password@postgres:5432/app
      - REDIS_URL=redis://redis:6379
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - frontend
      - backend

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: app
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - backend

  redis:
    image: redis:7-alpine
    command: redis-server --maxmemory 128mb --maxmemory-policy allkeys-lru
    volumes:
      - redis-data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5
    networks:
      - backend

volumes:
  pgdata:
  redis-data:

networks:
  frontend:
  backend:
    internal: true
\`\`\`

\`\`\`bash
# Déployer
docker compose up -d
docker compose ps
docker compose logs -f api

# Tester
curl http://localhost:80
curl http://localhost:3000/health

# Arrêter
docker compose down -v
\`\`\`

## TP 2 : Monitoring avec Prometheus et Grafana

### Objectif
Mettre en place un stack de monitoring pour les containers Docker.

### Étapes

\`\`\`yaml
# docker-compose.monitoring.yml
services:
  cadvisor:
    image: gcr.io/cadvisor/cadvisor:v0.47.0
    ports:
      - "8080:8080"
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
    restart: unless-stopped

  prometheus:
    image: prom/prometheus:v2.47.0
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    restart: unless-stopped

  grafana:
    image: grafana/grafana:10.1.0
    ports:
      - "3001:3000"
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin123
    restart: unless-stopped
\`\`\`

\`\`\`bash
docker compose -f docker-compose.monitoring.yml up -d
# Accéder à Grafana sur http://localhost:3001
# Accéder à Prometheus sur http://localhost:9090
# Accéder à cAdvisor sur http://localhost:8080
\`\`\`

## TP 3 : Environnements dev/prod avec overrides

### Objectif
Gérer différentes configurations pour le développement et la production.

### Étapes

\`\`\`yaml
# docker-compose.yml (base)
services:
  api:
    build: ./backend
    environment:
      - NODE_ENV=production

# docker-compose.override.yml (dev - chargé auto)
services:
  api:
    build:
      target: development
    volumes:
      - ./backend/src:/app/src
    environment:
      - NODE_ENV=development
      - DEBUG=app:*
    ports:
      - "9229:9229"  # Debug port

# docker-compose.prod.yml
services:
  api:
    image: registry.example.com/api:latest
    deploy:
      replicas: 2
      resources:
        limits:
          memory: 512M
    restart: always
\`\`\`

\`\`\`bash
# Dev (utilise override automatiquement)
docker compose up -d

# Prod
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Valider la configuration
docker compose config
docker compose -f docker-compose.yml -f docker-compose.prod.yml config
\`\`\`

## TP 4 : Scaling et load balancing

### Objectif
Scaler un service et distribuer le trafic avec un reverse proxy.

### Étapes

\`\`\`yaml
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx-lb.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - api

  api:
    build: ./backend
    expose:
      - "3000"
    deploy:
      replicas: 3
\`\`\`

\`\`\`bash
# Scaler le service API
docker compose up -d --scale api=5
docker compose ps

# Vérifier la distribution
for i in $(seq 1 10); do curl -s http://localhost/ | grep hostname; done
\`\`\`

## TP 5 : Backup et restauration des volumes

### Objectif
Mettre en place une stratégie de backup des données persistantes.

### Étapes

\`\`\`bash
# 1. Identifier les volumes
docker volume ls
docker compose ps

# 2. Backup du volume PostgreSQL
docker run --rm \\
    -v formation_pgdata:/source:ro \\
    -v $(pwd)/backups:/backup \\
    alpine tar czf /backup/pgdata-$(date +%Y%m%d).tar.gz -C /source .

# 3. Backup avec pg_dump (méthode recommandée)
docker compose exec postgres pg_dump -U user app > backup.sql

# 4. Restauration
docker compose exec -T postgres psql -U user app < backup.sql

# 5. Script de backup automatisé
cat > backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR=./backups/$(date +%Y%m%d)
mkdir -p $BACKUP_DIR
docker compose exec -T postgres pg_dump -U user app | gzip > $BACKUP_DIR/db.sql.gz
docker run --rm -v redis-data:/data -v $BACKUP_DIR:/backup alpine cp /data/dump.rdb /backup/
echo "Backup completed: $BACKUP_DIR"
EOF
chmod +x backup.sh
\`\`\`

### Validation
- Les backups sont créés correctement
- La restauration fonctionne sans perte de données
`,
    keyPoints: JSON.stringify([
      'Docker Compose orchestre des applications multi-containers via un fichier YAML déclaratif',
      'depends_on avec condition: service_healthy garantit l\'ordre de démarrage correct',
      'Les réseaux Docker (bridge, host, overlay, macvlan) isolent et connectent les services',
      'Les volumes nommés persistent les données au-delà du cycle de vie des containers',
      'docker compose up -d --scale service=N pour le scaling horizontal des services',
      'Les profils permettent d\'activer conditionnellement des services (debug, monitoring)',
      'Les overrides (docker-compose.override.yml) séparent les configs dev/staging/prod',
      'Docker Swarm étend Compose pour le multi-host avec rolling updates et service discovery'
    ]),
  },


  // ============================================================
  // KUBERNETES - Module 1: Architecture et Pods
  // ============================================================
  {
    id: 'k8s-01',
    courseId: 'kubernetes',
    title: 'Architecture et Pods',
    duration: '5h',
    orderIndex: 1,
    videoUrl: 'https://www.youtube.com/watch?v=X48VuDVv0do',
    theoryContent: `# Architecture Kubernetes et Pods

## 1. Introduction à Kubernetes

Kubernetes (K8s) est une plateforme open-source d'orchestration de containers, initialement développée par Google et maintenant maintenue par la CNCF (Cloud Native Computing Foundation). Il automatise le déploiement, le scaling et la gestion d'applications conteneurisées.

### Pourquoi Kubernetes ?

- **Auto-healing** : redémarre les containers défaillants
- **Auto-scaling** : adapte le nombre de replicas à la charge
- **Rolling updates** : déploie sans downtime
- **Service discovery** : DNS interne automatique
- **Load balancing** : distribue le trafic
- **Secret management** : gestion sécurisée des secrets
- **Storage orchestration** : abstraction du stockage

## 2. Architecture complète

\`\`\`
+================================================================+
|                    CLUSTER KUBERNETES                           |
+================================================================+
|                                                                |
|  +----------------------------------------------------------+ |
|  |                   CONTROL PLANE                           | |
|  |                                                          | |
|  |  +----------+  +-------------+  +-----------+           | |
|  |  | kube-    |  | kube-       |  | kube-     |           | |
|  |  | apiserver|  | scheduler   |  | controller|           | |
|  |  |          |  |             |  | -manager  |           | |
|  |  +----+-----+  +------+------+  +-----+-----+           | |
|  |       |               |               |                  | |
|  |       +-------+-------+-------+-------+                  | |
|  |               |                                          | |
|  |         +-----v-----+                                    | |
|  |         |   etcd    |  (base de données clé-valeur)      | |
|  |         +-----------+                                    | |
|  |                                                          | |
|  |  +----------------+  (optionnel)                         | |
|  |  | cloud-         |                                      | |
|  |  | controller-mgr |                                      | |
|  |  +----------------+                                      | |
|  +----------------------------------------------------------+ |
|                                                                |
|  +----------------------------------------------------------+ |
|  |                    WORKER NODE 1                          | |
|  |                                                          | |
|  |  +----------+  +-----------+  +------------------+      | |
|  |  | kubelet  |  | kube-proxy|  | Container Runtime|      | |
|  |  +----+-----+  +-----+-----+  | (containerd)    |      | |
|  |       |               |        +--------+---------+      | |
|  |       |               |                 |                | |
|  |  +----v----+  +-------v-------+  +------v------+        | |
|  |  | Pod A   |  | Pod B         |  | Pod C       |        | |
|  |  | +-----+ |  | +-----+-----+|  | +-----+     |        | |
|  |  | |cont1| |  | |cont1|cont2||  | |cont1|     |        | |
|  |  | +-----+ |  | +-----+-----+|  | +-----+     |        | |
|  |  +---------+  +---------------+  +-------------+        | |
|  +----------------------------------------------------------+ |
|                                                                |
|  +----------------------------------------------------------+ |
|  |                    WORKER NODE 2                          | |
|  |  (même structure que Node 1)                             | |
|  +----------------------------------------------------------+ |
+================================================================+
\`\`\`

### Composants du Control Plane

| Composant | Rôle |
|-----------|------|
| **kube-apiserver** | Point d'entrée REST API, authentification, validation |
| **etcd** | Base de données clé-valeur distribuée, stocke tout l'état du cluster |
| **kube-scheduler** | Assigne les Pods aux nœuds (affinité, ressources, contraintes) |
| **kube-controller-manager** | Boucles de contrôle (ReplicaSet, Deployment, Node, Job...) |
| **cloud-controller-manager** | Interface avec le cloud provider (LoadBalancer, Routes, Nodes) |

### Composants des Worker Nodes

| Composant | Rôle |
|-----------|------|
| **kubelet** | Agent sur chaque nœud, gère les Pods, rapporte au Control Plane |
| **kube-proxy** | Gestion des règles réseau (iptables/IPVS), routage du trafic Service |
| **Container Runtime** | Exécute les containers (containerd, CRI-O) |

## 3. Installation de Kubernetes

### Avec kubeadm (clusters de production)

\`\`\`bash
# Sur tous les nœuds (control plane + workers)
# Prérequis
sudo swapoff -a
sudo sed -i '/swap/d' /etc/fstab

cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF
sudo modprobe overlay
sudo modprobe br_netfilter

cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF
sudo sysctl --system

# Installer containerd
sudo apt-get update
sudo apt-get install -y containerd
sudo mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml
sudo systemctl restart containerd

# Installer kubeadm, kubelet, kubectl
sudo apt-get install -y apt-transport-https ca-certificates curl
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.28/deb/Release.key | \\
    sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] \\
    https://pkgs.k8s.io/core:/stable:/v1.28/deb/ /' | \\
    sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl

# Initialiser le control plane (sur le master uniquement)
sudo kubeadm init --pod-network-cidr=10.244.0.0/16

# Configurer kubectl
mkdir -p \\\$HOME/.kube
sudo cp /etc/kubernetes/admin.conf \\\$HOME/.kube/config
sudo chown \\\$(id -u):\\\$(id -g) \\\$HOME/.kube/config

# Installer un CNI (Calico)
kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.26/manifests/calico.yaml

# Joindre les workers (commande fournie par kubeadm init)
sudo kubeadm join <master-ip>:6443 --token <token> \\
    --discovery-token-ca-cert-hash sha256:<hash>
\`\`\`

### Avec minikube (développement local)

\`\`\`bash
# Installation
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Démarrer un cluster
minikube start --driver=docker --cpus=4 --memory=8g
minikube start --nodes=3  # Multi-nœuds

# Gérer le cluster
minikube status
minikube dashboard    # Interface web
minikube addons enable ingress
minikube addons enable metrics-server
minikube tunnel       # Expose LoadBalancer services
minikube stop
minikube delete
\`\`\`

### Avec k3s (clusters légers)

\`\`\`bash
# Installation du serveur
curl -sfL https://get.k3s.io | sh -

# Agent (worker)
curl -sfL https://get.k3s.io | K3S_URL=https://server:6443 \\
    K3S_TOKEN=<token> sh -

# kubectl est inclus
k3s kubectl get nodes
\`\`\`

### Avec kind (Kubernetes in Docker)

\`\`\`bash
# Installation
go install sigs.k8s.io/kind@latest
# ou
curl -Lo ./kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64
chmod +x ./kind && sudo mv ./kind /usr/local/bin/kind

# Créer un cluster
kind create cluster --name dev
kind create cluster --config kind-config.yaml

# Configuration multi-nœuds
cat > kind-config.yaml <<EOF
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
  - role: worker
  - role: worker
EOF
\`\`\`

## 4. kubectl - Référence complète

### Configuration et contextes

\`\`\`bash
# Voir la config
kubectl config view
kubectl config current-context
kubectl config get-contexts

# Changer de contexte
kubectl config use-context minikube
kubectl config set-context --current --namespace=mon-namespace
\`\`\`

### Commandes essentielles

\`\`\`bash
# Obtenir des ressources
kubectl get pods                          # Pods dans le namespace courant
kubectl get pods -A                       # Tous les namespaces
kubectl get pods -o wide                  # Avec plus d'infos (IP, nœud)
kubectl get pods -o yaml                  # Format YAML complet
kubectl get pods -o json                  # Format JSON
kubectl get pods -l app=nginx             # Filtrer par label
kubectl get pods --field-selector status.phase=Running
kubectl get pods --sort-by=.metadata.creationTimestamp
kubectl get all                           # Toutes les ressources

# Décrire une ressource (détails + événements)
kubectl describe pod mon-pod
kubectl describe node mon-noeud
kubectl describe deployment mon-deploy

# Logs
kubectl logs mon-pod                      # Logs du container principal
kubectl logs mon-pod -c sidecar           # Container spécifique
kubectl logs -f mon-pod                   # Suivre en temps réel
kubectl logs --previous mon-pod           # Logs du container précédent (crash)
kubectl logs -l app=nginx --all-containers  # Par label
kubectl logs --since=1h mon-pod           # Depuis 1 heure
kubectl logs --tail=100 mon-pod           # 100 dernières lignes

# Exécuter des commandes
kubectl exec -it mon-pod -- bash
kubectl exec -it mon-pod -c container-name -- sh
kubectl exec mon-pod -- ls /app

# Appliquer/Supprimer des manifestes
kubectl apply -f manifest.yaml
kubectl apply -f ./manifests/             # Tout un répertoire
kubectl apply -f https://url/manifest.yaml
kubectl delete -f manifest.yaml
kubectl delete pod mon-pod
kubectl delete pods --all

# Éditer une ressource
kubectl edit deployment mon-deploy

# Port forwarding
kubectl port-forward pod/mon-pod 8080:80
kubectl port-forward svc/mon-service 8080:80
kubectl port-forward deployment/mon-deploy 8080:80

# Monitoring
kubectl top nodes                         # Utilisation CPU/mémoire des nœuds
kubectl top pods                          # Utilisation CPU/mémoire des pods
kubectl top pods --sort-by=memory

# Documentation intégrée
kubectl explain pod
kubectl explain pod.spec.containers
kubectl explain deployment.spec.strategy

# Création rapide (impératif)
kubectl create deployment nginx --image=nginx:1.25
kubectl create service clusterip nginx --tcp=80:80
kubectl create configmap config --from-literal=key=value
kubectl create secret generic secret --from-literal=password=pass

# Debug
kubectl get events --sort-by=.metadata.creationTimestamp
kubectl get events --field-selector type=Warning
kubectl debug pod/mon-pod -it --image=busybox
\`\`\`

## 5. Pods

### Définition et cycle de vie

Un Pod est la plus petite unité déployable dans Kubernetes. Il encapsule un ou plusieurs containers partageant :
- Le même espace réseau (même IP, mêmes ports)
- Le même hostname
- Les mêmes volumes montés

### Spécification complète d'un Pod

\`\`\`yaml
apiVersion: v1
kind: Pod
metadata:
  name: mon-pod
  namespace: default
  labels:
    app: mon-app
    version: v1
    environment: production
  annotations:
    description: "Pod de production"
spec:
  # Init containers (exécutés séquentiellement avant les containers principaux)
  initContainers:
    - name: init-db
      image: busybox:1.36
      command: ['sh', '-c', 'until nslookup postgres; do sleep 2; done']
    - name: init-migrations
      image: mon-app:v1
      command: ['node', 'migrate.js']

  # Containers principaux
  containers:
    - name: app
      image: mon-app:v1
      ports:
        - containerPort: 3000
          name: http
          protocol: TCP
      
      # Variables d'environnement
      env:
        - name: NODE_ENV
          value: "production"
        - name: DB_HOST
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: db_host
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: db_password
        - name: POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: CPU_LIMIT
          valueFrom:
            resourceFieldRef:
              resource: limits.cpu

      # Ressources
      resources:
        requests:
          cpu: "100m"       # 0.1 CPU
          memory: "128Mi"
        limits:
          cpu: "500m"       # 0.5 CPU
          memory: "512Mi"

      # Probes
      livenessProbe:
        httpGet:
          path: /health
          port: 3000
        initialDelaySeconds: 15
        periodSeconds: 10
        timeoutSeconds: 5
        failureThreshold: 3

      readinessProbe:
        httpGet:
          path: /ready
          port: 3000
        initialDelaySeconds: 5
        periodSeconds: 5
        timeoutSeconds: 3
        successThreshold: 1
        failureThreshold: 3

      startupProbe:
        httpGet:
          path: /health
          port: 3000
        failureThreshold: 30
        periodSeconds: 10

      # Volumes montés
      volumeMounts:
        - name: config-volume
          mountPath: /app/config
          readOnly: true
        - name: data
          mountPath: /app/data

      # Lifecycle hooks
      lifecycle:
        postStart:
          exec:
            command: ["/bin/sh", "-c", "echo Started > /tmp/started"]
        preStop:
          exec:
            command: ["/bin/sh", "-c", "sleep 10"]

    # Sidecar container
    - name: log-forwarder
      image: fluent/fluent-bit:latest
      volumeMounts:
        - name: logs
          mountPath: /var/log/app

  # Volumes
  volumes:
    - name: config-volume
      configMap:
        name: app-config
    - name: data
      persistentVolumeClaim:
        claimName: app-data-pvc
    - name: logs
      emptyDir: {}

  # Scheduling
  nodeSelector:
    disktype: ssd
  tolerations:
    - key: "dedicated"
      operator: "Equal"
      value: "app"
      effect: "NoSchedule"
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
              - key: topology.kubernetes.io/zone
                operator: In
                values: ["eu-west-1a", "eu-west-1b"]

  # Sécurité
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 2000

  # DNS et réseau
  dnsPolicy: ClusterFirst
  hostNetwork: false
  
  # Restart policy
  restartPolicy: Always   # Always, OnFailure, Never

  # Grace period
  terminationGracePeriodSeconds: 30

  # Service account
  serviceAccountName: app-service-account
  automountServiceAccountToken: false
\`\`\`

### Les trois types de Probes

| Probe | Rôle | Conséquence si échec |
|-------|------|---------------------|
| **livenessProbe** | Le container est-il vivant ? | Redémarrage du container |
| **readinessProbe** | Le container peut-il recevoir du trafic ? | Retiré du Service (plus de trafic) |
| **startupProbe** | Le container a-t-il démarré ? | Désactive liveness/readiness pendant le démarrage |

### Méthodes de probe

\`\`\`yaml
# HTTP GET
livenessProbe:
  httpGet:
    path: /health
    port: 8080
    httpHeaders:
      - name: X-Custom-Header
        value: probe

# TCP Socket
livenessProbe:
  tcpSocket:
    port: 3306

# Exec command
livenessProbe:
  exec:
    command: ["cat", "/tmp/healthy"]

# gRPC
livenessProbe:
  grpc:
    port: 50051
    service: my.health.v1.Health
\`\`\`

## 6. Namespaces

Les namespaces partitionnent logiquement le cluster :

\`\`\`bash
# Namespaces par défaut
kubectl get namespaces
# default           - ressources sans namespace spécifié
# kube-system       - composants système K8s
# kube-public       - ressources publiques
# kube-node-lease   - heartbeat des nœuds

# Créer un namespace
kubectl create namespace production
kubectl create namespace staging

# Travailler dans un namespace
kubectl get pods -n production
kubectl apply -f manifest.yaml -n production

# Définir le namespace par défaut
kubectl config set-context --current --namespace=production

# ResourceQuota par namespace
kubectl apply -f - <<EOF
apiVersion: v1
kind: ResourceQuota
metadata:
  name: quota-prod
  namespace: production
spec:
  hard:
    pods: "50"
    requests.cpu: "20"
    requests.memory: "40Gi"
    limits.cpu: "40"
    limits.memory: "80Gi"
EOF
\`\`\`
`,
    practiceContent: `# Travaux Pratiques : Architecture et Pods Kubernetes

## TP 1 : Installation et premiers pas

### Objectif
Installer un cluster Kubernetes local et explorer son architecture.

### Étapes

\`\`\`bash
# 1. Installer minikube
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# 2. Démarrer le cluster
minikube start --driver=docker --cpus=2 --memory=4g

# 3. Vérifier l'état
kubectl cluster-info
kubectl get nodes -o wide
kubectl get pods -A

# 4. Explorer les composants du control plane
kubectl get pods -n kube-system
kubectl describe node minikube

# 5. Activer les addons utiles
minikube addons enable metrics-server
minikube addons enable dashboard
minikube addons enable ingress

# 6. Explorer l'API
kubectl api-resources
kubectl api-versions
\`\`\`

### Validation
- Le cluster est fonctionnel (kubectl cluster-info)
- Tous les composants système sont en Running
- Le metrics-server est actif

## TP 2 : Création et gestion de Pods

### Objectif
Créer des Pods avec différentes configurations et comprendre leur cycle de vie.

### Étapes

\`\`\`bash
# 1. Créer un Pod simple
kubectl run nginx --image=nginx:1.25-alpine
kubectl get pods -w  # Observer le démarrage

# 2. Créer un Pod depuis un manifeste
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: app-pod
  labels:
    app: demo
    tier: frontend
spec:
  containers:
    - name: app
      image: nginx:1.25-alpine
      ports:
        - containerPort: 80
      resources:
        requests:
          cpu: "50m"
          memory: "64Mi"
        limits:
          cpu: "200m"
          memory: "128Mi"
      livenessProbe:
        httpGet:
          path: /
          port: 80
        initialDelaySeconds: 5
        periodSeconds: 10
      readinessProbe:
        httpGet:
          path: /
          port: 80
        initialDelaySeconds: 3
        periodSeconds: 5
EOF

# 3. Observer le Pod
kubectl get pod app-pod -o wide
kubectl describe pod app-pod
kubectl logs app-pod

# 4. Exécuter des commandes
kubectl exec -it app-pod -- sh
# Dans le container :
cat /etc/nginx/nginx.conf
curl localhost
exit

# 5. Port forward
kubectl port-forward pod/app-pod 8080:80 &
curl http://localhost:8080
kill %1

# 6. Nettoyer
kubectl delete pod nginx app-pod
\`\`\`

## TP 3 : Init containers et multi-containers

### Objectif
Utiliser des init containers et des sidecars dans un Pod.

### Étapes

\`\`\`yaml
# multi-container-pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: multi-pod
spec:
  initContainers:
    - name: init-content
      image: busybox:1.36
      command: ['sh', '-c', 'echo "Hello from init container - $(date)" > /shared/index.html']
      volumeMounts:
        - name: shared
          mountPath: /shared

  containers:
    - name: web
      image: nginx:alpine
      ports:
        - containerPort: 80
      volumeMounts:
        - name: shared
          mountPath: /usr/share/nginx/html

    - name: sidecar-logger
      image: busybox:1.36
      command: ['sh', '-c', 'while true; do echo "[$(date)] Health OK" >> /logs/health.log; sleep 10; done']
      volumeMounts:
        - name: logs
          mountPath: /logs

  volumes:
    - name: shared
      emptyDir: {}
    - name: logs
      emptyDir: {}
\`\`\`

\`\`\`bash
kubectl apply -f multi-container-pod.yaml
kubectl get pod multi-pod -w
kubectl describe pod multi-pod

# Vérifier l'init container a rempli le contenu
kubectl exec multi-pod -c web -- cat /usr/share/nginx/html/index.html

# Voir les logs du sidecar
kubectl logs multi-pod -c sidecar-logger
kubectl exec multi-pod -c sidecar-logger -- cat /logs/health.log
\`\`\`

## TP 4 : Probes et health checks

### Objectif
Configurer et tester les différentes probes Kubernetes.

### Étapes

\`\`\`yaml
# probes-pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: probes-demo
spec:
  containers:
    - name: app
      image: nginx:alpine
      ports:
        - containerPort: 80
      livenessProbe:
        httpGet:
          path: /
          port: 80
        initialDelaySeconds: 5
        periodSeconds: 5
        failureThreshold: 3
      readinessProbe:
        httpGet:
          path: /ready
          port: 80
        initialDelaySeconds: 3
        periodSeconds: 3
        failureThreshold: 2
\`\`\`

\`\`\`bash
kubectl apply -f probes-pod.yaml
kubectl get pod probes-demo -w

# Le readiness va échouer car /ready n'existe pas
kubectl describe pod probes-demo | grep -A5 Conditions

# Corriger en créant le fichier
kubectl exec probes-demo -- sh -c 'echo OK > /usr/share/nginx/html/ready'

# Observer le changement
kubectl get pod probes-demo

# Simuler un crash de liveness
kubectl exec probes-demo -- rm /usr/share/nginx/html/index.html
# Observer le restart
kubectl get pod probes-demo -w
\`\`\`

## TP 5 : Namespaces et Resource Quotas

### Objectif
Organiser les ressources avec des namespaces et appliquer des quotas.

### Étapes

\`\`\`bash
# 1. Créer des namespaces
kubectl create namespace development
kubectl create namespace production

# 2. Appliquer un ResourceQuota
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ResourceQuota
metadata:
  name: dev-quota
  namespace: development
spec:
  hard:
    pods: "10"
    requests.cpu: "2"
    requests.memory: "4Gi"
    limits.cpu: "4"
    limits.memory: "8Gi"
EOF

# 3. Déployer dans un namespace
kubectl run test -n development --image=nginx \\
    --overrides='{"spec":{"containers":[{"name":"test","image":"nginx","resources":{"requests":{"cpu":"100m","memory":"128Mi"},"limits":{"cpu":"200m","memory":"256Mi"}}}]}}'

# 4. Vérifier les quotas
kubectl get resourcequota -n development
kubectl describe resourcequota dev-quota -n development

# 5. Nettoyer
kubectl delete namespace development production
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Le Control Plane (API Server, etcd, Scheduler, Controller Manager) gère l\'état désiré du cluster',
      'Les Worker Nodes exécutent les Pods via kubelet, kube-proxy et le container runtime (containerd)',
      'kubectl est le CLI principal : get, describe, logs, exec, apply, delete, port-forward, top, explain',
      'Un Pod encapsule 1+ containers partageant réseau (même IP) et volumes',
      'Les Probes (liveness, readiness, startup) contrôlent le cycle de vie et le routage du trafic',
      'Les Init Containers s\'exécutent séquentiellement avant les containers principaux',
      'Les Namespaces partitionnent logiquement le cluster avec des ResourceQuotas',
      'Installation possible via kubeadm (prod), minikube (dev), k3s (léger), kind (CI/CD)'
    ]),
  },


  // ============================================================
  // KUBERNETES - Module 2: Workloads et Storage
  // ============================================================
  {
    id: 'k8s-02',
    courseId: 'kubernetes',
    title: 'Workloads et Storage',
    duration: '5h',
    orderIndex: 2,
    videoUrl: 'https://www.youtube.com/watch?v=s_o8dwzRlu4',
    theoryContent: `# Workloads et Storage Kubernetes

## 1. Deployments

Un Deployment gère un ensemble de Pods identiques (ReplicaSet) avec des capacités de rolling update et rollback.

### Spécification complète

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
  labels:
    app: api
spec:
  replicas: 3
  
  # Sélecteur pour identifier les Pods gérés
  selector:
    matchLabels:
      app: api
  
  # Stratégie de mise à jour
  strategy:
    type: RollingUpdate        # ou Recreate
    rollingUpdate:
      maxUnavailable: 1        # Max pods indisponibles pendant la MAJ
      maxSurge: 1              # Max pods supplémentaires créés

  # Historique des rollouts
  revisionHistoryLimit: 10

  # Template du Pod
  template:
    metadata:
      labels:
        app: api
        version: v2
    spec:
      containers:
        - name: api
          image: mon-api:v2
          ports:
            - containerPort: 3000
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"
          readinessProbe:
            httpGet:
              path: /ready
              port: 3000
            initialDelaySeconds: 10
            periodSeconds: 5
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 15
            periodSeconds: 10
          env:
            - name: NODE_ENV
              value: "production"
          volumeMounts:
            - name: config
              mountPath: /app/config
      volumes:
        - name: config
          configMap:
            name: api-config
\`\`\`

### Stratégies de déploiement

\`\`\`
RollingUpdate (par défaut) :
+-----+-----+-----+          +-----+-----+-----+
| v1  | v1  | v1  |   ──►   | v2  | v2  | v2  |
+-----+-----+-----+          +-----+-----+-----+
Étape 1: |v1|v1|v2|  Étape 2: |v1|v2|v2|  Étape 3: |v2|v2|v2|

Recreate :
+-----+-----+-----+          +-----+-----+-----+
| v1  | v1  | v1  |   ──►   | v2  | v2  | v2  |
+-----+-----+-----+          +-----+-----+-----+
Étape 1: tous v1 supprimés (downtime)
Étape 2: tous v2 créés
\`\`\`

### Commandes de gestion

\`\`\`bash
# Déployer
kubectl apply -f deployment.yaml

# Mettre à jour l'image
kubectl set image deployment/api-deployment api=mon-api:v3

# Suivre le rollout
kubectl rollout status deployment/api-deployment

# Historique des révisions
kubectl rollout history deployment/api-deployment
kubectl rollout history deployment/api-deployment --revision=2

# Rollback
kubectl rollout undo deployment/api-deployment
kubectl rollout undo deployment/api-deployment --to-revision=1

# Pause/Resume (pour batch updates)
kubectl rollout pause deployment/api-deployment
kubectl set image deployment/api-deployment api=mon-api:v4
kubectl set resources deployment/api-deployment -c=api --limits=cpu=500m
kubectl rollout resume deployment/api-deployment

# Scaling
kubectl scale deployment/api-deployment --replicas=5
\`\`\`

## 2. ReplicaSets

Un ReplicaSet maintient un nombre stable de Pods. Généralement géré automatiquement par un Deployment.

\`\`\`yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: api-rs
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: mon-api:v1
\`\`\`

## 3. DaemonSets

Un DaemonSet assure qu'un Pod tourne sur chaque nœud (ou un sous-ensemble).

\`\`\`yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd
  namespace: kube-system
spec:
  selector:
    matchLabels:
      name: fluentd
  template:
    metadata:
      labels:
        name: fluentd
    spec:
      tolerations:
        - key: node-role.kubernetes.io/control-plane
          effect: NoSchedule
      containers:
        - name: fluentd
          image: fluent/fluentd:v1.16
          resources:
            limits:
              memory: "200Mi"
            requests:
              cpu: "100m"
              memory: "200Mi"
          volumeMounts:
            - name: varlog
              mountPath: /var/log
            - name: containers
              mountPath: /var/lib/docker/containers
              readOnly: true
      volumes:
        - name: varlog
          hostPath:
            path: /var/log
        - name: containers
          hostPath:
            path: /var/lib/docker/containers
\`\`\`

Cas d'usage : agents de logging, monitoring, réseau (CNI), sécurité.

## 4. StatefulSets

Pour les applications avec état (bases de données, caches) nécessitant :
- Identité réseau stable (pod-0, pod-1, pod-2)
- Stockage persistant par Pod
- Déploiement et scaling ordonnés

\`\`\`yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: "postgres"
  replicas: 3
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
          image: postgres:15
          ports:
            - containerPort: 5432
          env:
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: pg-secret
                  key: password
            - name: PGDATA
              value: /var/lib/postgresql/data/pgdata
          volumeMounts:
            - name: data
              mountPath: /var/lib/postgresql/data
  
  # Volume Claim Template : un PVC par Pod
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        storageClassName: fast-ssd
        resources:
          requests:
            storage: 20Gi
\`\`\`

## 5. Jobs et CronJobs

### Jobs (tâches ponctuelles)

\`\`\`yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: db-migration
spec:
  completions: 1          # Nombre d'exécutions réussies requises
  parallelism: 1          # Pods en parallèle
  backoffLimit: 3         # Tentatives avant échec
  activeDeadlineSeconds: 600  # Timeout global
  ttlSecondsAfterFinished: 100  # Nettoyage auto
  template:
    spec:
      restartPolicy: OnFailure
      containers:
        - name: migrate
          image: mon-app:v1
          command: ["node", "migrate.js"]
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: db-secret
                  key: url
\`\`\`

### CronJobs (tâches planifiées)

\`\`\`yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: backup-db
spec:
  schedule: "0 2 * * *"      # Tous les jours à 2h
  concurrencyPolicy: Forbid  # Allow, Forbid, Replace
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 1
  startingDeadlineSeconds: 200
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
            - name: backup
              image: postgres:15
              command:
                - /bin/sh
                - -c
                - pg_dump -h postgres -U admin mydb | gzip > /backup/db-$(date +%Y%m%d).sql.gz
              volumeMounts:
                - name: backup
                  mountPath: /backup
          volumes:
            - name: backup
              persistentVolumeClaim:
                claimName: backup-pvc
\`\`\`

## 6. ConfigMaps et Secrets

### ConfigMaps

\`\`\`yaml
# Création depuis un manifeste
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  # Valeurs simples
  DB_HOST: "postgres-service"
  DB_PORT: "5432"
  LOG_LEVEL: "info"
  
  # Fichier de configuration complet
  nginx.conf: |
    server {
      listen 80;
      location / {
        proxy_pass http://backend:3000;
      }
    }
  
  application.properties: |
    server.port=8080
    spring.datasource.url=jdbc:postgresql://postgres:5432/app
\`\`\`

\`\`\`bash
# Création en ligne de commande
kubectl create configmap app-config \\
    --from-literal=DB_HOST=postgres \\
    --from-literal=DB_PORT=5432

kubectl create configmap nginx-config \\
    --from-file=nginx.conf

kubectl create configmap app-files \\
    --from-file=config/
\`\`\`

### Secrets

\`\`\`yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
data:
  # Valeurs encodées en base64
  username: YWRtaW4=          # echo -n "admin" | base64
  password: cGFzc3dvcmQxMjM=  # echo -n "password123" | base64

# Ou avec stringData (plaintext, encodé automatiquement)
stringData:
  api-key: "my-secret-api-key"
  connection-string: "postgres://admin:pass@host:5432/db"
\`\`\`

### Utilisation dans les Pods

\`\`\`yaml
spec:
  containers:
    - name: app
      # En variables d'environnement
      env:
        - name: DB_HOST
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: DB_HOST
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: password
      
      # Toutes les clés en variables
      envFrom:
        - configMapRef:
            name: app-config
        - secretRef:
            name: app-secrets
      
      # En fichiers montés
      volumeMounts:
        - name: config-vol
          mountPath: /app/config
          readOnly: true
        - name: secret-vol
          mountPath: /app/secrets
          readOnly: true
  
  volumes:
    - name: config-vol
      configMap:
        name: app-config
        items:
          - key: nginx.conf
            path: nginx.conf
    - name: secret-vol
      secret:
        secretName: app-secrets
        defaultMode: 0400
\`\`\`

## 7. Persistent Storage

### PersistentVolumes (PV) et PersistentVolumeClaims (PVC)

\`\`\`yaml
# PersistentVolume (provisionné par l'admin ou dynamiquement)
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-nfs-data
spec:
  capacity:
    storage: 100Gi
  accessModes:
    - ReadWriteMany        # RWO, ROX, RWX, RWOP
  persistentVolumeReclaimPolicy: Retain  # Retain, Recycle, Delete
  storageClassName: nfs
  nfs:
    server: 192.168.1.100
    path: /exported/path

---
# PersistentVolumeClaim (demandé par l'utilisateur)
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-data
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: fast-ssd
  resources:
    requests:
      storage: 10Gi
\`\`\`

### StorageClasses (provisionnement dynamique)

\`\`\`yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: kubernetes.io/aws-ebs    # ou pd.csi.storage.gke.io, etc.
parameters:
  type: gp3
  iopsPerGB: "3000"
  fsType: ext4
reclaimPolicy: Delete
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
\`\`\`

### Modes d'accès

| Mode | Abréviation | Description |
|------|-------------|-------------|
| ReadWriteOnce | RWO | Monté en lecture/écriture par un seul nœud |
| ReadOnlyMany | ROX | Monté en lecture seule par plusieurs nœuds |
| ReadWriteMany | RWX | Monté en lecture/écriture par plusieurs nœuds |
| ReadWriteOncePod | RWOP | Monté en RW par un seul Pod (K8s 1.27+) |

## 8. Resource Management

### Requests et Limits

\`\`\`yaml
resources:
  requests:          # Minimum garanti (scheduling)
    cpu: "250m"      # 0.25 CPU core
    memory: "256Mi"  # 256 MiB
  limits:            # Maximum autorisé
    cpu: "1000m"     # 1 CPU core
    memory: "1Gi"    # 1 GiB
\`\`\`

### Classes QoS

| Classe | Condition | Comportement |
|--------|-----------|--------------|
| **Guaranteed** | requests == limits pour tous les containers | Dernier évicté en cas de pression mémoire |
| **Burstable** | Au moins un request défini | Évicté après BestEffort |
| **BestEffort** | Aucun request ni limit | Premier évicté |

### HPA (Horizontal Pod Autoscaler)

\`\`\`yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api-deployment
  minReplicas: 2
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
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Percent
          value: 10
          periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
        - type: Percent
          value: 100
          periodSeconds: 15
\`\`\`

### VPA (Vertical Pod Autoscaler)

\`\`\`yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: api-vpa
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api-deployment
  updatePolicy:
    updateMode: "Auto"    # Off, Initial, Recreate, Auto
  resourcePolicy:
    containerPolicies:
      - containerName: api
        minAllowed:
          cpu: "50m"
          memory: "64Mi"
        maxAllowed:
          cpu: "2"
          memory: "4Gi"
\`\`\`

## 9. LimitRange

Définir des valeurs par défaut et des contraintes au niveau du namespace :

\`\`\`yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: default-limits
  namespace: production
spec:
  limits:
    - type: Container
      default:
        cpu: "500m"
        memory: "256Mi"
      defaultRequest:
        cpu: "100m"
        memory: "128Mi"
      max:
        cpu: "2"
        memory: "2Gi"
      min:
        cpu: "50m"
        memory: "64Mi"
    - type: Pod
      max:
        cpu: "4"
        memory: "8Gi"
    - type: PersistentVolumeClaim
      max:
        storage: "50Gi"
      min:
        storage: "1Gi"
\`\`\`
`,
    practiceContent: `# Travaux Pratiques : Workloads et Storage

## TP 1 : Deployments et Rolling Updates

### Objectif
Maîtriser les déploiements et les mises à jour sans downtime.

### Étapes

\`\`\`bash
# 1. Créer un Deployment
cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: nginx:1.24
          ports:
            - containerPort: 80
          readinessProbe:
            httpGet:
              path: /
              port: 80
            periodSeconds: 3
EOF

# 2. Vérifier le déploiement
kubectl get deployment web-app
kubectl get rs
kubectl get pods -l app=web

# 3. Rolling update
kubectl set image deployment/web-app web=nginx:1.25
kubectl rollout status deployment/web-app

# 4. Vérifier l'historique
kubectl rollout history deployment/web-app

# 5. Rollback
kubectl rollout undo deployment/web-app
kubectl get pods -l app=web

# 6. Scaling
kubectl scale deployment/web-app --replicas=5
kubectl get pods -w
\`\`\`

## TP 2 : StatefulSets et stockage persistant

### Objectif
Déployer une base de données avec un StatefulSet et du stockage persistant.

### Étapes

\`\`\`yaml
# statefulset-redis.yaml
apiVersion: v1
kind: Service
metadata:
  name: redis
spec:
  clusterIP: None
  selector:
    app: redis
  ports:
    - port: 6379
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: redis
spec:
  serviceName: redis
  replicas: 3
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
        - name: redis
          image: redis:7-alpine
          ports:
            - containerPort: 6379
          volumeMounts:
            - name: data
              mountPath: /data
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 1Gi
\`\`\`

\`\`\`bash
kubectl apply -f statefulset-redis.yaml
kubectl get statefulset redis
kubectl get pods -l app=redis -w
# Observer : redis-0, redis-1, redis-2 (créés séquentiellement)

# Vérifier les PVC créés
kubectl get pvc

# Tester la persistance
kubectl exec redis-0 -- redis-cli SET test "hello"
kubectl delete pod redis-0
kubectl get pods -w  # redis-0 est recréé
kubectl exec redis-0 -- redis-cli GET test  # "hello" est toujours là
\`\`\`

## TP 3 : ConfigMaps et Secrets

### Objectif
Configurer des applications avec ConfigMaps et Secrets.

### Étapes

\`\`\`bash
# 1. Créer un ConfigMap
kubectl create configmap app-config \\
    --from-literal=DB_HOST=postgres \\
    --from-literal=DB_PORT=5432 \\
    --from-literal=LOG_LEVEL=info

# 2. Créer un Secret
kubectl create secret generic db-credentials \\
    --from-literal=username=admin \\
    --from-literal=password=secret123

# 3. Déployer un Pod qui utilise les deux
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: config-demo
spec:
  containers:
    - name: app
      image: busybox
      command: ["sh", "-c", "env && sleep 3600"]
      envFrom:
        - configMapRef:
            name: app-config
      env:
        - name: DB_USER
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: username
        - name: DB_PASS
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: password
EOF

# 4. Vérifier
kubectl exec config-demo -- env | grep -E "DB_|LOG_"
\`\`\`

## TP 4 : HPA et autoscaling

### Objectif
Configurer l'autoscaling horizontal basé sur la charge CPU.

### Étapes

\`\`\`bash
# 1. Déployer une application avec des resources
cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: php-apache
spec:
  replicas: 1
  selector:
    matchLabels:
      app: php-apache
  template:
    metadata:
      labels:
        app: php-apache
    spec:
      containers:
        - name: php-apache
          image: registry.k8s.io/hpa-example
          ports:
            - containerPort: 80
          resources:
            requests:
              cpu: "200m"
            limits:
              cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: php-apache
spec:
  selector:
    app: php-apache
  ports:
    - port: 80
EOF

# 2. Créer le HPA
kubectl autoscale deployment php-apache --cpu-percent=50 --min=1 --max=10

# 3. Générer de la charge
kubectl run -i --tty load-generator --rm --image=busybox \\
    --restart=Never -- /bin/sh -c \\
    "while sleep 0.01; do wget -q -O- http://php-apache; done"

# 4. Observer le scaling (dans un autre terminal)
kubectl get hpa php-apache -w
kubectl get pods -l app=php-apache -w

# 5. Arrêter la charge et observer le scale-down
\`\`\`

## TP 5 : Jobs et CronJobs

### Objectif
Exécuter des tâches ponctuelles et planifiées.

### Étapes

\`\`\`bash
# 1. Créer un Job
cat <<EOF | kubectl apply -f -
apiVersion: batch/v1
kind: Job
metadata:
  name: compute-pi
spec:
  completions: 3
  parallelism: 2
  template:
    spec:
      containers:
        - name: pi
          image: perl:5.38
          command: ["perl", "-Mbignum=bpi", "-wle", "print bpi(2000)"]
      restartPolicy: Never
  backoffLimit: 4
EOF

kubectl get jobs -w
kubectl get pods -l job-name=compute-pi

# 2. Créer un CronJob
cat <<EOF | kubectl apply -f -
apiVersion: batch/v1
kind: CronJob
metadata:
  name: hello-cron
spec:
  schedule: "*/1 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: hello
              image: busybox
              command: ["echo", "Hello from CronJob at $(date)"]
          restartPolicy: OnFailure
EOF

kubectl get cronjobs
kubectl get jobs -w
# Attendre 2 minutes
kubectl get pods --sort-by=.metadata.creationTimestamp
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Deployment gère les ReplicaSets avec RollingUpdate (zero-downtime) ou Recreate',
      'StatefulSet fournit une identité stable (pod-0, pod-1) et un stockage persistant par Pod',
      'DaemonSet assure un Pod par nœud (logging, monitoring, réseau)',
      'Jobs pour les tâches ponctuelles, CronJobs pour les tâches planifiées',
      'ConfigMaps pour la configuration, Secrets pour les données sensibles (base64)',
      'PersistentVolumeClaim abstrait le stockage, StorageClass permet le provisionnement dynamique',
      'HPA scale horizontalement basé sur CPU/mémoire/métriques custom',
      'Les classes QoS (Guaranteed, Burstable, BestEffort) déterminent la priorité d\'éviction'
    ]),
  },


  // ============================================================
  // KUBERNETES - Module 3: Networking et déploiement
  // ============================================================
  {
    id: 'k8s-03',
    courseId: 'kubernetes',
    title: 'Networking et déploiement',
    duration: '6h',
    orderIndex: 3,
    videoUrl: 'https://www.youtube.com/watch?v=80Ew_fsV4rM',
    theoryContent: `# Networking et Déploiement Kubernetes

## 1. Services Kubernetes

Un Service fournit une adresse IP stable et un DNS pour accéder à un ensemble de Pods.

### Types de Services

\`\`\`
+----------------------------------------------------------+
|                    TYPES DE SERVICES                      |
+----------------------------------------------------------+
|                                                          |
|  ClusterIP (défaut)     NodePort         LoadBalancer    |
|  ┌────────────┐        ┌──────────┐     ┌──────────┐   |
|  │ Interne    │        │ Port sur │     │ LB Cloud │   |
|  │ cluster    │        │ chaque   │     │ externe  │   |
|  │ seulement  │        │ nœud     │     │          │   |
|  └──────┬─────┘        └────┬─────┘     └────┬─────┘   |
|         │                   │                 │          |
|         ▼                   ▼                 ▼          |
|    ┌─────────┐         ┌─────────┐      ┌─────────┐    |
|    │ Pod Pod │         │ Pod Pod │      │ Pod Pod │    |
|    │ Pod Pod │         │ Pod Pod │      │ Pod Pod │    |
|    └─────────┘         └─────────┘      └─────────┘    |
+----------------------------------------------------------+
\`\`\`

### ClusterIP (par défaut)

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: api-service
spec:
  type: ClusterIP
  selector:
    app: api
  ports:
    - name: http
      port: 80              # Port du Service
      targetPort: 3000      # Port du container
      protocol: TCP
    - name: grpc
      port: 9090
      targetPort: 9090
\`\`\`

### NodePort

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: api-nodeport
spec:
  type: NodePort
  selector:
    app: api
  ports:
    - port: 80
      targetPort: 3000
      nodePort: 30080      # 30000-32767 (optionnel, auto-assigné)
\`\`\`

### LoadBalancer

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: api-lb
  annotations:
    # AWS
    service.beta.kubernetes.io/aws-load-balancer-type: nlb
    service.beta.kubernetes.io/aws-load-balancer-scheme: internet-facing
spec:
  type: LoadBalancer
  selector:
    app: api
  ports:
    - port: 80
      targetPort: 3000
  loadBalancerSourceRanges:
    - "10.0.0.0/8"
\`\`\`

### ExternalName

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: external-db
spec:
  type: ExternalName
  externalName: db.production.example.com
  # Crée un alias DNS dans le cluster
\`\`\`

### Headless Service (ClusterIP: None)

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: postgres-headless
spec:
  clusterIP: None
  selector:
    app: postgres
  ports:
    - port: 5432
# DNS retourne directement les IPs des Pods
# Utilisé avec StatefulSets : postgres-0.postgres-headless.default.svc.cluster.local
\`\`\`

## 2. Ingress

L'Ingress gère l'accès HTTP/HTTPS externe vers les Services du cluster.

### Nginx Ingress Controller

\`\`\`bash
# Installation avec Helm
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install ingress-nginx ingress-nginx/ingress-nginx \\
    --namespace ingress-nginx --create-namespace

# Ou avec manifestes
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.0/deploy/static/provider/cloud/deploy.yaml
\`\`\`

### Configuration Ingress

\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/proxy-body-size: "10m"
    nginx.ingress.kubernetes.io/rate-limit: "10"
    nginx.ingress.kubernetes.io/rate-limit-window: "1m"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - app.example.com
        - api.example.com
      secretName: app-tls-secret
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend-service
                port:
                  number: 80
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: api-service
                port:
                  number: 80
    - host: api.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: api-service
                port:
                  number: 80
\`\`\`

### TLS avec cert-manager

\`\`\`yaml
# ClusterIssuer Let's Encrypt
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: admin@example.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
      - http01:
          ingress:
            class: nginx
\`\`\`

## 3. NetworkPolicies

Les NetworkPolicies contrôlent le trafic réseau entre Pods.

\`\`\`yaml
# Deny all par défaut
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all
  namespace: production
spec:
  podSelector: {}
  policyTypes:
    - Ingress
    - Egress

---
# Autoriser le trafic spécifique
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-network-policy
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: api
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: frontend
        - namespaceSelector:
            matchLabels:
              name: monitoring
      ports:
        - protocol: TCP
          port: 3000
  egress:
    - to:
        - podSelector:
            matchLabels:
              app: postgres
      ports:
        - protocol: TCP
          port: 5432
    - to:  # DNS
        - namespaceSelector: {}
          podSelector:
            matchLabels:
              k8s-app: kube-dns
      ports:
        - protocol: UDP
          port: 53
\`\`\`

## 4. DNS (CoreDNS)

Kubernetes utilise CoreDNS pour la résolution DNS interne :

\`\`\`
# Format DNS des Services
<service-name>.<namespace>.svc.cluster.local

# Exemples
api-service.default.svc.cluster.local
postgres.production.svc.cluster.local

# Depuis le même namespace, le nom court suffit
api-service
postgres

# Pods dans un StatefulSet (Headless Service)
postgres-0.postgres-headless.production.svc.cluster.local
\`\`\`

\`\`\`bash
# Tester le DNS
kubectl run dns-test --rm -it --image=busybox -- nslookup api-service
kubectl run dns-test --rm -it --image=busybox -- nslookup kubernetes.default.svc.cluster.local
\`\`\`

## 5. Helm

Helm est le gestionnaire de packages pour Kubernetes.

### Concepts

- **Chart** : package Helm (collection de templates K8s)
- **Release** : instance déployée d'un Chart
- **Repository** : collection de Charts
- **Values** : configuration d'un Chart

### Commandes essentielles

\`\`\`bash
# Gestion des repos
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo add prometheus https://prometheus-community.github.io/helm-charts
helm repo update
helm repo list
helm search repo nginx
helm search hub wordpress

# Installer un chart
helm install my-release bitnami/nginx
helm install my-release bitnami/nginx -f custom-values.yaml
helm install my-release bitnami/nginx --set service.type=NodePort
helm install my-release bitnami/nginx --namespace production --create-namespace

# Gérer les releases
helm list
helm list -A
helm status my-release
helm get values my-release
helm get manifest my-release

# Mise à jour
helm upgrade my-release bitnami/nginx --set replicaCount=3
helm upgrade my-release bitnami/nginx -f new-values.yaml
helm upgrade --install my-release bitnami/nginx  # Install or upgrade

# Rollback
helm rollout history my-release
helm rollback my-release 1

# Supprimer
helm uninstall my-release

# Développement
helm create my-chart
helm template my-chart ./my-chart
helm lint ./my-chart
helm package ./my-chart
helm install test ./my-chart --dry-run --debug
\`\`\`

### Structure d'un Chart

\`\`\`
my-chart/
  Chart.yaml          # Métadonnées du chart
  values.yaml         # Valeurs par défaut
  charts/             # Dépendances
  templates/          # Templates Kubernetes
    deployment.yaml
    service.yaml
    ingress.yaml
    _helpers.tpl      # Fonctions template réutilisables
    NOTES.txt         # Notes post-installation
  .helmignore
\`\`\`

### Exemple values.yaml

\`\`\`yaml
# values.yaml
replicaCount: 3

image:
  repository: mon-app
  tag: "v1.0.0"
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: true
  hosts:
    - host: app.example.com
      paths:
        - path: /
          pathType: Prefix

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 100m
    memory: 128Mi

autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70
\`\`\`

## 6. Kustomize

Kustomize permet de personnaliser des manifestes sans templates :

\`\`\`
# Structure
base/
  kustomization.yaml
  deployment.yaml
  service.yaml
overlays/
  dev/
    kustomization.yaml
    patch-replicas.yaml
  prod/
    kustomization.yaml
    patch-replicas.yaml
    patch-resources.yaml
\`\`\`

\`\`\`yaml
# base/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - deployment.yaml
  - service.yaml
commonLabels:
  app: my-app

# overlays/prod/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - ../../base
namespace: production
namePrefix: prod-
patches:
  - patch-replicas.yaml
  - patch-resources.yaml
configMapGenerator:
  - name: app-config
    literals:
      - LOG_LEVEL=warn
      - ENV=production
\`\`\`

\`\`\`bash
# Appliquer
kubectl apply -k overlays/prod/
kustomize build overlays/prod/ | kubectl apply -f -
\`\`\`

## 7. GitOps avec ArgoCD

### Installation

\`\`\`bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Accéder à l'UI
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Obtenir le mot de passe admin
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
\`\`\`

### Application ArgoCD

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/org/k8s-manifests.git
    targetRevision: main
    path: overlays/production
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

## 8. Monitoring avec Prometheus et Grafana

### Installation avec Helm

\`\`\`bash
# Prometheus Stack (inclut Grafana, AlertManager, etc.)
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install monitoring prometheus-community/kube-prometheus-stack \\
    --namespace monitoring --create-namespace \\
    --set grafana.adminPassword=admin123

# Accéder à Grafana
kubectl port-forward svc/monitoring-grafana -n monitoring 3000:80
\`\`\`

### ServiceMonitor pour métriques custom

\`\`\`yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: api-monitor
  namespace: monitoring
spec:
  selector:
    matchLabels:
      app: api
  endpoints:
    - port: metrics
      interval: 30s
      path: /metrics
  namespaceSelector:
    matchNames:
      - production
\`\`\`

## 9. RBAC (Role-Based Access Control)

\`\`\`yaml
# Role (namespace-scoped)
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
  namespace: production
rules:
  - apiGroups: [""]
    resources: ["pods", "pods/log"]
    verbs: ["get", "list", "watch"]
  - apiGroups: ["apps"]
    resources: ["deployments"]
    verbs: ["get", "list"]

---
# RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: production
subjects:
  - kind: User
    name: developer
    apiGroup: rbac.authorization.k8s.io
  - kind: ServiceAccount
    name: ci-cd
    namespace: production
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io

---
# ClusterRole (cluster-wide)
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: node-viewer
rules:
  - apiGroups: [""]
    resources: ["nodes"]
    verbs: ["get", "list", "watch"]
\`\`\`
`,
    practiceContent: `# Travaux Pratiques : Networking et Déploiement

## TP 1 : Services et exposition

### Objectif
Exposer des applications avec différents types de Services.

### Étapes

\`\`\`bash
# 1. Déployer une application
kubectl create deployment web --image=nginx:1.25 --replicas=3

# 2. Créer un Service ClusterIP
kubectl expose deployment web --port=80 --target-port=80

# 3. Tester l'accès interne
kubectl run test --rm -it --image=busybox -- wget -qO- http://web

# 4. Créer un Service NodePort
kubectl expose deployment web --port=80 --type=NodePort --name=web-external

# 5. Obtenir le NodePort
kubectl get svc web-external
# Accéder via <node-ip>:<nodePort>

# 6. Vérifier le load balancing
for i in $(seq 1 10); do
    kubectl run test-$i --rm -it --image=busybox --restart=Never -- \\
        wget -qO- http://web 2>/dev/null | grep "Server"
done
\`\`\`

## TP 2 : Ingress avec routage

### Objectif
Configurer un Ingress pour router le trafic HTTP vers différents services.

### Étapes

\`\`\`bash
# 1. Activer l'Ingress Controller (minikube)
minikube addons enable ingress

# 2. Déployer deux applications
kubectl create deployment frontend --image=nginx --replicas=2
kubectl create deployment api --image=hashicorp/http-echo -- -text="API Response"
kubectl expose deployment frontend --port=80
kubectl expose deployment api --port=5678

# 3. Créer l'Ingress
cat <<EOF | kubectl apply -f -
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-routing
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
    - host: myapp.local
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend
                port:
                  number: 80
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: api
                port:
                  number: 5678
EOF

# 4. Tester (ajouter myapp.local dans /etc/hosts)
echo "$(minikube ip) myapp.local" | sudo tee -a /etc/hosts
curl http://myapp.local/
curl http://myapp.local/api
\`\`\`

## TP 3 : NetworkPolicies

### Objectif
Isoler les Pods avec des Network Policies.

### Étapes

\`\`\`bash
# 1. Créer un namespace isolé
kubectl create namespace secure-app

# 2. Déployer frontend et backend
kubectl -n secure-app create deployment frontend --image=nginx
kubectl -n secure-app create deployment backend --image=nginx
kubectl -n secure-app expose deployment frontend --port=80
kubectl -n secure-app expose deployment backend --port=80

# 3. Vérifier la connectivité (avant politique)
kubectl -n secure-app exec deploy/frontend -- wget -qO- --timeout=3 http://backend

# 4. Appliquer une politique deny-all
cat <<EOF | kubectl apply -f -
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all
  namespace: secure-app
spec:
  podSelector: {}
  policyTypes:
    - Ingress
    - Egress
EOF

# 5. Vérifier que la connectivité est bloquée
kubectl -n secure-app exec deploy/frontend -- wget -qO- --timeout=3 http://backend
# Timeout !

# 6. Autoriser frontend → backend
cat <<EOF | kubectl apply -f -
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-backend
  namespace: secure-app
spec:
  podSelector:
    matchLabels:
      app: backend
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: frontend
      ports:
        - port: 80
EOF
\`\`\`

## TP 4 : Helm - déploiement d'application

### Objectif
Utiliser Helm pour déployer et gérer une application.

### Étapes

\`\`\`bash
# 1. Installer un chart communautaire
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# 2. Déployer Redis avec Helm
helm install my-redis bitnami/redis \\
    --set architecture=standalone \\
    --set auth.password=secret123

# 3. Vérifier le déploiement
helm list
helm status my-redis
kubectl get pods -l app.kubernetes.io/instance=my-redis

# 4. Créer son propre chart
helm create my-app
# Éditer my-app/values.yaml et my-app/templates/

# 5. Tester et déployer
helm template my-app ./my-app
helm install test-release ./my-app --dry-run --debug
helm install my-app-release ./my-app

# 6. Upgrade et rollback
helm upgrade my-app-release ./my-app --set replicaCount=3
helm history my-app-release
helm rollback my-app-release 1

# 7. Nettoyer
helm uninstall my-redis
helm uninstall my-app-release
\`\`\`

## TP 5 : Monitoring avec Prometheus

### Objectif
Mettre en place le monitoring du cluster avec Prometheus et Grafana.

### Étapes

\`\`\`bash
# 1. Installer le stack Prometheus
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install monitoring prometheus-community/kube-prometheus-stack \\
    --namespace monitoring --create-namespace \\
    --set grafana.adminPassword=admin123 \\
    --set prometheus.prometheusSpec.retention=7d

# 2. Accéder à Grafana
kubectl port-forward -n monitoring svc/monitoring-grafana 3000:80 &
echo "Grafana: http://localhost:3000 (admin/admin123)"

# 3. Accéder à Prometheus
kubectl port-forward -n monitoring svc/monitoring-kube-prometheus-prometheus 9090:9090 &
echo "Prometheus: http://localhost:9090"

# 4. Vérifier les cibles
# Dans Prometheus UI : Status → Targets

# 5. Créer un dashboard personnalisé
# Dans Grafana : Import dashboard ID 6417 (Kubernetes Cluster)

# 6. Tester les alertes
kubectl get prometheusrules -n monitoring
kubectl get alertmanagerconfigs -n monitoring
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Les Services (ClusterIP, NodePort, LoadBalancer, ExternalName) fournissent une IP stable pour accéder aux Pods',
      'L\'Ingress route le trafic HTTP/HTTPS externe vers les Services avec TLS et virtual hosts',
      'Les NetworkPolicies contrôlent le trafic inter-Pods (whitelist approach, deny-all recommandé)',
      'CoreDNS résout automatiquement service.namespace.svc.cluster.local dans le cluster',
      'Helm gère les packages Kubernetes (charts) avec install, upgrade, rollback, values',
      'Kustomize personnalise les manifestes via overlays sans templates (base + patches)',
      'ArgoCD/Flux implémentent le GitOps : le repo Git est la source de vérité du cluster',
      'RBAC (Role, ClusterRole, RoleBinding) contrôle les permissions d\'accès aux ressources'
    ]),
  },


  // ============================================================
  // TERRAFORM - Module 1: Introduction et langage HCL
  // ============================================================
  {
    id: 'tf-01',
    courseId: 'terraform',
    title: 'Introduction et langage HCL',
    duration: '5h',
    orderIndex: 1,
    videoUrl: 'https://www.youtube.com/watch?v=7xngnjfIlK4',
    theoryContent: `# Introduction à Terraform et le Langage HCL

## 1. Histoire et Contexte

### Infrastructure as Code (IaC)

L'Infrastructure as Code est la pratique de gérer et provisionner l'infrastructure via des fichiers de configuration plutôt que via des interfaces graphiques ou des commandes manuelles. Terraform, créé par HashiCorp en 2014 par Mitchell Hashimoto, est devenu le standard de fait pour l'IaC multi-cloud.

### Pourquoi Terraform ?

| Avantage | Description |
|----------|-------------|
| Multi-cloud | AWS, Azure, GCP, VMware, etc. avec un seul outil |
| Déclaratif | Décrit l'état désiré, Terraform calcule les changements |
| Plan d'exécution | Prévisualise les changements avant application |
| Graphe de dépendances | Parallélise les créations indépendantes |
| State | Suit l'état réel de l'infrastructure |
| Modules | Composants réutilisables et versionnés |
| Open Source | Large communauté et écosystème de providers |

### Terraform vs autres outils IaC

| Critère | Terraform | CloudFormation | Pulumi | Ansible |
|---------|-----------|----------------|--------|---------|
| Multi-cloud | Oui | AWS only | Oui | Oui |
| Langage | HCL | YAML/JSON | Python/Go/TS | YAML |
| State | Fichier | Stack | Fichier | Non |
| Approche | Déclaratif | Déclaratif | Impératif | Impératif/Déclaratif |
| Drift detection | Oui (plan) | Oui | Oui | Non |

## 2. Installation

### Installation sur Linux

\`\`\`bash
# Ubuntu/Debian - via le dépôt HashiCorp
wget -O- https://apt.releases.hashicorp.com/gpg | \\
    sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \\
    https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \\
    sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform

# CentOS/RHEL
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/RHEL/hashicorp.repo
sudo yum install terraform

# Via tfenv (gestionnaire de versions - recommandé)
git clone https://github.com/tfutils/tfenv.git ~/.tfenv
echo 'export PATH="\\\$HOME/.tfenv/bin:\\\$PATH"' >> ~/.bashrc
source ~/.bashrc
tfenv install latest
tfenv use latest
tfenv list

# Vérifier l'installation
terraform version
terraform -help
\`\`\`

### Configuration de l'auto-complétion

\`\`\`bash
terraform -install-autocomplete
# Redémarrer le shell ou source ~/.bashrc
\`\`\`

## 3. Syntaxe HCL (HashiCorp Configuration Language)

### Blocs, attributs et expressions

\`\`\`hcl
# Bloc de configuration
block_type "label1" "label2" {
  # Attribut simple
  attribute = "value"
  
  # Bloc imbriqué
  nested_block {
    key = "value"
  }
}

# Exemple concret
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
  
  tags = {
    Name        = "WebServer"
    Environment = "production"
  }
}
\`\`\`

### Types de données

\`\`\`hcl
# String
name = "mon-serveur"
multiline = <<-EOT
  Première ligne
  Deuxième ligne
EOT

# Number
count = 3
cpu   = 1.5

# Bool
enabled = true

# List (tuple)
availability_zones = ["eu-west-1a", "eu-west-1b", "eu-west-1c"]
ports = [80, 443, 8080]

# Map (object)
tags = {
  Name        = "WebServer"
  Environment = "prod"
  Team        = "platform"
}

# Null
optional_value = null

# Complex types
variable "server_config" {
  type = object({
    name          = string
    instance_type = string
    disk_size     = number
    public        = bool
    tags          = map(string)
    ports         = list(number)
  })
}
\`\`\`

## 4. Variables

### Input Variables

\`\`\`hcl
# variables.tf

# Variable simple avec valeur par défaut
variable "region" {
  description = "AWS region for resources"
  type        = string
  default     = "eu-west-1"
}

# Variable obligatoire (pas de default)
variable "project_name" {
  description = "Name of the project"
  type        = string
}

# Variable avec validation
variable "environment" {
  description = "Deployment environment"
  type        = string
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

# Variable sensible
variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

# Variable complexe
variable "vpc_config" {
  description = "VPC configuration"
  type = object({
    cidr_block = string
    subnets    = list(object({
      cidr = string
      az   = string
      public = bool
    }))
  })
  default = {
    cidr_block = "10.0.0.0/16"
    subnets = [
      { cidr = "10.0.1.0/24", az = "eu-west-1a", public = true },
      { cidr = "10.0.2.0/24", az = "eu-west-1b", public = true },
      { cidr = "10.0.3.0/24", az = "eu-west-1c", public = false },
    ]
  }
}

# Variable nullable
variable "override_name" {
  type     = string
  default  = null
  nullable = true
}
\`\`\`

### Fichiers tfvars

\`\`\`hcl
# terraform.tfvars (chargé automatiquement)
region       = "eu-west-1"
project_name = "my-platform"
environment  = "prod"

# prod.tfvars (chargé avec -var-file)
# terraform apply -var-file=prod.tfvars
\`\`\`

### Local Values

\`\`\`hcl
locals {
  # Valeurs calculées
  name_prefix = "\\\${var.project_name}-\\\${var.environment}"
  
  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
    CreatedAt   = timestamp()
  }
  
  # Calculs complexes
  subnet_ids = [for s in aws_subnet.main : s.id]
  
  is_production = var.environment == "prod"
}

# Utilisation
resource "aws_instance" "web" {
  tags = merge(local.common_tags, {
    Name = "\\\${local.name_prefix}-web"
  })
}
\`\`\`

### Output Values

\`\`\`hcl
# outputs.tf
output "instance_ip" {
  description = "Public IP of the web server"
  value       = aws_instance.web.public_ip
}

output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}

output "db_connection_string" {
  description = "Database connection string"
  value       = "postgres://\\\${var.db_user}@\\\${aws_db_instance.main.endpoint}/\\\${var.db_name}"
  sensitive   = true
}

output "subnet_ids" {
  description = "List of subnet IDs"
  value       = aws_subnet.main[*].id
}
\`\`\`

## 5. Data Sources

Les data sources permettent de récupérer des informations existantes :

\`\`\`hcl
# Récupérer l'AMI la plus récente
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]  # Canonical
  
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}

# Récupérer les AZ disponibles
data "aws_availability_zones" "available" {
  state = "available"
}

# Récupérer un secret
data "aws_secretsmanager_secret_version" "db_password" {
  secret_id = "prod/db/password"
}

# Récupérer le caller identity
data "aws_caller_identity" "current" {}

# Utilisation
resource "aws_instance" "web" {
  ami               = data.aws_ami.ubuntu.id
  availability_zone = data.aws_availability_zones.available.names[0]
}
\`\`\`

## 6. Providers

### Configuration des providers

\`\`\`hcl
# versions.tf
terraform {
  required_version = ">= 1.5.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.5"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
  }
}

# Provider AWS avec profil
provider "aws" {
  region  = var.region
  profile = "production"
  
  default_tags {
    tags = local.common_tags
  }
}

# Provider AWS pour une autre région
provider "aws" {
  alias  = "us_east"
  region = "us-east-1"
}

# Utilisation du provider aliasé
resource "aws_s3_bucket" "cdn_origin" {
  provider = aws.us_east
  bucket   = "cdn-origin-bucket"
}
\`\`\`

## 7. Fonctions HCL

### Fonctions String

\`\`\`hcl
# String manipulation
upper("hello")           # "HELLO"
lower("HELLO")           # "hello"
title("hello world")     # "Hello World"
trimspace("  hello  ")   # "hello"
trim("?!hello?!", "?!")  # "hello"
replace("hello", "l", "L") # "heLLo"
split(",", "a,b,c")      # ["a", "b", "c"]
join("-", ["a", "b"])     # "a-b"
format("Hello, %s!", "world") # "Hello, world!"
substr("hello", 0, 3)    # "hel"
regex("[a-z]+", "123abc456") # "abc"
regexall("[0-9]+", "1 22 333") # ["1", "22", "333"]
\`\`\`

### Fonctions Collection

\`\`\`hcl
# List
length([1, 2, 3])          # 3
element(["a", "b"], 1)     # "b"
concat([1, 2], [3, 4])    # [1, 2, 3, 4]
flatten([[1, 2], [3, 4]]) # [1, 2, 3, 4]
distinct([1, 1, 2, 3])    # [1, 2, 3]
sort(["c", "a", "b"])     # ["a", "b", "c"]
contains(["a", "b"], "a") # true
index(["a", "b"], "b")    # 1
slice(["a", "b", "c"], 0, 2) # ["a", "b"]
range(3)                   # [0, 1, 2]
range(1, 5)               # [1, 2, 3, 4]

# Map
lookup({a=1, b=2}, "a", 0) # 1
keys({a=1, b=2})           # ["a", "b"]
values({a=1, b=2})         # [1, 2]
merge({a=1}, {b=2})        # {a=1, b=2}
zipmap(["a", "b"], [1, 2]) # {a=1, b=2}
\`\`\`

### Fonctions Numeric, Filesystem, Date

\`\`\`hcl
# Numeric
min(1, 2, 3)     # 1
max(1, 2, 3)     # 3
abs(-5)          # 5
ceil(1.2)        # 2
floor(1.8)       # 1
pow(2, 3)        # 8
signum(-5)       # -1

# Filesystem
file("./templates/userdata.sh")
filebase64("./files/cert.pem")
templatefile("./templates/config.tpl", { port = 8080 })
fileexists("./config.json")

# Date/Time
timestamp()                       # "2024-01-15T10:30:00Z"
formatdate("YYYY-MM-DD", timestamp())
timeadd(timestamp(), "24h")
\`\`\`

## 8. Expressions

### Conditionnelles

\`\`\`hcl
# Ternaire
instance_type = var.environment == "prod" ? "t3.large" : "t3.micro"
count         = var.create_resource ? 1 : 0
\`\`\`

### For expressions

\`\`\`hcl
# Transformer une liste
upper_names = [for name in var.names : upper(name)]

# Filtrer
prod_servers = [for s in var.servers : s if s.environment == "prod"]

# Créer une map depuis une liste
name_map = { for s in var.servers : s.name => s.ip }

# For avec index
indexed = { for i, name in var.names : i => name }
\`\`\`

### Splat expressions

\`\`\`hcl
# Équivalent à [for o in aws_instance.web : o.id]
instance_ids = aws_instance.web[*].id
\`\`\`

### Dynamic blocks

\`\`\`hcl
resource "aws_security_group" "web" {
  name = "web-sg"
  
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

## 9. Terraform CLI

\`\`\`bash
# Workflow principal
terraform init              # Initialiser (télécharge providers, modules)
terraform plan              # Planifier les changements
terraform apply             # Appliquer les changements
terraform destroy           # Détruire toute l'infrastructure

# Options de plan/apply
terraform plan -out=plan.tfplan    # Sauvegarder le plan
terraform apply plan.tfplan         # Appliquer un plan sauvegardé
terraform apply -auto-approve       # Sans confirmation
terraform apply -target=aws_instance.web  # Cibler une ressource
terraform apply -var="region=us-east-1"   # Passer une variable
terraform apply -var-file=prod.tfvars     # Fichier de variables

# Formatage et validation
terraform fmt                # Formater les fichiers HCL
terraform fmt -check         # Vérifier le formatage (CI)
terraform fmt -recursive     # Formater récursivement
terraform validate           # Valider la syntaxe

# Exploration
terraform console            # Console interactive HCL
terraform graph              # Générer un graphe DOT
terraform graph | dot -Tpng > graph.png

# Providers
terraform providers          # Lister les providers utilisés
terraform providers lock     # Verrouiller les versions

# Output
terraform output             # Afficher toutes les sorties
terraform output -json       # Format JSON
terraform output instance_ip # Sortie spécifique
\`\`\`
`,
    practiceContent: `# Travaux Pratiques : Introduction et Langage HCL

## TP 1 : Premier projet Terraform

### Objectif
Créer un premier projet Terraform avec le provider Docker.

### Étapes

\`\`\`hcl
# main.tf
terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "nginx" {
  name         = "nginx:alpine"
  keep_locally = false
}

resource "docker_container" "web" {
  image = docker_image.nginx.image_id
  name  = "terraform-nginx"
  
  ports {
    internal = 80
    external = 8080
  }
}

output "container_id" {
  value = docker_container.web.id
}

output "container_name" {
  value = docker_container.web.name
}
\`\`\`

\`\`\`bash
terraform init
terraform plan
terraform apply -auto-approve
curl http://localhost:8080
terraform show
terraform destroy -auto-approve
\`\`\`

## TP 2 : Variables et Outputs

### Objectif
Paramétrer un déploiement avec des variables.

### Étapes

\`\`\`hcl
# variables.tf
variable "container_name" {
  description = "Name of the Docker container"
  type        = string
  default     = "my-web-app"
}

variable "external_port" {
  description = "External port for the container"
  type        = number
  default     = 8080
  validation {
    condition     = var.external_port >= 1024 && var.external_port <= 65535
    error_message = "Port must be between 1024 and 65535."
  }
}

variable "image_tag" {
  description = "Docker image tag"
  type        = string
  default     = "alpine"
}

# main.tf
locals {
  full_image = "nginx:\\\${var.image_tag}"
  labels = {
    managed_by = "terraform"
    app        = var.container_name
  }
}

resource "docker_image" "app" {
  name = local.full_image
}

resource "docker_container" "app" {
  image = docker_image.app.image_id
  name  = var.container_name
  
  ports {
    internal = 80
    external = var.external_port
  }
  
  dynamic "labels" {
    for_each = local.labels
    content {
      label = labels.key
      value = labels.value
    }
  }
}

# outputs.tf
output "url" {
  value = "http://localhost:\\\${var.external_port}"
}
\`\`\`

\`\`\`bash
terraform apply -var="container_name=prod-web" -var="external_port=9090"
terraform output url
\`\`\`

## TP 3 : Fonctions et expressions

### Objectif
Utiliser les fonctions HCL et les expressions avancées.

### Étapes

\`\`\`hcl
# Deployer plusieurs containers avec count et for_each
variable "services" {
  type = map(object({
    image = string
    port  = number
  }))
  default = {
    web = { image = "nginx:alpine", port = 8080 }
    api = { image = "hashicorp/http-echo", port = 8081 }
    cache = { image = "redis:alpine", port = 6379 }
  }
}

resource "docker_container" "service" {
  for_each = var.services
  
  name  = each.key
  image = each.value.image
  
  ports {
    internal = each.value.port
    external = each.value.port
  }
}

output "service_urls" {
  value = { for name, config in var.services : 
    name => "http://localhost:\\\${config.port}" 
  }
}
\`\`\`

\`\`\`bash
terraform apply -auto-approve
terraform output service_urls
terraform console
# > keys(var.services)
# > length(var.services)
# > [for k, v in var.services : upper(k)]
\`\`\`

## TP 4 : Terraform console et exploration

### Objectif
Utiliser la console Terraform pour tester des expressions.

### Étapes

\`\`\`bash
terraform console

# Tester des fonctions
> upper("hello terraform")
> format("Server-%02d", 3)
> cidrsubnet("10.0.0.0/16", 8, 1)
> timestamp()
> formatdate("YYYY-MM-DD", timestamp())
> merge({a=1}, {b=2}, {c=3})
> [for i in range(5) : format("server-%02d", i)]
> { for k, v in {a=1, b=2} : upper(k) => v * 10 }
> contains(["dev", "prod"], "staging")
> exit
\`\`\`

## TP 5 : Projet multi-fichiers structuré

### Objectif
Organiser un projet Terraform avec une structure professionnelle.

### Étapes

\`\`\`bash
# Structure
mkdir -p terraform-project/{modules,environments}
cd terraform-project

# versions.tf - versions et providers
# variables.tf - déclaration des variables
# main.tf - ressources principales
# outputs.tf - sorties
# locals.tf - valeurs locales
# terraform.tfvars - valeurs par défaut
\`\`\`

\`\`\`hcl
# versions.tf
terraform {
  required_version = ">= 1.5.0"
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.5"
    }
  }
}

# locals.tf
locals {
  name_prefix = "\\\${var.project}-\\\${var.environment}"
  common_labels = {
    project     = var.project
    environment = var.environment
    managed_by  = "terraform"
  }
}
\`\`\`

\`\`\`bash
terraform init
terraform fmt -recursive
terraform validate
terraform plan
terraform apply
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Terraform est un outil IaC déclaratif multi-cloud utilisant le langage HCL de HashiCorp',
      'Le workflow standard est : terraform init → plan → apply (→ destroy)',
      'Les variables (input, local, output) paramétrisent et exposent les configurations',
      'Les data sources récupèrent des informations sur l\'infrastructure existante',
      'Les providers sont des plugins qui interfacent Terraform avec les services cloud',
      'HCL supporte des types riches (string, number, bool, list, map, object) et la validation',
      'Les expressions (conditionnelles, for, splat, dynamic blocks) permettent des configs flexibles',
      'Les fonctions intégrées (string, collection, numeric, filesystem) manipulent les données'
    ]),
  },


  // ============================================================
  // TERRAFORM - Module 2: State et gestion d'infrastructure
  // ============================================================
  {
    id: 'tf-02',
    courseId: 'terraform',
    title: 'State et gestion d\'infrastructure',
    duration: '5h',
    orderIndex: 2,
    videoUrl: 'https://www.youtube.com/watch?v=SLB_c_ayRMo',
    theoryContent: `# State Terraform et Gestion d'Infrastructure

## 1. Le State Terraform

### Qu'est-ce que le State ?

Le fichier \\\`terraform.tfstate\\\` est la **source de vérité** de Terraform. Il fait le lien entre votre configuration HCL et les ressources réelles créées dans le cloud. Sans le state, Terraform ne saurait pas quelles ressources il gère.

### Structure du State

\`\`\`json
{
  "version": 4,
  "terraform_version": "1.6.0",
  "serial": 12,
  "lineage": "unique-id",
  "outputs": {
    "instance_ip": {
      "value": "52.47.100.50",
      "type": "string"
    }
  },
  "resources": [
    {
      "mode": "managed",
      "type": "aws_instance",
      "name": "web",
      "provider": "provider[\\"registry.terraform.io/hashicorp/aws\\"]",
      "instances": [
        {
          "attributes": {
            "id": "i-0abc123def456",
            "ami": "ami-0c55b159cbfafe1f0",
            "instance_type": "t3.micro",
            "public_ip": "52.47.100.50"
          }
        }
      ]
    }
  ]
}
\`\`\`

### Rôle du State

| Fonction | Description |
|----------|-------------|
| Mapping | Lie les ressources HCL aux ressources cloud réelles |
| Métadonnées | Stocke les dépendances entre ressources |
| Performance | Cache les attributs pour accélérer les plans |
| Sync | Détecte le drift (différences config vs réel) |

### Données sensibles dans le State

**ATTENTION** : Le state contient en clair les mots de passe, clés API, et autres secrets. Il doit être :
- Chiffré au repos (S3 encryption, GCS encryption)
- Accessible uniquement aux personnes autorisées
- Jamais commité dans Git

## 2. Remote Backends

### Backend S3 + DynamoDB (AWS)

\`\`\`hcl
# backend.tf
terraform {
  backend "s3" {
    bucket         = "my-terraform-state-prod"
    key            = "infrastructure/prod/terraform.tfstate"
    region         = "eu-west-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
    
    # Optionnel : profil AWS
    profile = "production"
  }
}

# Créer le bucket et la table DynamoDB (bootstrap)
# Ce code est exécuté une seule fois avec un state local
resource "aws_s3_bucket" "terraform_state" {
  bucket = "my-terraform-state-prod"
  
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_versioning" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "aws:kms"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_dynamodb_table" "terraform_locks" {
  name         = "terraform-locks"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"
  
  attribute {
    name = "LockID"
    type = "S"
  }
}
\`\`\`

### Backend GCS (Google Cloud)

\`\`\`hcl
terraform {
  backend "gcs" {
    bucket  = "my-terraform-state"
    prefix  = "infrastructure/prod"
  }
}
\`\`\`

### Backend Azure Blob Storage

\`\`\`hcl
terraform {
  backend "azurerm" {
    resource_group_name  = "terraform-state-rg"
    storage_account_name = "tfstatestorage"
    container_name       = "tfstate"
    key                  = "prod.terraform.tfstate"
  }
}
\`\`\`

### Backend Terraform Cloud

\`\`\`hcl
terraform {
  cloud {
    organization = "my-org"
    
    workspaces {
      name = "infrastructure-prod"
    }
  }
}
\`\`\`

## 3. Commandes State

\`\`\`bash
# Lister les ressources dans le state
terraform state list
terraform state list aws_instance.*

# Afficher les détails d'une ressource
terraform state show aws_instance.web
terraform state show 'module.vpc.aws_subnet.public[0]'

# Déplacer une ressource (refactoring)
terraform state mv aws_instance.web aws_instance.web_server
terraform state mv aws_instance.web module.compute.aws_instance.web
terraform state mv 'module.old.aws_instance.web' 'module.new.aws_instance.web'

# Retirer une ressource du state (sans la détruire)
terraform state rm aws_instance.web
# La ressource existe toujours dans le cloud mais n'est plus gérée par TF

# Synchroniser le state avec le cloud
terraform state pull > state.json   # Télécharger le state
terraform state push state.json     # Uploader le state (DANGEREUX)

# Importer une ressource existante
terraform import aws_instance.web i-0abc123def456
terraform import 'aws_security_group.sg["web"]' sg-12345

# Depuis Terraform 1.5+ : import block
import {
  to = aws_instance.web
  id = "i-0abc123def456"
}

# Remplacer une ressource (force recreation)
terraform apply -replace=aws_instance.web
# Ancien equivalent: terraform taint aws_instance.web
\`\`\`

## 4. Workspaces

Les workspaces permettent de gérer plusieurs états depuis une même configuration :

\`\`\`bash
# Créer et lister les workspaces
terraform workspace new development
terraform workspace new staging
terraform workspace new production
terraform workspace list
terraform workspace show

# Changer de workspace
terraform workspace select production

# Supprimer un workspace
terraform workspace delete development
\`\`\`

\`\`\`hcl
# Utiliser le workspace dans la config
resource "aws_instance" "web" {
  instance_type = terraform.workspace == "production" ? "t3.large" : "t3.micro"
  
  tags = {
    Environment = terraform.workspace
  }
}

locals {
  env_config = {
    development = { instance_type = "t3.micro", count = 1 }
    staging     = { instance_type = "t3.small", count = 2 }
    production  = { instance_type = "t3.large", count = 3 }
  }
  config = local.env_config[terraform.workspace]
}
\`\`\`

## 5. Lifecycle

### Règles de lifecycle

\`\`\`hcl
resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"
  
  lifecycle {
    # Créer la nouvelle avant de détruire l'ancienne
    create_before_destroy = true
    
    # Empêcher la destruction (protection)
    prevent_destroy = true
    
    # Ignorer certains changements (évite le drift)
    ignore_changes = [
      tags,
      ami,
      user_data,
    ]
    
    # Remplacer si un attribut change
    replace_triggered_by = [
      aws_security_group.web.id
    ]
    
    # Pré-conditions et post-conditions
    precondition {
      condition     = data.aws_ami.ubuntu.architecture == "x86_64"
      error_message = "AMI must be x86_64 architecture."
    }
    
    postcondition {
      condition     = self.public_ip != ""
      error_message = "Instance must have a public IP."
    }
  }
}
\`\`\`

## 6. Provisioners

Les provisioners exécutent des scripts après la création/destruction de ressources.

\`\`\`hcl
resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"
  key_name      = aws_key_pair.deployer.key_name
  
  # Provisioner local (sur la machine qui exécute Terraform)
  provisioner "local-exec" {
    command = "echo \\\${self.public_ip} >> inventory.txt"
  }
  
  provisioner "local-exec" {
    when    = destroy
    command = "echo 'Instance destroyed' >> destroy.log"
  }
  
  # Provisioner remote (sur la ressource créée)
  provisioner "remote-exec" {
    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.ssh/id_rsa")
      host        = self.public_ip
    }
    
    inline = [
      "sudo apt-get update",
      "sudo apt-get install -y nginx",
      "sudo systemctl start nginx"
    ]
  }
  
  # File provisioner
  provisioner "file" {
    source      = "scripts/setup.sh"
    destination = "/tmp/setup.sh"
    
    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.ssh/id_rsa")
      host        = self.public_ip
    }
  }
}
\`\`\`

**Note** : Les provisioners sont un dernier recours. Préférer :
- **cloud-init / user_data** pour l'initialisation
- **Ansible** pour la configuration
- **Packer** pour les images pré-configurées

## 7. Import de ressources existantes

### Méthode classique (CLI)

\`\`\`bash
# 1. Écrire la configuration de la ressource
# 2. Importer
terraform import aws_vpc.main vpc-12345678
terraform import 'aws_subnet.public[0]' subnet-abc123
terraform import module.vpc.aws_vpc.main vpc-12345678

# 3. Comparer et ajuster
terraform plan
# Ajuster la configuration jusqu'à ce que le plan soit vide
\`\`\`

### Import blocks (Terraform 1.5+)

\`\`\`hcl
# import.tf
import {
  to = aws_vpc.main
  id = "vpc-12345678"
}

import {
  to = aws_subnet.public[0]
  id = "subnet-abc123"
}

# Générer la configuration automatiquement
# terraform plan -generate-config-out=generated.tf
\`\`\`

## 8. Gestion du drift

\`\`\`bash
# Détecter le drift (refresh implicite dans plan)
terraform plan

# Refresh explicite (met à jour le state depuis le cloud)
terraform apply -refresh-only

# Ignorer le drift pour certains attributs
lifecycle {
  ignore_changes = [tags, metadata]
}
\`\`\`

## 9. Bonnes pratiques State

| Pratique | Description |
|----------|-------------|
| Remote backend | Toujours utiliser un backend distant en équipe |
| State locking | DynamoDB (AWS), native (GCS, Azure) pour éviter les conflits |
| Encryption | Chiffrer le state au repos |
| Versioning | Activer le versioning S3 pour la récupération |
| Isolation | Un state par environnement (workspace ou répertoire séparé) |
| Least privilege | IAM restreint pour l'accès au state |
| No manual edit | Ne jamais éditer le state à la main |
| Regular backup | Sauvegarder régulièrement le state |
`,
    practiceContent: `# Travaux Pratiques : State et Gestion d'Infrastructure

## TP 1 : Comprendre le State

### Objectif
Explorer et manipuler le state Terraform.

### Étapes

\`\`\`bash
# 1. Créer une infrastructure simple
cat > main.tf << 'EOF'
terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}
provider "docker" {}

resource "docker_image" "nginx" {
  name = "nginx:alpine"
}

resource "docker_container" "web" {
  name  = "state-demo"
  image = docker_image.nginx.image_id
  ports {
    internal = 80
    external = 8080
  }
}
EOF

terraform init && terraform apply -auto-approve

# 2. Explorer le state
terraform state list
terraform state show docker_container.web
terraform show

# 3. Examiner le fichier state
cat terraform.tfstate | python3 -m json.tool | head -50

# 4. Manipuler le state
terraform state mv docker_container.web docker_container.web_server
# Mettre à jour main.tf pour matcher le nouveau nom

# 5. Retirer du state
terraform state rm docker_image.nginx
terraform state list
# L'image n'est plus gérée mais existe toujours

# 6. Re-importer
terraform import docker_image.nginx nginx:alpine
terraform state list
\`\`\`

## TP 2 : Workspaces

### Objectif
Utiliser les workspaces pour gérer plusieurs environnements.

### Étapes

\`\`\`hcl
# main.tf
variable "environment" {
  default = ""
}

locals {
  env = var.environment != "" ? var.environment : terraform.workspace
  
  config = {
    default = { port = 8080, name = "dev-app" }
    staging = { port = 8081, name = "staging-app" }
    prod    = { port = 8082, name = "prod-app" }
  }
  
  current = lookup(local.config, local.env, local.config["default"])
}

resource "docker_container" "app" {
  name  = local.current.name
  image = docker_image.nginx.image_id
  ports {
    internal = 80
    external = local.current.port
  }
}

output "url" {
  value = "http://localhost:\\\${local.current.port}"
}
\`\`\`

\`\`\`bash
# Créer et utiliser les workspaces
terraform workspace new staging
terraform apply -auto-approve
terraform output url

terraform workspace new prod
terraform apply -auto-approve
terraform output url

terraform workspace list
terraform workspace select default
\`\`\`

## TP 3 : Lifecycle et protection

### Objectif
Configurer les règles de lifecycle pour protéger les ressources.

### Étapes

\`\`\`hcl
resource "docker_container" "critical" {
  name  = "critical-service"
  image = docker_image.nginx.image_id
  
  ports {
    internal = 80
    external = 9090
  }
  
  lifecycle {
    # Empêcher la destruction accidentelle
    prevent_destroy = true
    
    # Ignorer les changements de labels
    ignore_changes = [
      labels,
    ]
  }
}

resource "docker_container" "replaceable" {
  name  = "replaceable-service"
  image = docker_image.nginx.image_id
  
  ports {
    internal = 80
    external = 9091
  }
  
  lifecycle {
    create_before_destroy = true
  }
}
\`\`\`

\`\`\`bash
terraform apply -auto-approve

# Tester prevent_destroy
terraform destroy  # Erreur !

# Tester create_before_destroy
# Modifier le port et observer l'ordre de recréation
\`\`\`

## TP 4 : Import de ressources existantes

### Objectif
Importer des ressources créées manuellement dans Terraform.

### Étapes

\`\`\`bash
# 1. Créer un container manuellement
docker run -d --name manual-container -p 7070:80 nginx:alpine

# 2. Écrire la configuration correspondante
cat > import.tf << 'EOF'
resource "docker_container" "imported" {
  name  = "manual-container"
  image = "nginx:alpine"
  ports {
    internal = 80
    external = 7070
  }
}
EOF

# 3. Importer
terraform import docker_container.imported manual-container

# 4. Vérifier
terraform state show docker_container.imported
terraform plan  # Ajuster la config jusqu'à plan vide
\`\`\`

## TP 5 : Gestion du drift et recovery

### Objectif
Détecter et résoudre les dérives de configuration.

### Étapes

\`\`\`bash
# 1. Déployer une infrastructure
terraform apply -auto-approve

# 2. Simuler un drift (modification hors Terraform)
docker stop state-demo
docker rename state-demo state-demo-renamed

# 3. Détecter le drift
terraform plan
# Terraform détecte que la ressource a changé

# 4. Refresh le state
terraform apply -refresh-only -auto-approve

# 5. Réconcilier
terraform apply -auto-approve
# Terraform recrée la ressource dans l'état désiré
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Le state (terraform.tfstate) fait le lien entre la configuration HCL et les ressources réelles',
      'Toujours utiliser un remote backend (S3+DynamoDB, GCS, Azure Blob) pour le travail en équipe',
      'Le state locking (DynamoDB) empêche les modifications concurrentes',
      'terraform state mv/rm/import pour manipuler le state lors de refactoring',
      'Les workspaces gèrent plusieurs environnements avec la même configuration',
      'lifecycle (prevent_destroy, ignore_changes, create_before_destroy) protège les ressources',
      'Les provisioners (local-exec, remote-exec) sont un dernier recours - préférer Ansible/cloud-init',
      'terraform plan -refresh-only détecte le drift entre le state et l\'infrastructure réelle'
    ]),
  },


  // ============================================================
  // TERRAFORM - Module 3: Modules et bonnes pratiques
  // ============================================================
  {
    id: 'tf-03',
    courseId: 'terraform',
    title: 'Modules et bonnes pratiques',
    duration: '4h',
    orderIndex: 3,
    videoUrl: 'https://www.youtube.com/watch?v=l5k1ai_GBDE',
    theoryContent: `# Modules Terraform et Bonnes Pratiques

## 1. Introduction aux Modules

Un module Terraform est un ensemble de fichiers \\\`.tf\\\` dans un répertoire. Tout répertoire avec du code Terraform est un module. Les modules permettent :
- **Réutilisation** : écrire une fois, utiliser partout
- **Encapsulation** : cacher la complexité
- **Composition** : assembler des briques
- **Versionnement** : contrôler les changements

### Structure d'un module

\`\`\`
modules/
  vpc/
    main.tf          # Ressources principales
    variables.tf     # Variables d'entrée
    outputs.tf       # Valeurs de sortie
    versions.tf      # Contraintes de providers
    README.md        # Documentation
    examples/        # Exemples d'utilisation
      simple/
        main.tf
      complete/
        main.tf
    tests/           # Tests du module
      vpc_test.go
\`\`\`

## 2. Écrire un module

### Module VPC exemple

\`\`\`hcl
# modules/vpc/variables.tf
variable "name" {
  description = "Name of the VPC"
  type        = string
}

variable "cidr_block" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
  
  validation {
    condition     = can(cidrhost(var.cidr_block, 0))
    error_message = "Must be a valid CIDR block."
  }
}

variable "public_subnets" {
  description = "List of public subnet CIDR blocks"
  type        = list(string)
  default     = []
}

variable "private_subnets" {
  description = "List of private subnet CIDR blocks"
  type        = list(string)
  default     = []
}

variable "availability_zones" {
  description = "List of availability zones"
  type        = list(string)
}

variable "enable_nat_gateway" {
  description = "Enable NAT Gateway for private subnets"
  type        = bool
  default     = true
}

variable "tags" {
  description = "Additional tags"
  type        = map(string)
  default     = {}
}
\`\`\`

\`\`\`hcl
# modules/vpc/main.tf
resource "aws_vpc" "this" {
  cidr_block           = var.cidr_block
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  tags = merge(var.tags, {
    Name = var.name
  })
}

resource "aws_subnet" "public" {
  count = length(var.public_subnets)
  
  vpc_id                  = aws_vpc.this.id
  cidr_block              = var.public_subnets[count.index]
  availability_zone       = var.availability_zones[count.index % length(var.availability_zones)]
  map_public_ip_on_launch = true
  
  tags = merge(var.tags, {
    Name = "\\\${var.name}-public-\\\${count.index + 1}"
    Type = "public"
  })
}

resource "aws_subnet" "private" {
  count = length(var.private_subnets)
  
  vpc_id            = aws_vpc.this.id
  cidr_block        = var.private_subnets[count.index]
  availability_zone = var.availability_zones[count.index % length(var.availability_zones)]
  
  tags = merge(var.tags, {
    Name = "\\\${var.name}-private-\\\${count.index + 1}"
    Type = "private"
  })
}

resource "aws_internet_gateway" "this" {
  count  = length(var.public_subnets) > 0 ? 1 : 0
  vpc_id = aws_vpc.this.id
  
  tags = merge(var.tags, {
    Name = "\\\${var.name}-igw"
  })
}

resource "aws_nat_gateway" "this" {
  count = var.enable_nat_gateway && length(var.private_subnets) > 0 ? 1 : 0
  
  allocation_id = aws_eip.nat[0].id
  subnet_id     = aws_subnet.public[0].id
  
  tags = merge(var.tags, {
    Name = "\\\${var.name}-nat"
  })
}

resource "aws_eip" "nat" {
  count  = var.enable_nat_gateway && length(var.private_subnets) > 0 ? 1 : 0
  domain = "vpc"
}
\`\`\`

\`\`\`hcl
# modules/vpc/outputs.tf
output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.this.id
}

output "vpc_cidr" {
  description = "CIDR block of the VPC"
  value       = aws_vpc.this.cidr_block
}

output "public_subnet_ids" {
  description = "List of public subnet IDs"
  value       = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  description = "List of private subnet IDs"
  value       = aws_subnet.private[*].id
}

output "nat_gateway_ip" {
  description = "Public IP of the NAT Gateway"
  value       = var.enable_nat_gateway ? aws_eip.nat[0].public_ip : null
}
\`\`\`

## 3. Utiliser un module

### Module local

\`\`\`hcl
# main.tf (root module)
module "vpc" {
  source = "./modules/vpc"
  
  name               = "production"
  cidr_block         = "10.0.0.0/16"
  availability_zones = ["eu-west-1a", "eu-west-1b", "eu-west-1c"]
  public_subnets     = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  private_subnets    = ["10.0.10.0/24", "10.0.11.0/24", "10.0.12.0/24"]
  enable_nat_gateway = true
  
  tags = local.common_tags
}

# Utiliser les outputs du module
resource "aws_instance" "web" {
  subnet_id = module.vpc.public_subnet_ids[0]
  vpc_security_group_ids = [aws_security_group.web.id]
}
\`\`\`

### Module du registry

\`\`\`hcl
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.1.0"
  
  name = "production-vpc"
  cidr = "10.0.0.0/16"
  
  azs             = ["eu-west-1a", "eu-west-1b", "eu-west-1c"]
  public_subnets  = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  private_subnets = ["10.0.10.0/24", "10.0.11.0/24", "10.0.12.0/24"]
  
  enable_nat_gateway = true
  single_nat_gateway = true
}
\`\`\`

### Module Git

\`\`\`hcl
module "vpc" {
  source = "git::https://github.com/org/terraform-modules.git//vpc?ref=v1.2.0"
}

module "vpc" {
  source = "git::ssh://git@github.com/org/terraform-modules.git//vpc?ref=main"
}
\`\`\`

## 4. Patterns de composition

### Environnements séparés par répertoires

\`\`\`
infrastructure/
  modules/
    vpc/
    ecs/
    rds/
  environments/
    dev/
      main.tf       # Utilise les modules avec des valeurs dev
      terraform.tfvars
      backend.tf
    staging/
      main.tf
      terraform.tfvars
      backend.tf
    production/
      main.tf
      terraform.tfvars
      backend.tf
\`\`\`

### Environnements avec workspaces + tfvars

\`\`\`
infrastructure/
  modules/
  main.tf
  variables.tf
  outputs.tf
  envs/
    dev.tfvars
    staging.tfvars
    production.tfvars
\`\`\`

\`\`\`bash
terraform workspace select dev
terraform apply -var-file=envs/dev.tfvars
\`\`\`

## 5. CI/CD avec Terraform

### GitHub Actions

\`\`\`yaml
# .github/workflows/terraform.yml
name: Terraform
on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

permissions:
  contents: read
  pull-requests: write

jobs:
  terraform:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: "1.6.0"
      
      - name: Terraform Init
        run: terraform init
      
      - name: Terraform Format
        run: terraform fmt -check
      
      - name: Terraform Validate
        run: terraform validate
      
      - name: Terraform Plan
        id: plan
        run: terraform plan -no-color -out=tfplan
        continue-on-error: true
      
      - name: Comment PR with Plan
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            const plan = \\\`\\\${{ steps.plan.outputs.stdout }}\\\`;
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '## Terraform Plan\\n\\\`\\\`\\\`\\n' + plan + '\\n\\\`\\\`\\\`'
            });
      
      - name: Terraform Apply
        if: github.ref == 'refs/heads/main' && github.event_name == 'push'
        run: terraform apply -auto-approve tfplan
\`\`\`

### GitLab CI

\`\`\`yaml
# .gitlab-ci.yml
stages:
  - validate
  - plan
  - apply

variables:
  TF_ROOT: infrastructure/

validate:
  stage: validate
  image: hashicorp/terraform:1.6
  script:
    - cd \\\${TF_ROOT}
    - terraform init -backend=false
    - terraform fmt -check
    - terraform validate

plan:
  stage: plan
  image: hashicorp/terraform:1.6
  script:
    - cd \\\${TF_ROOT}
    - terraform init
    - terraform plan -out=plan.tfplan
  artifacts:
    paths:
      - \\\${TF_ROOT}/plan.tfplan

apply:
  stage: apply
  image: hashicorp/terraform:1.6
  script:
    - cd \\\${TF_ROOT}
    - terraform init
    - terraform apply plan.tfplan
  when: manual
  only:
    - main
\`\`\`

### Atlantis (GitOps pour Terraform)

\`\`\`yaml
# atlantis.yaml
version: 3
projects:
  - name: infrastructure-prod
    dir: infrastructure/environments/production
    workspace: default
    autoplan:
      when_modified: ["*.tf", "../modules/**/*.tf"]
      enabled: true
    apply_requirements: [approved, mergeable]
\`\`\`

## 6. Testing Terraform

### terraform test (natif, Terraform 1.6+)

\`\`\`hcl
# tests/vpc.tftest.hcl
run "vpc_creation" {
  command = apply
  
  variables {
    name       = "test-vpc"
    cidr_block = "10.0.0.0/16"
  }
  
  assert {
    condition     = aws_vpc.this.cidr_block == "10.0.0.0/16"
    error_message = "VPC CIDR block is incorrect"
  }
  
  assert {
    condition     = aws_vpc.this.enable_dns_hostnames == true
    error_message = "DNS hostnames should be enabled"
  }
}
\`\`\`

### Terratest (Go)

\`\`\`go
// tests/vpc_test.go
package test

import (
    "testing"
    "github.com/gruntwork-io/terratest/modules/terraform"
    "github.com/stretchr/testify/assert"
)

func TestVPC(t *testing.T) {
    opts := &terraform.Options{
        TerraformDir: "../modules/vpc",
        Vars: map[string]interface{}{
            "name":       "test-vpc",
            "cidr_block": "10.0.0.0/16",
        },
    }
    defer terraform.Destroy(t, opts)
    terraform.InitAndApply(t, opts)
    
    vpcId := terraform.Output(t, opts, "vpc_id")
    assert.NotEmpty(t, vpcId)
}
\`\`\`

## 7. Sécurité

### tfsec

\`\`\`bash
# Scanner les vulnérabilités
tfsec .
tfsec . --format json
tfsec . --minimum-severity HIGH
\`\`\`

### Checkov

\`\`\`bash
checkov -d .
checkov -f main.tf
checkov --framework terraform --check CKV_AWS_79
\`\`\`

### Sentinel (Terraform Enterprise/Cloud)

\`\`\`hcl
# restrict-instance-types.sentinel
import "tfplan/v2" as tfplan

main = rule {
  all tfplan.resource_changes as _, rc {
    rc.type is "aws_instance" implies
    rc.change.after.instance_type in ["t3.micro", "t3.small", "t3.medium"]
  }
}
\`\`\`

## 8. Structure de projet recommandée

\`\`\`
terraform-infrastructure/
  modules/                    # Modules réutilisables
    networking/
      vpc/
      security-groups/
    compute/
      ecs/
      ec2/
    data/
      rds/
      elasticache/
  
  environments/               # Configurations par environnement
    dev/
      main.tf
      variables.tf
      outputs.tf
      backend.tf
      dev.tfvars
    staging/
    production/
  
  scripts/                    # Scripts utilitaires
    bootstrap-backend.sh
    import-resources.sh
  
  .github/workflows/          # CI/CD
    terraform-plan.yml
    terraform-apply.yml
  
  .tflint.hcl                # Linting
  .pre-commit-config.yaml    # Pre-commit hooks
  Makefile                    # Commandes simplifiées
\`\`\`

### Makefile utile

\`\`\`makefile
ENV ?= dev

init:
	cd environments/$(ENV) && terraform init

plan:
	cd environments/$(ENV) && terraform plan -var-file=$(ENV).tfvars

apply:
	cd environments/$(ENV) && terraform apply -var-file=$(ENV).tfvars

destroy:
	cd environments/$(ENV) && terraform destroy -var-file=$(ENV).tfvars

fmt:
	terraform fmt -recursive

validate:
	@for dir in environments/*/; do \\
		echo "Validating $$dir..."; \\
		cd $$dir && terraform init -backend=false && terraform validate && cd ../..; \\
	done

lint:
	tflint --recursive
	tfsec .
\`\`\`
`,
    practiceContent: `# Travaux Pratiques : Modules et Bonnes Pratiques

## TP 1 : Créer un module réutilisable

### Objectif
Écrire un module Docker container réutilisable.

### Étapes

\`\`\`bash
# 1. Créer la structure
mkdir -p modules/docker-service
\`\`\`

\`\`\`hcl
# modules/docker-service/variables.tf
variable "name" {
  description = "Name of the service"
  type        = string
}
variable "image" {
  description = "Docker image"
  type        = string
}
variable "internal_port" {
  description = "Internal container port"
  type        = number
}
variable "external_port" {
  description = "External host port"
  type        = number
}
variable "environment" {
  description = "Environment variables"
  type        = map(string)
  default     = {}
}

# modules/docker-service/main.tf
resource "docker_image" "this" {
  name = var.image
}
resource "docker_container" "this" {
  name  = var.name
  image = docker_image.this.image_id
  ports {
    internal = var.internal_port
    external = var.external_port
  }
  dynamic "env" {
    for_each = var.environment
    content {
      // Use env.key and env.value
    }
  }
}

# modules/docker-service/outputs.tf
output "container_id" {
  value = docker_container.this.id
}
output "url" {
  value = "http://localhost:\\\${var.external_port}"
}
\`\`\`

\`\`\`hcl
# main.tf (root)
module "web" {
  source        = "./modules/docker-service"
  name          = "web-service"
  image         = "nginx:alpine"
  internal_port = 80
  external_port = 8080
}

module "api" {
  source        = "./modules/docker-service"
  name          = "api-service"
  image         = "hashicorp/http-echo"
  internal_port = 5678
  external_port = 5678
  environment = {
    ECHO_TEXT = "Hello from API"
  }
}

output "services" {
  value = {
    web = module.web.url
    api = module.api.url
  }
}
\`\`\`

\`\`\`bash
terraform init
terraform apply -auto-approve
terraform output services
\`\`\`

## TP 2 : Multi-environnement

### Objectif
Gérer dev/staging/prod avec des configurations distinctes.

### Étapes

\`\`\`bash
mkdir -p envs
\`\`\`

\`\`\`hcl
# envs/dev.tfvars
environment    = "dev"
replicas       = 1
external_port  = 8080

# envs/staging.tfvars
environment    = "staging"
replicas       = 2
external_port  = 8081

# envs/prod.tfvars
environment    = "prod"
replicas       = 3
external_port  = 8082
\`\`\`

\`\`\`bash
# Déployer chaque environnement
terraform workspace new dev && terraform apply -var-file=envs/dev.tfvars -auto-approve
terraform workspace new staging && terraform apply -var-file=envs/staging.tfvars -auto-approve
terraform workspace new prod && terraform apply -var-file=envs/prod.tfvars -auto-approve

# Vérifier
terraform workspace list
terraform workspace select dev && terraform output
\`\`\`

## TP 3 : Validation et linting

### Objectif
Mettre en place le contrôle qualité du code Terraform.

### Étapes

\`\`\`bash
# 1. Vérifier le formatage
terraform fmt -check -recursive
terraform fmt -recursive  # Auto-fix

# 2. Valider la syntaxe
terraform validate

# 3. Générer le graphe de dépendances
terraform graph | dot -Tpng > graph.png

# 4. Pré-commit hooks
cat > .pre-commit-config.yaml << 'EOF'
repos:
  - repo: https://github.com/antonbabenko/pre-commit-terraform
    rev: v1.83.0
    hooks:
      - id: terraform_fmt
      - id: terraform_validate
      - id: terraform_tflint
      - id: terraform_docs
EOF
\`\`\`

## TP 4 : CI/CD Pipeline

### Objectif
Automatiser Terraform dans un pipeline CI/CD.

### Étapes

\`\`\`yaml
# .github/workflows/terraform.yml
name: Terraform CI
on: [push, pull_request]
jobs:
  terraform:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3
      - run: terraform init
      - run: terraform fmt -check
      - run: terraform validate
      - run: terraform plan -no-color
\`\`\`

\`\`\`bash
# Simuler localement
terraform init
terraform fmt -check && echo "Format OK" || echo "Format FAIL"
terraform validate && echo "Valid" || echo "Invalid"
terraform plan -detailed-exitcode  # Exit 2 = changes pending
\`\`\`

## TP 5 : Documentation automatique

### Objectif
Générer automatiquement la documentation des modules.

### Étapes

\`\`\`bash
# Installer terraform-docs
go install github.com/terraform-docs/terraform-docs@latest

# Générer le README
terraform-docs markdown table modules/docker-service > modules/docker-service/README.md

# Ou injecter dans un README existant
terraform-docs markdown table --output-file README.md --output-mode inject modules/docker-service

# Configuration .terraform-docs.yml
cat > .terraform-docs.yml << 'EOF'
formatter: "markdown table"
output:
  file: "README.md"
  mode: inject
sort:
  enabled: true
  by: required
EOF
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Un module Terraform est un répertoire avec variables.tf (inputs), main.tf (resources), outputs.tf (outputs)',
      'Les modules du Terraform Registry sont versionnés et maintenus par la communauté',
      'La composition de modules permet de construire des infrastructures complexes réutilisables',
      'Séparer les environnements par répertoires (recommandé) ou par workspaces',
      'CI/CD avec GitHub Actions ou GitLab CI : fmt → validate → plan → apply (avec approbation)',
      'terraform test (natif 1.6+) et Terratest (Go) pour tester les modules',
      'tfsec et Checkov scannent le code Terraform pour les problèmes de sécurité',
      'Structure projet : modules/ réutilisables + environments/ par déploiement + scripts/ utilitaires'
    ]),
  },


  // ============================================================
  // ANSIBLE - Module 1: Introduction et installation
  // ============================================================
  {
    id: 'ans-01',
    courseId: 'ansible',
    title: 'Introduction et installation Ansible',
    duration: '4h',
    orderIndex: 1,
    videoUrl: 'https://www.youtube.com/watch?v=1id6ERvfozo',
    theoryContent: `# Introduction et Installation d'Ansible

## 1. Histoire et Contexte

Ansible a été créé par Michael DeHaan en 2012 et acquis par Red Hat en 2015. Son nom vient du roman de science-fiction "Ender's Game" où un "ansible" permet la communication instantanée à travers l'espace.

### Philosophie d'Ansible

- **Agentless** : pas d'agent à installer sur les machines cibles, utilise SSH
- **Idempotent** : appliquer la même configuration plusieurs fois donne le même résultat
- **Déclaratif** : décrit l'état désiré, pas les étapes
- **Simple** : YAML pour la configuration, courbe d'apprentissage faible
- **Extensible** : modules, plugins, collections

### Architecture

\`\`\`
+--------------------------------------------------+
|              ARCHITECTURE ANSIBLE                 |
+--------------------------------------------------+
|                                                  |
|  +------------------+                            |
|  |  CONTROL NODE    |  (machine où Ansible      |
|  |                  |   est installé)            |
|  |  - ansible.cfg   |                            |
|  |  - inventory     |                            |
|  |  - playbooks     |                            |
|  |  - roles         |                            |
|  +--------+---------+                            |
|           |                                      |
|           | SSH (Linux) / WinRM (Windows)         |
|           |                                      |
|  +--------v---------+  +------------------+      |
|  |  MANAGED NODE 1  |  |  MANAGED NODE 2  |     |
|  |  (web server)    |  |  (db server)     |     |
|  |  - No agent      |  |  - No agent      |     |
|  |  - Python requis |  |  - Python requis |     |
|  +------------------+  +------------------+      |
|                                                  |
|  +------------------+  +------------------+      |
|  |  MANAGED NODE 3  |  |  MANAGED NODE 4  |     |
|  |  (cache server)  |  |  (monitoring)    |     |
|  +------------------+  +------------------+      |
+--------------------------------------------------+
\`\`\`

## 2. Installation

### Installation via pip (recommandé)

\`\`\`bash
# Installer pip si nécessaire
sudo apt-get update && sudo apt-get install -y python3-pip

# Installer Ansible
pip3 install ansible
pip3 install ansible-core  # Version minimale sans collections

# Vérifier l'installation
ansible --version
ansible-community --version

# Mettre à jour
pip3 install --upgrade ansible
\`\`\`

### Installation via apt (Ubuntu/Debian)

\`\`\`bash
# Ajouter le PPA officiel
sudo apt-add-repository ppa:ansible/ansible
sudo apt-get update
sudo apt-get install -y ansible

# Vérifier
ansible --version
\`\`\`

### Installation via yum (CentOS/RHEL)

\`\`\`bash
# RHEL/CentOS 8+
sudo dnf install -y ansible-core

# CentOS 7
sudo yum install -y epel-release
sudo yum install -y ansible

# Vérifier
ansible --version
\`\`\`

## 3. Configuration (ansible.cfg)

### Ordre de précédence

1. Variable d'environnement ANSIBLE_CONFIG
2. \\\`./ansible.cfg\\\` (répertoire courant)
3. \\\`~/.ansible.cfg\\\` (home directory)
4. \\\`/etc/ansible/ansible.cfg\\\` (global)

### Configuration recommandée

\`\`\`ini
# ansible.cfg
[defaults]
# Inventory par défaut
inventory = ./inventory

# Désactiver la vérification des host keys (dev uniquement)
host_key_checking = False

# Utilisateur SSH par défaut
remote_user = ubuntu

# Fichier de logs
log_path = ./ansible.log

# Nombre de forks (parallélisme)
forks = 20

# Timeout de connexion
timeout = 30

# Répertoire des roles
roles_path = ./roles:~/.ansible/roles

# Module par défaut pour les commandes ad-hoc
module_name = command

# Callback plugins pour la sortie
stdout_callback = yaml
# Autres options : debug, json, minimal

# Fact caching
gathering = smart
fact_caching = jsonfile
fact_caching_connection = /tmp/ansible_facts
fact_caching_timeout = 3600

# Retry files
retry_files_enabled = False

# Pipelining (performance)
[ssh_connection]
pipelining = True
ssh_args = -o ControlMaster=auto -o ControlPersist=60s

# Privilege escalation
[privilege_escalation]
become = True
become_method = sudo
become_user = root
become_ask_pass = False
\`\`\`

## 4. Inventory

### Inventaire statique INI

\`\`\`ini
# inventory/hosts.ini

# Hôtes individuels
web1.example.com
web2.example.com ansible_host=192.168.1.10

# Groupe de serveurs web
[webservers]
web1.example.com
web2.example.com
web3.example.com

# Groupe de bases de données
[databases]
db1.example.com ansible_port=2222
db2.example.com

# Groupe de cache
[cache]
redis1.example.com
redis2.example.com

# Groupe parent (enfants)
[production:children]
webservers
databases
cache

# Variables de groupe
[webservers:vars]
ansible_user=deploy
http_port=80
max_clients=200

[databases:vars]
ansible_user=dbadmin
db_port=5432

# Variables d'hôte
[all:vars]
ansible_python_interpreter=/usr/bin/python3
ansible_ssh_private_key_file=~/.ssh/deploy_key
\`\`\`

### Inventaire statique YAML

\`\`\`yaml
# inventory/hosts.yml
all:
  vars:
    ansible_python_interpreter: /usr/bin/python3
  children:
    webservers:
      hosts:
        web1.example.com:
          ansible_host: 192.168.1.10
          http_port: 80
        web2.example.com:
          ansible_host: 192.168.1.11
      vars:
        ansible_user: deploy
        nginx_version: "1.25"
    
    databases:
      hosts:
        db1.example.com:
          ansible_host: 192.168.1.20
          replication_role: primary
        db2.example.com:
          ansible_host: 192.168.1.21
          replication_role: replica
      vars:
        ansible_user: dbadmin
        postgres_version: "15"
    
    production:
      children:
        webservers:
        databases:
\`\`\`

### Inventaire dynamique

\`\`\`bash
# AWS EC2
pip3 install boto3
# Utiliser le plugin aws_ec2
# inventory/aws_ec2.yml
plugin: amazon.aws.aws_ec2
regions:
  - eu-west-1
filters:
  tag:Environment: production
keyed_groups:
  - key: tags.Role
    prefix: role
  - key: placement.availability_zone
    prefix: az
\`\`\`

### host_vars et group_vars

\`\`\`
inventory/
  hosts.yml
  group_vars/
    all.yml           # Variables pour tous les hôtes
    webservers.yml    # Variables du groupe webservers
    databases.yml     # Variables du groupe databases
  host_vars/
    web1.example.com.yml  # Variables spécifiques à web1
    db1.example.com.yml
\`\`\`

\`\`\`yaml
# group_vars/webservers.yml
nginx_worker_processes: auto
nginx_worker_connections: 1024
ssl_certificate: /etc/ssl/certs/app.crt
ssl_key: /etc/ssl/private/app.key

# host_vars/web1.example.com.yml
is_primary: true
custom_port: 8080
\`\`\`

## 5. Commandes Ad-hoc

Les commandes ad-hoc exécutent une tâche simple sur un ou plusieurs hôtes :

\`\`\`bash
# Syntaxe : ansible <pattern> -m <module> -a "<arguments>"

# Ping tous les hôtes (vérifie la connectivité)
ansible all -m ping
ansible webservers -m ping

# Module shell (exécute une commande shell)
ansible all -m shell -a "uptime"
ansible all -m shell -a "df -h"
ansible all -m shell -a "free -m"

# Module command (pas de shell, plus sécurisé)
ansible all -m command -a "hostname"
ansible all -m command -a "cat /etc/os-release"

# Module copy (copier un fichier)
ansible webservers -m copy -a "src=./nginx.conf dest=/etc/nginx/nginx.conf owner=root mode=0644"

# Module file (gérer fichiers et répertoires)
ansible all -m file -a "path=/opt/app state=directory mode=0755"
ansible all -m file -a "path=/tmp/test.txt state=absent"

# Module apt (gestion de paquets Debian/Ubuntu)
ansible webservers -m apt -a "name=nginx state=present update_cache=yes" --become
ansible webservers -m apt -a "name=nginx state=latest" --become
ansible webservers -m apt -a "name=nginx state=absent" --become

# Module yum (gestion de paquets RHEL/CentOS)
ansible databases -m yum -a "name=postgresql15-server state=present" --become

# Module service (gérer les services)
ansible webservers -m service -a "name=nginx state=started enabled=yes" --become
ansible webservers -m service -a "name=nginx state=restarted" --become

# Module user (gérer les utilisateurs)
ansible all -m user -a "name=deploy state=present groups=sudo shell=/bin/bash" --become

# Module git (cloner un dépôt)
ansible webservers -m git -a "repo=https://github.com/org/app.git dest=/opt/app version=main"

# Options courantes
ansible all -m ping -i custom_inventory.ini  # Inventory spécifique
ansible all -m ping --limit web1.example.com # Limiter à un hôte
ansible all -m ping -u admin                 # Utilisateur spécifique
ansible all -m apt -a "..." --become         # Sudo
ansible all -m ping -k                       # Demander le mot de passe SSH
ansible all -m ping -K                       # Demander le mot de passe sudo
ansible all -m ping -v                       # Verbose (-vvv pour plus)
ansible all -m ping --check                  # Dry run (check mode)
ansible all -m setup                         # Collecter les facts
ansible all -m setup -a "filter=ansible_os_family"  # Facts filtrés
\`\`\`

## 6. Types de connexion

### SSH (défaut pour Linux)

\`\`\`ini
[webservers]
web1.example.com ansible_connection=ssh ansible_ssh_private_key_file=~/.ssh/id_rsa
\`\`\`

### Local (exécution sur le control node)

\`\`\`ini
[local]
localhost ansible_connection=local
\`\`\`

### WinRM (Windows)

\`\`\`ini
[windows]
win1.example.com ansible_connection=winrm ansible_winrm_transport=ntlm
\`\`\`

\`\`\`yaml
# group_vars/windows.yml
ansible_user: Administrator
ansible_password: "{{ vault_win_password }}"
ansible_port: 5986
ansible_connection: winrm
ansible_winrm_server_cert_validation: ignore
\`\`\`

## 7. Facts Ansible

Les facts sont des informations collectées automatiquement sur les hôtes :

\`\`\`bash
# Collecter tous les facts
ansible web1.example.com -m setup

# Facts utiles
ansible all -m setup -a "filter=ansible_distribution*"
ansible all -m setup -a "filter=ansible_memory_mb"
ansible all -m setup -a "filter=ansible_processor*"
ansible all -m setup -a "filter=ansible_default_ipv4"
\`\`\`

Facts courants :
- \\\`ansible_hostname\\\` : nom d'hôte
- \\\`ansible_os_family\\\` : Debian, RedHat, etc.
- \\\`ansible_distribution\\\` : Ubuntu, CentOS, etc.
- \\\`ansible_distribution_version\\\` : 22.04, 8, etc.
- \\\`ansible_default_ipv4.address\\\` : adresse IP
- \\\`ansible_memtotal_mb\\\` : mémoire totale
- \\\`ansible_processor_vcpus\\\` : nombre de vCPUs
- \\\`ansible_env\\\` : variables d'environnement

## 8. Troubleshooting

| Problème | Solution |
|----------|----------|
| Permission denied (SSH) | Vérifier la clé SSH, ssh-agent, ansible_user |
| Host unreachable | Vérifier le réseau, firewall, port SSH |
| Module not found | ansible-galaxy collection install ... |
| Python not found | Configurer ansible_python_interpreter |
| Sudo password required | --become-ask-pass ou NOPASSWD dans sudoers |
| Host key verification | host_key_checking = False ou ssh-keyscan |
| Timeout | Augmenter timeout dans ansible.cfg |
| Encoding issues | Configurer LANG=en_US.UTF-8 |
`,
    practiceContent: `# Travaux Pratiques : Introduction et Installation Ansible

## TP 1 : Installation et configuration

### Objectif
Installer Ansible et configurer l'environnement de travail.

### Étapes

\`\`\`bash
# 1. Installer Ansible
pip3 install ansible

# 2. Vérifier l'installation
ansible --version
ansible-galaxy --version
ansible-playbook --version

# 3. Créer la structure de projet
mkdir -p ansible-tp/{inventory,roles,group_vars,host_vars}
cd ansible-tp

# 4. Créer ansible.cfg
cat > ansible.cfg << 'EOF'
[defaults]
inventory = ./inventory/hosts.yml
host_key_checking = False
remote_user = ubuntu
stdout_callback = yaml
retry_files_enabled = False

[privilege_escalation]
become = True
become_method = sudo
EOF

# 5. Créer l'inventaire
cat > inventory/hosts.yml << 'EOF'
all:
  hosts:
    localhost:
      ansible_connection: local
  children:
    local:
      hosts:
        localhost:
EOF

# 6. Tester la connectivité
ansible all -m ping
ansible localhost -m setup | head -50
\`\`\`

## TP 2 : Commandes Ad-hoc

### Objectif
Maîtriser les commandes ad-hoc pour des actions rapides.

### Étapes

\`\`\`bash
# 1. Informations système
ansible localhost -m setup -a "filter=ansible_distribution*"
ansible localhost -m setup -a "filter=ansible_memory_mb"

# 2. Gestion de fichiers
ansible localhost -m file -a "path=/tmp/ansible-test state=directory mode=0755"
ansible localhost -m copy -a "content='Hello Ansible!' dest=/tmp/ansible-test/hello.txt"
ansible localhost -m file -a "path=/tmp/ansible-test/link src=/tmp/ansible-test/hello.txt state=link"

# 3. Exécuter des commandes
ansible localhost -m shell -a "cat /tmp/ansible-test/hello.txt"
ansible localhost -m command -a "ls -la /tmp/ansible-test/"

# 4. Gestion de paquets (si sudo disponible)
ansible localhost -m apt -a "name=tree state=present" --become
ansible localhost -m shell -a "tree /tmp/ansible-test"

# 5. Nettoyer
ansible localhost -m file -a "path=/tmp/ansible-test state=absent"
\`\`\`

## TP 3 : Inventaire avancé

### Objectif
Créer un inventaire structuré avec variables de groupe et d'hôte.

### Étapes

\`\`\`yaml
# inventory/hosts.yml
all:
  vars:
    ansible_connection: local
    app_name: formation-devops
  children:
    webservers:
      hosts:
        web-local:
          ansible_host: localhost
          http_port: 8080
      vars:
        server_role: web
        nginx_version: "1.25"
    
    databases:
      hosts:
        db-local:
          ansible_host: localhost
          db_port: 5432
      vars:
        server_role: database
        postgres_version: "15"
    
    production:
      children:
        webservers:
        databases:
      vars:
        environment: production
\`\`\`

\`\`\`yaml
# group_vars/all.yml
common_packages:
  - curl
  - wget
  - vim
  - htop
ntp_server: pool.ntp.org
\`\`\`

\`\`\`bash
# Vérifier l'inventaire
ansible-inventory --list
ansible-inventory --graph
ansible-inventory --host web-local
\`\`\`

## TP 4 : Premier playbook simple

### Objectif
Écrire et exécuter un premier playbook.

### Étapes

\`\`\`yaml
# playbooks/setup.yml
---
- name: Configuration initiale du serveur
  hosts: localhost
  connection: local
  
  vars:
    app_directory: /tmp/myapp
    app_user: "{{ ansible_user_id }}"
  
  tasks:
    - name: Afficher les informations du système
      debug:
        msg: "OS: {{ ansible_distribution }} {{ ansible_distribution_version }}"
    
    - name: Créer le répertoire de l'application
      file:
        path: "{{ app_directory }}"
        state: directory
        mode: '0755'
    
    - name: Créer un fichier de configuration
      copy:
        content: |
          # Application Configuration
          APP_NAME={{ app_name | default('myapp') }}
          ENVIRONMENT={{ environment | default('development') }}
          PORT=3000
        dest: "{{ app_directory }}/config.env"
        mode: '0644'
    
    - name: Vérifier que le fichier existe
      stat:
        path: "{{ app_directory }}/config.env"
      register: config_file
    
    - name: Afficher le résultat
      debug:
        msg: "Config créée: {{ config_file.stat.exists }}, taille: {{ config_file.stat.size }} bytes"
\`\`\`

\`\`\`bash
# Exécuter le playbook
ansible-playbook playbooks/setup.yml

# Mode check (dry run)
ansible-playbook playbooks/setup.yml --check

# Verbose
ansible-playbook playbooks/setup.yml -v
\`\`\`

## TP 5 : Facts et conditions

### Objectif
Utiliser les facts pour des tâches conditionnelles.

### Étapes

\`\`\`yaml
# playbooks/conditional.yml
---
- name: Tâches conditionnelles basées sur les facts
  hosts: localhost
  connection: local
  
  tasks:
    - name: Afficher l'OS
      debug:
        msg: "Système: {{ ansible_os_family }}"
    
    - name: Tâche pour Debian/Ubuntu
      debug:
        msg: "Ceci est un système Debian/Ubuntu"
      when: ansible_os_family == "Debian"
    
    - name: Tâche pour RedHat/CentOS
      debug:
        msg: "Ceci est un système RedHat"
      when: ansible_os_family == "RedHat"
    
    - name: Vérifier la mémoire
      debug:
        msg: "ATTENTION: Mémoire faible ({{ ansible_memtotal_mb }}MB)"
      when: ansible_memtotal_mb < 2048
    
    - name: Vérifier l'espace disque
      shell: df -h / | awk 'NR==2 {print $5}' | tr -d '%'
      register: disk_usage
      changed_when: false
    
    - name: Alerte espace disque
      debug:
        msg: "Espace disque: {{ disk_usage.stdout }}% utilisé"
      when: disk_usage.stdout | int > 80
\`\`\`

\`\`\`bash
ansible-playbook playbooks/conditional.yml -v
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Ansible est agentless : il utilise SSH pour se connecter aux machines cibles sans installer d\'agent',
      'L\'architecture comprend un Control Node (avec Ansible installé) et des Managed Nodes (cibles)',
      'ansible.cfg configure le comportement global (inventory, user, forks, callbacks)',
      'L\'inventaire (INI ou YAML) définit les hôtes, groupes, et variables (group_vars, host_vars)',
      'Les commandes ad-hoc (ansible <pattern> -m <module> -a "<args>") exécutent des tâches rapides',
      'Modules essentiels : ping, shell, command, copy, file, apt, yum, service, user, git',
      'Les facts (ansible_* variables) collectent automatiquement les informations des hôtes',
      'L\'idempotence garantit que l\'exécution répétée produit toujours le même état final'
    ]),
  },


  // ============================================================
  // ANSIBLE - Module 2: Playbooks et modules avancés
  // ============================================================
  {
    id: 'ans-02',
    courseId: 'ansible',
    title: 'Playbooks et modules avancés',
    duration: '4h',
    orderIndex: 2,
    videoUrl: 'https://www.youtube.com/watch?v=ZAdJ7CdN7DY',
    theoryContent: `# Playbooks et Modules Avancés Ansible

## 1. Structure d'un Playbook

Un playbook est un fichier YAML contenant une ou plusieurs "plays". Chaque play cible un groupe d'hôtes avec des tâches ordonnées.

\`\`\`yaml
---
# Un playbook peut contenir plusieurs plays
- name: Configuration des serveurs web
  hosts: webservers
  become: yes
  gather_facts: yes
  
  vars:
    http_port: 80
    max_clients: 200
  
  vars_files:
    - vars/common.yml
    - vars/secrets.yml
  
  pre_tasks:
    - name: Mise à jour du cache apt
      apt:
        update_cache: yes
        cache_valid_time: 3600
  
  roles:
    - common
    - nginx
  
  tasks:
    - name: Installer les paquets
      apt:
        name: "{{ item }}"
        state: present
      loop:
        - nginx
        - certbot
    
    - name: Configurer Nginx
      template:
        src: nginx.conf.j2
        dest: /etc/nginx/nginx.conf
      notify: Restart Nginx
  
  post_tasks:
    - name: Vérifier que Nginx répond
      uri:
        url: "http://localhost:{{ http_port }}"
        status_code: 200
  
  handlers:
    - name: Restart Nginx
      service:
        name: nginx
        state: restarted

- name: Configuration des bases de données
  hosts: databases
  become: yes
  tasks:
    - name: Installer PostgreSQL
      apt:
        name: postgresql-15
        state: present
\`\`\`

## 2. Variables et précédence

### Ordre de précédence (du plus faible au plus fort)

1. Defaults de role (role/defaults/main.yml)
2. Inventory file variables
3. Inventory group_vars/all
4. Playbook group_vars/all
5. Inventory group_vars/*
6. Playbook group_vars/*
7. Inventory host_vars/*
8. Playbook host_vars/*
9. Host facts / cached facts
10. Play vars
11. Play vars_prompt
12. Play vars_files
13. Role vars (role/vars/main.yml)
14. Block vars
15. Task vars
16. Include_vars
17. Set_facts / registered vars
18. Role params
19. Include params
20. Extra vars (-e) **TOUJOURS GAGNE**

### Registered variables

\`\`\`yaml
- name: Vérifier si le service tourne
  command: systemctl is-active nginx
  register: nginx_status
  ignore_errors: yes
  changed_when: false

- name: Afficher le statut
  debug:
    msg: "Nginx est {{ nginx_status.stdout }}"

- name: Démarrer si inactif
  service:
    name: nginx
    state: started
  when: nginx_status.rc != 0
\`\`\`

### Ansible Facts

\`\`\`yaml
- name: Configuration adaptative
  template:
    src: config.j2
    dest: /etc/app/config.yml
  vars:
    worker_count: "{{ ansible_processor_vcpus * 2 }}"
    memory_limit: "{{ (ansible_memtotal_mb * 0.8) | int }}m"
\`\`\`

## 3. Conditionnelles (when)

\`\`\`yaml
tasks:
  # Condition simple
  - name: Installer sur Ubuntu
    apt:
      name: nginx
    when: ansible_distribution == "Ubuntu"

  # Conditions multiples (AND)
  - name: Installer sur Ubuntu 22.04+
    apt:
      name: nginx
    when:
      - ansible_distribution == "Ubuntu"
      - ansible_distribution_major_version | int >= 22

  # OR
  - name: Installer sur Debian ou Ubuntu
    apt:
      name: nginx
    when: ansible_os_family == "Debian" or ansible_distribution == "Ubuntu"

  # Variable définie
  - name: Configurer si variable existe
    template:
      src: custom.conf.j2
      dest: /etc/app/custom.conf
    when: custom_config is defined

  # Résultat d'une tâche précédente
  - name: Redémarrer si config changée
    service:
      name: app
      state: restarted
    when: config_task.changed

  # Condition sur le contenu d'une variable
  - name: Tâche de production
    debug:
      msg: "Production deployment"
    when: "'prod' in group_names"

  # Tester un fichier
  - name: Vérifier si fichier existe
    stat:
      path: /etc/app/config.yml
    register: config_stat

  - name: Créer si absent
    template:
      src: config.yml.j2
      dest: /etc/app/config.yml
    when: not config_stat.stat.exists
\`\`\`

## 4. Boucles (loops)

\`\`\`yaml
tasks:
  # Loop simple (liste)
  - name: Installer plusieurs paquets
    apt:
      name: "{{ item }}"
      state: present
    loop:
      - nginx
      - postgresql-client
      - redis-tools
      - htop
      - curl

  # Forme raccourcie
  - name: Installer paquets (liste directe)
    apt:
      name:
        - nginx
        - curl
        - htop
      state: present

  # Loop avec dictionnaire
  - name: Créer des utilisateurs
    user:
      name: "{{ item.name }}"
      groups: "{{ item.groups }}"
      shell: "{{ item.shell | default('/bin/bash') }}"
      state: present
    loop:
      - { name: 'deploy', groups: 'sudo', shell: '/bin/bash' }
      - { name: 'monitor', groups: 'docker' }
      - { name: 'backup', groups: 'backup', shell: '/bin/sh' }

  # Loop avec index
  - name: Créer des fichiers numérotés
    copy:
      content: "Server {{ ansible_loop.index }}"
      dest: "/tmp/server-{{ ansible_loop.index }}.txt"
    loop: "{{ groups['webservers'] }}"
    loop_control:
      extended: true
      label: "{{ item }}"

  # with_dict (map)
  - name: Configurer les services
    systemd:
      name: "{{ item.key }}"
      state: "{{ item.value.state }}"
      enabled: "{{ item.value.enabled }}"
    with_dict:
      nginx: { state: started, enabled: yes }
      redis: { state: started, enabled: yes }
      memcached: { state: stopped, enabled: no }

  # Until (retry)
  - name: Attendre que le service soit prêt
    uri:
      url: "http://localhost:3000/health"
      status_code: 200
    register: result
    until: result.status == 200
    retries: 30
    delay: 5
\`\`\`

## 5. Blocks (groupement et error handling)

\`\`\`yaml
tasks:
  - name: Déploiement de l'application
    block:
      - name: Arrêter l'application
        service:
          name: app
          state: stopped

      - name: Déployer le nouveau code
        git:
          repo: "{{ app_repo }}"
          dest: /opt/app
          version: "{{ app_version }}"

      - name: Installer les dépendances
        command: npm ci --production
        args:
          chdir: /opt/app

      - name: Démarrer l'application
        service:
          name: app
          state: started

    rescue:
      - name: Rollback en cas d'erreur
        git:
          repo: "{{ app_repo }}"
          dest: /opt/app
          version: "{{ app_previous_version }}"

      - name: Redémarrer l'ancienne version
        service:
          name: app
          state: restarted

      - name: Notifier l'échec
        slack:
          msg: "Deployment failed on {{ inventory_hostname }}"
          channel: "#alerts"

    always:
      - name: Nettoyer les fichiers temporaires
        file:
          path: /tmp/deploy
          state: absent

      - name: Envoyer les métriques
        uri:
          url: "http://metrics/deploy"
          method: POST
          body_format: json
          body:
            host: "{{ inventory_hostname }}"
            status: "{{ 'success' if not ansible_failed_task else 'failed' }}"
\`\`\`

## 6. Templates Jinja2

### Syntaxe de base

\`\`\`jinja2
{# templates/nginx.conf.j2 #}
# Managed by Ansible - DO NOT EDIT MANUALLY

worker_processes {{ ansible_processor_vcpus }};
worker_rlimit_nofile 65535;

events {
    worker_connections {{ nginx_worker_connections | default(1024) }};
    multi_accept on;
}

http {
    # Logging
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    # Upstreams
{% for backend in app_backends %}
    upstream {{ backend.name }} {
{% for server in backend.servers %}
        server {{ server.host }}:{{ server.port }} weight={{ server.weight | default(1) }};
{% endfor %}
    }
{% endfor %}

    # Server blocks
{% for vhost in virtual_hosts %}
    server {
        listen {{ vhost.port | default(80) }};
        server_name {{ vhost.domain }};
        
{% if vhost.ssl | default(false) %}
        listen 443 ssl;
        ssl_certificate /etc/ssl/certs/{{ vhost.domain }}.crt;
        ssl_certificate_key /etc/ssl/private/{{ vhost.domain }}.key;
{% endif %}
        
        location / {
            proxy_pass http://{{ vhost.upstream }};
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
{% endfor %}
}
\`\`\`

### Filtres Jinja2 utiles

\`\`\`yaml
# Filtres courants dans les templates
"{{ variable | default('valeur_defaut') }}"
"{{ variable | upper }}"
"{{ variable | lower }}"
"{{ list_var | join(', ') }}"
"{{ dict_var | to_json }}"
"{{ dict_var | to_yaml }}"
"{{ password | password_hash('sha512') }}"
"{{ path | basename }}"
"{{ path | dirname }}"
"{{ 'text' | b64encode }}"
"{{ encoded | b64decode }}"
"{{ list | unique }}"
"{{ list | sort }}"
"{{ list | select('match', 'web.*') | list }}"
"{{ number | int }}"
"{{ ip_list | ipaddr('address') }}"
"{{ timestamp | to_datetime }}"
\`\`\`

## 7. Modules essentiels

### Gestion de fichiers

\`\`\`yaml
# file - gérer fichiers et répertoires
- file:
    path: /opt/app
    state: directory
    owner: deploy
    group: deploy
    mode: '0755'
    recurse: yes

# copy - copier des fichiers
- copy:
    src: files/app.conf
    dest: /etc/app/app.conf
    owner: root
    group: root
    mode: '0644'
    backup: yes

# template - templates Jinja2
- template:
    src: templates/config.j2
    dest: /etc/app/config.yml
    owner: app
    mode: '0600'
    validate: 'python3 -c "import yaml; yaml.safe_load(open(%s))"'

# lineinfile - modifier une ligne
- lineinfile:
    path: /etc/ssh/sshd_config
    regexp: '^PermitRootLogin'
    line: 'PermitRootLogin no'
    state: present
  notify: Restart sshd

# blockinfile - insérer un bloc
- blockinfile:
    path: /etc/hosts
    block: |
      192.168.1.10 web1.local
      192.168.1.11 web2.local
    marker: "# {mark} ANSIBLE MANAGED BLOCK"
\`\`\`

### Gestion de services et paquets

\`\`\`yaml
# systemd
- systemd:
    name: nginx
    state: started
    enabled: yes
    daemon_reload: yes

# apt
- apt:
    name: "{{ packages }}"
    state: present
    update_cache: yes
    cache_valid_time: 3600
  vars:
    packages:
      - nginx
      - certbot
      - python3-certbot-nginx

# pip
- pip:
    name: "{{ item }}"
    state: present
    virtualenv: /opt/app/venv
  loop:
    - flask
    - gunicorn
    - redis

# docker_container
- docker_container:
    name: redis
    image: redis:7-alpine
    state: started
    restart_policy: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data

# docker_image
- docker_image:
    name: mon-app
    tag: "{{ app_version }}"
    source: build
    build:
      path: /opt/app
      dockerfile: Dockerfile
\`\`\`

### Utilitaires et debugging

\`\`\`yaml
# debug
- debug:
    msg: "Variable value: {{ my_var }}"
- debug:
    var: ansible_facts

# uri (requêtes HTTP)
- uri:
    url: "http://api.example.com/status"
    method: GET
    headers:
      Authorization: "Bearer {{ api_token }}"
    return_content: yes
  register: api_response

# wait_for
- wait_for:
    port: 3000
    host: localhost
    delay: 5
    timeout: 60

# cron
- cron:
    name: "Backup quotidien"
    minute: "0"
    hour: "2"
    job: "/opt/scripts/backup.sh >> /var/log/backup.log 2>&1"
    user: backup

# fail / assert
- fail:
    msg: "Deployment cancelled: version {{ app_version }} not found"
  when: app_artifact.stat.exists == false

- assert:
    that:
      - ansible_memtotal_mb >= 2048
      - ansible_processor_vcpus >= 2
    fail_msg: "Insufficient resources for production deployment"
    success_msg: "Resource requirements met"
\`\`\`

## 8. Tags

\`\`\`yaml
tasks:
  - name: Installer nginx
    apt:
      name: nginx
      state: present
    tags: [install, nginx]

  - name: Configurer nginx
    template:
      src: nginx.conf.j2
      dest: /etc/nginx/nginx.conf
    tags: [config, nginx]

  - name: Déployer le code
    git:
      repo: "{{ app_repo }}"
      dest: /opt/app
    tags: [deploy]
\`\`\`

\`\`\`bash
# Exécuter uniquement les tâches avec un tag
ansible-playbook site.yml --tags "config"
ansible-playbook site.yml --tags "install,config"

# Exclure des tags
ansible-playbook site.yml --skip-tags "deploy"

# Lister les tags disponibles
ansible-playbook site.yml --list-tags
\`\`\`

## 9. Includes et Imports

\`\`\`yaml
# import_tasks - statique (résolu au parsing)
- import_tasks: tasks/install.yml
  vars:
    package_name: nginx

# include_tasks - dynamique (résolu à l'exécution)
- include_tasks: "tasks/{{ ansible_os_family | lower }}.yml"

# import_playbook
- import_playbook: playbooks/common.yml
- import_playbook: playbooks/webservers.yml

# include_role
- include_role:
    name: nginx
  vars:
    nginx_port: 8080
  when: install_nginx | default(true)
\`\`\`
`,
    practiceContent: `# Travaux Pratiques : Playbooks et Modules Avancés

## TP 1 : Playbook de configuration serveur

### Objectif
Écrire un playbook complet de configuration de serveur.

### Étapes

\`\`\`yaml
# playbooks/server-setup.yml
---
- name: Configuration complète du serveur
  hosts: localhost
  connection: local
  
  vars:
    app_name: formation-app
    app_dir: /tmp/{{ app_name }}
    packages:
      - curl
      - wget
      - vim
    users:
      - { name: 'deploy', groups: '' }
      - { name: 'monitor', groups: '' }
  
  tasks:
    - name: Créer le répertoire applicatif
      file:
        path: "{{ app_dir }}/{{ item }}"
        state: directory
        mode: '0755'
      loop:
        - logs
        - config
        - data
        - scripts
    
    - name: Générer le fichier de configuration
      copy:
        content: |
          APP_NAME={{ app_name }}
          LOG_LEVEL=info
          PORT=3000
          NODE_ENV=production
        dest: "{{ app_dir }}/config/.env"
        mode: '0644'
    
    - name: Créer un script de démarrage
      copy:
        content: |
          #!/bin/bash
          echo "Starting {{ app_name }}..."
          echo "Config loaded from {{ app_dir }}/config/.env"
        dest: "{{ app_dir }}/scripts/start.sh"
        mode: '0755'
    
    - name: Exécuter le script
      command: "{{ app_dir }}/scripts/start.sh"
      register: start_result
    
    - name: Afficher le résultat
      debug:
        var: start_result.stdout_lines
\`\`\`

\`\`\`bash
ansible-playbook playbooks/server-setup.yml
\`\`\`

## TP 2 : Boucles et conditions

### Objectif
Utiliser les boucles et conditions pour des déploiements adaptatifs.

### Étapes

\`\`\`yaml
# playbooks/adaptive.yml
---
- name: Déploiement adaptatif
  hosts: localhost
  connection: local
  
  vars:
    environment: development
    services:
      web:
        port: 8080
        enabled: true
      api:
        port: 3000
        enabled: true
      worker:
        port: 0
        enabled: "{{ environment == 'production' }}"
  
  tasks:
    - name: Afficher l'environnement
      debug:
        msg: "Deploying to {{ environment }}"
    
    - name: Créer les répertoires de services
      file:
        path: "/tmp/services/{{ item.key }}"
        state: directory
      loop: "{{ services | dict2items }}"
      when: item.value.enabled | bool
    
    - name: Générer les configs de service
      copy:
        content: |
          SERVICE={{ item.key }}
          PORT={{ item.value.port }}
          ENVIRONMENT={{ environment }}
        dest: "/tmp/services/{{ item.key }}/config"
      loop: "{{ services | dict2items }}"
      when: item.value.enabled | bool
      register: config_results
    
    - name: Résumé des services configurés
      debug:
        msg: "Service {{ item.item.key }} configuré sur port {{ item.item.value.port }}"
      loop: "{{ config_results.results }}"
      when: item is not skipped
\`\`\`

\`\`\`bash
ansible-playbook playbooks/adaptive.yml
ansible-playbook playbooks/adaptive.yml -e "environment=production"
\`\`\`

## TP 3 : Blocks et error handling

### Objectif
Implémenter un déploiement avec rollback automatique.

### Étapes

\`\`\`yaml
# playbooks/deploy-safe.yml
---
- name: Déploiement sécurisé avec rollback
  hosts: localhost
  connection: local
  
  vars:
    deploy_dir: /tmp/deploy-demo
    version: "2.0"
    previous_version: "1.0"
  
  tasks:
    - name: Préparer l'environnement
      file:
        path: "{{ deploy_dir }}"
        state: directory
    
    - name: Déploiement
      block:
        - name: Créer la version actuelle
          copy:
            content: "Version {{ version }} deployed at {{ ansible_date_time.iso8601 }}"
            dest: "{{ deploy_dir }}/version.txt"
        
        - name: Simuler les tests
          command: "test {{ version }} != 'broken'"
          changed_when: false
        
        - name: Marquer le succès
          copy:
            content: "SUCCESS"
            dest: "{{ deploy_dir }}/status.txt"
      
      rescue:
        - name: Rollback au version précédente
          copy:
            content: "Version {{ previous_version }} (rollback)"
            dest: "{{ deploy_dir }}/version.txt"
        
        - name: Marquer l'échec
          copy:
            content: "FAILED - Rolled back to {{ previous_version }}"
            dest: "{{ deploy_dir }}/status.txt"
      
      always:
        - name: Lire le statut final
          command: "cat {{ deploy_dir }}/status.txt"
          register: final_status
          changed_when: false
        
        - name: Rapport
          debug:
            msg: "Deploy result: {{ final_status.stdout }}"
\`\`\`

\`\`\`bash
# Test succès
ansible-playbook playbooks/deploy-safe.yml

# Test échec (forcer un rollback)
ansible-playbook playbooks/deploy-safe.yml -e "version=broken"
\`\`\`

## TP 4 : Templates Jinja2

### Objectif
Créer des templates de configuration dynamiques.

### Étapes

\`\`\`bash
mkdir -p templates
\`\`\`

\`\`\`jinja2
{# templates/app-config.yml.j2 #}
# Application Configuration
# Generated by Ansible on {{ ansible_date_time.iso8601 }}
# Host: {{ ansible_hostname }}

app:
  name: {{ app_name }}
  version: {{ app_version | default('latest') }}
  environment: {{ environment }}

server:
  port: {{ server_port | default(3000) }}
  workers: {{ ansible_processor_vcpus | default(2) }}
  
{% if environment == 'production' %}
  ssl:
    enabled: true
    cert: /etc/ssl/certs/app.crt
    key: /etc/ssl/private/app.key
{% endif %}

{% if databases is defined %}
databases:
{% for db in databases %}
  - name: {{ db.name }}
    host: {{ db.host }}
    port: {{ db.port | default(5432) }}
{% endfor %}
{% endif %}
\`\`\`

\`\`\`yaml
# playbooks/template-demo.yml
- hosts: localhost
  connection: local
  vars:
    app_name: my-service
    app_version: "2.1.0"
    environment: production
    server_port: 8080
    databases:
      - { name: primary, host: db1.local, port: 5432 }
      - { name: replica, host: db2.local }
  tasks:
    - name: Générer la configuration
      template:
        src: templates/app-config.yml.j2
        dest: /tmp/app-config.yml
    - name: Afficher le résultat
      command: cat /tmp/app-config.yml
      register: config_output
      changed_when: false
    - debug:
        var: config_output.stdout_lines
\`\`\`

## TP 5 : Tags et exécution sélective

### Objectif
Organiser un playbook avec des tags pour une exécution ciblée.

### Étapes

\`\`\`yaml
# playbooks/tagged.yml
---
- name: Playbook avec tags
  hosts: localhost
  connection: local
  
  tasks:
    - name: Phase d'installation
      debug:
        msg: "Installing packages..."
      tags: [install, always-show]
    
    - name: Phase de configuration
      debug:
        msg: "Configuring services..."
      tags: [config]
    
    - name: Phase de déploiement
      debug:
        msg: "Deploying application..."
      tags: [deploy]
    
    - name: Phase de vérification
      debug:
        msg: "Running health checks..."
      tags: [verify, deploy]
\`\`\`

\`\`\`bash
# Lister les tags
ansible-playbook playbooks/tagged.yml --list-tags

# Exécuter uniquement l'installation
ansible-playbook playbooks/tagged.yml --tags install

# Exécuter config et deploy
ansible-playbook playbooks/tagged.yml --tags "config,deploy"

# Tout sauf le deploy
ansible-playbook playbooks/tagged.yml --skip-tags deploy
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Un playbook contient des plays (hosts + tasks), avec pre_tasks, roles, tasks, post_tasks, handlers',
      'La précédence des variables va des defaults de role (faible) aux extra vars -e (fort)',
      'when: permet des conditions sur facts, variables, résultats de tâches (register)',
      'loop: itère sur des listes/dicts, until: retry avec délai, with_dict: pour les maps',
      'Blocks groupent les tâches avec rescue (erreur) et always (toujours exécuté)',
      'Les templates Jinja2 génèrent des fichiers dynamiques avec variables, boucles et conditions',
      'Modules clés : file, copy, template, lineinfile, apt, pip, docker_container, uri, cron, debug',
      'Tags permettent l\'exécution sélective (--tags install) et le skip (--skip-tags deploy)'
    ]),
  },


  // ============================================================
  // ANSIBLE - Module 3: Roles, Galaxy et intégration CI/CD
  // ============================================================
  {
    id: 'ans-03',
    courseId: 'ansible',
    title: 'Roles, Galaxy et intégration CI/CD',
    duration: '4h',
    orderIndex: 3,
    videoUrl: 'https://www.youtube.com/watch?v=miO00M4vPok',
    theoryContent: `# Roles, Galaxy et Intégration CI/CD

## 1. Structure d'un Role

Un role est la méthode standard pour organiser du contenu Ansible de manière réutilisable et partageable.

\`\`\`
roles/
  webserver/
    tasks/
      main.yml          # Tâches principales (point d'entrée)
      install.yml       # Sous-tâches : installation
      configure.yml     # Sous-tâches : configuration
      deploy.yml        # Sous-tâches : déploiement
    handlers/
      main.yml          # Handlers (restart, reload, etc.)
    templates/
      nginx.conf.j2     # Templates Jinja2
      vhost.conf.j2
    files/
      ssl/              # Fichiers statiques à copier
    vars/
      main.yml          # Variables internes (haute priorité)
    defaults/
      main.yml          # Variables par défaut (basse priorité)
    meta/
      main.yml          # Métadonnées et dépendances
    tests/
      inventory
      test.yml
    README.md           # Documentation du role
\`\`\`

### Exemple complet d'un role

\`\`\`yaml
# roles/webserver/defaults/main.yml
---
nginx_port: 80
nginx_worker_processes: auto
nginx_worker_connections: 1024
nginx_server_name: "_"
nginx_root: /var/www/html
nginx_ssl_enabled: false
nginx_ssl_cert: ""
nginx_ssl_key: ""
app_backends: []
\`\`\`

\`\`\`yaml
# roles/webserver/tasks/main.yml
---
- import_tasks: install.yml
  tags: [install]

- import_tasks: configure.yml
  tags: [config]

- import_tasks: deploy.yml
  tags: [deploy]
  when: app_deploy | default(false)
\`\`\`

\`\`\`yaml
# roles/webserver/tasks/install.yml
---
- name: Installer Nginx
  apt:
    name: nginx
    state: present
    update_cache: yes
  when: ansible_os_family == "Debian"

- name: Installer Nginx (RHEL)
  yum:
    name: nginx
    state: present
  when: ansible_os_family == "RedHat"

- name: S'assurer que Nginx est démarré
  systemd:
    name: nginx
    state: started
    enabled: yes
\`\`\`

\`\`\`yaml
# roles/webserver/tasks/configure.yml
---
- name: Déployer la configuration principale
  template:
    src: nginx.conf.j2
    dest: /etc/nginx/nginx.conf
    owner: root
    group: root
    mode: '0644'
    validate: 'nginx -t -c %s'
  notify: Reload Nginx

- name: Déployer les virtual hosts
  template:
    src: vhost.conf.j2
    dest: "/etc/nginx/conf.d/{{ item.domain }}.conf"
  loop: "{{ virtual_hosts | default([]) }}"
  notify: Reload Nginx

- name: Supprimer la config par défaut
  file:
    path: /etc/nginx/sites-enabled/default
    state: absent
  notify: Reload Nginx
\`\`\`

\`\`\`yaml
# roles/webserver/handlers/main.yml
---
- name: Restart Nginx
  systemd:
    name: nginx
    state: restarted

- name: Reload Nginx
  systemd:
    name: nginx
    state: reloaded
\`\`\`

\`\`\`yaml
# roles/webserver/meta/main.yml
---
galaxy_info:
  author: DevOps Team
  description: Role pour installer et configurer Nginx
  license: MIT
  min_ansible_version: "2.14"
  platforms:
    - name: Ubuntu
      versions: [jammy, focal]
    - name: EL
      versions: [8, 9]
  galaxy_tags:
    - nginx
    - webserver
    - reverse_proxy

dependencies:
  - role: common
  - role: ssl
    when: nginx_ssl_enabled
\`\`\`

## 2. Utiliser des Roles

\`\`\`yaml
# site.yml
---
- name: Configuration des serveurs web
  hosts: webservers
  become: yes
  
  roles:
    # Forme simple
    - common
    - webserver
    
    # Avec paramètres
    - role: webserver
      vars:
        nginx_port: 8080
        nginx_ssl_enabled: true
      tags: [web]
    
    # Conditionnel
    - role: monitoring
      when: enable_monitoring | default(true)
    
    # Avec tags
    - role: security
      tags: [security, hardening]
\`\`\`

## 3. Ansible Galaxy

### Commandes Galaxy

\`\`\`bash
# Rechercher des roles
ansible-galaxy search nginx
ansible-galaxy search docker --author geerlingguy

# Installer un role
ansible-galaxy install geerlingguy.docker
ansible-galaxy install geerlingguy.nginx
ansible-galaxy install -r requirements.yml

# Lister les roles installés
ansible-galaxy list

# Créer un nouveau role
ansible-galaxy init roles/mon-role

# Supprimer un role
ansible-galaxy remove geerlingguy.docker
\`\`\`

### requirements.yml

\`\`\`yaml
# requirements.yml
---
roles:
  - name: geerlingguy.docker
    version: "6.1.0"
  - name: geerlingguy.nginx
    version: "3.1.0"
  - name: geerlingguy.certbot
  - name: custom-role
    src: git+https://github.com/org/ansible-role-custom.git
    version: v2.0.0
  - name: private-role
    src: git+ssh://git@github.com/org/private-role.git
    scm: git
    version: main

collections:
  - name: community.docker
    version: "3.4.0"
  - name: community.general
    version: ">=7.0.0"
  - name: amazon.aws
    version: "6.0.0"
\`\`\`

\`\`\`bash
# Installer depuis requirements.yml
ansible-galaxy install -r requirements.yml
ansible-galaxy collection install -r requirements.yml

# Forcer la réinstallation
ansible-galaxy install -r requirements.yml --force
\`\`\`

## 4. Ansible Vault

### Commandes Vault

\`\`\`bash
# Créer un fichier chiffré
ansible-vault create secrets.yml

# Chiffrer un fichier existant
ansible-vault encrypt group_vars/production/vault.yml

# Déchiffrer un fichier
ansible-vault decrypt secrets.yml

# Éditer un fichier chiffré
ansible-vault edit secrets.yml

# Changer le mot de passe
ansible-vault rekey secrets.yml

# Chiffrer une seule valeur (inline)
ansible-vault encrypt_string 'mon_secret' --name 'db_password'
# Résultat à coller dans un fichier YAML :
# db_password: !vault |
#     $ANSIBLE_VAULT;1.1;AES256
#     64623...

# Voir le contenu déchiffré
ansible-vault view secrets.yml
\`\`\`

### Utilisation dans les playbooks

\`\`\`yaml
# group_vars/production/vault.yml (chiffré)
---
vault_db_password: supersecret
vault_api_key: abc123xyz
vault_ssl_key: |
  -----BEGIN PRIVATE KEY-----
  MIIEvgIBADANBg...
  -----END PRIVATE KEY-----

# group_vars/production/vars.yml (non chiffré, référence vault)
---
db_password: "{{ vault_db_password }}"
api_key: "{{ vault_api_key }}"
\`\`\`

\`\`\`bash
# Exécuter avec le vault
ansible-playbook site.yml --ask-vault-pass
ansible-playbook site.yml --vault-password-file ~/.vault_pass
ansible-playbook site.yml --vault-id prod@~/.vault_pass_prod
\`\`\`

## 5. Collections

Les collections regroupent roles, modules, plugins :

\`\`\`bash
# Installer une collection
ansible-galaxy collection install community.docker
ansible-galaxy collection install amazon.aws

# Utiliser un module de collection
- name: Créer un container
  community.docker.docker_container:
    name: redis
    image: redis:7
    state: started
\`\`\`

## 6. Molecule (Testing des roles)

\`\`\`bash
# Installer molecule
pip3 install molecule molecule-docker

# Initialiser un role avec molecule
molecule init role my_role --driver-name docker

# Structure molecule
roles/my_role/
  molecule/
    default/
      converge.yml       # Playbook de test
      molecule.yml       # Configuration
      verify.yml         # Vérifications
      prepare.yml        # Préparation
\`\`\`

\`\`\`yaml
# molecule/default/molecule.yml
---
driver:
  name: docker
platforms:
  - name: ubuntu-instance
    image: ubuntu:22.04
    pre_build_image: true
    privileged: true
    command: /sbin/init
  - name: centos-instance
    image: centos:8
    pre_build_image: true
provisioner:
  name: ansible
verifier:
  name: ansible
\`\`\`

\`\`\`bash
# Commandes molecule
molecule create         # Créer les instances
molecule converge       # Appliquer le role
molecule verify         # Vérifier le résultat
molecule destroy        # Détruire les instances
molecule test           # Cycle complet (create → converge → verify → destroy)
molecule login          # Se connecter à une instance
\`\`\`

## 7. Intégration CI/CD

### GitLab CI

\`\`\`yaml
# .gitlab-ci.yml
stages:
  - lint
  - test
  - deploy

variables:
  ANSIBLE_FORCE_COLOR: "true"

lint:
  stage: lint
  image: python:3.11
  script:
    - pip install ansible-lint yamllint
    - yamllint .
    - ansible-lint site.yml
  
test:
  stage: test
  image: python:3.11
  services:
    - docker:dind
  script:
    - pip install molecule molecule-docker ansible
    - cd roles/webserver
    - molecule test

deploy_staging:
  stage: deploy
  image: python:3.11
  script:
    - pip install ansible
    - ansible-galaxy install -r requirements.yml
    - ansible-playbook -i inventory/staging site.yml --vault-password-file <(echo "$VAULT_PASSWORD")
  environment: staging
  only:
    - develop

deploy_production:
  stage: deploy
  image: python:3.11
  script:
    - pip install ansible
    - ansible-galaxy install -r requirements.yml
    - ansible-playbook -i inventory/production site.yml --vault-password-file <(echo "$VAULT_PASSWORD")
  environment: production
  when: manual
  only:
    - main
\`\`\`

### Jenkins Pipeline

\`\`\`groovy
pipeline {
    agent any
    environment {
        ANSIBLE_VAULT_PASSWORD = credentials('ansible-vault-pass')
    }
    stages {
        stage('Lint') {
            steps {
                sh 'ansible-lint site.yml'
            }
        }
        stage('Deploy') {
            steps {
                sh """
                    ansible-playbook -i inventory/production site.yml \\
                        --vault-password-file <(echo \$ANSIBLE_VAULT_PASSWORD)
                """
            }
        }
    }
}
\`\`\`

## 8. Performance et optimisations

\`\`\`ini
# ansible.cfg - optimisations
[defaults]
forks = 50                    # Parallélisme (défaut: 5)
gathering = smart             # Cache les facts
fact_caching = jsonfile
fact_caching_connection = /tmp/facts_cache
fact_caching_timeout = 86400

[ssh_connection]
pipelining = True             # Réduit les connexions SSH
ssh_args = -o ControlMaster=auto -o ControlPersist=60s -o PreferredAuthentications=publickey
\`\`\`

### Stratégies d'exécution

\`\`\`yaml
# Stratégie free (chaque hôte avance indépendamment)
- hosts: all
  strategy: free
  tasks: ...

# Stratégie par batch
- hosts: webservers
  serial: "30%"    # 30% des hôtes à la fois
  tasks: ...

# Async (tâches longues)
- name: Mise à jour longue
  apt:
    upgrade: dist
  async: 600       # Timeout en secondes
  poll: 10         # Vérifier toutes les 10s (0 = fire and forget)
\`\`\`

## 9. Bonnes pratiques

| Pratique | Description |
|----------|-------------|
| Un role par composant | Séparer les responsabilités (nginx, postgres, app) |
| Variables dans defaults/ | Toujours surchargeables par l'utilisateur |
| Vault pour les secrets | Ne jamais commiter de secrets en clair |
| Molecule pour les tests | Tester les roles dans des containers |
| ansible-lint | Vérifier la qualité du code |
| Tags partout | Permettre l'exécution sélective |
| Idempotence | Tester en exécutant 2 fois (changed=0 au 2e run) |
| Documentation | README.md avec exemples pour chaque role |
`,
    practiceContent: `# Travaux Pratiques : Roles, Galaxy et CI/CD

## TP 1 : Créer un role complet

### Objectif
Créer un role réutilisable pour déployer une application.

### Étapes

\`\`\`bash
# 1. Créer la structure du role
mkdir -p roles/app-deploy/{tasks,handlers,templates,defaults,meta}
\`\`\`

\`\`\`yaml
# roles/app-deploy/defaults/main.yml
---
app_name: myapp
app_version: latest
app_port: 3000
app_dir: "/opt/{{ app_name }}"
app_user: deploy
app_env: production
\`\`\`

\`\`\`yaml
# roles/app-deploy/tasks/main.yml
---
- name: Créer l'utilisateur de déploiement
  user:
    name: "{{ app_user }}"
    shell: /bin/bash
    system: yes
  become: yes
  tags: [setup]

- name: Créer le répertoire applicatif
  file:
    path: "{{ app_dir }}"
    state: directory
    owner: "{{ app_user }}"
    mode: '0755'
  become: yes
  tags: [setup]

- name: Générer la configuration
  template:
    src: app.env.j2
    dest: "{{ app_dir }}/.env"
    owner: "{{ app_user }}"
    mode: '0600'
  notify: Restart Application
  tags: [config]

- name: Afficher le résumé
  debug:
    msg: "{{ app_name }} v{{ app_version }} déployé dans {{ app_dir }} sur port {{ app_port }}"
  tags: [deploy]
\`\`\`

\`\`\`yaml
# roles/app-deploy/handlers/main.yml
---
- name: Restart Application
  debug:
    msg: "Application {{ app_name }} redémarrée"
\`\`\`

\`\`\`jinja2
{# roles/app-deploy/templates/app.env.j2 #}
# Configuration {{ app_name }}
# Generated by Ansible
APP_NAME={{ app_name }}
APP_VERSION={{ app_version }}
APP_PORT={{ app_port }}
NODE_ENV={{ app_env }}
\`\`\`

\`\`\`yaml
# site.yml
---
- name: Déployer l'application
  hosts: localhost
  connection: local
  roles:
    - role: app-deploy
      vars:
        app_name: formation-api
        app_version: "2.1.0"
        app_port: 8080
\`\`\`

\`\`\`bash
ansible-playbook site.yml
ansible-playbook site.yml --tags config
\`\`\`

## TP 2 : Ansible Vault

### Objectif
Sécuriser les secrets avec Ansible Vault.

### Étapes

\`\`\`bash
# 1. Créer un fichier vault
echo "vault_password_123" > .vault_pass
chmod 600 .vault_pass

# 2. Créer un fichier de secrets chiffré
ansible-vault create group_vars/all/vault.yml --vault-password-file .vault_pass
# Contenu :
# vault_db_password: secret123
# vault_api_key: key-abc-xyz

# 3. Chiffrer une string inline
ansible-vault encrypt_string 'mon_super_secret' --name 'api_secret' --vault-password-file .vault_pass

# 4. Playbook utilisant les secrets
cat > playbooks/secrets-demo.yml << 'EOF'
---
- name: Demo Vault
  hosts: localhost
  connection: local
  vars:
    db_password: "{{ vault_db_password | default('no-vault') }}"
  tasks:
    - name: Utiliser le secret (masqué)
      debug:
        msg: "DB Password length: {{ db_password | length }} chars"
      no_log: true
EOF

# 5. Exécuter
ansible-playbook playbooks/secrets-demo.yml --vault-password-file .vault_pass
\`\`\`

## TP 3 : Galaxy et requirements

### Objectif
Utiliser Ansible Galaxy pour gérer les dépendances.

### Étapes

\`\`\`yaml
# requirements.yml
---
roles:
  - name: geerlingguy.docker
    version: "6.1.0"
collections:
  - name: community.general
    version: ">=7.0.0"
\`\`\`

\`\`\`bash
# Installer les dépendances
ansible-galaxy install -r requirements.yml
ansible-galaxy collection install -r requirements.yml

# Lister les roles installés
ansible-galaxy list

# Créer un nouveau role
ansible-galaxy init roles/monitoring
ls roles/monitoring/
\`\`\`

## TP 4 : Lint et qualité

### Objectif
Mettre en place le contrôle qualité du code Ansible.

### Étapes

\`\`\`bash
# 1. Installer les outils
pip3 install ansible-lint yamllint

# 2. Configuration yamllint
cat > .yamllint << 'EOF'
---
extends: default
rules:
  line-length:
    max: 120
  truthy:
    allowed-values: ['true', 'false', 'yes', 'no']
EOF

# 3. Configuration ansible-lint
cat > .ansible-lint << 'EOF'
---
skip_list:
  - yaml[line-length]
  - no-changed-when
warn_list:
  - experimental
EOF

# 4. Exécuter les linters
yamllint .
ansible-lint site.yml
ansible-lint roles/
\`\`\`

## TP 5 : Pipeline CI/CD complet

### Objectif
Créer un pipeline CI/CD pour les playbooks Ansible.

### Étapes

\`\`\`yaml
# .gitlab-ci.yml
stages:
  - lint
  - test
  - deploy

lint:
  stage: lint
  image: python:3.11-slim
  before_script:
    - pip install ansible ansible-lint yamllint
  script:
    - yamllint .
    - ansible-lint site.yml
    - ansible-playbook site.yml --syntax-check

test:
  stage: test
  image: python:3.11
  before_script:
    - pip install ansible
    - ansible-galaxy install -r requirements.yml
  script:
    - ansible-playbook site.yml --check --connection=local

deploy:
  stage: deploy
  image: python:3.11
  before_script:
    - pip install ansible
    - ansible-galaxy install -r requirements.yml
  script:
    - ansible-playbook -i inventory/prod site.yml
  when: manual
  only:
    - main
\`\`\`

\`\`\`bash
# Simuler le pipeline localement
yamllint . && echo "YAML OK"
ansible-lint site.yml && echo "Lint OK"
ansible-playbook site.yml --syntax-check && echo "Syntax OK"
ansible-playbook site.yml --check --connection=local && echo "Check OK"
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Un role organise le contenu en répertoires standardisés : tasks/, handlers/, templates/, defaults/, vars/, meta/',
      'defaults/main.yml contient les variables par défaut (basse priorité, facilement surchargeables)',
      'Ansible Galaxy est le dépôt communautaire : installer avec ansible-galaxy install -r requirements.yml',
      'Ansible Vault chiffre les secrets : vault create, encrypt_string, --vault-password-file',
      'Les collections regroupent roles + modules + plugins en packages versionnés',
      'Molecule teste les roles dans des containers Docker avec create → converge → verify → destroy',
      'CI/CD : lint (yamllint + ansible-lint) → test (--check) → deploy (ansible-playbook)',
      'Performance : forks=50, pipelining=True, gathering=smart, serial pour le déploiement progressif'
    ]),
  },


  // ============================================================
  // GITLAB CI - Module 1: Pipeline et configuration YAML
  // ============================================================
  {
    id: 'glci-01',
    courseId: 'gitlab-ci',
    title: 'Pipeline et configuration YAML',
    duration: '3h30',
    orderIndex: 1,
    videoUrl: 'https://www.youtube.com/watch?v=qP8kir2GUgo',
    theoryContent: `# Pipeline GitLab CI et Configuration YAML

## 1. Introduction à GitLab CI/CD

GitLab CI/CD est intégré nativement dans GitLab. Chaque commit peut déclencher automatiquement un pipeline défini dans le fichier \\\`.gitlab-ci.yml\\\` à la racine du projet.

### Concepts fondamentaux

\`\`\`
+------------------------------------------------------------------+
|                     PIPELINE GITLAB CI                            |
+------------------------------------------------------------------+
|                                                                  |
|  STAGES (séquentiels) :                                         |
|  +----------+  +----------+  +----------+  +----------+        |
|  |  build   |  |   test   |  |  deploy  |  | cleanup  |        |
|  +----------+  +----------+  +----------+  +----------+        |
|       |             |             |             |                |
|       v             v             v             v                |
|  JOBS (parallèles dans un stage) :                              |
|  +------+      +------+------+  +------+------+                |
|  |build |      |unit  |integ |  |stag  |prod  |                |
|  |      |      |test  |test  |  |      |      |                |
|  +------+      +------+------+  +------+------+                |
|                                                                  |
+------------------------------------------------------------------+
\`\`\`

- **Pipeline** : ensemble de jobs organisés en stages
- **Stage** : phase du pipeline (build, test, deploy)
- **Job** : tâche unitaire exécutée par un Runner
- **Runner** : agent qui exécute les jobs
- **Artifact** : fichier produit par un job
- **Cache** : fichiers réutilisés entre pipelines

## 2. Référence complète .gitlab-ci.yml

### Structure de base

\`\`\`yaml
# .gitlab-ci.yml

# Définir les stages (ordre séquentiel)
stages:
  - build
  - test
  - security
  - deploy
  - cleanup

# Variables globales
variables:
  NODE_VERSION: "18"
  DOCKER_TLS_CERTDIR: "/certs"
  FF_USE_FASTZIP: "true"

# Image Docker par défaut
image: node:\\\${NODE_VERSION}-alpine

# Services par défaut (conteneurs additionnels)
services:
  - docker:24-dind

# Scripts exécutés avant chaque job
before_script:
  - echo "Pipeline started for $CI_COMMIT_REF_NAME"

# Scripts exécutés après chaque job
after_script:
  - echo "Job $CI_JOB_NAME finished with status $CI_JOB_STATUS"

# Configuration par défaut pour tous les jobs
default:
  image: node:18-alpine
  retry:
    max: 2
    when: runner_system_failure
  timeout: 30m
  interruptible: true
\`\`\`

### Job complet

\`\`\`yaml
build_app:
  stage: build
  image: node:18
  
  # Variables spécifiques au job
  variables:
    NODE_ENV: production
  
  # Cache entre pipelines
  cache:
    key: "\\\${CI_COMMIT_REF_SLUG}-npm"
    paths:
      - node_modules/
    policy: pull-push    # pull, push, pull-push
  
  # Scripts
  before_script:
    - npm ci
  script:
    - npm run build
    - npm run lint
  after_script:
    - echo "Build completed"
  
  # Artifacts (fichiers passés aux jobs suivants)
  artifacts:
    paths:
      - dist/
      - coverage/
    reports:
      junit: junit.xml
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
    expire_in: 1 week
    when: always    # on_success, on_failure, always
  
  # Conditions d'exécution (rules)
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      when: always
    - if: '$CI_COMMIT_BRANCH == "main"'
      when: always
    - if: '$CI_COMMIT_TAG'
      when: always
    - when: never
  
  # Dépendances (jobs dont on récupère les artifacts)
  dependencies:
    - install_deps
  
  # Needs (DAG - exécution dès que les jobs listés sont terminés)
  needs:
    - job: install_deps
      artifacts: true
  
  # Retry
  retry:
    max: 2
    when:
      - runner_system_failure
      - stuck_or_timeout_failure
  
  # Timeout
  timeout: 15m
  
  # Allow failure
  allow_failure: false
  
  # Couverture de code (regex sur stdout)
  coverage: '/All files[^|]*\\|[^|]*\\s+([\\d\\.]+)/'
  
  # Tags (sélection du runner)
  tags:
    - docker
    - linux
  
  # Resource group (exécution sérialisée)
  resource_group: production
\`\`\`

## 3. Rules (conditions d'exécution)

\`\`\`yaml
# Rules remplace only/except (déprécié)
deploy_staging:
  stage: deploy
  rules:
    # Si c'est un push sur develop
    - if: '$CI_COMMIT_BRANCH == "develop"'
      when: always
    
    # Si c'est une MR vers main
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event" && $CI_MERGE_REQUEST_TARGET_BRANCH_NAME == "main"'
      when: manual
    
    # Si des fichiers spécifiques changent
    - changes:
        - src/**/*
        - package.json
      when: always
    
    # Si un fichier existe
    - exists:
        - Dockerfile
      when: always
    
    # Avec variables
    - if: '$DEPLOY_ENABLED == "true"'
      when: always
      variables:
        DEPLOY_TARGET: production
    
    # Jamais dans les autres cas
    - when: never

# Démarrage différé
delayed_job:
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
      when: delayed
      start_in: 30 minutes
\`\`\`

## 4. Includes et templates

### Types d'includes

\`\`\`yaml
include:
  # Fichier local dans le même repo
  - local: '/.gitlab/ci/build.yml'
  - local: '/.gitlab/ci/test.yml'
  - local: '/.gitlab/ci/deploy.yml'
  
  # Fichier d'un autre projet GitLab
  - project: 'devops/ci-templates'
    ref: main
    file: '/templates/docker-build.yml'
  
  # Fichier distant (URL)
  - remote: 'https://raw.githubusercontent.com/org/ci-templates/main/node.yml'
  
  # Templates GitLab officiels
  - template: 'Security/SAST.gitlab-ci.yml'
  - template: 'Security/Dependency-Scanning.gitlab-ci.yml'
  - template: 'Jobs/Code-Quality.gitlab-ci.yml'
\`\`\`

### Extends et anchors

\`\`\`yaml
# Template cachée (préfixe .)
.node_base:
  image: node:18
  cache:
    key: "\\\${CI_COMMIT_REF_SLUG}"
    paths:
      - node_modules/
  before_script:
    - npm ci

# Extends (héritage)
test_unit:
  extends: .node_base
  stage: test
  script:
    - npm run test:unit

test_integration:
  extends: .node_base
  stage: test
  script:
    - npm run test:integration
  services:
    - postgres:15
  variables:
    DATABASE_URL: "postgres://postgres@postgres/test"

# Anchors YAML (&, *, <<)
.deploy_config: &deploy_config
  image: alpine:3.18
  before_script:
    - apk add --no-cache openssh-client
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | ssh-add -

deploy_staging:
  <<: *deploy_config
  stage: deploy
  script:
    - ssh deploy@staging.example.com "cd /app && git pull && npm install"
  environment:
    name: staging
    url: https://staging.example.com
\`\`\`

## 5. Variables prédéfinies

| Variable | Description |
|----------|-------------|
| CI_COMMIT_SHA | Hash du commit |
| CI_COMMIT_SHORT_SHA | Hash court (8 chars) |
| CI_COMMIT_BRANCH | Branche du commit |
| CI_COMMIT_TAG | Tag du commit |
| CI_COMMIT_REF_NAME | Branche ou tag |
| CI_COMMIT_REF_SLUG | Branche slug (URL-safe) |
| CI_COMMIT_MESSAGE | Message du commit |
| CI_PIPELINE_ID | ID du pipeline |
| CI_PIPELINE_SOURCE | Source (push, merge_request_event, schedule, web, api) |
| CI_JOB_NAME | Nom du job |
| CI_JOB_ID | ID du job |
| CI_JOB_STATUS | Statut du job |
| CI_PROJECT_NAME | Nom du projet |
| CI_PROJECT_PATH | Chemin complet (group/project) |
| CI_REGISTRY | URL du container registry |
| CI_REGISTRY_IMAGE | Image du container registry |
| CI_MERGE_REQUEST_IID | IID de la MR |
| CI_MERGE_REQUEST_SOURCE_BRANCH_NAME | Branche source MR |
| CI_MERGE_REQUEST_TARGET_BRANCH_NAME | Branche cible MR |
| CI_ENVIRONMENT_NAME | Nom de l'environnement |
| GITLAB_USER_LOGIN | Login de l'utilisateur qui a déclenché |

## 6. Pipeline complet exemple

\`\`\`yaml
stages:
  - install
  - build
  - test
  - security
  - publish
  - deploy

variables:
  DOCKER_IMAGE: "\\\${CI_REGISTRY_IMAGE}:\\\${CI_COMMIT_SHORT_SHA}"

.node_cache: &node_cache
  cache:
    key: "\\\${CI_COMMIT_REF_SLUG}"
    paths:
      - node_modules/

install:
  stage: install
  image: node:18
  <<: *node_cache
  script:
    - npm ci
  artifacts:
    paths:
      - node_modules/
    expire_in: 1 hour

build:
  stage: build
  image: node:18
  needs: [install]
  script:
    - npm run build
  artifacts:
    paths:
      - dist/

test_unit:
  stage: test
  image: node:18
  needs: [install]
  script:
    - npm run test:unit -- --coverage
  coverage: '/Statements.*?(\\d+\\.?\\d*)%/'
  artifacts:
    reports:
      junit: junit.xml
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

test_e2e:
  stage: test
  image: cypress/included:latest
  needs: [build]
  services:
    - postgres:15
  variables:
    DATABASE_URL: "postgres://postgres@postgres/test"
  script:
    - npm run test:e2e

sast:
  stage: security
  include:
    - template: 'Security/SAST.gitlab-ci.yml'

publish_image:
  stage: publish
  image: docker:24
  services:
    - docker:24-dind
  needs: [build, test_unit, test_e2e]
  script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker build -t $DOCKER_IMAGE .
    - docker push $DOCKER_IMAGE
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'

deploy_staging:
  stage: deploy
  needs: [publish_image]
  script:
    - deploy.sh staging $DOCKER_IMAGE
  environment:
    name: staging
    url: https://staging.example.com
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'

deploy_production:
  stage: deploy
  needs: [deploy_staging]
  script:
    - deploy.sh production $DOCKER_IMAGE
  environment:
    name: production
    url: https://app.example.com
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
      when: manual
\`\`\`
`,
    practiceContent: `# Travaux Pratiques : Pipeline et Configuration YAML

## TP 1 : Premier pipeline

### Objectif
Créer un pipeline GitLab CI basique avec build, test et deploy.

### Étapes

\`\`\`yaml
# .gitlab-ci.yml
stages:
  - build
  - test
  - deploy

variables:
  APP_NAME: "formation-app"

build:
  stage: build
  image: node:18-alpine
  script:
    - echo "Building $APP_NAME..."
    - echo "Build complete" > build-info.txt
  artifacts:
    paths:
      - build-info.txt
    expire_in: 1 hour

test_unit:
  stage: test
  image: node:18-alpine
  script:
    - echo "Running unit tests..."
    - cat build-info.txt
    - echo "All tests passed!"

test_lint:
  stage: test
  image: node:18-alpine
  script:
    - echo "Running linter..."
    - echo "No issues found!"
  allow_failure: true

deploy_staging:
  stage: deploy
  script:
    - echo "Deploying to staging..."
    - echo "Version: $CI_COMMIT_SHORT_SHA"
  environment:
    name: staging
  rules:
    - if: '$CI_COMMIT_BRANCH == "develop"'
\`\`\`

## TP 2 : Cache et artifacts

### Objectif
Optimiser le pipeline avec le cache et les artifacts.

### Étapes

\`\`\`yaml
stages:
  - install
  - build
  - test

install:
  stage: install
  image: node:18
  cache:
    key: "$CI_COMMIT_REF_SLUG-npm"
    paths:
      - node_modules/
    policy: pull-push
  script:
    - npm ci
  artifacts:
    paths:
      - node_modules/
    expire_in: 30 minutes

build:
  stage: build
  image: node:18
  needs: [install]
  script:
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week

test:
  stage: test
  image: node:18
  needs: [install]
  script:
    - npm test
  artifacts:
    reports:
      junit: junit.xml
\`\`\`

## TP 3 : Rules et conditions

### Objectif
Configurer des conditions d'exécution avancées.

### Étapes

\`\`\`yaml
stages:
  - test
  - deploy

# Job qui ne s'exécute que sur les MR
test_mr:
  stage: test
  script:
    - echo "Testing MR from $CI_MERGE_REQUEST_SOURCE_BRANCH_NAME"
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'

# Job uniquement si des fichiers spécifiques changent
test_backend:
  stage: test
  script:
    - echo "Backend tests..."
  rules:
    - changes:
        - backend/**/*
        - package.json

# Deploy avec approbation manuelle
deploy_prod:
  stage: deploy
  script:
    - echo "Deploying to production..."
  environment:
    name: production
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
      when: manual
    - when: never
\`\`\`

## TP 4 : Templates et extends

### Objectif
Créer des templates réutilisables pour DRY.

### Étapes

\`\`\`yaml
# Template de base
.node_template:
  image: node:18
  cache:
    key: "$CI_COMMIT_REF_SLUG"
    paths:
      - node_modules/
  before_script:
    - npm ci

# Héritage
test_unit:
  extends: .node_template
  stage: test
  script:
    - npm run test:unit

test_integration:
  extends: .node_template
  stage: test
  script:
    - npm run test:integration
  services:
    - name: postgres:15
      alias: db

# Template de déploiement
.deploy_template:
  image: alpine:3.18
  before_script:
    - apk add --no-cache curl
  script:
    - echo "Deploying to $DEPLOY_ENV..."
    - curl -X POST "$WEBHOOK_URL" -d "version=$CI_COMMIT_SHORT_SHA"

deploy_staging:
  extends: .deploy_template
  stage: deploy
  variables:
    DEPLOY_ENV: staging
  environment:
    name: staging

deploy_prod:
  extends: .deploy_template
  stage: deploy
  variables:
    DEPLOY_ENV: production
  environment:
    name: production
  when: manual
\`\`\`

## TP 5 : Includes multi-fichiers

### Objectif
Organiser un pipeline complexe en plusieurs fichiers.

### Étapes

\`\`\`yaml
# .gitlab-ci.yml (fichier principal)
include:
  - local: '.gitlab/ci/build.yml'
  - local: '.gitlab/ci/test.yml'
  - local: '.gitlab/ci/deploy.yml'

stages:
  - build
  - test
  - deploy

variables:
  NODE_VERSION: "18"
\`\`\`

\`\`\`yaml
# .gitlab/ci/build.yml
build:
  stage: build
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
\`\`\`

\`\`\`yaml
# .gitlab/ci/test.yml
test:
  stage: test
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm test
\`\`\`

\`\`\`yaml
# .gitlab/ci/deploy.yml
deploy:
  stage: deploy
  script:
    - echo "Deploy..."
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
\`\`\`
`,
    keyPoints: JSON.stringify([
      '.gitlab-ci.yml à la racine définit le pipeline : stages séquentiels, jobs parallèles dans un stage',
      'Rules (if, changes, exists, when) contrôlent quand un job s\'exécute - remplace only/except',
      'Artifacts passent des fichiers entre jobs, cache persiste entre pipelines (node_modules)',
      'Extends et templates (.prefixed) évitent la duplication - includes pour les fichiers séparés',
      'Variables prédéfinies ($CI_COMMIT_SHA, $CI_PIPELINE_SOURCE, $CI_MERGE_REQUEST_*)',
      'needs: (DAG) permet à un job de démarrer dès que ses dépendances sont terminées',
      'Services lance des containers additionnels (postgres, redis) accessibles par le job',
      'allow_failure, retry, timeout, interruptible contrôlent le comportement des jobs'
    ]),
  },


  // ============================================================
  // GITLAB CI - Module 2: Runners et exécution
  // ============================================================
  {
    id: 'glci-02',
    courseId: 'gitlab-ci',
    title: 'Runners et exécution',
    duration: '3h30',
    orderIndex: 2,
    videoUrl: 'https://www.youtube.com/watch?v=G8ZONHOTAQo',
    theoryContent: `# Runners GitLab CI et Exécution

## 1. Types de Runners

| Type | Scope | Usage |
|------|-------|-------|
| Shared Runners | Tous les projets de l'instance | Fournis par GitLab.com, usage général |
| Group Runners | Tous les projets d'un groupe | Partagés au sein d'une équipe |
| Project Runners | Un seul projet | Dédiés, configuration spécifique |

## 2. Installation du Runner

### Linux (apt)

\`\`\`bash
# Ajouter le dépôt
curl -L "https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh" | sudo bash

# Installer
sudo apt-get install gitlab-runner

# Vérifier
gitlab-runner --version
sudo gitlab-runner status
\`\`\`

### Linux (RPM)

\`\`\`bash
curl -L "https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.rpm.sh" | sudo bash
sudo yum install gitlab-runner
\`\`\`

### Docker

\`\`\`bash
docker run -d --name gitlab-runner --restart always \\
    -v /srv/gitlab-runner/config:/etc/gitlab-runner \\
    -v /var/run/docker.sock:/var/run/docker.sock \\
    gitlab/gitlab-runner:latest
\`\`\`

## 3. Enregistrement du Runner

\`\`\`bash
# Enregistrement interactif
sudo gitlab-runner register

# Enregistrement non-interactif
sudo gitlab-runner register \\
    --non-interactive \\
    --url "https://gitlab.example.com/" \\
    --registration-token "PROJECT_REGISTRATION_TOKEN" \\
    --executor "docker" \\
    --docker-image "alpine:latest" \\
    --description "Docker Runner" \\
    --tag-list "docker,linux,production" \\
    --run-untagged="true" \\
    --locked="false"
\`\`\`

### Types d'executors

| Executor | Description | Usage |
|----------|-------------|-------|
| shell | Exécute directement sur le host | Simple, rapide, pas d'isolation |
| docker | Chaque job dans un container | Standard, isolation, reproductible |
| docker-machine | Provisionne des VMs à la demande | Auto-scaling cloud |
| kubernetes | Pods Kubernetes | Clusters K8s |
| virtualbox | VMs VirtualBox | Tests d'OS |
| ssh | Connexion SSH à une machine | Serveurs dédiés |

## 4. Configuration du Runner (config.toml)

\`\`\`toml
# /etc/gitlab-runner/config.toml
concurrent = 10
check_interval = 3
log_level = "info"

[session_server]
  session_timeout = 1800

[[runners]]
  name = "Docker Runner Production"
  url = "https://gitlab.example.com/"
  token = "runner-token-here"
  executor = "docker"
  
  [runners.custom_build_dir]
  
  [runners.cache]
    Type = "s3"
    Shared = true
    [runners.cache.s3]
      ServerAddress = "s3.amazonaws.com"
      BucketName = "gitlab-runner-cache"
      BucketLocation = "eu-west-1"
  
  [runners.docker]
    image = "node:18-alpine"
    privileged = false
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false
    
    # Volumes montés dans chaque job
    volumes = [
      "/cache",
      "/var/run/docker.sock:/var/run/docker.sock"
    ]
    
    # DNS personnalisé
    dns = ["8.8.8.8", "8.8.4.4"]
    
    # Réseau
    network_mode = "bridge"
    
    # Nettoyage
    pull_policy = ["if-not-present"]
    shm_size = 300000
    
    # Limites de ressources
    cpus = "2"
    memory = "4g"
    
    # Images autorisées
    allowed_images = ["node:*", "python:*", "docker:*"]
    allowed_services = ["postgres:*", "redis:*", "docker:*-dind"]
\`\`\`

## 5. Docker executor en détail

### Services (containers additionnels)

\`\`\`yaml
# Les services sont des containers liés au job
test_integration:
  stage: test
  image: node:18
  services:
    - name: postgres:15
      alias: db
      variables:
        POSTGRES_DB: test_db
        POSTGRES_USER: test_user
        POSTGRES_PASSWORD: test_pass
    
    - name: redis:7-alpine
      alias: cache
    
    - name: elasticsearch:8.10.0
      alias: search
      command: ["elasticsearch", "-Expack.security.enabled=false"]
  
  variables:
    DATABASE_URL: "postgres://test_user:test_pass@db:5432/test_db"
    REDIS_URL: "redis://cache:6379"
    ELASTICSEARCH_URL: "http://search:9200"
  
  script:
    - npm ci
    - npm run test:integration
\`\`\`

### Volumes et Docker-in-Docker

\`\`\`yaml
# Docker-in-Docker (build d'images dans le pipeline)
build_image:
  stage: build
  image: docker:24
  services:
    - docker:24-dind
  variables:
    DOCKER_TLS_CERTDIR: "/certs"
    DOCKER_HOST: "tcp://docker:2376"
    DOCKER_TLS_VERIFY: 1
    DOCKER_CERT_PATH: "/certs/client"
  script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA

# Alternative : Docker socket binding (plus rapide, moins isolé)
build_image_socket:
  stage: build
  image: docker:24
  variables:
    DOCKER_HOST: "unix:///var/run/docker.sock"
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA
\`\`\`

## 6. Kubernetes executor

\`\`\`toml
# config.toml pour Kubernetes executor
[[runners]]
  name = "Kubernetes Runner"
  url = "https://gitlab.example.com/"
  executor = "kubernetes"
  
  [runners.kubernetes]
    namespace = "gitlab-runners"
    image = "alpine:3.18"
    
    # Ressources par défaut
    cpu_request = "100m"
    cpu_limit = "1"
    memory_request = "128Mi"
    memory_limit = "1Gi"
    
    # Service account
    service_account = "gitlab-runner"
    
    # Node selector
    [runners.kubernetes.node_selector]
      "node-role" = "ci"
    
    # Pod annotations
    [runners.kubernetes.pod_annotations]
      "prometheus.io/scrape" = "true"
    
    # Volumes
    [[runners.kubernetes.volumes.host_path]]
      name = "docker-sock"
      mount_path = "/var/run/docker.sock"
      host_path = "/var/run/docker.sock"
\`\`\`

## 7. Stratégies de caching

### Cache local vs distribué

\`\`\`yaml
# Cache local (par runner)
cache:
  key: "$CI_COMMIT_REF_SLUG"
  paths:
    - node_modules/
    - .npm/
  policy: pull-push

# Cache avec fallback
cache:
  - key: "$CI_COMMIT_REF_SLUG"
    paths:
      - node_modules/
    policy: pull-push
  - key: "main"
    paths:
      - node_modules/
    policy: pull    # Fallback en lecture seule
\`\`\`

### Artifacts vs Cache

| Aspect | Artifacts | Cache |
|--------|-----------|-------|
| Durée | Configurable (expire_in) | Entre pipelines |
| Scope | Passé aux jobs suivants du pipeline | Partagé entre pipelines |
| Stockage | GitLab (S3/Object storage) | Runner local ou S3 |
| Usage | Build output, rapports, binaires | Dépendances (node_modules, .m2) |
| Fiabilité | Garanti | Best-effort (peut être vidé) |

## 8. DAG (Directed Acyclic Graph) avec needs

\`\`\`yaml
stages:
  - build
  - test
  - deploy

# Sans needs : tout le stage build doit finir avant test
# Avec needs : test_frontend démarre dès que build_frontend est fini

build_frontend:
  stage: build
  script: npm run build:frontend
  artifacts:
    paths: [dist/frontend/]

build_backend:
  stage: build
  script: npm run build:backend
  artifacts:
    paths: [dist/backend/]

test_frontend:
  stage: test
  needs: [build_frontend]    # N'attend pas build_backend !
  script: npm run test:frontend

test_backend:
  stage: test
  needs: [build_backend]
  script: npm run test:backend

deploy:
  stage: deploy
  needs: [test_frontend, test_backend]
  script: ./deploy.sh
\`\`\`

## 9. Parallel et Matrix

\`\`\`yaml
# Exécution parallèle simple
test:
  stage: test
  parallel: 4
  script:
    - npm run test -- --shard=$CI_NODE_INDEX/$CI_NODE_TOTAL

# Matrix (combinaisons)
test_matrix:
  stage: test
  parallel:
    matrix:
      - PYTHON_VERSION: ["3.9", "3.10", "3.11"]
        DATABASE: ["postgres", "mysql"]
  image: python:$PYTHON_VERSION
  services:
    - name: "$DATABASE:latest"
  script:
    - pip install -r requirements.txt
    - python -m pytest

# Matrix avec noms personnalisés
deploy_matrix:
  stage: deploy
  parallel:
    matrix:
      - ENVIRONMENT: [staging, production]
        REGION: [eu-west-1, us-east-1]
  script:
    - deploy.sh $ENVIRONMENT $REGION
  environment:
    name: "$ENVIRONMENT/$REGION"
\`\`\`
`,
    practiceContent: `# Travaux Pratiques : Runners et Exécution

## TP 1 : Installation d'un Runner Docker

### Objectif
Installer et configurer un GitLab Runner avec l'executor Docker.

### Étapes

\`\`\`bash
# 1. Installer le Runner
curl -L "https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh" | sudo bash
sudo apt-get install gitlab-runner

# 2. Enregistrer le Runner
sudo gitlab-runner register \\
    --non-interactive \\
    --url "https://gitlab.com/" \\
    --registration-token "YOUR_TOKEN" \\
    --executor "docker" \\
    --docker-image "node:18-alpine" \\
    --description "Docker Runner" \\
    --tag-list "docker,node"

# 3. Vérifier la configuration
sudo cat /etc/gitlab-runner/config.toml
sudo gitlab-runner status
sudo gitlab-runner list

# 4. Tester le runner
sudo gitlab-runner run --debug
\`\`\`

## TP 2 : Services et intégration

### Objectif
Configurer des services pour les tests d'intégration.

### Étapes

\`\`\`yaml
# .gitlab-ci.yml
test_integration:
  stage: test
  image: node:18
  services:
    - name: postgres:15-alpine
      alias: testdb
      variables:
        POSTGRES_DB: app_test
        POSTGRES_USER: testuser
        POSTGRES_PASSWORD: testpass
    - name: redis:7-alpine
      alias: cache
  variables:
    DATABASE_URL: "postgres://testuser:testpass@testdb:5432/app_test"
    REDIS_URL: "redis://cache:6379"
  script:
    - npm ci
    - npm run db:migrate
    - npm run test:integration
  artifacts:
    reports:
      junit: test-results.xml
\`\`\`

## TP 3 : Docker-in-Docker (build d'images)

### Objectif
Builder et pusher des images Docker dans le pipeline.

### Étapes

\`\`\`yaml
stages:
  - build
  - publish

build_image:
  stage: build
  image: docker:24
  services:
    - docker:24-dind
  variables:
    DOCKER_TLS_CERTDIR: "/certs"
  script:
    - docker build -t app:test .
    - docker run --rm app:test npm test

publish_image:
  stage: publish
  image: docker:24
  services:
    - docker:24-dind
  variables:
    DOCKER_TLS_CERTDIR: "/certs"
    IMAGE_TAG: "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA"
  script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker build -t $IMAGE_TAG .
    - docker push $IMAGE_TAG
    - |
      if [ "$CI_COMMIT_BRANCH" == "main" ]; then
        docker tag $IMAGE_TAG $CI_REGISTRY_IMAGE:latest
        docker push $CI_REGISTRY_IMAGE:latest
      fi
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
\`\`\`

## TP 4 : Optimisation avec DAG et parallel

### Objectif
Accélérer le pipeline avec le DAG et l'exécution parallèle.

### Étapes

\`\`\`yaml
stages:
  - install
  - build
  - test
  - deploy

install:
  stage: install
  image: node:18
  script:
    - npm ci
  cache:
    key: "$CI_COMMIT_REF_SLUG"
    paths:
      - node_modules/

build_frontend:
  stage: build
  needs: [install]
  script:
    - npm run build:frontend
  artifacts:
    paths: [dist/frontend/]

build_backend:
  stage: build
  needs: [install]
  script:
    - npm run build:backend
  artifacts:
    paths: [dist/backend/]

# Tests parallèles
test:
  stage: test
  parallel: 3
  needs: [build_frontend, build_backend]
  script:
    - npm run test -- --shard=$CI_NODE_INDEX/$CI_NODE_TOTAL
\`\`\`

## TP 5 : Cache distribué (S3)

### Objectif
Configurer un cache distribué pour des runners multiples.

### Étapes

\`\`\`toml
# /etc/gitlab-runner/config.toml
[[runners]]
  name = "Runner with S3 cache"
  executor = "docker"
  
  [runners.cache]
    Type = "s3"
    Shared = true
    [runners.cache.s3]
      ServerAddress = "s3.amazonaws.com"
      BucketName = "my-runner-cache"
      BucketLocation = "eu-west-1"
      AuthenticationType = "iam"
\`\`\`

\`\`\`yaml
# Utilisation dans le pipeline
install:
  cache:
    key:
      files:
        - package-lock.json
    paths:
      - node_modules/
    policy: pull-push
  script:
    - npm ci
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Runners exécutent les jobs : shared (instance), group (équipe), project (dédié)',
      'L\'executor Docker lance chaque job dans un container isolé et reproductible',
      'Docker-in-Docker (dind) permet de builder des images Docker dans le pipeline',
      'Services lance des containers additionnels (DB, cache) accessibles par alias',
      'config.toml configure le runner : concurrent, volumes, limits, pull_policy, cache',
      'Le Kubernetes executor crée un Pod par job avec resource limits et node selectors',
      'needs: (DAG) permet l\'exécution parallèle sans attendre la fin du stage complet',
      'parallel: matrix exécute un job avec toutes les combinaisons de variables'
    ]),
  },


  // ============================================================
  // GITLAB CI - Module 3: Déploiement et bonnes pratiques
  // ============================================================
  {
    id: 'glci-03',
    courseId: 'gitlab-ci',
    title: 'Déploiement et bonnes pratiques',
    duration: '3h',
    orderIndex: 3,
    videoUrl: 'https://www.youtube.com/watch?v=PGyhBwLyK2U',
    theoryContent: `# Déploiement et Bonnes Pratiques GitLab CI

## 1. Environments

Les environnements trackent les déploiements :

\`\`\`yaml
deploy_staging:
  stage: deploy
  script:
    - ./deploy.sh staging
  environment:
    name: staging
    url: https://staging.example.com
    on_stop: stop_staging
    auto_stop_in: 1 week
  rules:
    - if: '$CI_COMMIT_BRANCH == "develop"'

stop_staging:
  stage: deploy
  script:
    - ./teardown.sh staging
  environment:
    name: staging
    action: stop
  rules:
    - if: '$CI_COMMIT_BRANCH == "develop"'
      when: manual

deploy_production:
  stage: deploy
  script:
    - ./deploy.sh production
  environment:
    name: production
    url: https://app.example.com
  resource_group: production
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
      when: manual
\`\`\`

### Review Apps (environnements dynamiques par MR)

\`\`\`yaml
deploy_review:
  stage: deploy
  script:
    - echo "Deploying review app for MR !$CI_MERGE_REQUEST_IID"
    - kubectl apply -f k8s/ --namespace review-$CI_MERGE_REQUEST_IID
  environment:
    name: review/$CI_COMMIT_REF_SLUG
    url: https://$CI_COMMIT_REF_SLUG.review.example.com
    on_stop: stop_review
    auto_stop_in: 2 days
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'

stop_review:
  stage: deploy
  script:
    - kubectl delete namespace review-$CI_MERGE_REQUEST_IID
  environment:
    name: review/$CI_COMMIT_REF_SLUG
    action: stop
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      when: manual
\`\`\`

## 2. Stratégies de déploiement

### Rolling deployment

\`\`\`yaml
deploy_rolling:
  stage: deploy
  script:
    - kubectl set image deployment/app app=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA
    - kubectl rollout status deployment/app --timeout=300s
  environment:
    name: production
\`\`\`

### Blue-Green deployment

\`\`\`yaml
deploy_green:
  stage: deploy
  script:
    - |
      # Déployer sur l'environnement "green"
      kubectl apply -f k8s/deployment-green.yml
      kubectl set image deployment/app-green app=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA
      kubectl rollout status deployment/app-green
      
      # Tester
      HEALTH=$(curl -s -o /dev/null -w "%{http_code}" http://app-green-internal/health)
      if [ "$HEALTH" != "200" ]; then exit 1; fi
      
      # Switcher le traffic
      kubectl patch service app -p '{"spec":{"selector":{"version":"green"}}}'
  environment:
    name: production

rollback_blue:
  stage: deploy
  script:
    - kubectl patch service app -p '{"spec":{"selector":{"version":"blue"}}}'
  environment:
    name: production
  when: manual
\`\`\`

### Canary deployment

\`\`\`yaml
deploy_canary:
  stage: deploy
  script:
    - |
      # Déployer 10% du traffic sur la nouvelle version
      kubectl apply -f k8s/canary.yml
      kubectl set image deployment/app-canary app=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA
      # Le canary reçoit 10% du traffic via le Service
  environment:
    name: production/canary

promote_canary:
  stage: deploy
  script:
    - |
      # Promouvoir le canary en production complète
      kubectl set image deployment/app app=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA
      kubectl rollout status deployment/app
      kubectl delete deployment app-canary
  needs: [deploy_canary]
  when: manual
  environment:
    name: production
\`\`\`

## 3. Container Registry

GitLab inclut un container registry intégré :

\`\`\`yaml
variables:
  DOCKER_IMAGE: "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA"
  DOCKER_IMAGE_LATEST: "$CI_REGISTRY_IMAGE:latest"

build_and_push:
  stage: build
  image: docker:24
  services:
    - docker:24-dind
  script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker build --cache-from $DOCKER_IMAGE_LATEST -t $DOCKER_IMAGE -t $DOCKER_IMAGE_LATEST .
    - docker push $DOCKER_IMAGE
    - docker push $DOCKER_IMAGE_LATEST
\`\`\`

## 4. Security Scanning

\`\`\`yaml
include:
  # SAST (Static Application Security Testing)
  - template: Security/SAST.gitlab-ci.yml
  
  # Dependency Scanning
  - template: Security/Dependency-Scanning.gitlab-ci.yml
  
  # Container Scanning
  - template: Security/Container-Scanning.gitlab-ci.yml
  
  # DAST (Dynamic Application Security Testing)
  - template: Security/DAST.gitlab-ci.yml
  
  # Secret Detection
  - template: Security/Secret-Detection.gitlab-ci.yml
  
  # License Scanning
  - template: Security/License-Scanning.gitlab-ci.yml

# Override des variables pour le container scanning
container_scanning:
  variables:
    CS_IMAGE: "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA"

# DAST nécessite une URL à scanner
dast:
  variables:
    DAST_WEBSITE: "https://staging.example.com"
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
\`\`\`

## 5. Release management

\`\`\`yaml
release_job:
  stage: deploy
  image: registry.gitlab.com/gitlab-org/release-cli:latest
  rules:
    - if: '$CI_COMMIT_TAG =~ /^v\\d+\\.\\d+\\.\\d+$/'
  script:
    - echo "Creating release for $CI_COMMIT_TAG"
  release:
    tag_name: $CI_COMMIT_TAG
    name: "Release $CI_COMMIT_TAG"
    description: |
      ## Changes in this release
      $CI_COMMIT_MESSAGE
    assets:
      links:
        - name: "Docker Image"
          url: "https://$CI_REGISTRY_IMAGE:$CI_COMMIT_TAG"
        - name: "Documentation"
          url: "https://docs.example.com/releases/$CI_COMMIT_TAG"
\`\`\`

## 6. Multi-project et Parent-Child Pipelines

### Multi-project pipeline

\`\`\`yaml
# Déclencher un pipeline dans un autre projet
trigger_deploy:
  stage: deploy
  trigger:
    project: devops/infrastructure
    branch: main
    strategy: depend    # Attendre la fin du pipeline déclenché
  variables:
    APP_VERSION: $CI_COMMIT_SHORT_SHA
    DEPLOY_ENV: production
\`\`\`

### Parent-Child pipeline

\`\`\`yaml
# Parent pipeline
generate_child:
  stage: build
  script:
    - ./generate-ci-config.sh > child-pipeline.yml
  artifacts:
    paths:
      - child-pipeline.yml

trigger_child:
  stage: deploy
  trigger:
    include:
      - artifact: child-pipeline.yml
        job: generate_child
    strategy: depend
\`\`\`

## 7. Compliance et gouvernance

\`\`\`yaml
# Compliance pipeline (appliqué à tous les projets d'un groupe)
# Settings > General > Compliance frameworks

include:
  - project: 'compliance/templates'
    file: '/required-scans.yml'

# Jobs obligatoires
security_scan:
  stage: test
  script:
    - run-security-scan
  rules:
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
  allow_failure: false
\`\`\`

## 8. Auto DevOps

GitLab Auto DevOps fournit un pipeline prêt à l'emploi :
- Auto Build (Dockerfile ou buildpacks)
- Auto Test
- Auto Code Quality
- Auto SAST/DAST
- Auto Deploy (Kubernetes)
- Auto Monitoring

\`\`\`yaml
# Activer Auto DevOps avec personnalisation
include:
  - template: Auto-DevOps.gitlab-ci.yml

variables:
  AUTO_DEVOPS_PLATFORM_TARGET: "ECS"
  KUBE_NAMESPACE: "production"
  POSTGRES_ENABLED: "true"
\`\`\`

## 9. Bonnes pratiques

| Pratique | Description |
|----------|-------------|
| Fail fast | Lancer les tests rapides en premier |
| Cache intelligent | key basé sur package-lock.json |
| DAG (needs) | Paralléliser au maximum |
| Templates | Factoriser avec extends et includes |
| Environments | Tracker tous les déploiements |
| Manual gates | Approbation pour la production |
| Security scanning | SAST + dependency scan sur chaque MR |
| Artifacts reports | junit, cobertura pour la visibilité |
| Resource groups | Sérialiser les déploiements |
| Review Apps | Un environnement par MR |

### Pipeline optimisé : template de référence

\`\`\`yaml
# Structure recommandée
stages:
  - install
  - build
  - test
  - security
  - publish
  - deploy

# Cache intelligent basé sur le lockfile
.node_cache:
  cache:
    key:
      files:
        - package-lock.json
    paths:
      - node_modules/

# Workflow rules (quand le pipeline s'exécute)
workflow:
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
    - if: '$CI_COMMIT_TAG'
\`\`\`
`,
    practiceContent: `# Travaux Pratiques : Déploiement et Bonnes Pratiques

## TP 1 : Environments et Review Apps

### Objectif
Configurer des environnements avec déploiement automatique et Review Apps.

### Étapes

\`\`\`yaml
stages:
  - build
  - deploy
  - cleanup

build:
  stage: build
  script:
    - echo "Building app..."
  artifacts:
    paths: [dist/]

# Review App par MR
deploy_review:
  stage: deploy
  script:
    - echo "Deploying review app: review-$CI_COMMIT_REF_SLUG"
  environment:
    name: review/$CI_COMMIT_REF_SLUG
    url: https://$CI_COMMIT_REF_SLUG.review.example.com
    on_stop: stop_review
    auto_stop_in: 3 days
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'

stop_review:
  stage: cleanup
  script:
    - echo "Stopping review app..."
  environment:
    name: review/$CI_COMMIT_REF_SLUG
    action: stop
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      when: manual

# Staging auto
deploy_staging:
  stage: deploy
  script:
    - echo "Deploying to staging..."
  environment:
    name: staging
    url: https://staging.example.com
  rules:
    - if: '$CI_COMMIT_BRANCH == "develop"'

# Production manual
deploy_production:
  stage: deploy
  script:
    - echo "Deploying to production..."
  environment:
    name: production
    url: https://example.com
  resource_group: production
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
      when: manual
\`\`\`

## TP 2 : Pipeline de release

### Objectif
Automatiser la création de releases avec tag et changelog.

### Étapes

\`\`\`yaml
stages:
  - build
  - test
  - release

build:
  stage: build
  script:
    - echo "Build v$CI_COMMIT_TAG" > VERSION
  artifacts:
    paths: [VERSION]
  rules:
    - if: '$CI_COMMIT_TAG'

test:
  stage: test
  script:
    - echo "Testing..."
  rules:
    - if: '$CI_COMMIT_TAG'

release:
  stage: release
  image: registry.gitlab.com/gitlab-org/release-cli:latest
  script:
    - echo "Creating release for $CI_COMMIT_TAG"
  release:
    tag_name: $CI_COMMIT_TAG
    name: "Release $CI_COMMIT_TAG"
    description: "Automated release for $CI_COMMIT_TAG"
  rules:
    - if: '$CI_COMMIT_TAG =~ /^v[0-9]+\\.[0-9]+\\.[0-9]+$/'
\`\`\`

## TP 3 : Security scanning

### Objectif
Intégrer les scans de sécurité dans le pipeline.

### Étapes

\`\`\`yaml
include:
  - template: Security/SAST.gitlab-ci.yml
  - template: Security/Secret-Detection.gitlab-ci.yml
  - template: Security/Dependency-Scanning.gitlab-ci.yml

stages:
  - build
  - test
  - security
  - deploy

build:
  stage: build
  script:
    - npm ci && npm run build

test:
  stage: test
  script:
    - npm test

# Les jobs de sécurité sont auto-inclus par les templates
# Ils s'exécutent dans le stage "test" par défaut

# Bloquer le deploy si vulnérabilités critiques
deploy:
  stage: deploy
  script:
    - echo "Deploy..."
  needs: [sast, secret_detection, dependency_scanning]
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
\`\`\`

## TP 4 : Multi-project pipeline

### Objectif
Déclencher des pipelines dans d'autres projets.

### Étapes

\`\`\`yaml
# Projet A (application)
stages:
  - build
  - test
  - trigger

build:
  stage: build
  script: npm run build

test:
  stage: test
  script: npm test

# Déclencher le pipeline d'infra
trigger_deploy:
  stage: trigger
  trigger:
    project: devops/infrastructure
    branch: main
    strategy: depend
  variables:
    APP_VERSION: $CI_COMMIT_SHORT_SHA
    APP_NAME: $CI_PROJECT_NAME
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
\`\`\`

\`\`\`yaml
# Projet B (infrastructure) - déclenché par Projet A
stages:
  - deploy

deploy:
  stage: deploy
  script:
    - echo "Deploying $APP_NAME version $APP_VERSION"
    - kubectl set image deployment/$APP_NAME app=registry/$APP_NAME:$APP_VERSION
\`\`\`

## TP 5 : Pipeline complet de production

### Objectif
Assembler un pipeline complet avec toutes les bonnes pratiques.

### Étapes

\`\`\`yaml
# Pipeline de production complet
workflow:
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
    - if: '$CI_COMMIT_TAG'

stages:
  - install
  - build
  - test
  - security
  - publish
  - deploy

.node_base:
  image: node:18
  cache:
    key:
      files: [package-lock.json]
    paths: [node_modules/]

install:
  extends: .node_base
  stage: install
  script:
    - npm ci

build:
  extends: .node_base
  stage: build
  needs: [install]
  script:
    - npm run build
  artifacts:
    paths: [dist/]

test:
  extends: .node_base
  stage: test
  needs: [install]
  parallel: 3
  script:
    - npm run test -- --shard=$CI_NODE_INDEX/$CI_NODE_TOTAL
  artifacts:
    reports:
      junit: junit.xml

publish:
  stage: publish
  image: docker:24
  services: [docker:24-dind]
  needs: [build, test]
  script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'

deploy_prod:
  stage: deploy
  needs: [publish]
  script:
    - kubectl set image deploy/app app=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA
  environment:
    name: production
    url: https://app.example.com
  resource_group: production
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
      when: manual
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Environments trackent les déploiements avec name, url, on_stop, auto_stop_in',
      'Review Apps créent un environnement éphémère par Merge Request pour les tests',
      'Stratégies de déploiement : rolling (K8s natif), blue-green (switch), canary (progressif)',
      'Le Container Registry GitLab intégré stocke les images Docker du projet ($CI_REGISTRY_IMAGE)',
      'Security scanning : SAST, DAST, Dependency Scanning, Container Scanning, Secret Detection',
      'release: keyword crée des releases GitLab avec tag, description et assets',
      'Multi-project pipelines déclenchent des pipelines cross-projets avec trigger:',
      'resource_group sérialise les déploiements pour éviter les conflits concurrents'
    ]),
  },


  // ============================================================
  // GIT AVANCÉ - Module 1: Rebase, Cherry-pick et Bisect
  // ============================================================
  {
    id: 'git-01',
    courseId: 'git-avance',
    title: 'Rebase, Cherry-pick et Bisect',
    duration: '3h30',
    orderIndex: 1,
    videoUrl: 'https://www.youtube.com/watch?v=f1wnYdLEpgI',
    theoryContent: `# Rebase, Cherry-pick et Bisect

## 1. Git Rebase

Le rebase réécrit l'historique en réappliquant les commits sur une nouvelle base. Il produit un historique linéaire et plus propre qu'un merge.

### Rebase simple

\`\`\`bash
# Situation initiale :
#         A---B---C  (feature)
#        /
#   D---E---F---G  (main)

# Après rebase de feature sur main :
#                 A'--B'--C'  (feature)
#                /
#   D---E---F---G  (main)

git checkout feature
git rebase main

# Ou en une commande
git rebase main feature
\`\`\`

### Rebase interactif (-i)

\`\`\`bash
# Réécrire les N derniers commits
git rebase -i HEAD~5

# Réécrire depuis un commit spécifique
git rebase -i abc1234

# Réécrire depuis la divergence avec main
git rebase -i main
\`\`\`

### Commandes du rebase interactif

L'éditeur affiche :

\`\`\`
pick abc1234 feat: add login page
pick def5678 fix: typo in login
pick ghi9012 feat: add validation
pick jkl3456 wip: debugging
pick mno7890 feat: complete login feature
\`\`\`

| Commande | Abréviation | Description |
|----------|-------------|-------------|
| pick | p | Garder le commit tel quel |
| reword | r | Garder le commit, modifier le message |
| edit | e | S'arrêter pour modifier le commit |
| squash | s | Fusionner avec le commit précédent (garder les 2 messages) |
| fixup | f | Fusionner avec le précédent (jeter le message) |
| drop | d | Supprimer le commit |
| exec | x | Exécuter une commande shell |

### Exemple : squash de commits

\`\`\`bash
# Avant : 5 commits pour une seule feature
git rebase -i HEAD~5

# Dans l'éditeur, changer en :
pick abc1234 feat: add login page
fixup def5678 fix: typo in login
fixup ghi9012 feat: add validation
drop jkl3456 wip: debugging
fixup mno7890 feat: complete login feature

# Résultat : 1 seul commit propre
\`\`\`

### Rebase --onto

Réapplique une branche sur une base différente :

\`\`\`bash
# Situation :
#         A---B---C  (feature-b, basée sur feature-a)
#        /
#   D---E---F  (feature-a)
#        /
#   G---H  (main)

# Rebaser feature-b directement sur main (sans les commits de feature-a)
git rebase --onto main feature-a feature-b

# Résultat :
#             A'--B'--C'  (feature-b)
#            /
#   G---H  (main)
#        \\
#         D---E---F  (feature-a)
\`\`\`

### Résolution de conflits pendant un rebase

\`\`\`bash
# Si un conflit survient pendant le rebase
git rebase main
# CONFLICT in file.js

# 1. Résoudre le conflit dans le fichier
vim file.js

# 2. Marquer comme résolu
git add file.js

# 3. Continuer le rebase
git rebase --continue

# OU abandonner le rebase
git rebase --abort

# OU sauter ce commit
git rebase --skip
\`\`\`

## 2. Cherry-pick

Cherry-pick applique un commit spécifique d'une branche sur une autre, sans merger toute la branche.

### Utilisation basique

\`\`\`bash
# Appliquer un seul commit
git cherry-pick abc1234

# Appliquer plusieurs commits
git cherry-pick abc1234 def5678 ghi9012

# Appliquer un range de commits
git cherry-pick abc1234..ghi9012    # Exclusif (n'inclut pas abc1234)
git cherry-pick abc1234^..ghi9012   # Inclusif

# Sans commit (staging only)
git cherry-pick --no-commit abc1234
git cherry-pick -n abc1234

# Modifier le message
git cherry-pick --edit abc1234

# Ajouter une référence au commit original dans le message
git cherry-pick -x abc1234
# Ajoute "(cherry picked from commit abc1234)" dans le message
\`\`\`

### Résolution de conflits

\`\`\`bash
# Si conflit pendant cherry-pick
git cherry-pick abc1234
# CONFLICT

# Résoudre et continuer
git add .
git cherry-pick --continue

# Ou abandonner
git cherry-pick --abort

# Ou skip
git cherry-pick --skip
\`\`\`

### Cas d'usage

- **Hotfix** : appliquer un fix de main sur une branche release
- **Backport** : porter un fix vers une ancienne version
- **Feature partielle** : prendre certains commits d'une feature

## 3. Git Bisect

Bisect utilise une recherche binaire pour trouver le commit qui a introduit un bug.

### Utilisation manuelle

\`\`\`bash
# 1. Démarrer la recherche
git bisect start

# 2. Marquer le commit actuel comme mauvais (le bug est présent)
git bisect bad

# 3. Marquer un commit connu bon (avant le bug)
git bisect good v1.0
# ou
git bisect good abc1234

# 4. Git checkout un commit au milieu
# Tester manuellement si le bug est présent...

# 5. Indiquer le résultat
git bisect good    # Pas de bug ici → le bug est après
# ou
git bisect bad     # Bug présent → le bug est avant ou ici

# 6. Répéter jusqu'à trouver le commit fautif
# Git affiche : "abc1234 is the first bad commit"

# 7. Revenir à l'état normal
git bisect reset
\`\`\`

### Bisect automatique avec un script

\`\`\`bash
# Exécuter automatiquement un test à chaque étape
git bisect start HEAD v1.0
git bisect run npm test

# Avec un script personnalisé
git bisect start HEAD v1.0
git bisect run ./test-bug.sh
# Le script doit retourner 0 (good) ou 1-127 (bad, sauf 125=skip)

# Exemple de script
cat > test-bug.sh << 'EOF'
#!/bin/bash
npm run build 2>/dev/null || exit 125  # Skip si build échoue
npm test -- --grep "login test" 2>/dev/null
EOF
chmod +x test-bug.sh

# Skip un commit (ne peut pas être testé)
git bisect skip
\`\`\`

### Visualiser le bisect

\`\`\`bash
# Voir l'historique du bisect
git bisect log

# Rejouer un bisect
git bisect log > bisect.log
git bisect replay bisect.log

# Visualiser graphiquement
git bisect visualize
# ou
git bisect view
\`\`\`

## 4. Reflog (Journal de référence)

Le reflog enregistre TOUTES les modifications de HEAD, même celles qui ne sont pas dans l'historique normal. C'est votre filet de sécurité.

\`\`\`bash
# Voir le reflog
git reflog
git reflog show HEAD
git reflog show main

# Sortie typique :
# abc1234 HEAD@{0}: commit: feat: add login
# def5678 HEAD@{1}: rebase (finish): ...
# ghi9012 HEAD@{2}: rebase (start): ...
# jkl3456 HEAD@{3}: checkout: moving from main to feature

# Récupérer un commit "perdu" (après un reset --hard, rebase, etc.)
git checkout HEAD@{5}
git branch recovered-branch HEAD@{5}
git cherry-pick HEAD@{5}

# Annuler un rebase
git reset --hard HEAD@{3}  # Revenir à l'état avant le rebase

# Voir les actions des 2 dernières heures
git reflog --since="2 hours ago"

# Expiration du reflog
git reflog expire --expire=90.days.ago --all
git gc --prune=now
\`\`\`

## 5. Git Stash

Le stash sauvegarde temporairement les modifications non committées.

\`\`\`bash
# Stasher les modifications
git stash                          # Working dir + staged
git stash push -m "WIP: feature"  # Avec un message
git stash push -p                  # Sélectif (interactif)
git stash --include-untracked      # Inclure les fichiers non suivis
git stash --all                    # Inclure les fichiers ignorés

# Lister les stashes
git stash list
# stash@{0}: WIP on feature: abc1234 commit message
# stash@{1}: On main: def5678 work in progress

# Restaurer un stash
git stash pop                      # Applique et supprime le dernier stash
git stash apply                    # Applique sans supprimer
git stash apply stash@{2}         # Applique un stash spécifique

# Voir le contenu d'un stash
git stash show                     # Diff résumé
git stash show -p                  # Diff complet
git stash show stash@{1} -p

# Supprimer des stashes
git stash drop                     # Supprimer le dernier
git stash drop stash@{2}          # Supprimer un spécifique
git stash clear                    # Supprimer tous les stashes

# Créer une branche depuis un stash
git stash branch new-feature stash@{0}
\`\`\`

## 6. Git Worktrees

Les worktrees permettent d'avoir plusieurs checkouts du même repo simultanément.

\`\`\`bash
# Créer un worktree (nouveau répertoire avec une branche)
git worktree add ../hotfix-branch hotfix/critical
git worktree add ../feature-x feature/new-feature
git worktree add ../main-checkout main

# Créer un worktree avec une nouvelle branche
git worktree add -b new-feature ../new-feature main

# Lister les worktrees
git worktree list

# Supprimer un worktree
git worktree remove ../hotfix-branch

# Nettoyer les worktrees
git worktree prune
\`\`\`

**Cas d'usage** :
- Travailler sur un hotfix sans perdre le contexte de la feature en cours
- Comparer deux branches côte à côte
- Build/test d'une branche pendant que vous codez sur une autre

## 7. Règles d'or du rebase

| Règle | Description |
|-------|-------------|
| Ne JAMAIS rebase des commits pushés | Réécrit l'historique partagé → conflits pour tous |
| Rebase avant le merge | git pull --rebase pour un historique propre |
| Squash les WIP | Nettoyer avant de pousser sur la branche partagée |
| Garder les messages clairs | Utiliser reword pour des messages descriptifs |
| Sauvegarder avant | git branch backup-feature avant un rebase risqué |
`,
    practiceContent: `# Travaux Pratiques : Rebase, Cherry-pick et Bisect

## TP 1 : Rebase interactif

### Objectif
Nettoyer un historique de commits avec le rebase interactif.

### Étapes

\`\`\`bash
# 1. Créer un repo de test
mkdir git-tp && cd git-tp && git init

# 2. Créer des commits "sales"
echo "base" > app.js && git add . && git commit -m "init"
echo "feature start" >> app.js && git add . && git commit -m "wip"
echo "more work" >> app.js && git add . && git commit -m "wip2"
echo "fix typo" >> app.js && git add . && git commit -m "fix typo"
echo "feature done" >> app.js && git add . && git commit -m "complete feature"

# 3. Voir l'historique
git log --oneline

# 4. Nettoyer avec rebase interactif
git rebase -i HEAD~4
# Changer en :
# pick ... wip
# fixup ... wip2
# fixup ... fix typo
# fixup ... complete feature

# 5. Vérifier le résultat (1 seul commit propre)
git log --oneline
\`\`\`

## TP 2 : Cherry-pick entre branches

### Objectif
Porter un fix d'une branche vers une autre.

### Étapes

\`\`\`bash
# 1. Setup
git checkout -b release/1.0
echo "v1.0" > version.txt && git add . && git commit -m "release 1.0"

git checkout main
echo "v2.0-dev" > version.txt && git add . && git commit -m "start v2.0"

# 2. Créer un fix sur main
echo "bugfix" > fix.js && git add . && git commit -m "fix: critical security bug"
git log --oneline -1  # Noter le hash

# 3. Porter le fix sur la release
git checkout release/1.0
git cherry-pick -x <hash-du-fix>

# 4. Vérifier
git log --oneline -3
cat fix.js  # Le fix est présent
\`\`\`

## TP 3 : Git Bisect

### Objectif
Trouver le commit qui a introduit un bug.

### Étapes

\`\`\`bash
# 1. Créer un historique avec un bug caché
git checkout main
for i in $(seq 1 10); do
    echo "commit $i" >> history.txt
    git add . && git commit -m "commit $i"
done

# Introduire un "bug" au commit 6
git rebase -i HEAD~5
# Ajouter après le commit 6 : exec echo "BUG" > bug.txt && git add . && git commit --amend --no-edit

# 2. Créer un script de test
cat > test.sh << 'EOF'
#!/bin/bash
if [ -f bug.txt ]; then
    exit 1  # bad
else
    exit 0  # good
fi
EOF
chmod +x test.sh

# 3. Lancer bisect
git bisect start
git bisect bad HEAD
git bisect good HEAD~10
git bisect run ./test.sh

# 4. Résultat : le commit fautif est identifié
git bisect reset
\`\`\`

## TP 4 : Stash avancé

### Objectif
Maîtriser les stashes pour le multitasking.

### Étapes

\`\`\`bash
# 1. Travailler sur une feature
echo "feature work" > feature.js
echo "more work" > utils.js
git add feature.js  # Staged
# utils.js est untracked

# 2. Stash avec message et untracked
git stash push -m "WIP: new feature" --include-untracked
git status  # Clean

# 3. Travailler sur un hotfix
echo "hotfix" > hotfix.js && git add . && git commit -m "hotfix applied"

# 4. Revenir à la feature
git stash list
git stash pop

# 5. Stash sélectif
echo "change1" > file1.js
echo "change2" > file2.js
git add file1.js file2.js
git stash push -m "only file1" -- file1.js
git status  # file2.js toujours là
\`\`\`

## TP 5 : Reflog et recovery

### Objectif
Récupérer du travail "perdu" avec le reflog.

### Étapes

\`\`\`bash
# 1. Créer des commits
echo "important work" > important.js
git add . && git commit -m "very important commit"
echo "more work" >> important.js
git add . && git commit -m "additional work"

# 2. "Perdre" le travail avec un reset
git log --oneline
git reset --hard HEAD~2
git log --oneline  # Les commits ont disparu !

# 3. Les retrouver dans le reflog
git reflog
# Repérer le hash du commit "very important commit"

# 4. Récupérer
git cherry-pick <hash>
# ou
git branch recovered <hash>
git merge recovered

# 5. Vérifier
cat important.js  # Le travail est récupéré !
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Rebase réapplique les commits sur une nouvelle base pour un historique linéaire sans merge commits',
      'Rebase -i (interactif) permet pick, squash, fixup, reword, edit, drop pour nettoyer l\'historique',
      'RÈGLE D\'OR : ne jamais rebase des commits déjà poussés sur une branche partagée',
      'Cherry-pick applique un commit spécifique sur la branche courante (-x ajoute la référence)',
      'Bisect utilise une recherche binaire pour trouver le commit qui a introduit un bug',
      'Le reflog enregistre toutes les modifications de HEAD - filet de sécurité pour récupérer du travail',
      'Stash sauvegarde temporairement les modifications (push -m, pop, apply, show -p, branch)',
      'Worktrees permettent plusieurs checkouts simultanés du même repo dans des répertoires séparés'
    ]),
  },


  // ============================================================
  // GIT AVANCÉ - Module 2: Hooks et automatisation
  // ============================================================
  {
    id: 'git-02',
    courseId: 'git-avance',
    title: 'Hooks et automatisation',
    duration: '3h30',
    orderIndex: 2,
    videoUrl: 'https://www.youtube.com/watch?v=ZZKIRuAMBSc',
    theoryContent: `# Hooks Git et Automatisation

## 1. Introduction aux Hooks Git

Les hooks sont des scripts exécutés automatiquement par Git lors d'événements spécifiques. Ils se trouvent dans \\\`.git/hooks/\\\` et doivent être exécutables.

### Types de hooks

\`\`\`
+----------------------------------------------------------+
|                    HOOKS GIT                              |
+----------------------------------------------------------+
|                                                          |
|  CLIENT-SIDE (développeur)                              |
|  +--------------------+  +--------------------+         |
|  | pre-commit         |  | prepare-commit-msg |         |
|  | (lint, format)     |  | (template message) |         |
|  +--------------------+  +--------------------+         |
|  +--------------------+  +--------------------+         |
|  | commit-msg         |  | post-commit        |         |
|  | (valider message)  |  | (notification)     |         |
|  +--------------------+  +--------------------+         |
|  +--------------------+  +--------------------+         |
|  | pre-rebase         |  | pre-push           |         |
|  | (vérifications)    |  | (tests, lint)      |         |
|  +--------------------+  +--------------------+         |
|  +--------------------+  +--------------------+         |
|  | post-checkout      |  | post-merge         |         |
|  | (npm install)      |  | (npm install)      |         |
|  +--------------------+  +--------------------+         |
|                                                          |
|  SERVER-SIDE (serveur Git)                              |
|  +--------------------+  +--------------------+         |
|  | pre-receive        |  | update             |         |
|  | (policy check)     |  | (per-branch check) |         |
|  +--------------------+  +--------------------+         |
|  +--------------------+                                 |
|  | post-receive       |                                 |
|  | (CI/CD trigger)    |                                 |
|  +--------------------+                                 |
+----------------------------------------------------------+
\`\`\`

## 2. Hooks côté client

### pre-commit

Exécuté avant chaque commit. Si le script retourne un code non-zero, le commit est annulé.

\`\`\`bash
#!/bin/bash
# .git/hooks/pre-commit

echo "Running pre-commit checks..."

# 1. Linter
npm run lint --silent
if [ $? -ne 0 ]; then
    echo "❌ Lint failed! Please fix errors before committing."
    exit 1
fi

# 2. Formatter check
npm run format:check --silent
if [ $? -ne 0 ]; then
    echo "❌ Code not formatted! Run 'npm run format' first."
    exit 1
fi

# 3. Pas de console.log dans les fichiers staged
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\\.(js|ts|jsx|tsx)$')
if echo "$STAGED_FILES" | xargs grep -l 'console\\.log' 2>/dev/null; then
    echo "❌ console.log found in staged files! Please remove."
    exit 1
fi

# 4. Pas de fichiers volumineux
MAX_SIZE=5242880  # 5MB
for file in $(git diff --cached --name-only); do
    size=$(wc -c < "$file" 2>/dev/null || echo 0)
    if [ $size -gt $MAX_SIZE ]; then
        echo "❌ File $file is too large ($(($size/1024))KB > 5MB)"
        exit 1
    fi
done

echo "✅ All pre-commit checks passed!"
exit 0
\`\`\`

### prepare-commit-msg

Modifie le message de commit avant que l'éditeur ne s'ouvre :

\`\`\`bash
#!/bin/bash
# .git/hooks/prepare-commit-msg
COMMIT_MSG_FILE=$1
COMMIT_SOURCE=$2

# Ajouter le nom de la branche au début du message
BRANCH_NAME=$(git symbolic-ref --short HEAD 2>/dev/null)

# Extraire le numéro de ticket (ex: feature/JIRA-123-description)
TICKET=$(echo "$BRANCH_NAME" | grep -oE '[A-Z]+-[0-9]+')

if [ -n "$TICKET" ] && [ "$COMMIT_SOURCE" != "merge" ]; then
    # Ne pas ajouter si déjà présent
    if ! grep -q "$TICKET" "$COMMIT_MSG_FILE"; then
        sed -i.bak "1s/^/[$TICKET] /" "$COMMIT_MSG_FILE"
    fi
fi
\`\`\`

### commit-msg

Valide le format du message de commit :

\`\`\`bash
#!/bin/bash
# .git/hooks/commit-msg
COMMIT_MSG_FILE=$1
COMMIT_MSG=$(cat "$COMMIT_MSG_FILE")

# Conventional Commits pattern
PATTERN="^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\\(.+\\))?(!)?: .{1,72}$"

if ! echo "$COMMIT_MSG" | head -1 | grep -qE "$PATTERN"; then
    echo "❌ Invalid commit message format!"
    echo ""
    echo "Expected format: <type>(<scope>): <description>"
    echo ""
    echo "Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert"
    echo ""
    echo "Examples:"
    echo "  feat(auth): add OAuth2 login"
    echo "  fix(api): handle null response"
    echo "  docs: update README"
    echo ""
    echo "Your message: $COMMIT_MSG"
    exit 1
fi

# Vérifier la longueur de la première ligne
FIRST_LINE=$(echo "$COMMIT_MSG" | head -1)
if [ \${#FIRST_LINE} -gt 72 ]; then
    echo "❌ First line too long (\${#FIRST_LINE} > 72 chars)"
    exit 1
fi

echo "✅ Commit message format valid"
exit 0
\`\`\`

### pre-push

Exécuté avant un push :

\`\`\`bash
#!/bin/bash
# .git/hooks/pre-push
REMOTE=$1
URL=$2

echo "Running pre-push checks..."

# Empêcher le push sur main/master
CURRENT_BRANCH=$(git symbolic-ref --short HEAD)
if [ "$CURRENT_BRANCH" = "main" ] || [ "$CURRENT_BRANCH" = "master" ]; then
    echo "❌ Direct push to $CURRENT_BRANCH is not allowed!"
    echo "   Please create a pull/merge request."
    exit 1
fi

# Exécuter les tests
npm test --silent
if [ $? -ne 0 ]; then
    echo "❌ Tests failed! Fix before pushing."
    exit 1
fi

echo "✅ Pre-push checks passed!"
exit 0
\`\`\`

### post-checkout et post-merge

\`\`\`bash
#!/bin/bash
# .git/hooks/post-checkout
# Réinstaller les dépendances si package-lock.json a changé

PREV_HEAD=$1
NEW_HEAD=$2
BRANCH_CHANGE=$3

if [ "$BRANCH_CHANGE" = "1" ]; then
    # Vérifier si package-lock.json a changé
    CHANGED=$(git diff --name-only $PREV_HEAD $NEW_HEAD -- package-lock.json)
    if [ -n "$CHANGED" ]; then
        echo "📦 package-lock.json changed, running npm install..."
        npm install
    fi
fi
\`\`\`

## 3. Hooks côté serveur

### pre-receive

\`\`\`bash
#!/bin/bash
# Exécuté sur le serveur Git avant d'accepter un push
while read oldrev newrev refname; do
    # Empêcher le force push sur main
    if [ "$refname" = "refs/heads/main" ]; then
        if ! git merge-base --is-ancestor $oldrev $newrev 2>/dev/null; then
            echo "❌ Force push to main is forbidden!"
            exit 1
        fi
    fi
    
    # Vérifier la taille des fichiers
    for sha in $(git rev-list $oldrev..$newrev); do
        for file in $(git diff-tree -r --name-only $sha); do
            size=$(git cat-file -s $(git ls-tree -r $sha | grep "$file" | awk '{print $3}') 2>/dev/null)
            if [ "$size" -gt 10485760 ]; then  # 10MB
                echo "❌ File $file exceeds 10MB limit"
                exit 1
            fi
        done
    done
done
\`\`\`

## 4. Husky + lint-staged + commitlint

### Installation

\`\`\`bash
# Installer Husky
npm install --save-dev husky
npx husky install

# Ajouter le script prepare dans package.json
npm pkg set scripts.prepare="husky install"

# Installer lint-staged
npm install --save-dev lint-staged

# Installer commitlint
npm install --save-dev @commitlint/cli @commitlint/config-conventional
\`\`\`

### Configuration Husky

\`\`\`bash
# Créer le hook pre-commit
npx husky add .husky/pre-commit "npx lint-staged"

# Créer le hook commit-msg
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "\\\${1}"'

# Créer le hook pre-push
npx husky add .husky/pre-push "npm test"
\`\`\`

### Configuration lint-staged

\`\`\`json
// package.json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,scss}": [
      "prettier --write"
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write"
    ]
  }
}
\`\`\`

### Configuration commitlint

\`\`\`javascript
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'docs', 'style', 'refactor',
      'perf', 'test', 'build', 'ci', 'chore', 'revert'
    ]],
    'subject-max-length': [2, 'always', 72],
    'body-max-line-length': [2, 'always', 100],
  }
};
\`\`\`

## 5. Conventional Commits

Format standardisé pour les messages de commit :

\`\`\`
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
\`\`\`

### Exemples

\`\`\`
feat(auth): add OAuth2 Google login

Implement Google OAuth2 authentication flow.
- Add Google strategy to passport
- Create callback route
- Store tokens in session

Closes #123

---
fix(api): handle null response from payment gateway

The payment gateway occasionally returns null instead of
an error object. Added null check before processing.

Fixes #456

---
feat(api)!: change response format for /users endpoint

BREAKING CHANGE: The response now returns an object with
a "data" key instead of a flat array.
\`\`\`

## 6. Git-crypt et git-secret

### git-crypt (chiffrement transparent)

\`\`\`bash
# Installation
sudo apt-get install git-crypt

# Initialiser dans un repo
git-crypt init

# Définir les fichiers à chiffrer
echo "secrets/** filter=git-crypt diff=git-crypt" >> .gitattributes
echo "*.secret filter=git-crypt diff=git-crypt" >> .gitattributes

# Ajouter des utilisateurs (clé GPG)
git-crypt add-gpg-user USER_GPG_KEY_ID

# Exporter une clé symétrique (pour CI/CD)
git-crypt export-key /path/to/key

# Déverrouiller (après clone)
git-crypt unlock /path/to/key
\`\`\`

## 7. Git Attributes

Le fichier \\\`.gitattributes\\\` configure le comportement de Git par fichier :

\`\`\`
# .gitattributes

# LFS (Large File Storage)
*.psd filter=lfs diff=lfs merge=lfs -text
*.zip filter=lfs diff=lfs merge=lfs -text
*.png filter=lfs diff=lfs merge=lfs -text
*.mp4 filter=lfs diff=lfs merge=lfs -text

# Normalisation des fins de ligne
* text=auto
*.sh text eol=lf
*.bat text eol=crlf

# Diff personnalisé
*.lock binary
*.min.js binary

# Export-ignore (exclu des archives git archive)
.gitattributes export-ignore
.gitignore export-ignore
.github/ export-ignore
tests/ export-ignore
docs/ export-ignore

# Merge strategy
package-lock.json merge=ours
yarn.lock merge=ours

# Linguist (GitHub language detection)
*.js linguist-detectable=true
vendor/* linguist-vendored=true
docs/*.js linguist-documentation=true
\`\`\`
`,
    practiceContent: `# Travaux Pratiques : Hooks et Automatisation

## TP 1 : Hook pre-commit basique

### Objectif
Créer un hook pre-commit qui vérifie le code avant chaque commit.

### Étapes

\`\`\`bash
# 1. Initialiser un projet
mkdir hooks-tp && cd hooks-tp
git init
npm init -y

# 2. Créer le hook
mkdir -p .git/hooks
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "🔍 Running pre-commit checks..."

# Vérifier qu'il n'y a pas de TODO dans les fichiers staged
STAGED=$(git diff --cached --name-only --diff-filter=ACM)
if echo "$STAGED" | xargs grep -l "TODO" 2>/dev/null; then
    echo "⚠️  WARNING: TODO found in staged files"
fi

# Vérifier le formatage JSON
for f in $(echo "$STAGED" | grep '\\.json$'); do
    python3 -m json.tool "$f" > /dev/null 2>&1
    if [ $? -ne 0 ]; then
        echo "❌ Invalid JSON: $f"
        exit 1
    fi
done

echo "✅ Pre-commit checks passed!"
exit 0
EOF
chmod +x .git/hooks/pre-commit

# 3. Tester
echo '{"valid": true}' > config.json
git add config.json && git commit -m "test: valid json"

echo '{invalid json' > bad.json
git add bad.json && git commit -m "test: invalid json"
# ❌ Le commit est rejeté !
\`\`\`

## TP 2 : Hook commit-msg (Conventional Commits)

### Objectif
Forcer le format Conventional Commits.

### Étapes

\`\`\`bash
cat > .git/hooks/commit-msg << 'EOF'
#!/bin/bash
MSG=$(cat "$1")
PATTERN="^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\\(.+\\))?: .+"

if ! echo "$MSG" | head -1 | grep -qE "$PATTERN"; then
    echo ""
    echo "❌ Commit message does not follow Conventional Commits!"
    echo ""
    echo "Format: <type>(<scope>): <description>"
    echo "Types: feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert"
    echo ""
    echo "Your message: $MSG"
    echo ""
    exit 1
fi
echo "✅ Commit message format OK"
EOF
chmod +x .git/hooks/commit-msg

# Tester
echo "test" > test.txt && git add .
git commit -m "bad message"       # ❌ Rejeté
git commit -m "feat: add feature" # ✅ OK
\`\`\`

## TP 3 : Husky + lint-staged

### Objectif
Mettre en place l'outillage moderne avec Husky et lint-staged.

### Étapes

\`\`\`bash
# 1. Setup
npm install --save-dev husky lint-staged prettier eslint

# 2. Initialiser Husky
npx husky install
npm pkg set scripts.prepare="husky install"

# 3. Créer le hook pre-commit
npx husky add .husky/pre-commit "npx lint-staged"

# 4. Configurer lint-staged dans package.json
cat > .lintstagedrc.json << 'EOF'
{
  "*.js": ["eslint --fix", "prettier --write"],
  "*.json": ["prettier --write"],
  "*.md": ["prettier --write"]
}
EOF

# 5. Tester
echo "const x=1;const y=2;" > messy.js
git add messy.js
git commit -m "feat: add messy code"
# lint-staged formate automatiquement le fichier avant le commit
cat messy.js  # Formaté proprement !
\`\`\`

## TP 4 : Hook pre-push avec tests

### Objectif
Exécuter les tests avant chaque push.

### Étapes

\`\`\`bash
# 1. Créer un test simple
cat > test.js << 'EOF'
const assert = require('assert');
assert.strictEqual(1 + 1, 2, 'Math works');
console.log('All tests passed!');
EOF
npm pkg set scripts.test="node test.js"

# 2. Créer le hook pre-push
npx husky add .husky/pre-push "npm test"

# 3. Vérifier
cat .husky/pre-push

# 4. Si on casse le test
echo "assert.strictEqual(1, 2);" >> test.js
git add . && git commit -m "test: break tests"
git push  # ❌ Push bloqué car les tests échouent !

# 5. Corriger et repousser
git reset HEAD~1
\`\`\`

## TP 5 : Git LFS et .gitattributes

### Objectif
Configurer Git LFS pour les fichiers volumineux.

### Étapes

\`\`\`bash
# 1. Installer Git LFS
git lfs install

# 2. Tracker les fichiers volumineux
git lfs track "*.png"
git lfs track "*.zip"
git lfs track "*.psd"

# 3. Vérifier .gitattributes
cat .gitattributes

# 4. Configurer d'autres attributs
cat >> .gitattributes << 'EOF'
# Fins de ligne
*.sh text eol=lf
*.bat text eol=crlf

# Fichiers binaires
*.lock binary

# Export ignore
.github/ export-ignore
tests/ export-ignore
EOF

# 5. Commit
git add .gitattributes
git commit -m "build: configure git LFS and attributes"

# 6. Vérifier le tracking LFS
git lfs ls-files
git lfs status
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Les hooks Git sont des scripts dans .git/hooks/ exécutés automatiquement sur des événements',
      'pre-commit vérifie le code (lint, format, secrets) avant chaque commit - exit 1 pour bloquer',
      'commit-msg valide le format du message - Conventional Commits pour la standardisation',
      'pre-push exécute les tests avant le push - dernière ligne de défense',
      'Husky + lint-staged + commitlint = setup moderne partagé via le repo (pas dans .git/hooks)',
      'Les hooks serveur (pre-receive, update, post-receive) contrôlent les politiques du repo',
      'git-crypt et git-secret chiffrent transparemment les fichiers sensibles dans le repo',
      '.gitattributes configure LFS, fins de ligne, merge strategy et export-ignore par fichier'
    ]),
  },


  // ============================================================
  // GIT AVANCÉ - Module 3: Sous-modules, stratégies et maintenance
  // ============================================================
  {
    id: 'git-03',
    courseId: 'git-avance',
    title: 'Sous-modules, stratégies et maintenance',
    duration: '3h',
    orderIndex: 3,
    videoUrl: 'https://www.youtube.com/watch?v=aJnFGMclhU8',
    theoryContent: `# Sous-modules, Stratégies et Maintenance Git

## 1. Git Submodules

Les submodules permettent d'inclure un dépôt Git dans un autre, en gardant les historiques séparés.

### Commandes essentielles

\`\`\`bash
# Ajouter un submodule
git submodule add https://github.com/org/library.git libs/library
git submodule add -b main https://github.com/org/shared.git shared

# Cela crée :
# - Un répertoire libs/library avec le repo cloné
# - Un fichier .gitmodules avec la configuration
# - Une entrée dans l'index pointant vers un commit spécifique

# Cloner un repo avec submodules
git clone --recursive https://github.com/org/project.git
# ou après un clone normal :
git submodule init
git submodule update
# ou en une commande :
git submodule update --init --recursive

# Mettre à jour les submodules (dernière version de leur branche)
git submodule update --remote
git submodule update --remote libs/library

# Voir le statut des submodules
git submodule status
git submodule summary

# Exécuter une commande dans chaque submodule
git submodule foreach 'git checkout main && git pull'
git submodule foreach 'echo $name: $(git describe --tags)'

# Désinitialiser un submodule
git submodule deinit libs/library
git rm libs/library
rm -rf .git/modules/libs/library
\`\`\`

### Fichier .gitmodules

\`\`\`ini
[submodule "libs/library"]
    path = libs/library
    url = https://github.com/org/library.git
    branch = main
    
[submodule "shared"]
    path = shared
    url = https://github.com/org/shared.git
    branch = develop
\`\`\`

### Workflow avec submodules

\`\`\`bash
# 1. Développeur clone le projet
git clone --recursive https://github.com/org/project.git

# 2. Mettre à jour un submodule
cd libs/library
git checkout main
git pull
cd ../..
git add libs/library
git commit -m "chore: update library submodule to latest"

# 3. Modifier le code dans un submodule
cd libs/library
git checkout -b fix/bug-123
# ... faire des modifications ...
git add . && git commit -m "fix: resolve bug 123"
git push origin fix/bug-123
# Créer une MR dans le repo du submodule
cd ../..
# Après merge de la MR :
git submodule update --remote libs/library
git add libs/library
git commit -m "chore: update library with bug fix"
\`\`\`

## 2. Git Subtrees

Les subtrees sont une alternative aux submodules qui intègre le code directement dans l'historique.

\`\`\`bash
# Ajouter un subtree
git subtree add --prefix=libs/library \\
    https://github.com/org/library.git main --squash

# Mettre à jour depuis le remote
git subtree pull --prefix=libs/library \\
    https://github.com/org/library.git main --squash

# Pousser des modifications vers le remote
git subtree push --prefix=libs/library \\
    https://github.com/org/library.git feature-branch
\`\`\`

### Submodules vs Subtrees

| Aspect | Submodules | Subtrees |
|--------|-----------|----------|
| Historique | Séparé (référence) | Intégré |
| Clone | --recursive nécessaire | Clone normal |
| Complexité | Plus complexe | Plus simple |
| Workflow | Commit dans chaque repo | Commit dans le repo parent |
| Taille | Léger (pointeur) | Plus lourd (code inclus) |
| Cas d'usage | Libs partagées entre projets | Code qu'on veut forker |

## 3. Sparse Checkout

Checkout partiel d'un repo (utile pour les monorepos) :

\`\`\`bash
# Activer sparse checkout
git sparse-checkout init --cone

# Définir les répertoires à checkout
git sparse-checkout set services/api packages/shared
git sparse-checkout add services/frontend

# Lister les patterns actuels
git sparse-checkout list

# Désactiver (checkout tout)
git sparse-checkout disable
\`\`\`

## 4. Filter-repo (réécriture d'historique)

\`\`\`bash
# Installation
pip3 install git-filter-repo

# Supprimer un fichier de tout l'historique
git filter-repo --path secrets.env --invert-paths

# Supprimer un répertoire
git filter-repo --path old-directory/ --invert-paths

# Renommer un répertoire dans tout l'historique
git filter-repo --path-rename old-name/:new-name/

# Extraire un sous-répertoire en nouveau repo
git filter-repo --subdirectory-filter services/api

# Supprimer les fichiers volumineux
git filter-repo --strip-blobs-bigger-than 10M

# Modifier les auteurs
git filter-repo --mailmap mailmap.txt
# mailmap.txt :
# New Name <new@email.com> Old Name <old@email.com>
\`\`\`

## 5. Stratégies de Branching

### Git Flow

\`\`\`
main ─────●─────────────────●─────────── (releases)
           \\               /
develop ────●───●───●───●──● ──●───●──── (intégration)
              \\   /       \\   /
feature/A ─────●──         \\ /
                    feature/B ●
                    
release ────────────────●───●            (stabilisation)
                        
hotfix ─────────────●                    (fix urgent)
                   / \\
main ─────────────●   ●                  (merge main + develop)
\`\`\`

\`\`\`bash
# Branches dans Git Flow :
# main     : production (tags de version)
# develop  : intégration des features
# feature/ : nouvelles fonctionnalités (depuis develop)
# release/ : préparation de release (depuis develop)
# hotfix/  : fix urgent (depuis main)

# Workflow feature
git checkout develop
git checkout -b feature/user-auth
# ... développement ...
git checkout develop
git merge --no-ff feature/user-auth
git branch -d feature/user-auth

# Workflow release
git checkout develop
git checkout -b release/1.2.0
# ... corrections, bump version ...
git checkout main
git merge --no-ff release/1.2.0
git tag -a v1.2.0 -m "Release 1.2.0"
git checkout develop
git merge --no-ff release/1.2.0
\`\`\`

### GitHub Flow

Plus simple que Git Flow :

\`\`\`bash
# 1. Créer une branche depuis main
git checkout main
git checkout -b feature/add-search

# 2. Développer avec des commits réguliers
git add . && git commit -m "feat: add search component"
git push -u origin feature/add-search

# 3. Ouvrir une Pull Request
# 4. Review et discussion
# 5. Merge dans main (squash ou merge commit)
# 6. Deploy automatique depuis main
\`\`\`

### Trunk-Based Development

\`\`\`bash
# Règles :
# - Branche unique (main/trunk)
# - Feature branches très courtes (< 2 jours)
# - Feature flags pour le code non terminé
# - CI/CD déploie main en continu

git checkout main
git checkout -b short-lived/add-button
# ... 1-2 commits maximum ...
git push && # Créer MR
# Merge le jour même

# Feature flags dans le code :
# if (featureFlags.isEnabled('new-search')) { ... }
\`\`\`

### Comparaison

| Critère | Git Flow | GitHub Flow | Trunk-Based |
|---------|----------|-------------|-------------|
| Complexité | Élevée | Faible | Faible |
| Branches longues | Oui | Non | Non |
| Release | Planifiée | Continue | Continue |
| Environnements | Multiple | Staging + Prod | Prod directe |
| Équipe | Grande | Moyenne | Senior/CI mature |
| Reverts | Difficile | Facile | Très facile |

## 6. Monorepo Strategies

### Organisation

\`\`\`
monorepo/
  packages/
    shared/          # Package partagé
    ui-components/   # Composants UI
  services/
    api/             # Service API
    frontend/        # Application frontend
    worker/          # Worker background
  tools/
    scripts/
    configs/
  package.json       # Workspaces root
  turbo.json         # Turborepo config
  nx.json            # Nx config
\`\`\`

### Outils pour monorepos

\`\`\`bash
# Turborepo
npx create-turbo@latest
npx turbo run build --filter=api
npx turbo run test --affected

# Nx
npx create-nx-workspace
nx affected:build
nx affected:test

# Lerna (legacy, migrer vers Nx/Turbo)
npx lerna init
npx lerna run build --scope=@org/api
\`\`\`

## 7. Maintenance Git

### Nettoyage et optimisation

\`\`\`bash
# Garbage collection (nettoyage des objets non référencés)
git gc
git gc --aggressive  # Plus thorough (lent)
git gc --prune=now   # Supprimer immédiatement les objets unreachable

# Vérification d'intégrité
git fsck
git fsck --full
git fsck --unreachable

# Repack (optimiser le stockage)
git repack -a -d --depth=250 --window=250

# Prune (supprimer les objets non référencés)
git prune --dry-run   # Voir ce qui serait supprimé
git prune

# Maintenance automatique (Git 2.30+)
git maintenance start
git maintenance run --task=gc
git maintenance run --task=commit-graph
git maintenance run --task=prefetch

# Voir la taille du repo
git count-objects -vH
du -sh .git
\`\`\`

### Performance des grands repos

\`\`\`bash
# Shallow clone (historique limité)
git clone --depth=1 https://github.com/org/large-repo.git
git fetch --deepen=10   # Récupérer 10 commits de plus
git fetch --unshallow    # Récupérer tout l'historique

# Partial clone (blobs à la demande)
git clone --filter=blob:none https://github.com/org/repo.git
# Les fichiers sont téléchargés à la demande lors du checkout

# Partial clone (sans les grands fichiers)
git clone --filter=blob:limit=1m https://github.com/org/repo.git

# Sparse checkout (checkout partiel)
git clone --sparse https://github.com/org/monorepo.git
cd monorepo
git sparse-checkout set services/api shared/

# Commit graph (accélère git log, merge-base, etc.)
git commit-graph write --reachable
git config core.commitGraph true

# File system monitor (accélère git status sur les grands repos)
git config core.fsmonitor true
git config core.untrackedcache true

# Index version 4 (plus compact)
git update-index --index-version 4
\`\`\`

## 8. Trouver les gros fichiers

\`\`\`bash
# Top 10 des plus gros fichiers dans l'historique
git rev-list --objects --all | \\
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \\
  sed -n 's/^blob //p' | \\
  sort -rnk2 | \\
  head -10 | \\
  cut -d' ' -f2- | \\
  numfmt --field=1 --to=iec

# Avec git-sizer
git-sizer --verbose

# Taille par répertoire
git ls-tree -r -l HEAD | sort -k4 -rn | head -20
\`\`\`

## 9. Bonnes pratiques récapitulatives

| Pratique | Description |
|----------|-------------|
| Commits atomiques | Un commit = un changement logique |
| Messages descriptifs | Conventional Commits (feat/fix/docs...) |
| Branches courtes | Merge en < 3 jours idéalement |
| Rebase avant merge | Historique linéaire propre |
| Tags pour les releases | v1.2.3 (semver) |
| .gitignore complet | Ne jamais commiter build, deps, secrets |
| LFS pour les binaires | Fichiers > 1MB dans LFS |
| Hooks automatisés | Lint, format, tests avant push |
| Revues de code | PR/MR obligatoire pour main |
| Backup du repo | Miroir sur un second remote |
`,
    practiceContent: `# Travaux Pratiques : Sous-modules, Stratégies et Maintenance

## TP 1 : Submodules

### Objectif
Gérer des dépendances avec les submodules Git.

### Étapes

\`\`\`bash
# 1. Créer un repo "library"
mkdir library && cd library
git init
echo "export function hello() { return 'Hello!'; }" > index.js
git add . && git commit -m "feat: initial library"
cd ..

# 2. Créer le projet principal
mkdir main-project && cd main-project
git init
echo "# Main Project" > README.md
git add . && git commit -m "init: main project"

# 3. Ajouter le submodule
git submodule add ../library libs/library

# 4. Vérifier
cat .gitmodules
git status
git commit -m "chore: add library submodule"

# 5. Modifier le submodule
cd libs/library
echo "export function bye() { return 'Bye!'; }" >> index.js
git add . && git commit -m "feat: add bye function"
cd ../..

# 6. Mettre à jour la référence
git add libs/library
git commit -m "chore: update library submodule"

# 7. Simuler un clone
cd ..
git clone --recursive main-project clone-test
cd clone-test
cat libs/library/index.js  # Le submodule est présent
\`\`\`

## TP 2 : Stratégie Git Flow

### Objectif
Simuler un workflow Git Flow complet.

### Étapes

\`\`\`bash
# 1. Setup
mkdir gitflow-demo && cd gitflow-demo
git init
echo "v0.1" > version.txt
git add . && git commit -m "init: project v0.1"
git tag v0.1.0

# 2. Créer la branche develop
git checkout -b develop

# 3. Feature branch
git checkout -b feature/login
echo "login feature" > login.js
git add . && git commit -m "feat: add login"
git checkout develop
git merge --no-ff feature/login -m "Merge feature/login"
git branch -d feature/login

# 4. Release branch
git checkout -b release/1.0
echo "v1.0" > version.txt
git add . && git commit -m "chore: bump to v1.0"
git checkout main
git merge --no-ff release/1.0 -m "Release 1.0"
git tag v1.0.0
git checkout develop
git merge --no-ff release/1.0 -m "Merge release back to develop"
git branch -d release/1.0

# 5. Hotfix
git checkout main
git checkout -b hotfix/security-fix
echo "fix" > security.js
git add . && git commit -m "fix: critical security issue"
git checkout main
git merge --no-ff hotfix/security-fix -m "Hotfix: security"
git tag v1.0.1
git checkout develop
git merge --no-ff hotfix/security-fix
git branch -d hotfix/security-fix

# 6. Visualiser
git log --all --oneline --graph
\`\`\`

## TP 3 : Maintenance et nettoyage

### Objectif
Optimiser et maintenir un dépôt Git.

### Étapes

\`\`\`bash
# 1. Vérifier l'état du repo
git count-objects -vH
du -sh .git

# 2. Trouver les gros fichiers
git rev-list --objects --all | wc -l
git ls-tree -r -l HEAD | sort -k4 -rn | head -5

# 3. Garbage collection
git gc --aggressive
git count-objects -vH  # Comparer

# 4. Vérifier l'intégrité
git fsck

# 5. Optimiser avec commit-graph
git commit-graph write --reachable
git log --oneline | wc -l

# 6. Nettoyer les branches mergées
git branch --merged main | grep -v "main\\|develop" | xargs -r git branch -d

# 7. Prune les remotes
git remote prune origin
git fetch --prune
\`\`\`

## TP 4 : Sparse checkout (monorepo)

### Objectif
Travailler avec un monorepo en ne checkoutant qu'une partie.

### Étapes

\`\`\`bash
# 1. Créer un monorepo simulé
mkdir monorepo && cd monorepo
git init
mkdir -p services/{api,frontend,worker} packages/{shared,ui}
echo "api code" > services/api/index.js
echo "frontend" > services/frontend/index.js
echo "worker" > services/worker/index.js
echo "shared" > packages/shared/index.js
echo "ui" > packages/ui/index.js
git add . && git commit -m "init: monorepo structure"

# 2. Cloner avec sparse checkout
cd ..
git clone --sparse monorepo sparse-clone
cd sparse-clone

# 3. Définir ce qu'on veut
git sparse-checkout set services/api packages/shared

# 4. Vérifier
ls services/       # Seulement api/
ls packages/       # Seulement shared/

# 5. Ajouter un service
git sparse-checkout add services/frontend
ls services/       # api/ et frontend/

# 6. Lister les patterns
git sparse-checkout list
\`\`\`

## TP 5 : Filter-repo (réécriture d'historique)

### Objectif
Nettoyer un historique en supprimant des fichiers sensibles.

### Étapes

\`\`\`bash
# ⚠️ ATTENTION : Opération destructive - toujours travailler sur une copie !

# 1. Créer un repo avec un "secret" commité par erreur
mkdir filter-demo && cd filter-demo
git init
echo "code" > app.js && git add . && git commit -m "add app"
echo "SECRET_KEY=abc123" > .env && git add . && git commit -m "add config"
echo "more code" >> app.js && git add . && git commit -m "more code"
# On a commité .env par erreur !
git rm .env && git commit -m "remove .env"
# Mais .env est toujours dans l'historique !

# 2. Vérifier que le fichier est dans l'historique
git log --all --full-history -- .env
git show HEAD~2:.env  # Le secret est visible !

# 3. Supprimer de tout l'historique
pip3 install git-filter-repo
git filter-repo --path .env --invert-paths --force

# 4. Vérifier
git log --all --full-history -- .env  # Rien !
git log --oneline  # L'historique est réécrit

# 5. Ajouter .env au .gitignore
echo ".env" >> .gitignore
git add . && git commit -m "chore: add .env to gitignore"
\`\`\`
`,
    keyPoints: JSON.stringify([
      'Les submodules incluent un repo dans un autre avec des historiques séparés (git submodule add/update)',
      'Subtrees intègrent le code directement - plus simple mais historique plus lourd',
      'Sparse checkout permet de ne checkout qu\'une partie d\'un monorepo',
      'git filter-repo réécrit l\'historique pour supprimer fichiers sensibles ou volumineux',
      'Git Flow (feature/release/hotfix), GitHub Flow (simple), Trunk-Based (CD rapide)',
      'Monorepos : Turborepo ou Nx pour la gestion des builds et tests affectés',
      'Maintenance : git gc, fsck, repack, commit-graph pour la performance',
      'Shallow/partial clone et sparse checkout optimisent le travail sur les grands repos'
    ]),
  },
  // ============================================================
  // PROMETHEUS - Module 1
  // ============================================================
  {
    id: 'prometheus-01',
    courseId: 'prometheus',
    title: 'Introduction et architecture Prometheus',
    duration: '5h',
    orderIndex: 1,
    theoryContent: `# Introduction à Prometheus

## 1. Qu'est-ce que Prometheus ?

Prometheus est un système de monitoring et d'alerting open-source développé initialement par SoundCloud en 2012, puis devenu un projet de la Cloud Native Computing Foundation (CNCF) en 2016.

### Architecture

Prometheus utilise un modèle de **pull** : il interroge activement les cibles (targets) pour récupérer les métriques. C'est l'inverse du modèle push utilisé par d'autres outils comme Graphite.

**Composants principaux :**
- **Prometheus Server** : collecte et stocke les métriques en TSDB (Time Series Database)
- **Exporters** : exposent les métriques d'applications tierces (node_exporter, mysqld_exporter)
- **Pushgateway** : pour les jobs batch qui ne peuvent pas être scrapés
- **AlertManager** : gère les alertes (déduplication, groupage, silencing, routing)
- **PromQL** : langage de requêtes pour interroger les données

### Types de métriques

Prometheus supporte 4 types de métriques :
- **Counter** : valeur qui ne fait qu'augmenter (requêtes totales, erreurs)
- **Gauge** : valeur qui peut monter et descendre (température, mémoire)
- **Histogram** : distribue les observations dans des buckets (latence)
- **Summary** : similaire au histogram avec calcul de quantiles côté client

### Configuration

Le fichier \`prometheus.yml\` définit :
- Les **scrape_configs** : quelles cibles interroger et à quelle fréquence
- Les **rule_files** : règles d'alerting et d'enregistrement
- Les **alerting** configs : connexion à AlertManager

\`\`\`yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node'
    static_configs:
      - targets: ['node-exporter:9100']
\`\`\`

### PromQL - Bases

PromQL permet de requêter les time series :

\`\`\`promql
# Requête simple
http_requests_total

# Filtrage par label
http_requests_total{method="GET", status="200"}

# Taux sur 5 minutes
rate(http_requests_total[5m])

# Agrégation
sum(rate(http_requests_total[5m])) by (method)
\`\`\`

### Installation avec Docker

\`\`\`bash
docker run -d --name prometheus -p 9090:9090 -v ./prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
\`\`\``,
    practiceContent: `# Exercice pratique : Installation de Prometheus

## Objectif
Installer Prometheus avec Docker et configurer le monitoring d'un node_exporter.

## Étapes

1. Créer un fichier \`docker-compose.yml\` :
\`\`\`yaml
version: '3'
services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
  node-exporter:
    image: prom/node-exporter
    ports:
      - "9100:9100"
\`\`\`

2. Accédez à http://localhost:9090 et testez une requête PromQL :
   \`up\` → affiche l'état des targets
   \`node_cpu_seconds_total\` → métriques CPU`,
    keyPoints: JSON.stringify([
      'Prometheus utilise un modèle pull pour collecter les métriques',
      '4 types de métriques : Counter, Gauge, Histogram, Summary',
      'PromQL est le langage de requêtes pour interroger les time series',
      'Les exporters exposent les métriques d\'applications tierces',
      'AlertManager gère la notification et le routage des alertes',
      'La configuration se fait via prometheus.yml',
      'rate() calcule le taux de changement par seconde',
      'Le stockage TSDB est optimisé pour les données temporelles'
    ]),
  },
  // PROMETHEUS - Module 2
  {
    id: 'prometheus-02',
    courseId: 'prometheus',
    title: 'Alerting et bonnes pratiques',
    duration: '5h',
    orderIndex: 2,
    theoryContent: `# Alerting avec Prometheus

## 1. Règles d'alerte

Les alertes Prometheus sont définies dans des fichiers de règles YAML. Elles évaluent des expressions PromQL et déclenchent quand la condition est vraie pendant une durée définie.

\`\`\`yaml
groups:
  - name: example
    rules:
      - alert: HighRequestLatency
        expr: http_request_duration_seconds{quantile="0.5"} > 1
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "High request latency on {{ $labels.instance }}"
\`\`\`

### Cycle de vie d'une alerte
1. **Inactive** : condition non remplie
2. **Pending** : condition remplie, attente de la durée \`for\`
3. **Firing** : condition confirmée, alerte envoyée à AlertManager

## 2. AlertManager

AlertManager reçoit les alertes de Prometheus et gère :
- **Groupage** : regroupe les alertes similaires
- **Inhibition** : supprime certaines alertes si d'autres sont actives
- **Silencing** : mute temporairement des alertes
- **Routing** : envoie vers différents receivers (email, Slack, PagerDuty)

\`\`\`yaml
route:
  receiver: 'slack-notifications'
  group_by: ['alertname', 'cluster']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 3h

receivers:
  - name: 'slack-notifications'
    slack_configs:
      - channel: '#alerts'
        send_resolved: true
\`\`\`

## 3. Recording rules

Les recording rules précalculent des expressions coûteuses :

\`\`\`yaml
groups:
  - name: recording
    rules:
      - record: job:http_requests:rate5m
        expr: sum(rate(http_requests_total[5m])) by (job)
\`\`\`

## 4. Bonnes pratiques

- Nommer les métriques : \`<namespace>_<name>_<unit>\`
- Utiliser des labels pour la dimensionnalité
- Éviter la cardinalité élevée (trop de valeurs de labels)
- Préférer rate() à irate() pour les alertes
- Définir des SLO (Service Level Objectives) mesurables`,
    practiceContent: `# Exercice : Créer des alertes

## Objectif
Configurer une règle d'alerte quand un service est down.

\`\`\`yaml
groups:
  - name: service_alerts
    rules:
      - alert: ServiceDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Service {{ $labels.job }} is down"
\`\`\`

Testez en arrêtant un exporter et vérifiez dans l'interface Prometheus > Alerts.`,
    keyPoints: JSON.stringify([
      'Les alertes utilisent des expressions PromQL avec une durée for',
      'AlertManager gère groupage, inhibition, silencing et routing',
      'Les recording rules précalculent des requêtes complexes',
      'Le cycle : Inactive → Pending → Firing',
      'Nommer les métriques avec le pattern namespace_name_unit',
      'Éviter la haute cardinalité dans les labels',
      'Définir des SLO mesurables avec Prometheus',
      'Utiliser rate() plutôt que irate() pour les alertes'
    ]),
  },

  // ============================================================
  // GRAFANA - Module 1
  // ============================================================
  {
    id: 'grafana-01',
    courseId: 'grafana',
    title: 'Introduction et dashboards Grafana',
    duration: '4h',
    orderIndex: 1,
    theoryContent: `# Introduction à Grafana

## 1. Qu'est-ce que Grafana ?

Grafana est une plateforme open-source de visualisation et d'analytics. Elle permet de créer des dashboards interactifs à partir de multiples sources de données (Prometheus, InfluxDB, Elasticsearch, PostgreSQL, etc.).

### Concepts clés

- **Dashboard** : page contenant plusieurs panels
- **Panel** : un graphique ou une visualisation individuelle
- **Data Source** : connexion à une base de données ou API
- **Variables** : paramètres dynamiques pour filtrer les données
- **Alerting** : système d'alertes intégré

### Types de panels

Grafana propose de nombreux types de visualisation :
- **Time series** : graphiques temporels (le plus courant)
- **Stat** : valeur unique avec options de couleur
- **Gauge** : jauge circulaire
- **Bar chart** : graphiques à barres
- **Table** : données tabulaires
- **Heatmap** : carte de chaleur
- **Logs** : affichage de logs

### Installation

\`\`\`bash
docker run -d --name grafana -p 3000:3000 grafana/grafana
\`\`\`

Accès par défaut : http://localhost:3000 (admin/admin)

### Ajouter une Data Source

1. Configuration → Data Sources → Add data source
2. Sélectionner Prometheus
3. URL : http://prometheus:9090
4. Cliquer sur "Save & Test"

### Créer un Dashboard

\`\`\`
1. + → New Dashboard → Add a new panel
2. Sélectionner la data source
3. Écrire la requête PromQL
4. Choisir le type de visualisation
5. Configurer les options (axes, légendes, seuils)
6. Save dashboard
\`\`\`

### Variables de dashboard

Les variables rendent les dashboards dynamiques :

\`\`\`
Name: instance
Type: Query
Data source: Prometheus
Query: label_values(up, instance)
\`\`\`

Utilisation dans les panels : \`$instance\``,
    practiceContent: `# Exercice : Créer un dashboard Grafana

## Objectif
Créer un dashboard avec des métriques système.

## Étapes

1. Lancez Grafana avec Docker
2. Ajoutez Prometheus comme data source
3. Créez un dashboard avec 4 panels :
   - CPU usage : \`100 - (avg(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)\`
   - Mémoire : \`node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes\`
   - Disk : \`node_filesystem_avail_bytes\`
   - Network : \`rate(node_network_receive_bytes_total[5m])\`

4. Ajoutez une variable \`instance\` pour filtrer`,
    keyPoints: JSON.stringify([
      'Grafana visualise les données de multiples data sources',
      'Un dashboard contient des panels avec différentes visualisations',
      'Les variables permettent de rendre les dashboards dynamiques',
      'Time series est le type de panel le plus utilisé',
      'Les data sources supportées incluent Prometheus, InfluxDB, Elasticsearch',
      'Les alertes Grafana permettent de notifier sur des seuils',
      'Les dashboards peuvent être exportés/importés en JSON',
      'grafana.com/dashboards propose des dashboards communautaires'
    ]),
  },
  // GRAFANA - Module 2
  {
    id: 'grafana-02',
    courseId: 'grafana',
    title: 'Panels avancés et alertes',
    duration: '4h',
    orderIndex: 2,
    theoryContent: `# Grafana avancé : Panels et Alertes

## 1. Panels avancés

### Transformations

Les transformations permettent de manipuler les données avant l'affichage :
- **Reduce** : agrège les valeurs (min, max, mean, last)
- **Filter** : filtre les séries par nom ou valeur
- **Join** : combine des requêtes
- **Organize fields** : renomme et réordonne les colonnes

### Overrides

Les overrides permettent de personnaliser l'affichage par série :
- Couleur spécifique par série
- Axe Y secondaire pour certaines métriques
- Style de ligne différent (pointillés, barres)

### Annotations

Les annotations marquent des événements sur les graphiques :
- Déploiements
- Incidents
- Changements de configuration

\`\`\`
Dashboard settings → Annotations → Add annotation query
Data source: Prometheus
Requête: changes(deploy_timestamp[1h])
\`\`\`

## 2. Alerting Grafana

### Création d'alertes

1. Éditez un panel → onglet "Alert"
2. Définir la condition (ex: valeur > seuil)
3. Configurer le "Evaluate every" et "For"
4. Ajouter les notification channels

### Contact Points

- Email
- Slack
- PagerDuty
- Webhook
- Microsoft Teams

### Silence et Mute Timings

\`\`\`
Alerting → Silences → Create silence
Matchers: alertname = HighCPU
Duration: 2h
Comment: Maintenance planifiée
\`\`\`

## 3. Provisioning

Grafana peut être configuré via des fichiers YAML :

\`\`\`yaml
# provisioning/datasources/prometheus.yml
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    url: http://prometheus:9090
    isDefault: true
\`\`\`

Cela permet l'infrastructure as code pour vos dashboards.`,
    practiceContent: `# Exercice : Alertes et annotations

## Objectif
Configurer une alerte sur l'utilisation CPU.

1. Créez un panel avec la requête CPU
2. Ajoutez une alerte : CPU > 80% pendant 5 minutes
3. Configurez un contact point (webhook ou email)
4. Ajoutez une annotation pour marquer le test
5. Testez en générant de la charge : \`stress --cpu 4 --timeout 60\``,
    keyPoints: JSON.stringify([
      'Les transformations manipulent les données avant affichage',
      'Les overrides personnalisent chaque série individuellement',
      'Les annotations marquent des événements temporels sur les graphiques',
      'Le système d\'alerting Grafana supporte de nombreux contact points',
      'Le provisioning automatise la configuration via fichiers YAML',
      'Les silences permettent de muter temporairement des alertes',
      'Les dashboards as code facilitent le versionnement',
      'Les variables de type interval s\'adaptent au zoom du graphique'
    ]),
  },
  // ============================================================
  // HELM - Module 1
  // ============================================================
  {
    id: 'helm-01',
    courseId: 'helm',
    title: 'Introduction aux Charts Helm',
    duration: '4h',
    orderIndex: 1,
    theoryContent: `# Introduction à Helm

## 1. Qu'est-ce que Helm ?

Helm est le gestionnaire de packages pour Kubernetes. Il permet de définir, installer et mettre à jour des applications Kubernetes complexes de manière reproductible.

### Concepts fondamentaux

- **Chart** : un package Helm contenant les templates K8s
- **Release** : une instance installée d'un chart
- **Values** : les paramètres de configuration d'un chart
- **Repository** : un dépôt de charts Helm

### Architecture d'un Chart

\`\`\`
mychart/
├── Chart.yaml        # Métadonnées du chart
├── values.yaml       # Valeurs par défaut
├── templates/        # Templates Kubernetes
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   ├── _helpers.tpl  # Fonctions réutilisables
│   └── NOTES.txt     # Message post-install
├── charts/           # Dépendances
└── .helmignore
\`\`\`

### Commandes essentielles

\`\`\`bash
# Installer un chart
helm install my-release bitnami/nginx

# Lister les releases
helm list

# Mettre à jour
helm upgrade my-release bitnami/nginx --set replicaCount=3

# Supprimer
helm uninstall my-release

# Créer un nouveau chart
helm create mychart
\`\`\`

### Templates et Values

Le fichier \`values.yaml\` définit les valeurs par défaut :

\`\`\`yaml
replicaCount: 2
image:
  repository: nginx
  tag: "1.24"
  pullPolicy: IfNotPresent
service:
  type: ClusterIP
  port: 80
\`\`\`

Utilisation dans les templates :

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-app
spec:
  replicas: {{ .Values.replicaCount }}
  template:
    spec:
      containers:
        - name: app
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
\`\`\`

### Fonctions de template

Helm utilise le moteur Go template avec des fonctions Sprig :
- \`{{ include "mychart.fullname" . }}\` : inclut un template
- \`{{ .Values.name | default "app" }}\` : valeur par défaut
- \`{{ toYaml .Values.resources | nindent 12 }}\` : indentation YAML`,
    practiceContent: `# Exercice : Créer un Chart Helm

## Objectif
Créer un chart Helm pour déployer une application web.

\`\`\`bash
# 1. Créer le chart
helm create webapp

# 2. Modifier values.yaml
# Changer l'image, les resources, etc.

# 3. Installer
helm install my-webapp ./webapp

# 4. Vérifier
kubectl get pods
helm status my-webapp

# 5. Modifier et upgrader
helm upgrade my-webapp ./webapp --set replicaCount=3
\`\`\``,
    keyPoints: JSON.stringify([
      'Helm est le gestionnaire de packages pour Kubernetes',
      'Un Chart est un package contenant des templates K8s',
      'Une Release est une instance installée d\'un chart',
      'values.yaml contient les paramètres de configuration par défaut',
      'Les templates utilisent le moteur Go template avec Sprig',
      'helm install/upgrade/uninstall gèrent le cycle de vie',
      'Les repositories Helm partagent les charts (bitnami, etc.)',
      'helm create génère la structure d\'un nouveau chart'
    ]),
  },
  // HELM - Module 2
  {
    id: 'helm-02',
    courseId: 'helm',
    title: 'Helm avancé : releases et repositories',
    duration: '4h',
    orderIndex: 2,
    theoryContent: `# Helm avancé

## 1. Gestion des Releases

### Historique et rollback

\`\`\`bash
# Voir l'historique
helm history my-release

# Rollback à une version précédente
helm rollback my-release 1

# Dry-run pour tester
helm upgrade --dry-run --debug my-release ./mychart
\`\`\`

### Hooks

Les hooks exécutent des actions à des moments précis :
- \`pre-install\` : avant l'installation
- \`post-install\` : après l'installation
- \`pre-upgrade\` : avant la mise à jour
- \`pre-delete\` : avant la suppression

\`\`\`yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: "{{ .Release.Name }}-db-migrate"
  annotations:
    "helm.sh/hook": pre-upgrade
    "helm.sh/hook-weight": "1"
spec:
  template:
    spec:
      containers:
        - name: migrate
          image: myapp:latest
          command: ["./migrate.sh"]
      restartPolicy: Never
\`\`\`

## 2. Dépendances

Le fichier \`Chart.yaml\` gère les dépendances :

\`\`\`yaml
dependencies:
  - name: postgresql
    version: "12.x.x"
    repository: "https://charts.bitnami.com/bitnami"
    condition: postgresql.enabled
\`\`\`

\`\`\`bash
helm dependency update ./mychart
helm dependency build ./mychart
\`\`\`

## 3. Repositories

\`\`\`bash
# Ajouter un repo
helm repo add bitnami https://charts.bitnami.com/bitnami

# Chercher un chart
helm search repo nginx

# Créer un repo privé avec ChartMuseum
docker run -d -p 8080:8080 chartmuseum/chartmuseum

# Packager un chart
helm package ./mychart
\`\`\`

## 4. Tests Helm

\`\`\`yaml
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
      command: ['wget', '-qO-', 'http://{{ .Release.Name }}:{{ .Values.service.port }}']
  restartPolicy: Never
\`\`\`

\`\`\`bash
helm test my-release
\`\`\``,
    practiceContent: `# Exercice : Gérer les releases

## Objectif
Pratiquer le cycle de vie complet d'une release Helm.

\`\`\`bash
# 1. Installer une release
helm install webapp ./mychart -f production-values.yaml

# 2. Upgrader avec de nouvelles values
helm upgrade webapp ./mychart --set image.tag=v2.0

# 3. Voir l'historique
helm history webapp

# 4. Simuler un problème et rollback
helm rollback webapp 1

# 5. Exécuter les tests
helm test webapp
\`\`\``,
    keyPoints: JSON.stringify([
      'helm history et rollback permettent de revenir en arrière',
      'Les hooks exécutent des actions pré/post installation ou upgrade',
      'Les dépendances sont gérées dans Chart.yaml',
      'helm dependency update télécharge les charts dépendants',
      'Les repositories privés se créent avec ChartMuseum ou OCI',
      'helm package crée une archive .tgz du chart',
      'Les tests Helm valident le bon fonctionnement post-déploiement',
      'Le dry-run permet de visualiser les manifestes sans les appliquer'
    ]),
  },
  // ============================================================
  // ARGOCD - Module 1
  // ============================================================
  {
    id: 'argocd-01',
    courseId: 'argocd',
    title: 'Introduction au GitOps avec ArgoCD',
    duration: '4h',
    orderIndex: 1,
    theoryContent: `# Introduction à ArgoCD

## 1. Principes du GitOps

Le GitOps est une approche où Git est la source de vérité pour l'infrastructure et les applications. Les principes :

- **Déclaratif** : l'état désiré est décrit dans Git
- **Versionné** : tout changement passe par un commit Git
- **Automatique** : la réconciliation est automatique
- **Auditable** : l'historique Git sert d'audit trail

### ArgoCD dans l'écosystème

ArgoCD est un contrôleur GitOps pour Kubernetes. Il surveille un repository Git et s'assure que l'état du cluster correspond à ce qui est déclaré dans le repo.

## 2. Architecture ArgoCD

\`\`\`
Git Repository ──→ ArgoCD Server ──→ Kubernetes Cluster
                      │
                Application Controller
                Repo Server
                API Server
                UI / CLI
\`\`\`

**Composants :**
- **API Server** : expose l'API REST et le gRPC
- **Repository Server** : clone et génère les manifestes
- **Application Controller** : surveille les apps et réconcilie
- **UI** : interface web de gestion
- **CLI** : outil en ligne de commande (argocd)

## 3. Installation

\`\`\`bash
# Installation dans un namespace dédié
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Accès à l'UI
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Récupérer le mot de passe admin
argocd admin initial-password -n argocd
\`\`\`

## 4. Créer une Application

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/org/repo.git
    targetRevision: HEAD
    path: k8s/
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
\`\`\`

### Sync Policies

- **Manual** : synchronisation à la demande
- **Automated** : sync automatique quand Git change
- **Self-heal** : corrige les dérives (modifications manuelles)
- **Prune** : supprime les ressources non dans Git`,
    practiceContent: `# Exercice : Déployer avec ArgoCD

## Objectif
Installer ArgoCD et déployer une application depuis Git.

\`\`\`bash
# 1. Installer ArgoCD (minikube ou kind)
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# 2. Accéder à l'UI
kubectl port-forward svc/argocd-server -n argocd 8080:443

# 3. Se connecter avec argocd CLI
argocd login localhost:8080

# 4. Créer une application
argocd app create guestbook --repo https://github.com/argoproj/argocd-example-apps.git --path guestbook --dest-server https://kubernetes.default.svc --dest-namespace default

# 5. Synchroniser
argocd app sync guestbook
\`\`\``,
    keyPoints: JSON.stringify([
      'GitOps utilise Git comme source de vérité pour l\'infrastructure',
      'ArgoCD réconcilie automatiquement l\'état du cluster avec Git',
      'L\'Application Controller surveille et synchronise les apps',
      'Self-heal corrige les dérives par rapport à l\'état Git',
      'Prune supprime les ressources qui ne sont plus dans Git',
      'argocd CLI et l\'UI permettent de gérer les applications',
      'La sync policy définit si la réconciliation est auto ou manuelle',
      'ArgoCD supporte Helm, Kustomize, plain YAML et Jsonnet'
    ]),
  },
  // ARGOCD - Module 2
  {
    id: 'argocd-02',
    courseId: 'argocd',
    title: 'ArgoCD avancé : multi-environnements et sync',
    duration: '4h',
    orderIndex: 2,
    theoryContent: `# ArgoCD avancé

## 1. Multi-environnements

### Structure recommandée du repo

\`\`\`
gitops-repo/
├── base/
│   ├── deployment.yaml
│   ├── service.yaml
│   └── kustomization.yaml
├── overlays/
│   ├── dev/
│   │   └── kustomization.yaml
│   ├── staging/
│   │   └── kustomization.yaml
│   └── production/
│       └── kustomization.yaml
\`\`\`

### App of Apps pattern

Un pattern pour gérer plusieurs applications :

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: apps
spec:
  source:
    repoURL: https://github.com/org/gitops.git
    path: apps/
  destination:
    server: https://kubernetes.default.svc
    namespace: argocd
\`\`\`

Le dossier \`apps/\` contient les manifestes Application de chaque service.

## 2. Sync Waves et Hooks

Les sync waves contrôlent l'ordre de déploiement :

\`\`\`yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "1"
\`\`\`

Ordre : wave -1 → wave 0 → wave 1 → wave 2 ...

### Resource Hooks

\`\`\`yaml
metadata:
  annotations:
    argocd.argoproj.io/hook: PreSync
    argocd.argoproj.io/hook-delete-policy: HookSucceeded
\`\`\`

Types : PreSync, Sync, PostSync, SyncFail

## 3. ApplicationSets

Générer automatiquement des Applications :

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: cluster-apps
spec:
  generators:
    - list:
        elements:
          - cluster: dev
            url: https://dev.k8s.local
          - cluster: prod
            url: https://prod.k8s.local
  template:
    metadata:
      name: '{{cluster}}-app'
    spec:
      source:
        repoURL: https://github.com/org/repo.git
        path: 'overlays/{{cluster}}'
      destination:
        server: '{{url}}'
\`\`\`

## 4. RBAC et Projects

Les Projects ArgoCD limitent l'accès :

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: team-frontend
spec:
  sourceRepos:
    - 'https://github.com/org/frontend-*'
  destinations:
    - namespace: 'frontend-*'
      server: https://kubernetes.default.svc
  roles:
    - name: developer
      policies:
        - p, proj:team-frontend:developer, applications, sync, team-frontend/*, allow
\`\`\``,
    practiceContent: `# Exercice : Multi-environnements

## Objectif
Configurer ArgoCD pour gérer dev et production.

1. Créer un repo avec la structure Kustomize (base + overlays)
2. Créer deux Applications ArgoCD (dev et prod)
3. Configurer la sync automatique pour dev uniquement
4. Tester un déploiement : modifier l'image dans Git
5. Vérifier que dev se synchronise et prod attend une validation manuelle`,
    keyPoints: JSON.stringify([
      'Kustomize overlays permettent de gérer les différences entre envs',
      'App of Apps pattern déploie plusieurs applications via une seule',
      'Sync waves contrôlent l\'ordre de déploiement des ressources',
      'Les hooks PreSync/PostSync exécutent des actions avant/après sync',
      'ApplicationSets génèrent dynamiquement des Applications',
      'Les Projects limitent les repos sources et destinations autorisées',
      'Le RBAC ArgoCD contrôle qui peut sync quelles applications',
      'La promotion entre envs se fait par merge/PR dans le repo Git'
    ]),
  },
];
