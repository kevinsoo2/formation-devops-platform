export const translations = {
  fr: {
    nav: { home: 'Accueil', courses: 'Formations', dashboard: 'Tableau de bord', leaderboard: 'Classement', glossary: 'Glossaire', forum: 'Forum', favorites: 'Favoris', paths: 'Parcours', admin: 'Admin' },
    auth: { login: 'Connexion', register: 'Inscription', logout: 'Déconnexion', username: "Nom d'utilisateur", password: 'Mot de passe', email: 'Email' },
    dashboard: { title: 'Tableau de bord', subtitle: 'Suivez votre progression', xp: 'Points XP', level: 'Niveau', modules_done: 'Modules terminés', quiz_passed: 'Quiz réussis', streak: 'Streak', challenges: 'Défis de la semaine', study_time: 'Temps d\'étude', heatmap: 'Activité' },
    courses: { title: 'Formations disponibles', progress: 'Progression', duration: 'Durée', level: 'Niveau', complete: 'Marquer comme terminé', completed: 'Module terminé' },
    common: { search: 'Rechercher', loading: 'Chargement...', save: 'Enregistrer', cancel: 'Annuler', delete: 'Supprimer', close: 'Fermer', back: 'Retour', next: 'Suivant', prev: 'Précédent', submit: 'Soumettre', share: 'Partager', notifications: 'Notifications', settings: 'Paramètres', profile: 'Profil', no_results: 'Aucun résultat' },
    glossary: { title: 'Glossaire DevOps', subtitle: 'Termes et définitions essentiels', search_placeholder: 'Rechercher un terme...' },
    forum: { title: 'Forum Q&A', new_post: 'Nouveau sujet', reply: 'Répondre', upvote: 'Voter', no_posts: 'Aucun sujet pour le moment' },
    favorites: { title: 'Mes favoris', empty: 'Aucun favori pour le moment' },
    paths: { title: 'Parcours d\'apprentissage', subtitle: 'Suivez un parcours guidé' },
    shortcuts: { title: 'Raccourcis clavier', search: 'Ouvrir la recherche', nav_prev: 'Module précédent', nav_next: 'Module suivant', help: 'Afficher l\'aide' },
    accessibility: { font_size: 'Taille de police', high_contrast: 'Contraste élevé', dyslexic_font: 'Police OpenDyslexic' },
  },
  en: {
    nav: { home: 'Home', courses: 'Courses', dashboard: 'Dashboard', leaderboard: 'Leaderboard', glossary: 'Glossary', forum: 'Forum', favorites: 'Favorites', paths: 'Paths', admin: 'Admin' },
    auth: { login: 'Login', register: 'Register', logout: 'Logout', username: 'Username', password: 'Password', email: 'Email' },
    dashboard: { title: 'Dashboard', subtitle: 'Track your progress', xp: 'XP Points', level: 'Level', modules_done: 'Modules completed', quiz_passed: 'Quizzes passed', streak: 'Streak', challenges: 'Weekly challenges', study_time: 'Study time', heatmap: 'Activity' },
    courses: { title: 'Available courses', progress: 'Progress', duration: 'Duration', level: 'Level', complete: 'Mark as complete', completed: 'Module completed' },
    common: { search: 'Search', loading: 'Loading...', save: 'Save', cancel: 'Cancel', delete: 'Delete', close: 'Close', back: 'Back', next: 'Next', prev: 'Previous', submit: 'Submit', share: 'Share', notifications: 'Notifications', settings: 'Settings', profile: 'Profile', no_results: 'No results' },
    glossary: { title: 'DevOps Glossary', subtitle: 'Essential terms and definitions', search_placeholder: 'Search a term...' },
    forum: { title: 'Forum Q&A', new_post: 'New topic', reply: 'Reply', upvote: 'Upvote', no_posts: 'No topics yet' },
    favorites: { title: 'My favorites', empty: 'No favorites yet' },
    paths: { title: 'Learning Paths', subtitle: 'Follow a guided path' },
    shortcuts: { title: 'Keyboard shortcuts', search: 'Open search', nav_prev: 'Previous module', nav_next: 'Next module', help: 'Show help' },
    accessibility: { font_size: 'Font size', high_contrast: 'High contrast', dyslexic_font: 'OpenDyslexic font' },
  },
};

export function t(lang, key) {
  const keys = key.split('.');
  let val = translations[lang] || translations.fr;
  for (const k of keys) {
    val = val?.[k];
  }
  return val || key;
}
