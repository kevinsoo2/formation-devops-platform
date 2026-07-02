import { Router } from 'express';
import { db, schema } from '../db/index.js';
import { eq, like } from 'drizzle-orm';

const router = Router();

// GET /api/courses - Toutes les formations
router.get('/', async (req, res) => {
  try {
    const allCourses = await db.select().from(schema.courses);
    const result = allCourses.map(c => ({
      ...c,
      prerequisites: JSON.parse(c.prerequisites),
      objectives: JSON.parse(c.objectives),
    }));
    res.json({ success: true, count: result.length, data: result });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/courses/:id - Détail d'une formation
router.get('/:id', async (req, res) => {
  try {
    const [course] = await db.select().from(schema.courses).where(eq(schema.courses.id, req.params.id));
    if (!course) return res.status(404).json({ success: false, message: 'Formation non trouvée' });
    res.json({
      success: true,
      data: { ...course, prerequisites: JSON.parse(course.prerequisites), objectives: JSON.parse(course.objectives) }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
