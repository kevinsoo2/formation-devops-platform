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


  ],

  quizQuestions: [
    // ==================== ARTIFACTORY QUIZ ====================
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

  ],
};
