import { Router } from 'express';
import { db, schema } from '../db/index.js';
import { eq, desc } from 'drizzle-orm';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/comments/:moduleId - Lister les commentaires d'un module
router.get('/:moduleId', async (req, res) => {
  try {
    const allComments = await db.select().from(schema.comments)
      .where(eq(schema.comments.moduleId, req.params.moduleId))
      .orderBy(desc(schema.comments.createdAt));

    // Get user info for each comment
    const userIds = [...new Set(allComments.map(c => c.userId))];
    const allUsers = await db.select().from(schema.users);
    const userMap = {};
    allUsers.forEach(u => { userMap[u.id] = u; });

    const commentsWithUser = allComments.map(c => ({
      id: c.id,
      content: c.content,
      createdAt: c.createdAt,
      user: userMap[c.userId] ? {
        id: userMap[c.userId].id,
        username: userMap[c.userId].username,
        displayName: userMap[c.userId].displayName,
        avatar: userMap[c.userId].avatar,
      } : { id: c.userId, username: 'Anonyme', displayName: 'Anonyme', avatar: '?' },
    }));

    res.json({ success: true, data: commentsWithUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/comments/:moduleId - Ajouter un commentaire (auth requise)
router.post('/:moduleId', requireAuth, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Le commentaire ne peut pas être vide' });
    }

    if (content.length > 1000) {
      return res.status(400).json({ success: false, message: 'Le commentaire est trop long (max 1000 caractères)' });
    }

    const result = await db.insert(schema.comments).values({
      userId: req.user.id,
      moduleId: req.params.moduleId,
      content: content.trim(),
    });

    // Get user info
    const [user] = await db.select().from(schema.users)
      .where(eq(schema.users.id, req.user.id));

    res.status(201).json({
      success: true,
      data: {
        id: Number(result.lastInsertRowid),
        content: content.trim(),
        createdAt: new Date().toISOString(),
        user: {
          id: user.id,
          username: user.username,
          displayName: user.displayName,
          avatar: user.avatar,
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
