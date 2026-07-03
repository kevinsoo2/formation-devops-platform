'use client';
import { useState, useRef, useEffect } from 'react';

const FAQ_DATA = [
  { q: "Comment s'inscrire ?", a: "Cliquez sur Connexion puis Créer un compte. Remplissez le formulaire avec votre email, nom d'utilisateur et mot de passe. C'est gratuit et instantané !" },
  { q: "Comment gagner des XP ?", a: "Complétez des modules (+50 XP), réussissez des quiz (+100 XP), maintenez votre streak quotidienne (+10 XP/jour), et relevez les défis hebdomadaires pour des bonus supplémentaires !" },
  { q: "Comment obtenir un certificat ?", a: "Terminez tous les modules d'un cours et réussissez le quiz final avec au moins 70% de bonnes réponses. Le certificat sera alors disponible sur la page du cours." },
  { q: "Quels cours sont disponibles ?", a: "Nous proposons 19 formations : Docker, Kubernetes, Terraform, Ansible, Jenkins, GitLab CI, Git, GitHub Actions, Prometheus, Grafana, Linux, Nginx, AWS, Azure, GCP, ArgoCD, Helm, Vault et Istio." },
  { q: "Comment fonctionne le leaderboard ?", a: "Le classement est basé sur les XP gagnés. Chaque action (module complété, quiz réussi, streak) vous rapporte des XP qui vous font monter dans le classement global." },
  { q: "J'ai un problème technique", a: "Rechargez la page ou videz le cache de votre navigateur. Si le problème persiste, postez un message dans le forum et notre équipe vous aidera rapidement." },
  { q: "Comment changer mon mot de passe ?", a: "Allez dans Paramètres > Sécurité depuis votre profil. Vous pourrez y modifier votre mot de passe et vos informations personnelles." },
  { q: "Les formations sont-elles gratuites ?", a: "Oui, toutes les formations sont 100% gratuites ! Notre objectif est de rendre l'apprentissage DevOps accessible à tous." },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Bonjour ! 👋 Je suis l'assistant DevOps Academy. Posez-moi une question ou choisissez un sujet ci-dessous." }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleQuestion = (faq) => {
    setMessages(prev => [...prev, { role: 'user', text: faq.q }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'bot', text: faq.a }]);
    }, 1200);
  };

  const handleUserInput = (e) => {
    e.preventDefault();
    const input = e.target.elements.msg.value.trim();
    if (!input) return;
    e.target.reset();
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setIsTyping(true);

    const normalizedInput = input.toLowerCase();
    const match = FAQ_DATA.find(faq =>
      faq.q.toLowerCase().includes(normalizedInput) ||
      normalizedInput.includes(faq.q.toLowerCase().split(' ').slice(1).join(' '))
    );

    setTimeout(() => {
      setIsTyping(false);
      if (match) {
        setMessages(prev => [...prev, { role: 'bot', text: match.a }]);
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: "Je ne suis pas sûr de comprendre votre question. Voici les sujets sur lesquels je peux vous aider. Choisissez-en un ci-dessous ! 👇" }]);
      }
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-transform hover:scale-110"
        aria-label="Ouvrir le chatbot"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[500px] bg-gray-900 border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-purple-600 px-4 py-3 flex items-center gap-2">
            <span className="text-lg">🤖</span>
            <div>
              <p className="text-white font-bold text-sm">Assistant DevOps Academy</p>
              <p className="text-purple-200 text-xs">En ligne • Réponse instantanée</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${msg.role === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-200'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 px-3 py-2 rounded-xl text-sm text-gray-400">
                  <span className="inline-flex gap-1">
                    <span className="animate-bounce" style={{ animationDelay: '0ms' }}>●</span>
                    <span className="animate-bounce" style={{ animationDelay: '150ms' }}>●</span>
                    <span className="animate-bounce" style={{ animationDelay: '300ms' }}>●</span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="px-3 py-2 border-t border-border overflow-x-auto">
            <div className="flex gap-2 flex-wrap">
              {FAQ_DATA.slice(0, 4).map((faq, i) => (
                <button key={i} onClick={() => handleQuestion(faq)} className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-2 py-1 rounded-full whitespace-nowrap transition">
                  {faq.q.slice(0, 25)}...
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleUserInput} className="p-3 border-t border-border flex gap-2">
            <input
              name="msg"
              type="text"
              placeholder="Posez votre question..."
              className="flex-1 bg-gray-800 border border-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
            <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm">
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}
