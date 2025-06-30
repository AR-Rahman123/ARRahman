import React from 'react';
import { Moon, Sun, Compass, Heart } from 'lucide-react';

export const PresenceInSalah: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-purple-900 via-slate-900 to-blue-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6">
              <Compass className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Presence in{' '}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Salah
              </span>{' '}
              Matters
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Uncover how complete presence and attentiveness during prayer, guided by the revealed text, 
              can transform your inner and outer life.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sun className="w-7 h-7 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Inner Transformation</h3>
              <p className="text-gray-400 leading-relaxed">
                Experience profound spiritual awakening as each word resonates with deeper meaning and purpose.
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-7 h-7 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Heart Connection</h3>
              <p className="text-gray-400 leading-relaxed">
                Forge an unbreakable bond with Allah through conscious, mindful engagement with His words.
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Moon className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Life Guidance</h3>
              <p className="text-gray-400 leading-relaxed">
                Let divine wisdom illuminate your path, bringing clarity and peace to every aspect of your life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};