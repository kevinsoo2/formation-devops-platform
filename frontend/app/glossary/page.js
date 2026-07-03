'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';

export default function GlossaryPage() {
  const [terms, setTerms] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    fetch(`${API_URL}/api/glossary`).then(r => r.json()).then(d => {
      if (d.data) setTerms(d.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [API_URL]);

  const filtered = terms.filter(t =>
    t.term.toLowerCase().includes(search.toLowerCase()) ||
    t.definition.toLowerCase().includes(search.toLowerCase())
  );

  // Group by first letter
  const grouped = {};
  filtered.forEach(t => {
    const letter = t.term.charAt(0).toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(t);
  });

  if (loading) return <div className="text-center py-20 text-gray-400">Chargement...</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Breadcrumbs items={[{ label: 'Accueil', href: '/' }, { label: 'Glossaire' }]} />
      <h1 className="text-3xl font-extrabold mb-2">📖 Glossaire DevOps</h1>
      <p className="text-gray-400 mb-6">Termes et définitions essentiels du DevOps</p>

      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Rechercher un terme..."
        className="w-full px-4 py-3 rounded-lg bg-surface border border-border focus:border-purple-500 focus:outline-none mb-8"
        aria-label="Rechercher un terme dans le glossaire"
      />

      {Object.keys(grouped).sort().map(letter => (
        <div key={letter} className="mb-8">
          <h2 className="text-xl font-bold text-purple-400 mb-3 border-b border-border pb-2">{letter}</h2>
          <div className="space-y-3">
            {grouped[letter].map(term => (
              <div key={term.id} className="card !p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-white">{term.term}</h3>
                    <p className="text-sm text-gray-400 mt-1">{term.definition}</p>
                  </div>
                  {term.related_course_id && (
                    <Link href={`/courses/${term.related_course_id}`} className="text-xs text-purple-400 hover:underline whitespace-nowrap">
                      → Voir le cours
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && <p className="text-center text-gray-500 py-8">Aucun terme trouvé.</p>}
    </div>
  );
}
