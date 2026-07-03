'use client';

export default function Logo({ size = 40, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="DevOps Academy Logo"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="logoGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      {/* Hexagon */}
      <polygon
        points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5"
        fill="url(#logoGradient)"
        stroke="url(#logoGradientLight)"
        strokeWidth="2"
      />
      {/* Letter D */}
      <path
        d="M28 35h10c8 0 14 6 14 14s-6 14-14 14H28V35zm6 5v18h4c5 0 8-4 8-9s-3-9-8-9h-4z"
        fill="white"
      />
      {/* Letter A */}
      <path
        d="M56 63l10-28h6l10 28h-6l-2-6H64l-2 6h-6zm10-11h8l-4-12-4 12z"
        fill="white"
      />
    </svg>
  );
}
