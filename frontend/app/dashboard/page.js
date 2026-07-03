'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import ActivityHeatmap from '../../components/ActivityHeatmap';
import StudyTimeChart from '../../components/StudyTimeChart';

export default function DashboardPage() {
  const { user, token } = useAuth();
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState({});
  const [badges, setBadges] = useState([]);
  const [allBadges, setAllBadges] = useState([]);
  const [moduleCounts, setModuleCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState({ current_streak: 0, longest_streak: 0 });
  const [activity, setActivity] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [userChallenges, setUserChallenges] = useState([]);
  const [studyTime, setStudyTime] = useState({ totalSeconds: 0, weekly: [] });
  const [notifications, setNotifications] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    async function loadData() {
      try {
        const coursesRes = await fetch(`${API_URL}/api/courses`);
        const coursesData = await coursesRes.json();
        if (coursesData.data) setCourses(coursesData.data);

        const counts = {};
        if (coursesData.data) {
          for (const course of coursesData.data) {
            const modRes = await fetch(`${API_URL}/api/modules/${course.id}`);
            const modData = await modRes.json();
            counts[course.id] = modData.data?.length || 0;
          }
        }
        setModuleCounts(counts);

        if (user) {
          const [progressRes, badgesRes, allBadgesRes, streakRes, activityRes, challengesRes, userChRes, studyRes, notifsRes] = await Promise.all([
            fetch(`${API_URL}/api/progress/${user.id}`),
            fetch(`${API_URL}/api/badges/user/${user.id}`),
            fetch(`${API_URL}/api/badges`),
            fetch(`${API_URL}/api/streaks/${user.id}`),
            fetch(`${API_URL}/api/activity/${user.id}`),
            fetch(`${API_URL}/api/challenges`),
            fetch(`${API_URL}/api/challenges/user/${user.id}`),
            fetch(`${API_URL}/api/studytime/${user.id}`),
            fetch(`${API_URL}/api/notifications/${user.id}`),
          ]);

          const [progressData, badgesData, allBadgesData, streakData, activityData, challengesData, userChData, studyData, notifsData] = await Promise.all([
            progressRes.json(), badgesRes.json(), allBadgesRes.json(), streakRes.json(), activityRes.json(), challengesRes.json(), userChRes.json(), studyRes.json(), notifsRes.json(),
          ]);

          if (progressData.data) setProgress(progressData.data);
          if (badgesData.data) setBadges(badgesData.data);
          if (allBadgesData.data) setAllBadges(allBadgesData.data);
          if (streakData.data) setStreak(streakData.data);
          if (activityData.data) setActivity(activityData.data);
          if (challengesData.data) setChallenges(challengesData.data);
          if (userChData.data) setUserChallenges(userChData.data);
          if (studyData.data) setStudyTime(studyData.data);
          if (notifsData.data) setNotifications(notifsData.data);
        } else {
          const allBadgesRes = await fetch(`${API_URL}/api/badges`);
          const allBadgesData = await allBadgesRes.json();
          if (allBadgesData.data) setAllBadges(allBadgesData.data);
        }
      } catch (e) {
        console.error('Dashboard load error:', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user, API_URL]);

  // Load recently viewed from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('recently-viewed-modules');
      if (saved) setRecentlyViewed(JSON.parse(saved).slice(0, 3));
    } catch (e) {}
  }, []);

  if (loading) return <div className="text-center py-20 text-gray-400">Chargement...</div>;

  const getProgressPercent = (courseId) => {
    const completed = progress[courseId]?.completedModules?.length || 0;
    const total = moduleCounts[courseId] || 1;
    return Math.round((completed / total) * 100);
  };

  const totalModulesCompleted = Object.values(progress).reduce((acc, p) => acc + (p.completedModules?.length || 0), 0);
  const totalQuizPassed = Object.values(progress).reduce((acc, p) => acc + (p.quizScores?.filter(q => q.passed)?.length || 0), 0);
  const unreadNotifs = notifications.filter(n => !n.read);

  function downloadProgressReport() {
    const lines = [];
    lines.push('=== Rapport de Progression DevOps Academy ===');
    lines.push(`Date: ${new Date().toLocaleDateString('fr-FR')}`);
    lines.push('');
    if (user) {
      lines.push(`Utilisateur: ${user.displayName} (@${user.username})`);
      lines.push(`Niveau: ${user.level} | XP: ${user.xp}`);
      lines.push(`Streak actuel: ${streak.current_streak || streak.currentStreak || 0} jours`);
      lines.push('');
    }
    lines.push('--- Progression des cours ---');
    courses.forEach(c => {
      const pct = getProgressPercent(c.id);
      lines.push(`${c.icon} ${c.title}: ${pct}%`);
    });
    lines.push('');
    lines.push(`Modules terminés: ${totalModulesCompleted}`);
    lines.push(`Quiz réussis: ${totalQuizPassed}`);
    lines.push(`Badges obtenus: ${badges.length}/${allBadges.filter(b => !b.hidden).length}`);
    lines.push('');
    lines.push('--- Badges ---');
    badges.forEach(b => lines.push(`  ${b.icon} ${b.name}`));
    lines.push('');
    lines.push('=== Fin du rapport ===');

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rapport-progression-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-2">Tableau de bord</h1>
        <p className="text-gray-400">Suivez votre progression dans les formations</p>
      </div>

      {user ? (
        <>
          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="card text-center">
              <div className="text-3xl mb-2">⚡</div>
              <p className="text-2xl font-bold text-purple-400">{user.xp}</p>
              <p className="text-xs text-gray-400">Points XP</p>
            </div>
            <div className="card text-center">
              <div className="text-3xl mb-2">🎮</div>
              <p className="text-2xl font-bold text-purple-400">{user.level}</p>
              <p className="text-xs text-gray-400">Niveau</p>
            </div>
            <div className="card text-center">
              <div className="text-3xl mb-2">📖</div>
              <p className="text-2xl font-bold text-purple-400">{totalModulesCompleted}</p>
              <p className="text-xs text-gray-400">Modules terminés</p>
            </div>
            <div className="card text-center">
              <div className="text-3xl mb-2">✅</div>
              <p className="text-2xl font-bold text-purple-400">{totalQuizPassed}</p>
              <p className="text-xs text-gray-400">Quiz réussis</p>
            </div>
            <div className="card text-center">
              <div className="text-3xl mb-2">🔥</div>
              <p className="text-2xl font-bold text-orange-400">{streak.current_streak || streak.currentStreak || 0}</p>
              <p className="text-xs text-gray-400">Jours de streak</p>
            </div>
          </div>

          {/* XP Progress bar */}
          <div className="card mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progression vers le niveau {user.level + 1}</span>
              <span className="text-xs text-purple-400">{user.xp % 500}/500 XP</span>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full transition-all" style={{ width: `${((user.xp % 500) / 500) * 100}%` }} />
            </div>
            <div className="mt-3">
              <button onClick={downloadProgressReport} className="text-sm px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500/20 transition-all">
                📥 Télécharger le rapport de progression
              </button>
            </div>
          </div>

          {/* Continue learning (recently viewed) */}
          {recentlyViewed.length > 0 && (
            <div className="card mb-8">
              <h2 className="text-lg font-bold mb-4">📖 Continuer l&apos;apprentissage</h2>
              <div className="grid md:grid-cols-3 gap-3">
                {recentlyViewed.map((item, i) => (
                  <Link key={i} href={`/courses/${item.courseId}/modules/${item.moduleId}`} className="p-4 rounded-lg border border-border bg-surface hover:border-purple-500 transition-all">
                    <p className="text-xs text-purple-400 mb-1">{item.courseName}</p>
                    <p className="text-sm font-medium">{item.moduleTitle}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.viewedAt ? new Date(item.viewedAt).toLocaleDateString('fr-FR') : ''}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Heatmap + Study time */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <ActivityHeatmap data={activity} />
            <StudyTimeChart weekly={studyTime.weekly} totalSeconds={studyTime.totalSeconds} />
          </div>

          {/* Weekly Challenges */}
          {challenges.length > 0 && (
            <div className="card mb-8">
              <h2 className="text-lg font-bold mb-4">🎯 Défis de la semaine</h2>
              <div className="space-y-3">
                {challenges.map(ch => {
                  const uc = userChallenges.find(u => u.challenge_id === ch.id);
                  const prog = uc?.progress || 0;
                  const pct = Math.min((prog / ch.target_count) * 100, 100);
                  const completed = uc?.completed === 1;
                  return (
                    <div key={ch.id} className={`p-4 rounded-lg border ${completed ? 'border-green-500/50 bg-green-500/5' : 'border-border bg-surface'}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm">{ch.title}</span>
                        <span className="text-xs text-purple-400">+{ch.xp_reward} XP</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{ch.description}</p>
                      <div className="h-2 bg-border rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${completed ? 'bg-green-500' : 'bg-gradient-to-r from-purple-500 to-purple-700'}`} style={{ width: `${pct}%` }} />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{prog}/{ch.target_count}</span>
                        {completed && <span className="text-green-400">✓ Complété</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Notifications */}
          {unreadNotifs.length > 0 && (
            <div className="card mb-8">
              <h2 className="text-lg font-bold mb-4">🔔 Notifications ({unreadNotifs.length})</h2>
              <div className="space-y-2">
                {unreadNotifs.slice(0, 5).map(n => (
                  <div key={n.id} className="flex items-center gap-3 p-3 rounded-lg bg-surface border border-border">
                    <span className="text-lg">{n.type === 'badge' ? '🏅' : n.type === 'streak' ? '🔥' : '🎯'}</span>
                    <span className="text-sm">{n.message}</span>
                    <span className="text-xs text-gray-500 ml-auto">{new Date(n.created_at).toLocaleDateString('fr-FR')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Badges */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">🏅 Badges ({badges.length}/{allBadges.filter(b => !b.hidden).length})</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {allBadges.map(badge => {
                const earned = badges.find(b => b.id === badge.id);
                if (badge.hidden && !earned) {
                  return (
                    <div key={badge.id} className="card text-center !p-4 opacity-40">
                      <span className="text-3xl block mb-2">❓</span>
                      <h3 className="text-xs font-semibold mb-1">???</h3>
                      <p className="text-xs text-gray-500">Badge secret</p>
                    </div>
                  );
                }
                return (
                  <div key={badge.id} className={`card text-center !p-4 ${earned ? 'border-purple-500/50' : 'opacity-40'}`}>
                    <span className="text-3xl block mb-2">{badge.icon}</span>
                    <h3 className="text-xs font-semibold mb-1">{badge.name}</h3>
                    <p className="text-xs text-gray-500">{badge.description}</p>
                    {earned && <p className="text-xs text-purple-400 mt-1">✓ Obtenu</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="card mb-8 border-purple-500/30">
          <p className="text-gray-400 text-sm">💡 <Link href="/login" className="text-purple-400 hover:underline">Connectez-vous</Link> pour suivre votre progression, gagner des XP et débloquer des badges !</p>
        </div>
      )}

      {/* Courses */}
      <h2 className="text-xl font-bold mb-4">Formations disponibles</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(course => {
          const percent = getProgressPercent(course.id);
          return (
            <Link key={course.id} href={`/courses/${course.id}`} className="card hover:border-purple-500 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{course.icon}</span>
                <span className="font-semibold">{course.title}</span>
              </div>
              <div className="h-1.5 bg-border rounded-full overflow-hidden mb-2">
                <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-700 transition-all" style={{ width: `${percent}%` }} />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{percent}% complété</span>
                <span>{course.duration}</span>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400">{course.level}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {courses.length === 0 && (
        <div className="card text-center py-12">
          <span className="text-4xl block mb-4">🚀</span>
          <h3 className="text-lg font-bold mb-2">Initialisez la base de données</h3>
          <p className="text-gray-400 mb-4">Lancez le seed pour charger les formations.</p>
        </div>
      )}
    </div>
  );
}
