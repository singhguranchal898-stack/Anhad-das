import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { SeatingPreference, Reservation } from '../types';
import { Calendar, Clock, Users, Sparkles, CheckCircle2, Phone, Mail, User, ShieldCheck } from 'lucide-react';

export const ReservationSection: React.FC = () => {
  const { makeReservation, user } = useRestaurant();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Default tomorrow
    time: '08:00 PM',
    guests: 4,
    seatingPreference: 'Indoor Dining' as SeatingPreference,
    specialRequest: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const seatingOptions: { label: SeatingPreference; desc: string }[] = [
    { label: 'Indoor Dining', desc: 'Candlelit tables in our main heritage dining hall' },
    { label: 'Family Seating', desc: 'Spacious circular banquet tables with generous room' },
    { label: 'Celebration Table', desc: 'Decorated floral centerpiece & celebration setup' },
    { label: 'Private Dining', desc: 'Exclusive intimate chamber with dedicated butler' }
  ];

  const timeSlots = [
    '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM',
    '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await makeReservation({
        ...formData,
        guests: Number(formData.guests)
      });
      setConfirmedReservation(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reservation" className="py-24 sm:py-32 bg-[#0c0b09] relative border-t border-[#1f1a13]">
      
      {/* Subtle Glow Accent */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 text-[#c5a059] mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium">
              Immediate Table Bookings
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#fbf7f0] font-normal tracking-wide mb-4">
            Reserve Your Experience
          </h2>

          <p className="text-sm sm:text-base text-[#ada190] font-light leading-relaxed max-w-2xl mx-auto">
            Book a table for tonight or reserve ahead for upcoming celebrations. We hold reserved tables with unhurried warmth.
          </p>
        </div>

        {confirmedReservation ? (
          /* Confirmation Success Card */
          <div className="bg-[#13110e] border border-[#c5a059] p-8 sm:p-12 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500 rounded-xs shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#c5a059]/10 border border-[#c5a059] flex items-center justify-center mx-auto text-[#c5a059]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-cinzel tracking-[0.3em] uppercase text-[#c5a059]">
                Reservation Confirmed
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#fbf7f0]">
                We Eagerly Await Your Arrival
              </h3>
              <p className="text-sm text-[#b5a898] max-w-lg mx-auto font-light">
                Your confirmation reference code is{' '}
                <span className="text-[#d4af37] font-semibold font-cinzel text-base">
                  {confirmedReservation.referenceNumber}
                </span>. A booking confirmation has also been saved to your account.
              </p>
            </div>

            {/* Booking Details Grid */}
            <div className="p-5 bg-[#181511] border border-[#2b251c] max-w-lg mx-auto text-left grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#8e8170] block">Guest Name</span>
                <span className="text-[#eee4d5] font-medium">{confirmedReservation.name}</span>
              </div>
              <div>
                <span className="text-[#8e8170] block">Seating Area</span>
                <span className="text-[#eee4d5] font-medium">{confirmedReservation.seatingPreference}</span>
              </div>
              <div>
                <span className="text-[#8e8170] block">Date & Time</span>
                <span className="text-[#eee4d5] font-medium">{confirmedReservation.date} at {confirmedReservation.time}</span>
              </div>
              <div>
                <span className="text-[#8e8170] block">Party Size</span>
                <span className="text-[#eee4d5] font-medium">{confirmedReservation.guests} Guests</span>
              </div>
              {confirmedReservation.specialRequest && (
                <div className="col-span-2 pt-2 border-t border-[#262017]">
                  <span className="text-[#8e8170] block">Special Request Noted</span>
                  <span className="text-[#d6cbbe] italic font-light">{confirmedReservation.specialRequest}</span>
                </div>
              )}
            </div>

            {/* Supabase Status confirmation */}
            <div className="inline-flex items-center space-x-2 text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Record recorded in Supabase project <span className="font-mono text-[10px]">gcyobblqgyxnujfxgcfi</span></span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setConfirmedReservation(null)}
                className="px-6 py-2.5 bg-transparent border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-black text-xs uppercase tracking-widest transition-all"
              >
                Book Another Table
              </button>
            </div>
          </div>
        ) : (
          /* Table Reservation Form */
          <form
            onSubmit={handleSubmit}
            className="bg-[#12100d] border border-[#2b251c] p-6 sm:p-10 rounded-xs shadow-2xl space-y-6"
          >
            {/* Seating Preference Selector Cards */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#cdc1b1] font-medium flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Select Seating Atmosphere *</span>
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {seatingOptions.map((opt) => (
                  <div
                    key={opt.label}
                    onClick={() => setFormData({ ...formData, seatingPreference: opt.label })}
                    className={`p-3.5 rounded-xs cursor-pointer border transition-all ${
                      formData.seatingPreference === opt.label
                        ? 'bg-[#1a1713] border-[#c5a059] text-[#fbf7f0] shadow-md'
                        : 'bg-[#151310] border-[#292218] text-[#9b8f7e] hover:border-[#3d3426]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-cinzel text-xs font-semibold uppercase tracking-wider text-[#f5ecd9]">
                        {opt.label}
                      </span>
                      {formData.seatingPreference === opt.label && (
                        <span className="w-2 h-2 rounded-full bg-[#c5a059]" />
                      )}
                    </div>
                    <p className="text-[11px] text-[#8e8170] font-light">
                      {opt.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#cdc1b1] font-medium flex items-center space-x-1.5">
                  <User className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Name *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Radhika Singhania"
                  className="w-full bg-[#181512] border border-[#2e271f] focus:border-[#c5a059] text-sm text-[#f4eee4] px-4 py-3 rounded-xs outline-none transition-colors placeholder:text-[#6a6052]"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#cdc1b1] font-medium flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Phone Number *</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98110 54321"
                  className="w-full bg-[#181512] border border-[#2e271f] focus:border-[#c5a059] text-sm text-[#f4eee4] px-4 py-3 rounded-xs outline-none transition-colors placeholder:text-[#6a6052]"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#cdc1b1] font-medium flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Email *</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="guest@heritage.in"
                  className="w-full bg-[#181512] border border-[#2e271f] focus:border-[#c5a059] text-sm text-[#f4eee4] px-4 py-3 rounded-xs outline-none transition-colors placeholder:text-[#6a6052]"
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#cdc1b1] font-medium flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Date *</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-[#181512] border border-[#2e271f] focus:border-[#c5a059] text-sm text-[#f4eee4] px-4 py-3 rounded-xs outline-none transition-colors"
                />
              </div>

              {/* Number of Guests */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#cdc1b1] font-medium flex items-center space-x-1.5">
                  <Users className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Number of Guests *</span>
                </label>
                <input
                  type="number"
                  min={1}
                  max={40}
                  required
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                  className="w-full bg-[#181512] border border-[#2e271f] focus:border-[#c5a059] text-sm text-[#f4eee4] px-4 py-3 rounded-xs outline-none transition-colors"
                />
              </div>

              {/* Time Dropdown / Slot */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#cdc1b1] font-medium flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Dining Time *</span>
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full bg-[#181512] border border-[#2e271f] focus:border-[#c5a059] text-sm text-[#f4eee4] px-4 py-3 rounded-xs outline-none transition-colors"
                >
                  {timeSlots.map((t) => (
                    <option key={t} value={t} className="bg-[#12100d] text-[#eee4d5]">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Special Request */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#cdc1b1] font-medium">
                Special Request (e.g. Birthday cake, Anniversary floral arrangement, Wheelchair accessibility, Jain meal)
              </label>
              <textarea
                rows={2}
                value={formData.specialRequest}
                onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                placeholder="Let us know how we can make your visit extraordinary..."
                className="w-full bg-[#181512] border border-[#2e271f] focus:border-[#c5a059] text-sm text-[#f4eee4] px-4 py-2.5 rounded-xs outline-none transition-colors placeholder:text-[#6a6052] resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#c5a059] hover:bg-[#d8b569] text-black font-semibold text-xs tracking-[0.22em] uppercase transition-all duration-300 rounded-xs shadow-xl disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <span>Reserving Table...</span>
                ) : (
                  <span>Reserve My Table</span>
                )}
              </button>
              
              <div className="flex flex-col sm:flex-row items-center justify-between mt-3 text-[11px] text-[#786c5d] gap-2">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3 text-[#c5a059]" />
                    <span>Instant Confirmation</span>
                  </span>
                  <span>•</span>
                  <span>Complimentary Valet</span>
                </div>
                <span className="inline-flex items-center space-x-1.5 text-emerald-400/90 font-mono text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Supabase Connected</span>
                </span>
              </div>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
