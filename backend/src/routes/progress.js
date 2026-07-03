import { Router } from 'express';
import { db, schema } from '../db/index.js';
import { eq, and, sql } from 'drizzle-orm';
import { optionalAuth } from '../middleware/auth.js';
import { checkAndAwardBadges } from './badges.js';
import { createNotification } from './notifications.js';

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

// Helper: record streak and activity
async function recordActivity(userId) {
  try {
    const today = new Date().toISOString().split('T')[0];
    // Activity log
    const existing = await db.all(sql`SELECT * FROM activity_log WHERE user_id = ${userId} AND date = ${today}`);
    if (existing.length > 0) {
      await db.run(sql`UPDATE activity_log SET activity_count = activity_count + 1 WHERE user_id = ${userId} AND date = ${today}`);
    } else {
      await db.run(sql`INSERT INTO activity_log (user_id, date, activity_count) VALUES (${userId}, ${today}, 1)`);
    }
    // Streak
    const streakResult = await db.all(sql`SELECT * FROM streaks WHERE user_id = ${userId}`);
    if (streakResult.length === 0) {
      await db.run(sql`INSERT INTO streaks (user_id, current_streak, longest_streak, last_activity_date) VALUES (${userId}, 1, 1, ${today})`);
    } else {
      const streak = streakResult[0];
      if (streak.last_activity_date !== today) {
        const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        let newStreak = streak.last_activity_date === yesterdayStr ? streak.current_streak + 1 : 1;
        const newLongest = Math.max(streak.longest_streak, newStreak);
        await db.run(sql`UPDATE streaks SET current_streak = ${newStreak}, longest_streak = ${newLongest}, last_activity_date = ${today} WHERE user_id = ${userId}`);
      }
    }
  } catch (e) {
    console.error('recordActivity error:', e);
  }
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

      // Record activity & streak
      await recordActivity(req.params.userId);

      // Check badges
      const newBadges = await checkAndAwardBadges(req.params.userId);

      // Notifications for new badges
      for (const badge of newBadges) {
        await createNotification(req.params.userId, `🏅 Badge débloqué: ${badge.icon} ${badge.name}`, 'badge');
      }

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
