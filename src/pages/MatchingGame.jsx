import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { RefreshCcw } from 'lucide-react';

const MatchingGame = () => {
  const { categoryId } = useParams();
  const [pairs, setPairs] = useState([]);
  const [selectedGerman, setSelectedGerman] = useState(null);
  const [selectedEnglish, setSelectedEnglish] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [germanList, setGermanList] = useState([]);
  const [englishList, setEnglishList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAndSetup = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('vocabulary')
      .select('*')
      .eq('category_id', categoryId)
      .limit(6); // Limit to 6 pairs for matching to not crowd the UI
    
    if (data) {
      setPairs(data);
      setGermanList([...data].sort(() => Math.random() - 0.5));
      setEnglishList([...data].sort(() => Math.random() - 0.5));
      setMatchedIds([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAndSetup();
  }, [categoryId]);

  useEffect(() => {
    if (selectedGerman && selectedEnglish) {
      if (selectedGerman.id === selectedEnglish.id) {
        // match
        setTimeout(() => {
          setMatchedIds((prev) => [...prev, selectedGerman.id]);
          setSelectedGerman(null);
          setSelectedEnglish(null);
        }, 300);
      } else {
        // no match
        setTimeout(() => {
          setSelectedGerman(null);
          setSelectedEnglish(null);
        }, 800);
      }
    }
  }, [selectedGerman, selectedEnglish]);

  if (loading) return <div>Laden...</div>;
  if (pairs.length === 0) return <div>Keine Wörter gefunden.</div>;

  return (
    <div className="animate-fade-in text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Link to={`/learn/${categoryId}`} className="text-muted" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        &larr; Zurück
      </Link>
      
      <h2>Finde die Paare</h2>
      <p className="text-muted mb-4">Verbinde die englischen Begriffe mit den passenden deutschen Wörtern.</p>

      {matchedIds.length === pairs.length && (
        <div className="glass glass-panel mb-4" style={{ backgroundColor: 'rgba(16,185,129,0.2)' }}>
          <h2 style={{ color: 'var(--secondary)' }}>Super! Alle gefunden.</h2>
          <button onClick={fetchAndSetup} className="btn btn-primary mt-2">
            <RefreshCcw size={20} /> Weiter üben
          </button>
        </div>
      )}

      <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
        {/* German Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 className="text-muted">Deutsch</h4>
          {germanList.map((word) => {
            const isMatched = matchedIds.includes(word.id);
            const isSelected = selectedGerman?.id === word.id;
            return (
              <button
                key={`de-${word.id}`}
                className={`btn glass card ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                style={{ 
                  opacity: isMatched ? 0 : 1, 
                  visibility: isMatched ? 'hidden' : 'visible',
                  padding: '1.5rem',
                  fontSize: '1.2rem',
                  borderColor: isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.2)'
                }}
                onClick={() => !isMatched && setSelectedGerman(word)}
              >
                {word.german}
              </button>
            );
          })}
        </div>

        {/* English Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 className="text-muted">Englisch</h4>
          {englishList.map((word) => {
            const isMatched = matchedIds.includes(word.id);
            const isSelected = selectedEnglish?.id === word.id;
            return (
              <button
                key={`en-${word.id}`}
                className={`btn glass card ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                style={{ 
                  opacity: isMatched ? 0 : 1, 
                  visibility: isMatched ? 'hidden' : 'visible',
                  padding: '1.5rem',
                  fontSize: '1.2rem',
                  borderColor: isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.2)'
                }}
                onClick={() => !isMatched && setSelectedEnglish(word)}
              >
                {word.english}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MatchingGame;
