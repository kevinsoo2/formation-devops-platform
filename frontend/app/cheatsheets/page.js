import Link from 'next/link';

export const metadata = {
  title: 'Cheat Sheets - DevOps Academy',
  description: 'Aide-mémoire des commandes essentielles pour Docker, Kubernetes, Terraform, Ansible et Git.',
};

const cheatsheets = [
  { id: 'docker', title: 'Docker', icon: '🐳', color: 'from-blue-500 to-cyan-500', desc: 'Commandes essentielles pour gérer images, containers et volumes.' },
  { id: 'kubernetes', title: 'Kubernetes', icon: '☸️', color: 'from-blue-600 to-indigo-600', desc: 'kubectl, pods, services, deployments et debugging.' },
  { id: 'terraform', title: 'Terraform', icon: '🏗️', color: 'from-purple-500 to-violet-600', desc: 'CLI, state management, modules et workspace.' },
  { id: 'ansible', title: 'Ansible', icon: '⚙️', color: 'from-red-500 to-red-700', desc: 'Playbooks, inventories, galaxy et vault.' },
  { id: 'git', title: 'Git', icon: '🔀', color: 'from-orange-500 to-red-500', desc: 'Branches, rebase, stash, log et commandes avancées.' },
];

export default function CheatsheetsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold mb-3">📋 Cheat Sheets</h1>
        <p className="text-gray-400">Aide-mémoire imprimables avec les commandes essentielles</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cheatsheets.map((cs) => (
          <Link key={cs.id} href={`/cheatsheets/${cs.id}`} className="card hover:border-purple-500 transition-all group">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${cs.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
              {cs.icon}
            </div>
            <h2 className="text-xl font-bold mb-2">{cs.title}</h2>
            <p className="text-sm text-gray-400 mb-4">{cs.desc}</p>
            <span className="text-xs text-purple-400 font-medium">Voir le cheat sheet &rarr;</span>
          </Link>
        ))}
      </div>
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">💡 Utilisez Ctrl+P pour imprimer un cheat sheet au format optimisé.</p>
      </div>
    </div>
  );
}
