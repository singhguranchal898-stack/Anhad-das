import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Sparkles, Calendar, PartyPopper, ArrowRight } from 'lucide-react';

export const FinalCta: React.FC = () => {
  const { openReservationModal, openEventModal } = useRestaurant();

  return (
    <section className="py-28 sm:py-36 bg-[#080706] relative overflow-hidden text-center border-t border-[#231e17]">
      
      {/* Golden radial background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c5a059]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        <div className="inline-flex items-center space-x-2 text-[#c5a059]">
          <span className="w-8 h-[1px] bg-[#c5a059]" />
          <span className="text-xs uppercase tracking-[0.35em] font-medium font-cinzel">
            An Uncompromising Invitation
          </span>
          <span className="w-8 h-[1px] bg-[#c5a059]" />
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#fbf7f0] font-normal tracking-wide leading-tight">
          Join Us For An Unforgettable Dining Experience.
        </h2>

        <p className="font-serif italic text-lg sm:text-xl text-[#d4af37] font-light max-w-2xl mx-auto leading-relaxed">
          “Whether it’s a quiet dinner, a family gathering, or a grand celebration, Anhad Das welcomes you to experience the finest Indian hospitality.”
        </p>

        {/* Dual Actions */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => openReservationModal('Indoor Dining')}
            className="w-full sm:w-auto px-9 py-4 bg-[#c5a059] text-black font-semibold text-xs tracking-[0.22em] uppercase hover:bg-[#d8b569] transition-all duration-300 shadow-xl flex items-center justify-center space-x-2"
          >
            <Calendar className="w-4 h-4 text-black" />
            <span>Reserve A Table</span>
          </button>

          <button
            onClick={() => openEventModal('Birthday')}
            className="w-full sm:w-auto px-9 py-4 bg-[#181511] text-[#fbf7f0] hover:text-black hover:bg-[#c5a059] border border-[#3e3425] hover:border-[#c5a059] font-medium text-xs tracking-[0.22em] uppercase transition-all duration-300 shadow-xl flex items-center justify-center space-x-2"
          >
            <PartyPopper className="w-4 h-4 text-[#c5a059]" />
            <span>Book A Celebration</span>
          </button>
        </div>

      </div>
    </section>
  );
};
