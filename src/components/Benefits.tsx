import React from 'react';
import { BarChart3, Target, Rocket } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: BarChart3,
      title: 'Get your Personal Brand Score',
      description: 'Discover exactly where you stand with our comprehensive assessment'
    },
    {
      icon: Target,
      title: 'Receive a personalized action plan',
      description: 'Get tailored recommendations based on your unique situation'
    },
    {
      icon: Rocket,
      title: 'Learn how to improve your online presence',
      description: 'Access proven strategies to boost your influence and reach'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Discover Your Brand Potential
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};