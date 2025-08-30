
-- =============================
-- Retreat Centers Platform Schema (Supabase/Postgres)
-- =============================

-- ENUMS
CREATE TYPE venue_status AS ENUM ('draft', 'pending', 'published', 'rejected');
CREATE TYPE price_code AS ENUM ('weekend', 'per_night', 'per_person', 'week', 'custom');
CREATE TYPE amenity_group AS ENUM ('core', 'general', 'food_dining', 'wellness', 'outdoor', 'indoor', 'tech', 'other');
CREATE TYPE user_role AS ENUM ('client', 'host', 'admin');
CREATE TYPE inquiry_status AS ENUM ('new', 'viewed', 'responded', 'closed');
CREATE TYPE guide_category AS ENUM ('destination', 'wellness', 'yoga', 'meditation', 'marketing', 'operations', 'other');
CREATE TYPE review_rating AS ENUM ('1','2','3','4','5');

-- USERS / PROFILES
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'client',
    name TEXT,
    avatar_url TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- VENUES
CREATE TABLE IF NOT EXISTS venues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status venue_status NOT NULL DEFAULT 'draft',
    country TEXT,
    city TEXT,
    address TEXT,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    capacity_min INT,
    capacity_max INT,
    price_min NUMERIC,
    price_max NUMERIC,
    price_unit price_code NOT NULL DEFAULT 'per_night',
    area_sqft INT,
    bedrooms INT,
    bathrooms INT,
    website_url TEXT,
    instagram_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- VENUE PHOTOS
CREATE TABLE IF NOT EXISTS venue_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt_text TEXT,
    position INT DEFAULT 0
);

-- AMENITIES
CREATE TABLE IF NOT EXISTS amenities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    "group" amenity_group NOT NULL,
    icon_url TEXT,
    description TEXT
);

-- VENUE -> AMENITIES
CREATE TABLE IF NOT EXISTS venue_amenities (
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    amenity_id UUID NOT NULL REFERENCES amenities(id) ON DELETE CASCADE,
    PRIMARY KEY (venue_id, amenity_id)
);

-- FOOD & DINING
CREATE TABLE IF NOT EXISTS food_dining (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    meal_type TEXT, -- e.g. Breakfast, Lunch, Dinner
    diet_options TEXT[], -- e.g. ['Vegan','Vegetarian','Gluten-free']
    description TEXT
);

-- CANCELLATION POLICIES
CREATE TABLE IF NOT EXISTS cancellation_policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    days_before INT NOT NULL,
    refund_percent INT NOT NULL
);

-- INQUIRIES
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    message TEXT,
    status inquiry_status NOT NULL DEFAULT 'new',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- FAVORITES
CREATE TABLE IF NOT EXISTS favorites (
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, venue_id)
);

-- REVIEWS
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    rating INT CHECK (rating >=1 AND rating <=5),
    comment TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- BLOG ARTICLES
CREATE TABLE IF NOT EXISTS blog_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID REFERENCES profiles(id),
    title TEXT NOT NULL,
    content TEXT,
    cover_image TEXT,
    tags TEXT[],
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- GUIDES
CREATE TABLE IF NOT EXISTS guides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category guide_category NOT NULL,
    content TEXT,
    cover_image TEXT,
    region TEXT,
    read_time_minutes INT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_venues_location ON venues(country, city);
CREATE INDEX IF NOT EXISTS idx_venues_capacity ON venues(capacity_min, capacity_max);
CREATE INDEX IF NOT EXISTS idx_venues_price ON venues(price_min, price_max);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_reviews_venue ON reviews(venue_id);
CREATE INDEX IF NOT EXISTS idx_blog_tags ON blog_articles USING gin (tags);
