import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

interface HeaderProps {
  onNavigate?: (page: 'home' | 'experiences' | 'travel-guides' | 'hotels') => void;
  currentPage?: 'home' | 'experiences' | 'travel-guides' | 'hotels';
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage = 'home' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('home');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExperiencesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('experiences');
    }
  };

  const handleTravelGuidesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('travel-guides');
    }
  };

  const handleHotelsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('hotels');
    }
  };
  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-dark/80 backdrop-blur-xl border-b border-white/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <a 
                href="#" 
                className="logo text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={handleLogoClick}
              >
                Journey Verse
              </a>
              <div className="hidden md:flex items-center space-x-6">
                <a 
                  href="#" 
                  className={`nav-link ${currentPage === 'home' ? 'text-white' : ''}`}
                  onClick={handleLogoClick}
                >
                  Home
                </a>
                <a 
                  href="#" 
                  className={`nav-link ${currentPage === 'travel-guides' ? 'text-white' : ''}`}
                  onClick={handleTravelGuidesClick}
                >
                  Travel Guides
                </a>
                <a 
                  href="#" 
                  className={`nav-link ${currentPage === 'hotels' ? 'text-white' : ''}`}
                  onClick={handleHotelsClick}
                >
                  Hotels
                </a>
                <a 
                  href="#" 
                  className={`nav-link ${currentPage === 'experiences' ? 'text-white' : ''}`}
                  onClick={handleExperiencesClick}
                >
                  Experiences
                </a>
                <a href="#" className="nav-link">Pricing</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-white/80 hidden md:block">
                    Welcome, {user.user_metadata?.full_name || user.email}
                  </span>
                  <button 
                    onClick={handleSignOut}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => handleAuthClick('login')}
                    className="btn-secondary"
                  >
                    Log In
                  </button>
                  <button 
                    onClick={() => handleAuthClick('signup')}
                    className="btn-primary"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Header;