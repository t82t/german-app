import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Layers } from 'lucide-react';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage({ text: 'Registrierung erfolgreich! Bitte logge dich ein.', type: 'success' });
        setIsLogin(true);
      }
    } catch (error) {
      setMessage({ text: error.message || 'Ein Fehler ist aufgetreten', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="glass glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="text-center mb-4">
          <Layers size={48} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
          <h2>{isLogin ? 'Willkommen zurück' : 'Account erstellen'}</h2>
          <p className="text-muted mt-1">Lerne Deutsch mit System</p>
        </div>

        {message.text && (
          <div style={{
            padding: '1rem',
            marginBottom: '1.5rem',
            borderRadius: '8px',
            backgroundColor: message.type === 'error' ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)',
            color: message.type === 'error' ? '#F87171' : '#34D399',
            border: `1px solid ${message.type === 'error' ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}`
          }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleAuth}>
          <div className="form-group">
            <label className="form-label">E-Mail</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label className="form-label">Passwort</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Laden...' : (isLogin ? 'Einloggen' : 'Registrieren')}
          </button>
        </form>

        <div className="text-center mt-4 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>
            {isLogin ? 'Noch keinen Account?' : 'Bereits registriert?'}
            <button
              onClick={() => { setIsLogin(!isLogin); setMessage({ text: '', type: '' }); }}
              style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', marginLeft: '0.5rem', fontWeight: 'bold' }}
            >
              {isLogin ? 'Hier registrieren' : 'Zum Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
