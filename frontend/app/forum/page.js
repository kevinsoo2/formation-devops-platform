'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import Breadcrumbs from '../../components/Breadcrumbs';

export default function ForumPage() {
  const { user, token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/forum${courseFilter ? `?courseId=${courseFilter}` : ''}`).then(r => r.json()),
      fetch(`${API_URL}/api/courses`).then(r => r.json()),
    ]).then(([forumData, coursesData]) => {
      if (forumData.data) setPosts(forumData.data);
      if (coursesData.data) setCourses(coursesData.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [API_URL, courseFilter]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    await fetch(`${API_URL}/api/forum`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, content, courseId: courseFilter || null }),
    });
    setTitle(''); setContent(''); setShowForm(false);
    const res = await fetch(`${API_URL}/api/forum`); const d = await res.json();
    if (d.data) setPosts(d.data);
  }

  if (loading) return <div className="text-center py-20 text-gray-400">Chargement...</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Breadcrumbs items={[{ label: 'Accueil', href: '/' }, { label: 'Forum' }]} />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-extrabold">💬 Forum Q&A</h1>
          <p className="text-gray-400">Posez vos questions à la communauté</p>
        </div>
        {user && <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm">+ Nouveau sujet</button>}
      </div>

      {/* Filter by course */}
      <select value={courseFilter} onChange={e => setCourseFilter(e.target.value)} className="mb-6 px-4 py-2 rounded-lg bg-surface border border-border text-sm" aria-label="Filtrer par cours">
        <option value="">Tous les cours</option>
        {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
      </select>

      {/* New post form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="card mb-6">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre du sujet" className="w-full px-4 py-2 mb-3 rounded-lg bg-surface border border-border focus:border-purple-500 focus:outline-none" />
          <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Décrivez votre question..." rows={4} className="w-full px-4 py-2 rounded-lg bg-surface border border-border focus:border-purple-500 focus:outline-none resize-none mb-3" />
          <button type="submit" className="btn-primary text-sm">Publier</button>
        </form>
      )}

      {/* Posts list */}
      <div className="space-y-4">
        {posts.map(post => (
          <Link key={post.id} href={`/forum/${post.id}`} className="card block hover:border-purple-500 transition-all">
            <h3 className="font-semibold text-white mb-1">{post.title}</h3>
            <p className="text-sm text-gray-400 line-clamp-2">{post.content}</p>
            <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
              <span>{post.display_name || post.username || 'Anonyme'}</span>
              <span>{new Date(post.created_at).toLocaleDateString('fr-FR')}</span>
              {post.course_id && <span className="text-purple-400">{courses.find(c => c.id === post.course_id)?.title}</span>}
            </div>
          </Link>
        ))}
        {posts.length === 0 && <p className="text-center text-gray-500 py-8">Aucun sujet pour le moment. Soyez le premier !</p>}
      </div>
    </div>
  );
}
