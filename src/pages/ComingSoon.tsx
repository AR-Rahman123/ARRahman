import React from 'react';
import { ArrowLeft, Sparkles, Clock, Bell, Star } from 'lucide-react';

export const ComingSoon: React.FC = () => {
  const handleGoBack = () => {
    window.close();
    // Fallback if window.close() doesn't work
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Brand indicator */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span className="text-sm font-medium text-purple-200">AR Rahman</span>
          </div>

          {/* Main Content */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-full mb-8 border border-white/10">
              <Clock className="w-12 h-12 text-purple-300" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                Coming Soon
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              We're crafting something extraordinary for the AR Rahman experience. 
              Our main website is currently under development.
            </p>

            <div className="max-w-2xl mx-auto mb-12">
              <p className="text-lg text-gray-400 leading-relaxed">
                While we perfect every detail of our main platform, you can still join our waitlist 
                to be among the first to experience this revolutionary spiritual technology.
              </p>
            </div>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg mb-4">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Early Access</h3>
              <p className="text-gray-400 text-sm">Be the first to experience AR Rahman when we launch</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Premium Experience</h3>
              <p className="text-gray-400 text-sm">Cutting-edge AR technology for spiritual enhancement</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-teal-500 to-purple-500 rounded-lg mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Innovation</h3>
              <p className="text-gray-400 text-sm">Revolutionary approach to Qur'anic understanding</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
            <h3 className="text-2xl font-bold mb-6">What We're Building</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-purple-300">Product Showcase</h4>
                    <p className="text-gray-400 text-sm">Detailed AR Rahman features and capabilities</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-blue-300">Technology Deep Dive</h4>
                    <p className="text-gray-400 text-sm">How our AR technology enhances prayer experience</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-teal-300">Community Hub</h4>
                    <p className="text-gray-400 text-sm">Connect with fellow believers on this journey</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-purple-300">Launch Updates</h4>
                    <p className="text-gray-400 text-sm">Real-time progress and release information</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mb-8">
            <p className="text-gray-300 mb-6">
              Don't miss out on this revolutionary spiritual technology
            </p>
            <button
              onClick={handleGoBack}
              className="group inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-5 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-purple-500/25"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Waitlist</span>
            </button>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-500 text-sm">
            <p>© 2024 AR Rahman. Revolutionizing spiritual technology.</p>
          </div>
        </div>
      </div>
    </div>
  );
};