import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, Layers, Settings, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Navigation = () => {
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/categories', label: 'Lernen', icon: <BookOpen size={20} /> },
    { path: '/manage', label: 'Verwalten', icon: <Settings size={20} /> },
  ];

  return (
    <header>
      <div className="container header-content">
        <Link to="/" className="logo">
          <Layers size={28} color="var(--primary)" />
          <span>DeutschLernen</span>
        </Link>
        <nav className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link flex items-center gap-2 ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
