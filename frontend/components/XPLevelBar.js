'use client';
import { useAuth } from '../contexts/AuthContext';

export default function XPLevelBar() {
  const { user } = useAuth();
  if (!user) return null;

  const xpForNextLevel = 500;
  const currentXPInLevel = user.xp % xpForNextLevel;
  const percent = (currentXPInLevel / xpForNextLevel) * 100;

  return (
    <div className="flex items-center gap-2 px-3 py-1">
      <span className="text-xs font-bold text-purple-400">Niv. {user.level}</span>
      <div className="w-20 h-2 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs text-gray-500">{currentXPInLevel}/{xpForNextLevel}</span>
    </div>
  );
}
