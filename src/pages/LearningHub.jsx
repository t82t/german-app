import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Layers, Volume2, Edit3, Link as LinkIcon, Loader } from 'lucide-react';

const LearningHub = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .eq('id', categoryId)
        .single();
      
      if (data) setCategory(data);
      setLoading(false);
    };

    fetchCategory();
  }, [categoryId]);

  if (loading) return <div className="text-center mt-4"><Loader size={40} className="animate-spin" /></div>;
  if (!category) return <div className="glass glass-panel text-center">Kategorie nicht gefunden.</div>;

  return (
    <div className="animate-fade-in">
      <div className="mb-4">
        <Link to="/categories" className="text-muted" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          &larr; Zurück zu den Kategorien
        </Link>
        <h1>{category.name}</h1>
        <p className="text-muted mt-1">Wähle eine Lernmethode aus.</p>
      </div>

      <div className="grid grid-cols-3">
        <Link to={`/learn/${categoryId}/flashcards`} className="glass card text-center" style={{ padding: '3rem 2rem' }}>
          <Layers size={48} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
          <h3>Flashcards</h3>
          <p className="text-muted mt-1">Lerne Vokabeln mit interaktiven Karten und Audio-Wiedergabe.</p>
        </Link>

        <Link to={`/learn/${categoryId}/fill-blanks`} className="glass card text-center" style={{ padding: '3rem 2rem' }}>
          <Edit3 size={48} color="var(--secondary)" style={{ margin: '0 auto 1rem' }} />
          <h3>Lückentext</h3>
          <p className="text-muted mt-1">Übe das Schreiben und teste dein Wissen, indem du die fehlenden Wörter ergänzt.</p>
        </Link>
        
        <Link to={`/learn/${categoryId}/matching`} className="glass card text-center" style={{ padding: '3rem 2rem' }}>
          <LinkIcon size={48} color="#F59E0B" style={{ margin: '0 auto 1rem' }} />
          <h3>Zuordnen</h3>
          <p className="text-muted mt-1">Verbinde die englischen Begriffe mit den passenden deutschen Wörtern.</p>
        </Link>
      </div>
    </div>
  );
};

export default LearningHub;
