'use client';

const CHANGELOG = [
  {
    version: 'v3.5',
    date: 'Juillet 2026',
    color: 'bg-purple-500',
    title: 'Admin avancé, Chatbot & Notifications',
    items: [
      'Dashboard admin complet avec gestion utilisateurs',
      'Chatbot FAQ intelligent avec réponses préprogrammées',
      'Notifications navigateur (badge, quiz quotidien)',
      'Export CSV de la progression des utilisateurs',
      'Page statistiques publique de la plateforme',
      'Easter eggs et écran de chargement',
      'Pages À propos et Changelog',
    ],
  },
  {
    version: 'v3.4',
    date: 'Juillet 2026',
    color: 'bg-blue-500',
    title: 'Landing page pro, logo & vidéos',
    items: [
      'Nouvelle landing page professionnelle',
      'Logo DevOps Academy redesigné',
      'Vidéos intégrées dans les modules',
      '4 nouveaux cours : AWS, Azure, GCP, ArgoCD',
      'Système d\'emails avec Resend',
    ],
  },
  {
    version: 'v3.3',
    date: 'Juillet 2026',
    color: 'bg-green-500',
    title: '23 améliorations UX',
    items: [
      'Animations fluides sur toutes les pages',
      'Mode sombre amélioré',
      'Quiz interactifs avec timer',
      'Cheatsheets pour chaque outil',
      'Raccourcis clavier',
      'Barre de progression de scroll',
    ],
  },
  {
    version: 'v3.2',
    date: 'Juillet 2026',
    color: 'bg-yellow-500',
    title: 'Glossaire & Flashcards',
    items: [
      'Glossaire de 244 termes DevOps',
      'Système de flashcards pour réviser',
      'Navigation améliorée entre les pages',
      'Recherche dans le glossaire',
    ],
  },
  {
    version: 'v3.1',
    date: 'Juillet 2026',
    color: 'bg-orange-500',
    title: 'Streak, Heatmap & Communauté',
    items: [
      'Système de streak quotidien',
      'Heatmap d\'activité (style GitHub)',
      'Notes personnelles par module',
      'Système de favoris',
      'PWA installable',
      'Forum communautaire',
    ],
  },
  {
    version: 'v3.0',
    date: 'Juillet 2026',
    color: 'bg-red-500',
    title: '6 nouveaux cours',
    items: [
      'Docker : conteneurs et orchestration',
      'Kubernetes : déploiement à grande échelle',
      'Terraform : infrastructure as code',
      'Ansible : automatisation de configuration',
      'GitLab CI : pipeline CI/CD',
      'Git : maîtrise du versioning',
    ],
  },
  {
    version: 'v2.0',
    date: 'Juillet 2026',
    color: 'bg-indigo-500',
    title: 'Authentification & Gamification',
    items: [
      'Système d\'authentification JWT',
      'XP et niveaux',
      'Badges et achievements',
      'Leaderboard global',
      'Recherche intelligente',
      'Certificats de complétion',
    ],
  },
  {
    version: 'v1.0',
    date: 'Juillet 2026',
    color: 'bg-gray-500',
    title: 'Lancement de la plateforme',
    items: [
      'Lancement avec 9 cours originaux',
      'Système de modules et de quiz',
      'Interface responsive',
      'API REST Express.js',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold mb-2">📋 Changelog</h1>
      <p className="text-gray-400 mb-10">Historique des mises à jour de DevOps Academy</p>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

        {/* Entries */}
        <div className="space-y-8">
          {CHANGELOG.map((entry, i) => (
            <div key={i} className="relative pl-16">
              {/* Dot */}
              <div className={`absolute left-4 top-2 w-5 h-5 rounded-full ${entry.color} border-4 border-gray-900`} />
              
              {/* Content */}
              <div className="card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold text-white ${entry.color}`}>
                    {entry.version}
                  </span>
                  <span className="text-sm text-gray-500">{entry.date}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{entry.title}</h3>
                <ul className="space-y-1">
                  {entry.items.map((item, j) => (
                    <li key={j} className="text-sm text-gray-400 flex items-start gap-2">
                      <span className="text-purple-400 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
