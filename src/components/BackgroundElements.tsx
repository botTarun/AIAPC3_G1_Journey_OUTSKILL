import React from 'react';

interface BackgroundElementsProps {
  scrollY: number;
}

const BackgroundElements: React.FC<BackgroundElementsProps> = ({ scrollY }) => {
  return (
    <>
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-radial from-purple-900/20 via-dark to-dark pointer-events-none" />
      
      {/* Animated background shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float-slow"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute top-60 right-20 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-lime-500/10 rounded-full blur-3xl animate-float-slower"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />
        <div 
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-float"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>
    </>
  );
};

export default BackgroundElements;