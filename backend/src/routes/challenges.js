import { Router } from 'express';
import { db } from '../db/index.js';
import { sql } from 'drizzle-orm';

const router = Router();

// GET /api/challenges - Current week challenges
router.get('/', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const result = await db.all(sql`SELECT * FROM challenges WHERE week_start <= ${today} AND week_end >= ${today}`);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/challenges/user/:userId
router.get('/user/:userId', async (req, res) => {
  try {
    const result = await db.all(sql`SELECT uc.*, c.title, c.description, c.target_count, c.xp_reward FROM user_challenges uc JOIN challenges c ON uc.challenge_id = c.id WHERE uc.user_id = ${req.params.userId}`);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/challenges/:id/progress
router.post('/:id/progress', async (req, res) => {
  try {
    const { userId } = req.body;
    const challengeId = req.params.id;
    const existing = await db.all(sql`SELECT * FROM user_challenges WHERE user_id = ${userId} AND challenge_id = ${challengeId}`);
    if (existing.length === 0) {
      await db.run(sql`INSERT INTO user_challenges (user_id, challenge_id, progress, completed) VALUES (${userId}, ${challengeId}, 1, 0)`);
    } else {
      const challenge = await db.all(sql`SELECT target_count FROM challenges WHERE id = ${challengeId}`);
      const target = challenge[0]?.target_count || 999;
      const newProgress = existing[0].progress + 1;
      const completed = newProgress >= target ? 1 : 0;
      await db.run(sql`UPDATE user_challenges SET progress = ${newProgress}, completed = ${completed} WHERE user_id = ${userId} AND challenge_id = ${challengeId}`);
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
