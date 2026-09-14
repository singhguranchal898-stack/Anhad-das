import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { 
  X, 
  Calendar, 
  Heart, 
  PartyPopper, 
  User, 
  LogOut, 
  ShieldAlert, 
  Clock, 
  MapPin, 
  Check, 
  Trash2, 
  Sparkles,
  Edit2,
  Database,
  Copy,
  CheckCheck
} from 'lucide-react';
import { SUPABASE_SQL_SCHEMA, SUPABASE_URL } from '../lib/supabase';

export const CustomerDashboardModal: React.FC = () => {
  const { 
    isDashboardOpen, 
    closeDashboard, 
    user, 
    logout, 
    reservations, 
    cancelReservation, 
    eventBookings, 
    favourites, 
    menuItems, 
    toggleFavourite,
    updateProfile,
    openReservationModal,
    supabaseStatus,
    showToast
  } = useRestaurant();

  const [activeTab, setActiveTab] = useState<'reservations' | 'favourites' | 'events' | 'profile' | 'admin'>('reservations');
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '');
  const [profileDiet, setProfileDiet] = useState(user?.dietaryPreference || '');
  const [showSqlSchema, setShowSqlSchema] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  if (!isDashboardOpen) return null;

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA.trim());
    setCopiedSql(true);
    showToast('Supabase SQL schema copied to clipboard!');
    setTimeout(() => setCopiedSql(false), 3000);
  };

  const userReservations = user?.role === 'admin' 
    ? reservations 
    : reservations.filter(r => !user || r.email.toLowerCase() === user.email.toLowerCase() || r.phone === user.phone);

  const userEvents = user?.role === 'admin'
    ? eventBookings
    : eventBookings.filter(e => !user || e.email.toLowerCase() === user.email.toLowerCase() || e.phone === user.phone);

  const favDishes = menuItems.filter(item => favourites.includes(item.id));

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: profileName,
      phone: profilePhone,
      dietaryPreference: profileDiet
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#110f0c] border border-[#c5a059]/40 max-w-4xl w-full rounded-xs shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-[#241f17] flex items-center justify-between bg-[#14120e]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#c5a059]/20 border border-[#c5a059] flex items-center justify-center text-[#c5a059] font-cinzel font-semibold">
              {user?.name ? user.name.charAt(0) : 'G'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif text-xl sm:text-2xl text-[#f5eee2] leading-none">
                  {user ? user.name : 'Guest Patron'}
                </h3>
                {user?.role === 'admin' && (
                  <span className="bg-[#c5a059] text-black text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">
                    Admin Portal
                  </span>
                )}
              </div>
              <p className="text-xs text-[#918575] mt-1">
                {user?.email || 'Complimentary guest session'}
              </p>
            </div>
          </div>

          <button
            onClick={closeDashboard}
            className="p-2 text-[#8c806f] hover:text-[#c5a059] rounded-full hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-2 border-b border-[#241f17] px-6 bg-[#0e0c0a] overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('reservations')}
            className={`py-3.5 px-3 text-xs uppercase tracking-wider font-cinzel transition-all border-b-2 whitespace-nowrap flex items-center space-x-1.5 ${
              activeTab === 'reservations'
                ? 'border-[#c5a059] text-[#c5a059] font-semibold'
                : 'border-transparent text-[#8a7e6e] hover:text-[#ded3c3]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>My Reservations ({userReservations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('favourites')}
            className={`py-3.5 px-3 text-xs uppercase tracking-wider font-cinzel transition-all border-b-2 whitespace-nowrap flex items-center space-x-1.5 ${
              activeTab === 'favourites'
                ? 'border-[#c5a059] text-[#c5a059] font-semibold'
                : 'border-transparent text-[#8a7e6e] hover:text-[#ded3c3]'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Favourite Dishes ({favDishes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`py-3.5 px-3 text-xs uppercase tracking-wider font-cinzel transition-all border-b-2 whitespace-nowrap flex items-center space-x-1.5 ${
              activeTab === 'events'
                ? 'border-[#c5a059] text-[#c5a059] font-semibold'
                : 'border-transparent text-[#8a7e6e] hover:text-[#ded3c3]'
            }`}
          >
            <PartyPopper className="w-3.5 h-3.5" />
            <span>Celebrations & Enquiries ({userEvents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3.5 px-3 text-xs uppercase tracking-wider font-cinzel transition-all border-b-2 whitespace-nowrap flex items-center space-x-1.5 ${
              activeTab === 'profile'
                ? 'border-[#c5a059] text-[#c5a059] font-semibold'
                : 'border-transparent text-[#8a7e6e] hover:text-[#ded3c3]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile Settings</span>
          </button>

          {user?.role === 'admin' && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`py-3.5 px-3 text-xs uppercase tracking-wider font-cinzel transition-all border-b-2 whitespace-nowrap flex items-center space-x-1.5 ${
                activeTab === 'admin'
                  ? 'border-amber-400 text-amber-400 font-semibold'
                  : 'border-transparent text-amber-500/70 hover:text-amber-400'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Owner Console</span>
            </button>
          )}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Supabase Status Banner */}
          <div className="p-3.5 bg-[#171410] border border-[#2d251a] rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <div>
                <span className="text-[#eee4d5] font-medium block sm:inline">
                  Supabase Backend Connected:
                </span>{' '}
                <span className="text-[#c5a059] font-mono text-[11px]">
                  gcyobblqgyxnujfxgcfi
                </span>
                <span className="text-[#8e8170] text-[11px] block sm:inline sm:ml-2">
                  (Appointments & Bookings sync active)
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowSqlSchema(!showSqlSchema)}
              className="px-3 py-1.5 bg-[#221c15] hover:bg-[#2e261d] text-[#c5a059] border border-[#3e3323] text-[11px] uppercase tracking-wider rounded-xs transition-colors flex items-center space-x-1.5 self-start sm:self-auto shrink-0"
            >
              <Database className="w-3.5 h-3.5" />
              <span>{showSqlSchema ? 'Hide SQL Schema' : 'View SQL Schema'}</span>
            </button>
          </div>

          {/* SQL Schema Accordion */}
          {showSqlSchema && (
            <div className="p-4 bg-[#0a0907] border border-[#3a3022] rounded-xs space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-cinzel text-xs text-[#d4af37] uppercase tracking-wider">
                    Supabase PostgreSQL Tables Setup
                  </h5>
                  <p className="text-[11px] text-[#8e8170]">
                    Run this in your Supabase SQL Editor if you want to initialize or inspect the tables.
                  </p>
                </div>
                <button
                  onClick={handleCopySql}
                  className="px-3 py-1 bg-[#c5a059] text-black font-semibold text-[11px] uppercase tracking-wider rounded-xs hover:bg-[#d8b569] flex items-center space-x-1.5"
                >
                  {copiedSql ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSql ? 'Copied!' : 'Copy SQL'}</span>
                </button>
              </div>
              <pre className="p-3 bg-[#110f0c] border border-[#221d16] text-[11px] text-[#c9bea9] font-mono overflow-x-auto max-h-48 scrollbar-thin">
                {SUPABASE_SQL_SCHEMA.trim()}
              </pre>
            </div>
          )}
          
          {/* TAB 1: RESERVATIONS */}
          {activeTab === 'reservations' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-[#a89c8b]">
                  Live Table Bookings
                </span>
                <button
                  onClick={() => {
                    closeDashboard();
                    openReservationModal();
                  }}
                  className="text-xs text-[#c5a059] hover:underline uppercase tracking-wider"
                >
                  + Book New Table
                </button>
              </div>

              {userReservations.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-[#2b251c] rounded-xs space-y-3">
                  <Calendar className="w-8 h-8 text-[#544a3c] mx-auto" />
                  <p className="text-sm text-[#a89c8b]">You have no active reservations yet.</p>
                  <button
                    onClick={() => {
                      closeDashboard();
                      openReservationModal();
                    }}
                    className="px-5 py-2 bg-[#c5a059] text-black text-xs uppercase tracking-widest font-semibold"
                  >
                    Reserve Now
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {userReservations.map((res) => (
                    <div
                      key={res.id}
                      className="p-4 sm:p-5 bg-[#161410] border border-[#292218] rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-cinzel text-sm font-semibold text-[#d4af37]">
                            {res.referenceNumber}
                          </span>
                          <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${
                            res.status === 'confirmed'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : res.status === 'cancelled'
                              ? 'bg-rose-950 text-rose-400 border border-rose-800'
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}>
                            {res.status}
                          </span>
                        </div>
                        <h4 className="font-serif text-lg text-[#f5ebd9]">
                          {res.seatingPreference} ({res.guests} Guests)
                        </h4>
                        <div className="flex items-center space-x-4 text-xs text-[#9e907f]">
                          <span>{res.date}</span>
                          <span>•</span>
                          <span>{res.time}</span>
                          <span>•</span>
                          <span>{res.name}</span>
                        </div>
                        {res.specialRequest && (
                          <p className="text-xs text-[#7e7262] italic pt-1">
                            Note: {res.specialRequest}
                          </p>
                        )}
                      </div>

                      {res.status !== 'cancelled' && (
                        <div className="shrink-0 flex sm:flex-col items-end gap-2">
                          <button
                            onClick={() => cancelReservation(res.id)}
                            className="px-3 py-1.5 bg-red-950/40 text-red-300 hover:bg-red-900/60 border border-red-800 text-xs tracking-wider uppercase rounded-xs transition-colors"
                          >
                            Cancel Table
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: FAVOURITES */}
          {activeTab === 'favourites' && (
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#a89c8b]">
                Your Hand-Selected Royal Menu Dishes
              </span>

              {favDishes.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-[#2b251c] rounded-xs space-y-3">
                  <Heart className="w-8 h-8 text-[#544a3c] mx-auto" />
                  <p className="text-sm text-[#a89c8b]">No favourite dishes saved yet.</p>
                  <p className="text-xs text-[#6e6353]">
                    Click the heart icon on any menu item across the site to save it to your private list.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {favDishes.map((dish) => (
                    <div
                      key={dish.id}
                      className="p-3.5 bg-[#161410] border border-[#292218] rounded-xs flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-14 h-14 object-cover rounded-xs shrink-0"
                        />
                        <div className="overflow-hidden">
                          <h5 className="font-serif text-base text-[#f5ebd9] truncate group-hover:text-[#c5a059] transition-colors">
                            {dish.name}
                          </h5>
                          <p className="text-xs text-[#c5a059] font-cinzel">₹{dish.price}</p>
                          <span className="text-[10px] text-[#827565] uppercase tracking-wider">{dish.cuisineTag}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleFavourite(dish.id)}
                        className="p-2 text-[#a39481] hover:text-red-400 shrink-0"
                        title="Remove from favourites"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: EVENTS & ENQUIRIES */}
          {activeTab === 'events' && (
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#a89c8b]">
                Submitted Event & Private Dining Enquiries
              </span>

              {userEvents.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-[#2b251c] rounded-xs space-y-3">
                  <PartyPopper className="w-8 h-8 text-[#544a3c] mx-auto" />
                  <p className="text-sm text-[#a89c8b]">No active event bookings or enquiries.</p>
                  <p className="text-xs text-[#6e6353]">
                    Host birthdays, anniversaries, or corporate banquets with dedicated decor and menus.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {userEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className="p-4 sm:p-5 bg-[#161410] border border-[#292218] rounded-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-cinzel text-sm font-semibold text-[#d4af37]">
                          {evt.referenceNumber}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#c5a059]/20 text-[#e9c578] border border-[#c5a059]/40">
                          {evt.status}
                        </span>
                      </div>
                      <h4 className="font-serif text-lg text-[#f5ebd9]">
                        {evt.eventType} ({evt.guests} Guests)
                      </h4>
                      <div className="flex items-center space-x-4 text-xs text-[#9e907f]">
                        <span>Date: {evt.preferredDate}</span>
                        <span>•</span>
                        <span>Time: {evt.preferredTime}</span>
                        <span>•</span>
                        <span>Contact: {evt.phone}</span>
                      </div>
                      {evt.specialRequirements && (
                        <p className="text-xs text-[#8f8170]">
                          Requirements: {evt.specialRequirements}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PROFILE SETTINGS */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSave} className="space-y-5 max-w-lg">
              <span className="text-xs uppercase tracking-widest text-[#a89c8b]">
                Personal & Dining Preferences
              </span>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#b8ab9a]">Full Name</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full bg-[#181512] border border-[#2e271f] text-sm text-[#f5eee2] px-4 py-2.5 rounded-xs outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#b8ab9a]">Phone Number</label>
                <input
                  type="tel"
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  className="w-full bg-[#181512] border border-[#2e271f] text-sm text-[#f5eee2] px-4 py-2.5 rounded-xs outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#b8ab9a]">Dietary & Spice Preferences</label>
                <input
                  type="text"
                  value={profileDiet}
                  onChange={(e) => setProfileDiet(e.target.value)}
                  placeholder="e.g. Mild spice, Jain food only, Nut allergy, etc."
                  className="w-full bg-[#181512] border border-[#2e271f] text-sm text-[#f5eee2] px-4 py-2.5 rounded-xs outline-none focus:border-[#c5a059]"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#c5a059] text-black text-xs uppercase tracking-widest font-semibold hover:bg-[#d8b569] transition-all"
              >
                Save Preferences
              </button>
            </form>
          )}

          {/* TAB 5: ADMIN / OWNER CONSOLE */}
          {activeTab === 'admin' && user?.role === 'admin' && (
            <div className="space-y-6">
              <div className="p-4 bg-amber-950/20 border border-amber-700/40 rounded-xs text-xs text-amber-200">
                Logged in with Master Concierge privileges. You can view all incoming bookings and manage live restaurant pricing.
              </div>

              <div className="space-y-3">
                <h4 className="font-cinzel text-sm uppercase text-[#c5a059] tracking-wider">
                  Total Reservations on Record: {reservations.length}
                </h4>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {reservations.map(r => (
                    <div key={r.id} className="p-3 bg-[#171410] border border-[#282117] flex justify-between items-center text-xs">
                      <div>
                        <span className="text-[#d4af37] font-semibold">{r.referenceNumber}</span> - {r.name} ({r.guests} guests)
                        <div className="text-[#887b6a]">{r.date} at {r.time} • {r.seatingPreference}</div>
                      </div>
                      <span className="uppercase text-[10px] px-2 py-0.5 bg-black/60 text-[#c5a059] border border-[#c5a059]/30">
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer with Logout */}
        <div className="p-4 bg-[#14120e] border-t border-[#241f17] flex justify-between items-center text-xs">
          {user ? (
            <button
              onClick={() => {
                logout();
                closeDashboard();
              }}
              className="text-red-400 hover:text-red-300 flex items-center space-x-1.5 transition-colors uppercase tracking-wider text-[11px]"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out Of Guest Circle</span>
            </button>
          ) : (
            <span className="text-[#7d705f]">Browsing as guest patron</span>
          )}

          <button
            onClick={closeDashboard}
            className="px-5 py-2 bg-[#201c16] hover:bg-[#2b251e] text-[#ded3c3] text-xs uppercase tracking-wider transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
