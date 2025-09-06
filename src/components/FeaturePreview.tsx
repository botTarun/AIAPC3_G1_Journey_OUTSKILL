import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, Map, Heart, Share2, Download, MapPin, Users, Star } from 'lucide-react';

const FeaturePreview = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredPlace, setHoveredPlace] = useState<number | null>(null);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
  const [showMapInstructions, setShowMapInstructions] = useState(true);
  const [visitedPlaces, setVisitedPlaces] = useState<Set<number>>(new Set());
  const mapRef = useRef<HTMLDivElement>(null);

  // Enhanced photo data with descriptions and stats
  const photoData = [
    { 
      url: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Golden Temple Sunset',
      location: 'Amritsar, Punjab',
      likes: 1247,
      description: 'A breathtaking view of the Golden Temple during sunset'
    },
    { 
      url: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Himalayan Adventure',
      location: 'Ladakh, India',
      likes: 892,
      description: 'Epic mountain landscapes in the heart of the Himalayas'
    },
    { 
      url: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Taj Mahal Wonder',
      location: 'Agra, Uttar Pradesh',
      likes: 2156,
      description: 'The iconic symbol of eternal love at dawn'
    },
    { 
      url: 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Backwater Serenity',
      location: 'Kerala, India',
      likes: 743,
      description: 'Peaceful backwaters surrounded by lush greenery'
    },
    { 
      url: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Rajasthani Colors',
      location: 'Jaipur, Rajasthan',
      likes: 1089,
      description: 'Vibrant streets of the Pink City'
    },
    { 
      url: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Beach Paradise',
      location: 'Goa, India',
      likes: 1634,
      description: 'Crystal clear waters and golden sandy beaches'
    }
  ];

  // Enhanced places data with more details
  const importantPlaces = [
    { 
      id: 1, name: 'Delhi', x: 42.5, y: 40, 
      description: 'Historic capital with rich culture',
      highlights: ['Red Fort', 'India Gate', 'Lotus Temple'],
      visitors: '32M annually',
      rating: 4.5
    },
    { 
      id: 2, name: 'Mumbai', x: 55, y: 56.7, 
      description: 'Bollywood & financial hub',
      highlights: ['Gateway of India', 'Marine Drive', 'Bollywood Studios'],
      visitors: '48M annually',
      rating: 4.3
    },
    { 
      id: 3, name: 'Bangalore', x: 62.5, y: 73.3, 
      description: 'Silicon Valley of India',
      highlights: ['Lalbagh Garden', 'Bangalore Palace', 'Tech Parks'],
      visitors: '15M annually',
      rating: 4.2
    },
    { 
      id: 4, name: 'Chennai', x: 70, y: 63.3, 
      description: 'Cultural capital of South India',
      highlights: ['Marina Beach', 'Kapaleeshwar Temple', 'Fort St. George'],
      visitors: '14M annually',
      rating: 4.1
    },
    { 
      id: 5, name: 'Jaipur', x: 47.5, y: 50, 
      description: 'The magnificent Pink City',
      highlights: ['Hawa Mahal', 'Amber Fort', 'City Palace'],
      visitors: '5M annually',
      rating: 4.7
    },
    { 
      id: 6, name: 'Kolkata', x: 60, y: 46.7, 
      description: 'City of Joy & culture',
      highlights: ['Victoria Memorial', 'Howrah Bridge', 'Park Street'],
      visitors: '19M annually',
      rating: 4.4
    },
    { 
      id: 7, name: 'Goa', x: 58, y: 65, 
      description: 'Beach paradise & nightlife',
      highlights: ['Baga Beach', 'Basilica of Bom Jesus', 'Dudhsagar Falls'],
      visitors: '8M annually',
      rating: 4.6
    },
    { 
      id: 8, name: 'Kerala', x: 62, y: 80, 
      description: 'Gods Own Country',
      highlights: ['Backwaters', 'Munnar Hills', 'Spice Gardens'],
      visitors: '11M annually',
      rating: 4.8
    }
  ];

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % photoData.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === 0 ? photoData.length - 1 : selectedImageIndex - 1);
    }
  };

  const toggleLike = (index: number) => {
    const newLiked = new Set(likedImages);
    if (newLiked.has(index)) {
      newLiked.delete(index);
    } else {
      newLiked.add(index);
    }
    setLikedImages(newLiked);
  };

  const markPlaceAsVisited = (placeId: number) => {
    const newVisited = new Set(visitedPlaces);
    if (newVisited.has(placeId)) {
      newVisited.delete(placeId);
    } else {
      newVisited.add(placeId);
    }
    setVisitedPlaces(newVisited);
  };

  // Map dragging functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setShowMapInstructions(false);
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

  // Auto-hide map instructions after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMapInstructions(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Experience India Like Never Before
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover breathtaking destinations through our interactive gallery and explore must-visit places on our dynamic map
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Enhanced Photo Gallery */}
            <div className="group">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Camera className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Travel Gallery</h3>
                    <p className="text-gray-400">Click any photo to explore</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
                    <Heart className="w-4 h-4" />
                    <span>{Array.from(likedImages).length} liked</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {photoData.map((photo, i) => (
                    <div 
                      key={i}
                      className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group/photo transition-all duration-300 hover:scale-105"
                      onClick={() => openImageModal(i)}
                    >
                      <img 
                        src={photo.url} 
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover/photo:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Overlay with info */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-white text-xs font-medium truncate">{photo.title}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-gray-300 text-xs">{photo.location}</span>
                            <div className="flex items-center gap-1">
                              <Heart 
                                className={`w-3 h-3 ${likedImages.has(i) ? 'text-red-500 fill-current' : 'text-white'}`}
                              />
                              <span className="text-xs text-white">{photo.likes + (likedImages.has(i) ? 1 : 0)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Like indicator */}
                      {likedImages.has(i) && (
                        <div className="absolute top-2 right-2">
                          <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Gallery stats */}
                <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-white">{photoData.length}</div>
                      <div className="text-sm text-gray-400">Photos</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {photoData.reduce((sum, photo, i) => sum + photo.likes + (likedImages.has(i) ? 1 : 0), 0)}
                      </div>
                      <div className="text-sm text-gray-400">Total Likes</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{importantPlaces.length}</div>
                      <div className="text-sm text-gray-400">Destinations</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Interactive Map */}
            <div className="group">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <Map className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Interactive Map</h3>
                    <p className="text-gray-400">Explore destinations across India</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{visitedPlaces.size} visited</span>
                  </div>
                </div>

                <div 
                  ref={mapRef}
                  className="relative h-96 rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 cursor-grab active:cursor-grabbing select-none border border-white/10"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <div 
                    className="absolute inset-0 transition-transform duration-100"
                    style={{ 
                      transform: `translate(${mapPosition.x}px, ${mapPosition.y}px)`,
                      filter: 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.4))'
                    }}
                  >
                    {/* Enhanced India Map SVG */}
                    <svg 
                      viewBox="0 0 200 150" 
                      className="w-full h-full"
                    >
                      {/* India outline with gradient */}
                      <defs>
                        <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{stopColor: 'rgba(6, 182, 212, 0.3)'}} />
                          <stop offset="100%" style={{stopColor: 'rgba(139, 92, 246, 0.3)'}} />
                        </linearGradient>
                      </defs>
                      
                      <path
                        d="M50 30 L60 25 L75 28 L85 35 L95 40 L105 45 L115 50 L125 55 L130 65 L135 75 L140 85 L145 95 L150 105 L145 115 L140 120 L130 125 L120 130 L110 125 L100 120 L90 115 L80 110 L70 105 L60 100 L55 90 L50 80 L45 70 L40 60 L45 50 L50 40 Z"
                        fill="url(#mapGradient)"
                        stroke="rgba(6, 182, 212, 0.8)"
                        strokeWidth="2"
                      />
                      
                      {/* Important Places with enhanced interactions */}
                      {importantPlaces.map((place) => (
                        <g key={place.id}>
                          {/* Pulsing circle effect */}
                          <circle 
                            cx={place.x} 
                            cy={place.y} 
                            r={hoveredPlace === place.id ? "12" : "8"} 
                            fill={visitedPlaces.has(place.id) ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.2)"} 
                            className="animate-ping transition-all duration-300"
                          />
                          {/* Main marker */}
                          <circle 
                            cx={place.x} 
                            cy={place.y} 
                            r={hoveredPlace === place.id ? "6" : "4"} 
                            fill={visitedPlaces.has(place.id) ? "#22c55e" : "#ef4444"} 
                            className="cursor-pointer transition-all duration-300 hover:scale-125"
                            onMouseEnter={() => setHoveredPlace(place.id)}
                            onMouseLeave={() => setHoveredPlace(null)}
                            onClick={() => markPlaceAsVisited(place.id)}
                          />
                          {/* Place label */}
                          <text
                            x={place.x}
                            y={place.y - 12}
                            textAnchor="middle"
                            className="fill-white text-xs font-bold pointer-events-none transition-all duration-300"
                            style={{ 
                              textShadow: '0 0 8px rgba(0,0,0,0.8)',
                              fontSize: hoveredPlace === place.id ? '14px' : '12px'
                            }}
                          >
                            {place.name}
                          </text>
                          
                          {/* Visited checkmark */}
                          {visitedPlaces.has(place.id) && (
                            <text
                              x={place.x + 8}
                              y={place.y - 8}
                              className="fill-green-400 text-xs font-bold pointer-events-none"
                            >
                              ✓
                            </text>
                          )}
                        </g>
                      ))}
                      
                      {/* Animated connecting lines */}
                      <g stroke="rgba(6, 182, 212, 0.4)" strokeWidth="2" fill="none">
                        <line x1="42.5" y1="40" x2="55" y2="56.7" className="animate-pulse" />
                        <line x1="55" y1="56.7" x2="62.5" y2="73.3" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                        <line x1="62.5" y1="73.3" x2="70" y2="63.3" className="animate-pulse" style={{ animationDelay: '1s' }} />
                        <line x1="42.5" y1="40" x2="47.5" y2="50" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
                      </g>
                    </svg>
                  </div>
                  
                  {/* Interactive instructions */}
                  {showMapInstructions && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-xl">
                      <div className="text-center text-white p-6">
                        <div className="text-4xl mb-4">🗺️</div>
                        <h4 className="text-xl font-bold mb-2">Interactive Map</h4>
                        <p className="text-gray-300 mb-4">Drag to explore • Click markers to visit</p>
                        <div className="flex items-center justify-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span>Unvisited</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span>Visited</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Enhanced map controls */}
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-xl px-4 py-2 text-white">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4" />
                      <span>{visitedPlaces.size}/{importantPlaces.length} places visited</span>
                    </div>
                  </div>

                  {/* Place tooltip */}
                  {hoveredPlace && (
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-xl p-4 text-white max-w-xs">
                      {importantPlaces
                        .filter(place => place.id === hoveredPlace)
                        .map(place => (
                          <div key={place.id}>
                            <h4 className="font-bold text-lg text-cyan-400">{place.name}</h4>
                            <p className="text-sm text-gray-300 mb-2">{place.description}</p>
                            <div className="flex items-center gap-2 mb-2">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm">{place.rating}/5</span>
                              <span className="text-sm text-gray-400">• {place.visitors}</span>
                            </div>
                            <div className="text-xs text-gray-400">
                              <strong>Must visit:</strong> {place.highlights.join(', ')}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {/* Map progress */}
                <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">Exploration Progress</span>
                    <span className="text-cyan-400 font-bold">{Math.round((visitedPlaces.size / importantPlaces.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(visitedPlaces.size / importantPlaces.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Image Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
          <div className="relative max-w-6xl max-h-[95vh] w-full mx-4">
            {/* Modal header */}
            <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
              <div className="bg-black/70 backdrop-blur-sm rounded-xl px-4 py-2 text-white">
                <h3 className="font-bold">{photoData[selectedImageIndex].title}</h3>
                <p className="text-sm text-gray-300">{photoData[selectedImageIndex].location}</p>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Action buttons */}
                <button
                  onClick={() => toggleLike(selectedImageIndex)}
                  className={`p-2 backdrop-blur-sm rounded-xl transition-all ${
                    likedImages.has(selectedImageIndex) 
                      ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                      : 'bg-black/50 text-white hover:bg-black/70'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${likedImages.has(selectedImageIndex) ? 'fill-current' : ''}`} />
                </button>
                
                <button className="p-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-xl text-white transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                
                <button className="p-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-xl text-white transition-colors">
                  <Download className="w-5 h-5" />
                </button>
                
                <button
                  onClick={closeImageModal}
                  className="p-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-xl text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            {/* Navigation buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-xl text-white transition-all hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-xl text-white transition-all hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            {/* Main image */}
            <div className="relative">
              <img
                src={photoData[selectedImageIndex].url}
                alt={photoData[selectedImageIndex].title}
                className="w-full h-auto max-h-[95vh] object-contain rounded-2xl"
              />
              
              {/* Image info bar */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm rounded-xl px-6 py-3 text-white">
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{selectedImageIndex + 1} / {photoData.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-400" />
                    <span>{photoData[selectedImageIndex].likes + (likedImages.has(selectedImageIndex) ? 1 : 0)} likes</span>
                  </div>
                  <div className="text-gray-300">
                    {photoData[selectedImageIndex].description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturePreview;