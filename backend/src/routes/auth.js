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

// POST /api/auth/google - OAuth Google login
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ success: false, message: 'Token Google requis' });
    }

    // Verify token with Google
    const googleRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
    const payload = await googleRes.json();

    if (!payload.email) {
      return res.status(401).json({ success: false, message: 'Token Google invalide' });
    }

    const { email, name, picture } = payload;

    // Check if user exists
    const [existingUser] = await db.select().from(schema.users)
      .where(eq(schema.users.email, email));

    if (existingUser) {
      // Login existing user
      const jwtToken = jwt.sign(
        { id: existingUser.id, username: existingUser.username, email: existingUser.email, role: existingUser.role || 'user' },
        JWT_SECRET,
        { expiresIn: '7d' }
      );
      return res.json({
        success: true,
        data: {
          token: jwtToken,
          user: {
            id: existingUser.id,
            username: existingUser.username,
            email: existingUser.email,
            displayName: existingUser.displayName,
            avatar: existingUser.avatar,
            xp: existingUser.xp,
            level: existingUser.level,
            role: existingUser.role || 'user',
          }
        }
      });
    }

    // Create new user
    const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const username = email.split('@')[0] + '_' + Math.random().toString(36).substr(2, 4);
    const displayName = name || email.split('@')[0];
    const avatar = picture || displayName.charAt(0).toUpperCase();

    await db.insert(schema.users).values({
      id,
      username,
      email,
      passwordHash: 'oauth_google',
      displayName,
      avatar,
      xp: 0,
      level: 1,
      role: 'user',
    });

    const jwtToken = jwt.sign({ id, username, email, role: 'user' }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      data: {
        token: jwtToken,
        user: { id, username, email, displayName, avatar, xp: 0, level: 1, role: 'user' }
      }
    });
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la connexion Google' });
  }
});

// POST /api/auth/github - OAuth GitHub login
router.post('/github', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: 'Code GitHub requis' });
    }

    // Exchange code for access token
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      })
    });
    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return res.status(401).json({ success: false, message: 'Code GitHub invalide ou expiré' });
    }

    // Get user info
    const userRes = await fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${tokenData.access_token}`, 'User-Agent': 'DevOps-Academy' }
    });
    const githubUser = await userRes.json();

    // Get user email if not public
    let email = githubUser.email;
    if (!email) {
      const emailsRes = await fetch('https://api.github.com/user/emails', {
        headers: { Authorization: `Bearer ${tokenData.access_token}`, 'User-Agent': 'DevOps-Academy' }
      });
      const emails = await emailsRes.json();
      const primaryEmail = emails.find(e => e.primary) || emails[0];
      email = primaryEmail ? primaryEmail.email : null;
    }

    if (!email) {
      return res.status(400).json({ success: false, message: 'Impossible de récupérer l\'email GitHub' });
    }

    // Check if user exists
    const [existingUser] = await db.select().from(schema.users)
      .where(eq(schema.users.email, email));

    if (existingUser) {
      // Login existing user
      const jwtToken = jwt.sign(
        { id: existingUser.id, username: existingUser.username, email: existingUser.email, role: existingUser.role || 'user' },
        JWT_SECRET,
        { expiresIn: '7d' }
      );
      return res.json({
        success: true,
        data: {
          token: jwtToken,
          user: {
            id: existingUser.id,
            username: existingUser.username,
            email: existingUser.email,
            displayName: existingUser.displayName,
            avatar: existingUser.avatar,
            xp: existingUser.xp,
            level: existingUser.level,
            role: existingUser.role || 'user',
          }
        }
      });
    }

    // Create new user
    const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const username = githubUser.login || email.split('@')[0] + '_' + Math.random().toString(36).substr(2, 4);
    const displayName = githubUser.name || githubUser.login || email.split('@')[0];
    const avatar = githubUser.avatar_url || displayName.charAt(0).toUpperCase();

    await db.insert(schema.users).values({
      id,
      username,
      email,
      passwordHash: 'oauth_github',
      displayName,
      avatar,
      xp: 0,
      level: 1,
      role: 'user',
    });

    const jwtToken = jwt.sign({ id, username, email, role: 'user' }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      data: {
        token: jwtToken,
        user: { id, username, email, displayName, avatar, xp: 0, level: 1, role: 'user' }
      }
    });
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la connexion GitHub' });
  }
});

export default router;
