'use client';
import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6">
              <circle cx="60" cy="60" r="50" stroke="#a855f7" strokeWidth="2" fill="rgba(168,85,247,0.05)" />
              <path d="M45 45l30 30M75 45l-30 30" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
              <circle cx="60" cy="85" r="4" fill="#a855f7" opacity="0.5" />
            </svg>
            <h2 className="text-2xl font-bold mb-3">Oups ! Une erreur est survenue</h2>
            <p className="text-gray-400 mb-6 text-sm">
              Quelque chose ne s&apos;est pas passé comme prévu. Pas de panique, essayez de recharger la page.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={this.handleRetry}
                className="btn-primary"
              >
                🔄 Réessayer
              </button>
              <a href="/" className="btn-secondary">
                🏠 Retour à l&apos;accueil
              </a>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <pre className="mt-6 text-xs text-left bg-dark border border-border rounded-lg p-4 overflow-auto max-h-40 text-red-400">
                {this.state.error.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
