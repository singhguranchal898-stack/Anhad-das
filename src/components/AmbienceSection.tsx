import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';

export const AmbienceSection: React.FC = () => {
  const { openReservationModal } = useRestaurant();

  const ambienceFeatures = [
    {
      id: 'interiors',
      title: 'Carved Sandstone & Dark Charcoal',
      tag: 'ARCHITECTURE',
      desc: 'Heritage Delhi sandstone arches integrated into moody charcoal masonry, paying homage to imperial royal havelis.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85'
    },
    {
      id: 'lighting',
      title: 'Warm Candlelight & Brass Urns',
      tag: 'ILLUMINATION',
      desc: 'Muted amber chandelier lighting calibrated to flatter every gathering, casting warm golden silhouettes upon tables.',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85'
    },
    {
      id: 'bar',
      title: 'The Botanica Cocktail Lounge',
      tag: 'BOTANICAL BAR',
      desc: 'Hand-hammered brass backbars presenting smoked cardamom elixirs, Kashmiri saffron infusions, and vintage reserves.',
      image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1200&q=85'
    },
    {
      id: 'details',
      title: 'Bespoke Copper & Hand-Spun Linen',
      tag: 'CRAFTSMANSHIP',
      desc: 'Custom heavy copper degs, hammered katoris, and fine ivory Belgian linens creating an uncompromising tactile experience.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85'
    }
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-24 sm:py-32 bg-[#0a0907] relative overflow-hidden border-t border-[#1e1a14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#c5a059] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium">
              Sensory Architecture
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#fbf7f0] font-normal tracking-wide mb-4">
            Come For The Food. Stay For The Atmosphere.
          </h2>

          <p className="text-sm sm:text-base text-[#ada190] font-light leading-relaxed">
            Every corner of Anhad Das has been sculpted to transport you into a realm of serene luxury—where heritage music, warm candlelight, and gentle aromatic vapors weave an unforgettable spell.
          </p>
        </div>

        {/* Interactive Ambience Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Feature Selectors */}
          <div className="lg:col-span-5 space-y-4">
            {ambienceFeatures.map((feat, idx) => (
              <div
                key={feat.id}
                onClick={() => setActiveTab(idx)}
                className={`p-6 rounded-xs cursor-pointer border transition-all duration-300 ${
                  activeTab === idx
                    ? 'bg-[#15130f] border-[#c5a059] shadow-xl'
                    : 'bg-[#100e0b] border-[#221d16] hover:border-[#383125]'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-medium font-cinzel">
                    {feat.tag}
                  </span>
                  <span className="text-xs text-[#706454]">0{idx + 1}</span>
                </div>
                <h3 className={`font-serif text-xl sm:text-2xl transition-colors ${
                  activeTab === idx ? 'text-[#fbf7f0]' : 'text-[#aba090]'
                }`}>
                  {feat.title}
                </h3>
                <p className="text-xs text-[#908474] font-light mt-2 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}

            <div className="pt-4">
              <button
                onClick={() => openReservationModal('Indoor Dining')}
                className="w-full py-4 bg-[#c5a059] text-black font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#d8b569] transition-all flex items-center justify-center space-x-2 shadow-lg"
              >
                <Calendar className="w-4 h-4 text-black" />
                <span>Reserve An Evening Table</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Ambience Photo */}
          <div className="lg:col-span-7 relative">
            <div className="relative h-[440px] sm:h-[540px] rounded-xs overflow-hidden border border-[#c5a059]/30 shadow-2xl">
              <img
                src={ambienceFeatures[activeTab].image}
                alt={ambienceFeatures[activeTab].title}
                className="w-full h-full object-cover object-center transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-black/70 backdrop-blur-md border border-[#c5a059]/30">
                <span className="text-[10px] font-cinzel tracking-[0.3em] uppercase text-[#c5a059] block mb-1">
                  {ambienceFeatures[activeTab].tag}
                </span>
                <h4 className="font-serif text-2xl text-[#fbf7f0]">
                  {ambienceFeatures[activeTab].title}
                </h4>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
