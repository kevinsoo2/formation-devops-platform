'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);
    try {
      await register(username, email, password, displayName || username);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="card w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl block mb-3">🚀</span>
          <h1 className="text-2xl font-bold">Inscription</h1>
          <p className="text-gray-400 text-sm mt-2">Rejoignez la communauté DevOps Academy</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-400">Nom d&apos;utilisateur</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-surface border border-border focus:border-purple-500 focus:outline-none transition-all"
              placeholder="votre_pseudo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-400">Nom affiché</label>
            <input
              type="text"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-surface border border-border focus:border-purple-500 focus:outline-none transition-all"
              placeholder="Jean Dupont (optionnel)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-surface border border-border focus:border-purple-500 focus:outline-none transition-all"
              placeholder="email@exemple.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-400">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-surface border border-border focus:border-purple-500 focus:outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-400">Confirmer le mot de passe</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-surface border border-border focus:border-purple-500 focus:outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? 'Inscription...' : 'Créer mon compte'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Déjà un compte ?{' '}
          <Link href="/login" className="text-purple-400 hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
