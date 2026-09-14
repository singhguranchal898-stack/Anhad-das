import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { ArrowRight, Flame, Sparkles, Heart } from 'lucide-react';

export const FoodSpotlight: React.FC = () => {
  const { openReservationModal, toggleFavourite, isFavourite } = useRestaurant();

  const spotlights = [
    {
      id: 'm8',
      tag: 'SIGNATURE OF THE HOUSE',
      name: 'ANHAD SPECIAL BUTTER CHICKEN',
      quote: '“Slow-cooked, rich, aromatic and created to become one of the dishes guests remember long after dinner.”',
      details: 'Tender tandoor-pulled chicken steeped in ripe vine tomato coulis, slow-churned sweet white butter, hand-crushed roasted Kasuri methi, and cold-pressed mustard oil embers. Balanced with a delicate creaminess that honors imperial Old Delhi origins without overwhelming heaviness.',
      image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=1200&q=85',
      heritage: 'Simmered 6 hours over dying tandoor charcoal',
      pairWith: 'Truffle Garlic Butter Naan & Smoked Clove Elixir',
      isVeg: false,
      price: '₹945'
    },
    {
      id: 'm9',
      tag: 'HERITAGE SLOW-COOKED',
      name: 'DAL MAKHANI HERITAGE 24-HOUR',
      quote: '“Patience is the secret ingredient. Simmered overnight over smoldering embers to achieve unparalleled velvety silkiness.”',
      details: 'Plump whole black urad lentils and kidney beans soaked in glacial water, slow-tempered for 24 continuous hours in heavy copper degs with unsalted churned butter, organic cream, and mild degi mirch. A dish of profound simplicity and royal indulgence.',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=85',
      heritage: '24-hour slow cooking in artisanal copper degs',
      pairWith: 'Hot Amritsari Chur-Chur Kulcha',
      isVeg: true,
      price: '₹695'
    },
    {
      id: 'm12',
      tag: 'IMPERIAL NIZAMI CREATION',
      name: 'HYDERABADI GOSHT DUM BIRYANI',
      quote: '“Every grain of aged Dehradun basmati carries the essence of saffron, caramelized shallots and tender mutton.”',
      details: 'Hand-selected cuts of spring mutton marinated overnight in green papaya, stone-ground garam masala, and fragrant desi ghee. Layered with aged basmati rice, saffron-infused milk, and sealed hermetically with whole wheat dough to lock in royal aroma.',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=85',
      heritage: 'Aged basmati rice dum-cooked under flour seal',
      pairWith: 'Burani Garlic Raita & Mirchi Salan',
      isVeg: false,
      price: '₹995'
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const current = spotlights[activeIdx];
  const isFav = isFavourite(current.id);

  return (
    <section className="py-24 sm:py-32 bg-[#0e0d0b] relative overflow-hidden border-y border-[#211c15]">
      
      {/* Background Ambience Shimmer */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Spotlight Navigation Tabs */}
        <div className="flex items-center justify-center space-x-3 sm:space-x-6 mb-12">
          {spotlights.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveIdx(idx)}
              className={`px-4 sm:px-6 py-2 rounded-full text-xs uppercase tracking-[0.2em] transition-all border ${
                activeIdx === idx
                  ? 'bg-[#c5a059] text-black border-[#c5a059] font-semibold shadow-lg shadow-[#c5a059]/20'
                  : 'bg-[#14120e] text-[#a69b8b] border-[#29241b] hover:border-[#c5a059]/40'
              }`}
            >
              {item.name.split(' ')[0]} {item.name.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Cinematic Spotlight Feature Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center bg-[#12100d] border border-[#2b251c] rounded-xs p-6 sm:p-10 lg:p-14 shadow-2xl">
          
          {/* Left: Large Cinematic Image */}
          <div className="lg:col-span-7 relative group">
            <div className="overflow-hidden rounded-xs border border-[#3b3225] relative">
              <img
                src={current.image}
                alt={current.name}
                className="w-full h-[380px] sm:h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <span className="bg-[#c5a059] text-black text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 shadow-md">
                  House Masterpiece
                </span>
                <span className="bg-black/70 backdrop-blur-xs text-[#d6cdbf] text-[10px] px-2.5 py-1 border border-[#c5a059]/30">
                  {current.heritage}
                </span>
              </div>

              {/* Heart Button */}
              <button
                onClick={() => toggleFavourite(current.id)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 border border-[#c5a059]/40 flex items-center justify-center text-[#ece4d8] hover:text-[#c5a059] transition-colors"
                title="Save to Favourites"
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-[#c5a059] text-[#c5a059]' : 'text-white'}`} />
              </button>

              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 border border-[#c5a059]/40">
                <span className="font-cinzel text-lg text-[#d4af37] font-semibold">{current.price}</span>
              </div>
            </div>
          </div>

          {/* Right: Rich Story Content */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="flex items-center space-x-2 text-[#c5a059]">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs uppercase tracking-[0.25em] font-medium">
                {current.tag}
              </span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl text-[#f7eee1] leading-[1.15] font-normal">
              {current.name}
            </h3>

            <p className="font-serif italic text-base sm:text-lg text-[#d4af37] font-light leading-relaxed">
              {current.quote}
            </p>

            <p className="text-xs sm:text-sm text-[#ada190] leading-relaxed font-light">
              {current.details}
            </p>

            <div className="p-4 bg-[#181511] border-l-2 border-[#c5a059] space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-medium block">
                Recommended Accompaniment
              </span>
              <p className="text-xs text-[#d6ccbe]">
                {current.pairWith}
              </p>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => openReservationModal('Indoor Dining')}
                className="px-6 py-3.5 bg-[#c5a059] text-black font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#d8b569] transition-all flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Order / Reserve</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
