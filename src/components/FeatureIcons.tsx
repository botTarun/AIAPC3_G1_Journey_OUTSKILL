import React from 'react';
import { Users, Bot, Package, DollarSign, BookOpen } from 'lucide-react';

const features = [
  { icon: Users, label: 'Collaboration', color: 'from-purple-500 to-pink-500' },
  { icon: Bot, label: 'AI Assistant', color: 'from-cyan-500 to-blue-500' },
  { icon: Package, label: 'Packing Checklist', color: 'from-lime-500 to-green-500' },
  { icon: DollarSign, label: 'Budgeting', color: 'from-orange-500 to-red-500' },
  { icon: BookOpen, label: 'Travel Guides', color: 'from-violet-500 to-purple-500' },
];

const FeatureIcons = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={feature.label}
              className="feature-icon-card group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`feature-icon bg-gradient-to-br ${feature.color}`}>
                <feature.icon size={24} />
              </div>
              <span className="feature-label">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureIcons;