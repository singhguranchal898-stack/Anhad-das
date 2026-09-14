import React, { useState } from 'react';
import { FAQS } from '../data/restaurantData';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#0a0907] relative border-t border-[#1e1a14]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#c5a059] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium">
              Guest Inquiries & Details
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#fbf7f0] font-normal tracking-wide mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-sm sm:text-base text-[#ada190] font-light leading-relaxed">
            Everything you need to know about dining policies, celebrations, reservations, and hospitality at Anhad Das.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.id}
                className={`border rounded-xs transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#14120e] border-[#c5a059]/60 shadow-lg'
                    : 'bg-[#100e0b] border-[#241e17] hover:border-[#383024]'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                >
                  <span className={`font-serif text-lg sm:text-xl transition-colors ${
                    isOpen ? 'text-[#fbf7f0]' : 'text-[#ded3c3]'
                  }`}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#c5a059] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#ada08f] leading-relaxed font-light border-t border-[#231e17]/60 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
