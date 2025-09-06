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
      
      {/* Animated constellation with shooting stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${1 + Math.sin(i) * 2}px`,
              height: `${1 + Math.sin(i) * 2}px`,
              background: i % 7 === 0 ? 'rgba(139,92,246,0.8)' : 
                         i % 7 === 1 ? 'rgba(6,182,212,0.7)' : 
                         i % 7 === 2 ? 'rgba(236,72,153,0.6)' : 
                         'rgba(255,255,255,0.4)',
              left: `${(i * 7.3 + Math.sin(time * 0.1 + i) * 5) % 100}%`,
              top: `${(i * 11.7 + Math.cos(time * 0.08 + i) * 3) % 100}%`,
              opacity: 0.1 + Math.sin(time * 0.5 + i) * 0.4,
              transform: `scale(${0.3 + Math.sin(time * 0.3 + i) * 0.7}) rotate(${time * 10 + i * 30}deg)`,
              boxShadow: i % 15 === 0 ? `0 0 ${4 + Math.sin(time + i) * 3}px currentColor` : 'none',
              filter: i % 10 === 0 ? 'blur(0.5px)' : 'none'
            }}
          />
        ))}
        
        {/* Shooting stars */}
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

      {/* Dynamic particle system with multiple types */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating travel particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.sin(i) * 3}px`,
              height: `${2 + Math.sin(i) * 3}px`,
              background: `${
                i % 5 === 0 ? `linear-gradient(45deg, rgba(139,92,246,0.6), rgba(139,92,246,0.2))` :
                i % 5 === 1 ? `linear-gradient(45deg, rgba(6,182,212,0.5), rgba(6,182,212,0.1))` :
                i % 5 === 2 ? `linear-gradient(45deg, rgba(236,72,153,0.4), rgba(236,72,153,0.1))` :
                i % 5 === 3 ? `linear-gradient(45deg, rgba(132,204,22,0.4), rgba(132,204,22,0.1))` :
                `linear-gradient(45deg, rgba(249,115,22,0.3), rgba(249,115,22,0.1))`
              }`,
              left: `${(i * 13.7) % 100}%`,
              top: `${(i * 17.3) % 100}%`,
              transform: `translate(
                ${Math.sin(time * 0.5 + i) * 150 + mousePos.x * (5 + i % 10)}px, 
                ${Math.cos(time * 0.3 + i) * 120 + mousePos.y * (3 + i % 8)}px
              ) scale(${0.5 + Math.sin(time * 0.4 + i) * 0.5}) rotate(${time * 20 + i * 45}deg)`,
              opacity: 0.2 + Math.sin(time + i * 0.5) * 0.5,
              filter: `blur(${Math.sin(time + i) * 2 + 1}px)`,
              boxShadow: i % 8 === 0 ? `0 0 ${6 + Math.sin(time + i) * 4}px currentColor` : 'none'
            }}
          />
        ))}

        {/* Energy trails */}
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

      {/* Dynamic mesh gradient overlay with breathing effect */}
      <div 
        className="fixed inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `linear-gradient(135deg, rgba(139,92,246,0.02) 0%, transparent 50%, rgba(6,182,212,0.02) 100%)`,
          opacity: 0.7 + Math.sin(time * 0.1) * 0.3
        }}
      />

      {/* Ultra-enhanced light rays with dynamic behavior */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={`ray-${i}`}
            className="absolute top-0 bg-gradient-to-b blur-sm"
            style={{
              width: `${0.5 + Math.sin(time * 0.1 + i) * 0.3}px`,
              height: '100%',
              left: `${15 + i * 15}%`,
              background: `linear-gradient(to bottom, 
                ${i % 3 === 0 ? `rgba(139,92,246,${0.3 + Math.sin(time * 0.2 + i) * 0.2})` :
                  i % 3 === 1 ? `rgba(6,182,212,${0.25 + Math.cos(time * 0.25 + i) * 0.15})` :
                  `rgba(236,72,153,${0.2 + Math.sin(time * 0.3 + i) * 0.1})`} 0%, 
                transparent 60%, 
                ${i % 2 === 0 ? 'rgba(255,255,255,0.05)' : 'transparent'} 100%)`,
              transform: `rotate(${Math.sin(time * 0.05 + i) * 6}deg) scaleY(${0.8 + Math.cos(time * 0.1 + i) * 0.3})`,
              opacity: 0.4 + Math.sin(time * 0.15 + i) * 0.3
            }}
          />
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