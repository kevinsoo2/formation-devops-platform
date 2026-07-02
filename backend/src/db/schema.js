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
  prerequisites: text('prerequisites').notNull(), // JSON string
  objectives: text('objectives').notNull(), // JSON string
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
  keyPoints: text('key_points').notNull(), // JSON string
});

// Table des questions de quiz
export const quizQuestions = sqliteTable('quiz_questions', {
  id: text('id').primaryKey(),
  courseId: text('course_id').notNull().references(() => courses.id),
  moduleId: text('module_id'),
  question: text('question').notNull(),
  options: text('options').notNull(), // JSON string
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
  passed: integer('passed').notNull(), // 0 or 1
  completedAt: text('completed_at').notNull().$defaultFn(() => new Date().toISOString()),
});
