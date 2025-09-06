import { supabase } from './supabase';

export interface BookingItem {
  type: 'flight' | 'hotel' | 'car' | 'activity' | 'restaurant' | 'transportation';
  name: string;
  description?: string;
  provider: string;
  externalId?: string;
  quantity: number;
  unitPrice: number;
  itemData?: any;
}

export interface Traveler {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  passportNumber?: string;
  nationality?: string;
  travelerType: 'adult' | 'child' | 'infant';
}

export interface BookingRequest {
  items: BookingItem[];
  travelers: Traveler[];
  contactEmail: string;
  contactPhone?: string;
  travelDate?: string;
  specialRequests?: string;
}

export interface PaymentRequest {
  bookingId: string;
  amount: number;
  currency?: string;
  customerDetails: {
    customerId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  };
  returnUrl: string;
}

// Flight search
export const searchFlights = async (searchParams: {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  infants?: number;
  class?: string;
}) => {
  const { data, error } = await supabase.functions.invoke('search-flights', {
    body: searchParams,
  });

  if (error) throw error;
  return data;
};

// Hotel search
export const searchHotels = async (searchParams: {
  cityCode: string;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  rooms?: number;
  children?: number;
  priceRange?: string;
}) => {
  const { data, error } = await supabase.functions.invoke('search-hotels', {
    body: searchParams,
  });

  if (error) throw error;
  return data;
};

// Create booking
export const createBooking = async (bookingData: BookingRequest) => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    throw new Error('Authentication required');
  }

  const { data, error } = await supabase.functions.invoke('create-booking', {
    body: bookingData,
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (error) throw error;
  return data;
};

// Create payment
export const createPayment = async (paymentData: PaymentRequest) => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    throw new Error('Authentication required');
  }

  const { data, error } = await supabase.functions.invoke('cashfree-payment', {
    body: paymentData,
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (error) throw error;
  return data;
};

// Get user bookings
export const getUserBookings = async () => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      booking_items(*),
      booking_travelers(*),
      payments(*)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// Get booking by ID
export const getBookingById = async (bookingId: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      booking_items(*),
      booking_travelers(*),
      payments(*)
    `)
    .eq('id', bookingId)
    .single();

  if (error) throw error;
  return data;
};