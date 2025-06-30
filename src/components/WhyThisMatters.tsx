import React from 'react';
import { Heart, Focus, Lightbulb, Star } from 'lucide-react';

export const WhyThisMatters: React.FC = () => {
  const benefits = [
    {
      icon: Focus,
      title: 'Supercharge your focus and connection in prayer',
      description: 'Experience unprecedented concentration as the meaning unfolds before you in real-time'
    },
    {
      icon: Heart,
      title: 'Help prevent your mind from drifting',
      description: 'Stay present and engaged with divine guidance that keeps your heart anchored'
    },
    {
      icon: Lightbulb,
      title: 'Deepen your spiritual awareness',
      description: 'Unlock layers of meaning that transform your understanding of each verse'
    },
    {
      icon: Star,
      title: 'Put you on a path to ihsan (excellence in worship)',
      description: 'Achieve the highest level of worship through conscious, mindful connection'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why This{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Matters
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover how real-time Qur'anic understanding can transform your spiritual journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};