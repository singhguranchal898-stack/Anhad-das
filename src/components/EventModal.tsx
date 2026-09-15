import React, { useState, useEffect } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { EventType } from '../types';
import { X, Calendar, Users, CheckCircle2, Sparkles, Phone, Mail, User, AlertTriangle, Copy, CheckCheck, RefreshCw } from 'lucide-react';
import { SUPABASE_FIX_SQL } from '../lib/supabase';

export const EventModal: React.FC = () => {
  const { isEventModalOpen, closeEventModal, eventModalType, requestEventBooking, user, supabaseStatus } = useRestaurant();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    eventType: eventModalType || ('Birthday' as EventType),
    preferredDate: '',
    preferredTime: '07:30 PM',
    guests: 20,
    specialRequirements: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<any | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    if (eventModalType) {
      setFormData(prev => ({ ...prev, eventType: eventModalType }));
    }
  }, [eventModalType]);

  if (!isEventModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await requestEventBooking({
        ...formData,
        guests: Number(formData.guests)
      });
      setConfirmed(res);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setConfirmed(null);
    closeEventModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#110f0c] border border-[#c5a059]/40 max-w-lg w-full rounded-xs shadow-2xl relative p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-300">
        
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-[#887b6a] hover:text-[#c5a059] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmed ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-14 h-14 rounded-full bg-[#c5a059]/15 border border-[#c5a059] flex items-center justify-center mx-auto text-[#c5a059]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="font-cinzel text-xs text-[#c5a059] tracking-widest uppercase block">
              Event Inquiry Received
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#fbf7f0]">
              Let The Celebrations Begin
            </h3>
            <p className="text-xs text-[#ada190]">
              Inquiry Reference: <span className="font-cinzel text-sm text-[#d4af37] font-semibold">{confirmed.referenceNumber}</span>
            </p>
            <p className="text-xs text-[#8c8070] font-light">
              Our celebration director will review availability and connect with you at {confirmed.phone}.
            </p>
            {confirmed?.supabaseSyncStatus?.success ? (
              <div className="inline-flex items-center space-x-2 text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Saved directly to Supabase table <span className="font-mono text-[9px] font-bold">appointments</span></span>
              </div>
            ) : (
              <div className="p-3.5 bg-[#1a140e] border border-amber-500/40 rounded text-left space-y-2.5">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-semibold text-amber-300 uppercase block">
                      Supabase Permission Action Required (Error 42501)
                    </span>
                    <span className="text-[10px] text-[#baa995] leading-normal block">
                      Table <span className="font-mono text-white">appointments</span> exists in project <span className="font-mono text-amber-200">gcyobblqgyxnujfxgcfi</span>, but needs INSERT permission for <span className="font-mono text-white">anon</span>.
                    </span>
                  </div>
                </div>

                <div className="p-2 bg-[#0c0a08] border border-[#262017] rounded text-[10px] font-mono text-[#dcd2be]">
                  GRANT ALL ON TABLE public.appointments TO anon, authenticated;
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(SUPABASE_FIX_SQL);
                      setCopiedSql(true);
                      setTimeout(() => setCopiedSql(false), 3000);
                    }}
                    className="flex-1 py-1.5 bg-[#c5a059] text-black font-semibold text-[10px] uppercase tracking-wider rounded-xs hover:bg-[#d8b569] flex items-center justify-center space-x-1"
                  >
                    {copiedSql ? <CheckCheck className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSql ? 'Copied SQL' : 'Copy 1-Click SQL'}</span>
                  </button>

                  <button
                    onClick={async () => {
                      if (!confirmed) return;
                      setIsRetrying(true);
                      const ok = await supabaseStatus.retrySyncBooking(confirmed.id);
                      if (ok) {
                        setConfirmed((prev: any) => ({
                          ...prev,
                          supabaseSyncStatus: { success: true, table: 'appointments' }
                        }));
                      }
                      setIsRetrying(false);
                    }}
                    disabled={isRetrying}
                    className="px-3 py-1.5 bg-[#252019] text-[#e0d6c4] border border-[#3e3425] text-[10px] uppercase tracking-wider rounded-xs flex items-center space-x-1 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${isRetrying ? 'animate-spin' : ''}`} />
                    <span>{isRetrying ? 'Retrying...' : 'Retry Save'}</span>
                  </button>
                </div>
              </div>
            )}
            <button
              onClick={handleClose}
              className="w-full py-3 bg-[#c5a059] text-black font-semibold text-xs tracking-widest uppercase hover:bg-[#d8b569]"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <span className="font-cinzel text-[10px] text-[#c5a059] tracking-[0.3em] uppercase block">
                Bespoke Celebration Concierge
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#fbf7f0] mt-1">
                Plan Your Event
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-[#cdc1b1]">Occasion Type</label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value as EventType })}
                  className="w-full bg-[#181512] border border-[#2c251c] text-xs text-[#eee4d5] px-3.5 py-2.5 rounded-xs outline-none focus:border-[#c5a059]"
                >
                  <option value="Birthday">Birthday Celebration</option>
                  <option value="Anniversary">Anniversary Dinner</option>
                  <option value="Family Party">Family Gathering / Reception</option>
                  <option value="Corporate Event">Corporate Banquet / Dinner</option>
                  <option value="Engagement">Engagement Celebration</option>
                  <option value="Private Dinner">Private Salon Dining</option>
                  <option value="Other">Other Bespoke Event</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-[#cdc1b1]">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-[#181512] border border-[#2c251c] text-xs text-[#eee4d5] px-3.5 py-2.5 rounded-xs outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-[#cdc1b1]">Estimated Guests</label>
                  <input
                    type="number"
                    min={4}
                    max={250}
                    required
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className="w-full bg-[#181512] border border-[#2c251c] text-xs text-[#eee4d5] px-3.5 py-2.5 rounded-xs outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-[#cdc1b1]">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Guest Name"
                    className="w-full bg-[#181512] border border-[#2c251c] text-xs text-[#eee4d5] px-3 py-2.5 rounded-xs outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-[#cdc1b1]">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 Phone"
                    className="w-full bg-[#181512] border border-[#2c251c] text-xs text-[#eee4d5] px-3 py-2.5 rounded-xs outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-[#cdc1b1]">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@email.com"
                  className="w-full bg-[#181512] border border-[#2c251c] text-xs text-[#eee4d5] px-3.5 py-2.5 rounded-xs outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-[#cdc1b1]">Special Requirements</label>
                <input
                  type="text"
                  value={formData.specialRequirements}
                  onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                  placeholder="e.g. Floral theme, Live sitar music, Cake request"
                  className="w-full bg-[#181512] border border-[#2c251c] text-xs text-[#eee4d5] px-3.5 py-2.5 rounded-xs outline-none focus:border-[#c5a059]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#c5a059] text-black font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#d8b569] transition-all rounded-xs shadow-xl mt-2"
              >
                {isSubmitting ? 'Submitting...' : 'Request Celebration Booking'}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
