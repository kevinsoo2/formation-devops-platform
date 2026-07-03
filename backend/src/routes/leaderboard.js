import { Router } from 'express';
import { db, schema } from '../db/index.js';
import { desc, eq } from 'drizzle-orm';

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

export default router;
