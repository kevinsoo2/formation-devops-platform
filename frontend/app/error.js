'use client';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6">
          <circle cx="60" cy="60" r="50" stroke="#a855f7" strokeWidth="2" fill="rgba(168,85,247,0.05)" />
          <path d="M60 35v30" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
          <circle cx="60" cy="80" r="4" fill="#ef4444" />
        </svg>
        <h2 className="text-2xl font-bold mb-3">Une erreur est survenue</h2>
        <p className="text-gray-400 mb-6 text-sm">
          {error?.message || 'Quelque chose ne s\'est pas passé comme prévu.'}
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn-primary">
            🔄 Réessayer
          </button>
          <a href="/" className="btn-secondary">
            🏠 Accueil
          </a>
        </div>
      </div>
    </div>
  );
}
