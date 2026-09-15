import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  MenuItem, 
  Reservation, 
  EventBooking, 
  ContactMessage, 
  UserProfile, 
  GalleryItem, 
  SeatingPreference, 
  EventType 
} from '../types';
import { MENU_ITEMS } from '../data/restaurantData';
import { 
  insertAppointmentBookingToSupabase, 
  insertTableReservationToSupabase, 
  insertContactMessageToSupabase,
  fetchAppointmentsFromSupabase,
  fetchReservationsFromSupabase,
  testSupabaseAppointmentsConnection,
  SUPABASE_URL
} from '../lib/supabase';

interface RestaurantContextType {
  // Auth
  user: UserProfile | null;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, pass: string) => Promise<boolean>;
  demoLogin: (role?: 'customer' | 'admin') => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;

  // Supabase Backend Info
  supabaseStatus: {
    connected: boolean;
    projectId: string;
    lastSyncedTable: string | null;
    lastSyncSuccess: boolean | null;
    lastSyncError: string | null;
    isChecking: boolean;
    checkConnection: () => Promise<{ ok: boolean; message: string }>;
    retrySyncBooking: (bookingId: string) => Promise<boolean>;
  };

  // Favourites
  favourites: string[];
  toggleFavourite: (dishId: string) => void;
  isFavourite: (dishId: string) => boolean;

  // Reservations
  reservations: Reservation[];
  makeReservation: (data: {
    name: string;
    phone: string;
    email: string;
    date: string;
    time: string;
    guests: number;
    seatingPreference: SeatingPreference;
    specialRequest?: string;
  }) => Promise<Reservation>;
  cancelReservation: (id: string) => void;

  // Events
  eventBookings: EventBooking[];
  requestEventBooking: (data: {
    fullName: string;
    phone: string;
    email: string;
    eventType: EventType;
    preferredDate: string;
    preferredTime: string;
    guests: number;
    specialRequirements?: string;
    message?: string;
  }) => Promise<EventBooking>;

  // Contact
  submitContactMessage: (data: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }) => Promise<boolean>;

  // Modals & UI States
  isReservationModalOpen: boolean;
  openReservationModal: (seating?: SeatingPreference) => void;
  closeReservationModal: () => void;
  
  isEventModalOpen: boolean;
  openEventModal: (type?: EventType) => void;
  closeEventModal: () => void;

  isAuthModalOpen: boolean;
  openAuthModal: (initialMode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  authModalMode: 'login' | 'register';

  isDashboardOpen: boolean;
  openDashboard: () => void;
  closeDashboard: () => void;

  lightboxItem: GalleryItem | null;
  openLightbox: (item: GalleryItem) => void;
  closeLightbox: () => void;

  isStoryModalOpen: boolean;
  openStoryModal: () => void;
  closeStoryModal: () => void;

  // Notification Toast
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;

  // Owner/Admin Menu Management
  menuItems: MenuItem[];
  updateMenuItemPrice: (id: string, newPrice: number) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

const DEMO_USER: UserProfile = {
  id: 'usr_demo_1',
  name: 'Vikramaditya Singhania',
  email: 'vikram.singhania@heritage.in',
  phone: '+91 98110 54321',
  role: 'customer',
  dietaryPreference: 'Chef tasting with subtle spice, non-veg connoisseur'
};

const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res-demo-1',
    referenceNumber: 'AD-84920',
    name: 'Vikramaditya Singhania',
    phone: '+91 98110 54321',
    email: 'vikram.singhania@heritage.in',
    date: '2026-09-20',
    time: '08:00 PM',
    guests: 4,
    seatingPreference: 'Celebration Table',
    specialRequest: 'Anniversary floral arrangement and vintage table candleholder please.',
    status: 'confirmed',
    createdAt: '2026-09-10T14:30:00.000Z'
  }
];

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth state
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('anhad_das_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Favourites state
  const [favourites, setFavourites] = useState<string[]>(() => {
    const saved = localStorage.getItem('anhad_das_favs');
    return saved ? JSON.parse(saved) : ['m8', 'm9', 'm12']; // Butter Chicken, Dal Makhani, Biryani default favs
  });

  // Reservations state
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('anhad_das_reservations');
    return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
  });

  // Event Bookings state
  const [eventBookings, setEventBookings] = useState<EventBooking[]>(() => {
    const saved = localStorage.getItem('anhad_das_events');
    return saved ? JSON.parse(saved) : [];
  });

  // Menu items (allows owner to update prices)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('anhad_das_menu');
    return saved ? JSON.parse(saved) : MENU_ITEMS;
  });

  // Modals
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [reservationPrefSeating, setReservationPrefSeating] = useState<SeatingPreference>('Indoor Dining');
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState<EventType>('Birthday');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Supabase Backend Status
  const [supabaseStatus, setSupabaseStatus] = useState<{
    connected: boolean;
    projectId: string;
    lastSyncedTable: string | null;
    lastSyncSuccess: boolean | null;
    lastSyncError: string | null;
    isChecking: boolean;
  }>({
    connected: true,
    projectId: 'gcyobblqgyxnujfxgcfi',
    lastSyncedTable: null,
    lastSyncSuccess: null,
    lastSyncError: null,
    isChecking: false,
  });

  const checkConnection = async (): Promise<{ ok: boolean; message: string }> => {
    setSupabaseStatus(s => ({ ...s, isChecking: true }));
    const result = await testSupabaseAppointmentsConnection();
    setSupabaseStatus(s => ({
      ...s,
      isChecking: false,
      lastSyncSuccess: result.ok,
      lastSyncError: result.ok ? null : result.message,
    }));
    return { ok: result.ok, message: result.message };
  };

  const retrySyncBooking = async (bookingId: string): Promise<boolean> => {
    const booking = eventBookings.find(b => b.id === bookingId);
    if (!booking) return false;

    try {
      const res = await insertAppointmentBookingToSupabase(booking);
      if (res.success) {
        setEventBookings(prev =>
          prev.map(b =>
            b.id === bookingId
              ? {
                  ...b,
                  supabaseSyncStatus: {
                    success: true,
                    table: res.table || 'appointments',
                  },
                }
              : b
          )
        );
        setSupabaseStatus(s => ({
          ...s,
          lastSyncedTable: res.table || 'appointments',
          lastSyncSuccess: true,
          lastSyncError: null,
        }));
        showToast(`Saved to Supabase appointments table! Ref: ${booking.referenceNumber}`);
        return true;
      } else {
        setEventBookings(prev =>
          prev.map(b =>
            b.id === bookingId
              ? {
                  ...b,
                  supabaseSyncStatus: {
                    success: false,
                    error: res.message,
                    isPermissionError: res.isPermissionError,
                  },
                }
              : b
          )
        );
        setSupabaseStatus(s => ({
          ...s,
          lastSyncSuccess: false,
          lastSyncError: res.message || 'Supabase permission denied',
        }));
        showToast(res.message || 'Supabase sync failed', 'error');
        return false;
      }
    } catch (err: any) {
      showToast(err?.message || 'Failed to retry sync', 'error');
      return false;
    }
  };

  // On mount: fetch existing data from Supabase if tables exist
  useEffect(() => {
    async function syncFromSupabase() {
      try {
        const apts = await fetchAppointmentsFromSupabase();
        if (apts.success && apts.data && apts.data.length > 0) {
          setEventBookings(prev => {
            const existingIds = new Set(prev.map(p => p.referenceNumber));
            const mapped: EventBooking[] = apts.data.map((row: any) => ({
              id: row.id || ('evt-' + Date.now()),
              referenceNumber: row.reference_number || row.referenceNumber || ('EVT-' + Math.floor(10000 + Math.random() * 90000)),
              fullName: row.full_name || row.fullName || row.name || 'Valued Guest',
              phone: row.phone || '',
              email: row.email || '',
              eventType: row.event_type || row.eventType || 'Birthday',
              preferredDate: row.preferred_date || row.preferredDate || '',
              preferredTime: row.preferred_time || row.preferredTime || '',
              guests: Number(row.guests) || 2,
              specialRequirements: row.special_requirements || row.specialRequirements || '',
              message: row.message || '',
              status: row.status || 'received',
              createdAt: row.created_at || row.createdAt || new Date().toISOString()
            }));
            const fresh = mapped.filter(m => !existingIds.has(m.referenceNumber));
            return [...fresh, ...prev];
          });
          setSupabaseStatus(s => ({ ...s, lastSyncedTable: apts.table || 'appointments' }));
        }

        const resv = await fetchReservationsFromSupabase();
        if (resv.success && resv.data && resv.data.length > 0) {
          setReservations(prev => {
            const existingRefs = new Set(prev.map(p => p.referenceNumber));
            const mapped: Reservation[] = resv.data.map((row: any) => ({
              id: row.id || ('res-' + Date.now()),
              referenceNumber: row.reference_number || row.referenceNumber || ('AD-' + Math.floor(10000 + Math.random() * 90000)),
              name: row.name || 'Valued Patron',
              phone: row.phone || '',
              email: row.email || '',
              date: row.date || '',
              time: row.time || '',
              guests: Number(row.guests) || 2,
              seatingPreference: row.seating_preference || row.seatingPreference || 'Indoor Dining',
              specialRequest: row.special_request || row.specialRequest || '',
              status: row.status || 'confirmed',
              createdAt: row.created_at || row.createdAt || new Date().toISOString()
            }));
            const fresh = mapped.filter(m => !existingRefs.has(m.referenceNumber));
            return [...fresh, ...prev];
          });
        }
      } catch (err) {
        console.warn('[Supabase] Initial sync attempt:', err);
      }
    }

    syncFromSupabase();
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('anhad_das_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('anhad_das_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('anhad_das_favs', JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    localStorage.setItem('anhad_das_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('anhad_das_events', JSON.stringify(eventBookings));
  }, [eventBookings]);

  useEffect(() => {
    localStorage.setItem('anhad_das_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const login = async (email: string) => {
    // Simulated realistic authentication
    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email,
      phone: '+91 98201 12345',
      role: email.toLowerCase().includes('admin') ? 'admin' : 'customer'
    };
    setUser(newUser);
    showToast(`Welcome back, ${newUser.name}. Your table awaits.`);
    setIsAuthModalOpen(false);
    return true;
  };

  const register = async (name: string, email: string, phone: string) => {
    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      name,
      email,
      phone,
      role: 'customer'
    };
    setUser(newUser);
    showToast(`Welcome to the Anhad Das Guest Circle, ${name}.`);
    setIsAuthModalOpen(false);
    return true;
  };

  const demoLogin = (role: 'customer' | 'admin' = 'customer') => {
    if (role === 'admin') {
      const adminUser: UserProfile = {
        id: 'usr_admin_1',
        name: 'Executive Concierge (Admin)',
        email: 'concierge@anhaddas.com',
        phone: '+91 98712 34500',
        role: 'admin'
      };
      setUser(adminUser);
      showToast('Admin Mode Active: Full restaurant management access granted.', 'info');
    } else {
      setUser(DEMO_USER);
      showToast(`Logged in as ${DEMO_USER.name}.`);
    }
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    showToast('You have been safely signed out. We look forward to your next visit.', 'info');
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    setUser({ ...user, ...data });
    showToast('Your profile preferences have been updated.');
  };

  const toggleFavourite = (dishId: string) => {
    setFavourites(prev => {
      const exists = prev.includes(dishId);
      const updated = exists ? prev.filter(id => id !== dishId) : [...prev, dishId];
      const dish = menuItems.find(d => d.id === dishId);
      if (!exists && dish) {
        showToast(`"${dish.name}" added to your curated favourites.`);
      } else if (dish) {
        showToast(`"${dish.name}" removed from favourites.`, 'info');
      }
      return updated;
    });
  };

  const isFavourite = (dishId: string) => favourites.includes(dishId);

  const makeReservation = async (data: {
    name: string;
    phone: string;
    email: string;
    date: string;
    time: string;
    guests: number;
    seatingPreference: SeatingPreference;
    specialRequest?: string;
  }): Promise<Reservation> => {
    const refCode = 'AD-' + Math.floor(10000 + Math.random() * 90000);
    const newRes: Reservation = {
      id: 'res-' + Date.now(),
      referenceNumber: refCode,
      ...data,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    setReservations(prev => [newRes, ...prev]);

    // Save to Supabase
    try {
      const sbRes = await insertTableReservationToSupabase(newRes);
      if (sbRes.success) {
        setSupabaseStatus(s => ({ ...s, lastSyncedTable: sbRes.table || 'reservations' }));
        showToast(`Table reservation ${refCode} saved to Supabase (${sbRes.table}).`);
      } else {
        showToast(`Reservation ${refCode} confirmed for ${data.guests} guests on ${data.date}.`);
      }
    } catch {
      showToast(`Reservation ${refCode} confirmed for ${data.guests} guests on ${data.date}.`);
    }

    return newRes;
  };

  const cancelReservation = (id: string) => {
    setReservations(prev =>
      prev.map(r => (r.id === id ? { ...r, status: 'cancelled' } : r))
    );
    showToast('Reservation has been cancelled. An update has been noted.', 'info');
  };

  const requestEventBooking = async (data: {
    fullName: string;
    phone: string;
    email: string;
    eventType: EventType;
    preferredDate: string;
    preferredTime: string;
    guests: number;
    specialRequirements?: string;
    message?: string;
  }): Promise<EventBooking> => {
    const refCode = 'EVT-' + Math.floor(10000 + Math.random() * 90000);
    const newBooking: EventBooking = {
      id: 'evt-' + Date.now(),
      referenceNumber: refCode,
      ...data,
      status: 'received',
      createdAt: new Date().toISOString(),
      supabaseSyncStatus: {
        success: false,
        isPermissionError: false,
      }
    };

    // Save appointment booking to Supabase
    try {
      const sbResult = await insertAppointmentBookingToSupabase(newBooking);
      if (sbResult.success) {
        newBooking.supabaseSyncStatus = {
          success: true,
          table: sbResult.table || 'appointments',
        };
        setSupabaseStatus(s => ({
          ...s,
          lastSyncedTable: sbResult.table || 'appointments',
          lastSyncSuccess: true,
          lastSyncError: null
        }));
        showToast(`Appointment saved to Supabase (${sbResult.table || 'appointments'})! Ref: ${refCode}`);
      } else {
        newBooking.supabaseSyncStatus = {
          success: false,
          error: sbResult.message,
          isPermissionError: sbResult.isPermissionError,
        };
        setSupabaseStatus(s => ({
          ...s,
          lastSyncSuccess: false,
          lastSyncError: sbResult.message || 'Permission denied in Supabase',
        }));
        if (sbResult.isPermissionError) {
          showToast(`Supabase Error 42501: Permission denied for table 'appointments'.`, 'error');
        } else {
          showToast(`Appointment ${refCode} recorded. Note: Supabase insert failed: ${sbResult.message}`, 'info');
        }
      }
    } catch (err: any) {
      newBooking.supabaseSyncStatus = {
        success: false,
        error: err?.message || 'Network error',
      };
      showToast(`Appointment ${refCode} recorded locally.`, 'info');
    }

    setEventBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const submitContactMessage = async (data: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }): Promise<boolean> => {
    const savedMsg: ContactMessage = {
      id: 'msg-' + Date.now(),
      ...data,
      createdAt: new Date().toISOString()
    };
    const prev = JSON.parse(localStorage.getItem('anhad_das_messages') || '[]');
    localStorage.setItem('anhad_das_messages', JSON.stringify([savedMsg, ...prev]));

    // Async sync to Supabase
    insertContactMessageToSupabase(data).catch(() => {});
    showToast('Thank you for writing to us. Our concierge desk will respond promptly.');
    return true;
  };

  const openReservationModal = (seating: SeatingPreference = 'Indoor Dining') => {
    setReservationPrefSeating(seating);
    setIsReservationModalOpen(true);
  };

  const closeReservationModal = () => setIsReservationModalOpen(false);

  const openEventModal = (type: EventType = 'Birthday') => {
    setSelectedEventType(type);
    setIsEventModalOpen(true);
  };

  const closeEventModal = () => setIsEventModalOpen(false);

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  const openDashboard = () => setIsDashboardOpen(true);
  const closeDashboard = () => setIsDashboardOpen(false);

  const openLightbox = (item: GalleryItem) => setLightboxItem(item);
  const closeLightbox = () => setLightboxItem(null);

  const openStoryModal = () => setIsStoryModalOpen(true);
  const closeStoryModal = () => setIsStoryModalOpen(false);

  const updateMenuItemPrice = (id: string, newPrice: number) => {
    setMenuItems(prev => prev.map(m => (m.id === id ? { ...m, price: newPrice } : m)));
    showToast('Menu price updated across live dining system.');
  };

  return (
    <RestaurantContext.Provider
      value={{
        user,
        login,
        register,
        demoLogin,
        logout,
        updateProfile,
        favourites,
        toggleFavourite,
        isFavourite,
        reservations,
        makeReservation,
        cancelReservation,
        eventBookings,
        requestEventBooking,
        submitContactMessage,
        isReservationModalOpen,
        openReservationModal,
        closeReservationModal,
        isEventModalOpen,
        openEventModal,
        closeEventModal,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalMode,
        isDashboardOpen,
        openDashboard,
        closeDashboard,
        lightboxItem,
        openLightbox,
        closeLightbox,
        isStoryModalOpen,
        openStoryModal,
        closeStoryModal,
        toast,
        showToast,
        menuItems,
        updateMenuItemPrice,
        supabaseStatus: {
          ...supabaseStatus,
          checkConnection,
          retrySyncBooking,
        }
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
