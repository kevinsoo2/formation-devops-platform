import { Router } from 'express';
import { db } from '../db/index.js';
import { sql } from 'drizzle-orm';
import { sendReminderEmail } from '../services/email.js';

const router = Router();

// GET /api/emails/send-reminders/:secret - Envoyer les rappels aux utilisateurs inactifs
// Appeler via cron-job.org tous les jours à 10h
router.get('/send-reminders/:secret', async (req, res) => {
  const secret = process.env.SEED_SECRET || 'monSecret123';
  if (req.params.secret !== secret) {
    return res.status(401).json({ success: false, message: 'Non autorisé' });
  }

  try {
    // Trouver les utilisateurs inactifs depuis 3+ jours
    const inactiveUsers = await db.all(sql`
      SELECT u.id, u.email, u.display_name, u.username,
        CAST(julianday('now') - julianday(COALESCE(
          (SELECT MAX(completed_at) FROM user_progress WHERE user_id = u.id),
          u.created_at
        )) AS INTEGER) as days_inactive
      FROM users u
      WHERE CAST(julianday('now') - julianday(COALESCE(
        (SELECT MAX(completed_at) FROM user_progress WHERE user_id = u.id),
        u.created_at
      )) AS INTEGER) IN (3, 7, 14)
    `);

    let sent = 0;
    for (const user of (inactiveUsers || [])) {
      await sendReminderEmail(user.email, user.display_name || user.username, user.days_inactive);
      sent++;
    }

    res.json({ success: true, message: `${sent} reminder emails sent`, users: inactiveUsers?.length || 0 });
  } catch (error) {
    console.error('[EMAIL CRON] Error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
