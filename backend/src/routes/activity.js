import { Router } from 'express';
import { db } from '../db/index.js';
import { sql } from 'drizzle-orm';

const router = Router();

// GET /api/activity/:userId - Get last 90 days heatmap
router.get('/:userId', async (req, res) => {
  try {
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    const since = ninetyDaysAgo.toISOString().split('T')[0];
    const result = await db.all(sql`SELECT date, activity_count FROM activity_log WHERE user_id = ${req.params.userId} AND date >= ${since} ORDER BY date ASC`);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/activity/:userId - Log activity
router.post('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const today = new Date().toISOString().split('T')[0];
    const existing = await db.all(sql`SELECT * FROM activity_log WHERE user_id = ${userId} AND date = ${today}`);
    if (existing.length > 0) {
      await db.run(sql`UPDATE activity_log SET activity_count = activity_count + 1 WHERE user_id = ${userId} AND date = ${today}`);
    } else {
      await db.run(sql`INSERT INTO activity_log (user_id, date, activity_count) VALUES (${userId}, ${today}, 1)`);
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
