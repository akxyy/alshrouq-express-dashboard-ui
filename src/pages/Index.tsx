
import React, { useState } from 'react';
import SignInPage from '../components/SignInPage';
import Dashboard from '../components/Dashboard';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen">
      {!isAuthenticated ? (
        <SignInPage onSignIn={handleSignIn} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
