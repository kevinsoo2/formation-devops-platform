'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function KeyboardShortcuts() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function handler(e) {
      // Ctrl+K or Cmd+K: open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        router.push('/search');
      }
      // ? key: show shortcuts
      if (e.key === '?' && !e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        setShowModal(true);
      }
      // Escape: close modal
      if (e.key === 'Escape') {
        setShowModal(false);
      }
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [router]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} role="dialog" aria-label="Raccourcis clavier">
      <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">⌨️ Raccourcis clavier</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Ouvrir la recherche</span>
            <kbd className="px-2 py-1 bg-dark border border-border rounded text-xs">Ctrl+K</kbd>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Module précédent</span>
            <kbd className="px-2 py-1 bg-dark border border-border rounded text-xs">←</kbd>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Module suivant</span>
            <kbd className="px-2 py-1 bg-dark border border-border rounded text-xs">→</kbd>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Afficher l'aide</span>
            <kbd className="px-2 py-1 bg-dark border border-border rounded text-xs">?</kbd>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Fermer</span>
            <kbd className="px-2 py-1 bg-dark border border-border rounded text-xs">Esc</kbd>
          </div>
        </div>
        <button onClick={() => setShowModal(false)} className="mt-6 w-full btn-primary text-sm" aria-label="Fermer les raccourcis">Fermer</button>
      </div>
    </div>
  );
}
