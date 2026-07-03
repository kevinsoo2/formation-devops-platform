'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ActivityHeatmap from '../../../components/ActivityHeatmap';
import Breadcrumbs from '../../../components/Breadcrumbs';

export default function ProfilePage() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/users/${userId}/profile`).then(r => r.json()),
      fetch(`${API_URL}/api/activity/${userId}`).then(r => r.json()),
    ]).then(([profileData, activityData]) => {
      if (profileData.data) setProfile(profileData.data);
      if (activityData.data) setActivity(activityData.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [userId, API_URL]);

  if (loading) return <div className="text-center py-20 text-gray-400">Chargement...</div>;
  if (!profile) return <div className="text-center py-20"><h2>Profil non trouvé</h2></div>;

  const { user, badges, progress, streak } = profile;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Breadcrumbs items={[{ label: 'Accueil', href: '/' }, { label: 'Profil' }]} />
      
      {/* User header */}
      <div className="card mb-6 flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center text-white text-3xl font-bold">
          {user.avatar || user.username?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user.display_name}</h1>
          <p className="text-gray-400">@{user.username}</p>
          <div className="flex gap-4 mt-2">
            <span className="text-sm text-purple-400 font-bold">Niv. {user.level}</span>
            <span className="text-sm text-purple-400">{user.xp} XP</span>
            {streak.current_streak > 0 && <span className="text-sm text-orange-400">🔥 {streak.current_streak} jours</span>}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="card text-center">
          <p className="text-2xl font-bold text-purple-400">{user.xp}</p>
          <p className="text-xs text-gray-400">XP Total</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-purple-400">{badges.length}</p>
          <p className="text-xs text-gray-400">Badges</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-purple-400">{progress.length}</p>
          <p className="text-xs text-gray-400">Cours en cours</p>
        </div>
      </div>

      {/* Heatmap */}
      <div className="mb-6">
        <ActivityHeatmap data={activity} />
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-bold mb-4">🏅 Badges</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {badges.map(badge => (
              <div key={badge.id} className="text-center p-3 rounded-lg bg-surface border border-border">
                <span className="text-2xl block mb-1">{badge.icon}</span>
                <span className="text-xs">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
