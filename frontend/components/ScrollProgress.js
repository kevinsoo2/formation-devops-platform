'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  // Only show on module pages
  const isModulePage = pathname?.includes('/modules/');

  useEffect(() => {
    if (!isModulePage) return;

    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isModulePage]);

  if (!isModulePage) return null;

  return (
    <div
      className="scroll-progress-bar"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progression de lecture"
    />
  );
}
