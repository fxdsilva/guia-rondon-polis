-- Create plans table
CREATE TABLE IF NOT EXISTS public.plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC NOT NULL DEFAULT 0,
  features TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create neighborhoods table
CREATE TABLE IF NOT EXISTS public.neighborhoods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  latitude NUMERIC NOT NULL DEFAULT 0,
  longitude NUMERIC NOT NULL DEFAULT 0,
  "group" TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create professionals table
CREATE TABLE IF NOT EXISTS public.professionals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  description TEXT NOT NULL,
  address TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  neighborhood_id UUID REFERENCES public.neighborhoods(id) ON DELETE SET NULL,
  plan_id UUID REFERENCES public.plans(id) ON DELETE SET NULL,
  verified BOOLEAN NOT NULL DEFAULT false,
  image TEXT NOT NULL,
  gallery TEXT[] NOT NULL DEFAULT '{}',
  working_hours TEXT NOT NULL,
  premium_highlight TEXT,
  subscription_status TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID REFERENCES public.professionals(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID REFERENCES public.professionals(id) ON DELETE CASCADE,
  reviewer_name TEXT NOT NULL,
  rating NUMERIC NOT NULL DEFAULT 5,
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create advertisements table
CREATE TABLE IF NOT EXISTS public.advertisements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link TEXT NOT NULL,
  target_categories TEXT[] NOT NULL DEFAULT '{}',
  active BOOLEAN NOT NULL DEFAULT true,
  phone TEXT,
  website TEXT,
  facebook TEXT,
  instagram TEXT,
  is_general BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create otps table
CREATE TABLE IF NOT EXISTS public.otps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.neighborhoods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advertisements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otps ENABLE ROW LEVEL SECURITY;

-- Plans policies
DROP POLICY IF EXISTS "Plans are accessible by everyone" ON public.plans;
CREATE POLICY "Plans are accessible by everyone" ON public.plans FOR ALL USING (true) WITH CHECK (true);

-- Neighborhoods policies
DROP POLICY IF EXISTS "Neighborhoods are accessible by everyone" ON public.neighborhoods;
CREATE POLICY "Neighborhoods are accessible by everyone" ON public.neighborhoods FOR ALL USING (true) WITH CHECK (true);

-- Professionals policies
DROP POLICY IF EXISTS "Professionals are accessible by everyone" ON public.professionals;
CREATE POLICY "Professionals are accessible by everyone" ON public.professionals FOR ALL USING (true) WITH CHECK (true);

-- Services policies
DROP POLICY IF EXISTS "Services are accessible by everyone" ON public.services;
CREATE POLICY "Services are accessible by everyone" ON public.services FOR ALL USING (true) WITH CHECK (true);

-- Reviews policies
DROP POLICY IF EXISTS "Reviews are accessible by everyone" ON public.reviews;
CREATE POLICY "Reviews are accessible by everyone" ON public.reviews FOR ALL USING (true) WITH CHECK (true);

-- Advertisements policies
DROP POLICY IF EXISTS "Advertisements are accessible by everyone" ON public.advertisements;
CREATE POLICY "Advertisements are accessible by everyone" ON public.advertisements FOR ALL USING (true) WITH CHECK (true);

-- OTPs policies
DROP POLICY IF EXISTS "OTPs are accessible by everyone" ON public.otps;
CREATE POLICY "OTPs are accessible by everyone" ON public.otps FOR ALL USING (true) WITH CHECK (true);
