import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db, schema } from '../db/index.js';
import { eq } from 'drizzle-orm';
import { requireAuth, JWT_SECRET } from '../middleware/auth.js';
import { sendWelcomeEmail } from '../services/email.js';

const router = Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, displayName } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'Nom d\'utilisateur, email et mot de passe requis' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Le mot de passe doit contenir au moins 6 caractères' });
    }

    // Check if user already exists
    const [existingUser] = await db.select().from(schema.users)
      .where(eq(schema.users.username, username));
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Ce nom d\'utilisateur est déjà pris' });
    }

    const [existingEmail] = await db.select().from(schema.users)
      .where(eq(schema.users.email, email));
    if (existingEmail) {
      return res.status(409).json({ success: false, message: 'Cet email est déjà utilisé' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const avatar = (displayName || username).charAt(0).toUpperCase();

    await db.insert(schema.users).values({
      id,
      username,
      email,
      passwordHash,
      displayName: displayName || username,
      avatar,
      xp: 0,
      level: 1,
      role: 'user',
    });

    const token = jwt.sign({ id, username, email, role: 'user' }, JWT_SECRET, { expiresIn: '7d' });

    // Envoyer l'email de bienvenue (async, ne bloque pas la réponse)
    sendWelcomeEmail(email, displayName || username).catch(() => {});

    res.status(201).json({
      success: true,
      data: {
        token,
        user: { id, username, email, displayName: displayName || username, avatar, xp: 0, level: 1, role: 'user' }
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Nom d\'utilisateur et mot de passe requis' });
    }

    const [user] = await db.select().from(schema.users)
      .where(eq(schema.users.username, username));

    if (!user) {
      return res.status(401).json({ success: false, message: 'Identifiants invalides' });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({ success: false, message: 'Identifiants invalides' });
    }

    const token = jwt.sign({ id: user.id, username: user.username, email: user.email, role: user.role || 'user' }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          displayName: user.displayName,
          avatar: user.avatar,
          xp: user.xp,
          level: user.level,
          role: user.role || 'user',
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/auth/me
router.get('/me', requireAuth, async (req, res) => {
  try {
    const [user] = await db.select().from(schema.users)
      .where(eq(schema.users.id, req.user.id));

    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }

    // Get user badges
    const userBadgesList = await db.select().from(schema.userBadges)
      .where(eq(schema.userBadges.userId, user.id));

    const badgeIds = userBadgesList.map(ub => ub.badgeId);
    let badgesData = [];
    if (badgeIds.length > 0) {
      const allBadges = await db.select().from(schema.badges);
      badgesData = allBadges.filter(b => badgeIds.includes(b.id));
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        avatar: user.avatar,
        xp: user.xp,
        level: user.level,
        role: user.role || 'user',
        badges: badgesData,
        createdAt: user.createdAt,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
