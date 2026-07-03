'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import Breadcrumbs from '../../components/Breadcrumbs';

export default function FavoritesPage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    Promise.all([
      fetch(`${API_URL}/api/favorites/${user.id}`).then(r => r.json()),
      fetch(`${API_URL}/api/courses`).then(r => r.json()),
    ]).then(([favData, coursesData]) => {
      if (favData.data) setFavorites(favData.data);
      if (coursesData.data) setCourses(coursesData.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [user, API_URL]);

  async function removeFavorite(fav) {
    await fetch(`${API_URL}/api/favorites/${user.id}`, {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId: fav.course_id, moduleId: fav.module_id }),
    });
    setFavorites(favorites.filter(f => f.id !== fav.id));
  }

  if (loading) return <div className="text-center py-20 text-gray-400">Chargement...</div>;
  if (!user) return <div className="max-w-4xl mx-auto px-6 py-12"><p className="text-gray-400">Connectez-vous pour voir vos favoris.</p></div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Breadcrumbs items={[{ label: 'Accueil', href: '/' }, { label: 'Favoris' }]} />
      <h1 className="text-3xl font-extrabold mb-2">❤️ Mes favoris</h1>
      <p className="text-gray-400 mb-8">Vos cours et modules favoris</p>

      {favorites.length === 0 ? (
        <div className="card text-center py-12">
          <span className="text-4xl block mb-4">💔</span>
          <p className="text-gray-400">Aucun favori pour le moment. Ajoutez des cours ou modules en cliquant sur ❤️</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {favorites.map(fav => {
            const course = courses.find(c => c.id === fav.course_id);
            return (
              <div key={fav.id} className="card flex items-center justify-between">
                <Link href={fav.module_id ? `/courses/${fav.course_id}/modules/${fav.module_id}` : `/courses/${fav.course_id}`} className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{course?.icon || '📚'}</span>
                  <div>
                    <h3 className="font-semibold text-sm">{course?.title || fav.course_id}</h3>
                    {fav.module_id && <p className="text-xs text-gray-500">Module: {fav.module_id}</p>}
                  </div>
                </Link>
                <button onClick={() => removeFavorite(fav)} className="text-red-400 hover:text-red-300 p-2" aria-label="Retirer des favoris">✕</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
