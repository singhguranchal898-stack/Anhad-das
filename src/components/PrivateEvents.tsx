import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Sparkles, Check, ArrowRight, Shield, Music, Wine, Gift } from 'lucide-react';

export const PrivateEvents: React.FC = () => {
  const { openEventModal } = useRestaurant();

  const privateSpaces = [
    {
      title: 'The Shahi Darbar Chamber',
      capacity: 'Up to 20 Guests',
      desc: 'An opulent private sanctuary modeled after Mughal court salons, featuring hand-carved sandstone screen jalis, heavy mahogany dining tables, and personal butler service.',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      highlights: ['Dedicated Masterchef', 'Private acoustic music system', 'Bespoke silver cutlery']
    },
    {
      title: 'The Heritage Pavilion',
      capacity: '25 to 55 Guests',
      desc: 'A grand celebration hall with lofty ceiling chandeliers, modular banquet seating, private reception cocktail bar, and flexible staging for live instrumental music or speeches.',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      highlights: ['Full cocktail bar setup', 'AV presentation ready', 'Private outdoor veranda']
    }
  ];

  const features = [
    { icon: Shield, label: 'Private Dining Sanctuary', desc: 'Completely sequestered from public dining areas with private entrance.' },
    { icon: Sparkles, label: 'Customized Floral Decorations', desc: 'Curated botanicals, candle arrays, and personalized table cards.' },
    { icon: Wine, label: 'Bespoke Degustation Menus', desc: 'Chef-curated 5 to 7 course menus crafted around your preferences.' },
    { icon: Music, label: 'Music & Acoustic Control', desc: 'Dedicated sound zone for classical sitar, soft jazz, or private playlists.' },
    { icon: Gift, label: 'Celebration Packages', desc: 'Turnkey solutions including signature artisanal cakes and guest takeaway mementos.' }
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#0c0b09] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#c5a059] mb-3">
            <span className="w-6 h-[1px] bg-[#c5a059]" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium">
              Exclusive Spaces & Royal Salons
            </span>
            <span className="w-6 h-[1px] bg-[#c5a059]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#fbf7f0] font-normal tracking-wide mb-4">
            A Space That Becomes Yours.
          </h2>

          <p className="text-sm sm:text-base text-[#ada190] font-light leading-relaxed">
            Reserved exclusively for you and your guests. Enjoy unparalleled culinary intimacy, discrete personalized hospitality, and moments crafted without compromise.
          </p>
        </div>

        {/* Two Private Spaces Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {privateSpaces.map((space, i) => (
            <div
              key={i}
              className="bg-[#12100d] border border-[#2b251c] hover:border-[#c5a059]/60 rounded-xs overflow-hidden transition-all duration-500 flex flex-col justify-between shadow-2xl group"
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={space.image}
                  alt={space.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12100d] via-black/40 to-transparent" />
                <div className="absolute top-4 right-4 bg-black/80 px-3 py-1 border border-[#c5a059]/40">
                  <span className="text-xs font-cinzel text-[#d4af37] font-semibold">{space.capacity}</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#f7eee2] group-hover:text-[#c5a059] transition-colors mb-2">
                    {space.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#ada08e] font-light leading-relaxed mb-4">
                    {space.desc}
                  </p>

                  <div className="space-y-2 border-t border-[#231e17] pt-4">
                    {space.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-[#cbc0b0]">
                        <Check className="w-3.5 h-3.5 text-[#c5a059]" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => openEventModal('Private Dinner')}
                    className="w-full py-3 bg-[#171410] hover:bg-[#c5a059] text-[#e0d5c5] hover:text-black border border-[#30291f] hover:border-[#c5a059] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Enquire For {space.title.split(' ')[1]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Icons Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-6 border-t border-[#231e17]">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-4 bg-[#14120e] border border-[#262017] rounded-xs space-y-2 text-center sm:text-left">
                <Icon className="w-5 h-5 text-[#c5a059] mx-auto sm:mx-0" />
                <h4 className="font-cinzel text-xs tracking-wider uppercase text-[#f2e7d5] font-semibold">
                  {item.label}
                </h4>
                <p className="text-[11px] text-[#938776] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => openEventModal('Private Dinner')}
            className="px-8 py-4 bg-[#c5a059] text-black font-semibold text-xs tracking-[0.22em] uppercase hover:bg-[#d8b569] transition-all duration-300 shadow-xl inline-flex items-center space-x-2"
          >
            <span>Enquire For Private Events</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
