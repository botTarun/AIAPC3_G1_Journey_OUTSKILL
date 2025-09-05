import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, MapPin, Clock, DollarSign, Users, 
  Star, Heart, Share2, Calendar, ChevronRight, 
  Compass, Mountain, Sparkles, Crown, 
  Brain, Zap, UserCheck, Headphones,
  Play, ArrowRight, Quote
} from 'lucide-react';

const ExperiencesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    location: '',
    type: '',
    budget: '',
    duration: ''
  });
  const [animatedStats, setAnimatedStats] = useState({
    experiences: 0,
    experts: 0,
    bookings: 0,
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
      animateValue(0, 50000, 2000, 'experiences');
      animateValue(0, 2500, 2000, 'experts');
      animateValue(0, 100000, 2000, 'bookings');
      animateValue(0, 98, 2000, 'satisfaction');
    }, 500);
  }, []);

  const experienceCategories = [
    {
      title: "For the Culture Seekers",
      subtitle: "Authentic Local Immersion",
      description: "Cooking classes, street art tours, tea ceremonies",
      icon: Compass,
      gradient: "from-purple-500 to-pink-500",
      experiences: ["Traditional Cooking Classes", "Street Art Walking Tours", "Tea Ceremony Workshops", "Local Market Adventures"]
    },
    {
      title: "For the Thrill Chasers",
      subtitle: "Adventures That Push Boundaries",
      description: "Helicopter landings, night diving, volcano boarding",
      icon: Mountain,
      gradient: "from-cyan-500 to-lime-500",
      experiences: ["Helicopter Glacier Landings", "Night Diving Expeditions", "Volcano Boarding", "Bungee Jumping"]
    },
    {
      title: "For the Soul Searchers",
      subtitle: "Transformative Journeys",
      description: "Meditation retreats, Northern Lights, desert camping",
      icon: Sparkles,
      gradient: "from-orange-500 to-red-500",
      experiences: ["Silent Meditation Retreats", "Northern Lights Chasing", "Desert Camping", "Spiritual Pilgrimages"]
    },
    {
      title: "For the Luxury Lovers",
      subtitle: "Elevated Experiences",
      description: "Yacht charters, Michelin dinners, wine tastings",
      icon: Crown,
      gradient: "from-violet-500 to-purple-500",
      experiences: ["Private Yacht Charters", "Michelin Star Dinners", "Exclusive Wine Tastings", "Luxury Safari Tours"]
    }
  ];

  const whyJourneyFeatures = [
    {
      icon: Brain,
      title: "Smart Discovery",
      description: "AI-powered recommendations based on your preferences and travel history",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Seamless Booking",
      description: "One-click booking with instant confirmation and flexible cancellation",
      gradient: "from-cyan-500 to-lime-500"
    },
    {
      icon: UserCheck,
      title: "Group Harmony",
      description: "Collaborative planning tools to keep everyone happy and engaged",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Headphones,
      title: "Real-Time Support",
      description: "24/7 assistance from local experts whenever you need help",
      gradient: "from-violet-500 to-purple-500"
    }
  ];

  const featuredCollections = [
    {
      title: "First-Timer's Paradise",
      tagline: "Perfect starter experiences for new adventurers",
      image: "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=400",
      experiences: 127
    },
    {
      title: "Off-the-Beaten-Path",
      tagline: "Hidden gems only locals know about",
      image: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=400",
      experiences: 89
    },
    {
      title: "Romantic Escapes",
      tagline: "Unforgettable moments for couples",
      image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400",
      experiences: 156
    },
    {
      title: "Family Adventures",
      tagline: "Fun for all ages and energy levels",
      image: "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=400",
      experiences: 203
    },
    {
      title: "Solo Wanderer",
      tagline: "Safe, social experiences for independent travelers",
      image: "https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400",
      experiences: 94
    },
    {
      title: "Business + Pleasure",
      tagline: "Extend your work trip into an adventure",
      image: "https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=400",
      experiences: 67
    }
  ];

  const howItWorksSteps = [
    {
      step: 1,
      title: "Tell Us Your Vibe",
      description: "Share your interests, budget, and travel style",
      icon: Heart
    },
    {
      step: 2,
      title: "Discover Magic",
      description: "Browse AI-curated experiences tailored to you",
      icon: Sparkles
    },
    {
      step: 3,
      title: "Plan Together",
      description: "Collaborate with friends and get expert advice",
      icon: Users
    },
    {
      step: 4,
      title: "Book Instantly",
      description: "Secure your spot with one-click booking",
      icon: Zap
    },
    {
      step: 5,
      title: "Live Fully",
      description: "Create memories that last a lifetime",
      icon: Star
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      location: "San Francisco, CA",
      rating: 5,
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
      text: "Journey Verse helped me discover hidden gems in Tokyo I never would have found on my own. The local cooking class was absolutely magical!"
    },
    {
      name: "Marcus Rodriguez",
      location: "Austin, TX",
      rating: 5,
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
      text: "Planning our group trip to Iceland was seamless. Everyone could vote on activities and we found the perfect Northern Lights tour!"
    },
    {
      name: "Emma Thompson",
      location: "London, UK",
      rating: 5,
      image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150",
      text: "The 24/7 support saved our vacation when our original plans fell through. They found us an even better alternative within hours!"
    }
  ];

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-dark to-dark" />
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              Experiences That Transform
            </span>
            <br />
            <span className="text-white">Your Journey</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light mb-12">
            Discover. Connect. Create Memories That Last a Lifetime.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="grid md:grid-cols-5 gap-4">
                  <div className="md:col-span-2 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Where do you want to explore?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>
                  <select 
                    value={selectedFilters.type}
                    onChange={(e) => setSelectedFilters({...selectedFilters, type: e.target.value})}
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="">Experience Type</option>
                    <option value="culture">Culture</option>
                    <option value="adventure">Adventure</option>
                    <option value="luxury">Luxury</option>
                    <option value="wellness">Wellness</option>
                  </select>
                  <select 
                    value={selectedFilters.budget}
                    onChange={(e) => setSelectedFilters({...selectedFilters, budget: e.target.value})}
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="">Budget</option>
                    <option value="budget">Under $100</option>
                    <option value="mid">$100 - $500</option>
                    <option value="luxury">$500+</option>
                  </select>
                  <button className="btn-primary py-3 px-6 rounded-xl font-semibold">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Categories Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Find Your Perfect Experience
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {experienceCategories.map((category, index) => (
              <div 
                key={category.title}
                className="feature-card group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-card-content">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                  <h4 className="text-lg text-purple-400 mb-3">{category.subtitle}</h4>
                  <p className="text-gray-400 mb-6">{category.description}</p>
                  <div className="space-y-2">
                    {category.experiences.map((exp, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-300">
                        <ChevronRight size={16} className="text-purple-400 mr-2" />
                        {exp}
                      </div>
                    ))}
                  </div>
                  <button className="mt-6 btn-secondary w-full group-hover:bg-white/20 transition-all duration-300">
                    Explore Experiences
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Journey Makes It Better */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-cyan-500 to-lime-500 bg-clip-text text-transparent">
              Why Journey Verse Makes It Better
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyJourneyFeatures.map((feature, index) => (
              <div 
                key={feature.title}
                className="text-center group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon size={36} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Featured Collections
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCollections.map((collection, index) => (
              <div 
                key={collection.title}
                className="group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img 
                    src={collection.image} 
                    alt={collection.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white">
                      <span className="text-sm font-medium">{collection.experiences} experiences</span>
                      <Heart size={20} className="hover:fill-red-500 transition-colors cursor-pointer" />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                  {collection.title}
                </h3>
                <p className="text-gray-400 mb-4">{collection.tagline}</p>
                <button className="text-purple-400 hover:text-purple-300 font-medium flex items-center">
                  View Collection <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience the Difference Stats */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-lime-500 to-cyan-500 bg-clip-text text-transparent">
              Experience the Difference
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-black text-purple-400 mb-2">
                {animatedStats.experiences.toLocaleString()}+
              </div>
              <h3 className="text-xl font-semibold mb-2">Handpicked Experiences</h3>
              <p className="text-gray-400">Curated by travel experts worldwide</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-cyan-400 mb-2">
                {animatedStats.experts.toLocaleString()}+
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Expert Network</h3>
              <p className="text-gray-400">Passionate locals sharing their secrets</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-lime-400 mb-2">
                {animatedStats.bookings.toLocaleString()}+
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainable Travel</h3>
              <p className="text-gray-400">Supporting local communities</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-orange-400 mb-2">
                {animatedStats.satisfaction}%
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Booking Guarantee</h3>
              <p className="text-gray-400">Confirmed within minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Timeline */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <div className="max-w-4xl mx-auto">
            {howItWorksSteps.map((step, index) => (
              <div key={step.step} className="flex items-center mb-12 last:mb-0">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl mr-8">
                  {step.step}
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-2 flex items-center">
                    <step.icon size={24} className="text-purple-400 mr-3" />
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-lg">{step.description}</p>
                </div>
                {index < howItWorksSteps.length - 1 && (
                  <div className="absolute left-8 mt-16 w-0.5 h-12 bg-gradient-to-b from-purple-500 to-pink-500 opacity-30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-cyan-900/10">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              What Travelers Say
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.name}
                className="feature-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-card-content">
                  <Quote size={32} className="text-purple-400 mb-4" />
                  <p className="text-gray-300 mb-6 leading-relaxed">{testimonial.text}</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.location}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={14} className="text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              Ready to Transform Your Journey?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of travelers who've discovered their perfect experiences through Journey Verse
          </p>
          <button className="btn-hero text-2xl px-16 py-5">
            Explore Experiences Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default ExperiencesPage;