'use client';
import { useState } from 'react';

const SYNTAX_COLORS = {
  bash: { keywords: ['if', 'then', 'else', 'fi', 'for', 'do', 'done', 'echo', 'export', 'source', 'cd', 'mkdir', 'rm', 'cp', 'mv'], comment: '#' },
  yaml: { keywords: ['true', 'false', 'null', 'yes', 'no'], comment: '#' },
  groovy: { keywords: ['def', 'pipeline', 'agent', 'stages', 'stage', 'steps', 'script', 'node', 'sh', 'when', 'post', 'environment'], comment: '//' },
  json: { keywords: ['true', 'false', 'null'], comment: null },
};

export default function CodeEditor({ language = 'bash', initialCode = '', placeholder = 'Écrivez votre code ici...' }) {
  const [code, setCode] = useState(initialCode);
  const lines = code.split('\n');
  const lineCount = Math.max(lines.length, 10);

  return (
    <div className="rounded-lg overflow-hidden border border-border bg-gray-950" role="region" aria-label="Éditeur de code">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-border">
        <span className="text-xs text-gray-400 font-mono">{language.toUpperCase()}</span>
        <button onClick={() => navigator.clipboard?.writeText(code)} className="text-xs text-gray-500 hover:text-purple-400 transition-colors" aria-label="Copier le code">
          📋 Copier
        </button>
      </div>
      <div className="flex font-mono text-sm">
        <div className="select-none text-right pr-3 pl-3 py-3 text-gray-600 bg-gray-900/50 border-r border-border min-w-[3rem]" aria-hidden="true">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i} className="leading-6">{i + 1}</div>
          ))}
        </div>
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          className="flex-1 bg-transparent text-green-300 p-3 outline-none resize-none leading-6 min-h-[240px]"
          placeholder={placeholder}
          spellCheck={false}
          aria-label={`Éditeur de code ${language}`}
        />
      </div>
    </div>
  );
}
