'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useAuth } from '../../contexts/AuthContext';

const PATHS = [
  {
    id: 'devops-complet',
    title: 'Parcours DevOps Complet',
    duration: '8 semaines',
    description: 'De zéro à expert DevOps. Maîtrisez tous les outils essentiels pour une carrière DevOps.',
    icon: '🚀',
    color: '#a855f7',
    weeks: [
      { week: 1, title: 'Git & Versionnement', courses: ['git-avance'], hours: 10, objectives: ['Maîtriser Git avancé', 'Comprendre les workflows de branching'] },
      { week: 2, title: 'Conteneurisation', courses: ['docker'], hours: 12, objectives: ['Écrire des Dockerfiles optimisés', 'Utiliser Docker Compose'] },
      { week: 3, title: 'Orchestration', courses: ['kubernetes'], hours: 16, objectives: ['Déployer sur Kubernetes', 'Gérer les services et ingress'] },
      { week: 4, title: 'Infrastructure as Code', courses: ['terraform'], hours: 14, objectives: ['Écrire du HCL', 'Gérer le state Terraform'] },
      { week: 5, title: 'Configuration Management', courses: ['ansible'], hours: 12, objectives: ['Créer des playbooks', 'Utiliser les roles Ansible'] },
      { week: 6, title: 'CI/CD', courses: ['jenkins', 'gitlab-ci'], hours: 12, objectives: ['Configurer des pipelines', 'Automatiser les déploiements'] },
      { week: 7, title: 'Monitoring', courses: ['prometheus', 'grafana'], hours: 10, objectives: ['Collecter des métriques', 'Créer des dashboards'] },
      { week: 8, title: 'Projet final', courses: [], hours: 12, objectives: ['Déployer une app complète', 'Pipeline CI/CD end-to-end'] },
    ],
  },
  {
    id: 'cicd',
    title: 'Parcours CI/CD',
    duration: '4 semaines',

    description: 'Spécialisez-vous en intégration et déploiement continu avec les outils modernes.',
    icon: '🔄',
    color: '#3b82f6',
    weeks: [
      { week: 1, title: 'Git & Branching', courses: ['git-avance'], hours: 10, objectives: ['Maîtriser les workflows Git', 'Configurer les hooks'] },
      { week: 2, title: 'Jenkins', courses: ['jenkins'], hours: 10, objectives: ['Créer des Jenkinsfile', 'Configurer les agents'] },
      { week: 3, title: 'GitLab CI & Docker', courses: ['gitlab-ci', 'docker'], hours: 12, objectives: ['Écrire des pipelines GitLab CI', 'Build d\'images Docker'] },
      { week: 4, title: 'Déploiement K8s', courses: ['kubernetes'], hours: 14, objectives: ['Déployer sur Kubernetes', 'Configurer le CD automatique'] },
    ],
  },
  {
    id: 'qualite-securite',
    title: 'Parcours Qualité & Sécurité',
    duration: '3 semaines',
    description: 'Maîtrisez les outils de qualité de code et d\'analyse statique pour des projets robustes.',
    icon: '🛡️',
    color: '#10b981',
    weeks: [
      { week: 1, title: 'Analyse de code', courses: ['sonarqube'], hours: 8, objectives: ['Configurer SonarQube', 'Comprendre les métriques de qualité'] },
      { week: 2, title: 'Analyse statique avancée', courses: ['klocwork'], hours: 8, objectives: ['Détecter les vulnérabilités', 'Analyser le code C/C++'] },
      { week: 3, title: 'Gestion des artefacts', courses: ['artifactory'], hours: 8, objectives: ['Gérer les dépendances', 'Configurer les repositories'] },
    ],
  },
];

export default function PathsPage() {
  const { user } = useAuth();
  const [progress, setProgress] = useState({});
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    if (!user) return;
    fetch(`${API_URL}/api/progress/${user.id}`)
      .then(r => r.json())
      .then(d => { if (d.data) setProgress(d.data); })
      .catch(() => {});
  }, [user, API_URL]);

  function getPathProgress(path) {
    if (!user) return 0;
    const allCourses = path.weeks.flatMap(w => w.courses);
    if (allCourses.length === 0) return 0;
    const completed = allCourses.filter(c => progress[c]?.completedModules?.length > 0).length;
    return Math.round((completed / allCourses.length) * 100);
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Breadcrumbs items={[{ label: 'Accueil', href: '/' }, { label: 'Parcours' }]} />
      <h1 className="text-3xl font-extrabold mb-2">🗺️ Parcours d&apos;apprentissage</h1>
      <p className="text-gray-400 mb-8">Suivez un parcours structuré semaine par semaine pour progresser efficacement</p>

      <div className="space-y-10">
        {PATHS.map(path => {
          const pathProgress = getPathProgress(path);
          return (
            <div key={path.id} className="card">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{path.icon}</span>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{path.title}</h2>
                  <p className="text-sm text-purple-400">{path.duration}</p>
                </div>
                {user && pathProgress > 0 && (
                  <div className="text-right">
                    <span className="text-sm font-bold text-purple-400">{pathProgress}%</span>
                  </div>
                )}
              </div>
              <p className="text-gray-400 text-sm mb-4">{path.description}</p>


              {/* Progress bar */}
              {user && (
                <div className="mb-6">
                  <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full transition-all duration-500" style={{ width: `${pathProgress}%` }} />
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div className="relative pl-8 border-l-2 border-purple-500/30">
                {path.weeks.map((week, i) => (
                  <div key={i} className="mb-6 last:mb-0 relative">
                    <div className="absolute -left-[33px] w-6 h-6 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center">
                      <span className="text-[10px] text-purple-400 font-bold">{week.week}</span>
                    </div>
                    <div className="ml-2 p-4 rounded-lg bg-surface border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-sm">Semaine {week.week} : {week.title}</h3>
                        <span className="text-xs text-gray-500">~{week.hours}h</span>
                      </div>
                      {/* Courses */}
                      {week.courses.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {week.courses.map(courseId => (
                            <Link key={courseId} href={`/courses/${courseId}`} className="px-2 py-1 rounded text-xs bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors">
                              {courseId}
                            </Link>
                          ))}
                        </div>
                      )}
                      {/* Objectives */}
                      <ul className="text-xs text-gray-500 space-y-0.5">
                        {week.objectives.map((obj, j) => (
                          <li key={j}>• {obj}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
