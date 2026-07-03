'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import Breadcrumbs from '../../../components/Breadcrumbs';

export default function ForumPostPage() {
  const { postId } = useParams();
  const { user, token } = useAuth();
  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    fetch(`${API_URL}/api/forum/${postId}`).then(r => r.json()).then(d => {
      if (d.data) { setPost(d.data.post); setReplies(d.data.replies || []); }
    }).catch(() => {}).finally(() => setLoading(false));
  }, [postId, API_URL]);

  async function handleReply(e) {
    e.preventDefault();
    if (!replyContent.trim()) return;
    await fetch(`${API_URL}/api/forum/${postId}/reply`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ content: replyContent }),
    });
    setReplyContent('');
    const res = await fetch(`${API_URL}/api/forum/${postId}`); const d = await res.json();
    if (d.data) setReplies(d.data.replies || []);
  }

  async function handleUpvote(replyId) {
    await fetch(`${API_URL}/api/forum/reply/${replyId}/upvote`, { method: 'POST' });
    setReplies(replies.map(r => r.id === replyId ? { ...r, upvotes: (r.upvotes || 0) + 1 } : r));
  }

  if (loading) return <div className="text-center py-20 text-gray-400">Chargement...</div>;
  if (!post) return <div className="text-center py-20">Sujet non trouvé</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Breadcrumbs items={[{ label: 'Accueil', href: '/' }, { label: 'Forum', href: '/forum' }, { label: post.title }]} />
      <div className="card mb-6">
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-400 whitespace-pre-wrap">{post.content}</p>
        <div className="mt-4 text-xs text-gray-500">
          Par {post.display_name || post.username} • {new Date(post.created_at).toLocaleDateString('fr-FR')}
        </div>
      </div>

      <h2 className="text-lg font-bold mb-4">Réponses ({replies.length})</h2>
      <div className="space-y-4 mb-6">
        {replies.map(reply => (
          <div key={reply.id} className="card !p-4">
            <p className="text-gray-300 text-sm whitespace-pre-wrap">{reply.content}</p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">{reply.display_name || reply.username} • {new Date(reply.created_at).toLocaleDateString('fr-FR')}</span>
              <button onClick={() => handleUpvote(reply.id)} className="text-xs text-gray-500 hover:text-purple-400 flex items-center gap-1">
                👍 {reply.upvotes || 0}
              </button>
            </div>
          </div>
        ))}
      </div>

      {user ? (
        <form onSubmit={handleReply} className="card">
          <textarea value={replyContent} onChange={e => setReplyContent(e.target.value)} placeholder="Écrire une réponse..." rows={3} className="w-full px-4 py-2 rounded-lg bg-surface border border-border focus:border-purple-500 focus:outline-none resize-none mb-3" />
          <button type="submit" className="btn-primary text-sm">Répondre</button>
        </form>
      ) : (
        <p className="text-gray-500 text-sm">Connectez-vous pour répondre.</p>
      )}
    </div>
  );
}
