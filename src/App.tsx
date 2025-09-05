import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturePreview from './components/FeaturePreview';
import FeatureIcons from './components/FeatureIcons';
import BackgroundElements from './components/BackgroundElements';
import AuthModal from './components/AuthModal';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <BackgroundElements scrollY={scrollY} />
      <Header />
      <Hero scrollY={scrollY} />
      <FeaturePreview />
      <FeatureIcons />
    </div>
  );
}

export default App;