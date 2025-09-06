import React, { useEffect, useState, useCallback } from 'react';

interface BackgroundElementsProps {
  scrollY: number;
}

const BackgroundElements: React.FC<BackgroundElementsProps> = ({ scrollY }) => {
  const [time, setTime] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [viewportSize, setViewportSize] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now() * 0.001);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    const updateViewport = () => {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', updateViewport);
    updateViewport();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateViewport);
    };
  }, [handleMouseMove]);

  return (
    <>
      {/* Enhanced multi-layer gradient background with mouse interaction */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-900" />
      <div 
        className="fixed inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-cyan-900/10 transition-all duration-1000"
        style={{
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 15}px)`
        }}
      />
      <div 
        className="fixed inset-0 bg-gradient-conic from-purple-900/10 via-pink-900/5 to-cyan-900/10"
        style={{
          transform: `rotate(${time * 2}deg) scale(${1 + Math.sin(time * 0.1) * 0.05})`
        }}
      />
      
      {/* Shooting stars only */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`shooting-${i}`}
            className="absolute w-1 h-20 bg-gradient-to-b from-white via-purple-300 to-transparent rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + Math.sin(time * 0.1 + i * 2) * 20}%`,
              transform: `rotate(45deg) translateX(${Math.sin(time * 0.2 + i * 3) * 200}px)`,
              opacity: Math.max(0, Math.sin(time * 0.3 + i * 2)),
              filter: 'blur(0.5px)',
              animation: `shooting-star-${i} 4s infinite linear`
            }}
          />
        ))}
      </div>

      {/* Energy trails only */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`trail-${i}`}
            className="absolute rounded-full"
            style={{
              width: '4px',
              height: `${20 + Math.sin(time + i) * 40}px`,
              background: `linear-gradient(to bottom, 
                ${i % 2 === 0 ? 'rgba(139,92,246,0.6)' : 'rgba(6,182,212,0.5)'}, 
                transparent)`,
              left: `${10 + i * 12}%`,
              top: `${20 + Math.sin(time * 0.1 + i) * 30}%`,
              transform: `translateY(${Math.sin(time * 0.8 + i) * 100}px) rotate(${Math.cos(time * 0.2 + i) * 30}deg)`,
              opacity: 0.3 + Math.sin(time * 0.6 + i) * 0.4,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>

      {/* Enhanced travel-themed floating elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[
          { icon: '✈️', color: 'rgba(139,92,246,0.1)', size: 24 },
          { icon: '🗺️', color: 'rgba(6,182,212,0.1)', size: 28 },
          { icon: '🎒', color: 'rgba(236,72,153,0.08)', size: 22 },
          { icon: '🏔️', color: 'rgba(132,204,22,0.08)', size: 30 },
          { icon: '🏖️', color: 'rgba(249,115,22,0.08)', size: 26 },
          { icon: '🌅', color: 'rgba(255,193,7,0.08)', size: 25 },
          { icon: '🧭', color: 'rgba(139,92,246,0.06)', size: 20 },
          { icon: '🚁', color: 'rgba(6,182,212,0.06)', size: 24 }
        ].map((item, i) => (
          <div
            key={`icon-${i}`}
            className="absolute select-none transition-all duration-300"
            style={{
              fontSize: `${item.size}px`,
              left: `${(i * 15 + 10) % 85}%`,
              top: `${(i * 20 + 15) % 75}%`,
              transform: `translate(
                ${Math.sin(time * 0.1 + i) * 40 + mousePos.x * (8 - i)}px, 
                ${Math.cos(time * 0.08 + i) * 50 + mousePos.y * (6 - i)}px
              ) rotate(${Math.sin(time * 0.05 + i) * 20}deg) scale(${1 + Math.sin(time * 0.15 + i) * 0.3})`,
              opacity: 0.03 + Math.sin(time * 0.1 + i) * 0.05,
              filter: `blur(${0.5 + Math.sin(time * 0.2 + i) * 0.5}px)`,
              textShadow: `0 0 ${10 + Math.sin(time + i) * 5}px ${item.color}`,
              color: item.color,
            }}
          >
            {item.icon}
          </div>
        ))}
      </div>





      {/* Animated grid with perspective effect */}
      <div 
        className="fixed inset-0 opacity-8 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,92,246,${0.1 + Math.sin(time * 0.1) * 0.05}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,${0.1 + Math.cos(time * 0.12) * 0.05}) 1px, transparent 1px)
          `,
          backgroundSize: `${60 + Math.sin(time * 0.05) * 10}px ${60 + Math.cos(time * 0.08) * 10}px`,
          transform: `translate(${Math.sin(time * 0.05) * 3 + mousePos.x * 2}px, ${Math.cos(time * 0.03) * 4 + mousePos.y * 1.5}px) 
                     perspective(1000px) rotateX(${mousePos.y * 2}deg) rotateY(${mousePos.x * 1.5}deg)`
        }}
      />

      {/* Multi-layered atmospheric depth */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-gradient-to-t from-purple-950/8 via-transparent to-cyan-950/6"
          style={{ 
            opacity: 0.6 + Math.sin(time * 0.1) * 0.3,
            transform: `translateY(${Math.sin(time * 0.05) * 10}px)`
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-950/4 to-transparent"
          style={{ 
            opacity: 0.4 + Math.cos(time * 0.08) * 0.4,
            transform: `translateX(${Math.cos(time * 0.04) * 15}px)`
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-br from-lime-950/3 via-transparent to-orange-950/3"
          style={{ 
            opacity: 0.3 + Math.sin(time * 0.06) * 0.2,
            transform: `scale(${1 + Math.sin(time * 0.02) * 0.02})`
          }}
        />
      </div>

      <style jsx>{`
        @keyframes shooting-star-0 {
          0% { transform: rotate(45deg) translateX(-200px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: rotate(45deg) translateX(400px); opacity: 0; }
        }
        @keyframes shooting-star-1 {
          0% { transform: rotate(45deg) translateX(-300px); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: rotate(45deg) translateX(500px); opacity: 0; }
        }
        @keyframes shooting-star-2 {
          0% { transform: rotate(45deg) translateX(-250px); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: rotate(45deg) translateX(450px); opacity: 0; }
        }
      `}</style>
    </>
  );
};

export default BackgroundElements;