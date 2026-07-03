import { Router } from 'express';
import { db, schema } from '../db/index.js';
import { eq, and } from 'drizzle-orm';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/badges - Tous les badges disponibles
router.get('/', async (req, res) => {
  try {
    const allBadges = await db.select().from(schema.badges);
    res.json({ success: true, data: allBadges });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/badges/user/:userId - Badges d'un utilisateur
router.get('/user/:userId', async (req, res) => {
  try {
    const userBadgesList = await db.select().from(schema.userBadges)
      .where(eq(schema.userBadges.userId, req.params.userId));

    const allBadges = await db.select().from(schema.badges);
    const badgeMap = {};
    allBadges.forEach(b => { badgeMap[b.id] = b; });

    const earned = userBadgesList.map(ub => ({
      ...badgeMap[ub.badgeId],
      earnedAt: ub.earnedAt,
    })).filter(b => b.id);

    res.json({ success: true, data: earned });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Utility function to check and award badges
export async function checkAndAwardBadges(userId) {
  try {
    const allBadges = await db.select().from(schema.badges);
    const existingUserBadges = await db.select().from(schema.userBadges)
      .where(eq(schema.userBadges.userId, userId));
    const earnedBadgeIds = existingUserBadges.map(ub => ub.badgeId);

    // Get user progress
    const completedModules = await db.select().from(schema.userProgress)
      .where(eq(schema.userProgress.userId, userId));
    const quizResults = await db.select().from(schema.quizScores)
      .where(eq(schema.quizScores.userId, userId));

    const newBadges = [];

    for (const badge of allBadges) {
      if (earnedBadgeIds.includes(badge.id)) continue;

      let earned = false;

      switch (badge.id) {
        case 'premier-pas':
          // First module completed
          earned = completedModules.length >= 1;
          break;
        case 'studieux':
          // 5 modules completed
          earned = completedModules.length >= 5;
          break;
        case 'expert': {
          // All modules of 1 course completed
          const courseModules = {};
          completedModules.forEach(p => {
            if (!courseModules[p.courseId]) courseModules[p.courseId] = new Set();
            courseModules[p.courseId].add(p.moduleId);
          });
          // Check if any course has all its modules completed
          const allModules = await db.select().from(schema.modules);
          const modulesPerCourse = {};
          allModules.forEach(m => {
            if (!modulesPerCourse[m.courseId]) modulesPerCourse[m.courseId] = 0;
            modulesPerCourse[m.courseId]++;
          });
          for (const [cid, completed] of Object.entries(courseModules)) {
            if (modulesPerCourse[cid] && completed.size >= modulesPerCourse[cid]) {
              earned = true;
              break;
            }
          }
          break;
        }
        case 'quiz-master':
          // 3 quizzes passed
          earned = quizResults.filter(q => q.passed === 1).length >= 3;
          break;
        case 'perfectionniste':
          // 100% on a quiz
          earned = quizResults.some(q => q.score === 100);
          break;
        case 'polyvalent': {
          // Started 3+ courses (has progress in 3+ different courses)
          const uniqueCourses = new Set(completedModules.map(p => p.courseId));
          earned = uniqueCourses.size >= 3;
          break;
        }
      }

      if (earned) {
        await db.insert(schema.userBadges).values({
          userId,
          badgeId: badge.id,
        });
        newBadges.push(badge);
      }
    }

    return newBadges;
  } catch (error) {
    console.error('checkAndAwardBadges error:', error);
    return [];
  }
}

export default router;
