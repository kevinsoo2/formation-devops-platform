import { Router } from 'express';
import { db, schema } from '../db/index.js';
import { eq, and } from 'drizzle-orm';
import { optionalAuth } from '../middleware/auth.js';
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

// GET /api/progress/:userId - Progression d'un utilisateur
router.get('/:userId', async (req, res) => {
  try {
    const completedModules = await db.select().from(schema.userProgress)
      .where(eq(schema.userProgress.userId, req.params.userId));

    const scores = await db.select().from(schema.quizScores)
      .where(eq(schema.quizScores.userId, req.params.userId));

    // Grouper par cours
    const progressByCourse = {};
    completedModules.forEach(p => {
      if (!progressByCourse[p.courseId]) progressByCourse[p.courseId] = { completedModules: [], quizScores: [] };
      progressByCourse[p.courseId].completedModules.push(p.moduleId);
    });
    scores.forEach(s => {
      if (!progressByCourse[s.courseId]) progressByCourse[s.courseId] = { completedModules: [], quizScores: [] };
      progressByCourse[s.courseId].quizScores.push({ score: s.score, passed: s.passed, date: s.completedAt });
    });

    res.json({ success: true, data: progressByCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/progress/:userId/complete - Marquer un module comme terminé
router.post('/:userId/complete', async (req, res) => {
  try {
    const { courseId, moduleId } = req.body;
    if (!courseId || !moduleId) return res.status(400).json({ success: false, message: 'courseId et moduleId requis' });

    // Vérifier si déjà complété
    const [existing] = await db.select().from(schema.userProgress)
      .where(and(
        eq(schema.userProgress.userId, req.params.userId),
        eq(schema.userProgress.courseId, courseId),
        eq(schema.userProgress.moduleId, moduleId)
      ));

    if (!existing) {
      await db.insert(schema.userProgress).values({
        userId: req.params.userId,
        courseId,
        moduleId,
      });

      // Award XP (+50 for module completion) if user exists in users table
      const xpResult = await addXP(req.params.userId, 50);

      // Check badges
      const newBadges = await checkAndAwardBadges(req.params.userId);

      return res.json({
        success: true,
        message: 'Module marqué comme terminé',
        xpAwarded: 50,
        newXP: xpResult?.xp,
        newLevel: xpResult?.level,
        newBadges: newBadges.map(b => ({ id: b.id, name: b.name, icon: b.icon })),
      });
    }

    res.json({ success: true, message: 'Module déjà complété' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
