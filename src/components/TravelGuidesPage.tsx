import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, MapPin, Clock, Star, Heart, Share2, 
  BookOpen, Compass, Camera, Users, Award, Globe,
  ChevronRight, Play, Download, Eye, ThumbsUp
} from 'lucide-react';

const TravelGuidesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [animatedStats, setAnimatedStats] = useState({
    guides: 0,
    destinations: 0,
    downloads: 0,
    rating: 0
  });

  // Animate stats on mount
  useEffect(() => {
    const animateValue = (start: number, end: number, duration: number, key: string) => {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        
        setAnimatedStats(prev => ({ ...prev, [key]: current }));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    };

    setTimeout(() => {
      animateValue(0, 2500, 2000, 'guides');
      animateValue(0, 180, 2000, 'destinations');
      animateValue(0, 500000, 2000, 'downloads');
      animateValue(0, 48, 2000, 'rating');
    }, 500);
  }, []);

  const categories = [
    { id: 'all', name: 'All Guides', icon: Globe },
    { id: 'culture', name: 'Culture & Heritage', icon: BookOpen },
    { id: 'adventure', name: 'Adventure', icon: Compass },
    { id: 'food', name: 'Food & Dining', icon: Heart },
    { id: 'photography', name: 'Photography', icon: Camera },
    { id: 'family', name: 'Family Travel', icon: Users }
  ];

  const featuredGuides = [
    {
      id: 1,
      title: "Ultimate Rajasthan Heritage Trail",
      subtitle: "7-Day Cultural Immersion",
      author: "Priya Sharma",
      authorImage: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
      coverImage: "https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      downloads: 15420,
      duration: "7 days",
      category: "Culture & Heritage",
      description: "Explore the royal palaces, vibrant markets, and ancient forts of Rajasthan",
      highlights: ["Amber Fort", "City Palace", "Hawa Mahal", "Desert Safari"]
    },
    {
      id: 2,
      title: "Kerala Backwaters & Spice Routes",
      subtitle: "Nature & Culinary Journey",
      author: "Arjun Nair",
      authorImage: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
      coverImage: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      downloads: 12350,
      duration: "5 days",
      category: "Nature & Food",
      description: "Navigate serene backwaters and discover authentic spice plantations",
      highlights: ["Houseboat Stay", "Spice Gardens", "Kathakali Show", "Ayurvedic Spa"]
    },
    {
      id: 3,
      title: "Himalayan Adventure Guide",
      subtitle: "Trekking & Mountain Culture",
      author: "Tenzin Norbu",
      authorImage: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150",
      coverImage: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      downloads: 18750,
      duration: "10 days",
      category: "Adventure",
      description: "High-altitude trekking with insights into mountain communities",
      highlights: ["Base Camp Trek", "Monastery Visits", "Local Villages", "Mountain Photography"]
    }
  ];

  const popularDestinations = [
    {
      name: "Goa",
      guides: 45,
      image: "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=300",
      gradient: "from-orange-500 to-red-500"
    },
    {
      name: "Kashmir",
      guides: 32,
      image: "https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=300",
      gradient: "from-cyan-500 to-lime-500"
    },
    {
      name: "Tamil Nadu",
      guides: 38,
      image: "https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=300",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Himachal Pradesh",
      guides: 41,
      image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=300",
      gradient: "from-violet-500 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-lime-900/20 via-dark to-dark" />
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            <span className="bg-gradient-to-r from-lime-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Travel Guides That
            </span>
            <br />
            <span className="text-white">Unlock Hidden Gems</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light mb-12">
            Expert-crafted guides from local insiders who know the real stories
          </p>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-lime-500 to-cyan-500 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="md:col-span-2 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search destinations, experiences..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20"
                    />
                  </div>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-lime-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="culture">Culture</option>
                    <option value="adventure">Adventure</option>
                    <option value="food">Food</option>
                    <option value="nature">Nature</option>
                  </select>
                  <button className="btn-primary py-3 px-6 rounded-xl font-semibold bg-gradient-to-r from-lime-500 to-cyan-500">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-cyan-500 to-lime-500 bg-clip-text text-transparent">
              Browse by Category
            </span>
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div 
                key={category.id}
                className="feature-icon-card group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lime-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <category.icon size={32} className="text-white" />
                </div>
                <span className="feature-label">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-lime-900/10">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Featured Travel Guides
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredGuides.map((guide, index) => (
              <div 
                key={guide.id}
                className="feature-card group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-card-content">
                  <div className="relative overflow-hidden rounded-2xl mb-6">
                    <img 
                      src={guide.coverImage} 
                      alt={guide.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        <span className="text-white text-sm font-medium">{guide.rating}</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/60 backdrop-blur-sm rounded-xl p-3">
                        <div className="flex items-center justify-between text-white text-sm">
                          <div className="flex items-center space-x-2">
                            <Download size={16} />
                            <span>{guide.downloads.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock size={16} />
                            <span>{guide.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-lime-400 text-sm font-medium">{guide.category}</span>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-lime-400 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{guide.description}</p>
                  </div>

                  <div className="flex items-center mb-4">
                    <img 
                      src={guide.authorImage} 
                      alt={guide.author}
                      className="w-8 h-8 rounded-full mr-3 object-cover"
                    />
                    <div>
                      <p className="text-white text-sm font-medium">{guide.author}</p>
                      <p className="text-gray-400 text-xs">Local Expert</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <p className="text-gray-400 text-sm">Highlights:</p>
                    {guide.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-300">
                        <ChevronRight size={14} className="text-lime-400 mr-2" />
                        {highlight}
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 btn-primary bg-gradient-to-r from-lime-500 to-cyan-500">
                      <Download size={16} className="mr-2" />
                      Download
                    </button>
                    <button className="btn-secondary p-3">
                      <Heart size={16} />
                    </button>
                    <button className="btn-secondary p-3">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Popular Destinations
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularDestinations.map((destination, index) => (
              <div 
                key={destination.name}
                className="group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${destination.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{destination.name}</h3>
                    <p className="text-white/80">{destination.guides} travel guides</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-lime-900/20 to-cyan-900/20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Trusted by Travelers Worldwide
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-black text-lime-400 mb-2">
                {animatedStats.guides.toLocaleString()}+
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Guides</h3>
              <p className="text-gray-400">Crafted by local experts</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-cyan-400 mb-2">
                {animatedStats.destinations}+
              </div>
              <h3 className="text-xl font-semibold mb-2">Destinations</h3>
              <p className="text-gray-400">Across India and beyond</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-purple-400 mb-2">
                {animatedStats.downloads.toLocaleString()}+
              </div>
              <h3 className="text-xl font-semibold mb-2">Downloads</h3>
              <p className="text-gray-400">Guides downloaded monthly</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-orange-400 mb-2">
                4.{animatedStats.rating}
              </div>
              <h3 className="text-xl font-semibold mb-2">Average Rating</h3>
              <p className="text-gray-400">From verified travelers</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-lime-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Start Your Next Adventure
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Download expert travel guides and discover hidden gems with insider knowledge
          </p>
          <button className="btn-hero text-2xl px-16 py-5 bg-gradient-to-r from-lime-500 to-cyan-500">
            Browse All Guides
          </button>
        </div>
      </section>
    </div>
  );
};

export default TravelGuidesPage;