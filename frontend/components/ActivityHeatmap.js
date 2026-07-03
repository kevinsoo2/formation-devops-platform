'use client';

export default function ActivityHeatmap({ data = [] }) {
  // Generate last 90 days
  const days = [];
  const today = new Date();
  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }

  const activityMap = {};
  data.forEach(d => { activityMap[d.date] = d.activity_count; });

  function getIntensity(count) {
    if (!count || count === 0) return 'bg-gray-800';
    if (count === 1) return 'bg-green-900';
    if (count === 2) return 'bg-green-700';
    if (count === 3) return 'bg-green-500';
    return 'bg-green-400';
  }

  return (
    <div className="card" role="img" aria-label="Heatmap d'activité des 90 derniers jours">
      <h3 className="text-sm font-semibold mb-3">📊 Activité (90 jours)</h3>
      <div className="grid grid-cols-[repeat(13,1fr)] gap-1">
        {days.map(day => (
          <div
            key={day}
            className={`w-3 h-3 rounded-sm ${getIntensity(activityMap[day])} transition-colors`}
            title={`${day}: ${activityMap[day] || 0} activités`}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
        <span>Moins</span>
        <div className="w-3 h-3 rounded-sm bg-gray-800"></div>
        <div className="w-3 h-3 rounded-sm bg-green-900"></div>
        <div className="w-3 h-3 rounded-sm bg-green-700"></div>
        <div className="w-3 h-3 rounded-sm bg-green-500"></div>
        <div className="w-3 h-3 rounded-sm bg-green-400"></div>
        <span>Plus</span>
      </div>
    </div>
  );
}
