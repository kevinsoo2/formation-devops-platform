export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-3">
            DevOps Academy
          </h3>
          <p className="text-gray-400 text-sm">Plateforme de formation aux outils DevOps et d&apos;ingénierie logicielle.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Formations</h4>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>Artifactory</li><li>SonarQube</li><li>IBM DOORS</li>
            <li>IBM ClearCase</li><li>Klocwork</li><li>Jenkins</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Stack</h4>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>Frontend: Next.js sur Vercel</li>
            <li>Backend: Express sur Render</li>
            <li>Database: Turso (libSQL)</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-border text-center text-gray-500 text-sm">
        &copy; 2024 DevOps Academy. Déployé sur Vercel + Render + Turso.
      </div>
    </footer>
  );
}
