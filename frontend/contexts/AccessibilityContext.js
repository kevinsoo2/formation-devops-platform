'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext(null);

export function AccessibilityProvider({ children }) {
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [accentColor, setAccentColor] = useState('purple');

  useEffect(() => {
    const savedSize = localStorage.getItem('fontSize');
    const savedContrast = localStorage.getItem('highContrast');
    const savedDyslexic = localStorage.getItem('dyslexicFont');
    const savedAccent = localStorage.getItem('accentColor');
    if (savedSize) setFontSize(parseInt(savedSize));
    if (savedContrast === 'true') setHighContrast(true);
    if (savedDyslexic === 'true') setDyslexicFont(true);
    if (savedAccent) setAccentColor(savedAccent);
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    document.documentElement.classList.toggle('high-contrast', highContrast);
    document.documentElement.classList.toggle('dyslexic-font', dyslexicFont);
    document.documentElement.setAttribute('data-accent', accentColor);
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('highContrast', highContrast);
    localStorage.setItem('dyslexicFont', dyslexicFont);
    localStorage.setItem('accentColor', accentColor);
  }, [fontSize, highContrast, dyslexicFont, accentColor]);

  function increaseFontSize() { setFontSize(s => Math.min(s + 2, 24)); }
  function decreaseFontSize() { setFontSize(s => Math.max(s - 2, 12)); }
  function resetFontSize() { setFontSize(16); }

  return (
    <AccessibilityContext.Provider value={{ fontSize, highContrast, dyslexicFont, accentColor, increaseFontSize, decreaseFontSize, resetFontSize, setHighContrast, setDyslexicFont, setAccentColor }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return context;
}
