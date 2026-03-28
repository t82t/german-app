import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Layers, Loader, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch public (user_id is null) or custom (user_id = user.id) categories
      const { data, error: dbError } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: true });

      if (dbError) throw dbError;
      setCategories(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h1>Wähle eine Kategorie</h1>
        <button onClick={fetchCategories} className="btn btn-secondary" title="Neu laden">
          <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2" style={{ height: '300px' }}>
          <Loader size={30} color="var(--primary)" />
          <span className="text-muted">Kategorien werden geladen...</span>
        </div>
      ) : error ? (
        <div className="glass glass-panel" style={{ border: '1px solid var(--danger)', color: 'var(--danger)' }}>
          Fehler beim Laden: {error}
        </div>
      ) : categories.length === 0 ? (
        <div className="glass glass-panel text-center">
          <Layers size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
          <h3>Keine Kategorien gefunden</h3>
          <p className="text-muted mt-1">Hast du die Datenbank-Tabellen auf Supabase initialisiert?</p>
        </div>
      ) : (
        <div className="grid grid-cols-4">
          {categories.map((cat) => (
            <Link key={cat.id} to={`/learn/${cat.id}`} className="glass card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {cat.name}
                  {cat.user_id && <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'var(--secondary)', color: 'white', borderRadius: '4px' }}>Eigene</span>}
                </h3>
              </div>
              <div className="mt-2 text-muted" style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                Lernen starten
                <Layers size={16} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
