import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface HeroProps {
  scrollY: number;
  onSignUpClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ scrollY, onSignUpClick }) => {
  const { user } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div 
        className="container mx-auto text-center z-10"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <h1 className="hero-title mb-6">
          Journey - Your Travel Buddy
        </h1>
        
        <p className="hero-subtitle mb-8">
          Design epic itineraries, browse traveler-tested guides,<br />
          and handle bookings like a pro — all your travel needs in<br />
          one place, fr
        </p>
        
        <button 
          className="btn-hero group"
          onClick={user ? undefined : onSignUpClick}
        >
          <span className="relative z-10">
            {user ? 'Welcome Back!' : 'Start Your Journey'}
          </span>
          <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
        </button>
      </div>
      
      {/* Floating particles */}
      <div className="floating-particles">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`floating-particle floating-particle-${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;