'use client';
import { useState, useEffect } from 'react';

export default function Toast({ message, type = 'success', show, onClose, duration = 5000 }) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      setExiting(false);
      const timer = setTimeout(() => {
        setExiting(true);
        setTimeout(() => {
          setVisible(false);
          if (onClose) onClose();
        }, 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!visible) return null;

  const icons = {
    success: '🎉',
    badge: '🏅',
    xp: '⚡',
    info: '💡',
  };

  const colors = {
    success: 'border-green-500/50 bg-green-500/10',
    badge: 'border-purple-500/50 bg-purple-500/10',
    xp: 'border-yellow-500/50 bg-yellow-500/10',
    info: 'border-blue-500/50 bg-blue-500/10',
  };

  return (
    <div className={`fixed top-20 right-4 z-[9998] max-w-sm ${exiting ? 'toast-exit' : 'toast-enter'}`}>
      <div className={`flex items-center gap-3 px-5 py-4 rounded-xl border ${colors[type] || colors.info} backdrop-blur-md shadow-xl`}>
        <span className="text-2xl">{icons[type] || icons.info}</span>
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={() => { setExiting(true); setTimeout(() => { setVisible(false); if (onClose) onClose(); }, 300); }}
          className="ml-2 text-gray-400 hover:text-white text-lg"
          aria-label="Fermer"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
