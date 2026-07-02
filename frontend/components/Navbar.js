'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/courses', label: 'Formations' },
    { href: '/dashboard', label: 'Tableau de bord' },
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
          <div className={`w-6 h-0.5 bg-white transition-all ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`w-6 h-0.5 bg-white my-1.5 ${open ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>

        <ul className={`md:flex items-center gap-6 ${open ? 'absolute top-[70px] left-0 right-0 bg-dark p-6 flex flex-col gap-4 border-b border-border' : 'hidden md:flex'}`}>
          {links.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  pathname === link.href 
                    ? 'text-primary bg-purple-500/10' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
