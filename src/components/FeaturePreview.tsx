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

  // Enhanced places data for MapMyIndia
  const importantPlaces = [
    { 
      id: 1, name: 'Delhi', lat: 28.6139, lng: 77.2090,
      description: 'Historic capital with rich culture',
      highlights: ['Red Fort', 'India Gate', 'Lotus Temple'],
      visitors: '32M annually',
      rating: 4.5
    },
    { 
      id: 2, name: 'Mumbai', lat: 19.0760, lng: 72.8777,
      description: 'Bollywood & financial hub',
      highlights: ['Gateway of India', 'Marine Drive', 'Bollywood Studios'],
      visitors: '48M annually',
      rating: 4.3
    },
    { 
      id: 3, name: 'Bangalore', lat: 12.9716, lng: 77.5946,
      description: 'Silicon Valley of India',
      highlights: ['Lalbagh Garden', 'Bangalore Palace', 'Tech Parks'],
      visitors: '15M annually',
      rating: 4.2
    },
    { 
      id: 4, name: 'Chennai', lat: 13.0827, lng: 80.2707,
      description: 'Cultural capital of South India',
      highlights: ['Marina Beach', 'Kapaleeshwar Temple', 'Fort St. George'],
      visitors: '14M annually',
      rating: 4.1
    },
    { 
      id: 5, name: 'Jaipur', lat: 26.9124, lng: 75.7873,
      description: 'The magnificent Pink City',
      highlights: ['Hawa Mahal', 'Amber Fort', 'City Palace'],
      visitors: '5M annually',
      rating: 4.7
    },
    { 
      id: 6, name: 'Kolkata', lat: 22.5726, lng: 88.3639,
      description: 'City of Joy & culture',
      highlights: ['Victoria Memorial', 'Howrah Bridge', 'Park Street'],
      visitors: '19M annually',
      rating: 4.4
    },
    { 
      id: 7, name: 'Goa', lat: 15.2993, lng: 74.1240,
      description: 'Beach paradise & nightlife',
      highlights: ['Baga Beach', 'Basilica of Bom Jesus', 'Dudhsagar Falls'],
      visitors: '8M annually',
      rating: 4.6
    },
    { 
      id: 8, name: 'Kerala', lat: 10.8505, lng: 76.2711,
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
              Discover Amazing Destinations
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore breathtaking destinations through our interactive photo gallery
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Enhanced Photo Gallery */}
            <div className="group w-full">
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
                  {/* Map instructions */}
                  {showMapInstructions && (
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm animate-pulse">
                      Click and drag to explore the map
                    </div>
                  )}

                  {/* Map content */}
                  <div 
                    className="absolute inset-0 transition-transform duration-200"
                    style={{
                      transform: `translate(${mapPosition.x}px, ${mapPosition.y}px)`
                    }}
                  >
                    {/* India outline (simplified) */}
                    <svg 
                      className="absolute inset-0 w-full h-full opacity-20" 
                      viewBox="0 0 100 100"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        d="M30 20 L70 20 L75 30 L80 50 L75 70 L70 85 L50 90 L30 85 L25 70 L20 50 L25 30 Z"
                        fill="none"
                        stroke="white"
                        strokeWidth="0.5"
                      />
                    </svg>

                    {/* Place markers */}
                    {importantPlaces.map((place) => (
                      <div
                        key={place.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group/marker"
                        style={{ left: `${place.x}%`, top: `${place.y}%` }}
                        onMouseEnter={() => setHoveredPlace(place.id)}
                        onMouseLeave={() => setHoveredPlace(null)}
                        onClick={() => markPlaceAsVisited(place.id)}
                      >
                        {/* Marker */}
                        <div className={`w-4 h-4 rounded-full border-2 border-white transition-all duration-300 ${
                          visitedPlaces.has(place.id) 
                            ? 'bg-green-500 scale-125' 
                            : hoveredPlace === place.id 
                              ? 'bg-cyan-400 scale-110' 
                              : 'bg-red-500'
                        }`}>
                          {visitedPlaces.has(place.id) && (
                            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                          )}
                        </div>

                        {/* Place label */}
                        <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-lg px-2 py-1 text-white text-xs whitespace-nowrap transition-all duration-300 ${
                          hoveredPlace === place.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}>
                          <div className="font-medium">{place.name}</div>
                          <div className="text-gray-300 text-xs">{place.description}</div>
                        </div>

                        {/* Detailed info card */}
                        {hoveredPlace === place.id && (
                          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm rounded-xl p-4 text-white text-sm w-64 z-10 border border-white/20">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-bold text-lg">{place.name}</h4>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm">{place.rating}</span>
                              </div>
                            </div>
                            <p className="text-gray-300 mb-3">{place.description}</p>
                            
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-xs">
                                <Users className="w-3 h-3 text-cyan-400" />
                                <span>{place.visitors}</span>
                              </div>
                              
                              <div>
                                <div className="text-xs text-gray-400 mb-1">Top Attractions:</div>
                                <div className="flex flex-wrap gap-1">
                                  {place.highlights.map((highlight, i) => (
                                    <span key={i} className="text-xs bg-white/10 rounded px-2 py-1">
                                      {highlight}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                markPlaceAsVisited(place.id);
                              }}
                              className={`mt-3 w-full py-2 rounded-lg text-xs font-medium transition-colors ${
                                visitedPlaces.has(place.id)
                                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                  : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30'
                              }`}
                            >
                              {visitedPlaces.has(place.id) ? 'Visited ✓' : 'Mark as Visited'}
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map legend */}
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-gray-400">Unvisited</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-400">Visited</span>
                    </div>
                  </div>
                  <div className="text-gray-400">
                    {visitedPlaces.size} of {importantPlaces.length} places visited
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