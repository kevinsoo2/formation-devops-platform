import { Router } from 'express';
import { db, schema } from '../db/index.js';
import { like, or } from 'drizzle-orm';

const router = Router();

// GET /api/search?q=query
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Recherche trop courte (min 2 caractères)' });
    }

    const searchTerm = `%${q.trim().toLowerCase()}%`;

    // Search courses
    const allCourses = await db.select().from(schema.courses);
    const matchedCourses = allCourses.filter(c =>
      c.title.toLowerCase().includes(q.trim().toLowerCase()) ||
      c.description.toLowerCase().includes(q.trim().toLowerCase()) ||
      c.subtitle.toLowerCase().includes(q.trim().toLowerCase())
    );

    // Search modules
    const allModules = await db.select().from(schema.modules);
    const matchedModules = allModules.filter(m =>
      m.title.toLowerCase().includes(q.trim().toLowerCase()) ||
      m.theoryContent.toLowerCase().includes(q.trim().toLowerCase())
    );

    res.json({
      success: true,
      data: {
        query: q,
        courses: matchedCourses.map(c => ({
          id: c.id,
          title: c.title,
          subtitle: c.subtitle,
          description: c.description,
          icon: c.icon,
          color: c.color,
          level: c.level,
          duration: c.duration,
        })),
        modules: matchedModules.map(m => ({
          id: m.id,
          courseId: m.courseId,
          title: m.title,
          duration: m.duration,
          orderIndex: m.orderIndex,
        })),
        totalResults: matchedCourses.length + matchedModules.length,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
