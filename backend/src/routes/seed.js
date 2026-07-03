import { Router } from 'express';
import { db, schema } from '../db/index.js';
import { seedData } from '../db/seed-data.js';
import { glossaryData } from '../db/glossary-data.js';
import { sql } from 'drizzle-orm';

const router = Router();

const badgesData = [
  { id: 'premier-pas', name: 'Premier pas', description: 'Compléter votre premier module', icon: '🎯', condition: 'first_module_completed' },
  { id: 'studieux', name: 'Studieux', description: 'Compléter 5 modules', icon: '📚', condition: '5_modules_completed' },
  { id: 'expert', name: 'Expert', description: 'Compléter tous les modules d\'un cours', icon: '🏆', condition: 'all_modules_one_course' },
  { id: 'quiz-master', name: 'Quiz Master', description: 'Réussir 3 quiz', icon: '🧠', condition: '3_quizzes_passed' },
  { id: 'perfectionniste', name: 'Perfectionniste', description: 'Obtenir 100% à un quiz', icon: '💎', condition: 'perfect_quiz_score' },
  { id: 'polyvalent', name: 'Polyvalent', description: 'Commencer 3 cours différents', icon: '🌟', condition: '3_courses_started' },
];

// GET /api/seed/:secret - Initialiser via navigateur (collez l'URL)
router.get('/:secret', async (req, res) => {
  if (process.env.SEED_SECRET && req.params.secret !== process.env.SEED_SECRET) {
    return res.status(401).json({ success: false, message: 'Non autorisé' });
  }
  try {
    // Créer les tables si elles n'existent pas
    await db.run(sql`DROP TABLE IF EXISTS quiz_questions`);
    await db.run(sql`DROP TABLE IF EXISTS modules`);
    await db.run(sql`DROP TABLE IF EXISTS courses`);
    await db.run(sql`CREATE TABLE IF NOT EXISTS courses (id TEXT PRIMARY KEY, title TEXT NOT NULL, subtitle TEXT NOT NULL, description TEXT NOT NULL, icon TEXT NOT NULL, color TEXT NOT NULL, duration TEXT NOT NULL, level TEXT NOT NULL, category TEXT NOT NULL, prerequisites TEXT NOT NULL, objectives TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')))`);
    await db.run(sql`CREATE TABLE IF NOT EXISTS modules (id TEXT PRIMARY KEY, course_id TEXT NOT NULL, title TEXT NOT NULL, duration TEXT NOT NULL, order_index INTEGER NOT NULL, theory_content TEXT NOT NULL, practice_content TEXT NOT NULL, key_points TEXT NOT NULL, video_url TEXT)`);
    await db.run(sql`CREATE TABLE IF NOT EXISTS quiz_questions (id TEXT PRIMARY KEY, course_id TEXT NOT NULL, module_id TEXT, question TEXT NOT NULL, options TEXT NOT NULL, correct_index INTEGER NOT NULL, explanation TEXT NOT NULL)`);
    await db.run(sql`CREATE TABLE IF NOT EXISTS user_progress (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, course_id TEXT NOT NULL, module_id TEXT NOT NULL, completed_at TEXT NOT NULL DEFAULT (datetime('now')))`);
    await db.run(sql`CREATE TABLE IF NOT EXISTS quiz_scores (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, course_id TEXT NOT NULL, score REAL NOT NULL, total_questions INTEGER NOT NULL, correct_answers INTEGER NOT NULL, passed INTEGER NOT NULL, completed_at TEXT NOT NULL DEFAULT (datetime('now')))`);

    // v2 tables
    await db.run(sql`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, username TEXT NOT NULL UNIQUE, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, display_name TEXT NOT NULL, avatar TEXT, xp INTEGER NOT NULL DEFAULT 0, level INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL DEFAULT (datetime('now')))`);
    await db.run(sql`CREATE TABLE IF NOT EXISTS badges (id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, icon TEXT NOT NULL, condition TEXT NOT NULL)`);
    await db.run(sql`CREATE TABLE IF NOT EXISTS user_badges (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, badge_id TEXT NOT NULL, earned_at TEXT NOT NULL DEFAULT (datetime('now')))`);
    await db.run(sql`CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, module_id TEXT NOT NULL, content TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')))`);

    for (const course of seedData.courses) {
      await db.insert(schema.courses).values(course).onConflictDoNothing();
    }
    for (const mod of seedData.modules) {
      await db.insert(schema.modules).values(mod).onConflictDoNothing();
    }
    for (const q of seedData.quizQuestions) {
      await db.insert(schema.quizQuestions).values({
        id: q.id,
        courseId: q.courseId,
        moduleId: q.moduleId || null,
        question: q.question,
        options: q.options,
        correctIndex: q.correctAnswer !== undefined ? q.correctAnswer : q.correctIndex,
        explanation: q.explanation,
      }).onConflictDoNothing();
    }

    // Seed badges
    for (const badge of badgesData) {
      await db.insert(schema.badges).values(badge).onConflictDoNothing();
    }

    // Seed glossary (244 termes)
    await db.run(sql`DROP TABLE IF EXISTS glossary`);
    await db.run(sql`CREATE TABLE IF NOT EXISTS glossary (id TEXT PRIMARY KEY, term TEXT NOT NULL, definition TEXT NOT NULL, related_course_id TEXT)`);
    for (const g of glossaryData) {
      await db.run(sql`INSERT OR IGNORE INTO glossary (id, term, definition, related_course_id) VALUES (${g.id}, ${g.term}, ${g.definition}, ${g.relatedCourseId})`);
    }

    res.json({ success: true, message: 'Base de données v2 initialisée !', counts: {
      courses: seedData.courses.length, modules: seedData.modules.length, quizQuestions: seedData.quizQuestions.length, badges: badgesData.length, glossary: glossaryData.length
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

    // Create v2 tables
    await db.run(sql`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, username TEXT NOT NULL UNIQUE, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, display_name TEXT NOT NULL, avatar TEXT, xp INTEGER NOT NULL DEFAULT 0, level INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL DEFAULT (datetime('now')))`);
    await db.run(sql`CREATE TABLE IF NOT EXISTS badges (id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, icon TEXT NOT NULL, condition TEXT NOT NULL)`);
    await db.run(sql`CREATE TABLE IF NOT EXISTS user_badges (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, badge_id TEXT NOT NULL, earned_at TEXT NOT NULL DEFAULT (datetime('now')))`);
    await db.run(sql`CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, module_id TEXT NOT NULL, content TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')))`);

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

    // Insert badges
    for (const badge of badgesData) {
      await db.insert(schema.badges).values(badge).onConflictDoNothing();
    }

    res.json({ success: true, message: 'Base de données v2 initialisée avec succès', counts: {
      courses: seedData.courses.length,
      modules: seedData.modules.length,
      quizQuestions: seedData.quizQuestions.length,
      badges: badgesData.length,
    }});
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
