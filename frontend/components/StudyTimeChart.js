'use client';

export default function StudyTimeChart({ weekly = [], totalSeconds = 0 }) {
  const maxSeconds = Math.max(...weekly.map(d => d.seconds || 0), 1);
  const totalHours = Math.round(totalSeconds / 3600 * 10) / 10;

  const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  // Fill last 7 days
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const found = weekly.find(w => w.date === dateStr);
    days.push({ date: dateStr, seconds: found?.seconds || 0, day: dayNames[d.getDay() === 0 ? 6 : d.getDay() - 1] });
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold">⏱️ Temps d'étude</h3>
        <span className="text-xs text-purple-400 font-bold">{totalHours}h total</span>
      </div>
      <div className="flex items-end gap-2 h-24">
        {days.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full bg-border rounded-t relative" style={{ height: `${Math.max((d.seconds / maxSeconds) * 100, 4)}%` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t" style={{ height: `${Math.max((d.seconds / maxSeconds) * 100, 4)}%` }}></div>
            </div>
            <span className="text-xs text-gray-500">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
