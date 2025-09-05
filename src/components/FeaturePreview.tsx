import React, { useState } from 'react';
import { Image, Map } from 'lucide-react';

const FeaturePreview = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Photo URLs for the photo cards
  const photoUrls = [
    'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=300'
  ];

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
              <div className="grid grid-cols-3 gap-2 opacity-80">
                {photoUrls.map((url, i) => (
                  <div 
                    key={i}
                    className={`aspect-square rounded-lg overflow-hidden transition-all duration-500 ${
                      hoveredCard === 'photos' ? 'scale-105' : ''
                    }`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <img 
                      src={url} 
                      alt={`Travel photo ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
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
              <div className="relative h-32 rounded-lg opacity-80 overflow-hidden bg-slate-800">
                <div className={`absolute inset-0 transition-transform duration-500 ${
                  hoveredCard === 'map' ? 'scale-110' : ''
                }`}>
                  {/* Indian Map SVG */}
                  <svg 
                    viewBox="0 0 200 150" 
                    className="w-full h-full"
                    style={{ filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.3))' }}
                  >
                    {/* India outline */}
                    <path
                      d="M50 30 L60 25 L75 28 L85 35 L95 40 L105 45 L115 50 L125 55 L130 65 L135 75 L140 85 L145 95 L150 105 L145 115 L140 120 L130 125 L120 130 L110 125 L100 120 L90 115 L80 110 L70 105 L60 100 L55 90 L50 80 L45 70 L40 60 L45 50 L50 40 Z"
                      fill="rgba(6, 182, 212, 0.2)"
                      stroke="rgba(6, 182, 212, 0.6)"
                      strokeWidth="1"
                    />
                    {/* Major cities as pins */}
                    <circle cx="85" cy="60" r="3" fill="#ef4444" className="animate-pulse">
                      <title>Delhi</title>
                    </circle>
                    <circle cx="110" cy="85" r="3" fill="#ef4444" className="animate-pulse" style={{ animationDelay: '0.5s' }}>
                      <title>Mumbai</title>
                    </circle>
                    <circle cx="125" cy="110" r="3" fill="#ef4444" className="animate-pulse" style={{ animationDelay: '1s' }}>
                      <title>Bangalore</title>
                    </circle>
                    <circle cx="140" cy="95" r="3" fill="#ef4444" className="animate-pulse" style={{ animationDelay: '1.5s' }}>
                      <title>Chennai</title>
                    </circle>
                    <circle cx="95" cy="75" r="3" fill="#ef4444" className="animate-pulse" style={{ animationDelay: '2s' }}>
                      <title>Jaipur</title>
                    </circle>
                    <circle cx="120" cy="70" r="3" fill="#ef4444" className="animate-pulse" style={{ animationDelay: '2.5s' }}>
                      <title>Kolkata</title>
                    </circle>
                  </svg>
                  
                  {/* Connecting lines between cities */}
                  <svg viewBox="0 0 200 150" className="absolute inset-0 w-full h-full">
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: `
                          radial-gradient(circle at 42.5% 40%, rgba(6, 182, 212, 0.1) 0%, transparent 20%),
                          radial-gradient(circle at 55% 56.7%, rgba(6, 182, 212, 0.1) 0%, transparent 20%),
                          radial-gradient(circle at 62.5% 73.3%, rgba(6, 182, 212, 0.1) 0%, transparent 20%),
                          radial-gradient(circle at 70% 63.3%, rgba(6, 182, 212, 0.1) 0%, transparent 20%)
                        `
                      }}
                    />
                  </svg>
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