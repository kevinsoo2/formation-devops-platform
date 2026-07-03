'use client';

const tips = [
  "Utilisez `docker system prune` pour nettoyer les ressources inutilisées.",
  "Dans Kubernetes, un Pod est l'unité la plus petite de déploiement.",
  "Terraform `plan` avant `apply` - toujours vérifier avant d'appliquer.",
  "Ansible est idempotent : relancer un playbook ne change rien si l'état est correct.",
  "Utilisez `git stash` pour sauvegarder temporairement vos modifications.",
  "Les multi-stage builds Docker réduisent la taille de vos images de 80%.",
  "Un Service Kubernetes de type ClusterIP n'est accessible que depuis le cluster.",
  "Terraform state doit être stocké dans un backend distant (S3, GCS) en équipe.",
  "Les rôles Ansible favorisent la réutilisabilité du code d'automatisation.",
  "GitLab CI: utilisez `cache` pour accélérer les pipelines entre les jobs.",
  "`git rebase -i` permet de réécrire l'historique proprement avant un merge.",
  "Docker Compose v2 est intégré directement dans la CLI Docker.",
  "Les labels Kubernetes permettent de sélectionner et filtrer les ressources.",
  "Utilisez `terraform workspace` pour gérer plusieurs environnements.",
  "Ansible Vault chiffre vos secrets directement dans le code.",
  "`git bisect` aide à trouver le commit qui a introduit un bug.",
  "Les health checks Docker maintiennent la fiabilité de vos containers.",
  "Un Ingress Kubernetes gère le routage HTTP/HTTPS vers vos services.",
  "Les modules Terraform encapsulent des groupes de ressources réutilisables.",
  "Utilisez `ansible-lint` pour vérifier la qualité de vos playbooks.",
  "Les pipelines GitLab CI supportent le DAG pour l'exécution parallèle.",
  "`git cherry-pick` copie un commit spécifique vers une autre branche.",
  "Docker BuildKit accélère les builds avec le cache parallèle.",
  "Les ConfigMaps Kubernetes séparent la config du code applicatif.",
  "`terraform fmt` formate automatiquement vos fichiers HCL.",
  "Les handlers Ansible ne s'exécutent que si notifiés par une tâche changée.",
  "GitLab CI: les artifacts permettent de partager des fichiers entre jobs.",
  "Utilisez `git reflog` pour récupérer des commits perdus.",
  "Les Secrets Kubernetes encodent les données sensibles en base64.",
  "Terraform `import` intègre des ressources existantes dans votre state.",
  "L'option `--no-install-recommends` réduit la taille des images Docker.",
  "Les DaemonSets Kubernetes déploient un Pod sur chaque noeud du cluster.",
  "`terraform validate` vérifie la syntaxe avant de planifier.",
  "Ansible: `become: true` exécute les tâches avec des privilèges élevés.",
  "Les merge request templates GitLab standardisent les revues de code.",
];

export default function DailyTip() {
  // Deterministic tip based on current date
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
  const tipIndex = dayOfYear % tips.length;
  const tip = tips[tipIndex];

  return (
    <div className="card border-yellow-500/30 bg-yellow-500/5 animate-fade-in">
      <div className="flex items-start gap-4">
        <span className="text-3xl">💡</span>
        <div>
          <h3 className="font-semibold text-sm text-yellow-400 mb-1">Astuce du jour</h3>
          <p className="text-sm text-gray-300">{tip}</p>
        </div>
      </div>
    </div>
  );
}
