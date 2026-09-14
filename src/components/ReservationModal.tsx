import React, { useState, useEffect } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { SeatingPreference } from '../types';
import { X, Calendar, Clock, Users, CheckCircle2, User, Phone, Mail } from 'lucide-react';

export const ReservationModal: React.FC = () => {
  const { 
    isReservationModalOpen, 
    closeReservationModal, 
    reservationSeatingPreference, 
    makeReservation,
    user
  } = useRestaurant();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '08:00 PM',
    guests: 4,
    seatingPreference: reservationSeatingPreference || ('Indoor Dining' as SeatingPreference),
    specialRequest: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<any | null>(null);

  useEffect(() => {
    if (reservationSeatingPreference) {
      setFormData(prev => ({ ...prev, seatingPreference: reservationSeatingPreference }));
    }
  }, [reservationSeatingPreference]);

  if (!isReservationModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await makeReservation({
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
    closeReservationModal();
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
              Reservation Confirmed
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#fbf7f0]">
              We Look Forward To Welcoming You
            </h3>
            <p className="text-xs text-[#ada190]">
              Confirmation Reference: <span className="font-cinzel text-sm text-[#d4af37] font-semibold">{confirmed.referenceNumber}</span>
            </p>
            <div className="p-4 bg-[#181512] border border-[#2b251c] text-left text-xs space-y-1.5 text-[#dcd2c4]">
              <div><span className="text-[#867969]">Area:</span> {confirmed.seatingPreference}</div>
              <div><span className="text-[#867969]">Party:</span> {confirmed.guests} Guests</div>
              <div><span className="text-[#867969]">Schedule:</span> {confirmed.date} at {confirmed.time}</div>
            </div>
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
                Table Reservation
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#fbf7f0] mt-1">
                Reserve Your Table
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-[#cdc1b1]">Seating Preference</label>
                <select
                  value={formData.seatingPreference}
                  onChange={(e) => setFormData({ ...formData, seatingPreference: e.target.value as SeatingPreference })}
                  className="w-full bg-[#181512] border border-[#2c251c] text-xs text-[#eee4d5] px-3.5 py-2.5 rounded-xs outline-none focus:border-[#c5a059]"
                >
                  <option value="Indoor Dining">Indoor Dining (Main Dining Room)</option>
                  <option value="Family Seating">Family Seating (Large Tables)</option>
                  <option value="Celebration Table">Celebration Table (With Special Decor)</option>
                  <option value="Private Dining">Private Dining (Exclusive Sanctuary)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-[#cdc1b1]">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#181512] border border-[#2c251c] text-xs text-[#eee4d5] px-3.5 py-2.5 rounded-xs outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-[#cdc1b1]">Guests</label>
                  <input
                    type="number"
                    min={1}
                    max={40}
                    required
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className="w-full bg-[#181512] border border-[#2c251c] text-xs text-[#eee4d5] px-3.5 py-2.5 rounded-xs outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-[#cdc1b1]">Dining Time</label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full bg-[#181512] border border-[#2c251c] text-xs text-[#eee4d5] px-3.5 py-2.5 rounded-xs outline-none focus:border-[#c5a059]"
                >
                  <option value="12:30 PM">12:30 PM (Lunch)</option>
                  <option value="01:30 PM">01:30 PM (Lunch)</option>
                  <option value="07:00 PM">07:00 PM (Dinner)</option>
                  <option value="07:30 PM">07:30 PM (Dinner)</option>
                  <option value="08:00 PM">08:00 PM (Dinner)</option>
                  <option value="08:30 PM">08:30 PM (Dinner)</option>
                  <option value="09:00 PM">09:00 PM (Late Dinner)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-[#cdc1b1]">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                <label className="text-xs uppercase tracking-wider text-[#cdc1b1]">Special Request</label>
                <input
                  type="text"
                  value={formData.specialRequest}
                  onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                  placeholder="e.g. Birthday, Anniversary, Jain preparation"
                  className="w-full bg-[#181512] border border-[#2c251c] text-xs text-[#eee4d5] px-3.5 py-2.5 rounded-xs outline-none focus:border-[#c5a059]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#c5a059] text-black font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#d8b569] transition-all rounded-xs shadow-xl mt-2"
              >
                {isSubmitting ? 'Confirming...' : 'Confirm Reservation'}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
