'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/courses', label: 'Formations' },
    { href: '/dashboard', label: 'Tableau de bord' },
    { href: '/leaderboard', label: 'Classement' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-md border-b border-border h-[70px]">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-xl font-bold">
          <span className="text-2xl animate-spin-slow">&#9881;</span>
          <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            DevOps Academy
          </span>
        </Link>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          <div className={`w-6 h-0.5 bg-current transition-all ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`w-6 h-0.5 bg-current my-1.5 ${open ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-current transition-all ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>

        <div className={`md:flex items-center gap-4 ${open ? 'absolute top-[70px] left-0 right-0 bg-dark p-6 flex flex-col gap-4 border-b border-border' : 'hidden md:flex'}`}>
          <ul className="flex md:flex-row flex-col items-center gap-2">
            {links.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                    pathname === link.href
                      ? 'text-primary bg-purple-500/10'
                      : 'text-gray-400 hover:text-purple-400 hover:bg-purple-500/5'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {/* Search icon */}
            <Link href="/search" className="p-2 rounded-lg hover:bg-purple-500/10 text-gray-400 hover:text-purple-400 transition-all" title="Rechercher">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-purple-500/10 text-gray-400 hover:text-purple-400 transition-all"
              title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* User section */}
            {!loading && (
              <>
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserMenu(!userMenu)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-purple-500/10 transition-all"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center text-white text-sm font-bold">
                        {user.avatar || user.username?.charAt(0).toUpperCase()}
                      </div>
                      <div className="hidden md:block text-left">
                        <span className="text-sm font-medium block leading-tight">{user.displayName}</span>
                        <span className="text-xs text-purple-400">Niv. {user.level} • {user.xp} XP</span>
                      </div>
                    </button>

                    {userMenu && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-xl overflow-hidden z-50">
                        <Link href="/dashboard" onClick={() => setUserMenu(false)} className="block px-4 py-3 text-sm hover:bg-purple-500/10 transition-all">
                          📊 Tableau de bord
                        </Link>
                        <Link href="/leaderboard" onClick={() => setUserMenu(false)} className="block px-4 py-3 text-sm hover:bg-purple-500/10 transition-all">
                          🏆 Classement
                        </Link>
                        <hr className="border-border" />
                        <button onClick={() => { logout(); setUserMenu(false); }} className="block w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-all">
                          🚪 Déconnexion
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href="/login" className="btn-primary text-sm !px-4 !py-2">
                    Connexion
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
