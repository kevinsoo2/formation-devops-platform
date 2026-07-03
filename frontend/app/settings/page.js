'use client';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { useTheme } from '../../contexts/ThemeContext';

const accentColors = [
  { id: 'purple', label: 'Violet', color: '#a855f7' },
  { id: 'blue', label: 'Bleu', color: '#3b82f6' },
  { id: 'green', label: 'Vert', color: '#10b981' },
  { id: 'orange', label: 'Orange', color: '#f97316' },
  { id: 'red', label: 'Rouge', color: '#ef4444' },
];

export default function SettingsPage() {
  const { fontSize, highContrast, dyslexicFont, accentColor, increaseFontSize, decreaseFontSize, resetFontSize, setHighContrast, setDyslexicFont, setAccentColor } = useAccessibility();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 animate-fade-in">
      <h1 className="text-3xl font-extrabold mb-2">⚙️ Paramètres</h1>
      <p className="text-gray-400 mb-8">Personnalisez votre expérience d&apos;apprentissage</p>

      {/* Accent Color */}
      <section className="card mb-6">
        <h2 className="text-lg font-bold mb-4">🎨 Couleur d&apos;accent</h2>
        <p className="text-sm text-gray-400 mb-4">Choisissez la couleur principale de l&apos;interface</p>
        <div className="flex gap-3 flex-wrap">
          {accentColors.map(c => (
            <button
              key={c.id}
              onClick={() => setAccentColor(c.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                accentColor === c.id ? 'border-current ring-2 ring-current/30' : 'border-border hover:border-current'
              }`}
              style={{ borderColor: accentColor === c.id ? c.color : undefined }}
            >
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: c.color }} />
              <span className="text-sm">{c.label}</span>
              {accentColor === c.id && <span className="text-xs">✓</span>}
            </button>
          ))}
        </div>
      </section>

      {/* Theme */}
      <section className="card mb-6">
        <h2 className="text-lg font-bold mb-4">🌓 Thème</h2>
        <div className="flex gap-3">
          <button
            onClick={() => { if (theme !== 'dark') toggleTheme(); }}
            className={`px-4 py-2 rounded-lg border text-sm ${theme === 'dark' ? 'border-purple-500 bg-purple-500/10 text-purple-400' : 'border-border'}`}
          >
            🌙 Sombre
          </button>
          <button
            onClick={() => { if (theme !== 'light') toggleTheme(); }}
            className={`px-4 py-2 rounded-lg border text-sm ${theme === 'light' ? 'border-purple-500 bg-purple-500/10 text-purple-400' : 'border-border'}`}
          >
            ☀️ Clair
          </button>
        </div>
      </section>

      {/* Font Size */}
      <section className="card mb-6">
        <h2 className="text-lg font-bold mb-4">🔤 Taille du texte</h2>
        <div className="flex items-center gap-4">
          <button onClick={decreaseFontSize} className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:border-purple-500 transition-all text-lg">A-</button>
          <span className="text-sm text-gray-400">{fontSize}px</span>
          <button onClick={increaseFontSize} className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:border-purple-500 transition-all text-lg">A+</button>
          <button onClick={resetFontSize} className="ml-4 px-3 py-2 rounded-lg border border-border text-xs hover:border-purple-500 transition-all">Réinitialiser</button>
        </div>
      </section>

      {/* Accessibility */}
      <section className="card mb-6">
        <h2 className="text-lg font-bold mb-4">♿ Accessibilité</h2>
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-sm font-medium">Mode contraste élevé</p>
              <p className="text-xs text-gray-500">Bordures et texte plus visibles</p>
            </div>
            <input
              type="checkbox"
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
              className="w-5 h-5 rounded accent-purple-500"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-sm font-medium">Police dyslexique</p>
              <p className="text-xs text-gray-500">Utiliser OpenDyslexic pour une meilleure lisibilité</p>
            </div>
            <input
              type="checkbox"
              checked={dyslexicFont}
              onChange={(e) => setDyslexicFont(e.target.checked)}
              className="w-5 h-5 rounded accent-purple-500"
            />
          </label>
        </div>
      </section>

      {/* Keyboard shortcuts info */}
      <section className="card">
        <h2 className="text-lg font-bold mb-4">⌨️ Raccourcis clavier</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-400">Recherche</span><kbd className="px-2 py-0.5 bg-dark border border-border rounded text-xs">Ctrl+K</kbd></div>
          <div className="flex justify-between"><span className="text-gray-400">Module précédent/suivant</span><kbd className="px-2 py-0.5 bg-dark border border-border rounded text-xs">← →</kbd></div>
          <div className="flex justify-between"><span className="text-gray-400">Mode focus</span><kbd className="px-2 py-0.5 bg-dark border border-border rounded text-xs">F</kbd></div>
          <div className="flex justify-between"><span className="text-gray-400">Aide raccourcis</span><kbd className="px-2 py-0.5 bg-dark border border-border rounded text-xs">?</kbd></div>
        </div>
      </section>
    </div>
  );
}
