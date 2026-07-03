import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-[calc(100vh-70px)] flex items-center justify-center px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(108,99,255,0.15)_0%,transparent_60%)]" />
        <div className="relative text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Maîtrisez les outils<br />
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              DevOps &amp; Ingénierie
            </span>
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
            Plateforme de formation complète : Artifactory, SonarQube, IBM DOORS, IBM ClearCase, Klocwork et Jenkins.
            Gagnez des XP, débloquez des badges et grimpez dans le classement !
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/courses" className="btn-primary">Commencer les formations</Link>
            <Link href="/register" className="btn-secondary">Créer un compte</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[{ v: '6', l: 'Formations' }, { v: '20+', l: 'Modules' }, { v: '6', l: 'Badges à débloquer' }, { v: '∞', l: 'XP à gagner' }].map((s, i) => (
            <div key={i} className="card text-center">
              <span className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">{s.v}</span>
              <span className="block text-sm text-gray-500 mt-2">{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-12">Pourquoi notre plateforme ?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '📚', title: 'Contenu structuré', desc: 'Formations en modules progressifs avec théorie et pratique.' },
            { icon: '🎓', title: 'Quiz interactifs', desc: 'Validez vos connaissances avec scoring et explications.' },
            { icon: '⚡', title: 'Système XP & Niveaux', desc: 'Gagnez des points et montez en niveau à chaque module.' },
            { icon: '🏆', title: 'Badges & Classement', desc: 'Débloquez des badges et rivalisez avec la communauté.' },
            { icon: '🎓', title: 'Certificats', desc: 'Obtenez un certificat de réussite pour chaque formation.' },
            { icon: '💬', title: 'Communauté', desc: 'Commentez et échangez avec les autres apprenants.' },
          ].map((f, i) => (
            <div key={i} className="card hover:border-purple-500 transition-all">
              <span className="text-3xl block mb-3">{f.icon}</span>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 px-6">
        <h2 className="text-2xl font-bold mb-4">Prêt à commencer ?</h2>
        <p className="text-gray-400 mb-8">Explorez nos formations, gagnez des XP et montez en compétences.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/courses" className="btn-primary text-lg px-8 py-4">Voir toutes les formations</Link>
          <Link href="/leaderboard" className="btn-secondary text-lg px-8 py-4">🏆 Classement</Link>
        </div>
      </section>
    </div>
  );
}
