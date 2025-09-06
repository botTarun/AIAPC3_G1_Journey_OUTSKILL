/*
  # Clean and Recreate Journey Verse Database Schema

  1. Clean Up
    - Drop all existing tables and functions
    - Remove old policies and triggers

  2. Core Tables
    - `profiles` - User profile information
    - `bookings` - Main booking records with auto-generated references
    - `booking_items` - Individual items (flights, hotels, activities, etc.)
    - `booking_travelers` - Traveler information for each booking
    - `payments` - Payment transactions with Cashfree integration

  3. Security
    - Enable RLS on all tables
    - Add policies for user data isolation
    - Secure foreign key relationships

  4. Performance
    - Add indexes on frequently queried columns
    - Optimize for booking and payment queries
*/

-- Clean up existing tables (if any)
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS booking_travelers CASCADE;
DROP TABLE IF EXISTS booking_items CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Drop existing functions
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS handle_updated_at() CASCADE;

-- Create updated_at function
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create new user handler function
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  TO public
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO public
  USING (auth.uid() = id);

-- Create trigger for profiles updated_at
CREATE TRIGGER handle_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  booking_reference text UNIQUE NOT NULL DEFAULT ('JV' || EXTRACT(epoch FROM now())::text),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  total_amount numeric(10,2) NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'INR',
  booking_date timestamptz DEFAULT now(),
  travel_date timestamptz,
  contact_email text NOT NULL,
  contact_phone text,
  special_requests text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on bookings
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Bookings policies
CREATE POLICY "Users can view their own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for bookings
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_reference ON bookings(booking_reference);

-- Create trigger for bookings updated_at
CREATE TRIGGER handle_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Create booking_items table
CREATE TABLE IF NOT EXISTS booking_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  item_type text NOT NULL CHECK (item_type IN ('flight', 'hotel', 'car', 'activity', 'restaurant', 'transportation')),
  item_name text NOT NULL,
  item_description text,
  provider text,
  external_id text,
  quantity integer DEFAULT 1,
  unit_price numeric(10,2) NOT NULL,
  total_price numeric(10,2) NOT NULL,
  item_data jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on booking_items
ALTER TABLE booking_items ENABLE ROW LEVEL SECURITY;

-- Booking items policies
CREATE POLICY "Users can view their booking items"
  ON booking_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM bookings 
      WHERE bookings.id = booking_items.booking_id 
      AND bookings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create booking items"
  ON booking_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM bookings 
      WHERE bookings.id = booking_items.booking_id 
      AND bookings.user_id = auth.uid()
    )
  );

-- Create index for booking_items
CREATE INDEX idx_booking_items_booking_id ON booking_items(booking_id);

-- Create booking_travelers table
CREATE TABLE IF NOT EXISTS booking_travelers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text,
  phone text,
  date_of_birth date,
  passport_number text,
  nationality text,
  traveler_type text DEFAULT 'adult' CHECK (traveler_type IN ('adult', 'child', 'infant')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on booking_travelers
ALTER TABLE booking_travelers ENABLE ROW LEVEL SECURITY;

-- Booking travelers policies
CREATE POLICY "Users can manage their booking travelers"
  ON booking_travelers FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM bookings 
      WHERE bookings.id = booking_travelers.booking_id 
      AND bookings.user_id = auth.uid()
    )
  );

-- Create index for booking_travelers
CREATE INDEX idx_booking_travelers_booking_id ON booking_travelers(booking_id);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  payment_gateway text NOT NULL DEFAULT 'cashfree',
  gateway_payment_id text,
  gateway_order_id text,
  amount numeric(10,2) NOT NULL,
  currency text NOT NULL DEFAULT 'INR',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'refunded')),
  payment_method text,
  gateway_response jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on payments
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Payments policies
CREATE POLICY "Users can view their payments"
  ON payments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM bookings 
      WHERE bookings.id = payments.booking_id 
      AND bookings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create payments"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM bookings 
      WHERE bookings.id = payments.booking_id 
      AND bookings.user_id = auth.uid()
    )
  );

-- Create indexes for payments
CREATE INDEX idx_payments_booking_id ON payments(booking_id);
CREATE INDEX idx_payments_gateway_order_id ON payments(gateway_order_id);

-- Create trigger for payments updated_at
CREATE TRIGGER handle_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();