import Link from 'next/link';
import { fetchCourses } from '../../lib/api';

export const metadata = { title: 'Tableau de bord - DevOps Academy' };

export default async function DashboardPage() {
  let courses = [];
  try { courses = await fetchCourses(); } catch (e) {}

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-2">Tableau de bord</h1>
        <p className="text-gray-400">Suivez votre progression dans les formations</p>
      </div>

      {/* Info */}
      <div className="card mb-8 border-purple-500/30">
        <p className="text-gray-400 text-sm">
          💡 La progression est sauvegardée dans la base de données Turso. 
          Connectez-vous pour synchroniser votre avancement entre appareils.
        </p>
      </div>

      {/* Courses Grid */}
      <h2 className="text-xl font-bold mb-4">Formations disponibles</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(course => (
          <Link key={course.id} href={`/courses/${course.id}`} className="card hover:border-purple-500">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{course.icon}</span>
              <span className="font-semibold">{course.title}</span>
            </div>
            <div className="h-1.5 bg-border rounded-full overflow-hidden mb-2">
              <div className="h-full rounded-full" style={{ width: '0%', background: course.color }} />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{course.duration}</span>
              <span>{course.level}</span>
            </div>
          </Link>
        ))}
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
