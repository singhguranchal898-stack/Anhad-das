import React from 'react';
import { Flame, Sparkles, Award, Utensils } from 'lucide-react';

export const ChefSection: React.FC = () => {
  const craftPillars = [
    {
      title: 'Charcoal Clay Tandoor',
      desc: 'Sustained at 450°C using aged babool wood and charcoal, providing unmatched rustic caramelization and aroma.'
    },
    {
      title: 'Dough-Sealed Dum Pukht',
      desc: 'Heavy brass degs sealed with whole wheat dough, slow-trapping volatile cardamom oils and saffron vapor.'
    },
    {
      title: 'Stone-Milled Masalas',
      desc: 'Whole spices lightly roasted on cast-iron sigris and hand-ground daily to preserve volatile essential oils.'
    },
    {
      title: 'Pure Desi Ghee & Cultured Butter',
      desc: 'Sourced from artisanal dairy cooperatives, bringing clean depth, richness, and royal authenticity.'
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#0c0b09] relative border-t border-[#231e17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Chef & Kitchen Imagery Bento */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-64 rounded-xs overflow-hidden border border-[#2d261c] relative group shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80"
                  alt="Culinary Master Plating"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest text-[#c5a059] font-cinzel">
                  Executive Chef & Khansama
                </span>
              </div>

              <div className="h-44 rounded-xs overflow-hidden border border-[#2d261c] relative group shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80"
                  alt="Clay Oven Charcoal Tandoor"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest text-[#c5a059] font-cinzel">
                  450°C Live Charcoal Tandoor
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="h-44 rounded-xs overflow-hidden border border-[#2d261c] relative group shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"
                  alt="Spices and Saffron Preparation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest text-[#c5a059] font-cinzel">
                  Hand-Ground Whole Masalas
                </span>
              </div>

              <div className="h-64 rounded-xs overflow-hidden border border-[#2d261c] relative group shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80"
                  alt="Artisanal Plating with Silver Vark"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest text-[#c5a059] font-cinzel">
                  Artisanal Heritage Plating
                </span>
              </div>
            </div>
          </div>

          {/* Right: Culinary Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="flex items-center space-x-2 text-[#c5a059]">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs uppercase tracking-[0.3em] font-medium">
                Culinary Heritage & Philosophy
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl text-[#fbf7f0] font-normal tracking-wide leading-tight">
              Crafted With Intention.
            </h2>

            <p className="font-serif italic text-lg sm:text-xl text-[#d4af37] font-light leading-relaxed">
              “Every dish begins with carefully selected ingredients, traditional techniques and a passion for Indian flavours.”
            </p>

            <p className="text-sm text-[#ada190] leading-relaxed font-light">
              Under the stewardship of our culinary culinary masters, the Anhad Das kitchen operates as a sanctuary of patience. We do not use commercial gravy bases, artificial colorings, or shortcut tenderizers. Instead, we uphold the slow traditions of our ancestors: marinating overnight in yogurt and wild spices, slowly reducing onions until naturally sweet, and presenting food with reverent hospitality.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#231e17]">
              {craftPillars.map((p, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center space-x-2 text-[#c5a059]">
                    <Flame className="w-3.5 h-3.5" />
                    <h4 className="font-cinzel text-xs uppercase tracking-wider text-[#e6dcce] font-semibold">
                      {p.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-[#938676] font-light leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <span className="text-xs text-[#8f8272] tracking-wider uppercase font-cinzel block">
                Executive Chef & Master Culinary Guild — Anhad Das
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
