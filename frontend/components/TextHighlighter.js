'use client';
import { useState, useEffect, useCallback } from 'react';

export default function TextHighlighter({ moduleId }) {
  const [active, setActive] = useState(false);
  const [highlights, setHighlights] = useState([]);

  const storageKey = `highlights-${moduleId}`;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setHighlights(parsed);
        // Apply saved highlights
        setTimeout(() => applyHighlights(parsed), 500);
      }
    } catch (e) {}
  }, [storageKey]);

  function applyHighlights(list) {
    // Remove existing highlights first
    document.querySelectorAll('.user-highlight').forEach(el => {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize();
    });

    // Apply all highlights
    list.forEach(text => {
      highlightText(text);
    });
  }

  function highlightText(text) {
    const walker = document.createTreeWalker(
      document.querySelector('.module-content') || document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    while (walker.nextNode()) {
      const node = walker.currentNode;
      const idx = node.textContent.indexOf(text);
      if (idx >= 0 && !node.parentElement.classList.contains('user-highlight')) {
        const range = document.createRange();
        range.setStart(node, idx);
        range.setEnd(node, idx + text.length);
        const span = document.createElement('span');
        span.className = 'user-highlight';
        range.surroundContents(span);
        break;
      }
    }
  }

  const handleHighlight = useCallback(() => {
    if (!active) return;
    const selection = window.getSelection();
    const text = selection.toString().trim();
    if (text && text.length > 2 && text.length < 500) {
      const newHighlights = [...highlights, text];
      setHighlights(newHighlights);
      localStorage.setItem(storageKey, JSON.stringify(newHighlights));
      highlightText(text);
      selection.removeAllRanges();
    }
  }, [active, highlights, storageKey]);

  useEffect(() => {
    if (active) {
      document.addEventListener('mouseup', handleHighlight);
      return () => document.removeEventListener('mouseup', handleHighlight);
    }
  }, [active, handleHighlight]);

  function clearHighlights() {
    setHighlights([]);
    localStorage.removeItem(storageKey);
    document.querySelectorAll('.user-highlight').forEach(el => {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize();
    });
  }

  return (
    <div className="flex items-center gap-2 no-print">
      <button
        onClick={() => setActive(!active)}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
          active
            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
            : 'bg-surface border border-border text-gray-400 hover:text-yellow-400 hover:border-yellow-500/50'
        }`}
        title={active ? 'Désactiver le surlignage' : 'Activer le surlignage'}
      >
        {active ? '🖊️ Surlignage actif' : '🖊️ Surligner'}
      </button>
      {highlights.length > 0 && (
        <button
          onClick={clearHighlights}
          className="px-2 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-all"
          title="Effacer les surlignages"
        >
          ✕ Effacer ({highlights.length})
        </button>
      )}
    </div>
  );
}
