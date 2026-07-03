'use client';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold mb-2">ℹ️ À propos</h1>
      <p className="text-gray-400 mb-10">Découvrez DevOps Academy et sa mission</p>

      {/* Présentation */}
      <div className="card p-6 mb-6">
        <h2 className="text-xl font-bold mb-3">🚀 Présentation du projet</h2>
        <p className="text-gray-300 leading-relaxed">
          DevOps Academy est une plateforme de formation gratuite et open-source dédiée aux outils et pratiques DevOps.
          Notre mission est de rendre l&apos;apprentissage DevOps accessible à tous, que vous soyez débutant ou professionnel
          cherchant à approfondir vos connaissances.
        </p>
        <p className="text-gray-300 leading-relaxed mt-3">
          La plateforme propose 19 formations complètes couvrant l&apos;ensemble de l&apos;écosystème DevOps :
          conteneurisation, orchestration, infrastructure as code, CI/CD, monitoring, cloud et bien plus encore.
        </p>
      </div>

      {/* Stack technique */}
      <div className="card p-6 mb-6">
        <h2 className="text-xl font-bold mb-3">🛠️ Stack technique</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-purple-400 mb-2">Frontend</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Next.js 14 (App Router)</li>
              <li>• React 18</li>
              <li>• Tailwind CSS</li>
              <li>• PWA (Service Worker)</li>
              <li>• Déployé sur Vercel</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-purple-400 mb-2">Backend</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Express.js (Node.js)</li>
              <li>• Drizzle ORM</li>
              <li>• Turso (SQLite distribué)</li>
              <li>• JWT pour l&apos;authentification</li>
              <li>• Déployé sur Render</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Objectifs */}
      <div className="card p-6 mb-6">
        <h2 className="text-xl font-bold mb-3">🎯 Objectifs</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span className="text-sm text-gray-300">Formations 100% gratuites et accessibles</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span className="text-sm text-gray-300">Contenu pratique et à jour</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span className="text-sm text-gray-300">Gamification pour motiver l&apos;apprentissage</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span className="text-sm text-gray-300">Communauté active via le forum</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span className="text-sm text-gray-300">Certificats de complétion vérifiables</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span className="text-sm text-gray-300">Interface moderne et responsive</span>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="card p-6 mb-6">
        <h2 className="text-xl font-bold mb-3">📬 Contact</h2>
        <p className="text-gray-300 text-sm mb-3">
          Vous avez des questions, suggestions ou souhaitez contribuer au projet ?
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <span>💬</span>
            <span className="text-gray-300">Forum de la communauté (accessible depuis la plateforme)</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>🐙</span>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
              GitHub - Code source du projet
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>📧</span>
            <span className="text-gray-300">contact@devops-academy.fr</span>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="text-center text-gray-500 text-sm mt-8">
        <p>Fait avec ❤️ pour la communauté DevOps francophone</p>
        <p className="mt-1">© 2026 DevOps Academy - Tous droits réservés</p>
      </div>
    </div>
  );
}
