'use client';

export default function EmptyState({ title = 'Rien à afficher', description = '', type = 'default' }) {
  const illustrations = {
    default: (
      <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="50" y="30" width="100" height="80" rx="8" stroke="#a855f7" strokeWidth="2" fill="rgba(168,85,247,0.05)" />
        <path d="M70 70h60M70 85h40" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
        <circle cx="100" cy="50" r="8" stroke="#a855f7" strokeWidth="2" fill="rgba(168,85,247,0.1)" />
        <path d="M40 120l10-10M150 120l10-10" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="30" cy="40" r="3" fill="#a855f7" opacity="0.3" />
        <circle cx="170" cy="60" r="4" fill="#7c3aed" opacity="0.3" />
        <circle cx="160" cy="30" r="2" fill="#a855f7" opacity="0.4" />
      </svg>
    ),
    courses: (
      <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="60" y="50" width="35" height="50" rx="4" stroke="#a855f7" strokeWidth="2" fill="rgba(168,85,247,0.05)" transform="rotate(-5 60 50)" />
        <rect x="80" y="45" width="35" height="50" rx="4" stroke="#7c3aed" strokeWidth="2" fill="rgba(124,58,237,0.05)" />
        <rect x="100" y="50" width="35" height="50" rx="4" stroke="#a855f7" strokeWidth="2" fill="rgba(168,85,247,0.05)" transform="rotate(5 100 50)" />
        <path d="M85 60h20M85 70h15M85 80h10" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="40" cy="80" r="4" fill="#a855f7" opacity="0.3" />
        <circle cx="165" cy="70" r="3" fill="#7c3aed" opacity="0.3" />
        <path d="M90 120l5-8 5 8" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    search: (
      <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="70" r="30" stroke="#a855f7" strokeWidth="2.5" fill="rgba(168,85,247,0.05)" />
        <path d="M112 92l20 20" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" />
        <path d="M80 65h20M80 75h15" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <circle cx="45" cy="50" r="3" fill="#a855f7" opacity="0.3" />
        <circle cx="155" cy="90" r="4" fill="#7c3aed" opacity="0.3" />
        <path d="M150 40l5 5-5 5" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
    favorites: (
      <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 110l-25-25c-10-10-10-26 0-36s26-10 36 0l-11 11 11-11c10-10 26-10 36 0s10 26 0 36L100 110z" stroke="#a855f7" strokeWidth="2.5" fill="rgba(168,85,247,0.05)" />
        <circle cx="45" cy="70" r="3" fill="#a855f7" opacity="0.3" />
        <circle cx="160" cy="60" r="4" fill="#7c3aed" opacity="0.3" />
        <circle cx="55" cy="110" r="2" fill="#a855f7" opacity="0.4" />
        <circle cx="150" cy="110" r="3" fill="#7c3aed" opacity="0.2" />
      </svg>
    ),
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="mb-6 opacity-80">
        {illustrations[type] || illustrations.default}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-300">{title}</h3>
      {description && <p className="text-gray-500 text-sm max-w-md">{description}</p>}
    </div>
  );
}
