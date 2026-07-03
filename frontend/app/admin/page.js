'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Breadcrumbs from '../../components/Breadcrumbs';

export default function AdminPage() {
  const { user, token } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [forumPosts, setForumPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('stats');
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    if (!user || user.role !== 'admin') { setLoading(false); return; }
    Promise.all([
      fetch(`${API_URL}/api/admin/stats`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch(`${API_URL}/api/admin/users`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch(`${API_URL}/api/admin/forum`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
    ]).then(([statsData, usersData, forumData]) => {
      if (statsData.data) setStats(statsData.data);
      if (usersData.data) setUsers(usersData.data);
      if (forumData.data) setForumPosts(forumData.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [user, token, API_URL]);

  const handleBan = async (userId) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/users/${userId}/ban`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.map(u => u.id === userId ? { ...u, role: data.role } : u));
      }
    } catch (e) { console.error(e); }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Supprimer cet utilisateur définitivement ?')) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.filter(u => u.id !== userId));
      }
    } catch (e) { console.error(e); }
  };

  const handleDeletePost = async (postId) => {
    if (!confirm('Supprimer ce post du forum ?')) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/forum/${postId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setForumPosts(forumPosts.filter(p => p.id !== postId));
      }
    } catch (e) { console.error(e); }
  };

  const handleExportCSV = () => {
    const secret = prompt('Entrez le secret d\'export :');
    if (!secret) return;
    window.open(`${API_URL}/api/admin/export-csv/${secret}`, '_blank');
  };

  if (loading) return <div className="text-center py-20 text-gray-400">Chargement...</div>;
  if (!user || user.role !== 'admin') {
    return <div className="max-w-4xl mx-auto px-6 py-12"><div className="card text-center py-12"><span className="text-4xl block mb-4">🔒</span><p className="text-gray-400">Accès réservé aux administrateurs.</p></div></div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Breadcrumbs items={[{ label: 'Accueil', href: '/' }, { label: 'Administration' }]} />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold">⚙️ Administration</h1>
        <button onClick={handleExportCSV} className="btn-primary text-sm px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium">
          📥 Export CSV
        </button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card text-center p-4">
            <p className="text-3xl font-bold text-purple-400">{stats.totalUsers}</p>
            <p className="text-xs text-gray-400 mt-1">Utilisateurs total</p>
          </div>
          <div className="card text-center p-4">
            <p className="text-3xl font-bold text-green-400">{stats.totalCompletions}</p>
            <p className="text-xs text-gray-400 mt-1">Modules complétés</p>
          </div>
          <div className="card text-center p-4">
            <p className="text-3xl font-bold text-blue-400">{stats.totalQuizPassed}</p>
            <p className="text-xs text-gray-400 mt-1">Quiz réussis</p>
          </div>
          <div className="card text-center p-4">
            <p className="text-3xl font-bold text-yellow-400">{stats.activeToday || 0}</p>
            <p className="text-xs text-gray-400 mt-1">Actifs aujourd&apos;hui</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border pb-2">
        <button onClick={() => setTab('stats')} className={`px-4 py-2 rounded-t-lg text-sm font-medium ${tab === 'stats' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}>
          📊 Statistiques
        </button>
        <button onClick={() => setTab('users')} className={`px-4 py-2 rounded-t-lg text-sm font-medium ${tab === 'users' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}>
          👥 Utilisateurs
        </button>
        <button onClick={() => setTab('forum')} className={`px-4 py-2 rounded-t-lg text-sm font-medium ${tab === 'forum' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}>
          💬 Modération Forum
        </button>
      </div>

      {/* Stats Tab */}
      {tab === 'stats' && stats?.popularCourses && (
        <div className="card p-6">
          <h2 className="text-lg font-bold mb-4">📊 Cours les plus populaires</h2>
          <div className="space-y-2">
            {stats.popularCourses.map((c, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm">{c.course_id}</span>
                <span className="text-sm text-purple-400 font-bold">{c.completions} complétions</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Users Tab */}
      {tab === 'users' && (
        <div className="card p-6">
          <h2 className="text-lg font-bold mb-4">👥 Gestion des utilisateurs ({users.length})</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-gray-500">
                  <th className="py-2 px-2">Nom</th>
                  <th className="py-2 px-2">Email</th>
                  <th className="py-2 px-2">XP</th>
                  <th className="py-2 px-2">Niveau</th>
                  <th className="py-2 px-2">Rôle</th>
                  <th className="py-2 px-2">Inscrit le</th>
                  <th className="py-2 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-b border-border/50 hover:bg-white/5">
                    <td className="py-2 px-2 font-medium">{u.display_name}</td>
                    <td className="py-2 px-2 text-gray-400">{u.email}</td>
                    <td className="py-2 px-2 text-purple-400 font-bold">{u.xp}</td>
                    <td className="py-2 px-2">{u.level}</td>
                    <td className="py-2 px-2">
                      <span className={`px-2 py-0.5 rounded text-xs ${u.role === 'admin' ? 'bg-red-500/20 text-red-400' : u.role === 'banned' ? 'bg-orange-500/20 text-orange-400' : 'bg-gray-500/20 text-gray-400'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-gray-500">{new Date(u.created_at).toLocaleDateString('fr-FR')}</td>
                    <td className="py-2 px-2">
                      {u.role !== 'admin' && (
                        <div className="flex gap-1">
                          <button onClick={() => handleBan(u.id)} className={`px-2 py-1 rounded text-xs ${u.role === 'banned' ? 'bg-green-600 hover:bg-green-700' : 'bg-orange-600 hover:bg-orange-700'} text-white`}>
                            {u.role === 'banned' ? 'Débannir' : 'Bannir'}
                          </button>
                          <button onClick={() => handleDeleteUser(u.id)} className="px-2 py-1 rounded text-xs bg-red-600 hover:bg-red-700 text-white">
                            Supprimer
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Forum Moderation Tab */}
      {tab === 'forum' && (
        <div className="card p-6">
          <h2 className="text-lg font-bold mb-4">💬 Posts récents du forum</h2>
          {forumPosts.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Aucun post dans le forum.</p>
          ) : (
            <div className="space-y-3">
              {forumPosts.map(post => (
                <div key={post.id} className="flex items-start justify-between p-3 rounded-lg border border-border">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{post.title}</p>
                    <p className="text-xs text-gray-400 mt-1">Par {post.display_name || post.username || 'Anonyme'} • {new Date(post.created_at).toLocaleDateString('fr-FR')}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{post.content}</p>
                  </div>
                  <button onClick={() => handleDeletePost(post.id)} className="ml-3 px-3 py-1 rounded text-xs bg-red-600 hover:bg-red-700 text-white shrink-0">
                    🗑️ Supprimer
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
