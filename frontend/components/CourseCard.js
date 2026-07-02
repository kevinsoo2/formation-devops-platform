import Link from 'next/link';

export default function CourseCard({ course, index }) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="card group"
      style={{ animationDelay: `${index * 0.1}s`, borderTopColor: course.color }}
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
      <div className="flex gap-4 mt-4 pt-4 border-t border-border">
        <span className="text-xs text-gray-500">&#9200; {course.duration}</span>
        <span className="text-xs text-gray-500">&#128218; {course.category}</span>
      </div>
    </Link>
  );
}
