import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Flag, Target, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  
  return (
    <div className="animate-fade-in">
      <div className="glass glass-panel mb-4" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Moin, {user?.email?.split('@')[0]}!
        </h1>
        <p className="text-muted" style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Bereit, dein Deutsch zu verbessern? Wähle eine Kategorie oder mach dort weiter, wo du aufgehört hast.
        </p>
        <Link to="/categories" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>
          <Zap size={24} />
          Jetzt starten
        </Link>
      </div>

      <div className="grid grid-cols-3">
        <div className="glass glass-panel card" style={{ padding: '2rem', textAlign: 'center' }}>
          <BookOpen size={40} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
          <h3>Wortschatz</h3>
          <p className="text-muted mt-1">Lerne Wörter aus über 10 Premium-Kategorien wie Schule, Arbeit und Küche.</p>
        </div>
        
        <div className="glass glass-panel card" style={{ padding: '2rem', textAlign: 'center' }}>
          <Target size={40} color="var(--secondary)" style={{ margin: '0 auto 1rem' }} />
          <h3>Interaktiv</h3>
          <p className="text-muted mt-1">Lerne mit Flashcards inkl. deutscher Aussprache, Lückentexten und Zuordnungsspielen.</p>
        </div>
        
        <div className="glass glass-panel card" style={{ padding: '2rem', textAlign: 'center' }}>
          <Flag size={40} color="#F59E0B" style={{ margin: '0 auto 1rem' }} />
          <h3>Eigene Listen</h3>
          <p className="text-muted mt-1">Füge mühelos eigene Kategorien und Vokabeln hinzu, um individuell zu lernen.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
