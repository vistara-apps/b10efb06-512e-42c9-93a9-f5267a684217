'use client';

import { Cube, Sparkles, Star, Plus } from 'lucide-react';

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Top right cube */}
      <div className="absolute top-20 right-20 floating-element opacity-30">
        <Cube size={40} className="text-purple-300" />
      </div>
      
      {/* Left side envelope */}
      <div className="absolute top-1/3 left-10 floating-element opacity-40" style={{ animationDelay: '2s' }}>
        <div className="w-12 h-8 bg-purple-400 bg-opacity-30 rounded border border-purple-300 border-opacity-50"></div>
      </div>
      
      {/* Bottom right large cube */}
      <div className="absolute bottom-20 right-20 floating-element opacity-25" style={{ animationDelay: '4s' }}>
        <Cube size={60} className="text-pink-300" />
      </div>
      
      {/* Various stars and sparkles */}
      <div className="absolute top-1/4 left-1/4 floating-element opacity-40" style={{ animationDelay: '1s' }}>
        <Star size={16} className="text-yellow-300" />
      </div>
      
      <div className="absolute top-3/4 left-1/3 floating-element opacity-30" style={{ animationDelay: '3s' }}>
        <Sparkles size={20} className="text-blue-300" />
      </div>
      
      <div className="absolute top-1/2 right-1/4 floating-element opacity-35" style={{ animationDelay: '5s' }}>
        <Plus size={24} className="text-green-300" />
      </div>
      
      {/* Additional decorative elements */}
      <div className="absolute bottom-1/3 left-1/5 floating-element opacity-20" style={{ animationDelay: '6s' }}>
        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-50"></div>
      </div>
      
      <div className="absolute top-2/3 right-1/3 floating-element opacity-25" style={{ animationDelay: '7s' }}>
        <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-400 rounded opacity-60"></div>
      </div>
    </div>
  );
}
