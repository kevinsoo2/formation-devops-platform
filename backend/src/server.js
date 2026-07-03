import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import https from 'https';
import http from 'http';

import { db, schema } from './db/index.js';
import { seedData } from './db/seed-data.js';
import { sql } from 'drizzle-orm';

import coursesRoutes from './routes/courses.js';
import modulesRoutes from './routes/modules.js';
import quizRoutes from './routes/quiz.js';
import progressRoutes from './routes/progress.js';
import seedRoutes from './routes/seed.js';
import authRoutes from './routes/auth.js';
import searchRoutes from './routes/search.js';
import leaderboardRoutes from './routes/leaderboard.js';
import commentsRoutes from './routes/comments.js';
import badgesRoutes from './routes/badges.js';
// V3 routes
import streaksRoutes from './routes/streaks.js';
import activityRoutes from './routes/activity.js';
import notesRoutes from './routes/notes.js';
import favoritesRoutes from './routes/favorites.js';
import challengesRoutes from './routes/challenges.js';
import notificationsRoutes from './routes/notifications.js';
import studytimeRoutes from './routes/studytime.js';
import forumRoutes from './routes/forum.js';
import glossaryRoutes from './routes/glossary.js';
import exercisesRoutes from './routes/exercises.js';
import profilesRoutes from './routes/profiles.js';
import adminRoutes from './routes/admin.js';
import emailsRoutes from './routes/emails.js';
import statsRoutes from './routes/stats.js';
import rateLimit from './middleware/rateLimit.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());

// Rate limiting
app.use(rateLimit);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString(), env: process.env.NODE_ENV || 'development', version: '3.0.0' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/modules', modulesRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/badges', badgesRoutes);
app.use('/api/seed', seedRoutes);
// V3 routes
app.use('/api/streaks', streaksRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/challenges', challengesRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/studytime', studytimeRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/glossary', glossaryRoutes);
app.use('/api/exercises', exercisesRoutes);
app.use('/api/users', profilesRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/emails', emailsRoutes);
app.use('/api/stats', statsRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: process.env.NODE_ENV === 'development' ? err.message : undefined });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Formation DevOps API v3 running on port ${PORT}`);
  
  // ============================================
  // AUTO-SEED : Si la base est vide, seed automatiquement
  // ============================================
  autoSeedIfEmpty();
  
  // ============================================
  // SELF-PING : Garder le serveur éveillé (Render free tier)
  // Ping toutes les 13 minutes pour éviter l'inactivité
  // ============================================
  const RENDER_URL = process.env.RENDER_EXTERNAL_URL || process.env.RENDER_SERVICE_URL || `http://localhost:${PORT}`;
  
  if (process.env.NODE_ENV === 'production' || process.env.RENDER) {
    const PING_INTERVAL = 13 * 60 * 1000; // 13 minutes
    
    setInterval(() => {
      const pingUrl = RENDER_URL.startsWith('https') 
        ? RENDER_URL 
        : `https://formation-devops-platform.onrender.com`;
      
      const client = pingUrl.startsWith('https') ? https : http;
      
      client.get(`${pingUrl}/health`, (res) => {
        console.log(`[SELF-PING] ${new Date().toISOString()} - Status: ${res.statusCode}`);
      }).on('error', (err) => {
        console.log(`[SELF-PING] ${new Date().toISOString()} - Error: ${err.message}`);
      });
    }, PING_INTERVAL);
    
    console.log(`[SELF-PING] Activé - ping toutes les 13 minutes vers ${RENDER_URL}`);
  }
});

// ============================================
// AUTO-SEED FUNCTION
// Vérifie si la base est vide et la remplit automatiquement
// ============================================
async function autoSeedIfEmpty() {
  try {
    // Vérifier si la table courses existe et a des données
    const result = await db.select().from(schema.courses).limit(1);
    
    if (result.length === 0) {
      console.log('[AUTO-SEED] Base de données vide détectée, seed automatique en cours...');
      
      // Créer les tables
      await db.run(sql`CREATE TABLE IF NOT EXISTS courses (id TEXT PRIMARY KEY, title TEXT NOT NULL, subtitle TEXT NOT NULL, description TEXT NOT NULL, icon TEXT NOT NULL, color TEXT NOT NULL, duration TEXT NOT NULL, level TEXT NOT NULL, category TEXT NOT NULL, prerequisites TEXT NOT NULL, objectives TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')))`);
      await db.run(sql`CREATE TABLE IF NOT EXISTS modules (id TEXT PRIMARY KEY, course_id TEXT NOT NULL, title TEXT NOT NULL, duration TEXT NOT NULL, order_index INTEGER NOT NULL, theory_content TEXT NOT NULL, practice_content TEXT NOT NULL, key_points TEXT NOT NULL, video_url TEXT)`);
      await db.run(sql`CREATE TABLE IF NOT EXISTS quiz_questions (id TEXT PRIMARY KEY, course_id TEXT NOT NULL, module_id TEXT, question TEXT NOT NULL, options TEXT NOT NULL, correct_index INTEGER NOT NULL, explanation TEXT NOT NULL)`);
      await db.run(sql`CREATE TABLE IF NOT EXISTS user_progress (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, course_id TEXT NOT NULL, module_id TEXT NOT NULL, completed_at TEXT NOT NULL DEFAULT (datetime('now')))`);
      await db.run(sql`CREATE TABLE IF NOT EXISTS quiz_scores (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, course_id TEXT NOT NULL, score REAL NOT NULL, total_questions INTEGER NOT NULL, correct_answers INTEGER NOT NULL, passed INTEGER NOT NULL, completed_at TEXT NOT NULL DEFAULT (datetime('now')))`);
      await db.run(sql`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, username TEXT NOT NULL UNIQUE, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, display_name TEXT NOT NULL, avatar TEXT, xp INTEGER NOT NULL DEFAULT 0, level INTEGER NOT NULL DEFAULT 1, role TEXT NOT NULL DEFAULT 'user', created_at TEXT NOT NULL DEFAULT (datetime('now')))`);
      await db.run(sql`CREATE TABLE IF NOT EXISTS badges (id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, icon TEXT NOT NULL, condition TEXT NOT NULL, hidden INTEGER NOT NULL DEFAULT 0)`);
      await db.run(sql`CREATE TABLE IF NOT EXISTS user_badges (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, badge_id TEXT NOT NULL, earned_at TEXT NOT NULL DEFAULT (datetime('now')))`);
      await db.run(sql`CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, module_id TEXT NOT NULL, content TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')))`);
      await db.run(sql`CREATE TABLE IF NOT EXISTS streaks (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL UNIQUE, current_streak INTEGER NOT NULL DEFAULT 0, longest_streak INTEGER NOT NULL DEFAULT 0, last_activity_date TEXT)`);
      await db.run(sql`CREATE TABLE IF NOT EXISTS activity_log (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, date TEXT NOT NULL, activity_count INTEGER NOT NULL DEFAULT 1)`);
      await db.run(sql`CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, module_id TEXT NOT NULL, content TEXT NOT NULL, updated_at TEXT NOT NULL DEFAULT (datetime('now')))`);
      await db.run(sql`CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, course_id TEXT, module_id TEXT, created_at TEXT NOT NULL DEFAULT (datetime('now')))`);
      await db.run(sql`CREATE TABLE IF NOT EXISTS notifications (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, message TEXT NOT NULL, type TEXT NOT NULL DEFAULT 'info', read INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL DEFAULT (datetime('now')))`);
      await db.run(sql`CREATE TABLE IF NOT EXISTS study_time (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, module_id TEXT NOT NULL, seconds INTEGER NOT NULL, date TEXT NOT NULL DEFAULT (date('now')))`);
      await db.run(sql`CREATE TABLE IF NOT EXISTS forum_posts (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, course_id TEXT, title TEXT NOT NULL, content TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')))`);
      await db.run(sql`CREATE TABLE IF NOT EXISTS forum_replies (id INTEGER PRIMARY KEY AUTOINCREMENT, post_id INTEGER NOT NULL, user_id TEXT NOT NULL, content TEXT NOT NULL, upvotes INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL DEFAULT (datetime('now')))`);
      await db.run(sql`CREATE TABLE IF NOT EXISTS glossary (id TEXT PRIMARY KEY, term TEXT NOT NULL, definition TEXT NOT NULL, related_course_id TEXT)`);
      await db.run(sql`CREATE TABLE IF NOT EXISTS exercises (id INTEGER PRIMARY KEY AUTOINCREMENT, module_id TEXT NOT NULL, instruction TEXT NOT NULL, expected_answer TEXT NOT NULL, hint TEXT, xp_reward INTEGER NOT NULL DEFAULT 25)`);
      await db.run(sql`CREATE TABLE IF NOT EXISTS challenges (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT NOT NULL, target_count INTEGER NOT NULL, xp_reward INTEGER NOT NULL, week_start TEXT NOT NULL, week_end TEXT NOT NULL)`);
      await db.run(sql`CREATE TABLE IF NOT EXISTS user_challenges (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, challenge_id INTEGER NOT NULL, progress INTEGER NOT NULL DEFAULT 0, completed INTEGER NOT NULL DEFAULT 0)`);
      
      // Insérer les données
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
      
      // Badges
      const badgesData = [
        { id: 'premier-pas', name: 'Premier pas', description: 'Compléter votre premier module', icon: '🎯', condition: 'first_module_completed', hidden: 0 },
        { id: 'studieux', name: 'Studieux', description: 'Compléter 5 modules', icon: '📚', condition: '5_modules_completed', hidden: 0 },
        { id: 'expert', name: 'Expert', description: 'Compléter tous les modules d un cours', icon: '🏆', condition: 'all_modules_one_course', hidden: 0 },
        { id: 'quiz-master', name: 'Quiz Master', description: 'Réussir 3 quiz', icon: '🧠', condition: '3_quizzes_passed', hidden: 0 },
        { id: 'perfectionniste', name: 'Perfectionniste', description: 'Obtenir 100% à un quiz', icon: '💎', condition: 'perfect_quiz_score', hidden: 0 },
        { id: 'polyvalent', name: 'Polyvalent', description: 'Commencer 3 cours différents', icon: '🌟', condition: '3_courses_started', hidden: 0 },
        { id: 'night-owl', name: 'Night Owl', description: 'Étudier après minuit', icon: '🦉', condition: 'study_after_midnight', hidden: 1 },
        { id: 'speed-runner', name: 'Speed Runner', description: 'Terminer un cours en 1 jour', icon: '⚡', condition: 'course_in_one_day', hidden: 1 },
        { id: 'completionist', name: 'Completionist', description: 'Terminer tous les cours à 100%', icon: '👑', condition: 'all_courses_completed', hidden: 1 },
      ];
      for (const badge of badgesData) {
        await db.run(sql`INSERT OR IGNORE INTO badges (id, name, description, icon, condition, hidden) VALUES (${badge.id}, ${badge.name}, ${badge.description}, ${badge.icon}, ${badge.condition}, ${badge.hidden})`);
      }
      
      console.log(`[AUTO-SEED] Terminé ! ${seedData.courses.length} cours, ${seedData.modules.length} modules, ${seedData.quizQuestions.length} quiz insérés.`);
    } else {
      console.log(`[AUTO-SEED] Base de données déjà initialisée (${result.length}+ cours trouvés).`);
    }
  } catch (error) {
    // Si la table n'existe pas du tout, on la crée et on seed
    if (error.message && (error.message.includes('no such table') || error.message.includes('SQLITE_ERROR'))) {
      console.log('[AUTO-SEED] Tables non trouvées, lancement du seed initial...');
      try {
        // Appeler le endpoint seed via fetch interne après un délai
        setTimeout(async () => {
          try {
            const seedSecret = process.env.SEED_SECRET || 'monSecret123';
            const baseUrl = `http://localhost:${PORT}`;
            const res = await fetch(`${baseUrl}/api/seed/${seedSecret}`);
            const data = await res.json();
            console.log('[AUTO-SEED] Résultat:', data.message || data);
          } catch (e) {
            console.log('[AUTO-SEED] Fallback seed error:', e.message);
          }
        }, 2000);
      } catch (e) {
        console.log('[AUTO-SEED] Error:', e.message);
      }
    } else {
      console.log('[AUTO-SEED] Error checking database:', error.message);
    }
  }
}


export default app;
