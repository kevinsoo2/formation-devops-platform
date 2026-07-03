import { Router } from 'express';
import { db } from '../db/index.js';
import { sql } from 'drizzle-orm';

const router = Router();

// GET /api/streaks/:userId
router.get('/:userId', async (req, res) => {
  try {
    const result = await db.all(sql`SELECT * FROM streaks WHERE user_id = ${req.params.userId}`);
    if (result.length === 0) {
      return res.json({ success: true, data: { currentStreak: 0, longestStreak: 0, lastActivityDate: null } });
    }
    res.json({ success: true, data: result[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/streaks/:userId - Record activity
router.post('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const today = new Date().toISOString().split('T')[0];
    const result = await db.all(sql`SELECT * FROM streaks WHERE user_id = ${userId}`);

    if (result.length === 0) {
      await db.run(sql`INSERT INTO streaks (user_id, current_streak, longest_streak, last_activity_date) VALUES (${userId}, 1, 1, ${today})`);
      return res.json({ success: true, data: { current_streak: 1, longest_streak: 1, last_activity_date: today } });
    }

    const streak = result[0];
    const lastDate = streak.last_activity_date;

    if (lastDate === today) {
      return res.json({ success: true, data: streak, message: 'Déjà enregistré aujourd\'hui' });
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let newStreak = 1;
    if (lastDate === yesterdayStr) {
      newStreak = streak.current_streak + 1;
    }
    const newLongest = Math.max(streak.longest_streak, newStreak);

    await db.run(sql`UPDATE streaks SET current_streak = ${newStreak}, longest_streak = ${newLongest}, last_activity_date = ${today} WHERE user_id = ${userId}`);
    res.json({ success: true, data: { current_streak: newStreak, longest_streak: newLongest, last_activity_date: today } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
