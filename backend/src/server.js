import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

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

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: process.env.NODE_ENV === 'development' ? err.message : undefined });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Formation DevOps API v3 running on port ${PORT}`);
});

export default app;
