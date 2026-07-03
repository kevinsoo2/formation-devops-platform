'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '../../../../contexts/AuthContext';

export default function QuizPage() {
  const { courseId } = useParams();
  const { user, refreshUser } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    fetch(`${API_URL}/api/quiz/${courseId}`)
      .then(r => r.json())
      .then(d => { setQuestions(d.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [courseId, API_URL]);

  const handleNext = async () => {
    if (selected === null) return;
    const newAnswers = { ...answers, [questions[current].id]: selected };
    setAnswers(newAnswers);
    setSelected(null);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      // Submit with userId if logged in
      const res = await fetch(`${API_URL}/api/quiz/${courseId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: newAnswers, userId: user?.id }),
      });
      const data = await res.json();
      setResults(data.data);
      if (user) refreshUser();
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-400">Chargement...</div>;
  if (questions.length === 0) return <div className="text-center py-20"><h2>Quiz non disponible</h2><Link href={`/courses/${courseId}`} className="text-purple-400">Retour</Link></div>;

  if (results) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12 text-center">
        <div className="text-5xl mb-4">{results.passed ? '🎉' : '📚'}</div>
        <h1 className="text-2xl font-bold mb-2">{results.passed ? 'Félicitations !' : 'Continuez vos efforts !'}</h1>
        <p className="text-gray-400 mb-4">{results.passed ? 'Quiz réussi !' : 'Révisez et réessayez.'}</p>

        {/* XP earned */}
        {results.xpAwarded > 0 && (
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30">
            <span className="text-purple-400 font-bold">+{results.xpAwarded} XP gagné !</span>
          </div>
        )}

        {/* New badges */}
        {results.newBadges?.length > 0 && (
          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-2">Nouveaux badges débloqués :</p>
            <div className="flex justify-center gap-3">
              {results.newBadges.map(badge => (
                <div key={badge.id} className="px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <span className="text-xl">{badge.icon}</span>
                  <span className="text-sm ml-1 text-purple-400">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="inline-block relative w-36 h-36 mb-8">
          <svg viewBox="0 0 100 100" className="-rotate-90">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#2a2a4a" strokeWidth="8" />
            <circle cx="50" cy="50" r="45" fill="none" stroke={results.passed ? '#00c853' : '#ff9800'} strokeWidth="8" strokeLinecap="round"
              strokeDasharray={`${results.score * 2.83} 283`} />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">{results.score}%</span>
        </div>
        <p className="text-gray-400 mb-8">{results.correct}/{results.total} réponses correctes</p>

        <div className="text-left space-y-3 mb-8">
          {results.results.map((r, i) => (
            <div key={i} className={`p-4 rounded-lg border ${r.correct ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
              <div className="flex items-center gap-2">
                <span className={r.correct ? 'text-green-400' : 'text-red-400'}>{r.correct ? '✓' : '✗'}</span>
                <span className="text-sm font-medium">{questions[i]?.question}</span>
              </div>
              {!r.correct && <p className="text-xs text-gray-400 mt-2 ml-6">{r.explanation}</p>}
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <button onClick={() => { setCurrent(0); setAnswers({}); setResults(null); setSelected(null); }} className="btn-primary">Refaire</button>
          <Link href={`/courses/${courseId}`} className="btn-secondary">Retour au cours</Link>
        </div>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link href={`/courses/${courseId}`} className="text-gray-500 hover:text-purple-400 text-sm mb-6 inline-block">&larr; Retour</Link>

      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
        </div>
        <span className="text-sm text-gray-500">{current + 1}/{questions.length}</span>
      </div>

      <div className="card mb-6">
        <h2 className="text-lg font-semibold mb-6">{q.question}</h2>
        <div className="space-y-3">
          {q.options.map((opt, i) => (
            <button key={i} onClick={() => setSelected(i)}
              className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-all ${
                selected === i ? 'border-purple-500 bg-purple-500/10' : 'border-border hover:border-purple-500/50'
              }`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                selected === i ? 'bg-purple-500 text-white' : 'bg-surface'
              }`}>{String.fromCharCode(65 + i)}</span>
              <span className="text-sm">{opt}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="text-right">
        <button onClick={handleNext} disabled={selected === null}
          className={`btn-primary ${selected === null ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {current < questions.length - 1 ? 'Suivante →' : 'Terminer'}
        </button>
      </div>
    </div>
  );
}
