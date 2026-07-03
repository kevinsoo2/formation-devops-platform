'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    async function load() {
      try {
        const [courseRes, modulesRes] = await Promise.all([
          fetch(`${API_URL}/api/courses/${courseId}`),
          fetch(`${API_URL}/api/modules/${courseId}`),
        ]);
        const courseData = await courseRes.json();
        const modulesData = await modulesRes.json();
        if (courseData.data) setCourse(courseData.data);
        if (modulesData.data) setModules(modulesData.data);

        // Fetch progress if user logged in
        if (user) {
          const progRes = await fetch(`${API_URL}/api/progress/${user.id}`);
          const progData = await progRes.json();
          if (progData.data && progData.data[courseId]) {
            setProgress(progData.data[courseId]);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [courseId, user, API_URL]);

  if (loading) return <div className="text-center py-20 text-gray-400">Chargement...</div>;

  if (!course) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl mb-4">Formation non trouvée</h2>
        <p className="text-gray-400 mb-4">Le backend est peut-être en train de démarrer. Rechargez la page dans 30 secondes.</p>
        <Link href="/courses" className="text-purple-400">&larr; Retour aux formations</Link>
      </div>
    );
  }

  const completedModules = progress?.completedModules || [];
  const progressPercent = modules.length > 0 ? Math.round((completedModules.length / modules.length) * 100) : 0;
  const quizPassed = progress?.quizScores?.some(q => q.passed) || false;
  const canGetCertificate = progressPercent === 100 && quizPassed;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Link href="/courses" className="text-gray-500 hover:text-purple-400 text-sm mb-6 inline-block">&larr; Retour aux formations</Link>

      {/* Header */}
      <div className="card mb-8" style={{ borderTopColor: course.color, borderTopWidth: '3px' }}>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{course.icon}</span>
          <div>
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="text-purple-400 font-medium">{course.subtitle}</p>
          </div>
        </div>
        <p className="text-gray-400 mb-4">{course.description}</p>
        <div className="flex gap-3 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm">⏱ {course.duration}</span>
          <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm">🎓 {course.level}</span>
          <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm">📚 {modules.length} modules</span>
        </div>
      </div>

      {/* Progress Bar */}
      {user && (
        <div className="card mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">Progression du cours</span>
            <span className="text-sm text-purple-400 font-bold">{progressPercent}%</span>
          </div>
          <div className="h-3 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-green-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">{completedModules.length}/{modules.length} modules complétés</p>

          {canGetCertificate && (
            <div className="mt-4 pt-4 border-t border-border">
              <Link href={`/courses/${courseId}/certificate`} className="btn-primary inline-flex items-center gap-2 text-sm">
                🎓 Télécharger le certificat
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Objectifs */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Objectifs</h2>
        <ul className="space-y-2">
          {course.objectives?.map((obj, i) => (
            <li key={i} className="flex items-center gap-3 text-gray-400 border-b border-border pb-2">
              <span className="text-green-400 font-bold">✓</span> {obj}
            </li>
          ))}
        </ul>
      </section>

      {/* Modules */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Modules de formation</h2>
        <div className="space-y-3">
          {modules.map((mod, i) => {
            const isCompleted = completedModules.includes(mod.id);
            return (
              <Link key={mod.id} href={`/courses/${courseId}/modules/${mod.id}`} className="card flex items-center gap-4 hover:border-purple-500">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${isCompleted ? 'bg-green-500 text-white' : 'bg-surface'}`}>
                  {isCompleted ? '✓' : i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{mod.title}</h3>
                  <span className="text-xs text-gray-500">⏱ {mod.duration}</span>
                </div>
                <span className={`text-sm ${isCompleted ? 'text-green-400' : 'text-purple-400'}`}>
                  {isCompleted ? 'Terminé ✓' : 'Commencer →'}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quiz CTA */}
      <div className="card text-center py-8">
        <h2 className="text-xl font-bold mb-3">🎓 Quiz de validation</h2>
        <p className="text-gray-400 mb-4">Testez vos connaissances</p>
        <Link href={`/courses/${courseId}/quiz`} className="btn-primary inline-block">Passer le quiz</Link>
        {quizPassed && <p className="text-green-400 text-sm mt-3">✓ Quiz réussi !</p>}
      </div>
    </div>
  );
}
