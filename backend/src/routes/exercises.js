import { Router } from 'express';
import { db } from '../db/index.js';
import { sql } from 'drizzle-orm';

const router = Router();

// GET /api/exercises/:moduleId
router.get('/:moduleId', async (req, res) => {
  try {
    const result = await db.all(sql`SELECT id, module_id, instruction, hint, xp_reward FROM exercises WHERE module_id = ${req.params.moduleId}`);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/exercises/:id/validate
router.post('/:id/validate', async (req, res) => {
  try {
    const { answer, userId } = req.body;
    const result = await db.all(sql`SELECT * FROM exercises WHERE id = ${req.params.id}`);
    if (result.length === 0) return res.status(404).json({ success: false, message: 'Exercise not found' });
    const exercise = result[0];
    const correct = answer.trim().toLowerCase() === exercise.expected_answer.trim().toLowerCase();
    if (correct && userId) {
      // Award XP
      await db.run(sql`UPDATE users SET xp = xp + ${exercise.xp_reward} WHERE id = ${userId}`);
    }
    res.json({ success: true, data: { correct, xpAwarded: correct ? exercise.xp_reward : 0 } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
