import { createClient } from '@supabase/supabase-js';

// Supabase configuration
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

export const SUPABASE_FIX_SQL = `-- ⚡ QUICK FIX: Grant permissions to your Supabase "appointments" table
-- Copy and run this in your Supabase Dashboard -> SQL Editor:

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON TABLE public.appointments TO anon, authenticated, service_role;
ALTER TABLE public.appointments DISABLE ROW LEVEL SECURITY;

-- If you want Row Level Security enabled instead, use these policies:
-- ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
-- DROP POLICY IF EXISTS "Enable insert for everyone" ON public.appointments;
-- CREATE POLICY "Enable insert for everyone" ON public.appointments FOR INSERT TO anon, authenticated WITH CHECK (true);
-- DROP POLICY IF EXISTS "Enable select for everyone" ON public.appointments FOR SELECT TO anon, authenticated USING (true);
`;

export const SUPABASE_SQL_SCHEMA = `-- Complete Supabase Database Setup for ANHAD DAS

-- 1. Appointments & Event Bookings Table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reference_number TEXT,
  full_name TEXT,
  name TEXT,
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

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON TABLE public.appointments TO anon, authenticated, service_role;
ALTER TABLE public.appointments DISABLE ROW LEVEL SECURITY;

-- 2. Restaurant Table Reservations Table (Optional if using separate table)
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

GRANT ALL ON TABLE public.reservations TO anon, authenticated, service_role;
ALTER TABLE public.reservations DISABLE ROW LEVEL SECURITY;
`;

/**
 * Tests the live connection and permissions of the appointments table in Supabase.
 */
export async function testSupabaseAppointmentsConnection(): Promise<{
  ok: boolean;
  status: 'connected' | 'permission_denied' | 'table_not_found' | 'error';
  code?: string;
  message: string;
  hint?: string | null;
}> {
  try {
    const { error } = await supabase.from('appointments').select('*').limit(1);

    if (!error) {
      return {
        ok: true,
        status: 'connected',
        message: 'Successfully connected and read from "appointments" table.'
      };
    }

    if (error.code === '42501') {
      return {
        ok: false,
        status: 'permission_denied',
        code: error.code,
        message: 'Permission denied for table appointments (PostgreSQL Error 42501).',
        hint: error.hint || 'Run GRANT ALL ON TABLE public.appointments TO anon; in Supabase SQL Editor.'
      };
    }

    if (error.code === 'PGRST205' || error.code === '42P01') {
      return {
        ok: false,
        status: 'table_not_found',
        code: error.code,
        message: 'Table "appointments" was not found in Supabase.',
        hint: 'Create the table using the SQL Editor in Supabase.'
      };
    }

    return {
      ok: false,
      status: 'error',
      code: error.code,
      message: error.message,
      hint: error.hint
    };
  } catch (err: any) {
    return {
      ok: false,
      status: 'error',
      message: err?.message || 'Unknown network error connecting to Supabase.'
    };
  }
}

/**
 * Saves appointment / event booking to Supabase.
 * Features smart column fallback and comprehensive error analysis.
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
}): Promise<{
  success: boolean;
  table?: string;
  data?: any;
  error?: any;
  code?: string;
  isPermissionError?: boolean;
  message?: string;
}> {
  // Candidate payload structures to match whatever column names exist in the user's table
  const payloads = [
    // 1. Full standard snake_case
    {
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
    },
    // 2. Simplified snake_case with common variants
    {
      reference_number: booking.referenceNumber,
      full_name: booking.fullName,
      name: booking.fullName,
      phone: booking.phone,
      email: booking.email,
      date: booking.preferredDate,
      time: booking.preferredTime,
      guests: booking.guests,
      status: booking.status || 'pending',
    },
    // 3. camelCase format
    {
      referenceNumber: booking.referenceNumber,
      fullName: booking.fullName,
      phone: booking.phone,
      email: booking.email,
      eventType: booking.eventType,
      preferredDate: booking.preferredDate,
      preferredTime: booking.preferredTime,
      guests: booking.guests,
      status: booking.status || 'pending',
    },
    // 4. Minimal essential fields
    {
      full_name: booking.fullName,
      phone: booking.phone,
      email: booking.email,
    },
    // 5. Minimal with "name" instead of "full_name"
    {
      name: booking.fullName,
      phone: booking.phone,
      email: booking.email,
    }
  ];

  const targetTables = ['appointments', 'event_bookings', 'bookings'];
  let lastError: any = null;

  for (const table of targetTables) {
    for (const payload of payloads) {
      try {
        const { data, error } = await supabase.from(table).insert([payload]).select();
        
        if (!error) {
          console.log(`[Supabase] Successfully saved appointment booking to table "${table}"!`, data);
          return { success: true, table, data };
        }

        lastError = error;

        // If permission denied, no need to try different column variants on this table
        if (error.code === '42501') {
          console.warn(`[Supabase] Permission denied (42501) on table "${table}":`, error.message);
          return {
            success: false,
            table,
            error,
            code: '42501',
            isPermissionError: true,
            message: 'Permission denied on Supabase table. PostgreSQL error 42501: anon role lacks privileges or RLS is blocking inserts.'
          };
        }

        // If table doesn't exist, break to next table
        if (error.code === 'PGRST205' || error.code === '42P01') {
          break;
        }

        // If column error (PGRST204 or 42703), the loop will continue to try the next simpler payload
      } catch (err: any) {
        lastError = err;
      }
    }
  }

  return {
    success: false,
    error: lastError,
    code: lastError?.code,
    isPermissionError: lastError?.code === '42501',
    message: lastError?.message || 'Failed to insert row into Supabase'
  };
}

/**
 * Saves restaurant table reservation to Supabase.
 * Tries 'reservations', and falls back to 'appointments' if 'reservations' doesn't exist.
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
}): Promise<{
  success: boolean;
  table?: string;
  data?: any;
  error?: any;
  code?: string;
  isPermissionError?: boolean;
}> {
  // First try 'reservations'
  try {
    const { data, error } = await supabase.from('reservations').insert([{
      reference_number: reservation.referenceNumber,
      name: reservation.name,
      phone: reservation.phone,
      email: reservation.email,
      date: reservation.date,
      time: reservation.time,
      guests: reservation.guests,
      seating_preference: reservation.seatingPreference,
      special_request: reservation.specialRequest || '',
      status: reservation.status || 'confirmed'
    }]).select();

    if (!error) {
      return { success: true, table: 'reservations', data };
    }
    
    if (error.code === '42501') {
      return { success: false, table: 'reservations', error, code: '42501', isPermissionError: true };
    }
  } catch {
    // try fallback
  }

  // Fallback: Store into 'appointments' table as an appointment with event_type = "Table Reservation"
  return insertAppointmentBookingToSupabase({
    referenceNumber: reservation.referenceNumber,
    fullName: reservation.name,
    phone: reservation.phone,
    email: reservation.email,
    eventType: `Table Reservation (${reservation.seatingPreference})`,
    preferredDate: reservation.date,
    preferredTime: reservation.time,
    guests: reservation.guests,
    specialRequirements: reservation.specialRequest || '',
    status: reservation.status || 'confirmed'
  });
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
  try {
    const { data, error } = await supabase.from('contact_messages').insert([{
      name: message.name,
      email: message.email,
      phone: message.phone || '',
      subject: message.subject,
      message: message.message
    }]).select();

    if (!error) {
      return { success: true, table: 'contact_messages', data };
    }
  } catch {
    // silent
  }
  return { success: false };
}

/**
 * Fetches appointment bookings from Supabase
 */
export async function fetchAppointmentsFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
      
    if (!error && data) {
      return { success: true, table: 'appointments', data };
    }
    return { success: false, error };
  } catch (err: any) {
    return { success: false, error: err };
  }
}

/**
 * Fetches reservations from Supabase
 */
export async function fetchReservationsFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
      
    if (!error && data) {
      return { success: true, table: 'reservations', data };
    }
    return { success: false, error };
  } catch (err: any) {
    return { success: false, error: err };
  }
}
