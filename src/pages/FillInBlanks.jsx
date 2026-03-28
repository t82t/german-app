import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CheckCircle2, XCircle } from 'lucide-react';

const FillInBlanks = () => {
  const { categoryId } = useParams();
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null); // 'success' or 'error'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWords = async () => {
      const { data } = await supabase
        .from('vocabulary')
        .select('*')
        .eq('category_id', categoryId);
      
      const shuffled = (data || []).sort(() => Math.random() - 0.5);
      setWords(shuffled);
      setLoading(false);
    };
    fetchWords();
  }, [categoryId]);

  const checkAnswer = (e) => {
    e.preventDefault();
    const currentWord = words[currentIndex];
    
    // Very simple check ignoring case
    if (input.trim().toLowerCase() === currentWord.german.toLowerCase()) {
      setResult('success');
      setTimeout(() => {
        setResult(null);
        setInput('');
        setCurrentIndex((prev) => Math.min(prev + 1, words.length - 1));
      }, 1500);
    } else {
      setResult('error');
    }
  };

  if (loading) return <div>Laden...</div>;

  if (words.length === 0) {
    return (
      <div className="glass glass-panel text-center">
        <h2>Keine Vokabeln gefunden</h2>
        <Link to={`/learn/${categoryId}`} className="btn btn-secondary mt-2">Zurück</Link>
      </div>
    );
  }

  const currentWord = words[currentIndex];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Link to={`/learn/${categoryId}`} className="text-muted" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        &larr; Zurück
      </Link>
      
      <div className="text-center mb-4 text-muted">
        Frage {currentIndex + 1} von {words.length}
      </div>

      <div className="glass glass-panel text-center" style={{ padding: '4rem 2rem' }}>
        <p className="text-muted" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Übersetze das folgende Wort ins Deutsche:</p>
        <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>{currentWord.english}</h2>
        
        <form onSubmit={checkAnswer} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Deutsches Wort eingeben..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setResult(null);
              }}
              style={{ 
                fontSize: '1.5rem', 
                padding: '1rem', 
                textAlign: 'center',
                borderColor: result === 'success' ? 'var(--secondary)' : result === 'error' ? 'var(--danger)' : 'var(--border-color)'
              }}
              autoFocus
            />
            {result === 'success' && <CheckCircle2 color="var(--secondary)" size={32} style={{ position: 'absolute', right: '1rem', top: '1rem' }} />}
            {result === 'error' && <XCircle color="var(--danger)" size={32} style={{ position: 'absolute', right: '1rem', top: '1rem' }} />}
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ padding: '1rem', fontSize: '1.2rem' }}>
            Überprüfen
          </button>
        </form>

        {result === 'error' && (
          <p className="mt-4" style={{ color: 'var(--danger)' }}>
            Leider falsch. Versuche es nochmal oder überspringe.<br />
            <button 
              className="btn btn-secondary mt-2" 
              onClick={() => {
                setResult(null);
                setInput('');
                setCurrentIndex((prev) => Math.min(prev + 1, words.length - 1));
              }}
            >
              Überspringen (Antwort: {currentWord.german})
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default FillInBlanks;
