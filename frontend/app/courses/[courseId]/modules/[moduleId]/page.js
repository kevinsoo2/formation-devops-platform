'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ModulePage() {
  const { courseId, moduleId } = useParams();
  const [mod, setMod] = useState(null);
  const [tab, setTab] = useState('theory');
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    fetch(`${API_URL}/api/modules/${courseId}/${moduleId}`)
      .then(r => r.json())
      .then(d => { setMod(d.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [courseId, moduleId, API_URL]);

  if (loading) return <div className="text-center py-20 text-gray-400">Chargement...</div>;
  if (!mod) return <div className="text-center py-20"><h2>Module non trouvé</h2></div>;

  const renderContent = (text) => {
    return text
      .replace(/```(\w+)?\n?([\s\S]*?)```/g, '<pre class="bg-dark border border-border rounded-lg p-4 my-4 overflow-x-auto text-sm"><code>$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded text-sm">$1</code>')
      .replace(/### (.*)/g, '<h3 class="text-lg font-semibold text-purple-400 mt-6 mb-2">$1</h3>')
      .replace(/## (.*)/g, '<h2 class="text-xl font-bold mt-8 mb-3">$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/- (.*)/g, '<li class="ml-4 text-gray-400 mb-1">• $1</li>')
      .replace(/(\d+)\. (.*)/g, '<li class="ml-4 text-gray-400 mb-1">$1. $2</li>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Link href={`/courses/${courseId}`} className="text-gray-500 hover:text-purple-400 text-sm mb-6 inline-block">&larr; Retour au cours</Link>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center font-bold">{mod.orderIndex}</div>
        <div>
          <h1 className="text-2xl font-bold">{mod.title}</h1>
          <span className="text-gray-500 text-sm">&#9200; {mod.duration}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border pb-2">
        {[['theory', '📖 Théorie'], ['practice', '💻 Pratique'], ['keypoints', '💡 Points clés']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === key ? 'bg-purple-500/10 text-purple-400' : 'text-gray-500 hover:text-white'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="card min-h-[400px]">
        {tab === 'theory' && <div dangerouslySetInnerHTML={{ __html: renderContent(mod.theoryContent) }} />}
        {tab === 'practice' && <div dangerouslySetInnerHTML={{ __html: renderContent(mod.practiceContent) }} />}
        {tab === 'keypoints' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Points clés à retenir</h2>
            <ul className="space-y-3">
              {mod.keyPoints?.map((point, i) => (
                <li key={i} className="flex items-center gap-3 p-4 bg-surface border border-border rounded-lg">
                  <span className="text-lg">🔑</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
