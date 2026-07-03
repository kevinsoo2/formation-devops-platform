'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FlashcardsPage() {
  const [modules, setModules] = useState([]);
  const [courses, setCourses] = useState([]);
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mastered, setMastered] = useState([]);
  const [needsReview, setNeedsReview] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    async function load() {
      try {
        const coursesRes = await fetch(`${API_URL}/api/courses`);
        const coursesData = await coursesRes.json();
        if (coursesData.data) setCourses(coursesData.data);

        const allModules = [];
        if (coursesData.data) {
          for (const course of coursesData.data) {
            const modRes = await fetch(`${API_URL}/api/modules/${course.id}`);
            const modData = await modRes.json();
            if (modData.data) {
              allModules.push(...modData.data.map(m => ({
                ...m, courseName: course.title, courseId: course.id
              })));
            }
          }
        }
        setModules(allModules);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    }
    load();

    // Load mastered/review from localStorage
    const saved = localStorage.getItem('flashcards-mastered');
    if (saved) setMastered(JSON.parse(saved));
    const savedReview = localStorage.getItem('flashcards-review');
    if (savedReview) setNeedsReview(JSON.parse(savedReview));
  }, [API_URL]);


  useEffect(() => {
    const filtered = selectedCourse === 'all'
      ? modules
      : modules.filter(m => m.courseId === selectedCourse);

    const allCards = [];
    filtered.forEach(mod => {
      if (mod.keyPoints && Array.isArray(mod.keyPoints)) {
        mod.keyPoints.forEach((point, i) => {
          allCards.push({
            id: `${mod.id}-${i}`,
            front: mod.title,
            back: point,
            courseId: mod.courseId,
            courseName: mod.courseName,
          });
        });
      }
    });
    setCards(allCards);
    setCurrentIndex(0);
    setFlipped(false);
  }, [modules, selectedCourse]);

  function handleMastered() {
    const cardId = cards[currentIndex]?.id;
    if (!cardId) return;
    const newMastered = [...mastered.filter(id => id !== cardId), cardId];
    setMastered(newMastered);
    setNeedsReview(needsReview.filter(id => id !== cardId));
    localStorage.setItem('flashcards-mastered', JSON.stringify(newMastered));
    localStorage.setItem('flashcards-review', JSON.stringify(needsReview.filter(id => id !== cardId)));
    nextCard();
  }

  function handleNeedsReview() {
    const cardId = cards[currentIndex]?.id;
    if (!cardId) return;
    const newReview = [...needsReview.filter(id => id !== cardId), cardId];
    setNeedsReview(newReview);
    setMastered(mastered.filter(id => id !== cardId));
    localStorage.setItem('flashcards-review', JSON.stringify(newReview));
    localStorage.setItem('flashcards-mastered', JSON.stringify(mastered.filter(id => id !== cardId)));
    nextCard();
  }

  function nextCard() {
    setFlipped(false);
    setCurrentIndex(prev => (prev + 1) % cards.length);
  }

  function prevCard() {
    setFlipped(false);
    setCurrentIndex(prev => (prev - 1 + cards.length) % cards.length);
  }

  function resetProgress() {
    setMastered([]);
    setNeedsReview([]);
    localStorage.removeItem('flashcards-mastered');
    localStorage.removeItem('flashcards-review');
  }

  if (loading) return <div className="text-center py-20 text-gray-400">Chargement...</div>;

  const currentCard = cards[currentIndex];
  const masteredCount = cards.filter(c => mastered.includes(c.id)).length;
  const reviewCount = cards.filter(c => needsReview.includes(c.id)).length;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-2">🃏 Flashcards</h1>
        <p className="text-gray-400">Révisez les points clés des modules avec des cartes interactives</p>
      </div>

      {/* Filter by course */}
      <div className="mb-6">
        <select
          value={selectedCourse}
          onChange={e => setSelectedCourse(e.target.value)}
          className="px-4 py-2 rounded-lg bg-surface border border-border focus:border-purple-500 focus:outline-none text-sm"
        >
          <option value="all">Tous les cours</option>
          {courses.map(c => (
            <option key={c.id} value={c.id}>{c.icon} {c.title}</option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card text-center">
          <p className="text-2xl font-bold text-purple-400">{cards.length}</p>
          <p className="text-xs text-gray-400">Total cartes</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-green-400">{masteredCount}</p>
          <p className="text-xs text-gray-400">Maîtrisées</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-orange-400">{reviewCount}</p>
          <p className="text-xs text-gray-400">À revoir</p>
        </div>
      </div>


      {cards.length === 0 ? (
        <div className="card text-center py-12">
          <span className="text-4xl block mb-4">📚</span>
          <p className="text-gray-400">Aucune carte disponible. Sélectionnez un cours avec des modules.</p>
        </div>
      ) : (
        <>
          {/* Flashcard */}
          <div className="flex justify-center mb-6">
            <div
              className="flashcard-container cursor-pointer"
              onClick={() => setFlipped(!flipped)}
              style={{ perspective: '1000px', width: '100%', maxWidth: '500px', height: '300px' }}
            >
              <div
                className="flashcard-inner relative w-full h-full transition-transform duration-500"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Front */}
                <div
                  className="absolute w-full h-full rounded-xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-surface flex flex-col items-center justify-center p-8"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <p className="text-xs text-purple-400 mb-2">{currentCard?.courseName}</p>
                  <h2 className="text-xl font-bold text-center">{currentCard?.front}</h2>
                  <p className="text-xs text-gray-500 mt-4">Cliquez pour retourner</p>
                  {mastered.includes(currentCard?.id) && <span className="absolute top-4 right-4 text-green-400 text-sm">✓ Maîtrisée</span>}
                  {needsReview.includes(currentCard?.id) && <span className="absolute top-4 right-4 text-orange-400 text-sm">⟳ À revoir</span>}
                </div>
                {/* Back */}
                <div
                  className="absolute w-full h-full rounded-xl border-2 border-green-500/30 bg-gradient-to-br from-green-500/10 to-surface flex flex-col items-center justify-center p-8"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <p className="text-sm text-center text-gray-300 leading-relaxed">{currentCard?.back}</p>
                  <p className="text-xs text-gray-500 mt-4">Cliquez pour retourner</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mb-6">
            <button onClick={prevCard} className="px-4 py-2 rounded-lg bg-surface border border-border hover:border-purple-500 text-sm">
              ← Précédente
            </button>
            <span className="text-sm text-gray-400">{currentIndex + 1} / {cards.length}</span>
            <button onClick={nextCard} className="px-4 py-2 rounded-lg bg-surface border border-border hover:border-purple-500 text-sm">
              Suivante →
            </button>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4 mb-8">
            <button onClick={handleMastered} className="px-6 py-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 text-sm font-medium">
              ✓ Maîtrisée
            </button>
            <button onClick={handleNeedsReview} className="px-6 py-3 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500/20 text-sm font-medium">
              ⟳ À revoir
            </button>
          </div>

          {/* Progress bar */}
          <div className="card">
            <div className="flex justify-between text-sm mb-2">
              <span>Progression</span>
              <span className="text-purple-400">{Math.round((masteredCount / cards.length) * 100)}%</span>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all" style={{ width: `${(masteredCount / cards.length) * 100}%` }} />
            </div>
            <button onClick={resetProgress} className="text-xs text-gray-500 hover:text-red-400 mt-3">
              Réinitialiser la progression
            </button>
          </div>
        </>
      )}
    </div>
  );
}
