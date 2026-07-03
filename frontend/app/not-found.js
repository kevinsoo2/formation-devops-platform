import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-6">
      <div className="text-center max-w-lg animate-fade-in">
        <div className="text-8xl mb-6">🔧</div>
        <h1 className="text-4xl font-extrabold mb-4">
          <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            404
          </span>
        </h1>
        <h2 className="text-2xl font-bold mb-4">Page non trouvée</h2>
        <p className="text-gray-400 mb-8">
          Cette page semble avoir été déployée dans un cluster introuvable.
          Vérifiez votre configuration ou retournez au pipeline principal.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/" className="btn-primary">
            Retour à l&apos;accueil
          </Link>
          <Link href="/courses" className="btn-secondary">
            Voir les formations
          </Link>
        </div>
        <div className="mt-12 p-4 rounded-lg bg-surface border border-border text-left">
          <p className="text-xs text-gray-500 font-mono">
            $ kubectl get page /current-url<br />
            <span className="text-red-400">Error: page &quot;not-found&quot; not found in namespace &quot;devops-academy&quot;</span><br />
            $ kubectl get pods --all-namespaces | grep page<br />
            <span className="text-green-400">devops-academy&nbsp;&nbsp;homepage-pod&nbsp;&nbsp;&nbsp;&nbsp;1/1&nbsp;&nbsp;Running&nbsp;&nbsp;0&nbsp;&nbsp;42d</span><br />
            <span className="text-green-400">devops-academy&nbsp;&nbsp;courses-pod&nbsp;&nbsp;&nbsp;&nbsp;1/1&nbsp;&nbsp;Running&nbsp;&nbsp;0&nbsp;&nbsp;42d</span>
          </p>
        </div>
      </div>
    </div>
  );
}
