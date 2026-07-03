import { Router } from 'express';
import { db } from '../db/index.js';
import { sql } from 'drizzle-orm';

const router = Router();

// GET /api/favorites/:userId
router.get('/:userId', async (req, res) => {
  try {
    const result = await db.all(sql`SELECT * FROM favorites WHERE user_id = ${req.params.userId} ORDER BY created_at DESC`);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/favorites/:userId
router.post('/:userId', async (req, res) => {
  try {
    const { courseId, moduleId } = req.body;
    const userId = req.params.userId;
    const now = new Date().toISOString();
    // Check if already favorited
    let query;
    if (moduleId) {
      query = sql`SELECT * FROM favorites WHERE user_id = ${userId} AND module_id = ${moduleId}`;
    } else {
      query = sql`SELECT * FROM favorites WHERE user_id = ${userId} AND course_id = ${courseId} AND module_id IS NULL`;
    }
    const existing = await db.all(query);
    if (existing.length > 0) {
      return res.json({ success: true, message: 'Déjà en favoris' });
    }
    await db.run(sql`INSERT INTO favorites (user_id, course_id, module_id, created_at) VALUES (${userId}, ${courseId || null}, ${moduleId || null}, ${now})`);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/favorites/:userId
router.delete('/:userId', async (req, res) => {
  try {
    const { courseId, moduleId } = req.body;
    const userId = req.params.userId;
    if (moduleId) {
      await db.run(sql`DELETE FROM favorites WHERE user_id = ${userId} AND module_id = ${moduleId}`);
    } else {
      await db.run(sql`DELETE FROM favorites WHERE user_id = ${userId} AND course_id = ${courseId} AND module_id IS NULL`);
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
