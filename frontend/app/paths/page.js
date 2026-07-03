'use client';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';

const PATHS = [
  {
    id: 'devops-junior',
    title: 'Parcours DevOps Junior',
    duration: '6 semaines',
    description: 'De zéro à héros DevOps. Apprenez les fondamentaux CI/CD, conteneurisation et orchestration.',
    icon: '🚀',
    courses: [
      { id: 'jenkins', week: 1, title: 'Jenkins - CI/CD' },
      { id: 'docker', week: 2, title: 'Docker - Conteneurisation' },
      { id: 'kubernetes', week: 3, title: 'Kubernetes - Orchestration' },
      { id: 'terraform', week: 5, title: 'Terraform - IaC' },
      { id: 'ansible', week: 6, title: 'Ansible - Configuration' },
    ],
  },
  {
    id: 'qualite',
    title: 'Parcours Qualité',
    duration: '4 semaines',
    description: 'Maîtrisez les outils de qualité et d\'analyse de code pour des projets robustes.',
    icon: '🔍',
    courses: [
      { id: 'sonarqube', week: 1, title: 'SonarQube - Qualité de code' },
      { id: 'klocwork', week: 2, title: 'Klocwork - Analyse statique' },
      { id: 'artifactory', week: 3, title: 'Artifactory - Artefacts' },
    ],
  },
  {
    id: 'atlassian',
    title: 'Parcours Atlassian',
    duration: '3 semaines',
    description: 'Découvrez l\'écosystème Atlassian pour la gestion de projet et le travail collaboratif.',
    icon: '🔷',
    courses: [
      { id: 'jira', week: 1, title: 'Jira - Gestion de projet' },
      { id: 'confluence', week: 2, title: 'Confluence - Documentation' },
      { id: 'bitbucket', week: 3, title: 'Bitbucket - Code & CI/CD' },
    ],
  },
  {
    id: 'git-expert',
    title: 'Parcours Git Expert',
    duration: '3 semaines',
    description: 'Devenez un expert Git et maîtrisez les workflows de versionnement modernes.',
    icon: '🔀',
    courses: [
      { id: 'git-avance', week: 1, title: 'Git Avancé' },
      { id: 'gitlab-ci', week: 2, title: 'GitLab CI/CD' },
      { id: 'bitbucket', week: 3, title: 'Bitbucket Pipelines' },
    ],
  },
];

export default function PathsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Breadcrumbs items={[{ label: 'Accueil', href: '/' }, { label: 'Parcours' }]} />
      <h1 className="text-3xl font-extrabold mb-2">🗺️ Parcours d'apprentissage</h1>
      <p className="text-gray-400 mb-8">Suivez un parcours guidé pour progresser étape par étape</p>

      <div className="space-y-8">
        {PATHS.map(path => (
          <div key={path.id} className="card">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl">{path.icon}</span>
              <div>
                <h2 className="text-xl font-bold">{path.title}</h2>
                <p className="text-sm text-purple-400">{path.duration}</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">{path.description}</p>
            
            {/* Timeline */}
            <div className="relative pl-6 border-l-2 border-purple-500/30">
              {path.courses.map((course, i) => (
                <div key={course.id} className="mb-4 last:mb-0 relative">
                  <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-purple-500 border-2 border-dark"></div>
                  <Link href={`/courses/${course.id}`} className="block ml-4 p-3 rounded-lg bg-surface border border-border hover:border-purple-500/50 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{course.title}</span>
                      <span className="text-xs text-gray-500">Semaine {course.week}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
