import { Router } from 'express';
import { db, schema } from '../db/index.js';
import { desc, eq, gte } from 'drizzle-orm';

const router = Router();

// GET /api/leaderboard - Top 50 users by XP
router.get('/', async (req, res) => {
  try {
    const allUsers = await db.select({
      id: schema.users.id,
      username: schema.users.username,
      displayName: schema.users.displayName,
      avatar: schema.users.avatar,
      xp: schema.users.xp,
      level: schema.users.level,
    }).from(schema.users)
      .orderBy(desc(schema.users.xp))
      .limit(50);

    // Get badge counts for each user
    const allUserBadges = await db.select().from(schema.userBadges);
    const badgeCountMap = {};
    allUserBadges.forEach(ub => {
      badgeCountMap[ub.userId] = (badgeCountMap[ub.userId] || 0) + 1;
    });

    const leaderboard = allUsers.map((user, index) => ({
      rank: index + 1,
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      avatar: user.avatar,
      xp: user.xp,
      level: user.level,
      badgesCount: badgeCountMap[user.id] || 0,
    }));

    res.json({ success: true, data: leaderboard });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/leaderboard/weekly - Users ranked by XP earned this week
router.get('/weekly', async (req, res) => {
  try {
    // Get start of current week (Monday)
    const now = new Date();
    const dayOfWeek = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    monday.setHours(0, 0, 0, 0);
    const weekStart = monday.toISOString();

    // Get quiz scores this week
    const weeklyScores = await db.select({
      userId: schema.quizScores.userId,
    }).from(schema.quizScores)
      .where(gte(schema.quizScores.completedAt, weekStart));

    // Get module completions this week
    const weeklyProgress = await db.select({
      userId: schema.userProgress.userId,
    }).from(schema.userProgress)
      .where(gte(schema.userProgress.completedAt, weekStart));

    // Count activities per user
    const activityMap = {};
    weeklyScores.forEach(s => {
      activityMap[s.userId] = (activityMap[s.userId] || 0) + 100;
    });
    weeklyProgress.forEach(p => {
      activityMap[p.userId] = (activityMap[p.userId] || 0) + 50;
    });

    // Get user details
    const userIds = Object.keys(activityMap);
    if (userIds.length === 0) {
      return res.json({ success: true, data: [] });
    }

    const allUsers = await db.select({
      id: schema.users.id,
      username: schema.users.username,
      displayName: schema.users.displayName,
      avatar: schema.users.avatar,
      xp: schema.users.xp,
      level: schema.users.level,
    }).from(schema.users);

    const weeklyLeaderboard = allUsers
      .filter(u => activityMap[u.id])
      .map(u => ({
        ...u,
        weeklyXP: activityMap[u.id] || 0,
      }))
      .sort((a, b) => b.weeklyXP - a.weeklyXP)
      .slice(0, 50)
      .map((u, i) => ({
        rank: i + 1,
        id: u.id,
        username: u.username,
        displayName: u.displayName,
        avatar: u.avatar,
        xp: u.weeklyXP,
        level: u.level,
        badgesCount: 0,
      }));

    res.json({ success: true, data: weeklyLeaderboard });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
