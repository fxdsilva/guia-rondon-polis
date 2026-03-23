-- Database Entities for Guia Rondonópolis Directory

CREATE TABLE plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) DEFAULT 0.0,
  features JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT,
  "group" TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE neighborhoods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  latitude DECIMAL(10,8),
  longitude DECIMAL(10,8),
  "group" TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE professionals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  description TEXT,
  address TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(10,8),
  category_id UUID REFERENCES categories(id),
  neighborhood_id UUID REFERENCES neighborhoods(id),
  plan_id UUID REFERENCES plans(id),
  verified BOOLEAN DEFAULT false,
  image TEXT,
  gallery TEXT[],
  working_hours TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  professional_id UUID REFERENCES professionals(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  professional_id UUID REFERENCES professionals(id) ON DELETE CASCADE,
  reviewer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE advertisements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  link TEXT,
  target_categories TEXT[],
  active BOOLEAN DEFAULT true,
  phone TEXT,
  website TEXT,
  facebook TEXT,
  instagram TEXT,
  is_general BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

