import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Users, Armchair, UtensilsCrossed, Sparkles, Heart, Smile, ArrowRight } from 'lucide-react';

export const FamilyDining: React.FC = () => {
  const { openReservationModal } = useRestaurant();

  const familyFeatures = [
    {
      icon: Armchair,
      title: 'Spacious Seating',
      desc: 'Generous booth alcoves and wide banquette aisles allowing elder comfort and seamless stroller access.'
    },
    {
      icon: Smile,
      title: 'Family-Friendly Atmosphere',
      desc: 'Warm, respectful hospitality where children, parents, and grandparents are treated with genuine affection.'
    },
    {
      icon: Users,
      title: 'Large Group Tables',
      desc: 'Expansive round tables with lazy susan trays and banquet configurations accommodating 8 to 35 guests.'
    },
    {
      icon: UtensilsCrossed,
      title: 'Authentic Indian Food',
      desc: 'Generous communal copper platters, aromatic handis, and comforting dishes that evoke fond family memories.'
    },
    {
      icon: Heart,
      title: 'Customizable Dining Experiences',
      desc: 'Tailor spice levels for children, enjoy non-spicy satvik options, and customize multi-course family thalis.'
    },
    {
      icon: Sparkles,
      title: 'Comfortable Ambience',
      desc: 'Acoustically treated dining rooms that allow lively family conversations without deafening background noise.'
    }
  ];

  return (
    <section id="family" className="py-24 sm:py-32 bg-[#0f0d0b] relative overflow-hidden border-t border-[#231e17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading & Feature Pillars */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="flex items-center space-x-2 text-[#c5a059]">
              <Users className="w-4 h-4" />
              <span className="text-xs uppercase tracking-[0.3em] font-medium">
                Multi-Generational Gatherings
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl text-[#fbf7f0] font-normal tracking-wide leading-tight">
              Bring Everyone To The Table.
            </h2>

            <p className="font-serif italic text-lg sm:text-xl text-[#d4af37] font-light leading-relaxed">
              “From Sunday family dinners to special celebrations, Anhad Das is designed to make every generation feel at home.”
            </p>

            <p className="text-sm text-[#ada08e] font-light leading-relaxed">
              In Indian heritage, the dining table is sacred—it is where triumphs are recounted, laughter is shared across three generations, and timeless culinary traditions are renewed. We curate an atmosphere where elders dine in relaxed comfort, children feel welcome, and conversations flow late into the night.
            </p>

            {/* 6 Grid Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {familyFeatures.map((feat, idx) => {
                const IconComponent = feat.icon;
                return (
                  <div key={idx} className="p-4 bg-[#15130f] border border-[#262017] rounded-xs space-y-1.5 hover:border-[#c5a059]/40 transition-colors">
                    <div className="flex items-center space-x-2 text-[#c5a059]">
                      <IconComponent className="w-4 h-4" />
                      <h4 className="font-cinzel text-xs tracking-wider uppercase text-[#ece3d4] font-semibold">
                        {feat.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-[#968978] leading-relaxed font-light">
                      {feat.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button
                onClick={() => openReservationModal('Family Seating')}
                className="group px-8 py-4 bg-[#c5a059] text-black font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#d8b569] transition-all duration-300 inline-flex items-center space-x-3 shadow-xl"
              >
                <span>Plan A Family Dinner</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>

          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-xs overflow-hidden border border-[#c5a059]/30 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85"
                alt="Family dining banquet table at Anhad Das"
                className="w-full h-[480px] sm:h-[580px] object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/60 backdrop-blur-md border border-[#c5a059]/30">
                <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#c5a059] block mb-1">
                  The Royal Family Chamber
                </span>
                <p className="text-xs text-[#ded5c6] font-light">
                  Spacious banquet suites seating up to 35 guests with dedicated butler service and customized thalis.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
