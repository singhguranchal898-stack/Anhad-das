import React from 'react';
import { Sparkles } from 'lucide-react';

export const Marquee: React.FC = () => {
  const marqueeItems = [
    'AUTHENTIC INDIAN CUISINE',
    'FAMILY DINING',
    'PRIVATE CELEBRATIONS',
    'BIRTHDAYS',
    'ANNIVERSARIES',
    'CORPORATE EVENTS',
    'PREMIUM HOSPITALITY',
  ];

  return (
    <div
      id="marquee"
      className="relative w-full overflow-hidden py-4 sm:py-5 bg-[#12100d] border-y border-[#c5a059]/20 select-none z-10"
    >
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0c0b09] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0c0b09] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee whitespace-nowrap flex items-center">
        {/* Double repeated array for seamless infinite looping */}
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
          <div key={index} className="inline-flex items-center space-x-6 mx-4 sm:mx-6">
            <span className="font-cinzel text-xs sm:text-sm tracking-[0.3em] uppercase text-[#e4dacb] font-medium hover:text-[#c5a059] transition-colors">
              {item}
            </span>
            <span className="text-[#c5a059] text-xs opacity-75">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
};
