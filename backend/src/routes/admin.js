import { Router } from 'express';
import { db } from '../db/index.js';
import { sql } from 'drizzle-orm';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Middleware admin check
function requireAdmin(req, res, next) {
  if (!req.user || (req.user.role !== 'admin')) {
    return res.status(403).json({ success: false, message: 'Accès réservé aux administrateurs' });
  }
  next();
}

// GET /api/admin/stats
router.get('/stats', requireAuth, requireAdmin, async (req, res) => {
  try {
    const totalUsers = await db.all(sql`SELECT COUNT(*) as count FROM users`);
    const totalCompletions = await db.all(sql`SELECT COUNT(*) as count FROM user_progress`);
    const popularCourses = await db.all(sql`SELECT course_id, COUNT(*) as completions FROM user_progress GROUP BY course_id ORDER BY completions DESC LIMIT 5`);
    const totalQuizPassed = await db.all(sql`SELECT COUNT(*) as count FROM quiz_scores WHERE passed = 1`);
    res.json({ success: true, data: {
      totalUsers: totalUsers[0]?.count || 0,
      totalCompletions: totalCompletions[0]?.count || 0,
      totalQuizPassed: totalQuizPassed[0]?.count || 0,
      popularCourses,
    }});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/admin/users
router.get('/users', requireAuth, requireAdmin, async (req, res) => {
  try {
    const users = await db.all(sql`SELECT id, username, display_name, email, xp, level, role, created_at FROM users ORDER BY xp DESC`);
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
