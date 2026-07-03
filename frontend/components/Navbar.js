'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLang } from '../contexts/LanguageContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [streak, setStreak] = useState(0);
  const [unreadNotifs, setUnreadNotifs] = useState(0);
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLang();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    if (!user) return;
    fetch(`${API_URL}/api/streaks/${user.id}`).then(r => r.json()).then(d => {
      if (d.data) setStreak(d.data.current_streak || d.data.currentStreak || 0);
    }).catch(() => {});
    fetch(`${API_URL}/api/notifications/${user.id}`).then(r => r.json()).then(d => {
      if (d.data) setUnreadNotifs(d.data.filter(n => !n.read).length);
    }).catch(() => {});
  }, [user, API_URL]);

  const links = [
    { href: '/', label: t('nav.home') },
    { href: '/courses', label: t('nav.courses') },
    { href: '/dashboard', label: t('nav.dashboard') },
    { href: '/flashcards', label: '🃏 Flashcards' },
    { href: '/leaderboard', label: t('nav.leaderboard') },
    { href: '/glossary', label: t('nav.glossary') },
    { href: '/forum', label: t('nav.forum') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-md border-b border-border h-[70px]" role="navigation" aria-label="Navigation principale">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-xl font-bold" aria-label="DevOps Academy - Accueil">
          <span className="text-2xl">&#9881;</span>
          <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            DevOps Academy
          </span>
        </Link>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu mobile" aria-expanded={open}>
          <div className={`w-6 h-0.5 bg-current transition-all ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`w-6 h-0.5 bg-current my-1.5 ${open ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-current transition-all ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>

        <div className={`md:flex items-center gap-4 ${open ? 'absolute top-[70px] left-0 right-0 bg-dark p-6 flex flex-col gap-4 border-b border-border' : 'hidden md:flex'}`}>
          <ul className="flex md:flex-row flex-col items-center gap-1">
            {links.map(link => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)}
                  className={`px-3 py-2 rounded-lg font-medium transition-all text-sm ${pathname === link.href ? 'text-primary bg-purple-500/10' : 'text-gray-400 hover:text-purple-400 hover:bg-purple-500/5'}`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {/* Streak */}
            {user && streak > 0 && (
              <span className="text-sm font-bold text-orange-400 flex items-center gap-1" title={`Streak: ${streak} jours`}>
                🔥 {streak}
              </span>
            )}

            {/* Notifications */}
            {user && (
              <Link href="/dashboard" className="relative p-2 rounded-lg hover:bg-purple-500/10 text-gray-400 hover:text-purple-400" aria-label={`Notifications ${unreadNotifs > 0 ? `(${unreadNotifs} non lues)` : ''}`}>
                🔔
                {unreadNotifs > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{unreadNotifs}</span>
                )}
              </Link>
            )}

            {/* Search */}
            <Link href="/search" className="p-2 rounded-lg hover:bg-purple-500/10 text-gray-400 hover:text-purple-400 transition-all" title={t('common.search')} aria-label={t('common.search')}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </Link>

            {/* Language toggle */}
            <button onClick={toggleLang} className="p-2 rounded-lg hover:bg-purple-500/10 text-gray-400 hover:text-purple-400 transition-all text-sm" title="Changer de langue" aria-label={`Langue: ${lang === 'fr' ? 'Français' : 'English'}`}>
              {lang === 'fr' ? '🇫🇷' : '🇬🇧'}
            </button>

            {/* Theme toggle */}
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-purple-500/10 text-gray-400 hover:text-purple-400 transition-all" title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'} aria-label={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* User section */}
            {!loading && (
              <>
                {user ? (
                  <div className="relative">
                    <button onClick={() => setUserMenu(!userMenu)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-purple-500/10 transition-all" aria-expanded={userMenu} aria-label="Menu utilisateur">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center text-white text-sm font-bold">
                        {user.avatar || user.username?.charAt(0).toUpperCase()}
                      </div>
                      <div className="hidden md:block text-left">
                        <span className="text-sm font-medium block leading-tight">{user.displayName}</span>
                        <span className="text-xs text-purple-400">Niv. {user.level} • {user.xp} XP</span>
                      </div>
                    </button>
                    {userMenu && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-xl overflow-hidden z-50" role="menu">
                        <Link href="/dashboard" onClick={() => setUserMenu(false)} className="block px-4 py-3 text-sm hover:bg-purple-500/10" role="menuitem">📊 {t('nav.dashboard')}</Link>
                        <Link href={`/profile/${user.id}`} onClick={() => setUserMenu(false)} className="block px-4 py-3 text-sm hover:bg-purple-500/10" role="menuitem">👤 {t('common.profile')}</Link>
                        <Link href="/favorites" onClick={() => setUserMenu(false)} className="block px-4 py-3 text-sm hover:bg-purple-500/10" role="menuitem">❤️ {t('nav.favorites')}</Link>
                        {user.role === 'admin' && <Link href="/admin" onClick={() => setUserMenu(false)} className="block px-4 py-3 text-sm hover:bg-purple-500/10" role="menuitem">⚙️ Admin</Link>}
                        <hr className="border-border" />
                        <button onClick={() => { logout(); setUserMenu(false); }} className="block w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10" role="menuitem">🚪 {t('auth.logout')}</button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href="/login" className="btn-primary text-sm !px-4 !py-2">{t('auth.login')}</Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
