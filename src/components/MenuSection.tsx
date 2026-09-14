import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuCategoryType, MenuItem } from '../types';
import { Heart, Flame, Sparkles, Clock, Users, ArrowRight, ShieldCheck } from 'lucide-react';

export const MenuSection: React.FC = () => {
  const { 
    menuItems, 
    favourites, 
    toggleFavourite, 
    isFavourite,
    openReservationModal,
    user,
    updateMenuItemPrice
  } = useRestaurant();

  const [activeCategory, setActiveCategory] = useState<MenuCategoryType>('MAIN COURSE');
  const [dietaryFilter, setDietaryFilter] = useState<'ALL' | 'VEG' | 'NON_VEG' | 'CHEF'>('ALL');
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);
  const [isFullMenuModalOpen, setIsFullMenuModalOpen] = useState(false);

  const categories: MenuCategoryType[] = [
    'STARTERS',
    'TANDOOR',
    'MAIN COURSE',
    'BIRYANI',
    'BREADS',
    'DESSERTS',
    'BEVERAGES',
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = item.category === activeCategory;
    if (!matchesCategory) return false;

    if (dietaryFilter === 'VEG') return item.isVeg;
    if (dietaryFilter === 'NON_VEG') return !item.isVeg;
    if (dietaryFilter === 'CHEF') return item.isChefSpecial;
    return true;
  });

  const handlePriceSave = (id: string) => {
    if (tempPrice > 0) {
      updateMenuItemPrice(id, tempPrice);
    }
    setEditingPriceId(null);
  };

  return (
    <section id="menu" className="py-24 sm:py-32 bg-[#0c0b09] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-[#c5a059] mb-3">
            <span className="w-6 h-[1px] bg-[#c5a059]" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium">
              Curated À La Carte Repertoire
            </span>
            <span className="w-6 h-[1px] bg-[#c5a059]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#fbf7f0] font-normal tracking-wide mb-4">
            Signature Royal Menu
          </h2>

          <p className="text-sm sm:text-base text-[#aea190] font-light leading-relaxed">
            Slow-cooked stews, smoky charcoal roasts, fragrant basmati dum-pukhts, and traditional breads baked fresh with pure desi ghee and artisanal unhurried dedication.
          </p>
        </div>

        {/* Dietary Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-10">
          <button
            onClick={() => setDietaryFilter('ALL')}
            className={`px-4 py-1.5 text-xs tracking-wider uppercase transition-all rounded-full border ${
              dietaryFilter === 'ALL'
                ? 'bg-[#c5a059] text-black border-[#c5a059] font-semibold'
                : 'bg-[#151310] text-[#aba090] border-[#29241c] hover:border-[#c5a059]/40'
            }`}
          >
            All Selections
          </button>
          
          <button
            onClick={() => setDietaryFilter('VEG')}
            className={`px-4 py-1.5 text-xs tracking-wider uppercase transition-all rounded-full border flex items-center space-x-1.5 ${
              dietaryFilter === 'VEG'
                ? 'bg-emerald-950 text-emerald-300 border-emerald-500 font-medium'
                : 'bg-[#151310] text-[#aba090] border-[#29241c] hover:border-emerald-700/50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Pure Vegetarian</span>
          </button>

          <button
            onClick={() => setDietaryFilter('NON_VEG')}
            className={`px-4 py-1.5 text-xs tracking-wider uppercase transition-all rounded-full border flex items-center space-x-1.5 ${
              dietaryFilter === 'NON_VEG'
                ? 'bg-amber-950 text-amber-200 border-amber-600 font-medium'
                : 'bg-[#151310] text-[#aba090] border-[#29241c] hover:border-amber-700/50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Non-Vegetarian</span>
          </button>

          <button
            onClick={() => setDietaryFilter('CHEF')}
            className={`px-4 py-1.5 text-xs tracking-wider uppercase transition-all rounded-full border flex items-center space-x-1.5 ${
              dietaryFilter === 'CHEF'
                ? 'bg-[#c5a059]/20 text-[#e9c67a] border-[#c5a059] font-medium'
                : 'bg-[#151310] text-[#aba090] border-[#29241c] hover:border-[#c5a059]/40'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#c5a059]" />
            <span>Chef's Masterpieces</span>
          </button>
        </div>

        {/* Category Navigation Bar */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-12 border-b border-[#231f18] scrollbar-none gap-2 sm:gap-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-3 sm:px-4 py-2 text-xs sm:text-sm tracking-[0.2em] uppercase font-cinzel transition-all relative ${
                activeCategory === category
                  ? 'text-[#f5ebd8] font-semibold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#c5a059]'
                  : 'text-[#8c8070] hover:text-[#c5a059]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((dish) => {
            const isFav = isFavourite(dish.id);
            return (
              <div
                key={dish.id}
                className="group bg-[#13110e] border border-[#262119] hover:border-[#c5a059]/50 rounded-xs overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Dish Image Container */}
                  <div className="relative h-56 w-full overflow-hidden bg-black">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#13110e] via-transparent to-black/30" />

                    {/* Veg / Non-Veg Standard Icon Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div
                        className={`w-5 h-5 rounded-xs border flex items-center justify-center p-0.5 bg-black/70 backdrop-blur-xs ${
                          dish.isVeg ? 'border-emerald-500' : 'border-amber-600'
                        }`}
                        title={dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            dish.isVeg ? 'bg-emerald-500' : 'bg-amber-600'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Chef Special Badge */}
                    {dish.isChefSpecial && (
                      <div className="absolute top-4 right-14 z-10">
                        <span className="bg-[#c5a059] text-black text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-md">
                          Signature
                        </span>
                      </div>
                    )}

                    {/* Add to Favourites Heart Button */}
                    <button
                      onClick={() => toggleFavourite(dish.id)}
                      title={isFav ? 'Remove from Favourites' : 'Add to Favourites'}
                      className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 border border-[#c5a059]/30 flex items-center justify-center text-[#ece4d8] hover:text-[#c5a059] transition-colors"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          isFav ? 'fill-[#c5a059] text-[#c5a059]' : 'text-[#ece4d8]'
                        }`}
                      />
                    </button>

                    {/* Cuisine Origin Pill */}
                    <div className="absolute bottom-3 left-4">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#c5a059] font-medium bg-black/60 px-2 py-0.5 rounded border border-[#c5a059]/20">
                        {dish.cuisineTag}
                      </span>
                    </div>
                  </div>

                  {/* Dish Text Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    
                    <div className="flex justify-between items-baseline gap-2">
                      <h3 className="font-serif text-xl sm:text-2xl text-[#f7eee2] leading-tight group-hover:text-[#c5a059] transition-colors">
                        {dish.name}
                      </h3>
                      
                      {/* Price Display / Inline Edit for Admin */}
                      <div className="shrink-0 text-right">
                        {editingPriceId === dish.id ? (
                          <div className="flex items-center space-x-1">
                            <input
                              type="number"
                              value={tempPrice}
                              onChange={(e) => setTempPrice(Number(e.target.value))}
                              className="w-20 bg-[#1c1813] border border-[#c5a059] text-sm text-[#f5ebd8] px-1 py-0.5 rounded text-right"
                            />
                            <button
                              onClick={() => handlePriceSave(dish.id)}
                              className="text-xs bg-[#c5a059] text-black px-1.5 py-0.5 rounded font-bold"
                            >
                              ✓
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1">
                            <span className="font-cinzel text-base sm:text-lg text-[#d4af37] font-semibold">
                              ₹{dish.price.toLocaleString('en-IN')}
                            </span>
                            {user?.role === 'admin' && (
                              <button
                                onClick={() => {
                                  setEditingPriceId(dish.id);
                                  setTempPrice(dish.price);
                                }}
                                title="Admin: Edit price"
                                className="text-[10px] text-[#918575] hover:text-[#c5a059] ml-1"
                              >
                                ✎
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#ada08e] font-light leading-relaxed">
                      {dish.description}
                    </p>

                    {/* Dish Micro Details (Spice, Serves, Pairing) */}
                    <div className="pt-2 border-t border-[#1f1b15] flex items-center justify-between text-[11px] text-[#8e8272]">
                      {dish.spiceLevel && (
                        <div className="flex items-center space-x-1" title={`Spice Level: ${dish.spiceLevel}/3`}>
                          <Flame className="w-3.5 h-3.5 text-amber-500" />
                          <span>
                            {dish.spiceLevel === 1 ? 'Mild & Fragrant' : dish.spiceLevel === 2 ? 'Medium Spiced' : 'Robust Heat'}
                          </span>
                        </div>
                      )}

                      {dish.serves && (
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3 text-[#c5a059]" />
                          <span>{dish.serves}</span>
                        </div>
                      )}
                    </div>

                    {dish.pairingNotes && (
                      <p className="text-[10px] text-[#9c8e7c] italic tracking-wide">
                        Sommelier Note: Pairs with {dish.pairingNotes}
                      </p>
                    )}

                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-5 pb-5 pt-1">
                  <button
                    onClick={() => openReservationModal('Indoor Dining')}
                    className="w-full py-2.5 bg-[#1a1713] hover:bg-[#c5a059] text-[#cdc1b0] hover:text-black border border-[#2f2920] hover:border-[#c5a059] text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-xs flex items-center justify-center space-x-2"
                  >
                    <span>Reserve For This Dish</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Menu CTA Button */}
        <div className="mt-14 text-center">
          <button
            onClick={() => setIsFullMenuModalOpen(true)}
            className="group px-8 py-4 bg-[#14120f] border border-[#c5a059] text-[#f2e7d5] hover:bg-[#c5a059] hover:text-black transition-all duration-300 text-xs tracking-[0.22em] uppercase font-semibold inline-flex items-center space-x-3 shadow-lg"
          >
            <span>View Full Menu & Tasting Editions</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

      </div>

      {/* Full Menu Modal */}
      {isFullMenuModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#110f0c] border border-[#c5a059]/40 max-w-4xl w-full p-6 sm:p-10 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsFullMenuModalOpen(false)}
              className="absolute top-6 right-6 text-[#998b79] hover:text-[#c5a059] text-2xl"
            >
              ✕
            </button>

            <div className="text-center mb-8 pb-6 border-b border-[#2a241b]">
              <span className="font-cinzel text-xl text-[#c5a059] tracking-[0.3em]">
                ANHAD DAS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#f7eee2] mt-2">
                The Complete Royal Gastronomic Collection
              </h2>
              <p className="text-xs text-[#a09483] tracking-widest uppercase mt-2">
                All prices in INR. Taxes and service charges applicable as per state norms.
              </p>
            </div>

            <div className="space-y-10">
              {categories.map((cat) => {
                const itemsInCat = menuItems.filter(m => m.category === cat);
                return (
                  <div key={cat} className="space-y-4">
                    <div className="flex items-center space-x-3 border-b border-[#2b251c] pb-2">
                      <span className="w-2 h-2 bg-[#c5a059] rotate-45" />
                      <h4 className="font-cinzel text-lg tracking-[0.2em] text-[#d4af37]">
                        {cat}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {itemsInCat.map((d) => (
                        <div key={d.id} className="p-3 bg-[#161410] border border-[#262018] flex justify-between items-start gap-4">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className={`w-2 h-2 rounded-full ${d.isVeg ? 'bg-emerald-400' : 'bg-amber-600'}`} />
                              <h5 className="font-serif text-base text-[#f7eee2]">{d.name}</h5>
                            </div>
                            <p className="text-xs text-[#9d8f7f] mt-1 line-clamp-2">{d.description}</p>
                          </div>
                          <span className="font-cinzel text-sm text-[#d4af37] font-semibold shrink-0">
                            ₹{d.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 pt-6 border-t border-[#262018] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#9c8e7c]">
                Dietary & allergy preparations: Jain and low-spice options gladly prepared upon prior notice.
              </div>
              <button
                onClick={() => {
                  setIsFullMenuModalOpen(false);
                  openReservationModal();
                }}
                className="px-6 py-2.5 bg-[#c5a059] text-black text-xs uppercase tracking-widest font-semibold hover:bg-[#d8b569]"
              >
                Reserve Table
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
