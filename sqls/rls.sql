-- Enable RLS on tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE venue_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE venue_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE venue_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_dining ENABLE ROW LEVEL SECURITY;
ALTER TABLE cancellation_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE guides ENABLE ROW LEVEL SECURITY;
-- Drop existing policies if they exist (optional, for idempotency)
DROP POLICY IF EXISTS "Enable read access for all users" ON profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON profiles;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON profiles;
DROP POLICY IF EXISTS "Enable read access for all users on venue_types" ON venue_types;
DROP POLICY IF EXISTS "Enable admins to manage venue_types" ON venue_types;
DROP POLICY IF EXISTS "Enable read access for all users on published venues" ON venues;
DROP POLICY IF EXISTS "Enable owner to read, insert, update, and delete their own venues" ON venues;
DROP POLICY IF EXISTS "Enable read access for all users on photos of published venues" ON venue_photos;
DROP POLICY IF EXISTS "Enable owner to manage their venue photos" ON venue_photos;
DROP POLICY IF EXISTS "Enable read access for all users" ON amenities;
DROP POLICY IF EXISTS "Enable read access for all users on amenities of published venues" ON venue_amenities;
DROP POLICY IF EXISTS "Enable owner to manage amenities for their venues" ON venue_amenities;
DROP POLICY IF EXISTS "Enable read access for all users on food_dining of published venues" ON food_dining;
DROP POLICY IF EXISTS "Enable owner to manage food_dining for their venues" ON food_dining;
DROP POLICY IF EXISTS "Enable read access for all users on cancellation_policies of published venues" ON cancellation_policies;
DROP POLICY IF EXISTS "Enable owner to manage cancellation_policies for their venues" ON cancellation_policies;
DROP POLICY IF EXISTS "Enable owner to read their venue inquiries" ON inquiries;
DROP POLICY IF EXISTS "Enable client to read their own inquiries" ON inquiries;
DROP POLICY IF EXISTS "Enable authenticated users to insert inquiries" ON inquiries;
DROP POLICY IF EXISTS "Enable client to manage their own favorites" ON favorites;
DROP POLICY IF EXISTS "Enable read access for all users on reviews of published venues" ON reviews;
DROP POLICY IF EXISTS "Enable client to read their own reviews" ON reviews;
DROP POLICY IF EXISTS "Enable authenticated users to insert reviews" ON reviews;
DROP POLICY IF EXISTS "Enable read access for all users" ON blog_articles;
DROP POLICY IF EXISTS "Enable read access for all users" ON guides;
-- Policies for `profiles` table
CREATE POLICY "Enable read access for all users" ON profiles FOR
SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON profiles FOR
INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Enable update for authenticated users" ON profiles FOR
UPDATE USING (auth.uid() = id);
-- Policies for `venue_types` table
CREATE POLICY "Enable read access for all users" ON venue_types FOR
SELECT USING (true);
CREATE POLICY "Enable admins to manage venue_types" ON venue_types FOR ALL USING (auth.role() = 'admin');
-- Policies for `venues` table
CREATE POLICY "Enable read access for all users on published venues" ON venues FOR
SELECT USING (status = 'published');
CREATE POLICY "Enable owner to read, insert, update, and delete their own venues" ON venues FOR ALL USING (owner_id = auth.uid());
-- Policies for `venue_photos` table
CREATE POLICY "Enable read access for all users on photos of published venues" ON venue_photos FOR
SELECT USING (
    (
      SELECT status
      FROM venues
      WHERE id = venue_id
    ) = 'published'
  );
CREATE POLICY "Enable owner to manage their venue photos" ON venue_photos FOR ALL USING (
  (
    SELECT owner_id
    FROM venues
    WHERE id = venue_id
  ) = auth.uid()
);
-- Policies for `amenities` table
CREATE POLICY "Enable read access for all users" ON amenities FOR
SELECT USING (true);
-- Policies for `venue_amenities` table
CREATE POLICY "Enable read access for all users on amenities of published venues" ON venue_amenities FOR
SELECT USING (
    (
      SELECT status
      FROM venues
      WHERE id = venue_id
    ) = 'published'
  );
CREATE POLICY "Enable owner to manage amenities for their venues" ON venue_amenities FOR ALL USING (
  (
    SELECT owner_id
    FROM venues
    WHERE id = venue_id
  ) = auth.uid()
);
-- Policies for `food_dining` table
CREATE POLICY "Enable read access for all users on food_dining of published venues" ON food_dining FOR
SELECT USING (
    (
      SELECT status
      FROM venues
      WHERE id = venue_id
    ) = 'published'
  );
CREATE POLICY "Enable owner to manage food_dining for their venues" ON food_dining FOR ALL USING (
  (
    SELECT owner_id
    FROM venues
    WHERE id = venue_id
  ) = auth.uid()
);
-- Policies for `cancellation_policies` table
CREATE POLICY "Enable read access for all users on cancellation_policies of published venues" ON cancellation_policies FOR
SELECT USING (
    (
      SELECT status
      FROM venues
      WHERE id = venue_id
    ) = 'published'
  );
CREATE POLICY "Enable owner to manage cancellation_policies for their venues" ON cancellation_policies FOR ALL USING (
  (
    SELECT owner_id
    FROM venues
    WHERE id = venue_id
  ) = auth.uid()
);
-- Policies for `inquiries` table
CREATE POLICY "Enable owner to read their venue inquiries" ON inquiries FOR
SELECT USING (
    venue_id IN (
      SELECT id
      FROM venues
      WHERE owner_id = auth.uid()
    )
  );
CREATE POLICY "Enable client to read their own inquiries" ON inquiries FOR
SELECT USING (user_id = auth.uid());
CREATE POLICY "Enable authenticated users to insert inquiries" ON inquiries FOR
INSERT WITH CHECK (auth.uid() = user_id);
-- Policies for `favorites` table
CREATE POLICY "Enable client to manage their own favorites" ON favorites FOR ALL USING (user_id = auth.uid());
-- Policies for `reviews` table
CREATE POLICY "Enable read access for all users on reviews of published venues" ON reviews FOR
SELECT USING (
    (
      SELECT status
      FROM venues
      WHERE id = venue_id
    ) = 'published'
  );
CREATE POLICY "Enable client to read their own reviews" ON reviews FOR
SELECT USING (user_id = auth.uid());
CREATE POLICY "Enable authenticated users to insert reviews" ON reviews FOR
INSERT WITH CHECK (auth.uid() = user_id);
-- Policies for `blog_articles` table
CREATE POLICY "Enable read access for all users" ON blog_articles FOR
SELECT USING (true);
-- Policies for `guides` table
CREATE POLICY "Enable read access for all users" ON guides FOR
SELECT USING (true);