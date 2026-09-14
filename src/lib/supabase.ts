import { createClient } from '@supabase/supabase-js';

// Default provided credentials with environment variable override support
export const SUPABASE_URL: string = 
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_URL) || 
  'https://gcyobblqgyxnujfxgcfi.supabase.co';

export const SUPABASE_ANON_KEY: string = 
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_ANON_KEY) || 
  'sb_publishable_8vmp3Use7pS8XBf6YlFTmw_MSZzSZPg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export const SUPABASE_SQL_SCHEMA = `
-- 1. Appointments & Event Bookings Table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reference_number TEXT,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  event_type TEXT,
  preferred_date TEXT,
  preferred_time TEXT,
  guests INTEGER,
  special_requirements TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable public inserts if RLS is on
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert access" ON appointments FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Public select access" ON appointments FOR SELECT TO anon USING (true);

-- 2. Restaurant Table Reservations Table
CREATE TABLE IF NOT EXISTS reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reference_number TEXT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  guests INTEGER NOT NULL,
  seating_preference TEXT,
  special_request TEXT,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert access" ON reservations FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Public select access" ON reservations FOR SELECT TO anon USING (true);

-- 3. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert access" ON contact_messages FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Public select access" ON contact_messages FOR SELECT TO anon USING (true);
`;

/**
 * Saves appointment / event booking to Supabase.
 * Tries tables: 'appointments', 'event_bookings', 'bookings', 'reservations'.
 */
export async function insertAppointmentBookingToSupabase(booking: {
  id?: string;
  referenceNumber: string;
  fullName: string;
  phone: string;
  email: string;
  eventType: string;
  preferredDate: string;
  preferredTime: string;
  guests: number;
  specialRequirements?: string;
  message?: string;
  status?: string;
}) {
  const payloadSnake = {
    reference_number: booking.referenceNumber,
    full_name: booking.fullName,
    phone: booking.phone,
    email: booking.email,
    event_type: booking.eventType,
    preferred_date: booking.preferredDate,
    preferred_time: booking.preferredTime,
    guests: booking.guests,
    special_requirements: booking.specialRequirements || '',
    message: booking.message || '',
    status: booking.status || 'pending',
    created_at: new Date().toISOString()
  };

  const payloadCamel = {
    referenceNumber: booking.referenceNumber,
    fullName: booking.fullName,
    phone: booking.phone,
    email: booking.email,
    eventType: booking.eventType,
    preferredDate: booking.preferredDate,
    preferredTime: booking.preferredTime,
    guests: booking.guests,
    specialRequirements: booking.specialRequirements || '',
    message: booking.message || '',
    status: booking.status || 'pending',
    createdAt: new Date().toISOString()
  };

  const targetTables = ['appointments', 'event_bookings', 'bookings', 'reservations'];
  let lastError: any = null;

  for (const table of targetTables) {
    try {
      // First try snake_case payload
      const { data, error } = await supabase.from(table).insert([payloadSnake]).select();
      if (!error) {
        console.log(`[Supabase] Successfully saved appointment booking to table: "${table}"`, data);
        return { success: true, table, data };
      }

      // If schema mismatch (e.g. column name camelCase), try camelCase payload
      if (error && error.code !== '42P01') {
        const retryCamel = await supabase.from(table).insert([payloadCamel]).select();
        if (!retryCamel.error) {
          console.log(`[Supabase] Successfully saved appointment booking with camelCase to table: "${table}"`, retryCamel.data);
          return { success: true, table, data: retryCamel.data };
        }
      }

      lastError = error;
    } catch (err) {
      lastError = err;
    }
  }

  console.warn('[Supabase] Could not insert appointment to Supabase. Last error:', lastError);
  return { 
    success: false, 
    error: lastError,
    message: lastError?.message || 'Table not found or permission issue'
  };
}

/**
 * Saves restaurant table reservation to Supabase.
 * Tries tables: 'reservations', 'table_reservations', 'appointments', 'bookings'.
 */
export async function insertTableReservationToSupabase(reservation: {
  id?: string;
  referenceNumber: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference: string;
  specialRequest?: string;
  status?: string;
}) {
  const payloadSnake = {
    reference_number: reservation.referenceNumber,
    name: reservation.name,
    phone: reservation.phone,
    email: reservation.email,
    date: reservation.date,
    time: reservation.time,
    guests: reservation.guests,
    seating_preference: reservation.seatingPreference,
    special_request: reservation.specialRequest || '',
    status: reservation.status || 'confirmed',
    created_at: new Date().toISOString()
  };

  const payloadCamel = {
    referenceNumber: reservation.referenceNumber,
    name: reservation.name,
    phone: reservation.phone,
    email: reservation.email,
    date: reservation.date,
    time: reservation.time,
    guests: reservation.guests,
    seatingPreference: reservation.seatingPreference,
    specialRequest: reservation.specialRequest || '',
    status: reservation.status || 'confirmed',
    createdAt: new Date().toISOString()
  };

  const targetTables = ['reservations', 'table_reservations', 'appointments', 'bookings'];
  let lastError: any = null;

  for (const table of targetTables) {
    try {
      const { data, error } = await supabase.from(table).insert([payloadSnake]).select();
      if (!error) {
        console.log(`[Supabase] Successfully saved table reservation to table: "${table}"`, data);
        return { success: true, table, data };
      }

      if (error && error.code !== '42P01') {
        const retryCamel = await supabase.from(table).insert([payloadCamel]).select();
        if (!retryCamel.error) {
          console.log(`[Supabase] Successfully saved table reservation with camelCase to table: "${table}"`, retryCamel.data);
          return { success: true, table, data: retryCamel.data };
        }
      }

      lastError = error;
    } catch (err) {
      lastError = err;
    }
  }

  console.warn('[Supabase] Could not insert reservation to Supabase. Last error:', lastError);
  return { 
    success: false, 
    error: lastError,
    message: lastError?.message || 'Table not found or permission issue'
  };
}

/**
 * Saves contact inquiry message to Supabase.
 */
export async function insertContactMessageToSupabase(message: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const payload = {
    name: message.name,
    email: message.email,
    phone: message.phone || '',
    subject: message.subject,
    message: message.message,
    created_at: new Date().toISOString()
  };

  const targetTables = ['contact_messages', 'inquiries', 'messages', 'contacts'];
  let lastError: any = null;

  for (const table of targetTables) {
    try {
      const { data, error } = await supabase.from(table).insert([payload]).select();
      if (!error) {
        console.log(`[Supabase] Successfully saved contact message to table: "${table}"`, data);
        return { success: true, table, data };
      }
      lastError = error;
    } catch (err) {
      lastError = err;
    }
  }

  return { success: false, error: lastError };
}

/**
 * Fetches appointment bookings from Supabase
 */
export async function fetchAppointmentsFromSupabase() {
  const candidateTables = ['appointments', 'event_bookings', 'bookings'];
  for (const tbl of candidateTables) {
    try {
      const { data, error } = await supabase
        .from(tbl)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      if (!error && data && data.length > 0) {
        return { success: true, table: tbl, data };
      }
    } catch {
      // try next
    }
  }
  return { success: false, data: [] };
}

/**
 * Fetches reservations from Supabase
 */
export async function fetchReservationsFromSupabase() {
  const candidateTables = ['reservations', 'table_reservations'];
  for (const tbl of candidateTables) {
    try {
      const { data, error } = await supabase
        .from(tbl)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      if (!error && data && data.length > 0) {
        return { success: true, table: tbl, data };
      }
    } catch {
      // try next
    }
  }
  return { success: false, data: [] };
}
