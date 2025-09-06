import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, MapPin, Calendar, Users, Clock, 
  Plane, Building, Car, Camera, Utensils, Train,
  Star, Heart, Share2, ChevronRight, Eye, CreditCard,
  Wifi, Coffee, Dumbbell, Waves, Shield, Award
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import BookingModal from './BookingModal';
import { type BookingItem } from '../lib/booking';

const BookingsPage = () => {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('flights');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBookingItem, setSelectedBookingItem] = useState<BookingItem | null>(null);
  const [animatedStats, setAnimatedStats] = useState({
    bookings: 0,
    partners: 0,
    destinations: 0,
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
      animateValue(0, 5000000, 2000, 'bookings');
      animateValue(0, 25000, 2000, 'partners');
      animateValue(0, 500, 2000, 'destinations');
      animateValue(0, 98, 2000, 'satisfaction');
    }, 500);
  }, []);

  const bookingCategories = [
    {
      id: 'flights',
      name: 'Flights',
      icon: Plane,
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Book flights with seat selection and check-in reminders',
      features: ['Seat Selection', 'Check-in Reminders', 'Baggage Options', 'Meal Preferences']
    },
    {
      id: 'hotels',
      name: 'Hotels & Accommodation',
      icon: Building,
      gradient: 'from-purple-500 to-pink-500',
      description: 'Find perfect stays with flexible dates and room options',
      features: ['Flexible Dates', 'Room Details', 'Amenities Filter', 'Guest Reviews']
    },
    {
      id: 'cars',
      name: 'Car Rentals',
      icon: Car,
      gradient: 'from-green-500 to-lime-500',
      description: 'Rent cars with flexible pickup and return options',
      features: ['Pickup/Return', 'Insurance Options', 'GPS Navigation', 'Fuel Policy']
    },
    {
      id: 'activities',
      name: 'Activities & Tours',
      icon: Camera,
      gradient: 'from-orange-500 to-red-500',
      description: 'Discover experiences with detailed meeting points and requirements',
      features: ['Meeting Points', 'Duration Info', 'Requirements', 'Group Discounts']
    },
    {
      id: 'restaurants',
      name: 'Restaurants',
      icon: Utensils,
      gradient: 'from-pink-500 to-rose-500',
      description: 'Reserve tables with dietary preferences and party size options',
      features: ['Reservation Times', 'Party Size', 'Dietary Needs', 'Special Occasions']
    },
    {
      id: 'transportation',
      name: 'Transportation',
      icon: Train,
      gradient: 'from-indigo-500 to-purple-500',
      description: 'Book trains, buses, and ferries with real-time schedules',
      features: ['Real-time Schedules', 'Route Planning', 'Seat Reservations', 'Mobile Tickets']
    }
  ];

  const featuredDeals = [
    {
      id: 1,
      category: 'flights',
      title: 'Delhi to Mumbai',
      subtitle: 'Round Trip',
      image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 8500,
      originalPrice: 12000,
      rating: 4.8,
      provider: 'IndiGo',
      features: ['Direct Flight', 'Seat Selection', 'Meal Included']
    },
    {
      id: 2,
      category: 'hotels',
      title: 'The Taj Mahal Palace',
      subtitle: 'Mumbai',
      image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 25000,
      originalPrice: 30000,
      rating: 4.9,
      provider: 'Taj Hotels',
      features: ['Sea View', 'Spa Access', 'Fine Dining']
    },
    {
      id: 3,
      category: 'cars',
      title: 'Maruti Swift Dzire',
      subtitle: 'Compact Sedan',
      image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 2500,
      originalPrice: 3000,
      rating: 4.6,
      provider: 'Zoomcar',
      features: ['AC', 'GPS', 'Insurance Included']
    },
    {
      id: 4,
      category: 'activities',
      title: 'Golden Triangle Tour',
      subtitle: '3 Days Delhi-Agra-Jaipur',
      image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 15000,
      originalPrice: 18000,
      rating: 4.7,
      provider: 'India Tours',
      features: ['Guide Included', 'Transport', 'Monument Entry']
    },
    {
      id: 5,
      category: 'restaurants',
      title: 'Bukhara Restaurant',
      subtitle: 'ITC Maurya, Delhi',
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 4500,
      originalPrice: 5000,
      rating: 4.8,
      provider: 'ITC Hotels',
      features: ['Michelin Recommended', 'Live Kitchen', 'Vegetarian Options']
    },
    {
      id: 6,
      category: 'transportation',
      title: 'Rajdhani Express',
      subtitle: 'Delhi to Mumbai',
      image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 3500,
      originalPrice: 4000,
      rating: 4.5,
      provider: 'Indian Railways',
      features: ['AC Coach', 'Meals Included', 'Bedding']
    }
  ];

  const filteredDeals = activeCategory === 'all' 
    ? featuredDeals 
    : featuredDeals.filter(deal => deal.category === activeCategory);

  // Map plural category names to singular item types for database
  const categoryToItemType = {
    'flights': 'flight',
    'hotels': 'hotel',
    'cars': 'car',
    'activities': 'activity',
    'restaurants': 'restaurant',
    'transportation': 'transportation'
  };

  const handleBookNow = (deal: any) => {
    if (!user) {
      alert('Please sign in to make a booking');
      return;
    }

    const bookingItem: BookingItem = {
      type: categoryToItemType[deal.category as keyof typeof categoryToItemType] as any,
      name: deal.title,
      description: deal.subtitle,
      provider: deal.provider,
      quantity: 1,
      unitPrice: deal.price,
      itemData: deal,
    };

    setSelectedBookingItem(bookingItem);
    setBookingModalOpen(true);
  };
  return (
    <>
      <div className="min-h-screen bg-dark text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-dark to-dark" />
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Book Everything
            </span>
            <br />
            <span className="text-white">In One Place</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light mb-12">
            Flights, Hotels, Cars, Activities, Restaurants & Transportation
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="grid md:grid-cols-5 gap-4">
                  <div className="md:col-span-2 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Where are you going?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <input
                    type="date"
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="date"
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
                  />
                  <button className="btn-primary py-3 px-6 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-cyan-500">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Categories */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              What Would You Like to Book?
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookingCategories.map((category, index) => (
              <div 
                key={category.id}
                className={`feature-card group cursor-pointer ${
                  activeCategory === category.id ? 'ring-2 ring-blue-500' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setActiveCategory(category.id)}
              >
                <div className="feature-card-content">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-gray-400 mb-4">{category.description}</p>
                  <div className="space-y-2">
                    {category.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-300">
                        <ChevronRight size={14} className="text-blue-400 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-blue-900/10">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Featured Deals & Offers
            </span>
          </h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              All Categories
            </button>
            {bookingCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeCategory === category.id 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDeals.map((deal, index) => (
              <div 
                key={deal.id}
                className="feature-card group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-card-content">
                  <div className="relative overflow-hidden rounded-2xl mb-6">
                    <img 
                      src={deal.image} 
                      alt={deal.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        <span className="text-white text-sm font-medium">{deal.rating}</span>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)}% OFF
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-blue-400 text-sm font-medium">{deal.provider}</span>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-blue-400 transition-colors">
                      {deal.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{deal.subtitle}</p>
                  </div>

                  <div className="space-y-2 mb-6">
                    {deal.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-300">
                        <ChevronRight size={14} className="text-blue-400 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-white">₹{deal.price.toLocaleString()}</span>
                        <span className="text-gray-400 text-sm ml-2 line-through">₹{deal.originalPrice.toLocaleString()}</span>
                      </div>
                      <span className="text-gray-400 text-sm">per person</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleBookNow(deal)}
                      className="flex-1 btn-primary bg-gradient-to-r from-blue-500 to-cyan-500"
                    >
                      Book Now
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

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Trusted Booking Platform
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-black text-blue-400 mb-2">
                {(animatedStats.bookings / 1000000).toFixed(1)}M+
              </div>
              <h3 className="text-xl font-semibold mb-2">Successful Bookings</h3>
              <p className="text-gray-400">Completed reservations</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-cyan-400 mb-2">
                {animatedStats.partners.toLocaleString()}+
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Partners</h3>
              <p className="text-gray-400">Airlines, hotels, and more</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-purple-400 mb-2">
                {animatedStats.destinations}+
              </div>
              <h3 className="text-xl font-semibold mb-2">Destinations</h3>
              <p className="text-gray-400">Cities worldwide</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-pink-400 mb-2">
                {animatedStats.satisfaction}%
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
              <p className="text-gray-400">Happy travelers</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Start Your Journey Today
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Book flights, hotels, cars, activities, restaurants, and transportation all in one place
          </p>
          <button className="btn-hero text-2xl px-16 py-5 bg-gradient-to-r from-blue-500 to-cyan-500">
            Start Booking Now
          </button>
        </div>
      </section>
    </div>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        bookingItem={selectedBookingItem}
      />
    </>
  );
};

export default BookingsPage;