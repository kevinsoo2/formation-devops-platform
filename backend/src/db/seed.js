import { db, schema } from './index.js';
import { seedData } from './seed-data.js';
import { sql } from 'drizzle-orm';

async function seed() {
  console.log('🌱 Seeding database...');

  // Create tables
  await db.run(sql`CREATE TABLE IF NOT EXISTS courses (id TEXT PRIMARY KEY, title TEXT NOT NULL, subtitle TEXT NOT NULL, description TEXT NOT NULL, icon TEXT NOT NULL, color TEXT NOT NULL, duration TEXT NOT NULL, level TEXT NOT NULL, category TEXT NOT NULL, prerequisites TEXT NOT NULL, objectives TEXT NOT NULL, created_at TEXT NOT NULL)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS modules (id TEXT PRIMARY KEY, course_id TEXT NOT NULL, title TEXT NOT NULL, duration TEXT NOT NULL, order_index INTEGER NOT NULL, theory_content TEXT NOT NULL, practice_content TEXT NOT NULL, key_points TEXT NOT NULL)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS quiz_questions (id TEXT PRIMARY KEY, course_id TEXT NOT NULL, module_id TEXT NOT NULL, question TEXT NOT NULL, options TEXT NOT NULL, correct_index INTEGER NOT NULL, explanation TEXT NOT NULL)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS user_progress (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, course_id TEXT NOT NULL, module_id TEXT NOT NULL, completed_at TEXT NOT NULL)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS quiz_scores (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, course_id TEXT NOT NULL, score REAL NOT NULL, total_questions INTEGER NOT NULL, correct_answers INTEGER NOT NULL, passed INTEGER NOT NULL, completed_at TEXT NOT NULL)`);

  // New v2 tables
  await db.run(sql`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, username TEXT NOT NULL UNIQUE, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, display_name TEXT NOT NULL, avatar TEXT, xp INTEGER NOT NULL DEFAULT 0, level INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS badges (id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, icon TEXT NOT NULL, condition TEXT NOT NULL)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS user_badges (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, badge_id TEXT NOT NULL, earned_at TEXT NOT NULL)`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, module_id TEXT NOT NULL, content TEXT NOT NULL, created_at TEXT NOT NULL)`);

  // Seed courses
  for (const course of seedData.courses) {
    await db.insert(schema.courses).values(course).onConflictDoNothing();
  }
  console.log(`  ✅ ${seedData.courses.length} courses`);

  // Seed modules
  for (const mod of seedData.modules) {
    await db.insert(schema.modules).values(mod).onConflictDoNothing();
  }
  console.log(`  ✅ ${seedData.modules.length} modules`);

  // Seed quiz questions
  for (const q of seedData.quizQuestions) {
    await db.insert(schema.quizQuestions).values(q).onConflictDoNothing();
  }
  console.log(`  ✅ ${seedData.quizQuestions.length} quiz questions`);

  // Seed badges
  const badgesData = [
    { id: 'premier-pas', name: 'Premier pas', description: 'Compléter votre premier module', icon: '🎯', condition: 'first_module_completed' },
    { id: 'studieux', name: 'Studieux', description: 'Compléter 5 modules', icon: '📚', condition: '5_modules_completed' },
    { id: 'expert', name: 'Expert', description: 'Compléter tous les modules d\'un cours', icon: '🏆', condition: 'all_modules_one_course' },
    { id: 'quiz-master', name: 'Quiz Master', description: 'Réussir 3 quiz', icon: '🧠', condition: '3_quizzes_passed' },
    { id: 'perfectionniste', name: 'Perfectionniste', description: 'Obtenir 100% à un quiz', icon: '💎', condition: 'perfect_quiz_score' },
    { id: 'polyvalent', name: 'Polyvalent', description: 'Commencer 3 cours différents', icon: '🌟', condition: '3_courses_started' },
  ];

  for (const badge of badgesData) {
    await db.insert(schema.badges).values(badge).onConflictDoNothing();
  }
  console.log(`  ✅ ${badgesData.length} badges`);

  console.log('🎉 Seeding complete!');
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
