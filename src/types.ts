export type MenuCategoryType = 
  | 'STARTERS'
  | 'TANDOOR'
  | 'MAIN COURSE'
  | 'BIRYANI'
  | 'BREADS'
  | 'DESSERTS'
  | 'BEVERAGES';

export type CuisineType = 
  | 'North Indian'
  | 'Mughlai'
  | 'Punjabi'
  | 'Tandoor'
  | 'Vegetarian'
  | 'Non-Vegetarian'
  | 'Breads'
  | 'Rice & Biryani'
  | 'Desserts'
  | 'Beverages';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategoryType;
  cuisineTag: CuisineType;
  description: string;
  price: number;
  isVeg: boolean;
  isChefSpecial?: boolean;
  spiceLevel?: 1 | 2 | 3;
  image: string;
  preparationTime?: string;
  serves?: string;
  pairingNotes?: string;
}

export type SeatingPreference = 
  | 'Indoor Dining'
  | 'Family Seating'
  | 'Private Dining'
  | 'Celebration Table';

export interface Reservation {
  id: string;
  referenceNumber: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference: SeatingPreference;
  specialRequest?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
  supabaseSyncStatus?: {
    success: boolean;
    table?: string;
    error?: string;
    isPermissionError?: boolean;
  };
}

export type EventType = 
  | 'Birthday'
  | 'Anniversary'
  | 'Family Party'
  | 'Corporate Event'
  | 'Engagement'
  | 'Private Dinner'
  | 'Other';

export interface EventBooking {
  id: string;
  referenceNumber: string;
  fullName: string;
  phone: string;
  email: string;
  eventType: EventType;
  preferredDate: string;
  preferredTime: string;
  guests: number;
  specialRequirements?: string;
  message?: string;
  status: 'received' | 'reviewing' | 'confirmed';
  createdAt: string;
  supabaseSyncStatus?: {
    success: boolean;
    table?: string;
    error?: string;
    isPermissionError?: boolean;
  };
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  dietaryPreference?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'FOOD' | 'INTERIORS' | 'FAMILY' | 'CELEBRATIONS' | 'EVENTS' | 'AMBIENCE';
  imageUrl: string;
  caption: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  occasion: string;
  date: string;
  city?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Reservations' | 'Dining & Menu' | 'Events & Private Dining';
}
