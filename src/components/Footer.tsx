import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Instagram, MapPin, Phone, Mail, Clock, ArrowUp, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { openReservationModal, openEventModal, openDashboard, user } = useRestaurant();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070605] border-t border-[#1f1b14] text-[#a89c8b] pt-20 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#1b1712]">
          
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="inline-block">
              <span className="font-cinzel text-2xl sm:text-3xl tracking-[0.25em] text-[#fbf7f0] font-normal block">
                ANHAD DAS
              </span>
              <span className="text-[10px] tracking-[0.35em] text-[#c5a059] uppercase block mt-1">
                Luxury Indian Dining & Celebrations
              </span>
            </a>

            <p className="font-serif italic text-base text-[#d4af37] font-light max-w-sm">
              “{RESTAURANT_INFO.tagline}”
            </p>

            <p className="text-xs text-[#8c8070] font-light leading-relaxed max-w-sm">
              Rooted in centuries-old Awadhi and Mughlai slow-cooking traditions, serving timeless celebrations with royal Indian hospitality.
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#16130f] border border-[#2e261c] flex items-center justify-center text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <button
                onClick={openDashboard}
                className="text-xs text-[#c5a059] hover:underline uppercase tracking-wider font-cinzel ml-2"
              >
                {user ? `Logged in: ${user.name}` : 'Guest Circle Portal'}
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#eee5d6] font-semibold">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollTo('heritage')} className="hover:text-[#c5a059] transition-colors">
                  Our Heritage
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('cuisine')} className="hover:text-[#c5a059] transition-colors">
                  Signature Cuisines
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('menu')} className="hover:text-[#c5a059] transition-colors">
                  Culinary Menu
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('experience')} className="hover:text-[#c5a059] transition-colors">
                  Dining Experiences
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('family')} className="hover:text-[#c5a059] transition-colors">
                  Family Dining
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('gallery')} className="hover:text-[#c5a059] transition-colors">
                  Visual Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Celebrations & Bookings */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#eee5d6] font-semibold">
              Celebrations
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollTo('celebrations')} className="hover:text-[#c5a059] transition-colors">
                  Milestone Birthdays
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('celebrations')} className="hover:text-[#c5a059] transition-colors">
                  Golden Anniversaries
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('celebrations')} className="hover:text-[#c5a059] transition-colors">
                  Corporate Banquets
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('event-booking')} className="hover:text-[#c5a059] transition-colors">
                  Custom Event Booking
                </button>
              </li>
              <li>
                <button onClick={() => openReservationModal('Private Dining')} className="hover:text-[#c5a059] transition-colors">
                  Private Chamber Reserve
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('reservation')} className="hover:text-[#c5a059] transition-colors text-[#c5a059]">
                  Instant Table Reserve →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Hours & Location */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#eee5d6] font-semibold">
              Hours & Location
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-[#cdc1b1]">
                {RESTAURANT_INFO.address}
              </p>
              <div className="pt-1 text-[#8c806f]">
                <div>Lunch: {RESTAURANT_INFO.hours.lunch}</div>
                <div>Dinner: {RESTAURANT_INFO.hours.dinner}</div>
              </div>
              <div className="pt-2 text-[#c5a059]">
                <span>Concierge: {RESTAURANT_INFO.phone}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#786c5e]">
          <div>
            © {new Date().getFullYear()} ANHAD DAS. All rights reserved. Where Indian Flavours Meet Timeless Celebrations.
          </div>

          <div className="flex items-center space-x-6">
            <button onClick={() => scrollTo('contact')} className="hover:text-[#c5a059] transition-colors">
              Contact Us
            </button>
            <span>•</span>
            <button onClick={openDashboard} className="hover:text-[#c5a059] transition-colors">
              Guest Circle
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 text-[#c5a059] hover:underline"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
