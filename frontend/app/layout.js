import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Providers } from '../components/Providers';
import KeyboardShortcuts from '../components/KeyboardShortcuts';

export const metadata = {
  title: 'DevOps Academy - Formation Outils',
  description: 'Plateforme de formation DevOps - Docker, Kubernetes, Terraform, Ansible, Jenkins, GitLab CI',
  manifest: '/manifest.json',
  themeColor: '#a855f7',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'DevOps Academy' },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
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
          <KeyboardShortcuts />
          <Navbar />
          <main className="flex-1 pt-[70px]">{children}</main>
          <Footer />
        </Providers>
        <script dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js')});}` }} />
      </body>
    </html>
  );
}
