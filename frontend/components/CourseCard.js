import Link from 'next/link';

export default function CourseCard({ course, index, progress = 0 }) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="card group"
      style={{ animationDelay: `${index * 0.1}s`, borderTopColor: course.color }}
      aria-label={`${course.title} - ${course.subtitle}`}
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-3xl">{course.icon}</span>
        <span className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 font-semibold uppercase">
          {course.level}
        </span>
      </div>
      <h3 className="text-lg font-bold mb-1 group-hover:text-purple-400 transition-colors">{course.title}</h3>
      <p className="text-sm text-purple-400 font-medium mb-3">{course.subtitle}</p>
      <p className="text-sm text-gray-400 line-clamp-3 flex-1">{course.description}</p>

      {/* Progress bar */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-500">Progression</span>
          <span className="text-xs text-purple-400 font-semibold">{progress}%</span>
        </div>
        <div className="h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex gap-4 mt-3">
        <span className="text-xs text-gray-500">⏱ {course.duration}</span>
        <span className="text-xs text-gray-500">📚 {course.category}</span>
      </div>
    </Link>
  );
}
