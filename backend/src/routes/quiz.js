import { Router } from 'express';
import { db, schema } from '../db/index.js';
import { eq } from 'drizzle-orm';
import { checkAndAwardBadges } from './badges.js';

const router = Router();

// Helper to add XP to a user
async function addXP(userId, amount) {
  try {
    const [user] = await db.select().from(schema.users)
      .where(eq(schema.users.id, userId));
    if (user) {
      const newXP = user.xp + amount;
      const newLevel = Math.floor(newXP / 500) + 1;
      await db.update(schema.users)
        .set({ xp: newXP, level: newLevel })
        .where(eq(schema.users.id, userId));
      return { xp: newXP, level: newLevel };
    }
  } catch (e) {
    console.error('addXP error:', e);
  }
  return null;
}

// GET /api/quiz/daily - Question du jour (deterministic based on date)
router.get('/daily', async (req, res) => {
  try {
    const questions = await db.select().from(schema.quizQuestions);
    if (questions.length === 0) return res.status(404).json({ success: false, message: 'Aucune question disponible' });

    // Deterministic selection based on date
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const index = dayOfYear % questions.length;
    const q = questions[index];

    res.json({
      success: true,
      data: {
        id: q.id,
        question: q.question,
        options: JSON.parse(q.options),
        courseId: q.courseId,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/quiz/daily/submit - Soumettre la réponse du quiz du jour
router.post('/daily/submit', async (req, res) => {
  try {
    const questions = await db.select().from(schema.quizQuestions);
    if (questions.length === 0) return res.status(404).json({ success: false, message: 'Aucune question' });

    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const index = dayOfYear % questions.length;
    const q = questions[index];

    const { answer, userId } = req.body;
    const correct = answer === q.correctIndex;

    let xpAwarded = 0;
    if (correct && userId) {
      xpAwarded = 50;
      await addXP(userId, xpAwarded);
    }

    res.json({
      success: true,
      data: {
        correct,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        xpAwarded,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

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

    let xpAwarded = 0;
    let xpResult = null;
    let newBadges = [];

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

      // Award XP
      if (passed) {
        xpAwarded = 100; // +100 for passing quiz
        if (score === 100) {
          xpAwarded += 200; // +200 bonus for perfect score
        }
        xpResult = await addXP(userId, xpAwarded);
        newBadges = await checkAndAwardBadges(userId);
      }
    }

    res.json({
      success: true,
      data: {
        score,
        correct,
        total: questions.length,
        passed,
        results,
        xpAwarded,
        newXP: xpResult?.xp,
        newLevel: xpResult?.level,
        newBadges: newBadges.map(b => ({ id: b.id, name: b.name, icon: b.icon })),
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
