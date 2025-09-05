import React, { useState } from 'react';
import { Image, Map } from 'lucide-react';

const FeaturePreview = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Photos Cards */}
          <div 
            className="feature-card group"
            onMouseEnter={() => setHoveredCard('photos')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="feature-card-content">
              <div className="flex items-center justify-center mb-6">
                <div className="feature-icon-large">
                  <Image size={48} />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">Photos Cards</h3>
              <p className="text-gray-400 mb-4">Dynamic Changing</p>
              
              {/* Photo carousel preview */}
              <div className="grid grid-cols-3 gap-2 opacity-60">
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i}
                    className={`aspect-square bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg transition-all duration-500 ${
                      hoveredCard === 'photos' ? 'scale-105' : ''
                    }`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Map View */}
          <div 
            className="feature-card group"
            onMouseEnter={() => setHoveredCard('map')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="feature-card-content">
              <div className="flex items-center justify-center mb-6">
                <div className="feature-icon-large">
                  <Map size={48} />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">Map View</h3>
              <p className="text-gray-400 mb-4">Interactive Planning</p>
              
              {/* Map preview */}
              <div className="relative h-32 bg-gradient-to-br from-cyan-500 to-lime-500 rounded-lg opacity-60 overflow-hidden">
                <div className={`absolute inset-0 transition-transform duration-500 ${
                  hoveredCard === 'map' ? 'scale-110' : ''
                }`}>
                  {/* Map pins */}
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i}
                      className="absolute w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"
                      style={{
                        left: `${20 + i * 20}%`,
                        top: `${30 + (i % 2) * 30}%`,
                        animationDelay: `${i * 0.3}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturePreview;