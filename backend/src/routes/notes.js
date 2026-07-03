import { Router } from 'express';
import { db } from '../db/index.js';
import { sql } from 'drizzle-orm';

const router = Router();

// GET /api/notes/:userId/:moduleId
router.get('/:userId/:moduleId', async (req, res) => {
  try {
    const result = await db.all(sql`SELECT * FROM notes WHERE user_id = ${req.params.userId} AND module_id = ${req.params.moduleId}`);
    res.json({ success: true, data: result[0] || { content: '' } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/notes/:userId/:moduleId
router.put('/:userId/:moduleId', async (req, res) => {
  try {
    const { content } = req.body;
    const { userId, moduleId } = req.params;
    const now = new Date().toISOString();
    const existing = await db.all(sql`SELECT * FROM notes WHERE user_id = ${userId} AND module_id = ${moduleId}`);
    if (existing.length > 0) {
      await db.run(sql`UPDATE notes SET content = ${content}, updated_at = ${now} WHERE user_id = ${userId} AND module_id = ${moduleId}`);
    } else {
      await db.run(sql`INSERT INTO notes (user_id, module_id, content, updated_at) VALUES (${userId}, ${moduleId}, ${content}, ${now})`);
    }
    res.json({ success: true, data: { content, updatedAt: now } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
