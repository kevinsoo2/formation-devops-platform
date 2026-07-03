'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '../../../../../contexts/AuthContext';

export default function ModulePage() {
  const { courseId, moduleId } = useParams();
  const { user, token, refreshUser } = useAuth();
  const [mod, setMod] = useState(null);
  const [tab, setTab] = useState('theory');
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [xpNotif, setXpNotif] = useState(null);

  // Comments state
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_URL}/api/modules/${courseId}/${moduleId}`);
        const data = await res.json();
        if (data.data) setMod(data.data);

        // Check if already completed
        if (user) {
          const progRes = await fetch(`${API_URL}/api/progress/${user.id}`);
          const progData = await progRes.json();
          if (progData.data?.[courseId]?.completedModules?.includes(moduleId)) {
            setCompleted(true);
          }
        }

        // Load comments
        const commentsRes = await fetch(`${API_URL}/api/comments/${moduleId}`);
        const commentsData = await commentsRes.json();
        if (commentsData.data) setComments(commentsData.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [courseId, moduleId, user, API_URL]);

  async function handleComplete() {
    if (!user) return;
    setCompleting(true);
    try {
      const res = await fetch(`${API_URL}/api/progress/${user.id}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, moduleId }),
      });
      const data = await res.json();
      if (data.success) {
        setCompleted(true);
        if (data.xpAwarded) {
          setXpNotif(`+${data.xpAwarded} XP !`);
          setTimeout(() => setXpNotif(null), 3000);
        }
        if (data.newBadges?.length > 0) {
          setTimeout(() => {
            alert(`🏅 Nouveau badge : ${data.newBadges.map(b => `${b.icon} ${b.name}`).join(', ')}`);
          }, 500);
        }
        refreshUser();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCompleting(false);
    }
  }

  async function handleComment(e) {
    e.preventDefault();
    if (!newComment.trim() || !token) return;
    setSubmittingComment(true);
    try {
      const res = await fetch(`${API_URL}/api/comments/${moduleId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newComment.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setComments([data.data, ...comments]);
        setNewComment('');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmittingComment(false);
    }
  }

  if (loading) return <div className="text-center py-20 text-gray-400">Chargement...</div>;
  if (!mod) return <div className="text-center py-20"><h2>Module non trouvé</h2></div>;

  const renderContent = (text) => {
    return text
      .replace(/```(\w+)?\n?([\s\S]*?)```/g, '<pre class="bg-dark border border-border rounded-lg p-4 my-4 overflow-x-auto text-sm"><code>$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded text-sm">$1</code>')
      .replace(/### (.*)/g, '<h3 class="text-lg font-semibold text-purple-400 mt-6 mb-2">$1</h3>')
      .replace(/## (.*)/g, '<h2 class="text-xl font-bold mt-8 mb-3">$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/- (.*)/g, '<li class="ml-4 text-gray-400 mb-1">\u2022 $1</li>')
      .replace(/(\d+)\. (.*)/g, '<li class="ml-4 text-gray-400 mb-1">$1. $2</li>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Link href={`/courses/${courseId}`} className="text-gray-500 hover:text-purple-400 text-sm mb-6 inline-block">&larr; Retour au cours</Link>

      <div className="flex items-center gap-4 mb-8">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${completed ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-purple-500 to-purple-700 text-white'}`}>
          {completed ? '✓' : mod.orderIndex}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{mod.title}</h1>
          <span className="text-gray-500 text-sm">⏱ {mod.duration}</span>
        </div>
        {/* XP notification */}
        {xpNotif && (
          <span className="animate-bounce bg-gradient-to-r from-purple-500 to-purple-700 text-white px-3 py-1 rounded-full text-sm font-bold">
            {xpNotif}
          </span>
        )}
      </div>

      {/* Mark Complete Button */}
      {user && (
        <div className="mb-6">
          {completed ? (
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
              <span>✓</span> Module terminé
            </div>
          ) : (
            <button
              onClick={handleComplete}
              disabled={completing}
              className="btn-primary text-sm !px-4 !py-2 disabled:opacity-50"
            >
              {completing ? 'Enregistrement...' : '✓ Marquer comme terminé'}
            </button>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border pb-2">
        {[['theory', '📖 Théorie'], ['practice', '💻 Pratique'], ['keypoints', '💡 Points clés']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === key ? 'bg-purple-500/10 text-purple-400' : 'text-gray-500 hover:text-purple-400'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="card min-h-[400px]">
        {tab === 'theory' && <div dangerouslySetInnerHTML={{ __html: renderContent(mod.theoryContent) }} />}
        {tab === 'practice' && <div dangerouslySetInnerHTML={{ __html: renderContent(mod.practiceContent) }} />}
        {tab === 'keypoints' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Points clés à retenir</h2>
            <ul className="space-y-3">
              {mod.keyPoints?.map((point, i) => (
                <li key={i} className="flex items-center gap-3 p-4 bg-surface border border-border rounded-lg">
                  <span className="text-lg">🔑</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Comments Section */}
      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">💬 Commentaires ({comments.length})</h2>

        {/* Add comment form */}
        {user ? (
          <form onSubmit={handleComment} className="mb-6">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {user.avatar || user.username?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder="Écrire un commentaire..."
                  rows={3}
                  maxLength={1000}
                  className="w-full px-4 py-3 rounded-lg bg-surface border border-border focus:border-purple-500 focus:outline-none resize-none transition-all text-sm"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">{newComment.length}/1000</span>
                  <button type="submit" disabled={!newComment.trim() || submittingComment} className="btn-primary text-sm !px-4 !py-2 disabled:opacity-50">
                    {submittingComment ? 'Envoi...' : 'Commenter'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="card mb-6 !p-4">
            <p className="text-sm text-gray-400">
              <Link href="/login" className="text-purple-400 hover:underline">Connectez-vous</Link> pour laisser un commentaire.
            </p>
          </div>
        )}

        {/* Comments list */}
        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="card !p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {comment.user?.avatar || '?'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{comment.user?.displayName || 'Anonyme'}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}

          {comments.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-4">Aucun commentaire pour le moment. Soyez le premier !</p>
          )}
        </div>
      </section>
    </div>
  );
}
