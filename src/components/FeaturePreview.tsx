import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const FeaturePreview = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  // Photo URLs for the photo gallery
  const photoUrls = [
    'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=800'
  ];

  // Important places data
  const importantPlaces = [
    { id: 1, name: 'Delhi', x: 42.5, y: 40, description: 'Capital of India' },
    { id: 2, name: 'Mumbai', x: 55, y: 56.7, description: 'Financial Capital' },
    { id: 3, name: 'Bangalore', x: 62.5, y: 73.3, description: 'Silicon Valley of India' },
    { id: 4, name: 'Chennai', x: 70, y: 63.3, description: 'Detroit of India' },
    { id: 5, name: 'Jaipur', x: 47.5, y: 50, description: 'Pink City' },
    { id: 6, name: 'Kolkata', x: 60, y: 46.7, description: 'City of Joy' },
    { id: 7, name: 'Goa', x: 58, y: 65, description: 'Beach Paradise' },
    { id: 8, name: 'Kerala', x: 62, y: 80, description: 'Gods Own Country' }
  ];

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % photoUrls.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === 0 ? photoUrls.length - 1 : selectedImageIndex - 1);
    }
  };

  // Map dragging functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - mapPosition.x,
      y: e.clientY - mapPosition.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setMapPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Keyboard navigation for image modal
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeImageModal();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImageIndex]);

  return (
    <>
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Photo Gallery */}
            <div className="feature-card group">
              <div className="feature-card-content">
                <div className="grid grid-cols-3 gap-3">
                  {photoUrls.map((url, i) => (
                    <div 
                      key={i}
                      className="aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      onClick={() => openImageModal(i)}
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

            {/* Interactive Map */}
            <div className="feature-card group">
              <div className="feature-card-content">
                <div 
                  ref={mapRef}
                  className="relative h-80 rounded-lg overflow-hidden bg-slate-800 cursor-grab active:cursor-grabbing select-none"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <div 
                    className="absolute inset-0 transition-transform duration-100"
                    style={{ 
                      transform: `translate(${mapPosition.x}px, ${mapPosition.y}px)`,
                      filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.3))'
                    }}
                  >
                    {/* India Map SVG */}
                    <svg 
                      viewBox="0 0 200 150" 
                      className="w-full h-full"
                    >
                      {/* India outline */}
                      <path
                        d="M50 30 L60 25 L75 28 L85 35 L95 40 L105 45 L115 50 L125 55 L130 65 L135 75 L140 85 L145 95 L150 105 L145 115 L140 120 L130 125 L120 130 L110 125 L100 120 L90 115 L80 110 L70 105 L60 100 L55 90 L50 80 L45 70 L40 60 L45 50 L50 40 Z"
                        fill="rgba(6, 182, 212, 0.2)"
                        stroke="rgba(6, 182, 212, 0.6)"
                        strokeWidth="1"
                      />
                      
                      {/* Important Places */}
                      {importantPlaces.map((place) => (
                        <g key={place.id}>
                          {/* Pulsing circle effect */}
                          <circle 
                            cx={place.x} 
                            cy={place.y} 
                            r="8" 
                            fill="rgba(239, 68, 68, 0.2)" 
                            className="animate-ping"
                          />
                          {/* Main marker */}
                          <circle 
                            cx={place.x} 
                            cy={place.y} 
                            r="4" 
                            fill="#ef4444" 
                            className="cursor-pointer hover:r-6 transition-all duration-200"
                          >
                            <title>{place.name} - {place.description}</title>
                          </circle>
                          {/* Place label */}
                          <text
                            x={place.x}
                            y={place.y - 8}
                            textAnchor="middle"
                            className="fill-white text-xs font-medium pointer-events-none"
                            style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}
                          >
                            {place.name}
                          </text>
                        </g>
                      ))}
                      
                      {/* Connecting lines between major cities */}
                      <g stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" fill="none">
                        <line x1="42.5" y1="40" x2="55" y2="56.7" className="animate-pulse" />
                        <line x1="55" y1="56.7" x2="62.5" y2="73.3" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                        <line x1="62.5" y1="73.3" x2="70" y2="63.3" className="animate-pulse" style={{ animationDelay: '1s' }} />
                        <line x1="42.5" y1="40" x2="47.5" y2="50" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
                      </g>
                    </svg>
                  </div>
                  
                  {/* Map controls hint */}
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
                    Drag to explore
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
            {/* Close button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            {/* Previous button */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            
            {/* Next button */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Main image */}
            <div className="relative">
              <img
                src={photoUrls[selectedImageIndex]}
                alt={`Travel photo ${selectedImageIndex + 1}`}
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              />
              
              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                {selectedImageIndex + 1} / {photoUrls.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturePreview;