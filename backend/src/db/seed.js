import { db, schema } from './index.js';
import { seedData } from './seed-data.js';
import { sql } from 'drizzle-orm';

async function seed() {
  console.log('🌱 Seeding database v3...');

  // V1/V2 tables
  await db.run(sql`CREATE TABLE IF NOT EXISTS courses (id TEXT PRIMARY KEY, title TEXT NOT NULL, subtitle TEXT NOT NULL, description TEXT NOT NULL, icon TEXT NOT NULL, color TEXT NOT NULL, duration TEXT NOT NULL, level TEXT NOT NULL, category TEXT NOT NULL, prerequisites TEXT NOT NULL, objectives TEXT NOT NULL, created_at TEXT NOT NULL)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS modules (id TEXT PRIMARY KEY, course_id TEXT NOT NULL, title TEXT NOT NULL, duration TEXT NOT NULL, order_index INTEGER NOT NULL, theory_content TEXT NOT NULL, practice_content TEXT NOT NULL, key_points TEXT NOT NULL, video_url TEXT)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS quiz_questions (id TEXT PRIMARY KEY, course_id TEXT NOT NULL, module_id TEXT NOT NULL, question TEXT NOT NULL, options TEXT NOT NULL, correct_index INTEGER NOT NULL, explanation TEXT NOT NULL)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS user_progress (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, course_id TEXT NOT NULL, module_id TEXT NOT NULL, completed_at TEXT NOT NULL)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS quiz_scores (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, course_id TEXT NOT NULL, score REAL NOT NULL, total_questions INTEGER NOT NULL, correct_answers INTEGER NOT NULL, passed INTEGER NOT NULL, completed_at TEXT NOT NULL)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, username TEXT NOT NULL UNIQUE, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, display_name TEXT NOT NULL, avatar TEXT, xp INTEGER NOT NULL DEFAULT 0, level INTEGER NOT NULL DEFAULT 1, role TEXT NOT NULL DEFAULT 'user', created_at TEXT NOT NULL)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS badges (id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, icon TEXT NOT NULL, condition TEXT NOT NULL, hidden INTEGER NOT NULL DEFAULT 0)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS user_badges (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, badge_id TEXT NOT NULL, earned_at TEXT NOT NULL)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, module_id TEXT NOT NULL, content TEXT NOT NULL, created_at TEXT NOT NULL)`);

  // V3 tables
  await db.run(sql`CREATE TABLE IF NOT EXISTS streaks (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL UNIQUE, current_streak INTEGER NOT NULL DEFAULT 0, longest_streak INTEGER NOT NULL DEFAULT 0, last_activity_date TEXT)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS activity_log (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, date TEXT NOT NULL, activity_count INTEGER NOT NULL DEFAULT 1)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, module_id TEXT NOT NULL, content TEXT NOT NULL DEFAULT '', updated_at TEXT NOT NULL)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, course_id TEXT, module_id TEXT, created_at TEXT NOT NULL)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS challenges (id TEXT PRIMARY KEY, title TEXT NOT NULL, description TEXT NOT NULL, target_count INTEGER NOT NULL, xp_reward INTEGER NOT NULL, week_start TEXT NOT NULL, week_end TEXT NOT NULL)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS user_challenges (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, challenge_id TEXT NOT NULL, progress INTEGER NOT NULL DEFAULT 0, completed INTEGER NOT NULL DEFAULT 0)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS notifications (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, message TEXT NOT NULL, type TEXT NOT NULL, read INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS study_time (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, module_id TEXT NOT NULL, seconds INTEGER NOT NULL, date TEXT NOT NULL)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS forum_posts (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, course_id TEXT, title TEXT NOT NULL, content TEXT NOT NULL, created_at TEXT NOT NULL)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS forum_replies (id INTEGER PRIMARY KEY AUTOINCREMENT, post_id INTEGER NOT NULL, user_id TEXT NOT NULL, content TEXT NOT NULL, upvotes INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS glossary (id TEXT PRIMARY KEY, term TEXT NOT NULL, definition TEXT NOT NULL, related_course_id TEXT)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS exercises (id TEXT PRIMARY KEY, module_id TEXT NOT NULL, instruction TEXT NOT NULL, expected_answer TEXT NOT NULL, hint TEXT, xp_reward INTEGER NOT NULL DEFAULT 25)`);

  // Try to add video_url column to modules if it doesn't exist
  try { await db.run(sql`ALTER TABLE modules ADD COLUMN video_url TEXT`); } catch(e) {}
  // Try to add role to users
  try { await db.run(sql`ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'user'`); } catch(e) {}
  // Try to add hidden to badges
  try { await db.run(sql`ALTER TABLE badges ADD COLUMN hidden INTEGER NOT NULL DEFAULT 0`); } catch(e) {}

  // Seed courses
  for (const course of seedData.courses) {
    await db.insert(schema.courses).values(course).onConflictDoNothing();
  }
  console.log(`  ✅ ${seedData.courses.length} courses`);

  // Seed modules
  for (const mod of seedData.modules) {
    await db.insert(schema.modules).values(mod).onConflictDoNothing();
  }
  console.log(`  ✅ ${seedData.modules.length} modules`);

  // Seed quiz questions
  for (const q of seedData.quizQuestions) {
    await db.insert(schema.quizQuestions).values(q).onConflictDoNothing();
  }
  console.log(`  ✅ ${seedData.quizQuestions.length} quiz questions`);

  // Seed badges (v3: includes hidden/secret badges)
  const badgesData = [
    { id: 'premier-pas', name: 'Premier pas', description: 'Compléter votre premier module', icon: '🎯', condition: 'first_module_completed', hidden: 0 },
    { id: 'studieux', name: 'Studieux', description: 'Compléter 5 modules', icon: '📚', condition: '5_modules_completed', hidden: 0 },
    { id: 'expert', name: 'Expert', description: 'Compléter tous les modules d\'un cours', icon: '🏆', condition: 'all_modules_one_course', hidden: 0 },
    { id: 'quiz-master', name: 'Quiz Master', description: 'Réussir 3 quiz', icon: '🧠', condition: '3_quizzes_passed', hidden: 0 },
    { id: 'perfectionniste', name: 'Perfectionniste', description: 'Obtenir 100% à un quiz', icon: '💎', condition: 'perfect_quiz_score', hidden: 0 },
    { id: 'polyvalent', name: 'Polyvalent', description: 'Commencer 3 cours différents', icon: '🌟', condition: '3_courses_started', hidden: 0 },
    // V3 secret badges
    { id: 'night-owl', name: 'Night Owl', description: 'Étudier après minuit', icon: '🦉', condition: 'study_after_midnight', hidden: 1 },
    { id: 'speed-runner', name: 'Speed Runner', description: 'Terminer un cours en 1 jour', icon: '⚡', condition: 'finish_course_one_day', hidden: 1 },
    { id: 'completionist', name: 'Completionist', description: 'Compléter tous les cours à 100%', icon: '🎖️', condition: 'all_courses_completed', hidden: 1 },
    { id: 'streak-7', name: 'Semaine de feu', description: 'Maintenir un streak de 7 jours', icon: '🔥', condition: 'streak_7_days', hidden: 0 },
    { id: 'streak-30', name: 'Mois de feu', description: 'Maintenir un streak de 30 jours', icon: '🌋', condition: 'streak_30_days', hidden: 1 },
  ];

  for (const badge of badgesData) {
    await db.insert(schema.badges).values(badge).onConflictDoNothing();
  }
  console.log(`  ✅ ${badgesData.length} badges`);

  // Seed glossary
  const glossaryData = [
    { id: 'ci', term: 'CI (Continuous Integration)', definition: 'Pratique consistant à intégrer fréquemment le code dans un dépôt partagé, avec vérification automatique par build et tests.', relatedCourseId: 'jenkins' },
    { id: 'cd', term: 'CD (Continuous Delivery)', definition: 'Extension de la CI qui automatise le déploiement du code en production ou environnement de staging.', relatedCourseId: 'jenkins' },
    { id: 'pipeline', term: 'Pipeline', definition: 'Enchaînement automatisé d\'étapes (build, test, deploy) dans un processus CI/CD.', relatedCourseId: 'jenkins' },
    { id: 'container', term: 'Container', definition: 'Unité standard de logiciel qui empaquète le code et ses dépendances pour une exécution fiable et reproductible.', relatedCourseId: 'docker' },
    { id: 'dockerfile', term: 'Dockerfile', definition: 'Fichier texte contenant les instructions pour construire une image Docker.', relatedCourseId: 'docker' },
    { id: 'image', term: 'Image Docker', definition: 'Template en lecture seule contenant les instructions pour créer un container Docker.', relatedCourseId: 'docker' },
    { id: 'pod', term: 'Pod', definition: 'Plus petite unité déployable dans Kubernetes, contenant un ou plusieurs containers.', relatedCourseId: 'kubernetes' },
    { id: 'deployment', term: 'Deployment', definition: 'Ressource Kubernetes qui gère un ensemble de Pods répliqués et leur mise à jour.', relatedCourseId: 'kubernetes' },
    { id: 'service-k8s', term: 'Service (K8s)', definition: 'Abstraction Kubernetes qui expose un ensemble de Pods comme service réseau.', relatedCourseId: 'kubernetes' },
    { id: 'iac', term: 'IaC (Infrastructure as Code)', definition: 'Gestion de l\'infrastructure via des fichiers de configuration plutôt que manuellement.', relatedCourseId: 'terraform' },
    { id: 'terraform-state', term: 'Terraform State', definition: 'Fichier qui enregistre l\'état actuel de l\'infrastructure gérée par Terraform.', relatedCourseId: 'terraform' },
    { id: 'playbook', term: 'Playbook (Ansible)', definition: 'Fichier YAML décrivant l\'état désiré d\'un système et les tâches pour y parvenir.', relatedCourseId: 'ansible' },
    { id: 'artifact', term: 'Artifact', definition: 'Fichier binaire produit par un build (JAR, WAR, Docker image, npm package).', relatedCourseId: 'artifactory' },
    { id: 'repository-art', term: 'Repository (Artifactory)', definition: 'Espace de stockage organisé pour les artifacts binaires.', relatedCourseId: 'artifactory' },
    { id: 'sonar-gate', term: 'Quality Gate', definition: 'Ensemble de conditions de qualité qu\'un projet doit satisfaire pour être considéré comme prêt.', relatedCourseId: 'sonarqube' },
    { id: 'technical-debt', term: 'Dette technique', definition: 'Coût implicite d\'un travail supplémentaire causé par des choix de solutions rapides au lieu de meilleures approches.', relatedCourseId: 'sonarqube' },
    { id: 'scm', term: 'SCM (Source Control Management)', definition: 'Système de gestion du code source permettant le suivi des modifications.', relatedCourseId: 'git-avance' },
    { id: 'webhook', term: 'Webhook', definition: 'Mécanisme de callback HTTP automatique déclenché par un événement.', relatedCourseId: 'jenkins' },
    { id: 'runner', term: 'Runner (GitLab CI)', definition: 'Agent qui exécute les jobs définis dans le pipeline CI/CD GitLab.', relatedCourseId: 'gitlab-ci' },
    { id: 'yaml', term: 'YAML', definition: 'Format de sérialisation de données lisible par l\'humain, utilisé pour les fichiers de configuration.', relatedCourseId: null },
    { id: 'devops', term: 'DevOps', definition: 'Culture et pratiques combinant développement logiciel et opérations IT pour raccourcir le cycle de développement.', relatedCourseId: null },
    { id: 'microservices', term: 'Microservices', definition: 'Architecture où l\'application est composée de petits services indépendants communiquant via APIs.', relatedCourseId: 'docker' },
    { id: 'orchestration', term: 'Orchestration', definition: 'Gestion automatisée de containers, incluant déploiement, scaling et networking.', relatedCourseId: 'kubernetes' },
    { id: 'helm', term: 'Helm', definition: 'Gestionnaire de paquets pour Kubernetes permettant de définir et installer des applications.', relatedCourseId: 'kubernetes' },
    { id: 'ingress', term: 'Ingress', definition: 'Ressource Kubernetes gérant l\'accès externe aux services dans un cluster.', relatedCourseId: 'kubernetes' },
    { id: 'namespace', term: 'Namespace', definition: 'Mécanisme de partitionnement des ressources dans un cluster Kubernetes.', relatedCourseId: 'kubernetes' },
    { id: 'git-rebase', term: 'Rebase (Git)', definition: 'Opération Git qui réapplique des commits sur une nouvelle base, créant un historique linéaire.', relatedCourseId: 'git-avance' },
    { id: 'git-cherry-pick', term: 'Cherry-pick (Git)', definition: 'Appliquer un commit spécifique d\'une branche sur une autre.', relatedCourseId: 'git-avance' },
    { id: 'docker-compose', term: 'Docker Compose', definition: 'Outil pour définir et exécuter des applications multi-containers avec un fichier YAML.', relatedCourseId: 'docker' },
    { id: 'volume', term: 'Volume (Docker)', definition: 'Mécanisme de persistance des données pour les containers Docker.', relatedCourseId: 'docker' },
    { id: 'registry', term: 'Registry', definition: 'Service de stockage et distribution d\'images Docker (Docker Hub, Harbor, ECR).', relatedCourseId: 'docker' },
    { id: 'hcl', term: 'HCL (HashiCorp Configuration Language)', definition: 'Langage déclaratif de HashiCorp utilisé par Terraform pour décrire l\'infrastructure.', relatedCourseId: 'terraform' },
    { id: 'provider-tf', term: 'Provider (Terraform)', definition: 'Plugin Terraform qui interagit avec un service cloud ou API spécifique.', relatedCourseId: 'terraform' },
    { id: 'inventory', term: 'Inventory (Ansible)', definition: 'Fichier listant les hôtes et groupes d\'hôtes gérés par Ansible.', relatedCourseId: 'ansible' },
    { id: 'role-ansible', term: 'Role (Ansible)', definition: 'Unité réutilisable de contenu Ansible (tâches, handlers, variables, templates).', relatedCourseId: 'ansible' },
    { id: 'sast', term: 'SAST', definition: 'Static Application Security Testing - analyse de sécurité du code source sans l\'exécuter.', relatedCourseId: 'sonarqube' },
    { id: 'code-smell', term: 'Code Smell', definition: 'Indication dans le code source d\'un problème potentiel de design ou de qualité.', relatedCourseId: 'sonarqube' },
    { id: 'jenkins-agent', term: 'Jenkins Agent', definition: 'Machine qui exécute les tâches d\'un pipeline Jenkins, dirigée par le controller.', relatedCourseId: 'jenkins' },
    { id: 'jenkinsfile', term: 'Jenkinsfile', definition: 'Fichier Groovy décrivant un pipeline Jenkins as Code.', relatedCourseId: 'jenkins' },
    { id: 'blue-green', term: 'Blue-Green Deployment', definition: 'Stratégie de déploiement utilisant deux environnements identiques pour zéro-downtime.', relatedCourseId: null },
    { id: 'canary', term: 'Canary Deployment', definition: 'Déploiement progressif où une nouvelle version est exposée à un petit pourcentage d\'utilisateurs.', relatedCourseId: null },
    { id: 'monitoring', term: 'Monitoring', definition: 'Surveillance continue des systèmes pour détecter et résoudre les problèmes.', relatedCourseId: null },
    { id: 'sre', term: 'SRE (Site Reliability Engineering)', definition: 'Discipline appliquant les pratiques d\'ingénierie logicielle aux opérations IT.', relatedCourseId: null },
    { id: 'gitops', term: 'GitOps', definition: 'Paradigme opérationnel utilisant Git comme source unique de vérité pour l\'infrastructure.', relatedCourseId: 'git-avance' },
    { id: 'load-balancer', term: 'Load Balancer', definition: 'Composant réseau distribuant le trafic entre plusieurs serveurs.', relatedCourseId: null },
    { id: 'dns', term: 'DNS', definition: 'Système traduisant les noms de domaine en adresses IP.', relatedCourseId: null },
    { id: 'ssl-tls', term: 'SSL/TLS', definition: 'Protocoles cryptographiques sécurisant les communications réseau.', relatedCourseId: null },
    { id: 'twelve-factor', term: '12-Factor App', definition: 'Méthodologie pour construire des applications SaaS modernes, portables et scalables.', relatedCourseId: 'docker' },
    { id: 'idempotence', term: 'Idempotence', definition: 'Propriété d\'une opération qui produit le même résultat qu\'elle soit exécutée une ou plusieurs fois.', relatedCourseId: 'ansible' },
    { id: 'immutable-infra', term: 'Infrastructure Immuable', definition: 'Approche où les serveurs ne sont jamais modifiés après déploiement mais remplacés.', relatedCourseId: 'terraform' },
  ];

  for (const g of glossaryData) {
    await db.run(sql`INSERT OR IGNORE INTO glossary (id, term, definition, related_course_id) VALUES (${g.id}, ${g.term}, ${g.definition}, ${g.relatedCourseId})`);
  }
  console.log(`  ✅ ${glossaryData.length} glossary terms`);

  // Seed exercises
  const exercisesData = [
    { id: 'ex-jenkins-1', moduleId: 'jenkins-mod1', instruction: 'Quelle commande permet de démarrer Jenkins en mode standalone?', expectedAnswer: 'java -jar jenkins.war', hint: 'Utiliser java -jar avec le fichier WAR' },
    { id: 'ex-jenkins-2', moduleId: 'jenkins-mod2', instruction: 'Dans un Jenkinsfile, quelle directive définit une étape du pipeline?', expectedAnswer: 'stage', hint: 'C\'est un bloc nommé dans le pipeline' },
    { id: 'ex-docker-1', moduleId: 'docker-mod1', instruction: 'Quelle commande lance un container en mode détaché?', expectedAnswer: 'docker run -d', hint: 'Le flag -d signifie detached' },
    { id: 'ex-docker-2', moduleId: 'docker-mod2', instruction: 'Quelle instruction Dockerfile copie des fichiers dans l\'image?', expectedAnswer: 'COPY', hint: 'C\'est une instruction en majuscules' },
    { id: 'ex-k8s-1', moduleId: 'kubernetes-mod1', instruction: 'Quelle commande liste tous les pods du namespace actuel?', expectedAnswer: 'kubectl get pods', hint: 'Utiliser kubectl get avec le type de ressource' },
    { id: 'ex-k8s-2', moduleId: 'kubernetes-mod2', instruction: 'Quel objet Kubernetes expose un Deployment via un port réseau?', expectedAnswer: 'service', hint: 'C\'est l\'abstraction réseau de K8s' },
    { id: 'ex-terraform-1', moduleId: 'terraform-mod1', instruction: 'Quelle commande initialise un projet Terraform?', expectedAnswer: 'terraform init', hint: 'C\'est toujours la première commande à exécuter' },
    { id: 'ex-terraform-2', moduleId: 'terraform-mod2', instruction: 'Quelle commande affiche le plan d\'exécution Terraform?', expectedAnswer: 'terraform plan', hint: 'Permet de prévisualiser les changements' },
    { id: 'ex-ansible-1', moduleId: 'ansible-mod1', instruction: 'Quel module Ansible installe un package?', expectedAnswer: 'apt', hint: 'Pour les systèmes Debian/Ubuntu' },
    { id: 'ex-ansible-2', moduleId: 'ansible-mod2', instruction: 'Quel fichier liste les hôtes gérés par Ansible?', expectedAnswer: 'inventory', hint: 'C\'est le fichier d\'inventaire' },
  ];

  for (const ex of exercisesData) {
    await db.run(sql`INSERT OR IGNORE INTO exercises (id, module_id, instruction, expected_answer, hint, xp_reward) VALUES (${ex.id}, ${ex.moduleId}, ${ex.instruction}, ${ex.expectedAnswer}, ${ex.hint}, 25)`);
  }
  console.log(`  ✅ ${exercisesData.length} exercises`);

  // Seed weekly challenges (current week)
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - now.getDay() + 1);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const weekStart = monday.toISOString().split('T')[0];
  const weekEnd = sunday.toISOString().split('T')[0];

  const challengesData = [
    { id: 'ch-modules-3', title: 'Compléter 3 modules', description: 'Terminez 3 modules cette semaine', targetCount: 3, xpReward: 100, weekStart, weekEnd },
    { id: 'ch-quiz-2', title: 'Réussir 2 quiz', description: 'Passez 2 quiz avec succès cette semaine', targetCount: 2, xpReward: 150, weekStart, weekEnd },
    { id: 'ch-study-5', title: 'Étudier 5 jours', description: 'Connectez-vous et étudiez pendant 5 jours cette semaine', targetCount: 5, xpReward: 200, weekStart, weekEnd },
  ];

  for (const ch of challengesData) {
    await db.run(sql`INSERT OR REPLACE INTO challenges (id, title, description, target_count, xp_reward, week_start, week_end) VALUES (${ch.id}, ${ch.title}, ${ch.description}, ${ch.targetCount}, ${ch.xpReward}, ${ch.weekStart}, ${ch.weekEnd})`);
  }
  console.log(`  ✅ ${challengesData.length} challenges`);

  console.log('🎉 Seeding v3 complete!');
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
