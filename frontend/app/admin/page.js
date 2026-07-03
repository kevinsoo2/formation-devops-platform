'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Breadcrumbs from '../../components/Breadcrumbs';

export default function AdminPage() {
  const { user, token } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    if (!user || user.role !== 'admin') { setLoading(false); return; }
    Promise.all([
      fetch(`${API_URL}/api/admin/stats`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch(`${API_URL}/api/admin/users`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
    ]).then(([statsData, usersData]) => {
      if (statsData.data) setStats(statsData.data);
      if (usersData.data) setUsers(usersData.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [user, token, API_URL]);

  if (loading) return <div className="text-center py-20 text-gray-400">Chargement...</div>;
  if (!user || user.role !== 'admin') {
    return <div className="max-w-4xl mx-auto px-6 py-12"><div className="card text-center py-12"><span className="text-4xl block mb-4">🔒</span><p className="text-gray-400">Accès réservé aux administrateurs.</p></div></div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Breadcrumbs items={[{ label: 'Accueil', href: '/' }, { label: 'Administration' }]} />
      <h1 className="text-3xl font-extrabold mb-6">⚙️ Administration</h1>

      {stats && (
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="card text-center">
            <p className="text-3xl font-bold text-purple-400">{stats.totalUsers}</p>
            <p className="text-xs text-gray-400">Utilisateurs</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-purple-400">{stats.totalCompletions}</p>
            <p className="text-xs text-gray-400">Modules complétés</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-purple-400">{stats.totalQuizPassed}</p>
            <p className="text-xs text-gray-400">Quiz réussis</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-purple-400">{stats.popularCourses?.length || 0}</p>
            <p className="text-xs text-gray-400">Cours actifs</p>
          </div>
        </div>
      )}

      {/* Popular courses */}
      {stats?.popularCourses && (
        <div className="card mb-8">
          <h2 className="text-lg font-bold mb-4">📊 Cours les plus populaires</h2>
          <div className="space-y-2">
            {stats.popularCourses.map((c, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm">{c.course_id}</span>
                <span className="text-sm text-purple-400 font-bold">{c.completions} completions</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User list */}
      <div className="card">
        <h2 className="text-lg font-bold mb-4">👥 Utilisateurs ({users.length})</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-gray-500">
                <th className="py-2 px-2">Utilisateur</th>
                <th className="py-2 px-2">Email</th>
                <th className="py-2 px-2">Niveau</th>
                <th className="py-2 px-2">XP</th>
                <th className="py-2 px-2">Rôle</th>
                <th className="py-2 px-2">Inscrit le</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b border-border/50">
                  <td className="py-2 px-2 font-medium">{u.display_name}</td>
                  <td className="py-2 px-2 text-gray-400">{u.email}</td>
                  <td className="py-2 px-2">{u.level}</td>
                  <td className="py-2 px-2 text-purple-400">{u.xp}</td>
                  <td className="py-2 px-2"><span className={`px-2 py-0.5 rounded text-xs ${u.role === 'admin' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'}`}>{u.role}</span></td>
                  <td className="py-2 px-2 text-gray-500">{new Date(u.created_at).toLocaleDateString('fr-FR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
