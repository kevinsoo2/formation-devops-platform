'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../../../contexts/AuthContext';
import TerminalSimulator from '../../../../../components/TerminalSimulator';
import CodeEditor from '../../../../../components/CodeEditor';
import Breadcrumbs from '../../../../../components/Breadcrumbs';
import Confetti from '../../../../../components/Confetti';

export default function ModulePage() {
  const { courseId, moduleId } = useParams();
  const router = useRouter();
  const { user, token, refreshUser } = useAuth();
  const [mod, setMod] = useState(null);
  const [course, setCourse] = useState(null);
  const [allModules, setAllModules] = useState([]);
  const [tab, setTab] = useState('theory');
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [xpNotif, setXpNotif] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  // Notes
  const [note, setNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);
  // Comments
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  // Exercises
  const [exercises, setExercises] = useState([]);
  const [exerciseAnswers, setExerciseAnswers] = useState({});
  const [exerciseResults, setExerciseResults] = useState({});
  // Study time tracking
  const startTime = useRef(Date.now());

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    async function load() {
      try {
        const [modRes, courseRes, modulesRes] = await Promise.all([
          fetch(`${API_URL}/api/modules/${courseId}/${moduleId}`),
          fetch(`${API_URL}/api/courses/${courseId}`),
          fetch(`${API_URL}/api/modules/${courseId}`),
        ]);
        const [modData, courseData, modulesData] = await Promise.all([modRes.json(), courseRes.json(), modulesRes.json()]);
        if (modData.data) setMod(modData.data);
        if (courseData.data) setCourse(courseData.data);
        if (modulesData.data) setAllModules(modulesData.data);

        // Update recently viewed with actual names
        if (modData.data && courseData.data) {
          try {
            const saved = JSON.parse(localStorage.getItem('recently-viewed-modules') || '[]');
            const updated = saved.map(item => {
              if (item.courseId === courseId && item.moduleId === moduleId) {
                return { ...item, moduleTitle: modData.data.title, courseName: courseData.data.title };
              }
              return item;
            });
            localStorage.setItem('recently-viewed-modules', JSON.stringify(updated));
          } catch (e) {}
        }

        // Exercises
        const exRes = await fetch(`${API_URL}/api/exercises/${moduleId}`);
        const exData = await exRes.json();
        if (exData.data) setExercises(exData.data);

        if (user) {
          const progRes = await fetch(`${API_URL}/api/progress/${user.id}`);
          const progData = await progRes.json();
          if (progData.data?.[courseId]?.completedModules?.includes(moduleId)) setCompleted(true);
          // Notes
          const noteRes = await fetch(`${API_URL}/api/notes/${user.id}/${moduleId}`);
          const noteData = await noteRes.json();
          if (noteData.data?.content) setNote(noteData.data.content);
          // Favorites
          const favRes = await fetch(`${API_URL}/api/favorites/${user.id}`);
          const favData = await favRes.json();
          if (favData.data?.some(f => f.module_id === moduleId)) setIsFavorite(true);
        }

        const commentsRes = await fetch(`${API_URL}/api/comments/${moduleId}`);
        const commentsData = await commentsRes.json();
        if (commentsData.data) setComments(commentsData.data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    }
    load();
    startTime.current = Date.now();

    // Track recently viewed module
    if (courseId && moduleId) {
      try {
        const saved = JSON.parse(localStorage.getItem('recently-viewed-modules') || '[]');
        const filtered = saved.filter(item => !(item.courseId === courseId && item.moduleId === moduleId));
        filtered.unshift({ courseId, moduleId, viewedAt: new Date().toISOString(), moduleTitle: '', courseName: '' });
        localStorage.setItem('recently-viewed-modules', JSON.stringify(filtered.slice(0, 10)));
      } catch (e) {}
    }

    // Track study time on unmount
    return () => {
      if (user) {
        const seconds = Math.round((Date.now() - startTime.current) / 1000);
        if (seconds > 10) {
          fetch(`${API_URL}/api/studytime/${user.id}`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ moduleId, seconds }),
          }).catch(() => {});
        }
      }
    };
  }, [courseId, moduleId, user, API_URL]);

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const idx = allModules.findIndex(m => m.id === moduleId);
      if (e.key === 'ArrowLeft' && idx > 0) router.push(`/courses/${courseId}/modules/${allModules[idx - 1].id}`);
      if (e.key === 'ArrowRight' && idx < allModules.length - 1) router.push(`/courses/${courseId}/modules/${allModules[idx + 1].id}`);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [allModules, moduleId, courseId, router]);

  async function handleComplete() {
    if (!user) return;
    setCompleting(true);
    try {
      const res = await fetch(`${API_URL}/api/progress/${user.id}/complete`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, moduleId }),
      });
      const data = await res.json();
      if (data.success) {
        setCompleted(true);
        setShowConfetti(true);
        if (data.xpAwarded) { setXpNotif(`+${data.xpAwarded} XP !`); setTimeout(() => setXpNotif(null), 3000); }
        // Record streak & activity
        fetch(`${API_URL}/api/streaks/${user.id}`, { method: 'POST' }).catch(() => {});
        fetch(`${API_URL}/api/activity/${user.id}`, { method: 'POST' }).catch(() => {});
        refreshUser();
      }
    } catch (e) { console.error(e); }
    finally { setCompleting(false); }
  }

  async function saveNote() {
    if (!user) return;
    await fetch(`${API_URL}/api/notes/${user.id}/${moduleId}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: note }),
    });
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  }

  async function toggleFavorite() {
    if (!user) return;
    if (isFavorite) {
      await fetch(`${API_URL}/api/favorites/${user.id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ courseId, moduleId }) });
      setIsFavorite(false);
    } else {
      await fetch(`${API_URL}/api/favorites/${user.id}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ courseId, moduleId }) });
      setIsFavorite(true);
    }
  }

  async function validateExercise(exId) {
    const answer = exerciseAnswers[exId] || '';
    const res = await fetch(`${API_URL}/api/exercises/${exId}/validate`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer, userId: user?.id }),
    });
    const data = await res.json();
    setExerciseResults({ ...exerciseResults, [exId]: data.data });
    if (data.data?.correct) refreshUser();
  }

  async function handleComment(e) {
    e.preventDefault();
    if (!newComment.trim() || !token) return;
    setSubmittingComment(true);
    try {
      const res = await fetch(`${API_URL}/api/comments/${moduleId}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content: newComment.trim() }),
      });
      const data = await res.json();
      if (data.success) { setComments([data.data, ...comments]); setNewComment(''); }
    } catch (e) { console.error(e); }
    finally { setSubmittingComment(false); }
  }

  if (loading) return <div className="text-center py-20 text-gray-400">Chargement...</div>;
  if (!mod) return <div className="text-center py-20"><h2>Module non trouvé</h2></div>;

  // Estimate reading time based on content length
  const contentLength = (mod.theoryContent?.length || 0) + (mod.practiceContent?.length || 0);
  const readingTimeMin = Math.max(1, Math.round(contentLength / 1000 * 2));

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

  const currentIdx = allModules.findIndex(m => m.id === moduleId);
  const prevModule = currentIdx > 0 ? allModules[currentIdx - 1] : null;
  const nextModule = currentIdx < allModules.length - 1 ? allModules[currentIdx + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Confetti trigger={showConfetti} />
      
      <Breadcrumbs items={[
        { label: 'Accueil', href: '/' },
        { label: course?.title || courseId, href: `/courses/${courseId}` },
        { label: mod.title },
      ]} />

      {/* Video embed */}
      {mod.videoUrl && (
        <div className="mb-6 aspect-video rounded-lg overflow-hidden border border-border">
          <iframe
            src={mod.videoUrl.replace('watch?v=', 'embed/')}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Vidéo du module"
          />
        </div>
      )}

      <div className="flex items-center gap-4 mb-6">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${completed ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-purple-500 to-purple-700 text-white'}`}>
          {completed ? '✓' : mod.orderIndex}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{mod.title}</h1>
          <div className="flex gap-3 text-gray-500 text-sm">
            <span>⏱ {mod.duration}</span>
            <span>📖 ~{readingTimeMin} min de lecture</span>
          </div>
        </div>
        {/* Favorite button */}
        {user && (
          <button onClick={toggleFavorite} className={`text-2xl transition-transform hover:scale-110 ${isFavorite ? 'text-red-500' : 'text-gray-600'}`} aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}>
            {isFavorite ? '❤️' : '🤍'}
          </button>
        )}
        {xpNotif && <span className="animate-bounce bg-gradient-to-r from-purple-500 to-purple-700 text-white px-3 py-1 rounded-full text-sm font-bold">{xpNotif}</span>}
      </div>

      {/* Complete button */}
      {user && (
        <div className="mb-6">
          {completed ? (
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm">✓ Module terminé</div>
          ) : (
            <button onClick={handleComplete} disabled={completing} className="btn-primary text-sm !px-4 !py-2 disabled:opacity-50">
              {completing ? 'Enregistrement...' : '✓ Marquer comme terminé'}
            </button>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border pb-2 overflow-x-auto">
        {[['theory', '📖 Théorie'], ['practice', '💻 Pratique'], ['keypoints', '💡 Points clés'], ['terminal', '🖥️ Terminal'], ['exercises', '✍️ Exercices']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${tab === key ? 'bg-purple-500/10 text-purple-400' : 'text-gray-500 hover:text-purple-400'}`}
            role="tab" aria-selected={tab === key}>
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="card min-h-[400px]">
        {tab === 'theory' && <div dangerouslySetInnerHTML={{ __html: renderContent(mod.theoryContent) }} />}
        {tab === 'practice' && (
          <div>
            <div dangerouslySetInnerHTML={{ __html: renderContent(mod.practiceContent) }} />
            <div className="mt-6">
              <CodeEditor language={courseId === 'jenkins' ? 'groovy' : courseId === 'terraform' ? 'yaml' : 'bash'} placeholder="Testez votre code ici..." />
            </div>
          </div>
        )}
        {tab === 'keypoints' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Points clés à retenir</h2>
            <ul className="space-y-3">
              {mod.keyPoints?.map((point, i) => (
                <li key={i} className="flex items-center gap-3 p-4 bg-surface border border-border rounded-lg">
                  <span className="text-lg">🔑</span><span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {tab === 'terminal' && <TerminalSimulator courseId={courseId} />}
        {tab === 'exercises' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Exercices auto-validés</h2>
            {exercises.length === 0 ? (
              <p className="text-gray-500">Aucun exercice disponible pour ce module.</p>
            ) : (
              <div className="space-y-4">
                {exercises.map(ex => (
                  <div key={ex.id} className="p-4 rounded-lg border border-border bg-surface">
                    <p className="font-medium mb-2">{ex.instruction}</p>
                    {ex.hint && <p className="text-xs text-gray-500 mb-2">💡 Indice: {ex.hint}</p>}
                    <div className="flex gap-2">
                      <input
                        value={exerciseAnswers[ex.id] || ''}
                        onChange={e => setExerciseAnswers({ ...exerciseAnswers, [ex.id]: e.target.value })}
                        placeholder="Votre réponse..."
                        className="flex-1 px-3 py-2 rounded-lg bg-dark border border-border focus:border-purple-500 focus:outline-none text-sm"
                        aria-label="Réponse à l'exercice"
                      />
                      <button onClick={() => validateExercise(ex.id)} className="btn-primary text-sm !px-4 !py-2">Valider</button>
                    </div>
                    {exerciseResults[ex.id] && (
                      <p className={`mt-2 text-sm ${exerciseResults[ex.id].correct ? 'text-green-400' : 'text-red-400'}`}>
                        {exerciseResults[ex.id].correct ? `✅ Correct ! +${exerciseResults[ex.id].xpAwarded} XP` : '❌ Incorrect. Réessayez !'}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Module navigation (prev/next) */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
        {prevModule ? (
          <Link href={`/courses/${courseId}/modules/${prevModule.id}`} className="flex items-center gap-2 px-4 py-3 rounded-lg bg-surface border border-border hover:border-purple-500 transition-all max-w-[45%]">
            <span className="text-purple-400">←</span>
            <div className="text-left overflow-hidden">
              <p className="text-xs text-gray-500">Module précédent</p>
              <p className="text-sm font-medium truncate">{prevModule.title}</p>
            </div>
          </Link>
        ) : <span />}
        {nextModule ? (
          <Link href={`/courses/${courseId}/modules/${nextModule.id}`} className="flex items-center gap-2 px-4 py-3 rounded-lg bg-surface border border-border hover:border-purple-500 transition-all max-w-[45%]">
            <div className="text-right overflow-hidden">
              <p className="text-xs text-gray-500">Module suivant</p>
              <p className="text-sm font-medium truncate">{nextModule.title}</p>
            </div>
            <span className="text-purple-400">→</span>
          </Link>
        ) : (
          <Link href={`/courses/${courseId}/quiz`} className="flex items-center gap-2 px-4 py-3 rounded-lg bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 transition-all">
            <div className="text-right">
              <p className="text-xs text-gray-500">Cours terminé !</p>
              <p className="text-sm font-medium text-purple-400">Passer le quiz →</p>
            </div>
          </Link>
        )}
      </div>

      {/* Personal Notes */}
      {user && (
        <section className="mt-8">
          <h2 className="text-lg font-bold mb-3">📝 Notes personnelles</h2>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            onBlur={saveNote}
            placeholder="Écrivez vos notes ici... (sauvegarde auto)"
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-surface border border-border focus:border-purple-500 focus:outline-none resize-y text-sm"
            aria-label="Notes personnelles"
          />
          {noteSaved && <p className="text-xs text-green-400 mt-1">✓ Notes sauvegardées</p>}
        </section>
      )}

      {/* Comments */}
      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">💬 Commentaires ({comments.length})</h2>
        {user ? (
          <form onSubmit={handleComment} className="mb-6">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {user.avatar || user.username?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <textarea value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Écrire un commentaire..." rows={3} maxLength={1000}
                  className="w-full px-4 py-3 rounded-lg bg-surface border border-border focus:border-purple-500 focus:outline-none resize-none text-sm" />
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
          <div className="card mb-6 !p-4"><p className="text-sm text-gray-400"><Link href="/login" className="text-purple-400 hover:underline">Connectez-vous</Link> pour laisser un commentaire.</p></div>
        )}
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
                    <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <p className="text-sm text-gray-400">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
          {comments.length === 0 && <p className="text-center text-gray-500 text-sm py-4">Aucun commentaire pour le moment.</p>}
        </div>
      </section>
    </div>
  );
}
