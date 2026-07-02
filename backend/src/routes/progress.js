import { Router } from 'express';
import { db, schema } from '../db/index.js';
import { eq, and } from 'drizzle-orm';

const router = Router();

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
      progressByCourse[s.courseId].quizScores.push({ score: s.score, date: s.completedAt });
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
    }
    
    res.json({ success: true, message: 'Module marqué comme terminé' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
