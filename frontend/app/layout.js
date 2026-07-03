import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Providers } from '../components/Providers';
import KeyboardShortcuts from '../components/KeyboardShortcuts';
import ScrollProgress from '../components/ScrollProgress';
import ErrorBoundary from '../components/ErrorBoundary';
import Chatbot from '../components/Chatbot';
import LoadingScreen from '../components/LoadingScreen';
import EasterEgg from '../components/EasterEgg';

export const metadata = {
  title: 'DevOps Academy - Formation Outils',
  description: 'Plateforme de formation DevOps - Docker, Kubernetes, Terraform, Ansible, Jenkins, GitLab CI. Gagnez des XP, débloquez des badges et grimpez dans le classement !',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'DevOps Academy' },
  openGraph: {
    title: 'DevOps Academy - Formation Outils DevOps',
    description: 'Plateforme de formation complète : Docker, Kubernetes, Terraform, Ansible, Jenkins, GitLab CI. 15 formations, quiz interactifs, XP et badges.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'DevOps Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevOps Academy - Formation DevOps',
    description: 'Maîtrisez les outils DevOps avec des formations interactives. Quiz, XP, badges et classement.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#a855f7',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#a855f7" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <LoadingScreen />
          <ScrollProgress />
          <KeyboardShortcuts />
          <EasterEgg />
          <Navbar />
          <main className="flex-1 pt-[70px] animate-fade-in"><ErrorBoundary>{children}</ErrorBoundary></main>
          <Footer />
          <Chatbot />
        </Providers>
        <script dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js')});}` }} />
      </body>
    </html>
  );
}
