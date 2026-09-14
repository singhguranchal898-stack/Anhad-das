import React, { useState } from 'react';
import { CUISINE_CATEGORIES } from '../data/restaurantData';
import { ChevronRight, Sparkles } from 'lucide-react';

export const SignatureCuisine: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="cuisine" className="py-24 bg-[#0e0d0b] border-t border-[#1f1c16] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#c5a059] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium">
              Regional Mastery & Imperial Heritage
            </span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f5eee3] font-normal leading-tight mb-4">
            The Art of Indian Cuisine
          </h2>
          
          <p className="text-sm sm:text-base text-[#b0a494] font-light leading-relaxed">
            From the royal court durbars of Lucknow to the vibrant rustic clay tandoors of Punjab, explore ten distinct traditions curated under one regal roof.
          </p>
        </div>

        {/* 10 Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {CUISINE_CATEGORIES.map((cat, index) => (
            <div
              key={cat.title}
              onClick={scrollToMenu}
              onMouseEnter={() => setActiveCategory(index)}
              className={`group relative h-80 rounded-xs overflow-hidden cursor-pointer border transition-all duration-500 ${
                activeCategory === index
                  ? 'border-[#c5a059] shadow-xl shadow-[#c5a059]/10'
                  : 'border-[#26211a] hover:border-[#c5a059]/60'
              }`}
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Shading Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-85 transition-opacity" />

              {/* Card Content */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                
                {/* Top Number */}
                <div className="flex justify-between items-center">
                  <span className="font-cinzel text-xs text-[#c5a059] tracking-widest">
                    0{index + 1}
                  </span>
                  <span className="text-[10px] text-[#e0d6c7] tracking-widest uppercase bg-black/40 px-2 py-0.5 rounded border border-[#c5a059]/20 backdrop-blur-xs">
                    Heritage
                  </span>
                </div>

                {/* Bottom Details */}
                <div className="space-y-1.5 transform transition-transform duration-300">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#c5a059] font-medium block">
                    {cat.subtitle}
                  </span>
                  <h3 className="font-serif text-xl text-[#fcf8f2] group-hover:text-[#c5a059] transition-colors leading-tight">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#b8ad9e] line-clamp-2 font-light leading-relaxed opacity-85 group-hover:opacity-100">
                    {cat.description}
                  </p>
                  
                  <div className="pt-2 flex items-center text-[10px] uppercase tracking-widest text-[#c5a059] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View In Menu</span>
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Explore Full Menu Hint */}
        <div className="mt-12 text-center">
          <button
            onClick={scrollToMenu}
            className="inline-flex items-center space-x-2 text-xs tracking-[0.25em] uppercase text-[#c5a059] hover:text-[#d6b46b] pb-1 border-b border-[#c5a059]/40 hover:border-[#c5a059] transition-all"
          >
            <span>Explore Complete À La Carte Menu</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
