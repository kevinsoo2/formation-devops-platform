import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL || 'DevOps Academy <onboarding@resend.dev>';

// Email de bienvenue
export async function sendWelcomeEmail(userEmail, displayName) {
  try {
    if (!process.env.RESEND_API_KEY) return;
    
    await resend.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: '🎉 Bienvenue sur DevOps Academy !',
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f23; color: #e8e8e8; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #a855f7, #7c3aed); padding: 40px 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; color: white;">🚀 Bienvenue, ${displayName} !</h1>
            <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Votre aventure DevOps commence maintenant</p>
          </div>
          <div style="padding: 30px;">
            <p style="font-size: 16px; line-height: 1.6;">Félicitations ! Vous avez rejoint <strong>DevOps Academy</strong>, la plateforme de formation aux outils DevOps.</p>
            
            <h2 style="color: #a855f7; font-size: 18px; margin-top: 25px;">📚 Ce qui vous attend :</h2>
            <ul style="line-height: 2; font-size: 15px;">
              <li><strong>19 formations</strong> complètes (Docker, Kubernetes, Terraform, Jenkins...)</li>
              <li><strong>54+ modules</strong> avec théorie et exercices pratiques</li>
              <li><strong>Quiz interactifs</strong> pour valider vos connaissances</li>
              <li><strong>Système XP et badges</strong> pour rester motivé</li>
              <li><strong>Certificats</strong> à partager sur LinkedIn</li>
            </ul>

            <h2 style="color: #a855f7; font-size: 18px; margin-top: 25px;">🎯 Par où commencer ?</h2>
            <p style="font-size: 15px; line-height: 1.6;">Nous vous recommandons de commencer par le <strong>Parcours DevOps Complet</strong> (8 semaines) ou de choisir un outil qui vous intéresse.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://formation-devops-platform-nrfu.vercel.app/courses" style="background: linear-gradient(135deg, #a855f7, #7c3aed); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">Commencer les formations →</a>
            </div>

            <p style="font-size: 14px; color: #9ca3af; margin-top: 30px;">Bonne formation !<br>L'équipe DevOps Academy</p>
          </div>
          <div style="background: #1a1a2e; padding: 20px 30px; text-align: center; font-size: 12px; color: #6b7280;">
            <p>DevOps Academy - Plateforme de formation aux outils DevOps</p>
          </div>
        </div>
      `,
    });
    console.log(`[EMAIL] Welcome email sent to ${userEmail}`);
  } catch (error) {
    console.error('[EMAIL] Error sending welcome email:', error.message);
  }
}

// Email de rappel (inactivité)
export async function sendReminderEmail(userEmail, displayName, daysSinceLastActivity) {
  try {
    if (!process.env.RESEND_API_KEY) return;
    
    await resend.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: `🔥 ${displayName}, ne perdez pas votre streak !`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f23; color: #e8e8e8; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #f97316, #ea580c); padding: 40px 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; color: white;">🔥 On vous attend !</h1>
            <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9);">${daysSinceLastActivity} jours sans activité</p>
          </div>
          <div style="padding: 30px;">
            <p style="font-size: 16px; line-height: 1.6;">Bonjour <strong>${displayName}</strong>,</p>
            <p style="font-size: 15px; line-height: 1.6;">Cela fait <strong>${daysSinceLastActivity} jours</strong> que vous n'avez pas étudié sur DevOps Academy. Ne laissez pas votre progression s'arrêter !</p>
            
            <div style="background: #1a1a2e; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #a855f7;">
              <p style="margin: 0; font-size: 15px;">💡 <strong>Saviez-vous ?</strong> 15 minutes par jour suffisent pour progresser significativement en DevOps.</p>
            </div>

            <h2 style="color: #a855f7; font-size: 18px;">📊 Votre progression vous attend :</h2>
            <ul style="line-height: 2; font-size: 15px;">
              <li>Continuez là où vous vous êtes arrêté</li>
              <li>Gagnez +50 XP par module complété</li>
              <li>Relevez le défi hebdomadaire</li>
              <li>Maintenez votre streak 🔥</li>
            </ul>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://formation-devops-platform-nrfu.vercel.app/dashboard" style="background: linear-gradient(135deg, #a855f7, #7c3aed); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">Reprendre ma formation →</a>
            </div>

            <p style="font-size: 14px; color: #9ca3af;">À très bientôt !<br>L'équipe DevOps Academy</p>
          </div>
          <div style="background: #1a1a2e; padding: 20px 30px; text-align: center; font-size: 12px; color: #6b7280;">
            <p>Vous recevez cet email car vous êtes inscrit sur DevOps Academy.<br>
            <a href="https://formation-devops-platform-nrfu.vercel.app/settings" style="color: #a855f7;">Gérer mes notifications</a></p>
          </div>
        </div>
      `,
    });
    console.log(`[EMAIL] Reminder email sent to ${userEmail} (${daysSinceLastActivity} days inactive)`);
  } catch (error) {
    console.error('[EMAIL] Error sending reminder email:', error.message);
  }
}

// Email de félicitations (cours terminé)
export async function sendCourseCompletedEmail(userEmail, displayName, courseName) {
  try {
    if (!process.env.RESEND_API_KEY) return;
    
    await resend.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: `🏆 Félicitations ! Vous avez terminé "${courseName}" !`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f23; color: #e8e8e8; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 40px 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; color: white;">🏆 Bravo, ${displayName} !</h1>
            <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 18px;">Vous avez terminé "${courseName}"</p>
          </div>
          <div style="padding: 30px;">
            <p style="font-size: 16px; line-height: 1.6;">Félicitations ! Vous avez complété tous les modules et réussi le quiz de la formation <strong>${courseName}</strong>.</p>
            
            <div style="text-align: center; margin: 25px 0;">
              <div style="display: inline-block; background: linear-gradient(135deg, #fbbf24, #f59e0b); border-radius: 50%; width: 80px; height: 80px; line-height: 80px; font-size: 40px;">🎓</div>
            </div>

            <h2 style="color: #10b981; font-size: 18px; text-align: center;">Votre certificat est disponible !</h2>
            <p style="font-size: 15px; line-height: 1.6; text-align: center;">Téléchargez-le et partagez-le sur LinkedIn pour montrer vos compétences.</p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://formation-devops-platform-nrfu.vercel.app/courses" style="background: linear-gradient(135deg, #a855f7, #7c3aed); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">Voir mon certificat →</a>
            </div>

            <p style="font-size: 15px; line-height: 1.6;">Continuez sur votre lancée ! Nous vous recommandons la formation suivante pour approfondir vos compétences.</p>

            <p style="font-size: 14px; color: #9ca3af; margin-top: 30px;">L'équipe DevOps Academy</p>
          </div>
          <div style="background: #1a1a2e; padding: 20px 30px; text-align: center; font-size: 12px; color: #6b7280;">
            <p>DevOps Academy - Formez-vous aux outils DevOps</p>
          </div>
        </div>
      `,
    });
    console.log(`[EMAIL] Course completed email sent to ${userEmail} for ${courseName}`);
  } catch (error) {
    console.error('[EMAIL] Error sending course completed email:', error.message);
  }
}
