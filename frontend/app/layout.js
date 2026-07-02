import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'DevOps Academy - Formation Outils',
  description: 'Plateforme de formation DevOps - Artifactory, SonarQube, DOORS, ClearCase, Klocwork, Jenkins',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-[70px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
