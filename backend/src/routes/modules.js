import { Router } from 'express';
import { db, schema } from '../db/index.js';
import { eq, and } from 'drizzle-orm';

const router = Router();

// GET /api/modules/:courseId - Modules d'une formation
router.get('/:courseId', async (req, res) => {
  try {
    const courseModules = await db.select().from(schema.modules)
      .where(eq(schema.modules.courseId, req.params.courseId))
      .orderBy(schema.modules.orderIndex);
    
    const result = courseModules.map(m => ({
      ...m,
      keyPoints: JSON.parse(m.keyPoints),
    }));
    res.json({ success: true, count: result.length, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/modules/:courseId/:moduleId - Détail d'un module
router.get('/:courseId/:moduleId', async (req, res) => {
  try {
    const [mod] = await db.select().from(schema.modules)
      .where(and(
        eq(schema.modules.courseId, req.params.courseId),
        eq(schema.modules.id, req.params.moduleId)
      ));
    if (!mod) return res.status(404).json({ success: false, message: 'Module non trouvé' });
    res.json({ success: true, data: { ...mod, keyPoints: JSON.parse(mod.keyPoints) } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
