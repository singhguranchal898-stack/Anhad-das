import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { DINING_EXPERIENCES } from '../data/restaurantData';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { SeatingPreference } from '../types';

export const DiningExperience: React.FC = () => {
  const { openReservationModal } = useRestaurant();

  const mapExperienceToSeating = (id: string): SeatingPreference => {
    switch (id) {
      case 'family-dining':
        return 'Family Seating';
      case 'celebration-dining':
        return 'Celebration Table';
      case 'private-dining':
        return 'Private Dining';
      default:
        return 'Indoor Dining';
    }
  };

  return (
    <section id="experience" className="py-24 sm:py-32 bg-[#0c0b09] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#c5a059] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium">
              Spaces Designed For Every Milestone
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#f7eee2] font-normal tracking-wide mb-4">
            More Than A Meal.
          </h2>

          <p className="text-sm sm:text-base text-[#ada190] font-light leading-relaxed">
            Whether an intimate anniversary for two, a spirited multi-generational Sunday family gathering, or a high-profile private dinner, every setting is thoughtfully tailored.
          </p>
        </div>

        {/* 4 Large Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {DINING_EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="group bg-[#12100d] border border-[#2b251c] hover:border-[#c5a059]/60 rounded-xs overflow-hidden transition-all duration-500 flex flex-col shadow-2xl"
            >
              {/* Image with overlay */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12100d] via-black/30 to-black/20" />
                
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] tracking-[0.25em] uppercase font-cinzel text-[#c5a059] bg-black/75 px-3 py-1 border border-[#c5a059]/30">
                    {exp.tag}
                  </span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#f5ebd9] group-hover:text-[#c5a059] transition-colors mb-3">
                    {exp.title}
                  </h3>
                  
                  <p className="text-sm text-[#b2a593] font-light leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  {/* Feature Checkmarks */}
                  <div className="space-y-2 border-t border-[#231e17] pt-4">
                    {exp.features.map((feat, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-[#cbc0b0]">
                        <Check className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-2">
                  <button
                    onClick={() => openReservationModal(mapExperienceToSeating(exp.id))}
                    className="w-full py-3 bg-[#191612] hover:bg-[#c5a059] text-[#e0d5c5] hover:text-black border border-[#332b21] hover:border-[#c5a059] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Reserve {exp.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
