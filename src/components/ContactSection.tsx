import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { MapPin, Phone, Mail, Clock, Instagram, Send, CheckCircle2, Navigation } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { submitContactMessage } = useRestaurant();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitContactMessage(formData);
      setIsSent(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setIsSent(false), 6000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#0c0b09] relative border-t border-[#1e1a14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#c5a059] mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium">
              Concierge & Location
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#fbf7f0] font-normal tracking-wide mb-4">
            We'd Love To Welcome You.
          </h2>

          <p className="text-sm sm:text-base text-[#ada190] font-light leading-relaxed">
            Reach out to our table reservations concierge, private dining coordinators, or visit us at our heritage pavilion in Civil Lines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Contact Cards & Location Map */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Address */}
              <div className="p-5 bg-[#13110e] border border-[#2b251c] rounded-xs space-y-2">
                <div className="flex items-center space-x-2 text-[#c5a059]">
                  <MapPin className="w-4 h-4" />
                  <h4 className="font-cinzel text-xs uppercase tracking-wider text-[#eee5d6] font-semibold">
                    Address
                  </h4>
                </div>
                <p className="text-xs text-[#ada08e] leading-relaxed font-light">
                  {RESTAURANT_INFO.address}
                </p>
                <p className="text-[10px] text-[#c5a059] font-medium pt-1">
                  {RESTAURANT_INFO.valet}
                </p>
              </div>

              {/* Phone */}
              <div className="p-5 bg-[#13110e] border border-[#2b251c] rounded-xs space-y-2">
                <div className="flex items-center space-x-2 text-[#c5a059]">
                  <Phone className="w-4 h-4" />
                  <h4 className="font-cinzel text-xs uppercase tracking-wider text-[#eee5d6] font-semibold">
                    Telephone
                  </h4>
                </div>
                <p className="text-xs text-[#ada08e] leading-relaxed font-light">
                  Table Reservations:<br />
                  <span className="text-[#f5ebd9] font-medium">{RESTAURANT_INFO.phone}</span>
                </p>
                <p className="text-[10px] text-[#8e8170]">
                  Available 10:00 AM – 11:30 PM
                </p>
              </div>

              {/* Email */}
              <div className="p-5 bg-[#13110e] border border-[#2b251c] rounded-xs space-y-2">
                <div className="flex items-center space-x-2 text-[#c5a059]">
                  <Mail className="w-4 h-4" />
                  <h4 className="font-cinzel text-xs uppercase tracking-wider text-[#eee5d6] font-semibold">
                    Electronic Mail
                  </h4>
                </div>
                <p className="text-xs text-[#ada08e] leading-relaxed font-light">
                  General: {RESTAURANT_INFO.email}<br />
                  Private Events: {RESTAURANT_INFO.conciergeEmail}
                </p>
              </div>

              {/* Opening Hours */}
              <div className="p-5 bg-[#13110e] border border-[#2b251c] rounded-xs space-y-2">
                <div className="flex items-center space-x-2 text-[#c5a059]">
                  <Clock className="w-4 h-4" />
                  <h4 className="font-cinzel text-xs uppercase tracking-wider text-[#eee5d6] font-semibold">
                    Dining Hours
                  </h4>
                </div>
                <div className="text-xs text-[#ada08e] space-y-1 font-light">
                  <div>Lunch: {RESTAURANT_INFO.hours.lunch}</div>
                  <div>Dinner: {RESTAURANT_INFO.hours.dinner}</div>
                </div>
              </div>

            </div>

            {/* Styled Luxury Location Visual / Map Card */}
            <div className="relative rounded-xs overflow-hidden border border-[#2b251c] bg-[#14120e] p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Navigation className="w-4 h-4 text-[#c5a059]" />
                  <span className="font-cinzel text-xs uppercase tracking-widest text-[#f5ebd8] font-semibold">
                    Civil Lines Landmark & Access
                  </span>
                </div>
                <span className="text-[10px] text-[#c5a059] uppercase tracking-wider bg-black/60 px-2 py-0.5 border border-[#c5a059]/30">
                  Google Maps
                </span>
              </div>

              <div className="h-44 w-full rounded-xs overflow-hidden relative border border-[#2d261e]">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80"
                  alt="Delhi Heritage District Map Landscape"
                  className="w-full h-full object-cover grayscale opacity-45"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0a] via-[#0e0c0a]/50 to-transparent" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-3 bg-black/85 border border-[#c5a059] text-center rounded-xs shadow-2xl">
                    <MapPin className="w-5 h-5 text-[#c5a059] mx-auto mb-1 animate-bounce" />
                    <span className="font-cinzel text-xs text-[#fbf7f0] font-semibold block">
                      ANHAD DAS
                    </span>
                    <span className="text-[10px] text-[#ada08e]">Heritage Royal Pavilion</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#8c7f70] mt-3 font-light">
                Conveniently positioned in North Delhi's historic Civil Lines, minutes from Kashmere Gate and Ridge Road.
              </p>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-6">
            <form
              onSubmit={handleSubmit}
              className="bg-[#12100d] border border-[#2b251c] p-6 sm:p-10 rounded-xs shadow-2xl space-y-5"
            >
              <div className="space-y-1">
                <span className="text-xs font-cinzel tracking-[0.25em] uppercase text-[#c5a059]">
                  Send A Message
                </span>
                <h3 className="font-serif text-2xl text-[#f7eee2]">
                  How May We Assist You?
                </h3>
              </div>

              {isSent && (
                <div className="p-4 bg-emerald-950/40 border border-emerald-700/60 rounded-xs text-xs text-emerald-300 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Your message has reached our concierge desk. We will respond promptly.</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-[#cdc1b1] font-medium">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ananya Roy"
                  className="w-full bg-[#181512] border border-[#2d261e] focus:border-[#c5a059] text-sm text-[#f4eee4] px-4 py-2.5 rounded-xs outline-none transition-colors placeholder:text-[#6a6052]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#cdc1b1] font-medium">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ananya@roy.com"
                    className="w-full bg-[#181512] border border-[#2d261e] focus:border-[#c5a059] text-sm text-[#f4eee4] px-4 py-2.5 rounded-xs outline-none transition-colors placeholder:text-[#6a6052]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#cdc1b1] font-medium">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#181512] border border-[#2d261e] focus:border-[#c5a059] text-sm text-[#f4eee4] px-4 py-2.5 rounded-xs outline-none transition-colors placeholder:text-[#6a6052]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-[#cdc1b1] font-medium">Subject *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Private Dining Query / Wedding Reception Inquiry"
                  className="w-full bg-[#181512] border border-[#2d261e] focus:border-[#c5a059] text-sm text-[#f4eee4] px-4 py-2.5 rounded-xs outline-none transition-colors placeholder:text-[#6a6052]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-[#cdc1b1] font-medium">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details regarding your request..."
                  className="w-full bg-[#181512] border border-[#2d261e] focus:border-[#c5a059] text-sm text-[#f4eee4] px-4 py-2.5 rounded-xs outline-none transition-colors placeholder:text-[#6a6052] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#c5a059] hover:bg-[#d8b569] text-black font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 rounded-xs shadow-xl flex items-center justify-center space-x-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
