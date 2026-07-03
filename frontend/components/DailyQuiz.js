'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function DailyQuiz() {
  const { user, refreshUser } = useAuth();
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alreadyAnswered, setAlreadyAnswered] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    // Check if already answered today
    const today = new Date().toISOString().split('T')[0];
    const answered = localStorage.getItem(`daily-quiz-${today}`);
    if (answered) {
      setAlreadyAnswered(true);
      setResult(JSON.parse(answered));
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/api/quiz/daily`)
      .then(r => r.json())
      .then(data => {
        if (data.success && data.data) setQuestion(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [API_URL]);

  async function handleSubmit() {
    if (selected === null || !question) return;

    const res = await fetch(`${API_URL}/api/quiz/daily/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: selected, userId: user?.id }),
    });
    const data = await res.json();
    if (data.success) {
      setResult(data.data);
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem(`daily-quiz-${today}`, JSON.stringify(data.data));
      if (user && data.data.correct) refreshUser();
    }
  }

  if (loading) return null;
  if (!question && !alreadyAnswered) return null;

  if (result || alreadyAnswered) {
    const r = result;
    return (
      <div className="card border-purple-500/30 animate-fade-in">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">📝</span>
          <h3 className="font-semibold text-sm">Quiz du jour</h3>
          <span className={`ml-auto text-xs px-2 py-1 rounded-full ${r?.correct ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
            {r?.correct ? '✓ Correct ! +50 XP' : '✗ Incorrect'}
          </span>
        </div>
        {r?.explanation && (
          <p className="text-xs text-gray-400 mt-2">{r.explanation}</p>
        )}
      </div>
    );
  }

  return (
    <div className="card border-purple-500/30 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">📝</span>
        <div>
          <h3 className="font-semibold text-sm">Quiz du jour</h3>
          <p className="text-xs text-gray-500">+50 XP si bonne réponse</p>
        </div>
      </div>
      <p className="text-sm font-medium mb-3">{question.question}</p>
      <div className="space-y-2 mb-4">
        {question.options?.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-full text-left p-3 rounded-lg text-sm border transition-all ${
              selected === i
                ? 'border-purple-500 bg-purple-500/10 text-purple-300'
                : 'border-border hover:border-purple-500/50'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={selected === null}
        className="btn-primary text-sm !px-4 !py-2 disabled:opacity-50"
      >
        Valider
      </button>
    </div>
  );
}
