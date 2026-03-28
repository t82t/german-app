import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Plus, Trash2, Edit } from 'lucide-react';

const Manage = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [vocab, setVocab] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  
  // Category form
  const [catName, setCatName] = useState('');
  // Vocab form
  const [vGerman, setVGerman] = useState('');
  const [vEnglish, setVEnglish] = useState('');
  const [vRespelling, setVRespelling] = useState('');

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*').eq('user_id', user.id);
    setCategories(data || []);
  };

  const fetchVocab = async (categoryId) => {
    const { data } = await supabase.from('vocabulary').select('*').eq('category_id', categoryId);
    setVocab(data || []);
  };

  useEffect(() => {
    fetchCategories();
  }, [user]);

  useEffect(() => {
    if (selectedCat) fetchVocab(selectedCat.id);
  }, [selectedCat]);

  const addCategory = async (e) => {
    e.preventDefault();
    if (!catName) return;
    const { data, error } = await supabase.from('categories').insert([{ name: catName, user_id: user.id }]).select();
    if (!error && data) {
      setCategories([...categories, data[0]]);
      setCatName('');
    }
  };

  const deleteCategory = async (id) => {
    await supabase.from('categories').delete().eq('id', id);
    setCategories(categories.filter(c => c.id !== id));
    if (selectedCat?.id === id) setSelectedCat(null);
  };

  const addVocab = async (e) => {
    e.preventDefault();
    if (!vGerman || !vEnglish || !selectedCat) return;
    const { data, error } = await supabase.from('vocabulary').insert([{
      category_id: selectedCat.id,
      user_id: user.id,
      german: vGerman,
      english: vEnglish,
      respelling: vRespelling
    }]).select();
    if (!error && data) {
      setVocab([...vocab, data[0]]);
      setVGerman('');
      setVEnglish('');
      setVRespelling('');
    }
  };

  const deleteVocab = async (id) => {
    await supabase.from('vocabulary').delete().eq('id', id);
    setVocab(vocab.filter(v => v.id !== id));
  };

  return (
    <div className="animate-fade-in grid grid-cols-2" style={{ gap: '2rem' }}>
      
      {/* Categories Column */}
      <div className="glass glass-panel">
        <h2 className="mb-4">Meine Kategorien</h2>
        <form onSubmit={addCategory} className="flex gap-2 mb-4">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Neue Kategorie..." 
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
          />
          <button type="submit" className="btn btn-primary"><Plus size={20} /></button>
        </form>

        <ul style={{ listStyle: 'none' }}>
          {categories.map(c => (
            <li 
              key={c.id} 
              className={`glass card flex justify-between items-center mb-2 ${selectedCat?.id === c.id ? 'btn-primary' : ''}`}
              style={{ padding: '1rem', cursor: 'pointer', borderColor: selectedCat?.id === c.id ? 'var(--primary)' : 'rgba(255,255,255,0.1)' }}
              onClick={() => setSelectedCat(c)}
            >
              <span>{c.name}</span>
              <button 
                onClick={(e) => { e.stopPropagation(); deleteCategory(c.id); }} 
                className="btn btn-danger"
                style={{ padding: '0.5rem' }}
                title="Löschen"
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
          {categories.length === 0 && <p className="text-muted">Keine eigenen Kategorien.</p>}
        </ul>
      </div>

      {/* Vocabulary Column */}
      <div className="glass glass-panel">
        <h2 className="mb-4">
          Vokabeln {selectedCat ? `in "${selectedCat.name}"` : 'verwalten'}
        </h2>
        
        {!selectedCat ? (
          <p className="text-muted">Bitte wähle links eine Kategorie aus.</p>
        ) : (
          <>
            <form onSubmit={addVocab} className="mb-4 grid" style={{ gap: '0.5rem' }}>
              <input type="text" className="form-control" placeholder="Deutsch (z.B. Apfel)" value={vGerman} onChange={e => setVGerman(e.target.value)} required />
              <input type="text" className="form-control" placeholder="Englisch (z.B. Apple)" value={vEnglish} onChange={e => setVEnglish(e.target.value)} required />
              <input type="text" className="form-control" placeholder="Aussprache (z.B. ap-fl) [Optional]" value={vRespelling} onChange={e => setVRespelling(e.target.value)} />
              <button type="submit" className="btn btn-secondary mt-1"><Plus size={20} /> Hinzufügen</button>
            </form>

            <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
              <ul style={{ listStyle: 'none' }}>
                {vocab.map(v => (
                  <li key={v.id} className="glass flex justify-between items-center mb-2" style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)' }}>
                    <div>
                      <strong>{v.german}</strong> <span className="text-muted">- {v.english}</span>
                      {v.respelling && <div style={{ fontSize: '0.8rem', color: 'var(--secondary)' }}>[{v.respelling}]</div>}
                    </div>
                    <button 
                      onClick={() => deleteVocab(v.id)} 
                      className="btn btn-danger"
                      style={{ padding: '0.5rem' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
                {vocab.length === 0 && <p className="text-muted">Die Liste ist leer.</p>}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Manage;
