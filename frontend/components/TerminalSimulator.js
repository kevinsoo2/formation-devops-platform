'use client';
import { useState, useRef, useEffect } from 'react';

const EXERCISES = {
  'jenkins': [
    { prompt: 'Démarrez Jenkins en standalone:', expected: 'java -jar jenkins.war', output: 'Jenkins is fully up and running on http://localhost:8080' },
    { prompt: 'Listez les plugins installés:', expected: 'jenkins-cli list-plugins', output: 'git:4.11.3\npipeline-model:2.2\ncredentials:2.6.1' },
  ],
  'docker': [
    { prompt: 'Lancez un container nginx en mode détaché:', expected: 'docker run -d nginx', output: 'a1b2c3d4e5f6...\nContainer started successfully.' },
    { prompt: 'Listez les containers actifs:', expected: 'docker ps', output: 'CONTAINER ID  IMAGE  STATUS       PORTS    NAMES\na1b2c3d4e5f6  nginx  Up 2 minutes  80/tcp  hopeful_tesla' },
    { prompt: 'Construisez une image depuis le Dockerfile:', expected: 'docker build -t myapp .', output: 'Step 1/5 : FROM node:18-alpine\nStep 2/5 : WORKDIR /app\n...\nSuccessfully built abc123\nSuccessfully tagged myapp:latest' },
  ],
  'kubernetes': [
    { prompt: 'Listez les pods du namespace courant:', expected: 'kubectl get pods', output: 'NAME                     READY   STATUS    RESTARTS   AGE\nnginx-7d4ff5c6b-x2k9l   1/1     Running   0          5m' },
    { prompt: 'Appliquez un fichier de configuration:', expected: 'kubectl apply -f deployment.yaml', output: 'deployment.apps/nginx created' },
  ],
  'terraform': [
    { prompt: 'Initialisez le projet Terraform:', expected: 'terraform init', output: 'Initializing the backend...\nInitializing provider plugins...\nTerraform has been successfully initialized!' },
    { prompt: 'Affichez le plan d\'exécution:', expected: 'terraform plan', output: 'Plan: 2 to add, 0 to change, 0 to destroy.' },
  ],
  'ansible': [
    { prompt: 'Testez la connectivité avec tous les hôtes:', expected: 'ansible all -m ping', output: 'web1 | SUCCESS => {"ping": "pong"}\nweb2 | SUCCESS => {"ping": "pong"}' },
    { prompt: 'Exécutez un playbook:', expected: 'ansible-playbook site.yml', output: 'PLAY [Configure servers] ***\nTASK [Install packages] ***\nok: [web1]\nok: [web2]\nPLAY RECAP: ok=2 changed=0' },
  ],
};

export default function TerminalSimulator({ courseId }) {
  const exercises = EXERCISES[courseId] || EXERCISES['docker'];
  const [currentEx, setCurrentEx] = useState(0);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [currentEx]);

  function handleSubmit(e) {
    e.preventDefault();
    const cmd = input.trim();
    const exercise = exercises[currentEx];
    const isCorrect = cmd.toLowerCase() === exercise.expected.toLowerCase();
    const newEntry = { cmd, correct: isCorrect, output: isCorrect ? exercise.output : `bash: commande incorrecte. Essayez encore.` };
    setHistory([...history, newEntry]);
    setInput('');
    if (isCorrect) {
      setSuccess(true);
      setTimeout(() => {
        if (currentEx < exercises.length - 1) {
          setCurrentEx(currentEx + 1);
          setSuccess(false);
        }
      }, 1500);
    }
  }

  return (
    <div className="bg-gray-950 border border-green-900/50 rounded-lg overflow-hidden font-mono text-sm" role="region" aria-label="Terminal simulé">
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-b border-green-900/30">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-gray-400 text-xs">Terminal Simulé - {courseId}</span>
      </div>
      <div className="p-4 max-h-80 overflow-y-auto">
        <p className="text-green-400 mb-2">💡 {exercises[currentEx]?.prompt}</p>
        {history.map((entry, i) => (
          <div key={i} className="mb-2">
            <div className="flex items-center gap-2">
              <span className="text-green-500">$</span>
              <span className="text-white">{entry.cmd}</span>
              {entry.correct ? <span className="text-green-400">✓</span> : <span className="text-red-400">✗</span>}
            </div>
            <pre className={`ml-4 text-xs whitespace-pre-wrap ${entry.correct ? 'text-gray-300' : 'text-red-300'}`}>{entry.output}</pre>
          </div>
        ))}
        {success && <p className="text-green-400 animate-pulse">✅ Correct ! Bien joué !</p>}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
          <span className="text-green-500">$</span>
          <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} className="flex-1 bg-transparent text-white outline-none" placeholder="Tapez votre commande..." aria-label="Commande terminal" />
        </form>
      </div>
      <div className="px-4 py-2 border-t border-green-900/30 text-xs text-gray-500">
        Exercice {currentEx + 1}/{exercises.length}
      </div>
    </div>
  );
}
