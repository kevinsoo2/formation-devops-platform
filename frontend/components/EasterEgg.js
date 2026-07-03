'use client';
import { useState, useEffect, useCallback } from 'react';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

export default function EasterEgg() {
  const [active, setActive] = useState(false);
  const [inputSequence, setInputSequence] = useState([]);

  const handleKeyDown = useCallback((e) => {
    setInputSequence(prev => {
      const newSeq = [...prev, e.code].slice(-10);
      if (newSeq.length === 10 && newSeq.every((key, i) => key === KONAMI_CODE[i])) {
        setActive(true);
        setTimeout(() => setActive(false), 5000);
        return [];
      }
      return newSeq;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <MatrixColumn key={i} index={i} />
      ))}
      <style jsx>{`
        @keyframes matrix-fall {
          0% { transform: translateY(-100%); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function MatrixColumn({ index }) {
  const chars = 'DEVOPS DOCKER KUBERNETES TERRAFORM ANSIBLE GIT 01'.split('');
  const left = (index / 50) * 100;
  const delay = Math.random() * 2;
  const duration = 2 + Math.random() * 3;
  const char = chars[Math.floor(Math.random() * chars.length)];

  return (
    <span
      style={{
        position: 'absolute',
        left: `${left}%`,
        top: '-20px',
        color: '#a855f7',
        fontSize: '14px',
        fontFamily: 'monospace',
        fontWeight: 'bold',
        animation: `matrix-fall ${duration}s linear ${delay}s forwards`,
        textShadow: '0 0 10px #a855f7',
      }}
    >
      {char}
    </span>
  );
}
