import { Router } from 'express';
import { db } from '../db/index.js';
import { sql } from 'drizzle-orm';

const router = Router();

// GET /api/glossary
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    let result;
    if (q) {
      const searchTerm = `%${q}%`;
      result = await db.all(sql`SELECT * FROM glossary WHERE term LIKE ${searchTerm} OR definition LIKE ${searchTerm} ORDER BY term ASC`);
    } else {
      result = await db.all(sql`SELECT * FROM glossary ORDER BY term ASC`);
    }
    res.json({ success: true, data: result || [] });
  } catch (error) {
    console.error('Glossary error:', error.message);
    res.json({ success: true, data: [] });
  }
});

export default router;
