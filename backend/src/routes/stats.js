import { Router } from 'express';
import { db } from '../db/index.js';
import { sql } from 'drizzle-orm';

const router = Router();

// GET /api/stats - Public platform stats
router.get('/', async (req, res) => {
  try {
    const totalUsers = await db.all(sql`SELECT COUNT(*) as count FROM users`);
    const totalCourses = await db.all(sql`SELECT COUNT(*) as count FROM courses`);
    const totalModulesCompleted = await db.all(sql`SELECT COUNT(*) as count FROM user_progress`);
    const totalQuizPassed = await db.all(sql`SELECT COUNT(*) as count FROM quiz_scores WHERE passed = 1`);
    const totalXpEarned = await db.all(sql`SELECT COALESCE(SUM(xp), 0) as total FROM users`);
    const mostPopular = await db.all(sql`SELECT course_id, COUNT(*) as completions FROM user_progress GROUP BY course_id ORDER BY completions DESC LIMIT 1`);
    const avgScore = await db.all(sql`SELECT COALESCE(AVG(score), 0) as avg_score FROM quiz_scores`);
    const popularCourses = await db.all(sql`SELECT up.course_id, c.title, COUNT(*) as completions FROM user_progress up LEFT JOIN courses c ON up.course_id = c.id GROUP BY up.course_id ORDER BY completions DESC LIMIT 10`);

    res.json({
      success: true,
      data: {
        total_users: totalUsers[0]?.count || 0,
        total_courses: totalCourses[0]?.count || 0,
        total_modules_completed: totalModulesCompleted[0]?.count || 0,
        total_quiz_passed: totalQuizPassed[0]?.count || 0,
        total_xp_earned: totalXpEarned[0]?.total || 0,
        most_popular_course: mostPopular[0]?.course_id || 'N/A',
        average_quiz_score: Math.round((avgScore[0]?.avg_score || 0) * 100) / 100,
        popular_courses: popularCourses,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
