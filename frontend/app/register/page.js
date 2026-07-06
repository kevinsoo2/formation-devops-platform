'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || '';

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-400">Chargement...</div>}>
      <RegisterContent />
    </Suspense>
  );
}

function RegisterContent() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const googleButtonRef = useRef(null);
  const [googleReady, setGoogleReady] = useState(false);

  // Handle GitHub OAuth callback
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      handleGitHubCallback(code);
    }
  }, [searchParams]);

  // Load Google Identity Services
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
        });
        setGoogleReady(true);
      }
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Render Google button when ready
  useEffect(() => {
    if (googleReady && googleButtonRef.current && window.google) {
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: 'outline',
        size: 'large',
        text: 'signup_with',
        locale: 'fr',
        width: '100%',
      });
    }
  }, [googleReady]);

  async function handleGoogleResponse(response) {
    setOauthLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: response.credential }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur de connexion Google');
      localStorage.setItem('token', data.data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message);
    } finally {
      setOauthLoading(false);
    }
  }

  async function handleGitHubCallback(code) {
    setOauthLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/auth/github`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur de connexion GitHub');
      localStorage.setItem('token', data.data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message);
    } finally {
      setOauthLoading(false);
    }
  }

  function handleGitHubLogin() {
    const redirectUri = typeof window !== 'undefined' ? window.location.origin + '/register' : '';
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user:email&redirect_uri=${encodeURIComponent(redirectUri)}`;
  }

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

        {oauthLoading && (
          <div className="mb-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm text-center">
            Inscription en cours...
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

        {/* OAuth Divider and Buttons */}
        {(GOOGLE_CLIENT_ID || GITHUB_CLIENT_ID) && (
          <div className="mt-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-border"></div>
              <span className="text-sm text-gray-500">&mdash; ou &mdash;</span>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            <div className="space-y-3">
              {GOOGLE_CLIENT_ID && (
                <div>
                  <div ref={googleButtonRef} className="w-full flex justify-center"></div>
                  {!googleReady && (
                    <button
                      type="button"
                      disabled
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-white text-gray-800 font-medium border border-gray-300 opacity-50 cursor-not-allowed"
                    >
                      <GoogleIcon />
                      <span>S&apos;inscrire avec Google</span>
                    </button>
                  )}
                </div>
              )}

              {GITHUB_CLIENT_ID && (
                <button
                  type="button"
                  onClick={handleGitHubLogin}
                  disabled={oauthLoading}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-[#24292f] text-white font-medium hover:bg-[#32383f] transition-colors disabled:opacity-50"
                >
                  <GitHubIcon />
                  <span>S&apos;inscrire avec GitHub</span>
                </button>
              )}
            </div>
          </div>
        )}

        <p className="text-center text-sm text-gray-400 mt-6">
          Déjà un compte ?{' '}
          <Link href="/login" className="text-purple-400 hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
