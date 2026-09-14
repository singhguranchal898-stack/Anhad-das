import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Calendar, Utensils, ChevronDown } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Hero: React.FC = () => {
  const { openReservationModal } = useRestaurant();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {/* Background Image Layer with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=90"
          alt="Anhad Das Luxury Dining Pavilion"
          className="w-full h-full object-cover object-center transform scale-105 animate-[pulse_10s_ease-in-out_infinite] opacity-45 transition-transform duration-1000"
          style={{ animationDuration: '24s' }}
        />
        {/* Layered Gradient Overlays for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09] via-[#0c0b09]/75 to-black/60" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0c0b09]/50 to-[#0c0b09]/95" />
      </div>

      {/* Decorative Subtle Gold Frame Corners */}
      <div className="hidden md:block absolute top-28 left-12 w-16 h-16 border-t border-l border-[#c5a059]/30 pointer-events-none" />
      <div className="hidden md:block absolute top-28 right-12 w-16 h-16 border-t border-r border-[#c5a059]/30 pointer-events-none" />
      <div className="hidden md:block absolute bottom-20 left-12 w-16 h-16 border-b border-l border-[#c5a059]/30 pointer-events-none" />
      <div className="hidden md:block absolute bottom-20 right-12 w-16 h-16 border-b border-r border-[#c5a059]/30 pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Monogram / Royal Emblem */}
        <div className="mb-4 inline-flex items-center justify-center space-x-3 text-[#c5a059]">
          <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#c5a059]" />
          <span className="font-cinzel text-xs tracking-[0.4em] uppercase text-[#c5a059]">
            The Royal Destination
          </span>
          <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#c5a059]" />
        </div>

        {/* Hero Title */}
        <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.18em] text-[#fbf7f0] font-normal leading-[1.08] mb-6 drop-shadow-lg">
          ANHAD DAS
        </h1>

        {/* Tagline */}
        <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#d4af37] font-light tracking-wide max-w-3xl mb-6">
          “{RESTAURANT_INFO.tagline}”
        </p>

        {/* Supporting Narrative */}
        <p className="text-sm sm:text-base md:text-lg text-[#cdc3b4] font-light max-w-2xl leading-relaxed mb-10 tracking-wide">
          An elevated Indian dining experience crafted for memorable meals, intimate gatherings and unforgettable celebrations.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md">
          <button
            onClick={() => openReservationModal('Indoor Dining')}
            className="w-full sm:w-auto px-8 py-4 bg-[#c5a059] text-[#0d0c0a] font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#d8b569] transition-all duration-300 shadow-xl shadow-[#c5a059]/25 flex items-center justify-center space-x-2.5"
          >
            <Calendar className="w-4 h-4 text-black" />
            <span>Reserve a Table</span>
          </button>

          <button
            onClick={() => scrollToSection('menu')}
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#c5a059]/60 text-[#f0e8dc] hover:text-[#c5a059] hover:border-[#c5a059] text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center space-x-2.5 backdrop-blur-xs"
          >
            <Utensils className="w-4 h-4 text-[#c5a059]" />
            <span>Explore Menu</span>
          </button>
        </div>

        {/* Highlight Badges */}
        <div className="mt-14 pt-8 border-t border-[#c5a059]/15 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs tracking-widest text-[#a89d8d] uppercase">
          <span className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
            <span>Imperial Recipes</span>
          </span>
          <span className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
            <span>Grand Family Banquets</span>
          </span>
          <span className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
            <span>Private Dining Chambers</span>
          </span>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-center">
        <button
          onClick={() => scrollToSection('marquee')}
          className="group flex flex-col items-center text-[#9f9485] hover:text-[#c5a059] transition-colors focus:outline-none"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase mb-1.5 font-light">
            Scroll to Explore
          </span>
          <ChevronDown className="w-4 h-4 text-[#c5a059] animate-bounce" />
        </button>
      </div>
    </section>
  );
};
