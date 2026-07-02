import Link from 'next/link';
import { fetchCourse, fetchModules } from '../../../lib/api';

export default async function CourseDetailPage({ params }) {
  const { courseId } = params;
  const [course, modules] = await Promise.all([fetchCourse(courseId), fetchModules(courseId)]);

  if (!course) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl mb-4">Formation non trouvée</h2>
        <p className="text-gray-400 mb-4">Le backend est peut-être en train de démarrer (plan gratuit Render). Rechargez la page dans 30 secondes.</p>
        <Link href="/courses" className="text-purple-400">← Retour aux formations</Link>
      </div>
    );
  }

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
          <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm">&#9200; {course.duration}</span>
          <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm">&#127891; {course.level}</span>
          <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm">&#128218; {modules.length} modules</span>
        </div>
      </div>

      {/* Objectifs */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Objectifs</h2>
        <ul className="space-y-2">
          {course.objectives?.map((obj, i) => (
            <li key={i} className="flex items-center gap-3 text-gray-400 border-b border-border pb-2">
              <span className="text-green-400 font-bold">&#10003;</span> {obj}
            </li>
          ))}
        </ul>
      </section>

      {/* Modules */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Modules de formation</h2>
        <div className="space-y-3">
          {modules.map((mod, i) => (
            <Link key={mod.id} href={`/courses/${courseId}/modules/${mod.id}`} className="card flex items-center gap-4 hover:border-purple-500">
              <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</div>
              <div className="flex-1">
                <h3 className="font-semibold">{mod.title}</h3>
                <span className="text-xs text-gray-500">&#9200; {mod.duration}</span>
              </div>
              <span className="text-purple-400 text-sm">Commencer &rarr;</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Quiz CTA */}
      <div className="card text-center py-8">
        <h2 className="text-xl font-bold mb-3">&#127891; Quiz de validation</h2>
        <p className="text-gray-400 mb-4">Testez vos connaissances</p>
        <Link href={`/courses/${courseId}/quiz`} className="btn-primary inline-block">Passer le quiz</Link>
      </div>
    </div>
  );
}
