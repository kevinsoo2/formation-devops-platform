'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const cheatsheetData = {
  docker: {
    title: 'Docker',
    icon: '🐳',
    sections: [
      { title: 'Images', commands: [
        { cmd: 'docker build -t nom:tag .', desc: 'Construire une image depuis un Dockerfile' },
        { cmd: 'docker images', desc: 'Lister les images locales' },
        { cmd: 'docker pull image:tag', desc: 'Télécharger une image depuis un registry' },
        { cmd: 'docker push image:tag', desc: 'Pousser une image vers un registry' },
        { cmd: 'docker rmi image:tag', desc: 'Supprimer une image' },
        { cmd: 'docker image prune', desc: 'Supprimer les images non utilisées' },
        { cmd: 'docker tag source:tag target:tag', desc: 'Taguer une image' },
      ]},
      { title: 'Containers', commands: [
        { cmd: 'docker run -d --name c image', desc: 'Lancer un container en arrière-plan' },
        { cmd: 'docker run -it image bash', desc: 'Lancer interactivement avec shell' },
        { cmd: 'docker run -p 8080:80 image', desc: 'Mapper le port 80 vers 8080' },
        { cmd: 'docker ps', desc: 'Lister les containers actifs' },
        { cmd: 'docker ps -a', desc: 'Lister tous les containers' },
        { cmd: 'docker stop container', desc: 'Arrêter un container' },
        { cmd: 'docker rm container', desc: 'Supprimer un container' },
        { cmd: 'docker exec -it container bash', desc: 'Exécuter une commande dans un container' },
        { cmd: 'docker logs -f container', desc: 'Voir les logs en temps réel' },
      ]},
      { title: 'Volumes & Réseaux', commands: [
        { cmd: 'docker volume create vol', desc: 'Créer un volume' },
        { cmd: 'docker run -v vol:/data image', desc: 'Monter un volume' },
        { cmd: 'docker run -v ./src:/app image', desc: 'Bind mount (dev)' },
        { cmd: 'docker network create net', desc: 'Créer un réseau' },
        { cmd: 'docker network ls', desc: 'Lister les réseaux' },
        { cmd: 'docker run --network net image', desc: 'Connecter à un réseau' },
      ]},
      { title: 'Docker Compose', commands: [
        { cmd: 'docker compose up -d', desc: 'Démarrer les services' },
        { cmd: 'docker compose down', desc: 'Arrêter et supprimer' },
        { cmd: 'docker compose logs -f', desc: 'Logs de tous les services' },
        { cmd: 'docker compose build', desc: 'Reconstruire les images' },
        { cmd: 'docker compose ps', desc: 'État des services' },
        { cmd: 'docker compose exec svc cmd', desc: 'Exécuter dans un service' },
      ]},
    ],
  },
  kubernetes: {
    title: 'Kubernetes',
    icon: '☸️',
    sections: [
      { title: 'Pods & Deployments', commands: [
        { cmd: 'kubectl get pods', desc: 'Lister les pods' },
        { cmd: 'kubectl get pods -o wide', desc: 'Pods avec détails (IP, node)' },
        { cmd: 'kubectl describe pod nom', desc: 'Détails complets d\'un pod' },
        { cmd: 'kubectl logs pod -f', desc: 'Logs en temps réel' },
        { cmd: 'kubectl exec -it pod -- bash', desc: 'Shell dans un pod' },
        { cmd: 'kubectl apply -f manifest.yaml', desc: 'Appliquer un manifeste' },
        { cmd: 'kubectl delete pod nom', desc: 'Supprimer un pod' },
        { cmd: 'kubectl scale deploy nom --replicas=3', desc: 'Scaler un deployment' },
      ]},
      { title: 'Services & Ingress', commands: [
        { cmd: 'kubectl get svc', desc: 'Lister les services' },
        { cmd: 'kubectl expose deploy nom --port=80', desc: 'Exposer un deployment' },
        { cmd: 'kubectl get ingress', desc: 'Lister les ingress' },
        { cmd: 'kubectl port-forward svc/nom 8080:80', desc: 'Port-forward local' },
      ]},
      { title: 'Configuration', commands: [
        { cmd: 'kubectl get configmap', desc: 'Lister les ConfigMaps' },
        { cmd: 'kubectl get secrets', desc: 'Lister les secrets' },
        { cmd: 'kubectl create cm nom --from-file=f', desc: 'Créer ConfigMap depuis fichier' },
        { cmd: 'kubectl create secret generic nom', desc: 'Créer un secret' },
      ]},
      { title: 'Debug & Info', commands: [
        { cmd: 'kubectl get nodes', desc: 'Lister les noeuds' },
        { cmd: 'kubectl get events --sort-by=time', desc: 'Événements récents' },
        { cmd: 'kubectl top pods', desc: 'Ressources utilisées par pods' },
        { cmd: 'kubectl get all -n namespace', desc: 'Toutes ressources d\'un namespace' },
        { cmd: 'kubectl rollout status deploy/nom', desc: 'Status du rollout' },
        { cmd: 'kubectl rollout undo deploy/nom', desc: 'Rollback un deployment' },
      ]},
    ],
  },
  terraform: {
    title: 'Terraform',
    icon: '🏗️',
    sections: [
      { title: 'Workflow de base', commands: [
        { cmd: 'terraform init', desc: 'Initialiser le répertoire de travail' },
        { cmd: 'terraform plan', desc: 'Prévisualiser les changements' },
        { cmd: 'terraform apply', desc: 'Appliquer les changements' },
        { cmd: 'terraform destroy', desc: 'Détruire l\'infrastructure' },
        { cmd: 'terraform validate', desc: 'Valider la syntaxe HCL' },
        { cmd: 'terraform fmt', desc: 'Formater le code HCL' },
        { cmd: 'terraform plan -out=plan.tfplan', desc: 'Sauvegarder le plan' },
      ]},
      { title: 'State', commands: [
        { cmd: 'terraform state list', desc: 'Lister les ressources du state' },
        { cmd: 'terraform state show resource', desc: 'Détails d\'une ressource' },
        { cmd: 'terraform state mv old new', desc: 'Renommer une ressource' },
        { cmd: 'terraform state rm resource', desc: 'Retirer du state (sans détruire)' },
        { cmd: 'terraform import addr id', desc: 'Importer une ressource existante' },
        { cmd: 'terraform refresh', desc: 'Synchroniser le state avec le réel' },
      ]},
      { title: 'Workspaces', commands: [
        { cmd: 'terraform workspace list', desc: 'Lister les workspaces' },
        { cmd: 'terraform workspace new dev', desc: 'Créer un workspace' },
        { cmd: 'terraform workspace select prod', desc: 'Changer de workspace' },
        { cmd: 'terraform workspace show', desc: 'Workspace courant' },
      ]},
      { title: 'Modules & Variables', commands: [
        { cmd: 'terraform output', desc: 'Afficher les outputs' },
        { cmd: 'terraform console', desc: 'Console interactive HCL' },
        { cmd: 'terraform graph | dot -Tpng > g.png', desc: 'Graphe de dépendances' },
        { cmd: 'terraform apply -var="key=val"', desc: 'Passer une variable' },
        { cmd: 'terraform apply -var-file=dev.tfvars', desc: 'Fichier de variables' },
        { cmd: 'terraform taint resource', desc: 'Marquer pour recréation' },
      ]},
    ],
  },
  ansible: {
    title: 'Ansible',
    icon: '⚙️',
    sections: [
      { title: 'Commandes de base', commands: [
        { cmd: 'ansible all -m ping', desc: 'Tester la connexion à tous les hôtes' },
        { cmd: 'ansible-playbook play.yml', desc: 'Exécuter un playbook' },
        { cmd: 'ansible-playbook play.yml -i inv', desc: 'Avec inventaire personnalisé' },
        { cmd: 'ansible-playbook play.yml --check', desc: 'Mode dry-run (sans appliquer)' },
        { cmd: 'ansible-playbook play.yml -v', desc: 'Mode verbose (-vvv pour plus)' },
        { cmd: 'ansible-playbook play.yml --limit host', desc: 'Limiter à un hôte' },
        { cmd: 'ansible-playbook play.yml --tags tag', desc: 'Exécuter un tag spécifique' },
      ]},
      { title: 'Inventory & Config', commands: [
        { cmd: 'ansible-inventory --list', desc: 'Afficher l\'inventaire' },
        { cmd: 'ansible-inventory --graph', desc: 'Graphe des groupes' },
        { cmd: 'ansible-config dump', desc: 'Configuration active' },
        { cmd: 'ansible all -m setup', desc: 'Collecter les facts' },
      ]},
      { title: 'Galaxy & Roles', commands: [
        { cmd: 'ansible-galaxy init role_name', desc: 'Créer un squelette de rôle' },
        { cmd: 'ansible-galaxy install user.role', desc: 'Installer un rôle depuis Galaxy' },
        { cmd: 'ansible-galaxy list', desc: 'Lister les rôles installés' },
        { cmd: 'ansible-galaxy collection install ns.col', desc: 'Installer une collection' },
      ]},
      { title: 'Vault & Sécurité', commands: [
        { cmd: 'ansible-vault create secret.yml', desc: 'Créer un fichier chiffré' },
        { cmd: 'ansible-vault edit secret.yml', desc: 'Éditer un fichier chiffré' },
        { cmd: 'ansible-vault encrypt file.yml', desc: 'Chiffrer un fichier existant' },
        { cmd: 'ansible-vault decrypt file.yml', desc: 'Déchiffrer un fichier' },
        { cmd: 'ansible-vault view secret.yml', desc: 'Voir le contenu déchiffré' },
        { cmd: 'ansible-playbook play.yml --ask-vault-pass', desc: 'Demander le mot de passe vault' },
      ]},
    ],
  },
  git: {
    title: 'Git',
    icon: '🔀',
    sections: [
      { title: 'Bases', commands: [
        { cmd: 'git init', desc: 'Initialiser un dépôt' },
        { cmd: 'git clone url', desc: 'Cloner un dépôt' },
        { cmd: 'git add .', desc: 'Ajouter tous les fichiers' },
        { cmd: 'git commit -m "msg"', desc: 'Créer un commit' },
        { cmd: 'git status', desc: 'État des fichiers' },
        { cmd: 'git log --oneline --graph', desc: 'Historique compact' },
      ]},
      { title: 'Branches', commands: [
        { cmd: 'git branch nom', desc: 'Créer une branche' },
        { cmd: 'git checkout -b nom', desc: 'Créer et basculer' },
        { cmd: 'git switch nom', desc: 'Basculer de branche' },
        { cmd: 'git merge branche', desc: 'Fusionner une branche' },
        { cmd: 'git branch -d nom', desc: 'Supprimer une branche' },
        { cmd: 'git branch -a', desc: 'Toutes les branches (locales + remote)' },
      ]},
      { title: 'Avancé', commands: [
        { cmd: 'git rebase -i HEAD~3', desc: 'Rebase interactif (3 commits)' },
        { cmd: 'git cherry-pick hash', desc: 'Copier un commit spécifique' },
        { cmd: 'git bisect start/bad/good', desc: 'Recherche dichotomique de bug' },
        { cmd: 'git stash', desc: 'Mettre de côté les modifications' },
        { cmd: 'git stash pop', desc: 'Récupérer les modifications stashées' },
        { cmd: 'git reflog', desc: 'Historique complet des refs' },
        { cmd: 'git reset --soft HEAD~1', desc: 'Annuler le dernier commit (garder fichiers)' },
      ]},
      { title: 'Remote & Collaboration', commands: [
        { cmd: 'git push origin branche', desc: 'Pousser une branche' },
        { cmd: 'git pull --rebase', desc: 'Tirer avec rebase' },
        { cmd: 'git fetch --all', desc: 'Récupérer toutes les refs' },
        { cmd: 'git remote -v', desc: 'Lister les remotes' },
        { cmd: 'git tag v1.0.0', desc: 'Créer un tag' },
        { cmd: 'git diff branch1..branch2', desc: 'Différences entre branches' },
        { cmd: 'git blame fichier', desc: 'Voir qui a modifié chaque ligne' },
      ]},
    ],
  },
};

export default function CheatsheetToolPage() {
  const { tool } = useParams();
  const data = cheatsheetData[tool];

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-2xl font-bold">Cheat sheet non disponible</h1>
        <Link href="/cheatsheets" className="text-purple-400 mt-4 inline-block">Retour aux cheat sheets</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-fade-in">
      <div className="flex items-center justify-between mb-8 no-print">
        <Link href="/cheatsheets" className="text-gray-500 hover:text-purple-400 text-sm">&larr; Retour</Link>
        <button onClick={() => typeof window !== 'undefined' && window.print()} className="btn-primary text-sm !px-4 !py-2 print-visible">
          🖨️ Imprimer
        </button>
      </div>

      <div className="text-center mb-10">
        <span className="text-5xl block mb-3">{data.icon}</span>
        <h1 className="text-3xl font-extrabold">Cheat Sheet {data.title}</h1>
        <p className="text-gray-400 mt-2">Commandes essentielles et aide-mémoire</p>
      </div>

      <div className="cheatsheet-grid grid md:grid-cols-2 gap-6">
        {data.sections.map((section, i) => (
          <div key={i} className="card !p-5">
            <h2 className="text-lg font-bold mb-4 text-purple-400">{section.title}</h2>
            <div className="space-y-2">
              {section.commands.map((item, j) => (
                <div key={j} className="flex flex-col gap-0.5 pb-2 border-b border-border/50 last:border-0 last:pb-0">
                  <code className="text-sm font-mono text-green-400 bg-dark px-2 py-1 rounded">{item.cmd}</code>
                  <span className="text-xs text-gray-500 pl-2">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
