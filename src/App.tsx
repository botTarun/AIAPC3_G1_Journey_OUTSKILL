import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturePreview from './components/FeaturePreview';
import FeatureIcons from './components/FeatureIcons';
import BackgroundElements from './components/BackgroundElements';
import AuthModal from './components/AuthModal';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignUpClick = () => {
    setAuthModalOpen(true);
  };
  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <BackgroundElements scrollY={scrollY} />
      <Header />
      <Hero scrollY={scrollY} onSignUpClick={handleSignUpClick} />
      <FeaturePreview />
      <FeatureIcons />
      
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="signup"
      />
    </div>
  );
}

export default App;