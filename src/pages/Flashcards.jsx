import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Volume2, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Flashcards = () => {
  const { categoryId } = useParams();
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchWords = async () => {
      const { data } = await supabase
        .from('vocabulary')
        .select('*')
        .eq('category_id', categoryId);
      
      // Shuffle words (Fisher-Yates)
      const shuffled = (data || []).sort(() => Math.random() - 0.5);
      setWords(shuffled);
      setLoading(false);
    };
    fetchWords();
  }, [categoryId]);

  const playAudio = (text, e) => {
    if (e) e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // kill active speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      window.speechSynthesis.speak(utterance);
    }
  };

  const markAsLearned = async () => {
    if (!words[currentIndex]) return;
    try {
      // Upsert progress
      await supabase.from('user_vocabulary').upsert({
        user_id: user.id,
        vocabulary_id: words[currentIndex].id,
        last_reviewed: new Date().toISOString()
      }, { onConflict: 'user_id,vocabulary_id' });
    } catch (e) {
      console.error('Error tracking progress', e);
    }
    handleNext();
  };

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((prev) => Math.min(prev + 1, words.length - 1)), 250);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((prev) => Math.max(prev - 1, 0)), 250);
  };

  if (loading) return <div>Laden...</div>;

  if (words.length === 0) {
    return (
      <div className="glass glass-panel text-center">
        <h2>Keine Vokabeln gefunden</h2>
        <Link to={`/learn/${categoryId}`} className="btn btn-secondary mt-2 text-muted">Zurück</Link>
      </div>
    );
  }

  const currentWord = words[currentIndex];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Link to={`/learn/${categoryId}`} className="text-muted" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        &larr; Zurück
      </Link>
      
      <div className="text-center mb-2 text-muted">
        Karte {currentIndex + 1} von {words.length}
      </div>

      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          perspective: '1000px',
          width: '100%',
          height: '350px',
          cursor: 'pointer',
          marginBottom: '2rem'
        }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          transition: 'transform 0.6s',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          position: 'relative'
        }}>
          {/* Front (English) */}
          <div className="glass" style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700 }}>{currentWord.english}</h2>
            <p className="text-muted mt-2">Klicke zum Umdrehen</p>
          </div>

          {/* Back (German) */}
          <div className="glass" style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
            border: '2px solid var(--primary)',
            transform: 'rotateY(180deg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <button 
              onClick={(e) => playAudio(currentWord.german, e)}
              className="btn btn-primary"
              style={{ padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}
              title="Aussprache anhören"
            >
              <Volume2 size={32} />
            </button>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: 'white' }}>{currentWord.german}</h2>
            {currentWord.respelling && (
              <p style={{ color: 'var(--secondary)', fontSize: '1.2rem', marginTop: '0.5rem', fontFamily: 'monospace' }}>
                [{currentWord.respelling}]
              </p>
            )}
            <p className="text-muted mt-4">Klicke zum Zurückdrehen</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-4">
        <button 
          onClick={handlePrev} 
          disabled={currentIndex === 0}
          className="btn btn-secondary"
          style={{ padding: '1.5rem', opacity: currentIndex === 0 ? 0.5 : 1 }}
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={markAsLearned} 
          className="btn btn-primary" 
          style={{ flex: 1, padding: '1.5rem', fontSize: '1.1rem', background: 'var(--secondary)' }}
          title="Als gewusst markieren und weiter"
        >
          <Check size={24} /> Gewusst
        </button>
        <button 
          onClick={handleNext} 
          disabled={currentIndex === words.length - 1}
          className="btn btn-secondary"
          style={{ padding: '1.5rem', opacity: currentIndex === words.length - 1 ? 0.5 : 1 }}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Flashcards;
