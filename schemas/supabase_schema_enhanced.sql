-- =============================
-- Enhanced Retreat Centers Platform Schema (Supabase/Postgres)
-- With Row Level Security (RLS) Policies
-- =============================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- ENUMS
CREATE TYPE venue_status AS ENUM ('draft', 'pending', 'published', 'rejected');
CREATE TYPE price_code AS ENUM ('weekend', 'per_night', 'per_person', 'week', 'custom');
CREATE TYPE amenity_group AS ENUM ('core', 'general', 'food_dining', 'wellness', 'outdoor', 'indoor', 'tech', 'other');
CREATE TYPE user_role AS ENUM ('client', 'host', 'admin');
CREATE TYPE inquiry_status AS ENUM ('new', 'viewed', 'responded', 'closed');
CREATE TYPE guide_category AS ENUM ('destination', 'wellness', 'yoga', 'meditation', 'marketing', 'operations', 'other');
CREATE TYPE review_rating AS ENUM ('1','2','3','4','5');
CREATE TYPE cancellation_type AS ENUM ('flexible', 'moderate', 'strict', 'custom');

-- =============================
-- CORE TABLES
-- =============================

-- USERS / PROFILES
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'client',
    name TEXT,
    avatar_url TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    bio TEXT,
    website_url TEXT,
    instagram_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- VENUES
CREATE TABLE IF NOT EXISTS venues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT UNIQUE,
    description TEXT,
    short_description TEXT,
    status venue_status NOT NULL DEFAULT 'draft',
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    address TEXT,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    capacity_min INT NOT NULL DEFAULT 1,
    capacity_max INT NOT NULL DEFAULT 1,
    price_min NUMERIC(10,2),
    price_max NUMERIC(10,2),
    price_unit price_code NOT NULL DEFAULT 'per_night',
    currency TEXT DEFAULT 'USD',
    area_sqft INT,
    bedrooms INT DEFAULT 0,
    bathrooms INT DEFAULT 0,
    property_type TEXT, -- villa, hotel, center, house, etc.
    website_url TEXT,
    instagram_url TEXT,
    house_rules TEXT,
    cancellation_policy cancellation_type DEFAULT 'flexible',
    check_in_time TIME DEFAULT '15:00',
    check_out_time TIME DEFAULT '11:00',
    minimum_stay INT DEFAULT 1,
    is_featured BOOLEAN DEFAULT FALSE,
    view_count INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT venues_capacity_check CHECK (capacity_max >= capacity_min),
    CONSTRAINT venues_price_check CHECK (price_max >= price_min OR price_max IS NULL OR price_min IS NULL)
);

-- Enable RLS on venues
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;

-- VENUE PHOTOS
CREATE TABLE IF NOT EXISTS venue_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt_text TEXT,
    position INT DEFAULT 0,
    is_cover BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on venue_photos
ALTER TABLE venue_photos ENABLE ROW LEVEL SECURITY;

-- AMENITIES
CREATE TABLE IF NOT EXISTS amenities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    group_type amenity_group NOT NULL,
    icon_url TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- VENUE -> AMENITIES (Many-to-Many)
CREATE TABLE IF NOT EXISTS venue_amenities (
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    amenity_id UUID NOT NULL REFERENCES amenities(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (venue_id, amenity_id)
);

-- Enable RLS on venue_amenities
ALTER TABLE venue_amenities ENABLE ROW LEVEL SECURITY;

-- PRICE PACKAGES
CREATE TABLE IF NOT EXISTS price_packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- Weekend, Week, Custom
    price NUMERIC(10,2) NOT NULL,
    duration_days INT,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on price_packages
ALTER TABLE price_packages ENABLE ROW LEVEL SECURITY;

-- FOOD & DINING
CREATE TABLE IF NOT EXISTS food_dining (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    meal_type TEXT, -- Breakfast, Lunch, Dinner, All Inclusive
    diet_options TEXT[], -- ['Vegan','Vegetarian','Gluten-free','Keto','Paleo']
    description TEXT,
    price NUMERIC(10,2),
    is_included BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on food_dining
ALTER TABLE food_dining ENABLE ROW LEVEL SECURITY;

-- CANCELLATION POLICIES (Detailed)
CREATE TABLE IF NOT EXISTS cancellation_policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    days_before INT NOT NULL,
    refund_percent INT NOT NULL CHECK (refund_percent >= 0 AND refund_percent <= 100),
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on cancellation_policies
ALTER TABLE cancellation_policies ENABLE ROW LEVEL SECURITY;

-- AVAILABILITY BLOCKS (Simple availability tracking)
CREATE TABLE IF NOT EXISTS availability_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    reason TEXT, -- Maintenance, Booked, Holiday, etc.
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT availability_date_check CHECK (end_date >= start_date)
);

-- Enable RLS on availability_blocks
ALTER TABLE availability_blocks ENABLE ROW LEVEL SECURITY;

-- INQUIRIES
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    guest_name TEXT NOT NULL,
    guest_email TEXT NOT NULL,
    guest_phone TEXT,
    group_size INT NOT NULL DEFAULT 1,
    check_in_date DATE,
    check_out_date DATE,
    message TEXT,
    status inquiry_status NOT NULL DEFAULT 'new',
    host_response TEXT,
    responded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT inquiry_dates_check CHECK (check_out_date IS NULL OR check_in_date IS NULL OR check_out_date > check_in_date),
    CONSTRAINT inquiry_group_size_check CHECK (group_size > 0)
);

-- Enable RLS on inquiries
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- FAVORITES
CREATE TABLE IF NOT EXISTS favorites (
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, venue_id)
);

-- Enable RLS on favorites
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- REVIEWS
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reviewer_name TEXT NOT NULL,
    reviewer_title TEXT, -- Facilitator, Retreat Leader, etc.
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- BLOG ARTICLES
CREATE TABLE IF NOT EXISTS blog_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image TEXT,
    tags TEXT[],
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on blog_articles
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;

-- GUIDES
CREATE TABLE IF NOT EXISTS guides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category guide_category NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    cover_image TEXT,
    region TEXT,
    read_time_minutes INT,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on guides
ALTER TABLE guides ENABLE ROW LEVEL SECURITY;

-- GUIDE -> VENUE RELATIONSHIPS (Many-to-Many)
CREATE TABLE IF NOT EXISTS guide_venues (
    guide_id UUID NOT NULL REFERENCES guides(id) ON DELETE CASCADE,
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (guide_id, venue_id)
);

-- Enable RLS on guide_venues
ALTER TABLE guide_venues ENABLE ROW LEVEL SECURITY;

-- =============================
-- INDEXES FOR PERFORMANCE
-- =============================

-- Venues indexes (critical for search performance)
CREATE INDEX IF NOT EXISTS idx_venues_status ON venues(status);
CREATE INDEX IF NOT EXISTS idx_venues_location ON venues(country, city);
CREATE INDEX IF NOT EXISTS idx_venues_capacity ON venues(capacity_min, capacity_max);
CREATE INDEX IF NOT EXISTS idx_venues_price ON venues(price_min, price_max);
CREATE INDEX IF NOT EXISTS idx_venues_owner ON venues(owner_id);
CREATE INDEX IF NOT EXISTS idx_venues_featured ON venues(is_featured, status);
CREATE INDEX IF NOT EXISTS idx_venues_created ON venues(created_at);
CREATE INDEX IF NOT EXISTS idx_venues_slug ON venues(slug);

-- Full-text search index for venues
CREATE INDEX IF NOT EXISTS idx_venues_search ON venues USING gin(to_tsvector('english', title || ' ' || COALESCE(description, '') || ' ' || COALESCE(city, '') || ' ' || COALESCE(country, '')));

-- Venue photos indexes
CREATE INDEX IF NOT EXISTS idx_venue_photos_venue ON venue_photos(venue_id, position);
CREATE INDEX IF NOT EXISTS idx_venue_photos_cover ON venue_photos(venue_id, is_cover);

-- Inquiries indexes
CREATE INDEX IF NOT EXISTS idx_inquiries_venue ON inquiries(venue_id, status);
CREATE INDEX IF NOT EXISTS idx_inquiries_user ON inquiries(user_id, status);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status, created_at);
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries(guest_email);

-- Favorites indexes
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_favorites_venue ON favorites(venue_id);

-- Reviews indexes
CREATE INDEX IF NOT EXISTS idx_reviews_venue ON reviews(venue_id, is_published);
CREATE INDEX IF NOT EXISTS idx_reviews_published ON reviews(is_published, created_at);

-- Blog and guides indexes
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_articles(is_published, published_at);
CREATE INDEX IF NOT EXISTS idx_blog_tags ON blog_articles USING gin (tags);
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_articles(slug);
CREATE INDEX IF NOT EXISTS idx_guides_published ON guides(is_published, published_at);
CREATE INDEX IF NOT EXISTS idx_guides_category ON guides(category, is_published);
CREATE INDEX IF NOT EXISTS idx_guides_slug ON guides(slug);

-- Amenities indexes
CREATE INDEX IF NOT EXISTS idx_amenities_group ON amenities(group_type, is_active);
CREATE INDEX IF NOT EXISTS idx_venue_amenities_venue ON venue_amenities(venue_id);
CREATE INDEX IF NOT EXISTS idx_venue_amenities_amenity ON venue_amenities(amenity_id);

-- Availability indexes
CREATE INDEX IF NOT EXISTS idx_availability_venue ON availability_blocks(venue_id, start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_availability_dates ON availability_blocks(start_date, end_date, is_available);

-- =============================
-- ROW LEVEL SECURITY POLICIES
-- =============================

-- PROFILES POLICIES
CREATE POLICY "Users can view their own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- VENUES POLICIES
CREATE POLICY "Published venues are viewable by everyone" ON venues
    FOR SELECT USING (status = 'published');

CREATE POLICY "Owners can view their own venues" ON venues
    FOR SELECT USING (owner_id = auth.uid());

CREATE POLICY "Admins can view all venues" ON venues
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Owners can insert their own venues" ON venues
    FOR INSERT WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Owners can update their own venues" ON venues
    FOR UPDATE USING (owner_id = auth.uid());

CREATE POLICY "Admins can update any venue" ON venues
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Owners can delete their own venues" ON venues
    FOR DELETE USING (owner_id = auth.uid());

-- VENUE PHOTOS POLICIES
CREATE POLICY "Photos of published venues are viewable by everyone" ON venue_photos
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM venues 
            WHERE id = venue_id AND status = 'published'
        )
    );

CREATE POLICY "Owners can view photos of their own venues" ON venue_photos
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM venues 
            WHERE id = venue_id AND owner_id = auth.uid()
        )
    );

CREATE POLICY "Owners can manage photos of their own venues" ON venue_photos
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM venues 
            WHERE id = venue_id AND owner_id = auth.uid()
        )
    );

-- AMENITIES POLICIES (Public read, admin write)
CREATE POLICY "Amenities are viewable by everyone" ON amenities
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage amenities" ON amenities
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- VENUE AMENITIES POLICIES
CREATE POLICY "Venue amenities are viewable with venue" ON venue_amenities
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM venues 
            WHERE id = venue_id AND (status = 'published' OR owner_id = auth.uid())
        )
    );

CREATE POLICY "Owners can manage their venue amenities" ON venue_amenities
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM venues 
            WHERE id = venue_id AND owner_id = auth.uid()
        )
    );

-- PRICE PACKAGES POLICIES
CREATE POLICY "Price packages are viewable with venue" ON price_packages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM venues 
            WHERE id = venue_id AND (status = 'published' OR owner_id = auth.uid())
        )
    );

CREATE POLICY "Owners can manage their venue price packages" ON price_packages
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM venues 
            WHERE id = venue_id AND owner_id = auth.uid()
        )
    );

-- FOOD DINING POLICIES
CREATE POLICY "Food dining info is viewable with venue" ON food_dining
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM venues 
            WHERE id = venue_id AND (status = 'published' OR owner_id = auth.uid())
        )
    );

CREATE POLICY "Owners can manage their venue food dining" ON food_dining
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM venues 
            WHERE id = venue_id AND owner_id = auth.uid()
        )
    );

-- CANCELLATION POLICIES POLICIES
CREATE POLICY "Cancellation policies are viewable with venue" ON cancellation_policies
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM venues 
            WHERE id = venue_id AND (status = 'published' OR owner_id = auth.uid())
        )
    );

CREATE POLICY "Owners can manage their venue cancellation policies" ON cancellation_policies
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM venues 
            WHERE id = venue_id AND owner_id = auth.uid()
        )
    );

-- AVAILABILITY BLOCKS POLICIES
CREATE POLICY "Availability is viewable with venue" ON availability_blocks
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM venues 
            WHERE id = venue_id AND (status = 'published' OR owner_id = auth.uid())
        )
    );

CREATE POLICY "Owners can manage their venue availability" ON availability_blocks
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM venues 
            WHERE id = venue_id AND owner_id = auth.uid()
        )
    );

-- INQUIRIES POLICIES
CREATE POLICY "Users can view their own inquiries" ON inquiries
    FOR SELECT USING (user_id = auth.uid() OR guest_email = (SELECT email FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Venue owners can view inquiries for their venues" ON inquiries
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM venues 
            WHERE id = venue_id AND owner_id = auth.uid()
        )
    );

CREATE POLICY "Venue owners can update inquiries for their venues" ON inquiries
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM venues 
            WHERE id = venue_id AND owner_id = auth.uid()
        )
    );

CREATE POLICY "Anyone can create inquiries" ON inquiries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all inquiries" ON inquiries
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- FAVORITES POLICIES
CREATE POLICY "Users can manage their own favorites" ON favorites
    FOR ALL USING (user_id = auth.uid());

-- REVIEWS POLICIES
CREATE POLICY "Published reviews are viewable by everyone" ON reviews
    FOR SELECT USING (is_published = true);

CREATE POLICY "Venue owners can view reviews for their venues" ON reviews
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM venues 
            WHERE id = venue_id AND owner_id = auth.uid()
        )
    );

CREATE POLICY "Admins can manage all reviews" ON reviews
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- BLOG ARTICLES POLICIES
CREATE POLICY "Published blog articles are viewable by everyone" ON blog_articles
    FOR SELECT USING (is_published = true);

CREATE POLICY "Authors can view their own articles" ON blog_articles
    FOR SELECT USING (author_id = auth.uid());

CREATE POLICY "Admins can manage all blog articles" ON blog_articles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- GUIDES POLICIES
CREATE POLICY "Published guides are viewable by everyone" ON guides
    FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage all guides" ON guides
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- GUIDE VENUES POLICIES
CREATE POLICY "Guide venue relationships are viewable with published guides" ON guide_venues
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM guides 
            WHERE id = guide_id AND is_published = true
        )
    );

CREATE POLICY "Admins can manage guide venue relationships" ON guide_venues
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =============================
-- FUNCTIONS AND TRIGGERS
-- =============================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_venues_updated_at BEFORE UPDATE ON venues
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_articles_updated_at BEFORE UPDATE ON blog_articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_guides_updated_at BEFORE UPDATE ON guides
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate slug from title
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(regexp_replace(regexp_replace(trim(title), '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;

-- Function to auto-generate venue slug
CREATE OR REPLACE FUNCTION set_venue_slug()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug = generate_slug(NEW.title);
        -- Ensure uniqueness
        WHILE EXISTS (SELECT 1 FROM venues WHERE slug = NEW.slug AND id != NEW.id) LOOP
            NEW.slug = NEW.slug || '-' || substr(NEW.id::text, 1, 8);
        END LOOP;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_venue_slug_trigger BEFORE INSERT OR UPDATE ON venues
    FOR EACH ROW EXECUTE FUNCTION set_venue_slug();

-- Function to increment venue view count
CREATE OR REPLACE FUNCTION increment_venue_views(venue_uuid UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE venues SET view_count = view_count + 1 WHERE id = venue_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================
-- STORAGE BUCKETS SETUP
-- =============================

-- Create storage buckets (these commands should be run in Supabase dashboard or via API)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('venue-photos', 'venue-photos', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

-- Storage policies would be created via Supabase dashboard or API calls
-- Example policy for venue photos:
-- CREATE POLICY "Venue photos are publicly accessible" ON storage.objects
--   FOR SELECT USING (bucket_id = 'venue-photos');

-- CREATE POLICY "Venue owners can upload photos" ON storage.objects
--   FOR INSERT WITH CHECK (
--     bucket_id = 'venue-photos' AND
--     auth.role() = 'authenticated'
--   );

-- =============================
-- INITIAL DATA SEEDING
-- =============================

-- Insert default amenities
INSERT INTO amenities (name, group_type, description) VALUES
-- Core amenities
('Wi-Fi', 'core', 'High-speed internet connection'),
('Yoga Hall', 'core', 'Dedicated space for yoga practice'),
('AV System', 'tech', 'Audio/visual equipment for presentations'),
('Kitchen', 'core', 'Full kitchen facilities'),
('Pool', 'outdoor', 'Swimming pool'),
('Parking', 'general', 'On-site parking available'),
('Air Conditioning', 'general', 'Climate control'),
('Heating', 'general', 'Heating system'),

-- Wellness amenities
('Spa', 'wellness', 'Spa facilities'),
('Sauna', 'wellness', 'Sauna room'),
('Gym', 'wellness', 'Fitness center'),
('Massage Room', 'wellness', 'Professional massage facilities'),
('Meditation Hall', 'wellness', 'Dedicated meditation space'),

-- Outdoor amenities
('Garden', 'outdoor', 'Beautiful garden area'),
('Terrace', 'outdoor', 'Outdoor terrace'),
('Beach Access', 'outdoor', 'Direct beach access'),
('Nature Trails', 'outdoor', 'Walking/hiking trails'),
('Outdoor Dining', 'outdoor', 'Al fresco dining area'),

-- Indoor amenities
('Library', 'indoor', 'Reading room with books'),
('Fireplace', 'indoor', 'Cozy fireplace'),
('Game Room', 'indoor', 'Entertainment room'),
('Conference Room', 'indoor', 'Meeting facilities'),
('Workshop Space', 'indoor', 'Creative workshop area'),

-- Food & Dining
('Restaurant', 'food_dining', 'On-site restaurant'),
('Bar', 'food_dining', 'Bar service'),
('Private Chef', 'food_dining', 'Personal chef service'),
('Vegan Friendly', 'food_dining', 'Vegan meal options'),
('Organic Food', 'food_dining', 'Organic ingredients'),

-- Tech amenities
('Projector', 'tech', 'Projection equipment'),
('Sound System', 'tech', 'Professional audio system'),
('Video Conferencing', 'tech', 'Remote meeting capabilities'),
('Fiber Internet', 'tech', 'Ultra-fast fiber connection'),

-- Other amenities
('Laundry', 'other', 'Laundry facilities'),
('Concierge', 'other', 'Concierge service'),
('Airport Transfer', 'other', 'Transportation service'),
('Bike Rental', 'other', 'Bicycle rental'),
('Pet Friendly', 'other', 'Pets allowed')
ON CONFLICT (name) DO NOTHING;

-- Create an admin user profile (this would typically be done through the application)
-- Note: This is just a placeholder - actual admin creation should be done through Supabase Auth

COMMIT;

