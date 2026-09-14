import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { CELEBRATION_TYPES } from '../data/restaurantData';
import { Sparkles, ArrowRight, PartyPopper } from 'lucide-react';
import { EventType } from '../types';

export const CelebrationsParties: React.FC = () => {
  const { openEventModal } = useRestaurant();

  const mapCelebrationToType = (id: string): EventType => {
    switch (id) {
      case 'birthday':
        return 'Birthday';
      case 'anniversary':
        return 'Anniversary';
      case 'family-functions':
        return 'Family Party';
      case 'corporate-events':
        return 'Corporate Event';
      case 'private-parties':
        return 'Private Parties' as any;
      default:
        return 'Other';
    }
  };

  const scrollToBooking = (type: EventType) => {
    const el = document.getElementById('event-booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      openEventModal(type);
    }
  };

  return (
    <section id="celebrations" className="py-24 sm:py-32 bg-[#0c0b09] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#c5a059] mb-3">
            <PartyPopper className="w-3.5 h-3.5" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium">
              Bespoke Event Celebrations
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#fbf7f0] font-normal tracking-wide mb-4">
            Your Celebration. Our Stage.
          </h2>

          <p className="text-sm sm:text-base text-[#ada190] font-light leading-relaxed">
            From intimate golden wedding anniversaries to grand corporate triumphs and milestone birthdays, we turn every special occasion into a cherished memory.
          </p>
        </div>

        {/* Celebrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CELEBRATION_TYPES.map((item) => (
            <div
              key={item.id}
              className="group bg-[#12100d] border border-[#2b251c] hover:border-[#c5a059]/60 rounded-xs overflow-hidden flex flex-col justify-between transition-all duration-500 shadow-2xl"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12100d] via-black/40 to-transparent" />
                  
                  <div className="absolute top-4 right-4 bg-black/75 px-3 py-1 border border-[#c5a059]/30">
                    <span className="text-[10px] text-[#c5a059] tracking-wider uppercase font-cinzel">
                      {item.capacity}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-medium block">
                    {item.subtitle}
                  </span>

                  <h3 className="font-serif text-2xl text-[#f5ebd9] group-hover:text-[#c5a059] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#ada190] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => scrollToBooking(mapCelebrationToType(item.id))}
                  className="w-full py-3 bg-[#181511] hover:bg-[#c5a059] text-[#ded3c3] hover:text-black border border-[#2f281e] hover:border-[#c5a059] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Plan {item.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 sm:p-8 bg-[#15120e] border border-[#c5a059]/30 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-xl sm:text-2xl text-[#f7eee2]">
              Need Bespoke Floral Decor & Live Instrumental Music?
            </h4>
            <p className="text-xs sm:text-sm text-[#a89d8d] font-light">
              Our celebration concierge handles customized printed menus, table floral styling, and anniversary cakes.
            </p>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('event-booking');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="shrink-0 px-8 py-3.5 bg-[#c5a059] text-black font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#d8b569] transition-all shadow-lg"
          >
            Plan Your Celebration
          </button>
        </div>

      </div>
    </section>
  );
};
