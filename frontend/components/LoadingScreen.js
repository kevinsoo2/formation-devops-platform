'use client';
import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const visited = localStorage.getItem('devops-visited');
    if (!visited) {
      setShow(true);
      localStorage.setItem('devops-visited', 'true');
      setTimeout(() => setShow(false), 1000);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin-slow">
          <span className="text-6xl">🚀</span>
        </div>
        <p className="mt-4 text-purple-400 font-bold text-lg animate-pulse">DevOps Academy</p>
        <p className="text-gray-500 text-sm mt-1">Chargement...</p>
      </div>
      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.2); }
          100% { transform: rotate(360deg) scale(1); }
        }
        .animate-spin-slow {
          animation: spin-slow 1s ease-in-out;
        }
      `}</style>
    </div>
  );
}
