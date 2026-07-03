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
    const today = new Date().toISOString().split('T')[0];
    const activeToday = await db.all(sql`SELECT COUNT(DISTINCT user_id) as count FROM activity_log WHERE date = ${today}`);
    res.json({ success: true, data: {
      totalUsers: totalUsers[0]?.count || 0,
      totalCompletions: totalCompletions[0]?.count || 0,
      totalQuizPassed: totalQuizPassed[0]?.count || 0,
      activeToday: activeToday[0]?.count || 0,
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

// POST /api/admin/users/:id/ban - Toggle ban/unban user
router.post('/users/:id/ban', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.all(sql`SELECT id, role FROM users WHERE id = ${id}`);
    if (!user.length) return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    const newRole = user[0].role === 'banned' ? 'user' : 'banned';
    await db.run(sql`UPDATE users SET role = ${newRole} WHERE id = ${id}`);
    res.json({ success: true, message: newRole === 'banned' ? 'Utilisateur banni' : 'Utilisateur débanni', role: newRole });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/admin/users/:id - Delete user
router.delete('/users/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await db.run(sql`DELETE FROM users WHERE id = ${id}`);
    await db.run(sql`DELETE FROM user_progress WHERE user_id = ${id}`);
    await db.run(sql`DELETE FROM quiz_scores WHERE user_id = ${id}`);
    await db.run(sql`DELETE FROM user_badges WHERE user_id = ${id}`);
    res.json({ success: true, message: 'Utilisateur supprimé' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/admin/forum/:postId - Delete forum post
router.delete('/forum/:postId', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { postId } = req.params;
    await db.run(sql`DELETE FROM forum_replies WHERE post_id = ${parseInt(postId)}`);
    await db.run(sql`DELETE FROM forum_posts WHERE id = ${parseInt(postId)}`);
    res.json({ success: true, message: 'Post supprimé' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/admin/forum - Get recent forum posts for moderation
router.get('/forum', requireAuth, requireAdmin, async (req, res) => {
  try {
    const posts = await db.all(sql`SELECT fp.id, fp.title, fp.content, fp.created_at, fp.user_id, u.display_name, u.username FROM forum_posts fp LEFT JOIN users u ON fp.user_id = u.id ORDER BY fp.created_at DESC LIMIT 20`);
    res.json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/admin/export-csv/:secret - Export CSV of all users with progression
router.get('/export-csv/:secret', async (req, res) => {
  try {
    const secret = req.params.secret;
    const expectedSecret = process.env.ADMIN_EXPORT_SECRET || 'export2024';
    if (secret !== expectedSecret) {
      return res.status(403).json({ success: false, message: 'Secret invalide' });
    }
    const users = await db.all(sql`SELECT id, username, email, xp, level, created_at FROM users ORDER BY xp DESC`);
    let csv = 'username,email,courses_completed,modules_completed,quiz_passed,total_xp,level,last_activity\n';
    for (const u of users) {
      const modules = await db.all(sql`SELECT COUNT(*) as count FROM user_progress WHERE user_id = ${u.id}`);
      const courses = await db.all(sql`SELECT COUNT(DISTINCT course_id) as count FROM user_progress WHERE user_id = ${u.id}`);
      const quizzes = await db.all(sql`SELECT COUNT(*) as count FROM quiz_scores WHERE user_id = ${u.id} AND passed = 1`);
      const lastAct = await db.all(sql`SELECT date FROM activity_log WHERE user_id = ${u.id} ORDER BY date DESC LIMIT 1`);
      csv += `${u.username},${u.email},${courses[0]?.count || 0},${modules[0]?.count || 0},${quizzes[0]?.count || 0},${u.xp},${u.level},${lastAct[0]?.date || 'N/A'}\n`;
    }
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=users-export.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
