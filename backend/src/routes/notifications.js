import { Router } from 'express';
import { db } from '../db/index.js';
import { sql } from 'drizzle-orm';

const router = Router();

// GET /api/notifications/:userId
router.get('/:userId', async (req, res) => {
  try {
    const result = await db.all(sql`SELECT * FROM notifications WHERE user_id = ${req.params.userId} ORDER BY created_at DESC LIMIT 50`);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/notifications/:id/read
router.put('/:id/read', async (req, res) => {
  try {
    await db.run(sql`UPDATE notifications SET read = 1 WHERE id = ${req.params.id}`);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/notifications/:userId/read-all
router.put('/:userId/read-all', async (req, res) => {
  try {
    await db.run(sql`UPDATE notifications SET read = 1 WHERE user_id = ${req.params.userId}`);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Utility: create notification
export async function createNotification(userId, message, type) {
  try {
    const now = new Date().toISOString();
    await db.run(sql`INSERT INTO notifications (user_id, message, type, read, created_at) VALUES (${userId}, ${message}, ${type}, 0, ${now})`);
  } catch (e) {
    console.error('createNotification error:', e);
  }
}

export default router;
