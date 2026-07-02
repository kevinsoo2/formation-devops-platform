import { Router } from 'express';
import { db, schema } from '../db/index.js';
import { seedData } from '../db/seed-data.js';

const router = Router();

// GET /api/seed/:secret - Initialiser via navigateur (collez l'URL)
router.get('/:secret', async (req, res) => {
  if (process.env.SEED_SECRET && req.params.secret !== process.env.SEED_SECRET) {
    return res.status(401).json({ success: false, message: 'Non autorisé' });
  }
  try {
    for (const course of seedData.courses) {
      await db.insert(schema.courses).values(course).onConflictDoNothing();
    }
    for (const mod of seedData.modules) {
      await db.insert(schema.modules).values(mod).onConflictDoNothing();
    }
    for (const q of seedData.quizQuestions) {
      await db.insert(schema.quizQuestions).values(q).onConflictDoNothing();
    }
    res.json({ success: true, message: 'Base de données initialisée !', counts: {
      courses: seedData.courses.length, modules: seedData.modules.length, quizQuestions: seedData.quizQuestions.length
    }});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/seed - Initialiser la base de données avec les données
router.post('/', async (req, res) => {
  try {
    const secret = req.headers['x-seed-secret'];
    if (process.env.SEED_SECRET && secret !== process.env.SEED_SECRET) {
      return res.status(401).json({ success: false, message: 'Non autorisé' });
    }

    // Insert courses
    for (const course of seedData.courses) {
      await db.insert(schema.courses).values(course).onConflictDoNothing();
    }

    // Insert modules
    for (const mod of seedData.modules) {
      await db.insert(schema.modules).values(mod).onConflictDoNothing();
    }

    // Insert quiz questions
    for (const q of seedData.quizQuestions) {
      await db.insert(schema.quizQuestions).values(q).onConflictDoNothing();
    }

    res.json({ success: true, message: 'Base de données initialisée avec succès', counts: {
      courses: seedData.courses.length,
      modules: seedData.modules.length,
      quizQuestions: seedData.quizQuestions.length
    }});
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
