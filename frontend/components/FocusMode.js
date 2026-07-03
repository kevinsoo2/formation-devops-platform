'use client';
import { useState, useEffect } from 'react';

export default function FocusMode() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    function handleKey(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'f' || e.key === 'F') {
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          toggleFocus();
        }
      }
      if (e.key === 'Escape' && active) {
        toggleFocus();
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [active]);

  function toggleFocus() {
    setActive(prev => {
      const next = !prev;
      if (next) {
        document.body.classList.add('focus-mode');
      } else {
        document.body.classList.remove('focus-mode');
      }
      return next;
    });
  }

  return (
    <button
      onClick={toggleFocus}
      className={`no-print fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all ${
        active
          ? 'bg-purple-600 text-white shadow-purple-500/30'
          : 'bg-card border border-border text-gray-400 hover:text-purple-400 hover:border-purple-500'
      }`}
      title={active ? 'Quitter le mode focus (F ou Esc)' : 'Mode focus (F)'}
      aria-label={active ? 'Quitter le mode focus' : 'Activer le mode focus'}
    >
      {active ? '✕' : '🎯'}
    </button>
  );
}
