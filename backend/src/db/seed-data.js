export const seedData = {
  courses: [
    {
      id: 'artifactory', title: 'JFrog Artifactory', subtitle: 'Gestionnaire de dépôts universels',
      description: 'Maîtrisez Artifactory, le gestionnaire de dépôts d\'artefacts universel. Apprenez à gérer vos binaires, conteneurs et packages dans un référentiel centralisé.',
      icon: '📦', color: '#41BF47', duration: '12 heures', level: 'Intermédiaire', category: 'Gestion des artefacts',
      prerequisites: JSON.stringify(['Connaissances de base en CI/CD', 'Familiarité avec Maven/Gradle/npm', 'Notions de Docker']),
      objectives: JSON.stringify(['Installer et configurer Artifactory', 'Gérer des dépôts locaux, distants et virtuels', 'Intégrer dans un pipeline CI/CD', 'Gérer les permissions et tokens', 'Utiliser promotion et rétention', 'Maîtriser l\'API REST et AQL']),
    },
    {
      id: 'sonarqube', title: 'SonarQube', subtitle: 'Analyse de qualité de code',
      description: 'Apprenez à utiliser SonarQube pour analyser la qualité de votre code, détecter bugs, vulnérabilités et code smells.',
      icon: '🔍', color: '#4E9BCD', duration: '10 heures', level: 'Intermédiaire', category: 'Qualité du code',
      prerequisites: JSON.stringify(['Connaissances en programmation', 'Notions de CI/CD', 'Familiarité avec Git']),
      objectives: JSON.stringify(['Installer et configurer SonarQube', 'Analyser avec SonarScanner', 'Comprendre les métriques', 'Configurer Quality Gates', 'Intégrer dans Jenkins/GitLab CI', 'Utiliser SonarLint en Connected Mode']),
    },
    {
      id: 'doors', title: 'IBM DOORS', subtitle: 'Gestion des exigences',
      description: 'Maîtrisez IBM DOORS pour la gestion des exigences dans les projets complexes. Traçabilité, liens et analyse d\'impact.',
      icon: '📋', color: '#054ADA', duration: '15 heures', level: 'Avancé', category: 'Gestion des exigences',
      prerequisites: JSON.stringify(['Notions d\'ingénierie système', 'Gestion de projet', 'Connaissance des cycles de développement V ou agile']),
      objectives: JSON.stringify(['Naviguer dans DOORS', 'Créer des modules d\'exigences', 'Établir la traçabilité', 'Utiliser vues et filtres', 'Programmer en DXL', 'Générer rapports', 'Administrer projets']),
    },
    {
      id: 'clearcase', title: 'IBM ClearCase', subtitle: 'Gestion de configuration logicielle',
      description: 'Apprenez IBM Rational ClearCase pour la gestion de configuration. Versionnement, branches, vues dynamiques et UCM.',
      icon: '🌿', color: '#1F70C1', duration: '14 heures', level: 'Avancé', category: 'Gestion de configuration',
      prerequisites: JSON.stringify(['Expérience avec un SCM (Git, SVN)', 'Connaissances système Linux/Unix', 'Notions de réseau']),
      objectives: JSON.stringify(['Architecture VOB/View', 'Vues dynamiques et snapshot', 'Branching et merging', 'UCM workflow complet', 'Administration VOBs', 'Triggers et automatisation', 'Migration vers Git']),
    },
    {
      id: 'klocwork', title: 'Klocwork', subtitle: 'Analyse statique de code',
      description: 'Découvrez Klocwork pour l\'analyse statique C, C++, Java, C#. Défauts critiques, vulnérabilités et conformité aux standards.',
      icon: '🛡️', color: '#E74C3C', duration: '11 heures', level: 'Intermédiaire', category: 'Analyse statique',
      prerequisites: JSON.stringify(['Programmation C/C++ ou Java', 'Notions de sécurité logicielle', 'Familiarité avec les outils de build (Make, CMake)']),
      objectives: JSON.stringify(['Installer Klocwork', 'Lancer des analyses locales et serveur', 'Interpréter les résultats', 'Configurer checkers MISRA et CERT', 'Intégrer dans CI/CD', 'Gérer les faux positifs', 'Générer des rapports de conformité']),
    },
    {
      id: 'jenkins', title: 'Jenkins', subtitle: 'Automatisation CI/CD',
      description: 'Maîtrisez Jenkins, le serveur d\'automatisation le plus populaire. Pipelines CI/CD, agents distribués, intégration outils.',
      icon: '🔧', color: '#D33833', duration: '16 heures', level: 'Débutant à Avancé', category: 'CI/CD',
      prerequisites: JSON.stringify(['Connaissances Linux de base', 'Familiarité avec Git', 'Notions de Docker recommandées']),
      objectives: JSON.stringify(['Installer Jenkins', 'Jobs Freestyle et Pipeline', 'Jenkinsfiles déclaratifs et scriptés', 'Agents distribués Docker et Kubernetes', 'Plugins et sécurité', 'Shared Libraries', 'JCasC et administration']),
    },
    {
      id: 'jira', title: 'Atlassian Jira', subtitle: 'Gestion de projet Agile',
      description: 'Maîtrisez Jira pour la gestion de projet Agile. Créez et gérez des projets Scrum et Kanban, configurez des workflows, utilisez JQL et automatisez vos processus.',
      icon: '📊', color: '#0052CC', duration: '10 heures', level: 'Débutant à Intermédiaire', category: 'Gestion de projet',
      prerequisites: JSON.stringify(['Notions de méthodologies Agile (Scrum, Kanban)', 'Familiarité avec la gestion de projet', 'Navigateur web moderne']),
      objectives: JSON.stringify(['Installer et configurer Jira Server/Data Center', 'Créer et gérer des projets Scrum et Kanban', 'Maîtriser les workflows et les transitions', 'Écrire des requêtes JQL avancées', 'Configurer les automation rules', 'Utiliser l\'API REST Jira']),
    },
    {
      id: 'confluence', title: 'Atlassian Confluence', subtitle: 'Documentation collaborative',
      description: 'Apprenez Confluence pour créer une base de connaissances collaborative. Espaces, pages, templates, macros et intégration avec l\'écosystème Atlassian.',
      icon: '📝', color: '#172B4D', duration: '8 heures', level: 'Débutant', category: 'Documentation',
      prerequisites: JSON.stringify(['Aucun prérequis technique spécifique', 'Familiarité avec un éditeur de texte', 'Navigateur web moderne']),
      objectives: JSON.stringify(['Installer Confluence Server/Data Center', 'Créer et organiser des espaces et pages', 'Utiliser templates et blueprints', 'Maîtriser les macros avancées', 'Gérer permissions et restrictions', 'Utiliser l\'API REST Confluence']),
    },
    {
      id: 'bitbucket', title: 'Atlassian Bitbucket', subtitle: 'Hébergement Git et CI/CD',
      description: 'Maîtrisez Bitbucket pour l\'hébergement Git et le CI/CD intégré avec Pipelines. Gestion des repos, pull requests, branch permissions et intégration Jira.',
      icon: '🔀', color: '#2684FF', duration: '12 heures', level: 'Intermédiaire', category: 'Gestion de code source',
      prerequisites: JSON.stringify(['Maîtrise de Git (branches, merge, rebase)', 'Connaissances Linux de base', 'Notions de CI/CD']),
      objectives: JSON.stringify(['Installer Bitbucket Server/Data Center sur Linux', 'Gérer repositories et branches', 'Configurer les pull requests et merge checks', 'Écrire des pipelines CI/CD (bitbucket-pipelines.yml)', 'Administrer permissions et hooks', 'Utiliser l\'API REST Bitbucket']),
    },
  ],

  modules: [


    // ==================== ARTIFACTORY ====================
    { id: 'art-01', courseId: 'artifactory', title: 'Introduction à Artifactory', duration: '3h', orderIndex: 1,
      theoryContent: `## Introduction à JFrog Artifactory

### Présentation

JFrog Artifactory est un **gestionnaire de dépôts d'artefacts universel** (Universal Artifact Repository Manager). C'est la solution leader du marché pour stocker, gérer et distribuer tous les artefacts logiciels générés pendant le cycle de développement : binaires compilés, packages, images Docker, fichiers Helm, etc.

Dans le développement logiciel moderne, chaque build produit des **artefacts** : fichiers JAR, packages npm, images Docker, fichiers .deb/.rpm, etc. Sans gestionnaire d'artefacts centralisé, les équipes rencontrent ces problèmes :

- **Pas de source unique de vérité** : les binaires sont éparpillés sur des serveurs de fichiers, des disques partagés
- **Pas de traçabilité** : impossible de savoir quel commit a produit quel binaire
- **Pas de contrôle d'accès** : n'importe qui peut écraser ou supprimer un artefact
- **Builds non reproductibles** : les dépendances externes peuvent disparaître ou changer
- **Pas de promotion** : pas de workflow pour passer un artefact de dev à staging à production

Artifactory résout tous ces problèmes en fournissant un **point central** pour tous les artefacts de l'entreprise. Il supporte plus de 30 formats de packages nativement et offre des fonctionnalités avancées de sécurité, de réplication et de haute disponibilité.

### Installation sur Linux (Ubuntu/Debian)

#### Prérequis système

\\\`\\\`\\\`bash
# Vérifier les prérequis
java -version          # Java 11+ requis (OpenJDK ou Oracle JDK)
free -h                # Minimum 4 Go RAM recommandé
df -h                  # Minimum 10 Go espace disque

# Installer Java si nécessaire
sudo apt update
sudo apt install -y openjdk-17-jdk

# Vérifier
java -version
\\\`\\\`\\\`

#### Installation via Docker (Recommandée pour labs)

\\\`\\\`\\\`bash
# Créer les répertoires de données
sudo mkdir -p /opt/artifactory/data
sudo mkdir -p /opt/artifactory/logs
sudo mkdir -p /opt/artifactory/etc
sudo chown -R 1030:1030 /opt/artifactory

# Lancer Artifactory OSS avec Docker
docker run -d --name artifactory \\\\
  -p 8081:8081 -p 8082:8082 \\\\
  -v /opt/artifactory/data:/var/opt/jfrog/artifactory \\\\
  -v /opt/artifactory/logs:/opt/jfrog/artifactory/var/log \\\\
  --restart unless-stopped \\\\
  releases-docker.jfrog.io/jfrog/artifactory-oss:latest

# Vérifier que le conteneur est lancé
docker ps | grep artifactory
docker logs -f artifactory
# Attendre "Artifactory successfully started"
# L'interface est disponible sur http://localhost:8082/ui/
\\\`\\\`\\\`

#### Installation standalone (Production)

\\\`\\\`\\\`bash
# Télécharger la dernière version
wget https://releases.jfrog.io/artifactory/bintray-artifactory/org/artifactory/oss/jfrog-artifactory-oss/[RELEASE]/jfrog-artifactory-oss-[RELEASE]-linux.tar.gz

# Extraire
sudo tar -xzf jfrog-artifactory-oss-*.tar.gz -C /opt/
sudo ln -s /opt/artifactory-oss-* /opt/artifactory

# Créer l'utilisateur système
sudo useradd -r -m -U -d /opt/artifactory -s /bin/false artifactory
sudo chown -R artifactory:artifactory /opt/artifactory

# Configurer comme service systemd
sudo cat > /etc/systemd/system/artifactory.service << 'EOF'
[Unit]
Description=JFrog Artifactory
After=network.target

[Service]
Type=forking
User=artifactory
Group=artifactory
ExecStart=/opt/artifactory/app/bin/artifactoryManage.sh start
ExecStop=/opt/artifactory/app/bin/artifactoryManage.sh stop
Restart=on-failure
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
EOF

# Activer et démarrer le service
sudo systemctl daemon-reload
sudo systemctl enable artifactory
sudo systemctl start artifactory

# Vérifier le statut
sudo systemctl status artifactory
# Attendre que le port 8082 soit accessible
curl -s http://localhost:8082/router/api/v1/system/health
\\\`\\\`\\\`

#### Installation sur Linux (CentOS/RHEL)

\\\`\\\`\\\`bash
# Installer les prérequis
sudo yum install -y java-17-openjdk java-17-openjdk-devel wget

# Ajouter le dépôt JFrog
sudo cat > /etc/yum.repos.d/artifactory.repo << 'EOF'
[artifactory]
name=JFrog Artifactory
baseurl=https://releases.jfrog.io/artifactory/artifactory-rpms/
gpgcheck=0
enabled=1
EOF

# Installer via yum
sudo yum install -y jfrog-artifactory-oss

# Démarrer le service
sudo systemctl start artifactory
sudo systemctl enable artifactory
sudo systemctl status artifactory
\\\`\\\`\\\`

#### Vérification de l'installation

\\\`\\\`\\\`bash
# Vérifier que les services sont actifs
curl -s http://localhost:8082/router/api/v1/system/health | python3 -m json.tool
# Doit retourner : {"router":{"state":"HEALTHY"...}}

# Vérifier l'accès à l'API
curl -s -u admin:password http://localhost:8082/artifactory/api/system/ping
# Doit retourner : OK

# Vérifier la version
curl -s -u admin:password http://localhost:8082/artifactory/api/system/version
\\\`\\\`\\\`

### Architecture et composants

\\\`\\\`\\\`
┌─────────────────────────────────────────────────────────────────┐
│                      ARTIFACTORY PLATFORM                        │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐  │
│  │   Router     │  │  Access      │  │   Metadata            │  │
│  │  (Nginx)     │  │  Service     │  │   Service             │  │
│  │  Port 8082   │  │  (Auth/ACL)  │  │   (Properties/Stats)  │  │
│  └──────────────┘  └──────────────┘  └───────────────────────┘  │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐  │
│  │  Artifactory │  │   Event      │  │   JFrog Xray          │  │
│  │  Service     │  │   Service    │  │   (Sécurité)          │  │
│  │  Port 8081   │  │  (Webhooks)  │  │   (Pro/Enterprise)    │  │
│  └──────────────┘  └──────────────┘  └───────────────────────┘  │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Storage Backend                          │  │
│  │   Filesystem / S3 / Azure Blob / Google Cloud Storage      │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Database Backend                         │  │
│  │   Derby (dev) / PostgreSQL / MySQL / Oracle / MS SQL       │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
\\\`\\\`\\\`

**Composants principaux :**
- **Router (Nginx)** : Point d'entrée unique, reverse proxy, TLS termination
- **Access Service** : Authentification, autorisation, gestion des tokens
- **Artifactory Service** : Gestion des dépôts, résolution des artefacts
- **Metadata Service** : Propriétés, statistiques, recherche
- **Event Service** : Webhooks, notifications, réplication

### Commandes essentielles

\\\`\\\`\\\`bash
# === GESTION DU SERVICE ===
sudo systemctl start artifactory      # Démarrer Artifactory
sudo systemctl stop artifactory       # Arrêter Artifactory
sudo systemctl restart artifactory    # Redémarrer
sudo systemctl status artifactory     # Vérifier le statut
journalctl -u artifactory -f          # Voir les logs en temps réel

# === JFROG CLI - Installation ===
curl -fL https://install-cli.jfrog.io | sh   # Installer jfrog CLI
jf --version                                  # Vérifier la version
jf config add my-server --url=http://localhost:8082 --user=admin --password=password  # Configurer
jf config show                                # Afficher la configuration
jf rt ping                                    # Tester la connexion

# === JFROG CLI - Opérations sur les dépôts ===
jf rt repo-create template.json               # Créer un dépôt depuis un template
jf rt repo-delete libs-snapshot-local         # Supprimer un dépôt
jf rt repo-list                               # Lister tous les dépôts

# === JFROG CLI - Upload/Download ===
jf rt upload "*.jar" libs-release-local/com/company/app/1.0/   # Upload
jf rt download "libs-release-local/com/company/app/1.0/*.jar"  # Download
jf rt upload "target/*.jar" libs-release-local/ --flat=false    # Upload avec arborescence
jf rt copy libs-release-local/app.jar libs-prod-local/app.jar  # Copier
jf rt move libs-staging/app.jar libs-prod/app.jar              # Déplacer
jf rt delete "libs-snapshot-local/com/old/*"                   # Supprimer

# === JFROG CLI - Propriétés ===
jf rt set-props "libs-release-local/app-1.0.jar" "build.status=tested;qa.approved=true"
jf rt search "libs-release-local/" --props="build.status=tested"

# === JFROG CLI - Build Info ===
jf rt build-collect-env my-build 1            # Collecter les variables d'environnement
jf rt build-add-git my-build 1                # Ajouter les infos Git
jf rt build-publish my-build 1                # Publier le Build Info
jf rt build-promote my-build 1 libs-prod-local --status="Released"  # Promouvoir

# === API REST - Opérations courantes ===
# Ping
curl -u admin:password http://localhost:8082/artifactory/api/system/ping

# Lister les dépôts
curl -u admin:password http://localhost:8082/artifactory/api/repositories

# Infos sur un artefact
curl -u admin:password http://localhost:8082/artifactory/api/storage/libs-release-local/com/app/1.0/app-1.0.jar

# Déployer un fichier
curl -u admin:password -T app-1.0.jar "http://localhost:8082/artifactory/libs-release-local/com/app/1.0/app-1.0.jar"

# Recherche par propriété
curl -u admin:password "http://localhost:8082/artifactory/api/search/prop?build.status=released"

# Recherche AQL
curl -u admin:password -X POST "http://localhost:8082/artifactory/api/search/aql" \\
  -H "Content-Type: text/plain" \\
  -d 'items.find({"repo":"libs-release-local","name":{"$match":"*.jar"}})'

# Statistiques système
curl -u admin:password http://localhost:8082/artifactory/api/system/storage

# Créer un token d'accès
curl -u admin:password -X POST "http://localhost:8082/access/api/v1/tokens" \\
  -d "username=ci-user&scope=member-of-groups:readers&expires_in=3600"
\\\`\\\`\\\`

### Configuration

#### Configuration système (system.yaml)

\\\`\\\`\\\`yaml
# /opt/artifactory/var/etc/system.yaml
shared:
  database:
    type: postgresql
    url: jdbc:postgresql://localhost:5432/artifactory
    driver: org.postgresql.Driver
    username: artifactory
    password: password
  node:
    id: "node1"
    ip: "192.168.1.100"
  security:
    joinKey: "your-join-key-here"

artifactory:
  port: 8081
  tomcat:
    connector:
      maxThreads: 200
      sendReasonPhrase: true
  
router:
  entryPoints:
    internalPort: 8046
  externalPort: 8082
\\\`\\\`\\\`

#### Configuration Maven (settings.xml)

\\\`\\\`\\\`xml
<?xml version="1.0" encoding="UTF-8"?>
<settings>
  <servers>
    <server>
      <id>artifactory</id>
      <username>admin</username>
      <password>your-encrypted-password</password>
    </server>
  </servers>
  <mirrors>
    <mirror>
      <id>artifactory</id>
      <mirrorOf>*</mirrorOf>
      <url>http://localhost:8082/artifactory/maven-virtual/</url>
    </mirror>
  </mirrors>
  <profiles>
    <profile>
      <id>artifactory</id>
      <repositories>
        <repository>
          <id>central</id>
          <url>http://localhost:8082/artifactory/maven-virtual/</url>
          <releases><enabled>true</enabled></releases>
          <snapshots><enabled>true</enabled></snapshots>
        </repository>
      </repositories>
    </profile>
  </profiles>
  <activeProfiles>
    <activeProfile>artifactory</activeProfile>
  </activeProfiles>
</settings>
\\\`\\\`\\\`

### Utilisation avancée

#### Formats supportés (Package Types)

Artifactory supporte nativement plus de 30 formats :
- **Java** : Maven, Gradle, Ivy, SBT
- **JavaScript** : npm, Yarn, Bower, pnpm
- **Python** : PyPI, Conda
- **Docker** : Docker Registry V2
- **.NET** : NuGet
- **Linux** : Debian (apt), RPM (yum), Alpine (apk)
- **Go** : Go Modules, Go Registry
- **Helm** : Charts Kubernetes
- **Terraform** : Modules et Providers
- **Rust** : Cargo/crates.io
- **Ruby** : RubyGems
- **PHP** : Composer/Packagist
- **Generic** : tout fichier binaire

#### Métadonnées et propriétés

Chaque artefact dans Artifactory possède :
- **Checksums** : MD5, SHA1, SHA256 pour vérifier l'intégrité
- **Propriétés** : paires clé-valeur personnalisables (build.number, release.status, etc.)
- **Build Info** : lien complet vers le build CI qui l'a produit
- **Statistics** : nombre de téléchargements, date du dernier accès, taille

#### Architecture des dépôts

| Type | Description | Exemple d'usage |
|------|-------------|-----------------|
| **Local** | Stockage interne des artefacts produits | Vos JAR, images Docker, packages npm |
| **Remote** | Proxy/cache de dépôts externes | Cache de Maven Central, npm registry, Docker Hub |
| **Virtual** | Agrégation de plusieurs dépôts | Un seul URL pour local + remote |
| **Federated** | Réplication multi-site (Enterprise+) | Synchronisation entre datacenters |

### Bonnes pratiques

1. **Séparer releases et snapshots** dans des dépôts différents avec des politiques de rétention distinctes
2. **Un remote par source externe** (Maven Central, npm registry, Docker Hub, PyPI)
3. **Toujours utiliser des virtuels** pour les développeurs - un seul URL à configurer
4. **Configurer la rétention** dès le départ pour éviter que le stockage explose
5. **Utiliser des propriétés** pour le lifecycle management et la promotion
6. **Access Tokens** plutôt que des mots de passe pour les services CI/CD
7. **Sauvegarder la configuration** régulièrement (system.yaml, access, security)
8. **Monitorer** l'espace disque, les connexions et la latence des remotes
9. **Ne jamais déployer directement en production** - toujours passer par la promotion
10. **Documenter la convention de nommage** et l'appliquer dès le début`,

      practiceContent: `### Travaux Pratiques : Découverte d'Artifactory

#### Prérequis
- Docker et Docker Compose installés
- Maven ou npm installé localement
- Navigateur web
- curl disponible en ligne de commande

#### Étape 1 : Lancer Artifactory avec Docker

\\\`\\\`\\\`bash
# Créer un répertoire de travail
mkdir -p ~/artifactory-tp && cd ~/artifactory-tp

# Préparer les volumes
mkdir -p data logs
sudo chown -R 1030:1030 data logs

# Lancer Artifactory OSS avec Docker
docker run -d --name artifactory \\\\
  -p 8081:8081 -p 8082:8082 \\\\
  -v $(pwd)/data:/var/opt/jfrog/artifactory \\\\
  -v $(pwd)/logs:/opt/jfrog/artifactory/var/log \\\\
  --restart unless-stopped \\\\
  releases-docker.jfrog.io/jfrog/artifactory-oss:latest

# Vérifier que le conteneur est lancé
docker logs -f artifactory
# Attendre le message "Artifactory successfully started"
# Cela peut prendre 1-2 minutes au premier lancement

# Tester l'accès
curl -s http://localhost:8082/router/api/v1/system/health
\\\`\\\`\\\`

#### Étape 2 : Configuration initiale

1. Ouvrez http://localhost:8082/ui/ dans votre navigateur
2. Connectez-vous avec les identifiants par défaut : admin / password
3. Suivez le wizard de configuration initiale :
   - Changez le mot de passe admin (notez-le !)
   - Configurez l'URL de base : http://localhost:8082
   - Sautez la configuration du proxy si pas nécessaire
4. Créez vos premiers dépôts via l'UI :
   - Local Maven : \\\`libs-release-local\\\`
   - Local Maven : \\\`libs-snapshot-local\\\`
   - Remote Maven : \\\`remote-maven-central\\\` → https://repo1.maven.org/maven2
   - Virtual Maven : \\\`maven-virtual\\\` (agrège les trois précédents)

#### Étape 3 : Installer et configurer le JFrog CLI

\\\`\\\`\\\`bash
# Installer le JFrog CLI
curl -fL https://install-cli.jfrog.io | sh
sudo mv jf /usr/local/bin/

# Vérifier l'installation
jf --version

# Configurer la connexion au serveur
jf config add local-artif \\\\
  --url=http://localhost:8082 \\\\
  --user=admin \\\\
  --password=votre-nouveau-mdp \\\\
  --interactive=false

# Tester la connexion
jf rt ping
# Doit retourner "OK"

# Lister les dépôts
jf rt repo-list
\\\`\\\`\\\`

#### Étape 4 : Configurer Maven pour utiliser Artifactory

\\\`\\\`\\\`bash
# Créer le fichier settings.xml
mkdir -p ~/.m2
cat > ~/.m2/settings.xml << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<settings>
  <servers>
    <server>
      <id>artifactory</id>
      <username>admin</username>
      <password>votre-nouveau-mdp</password>
    </server>
  </servers>
  <mirrors>
    <mirror>
      <id>artifactory</id>
      <mirrorOf>*</mirrorOf>
      <url>http://localhost:8082/artifactory/maven-virtual/</url>
    </mirror>
  </mirrors>
</settings>
EOF

# Créer un projet Maven simple
mvn archetype:generate \\\\
  -DgroupId=com.formation.tp \\\\
  -DartifactId=test-artifactory \\\\
  -DarchetypeArtifactId=maven-archetype-quickstart \\\\
  -DinteractiveMode=false

cd test-artifactory

# Builder le projet (les dépendances passent par Artifactory)
mvn clean package

# Vérifier dans l'UI qu'Artifactory a mis en cache les dépendances
# → Artifacts > remote-maven-central > parcourir l'arborescence
\\\`\\\`\\\`

#### Étape 5 : Déployer un artefact via l'API REST

\\\`\\\`\\\`bash
# Créer un JAR fictif pour le test
echo "Formation Artifactory TP" > dummy.txt
jar cf formation-tp-1.0.jar dummy.txt

# Calculer le checksum SHA256
SHA256=$(sha256sum formation-tp-1.0.jar | cut -d' ' -f1)

# Déployer via curl avec checksum
curl -u admin:votre-nouveau-mdp \\\\
  -X PUT \\\\
  -H "X-Checksum-Sha256:$SHA256" \\\\
  -T formation-tp-1.0.jar \\\\
  "http://localhost:8082/artifactory/libs-release-local/com/formation/tp/1.0/formation-tp-1.0.jar"

# Vérifier le déploiement
curl -u admin:votre-nouveau-mdp \\\\
  "http://localhost:8082/artifactory/api/storage/libs-release-local/com/formation/tp/1.0/formation-tp-1.0.jar" | python3 -m json.tool

# Ajouter des propriétés
curl -u admin:votre-nouveau-mdp \\\\
  -X PUT \\\\
  "http://localhost:8082/artifactory/api/storage/libs-release-local/com/formation/tp/1.0/formation-tp-1.0.jar?properties=build.number=1;build.status=tested;git.commit=abc123def"

# Lire les propriétés
curl -u admin:votre-nouveau-mdp \\\\
  "http://localhost:8082/artifactory/api/storage/libs-release-local/com/formation/tp/1.0/formation-tp-1.0.jar?properties" | python3 -m json.tool
\\\`\\\`\\\`

#### Étape 6 : Utiliser le JFrog CLI pour les opérations courantes

\\\`\\\`\\\`bash
# Upload avec le CLI
jf rt upload "formation-tp-1.0.jar" "libs-release-local/com/formation/tp/1.0/"

# Rechercher des artefacts
jf rt search "libs-release-local/com/formation/**"

# Ajouter des propriétés via CLI
jf rt set-props "libs-release-local/com/formation/tp/1.0/formation-tp-1.0.jar" "promoted=true;env=staging"

# Télécharger un artefact
jf rt download "libs-release-local/com/formation/tp/1.0/formation-tp-1.0.jar" ./downloaded/

# Copier vers un autre dépôt (promotion)
jf rt copy "libs-release-local/com/formation/tp/1.0/formation-tp-1.0.jar" "libs-prod-local/com/formation/tp/1.0/"
\\\`\\\`\\\`

#### Questions de vérification
- Combien de fichiers ont été mis en cache dans le remote repository après le build Maven ?
- Quelle est la taille totale du stockage utilisé (Administration > Monitoring > Storage) ?
- Les checksums SHA256 correspondent-ils entre le fichier local et celui déployé ?
- La recherche par propriété retourne-t-elle les résultats attendus ?`,

      keyPoints: JSON.stringify([
        'Artifactory est un gestionnaire universel supportant 30+ formats de packages',
        'Installation possible via Docker, package système ou standalone avec systemd',
        'Trois types de dépôts : Local (stockage), Remote (proxy/cache), Virtual (agrégation)',
        'JFrog CLI (jf) pour les opérations courantes : upload, download, search, props',
        'API REST complète pour l\'automatisation de toutes les opérations',
        'Les métadonnées incluent checksums, propriétés personnalisables et build info'
      ]) },



    { id: 'art-02', courseId: 'artifactory', title: 'Gestion des dépôts', duration: '4h', orderIndex: 2,
      theoryContent: `## Gestion avancée des dépôts Artifactory

### Présentation

La gestion des dépôts est au coeur de l'utilisation quotidienne d'Artifactory. Une bonne organisation des dépôts est essentielle pour la maintenabilité, la performance et la sécurité de votre infrastructure d'artefacts. Ce module couvre en détail les trois types de dépôts, les stratégies de nommage, la configuration avancée et les politiques de rétention.

### Installation sur Linux (Ubuntu/Debian)

L'installation d'Artifactory a été couverte dans le module précédent. Pour ce module, nous nous concentrons sur la configuration post-installation des dépôts. Voici comment vérifier que votre installation est prête :

\\\`\\\`\\\`bash
# Vérifier que le service est actif
sudo systemctl status artifactory

# Vérifier la connectivité API
curl -s -u admin:password http://localhost:8082/artifactory/api/system/ping
# Réponse attendue : OK

# Vérifier l'espace disque disponible pour les dépôts
df -h /var/opt/jfrog/artifactory
# Recommandation : au moins 50 Go pour un environnement de production

# Vérifier les dépôts existants
curl -s -u admin:password http://localhost:8082/artifactory/api/repositories | python3 -m json.tool

# Si vous utilisez Docker, vérifier le conteneur
docker exec artifactory df -h /var/opt/jfrog/artifactory
\\\`\\\`\\\`

### Installation sur Linux (CentOS/RHEL)

\\\`\\\`\\\`bash
# Vérifier le service sur CentOS
sudo systemctl status artifactory
sudo journalctl -u artifactory --since "1 hour ago"

# Vérifier les ports ouverts
sudo ss -tlnp | grep -E "808[12]"
# 8081 = Artifactory service
# 8082 = Router (point d'entrée principal)

# Configurer le firewall si nécessaire
sudo firewall-cmd --permanent --add-port=8081/tcp
sudo firewall-cmd --permanent --add-port=8082/tcp
sudo firewall-cmd --reload
\\\`\\\`\\\`

### Architecture et composants

#### Stratégie de nommage des dépôts

La convention recommandée par JFrog est :
\\\`\\\`\\\`
<équipe>-<technologie>-<type>-<maturité>
\\\`\\\`\\\`

Exemples concrets :
- \\\`backend-maven-release-local\\\` : releases Maven de l'équipe backend
- \\\`frontend-npm-dev-local\\\` : packages npm de développement frontend
- \\\`devops-docker-prod-local\\\` : images Docker de production
- \\\`company-maven-remote\\\` : cache de Maven Central (partagé)
- \\\`company-npm-virtual\\\` : agrégation npm (point d'entrée unique)

#### Architecture d'un dépôt virtuel

\\\`\\\`\\\`
┌─────────────────────────────────────────────────────────┐
│            Dépôt Virtuel "maven-virtual"                 │
│     (point d'entrée unique pour les développeurs)        │
│     URL: http://artif:8082/artifactory/maven-virtual/    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────┐  ┌────────────────────────────┐    │
│  │     Local        │  │        Remote              │    │
│  │ libs-release-    │  │  maven-central-remote      │    │
│  │ local            │  │  (→repo1.maven.org/maven2) │    │
│  │ (priorité 1)    │  │  (priorité 3)              │    │
│  └─────────────────┘  └────────────────────────────┘    │
│                                                          │
│  ┌─────────────────┐  ┌────────────────────────────┐    │
│  │     Local        │  │        Remote              │    │
│  │ libs-snapshot-   │  │  jcenter-remote            │    │
│  │ local            │  │  (→jcenter.bintray.com)    │    │
│  │ (priorité 2)    │  │  (priorité 4)              │    │
│  └─────────────────┘  └────────────────────────────┘    │
│                                                          │
└─────────────────────────────────────────────────────────┘
\\\`\\\`\\\`

### Commandes essentielles

\\\`\\\`\\\`bash
# === GESTION DES DÉPÔTS VIA API REST ===

# Lister tous les dépôts
curl -u admin:password http://localhost:8082/artifactory/api/repositories

# Lister par type
curl -u admin:password "http://localhost:8082/artifactory/api/repositories?type=local"
curl -u admin:password "http://localhost:8082/artifactory/api/repositories?type=remote"
curl -u admin:password "http://localhost:8082/artifactory/api/repositories?type=virtual"

# Créer un dépôt local Maven
curl -u admin:password -X PUT "http://localhost:8082/artifactory/api/repositories/libs-release-local" \\
  -H "Content-Type: application/json" \\
  -d '{
    "key": "libs-release-local",
    "rclass": "local",
    "packageType": "maven",
    "description": "Dépôt pour les releases Maven internes",
    "handleReleases": true,
    "handleSnapshots": false,
    "checksumPolicyType": "client-checksums",
    "snapshotVersionBehavior": "unique",
    "maxUniqueSnapshots": 0,
    "suppressPomConsistencyChecks": false,
    "propertySets": ["artifactory"]
  }'

# Créer un dépôt remote vers Maven Central
curl -u admin:password -X PUT "http://localhost:8082/artifactory/api/repositories/maven-central-remote" \\
  -H "Content-Type: application/json" \\
  -d '{
    "key": "maven-central-remote",
    "rclass": "remote",
    "packageType": "maven",
    "url": "https://repo1.maven.org/maven2",
    "description": "Proxy cache de Maven Central",
    "storeArtifactsLocally": true,
    "retrievalCachePeriodSecs": 7200,
    "missedRetrievalCachePeriodSecs": 1800,
    "unusedArtifactsCleanupPeriodHours": 720
  }'

# Créer un dépôt virtuel
curl -u admin:password -X PUT "http://localhost:8082/artifactory/api/repositories/maven-virtual" \\
  -H "Content-Type: application/json" \\
  -d '{
    "key": "maven-virtual",
    "rclass": "virtual",
    "packageType": "maven",
    "repositories": ["libs-release-local", "libs-snapshot-local", "maven-central-remote"],
    "defaultDeploymentRepo": "libs-release-local",
    "description": "Agrégation Maven (local + remote)"
  }'

# Obtenir la configuration d'un dépôt
curl -u admin:password "http://localhost:8082/artifactory/api/repositories/libs-release-local"

# Modifier un dépôt existant
curl -u admin:password -X POST "http://localhost:8082/artifactory/api/repositories/libs-release-local" \\
  -H "Content-Type: application/json" \\
  -d '{"description": "Description mise à jour", "maxUniqueSnapshots": 5}'

# Supprimer un dépôt
curl -u admin:password -X DELETE "http://localhost:8082/artifactory/api/repositories/old-repo-local"

# === GESTION DES DÉPÔTS VIA JFROG CLI ===
jf rt repo-create template-local.json     # Créer depuis un template JSON
jf rt repo-delete old-repo                # Supprimer un dépôt
jf rt repo-list                           # Lister tous les dépôts

# === DÉPÔTS NPM ===
curl -u admin:password -X PUT "http://localhost:8082/artifactory/api/repositories/npm-local" \\
  -H "Content-Type: application/json" \\
  -d '{"key":"npm-local","rclass":"local","packageType":"npm"}'

curl -u admin:password -X PUT "http://localhost:8082/artifactory/api/repositories/npm-remote" \\
  -H "Content-Type: application/json" \\
  -d '{"key":"npm-remote","rclass":"remote","packageType":"npm","url":"https://registry.npmjs.org"}'

# === DÉPÔTS DOCKER ===
curl -u admin:password -X PUT "http://localhost:8082/artifactory/api/repositories/docker-local" \\
  -H "Content-Type: application/json" \\
  -d '{"key":"docker-local","rclass":"local","packageType":"docker"}'

# === POLITIQUES DE RÉTENTION (AQL) ===
# Trouver les snapshots de plus de 30 jours
curl -u admin:password -X POST "http://localhost:8082/artifactory/api/search/aql" \\
  -H "Content-Type: text/plain" \\
  -d 'items.find({"repo":"libs-snapshot-local","modified":{"$before":"30d"},"type":"file"}).include("name","path","size","modified")'

# Trouver les artefacts jamais téléchargés depuis 60 jours
curl -u admin:password -X POST "http://localhost:8082/artifactory/api/search/aql" \\
  -H "Content-Type: text/plain" \\
  -d 'items.find({"repo":"libs-release-local","stat.downloaded":{"$before":"60d"}}).include("name","repo","path","size")'

# Supprimer les résultats (après vérification !)
# curl -u admin:password -X DELETE "http://localhost:8082/artifactory/libs-snapshot-local/path/to/old/artifact"

# === RÉPLICATION ===
# Configurer une push replication
curl -u admin:password -X PUT "http://localhost:8082/artifactory/api/replications/libs-release-local" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "http://remote-artif:8082/artifactory/libs-release-local",
    "username": "replication-user",
    "password": "replication-pass",
    "enabled": true,
    "cronExp": "0 0/5 * * * ?",
    "syncDeletes": true,
    "syncProperties": true
  }'

# === STATISTIQUES DE STOCKAGE ===
curl -u admin:password http://localhost:8082/artifactory/api/storageinfo
\\\`\\\`\\\`

### Configuration

#### Paramètres clés des dépôts Remote

| Paramètre | Description | Valeur recommandée |
|-----------|-------------|-------------------|
| retrievalCachePeriodSecs | Durée de cache avant re-vérification | 7200 (releases), 0 (snapshots) |
| missedRetrievalCachePeriodSecs | Cache des réponses 404 | 1800 (30 min) |
| unusedArtifactsCleanupPeriodHours | Suppression si non utilisé | 0 (jamais) ou 720 (30j) |
| storeArtifactsLocally | Garder une copie en cache | true (toujours) |
| blockMismatchingMimeTypes | Bloquer les MIME types incorrects | true |
| socketTimeoutMillis | Timeout de connexion | 15000 |

#### Configuration Docker avec Artifactory

\\\`\\\`\\\`bash
# Configurer Docker pour utiliser Artifactory comme registry
# Ajouter le registry insecure (pour les labs sans TLS)
sudo cat > /etc/docker/daemon.json << 'EOF'
{
  "insecure-registries": ["localhost:8082"]
}
EOF
sudo systemctl restart docker

# Login au registry Artifactory
docker login localhost:8082 -u admin -p password

# Taguer et pousser une image
docker tag myapp:latest localhost:8082/docker-local/myapp:1.0
docker push localhost:8082/docker-local/myapp:1.0

# Tirer une image depuis Artifactory
docker pull localhost:8082/docker-local/myapp:1.0
\\\`\\\`\\\`

### Utilisation avancée

#### Résolution des artefacts dans un virtuel

L'ordre de résolution est configurable et important :
1. Cherche dans le premier dépôt listé (local release)
2. Cherche dans le deuxième dépôt (local snapshot)
3. Cherche dans les remotes (avec cache)
4. Si pas trouvé → retourne 404

#### Promotion d'artefacts

La promotion fait avancer un artefact dans le pipeline :
\\\`\\\`\\\`
libs-snapshot-local → libs-release-local → libs-staging-local → libs-prod-local
\\\`\\\`\\\`

### Bonnes pratiques

1. **Séparer releases et snapshots** dans des dépôts différents
2. **Un remote par source externe** (Maven Central, npm registry, Docker Hub)
3. **Toujours utiliser des virtuels** pour les développeurs
4. **Configurer la rétention** dès le départ (snapshots > 30j, unused > 60j)
5. **Limiter les droits de déploiement** aux pipelines CI uniquement
6. **Documenter la topologie** des dépôts et la maintenir à jour`,

      practiceContent: `### Travaux Pratiques : Gestion des dépôts

#### TP 1 : Créer une topologie complète de dépôts

\\\`\\\`\\\`bash
# Variables d'environnement
export ARTIF_URL="http://localhost:8082/artifactory"
export AUTH="-u admin:password"

# Créer les dépôts Maven
curl $AUTH -X PUT "$ARTIF_URL/api/repositories/libs-release-local" \\
  -H "Content-Type: application/json" \\
  -d '{"key":"libs-release-local","rclass":"local","packageType":"maven","handleReleases":true,"handleSnapshots":false}'

curl $AUTH -X PUT "$ARTIF_URL/api/repositories/libs-snapshot-local" \\
  -H "Content-Type: application/json" \\
  -d '{"key":"libs-snapshot-local","rclass":"local","packageType":"maven","handleReleases":false,"handleSnapshots":true}'

curl $AUTH -X PUT "$ARTIF_URL/api/repositories/maven-central-remote" \\
  -H "Content-Type: application/json" \\
  -d '{"key":"maven-central-remote","rclass":"remote","packageType":"maven","url":"https://repo1.maven.org/maven2"}'

curl $AUTH -X PUT "$ARTIF_URL/api/repositories/maven-virtual" \\
  -H "Content-Type: application/json" \\
  -d '{"key":"maven-virtual","rclass":"virtual","packageType":"maven","repositories":["libs-release-local","libs-snapshot-local","maven-central-remote"],"defaultDeploymentRepo":"libs-release-local"}'

# Créer les dépôts npm
curl $AUTH -X PUT "$ARTIF_URL/api/repositories/npm-local" \\
  -H "Content-Type: application/json" \\
  -d '{"key":"npm-local","rclass":"local","packageType":"npm"}'

curl $AUTH -X PUT "$ARTIF_URL/api/repositories/npm-remote" \\
  -H "Content-Type: application/json" \\
  -d '{"key":"npm-remote","rclass":"remote","packageType":"npm","url":"https://registry.npmjs.org"}'

curl $AUTH -X PUT "$ARTIF_URL/api/repositories/npm-virtual" \\
  -H "Content-Type: application/json" \\
  -d '{"key":"npm-virtual","rclass":"virtual","packageType":"npm","repositories":["npm-local","npm-remote"],"defaultDeploymentRepo":"npm-local"}'

# Vérifier la création
curl $AUTH "$ARTIF_URL/api/repositories" | python3 -m json.tool | grep key
\\\`\\\`\\\`

#### TP 2 : Configurer npm avec Artifactory

\\\`\\\`\\\`bash
# Configurer npm pour utiliser le virtual
npm config set registry http://localhost:8082/artifactory/api/npm/npm-virtual/

# Authentification npm
curl $AUTH -X PUT "$ARTIF_URL/api/npm/auth" > ~/.npmrc
# Ou manuellement :
npm config set //localhost:8082/artifactory/api/npm/npm-virtual/:_authToken "votre-token"

# Tester l'installation d'un package
mkdir test-npm && cd test-npm
npm init -y
npm install express
npm install lodash

# Vérifier que les packages sont cachés dans Artifactory
curl $AUTH "$ARTIF_URL/api/search/aql" \\
  -H "Content-Type: text/plain" \\
  -d 'items.find({"repo":"npm-remote"}).include("name","size").limit(10)'
\\\`\\\`\\\`

#### TP 3 : Tester la résolution via le virtuel

\\\`\\\`\\\`bash
# Déployer un artefact dans le local
echo "test" > test-file.txt
jar cf test-resolve-1.0.jar test-file.txt
curl $AUTH -T test-resolve-1.0.jar \\
  "$ARTIF_URL/libs-release-local/com/formation/test-resolve/1.0/test-resolve-1.0.jar"

# Accéder via le virtuel
curl -I $AUTH "$ARTIF_URL/maven-virtual/com/formation/test-resolve/1.0/test-resolve-1.0.jar"
# Vérifier le header X-Artifactory-Filename

# Tester la résolution d'une dépendance externe via le virtuel
curl -I $AUTH "$ARTIF_URL/maven-virtual/junit/junit/4.13.2/junit-4.13.2.jar"
# La première requête sera plus lente (téléchargement depuis Maven Central)
# La seconde sera instantanée (servie depuis le cache)
\\\`\\\`\\\`

#### TP 4 : Mettre en place une politique de rétention

\\\`\\\`\\\`bash
# Lister les artefacts non téléchargés depuis 7 jours
curl $AUTH -X POST "$ARTIF_URL/api/search/aql" \\
  -H "Content-Type: text/plain" \\
  -d 'items.find({"repo":"libs-snapshot-local","stat.downloaded":{"$before":"7d"}}).include("name","path","size","stat.downloaded")'

# Script de cleanup automatique
cat > cleanup_snapshots.sh << 'SCRIPT'
#!/bin/bash
ARTIF_URL="http://localhost:8082/artifactory"
AUTH="-u admin:password"
DAYS_OLD=30

echo "=== Cleanup des snapshots de plus de $DAYS_OLD jours ==="

# Trouver les fichiers
RESULTS=$(curl -s $AUTH -X POST "$ARTIF_URL/api/search/aql" \\
  -H "Content-Type: text/plain" \\
  -d "items.find({\"repo\":\"libs-snapshot-local\",\"modified\":{\"\$before\":\"\${DAYS_OLD}d\"},\"type\":\"file\"}).include(\"name\",\"repo\",\"path\",\"size\")")

echo "$RESULTS" | python3 -c "
import json, sys
data = json.load(sys.stdin)
total_size = 0
for item in data.get('results', []):
    path = f\"{item['repo']}/{item['path']}/{item['name']}\"
    size = item.get('size', 0)
    total_size += size
    print(f'  {path} ({size} bytes)')
print(f'\\nTotal: {len(data.get(\"results\", []))} fichiers, {total_size/1024/1024:.1f} Mo')
"
SCRIPT
chmod +x cleanup_snapshots.sh
./cleanup_snapshots.sh
\\\`\\\`\\\`

#### TP 5 : Configurer Docker avec Artifactory

\\\`\\\`\\\`bash
# Créer le dépôt Docker local
curl $AUTH -X PUT "$ARTIF_URL/api/repositories/docker-local" \\
  -H "Content-Type: application/json" \\
  -d '{"key":"docker-local","rclass":"local","packageType":"docker","dockerApiVersion":"V2"}'

# Créer le remote vers Docker Hub
curl $AUTH -X PUT "$ARTIF_URL/api/repositories/docker-remote" \\
  -H "Content-Type: application/json" \\
  -d '{"key":"docker-remote","rclass":"remote","packageType":"docker","url":"https://registry-1.docker.io","externalDependenciesEnabled":true}'

# Se connecter au registry
docker login localhost:8082 -u admin -p password

# Pousser une image
docker pull alpine:latest
docker tag alpine:latest localhost:8082/docker-local/alpine:latest
docker push localhost:8082/docker-local/alpine:latest

# Vérifier dans Artifactory
curl $AUTH "$ARTIF_URL/api/docker/docker-local/v2/_catalog"
\\\`\\\`\\\``,

      keyPoints: JSON.stringify([
        'Convention de nommage : <équipe>-<techno>-<type>-<maturité>',
        'Dépôts Local (stockage interne), Remote (proxy/cache), Virtual (agrégation)',
        'Les remotes cachent les dépendances et protègent contre les pannes externes',
        'Les virtuels offrent un point d\'entrée unique avec ordre de résolution configurable',
        'AQL permet des recherches avancées pour la rétention et le cleanup automatique',
        'Docker, npm, Maven, PyPI - chaque format a ses spécificités de configuration'
      ]) },



    { id: 'art-03', courseId: 'artifactory', title: 'Intégration CI/CD et API', duration: '5h', orderIndex: 3,
      theoryContent: `## Intégration d'Artifactory dans les pipelines CI/CD

### Présentation

Artifactory est au centre du pipeline de livraison continue. À chaque étape du cycle de développement, des artefacts sont produits, stockés, promus et finalement déployés. L'intégration CI/CD permet d'automatiser entièrement ce processus, depuis le build jusqu'au déploiement en production, en passant par les validations de qualité et de sécurité.

### Installation sur Linux (Ubuntu/Debian)

Pour l'intégration CI/CD, nous avons besoin du JFrog CLI et des plugins appropriés pour votre outil CI :

\\\`\\\`\\\`bash
# Installer le JFrog CLI (si pas déjà fait)
curl -fL https://install-cli.jfrog.io | sh
sudo mv jf /usr/local/bin/
jf --version

# Configurer la connexion au serveur Artifactory
jf config add prod-server \\\\
  --url=http://artifactory.company.com:8082 \\\\
  --user=ci-deployer \\\\
  --password=ci-token \\\\
  --interactive=false

# Vérifier la connectivité
jf rt ping

# Pour Jenkins : installer le plugin Artifactory
# Manage Jenkins > Plugins > Rechercher "Artifactory" > Installer
# Puis : Manage Jenkins > System > JFrog > Add JFrog Platform Instance

# Pour GitLab CI : le CLI est utilisé directement dans les scripts
# Pour GitHub Actions : utiliser l'action jfrog/setup-jfrog-cli
\\\`\\\`\\\`

### Installation sur Linux (CentOS/RHEL)

\\\`\\\`\\\`bash
# Installer le JFrog CLI via RPM
sudo yum install -y curl
curl -fL https://install-cli.jfrog.io | sh
sudo mv jf /usr/local/bin/
jf --version

# Alternative : installer depuis le dépôt YUM JFrog
sudo cat > /etc/yum.repos.d/jfrog-cli.repo << 'EOF'
[jfrog-cli]
name=JFrog CLI
baseurl=https://releases.jfrog.io/artifactory/jfrog-cli-rpms/
gpgcheck=0
enabled=1
EOF
sudo yum install -y jfrog-cli-v2
\\\`\\\`\\\`

### Architecture et composants

\\\`\\\`\\\`
Pipeline de livraison avec Artifactory :

Code → Build → Test → Package → Deploy
  │       │       │       │         │
  │       ▼       ▼       ▼         ▼
  │   snapshot  rapport  release   promotion
  │   → libs-   → test-  → libs-   → prod-
  │   snapshot   results  release   release
  │   -local    -local    -local    -local
  └── Source ─────────────────────────────────

Build Info JSON :
{
  "version": "1.0.1",
  "name": "my-application",
  "number": "42",
  "started": "2024-01-15T10:30:00.000Z",
  "buildAgent": { "name": "Jenkins", "version": "2.401" },
  "modules": [{
    "id": "com.company:my-app:1.2.0",
    "artifacts": [{ "name": "my-app-1.2.0.jar", "sha256": "abc..." }],
    "dependencies": [{ "id": "org.springframework:spring-core:5.3.20" }]
  }],
  "vcs": [{ "revision": "a1b2c3d4e5f6", "branch": "main" }]
}
\\\`\\\`\\\`

### Commandes essentielles

\\\`\\\`\\\`bash
# === JFROG CLI - BUILD INFO ===
jf rt build-collect-env my-build 42           # Collecter variables d'environnement
jf rt build-add-git my-build 42 .             # Ajouter infos Git (commit, branch)
jf rt build-publish my-build 42               # Publier le Build Info sur Artifactory
jf rt build-scan my-build 42                  # Scanner avec Xray (sécurité)

# === JFROG CLI - PROMOTION ===
jf rt build-promote my-build 42 libs-staging-local \\
  --status="Staged" --comment="Promoted to staging" --copy
jf rt build-promote my-build 42 libs-prod-local \\
  --status="Released" --comment="Promoted to production"

# === API REST - DÉPLOIEMENT ===
# Déployer avec checksum
SHA256=$(sha256sum app.jar | cut -d' ' -f1)
curl -u ci-user:token -X PUT \\
  -H "X-Checksum-Sha256:$SHA256" \\
  -T app.jar \\
  "http://artif:8082/artifactory/libs-release-local/com/app/1.0/app-1.0.jar"

# Déployer avec propriétés en une seule requête
curl -u ci-user:token -X PUT \\
  -H "X-Checksum-Sha256:$SHA256" \\
  -T app.jar \\
  "http://artif:8082/artifactory/libs-release-local/com/app/1.0/app-1.0.jar;build.number=42;git.commit=abc123"

# === API REST - COPIE/DÉPLACEMENT (PROMOTION) ===
curl -u admin:pass -X POST \\
  "http://artif:8082/artifactory/api/copy/libs-release-local/com/app/1.0/app-1.0.jar?to=/libs-prod-local/com/app/1.0/app-1.0.jar"

curl -u admin:pass -X POST \\
  "http://artif:8082/artifactory/api/move/libs-staging-local/com/app/1.0?to=/libs-prod-local/com/app/1.0"

# === API REST - PROPRIÉTÉS ===
curl -u admin:pass -X PUT \\
  "http://artif:8082/artifactory/api/storage/libs-release-local/com/app/1.0/app-1.0.jar?properties=build.status=tested;qa.approved=true;deploy.env=staging"

curl -u admin:pass \\
  "http://artif:8082/artifactory/api/storage/libs-release-local/com/app/1.0/app-1.0.jar?properties"

# === API REST - RECHERCHE ===
curl -u admin:pass "http://artif:8082/artifactory/api/search/prop?build.status=released&repos=libs-release-local"

# Recherche AQL avancée
curl -u admin:pass -X POST "http://artif:8082/artifactory/api/search/aql" \\
  -H "Content-Type: text/plain" \\
  -d 'items.find({"repo":"libs-release-local","@build.status":"released","modified":{"$last":"7d"}}).include("name","repo","path","size","@build.number").sort({"$desc":["modified"]}).limit(20)'

# === API REST - TOKENS ===
# Créer un token pour le CI
curl -u admin:pass -X POST "http://artif:8082/access/api/v1/tokens" \\
  -d "username=jenkins-ci" \\
  -d "scope=member-of-groups:ci-deployers" \\
  -d "expires_in=31536000"

# Révoquer un token
curl -u admin:pass -X POST "http://artif:8082/access/api/v1/tokens/revoke" \\
  -d "token=eyJ..."

# === INTÉGRATION JENKINS (Jenkinsfile) ===
# Exemple complet dans la section Configuration ci-dessous

# === INTÉGRATION GITLAB CI ===
# Voir la configuration dans la section pratique

# === WEBHOOKS ===
curl -u admin:pass -X PUT "http://artif:8082/artifactory/api/system/webhooks/deploy-notification" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "http://jenkins:8080/generic-webhook-trigger/invoke?token=artif-deploy",
    "events": ["storage.afterCreate"],
    "repositories": ["libs-prod-local"]
  }'
\\\`\\\`\\\`

### Configuration

#### Jenkinsfile avec intégration Artifactory

\\\`\\\`\\\`groovy
pipeline {
    agent any
    environment {
        ARTIFACTORY_SERVER = 'artifactory-prod'
    }
    stages {
        stage('Build') {
            steps {
                script {
                    def server = Artifactory.server(ARTIFACTORY_SERVER)
                    def rtMaven = Artifactory.newMavenBuild()
                    rtMaven.resolver server: server, releaseRepo: 'maven-virtual', snapshotRepo: 'maven-virtual'
                    rtMaven.deployer server: server, releaseRepo: 'libs-release-local', snapshotRepo: 'libs-snapshot-local'
                    def buildInfo = rtMaven.run pom: 'pom.xml', goals: 'clean package'
                    server.publishBuildInfo buildInfo
                }
            }
        }
        stage('Promote to Staging') {
            steps {
                script {
                    def server = Artifactory.server(ARTIFACTORY_SERVER)
                    def promotionConfig = [
                        buildName: env.JOB_NAME,
                        buildNumber: env.BUILD_NUMBER,
                        targetRepo: 'libs-staging-local',
                        status: 'Staged',
                        copy: true
                    ]
                    server.promote promotionConfig
                }
            }
        }
    }
}
\\\`\\\`\\\`

#### GitLab CI avec Artifactory

\\\`\\\`\\\`yaml
variables:
  JFROG_URL: "http://artifactory.company.com:8082"

build:
  stage: build
  script:
    - curl -fL https://install-cli.jfrog.io | sh
    - ./jf config add server --url=$JFROG_URL --access-token=$JFROG_TOKEN
    - ./jf rt ping
    - mvn clean package
    - ./jf rt upload "target/*.jar" "libs-release-local/com/app/$CI_COMMIT_TAG/"
    - ./jf rt build-collect-env $CI_PROJECT_NAME $CI_PIPELINE_ID
    - ./jf rt build-add-git $CI_PROJECT_NAME $CI_PIPELINE_ID
    - ./jf rt build-publish $CI_PROJECT_NAME $CI_PIPELINE_ID
\\\`\\\`\\\`

### Utilisation avancée

#### AQL - Artifactory Query Language

AQL est un langage de requête puissant pour chercher des artefacts :
\\\`\\\`\\\`
// Syntaxe de base
items.find({critères}).include("champs").sort({"$asc":["champ"]}).limit(N)

// Opérateurs disponibles
$eq, $ne, $gt, $gte, $lt, $lte, $match, $nmatch
$before (dates), $last (période), $and, $or

// Domaines interrogeables
items (artefacts), builds, entries (archives), archive.entries
\\\`\\\`\\\`

#### Sécurité et permissions

Le modèle de permissions Artifactory :
- **Read** : télécharger des artefacts
- **Deploy/Cache** : déployer de nouveaux artefacts
- **Annotate** : modifier les propriétés
- **Delete** : supprimer des artefacts
- **Manage** : administrer le dépôt

### Bonnes pratiques

1. **Utiliser des tokens** plutôt que des mots de passe pour les services CI
2. **Publier le Build Info** à chaque build pour la traçabilité complète
3. **Promouvoir, ne pas redéployer** : copier les artefacts entre dépôts
4. **Propriétés pour le workflow** : build.status, qa.approved, deploy.env
5. **Webhooks** pour les notifications et les déclenchements automatiques
6. **AQL pour le reporting** : rapports de conformité, inventaire, cleanup`,

      practiceContent: `### Travaux Pratiques : Intégration CI/CD

#### TP 1 : Déployer et promouvoir via l'API REST

\\\`\\\`\\\`bash
export ARTIF_URL="http://localhost:8082/artifactory"
export AUTH="-u admin:password"

# Créer les dépôts nécessaires
for repo in libs-staging-local libs-prod-local; do
  curl $AUTH -X PUT "$ARTIF_URL/api/repositories/$repo" \\
    -H "Content-Type: application/json" \\
    -d "{\"key\":\"$repo\",\"rclass\":\"local\",\"packageType\":\"maven\"}"
done

# Créer un artefact de test
echo "Application v1.0 - Build #42" > app-content.txt
jar cf app-1.0.jar app-content.txt

# Déployer dans libs-release-local
SHA256=$(sha256sum app-1.0.jar | cut -d' ' -f1)
curl $AUTH -X PUT \\
  -H "X-Checksum-Sha256:$SHA256" \\
  -T app-1.0.jar \\
  "$ARTIF_URL/libs-release-local/com/formation/app/1.0/app-1.0.jar;build.number=42;build.status=built"

echo "✅ Artefact déployé dans libs-release-local"

# Promouvoir vers staging (copie)
curl $AUTH -X POST \\
  "$ARTIF_URL/api/copy/libs-release-local/com/formation/app/1.0/app-1.0.jar?to=/libs-staging-local/com/formation/app/1.0/app-1.0.jar"

# Mettre à jour les propriétés
curl $AUTH -X PUT \\
  "$ARTIF_URL/api/storage/libs-staging-local/com/formation/app/1.0/app-1.0.jar?properties=build.status=staged;staged.date=$(date -I);staged.by=ci-pipeline"

echo "✅ Artefact promu vers libs-staging-local"

# Promouvoir vers production
curl $AUTH -X POST \\
  "$ARTIF_URL/api/copy/libs-staging-local/com/formation/app/1.0/app-1.0.jar?to=/libs-prod-local/com/formation/app/1.0/app-1.0.jar"

curl $AUTH -X PUT \\
  "$ARTIF_URL/api/storage/libs-prod-local/com/formation/app/1.0/app-1.0.jar?properties=build.status=released;released.date=$(date -I);released.by=release-manager"

echo "✅ Artefact promu vers libs-prod-local (production)"
\\\`\\\`\\\`

#### TP 2 : Utiliser le JFrog CLI avec Build Info

\\\`\\\`\\\`bash
# Configurer le CLI
jf config add local --url=http://localhost:8082 --user=admin --password=password --interactive=false

# Simuler un build complet avec Build Info
BUILD_NAME="formation-app"
BUILD_NUMBER="1"

# Collecter l'environnement
jf rt build-collect-env $BUILD_NAME $BUILD_NUMBER

# Upload avec association au build
jf rt upload "app-1.0.jar" "libs-release-local/com/formation/app/1.0/" \\
  --build-name=$BUILD_NAME --build-number=$BUILD_NUMBER

# Publier le Build Info
jf rt build-publish $BUILD_NAME $BUILD_NUMBER

# Vérifier le Build Info
curl $AUTH "$ARTIF_URL/api/build/$BUILD_NAME/$BUILD_NUMBER" | python3 -m json.tool

# Promouvoir le build
jf rt build-promote $BUILD_NAME $BUILD_NUMBER libs-prod-local \\
  --status="Released" --comment="Approved by QA team" --copy
\\\`\\\`\\\`

#### TP 3 : Requêtes AQL avancées

\\\`\\\`\\\`bash
# Trouver tous les artefacts déployés aujourd'hui
curl $AUTH -X POST "$ARTIF_URL/api/search/aql" \\
  -H "Content-Type: text/plain" \\
  -d 'items.find({"modified":{"$last":"1d"}}).include("name","repo","path","size","modified")'

# Trouver les artefacts promus en production
curl $AUTH -X POST "$ARTIF_URL/api/search/aql" \\
  -H "Content-Type: text/plain" \\
  -d 'items.find({"repo":"libs-prod-local","@build.status":"released"}).include("name","path","@build.number","@released.date")'

# Trouver les gros artefacts (> 1 Mo)
curl $AUTH -X POST "$ARTIF_URL/api/search/aql" \\
  -H "Content-Type: text/plain" \\
  -d 'items.find({"size":{"$gt":1048576}}).include("name","repo","size").sort({"$desc":["size"]}).limit(10)'

# Statistiques par dépôt
curl $AUTH "$ARTIF_URL/api/storageinfo" | python3 -m json.tool
\\\`\\\`\\\`

#### TP 4 : Créer un token d'accès pour le CI

\\\`\\\`\\\`bash
# Créer un groupe pour les services CI
curl $AUTH -X PUT "$ARTIF_URL/api/security/groups/ci-deployers" \\
  -H "Content-Type: application/json" \\
  -d '{"name":"ci-deployers","description":"Groupe pour les pipelines CI","autoJoin":false}'

# Créer un token scopé pour Jenkins
TOKEN_RESPONSE=$(curl $AUTH -X POST "http://localhost:8082/access/api/v1/tokens" \\
  -d "username=jenkins-ci" \\
  -d "scope=member-of-groups:ci-deployers" \\
  -d "expires_in=86400" \\
  -d "description=Token CI Jenkins - expire dans 24h")

echo "Token créé : $(echo $TOKEN_RESPONSE | python3 -c 'import sys,json; print(json.load(sys.stdin).get(\"access_token\",\"erreur\")[:20])...')"

# Tester le token
ACCESS_TOKEN=$(echo $TOKEN_RESPONSE | python3 -c "import sys,json; print(json.load(sys.stdin)['access_token'])")
curl -H "Authorization: Bearer $ACCESS_TOKEN" "$ARTIF_URL/api/system/ping"
\\\`\\\`\\\`

#### TP 5 : Webhook de notification

\\\`\\\`\\\`bash
# Configurer un webhook qui notifie à chaque déploiement en prod
curl $AUTH -X PUT "$ARTIF_URL/api/system/webhooks/prod-deploy-notify" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "http://localhost:9999/webhook",
    "events": ["storage.afterCreate"],
    "repositories": ["libs-prod-local"],
    "enabled": true
  }'

# Lancer un serveur de test pour recevoir les webhooks
python3 -c "
from http.server import HTTPServer, BaseHTTPRequestHandler
import json

class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        length = int(self.headers['Content-Length'])
        body = json.loads(self.rfile.read(length))
        print(f'Webhook recu: {json.dumps(body, indent=2)[:200]}')
        self.send_response(200)
        self.end_headers()

print('Webhook listener on port 9999...')
HTTPServer(('', 9999), Handler).serve_forever()
" &

# Déployer quelque chose en prod pour déclencher le webhook
curl $AUTH -T app-1.0.jar "$ARTIF_URL/libs-prod-local/com/test/webhook-test-1.0.jar"
\\\`\\\`\\\``,

      keyPoints: JSON.stringify([
        'Le Build Info trace la relation complète entre code source, build et artefacts',
        'JFrog CLI : build-collect-env, build-add-git, build-publish, build-promote',
        'API REST pour toutes les opérations : deploy, copy, move, props, search',
        'AQL (Artifactory Query Language) pour des recherches complexes multi-critères',
        'Promotion = copier/déplacer entre dépôts avec mise à jour des propriétés',
        'Access Tokens avec scope et expiration pour les services CI (jamais de mots de passe)'
      ]) },



    // ==================== SONARQUBE ====================
    { id: 'sq-01', courseId: 'sonarqube', title: 'Introduction à SonarQube', duration: '2h30', orderIndex: 1,
      theoryContent: `## Introduction à SonarQube

### Présentation

SonarQube est une plateforme open-source d'**inspection continue de la qualité du code**. Développée par SonarSource, elle analyse automatiquement le code source pour détecter des bugs, des vulnérabilités de sécurité et des "code smells" (mauvaises pratiques). SonarQube évalue la qualité selon cinq dimensions : Fiabilité (bugs), Sécurité (vulnérabilités), Maintenabilité (code smells et dette technique), Couverture de tests et Duplications de code.

La philosophie centrale de SonarQube est **Clean as You Code** : plutôt que de corriger toute la dette technique existante d'un coup, on se concentre sur le nouveau code. Le Quality Gate vérifie que tout nouveau code est propre, et au fil du temps, l'ancien code est refactorisé naturellement.

### Installation sur Linux (Ubuntu/Debian)

#### Prérequis système

\\\`\\\`\\\`bash
# Vérifier les prérequis
java -version                    # Java 17+ requis
free -h                          # Minimum 4 Go RAM (8 Go recommandé)
df -h                            # Minimum 10 Go disque
sysctl vm.max_map_count          # Doit être >= 524288

# Installer Java 17
sudo apt update
sudo apt install -y openjdk-17-jdk

# Configurer les limites système (requis par Elasticsearch)
sudo sysctl -w vm.max_map_count=524288
sudo sysctl -w fs.file-max=131072
echo "vm.max_map_count=524288" | sudo tee -a /etc/sysctl.conf
echo "fs.file-max=131072" | sudo tee -a /etc/sysctl.conf

# Limites utilisateur
sudo cat >> /etc/security/limits.conf << 'EOF'
sonarqube   -   nofile   131072
sonarqube   -   nproc    8192
EOF
\\\`\\\`\\\`

#### Installation via Docker (Recommandée pour labs)

\\\`\\\`\\\`bash
# Configurer la mémoire virtuelle pour Elasticsearch
sudo sysctl -w vm.max_map_count=524288

# Lancer SonarQube Community Edition
docker run -d --name sonarqube \\\\
  -p 9000:9000 \\\\
  -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true \\\\
  -v sonarqube-data:/opt/sonarqube/data \\\\
  -v sonarqube-extensions:/opt/sonarqube/extensions \\\\
  -v sonarqube-logs:/opt/sonarqube/logs \\\\
  --restart unless-stopped \\\\
  sonarqube:10-community

# Vérifier les logs
docker logs -f sonarqube
# Attendre "SonarQube is operational"

# Accès : http://localhost:9000 (admin/admin)
\\\`\\\`\\\`

#### Installation avec PostgreSQL (Production)

\\\`\\\`\\\`bash
# Installer PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Créer la base de données
sudo -u postgres psql << 'EOF'
CREATE USER sonarqube WITH PASSWORD 'sonarqube_password';
CREATE DATABASE sonarqube OWNER sonarqube;
GRANT ALL PRIVILEGES ON DATABASE sonarqube TO sonarqube;
EOF

# Télécharger SonarQube
wget https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-10.4.1.88267.zip
sudo unzip sonarqube-*.zip -d /opt/
sudo ln -s /opt/sonarqube-* /opt/sonarqube

# Créer l'utilisateur système
sudo useradd -r -s /bin/false sonarqube
sudo chown -R sonarqube:sonarqube /opt/sonarqube

# Configurer la connexion PostgreSQL
sudo cat > /opt/sonarqube/conf/sonar.properties << 'EOF'
sonar.jdbc.username=sonarqube
sonar.jdbc.password=sonarqube_password
sonar.jdbc.url=jdbc:postgresql://localhost:5432/sonarqube
sonar.web.host=0.0.0.0
sonar.web.port=9000
sonar.search.javaOpts=-Xmx512m -Xms512m
sonar.web.javaOpts=-Xmx512m -Xms128m
sonar.ce.javaOpts=-Xmx512m -Xms128m
EOF

# Service systemd
sudo cat > /etc/systemd/system/sonarqube.service << 'EOF'
[Unit]
Description=SonarQube
After=network.target postgresql.service

[Service]
Type=forking
User=sonarqube
Group=sonarqube
ExecStart=/opt/sonarqube/bin/linux-x86-64/sonar.sh start
ExecStop=/opt/sonarqube/bin/linux-x86-64/sonar.sh stop
LimitNOFILE=131072
LimitNPROC=8192

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable sonarqube
sudo systemctl start sonarqube
sudo systemctl status sonarqube
\\\`\\\`\\\`

### Installation sur Linux (CentOS/RHEL)

\\\`\\\`\\\`bash
# Prérequis
sudo yum install -y java-17-openjdk java-17-openjdk-devel unzip wget

# Configurer les limites système
sudo sysctl -w vm.max_map_count=524288
echo "vm.max_map_count=524288" | sudo tee -a /etc/sysctl.conf

# PostgreSQL
sudo yum install -y postgresql-server postgresql-contrib
sudo postgresql-setup --initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Le reste est identique à Ubuntu (téléchargement, configuration, service)
\\\`\\\`\\\`

### Architecture et composants

\\\`\\\`\\\`
┌─────────────────────────────────────────────────────────────┐
│                     DÉVELOPPEUR                              │
│  IDE + SonarLint → Analyse en temps réel dans l'éditeur     │
└────────────────────────┬────────────────────────────────────┘
                         │ push
┌────────────────────────▼────────────────────────────────────┐
│                   CI/CD PIPELINE                             │
│  SonarScanner CLI / Maven Plugin / Gradle Plugin            │
│  → Analyse complète, envoie résultats au serveur            │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/HTTPS
┌────────────────────────▼────────────────────────────────────┐
│                  SERVEUR SONARQUBE                           │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────┐    │
│  │  Web Server  │  │   Compute    │  │ Elasticsearch  │    │
│  │  (Dashboard) │  │   Engine     │  │ (Recherche)    │    │
│  │  Port 9000   │  │  (Analyses)  │  │ Port 9001      │    │
│  └──────────────┘  └──────────────┘  └────────────────┘    │
│                                                             │
│  ┌────────────────────────────────────────────────────┐     │
│  │              Database (PostgreSQL)                   │     │
│  │     Projets, métriques, issues, quality gates       │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
\\\`\\\`\\\`

### Commandes essentielles

\\\`\\\`\\\`bash
# === INSTALLATION SONAR-SCANNER CLI ===
wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip
unzip sonar-scanner-cli-*.zip -d /opt/
sudo ln -s /opt/sonar-scanner-*/bin/sonar-scanner /usr/local/bin/sonar-scanner
sonar-scanner --version

# === ANALYSE DE BASE ===
sonar-scanner \\
  -Dsonar.projectKey=my-project \\
  -Dsonar.sources=src \\
  -Dsonar.host.url=http://localhost:9000 \\
  -Dsonar.token=sqa_xxxxxxxxxxxx

# === ANALYSE MAVEN ===
mvn clean verify sonar:sonar \\
  -Dsonar.projectKey=my-java-project \\
  -Dsonar.host.url=http://localhost:9000 \\
  -Dsonar.token=sqa_xxxxxxxxxxxx

# === ANALYSE GRADLE ===
./gradlew sonar \\
  -Dsonar.projectKey=my-gradle-project \\
  -Dsonar.host.url=http://localhost:9000 \\
  -Dsonar.token=sqa_xxxxxxxxxxxx

# === OPTIONS SONAR-SCANNER ===
sonar-scanner -Dsonar.projectKey=KEY         # Clé unique du projet
sonar-scanner -Dsonar.sources=src/main       # Répertoires de code source
sonar-scanner -Dsonar.tests=src/test         # Répertoires de tests
sonar-scanner -Dsonar.java.binaries=target/classes  # Binaires Java compilés
sonar-scanner -Dsonar.exclusions=**/*.min.js,**/vendor/**  # Fichiers à exclure
sonar-scanner -Dsonar.inclusions=**/*.java   # Fichiers à inclure uniquement
sonar-scanner -Dsonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml
sonar-scanner -Dsonar.branch.name=feature/x  # Analyse de branche (Dev Edition+)
sonar-scanner -Dsonar.qualitygate.wait=true  # Attendre le résultat du Quality Gate

# === API REST SONARQUBE ===
# Vérifier le statut du Quality Gate
curl -u sqa_token: "http://localhost:9000/api/qualitygates/project_status?projectKey=my-project"

# Lister les projets
curl -u sqa_token: "http://localhost:9000/api/projects/search?ps=50"

# Lister les issues d'un projet
curl -u sqa_token: "http://localhost:9000/api/issues/search?componentKeys=my-project&types=BUG&severities=CRITICAL,BLOCKER"

# Obtenir les métriques
curl -u sqa_token: "http://localhost:9000/api/measures/component?component=my-project&metricKeys=bugs,vulnerabilities,code_smells,coverage,duplicated_lines_density"

# Créer un projet via l'API
curl -u sqa_token: -X POST "http://localhost:9000/api/projects/create?name=My+Project&project=my-project"

# Générer un token
curl -u admin:admin -X POST "http://localhost:9000/api/user_tokens/generate?name=ci-token"

# Lister les Quality Profiles
curl -u sqa_token: "http://localhost:9000/api/qualityprofiles/search?language=java"

# Lister les règles actives
curl -u sqa_token: "http://localhost:9000/api/rules/search?activation=true&qprofile=PROFILE_KEY&ps=500"

# Webhooks
curl -u sqa_token: -X POST "http://localhost:9000/api/webhooks/create?name=Jenkins&url=http://jenkins:8080/sonarqube-webhook/"
\\\`\\\`\\\`

### Configuration

#### Fichier sonar-project.properties

\\\`\\\`\\\`properties
# Identification du projet
sonar.projectKey=com.company:my-application
sonar.projectName=My Application
sonar.projectVersion=1.0.0

# Répertoires source
sonar.sources=src/main/java,src/main/resources
sonar.tests=src/test/java
sonar.java.binaries=target/classes
sonar.java.libraries=target/dependency/*.jar
sonar.java.test.binaries=target/test-classes
sonar.java.test.libraries=target/dependency/*.jar

# Couverture de code
sonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml
sonar.junit.reportsPath=target/surefire-reports

# Exclusions
sonar.exclusions=**/generated/**,**/vendor/**,**/*.min.js
sonar.coverage.exclusions=**/config/**,**/dto/**,**/*Application.java
sonar.cpd.exclusions=**/dto/**,**/entity/**

# Encodage
sonar.sourceEncoding=UTF-8

# Serveur
sonar.host.url=http://localhost:9000
sonar.token=sqa_xxxxxxxxxxxx
\\\`\\\`\\\`

### Utilisation avancée

#### Quality Gate par défaut (Sonar Way)
- Coverage on New Code >= 80%
- Duplicated Lines on New Code <= 3%
- Reliability Rating on New Code = A
- Security Rating on New Code = A
- Security Hotspots Reviewed = 100%
- Maintainability Rating on New Code = A

#### Langages supportés (30+)
Backend : Java, C#, Python, Go, PHP, Ruby, Kotlin, Scala
Frontend : JavaScript, TypeScript, HTML, CSS
Systèmes : C, C++, Objective-C, Swift
Infrastructure : Terraform, CloudFormation, Kubernetes

### Bonnes pratiques

1. **Analyser à chaque push** : intégrer dans le pipeline CI/CD
2. **Quality Gate strict** : ne jamais merger du code qui échoue
3. **SonarLint** : feedback immédiat dans l'IDE avant même le push
4. **Exclure le code généré** : pas d'analyse sur les fichiers auto-générés
5. **Couverture réaliste** : 80% minimum sur le nouveau code
6. **Reviewer les hotspots** : ne pas les ignorer, les marquer Safe/Fixed/Vulnerable
7. **Profils personnalisés** : adapter les règles au contexte du projet
8. **New Code Period** : utiliser "Previous Version" pour les projets avec releases`,

      practiceContent: `### Travaux Pratiques : Installation et première analyse

#### Étape 1 : Lancer SonarQube avec Docker

\\\`\\\`\\\`bash
# Configurer le système
sudo sysctl -w vm.max_map_count=524288

# Lancer SonarQube
docker run -d --name sonarqube \\\\
  -p 9000:9000 \\\\
  -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true \\\\
  -v sonarqube-data:/opt/sonarqube/data \\\\
  -v sonarqube-extensions:/opt/sonarqube/extensions \\\\
  sonarqube:10-community

# Attendre le démarrage complet
echo "Attente du démarrage de SonarQube..."
until curl -s http://localhost:9000/api/system/status | grep -q "UP"; do
  sleep 5
  echo "En attente..."
done
echo "SonarQube est prêt !"
\\\`\\\`\\\`

#### Étape 2 : Configuration initiale

1. Ouvrez http://localhost:9000
2. Connectez-vous : admin / admin
3. Changez le mot de passe immédiatement
4. Créez un token : My Account > Security > Generate Token
   - Nom : ci-scanner
   - Type : Global Analysis Token
   - Copiez le token (sqa_xxxxx)

#### Étape 3 : Installer SonarScanner CLI

\\\`\\\`\\\`bash
# Télécharger et installer
wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip
unzip sonar-scanner-cli-*.zip -d ~/tools/
export PATH=$PATH:~/tools/sonar-scanner-5.0.1.3006-linux/bin

# Vérifier
sonar-scanner --version
\\\`\\\`\\\`

#### Étape 4 : Créer un projet Java et l'analyser

\\\`\\\`\\\`bash
# Créer un projet avec des bugs intentionnels
mkdir -p ~/sonar-tp/src/main/java/com/formation
cat > ~/sonar-tp/src/main/java/com/formation/App.java << 'EOF'
package com.formation;

import java.io.*;
import java.sql.*;

public class App {
    // Bug : NullPointerException possible
    public String getUserName(Object user) {
        return user.toString().toUpperCase();
    }

    // Vulnérabilité : SQL Injection
    public void findUser(Connection conn, String name) throws SQLException {
        Statement stmt = conn.createStatement();
        stmt.executeQuery("SELECT * FROM users WHERE name = '" + name + "'");
    }

    // Code Smell : fonction trop complexe
    public String classify(int a, int b, int c) {
        if (a > 0) { if (b > 0) { if (c > 0) { return "all positive"; }
        else { return "c negative"; } } else { if (c > 0) { return "b neg"; }
        else { return "bc neg"; } } } else { return "a negative"; }
    }

    // Resource leak
    public void readFile(String path) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(path));
        String line = reader.readLine();
        System.out.println(line);
        // reader never closed!
    }
}
EOF

# Créer sonar-project.properties
cat > ~/sonar-tp/sonar-project.properties << EOF
sonar.projectKey=formation-tp
sonar.projectName=Formation TP SonarQube
sonar.sources=src
sonar.sourceEncoding=UTF-8
sonar.host.url=http://localhost:9000
sonar.token=sqa_VOTRE_TOKEN_ICI
sonar.java.binaries=.
EOF

# Lancer l'analyse
cd ~/sonar-tp
sonar-scanner
\\\`\\\`\\\`

#### Étape 5 : Explorer les résultats

1. Ouvrez http://localhost:9000/dashboard?id=formation-tp
2. Vérifiez le Quality Gate (devrait être FAILED)
3. Explorez les issues par type :
   - Bugs : NullPointerException, Resource Leak
   - Vulnérabilités : SQL Injection
   - Code Smells : complexité cognitive
4. Cliquez sur chaque issue pour voir l'explication et la correction suggérée

#### Étape 6 : Vérifier le Quality Gate via l'API

\\\`\\\`\\\`bash
# Récupérer le statut du Quality Gate
curl -s -u sqa_VOTRE_TOKEN: \\
  "http://localhost:9000/api/qualitygates/project_status?projectKey=formation-tp" \\
  | python3 -m json.tool

# Récupérer les métriques
curl -s -u sqa_VOTRE_TOKEN: \\
  "http://localhost:9000/api/measures/component?component=formation-tp&metricKeys=bugs,vulnerabilities,code_smells,coverage,ncloc" \\
  | python3 -m json.tool

# Script de vérification CI
STATUS=$(curl -s -u sqa_VOTRE_TOKEN: \\
  "http://localhost:9000/api/qualitygates/project_status?projectKey=formation-tp" \\
  | python3 -c "import sys,json; print(json.load(sys.stdin)['projectStatus']['status'])")

echo "Quality Gate: $STATUS"
if [ "$STATUS" != "OK" ]; then
  echo "❌ FAILED - Build bloqué"
  exit 1
fi
echo "✅ PASSED"
\\\`\\\`\\\``,

      keyPoints: JSON.stringify([
        'SonarQube analyse bugs, vulnérabilités, code smells, couverture et duplications',
        'Installation : Docker (lab) ou standalone avec PostgreSQL (production) + Java 17',
        'sonar-scanner CLI avec sonar-project.properties pour configurer l\'analyse',
        'API REST complète : qualitygates, issues, measures, projects, webhooks',
        'Philosophie Clean as You Code : Quality Gate vérifie uniquement le nouveau code',
        'Supporte 30+ langages et s\'intègre dans tous les pipelines CI/CD'
      ]) },

    { id: 'sq-02', courseId: 'sonarqube', title: 'Métriques et Quality Gates', duration: '3h30', orderIndex: 2,
      theoryContent: `## Métriques et Quality Gates dans SonarQube

### Présentation

SonarQube calcule des dizaines de métriques pour évaluer la qualité du code. Ces métriques sont regroupées en cinq domaines principaux : Fiabilité (bugs), Sécurité (vulnérabilités et hotspots), Maintenabilité (code smells et dette technique), Couverture de tests et Duplications. Comprendre ces métriques et configurer des Quality Gates appropriés est essentiel pour maintenir un niveau de qualité constant dans vos projets.

### Installation sur Linux (Ubuntu/Debian)

L'installation de SonarQube a été couverte dans le module précédent. Pour ce module, assurez-vous que votre instance est opérationnelle :

\\\`\\\`\\\`bash
# Vérifier que SonarQube est actif
curl -s http://localhost:9000/api/system/status | python3 -c "import sys,json; d=json.load(sys.stdin); print(f'Status: {d[\"status\"]}')"

# Vérifier qu'un projet a été analysé
curl -s -u admin:admin "http://localhost:9000/api/projects/search" | python3 -m json.tool

# Si SonarQube n'est pas démarré
docker start sonarqube
# ou
sudo systemctl start sonarqube
\\\`\\\`\\\`

### Architecture et composants

#### Métriques de fiabilité (Reliability)
- **Bugs** : défauts qui causeront un comportement incorrect (NPE, division par zéro, etc.)
- **Reliability Rating** : A (0 bugs) à E (bugs bloquants)

#### Métriques de sécurité (Security)
- **Vulnérabilités** : failles exploitables (SQL injection, XSS, hardcoded credentials)
- **Security Hotspots** : zones nécessitant une revue humaine
- **Security Rating** : A (0 vulns) à E (vulns critiques)

#### Métriques de maintenabilité (Maintainability)
- **Code Smells** : code fonctionnel mais difficile à maintenir
- **Technical Debt** : temps estimé pour corriger tous les smells
- **Technical Debt Ratio** : dette / temps de développement
- **Maintainability Rating** : A (TDR<=5%) à E (TDR>50%)

#### Métriques de couverture (Coverage)
- **Line Coverage** : % de lignes exécutées par les tests
- **Branch Coverage** : % de conditions testées
- **Coverage on New Code** : couverture sur le code nouvellement ajouté

#### Métriques de duplication
- **Duplicated Lines** : nombre de lignes dupliquées
- **Duplicated Blocks** : nombre de blocs de code copiés
- **Duplicated Lines Density** : % de lignes dupliquées

### Commandes essentielles

\\\`\\\`\\\`bash
# === API REST - MÉTRIQUES ===
# Obtenir toutes les métriques d'un projet
curl -u token: "http://localhost:9000/api/measures/component?component=my-project&metricKeys=bugs,vulnerabilities,code_smells,coverage,duplicated_lines_density,ncloc,sqale_debt_ratio,reliability_rating,security_rating"

# Historique des métriques
curl -u token: "http://localhost:9000/api/measures/search_history?component=my-project&metrics=bugs,coverage&ps=30"

# Métriques par fichier
curl -u token: "http://localhost:9000/api/measures/component_tree?component=my-project&metricKeys=bugs,code_smells&qualifiers=FIL&ps=100"

# === API REST - QUALITY GATES ===
# Lister les Quality Gates
curl -u token: "http://localhost:9000/api/qualitygates/list"

# Obtenir les conditions d'un Quality Gate
curl -u token: "http://localhost:9000/api/qualitygates/show?name=Sonar+way"

# Créer un Quality Gate personnalisé
curl -u token: -X POST "http://localhost:9000/api/qualitygates/create?name=Strict+Gate"

# Ajouter une condition au Quality Gate
curl -u token: -X POST "http://localhost:9000/api/qualitygates/create_condition?gateId=2&metric=new_coverage&op=LT&error=90"
curl -u token: -X POST "http://localhost:9000/api/qualitygates/create_condition?gateId=2&metric=new_duplicated_lines_density&op=GT&error=2"
curl -u token: -X POST "http://localhost:9000/api/qualitygates/create_condition?gateId=2&metric=new_reliability_rating&op=GT&error=1"

# Assigner un Quality Gate à un projet
curl -u token: -X POST "http://localhost:9000/api/qualitygates/select?projectKey=my-project&gateId=2"

# Statut du Quality Gate pour un projet
curl -u token: "http://localhost:9000/api/qualitygates/project_status?projectKey=my-project"

# === API REST - QUALITY PROFILES ===
# Lister les profils
curl -u token: "http://localhost:9000/api/qualityprofiles/search?language=java"

# Exporter un profil
curl -u token: "http://localhost:9000/api/qualityprofiles/export?qualityProfile=Sonar+way&language=java" > profile.xml

# Créer un profil personnalisé
curl -u token: -X POST "http://localhost:9000/api/qualityprofiles/create?name=Custom+Java&language=java"

# Activer une règle dans un profil
curl -u token: -X POST "http://localhost:9000/api/qualityprofiles/activate_rule?key=PROFILE_KEY&rule=java:S1135"

# Assigner un profil à un projet
curl -u token: -X POST "http://localhost:9000/api/qualityprofiles/add_project?project=my-project&qualityProfile=Custom+Java&language=java"

# === API REST - ISSUES ===
# Rechercher les issues
curl -u token: "http://localhost:9000/api/issues/search?componentKeys=my-project&types=BUG&severities=CRITICAL,BLOCKER&ps=100"

# Filtrer par statut
curl -u token: "http://localhost:9000/api/issues/search?componentKeys=my-project&statuses=OPEN,CONFIRMED&types=VULNERABILITY"

# Assigner une issue
curl -u token: -X POST "http://localhost:9000/api/issues/assign?issue=ISSUE_KEY&assignee=developer"

# Marquer comme faux positif
curl -u token: -X POST "http://localhost:9000/api/issues/do_transition?issue=ISSUE_KEY&transition=falsepositive"

# Bulk change
curl -u token: -X POST "http://localhost:9000/api/issues/bulk_change?issues=KEY1,KEY2&assign.assignee=dev&set_severity.severity=MINOR"
\\\`\\\`\\\`

### Configuration

#### Quality Gate personnalisé recommandé

| Condition | Opérateur | Seuil | Justification |
|-----------|-----------|-------|---------------|
| Coverage on New Code | >= | 80% | Minimum acceptable |
| Duplicated Lines on New Code | <= | 3% | DRY principle |
| Reliability Rating on New Code | = | A | Zero new bugs |
| Security Rating on New Code | = | A | Zero new vulns |
| Maintainability Rating on New Code | = | A | Clean code |
| Security Hotspots Reviewed | = | 100% | Tout doit être revu |

#### New Code Period options
- **Previous Version** : depuis la dernière release (recommandé)
- **Number of days** : les N derniers jours
- **Reference Branch** : différence avec main/develop

### Utilisation avancée

#### Complexité cognitive vs cyclomatique
- **Cyclomatique** : nombre de chemins dans le code (if, for, while = +1)
- **Cognitive** : difficulté de compréhension (imbrications pénalisées)
- SonarQube utilise principalement la complexité cognitive (plus moderne)

#### Gestion des faux positifs
- Marquer l'issue comme "Won't Fix" ou "False Positive" dans l'UI
- Utiliser des commentaires dans le code : // NOSONAR
- Configurer des exclusions dans sonar-project.properties

### Bonnes pratiques

1. **Quality Gate strict** sur le nouveau code uniquement
2. **Ne jamais désactiver** le Quality Gate pour "avancer plus vite"
3. **Reviewer tous les Security Hotspots** avant chaque release
4. **Personnaliser les profils** selon le contexte du projet
5. **Monitorer la tendance** : la dette doit diminuer dans le temps
6. **Intégrer dans les PR** : feedback avant le merge`,

      practiceContent: `### Travaux Pratiques : Quality Gates et Métriques

#### TP 1 : Explorer les métriques d'un projet

\\\`\\\`\\\`bash
# Récupérer toutes les métriques du projet
TOKEN="sqa_VOTRE_TOKEN"
PROJECT="formation-tp"

# Métriques principales
curl -s -u $TOKEN: "http://localhost:9000/api/measures/component?component=$PROJECT&metricKeys=bugs,vulnerabilities,code_smells,coverage,duplicated_lines_density,ncloc,sqale_index,sqale_debt_ratio" | python3 -c "
import json,sys
data = json.load(sys.stdin)
print('=== Métriques du projet ===')
for m in data['component']['measures']:
    print(f'  {m[\"metric\"]}: {m[\"value\"]}')
"

# Issues par sévérité
for SEV in BLOCKER CRITICAL MAJOR MINOR INFO; do
  COUNT=$(curl -s -u $TOKEN: "http://localhost:9000/api/issues/search?componentKeys=$PROJECT&severities=$SEV&ps=1" | python3 -c "import sys,json; print(json.load(sys.stdin)['total'])")
  echo "$SEV: $COUNT"
done
\\\`\\\`\\\`

#### TP 2 : Créer un Quality Gate personnalisé

\\\`\\\`\\\`bash
# Créer le Quality Gate
QG_ID=$(curl -s -u $TOKEN: -X POST "http://localhost:9000/api/qualitygates/create?name=Formation+Strict" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")
echo "Quality Gate créé: ID=$QG_ID"

# Ajouter les conditions
curl -s -u $TOKEN: -X POST "http://localhost:9000/api/qualitygates/create_condition?gateId=$QG_ID&metric=new_coverage&op=LT&error=85"
curl -s -u $TOKEN: -X POST "http://localhost:9000/api/qualitygates/create_condition?gateId=$QG_ID&metric=new_duplicated_lines_density&op=GT&error=2"
curl -s -u $TOKEN: -X POST "http://localhost:9000/api/qualitygates/create_condition?gateId=$QG_ID&metric=new_reliability_rating&op=GT&error=1"
curl -s -u $TOKEN: -X POST "http://localhost:9000/api/qualitygates/create_condition?gateId=$QG_ID&metric=new_security_rating&op=GT&error=1"
curl -s -u $TOKEN: -X POST "http://localhost:9000/api/qualitygates/create_condition?gateId=$QG_ID&metric=new_maintainability_rating&op=GT&error=1"

# Assigner au projet
curl -s -u $TOKEN: -X POST "http://localhost:9000/api/qualitygates/select?projectKey=$PROJECT&gateId=$QG_ID"

echo "Quality Gate 'Formation Strict' assigné au projet"
\\\`\\\`\\\`

#### TP 3 : Vérification automatisée dans un script CI

\\\`\\\`\\\`bash
#!/bin/bash
# quality_gate_check.sh
TOKEN="sqa_VOTRE_TOKEN"
PROJECT="formation-tp"
SONAR_URL="http://localhost:9000"

echo "=== Vérification du Quality Gate ==="

# Récupérer le statut
RESPONSE=$(curl -s -u $TOKEN: "$SONAR_URL/api/qualitygates/project_status?projectKey=$PROJECT")
STATUS=$(echo $RESPONSE | python3 -c "import sys,json; print(json.load(sys.stdin)['projectStatus']['status'])")

echo "Statut: $STATUS"

# Afficher les conditions en échec
echo $RESPONSE | python3 -c "
import json,sys
data = json.load(sys.stdin)
conditions = data['projectStatus'].get('conditions', [])
for c in conditions:
    status_icon = '✅' if c['status'] == 'OK' else '❌'
    print(f\"  {status_icon} {c['metricKey']}: {c.get('actualValue','N/A')} (seuil: {c.get('errorThreshold','N/A')})\")
"

if [ "$STATUS" = "OK" ]; then
    echo "✅ Quality Gate PASSED"
    exit 0
else
    echo "❌ Quality Gate FAILED"
    exit 1
fi
\\\`\\\`\\\`

#### TP 4 : Analyser l'évolution des métriques

\\\`\\\`\\\`bash
# Obtenir l'historique sur les 10 dernières analyses
curl -s -u $TOKEN: "http://localhost:9000/api/measures/search_history?component=$PROJECT&metrics=bugs,code_smells,coverage&ps=10" | python3 -c "
import json,sys
data = json.load(sys.stdin)
print('=== Historique des métriques ===')
for measure in data['measures']:
    print(f'\\nMétrique: {measure[\"metric\"]}')
    for h in measure['history'][-5:]:
        print(f'  {h[\"date\"]}: {h[\"value\"]}')
"
\\\`\\\`\\\``,

      keyPoints: JSON.stringify([
        'Cinq domaines : Fiabilité, Sécurité, Maintenabilité, Couverture, Duplications',
        'Technical Debt Ratio = dette / temps de développement - ratings de A à E',
        'Quality Gate vérifie les conditions sur le nouveau code (Clean as You Code)',
        'API REST pour créer/modifier Quality Gates et Quality Profiles programmatiquement',
        'New Code Period : Previous Version recommandé pour les projets avec releases',
        'Security Hotspots nécessitent une revue humaine - pas automatiquement des vulnérabilités'
      ]) },

    { id: 'sq-03', courseId: 'sonarqube', title: 'Intégration CI/CD et SonarLint', duration: '4h', orderIndex: 3,
      theoryContent: `## Intégration de SonarQube dans les pipelines CI/CD

### Présentation

L'intégration de SonarQube dans la CI/CD automatise l'analyse qualité à chaque changement de code. Le flux typique est : Developer push → CI triggered → Build → Test → SonarScanner → SonarQube → Quality Gate → Deploy ou Block. SonarLint dans l'IDE complète ce workflow en offrant un feedback immédiat avant même le push.

### Installation sur Linux (Ubuntu/Debian)

Pour l'intégration CI/CD, vous avez besoin du SonarScanner et de la configuration de votre outil CI :

\\\`\\\`\\\`bash
# Installer SonarScanner CLI
wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip
sudo unzip sonar-scanner-cli-*.zip -d /opt/
sudo ln -s /opt/sonar-scanner-*/bin/sonar-scanner /usr/local/bin/sonar-scanner
sonar-scanner --version

# Pour Maven (pas besoin d'installation séparée, plugin intégré)
mvn org.sonarsource.scanner.maven:sonar-maven-plugin:sonar --version

# Pour Jenkins : installer le plugin SonarQube Scanner
# Manage Jenkins > Plugins > Rechercher "SonarQube Scanner" > Installer
# Puis : Manage Jenkins > System > SonarQube servers > Add

# Pour GitLab CI : utiliser l'image Docker sonarsource/sonar-scanner-cli
# Pour GitHub Actions : utiliser sonarsource/sonarqube-scan-action
\\\`\\\`\\\`

### Installation sur Linux (CentOS/RHEL)

\\\`\\\`\\\`bash
# Même procédure que Ubuntu pour le scanner CLI
sudo yum install -y wget unzip
wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip
sudo unzip sonar-scanner-cli-*.zip -d /opt/
sudo ln -s /opt/sonar-scanner-*/bin/sonar-scanner /usr/local/bin/sonar-scanner
\\\`\\\`\\\`

### Architecture et composants

\\\`\\\`\\\`
Developer (SonarLint) ──push──→ CI Pipeline ──scanner──→ SonarQube Server
     ↑                                                        │
     │ Connected Mode (sync rules)                    Quality Gate
     └────────────────────────────────────────── PASS ←──┤
                                                          │
                                                    FAIL → Block + Notify
\\\`\\\`\\\`

### Commandes essentielles

\\\`\\\`\\\`bash
# === JENKINS - Jenkinsfile complet ===
# (Voir section Configuration ci-dessous)

# === GITLAB CI - .gitlab-ci.yml ===
# sonar-scanner -Dsonar.qualitygate.wait=true

# === GITHUB ACTIONS ===
# uses: sonarsource/sonarqube-scan-action@master

# === SONAR-SCANNER OPTIONS CI/CD ===
sonar-scanner -Dsonar.qualitygate.wait=true              # Attendre le Quality Gate
sonar-scanner -Dsonar.qualitygate.timeout=300            # Timeout 5 min
sonar-scanner -Dsonar.branch.name=feature/x              # Analyse de branche
sonar-scanner -Dsonar.pullrequest.key=42                 # Analyse de PR
sonar-scanner -Dsonar.pullrequest.branch=feature/x       # Branche source PR
sonar-scanner -Dsonar.pullrequest.base=main              # Branche cible PR
sonar-scanner -Dsonar.verbose=true                       # Mode debug

# === WEBHOOKS ===
# Créer un webhook pour notifier Jenkins
curl -u token: -X POST "http://localhost:9000/api/webhooks/create" \\
  -d "name=Jenkins" \\
  -d "url=http://jenkins:8080/sonarqube-webhook/"

# Lister les webhooks
curl -u token: "http://localhost:9000/api/webhooks/list"

# === SONARLINT CONNECTED MODE ===
# Configuration VS Code (.vscode/settings.json) :
# {
#   "sonarlint.connectedMode.connections.sonarqube": [
#     { "serverUrl": "http://localhost:9000", "token": "sqa_xxx" }
#   ],
#   "sonarlint.connectedMode.project": {
#     "connectionId": "local-sq",
#     "projectKey": "my-project"
#   }
# }
\\\`\\\`\\\`

### Configuration

#### Jenkinsfile avec SonarQube

\\\`\\\`\\\`groovy
pipeline {
    agent any
    environment {
        SONAR_TOKEN = credentials('sonarqube-token')
    }
    stages {
        stage('Build & Test') {
            steps {
                sh 'mvn clean verify'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube-Server') {
                    sh 'mvn sonar:sonar -Dsonar.projectKey=my-project'
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
    }
}
\\\`\\\`\\\`

#### GitLab CI avec SonarQube

\\\`\\\`\\\`yaml
sonarqube:
  stage: quality
  image: sonarsource/sonar-scanner-cli:latest
  variables:
    SONAR_HOST_URL: "http://sonarqube:9000"
    SONAR_TOKEN: $SONAR_TOKEN
  script:
    - sonar-scanner
        -Dsonar.projectKey=$CI_PROJECT_NAME
        -Dsonar.sources=src
        -Dsonar.qualitygate.wait=true
  allow_failure: false
\\\`\\\`\\\`

#### GitHub Actions avec SonarQube

\\\`\\\`\\\`yaml
name: SonarQube
on: [push, pull_request]
jobs:
  sonarqube:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: sonarsource/sonarqube-scan-action@master
        env:
          SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: \${{ secrets.SONAR_HOST_URL }}
      - uses: sonarsource/sonarqube-quality-gate-action@master
        timeout-minutes: 5
        env:
          SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}
\\\`\\\`\\\`

### Utilisation avancée

#### PR Decoration
SonarQube commente directement les PRs avec les résultats : status check, commentaires inline sur les lignes problématiques, résumé des métriques.

#### SonarLint Connected Mode
Synchronise les règles du serveur vers l'IDE. Avantages : mêmes règles localement qu'en CI, issues supprimées non affichées, profils personnalisés appliqués automatiquement.

### Bonnes pratiques

1. **waitForQualityGate** dans Jenkins pour bloquer si qualité insuffisante
2. **fetch-depth: 0** pour GitHub Actions (git blame nécessaire)
3. **SonarLint Connected Mode** pour feedback avant le push
4. **Analyse de branches** pour vérifier avant le merge
5. **Webhooks** pour notifier Slack/Teams du résultat
6. **Tokens dédiés** par service CI (pas le token admin)`,

      practiceContent: `### Travaux Pratiques : Intégration CI/CD

#### TP 1 : Script d'analyse automatisée

\\\`\\\`\\\`bash
#!/bin/bash
# analyze_and_check.sh - Script complet d'analyse CI
set -e

PROJECT_KEY="formation-ci-tp"
SONAR_URL="http://localhost:9000"
SONAR_TOKEN="sqa_VOTRE_TOKEN"

echo "=== Étape 1: Analyse SonarQube ==="
sonar-scanner \\
  -Dsonar.projectKey=$PROJECT_KEY \\
  -Dsonar.sources=src \\
  -Dsonar.host.url=$SONAR_URL \\
  -Dsonar.token=$SONAR_TOKEN \\
  -Dsonar.qualitygate.wait=true

echo "=== Étape 2: Vérification Quality Gate ==="
sleep 5  # Attendre le processing

STATUS=$(curl -s -u $SONAR_TOKEN: "$SONAR_URL/api/qualitygates/project_status?projectKey=$PROJECT_KEY" \\
  | python3 -c "import sys,json; print(json.load(sys.stdin)['projectStatus']['status'])")

echo "Quality Gate: $STATUS"
if [ "$STATUS" != "OK" ]; then
    echo "❌ Quality Gate FAILED"
    
    # Afficher les issues nouvelles
    echo "=== Nouvelles issues ==="
    curl -s -u $SONAR_TOKEN: "$SONAR_URL/api/issues/search?componentKeys=$PROJECT_KEY&statuses=OPEN&types=BUG,VULNERABILITY&ps=10" \\
      | python3 -c "
import json,sys
data = json.load(sys.stdin)
for issue in data['issues'][:10]:
    print(f\"  [{issue['severity']}] {issue['message']} ({issue['component'].split(':')[-1]}:{issue.get('line','?')})\")
"
    exit 1
fi
echo "✅ Quality Gate PASSED - Déploiement autorisé"
\\\`\\\`\\\`

#### TP 2 : Configurer SonarLint Connected Mode

1. Installez l'extension SonarLint dans VS Code
2. Configurez la connexion :
\\\`\\\`\\\`json
// .vscode/settings.json
{
  "sonarlint.connectedMode.connections.sonarqube": [
    {
      "connectionId": "local-sq",
      "serverUrl": "http://localhost:9000",
      "token": "sqa_VOTRE_TOKEN"
    }
  ],
  "sonarlint.connectedMode.project": {
    "connectionId": "local-sq",
    "projectKey": "formation-tp"
  }
}
\\\`\\\`\\\`
3. Vérifiez que les issues apparaissent en temps réel dans l'éditeur
4. Modifiez un fichier avec un bug et observez le diagnostic instantané

#### TP 3 : Configurer un webhook

\\\`\\\`\\\`bash
# Créer un webhook
curl -u $SONAR_TOKEN: -X POST "$SONAR_URL/api/webhooks/create" \\
  -d "name=CI+Notification" \\
  -d "url=http://localhost:9999/sonar-webhook"

# Lancer un listener pour tester
python3 -c "
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
class H(BaseHTTPRequestHandler):
    def do_POST(self):
        data = json.loads(self.rfile.read(int(self.headers['Content-Length'])))
        print(f'Quality Gate: {data[\"qualityGate\"][\"status\"]}')
        print(f'Project: {data[\"project\"][\"key\"]}')
        self.send_response(200)
        self.end_headers()
HTTPServer(('',9999), H).serve_forever()
" &

# Relancer une analyse pour déclencher le webhook
sonar-scanner -Dsonar.projectKey=$PROJECT_KEY -Dsonar.sources=src -Dsonar.host.url=$SONAR_URL -Dsonar.token=$SONAR_TOKEN
\\\`\\\`\\\`

#### TP 4 : Analyse de branches

\\\`\\\`\\\`bash
# Créer une branche avec du code problématique
git checkout -b feature/bad-code
# Ajouter du code avec des bugs...

# Analyser la branche
sonar-scanner \\
  -Dsonar.projectKey=$PROJECT_KEY \\
  -Dsonar.sources=src \\
  -Dsonar.host.url=$SONAR_URL \\
  -Dsonar.token=$SONAR_TOKEN \\
  -Dsonar.branch.name=feature/bad-code

# Comparer avec main dans l'interface SonarQube
\\\`\\\`\\\``,

      keyPoints: JSON.stringify([
        'waitForQualityGate dans Jenkins bloque le pipeline si qualité insuffisante',
        'SonarLint en Connected Mode synchronise les règles du serveur vers l IDE',
        'PR Decoration affiche les résultats directement dans les Pull Requests',
        'fetch-depth: 0 est requis pour l analyse du nouveau code dans GitHub Actions',
        'Les webhooks notifient des systèmes externes du résultat de l analyse',
        'Analyse de branches permet de vérifier la qualité avant le merge'
      ]) },

    // ==================== DOORS ====================
    { id: 'doors-01', courseId: 'doors', title: 'Introduction à IBM DOORS', duration: '3h', orderIndex: 1,
      theoryContent: `## Introduction à IBM DOORS

### Présentation

IBM DOORS (Dynamic Object-Oriented Requirements System) est un outil de **gestion des exigences** (Requirements Management) utilisé dans les industries à forte réglementation : aéronautique (DO-178C), défense, automobile (ISO 26262), ferroviaire (EN 50128), médical (IEC 62304) et spatial. DOORS permet de capturer les exigences de manière structurée, d'établir la traçabilité bidirectionnelle complète entre tous les niveaux (système, logiciel, test), d'analyser l'impact des changements et de vérifier la couverture des exigences.

### Installation sur Linux

**Note importante** : IBM DOORS Classic (version 9.x) est un client Windows uniquement. Le serveur peut être installé sur Linux ou Windows. DOORS Next Generation (DNG) est une application web qui fonctionne sur n'importe quel OS via le navigateur.

#### Installation du serveur DOORS sur Linux

\\\`\\\`\\\`bash
# Prérequis serveur (Red Hat/CentOS recommandé par IBM)
sudo yum install -y glibc.i686 libstdc++.i686 libX11.i686 libXext.i686 libXi.i686 libXtst.i686

# Créer l'utilisateur DOORS
sudo useradd -m -d /opt/doors -s /bin/bash doorsadmin
sudo passwd doorsadmin

# Monter le média d'installation IBM
sudo mkdir -p /mnt/doors_install
sudo mount -o loop DOORS_9.7_Linux_Server.iso /mnt/doors_install

# Lancer l'installation serveur
cd /mnt/doors_install
sudo ./setup.bin -i console

# Suivre les prompts :
# - Répertoire d'installation : /opt/ibm/doors
# - Port serveur : 36677 (par défaut)
# - Données : /opt/ibm/doors/data
# - Licence : entrer la clé ou pointer vers le serveur FlexLM

# Configurer comme service
sudo cat > /etc/systemd/system/doors-server.service << 'EOF'
[Unit]
Description=IBM DOORS Server
After=network.target

[Service]
Type=forking
User=doorsadmin
ExecStart=/opt/ibm/doors/bin/doorsd start
ExecStop=/opt/ibm/doors/bin/doorsd stop
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable doors-server
sudo systemctl start doors-server

# Vérifier le service
sudo systemctl status doors-server
netstat -tlnp | grep 36677
\\\`\\\`\\\`

#### Installation du client DOORS (Windows)

\\\`\\\`\\\`bash
# Sur un poste Windows (PowerShell) :
# 1. Monter le média d'installation
# 2. Exécuter setup.exe
# 3. Suivre l'assistant :
#    - Type : Client
#    - Serveur : doors-server.company.com:36677
#    - Répertoire : C:\\Program Files\\IBM\\DOORS\\9.7

# Configuration de la connexion
# Fichier : C:\\Program Files\\IBM\\DOORS\\9.7\\etc\\doors.ini
# [Server]
# Hostname=doors-server.company.com
# Port=36677
# Database=DOORS_DB

# Lancer le client
# "C:\\Program Files\\IBM\\DOORS\\9.7\\bin\\doors.exe" -d DOORS_DB -s doors-server:36677
\\\`\\\`\\\`

### Architecture et composants

\\\`\\\`\\\`
┌────────────────────────────────────────────────────────────┐
│                    ARCHITECTURE DOORS                        │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────┐   │
│  │ Client DOORS │  │ Client DOORS │  │  DOORS Web     │   │
│  │ (Windows)    │  │ (Windows)    │  │  Access        │   │
│  │ Full GUI     │  │ Full GUI     │  │  (Read-only)   │   │
│  └──────┬───────┘  └──────┬───────┘  └───────┬────────┘   │
│         │                  │                   │            │
│         └──────────────────┼───────────────────┘            │
│                            │ TCP/IP (port 36677)            │
│                            ▼                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              DOORS DATABASE SERVER                    │   │
│  │                                                      │   │
│  │  Database → Projets → Dossiers → Modules → Objets   │   │
│  │                                                      │   │
│  │  Services : Authentication, Locking, Versioning      │   │
│  │  Storage  : fichiers plats ou Oracle DB             │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              FLEXLM LICENSE SERVER                    │   │
│  │  Gestion des licences utilisateur (flottantes)       │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘

Structure de la base de données :
Database (serveur)
├── Project "Avionics_System"
│   ├── Folder "01_System_Requirements"
│   │   ├── Formal Module "SyRS" (exigences système)
│   │   └── Link Module "SyRS_to_SRS" (liens de traçabilité)
│   ├── Folder "02_Software_Requirements"
│   │   ├── Formal Module "SRS" (exigences logiciel)
│   │   └── Link Module "SRS_to_TC"
│   └── Folder "03_Test_Cases"
│       └── Formal Module "TC" (cas de test)
└── Project "Another_Project"
    └── ...
\\\`\\\`\\\`

### Commandes essentielles

\\\`\\\`\\\`bash
# === COMMANDES SERVEUR DOORS (Linux) ===
/opt/ibm/doors/bin/doorsd start            # Démarrer le serveur
/opt/ibm/doors/bin/doorsd stop             # Arrêter le serveur
/opt/ibm/doors/bin/doorsd status           # Statut du serveur
/opt/ibm/doors/bin/doorsd -backup /backup  # Sauvegarde de la base

# === COMMANDES CLIENT DOORS (Windows CMD) ===
doors.exe -d DB_NAME -s server:port -u user -P password   # Lancer avec connexion
doors.exe -batch script.dxl                                # Exécuter un script DXL
doors.exe -W export_module.dxl                             # Exécuter sans interface

# === OPÉRATIONS DXL DE BASE ===
# Ouvrir un module
# Module m = read("/Project/Folder/Module", true)

# Parcourir les objets
# Object o; for o in entire m do { print identifier(o) " " o."Object Text" }

# Créer un objet
# Object newObj = create below(lastObj)
# newObj."Object Text" = "Nouvelle exigence"

# Modifier un attribut
# o."Status" = "Approved"

# Créer un lien
# create(sourceObj, targetObj, linkModName)

# Exporter en CSV
# Stream f = write("export.csv")
# f << "ID,Text,Status\\n"

# === OPÉRATIONS VIA DOORS WEB ACCESS (REST-like) ===
# Consultation des modules en lecture seule via navigateur web
# URL : http://doors-server:8080/dwa/

# === IMPORT/EXPORT ===
# Import depuis Word : File > Import > Microsoft Word
# Import depuis Excel/CSV : File > Import > Spreadsheet
# Export vers Word : File > Export > Microsoft Word
# Export ReqIF : File > Export > ReqIF (standard d'échange)

# === BASELINES ===
# Créer : File > Baseline > Create Baseline
# Comparer : File > Baseline > Compare Baselines
# Restaurer : File > Baseline > Set as Current

# === DXL SCRIPTS UTILITAIRES ===
# Lancer depuis : Tools > Edit DXL > Run
# Ou en batch : doors.exe -batch myscript.dxl
\\\`\\\`\\\`

### Configuration

#### Attributs d'exigences recommandés

| Attribut | Type | Valeurs | Usage |
|----------|------|---------|-------|
| Status | Enum | Draft, Review, Approved, Deleted | Cycle de vie |
| Priority | Enum | Must, Should, Could, Won't | MoSCoW |
| Verification_Method | Enum | Test, Analysis, Inspection, Demo | DO-178C |
| Allocated_To | String | Composant/équipe | Responsabilité |
| Rationale | Text | Libre | Justification |
| Source | String | Client, Standard, Derived | Origine |
| Compliance | Enum | Compliant, Partial, N/A | Conformité |

### Utilisation avancée

#### Standards supportés
- **DO-178C** : logiciel aéronautique (niveaux DAL A à E)
- **ISO 26262** : sécurité fonctionnelle automobile (ASIL A à D)
- **IEC 62304** : logiciel dispositifs médicaux
- **EN 50128** : logiciel ferroviaire (SIL 0 à 4)
- **CMMI** : maturité des processus

#### Traçabilité bidirectionnelle
Exigences Client → Exigences Système → Exigences Logiciel → Tests
Chaque niveau est lié au précédent par des Link Modules.

### Bonnes pratiques

1. **Une exigence = une phrase testable** avec sujet, verbe (shall), complément
2. **Attributs obligatoires** : Status, Priority, Verification_Method minimum
3. **Baselines régulières** : à chaque revue formelle (PDR, CDR)
4. **Audit des liens** : vérifier la couverture avant chaque milestone
5. **DXL pour l'automatisation** : exports, statistiques, vérifications
6. **Pas de mot ambigu** : éviter "should", "may", "might", "could"`,

      practiceContent: `### Travaux Pratiques : Prise en main de DOORS

#### TP 1 : Créer un projet et un module

1. Connectez-vous au serveur DOORS
2. Créez un projet : File > New > Project : "Formation_DOORS_TP"
3. Créez un dossier : "01_Requirements"
4. Créez un module formel : "SRS - Software Requirements" (prefix: SRS)

#### TP 2 : Configurer les attributs personnalisés

Dans le module, Edit > Attributes > Define :
\\\`\\\`\\\`
Attribut: Status
  Type: Enumeration
  Valeurs: Draft, Under_Review, Approved, Deleted
  Défaut: Draft

Attribut: Priority
  Type: Enumeration
  Valeurs: Must, Should, Could, Wont
  Défaut: Should

Attribut: Verification_Method
  Type: Enumeration
  Valeurs: Test, Analysis, Inspection, Demonstration
  Défaut: Test
\\\`\\\`\\\`

#### TP 3 : Saisir des exigences structurées

Créez la hiérarchie suivante :
\\\`\\\`\\\`
1. Introduction (heading)
   1.1 Purpose (heading)
2. Functional Requirements (heading)
   2.1 User Authentication (heading)
       SRS-001: The system shall authenticate users via username and password
       SRS-002: The system shall lock the account after 3 consecutive failed login attempts
       SRS-003: The system shall support password reset via registered email
   2.2 Data Management (heading)
       SRS-004: The system shall encrypt all stored data using AES-256
       SRS-005: The system shall perform automated backup every 24 hours
3. Non-Functional Requirements (heading)
   3.1 Performance (heading)
       SRS-006: The system shall respond to user requests within 2 seconds for 95th percentile
       SRS-007: The system shall support 1000 concurrent users
   3.2 Security (heading)
       SRS-008: All data in transit shall be encrypted using TLS 1.3 or higher
\\\`\\\`\\\`

Pour chaque exigence, remplissez Status, Priority et Verification_Method.

#### TP 4 : Créer des vues et filtres

1. Configurez une vue avec les colonnes : Object ID, Object Text, Status, Priority
2. Appliquez un filtre : Status != "Deleted" AND Priority == "Must"
3. Sauvegardez la vue : "Must_Requirements_View"

#### TP 5 : Créer une baseline

1. File > Baseline > Create
2. Nom : "Baseline_V1.0_Initial"
3. Description : "Première version approuvée des exigences SRS"
4. Vérifiez que la baseline est en lecture seule

#### TP 6 : Script DXL de statistiques

\\\`\\\`\\\`c
// Exécuter dans Tools > Edit DXL
Module m = current Module
Object o
int total = 0, must = 0, should = 0, approved = 0, draft = 0

for o in entire m do {
    if (!isHeading(o) and o."Object Text" != "") {
        total++
        string pri = o."Priority"
        string sta = o."Status"
        if (pri == "Must") must++
        if (pri == "Should") should++
        if (sta == "Approved") approved++
        if (sta == "Draft") draft++
    }
}

print "=== Statistiques du module ===\\n"
print "Total exigences : " total "\\n"
print "Must : " must " (" (must*100/total) "%)\\n"
print "Should : " should " (" (should*100/total) "%)\\n"
print "Approved : " approved "\\n"
print "Draft : " draft "\\n"
\\\`\\\`\\\``,

      keyPoints: JSON.stringify([
        'DOORS gère les exigences avec traçabilité complète pour les industries réglementées',
        'Serveur sur Linux, client sur Windows - DOORS Next Generation est full web',
        'Structure : Database > Project > Folder > Module > Object (exigence)',
        'Attributs typés : Status, Priority, Verification_Method pour chaque exigence',
        'Baselines figent une version du module (non modifiable, pour audit)',
        'DXL scripting pour automatiser exports, statistiques et vérifications'
      ]) },

    { id: 'doors-02', courseId: 'doors', title: 'Traçabilité et liens', duration: '5h', orderIndex: 2,
      theoryContent: `## Traçabilité et liens dans DOORS

### Présentation

La traçabilité des exigences est la capacité de suivre la vie d'une exigence dans les deux directions : traçabilité amont (d'où vient cette exigence ?) et traçabilité aval (comment est-elle implémentée et testée ?). Dans DOORS, les liens entre objets sont stockés dans des Link Modules et permettent de construire des matrices de traçabilité, d'analyser l'impact des changements et de vérifier la couverture complète des exigences. Cette traçabilité bidirectionnelle est exigée par tous les standards de sécurité (DO-178C, ISO 26262, IEC 62304).

### Installation sur Linux

Même infrastructure que le module précédent. Vérifiez que le serveur DOORS est actif et que vous avez accès à vos modules.

\\\`\\\`\\\`bash
# Vérifier le serveur
sudo systemctl status doors-server
netstat -tlnp | grep 36677

# Vérifier les sauvegardes avant de travailler sur la traçabilité
ls -la /opt/ibm/doors/backup/
\\\`\\\`\\\`

### Architecture et composants

\\\`\\\`\\\`
Matrice de traçabilité :

Exigences Client (StRS)     satisfiedBy     Exigences Système (SyRS)
     │                                            │
     │ satisfiedBy                                 │ satisfiedBy
     ▼                                            ▼
Exigences Logiciel (SRS)    verifiedBy      Cas de Tests (TC)
     │
     │ implementedBy
     ▼
Code Source / Design (DD)

Link Modules :
- StRS_to_SyRS_satisfiedBy (client → système)
- SyRS_to_SRS_satisfiedBy (système → logiciel)
- SRS_to_TC_verifiedBy (logiciel → tests)
- SRS_to_DD_implementedBy (logiciel → design)
\\\`\\\`\\\`

### Commandes essentielles

\\\`\\\`\\\`bash
# === DXL - PARCOURIR LES LIENS ===
# Liens sortants d'un objet
# Object o; Link outLink
# for outLink in all(o -> "*") do {
#     Object target = target(outLink)
#     print identifier(o) " -> " identifier(target) "\\n"
# }

# Liens entrants vers un objet
# for outLink in all(o <- "*") do {
#     Object source = source(outLink)
#     print identifier(source) " -> " identifier(o) "\\n"
# }

# === DXL - VÉRIFIER LA COUVERTURE ===
# Module m = current Module
# Object o; int covered=0, notCovered=0
# for o in entire m do {
#     if (!isHeading(o) and o."Object Text" != "") {
#         bool hasLink = false
#         Link lnk
#         for lnk in all(o -> "*") do { hasLink = true; break }
#         if (hasLink) covered++
#         else { notCovered++; print "GAP: " identifier(o) "\\n" }
#     }
# }
# print "Couverture: " covered "/" (covered+notCovered) "\\n"

# === DXL - TROUVER LES SUSPECTS ===
# for o in entire m do {
#     Link lnk
#     for lnk in all(o -> "*") do {
#         if (isSuspect(lnk)) {
#             print "SUSPECT: " identifier(o) " -> " identifier(target(lnk)) "\\n"
#         }
#     }
# }

# === DXL - CRÉER DES LIENS ===
# Module srcMod = read("/Project/SyRS", false)
# Module tgtMod = read("/Project/SRS", false)
# Object src = object(10, srcMod)
# Object tgt = object(25, tgtMod)
# create(src, tgt, linkModuleName("satisfiedBy"))

# === OPÉRATIONS UI ===
# Créer un Link Module : clic droit sur dossier > New > Link Module
# Créer un lien : drag & drop entre deux modules ouverts
# Matrice de traçabilité : Analysis > Traceability Matrix
# Analyse d'impact : clic droit sur objet > Links > Show
# Supprimer les suspects : Edit > Links > Clear All Suspects
\\\`\\\`\\\`

### Configuration

#### Types de liens standards
| Nom | Direction | Usage |
|-----|-----------|-------|
| satisfiedBy | HLR → LLR | L'exigence basse satisfait la haute |
| verifiedBy | REQ → TEST | Le test vérifie l'exigence |
| derivedFrom | LLR → HLR | L'exigence dérive de la haute |
| implementedBy | REQ → CODE | Le code implémente l'exigence |
| allocatedTo | REQ → COMPONENT | Allocation à un composant |

### Utilisation avancée

#### Liens suspects
Quand un objet source ou cible est modifié, DOORS marque le lien comme suspect. Cela signale que la relation pourrait ne plus être valide. L'analyse des suspects est une activité régulière de maintenance de la traçabilité.

#### Matrice de traçabilité
La matrice croisée montre les relations entre deux modules. Elle révèle les GAPS (exigences non couvertes) et les orphelins (exigences sans justification).

#### Couverture
Couverture = exigences avec liens / total exigences × 100. L'objectif est 100% dans les projets certifiés.

### Bonnes pratiques

1. **Liens cohérents** : toujours dans le même sens (haut vers bas)
2. **Cardinalité raisonnable** : max 5-7 liens par exigence
3. **Traiter les suspects rapidement** : ne pas accumuler
4. **Automatiser les vérifications** avec DXL
5. **Matrice de traçabilité** à chaque revue formelle
6. **Documenter les raisons** des liens non évidents`,

      practiceContent: `### Travaux Pratiques : Traçabilité

#### TP 1 : Créer une structure de traçabilité

1. Créez trois modules :
   - System Requirements (SyRS) : 5 exigences
   - Software Requirements (SRS) : 10 exigences
   - Test Cases (TC) : 8 cas de test

2. Créez deux Link Modules :
   - "SyRS_to_SRS" (satisfiedBy)
   - "SRS_to_TC" (verifiedBy)

3. Établissez les liens :
   - SyRS-001 → SRS-001, SRS-002
   - SyRS-002 → SRS-003, SRS-004
   - SyRS-003 → SRS-005, SRS-006
   - SyRS-004 → (INTENTIONNELLEMENT SANS LIEN = GAP)
   - SRS-001 → TC-001; SRS-002 → TC-002
   - SRS-003 → TC-003, TC-004
   - SRS-007 → (PAS DE TEST = GAP)

#### TP 2 : Générer la matrice de traçabilité

1. Analysis > Traceability Matrix
2. Row Module : System Requirements
3. Column Module : Software Requirements
4. Identifiez les lignes vides (GAPs) et colonnes vides (orphelins)

#### TP 3 : Script DXL de vérification de couverture

\\\`\\\`\\\`c
Module m = current Module
Object o
int total = 0, covered = 0, notCovered = 0

for o in entire m do {
    if (!isHeading(o) and o."Object Text" != "") {
        total++
        Link lnk
        bool hasOutLink = false
        for lnk in all(o -> "*") do {
            hasOutLink = true
            break
        }
        if (hasOutLink) {
            covered++
        } else {
            notCovered++
            print "GAP: " identifier(o) " - " o."Object Text" "\\n"
        }
    }
}

print "\\n=== Rapport de couverture ===\\n"
print "Total: " total "\\n"
print "Couverts: " covered " (" (covered*100/total) "%)\\n"
print "GAPS: " notCovered "\\n"
\\\`\\\`\\\`

#### TP 4 : Simuler une analyse d'impact

1. Modifiez SyRS-001 (changez le texte)
2. Observez les liens devenus "suspect"
3. Pour chaque suspect, décidez : Clear suspect ou modifier SRS
4. Documentez le nombre d'éléments impactés

#### TP 5 : Export de la matrice en CSV

\\\`\\\`\\\`c
// Script DXL d'export
Module m = current Module
Object o
Stream f = write("C:/export/traceability.csv")
f << "ID,Text,Status,Nb_Links_Out,Targets\\n"

for o in entire m do {
    if (!isHeading(o) and o."Object Text" != "") {
        f << identifier(o) ","
        f << "\"" o."Object Text" "\","
        f << o."Status" ","
        int count = 0
        string targets = ""
        Link lnk
        for lnk in all(o -> "*") do {
            count++
            targets = targets identifier(target(lnk)) " "
        }
        f << count "," targets "\\n"
    }
}
close(f)
print "Export terminé\\n"
\\\`\\\`\\\``,

      keyPoints: JSON.stringify([
        'Traçabilité bidirectionnelle : amont (origine) et aval (implémentation/test)',
        'Link Modules stockent les relations entre objets de modules différents',
        'La matrice de traçabilité révèle les GAPS et orphelins',
        'Les liens deviennent SUSPECTS quand un objet source ou cible est modifié',
        'DXL permet d automatiser les vérifications de couverture',
        'Couverture 100% exigée pour la certification DO-178C et ISO 26262'
      ]) },

    { id: 'doors-03', courseId: 'doors', title: 'Administration et DXL', duration: '7h', orderIndex: 3,
      theoryContent: `## Administration DOORS et programmation DXL

### Présentation

L'administration de DOORS comprend la gestion des utilisateurs, des droits d'accès, des baselines et des sauvegardes. DXL (DOORS eXtension Language) est le langage de script intégré qui permet d'automatiser toutes les opérations : exports, imports, vérifications de qualité, statistiques et rapports. Ce module couvre en détail l'administration quotidienne et la programmation DXL avec de nombreux exemples pratiques.

### Installation sur Linux

\\\`\\\`\\\`bash
# Administration serveur DOORS
sudo systemctl status doors-server

# Sauvegardes régulières (à planifier via cron)
/opt/ibm/doors/bin/doorsd -backup /backup/doors_$(date +%Y%m%d)

# Crontab pour sauvegarde quotidienne
echo "0 2 * * * /opt/ibm/doors/bin/doorsd -backup /backup/doors_\$(date +\\%Y\\%m\\%d)" | sudo crontab -u doorsadmin -

# Rotation des sauvegardes
find /backup -name "doors_*" -mtime +30 -exec rm -rf {} \\;

# Monitoring des connexions
/opt/ibm/doors/bin/doorsd -connections

# Vérification de l'intégrité
/opt/ibm/doors/bin/doorsd -verify
\\\`\\\`\\\`

### Architecture et composants

Modèle de sécurité DOORS :
\\\`\\\`\\\`
Niveaux d'accès :
- None : aucun accès
- Read : lecture seule
- Modify : modification des objets existants
- Create : création de nouveaux objets
- Delete : suppression d'objets
- Admin : administration complète

Hiérarchie : Database Admin > Project Admin > Module Owner > User
\\\`\\\`\\\`

### Commandes essentielles

\\\`\\\`\\\`bash
# === ADMINISTRATION ===
# Gestion utilisateurs (via le client DOORS > Administration)
# - Create User, Delete User, Assign to Group
# - Set Access Rights per project/folder/module

# Sauvegarde/Restauration
/opt/ibm/doors/bin/doorsd -backup /path/to/backup
/opt/ibm/doors/bin/doorsd -restore /path/to/backup

# === DXL - SYNTAXE DE BASE ===
# Variables et types
# int count = 0
# real pi = 3.14159
# string name = "Formation"
# bool valid = true
# Date today = today()
# Buffer buf = create()

# Structures de contrôle
# if (x > 0) { ... } else { ... }
# for (i = 0; i < 10; i++) { ... }
# while (condition) { ... }

# Fonctions
# string formatReq(string id, string text) {
#     return id ": " text
# }

# === DXL - ACCÈS AUX MODULES ET OBJETS ===
# Module m = read("/Project/Folder/Module", true)  // true = edit mode
# Module m = current Module                         // module courant
# Object o; for o in entire m do { ... }           // parcourir tous les objets
# Object o = object(42, m)                          // objet par numéro
# string text = o."Object Text"                     // lire un attribut
# o."Status" = "Approved"                           // modifier un attribut
# identifier(o)                                     // obtenir l'identifiant
# isHeading(o)                                      // est-ce un heading ?

# === DXL - SCRIPTS UTILITAIRES ===

# Script 1 : Export CSV complet
# Module m = current Module
# Object o
# Stream f = write("export.csv")
# f << "ID,Text,Status,Priority\\n"
# for o in entire m do {
#     if (!isHeading(o) and o."Object Text" != "") {
#         f << identifier(o) ",\\"" o."Object Text" "\\","
#         f << o."Status" "," o."Priority" "\\n"
#     }
# }
# close(f)

# Script 2 : Audit qualité des exigences
# int issues = 0
# for o in entire m do {
#     string text = o."Object Text"
#     if (text != "" and !isHeading(o)) {
#         if (contains(text, "should") or contains(text, "may")) {
#             issues++
#             print "AMBIGU: " identifier(o) "\\n"
#         }
#         if (length(text) > 500) {
#             issues++
#             print "TROP LONG: " identifier(o) "\\n"
#         }
#     }
# }

# Script 3 : Statistiques par status
# int total=0, draft=0, approved=0
# for o in entire m do {
#     if (!isHeading(o) and o."Object Text" != "") {
#         total++
#         if (o."Status" == "Draft") draft++
#         else if (o."Status" == "Approved") approved++
#     }
# }
# print "Total: " total ", Draft: " draft ", Approved: " approved "\\n"

# Script 4 : Bulk update d'attribut
# for o in entire m do {
#     if (o."Status" == "Under_Review") {
#         o."Status" = "Approved"
#         o."Approved_Date" = today()
#     }
# }

# Script 5 : Chercher les doublons
# Skip s = create()
# for o in entire m do {
#     string text = o."Object Text"
#     if (text != "" and !isHeading(o)) {
#         if (find(s, text)) print "DOUBLON: " identifier(o) "\\n"
#         else insert(s, text)
#     }
# }
# delete(s)
\\\`\\\`\\\`

### Configuration

#### Gestion des droits d'accès
- Par groupe (Developers, Reviewers, Managers, Admins)
- Par niveau (Database, Project, Folder, Module)
- Héritage configurable (inherit ou override)

#### Templates de modules
- Structure pré-définie (sections, attributs)
- Vues par défaut
- Règles de validation

### Utilisation avancée

#### Import/Export formats
- **ReqIF** : standard d'échange inter-outils (ISO 29148)
- **CSV/Excel** : import/export tabulaire
- **Word** : génération de documents conformes
- **XML** : export structuré pour intégration

#### OSLC (Open Services for Lifecycle Collaboration)
- Standard pour interconnecter les outils ALM
- DOORS DNG expose des API REST/OSLC
- Liens cross-tool : DOORS ↔ RTC ↔ RQM ↔ Rhapsody

### Bonnes pratiques

1. **Sauvegardes quotidiennes** automatisées avec rotation
2. **Groupes de droits** plutôt que droits individuels
3. **Scripts DXL versionnés** dans un SCM
4. **Validation automatique** avant les revues formelles
5. **Templates** pour assurer la cohérence des nouveaux modules
6. **Audit trail** activé pour la conformité`,

      practiceContent: `### Travaux Pratiques : Administration et DXL

#### TP 1 : Gestion des droits d'accès

1. Créez deux groupes : "Developers" (Modify), "Reviewers" (Read)
2. Assignez les droits par module
3. Testez avec différents comptes

#### TP 2 : Script DXL d'audit complet

\\\`\\\`\\\`c
// Script d'audit à exécuter sur chaque module
Module m = current Module
Object o
int total=0, compliant=0, issues=0

print "=== AUDIT DE QUALITÉ ===\\n"
print "Module: " name(m) "\\n\\n"

for o in entire m do {
    if (!isHeading(o) and o."Object Text" != "") {
        total++
        bool ok = true
        string text = o."Object Text"
        
        // Vérif 1 : Status renseigné
        if (o."Status" == "" or o."Status" == "Draft") {
            ok = false
            print "[STATUS] " identifier(o) " - encore en Draft\\n"
        }
        
        // Vérif 2 : Pas de mots ambigus
        if (contains(text,"should") or contains(text,"may") or contains(text,"might")) {
            ok = false
            issues++
            print "[AMBIGU] " identifier(o) "\\n"
        }
        
        // Vérif 3 : Priority renseignée
        if (o."Priority" == "") {
            ok = false
            print "[PRIORITY] " identifier(o) " - non renseignée\\n"
        }
        
        // Vérif 4 : Lien sortant existe
        Link lnk
        bool hasLink = false
        for lnk in all(o -> "*") do { hasLink = true; break }
        if (!hasLink) {
            ok = false
            print "[NO LINK] " identifier(o) "\\n"
        }
        
        if (ok) compliant++
    }
}

print "\\n=== RÉSULTAT ===\\n"
print "Total: " total "\\n"
print "Conformes: " compliant " (" (compliant*100/total) "%)\\n"
print "Non-conformes: " (total-compliant) "\\n"
\\\`\\\`\\\`

#### TP 3 : Export automatisé en CSV

\\\`\\\`\\\`c
Module m = current Module
Object o
Stream csv = write("C:/exports/requirements_export.csv")

csv << "ID,Text,Status,Priority,Verification,Links_Count\\n"

for o in entire m do {
    if (!isHeading(o) and o."Object Text" != "") {
        int linkCount = 0
        Link lnk
        for lnk in all(o -> "*") do { linkCount++ }
        
        csv << identifier(o) ","
        csv << "\\"" o."Object Text" "\\","
        csv << o."Status" ","
        csv << o."Priority" ","
        csv << o."Verification_Method" ","
        csv << linkCount "\\n"
    }
}
close(csv)
print "Export CSV terminé\\n"
\\\`\\\`\\\`

#### TP 4 : Baseline et comparaison

1. Modifiez 3 exigences dans votre module
2. Créez une baseline "V1.0"
3. Modifiez encore 2 exigences
4. Créez une baseline "V1.1"
5. Comparez les baselines et documentez les différences

#### TP 5 : Template de module

1. Créez un module template avec structure standard
2. Ajoutez les attributs pré-configurés
3. Créez un nouveau module depuis ce template
4. Vérifiez que la structure est héritée`,

      keyPoints: JSON.stringify([
        'Sécurité par groupes avec niveaux : None, Read, Modify, Create, Delete, Admin',
        'Sauvegardes quotidiennes automatisées avec rotation et vérification d intégrité',
        'DXL : langage C-like pour automatiser exports, audits, statistiques, bulk updates',
        'Scripts DXL essentiels : export CSV, audit qualité, vérification liens, statistiques',
        'ReqIF : format standard d échange inter-outils pour les exigences',
        'Templates standardisent la création de nouveaux modules (attributs, structure, vues)'
      ]) },


    // ==================== CLEARCASE ====================
    { id: 'cc-01', courseId: 'clearcase', title: 'Introduction à ClearCase', duration: '4h', orderIndex: 1,
      theoryContent: `## Introduction à IBM Rational ClearCase

### Présentation

IBM Rational ClearCase est un **système de gestion de configuration logicielle** (SCM - Software Configuration Management) de classe entreprise. Développé initialement par Atria Software puis acquis par Rational Software (racheté par IBM en 2003), ClearCase est utilisé dans les grandes organisations pour gérer le code source, les documents et tous les artefacts de développement.

ClearCase se distingue des SCM traditionnels par ses concepts uniques :

- **VOB (Versioned Object Base)** : base de données versionée stockant tous les fichiers et répertoires
- **Vues (Views)** : espace de travail donnant accès aux fichiers selon des règles de sélection
- **Config Spec** : fichier de règles définissant quelles versions sont visibles dans une vue
- **Branches** : branches nommées avec historique complet et merge tracking
- **Labels** : étiquettes appliquées à des versions spécifiques pour marquer des baselines

Contrairement à Git (distribué), ClearCase est **centralisé** et repose sur un serveur (ou cluster de serveurs) qui héberge les VOBs. Les développeurs accèdent aux fichiers via des vues dynamiques (montées réseau en temps réel) ou des vues snapshot (copies locales).

### Installation sur Linux (Ubuntu/Debian)

#### Prérequis système

\\\`\\\`\\\`bash
# Vérifier les prérequis
uname -a               # Linux 64-bit requis
free -h                # Minimum 4 Go RAM pour le serveur
df -h /opt             # Minimum 20 Go espace disque

# Dépendances système requises
sudo apt update
sudo apt install -y \\
  libc6 libstdc++6 libncurses5 libxml2 \\
  ksh rsh-client rsh-server nfs-kernel-server \\
  xinetd libmotif-dev xterm

# Vérifier le hostname résolu
hostname -f
ping -c 1 \$(hostname -f)
\\\`\\\`\\\`

#### Installation du serveur ClearCase

\\\`\\\`\\\`bash
# Monter le média d'installation IBM
sudo mkdir -p /mnt/clearcase
sudo mount -o loop IBM_Rational_ClearCase_9.0.2.iso /mnt/clearcase

# Lancer l'installateur
cd /mnt/clearcase
sudo ./launchpad.sh

# Installation silencieuse (mode texte)
sudo ./install.sh -silent -acceptLicense \\
  -installDir /opt/ibm/clearcase \\
  -components server,client,integration

# Configurer le service ClearCase
sudo /opt/ibm/clearcase/etc/clearcase_configure.sh

# Vérifier l'installation
cleartool -version
# IBM Rational ClearCase version 9.0.2.x

# Démarrer les services
sudo /opt/ibm/clearcase/etc/atria_start
\\\`\\\`\\\`

#### Configuration post-installation

\\\`\\\`\\\`bash
# Créer le répertoire de stockage des VOBs
sudo mkdir -p /var/adm/clearcase/vobs
sudo chown clearcase_albd:clearcase /var/adm/clearcase/vobs

# Créer le répertoire des vues
sudo mkdir -p /var/adm/clearcase/views
sudo chown clearcase_albd:clearcase /var/adm/clearcase/views

# Vérifier les licences
clearlicense -product ClearCase

# Vérifier les services
ps -ef | grep albd
ps -ef | grep lockmgr
\\\`\\\`\\\`

### Architecture et composants

\\\`\\\`\\\`
┌─────────────────────────────────────────────────────────────────┐
│                    ClearCase Architecture                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐   │
│   │  Client Dev  │     │  Client Dev  │     │  Build Host  │   │
│   │  (Dynamic    │     │  (Snapshot   │     │  (Dynamic    │   │
│   │   View)      │     │   View)      │     │   View)      │   │
│   └──────┬───────┘     └──────┬───────┘     └──────┬───────┘   │
│          │                     │                     │           │
│          ├─────────────────────┼─────────────────────┤           │
│          │         RÉSEAU (NFS/MVFS)                 │           │
│          ▼                     ▼                     ▼           │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │              ClearCase Region Server                      │  │
│   │  ┌─────────┐  ┌──────────┐  ┌───────────┐  ┌────────┐  │  │
│   │  │  ALBD   │  │  VOB     │  │   View    │  │ License│  │  │
│   │  │ Daemon  │  │  Server  │  │   Server  │  │ Server │  │  │
│   │  │ (port   │  │ (vob_s)  │  │ (view_s)  │  │(albd)  │  │  │
│   │  │  371)   │  │          │  │           │  │        │  │  │
│   │  └─────────┘  └────┬─────┘  └─────┬─────┘  └────────┘  │  │
│   └─────────────────────┼──────────────┼─────────────────────┘  │
│                         │              │                         │
│   ┌─────────────────────▼──────────────▼─────────────────────┐  │
│   │                   Storage                                 │  │
│   │  ┌──────────┐  ┌──────────┐  ┌──────────┐               │  │
│   │  │  VOB DB  │  │  VOB     │  │  View    │               │  │
│   │  │ (.vbs)   │  │  Storage │  │  Storage │               │  │
│   │  │          │  │  Pools   │  │ (.vws)   │               │  │
│   │  └──────────┘  └──────────┘  └──────────┘               │  │
│   └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
\\\`\\\`\\\`

**Composants principaux :**

| Composant | Rôle |
|-----------|------|
| ALBD (Atria Location Broker Daemon) | Point d'entrée, routage des requêtes (port 371) |
| VOB Server (vob_server) | Gère l'accès aux bases de données VOB |
| View Server (view_server) | Gère les vues et le cache |
| MVFS (Multi-Version File System) | Système de fichiers virtuel pour vues dynamiques |
| Lock Manager (lockmgr) | Gestion de la concurrence et des verrous |
| DB Server | Base de données interne (RPC-based) |

### Commandes essentielles

#### Gestion des VOBs

\\\`\\\`\\\`bash
# Créer une VOB
cleartool mkvob -tag /vobs/projet_alpha \\
  -c "VOB pour le projet Alpha" \\
  /var/adm/clearcase/vobs/projet_alpha.vbs

# Monter une VOB
cleartool mount /vobs/projet_alpha

# Lister les VOBs
cleartool lsvob
cleartool lsvob -long /vobs/projet_alpha

# Démonter une VOB
cleartool umount /vobs/projet_alpha

# Supprimer une VOB (attention!)
cleartool rmvob /var/adm/clearcase/vobs/projet_alpha.vbs

# Informations détaillées
cleartool describe vob:/vobs/projet_alpha

# Verrouiller/Déverrouiller une VOB
cleartool lock vob:/vobs/projet_alpha
cleartool unlock vob:/vobs/projet_alpha
\\\`\\\`\\\`

#### Gestion des vues

\\\`\\\`\\\`bash
# Créer une vue dynamique
cleartool mkview -tag dev_jean_main \\
  /var/adm/clearcase/views/dev_jean_main.vws

# Créer une vue snapshot
cleartool mkview -snapshot -tag snap_jean \\
  -vws /var/adm/clearcase/views/snap_jean.vws \\
  /home/jean/snap_jean

# Lister les vues
cleartool lsview
cleartool lsview -long dev_jean_main

# Se positionner dans une vue (dynamique)
cleartool setview dev_jean_main
# ou
cd /view/dev_jean_main/vobs/projet_alpha

# Mettre à jour une vue snapshot
cleartool update -f /home/jean/snap_jean

# Supprimer une vue
cleartool rmview -tag dev_jean_main

# Voir la config spec d'une vue
cleartool catcs
cleartool catcs -tag dev_jean_main
\\\`\\\`\\\`

#### Config Spec (sélection des versions)

\\\`\\\`\\\`bash
# Éditer la config spec de la vue courante
cleartool edcs

# Appliquer une config spec depuis un fichier
cleartool setcs /path/to/my_configspec.txt

# Config spec basique (voir le main/LATEST)
# element * CHECKEDOUT
# element * /main/LATEST

# Config spec avec branche
# element * CHECKEDOUT
# element * /main/dev_feature/LATEST
# element * /main/LATEST

# Config spec avec label
# element * CHECKEDOUT
# element * REL_1.0
# element * /main/LATEST

# Config spec avec date
# element * CHECKEDOUT
# element * /main/LATEST -time 01-Jan-2024.12:00:00
\\\`\\\`\\\`

#### Checkout / Checkin / Uncheckout

\\\`\\\`\\\`bash
# Checkout un fichier (réservé - personne d'autre ne peut modifier)
cleartool checkout -reserved -c "Correction bug #123" src/main.c

# Checkout non réservé (merge nécessaire si conflit)
cleartool checkout -unreserved -c "Ajout feature" src/utils.h

# Checkin (créer une nouvelle version)
cleartool checkin -c "Fix: correction du buffer overflow" src/main.c

# Annuler un checkout
cleartool uncheckout src/main.c
cleartool uncheckout -keep src/main.c   # garde le fichier modifié (.keep)

# Lister les checkouts dans la vue
cleartool lsco -cview -avobs -short
cleartool lsco -recurse .

# Voir l'historique d'un fichier
cleartool lshistory src/main.c
cleartool lshistory -graphical src/main.c
\\\`\\\`\\\`

#### Branches et Labels

\\\`\\\`\\\`bash
# Créer un type de branche
cleartool mkbrtype -c "Branche de développement feature X" dev_featureX

# Créer une branche sur un fichier
cleartool mkbranch dev_featureX src/main.c

# Créer un type de label
cleartool mklbtype -c "Release 2.0" REL_2_0

# Appliquer un label
cleartool mklabel REL_2_0 src/main.c
cleartool mklabel -recurse REL_2_0 .

# Lister les labels
cleartool lstype -kind lbtype
cleartool describe lbtype:REL_2_0

# Lister les branches
cleartool lstype -kind brtype
cleartool describe brtype:dev_featureX

# Merge
cleartool findmerge . -fversion /main/dev_featureX/LATEST -merge
cleartool merge -to src/main.c /main/dev_featureX/LATEST
\\\`\\\`\\\`

#### Comparaison et historique

\\\`\\\`\\\`bash
# Comparer deux versions
cleartool diff src/main.c@@/main/2 src/main.c@@/main/3
cleartool diff -graphical src/main.c@@/main/2 src/main.c

# Arbre de versions
cleartool lsvtree src/main.c
cleartool lsvtree -graphical src/main.c

# Historique complet
cleartool lshistory -recurse -since 01-Jan-2024 .

# Annotations (blame)
cleartool annotate src/main.c
cleartool annotate -fmt "%Sd %u %Vn | " src/main.c

# Trouver des fichiers
cleartool find . -version "lbtype(REL_1_0)" -print
cleartool find . -branch "brtype(dev_featureX)" -print
\\\`\\\`\\\`

### Configuration

#### Fichier de configuration réseau

\\\`\\\`\\\`bash
# /var/adm/clearcase/config/rgy_region.conf
# Définit la région ClearCase
REGION=france_dev

# /var/adm/clearcase/config/rgy_hosts.conf
# Liste des serveurs de registre
registry_host=cc-server-01.company.com
backup_registry=cc-server-02.company.com
\\\`\\\`\\\`

#### Configuration client

\\\`\\\`\\\`bash
# Vérifier la configuration
cleartool hostinfo -long
cleartool lsregion

# Configurer le registre
cleartool mkregion -tag europe_region

# Protection storage pools
cleartool protectvob -chown root /vobs/projet_alpha

# Espace disque VOB
cleartool space /vobs/projet_alpha
\\\`\\\`\\\`

### Bonnes pratiques

1. **Utilisez des vues dynamiques** pour le développement actif (accès temps réel)
2. **Vues snapshot** pour les builds CI ou les machines déconnectées
3. **Toujours commenter** les checkout/checkin (-c "description")
4. **Verrouillez les branches** de release après livraison
5. **Config specs partagées** : stockez-les dans un fichier versionné
6. **Labels systématiques** : appliquez un label à chaque release/milestone
7. **Nettoyez les vues orphelines** régulièrement (rmview)
8. **Surveillez l'espace VOB** (scrubber pour purger les données dérivées)
9. **Sauvegardez les VOBs** quotidiennement avec vob_snapshot
10. **Évitez les checkout réservés** sauf nécessité (bloque les autres développeurs)`,

      practiceContent: `## Travaux Pratiques - Introduction à ClearCase

### Prérequis
- Accès à un serveur ClearCase configuré
- Compte utilisateur avec droits de création de vues

### TP 1 : Création et exploration d'une VOB

\\\`\\\`\\\`bash
# 1. Lister les VOBs disponibles
cleartool lsvob

# 2. Monter une VOB existante
cleartool mount /vobs/tp_formation

# 3. Vérifier le montage
ls /vobs/tp_formation
cleartool describe vob:/vobs/tp_formation

# 4. Explorer la structure
cleartool ls /vobs/tp_formation
cleartool ls -long /vobs/tp_formation/src
\\\`\\\`\\\`

### TP 2 : Création et utilisation d'une vue dynamique

\\\`\\\`\\\`bash
# 1. Créer une vue dynamique personnelle
cleartool mkview -tag tp_\$(whoami)_main \\
  /var/adm/clearcase/views/tp_\$(whoami)_main.vws

# 2. Se positionner dans la vue
cleartool setview tp_\$(whoami)_main

# 3. Naviguer dans la VOB
cd /vobs/tp_formation/src
ls -la

# 4. Vérifier la config spec active
cleartool catcs

# 5. Modifier la config spec
cleartool edcs
# Ajouter :
# element * CHECKEDOUT
# element * /main/LATEST
\\\`\\\`\\\`

### TP 3 : Checkout, modification, checkin

\\\`\\\`\\\`bash
# 1. Checkout un fichier
cleartool checkout -unreserved -c "TP: modification test" src/hello.c

# 2. Vérifier le statut
cleartool lsco -cview

# 3. Modifier le fichier
echo '// Modification TP' >> src/hello.c

# 4. Voir les différences
cleartool diff -pred src/hello.c

# 5. Checkin
cleartool checkin -c "TP: ajout commentaire test" src/hello.c

# 6. Vérifier l'historique
cleartool lshistory src/hello.c
\\\`\\\`\\\`

### TP 4 : Branches et labels

\\\`\\\`\\\`bash
# 1. Créer un type de branche
cleartool mkbrtype -c "Branche TP exercice" tp_\$(whoami)_br

# 2. Modifier la config spec pour la branche
cleartool edcs
# element * CHECKEDOUT
# element * .../tp_\$(whoami)_br/LATEST
# element * /main/LATEST -mkbranch tp_\$(whoami)_br

# 3. Checkout et modification (crée la branche automatiquement)
cleartool checkout -c "TP branche" src/hello.c
echo '// Sur ma branche' >> src/hello.c
cleartool checkin -c "Modif sur branche" src/hello.c

# 4. Vérifier l'arbre de versions
cleartool lsvtree src/hello.c

# 5. Créer et appliquer un label
cleartool mklbtype -c "Fin TP" TP_DONE_\$(whoami)
cleartool mklabel -recurse TP_DONE_\$(whoami) /vobs/tp_formation/src
\\\`\\\`\\\`

### TP 5 : Vue snapshot et comparaison

\\\`\\\`\\\`bash
# 1. Créer une vue snapshot
cleartool mkview -snapshot -tag tp_\$(whoami)_snap \\
  -vws /var/adm/clearcase/views/tp_snap_\$(whoami).vws \\
  ~/clearcase_snap

# 2. Mettre à jour la vue
cd ~/clearcase_snap
cleartool update .

# 3. Comparer avec la vue dynamique
cleartool diff src/hello.c@@/main/LATEST src/hello.c@@/main/tp_\$(whoami)_br/LATEST

# 4. Nettoyer
cleartool rmview -tag tp_\$(whoami)_snap
cleartool rmview -tag tp_\$(whoami)_main
\\\`\\\`\\\``,

      keyPoints: JSON.stringify([
        'ClearCase est un SCM centralisé avec VOBs, vues et config specs',
        'VOB (Versioned Object Base) : base de données versionée pour fichiers et répertoires',
        'Vues dynamiques (accès réseau temps réel) vs snapshot (copie locale)',
        'Config Spec : règles de sélection des versions visibles (branche, label, date)',
        'Checkout réservé bloque les autres, checkout non-réservé permet le travail parallèle',
        'Labels : étiquettes pour marquer des baselines et releases',
        'Commandes clés : mkvob, mkview, setview, checkout, checkin, mklabel, lsvtree',
        'Architecture client-serveur : ALBD, VOB Server, View Server, MVFS'
      ]) },


    { id: 'cc-02', courseId: 'clearcase', title: 'UCM et gestion des branches', duration: '5h', orderIndex: 2,
      theoryContent: `## ClearCase UCM et Gestion des Branches

### Présentation

**UCM (Unified Change Management)** est la couche de gestion de processus intégrée à ClearCase. UCM fournit un modèle de travail structuré qui simplifie la gestion des branches, des activités et des livraisons. C'est l'approche recommandée par IBM pour les équipes utilisant ClearCase.

UCM introduit des concepts de haut niveau au-dessus du versionnement ClearCase de base :

- **Projet UCM** : conteneur de travail regroupant streams et composants
- **Stream (flux)** : branche managée automatiquement (équivalent d'une branche Git)
- **Activity (activité)** : unité de travail logique regroupant des changements (comme un commit Git)
- **Baseline** : snapshot d'un composant à un instant donné (comme un tag Git)
- **Component** : ensemble de fichiers/répertoires versionés ensemble
- **Deliver** : livrer ses changements depuis un stream de développement vers le stream d'intégration
- **Rebase** : mettre à jour son stream de développement avec les dernières baselines

### Installation sur Linux (Ubuntu/Debian)

UCM est intégré à ClearCase, pas d'installation séparée. Activation :

\\\`\\\`\\\`bash
# Vérifier que ClearCase UCM est disponible
cleartool man mkproject

# Créer un PVOB (Project VOB) - pré-requis UCM
cleartool mkvob -tag /vobs/pvob_projet \\
  -ucmproject \\
  -c "Project VOB pour UCM" \\
  /var/adm/clearcase/vobs/pvob_projet.vbs

# Monter le PVOB
cleartool mount /vobs/pvob_projet

# Vérifier le type
cleartool describe vob:/vobs/pvob_projet
# Type : UCM Project VOB
\\\`\\\`\\\`

#### Configuration d'un projet UCM complet

\\\`\\\`\\\`bash
# 1. Créer le composant
cleartool mkcomp -c "Composant application" \\
  app_component@/vobs/pvob_projet \\
  -root /vobs/src_code

# 2. Créer le projet UCM
cleartool mkproject -c "Projet Alpha UCM" \\
  -in /vobs/pvob_projet \\
  projet_alpha@/vobs/pvob_projet

# 3. Créer le stream d'intégration
cleartool mkstream -c "Stream intégration" \\
  -integration \\
  -in projet_alpha@/vobs/pvob_projet \\
  int_alpha@/vobs/pvob_projet

# 4. Créer une baseline initiale
cleartool mkbl -c "Baseline initiale" \\
  -component app_component@/vobs/pvob_projet \\
  BL_INIT

# 5. Créer un stream de développement
cleartool mkstream -c "Dev Jean" \\
  -in projet_alpha@/vobs/pvob_projet \\
  -baseline BL_INIT@/vobs/pvob_projet \\
  dev_jean@/vobs/pvob_projet
\\\`\\\`\\\`

### Architecture et composants

\\\`\\\`\\\`
┌─────────────────────────────────────────────────────────────────┐
│                    UCM Architecture                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   ┌──────────────────────────────────────────────────────┐       │
│   │              PROJET UCM                               │       │
│   │                                                       │       │
│   │   ┌────────────────────────────────────────────┐     │       │
│   │   │    Stream d'Intégration (INT)              │     │       │
│   │   │    BL_1.0 ──── BL_1.1 ──── BL_2.0        │     │       │
│   │   └──────┬─────────────┬────────────┬─────────┘     │       │
│   │          │  deliver    │  deliver   │  rebase        │       │
│   │          ▼             ▼            ▼                │       │
│   │   ┌──────────┐  ┌──────────┐  ┌──────────┐         │       │
│   │   │ Dev_Jean │  │Dev_Marie │  │Dev_Pierre│         │       │
│   │   │ Stream   │  │ Stream   │  │ Stream   │         │       │
│   │   │          │  │          │  │          │         │       │
│   │   │ Act_123  │  │ Act_456  │  │ Act_789  │         │       │
│   │   │ Act_124  │  │ Act_457  │  │          │         │       │
│   │   └──────────┘  └──────────┘  └──────────┘         │       │
│   │                                                       │       │
│   │   Composants: [app_component] [lib_component]        │       │
│   └──────────────────────────────────────────────────────┘       │
│                                                                   │
│   ┌──────────────────────────────────────────────────────┐       │
│   │              PVOB (Project VOB)                       │       │
│   │  - Métadonnées projet, streams, activities           │       │
│   │  - Baselines, composants, politiques                 │       │
│   └──────────────────────────────────────────────────────┘       │
│                                                                   │
│   ┌──────────────────────────────────────────────────────┐       │
│   │              VOBs de code source                      │       │
│   │  - Fichiers et répertoires versionnés                │       │
│   │  - Branches créées automatiquement par UCM           │       │
│   └──────────────────────────────────────────────────────┘       │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
\\\`\\\`\\\`

### Commandes essentielles

#### Gestion des projets et streams

\\\`\\\`\\\`bash
# Lister les projets UCM
cleartool lsproject -invob /vobs/pvob_projet

# Détails d'un projet
cleartool describe project:projet_alpha@/vobs/pvob_projet

# Lister les streams
cleartool lsstream -in projet_alpha@/vobs/pvob_projet

# Créer un stream de développement
cleartool mkstream -c "Développement feature X" \\
  -in projet_alpha@/vobs/pvob_projet \\
  -baseline BL_1_0@/vobs/pvob_projet \\
  dev_featureX@/vobs/pvob_projet

# Créer une vue UCM liée au stream
cleartool mkview -tag jean_featureX \\
  -stream dev_jean@/vobs/pvob_projet \\
  /var/adm/clearcase/views/jean_featureX.vws

# Se positionner dans la vue
cleartool setview jean_featureX
\\\`\\\`\\\`

#### Gestion des activités

\\\`\\\`\\\`bash
# Créer une activité
cleartool mkactivity -c "Correction bug #567" \\
  -in dev_jean@/vobs/pvob_projet \\
  fix_bug_567@/vobs/pvob_projet

# Se positionner sur une activité (set activity)
cleartool setactivity fix_bug_567@/vobs/pvob_projet

# Lister les activités du stream
cleartool lsactivity -in dev_jean@/vobs/pvob_projet

# Détails d'une activité (changeset)
cleartool lsactivity -long fix_bug_567@/vobs/pvob_projet
cleartool describe activity:fix_bug_567@/vobs/pvob_projet

# Voir le changeset (fichiers modifiés)
cleartool lsactivity -changeset fix_bug_567@/vobs/pvob_projet

# Terminer une activité
cleartool setactivity -none
\\\`\\\`\\\`

#### Deliver et Rebase

\\\`\\\`\\\`bash
# DELIVER : livrer du stream dev vers intégration
# Depuis la vue du stream de développement
cleartool deliver -stream dev_jean@/vobs/pvob_projet \\
  -to int_alpha@/vobs/pvob_projet \\
  -activities fix_bug_567@/vobs/pvob_projet

# Compléter le deliver après résolution de conflits
cleartool deliver -complete

# Annuler un deliver en cours
cleartool deliver -cancel

# Vérifier l'état du deliver
cleartool deliver -status

# REBASE : récupérer les dernières baselines dans son stream dev
cleartool rebase -stream dev_jean@/vobs/pvob_projet \\
  -baseline BL_1_1@/vobs/pvob_projet

# Compléter le rebase
cleartool rebase -complete

# Rebase recommandé (dernière baseline recommandée)
cleartool rebase -recommended -stream dev_jean@/vobs/pvob_projet
\\\`\\\`\\\`

#### Baselines et composants

\\\`\\\`\\\`bash
# Créer une baseline
cleartool mkbl -c "Build validé sprint 3" \\
  -view int_view \\
  BL_SPRINT_3

# Lister les baselines
cleartool lsbl -component app_component@/vobs/pvob_projet
cleartool lsbl -stream int_alpha@/vobs/pvob_projet

# Promouvoir une baseline (changer son niveau)
cleartool chbl -level RELEASED BL_SPRINT_3@/vobs/pvob_projet

# Niveaux de promotion : INITIAL > BUILT > TESTED > RELEASED > REJECTED
cleartool describe baseline:BL_SPRINT_3@/vobs/pvob_projet

# Comparer des baselines
cleartool diffbl BL_SPRINT_2@/vobs/pvob_projet BL_SPRINT_3@/vobs/pvob_projet
cleartool diffbl -activities BL_SPRINT_2@/vobs/pvob_projet BL_SPRINT_3@/vobs/pvob_projet
\\\`\\\`\\\`

#### Merge et résolution de conflits (findmerge)

\\\`\\\`\\\`bash
# Trouver les fichiers à merger
cleartool findmerge /vobs/src_code -fversion .../dev_featureX/LATEST \\
  -print

# Exécuter le merge
cleartool findmerge /vobs/src_code -fversion .../dev_featureX/LATEST \\
  -merge

# Merge graphique (pour conflits complexes)
cleartool findmerge /vobs/src_code -fversion .../dev_featureX/LATEST \\
  -gmerge

# Merge d'un fichier spécifique
cleartool merge -to src/main.c \\
  -version /main/dev_featureX/LATEST

# Vérifier le statut de merge
cleartool describe -fmt "%[hlink:Merge]p\\n" src/main.c
\\\`\\\`\\\`

#### Triggers et automatisation

\\\`\\\`\\\`bash
# Créer un trigger type (pré-checkin)
cleartool mktrtype -element -all \\
  -preop checkin \\
  -c "Vérifier format du commentaire" \\
  -exec "/opt/triggers/check_comment.sh" \\
  trg_check_comment@/vobs/src_code

# Trigger post-deliver (notification)
cleartool mktrtype -ucmobject -all \\
  -postop deliver_complete \\
  -c "Notification email après deliver" \\
  -exec "/opt/triggers/notify_deliver.sh" \\
  trg_notify_deliver@/vobs/pvob_projet

# Lister les triggers
cleartool lstype -kind trtype -invob /vobs/src_code

# Désactiver un trigger temporairement
cleartool lock trtype:trg_check_comment@/vobs/src_code

# Script trigger exemple (check_comment.sh)
# #!/bin/bash
# COMMENT=\$(cleartool describe -fmt "%c" \$CLEARCASE_PN)
# if [[ ! \$COMMENT =~ ^(feat|fix|docs|refactor): ]]; then
#   echo "Erreur: commentaire doit commencer par feat:|fix:|docs:|refactor:"
#   exit 1
# fi
# exit 0
\\\`\\\`\\\`

### Configuration

#### Politiques de projet UCM

\\\`\\\`\\\`bash
# Configurer les politiques du projet
cleartool chproject \\
  -policy POLICY_DELIVER_REQUIRE_REBASE \\
  -policy POLICY_DELIVER_NCO_DEVSTR \\
  projet_alpha@/vobs/pvob_projet

# Politiques disponibles :
# POLICY_DELIVER_REQUIRE_REBASE - Rebase obligatoire avant deliver
# POLICY_DELIVER_NCO_DEVSTR - Pas de checkout sur stream dev pendant deliver
# POLICY_CHSTREAM_UNRESTRICTED - Changement de stream libre
# POLICY_INTERPROJECT_DELIVER - Deliver inter-projet autorisé

# Voir les politiques actives
cleartool describe -long project:projet_alpha@/vobs/pvob_projet
\\\`\\\`\\\`

### Bonnes pratiques

1. **Rebase fréquent** : récupérez les baselines d'intégration régulièrement
2. **Activités granulaires** : une activité = un changement logique cohérent
3. **Nommage des streams** : convention dev_prenom_feature ou team_feature
4. **Baselines régulières** : créez des baselines à chaque build stable
5. **Promote baselines** : utilisez les niveaux de promotion (BUILT → TESTED → RELEASED)
6. **Triggers de qualité** : pré-checkin pour format, pré-deliver pour build
7. **Deliver atomique** : livrez des activités complètes, pas des modifications partielles
8. **Documentation** : commentez systématiquement les activités et baselines
9. **Politique REQUIRE_REBASE** : obligez le rebase avant deliver pour éviter les conflits
10. **Nettoyage** : archivez les streams de développement terminés`,

      practiceContent: `## Travaux Pratiques - UCM et Branches

### TP 1 : Configuration d'un projet UCM

\\\`\\\`\\\`bash
# 1. Créer un PVOB
cleartool mkvob -tag /vobs/pvob_tp \\
  -ucmproject \\
  -c "PVOB pour TP UCM" \\
  /var/adm/clearcase/vobs/pvob_tp.vbs
cleartool mount /vobs/pvob_tp

# 2. Créer le composant
cleartool mkcomp -c "Composant TP" \\
  comp_tp@/vobs/pvob_tp \\
  -root /vobs/tp_formation

# 3. Créer le projet
cleartool mkproject -c "Projet TP UCM" \\
  -in /vobs/pvob_tp \\
  projet_tp@/vobs/pvob_tp

# 4. Créer le stream d'intégration
cleartool mkstream -integration \\
  -c "Integration TP" \\
  -in projet_tp@/vobs/pvob_tp \\
  int_tp@/vobs/pvob_tp
\\\`\\\`\\\`

### TP 2 : Workflow UCM complet

\\\`\\\`\\\`bash
# 1. Créer un stream de développement
cleartool mkstream -c "Dev feature login" \\
  -in projet_tp@/vobs/pvob_tp \\
  -baseline BL_INIT@/vobs/pvob_tp \\
  dev_login@/vobs/pvob_tp

# 2. Créer une vue associée
cleartool mkview -tag view_dev_login \\
  -stream dev_login@/vobs/pvob_tp \\
  /var/adm/clearcase/views/view_dev_login.vws

# 3. Travailler dans la vue
cleartool setview view_dev_login
cd /vobs/tp_formation/src

# 4. Créer une activité
cleartool mkactivity -c "Implémenter login" act_login
cleartool setactivity act_login

# 5. Modifier des fichiers
cleartool checkout -c "Ajout login" auth.c
echo '// Login implementation' >> auth.c
cleartool checkin -c "Login V1" auth.c

# 6. Deliver vers intégration
cleartool deliver -stream dev_login@/vobs/pvob_tp \\
  -to int_tp@/vobs/pvob_tp
cleartool deliver -complete
\\\`\\\`\\\`

### TP 3 : Rebase et gestion des conflits

\\\`\\\`\\\`bash
# 1. Simuler un changement en intégration
# (un collègue a livré du code)

# 2. Rebase du stream de développement
cleartool rebase -stream dev_login@/vobs/pvob_tp \\
  -recommended

# 3. En cas de conflit
cleartool findmerge . -flatest -merge
# Résoudre manuellement si nécessaire
cleartool rebase -complete

# 4. Vérifier la baseline courante du stream
cleartool describe stream:dev_login@/vobs/pvob_tp
\\\`\\\`\\\`

### TP 4 : Triggers

\\\`\\\`\\\`bash
# 1. Créer un script de trigger
cat > /opt/triggers/check_ci.sh << 'EOF'
#!/bin/bash
COMMENT=$(cleartool describe -fmt "%c" $CLEARCASE_PN)
if [ -z "$COMMENT" ]; then
  echo "ERREUR: Un commentaire est obligatoire pour le checkin"
  exit 1
fi
exit 0
EOF
chmod +x /opt/triggers/check_ci.sh

# 2. Créer le trigger type
cleartool mktrtype -element -all \\
  -preop checkin \\
  -c "Commentaire obligatoire" \\
  -exec "/opt/triggers/check_ci.sh" \\
  trg_comment@/vobs/tp_formation

# 3. Tester le trigger
cleartool checkout -nc src/test.c    # OK
cleartool checkin -nc src/test.c     # ÉCHEC - pas de commentaire
cleartool checkin -c "Test" src/test.c  # OK
\\\`\\\`\\\`

### TP 5 : Baselines et promotion

\\\`\\\`\\\`bash
# 1. Créer une baseline depuis la vue d'intégration
cleartool setview int_view
cleartool mkbl -c "Build CI #42 OK" BL_BUILD_42

# 2. Vérifier la baseline
cleartool lsbl -component comp_tp@/vobs/pvob_tp

# 3. Promouvoir la baseline
cleartool chbl -level BUILT BL_BUILD_42@/vobs/pvob_tp
cleartool chbl -level TESTED BL_BUILD_42@/vobs/pvob_tp
cleartool chbl -level RELEASED BL_BUILD_42@/vobs/pvob_tp

# 4. Comparer avec la baseline précédente
cleartool diffbl -activities BL_BUILD_41@/vobs/pvob_tp BL_BUILD_42@/vobs/pvob_tp
\\\`\\\`\\\``,

      keyPoints: JSON.stringify([
        'UCM : couche de processus structuré au-dessus de ClearCase (projets, streams, activités)',
        'Stream = branche managée automatiquement ; Activity = unité de travail logique',
        'Workflow UCM : create stream → mkactivity → develop → deliver → rebase',
        'Deliver : livrer les changements du stream dev vers le stream d intégration',
        'Rebase : synchroniser son stream avec les dernières baselines d intégration',
        'Baselines avec niveaux de promotion : INITIAL → BUILT → TESTED → RELEASED',
        'Triggers : scripts automatiques pré/post opérations (qualité, notifications)',
        'Politique REQUIRE_REBASE recommandée pour éviter conflits lors du deliver',
        'PVOB (Project VOB) stocke les métadonnées UCM (projets, streams, baselines)'
      ]) },


    { id: 'cc-03', courseId: 'clearcase', title: 'Migration vers Git', duration: '5h', orderIndex: 3,
      theoryContent: `## Migration ClearCase vers Git

### Présentation

La migration de ClearCase vers Git est un projet complexe mais de plus en plus fréquent. Les organisations migrent pour bénéficier de la rapidité, de la flexibilité et de l'écosystème moderne de Git (GitHub, GitLab, CI/CD cloud). Cette migration nécessite une planification soigneuse car les modèles de versionnement sont fondamentalement différents.

**Pourquoi migrer ?**

- **Coût** : licences ClearCase très élevées vs Git gratuit
- **Performance** : Git est beaucoup plus rapide (opérations locales)
- **Écosystème** : intégration native avec CI/CD modernes (Jenkins, GitLab CI, GitHub Actions)
- **Recrutement** : la majorité des développeurs connaît Git, très peu ClearCase
- **Agilité** : Git flow, feature branches, pull requests
- **Cloud** : hébergement cloud facile (GitHub, GitLab, Bitbucket)

**Défis de la migration :**

- Mapping des concepts (VOB → repo, branch → branch, label → tag)
- Historique : conserver ou non l'historique complet
- Vues dynamiques : pas d'équivalent direct dans Git
- UCM activities : mapper vers des commits/branches Git
- Taille des repos : ClearCase supporte des repos énormes, Git non

### Installation sur Linux (Ubuntu/Debian)

#### Outils de migration

\\\`\\\`\\\`bash
# Installer Git
sudo apt update
sudo apt install -y git git-lfs

# Configurer Git LFS pour les gros fichiers binaires
git lfs install

# Installer git-cc (bridge ClearCase-Git open source)
git clone https://github.com/charleso/git-cc.git /opt/git-cc
cd /opt/git-cc
pip install -r requirements.txt
sudo ln -s /opt/git-cc/git-cc /usr/local/bin/git-cc

# Installer cc2git (alternative)
git clone https://github.com/niclasr/cc2git.git /opt/cc2git
pip3 install -r /opt/cc2git/requirements.txt

# IBM Rational Bridge (outil officiel IBM)
# Disponible dans le package Rational Team Concert (RTC)
# Installation via IBM Installation Manager

# Installer git-filter-repo pour nettoyage post-migration
pip3 install git-filter-repo
\\\`\\\`\\\`

### Architecture et composants

\\\`\\\`\\\`
┌─────────────────────────────────────────────────────────────────┐
│              Stratégie de Migration ClearCase → Git               │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Phase 1: Analyse          Phase 2: Migration    Phase 3: Valid. │
│  ┌──────────────────┐     ┌──────────────────┐  ┌────────────┐ │
│  │ Inventaire VOBs  │     │ Export historique │  │ Tests      │ │
│  │ Mapping concepts │ ──▶ │ Conversion       │──▶│ Validation │ │
│  │ Choix stratégie  │     │ Nettoyage        │  │ Formation  │ │
│  │ Planning         │     │ Push Git         │  │ Cutover    │ │
│  └──────────────────┘     └──────────────────┘  └────────────┘ │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │           Mapping des concepts                             │   │
│  ├─────────────────────┬─────────────────────────────────────┤   │
│  │ ClearCase           │ Git                                  │   │
│  ├─────────────────────┼─────────────────────────────────────┤   │
│  │ VOB                 │ Repository (un ou plusieurs)         │   │
│  │ Element (fichier)   │ Fichier tracké                       │   │
│  │ Version             │ Commit (snapshot complet)            │   │
│  │ Branch              │ Branch                               │   │
│  │ Label               │ Tag                                  │   │
│  │ Config Spec         │ .gitattributes + branch switch       │   │
│  │ View                │ Working directory (clone)            │   │
│  │ Checkout/Checkin    │ git add + git commit                 │   │
│  │ UCM Activity        │ Feature branch + commits             │   │
│  │ UCM Stream          │ Long-lived branch                    │   │
│  │ UCM Deliver         │ Pull Request / Merge Request         │   │
│  │ UCM Rebase          │ git rebase / git merge               │   │
│  │ UCM Baseline        │ Tag                                  │   │
│  │ Trigger             │ Git hook                             │   │
│  └─────────────────────┴─────────────────────────────────────┘   │
│                                                                   │
│  Stratégies de migration :                                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │  Big Bang    │  │ Incrémental  │  │  Coexistence         │   │
│  │  (cutover    │  │ (par module) │  │  (bridge bidirec.)   │   │
│  │   unique)    │  │              │  │                      │   │
│  └──────────────┘  └──────────────┘  └──────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
\\\`\\\`\\\`

### Commandes essentielles

#### Analyse pré-migration

\\\`\\\`\\\`bash
# Inventaire des VOBs et taille
cleartool lsvob -long | grep -E "tag|pool|size"
cleartool space -all /vobs/projet_alpha

# Compter les éléments
cleartool find /vobs/projet_alpha -type f -print | wc -l
cleartool find /vobs/projet_alpha -type d -print | wc -l

# Lister toutes les branches
cleartool lstype -kind brtype -invob /vobs/projet_alpha -short

# Lister tous les labels
cleartool lstype -kind lbtype -invob /vobs/projet_alpha -short

# Identifier les gros fichiers binaires (candidats Git LFS)
cleartool find /vobs/projet_alpha -type f -name "*.dll" -print
cleartool find /vobs/projet_alpha -type f -name "*.lib" -print
cleartool find /vobs/projet_alpha -type f -name "*.exe" -print

# Historique et activité
cleartool lshistory -recurse -since 01-Jan-2020 /vobs/projet_alpha | wc -l

# Identifier les fichiers les plus modifiés
cleartool lshistory -recurse /vobs/projet_alpha | \\
  grep "checkin" | awk '{print $NF}' | sort | uniq -c | sort -rn | head -20
\\\`\\\`\\\`

#### Export avec git-cc

\\\`\\\`\\\`bash
# Configuration git-cc
cd /workspace/migration
git init projet_alpha_git
cd projet_alpha_git

# Configurer git-cc
cat > .git/gitcc << EOF
[core]
  clearcase = /vobs/projet_alpha
  branches = main|dev_.*|release_.*
  include = src/|include/|docs/
  exclude = build/|tmp/|*.o
[user]
  name = Migration Bot
  email = migration@company.com
EOF

# Lancer l'export (peut prendre des heures)
git-cc init
git-cc rebase  # Import depuis ClearCase vers Git

# Vérifier l'historique importé
git log --oneline | head -20
git branch -a
git tag -l
\\\`\\\`\\\`

#### Export manuel avec scripts

\\\`\\\`\\\`bash
#!/bin/bash
# Script de migration manuelle ClearCase → Git
# migrate_cc_to_git.sh

VOB="/vobs/projet_alpha"
GIT_REPO="/workspace/migration/projet_alpha"
BRANCH="main"

# Initialiser le repo Git
mkdir -p $GIT_REPO
cd $GIT_REPO
git init

# Exporter la baseline courante (snapshot)
echo "Export de la baseline courante..."
cleartool setview -exec "cp -r $VOB/src ." migration_view
cleartool setview -exec "cp -r $VOB/include ." migration_view

# Ajouter au repo Git
git add .
git commit -m "Initial import from ClearCase baseline BL_CURRENT"

# Exporter les labels comme tags
for label in $(cleartool lstype -kind lbtype -invob $VOB -short); do
  echo "Processing label: $label"
  
  # Appliquer config spec avec le label
  cat > /tmp/cs_$label << EOF2
element * $label
element * /main/LATEST
EOF2
  
  cleartool setcs -tag migration_view /tmp/cs_$label
  
  # Copier et committer
  rsync -a --delete $VOB/src/ $GIT_REPO/src/
  git add -A
  git commit -m "Label: $label" --allow-empty
  git tag "$label"
done

echo "Migration terminée. $(git log --oneline | wc -l) commits créés."
\\\`\\\`\\\`

#### Migration des branches

\\\`\\\`\\\`bash
#!/bin/bash
# Script migration branches ClearCase → Git

VOB="/vobs/projet_alpha"
GIT_REPO="/workspace/migration/projet_alpha"

# Pour chaque branche ClearCase active
for branch in $(cleartool lstype -kind brtype -invob $VOB -short | grep -v "^main$"); do
  echo "=== Migration branche: $branch ==="
  
  cd $GIT_REPO
  git checkout -b "$branch" main
  
  # Config spec pour cette branche
  cat > /tmp/cs_branch << EOF
element * CHECKEDOUT
element * .../$branch/LATEST
element * /main/LATEST
EOF
  
  cleartool setcs -tag migration_view /tmp/cs_branch
  
  # Synchroniser
  rsync -a --delete --exclude='.git' \\
    /view/migration_view$VOB/src/ $GIT_REPO/src/
  
  git add -A
  if ! git diff --cached --quiet; then
    git commit -m "Import branch $branch from ClearCase"
  fi
done

git checkout main
echo "Branches migrées: $(git branch | wc -l)"
\\\`\\\`\\\`

#### Post-migration et nettoyage

\\\`\\\`\\\`bash
# Configurer .gitattributes pour LFS
cat > .gitattributes << EOF
*.dll filter=lfs diff=lfs merge=lfs -text
*.lib filter=lfs diff=lfs merge=lfs -text
*.exe filter=lfs diff=lfs merge=lfs -text
*.bin filter=lfs diff=lfs merge=lfs -text
*.pdf filter=lfs diff=lfs merge=lfs -text
EOF
git add .gitattributes
git commit -m "Configure Git LFS for binary files"

# Nettoyer l'historique (supprimer fichiers sensibles)
git filter-repo --path-glob '*.bak' --invert-paths
git filter-repo --path build/ --invert-paths

# Configurer .gitignore
cat > .gitignore << EOF
# Build artifacts
build/
*.o
*.obj
*.exe
*.dll

# ClearCase artifacts
*.contrib
*.keep
lost+found/
EOF
git add .gitignore
git commit -m "Add .gitignore"

# Pousser vers le serveur Git distant
git remote add origin git@gitlab.company.com:team/projet_alpha.git
git push -u origin --all
git push origin --tags
\\\`\\\`\\\`

### Configuration

#### Configuration de coexistence (période de transition)

\\\`\\\`\\\`bash
# Script de synchronisation bidirectionnelle (pont)
# sync_cc_git.sh - À exécuter par cron
#!/bin/bash
LOCK_FILE="/tmp/cc_git_sync.lock"

if [ -f "$LOCK_FILE" ]; then
  echo "Sync already running"
  exit 1
fi
touch $LOCK_FILE

# Sync ClearCase → Git
cd /workspace/bridge/projet
git-cc rebase

# Sync Git → ClearCase (si nécessaire)
git-cc checkin

rm $LOCK_FILE

# Cron configuration
# */30 * * * * /opt/scripts/sync_cc_git.sh >> /var/log/cc_git_sync.log 2>&1
\\\`\\\`\\\`

#### Configuration Git pour l'équipe post-migration

\\\`\\\`\\\`bash
# Template de hook pre-commit (remplace les triggers ClearCase)
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
# Vérifier le format du message de commit
# Équivalent du trigger ClearCase check_comment

# Pas de fichiers binaires non-LFS
for file in $(git diff --cached --name-only); do
  if file "$file" | grep -q "binary"; then
    if ! git lfs ls-files | grep -q "$file"; then
      echo "ERREUR: fichier binaire $file non géré par LFS"
      exit 1
    fi
  fi
done
exit 0
EOF
chmod +x .git/hooks/pre-commit
\\\`\\\`\\\`

### Bonnes pratiques

1. **Migrer par phases** : commencez par un module pilote, pas tout d'un coup
2. **Conservez un snapshot** de l'historique ClearCase (archive) même si vous ne migrez pas tout
3. **Git LFS** pour tous les binaires > 1 Mo
4. **Formez les équipes** sur Git avant le cutover (workflow très différent)
5. **Période de gel** : arrêtez les développements sur ClearCase pendant le cutover
6. **Validation exhaustive** : comparez checksums entre ClearCase et Git après migration
7. **Gardez ClearCase en lecture seule** pendant 3-6 mois comme référence
8. **Mappez UCM vers GitFlow** : stream intégration → main/develop, stream dev → feature branches
9. **Automatisez les tests** post-migration pour valider que le code compile et passe les tests
10. **Documentation** : créez un guide de correspondance CC→Git pour les développeurs`,

      practiceContent: `## Travaux Pratiques - Migration ClearCase vers Git

### TP 1 : Analyse de l'existant ClearCase

\\\`\\\`\\\`bash
# 1. Inventaire complet
echo "=== Inventaire VOB ==="
cleartool lsvob

# 2. Statistiques
echo "=== Statistiques ==="
cleartool find /vobs/tp_formation -type f -print | wc -l
echo "Fichiers trouvés"

cleartool lstype -kind brtype -invob /vobs/tp_formation -short | wc -l
echo "Branches"

cleartool lstype -kind lbtype -invob /vobs/tp_formation -short | wc -l
echo "Labels"

# 3. Identifier les binaires
echo "=== Fichiers binaires ==="
cleartool find /vobs/tp_formation -type f \\( -name "*.dll" -o -name "*.exe" -o -name "*.jar" \\) -print

# 4. Activité récente
echo "=== Activité derniers 30 jours ==="
cleartool lshistory -recurse -since $(date -d "30 days ago" +%d-%b-%Y) /vobs/tp_formation | grep checkin | wc -l
\\\`\\\`\\\`

### TP 2 : Migration snapshot (baseline courante)

\\\`\\\`\\\`bash
# 1. Préparer le repo Git
mkdir -p /workspace/migration/tp_project
cd /workspace/migration/tp_project
git init
git lfs install

# 2. Exporter depuis ClearCase (via vue snapshot)
cleartool mkview -snapshot -tag migration_snap \\
  -vws /var/adm/clearcase/views/migration_snap.vws \\
  /tmp/migration_snap

cd /tmp/migration_snap
cleartool update .

# 3. Copier vers Git (exclure métadonnées CC)
rsync -av --exclude='.copyarea.db' \\
  --exclude='lost+found' \\
  /tmp/migration_snap/vobs/tp_formation/ \\
  /workspace/migration/tp_project/

# 4. Configurer LFS et committer
cd /workspace/migration/tp_project
echo "*.jar filter=lfs diff=lfs merge=lfs -text" > .gitattributes
git add .
git commit -m "Initial migration from ClearCase"

# 5. Vérifier
git log --stat
du -sh .git
\\\`\\\`\\\`

### TP 3 : Migration avec historique (labels → tags)

\\\`\\\`\\\`bash
# 1. Script de migration des labels
cd /workspace/migration/tp_project

for label in REL_1_0 REL_1_1 REL_2_0; do
  echo "Migrating label: $label"
  
  # Appliquer config spec avec label
  cat > /tmp/cs_migration << EOF
element * $label
element * /main/LATEST
EOF
  cleartool setcs -tag migration_snap /tmp/cs_migration
  cleartool update -f /tmp/migration_snap
  
  # Sync vers Git
  rsync -a --delete --exclude='.git' --exclude='.copyarea.db' \\
    /tmp/migration_snap/vobs/tp_formation/ \\
    /workspace/migration/tp_project/
  
  git add -A
  git commit -m "ClearCase label: $label" --allow-empty
  git tag "$label" -m "Migrated from ClearCase label $label"
done

# 2. Vérifier les tags
git tag -l
git log --oneline --decorate
\\\`\\\`\\\`

### TP 4 : Validation post-migration

\\\`\\\`\\\`bash
# 1. Comparer le contenu
echo "=== Validation ==="

# Checksum ClearCase
find /tmp/migration_snap/vobs/tp_formation/src -type f -exec md5sum {} \\; | sort > /tmp/cc_checksums.txt

# Checksum Git
find /workspace/migration/tp_project/src -type f -exec md5sum {} \\; | sort > /tmp/git_checksums.txt

# Comparer
diff /tmp/cc_checksums.txt /tmp/git_checksums.txt
if [ $? -eq 0 ]; then
  echo "VALIDATION OK: contenus identiques"
else
  echo "ATTENTION: différences détectées"
  diff /tmp/cc_checksums.txt /tmp/git_checksums.txt | head -20
fi

# 2. Compter les fichiers
CC_COUNT=$(find /tmp/migration_snap/vobs/tp_formation/src -type f | wc -l)
GIT_COUNT=$(find /workspace/migration/tp_project/src -type f | wc -l)
echo "ClearCase: $CC_COUNT fichiers, Git: $GIT_COUNT fichiers"

# 3. Vérifier que le build fonctionne
cd /workspace/migration/tp_project
make clean && make all
\\\`\\\`\\\`

### TP 5 : Configuration Git post-migration

\\\`\\\`\\\`bash
# 1. Configurer le workflow Git
cd /workspace/migration/tp_project

# Branching strategy (GitFlow simplifié)
git checkout -b develop
git checkout -b release/1.0

# 2. Hooks Git (remplaçant les triggers CC)
cat > .git/hooks/commit-msg << 'EOF'
#!/bin/bash
MSG=$(cat $1)
if ! echo "$MSG" | grep -qE "^(feat|fix|docs|refactor|test|chore)(\(.+\))?: .{10,}"; then
  echo "Format: type(scope): description (min 10 chars)"
  echo "Types: feat, fix, docs, refactor, test, chore"
  exit 1
fi
EOF
chmod +x .git/hooks/commit-msg

# 3. Push vers le serveur
git remote add origin git@gitlab.company.com:team/tp_project.git
git push -u origin --all
git push origin --tags

echo "Migration complète!"
\\\`\\\`\\\``,

      keyPoints: JSON.stringify([
        'Migration motivée par : coût licences, performance, écosystème moderne, recrutement',
        'Mapping concepts : VOB→repo, label→tag, branch→branch, UCM activity→feature branch',
        'Stratégies : Big Bang (cutover unique), incrémentale (par module), coexistence (bridge)',
        'Outils : git-cc, cc2git, IBM Rational Bridge, scripts personnalisés',
        'Git LFS indispensable pour les fichiers binaires (DLL, EXE, JAR)',
        'Validation post-migration : checksums, nombre de fichiers, tests de build',
        'Période de coexistence recommandée : ClearCase en lecture seule pendant 3-6 mois',
        'Formation équipe obligatoire : workflow ClearCase très différent de Git',
        'Hooks Git remplacent les triggers ClearCase (même logique, syntaxe différente)'
      ]) },


    // ==================== KLOCWORK ====================
    { id: 'kw-01', courseId: 'klocwork', title: 'Introduction à Klocwork', duration: '4h', orderIndex: 1,
      theoryContent: `## Introduction à Klocwork

### Présentation

**Klocwork** (maintenant Perforce Klocwork) est un outil d'**analyse statique de code** (SAST - Static Application Security Testing) de classe entreprise pour les langages C, C++, Java et C#. Il détecte les défauts critiques, les vulnérabilités de sécurité et les violations de standards de codage sans exécuter le code.

Klocwork se distingue par :

- **Analyse incrémentale** : analyse uniquement les fichiers modifiés (rapide en CI)
- **Précision** : moteur d'analyse de flux de données inter-procédural avancé
- **Standards** : support natif MISRA C/C++, CERT C/C++, CWE, OWASP, AUTOSAR
- **Knowledge Base** : base de connaissance centralisée pour gérer les résultats
- **Intégration IDE** : plugins pour Eclipse, Visual Studio, IntelliJ
- **Desktop analysis** : analyse locale avant commit (shift-left)

**Types de défauts détectés :**

| Catégorie | Exemples |
|-----------|----------|
| Buffer overflow | Dépassement de tableau, strcpy non sécurisé |
| Null pointer | Déréférencement de pointeur NULL |
| Memory leak | Fuite mémoire, ressource non libérée |
| Concurrency | Race condition, deadlock potentiel |
| Security | Injection SQL, XSS, path traversal |
| Uninitialized var | Variable utilisée sans initialisation |
| Dead code | Code inatteignable |
| Resource leak | Fichier ouvert non fermé, socket non libéré |

### Installation sur Linux (Ubuntu/Debian)

#### Installation du serveur Klocwork

\\\`\\\`\\\`bash
# Prérequis système
sudo apt update
sudo apt install -y openjdk-11-jdk postgresql-14 unzip wget

# Vérifier Java
java -version
# openjdk version "11.0.x"

# Télécharger Klocwork (depuis le portail Perforce)
wget https://downloads.perforce.com/klocwork/kw-server-2023.4-linux64.tar.gz

# Extraire
sudo mkdir -p /opt/klocwork
sudo tar -xzf kw-server-2023.4-linux64.tar.gz -C /opt/klocwork
sudo ln -s /opt/klocwork/kw-server-2023.4 /opt/klocwork/current

# Ajouter au PATH
echo 'export PATH=/opt/klocwork/current/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Initialiser le serveur
kwservice create-server /opt/klocwork/server \\
  --port 8080 \\
  --db-port 3306 \\
  --license-host license.company.com \\
  --license-port 27000

# Démarrer le serveur
kwservice start --name klocwork-server /opt/klocwork/server

# Vérifier
kwservice status /opt/klocwork/server
# Server running on port 8080
\\\`\\\`\\\`

#### Installation des outils client (analyse)

\\\`\\\`\\\`bash
# Télécharger les outils d'analyse
wget https://downloads.perforce.com/klocwork/kw-analysis-2023.4-linux64.tar.gz
sudo tar -xzf kw-analysis-2023.4-linux64.tar.gz -C /opt/klocwork

# PATH pour les outils d'analyse
echo 'export PATH=/opt/klocwork/current/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Vérifier l'installation
kwinject --version
kwcheck --version
kwbuildproject --version

# Configuration client (connexion au serveur)
kwauth --url http://kw-server:8080
# Entrer utilisateur/mot de passe
\\\`\\\`\\\`

#### Installation du plugin IDE (VS Code / Eclipse)

\\\`\\\`\\\`bash
# Plugin Eclipse - installer depuis le marketplace
# Help > Eclipse Marketplace > Chercher "Klocwork"

# Plugin IntelliJ - installer depuis les préférences
# Settings > Plugins > Marketplace > "Klocwork"

# Configuration du plugin
# Server URL: http://kw-server:8080
# Project: nom_du_projet
\\\`\\\`\\\`

### Architecture et composants

\\\`\\\`\\\`
┌─────────────────────────────────────────────────────────────────┐
│                  Klocwork Architecture                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   ┌──────────────────────────────────────────────────────┐       │
│   │                Développeurs                           │       │
│   │  ┌─────────┐  ┌─────────┐  ┌─────────────────────┐ │       │
│   │  │  IDE +   │  │ kwcheck │  │  CI/CD Pipeline     │ │       │
│   │  │  Plugin  │  │ (local) │  │  (kwinject+kwbuild) │ │       │
│   │  └────┬─────┘  └────┬────┘  └──────────┬──────────┘ │       │
│   └───────┼──────────────┼──────────────────┼────────────┘       │
│           │              │                  │                     │
│           ▼              ▼                  ▼                     │
│   ┌──────────────────────────────────────────────────────┐       │
│   │              Klocwork Server                          │       │
│   │                                                       │       │
│   │  ┌──────────┐  ┌──────────────┐  ┌──────────────┐   │       │
│   │  │ Web UI   │  │  Analysis    │  │  Knowledge   │   │       │
│   │  │ (port    │  │  Engine      │  │  Base (KB)   │   │       │
│   │  │  8080)   │  │  (kwbuild)   │  │  (résultats) │   │       │
│   │  └──────────┘  └──────────────┘  └──────────────┘   │       │
│   │                                                       │       │
│   │  ┌──────────┐  ┌──────────────┐  ┌──────────────┐   │       │
│   │  │ Projects │  │  License     │  │  Database    │   │       │
│   │  │ Config   │  │  Manager     │  │  (PostgreSQL)│   │       │
│   │  └──────────┘  └──────────────┘  └──────────────┘   │       │
│   └──────────────────────────────────────────────────────┘       │
│                                                                   │
│   Flux d'analyse :                                                │
│   Source → kwinject (capture build) → kwbuildproject (analyse)    │
│         → kwadmin load (charger résultats) → Web UI (consulter)  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
\\\`\\\`\\\`

### Commandes essentielles

#### kwinject - Capture de la compilation

\\\`\\\`\\\`bash
# kwinject intercepte les commandes de compilation pour savoir
# quels fichiers compiler et avec quelles options

# Avec Make
kwinject make -j4
# Génère kwinject.out (build specification)

# Avec CMake
kwinject cmake --build build/
kwinject make -C build/

# Avec gcc directement
kwinject gcc -c -o main.o main.c -I/usr/include

# Personnaliser le fichier de sortie
kwinject --output /path/to/buildspec.out make all

# Mode trace (verbose)
kwinject --trace-in make all

# Pour les projets Java (Maven)
kwinject mvn compile

# Pour les projets Java (Gradle)
kwinject gradle build

# Vérifier le buildspec généré
cat kwinject.out | head -20
\\\`\\\`\\\`

#### kwcheck - Analyse locale (desktop)

\\\`\\\`\\\`bash
# Analyse locale rapide (sans serveur)
kwcheck create --url http://kw-server:8080/project_name

# Lancer l'analyse locale sur les fichiers modifiés
kwcheck run

# Analyser un fichier spécifique
kwcheck run -f src/main.c

# Analyser avec un buildspec existant
kwcheck run --build-spec kwinject.out

# Lister les issues trouvées
kwcheck list
kwcheck list --severity 1,2   # Seulement critical et error
kwcheck list --status Analyze  # Seulement les nouvelles

# Détails d'une issue
kwcheck info --id 42

# Format de sortie
kwcheck list --report /tmp/report.xml --format xml
kwcheck list --format json > issues.json

# Filtrer par checker
kwcheck list --checker BUFFER_OVERFLOW
kwcheck list --checker "MISRA.*"

# Marquer un faux positif localement
kwcheck set-status --id 42 --status "Not a Problem" --comment "Faux positif vérifié"
\\\`\\\`\\\`

#### kwbuildproject - Analyse serveur complète

\\\`\\\`\\\`bash
# Créer un projet sur le serveur
kwadmin create-project project_alpha \\
  --url http://kw-server:8080

# Lancer l'analyse complète
kwbuildproject --url http://kw-server:8080/project_alpha \\
  --tables-directory /tmp/kw_tables \\
  kwinject.out

# Charger les résultats sur le serveur
kwadmin load project_alpha \\
  --url http://kw-server:8080 \\
  --tables-directory /tmp/kw_tables

# Analyse incrémentale (seulement les fichiers modifiés)
kwbuildproject --url http://kw-server:8080/project_alpha \\
  --tables-directory /tmp/kw_tables \\
  --incremental \\
  kwinject.out

# Options avancées
kwbuildproject --url http://kw-server:8080/project_alpha \\
  --tables-directory /tmp/kw_tables \\
  --jobs-num 8 \\
  --license-wait \\
  --force \\
  kwinject.out

# Vérifier les résultats via API
curl -s "http://kw-server:8080/review/api/projects/project_alpha/issues?action=search" \\
  -H "Authorization: Bearer \$TOKEN" | python3 -m json.tool
\\\`\\\`\\\`

#### kwadmin - Administration

\\\`\\\`\\\`bash
# Lister les projets
kwadmin list-projects --url http://kw-server:8080

# Créer un projet
kwadmin create-project nouveau_projet --url http://kw-server:8080

# Supprimer un projet
kwadmin delete-project ancien_projet --url http://kw-server:8080

# Exporter les résultats
kwadmin export-issues project_alpha \\
  --url http://kw-server:8080 \\
  --output issues_export.xml

# Importer une configuration de checkers
kwadmin import-config project_alpha \\
  --url http://kw-server:8080 \\
  --file /path/to/checkers.conf

# Gestion des utilisateurs
kwadmin create-user --name jean --url http://kw-server:8080
kwadmin set-role --user jean --role reviewer --project project_alpha \\
  --url http://kw-server:8080

# Backup de la base de données
kwadmin backup --url http://kw-server:8080 --output /backup/kw_backup.tar.gz
\\\`\\\`\\\`

### Configuration

#### Configuration des checkers (taxonomie)

\\\`\\\`\\\`bash
# Voir les checkers disponibles
kwcheck list-checkers

# Configuration par fichier .kwlp (Klocwork Local Project)
# .kwlp/workingcache/tables/analysis_profile.pconf
# Ou via la ligne de commande :

# Activer un checker
kwcheck enable-checker BUFFER_OVERFLOW.TAINTED
kwcheck enable-checker "MISRA.C.*"

# Désactiver un checker
kwcheck disable-checker CWARN.NOEFFECT

# Configurer la sévérité
kwcheck set-checker-severity BUFFER_OVERFLOW --severity 1

# Fichier de configuration des checkers (.conf)
cat > checkers.conf << EOF
+BUFFER_OVERFLOW
+NULL_POINTER
+UNINIT_VAR
+RESOURCE_LEAK
+MISRA.C.2012.*
-CWARN.CONSTCOND
-CWARN.NOEFFECT
EOF

kwcheck import-config checkers.conf
\\\`\\\`\\\`

#### Configuration Knowledge Base

\\\`\\\`\\\`bash
# La Knowledge Base (KB) stocke les décisions sur les issues :
# - Confirmed : vrai défaut à corriger
# - Not a Problem : faux positif
# - Fix in Next Release : accepté temporairement
# - Fix in Later Release : dette technique

# Synchroniser la KB locale avec le serveur
kwcheck sync --url http://kw-server:8080/project_alpha

# Exporter les statuts de la KB
kwcheck export-status --output kb_export.json
\\\`\\\`\\\`

### Bonnes pratiques

1. **kwinject à chaque build CI** : capturez le buildspec à jour
2. **Analyse incrémentale** en CI pour la rapidité, complète le week-end
3. **Intégration IDE** : activez kwcheck pour les développeurs (shift-left)
4. **Quality Gate** : bloquez les merges si des issues Critical/Error sont trouvées
5. **Traitez les faux positifs** : marquez-les dans la KB plutôt que les ignorer
6. **Standards adaptés** : activez MISRA pour l'embarqué, CERT pour la sécurité
7. **Revue régulière** : réunion hebdomadaire pour traiter les nouvelles issues
8. **Trending** : suivez l'évolution du nombre d'issues dans le temps
9. **Formation** : formez les développeurs aux patterns de défauts courants
10. **Annotations** : utilisez les annotations Klocwork dans le code pour guider l'analyse`,

      practiceContent: `## Travaux Pratiques - Introduction à Klocwork

### TP 1 : Installation et premier scan

\\\`\\\`\\\`bash
# 1. Vérifier l'installation
kwinject --version
kwcheck --version

# 2. Créer un projet de test avec des bugs intentionnels
mkdir -p /workspace/kw_tp/src
cat > /workspace/kw_tp/src/buggy.c << 'EOF'
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Bug 1: Buffer overflow
void buffer_overflow() {
    char buf[10];
    strcpy(buf, "This string is way too long for the buffer");
    printf("%s\\n", buf);
}

// Bug 2: Null pointer dereference
void null_deref(int *ptr) {
    printf("Value: %d\\n", *ptr);  // ptr could be NULL
}

// Bug 3: Memory leak
void memory_leak() {
    char *data = malloc(100);
    strcpy(data, "leaked memory");
    // Missing free(data)
}

// Bug 4: Uninitialized variable
void uninit_var() {
    int x;
    printf("Value: %d\\n", x);
}

int main() {
    buffer_overflow();
    null_deref(NULL);
    memory_leak();
    uninit_var();
    return 0;
}
EOF

# 3. Compiler et capturer le build
cd /workspace/kw_tp
cat > Makefile << 'EOF'
CC=gcc
CFLAGS=-Wall -g
all: buggy
buggy: src/buggy.c
	$(CC) $(CFLAGS) -o buggy src/buggy.c
clean:
	rm -f buggy
EOF

kwinject make all
ls -la kwinject.out
\\\`\\\`\\\`

### TP 2 : Analyse locale avec kwcheck

\\\`\\\`\\\`bash
# 1. Créer un projet local
cd /workspace/kw_tp
kwcheck create --url http://kw-server:8080/tp_project \\
  --build-spec kwinject.out

# 2. Lancer l'analyse
kwcheck run

# 3. Lister les résultats
echo "=== Issues trouvées ==="
kwcheck list

# 4. Filtrer par sévérité
echo "=== Issues critiques ==="
kwcheck list --severity 1

echo "=== Issues error ==="
kwcheck list --severity 1,2

# 5. Détails d'un issue spécifique
kwcheck info --id 1

# 6. Export en JSON
kwcheck list --format json > /workspace/kw_tp/results.json
cat /workspace/kw_tp/results.json | python3 -m json.tool
\\\`\\\`\\\`

### TP 3 : Analyse serveur et Knowledge Base

\\\`\\\`\\\`bash
# 1. Créer le projet sur le serveur
kwadmin create-project tp_project --url http://kw-server:8080

# 2. Lancer l'analyse serveur
kwbuildproject --url http://kw-server:8080/tp_project \\
  --tables-directory /tmp/kw_tp_tables \\
  kwinject.out

# 3. Charger les résultats
kwadmin load tp_project \\
  --url http://kw-server:8080 \\
  --tables-directory /tmp/kw_tp_tables

# 4. Consulter via l'API
curl -s "http://kw-server:8080/review/api/projects/tp_project/issues?action=search" | python3 -m json.tool

# 5. Gérer un faux positif via la KB
kwcheck set-status --id 3 \\
  --status "Not a Problem" \\
  --comment "Mémoire libérée par le processus à la sortie"

# 6. Synchroniser avec le serveur
kwcheck sync --url http://kw-server:8080/tp_project
\\\`\\\`\\\`

### TP 4 : Correction et re-analyse

\\\`\\\`\\\`bash
# 1. Corriger les bugs
cat > /workspace/kw_tp/src/fixed.c << 'EOF'
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Fix 1: Buffer overflow corrigé
void safe_copy() {
    char buf[50];
    strncpy(buf, "Safe string", sizeof(buf) - 1);
    buf[sizeof(buf) - 1] = '\\0';
    printf("%s\\n", buf);
}

// Fix 2: Null check
void safe_deref(int *ptr) {
    if (ptr != NULL) {
        printf("Value: %d\\n", *ptr);
    }
}

// Fix 3: Memory freed
void no_leak() {
    char *data = malloc(100);
    if (data) {
        strcpy(data, "no leak");
        printf("%s\\n", data);
        free(data);
    }
}

// Fix 4: Variable initialized
void init_var() {
    int x = 0;
    printf("Value: %d\\n", x);
}

int main() {
    int val = 42;
    safe_copy();
    safe_deref(&val);
    no_leak();
    init_var();
    return 0;
}
EOF

# 2. Re-compiler et re-analyser
kwinject make all
kwcheck run

# 3. Vérifier que les issues sont résolues
kwcheck list
echo "Issues restantes: $(kwcheck list 2>/dev/null | wc -l)"
\\\`\\\`\\\`

### TP 5 : Configuration des checkers

\\\`\\\`\\\`bash
# 1. Lister les checkers disponibles
kwcheck list-checkers | head -30

# 2. Activer les checkers MISRA
kwcheck enable-checker "MISRA.C.2012.*"

# 3. Re-analyser avec MISRA
kwcheck run
kwcheck list --checker "MISRA.*"

# 4. Créer un profil personnalisé
cat > /workspace/kw_tp/custom_checkers.conf << EOF
# Checkers critiques activés
+BUFFER_OVERFLOW
+NULL_POINTER
+UNINIT_VAR
+RESOURCE_LEAK
+SECURITY.*
# Warnings désactivés
-CWARN.NOEFFECT
-CWARN.CONSTCOND
EOF

kwcheck import-config /workspace/kw_tp/custom_checkers.conf
kwcheck run
kwcheck list
\\\`\\\`\\\``,

      keyPoints: JSON.stringify([
        'Klocwork : analyse statique SAST pour C, C++, Java, C# (détection bugs et vulnérabilités)',
        'Flux : kwinject (capture build) → kwbuildproject (analyse) → kwadmin load (résultats serveur)',
        'kwcheck : analyse locale rapide pour les développeurs (shift-left testing)',
        'Knowledge Base : base centralisée pour gérer statuts des issues (confirmed, not a problem)',
        'Détecte : buffer overflow, null pointer, memory leak, race condition, injection SQL',
        'Standards supportés : MISRA C/C++, CERT, CWE, OWASP, AUTOSAR',
        'Analyse incrémentale en CI pour performance, complète périodiquement',
        'Quality Gate : bloquer le merge si issues Critical/Error détectées'
      ]) },


    { id: 'kw-02', courseId: 'klocwork', title: 'Configuration et checkers', duration: '4h', orderIndex: 2,
      theoryContent: `## Configuration Avancée et Checkers Klocwork

### Présentation

La puissance de Klocwork réside dans sa capacité à être finement configuré pour chaque projet. Les **checkers** (analyseurs) sont les règles que Klocwork applique au code. Chaque checker détecte un type spécifique de défaut. La configuration des checkers permet d'adapter l'analyse au contexte du projet : embarqué (MISRA), sécurité (CERT/CWE), ou qualité générale.

**Familles de checkers :**

| Famille | Description | Cible |
|---------|-------------|-------|
| MISRA C 2012 | Motor Industry Software Reliability Association | Embarqué automobile/aéro |
| MISRA C++ 2008 | Version C++ du standard MISRA | C++ embarqué |
| CERT C/C++ | Carnegie Mellon SEI coding standards | Sécurité logicielle |
| CWE | Common Weakness Enumeration | Vulnérabilités connues |
| OWASP | Open Web Application Security Project | Applications web |
| AUTOSAR C++14 | Automotive Open System Architecture | Auto C++ |
| Klocwork Native | Checkers propriétaires Klocwork | Qualité générale |

### Installation sur Linux (Ubuntu/Debian)

#### Configuration des profils de checkers

\\\`\\\`\\\`bash
# Lister tous les checkers disponibles par catégorie
kwcheck list-checkers --category security
kwcheck list-checkers --category reliability
kwcheck list-checkers --category "MISRA C 2012"
kwcheck list-checkers --category "CERT C"

# Compter les checkers par famille
echo "=== Checkers disponibles ==="
kwcheck list-checkers | grep -c "MISRA"
kwcheck list-checkers | grep -c "CERT"
kwcheck list-checkers | grep -c "CWE"
kwcheck list-checkers | grep -c "AUTOSAR"

# Créer un profil de base
kwcheck create --url http://kw-server:8080/project_name
\\\`\\\`\\\`

#### Installation des packs de standards

\\\`\\\`\\\`bash
# Les standards MISRA/CERT nécessitent une licence spécifique
# Vérifier les licences disponibles
kwlm -status

# Activer le pack MISRA
kwadmin set-project-property project_name \\
  --url http://kw-server:8080 \\
  --name "misra.enabled" --value "true"

# Activer le pack CERT
kwadmin set-project-property project_name \\
  --url http://kw-server:8080 \\
  --name "cert.enabled" --value "true"
\\\`\\\`\\\`

### Architecture et composants

\\\`\\\`\\\`
┌─────────────────────────────────────────────────────────────────┐
│              Configuration Klocwork - Architecture                │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │                 Profil d'analyse                          │    │
│  │                                                           │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │    │
│  │  │ MISRA C  │  │ CERT C   │  │   CWE    │  │ Custom │  │    │
│  │  │ Checkers │  │ Checkers │  │ Checkers │  │Checkers│  │    │
│  │  │ (193)    │  │ (120)    │  │ (85)     │  │(user)  │  │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └────────┘  │    │
│  │                                                           │    │
│  │  Configuration: .kwlp / analysis_profile.pconf           │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │              Annotations dans le code                     │    │
│  │                                                           │    │
│  │  /* @klocwork SUPPRESS BUFFER_OVERFLOW : justification */ │    │
│  │  /* @klocwork ALLOW NULL_POINTER : validated upstream */  │    │
│  │                                                           │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │              Fichiers de configuration                    │    │
│  │                                                           │    │
│  │  .kwlp/              Projet local kwcheck                 │    │
│  │  ├── workingcache/   Cache d'analyse                      │    │
│  │  ├── tables/         Tables de résultats                  │    │
│  │  └── .kwps           Settings du projet                   │    │
│  │                                                           │    │
│  │  analysis_profile.pconf    Profil de checkers             │    │
│  │  klocwork.conf             Configuration globale          │    │
│  │  custom_checkers.conf      Checkers personnalisés         │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
\\\`\\\`\\\`

### Commandes essentielles

#### Configuration MISRA C 2012

\\\`\\\`\\\`bash
# Activer tous les checkers MISRA C 2012 obligatoires (Required)
kwcheck enable-checker "MISRA.C.2012.RULE.*"
kwcheck enable-checker "MISRA.C.2012.DIR.*"

# Activer seulement les règles Required et Mandatory
cat > misra_required.conf << 'EOF'
# MISRA C:2012 - Required Rules
+MISRA.C.2012.RULE.1.3
+MISRA.C.2012.RULE.2.1
+MISRA.C.2012.RULE.2.2
+MISRA.C.2012.RULE.3.1
+MISRA.C.2012.RULE.3.2
+MISRA.C.2012.RULE.4.1
+MISRA.C.2012.RULE.4.2
+MISRA.C.2012.RULE.5.1
+MISRA.C.2012.RULE.5.2
+MISRA.C.2012.RULE.5.3
+MISRA.C.2012.RULE.5.4
+MISRA.C.2012.RULE.5.5
+MISRA.C.2012.RULE.8.1
+MISRA.C.2012.RULE.8.2
+MISRA.C.2012.RULE.8.4
+MISRA.C.2012.RULE.8.5
+MISRA.C.2012.RULE.8.6
+MISRA.C.2012.RULE.8.8
+MISRA.C.2012.RULE.8.10
+MISRA.C.2012.RULE.8.14
+MISRA.C.2012.RULE.9.1
+MISRA.C.2012.RULE.10.1
+MISRA.C.2012.RULE.10.2
+MISRA.C.2012.RULE.10.3
+MISRA.C.2012.RULE.10.4
+MISRA.C.2012.RULE.10.6
+MISRA.C.2012.RULE.10.7
+MISRA.C.2012.RULE.10.8
+MISRA.C.2012.RULE.11.1
+MISRA.C.2012.RULE.11.2
+MISRA.C.2012.RULE.11.3
+MISRA.C.2012.RULE.11.6
+MISRA.C.2012.RULE.11.7
+MISRA.C.2012.RULE.11.8
+MISRA.C.2012.RULE.11.9
+MISRA.C.2012.RULE.12.1
+MISRA.C.2012.RULE.12.2
+MISRA.C.2012.RULE.13.1
+MISRA.C.2012.RULE.13.2
+MISRA.C.2012.RULE.13.5
+MISRA.C.2012.RULE.13.6
+MISRA.C.2012.RULE.14.1
+MISRA.C.2012.RULE.14.4
+MISRA.C.2012.RULE.15.6
+MISRA.C.2012.RULE.15.7
+MISRA.C.2012.RULE.16.1
+MISRA.C.2012.RULE.16.2
+MISRA.C.2012.RULE.16.3
+MISRA.C.2012.RULE.16.4
+MISRA.C.2012.RULE.16.5
+MISRA.C.2012.RULE.16.6
+MISRA.C.2012.RULE.16.7
+MISRA.C.2012.RULE.17.1
+MISRA.C.2012.RULE.17.2
+MISRA.C.2012.RULE.17.3
+MISRA.C.2012.RULE.17.4
+MISRA.C.2012.RULE.17.6
+MISRA.C.2012.RULE.17.7
+MISRA.C.2012.RULE.18.1
+MISRA.C.2012.RULE.18.2
+MISRA.C.2012.RULE.18.3
+MISRA.C.2012.RULE.18.6
+MISRA.C.2012.RULE.19.1
+MISRA.C.2012.RULE.20.1
+MISRA.C.2012.RULE.20.2
+MISRA.C.2012.RULE.20.4
+MISRA.C.2012.RULE.20.7
+MISRA.C.2012.RULE.20.11
+MISRA.C.2012.RULE.20.13
+MISRA.C.2012.RULE.20.14
+MISRA.C.2012.RULE.21.1
+MISRA.C.2012.RULE.21.2
+MISRA.C.2012.RULE.21.3
+MISRA.C.2012.RULE.21.4
+MISRA.C.2012.RULE.21.5
+MISRA.C.2012.RULE.21.6
+MISRA.C.2012.RULE.21.7
+MISRA.C.2012.RULE.21.8
+MISRA.C.2012.RULE.21.9
+MISRA.C.2012.RULE.21.10
+MISRA.C.2012.RULE.21.11
+MISRA.C.2012.RULE.22.1
+MISRA.C.2012.RULE.22.2
+MISRA.C.2012.RULE.22.3
+MISRA.C.2012.RULE.22.4
+MISRA.C.2012.RULE.22.5
+MISRA.C.2012.RULE.22.6
EOF

kwcheck import-config misra_required.conf
\\\`\\\`\\\`

#### Configuration CERT C

\\\`\\\`\\\`bash
# Activer les checkers CERT C
kwcheck enable-checker "CERT.C.*"

# Checkers CERT les plus importants
cat > cert_critical.conf << 'EOF'
# CERT C - Règles critiques
+CERT.C.ARR.BOUNDS        # Array bounds
+CERT.C.CON.RACE          # Race condition
+CERT.C.ENV.TAINTED       # Tainted data
+CERT.C.ERR.NOCHECK       # Error not checked
+CERT.C.EXP.UNINIT        # Uninitialized expression
+CERT.C.FIO.NOCLOSE       # File not closed
+CERT.C.MEM.LEAK          # Memory leak
+CERT.C.MEM.DOUBLEFREE    # Double free
+CERT.C.MEM.USEAFTER      # Use after free
+CERT.C.STR.OVERFLOW      # String overflow
+CERT.C.INT.OVERFLOW      # Integer overflow
+CERT.C.SIG.HANDLER       # Signal handler issues
+CERT.C.POS.THREAD        # POSIX thread issues
EOF

kwcheck import-config cert_critical.conf
\\\`\\\`\\\`

#### Configuration CWE

\\\`\\\`\\\`bash
# Activer les checkers CWE (Common Weakness Enumeration)
kwcheck enable-checker "CWE.*"

# CWE Top 25 Most Dangerous Software Weaknesses
cat > cwe_top25.conf << 'EOF'
# CWE Top 25 (2023)
+CWE.787    # Out-of-bounds Write
+CWE.79     # Cross-site Scripting (XSS)
+CWE.89     # SQL Injection
+CWE.416    # Use After Free
+CWE.78     # OS Command Injection
+CWE.20     # Improper Input Validation
+CWE.125    # Out-of-bounds Read
+CWE.22     # Path Traversal
+CWE.352    # Cross-Site Request Forgery
+CWE.434    # Unrestricted Upload
+CWE.862    # Missing Authorization
+CWE.476    # NULL Pointer Dereference
+CWE.287    # Improper Authentication
+CWE.190    # Integer Overflow
+CWE.502    # Deserialization of Untrusted Data
+CWE.77     # Command Injection
+CWE.119    # Buffer Overflow
+CWE.798    # Hard-coded Credentials
+CWE.918    # SSRF
+CWE.306    # Missing Authentication
+CWE.362    # Race Condition
+CWE.269    # Improper Privilege Management
+CWE.94     # Code Injection
+CWE.863    # Incorrect Authorization
+CWE.276    # Incorrect Default Permissions
EOF

kwcheck import-config cwe_top25.conf
\\\`\\\`\\\`

#### Annotations dans le code

\\\`\\\`\\\`bash
# Supprimer un avertissement spécifique (inline)
// Klocwork annotation pour supprimer un checker sur une ligne
/* parasoft-suppress MISRA.C.2012.RULE.11.3 "Justified: hardware register access" */

# Annotations Klocwork natives
void example_function(void) {
    // kwlp: suppress=UNINIT_VAR : "Variable initialized in called function"
    int x;
    init_from_hw(&x);
    use(x);
}

# Annotation de fichier complet
/* kwlp: file-suppress=MISRA.C.2012.RULE.20.1 : "Third-party header" */

# Annotation de fonction
/* kwlp: function-suppress=NULL_POINTER : "Validated in caller" */
void process(char *buf) {
    strlen(buf);  // pas de warning null pointer
}

# Annotations via fichier .kwsuppression
cat > .kwsuppression << 'EOF'
# Suppressions globales projet
file:vendor/*.c suppress=ALL : "Third-party code"
file:generated/*.c suppress=ALL : "Auto-generated code"
function:legacy_init suppress=UNINIT_VAR : "Legacy code accepted"
EOF
\\\`\\\`\\\`

#### Fichiers .kwlp (projet local)

\\\`\\\`\\\`bash
# Structure du projet local kwcheck
.kwlp/
├── .kwps                    # Project settings
├── workingcache/
│   ├── tables/
│   │   ├── analysis_profile.pconf  # Profil de checkers
│   │   └── build.conf              # Configuration build
│   └── cache/              # Cache d'analyse incrémentale
└── .kwlocal                # Settings locaux

# Créer un projet avec configuration personnalisée
kwcheck create \\
  --url http://kw-server:8080/mon_projet \\
  --build-spec kwinject.out \\
  --checkers-config misra_required.conf

# Partager la configuration (versionner dans Git)
cp .kwlp/.kwps projet_kwcheck_config.kwps
git add projet_kwcheck_config.kwps
\\\`\\\`\\\`

### Configuration

#### Configuration serveur (projets et modules)

\\\`\\\`\\\`bash
# Configurer les modules d'un projet (analyse par composant)
kwadmin set-project-property project_alpha \\
  --url http://kw-server:8080 \\
  --name "module.src" --value "src/**"

kwadmin set-project-property project_alpha \\
  --url http://kw-server:8080 \\
  --name "module.lib" --value "lib/**"

# Configurer les seuils de qualité
kwadmin set-project-property project_alpha \\
  --url http://kw-server:8080 \\
  --name "quality.critical.max" --value "0"

kwadmin set-project-property project_alpha \\
  --url http://kw-server:8080 \\
  --name "quality.error.max" --value "10"
\\\`\\\`\\\`

### Bonnes pratiques

1. **Commencez avec les checkers natifs** puis ajoutez MISRA/CERT progressivement
2. **Ne désactivez jamais les checkers Critical** sans justification documentée
3. **Annotations dans le code** plutôt que suppressions globales (traçabilité)
4. **Revue des faux positifs** : assignez un responsable pour chaque module
5. **Profils par équipe** : embarqué = MISRA complet, backend = CERT + CWE
6. **Mise à jour régulière** des profils quand de nouveaux checkers sont disponibles
7. **Documentation des suppressions** : chaque annotation doit avoir une justification
8. **Métriques** : suivez le ratio issues/KLOC par module et par release
9. **Formation continue** : les checkers évoluent, formez les équipes
10. **Intégration CI/CD** : profil strict en CI, profil complet pour l'audit périodique`,

      practiceContent: `## Travaux Pratiques - Configuration et Checkers

### TP 1 : Profil MISRA C pour projet embarqué

\\\`\\\`\\\`bash
# 1. Créer un projet embarqué de test
mkdir -p /workspace/kw_embedded/src
cat > /workspace/kw_embedded/src/embedded.c << 'EOF'
#include <stdint.h>

// Violations MISRA intentionnelles pour le TP
int32_t global_var;  // MISRA Rule 8.4 - missing extern

void func_no_return_type()  // MISRA Rule 8.1
{
    int x = 1;
    if(x = 2) {  // MISRA Rule 13.4 - assignment in condition
        global_var = x;
    }
    
    goto end;  // MISRA Rule 15.1 - goto
end:
    return;
}

int main(void) {
    int arr[10];
    int i;
    for(i = 0; i < 10; i++) {
        arr[i] = i * 2;
    }
    func_no_return_type();
    return 0;
}
EOF

# 2. Compiler
cd /workspace/kw_embedded
cat > Makefile << 'EOF'
CC=gcc
CFLAGS=-std=c99 -Wall
all: embedded
embedded: src/embedded.c
	$(CC) $(CFLAGS) -o embedded src/embedded.c
EOF

kwinject make all

# 3. Créer le profil MISRA
cat > misra_profile.conf << 'EOF'
+MISRA.C.2012.RULE.*
+MISRA.C.2012.DIR.*
-CWARN.*
-CERT.*
EOF

# 4. Analyser avec MISRA
kwcheck create --build-spec kwinject.out
kwcheck import-config misra_profile.conf
kwcheck run

# 5. Lister les violations MISRA
kwcheck list --checker "MISRA.*"
\\\`\\\`\\\`

### TP 2 : Profil sécurité CERT/CWE

\\\`\\\`\\\`bash
# 1. Code avec vulnérabilités de sécurité
cat > /workspace/kw_embedded/src/security.c << 'EOF'
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// CWE-78: OS Command Injection
void execute_command(const char *user_input) {
    char cmd[256];
    sprintf(cmd, "ls %s", user_input);  // Tainted data!
    system(cmd);
}

// CWE-134: Format String
void log_message(const char *msg) {
    printf(msg);  // Format string vulnerability!
}

// CWE-190: Integer Overflow
int calculate(int a, int b) {
    return a * b;  // Potential overflow!
}

// CWE-798: Hard-coded Credentials
int authenticate(const char *password) {
    return strcmp(password, "admin123") == 0;
}

int main() {
    execute_command("/tmp");
    log_message("test");
    calculate(2147483647, 2);
    authenticate("test");
    return 0;
}
EOF

# 2. Configurer le profil sécurité
cat > security_profile.conf << 'EOF'
+CERT.C.*
+CWE.*
+SECURITY.*
+SV.TAINTED.*
+SV.SQL.*
+SV.XSS.*
EOF

# 3. Analyser
kwinject gcc -c -o security.o src/security.c
kwcheck import-config security_profile.conf
kwcheck run

# 4. Examiner les résultats sécurité
kwcheck list --severity 1,2
kwcheck list --checker "CWE.*"
kwcheck list --checker "SV.TAINTED.*"
\\\`\\\`\\\`

### TP 3 : Annotations et suppressions

\\\`\\\`\\\`bash
# 1. Ajouter des annotations justifiées
cat > /workspace/kw_embedded/src/annotated.c << 'EOF'
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

/* kwlp: file-suppress=MISRA.C.2012.RULE.21.6 : "printf needed for debug build" */

// kwlp: suppress=MISRA.C.2012.RULE.11.3 : "Hardware register access requires cast"
volatile uint32_t *get_hw_register(void) {
    return (volatile uint32_t *)0x40000000;
}

void safe_function(int *ptr) {
    // kwlp: suppress=NULL_POINTER : "Validated by calling contract"
    *ptr = 42;
}

int main(void) {
    volatile uint32_t *reg = get_hw_register();
    int val = 0;
    safe_function(&val);
    printf("Register: %u, Val: %d\\n", *reg, val);
    return 0;
}
EOF

# 2. Créer le fichier de suppressions globales
cat > /workspace/kw_embedded/.kwsuppression << 'EOF'
# Suppressions projet
file:vendor/**/* suppress=ALL : "Third-party code not maintained by us"
file:test/**/* suppress=MISRA.* : "Test code exempt from MISRA"
EOF

# 3. Re-analyser et vérifier que les suppressions fonctionnent
kwinject gcc -c -o annotated.o src/annotated.c
kwcheck run
kwcheck list
echo "Les issues supprimées ne devraient plus apparaître"
\\\`\\\`\\\`

### TP 4 : Rapport de conformité

\\\`\\\`\\\`bash
# 1. Générer un rapport de conformité MISRA
kwcheck run
kwcheck list --checker "MISRA.*" --format xml > misra_report.xml

# 2. Générer un rapport JSON pour intégration
kwcheck list --format json > full_report.json

# 3. Script de résumé
python3 << 'PYEOF'
import json
with open('full_report.json') as f:
    issues = json.load(f)

summary = {}
for issue in issues:
    checker = issue.get('checker', 'unknown')
    severity = issue.get('severity', 'unknown')
    key = f"{severity}-{checker}"
    summary[key] = summary.get(key, 0) + 1

print("=== Rapport de conformité ===")
for k, v in sorted(summary.items()):
    print(f"  {k}: {v} issues")
print(f"\\nTotal: {len(issues)} issues")
PYEOF
\\\`\\\`\\\`

### TP 5 : Profils multiples par contexte

\\\`\\\`\\\`bash
# 1. Profil pour code embarqué critique (DO-178C)
cat > profile_do178c.conf << 'EOF'
# DO-178C Level A - Maximum strictness
+MISRA.C.2012.RULE.*
+MISRA.C.2012.DIR.*
+CERT.C.*
+CWE.*
+UNINIT_VAR
+BUFFER_OVERFLOW
+NULL_POINTER
+RESOURCE_LEAK
EOF

# 2. Profil pour code applicatif serveur
cat > profile_server.conf << 'EOF'
# Server application - Focus security
+CERT.C.*
+CWE.*
+SV.TAINTED.*
+SV.SQL.*
+SV.XSS.*
+SECURITY.*
-MISRA.*
EOF

# 3. Profil pour tests unitaires
cat > profile_tests.conf << 'EOF'
# Test code - Minimal rules
+BUFFER_OVERFLOW
+NULL_POINTER
+RESOURCE_LEAK
-MISRA.*
-CERT.*
-CWARN.*
EOF

# 4. Appliquer selon le contexte
echo "=== Analyse embarqué ==="
kwcheck import-config profile_do178c.conf
kwcheck run -f src/embedded.c
kwcheck list | wc -l

echo "=== Analyse sécurité ==="
kwcheck import-config profile_server.conf
kwcheck run -f src/security.c
kwcheck list | wc -l
\\\`\\\`\\\``,

      keyPoints: JSON.stringify([
        'Familles de checkers : MISRA C/C++, CERT C/C++, CWE, OWASP, AUTOSAR, natifs Klocwork',
        'MISRA C 2012 : standard obligatoire pour l embarqué automobile et aéronautique',
        'CERT C : règles Carnegie Mellon pour la sécurité logicielle (buffer, memory, concurrency)',
        'CWE Top 25 : vulnérabilités les plus dangereuses (injection, overflow, XSS)',
        'Annotations dans le code (kwlp: suppress) pour documenter les faux positifs',
        'Fichier .kwsuppression pour les suppressions globales (vendor, generated code)',
        'Profils par contexte : embarqué strict (MISRA), serveur (CERT/CWE), tests (minimal)',
        'Configuration via .kwlp/ versionnable dans Git pour partager avec l équipe',
        'Fichiers .conf pour activer/désactiver les checkers (+CHECKER / -CHECKER)'
      ]) },


    { id: 'kw-03', courseId: 'klocwork', title: 'Intégration CI/CD', duration: '3h', orderIndex: 3,
      theoryContent: `## Intégration Klocwork dans CI/CD

### Présentation

L'intégration de Klocwork dans les pipelines CI/CD est essentielle pour automatiser la détection des défauts et maintenir la qualité du code en continu. L'objectif est d'**échouer le pipeline** (quality gate) lorsque des défauts critiques sont introduits, tout en minimisant le temps d'analyse grâce au mode incrémental.

**Modèles d'intégration :**

| Modèle | Quand | Durée | Couverture |
|--------|-------|-------|------------|
| Analyse diff (kwcheck) | À chaque commit/MR | 1-5 min | Fichiers modifiés |
| Analyse incrémentale (kwbuildproject --incremental) | Merge sur develop | 5-30 min | Module impacté |
| Analyse complète (kwbuildproject) | Nightly/Weekly | 30 min - 2h | Tout le projet |
| Audit de conformité | Release | Variable | Rapport complet |

### Installation sur Linux (Ubuntu/Debian)

#### Configuration de l'agent CI

\\\`\\\`\\\`bash
# Sur l'agent Jenkins/GitLab Runner
# 1. Installer les outils d'analyse Klocwork
sudo tar -xzf kw-analysis-2023.4-linux64.tar.gz -C /opt/klocwork

# 2. Ajouter au PATH système
echo 'export PATH=/opt/klocwork/current/bin:$PATH' >> /etc/profile.d/klocwork.sh
source /etc/profile.d/klocwork.sh

# 3. Configurer l'authentification non-interactive
kwauth --url http://kw-server:8080 --user ci_bot --password-file /etc/klocwork/ci_password

# 4. Vérifier la connectivité
kwcheck --version
curl -s http://kw-server:8080/review/api/version
\\\`\\\`\\\`

#### Configuration du serveur pour CI

\\\`\\\`\\\`bash
# Créer un utilisateur dédié CI
kwadmin create-user --name ci_bot \\
  --url http://kw-server:8080 \\
  --role build_engineer

# Configurer le token API
kwadmin create-token --user ci_bot \\
  --url http://kw-server:8080 \\
  --name "CI Token" \\
  --expiry 365d
# Sauvegarder le token généré

# Configurer les seuils de qualité
kwadmin set-project-property project_alpha \\
  --url http://kw-server:8080 \\
  --name "quality_gate.critical" --value "0"

kwadmin set-project-property project_alpha \\
  --url http://kw-server:8080 \\
  --name "quality_gate.error" --value "5"
\\\`\\\`\\\`

### Architecture et composants

\\\`\\\`\\\`
┌─────────────────────────────────────────────────────────────────┐
│            Klocwork CI/CD Integration Architecture                │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │                    Pipeline CI/CD                          │   │
│  │                                                            │   │
│  │  ┌────────┐  ┌─────────┐  ┌──────────┐  ┌────────────┐  │   │
│  │  │  Git   │  │  Build  │  │ Klocwork │  │  Quality   │  │   │
│  │  │  Clone │→ │  (make) │→ │ Analysis │→ │  Gate      │  │   │
│  │  └────────┘  └─────────┘  └──────────┘  └────────────┘  │   │
│  │                                │               │          │   │
│  │                                ▼               ▼          │   │
│  │                         ┌──────────┐    ┌──────────┐     │   │
│  │                         │ Upload   │    │ Pass/    │     │   │
│  │                         │ Results  │    │ Fail     │     │   │
│  │                         └────┬─────┘    └──────────┘     │   │
│  └──────────────────────────────┼────────────────────────────┘   │
│                                 │                                 │
│                                 ▼                                 │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │              Klocwork Server                               │   │
│  │  ┌──────────┐  ┌──────────────┐  ┌──────────────────┐    │   │
│  │  │Knowledge │  │   Trending   │  │   Dashboards     │    │   │
│  │  │  Base    │  │   & Metrics  │  │   & Reports      │    │   │
│  │  └──────────┘  └──────────────┘  └──────────────────┘    │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
\\\`\\\`\\\`

### Commandes essentielles

#### Pipeline Jenkins (Jenkinsfile)

\\\`\\\`\\\`groovy
// Jenkinsfile - Analyse Klocwork
pipeline {
    agent { label 'linux-klocwork' }
    
    environment {
        KW_SERVER = 'http://kw-server:8080'
        KW_PROJECT = 'project_alpha'
        KW_TABLES = "\${WORKSPACE}/kw_tables"
    }
    
    stages {
        stage('Build') {
            steps {
                sh 'kwinject make -j\$(nproc) all'
            }
        }
        
        stage('Klocwork Analysis') {
            steps {
                sh """
                    mkdir -p \${KW_TABLES}
                    kwbuildproject --url \${KW_SERVER}/\${KW_PROJECT} \\
                        --tables-directory \${KW_TABLES} \\
                        --incremental \\
                        --jobs-num \$(nproc) \\
                        kwinject.out
                """
            }
        }
        
        stage('Upload Results') {
            steps {
                sh """
                    kwadmin load \${KW_PROJECT} \\
                        --url \${KW_SERVER} \\
                        --tables-directory \${KW_TABLES}
                """
            }
        }
        
        stage('Quality Gate') {
            steps {
                script {
                    def issues = sh(
                        script: """
                            curl -s "\${KW_SERVER}/review/api/projects/\${KW_PROJECT}/issues?action=search&severity=1,2&status=Analyze" \\
                                -H "Authorization: Bearer \${KW_TOKEN}" | python3 -c "import json,sys; print(len(json.load(sys.stdin)))"
                        """,
                        returnStdout: true
                    ).trim().toInteger()
                    
                    if (issues > 0) {
                        error "Quality Gate FAILED: \${issues} critical/error issues found"
                    }
                    echo "Quality Gate PASSED: No critical issues"
                }
            }
        }
    }
    
    post {
        always {
            // Archiver le rapport
            sh 'kwcheck list --format xml > klocwork_report.xml || true'
            archiveArtifacts artifacts: 'klocwork_report.xml', allowEmptyArchive: true
        }
        failure {
            emailext(
                subject: "Klocwork: Issues détectées - \${env.JOB_NAME}",
                body: "Des issues critiques ont été détectées. Voir: \${KW_SERVER}",
                to: "\${env.CHANGE_AUTHOR_EMAIL}"
            )
        }
    }
}
\\\`\\\`\\\`

#### Pipeline GitLab CI (.gitlab-ci.yml)

\\\`\\\`\\\`yaml
# .gitlab-ci.yml - Intégration Klocwork
variables:
  KW_SERVER: "http://kw-server:8080"
  KW_PROJECT: "project_alpha"
  KW_TABLES: "$CI_PROJECT_DIR/kw_tables"

stages:
  - build
  - analyze
  - quality-gate
  - report

build:
  stage: build
  script:
    - kwinject make -j$(nproc) all
  artifacts:
    paths:
      - kwinject.out
    expire_in: 1 hour

klocwork-analysis:
  stage: analyze
  dependencies:
    - build
  script:
    - mkdir -p $KW_TABLES
    - |
      kwbuildproject --url $KW_SERVER/$KW_PROJECT \
        --tables-directory $KW_TABLES \
        --incremental \
        --jobs-num $(nproc) \
        kwinject.out
    - |
      kwadmin load $KW_PROJECT \
        --url $KW_SERVER \
        --tables-directory $KW_TABLES
  artifacts:
    paths:
      - $KW_TABLES
    expire_in: 1 day

quality-gate:
  stage: quality-gate
  dependencies:
    - klocwork-analysis
  script:
    - |
      CRITICAL=$(curl -s "$KW_SERVER/review/api/projects/$KW_PROJECT/issues?action=search&severity=1&status=Analyze" \
        -H "Authorization: Bearer $KW_TOKEN" | python3 -c "import json,sys; print(len(json.load(sys.stdin)))")
      ERROR=$(curl -s "$KW_SERVER/review/api/projects/$KW_PROJECT/issues?action=search&severity=2&status=Analyze" \
        -H "Authorization: Bearer $KW_TOKEN" | python3 -c "import json,sys; print(len(json.load(sys.stdin)))")
      
      echo "Critical issues: $CRITICAL"
      echo "Error issues: $ERROR"
      
      if [ "$CRITICAL" -gt 0 ]; then
        echo "QUALITY GATE FAILED: $CRITICAL critical issues"
        exit 1
      fi
      if [ "$ERROR" -gt 5 ]; then
        echo "QUALITY GATE FAILED: $ERROR error issues (max: 5)"
        exit 1
      fi
      echo "QUALITY GATE PASSED"
  rules:
    - if: $CI_MERGE_REQUEST_IID

klocwork-report:
  stage: report
  script:
    - kwcheck list --format json > klocwork_report.json
    - |
      python3 << 'EOF'
      import json
      with open('klocwork_report.json') as f:
          issues = json.load(f)
      print(f"Total issues: {len(issues)}")
      by_severity = {}
      for i in issues:
          s = i.get('severity', 'unknown')
          by_severity[s] = by_severity.get(s, 0) + 1
      for s, c in sorted(by_severity.items()):
          print(f"  Severity {s}: {c}")
      EOF
  artifacts:
    reports:
      codequality: klocwork_report.json
    paths:
      - klocwork_report.json
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
      when: always
\\\`\\\`\\\`

#### Analyse diff pour Merge Requests

\\\`\\\`\\\`bash
#!/bin/bash
# kw_diff_analysis.sh - Analyse uniquement les fichiers modifiés dans la MR

# Récupérer les fichiers modifiés
CHANGED_FILES=$(git diff --name-only origin/main...HEAD -- '*.c' '*.cpp' '*.h')

if [ -z "$CHANGED_FILES" ]; then
  echo "Pas de fichiers C/C++ modifiés"
  exit 0
fi

echo "Fichiers à analyser: $CHANGED_FILES"

# Analyse kwcheck sur les fichiers modifiés uniquement
kwcheck run $(echo $CHANGED_FILES | xargs -I{} echo "-f {}")

# Vérifier les résultats
ISSUES=$(kwcheck list --severity 1,2 2>/dev/null | wc -l)

if [ "$ISSUES" -gt 0 ]; then
  echo "❌ $ISSUES issues critiques/erreur trouvées:"
  kwcheck list --severity 1,2
  exit 1
else
  echo "✅ Aucune issue critique détectée"
  exit 0
fi
\\\`\\\`\\\`

#### Rapports et métriques

\\\`\\\`\\\`bash
# Générer un rapport de tendance (trending)
curl -s "$KW_SERVER/review/api/projects/$KW_PROJECT/metrics?action=trending&period=30d" \\
  -H "Authorization: Bearer $KW_TOKEN" > trending.json

# Script de rapport HTML
python3 << 'EOF'
import json
import datetime

with open('trending.json') as f:
    data = json.load(f)

html = """<html><head><title>Klocwork Report</title></head><body>
<h1>Rapport Klocwork - {date}</h1>
<table border="1">
<tr><th>Sévérité</th><th>Nouvelles</th><th>Résolues</th><th>Total</th></tr>
""".format(date=datetime.date.today())

for severity in ['Critical', 'Error', 'Warning']:
    s = data.get(severity, {})
    html += f"<tr><td>{severity}</td><td>{s.get('new', 0)}</td><td>{s.get('fixed', 0)}</td><td>{s.get('total', 0)}</td></tr>"

html += "</table></body></html>"

with open('kw_report.html', 'w') as f:
    f.write(html)
print("Report generated: kw_report.html")
EOF
\\\`\\\`\\\`

### Configuration

#### Configuration des notifications

\\\`\\\`\\\`bash
# Webhook pour Slack/Teams sur nouvelles issues critiques
cat > /opt/klocwork/hooks/notify_critical.sh << 'EOF'
#!/bin/bash
# Appelé par le serveur Klocwork quand une issue critique est créée
SLACK_WEBHOOK="https://hooks.slack.com/services/xxx/yyy/zzz"
PROJECT=$1
ISSUE_ID=$2
SEVERITY=$3

if [ "$SEVERITY" = "1" ]; then
  curl -X POST $SLACK_WEBHOOK -H 'Content-type: application/json' \
    -d "{\"text\":\"🚨 Klocwork: Issue critique #$ISSUE_ID dans $PROJECT\"}"
fi
EOF
chmod +x /opt/klocwork/hooks/notify_critical.sh

# Configuration email (serveur)
kwadmin set-server-property \\
  --url http://kw-server:8080 \\
  --name "email.smtp.host" --value "smtp.company.com"

kwadmin set-server-property \\
  --url http://kw-server:8080 \\
  --name "email.smtp.port" --value "587"
\\\`\\\`\\\`

### Bonnes pratiques

1. **Analyse diff en MR** : rapide (< 5 min), bloque les issues critiques
2. **Analyse complète nightly** : couverture totale, détecte les régressions
3. **Quality Gate stricts** : 0 Critical autorisé, max 5 Error en merge
4. **Token dédié CI** : ne pas utiliser un compte utilisateur pour le pipeline
5. **Cache les tables** : réutilisez --tables-directory entre builds incrémentaux
6. **Paralléliser** : utilisez --jobs-num pour accélérer l'analyse
7. **Rapports automatiques** : envoyez un résumé hebdomadaire aux tech leads
8. **Trending** : surveillez la courbe d'issues dans le temps (doit descendre)
9. **Intégration IDE** : les devs corrigent avant le CI (shift-left)
10. **Audit régulier** : revue mensuelle des faux positifs et de la KB`,

      practiceContent: `## Travaux Pratiques - Intégration CI/CD

### TP 1 : Pipeline Jenkins avec Klocwork

\\\`\\\`\\\`bash
# 1. Créer un Jenkinsfile avec analyse Klocwork
cat > Jenkinsfile << 'EOF'
pipeline {
    agent any
    environment {
        KW_SERVER = 'http://kw-server:8080'
        KW_PROJECT = 'tp_cicd'
    }
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Build + Capture') {
            steps { sh 'kwinject make all' }
        }
        stage('Analyze') {
            steps {
                sh '''
                    mkdir -p kw_tables
                    kwbuildproject --url $KW_SERVER/$KW_PROJECT \
                        --tables-directory kw_tables \
                        --incremental kwinject.out
                    kwadmin load $KW_PROJECT \
                        --url $KW_SERVER \
                        --tables-directory kw_tables
                '''
            }
        }
        stage('Gate') {
            steps {
                sh '''
                    ISSUES=$(kwcheck list --severity 1,2 | wc -l)
                    if [ "$ISSUES" -gt 0 ]; then
                        echo "FAIL: $ISSUES issues"
                        exit 1
                    fi
                '''
            }
        }
    }
}
EOF

# 2. Committer et pousser
git add Jenkinsfile
git commit -m "Add Klocwork CI pipeline"
git push origin feature/klocwork-ci
\\\`\\\`\\\`

### TP 2 : Pipeline GitLab CI

\\\`\\\`\\\`bash
# 1. Créer .gitlab-ci.yml
cat > .gitlab-ci.yml << 'EOF'
stages:
  - build
  - analyze
  - gate

variables:
  KW_SERVER: "http://kw-server:8080"
  KW_PROJECT: "tp_cicd"

build:
  stage: build
  script:
    - kwinject make all
  artifacts:
    paths: [kwinject.out]

analyze:
  stage: analyze
  script:
    - mkdir -p kw_tables
    - kwbuildproject --url $KW_SERVER/$KW_PROJECT --tables-directory kw_tables --incremental kwinject.out
    - kwadmin load $KW_PROJECT --url $KW_SERVER --tables-directory kw_tables
    - kwcheck list --format json > report.json
  artifacts:
    paths: [report.json]

quality-gate:
  stage: gate
  script:
    - |
      CRITICAL=$(cat report.json | python3 -c "import json,sys; d=json.load(sys.stdin); print(sum(1 for i in d if i.get('severity')==1))")
      if [ "$CRITICAL" -gt 0 ]; then
        echo "BLOCKED: $CRITICAL critical issues"
        exit 1
      fi
      echo "PASSED"
EOF

git add .gitlab-ci.yml
git commit -m "Add Klocwork GitLab CI pipeline"
\\\`\\\`\\\`

### TP 3 : Quality Gate personnalisé

\\\`\\\`\\\`bash
# 1. Script de quality gate avancé
cat > scripts/quality_gate.sh << 'EOF'
#!/bin/bash
set -e

KW_SERVER="\${KW_SERVER:-http://kw-server:8080}"
KW_PROJECT="\${KW_PROJECT:-project_alpha}"
MAX_CRITICAL=0
MAX_ERROR=5
MAX_WARNING=50

echo "=== Klocwork Quality Gate ==="
echo "Server: $KW_SERVER"
echo "Project: $KW_PROJECT"

# Récupérer les métriques
CRITICAL=$(curl -s "$KW_SERVER/review/api/projects/$KW_PROJECT/issues?action=search&severity=1&status=Analyze" \
  -H "Authorization: Bearer $KW_TOKEN" | python3 -c "import json,sys; print(len(json.load(sys.stdin)))")
ERROR=$(curl -s "$KW_SERVER/review/api/projects/$KW_PROJECT/issues?action=search&severity=2&status=Analyze" \
  -H "Authorization: Bearer $KW_TOKEN" | python3 -c "import json,sys; print(len(json.load(sys.stdin)))")
WARNING=$(curl -s "$KW_SERVER/review/api/projects/$KW_PROJECT/issues?action=search&severity=3&status=Analyze" \
  -H "Authorization: Bearer $KW_TOKEN" | python3 -c "import json,sys; print(len(json.load(sys.stdin)))")

echo ""
echo "Results:"
echo "  Critical: $CRITICAL (max: $MAX_CRITICAL)"
echo "  Error:    $ERROR (max: $MAX_ERROR)"
echo "  Warning:  $WARNING (max: $MAX_WARNING)"
echo ""

FAILED=0
if [ "$CRITICAL" -gt "$MAX_CRITICAL" ]; then
  echo "❌ CRITICAL threshold exceeded"
  FAILED=1
fi
if [ "$ERROR" -gt "$MAX_ERROR" ]; then
  echo "❌ ERROR threshold exceeded"
  FAILED=1
fi
if [ "$WARNING" -gt "$MAX_WARNING" ]; then
  echo "⚠️  WARNING threshold exceeded (non-blocking)"
fi

if [ "$FAILED" -eq 1 ]; then
  echo ""
  echo "🚫 QUALITY GATE: FAILED"
  exit 1
else
  echo ""
  echo "✅ QUALITY GATE: PASSED"
  exit 0
fi
EOF
chmod +x scripts/quality_gate.sh

# 2. Tester localement
export KW_SERVER="http://kw-server:8080"
export KW_PROJECT="tp_cicd"
export KW_TOKEN="your-token-here"
./scripts/quality_gate.sh
\\\`\\\`\\\`

### TP 4 : Rapport automatique

\\\`\\\`\\\`bash
# 1. Script de rapport pour Slack
cat > scripts/kw_slack_report.sh << 'EOF'
#!/bin/bash
KW_SERVER="\${KW_SERVER:-http://kw-server:8080}"
KW_PROJECT="\${KW_PROJECT:-project_alpha}"
SLACK_WEBHOOK="$SLACK_WEBHOOK_URL"

# Collecter les métriques
TOTAL=$(curl -s "$KW_SERVER/review/api/projects/$KW_PROJECT/issues?action=search" \
  -H "Authorization: Bearer $KW_TOKEN" | python3 -c "import json,sys; print(len(json.load(sys.stdin)))")
NEW=$(curl -s "$KW_SERVER/review/api/projects/$KW_PROJECT/issues?action=search&status=Analyze" \
  -H "Authorization: Bearer $KW_TOKEN" | python3 -c "import json,sys; print(len(json.load(sys.stdin)))")

# Envoyer à Slack
curl -X POST "$SLACK_WEBHOOK" -H 'Content-type: application/json' -d "{
  \"blocks\": [
    {\"type\": \"header\", \"text\": {\"type\": \"plain_text\", \"text\": \"📊 Rapport Klocwork - $KW_PROJECT\"}},
    {\"type\": \"section\", \"text\": {\"type\": \"mrkdwn\", \"text\": \"*Total issues:* $TOTAL\\n*Nouvelles (à analyser):* $NEW\"}},
    {\"type\": \"section\", \"text\": {\"type\": \"mrkdwn\", \"text\": \"<$KW_SERVER|Voir le dashboard>\"}}
  ]
}"
echo "Rapport envoyé à Slack"
EOF
chmod +x scripts/kw_slack_report.sh
\\\`\\\`\\\`

### TP 5 : Intégration complète multi-projets

\\\`\\\`\\\`bash
# 1. Script d'analyse multi-projets (monorepo)
cat > scripts/kw_multi_analyze.sh << 'EOF'
#!/bin/bash
set -e

PROJECTS=("module_core" "module_network" "module_ui")
KW_SERVER="http://kw-server:8080"

for project in "\${PROJECTS[@]}"; do
  echo "=== Analyzing: $project ==="
  cd $project
  
  # Build et capture
  kwinject make all
  
  # Analyse
  mkdir -p /tmp/kw_tables_$project
  kwbuildproject --url $KW_SERVER/$project \
    --tables-directory /tmp/kw_tables_$project \
    --incremental kwinject.out
  
  # Upload
  kwadmin load $project --url $KW_SERVER \
    --tables-directory /tmp/kw_tables_$project
  
  cd ..
done

echo "=== All projects analyzed ==="
\\\`\\\`\\\``,

      keyPoints: JSON.stringify([
        'Modèles CI : analyse diff (MR, rapide), incrémentale (develop), complète (nightly)',
        'Jenkins : plugin Klocwork ou Jenkinsfile avec kwinject/kwbuildproject/kwadmin',
        'GitLab CI : stages build → analyze → quality-gate avec artifacts',
        'Quality Gate : 0 Critical, max N Error pour bloquer le pipeline',
        'Token CI dédié : authentification non-interactive pour les pipelines',
        'Analyse diff en MR : kwcheck run sur les fichiers modifiés uniquement (rapide)',
        'Rapports : JSON/XML exportables, intégration Slack/Teams/email',
        'Trending : surveiller l évolution du nombre d issues dans le temps',
        'Cache tables-directory entre builds incrémentaux pour performance'
      ]) },


    // ==================== JENKINS ====================
    { id: 'jen-01', courseId: 'jenkins', title: 'Introduction à Jenkins', duration: '4h', orderIndex: 1,
      theoryContent: `## Introduction à Jenkins

### Présentation

**Jenkins** est le serveur d'automatisation open source le plus utilisé au monde pour le CI/CD (Continuous Integration / Continuous Delivery). Écrit en Java, il permet d'automatiser toutes les étapes du cycle de développement : compilation, tests, analyse de code, déploiement et monitoring.

**Pourquoi Jenkins ?**

- **Open Source** : gratuit, communauté massive (1700+ plugins)
- **Extensible** : plugins pour presque tous les outils DevOps
- **Pipeline as Code** : Jenkinsfiles versionnés dans Git
- **Distribué** : architecture maître/agents pour la scalabilité
- **Polyglotte** : supporte tous les langages et frameworks
- **Écosystème** : intégration native avec Docker, Kubernetes, cloud

**Historique :** Jenkins est né en 2011 comme fork de Hudson (Oracle). Créé par Kohsuke Kawaguchi, il est maintenu par la Jenkins community sous la Linux Foundation (CD Foundation).

**Concepts clés :**

| Concept | Description |
|---------|-------------|
| Job | Unité de travail configurable (build, test, deploy) |
| Pipeline | Workflow multi-étapes défini en code (Jenkinsfile) |
| Agent/Node | Machine exécutant les builds (master ou workers) |
| Executor | Thread d'exécution sur un agent |
| Workspace | Répertoire de travail du build |
| Plugin | Extension ajoutant des fonctionnalités |
| Credentials | Secrets gérés de manière sécurisée |

### Installation sur Linux (Ubuntu/Debian)

#### Installation via Docker (Recommandée)

\\\`\\\`\\\`bash
# Créer le réseau Docker pour Jenkins
docker network create jenkins

# Lancer Jenkins avec Docker-in-Docker (DinD)
docker run -d --name jenkins \\
  --network jenkins \\
  -p 8080:8080 -p 50000:50000 \\
  -v jenkins_home:/var/jenkins_home \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  --restart unless-stopped \\
  jenkins/jenkins:lts-jdk17

# Récupérer le mot de passe initial
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword

# Suivre les logs
docker logs -f jenkins
# Attendre "Jenkins is fully up and running"

# Accéder à l'interface : http://localhost:8080
\\\`\\\`\\\`

#### Installation via apt (Production Debian/Ubuntu)

\\\`\\\`\\\`bash
# Ajouter la clé GPG et le dépôt Jenkins
sudo wget -O /usr/share/keyrings/jenkins-keyring.asc \\
  https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key

echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" | \\
  sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null

# Installer Java 17 et Jenkins
sudo apt update
sudo apt install -y fontconfig openjdk-17-jre jenkins

# Démarrer Jenkins
sudo systemctl enable jenkins
sudo systemctl start jenkins
sudo systemctl status jenkins

# Récupérer le mot de passe initial
sudo cat /var/lib/jenkins/secrets/initialAdminPassword

# Ouvrir le port firewall si nécessaire
sudo ufw allow 8080/tcp
\\\`\\\`\\\`

#### Installation via yum/dnf (RHEL/CentOS)

\\\`\\\`\\\`bash
# Ajouter le dépôt Jenkins
sudo wget -O /etc/yum.repos.d/jenkins.repo \\
  https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key

# Installer
sudo dnf install -y java-17-openjdk jenkins

# Démarrer
sudo systemctl enable jenkins
sudo systemctl start jenkins

# Récupérer le mot de passe initial
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
\\\`\\\`\\\`

### Architecture et composants

\\\`\\\`\\\`
┌─────────────────────────────────────────────────────────────────┐
│                    Jenkins Architecture                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   ┌──────────────────────────────────────────────────────────┐   │
│   │              Jenkins Controller (Master)                  │   │
│   │                                                           │   │
│   │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │   │
│   │  │  Web UI  │  │  REST    │  │ Scheduler│  │ Plugin │  │   │
│   │  │  (8080)  │  │  API     │  │ (cron,   │  │ Manager│  │   │
│   │  │          │  │          │  │  SCM     │  │        │  │   │
│   │  │          │  │          │  │  poll)   │  │ (1700+)│  │   │
│   │  └──────────┘  └──────────┘  └──────────┘  └────────┘  │   │
│   │                                                           │   │
│   │  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐   │   │
│   │  │Credential│  │  Queue   │  │  JENKINS_HOME        │   │   │
│   │  │  Store   │  │ (builds) │  │  /var/lib/jenkins     │   │   │
│   │  └──────────┘  └──────────┘  │  ├── jobs/           │   │   │
│   │                               │  ├── plugins/        │   │   │
│   │                               │  ├── config.xml      │   │   │
│   │                               │  └── secrets/        │   │   │
│   │                               └──────────────────────┘   │   │
│   └───────────────────────────┬──────────────────────────────┘   │
│                               │ JNLP / SSH (port 50000)          │
│           ┌───────────────────┼───────────────────┐              │
│           ▼                   ▼                   ▼              │
│   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐       │
│   │   Agent 1    │   │   Agent 2    │   │   Agent 3    │       │
│   │  (Linux)     │   │  (Docker)    │   │ (Kubernetes) │       │
│   │              │   │              │   │              │       │
│   │ Executors: 4 │   │ Executors: 2 │   │ Executors: ∞ │       │
│   │ Labels:      │   │ Labels:      │   │ Labels:      │       │
│   │  linux,java  │   │ docker,node  │   │ k8s,dynamic  │       │
│   └──────────────┘   └──────────────┘   └──────────────┘       │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
\\\`\\\`\\\`

### Commandes essentielles

#### Jenkins CLI

\\\`\\\`\\\`bash
# Télécharger le CLI Jenkins
wget http://localhost:8080/jnlpJars/jenkins-cli.jar

# Aide
java -jar jenkins-cli.jar -s http://localhost:8080/ help

# Authentification
java -jar jenkins-cli.jar -s http://localhost:8080/ \\
  -auth admin:TOKEN who-am-i

# Lister les jobs
java -jar jenkins-cli.jar -s http://localhost:8080/ \\
  -auth admin:TOKEN list-jobs

# Lancer un build
java -jar jenkins-cli.jar -s http://localhost:8080/ \\
  -auth admin:TOKEN build my-job

# Lancer un build avec paramètres
java -jar jenkins-cli.jar -s http://localhost:8080/ \\
  -auth admin:TOKEN build my-job -p BRANCH=develop -p DEPLOY=true

# Installer un plugin
java -jar jenkins-cli.jar -s http://localhost:8080/ \\
  -auth admin:TOKEN install-plugin git docker-workflow

# Redémarrer Jenkins (safe)
java -jar jenkins-cli.jar -s http://localhost:8080/ \\
  -auth admin:TOKEN safe-restart

# Exporter la configuration d'un job
java -jar jenkins-cli.jar -s http://localhost:8080/ \\
  -auth admin:TOKEN get-job my-job > my-job-config.xml

# Créer un job depuis XML
java -jar jenkins-cli.jar -s http://localhost:8080/ \\
  -auth admin:TOKEN create-job new-job < new-job-config.xml
\\\`\\\`\\\`

#### API REST Jenkins

\\\`\\\`\\\`bash
# Informations système
curl -s http://admin:TOKEN@localhost:8080/api/json?pretty=true

# Lister les jobs
curl -s "http://admin:TOKEN@localhost:8080/api/json?tree=jobs[name,color,url]"

# Statut d'un job
curl -s "http://admin:TOKEN@localhost:8080/job/my-job/api/json"

# Dernier build
curl -s "http://admin:TOKEN@localhost:8080/job/my-job/lastBuild/api/json"

# Lancer un build
curl -X POST "http://admin:TOKEN@localhost:8080/job/my-job/build"

# Lancer un build paramétré
curl -X POST "http://admin:TOKEN@localhost:8080/job/my-job/buildWithParameters" \\
  --data-urlencode "BRANCH=feature/new" \\
  --data-urlencode "DEPLOY=true"

# Console output du dernier build
curl -s "http://admin:TOKEN@localhost:8080/job/my-job/lastBuild/consoleText"

# Queue des builds
curl -s "http://admin:TOKEN@localhost:8080/queue/api/json"

# Liste des plugins installés
curl -s "http://admin:TOKEN@localhost:8080/pluginManager/api/json?depth=1"

# CRUMB (CSRF protection)
CRUMB=$(curl -s "http://admin:TOKEN@localhost:8080/crumbIssuer/api/json" | python3 -c "import json,sys; print(json.load(sys.stdin)['crumb'])")
curl -X POST -H "Jenkins-Crumb:$CRUMB" "http://admin:TOKEN@localhost:8080/job/my-job/build"
\\\`\\\`\\\`

#### Job Freestyle (configuration)

\\\`\\\`\\\`bash
# Exemple de job freestyle via script de build
#!/bin/bash
# Ce script est configuré dans "Execute shell" d'un job freestyle

echo "=== Build started ==="
echo "Job: $JOB_NAME"
echo "Build: $BUILD_NUMBER"
echo "Workspace: $WORKSPACE"
echo "Branch: $GIT_BRANCH"

# Compilation
cd $WORKSPACE
mvn clean package -DskipTests

# Tests
mvn test

# Archiver les artefacts
cp target/*.jar $WORKSPACE/artifacts/

echo "=== Build completed ==="
\\\`\\\`\\\`

#### Pipeline (Jenkinsfile basique)

\\\`\\\`\\\`groovy
// Jenkinsfile minimal (Pipeline Déclaratif)
pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/team/project.git'
            }
        }
        
        stage('Build') {
            steps {
                sh 'mvn clean compile'
            }
        }
        
        stage('Test') {
            steps {
                sh 'mvn test'
            }
            post {
                always {
                    junit 'target/surefire-reports/*.xml'
                }
            }
        }
        
        stage('Package') {
            steps {
                sh 'mvn package -DskipTests'
                archiveArtifacts artifacts: 'target/*.jar'
            }
        }
    }
    
    post {
        success { echo 'Build successful!' }
        failure { echo 'Build failed!' }
    }
}
\\\`\\\`\\\`

### Configuration

#### Plugins essentiels

\\\`\\\`\\\`bash
# Plugins recommandés pour un setup complet
# Installer via Manage Jenkins > Plugins

# SCM
# - Git Plugin
# - GitHub Plugin / GitLab Plugin

# Pipeline
# - Pipeline (workflow-aggregator)
# - Pipeline Stage View
# - Blue Ocean (UI moderne)

# Build
# - Docker Pipeline
# - Kubernetes Plugin
# - Maven Integration

# Qualité
# - Warnings Next Generation (rapports d'analyse)
# - JUnit Plugin
# - Code Coverage API
# - SonarQube Scanner

# Notifications
# - Slack Notification
# - Email Extension
# - Microsoft Teams

# Sécurité
# - Role-Based Authorization Strategy
# - Credentials Plugin
# - OWASP Dependency Check

# Installation en batch via CLI
PLUGINS="git github docker-workflow kubernetes pipeline-stage-view blueocean junit slack credentials"
for plugin in $PLUGINS; do
  java -jar jenkins-cli.jar -s http://localhost:8080/ \\
    -auth admin:TOKEN install-plugin $plugin
done
java -jar jenkins-cli.jar -s http://localhost:8080/ -auth admin:TOKEN safe-restart
\\\`\\\`\\\`

#### Configuration globale (config.xml)

\\\`\\\`\\\`bash
# Fichier principal : /var/lib/jenkins/config.xml
# Configurations systèmes importantes :

# Nombre d'executors sur le master
# Manage Jenkins > System Configuration > # of executors: 0
# (recommandé: pas de build sur le master)

# URL Jenkins
# Manage Jenkins > System > Jenkins URL: http://jenkins.company.com:8080/

# Variables d'environnement globales
# Manage Jenkins > System > Global properties > Environment variables
# JAVA_HOME=/usr/lib/jvm/java-17-openjdk
# MAVEN_HOME=/opt/maven

# Sauvegarder la configuration
cp /var/lib/jenkins/config.xml /backup/jenkins_config_$(date +%Y%m%d).xml
\\\`\\\`\\\`

### Bonnes pratiques

1. **Pipeline as Code** : tout dans un Jenkinsfile versionné (pas de config UI)
2. **Pas de build sur le master** : utilisez des agents dédiés
3. **Plugins minimum** : n'installez que ce qui est nécessaire (surface d'attaque)
4. **Credentials centralisés** : jamais de secrets en clair dans le Jenkinsfile
5. **Agents éphémères** : Docker ou Kubernetes pour un environnement propre à chaque build
6. **Sauvegardez régulièrement** : JENKINS_HOME complet (config + jobs + secrets)
7. **Mises à jour** : appliquez les security advisories rapidement
8. **Monitoring** : surveillez la queue, l'espace disque, la mémoire
9. **Blue Ocean** : utilisez l'interface moderne pour la visibilité des pipelines
10. **Shared Libraries** : factorisez le code pipeline commun`,

      practiceContent: `## Travaux Pratiques - Introduction à Jenkins

### TP 1 : Installation Docker et premiers pas

\\\`\\\`\\\`bash
# 1. Lancer Jenkins avec Docker
docker run -d --name jenkins-tp \\
  -p 8080:8080 -p 50000:50000 \\
  -v jenkins_tp_home:/var/jenkins_home \\
  jenkins/jenkins:lts-jdk17

# 2. Récupérer le mot de passe initial
sleep 30  # Attendre le démarrage
docker exec jenkins-tp cat /var/jenkins_home/secrets/initialAdminPassword

# 3. Compléter le setup wizard
echo "Accéder à http://localhost:8080"
echo "Installer les plugins suggérés"
echo "Créer un compte admin"

# 4. Vérifier l'installation
curl -s http://localhost:8080/api/json | python3 -m json.tool
\\\`\\\`\\\`

### TP 2 : Premier job Freestyle

\\\`\\\`\\\`bash
# 1. Créer un job freestyle via l'API
cat > /tmp/hello-job.xml << 'EOF'
<?xml version='1.0' encoding='UTF-8'?>
<project>
  <description>Job de test Hello World</description>
  <builders>
    <hudson.tasks.Shell>
      <command>
echo "=== Hello Jenkins! ==="
echo "Job: $JOB_NAME"
echo "Build #$BUILD_NUMBER"
echo "Timestamp: $(date)"
echo "Hostname: $(hostname)"
echo "=== Done ==="
      </command>
    </hudson.tasks.Shell>
  </builders>
</project>
EOF

# 2. Créer le job
curl -X POST "http://admin:TOKEN@localhost:8080/createItem?name=hello-world" \\
  -H "Content-Type: application/xml" \\
  --data-binary @/tmp/hello-job.xml

# 3. Lancer le job
curl -X POST "http://admin:TOKEN@localhost:8080/job/hello-world/build"

# 4. Vérifier le résultat
sleep 5
curl -s "http://admin:TOKEN@localhost:8080/job/hello-world/1/consoleText"
\\\`\\\`\\\`

### TP 3 : Premier Pipeline (Jenkinsfile)

\\\`\\\`\\\`bash
# 1. Créer un repo Git avec un Jenkinsfile
mkdir -p /tmp/jenkins-pipeline-tp
cd /tmp/jenkins-pipeline-tp
git init

cat > Jenkinsfile << 'EOF'
pipeline {
    agent any
    
    environment {
        APP_NAME = 'tp-jenkins'
        VERSION = '1.0.0'
    }
    
    stages {
        stage('Info') {
            steps {
                echo "Building \${APP_NAME} v\${VERSION}"
                sh 'java -version'
                sh 'uname -a'
            }
        }
        
        stage('Build') {
            steps {
                sh '''
                    echo "Compiling..."
                    mkdir -p build
                    echo "Hello from Jenkins" > build/output.txt
                    echo "Build successful"
                '''
            }
        }
        
        stage('Test') {
            steps {
                sh '''
                    echo "Running tests..."
                    test -f build/output.txt
                    echo "Tests passed"
                '''
            }
        }
        
        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'build/**'
                echo "Artifacts archived"
            }
        }
    }
    
    post {
        success { echo '✅ Pipeline successful!' }
        failure { echo '❌ Pipeline failed!' }
        always { echo 'Pipeline finished.' }
    }
}
EOF

git add .
git commit -m "Initial Jenkinsfile"

# 2. Créer le pipeline job dans Jenkins (via UI)
echo "New Item > Pipeline > Pipeline from SCM > Git > URL du repo"
\\\`\\\`\\\`

### TP 4 : API REST et automatisation

\\\`\\\`\\\`bash
# 1. Explorer l'API
echo "=== System info ==="
curl -s "http://admin:TOKEN@localhost:8080/api/json" | python3 -c "
import json, sys
d = json.load(sys.stdin)
print(f'Jenkins version: {d.get(\"description\", \"\")}')
print(f'Jobs: {len(d.get(\"jobs\", []))}')
for j in d.get('jobs', []):
    print(f'  - {j[\"name\"]} ({j[\"color\"]})')
"

# 2. Déclencher un build et attendre le résultat
BUILD_URL=$(curl -sI -X POST "http://admin:TOKEN@localhost:8080/job/hello-world/build" | grep -i location | awk '{print $2}' | tr -d '\r')
echo "Build queued: $BUILD_URL"

# Attendre que le build démarre
sleep 5
curl -s "http://admin:TOKEN@localhost:8080/job/hello-world/lastBuild/api/json" | python3 -c "
import json, sys
d = json.load(sys.stdin)
print(f'Build #{d[\"number\"]} - Result: {d.get(\"result\", \"IN PROGRESS\")}')
print(f'Duration: {d.get(\"duration\", 0)/1000:.1f}s')
"

# 3. Récupérer les artefacts
curl -s "http://admin:TOKEN@localhost:8080/job/hello-world/lastSuccessfulBuild/artifact/"
\\\`\\\`\\\`

### TP 5 : Plugins et configuration

\\\`\\\`\\\`bash
# 1. Lister les plugins installés
curl -s "http://admin:TOKEN@localhost:8080/pluginManager/api/json?depth=1" | python3 -c "
import json, sys
d = json.load(sys.stdin)
plugins = d.get('plugins', [])
print(f'Plugins installés: {len(plugins)}')
for p in sorted(plugins, key=lambda x: x['shortName'])[:20]:
    status = '✅' if p.get('active') else '❌'
    print(f'  {status} {p[\"shortName\"]} ({p[\"version\"]})')
"

# 2. Installer un plugin
java -jar jenkins-cli.jar -s http://localhost:8080/ \\
  -auth admin:TOKEN install-plugin docker-workflow

# 3. Configurer un credential
curl -X POST "http://admin:TOKEN@localhost:8080/credentials/store/system/domain/_/createCredentials" \\
  -H "Content-Type: application/xml" \\
  --data '<com.cloudbees.plugins.credentials.impl.UsernamePasswordCredentialsImpl>
    <scope>GLOBAL</scope>
    <id>github-creds</id>
    <username>ci-bot</username>
    <password>secret-token</password>
  </com.cloudbees.plugins.credentials.impl.UsernamePasswordCredentialsImpl>'

echo "Credential created: github-creds"
\\\`\\\`\\\``,

      keyPoints: JSON.stringify([
        'Jenkins : serveur CI/CD open source le plus populaire, 1700+ plugins',
        'Installation : Docker (recommandé), apt/yum (production), WAR (legacy)',
        'Architecture : Controller (master) + Agents (workers) distribués',
        'Jobs Freestyle : configuration via UI, adaptés aux tâches simples',
        'Pipelines : workflows multi-étapes définis en code (Jenkinsfile)',
        'API REST : automatisation complète (builds, config, monitoring)',
        'Plugins essentiels : Git, Docker, Pipeline, Blue Ocean, Credentials',
        'Bonnes pratiques : Pipeline as Code, pas de build sur master, agents éphémères'
      ]) },


    { id: 'jen-02', courseId: 'jenkins', title: 'Pipelines déclaratifs', duration: '4h', orderIndex: 2,
      theoryContent: `## Pipelines Déclaratifs Jenkins

### Présentation

Le **Pipeline Déclaratif** est la syntaxe recommandée pour écrire des Jenkinsfiles. Il offre une structure claire et lisible avec des blocs prédéfinis (pipeline, agent, stages, steps) tout en permettant d'injecter du code Groovy quand nécessaire via les blocs \\\`script {}\\\`.

**Déclaratif vs Scripté :**

| Aspect | Déclaratif | Scripté |
|--------|-----------|---------|
| Syntaxe | Structurée, blocs imposés | Groovy libre |
| Courbe d'apprentissage | Facile | Complexe |
| Validation | Blue Ocean, linter | Aucune |
| Flexibilité | Moyenne (script blocks) | Totale |
| Recommandé | Oui (95% des cas) | Cas complexes |

**Structure d'un pipeline déclaratif :**

\\\`\\\`\\\`
pipeline {
    agent { ... }           // Où exécuter
    options { ... }         // Options globales
    environment { ... }     // Variables d'environnement
    parameters { ... }      // Paramètres d'entrée
    triggers { ... }        // Déclencheurs
    stages {                // Étapes du pipeline
        stage('...') {
            when { ... }    // Conditions d'exécution
            steps { ... }   // Actions
            post { ... }    // Actions post-étape
        }
    }
    post { ... }            // Actions post-pipeline
}
\\\`\\\`\\\`

### Installation sur Linux (Ubuntu/Debian)

#### Configuration du Pipeline Plugin

\\\`\\\`\\\`bash
# Installer les plugins Pipeline (si pas déjà fait)
java -jar jenkins-cli.jar -s http://localhost:8080/ \\
  -auth admin:TOKEN install-plugin \\
  workflow-aggregator \\
  pipeline-stage-view \\
  pipeline-utility-steps \\
  pipeline-build-step

# Redémarrer Jenkins
java -jar jenkins-cli.jar -s http://localhost:8080/ \\
  -auth admin:TOKEN safe-restart

# Vérifier l'installation
java -jar jenkins-cli.jar -s http://localhost:8080/ \\
  -auth admin:TOKEN list-plugins | grep pipeline
\\\`\\\`\\\`

#### Linter Jenkinsfile

\\\`\\\`\\\`bash
# Valider un Jenkinsfile avant de pousser
curl -X POST -F "jenkinsfile=<Jenkinsfile" \\
  "http://admin:TOKEN@localhost:8080/pipeline-model-converter/validate"

# Script de validation locale
cat > validate_jenkinsfile.sh << 'EOF'
#!/bin/bash
JENKINS_URL="http://localhost:8080"
JENKINS_AUTH="admin:TOKEN"

RESULT=$(curl -s -X POST -F "jenkinsfile=<$1" \\
  "$JENKINS_URL/pipeline-model-converter/validate" \\
  -u "$JENKINS_AUTH")

if echo "$RESULT" | grep -q "successfully validated"; then
  echo "✅ Jenkinsfile valide"
  exit 0
else
  echo "❌ Erreurs dans le Jenkinsfile:"
  echo "$RESULT"
  exit 1
fi
EOF
chmod +x validate_jenkinsfile.sh
./validate_jenkinsfile.sh Jenkinsfile
\\\`\\\`\\\`

### Architecture et composants

\\\`\\\`\\\`
┌─────────────────────────────────────────────────────────────────┐
│              Pipeline Déclaratif - Structure                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  pipeline {                                                       │
│  │                                                                │
│  ├── agent { docker 'node:18' }     // Environnement d'exécution │
│  │                                                                │
│  ├── options {                      // Options globales           │
│  │     timeout(time: 30, unit: 'MINUTES')                        │
│  │     retry(2)                                                   │
│  │     disableConcurrentBuilds()                                  │
│  │   }                                                            │
│  │                                                                │
│  ├── environment {                  // Variables                   │
│  │     APP = 'myapp'                                              │
│  │     CREDS = credentials('id')    // Secret injecté            │
│  │   }                                                            │
│  │                                                                │
│  ├── parameters {                   // Entrées utilisateur        │
│  │     string(name: 'BRANCH')                                    │
│  │     booleanParam(name: 'DEPLOY')                              │
│  │   }                                                            │
│  │                                                                │
│  ├── stages {                                                     │
│  │   ├── stage('Build')  ─── steps { sh 'make' }                │
│  │   ├── stage('Test')   ─── parallel { ... }                    │
│  │   └── stage('Deploy') ─── when { branch 'main' }             │
│  │   }                                                            │
│  │                                                                │
│  └── post {                         // Actions finales            │
│       always { ... }                                              │
│       success { ... }                                             │
│       failure { ... }                                             │
│     }                                                             │
│  }                                                                │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
\\\`\\\`\\\`

### Commandes essentielles

#### Directives agent

\\\`\\\`\\\`groovy
// Agent global - n'importe quel agent disponible
pipeline {
    agent any
    stages { ... }
}

// Pas d'agent global (défini par stage)
pipeline {
    agent none
    stages {
        stage('Build') {
            agent { label 'linux' }
            steps { sh 'make' }
        }
    }
}

// Agent Docker
pipeline {
    agent {
        docker {
            image 'maven:3.9-eclipse-temurin-17'
            args '-v /root/.m2:/root/.m2'   // Cache Maven
        }
    }
    stages { ... }
}

// Agent Docker avec Dockerfile
pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile.ci'
            dir 'ci'
            args '-v /tmp:/tmp'
            additionalBuildArgs '--build-arg VERSION=1.0'
        }
    }
    stages { ... }
}

// Agent Kubernetes
pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: maven
    image: maven:3.9-eclipse-temurin-17
    command: ['sleep', 'infinity']
  - name: docker
    image: docker:24-dind
    securityContext:
      privileged: true
"""
        }
    }
    stages { ... }
}
\\\`\\\`\\\`

#### Environment et credentials

\\\`\\\`\\\`groovy
pipeline {
    agent any
    
    environment {
        // Variables simples
        APP_NAME = 'my-application'
        VERSION = '2.1.0'
        
        // Variables depuis credentials Jenkins
        // Username + Password
        GIT_CREDS = credentials('github-credentials')
        // Génère: GIT_CREDS (user:pass), GIT_CREDS_USR, GIT_CREDS_PSW
        
        // Token / Secret text
        SONAR_TOKEN = credentials('sonarqube-token')
        
        // Fichier secret
        KUBECONFIG = credentials('kubernetes-config')
        
        // Variable calculée
        BUILD_TAG = "\${APP_NAME}-\${VERSION}-\${BUILD_NUMBER}"
    }
    
    stages {
        stage('Use Credentials') {
            environment {
                // Variables spécifiques au stage
                DEPLOY_ENV = 'staging'
                AWS_CREDS = credentials('aws-credentials')
            }
            steps {
                sh '''
                    echo "App: $APP_NAME v$VERSION"
                    echo "Tag: $BUILD_TAG"
                    echo "Deploy to: $DEPLOY_ENV"
                    # Les credentials sont masqués dans les logs
                    docker login -u $GIT_CREDS_USR -p $GIT_CREDS_PSW ghcr.io
                '''
            }
        }
    }
}
\\\`\\\`\\\`

#### Directives when (conditions)

\\\`\\\`\\\`groovy
pipeline {
    agent any
    stages {
        // Exécuter seulement sur la branche main
        stage('Deploy Prod') {
            when { branch 'main' }
            steps { sh './deploy.sh production' }
        }
        
        // Seulement sur les branches feature/*
        stage('Deploy Dev') {
            when { branch pattern: 'feature/*', comparator: 'GLOB' }
            steps { sh './deploy.sh dev' }
        }
        
        // Condition sur variable d'environnement
        stage('Notify') {
            when { environment name: 'DEPLOY_ENV', value: 'production' }
            steps { echo 'Deploying to production!' }
        }
        
        // Condition sur paramètre
        stage('Full Tests') {
            when { expression { params.RUN_FULL_TESTS == true } }
            steps { sh './run_all_tests.sh' }
        }
        
        // Conditions combinées (AND)
        stage('Release') {
            when {
                allOf {
                    branch 'main'
                    tag pattern: 'v\\\\d+\\\\.\\\\d+\\\\.\\\\d+', comparator: 'REGEXP'
                }
            }
            steps { sh './release.sh' }
        }
        
        // Conditions combinées (OR)
        stage('Deploy') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                }
            }
            steps { sh './deploy.sh' }
        }
        
        // Changeset (fichiers modifiés)
        stage('Frontend Build') {
            when { changeset 'frontend/**' }
            steps { sh 'cd frontend && npm run build' }
        }
        
        // beforeAgent: évaluer la condition AVANT d'allouer un agent
        stage('Heavy Build') {
            when {
                beforeAgent true
                branch 'main'
            }
            agent { label 'heavy-builder' }
            steps { sh './heavy_build.sh' }
        }
    }
}
\\\`\\\`\\\`

#### Parallel et matrix

\\\`\\\`\\\`groovy
pipeline {
    agent none
    stages {
        // Étapes en parallèle
        stage('Tests') {
            parallel {
                stage('Unit Tests') {
                    agent { docker 'maven:3.9' }
                    steps { sh 'mvn test -Punit' }
                }
                stage('Integration Tests') {
                    agent { docker 'maven:3.9' }
                    steps { sh 'mvn test -Pintegration' }
                }
                stage('Lint') {
                    agent { docker 'node:18' }
                    steps { sh 'npm run lint' }
                }
            }
        }
        
        // Matrix (combinaisons)
        stage('Build Matrix') {
            matrix {
                axes {
                    axis {
                        name 'PLATFORM'
                        values 'linux', 'windows', 'macos'
                    }
                    axis {
                        name 'JAVA_VERSION'
                        values '11', '17', '21'
                    }
                }
                excludes {
                    exclude {
                        axis { name 'PLATFORM'; values 'macos' }
                        axis { name 'JAVA_VERSION'; values '11' }
                    }
                }
                stages {
                    stage('Build') {
                        steps {
                            echo "Building on \${PLATFORM} with Java \${JAVA_VERSION}"
                            sh "./build.sh --platform=\${PLATFORM} --java=\${JAVA_VERSION}"
                        }
                    }
                }
            }
        }
    }
}
\\\`\\\`\\\`

#### Shared Libraries

\\\`\\\`\\\`groovy
// Structure d'une Shared Library
// vars/buildApp.groovy - Fonction globale
def call(Map config = [:]) {
    pipeline {
        agent { docker config.image ?: 'maven:3.9' }
        stages {
            stage('Build') {
                steps { sh config.buildCmd ?: 'mvn clean package' }
            }
            stage('Test') {
                steps { sh config.testCmd ?: 'mvn test' }
            }
            stage('Deploy') {
                when { branch 'main' }
                steps { sh config.deployCmd ?: './deploy.sh' }
            }
        }
    }
}

// Utilisation dans un Jenkinsfile
@Library('my-shared-lib') _

buildApp(
    image: 'node:18',
    buildCmd: 'npm ci && npm run build',
    testCmd: 'npm test',
    deployCmd: './scripts/deploy.sh'
)

// vars/notifySlack.groovy - Fonction utilitaire
def call(String status, String channel = '#builds') {
    def color = status == 'SUCCESS' ? 'good' : 'danger'
    slackSend(
        channel: channel,
        color: color,
        message: "\${env.JOB_NAME} #\${env.BUILD_NUMBER} - \${status}"
    )
}

// src/com/company/Pipeline.groovy - Classe partagée
package com.company

class Pipeline implements Serializable {
    def steps
    Pipeline(steps) { this.steps = steps }
    
    def dockerBuild(String image, String tag) {
        steps.sh "docker build -t \${image}:\${tag} ."
        steps.sh "docker push \${image}:\${tag}"
    }
}
\\\`\\\`\\\`

### Configuration

#### Options et paramètres avancés

\\\`\\\`\\\`groovy
pipeline {
    agent any
    
    options {
        timeout(time: 1, unit: 'HOURS')
        retry(3)
        timestamps()
        ansiColor('xterm')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
        skipDefaultCheckout()
    }
    
    parameters {
        string(name: 'BRANCH', defaultValue: 'main', description: 'Branch to build')
        booleanParam(name: 'DEPLOY', defaultValue: false, description: 'Deploy after build?')
        choice(name: 'ENVIRONMENT', choices: ['dev', 'staging', 'production'], description: 'Target env')
        password(name: 'SECRET', description: 'Secret value')
    }
    
    triggers {
        cron('H 2 * * 1-5')              // Nightly build weekdays
        pollSCM('H/5 * * * *')           // Poll Git every 5 min
        githubPush()                      // GitHub webhook
        upstream(upstreamProjects: 'lib-project', threshold: hudson.model.Result.SUCCESS)
    }
    
    stages {
        stage('Example') {
            steps {
                echo "Branch: \${params.BRANCH}"
                echo "Deploy: \${params.DEPLOY}"
                echo "Env: \${params.ENVIRONMENT}"
            }
        }
    }
}
\\\`\\\`\\\`

### Bonnes pratiques

1. **Déclaratif par défaut** : utilisez \\\`script {}\\\` seulement si nécessaire
2. **Jenkinsfile dans le repo** : versionné avec le code source
3. **Shared Libraries** : factorisez le code commun entre projets
4. **when + beforeAgent** : économisez des ressources en évaluant avant allocation
5. **Parallel** : accélérez les pipelines en parallélisant les tests
6. **Credentials** : jamais de secret en clair, toujours via credentials()
7. **timeout + retry** : protégez contre les builds bloqués
8. **post blocks** : nettoyez toujours (always), notifiez sur failure
9. **skipDefaultCheckout** : contrôlez quand et comment le code est récupéré
10. **Linter** : validez le Jenkinsfile avant de pousser`,

      practiceContent: `## Travaux Pratiques - Pipelines Déclaratifs

### TP 1 : Pipeline multi-stages

\\\`\\\`\\\`groovy
// Jenkinsfile - Pipeline complet
pipeline {
    agent any
    
    environment {
        APP = 'tp-pipeline'
        VERSION = '1.0.0'
    }
    
    stages {
        stage('Preparation') {
            steps {
                echo "Preparing \${APP} v\${VERSION}"
                sh 'mkdir -p build test-results'
            }
        }
        
        stage('Build') {
            steps {
                sh '''
                    echo "Building application..."
                    echo "console.log('Hello');" > build/app.js
                    echo "Build complete"
                '''
            }
        }
        
        stage('Test') {
            steps {
                sh '''
                    echo "Running tests..."
                    echo '<?xml version="1.0"?>
                    <testsuite tests="3" failures="0">
                      <testcase classname="App" name="test1"/>
                      <testcase classname="App" name="test2"/>
                      <testcase classname="App" name="test3"/>
                    </testsuite>' > test-results/results.xml
                    echo "3 tests passed"
                '''
            }
            post {
                always { junit 'test-results/*.xml' }
            }
        }
        
        stage('Deploy') {
            when { branch 'main' }
            steps {
                echo "Deploying \${APP} v\${VERSION}..."
            }
        }
    }
    
    post {
        success { echo '✅ Pipeline OK' }
        failure { echo '❌ Pipeline FAILED' }
        always { cleanWs() }
    }
}
\\\`\\\`\\\`

### TP 2 : Pipeline avec paramètres et conditions

\\\`\\\`\\\`groovy
pipeline {
    agent any
    
    parameters {
        choice(name: 'ENV', choices: ['dev', 'staging', 'prod'], description: 'Environnement')
        booleanParam(name: 'RUN_TESTS', defaultValue: true, description: 'Exécuter les tests?')
        string(name: 'VERSION', defaultValue: '1.0.0', description: 'Version à déployer')
    }
    
    stages {
        stage('Build') {
            steps { echo "Building v\${params.VERSION} for \${params.ENV}" }
        }
        
        stage('Tests') {
            when { expression { params.RUN_TESTS == true } }
            steps { echo "Running tests..." }
        }
        
        stage('Deploy Dev') {
            when { expression { params.ENV == 'dev' } }
            steps { echo "Deploying to dev..." }
        }
        
        stage('Deploy Staging') {
            when { expression { params.ENV == 'staging' } }
            steps { echo "Deploying to staging..." }
        }
        
        stage('Deploy Prod') {
            when {
                allOf {
                    expression { params.ENV == 'prod' }
                    branch 'main'
                }
            }
            steps {
                input message: 'Confirmer le déploiement en production?'
                echo "Deploying to production..."
            }
        }
    }
}
\\\`\\\`\\\`

### TP 3 : Pipeline parallèle

\\\`\\\`\\\`groovy
pipeline {
    agent none
    
    stages {
        stage('Build') {
            agent any
            steps { sh 'echo "Build done"' }
        }
        
        stage('Tests en parallèle') {
            parallel {
                stage('Unit Tests') {
                    agent any
                    steps {
                        sh '''
                            echo "Unit tests..."
                            sleep 2
                            echo "Unit tests PASSED"
                        '''
                    }
                }
                stage('Integration Tests') {
                    agent any
                    steps {
                        sh '''
                            echo "Integration tests..."
                            sleep 3
                            echo "Integration tests PASSED"
                        '''
                    }
                }
                stage('Security Scan') {
                    agent any
                    steps {
                        sh '''
                            echo "Security scan..."
                            sleep 1
                            echo "No vulnerabilities found"
                        '''
                    }
                }
            }
        }
        
        stage('Deploy') {
            agent any
            steps { echo "All tests passed, deploying..." }
        }
    }
}
\\\`\\\`\\\`

### TP 4 : Shared Library

\\\`\\\`\\\`bash
# 1. Créer la structure de la shared library
mkdir -p /tmp/jenkins-shared-lib/{vars,src/com/company}

# 2. Fonction de build standard
cat > /tmp/jenkins-shared-lib/vars/standardBuild.groovy << 'EOF'
def call(Map config = [:]) {
    def buildCmd = config.buildCmd ?: 'make all'
    def testCmd = config.testCmd ?: 'make test'
    
    pipeline {
        agent any
        stages {
            stage('Build') {
                steps { sh buildCmd }
            }
            stage('Test') {
                steps { sh testCmd }
            }
        }
    }
}
EOF

# 3. Fonction utilitaire de notification
cat > /tmp/jenkins-shared-lib/vars/notify.groovy << 'EOF'
def call(String status) {
    if (status == 'FAILURE') {
        echo "🚨 Build failed! Sending notification..."
    } else {
        echo "✅ Build succeeded!"
    }
}
EOF

# 4. Committer la library
cd /tmp/jenkins-shared-lib
git init
git add .
git commit -m "Initial shared library"

# 5. Utilisation dans un Jenkinsfile
cat > /tmp/Jenkinsfile_with_lib << 'EOF'
@Library('my-shared-lib') _

standardBuild(
    buildCmd: 'npm ci && npm run build',
    testCmd: 'npm test'
)
EOF
\\\`\\\`\\\`

### TP 5 : Pipeline Docker complet

\\\`\\\`\\\`groovy
pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            args '-v /tmp/npm-cache:/root/.npm'
        }
    }
    
    environment {
        CI = 'true'
        HOME = '/tmp'
    }
    
    stages {
        stage('Install') {
            steps {
                sh '''
                    node --version
                    npm --version
                    echo '{"name":"tp","version":"1.0.0","scripts":{"test":"echo ok","build":"echo built"}}' > package.json
                    npm install
                '''
            }
        }
        
        stage('Build') {
            steps { sh 'npm run build' }
        }
        
        stage('Test') {
            steps { sh 'npm test' }
        }
    }
    
    post {
        always { cleanWs() }
    }
}
\\\`\\\`\\\``,

      keyPoints: JSON.stringify([
        'Pipeline déclaratif : syntaxe structurée recommandée (pipeline, agent, stages, steps)',
        'agent : any, none, docker, dockerfile, kubernetes, label pour cibler l exécution',
        'environment + credentials() : injection sécurisée de secrets (masqués dans les logs)',
        'when : conditions d exécution (branch, expression, changeset, allOf, anyOf)',
        'parallel : exécuter des stages en parallèle pour accélérer le pipeline',
        'matrix : combinaisons automatiques de plateformes/versions',
        'Shared Libraries : code pipeline réutilisable entre projets (@Library)',
        'parameters : string, boolean, choice pour rendre le pipeline interactif',
        'post : always, success, failure, unstable pour les actions de fin de pipeline',
        'Linter : valider le Jenkinsfile via l API avant de pousser'
      ]) },


    { id: 'jen-03', courseId: 'jenkins', title: 'Agents et distribution', duration: '4h', orderIndex: 3,
      theoryContent: `## Agents et Distribution Jenkins

### Présentation

L'architecture distribuée de Jenkins permet de répartir la charge de travail sur plusieurs machines (**agents** ou **nodes**). Le **controller** (master) orchestre les builds tandis que les agents les exécutent. Cette architecture est essentielle pour la scalabilité, l'isolation des environnements et la sécurité.

**Types d'agents :**

| Type | Description | Cas d'usage |
|------|-------------|-------------|
| SSH Agent | Connexion SSH permanente | Serveurs dédiés Linux |
| JNLP Agent | Agent Java se connectant au master | Windows, DMZ |
| Docker Agent | Conteneur éphémère par build | Isolation, reproductibilité |
| Kubernetes Agent | Pod éphémère par build | Auto-scaling, cloud-native |
| Cloud Agent | VM éphémère (AWS, Azure, GCP) | Scaling elastique |

**Concepts clés :**

- **Label** : tag assigné à un agent (ex: linux, docker, java17, gpu)
- **Executor** : slot d'exécution parallèle sur un agent (typiquement 1-4)
- **Workspace** : répertoire de travail isolé par job sur l'agent
- **Availability** : stratégie de disponibilité (always on, demand)
- **Tool Location** : outils installés sur l'agent (JDK, Maven, Node)

### Installation sur Linux (Ubuntu/Debian)

#### Agent SSH (Linux)

\\\`\\\`\\\`bash
# === Sur la machine AGENT ===

# 1. Installer Java (prérequis)
sudo apt update
sudo apt install -y openjdk-17-jre-headless

# 2. Créer l'utilisateur Jenkins
sudo useradd -m -d /var/lib/jenkins -s /bin/bash jenkins
sudo mkdir -p /var/lib/jenkins/.ssh
sudo chown -R jenkins:jenkins /var/lib/jenkins

# 3. Configurer SSH
# Générer une clé SSH sur le MASTER
ssh-keygen -t ed25519 -f /var/lib/jenkins/.ssh/agent_key -N ""

# Copier la clé publique sur l'agent
ssh-copy-id -i /var/lib/jenkins/.ssh/agent_key.pub jenkins@agent-host

# 4. Installer les outils de build
sudo apt install -y git make gcc docker.io
sudo usermod -aG docker jenkins

# 5. Vérifier la connectivité depuis le master
ssh -i /var/lib/jenkins/.ssh/agent_key jenkins@agent-host "java -version"
\\\`\\\`\\\`

#### Agent JNLP (Java Web Start)

\\\`\\\`\\\`bash
# === Sur la machine AGENT ===

# 1. Télécharger le JAR agent depuis le master
wget http://jenkins-master:8080/jnlpJars/agent.jar

# 2. Lancer l'agent (mode connexion entrante)
java -jar agent.jar \\
  -url http://jenkins-master:8080/ \\
  -secret AGENT_SECRET_TOKEN \\
  -name "agent-linux-01" \\
  -workDir "/var/lib/jenkins/agent"

# 3. Créer un service systemd pour l'agent
sudo cat > /etc/systemd/system/jenkins-agent.service << 'EOF'
[Unit]
Description=Jenkins Agent
After=network.target

[Service]
Type=simple
User=jenkins
WorkingDirectory=/var/lib/jenkins
ExecStart=/usr/bin/java -jar /opt/jenkins/agent.jar \
  -url http://jenkins-master:8080/ \
  -secret AGENT_SECRET_TOKEN \
  -name "agent-linux-01" \
  -workDir "/var/lib/jenkins/agent"
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable jenkins-agent
sudo systemctl start jenkins-agent
\\\`\\\`\\\`

#### Agent Docker

\\\`\\\`\\\`bash
# Docker comme agent pour un pipeline
# Pas d'installation spéciale - Docker doit être disponible sur le master ou un agent

# Installer Docker sur l'agent/master
sudo apt install -y docker.io
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins

# Vérifier que Jenkins peut utiliser Docker
sudo -u jenkins docker run --rm hello-world

# Docker-in-Docker (DinD) pour isolation complète
docker run -d --name jenkins-agent-dind \\
  --privileged \\
  --network jenkins \\
  -v jenkins-docker-certs:/certs/client \\
  docker:24-dind
\\\`\\\`\\\`

#### Agent Kubernetes

\\\`\\\`\\\`bash
# 1. Installer le plugin Kubernetes dans Jenkins
java -jar jenkins-cli.jar -s http://localhost:8080/ \\
  -auth admin:TOKEN install-plugin kubernetes

# 2. Configurer le cloud Kubernetes
# Manage Jenkins > Clouds > New Cloud > Kubernetes
# - Kubernetes URL: https://kubernetes.default
# - Jenkins URL: http://jenkins.ci.svc.cluster.local:8080
# - Pod template: voir ci-dessous

# 3. Déployer Jenkins dans Kubernetes avec Helm
helm repo add jenkins https://charts.jenkins.io
helm repo update

helm install jenkins jenkins/jenkins \\
  --namespace ci \\
  --create-namespace \\
  --set controller.serviceType=LoadBalancer \\
  --set agent.enabled=true \\
  --set persistence.size=50Gi

# 4. Récupérer le mot de passe admin
kubectl -n ci get secret jenkins -o jsonpath="{.data.jenkins-admin-password}" | base64 -d
\\\`\\\`\\\`

### Architecture et composants

\\\`\\\`\\\`
┌─────────────────────────────────────────────────────────────────┐
│              Jenkins Distributed Architecture                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   ┌──────────────────────────────────────────────────────────┐   │
│   │              Jenkins Controller (Master)                  │   │
│   │                                                           │   │
│   │  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐   │   │
│   │  │ Scheduler│  │  Queue   │  │  Agent Manager       │   │   │
│   │  │          │  │          │  │  - SSH Launcher       │   │   │
│   │  │ Labels:  │  │ Pending  │  │  - JNLP Connector    │   │   │
│   │  │ matching │  │  jobs    │  │  - Cloud Provisioner  │   │   │
│   │  └──────────┘  └──────────┘  └──────────────────────┘   │   │
│   │              Executors: 0 (recommandé)                    │   │
│   └──────────────────────────┬───────────────────────────────┘   │
│                              │                                    │
│              ┌───────────────┼───────────────┐                   │
│              │               │               │                   │
│   ┌──────────▼───┐  ┌───────▼──────┐  ┌─────▼────────────┐    │
│   │ Agent SSH    │  │ Agent Docker │  │ Kubernetes Cloud │    │
│   │              │  │              │  │                  │    │
│   │ Labels:      │  │ Labels:      │  │ Pod Templates:   │    │
│   │  linux       │  │  docker      │  │  ┌────────────┐ │    │
│   │  java17      │  │  node18      │  │  │ maven-pod  │ │    │
│   │  maven       │  │  python      │  │  │ node-pod   │ │    │
│   │              │  │              │  │  │ docker-pod │ │    │
│   │ Executors: 4 │  │ Executors: ∞ │  │  └────────────┘ │    │
│   │              │  │ (per build)  │  │  Auto-scaling    │    │
│   │ Always On    │  │ Ephemeral    │  │  Ephemeral       │    │
│   └──────────────┘  └──────────────┘  └──────────────────┘    │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
\\\`\\\`\\\`

### Commandes essentielles

#### Pipeline avec Docker agents

\\\`\\\`\\\`groovy
// Pipeline avec différents agents Docker par stage
pipeline {
    agent none
    
    stages {
        stage('Build Java') {
            agent {
                docker {
                    image 'maven:3.9-eclipse-temurin-17'
                    args '-v maven-repo:/root/.m2'
                }
            }
            steps {
                sh 'mvn clean package -DskipTests'
                stash includes: 'target/*.jar', name: 'jar-artifact'
            }
        }
        
        stage('Build Frontend') {
            agent {
                docker {
                    image 'node:18-alpine'
                    args '-v npm-cache:/root/.npm'
                }
            }
            steps {
                sh 'npm ci && npm run build'
                stash includes: 'dist/**', name: 'frontend-build'
            }
        }
        
        stage('Docker Image') {
            agent { label 'docker' }
            steps {
                unstash 'jar-artifact'
                unstash 'frontend-build'
                sh '''
                    docker build -t myapp:\${BUILD_NUMBER} .
                    docker push registry.company.com/myapp:\${BUILD_NUMBER}
                '''
            }
        }
    }
}
\\\`\\\`\\\`

#### Pipeline Kubernetes

\\\`\\\`\\\`groovy
// Pipeline avec agents Kubernetes dynamiques
pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    jenkins: agent
spec:
  containers:
  - name: maven
    image: maven:3.9-eclipse-temurin-17
    command: ['sleep', 'infinity']
    resources:
      requests:
        memory: "1Gi"
        cpu: "500m"
      limits:
        memory: "2Gi"
        cpu: "1000m"
    volumeMounts:
    - name: maven-cache
      mountPath: /root/.m2
  - name: docker
    image: docker:24-dind
    securityContext:
      privileged: true
    env:
    - name: DOCKER_TLS_CERTDIR
      value: ""
  - name: kubectl
    image: bitnami/kubectl:latest
    command: ['sleep', 'infinity']
  volumes:
  - name: maven-cache
    persistentVolumeClaim:
      claimName: maven-cache-pvc
"""
        }
    }
    
    stages {
        stage('Build') {
            steps {
                container('maven') {
                    sh 'mvn clean package'
                }
            }
        }
        
        stage('Docker Build') {
            steps {
                container('docker') {
                    sh '''
                        docker build -t myapp:\${BUILD_NUMBER} .
                        docker push registry.company.com/myapp:\${BUILD_NUMBER}
                    '''
                }
            }
        }
        
        stage('Deploy') {
            steps {
                container('kubectl') {
                    sh '''
                        kubectl set image deployment/myapp \\
                          myapp=registry.company.com/myapp:\${BUILD_NUMBER}
                        kubectl rollout status deployment/myapp
                    '''
                }
            }
        }
    }
}
\\\`\\\`\\\`

#### Gestion des labels et affinité

\\\`\\\`\\\`groovy
// Utilisation avancée des labels
pipeline {
    agent none
    
    stages {
        // Build sur un agent avec GPU
        stage('ML Training') {
            agent { label 'linux && gpu && cuda11' }
            steps { sh 'python3 train_model.py' }
        }
        
        // Tests sur Windows
        stage('Windows Tests') {
            agent { label 'windows && dotnet6' }
            steps { bat 'dotnet test' }
        }
        
        // Build ARM
        stage('ARM Build') {
            agent { label 'linux && arm64' }
            steps { sh 'make ARCH=arm64' }
        }
        
        // Déploiement depuis un agent dans la DMZ
        stage('Deploy') {
            agent { label 'dmz && production-access' }
            steps { sh './deploy_to_prod.sh' }
        }
    }
}
\\\`\\\`\\\`

#### Scaling et provisioning dynamique

\\\`\\\`\\\`bash
# Configuration de scaling automatique avec Docker
# Manage Jenkins > Clouds > Docker

# Template Docker dans Jenkins config
# docker-agent-template.yaml
cat > docker-cloud-config.yaml << 'EOF'
clouds:
  - docker:
      name: "docker-cloud"
      dockerApi:
        dockerHost:
          uri: "tcp://docker-host:2376"
      templates:
        - name: "java-agent"
          image: "jenkins/inbound-agent:latest-jdk17"
          labels: "docker java17"
          instanceCapacity: "10"
          remoteFs: "/home/jenkins/agent"
          connector:
            attach:
              entryPointCmd: ""
        - name: "node-agent"
          image: "node:18"
          labels: "docker node18"
          instanceCapacity: "5"
          remoteFs: "/home/jenkins/agent"
EOF

# Scaling Kubernetes - Configuration HPA
cat > jenkins-agent-hpa.yaml << 'EOF'
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: jenkins-agents
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: jenkins-agent
  minReplicas: 2
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
EOF
kubectl apply -f jenkins-agent-hpa.yaml
\\\`\\\`\\\`

### Configuration

#### Configuration des agents via JCasC

\\\`\\\`\\\`yaml
# jenkins.yaml (JCasC - Jenkins Configuration as Code)
jenkins:
  nodes:
    - permanent:
        name: "agent-linux-01"
        remoteFS: "/var/lib/jenkins"
        numExecutors: 4
        labelString: "linux java17 maven docker"
        mode: EXCLUSIVE
        launcher:
          ssh:
            host: "agent-01.company.com"
            port: 22
            credentialsId: "agent-ssh-key"
            sshHostKeyVerificationStrategy:
              manuallyTrustedKeyVerificationStrategy:
                requireInitialManualTrust: false
    - permanent:
        name: "agent-windows-01"
        remoteFS: "C:\\jenkins"
        numExecutors: 2
        labelString: "windows dotnet"
        mode: EXCLUSIVE
        launcher:
          jnlp:
            workDirSettings:
              disabled: false
  clouds:
    - kubernetes:
        name: "kubernetes"
        serverUrl: "https://kubernetes.default"
        namespace: "jenkins-agents"
        jenkinsUrl: "http://jenkins:8080"
        templates:
          - name: "default-agent"
            label: "k8s"
            containers:
              - name: "jnlp"
                image: "jenkins/inbound-agent:latest"
                resourceRequestCpu: "200m"
                resourceRequestMemory: "256Mi"
\\\`\\\`\\\`

### Bonnes pratiques

1. **0 executors sur le controller** : le master ne doit jamais exécuter de builds
2. **Agents éphémères** (Docker/K8s) : environnement propre à chaque build
3. **Labels précis** : utilisez des labels combinés (linux && java17 && docker)
4. **Agents dédiés** par type de build (build Java, tests Node, deploy prod)
5. **Scaling automatique** : provisionnez les agents à la demande
6. **Workspace cleanup** : nettoyez les workspaces entre les builds
7. **Monitoring agents** : surveillez CPU, RAM, disque des agents
8. **Sécurité réseau** : agents dans un VLAN dédié, communication chiffrée
9. **Tool installations** : utilisez les "Tool Locations" Jenkins ou les images Docker
10. **Capacity planning** : dimensionnez selon le nombre de builds simultanés`,

      practiceContent: `## Travaux Pratiques - Agents et Distribution

### TP 1 : Agent Docker éphémère

\\\`\\\`\\\`groovy
// Pipeline utilisant un agent Docker différent par stage
pipeline {
    agent none
    
    stages {
        stage('Java Build') {
            agent {
                docker {
                    image 'maven:3.9-eclipse-temurin-17'
                }
            }
            steps {
                sh '''
                    java -version
                    mvn --version
                    echo "Java build environment ready"
                '''
            }
        }
        
        stage('Node Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                }
            }
            steps {
                sh '''
                    node --version
                    npm --version
                    echo "Node build environment ready"
                '''
            }
        }
        
        stage('Python Tests') {
            agent {
                docker {
                    image 'python:3.11-slim'
                }
            }
            steps {
                sh '''
                    python --version
                    pip --version
                    echo "Python environment ready"
                '''
            }
        }
    }
}
\\\`\\\`\\\`

### TP 2 : Agent Kubernetes avec multi-containers

\\\`\\\`\\\`groovy
pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: maven
    image: maven:3.9-eclipse-temurin-17
    command: ['sleep', 'infinity']
  - name: node
    image: node:18
    command: ['sleep', 'infinity']
  - name: tools
    image: alpine:latest
    command: ['sleep', 'infinity']
"""
        }
    }
    
    stages {
        stage('Java') {
            steps {
                container('maven') {
                    sh 'java -version && mvn --version'
                }
            }
        }
        stage('Node') {
            steps {
                container('node') {
                    sh 'node --version && npm --version'
                }
            }
        }
        stage('Tools') {
            steps {
                container('tools') {
                    sh 'apk add --no-cache curl jq && curl --version'
                }
            }
        }
    }
}
\\\`\\\`\\\`

### TP 3 : Labels et affinité

\\\`\\\`\\\`groovy
// Pipeline sélectionnant les agents par labels
pipeline {
    agent none
    
    stages {
        stage('Build') {
            agent { label 'linux && docker' }
            steps {
                sh 'echo "Building on a Linux Docker agent"'
                sh 'uname -a'
                sh 'docker --version'
            }
        }
        
        stage('Heavy Computation') {
            agent { label 'linux && high-memory' }
            steps {
                sh '''
                    echo "Running on high-memory agent"
                    free -h
                    nproc
                '''
            }
        }
    }
}
\\\`\\\`\\\`

### TP 4 : Stash/Unstash entre agents

\\\`\\\`\\\`groovy
// Partager des fichiers entre agents différents
pipeline {
    agent none
    
    stages {
        stage('Generate') {
            agent { docker 'alpine:latest' }
            steps {
                sh '''
                    mkdir -p output
                    echo "Generated content $(date)" > output/data.txt
                    echo "Config file" > output/config.yml
                '''
                stash includes: 'output/**', name: 'generated-files'
            }
        }
        
        stage('Process') {
            agent { docker 'python:3.11-slim' }
            steps {
                unstash 'generated-files'
                sh '''
                    cat output/data.txt
                    python3 -c "print('Processing:', open('output/data.txt').read())"
                '''
            }
        }
        
        stage('Package') {
            agent { docker 'alpine:latest' }
            steps {
                unstash 'generated-files'
                sh '''
                    tar -czf package.tar.gz output/
                    ls -la package.tar.gz
                '''
                archiveArtifacts 'package.tar.gz'
            }
        }
    }
}
\\\`\\\`\\\`

### TP 5 : Dockerfile comme agent

\\\`\\\`\\\`bash
# 1. Créer un Dockerfile personnalisé pour le CI
cat > Dockerfile.ci << 'EOF'
FROM ubuntu:22.04
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    maven \
    git \
    curl \
    docker.io \
    && rm -rf /var/lib/apt/lists/*
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
EOF

# 2. Jenkinsfile utilisant ce Dockerfile
cat > Jenkinsfile << 'EOF'
pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile.ci'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    
    stages {
        stage('Verify') {
            steps {
                sh '''
                    java -version
                    mvn --version
                    git --version
                    docker --version
                '''
            }
        }
        stage('Build') {
            steps {
                sh 'echo "Building with custom environment"'
            }
        }
    }
}
EOF
\\\`\\\`\\\``,

      keyPoints: JSON.stringify([
        'Architecture distribuée : Controller (orchestre) + Agents (exécutent les builds)',
        'Types d agents : SSH (permanent), JNLP (Windows/DMZ), Docker (éphémère), Kubernetes (auto-scale)',
        'Labels : tags pour cibler les agents (linux && java17 && docker)',
        'Docker agents : conteneur éphémère par build, environnement propre et reproductible',
        'Kubernetes : pods éphémères avec multi-containers (maven, docker, kubectl)',
        'stash/unstash : partager des fichiers entre agents différents dans un pipeline',
        '0 executors sur le master : ne jamais exécuter de builds sur le controller',
        'Scaling : provisionner les agents dynamiquement selon la charge (Cloud plugins)',
        'JCasC : configurer les agents en code YAML versionnable'
      ]) },


    { id: 'jen-04', courseId: 'jenkins', title: 'Sécurité et administration', duration: '4h', orderIndex: 4,
      theoryContent: `## Sécurité et Administration Jenkins

### Présentation

La sécurité et l'administration de Jenkins sont critiques car le serveur CI/CD a accès à tout : code source, secrets, infrastructure de production. Une mauvaise configuration peut exposer l'entreprise à des attaques de supply chain, des fuites de credentials ou des déploiements non autorisés.

**Domaines de sécurité Jenkins :**

| Domaine | Description |
|---------|-------------|
| Authentification | Qui peut accéder à Jenkins (LDAP, SSO, OAuth) |
| Autorisation | Qui peut faire quoi (RBAC, Matrix) |
| Credentials | Gestion sécurisée des secrets |
| Réseau | HTTPS, reverse proxy, isolation réseau |
| Agents | Communication sécurisée controller-agents |
| Plugins | Mises à jour de sécurité, audit |
| Audit | Traçabilité des actions |
| Backup | Sauvegarde et récupération |

### Installation sur Linux (Ubuntu/Debian)

#### Sécurisation HTTPS avec reverse proxy

\\\`\\\`\\\`bash
# Installation Nginx comme reverse proxy
sudo apt install -y nginx certbot python3-certbot-nginx

# Configuration Nginx pour Jenkins
sudo cat > /etc/nginx/sites-available/jenkins << 'EOF'
upstream jenkins {
    server 127.0.0.1:8080 fail_timeout=0;
}

server {
    listen 80;
    server_name jenkins.company.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name jenkins.company.com;

    ssl_certificate /etc/letsencrypt/live/jenkins.company.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/jenkins.company.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    location / {
        proxy_pass http://jenkins;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_read_timeout 90;
        proxy_redirect http:// https://;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/jenkins /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx

# Certificat Let's Encrypt
sudo certbot --nginx -d jenkins.company.com
\\\`\\\`\\\`

#### Configuration Jenkins pour HTTPS

\\\`\\\`\\\`bash
# Modifier /etc/default/jenkins (ou systemd)
# Indiquer à Jenkins qu'il est derrière un proxy
sudo sed -i 's/JENKINS_ARGS=""/JENKINS_ARGS="--httpListenAddress=127.0.0.1"/' /etc/default/jenkins

# Configurer le prefix si nécessaire
# JENKINS_ARGS="--httpListenAddress=127.0.0.1 --prefix=/jenkins"

# Redémarrer
sudo systemctl restart jenkins

# Configurer Jenkins URL
# Manage Jenkins > System > Jenkins URL: https://jenkins.company.com/
\\\`\\\`\\\`

### Architecture et composants

\\\`\\\`\\\`
┌─────────────────────────────────────────────────────────────────┐
│              Jenkins Security Architecture                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │                    Couche Réseau                           │   │
│  │  ┌─────────┐     ┌──────────┐     ┌──────────────────┐   │   │
│  │  │  Users  │────▶│  Nginx   │────▶│  Jenkins (8080)  │   │   │
│  │  │ (HTTPS) │     │  (443)   │     │  localhost only   │   │   │
│  │  └─────────┘     └──────────┘     └──────────────────┘   │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │                   Authentification                         │   │
│  │  ┌────────┐  ┌────────┐  ┌────────┐  ┌──────────────┐   │   │
│  │  │  LDAP  │  │  SAML  │  │ OAuth  │  │ Jenkins DB   │   │   │
│  │  │  /AD   │  │  (SSO) │  │ (GitHub)│  │ (local)      │   │   │
│  │  └────────┘  └────────┘  └────────┘  └──────────────┘   │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │                    Autorisation (RBAC)                     │   │
│  │                                                            │   │
│  │  Admin ──── full access                                    │   │
│  │  DevLead ── configure, build, create jobs                  │   │
│  │  Dev ────── build, view, workspace                         │   │
│  │  QA ─────── build, view specific folders                   │   │
│  │  Viewer ─── read-only                                      │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │                   Credentials Store                        │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │   │
│  │  │  System      │  │  Global      │  │  Folder      │    │   │
│  │  │  (agents)    │  │  (all jobs)  │  │  (scoped)    │    │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘    │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
\\\`\\\`\\\`

### Commandes essentielles

#### RBAC (Role-Based Access Control)

\\\`\\\`\\\`bash
# Installer le plugin Role-Based Authorization Strategy
java -jar jenkins-cli.jar -s http://localhost:8080/ \\
  -auth admin:TOKEN install-plugin role-strategy

# Activer : Manage Jenkins > Security > Authorization > Role-Based Strategy

# Configuration via script Groovy (Script Console)
# Manage Jenkins > Script Console

# Créer des rôles via l'API Groovy
import com.michelin.cio.hudson.plugins.rolestrategy.*
import jenkins.model.*

def strategy = Jenkins.instance.authorizationStrategy
if (strategy instanceof RoleBasedAuthorizationStrategy) {
    // Créer le rôle "developer"
    def devPerms = [
        "hudson.model.Item.Build",
        "hudson.model.Item.Read",
        "hudson.model.Item.Workspace",
        "hudson.model.Run.Replay"
    ] as Set
    strategy.addRole(RoleBasedAuthorizationStrategy.GLOBAL, 
        new Role("developer", ".*", devPerms))
    
    // Assigner un utilisateur au rôle
    strategy.assignRole(RoleBasedAuthorizationStrategy.GLOBAL, 
        "developer", "jean.dupont")
    
    Jenkins.instance.save()
}
\\\`\\\`\\\`

#### Credentials management

\\\`\\\`\\\`bash
# Types de credentials :
# - Username with password
# - SSH Username with private key
# - Secret text (tokens)
# - Secret file (kubeconfig, certificates)
# - Certificate (PKCS#12)

# Créer un credential via API
curl -X POST "http://admin:TOKEN@localhost:8080/credentials/store/system/domain/_/createCredentials" \\
  -H "Content-Type: application/xml" \\
  --data '
<com.cloudbees.plugins.credentials.impl.UsernamePasswordCredentialsImpl>
  <scope>GLOBAL</scope>
  <id>docker-registry</id>
  <description>Docker Registry credentials</description>
  <username>ci-user</username>
  <password>secret-password</password>
</com.cloudbees.plugins.credentials.impl.UsernamePasswordCredentialsImpl>'

# Secret text
curl -X POST "http://admin:TOKEN@localhost:8080/credentials/store/system/domain/_/createCredentials" \\
  -H "Content-Type: application/xml" \\
  --data '
<org.jenkinsci.plugins.plaincredentials.impl.StringCredentialsImpl>
  <scope>GLOBAL</scope>
  <id>sonar-token</id>
  <description>SonarQube Token</description>
  <secret>sqa_xxxxxxxxxxxxxxxxxxxx</secret>
</org.jenkinsci.plugins.plaincredentials.impl.StringCredentialsImpl>'

# Lister les credentials
curl -s "http://admin:TOKEN@localhost:8080/credentials/store/system/domain/_/api/json?depth=2"

# Utilisation dans un pipeline
// credentials('id') dans environment block
// withCredentials([...]) dans steps
\\\`\\\`\\\`

#### JCasC (Jenkins Configuration as Code)

\\\`\\\`\\\`yaml
# jenkins.yaml - Configuration complète as Code
jenkins:
  systemMessage: "Jenkins - Managed by JCasC"
  numExecutors: 0
  mode: EXCLUSIVE
  
  securityRealm:
    ldap:
      configurations:
        - server: "ldap://ldap.company.com"
          rootDN: "dc=company,dc=com"
          userSearchBase: "ou=users"
          userSearch: "uid={0}"
          groupSearchBase: "ou=groups"
          groupMembershipStrategy:
            fromGroupSearch:
              filter: "member={0}"
      
  authorizationStrategy:
    roleBased:
      roles:
        global:
          - name: "admin"
            permissions:
              - "Overall/Administer"
            entries:
              - group: "jenkins-admins"
          - name: "developer"
            permissions:
              - "Overall/Read"
              - "Job/Build"
              - "Job/Read"
              - "Job/Workspace"
            entries:
              - group: "developers"
          - name: "viewer"
            permissions:
              - "Overall/Read"
              - "Job/Read"
            entries:
              - group: "everyone"

  clouds:
    - kubernetes:
        name: "kubernetes"
        namespace: "jenkins-agents"

credentials:
  system:
    domainCredentials:
      - credentials:
          - usernamePassword:
              scope: GLOBAL
              id: "github-token"
              username: "ci-bot"
              password: "\${GITHUB_TOKEN}"
          - string:
              scope: GLOBAL
              id: "sonar-token"
              secret: "\${SONAR_TOKEN}"

unclassified:
  location:
    url: "https://jenkins.company.com/"
    adminAddress: "devops@company.com"
  
  globalLibraries:
    libraries:
      - name: "shared-lib"
        retriever:
          modernSCM:
            scm:
              git:
                remote: "https://github.com/company/jenkins-shared-lib.git"
                credentialsId: "github-token"
\\\`\\\`\\\`

#### Backup et restauration

\\\`\\\`\\\`bash
# Script de backup JENKINS_HOME
#!/bin/bash
JENKINS_HOME="/var/lib/jenkins"
BACKUP_DIR="/backup/jenkins"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/jenkins_backup_$DATE.tar.gz"

mkdir -p $BACKUP_DIR

# Éléments essentiels à sauvegarder
tar -czf $BACKUP_FILE \\
  --exclude="$JENKINS_HOME/workspace" \\
  --exclude="$JENKINS_HOME/.cache" \\
  --exclude="$JENKINS_HOME/caches" \\
  --exclude="$JENKINS_HOME/war" \\
  --exclude="$JENKINS_HOME/logs" \\
  $JENKINS_HOME/config.xml \\
  $JENKINS_HOME/credentials.xml \\
  $JENKINS_HOME/secrets/ \\
  $JENKINS_HOME/users/ \\
  $JENKINS_HOME/jobs/ \\
  $JENKINS_HOME/nodes/ \\
  $JENKINS_HOME/plugins/*.jpi \\
  $JENKINS_HOME/*.xml \\
  $JENKINS_HOME/jenkins.yaml

echo "Backup created: $BACKUP_FILE ($(du -sh $BACKUP_FILE | cut -f1))"

# Rotation : garder 30 jours
find $BACKUP_DIR -name "jenkins_backup_*" -mtime +30 -delete

# Restauration
# sudo systemctl stop jenkins
# tar -xzf $BACKUP_FILE -C /
# sudo chown -R jenkins:jenkins $JENKINS_HOME
# sudo systemctl start jenkins
\\\`\\\`\\\`

#### Monitoring et alertes

\\\`\\\`\\\`bash
# Plugin Monitoring (JavaMelody)
java -jar jenkins-cli.jar -s http://localhost:8080/ \\
  -auth admin:TOKEN install-plugin monitoring

# Métriques Prometheus
java -jar jenkins-cli.jar -s http://localhost:8080/ \\
  -auth admin:TOKEN install-plugin prometheus

# Endpoint Prometheus : http://jenkins:8080/prometheus/

# Script de health check
#!/bin/bash
JENKINS_URL="http://localhost:8080"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$JENKINS_URL/login")
QUEUE=$(curl -s "$JENKINS_URL/queue/api/json" | python3 -c "import json,sys; print(len(json.load(sys.stdin).get('items',[])))")
DISK=$(df -h /var/lib/jenkins | tail -1 | awk '{print $5}' | tr -d '%')

echo "Jenkins Health Check:"
echo "  HTTP Status: $RESPONSE"
echo "  Queue size: $QUEUE"
echo "  Disk usage: $DISK%"

if [ "$RESPONSE" != "200" ]; then
  echo "ALERT: Jenkins not responding!"
  # Envoyer alerte
fi
if [ "$DISK" -gt 85 ]; then
  echo "ALERT: Disk space critical!"
fi
\\\`\\\`\\\`

### Configuration

#### Hardening (sécurisation avancée)

\\\`\\\`\\\`bash
# 1. Désactiver le CLI remoting (vulnérable)
# Manage Jenkins > Security > CLI > Disable CLI over Remoting

# 2. Activer CSRF Protection
# Manage Jenkins > Security > CSRF Protection: enabled

# 3. Agent → Controller Security
# Manage Jenkins > Security > Agent → Controller Access Control: enabled

# 4. Désactiver le signup
# Manage Jenkins > Security > Security Realm > Do not allow sign up

# 5. Content Security Policy (CSP)
# System property dans JAVA_OPTS:
# -Dhudson.model.DirectoryBrowserSupport.CSP="default-src 'self';"

# 6. Rate limiting API
# -Djenkins.security.ApiTokenProperty.adminCanGenerateNewTokens=true

# 7. Audit Trail plugin
java -jar jenkins-cli.jar -s http://localhost:8080/ \\
  -auth admin:TOKEN install-plugin audit-trail

# 8. Script approval (sandbox Groovy)
# Manage Jenkins > In-process Script Approval
# Revoir et approuver les scripts manuellement
\\\`\\\`\\\`

### Bonnes pratiques

1. **HTTPS obligatoire** : reverse proxy Nginx/Apache avec TLS
2. **LDAP/SSO** : pas de comptes locaux (sauf compte admin de secours)
3. **RBAC strict** : principe du moindre privilège, rôles par projet/folder
4. **Credentials scopés** : utilisez les folders pour limiter l'accès aux secrets
5. **JCasC** : toute la configuration en code versionné (reproductible)
6. **Backup quotidien** : JENKINS_HOME (config, jobs, secrets, plugins)
7. **Mises à jour** : appliquez les security advisories dans les 48h
8. **Audit trail** : tracez toutes les actions (qui a lancé quoi, quand)
9. **0 executors master** : jamais de build sur le controller
10. **Script sandbox** : n'approuvez que les scripts vérifiés`,

      practiceContent: `## Travaux Pratiques - Sécurité et Administration

### TP 1 : Configuration RBAC

\\\`\\\`\\\`bash
# 1. Installer le plugin Role Strategy
java -jar jenkins-cli.jar -s http://localhost:8080/ \\
  -auth admin:TOKEN install-plugin role-strategy
java -jar jenkins-cli.jar -s http://localhost:8080/ \\
  -auth admin:TOKEN safe-restart

# 2. Activer Role-Based Strategy
# Manage Jenkins > Security > Authorization > Role-Based Strategy

# 3. Créer des rôles via Script Console
# Manage Jenkins > Script Console
cat << 'GROOVY'
import jenkins.model.*
import hudson.security.*

// Configurer Matrix-based security
def instance = Jenkins.getInstance()
def strategy = new GlobalMatrixAuthorizationStrategy()

// Admin : tous les droits
strategy.add(Jenkins.ADMINISTER, "admin")

// Développeur : build et lecture
strategy.add(Jenkins.READ, "developer")
strategy.add(hudson.model.Item.BUILD, "developer")
strategy.add(hudson.model.Item.READ, "developer")
strategy.add(hudson.model.Item.WORKSPACE, "developer")

// Viewer : lecture seule
strategy.add(Jenkins.READ, "viewer")
strategy.add(hudson.model.Item.READ, "viewer")

instance.setAuthorizationStrategy(strategy)
instance.save()
println "Authorization configured"
GROOVY
\\\`\\\`\\\`

### TP 2 : Gestion des credentials

\\\`\\\`\\\`bash
# 1. Créer différents types de credentials

# Username/Password
curl -X POST "http://admin:TOKEN@localhost:8080/credentials/store/system/domain/_/createCredentials" \\
  -H "Content-Type: application/xml" \\
  --data '<com.cloudbees.plugins.credentials.impl.UsernamePasswordCredentialsImpl>
    <scope>GLOBAL</scope>
    <id>git-credentials</id>
    <username>ci-user</username>
    <password>my-secret-token</password>
  </com.cloudbees.plugins.credentials.impl.UsernamePasswordCredentialsImpl>'

# Secret text
curl -X POST "http://admin:TOKEN@localhost:8080/credentials/store/system/domain/_/createCredentials" \\
  -H "Content-Type: application/xml" \\
  --data '<org.jenkinsci.plugins.plaincredentials.impl.StringCredentialsImpl>
    <scope>GLOBAL</scope>
    <id>api-token</id>
    <secret>super-secret-api-key</secret>
  </org.jenkinsci.plugins.plaincredentials.impl.StringCredentialsImpl>'

# 2. Utiliser dans un pipeline
cat > Jenkinsfile << 'EOF'
pipeline {
    agent any
    environment {
        GIT_CREDS = credentials('git-credentials')
        API_KEY = credentials('api-token')
    }
    stages {
        stage('Use Credentials') {
            steps {
                sh '''
                    echo "User: $GIT_CREDS_USR"
                    echo "Pass: [MASKED]"
                    echo "API Key: [MASKED]"
                    # Les valeurs sont masquées dans les logs
                '''
            }
        }
        stage('With Credentials Block') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'git-credentials',
                        usernameVariable: 'USER',
                        passwordVariable: 'PASS'
                    )
                ]) {
                    sh 'echo "Authenticated as $USER"'
                }
            }
        }
    }
}
EOF
\\\`\\\`\\\`

### TP 3 : JCasC (Configuration as Code)

\\\`\\\`\\\`bash
# 1. Installer le plugin JCasC
java -jar jenkins-cli.jar -s http://localhost:8080/ \\
  -auth admin:TOKEN install-plugin configuration-as-code

# 2. Créer le fichier de configuration
cat > /var/lib/jenkins/jenkins.yaml << 'EOF'
jenkins:
  systemMessage: "Jenkins - Configured by JCasC"
  numExecutors: 0
  mode: EXCLUSIVE
  
  securityRealm:
    local:
      allowsSignup: false
      users:
        - id: "admin"
          password: "\${ADMIN_PASSWORD}"
        - id: "developer"
          password: "\${DEV_PASSWORD}"

  authorizationStrategy:
    globalMatrix:
      permissions:
        - "Overall/Administer:admin"
        - "Overall/Read:developer"
        - "Job/Build:developer"
        - "Job/Read:developer"

unclassified:
  location:
    url: "http://localhost:8080/"
    adminAddress: "admin@company.com"
EOF

# 3. Appliquer la configuration
# Manage Jenkins > Configuration as Code > Apply new configuration

# 4. Exporter la configuration actuelle
curl -s "http://admin:TOKEN@localhost:8080/configuration-as-code/export" > jenkins_export.yaml
\\\`\\\`\\\`

### TP 4 : Backup et restauration

\\\`\\\`\\\`bash
# 1. Script de backup
cat > /opt/jenkins/backup.sh << 'EOF'
#!/bin/bash
set -e
JENKINS_HOME="/var/lib/jenkins"
BACKUP_DIR="/backup/jenkins"
DATE=$(date +%Y%m%d)

mkdir -p $BACKUP_DIR

echo "Starting Jenkins backup..."

# Backup des fichiers critiques
tar -czf "$BACKUP_DIR/jenkins_$DATE.tar.gz" \
  -C / \
  var/lib/jenkins/config.xml \
  var/lib/jenkins/credentials.xml \
  var/lib/jenkins/secrets/ \
  var/lib/jenkins/users/ \
  var/lib/jenkins/jobs/*/config.xml \
  var/lib/jenkins/nodes/ \
  var/lib/jenkins/jenkins.yaml \
  2>/dev/null || true

echo "Backup done: $BACKUP_DIR/jenkins_$DATE.tar.gz"
ls -lh "$BACKUP_DIR/jenkins_$DATE.tar.gz"

# Rotation (garder 14 jours)
find $BACKUP_DIR -name "jenkins_*.tar.gz" -mtime +14 -delete
echo "Old backups cleaned"
EOF
chmod +x /opt/jenkins/backup.sh

# 2. Planifier via cron
echo "0 2 * * * /opt/jenkins/backup.sh >> /var/log/jenkins_backup.log 2>&1" | sudo crontab -u root -

# 3. Test de restauration
/opt/jenkins/backup.sh
echo "Backup size: $(du -sh /backup/jenkins/jenkins_$DATE.tar.gz)"
tar -tzf /backup/jenkins/jenkins_*.tar.gz | head -20
\\\`\\\`\\\`

### TP 5 : Monitoring et health check

\\\`\\\`\\\`bash
# 1. Script de monitoring
cat > /opt/jenkins/healthcheck.sh << 'EOF'
#!/bin/bash
JENKINS_URL="http://localhost:8080"
AUTH="admin:TOKEN"

echo "=== Jenkins Health Check ==="
echo "Date: $(date)"

# HTTP Status
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -u $AUTH "$JENKINS_URL/api/json")
echo "HTTP Status: $HTTP_CODE"

# Version
VERSION=$(curl -s -u $AUTH "$JENKINS_URL/api/json" | python3 -c "import json,sys; print(json.load(sys.stdin).get('description',''))" 2>/dev/null)
echo "Version: $VERSION"

# Queue
QUEUE=$(curl -s -u $AUTH "$JENKINS_URL/queue/api/json" | python3 -c "import json,sys; print(len(json.load(sys.stdin).get('items',[])))" 2>/dev/null)
echo "Queue size: $QUEUE jobs"

# Agents
AGENTS=$(curl -s -u $AUTH "$JENKINS_URL/computer/api/json" | python3 -c "
import json, sys
d = json.load(sys.stdin)
total = len(d.get('computer', [])) - 1
offline = sum(1 for c in d.get('computer', [])[1:] if c.get('offline'))
print(f'{total - offline}/{total} online')
" 2>/dev/null)
echo "Agents: $AGENTS"

# Disk
DISK_USAGE=$(df -h /var/lib/jenkins | tail -1 | awk '{print $5}')
echo "Disk usage: $DISK_USAGE"

echo "=== End Health Check ==="
EOF
chmod +x /opt/jenkins/healthcheck.sh

# 2. Exécuter
/opt/jenkins/healthcheck.sh
\\\`\\\`\\\``,

      keyPoints: JSON.stringify([
        'HTTPS obligatoire : reverse proxy Nginx avec TLS, Jenkins en localhost uniquement',
        'RBAC : Role-Based Access Control avec principe du moindre privilège',
        'Credentials : scopés par folder, jamais en clair dans les Jenkinsfiles',
        'JCasC : toute la configuration Jenkins en fichier YAML versionné',
        'Backup : quotidien de JENKINS_HOME (config, secrets, jobs), rotation automatique',
        'Monitoring : health check HTTP, queue size, agents status, disk usage',
        'Hardening : désactiver CLI remoting, CSRF enabled, agent security enabled',
        'Audit trail : tracer toutes les actions utilisateurs et builds',
        'Mises à jour : appliquer les security advisories Jenkins dans les 48h',
        'LDAP/SSO : authentification centralisée, pas de comptes locaux'
      ]) },

    // ==================== JIRA ====================
    { id: 'jira-01', courseId: 'jira', title: 'Introduction complète à Jira', duration: '5h', orderIndex: 1,
      theoryContent: `## Introduction complète à Jira

### Présentation et historique

**Jira** est la plateforme de gestion de projet et de suivi des tickets la plus utilisée au monde, développée par **Atlassian** depuis **2002**. Son nom vient du mot japonais "Gojira" (Godzilla). Plus de **250 000 organisations** dans le monde utilisent Jira, des startups aux entreprises du Fortune 500.

Jira a évolué considérablement depuis sa création :
- **2002** : Première version, simple bug tracker
- **2005** : Introduction des plugins et de l'écosystème
- **2007** : GreenHopper (devenu Jira Agile puis Jira Software)
- **2010** : Support complet Scrum et Kanban
- **2015** : Jira Cloud, nouvelle interface
- **2017** : Jira Software, Jira Service Management (anciennement Service Desk)
- **2020** : Next-gen projects (Team-managed projects)
- **2024** : Jira avec Intelligence Artificielle intégrée

### Concepts fondamentaux détaillés

#### Projets
Un projet Jira est un conteneur qui regroupe un ensemble de tickets. Chaque projet possède :
- Une **clé unique** (ex: PROJ, DEV, OPS) - préfixe de tous les tickets
- Un **type** : Software (Scrum/Kanban), Service Management, Business
- Un **responsable** (Project Lead)
- Des **schemes** associés (permissions, notifications, workflows, écrans)
- Des **composants** pour catégoriser les tickets
- Des **versions** pour planifier les releases

#### Types de tickets (Issue Types)
- **Epic** : Grande fonctionnalité ou initiative regroupant plusieurs stories (durée : semaines/mois)
- **Story (User Story)** : Fonctionnalité du point de vue utilisateur ("En tant que... je veux... afin de...")
- **Task** : Travail technique ou non fonctionnel à réaliser
- **Bug** : Défaut à corriger dans le logiciel
- **Sub-task** : Découpage technique d'une story ou task
- **Spike** : Investigation technique avec timebox

#### Workflows (Flux de travail)
Un workflow définit le cycle de vie d'un ticket :
- **Statuts** : états possibles (To Do, In Progress, In Review, Done)
- **Transitions** : passages entre statuts (Start Work, Submit for Review, Approve)
- **Conditions** : qui peut effectuer une transition
- **Validators** : vérifications avant transition (champs obligatoires)
- **Post-functions** : actions automatiques après transition (assignation, notification)

#### Boards (Tableaux)
- **Scrum Board** : organisé en sprints, avec backlog et sprint actif
- **Kanban Board** : flux continu avec limites WIP (Work In Progress)
- Colonnes mappées sur les statuts du workflow
- Swimlanes pour regrouper les tickets (par epic, assignee, priority)
- Quick filters pour filtrer l'affichage

#### Sprints
- Itérations de durée fixe (généralement 1-4 semaines)
- Contiennent un ensemble de tickets sélectionnés depuis le backlog
- Objectif de sprint (Sprint Goal)
- Vélocité mesurée en story points ou nombre de tickets

### Architecture de Jira

\\\`\\\`\\\`
┌─────────────────────────────────────────────────────────────────┐
│                    JIRA DATA CENTER ARCHITECTURE                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   ┌─────────────┐     ┌──────────────────────────────────┐      │
│   │   Clients   │     │         Load Balancer            │      │
│   │  (Browser)  │────▶│    (Nginx/HAProxy/F5)            │      │
│   └─────────────┘     └──────────┬───────────────────────┘      │
│                                   │                               │
│                    ┌──────────────┼──────────────┐               │
│                    ▼              ▼              ▼               │
│            ┌────────────┐ ┌────────────┐ ┌────────────┐         │
│            │  Jira Node │ │  Jira Node │ │  Jira Node │         │
│            │     #1     │ │     #2     │ │     #3     │         │
│            │  (Tomcat)  │ │  (Tomcat)  │ │  (Tomcat)  │         │
│            │  Port 8080 │ │  Port 8080 │ │  Port 8080 │         │
│            └─────┬──────┘ └──────┬─────┘ └──────┬─────┘         │
│                  │               │              │                │
│            ┌─────┴───────────────┴──────────────┴─────┐         │
│            │        Shared Filesystem (NFS/EFS)        │         │
│            │   /jira-shared (attachments, avatars...)  │         │
│            └──────────────────────────────────────────-┘         │
│                                                                   │
│            ┌──────────────────────────────────────────┐          │
│            │         PostgreSQL Database               │          │
│            │    (Primary + Replica for DR)             │          │
│            │    Port 5432 | Database: jiradb           │          │
│            └──────────────────────────────────────────┘          │
│                                                                   │
│            ┌──────────────────────────────────────────┐          │
│            │      Ehcache (Cluster Cache - RMI)       │          │
│            │   Synchronisation entre les noeuds       │          │
│            └──────────────────────────────────────────┘          │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
\\\`\\\`\\\`


### Installation complète sur Linux

#### Prérequis système

\\\`\\\`\\\`bash
# ============================================
# PREREQUIS POUR JIRA SERVER/DATA CENTER
# ============================================

# Vérification du système
cat /etc/os-release
uname -a
free -h                # Minimum 4 Go RAM (8 Go recommandé pour production)
df -h                  # Minimum 10 Go disque (50 Go+ recommandé)
nproc                  # Minimum 2 CPU (4+ recommandé)

# Installation Java 17 (OpenJDK) - Ubuntu/Debian
sudo apt update && sudo apt upgrade -y
sudo apt install -y openjdk-17-jdk wget curl unzip fontconfig
java -version
# openjdk version "17.0.x"

# Installation Java 17 - CentOS/RHEL
sudo yum install -y java-17-openjdk java-17-openjdk-devel wget curl unzip fontconfig
java -version

# Vérifier JAVA_HOME
echo \\\${JAVA_HOME}
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
echo "export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64" >> ~/.bashrc

# Ports requis
# 8080 - Interface web Jira (HTTP)
# 8443 - Interface web Jira (HTTPS)
# 40001 - Cluster communication (Data Center)
# 40011 - Cluster cache (Data Center)
\\\`\\\`\\\`

#### Installation PostgreSQL 14+

\\\`\\\`\\\`bash
# ============================================
# INSTALLATION POSTGRESQL - Ubuntu/Debian
# ============================================

# Ajouter le dépôt PostgreSQL officiel
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt \\\$(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt update
sudo apt install -y postgresql-14

# Démarrer PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql
sudo systemctl status postgresql

# Créer l'utilisateur et la base de données Jira
sudo -u postgres psql << 'EOSQL'
CREATE USER jirauser WITH PASSWORD 'JiraSecurePass123!';
CREATE DATABASE jiradb WITH ENCODING 'UNICODE' LC_COLLATE 'C' LC_CTYPE 'C' TEMPLATE template0 OWNER jirauser;
GRANT ALL PRIVILEGES ON DATABASE jiradb TO jirauser;
\q
EOSQL

# Configurer l'authentification PostgreSQL
sudo vim /etc/postgresql/14/main/pg_hba.conf
# Ajouter la ligne suivante :
# host    jiradb    jirauser    127.0.0.1/32    scram-sha-256

# Configurer l'écoute réseau
sudo vim /etc/postgresql/14/main/postgresql.conf
# listen_addresses = 'localhost'
# max_connections = 200

# Redémarrer PostgreSQL
sudo systemctl restart postgresql

# Tester la connexion
psql -h localhost -U jirauser -d jiradb -c "SELECT version();"

# ============================================
# INSTALLATION POSTGRESQL - CentOS/RHEL
# ============================================

sudo dnf install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-8-x86_64/pgdg-redhat-repo-latest.noarch.rpm
sudo dnf -qy module disable postgresql
sudo dnf install -y postgresql14-server postgresql14
sudo /usr/pgsql-14/bin/postgresql-14-setup initdb
sudo systemctl start postgresql-14
sudo systemctl enable postgresql-14

# Même configuration utilisateur/database que ci-dessus
sudo -u postgres /usr/pgsql-14/bin/psql << 'EOSQL'
CREATE USER jirauser WITH PASSWORD 'JiraSecurePass123!';
CREATE DATABASE jiradb WITH ENCODING 'UNICODE' LC_COLLATE 'C' LC_CTYPE 'C' TEMPLATE template0 OWNER jirauser;
GRANT ALL PRIVILEGES ON DATABASE jiradb TO jirauser;
EOSQL
\\\`\\\`\\\`


#### Installation de Jira Server

\\\`\\\`\\\`bash
# ============================================
# INSTALLATION JIRA SERVER - Méthode bin installer
# ============================================

# Créer l'utilisateur système pour Jira
sudo useradd -r -m -U -d /opt/atlassian/jira -s /bin/bash jira

# Télécharger l'installeur Jira (vérifier la dernière version sur atlassian.com)
cd /tmp
wget https://product-downloads.atlassian.com/software/jira/downloads/atlassian-jira-software-9.12.0-x64.bin
chmod +x atlassian-jira-software-9.12.0-x64.bin

# Lancer l'installation (mode non-interactif)
sudo ./atlassian-jira-software-9.12.0-x64.bin -q \\\\
  -varfile /tmp/response.varfile

# Ou installation interactive
sudo ./atlassian-jira-software-9.12.0-x64.bin

# Répertoires importants après installation :
# /opt/atlassian/jira/          - Application Jira
# /var/atlassian/application-data/jira/  - Données (JIRA_HOME)
# /opt/atlassian/jira/conf/     - Configuration Tomcat
# /opt/atlassian/jira/bin/      - Scripts de démarrage

# ============================================
# CREATION DU SERVICE SYSTEMD
# ============================================

sudo cat > /etc/systemd/system/jira.service << 'EOF'
[Unit]
Description=Atlassian Jira Software
After=network.target postgresql.service
Requires=postgresql.service

[Service]
Type=forking
User=jira
Group=jira
Environment=JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
Environment=JIRA_HOME=/var/atlassian/application-data/jira
ExecStart=/opt/atlassian/jira/bin/start-jira.sh
ExecStop=/opt/atlassian/jira/bin/stop-jira.sh
Restart=on-failure
RestartSec=10
LimitNOFILE=65536
LimitNPROC=65536
TimeoutStartSec=300

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable jira
sudo systemctl start jira
sudo systemctl status jira

# Vérifier les logs de démarrage
sudo tail -f /var/atlassian/application-data/jira/log/atlassian-jira.log
# Attendre : "Jira is ready to serve"
\\\`\\\`\\\`

#### Configuration JVM (setenv.sh)

\\\`\\\`\\\`bash
# ============================================
# TUNING JVM - /opt/atlassian/jira/bin/setenv.sh
# ============================================

sudo vim /opt/atlassian/jira/bin/setenv.sh

# Configuration recommandée pour production (8 Go RAM serveur)
JVM_MINIMUM_MEMORY="2048m"
JVM_MAXIMUM_MEMORY="4096m"

# Garbage Collector (G1GC recommandé)
JVM_SUPPORT_RECOMMENDED_ARGS="-XX:+UseG1GC \\\\
  -XX:MaxGCPauseMillis=200 \\\\
  -XX:+ParallelRefProcEnabled \\\\
  -XX:G1HeapRegionSize=32m \\\\
  -XX:InitiatingHeapOccupancyPercent=70 \\\\
  -XX:+DisableExplicitGC \\\\
  -XX:+HeapDumpOnOutOfMemoryError \\\\
  -XX:HeapDumpPath=/var/atlassian/application-data/jira/log/ \\\\
  -Djava.awt.headless=true \\\\
  -Datlassian.plugins.enable.wait=300"

# Redémarrer après modification
sudo systemctl restart jira
\\\`\\\`\\\`

#### Configuration Reverse Proxy Nginx

\\\`\\\`\\\`bash
# ============================================
# CONFIGURATION NGINX REVERSE PROXY
# ============================================

sudo apt install -y nginx certbot python3-certbot-nginx

sudo cat > /etc/nginx/sites-available/jira << 'EOF'
upstream jira_backend {
    server 127.0.0.1:8080;
}

server {
    listen 80;
    server_name jira.example.com;
    return 301 https://\\\$host\\\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name jira.example.com;

    ssl_certificate /etc/letsencrypt/live/jira.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/jira.example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    client_max_body_size 100m;
    proxy_read_timeout 600s;

    location / {
        proxy_pass http://jira_backend;
        proxy_set_header Host \\\$host;
        proxy_set_header X-Real-IP \\\$remote_addr;
        proxy_set_header X-Forwarded-For \\\$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header X-Forwarded-Port 443;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/jira /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Configurer Jira pour le reverse proxy
# Éditer /opt/atlassian/jira/conf/server.xml
# Ajouter dans le Connector :
# proxyName="jira.example.com" proxyPort="443" scheme="https" secure="true"
\\\`\\\`\\\`


#### Installation Docker Compose

\\\`\\\`\\\`bash
# ============================================
# INSTALLATION DOCKER COMPOSE - Jira + PostgreSQL
# ============================================

mkdir -p /opt/jira-docker && cd /opt/jira-docker

cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  jira:
    image: atlassian/jira-software:9.12
    container_name: jira
    ports:
      - "8080:8080"
    environment:
      - ATL_JDBC_URL=jdbc:postgresql://db:5432/jiradb
      - ATL_JDBC_USER=jirauser
      - ATL_JDBC_PASSWORD=JiraSecurePass123!
      - ATL_DB_DRIVER=org.postgresql.Driver
      - ATL_DB_TYPE=postgres72
      - JVM_MINIMUM_MEMORY=2048m
      - JVM_MAXIMUM_MEMORY=4096m
      - ATL_PROXY_NAME=jira.example.com
      - ATL_PROXY_PORT=443
      - ATL_TOMCAT_SCHEME=https
      - ATL_TOMCAT_SECURE=true
    volumes:
      - jira-data:/var/atlassian/application-data/jira
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:14-alpine
    container_name: jira-db
    environment:
      - POSTGRES_USER=jirauser
      - POSTGRES_PASSWORD=JiraSecurePass123!
      - POSTGRES_DB=jiradb
      - POSTGRES_ENCODING=UNICODE
      - POSTGRES_COLLATE=C
      - POSTGRES_COLLATE_TYPE=C
    volumes:
      - postgres-data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  jira-data:
  postgres-data:
EOF

# Lancer les services
docker-compose up -d

# Vérifier les logs
docker-compose logs -f jira

# Commandes de gestion
docker-compose ps
docker-compose restart jira
docker-compose down
docker-compose down -v  # ATTENTION: supprime les volumes (données)
\\\`\\\`\\\`

### Fichiers de configuration importants

\\\`\\\`\\\`bash
# ============================================
# dbconfig.xml - /var/atlassian/application-data/jira/dbconfig.xml
# ============================================
# Ce fichier est généré lors du setup wizard mais peut être modifié manuellement

<?xml version="1.0" encoding="UTF-8"?>
<jira-database-config>
  <name>defaultDS</name>
  <delegator-name>default</delegator-name>
  <database-type>postgres72</database-type>
  <schema-name>public</schema-name>
  <jdbc-datasource>
    <url>jdbc:postgresql://localhost:5432/jiradb</url>
    <driver-class>org.postgresql.Driver</driver-class>
    <username>jirauser</username>
    <password>JiraSecurePass123!</password>
    <pool-min-size>20</pool-min-size>
    <pool-max-size>100</pool-max-size>
    <pool-max-wait>30000</pool-max-wait>
    <pool-max-idle>20</pool-max-idle>
    <pool-remove-abandoned>true</pool-remove-abandoned>
    <pool-remove-abandoned-timeout>300</pool-remove-abandoned-timeout>
    <validation-query>select 1</validation-query>
  </jdbc-datasource>
</jira-database-config>

# ============================================
# server.xml - /opt/atlassian/jira/conf/server.xml
# ============================================
# Configuration du connecteur HTTP Tomcat

<Connector port="8080"
           maxThreads="200"
           minSpareThreads="25"
           connectionTimeout="20000"
           enableLookups="false"
           maxHttpHeaderSize="8192"
           protocol="HTTP/1.1"
           useBodyEncodingForURI="true"
           redirectPort="8443"
           acceptCount="100"
           disableUploadTimeout="true"
           bindOnInit="false"
           proxyName="jira.example.com"
           proxyPort="443"
           scheme="https"
           secure="true"/>
\\\`\\\`\\\`

### API REST Jira - Référence complète

\\\`\\\`\\\`bash
# ============================================
# VARIABLE DE BASE POUR TOUTES LES COMMANDES API
# ============================================
JIRA_URL="https://jira.example.com"
AUTH="admin:password"
# Ou avec token : AUTH_HEADER="Authorization: Bearer YOUR_TOKEN"

# ============================================
# INFORMATION SYSTÈME
# ============================================

# Vérifier le statut du serveur
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/api/2/serverInfo" | python3 -m json.tool

# Health check
curl -s "\\\${JIRA_URL}/status"

# Informations de licence
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/api/2/serverInfo" | python3 -m json.tool


# ============================================
# PROJETS - CRUD COMPLET
# ============================================

# Lister tous les projets
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/api/2/project" | python3 -m json.tool

# Obtenir un projet spécifique
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/api/2/project/PROJ" | python3 -m json.tool

# Créer un nouveau projet
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/api/2/project" \\\\
  -d '{
    "key": "NEWPROJ",
    "name": "Nouveau Projet",
    "projectTypeKey": "software",
    "projectTemplateKey": "com.pyxis.greenhopper.jira:gh-scrum-template",
    "description": "Description du projet",
    "lead": "admin",
    "assigneeType": "PROJECT_LEAD"
  }'

# Mettre à jour un projet
curl -s -u \\\${AUTH} -X PUT \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/api/2/project/NEWPROJ" \\\\
  -d '{
    "name": "Projet Renommé",
    "description": "Nouvelle description",
    "lead": "nouveau.lead"
  }'

# Supprimer un projet (ATTENTION - irréversible)
curl -s -u \\\${AUTH} -X DELETE "\\\${JIRA_URL}/rest/api/2/project/NEWPROJ"

# Lister les composants d'un projet
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/api/2/project/PROJ/components"

# Lister les versions d'un projet
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/api/2/project/PROJ/versions"

# ============================================
# TICKETS (ISSUES) - CRUD COMPLET
# ============================================

# Créer un ticket avec tous les champs
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/api/2/issue" \\\\
  -d '{
    "fields": {
      "project": {"key": "PROJ"},
      "issuetype": {"name": "Story"},
      "summary": "En tant qu utilisateur je veux pouvoir me connecter",
      "description": "Description détaillée de la story avec critères d acceptation",
      "priority": {"name": "High"},
      "assignee": {"name": "dev.user"},
      "reporter": {"name": "product.owner"},
      "labels": ["sprint-12", "auth"],
      "components": [{"name": "Backend"}],
      "fixVersions": [{"name": "1.2.0"}],
      "customfield_10004": 5,
      "customfield_10007": "PROJ-100"
    }
  }'

# Lire un ticket avec tous les détails
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/api/2/issue/PROJ-123" | python3 -m json.tool

# Lire avec expansion spécifique
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/api/2/issue/PROJ-123?expand=changelog,renderedFields,transitions"

# Mettre à jour un ticket
curl -s -u \\\${AUTH} -X PUT \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/api/2/issue/PROJ-123" \\\\
  -d '{
    "fields": {
      "summary": "Nouveau titre",
      "description": "Nouvelle description",
      "priority": {"name": "Critical"},
      "assignee": {"name": "autre.dev"},
      "labels": ["urgent", "sprint-12"]
    }
  }'

# Supprimer un ticket
curl -s -u \\\${AUTH} -X DELETE "\\\${JIRA_URL}/rest/api/2/issue/PROJ-123"

# Supprimer avec sous-tâches
curl -s -u \\\${AUTH} -X DELETE "\\\${JIRA_URL}/rest/api/2/issue/PROJ-123?deleteSubtasks=true"

# Création en masse (Bulk create)
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/api/2/issue/bulk" \\\\
  -d '{
    "issueUpdates": [
      {
        "fields": {
          "project": {"key": "PROJ"},
          "issuetype": {"name": "Task"},
          "summary": "Task 1"
        }
      },
      {
        "fields": {
          "project": {"key": "PROJ"},
          "issuetype": {"name": "Task"},
          "summary": "Task 2"
        }
      }
    ]
  }'

# ============================================
# TRANSITIONS (Changements de statut)
# ============================================

# Obtenir les transitions disponibles pour un ticket
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/api/2/issue/PROJ-123/transitions" | python3 -m json.tool

# Effectuer une transition (ex: passer en "In Progress")
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/api/2/issue/PROJ-123/transitions" \\\\
  -d '{
    "transition": {"id": "21"},
    "fields": {
      "assignee": {"name": "dev.user"}
    },
    "update": {
      "comment": [{"add": {"body": "Je commence le travail sur ce ticket"}}]
    }
  }'

# ============================================
# COMMENTAIRES
# ============================================

# Ajouter un commentaire
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/api/2/issue/PROJ-123/comment" \\\\
  -d '{
    "body": "Commentaire avec [lien|https://example.com] et mention [~username]",
    "visibility": {
      "type": "role",
      "value": "Developers"
    }
  }'

# Lister les commentaires
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/api/2/issue/PROJ-123/comment"

# ============================================
# PIÈCES JOINTES (Attachments)
# ============================================

# Ajouter une pièce jointe
curl -s -u \\\${AUTH} -X POST \\\\
  -H "X-Atlassian-Token: no-check" \\\\
  -F "file=@/path/to/screenshot.png" \\\\
  "\\\${JIRA_URL}/rest/api/2/issue/PROJ-123/attachments"

# ============================================
# LIENS ENTRE TICKETS
# ============================================

# Créer un lien entre deux tickets
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/api/2/issueLink" \\\\
  -d '{
    "type": {"name": "Blocks"},
    "inwardIssue": {"key": "PROJ-123"},
    "outwardIssue": {"key": "PROJ-456"},
    "comment": {"body": "PROJ-123 bloque PROJ-456"}
  }'

# Types de liens disponibles
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/api/2/issueLinkType"

# ============================================
# WATCHERS (Observateurs)
# ============================================

# Ajouter un watcher
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/api/2/issue/PROJ-123/watchers" \\\\
  -d '"username"'

# Lister les watchers
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/api/2/issue/PROJ-123/watchers"

# ============================================
# RECHERCHE JQL VIA API
# ============================================

# Recherche avec JQL
curl -s -u \\\${AUTH} -G \\\\
  --data-urlencode "jql=project = PROJ AND status = 'In Progress' ORDER BY priority DESC" \\\\
  --data-urlencode "maxResults=50" \\\\
  --data-urlencode "fields=summary,status,assignee,priority" \\\\
  "\\\${JIRA_URL}/rest/api/2/search"

# ============================================
# UTILISATEURS ET GROUPES
# ============================================

# Rechercher un utilisateur
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/api/2/user/search?username=john"

# Créer un utilisateur
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/api/2/user" \\\\
  -d '{
    "name": "new.user",
    "password": "TempPass123!",
    "emailAddress": "new.user@example.com",
    "displayName": "Nouveau Utilisateur"
  }'

# Ajouter un utilisateur à un groupe
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/api/2/group/user?groupname=jira-developers" \\\\
  -d '{"name": "new.user"}'

# Vérifier les permissions
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/api/2/mypermissions?projectKey=PROJ"
\\\`\\\`\\\`

### Troubleshooting courant

| Problème | Cause | Solution |
|----------|-------|----------|
| OutOfMemoryError | JVM mal configurée | Augmenter Xmx dans setenv.sh |
| Connection Pool Exhausted | Trop de connexions | Augmenter pool-max-size dans dbconfig.xml |
| Slow startup | Index corrompu | Réindexer via Administration > Indexing |
| 500 Internal Error | Plugin incompatible | Démarrer en safe mode, désactiver plugins |
| Mail queue blocked | SMTP mal configuré | Vérifier outgoing mail dans admin |
| Attachment upload fails | Taille max dépassée | Modifier attachment size dans General Config |
| LDAP sync fails | Timeout réseau | Vérifier connectivité et augmenter timeout |
| Cluster node offline | Cache desynchronisé | Redémarrer le noeud, vérifier réseau |

`,
      practiceContent: `## Travaux pratiques - Introduction à Jira

### TP1 : Installation et configuration initiale

1. Installer Jira via Docker Compose avec PostgreSQL
2. Compléter le wizard de configuration initial
3. Créer un projet Scrum "Formation DevOps" (clé: FORM)
4. Configurer les types de tickets : Epic, Story, Task, Bug, Sub-task
5. Créer les composants : Frontend, Backend, Infrastructure, Documentation

### TP2 : Création et manipulation de tickets via API

1. Créer une Epic "Module Authentication" via l'API REST
2. Créer 3 Stories liées à l'Epic
3. Créer des Sub-tasks pour chaque Story
4. Ajouter des commentaires et pièces jointes
5. Effectuer des transitions de workflow (To Do → In Progress → Done)
6. Créer des liens entre tickets (blocks, is blocked by)

### TP3 : Administration de base

1. Créer des utilisateurs et groupes
2. Configurer les permissions du projet
3. Personnaliser le workflow (ajouter un statut "In Review")
4. Tester la recherche JQL basique
5. Configurer les notifications email

### Questions de validation

- Quelle est la différence entre une Story et une Task ?
- Comment fonctionne le système de permissions par projet ?
- Quels sont les champs obligatoires pour créer un ticket via API ?
- Comment configurer un reverse proxy pour Jira ?
- Quels paramètres JVM sont critiques pour la performance ?`,
      keyPoints: JSON.stringify([
        'Jira est utilisé par 250K+ organisations pour la gestion de projet Agile depuis 2002',
        'Installation Linux complète : Java 17 + PostgreSQL 14 + bin installer + systemd service',
        'Architecture Data Center : Load Balancer + Noeuds Jira + Shared FS + PostgreSQL + Cache',
        'API REST /rest/api/2/ : CRUD complet projets, tickets, transitions, commentaires, liens',
        'Configuration JVM critique : Xms/Xmx, G1GC, HeapDump, plugins wait timeout',
        'Docker Compose recommandé pour labs : Jira + PostgreSQL avec volumes persistants',
        'Fichiers clés : dbconfig.xml (BDD), server.xml (Tomcat), setenv.sh (JVM)',
        'Troubleshooting : OutOfMemory, pool exhaustion, index corruption, plugin conflicts'
      ]) },


    { id: 'jira-02', courseId: 'jira', title: 'Gestion Agile avancée - Scrum, Kanban et JQL', duration: '5h', orderIndex: 2,
      theoryContent: `## Gestion Agile avancée avec Jira - Scrum, Kanban et JQL

### Scrum avec Jira - Guide complet

#### Principes Scrum

Scrum est un framework Agile itératif basé sur des **sprints** (itérations de durée fixe). Les trois piliers de Scrum sont :
- **Transparence** : tout le travail est visible par tous
- **Inspection** : vérification régulière de la progression
- **Adaptation** : ajustement continu du plan

#### Les rôles Scrum dans Jira
- **Product Owner** : gère le backlog, priorise, définit les critères d'acceptation
- **Scrum Master** : facilite les cérémonies, élimine les obstacles
- **Development Team** : équipe auto-organisée (3-9 personnes) qui réalise le travail

#### Les cérémonies Scrum

**Sprint Planning** (début de sprint) :
- Durée : 2h par semaine de sprint (ex: 4h pour un sprint de 2 semaines)
- Le PO présente les items prioritaires du backlog
- L'équipe estime et sélectionne les items pour le sprint
- Définition du Sprint Goal
- Découpage en tasks/sub-tasks

**Daily Standup** (quotidien - 15 min max) :
- Qu'ai-je fait hier ?
- Que vais-je faire aujourd'hui ?
- Y a-t-il des blocages ?
- Mise à jour du board Jira

**Sprint Review** (fin de sprint) :
- Démonstration de l'incrément terminé
- Feedback des stakeholders
- Mise à jour du backlog

**Sprint Retrospective** (fin de sprint, après review) :
- Qu'est-ce qui a bien fonctionné ?
- Qu'est-ce qui peut être amélioré ?
- Actions d'amélioration pour le prochain sprint

#### Les artefacts Scrum dans Jira
- **Product Backlog** : toutes les Epics/Stories ordonnées par priorité
- **Sprint Backlog** : items sélectionnés pour le sprint en cours + plan
- **Increment** : somme de tous les items "Done" du sprint

#### Configuration Scrum Board dans Jira

\\\`\\\`\\\`bash
# ============================================
# API AGILE - BOARDS
# ============================================

JIRA_URL="https://jira.example.com"
AUTH="admin:password"

# Lister tous les boards
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/agile/1.0/board" | python3 -m json.tool

# Obtenir un board spécifique
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/agile/1.0/board/1" | python3 -m json.tool

# Créer un Scrum Board
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/agile/1.0/board" \\\\
  -d '{
    "name": "DevOps Scrum Board",
    "type": "scrum",
    "filterId": 10001
  }'

# Configuration du board (colonnes, swimlanes, quick filters)
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/agile/1.0/board/1/configuration"

# ============================================
# API AGILE - SPRINTS
# ============================================

# Lister les sprints d'un board
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/agile/1.0/board/1/sprint"

# Obtenir le sprint actif
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/agile/1.0/board/1/sprint?state=active"

# Créer un sprint
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/agile/1.0/sprint" \\\\
  -d '{
    "name": "Sprint 15",
    "startDate": "2024-03-01T10:00:00.000+01:00",
    "endDate": "2024-03-15T18:00:00.000+01:00",
    "originBoardId": 1,
    "goal": "Livrer le module authentification et les tests E2E"
  }'

# Démarrer un sprint (passer de future à active)
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/agile/1.0/sprint/15" \\\\
  -d '{
    "state": "active",
    "startDate": "2024-03-01T10:00:00.000+01:00",
    "endDate": "2024-03-15T18:00:00.000+01:00"
  }'

# Terminer (fermer) un sprint
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/agile/1.0/sprint/15" \\\\
  -d '{
    "state": "closed",
    "completeDate": "2024-03-15T18:00:00.000+01:00"
  }'

# Déplacer des issues dans un sprint
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/agile/1.0/sprint/15/issue" \\\\
  -d '{
    "issues": ["PROJ-101", "PROJ-102", "PROJ-103", "PROJ-104"]
  }'

# Obtenir les issues d'un sprint
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/agile/1.0/sprint/15/issue?maxResults=100"

# ============================================
# API AGILE - EPICS
# ============================================

# Lister les epics d'un board
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/agile/1.0/board/1/epic"

# Obtenir les issues d'une epic
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/agile/1.0/epic/PROJ-50/issue"

# Déplacer des issues vers une epic
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/agile/1.0/epic/PROJ-50/issue" \\\\
  -d '{"issues": ["PROJ-101", "PROJ-102"]}'

# ============================================
# API AGILE - BACKLOG
# ============================================

# Voir le backlog d'un board
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/agile/1.0/board/1/backlog"

# Déplacer des issues vers le backlog (retirer du sprint)
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/agile/1.0/backlog/issue" \\\\
  -d '{"issues": ["PROJ-105", "PROJ-106"]}'

# Rank (réordonner) une issue
curl -s -u \\\${AUTH} -X PUT \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/agile/1.0/issue/rank" \\\\
  -d '{
    "issues": ["PROJ-102"],
    "rankBeforeIssue": "PROJ-101"
  }'
\\\`\\\`\\\`

### Kanban avec Jira

#### Principes Kanban

Kanban est une méthode de flux continu basée sur la **visualisation du travail** et la **limitation du travail en cours** (WIP - Work In Progress).

Principes clés :
- **Visualiser le flux** : chaque étape du processus est une colonne
- **Limiter le WIP** : max X items par colonne pour éviter la surcharge
- **Gérer le flux** : mesurer et optimiser le Lead Time
- **Expliciter les règles** : Definition of Done par colonne
- **Boucles de feedback** : réunions régulières d'amélioration
- **Amélioration continue** : expérimenter et mesurer

#### Configuration Kanban dans Jira

Colonnes typiques : Backlog → Selected → In Analysis → In Dev → Code Review → Testing → Done

Limites WIP recommandées :
- In Analysis : 2 items
- In Dev : nombre de développeurs
- Code Review : 3 items
- Testing : 2 items

#### Métriques Kanban

- **Lead Time** : temps total depuis la demande jusqu'à la livraison
- **Cycle Time** : temps depuis le début du travail jusqu'à la livraison
- **Throughput** : nombre d'items livrés par unité de temps
- **WIP** : nombre d'items en cours à un instant T
- **Loi de Little** : Lead Time = WIP / Throughput

### JQL (Jira Query Language) - Référence complète

JQL est le langage de requête de Jira permettant de rechercher des tickets avec des critères précis. C'est un outil indispensable pour tout utilisateur avancé de Jira.


#### Opérateurs JQL

| Opérateur | Description | Exemple |
|-----------|-------------|---------|
| = | Égal | status = "In Progress" |
| != | Différent | assignee != currentUser() |
| > | Supérieur | created > "2024-01-01" |
| < | Inférieur | priority < High |
| >= | Supérieur ou égal | updated >= -7d |
| <= | Inférieur ou égal | duedate <= endOfWeek() |
| ~ | Contient (texte) | summary ~ "authentification" |
| !~ | Ne contient pas | description !~ "obsolète" |
| IN | Dans une liste | status IN ("To Do", "In Progress") |
| NOT IN | Pas dans une liste | priority NOT IN (Low, Lowest) |
| IS | Est (null check) | assignee IS EMPTY |
| IS NOT | N'est pas | fixVersion IS NOT EMPTY |
| WAS | Était (historique) | status WAS "In Progress" |
| WAS IN | Était dans | status WAS IN ("In Progress", "In Review") |
| WAS NOT | N'était pas | assignee WAS NOT "john" |
| CHANGED | A changé | status CHANGED FROM "To Do" TO "In Progress" |

#### Fonctions JQL

\\\`\\\`\\\`
# Fonctions utilisateur
currentUser()            # L'utilisateur connecté
membersOf("group")       # Membres d'un groupe

# Fonctions de date
now()                    # Moment actuel
startOfDay()             # Début du jour (00:00)
startOfWeek()            # Début de la semaine (lundi)
startOfMonth()           # Premier jour du mois
startOfYear()            # Premier jour de l'année
endOfDay()               # Fin du jour (23:59)
endOfWeek()              # Fin de la semaine (dimanche)
endOfMonth()             # Dernier jour du mois
endOfYear()              # Dernier jour de l'année
# Avec offset : startOfDay(-1), startOfWeek(+1), endOfMonth(-2)

# Fonctions de sprint
openSprints()            # Sprints actifs
closedSprints()          # Sprints terminés
futureSprints()          # Sprints planifiés

# Fonctions de version
latestReleasedVersion()  # Dernière version publiée
earliestUnreleasedVersion()  # Prochaine version

# Fonctions de recherche
issueHistory()           # Issues vues récemment
votedIssues()            # Issues votées
watchedIssues()          # Issues surveillées
linkedIssues(KEY)        # Issues liées à KEY
subtasksOf(KEY)          # Sous-tâches de KEY
parentOf(KEY)            # Parent de KEY

# Fonction de modification
updatedBy("user", "date") # Modifié par user depuis date
\\\`\\\`\\\`

#### Champs JQL disponibles

\\\`\\\`\\\`
# Champs standards
project            # Projet (clé ou nom)
issuetype          # Type de ticket (Bug, Story, Task, Epic...)
status             # Statut actuel
statusCategory     # Catégorie de statut (To Do, In Progress, Done)
priority           # Priorité (Highest, High, Medium, Low, Lowest)
resolution         # Résolution (Unresolved, Done, Won't Do, Duplicate)
assignee           # Personne assignée
reporter           # Rapporteur
creator            # Créateur
summary            # Titre du ticket
description        # Description
comment            # Contenu des commentaires
labels             # Labels/étiquettes
component          # Composants
fixVersion         # Version de correction
affectedVersion    # Version affectée
sprint             # Sprint
"Epic Link"        # Epic parente
"Story Points"     # Points de story
created            # Date de création
updated            # Date de dernière modification
resolved           # Date de résolution
due                # Date d'échéance (Due Date)
duedate            # Alias de due
originalEstimate   # Estimation originale
remainingEstimate  # Estimation restante
timeSpent          # Temps passé
worklogDate        # Date de worklog
worklogAuthor      # Auteur du worklog
watcher            # Observateur
voter              # Votant
level              # Niveau de sécurité
parent             # Ticket parent
filter             # Filtre sauvegardé
\\\`\\\`\\\`

#### Exemples JQL complets (25+ requêtes essentielles)

\\\`\\\`\\\`
# === REQUÊTES DE BASE ===

# Mes tickets en cours
assignee = currentUser() AND status = "In Progress"

# Tickets non assignés dans mon projet
project = PROJ AND assignee IS EMPTY AND status != Done

# Bugs critiques non résolus
issuetype = Bug AND priority IN (Highest, High) AND resolution = Unresolved

# Tickets créés cette semaine
project = PROJ AND created >= startOfWeek()

# Tickets mis à jour récemment
updated >= -24h AND project = PROJ

# === REQUÊTES SPRINT ===

# Tickets du sprint actuel non terminés
sprint IN openSprints() AND status != Done AND project = PROJ

# Tickets ajoutés après le début du sprint (scope creep)
sprint IN openSprints() AND created > sprintStartDate()

# Tickets complétés dans le sprint
sprint IN openSprints() AND status = Done

# Travail restant dans le sprint
sprint IN openSprints() AND status != Done ORDER BY priority DESC, created ASC

# === REQUÊTES AVANCÉES ===

# Tickets bloqués depuis plus de 3 jours
status = "In Progress" AND status CHANGED TO "In Progress" BEFORE -3d

# Tickets sans estimation
project = PROJ AND issuetype = Story AND "Story Points" IS EMPTY AND sprint IN openSprints()

# Tickets avec commentaires de l'équipe QA
project = PROJ AND comment ~ "test" AND updatedBy("qa.lead")

# Epics non terminées avec des stories en retard
issuetype = Epic AND status != Done AND issueFunction IN hasSubtasks() 

# Tickets déplacés entre sprints (instabilité du scope)
project = PROJ AND sprint CHANGED

# Tickets réouverts (possibles problèmes de qualité)
status WAS Done AND status != Done

# Tickets en attente de review depuis plus de 2 jours
status = "In Review" AND status CHANGED TO "In Review" BEFORE -2d

# Tickets avec pièces jointes
project = PROJ AND attachments IS NOT EMPTY

# Tickets liés à une version spécifique
fixVersion = "2.0.0" AND status NOT IN (Done, Closed)

# Tickets par composant avec tri
component = Backend AND project = PROJ ORDER BY priority DESC, created ASC

# Tickets créés par le PO non encore planifiés
reporter = "product.owner" AND sprint IS EMPTY AND status = "To Do"

# Requête complexe : bugs critiques non résolus dans la version courante
project = PROJ AND issuetype = Bug AND priority >= High AND resolution = Unresolved AND fixVersion = earliestUnreleasedVersion(PROJ)

# Tickets modifiés par moi cette semaine
project = PROJ AND updatedBy(currentUser(), startOfWeek())

# Sous-tâches d'une epic spécifique
"Epic Link" = PROJ-100 AND issuetype IN subTaskIssueTypes()

# Combinaison AND/OR avec parenthèses
project = PROJ AND (priority = Critical OR (priority = High AND duedate < endOfWeek()))

# Tickets avec worklog cette semaine
worklogDate >= startOfWeek() AND worklogAuthor = currentUser()

# Tickets dans plusieurs projets
project IN (PROJ, DEV, OPS) AND status = "In Progress" AND assignee = currentUser()

# Recherche full-text dans résumé et description
project = PROJ AND (summary ~ "API REST" OR description ~ "API REST")

# ORDER BY complexe
project = PROJ AND status != Done ORDER BY priority DESC, duedate ASC, created ASC
\\\`\\\`\\\`

### Métriques et reporting Agile

#### Velocity Chart (Graphique de vélocité)
- Affiche les story points/tickets complétés vs engagés par sprint
- Permet d'estimer la capacité de l'équipe pour les prochains sprints
- Stabilisation attendue après 3-5 sprints

#### Burndown Chart
- Montre le travail restant dans le sprint (story points ou count)
- Ligne idéale vs progression réelle
- Alertes si l'équipe est en retard

#### Burnup Chart
- Montre le travail accompli et le scope total
- Permet de visualiser les changements de scope
- Projection de la date de complétion

#### Cumulative Flow Diagram (CFD)
- Visualise la quantité de travail dans chaque état au fil du temps
- Les bandes doivent rester stables (pas d'élargissement = pas de goulot)
- Lead Time = épaisseur horizontale totale
- WIP = épaisseur verticale des bandes "en cours"

#### Control Chart
- Affiche le cycle time de chaque ticket
- Permet d'identifier les outliers (tickets anormalement longs)
- Moyenne mobile pour tendance

### Dashboards et gadgets

\\\`\\\`\\\`bash
# Créer un filtre sauvegardé (requis pour les gadgets)
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/api/2/filter" \\\\
  -d '{
    "name": "Sprint actuel - En cours",
    "jql": "sprint IN openSprints() AND status = \"In Progress\" AND project = PROJ",
    "favourite": true
  }'

# Partager un filtre avec un groupe
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/api/2/filter/10001/permission" \\\\
  -d '{
    "type": "group",
    "groupname": "jira-developers"
  }'

# S'abonner à un filtre (notification par email)
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/api/2/filter/10001/subscription" \\\\
  -d '{
    "group": {"name": "jira-developers"},
    "cron": "0 0 8 * * ?"
  }'
\\\`\\\`\\\`

Gadgets de dashboard essentiels :
- **Filter Results** : liste de tickets depuis un filtre
- **Pie Chart** : répartition par champ (assignee, priority, status)
- **Two Dimensional Filter Statistics** : tableau croisé (type x status)
- **Created vs Resolved** : tendance création vs résolution
- **Sprint Burndown** : graphique burndown du sprint actif
- **Sprint Health** : santé du sprint (scope change, velocity)
- **Agile Wallboard** : vue simplifiée du board pour écran TV

`,
      practiceContent: `## Travaux pratiques - Scrum, Kanban et JQL

### TP1 : Configuration Scrum complète

1. Créer un board Scrum pour le projet FORM
2. Configurer les colonnes : Backlog, Selected, In Progress, In Review, Testing, Done
3. Créer un sprint "Sprint 1" (2 semaines)
4. Créer une Epic "Module Utilisateurs" avec 5 Stories (estimées en story points)
5. Planifier le sprint : déplacer les stories, définir le Sprint Goal
6. Simuler le déroulement du sprint (transitions, commentaires)
7. Fermer le sprint et analyser la vélocité

### TP2 : Configuration Kanban

1. Créer un board Kanban pour les tickets de support
2. Configurer les limites WIP (Analysis: 2, Dev: 3, Review: 2, Test: 2)
3. Ajouter des swimlanes par priorité
4. Créer 10 tickets de types variés
5. Simuler le flux et observer le CFD

### TP3 : Maîtrise JQL

Écrire les requêtes JQL pour :
1. Tous les bugs non résolus du projet triés par priorité
2. Les tickets assignés à l'équipe "developers" en cours depuis plus de 3 jours
3. Les stories sans estimation dans le sprint actuel
4. Les tickets créés cette semaine sans assignee
5. Les tickets réouverts (status was Done AND status != Done)
6. Complexe : bugs critiques OU tickets en retard (duedate < now())
7. Créer un filtre, le sauvegarder et le partager

### TP4 : Dashboard personnalisé

1. Créer un dashboard "Sprint Overview"
2. Ajouter les gadgets : Sprint Burndown, Filter Results, Pie Chart (par status)
3. Configurer un filtre pour chaque gadget
4. Partager le dashboard avec l'équipe

### Questions de validation

- Quelle est la différence entre Lead Time et Cycle Time ?
- Comment fonctionne la fonction openSprints() dans JQL ?
- Quels sont les opérateurs historiques (WAS, CHANGED) et quand les utiliser ?
- Comment configurer les limites WIP et pourquoi sont-elles importantes ?
- Quels sont les gadgets essentiels pour un dashboard Scrum ?`,
      keyPoints: JSON.stringify([
        'Scrum : sprints fixes, cérémonies (planning, daily, review, retro), rôles (PO, SM, Dev Team)',
        'Kanban : flux continu, limites WIP, visualisation, métriques (Lead Time, Cycle Time, Throughput)',
        'API Agile /rest/agile/1.0/ : CRUD boards, sprints (create/start/close), epics, backlog ranking',
        'JQL opérateurs : =, !=, ~, IN, IS, WAS, CHANGED - fonctions : currentUser(), openSprints(), startOfDay()',
        'JQL champs : project, status, priority, assignee, sprint, Epic Link, Story Points, created, updated',
        'Métriques Agile : Velocity Chart, Burndown/Burnup, CFD (Cumulative Flow), Control Chart',
        'Filtres JQL sauvegardés : base des dashboards, gadgets, abonnements email, board filters',
        'Dashboard gadgets : Filter Results, Pie Chart, Sprint Burndown, Created vs Resolved, Wallboard'
      ]) },


    { id: 'jira-03', courseId: 'jira', title: 'Administration avancée et automatisation', duration: '5h', orderIndex: 3,
      theoryContent: `## Administration avancée et automatisation Jira

### Schemes (Schémas de configuration)

Les schemes sont des modèles de configuration réutilisables qui s'appliquent aux projets. Ils permettent de standardiser la configuration entre plusieurs projets.

#### Permission Scheme (Schéma de permissions)
Définit QUI peut faire QUOI dans un projet :
- **Browse Projects** : voir le projet et ses tickets
- **Create Issues** : créer des tickets
- **Edit Issues** : modifier des tickets
- **Assign Issues** : assigner des tickets
- **Resolve Issues** : résoudre des tickets
- **Close Issues** : fermer des tickets
- **Delete Issues** : supprimer des tickets
- **Manage Sprints** : gérer les sprints
- **Administer Projects** : administrer le projet

Entités autorisables : utilisateur spécifique, groupe, rôle projet, reporter, assignee, lead

#### Notification Scheme (Schéma de notifications)
Définit QUI est notifié QUAND :
- Issue Created → Reporter, Assignee, Watchers
- Issue Updated → Reporter, Assignee, Watchers
- Issue Assigned → Assignee
- Issue Resolved → Reporter, Assignee
- Comment Added → All Watchers
- Issue Moved → Project Lead

#### Workflow Scheme
Associe chaque type de ticket à un workflow spécifique :
- Bug → Bug Workflow (Triage → In Progress → In Test → Verified → Done)
- Story → Story Workflow (To Do → In Progress → In Review → Done)
- Epic → Epic Workflow (To Do → In Progress → Done)

#### Issue Type Scheme
Définit les types de tickets disponibles dans un projet :
- Software : Epic, Story, Task, Bug, Sub-task
- Service Management : Incident, Service Request, Problem, Change
- Business : Task, Sub-task

#### Screen Scheme
Définit les écrans (champs affichés) pour chaque opération :
- Create Screen : champs à la création (summary, description, priority, assignee)
- Edit Screen : champs à l'édition (tous les champs)
- View Screen : champs en lecture (tous les champs + informations système)

#### Field Configuration Scheme
Définit le comportement des champs par type de ticket :
- Required / Optional
- Hidden / Visible
- Renderer (text, wiki, autocomplete)
- Default value
- Description (aide contextuelle)

### Custom Fields (Champs personnalisés)

\\\`\\\`\\\`bash
# ============================================
# GESTION DES CHAMPS PERSONNALISÉS VIA API
# ============================================

# Lister tous les champs (système + custom)
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/api/2/field" | python3 -m json.tool

# Créer un champ personnalisé
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/api/2/field" \\\\
  -d '{
    "name": "Environnement cible",
    "type": "com.atlassian.jira.plugin.system.customfieldtypes:select",
    "searcherKey": "com.atlassian.jira.plugin.system.customfieldtypes:selectsearcher",
    "description": "Environnement de déploiement cible"
  }'

# Types de champs personnalisés disponibles :
# - textfield : champ texte court
# - textarea : champ texte long
# - select : liste déroulante (choix unique)
# - multiselect : liste déroulante (choix multiples)
# - radiobuttons : boutons radio
# - multicheckboxes : cases à cocher
# - datepicker : sélecteur de date
# - datetime : date et heure
# - float : nombre décimal
# - userpicker : sélecteur d'utilisateur
# - multiuserpicker : sélecteur multi-utilisateurs
# - grouppicker : sélecteur de groupe
# - cascadingselect : sélection en cascade
# - labels : labels/étiquettes
# - url : champ URL

# Configurer les options d'un champ select
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/api/2/customField/10100/option" \\\\
  -d '{
    "options": [
      {"value": "Development"},
      {"value": "Staging"},
      {"value": "Pre-production"},
      {"value": "Production"}
    ]
  }'
\\\`\\\`\\\`

### Workflows avancés

#### Structure d'un workflow

\\\`\\\`\\\`
┌──────────────────────────────────────────────────────────────────────┐
│                    WORKFLOW AVANCÉ - Bug Lifecycle                     │
├──────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   ┌──────────┐  Create  ┌──────────┐  Start   ┌──────────────┐      │
│   │   OPEN   │─────────▶│  TRIAGE  │─────────▶│ IN PROGRESS  │      │
│   └──────────┘          └────┬─────┘          └──────┬───────┘      │
│                               │                       │               │
│                     Reject    │              Submit    │               │
│                               ▼                       ▼               │
│                        ┌───────────┐         ┌──────────────┐        │
│                        │  WON'T DO │         │  IN REVIEW   │        │
│                        └───────────┘         └──────┬───────┘        │
│                                                      │                │
│                                            Approve   │   Reject       │
│                                              ┌───────┴────────┐      │
│                                              ▼                ▼      │
│                                     ┌──────────────┐  ┌────────────┐ │
│                                     │  IN TESTING  │  │ IN PROGRESS│ │
│                                     └──────┬───────┘  └────────────┘ │
│                                             │                         │
│                                    Pass     │     Fail                │
│                                      ┌──────┴──────┐                 │
│                                      ▼             ▼                 │
│                               ┌──────────┐  ┌────────────┐          │
│                               │   DONE   │  │ IN PROGRESS│          │
│                               └──────────┘  └────────────┘          │
│                                                                        │
└──────────────────────────────────────────────────────────────────────┘
\\\`\\\`\\\`

#### Conditions de transition
- **Only Reporter** : seul le reporter peut effectuer la transition
- **Only Assignee** : seul l'assignee peut effectuer la transition
- **Permission Condition** : l'utilisateur doit avoir une permission spécifique
- **Sub-Tasks Done** : toutes les sous-tâches doivent être terminées
- **User Is In Group** : l'utilisateur doit appartenir à un groupe

#### Validators de transition
- **Permission Validator** : vérifier une permission
- **Field Required** : un champ doit être rempli
- **Regular Expression** : un champ doit matcher un pattern
- **Previous Status** : le ticket doit venir d'un statut spécifique

#### Post-functions de transition
- **Assign to Lead** : assigner au lead du projet
- **Assign to Reporter** : assigner au reporter
- **Update Field** : mettre à jour un champ automatiquement
- **Send Email** : envoyer un email de notification
- **Trigger Webhook** : appeler une URL externe
- **Fire Event** : déclencher un événement Jira

### Automation Rules - Guide complet

Les Automation Rules permettent d'automatiser des actions récurrentes dans Jira sans écrire de code.

#### Types de triggers (déclencheurs)

\\\`\\\`\\\`
# Triggers basés sur les tickets
- Issue created            # Quand un ticket est créé
- Issue updated            # Quand un ticket est modifié (tout champ)
- Issue transitioned       # Quand un ticket change de statut
- Issue assigned           # Quand un ticket est assigné
- Issue commented          # Quand un commentaire est ajouté
- Field value changed      # Quand un champ spécifique change
- Issue linked             # Quand un lien est créé
- Attachment added         # Quand une PJ est ajoutée
- Work logged              # Quand du temps est logué

# Triggers basés sur le temps
- Scheduled               # Exécution planifiée (cron)

# Triggers externes
- Incoming webhook        # Appel webhook entrant
- Manual trigger          # Déclenchement manuel depuis un ticket

# Triggers spéciaux
- Sprint started          # Quand un sprint démarre
- Sprint completed        # Quand un sprint est fermé
- Version released        # Quand une version est publiée
\\\`\\\`\\\`

#### Types de conditions

\\\`\\\`\\\`
# Conditions JQL
- JQL condition           # Le ticket matche une requête JQL

# Conditions sur les champs
- Issue fields condition  # Vérifier la valeur d'un champ
- User condition          # Vérifier l'utilisateur qui a déclenché
- Related issues condition# Vérifier les tickets liés/sous-tâches
- Advanced compare        # Comparaison avancée entre champs

# Conditions logiques
- If/else block           # Branchement conditionnel
- AND/OR conditions       # Combinaison de conditions
\\\`\\\`\\\`

#### Types d'actions

\\\`\\\`\\\`
# Actions sur le ticket courant
- Transition issue       # Changer le statut
- Edit issue fields      # Modifier des champs
- Assign issue           # Assigner à un utilisateur
- Add comment            # Ajouter un commentaire
- Add labels             # Ajouter des labels
- Log work               # Logger du temps
- Link issues            # Créer un lien
- Create sub-tasks       # Créer des sous-tâches

# Actions de notification
- Send email             # Envoyer un email
- Send Slack message     # Poster dans Slack
- Send MS Teams message  # Poster dans Teams
- Send webhook           # Appeler une URL

# Actions sur d'autres tickets
- Create issue           # Créer un nouveau ticket
- Edit linked issues     # Modifier les tickets liés
- Transition linked      # Transitionner les tickets liés

# Actions avancées
- Lookup issues (JQL)    # Rechercher d'autres tickets
- Create variable        # Créer une variable réutilisable
- Branch / condition     # Logique conditionnelle
\\\`\\\`\\\`


#### Exemples d'automatisation concrets

\\\`\\\`\\\`
# ============================================
# EXEMPLE 1 : Auto-assign bugs par composant
# ============================================
# Trigger : Issue created
# Condition : issuetype = Bug
# Action : IF component = "Backend" THEN assign to "backend.lead"
#          IF component = "Frontend" THEN assign to "frontend.lead"
#          IF component = "Infrastructure" THEN assign to "ops.lead"

# ============================================
# EXEMPLE 2 : Notification Slack quand bug critique
# ============================================
# Trigger : Issue created
# Condition : issuetype = Bug AND priority IN (Critical, Highest)
# Action : Send Slack message to #bugs-critiques
#          Message: "Bug critique créé: {{issue.key}} - {{issue.summary}}"

# ============================================
# EXEMPLE 3 : Auto-close inactive tickets
# ============================================
# Trigger : Scheduled (every day at 08:00)
# Condition : JQL = "status = 'Waiting for Info' AND updated < -14d"
# Action : Transition to "Closed"
#          Add comment: "Fermé automatiquement après 14 jours sans activité"

# ============================================
# EXEMPLE 4 : Sprint auto-management
# ============================================
# Trigger : Sprint completed
# Condition : Issue status != Done
# Action : Move to next sprint
#          Add comment: "Reporté au sprint suivant automatiquement"

# ============================================
# EXEMPLE 5 : Cascade status to parent
# ============================================
# Trigger : Issue transitioned to "Done"
# Condition : All sub-tasks are Done
# Action : Transition parent to "Done"

# ============================================
# EXEMPLE 6 : Auto-create sub-tasks template
# ============================================
# Trigger : Issue created
# Condition : issuetype = Story AND labels contains "standard-dev"
# Action : Create sub-tasks:
#          - "Code implementation"
#          - "Unit tests"
#          - "Code review"
#          - "Documentation update"

# ============================================
# EXEMPLE 7 : SLA Warning
# ============================================
# Trigger : Scheduled (every hour)
# Condition : JQL = "issuetype = Bug AND priority = Critical AND created < -4h AND status != Done"
# Action : Send email to team lead
#          Add comment: "SLA WARNING: Bug critique non résolu depuis 4h"

# ============================================
# EXEMPLE 8 : Release management
# ============================================
# Trigger : Version released
# Condition : None
# Action : Lookup issues with fixVersion = released version AND status != Done
#          Transition matching issues: add comment "Version released without completion"
#          Send email to project lead

# ============================================
# EXEMPLE 9 : PR merged - auto transition
# ============================================
# Trigger : Incoming webhook (from Bitbucket)
# Condition : webhook data contains issue key
# Action : Transition to "In Review" or "Done"
#          Add comment: "Code merged via PR #{{webhook.pr_id}}"

# ============================================
# EXEMPLE 10 : Duplicate detection notification
# ============================================
# Trigger : Issue created
# Condition : JQL lookup finds issues with similar summary (~ operator)
# Action : Add comment: "Possible duplicates found: {{lookup.issues}}"
#          Add label: "possible-duplicate"
\\\`\\\`\\\`

### Webhooks détaillés

\\\`\\\`\\\`bash
# ============================================
# CRÉATION ET GESTION DES WEBHOOKS
# ============================================

# Lister les webhooks existants
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/webhooks/1.0/webhook" | python3 -m json.tool

# Créer un webhook
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/webhooks/1.0/webhook" \\\\
  -d '{
    "name": "Jenkins Build Trigger",
    "url": "https://jenkins.example.com/generic-webhook-trigger/invoke?token=SECRET",
    "events": [
      "jira:issue_created",
      "jira:issue_updated",
      "jira:issue_deleted",
      "comment_created",
      "comment_updated",
      "issuelink_created",
      "sprint_started",
      "sprint_closed",
      "board_created"
    ],
    "filters": {
      "issue-related-events-section": "project = PROJ AND issuetype in (Bug, Story)"
    },
    "excludeBody": false
  }'

# Événements webhook disponibles :
# - jira:issue_created
# - jira:issue_updated
# - jira:issue_deleted
# - comment_created
# - comment_updated
# - comment_deleted
# - issuelink_created
# - issuelink_deleted
# - worklog_created
# - worklog_updated
# - worklog_deleted
# - sprint_created
# - sprint_started
# - sprint_closed
# - sprint_deleted
# - sprint_updated
# - board_created
# - board_updated
# - board_deleted
# - project_created
# - project_updated
# - project_deleted
# - user_created
# - user_updated
# - user_deleted
# - option_voting_changed
# - option_watching_changed
# - option_unassigned_issues_changed

# Supprimer un webhook
curl -s -u \\\${AUTH} -X DELETE "\\\${JIRA_URL}/rest/webhooks/1.0/webhook/1"
\\\`\\\`\\\`

### Intégration avec l'écosystème

#### Jira + Bitbucket
- Smart Commits (ex: PROJ-123 #comment Fixing bug #done #time 2h)
- Development panel dans Jira (branches, commits, PRs)
- Merge checks basés sur le statut Jira
- Webhooks bidirectionnels

#### Jira + Jenkins
- Jira Steps plugin dans les Jenkinsfiles
- Création/mise à jour de tickets depuis le pipeline
- Build status affiché dans Jira
- Déclenchement de builds via webhook Jira

#### Jira + Confluence
- Macro Jira dans les pages Confluence
- Lien bidirectionnel ticket ↔ page
- Release notes automatiques

### Backup et restauration

\\\`\\\`\\\`bash
# ============================================
# BACKUP JIRA
# ============================================

# Backup de la base de données PostgreSQL
pg_dump -h localhost -U jirauser -d jiradb -F c -f /backup/jiradb_\\\$(date +%Y%m%d).dump

# Backup du JIRA_HOME (attachments, plugins, config)
tar -czf /backup/jira_home_\\\$(date +%Y%m%d).tar.gz /var/atlassian/application-data/jira/

# Script de backup automatisé
cat > /opt/scripts/jira-backup.sh << 'SCRIPT'
#!/bin/bash
BACKUP_DIR="/backup/jira"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p \\\${BACKUP_DIR}

# Backup database
pg_dump -h localhost -U jirauser -d jiradb -F c -f \\\${BACKUP_DIR}/db_\\\${DATE}.dump

# Backup home directory
tar -czf \\\${BACKUP_DIR}/home_\\\${DATE}.tar.gz /var/atlassian/application-data/jira/

# Retention : garder 7 jours
find \\\${BACKUP_DIR} -name "*.dump" -mtime +7 -delete
find \\\${BACKUP_DIR} -name "*.tar.gz" -mtime +7 -delete
SCRIPT
chmod +x /opt/scripts/jira-backup.sh

# Cron pour backup quotidien à 2h du matin
echo "0 2 * * * /opt/scripts/jira-backup.sh" | crontab -

# ============================================
# RESTAURATION JIRA
# ============================================

# Arrêter Jira
sudo systemctl stop jira

# Restaurer la base de données
dropdb -h localhost -U postgres jiradb
createdb -h localhost -U postgres -O jirauser -E UNICODE jiradb
pg_restore -h localhost -U jirauser -d jiradb /backup/jiradb_20240301.dump

# Restaurer le JIRA_HOME
rm -rf /var/atlassian/application-data/jira/*
tar -xzf /backup/jira_home_20240301.tar.gz -C /

# Redémarrer Jira
sudo systemctl start jira
# Réindexer (Administration > Indexing > Full re-index)
\\\`\\\`\\\`

### Performance tuning

\\\`\\\`\\\`bash
# ============================================
# OPTIMISATION PERFORMANCE
# ============================================

# JVM - Recommandations production
JVM_MINIMUM_MEMORY="4096m"    # 50% de la RAM disponible
JVM_MAXIMUM_MEMORY="4096m"    # Même valeur que min (éviter resize)

# Base de données - PostgreSQL tuning
# postgresql.conf optimisé pour Jira
shared_buffers = 2GB                    # 25% de la RAM
effective_cache_size = 6GB              # 75% de la RAM
work_mem = 256MB
maintenance_work_mem = 512MB
max_connections = 200
checkpoint_completion_target = 0.9
wal_buffers = 64MB
default_statistics_target = 100
random_page_cost = 1.1                  # SSD
effective_io_concurrency = 200          # SSD

# Monitoring endpoints
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/api/2/serverInfo"
curl -s "\\\${JIRA_URL}/status"

# Vérifier les threads
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/scriptrunner/latest/custom/threadDump"

# Index health
# Administration > System > Indexing > Check index consistency
\\\`\\\`\\\`

### Gestion des plugins/apps

\\\`\\\`\\\`bash
# Lister les plugins installés
curl -s -u \\\${AUTH} "\\\${JIRA_URL}/rest/plugins/1.0/" | python3 -m json.tool

# Installer un plugin depuis le Marketplace
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/plugins/1.0/" \\\\
  -d '{"pluginUri": "https://marketplace.atlassian.com/download/plugins/..."}'

# Activer/Désactiver un plugin
curl -s -u \\\${AUTH} -X PUT \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/plugins/1.0/plugin-key/modules/module-key" \\\\
  -d '{"enabled": false}'

# Plugins essentiels recommandés :
# - ScriptRunner : scripts Groovy pour automatisation avancée
# - Tempo Timesheets : suivi du temps avancé
# - BigPicture : gestion de programme (multiple projets)
# - Xray : gestion des tests intégrée
# - Structure : hiérarchie et dépendances visuelles
\\\`\\\`\\\`

`,
      practiceContent: `## Travaux pratiques - Administration avancée

### TP1 : Configuration des schemes

1. Créer un Permission Scheme personnalisé
2. Configurer : qui peut créer, éditer, assigner, résoudre les tickets
3. Créer un Notification Scheme (notifications par rôle)
4. Associer les schemes au projet FORM

### TP2 : Workflows avancés

1. Créer un workflow "Bug Lifecycle" avec les statuts : Open, Triage, In Progress, In Review, In Testing, Done, Won't Do
2. Configurer les transitions avec conditions (seul l'assignee peut progresser)
3. Ajouter des validators (champ "Resolution" requis pour fermer)
4. Configurer des post-functions (email au reporter quand résolu)

### TP3 : Automation Rules

1. Créer une règle : auto-assign bugs par composant
2. Créer une règle : notification Slack pour bugs critiques
3. Créer une règle : fermeture automatique des tickets inactifs (14 jours)
4. Créer une règle : création automatique de sub-tasks pour les Stories
5. Créer une règle : cascade du statut parent quand toutes les sub-tasks sont Done

### TP4 : Webhooks et intégration

1. Configurer un webhook vers un endpoint de test (webhook.site)
2. Vérifier le payload JSON envoyé lors de la création d'un ticket
3. Filtrer le webhook pour n'envoyer que les bugs du projet FORM
4. Simuler l'intégration Jenkins : déclencher un build via webhook

### TP5 : Backup et monitoring

1. Écrire un script de backup complet (BDD + JIRA_HOME)
2. Configurer un cron pour backup quotidien
3. Tester la restauration sur une instance Docker de test
4. Configurer les alertes de monitoring (health check)

### Questions de validation

- Quelle est la différence entre un Permission Scheme et un Security Scheme ?
- Comment fonctionnent les post-functions dans un workflow ?
- Quels sont les triggers disponibles pour les Automation Rules ?
- Comment sécuriser les webhooks (token, IP whitelist) ?
- Quel est le processus de restauration après un crash complet ?`,
      keyPoints: JSON.stringify([
        'Schemes : Permission, Notification, Workflow, Issue Type, Screen, Field Configuration - réutilisables entre projets',
        'Custom Fields : 15+ types (text, select, multi, date, user, cascade) avec contextes et options configurables',
        'Workflows avancés : conditions (qui), validators (vérifications), post-functions (automatisations)',
        'Automation Rules : triggers (30+) + conditions (JQL, champs, utilisateur) + actions (transition, email, webhook)',
        'Webhooks : 25+ événements (issue, comment, sprint, project) avec filtrage JQL et payloads JSON',
        'Intégrations : Bitbucket (Smart Commits), Jenkins (build status), Confluence (macros bidirectionnelles)',
        'Backup : pg_dump (BDD) + tar (JIRA_HOME) + script cron quotidien + rétention 7 jours',
        'Performance : JVM G1GC tuning, PostgreSQL shared_buffers/work_mem, indexing, plugin management'
      ]) },



    // ==================== CONFLUENCE ====================
    { id: 'conf-01', courseId: 'confluence', title: 'Introduction complète à Confluence', duration: '4h', orderIndex: 1,
      theoryContent: `## Introduction complète à Confluence

### Présentation et historique

**Confluence** est la plateforme de documentation collaborative et de gestion des connaissances développée par **Atlassian** depuis **2004**. C'est le wiki d'entreprise le plus utilisé au monde, avec plus de **75 000 organisations** qui l'utilisent pour centraliser leur documentation technique, leurs processus et leurs décisions.

Historique de Confluence :
- **2004** : Première version, wiki d'entreprise simple
- **2007** : Introduction des Spaces et de la hiérarchie de pages
- **2011** : Éditeur WYSIWYG amélioré
- **2014** : Blueprints et Templates avancés
- **2016** : Confluence Cloud avec nouveau design
- **2018** : Collaborative editing (édition simultanée)
- **2020** : Analytics et insights
- **2023** : Confluence Whiteboards et Databases
- **2024** : Intelligence Artificielle intégrée (Atlassian Intelligence)

### Concepts fondamentaux

#### Spaces (Espaces)
Un espace est un conteneur de haut niveau pour organiser le contenu :
- **Space global** : visible par tous les utilisateurs autorisés (documentation projet, équipe, département)
- **Space personnel** : espace privé d'un utilisateur (brouillons, notes personnelles)
- **Space archivé** : espace conservé en lecture seule

Chaque espace possède :
- Une **clé unique** (ex: DEV, OPS, HR)
- Une **page d'accueil** (Overview)
- Une **sidebar** de navigation
- Un **blog** intégré
- Des **permissions** propres

#### Pages
- Organisation hiérarchique (arbre de pages parent/enfant)
- Versioning automatique (chaque sauvegarde = nouvelle version)
- Éditeur WYSIWYG riche avec macros
- Format de stockage : XHTML (Storage Format)
- Restrictions d'accès (view, edit) par page
- Labels pour la catégorisation transverse

#### Blogs
- Articles chronologiques (date-stamped)
- Utiles pour : annonces, rapports d'incident, newsletters, notes de réunion
- Apparaissent dans le fil d'activité de l'espace

#### Templates et Blueprints
- **Template** : modèle de page réutilisable avec variables
- **Blueprint** : template + workflow guidé (ex: meeting notes avec participants, action items)
- Templates globaux (tous les espaces) ou par espace
- Variables : @mentionDate, texte libre, liste, tableau pré-rempli

#### Macros
Blocs de contenu dynamique insérés dans les pages (80+ macros disponibles) :
- Mise en page : section, column, panel, expand, div
- Contenu : toc, children, include, excerpt, recently-updated
- Intégration : jira, roadmap, status
- Développement : code, noformat, anchor
- Interactif : task-list, status badge, user mention

### Architecture Confluence

\\\`\\\`\\\`
┌─────────────────────────────────────────────────────────────────────┐
│              CONFLUENCE DATA CENTER ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   ┌─────────────┐      ┌──────────────────────────────────┐         │
│   │   Clients   │      │         Load Balancer             │         │
│   │  (Browser)  │─────▶│      (Nginx/HAProxy)              │         │
│   └─────────────┘      └──────────┬───────────────────────┘         │
│                                    │                                  │
│                     ┌──────────────┼──────────────┐                  │
│                     ▼              ▼              ▼                  │
│            ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│            │  Confluence  │ │  Confluence  │ │  Confluence  │       │
│            │   Node #1    │ │   Node #2    │ │   Node #3    │       │
│            │  Port 8090   │ │  Port 8090   │ │  Port 8090   │       │
│            │  Sync: 8091  │ │  Sync: 8091  │ │  Sync: 8091  │       │
│            └──────┬───────┘ └──────┬───────┘ └──────┬───────┘       │
│                   │                │                │                 │
│            ┌──────┴────────────────┴────────────────┴──────┐        │
│            │          Shared Filesystem (NFS/EFS)            │        │
│            │  /confluence-shared (attachments, icons, etc)   │        │
│            └────────────────────────────────────────────────┘        │
│                                                                       │
│            ┌────────────────────────────────────────────────┐        │
│            │            PostgreSQL Database                   │        │
│            │     Primary + Streaming Replica                 │        │
│            │     Port 5432 | Database: confluencedb          │        │
│            └────────────────────────────────────────────────┘        │
│                                                                       │
│            ┌────────────────────────────────────────────────┐        │
│            │         Synchrony (Collaborative Editing)       │        │
│            │         Port 8091 (WebSocket)                   │        │
│            └────────────────────────────────────────────────┘        │
│                                                                       │
│            ┌────────────────────────────────────────────────┐        │
│            │           Elasticsearch (Search)                │        │
│            │           Port 9200/9300                        │        │
│            └────────────────────────────────────────────────┘        │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
\\\`\\\`\\\`

### Installation complète sur Linux

#### Prérequis système

\\\`\\\`\\\`bash
# ============================================
# PREREQUIS CONFLUENCE SERVER/DATA CENTER
# ============================================

# Vérification système
free -h                # Minimum 4 Go RAM (8 Go+ recommandé production)
df -h                  # Minimum 10 Go disque
nproc                  # Minimum 2 CPU

# Installation Java 17 - Ubuntu/Debian
sudo apt update && sudo apt upgrade -y
sudo apt install -y openjdk-17-jdk wget curl unzip

# Installation Java 17 - CentOS/RHEL
sudo yum install -y java-17-openjdk java-17-openjdk-devel wget curl unzip

java -version
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64

# Ports requis
# 8090 - Interface web Confluence (HTTP)
# 8091 - Synchrony (collaborative editing)
# 5432 - PostgreSQL
# 25   - SMTP (notifications email)
\\\`\\\`\\\`

#### Installation PostgreSQL

\\\`\\\`\\\`bash
# ============================================
# BASE DE DONNÉES POSTGRESQL POUR CONFLUENCE
# ============================================

# Installation PostgreSQL 14 (Ubuntu)
sudo apt install -y postgresql-14

sudo systemctl start postgresql
sudo systemctl enable postgresql

# Créer utilisateur et base
sudo -u postgres psql << 'EOSQL'
CREATE USER confluenceuser WITH PASSWORD 'ConfluencePass123!';
CREATE DATABASE confluencedb WITH ENCODING 'UNICODE' LC_COLLATE 'C' LC_CTYPE 'C' TEMPLATE template0 OWNER confluenceuser;
GRANT ALL PRIVILEGES ON DATABASE confluencedb TO confluenceuser;
\q
EOSQL

# Configuration pg_hba.conf
# host  confluencedb  confluenceuser  127.0.0.1/32  scram-sha-256

sudo systemctl restart postgresql

# Test de connexion
psql -h localhost -U confluenceuser -d confluencedb -c "SELECT 1;"
\\\`\\\`\\\`


#### Installation Confluence Server

\\\`\\\`\\\`bash
# ============================================
# INSTALLATION CONFLUENCE - Méthode bin installer
# ============================================

# Créer l'utilisateur système
sudo useradd -r -m -U -d /opt/atlassian/confluence -s /bin/bash confluence

# Télécharger l'installeur
cd /tmp
wget https://product-downloads.atlassian.com/software/confluence/downloads/atlassian-confluence-8.7.0-x64.bin
chmod +x atlassian-confluence-8.7.0-x64.bin

# Installation interactive
sudo ./atlassian-confluence-8.7.0-x64.bin

# Répertoires après installation :
# /opt/atlassian/confluence/              - Application
# /var/atlassian/application-data/confluence/  - CONFLUENCE_HOME (données)
# /opt/atlassian/confluence/conf/         - Configuration Tomcat
# /opt/atlassian/confluence/bin/          - Scripts

# ============================================
# SERVICE SYSTEMD
# ============================================

sudo cat > /etc/systemd/system/confluence.service << 'EOF'
[Unit]
Description=Atlassian Confluence
After=network.target postgresql.service
Requires=postgresql.service

[Service]
Type=forking
User=confluence
Group=confluence
Environment=JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
Environment=CONFLUENCE_HOME=/var/atlassian/application-data/confluence
ExecStart=/opt/atlassian/confluence/bin/start-confluence.sh
ExecStop=/opt/atlassian/confluence/bin/stop-confluence.sh
Restart=on-failure
RestartSec=10
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable confluence
sudo systemctl start confluence
sudo systemctl status confluence

# Vérifier le démarrage
sudo tail -f /var/atlassian/application-data/confluence/logs/atlassian-confluence.log
# Attendre "Confluence is ready to serve"
# Accéder à http://localhost:8090 pour le wizard de configuration
\\\`\\\`\\\`

#### Configuration JVM

\\\`\\\`\\\`bash
# ============================================
# TUNING JVM - /opt/atlassian/confluence/bin/setenv.sh
# ============================================

# Configuration recommandée pour production
CATALINA_OPTS="-Xms2048m -Xmx4096m"
CATALINA_OPTS="\\\${CATALINA_OPTS} -XX:+UseG1GC"
CATALINA_OPTS="\\\${CATALINA_OPTS} -XX:MaxGCPauseMillis=200"
CATALINA_OPTS="\\\${CATALINA_OPTS} -XX:+ParallelRefProcEnabled"
CATALINA_OPTS="\\\${CATALINA_OPTS} -XX:+DisableExplicitGC"
CATALINA_OPTS="\\\${CATALINA_OPTS} -XX:+HeapDumpOnOutOfMemoryError"
CATALINA_OPTS="\\\${CATALINA_OPTS} -XX:HeapDumpPath=/var/atlassian/application-data/confluence/logs/"
CATALINA_OPTS="\\\${CATALINA_OPTS} -Djava.awt.headless=true"
CATALINA_OPTS="\\\${CATALINA_OPTS} -Dsynchrony.memory.max=2g"
\\\`\\\`\\\`

#### Installation Docker Compose

\\\`\\\`\\\`bash
# ============================================
# DOCKER COMPOSE - Confluence + PostgreSQL
# ============================================

mkdir -p /opt/confluence-docker && cd /opt/confluence-docker

cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  confluence:
    image: atlassian/confluence:8.7
    container_name: confluence
    ports:
      - "8090:8090"
      - "8091:8091"
    environment:
      - ATL_JDBC_URL=jdbc:postgresql://db:5432/confluencedb
      - ATL_JDBC_USER=confluenceuser
      - ATL_JDBC_PASSWORD=ConfluencePass123!
      - ATL_DB_TYPE=postgresql
      - JVM_MINIMUM_MEMORY=2048m
      - JVM_MAXIMUM_MEMORY=4096m
      - ATL_PROXY_NAME=confluence.example.com
      - ATL_PROXY_PORT=443
      - ATL_TOMCAT_SCHEME=https
      - ATL_TOMCAT_SECURE=true
    volumes:
      - confluence-data:/var/atlassian/application-data/confluence
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:14-alpine
    container_name: confluence-db
    environment:
      - POSTGRES_USER=confluenceuser
      - POSTGRES_PASSWORD=ConfluencePass123!
      - POSTGRES_DB=confluencedb
    volumes:
      - postgres-data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  confluence-data:
  postgres-data:
EOF

docker-compose up -d
docker-compose logs -f confluence
\\\`\\\`\\\`

#### Reverse Proxy Nginx

\\\`\\\`\\\`bash
# ============================================
# NGINX REVERSE PROXY POUR CONFLUENCE
# ============================================

sudo cat > /etc/nginx/sites-available/confluence << 'EOF'
upstream confluence_backend {
    server 127.0.0.1:8090;
}

upstream synchrony_backend {
    server 127.0.0.1:8091;
}

server {
    listen 80;
    server_name confluence.example.com;
    return 301 https://\\\$host\\\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name confluence.example.com;

    ssl_certificate /etc/letsencrypt/live/confluence.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/confluence.example.com/privkey.pem;

    client_max_body_size 200m;
    proxy_read_timeout 600s;

    location / {
        proxy_pass http://confluence_backend;
        proxy_set_header Host \\\$host;
        proxy_set_header X-Real-IP \\\$remote_addr;
        proxy_set_header X-Forwarded-For \\\$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }

    location /synchrony {
        proxy_pass http://synchrony_backend/synchrony;
        proxy_set_header Host \\\$host;
        proxy_set_header X-Real-IP \\\$remote_addr;
        proxy_set_header X-Forwarded-For \\\$proxy_add_x_forwarded_for;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \\\$http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/confluence /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
\\\`\\\`\\\`

### API REST Confluence - Référence complète

\\\`\\\`\\\`bash
# ============================================
# VARIABLES DE BASE
# ============================================
CONF_URL="https://confluence.example.com"
AUTH="admin:password"

# ============================================
# SPACES (ESPACES) - CRUD COMPLET
# ============================================

# Lister tous les espaces
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/space" | python3 -m json.tool

# Lister avec filtres
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/space?type=global&limit=100"

# Obtenir un espace spécifique avec détails
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/space/DEV?expand=description.plain,homepage"

# Créer un espace global
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${CONF_URL}/rest/api/space" \\\\
  -d '{
    "key": "DEVOPS",
    "name": "DevOps Documentation",
    "description": {
      "plain": {"value": "Documentation technique de l equipe DevOps", "representation": "plain"}
    },
    "type": "global"
  }'

# Créer un espace personnel
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${CONF_URL}/rest/api/space/_private" \\\\
  -d '{
    "key": "~username",
    "name": "Notes personnelles"
  }'

# Mettre à jour un espace
curl -s -u \\\${AUTH} -X PUT \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${CONF_URL}/rest/api/space/DEVOPS" \\\\
  -d '{
    "name": "DevOps - Documentation Technique",
    "description": {"plain": {"value": "Nouvelle description", "representation": "plain"}},
    "homepage": {"id": "12345678"}
  }'

# Supprimer un espace (ATTENTION - irréversible)
curl -s -u \\\${AUTH} -X DELETE "\\\${CONF_URL}/rest/api/space/DEVOPS"


# ============================================
# PAGES (CONTENU) - CRUD COMPLET
# ============================================

# Lister les pages d'un espace
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/content?spaceKey=DEVOPS&type=page&limit=50"

# Obtenir une page avec tout son contenu
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/content/12345678?expand=body.storage,version,ancestors,children.page"

# Créer une page
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${CONF_URL}/rest/api/content" \\\\
  -d '{
    "type": "page",
    "title": "Guide Installation Jenkins",
    "space": {"key": "DEVOPS"},
    "body": {
      "storage": {
        "value": "<h2>Installation</h2><p>Guide pas a pas pour installer Jenkins sur Ubuntu.</p><ac:structured-macro ac:name=\"code\"><ac:parameter ac:name=\"language\">bash</ac:parameter><ac:plain-text-body><![CDATA[sudo apt install jenkins]]></ac:plain-text-body></ac:structured-macro>",
        "representation": "storage"
      }
    },
    "ancestors": [{"id": "98765"}]
  }'

# Créer une page enfant (sous-page)
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${CONF_URL}/rest/api/content" \\\\
  -d '{
    "type": "page",
    "title": "Configuration avancée",
    "space": {"key": "DEVOPS"},
    "ancestors": [{"id": "12345678"}],
    "body": {
      "storage": {
        "value": "<p>Contenu de la sous-page</p>",
        "representation": "storage"
      }
    }
  }'

# Mettre à jour une page (IMPORTANT : incrémenter le numéro de version)
curl -s -u \\\${AUTH} -X PUT \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${CONF_URL}/rest/api/content/12345678" \\\\
  -d '{
    "version": {"number": 2},
    "title": "Guide Installation Jenkins - Mise à jour",
    "type": "page",
    "body": {
      "storage": {
        "value": "<h2>Installation v2</h2><p>Guide mis a jour avec Docker.</p>",
        "representation": "storage"
      }
    }
  }'

# Supprimer une page
curl -s -u \\\${AUTH} -X DELETE "\\\${CONF_URL}/rest/api/content/12345678"

# Déplacer une page (changer de parent)
curl -s -u \\\${AUTH} -X PUT \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${CONF_URL}/rest/api/content/12345678" \\\\
  -d '{
    "version": {"number": 3},
    "title": "Guide Installation Jenkins",
    "type": "page",
    "ancestors": [{"id": "NEW_PARENT_ID"}]
  }'

# Copier une page
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${CONF_URL}/rest/api/content/12345678/copy" \\\\
  -d '{
    "destination": {"type": "parent_page", "value": "DEST_PAGE_ID"},
    "copyAttachments": true,
    "copyLabels": true
  }'

# ============================================
# ATTACHMENTS (PIÈCES JOINTES)
# ============================================

# Lister les attachments d'une page
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/content/12345678/child/attachment"

# Uploader un attachment
curl -s -u \\\${AUTH} -X PUT \\\\
  -H "X-Atlassian-Token: nocheck" \\\\
  -F "file=@/path/to/document.pdf" \\\\
  -F "comment=Version initiale du document" \\\\
  "\\\${CONF_URL}/rest/api/content/12345678/child/attachment"

# ============================================
# COMMENTAIRES
# ============================================

# Ajouter un commentaire à une page
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${CONF_URL}/rest/api/content" \\\\
  -d '{
    "type": "comment",
    "container": {"id": "12345678", "type": "page"},
    "body": {
      "storage": {
        "value": "<p>Commentaire sur cette page. <ac:link><ri:user ri:userkey=\"user123\"/></ac:link> peux-tu vérifier ?</p>",
        "representation": "storage"
      }
    }
  }'

# ============================================
# LABELS (ÉTIQUETTES)
# ============================================

# Obtenir les labels d'une page
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/content/12345678/label"

# Ajouter des labels
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${CONF_URL}/rest/api/content/12345678/label" \\\\
  -d '[
    {"prefix": "global", "name": "jenkins"},
    {"prefix": "global", "name": "installation"},
    {"prefix": "global", "name": "devops"}
  ]'

# Supprimer un label
curl -s -u \\\${AUTH} -X DELETE "\\\${CONF_URL}/rest/api/content/12345678/label/jenkins"

# ============================================
# CQL (Confluence Query Language)
# ============================================

# Recherche avec CQL
curl -s -u \\\${AUTH} -G \\\\
  --data-urlencode "cql=space = DEVOPS AND type = page AND label = jenkins" \\\\
  --data-urlencode "limit=25" \\\\
  "\\\${CONF_URL}/rest/api/content/search"

# Exemples CQL :
# Toutes les pages d'un espace
# cql=space = "DEVOPS" AND type = page

# Pages modifiées récemment
# cql=space = "DEVOPS" AND lastModified > now("-7d")

# Pages avec un label spécifique
# cql=label = "architecture" AND type = page

# Pages créées par un utilisateur
# cql=creator = "john.doe" AND type = page

# Recherche full-text
# cql=text ~ "kubernetes deployment" AND space = "DEVOPS"

# Pages parentes d'un niveau
# cql=ancestor = "12345678" AND type = page

# Blog posts récents
# cql=type = blogpost AND space = "DEVOPS" AND created > now("-30d")

# ============================================
# RESTRICTIONS (PERMISSIONS PAR PAGE)
# ============================================

# Obtenir les restrictions d'une page
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/content/12345678/restriction"

# Ajouter une restriction de lecture
curl -s -u \\\${AUTH} -X PUT \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${CONF_URL}/rest/api/content/12345678/restriction" \\\\
  -d '[{
    "operation": "read",
    "restrictions": {
      "user": [{"type": "known", "username": "admin"}],
      "group": [{"type": "group", "name": "confluence-admins"}]
    }
  }]'

# ============================================
# TEMPLATES
# ============================================

# Lister les templates d'un espace
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/template/page?spaceKey=DEVOPS"

# Créer un template
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${CONF_URL}/rest/api/template" \\\\
  -d '{
    "name": "Architecture Decision Record",
    "templateType": "page",
    "space": {"key": "DEVOPS"},
    "body": {
      "storage": {
        "value": "<h2>Contexte</h2><p>Decrire le contexte...</p><h2>Decision</h2><p>La decision prise...</p><h2>Consequences</h2><p>Les impacts...</p>",
        "representation": "storage"
      }
    }
  }'

# ============================================
# GESTION UTILISATEURS
# ============================================

# Rechercher un utilisateur
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/user?username=john.doe"

# Lister les groupes
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/group"

# Membres d'un groupe
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/group/confluence-users/member"
\\\`\\\`\\\`

### Storage Format (Format XHTML)

Le contenu des pages Confluence est stocké en XHTML avec des macros Atlassian. Voici les balises principales :

\\\`\\\`\\\`
Balises de base :
<p>Paragraphe</p>
<h1>Titre 1</h1> ... <h6>Titre 6</h6>
<strong>Gras</strong>
<em>Italique</em>
<a href="url">Lien externe</a>
<ul><li>Liste non ordonnée</li></ul>
<ol><li>Liste ordonnée</li></ol>
<table><tr><th>Header</th><td>Cell</td></tr></table>

Liens internes :
<ac:link><ri:page ri:content-title="Page Title"/></ac:link>
<ac:link><ri:page ri:space-key="SPACE" ri:content-title="Title"/></ac:link>
<ac:link><ri:user ri:userkey="userkey123"/></ac:link>

Macros :
<ac:structured-macro ac:name="code">
  <ac:parameter ac:name="language">bash</ac:parameter>
  <ac:plain-text-body><![CDATA[echo "Hello World"]]></ac:plain-text-body>
</ac:structured-macro>

<ac:structured-macro ac:name="info">
  <ac:rich-text-body><p>Information importante</p></ac:rich-text-body>
</ac:structured-macro>

<ac:structured-macro ac:name="toc"/>

<ac:structured-macro ac:name="children"/>

<ac:structured-macro ac:name="jira">
  <ac:parameter ac:name="jqlQuery">project = PROJ AND status != Done</ac:parameter>
</ac:structured-macro>
\\\`\\\`\\\`

`,
      practiceContent: `## Travaux pratiques - Introduction à Confluence

### TP1 : Installation et configuration

1. Installer Confluence via Docker Compose
2. Compléter le wizard de configuration
3. Créer un espace "DevOps Documentation" (clé: DEVOPS)
4. Configurer la page d'accueil avec une description du projet

### TP2 : Création de contenu via API

1. Créer une hiérarchie de pages :
   - Page racine "Infrastructure"
     - Sous-page "Serveurs"
     - Sous-page "Réseau"
     - Sous-page "Monitoring"
2. Ajouter du contenu avec macros (code, info, warning)
3. Ajouter des labels à chaque page
4. Uploader des attachments (diagrammes)

### TP3 : Organisation et recherche

1. Utiliser CQL pour rechercher toutes les pages avec le label "infrastructure"
2. Créer un template "Procédure opérationnelle"
3. Créer une page depuis le template
4. Configurer des restrictions (page visible uniquement par le groupe "ops-team")

### TP4 : Intégration Jira

1. Créer une page avec la macro Jira (afficher les bugs ouverts)
2. Lier une page Confluence à un ticket Jira
3. Tester la recherche CQL cross-space

### Questions de validation

- Quelle est la différence entre un Space global et personnel ?
- Comment fonctionne le versioning des pages ?
- Qu est-ce que le Storage Format et pourquoi est-il important ?
- Comment configurer le reverse proxy pour Synchrony (port 8091) ?
- Quels sont les opérateurs CQL disponibles ?`,
      keyPoints: JSON.stringify([
        'Confluence est le wiki entreprise leader (75K+ orgs) pour documentation collaborative depuis 2004',
        'Concepts clés : Spaces (global/personnel), Pages (hiérarchie versionnée), Blogs, Templates, Macros',
        'Installation Linux : Java 17 + PostgreSQL + bin installer + systemd + Synchrony (port 8091)',
        'API REST /rest/api/ : CRUD spaces, content (pages), attachments, labels, comments, restrictions',
        'CQL (Confluence Query Language) : recherche par space, type, label, creator, text, lastModified',
        'Storage Format XHTML : balises HTML + macros Atlassian (ac:structured-macro, ri:page, ri:user)',
        'Docker Compose : Confluence + PostgreSQL + Synchrony pour édition collaborative temps réel',
        'Reverse Proxy Nginx : configuration HTTP + WebSocket (Synchrony) avec SSL/TLS'
      ]) },


    { id: 'conf-02', courseId: 'confluence', title: 'Organisation avancée et collaboration', duration: '4h', orderIndex: 2,
      theoryContent: `## Organisation avancée et collaboration dans Confluence

### Stratégies d'organisation du contenu

#### Pattern 1 : Organisation par équipe
\\\`\\\`\\\`
Espace: TEAM-BACKEND
├── Page d'accueil (overview, liens rapides, équipe)
├── Architecture
│   ├── Diagrammes
│   ├── ADR (Architecture Decision Records)
│   └── Standards de code
├── Guides
│   ├── Onboarding nouveaux développeurs
│   ├── Setup environnement local
│   └── Procédures de déploiement
├── Runbooks
│   ├── Incidents courants
│   └── Procédures de rollback
└── Meeting Notes
    ├── Daily standups
    ├── Sprint reviews
    └── Retrospectives
\\\`\\\`\\\`

#### Pattern 2 : Organisation par projet
\\\`\\\`\\\`
Espace: PROJ-ECOMMERCE
├── Overview (vision, objectifs, timeline)
├── Requirements
│   ├── User Stories
│   ├── Technical Requirements
│   └── Non-Functional Requirements
├── Design
│   ├── UX/UI Mockups
│   ├── API Specifications
│   └── Database Schema
├── Development
│   ├── Setup Guide
│   ├── API Documentation
│   └── Troubleshooting
├── Testing
│   ├── Test Plans
│   ├── Test Cases
│   └── Bug Reports
└── Releases
    ├── Release Notes v1.0
    ├── Release Notes v1.1
    └── Deployment Checklist
\\\`\\\`\\\`

#### Pattern 3 : Organisation par domaine (Knowledge Base)
\\\`\\\`\\\`
Espace: KB-DEVOPS
├── CI/CD
│   ├── Jenkins
│   ├── GitLab CI
│   └── GitHub Actions
├── Containers
│   ├── Docker
│   ├── Kubernetes
│   └── Helm
├── Cloud
│   ├── AWS
│   ├── Azure
│   └── GCP
├── Monitoring
│   ├── Prometheus
│   ├── Grafana
│   └── ELK Stack
└── Security
    ├── OWASP
    ├── Secrets Management
    └── Network Security
\\\`\\\`\\\`

#### Best practices d'organisation
- **Profondeur maximale** : 4-5 niveaux de hiérarchie max
- **Nommage cohérent** : conventions de titre (préfixes, formats)
- **Labels standardisés** : taxonomie définie à l'avance
- **Templates obligatoires** : chaque type de contenu a son template
- **Page d'accueil** : chaque espace a une overview avec liens rapides
- **Archivage régulier** : déplacer le contenu obsolète dans un espace archive

### Macros Confluence - Référence complète

#### Macros de mise en page

\\\`\\\`\\\`
<!-- Section et colonnes (layout multi-colonnes) -->
<ac:structured-macro ac:name="section">
  <ac:rich-text-body>
    <ac:structured-macro ac:name="column">
      <ac:parameter ac:name="width">50%</ac:parameter>
      <ac:rich-text-body><p>Colonne gauche</p></ac:rich-text-body>
    </ac:structured-macro>
    <ac:structured-macro ac:name="column">
      <ac:parameter ac:name="width">50%</ac:parameter>
      <ac:rich-text-body><p>Colonne droite</p></ac:rich-text-body>
    </ac:structured-macro>
  </ac:rich-text-body>
</ac:structured-macro>

<!-- Panel (boîte avec titre et bordure) -->
<ac:structured-macro ac:name="panel">
  <ac:parameter ac:name="title">Important</ac:parameter>
  <ac:parameter ac:name="borderStyle">solid</ac:parameter>
  <ac:parameter ac:name="borderColor">#FF0000</ac:parameter>
  <ac:rich-text-body><p>Contenu du panel</p></ac:rich-text-body>
</ac:structured-macro>

<!-- Expand (contenu dépliable) -->
<ac:structured-macro ac:name="expand">
  <ac:parameter ac:name="title">Cliquez pour voir les détails</ac:parameter>
  <ac:rich-text-body><p>Contenu caché par défaut</p></ac:rich-text-body>
</ac:structured-macro>

<!-- Div (conteneur avec style CSS) -->
<ac:structured-macro ac:name="div">
  <ac:parameter ac:name="class">custom-class</ac:parameter>
  <ac:rich-text-body><p>Contenu avec style</p></ac:rich-text-body>
</ac:structured-macro>
\\\`\\\`\\\`

#### Macros de contenu

\\\`\\\`\\\`
<!-- Table des matières automatique -->
<ac:structured-macro ac:name="toc">
  <ac:parameter ac:name="maxLevel">3</ac:parameter>
  <ac:parameter ac:name="minLevel">1</ac:parameter>
  <ac:parameter ac:name="style">disc</ac:parameter>
</ac:structured-macro>

<!-- Afficher les pages enfants -->
<ac:structured-macro ac:name="children">
  <ac:parameter ac:name="all">true</ac:parameter>
  <ac:parameter ac:name="depth">2</ac:parameter>
  <ac:parameter ac:name="sort">title</ac:parameter>
</ac:structured-macro>

<!-- Arbre de pages (page-tree) -->
<ac:structured-macro ac:name="pagetree">
  <ac:parameter ac:name="root">@self</ac:parameter>
  <ac:parameter ac:name="searchBox">true</ac:parameter>
</ac:structured-macro>

<!-- Inclure le contenu d'une autre page -->
<ac:structured-macro ac:name="include">
  <ac:parameter ac:name=""><ac:link><ri:page ri:content-title="Source Page"/></ac:link></ac:parameter>
</ac:structured-macro>

<!-- Excerpt (extrait réutilisable) -->
<ac:structured-macro ac:name="excerpt">
  <ac:parameter ac:name="name">resume-projet</ac:parameter>
  <ac:rich-text-body><p>Cet extrait peut etre inclus dans d autres pages</p></ac:rich-text-body>
</ac:structured-macro>

<!-- Afficher l'extrait d'une autre page -->
<ac:structured-macro ac:name="excerpt-include">
  <ac:parameter ac:name=""><ac:link><ri:page ri:content-title="Source Page"/></ac:link></ac:parameter>
  <ac:parameter ac:name="nopanel">true</ac:parameter>
</ac:structured-macro>

<!-- Pages récemment mises à jour -->
<ac:structured-macro ac:name="recently-updated">
  <ac:parameter ac:name="spaces">DEVOPS</ac:parameter>
  <ac:parameter ac:name="max">10</ac:parameter>
  <ac:parameter ac:name="types">page</ac:parameter>
</ac:structured-macro>
\\\`\\\`\\\`

#### Macros d'intégration Jira

\\\`\\\`\\\`
<!-- Tableau de tickets Jira (JQL) -->
<ac:structured-macro ac:name="jira">
  <ac:parameter ac:name="jqlQuery">project = PROJ AND status != Done ORDER BY priority DESC</ac:parameter>
  <ac:parameter ac:name="columns">key,summary,status,assignee,priority</ac:parameter>
  <ac:parameter ac:name="maximumIssues">20</ac:parameter>
</ac:structured-macro>

<!-- Compteur de tickets -->
<ac:structured-macro ac:name="jira">
  <ac:parameter ac:name="jqlQuery">project = PROJ AND issuetype = Bug AND resolution = Unresolved</ac:parameter>
  <ac:parameter ac:name="count">true</ac:parameter>
</ac:structured-macro>

<!-- Ticket unique (affichage inline) -->
<ac:structured-macro ac:name="jira">
  <ac:parameter ac:name="key">PROJ-123</ac:parameter>
</ac:structured-macro>
\\\`\\\`\\\`

#### Macros de développement

\\\`\\\`\\\`
<!-- Bloc de code avec syntaxe highlighting -->
<ac:structured-macro ac:name="code">
  <ac:parameter ac:name="language">python</ac:parameter>
  <ac:parameter ac:name="title">example.py</ac:parameter>
  <ac:parameter ac:name="linenumbers">true</ac:parameter>
  <ac:parameter ac:name="collapse">false</ac:parameter>
  <ac:plain-text-body><![CDATA[
def hello():
    print("Hello World")
    return True
  ]]></ac:plain-text-body>
</ac:structured-macro>

<!-- Noformat (texte préformaté sans highlighting) -->
<ac:structured-macro ac:name="noformat">
  <ac:plain-text-body><![CDATA[
Texte brut sans formatage
  Indentation preservee
    Pas de syntaxe highlighting
  ]]></ac:plain-text-body>
</ac:structured-macro>

<!-- Ancre (point de navigation) -->
<ac:structured-macro ac:name="anchor">
  <ac:parameter ac:name="">section-importante</ac:parameter>
</ac:structured-macro>

<!-- Boîtes d'information -->
<ac:structured-macro ac:name="info">
  <ac:parameter ac:name="title">Information</ac:parameter>
  <ac:rich-text-body><p>Message informatif</p></ac:rich-text-body>
</ac:structured-macro>

<ac:structured-macro ac:name="tip">
  <ac:parameter ac:name="title">Conseil</ac:parameter>
  <ac:rich-text-body><p>Bonne pratique a suivre</p></ac:rich-text-body>
</ac:structured-macro>

<ac:structured-macro ac:name="warning">
  <ac:parameter ac:name="title">Attention</ac:parameter>
  <ac:rich-text-body><p>Point de vigilance</p></ac:rich-text-body>
</ac:structured-macro>

<ac:structured-macro ac:name="note">
  <ac:parameter ac:name="title">Note</ac:parameter>
  <ac:rich-text-body><p>Remarque importante</p></ac:rich-text-body>
</ac:structured-macro>
\\\`\\\`\\\`

#### Macros interactives

\\\`\\\`\\\`
<!-- Liste de tâches -->
<ac:task-list>
  <ac:task>
    <ac:task-id>1</ac:task-id>
    <ac:task-status>incomplete</ac:task-status>
    <ac:task-body>Tache a faire</ac:task-body>
  </ac:task>
  <ac:task>
    <ac:task-id>2</ac:task-id>
    <ac:task-status>complete</ac:task-status>
    <ac:task-body>Tache terminee</ac:task-body>
  </ac:task>
</ac:task-list>

<!-- Badge de statut -->
<ac:structured-macro ac:name="status">
  <ac:parameter ac:name="title">EN COURS</ac:parameter>
  <ac:parameter ac:name="colour">Yellow</ac:parameter>
</ac:structured-macro>

<!-- Couleurs disponibles : Grey, Red, Yellow, Green, Blue -->

<!-- Mention d'utilisateur -->
<ac:link><ri:user ri:userkey="user123key"/></ac:link>

<!-- Date -->
<time datetime="2024-03-15"/>
\\\`\\\`\\\`


### Templates et Blueprints

#### Templates intégrés (Built-in)
- **Meeting Notes** : date, participants, discussion, action items, decisions
- **Decision** : contexte, options, décision, conséquences, statut
- **Retrospective** : went well, to improve, actions
- **How-To Article** : prérequis, steps, résultat attendu, troubleshooting
- **Troubleshooting Article** : symptômes, cause, solution, prévention
- **Product Requirements** : objectifs, user stories, acceptance criteria, timeline
- **Shared Links** : collection de liens avec descriptions

#### Création de templates personnalisés via API

\\\`\\\`\\\`bash
# Créer un template "Runbook"
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${CONF_URL}/rest/api/template" \\\\
  -d '{
    "name": "Runbook Operationnel",
    "templateType": "page",
    "space": {"key": "DEVOPS"},
    "description": "Template pour les procedures operationnelles",
    "body": {
      "storage": {
        "value": "<h2>Objectif</h2><p>Decrire l objectif de cette procedure...</p><ac:structured-macro ac:name=\"warning\"><ac:rich-text-body><p>Prerequis : liste des prerequis</p></ac:rich-text-body></ac:structured-macro><h2>Procedure</h2><ac:structured-macro ac:name=\"expand\"><ac:parameter ac:name=\"title\">Etape 1 - Preparation</ac:parameter><ac:rich-text-body><p>Details...</p></ac:rich-text-body></ac:structured-macro><ac:structured-macro ac:name=\"expand\"><ac:parameter ac:name=\"title\">Etape 2 - Execution</ac:parameter><ac:rich-text-body><p>Details...</p></ac:rich-text-body></ac:structured-macro><h2>Verification</h2><ac:task-list><ac:task><ac:task-id>1</ac:task-id><ac:task-status>incomplete</ac:task-status><ac:task-body>Verification 1</ac:task-body></ac:task></ac:task-list><h2>Rollback</h2><p>Procedure de retour arriere si necessaire...</p>",
        "representation": "storage"
      }
    }
  }'
\\\`\\\`\\\`

### Collaboration avancée

#### Page watching et notifications
- **Watch** : recevoir des notifications à chaque modification d'une page
- **Space Watch** : surveiller toutes les modifications d'un espace
- **Blog Watch** : être notifié des nouveaux blog posts
- Granularité : modifications de contenu, commentaires, ou les deux
- Notifications par email ou dans l'app (notifications bell)

#### Inline comments et @mentions
- Les commentaires inline sont attachés à un passage spécifique du texte
- @mentions notifient l'utilisateur dans l'app et par email
- Les commentaires peuvent être résolus (marqués comme traités)
- Fil de discussion avec réponses

#### Page comparison (diff)
- Comparer n'importe quelles deux versions d'une page
- Affichage des ajouts (vert) et suppressions (rouge)
- Navigation entre les différences
- Possibilité de restaurer une version antérieure

#### Page history et revert
\\\`\\\`\\\`bash
# Obtenir l'historique des versions d'une page
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/content/12345678/history"

# Obtenir une version spécifique
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/content/12345678?status=historical&version=3"

# Restaurer une version antérieure
# Il faut créer une nouvelle version avec le contenu de l'ancienne
# 1. Lire le contenu de la version souhaitée
# 2. Mettre à jour la page avec ce contenu (version +1)
\\\`\\\`\\\`

#### Édition collaborative (Synchrony)
- Plusieurs utilisateurs peuvent éditer la même page simultanément
- Curseurs colorés identifient chaque éditeur
- Synchronisation en temps réel via WebSocket (port 8091)
- Pas de conflits de version (merge automatique)
- Historique des modifications individuelles

### Intégration avec Jira (bidirectionnelle)

#### Depuis Confluence vers Jira
- **Macro Jira** : afficher des tickets via JQL (tableau, compteur, ticket unique)
- **Création de ticket** : créer un ticket Jira depuis une page Confluence
- **Application Links** : lien technique entre les instances

#### Depuis Jira vers Confluence
- **Confluence Tab** : onglet Confluence dans les tickets Jira
- **Page links** : liens vers les pages pertinentes dans les tickets
- **Remote links API** : créer des liens programmatiquement

\\\`\\\`\\\`bash
# Créer un lien Jira -> Confluence via API Jira
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${JIRA_URL}/rest/api/2/issue/PROJ-123/remotelink" \\\\
  -d '{
    "object": {
      "url": "https://confluence.example.com/display/DEVOPS/Architecture",
      "title": "Document Architecture",
      "icon": {"url16x16": "https://confluence.example.com/favicon.ico"}
    }
  }'
\\\`\\\`\\\`

### Export et Import

\\\`\\\`\\\`bash
# ============================================
# EXPORT DE CONTENU
# ============================================

# Export PDF d'une page
curl -s -u \\\${AUTH} \\\\
  "\\\${CONF_URL}/spaces/flyingpdf/pdfpageexport.action?pageId=12345678" \\\\
  -o page_export.pdf

# Export Word d'une page
curl -s -u \\\${AUTH} \\\\
  "\\\${CONF_URL}/exportword?pageId=12345678" \\\\
  -o page_export.doc

# Export HTML d'un espace complet
# Administration > Space Tools > Content Tools > Export
# Formats : HTML, XML, PDF

# Export XML d'un espace (backup)
curl -s -u \\\${AUTH} -X POST \\\\
  "\\\${CONF_URL}/rest/api/space/DEVOPS/export" \\\\
  -H "Content-Type: application/json" \\\\
  -d '{"type": "xml"}'

# ============================================
# IMPORT DE CONTENU
# ============================================

# Import d'un espace XML
# Administration > Space Tools > Import Space
# Via API : POST /rest/api/content/import
\\\`\\\`\\\`

`,
      practiceContent: `## Travaux pratiques - Organisation et collaboration

### TP1 : Organisation par pattern

1. Créer un espace "Knowledge Base DevOps" (KB-DEVOPS)
2. Implémenter le pattern d'organisation par domaine :
   - CI/CD (Jenkins, GitLab CI, GitHub Actions)
   - Containers (Docker, Kubernetes, Helm)
   - Monitoring (Prometheus, Grafana)
3. Créer une page d'accueil avec la macro children et la macro toc
4. Ajouter des labels cohérents (ci-cd, containers, monitoring, beginner, advanced)

### TP2 : Macros avancées

1. Créer une page avec layout multi-colonnes (section/column)
2. Ajouter des panels colorés (info, warning, tip, note)
3. Insérer un tableau Jira avec macro jira (JQL query)
4. Créer un expand avec une procédure détaillée
5. Utiliser le macro code avec plusieurs langages (bash, python, yaml)
6. Ajouter un page-tree navigable

### TP3 : Templates et réutilisabilité

1. Créer un template "Architecture Decision Record" (ADR)
2. Créer un template "Incident Post-Mortem"
3. Utiliser les templates pour créer 3 pages
4. Créer un excerpt dans une page et l'inclure dans une autre (excerpt-include)

### TP4 : Collaboration

1. Activer le watch sur une page
2. Ajouter des inline comments sur une page d'un collègue
3. Créer des tâches (task-list) avec assignation
4. Comparer deux versions d'une page
5. Utiliser des @mentions dans un commentaire

### TP5 : Intégration Jira

1. Créer une page "Sprint Dashboard" avec :
   - Macro jira : tickets du sprint actuel
   - Macro jira count : nombre de bugs ouverts
   - Badge de statut du sprint (macro status)
2. Lier la page à un ticket Jira via remote link

### Questions de validation

- Quel est le pattern d'organisation recommandé pour une équipe de 20 personnes ?
- Comment fonctionne la macro excerpt/excerpt-include ?
- Quelle est la différence entre include et excerpt-include ?
- Comment Synchrony gère-t-il l'édition collaborative ?
- Quels sont les macros les plus utiles pour une documentation technique ?`,
      keyPoints: JSON.stringify([
        'Organisation du contenu : 3 patterns (par équipe, par projet, par domaine) avec max 4-5 niveaux',
        'Macros layout : section/column (multi-colonnes), panel (boîtes), expand (dépliable), div (CSS)',
        'Macros contenu : toc (table des matières), children, page-tree, include, excerpt, recently-updated',
        'Macros Jira : tableau JQL, compteur, ticket inline - intégration bidirectionnelle complète',
        'Macros dev : code (25+ langages, numéros de ligne), noformat, info/tip/warning/note',
        'Templates : built-in (meeting, decision, retro, how-to) + custom avec variables via API',
        'Collaboration : watching, inline comments, @mentions, page comparison, concurrent editing (Synchrony)',
        'Export : PDF, Word, HTML, XML par page ou espace complet - Import XML pour migration'
      ]) },


    { id: 'conf-03', courseId: 'confluence', title: 'Administration et API avancée', duration: '4h', orderIndex: 3,
      theoryContent: `## Administration et API avancée Confluence

### Modèle de permissions

#### Permissions globales (Site Administration)
- **System Administrator** : accès complet à la configuration
- **Confluence Administrator** : gestion des espaces et utilisateurs
- **Create Spaces** : peut créer de nouveaux espaces
- **Personal Space** : peut créer un espace personnel
- **Use Confluence** : accès de base à Confluence

#### Permissions d'espace (Space Permissions)
Chaque espace a ses propres permissions, par utilisateur ou par groupe :

| Permission | Description |
|-----------|-------------|
| View Space | Voir l'espace et son contenu |
| Add Pages | Créer de nouvelles pages |
| Add Blog Posts | Créer des blog posts |
| Add Comments | Ajouter des commentaires |
| Add Attachments | Ajouter des pièces jointes |
| Create/Delete Mail | Gérer le mail archiving |
| Restrict Pages | Appliquer des restrictions sur les pages |
| Delete Own Content | Supprimer son propre contenu |
| Delete Others Content | Supprimer le contenu des autres |
| Space Admin | Administrer l'espace |
| Space Export | Exporter l'espace |

#### Restrictions de pages
- **View restriction** : seuls les utilisateurs/groupes listés peuvent voir la page
- **Edit restriction** : seuls les utilisateurs/groupes listés peuvent éditer
- Les restrictions sont héritées par les pages enfants
- Un admin peut toujours lever les restrictions

\\\`\\\`\\\`bash
# ============================================
# GESTION DES PERMISSIONS VIA API
# ============================================

CONF_URL="https://confluence.example.com"
AUTH="admin:password"

# Obtenir les permissions d'un espace
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/space/DEVOPS/permission"

# Ajouter une permission d'espace à un groupe
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${CONF_URL}/rest/api/space/DEVOPS/permission" \\\\
  -d '{
    "subjects": {
      "group": {"results": [{"name": "confluence-users"}]}
    },
    "operation": {"key": "read", "target": "space"},
    "anonymousAccess": false
  }'

# Ajouter une restriction de page (view)
curl -s -u \\\${AUTH} -X PUT \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${CONF_URL}/rest/api/content/12345678/restriction" \\\\
  -d '[{
    "operation": "read",
    "restrictions": {
      "user": [{"type": "known", "username": "admin"}, {"type": "known", "username": "team.lead"}],
      "group": [{"type": "group", "name": "security-team"}]
    }
  }, {
    "operation": "update",
    "restrictions": {
      "user": [{"type": "known", "username": "admin"}]
    }
  }]'

# Supprimer toutes les restrictions d'une page
curl -s -u \\\${AUTH} -X DELETE "\\\${CONF_URL}/rest/api/content/12345678/restriction"

# Vérifier si un utilisateur a accès à une page
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/content/12345678/restriction/byOperation/read/user?userName=john.doe"
\\\`\\\`\\\`

### Gestion des utilisateurs et groupes

\\\`\\\`\\\`bash
# ============================================
# UTILISATEURS ET GROUPES
# ============================================

# Lister les groupes
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/group?limit=100" | python3 -m json.tool

# Créer un groupe
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${CONF_URL}/rest/api/group" \\\\
  -d '{"name": "devops-team"}'

# Ajouter un utilisateur à un groupe
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${CONF_URL}/rest/api/group/devops-team/member" \\\\
  -d '{"name": "john.doe"}'

# Retirer un utilisateur d'un groupe
curl -s -u \\\${AUTH} -X DELETE \\\\
  "\\\${CONF_URL}/rest/api/group/devops-team/member?name=john.doe"

# Lister les membres d'un groupe
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/group/devops-team/member?limit=200"

# Rechercher un utilisateur
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/user?username=john.doe&expand=status,personalSpace"

# Désactiver un utilisateur
curl -s -u \\\${AUTH} -X PUT \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${CONF_URL}/rest/api/admin/user/disable" \\\\
  -d '{"username": "old.employee"}'
\\\`\\\`\\\`

### Gestion des espaces (Administration)

\\\`\\\`\\\`bash
# ============================================
# ADMINISTRATION DES ESPACES
# ============================================

# Lister tous les espaces avec statistiques
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/space?limit=100&expand=description,metadata"

# Archiver un espace (le rendre en lecture seule)
# Pas d'API directe - utiliser les Space Settings dans l'UI
# Ou via ScriptRunner : space.setStatus(SpaceStatus.ARCHIVED)

# Export d'un espace en XML (pour backup ou migration)
# POST /rest/api/longtask/space/DEVOPS/export
# ou via Administration > Space Tools > Export Space

# Import d'un espace XML
# Via Administration > General Configuration > Import Spaces

# Obtenir les statistiques d'un espace
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/space/DEVOPS/content?type=page&limit=0"
# Le champ "size" donne le nombre total de pages
\\\`\\\`\\\`

### Backup et restauration

\\\`\\\`\\\`bash
# ============================================
# BACKUP CONFLUENCE - COMPLET
# ============================================

# 1. Backup de la base de données PostgreSQL
pg_dump -h localhost -U confluenceuser -d confluencedb -F c \\\\
  -f /backup/confluence/db_\\\$(date +%Y%m%d_%H%M%S).dump

# 2. Backup du CONFLUENCE_HOME (attachments, config, indices)
tar -czf /backup/confluence/home_\\\$(date +%Y%m%d_%H%M%S).tar.gz \\\\
  /var/atlassian/application-data/confluence/

# 3. Backup du répertoire d'installation (optionnel mais recommandé)
tar -czf /backup/confluence/install_\\\$(date +%Y%m%d_%H%M%S).tar.gz \\\\
  /opt/atlassian/confluence/

# ============================================
# SCRIPT DE BACKUP AUTOMATISÉ
# ============================================

cat > /opt/scripts/confluence-backup.sh << 'SCRIPT'
#!/bin/bash
set -e

BACKUP_DIR="/backup/confluence"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=7

mkdir -p \\\${BACKUP_DIR}

echo "[\\\${DATE}] Starting Confluence backup..."

# Backup database
echo "Backing up database..."
pg_dump -h localhost -U confluenceuser -d confluencedb -F c \\
  -f \\\${BACKUP_DIR}/db_\\\${DATE}.dump

# Backup home directory (données, attachments)
echo "Backing up CONFLUENCE_HOME..."
tar -czf \\\${BACKUP_DIR}/home_\\\${DATE}.tar.gz \\
  --exclude='*/temp/*' \\
  --exclude='*/index/*' \\
  /var/atlassian/application-data/confluence/

# Vérification intégrité
echo "Verifying backup integrity..."
pg_restore --list \\\${BACKUP_DIR}/db_\\\${DATE}.dump > /dev/null 2>&1
tar -tzf \\\${BACKUP_DIR}/home_\\\${DATE}.tar.gz > /dev/null 2>&1

# Rétention
echo "Cleaning old backups (> \\\${RETENTION_DAYS} days)..."
find \\\${BACKUP_DIR} -name "db_*.dump" -mtime +\\\${RETENTION_DAYS} -delete
find \\\${BACKUP_DIR} -name "home_*.tar.gz" -mtime +\\\${RETENTION_DAYS} -delete

echo "[\\\${DATE}] Backup completed successfully!"
echo "Database: \\\${BACKUP_DIR}/db_\\\${DATE}.dump"
echo "Home: \\\${BACKUP_DIR}/home_\\\${DATE}.tar.gz"
SCRIPT

chmod +x /opt/scripts/confluence-backup.sh

# Planification cron (tous les jours à 3h du matin)
echo "0 3 * * * /opt/scripts/confluence-backup.sh >> /var/log/confluence-backup.log 2>&1" | crontab -

# ============================================
# RESTAURATION CONFLUENCE
# ============================================

# 1. Arrêter Confluence
sudo systemctl stop confluence

# 2. Restaurer la base de données
sudo -u postgres dropdb confluencedb
sudo -u postgres createdb -O confluenceuser -E UNICODE confluencedb
pg_restore -h localhost -U confluenceuser -d confluencedb /backup/confluence/db_20240301.dump

# 3. Restaurer le CONFLUENCE_HOME
rm -rf /var/atlassian/application-data/confluence/*
tar -xzf /backup/confluence/home_20240301.tar.gz -C /
chown -R confluence:confluence /var/atlassian/application-data/confluence/

# 4. Redémarrer et réindexer
sudo systemctl start confluence
# Administration > General Configuration > Content Indexing > Rebuild Index

# ============================================
# EXPORT/IMPORT PAR ESPACE (pour migration)
# ============================================

# Export XML d'un espace spécifique
# UI: Space Settings > Content Tools > Export > XML
# Inclut : pages, commentaires, attachments, permissions

# Import XML d'un espace
# UI: Administration > General Configuration > Backup and Restore > Import Space
\\\`\\\`\\\`

### Performance et maintenance

\\\`\\\`\\\`bash
# ============================================
# JVM TUNING CONFLUENCE
# ============================================

# /opt/atlassian/confluence/bin/setenv.sh
CATALINA_OPTS="-Xms4096m -Xmx4096m"                    # RAM allocation
CATALINA_OPTS="\\\${CATALINA_OPTS} -XX:+UseG1GC"          # Garbage Collector
CATALINA_OPTS="\\\${CATALINA_OPTS} -XX:MaxGCPauseMillis=200"
CATALINA_OPTS="\\\${CATALINA_OPTS} -XX:+HeapDumpOnOutOfMemoryError"
CATALINA_OPTS="\\\${CATALINA_OPTS} -XX:HeapDumpPath=/tmp/"
CATALINA_OPTS="\\\${CATALINA_OPTS} -Dsynchrony.memory.max=2g"  # Synchrony memory

# ============================================
# POSTGRESQL MAINTENANCE
# ============================================

# Vacuum et analyse (maintenance régulière)
sudo -u postgres psql -d confluencedb -c "VACUUM ANALYZE;"

# Reindex (après erreurs ou performance dégradée)
sudo -u postgres psql -d confluencedb -c "REINDEX DATABASE confluencedb;"

# Vérifier la taille de la base
sudo -u postgres psql -d confluencedb -c "
  SELECT pg_size_pretty(pg_database_size('confluencedb')) as db_size;"

# Top tables par taille
sudo -u postgres psql -d confluencedb -c "
  SELECT schemaname, tablename, 
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
  FROM pg_tables 
  WHERE schemaname = 'public' 
  ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC 
  LIMIT 10;"

# ============================================
# CONTENT INDEX REBUILD
# ============================================

# Via API (déclencher la réindexation)
curl -s -u \\\${AUTH} -X POST "\\\${CONF_URL}/rest/api/admin/reindex"

# Vérifier le statut de la réindexation
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/admin/reindex"

# ============================================
# MONITORING ET HEALTH CHECKS
# ============================================

# Status général
curl -s "\\\${CONF_URL}/status"

# Health check (Data Center)
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/admin/cluster/nodes"

# Informations système
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/settings/systemInfo"

# JMX Monitoring (via Jolokia ou JMX direct)
# Métriques importantes :
# - java.lang:type=Memory (HeapMemoryUsage)
# - java.lang:type=Threading (ThreadCount)
# - Catalina:type=ThreadPool (currentThreadCount, currentThreadsBusy)

# ============================================
# CACHE MANAGEMENT
# ============================================

# Vider les caches (attention : impact performance temporaire)
# Administration > General Configuration > Cache Management > Flush All Caches

# Monitorer l'utilisation du cache
# Administration > General Configuration > Cache Statistics
\\\`\\\`\\\`

### Opérations en masse (Bulk operations) via API

\\\`\\\`\\\`bash
# ============================================
# SCRIPTS D'OPÉRATIONS EN MASSE
# ============================================

# Trouver les pages obsolètes (non modifiées depuis 1 an)
curl -s -u \\\${AUTH} -G \\\\
  --data-urlencode "cql=space = DEVOPS AND type = page AND lastModified < now('-365d')" \\\\
  --data-urlencode "limit=100" \\\\
  "\\\${CONF_URL}/rest/api/content/search" | python3 -m json.tool

# Script : ajouter un label à toutes les pages d'un espace
# (exemple en bash avec boucle)
PAGES=\\\$(curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/content?spaceKey=DEVOPS&type=page&limit=500" \\\\
  | python3 -c "import sys,json; [print(r['id']) for r in json.load(sys.stdin)['results']]")

for PAGE_ID in \\\${PAGES}; do
  curl -s -u \\\${AUTH} -X POST \\\\
    -H "Content-Type: application/json" \\\\
    "\\\${CONF_URL}/rest/api/content/\\\${PAGE_ID}/label" \\\\
    -d '[{"prefix": "global", "name": "reviewed-2024"}]'
  echo "Label added to page \\\${PAGE_ID}"
done

# Script : trouver les pages sans labels
curl -s -u \\\${AUTH} -G \\\\
  --data-urlencode "cql=space = DEVOPS AND type = page AND label IS NULL" \\\\
  --data-urlencode "limit=100" \\\\
  "\\\${CONF_URL}/rest/api/content/search"

# Script : exporter toutes les pages en CSV
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/content?spaceKey=DEVOPS&type=page&limit=500&expand=version,history.lastUpdated" \\\\
  | python3 -c "
import sys, json
data = json.load(sys.stdin)
print('id,title,version,lastUpdated,createdBy')
for p in data['results']:
    print(f\\\"{p['id']},{p['title']},{p['version']['number']},{p['history']['lastUpdated']['when']},{p['history']['createdBy']['displayName']}\\\")
"

# Script : mise à jour en masse des permissions
# Donner accès lecture à un nouveau groupe sur toutes les pages restreintes
RESTRICTED_PAGES=\\\$(curl -s -u \\\${AUTH} -G \\\\
  --data-urlencode "cql=space = DEVOPS AND type = page" \\\\
  "\\\${CONF_URL}/rest/api/content/search?limit=500" \\\\
  | python3 -c "import sys,json; [print(r['id']) for r in json.load(sys.stdin)['results']]")

for PAGE_ID in \\\${RESTRICTED_PAGES}; do
  # Vérifier si la page a des restrictions
  HAS_RESTRICTIONS=\\\$(curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/content/\\\${PAGE_ID}/restriction" \\\\
    | python3 -c "import sys,json; print(len(json.load(sys.stdin)['results'])>0)")
  if [ "\\\${HAS_RESTRICTIONS}" = "True" ]; then
    echo "Updating restrictions for page \\\${PAGE_ID}"
    # Ajouter le groupe aux restrictions existantes
  fi
done
\\\`\\\`\\\`

### Audit et compliance

\\\`\\\`\\\`bash
# ============================================
# AUDIT LOG
# ============================================

# Obtenir les événements d'audit
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/audit?limit=100&startDate=2024-01-01"

# Types d'événements audités :
# - Page viewed, created, updated, deleted
# - Space created, deleted
# - Permission changes
# - User login, logout
# - Plugin installed, disabled
# - Configuration changes
# - Export/Import operations

# Filtrer les événements de sécurité
curl -s -u \\\${AUTH} "\\\${CONF_URL}/rest/api/audit?category=security&limit=50"
\\\`\\\`\\\`

### Troubleshooting courant

| Problème | Cause probable | Solution |
|----------|---------------|----------|
| OutOfMemoryError | JVM sous-dimensionnée | Augmenter Xmx dans setenv.sh |
| Synchrony disconnected | Port 8091 bloqué | Vérifier firewall et proxy WebSocket |
| Slow page rendering | Macros lourdes / index | Rebuild index, optimiser macros |
| Attachment upload fails | Taille max config | Augmenter limite dans config |
| Space export fails | Espace trop volumineux | Exporter par sections |
| Plugin errors | Incompatibilité version | Mettre à jour ou désactiver le plugin |
| Search not working | Index corrompu | Rebuild Content Index |
| Mail notifications fail | SMTP mal configuré | Vérifier config mail dans admin |

`,
      practiceContent: `## Travaux pratiques - Administration avancée

### TP1 : Permissions et sécurité

1. Créer 3 groupes : devops-admins, devops-users, devops-readers
2. Configurer les permissions de l'espace DEVOPS :
   - devops-admins : toutes les permissions
   - devops-users : view, add pages, add comments
   - devops-readers : view only
3. Appliquer des restrictions sur une page sensible (visible uniquement par admins)
4. Vérifier via API que les restrictions fonctionnent correctement

### TP2 : Backup et restauration

1. Écrire un script de backup complet (BDD + CONFLUENCE_HOME)
2. Configurer un cron pour backup quotidien à 3h
3. Tester la restauration sur une instance Docker de test
4. Documenter la procédure de restauration dans Confluence

### TP3 : Opérations en masse

1. Écrire un script pour trouver toutes les pages non modifiées depuis 6 mois
2. Ajouter automatiquement un label "to-review" à ces pages
3. Générer un rapport CSV de toutes les pages avec : titre, auteur, date de modification
4. Écrire un script de migration de contenu entre deux espaces

### TP4 : Performance et monitoring

1. Configurer le monitoring avec les health checks API
2. Vérifier la taille de la base de données et les tables les plus volumineuses
3. Effectuer un VACUUM ANALYZE sur la base PostgreSQL
4. Mesurer le temps de réponse de l'API et identifier les goulots

### TP5 : Maintenance

1. Déclencher une réindexation du contenu
2. Vérifier le statut de la réindexation
3. Exporter un espace en XML pour backup
4. Simuler une restauration d'espace depuis le XML

### Questions de validation

- Quelle est la différence entre permissions d'espace et restrictions de page ?
- Comment fonctionne l'héritage des restrictions sur les pages enfants ?
- Quels éléments doivent être inclus dans un backup complet ?
- Comment monitorer la santé d'une instance Confluence ?
- Quels sont les cas d'utilisation des opérations en masse via API ?`,
      keyPoints: JSON.stringify([
        'Permissions 3 niveaux : globales (site), espace (group/user), page (restrictions view/edit héritées)',
        'Gestion groupes API : CRUD groupes, ajout/retrait membres, désactivation utilisateurs',
        'Backup complet : pg_dump (BDD) + tar (CONFLUENCE_HOME) + script cron + rétention + vérification intégrité',
        'Restauration : stop service, restore DB (pg_restore), restore files, restart, rebuild index',
        'Performance : JVM G1GC 4Go+, PostgreSQL vacuum/reindex, Synchrony memory, cache management',
        'Opérations en masse : scripts bash + API pour labels bulk, pages obsolètes, migrations, rapports CSV',
        'Monitoring : /status endpoint, cluster nodes, JMX metrics, cache statistics, audit log',
        'Troubleshooting : OutOfMemory, Synchrony disconnect, index corruption, plugin conflicts, mail failures'
      ]) },



    // ==================== BITBUCKET ====================
    { id: 'bb-01', courseId: 'bitbucket', title: 'Introduction complète à Bitbucket Server', duration: '5h', orderIndex: 1,
      theoryContent: `## Introduction complète à Bitbucket Server/Data Center

### Présentation et historique

**Bitbucket** est la plateforme d'hébergement de code source Git développée par **Atlassian**. Anciennement appelé **Stash** (avant 2015), Bitbucket Server/Data Center est la version auto-hébergée destinée aux entreprises qui nécessitent un contrôle total sur leur infrastructure de gestion de code source.

Historique de Bitbucket :
- **2008** : Création de Bitbucket (initialement Mercurial)
- **2010** : Rachat par Atlassian
- **2011** : Support Git ajouté
- **2012** : Stash (version serveur) lancé
- **2015** : Stash renommé en Bitbucket Server
- **2016** : Bitbucket Pipelines (CI/CD intégré - Cloud)
- **2018** : Data Center (haute disponibilité, clustering)
- **2020** : Smart Mirroring pour équipes géographiquement distribuées
- **2022** : Amélioration Code Insights et Security features
- **2024** : Bitbucket Data Center avec mesh architecture

### Concepts fondamentaux

#### Projects (Projets)
- Conteneur de haut niveau regroupant des repositories
- Permissions héritables par tous les repos du projet
- Clé unique (ex: PROJ, OPS, INFRA)
- Catégorisation et organisation du code source

#### Repositories (Dépôts)
- Dépôts Git complets hébergés sur le serveur
- Clone via SSH (port 7999) ou HTTPS (port 7990)
- Branches, tags, et historique complet
- Hooks (pre-receive, post-receive)
- LFS (Large File Storage) supporté

#### Pull Requests (Demandes de fusion)
- Workflow de code review structuré
- Reviewers obligatoires ou optionnels
- Discussions et commentaires inline sur le diff
- Tasks (checklists) dans les PR
- Merge checks (build status, approvals, no open tasks)
- Merge strategies (merge commit, squash, fast-forward, rebase)

#### Branches et modèle de branchement
- Branch model configurable (Git Flow, GitHub Flow, trunk-based)
- Branch permissions (protection contre force push, deletion)
- Default branch configurable
- Automatic branch cleanup

#### Forks
- Copie complète d'un repository dans un autre projet
- Workflow fork → develop → PR back to original
- Synchronisation avec le repository upstream

### Architecture Bitbucket Data Center

\\\`\\\`\\\`
┌──────────────────────────────────────────────────────────────────────────┐
│                  BITBUCKET DATA CENTER ARCHITECTURE                        │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│   ┌─────────────┐      ┌───────────────────────────────────────┐         │
│   │ Git Clients │      │         Load Balancer                  │         │
│   │ (SSH/HTTPS) │─────▶│   (HAProxy/Nginx/F5/AWS ALB)          │         │
│   └─────────────┘      └────────────┬──────────────────────────┘         │
│                                      │                                    │
│                      ┌───────────────┼───────────────┐                   │
│                      ▼               ▼               ▼                   │
│              ┌──────────────┐ ┌──────────────┐ ┌──────────────┐          │
│              │  Bitbucket   │ │  Bitbucket   │ │  Bitbucket   │          │
│              │   Node #1    │ │   Node #2    │ │   Node #3    │          │
│              │  HTTP: 7990  │ │  HTTP: 7990  │ │  HTTP: 7990  │          │
│              │  SSH:  7999  │ │  SSH:  7999  │ │  SSH:  7999  │          │
│              │  Hazel: 5701 │ │  Hazel: 5701 │ │  Hazel: 5701 │          │
│              └──────┬───────┘ └──────┬───────┘ └──────┬───────┘          │
│                     │                │                │                    │
│              ┌──────┴────────────────┴────────────────┴──────┐           │
│              │       Shared Filesystem (NFS/EFS/GlusterFS)    │           │
│              │   /bitbucket-shared (repos, plugins, data)     │           │
│              └────────────────────────────────────────────────┘           │
│                                                                            │
│              ┌────────────────────────────────────────────────┐           │
│              │            PostgreSQL Database                   │           │
│              │    (Primary + Streaming Replica)                 │           │
│              │    Port 5432 | Database: bitbucketdb             │           │
│              └────────────────────────────────────────────────┘           │
│                                                                            │
│              ┌────────────────────────────────────────────────┐           │
│              │         Elasticsearch (Code Search)             │           │
│              │         Port 9200 | Index: bitbucket            │           │
│              └────────────────────────────────────────────────┘           │
│                                                                            │
│   ┌──────────────────────────────────────────────────────────────┐       │
│   │              Smart Mirror (Optional - for remote teams)       │       │
│   │   ┌──────────────┐                                           │       │
│   │   │  Mirror Node │  Read-only clone for geographically       │       │
│   │   │  (Paris/NYC) │  distributed teams (reduces latency)      │       │
│   │   └──────────────┘                                           │       │
│   └──────────────────────────────────────────────────────────────┘       │
│                                                                            │
└──────────────────────────────────────────────────────────────────────────┘
\\\`\\\`\\\`

### Installation complète sur Linux

#### Prérequis système

\\\`\\\`\\\`bash
# ============================================
# PREREQUIS BITBUCKET SERVER/DATA CENTER
# ============================================

# Vérification système
free -h                # Minimum 4 Go RAM (8 Go+ production)
df -h                  # Minimum 20 Go disque (stockage repos dépendant)
nproc                  # Minimum 2 CPU (4+ recommandé)
git --version          # Git 2.x requis (2.39+ recommandé)

# Installation Git récent - Ubuntu/Debian
sudo add-apt-repository ppa:git-core/ppa -y
sudo apt update
sudo apt install -y git
git --version          # Doit être 2.39+

# Installation Git récent - CentOS/RHEL
sudo yum install -y https://packages.endpointdev.com/rhel/7/os/x86_64/endpoint-repo.x86_64.rpm
sudo yum install -y git
git --version

# Installation Java 17
# Ubuntu/Debian
sudo apt install -y openjdk-17-jdk wget curl unzip

# CentOS/RHEL
sudo yum install -y java-17-openjdk java-17-openjdk-devel wget curl unzip

java -version
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64

# Ports requis
# 7990 - Interface web HTTP
# 7999 - SSH pour Git operations
# 5432 - PostgreSQL
# 5701 - Hazelcast (cluster Data Center)
# 9200 - Elasticsearch (code search)
\\\`\\\`\\\`

#### Installation PostgreSQL

\\\`\\\`\\\`bash
# ============================================
# BASE DE DONNÉES POSTGRESQL POUR BITBUCKET
# ============================================

# Installation PostgreSQL 14
sudo apt install -y postgresql-14

sudo systemctl start postgresql
sudo systemctl enable postgresql

# Créer utilisateur et base
sudo -u postgres psql << 'EOSQL'
CREATE USER bitbucketuser WITH PASSWORD 'BitbucketPass123!';
CREATE DATABASE bitbucketdb WITH ENCODING 'UTF8' LC_COLLATE 'C' LC_CTYPE 'C' TEMPLATE template0 OWNER bitbucketuser;
GRANT ALL PRIVILEGES ON DATABASE bitbucketdb TO bitbucketuser;
\q
EOSQL

# Configuration pg_hba.conf
# host  bitbucketdb  bitbucketuser  127.0.0.1/32  scram-sha-256

sudo systemctl restart postgresql
psql -h localhost -U bitbucketuser -d bitbucketdb -c "SELECT version();"
\\\`\\\`\\\`


#### Installation Bitbucket Server

\\\`\\\`\\\`bash
# ============================================
# INSTALLATION BITBUCKET SERVER
# ============================================

# Créer l'utilisateur système
sudo useradd -r -m -U -d /opt/atlassian/bitbucket -s /bin/bash bitbucket

# Télécharger l'installeur
cd /tmp
wget https://product-downloads.atlassian.com/software/stash/downloads/atlassian-bitbucket-8.16.0-x64.bin
chmod +x atlassian-bitbucket-8.16.0-x64.bin

# Installation interactive
sudo ./atlassian-bitbucket-8.16.0-x64.bin

# Répertoires après installation :
# /opt/atlassian/bitbucket/          - Application
# /var/atlassian/application-data/bitbucket/  - BITBUCKET_HOME (données, repos)
# /opt/atlassian/bitbucket/bin/      - Scripts
# /var/atlassian/application-data/bitbucket/shared/  - Repos Git

# ============================================
# SERVICE SYSTEMD
# ============================================

sudo cat > /etc/systemd/system/bitbucket.service << 'EOF'
[Unit]
Description=Atlassian Bitbucket Server
After=network.target postgresql.service
Requires=postgresql.service

[Service]
Type=forking
User=bitbucket
Group=bitbucket
Environment=JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
Environment=BITBUCKET_HOME=/var/atlassian/application-data/bitbucket
ExecStart=/opt/atlassian/bitbucket/bin/start-bitbucket.sh
ExecStop=/opt/atlassian/bitbucket/bin/stop-bitbucket.sh
Restart=on-failure
RestartSec=10
LimitNOFILE=65536
LimitNPROC=65536

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable bitbucket
sudo systemctl start bitbucket
sudo systemctl status bitbucket

# Vérifier les logs
sudo tail -f /var/atlassian/application-data/bitbucket/log/atlassian-bitbucket.log
# Attendre : "Bitbucket Server is ready"
# Accéder à http://localhost:7990 pour le wizard
\\\`\\\`\\\`

#### Configuration SSH

\\\`\\\`\\\`bash
# ============================================
# CONFIGURATION SSH POUR GIT
# ============================================

# Bitbucket utilise son propre serveur SSH (port 7999 par défaut)
# La configuration se fait via BITBUCKET_HOME/shared/bitbucket.properties

# Configurer le port SSH
echo "plugin.ssh.port=7999" >> /var/atlassian/application-data/bitbucket/shared/bitbucket.properties
echo "plugin.ssh.baseurl=ssh://git@bitbucket.example.com:7999" >> /var/atlassian/application-data/bitbucket/shared/bitbucket.properties

# Générer une clé SSH (côté client)
ssh-keygen -t ed25519 -C "dev@example.com" -f ~/.ssh/bitbucket_ed25519
eval "\\\$(ssh-agent -s)"
ssh-add ~/.ssh/bitbucket_ed25519

# Configurer le SSH client (~/.ssh/config)
cat >> ~/.ssh/config << 'EOF'
Host bitbucket.example.com
  HostName bitbucket.example.com
  Port 7999
  User git
  IdentityFile ~/.ssh/bitbucket_ed25519
  IdentitiesOnly yes
EOF

# Ajouter la clé publique dans Bitbucket
# UI: Account > SSH Keys > Add Key
# Ou via API :
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/ssh/1.0/keys" \\\\
  -d "{
    \"text\": \"\\\$(cat ~/.ssh/bitbucket_ed25519.pub)\"
  }"

# Tester la connexion SSH
ssh -T git@bitbucket.example.com -p 7999
# Réponse attendue : "authenticated via ssh key"
\\\`\\\`\\\`

#### Configuration Docker Compose

\\\`\\\`\\\`bash
# ============================================
# DOCKER COMPOSE - Bitbucket + PostgreSQL + Elasticsearch
# ============================================

mkdir -p /opt/bitbucket-docker && cd /opt/bitbucket-docker

cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  bitbucket:
    image: atlassian/bitbucket:8.16
    container_name: bitbucket
    ports:
      - "7990:7990"
      - "7999:7999"
    environment:
      - JDBC_URL=jdbc:postgresql://db:5432/bitbucketdb
      - JDBC_USER=bitbucketuser
      - JDBC_PASSWORD=BitbucketPass123!
      - JDBC_DRIVER=org.postgresql.Driver
      - JVM_MINIMUM_MEMORY=2048m
      - JVM_MAXIMUM_MEMORY=4096m
      - ELASTICSEARCH_ENABLED=false
      - SERVER_PROXY_NAME=bitbucket.example.com
      - SERVER_PROXY_PORT=443
      - SERVER_SCHEME=https
      - SERVER_SECURE=true
    volumes:
      - bitbucket-data:/var/atlassian/application-data/bitbucket
    depends_on:
      - db
      - elasticsearch
    restart: unless-stopped

  db:
    image: postgres:14-alpine
    container_name: bitbucket-db
    environment:
      - POSTGRES_USER=bitbucketuser
      - POSTGRES_PASSWORD=BitbucketPass123!
      - POSTGRES_DB=bitbucketdb
    volumes:
      - postgres-data:/var/lib/postgresql/data
    restart: unless-stopped

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.17.15
    container_name: bitbucket-search
    environment:
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
      - xpack.security.enabled=false
    volumes:
      - es-data:/usr/share/elasticsearch/data
    restart: unless-stopped

volumes:
  bitbucket-data:
  postgres-data:
  es-data:
EOF

docker-compose up -d
docker-compose logs -f bitbucket
\\\`\\\`\\\`

#### Reverse Proxy Nginx

\\\`\\\`\\\`bash
# ============================================
# NGINX REVERSE PROXY POUR BITBUCKET
# ============================================

sudo cat > /etc/nginx/sites-available/bitbucket << 'EOF'
upstream bitbucket_backend {
    server 127.0.0.1:7990;
}

server {
    listen 80;
    server_name bitbucket.example.com;
    return 301 https://\\\$host\\\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name bitbucket.example.com;

    ssl_certificate /etc/letsencrypt/live/bitbucket.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/bitbucket.example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    client_max_body_size 500m;
    proxy_read_timeout 3600s;
    proxy_connect_timeout 60s;

    location / {
        proxy_pass http://bitbucket_backend;
        proxy_set_header Host \\\$host;
        proxy_set_header X-Real-IP \\\$remote_addr;
        proxy_set_header X-Forwarded-For \\\$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header X-Forwarded-Port 443;
        proxy_buffering off;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/bitbucket /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Note : Le SSH (port 7999) n'est PAS proxifié par Nginx
# Il doit être accessible directement (NAT/forwarding si nécessaire)
\\\`\\\`\\\`

### API REST Bitbucket - Référence complète

\\\`\\\`\\\`bash
# ============================================
# VARIABLES DE BASE
# ============================================
BB_URL="https://bitbucket.example.com"
AUTH="admin:password"

# ============================================
# PROJETS - CRUD
# ============================================

# Lister tous les projets
curl -s -u \\\${AUTH} "\\\${BB_URL}/rest/api/1.0/projects?limit=100" | python3 -m json.tool

# Obtenir un projet spécifique
curl -s -u \\\${AUTH} "\\\${BB_URL}/rest/api/1.0/projects/PROJ" | python3 -m json.tool

# Créer un projet
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/api/1.0/projects" \\\\
  -d '{
    "key": "DEVOPS",
    "name": "DevOps Platform",
    "description": "Repositories pour l infrastructure DevOps"
  }'

# Mettre à jour un projet
curl -s -u \\\${AUTH} -X PUT \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/DEVOPS" \\\\
  -d '{
    "name": "DevOps Platform - Updated",
    "description": "Nouvelle description du projet"
  }'

# Supprimer un projet (ATTENTION)
curl -s -u \\\${AUTH} -X DELETE "\\\${BB_URL}/rest/api/1.0/projects/DEVOPS"


# ============================================
# REPOSITORIES - CRUD
# ============================================

# Lister les repos d'un projet
curl -s -u \\\${AUTH} "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos?limit=50"

# Obtenir un repo spécifique
curl -s -u \\\${AUTH} "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app"

# Créer un repository
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos" \\\\
  -d '{
    "name": "my-new-service",
    "scmId": "git",
    "forkable": true,
    "description": "Microservice de gestion des utilisateurs",
    "defaultBranch": "main"
  }'

# Mettre à jour un repo
curl -s -u \\\${AUTH} -X PUT \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-new-service" \\\\
  -d '{
    "description": "Description mise à jour",
    "forkable": false
  }'

# Supprimer un repository
curl -s -u \\\${AUTH} -X DELETE "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-new-service"

# Forker un repository
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/fork" \\\\
  -d '{
    "slug": "my-app-fork",
    "project": {"key": "~username"}
  }'

# ============================================
# GIT CLONE (SSH et HTTPS)
# ============================================

# Clone via SSH (recommandé)
git clone ssh://git@bitbucket.example.com:7999/PROJ/my-app.git

# Clone via HTTPS
git clone https://bitbucket.example.com/scm/PROJ/my-app.git

# Clone avec profondeur limitée (shallow clone)
git clone --depth 1 ssh://git@bitbucket.example.com:7999/PROJ/my-app.git

# ============================================
# BRANCHES - API
# ============================================

# Lister les branches
curl -s -u \\\${AUTH} "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/branches?limit=100"

# Obtenir la branche par défaut
curl -s -u \\\${AUTH} "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/default-branch"

# Changer la branche par défaut
curl -s -u \\\${AUTH} -X PUT \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/default-branch" \\\\
  -d '{"id": "refs/heads/main"}'

# Créer une branche
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/branches" \\\\
  -d '{
    "name": "feature/user-auth",
    "startPoint": "refs/heads/main"
  }'

# Supprimer une branche
curl -s -u \\\${AUTH} -X DELETE \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/branches" \\\\
  -d '{"name": "refs/heads/feature/user-auth", "dryRun": false}'

# ============================================
# COMMITS ET DIFFS
# ============================================

# Lister les commits
curl -s -u \\\${AUTH} "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/commits?limit=25"

# Obtenir un commit spécifique
curl -s -u \\\${AUTH} "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/commits/abc123def"

# Obtenir le diff d'un commit
curl -s -u \\\${AUTH} "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/commits/abc123def/diff"

# Diff entre deux branches
curl -s -u \\\${AUTH} "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/diff?from=main&to=feature/auth"

# ============================================
# PULL REQUESTS - LIFECYCLE COMPLET
# ============================================

# Lister les PR (ouvertes par défaut)
curl -s -u \\\${AUTH} "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/pull-requests?state=OPEN"

# Lister les PR merged
curl -s -u \\\${AUTH} "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/pull-requests?state=MERGED&limit=50"

# Créer une Pull Request
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/pull-requests" \\\\
  -d '{
    "title": "feat: Implement user authentication module",
    "description": "## Changes\\n- Add JWT authentication\\n- Add login/logout endpoints\\n- Add middleware for protected routes\\n\\n## Testing\\n- Unit tests added (95% coverage)\\n- Integration tests with test DB\\n\\nJira: PROJ-123",
    "state": "OPEN",
    "open": true,
    "closed": false,
    "fromRef": {
      "id": "refs/heads/feature/user-auth",
      "repository": {"slug": "my-app", "project": {"key": "PROJ"}}
    },
    "toRef": {
      "id": "refs/heads/main",
      "repository": {"slug": "my-app", "project": {"key": "PROJ"}}
    },
    "reviewers": [
      {"user": {"name": "senior.dev"}},
      {"user": {"name": "tech.lead"}}
    ]
  }'

# Mettre à jour une PR (titre, description, reviewers)
curl -s -u \\\${AUTH} -X PUT \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/pull-requests/1" \\\\
  -d '{
    "version": 0,
    "title": "feat: Updated title",
    "description": "Updated description",
    "reviewers": [
      {"user": {"name": "senior.dev"}},
      {"user": {"name": "tech.lead"}},
      {"user": {"name": "qa.engineer"}}
    ]
  }'

# Approuver une PR
curl -s -u \\\${AUTH} -X POST \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/pull-requests/1/approve"

# Retirer son approbation
curl -s -u \\\${AUTH} -X DELETE \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/pull-requests/1/approve"

# Décliner (rejeter) une PR
curl -s -u \\\${AUTH} -X POST \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/pull-requests/1/decline" \\\\
  -H "Content-Type: application/json" \\\\
  -d '{"version": 1}'

# Merger une PR
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/pull-requests/1/merge" \\\\
  -d '{"version": 1}'

# Ajouter un commentaire sur une PR
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/pull-requests/1/comments" \\\\
  -d '{
    "text": "Excellent travail ! Juste une remarque sur la gestion des erreurs ligne 42."
  }'

# Ajouter un commentaire inline (sur une ligne de code)
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/pull-requests/1/comments" \\\\
  -d '{
    "text": "Cette variable devrait être const au lieu de let",
    "anchor": {
      "path": "src/auth/middleware.js",
      "line": 42,
      "lineType": "ADDED",
      "fileType": "TO"
    }
  }'

# Créer une task (checklist item) sur une PR
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/pull-requests/1/blocker-comments" \\\\
  -d '{"text": "Ajouter des tests pour le cas erreur 401"}'

# ============================================
# BRANCH PERMISSIONS
# ============================================

# Ajouter une restriction de branche (pull-request-only)
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/branch-permissions/2.0/projects/PROJ/repos/my-app/restrictions" \\\\
  -d '{
    "type": "pull-request-only",
    "matcher": {
      "id": "refs/heads/main",
      "type": {"id": "BRANCH"}
    }
  }'

# Empêcher le force push
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/branch-permissions/2.0/projects/PROJ/repos/my-app/restrictions" \\\\
  -d '{
    "type": "no-force-push",
    "matcher": {
      "id": "refs/heads/main",
      "type": {"id": "BRANCH"}
    }
  }'

# Empêcher la suppression de branche
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/branch-permissions/2.0/projects/PROJ/repos/my-app/restrictions" \\\\
  -d '{
    "type": "no-deletes",
    "matcher": {
      "id": "refs/heads/main",
      "type": {"id": "BRANCH"}
    }
  }'

# Protection par pattern (toutes les branches release/*)
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/branch-permissions/2.0/projects/PROJ/repos/my-app/restrictions" \\\\
  -d '{
    "type": "pull-request-only",
    "matcher": {
      "id": "release/**",
      "type": {"id": "PATTERN"}
    }
  }'

# ============================================
# WEBHOOKS
# ============================================

# Créer un webhook
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/webhooks" \\\\
  -d '{
    "name": "Jenkins CI Trigger",
    "url": "https://jenkins.example.com/generic-webhook-trigger/invoke?token=SECRET",
    "active": true,
    "events": [
      "repo:refs_changed",
      "pr:opened",
      "pr:merged",
      "pr:declined",
      "pr:comment:added"
    ]
  }'

# Événements webhook disponibles :
# repo:refs_changed       - Push (branches/tags modifiés)
# repo:modified           - Repo settings modified
# repo:forked             - Repo forked
# repo:comment:added      - Comment on commit
# pr:opened               - PR opened
# pr:modified             - PR modified (title, description)
# pr:reviewer:updated     - Reviewers changed
# pr:reviewer:approved    - PR approved
# pr:reviewer:unapproved  - Approval removed
# pr:reviewer:needs_work  - Marked as needs work
# pr:merged               - PR merged
# pr:declined             - PR declined
# pr:deleted              - PR deleted
# pr:comment:added        - Comment on PR
# pr:comment:edited       - Comment edited
# pr:comment:deleted      - Comment deleted

# ============================================
# PERMISSIONS UTILISATEURS
# ============================================

# Permissions au niveau projet
curl -s -u \\\${AUTH} -X PUT \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/PROJ/permissions/users?name=john.doe&permission=PROJECT_WRITE"

# Permissions au niveau repo
curl -s -u \\\${AUTH} -X PUT \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/permissions/users?name=john.doe&permission=REPO_ADMIN"

# Niveaux de permissions :
# PROJECT_READ  - Lire les repos du projet
# PROJECT_WRITE - Push dans les repos du projet
# PROJECT_ADMIN - Administrer le projet
# REPO_READ     - Lire un repo spécifique
# REPO_WRITE    - Push dans un repo spécifique
# REPO_ADMIN    - Administrer un repo spécifique

# Permissions par groupe
curl -s -u \\\${AUTH} -X PUT \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/PROJ/permissions/groups?name=developers&permission=PROJECT_WRITE"

# ============================================
# SSH KEYS MANAGEMENT
# ============================================

# Lister les clés SSH d'un utilisateur
curl -s -u \\\${AUTH} "\\\${BB_URL}/rest/ssh/1.0/keys?user=john.doe"

# Ajouter une clé SSH (access key) au repo (deploy key)
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/keys/1.0/projects/PROJ/repos/my-app/ssh" \\\\
  -d '{
    "key": {"text": "ssh-ed25519 AAAAC3... deploy@ci-server"},
    "permission": "REPO_READ"
  }'
\\\`\\\`\\\`

### Smart Commits

Smart Commits permettent de piloter Jira directement depuis les messages de commit Git :

\\\`\\\`\\\`
# Syntaxe complète :
# ISSUE_KEY #command parameter

# Ajouter un commentaire
PROJ-123 #comment Correction du bug d'authentification, le token est maintenant validé côté serveur

# Logger du temps
PROJ-123 #time 2h30m Implémentation de la validation JWT

# Transition (changer le statut)
PROJ-123 #in-progress
PROJ-123 #done
PROJ-123 #in-review

# Combinaison multiple
PROJ-123 #comment Implémentation terminée #time 4h #done

# Multiple tickets dans un même commit
PROJ-123 PROJ-124 #comment Refactoring commun #time 1h30m

# Exemple réel de commit message
git commit -m "feat(auth): implement JWT validation

PROJ-123 #comment Added JWT token validation middleware with expiry check
PROJ-123 #time 3h
PROJ-123 #in-review"
\\\`\\\`\\\`

### Conventions de nommage des branches

\\\`\\\`\\\`
# Modèle recommandé :
# <type>/<ticket>-<description-courte>

# Types :
feature/    - Nouvelle fonctionnalité
bugfix/     - Correction de bug
hotfix/     - Correction urgente en production
release/    - Préparation de release
chore/      - Maintenance, refactoring
docs/       - Documentation

# Exemples :
feature/PROJ-123-user-authentication
bugfix/PROJ-456-fix-login-timeout
hotfix/PROJ-789-critical-security-patch
release/2.1.0
chore/PROJ-101-update-dependencies
docs/PROJ-202-api-documentation
\\\`\\\`\\\`

`,
      practiceContent: `## Travaux pratiques - Introduction à Bitbucket

### TP1 : Installation et configuration

1. Installer Bitbucket via Docker Compose (avec PostgreSQL et Elasticsearch)
2. Compléter le wizard de configuration
3. Configurer SSH (générer clé, ajouter dans Bitbucket, tester connexion)
4. Créer un projet "Formation DevOps" (clé: FORM)

### TP2 : Gestion des repositories

1. Créer un repository "my-app" dans le projet FORM
2. Cloner via SSH et via HTTPS
3. Créer des branches (feature/auth, feature/api, bugfix/login)
4. Pousser du code et vérifier via l'interface web
5. Configurer la branche par défaut à "main"

### TP3 : Pull Requests workflow

1. Créer une PR depuis feature/auth vers main
2. Ajouter des reviewers
3. Ajouter des commentaires inline sur le code
4. Créer des tasks (points à corriger)
5. Approuver et merger la PR

### TP4 : Sécurisation

1. Configurer les branch permissions :
   - main : pull-request-only, no-force-push, no-deletes
   - release/* : pull-request-only
2. Configurer les permissions du projet (groupes)
3. Ajouter un webhook vers un endpoint de test
4. Tester les Smart Commits avec Jira

### TP5 : API operations

1. Lister tous les repos d'un projet via API
2. Créer un repo via API
3. Créer une branche via API
4. Créer et merger une PR entièrement via API

### Questions de validation

- Quelle est la différence entre les ports 7990 et 7999 ?
- Comment fonctionnent les branch permissions par pattern ?
- Quels sont les événements webhook les plus importants pour CI/CD ?
- Comment configurer un deploy key (access key) pour un pipeline CI ?
- Quelle est la syntaxe complète des Smart Commits ?`,
      keyPoints: JSON.stringify([
        'Bitbucket Server/DC (ex-Stash) : hébergement Git entreprise avec PR, hooks, permissions et Code Search',
        'Installation Linux : Java 17 + Git 2.x + PostgreSQL + Elasticsearch + bin installer + systemd',
        'Architecture DC : Load Balancer + Nodes (7990 HTTP, 7999 SSH) + NFS + PostgreSQL + Elasticsearch + Smart Mirror',
        'API REST /rest/api/1.0/ : CRUD projets, repos, branches, commits, pull requests lifecycle complet',
        'Pull Requests : create, approve, decline, merge, comments inline, tasks, reviewers management',
        'Branch Permissions : pull-request-only, no-force-push, no-deletes, pattern-based (release/**)',
        'Smart Commits : PROJ-123 #comment text #time 2h30m #done - pilotage Jira depuis Git',
        'Webhooks : repo:refs_changed, pr:opened/merged/declined - intégration CI/CD et notifications'
      ]) },


    { id: 'bb-02', courseId: 'bitbucket', title: 'Pipelines CI/CD et intégration Jenkins', duration: '5h', orderIndex: 2,
      theoryContent: `## Pipelines CI/CD et intégration Jenkins

### Bitbucket Pipelines (Cloud) - Référence complète

Bitbucket Pipelines est le service CI/CD intégré à Bitbucket Cloud. Il permet d'exécuter des builds, tests et déploiements directement depuis le repository, configuré via un fichier YAML.

#### Structure du fichier bitbucket-pipelines.yml

\\\`\\\`\\\`yaml
# ============================================
# STRUCTURE COMPLÈTE bitbucket-pipelines.yml
# ============================================

# Image Docker par défaut pour tous les steps
image: node:18-alpine

# Définitions réutilisables
definitions:
  # Caches personnalisés
  caches:
    npm-cache: ~/.npm
    pip-cache: ~/.cache/pip
    maven-cache: ~/.m2/repository
    gradle-cache: ~/.gradle/caches
    docker-cache: /var/lib/docker

  # Services (containers additionnels)
  services:
    postgres:
      image: postgres:14-alpine
      variables:
        POSTGRES_DB: testdb
        POSTGRES_USER: testuser
        POSTGRES_PASSWORD: testpass
    redis:
      image: redis:7-alpine
    elasticsearch:
      image: elasticsearch:7.17.15
      variables:
        discovery.type: single-node
        ES_JAVA_OPTS: "-Xms512m -Xmx512m"
    mysql:
      image: mysql:8.0
      variables:
        MYSQL_DATABASE: testdb
        MYSQL_ROOT_PASSWORD: rootpass
    docker:
      memory: 2048

  # Steps réutilisables (YAML anchors)
  steps:
    - step: &lint-step
        name: "Lint"
        caches:
          - npm-cache
        script:
          - npm ci
          - npm run lint
    - step: &test-step
        name: "Test"
        caches:
          - npm-cache
        script:
          - npm ci
          - npm run test:coverage
        artifacts:
          - coverage/**

# ============================================
# PIPELINES PAR TYPE DE DÉCLENCHEUR
# ============================================

pipelines:
  # Pipeline par défaut (toutes les branches sans config spécifique)
  default:
    - step: *lint-step
    - step: *test-step

  # Pipelines par branche
  branches:
    main:
      - step: *lint-step
      - step: *test-step
      - step:
          name: "Build & Push Docker"
          services:
            - docker
          caches:
            - docker-cache
          script:
            - docker build -t myapp:latest .
            - docker tag myapp:latest registry.example.com/myapp:latest
            - echo \\\${DOCKER_PASSWORD} | docker login -u \\\${DOCKER_USERNAME} --password-stdin registry.example.com
            - docker push registry.example.com/myapp:latest
      - step:
          name: "Deploy to Production"
          deployment: production
          trigger: manual
          script:
            - pipe: atlassian/ssh-run:0.7.1
              variables:
                SSH_USER: deploy
                SERVER: prod.example.com
                COMMAND: "cd /app && docker-compose pull && docker-compose up -d"

    develop:
      - step: *lint-step
      - step: *test-step
      - step:
          name: "Deploy to Staging"
          deployment: staging
          script:
            - pipe: atlassian/ssh-run:0.7.1
              variables:
                SSH_USER: deploy
                SERVER: staging.example.com
                COMMAND: "cd /app && docker-compose pull && docker-compose up -d"

    'release/**':
      - step: *lint-step
      - step: *test-step
      - step:
          name: "Build Release"
          script:
            - npm run build
            - npm pack
          artifacts:
            - "*.tgz"

    'feature/**':
      - step: *lint-step
      - step: *test-step

  # Pipelines pour les tags
  tags:
    'v*':
      - step:
          name: "Build & Publish Release"
          script:
            - npm ci
            - npm run build
            - npm publish --tag latest

  # Pipelines pour les Pull Requests
  pull-requests:
    '**':
      - step: *lint-step
      - step: *test-step
      - step:
          name: "SonarQube Analysis"
          script:
            - pipe: sonarsource/sonarqube-scan:2.0.1
              variables:
                SONAR_HOST_URL: \\\${SONAR_URL}
                SONAR_TOKEN: \\\${SONAR_TOKEN}

  # Pipelines custom (déclenchement manuel)
  custom:
    deploy-to-production:
      - step:
          name: "Manual Deploy to Production"
          deployment: production
          script:
            - echo "Deploying to production..."
            - pipe: atlassian/ssh-run:0.7.1
              variables:
                SSH_USER: deploy
                SERVER: prod.example.com
                COMMAND: "cd /app && ./deploy.sh"

    database-migration:
      - step:
          name: "Run Database Migration"
          script:
            - npm run db:migrate
\\\`\\\`\\\`

#### Steps en parallèle

\\\`\\\`\\\`yaml
# ============================================
# PARALLEL STEPS (exécution simultanée)
# ============================================

pipelines:
  default:
    - parallel:
        - step:
            name: "Lint"
            script:
              - npm ci
              - npm run lint
        - step:
            name: "Unit Tests"
            script:
              - npm ci
              - npm run test:unit
        - step:
            name: "Integration Tests"
            services:
              - postgres
            script:
              - npm ci
              - npm run test:integration
    - step:
        name: "Build"
        script:
          - npm ci
          - npm run build
        artifacts:
          - dist/**
\\\`\\\`\\\`

#### Conditions (Monorepo support)

\\\`\\\`\\\`yaml
# ============================================
# CONDITIONS - Monorepo (exécution conditionnelle)
# ============================================

pipelines:
  default:
    - step:
        name: "Backend Tests"
        condition:
          changesets:
            includePaths:
              - "backend/**"
              - "shared/**"
        script:
          - cd backend
          - npm ci
          - npm run test
    - step:
        name: "Frontend Tests"
        condition:
          changesets:
            includePaths:
              - "frontend/**"
              - "shared/**"
        script:
          - cd frontend
          - npm ci
          - npm run test
    - step:
        name: "Infrastructure"
        condition:
          changesets:
            includePaths:
              - "terraform/**"
              - "k8s/**"
        script:
          - cd terraform
          - terraform plan
\\\`\\\`\\\`

#### Variables et deployments

\\\`\\\`\\\`yaml
# ============================================
# VARIABLES PRÉDÉFINIES BITBUCKET
# ============================================

# Variables système (automatiques) :
# BITBUCKET_BUILD_NUMBER      - Numéro de build incrémental
# BITBUCKET_COMMIT            - SHA du commit
# BITBUCKET_BRANCH            - Nom de la branche
# BITBUCKET_TAG               - Nom du tag (si déclenché par tag)
# BITBUCKET_PR_ID             - Numéro de la PR
# BITBUCKET_PR_DESTINATION_BRANCH - Branche cible de la PR
# BITBUCKET_REPO_SLUG         - Nom du repo (slug)
# BITBUCKET_REPO_FULL_NAME    - owner/repo
# BITBUCKET_WORKSPACE         - Nom du workspace
# BITBUCKET_CLONE_DIR         - Répertoire de travail
# BITBUCKET_STEP_UUID         - UUID unique du step
# BITBUCKET_PIPELINE_UUID     - UUID unique du pipeline
# BITBUCKET_DEPLOYMENT_ENVIRONMENT - Nom du deployment

# Variables personnalisées (à définir dans les settings) :
# - Repository variables (scope: repo)
# - Deployment variables (scope: environnement spécifique)
# - Workspace variables (scope: tous les repos)
# - Secured variables (masquées dans les logs)
\\\`\\\`\\\`

#### Déploiements (Deployments)

\\\`\\\`\\\`yaml
# ============================================
# DEPLOYMENTS - Environnements
# ============================================

# Les environnements de déploiement sont :
# - test (pas de restrictions)
# - staging (pas de restrictions par défaut)
# - production (confirmation manuelle recommandée)

pipelines:
  branches:
    main:
      - step:
          name: "Deploy to Test"
          deployment: test
          script:
            - echo "Deploying to test environment"
      - step:
          name: "Deploy to Staging"
          deployment: staging
          script:
            - echo "Deploying to staging environment"
      - step:
          name: "Deploy to Production"
          deployment: production
          trigger: manual  # Require manual approval
          script:
            - echo "Deploying to production environment"
\\\`\\\`\\\`


#### Caches et Artifacts

\\\`\\\`\\\`yaml
# ============================================
# CACHES (accélération des builds)
# ============================================

# Caches built-in :
# - node        (~/.npm et node_modules)
# - pip         (~/.cache/pip)
# - maven       (~/.m2/repository)
# - gradle      (~/.gradle/caches)
# - composer    (~/.composer/cache)
# - dotnetcore  (~/.nuget/packages)
# - docker      (/var/lib/docker)
# - sbt         (~/.sbt et ~/.ivy2/cache)

# Artifacts (fichiers passés entre steps) :
pipelines:
  default:
    - step:
        name: "Build"
        script:
          - npm ci
          - npm run build
        artifacts:
          - dist/**
          - coverage/**
          - "*.tgz"
    - step:
        name: "Deploy"
        script:
          # Les artifacts du step précédent sont automatiquement disponibles
          - ls dist/
          - ./deploy.sh dist/
\\\`\\\`\\\`

#### Services (containers additionnels)

\\\`\\\`\\\`yaml
# ============================================
# SERVICES - Containers pour tests
# ============================================

definitions:
  services:
    postgres:
      image: postgres:14
      variables:
        POSTGRES_DB: testdb
        POSTGRES_USER: test
        POSTGRES_PASSWORD: test
      memory: 1024
    
    redis:
      image: redis:7-alpine
      memory: 512
    
    mongodb:
      image: mongo:6
      memory: 1024
    
    custom-service:
      image: my-registry.com/my-service:latest
      variables:
        CONFIG_KEY: value
      memory: 2048

pipelines:
  default:
    - step:
        name: "Integration Tests"
        services:
          - postgres
          - redis
        script:
          # Les services sont accessibles via localhost
          - export DATABASE_URL="postgresql://test:test@localhost:5432/testdb"
          - export REDIS_URL="redis://localhost:6379"
          - npm ci
          - npm run test:integration
\\\`\\\`\\\`

#### Pipes (intégrations pré-configurées)

\\\`\\\`\\\`yaml
# ============================================
# PIPES - Intégrations populaires
# ============================================

# SSH deploy
- pipe: atlassian/ssh-run:0.7.1
  variables:
    SSH_USER: deploy
    SERVER: prod.example.com
    COMMAND: "cd /app && docker-compose up -d"

# AWS S3 Deploy
- pipe: atlassian/aws-s3-deploy:1.1.0
  variables:
    AWS_ACCESS_KEY_ID: \\\${AWS_ACCESS_KEY_ID}
    AWS_SECRET_ACCESS_KEY: \\\${AWS_SECRET_ACCESS_KEY}
    AWS_DEFAULT_REGION: eu-west-1
    S3_BUCKET: my-website-bucket
    LOCAL_PATH: dist/

# Slack notification
- pipe: atlassian/slack-notify:2.0.0
  variables:
    WEBHOOK_URL: \\\${SLACK_WEBHOOK_URL}
    MESSAGE: "Build #\\\${BITBUCKET_BUILD_NUMBER} deployed to production!"

# Docker Build and Push
- pipe: atlassian/docker-compose-run:1.0.0
  variables:
    DOCKER_COMPOSE_FILE: docker-compose.test.yml
    DOCKER_COMPOSE_COMMAND: up --exit-code-from tests

# SonarQube Scan
- pipe: sonarsource/sonarqube-scan:2.0.1
  variables:
    SONAR_HOST_URL: \\\${SONAR_URL}
    SONAR_TOKEN: \\\${SONAR_TOKEN}

# Kubernetes Deploy
- pipe: atlassian/kubectl-run:3.0.0
  variables:
    KUBE_CONFIG: \\\${KUBE_CONFIG}
    KUBECTL_COMMAND: "apply -f k8s/deployment.yaml"

# Terraform
- pipe: atlassian/terraform-plan:1.0.0
  variables:
    WORKING_DIR: terraform/
\\\`\\\`\\\`

#### Configuration de taille (Size)

\\\`\\\`\\\`yaml
# ============================================
# SIZE - Ressources allouées aux steps
# ============================================

# Tailles disponibles :
# 1x (default) : 4 GB RAM, build minutes x1
# 2x           : 8 GB RAM, build minutes x2
# 4x           : 16 GB RAM, build minutes x4
# 8x           : 32 GB RAM, build minutes x8

pipelines:
  default:
    - step:
        name: "Heavy Build"
        size: 2x  # 8 GB RAM pour builds gourmands
        script:
          - npm ci
          - npm run build
    - step:
        name: "Docker Build"
        size: 4x  # 16 GB pour build Docker multi-stage
        services:
          - docker
        script:
          - docker build -t myapp:latest .
\\\`\\\`\\\`

### Exemples complets de pipelines

\\\`\\\`\\\`yaml
# ============================================
# EXEMPLE 1 : Node.js (Lint + Test + Build + Deploy)
# ============================================

image: node:18

definitions:
  caches:
    npm: ~/.npm
  services:
    postgres:
      image: postgres:14
      variables:
        POSTGRES_DB: testdb
        POSTGRES_USER: test
        POSTGRES_PASSWORD: test

pipelines:
  branches:
    main:
      - parallel:
          - step:
              name: "ESLint + Prettier"
              caches: [npm]
              script:
                - npm ci
                - npm run lint
                - npm run format:check
          - step:
              name: "Unit Tests"
              caches: [npm]
              script:
                - npm ci
                - npm run test:unit -- --coverage
              artifacts:
                - coverage/**
          - step:
              name: "Integration Tests"
              caches: [npm]
              services: [postgres]
              script:
                - npm ci
                - npm run test:integration
      - step:
          name: "Build"
          caches: [npm]
          script:
            - npm ci
            - npm run build
          artifacts:
            - dist/**
      - step:
          name: "Deploy Production"
          deployment: production
          trigger: manual
          script:
            - pipe: atlassian/ssh-run:0.7.1
              variables:
                SSH_USER: deploy
                SERVER: prod.example.com
                COMMAND: "cd /app && git pull && npm ci --production && pm2 restart all"

# ============================================
# EXEMPLE 2 : Java/Maven (Build + Test + Sonar + Docker + Deploy)
# ============================================

image: maven:3.9-eclipse-temurin-17

definitions:
  caches:
    maven: ~/.m2/repository
  services:
    docker:
      memory: 2048

pipelines:
  branches:
    main:
      - step:
          name: "Build & Test"
          caches: [maven]
          script:
            - mvn clean verify -B
          artifacts:
            - target/*.jar
            - target/surefire-reports/**
      - step:
          name: "SonarQube Analysis"
          caches: [maven]
          script:
            - mvn sonar:sonar -Dsonar.host.url=\\\${SONAR_URL} -Dsonar.login=\\\${SONAR_TOKEN}
      - step:
          name: "Docker Build & Push"
          size: 2x
          services: [docker]
          script:
            - docker build -t \\\${DOCKER_REGISTRY}/myapp:\\\${BITBUCKET_COMMIT:0:7} .
            - docker tag \\\${DOCKER_REGISTRY}/myapp:\\\${BITBUCKET_COMMIT:0:7} \\\${DOCKER_REGISTRY}/myapp:latest
            - echo \\\${DOCKER_PASSWORD} | docker login -u \\\${DOCKER_USERNAME} --password-stdin \\\${DOCKER_REGISTRY}
            - docker push \\\${DOCKER_REGISTRY}/myapp:\\\${BITBUCKET_COMMIT:0:7}
            - docker push \\\${DOCKER_REGISTRY}/myapp:latest
      - step:
          name: "Deploy to K8s"
          deployment: production
          trigger: manual
          script:
            - pipe: atlassian/kubectl-run:3.0.0
              variables:
                KUBE_CONFIG: \\\${KUBE_CONFIG}
                KUBECTL_COMMAND: "set image deployment/myapp myapp=\\\${DOCKER_REGISTRY}/myapp:\\\${BITBUCKET_COMMIT:0:7}"

# ============================================
# EXEMPLE 3 : Monorepo avec conditions
# ============================================

image: node:18

pipelines:
  default:
    - parallel:
        - step:
            name: "Backend Tests"
            condition:
              changesets:
                includePaths: ["backend/**", "shared/**"]
            script:
              - cd backend && npm ci && npm test
        - step:
            name: "Frontend Tests"
            condition:
              changesets:
                includePaths: ["frontend/**", "shared/**"]
            script:
              - cd frontend && npm ci && npm test
        - step:
            name: "Terraform Plan"
            condition:
              changesets:
                includePaths: ["infra/**"]
            image: hashicorp/terraform:1.6
            script:
              - cd infra && terraform init && terraform plan
\\\`\\\`\\\`

### Bitbucket Data Center + Jenkins - Intégration complète

\\\`\\\`\\\`bash
# ============================================
# INTÉGRATION BITBUCKET SERVER + JENKINS
# ============================================

# 1. Configurer le webhook dans Bitbucket pour déclencher Jenkins

# Webhook URL pour Jenkins Generic Webhook Trigger Plugin :
# https://jenkins.example.com/generic-webhook-trigger/invoke?token=MY_SECRET_TOKEN

# Créer le webhook dans Bitbucket
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/webhooks" \\\\
  -d '{
    "name": "Jenkins Multibranch Trigger",
    "url": "https://jenkins.example.com/generic-webhook-trigger/invoke?token=bitbucket-trigger",
    "active": true,
    "events": ["repo:refs_changed", "pr:opened", "pr:merged"]
  }'

# 2. Configuration Jenkinsfile pour Multibranch Pipeline
# Le Jenkinsfile dans le repo sera automatiquement détecté

# 3. Reporter le build status à Bitbucket depuis Jenkins
# Dans le Jenkinsfile :
# - Utiliser le plugin "Bitbucket Build Status Notifier"
# - Ou via API REST :

# Reporter un build "in progress"
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/build-status/1.0/commits/COMMIT_SHA" \\\\
  -d '{
    "state": "INPROGRESS",
    "key": "jenkins-build-123",
    "name": "Jenkins Build #123",
    "url": "https://jenkins.example.com/job/my-app/123/",
    "description": "Build in progress..."
  }'

# Reporter un build "success"
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/build-status/1.0/commits/COMMIT_SHA" \\\\
  -d '{
    "state": "SUCCESSFUL",
    "key": "jenkins-build-123",
    "name": "Jenkins Build #123",
    "url": "https://jenkins.example.com/job/my-app/123/",
    "description": "Build passed - all tests green"
  }'

# Reporter un build "failed"
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/build-status/1.0/commits/COMMIT_SHA" \\\\
  -d '{
    "state": "FAILED",
    "key": "jenkins-build-123",
    "name": "Jenkins Build #123",
    "url": "https://jenkins.example.com/job/my-app/123/",
    "description": "Build failed - 3 tests failing"
  }'

# 4. Merge Check basé sur le build status
# Configuration dans Bitbucket :
# Repository Settings > Merge Checks > Required builds
# Exiger que le build soit "SUCCESSFUL" avant de pouvoir merger

# 5. Configuration Multibranch Pipeline Jenkins (via Job DSL ou UI)
# Source : Bitbucket Server
# Credentials : Personal Access Token ou SSH key
# Behaviors : Discover branches, Discover PRs
# Build Configuration : by Jenkinsfile
# Webhook trigger : Generic Webhook Trigger ou Bitbucket Branch Source plugin
\\\`\\\`\\\`

### Self-hosted Runners (Bitbucket Cloud)

\\\`\\\`\\\`bash
# ============================================
# RUNNERS SELF-HOSTED (Bitbucket Cloud)
# ============================================

# Les runners permettent d'exécuter les pipelines sur votre propre infrastructure
# Utile pour : accès réseau interne, performances, exigences de sécurité

# Installation d'un runner Linux
# 1. Obtenir le token d'enregistrement dans Workspace Settings > Runners

# 2. Installer Docker sur le serveur runner
sudo apt install -y docker.io
sudo systemctl enable docker && sudo systemctl start docker

# 3. Lancer le runner
docker run -d --name bitbucket-runner \\\\
  -e ACCOUNT_UUID="{workspace-uuid}" \\\\
  -e RUNNER_UUID="{runner-uuid}" \\\\
  -e OAUTH_CLIENT_ID="client-id" \\\\
  -e OAUTH_CLIENT_SECRET="client-secret" \\\\
  -e WORKING_DIRECTORY="/tmp/runner" \\\\
  -v /tmp/runner/docker:/var/run/docker.sock \\\\
  -v /var/run/docker.sock:/var/run/docker.sock \\\\
  --restart unless-stopped \\\\
  docker-public.packages.atlassian.com/sox/atlassian/bitbucket-pipelines-runner

# Utiliser le runner dans bitbucket-pipelines.yml
# pipelines:
#   default:
#     - step:
#         runs-on:
#           - self.hosted
#           - linux
#         script:
#           - echo "Running on self-hosted runner"
\\\`\\\`\\\`

`,
      practiceContent: `## Travaux pratiques - Pipelines CI/CD

### TP1 : Premier pipeline Bitbucket

1. Créer un projet Node.js simple (express API)
2. Écrire un bitbucket-pipelines.yml avec :
   - Step lint (eslint)
   - Step test (jest avec coverage)
   - Step build (npm run build)
3. Pousser et vérifier l'exécution du pipeline

### TP2 : Pipeline avancé avec services

1. Ajouter PostgreSQL comme service
2. Écrire des tests d'intégration qui utilisent la base
3. Configurer les artifacts pour passer le coverage entre steps
4. Ajouter des steps parallèles (lint + unit test + integration test)

### TP3 : Pipeline Docker complet

1. Écrire un Dockerfile multi-stage pour l'application
2. Configurer le pipeline pour :
   - Build l'image Docker
   - Push vers un registry
   - Deploy avec SSH
3. Utiliser les variables sécurisées pour les credentials
4. Ajouter un step de déploiement manuel (production)

### TP4 : Intégration Jenkins + Bitbucket

1. Configurer un webhook Bitbucket vers Jenkins
2. Créer un Multibranch Pipeline dans Jenkins
3. Reporter le build status vers Bitbucket via API
4. Configurer un merge check basé sur le build status
5. Tester le workflow complet : push → build → report → merge

### TP5 : Monorepo pipeline

1. Structurer un repo en monorepo (backend/ + frontend/ + infra/)
2. Configurer des conditions changesets pour chaque composant
3. Vérifier que seuls les steps pertinents s'exécutent lors d'un changement

### Questions de validation

- Quelle est la différence entre default, branches, tags et pull-requests pipelines ?
- Comment fonctionnent les artifacts entre les steps ?
- Quels sont les avantages des runners self-hosted ?
- Comment reporter le build status de Jenkins vers Bitbucket ?
- Comment configurer un merge check basé sur le build status ?`,
      keyPoints: JSON.stringify([
        'bitbucket-pipelines.yml : image, definitions (caches/services/steps), pipelines (default/branches/tags/PR/custom)',
        'Steps : parallel execution, conditions (changesets monorepo), artifacts, services (postgres/redis/docker)',
        'Deployments : test/staging/production avec trigger manual, variables par environnement',
        'Variables : repository/deployment/workspace + secured (masquées) + prédéfinies (BITBUCKET_COMMIT, BRANCH...)',
        'Pipes : intégrations pré-packagées (ssh-run, aws-s3-deploy, slack-notify, kubectl-run, sonarqube-scan)',
        'Size : 1x (4GB), 2x (8GB), 4x (16GB), 8x (32GB) - adapter aux besoins de build',
        'Jenkins integration : webhook trigger + Multibranch Pipeline + build-status API reporting + merge checks',
        'Runners self-hosted : exécution sur infrastructure propre pour accès réseau interne et performance'
      ]) },


    { id: 'bb-03', courseId: 'bitbucket', title: 'Administration avancée et workflows Git', duration: '5h', orderIndex: 3,
      theoryContent: `## Administration avancée et workflows Git

### Système de Hooks

Les hooks Git permettent d'exécuter des actions automatiques à certains moments du cycle Git (push, commit, merge).

#### Pre-receive hooks (côté serveur)
S'exécutent avant d'accepter un push. Peuvent rejeter le push si les conditions ne sont pas remplies.

\\\`\\\`\\\`bash
# ============================================
# PRE-RECEIVE HOOKS - Exemples
# ============================================

# Hook : Validation du format des messages de commit
# Fichier : pre-receive-hook-commit-message.sh
#!/bin/bash
while read oldrev newrev refname; do
  # Ignorer les suppressions de branche
  if [ "\\\${newrev}" = "0000000000000000000000000000000000000000" ]; then
    continue
  fi
  
  # Vérifier chaque commit
  for commit in \\\$(git rev-list \\\${oldrev}..\\\${newrev}); do
    msg=\\\$(git log --format=%s -1 \\\${commit})
    
    # Format requis : type(scope): description
    # Exemple : feat(auth): add JWT validation
    if ! echo "\\\${msg}" | grep -qE "^(feat|fix|docs|style|refactor|test|chore|ci|perf)(\(.+\))?: .{10,}"; then
      echo "ERROR: Commit message does not match conventional commits format"
      echo "  Commit: \\\${commit:0:8}"
      echo "  Message: \\\${msg}"
      echo "  Required format: type(scope): description (min 10 chars)"
      echo "  Types: feat, fix, docs, style, refactor, test, chore, ci, perf"
      exit 1
    fi
  done
done

# Hook : Vérification de la taille des fichiers
#!/bin/bash
MAX_FILE_SIZE=10485760  # 10 MB
while read oldrev newrev refname; do
  if [ "\\\${newrev}" = "0000000000000000000000000000000000000000" ]; then
    continue
  fi
  
  for commit in \\\$(git rev-list \\\${oldrev}..\\\${newrev}); do
    # Lister les fichiers modifiés dans ce commit
    for file in \\\$(git diff-tree --no-commit-id --name-only -r \\\${commit}); do
      size=\\\$(git cat-file -s \\\${newrev}:\\\${file} 2>/dev/null || echo 0)
      if [ "\\\${size}" -gt "\\\${MAX_FILE_SIZE}" ]; then
        echo "ERROR: File \\\${file} (\\\${size} bytes) exceeds maximum size limit (10 MB)"
        echo "  Consider using Git LFS for large files"
        exit 1
      fi
    done
  done
done

# Hook : Validation du nom de branche
#!/bin/bash
while read oldrev newrev refname; do
  branch=\\\$(echo "\\\${refname}" | sed 's|refs/heads/||')
  
  # Pattern autorisé : main, develop, feature/*, bugfix/*, hotfix/*, release/*
  if ! echo "\\\${branch}" | grep -qE "^(main|develop|feature/.+|bugfix/.+|hotfix/.+|release/.+|chore/.+)$"; then
    echo "ERROR: Branch name '\\\${branch}' does not match the naming convention"
    echo "  Allowed patterns: main, develop, feature/*, bugfix/*, hotfix/*, release/*, chore/*"
    exit 1
  fi
done

# Hook : Empêcher le push de secrets
#!/bin/bash
PATTERNS=(
  "AKIA[0-9A-Z]{16}"          # AWS Access Key
  "-----BEGIN.*PRIVATE KEY"    # Private keys
  "password\\s*=\\s*['\"].+['\"]"  # Hardcoded passwords
  "['\"]sk_live_[a-zA-Z0-9]+"  # Stripe keys
)

while read oldrev newrev refname; do
  for commit in \\\$(git rev-list \\\${oldrev}..\\\${newrev}); do
    diff=\\\$(git diff-tree -p \\\${commit})
    for pattern in "\\\${PATTERNS[@]}"; do
      if echo "\\\${diff}" | grep -qE "\\\${pattern}"; then
        echo "ERROR: Potential secret detected in commit \\\${commit:0:8}"
        echo "  Pattern: \\\${pattern}"
        echo "  Please remove secrets and use environment variables"
        exit 1
      fi
    done
  done
done
\\\`\\\`\\\`

#### Post-receive hooks
S'exécutent après un push réussi. Ne peuvent pas rejeter le push mais peuvent déclencher des actions.

\\\`\\\`\\\`bash
# ============================================
# POST-RECEIVE HOOKS - Exemples
# ============================================

# Hook : Notification Slack après push
#!/bin/bash
while read oldrev newrev refname; do
  branch=\\\$(echo "\\\${refname}" | sed 's|refs/heads/||')
  author=\\\$(git log --format='%an' -1 \\\${newrev})
  message=\\\$(git log --format='%s' -1 \\\${newrev})
  
  curl -s -X POST "\\\${SLACK_WEBHOOK_URL}" \\
    -H "Content-Type: application/json" \\
    -d "{
      \"text\": \"Push to \\\${branch} by \\\${author}: \\\${message}\",
      \"channel\": \"#dev-notifications\"
    }"
done

# Hook : Déclenchement de déploiement automatique
#!/bin/bash
while read oldrev newrev refname; do
  branch=\\\$(echo "\\\${refname}" | sed 's|refs/heads/||')
  
  if [ "\\\${branch}" = "main" ]; then
    # Déclencher le pipeline de déploiement
    curl -s -X POST "https://jenkins.example.com/job/deploy-prod/build" \\
      -H "Authorization: Bearer \\\${JENKINS_TOKEN}"
  elif [ "\\\${branch}" = "develop" ]; then
    curl -s -X POST "https://jenkins.example.com/job/deploy-staging/build" \\
      -H "Authorization: Bearer \\\${JENKINS_TOKEN}"
  fi
done
\\\`\\\`\\\`

#### Hooks intégrés Bitbucket (configurables via UI/API)
- **Reject Force Push** : empêcher git push --force
- **Reject Branch Deletion** : empêcher la suppression de branches
- **Require Pull Request** : interdire le push direct
- **Required Builds** : exiger un build vert avant merge
- **Required Approvals** : exiger N approbations avant merge
- **Merge Commit Message** : template de message de merge

### Branch Model et stratégies

#### Git Flow

\\\`\\\`\\\`
┌────────────────────────────────────────────────────────────────┐
│                         GIT FLOW                                │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  main (production)                                               │
│  ─────●─────────────────────────●────────────●──────▶           │
│       │                         ↑            ↑                   │
│       │    hotfix/critical-fix  │            │                   │
│       └──────●──────●───────────┘            │                   │
│                                              │                   │
│  develop                                     │                   │
│  ─────●──●──●──●──●──●──●──●──●──●──●──────●──▶                │
│       │     ↑  │     ↑     ↑  │   ↑                            │
│       │     │  │     │     │  │   │                             │
│       │  feature/   │  feature/│   │                             │
│       │  user-auth  │  payment │   │                             │
│       └──●──●──●────┘  ●──●───┘   │                             │
│                                    │                             │
│              release/2.0           │                             │
│              ●──●──●───────────────┘                             │
│                                                                  │
└────────────────────────────────────────────────────────────────┘

Branches :
- main       : production stable, chaque commit = release
- develop    : intégration, base pour les features
- feature/*  : nouvelles fonctionnalités (depuis develop, merge vers develop)
- release/*  : préparation release (depuis develop, merge vers main + develop)
- hotfix/*   : corrections urgentes (depuis main, merge vers main + develop)
\\\`\\\`\\\`

#### GitHub Flow (simplifié)

\\\`\\\`\\\`
┌────────────────────────────────────────────────────────────────┐
│                       GITHUB FLOW                               │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  main (always deployable)                                        │
│  ─────●──────●──────────────●──────────●──────────●─────▶      │
│       │      ↑              ↑          ↑          ↑             │
│       │      │              │          │          │             │
│       │   feature/auth   feature/api   │       bugfix/x        │
│       └──●──●──●───────┘ ●──●──●──────┘   ●──●──┘             │
│          PR+Review        PR+Review         PR+Review           │
│                                                                  │
└────────────────────────────────────────────────────────────────┘

Principes :
- main est TOUJOURS déployable
- Créer une branche depuis main pour chaque changement
- PR + code review obligatoire
- Merger dans main = déployer
- Pas de branche develop séparée
\\\`\\\`\\\`

#### Trunk-based Development

\\\`\\\`\\\`
┌────────────────────────────────────────────────────────────────┐
│                  TRUNK-BASED DEVELOPMENT                         │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  main (trunk)                                                    │
│  ─────●──●──●──●──●──●──●──●──●──●──●──●──●──●──●─────▶      │
│       │  ↑  │  ↑     │  ↑                                      │
│       │  │  │  │     │  │                                       │
│       └●─┘  └●─┘     └●─┘                                      │
│     short-lived feature branches (< 2 days)                     │
│                                                                  │
│  Principes :                                                     │
│  - Commits fréquents dans main (trunk)                          │
│  - Feature branches ultra-courtes (heures, pas jours)           │
│  - Feature flags pour cacher le code incomplet                  │
│  - CI/CD rapide et fiable                                       │
│  - Pair programming remplace parfois la code review             │
│                                                                  │
└────────────────────────────────────────────────────────────────┘
\\\`\\\`\\\`

#### Configuration du Branch Model dans Bitbucket

\\\`\\\`\\\`bash
# ============================================
# CONFIGURATION BRANCH MODEL VIA API
# ============================================

# Configurer le modèle de branches du repository
curl -s -u \\\${AUTH} -X PUT \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/branch-utils/1.0/projects/PROJ/repos/my-app/branchmodel/configuration" \\\\
  -d '{
    "development": {"refId": "refs/heads/develop", "useDefault": false},
    "production": {"refId": "refs/heads/main", "useDefault": false},
    "types": [
      {"id": "FEATURE", "displayName": "Feature", "prefix": "feature/", "enabled": true},
      {"id": "BUGFIX", "displayName": "Bugfix", "prefix": "bugfix/", "enabled": true},
      {"id": "HOTFIX", "displayName": "Hotfix", "prefix": "hotfix/", "enabled": true},
      {"id": "RELEASE", "displayName": "Release", "prefix": "release/", "enabled": true}
    ]
  }'
\\\`\\\`\\\`

### Pull Request Workflows avancés

#### Merge Checks (conditions de merge)

\\\`\\\`\\\`bash
# ============================================
# MERGE CHECKS CONFIGURATION
# ============================================

# Configurer le nombre minimum d'approbations
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/settings/merge-checks" \\\\
  -d '{
    "required-approvals": {"count": 2},
    "required-all-approvers-merge": false,
    "required-builds": {"count": 1},
    "no-incomplete-tasks": true
  }'

# Merge checks disponibles :
# - Minimum approvals (2+ reviewers must approve)
# - All reviewers must approve
# - No changes requested (no "needs work" status)
# - Required successful builds (1+ builds green)
# - No incomplete tasks (all PR tasks must be resolved)
# - Branch up-to-date (PR branch must include latest target changes)
\\\`\\\`\\\`

#### Default Reviewers

\\\`\\\`\\\`bash
# Configurer des reviewers par défaut
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/default-reviewers/1.0/projects/PROJ/repos/my-app/condition" \\\\
  -d '{
    "sourceMatcher": {
      "id": "feature/**",
      "type": {"id": "PATTERN"}
    },
    "targetMatcher": {
      "id": "main",
      "type": {"id": "BRANCH"}
    },
    "reviewers": [
      {"name": "tech.lead"},
      {"name": "senior.dev"}
    ],
    "requiredApprovals": 1
  }'

# Reviewer par pattern : toutes les PR vers main doivent avoir le tech lead
# Pattern source: ** (toutes les branches)
# Pattern target: main
# Reviewer: tech.lead (obligatoire)
\\\`\\\`\\\`


### Merge Strategies (Stratégies de fusion)

#### Merge Commit (par défaut)

\\\`\\\`\\\`
# Crée un commit de merge préservant l'historique complet
# Quand utiliser : quand l'historique de la branche a de la valeur
#
# Avant :
# main:    A---B---C
#                   \\
# feature:           D---E---F
#
# Après merge commit :
# main:    A---B---C---------G (merge commit)
#                   \\       /
# feature:           D---E---F

git merge --no-ff feature/auth
\\\`\\\`\\\`

#### Squash Merge

\\\`\\\`\\\`
# Combine tous les commits de la branche en un seul commit
# Quand utiliser : quand les commits intermédiaires sont du bruit (WIP, fix typo)
#
# Avant :
# main:    A---B---C
#                   \\
# feature:           D---E---F
#
# Après squash :
# main:    A---B---C---G (single commit with all changes from D+E+F)

git merge --squash feature/auth
git commit -m "feat(auth): implement JWT authentication"
\\\`\\\`\\\`

#### Fast-Forward Only

\\\`\\\`\\\`
# Avance simplement le pointeur de branche (historique linéaire)
# Quand utiliser : quand vous voulez un historique parfaitement linéaire
# Condition : la branche feature doit être à jour avec main
#
# Avant (feature basée sur C, main est à C) :
# main:    A---B---C
#                   \\
# feature:           D---E---F
#
# Après fast-forward :
# main:    A---B---C---D---E---F
#
# Note : échoue si main a avancé depuis la création de la branche

git merge --ff-only feature/auth
\\\`\\\`\\\`

#### Rebase + Merge

\\\`\\\`\\\`
# Rebase la branche sur la cible avant de merger (fast-forward)
# Quand utiliser : historique linéaire propre tout en préservant les commits
#
# Avant :
# main:    A---B---C---X---Y
#                   \\
# feature:           D---E---F
#
# Après rebase :
# main:    A---B---C---X---Y
#                            \\
# feature:                    D'--E'--F' (commits rejoués)
#
# Puis fast-forward merge :
# main:    A---B---C---X---Y---D'--E'--F'

git rebase main feature/auth
git checkout main
git merge --ff-only feature/auth
\\\`\\\`\\\`

#### Configuration dans Bitbucket

\\\`\\\`\\\`bash
# Configurer la stratégie de merge par défaut
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/settings/merge-strategies" \\\\
  -d '{
    "defaultStrategy": {"id": "squash"},
    "strategies": [
      {"id": "merge-commit", "enabled": true},
      {"id": "squash", "enabled": true},
      {"id": "fast-forward-only", "enabled": true},
      {"id": "rebase-no-ff", "enabled": true}
    ]
  }'
\\\`\\\`\\\`

### Permissions et sécurité avancées

\\\`\\\`\\\`bash
# ============================================
# PERMISSIONS COMPLÈTES
# ============================================

# Hiérarchie des permissions :
# Global > Project > Repository > Branch

# Permissions projet (par groupe)
curl -s -u \\\${AUTH} -X PUT \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/PROJ/permissions/groups?name=developers&permission=PROJECT_WRITE"

curl -s -u \\\${AUTH} -X PUT \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/PROJ/permissions/groups?name=qa-team&permission=PROJECT_READ"

curl -s -u \\\${AUTH} -X PUT \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/PROJ/permissions/groups?name=lead-devs&permission=PROJECT_ADMIN"

# Permissions repository (fine-grained)
curl -s -u \\\${AUTH} -X PUT \\\\
  "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/sensitive-config/permissions/groups?name=ops-team&permission=REPO_ADMIN"

# Lister les permissions d'un repository
curl -s -u \\\${AUTH} "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/permissions/groups"
curl -s -u \\\${AUTH} "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/permissions/users"

# Branch permissions avec exemptions
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/branch-permissions/2.0/projects/PROJ/repos/my-app/restrictions" \\\\
  -d '{
    "type": "pull-request-only",
    "matcher": {
      "id": "main",
      "type": {"id": "BRANCH"}
    },
    "users": [],
    "groups": ["release-managers"]
  }'
# Note: les users/groups listés sont EXEMPTÉS de la restriction

# Access Keys (Deploy Keys) - clé SSH pour CI/CD
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/keys/1.0/projects/PROJ/repos/my-app/ssh" \\\\
  -d '{
    "key": {"text": "ssh-ed25519 AAAAC3... jenkins@ci-server"},
    "permission": "REPO_READ",
    "label": "Jenkins CI - Read Only"
  }'

# Personal Access Tokens (alternative aux mots de passe)
# Créer via UI : Account Settings > Personal Access Tokens
# Permissions : PROJECT_READ, REPO_WRITE, etc.
# Utilisation :
curl -H "Authorization: Bearer PERSONAL_ACCESS_TOKEN" \\\\
  "\\\${BB_URL}/rest/api/1.0/projects"
\\\`\\\`\\\`

### Intégration avec Jira

\\\`\\\`\\\`bash
# ============================================
# INTÉGRATION BITBUCKET + JIRA
# ============================================

# 1. Application Links (configuration dans Administration)
# Administration > Application Links > Add link to Jira
# URL: https://jira.example.com
# Type: OAuth / Two-way

# 2. Smart Commits (activés automatiquement avec App Link)
# Format : ISSUE-KEY #command param
git commit -m "feat(auth): implement login flow

PROJ-123 #comment Implemented JWT login with refresh tokens
PROJ-123 #time 4h
PROJ-123 #in-review"

# 3. Development panel dans Jira
# Automatiquement alimenté via App Link :
# - Branches associées au ticket
# - Commits référençant le ticket
# - Pull Requests liées
# - Build status

# 4. Automation : auto-transition sur PR merge
# Configuration dans Jira Automation Rules :
# Trigger: Incoming webhook (from Bitbucket, event: pr:merged)
# Condition: Issue key found in PR title or branch name
# Action: Transition issue to "Done"

# Webhook payload example (pr:merged) :
# {
#   "eventKey": "pr:merged",
#   "pullRequest": {
#     "title": "PROJ-123: Implement user auth",
#     "fromRef": {"displayId": "feature/PROJ-123-auth"},
#     "toRef": {"displayId": "main"}
#   }
# }

# 5. Branch creation depuis Jira
# Dans le ticket Jira, cliquer "Create Branch"
# Crée automatiquement : feature/PROJ-123-issue-summary
\\\`\\\`\\\`

### Administration et maintenance

\\\`\\\`\\\`bash
# ============================================
# MAINTENANCE DES REPOSITORIES
# ============================================

# Git Garbage Collection (nettoyage des objets orphelins)
# Déclencher manuellement via API
curl -s -u \\\${AUTH} -X POST \\\\
  "\\\${BB_URL}/rest/git/1.0/admin/projects/PROJ/repos/my-app/gc"

# Vérification d'intégrité (fsck)
cd /var/atlassian/application-data/bitbucket/shared/data/repositories/1
git fsck --full --strict

# Taille du repository
du -sh /var/atlassian/application-data/bitbucket/shared/data/repositories/1

# ============================================
# BACKUP STRATEGIES
# ============================================

# Méthode 1 : git clone --mirror (recommandé pour les repos)
mkdir -p /backup/bitbucket/repos
for repo_path in /var/atlassian/application-data/bitbucket/shared/data/repositories/*; do
  repo_id=\\\$(basename \\\${repo_path})
  git clone --mirror \\\${repo_path} /backup/bitbucket/repos/\\\${repo_id}.git
done

# Méthode 2 : Backup base de données
pg_dump -h localhost -U bitbucketuser -d bitbucketdb -F c \\\\
  -f /backup/bitbucket/db_\\\$(date +%Y%m%d).dump

# Méthode 3 : Backup complet (BDD + repos + config)
cat > /opt/scripts/bitbucket-backup.sh << 'SCRIPT'
#!/bin/bash
set -e
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backup/bitbucket/\\\${DATE}"
mkdir -p \\\${BACKUP_DIR}

echo "Backing up database..."
pg_dump -h localhost -U bitbucketuser -d bitbucketdb -F c -f \\\${BACKUP_DIR}/db.dump

echo "Backing up BITBUCKET_HOME..."
tar -czf \\\${BACKUP_DIR}/home.tar.gz \\
  --exclude='*/caches/*' \\
  --exclude='*/tmp/*' \\
  --exclude='*/log/*' \\
  /var/atlassian/application-data/bitbucket/

echo "Backup complete: \\\${BACKUP_DIR}"

# Retention 14 jours
find /backup/bitbucket/ -maxdepth 1 -type d -mtime +14 -exec rm -rf {} +
SCRIPT
chmod +x /opt/scripts/bitbucket-backup.sh
echo "0 2 * * * /opt/scripts/bitbucket-backup.sh" | crontab -

# ============================================
# GIT LFS (Large File Storage)
# ============================================

# Activer LFS sur le serveur (configuration globale)
# Administration > Git LFS > Enable

# Configuration côté client
git lfs install

# Tracker les fichiers volumineux
git lfs track "*.psd"
git lfs track "*.zip"
git lfs track "*.bin"
git lfs track "assets/**/*.png"
cat .gitattributes

# Vérifier les fichiers LFS
git lfs ls-files

# Migration de fichiers existants vers LFS
git lfs migrate import --include="*.jar" --everything

# ============================================
# REPOSITORY MIRRORING
# ============================================

# Configurer un miroir (lecture seule) vers GitHub
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/mirroring/1.0/repos/1/mirror" \\\\
  -d '{
    "mirrorUrl": "https://github.com/org/repo-mirror.git",
    "username": "github-bot",
    "password": "token"
  }'

# Synchronisation manuelle
curl -s -u \\\${AUTH} -X POST \\\\
  "\\\${BB_URL}/rest/mirroring/1.0/repos/1/mirror/sync"

# ============================================
# USER MANAGEMENT ET SSO/LDAP
# ============================================

# Lister les utilisateurs
curl -s -u \\\${AUTH} "\\\${BB_URL}/rest/api/1.0/admin/users?limit=100"

# Créer un utilisateur
curl -s -u \\\${AUTH} -X POST \\\\
  -H "Content-Type: application/json" \\\\
  "\\\${BB_URL}/rest/api/1.0/admin/users?name=new.user&password=TempPass123!&displayName=New+User&emailAddress=new@example.com"

# Configuration LDAP/Active Directory
# Administration > User Directories > Add Directory
# Type: Microsoft Active Directory / OpenLDAP
# URL: ldap://ldap.example.com:389
# Base DN: dc=example,dc=com
# User Filter: (&(objectClass=user)(sAMAccountName={0}))
# Group Filter: (&(objectClass=group)(member={0}))

# ============================================
# PERFORMANCE MONITORING
# ============================================

# JVM tuning (setenv.sh)
JVM_MINIMUM_MEMORY="2048m"
JVM_MAXIMUM_MEMORY="4096m"
JVM_SUPPORT_RECOMMENDED_ARGS="-XX:+UseG1GC -XX:MaxGCPauseMillis=200"

# Health check endpoints
curl -s "\\\${BB_URL}/status"
curl -s -u \\\${AUTH} "\\\${BB_URL}/rest/api/1.0/admin/cluster"

# Repository statistics
curl -s -u \\\${AUTH} "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos/my-app/statistics"

# ============================================
# DISASTER RECOVERY
# ============================================

# Plan de DR pour Bitbucket :
# 1. Backup quotidien automatisé (BDD + repos)
# 2. Réplication PostgreSQL (streaming replica)
# 3. Stockage des repos sur NFS/EFS avec snapshot
# 4. Script de restauration testé mensuellement
# 5. RTO (Recovery Time Objective) : 1h
# 6. RPO (Recovery Point Objective) : 1h (dernier backup)

# Procédure de restauration :
# 1. Provisioner nouveau serveur (même specs)
# 2. Installer Bitbucket (même version !)
# 3. Restaurer BDD (pg_restore)
# 4. Restaurer BITBUCKET_HOME (tar -xzf)
# 5. Vérifier les permissions fichiers
# 6. Démarrer et vérifier
# 7. Tester le clone d'un repo
# 8. Mettre à jour DNS/Load Balancer
\\\`\\\`\\\`

### Migration depuis/vers d'autres plateformes

\\\`\\\`\\\`bash
# ============================================
# MIGRATION VERS/DEPUIS BITBUCKET
# ============================================

# Migration depuis GitHub vers Bitbucket
# 1. Clone mirror depuis GitHub
git clone --mirror https://github.com/org/repo.git
cd repo.git

# 2. Push vers Bitbucket
git remote add bitbucket ssh://git@bitbucket.example.com:7999/PROJ/repo.git
git push --mirror bitbucket

# Migration depuis GitLab vers Bitbucket
git clone --mirror https://gitlab.example.com/group/repo.git
cd repo.git
git remote add bitbucket ssh://git@bitbucket.example.com:7999/PROJ/repo.git
git push --mirror bitbucket

# Migration depuis SVN vers Git/Bitbucket
# 1. Créer le fichier authors
svn log --xml svn://svn.example.com/repo | grep author | sort -u > authors-transform.txt
# Format : svnuser = Git Name <email@example.com>

# 2. Clone SVN vers Git
git svn clone svn://svn.example.com/repo \\\\
  --authors-file=authors-transform.txt \\\\
  --stdlayout \\\\
  --no-metadata \\\\
  migrated-repo

# 3. Nettoyer et push vers Bitbucket
cd migrated-repo
git remote add origin ssh://git@bitbucket.example.com:7999/PROJ/migrated-repo.git
git push --all origin
git push --tags origin

# Migration massive (multiple repos)
# Utiliser l'outil Atlassian "Bitbucket Server Migration"
# Ou script bash :
REPOS=("repo1" "repo2" "repo3")
for repo in "\\\${REPOS[@]}"; do
  git clone --mirror "https://github.com/org/\\\${repo}.git" "/tmp/\\\${repo}.git"
  
  # Créer le repo dans Bitbucket via API
  curl -s -u \\\${AUTH} -X POST \\\\
    -H "Content-Type: application/json" \\\\
    "\\\${BB_URL}/rest/api/1.0/projects/PROJ/repos" \\\\
    -d "{\"name\": \"\\\${repo}\", \"scmId\": \"git\"}"
  
  # Push mirror
  cd "/tmp/\\\${repo}.git"
  git remote add bitbucket "ssh://git@bitbucket.example.com:7999/PROJ/\\\${repo}.git"
  git push --mirror bitbucket
  cd /tmp
  
  echo "Migrated: \\\${repo}"
done
\\\`\\\`\\\`

`,
      practiceContent: `## Travaux pratiques - Administration avancée

### TP1 : Hooks et validation

1. Créer un pre-receive hook pour valider les messages de commit (Conventional Commits)
2. Créer un hook pour empêcher les fichiers > 5 MB
3. Créer un post-receive hook pour notifier Slack
4. Configurer les hooks intégrés : no-force-push sur main, required-builds

### TP2 : Branch Model et Merge Strategy

1. Configurer Git Flow sur le repository
2. Créer les branches : main, develop
3. Créer une feature branch, faire des commits, et merger via PR
4. Configurer la stratégie par défaut : squash pour features, merge-commit pour releases
5. Tester fast-forward-only et voir quand il échoue

### TP3 : Merge Checks et Reviews

1. Configurer les merge checks :
   - 2 approbations minimum
   - Build successful requis
   - No incomplete tasks
2. Configurer des default reviewers (tech lead pour toutes les PR vers main)
3. Tester le workflow complet : PR → review → approve → merge
4. Configurer un auto-merge quand toutes les conditions sont remplies

### TP4 : Sécurité et permissions

1. Configurer les permissions par groupe :
   - developers : PROJECT_WRITE
   - qa-team : PROJECT_READ
   - devops : PROJECT_ADMIN
2. Configurer les branch permissions avec exemptions
3. Créer un access key (deploy key) pour le CI
4. Créer un Personal Access Token et tester l'API

### TP5 : Maintenance et backup

1. Écrire un script de backup complet (BDD + repos)
2. Configurer Git LFS pour les fichiers binaires
3. Effectuer un git gc sur un repository
4. Tester une migration depuis GitHub (clone mirror + push)
5. Documenter la procédure de Disaster Recovery

### Questions de validation

- Quelle est la différence entre pre-receive et post-receive hooks ?
- Quand utiliser squash vs merge commit vs fast-forward ?
- Comment configurer des default reviewers par pattern de branche ?
- Quelle est la procédure de Disaster Recovery pour Bitbucket ?
- Comment migrer un repository depuis SVN vers Bitbucket ?`,
      keyPoints: JSON.stringify([
        'Hooks : pre-receive (validation commit msg, file size, branch naming, secrets) et post-receive (notifications, deploy)',
        'Branch Models : Git Flow (main/develop/feature/release/hotfix), GitHub Flow (main+features), Trunk-based (short-lived)',
        'Pull Request Merge Checks : required approvals, green builds, no tasks, up-to-date branch, default reviewers',
        'Merge Strategies : merge commit (historique), squash (clean), fast-forward (linéaire), rebase+merge (replay)',
        'Permissions : Global > Project > Repository > Branch avec exemptions par groupe/utilisateur',
        'Jira Integration : Smart Commits, Development Panel, auto-transition on merge, branch creation depuis Jira',
        'Maintenance : git gc, backup (pg_dump + mirror clone), LFS pour gros fichiers, mirroring, DR plan',
        'Migration : git clone --mirror + push depuis GitHub/GitLab/SVN avec authors-transform et bulk scripts'
      ]) },



  ],

  quizQuestions: [
    { id: 'quiz-art-01', courseId: 'artifactory', moduleId: 'art-01',
      question: 'Quel est le rôle principal d\'Artifactory dans une chaîne CI/CD ?',
      options: JSON.stringify(['Compiler le code source', 'Stocker et gérer les artefacts binaires de manière centralisée', 'Exécuter les tests unitaires', 'Déployer les applications en production']),
      correctIndex: 1,
      explanation: 'Artifactory est un gestionnaire de dépôts d\'artefacts universel. Il stocke et gère tous les binaires (JAR, Docker images, npm packages, etc.) générés pendant le cycle de développement.' },

    { id: 'quiz-art-02', courseId: 'artifactory', moduleId: 'art-01',
      question: 'Quelle est la différence entre un dépôt local, distant et virtuel dans Artifactory ?',
      options: JSON.stringify(['Local stocke les artefacts internes, distant est un proxy-cache de dépôts externes, virtuel agrège les deux', 'Local est sur le serveur, distant est dans le cloud, virtuel est temporaire', 'Local est pour Maven, distant pour npm, virtuel pour Docker', 'Il n\'y a pas de différence, ce sont des synonymes']),
      correctIndex: 0,
      explanation: 'Un dépôt local héberge vos artefacts internes, un dépôt distant sert de proxy-cache pour les registres publics (Maven Central, npmjs), et un dépôt virtuel combine plusieurs dépôts sous une URL unique.' },

    { id: 'quiz-art-03', courseId: 'artifactory', moduleId: 'art-01',
      question: 'Quel langage est utilisé par AQL (Artifactory Query Language) pour rechercher des artefacts ?',
      options: JSON.stringify(['SQL standard', 'Un DSL propriétaire avec syntaxe JSON-like pour requêter les métadonnées', 'GraphQL', 'XPath']),
      correctIndex: 1,
      explanation: 'AQL est un langage de requête propriétaire avec une syntaxe JSON-like permettant de rechercher des artefacts par leurs propriétés, métadonnées, dates, et statistiques d\'utilisation.' },

    // ==================== SONARQUBE QUIZ ====================
    { id: 'quiz-sq-01', courseId: 'sonarqube', moduleId: 'sq-01',
      question: 'Quels sont les 3 types de problèmes détectés par SonarQube ?',
      options: JSON.stringify(['Bugs, vulnérabilités et code smells', 'Erreurs de compilation, warnings et informations', 'Critiques, majeures et mineures', 'Syntaxe, logique et performance']),
      correctIndex: 0,
      explanation: 'SonarQube classe les problèmes en 3 catégories : Bugs (problèmes de fiabilité), Vulnérabilités (problèmes de sécurité), et Code Smells (problèmes de maintenabilité).' },

    { id: 'quiz-sq-02', courseId: 'sonarqube', moduleId: 'sq-01',
      question: 'Qu\'est-ce qu\'un Quality Gate dans SonarQube ?',
      options: JSON.stringify(['Un plugin de sécurité', 'Un ensemble de conditions qui déterminent si le code est prêt pour la production', 'Un rapport PDF généré automatiquement', 'Un outil de refactoring automatique']),
      correctIndex: 1,
      explanation: 'Un Quality Gate est un ensemble de conditions (couverture de code > 80%, 0 bugs critiques, etc.) qui détermine si le nouveau code est suffisamment bon pour être mergé ou déployé.' },

    { id: 'quiz-sq-03', courseId: 'sonarqube', moduleId: 'sq-01',
      question: 'Quel outil permet d\'analyser le code localement dans l\'IDE avec connexion au serveur SonarQube ?',
      options: JSON.stringify(['SonarScanner', 'SonarLint en Connected Mode', 'SonarAnalyzer', 'SonarCloud']),
      correctIndex: 1,
      explanation: 'SonarLint est un plugin IDE qui, en Connected Mode, synchronise les règles et profils de qualité du serveur SonarQube pour fournir un feedback en temps réel au développeur.' },

    // ==================== DOORS QUIZ ====================
    { id: 'quiz-doors-01', courseId: 'doors', moduleId: 'doors-01',
      question: 'Quel est l\'élément de base pour stocker les exigences dans DOORS ?',
      options: JSON.stringify(['Un dossier', 'Un module formel contenant des objets', 'Un fichier Excel importé', 'Une base de données SQL']),
      correctIndex: 1,
      explanation: 'Dans DOORS, les exigences sont stockées dans des modules formels. Chaque module contient des objets (requirements) organisés hiérarchiquement avec des attributs et des liens.' },

    { id: 'quiz-doors-02', courseId: 'doors', moduleId: 'doors-01',
      question: 'Comment DOORS assure-t-il la traçabilité entre exigences ?',
      options: JSON.stringify(['Par des fichiers de mapping externes', 'Par des liens (link modules) entre objets de modules différents', 'Par des tags de version', 'Par des commentaires dans le texte']),
      correctIndex: 1,
      explanation: 'DOORS utilise des Link Modules pour créer des liens typés entre objets de modules différents, permettant la traçabilité complète (exigences système → logiciel → tests).' },

    { id: 'quiz-doors-03', courseId: 'doors', moduleId: 'doors-01',
      question: 'Quel langage de script est intégré à DOORS pour l\'automatisation ?',
      options: JSON.stringify(['Python', 'JavaScript', 'DXL (DOORS Extension Language)', 'Perl']),
      correctIndex: 2,
      explanation: 'DXL (DOORS Extension Language) est un langage de script C-like intégré à DOORS permettant d\'automatiser les exports, audits, génération de rapports et manipulations en masse.' },

    // ==================== CLEARCASE QUIZ ====================
    { id: 'quiz-cc-01', courseId: 'clearcase', moduleId: 'cc-01',
      question: 'Qu\'est-ce qu\'un VOB dans ClearCase ?',
      options: JSON.stringify(['Un type de branche', 'Une base de données versionnée stockant fichiers et répertoires', 'Un outil de merge', 'Un format de fichier de configuration']),
      correctIndex: 1,
      explanation: 'VOB (Versioned Object Base) est la base de données centrale de ClearCase qui stocke tous les fichiers et répertoires versionnés avec leur historique complet.' },

    { id: 'quiz-cc-02', courseId: 'clearcase', moduleId: 'cc-01',
      question: 'Quelle est la différence entre une vue dynamique et une vue snapshot ?',
      options: JSON.stringify(['La vue dynamique accède aux fichiers en temps réel via le réseau (MVFS), la snapshot est une copie locale', 'La vue dynamique est plus rapide, la snapshot plus sécurisée', 'La vue dynamique est pour Windows, la snapshot pour Linux', 'Il n\'y a pas de différence']),
      correctIndex: 0,
      explanation: 'Une vue dynamique utilise le système de fichiers virtuel MVFS pour accéder aux fichiers en temps réel depuis le serveur. Une vue snapshot est une copie locale qu\'il faut mettre à jour manuellement.' },

    { id: 'quiz-cc-03', courseId: 'clearcase', moduleId: 'cc-01',
      question: 'Quel est le rôle d\'une Config Spec dans ClearCase ?',
      options: JSON.stringify(['Configurer le serveur ClearCase', 'Définir les règles de sélection des versions visibles dans une vue', 'Spécifier les permissions utilisateur', 'Configurer les triggers de build']),
      correctIndex: 1,
      explanation: 'La Config Spec (Configuration Specification) définit les règles qui déterminent quelles versions des fichiers sont visibles dans une vue (par branche, label, date, etc.).' },

    // ==================== KLOCWORK QUIZ ====================
    { id: 'quiz-kw-01', courseId: 'klocwork', moduleId: 'kw-01',
      question: 'Quel est le rôle de kwinject dans le workflow Klocwork ?',
      options: JSON.stringify(['Injecter du code de test', 'Capturer les commandes de compilation pour créer un build specification', 'Installer les plugins Klocwork', 'Configurer les checkers d\'analyse']),
      correctIndex: 1,
      explanation: 'kwinject intercepte les commandes de compilation (gcc, make, etc.) pour savoir quels fichiers analyser et avec quelles options. Il génère un fichier buildspec (kwinject.out) utilisé par kwbuildproject.' },

    { id: 'quiz-kw-02', courseId: 'klocwork', moduleId: 'kw-01',
      question: 'Qu\'est-ce que la Knowledge Base dans Klocwork ?',
      options: JSON.stringify(['La documentation en ligne', 'Une base centralisée stockant les décisions sur les issues (confirmé, faux positif, etc.)', 'Les règles de codage MISRA', 'Le cache d\'analyse locale']),
      correctIndex: 1,
      explanation: 'La Knowledge Base (KB) est la base de données centralisée qui stocke les décisions prises sur chaque issue : Confirmed (vrai défaut), Not a Problem (faux positif), Fix in Next Release, etc.' },

    { id: 'quiz-kw-03', courseId: 'klocwork', moduleId: 'kw-01',
      question: 'Quelle commande permet de lancer une analyse statique locale sans serveur Klocwork ?',
      options: JSON.stringify(['kwbuildproject', 'kwadmin', 'kwcheck run', 'kwinject']),
      correctIndex: 2,
      explanation: 'kwcheck run lance une analyse locale (desktop analysis) rapide directement sur le poste du développeur, sans nécessiter de connexion au serveur Klocwork. Idéal pour le shift-left testing.' },

    // ==================== JENKINS QUIZ ====================
    { id: 'quiz-jen-01', courseId: 'jenkins', moduleId: 'jen-01',
      question: 'Quelle est la différence principale entre un job Freestyle et un Pipeline dans Jenkins ?',
      options: JSON.stringify(['Le Freestyle est plus rapide à exécuter', 'Le Pipeline est défini en code (Jenkinsfile) et permet des workflows multi-étapes complexes', 'Le Freestyle supporte plus de plugins', 'Le Pipeline ne peut pas utiliser Docker']),
      correctIndex: 1,
      explanation: 'Un Pipeline est défini en code (Jenkinsfile) versionné dans Git, permettant des workflows multi-étapes, parallélisation, conditions, et reproductibilité. Le Freestyle est configuré via l\'UI uniquement.' },

    { id: 'quiz-jen-02', courseId: 'jenkins', moduleId: 'jen-01',
      question: 'Pourquoi est-il recommandé de ne pas exécuter de builds sur le controller Jenkins ?',
      options: JSON.stringify(['Pour des raisons de performance uniquement', 'Pour la sécurité (isolation) et la stabilité du controller qui gère l\'orchestration', 'Parce que le controller ne supporte pas les builds', 'Pour économiser des licences']),
      correctIndex: 1,
      explanation: 'Exécuter des builds sur le controller expose le serveur Jenkins à des risques de sécurité (code malveillant) et de stabilité (consommation de ressources). Le controller doit uniquement orchestrer.' },

    { id: 'quiz-jen-03', courseId: 'jenkins', moduleId: 'jen-01',
      question: 'Quel mécanisme Jenkins utilise-t-il pour gérer les secrets de manière sécurisée ?',
      options: JSON.stringify(['Variables d\'environnement système', 'Le Credentials Store avec chiffrement et masquage dans les logs', 'Des fichiers .env dans le workspace', 'HashiCorp Vault uniquement']),
      correctIndex: 1,
      explanation: 'Le Credentials Store de Jenkins chiffre les secrets, les rend accessibles aux pipelines via credentials(), et les masque automatiquement dans les logs de console.' },

    { id: 'quiz-jen-04', courseId: 'jenkins', moduleId: 'jen-01',
      question: 'Qu\'est-ce que JCasC (Jenkins Configuration as Code) ?',
      options: JSON.stringify(['Un outil de compilation Java', 'Un plugin permettant de définir toute la configuration Jenkins dans un fichier YAML versionnable', 'Un framework de test pour les pipelines', 'Un service cloud Jenkins']),
      correctIndex: 1,
      explanation: 'JCasC permet de définir toute la configuration Jenkins (sécurité, credentials, clouds, plugins) dans un fichier YAML. Cela rend la configuration reproductible, auditable et versionnée dans Git.' },
    // ==================== JIRA QUIZ ====================
    { id: 'quiz-jira-01', courseId: 'jira', moduleId: 'jira-01',
      question: 'Quel langage de requête Jira permet de rechercher des issues de manière avancée ?',
      options: JSON.stringify(['SQL standard', 'JQL (Jira Query Language)', 'GraphQL', 'CQL (Confluence Query Language)']),
      correctIndex: 1,
      explanation: 'JQL (Jira Query Language) est le langage de requête intégré à Jira permettant de rechercher des issues avec des critères avancés : project, status, assignee, sprint, priority, dates, texte libre, etc.' },

    { id: 'quiz-jira-02', courseId: 'jira', moduleId: 'jira-01',
      question: 'Quelle est la différence principale entre un board Scrum et un board Kanban dans Jira ?',
      options: JSON.stringify(['Le board Scrum est plus rapide à configurer', 'Le Scrum utilise des sprints itératifs tandis que le Kanban gère un flux continu avec WIP limits', 'Le Kanban ne supporte pas les sous-tâches', 'Il n\'y a aucune différence fonctionnelle']),
      correctIndex: 1,
      explanation: 'Le board Scrum organise le travail en sprints itératifs avec planning, velocity et burndown. Le board Kanban gère un flux continu avec des limites WIP et optimise le lead time et cycle time.' },

    { id: 'quiz-jira-03', courseId: 'jira', moduleId: 'jira-01',
      question: 'Quelle API REST permet de gérer les sprints et boards Agile dans Jira ?',
      options: JSON.stringify(['/rest/api/2/sprint', '/rest/agile/1.0/ (boards, sprints, backlog)', '/rest/greenhopper/1.0/sprint', '/rest/scrum/latest/sprint']),
      correctIndex: 1,
      explanation: 'L\'API Agile (/rest/agile/1.0/) est l\'API officielle pour les boards, sprints, backlogs et epics. Elle remplace l\'ancienne API Greenhopper et expose tous les endpoints Agile.' },

    // ==================== CONFLUENCE QUIZ ====================
    { id: 'quiz-conf-01', courseId: 'confluence', moduleId: 'conf-01',
      question: 'Comment est structuré le contenu dans Confluence ?',
      options: JSON.stringify(['Fichiers et dossiers comme un système de fichiers', 'Espaces (Spaces) contenant des pages hiérarchiques avec labels et restrictions', 'Bases de données relationnelles avec tables', 'Wikis indépendants sans hiérarchie']),
      correctIndex: 1,
      explanation: 'Confluence organise le contenu en Spaces contenant des pages hiérarchiques (parent/enfant). Les labels catégorisent transversalement, les restrictions gèrent les permissions par page, et les macros enrichissent le contenu.' },

    { id: 'quiz-conf-02', courseId: 'confluence', moduleId: 'conf-01',
      question: 'Quelle macro Confluence permet d\'afficher des issues Jira directement dans une page ?',
      options: JSON.stringify(['La macro {code}', 'La macro {jira} avec une requête JQL', 'La macro {include}', 'La macro {status}']),
      correctIndex: 1,
      explanation: 'La macro {jira} insère une requête JQL dans une page Confluence pour afficher dynamiquement une liste d\'issues Jira avec colonnes configurables (key, summary, status, assignee).' },

    { id: 'quiz-conf-03', courseId: 'confluence', moduleId: 'conf-01',
      question: 'Quel langage de recherche est utilisé dans l\'API Confluence ?',
      options: JSON.stringify(['JQL (Jira Query Language)', 'SQL standard', 'CQL (Confluence Query Language)', 'Lucene Query Syntax directe']),
      correctIndex: 2,
      explanation: 'CQL (Confluence Query Language) est le langage de recherche de Confluence. Il permet de chercher par space, type, label, title, creator, lastModified, ancestor et texte.' },

    // ==================== BITBUCKET QUIZ ====================
    { id: 'quiz-bb-01', courseId: 'bitbucket', moduleId: 'bb-01',
      question: 'Quel fichier configure les pipelines CI/CD intégrés dans Bitbucket Cloud ?',
      options: JSON.stringify(['.gitlab-ci.yml', 'Jenkinsfile', 'bitbucket-pipelines.yml à la racine du repo', '.github/workflows/ci.yml']),
      correctIndex: 2,
      explanation: 'bitbucket-pipelines.yml est le fichier de configuration CI/CD de Bitbucket Pipelines. Placé à la racine du repo, il définit les steps (conteneurs Docker), caches, services, artifacts et déploiements.' },

    { id: 'quiz-bb-02', courseId: 'bitbucket', moduleId: 'bb-01',
      question: 'Comment fonctionnent les Smart Commits pour l\'intégration Jira dans Bitbucket ?',
      options: JSON.stringify(['Via un plugin séparé à installer', 'En incluant la clé Jira et des commandes (#comment, #time, #done) dans le message de commit', 'En configurant un webhook manuel vers Jira', 'Les Smart Commits ne sont pas supportés dans Bitbucket']),
      correctIndex: 1,
      explanation: 'Les Smart Commits mettent à jour Jira depuis les messages de commit Git. Format : PROJ-123 #comment Mon commentaire #time 2h #done. Ajoute commentaire, log temps et transition l\'issue automatiquement.' },

    { id: 'quiz-bb-03', courseId: 'bitbucket', moduleId: 'bb-01',
      question: 'Quelle restriction de branche Bitbucket empêche le push direct et force les Pull Requests ?',
      options: JSON.stringify(['no-deletes', 'read-only', 'pull-request-only', 'fast-forward-only']),
      correctIndex: 2,
      explanation: 'La restriction "pull-request-only" empêche tout push direct sur la branche protégée. Les modifications ne peuvent être intégrées que via une Pull Request approuvée et validée par les merge checks.' },


  ],
};
