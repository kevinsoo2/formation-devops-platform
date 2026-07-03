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
  res.json({ status: 'healthy', timestamp: new Date().toISOString(), env: process.env.NODE_ENV || 'development', version: '2.0.0' });
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

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: process.env.NODE_ENV === 'development' ? err.message : undefined });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Formation DevOps API v2 running on port ${PORT}`);
});

export default app;
