const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function fetchCourses() {
  const res = await fetch(`${API_URL}/api/courses`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch courses');
  const data = await res.json();
  return data.data;
}

export async function fetchCourse(courseId) {
  const res = await fetch(`${API_URL}/api/courses/${courseId}`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  const data = await res.json();
  return data.data;
}

export async function fetchModules(courseId) {
  const res = await fetch(`${API_URL}/api/modules/${courseId}`, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  const data = await res.json();
  return data.data;
}

export async function fetchModule(courseId, moduleId) {
  const res = await fetch(`${API_URL}/api/modules/${courseId}/${moduleId}`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  const data = await res.json();
  return data.data;
}

export async function fetchQuiz(courseId) {
  const res = await fetch(`${API_URL}/api/quiz/${courseId}`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.data;
}

export async function submitQuiz(courseId, answers, userId) {
  const res = await fetch(`${API_URL}/api/quiz/${courseId}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers, userId }),
  });
  const data = await res.json();
  return data.data;
}

export async function completeModule(userId, courseId, moduleId) {
  const res = await fetch(`${API_URL}/api/progress/${userId}/complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ courseId, moduleId }),
  });
  return res.json();
}

export async function fetchProgress(userId) {
  const res = await fetch(`${API_URL}/api/progress/${userId}`, { cache: 'no-store' });
  if (!res.ok) return {};
  const data = await res.json();
  return data.data;
}
