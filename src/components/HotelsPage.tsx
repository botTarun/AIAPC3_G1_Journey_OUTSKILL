import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, MapPin, Star, Heart, Share2, 
  Wifi, Car, Coffee, Utensils, Dumbbell, Waves,
  Calendar, Users, CreditCard, Shield, Award,
  ChevronRight, Eye, ThumbsUp, Clock
} from 'lucide-react';

const HotelsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [priceRange, setPriceRange] = useState('all');
  const [animatedStats, setAnimatedStats] = useState({
    hotels: 0,
    bookings: 0,
    cities: 0,
    satisfaction: 0
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
      animateValue(0, 15000, 2000, 'hotels');
      animateValue(0, 2500000, 2000, 'bookings');
      animateValue(0, 250, 2000, 'cities');
      animateValue(0, 96, 2000, 'satisfaction');
    }, 500);
  }, []);

  const hotelCategories = [
    { name: 'Luxury Resorts', icon: Award, gradient: 'from-purple-500 to-pink-500' },
    { name: 'Business Hotels', icon: Shield, gradient: 'from-cyan-500 to-lime-500' },
    { name: 'Boutique Stays', icon: Heart, gradient: 'from-orange-500 to-red-500' },
    { name: 'Budget Friendly', icon: CreditCard, gradient: 'from-violet-500 to-purple-500' }
  ];

  const featuredHotels = [
    {
      id: 1,
      name: "The Oberoi Udaivilas",
      location: "Udaipur, Rajasthan",
      image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      reviews: 2847,
      price: 45000,
      originalPrice: 52000,
      category: "Luxury Resort",
      amenities: ['Wifi', 'Car', 'Coffee', 'Utensils', 'Dumbbell', 'Waves'],
      description: "Palatial luxury on the banks of Lake Pichola with traditional Rajasthani architecture",
      highlights: ["Lake View Rooms", "Royal Spa", "Heritage Tours", "Fine Dining"]
    },
    {
      id: 2,
      name: "The Leela Palace",
      location: "New Delhi",
      image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 1923,
      price: 28000,
      originalPrice: 35000,
      category: "Business Luxury",
      amenities: ['Wifi', 'Car', 'Coffee', 'Utensils', 'Dumbbell'],
      description: "Contemporary luxury in the heart of Delhi with world-class business facilities",
      highlights: ["Business Center", "Rooftop Pool", "Multiple Restaurants", "Airport Transfer"]
    },
    {
      id: 3,
      name: "Wildflower Hall",
      location: "Shimla, Himachal Pradesh",
      image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      reviews: 1456,
      price: 18000,
      originalPrice: 22000,
      category: "Mountain Resort",
      amenities: ['Wifi', 'Coffee', 'Utensils', 'Dumbbell', 'Waves'],
      description: "Himalayan retreat with breathtaking mountain views and adventure activities",
      highlights: ["Mountain Views", "Adventure Sports", "Spa Treatments", "Nature Walks"]
    },
    {
      id: 4,
      name: "Taj Mahal Palace",
      location: "Mumbai, Maharashtra",
      image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      reviews: 3521,
      price: 35000,
      originalPrice: 42000,
      category: "Heritage Luxury",
      amenities: ['Wifi', 'Car', 'Coffee', 'Utensils', 'Dumbbell', 'Waves'],
      description: "Iconic heritage hotel overlooking the Gateway of India with legendary hospitality",
      highlights: ["Heritage Architecture", "Harbor Views", "Multiple Dining", "Luxury Shopping"]
    },
    {
      id: 5,
      name: "Kumarakom Lake Resort",
      location: "Kerala",
      image: "https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.6,
      reviews: 987,
      price: 12000,
      originalPrice: 15000,
      category: "Backwater Resort",
      amenities: ['Wifi', 'Coffee', 'Utensils', 'Waves'],
      description: "Serene backwater resort with traditional Kerala architecture and Ayurvedic spa",
      highlights: ["Backwater Views", "Ayurvedic Spa", "Houseboat Rides", "Local Cuisine"]
    },
    {
      id: 6,
      name: "The Serai Jaisalmer",
      location: "Jaisalmer, Rajasthan",
      image: "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 1234,
      price: 22000,
      originalPrice: 28000,
      category: "Desert Resort",
      amenities: ['Wifi', 'Car', 'Coffee', 'Utensils', 'Dumbbell'],
      description: "Luxury desert camp with authentic Rajasthani experiences and camel safaris",
      highlights: ["Desert Safari", "Cultural Shows", "Luxury Tents", "Star Gazing"]
    }
  ];

  const amenityIcons = {
    'Wifi': Wifi,
    'Car': Car,
    'Coffee': Coffee,
    'Utensils': Utensils,
    'Dumbbell': Dumbbell,
    'Waves': Waves
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-orange-900/20 via-dark to-dark" />
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Hotels That Feel Like
            </span>
            <br />
            <span className="text-white">Home Away From Home</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light mb-12">
            Handpicked stays from luxury resorts to cozy boutiques
          </p>
          
          {/* Search Bar */}
          <div className="max-w-5xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="grid md:grid-cols-6 gap-4">
                  <div className="md:col-span-2 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Where are you going?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <select 
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4+ Guests</option>
                  </select>
                  <button className="btn-primary py-3 px-6 rounded-xl font-semibold bg-gradient-to-r from-orange-500 to-red-500">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Categories */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Find Your Perfect Stay
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hotelCategories.map((category, index) => (
              <div 
                key={category.name}
                className="feature-icon-card group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon size={32} className="text-white" />
                </div>
                <span className="feature-label">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-orange-900/10">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Featured Hotels & Resorts
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHotels.map((hotel, index) => (
              <div 
                key={hotel.id}
                className="feature-card group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-card-content">
                  <div className="relative overflow-hidden rounded-2xl mb-6">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        <span className="text-white text-sm font-medium">{hotel.rating}</span>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {Math.round(((hotel.originalPrice - hotel.price) / hotel.originalPrice) * 100)}% OFF
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <button className="bg-black/60 backdrop-blur-sm rounded-full p-2 hover:bg-black/80 transition-colors">
                        <Heart size={16} className="text-white" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-orange-400 text-sm font-medium">{hotel.category}</span>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-orange-400 transition-colors">
                      {hotel.name}
                    </h3>
                    <div className="flex items-center text-gray-400 mb-2">
                      <MapPin size={14} className="mr-1" />
                      <span className="text-sm">{hotel.location}</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">{hotel.description}</p>
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-4">
                      <Star size={16} className="text-yellow-400 fill-current mr-1" />
                      <span className="text-white font-medium">{hotel.rating}</span>
                      <span className="text-gray-400 text-sm ml-1">({hotel.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.map((amenity, i) => {
                      const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons];
                      return (
                        <div key={i} className="bg-white/5 rounded-lg p-2">
                          <IconComponent size={16} className="text-gray-400" />
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-2 mb-6">
                    <p className="text-gray-400 text-sm">Highlights:</p>
                    {hotel.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-300">
                        <ChevronRight size={14} className="text-orange-400 mr-2" />
                        {highlight}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-white">₹{hotel.price.toLocaleString()}</span>
                        <span className="text-gray-400 text-sm ml-2 line-through">₹{hotel.originalPrice.toLocaleString()}</span>
                      </div>
                      <span className="text-gray-400 text-sm">per night</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 btn-primary bg-gradient-to-r from-orange-500 to-red-500">
                      Book Now
                    </button>
                    <button className="btn-secondary p-3">
                      <Eye size={16} />
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

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-orange-900/20 to-red-900/20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Why Choose Journey Verse Hotels
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-black text-orange-400 mb-2">
                {animatedStats.hotels.toLocaleString()}+
              </div>
              <h3 className="text-xl font-semibold mb-2">Partner Hotels</h3>
              <p className="text-gray-400">Verified accommodations</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-red-400 mb-2">
                {(animatedStats.bookings / 1000000).toFixed(1)}M+
              </div>
              <h3 className="text-xl font-semibold mb-2">Happy Bookings</h3>
              <p className="text-gray-400">Successful reservations</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-pink-400 mb-2">
                {animatedStats.cities}+
              </div>
              <h3 className="text-xl font-semibold mb-2">Cities Covered</h3>
              <p className="text-gray-400">Across India and beyond</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-purple-400 mb-2">
                {animatedStats.satisfaction}%
              </div>
              <h3 className="text-xl font-semibold mb-2">Guest Satisfaction</h3>
              <p className="text-gray-400">Positive reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Book Your Perfect Stay
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            From luxury resorts to budget-friendly stays, find the perfect accommodation for your journey
          </p>
          <button className="btn-hero text-2xl px-16 py-5 bg-gradient-to-r from-orange-500 to-red-500">
            Explore All Hotels
          </button>
        </div>
      </section>
    </div>
  );
};

export default HotelsPage;