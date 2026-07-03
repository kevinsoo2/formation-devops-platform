import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// Table des formations
export const courses = sqliteTable('courses', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  subtitle: text('subtitle').notNull(),
  description: text('description').notNull(),
  icon: text('icon').notNull(),
  color: text('color').notNull(),
  duration: text('duration').notNull(),
  level: text('level').notNull(),
  category: text('category').notNull(),
  prerequisites: text('prerequisites').notNull(),
  objectives: text('objectives').notNull(),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

// Table des modules
export const modules = sqliteTable('modules', {
  id: text('id').primaryKey(),
  courseId: text('course_id').notNull().references(() => courses.id),
  title: text('title').notNull(),
  duration: text('duration').notNull(),
  orderIndex: integer('order_index').notNull(),
  theoryContent: text('theory_content').notNull(),
  practiceContent: text('practice_content').notNull(),
  keyPoints: text('key_points').notNull(),
  videoUrl: text('video_url'),
});

// Table des questions de quiz
export const quizQuestions = sqliteTable('quiz_questions', {
  id: text('id').primaryKey(),
  courseId: text('course_id').notNull().references(() => courses.id),
  moduleId: text('module_id'),
  question: text('question').notNull(),
  options: text('options').notNull(),
  correctIndex: integer('correct_index').notNull(),
  explanation: text('explanation').notNull(),
});

// Table de progression utilisateur
export const userProgress = sqliteTable('user_progress', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  courseId: text('course_id').notNull().references(() => courses.id),
  moduleId: text('module_id').notNull().references(() => modules.id),
  completedAt: text('completed_at').notNull().$defaultFn(() => new Date().toISOString()),
});

// Table des scores de quiz
export const quizScores = sqliteTable('quiz_scores', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  courseId: text('course_id').notNull().references(() => courses.id),
  score: real('score').notNull(),
  totalQuestions: integer('total_questions').notNull(),
  correctAnswers: integer('correct_answers').notNull(),
  passed: integer('passed').notNull(),
  completedAt: text('completed_at').notNull().$defaultFn(() => new Date().toISOString()),
});

// Table des utilisateurs (v3: added role)
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  displayName: text('display_name').notNull(),
  avatar: text('avatar'),
  xp: integer('xp').notNull().default(0),
  level: integer('level').notNull().default(1),
  role: text('role').notNull().default('user'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

// Table des badges (v3: added hidden field)
export const badges = sqliteTable('badges', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  icon: text('icon').notNull(),
  condition: text('condition').notNull(),
  hidden: integer('hidden').notNull().default(0),
});

// Table des badges utilisateur
export const userBadges = sqliteTable('user_badges', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull().references(() => users.id),
  badgeId: text('badge_id').notNull().references(() => badges.id),
  earnedAt: text('earned_at').notNull().$defaultFn(() => new Date().toISOString()),
});

// Table des commentaires
export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull().references(() => users.id),
  moduleId: text('module_id').notNull().references(() => modules.id),
  content: text('content').notNull(),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

// V3: Streaks table
export const streaks = sqliteTable('streaks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull().unique(),
  currentStreak: integer('current_streak').notNull().default(0),
  longestStreak: integer('longest_streak').notNull().default(0),
  lastActivityDate: text('last_activity_date'),
});

// V3: Activity log (heatmap)
export const activityLog = sqliteTable('activity_log', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  date: text('date').notNull(),
  activityCount: integer('activity_count').notNull().default(1),
});

// V3: Personal notes
export const notes = sqliteTable('notes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  moduleId: text('module_id').notNull(),
  content: text('content').notNull().default(''),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
});

// V3: Favorites/bookmarks
export const favorites = sqliteTable('favorites', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  courseId: text('course_id'),
  moduleId: text('module_id'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

// V3: Weekly challenges
export const challenges = sqliteTable('challenges', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  targetCount: integer('target_count').notNull(),
  xpReward: integer('xp_reward').notNull(),
  weekStart: text('week_start').notNull(),
  weekEnd: text('week_end').notNull(),
});

// V3: User challenges progress
export const userChallenges = sqliteTable('user_challenges', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  challengeId: text('challenge_id').notNull(),
  progress: integer('progress').notNull().default(0),
  completed: integer('completed').notNull().default(0),
});

// V3: Notifications
export const notifications = sqliteTable('notifications', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  message: text('message').notNull(),
  type: text('type').notNull(),
  read: integer('read').notNull().default(0),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

// V3: Study time tracking
export const studyTime = sqliteTable('study_time', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  moduleId: text('module_id').notNull(),
  seconds: integer('seconds').notNull(),
  date: text('date').notNull(),
});

// V3: Forum posts
export const forumPosts = sqliteTable('forum_posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  courseId: text('course_id'),
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

// V3: Forum replies
export const forumReplies = sqliteTable('forum_replies', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  postId: integer('post_id').notNull(),
  userId: text('user_id').notNull(),
  content: text('content').notNull(),
  upvotes: integer('upvotes').notNull().default(0),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

// V3: Glossary terms
export const glossary = sqliteTable('glossary', {
  id: text('id').primaryKey(),
  term: text('term').notNull(),
  definition: text('definition').notNull(),
  relatedCourseId: text('related_course_id'),
});

// V3: Exercises
export const exercises = sqliteTable('exercises', {
  id: text('id').primaryKey(),
  moduleId: text('module_id').notNull(),
  instruction: text('instruction').notNull(),
  expectedAnswer: text('expected_answer').notNull(),
  hint: text('hint'),
  xpReward: integer('xp_reward').notNull().default(25),
});
