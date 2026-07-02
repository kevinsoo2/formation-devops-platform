import { Router } from 'express';
import { db, schema } from '../db/index.js';
import { seedData } from '../db/seed-data.js';
import { sql } from 'drizzle-orm';

const router = Router();

// GET /api/seed/:secret - Initialiser via navigateur (collez l'URL)
router.get('/:secret', async (req, res) => {
  if (process.env.SEED_SECRET && req.params.secret !== process.env.SEED_SECRET) {
    return res.status(401).json({ success: false, message: 'Non autorisé' });
  }
  try {
    // Créer les tables si elles n'existent pas
    await db.run(sql`CREATE TABLE IF NOT EXISTS courses (id TEXT PRIMARY KEY, title TEXT NOT NULL, subtitle TEXT NOT NULL, description TEXT NOT NULL, icon TEXT NOT NULL, color TEXT NOT NULL, duration TEXT NOT NULL, level TEXT NOT NULL, category TEXT NOT NULL, prerequisites TEXT NOT NULL, objectives TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')))`);
    await db.run(sql`CREATE TABLE IF NOT EXISTS modules (id TEXT PRIMARY KEY, course_id TEXT NOT NULL, title TEXT NOT NULL, duration TEXT NOT NULL, order_index INTEGER NOT NULL, theory_content TEXT NOT NULL, practice_content TEXT NOT NULL, key_points TEXT NOT NULL)`);
    await db.run(sql`CREATE TABLE IF NOT EXISTS quiz_questions (id TEXT PRIMARY KEY, course_id TEXT NOT NULL, module_id TEXT NOT NULL, question TEXT NOT NULL, options TEXT NOT NULL, correct_index INTEGER NOT NULL, explanation TEXT NOT NULL)`);
    await db.run(sql`CREATE TABLE IF NOT EXISTS user_progress (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, course_id TEXT NOT NULL, module_id TEXT NOT NULL, completed_at TEXT NOT NULL DEFAULT (datetime('now')))`);
    await db.run(sql`CREATE TABLE IF NOT EXISTS quiz_scores (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, course_id TEXT NOT NULL, score REAL NOT NULL, total_questions INTEGER NOT NULL, correct_answers INTEGER NOT NULL, passed INTEGER NOT NULL, completed_at TEXT NOT NULL DEFAULT (datetime('now')))`);

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
