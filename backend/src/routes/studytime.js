import { Router } from 'express';
import { db } from '../db/index.js';
import { sql } from 'drizzle-orm';

const router = Router();

// GET /api/studytime/:userId - Get study time stats
router.get('/:userId', async (req, res) => {
  try {
    const total = await db.all(sql`SELECT COALESCE(SUM(seconds), 0) as total_seconds FROM study_time WHERE user_id = ${req.params.userId}`);
    // Weekly breakdown (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const since = sevenDaysAgo.toISOString().split('T')[0];
    const weekly = await db.all(sql`SELECT date, SUM(seconds) as seconds FROM study_time WHERE user_id = ${req.params.userId} AND date >= ${since} GROUP BY date ORDER BY date`);
    res.json({ success: true, data: { totalSeconds: total[0]?.total_seconds || 0, weekly } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/studytime/:userId - Record study time
router.post('/:userId', async (req, res) => {
  try {
    const { moduleId, seconds } = req.body;
    const today = new Date().toISOString().split('T')[0];
    const existing = await db.all(sql`SELECT * FROM study_time WHERE user_id = ${req.params.userId} AND module_id = ${moduleId} AND date = ${today}`);
    if (existing.length > 0) {
      await db.run(sql`UPDATE study_time SET seconds = seconds + ${seconds} WHERE user_id = ${req.params.userId} AND module_id = ${moduleId} AND date = ${today}`);
    } else {
      await db.run(sql`INSERT INTO study_time (user_id, module_id, seconds, date) VALUES (${req.params.userId}, ${moduleId}, ${seconds}, ${today})`);
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
