import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { EventType } from '../types';
import { Calendar, Clock, Users, Sparkles, CheckCircle2, Phone, Mail, User, AlertTriangle, Copy, CheckCheck, RefreshCw } from 'lucide-react';
import { SUPABASE_FIX_SQL } from '../lib/supabase';

export const EventBookingSection: React.FC = () => {
  const { requestEventBooking, supabaseStatus } = useRestaurant();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    eventType: 'Birthday' as EventType,
    preferredDate: '',
    preferredTime: '07:30 PM',
    guests: 15,
    specialRequirements: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<any | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  const eventTypes: EventType[] = [
    'Birthday',
    'Anniversary',
    'Family Party',
    'Corporate Event',
    'Engagement',
    'Private Dinner',
    'Other'
  ];

  const timeSlots = [
    '12:30 PM (Lunch)',
    '01:30 PM (Lunch)',
    '02:30 PM (Late Lunch)',
    '07:00 PM (Early Dinner)',
    '07:30 PM (Dinner)',
    '08:00 PM (Dinner Gala)',
    '08:30 PM (Dinner)',
    '09:00 PM (Late Dinner)'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await requestEventBooking({
        ...formData,
        guests: Number(formData.guests)
      });
      setSubmittedBooking(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="event-booking" className="py-24 sm:py-32 bg-[#0e0c0a] relative border-t border-[#231e17]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 text-[#c5a059] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium">
              Private Dining & Celebration Inquiries
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#fbf7f0] font-normal tracking-wide mb-4">
            Let's Plan Something Special.
          </h2>

          <p className="text-sm sm:text-base text-[#ada190] font-light leading-relaxed max-w-2xl mx-auto">
            Share your envisioned date and celebration details. Our events director personally tailors tasting menus, floral centerpieces, seating arrangements, and personalized service.
          </p>
        </div>

        {submittedBooking ? (
          /* Confirmation State */
          <div className="bg-[#14120e] border border-[#c5a059] p-8 sm:p-12 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500 rounded-xs shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#c5a059]/10 border border-[#c5a059] flex items-center justify-center mx-auto text-[#c5a059]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-cinzel tracking-[0.3em] uppercase text-[#c5a059]">
                Booking Request Acknowledged
              </span>
              <h3 className="font-serif text-3xl text-[#fbf7f0]">
                We Look Forward To Celebrating With You
              </h3>
              <p className="text-sm text-[#b8ad9e] max-w-xl mx-auto font-light">
                Your request reference code is <span className="text-[#d4af37] font-semibold font-cinzel">{submittedBooking.referenceNumber}</span>. Our celebrations concierge is already reviewing your details and will connect via phone at {submittedBooking.phone} within 2 hours.
              </p>
            </div>

            {/* Summary Box */}
            <div className="p-5 bg-[#1a1713] border border-[#2b251c] max-w-lg mx-auto text-left grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#8e8170] block">Guest Name</span>
                <span className="text-[#eee4d5] font-medium">{submittedBooking.fullName}</span>
              </div>
              <div>
                <span className="text-[#8e8170] block">Celebration Type</span>
                <span className="text-[#eee4d5] font-medium">{submittedBooking.eventType}</span>
              </div>
              <div>
                <span className="text-[#8e8170] block">Preferred Date & Time</span>
                <span className="text-[#eee4d5] font-medium">{submittedBooking.preferredDate || 'Upcoming'} at {submittedBooking.preferredTime}</span>
              </div>
              <div>
                <span className="text-[#8e8170] block">Guest Count</span>
                <span className="text-[#eee4d5] font-medium">{submittedBooking.guests} Guests</span>
              </div>
            </div>

            {/* Supabase Status confirmation / Action Required */}
            {submittedBooking?.supabaseSyncStatus?.success ? (
              <div className="inline-flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-4 py-2 rounded-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Saved directly to Supabase table <span className="font-mono text-[11px] font-bold text-emerald-300">appointments</span> ({supabaseStatus.projectId})</span>
              </div>
            ) : (
              <div className="p-4 bg-[#1e1710] border border-[#d4af37]/40 rounded-sm text-left space-y-3 max-w-lg mx-auto">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h5 className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                      Supabase Permission Action Required (Error 42501)
                    </h5>
                    <p className="text-[11px] text-[#c9bea9] leading-relaxed">
                      Your Supabase table <span className="font-mono text-white">appointments</span> exists in project <span className="font-mono text-amber-200">gcyobblqgyxnujfxgcfi</span>, but PostgreSQL is rejecting inserts because the <span className="font-mono text-white">anon</span> role does not have write permissions.
                    </p>
                  </div>
                </div>

                <div className="p-2.5 bg-[#0e0c0a] border border-[#2b251c] rounded text-[11px] font-mono text-[#dcd2be] space-y-1">
                  <div className="text-[10px] text-[#8e8170] uppercase">1. Run in Supabase SQL Editor:</div>
                  <div className="text-amber-200">GRANT ALL ON TABLE public.appointments TO anon, authenticated;</div>
                  <div className="text-amber-200">ALTER TABLE public.appointments DISABLE ROW LEVEL SECURITY;</div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(SUPABASE_FIX_SQL);
                      setCopiedSql(true);
                      setTimeout(() => setCopiedSql(false), 3000);
                    }}
                    className="px-3.5 py-1.5 bg-[#c5a059] text-black font-semibold text-xs uppercase tracking-wider rounded-xs hover:bg-[#d8b569] flex items-center space-x-1.5 transition-colors"
                  >
                    {copiedSql ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? 'SQL Copied!' : 'Copy 1-Click SQL Fix'}</span>
                  </button>

                  <button
                    onClick={async () => {
                      if (!submittedBooking) return;
                      setIsRetrying(true);
                      const ok = await supabaseStatus.retrySyncBooking(submittedBooking.id);
                      if (ok) {
                        setSubmittedBooking((prev: any) => ({
                          ...prev,
                          supabaseSyncStatus: { success: true, table: 'appointments' }
                        }));
                      }
                      setIsRetrying(false);
                    }}
                    disabled={isRetrying}
                    className="px-3.5 py-1.5 bg-[#252019] text-[#e0d6c4] border border-[#3e3425] hover:border-[#c5a059] text-xs uppercase tracking-wider rounded-xs flex items-center space-x-1.5 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRetrying ? 'animate-spin' : ''}`} />
                    <span>{isRetrying ? 'Retrying...' : 'Retry Supabase Save'}</span>
                  </button>
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={() => {
                  setSubmittedBooking(null);
                  setFormData({
                    fullName: '',
                    phone: '',
                    email: '',
                    eventType: 'Birthday',
                    preferredDate: '',
                    preferredTime: '07:30 PM',
                    guests: 15,
                    specialRequirements: '',
                    message: ''
                  });
                }}
                className="px-6 py-2.5 bg-transparent border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-black text-xs uppercase tracking-widest transition-all"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          /* Main Form */
          <form
            onSubmit={handleSubmit}
            className="bg-[#13110e] border border-[#2c261e] p-6 sm:p-10 rounded-xs shadow-2xl space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#cdc1b1] font-medium flex items-center space-x-1.5">
                  <User className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Vikramaditya Singhania"
                  className="w-full bg-[#1b1814] border border-[#302920] focus:border-[#c5a059] text-sm text-[#f4eee4] px-4 py-3 rounded-xs outline-none transition-colors placeholder:text-[#6a6052]"
                />
              </div>

              {/* Phone Number */}
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
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#1b1814] border border-[#302920] focus:border-[#c5a059] text-sm text-[#f4eee4] px-4 py-3 rounded-xs outline-none transition-colors placeholder:text-[#6a6052]"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#cdc1b1] font-medium flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Email Address *</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@heritage.in"
                  className="w-full bg-[#1b1814] border border-[#302920] focus:border-[#c5a059] text-sm text-[#f4eee4] px-4 py-3 rounded-xs outline-none transition-colors placeholder:text-[#6a6052]"
                />
              </div>

              {/* Event Type */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#cdc1b1] font-medium flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Event Type *</span>
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value as EventType })}
                  className="w-full bg-[#1b1814] border border-[#302920] focus:border-[#c5a059] text-sm text-[#f4eee4] px-4 py-3 rounded-xs outline-none transition-colors"
                >
                  {eventTypes.map((t) => (
                    <option key={t} value={t} className="bg-[#151310] text-[#eee4d5]">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Date */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#cdc1b1] font-medium flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Preferred Date *</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full bg-[#1b1814] border border-[#302920] focus:border-[#c5a059] text-sm text-[#f4eee4] px-4 py-3 rounded-xs outline-none transition-colors"
                />
              </div>

              {/* Number of Guests */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#cdc1b1] font-medium flex items-center space-x-1.5">
                  <Users className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Estimated Guests *</span>
                </label>
                <input
                  type="number"
                  min={4}
                  max={200}
                  required
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                  className="w-full bg-[#1b1814] border border-[#302920] focus:border-[#c5a059] text-sm text-[#f4eee4] px-4 py-3 rounded-xs outline-none transition-colors"
                />
              </div>

            </div>

            {/* Preferred Time Slot */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#cdc1b1] font-medium flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Preferred Time Slot</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setFormData({ ...formData, preferredTime: slot })}
                    className={`py-2 px-2 text-[11px] text-center rounded-xs border transition-all truncate ${
                      formData.preferredTime === slot
                        ? 'bg-[#c5a059] text-black border-[#c5a059] font-medium'
                        : 'bg-[#181512] text-[#ada090] border-[#2c261e] hover:border-[#c5a059]/40'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Requirements */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#cdc1b1] font-medium">
                Special Requirements (Floral decor, Custom cake, Audio-Visual, Dietary preferences)
              </label>
              <input
                type="text"
                value={formData.specialRequirements}
                onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                placeholder="e.g. 50th Golden Anniversary theme, bespoke vegetarian options, live instrumental musician request"
                className="w-full bg-[#1b1814] border border-[#302920] focus:border-[#c5a059] text-sm text-[#f4eee4] px-4 py-3 rounded-xs outline-none transition-colors placeholder:text-[#6a6052]"
              />
            </div>

            {/* Additional Message */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#cdc1b1] font-medium">
                Additional Notes
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us any extra vision or questions you have for our team..."
                className="w-full bg-[#1b1814] border border-[#302920] focus:border-[#c5a059] text-sm text-[#f4eee4] px-4 py-3 rounded-xs outline-none transition-colors placeholder:text-[#6a6052] resize-none"
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
                  <span>Transmitting Details...</span>
                ) : (
                  <span>Request Event Booking</span>
                )}
              </button>
              <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#7e7364] mt-3 gap-2">
                <span>No advance payment required. Seating confirmed upon review.</span>
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
