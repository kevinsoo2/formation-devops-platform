import { Router } from 'express';
import { db } from '../db/index.js';
import { sql } from 'drizzle-orm';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/forum - List posts
router.get('/', async (req, res) => {
  try {
    const { courseId } = req.query;
    let posts;
    if (courseId) {
      posts = await db.all(sql`SELECT fp.*, u.username, u.display_name, u.avatar FROM forum_posts fp LEFT JOIN users u ON fp.user_id = u.id WHERE fp.course_id = ${courseId} ORDER BY fp.created_at DESC`);
    } else {
      posts = await db.all(sql`SELECT fp.*, u.username, u.display_name, u.avatar FROM forum_posts fp LEFT JOIN users u ON fp.user_id = u.id ORDER BY fp.created_at DESC LIMIT 50`);
    }
    res.json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/forum/:postId
router.get('/:postId', async (req, res) => {
  try {
    const post = await db.all(sql`SELECT fp.*, u.username, u.display_name, u.avatar FROM forum_posts fp LEFT JOIN users u ON fp.user_id = u.id WHERE fp.id = ${req.params.postId}`);
    const replies = await db.all(sql`SELECT fr.*, u.username, u.display_name, u.avatar FROM forum_replies fr LEFT JOIN users u ON fr.user_id = u.id WHERE fr.post_id = ${req.params.postId} ORDER BY fr.created_at ASC`);
    res.json({ success: true, data: { post: post[0], replies } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/forum - Create post
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, content, courseId } = req.body;
    const now = new Date().toISOString();
    await db.run(sql`INSERT INTO forum_posts (user_id, course_id, title, content, created_at) VALUES (${req.user.id}, ${courseId || null}, ${title}, ${content}, ${now})`);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/forum/:postId/reply
router.post('/:postId/reply', requireAuth, async (req, res) => {
  try {
    const { content } = req.body;
    const now = new Date().toISOString();
    await db.run(sql`INSERT INTO forum_replies (post_id, user_id, content, upvotes, created_at) VALUES (${req.params.postId}, ${req.user.id}, ${content}, 0, ${now})`);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/forum/reply/:replyId/upvote
router.post('/reply/:replyId/upvote', async (req, res) => {
  try {
    await db.run(sql`UPDATE forum_replies SET upvotes = upvotes + 1 WHERE id = ${req.params.replyId}`);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
