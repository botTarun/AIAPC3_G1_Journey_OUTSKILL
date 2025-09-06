import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturePreview from './components/FeaturePreview';
import FeatureIcons from './components/FeatureIcons';
import BackgroundElements from './components/BackgroundElements';
import ExperiencesPage from './components/ExperiencesPage';
import TravelGuidesPage from './components/TravelGuidesPage';
import HotelsPage from './components/HotelsPage';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [currentPage, setCurrentPage] = useState<'home' | 'experiences' | 'travel-guides' | 'hotels'>('home');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (currentPage === 'travel-guides') {
    return (
      <div className="min-h-screen bg-dark text-white overflow-x-hidden">
        <BackgroundElements scrollY={scrollY} />
        <Header onNavigate={setCurrentPage} currentPage={currentPage} />
        <TravelGuidesPage />
      </div>
    );
  }

  if (currentPage === 'hotels') {
    return (
      <div className="min-h-screen bg-dark text-white overflow-x-hidden">
        <BackgroundElements scrollY={scrollY} />
        <Header onNavigate={setCurrentPage} currentPage={currentPage} />
        <HotelsPage />
      </div>
    );
  }

  if (currentPage === 'experiences') {
    return (
      <div className="min-h-screen bg-dark text-white overflow-x-hidden">
        <BackgroundElements scrollY={scrollY} />
        <Header onNavigate={setCurrentPage} currentPage={currentPage} />
        <ExperiencesPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <BackgroundElements scrollY={scrollY} />
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      <Hero scrollY={scrollY} />
      <FeaturePreview />
      <FeatureIcons />
    </div>
  );
}

export default App;