'use client';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';

const PROJECTS = [
  {
    id: 'deploy-k8s',
    title: 'Déployer une app sur Kubernetes',
    description: 'Projet complet de bout en bout : conteneurisez une application avec Docker, créez les manifestes Kubernetes, déployez avec Helm et configurez le monitoring.',
    difficulty: 'Intermédiaire',
    duration: '8-12 heures',
    tools: ['Docker', 'Kubernetes', 'Helm', 'kubectl'],
    icon: '☸️',
    color: '#326CE5',
    steps: [
      'Créer une application Node.js/Python simple',
      'Écrire un Dockerfile multi-stage optimisé',
      'Construire et publier l\'image sur un registry',
      'Écrire les manifestes K8s (Deployment, Service, Ingress)',
      'Créer un chart Helm avec values configurables',
      'Déployer sur un cluster (minikube ou cloud)',
      'Configurer le HPA (autoscaling)',
      'Ajouter le monitoring avec Prometheus',
    ],
  },
  {
    id: 'pipeline-cicd',
    title: 'Pipeline CI/CD complet',
    description: 'Mettez en place un pipeline CI/CD professionnel avec tests automatisés, analyse de code, build Docker, et déploiement automatique sur plusieurs environnements.',
    difficulty: 'Intermédiaire à Avancé',
    duration: '10-15 heures',
    tools: ['Git', 'Jenkins', 'GitLab CI', 'Docker', 'SonarQube'],
    icon: '🔄',
    color: '#D24939',
    steps: [
      'Initialiser un repo Git avec branching strategy',
      'Configurer Jenkins/GitLab CI avec agents Docker',
      'Ajouter les étapes de lint et tests unitaires',
      'Intégrer SonarQube pour l\'analyse de code',
      'Build et push de l\'image Docker',
      'Déployer sur environnement staging automatiquement',
      'Configurer les gates de qualité',
      'Déploiement production avec approbation manuelle',
    ],
  },
  {
    id: 'iac-infra',
    title: 'Infrastructure as Code complète',

    description: 'Provisionnez une infrastructure cloud complète avec Terraform, configurez les serveurs avec Ansible, et mettez en place le monitoring avec Prometheus et Grafana.',
    difficulty: 'Avancé',
    duration: '12-18 heures',
    tools: ['Terraform', 'Ansible', 'Prometheus', 'Grafana'],
    icon: '🏗️',
    color: '#7B42BC',
    steps: [
      'Définir l\'architecture cible (réseau, serveurs, BDD)',
      'Écrire les modules Terraform (VPC, EC2, RDS)',
      'Configurer le state distant (S3 + DynamoDB)',
      'Créer les playbooks Ansible pour la configuration',
      'Installer et configurer Prometheus sur les serveurs',
      'Créer les dashboards Grafana',
      'Configurer les alertes (AlertManager)',
      'Automatiser le tout dans un pipeline CI/CD',
    ],
  },
];

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Breadcrumbs items={[{ label: 'Accueil', href: '/' }, { label: 'Projets' }]} />
      <h1 className="text-3xl font-extrabold mb-2">🛠️ Projets pratiques</h1>
      <p className="text-gray-400 mb-8">
        Mettez en pratique vos connaissances avec des projets complets de bout en bout
      </p>

      <div className="space-y-8">
        {PROJECTS.map(project => (
          <div key={project.id} className="card">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-4xl">{project.icon}</span>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-1">{project.title}</h2>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-500/10 text-purple-400">
                    {project.difficulty}
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-surface text-gray-400">
                    ⏱ {project.duration}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{project.description}</p>
              </div>
            </div>

            {/* Tools */}
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2 font-semibold">Outils utilisés :</p>
              <div className="flex flex-wrap gap-2">
                {project.tools.map(tool => (
                  <span key={tool} className="px-3 py-1 rounded-full text-xs bg-surface border border-border text-gray-300">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div>
              <p className="text-xs text-gray-500 mb-3 font-semibold">Étapes du projet :</p>
              <div className="relative pl-6 border-l-2 border-purple-500/30">
                {project.steps.map((step, i) => (
                  <div key={i} className="mb-3 last:mb-0 relative">
                    <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center">
                      <span className="text-[8px] text-purple-400 font-bold">{i + 1}</span>
                    </div>
                    <p className="ml-4 text-sm text-gray-400">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm mb-4">
          Ces projets combinent plusieurs formations. Assurez-vous d&apos;avoir suivi les cours correspondants.
        </p>
        <Link href="/courses" className="btn-primary">
          Voir les formations →
        </Link>
      </div>
    </div>
  );
}
