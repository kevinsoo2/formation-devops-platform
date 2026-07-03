'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '../../../../contexts/AuthContext';

export default function CertificatePage() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [eligible, setEligible] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    async function load() {
      try {
        const courseRes = await fetch(`${API_URL}/api/courses/${courseId}`);
        const courseData = await courseRes.json();
        if (courseData.data) setCourse(courseData.data);

        if (user) {
          const [modulesRes, progressRes] = await Promise.all([
            fetch(`${API_URL}/api/modules/${courseId}`),
            fetch(`${API_URL}/api/progress/${user.id}`),
          ]);
          const modulesData = await modulesRes.json();
          const progressData = await progressRes.json();

          const courseProgress = progressData.data?.[courseId];
          const totalModules = modulesData.data?.length || 0;
          const completedModules = courseProgress?.completedModules?.length || 0;
          const quizPassed = courseProgress?.quizScores?.some(q => q.passed) || false;

          setEligible(completedModules >= totalModules && quizPassed && totalModules > 0);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [courseId, user, API_URL]);

  if (loading) return <div className="text-center py-20 text-gray-400">Chargement...</div>;

  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl mb-4">Connexion requise</h2>
        <Link href="/login" className="text-purple-400">Se connecter</Link>
      </div>
    );
  }

  if (!eligible) {
    return (
      <div className="text-center py-20">
        <span className="text-4xl block mb-4">🔒</span>
        <h2 className="text-2xl mb-4">Certificat non disponible</h2>
        <p className="text-gray-400 mb-4">Complétez tous les modules et réussissez le quiz (70%+) pour obtenir votre certificat.</p>
        <Link href={`/courses/${courseId}`} className="text-purple-400">&larr; Retour au cours</Link>
      </div>
    );
  }

  const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <Link href={`/courses/${courseId}`} className="text-gray-500 hover:text-purple-400 text-sm">&larr; Retour au cours</Link>
        <button onClick={() => window.print()} className="btn-primary text-sm !px-4 !py-2">
          🖨️ Imprimer / PDF
        </button>
      </div>

      {/* Printable Certificate */}
      <div id="certificate" className="bg-white text-gray-900 rounded-xl p-12 shadow-xl" style={{
        border: '3px solid #6c63ff',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f7ff 100%)',
        minHeight: '600px',
      }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          {/* Header */}
          <div style={{ borderBottom: '2px solid #6c63ff', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(to right, #6c63ff, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem' }}>
              DevOps Academy
            </h1>
            <p style={{ color: '#6b7280', fontSize: '1rem' }}>Certificat de réussite</p>
          </div>

          {/* Body */}
          <div style={{ margin: '2rem 0' }}>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1rem' }}>Ce certificat atteste que</p>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
              {user.displayName}
            </h2>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1.5rem' }}>a complété avec succès la formation</p>
            <div style={{ display: 'inline-block', padding: '1rem 2rem', background: '#f3f0ff', borderRadius: '12px', border: '1px solid #e0d9ff' }}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>{course?.icon}</span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#6c63ff' }}>{course?.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>{course?.subtitle}</p>
            </div>
          </div>

          {/* Footer */}
          <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
            <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>Délivré le {today}</p>
            <p style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.5rem' }}>
              ID: CERT-{courseId?.toUpperCase()}-{user.id?.slice(-6).toUpperCase()}
            </p>
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          #certificate, #certificate * { visibility: visible; }
          #certificate { position: absolute; left: 0; top: 0; width: 100%; }
          nav, footer, .btn-primary { display: none !important; }
        }
      `}</style>
    </div>
  );
}
