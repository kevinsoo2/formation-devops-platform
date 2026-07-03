'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

function useInView(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, ...options });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

function AnimatedStat({ target, suffix = '', label }) {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useInView();

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, target]);

  return (
    <div ref={ref} className="text-center">
      <span className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
        {count}{suffix}
      </span>
      <span className="block text-sm text-gray-500 mt-2">{label}</span>
    </div>
  );
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-purple-500/5 transition-colors"
      >
        <span className="font-medium">{question}</span>
        <span className={`text-purple-400 transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {open && (
        <div className="px-6 pb-4 text-gray-400 text-sm animate-fade-in">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  const [heroRef, heroVisible] = useInView();
  const [statsRef, statsVisible] = useInView();
  const [featuresRef, featuresVisible] = useInView();
  const [coursesRef, coursesVisible] = useInView();
  const [testimonialsRef, testimonialsVisible] = useInView();
  const [faqRef, faqVisible] = useInView();

  const features = [
    { icon: '📚', title: 'Contenu structuré', desc: 'Formations en modules progressifs avec théorie et pratique interactive.' },
    { icon: '🎓', title: 'Quiz interactifs', desc: 'Validez vos connaissances avec scoring et explications détaillées.' },
    { icon: '⚡', title: 'Système XP & Niveaux', desc: 'Gagnez des points d\'expérience et montez en niveau à chaque module.' },
    { icon: '🏆', title: 'Badges & Classement', desc: 'Débloquez des badges et rivalisez avec la communauté.' },
    { icon: '📋', title: 'Cheat Sheets & Flashcards', desc: 'Aide-mémoire imprimables et flashcards pour chaque outil DevOps.' },
    { icon: '💬', title: 'Forum & Communauté', desc: 'Échangez avec les autres apprenants, posez vos questions.' },
  ];

  const featuredCourses = [
    { id: 'docker', icon: '🐳', title: 'Docker', subtitle: 'Conteneurisation', color: '#2496ED' },
    { id: 'kubernetes', icon: '☸️', title: 'Kubernetes', subtitle: 'Orchestration', color: '#326CE5' },
    { id: 'terraform', icon: '🏗️', title: 'Terraform', subtitle: 'Infrastructure as Code', color: '#7B42BC' },
    { id: 'jenkins', icon: '🔧', title: 'Jenkins', subtitle: 'CI/CD', color: '#D24939' },
  ];

  const testimonials = [
    {
      name: 'Julien Moreau',
      role: 'DevOps Engineer chez TechCorp',
      avatar: 'JM',
      text: 'Grâce à DevOps Academy, j\'ai pu monter en compétences sur Kubernetes et Terraform en quelques semaines. Le contenu est clair et les quiz vraiment utiles.',
    },
    {
      name: 'Sophie Laurent',
      role: 'SRE chez CloudScale',
      avatar: 'SL',
      text: 'La plateforme est excellente pour les débutants comme pour les confirmés. J\'ai adoré le système de badges qui motive à progresser chaque jour.',
    },
    {
      name: 'Ahmed Benali',
      role: 'Lead DevOps chez DataFlow',
      avatar: 'AB',
      text: 'Je recommande DevOps Academy à toute mon équipe. Le parcours structuré et les projets pratiques sont exactement ce qu\'il faut pour se former efficacement.',
    },
  ];

  const faqs = [
    { question: 'La plateforme est-elle gratuite ?', answer: 'Oui, toutes les formations sont accessibles gratuitement. Vous pouvez créer un compte pour sauvegarder votre progression, gagner des XP et obtenir des certificats.' },
    { question: 'Ai-je besoin de connaissances préalables ?', answer: 'Non, nos formations commencent par les bases. Chaque cours indique les prérequis. Les parcours débutants ne nécessitent que des connaissances Linux basiques.' },
    { question: 'Comment obtenir un certificat ?', answer: 'Complétez tous les modules d\'un cours puis réussissez le quiz final avec un score d\'au moins 70%. Le certificat est alors disponible au format PDF.' },
    { question: 'Puis-je suivre les cours sur mobile ?', answer: 'Oui, la plateforme est entièrement responsive et fonctionne sur mobile, tablette et desktop. Vous pouvez même l\'installer en tant qu\'application (PWA).' },
    { question: 'Combien de temps durent les formations ?', answer: 'Chaque formation est estimée entre 8 et 16 heures. Vous pouvez les suivre à votre rythme, les modules sont sauvegardés automatiquement.' },
    { question: 'Y a-t-il un forum d\'entraide ?', answer: 'Oui ! Un forum est disponible pour poser vos questions, partager vos solutions et échanger avec la communauté d\'apprenants.' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-[calc(100vh-70px)] flex items-center justify-center px-6 relative"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(168,85,247,0.15)_0%,transparent_60%)]" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-700/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-purple-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-500 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1.5s' }} />
          <div className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-purple-300 rounded-full opacity-10 animate-bounce" style={{ animationDelay: '2s' }} />
        </div>

        <div className={`relative text-center max-w-4xl transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm font-medium mb-6">
            🚀 Plateforme de formation DevOps gratuite
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            Maîtrisez les outils<br />
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              DevOps &amp; Cloud
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Docker, Kubernetes, Terraform, Ansible, Jenkins, GitLab CI et plus encore.
            Apprenez par la pratique, gagnez des XP, débloquez des badges et obtenez vos certificats.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/courses" className="btn-primary text-lg px-8 py-4">
              Commencer gratuitement
            </Link>
            <Link href="/paths" className="btn-secondary text-lg px-8 py-4">
              Voir les parcours
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className={`max-w-5xl mx-auto px-6 py-20 transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <AnimatedStat target={15} label="Formations" />
          <AnimatedStat target={46} label="Modules" />
          <AnimatedStat target={244} label="Termes glossaire" />
          <AnimatedStat target={1000} suffix="+" label="Exercices" />
        </div>
      </section>

      {/* Features Grid */}
      <section ref={featuresRef} className={`max-w-7xl mx-auto px-6 py-20 transition-all duration-700 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pourquoi DevOps Academy ?</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Une plateforme complète pour apprendre les outils DevOps modernes</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="card hover:border-purple-500 transition-all group">
              <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform">{f.icon}</span>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section ref={coursesRef} className={`max-w-7xl mx-auto px-6 py-20 transition-all duration-700 ${coursesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Formations populaires</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Commencez avec nos cours les plus suivis</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`} className="card group text-center">
              <span className="text-5xl block mb-4 group-hover:scale-110 transition-transform">{course.icon}</span>
              <h3 className="font-bold text-lg mb-1">{course.title}</h3>
              <p className="text-sm text-gray-400">{course.subtitle}</p>
              <div className="mt-4 text-xs text-purple-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Voir le cours →
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/courses" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
            Voir les 15 formations →
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className={`max-w-7xl mx-auto px-6 py-20 transition-all duration-700 ${testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce qu&apos;en disent nos apprenants</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Des professionnels DevOps qui ont progressé avec notre plateforme</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center text-white text-sm font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-medium text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-4 text-yellow-400 text-sm">★★★★★</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqRef} className={`max-w-3xl mx-auto px-6 py-20 transition-all duration-700 ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Questions fréquentes</h2>
          <p className="text-gray-400">Tout ce que vous devez savoir avant de commencer</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center py-24 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(168,85,247,0.1)_0%,transparent_60%)]" />
        <div className="relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à devenir un expert DevOps ?</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">Rejoignez des centaines d&apos;apprenants et commencez votre parcours dès maintenant.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/register" className="btn-primary text-lg px-10 py-4">
              Créer un compte gratuit
            </Link>
            <Link href="/courses" className="btn-secondary text-lg px-10 py-4">
              Explorer les formations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
