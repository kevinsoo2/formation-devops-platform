const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function fetchCourses() {
  try {
    const res = await fetch(`${API_URL}/api/courses`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data;
  } catch (e) {
    console.error('fetchCourses error:', e.message, 'API_URL:', API_URL);
    return [];
  }
}

export async function fetchCourse(courseId) {
  try {
    const res = await fetch(`${API_URL}/api/courses/${courseId}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (e) {
    console.error('fetchCourse error:', e.message, 'API_URL:', API_URL);
    return null;
  }
}

export async function fetchModules(courseId) {
  try {
    const res = await fetch(`${API_URL}/api/modules/${courseId}`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data;
  } catch (e) {
    console.error('fetchModules error:', e.message, 'API_URL:', API_URL);
    return [];
  }
}

export async function fetchModule(courseId, moduleId) {
  try {
    const res = await fetch(`${API_URL}/api/modules/${courseId}/${moduleId}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (e) {
    console.error('fetchModule error:', e.message);
    return null;
  }
}

export async function fetchQuiz(courseId) {
  try {
    const res = await fetch(`${API_URL}/api/quiz/${courseId}`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data;
  } catch (e) {
    console.error('fetchQuiz error:', e.message);
    return [];
  }
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
  try {
    const res = await fetch(`${API_URL}/api/progress/${userId}`, { cache: 'no-store' });
    if (!res.ok) return {};
    const data = await res.json();
    return data.data;
  } catch (e) {
    return {};
  }
}
