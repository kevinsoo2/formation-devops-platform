'use client';
import { useState, useEffect } from 'react';

export default function StatsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    fetch(`${API_URL}/api/stats`)
      .then(r => r.json())
      .then(data => {
        if (data.data) setStats(data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [API_URL]);

  if (loading) return <div className="text-center py-20 text-gray-400">Chargement des statistiques...</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold mb-2">📊 Statistiques de la plateforme</h1>
      <p className="text-gray-400 mb-8">Données en temps réel de DevOps Academy</p>

      {stats ? (
        <>
          {/* Main Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="card text-center p-6">
              <p className="text-4xl font-bold text-purple-400">{stats.total_users}</p>
              <p className="text-sm text-gray-400 mt-2">👥 Utilisateurs</p>
            </div>
            <div className="card text-center p-6">
              <p className="text-4xl font-bold text-blue-400">{stats.total_courses}</p>
              <p className="text-sm text-gray-400 mt-2">📚 Formations</p>
            </div>
            <div className="card text-center p-6">
              <p className="text-4xl font-bold text-green-400">{stats.total_modules_completed}</p>
              <p className="text-sm text-gray-400 mt-2">✅ Modules complétés</p>
            </div>
            <div className="card text-center p-6">
              <p className="text-4xl font-bold text-yellow-400">{stats.total_quiz_passed}</p>
              <p className="text-sm text-gray-400 mt-2">🧠 Quiz réussis</p>
            </div>
          </div>

          {/* Secondary Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            <div className="card p-6">
              <p className="text-gray-400 text-sm mb-1">⚡ XP total gagné</p>
              <p className="text-3xl font-bold text-purple-400">{stats.total_xp_earned?.toLocaleString('fr-FR')}</p>
            </div>
            <div className="card p-6">
              <p className="text-gray-400 text-sm mb-1">🏆 Cours le plus populaire</p>
              <p className="text-xl font-bold text-white">{stats.most_popular_course}</p>
            </div>
            <div className="card p-6">
              <p className="text-gray-400 text-sm mb-1">📝 Score moyen aux quiz</p>
              <p className="text-3xl font-bold text-green-400">{stats.average_quiz_score}%</p>
            </div>
          </div>

          {/* Popular Courses Bar Chart */}
          {stats.popular_courses && stats.popular_courses.length > 0 && (
            <div className="card p-6">
              <h2 className="text-lg font-bold mb-4">🔥 Cours les plus suivis</h2>
              <div className="space-y-3">
                {stats.popular_courses.map((course, i) => {
                  const maxCompletions = stats.popular_courses[0]?.completions || 1;
                  const percentage = (course.completions / maxCompletions) * 100;
                  return (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">{course.title || course.course_id}</span>
                        <span className="text-purple-400 font-bold">{course.completions}</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-purple-600 to-blue-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="card text-center py-12">
          <p className="text-gray-400">Impossible de charger les statistiques.</p>
        </div>
      )}
    </div>
  );
}
