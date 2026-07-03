import { Router } from 'express';
import { db } from '../db/index.js';
import { sql } from 'drizzle-orm';

const router = Router();

// GET /api/users/:userId/profile - Public profile
router.get('/:userId/profile', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await db.all(sql`SELECT id, username, display_name, avatar, xp, level, role, created_at FROM users WHERE id = ${userId}`);
    if (user.length === 0) return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    
    const badges = await db.all(sql`SELECT b.* FROM user_badges ub JOIN badges b ON ub.badge_id = b.id WHERE ub.user_id = ${userId}`);
    const progress = await db.all(sql`SELECT course_id, COUNT(*) as completed_count FROM user_progress WHERE user_id = ${userId} GROUP BY course_id`);
    const streakData = await db.all(sql`SELECT * FROM streaks WHERE user_id = ${userId}`);
    
    res.json({ success: true, data: { 
      user: user[0], 
      badges, 
      progress, 
      streak: streakData[0] || { current_streak: 0, longest_streak: 0 } 
    }});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
