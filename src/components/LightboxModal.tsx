import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { X } from 'lucide-react';

export const LightboxModal: React.FC = () => {
  const { activeLightboxItem, closeLightbox } = useRestaurant();

  if (!activeLightboxItem) return null;

  return (
    <div
      onClick={closeLightbox}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300"
    >
      <button
        onClick={closeLightbox}
        className="absolute top-6 right-6 text-white/70 hover:text-[#c5a059] p-2 rounded-full hover:bg-white/10 transition-colors z-10"
      >
        <X className="w-7 h-7" />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
      >
        <div className="relative overflow-hidden rounded-xs border border-[#c5a059]/40 shadow-2xl max-h-[75vh]">
          <img
            src={activeLightboxItem.imageUrl}
            alt={activeLightboxItem.title}
            className="w-full h-full object-contain max-h-[75vh]"
          />
        </div>

        <div className="mt-4 text-center max-w-xl space-y-1">
          <span className="font-cinzel text-[10px] tracking-[0.3em] uppercase text-[#c5a059]">
            {activeLightboxItem.category}
          </span>
          <h3 className="font-serif text-2xl text-[#fbf7f0]">
            {activeLightboxItem.title}
          </h3>
          <p className="text-xs text-[#b8ab9a] font-light">
            {activeLightboxItem.caption}
          </p>
        </div>
      </div>
    </div>
  );
};
