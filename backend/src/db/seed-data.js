export const seedData = {
  courses: [
    {
      id: 'artifactory', title: 'JFrog Artifactory', subtitle: 'Gestionnaire de dépôts universels',
      description: 'Maîtrisez Artifactory, le gestionnaire de dépôts d\'artefacts universel. Apprenez à gérer vos binaires, conteneurs et packages dans un référentiel centralisé.',
      icon: '📦', color: '#41BF47', duration: '12 heures', level: 'Intermédiaire', category: 'Gestion des artefacts',
      prerequisites: JSON.stringify(['Connaissances de base en CI/CD', 'Familiarité avec Maven/Gradle/npm']),
      objectives: JSON.stringify(['Installer et configurer Artifactory', 'Gérer des dépôts locaux, distants et virtuels', 'Intégrer dans un pipeline CI/CD', 'Gérer les permissions', 'Utiliser promotion et rétention']),
    },
    {
      id: 'sonarqube', title: 'SonarQube', subtitle: 'Analyse de qualité de code',
      description: 'Apprenez à utiliser SonarQube pour analyser la qualité de votre code, détecter bugs, vulnérabilités et code smells.',
      icon: '🔍', color: '#4E9BCD', duration: '10 heures', level: 'Intermédiaire', category: 'Qualité du code',
      prerequisites: JSON.stringify(['Connaissances en programmation', 'Notions de CI/CD']),
      objectives: JSON.stringify(['Installer et configurer SonarQube', 'Analyser avec SonarScanner', 'Comprendre les métriques', 'Configurer Quality Gates', 'Intégrer dans Jenkins/GitLab CI']),
    },
    {
      id: 'doors', title: 'IBM DOORS', subtitle: 'Gestion des exigences',
      description: 'Maîtrisez IBM DOORS pour la gestion des exigences dans les projets complexes. Traçabilité, liens et analyse d\'impact.',
      icon: '📋', color: '#054ADA', duration: '15 heures', level: 'Avancé', category: 'Gestion des exigences',
      prerequisites: JSON.stringify(['Notions d\'ingénierie système', 'Gestion de projet']),
      objectives: JSON.stringify(['Naviguer dans DOORS', 'Créer des modules d\'exigences', 'Établir la traçabilité', 'Utiliser vues et filtres', 'Générer rapports', 'Administrer projets']),
    },
    {
      id: 'clearcase', title: 'IBM ClearCase', subtitle: 'Gestion de configuration logicielle',
      description: 'Apprenez IBM Rational ClearCase pour la gestion de configuration. Versionnement, branches, vues dynamiques et UCM.',
      icon: '🌿', color: '#1F70C1', duration: '14 heures', level: 'Avancé', category: 'Gestion de configuration',
      prerequisites: JSON.stringify(['Expérience avec un SCM (Git, SVN)', 'Connaissances système']),
      objectives: JSON.stringify(['Architecture VOB/View', 'Vues dynamiques et snapshot', 'Branching et merging', 'UCM', 'Administration VOBs', 'Migration vers Git']),
    },
    {
      id: 'klocwork', title: 'Klocwork', subtitle: 'Analyse statique de code',
      description: 'Découvrez Klocwork pour l\'analyse statique C, C++, Java, C#. Défauts critiques, vulnérabilités et conformité aux standards.',
      icon: '🛡️', color: '#E74C3C', duration: '11 heures', level: 'Intermédiaire', category: 'Analyse statique',
      prerequisites: JSON.stringify(['Programmation C/C++ ou Java', 'Notions de sécurité logicielle']),
      objectives: JSON.stringify(['Installer Klocwork', 'Lancer des analyses', 'Interpréter les résultats', 'Configurer checkers', 'Intégrer dans CI/CD', 'Standards MISRA et CERT']),
    },
    {
      id: 'jenkins', title: 'Jenkins', subtitle: 'Automatisation CI/CD',
      description: 'Maîtrisez Jenkins, le serveur d\'automatisation le plus populaire. Pipelines CI/CD, agents distribués, intégration outils.',
      icon: '🔧', color: '#D33833', duration: '16 heures', level: 'Débutant à Avancé', category: 'CI/CD',
      prerequisites: JSON.stringify(['Connaissances Linux de base', 'Familiarité avec Git']),
      objectives: JSON.stringify(['Installer Jenkins', 'Jobs Freestyle et Pipeline', 'Jenkinsfiles', 'Agents distribués', 'Plugins et sécurité', 'Docker et Kubernetes', 'Pipelines multibranches']),
    },
  ],

  modules: [


    // ==================== ARTIFACTORY ====================
    { id: 'art-01', courseId: 'artifactory', title: 'Introduction à Artifactory', duration: '3h', orderIndex: 1,
      theoryContent: `## Introduction à JFrog Artifactory

### Qu'est-ce que JFrog Artifactory ?

JFrog Artifactory est un **gestionnaire de dépôts d'artefacts universel** (Universal Artifact Repository Manager). C'est la solution leader du marché pour stocker, gérer et distribuer tous les artefacts logiciels générés pendant le cycle de développement : binaires compilés, packages, images Docker, fichiers Helm, etc.

### Pourquoi un gestionnaire d'artefacts ?

Dans le développement logiciel moderne, chaque build produit des **artefacts** : fichiers JAR, packages npm, images Docker, fichiers .deb/.rpm, etc. Sans gestionnaire d'artefacts centralisé, les équipes rencontrent ces problèmes :

- **Pas de source unique de vérité** : les binaires sont éparpillés sur des serveurs de fichiers, des disques partagés
- **Pas de traçabilité** : impossible de savoir quel commit a produit quel binaire
- **Pas de contrôle d'accès** : n'importe qui peut écraser ou supprimer un artefact
- **Builds non reproductibles** : les dépendances externes peuvent disparaître ou changer
- **Pas de promotion** : pas de workflow pour passer un artefact de dev à staging à production

Artifactory résout tous ces problèmes en fournissant un **point central** pour tous les artefacts de l'entreprise.

### Les concepts fondamentaux

#### Types de dépôts

Artifactory propose trois types de dépôts :

| Type | Description | Exemple d'usage |
|------|-------------|-----------------|
| **Local** | Stockage interne des artefacts produits | Vos JAR, vos images Docker |
| **Remote** | Proxy/cache de dépôts externes | Cache de Maven Central, npm registry |
| **Virtual** | Agrégation de plusieurs dépôts | Un seul URL pour local + remote |

#### Architecture d'un dépôt virtuel

\`\`\`
┌─────────────────────────────────────────┐
│         Dépôt Virtuel "libs"            │
│  (point d'entrée unique pour les devs)  │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────┐  ┌───────────────────┐    │
│  │  Local   │  │     Remote        │    │
│  │ libs-    │  │  libs-remote      │    │
│  │ release  │  │  (→Maven Central) │    │
│  └──────────┘  └───────────────────┘    │
│                                         │
│  ┌──────────┐                           │
│  │  Local   │                           │
│  │ libs-    │                           │
│  │ snapshot │                           │
│  └──────────┘                           │
└─────────────────────────────────────────┘
\`\`\`

### Formats supportés (Package Types)

Artifactory supporte **plus de 30 formats** de packages natifs :

- **Java** : Maven, Gradle, Ivy, SBT
- **JavaScript** : npm, Yarn, Bower
- **Python** : PyPI, Conda
- **Docker** : Docker Registry V2
- **.NET** : NuGet
- **Linux** : Debian (apt), RPM (yum)
- **Go** : Go Modules
- **Helm** : Charts Kubernetes
- **Generic** : tout fichier binaire

### Métadonnées et propriétés

Chaque artefact dans Artifactory possède :
- **Checksums** : MD5, SHA1, SHA256 pour l'intégrité
- **Propriétés** : paires clé-valeur personnalisables (build.number, release.status, etc.)
- **Build Info** : lien vers le build CI qui l'a produit
- **Statistics** : nombre de téléchargements, date du dernier accès

### Cas d'usage en entreprise

1. **Cache de dépendances** : Éviter les téléchargements répétés depuis Internet, accélérer les builds
2. **Stockage des livrables** : Centraliser tous les binaires produits par la CI
3. **Distribution** : Distribuer les releases aux clients ou aux environnements de déploiement
4. **Conformité** : Audit de toutes les dépendances utilisées (licences, vulnérabilités)
5. **Air-gapped environments** : Fournir les dépendances dans des environnements sans accès Internet

### Artifactory vs alternatives

| Fonctionnalité | Artifactory | Nexus | GitHub Packages |
|----------------|-------------|-------|-----------------|
| Formats supportés | 30+ | 20+ | ~10 |
| Haute disponibilité | Oui (Enterprise) | Oui (Pro) | Oui |
| Réplication | Multi-site | Limitée | Non |
| Xray (sécurité) | Intégré | Non | Dependabot |
| Build Info | Natif | Limité | Actions |
| Coût | $$$ | $$ | Inclus |

### Éditions d'Artifactory

- **OSS** (Open Source) : Maven, Gradle, Ivy uniquement
- **Pro** : Tous les formats, haute disponibilité, réplication
- **Enterprise** : Multi-site, fédération, support premium
- **Cloud** : SaaS managé par JFrog`,

      practiceContent: `### Travaux Pratiques : Découverte d'Artifactory

#### Prérequis
- Docker et Docker Compose installés
- Maven ou npm installé localement
- Navigateur web

#### Étape 1 : Lancer Artifactory avec Docker

\`\`\`bash
# Créer un répertoire de travail
mkdir -p ~/artifactory-tp && cd ~/artifactory-tp

# Lancer Artifactory OSS avec Docker
docker run -d --name artifactory \\
  -p 8081:8081 -p 8082:8082 \\
  -v artifactory-data:/var/opt/jfrog/artifactory \\
  releases-docker.jfrog.io/jfrog/artifactory-oss:latest

# Vérifier que le conteneur est lancé
docker logs -f artifactory
# Attendre "Artifactory successfully started"
\`\`\`

#### Étape 2 : Configuration initiale

1. Ouvrez http://localhost:8082/ui/
2. Connectez-vous avec admin/password (identifiants par défaut)
3. Suivez le wizard de configuration initiale :
   - Changez le mot de passe admin
   - Configurez l'URL de base : http://localhost:8082
   - Créez un dépôt Maven local : \`libs-release-local\`
   - Créez un dépôt Maven remote : \`remote-maven-central\` pointant vers https://repo1.maven.org/maven2

#### Étape 3 : Configurer Maven pour utiliser Artifactory

Éditez votre fichier \`~/.m2/settings.xml\` :
\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<settings>
  <servers>
    <server>
      <id>artifactory</id>
      <username>admin</username>
      <password>votre-nouveau-mot-de-passe</password>
    </server>
  </servers>
  <mirrors>
    <mirror>
      <id>artifactory</id>
      <mirrorOf>*</mirrorOf>
      <url>http://localhost:8082/artifactory/remote-maven-central</url>
    </mirror>
  </mirrors>
</settings>
\`\`\`

#### Étape 4 : Tester le cache de dépendances

\`\`\`bash
# Créer un projet Maven simple
mvn archetype:generate -DgroupId=com.formation \\
  -DartifactId=test-artifactory \\
  -DarchetypeArtifactId=maven-archetype-quickstart \\
  -DinteractiveMode=false

cd test-artifactory

# Builder le projet (les dépendances passent par Artifactory)
mvn clean package

# Vérifier dans l'UI qu'Artifactory a mis en cache les dépendances
# → Administration > Repositories > remote-maven-central > Tree Browser
\`\`\`

#### Étape 5 : Déployer un artefact

Ajoutez dans votre \`pom.xml\` :
\`\`\`xml
<distributionManagement>
  <repository>
    <id>artifactory</id>
    <url>http://localhost:8082/artifactory/libs-release-local</url>
  </repository>
</distributionManagement>
\`\`\`

Puis déployez :
\`\`\`bash
mvn deploy
\`\`\`

#### Étape 6 : Vérification

1. Dans l'UI Artifactory, naviguez vers \`libs-release-local\`
2. Vous devriez voir votre artefact avec :
   - Le fichier JAR
   - Le POM
   - Les checksums (MD5, SHA1, SHA256)
   - Les métadonnées Maven

#### Questions de vérification
- Combien de fichiers ont été mis en cache dans le remote repository ?
- Quelle est la taille totale du stockage utilisé ?
- Quels checksums sont disponibles pour votre artefact déployé ?`,

      keyPoints: JSON.stringify([
        'Artifactory est un gestionnaire universel supportant 30+ formats de packages',
        'Trois types de dépôts : Local (stockage), Remote (proxy/cache), Virtual (agrégation)',
        'Les métadonnées incluent checksums, propriétés, build info et statistiques',
        'Le cache des dépendances accélère les builds et assure la reproductibilité',
        'Les propriétés permettent de tracer le cycle de vie des artefacts',
        'Artifactory est le standard de facto dans les environnements CI/CD enterprise'
      ]) },


    { id: 'art-02', courseId: 'artifactory', title: 'Gestion des dépôts', duration: '4h', orderIndex: 2,
      theoryContent: `## Gestion avancée des dépôts Artifactory

### Stratégie de nommage des dépôts

Une bonne convention de nommage est essentielle pour la maintenabilité. La convention recommandée par JFrog est :

\`\`\`
<équipe>-<technologie>-<type>-<maturité>
\`\`\`

Exemples :
- \`team-backend-maven-release-local\`
- \`team-frontend-npm-dev-local\`
- \`team-devops-docker-prod-local\`
- \`company-maven-remote\` (cache de Maven Central)
- \`company-maven-virtual\` (agrégation)

### Dépôts locaux en détail

Un dépôt local est un espace de stockage **interne** à Artifactory. C'est là que vous déployez vos propres artefacts.

#### Configuration d'un dépôt local Maven

\`\`\`yaml
# Via l'API REST
PUT /api/repositories/libs-release-local
{
  "key": "libs-release-local",
  "rclass": "local",
  "packageType": "maven",
  "description": "Dépôt pour les releases Maven internes",
  "handleReleases": true,
  "handleSnapshots": false,
  "checksumPolicyType": "client-checksums",
  "maxUniqueSnapshots": 0,
  "snapshotVersionBehavior": "unique",
  "suppressPomConsistencyChecks": false,
  "propertySets": ["artifactory"],
  "includesPattern": "**/*",
  "excludesPattern": ""
}
\`\`\`

#### Layouts de dépôt

Le layout définit comment les artefacts sont organisés dans l'arborescence :

| Format | Layout | Exemple de chemin |
|--------|--------|-------------------|
| Maven | groupId/artifactId/version/ | com/company/app/1.0/app-1.0.jar |
| npm | package/version/ | express/-/express-4.18.2.tgz |
| Docker | repository/image/tag/ | library/nginx/latest |
| PyPI | packages/source/p/package/ | packages/source/r/requests/requests-2.28.tar.gz |
| Generic | libre | builds/2023/sprint-12/app.zip |

### Dépôts distants (Remote)

Un dépôt remote est un **proxy avec cache** vers un dépôt externe. Avantages :

1. **Performance** : cache local, pas besoin de retélécharger
2. **Disponibilité** : si le dépôt externe tombe, le cache reste accessible
3. **Sécurité** : contrôle de ce qui entre dans votre réseau
4. **Audit** : traçabilité de toutes les dépendances tierces

#### Configuration avancée d'un remote

\`\`\`json
{
  "key": "npmjs-remote",
  "rclass": "remote",
  "packageType": "npm",
  "url": "https://registry.npmjs.org",
  "username": "",
  "password": "",
  "proxy": "corporate-proxy",
  "storeArtifactsLocally": true,
  "retrievalCachePeriodSecs": 7200,
  "missedRetrievalCachePeriodSecs": 1800,
  "unusedArtifactsCleanupPeriodHours": 0,
  "excludesPattern": "*.snapshot*",
  "enableCookieManagement": false,
  "socketTimeoutMillis": 15000,
  "allowAnyHostAuth": false,
  "blockMismatchingMimeTypes": true
}
\`\`\`

#### Paramètres clés des remotes

| Paramètre | Description | Recommandation |
|-----------|-------------|----------------|
| retrievalCachePeriodSecs | Durée avant re-vérification | 7200 (2h) pour releases, 0 pour snapshots |
| missedRetrievalCachePeriodSecs | Cache des "404" | 1800 (30min) |
| unusedArtifactsCleanupPeriodHours | Suppression si non utilisé | 0 (jamais) ou 720 (30 jours) |
| storeArtifactsLocally | Garder une copie locale | true (toujours) |

### Dépôts virtuels

Le dépôt virtuel est une **vue unifiée** sur plusieurs dépôts. Le développeur n'a qu'un seul URL à configurer.

#### Résolution des artefacts dans un virtuel

L'ordre de résolution est important :

\`\`\`
Requête: GET /virtual-maven/com/company/app/1.0/app-1.0.jar

1. Cherche dans libs-release-local     → trouvé ? → retourne
2. Cherche dans libs-snapshot-local     → trouvé ? → retourne
3. Cherche dans remote-maven-central    → trouvé ? → cache + retourne
4. Cherche dans remote-jcenter          → trouvé ? → cache + retourne
5. Pas trouvé → retourne 404
\`\`\`

#### Déploiement via un virtuel

Vous pouvez configurer un **Default Deployment Repository** sur le virtuel. Les déploiements via le virtuel sont redirigés vers ce dépôt local.

### Politiques de rétention (Cleanup)

La rétention automatique évite que le stockage explose :

\`\`\`bash
# Supprimer les snapshots de plus de 30 jours
# Via AQL (Artifactory Query Language)
items.find({
  "repo": "libs-snapshot-local",
  "modified": {"$before": "30d"},
  "type": "file"
})

# Script de cleanup via l'API
curl -X POST "http://localhost:8082/artifactory/api/search/aql" \\
  -H "Content-Type: text/plain" \\
  -u admin:password \\
  -d 'items.find({"repo":"libs-snapshot-local","modified":{"$before":"30d"}})'
\`\`\`

### Réplication de dépôts

Pour les environnements multi-sites, la réplication maintient des copies synchronisées :

- **Push replication** : le serveur source pousse vers la destination
- **Pull replication** : le serveur destination tire depuis la source
- **Event-based** : réplication à chaque déploiement (temps réel)
- **Scheduled** : réplication périodique (cron)

### Bonnes pratiques

1. **Séparer releases et snapshots** dans des dépôts différents
2. **Un remote par source externe** (Maven Central, npm, Docker Hub)
3. **Toujours utiliser des virtuels** pour les développeurs
4. **Configurer la rétention** dès le départ
5. **Utiliser des propriétés** pour le lifecycle management
6. **Sauvegarder régulièrement** la configuration (pas forcément les binaires si remote)`,

      practiceContent: `### Travaux Pratiques : Gestion des dépôts

#### TP 1 : Créer une topologie complète de dépôts

1. Créez la structure suivante via l'API REST :

\`\`\`bash
# Variables
ARTIF_URL="http://localhost:8082/artifactory"
AUTH="-u admin:password"

# Dépôt local pour les releases
curl -X PUT "$ARTIF_URL/api/repositories/libs-release-local" \\
  $AUTH -H "Content-Type: application/json" \\
  -d '{
    "key": "libs-release-local",
    "rclass": "local",
    "packageType": "maven",
    "handleReleases": true,
    "handleSnapshots": false
  }'

# Dépôt local pour les snapshots
curl -X PUT "$ARTIF_URL/api/repositories/libs-snapshot-local" \\
  $AUTH -H "Content-Type: application/json" \\
  -d '{
    "key": "libs-snapshot-local",
    "rclass": "local",
    "packageType": "maven",
    "handleReleases": false,
    "handleSnapshots": true
  }'

# Dépôt remote vers Maven Central
curl -X PUT "$ARTIF_URL/api/repositories/maven-central-remote" \\
  $AUTH -H "Content-Type: application/json" \\
  -d '{
    "key": "maven-central-remote",
    "rclass": "remote",
    "packageType": "maven",
    "url": "https://repo1.maven.org/maven2"
  }'

# Dépôt virtuel qui agrège tout
curl -X PUT "$ARTIF_URL/api/repositories/maven-virtual" \\
  $AUTH -H "Content-Type: application/json" \\
  -d '{
    "key": "maven-virtual",
    "rclass": "virtual",
    "packageType": "maven",
    "repositories": ["libs-release-local", "libs-snapshot-local", "maven-central-remote"],
    "defaultDeploymentRepo": "libs-release-local"
  }'
\`\`\`

2. Vérifiez dans l'UI que tous les dépôts sont créés

#### TP 2 : Configurer npm avec Artifactory

\`\`\`bash
# Créer les dépôts npm
curl -X PUT "$ARTIF_URL/api/repositories/npm-local" \\
  $AUTH -H "Content-Type: application/json" \\
  -d '{"key":"npm-local","rclass":"local","packageType":"npm"}'

curl -X PUT "$ARTIF_URL/api/repositories/npm-remote" \\
  $AUTH -H "Content-Type: application/json" \\
  -d '{"key":"npm-remote","rclass":"remote","packageType":"npm","url":"https://registry.npmjs.org"}'

curl -X PUT "$ARTIF_URL/api/repositories/npm-virtual" \\
  $AUTH -H "Content-Type: application/json" \\
  -d '{"key":"npm-virtual","rclass":"virtual","packageType":"npm","repositories":["npm-local","npm-remote"],"defaultDeploymentRepo":"npm-local"}'

# Configurer npm pour utiliser Artifactory
npm config set registry http://localhost:8082/artifactory/api/npm/npm-virtual/

# Tester l'installation d'un package
npm install express
# Vérifier que le package est caché dans Artifactory
\`\`\`

#### TP 3 : Tester la résolution via le virtuel

1. Déployez un artefact dans libs-release-local
2. Accédez-y via le dépôt virtuel
3. Vérifiez les headers de réponse pour confirmer la source

#### TP 4 : Mettre en place une politique de rétention

\`\`\`bash
# Lister les artefacts non téléchargés depuis 7 jours
curl -X POST "$ARTIF_URL/api/search/aql" \\
  $AUTH -H "Content-Type: text/plain" \\
  -d 'items.find({"repo":"libs-snapshot-local","stat.downloaded":{"$before":"7d"}}).include("name","path","size")'
\`\`\``,

      keyPoints: JSON.stringify([
        'Convention de nommage : <équipe>-<techno>-<type>-<maturité>',
        'Trois types : Local (stockage), Remote (proxy/cache), Virtual (agrégation)',
        'Les remotes cachent les dépendances et protègent contre les pannes externes',
        'Les virtuels offrent un point d\'entrée unique aux développeurs',
        'L\'ordre de résolution dans un virtuel est configurable et important',
        'Toujours séparer releases et snapshots, toujours configurer la rétention'
      ]) },


    { id: 'art-03', courseId: 'artifactory', title: 'Intégration CI/CD et API', duration: '5h', orderIndex: 3,
      theoryContent: `## Intégration d'Artifactory dans les pipelines CI/CD

### Artifactory et le pipeline de livraison

Artifactory est au centre du pipeline de livraison continue. À chaque étape, des artefacts sont produits, stockés, promus et finalement déployés :

\`\`\`
Code → Build → Test → Package → Deploy
  │       │       │       │         │
  │       ▼       ▼       ▼         ▼
  │   snapshot  rapport  release   promotion
  │   → libs-   → test-  → libs-   → prod-
  │   snapshot   results  release   release
  │   -local    -local    -local    -local
  └── Source ──────────────────────────────
\`\`\`

### Build Info : la traçabilité complète

Le **Build Info** est un fichier JSON qui documente tout ce qu'un build a produit et consommé :

\`\`\`json
{
  "version": "1.0.1",
  "name": "my-application",
  "number": "42",
  "started": "2024-01-15T10:30:00.000Z",
  "buildAgent": { "name": "Jenkins", "version": "2.401" },
  "modules": [{
    "id": "com.company:my-app:1.2.0",
    "artifacts": [
      { "name": "my-app-1.2.0.jar", "sha256": "abc123..." }
    ],
    "dependencies": [
      { "id": "org.springframework:spring-core:5.3.20", "sha256": "def456..." }
    ]
  }],
  "vcs": [{
    "revision": "a1b2c3d4e5f6",
    "branch": "refs/heads/main",
    "url": "https://github.com/company/my-app.git"
  }]
}
\`\`\`

Le Build Info permet de répondre à ces questions critiques :
- **Quel code source** a produit ce binaire ?
- **Quelles dépendances** sont incluses ?
- **Quel pipeline** l'a construit et quand ?
- **Quels tests** ont été exécutés ?

### Intégration avec Jenkins

#### Plugin Artifactory pour Jenkins

\`\`\`groovy
// Jenkinsfile avec intégration Artifactory
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
                    
                    rtMaven.resolver server: server,
                        releaseRepo: 'maven-virtual',
                        snapshotRepo: 'maven-virtual'
                    
                    rtMaven.deployer server: server,
                        releaseRepo: 'libs-release-local',
                        snapshotRepo: 'libs-snapshot-local'
                    
                    def buildInfo = rtMaven.run pom: 'pom.xml',
                        goals: 'clean package -DskipTests'
                    
                    // Publier le Build Info
                    server.publishBuildInfo buildInfo
                }
            }
        }
        
        stage('Promote') {
            when { branch 'main' }
            steps {
                script {
                    def server = Artifactory.server(ARTIFACTORY_SERVER)
                    def promotionConfig = [
                        buildName: env.JOB_NAME,
                        buildNumber: env.BUILD_NUMBER,
                        targetRepo: 'libs-prod-local',
                        sourceRepo: 'libs-release-local',
                        status: 'Released',
                        comment: 'Promoted to production',
                        copy: true
                    ]
                    server.promote promotionConfig
                }
            }
        }
    }
}
\`\`\`

### L'API REST d'Artifactory

L'API REST est exhaustive et permet d'automatiser toutes les opérations :

#### Opérations sur les artefacts

\`\`\`bash
# Déployer un fichier
curl -X PUT "http://artif:8082/artifactory/libs-release/com/app/1.0/app-1.0.jar" \\
  -u admin:password \\
  -T app-1.0.jar \\
  -H "X-Checksum-Sha256:$(sha256sum app-1.0.jar | cut -d' ' -f1)"

# Télécharger un fichier
curl -O "http://artif:8082/artifactory/libs-release/com/app/1.0/app-1.0.jar" \\
  -u admin:password

# Copier un artefact
curl -X POST "http://artif:8082/artifactory/api/copy/libs-release/com/app/1.0/app-1.0.jar?to=/libs-prod/com/app/1.0/app-1.0.jar" \\
  -u admin:password

# Supprimer un artefact
curl -X DELETE "http://artif:8082/artifactory/libs-snapshot/com/app/1.0-SNAPSHOT/" \\
  -u admin:password
\`\`\`

#### Opérations sur les propriétés

\`\`\`bash
# Ajouter des propriétés à un artefact
curl -X PUT "http://artif:8082/artifactory/api/storage/libs-release/com/app/1.0/app-1.0.jar?properties=build.status=tested;release.version=1.0;qa.approved=true" \\
  -u admin:password

# Lire les propriétés
curl "http://artif:8082/artifactory/api/storage/libs-release/com/app/1.0/app-1.0.jar?properties" \\
  -u admin:password

# Rechercher par propriété
curl "http://artif:8082/artifactory/api/search/prop?build.status=tested&repos=libs-release" \\
  -u admin:password
\`\`\`

### AQL - Artifactory Query Language

AQL est un langage de requête puissant pour chercher des artefacts :

\`\`\`
// Trouver tous les JARs de plus de 10 Mo modifiés récemment
items.find({
  "repo": "libs-release-local",
  "name": {"$match": "*.jar"},
  "size": {"$gt": 10485760},
  "modified": {"$last": "7d"}
}).include("name", "repo", "path", "size", "modified")
  .sort({"$desc": ["size"]})
  .limit(20)

// Trouver les artefacts avec une propriété spécifique
items.find({
  "repo": "libs-release-local",
  "@build.status": "released",
  "@qa.approved": "true"
})
\`\`\`

### Promotion d'artefacts

La promotion est le mécanisme qui fait avancer un artefact dans le pipeline de livraison :

\`\`\`
libs-snapshot-local → libs-release-local → libs-staging-local → libs-prod-local
     (dev)                (intégration)         (pré-prod)          (production)
\`\`\`

Chaque promotion :
- Copie ou déplace l'artefact vers le dépôt cible
- Met à jour les propriétés (status, date, promoteur)
- Enregistre l'événement dans le Build Info
- Peut déclencher des webhooks (notification, déploiement)

### Sécurité et permissions

#### Modèle de permissions

\`\`\`
Permission Target (quoi ?) + Group/User (qui ?) = Permission
\`\`\`

Types de permissions :
- **Read** : télécharger des artefacts
- **Deploy/Cache** : déployer de nouveaux artefacts
- **Annotate** : modifier les propriétés
- **Delete** : supprimer des artefacts
- **Manage** : administrer le dépôt

#### Access Tokens

\`\`\`bash
# Créer un token d'accès pour un service CI
curl -X POST "http://artif:8082/access/api/v1/tokens" \\
  -u admin:password \\
  -d "username=jenkins-ci" \\
  -d "scope=member-of-groups:ci-deployers" \\
  -d "expires_in=31536000"
\`\`\``,

      practiceContent: `### Travaux Pratiques : Intégration CI/CD

#### TP 1 : Déployer via l'API REST

\`\`\`bash
# Créer un fichier JAR de test
mkdir -p com/formation/tp && echo "dummy" > com/formation/tp/app-1.0.jar
cd com/formation/tp

# Déployer avec checksum
SHA256=$(sha256sum app-1.0.jar | cut -d' ' -f1)
curl -X PUT "http://localhost:8082/artifactory/libs-release-local/com/formation/tp/1.0/app-1.0.jar" \\
  -u admin:password \\
  -T app-1.0.jar \\
  -H "X-Checksum-Sha256:$SHA256"

# Vérifier le déploiement
curl "http://localhost:8082/artifactory/api/storage/libs-release-local/com/formation/tp/1.0/app-1.0.jar" \\
  -u admin:password | python3 -m json.tool
\`\`\`

#### TP 2 : Gérer les propriétés

\`\`\`bash
# Ajouter des propriétés de build
curl -X PUT "http://localhost:8082/artifactory/api/storage/libs-release-local/com/formation/tp/1.0/app-1.0.jar?properties=build.number=42;build.status=tested;git.commit=abc123" \\
  -u admin:password

# Lire les propriétés
curl "http://localhost:8082/artifactory/api/storage/libs-release-local/com/formation/tp/1.0/app-1.0.jar?properties" \\
  -u admin:password

# Rechercher par propriété
curl "http://localhost:8082/artifactory/api/search/prop?build.status=tested" \\
  -u admin:password
\`\`\`

#### TP 3 : Promotion d'artefact

\`\`\`bash
# Créer un dépôt de production
curl -X PUT "http://localhost:8082/artifactory/api/repositories/libs-prod-local" \\
  -u admin:password -H "Content-Type: application/json" \\
  -d '{"key":"libs-prod-local","rclass":"local","packageType":"maven"}'

# Copier l'artefact vers la prod (promotion)
curl -X POST "http://localhost:8082/artifactory/api/copy/libs-release-local/com/formation/tp/1.0/app-1.0.jar?to=/libs-prod-local/com/formation/tp/1.0/app-1.0.jar" \\
  -u admin:password

# Mettre à jour le statut
curl -X PUT "http://localhost:8082/artifactory/api/storage/libs-prod-local/com/formation/tp/1.0/app-1.0.jar?properties=build.status=production;promoted.date=$(date -I);promoted.by=admin" \\
  -u admin:password
\`\`\`

#### TP 4 : Requêtes AQL

\`\`\`bash
# Trouver tous les artefacts déployés aujourd'hui
curl -X POST "http://localhost:8082/artifactory/api/search/aql" \\
  -u admin:password -H "Content-Type: text/plain" \\
  -d 'items.find({"modified":{"$last":"1d"}}).include("name","repo","path","size")'

# Trouver les artefacts promus en production
curl -X POST "http://localhost:8082/artifactory/api/search/aql" \\
  -u admin:password -H "Content-Type: text/plain" \\
  -d 'items.find({"repo":"libs-prod-local","@build.status":"production"}).include("name","path","@build.number")'
\`\`\`

#### Vérifications finales
- L'artefact est-il présent dans libs-prod-local ?
- Les propriétés de promotion sont-elles correctes ?
- La requête AQL retourne-t-elle les résultats attendus ?`,

      keyPoints: JSON.stringify([
        'Le Build Info trace la relation entre code source, build et artefacts produits',
        'Le plugin Jenkins Artifactory gère résolution, déploiement et promotion',
        'L\'API REST permet d\'automatiser toutes les opérations (CRUD, propriétés, recherche)',
        'AQL est le langage de requête pour des recherches complexes sur les artefacts',
        'La promotion fait avancer les artefacts : dev → release → staging → prod',
        'Les Access Tokens permettent une authentification sécurisée pour les services CI'
      ]) },


    // ==================== SONARQUBE ====================
    { id: 'sq-01', courseId: 'sonarqube', title: 'Introduction à SonarQube', duration: '2h30', orderIndex: 1,
      theoryContent: `## Introduction à SonarQube

### Qu'est-ce que SonarQube ?

SonarQube est une plateforme open-source d'**inspection continue de la qualité du code**. Développée par SonarSource, elle analyse automatiquement le code source pour détecter des bugs, des vulnérabilités de sécurité et des "code smells" (mauvaises pratiques de programmation).

### Les piliers de la qualité du code

SonarQube évalue la qualité selon plusieurs dimensions :

#### 1. Fiabilité (Reliability)
- **Bugs** : erreurs dans le code qui produiront un comportement incorrect
- Exemples : null pointer dereference, division par zéro, conditions toujours vraies/fausses
- Métrique : Rating de A (aucun bug) à E (bugs bloquants)

#### 2. Sécurité (Security)
- **Vulnérabilités** : failles exploitables par un attaquant
- Exemples : SQL injection, XSS, hardcoded credentials, weak cryptography
- Métrique : Rating de A à E

#### 3. Maintenabilité (Maintainability)
- **Code Smells** : code qui fonctionne mais qui est difficile à maintenir
- Exemples : fonctions trop longues, duplication, complexité excessive
- Métrique : **Technical Debt** (temps estimé pour corriger tous les smells)

#### 4. Couverture (Coverage)
- Pourcentage du code couvert par les tests unitaires
- Conditions couvertes (branch coverage)
- Métrique : pourcentage global et sur le nouveau code

#### 5. Duplications
- Blocs de code dupliqués (copier-coller)
- Métrique : pourcentage de lignes dupliquées

### Architecture de SonarQube

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                     DÉVELOPPEUR                              │
│  IDE + SonarLint → Analyse en temps réel dans l'éditeur     │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   CI/CD PIPELINE                             │
│  SonarScanner → Analyse complète à chaque push/PR           │
│  Envoie les résultats au serveur SonarQube                  │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  SERVEUR SONARQUBE                           │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────────┐     │
│  │ Compute  │  │   Database   │  │   Elasticsearch   │     │
│  │ Engine   │  │ (PostgreSQL) │  │   (recherche)     │     │
│  └──────────┘  └──────────────┘  └───────────────────┘     │
│                                                             │
│  Dashboard Web : projets, métriques, issues, quality gates  │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Le concept de "Clean as You Code"

SonarQube applique la philosophie **Clean as You Code** :

- On ne demande **pas** de corriger toute la dette technique existante d'un coup
- On se concentre sur le **nouveau code** : tout nouveau code doit être propre
- Au fil du temps, l'ancien code est refactorisé naturellement
- Le **Quality Gate** vérifie uniquement les conditions sur le nouveau code

### Quality Gate

Un Quality Gate est un ensemble de **conditions** que le code doit respecter pour être considéré comme acceptable :

| Condition (par défaut) | Seuil |
|----------------------|-------|
| Couverture sur nouveau code | ≥ 80% |
| Duplication sur nouveau code | ≤ 3% |
| Bugs rating sur nouveau code | A (aucun nouveau bug) |
| Vulnérabilités sur nouveau code | A (aucune nouvelle vuln) |
| Security Hotspots reviewed | 100% |
| Maintainability rating | A |

Si une condition n'est pas respectée, le Quality Gate est **FAILED** et le pipeline CI peut être bloqué.

### Langages supportés

SonarQube supporte plus de **30 langages** :
- **Backend** : Java, C#, Python, Go, PHP, Ruby, Kotlin, Scala
- **Frontend** : JavaScript, TypeScript, HTML, CSS
- **Systèmes** : C, C++, Objective-C, Swift
- **Infrastructure** : Terraform, CloudFormation, Kubernetes
- **Autres** : COBOL, ABAP, PL/SQL, T-SQL, XML, JSON, YAML

### Éditions de SonarQube

| Édition | Langages | Fonctionnalités clés |
|---------|----------|---------------------|
| Community (gratuit) | 15 langages | Core features, Quality Gates |
| Developer | +C/C++, Obj-C | Branch analysis, PR decoration |
| Enterprise | +COBOL, ABAP, PL/SQL | Multi-ALM, portfolios, reporting |
| Data Center | Tous | HA, clustering |

### SonarQube vs SonarCloud

- **SonarQube** : self-hosted, on-premise, vous gérez l'infrastructure
- **SonarCloud** : SaaS, hébergé par SonarSource, pour projets cloud/GitHub/GitLab`,

      practiceContent: `### Travaux Pratiques : Installation et première analyse

#### Prérequis
- Docker installé (4 Go RAM minimum pour SonarQube)
- Java JDK 17+ ou un projet dans un langage supporté
- Git installé

#### Étape 1 : Lancer SonarQube avec Docker

\`\`\`bash
# Augmenter la mémoire virtuelle (requis par Elasticsearch)
sudo sysctl -w vm.max_map_count=524288

# Lancer SonarQube
docker run -d --name sonarqube \\
  -p 9000:9000 \\
  -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true \\
  -v sonarqube-data:/opt/sonarqube/data \\
  -v sonarqube-extensions:/opt/sonarqube/extensions \\
  sonarqube:lts-community

# Vérifier les logs
docker logs -f sonarqube
# Attendre "SonarQube is operational"
\`\`\`

#### Étape 2 : Configuration initiale

1. Ouvrez http://localhost:9000
2. Connectez-vous : admin / admin
3. Changez le mot de passe immédiatement
4. Allez dans Administration > Marketplace, installez le plugin pour votre langage si nécessaire

#### Étape 3 : Créer un projet et un token

1. Cliquez sur "Create Project" > "Manually"
2. Nom du projet : \`formation-test\`
3. Clé du projet : \`formation-test\`
4. Générez un token d'analyse : Administration > Security > Users > Tokens
   - Nom : \`ci-scanner\`
   - Copiez le token généré (ex: sqa_xxxxx)

#### Étape 4 : Installer SonarScanner

\`\`\`bash
# Télécharger SonarScanner CLI
wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip
unzip sonar-scanner-cli-5.0.1.3006-linux.zip
export PATH=$PATH:$(pwd)/sonar-scanner-5.0.1.3006-linux/bin

# Vérifier l'installation
sonar-scanner --version
\`\`\`

#### Étape 5 : Analyser un projet

Créez un projet Java simple puis analysez-le :
\`\`\`bash
# Créer un fichier de configuration
cat > sonar-project.properties << EOF
sonar.projectKey=formation-test
sonar.projectName=Formation Test
sonar.sources=src
sonar.java.binaries=target/classes
sonar.host.url=http://localhost:9000
sonar.token=sqa_VOTRE_TOKEN_ICI
EOF

# Lancer l'analyse
sonar-scanner

# Résultat attendu :
# INFO: ANALYSIS SUCCESSFUL
# INFO: SonarQube analysis report generated in xxx ms
\`\`\`

#### Étape 6 : Explorer les résultats

1. Retournez sur http://localhost:9000
2. Ouvrez le projet \`formation-test\`
3. Explorez :
   - **Overview** : résumé global, Quality Gate status
   - **Issues** : liste des bugs, vulnérabilités, code smells
   - **Measures** : métriques détaillées
   - **Code** : navigation dans le code avec annotations

#### Questions de vérification
- Le Quality Gate est-il passé ou échoué ? Pourquoi ?
- Combien de bugs, vulnérabilités et code smells sont détectés ?
- Quelle est la dette technique estimée ?
- Quel est le pourcentage de couverture (s'il y a des tests) ?`,

      keyPoints: JSON.stringify([
        'SonarQube analyse bugs, vulnérabilités, code smells, couverture et duplications',
        'Philosophie Clean as You Code : focus sur le nouveau code, pas la dette existante',
        'Quality Gate : conditions minimales que le code doit respecter pour être accepté',
        'Architecture : SonarScanner (client) → SonarQube Server → Database + Elasticsearch',
        'Supporte 30+ langages et s\'intègre dans tous les pipelines CI/CD',
        'SonarLint dans l\'IDE donne un feedback immédiat avant même le push'
      ]) },


    { id: 'sq-02', courseId: 'sonarqube', title: 'Métriques et Quality Gates', duration: '3h30', orderIndex: 2,
      theoryContent: `## Métriques et Quality Gates dans SonarQube

### Comprendre les métriques

SonarQube calcule des dizaines de métriques pour évaluer la qualité du code. Ces métriques sont regroupées par domaine.

### Métriques de fiabilité

#### Bugs

Un bug est un défaut qui causera un comportement incorrect à l'exécution. Exemples concrets :

\`\`\`java
// Bug : NullPointerException possible
public String getUserName(User user) {
    return user.getName().toUpperCase(); // user peut être null !
}

// Bug : condition toujours fausse (code mort)
int x = 5;
if (x > 10) {  // Toujours faux !
    doSomething();
}

// Bug : ressource non fermée
public void readFile(String path) throws IOException {
    BufferedReader reader = new BufferedReader(new FileReader(path));
    String line = reader.readLine();
    // reader n'est jamais fermé → fuite de ressource
}
\`\`\`

#### Reliability Rating
- **A** : 0 bugs
- **B** : au moins 1 bug mineur
- **C** : au moins 1 bug majeur
- **D** : au moins 1 bug critique
- **E** : au moins 1 bug bloquant

### Métriques de sécurité

#### Vulnérabilités

Failles exploitables dans le code :

\`\`\`java
// Vulnérabilité : SQL Injection
String query = "SELECT * FROM users WHERE name = '" + userInput + "'";
Statement stmt = connection.createStatement();
ResultSet rs = stmt.executeQuery(query); // Injection possible !

// Correction : requête paramétrée
PreparedStatement pstmt = connection.prepareStatement(
    "SELECT * FROM users WHERE name = ?");
pstmt.setString(1, userInput);
ResultSet rs = pstmt.executeQuery();
\`\`\`

#### Security Hotspots

Les hotspots sont des zones de code **potentiellement** vulnérables qui nécessitent une revue humaine :
- Utilisation de cryptographie → l'algorithme est-il assez fort ?
- Configuration de cookies → le flag Secure est-il activé ?
- Écriture dans les logs → des données sensibles sont-elles loguées ?

Le développeur doit les marquer comme **Safe**, **Fixed** ou confirmer comme **Vulnerable**.

### Métriques de maintenabilité

#### Code Smells

Un code smell ne cause pas de bug mais rend le code difficile à maintenir :

\`\`\`java
// Smell : fonction trop longue (cognitive complexity élevée)
public void processOrder(Order order) {
    // 200 lignes de code avec des if/else imbriqués...
}

// Smell : code dupliqué (copier-coller)
// Le même bloc apparaît dans 3 fichiers différents

// Smell : paramètre non utilisé
public void calculate(int a, int b, int unusedParam) {
    return a + b;
}
\`\`\`

#### Technical Debt (Dette technique)

La dette technique est exprimée en **temps de travail** estimé pour corriger tous les code smells :
- 1 smell mineur = ~5 minutes
- 1 smell majeur = ~30 minutes
- 1 smell critique = ~1 heure

SonarQube calcule aussi le **Technical Debt Ratio** :
\`\`\`
TDR = dette_technique / temps_développement_estimé × 100
\`\`\`

Exemple : 4 jours de dette sur un projet estimé à 100 jours → TDR = 4%

#### Maintainability Rating
- **A** : TDR ≤ 5% (excellent)
- **B** : 6-10% (bon)
- **C** : 11-20% (acceptable)
- **D** : 21-50% (mauvais)
- **E** : > 50% (très mauvais)

### Complexité

#### Complexité cyclomatique

Nombre de chemins linéairement indépendants dans le code :
\`\`\`java
// Complexité = 1 (linéaire)
public int simple() { return 42; }

// Complexité = 3 (1 + 2 conditions)
public String classify(int score) {
    if (score >= 90) return "A";      // +1
    else if (score >= 70) return "B";  // +1
    else return "C";
}
\`\`\`

#### Complexité cognitive

Mesure plus moderne qui évalue la **difficulté de compréhension** :
- Les imbrications augmentent la complexité
- Les breaks dans le flux (continue, break, goto) augmentent la complexité
- Les structures récursives sont pénalisées

### Quality Gates en détail

#### Quality Gate par défaut ("Sonar Way")

Conditions sur le **nouveau code** (New Code Period) :
- Coverage ≥ 80%
- Duplicated Lines ≤ 3%
- Reliability Rating = A
- Security Rating = A
- Security Hotspots Reviewed = 100%
- Maintainability Rating = A

#### Créer un Quality Gate personnalisé

Vous pouvez ajouter des conditions supplémentaires :

| Condition | Opérateur | Seuil | Justification |
|-----------|-----------|-------|---------------|
| Coverage on New Code | > | 85% | Exigence projet |
| Cognitive Complexity | < | 15 | Lisibilité |
| Duplicated Lines | < | 2% | DRY principle |
| Bugs | = | 0 | Zéro bug |
| Code Smells on New Code | < | 10 | Propreté |

#### New Code Period

Le "New Code Period" définit ce qui est considéré comme "nouveau code" :
- **Previous Version** : depuis la dernière release (recommandé)
- **Number of days** : les N derniers jours (ex: 30 jours)
- **Specific date** : depuis une date précise
- **Reference Branch** : différence avec une branche (main, develop)

### Profils de qualité (Quality Profiles)

Un Quality Profile est l'ensemble des règles activées pour un langage donné :

- **Sonar Way** : profil par défaut, règles sélectionnées par SonarSource
- **Sonar Way Recommended** : plus strict, inclut plus de règles
- **Custom** : vous pouvez créer vos propres profils

\`\`\`
Exemple de personnalisation :
- Partir de "Sonar Way" pour Java
- Ajouter les règles OWASP Top 10
- Désactiver les règles de style (géré par Checkstyle)
- Augmenter la sévérité des règles de sécurité
\`\`\``,

      practiceContent: `### Travaux Pratiques : Configuration des Quality Gates

#### TP 1 : Explorer les métriques d'un projet

1. Dans votre SonarQube, analysez un projet Java avec au moins 10 fichiers
2. Explorez le dashboard :
   - Notez le nombre de bugs, vulnérabilités, code smells
   - Identifiez la dette technique totale
   - Vérifiez le pourcentage de couverture
3. Naviguez dans l'onglet "Issues" :
   - Filtrez par sévérité (Blocker, Critical, Major, Minor)
   - Filtrez par type (Bug, Vulnerability, Code Smell)
   - Assignez une issue à vous-même

#### TP 2 : Créer un Quality Gate personnalisé

1. Allez dans Quality Gates > Create
2. Nom : "Formation Strict Gate"
3. Ajoutez les conditions suivantes :
   - Coverage on New Code > 90%
   - Duplicated Lines on New Code < 2%
   - Reliability Rating on New Code = A
   - Security Rating on New Code = A
   - Maintainability Rating on New Code = A
   - Cognitive Complexity < 20
4. Appliquez ce Quality Gate à votre projet
5. Relancez l'analyse et observez le résultat

#### TP 3 : Personnaliser un Quality Profile

\`\`\`bash
# Exporter le profil actuel via l'API
curl "http://localhost:9000/api/qualityprofiles/export?qualityProfile=Sonar%20way&language=java" \\
  -u admin:password > sonar-way-java.xml

# Lister les règles disponibles
curl "http://localhost:9000/api/rules/search?languages=java&ps=500" \\
  -u admin:password | python3 -m json.tool | head -100
\`\`\`

1. Créez un nouveau profil basé sur "Sonar Way"
2. Activez les règles OWASP Top 10
3. Désactivez les règles qui ne s'appliquent pas à votre projet
4. Assignez le profil à votre projet

#### TP 4 : Analyser l'évolution

1. Faites 3 analyses successives en modifiant le code entre chaque :
   - Analyse 1 : code initial
   - Analyse 2 : ajoutez du code dupliqué
   - Analyse 3 : corrigez la duplication
2. Observez les graphiques d'évolution dans le dashboard
3. Vérifiez que le Quality Gate reflète les changements

#### TP 5 : Intégrer le Quality Gate dans un pipeline

\`\`\`bash
# Après l'analyse, vérifier le Quality Gate
STATUS=$(curl -s "http://localhost:9000/api/qualitygates/project_status?projectKey=formation-test" \\
  -u admin:password | python3 -c "import sys,json; print(json.load(sys.stdin)['projectStatus']['status'])")

echo "Quality Gate Status: $STATUS"
if [ "$STATUS" != "OK" ]; then
  echo "ERREUR: Quality Gate FAILED - build bloqué"
  exit 1
fi
echo "Quality Gate passé avec succès"
\`\`\``,

      keyPoints: JSON.stringify([
        'Cinq dimensions : Fiabilité, Sécurité, Maintenabilité, Couverture, Duplications',
        'Technical Debt = temps estimé pour corriger tous les code smells',
        'Quality Gate vérifie les conditions sur le nouveau code (Clean as You Code)',
        'Profils de qualité : ensemble de règles activées par langage',
        'New Code Period : définit ce qui est considéré comme nouveau (version, jours, branche)',
        'Security Hotspots nécessitent une revue humaine (pas automatiquement des vulnérabilités)'
      ]) },


    { id: 'sq-03', courseId: 'sonarqube', title: 'Intégration CI/CD et SonarLint', duration: '4h', orderIndex: 3,
      theoryContent: `## Intégration de SonarQube dans les pipelines CI/CD

### Le flux d'analyse complet

L'intégration de SonarQube dans la CI/CD automatise l'analyse qualité à chaque changement de code :

\`\`\`
Developer push → CI triggered → Build → Test → SonarScanner → SonarQube
                                                                    │
                                                              Quality Gate
                                                              ┌─────┴─────┐
                                                              │           │
                                                            PASS        FAIL
                                                              │           │
                                                           Deploy      Block
                                                              │        + Notify
                                                              ▼           │
                                                           Staging        ▼
                                                                     Fix code
\`\`\`

### Intégration avec Jenkins

#### Pipeline déclaratif avec SonarQube

\`\`\`groovy
pipeline {
    agent any
    
    environment {
        SONAR_TOKEN = credentials('sonarqube-token')
    }
    
    stages {
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
                    junit '**/target/surefire-reports/*.xml'
                    jacoco execPattern: '**/target/jacoco.exec'
                }
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube-Server') {
                    sh """
                        mvn sonar:sonar \\
                            -Dsonar.projectKey=my-project \\
                            -Dsonar.projectName="My Project" \\
                            -Dsonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml
                    """
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
        
        stage('Deploy') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                sh 'mvn deploy -DskipTests'
            }
        }
    }
}
\`\`\`

### Intégration avec GitLab CI

\`\`\`yaml
# .gitlab-ci.yml
variables:
  SONAR_HOST_URL: "https://sonarqube.company.com"
  SONAR_TOKEN: $SONAR_TOKEN

stages:
  - build
  - test
  - quality
  - deploy

build:
  stage: build
  script:
    - mvn clean compile

test:
  stage: test
  script:
    - mvn test
  artifacts:
    reports:
      junit: target/surefire-reports/*.xml
    paths:
      - target/jacoco.exec
      - target/site/jacoco/jacoco.xml

sonarqube:
  stage: quality
  image: sonarsource/sonar-scanner-cli:latest
  script:
    - sonar-scanner
        -Dsonar.projectKey=$CI_PROJECT_NAME
        -Dsonar.sources=src/main
        -Dsonar.tests=src/test
        -Dsonar.java.binaries=target/classes
        -Dsonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml
        -Dsonar.qualitygate.wait=true
  allow_failure: false
\`\`\`

### Intégration avec GitHub Actions

\`\`\`yaml
# .github/workflows/sonar.yml
name: SonarQube Analysis

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  sonarqube:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Important pour l'analyse du nouveau code
      
      - name: Set up JDK 17
        uses: actions/setup-java@v3
        with:
          java-version: 17
          distribution: temurin
      
      - name: Build and Test
        run: mvn clean verify
      
      - name: SonarQube Scan
        uses: sonarsource/sonarqube-scan-action@master
        env:
          SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: \${{ secrets.SONAR_HOST_URL }}
      
      - name: Quality Gate Check
        uses: sonarsource/sonarqube-quality-gate-action@master
        timeout-minutes: 5
        env:
          SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}
\`\`\`

### Pull Request Decoration

SonarQube peut commenter directement les Pull Requests avec les résultats d'analyse :

- **Status check** : Passed/Failed visible dans la PR
- **Commentaires inline** : issues directement sur les lignes de code
- **Résumé** : tableau récapitulatif des métriques

Configuration pour GitHub :
1. Créez une GitHub App ou un Personal Access Token
2. Configurez dans SonarQube : Administration > Configuration > GitHub
3. Les résultats apparaissent automatiquement sur les PRs

### SonarLint : l'analyse dans l'IDE

SonarLint est l'extension IDE qui fournit un feedback **immédiat** au développeur :

#### Fonctionnalités

- Analyse en temps réel pendant que vous tapez
- Mêmes règles que SonarQube (synchronisées via Connected Mode)
- Pas besoin d'attendre le CI pour connaître les problèmes
- Support : VS Code, IntelliJ IDEA, Eclipse, Visual Studio

#### Connected Mode

Le Connected Mode synchronise les règles et les configurations depuis votre serveur SonarQube :

\`\`\`json
// .vscode/settings.json
{
  "sonarlint.connectedMode.connections.sonarqube": [
    {
      "serverUrl": "https://sonarqube.company.com",
      "token": "sqa_xxxx"
    }
  ],
  "sonarlint.connectedMode.project": {
    "connectionId": "company-sonarqube",
    "projectKey": "my-project"
  }
}
\`\`\`

Avantages du Connected Mode :
- Mêmes règles que le serveur (pas de surprise au CI)
- Issues supprimées sur le serveur ne sont plus affichées localement
- Profils personnalisés appliqués automatiquement
- Notification des nouveaux issues détectés par le serveur

### Webhooks et notifications

SonarQube peut notifier des systèmes externes après chaque analyse :

\`\`\`json
// Payload envoyé par le webhook
{
  "serverUrl": "https://sonarqube.company.com",
  "taskId": "AXoFPGr_e5s",
  "status": "SUCCESS",
  "analysedAt": "2024-01-15T14:30:00+0000",
  "project": {
    "key": "my-project",
    "name": "My Project"
  },
  "qualityGate": {
    "status": "ERROR",
    "conditions": [
      {
        "metric": "coverage",
        "operator": "LESS_THAN",
        "value": "65.2",
        "errorThreshold": "80",
        "status": "ERROR"
      }
    ]
  }
}
\`\`\`

Cas d'usage des webhooks :
- Notifier Slack/Teams du résultat du Quality Gate
- Bloquer un merge si le Quality Gate est FAILED
- Mettre à jour un dashboard de suivi
- Déclencher une action de remédiation automatique`,

      practiceContent: `### Travaux Pratiques : Intégration CI/CD

#### TP 1 : Configurer l'analyse dans un Jenkinsfile

1. Installez le plugin SonarQube Scanner dans Jenkins
2. Configurez la connexion dans Jenkins > Manage Jenkins > Configure System
3. Créez un pipeline avec le Jenkinsfile suivant et exécutez-le :

\`\`\`groovy
pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Build & Test') {
            steps { sh 'mvn clean verify' }
        }
        stage('SonarQube') {
            steps {
                withSonarQubeEnv('MySonarQube') {
                    sh 'mvn sonar:sonar'
                }
            }
        }
        stage('Gate') {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}
\`\`\`

4. Vérifiez que le pipeline échoue si le Quality Gate est FAILED

#### TP 2 : Configurer SonarLint en Connected Mode

1. Installez SonarLint dans VS Code (ou votre IDE)
2. Ajoutez la connexion au serveur SonarQube local
3. Liez votre projet local au projet SonarQube
4. Vérifiez que les mêmes règles s'appliquent en local
5. Modifiez un fichier et observez les issues en temps réel

#### TP 3 : Configurer un webhook

\`\`\`bash
# Créer un webhook dans SonarQube
curl -X POST "http://localhost:9000/api/webhooks/create" \\
  -u admin:password \\
  -d "name=Jenkins Notification" \\
  -d "url=http://jenkins:8080/sonarqube-webhook/"

# Vérifier les webhooks configurés
curl "http://localhost:9000/api/webhooks/list" -u admin:password
\`\`\`

#### TP 4 : Analyse de branches et PR

1. Créez une branche feature dans votre projet Git
2. Ajoutez du code avec des issues intentionnelles
3. Lancez l'analyse en spécifiant la branche :
\`\`\`bash
sonar-scanner \\
  -Dsonar.branch.name=feature/new-module \\
  -Dsonar.branch.target=main
\`\`\`
4. Observez les résultats dans SonarQube (onglet Branches)
5. Comparez les métriques entre la branche et main

#### TP 5 : Script de vérification du Quality Gate

\`\`\`bash
#!/bin/bash
# Script de vérification post-analyse
PROJECT_KEY="formation-test"
SONAR_URL="http://localhost:9000"
SONAR_TOKEN="sqa_votre_token"

# Attendre que l'analyse soit terminée
sleep 10

# Récupérer le statut du Quality Gate
RESPONSE=$(curl -s "$SONAR_URL/api/qualitygates/project_status?projectKey=$PROJECT_KEY" \\
  -H "Authorization: Bearer $SONAR_TOKEN")

STATUS=$(echo $RESPONSE | python3 -c "import sys,json; print(json.load(sys.stdin)['projectStatus']['status'])")

echo "Quality Gate: $STATUS"

if [ "$STATUS" = "OK" ]; then
    echo "✅ Qualité validée - déploiement autorisé"
    exit 0
else
    echo "❌ Qualité insuffisante - corrections requises"
    # Afficher les conditions en échec
    echo $RESPONSE | python3 -m json.tool
    exit 1
fi
\`\`\``,

      keyPoints: JSON.stringify([
        'waitForQualityGate dans Jenkins bloque le pipeline si la qualité est insuffisante',
        'SonarLint en Connected Mode synchronise les règles du serveur vers l\'IDE',
        'PR Decoration affiche les résultats directement dans les Pull Requests',
        'fetch-depth: 0 est requis pour l\'analyse du nouveau code (git blame)',
        'Les webhooks permettent de notifier des systèmes externes du résultat',
        'L\'analyse de branches permet de vérifier la qualité avant le merge'
      ]) },


    // ==================== DOORS ====================
    { id: 'doors-01', courseId: 'doors', title: 'Introduction à IBM DOORS', duration: '3h', orderIndex: 1,
      theoryContent: `## Introduction à IBM DOORS

### Qu'est-ce que IBM DOORS ?

IBM DOORS (Dynamic Object-Oriented Requirements System) est un outil de **gestion des exigences** (Requirements Management) utilisé dans les industries à forte réglementation : aéronautique, défense, automobile, ferroviaire, médical et spatial.

DOORS permet de :
- **Capturer** les exigences de manière structurée
- **Tracer** les liens entre exigences, conception, tests et code
- **Analyser l'impact** d'un changement sur l'ensemble du système
- **Vérifier la couverture** : chaque exigence est-elle testée ?
- **Collaborer** entre les équipes (systèmes, logiciel, test, client)

### Pourquoi la gestion des exigences ?

Dans un projet complexe (avion, voiture autonome, dispositif médical), une mauvaise gestion des exigences est la **première cause d'échec** :

| Problème | Conséquence | Solution DOORS |
|----------|-------------|----------------|
| Exigences ambiguës | Interprétations différentes | Attributs et modèles structurés |
| Exigences perdues | Fonctionnalités manquantes | Base de données centralisée |
| Changements non tracés | Régressions | Historique et baseline |
| Pas de traçabilité | Impossible de certifier | Liens et matrices |
| Tests incomplets | Bugs en production | Couverture vérifiable |

### Concepts fondamentaux de DOORS

#### 1. Base de données DOORS

La base de données DOORS est organisée hiérarchiquement :
\`\`\`
Database (serveur)
├── Project (projet)
│   ├── Folder (dossier)
│   │   ├── Formal Module (module d'exigences)
│   │   ├── Formal Module
│   │   └── Link Module (module de liens)
│   └── Folder
│       └── ...
└── Project
    └── ...
\`\`\`

#### 2. Modules formels

Un module formel est un **document structuré** contenant des objets (exigences, texte, headings) :

| Élément | Description | Exemple |
|---------|-------------|---------|
| Object | Unité de base (exigence, texte) | "Le système doit répondre en < 2s" |
| Heading | Titre de section | "3.2 Exigences de performance" |
| Attribute | Métadonnée d'un objet | Status: Approved, Priority: High |
| Object ID | Identifiant unique absolu | MOD-REQ-00042 |

#### 3. Attributs d'exigences

Chaque exigence possède des attributs typés :

\`\`\`
Attributs standards :
- Object Identifier : identifiant unique (auto-généré)
- Object Text : texte de l'exigence
- Object Heading : titre (si c'est un heading)
- Created By : auteur
- Created On : date de création
- Last Modified On : date de dernière modification

Attributs personnalisés (exemples) :
- Status : Draft, Under Review, Approved, Deleted
- Priority : Must, Should, Could, Won't (MoSCoW)
- Verification Method : Test, Analysis, Inspection, Demonstration
- Allocated To : sous-système ou composant responsable
- Rationale : justification de l'exigence
- Compliance : Compliant, Non-Compliant, Partial, N/A
\`\`\`

#### 4. Liens entre objets

Les liens créent la **traçabilité** entre les niveaux d'exigences :

\`\`\`
Exigences Client (Stakeholder Requirements - StRS)
        │ satisfiedBy
        ▼
Exigences Système (System Requirements - SyRS)
        │ satisfiedBy
        ▼
Exigences Logiciel (Software Requirements - SRS)
        │ satisfiedBy
        ▼
Exigences de Conception (Design - DD)
        │ verifiedBy
        ▼
Cas de Tests (Test Cases - TC)
\`\`\`

Types de liens courants :
- **satisfiedBy** : l'exigence de bas niveau satisfait celle de haut niveau
- **verifiedBy** : le test vérifie l'exigence
- **derivedFrom** : l'exigence dérive d'une autre
- **implementedBy** : le code implémente l'exigence
- **refines** : détaille une exigence de plus haut niveau

### DOORS classique vs DOORS Next Generation (DNG)

| Critère | DOORS Classic (9.x) | DOORS Next (DNG) |
|---------|-------------------|-------------------|
| Architecture | Client lourd Windows | Web (Jazz/CLM) |
| Collaboration | Fichiers lockés | Temps réel |
| Versionnement | Baselines | Streams/Changesets |
| Interface | Win32, DXL scripting | REST API, OSLC |
| Liens | Link Modules | OSLC links |
| Performance | Rapide localement | Dépend du réseau |
| Maturité | 25+ ans, très stable | Plus récent, évolutif |

### Standards et certifications

DOORS est utilisé pour se conformer à :
- **DO-178C** : logiciel aéronautique (niveaux A à E)
- **ISO 26262** : sécurité fonctionnelle automobile (ASIL A à D)
- **IEC 62304** : logiciel dispositifs médicaux
- **EN 50128** : logiciel ferroviaire (SIL 0 à 4)
- **MIL-STD-498** : logiciel militaire
- **CMMI** : maturité des processus

Ces standards exigent une traçabilité **bidirectionnelle complète** entre exigences, conception, code et tests.

### L'écosystème autour de DOORS

- **DOORS** : gestion des exigences
- **Rhapsody** : modélisation UML/SysML liée aux exigences
- **Rational Team Concert (RTC)** : gestion des tâches et du code source
- **Rational Quality Manager (RQM)** : gestion des tests
- **OSLC** (Open Services for Lifecycle Collaboration) : interconnexion entre outils`,

      practiceContent: `### Travaux Pratiques : Prise en main de DOORS

#### Prérequis
- IBM DOORS 9.7 installé (ou accès à un serveur DOORS)
- Licence utilisateur active
- Connexion au serveur DOORS configurée

#### Étape 1 : Connexion et navigation

1. Lancez le client DOORS
2. Connectez-vous au serveur :
   - Host : doors-server.company.com
   - Port : 36677 (par défaut)
   - Username / Password
3. Explorez la structure de la base :
   - Ouvrez le Database Explorer
   - Identifiez les projets existants
   - Naviguez dans les dossiers et modules

#### Étape 2 : Créer un projet et un module

1. Créez un nouveau projet : File > New > Project
   - Nom : "Formation_DOORS_TP"
2. Créez un dossier : clic droit > New > Folder
   - Nom : "01_Requirements"
3. Créez un module formel : clic droit > New > Formal Module
   - Nom : "SRS - Software Requirements"
   - Prefix : "SRS"

#### Étape 3 : Configurer les attributs

1. Dans le module, allez dans Edit > Attributes > Define
2. Créez les attributs personnalisés :
\`\`\`
Nom: Status
Type: Enumeration
Valeurs: Draft, Under Review, Approved, Deleted
Défaut: Draft

Nom: Priority
Type: Enumeration
Valeurs: Must, Should, Could, Won't
Défaut: Should

Nom: Verification_Method
Type: Enumeration
Valeurs: Test, Analysis, Inspection, Demonstration
Défaut: Test

Nom: Allocated_To
Type: String
Défaut: (vide)
\`\`\`

#### Étape 4 : Saisir des exigences

1. Créez la structure hiérarchique :
\`\`\`
1. Introduction
   1.1 Purpose
   1.2 Scope
2. Functional Requirements
   2.1 User Authentication
       SRS-001: The system shall authenticate users via login/password
       SRS-002: The system shall lock account after 3 failed attempts
       SRS-003: The system shall support password reset via email
   2.2 Data Management
       SRS-004: The system shall store data in encrypted format
       SRS-005: The system shall backup data every 24 hours
3. Non-Functional Requirements
   3.1 Performance
       SRS-006: The system shall respond within 2 seconds for 95% of requests
       SRS-007: The system shall support 1000 concurrent users
   3.2 Security
       SRS-008: The system shall encrypt all data in transit using TLS 1.3
\`\`\`

2. Pour chaque exigence, remplissez les attributs (Status, Priority, Verification Method)

#### Étape 5 : Créer une vue personnalisée

1. Insert > Column > Sélectionnez : Object Identifier, Object Text, Status, Priority
2. Appliquez un filtre : Status != "Deleted"
3. Sauvegardez la vue : View > Save Current View As > "Requirements Overview"

#### Étape 6 : Créer une baseline

1. File > Baseline > Create
2. Nom : "Baseline_V1.0"
3. Description : "Première version approuvée des exigences"
4. Vérifiez : la baseline est read-only, protégeant cette version

#### Questions de vérification
- Combien d'exigences avez-vous créées ?
- Quel est l'identifiant de la dernière exigence ?
- La baseline est-elle accessible en lecture seule ?
- Pouvez-vous modifier un objet dans la baseline ?`,

      keyPoints: JSON.stringify([
        'DOORS gère les exigences avec traçabilité complète dans les industries réglementées',
        'Structure : Database > Project > Folder > Module > Object (exigence)',
        'Chaque objet possède des attributs typés (Status, Priority, Verification Method)',
        'Les liens entre modules créent la traçabilité bidirectionnelle (satisfiedBy, verifiedBy)',
        'Les baselines protègent une version figée des exigences (non modifiable)',
        'Conforme aux standards DO-178C, ISO 26262, IEC 62304, EN 50128'
      ]) },


    { id: 'doors-02', courseId: 'doors', title: 'Traçabilité et liens', duration: '5h', orderIndex: 2,
      theoryContent: `## Traçabilité et liens dans DOORS

### Le concept de traçabilité

La traçabilité des exigences est la capacité de **suivre la vie d'une exigence** dans les deux directions :
- **Traçabilité amont (upstream)** : d'où vient cette exigence ? Quel besoin client la justifie ?
- **Traçabilité aval (downstream)** : comment cette exigence est-elle implémentée et testée ?

### Pourquoi la traçabilité est-elle critique ?

#### Certification et conformité

Les standards de sécurité exigent une traçabilité **complète et bidirectionnelle** :

\`\`\`
DO-178C (aéronautique) :
- Chaque exigence HLR doit être tracée vers les exigences système
- Chaque exigence LLR doit être tracée vers un HLR
- Chaque test doit être tracé vers un LLR
- Chaque LLR doit être vérifié par au moins un test

ISO 26262 (automobile) :
- Traçabilité entre niveaux ASIL
- Couverture complète des safety requirements
- Analyse d'impact pour chaque modification
\`\`\`

#### Analyse d'impact

Quand une exigence change, la traçabilité permet d'identifier immédiatement :
- Quelles exigences de niveau inférieur sont impactées ?
- Quels composants logiciels doivent être modifiés ?
- Quels tests doivent être re-exécutés ?
- Quel est le coût du changement ?

### Link Modules dans DOORS

Dans DOORS classique, les liens entre objets sont stockés dans des **Link Modules** :

\`\`\`
Link Module : "satisfiedBy_links"
├── Source : SyRS (System Requirements)
├── Target : SRS (Software Requirements)
├── Type : satisfiedBy
└── Cardinalité : many-to-many
\`\`\`

#### Créer un Link Module

1. Dans le projet, clic droit > New > Link Module
2. Configuration :
   - Nom : "SyRS_to_SRS_satisfiedBy"
   - Source Module : System Requirements (SyRS)
   - Target Module : Software Requirements (SRS)

#### Créer des liens entre objets

Méthodes pour créer des liens :
- **Drag & Drop** : glisser un objet source vers un objet cible
- **Edit > Links** : interface de gestion des liens
- **DXL Script** : création automatisée de liens en masse

### Matrice de traçabilité

La matrice de traçabilité (Traceability Matrix) est une **vue croisée** montrant les liens entre deux modules :

\`\`\`
                    SRS-001  SRS-002  SRS-003  SRS-004  SRS-005
SyRS-REQ-01           ✓        ✓
SyRS-REQ-02                              ✓
SyRS-REQ-03                                        ✓       ✓
SyRS-REQ-04     (non couvert - GAP !)
\`\`\`

La matrice révèle :
- **Gaps** : exigences de haut niveau sans lien vers le bas (non implémentées)
- **Orphelins** : exigences de bas niveau sans lien vers le haut (non justifiées)
- **Sur-allocation** : une exigence satisfaite par trop de composants (complexité)

### Analyse de couverture

DOORS permet de calculer automatiquement la couverture :

\`\`\`
Couverture aval = Exigences HLR avec au moins un lien aval / Total exigences HLR × 100

Exemple :
- 150 exigences système (SyRS)
- 142 ont au moins un lien vers une exigence logicielle (SRS)
- Couverture = 142/150 = 94.7%
- GAP = 8 exigences non dérivées → à investiguer !
\`\`\`

### Types de liens et conventions

#### Liens structurels standard

| Nom du lien | Direction | Signification |
|-------------|-----------|---------------|
| satisfiedBy | HLR → LLR | L'exigence basse satisfait la haute |
| verifiedBy | REQ → TEST | Le test vérifie l'exigence |
| derivedFrom | LLR → HLR | L'exigence dérive de la haute |
| implementedBy | REQ → CODE | Le code implémente l'exigence |
| allocatedTo | REQ → COMPONENT | L'exigence est allouée au composant |
| refines | Detail → General | L'exigence détaille une autre |
| conflicts | REQ → REQ | Conflit identifié entre exigences |

#### Bonnes pratiques pour les liens

1. **Cohérence directionnelle** : toujours du même sens (haut vers bas ou bas vers haut)
2. **Cardinalité raisonnable** : une exigence ne devrait pas satisfaire plus de 5-7 exigences
3. **Justification** : ajouter un commentaire sur le lien si la relation n'est pas évidente
4. **Maintenance** : vérifier les liens lors de chaque modification d'exigence
5. **Automatisation** : utiliser DXL pour les vérifications systématiques

### Suspects (liens suspectés invalides)

Quand un objet source ou cible est modifié, DOORS marque le lien comme **suspect** :

\`\`\`
Scénario :
1. SyRS-REQ-01 : "Le système doit supporter 500 utilisateurs"
2. SRS-001 est lié à SyRS-REQ-01 (satisfiedBy)
3. SyRS-REQ-01 est modifié : "Le système doit supporter 2000 utilisateurs"
4. → Le lien SRS-001 → SyRS-REQ-01 devient SUSPECT
5. → L'ingénieur doit vérifier si SRS-001 est toujours valide
\`\`\`

La gestion des suspects est essentielle pour maintenir la cohérence du système.

### DXL pour l'automatisation des liens

DXL (DOORS eXtension Language) permet d'automatiser les vérifications :

\`\`\`c
// Script DXL : Trouver les exigences sans liens aval
Module m = current Module
Object o
int countWithLinks = 0
int countWithoutLinks = 0

for o in entire m do {
    if (o."Object Text" != "") {
        Link outLink
        bool hasLink = false
        for outLink in all(o -> "*") do {
            hasLink = true
            break
        }
        if (hasLink) {
            countWithLinks++
        } else {
            countWithoutLinks++
            print identifier(o) " : " o."Object Text" "\\n"
        }
    }
}

print "\\n--- Résumé ---\\n"
print "Avec liens : " countWithLinks "\\n"
print "Sans liens (GAPS) : " countWithoutLinks "\\n"
\`\`\`

### Vues d'analyse dans DOORS

#### Vue "Traceability Explorer"
- Affiche l'arbre de traçabilité complet d'un objet
- Navigation bidirectionnelle (amont/aval)
- Identification visuelle des gaps et suspects

#### Vue "Coverage Analysis"
- Pourcentage de couverture par module
- Liste des objets non couverts
- Export vers Excel pour reporting

#### Vue "Impact Analysis"
- Sélectionnez un objet modifié
- DOORS montre tous les objets impactés (directs et indirects)
- Estimation du périmètre de re-vérification`,

      practiceContent: `### Travaux Pratiques : Traçabilité

#### TP 1 : Créer une structure de traçabilité complète

1. Créez trois modules dans votre projet :
\`\`\`
Formation_DOORS_TP/
├── 01_System_Requirements/ (SyRS)
│   └── Module : "System Requirements"
├── 02_Software_Requirements/ (SRS)
│   └── Module : "Software Requirements"
└── 03_Test_Cases/ (TC)
    └── Module : "Test Cases"
\`\`\`

2. Peuplez chaque module :
   - SyRS : 5 exigences système (SyRS-001 à SyRS-005)
   - SRS : 10 exigences logiciel (SRS-001 à SRS-010)
   - TC : 8 cas de test (TC-001 à TC-008)

#### TP 2 : Créer les Link Modules et les liens

1. Créez un Link Module "SyRS_to_SRS" :
   - Source : System Requirements
   - Target : Software Requirements
   - Type : satisfiedBy

2. Créez un Link Module "SRS_to_TC" :
   - Source : Software Requirements
   - Target : Test Cases
   - Type : verifiedBy

3. Établissez les liens :
   - SyRS-001 → SRS-001, SRS-002
   - SyRS-002 → SRS-003, SRS-004
   - SyRS-003 → SRS-005, SRS-006
   - SyRS-004 → (intentionnellement sans lien = GAP)
   - SyRS-005 → SRS-009, SRS-010

4. Liez les tests :
   - SRS-001 → TC-001
   - SRS-002 → TC-002
   - SRS-003 → TC-003, TC-004
   - SRS-005 → TC-005
   - SRS-007 → (pas de test = GAP)

#### TP 3 : Générer la matrice de traçabilité

1. Ouvrez Analysis > Traceability Matrix
2. Configurez :
   - Row Module : System Requirements
   - Column Module : Software Requirements
3. Identifiez :
   - Les lignes vides (exigences système non dérivées)
   - Les colonnes vides (exigences logiciel orphelines)
4. Exportez la matrice en CSV

#### TP 4 : Simuler une analyse d'impact

1. Modifiez SyRS-001 (changez le texte de l'exigence)
2. Observez les liens qui deviennent "suspect"
3. Ouvrez chaque lien suspect et décidez :
   - Le lien est toujours valide → Clear suspect
   - Le lien nécessite une mise à jour → Modifier SRS
4. Documentez l'impact :
   - Combien d'exigences SRS sont impactées ?
   - Combien de tests doivent être re-exécutés ?

#### TP 5 : Script DXL de vérification

Exécutez le script suivant pour identifier les gaps :
\`\`\`
// Dans le module SRS, vérifier la couverture test
Module m = current Module
Object o
int covered = 0
int notCovered = 0

for o in entire m do {
    if (o."Object Text" != "" and !isHeading(o)) {
        bool hasTestLink = false
        Link lnk
        for lnk in all(o -> "verifiedBy") do {
            hasTestLink = true
            break
        }
        if (!hasTestLink) {
            notCovered++
            print identifier(o) " - PAS DE TEST\\n"
        } else {
            covered++
        }
    }
}
print "\\nCouverture test : " covered "/" (covered + notCovered) "\\n"
\`\`\``,

      keyPoints: JSON.stringify([
        'Traçabilité bidirectionnelle : amont (d\'où vient l\'exigence) et aval (comment elle est implémentée)',
        'Link Modules stockent les relations entre objets de modules différents',
        'La matrice de traçabilité révèle les GAPS (non couvert) et orphelins (non justifié)',
        'Les liens deviennent SUSPECTS quand un objet source ou cible est modifié',
        'L\'analyse d\'impact montre toutes les conséquences d\'un changement',
        'DXL permet d\'automatiser les vérifications de couverture et de cohérence'
      ]) },


    { id: 'doors-03', courseId: 'doors', title: 'Administration et DXL', duration: '7h', orderIndex: 3,
      theoryContent: `## Administration DOORS et programmation DXL

### Administration de DOORS

#### Gestion des utilisateurs et groupes

DOORS utilise un modèle de sécurité basé sur les **groupes** et les **niveaux d'accès** :

\`\`\`
Niveaux d'accès (Access Levels) :
- None : aucun accès
- Read : lecture seule
- Modify : modification des objets existants
- Create : création de nouveaux objets
- Delete : suppression d'objets
- Admin : administration complète

Hiérarchie des droits :
Database Admin > Project Admin > Module Owner > User
\`\`\`

#### Configuration des accès

Les accès sont configurés à chaque niveau de la hiérarchie :

| Niveau | Ce qui est contrôlé |
|--------|-------------------|
| Database | Qui peut créer des projets |
| Project | Qui peut accéder au projet |
| Folder | Héritage ou override des droits |
| Module | Qui peut lire/modifier le module |
| Attribute | Qui peut modifier un attribut spécifique |

#### Baselines et gestion de versions

Les baselines capturent un **instantané figé** d'un module à un moment donné :

\`\`\`
Module "SRS" - Historique des baselines :
├── Baseline 1.0 (2024-01-15) - "Version initiale approuvée"
├── Baseline 1.1 (2024-02-20) - "Correction CR-001, CR-002"
├── Baseline 2.0 (2024-04-10) - "Ajout module navigation"
└── Current (en cours de modification)
\`\`\`

Opérations sur les baselines :
- **Créer** : fige la version actuelle
- **Comparer** : voir les différences entre deux baselines
- **Restaurer** : revenir à une version antérieure (crée une nouvelle baseline)
- **Exporter** : générer un document à partir d'une baseline

#### Modules Templates (modèles)

Les templates standardisent la structure des nouveaux modules :
- Attributs pré-définis
- Structure de sections pré-remplie
- Vues par défaut configurées
- Règles de validation intégrées

### DXL - DOORS eXtension Language

DXL est le langage de script de DOORS. C'est un langage **procédural** inspiré du C, avec des extensions spécifiques à DOORS.

#### Syntaxe de base

\`\`\`c
// Variables et types
int count = 0
real pi = 3.14159
string name = "Formation DXL"
bool isValid = true
Date today = today()

// Structures de contrôle
if (count > 0) {
    print "Count is positive\\n"
} else {
    print "Count is zero or negative\\n"
}

// Boucles
int i
for (i = 0; i < 10; i++) {
    print i "\\n"
}

// Fonctions
string formatReq(string id, string text) {
    return id ": " text
}
\`\`\`

#### Accéder aux objets DOORS

\`\`\`c
// Ouvrir un module
Module m = read("/Formation_DOORS_TP/01_Requirements/SRS", true)
if (null m) {
    print "Erreur : module introuvable\\n"
    halt
}

// Parcourir tous les objets
Object o
for o in entire m do {
    string objText = o."Object Text"
    string objId = identifier(o)
    
    if (objText != "" and !isHeading(o)) {
        print objId " | " objText "\\n"
    }
}

// Accéder aux attributs
for o in entire m do {
    string status = o."Status"
    string priority = o."Priority"
    
    if (status == "Draft") {
        print identifier(o) " est encore en brouillon\\n"
    }
}

// Modifier un attribut
Object target = object(42, m)  // Objet numéro 42
target."Status" = "Approved"
target."Approved_Date" = today()
\`\`\`

#### Travailler avec les liens

\`\`\`c
// Parcourir les liens sortants d'un objet
Object o
Module m = current Module

for o in entire m do {
    Link outLink
    int linkCount = 0
    
    for outLink in all(o -> "*") do {
        Object targetObj = target(outLink)
        Module targetMod = module(targetObj)
        
        print identifier(o) " -> " identifier(targetObj)
        print " [" name(targetMod) "]\\n"
        linkCount++
    }
    
    if (linkCount == 0 and !isHeading(o) and o."Object Text" != "") {
        print "WARNING: " identifier(o) " n'a aucun lien sortant\\n"
    }
}

// Créer un lien programmatiquement
Module srcMod = read("/Project/SyRS", false)
Module tgtMod = read("/Project/SRS", false)
Object src = object(10, srcMod)
Object tgt = object(25, tgtMod)

create(src, tgt, linkModuleName("satisfiedBy"))
\`\`\`

#### Scripts utilitaires courants

\`\`\`c
// Script 1 : Export CSV des exigences
Module m = current Module
Object o
Stream csvFile = write("C:/export/requirements.csv")

csvFile << "ID,Text,Status,Priority,Verification\\n"

for o in entire m do {
    if (!isHeading(o) and o."Object Text" != "") {
        csvFile << identifier(o) ","
        csvFile << "\"" o."Object Text" "\","
        csvFile << o."Status" ","
        csvFile << o."Priority" ","
        csvFile << o."Verification_Method" "\\n"
    }
}

close(csvFile)
print "Export terminé\\n"

// Script 2 : Statistiques du module
Module m = current Module
Object o
int total = 0, draft = 0, approved = 0, deleted = 0

for o in entire m do {
    if (!isHeading(o) and o."Object Text" != "") {
        total++
        string st = o."Status"
        if (st == "Draft") draft++
        else if (st == "Approved") approved++
        else if (st == "Deleted") deleted++
    }
}

print "=== Statistiques ===\\n"
print "Total exigences : " total "\\n"
print "Draft : " draft " (" (draft*100/total) "%)\\n"
print "Approved : " approved " (" (approved*100/total) "%)\\n"
print "Deleted : " deleted "\\n"

// Script 3 : Vérifier la qualité des exigences
Module m = current Module
Object o
int issues = 0

for o in entire m do {
    string text = o."Object Text"
    if (text != "" and !isHeading(o)) {
        // Vérifier les mots ambigus
        if (contains(text, "should") or contains(text, "may") or 
            contains(text, "might") or contains(text, "could")) {
            issues++
            print "AMBIGUË: " identifier(o) " contient un mot ambigu\\n"
        }
        // Vérifier la longueur
        if (length(text) > 500) {
            issues++
            print "TROP LONG: " identifier(o) " (" length(text) " chars)\\n"
        }
        // Vérifier qu'elle est testable
        if (o."Verification_Method" == "") {
            issues++
            print "PAS DE MÉTHODE: " identifier(o) "\\n"
        }
    }
}
print "\\nTotal issues qualité : " issues "\\n"
\`\`\`

### Génération de documents

DOORS peut générer des documents formatés (Word, PDF) à partir des modules :
- Templates de documents configurables
- Inclusion automatique des attributs, liens, images
- En-têtes/pieds de page avec métadonnées du projet
- Table des matières automatique
- Matrice de traçabilité intégrée

### Intégration avec d'autres outils

#### OSLC (Open Services for Lifecycle Collaboration)
- Standard IBM pour interconnecter les outils ALM
- DOORS DNG expose des API REST/OSLC
- Liens cross-tool : DOORS ↔ RTC ↔ RQM ↔ Rhapsody

#### Import/Export
- **ReqIF** : format d'échange standard (Requirements Interchange Format)
- **CSV/Excel** : import/export tabulaire
- **Word** : génération de documents conformes`,

      practiceContent: `### Travaux Pratiques : Administration et DXL

#### TP 1 : Configuration des accès

1. Créez deux groupes dans DOORS :
   - "Developers" : accès Read + Modify sur les modules SRS
   - "Reviewers" : accès Read only sur tous les modules

2. Assignez les droits :
\`\`\`
Module SyRS : Developers = Read, Reviewers = Read
Module SRS  : Developers = Modify, Reviewers = Read
Module TC   : Developers = Create, Reviewers = Read
\`\`\`

3. Testez en vous connectant avec un compte de chaque groupe

#### TP 2 : Gérer les baselines

1. Modifiez 3 exigences dans votre module SRS
2. Créez une baseline "V1.0_Approved"
3. Modifiez encore 2 exigences
4. Créez une baseline "V1.1_Updated"
5. Comparez les deux baselines :
   - Quelles sont les différences ?
   - Combien d'objets ont changé ?

#### TP 3 : Écrire un script DXL d'audit

Écrivez un script qui :
1. Parcourt toutes les exigences du module SRS
2. Vérifie pour chaque exigence :
   - A-t-elle un statut autre que "Draft" ?
   - A-t-elle au moins un lien sortant (traçabilité aval) ?
   - A-t-elle un attribut "Priority" renseigné ?
3. Génère un rapport avec :
   - Le nombre total d'exigences
   - Le pourcentage conforme
   - La liste des exigences non conformes

\`\`\`c
// Squelette du script
Module m = current Module
Object o
int total = 0, compliant = 0

for o in entire m do {
    if (!isHeading(o) and o."Object Text" != "") {
        total++
        bool isCompliant = true
        
        // Vérification 1 : Status
        if (o."Status" == "Draft" or o."Status" == "") {
            isCompliant = false
            print "[STATUS] " identifier(o) "\\n"
        }
        
        // Vérification 2 : Lien aval
        Link lnk
        bool hasOutLink = false
        for lnk in all(o -> "*") do {
            hasOutLink = true
            break
        }
        if (!hasOutLink) {
            isCompliant = false
            print "[NO LINK] " identifier(o) "\\n"
        }
        
        // Vérification 3 : Priority
        if (o."Priority" == "") {
            isCompliant = false
            print "[NO PRIORITY] " identifier(o) "\\n"
        }
        
        if (isCompliant) compliant++
    }
}

print "\\n=== RÉSULTAT AUDIT ===\\n"
print "Conformes : " compliant "/" total
print " (" (compliant*100/total) "%)\\n"
\`\`\`

#### TP 4 : Export automatisé

1. Écrivez un script DXL qui exporte le module en CSV
2. Incluez : ID, Texte, Status, Priority, nombre de liens
3. Exécutez et vérifiez le fichier CSV généré
4. Importez dans Excel et créez un graphique de répartition par Status

#### TP 5 : Template de module

1. Créez un module template avec :
   - Structure standard (Introduction, Scope, Requirements, etc.)
   - Attributs pré-configurés
   - Vues par défaut
2. Créez un nouveau module basé sur ce template
3. Vérifiez que la structure est correctement héritée`,

      keyPoints: JSON.stringify([
        'Sécurité par groupes avec niveaux : None, Read, Modify, Create, Delete, Admin',
        'Les baselines figent une version du module pour audit et comparaison',
        'DXL est un langage C-like pour automatiser les opérations dans DOORS',
        'Scripts DXL courants : export CSV, statistiques, audit qualité, vérification liens',
        'OSLC et ReqIF permettent l\'interopérabilité avec d\'autres outils ALM',
        'Les templates standardisent la création de nouveaux modules'
      ]) },


    // ==================== CLEARCASE ====================
    { id: 'cc-01', courseId: 'clearcase', title: 'Introduction à ClearCase', duration: '3h30', orderIndex: 1,
      theoryContent: `## Introduction à IBM Rational ClearCase

### Qu'est-ce que ClearCase ?

IBM Rational ClearCase est un système de **gestion de configuration logicielle** (Software Configuration Management - SCM) conçu pour les projets d'envergure enterprise. Développé depuis les années 1990, il est utilisé dans les grandes organisations (aéronautique, défense, télécommunications, finance) pour gérer le code source et tous les artefacts de développement.

### ClearCase vs Git : deux philosophies

| Aspect | ClearCase | Git |
|--------|-----------|-----|
| Architecture | Centralisée (client-serveur) | Distribuée (chaque clone est complet) |
| Unité de version | Fichier/répertoire individuel | Commit (snapshot du projet) |
| Branches | Par élément (file-level) | Par repository (project-level) |
| Stockage | VOB (Versioned Object Base) | .git directory |
| Vues | Dynamiques ou Snapshot | Working directory |
| Taille | Conçu pour des millions de fichiers | Limité par la taille du repo |
| Accès réseau | Requis (dynamique) ou optionnel (snapshot) | Local puis push/pull |
| Coût | Licence commerciale élevée | Gratuit (open source) |

### Architecture de ClearCase

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    SERVEURS                               │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐   │
│  │ VOB      │  │ View     │  │ License              │   │
│  │ Server   │  │ Server   │  │ Server               │   │
│  │          │  │          │  │                      │   │
│  │ Stocke   │  │ Gère les │  │ Gère les licences    │   │
│  │ versions │  │ vues     │  │ utilisateur          │   │
│  └──────────┘  └──────────┘  └──────────────────────┘   │
│       │              │                                   │
└───────┼──────────────┼───────────────────────────────────┘
        │              │
┌───────┼──────────────┼───────────────────────────────────┐
│       ▼              ▼          CLIENTS                   │
│  ┌─────────────────────────────────────────────────┐     │
│  │           Vue Dynamique ou Snapshot              │     │
│  │  /view/my_view/vobs/project/src/main.c          │     │
│  │           ↕ Config Spec (règles de sélection)   │     │
│  └─────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────┘
\`\`\`

### Concepts fondamentaux

#### 1. VOB (Versioned Object Base)

Le VOB est le **dépôt central** qui stocke toutes les versions de tous les fichiers :
- Chaque fichier a un historique complet de versions
- Chaque répertoire est aussi versionné (ajout/suppression de fichiers)
- Les métadonnées (labels, branches, attributs) sont stockées dans le VOB
- Un projet peut être réparti sur plusieurs VOBs

#### 2. Éléments et versions

\`\`\`
Élément : main.c (le fichier conceptuel)
├── Version 1 : /main/1 (version initiale)
├── Version 2 : /main/2 (correction bug)
├── Version 3 : /main/3 (nouvelle feature)
├── Branche : /main/feature_x/1
├── Branche : /main/feature_x/2
└── Branche : /main/bugfix/1
\`\`\`

Chaque version est identifiée par son **extended pathname** :
\`\`\`
main.c@@/main/feature_x/2
\`\`\`

#### 3. Vues (Views)

Une vue est un **espace de travail** qui sélectionne une version spécifique de chaque fichier :

**Vue dynamique** :
- Montée comme un système de fichiers réseau (NFS/CIFS)
- Les fichiers sont lus en temps réel depuis le VOB
- Pas de copie locale (tout passe par le réseau)
- Changement instantané en modifiant la Config Spec
- Nécessite une connexion réseau permanente

**Vue snapshot** :
- Copie locale des fichiers sélectionnés
- Similaire à un checkout SVN ou git clone
- Fonctionne hors ligne
- Nécessite un "update" pour synchroniser

#### 4. Config Spec (Configuration Specification)

La Config Spec est un ensemble de **règles** qui déterminent quelle version de chaque fichier est visible dans la vue :

\`\`\`
# Config Spec : vue de développement sur la branche main
element * CHECKEDOUT
element * /main/LATEST

# Config Spec : vue sur une branche feature
element * CHECKEDOUT
element * .../feature_auth/LATEST
element * /main/LATEST

# Config Spec : vue figée sur un label (baseline)
element * RELEASE_2.0
element * /main/LATEST

# Config Spec : vue avec date (time-based)
element * /main/LATEST -time 15-Jan-2024.18:00
\`\`\`

#### 5. Checkout / Checkin

Contrairement à Git, ClearCase utilise un modèle de **verrouillage explicite** :

\`\`\`bash
# Checkout : réserver le fichier pour modification
cleartool checkout -comment "Fix bug #123" main.c
# Le fichier est maintenant modifiable (et possiblement verrouillé pour les autres)

# Modifier le fichier
vim main.c

# Checkin : créer une nouvelle version
cleartool checkin -comment "Fixed null pointer in main()" main.c
# Crée la version /main/4
\`\`\`

Modes de checkout :
- **Reserved** : vous seul pouvez modifier (verrou exclusif)
- **Unreserved** : d'autres peuvent aussi checkout (merge nécessaire au checkin)

#### 6. Labels (étiquettes)

Les labels marquent un ensemble cohérent de versions (équivalent d'un tag Git) :

\`\`\`bash
# Créer un type de label
cleartool mklbtype -comment "Release 2.0" RELEASE_2.0

# Appliquer le label à toutes les versions de la vue
cleartool mklabel -recurse RELEASE_2.0 /vobs/project/

# Voir les labels d'un fichier
cleartool lshistory -graphical main.c
\`\`\`

### Cas d'usage typiques

1. **Grandes équipes (100+ développeurs)** : ClearCase gère bien la scalabilité
2. **Projets réglementés** : traçabilité complète de chaque modification
3. **Monorepos gigantesques** : millions de fichiers dans un seul VOB
4. **Build reproductibles** : la Config Spec garantit l'exacte reproduction
5. **Environnements multi-sites** : réplication de VOBs entre sites géographiques`,

      practiceContent: `### Travaux Pratiques : Prise en main de ClearCase

#### Prérequis
- Accès à un serveur ClearCase configuré
- Client ClearCase installé (cleartool en ligne de commande)
- Un VOB de test accessible

#### Étape 1 : Vérifier l'installation

\`\`\`bash
# Vérifier la version de ClearCase
cleartool -version

# Lister les VOBs disponibles
cleartool lsvob

# Lister vos vues existantes
cleartool lsview -me
\`\`\`

#### Étape 2 : Créer une vue dynamique

\`\`\`bash
# Créer une vue dynamique
cleartool mkview -tag my_dev_view \\
  -stgloc auto \\
  -comment "Vue de développement formation"

# Configurer la vue (accéder à la vue)
cleartool setview my_dev_view

# Vérifier la config spec actuelle
cleartool catcs

# Modifier la config spec
cleartool setcs -tag my_dev_view << EOF
element * CHECKEDOUT
element * /main/LATEST
EOF
\`\`\`

#### Étape 3 : Opérations de base

\`\`\`bash
# Naviguer dans le VOB
cd /vobs/formation_vob/src

# Lister les fichiers avec leurs versions
cleartool ls -long

# Voir l'historique d'un fichier
cleartool lshistory main.c

# Checkout (réserver pour modification)
cleartool checkout -reserved -comment "TP Formation" main.c

# Modifier le fichier
echo "// Modification TP" >> main.c

# Voir les différences
cleartool diff -predecessor main.c

# Checkin (valider la modification)
cleartool checkin -comment "Ajout commentaire TP" main.c
\`\`\`

#### Étape 4 : Créer une branche

\`\`\`bash
# Créer un type de branche
cleartool mkbrtype -comment "Branche pour feature login" feature_login

# Modifier la config spec pour travailler sur la branche
cleartool setcs << EOF
element * CHECKEDOUT
element * .../feature_login/LATEST
element * /main/LATEST -mkbranch feature_login
EOF

# Maintenant chaque checkout créera la branche automatiquement
cleartool checkout -comment "Feature login" auth.c
# Modifiez auth.c...
cleartool checkin -comment "Implémentation login" auth.c
# Crée la version auth.c@@/main/feature_login/1
\`\`\`

#### Étape 5 : Appliquer un label

\`\`\`bash
# Créer le type de label
cleartool mklbtype -comment "Version TP complété" TP_DONE_V1

# Appliquer à tous les fichiers de la vue
cleartool mklabel -recurse TP_DONE_V1 .

# Vérifier
cleartool find . -version "lbtype(TP_DONE_V1)" -print
\`\`\`

#### Étape 6 : Créer une vue snapshot

\`\`\`bash
# Créer une vue snapshot (copie locale)
cleartool mkview -snapshot -tag my_snapshot_view \\
  -vws /home/user/.ccviews/my_snapshot_view.vws \\
  /home/user/workspaces/my_snapshot

# Charger les fichiers
cd /home/user/workspaces/my_snapshot
cleartool setcs -default
cleartool update .
\`\`\`

#### Questions de vérification
- Quelle est la différence entre vue dynamique et snapshot ?
- Quel est le chemin complet (extended pathname) de votre dernière version ?
- Le label TP_DONE_V1 est-il visible dans l'historique ?`,

      keyPoints: JSON.stringify([
        'ClearCase est un SCM centralisé à versionnement par fichier (pas par commit)',
        'VOB = dépôt central, View = espace de travail, Config Spec = règles de sélection',
        'Vues dynamiques (réseau, temps réel) vs Snapshot (copie locale, hors-ligne)',
        'Checkout/Checkin avec réservation (Reserved = verrou exclusif)',
        'Labels = équivalent des tags Git, appliqués à un ensemble de versions',
        'Config Spec permet de voir n\'importe quelle combinaison de versions (branche, label, date)'
      ]) },


    { id: 'cc-02', courseId: 'clearcase', title: 'UCM et branches', duration: '5h', orderIndex: 2,
      theoryContent: `## UCM (Unified Change Management) et stratégies de branches

### Qu'est-ce que UCM ?

UCM (Unified Change Management) est une **surcouche méthodologique** de ClearCase qui simplifie la gestion de configuration en imposant un workflow standardisé. UCM combine ClearCase (gestion des fichiers) avec ClearQuest (suivi des activités/changements).

### Base ClearCase vs UCM

| Aspect | Base ClearCase | UCM |
|--------|---------------|-----|
| Workflow | Libre (vous définissez tout) | Standardisé (activités, streams) |
| Branches | Créées manuellement | Gérées automatiquement (streams) |
| Config Spec | Écrite manuellement | Générée automatiquement |
| Traçabilité | Labels manuels | Activités et changesets |
| Merge | Manuel (findmerge) | Semi-automatique (deliver/rebase) |
| Complexité | Haute (flexible) | Moyenne (guidé) |

### Concepts UCM

#### 1. Project

Le projet UCM définit :
- Les VOBs utilisés
- Le stream d'intégration
- Les politiques de développement

#### 2. Streams (flux)

Un stream est un **contexte de développement** qui remplace les branches manuelles :

\`\`\`
Project: MyApplication
│
├── Integration Stream (stream principal)
│   ├── Baseline BL_1.0
│   ├── Baseline BL_1.1
│   └── Baseline BL_2.0 (current)
│
├── Dev Stream: dev_alice (stream de développement)
│   └── Fondé sur BL_2.0
│
├── Dev Stream: dev_bob
│   └── Fondé sur BL_2.0
│
└── Dev Stream: dev_charlie
    └── Fondé sur BL_1.1 (en retard !)
\`\`\`

#### 3. Activities (activités)

Une activité UCM regroupe tous les changements liés à une même tâche :

\`\`\`
Activity: "Implement user authentication"
├── Changes:
│   ├── auth.c@@/main/dev_alice/1 → /main/dev_alice/2
│   ├── auth.h@@/main/dev_alice/0 → /main/dev_alice/1 (nouveau fichier)
│   ├── login.c@@/main/dev_alice/1 → /main/dev_alice/2
│   └── Makefile@@/main/dev_alice/1 → /main/dev_alice/2
├── Status: Completed
└── ClearQuest Record: CR-456
\`\`\`

#### 4. Baselines

En UCM, une baseline est un **point de stabilité** sur le stream d'intégration :
- Marquée après les tests d'intégration
- Sert de fondation pour les streams de développement
- Niveaux de promotion : Initial → Built → Tested → Released

#### 5. Deliver et Rebase

Les deux opérations fondamentales d'UCM :

**Deliver** : pousser vos changements vers le stream d'intégration
\`\`\`
Dev Stream (dev_alice) ──deliver──→ Integration Stream
         │                                  │
    Vos activités                    Reçoit vos changements
    complétées                       (merge si nécessaire)
\`\`\`

**Rebase** : récupérer les derniers changements du stream d'intégration
\`\`\`
Integration Stream ──rebase──→ Dev Stream (dev_alice)
         │                           │
    Nouvelles baselines         Met à jour votre fondation
    (changements des autres)    (merge si nécessaire)
\`\`\`

### Stratégies de branches en Base ClearCase

#### Modèle Mainline

\`\`\`
/main ─────────────────────────────────────────
   │         │              │           │
   ├── /feature_A/    ├── /feature_B/  ├── /bugfix_123/
   │   1, 2, 3        │   1, 2        │   1
   │   (merge back)   │   (merge)     │   (merge)
   ▼                   ▼              ▼
\`\`\`

#### Modèle Release Branches

\`\`\`
/main ───────────────────────────────────────────
   │              │                │
   ├── /rel_1.0/  ├── /rel_2.0/   ├── /rel_3.0/
   │   (maintenance) │  (maintenance) │
   │   hotfix_1      │               │
   │   hotfix_2      │               │
\`\`\`

### Merge dans ClearCase

Le merge dans ClearCase est **par fichier** (pas par commit comme Git) :

\`\`\`bash
# Merge automatique (trivial merge)
cleartool findmerge . -fversion .../feature_login/LATEST -merge

# Merge avec résolution de conflits
cleartool findmerge main.c -fversion .../feature_login/LATEST -graphical
# Ouvre l'outil graphique de merge (xcleardiff)

# Merge d'un seul fichier
cleartool merge -to main.c -version /main/feature_login/3
\`\`\`

#### Types de merge

| Type | Description | Commande |
|------|-------------|----------|
| Trivial | Pas de conflit, une seule branche a modifié | Automatique |
| Non-trivial | Les deux branches ont modifié | Manuel (outil graphique) |
| Copy merge | Prendre une version telle quelle | -type copy |

### Triggers (déclencheurs)

Les triggers sont des **scripts exécutés automatiquement** lors d'opérations ClearCase :

\`\`\`bash
# Créer un trigger qui vérifie le commentaire au checkin
cleartool mktrtype -element -all \\
  -preop checkin \\
  -exec "/scripts/check_comment.sh" \\
  -comment "Vérifie que le commentaire de checkin n'est pas vide" \\
  check_comment_trigger

# Script /scripts/check_comment.sh :
#!/bin/bash
if [ -z "$CLEARCASE_COMMENT" ]; then
    echo "ERREUR: Le commentaire est obligatoire"
    exit 1
fi
# Vérifier le format (ex: ticket Jira)
if ! echo "$CLEARCASE_COMMENT" | grep -qE "^[A-Z]+-[0-9]+"; then
    echo "ERREUR: Le commentaire doit commencer par un numéro de ticket (ex: PROJ-123)"
    exit 1
fi
exit 0
\`\`\`

Types de triggers :
- **pre-op** : avant l'opération (peut l'annuler)
- **post-op** : après l'opération (notification, log)

Opérations déclenchables : checkout, checkin, mkelem, rmelem, mklabel, mkbranch, etc.

### Multi-site avec ClearCase

ClearCase MultiSite permet la **réplication de VOBs** entre sites géographiques :

\`\`\`
Site Paris                    Site New York
┌──────────┐                  ┌──────────┐
│ VOB_main │ ←── sync ──→    │ VOB_main │
│ (master) │    (toutes les   │ (replica)│
└──────────┘    30 minutes)   └──────────┘
\`\`\`

- Chaque site a un **mastership** sur certaines branches
- Les modifications sont répliquées via des **packets** (sync périodique)
- Pas de modification simultanée de la même branche sur deux sites`,

      practiceContent: `### Travaux Pratiques : UCM et branches

#### TP 1 : Créer un projet UCM

\`\`\`bash
# Créer un PVOB (Project VOB) pour UCM
cleartool mkvob -ucmproject -tag /vobs/formation_pvob \\
  -stgloc auto \\
  -comment "PVOB Formation"

# Créer un projet UCM
cleartool mkproject -in /vobs/formation_pvob \\
  -comment "Projet Formation UCM" \\
  -model SIMPLE \\
  formation_project@/vobs/formation_pvob

# Créer le stream d'intégration
cleartool mkstream -in formation_project@/vobs/formation_pvob \\
  -integration \\
  -comment "Stream d'intégration" \\
  formation_int@/vobs/formation_pvob
\`\`\`

#### TP 2 : Workflow UCM complet

\`\`\`bash
# 1. Créer un stream de développement
cleartool mkstream -in formation_project@/vobs/formation_pvob \\
  -baseline BL_INITIAL@/vobs/formation_pvob \\
  -comment "Stream développement TP" \\
  dev_tp@/vobs/formation_pvob

# 2. Créer une vue sur le stream de dev
cleartool mkview -tag dev_tp_view -stream dev_tp@/vobs/formation_pvob \\
  -stgloc auto

# 3. Travailler dans la vue
cleartool setview dev_tp_view
cd /vobs/formation_vob/src

# 4. Créer une activité
cleartool mkactivity -comment "Implémentation feature login" feature_login

# 5. Faire des modifications
cleartool checkout -activity feature_login -comment "Login" auth.c
# ... modifier auth.c ...
cleartool checkin -comment "Login implémenté" auth.c

# 6. Compléter l'activité
cleartool chactivity -complete feature_login

# 7. Deliver vers l'intégration
cleartool deliver -stream dev_tp@/vobs/formation_pvob \\
  -target formation_int@/vobs/formation_pvob \\
  -complete
\`\`\`

#### TP 3 : Rebase (mise à jour depuis l'intégration)

\`\`\`bash
# Vérifier les baselines disponibles
cleartool lsbl -stream formation_int@/vobs/formation_pvob

# Rebase vers la dernière baseline
cleartool rebase -stream dev_tp@/vobs/formation_pvob \\
  -baseline BL_2.0@/vobs/formation_pvob \\
  -complete

# Résoudre les conflits si nécessaire
cleartool findmerge . -fver .../formation_int/LATEST -merge
\`\`\`

#### TP 4 : Créer un trigger

\`\`\`bash
# Créer un script de validation
cat > /scripts/validate_checkin.sh << 'EOF'
#!/bin/bash
# Vérifier que le commentaire contient un ID d'activité
if [ -z "$CLEARCASE_COMMENT" ]; then
    echo "ERREUR: Commentaire obligatoire"
    exit 1
fi
echo "Checkin validé: $CLEARCASE_PN"
exit 0
EOF
chmod +x /scripts/validate_checkin.sh

# Créer le trigger
cleartool mktrtype -element -all \\
  -preop checkin \\
  -exec "/scripts/validate_checkin.sh" \\
  -comment "Validation commentaire" \\
  validate_checkin@/vobs/formation_vob

# Tester : essayer un checkin sans commentaire
cleartool checkout main.c
cleartool checkin main.c  # Devrait échouer !
cleartool checkin -comment "Fix: PROJ-123 correction bug" main.c  # OK
\`\`\`

#### TP 5 : Merge entre branches

\`\`\`bash
# Créer deux branches avec des modifications
# Sur branche feature_A : modifier fichier1.c
# Sur branche feature_B : modifier fichier1.c (même fichier !)

# Merger feature_A vers main
cleartool findmerge . -fversion .../feature_A/LATEST -merge -log merge.log

# Merger feature_B vers main (conflit probable sur fichier1.c)
cleartool findmerge . -fversion .../feature_B/LATEST -graphical
# Résoudre le conflit avec l'outil xcleardiff
\`\`\``,

      keyPoints: JSON.stringify([
        'UCM simplifie ClearCase avec un workflow standardisé (streams, activités, deliver/rebase)',
        'Streams remplacent les branches manuelles, activités groupent les changements liés',
        'Deliver = pousser vers l\'intégration, Rebase = récupérer les mises à jour',
        'Le merge ClearCase est par fichier, pas par commit (findmerge, xcleardiff)',
        'Les triggers automatisent les validations (commentaire, format, tests)',
        'MultiSite réplique les VOBs entre sites géographiques avec mastership par branche'
      ]) },


    { id: 'cc-03', courseId: 'clearcase', title: 'Migration vers Git', duration: '5h30', orderIndex: 3,
      theoryContent: `## Migration de ClearCase vers Git

### Pourquoi migrer ?

De nombreuses organisations migrent de ClearCase vers Git pour plusieurs raisons :

| Motivation | Détail |
|-----------|--------|
| Coût | Licences ClearCase très élevées vs Git gratuit |
| Talent | Les nouveaux développeurs connaissent Git, pas ClearCase |
| Performance | Git est beaucoup plus rapide (opérations locales) |
| Écosystème | GitHub, GitLab, outils modernes CI/CD |
| Agilité | Git facilite les workflows agiles (feature branches, PRs) |
| Cloud | Git est cloud-native, ClearCase est on-premise |
| Maintenance | Infrastructure ClearCase complexe (VOB servers, view servers) |

### Défis de la migration

La migration n'est pas triviale car les modèles sont fondamentalement différents :

#### 1. Versionnement par fichier vs par commit
ClearCase version chaque fichier indépendamment. Git crée des snapshots atomiques du projet entier. Il faut **reconstruire des commits** à partir des versions individuelles.

#### 2. Historique des branches
ClearCase peut avoir des milliers de branches par fichier. Migrer tout l'historique peut être très long et produire un repo Git énorme.

#### 3. Vues dynamiques
Les vues dynamiques n'ont pas d'équivalent Git. Les développeurs doivent s'adapter à un workflow local.

#### 4. Fichiers binaires volumineux
ClearCase gère bien les gros binaires. Git nécessite Git LFS pour les fichiers volumineux.

#### 5. Permissions granulaires
ClearCase permet des ACL par fichier/répertoire. Git n'a pas d'équivalent natif (solutions : CODEOWNERS, branch protection, server-side hooks).

### Stratégies de migration

#### Stratégie 1 : Big Bang
- Migrer tout en une fois
- Avantage : simple, propre
- Inconvénient : risqué pour les gros projets

#### Stratégie 2 : Parallèle (bridge)
- ClearCase et Git coexistent pendant une période de transition
- Un pont (bridge) synchronise les deux
- Avantage : migration progressive, moins risquée
- Inconvénient : complexité de maintenir deux systèmes

#### Stratégie 3 : Par composant
- Migrer les composants un par un
- Commencer par les moins critiques
- Avantage : apprentissage progressif, risque limité
- Inconvénient : plus long, interfaces entre les deux systèmes

### Outils de migration

#### git-cc (ClearCase to Git bridge)
\`\`\`bash
# Installation
pip install git-cc

# Configuration
git cc init --clearcase /vobs/project --branch main

# Migration de l'historique
git cc migrate --since "01-Jan-2020" --branch main

# Migration incrémentale (synchronisation)
git cc pull  # ClearCase → Git
git cc push  # Git → ClearCase
\`\`\`

#### cleartool + scripts custom

Approche manuelle mais contrôlée :

\`\`\`bash
#!/bin/bash
# Script de migration : extraire l'historique d'un VOB vers Git

VOB_PATH="/vobs/project"
GIT_REPO="/tmp/migrated_project"
BRANCH="main"

# Initialiser le repo Git
mkdir -p $GIT_REPO && cd $GIT_REPO
git init

# Pour chaque baseline (point de référence)
for baseline in $(cleartool lsbl -stream project_int@/vobs/pvob -fmt "%n\\n"); do
    echo "Processing baseline: $baseline"
    
    # Configurer une vue sur cette baseline
    cleartool setcs -tag migration_view << EOF
element * $baseline
element * /main/LATEST
EOF
    
    # Copier les fichiers
    rsync -av --exclude='.@@' /view/migration_view$VOB_PATH/ $GIT_REPO/
    
    # Récupérer la date et l'auteur
    DATE=$(cleartool lsbl -fmt "%d" $baseline@/vobs/pvob)
    AUTHOR=$(cleartool lsbl -fmt "%u" $baseline@/vobs/pvob)
    
    # Commit Git
    git add -A
    git commit --date="$DATE" --author="$AUTHOR <$AUTHOR@company.com>" \\
      -m "Baseline: $baseline"
    
    # Tag
    git tag "$baseline"
done
\`\`\`

#### Migration avec préservation de l'historique complet

\`\`\`python
#!/usr/bin/env python3
"""
Script de migration ClearCase → Git avec historique
Reconstruit les commits à partir des events ClearCase
"""
import subprocess
import json
from datetime import datetime

def get_clearcase_history(vob_path, since_date):
    """Récupère l'historique des checkins"""
    cmd = f'cleartool lshistory -recurse -since {since_date} ' \\
          f'-fmt "%u|%d|%n|%o|%Nc\\n" {vob_path}'
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    
    events = []
    for line in result.stdout.strip().split('\\n'):
        parts = line.split('|')
        if len(parts) >= 5:
            events.append({
                'user': parts[0],
                'date': parts[1],
                'element': parts[2],
                'operation': parts[3],
                'comment': parts[4]
            })
    return events

def group_by_activity(events):
    """Regroupe les events par activité (= futur commit)"""
    # Logique de regroupement par proximité temporelle et utilisateur
    # ...
    pass

def create_git_commits(grouped_events, git_repo):
    """Crée les commits Git à partir des groupes"""
    for group in grouped_events:
        # Checkout les bonnes versions
        # git add les fichiers modifiés
        # git commit avec date et auteur originaux
        pass
\`\`\`

### Mapping des concepts

| ClearCase | Git | Notes |
|-----------|-----|-------|
| VOB | Repository | Un VOB = un repo (ou plusieurs) |
| View | Working directory | Plus besoin de serveur de vues |
| Config Spec | .gitconfig / checkout | Pas d'équivalent direct |
| Label | Tag | Tag annoté recommandé |
| Branch (file-level) | Branch (repo-level) | Changement conceptuel majeur |
| Checkout/Checkin | Stage/Commit | Pas de verrouillage en Git |
| UCM Activity | Commit ou PR | Un commit = un changement atomique |
| UCM Deliver | Merge/Pull Request | Code review possible avec PR |
| UCM Rebase | git pull / git rebase | Récupérer les changements upstream |
| Trigger | Git hook | pre-commit, pre-push, server-side |
| MultiSite | Remote (origin) | Push/Pull natif |

### Plan de migration type

\`\`\`
Phase 1 - Préparation (2-4 semaines)
├── Audit du VOB : taille, nombre de fichiers, branches actives
├── Choix de la stratégie (big bang, parallèle, par composant)
├── Choix de l'hébergement Git (GitLab, GitHub, Bitbucket)
├── Formation des équipes à Git
└── Mise en place de l'infrastructure Git

Phase 2 - Migration pilote (2-4 semaines)
├── Migrer un composant non-critique
├── Valider le workflow Git avec l'équipe
├── Ajuster les outils CI/CD
└── Documenter les différences de workflow

Phase 3 - Migration principale (4-8 semaines)
├── Migration composant par composant
├── Validation de chaque migration (build, tests)
├── Période de gel ClearCase → Git uniquement
└── Support intensif aux équipes

Phase 4 - Décommissionnement (2-4 semaines)
├── Archivage des VOBs (lecture seule)
├── Suppression des vues
├── Arrêt des serveurs ClearCase
└── Documentation finale
\`\`\`

### Bonnes pratiques post-migration

1. **Git LFS** pour les fichiers binaires (remplace le stockage VOB)
2. **Branch protection** pour remplacer les triggers de validation
3. **CODEOWNERS** pour les permissions par répertoire
4. **Conventional commits** pour remplacer les commentaires structurés
5. **CI/CD pipelines** pour remplacer les triggers post-checkin
6. **Mono-repo vs multi-repo** : décision architecturale importante`,

      practiceContent: `### Travaux Pratiques : Migration ClearCase vers Git

#### TP 1 : Audit d'un VOB avant migration

\`\`\`bash
# Compter le nombre de fichiers
cleartool find /vobs/project -type f -print | wc -l

# Compter les branches actives
cleartool lstype -kind brtype -short /vobs/project | wc -l

# Identifier les gros fichiers binaires (candidats Git LFS)
cleartool find /vobs/project -type f -name "*.dll" -o -name "*.exe" \\
  -o -name "*.lib" -o -name "*.zip" -print

# Lister les labels (futurs tags Git)
cleartool lstype -kind lbtype -short /vobs/project

# Taille totale du VOB
cleartool space -vob /vobs/project
\`\`\`

#### TP 2 : Extraire un snapshot pour migration

\`\`\`bash
# Créer le repo Git cible
mkdir /tmp/migrated && cd /tmp/migrated
git init

# Extraire l'état actuel de la branche main
cleartool setcs -tag export_view << EOF
element * /main/LATEST
EOF

# Copier (en excluant les métadonnées ClearCase)
rsync -av --exclude='*.contrib' --exclude='.@@' \\
  /view/export_view/vobs/project/ /tmp/migrated/

# Premier commit
git add -A
git commit -m "Initial migration from ClearCase /main/LATEST"
\`\`\`

#### TP 3 : Configurer Git LFS pour les binaires

\`\`\`bash
# Installer Git LFS
git lfs install

# Identifier les fichiers binaires
find . -name "*.dll" -o -name "*.exe" -o -name "*.so" -o -name "*.jar"

# Configurer le tracking LFS
git lfs track "*.dll"
git lfs track "*.exe"
git lfs track "*.so"
git lfs track "*.jar"
git lfs track "*.zip"

# Commiter la configuration
git add .gitattributes
git commit -m "Configure Git LFS for binary files"
\`\`\`

#### TP 4 : Mapper les labels vers des tags Git

\`\`\`bash
# Pour chaque label important, créer un tag Git
for label in RELEASE_1.0 RELEASE_1.1 RELEASE_2.0; do
    echo "Processing label: $label"
    
    # Extraire la version labelisée
    cleartool setcs -tag export_view << EOF
element * $label
element * /main/LATEST
EOF
    
    rsync -av --delete --exclude='.@@' \\
      /view/export_view/vobs/project/ /tmp/migrated/
    
    git add -A
    git commit -m "Label: $label" --allow-empty
    git tag -a "$label" -m "Migrated from ClearCase label $label"
done
\`\`\`

#### TP 5 : Configurer les hooks Git (remplacement des triggers)

\`\`\`bash
# pre-commit hook : vérifier le format du message
cat > .git/hooks/commit-msg << 'EOF'
#!/bin/bash
# Équivalent du trigger ClearCase check_comment
MSG=$(cat "$1")
if ! echo "$MSG" | grep -qE "^(feat|fix|docs|refactor|test)(\(.+\))?: .+"; then
    echo "ERREUR: Message non conforme au format Conventional Commits"
    echo "Format attendu: type(scope): description"
    echo "Exemple: feat(auth): implement user login"
    exit 1
fi
EOF
chmod +x .git/hooks/commit-msg

# Tester
git commit -m "bad message"  # Devrait échouer
git commit -m "feat(auth): implement login"  # Devrait passer
\`\`\`

#### Questions de vérification
- Combien de fichiers ont été migrés ?
- Les tags Git correspondent-ils aux labels ClearCase ?
- Git LFS est-il correctement configuré pour les binaires ?
- Le hook commit-msg fonctionne-t-il ?`,

      keyPoints: JSON.stringify([
        'Migration motivée par le coût, la performance, l\'écosystème moderne et le recrutement',
        'Défi principal : versionnement par fichier (CC) vs par commit (Git)',
        'Trois stratégies : Big Bang, Parallèle (bridge), Par composant',
        'Git LFS remplace le stockage natif des binaires du VOB',
        'Les triggers ClearCase sont remplacés par des Git hooks et la CI/CD',
        'Plan type : Préparation → Pilote → Migration principale → Décommissionnement'
      ]) },


    // ==================== KLOCWORK ====================
    { id: 'kw-01', courseId: 'klocwork', title: 'Introduction à Klocwork', duration: '2h30', orderIndex: 1,
      theoryContent: `## Klocwork - Analyse statique avancée

### Qu'est-ce que Klocwork ?

Klocwork (aujourd'hui **Perforce Klocwork**) est un outil d'analyse statique de code source conçu pour détecter les défauts de sécurité, de qualité et de fiabilité dans les langages **C, C++, C# et Java**. Il est utilisé dans les industries critiques comme l'aéronautique, l'automobile, le médical et la défense.

### Pourquoi l'analyse statique ?

L'analyse statique examine le code source **sans l'exécuter**. Elle permet de :

- **Détection précoce des bugs** (shift-left testing) : trouver les problèmes avant les tests
- **Identification des vulnérabilités de sécurité** : avant même le déploiement
- **Conformité aux standards** : MISRA, CERT, CWE, OWASP
- **Réduction des coûts** : corriger un bug en phase de codage coûte 30x moins qu'en production
- **Amélioration continue** : métriques et tendances dans le temps

### Analyse statique vs Analyse dynamique

| Critère | Analyse statique | Analyse dynamique |
|---------|-----------------|-------------------|
| Exécution du code | Non | Oui |
| Couverture | Tous les chemins | Chemins exécutés |
| Phase | Développement | Tests |
| Faux positifs | Plus nombreux | Moins nombreux |
| Performance | Rapide | Dépend des tests |
| Exemples | Klocwork, SonarQube | Valgrind, Sanitizers |

### Architecture de Klocwork

L'architecture Klocwork se compose de plusieurs éléments :

\`\`\`
┌─────────────────────────────────────────────────────┐
│                    DÉVELOPPEUR                        │
│  IDE (Eclipse, VS, IntelliJ) + Plugin Klocwork       │
│  → kwcheck : analyse locale incrémentale             │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│                 SERVEUR KLOCWORK                      │
│  kwbuildproject : analyse complète du projet          │
│  Base de données des résultats                       │
│  Dashboard web : visualisation et gestion            │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│              INTÉGRATION CI/CD                        │
│  Jenkins, GitLab CI, Azure DevOps                    │
│  Analyse automatique à chaque commit/merge           │
└─────────────────────────────────────────────────────┘
\`\`\`

### Types de défauts détectés

**Sécurité :**
- Buffer overflow (dépassement de tampon)
- SQL Injection
- Cross-Site Scripting (XSS)
- Path Traversal
- Command Injection
- Use of dangerous functions (gets, strcpy, sprintf)

**Fiabilité :**
- Null pointer dereference (déréférencement de pointeur nul)
- Resource leak (fuite de ressources : mémoire, fichiers, sockets)
- Use after free (utilisation après libération)
- Race condition (conditions de course multi-thread)
- Division par zéro
- Integer overflow

**Qualité :**
- Code mort (unreachable code)
- Variables non initialisées
- Fonctions trop complexes
- Violations de standards de codage
- Code non conforme MISRA

### Klocwork vs autres outils d'analyse statique

| Critère | Klocwork | SonarQube | Coverity | PVS-Studio |
|---------|----------|-----------|----------|------------|
| Langages principaux | C/C++, Java, C# | 30+ langages | C/C++, Java, C# | C/C++, C#, Java |
| Force | Embarqué/critique | Multi-langage | Profondeur analyse | C++ moderne |
| MISRA | Support natif complet | Limité | Support complet | Support partiel |
| Analyse inter-procédurale | Oui (Knowledge Base) | Limitée | Oui | Limitée |
| IDE intégré | Eclipse, VS, IntelliJ | SonarLint | Pas de plugin IDE | VS, CLion |
| Coût | $$$ (licence) | Gratuit (Community) | $$$ (licence) | $$ (licence) |

### Versions et composants

- **kwcheck** : Analyse locale incrémentale sur le poste du développeur
- **kwbuildproject** : Analyse complète du projet sur le serveur
- **kwadmin** : Administration du serveur Klocwork
- **kwinject** : Capture des informations de compilation (build intercept)
- **Klocwork Desktop** : Interface graphique pour développeurs
- **Klocwork Review** : Interface web pour la gestion des résultats
- **Klocwork Insight** : Plugin IDE pour analyse en temps réel`,

      practiceContent: `### Travaux Pratiques : Installation et premier scan

#### Prérequis
- Machine avec au moins 8 Go de RAM
- Compilateur C/C++ installé (GCC, Clang ou MSVC)
- Un projet C/C++ compilable (nous utiliserons un projet exemple)

#### Étape 1 : Installation de Klocwork Desktop

1. Téléchargez Klocwork depuis le portail Perforce
2. Installez le package :
\`\`\`bash
# Linux
chmod +x kw-installer-linux64.sh
./kw-installer-linux64.sh --prefix /opt/klocwork

# Ajoutez au PATH
export PATH=/opt/klocwork/bin:$PATH
\`\`\`

3. Vérifiez l'installation :
\`\`\`bash
kwcheck --version
kwinject --version
kwbuildproject --version
\`\`\`

#### Étape 2 : Préparer un projet exemple

Créez un projet C avec des bugs intentionnels :
\`\`\`c
// example.c - Fichier avec des défauts volontaires
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Bug 1 : Buffer overflow potentiel
void process_input(char *user_input) {
    char buffer[64];
    strcpy(buffer, user_input);  // Pas de vérification de taille !
    printf("Input: %s\\n", buffer);
}

// Bug 2 : Null pointer dereference
int* get_value(int condition) {
    int *ptr = NULL;
    if (condition > 0) {
        ptr = malloc(sizeof(int));
        *ptr = 42;
    }
    return ptr;  // Peut retourner NULL
}

// Bug 3 : Resource leak
void read_file(const char *filename) {
    FILE *f = fopen(filename, "r");
    if (f == NULL) return;
    
    char buf[256];
    fgets(buf, sizeof(buf), f);
    printf("%s", buf);
    // Oubli de fclose(f) → fuite de ressource !
}

// Bug 4 : Integer overflow
int multiply(int a, int b) {
    return a * b;  // Pas de vérification d'overflow !
}

int main(int argc, char *argv[]) {
    if (argc > 1) {
        process_input(argv[1]);
    }
    
    int *val = get_value(0);
    printf("Value: %d\\n", *val);  // Déréférence NULL !
    
    read_file("test.txt");
    
    int result = multiply(2147483647, 2);  // Overflow !
    return 0;
}
\`\`\`

#### Étape 3 : Capturer le build avec kwinject

\`\`\`bash
# Créez un Makefile simple
cat > Makefile << 'EOF'
CC=gcc
CFLAGS=-Wall

all: example

example: example.c
	$(CC) $(CFLAGS) -o example example.c

clean:
	rm -f example
EOF

# Capturez le build
kwinject make all
# Produit un fichier kwinject.out contenant les commandes de compilation
ls -la kwinject.out
\`\`\`

#### Étape 4 : Lancer l'analyse locale

\`\`\`bash
# Créez un projet local kwcheck
kwcheck create --url http://localhost:8080/myproject

# Importez les infos de build
kwcheck import kwinject.out

# Lancez l'analyse
kwcheck run

# Affichez les résultats
kwcheck list

# Résultat attendu :
# ID  File        Line  Checker            Severity  Message
# 1   example.c   8    SV.TAINTED.COPY    Critical  Buffer overflow...
# 2   example.c   21   NPD.FUNC.MIGHT     Error     Null pointer...
# 3   example.c   28   RESOURCE_LEAK      Error     Resource leak...
# 4   example.c   34   INT.OVERFLOW       Warning   Integer overflow...
\`\`\`

#### Étape 5 : Filtrer et trier les résultats

\`\`\`bash
# Filtrer par sévérité
kwcheck list --severity Critical,Error

# Filtrer par type de checker
kwcheck list --checker NPD
kwcheck list --checker "SV.*"

# Afficher les détails d'une issue
kwcheck show 1

# Marquer une issue comme faux positif
kwcheck set-status 4 "Not a Problem" --comment "Vérifié: les inputs sont validés en amont"
\`\`\`

#### Étape 6 : Corriger et re-analyser

1. Corrigez les bugs dans example.c
2. Relancez \`kwinject make all\`
3. Relancez \`kwcheck run\`
4. Vérifiez que les issues sont résolues`,

      keyPoints: JSON.stringify([
        'Klocwork analyse le code C, C++, C# et Java sans l\'exécuter',
        'Détecte buffer overflow, null pointer, resource leak, race conditions, integer overflow',
        'Architecture : kwcheck (local) + kwbuildproject (serveur) + Dashboard web',
        'Conforme aux standards MISRA, CERT, CWE et OWASP',
        'Le shift-left (analyse précoce) réduit les coûts de correction de 30x',
        'kwinject capture les informations de compilation nécessaires à l\'analyse'
      ]) },


    { id: 'kw-02', courseId: 'klocwork', title: 'Configuration et checkers', duration: '3h', orderIndex: 2,
      theoryContent: `## Configuration avancée de Klocwork

### Comprendre les Checkers

Les checkers sont les règles d'analyse de Klocwork. Chaque checker détecte un type spécifique de défaut. Ils sont organisés en **taxonomies** (familles de règles).

### Principales taxonomies

#### 1. C/C++ Critical Issues
Défauts critiques pouvant causer des crashes ou des failles :
- **NPD** (Null Pointer Dereference) : déréférencement d'un pointeur potentiellement nul
- **MLK** (Memory Leak) : fuite de mémoire
- **UFM** (Uninitialized Field in Module) : champ non initialisé
- **ABV** (Array Bounds Violation) : dépassement de tableau
- **NNTS** (Not Null Terminated String) : chaîne non terminée par un null
- **SV** (Security Vulnerability) : vulnérabilités de sécurité diverses
- **RCA** (Resource/Connection Abandoned) : ressource non libérée

#### 2. MISRA C:2012 / MISRA C++:2008
Standards obligatoires dans l'automobile et l'aéronautique :
- **Règles obligatoires (Mandatory)** : doivent être respectées sans exception
- **Règles requises (Required)** : doivent être respectées sauf dérogation documentée
- **Règles conseillées (Advisory)** : recommandées mais non obligatoires
- **Règles décidables** : vérifiables automatiquement par l'outil
- **Règles indécidables** : nécessitent parfois une revue manuelle

Exemples de règles MISRA détectées par Klocwork :
\`\`\`
MISRA.BITS.NOT_UNSIGNED    - Opérations bitwise sur types signés
MISRA.CAST.PTR_TO_INT      - Cast d'un pointeur vers un entier
MISRA.GOTO                 - Utilisation de goto interdite
MISRA.SWITCH.NO_DEFAULT    - Switch sans cas default
MISRA.RETURN.NOT_LAST      - Return qui n'est pas la dernière instruction
MISRA.INIT.BRACES          - Initialisation sans accolades complètes
MISRA.FUNC.PARAMS          - Déclaration de fonction sans prototype
MISRA.DECL.ARRAY_SIZE      - Tableau sans taille explicite
\`\`\`

#### 3. CERT C/C++ Secure Coding
Standards de sécurité du CERT (Carnegie Mellon University) :
- **STR** : Manipulation sécurisée des chaînes de caractères
- **MEM** : Gestion mémoire sécurisée (allocation, libération)
- **INT** : Overflow et conversion sécurisée d'entiers
- **FIO** : Entrées/sorties fichiers sécurisées
- **ENV** : Variables d'environnement (pas de confiance)
- **CON** : Programmation concurrente (race conditions)
- **ERR** : Gestion des erreurs

#### 4. CWE (Common Weakness Enumeration)
Classification internationale des faiblesses logicielles :
- CWE-120 : Buffer Copy without Checking Size of Input
- CWE-476 : Null Pointer Dereference
- CWE-401 : Missing Release of Memory after Effective Lifetime
- CWE-362 : Concurrent Execution using Shared Resource with Improper Synchronization
- CWE-89 : SQL Injection
- CWE-79 : Cross-site Scripting (XSS)
- CWE-22 : Path Traversal

### Configuration des checkers

#### Fichier de configuration .kwlp

Le fichier .kwlp (Klocwork Local Project) permet de configurer les checkers :

\`\`\`
# Activer tous les checkers MISRA obligatoires
+checker=MISRA.REQUIRED.*
+checker=MISRA.MANDATORY.*

# Activer les checkers CERT pour les chaînes et la mémoire
+checker=CERT.STR.*
+checker=CERT.MEM.*
+checker=CERT.INT.*

# Désactiver les checkers de style (trop verbeux)
-checker=STYLE.*
-checker=METRICS.*
-checker=CWARN.*

# Configurer les sévérités personnalisées
severity:MISRA.*=critical
severity:CERT.*=error
severity:CWE.*=error
severity:NPD.*=critical
severity:MLK.*=error

# Exclure certains fichiers de l'analyse
exclude:**/test/**
exclude:**/third_party/**
exclude:**/generated/**
exclude:**/vendor/**

# Inclure uniquement certains répertoires
include:src/**
include:lib/**
\`\`\`

#### Configuration par projet sur le serveur

\`\`\`bash
# Lister tous les checkers disponibles
kwcheck list-checkers

# Lister les checkers par taxonomie
kwcheck list-checkers --taxonomy MISRA
kwcheck list-checkers --taxonomy CERT

# Activer un ensemble de checkers pour un projet serveur
kwadmin set-project-property --url http://kw-server:8080/project \\
  checkers "MISRA.REQUIRED,CERT.STR,CERT.MEM,NPD,MLK,ABV,SV"

# Configurer la sévérité d'un checker
kwadmin set-checker-severity --url http://kw-server:8080/project \\
  MISRA.REQUIRED Critical

# Désactiver un checker spécifique
kwadmin disable-checker --url http://kw-server:8080/project CWARN.NORETURN
\`\`\`

### Analyse incrémentale vs complète

#### kwcheck - Analyse locale incrémentale
- S'exécute sur le poste du développeur
- Analyse uniquement les fichiers modifiés depuis la dernière analyse
- Résultats en quelques secondes à quelques minutes
- Intégration IDE (Eclipse, Visual Studio, IntelliJ IDEA)
- Idéal pour le feedback immédiat pendant le développement

\`\`\`bash
# Analyse des fichiers modifiés uniquement
kwcheck run --incremental

# Analyse d'un fichier spécifique
kwcheck run --file src/main.c

# Analyse avec un profil spécifique
kwcheck run --config misra_profile.kwlp
\`\`\`

#### kwbuildproject - Analyse serveur complète
- S'exécute sur le serveur Klocwork dédié
- Analyse l'intégralité du projet (tous les fichiers)
- Analyse inter-procédurale complète (cross-file analysis)
- Construit et met à jour la Knowledge Base
- Résultats en minutes à heures selon la taille du projet

\`\`\`bash
# Analyse complète du projet sur le serveur
kwbuildproject --url http://kw-server:8080/myproject \\
  --tables-directory /path/to/tables \\
  kwinject.out

# Charger les résultats dans la base serveur
kwadmin load myproject /path/to/tables

# Vérifier le statut
kwadmin list-projects --url http://kw-server:8080
\`\`\`

### La Knowledge Base (KB)

La Knowledge Base est le cœur de l'analyse inter-procédurale de Klocwork. Elle maintient un modèle sémantique du programme :

1. **Flux de données** : comment les données circulent entre les fonctions
2. **Contrats de fonctions** : pré-conditions et post-conditions automatiquement inférées
3. **État des variables** : à chaque point du programme, quelles valeurs sont possibles
4. **Graphe d'appels** : qui appelle quoi, avec quels paramètres
5. **Alias analysis** : quels pointeurs peuvent pointer vers la même mémoire

Exemple d'analyse inter-procédurale :

\`\`\`c
// Fichier a.c
int* create_item(int type) {
    if (type == 0) return NULL;  // KB note : peut retourner NULL
    int *item = malloc(sizeof(int));
    if (!item) return NULL;      // KB note : peut retourner NULL (2ème cas)
    *item = type;
    return item;
}

// Fichier b.c (analysé séparément mais KB connaît les contrats)
void use_item(int type) {
    int *item = create_item(type);
    // KB détecte : NPD.FUNC.MIGHT car create_item peut retourner NULL
    // dans deux cas différents (type==0 ou malloc échoue)
    printf("%d\\n", *item);  // ← BUG détecté !
}
\`\`\`

### Annotations et suppressions

Vous pouvez guider Klocwork avec des annotations dans le code :

\`\`\`c
// Annotation : paramètre ne doit jamais être NULL
void process(/*@non_null@*/ const char *data);

// Annotation : fonction alloue de la mémoire (appelant doit libérer)
/*@allocates@*/ int* create_buffer(size_t size);

// Suppression d'un faux positif spécifique avec justification
void safe_function(int *ptr) {
    // klocwork suppress NPD.FUNC.MIGHT
    // Justification: ptr est vérifié non-null par l'appelant (contrat API)
    ptr->value = 42;
}

// Suppression par pragma (toute la fonction)
#pragma klocwork_suppress NPD.FUNC.MIGHT "Vérifié par design"
void another_function() {
    // ...
}
\`\`\``,

      practiceContent: `### Travaux Pratiques : Configuration avancée

#### TP 1 : Créer un profil MISRA C:2012

1. Créez un fichier de configuration pour un projet automobile :
\`\`\`bash
cat > misra_profile.kwlp << 'EOF'
# Profil MISRA C:2012 pour projet automobile
# Toutes les règles obligatoires et requises
+checker=MISRA.MANDATORY.*
+checker=MISRA.REQUIRED.*
-checker=MISRA.ADVISORY.*

# Sévérités strictes
severity:MISRA.MANDATORY.*=critical
severity:MISRA.REQUIRED.*=error

# Exclure le code tiers et les tests
exclude:**/vendor/**
exclude:**/bsp/**
exclude:**/test/**
exclude:**/mock/**
EOF
\`\`\`

2. Appliquez le profil et lancez l'analyse :
\`\`\`bash
kwcheck import-config misra_profile.kwlp
kwcheck run
kwcheck list --severity Critical,Error
\`\`\`

3. Générez un rapport de conformité :
\`\`\`bash
kwcheck list --format csv --taxonomy MISRA > misra_report.csv
echo "Nombre de violations MISRA :"
wc -l misra_report.csv
\`\`\`

#### TP 2 : Configurer les checkers CERT pour la sécurité

1. Créez un profil CERT :
\`\`\`bash
cat > cert_security.kwlp << 'EOF'
+checker=CERT.STR.*
+checker=CERT.MEM.*
+checker=CERT.INT.*
+checker=CERT.FIO.*
+checker=CERT.ERR.*
+checker=CERT.CON.*
severity:CERT.*=error
EOF
\`\`\`

2. Créez un fichier de test avec des violations CERT intentionnelles :
\`\`\`c
// cert_test.c
#include <string.h>
#include <stdlib.h>
#include <stdio.h>

// Violation CERT.STR31-C : Buffer overflow par strcpy
void bad_string_copy(const char *input) {
    char dest[10];
    strcpy(dest, input);  // Pas de vérification de taille !
}

// Violation CERT.MEM35-C : cast inutile du retour de malloc en C
void bad_allocation() {
    int *p = (int*)malloc(sizeof(int));
    *p = 5;
    // Violation CERT.MEM51-C : memory leak (pas de free)
}

// Violation CERT.FIO42-C : fermeture de fichier manquante
void bad_file_handling(const char *filename) {
    FILE *f = fopen(filename, "r");
    char buf[100];
    fgets(buf, sizeof(buf), f);
    printf("%s", buf);
    // f n'est jamais fermé !
}

// Violation CERT.INT32-C : integer overflow
int bad_multiply(int a, int b) {
    return a * b;  // Pas de vérification avant multiplication
}
\`\`\`

3. Analysez et examinez les résultats :
\`\`\`bash
kwcheck import-config cert_security.kwlp
kwinject gcc -c cert_test.c
kwcheck run
kwcheck list
\`\`\`

#### TP 3 : Annotations et suppression de faux positifs

1. Identifiez un faux positif dans vos résultats
2. Ajoutez l'annotation de suppression appropriée :
\`\`\`c
// Exemple de suppression justifiée
void validated_function(char *ptr) {
    // klocwork suppress NPD.FUNC.MIGHT
    // Justification: ptr est validé par check_params() appelé avant cette fonction
    // Voir architecture doc section 4.2 pour le contrat d'appel
    process(ptr->data);
}
\`\`\`
3. Relancez l'analyse et vérifiez que la suppression fonctionne
4. Documentez la raison dans un fichier de suivi des suppressions

#### TP 4 : Comparer analyse locale vs serveur

1. Lancez kwcheck run (analyse locale incrémentale)
2. Comptez les issues trouvées
3. Lancez kwbuildproject (analyse complète avec Knowledge Base)
4. Comparez les résultats :
   - L'analyse serveur trouve-t-elle plus de bugs inter-procéduraux ?
   - Quels types de bugs supplémentaires sont détectés ?
   - Quelle est la différence de temps d'exécution ?`,

      keyPoints: JSON.stringify([
        'Les checkers sont organisés en taxonomies : MISRA, CERT, CWE, OWASP',
        'MISRA C:2012 est obligatoire dans l\'automobile et l\'aéronautique (ASIL, DAL)',
        'kwcheck (local, rapide, incrémental) vs kwbuildproject (serveur, complet, inter-procédural)',
        'La Knowledge Base permet l\'analyse inter-procédurale entre fichiers et modules',
        'Les annotations (@non_null, suppress) guident l\'analyse et documentent les faux positifs',
        'Fichiers .kwlp pour configurer les checkers activés, sévérités et exclusions'
      ]) },


    { id: 'kw-03', courseId: 'klocwork', title: 'Intégration CI/CD et reporting', duration: '5h30', orderIndex: 3,
      theoryContent: `## Intégration de Klocwork dans les pipelines CI/CD

### Pourquoi intégrer Klocwork dans la CI/CD ?

L'intégration de l'analyse statique dans le pipeline de livraison continue garantit que **chaque modification de code** est automatiquement vérifiée. Cela permet de :

- Bloquer les merges qui introduisent des défauts critiques
- Maintenir un historique des métriques de qualité
- Assurer la conformité continue aux standards (MISRA, CERT)
- Détecter les régressions de qualité immédiatement
- Fournir un feedback rapide aux développeurs

### Architecture CI/CD avec Klocwork

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    PIPELINE CI/CD                             │
│                                                              │
│  ┌──────┐   ┌───────┐   ┌──────────┐   ┌────────────────┐  │
│  │ Git  │──→│ Build │──→│ kwinject │──→│ kwbuildproject │  │
│  │ Push │   │       │   │ (capture)│   │ (analyse)      │  │
│  └──────┘   └───────┘   └──────────┘   └───────┬────────┘  │
│                                                  │           │
│                                        ┌─────────▼────────┐ │
│                                        │  Quality Gate     │ │
│                                        │  Pass / Fail      │ │
│                                        └─────────┬────────┘ │
│                                                  │           │
│                          ┌───────────────────────┼──────┐   │
│                          │                       │      │   │
│                          ▼                       ▼      │   │
│                     Deploy (OK)            Block (FAIL)  │   │
│                                           + Notify      │   │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Intégration avec Jenkins

#### Pipeline Jenkins complet

\`\`\`groovy
pipeline {
    agent any
    
    environment {
        KW_SERVER = 'http://klocwork-server:8080'
        KW_PROJECT = 'my-embedded-project'
        KW_TABLES = "\${WORKSPACE}/kw-tables"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build with kwinject') {
            steps {
                sh '''
                    # Capture les commandes de compilation
                    kwinject --output kwinject.out make all
                '''
            }
        }
        
        stage('Klocwork Analysis') {
            steps {
                sh '''
                    # Analyse complète
                    kwbuildproject --url \${KW_SERVER}/\${KW_PROJECT} \\
                      --tables-directory \${KW_TABLES} \\
                      kwinject.out
                    
                    # Charger les résultats
                    kwadmin --url \${KW_SERVER} load \${KW_PROJECT} \${KW_TABLES}
                '''
            }
        }
        
        stage('Quality Gate') {
            steps {
                script {
                    // Récupérer le nombre d'issues critiques
                    def criticalCount = sh(
                        script: """
                            kwadmin --url \${KW_SERVER} \\
                              list-issues \${KW_PROJECT} \\
                              --severity Critical --status Analyze,Fix \\
                              | wc -l
                        """,
                        returnStdout: true
                    ).trim().toInteger()
                    
                    def errorCount = sh(
                        script: """
                            kwadmin --url \${KW_SERVER} \\
                              list-issues \${KW_PROJECT} \\
                              --severity Error --status Analyze,Fix \\
                              | wc -l
                        """,
                        returnStdout: true
                    ).trim().toInteger()
                    
                    echo "Critical issues: \${criticalCount}"
                    echo "Error issues: \${errorCount}"
                    
                    // Bloquer si des issues critiques existent
                    if (criticalCount > 0) {
                        error "Quality Gate FAILED: \${criticalCount} critical issues found"
                    }
                    
                    // Warning si trop d'errors
                    if (errorCount > 10) {
                        unstable "Quality Gate WARNING: \${errorCount} error issues"
                    }
                }
            }
        }
        
        stage('Deploy') {
            when {
                expression { currentBuild.result != 'FAILURE' }
            }
            steps {
                sh 'make install DESTDIR=staging/'
            }
        }
    }
    
    post {
        always {
            // Archiver le rapport
            archiveArtifacts artifacts: 'kw-tables/**', allowEmptyArchive: true
        }
        failure {
            // Notifier l'équipe
            emailext subject: "Klocwork: Issues critiques détectées",
                body: "Le build \${BUILD_NUMBER} a échoué l'analyse Klocwork",
                to: 'team@company.com'
        }
    }
}
\`\`\`

### Intégration avec GitLab CI

\`\`\`yaml
# .gitlab-ci.yml
variables:
  KW_SERVER: "http://klocwork:8080"
  KW_PROJECT: "embedded-firmware"

stages:
  - build
  - analysis
  - quality-gate
  - deploy

build:
  stage: build
  script:
    - kwinject --output kwinject.out make all
  artifacts:
    paths:
      - kwinject.out
    expire_in: 1 hour

klocwork-analysis:
  stage: analysis
  script:
    - mkdir -p kw-tables
    - kwbuildproject --url $KW_SERVER/$KW_PROJECT
        --tables-directory kw-tables
        kwinject.out
    - kwadmin --url $KW_SERVER load $KW_PROJECT kw-tables
  dependencies:
    - build

quality-gate:
  stage: quality-gate
  script:
    - |
      CRITICAL=$(kwadmin --url $KW_SERVER list-issues $KW_PROJECT \
        --severity Critical --status Analyze,Fix | wc -l)
      echo "Critical issues: $CRITICAL"
      if [ "$CRITICAL" -gt "0" ]; then
        echo "FAILED: $CRITICAL critical issues"
        exit 1
      fi
      echo "Quality Gate PASSED"
  dependencies:
    - klocwork-analysis
\`\`\`

### Analyse différentielle (Differential Analysis)

L'analyse différentielle ne vérifie que les fichiers modifiés dans une Pull Request :

\`\`\`bash
# Identifier les fichiers modifiés
CHANGED_FILES=$(git diff --name-only origin/main...HEAD -- '*.c' '*.h')

# Analyse uniquement ces fichiers
kwcheck run --file-list <(echo "$CHANGED_FILES")

# Obtenir uniquement les nouvelles issues (pas les existantes)
kwcheck list --status New
\`\`\`

### Reporting et métriques

#### Dashboard Klocwork

Le dashboard web de Klocwork fournit :
- **Vue projet** : nombre total d'issues par sévérité et par état
- **Tendances** : évolution dans le temps (graphiques)
- **Densité** : issues par 1000 lignes de code (KLOC)
- **Distribution** : répartition par module/fichier/développeur
- **Conformité** : pourcentage de conformité par standard (MISRA, CERT)

#### Métriques clés à surveiller

| Métrique | Description | Objectif |
|----------|-------------|----------|
| Critical issues | Bugs bloquants/critiques | 0 |
| Issue density | Issues / KLOC | < 5 |
| New issues per build | Nouvelles issues par build | Tendance décroissante |
| Fix rate | Issues corrigées / détectées | > 80% |
| False positive rate | Faux positifs / total | < 15% |
| MISRA compliance | % de règles respectées | > 95% |

#### Export de rapports

\`\`\`bash
# Export CSV pour reporting
kwadmin --url http://kw-server:8080 list-issues myproject \\
  --format csv > report.csv

# Export filtré par sévérité
kwadmin --url http://kw-server:8080 list-issues myproject \\
  --severity Critical,Error --format csv > critical_report.csv

# Export avec détails complets
kwadmin --url http://kw-server:8080 list-issues myproject \\
  --columns "id,file,line,checker,severity,status,owner,message" \\
  --format csv > detailed_report.csv
\`\`\`

### Gestion du cycle de vie des issues

Les issues dans Klocwork suivent un workflow :

\`\`\`
Nouveau (Analyze) → Assigné → Fix → Vérifié (Fixed)
      │                              │
      ├→ Not a Problem (faux positif) │
      ├→ Defer (reporté)              │
      └→ Won't Fix (accepté)          └→ Réouvert (si régression)
\`\`\`

#### API REST pour l'automatisation

\`\`\`bash
# Lister les issues d'un projet via l'API
curl "http://kw-server:8080/api/v1/projects/myproject/issues?severity=Critical" \\
  -H "Authorization: Bearer $KW_TOKEN"

# Mettre à jour le statut d'une issue
curl -X PUT "http://kw-server:8080/api/v1/projects/myproject/issues/42" \\
  -H "Authorization: Bearer $KW_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"status": "Fix", "owner": "developer@company.com"}'
\`\`\``,

      practiceContent: `### Travaux Pratiques : Intégration CI/CD

#### TP 1 : Pipeline Jenkins avec Klocwork

1. Créez un Jenkinsfile dans votre projet :
\`\`\`groovy
pipeline {
    agent any
    stages {
        stage('Build + Capture') {
            steps {
                sh 'kwinject --output kwinject.out make all'
            }
        }
        stage('Analyze') {
            steps {
                sh '''
                    kwbuildproject --url http://localhost:8080/tp-project \\
                      --tables-directory ./kw-tables \\
                      kwinject.out
                    kwadmin --url http://localhost:8080 load tp-project ./kw-tables
                '''
            }
        }
        stage('Gate') {
            steps {
                sh '''
                    ISSUES=$(kwadmin --url http://localhost:8080 \\
                      list-issues tp-project --severity Critical | wc -l)
                    if [ "$ISSUES" -gt "0" ]; then
                        echo "BLOCKED: $ISSUES critical issues"
                        exit 1
                    fi
                '''
            }
        }
    }
}
\`\`\`

2. Exécutez le pipeline et observez le résultat

#### TP 2 : Analyse différentielle sur une PR

\`\`\`bash
# Simuler un workflow de PR
git checkout -b feature/new-module
# Ajouter du code avec des bugs

# Identifier les fichiers modifiés
git diff --name-only main -- '*.c' '*.h' > changed_files.txt

# Analyser uniquement ces fichiers
kwcheck run --file-list changed_files.txt

# Lister uniquement les nouvelles issues
kwcheck list --status New
echo "Nouvelles issues à corriger avant merge :"
kwcheck list --status New --severity Critical,Error
\`\`\`

#### TP 3 : Configurer un Quality Gate

Définissez les critères d'acceptation :
\`\`\`bash
#!/bin/bash
# quality_gate.sh - Script de Quality Gate Klocwork

KW_URL="http://localhost:8080"
PROJECT="tp-project"

# Critères
MAX_CRITICAL=0
MAX_ERROR=5
MAX_DENSITY=10  # issues per KLOC

# Récupérer les métriques
CRITICAL=$(kwadmin --url $KW_URL list-issues $PROJECT --severity Critical --status Analyze,Fix | wc -l)
ERRORS=$(kwadmin --url $KW_URL list-issues $PROJECT --severity Error --status Analyze,Fix | wc -l)

echo "=== Quality Gate Results ==="
echo "Critical issues: $CRITICAL (max: $MAX_CRITICAL)"
echo "Error issues: $ERRORS (max: $MAX_ERROR)"

# Évaluation
PASS=true
if [ "$CRITICAL" -gt "$MAX_CRITICAL" ]; then
    echo "❌ FAIL: Too many critical issues"
    PASS=false
fi
if [ "$ERRORS" -gt "$MAX_ERROR" ]; then
    echo "❌ FAIL: Too many error issues"
    PASS=false
fi

if [ "$PASS" = true ]; then
    echo "✅ Quality Gate PASSED"
    exit 0
else
    echo "❌ Quality Gate FAILED"
    exit 1
fi
\`\`\`

#### TP 4 : Générer un rapport de conformité MISRA

\`\`\`bash
# Exporter le rapport MISRA
kwadmin --url http://localhost:8080 list-issues tp-project \\
  --taxonomy MISRA --format csv > misra_compliance.csv

# Calculer le taux de conformité
TOTAL_RULES=143  # Nombre de règles MISRA C:2012 Required
VIOLATED=$(cut -d',' -f4 misra_compliance.csv | sort -u | wc -l)
COMPLIANCE=$(echo "scale=1; (1 - $VIOLATED/$TOTAL_RULES) * 100" | bc)

echo "Conformité MISRA : \${COMPLIANCE}%"
echo "Règles violées : $VIOLATED / $TOTAL_RULES"
\`\`\`

#### TP 5 : Intégration avec les notifications

\`\`\`bash
# Envoyer une notification Slack après l'analyse
WEBHOOK_URL="https://hooks.slack.com/services/xxx/yyy/zzz"
CRITICAL=$(kwadmin --url http://localhost:8080 list-issues tp-project --severity Critical | wc -l)

curl -X POST $WEBHOOK_URL -H 'Content-Type: application/json' \\
  -d "{
    \"text\": \"Klocwork Analysis Complete\",
    \"blocks\": [{
      \"type\": \"section\",
      \"text\": {
        \"type\": \"mrkdwn\",
        \"text\": \"*Project:* tp-project\\n*Critical Issues:* \${CRITICAL}\\n*Status:* $([ $CRITICAL -eq 0 ] && echo '✅ PASS' || echo '❌ FAIL')\"
      }
    }]
  }"
\`\`\``,

      keyPoints: JSON.stringify([
        'kwinject capture le build, kwbuildproject analyse, kwadmin charge les résultats sur le serveur',
        'Le Quality Gate bloque le pipeline si des issues critiques sont détectées',
        'L\'analyse différentielle ne vérifie que les fichiers modifiés (rapide pour les PRs)',
        'Métriques clés : densité d\'issues, taux de correction, conformité MISRA',
        'L\'API REST permet d\'automatiser la gestion des issues et le reporting',
        'Les rapports CSV et le dashboard web fournissent la visibilité aux managers et auditeurs'
      ]) },


    // ==================== JENKINS ====================
    { id: 'jen-01', courseId: 'jenkins', title: 'Introduction à Jenkins', duration: '3h', orderIndex: 1,
      theoryContent: `## Introduction à Jenkins

### Qu'est-ce que Jenkins ?

Jenkins est un serveur d'**automatisation open source** écrit en Java. C'est l'outil de CI/CD (Continuous Integration / Continuous Delivery) le plus utilisé au monde avec plus de 300 000 installations actives. Jenkins permet d'automatiser les étapes de build, test et déploiement du logiciel.

### Histoire et écosystème

- **2004** : Créé par Kohsuke Kawaguchi (Sun Microsystems) sous le nom "Hudson"
- **2011** : Fork en "Jenkins" suite au rachat de Sun par Oracle
- **Aujourd'hui** : Plus de 1800 plugins, communauté massive, fondation Jenkins (Linux Foundation)

### Pourquoi Jenkins ?

| Avantage | Description |
|----------|-------------|
| Open source | Gratuit, code source disponible |
| Extensible | 1800+ plugins pour tout intégrer |
| Polyvalent | Tout langage, toute plateforme |
| Distribué | Architecture master/agents scalable |
| Pipeline as Code | Jenkinsfile versionné avec le code |
| Communauté | Massive, documentation abondante |
| Maturité | 20 ans d'existence, très stable |

### Concepts fondamentaux

#### 1. Job (projet)

Un job est une **tâche automatisée** dans Jenkins. Types de jobs :

- **Freestyle** : configuration via l'interface web (simple)
- **Pipeline** : script Groovy définissant les étapes (recommandé)
- **Multibranch Pipeline** : pipeline automatique par branche Git
- **Organization Folder** : scan automatique de tous les repos d'une org GitHub/GitLab

#### 2. Build

Un build est une **exécution** d'un job. Chaque build a :
- Un numéro séquentiel (#1, #2, #3...)
- Un statut : Success (bleu), Unstable (jaune), Failure (rouge), Aborted (gris)
- Des logs de console
- Des artefacts produits
- Un changelog (commits depuis le dernier build)

#### 3. Pipeline

Un pipeline définit le **workflow complet** de livraison :

\`\`\`groovy
pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                sh 'mvn clean compile'
            }
        }
        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }
        stage('Package') {
            steps {
                sh 'mvn package -DskipTests'
            }
        }
        stage('Deploy') {
            steps {
                sh 'deploy.sh staging'
            }
        }
    }
}
\`\`\`

#### 4. Agent (esclave/noeud)

Un agent est une **machine** qui exécute les builds :
- **Built-in node** : le contrôleur Jenkins lui-même (déconseillé pour les builds)
- **Permanent agents** : machines dédiées connectées en permanence
- **Cloud agents** : provisionné à la demande (Docker, Kubernetes, AWS EC2)

### Architecture Jenkins

\`\`\`
┌──────────────────────────────────────────────────┐
│              JENKINS CONTROLLER                    │
│  (anciennement "master")                         │
│                                                  │
│  ┌──────────┐ ┌──────────┐ ┌─────────────────┐  │
│  │ Web UI   │ │ REST API │ │ Job Scheduler   │  │
│  └──────────┘ └──────────┘ └─────────────────┘  │
│  ┌──────────┐ ┌──────────┐ ┌─────────────────┐  │
│  │ Plugins  │ │ Security │ │ Build Queue     │  │
│  └──────────┘ └──────────┘ └─────────────────┘  │
└───────────────────────┬──────────────────────────┘
                        │ JNLP / SSH / WebSocket
         ┌──────────────┼──────────────┐
         ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  Agent Linux │ │ Agent Docker │ │  Agent Win   │
│  Java, Maven │ │  Ephemeral   │ │  .NET, MSBuild│
│  GCC, Python │ │  (on-demand) │ │  Visual Studio│
└──────────────┘ └──────────────┘ └──────────────┘
\`\`\`

### Installation

#### Méthodes d'installation

\`\`\`bash
# 1. Docker (recommandé pour les labs)
docker run -d --name jenkins \\
  -p 8080:8080 -p 50000:50000 \\
  -v jenkins-data:/var/jenkins_home \\
  jenkins/jenkins:lts

# 2. Package système (production)
# Debian/Ubuntu
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list
sudo apt update && sudo apt install jenkins

# 3. WAR file (portable)
java -jar jenkins.war --httpPort=8080
\`\`\`

### Plugins essentiels

| Plugin | Usage |
|--------|-------|
| Git | Intégration Git |
| Pipeline | Pipelines déclaratifs et scriptés |
| Blue Ocean | Interface moderne pour les pipelines |
| Docker Pipeline | Utiliser Docker dans les pipelines |
| Credentials | Gestion sécurisée des secrets |
| JUnit | Rapports de tests |
| Artifactory | Intégration JFrog Artifactory |
| SonarQube Scanner | Analyse de qualité de code |
| Slack Notification | Notifications Slack |
| Role-based Authorization | Contrôle d'accès fin |

### Jenkins vs alternatives modernes

| Critère | Jenkins | GitHub Actions | GitLab CI | Azure DevOps |
|---------|---------|---------------|-----------|--------------|
| Hébergement | Self-hosted | Cloud (GitHub) | Self/Cloud | Cloud (MS) |
| Configuration | Jenkinsfile | YAML | YAML | YAML |
| Plugins | 1800+ | Marketplace | Intégré | Extensions |
| Coût | Gratuit (+infra) | Gratuit (limites) | Gratuit (limites) | Gratuit (limites) |
| Complexité | Haute | Basse | Moyenne | Moyenne |
| Flexibilité | Maximale | Haute | Haute | Haute |`,

      practiceContent: `### Travaux Pratiques : Installation et premier job

#### Prérequis
- Docker installé
- Git installé
- Un projet à builder (Java, Node.js ou Python)

#### Étape 1 : Installer Jenkins avec Docker

\`\`\`bash
# Créer un réseau Docker
docker network create jenkins

# Lancer Jenkins
docker run -d --name jenkins \\
  --network jenkins \\
  -p 8080:8080 -p 50000:50000 \\
  -v jenkins-data:/var/jenkins_home \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  jenkins/jenkins:lts

# Récupérer le mot de passe initial
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
\`\`\`

#### Étape 2 : Configuration initiale

1. Ouvrez http://localhost:8080
2. Entrez le mot de passe initial
3. Installez les plugins suggérés
4. Créez votre compte administrateur
5. Configurez l'URL Jenkins : http://localhost:8080/

#### Étape 3 : Créer un job Freestyle

1. Cliquez sur "New Item"
2. Nom : "hello-world-freestyle"
3. Type : "Freestyle project"
4. Configuration :
   - Build Steps > Execute shell :
\`\`\`bash
echo "Hello from Jenkins!"
echo "Date: $(date)"
echo "User: $(whoami)"
echo "Workspace: $WORKSPACE"
java -version 2>&1 || echo "Java non disponible"
\`\`\`
5. Sauvegardez et cliquez "Build Now"
6. Vérifiez la console output

#### Étape 4 : Créer un job Pipeline

1. New Item > "hello-pipeline" > Pipeline
2. Dans la section Pipeline, entrez :
\`\`\`groovy
pipeline {
    agent any
    
    stages {
        stage('Hello') {
            steps {
                echo 'Hello World from Pipeline!'
                sh 'uname -a'
            }
        }
        stage('Build Info') {
            steps {
                echo "Build #\${env.BUILD_NUMBER}"
                echo "Job: \${env.JOB_NAME}"
                echo "Workspace: \${env.WORKSPACE}"
            }
        }
        stage('Date') {
            steps {
                sh 'date'
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
\`\`\`
3. Exécutez et observez l'affichage par étapes

#### Étape 5 : Connecter un repo Git

1. Créez un nouveau Pipeline "git-project"
2. Dans Pipeline > Definition : "Pipeline script from SCM"
3. SCM : Git
4. Repository URL : https://github.com/votre-repo/projet-test.git
5. Branch : */main
6. Script Path : Jenkinsfile
7. Sauvegardez et buildez

#### Questions de vérification
- Quel est le statut de votre premier build ?
- Où se trouve le workspace sur le système de fichiers ?
- Combien de plugins sont installés par défaut ?
- Quelle version de Jenkins avez-vous ?`,

      keyPoints: JSON.stringify([
        'Jenkins est le serveur CI/CD open source le plus utilisé (300 000+ installations)',
        'Architecture Controller + Agents pour distribuer les builds',
        'Jobs Freestyle (UI) vs Pipeline (code Groovy) - Pipeline recommandé',
        'Plus de 1800 plugins pour intégrer tous les outils du marché',
        'Pipeline as Code : le Jenkinsfile est versionné avec le code source',
        'Installation possible via Docker, package système ou WAR file'
      ]) },


    { id: 'jen-02', courseId: 'jenkins', title: 'Pipelines déclaratifs', duration: '4h', orderIndex: 2,
      theoryContent: `## Pipelines déclaratifs Jenkins

### Pipeline déclaratif vs scripté

Jenkins propose deux syntaxes pour les pipelines :

| Aspect | Déclaratif | Scripté |
|--------|-----------|---------|
| Syntaxe | Structurée (DSL) | Groovy libre |
| Lisibilité | Haute | Variable |
| Flexibilité | Encadrée | Totale |
| Validation | Linter intégré | Pas de validation |
| Recommandation | Préféré (99% des cas) | Cas complexes uniquement |
| Mot-clé | pipeline {} | node {} |

### Structure d'un pipeline déclaratif

\`\`\`groovy
pipeline {
    // Où exécuter (obligatoire)
    agent any
    
    // Variables d'environnement
    environment {
        APP_NAME = 'my-application'
        VERSION = '1.0.0'
    }
    
    // Options globales
    options {
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    
    // Paramètres de build
    parameters {
        string(name: 'DEPLOY_ENV', defaultValue: 'staging', description: 'Environnement cible')
        booleanParam(name: 'RUN_TESTS', defaultValue: true, description: 'Exécuter les tests ?')
        choice(name: 'LOG_LEVEL', choices: ['INFO', 'DEBUG', 'WARN'], description: 'Niveau de log')
    }
    
    // Déclencheurs automatiques
    triggers {
        pollSCM('H/5 * * * *')  // Vérifier Git toutes les 5 minutes
        cron('H 2 * * 1-5')     // Build nocturne en semaine à 2h
    }
    
    // Étapes du pipeline
    stages {
        stage('Build') {
            steps {
                sh 'mvn clean compile'
            }
        }
        
        stage('Test') {
            when {
                expression { params.RUN_TESTS == true }
            }
            steps {
                sh 'mvn test'
            }
            post {
                always {
                    junit '**/target/surefire-reports/*.xml'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                sh "deploy.sh \${params.DEPLOY_ENV}"
            }
        }
    }
    
    // Actions post-pipeline
    post {
        success { echo 'Build réussi !' }
        failure { echo 'Build échoué !' }
        always { cleanWs() }
    }
}
\`\`\`

### Directives principales

#### agent - Où exécuter

\`\`\`groovy
// Sur n'importe quel agent disponible
agent any

// Sur un agent avec un label spécifique
agent { label 'linux && java17' }

// Pas d'agent global (défini par stage)
agent none

// Dans un conteneur Docker
agent {
    docker {
        image 'maven:3.9-eclipse-temurin-17'
        args '-v $HOME/.m2:/root/.m2'
    }
}

// Dockerfile personnalisé
agent {
    dockerfile {
        filename 'Dockerfile.build'
        dir 'docker'
        args '-v /tmp:/tmp'
    }
}

// Kubernetes pod
agent {
    kubernetes {
        yaml '''
        apiVersion: v1
        kind: Pod
        spec:
          containers:
          - name: maven
            image: maven:3.9
            command: ['sleep', '99d']
          - name: docker
            image: docker:dind
            securityContext:
              privileged: true
        '''
    }
}
\`\`\`

#### environment - Variables d'environnement

\`\`\`groovy
environment {
    // Variable simple
    APP_NAME = 'my-app'
    
    // Depuis les credentials Jenkins
    DOCKER_CREDS = credentials('docker-hub-creds')
    // Crée : DOCKER_CREDS (user:pass), DOCKER_CREDS_USR, DOCKER_CREDS_PSW
    
    // Depuis un secret text
    API_TOKEN = credentials('api-token-id')
    
    // Calculée
    BUILD_TAG = "\${env.BUILD_NUMBER}-\${env.GIT_COMMIT?.take(7)}"
}
\`\`\`

#### when - Exécution conditionnelle

\`\`\`groovy
stage('Deploy Prod') {
    when {
        // Seulement sur la branche main
        branch 'main'
        
        // ET seulement si le paramètre est vrai
        expression { params.DEPLOY_TO_PROD == true }
        
        // ET pas un build déclenché par timer
        not { triggeredBy 'TimerTrigger' }
    }
    steps {
        sh 'deploy.sh production'
    }
}

// Autres conditions when :
when { branch 'release/*' }           // Pattern de branche
when { tag 'v*' }                     // Sur un tag
when { changeset '**/*.java' }        // Si fichiers Java modifiés
when { environment name: 'ENV', value: 'prod' }
when { expression { return env.BRANCH_NAME ==~ /release\\/.*/ } }
when { allOf { branch 'main'; environment name: 'DEPLOY', value: 'true' } }
when { anyOf { branch 'main'; branch 'develop' } }
\`\`\`

#### parallel - Étapes en parallèle

\`\`\`groovy
stage('Tests') {
    parallel {
        stage('Unit Tests') {
            agent { label 'linux' }
            steps {
                sh 'mvn test -pl unit-tests'
            }
        }
        stage('Integration Tests') {
            agent { label 'linux' }
            steps {
                sh 'mvn test -pl integration-tests'
            }
        }
        stage('UI Tests') {
            agent { label 'browser' }
            steps {
                sh 'npm run test:e2e'
            }
        }
    }
}
\`\`\`

#### input - Approbation manuelle

\`\`\`groovy
stage('Deploy Production') {
    steps {
        input message: 'Déployer en production ?',
              ok: 'Déployer',
              submitter: 'admin,release-managers',
              parameters: [
                  string(name: 'REASON', description: 'Raison du déploiement')
              ]
        sh 'deploy.sh production'
    }
}
\`\`\`

### Gestion des credentials

\`\`\`groovy
pipeline {
    agent any
    stages {
        stage('Deploy') {
            steps {
                // Username/Password
                withCredentials([usernamePassword(
                    credentialsId: 'deploy-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh 'deploy --user $USER --password $PASS'
                }
                
                // SSH Key
                withCredentials([sshUserPrivateKey(
                    credentialsId: 'ssh-key',
                    keyFileVariable: 'SSH_KEY',
                    usernameVariable: 'SSH_USER'
                )]) {
                    sh 'ssh -i $SSH_KEY $SSH_USER@server.com "restart app"'
                }
                
                // Secret File
                withCredentials([file(
                    credentialsId: 'kubeconfig',
                    variable: 'KUBECONFIG'
                )]) {
                    sh 'kubectl --kubeconfig=$KUBECONFIG apply -f deployment.yaml'
                }
            }
        }
    }
}
\`\`\`

### Shared Libraries

Les Shared Libraries permettent de **factoriser** le code commun entre pipelines :

\`\`\`groovy
// vars/buildJavaApp.groovy (dans le repo de la shared library)
def call(Map config) {
    pipeline {
        agent any
        stages {
            stage('Build') {
                steps {
                    sh "mvn clean package -pl \${config.module}"
                }
            }
            stage('Test') {
                steps {
                    sh "mvn test -pl \${config.module}"
                }
            }
            stage('SonarQube') {
                steps {
                    withSonarQubeEnv('SonarQube') {
                        sh "mvn sonar:sonar -pl \${config.module}"
                    }
                }
            }
        }
    }
}

// Utilisation dans un Jenkinsfile :
@Library('my-shared-lib') _
buildJavaApp(module: 'backend-service')
\`\`\``,

      practiceContent: `### Travaux Pratiques : Pipelines déclaratifs

#### TP 1 : Pipeline multi-stages complet

Créez un Jenkinsfile avec toutes les étapes d'un vrai projet :
\`\`\`groovy
pipeline {
    agent any
    
    environment {
        APP = 'formation-app'
        REGISTRY = 'localhost:5000'
    }
    
    parameters {
        choice(name: 'ENV', choices: ['dev', 'staging', 'prod'])
        booleanParam(name: 'SKIP_TESTS', defaultValue: false)
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'git log --oneline -5'
            }
        }
        
        stage('Build') {
            steps {
                sh 'echo "Building \${APP}..."'
                sh 'sleep 2'
                echo "Build #\${BUILD_NUMBER} complete"
            }
        }
        
        stage('Test') {
            when { expression { !params.SKIP_TESTS } }
            parallel {
                stage('Unit') {
                    steps { sh 'echo "Running unit tests..." && sleep 3' }
                }
                stage('Integration') {
                    steps { sh 'echo "Running integration tests..." && sleep 5' }
                }
            }
        }
        
        stage('Deploy') {
            when { branch 'main' }
            input {
                message 'Deploy to \${params.ENV}?'
                ok 'Deploy'
            }
            steps {
                echo "Deploying to \${params.ENV}"
            }
        }
    }
    
    post {
        success { echo '✅ Pipeline SUCCESS' }
        failure { echo '❌ Pipeline FAILED' }
        always { echo 'Pipeline terminé' }
    }
}
\`\`\`

#### TP 2 : Pipeline avec Docker

\`\`\`groovy
pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            args '-v $HOME/.npm:/root/.npm'
        }
    }
    
    stages {
        stage('Install') {
            steps {
                sh 'node --version'
                sh 'npm --version'
                sh 'npm install'
            }
        }
        stage('Lint') {
            steps { sh 'npm run lint || true' }
        }
        stage('Test') {
            steps { sh 'npm test || true' }
        }
        stage('Build') {
            steps { sh 'npm run build || echo "No build script"' }
        }
    }
}
\`\`\`

#### TP 3 : Pipeline avec credentials

1. Dans Jenkins, ajoutez des credentials :
   - ID: "deploy-token", Type: Secret text, Value: "super-secret-123"
2. Créez un pipeline qui les utilise :
\`\`\`groovy
pipeline {
    agent any
    environment {
        DEPLOY_TOKEN = credentials('deploy-token')
    }
    stages {
        stage('Use Secret') {
            steps {
                sh 'echo "Token length: \${#DEPLOY_TOKEN}"'
                // Jenkins masque automatiquement la valeur dans les logs
                sh 'echo "The token is: $DEPLOY_TOKEN"'
            }
        }
    }
}
\`\`\`
3. Vérifiez que le secret est masqué dans les logs

#### TP 4 : Exécution conditionnelle

Créez un pipeline qui se comporte différemment selon la branche :
- Sur main : build + test + deploy staging
- Sur release/* : build + test + deploy prod (avec approbation)
- Sur feature/* : build + test seulement

#### TP 5 : Shared Library

1. Créez un repo Git "jenkins-shared-lib"
2. Ajoutez un fichier vars/standardPipeline.groovy
3. Configurez la library dans Jenkins > Manage Jenkins > System > Global Pipeline Libraries
4. Utilisez-la dans un Jenkinsfile avec @Library`,

      keyPoints: JSON.stringify([
        'Pipeline déclaratif : structuré, lisible, validable par linter',
        'Directives clés : agent, environment, stages, when, parallel, post, input',
        'agent docker : exécuter chaque stage dans un conteneur éphémère',
        'when : conditions sur branche, tag, paramètre, fichiers modifiés',
        'Credentials : withCredentials() masque automatiquement les secrets des logs',
        'Shared Libraries : factoriser le code pipeline commun entre projets'
      ]) },


    { id: 'jen-03', courseId: 'jenkins', title: 'Agents et distribution', duration: '4h30', orderIndex: 3,
      theoryContent: `## Agents distribués et scalabilité Jenkins

### Pourquoi distribuer les builds ?

Un seul serveur Jenkins ne suffit pas quand :
- Vous avez **beaucoup de builds** simultanés (file d'attente)
- Vous avez besoin de **plateformes différentes** (Linux, Windows, macOS)
- Vous voulez **isoler** les builds (sécurité, dépendances conflictuelles)
- Vous voulez **scaler** dynamiquement selon la charge
- Le controller doit rester **léger** (ne pas exécuter de builds lui-même)

### Types d'agents

#### 1. Agents permanents (Static Agents)

Machines dédiées connectées en permanence au controller :

\`\`\`
Avantages :
- Performances prévisibles
- Environnement stable et contrôlé
- Outils pré-installés

Inconvénients :
- Coût fixe (même quand idle)
- Maintenance manuelle (mises à jour)
- Pas de scalabilité dynamique
\`\`\`

Protocoles de connexion :
- **SSH** : Jenkins se connecte à l'agent via SSH (Linux/macOS)
- **JNLP/WebSocket** : l'agent se connecte au controller (Windows, NAT)
- **Inbound** : l'agent initie la connexion (firewalls restrictifs)

#### 2. Agents Docker

Conteneurs éphémères créés pour chaque build :

\`\`\`groovy
pipeline {
    agent {
        docker {
            image 'maven:3.9-eclipse-temurin-17'
            label 'docker-host'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'mvn --version'
                sh 'mvn clean package'
            }
        }
    }
}
\`\`\`

Avantages :
- **Isolation parfaite** : chaque build dans son propre conteneur
- **Reproductibilité** : même image = même environnement
- **Pas de pollution** : le conteneur est détruit après le build
- **Multi-versions** : Java 8, 11, 17, 21 dans des images différentes

#### 3. Agents Kubernetes

Le plugin Kubernetes crée des pods éphémères dans un cluster :

\`\`\`groovy
pipeline {
    agent {
        kubernetes {
            yaml '''
apiVersion: v1
kind: Pod
metadata:
  labels:
    jenkins: agent
spec:
  containers:
  - name: maven
    image: maven:3.9-eclipse-temurin-17
    command: ['sleep', '99d']
    resources:
      requests:
        memory: "512Mi"
        cpu: "500m"
      limits:
        memory: "1Gi"
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
    command: ['sleep', '99d']
  volumes:
  - name: maven-cache
    persistentVolumeClaim:
      claimName: maven-cache-pvc
'''
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
                    sh 'docker build -t myapp:latest .'
                }
            }
        }
        stage('Deploy') {
            steps {
                container('kubectl') {
                    sh 'kubectl apply -f k8s/'
                }
            }
        }
    }
}
\`\`\`

#### 4. Agents Cloud (EC2, Azure, GCP)

Machines virtuelles provisionnées à la demande :

\`\`\`
Configuration EC2 Plugin :
- AMI : ami-0123456789 (Ubuntu 22.04 + Java + outils)
- Instance Type : t3.medium (2 vCPU, 4 GB RAM)
- Max instances : 10
- Idle timeout : 15 minutes (terminate si pas de build)
- Init script : install-tools.sh
- Labels : "linux java docker"
\`\`\`

### Labels et affectation des builds

Les labels permettent de diriger les builds vers les bons agents :

\`\`\`groovy
// Build sur un agent Linux avec Java 17
agent { label 'linux && java17' }

// Build sur un agent avec Docker installé
agent { label 'docker' }

// Build sur Windows pour .NET
agent { label 'windows && dotnet' }

// Build sur un agent GPU (machine learning)
agent { label 'gpu && cuda' }

// Expression logique complexe
agent { label '(linux || macos) && !production' }
\`\`\`

### Configuration réseau

#### Agent SSH (Linux)

\`\`\`bash
# Sur l'agent :
# 1. Installer Java
sudo apt install openjdk-17-jre-headless

# 2. Créer l'utilisateur jenkins
sudo useradd -m -d /var/jenkins -s /bin/bash jenkins
sudo mkdir -p /var/jenkins/.ssh
sudo ssh-keygen -t ed25519 -f /var/jenkins/.ssh/id_ed25519 -N ""

# Sur le controller :
# 3. Ajouter l'agent dans Jenkins > Manage Nodes
#    - Host : agent-hostname
#    - Credentials : SSH key
#    - Remote root directory : /var/jenkins
#    - Labels : "linux java17 docker"
#    - Number of executors : 4
\`\`\`

#### Agent JNLP (Windows)

\`\`\`powershell
# Sur l'agent Windows :
# 1. Télécharger agent.jar depuis http://jenkins-url/jnlpJars/agent.jar
Invoke-WebRequest -Uri "http://jenkins:8080/jnlpJars/agent.jar" -OutFile agent.jar

# 2. Lancer l'agent
java -jar agent.jar -url http://jenkins:8080/ -secret @secret-file -name "windows-agent" -workDir "C:\\jenkins"

# 3. Installer comme service Windows (pour le démarrage automatique)
# Utiliser WinSW (Windows Service Wrapper)
\`\`\`

### Scalabilité et performance

#### Dimensionnement du controller

| Taille | vCPU | RAM | Jobs/jour | Agents |
|--------|------|-----|-----------|--------|
| Small | 2 | 4 GB | < 100 | < 10 |
| Medium | 4 | 8 GB | 100-500 | 10-50 |
| Large | 8 | 16 GB | 500-2000 | 50-200 |
| Enterprise | 16+ | 32+ GB | 2000+ | 200+ |

#### Bonnes pratiques de scalabilité

1. **Ne pas builder sur le controller** : utiliser toujours des agents
2. **Agents éphémères** : Docker/K8s pour éviter la dérive de configuration
3. **Cache partagé** : Maven/npm cache sur un volume persistant
4. **Cleanup** : supprimer les anciens builds et workspaces
5. **Monitoring** : surveiller la queue, les temps d'attente, l'utilisation
6. **High Availability** : Jenkins Enterprise ou solutions comme CloudBees

### Sécurité des agents

- **Principe du moindre privilège** : chaque agent n'a accès qu'à ce qu'il doit faire
- **Credentials scoping** : limiter les credentials par dossier/projet
- **Agent protocols** : désactiver les protocoles obsolètes (JNLP3)
- **Network isolation** : agents dans des VLANs séparés
- **Container security** : pas de conteneur privileged sauf nécessité absolue`,

      practiceContent: `### Travaux Pratiques : Configuration des agents

#### TP 1 : Agent Docker local

\`\`\`bash
# Vérifier que Docker est accessible depuis Jenkins
docker exec jenkins docker --version

# Si Docker n'est pas disponible, relancer Jenkins avec le socket Docker :
docker stop jenkins && docker rm jenkins
docker run -d --name jenkins \\
  -p 8080:8080 -p 50000:50000 \\
  -v jenkins-data:/var/jenkins_home \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  -v /usr/bin/docker:/usr/bin/docker \\
  --group-add $(getent group docker | cut -d: -f3) \\
  jenkins/jenkins:lts
\`\`\`

Puis créez un pipeline utilisant un agent Docker :
\`\`\`groovy
pipeline {
    agent {
        docker { image 'python:3.11-slim' }
    }
    stages {
        stage('Check') {
            steps {
                sh 'python --version'
                sh 'pip --version'
            }
        }
        stage('Run') {
            steps {
                sh '''
                    python -c "
import platform
print(f'Python {platform.python_version()}')
print(f'OS: {platform.system()} {platform.release()}')
print('Hello from Docker agent!')
"
                '''
            }
        }
    }
}
\`\`\`

#### TP 2 : Multi-agents dans un pipeline

\`\`\`groovy
pipeline {
    agent none  // Pas d'agent global
    
    stages {
        stage('Build Java') {
            agent { docker { image 'maven:3.9' } }
            steps {
                sh 'mvn --version'
                sh 'echo "Building with Maven..."'
            }
        }
        
        stage('Build Node') {
            agent { docker { image 'node:18' } }
            steps {
                sh 'node --version'
                sh 'npm --version'
                sh 'echo "Building frontend..."'
            }
        }
        
        stage('Build Go') {
            agent { docker { image 'golang:1.21' } }
            steps {
                sh 'go version'
                sh 'echo "Building Go service..."'
            }
        }
    }
}
\`\`\`

#### TP 3 : Agents avec labels

1. Configurez un agent permanent (ou simulez-le) :
   - Jenkins > Manage Jenkins > Manage Nodes > New Node
   - Nom : "linux-builder"
   - Labels : "linux docker java"
   - Number of executors : 2

2. Créez un pipeline qui cible cet agent :
\`\`\`groovy
pipeline {
    agent { label 'linux && java' }
    stages {
        stage('Build') {
            steps {
                echo "Running on: \${env.NODE_NAME}"
                echo "Labels: linux, java"
            }
        }
    }
}
\`\`\`

#### TP 4 : Simuler la scalabilité

Créez 5 pipelines qui tournent en parallèle et observez la file d'attente :
\`\`\`groovy
// job: load-test-1 à load-test-5
pipeline {
    agent any
    stages {
        stage('Heavy Work') {
            steps {
                sh 'echo "Working..." && sleep 60'
            }
        }
    }
}
\`\`\`

Observez dans Jenkins :
- La file d'attente (Build Queue)
- Le nombre d'executors utilisés
- Les temps d'attente

#### TP 5 : Dockerfile comme agent

Créez un Dockerfile personnalisé pour votre build :
\`\`\`dockerfile
# Dockerfile.build
FROM ubuntu:22.04
RUN apt-get update && apt-get install -y \\
    gcc g++ make cmake \\
    python3 python3-pip \\
    git curl wget
RUN pip3 install pytest coverage
WORKDIR /workspace
\`\`\`

\`\`\`groovy
pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile.build'
            args '-v /tmp/build-cache:/cache'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'gcc --version'
                sh 'python3 --version'
                sh 'cmake --version'
            }
        }
    }
}
\`\`\``,

      keyPoints: JSON.stringify([
        'Ne jamais exécuter de builds sur le controller Jenkins (sécurité + performance)',
        'Agents permanents (SSH/JNLP), Docker (éphémères), Kubernetes (pods), Cloud (EC2)',
        'Labels pour diriger les builds : agent { label "linux && java17 && docker" }',
        'Docker agents : isolation parfaite, reproductibilité, multi-versions',
        'Kubernetes : scalabilité automatique, pods multi-conteneurs par build',
        'Dimensionner selon le nombre de builds/jour et d\'agents nécessaires'
      ]) },


    { id: 'jen-04', courseId: 'jenkins', title: 'Sécurité et administration', duration: '4h30', orderIndex: 4,
      theoryContent: `## Sécurité et administration de Jenkins

### Pourquoi la sécurité Jenkins est critique ?

Jenkins a accès à :
- Le **code source** de tous vos projets
- Les **credentials** (mots de passe, clés SSH, tokens API)
- Les **systèmes de production** (via les déploiements)
- L'**infrastructure** (agents, cloud, réseau interne)

Un Jenkins compromis = compromission totale de votre chaîne de livraison.

### Modèle de sécurité Jenkins

#### 1. Authentification (qui êtes-vous ?)

Méthodes d'authentification disponibles :

| Méthode | Description | Cas d'usage |
|---------|-------------|-------------|
| Jenkins database | Base interne | Lab, petites équipes |
| LDAP/Active Directory | Annuaire entreprise | Enterprise |
| SAML 2.0 | SSO (Okta, Azure AD) | Cloud/Enterprise |
| GitHub/GitLab OAuth | Provider externe | Équipes dev |
| Unix user/group | Utilisateurs système | Environnements Linux |

Configuration LDAP :
\`\`\`
Server: ldap://ldap.company.com:389
Root DN: dc=company,dc=com
User search base: ou=People
User search filter: uid={0}
Group search base: ou=Groups
Group membership: memberOf
\`\`\`

#### 2. Autorisation (que pouvez-vous faire ?)

Stratégies d'autorisation :

**Matrix-based Security** :
\`\`\`
                Overall  Job      View    SCM     Agent
                Read     Build    Read    Tag     Connect
admin           ✓        ✓        ✓       ✓       ✓
developers      ✓        ✓        ✓       ✓       -
viewers         ✓        -        ✓       -       -
ci-bot          -        ✓        -       -       -
\`\`\`

**Role-Based Access Control (RBAC)** - Plugin recommandé :
\`\`\`
Rôles globaux :
- admin : tout accès
- developer : lire + builder
- viewer : lecture seule

Rôles par projet (pattern) :
- team-a-dev : pattern "team-a-*" → full access
- team-b-dev : pattern "team-b-*" → full access
- release-manager : pattern "*-release" → build + deploy
\`\`\`

#### 3. Gestion des credentials

Types de credentials dans Jenkins :
- **Username with password** : login/mot de passe
- **SSH Username with private key** : clé SSH
- **Secret text** : token, API key
- **Secret file** : fichier (kubeconfig, certificat)
- **Certificate** : certificat PKCS#12

Bonnes pratiques :
\`\`\`groovy
// ✅ BON : Utiliser withCredentials
withCredentials([string(credentialsId: 'api-key', variable: 'API_KEY')]) {
    sh "curl -H 'Authorization: Bearer $API_KEY' https://api.example.com/data"
}

// ❌ MAUVAIS : Ne jamais mettre de secrets en clair
sh "curl -H 'Authorization: Bearer my-secret-key' https://api.example.com/data"

// ✅ BON : Scope des credentials par dossier
// Credentials visibles uniquement dans le dossier "team-a"

// ✅ BON : Rotation régulière des credentials
// Politique : tokens expirés après 90 jours
\`\`\`

### Durcissement de Jenkins

#### Configuration sécurisée du controller

\`\`\`groovy
// Script init.groovy.d/security.groovy
import jenkins.model.*
import hudson.security.*
import org.jenkinsci.plugins.matrixauth.*

def instance = Jenkins.getInstance()

// 1. Désactiver l'inscription ouverte
def hudsonRealm = new HudsonPrivateSecurityRealm(false)
instance.setSecurityRealm(hudsonRealm)

// 2. Configurer la matrice de droits
def strategy = new GlobalMatrixAuthorizationStrategy()
strategy.add(Jenkins.ADMINISTER, "admin")
strategy.add(Jenkins.READ, "authenticated")
strategy.add(hudson.model.Item.READ, "authenticated")
strategy.add(hudson.model.Item.BUILD, "developers")
instance.setAuthorizationStrategy(strategy)

// 3. Activer CSRF protection
instance.setCrumbIssuer(new DefaultCrumbIssuer(true))

// 4. Désactiver les agents insecure
instance.setSlaveAgentPort(-1) // Désactiver JNLP si non utilisé

instance.save()
\`\`\`

#### Checklist de sécurité

1. **HTTPS obligatoire** : reverse proxy Nginx/Apache avec TLS
2. **CSRF protection** : activée (crumb issuer)
3. **Content-Security-Policy** : headers restrictifs
4. **Script Security** : sandbox Groovy pour les pipelines
5. **Agent to Controller Access** : limiter ce que les agents peuvent faire
6. **Disable CLI** : désactiver si non utilisé
7. **Audit logging** : tracer toutes les actions admin
8. **Backup** : sauvegardes régulières de JENKINS_HOME
9. **Updates** : appliquer les mises à jour de sécurité rapidement
10. **Plugins** : auditer et limiter les plugins installés

### Administration quotidienne

#### Sauvegarde et restauration

\`\`\`bash
# Sauvegarde de JENKINS_HOME
JENKINS_HOME=/var/jenkins_home
BACKUP_DIR=/backups/jenkins/$(date +%Y%m%d)

mkdir -p $BACKUP_DIR

# Éléments critiques à sauvegarder
rsync -av $JENKINS_HOME/config.xml $BACKUP_DIR/
rsync -av $JENKINS_HOME/credentials.xml $BACKUP_DIR/
rsync -av $JENKINS_HOME/secrets/ $BACKUP_DIR/secrets/
rsync -av $JENKINS_HOME/jobs/ $BACKUP_DIR/jobs/ --include='*/config.xml' --exclude='builds/**'
rsync -av $JENKINS_HOME/users/ $BACKUP_DIR/users/
rsync -av $JENKINS_HOME/nodes/ $BACKUP_DIR/nodes/
rsync -av $JENKINS_HOME/plugins/ $BACKUP_DIR/plugins/

# Compression
tar czf /backups/jenkins-$(date +%Y%m%d).tar.gz $BACKUP_DIR

# Restauration : arrêter Jenkins, extraire, redémarrer
\`\`\`

#### Monitoring Jenkins

Métriques à surveiller :

| Métrique | Seuil d'alerte | Action |
|----------|---------------|--------|
| Build Queue length | > 10 | Ajouter des agents |
| Executor utilization | > 80% | Scaler les agents |
| Disk usage | > 80% | Cleanup des builds |
| Memory usage | > 85% JVM | Augmenter heap |
| Plugin outdated | > 30 jours | Mettre à jour |
| Failed builds ratio | > 30% | Investiguer les causes |

Outils de monitoring :
- **Prometheus + Grafana** : plugin Prometheus pour Jenkins
- **Jenkins Monitoring Plugin** : métriques intégrées
- **Datadog/New Relic** : APM pour Jenkins

#### Maintenance des builds

\`\`\`groovy
// Configuration de rétention dans le Jenkinsfile
pipeline {
    options {
        buildDiscarder(logRotator(
            numToKeepStr: '20',        // Garder les 20 derniers builds
            artifactNumToKeepStr: '5',  // Garder les artefacts des 5 derniers
            daysToKeepStr: '30'         // Supprimer après 30 jours
        ))
    }
    // ...
}

// Script Groovy pour nettoyage global (Script Console)
Jenkins.instance.getAllItems(hudson.model.Job.class).each { job ->
    job.getBuilds().each { build ->
        if (build.getNumber() < job.getLastBuild().getNumber() - 20) {
            println "Deleting: \${job.name} #\${build.number}"
            build.delete()
        }
    }
}
\`\`\`

#### Jenkins Configuration as Code (JCasC)

Gérer la configuration Jenkins de manière déclarative :

\`\`\`yaml
# jenkins.yaml
jenkins:
  systemMessage: "Jenkins configured by JCasC"
  numExecutors: 0  # Pas de build sur le controller
  securityRealm:
    ldap:
      configurations:
        - server: "ldap://ldap.company.com"
          rootDN: "dc=company,dc=com"
  authorizationStrategy:
    roleBased:
      roles:
        global:
          - name: "admin"
            permissions: ["Overall/Administer"]
            entries:
              - user: "admin"
          - name: "developer"
            permissions: ["Overall/Read", "Job/Build", "Job/Read"]
            entries:
              - group: "developers"
  nodes:
    - permanent:
        name: "linux-agent-1"
        remoteFS: "/var/jenkins"
        labelString: "linux docker"
        numExecutors: 4
        launcher:
          ssh:
            host: "agent1.company.com"
            credentialsId: "ssh-agent-key"

credentials:
  system:
    domainCredentials:
      - credentials:
          - string:
              id: "sonar-token"
              secret: "\${SONAR_TOKEN}"
          - usernamePassword:
              id: "docker-registry"
              username: "deploy"
              password: "\${DOCKER_PASSWORD}"

unclassified:
  location:
    url: "https://jenkins.company.com/"
  sonarGlobalConfiguration:
    installations:
      - name: "SonarQube"
        serverUrl: "https://sonar.company.com"
        credentialsId: "sonar-token"
\`\`\`

### Mise à jour et plugins

#### Stratégie de mise à jour

1. **LTS (Long-Term Support)** : mise à jour tous les 3 mois (recommandé production)
2. **Weekly** : dernières fonctionnalités (pour les labs et early adopters)

\`\`\`bash
# Mettre à jour Jenkins (via Docker)
docker pull jenkins/jenkins:lts
docker stop jenkins
docker rm jenkins
docker run -d --name jenkins \\
  -v jenkins-data:/var/jenkins_home \\
  -p 8080:8080 \\
  jenkins/jenkins:lts

# Mettre à jour les plugins via CLI
java -jar jenkins-cli.jar -s http://jenkins:8080/ \\
  install-plugin git pipeline-stage-view docker-workflow \\
  -restart
\`\`\``,

      practiceContent: `### Travaux Pratiques : Sécurité et administration

#### TP 1 : Configurer RBAC

1. Installez le plugin "Role-based Authorization Strategy"
2. Activez-le dans Manage Jenkins > Security > Authorization
3. Créez les rôles suivants :
   - admin : tous les droits
   - developer : Read, Build, Cancel, Workspace
   - viewer : Read only
4. Créez un utilisateur "dev-user" et assignez-le au rôle "developer"
5. Testez en vous connectant avec ce compte :
   - Peut-il lancer un build ? (oui)
   - Peut-il modifier la configuration d'un job ? (non)
   - Peut-il accéder à Manage Jenkins ? (non)

#### TP 2 : Gérer les credentials de manière sécurisée

\`\`\`groovy
// Créez ces credentials dans Jenkins :
// 1. Secret text : id="api-token", value="sk-test-12345"
// 2. Username/Password : id="registry-creds", user="deploy", pass="secret"
// 3. SSH key : id="ssh-deploy-key"

// Pipeline de test
pipeline {
    agent any
    stages {
        stage('Test Credentials') {
            steps {
                withCredentials([
                    string(credentialsId: 'api-token', variable: 'TOKEN'),
                    usernamePassword(credentialsId: 'registry-creds',
                        usernameVariable: 'REG_USER',
                        passwordVariable: 'REG_PASS')
                ]) {
                    sh '''
                        echo "Token starts with: \${TOKEN:0:3}..."
                        echo "Registry user: $REG_USER"
                        echo "Registry pass length: \${#REG_PASS}"
                    '''
                    // Vérifiez que les valeurs sont masquées dans les logs
                }
            }
        }
    }
}
\`\`\`

#### TP 3 : Configuration as Code (JCasC)

1. Installez le plugin "Configuration as Code"
2. Créez un fichier jenkins.yaml :
\`\`\`yaml
jenkins:
  systemMessage: "Jenkins TP - Configured by JCasC"
  numExecutors: 2
  mode: NORMAL
  
unclassified:
  location:
    url: "http://localhost:8080/"
    adminAddress: "admin@formation.com"
\`\`\`
3. Appliquez : Manage Jenkins > Configuration as Code > Apply
4. Vérifiez que le message système a changé

#### TP 4 : Sauvegarde et restauration

\`\`\`bash
# Script de sauvegarde
#!/bin/bash
JENKINS_CONTAINER="jenkins"
BACKUP_FILE="/tmp/jenkins-backup-$(date +%Y%m%d-%H%M%S).tar.gz"

echo "Sauvegarde de Jenkins..."

# Copier depuis le conteneur
docker exec $JENKINS_CONTAINER tar czf /tmp/backup.tar.gz \\
  -C /var/jenkins_home \\
  config.xml credentials.xml secrets/ jobs/ users/ nodes/ plugins/

docker cp $JENKINS_CONTAINER:/tmp/backup.tar.gz $BACKUP_FILE
docker exec $JENKINS_CONTAINER rm /tmp/backup.tar.gz

echo "Sauvegarde créée : $BACKUP_FILE"
ls -lh $BACKUP_FILE
\`\`\`

Test de restauration :
\`\`\`bash
# Simuler une restauration
docker stop jenkins
docker rm jenkins

# Recréer avec un volume vierge
docker volume rm jenkins-data
docker volume create jenkins-data

# Restaurer la sauvegarde
docker run --rm -v jenkins-data:/data -v /tmp:/backup alpine \\
  tar xzf /backup/jenkins-backup-*.tar.gz -C /data/

# Relancer Jenkins
docker run -d --name jenkins -p 8080:8080 \\
  -v jenkins-data:/var/jenkins_home jenkins/jenkins:lts
\`\`\`

#### TP 5 : Monitoring avec le plugin Prometheus

1. Installez le plugin "Prometheus Metrics"
2. Accédez à http://localhost:8080/prometheus/
3. Observez les métriques disponibles :
   - jenkins_job_count_value
   - jenkins_queue_size_value
   - jenkins_node_online_value
   - jenkins_builds_duration_milliseconds
4. (Bonus) Connectez à Prometheus/Grafana si disponible

#### Checklist de vérification sécurité

- [ ] HTTPS activé (ou reverse proxy)
- [ ] Compte admin avec mot de passe fort
- [ ] CSRF protection activée
- [ ] Pas de builds sur le controller (numExecutors=0)
- [ ] Credentials scopés par dossier
- [ ] Plugins à jour
- [ ] Sauvegarde automatique configurée
- [ ] Audit log activé`,

      keyPoints: JSON.stringify([
        'Jenkins a accès au code, credentials et production : la sécurité est critique',
        'RBAC (Role-Based Access Control) pour des permissions granulaires par rôle et projet',
        'Credentials Jenkins : scoper par dossier, rotater régulièrement, ne jamais logger',
        'JCasC (Jenkins Configuration as Code) : gérer la config en YAML versionné',
        'Sauvegarder régulièrement : config.xml, credentials, secrets, jobs, plugins',
        'Monitoring : queue, executors, disk, memory - alerter avant les problèmes'
      ]) },


  ],

  quizQuestions: [
    // Artifactory
    { id: 'q-art-01', courseId: 'artifactory', question: 'Quels sont les trois types de dépôts dans Artifactory ?',
      options: JSON.stringify(['Local, Remote, Virtual', 'Public, Private, Shared', 'Source, Binary, Cache', 'Dev, Staging, Prod']),
      correctAnswer: 0, explanation: 'Artifactory utilise trois types de dépôts : Local (stockage interne), Remote (proxy/cache de dépôts externes) et Virtual (agrégation de plusieurs dépôts en un point d\'entrée unique).' },
    { id: 'q-art-02', courseId: 'artifactory', question: 'Quel est le rôle du Build Info dans Artifactory ?',
      options: JSON.stringify(['Configurer les builds Jenkins', 'Tracer la relation entre code source, build et artefacts produits', 'Optimiser les temps de compilation', 'Gérer les versions de plugins']),
      correctAnswer: 1, explanation: 'Le Build Info est un fichier JSON qui documente tout ce qu\'un build a produit et consommé : artefacts déployés, dépendances résolues, commit source, agent de build, etc.' },
    { id: 'q-art-03', courseId: 'artifactory', question: 'Qu\'est-ce que AQL dans Artifactory ?',
      options: JSON.stringify(['Un langage de programmation', 'Artifactory Query Language - un langage de requête pour chercher des artefacts', 'Un protocole de transfert de fichiers', 'Un format de métadonnées']),
      correctAnswer: 1, explanation: 'AQL (Artifactory Query Language) est un langage de requête puissant qui permet de chercher des artefacts selon de multiples critères : nom, taille, propriétés, date, repo, etc.' },

    // SonarQube
    { id: 'q-sq-01', courseId: 'sonarqube', question: 'Quelle est la philosophie principale de SonarQube ?',
      options: JSON.stringify(['Zero Bugs Policy', 'Clean as You Code', 'Test-Driven Development', 'Continuous Refactoring']),
      correctAnswer: 1, explanation: 'Clean as You Code signifie qu\'on se concentre sur la qualité du nouveau code. On ne demande pas de corriger toute la dette technique existante d\'un coup, mais on s\'assure que tout nouveau code est propre.' },
    { id: 'q-sq-02', courseId: 'sonarqube', question: 'Qu\'est-ce qu\'un Security Hotspot dans SonarQube ?',
      options: JSON.stringify(['Un bug critique de sécurité', 'Une zone de code potentiellement vulnérable nécessitant une revue humaine', 'Un serveur mal configuré', 'Un test de pénétration automatisé']),
      correctAnswer: 1, explanation: 'Un Security Hotspot est une zone de code qui est potentiellement vulnérable mais qui nécessite une revue humaine pour déterminer si c\'est réellement un problème (Safe, Fixed ou Vulnerable).' },
    { id: 'q-sq-03', courseId: 'sonarqube', question: 'Que se passe-t-il quand un Quality Gate échoue ?',
      options: JSON.stringify(['Le code est automatiquement corrigé', 'Le pipeline CI peut être bloqué et le merge refusé', 'SonarQube envoie un email d\'avertissement seulement', 'Rien, c\'est juste informatif']),
      correctAnswer: 1, explanation: 'Quand un Quality Gate est FAILED, le pipeline CI/CD peut être configuré pour bloquer le déploiement (waitForQualityGate abortPipeline: true) et empêcher le merge de la PR.' },
    { id: 'q-sq-04', courseId: 'sonarqube', question: 'Quel outil permet d\'avoir le feedback SonarQube directement dans l\'IDE ?',
      options: JSON.stringify(['SonarScanner', 'SonarLint', 'SonarCloud', 'SonarAnalyzer']),
      correctAnswer: 1, explanation: 'SonarLint est l\'extension IDE (VS Code, IntelliJ, Eclipse) qui analyse le code en temps réel et peut se synchroniser avec le serveur SonarQube via le Connected Mode.' },

    // DOORS
    { id: 'q-doors-01', courseId: 'doors', question: 'Quel est le principal objectif d\'IBM DOORS ?',
      options: JSON.stringify(['Gestion du code source', 'Gestion des exigences avec traçabilité', 'Tests automatisés', 'Déploiement continu']),
      correctAnswer: 1, explanation: 'DOORS est un outil de gestion des exigences qui permet de capturer, tracer et gérer les exigences dans les projets complexes avec une traçabilité bidirectionnelle complète.' },
    { id: 'q-doors-02', courseId: 'doors', question: 'Qu\'est-ce qu\'un lien "suspect" dans DOORS ?',
      options: JSON.stringify(['Un lien créé par erreur', 'Un lien dont l\'objet source ou cible a été modifié depuis sa création', 'Un lien entre deux projets différents', 'Un lien sans permission d\'accès']),
      correctAnswer: 1, explanation: 'Un lien devient suspect quand l\'objet source ou cible est modifié. Cela signale que la relation pourrait ne plus être valide et nécessite une vérification humaine.' },
    { id: 'q-doors-03', courseId: 'doors', question: 'Quel langage de script est utilisé dans DOORS ?',
      options: JSON.stringify(['Python', 'JavaScript', 'DXL (DOORS eXtension Language)', 'VBScript']),
      correctAnswer: 2, explanation: 'DXL (DOORS eXtension Language) est un langage procédural inspiré du C qui permet d\'automatiser les opérations dans DOORS : export, audit, création de liens, rapports.' },

    // ClearCase
    { id: 'q-cc-01', courseId: 'clearcase', question: 'Quelle est la différence fondamentale entre ClearCase et Git ?',
      options: JSON.stringify(['ClearCase est gratuit, Git est payant', 'ClearCase versionne par fichier, Git versionne par commit (snapshot)', 'Git est centralisé, ClearCase est distribué', 'ClearCase ne supporte pas les branches']),
      correctAnswer: 1, explanation: 'ClearCase versionne chaque fichier indépendamment (file-level versioning), tandis que Git crée des snapshots atomiques du projet entier à chaque commit (project-level versioning).' },
    { id: 'q-cc-02', courseId: 'clearcase', question: 'Qu\'est-ce qu\'une Config Spec dans ClearCase ?',
      options: JSON.stringify(['Un fichier de configuration système', 'Un ensemble de règles qui déterminent quelle version de chaque fichier est visible dans une vue', 'Un script de build', 'Un rapport de configuration']),
      correctAnswer: 1, explanation: 'La Config Spec est un ensemble de règles qui sélectionne quelle version de chaque fichier apparaît dans la vue. Elle peut cibler des branches, des labels, des dates ou des versions spécifiques.' },
    { id: 'q-cc-03', courseId: 'clearcase', question: 'Dans UCM, quelle opération permet de pousser ses changements vers le stream d\'intégration ?',
      options: JSON.stringify(['Push', 'Merge', 'Deliver', 'Commit']),
      correctAnswer: 2, explanation: 'En UCM, l\'opération Deliver pousse les activités complétées d\'un stream de développement vers le stream d\'intégration. L\'inverse (récupérer les mises à jour) s\'appelle Rebase.' },

    // Klocwork
    { id: 'q-kw-01', courseId: 'klocwork', question: 'Qu\'est-ce que la Knowledge Base dans Klocwork ?',
      options: JSON.stringify(['La documentation utilisateur', 'Un modèle sémantique permettant l\'analyse inter-procédurale entre fichiers', 'Une base de données de bugs connus', 'Un wiki interne']),
      correctAnswer: 1, explanation: 'La Knowledge Base maintient les contrats de fonctions, le flux de données et le graphe d\'appels, permettant à Klocwork de détecter des bugs qui traversent les frontières de fichiers.' },
    { id: 'q-kw-02', courseId: 'klocwork', question: 'Quel standard est obligatoire pour le logiciel automobile ?',
      options: JSON.stringify(['OWASP Top 10', 'MISRA C:2012', 'PCI DSS', 'SOC 2']),
      correctAnswer: 1, explanation: 'MISRA C:2012 est le standard de codage obligatoire dans l\'industrie automobile (ISO 26262). Klocwork vérifie automatiquement la conformité aux règles MISRA mandatory et required.' },
    { id: 'q-kw-03', courseId: 'klocwork', question: 'Quelle est la commande pour capturer les informations de build avant l\'analyse Klocwork ?',
      options: JSON.stringify(['kwbuild', 'kwinject', 'kwscan', 'kwcapture']),
      correctAnswer: 1, explanation: 'kwinject intercepte les commandes de compilation (gcc, cl.exe, etc.) pour produire un fichier kwinject.out contenant toutes les informations nécessaires à l\'analyse statique.' },

    // Jenkins
    { id: 'q-jen-01', courseId: 'jenkins', question: 'Quel type de job Jenkins est recommandé pour les projets modernes ?',
      options: JSON.stringify(['Freestyle', 'Pipeline', 'Maven project', 'External Job']),
      correctAnswer: 1, explanation: 'Le job Pipeline (avec un Jenkinsfile) est recommandé car il permet le Pipeline as Code : le workflow est versionné avec le code source, lisible, et reproductible.' },
    { id: 'q-jen-02', courseId: 'jenkins', question: 'Pourquoi ne doit-on pas exécuter de builds sur le controller Jenkins ?',
      options: JSON.stringify(['C\'est trop lent', 'Pour des raisons de sécurité et de stabilité du controller', 'Ce n\'est pas techniquement possible', 'Les plugins ne fonctionnent pas sur le controller']),
      correctAnswer: 1, explanation: 'Exécuter des builds sur le controller expose les secrets Jenkins et peut déstabiliser le service. Les builds doivent toujours s\'exécuter sur des agents dédiés (permanent, Docker ou Kubernetes).' },
    { id: 'q-jen-03', courseId: 'jenkins', question: 'Qu\'est-ce que JCasC (Jenkins Configuration as Code) ?',
      options: JSON.stringify(['Un plugin de CI pour Java', 'Une approche pour gérer la configuration Jenkins en fichiers YAML versionnés', 'Un langage de programmation pour Jenkins', 'Un outil de test de configuration']),
      correctAnswer: 1, explanation: 'JCasC permet de déclarer toute la configuration Jenkins (sécurité, nodes, credentials, plugins) dans un fichier YAML versionnable, rendant Jenkins reproductible et auditable.' },
    { id: 'q-jen-04', courseId: 'jenkins', question: 'Quel est l\'avantage principal des agents Docker dans Jenkins ?',
      options: JSON.stringify(['Ils sont plus rapides que les agents permanents', 'Ils offrent une isolation parfaite et un environnement reproductible pour chaque build', 'Ils ne nécessitent pas de licence', 'Ils permettent de builder sans connexion réseau']),
      correctAnswer: 1, explanation: 'Les agents Docker créent un conteneur éphémère pour chaque build, garantissant une isolation parfaite (pas de pollution entre builds) et un environnement reproductible (même image = même résultat).' },
  ],
};
