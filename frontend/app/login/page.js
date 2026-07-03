'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="card w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl block mb-3">🔐</span>
          <h1 className="text-2xl font-bold">Connexion</h1>
          <p className="text-gray-400 text-sm mt-2">Accédez à votre espace de formation</p>
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

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Pas encore de compte ?{' '}
          <Link href="/register" className="text-purple-400 hover:underline">S&apos;inscrire</Link>
        </p>
      </div>
    </div>
  );
}
