import { Router } from 'express';
import { db, schema } from '../db/index.js';
import { eq } from 'drizzle-orm';

const router = Router();

// GET /api/quiz/:courseId - Questions du quiz (sans réponses)
router.get('/:courseId', async (req, res) => {
  try {
    const questions = await db.select().from(schema.quizQuestions)
      .where(eq(schema.quizQuestions.courseId, req.params.courseId));
    
    if (questions.length === 0) return res.status(404).json({ success: false, message: 'Quiz non trouvé' });
    
    const sanitized = questions.map(q => ({
      id: q.id,
      moduleId: q.moduleId,
      question: q.question,
      options: JSON.parse(q.options),
    }));
    res.json({ success: true, count: sanitized.length, data: sanitized });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/quiz/:courseId/submit - Soumettre les réponses
router.post('/:courseId/submit', async (req, res) => {
  try {
    const questions = await db.select().from(schema.quizQuestions)
      .where(eq(schema.quizQuestions.courseId, req.params.courseId));
    
    if (questions.length === 0) return res.status(404).json({ success: false, message: 'Quiz non trouvé' });
    
    const { answers, userId } = req.body;
    if (!answers) return res.status(400).json({ success: false, message: 'Réponses invalides' });
    
    let correct = 0;
    const results = questions.map(q => {
      const userAnswer = answers[q.id];
      const isCorrect = userAnswer === q.correctIndex;
      if (isCorrect) correct++;
      return {
        questionId: q.id,
        correct: isCorrect,
        correctAnswer: q.correctIndex,
        userAnswer,
        explanation: q.explanation,
      };
    });
    
    const score = Math.round((correct / questions.length) * 100);
    const passed = score >= 70;
    
    // Enregistrer le score si userId fourni
    if (userId) {
      await db.insert(schema.quizScores).values({
        userId,
        courseId: req.params.courseId,
        score,
        totalQuestions: questions.length,
        correctAnswers: correct,
        passed: passed ? 1 : 0,
      });
    }
    
    res.json({ success: true, data: { score, correct, total: questions.length, passed, results } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
