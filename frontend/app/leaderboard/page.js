'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [weeklyLeaderboard, setWeeklyLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('global');
  const { user } = useAuth();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/leaderboard`).then(r => r.json()),
      fetch(`${API_URL}/api/leaderboard/weekly`).then(r => r.json()).catch(() => ({ data: [] })),
    ]).then(([globalData, weeklyData]) => {
      if (globalData.success) setLeaderboard(globalData.data);
      if (weeklyData.success) setWeeklyLeaderboard(weeklyData.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [API_URL]);

  if (loading) return <div className="text-center py-20 text-gray-400">Chargement...</div>;

  const activeLeaderboard = tab === 'global' ? leaderboard : weeklyLeaderboard;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold mb-2">🏆 Classement</h1>
        <p className="text-gray-400">Les meilleurs apprenants de la communauté</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-8">
        <button
          onClick={() => setTab('global')}
          className={`px-5 py-2 rounded-lg font-medium text-sm transition-all ${tab === 'global' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' : 'text-gray-400 hover:text-purple-400'}`}
        >
          🌍 Global
        </button>
        <button
          onClick={() => setTab('weekly')}
          className={`px-5 py-2 rounded-lg font-medium text-sm transition-all ${tab === 'weekly' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' : 'text-gray-400 hover:text-purple-400'}`}
        >
          📅 Cette semaine
        </button>
      </div>

      {activeLeaderboard.length === 0 ? (
        <div className="card text-center py-12">
          <span className="text-4xl block mb-4">👥</span>
          <h3 className="text-lg font-bold mb-2">{tab === 'weekly' ? 'Aucune activité cette semaine' : 'Aucun participant'}</h3>
          <p className="text-gray-400">{tab === 'weekly' ? 'Les scores se réinitialisent chaque lundi.' : 'Inscrivez-vous et commencez à apprendre pour apparaître ici !'}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Top 3 podium */}
          {activeLeaderboard.length >= 3 && (
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[1, 0, 2].map(idx => {
                const entry = activeLeaderboard[idx];
                if (!entry) return null;
                const medals = ['🥇', '🥈', '🥉'];
                const sizes = ['scale-110', 'scale-100', 'scale-100'];
                return (
                  <div key={entry.id} className={`card text-center ${idx === 0 ? 'transform scale-110 border-yellow-500/50' : ''} ${idx === 1 ? 'border-gray-400/50' : ''} ${idx === 2 ? 'border-orange-500/50' : ''}`}>
                    <span className="text-3xl block mb-2">{medals[idx]}</span>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold mx-auto mb-2">
                      {entry.avatar || entry.username.charAt(0).toUpperCase()}
                    </div>
                    <h3 className="font-semibold text-sm">{entry.displayName}</h3>
                    <p className="text-purple-400 text-xs font-medium">Niv. {entry.level}</p>
                    <p className="text-sm font-bold mt-1">{entry.xp} XP</p>
                    {entry.badgesCount > 0 && (
                      <p className="text-xs text-gray-400 mt-1">🏅 {entry.badgesCount} badge{entry.badgesCount > 1 ? 's' : ''}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Full list */}
          <div className="card !p-0 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-sm text-gray-400">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Utilisateur</th>
                  <th className="px-4 py-3 text-center">Niveau</th>
                  <th className="px-4 py-3 text-right">XP</th>
                  <th className="px-4 py-3 text-center">Badges</th>
                </tr>
              </thead>
              <tbody>
              {activeLeaderboard.map(entry => (
                  <tr key={entry.id} className={`border-b border-border/50 hover:bg-purple-500/5 transition-all ${user?.id === entry.id ? 'bg-purple-500/10' : ''}`}>
                    <td className="px-4 py-3">
                      <span className={`font-bold ${entry.rank <= 3 ? 'text-purple-400' : 'text-gray-500'}`}>
                        {entry.rank <= 3 ? ['🥇', '🥈', '🥉'][entry.rank - 1] : entry.rank}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {entry.avatar || entry.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-medium text-sm">{entry.displayName}</span>
                          <span className="text-xs text-gray-500 block">@{entry.username}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold">
                        {entry.level}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-sm">{entry.xp}</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-400">{entry.badgesCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
