'use client';
import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  const formations = [
    { id: 'docker', label: 'Docker' },
    { id: 'kubernetes', label: 'Kubernetes' },
    { id: 'terraform', label: 'Terraform' },
    { id: 'ansible', label: 'Ansible' },
    { id: 'jenkins', label: 'Jenkins' },
    { id: 'gitlab-ci', label: 'GitLab CI' },
    { id: 'git-avance', label: 'Git Avancé' },
    { id: 'sonarqube', label: 'SonarQube' },

    { id: 'klocwork', label: 'Klocwork' },
    { id: 'artifactory', label: 'Artifactory' },
    { id: 'jira', label: 'Jira' },
    { id: 'confluence', label: 'Confluence' },
    { id: 'bitbucket', label: 'Bitbucket' },
    { id: 'prometheus', label: 'Prometheus' },
    { id: 'grafana', label: 'Grafana' },
  ];

  return (
    <footer className="bg-card border-t border-border mt-16 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Logo size={32} />
            <span className="font-bold text-lg bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              DevOps Academy
            </span>
          </div>

          <p className="text-gray-400 text-sm mb-4">
            Plateforme de formation gratuite aux outils DevOps et d&apos;ingénierie logicielle.
            Apprenez à votre rythme avec des cours structurés.
          </p>
          {/* Social links */}
          <div className="flex gap-3">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all" aria-label="GitHub">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all" aria-label="LinkedIn">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all" aria-label="Twitter">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
          </div>
        </div>

        {/* Formations */}
        <div>
          <h4 className="font-semibold mb-4">Formations</h4>
          <ul className="text-gray-400 text-sm space-y-1.5">
            {formations.map(f => (
              <li key={f.id}><Link href={`/courses/${f.id}`} className="hover:text-purple-400 transition-colors">{f.label}</Link></li>
            ))}
          </ul>
        </div>


        {/* Ressources */}
        <div>
          <h4 className="font-semibold mb-4">Ressources</h4>
          <ul className="text-gray-400 text-sm space-y-1.5">
            <li><Link href="/glossary" className="hover:text-purple-400 transition-colors">Glossaire DevOps</Link></li>
            <li><Link href="/cheatsheets" className="hover:text-purple-400 transition-colors">Cheat Sheets</Link></li>
            <li><Link href="/flashcards" className="hover:text-purple-400 transition-colors">Flashcards</Link></li>
            <li><Link href="/forum" className="hover:text-purple-400 transition-colors">Forum</Link></li>
            <li><Link href="/paths" className="hover:text-purple-400 transition-colors">Parcours</Link></li>
            <li><Link href="/projects" className="hover:text-purple-400 transition-colors">Projets</Link></li>
            <li><Link href="/leaderboard" className="hover:text-purple-400 transition-colors">Classement</Link></li>
          </ul>
        </div>

        {/* Legal + Newsletter */}
        <div>
          <h4 className="font-semibold mb-4">Légal</h4>
          <ul className="text-gray-400 text-sm space-y-1.5 mb-6">
            <li><Link href="/mentions-legales" className="hover:text-purple-400 transition-colors">Mentions légales</Link></li>
            <li><Link href="/cgu" className="hover:text-purple-400 transition-colors">CGU</Link></li>
            <li><Link href="/contact" className="hover:text-purple-400 transition-colors">Contact</Link></li>
          </ul>
          <h4 className="font-semibold mb-3">Newsletter</h4>
          {subscribed ? (
            <p className="text-sm text-green-400">✓ Merci pour votre inscription !</p>
          ) : (
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="flex-1 px-3 py-2 rounded-lg bg-surface border border-border focus:border-purple-500 focus:outline-none text-sm"
                required
              />
              <button type="submit" className="px-3 py-2 rounded-lg bg-purple-500 text-white text-sm font-medium hover:bg-purple-600 transition-colors">
                OK
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} DevOps Academy. Tous droits réservés.</p>
        <p>Made with ❤️ par des passionnés DevOps</p>
      </div>
    </footer>
  );
}
