import React from 'react';

interface BackgroundElementsProps {
  scrollY: number;
}

const BackgroundElements: React.FC<BackgroundElementsProps> = ({ scrollY }) => {
  return (
    <>
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-radial from-purple-900/10 via-dark to-dark pointer-events-none" />
      
      {/* Animated background shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-500/8 to-pink-500/8 rounded-full blur-3xl animate-float-slow"
          style={{ 
            transform: `translate(${Math.sin(Date.now() * 0.001) * 20}px, ${scrollY * 0.1 + Math.cos(Date.now() * 0.0008) * 30}px)`,
            opacity: 0.6 + Math.sin(Date.now() * 0.002) * 0.2
          }}
        />
        <div 
          className="absolute top-60 right-20 w-80 h-80 bg-gradient-to-br from-cyan-500/8 to-lime-500/8 rounded-full blur-3xl animate-float-slower"
          style={{ 
            transform: `translate(${Math.cos(Date.now() * 0.0012) * 25}px, ${scrollY * -0.1 + Math.sin(Date.now() * 0.001) * 35}px)`,
            opacity: 0.5 + Math.cos(Date.now() * 0.0015) * 0.3
          }}
        />
        <div 
          className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-br from-orange-500/8 to-red-500/8 rounded-full blur-3xl animate-float"
          style={{ 
            transform: `translate(${Math.sin(Date.now() * 0.0015) * 30}px, ${scrollY * 0.05 + Math.cos(Date.now() * 0.0012) * 25}px)`,
            opacity: 0.4 + Math.sin(Date.now() * 0.0018) * 0.2
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-violet-500/6 to-purple-500/6 rounded-full blur-3xl animate-float-slow"
          style={{ 
            transform: `translate(-50%, -50%) translate(${Math.cos(Date.now() * 0.0008) * 40}px, ${Math.sin(Date.now() * 0.001) * 30}px)`,
            opacity: 0.3 + Math.cos(Date.now() * 0.002) * 0.2
          }}
        />
        <div 
          className="absolute top-10 right-1/3 w-56 h-56 bg-gradient-to-br from-lime-500/6 to-cyan-500/6 rounded-full blur-3xl animate-float-slower"
          style={{ 
            transform: `translate(${Math.sin(Date.now() * 0.0013) * 35}px, ${Math.cos(Date.now() * 0.0009) * 40}px)`,
            opacity: 0.35 + Math.sin(Date.now() * 0.0016) * 0.25
          }}
        />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="fixed inset-0 opacity-3 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>
      
      {/* Dynamic light rays */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-purple-500/20 via-transparent to-transparent blur-sm"
          style={{ 
            transform: `rotate(${Math.sin(Date.now() * 0.001) * 5}deg)`,
            opacity: 0.3 + Math.sin(Date.now() * 0.002) * 0.2
          }}
        />
        <div 
          className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent blur-sm"
          style={{ 
            transform: `rotate(${Math.cos(Date.now() * 0.0012) * 3}deg)`,
            opacity: 0.25 + Math.cos(Date.now() * 0.0018) * 0.15
          }}
        />
        <div 
          className="absolute top-0 left-2/3 w-1 h-full bg-gradient-to-b from-pink-500/15 via-transparent to-transparent blur-sm"
          style={{ 
            transform: `rotate(${Math.sin(Date.now() * 0.0008) * 4}deg)`,
            opacity: 0.2 + Math.sin(Date.now() * 0.0015) * 0.1
          }}
        />
      </div>
    </>
  );
};

export default BackgroundElements;