import React from 'react';
import { TESTIMONIALS } from '../data/restaurantData';
import { Star, Quote, Sparkles } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#0e0c0a] relative border-t border-[#1f1b14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#c5a059] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium">
              Guest Impressions & Reflections
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#fbf7f0] font-normal tracking-wide mb-4">
            Cherished By Families & Connoisseurs
          </h2>

          <p className="text-sm sm:text-base text-[#ada190] font-light leading-relaxed">
            Every review reflects an evening of warmth, celebration, and culinary devotion shared with loved ones.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-[#13110e] border border-[#2b251c] hover:border-[#c5a059]/50 rounded-xs p-8 flex flex-col justify-between transition-all duration-300 shadow-2xl relative group"
            >
              {/* Quote Watermark Icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#292319] group-hover:text-[#c5a059]/20 transition-colors pointer-events-none" />

              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-serif italic text-base sm:text-lg text-[#ece3d4] font-light leading-relaxed">
                  “{review.text}”
                </p>
              </div>

              {/* Author & Occasion Footer */}
              <div className="pt-6 mt-6 border-t border-[#231e17] space-y-1">
                <h4 className="font-cinzel text-sm text-[#fbf7f0] font-semibold tracking-wider">
                  {review.name}
                </h4>
                <div className="flex items-center justify-between text-xs text-[#998b79]">
                  <span className="text-[#c5a059] font-medium">{review.occasion}</span>
                  <span>{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rating Trust Badge */}
        <div className="mt-14 pt-8 border-t border-[#211c15] text-center flex flex-wrap items-center justify-center gap-6 text-xs tracking-widest text-[#8c8070] uppercase">
          <span>4.9 / 5.0 Average Guest Rating</span>
          <span>•</span>
          <span>Over 1,200 Celebrations Hosted</span>
          <span>•</span>
          <span>Recipient of Luxury Heritage Dining Award</span>
        </div>

      </div>
    </section>
  );
};
