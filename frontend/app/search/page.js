'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  const search = useCallback(async (q) => {
    if (q.trim().length < 2) {
      setResults(null);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(q.trim())}`);
      const data = await res.json();
      if (data.success) {
        setResults(data.data);
      }
    } catch (e) {
      console.error('Search error:', e);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim().length >= 2) {
        search(query);
      } else {
        setResults(null);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [query, search]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold mb-2">🔍 Recherche</h1>
        <p className="text-gray-400">Trouvez des formations et modules rapidement</p>
      </div>

      <div className="relative mb-8">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Rechercher des cours, modules..."
          className="w-full px-6 py-4 rounded-xl bg-card border border-border focus:border-purple-500 focus:outline-none text-lg transition-all"
          autoFocus
        />
        {loading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {results && (
        <div className="space-y-8">
          <p className="text-sm text-gray-400">
            {results.totalResults} résultat{results.totalResults > 1 ? 's' : ''} pour &quot;{results.query}&quot;
          </p>

          {/* Courses */}
          {results.courses.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>📚</span> Formations ({results.courses.length})
              </h2>
              <div className="space-y-3">
                {results.courses.map(course => (
                  <Link key={course.id} href={`/courses/${course.id}`} className="card block">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{course.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-sm text-gray-400">{course.subtitle}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-400">{course.level}</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-400">{course.duration}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Modules */}
          {results.modules.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>📖</span> Modules ({results.modules.length})
              </h2>
              <div className="space-y-3">
                {results.modules.map(mod => (
                  <Link key={mod.id} href={`/courses/${mod.courseId}/modules/${mod.id}`} className="card block">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {mod.orderIndex}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{mod.title}</h3>
                        <span className="text-xs text-gray-500">⏱ {mod.duration}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {results.totalResults === 0 && (
            <div className="text-center py-12">
              <span className="text-4xl block mb-4">🔍</span>
              <p className="text-gray-400">Aucun résultat trouvé pour &quot;{results.query}&quot;</p>
            </div>
          )}
        </div>
      )}

      {!results && query.length === 0 && (
        <div className="text-center py-12">
          <span className="text-4xl block mb-4">💡</span>
          <p className="text-gray-400">Tapez au moins 2 caractères pour lancer la recherche</p>
        </div>
      )}
    </div>
  );
}
