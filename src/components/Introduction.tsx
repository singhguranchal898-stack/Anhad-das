import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { ArrowRight, Flame, HeartHandshake, Sparkles } from 'lucide-react';

export const Introduction: React.FC = () => {
  const { openStoryModal } = useRestaurant();

  return (
    <section id="story" className="py-24 sm:py-32 bg-[#0c0b09] relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#c5a059]/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#c5a059]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Large Editorial Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 overflow-hidden rounded-xs border border-[#c5a059]/20 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85"
                alt="Anhad Das Grand Dining Room"
                className="w-full h-[450px] sm:h-[540px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Image Badge / Caption */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-[#d6cdbf]">
                <span className="font-cinzel tracking-[0.2em] uppercase text-[#c5a059]">
                  Pavilion of Heritage
                </span>
                <span className="font-serif italic text-sm">
                  Est. Civil Lines
                </span>
              </div>
            </div>

            {/* Inset Secondary Visual Accent */}
            <div className="hidden sm:block absolute -bottom-8 -right-8 z-20 w-48 h-48 rounded-xs border-2 border-[#c5a059]/40 overflow-hidden shadow-2xl bg-[#14120e]">
              <img
                src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
                alt="Simmering Heritage Dal Makhani"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-6 space-y-8 lg:pl-4">
            
            {/* Small Label */}
            <div className="flex items-center space-x-3">
              <span className="w-6 h-[1px] bg-[#c5a059]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#c5a059] font-medium">
                THE ANHAD DAS EXPERIENCE
              </span>
            </div>

            {/* Large Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-[#f4eee4] leading-[1.15] font-normal">
              A Table Made For Every Occasion.
            </h2>

            {/* Editorial Description */}
            <p className="text-base sm:text-lg text-[#cdc3b4] font-light leading-relaxed">
              “Anhad Das brings together the richness of Indian cuisine, refined hospitality and an atmosphere designed for people to come together.”
            </p>

            <p className="text-sm text-[#a89d8d] leading-relaxed font-light">
              Rooted in the timeless traditions of ancient royal kitchens and celebratory banquet halls, our culinary philosophy honors age-old recipes: clay tandoors heated with aromatic wood embers, slow dum-pukht handis sealed with dough, and hand-ground spices stone-milled in small batches. Here, dining is never rushed—it is savored in good company.
            </p>

            {/* Three Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#26221b]">
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[#c5a059]">
                  <Flame className="w-4 h-4" />
                  <h4 className="font-cinzel text-xs tracking-wider uppercase text-[#f0e8dc] font-semibold">
                    Authentic Flavours
                  </h4>
                </div>
                <p className="text-xs text-[#9d9282] leading-relaxed">
                  Centuries-old regional techniques, untamed spices, and recipes passed down through master khansamas.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[#c5a059]">
                  <HeartHandshake className="w-4 h-4" />
                  <h4 className="font-cinzel text-xs tracking-wider uppercase text-[#f0e8dc] font-semibold">
                    Warm Hospitality
                  </h4>
                </div>
                <p className="text-xs text-[#9d9282] leading-relaxed">
                  Indian hospitality at its most genuine: gracious, attentive, and welcoming to every generation.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[#c5a059]">
                  <Sparkles className="w-4 h-4" />
                  <h4 className="font-cinzel text-xs tracking-wider uppercase text-[#f0e8dc] font-semibold">
                    Elegant Ambience
                  </h4>
                </div>
                <p className="text-xs text-[#9d9282] leading-relaxed">
                  Deep charcoal stones, muted gold accents, intimate lighting, and spacious seating designed for celebration.
                </p>
              </div>

            </div>

            {/* Call to Action Button */}
            <div className="pt-2">
              <button
                onClick={openStoryModal}
                className="group inline-flex items-center space-x-3 text-xs tracking-[0.2em] uppercase text-[#c5a059] font-medium hover:text-[#e4be6c] transition-colors"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
