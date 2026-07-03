'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext(null);

export function AccessibilityProvider({ children }) {
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);

  useEffect(() => {
    const savedSize = localStorage.getItem('fontSize');
    const savedContrast = localStorage.getItem('highContrast');
    const savedDyslexic = localStorage.getItem('dyslexicFont');
    if (savedSize) setFontSize(parseInt(savedSize));
    if (savedContrast === 'true') setHighContrast(true);
    if (savedDyslexic === 'true') setDyslexicFont(true);
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    document.documentElement.classList.toggle('high-contrast', highContrast);
    document.documentElement.classList.toggle('dyslexic-font', dyslexicFont);
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('highContrast', highContrast);
    localStorage.setItem('dyslexicFont', dyslexicFont);
  }, [fontSize, highContrast, dyslexicFont]);

  function increaseFontSize() { setFontSize(s => Math.min(s + 2, 24)); }
  function decreaseFontSize() { setFontSize(s => Math.max(s - 2, 12)); }
  function resetFontSize() { setFontSize(16); }

  return (
    <AccessibilityContext.Provider value={{ fontSize, highContrast, dyslexicFont, increaseFontSize, decreaseFontSize, resetFontSize, setHighContrast, setDyslexicFont }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return context;
}
