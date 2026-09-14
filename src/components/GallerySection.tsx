import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryItem } from '../types';
import { Maximize2, Sparkles } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { openLightbox } = useRestaurant();
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'FOOD' | 'INTERIORS' | 'FAMILY' | 'CELEBRATIONS' | 'EVENTS' | 'AMBIENCE'>('ALL');

  const filterTabs: ('ALL' | 'FOOD' | 'INTERIORS' | 'FAMILY' | 'CELEBRATIONS' | 'EVENTS' | 'AMBIENCE')[] = [
    'ALL',
    'FOOD',
    'INTERIORS',
    'FAMILY',
    'CELEBRATIONS',
    'EVENTS',
    'AMBIENCE',
  ];

  const filteredGallery = GALLERY_ITEMS.filter((item) => {
    if (selectedFilter === 'ALL') return true;
    return item.category === selectedFilter;
  });

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-[#0c0b09] relative border-t border-[#1f1b14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-[#c5a059] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium">
              A Visual Chronicle
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#fbf7f0] font-normal tracking-wide mb-4">
            Moments Of Taste & Grandeur
          </h2>

          <p className="text-sm sm:text-base text-[#ada190] font-light leading-relaxed">
            Step through our halls, feast your eyes on charcoal culinary wonders, and witness the laughter of families gathered under royal chandeliers.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-12 gap-2 sm:gap-4 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs tracking-wider uppercase font-medium transition-all border ${
                selectedFilter === tab
                  ? 'bg-[#c5a059] text-black border-[#c5a059] font-semibold'
                  : 'bg-[#15120f] text-[#a19584] border-[#292218] hover:border-[#c5a059]/40 hover:text-[#e0d6c7]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Masonry/Grid of Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className={`group relative overflow-hidden rounded-xs cursor-pointer border border-[#2b251c] hover:border-[#c5a059] transition-all duration-500 shadow-xl ${
                index % 5 === 0 ? 'sm:col-span-2 lg:col-span-2 h-[380px]' : 'h-[320px]'
              }`}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

              {/* Top Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="text-[10px] tracking-[0.25em] uppercase font-cinzel text-[#c5a059] bg-black/60 px-2.5 py-1 border border-[#c5a059]/30 backdrop-blur-xs">
                  {item.category}
                </span>
              </div>

              {/* Center Zoom Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-black/60 border border-[#c5a059] flex items-center justify-center text-[#c5a059] transform scale-75 group-hover:scale-100 transition-transform">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-serif text-xl sm:text-2xl text-[#f7eee2] leading-tight mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-[#b5a999] font-light line-clamp-1">
                  {item.caption}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
