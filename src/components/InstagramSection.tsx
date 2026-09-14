import React from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { INSTAGRAM_POSTS, RESTAURANT_INFO } from '../data/restaurantData';

export const InstagramSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#0e0c0a] relative border-t border-[#1f1b14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-[#c5a059] mb-2">
              <Instagram className="w-4 h-4" />
              <span className="text-xs uppercase tracking-[0.3em] font-medium">
                Visual Gastronomy
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#fbf7f0] font-normal tracking-wide">
              Follow Our Story.
            </h2>
            <p className="text-xs sm:text-sm text-[#a89b89] font-light mt-1">
              Join our culinary collective on Instagram: <span className="text-[#c5a059] font-medium">{RESTAURANT_INFO.instagramHandle}</span>
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#15120f] border border-[#c5a059]/40 hover:border-[#c5a059] text-[#ded3c3] hover:text-[#c5a059] text-xs uppercase tracking-[0.2em] font-medium transition-all flex items-center space-x-2 rounded-xs group"
          >
            <span>Follow On Instagram</span>
            <ExternalLink className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* 4-Column Instagram Visual Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative h-64 sm:h-72 rounded-xs overflow-hidden border border-[#2b251c] cursor-pointer shadow-lg"
            >
              <img
                src={post.image}
                alt="Anhad Das Instagram Visual"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center space-y-3">
                <Instagram className="w-6 h-6 text-[#c5a059]" />
                <div className="flex items-center space-x-4 text-xs text-[#fbf7f0] font-medium">
                  <span className="flex items-center space-x-1">
                    <Heart className="w-3.5 h-3.5 fill-[#c5a059] text-[#c5a059]" />
                    <span>{post.likes}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MessageCircle className="w-3.5 h-3.5 text-white" />
                    <span>{post.comments}</span>
                  </span>
                </div>
                <span className="text-[10px] text-[#ded4c5] tracking-wider uppercase font-cinzel">
                  @anhaddas
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
