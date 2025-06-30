import React from 'react';
import { Users, Shield, Zap } from 'lucide-react';

interface JoinInnerCircleProps {
  onJoinWaitlist: () => void;
}

export const JoinInnerCircle: React.FC<JoinInnerCircleProps> = ({ onJoinWaitlist }) => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join the{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Waitlist
              </span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12">
              Be part of our early access community and help shape the future of spiritually intelligent technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Early Access</h3>
              <p className="text-gray-600 text-sm">Be the first to experience this revolutionary spiritual technology</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Shape the Future</h3>
              <p className="text-gray-600 text-sm">Your feedback will directly influence the development process</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-lg mb-4">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600 text-sm">Connect with like-minded believers on this spiritual journey</p>
            </div>
          </div>

          <button
            onClick={onJoinWaitlist}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-5 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-purple-500/25"
          >
            <span>Join the Waitlist</span>
            <Users className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};