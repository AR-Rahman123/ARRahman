import React from 'react';
import { ChevronRight, Sparkles, ExternalLink } from 'lucide-react';

interface HeroProps {
  onJoinWaitlist: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onJoinWaitlist }) => {
  const handleMainPageRedirect = () => {
    window.open('/main', '_blank');
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-white">
              {/* Brand indicator */}
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
                <Sparkles className="w-4 h-4 text-purple-300" />
                <span className="text-sm font-medium text-purple-200">AR Rahman</span>
              </div>

              {/* Main headline */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Experience the{' '}
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                  Qur'an
                </span>{' '}
                Like Never Before
              </h1>
              
              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                Be among the first to access an Augmented Reality tool that brings the meaning of the Qur'an to life — directly during your prayer.
              </p>

              {/* Enhanced intro paragraph */}
              <div className="mb-12">
                <p className="text-lg text-gray-400 leading-relaxed">
                  We're pioneering a revolutionary approach to deepen your connection with Allah through cutting-edge Augmented Reality. 
                  Imagine understanding the divine words as they flow through your heart — experiencing real-time comprehension while you stand in prayer. 
                  This is the future of spiritual immersion, where technology serves the soul.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={onJoinWaitlist}
                  className="group inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-5 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-purple-500/25"
                >
                  <span>Join the Waitlist</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleMainPageRedirect}
                  className="group inline-flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-10 py-5 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <span>Visit Main Site</span>
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Community indicator */}
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full border-2 border-slate-900"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full border-2 border-slate-900"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full border-2 border-slate-900"></div>
                </div>
                <span className="text-sm">1,000+ believers on the waitlist</span>
              </div>
            </div>

            {/* Right Column - Video */}
            <div className="relative">
              <div className="relative bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                {/* YouTube Video Container */}
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                  <iframe
                    className="w-full h-full rounded-xl"
                    src="https://www.youtube.com/embed/f1pqhZO3Lik"
                    title="AR Rahman Demo - Experience the Qur'an Like Never Before"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Video Caption */}
                <div className="mt-4 text-center">
                  <p className="text-gray-300 text-sm">
                    Experience how AR technology transforms your prayer experience
                  </p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-blue-500/30 to-teal-500/30 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};