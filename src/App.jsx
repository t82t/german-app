import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Categories from './pages/Categories';
import LearningHub from './pages/LearningHub';
import Manage from './pages/Manage';
import Flashcards from './pages/Flashcards';
import FillInBlanks from './pages/FillInBlanks';
import MatchingGame from './pages/MatchingGame';
import Auth from './pages/Auth';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/auth" />;
  }
  return children;
};

const AppContent = () => {
  const { user } = useAuth();

  return (
    <>
      {user && <Navigation />}
      <main className="container">
        <Routes>
          <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
          <Route path="/learn/:categoryId" element={<ProtectedRoute><LearningHub /></ProtectedRoute>} />
          <Route path="/learn/:categoryId/flashcards" element={<ProtectedRoute><Flashcards /></ProtectedRoute>} />
          <Route path="/learn/:categoryId/fill-blanks" element={<ProtectedRoute><FillInBlanks /></ProtectedRoute>} />
          <Route path="/learn/:categoryId/matching" element={<ProtectedRoute><MatchingGame /></ProtectedRoute>} />
          <Route path="/manage" element={<ProtectedRoute><Manage /></ProtectedRoute>} />
        </Routes>
      </main>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
