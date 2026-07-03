import { fetchCourses } from '../../lib/api';
import CourseCard from '../../components/CourseCard';

export const metadata = {
  title: 'Formations - DevOps Academy',
  description: 'Explorez nos formations complètes sur les outils DevOps : Docker, Kubernetes, Terraform, Ansible, Jenkins, GitLab CI et plus.',
  openGraph: {
    title: 'Formations DevOps - DevOps Academy',
    description: '15 formations complètes sur les outils DevOps avec quiz, XP et badges.',
  },
};

export default async function CoursesPage() {
  let courses = [];
  try {
    courses = await fetchCourses();
  } catch (e) {
    console.error('Failed to fetch courses:', e);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold mb-3">Nos Formations</h1>
        <p className="text-gray-400">Explorez nos formations complètes sur les outils DevOps</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, i) => (
          <div key={course.id} className="stagger-card">
            <CourseCard course={course} index={i} />
          </div>
        ))}
      </div>
      {courses.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-xl mb-4">Aucune formation disponible</p>
          <p>Vérifiez la connexion au backend API et que la base de données est initialisée.</p>
        </div>
      )}
    </div>
  );
}
