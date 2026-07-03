'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

export default function DashboardPage() {
  const { user, token } = useAuth();
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState({});
  const [badges, setBadges] = useState([]);
  const [allBadges, setAllBadges] = useState([]);
  const [moduleCounts, setModuleCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    async function loadData() {
      try {
        // Fetch courses
        const coursesRes = await fetch(`${API_URL}/api/courses`);
        const coursesData = await coursesRes.json();
        if (coursesData.data) setCourses(coursesData.data);

        // Fetch module counts per course
        const counts = {};
        if (coursesData.data) {
          for (const course of coursesData.data) {
            const modRes = await fetch(`${API_URL}/api/modules/${course.id}`);
            const modData = await modRes.json();
            counts[course.id] = modData.data?.length || 0;
          }
        }
        setModuleCounts(counts);

        // Fetch progress if user is logged in
        if (user) {
          const progressRes = await fetch(`${API_URL}/api/progress/${user.id}`);
          const progressData = await progressRes.json();
          if (progressData.data) setProgress(progressData.data);

          // Fetch user badges
          const badgesRes = await fetch(`${API_URL}/api/badges/user/${user.id}`);
          const badgesData = await badgesRes.json();
          if (badgesData.data) setBadges(badgesData.data);
        }

        // Fetch all available badges
        const allBadgesRes = await fetch(`${API_URL}/api/badges`);
        const allBadgesData = await allBadgesRes.json();
        if (allBadgesData.data) setAllBadges(allBadgesData.data);
      } catch (e) {
        console.error('Dashboard load error:', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user, API_URL]);

  if (loading) return <div className="text-center py-20 text-gray-400">Chargement...</div>;

  const getProgressPercent = (courseId) => {
    const completed = progress[courseId]?.completedModules?.length || 0;
    const total = moduleCounts[courseId] || 1;
    return Math.round((completed / total) * 100);
  };

  const totalModulesCompleted = Object.values(progress).reduce((acc, p) => acc + (p.completedModules?.length || 0), 0);
  const totalQuizPassed = Object.values(progress).reduce((acc, p) => acc + (p.quizScores?.filter(q => q.passed)?.length || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-2">Tableau de bord</h1>
        <p className="text-gray-400">Suivez votre progression dans les formations</p>
      </div>

      {/* User Stats - only show if logged in */}
      {user ? (
        <>
          <div className="grid md:grid-cols-4 gap-4 mb-8">
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
          </div>

          {/* XP Progress to next level */}
          <div className="card mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progression vers le niveau {user.level + 1}</span>
              <span className="text-xs text-purple-400">{user.xp % 500}/500 XP</span>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full transition-all"
                style={{ width: `${((user.xp % 500) / 500) * 100}%` }}
              />
            </div>
          </div>

          {/* Badges Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">🏅 Badges ({badges.length}/{allBadges.length})</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {allBadges.map(badge => {
                const earned = badges.find(b => b.id === badge.id);
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
          <p className="text-gray-400 text-sm">
            💡 <Link href="/login" className="text-purple-400 hover:underline">Connectez-vous</Link> pour suivre votre progression, gagner des XP et débloquer des badges !
          </p>
        </div>
      )}

      {/* Courses Grid with Progress */}
      <h2 className="text-xl font-bold mb-4">Formations disponibles</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(course => {
          const percent = getProgressPercent(course.id);
          return (
            <Link key={course.id} href={`/courses/${course.id}`} className="card hover:border-purple-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{course.icon}</span>
                <span className="font-semibold">{course.title}</span>
              </div>
              <div className="h-1.5 bg-border rounded-full overflow-hidden mb-2">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-700 transition-all"
                  style={{ width: `${percent}%` }}
                />
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
