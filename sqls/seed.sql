-- Insert guides
INSERT INTO guides (
    title,
    category,
    content,
    cover_image,
    region,
    read_time_minutes
  )
VALUES (
    'Choosing the Perfect Wellness Retreat',
    'wellness',
    'Learn how to select the ideal wellness retreat based on your goals, budget, and preferences...',
    'guide_covers/guide-1.avif',
    'Asia',
    8
  ),
  (
    'Yoga Retreats for Beginners',
    'yoga',
    'Everything you need to know about attending your first yoga retreat, from what to pack to what to expect...',
    'guide_covers/guide-2.avif',
    'Europe',
    12
  ),
  (
    'Meditation Techniques for Daily Practice',
    'meditation',
    'Simple meditation techniques you can practice anywhere to improve your mental health and well-being...',
    'guide_covers/guide-3.avif',
    'North America',
    15
  ),
  (
    'Sustainable Travel: Eco-Friendly Retreats',
    'destination',
    'Discover retreats that prioritize environmental sustainability and responsible tourism practices...',
    'guide_covers/guide-4.avif',
    'Asia',
    10
  );
-- Insert sample users into auth.users and related profiles
WITH new_users AS (
  INSERT INTO auth.users (id, email, encrypted_password)
  VALUES (
      '11111111-1111-1111-1111-111111111111',
      'sarah@serenityhills.com',
      crypt('password123', gen_salt('bf'))
    ),
    (
      '22222222-2222-2222-2222-222222222222',
      'raj@mountainview.com',
      crypt('password123', gen_salt('bf'))
    ),
    (
      '33333333-3333-3333-3333-333333333333',
      'maria@oceanbliss.com',
      crypt('password123', gen_salt('bf'))
    ),
    (
      '44444444-4444-4444-4444-444444444444',
      'pierre@alpinewellness.com',
      crypt('password123', gen_salt('bf'))
    ),
    (
      '55555555-5555-5555-5555-555555555555',
      'elena@sacredvalley.com',
      crypt('password123', gen_salt('bf'))
    )
  RETURNING id,
    email
)
INSERT INTO profiles (id, role, name, email, bio, avatar_url, phone)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    'client',
    'Sarah Johnson',
    'sarah@serenityhills.com',
    'Wellness retreat host with 10+ years experience',
    'avatars/avatar-1.jpg',
    '+1234567890'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'host',
    'Raj Patel',
    'raj@mountainview.com',
    'Yoga and meditation expert from Rishikesh',
    'avatars/avatar-2.jpg',
    '+1234572990'
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'admin',
    'Maria Rodriguez',
    'maria@oceanbliss.com',
    'Beachfront retreat specialist in Tulum',
    'avatars/avatar-3.jpg',
    '+1234572990'
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    'host',
    'Pierre Dubois',
    'pierre@alpinewellness.com',
    'Alpine wellness expert in Chamonix',
    'avatars/avatar-4.jpg',
    '+1234792990'
  ),
  (
    '55555555-5555-5555-5555-555555555555',
    'client',
    'Elena Petrova',
    'elena@sacredvalley.com',
    'Peruvian spiritual guide and retreat host',
    'avatars/avatar-5.jpg',
    '+17421672990'
  );
-- Insert blog articles
INSERT INTO blog_articles (author_id, title, content, cover_image, tags)
VALUES (
    '33333333-3333-3333-3333-333333333333',
    'The Ultimate Guide to Wellness Retreats in Bali',
    'Discover the best wellness retreats in Bali and learn how to choose the perfect one for your spiritual journey...',
    'blog_covers/blog-1.avif',
    ARRAY ['bali', 'wellness', 'retreats', 'travel']
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Yoga and Meditation in Rishikesh: A Spiritual Pilgrimage',
    'Explore the spiritual capital of the world and discover authentic yoga and meditation practices...',
    'blog_covers/blog-2.avif',
    ARRAY ['rishikesh', 'yoga', 'meditation', 'spirituality']
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Beachfront Wellness: The Magic of Tulum Retreats',
    'Experience the unique combination of Mayan culture and modern wellness in the beautiful beaches of Tulum...',
    'blog_covers/blog-3.avif',
    ARRAY ['tulum', 'beach', 'wellness', 'mexico']
  );
-- Insert venue types
INSERT INTO venue_types (name, slug, icon)
VALUES (
    'Retreat Center',
    'retreat-center',
    '{"library": "lucide-react", "name": "home"}'
  ),
  (
    'Ashram / Monastery',
    'ashram-monastery',
    '{"library": "lucide-react", "name": "landmark"}'
  ),
  (
    'Eco-lodge / Retreat Camp',
    'eco-lodge-retreat-camp',
    '{"library": "lucide-react", "name": "tent"}'
  ),
  (
    'Resort',
    'resort',
    '{"library": "lucide-react", "name": "hotel"}'
  ),
  (
    'Villa / Private House',
    'villa-private-house',
    '{"library": "lucide-react", "name": "house"}'
  ),
  (
    'Boutique Hotel',
    'boutique-hotel',
    '{"library": "lucide-react", "name": "building-2"}'
  ),
  (
    'Wellness Center',
    'wellness-center',
    '{"library": "lucide-react", "name": "heart-pulse"}'
  ),
  (
    'Guesthouse / BnB',
    'guesthouse-bnb',
    '{"library": "lucide-react", "name": "bed"}'
  );
-- Insert venues (50 retreat centers) - Let Supabase generate UUIDs
INSERT INTO venues (
    owner_id,
    type_id,
    title,
    description,
    status,
    country,
    city,
    address,
    latitude,
    longitude,
    capacity_min,
    capacity_max,
    price_min,
    price_max,
    price_unit,
    area_sqft,
    bedrooms,
    bathrooms,
    website_url,
    instagram_url,
    label,
    location_about,
    how_to_get_here,
    nearby_attractions,
    hero_subline,
    special_policies,
    included_items,
    excluded_items
  ) -- 1. Serenity Hills Retreat
SELECT '22222222-2222-2222-2222-222222222222'::uuid,
  vt.id,
  'Serenity Hills Retreat',
  'Nestled in the lush jungles of Ubud, this retreat offers a perfect blend of modern comfort and traditional Balinese spirituality. Experience daily yoga sessions, meditation workshops, and organic farm-to-table dining.',
  'published'::venue_status,
  'Indonesia',
  'Ubud',
  'Jl. Raya Ubud No. 88, Ubud, Bali',
  -8.5069,
  115.2625,
  15,
  25,
  500,
  1500,
  'per_night'::price_code,
  8500,
  8,
  6,
  'https://serenityhills.com',
  'https://google.com',
  'New'::venue_label,
  '<p>The Sanctuary is located in the heart of Ubud, Bali''s spiritual and cultural center. Nestled among lush rice terraces and tropical rainforest, our retreat offers the perfect balance of tranquility and accessibility.</p><p>The retreat is located in the heart of Ubud, Bali''s spiritual and cultural center. Nestled among lush rice terraces and tropical rainforest, our retreat offers the perfect balance of tranquility and accessibility.</p>',
  '[
    { "title": "From Airport (DPS)", "text": "Take a short drive from the airport to reach the retreat. The retreat is located in the heart of Ubud, surrounded by lush greenery and traditional Balinese temples.", "note": "$35-45 USD • We can arrange pickup" },
    { "title": "By Car or Taxi", "text": "From Denpasar: 45 minutes via well-maintained roads. Local taxis (Blue Bird recommended) offer fixed rates. Grab and Gojek apps also work here.", "note": "$35-45 USD • Available 24/7 • We can arrange pickup upon request" },
    { "title": "Local Transport", "text": "Local motorbike taxi services nearby", "note": "$35-45 USD • Available 24/7 • We can arrange pickup upon request" }
  ]'::jsonb,
  '[
    { "name": "Ubud Traditional Market", "distance": "15", "unit": "min", "note": "walk" },
    { "name": "Sacred Monkey Forest", "distance": "20", "unit": "min", "note": "walk" },
    { "name": "Tegallalang Rice Terraces", "distance": "15", "unit": "min", "note": "drive" },
    { "name": "Campuhan Ridge Walk", "distance": "10", "unit": "min", "note": "walk" }
  ]'::jsonb,
  'The Serenity Hills Retreat – ready for your next group.',
  '[
    { "title": "Travel Insurance Text", "text": "Guests are strongly encouraged to purchase travel insurance to cover unexpected cancellations, medical emergencies, or travel disruptions.", "icon": {"library": "lucide-react", "name": "shield"} },
    { "title": "Force Majeure", "text": "In the event of natural disasters, pandemics, or other circumstances beyond our control, the retreat reserves the right to reschedule or cancel bookings without liability.", "icon": {"library": "lucide-react", "name": "triangle-alert"} },
    { "title": "Rescheduling Policy", "text": "Bookings may be rescheduled up to 30 days before the retreat start date, subject to availability.", "icon": {"library": "lucide-react", "name": "refresh-cw"} },
    { "title": "Group Size", "text": "Minimum 10 participants are required. Maximum group size is 25 participants.", "icon": {"library": "lucide-react", "name": "clock"} }
  ]'::jsonb,
  '{"Professional retreat coordination","All organic meals","Accommodation","Yoga shala","Wi-Fi"}'::text [],
  '{"International flights","Visa","Spa treatments","Alcohol"}'::text []
FROM venue_types vt
WHERE vt.name = 'Resort'
UNION ALL
-- 2. Mountain View Sanctuary
SELECT '22222222-2222-2222-2222-222222222222'::uuid,
  vt.id,
  'Mountain View Sanctuary',
  'Located in the spiritual capital of Rishikesh, this sanctuary offers authentic yoga and meditation experiences. Overlooking the sacred Ganges River, it provides traditional ashram-style accommodation with modern amenities.',
  'draft'::venue_status,
  'India',
  'Rishikesh',
  'Laxman Jhula, Rishikesh, Uttarakhand',
  30.0869,
  78.2676,
  20,
  35,
  1000,
  1234,
  'weekend'::price_code,
  12000,
  12,
  8,
  'https://mountainviewsanctuary.com',
  'https://google.com',
  'New'::venue_label,
  '<p>Located in the spiritual capital of Rishikesh, this sanctuary offers authentic yoga and meditation experiences. Overlooking the sacred Ganges River, it provides traditional ashram-style accommodation with modern amenities.</p><p>Located in the spiritual capital of Rishikesh, this sanctuary offers authentic yoga and meditation experiences. Overlooking the sacred Ganges River, it provides traditional ashram-style accommodation with modern amenities.</p>',
  '[
    { "title": "From Airport (DEL)", "text": "Take a 45-minute drive from Delhi Airport. The retreat is located in the heart of Rishikesh.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "From Delhi: 45 minutes via well-maintained roads. Local taxis offer fixed rates.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Local motorbike taxi services nearby", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Shri Ramayana Ghat", "distance": "15", "unit": "min", "note": "walk" },
    { "name": "Triveni Ghat", "distance": "20", "unit": "min", "note": "walk" },
    { "name": "Neelkanth Temple", "distance": "15", "unit": "min", "note": "drive" },
    { "name": "Parmarth Niketan Ashram", "distance": "10", "unit": "min", "note": "walk" }
  ]'::jsonb,
  'The Mountain View Sanctuary – ready for your next group.',
  '[
    { "title": "Travel Insurance", "text": "Guests are strongly encouraged to purchase travel insurance to cover unexpected cancellations, medical emergencies, or travel disruptions.", "icon": {"library": "lucide-react", "name": "shield"} },
    { "title": "Force Majeure", "text": "In the event of natural disasters, pandemics, or other circumstances beyond our control, the retreat reserves the right to reschedule or cancel bookings without liability.", "icon": {"library": "lucide-react", "name": "triangle-alert"} },
    { "title": "Rescheduling Policy", "text": "Bookings may be rescheduled up to 30 days before the retreat start date, subject to availability.", "icon": {"library": "lucide-react", "name": "refresh-cw"} },
    { "title": "Group Size", "text": "Minimum 10 participants are required. Maximum group size is 25 participants.", "icon": {"library": "lucide-react", "name": "clock"} }
  ]'::jsonb,
  '{"Meals","Accommodation","Yoga shala","Wi-Fi"}'::text [],
  '{"Flights","Visa","Spa"}'::text []
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 3. Ocean Bliss Retreat
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Ocean Bliss Retreat',
  'Beachfront paradise in Tulum offering a unique blend of Mayan culture and modern wellness. Enjoy cenote swimming, beach yoga, and sustainable luxury accommodation.',
  'pending'::venue_status,
  'Mexico',
  'Tulum',
  'Carretera Tulum-Boca Paila Km 8.5, Tulum',
  20.2150,
  -87.4515,
  12,
  20,
  800,
  1200,
  'per_person'::price_code,
  6500,
  6,
  4,
  'https://oceanblissretreat.com',
  'https://google.com',
  'New'::venue_label,
  '<p>Beachfront paradise in Tulum offering a unique blend of Mayan culture and modern wellness.</p><p>Beachfront paradise in Tulum offering a unique blend of Mayan culture and modern wellness.</p>',
  '[
    { "title": "From Airport (MEX)", "text": "Drive 90 minutes from Cancun Airport to Tulum. Retreat is beachfront.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "From Cancun: local taxis and ride apps available.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Bike rentals and tuk-tuks common in the area.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Playa Carrizalillo", "distance": "15", "unit": "min", "note": "walk" },
    { "name": "Cenote Dos Ojos", "distance": "20", "unit": "min", "note": "drive" },
    { "name": "Tulum Ruins", "distance": "15", "unit": "min", "note": "drive" },
    { "name": "Sian Ka''an Reserve", "distance": "10", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'The Ocean Bliss Retreat – ready for your next group.',
  '[
    { "title": "Travel Insurance", "text": "Guests are strongly encouraged to purchase travel insurance to cover unexpected cancellations, medical emergencies, or travel disruptions.", "icon": {"library": "lucide-react", "name": "shield"} },
    { "title": "Force Majeure", "text": "In the event of natural disasters, pandemics, or other circumstances beyond our control, the retreat reserves the right to reschedule or cancel bookings without liability.", "icon": {"library": "lucide-react", "name": "triangle-alert"} },
    { "title": "Rescheduling Policy", "text": "Bookings may be rescheduled up to 30 days before the retreat start date, subject to availability.", "icon": {"library": "lucide-react", "name": "refresh-cw"} },
    { "title": "Group Size", "text": "Minimum 10 participants are required. Maximum group size is 25 participants.", "icon": {"library": "lucide-react", "name": "clock"} }
  ]'::jsonb,
  '{"Meals","Accommodation","Yoga shala"}'::text [],
  '{"Flights","Spa","Alcohol"}'::text []
FROM venue_types vt
WHERE vt.name = 'Ashram / Monastery'
UNION ALL
-- 4. Alpine Wellness Lodge
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Alpine Wellness Lodge',
  'Luxurious mountain retreat in the French Alps offering spa treatments, gourmet dining, and alpine views.',
  'rejected'::venue_status,
  'France',
  'Chamonix',
  '123 Chemin des Aiguilles, Chamonix-Mont-Blanc',
  45.9237,
  6.8694,
  20,
  30,
  1500,
  2500,
  'per_night'::price_code,
  15000,
  10,
  8,
  'https://alpinewellness.com',
  'https://google.com',
  'New'::venue_label,
  '<p>Luxurious mountain retreat in the French Alps with spa and dining.</p><p>Luxurious mountain retreat in the French Alps with spa and dining.</p><p>Luxurious mountain retreat in the French Alps with spa and dining.</p>',
  '[
    { "title": "From Airport (CDG)", "text": "3h drive from Paris CDG to Chamonix.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Car rentals widely available from Geneva or Paris.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Local buses connect Chamonix valley.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Aiguilles de Chamonix", "distance": "15", "unit": "min", "note": "walk" },
    { "name": "Mer de Glace", "distance": "20", "unit": "min", "note": "drive" },
    { "name": "Chamonix Valley", "distance": "15", "unit": "min", "note": "drive" },
    { "name": "Mont Blanc", "distance": "10", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'The Alpine Wellness Lodge – ready for your next group.',
  '[
    { "title": "Travel Insurance", "text": "Guests are strongly encouraged to purchase travel insurance to cover unexpected cancellations, medical emergencies, or travel disruptions.", "icon": {"library": "lucide-react", "name": "shield"} },
    { "title": "Force Majeure", "text": "In the event of natural disasters, pandemics, or other circumstances beyond our control, the retreat reserves the right to reschedule or cancel bookings without liability.", "icon": {"library": "lucide-react", "name": "triangle-alert"} },
    { "title": "Rescheduling Policy", "text": "Bookings may be rescheduled up to 30 days before the retreat start date, subject to availability.", "icon": {"library": "lucide-react", "name": "refresh-cw"} },
    { "title": "Group Size", "text": "Minimum 10 participants are required. Maximum group size is 25 participants.", "icon": {"library": "lucide-react", "name": "clock"} }
  ]'::jsonb,
  '{"Meals","Spa","Accommodation"}'::text [],
  '{"Flights","Insurance"}'::text []
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 5. Sacred Valley Sanctuary
SELECT '22222222-2222-2222-2222-222222222222'::uuid,
  vt.id,
  'Sacred Valley Sanctuary',
  'Immerse yourself in the mystical energy of the Sacred Valley. This retreat combines ancient Incan wisdom with modern wellness practices.',
  'draft'::venue_status,
  'Peru',
  'Ollantaytambo',
  'Camino Inca, Ollantaytambo, Cusco',
  -13.2583,
  -72.2647,
  10,
  18,
  900,
  1400,
  'week'::price_code,
  8000,
  5,
  3,
  'https://sacredvalleysanctuary.com',
  'https://google.com',
  'Popular'::venue_label,
  '<p>Ancient Incan wisdom in a mountain setting.</p><p>Ancient Incan wisdom in a mountain setting.</p><p>Ancient Incan wisdom in a mountain setting.</p>',
  '[
    { "title": "From Airport (LIM)", "text": "Flight to Cusco then 2h drive to Sacred Valley.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Private transfers available from Cusco hotels.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Collectivos (shared vans) frequent Sacred Valley.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Ollantaytambo Ruins", "distance": "15", "unit": "min", "note": "walk" },
    { "name": "Sacred Valley", "distance": "20", "unit": "min", "note": "walk" },
    { "name": "Machu Picchu", "distance": "15", "unit": "min", "note": "train" },
    { "name": "Maras Salt Mines", "distance": "10", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'The Sacred Valley Sanctuary – ready for your next group.',
  '[
    { "title": "Travel Insurance", "text": "Guests are strongly encouraged to purchase travel insurance to cover unexpected cancellations, medical emergencies, or travel disruptions.", "icon": {"library": "lucide-react", "name": "shield"} },
    { "title": "Force Majeure", "text": "In the event of natural disasters, pandemics, or other circumstances beyond our control, the retreat reserves the right to reschedule or cancel bookings without liability.", "icon": {"library": "lucide-react", "name": "triangle-alert"} },
    { "title": "Rescheduling Policy", "text": "Bookings may be rescheduled up to 30 days before the retreat start date, subject to availability.", "icon": {"library": "lucide-react", "name": "refresh-cw"} },
    { "title": "Group Size", "text": "Minimum 10 participants are required. Maximum group size is 25 participants.", "icon": {"library": "lucide-react", "name": "clock"} }
  ]'::jsonb,
  '{"Meals","Accommodation","Yoga"}'::text [],
  '{"Flights","Visa","Spa"}'::text []
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 6. Mindful Mountain Retreat
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Mindful Mountain Retreat',
  'A tranquil retreat in the Himalayas offering mindfulness meditation, yoga, and silent walking in pristine mountain air.',
  'published'::venue_status,
  'Nepal',
  'Pokhara',
  'Sarangkot Rd, Pokhara',
  28.2639,
  83.9722,
  12,
  20,
  700,
  1100,
  'per_person'::price_code,
  9000,
  6,
  4,
  'https://mindfulmountain.com',
  'https://google.com',
  'Verified'::venue_label,
  '<p>Experience stillness and mindfulness in the heart of the Himalayas with guided meditation and yoga practices.</p><p>Experience stillness and mindfulness in the heart of the Himalayas with guided meditation and yoga practices.</p><p>Experience stillness and mindfulness in the heart of the Himalayas with guided meditation and yoga practices.</p>',
  '[
    { "title": "From Airport (KTM)", "text": "30 min domestic flight from Kathmandu to Pokhara, then 30 min drive.", "note": "Complimentary bicycles available • Local motorbike taxi services nearby" },
    { "title": "By Car or Taxi", "text": "6h drive from Kathmandu to Pokhara on scenic highways.", "note": "Complimentary bicycles available • Local motorbike taxi services nearby" },
    { "title": "Local Transport", "text": "Taxis and local jeeps available.", "note": "Complimentary bicycles available • Local motorbike taxi services nearby" }
  ]'::jsonb,
  '[
    { "name": "Phewa Lake", "distance": "20", "unit": "min", "note": "walk" },
    { "name": "Sarangkot Viewpoint", "distance": "15", "unit": "min", "note": "drive" },
    { "name": "World Peace Pagoda", "distance": "25", "unit": "min", "note": "drive" },
    { "name": "Annapurna Base Trek Start", "distance": "30", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'The Mindful Mountain Retreat – ready for your next group.',
  null,
  '{"Meals","Yoga classes","Guided meditation","Accommodation"}'::text [],
  '{"Flights","Visa","Trekking permits"}'::text []
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 7. Desert Soul Sanctuary
SELECT '22222222-2222-2222-2222-222222222222'::uuid,
  vt.id,
  'Desert Soul Sanctuary',
  'Transformative retreat in the Moroccan desert offering stargazing meditation, desert yoga, and traditional ceremonies under vast skies.',
  'published'::venue_status,
  'Morocco',
  'Marrakech',
  'Route de Ouarzazate, Marrakech',
  31.6295,
  -7.9811,
  15,
  25,
  1200,
  2000,
  'per_night'::price_code,
  11000,
  8,
  5,
  'https://desertsoul.com',
  'https://google.com',
  'New'::venue_label,
  '<p>Transformative desert retreat in Marrakech offering yoga, meditation, and unique spiritual experiences.</p><p>Transformative desert retreat in Marrakech offering yoga, meditation, and unique spiritual experiences.</p><p>Transformative desert retreat in Marrakech offering yoga, meditation, and unique spiritual experiences.</p>',
  '[
    { "title": "From Airport (CMN)", "text": "45 min drive from Marrakech airport to desert retreat.", "note": "Complimentary bicycles available • Local motorbike taxi services nearby" },
    { "title": "By Car or Taxi", "text": "Private transfers and taxis from Marrakech city.", "note": "Complimentary bicycles available • Local motorbike taxi services nearby" },
    { "title": "Local Transport", "text": "4x4 desert jeeps available locally.", "note": "Complimentary bicycles available • Local motorbike taxi services nearby" }
  ]'::jsonb,
  '[
    { "name": "Medina Souks", "distance": "25", "unit": "min", "note": "walk" },
    { "name": "Jemaa el-Fnaa", "distance": "20", "unit": "min", "note": "walk" },
    { "name": "Atlas Mountains", "distance": "45", "unit": "min", "note": "drive" },
    { "name": "Agafay Desert", "distance": "30", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'The Desert Soul Sanctuary – ready for your next group.',
  null,
  '{"Meals","Yoga shala","Accommodation","Meditation hall"}'::text [],
  '{"Flights","Visa","Alcohol"}'::text []
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 8. Island Spirit Retreat
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Island Spirit Retreat',
  'Exclusive island retreat in the Maldives with overwater bungalows, marine activities, and tropical wellness programs.',
  'pending'::venue_status,
  'Maldives',
  'Maafushi',
  'North Male Atoll, Maldives',
  3.9426,
  73.5207,
  10,
  15,
  1400,
  2200,
  'custom'::price_code,
  7000,
  7,
  5,
  'https://islandspirit.com',
  'https://google.com',
  'New'::venue_label,
  '<p>Luxury island escape offering holistic wellness and marine adventures in the Maldives.</p><p>Luxury island escape offering holistic wellness and marine adventures in the Maldives.</p><p>Luxury island escape offering holistic wellness and marine adventures in the Maldives.</p>',
  '[
    { "title": "From Airport (MLE)", "text": "45 min boat transfer from Malé airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Not applicable – only boat transfers.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Dhoni boats for short distances.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Banana Reef", "distance": "15", "unit": "min", "note": "boat" },
    { "name": "Maafushi Island", "distance": "20", "unit": "min", "note": "boat" },
    { "name": "Vaavu Atoll", "distance": "45", "unit": "min", "note": "boat" },
    { "name": "Sandbank Picnic Spot", "distance": "30", "unit": "min", "note": "boat" }
  ]'::jsonb,
  'The Island Spirit Retreat – ready for your next group.',
  null,
  '{"Accommodation","Meals","Yoga classes"}'::text [],
  '{"Flights","Alcohol","Luxury spa treatments"}'::text []
FROM venue_types vt
WHERE vt.name = 'Resort'
UNION ALL
-- 9. Zen Garden House
SELECT '22222222-2222-2222-2222-222222222222'::uuid,
  vt.id,
  'Zen Garden House',
  'Traditional Japanese retreat in Kyoto with authentic Zen gardens, tea ceremonies, and mindfulness practices.',
  'published'::venue_status,
  'Japan',
  'Kyoto',
  '123 Zen St, Kyoto',
  35.0116,
  135.7681,
  8,
  12,
  600,
  950,
  'per_person'::price_code,
  5000,
  4,
  2,
  'https://zengardenhouse.com',
  'https://google.com',
  'Verified'::venue_label,
  '<p>Traditional Japanese-style retreat featuring tea ceremonies and mindfulness practices.</p><p>Traditional Japanese-style retreat featuring tea ceremonies and mindfulness practices.</p><p>Traditional Japanese-style retreat featuring tea ceremonies and mindfulness practices.</p>',
  '[
    { "title": "From Airport (KIX)", "text": "1h train ride from Osaka Kansai Airport to Kyoto.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "1h 15m drive from Osaka to Kyoto.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Kyoto Metro and local buses widely available.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Fushimi Inari Shrine", "distance": "20", "unit": "min", "note": "train" },
    { "name": "Kiyomizu-dera", "distance": "15", "unit": "min", "note": "bus" },
    { "name": "Arashiyama Bamboo Grove", "distance": "30", "unit": "min", "note": "train" },
    { "name": "Nijo Castle", "distance": "10", "unit": "min", "note": "train" }
  ]'::jsonb,
  'The Zen Garden House – ready for your next group.',
  null,
  '{"Meals","Tea ceremony","Accommodation"}'::text [],
  '{"Flights","Alcohol","Spa"}'::text []
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 10. Desert Light Retreat
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Desert Light Retreat',
  'Spiritual retreat in Wadi Rum, Jordan, offering desert meditation, Sufi practices, and Middle Eastern healing traditions.',
  'draft'::venue_status,
  'Jordan',
  'Wadi Rum',
  'Wadi Rum Village, Jordan',
  29.5328,
  35.0060,
  14,
  22,
  800,
  1600,
  'weekend'::price_code,
  8500,
  7,
  4,
  'https://desertlight.com',
  'https://google.com',
  'New'::venue_label,
  '<p>Spiritual desert retreat with meditation, yoga, and Sufi practices in Wadi Rum.</p><p>Spiritual desert retreat with meditation, yoga, and Sufi practices in Wadi Rum.</p><p>Spiritual desert retreat with meditation, yoga, and Sufi practices in Wadi Rum.</p>',
  '[
    { "title": "From Airport (AMM)", "text": "4h drive from Amman to Wadi Rum retreat.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Private transfers available from Amman.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Local Bedouin jeep tours and camels.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Wadi Rum Protected Area", "distance": "15", "unit": "min", "note": "drive" },
    { "name": "Lawrence''s Spring", "distance": "20", "unit": "min", "note": "drive" },
    { "name": "Khazali Canyon", "distance": "30", "unit": "min", "note": "drive" },
    { "name": "Petra", "distance": "2", "unit": "hr", "note": "drive" }
  ]'::jsonb,
  'The Desert Light Retreat – ready for your next group.',
  null,
  '{"Meals","Yoga classes","Meditation","Accommodation"}'::text [],
  '{"Flights","Visa","Alcohol"}'::text []
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 11. Himalayan Bliss Center
SELECT '22222222-2222-2222-2222-222222222222'::uuid,
  vt.id,
  'Himalayan Bliss Center',
  'High-altitude retreat in the Himalayas offering advanced yoga, meditation, and Tibetan spiritual teachings.',
  'published'::venue_status,
  'Nepal',
  'Kathmandu',
  'Boudhanath Stupa, Kathmandu',
  27.7215,
  85.3620,
  18,
  28,
  1100,
  1900,
  'per_night'::price_code,
  10000,
  9,
  6,
  'https://himalayanbliss.com',
  'https://google.com',
  'Verified'::venue_label,
  '<p>Advanced spiritual and meditation retreat guided by Tibetan masters in Kathmandu.</p><p>Advanced spiritual and meditation retreat guided by Tibetan masters in Kathmandu.</p><p>Advanced spiritual and meditation retreat guided by Tibetan masters in Kathmandu.</p>',
  '[
    { "title": "From Airport (KTM)", "text": "20 min drive from Tribhuvan International Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Accessible by private taxi or shuttle service.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Buses and rickshaws available nearby.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Boudhanath Stupa", "distance": "5", "unit": "min", "note": "walk" },
    { "name": "Pashupatinath Temple", "distance": "15", "unit": "min", "note": "drive" },
    { "name": "Thamel", "distance": "20", "unit": "min", "note": "drive" },
    { "name": "Durbar Square", "distance": "25", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'The Himalayan Bliss Center – ready for your next group.',
  null,
  '{"Yoga classes","Meditation","Meals","Accommodation"}'::text [],
  '{"Flights","Visa","Insurance"}'::text []
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 12. Mediterranean Wellness Villa
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Mediterranean Wellness Villa',
  'Luxurious villa in Santorini offering private spa programs, Mediterranean cuisine, and ocean-view yoga.',
  'published'::venue_status,
  'Greece',
  'Santorini',
  'Oia, Santorini',
  36.4621,
  25.3761,
  10,
  18,
  1300,
  2100,
  'week'::price_code,
  9500,
  6,
  4,
  'https://medwellnessvilla.com',
  'https://google.com',
  'Popular'::venue_label,
  '<p>Wellness and luxury in Santorini with private yoga terraces and gourmet cuisine.</p>',
  '[
    { "title": "From Airport (JTR)", "text": "30 min drive from Santorini Airport to Oia.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Private taxis and car rentals widely available.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Frequent buses connect Oia with Fira and other towns.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Caldera Viewpoint", "distance": "10", "unit": "min", "note": "walk" },
    { "name": "Ammoudi Bay", "distance": "15", "unit": "min", "note": "walk" },
    { "name": "Fira Town", "distance": "25", "unit": "min", "note": "drive" },
    { "name": "Red Beach", "distance": "40", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'The Mediterranean Wellness Villa – ready for your next group.',
  null,
  '{"Private spa","Organic meals","Yoga terraces","Accommodation"}'::text [],
  '{"Flights","Alcohol","Airport transfers"}'::text []
FROM venue_types vt
WHERE vt.name = 'Villa / Private House'
UNION ALL
-- 13. Zen Garden Retreat
SELECT '22222222-2222-2222-2222-222222222222'::uuid,
  vt.id,
  'Zen Garden Retreat',
  'Japanese-style retreat in Kyoto offering authentic Zen gardens, tea ceremonies, and mindfulness practices.',
  'draft'::venue_status,
  'Japan',
  'Kyoto',
  'Arashiyama, Kyoto',
  35.0094,
  135.6772,
  8,
  14,
  500,
  900,
  'per_person'::price_code,
  4800,
  3,
  2,
  'https://zengardenretreat.com',
  'https://google.com',
  'New'::venue_label,
  '<p>Authentic Zen garden retreat in Kyoto with traditional mindfulness rituals.</p><p>Authentic Zen garden retreat in Kyoto with traditional mindfulness rituals.</p><p>Authentic Zen garden retreat in Kyoto with traditional mindfulness rituals.</p>',
  '[
    { "title": "From Airport (KIX)", "text": "1h train ride from Kansai International Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "90 min drive from Osaka.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Accessible by Kyoto Metro and local buses.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Arashiyama Bamboo Grove", "distance": "10", "unit": "min", "note": "walk" },
    { "name": "Kinkaku-ji Temple", "distance": "25", "unit": "min", "note": "bus" },
    { "name": "Nijo Castle", "distance": "20", "unit": "min", "note": "bus" },
    { "name": "Philosopher''s Path", "distance": "35", "unit": "min", "note": "bus" }
  ]'::jsonb,
  'The Zen Garden Retreat – ready for your next group.',
  null,
  '{"Tea ceremony","Meals","Meditation","Accommodation"}'::text [],
  '{"Flights","Visa","Alcohol"}'::text []
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 14. Tropical Healing Center
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Tropical Healing Center',
  'Holistic retreat in Costa Rica offering sustainable living workshops, organic farming, and rainforest yoga.',
  'published'::venue_status,
  'Costa Rica',
  'Nosara',
  'Playa Guiones, Nosara',
  9.9763,
  -85.6530,
  20,
  30,
  1500,
  2500,
  'per_night'::price_code,
  12000,
  10,
  7,
  'https://tropicalhealing.com',
  'https://google.com',
  'Verified'::venue_label,
  '<p>Holistic healing in Costa Rica with eco-conscious workshops and yoga by the beach.</p><p>Holistic healing in Costa Rica with eco-conscious workshops and yoga by the beach.</p><p>Holistic healing in Costa Rica with eco-conscious workshops and yoga by the beach.</p>',
  '[
    { "title": "From Airport (LIR)", "text": "2h drive from Liberia International Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Private shuttles and taxis from San José or Liberia.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Tuk-tuks and motorbikes available.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Playa Guiones", "distance": "10", "unit": "min", "note": "walk" },
    { "name": "Nosara Biological Reserve", "distance": "20", "unit": "min", "note": "drive" },
    { "name": "Ostional Wildlife Refuge", "distance": "40", "unit": "min", "note": "drive" },
    { "name": "Playa Pelada", "distance": "15", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'The Tropical Healing Center – ready for your next group.',
  null,
  '{"Workshops","Organic meals","Yoga classes","Accommodation"}'::text [],
  '{"Flights","Alcohol","Visa"}'::text []
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 15. Arctic Wellness Lodge
SELECT '22222222-2222-2222-2222-222222222222'::uuid,
  vt.id,
  'Arctic Wellness Lodge',
  'Unique Arctic retreat in Norway offering northern lights yoga, ice meditation, and Sami healing traditions.',
  'pending'::venue_status,
  'Norway',
  'Tromsø',
  'Polar Street, Tromsø',
  69.6492,
  18.9553,
  12,
  18,
  1200,
  1800,
  'custom'::price_code,
  10500,
  6,
  4,
  'https://arcticwellness.com',
  'https://google.com',
  'Popular'::venue_label,
  '<p>Arctic wellness retreat with northern lights views and traditional Sami healing.</p><p>Arctic wellness retreat with northern lights views and traditional Sami healing.</p><p>Arctic wellness retreat with northern lights views and traditional Sami healing.</p>',
  '[
    { "title": "From Airport (TOS)", "text": "15 min drive from Tromsø Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Private taxis and shuttle buses available.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Local buses connect the retreat with Tromsø center.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Northern Lights Observatory", "distance": "25", "unit": "min", "note": "drive" },
    { "name": "Arctic Cathedral", "distance": "20", "unit": "min", "note": "drive" },
    { "name": "Fjellheisen Cable Car", "distance": "30", "unit": "min", "note": "drive" },
    { "name": "Sami Village", "distance": "40", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'The Arctic Wellness Lodge – ready for your next group.',
  null,
  '{"Northern lights yoga","Ice meditation","Meals","Accommodation"}'::text [],
  '{"Flights","Insurance","Alcohol"}'::text []
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 16. Desert Rose Sanctuary
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Desert Rose Sanctuary',
  'Spiritual retreat in Jordan''s Wadi Rum desert offering Sufi practices, desert meditation, and Middle Eastern healing.',
  'published'::venue_status,
  'Jordan',
  'Wadi Rum',
  'Wadi Rum Protected Area',
  29.5765,
  35.4192,
  14,
  22,
  800,
  1400,
  'week'::price_code,
  7000,
  7,
  4,
  'https://desertrose.com',
  'https://google.com',
  'Verified'::venue_label,
  '<p>Transformative desert retreat with authentic Sufi traditions and meditation under the stars.</p><p>Transformative desert retreat with authentic Sufi traditions and meditation under the stars.</p><p>Transformative desert retreat with authentic Sufi traditions and meditation under the stars.</p>',
  '[
    { "title": "From Airport (AMM)", "text": "4h drive from Amman Airport to Wadi Rum.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Private cars and desert jeeps available.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Camel rides available within Wadi Rum.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Wadi Rum Village", "distance": "10", "unit": "min", "note": "drive" },
    { "name": "Desert Cliffs", "distance": "20", "unit": "min", "note": "drive" },
    { "name": "Bedouin Camps", "distance": "5", "unit": "min", "note": "walk" },
    { "name": "Petra", "distance": "90", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'The Desert Rose Sanctuary – ready for your next group.',
  null,
  '{"Desert meditation","Sufi rituals","Meals","Accommodation"}'::text [],
  '{"Flights","Visa","Insurance"}'::text []
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 17. Mountain Spirit Lodge
SELECT '22222222-2222-2222-2222-222222222222'::uuid,
  vt.id,
  'Mountain Spirit Lodge',
  'High-altitude lodge in Peru''s Sacred Valley offering Andean ceremonies, mountain yoga, and spiritual healing.',
  'draft'::venue_status,
  'Peru',
  'Cusco',
  'Sacred Valley, Cusco',
  -13.5167,
  -71.9789,
  16,
  28,
  1000,
  1700,
  'per_person'::price_code,
  9500,
  8,
  5,
  'https://mountainspirit.com',
  'https://google.com',
  'Popular'::venue_label,
  '<p>Reconnect with Andean wisdom through ceremonies and yoga in Cusco''s Sacred Valley.</p><p>Reconnect with Andean wisdom through ceremonies and yoga in Cusco''s Sacred Valley.</p><p>Reconnect with Andean wisdom through ceremonies and yoga in Cusco''s Sacred Valley.</p>',
  '[
    { "title": "From Airport (CUZ)", "text": "1h drive from Cusco Airport to Sacred Valley.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Private shuttles and local taxis available.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Minibuses operate daily from Cusco.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Ollantaytambo Ruins", "distance": "20", "unit": "min", "note": "drive" },
    { "name": "Pisac Market", "distance": "30", "unit": "min", "note": "drive" },
    { "name": "Machu Picchu", "distance": "90", "unit": "min", "note": "train" },
    { "name": "Urubamba River", "distance": "5", "unit": "min", "note": "walk" }
  ]'::jsonb,
  'The Mountain Spirit Lodge – ready for your next group.',
  null,
  '{"Andean ceremonies","Mountain yoga","Meals","Accommodation"}'::text [],
  '{"Flights","Visa","Alcohol"}'::text []
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 18. Ocean Spirit Center
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Ocean Spirit Center',
  'Oceanfront retreat in Byron Bay offering marine therapy, water meditation, and coastal wellness workshops.',
  'published'::venue_status,
  'Australia',
  'Byron Bay',
  'Marine Road, Byron Bay',
  -28.6474,
  153.6020,
  15,
  25,
  1400,
  2300,
  'per_night'::price_code,
  9200,
  8,
  6,
  'https://oceanspirit.com',
  'https://google.com',
  'Verified'::venue_label,
  '<p>Oceanfront wellness retreat specializing in marine therapy and water-based practices.</p><p>Oceanfront wellness retreat specializing in marine therapy and water-based practices.</p><p>Oceanfront wellness retreat specializing in marine therapy and water-based practices.</p>',
  '[
    { "title": "From Airport (BNK)", "text": "30 min drive from Ballina Byron Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Private taxis and buses available from Brisbane.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Buses run daily from Byron town center.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Main Beach", "distance": "5", "unit": "min", "note": "walk" },
    { "name": "Cape Byron Lighthouse", "distance": "15", "unit": "min", "note": "drive" },
    { "name": "Byron Bay Markets", "distance": "10", "unit": "min", "note": "drive" },
    { "name": "Arakwal National Park", "distance": "12", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'The Ocean Spirit Center – ready for your next group.',
  null,
  '{"Marine therapy","Water meditation","Meals","Accommodation"}'::text [],
  '{"Flights","Insurance","Alcohol"}'::text []
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 19. Forest Wisdom Retreat
SELECT '22222222-2222-2222-2222-222222222222'::uuid,
  vt.id,
  'Forest Wisdom Retreat',
  'Retreat in Brazil''s Chapada dos Veadeiros offering shamanic healing, forest ceremonies, and eco-workshops.',
  'published'::venue_status,
  'Brazil',
  'Chapada dos Veadeiros',
  'Forest Path, Goiás',
  -14.1300,
  -47.5000,
  10,
  18,
  700,
  1200,
  'custom'::price_code,
  8000,
  6,
  4,
  'https://forestwisdom.com',
  'https://google.com',
  'Verified'::venue_label,
  '<p>Forest retreat blending indigenous shamanic wisdom with eco-conscious practices.</p><p>Forest retreat blending indigenous shamanic wisdom with eco-conscious practices.</p><p>Forest retreat blending indigenous shamanic wisdom with eco-conscious practices.</p>',
  '[
    { "title": "From Airport (BSB)", "text": "3h drive from Brasília Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Private cars and vans available.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Local buses operate from Alto Paraíso.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Vale da Lua", "distance": "25", "unit": "min", "note": "drive" },
    { "name": "Cachoeira Almécegas", "distance": "15", "unit": "min", "note": "drive" },
    { "name": "Chapada National Park", "distance": "40", "unit": "min", "note": "drive" },
    { "name": "Alto Paraíso", "distance": "20", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'The Forest Wisdom Retreat – ready for your next group.',
  null,
  '{"Shamanic healing","Eco-workshops","Meals","Accommodation"}'::text [],
  '{"Flights","Insurance","Alcohol"}'::text []
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 20. Sky High Sanctuary
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Sky High Sanctuary',
  'Swiss mountain-top retreat in Zermatt offering cloud meditation, high-altitude yoga, and panoramic views.',
  'published'::venue_status,
  'Switzerland',
  'Zermatt',
  'Alpine Peak, Zermatt',
  46.0207,
  7.7491,
  8,
  16,
  1600,
  2800,
  'per_night'::price_code,
  8500,
  5,
  3,
  'https://skyhighsanctuary.com',
  'https://google.com',
  'Verified'::venue_label,
  '<p>Exclusive Swiss retreat above the clouds with panoramic alpine scenery.</p><p>Exclusive Swiss retreat above the clouds with panoramic alpine scenery.</p><p>Exclusive Swiss retreat above the clouds with panoramic alpine scenery.</p>',
  '[
    { "title": "From Airport (ZRH)", "text": "3h train from Zurich to Zermatt.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Zermatt is a car-free town; park in Täsch and take shuttle train.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Electric taxis and horse carriages within Zermatt.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Matterhorn Glacier Paradise", "distance": "25", "unit": "min", "note": "cable car" },
    { "name": "Gornergrat Railway", "distance": "15", "unit": "min", "note": "walk" },
    { "name": "Sunnegga Paradise", "distance": "20", "unit": "min", "note": "train" },
    { "name": "Zermatt Village", "distance": "10", "unit": "min", "note": "walk" }
  ]'::jsonb,
  'The Sky High Sanctuary – ready for your next group.',
  null,
  '{"Cloud meditation","Yoga classes","Meals","Accommodation"}'::text [],
  '{"Flights","Insurance","Alcohol"}'::text []
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 21. Valley of Peace
SELECT '22222222-2222-2222-2222-222222222222'::uuid,
  vt.id,
  'Valley of Peace',
  'Silent meditation retreat in Dharamshala offering peace workshops and conflict resolution programs.',
  'published'::venue_status,
  'India',
  'Dharamshala',
  'McLeod Ganj, Dharamshala',
  32.2190,
  76.3234,
  18,
  28,
  900,
  1500,
  'week'::price_code,
  8500,
  8,
  5,
  'https://valleyofpeace.com',
  'https://google.com',
  'Verified'::venue_label,
  '<p>Deep silence and inner peace in the Himalayas.</p><p>Deep silence and inner peace in the Himalayas.</p><p>Deep silence and inner peace in the Himalayas.</p>',
  '[
    { "title": "From Airport (DEL)", "text": "1h flight + 2h drive to Dharamshala.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "12h road trip from Delhi, private taxis available.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Rickshaws and minibuses available in town.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Dalai Lama Temple", "distance": "10", "unit": "min", "note": "walk" },
    { "name": "Bhagsu Waterfall", "distance": "25", "unit": "min", "note": "walk" },
    { "name": "Triund Trek", "distance": "3", "unit": "hr", "note": "hike" },
    { "name": "Norbulingka Institute", "distance": "20", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'The Valley of Peace – ready for your next group.',
  null,
  '{"Silent meditation","Peace workshops","Meals","Accommodation"}'::text [],
  '{"Flights","Visa","Insurance"}'::text []
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 22. Crystal Healing Center
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Crystal Healing Center',
  'Crystal therapy and vibrational healing retreat in Brazil''s Minas Gerais region.',
  'published'::venue_status,
  'Brazil',
  'Minas Gerais',
  'Cristalina, Minas Gerais',
  -16.7677,
  -47.6138,
  12,
  20,
  750,
  1300,
  'per_person'::price_code,
  7500,
  6,
  4,
  'https://crystalhealing.com',
  'https://google.com',
  'Verified'::venue_label,
  '<p>Energy healing with crystals in the heart of Brazil.</p><p>Energy healing with crystals in the heart of Brazil.</p><p>Energy healing with crystals in the heart of Brazil.</p>',
  '[
    { "title": "From Airport (BSB)", "text": "2h drive from Brasília Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Taxis and buses available to Cristalina.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Short local transfers via moto-taxi.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Cristalina Market", "distance": "15", "unit": "min", "note": "drive" },
    { "name": "Crystal Mines", "distance": "20", "unit": "min", "note": "drive" },
    { "name": "Chapada dos Veadeiros", "distance": "2", "unit": "hr", "note": "drive" },
    { "name": "Local Farms", "distance": "30", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'The Crystal Healing Center – ready for your next group.',
  null,
  '{"Crystal therapy","Energy healing","Meals","Accommodation"}'::text [],
  '{"Flights","Visa","Insurance"}'::text []
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 23. Sunrise Wellness Resort
SELECT '22222222-2222-2222-2222-222222222222'::uuid,
  vt.id,
  'Sunrise Wellness Resort',
  'Luxury wellness resort in Koh Samui offering sunrise yoga, spa treatments, and ocean-view dining.',
  'published'::venue_status,
  'Thailand',
  'Koh Samui',
  'Chaweng Beach, Koh Samui',
  9.5120,
  100.0136,
  24,
  40,
  2000,
  3200,
  'per_night'::price_code,
  15000,
  14,
  10,
  'https://sunrisewellness.com',
  'https://google.com',
  'Popular'::venue_label,
  '<p>Luxury resort for wellness seekers with sunrise yoga and premium spa treatments.</p><p>Luxury resort for wellness seekers with sunrise yoga and premium spa treatments.</p><p>Luxury resort for wellness seekers with sunrise yoga and premium spa treatments.</p>',
  '[
    { "title": "From Airport (USM)", "text": "20 min drive from Koh Samui Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Private taxis and vans available on demand.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Tuk-tuks and scooters available around Koh Samui.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Chaweng Beach", "distance": "5", "unit": "min", "note": "walk" },
    { "name": "Big Buddha Temple", "distance": "15", "unit": "min", "note": "drive" },
    { "name": "Lamai Beach", "distance": "20", "unit": "min", "note": "drive" },
    { "name": "Angthong Marine Park", "distance": "60", "unit": "min", "note": "boat" }
  ]'::jsonb,
  'The Sunrise Wellness Resort – ready for your next group.',
  null,
  '{"Sunrise yoga","Spa treatments","Meals","Accommodation"}'::text [],
  '{"Flights","Visa","Insurance"}'::text []
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 24. Sacred Mountain Lodge
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Sacred Mountain Lodge',
  'Spiritual retreat in Nepal''s Mount Kailash region offering pilgrimages and mountain worship ceremonies.',
  'draft'::venue_status,
  'Nepal',
  'Mount Kailash',
  'Sacred Path, Mount Kailash',
  31.0668,
  81.3125,
  14,
  24,
  1000,
  1600,
  'custom'::price_code,
  9200,
  7,
  5,
  'https://sacredmountain.com',
  'https://google.com',
  'Verified'::venue_label,
  '<p>Experience ancient Himalayan pilgrimages at the foot of Mount Kailash.</p><p>Experience ancient Himalayan pilgrimages at the foot of Mount Kailash.</p><p>Experience ancient Himalayan pilgrimages at the foot of Mount Kailash.</p>',
  '[
    { "title": "From Airport (KTM)", "text": "3h drive + mountain trek to lodge.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Private jeeps and buses available from Kathmandu.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Guided treks and pack animals available.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Mount Kailash Base", "distance": "2", "unit": "hr", "note": "hike" },
    { "name": "Mansarovar Lake", "distance": "3", "unit": "hr", "note": "hike" },
    { "name": "Kathmandu Valley", "distance": "6", "unit": "hr", "note": "drive" },
    { "name": "Local Villages", "distance": "30", "unit": "min", "note": "hike" }
  ]'::jsonb,
  'The Sacred Mountain Lodge – ready for your next group.',
  null,
  '{"Pilgrimages","Mountain worship","Meals","Accommodation"}'::text [],
  '{"Flights","Visa","Insurance"}'::text []
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 25. Eternal Spring Center
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Eternal Spring Center',
  'New Zealand retreat in Rotorua offering seasonal wellness programs and sustainable living practices.',
  'rejected'::venue_status,
  'New Zealand',
  'Rotorua',
  'Spring Road, Rotorua',
  -38.1368,
  176.2497,
  16,
  26,
  850,
  1450,
  'week'::price_code,
  11000,
  9,
  6,
  'https://eternalspring.com',
  'https://google.com',
  'New'::venue_label,
  '<p>Year-round retreat with seasonal wellness and eco-living workshops.</p><p>Year-round retreat with seasonal wellness and eco-living workshops.</p><p>Year-round retreat with seasonal wellness and eco-living workshops.</p>',
  '[
    { "title": "From Airport (AKL)", "text": "3h drive from Auckland Airport to Rotorua.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Private transfers and rental cars available.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Buses operate daily within Rotorua.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Rotorua Lake", "distance": "15", "unit": "min", "note": "walk" },
    { "name": "Polynesian Spa", "distance": "10", "unit": "min", "note": "drive" },
    { "name": "Redwoods Forest", "distance": "20", "unit": "min", "note": "drive" },
    { "name": "Geysers of Rotorua", "distance": "15", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'The Eternal Spring Center – ready for your next group.',
  null,
  '{"Seasonal wellness","Eco workshops","Meals","Accommodation"}'::text [],
  '{"Flights","Insurance","Alcohol"}'::text []
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 26. Rainforest Harmony Lodge
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Rainforest Harmony Lodge',
  'Eco-retreat in the Amazon rainforest offering jungle treks, bird-watching, and shamanic ceremonies.',
  'published'::venue_status,
  'Brazil',
  'Manaus',
  'Amazon Road, Manaus',
  -3.1190,
  -60.0217,
  12,
  22,
  950,
  1550,
  'per_person'::price_code,
  7200,
  6,
  4,
  'https://rainforestharmony.com',
  'https://instagram.com/rainforestharmony',
  'New'::venue_label,
  '<p>Reconnect with nature in the Amazon rainforest.</p><p>Reconnect with nature in the Amazon rainforest.</p><p>Reconnect with nature in the Amazon rainforest.</p>',
  '[
    { "title": "From Airport (MAO)", "text": "1h drive from Manaus Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Private taxis and jeeps available.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Boat rides and guided jungle tours.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Amazon River", "distance": "10", "unit": "min", "note": "walk" },
    { "name": "Local Village", "distance": "20", "unit": "min", "note": "walk" },
    { "name": "Rainforest Trails", "distance": "5", "unit": "min", "note": "walk" },
    { "name": "Manaus City", "distance": "45", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'Rainforest Harmony – your Amazon escape.',
  null,
  '{"Jungle treks","Bird-watching","Meals","Accommodation"}'::text [],
  '{"Flights","Visa","Alcohol"}'::text []
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 27. Nordic Aurora Retreat
SELECT '22222222-2222-2222-2222-222222222222'::uuid,
  vt.id,
  'Nordic Aurora Retreat',
  'Scandinavian lodge in Rovaniemi offering Arctic wellness, sauna rituals, and northern lights viewing.',
  'draft'::venue_status,
  'Finland',
  'Rovaniemi',
  'Lapland Village, Rovaniemi',
  66.5039,
  25.7294,
  10,
  18,
  1200,
  2100,
  'per_night'::price_code,
  8000,
  5,
  3,
  'https://nordicaurora.com',
  'https://instagram.com/nordicaurora',
  'Verified'::venue_label,
  '<p>Chasing auroras in the Arctic sky.</p><p>Chasing auroras in the Arctic sky.</p><p>Chasing auroras in the Arctic sky.</p>',
  '[
    { "title": "From Airport (RVN)", "text": "30 min drive from Rovaniemi Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Taxis available throughout Rovaniemi.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Snowmobiles and reindeer sleighs in winter.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Santa Claus Village", "distance": "20", "unit": "min", "note": "drive" },
    { "name": "Aurora Point", "distance": "15", "unit": "min", "note": "drive" },
    { "name": "Arktikum Museum", "distance": "10", "unit": "min", "note": "drive" },
    { "name": "Lapland Forest", "distance": "5", "unit": "min", "note": "walk" }
  ]'::jsonb,
  'Nordic Aurora Retreat – ready for your next group.',
  null,
  '{"Sauna rituals","Arctic yoga","Meals","Accommodation"}'::text [],
  '{"Flights","Insurance","Spa extras"}'::text []
FROM venue_types vt
WHERE vt.name = 'Resort'
UNION ALL
-- 28. Savannah Spirit Camp
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Savannah Spirit Camp',
  'African safari retreat in Kenya offering mindfulness in the savannah, wildlife tours, and ancestral healing rituals.',
  'pending'::venue_status,
  'Kenya',
  'Nairobi',
  'Masai Mara Reserve, Kenya',
  -1.4061,
  35.0296,
  14,
  26,
  1100,
  1800,
  'custom'::price_code,
  8500,
  7,
  4,
  'https://savannahspirit.com',
  'https://instagram.com/savannahspirit',
  'Popular'::venue_label,
  '<p>Mindfulness and wildlife in the African savannah.</p><p>Mindfulness and wildlife in the African savannah.</p><p>Mindfulness and wildlife in the African savannah.</p>',
  '[
    { "title": "From Airport (NBO)", "text": "4h safari drive from Nairobi Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Private safari jeeps available.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Game drives organized daily.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Masai Village", "distance": "30", "unit": "min", "note": "drive" },
    { "name": "Safari Plains", "distance": "5", "unit": "min", "note": "walk" },
    { "name": "Mara River", "distance": "20", "unit": "min", "note": "drive" },
    { "name": "Wildlife Park", "distance": "15", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'Savannah Spirit Camp – ready for your next group.',
  null,
  '{"Safari tours","Mindfulness","Meals","Accommodation"}'::text [],
  '{"Flights","Visa","Alcohol"}'::text []
FROM venue_types vt
WHERE vt.name = 'Eco-lodge / Retreat Camp'
UNION ALL
-- 29. Himalayan Zen Ashram
SELECT '22222222-2222-2222-2222-222222222222'::uuid,
  vt.id,
  'Himalayan Zen Ashram',
  'Traditional ashram in Dharamshala offering Vipassana meditation, yoga, and Ayurvedic nutrition programs.',
  'published'::venue_status,
  'India',
  'Dharamshala',
  'Ashram Road, Dharamshala',
  32.2190,
  76.3234,
  22,
  40,
  800,
  1400,
  'per_person'::price_code,
  9200,
  10,
  6,
  'https://himalayanzen.com',
  'https://instagram.com/himalayanzen',
  'Verified'::venue_label,
  '<p>Silent wisdom in the Himalayas.</p><p>Silent wisdom in the Himalayas.</p><p>Silent wisdom in the Himalayas.</p>',
  '[
    { "title": "From Airport (DEL)", "text": "1h flight + 2h drive to Dharamshala.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Overnight buses and taxis from Delhi.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Rickshaws available locally.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Dalai Lama Temple", "distance": "10", "unit": "min", "note": "walk" },
    { "name": "Triund Trek", "distance": "3", "unit": "hr", "note": "hike" },
    { "name": "Bhagsu Waterfall", "distance": "20", "unit": "min", "note": "walk" },
    { "name": "Norbulingka Institute", "distance": "25", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'Himalayan Zen Ashram – ready for your next group.',
  null,
  '{"Vipassana","Ayurveda meals","Meditation","Accommodation"}'::text [],
  '{"Flights","Visa","Insurance"}'::text []
FROM venue_types vt
WHERE vt.name = 'Ashram / Monastery'
UNION ALL
-- 30. Mediterranean Bliss Villa
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Mediterranean Bliss Villa',
  'Luxury villa in Cyprus offering holistic spa programs, infinity pool yoga, and Mediterranean cuisine.',
  'published'::venue_status,
  'Cyprus',
  'Limassol',
  'Seafront Road, Limassol',
  34.7071,
  33.0226,
  10,
  18,
  1400,
  2400,
  'per_night'::price_code,
  9500,
  6,
  5,
  'https://medblissvilla.com',
  'https://instagram.com/medblissvilla',
  'New'::venue_label,
  '<p>Luxury wellness villa on the Mediterranean coast.</p><p>Luxury wellness villa on the Mediterranean coast.</p><p>Luxury wellness villa on the Mediterranean coast.</p>',
  '[
    { "title": "From Airport (LCA)", "text": "40 min drive from Larnaca Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Taxis and rental cars widely available.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Local buses connect Limassol with beaches.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Limassol Beach", "distance": "5", "unit": "min", "note": "walk" },
    { "name": "Old Port", "distance": "15", "unit": "min", "note": "drive" },
    { "name": "Amathus Ruins", "distance": "20", "unit": "min", "note": "drive" },
    { "name": "Troodos Mountains", "distance": "1", "unit": "hr", "note": "drive" }
  ]'::jsonb,
  'Mediterranean Bliss Villa – ready for your next group.',
  null,
  '{"Spa programs","Infinity pool yoga","Meals","Accommodation"}'::text [],
  '{"Flights","Alcohol","Insurance"}'::text []
FROM venue_types vt
WHERE vt.name = 'Villa / Private House'
UNION ALL
-- 31. Andes Soul Retreat
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Andes Soul Retreat',
  'Sacred mountain retreat in Cusco offering Andean ceremonies, coca leaf readings, and mountain yoga.',
  'published'::venue_status,
  'Peru',
  'Cusco',
  'Andes Trail, Cusco',
  -13.5320,
  -71.9675,
  12,
  22,
  900,
  1600,
  'weekend'::price_code,
  8800,
  6,
  4,
  'https://andessoul.com',
  'https://instagram.com/andessoul',
  'Verified'::venue_label,
  '<p>Reconnect with the spirit of the Andes.</p><p>Reconnect with the spirit of the Andes.</p><p>Reconnect with the spirit of the Andes.</p>',
  '[
    { "title": "From Airport (CUZ)", "text": "1h drive from Cusco Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Private cars and taxis available in Cusco.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Collective taxis and buses operate daily.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Sacred Valley", "distance": "30", "unit": "min", "note": "drive" },
    { "name": "Machu Picchu", "distance": "2", "unit": "hr", "note": "train" },
    { "name": "Cusco Center", "distance": "15", "unit": "min", "note": "drive" },
    { "name": "Pisac Ruins", "distance": "45", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'Andes Soul Retreat – where mountains meet spirit.',
  null,
  '{"Andean ceremonies","Mountain yoga","Organic meals","Accommodation"}'::text [],
  '{"Flights","Visa","Alcohol"}'::text []
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 32. Sahara Moon Lodge
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Sahara Moon Lodge',
  'Desert lodge in Merzouga offering camel meditation rides, star-gazing retreats, and Berber healing music.',
  'draft'::venue_status,
  'Morocco',
  'Merzouga',
  'Sahara Dunes Camp, Merzouga',
  31.0994,
  -4.0127,
  8,
  15,
  700,
  1300,
  'week'::price_code,
  5000,
  5,
  3,
  'https://saharamoon.com',
  'https://instagram.com/saharamoon',
  'New'::venue_label,
  '<p>Find peace under the desert moon.</p><p>Find peace under the desert moon.</p><p>Find peace under the desert moon.</p>',
  '[
    { "title": "From Airport (RAK)", "text": "7h desert transfer from Marrakech.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Private jeeps from Marrakech or Fez.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Camel rides and desert caravans available.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Sand Dunes", "distance": "5", "unit": "min", "note": "walk" },
    { "name": "Merzouga Village", "distance": "15", "unit": "min", "note": "drive" },
    { "name": "Erg Chebbi", "distance": "10", "unit": "min", "note": "drive" },
    { "name": "Desert Camp", "distance": "2", "unit": "min", "note": "walk" }
  ]'::jsonb,
  'Sahara Moon Lodge – silence and stars in the Sahara.',
  null,
  '{"Camel rides","Berber music","Star-gazing"}'::text [],
  '{"Flights","Insurance","Private jeep"}'::text []
FROM venue_types vt
WHERE vt.name = 'Eco-lodge / Retreat Camp'
UNION ALL
-- 33. Baltic Serenity Spa
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Baltic Serenity Spa',
  'Seaside wellness spa in Tallinn offering salt therapy, sea yoga, and Nordic spa rituals.',
  'published'::venue_status,
  'Estonia',
  'Tallinn',
  'Seaside Road, Tallinn',
  59.4370,
  24.7536,
  10,
  18,
  1200,
  2200,
  'per_night'::price_code,
  8200,
  7,
  5,
  'https://balticserenity.com',
  'https://instagram.com/balticserenity',
  'Verified'::venue_label,
  '<p>Salt, sea, and serenity by the Baltic Sea.</p><p>Salt, sea, and serenity by the Baltic Sea.</p><p>Salt, sea, and serenity by the Baltic Sea.</p>',
  '[
    { "title": "From Airport (TLL)", "text": "20 min drive from Tallinn Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Local taxis and ride-hailing apps available.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Buses and trams connect to seaside areas.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Baltic Sea", "distance": "2", "unit": "min", "note": "walk" },
    { "name": "Tallinn Old Town", "distance": "10", "unit": "min", "note": "drive" },
    { "name": "Kadriorg Park", "distance": "15", "unit": "min", "note": "drive" },
    { "name": "Pirita Beach", "distance": "20", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'Baltic Serenity Spa – northern sea healing.',
  null,
  '{"Salt therapy","Sea yoga","Spa rituals","Meals"}'::text [],
  '{"Flights","Alcohol","Private transfers"}'::text []
FROM venue_types vt
WHERE vt.name = 'Wellness Center'
UNION ALL
-- 34. Alpine Zen Hut
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Alpine Zen Hut',
  'Minimalist wooden hut in the Swiss Alps for deep meditation, snow yoga, and mindful solitude.',
  'pending'::venue_status,
  'Switzerland',
  'Interlaken',
  'Alpine Path, Interlaken',
  46.6863,
  7.8632,
  4,
  10,
  600,
  1000,
  'per_person'::price_code,
  5500,
  3,
  2,
  'https://alpinezenhut.com',
  'https://instagram.com/alpinezenhut',
  'New'::venue_label,
  '<p>Snow and silence in the Alps.</p><p>Snow and silence in the Alps.</p><p>Snow and silence in the Alps.</p>',
  '[
    { "title": "From Airport (ZRH)", "text": "2h train ride to Interlaken.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Private car hire available.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Trains and buses connect to Alpine trails.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Lake Thun", "distance": "10", "unit": "min", "note": "walk" },
    { "name": "Harder Kulm", "distance": "15", "unit": "min", "note": "drive" },
    { "name": "Grindelwald", "distance": "30", "unit": "min", "note": "drive" },
    { "name": "Jungfrau", "distance": "1", "unit": "hr", "note": "train" }
  ]'::jsonb,
  'Alpine Zen Hut – retreat above the clouds.',
  null,
  '{"Meditation hut","Snow yoga","Alpine meals"}'::text [],
  '{"Flights","Insurance","Alcohol"}'::text []
FROM venue_types vt
WHERE vt.name = 'Guesthouse / BnB'
UNION ALL
-- 35. Island Spirit Eco-Lodge
SELECT '22222222-2222-2222-2222-222222222222'::uuid,
  vt.id,
  'Island Spirit Eco-Lodge',
  'Eco-retreat in Bali offering permaculture workshops, ocean meditations, and island detox programs.',
  'published'::venue_status,
  'Indonesia',
  'Canggu',
  'Beach Road, Canggu',
  -8.6478,
  115.1385,
  10,
  20,
  850,
  1400,
  'custom'::price_code,
  7000,
  5,
  4,
  'https://islandspirit.com',
  'https://instagram.com/islandspirit',
  'Popular'::venue_label,
  '<p>Eco-living on a tropical island.</p><p>Eco-living on a tropical island.</p><p>Eco-living on a tropical island.</p>',
  '[
    { "title": "From Airport (DPS)", "text": "45 min drive from Ngurah Rai Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Taxis and scooters available in Canggu.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Shuttles and local drivers available.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Canggu Beach", "distance": "5", "unit": "min", "note": "walk" },
    { "name": "Echo Beach", "distance": "10", "unit": "min", "note": "walk" },
    { "name": "Tanah Lot Temple", "distance": "30", "unit": "min", "note": "drive" },
    { "name": "Seminyak", "distance": "25", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'Island Spirit Eco-Lodge – where ocean meets permaculture.',
  null,
  '{"Permaculture","Detox meals","Ocean meditation","Accommodation"}'::text [],
  '{"Flights","Visa","Private chef"}'::text []
FROM venue_types vt
WHERE vt.name = 'Eco-lodge / Retreat Camp'
UNION ALL
-- 36. Kyoto Zen House
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Kyoto Zen House',
  'Authentic Japanese retreat with tatami meditation halls, tea ceremonies, and bonsai workshops.',
  'published'::venue_status,
  'Japan',
  'Kyoto',
  'Zen Lane, Kyoto',
  35.0116,
  135.7681,
  6,
  12,
  950,
  1500,
  'weekend'::price_code,
  7000,
  4,
  3,
  'https://kyotozenhouse.com',
  'https://instagram.com/kyotozenhouse',
  'Verified'::venue_label,
  '<p>Zen traditions in Kyoto.</p><p>Zen traditions in Kyoto.</p><p>Zen traditions in Kyoto.</p>',
  '[
    { "title": "From Airport (KIX)", "text": "1h train ride from Kansai Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Taxis available from Kyoto Station.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Buses and trains connect easily to Zen Lane.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Zen Garden", "distance": "10", "unit": "min", "note": "walk" },
    { "name": "Kiyomizu Temple", "distance": "20", "unit": "min", "note": "walk" },
    { "name": "Nijo Castle", "distance": "25", "unit": "min", "note": "drive" },
    { "name": "Fushimi Inari", "distance": "30", "unit": "min", "note": "train" }
  ]'::jsonb,
  'Kyoto Zen House – find inner stillness in Japan.',
  null,
  '{"Tea ceremonies","Bonsai workshops","Tatami yoga"}'::text [],
  '{"Flights","Private tours","Alcohol"}'::text []
FROM venue_types vt
WHERE vt.name = 'Ashram / Monastery'
UNION ALL
-- 37. Caribbean Soul Villa
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Caribbean Soul Villa',
  'Private villa in Jamaica with Caribbean healing traditions, ocean-view yoga, and reggae sound baths.',
  'draft'::venue_status,
  'Jamaica',
  'Montego Bay',
  'Ocean Drive, Montego Bay',
  18.4762,
  -77.8939,
  8,
  16,
  1200,
  2000,
  'per_night'::price_code,
  8500,
  5,
  4,
  'https://caribbeansoul.com',
  'https://instagram.com/caribbeansoul',
  'New'::venue_label,
  '<p>Reggae and relaxation in the Caribbean.</p><p>Reggae and relaxation in the Caribbean.</p><p>Reggae and relaxation in the Caribbean.</p>',
  '[
    { "title": "From Airport (MBJ)", "text": "15 min drive from Montego Bay Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Private taxis available in Montego Bay.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Shuttle buses and minivans connect to the villa.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Montego Bay Beach", "distance": "2", "unit": "min", "note": "walk" },
    { "name": "Hip Strip", "distance": "10", "unit": "min", "note": "drive" },
    { "name": "Rose Hall", "distance": "20", "unit": "min", "note": "drive" },
    { "name": "Doctor’s Cave Beach", "distance": "15", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'Caribbean Soul Villa – island vibes meet wellness.',
  null,
  '{"Reggae sound bath","Caribbean meals","Ocean yoga"}'::text [],
  '{"Flights","Alcohol","Spa extras"}'::text []
FROM venue_types vt
WHERE vt.name = 'Villa / Private House'
UNION ALL
-- 38. Patagonia Nature Lodge
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Patagonia Nature Lodge',
  'Remote lodge in Patagonia offering glacier hikes, forest meditations, and eco-living workshops.',
  'published'::venue_status,
  'Chile',
  'Torres del Paine',
  'Patagonia Road, Torres del Paine',
  -51.2530,
  -72.3450,
  12,
  24,
  1000,
  1800,
  'week'::price_code,
  9000,
  7,
  5,
  'https://patagonianature.com',
  'https://instagram.com/patagonianature',
  'Verified'::venue_label,
  '<p>Wilderness retreat in Patagonia.</p><p>Wilderness retreat in Patagonia.</p><p>Wilderness retreat in Patagonia.</p>',
  '[
    { "title": "From Airport (PUQ)", "text": "5h bus ride from Punta Arenas Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Private 4x4 services available.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Local buses connect to Torres del Paine.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Torres Park", "distance": "15", "unit": "min", "note": "drive" },
    { "name": "Grey Glacier", "distance": "2", "unit": "hr", "note": "hike" },
    { "name": "Lake Pehoé", "distance": "25", "unit": "min", "note": "drive" },
    { "name": "Base Las Torres", "distance": "4", "unit": "hr", "note": "hike" }
  ]'::jsonb,
  'Patagonia Nature Lodge – adventure and mindfulness.',
  null,
  '{"Glacier hikes","Forest meditation","Eco workshops"}'::text [],
  '{"Flights","Insurance","Private jeep"}'::text []
FROM venue_types vt
WHERE vt.name = 'Resort'
UNION ALL
-- 39. Sahara Healing Dome
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Sahara Healing Dome',
  'Dome-style eco retreat in Tunisia combining desert yoga, Sufi music, and nomadic traditions.',
  'pending'::venue_status,
  'Tunisia',
  'Tozeur',
  'Sahara Dome Road, Tozeur',
  33.9197,
  8.1335,
  10,
  18,
  800,
  1300,
  'per_person'::price_code,
  6500,
  6,
  4,
  'https://saharahealing.com',
  'https://instagram.com/saharahealing',
  'Popular'::venue_label,
  '<p>Healing under the desert stars.</p><p>Healing under the desert stars.</p><p>Healing under the desert stars.</p>',
  '[
    { "title": "From Airport (TOE)", "text": "30 min drive from Tozeur Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Private drivers available from Tunis.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Camel caravans and 4x4 jeeps available.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Sahara Dunes", "distance": "10", "unit": "min", "note": "walk" },
    { "name": "Tozeur Market", "distance": "15", "unit": "min", "note": "drive" },
    { "name": "Chott el Jerid", "distance": "30", "unit": "min", "note": "drive" },
    { "name": "Sidi Bouhlel Canyon", "distance": "25", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'Sahara Healing Dome – nomadic wellness lifestyle.',
  null,
  '{"Sufi music","Desert yoga","Nomadic meals"}'::text [],
  '{"Flights","Visa","Private 4x4"}'::text []
FROM venue_types vt
WHERE vt.name = 'Eco-lodge / Retreat Camp'
UNION ALL
-- 40. Arctic Light Retreat
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Arctic Light Retreat',
  'Polar circle retreat in Iceland offering hot spring therapy, glacier yoga, and aurora meditation.',
  'published'::venue_status,
  'Iceland',
  'Reykjavik',
  'Aurora Street, Reykjavik',
  64.1355,
  -21.8954,
  8,
  15,
  1400,
  2300,
  'per_night'::price_code,
  9500,
  6,
  4,
  'https://arcticlight.com',
  'https://instagram.com/arcticlight',
  'Verified'::venue_label,
  '<p>Northern healing in Iceland.</p><p>Northern healing in Iceland.</p><p>Northern healing in Iceland.</p>',
  '[
    { "title": "From Airport (KEF)", "text": "45 min drive from Keflavík Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Rental cars available at the airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Shuttles run frequently to Reykjavik center.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Blue Lagoon", "distance": "20", "unit": "min", "note": "drive" },
    { "name": "Hallgrímskirkja", "distance": "10", "unit": "min", "note": "drive" },
    { "name": "Thingvellir Park", "distance": "45", "unit": "min", "note": "drive" },
    { "name": "Northern Lights Spot", "distance": "15", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'Arctic Light Retreat – auroras and hot springs.',
  null,
  '{"Hot spring baths","Glacier yoga","Aurora meditation"}'::text [],
  '{"Flights","Alcohol","Spa extras"}'::text []
FROM venue_types vt
WHERE vt.name = 'Wellness Center'
UNION ALL
-- 41. Riviera Wellness Villa
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Riviera Wellness Villa',
  'Luxury villa on the French Riviera offering detox cuisine, yoga terraces, and private spa rooms.',
  'published'::venue_status,
  'France',
  'Nice',
  'Côte d’Azur, Nice',
  43.7102,
  7.2620,
  10,
  18,
  1800,
  3200,
  'custom'::price_code,
  12000,
  7,
  6,
  'https://rivierawellness.com',
  'https://instagram.com/rivierawellness',
  'Verified'::venue_label,
  '<p>Luxury and wellness in the Riviera.</p><p>Luxury and wellness in the Riviera.</p><p>Luxury and wellness in the Riviera.</p>',
  '[
    { "title": "From Airport (NCE)", "text": "20 min drive from Nice Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Private drivers available.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Trams and buses available in Nice.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Mediterranean Sea", "distance": "5", "unit": "min", "note": "walk" },
    { "name": "Promenade des Anglais", "distance": "10", "unit": "min", "note": "walk" },
    { "name": "Old Town Nice", "distance": "15", "unit": "min", "note": "drive" },
    { "name": "Monaco", "distance": "30", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'Riviera Wellness Villa – French elegance meets wellness.',
  null,
  '{"Detox meals","Private spa","Yoga terrace"}'::text [],
  '{"Flights","Alcohol","Chauffeur"}'::text []
FROM venue_types vt
WHERE vt.name = 'Villa / Private House'
UNION ALL
-- 42. Himalayan River Ashram
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Himalayan River Ashram',
  'Traditional riverside ashram in India with mantra chanting, yoga, and Ayurvedic meals.',
  'draft'::venue_status,
  'India',
  'Haridwar',
  'Ganges Road, Haridwar',
  29.9457,
  78.1642,
  20,
  40,
  700,
  1100,
  'week'::price_code,
  6000,
  10,
  8,
  'https://riverashram.com',
  'https://instagram.com/riverashram',
  'New'::venue_label,
  '<p>Sacred Ganges wellness retreat.</p><p>Sacred Ganges wellness retreat.</p><p>Sacred Ganges wellness retreat.</p>',
  '[
    { "title": "From Airport (DEL)", "text": "3h drive from Delhi Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Taxis and buses available to Haridwar.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Rickshaws available in the area.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Ganges River", "distance": "1", "unit": "min", "note": "walk" },
    { "name": "Har Ki Pauri", "distance": "10", "unit": "min", "note": "drive" },
    { "name": "Chandi Devi Temple", "distance": "20", "unit": "min", "note": "drive" },
    { "name": "Mansa Devi Temple", "distance": "25", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'Himalayan River Ashram – spiritual healing by the river.',
  null,
  '{"Mantra chanting","Ayurvedic meals","Yoga sessions"}'::text [],
  '{"Flights","Insurance"}'::text []
FROM venue_types vt
WHERE vt.name = 'Ashram / Monastery'
UNION ALL
-- 43. Amazon River Camp
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Amazon River Camp',
  'Eco-camp along the Amazon River featuring canoe meditation, jungle survival workshops, and indigenous healing rituals.',
  'published'::venue_status,
  'Brazil',
  'Iquitos',
  'Amazon Riverside, Iquitos',
  -3.7437,
  -73.2516,
  12,
  20,
  750,
  1250,
  'per_person'::price_code,
  5000,
  5,
  3,
  'https://amazonrivercamp.com',
  'https://instagram.com/amazonrivercamp',
  'Popular'::venue_label,
  '<p>Flow with the Amazon river.</p><p>Flow with the Amazon river.</p><p>Flow with the Amazon river.</p>',
  '[
    { "title": "From Airport (IQT)", "text": "2h boat ride from Iquitos Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Transfers available from town.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Canoes and boats connect to villages.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Amazon River", "distance": "0", "unit": "on-site", "note": "on-site" },
    { "name": "Monkey Island", "distance": "30", "unit": "min", "note": "boat" },
    { "name": "Pacaya Reserve", "distance": "1.5", "unit": "hr", "note": "boat" }
  ]'::jsonb,
  'Amazon River Camp – indigenous traditions and eco-living.',
  null,
  '{"Canoe meditation","Survival workshops","Community meals"}'::text [],
  '{"Flights","Insurance"}'::text []
FROM venue_types vt
WHERE vt.name = 'Eco-lodge / Retreat Camp'
UNION ALL
-- 44. Tuscany Harmony Farm
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Tuscany Harmony Farm',
  'Rustic Tuscan farmhouse retreat with vineyard yoga, farm-to-table cuisine, and olive oil healing rituals.',
  'published'::venue_status,
  'Italy',
  'Florence',
  'Vineyard Road, Florence',
  43.7699,
  11.2556,
  15,
  25,
  1300,
  2200,
  'per_night'::price_code,
  8000,
  6,
  5,
  'https://tuscanyharmony.com',
  'https://instagram.com/tuscanyharmony',
  'Verified'::venue_label,
  '<p>Italian countryside wellness.</p><p>Italian countryside wellness.</p><p>Italian countryside wellness.</p>',
  '[
    { "title": "From Airport (FLR)", "text": "1h drive from Florence Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Car rentals available at the airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Regional trains and buses connect to Tuscany.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Tuscan Vineyards", "distance": "0", "unit": "on-site", "note": "on-site" },
    { "name": "Florence Cathedral", "distance": "30", "unit": "min", "note": "drive" },
    { "name": "Ponte Vecchio", "distance": "35", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'Tuscany Harmony Farm – rustic charm meets mindfulness.',
  null,
  '{"Vineyard yoga","Farm cuisine","Olive oil rituals"}'::text [],
  '{"Flights","Wine tours"}'::text []
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 45. Pacific Zen Bungalow
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Pacific Zen Bungalow',
  'Minimalist beach bungalows in Hawaii offering sunrise yoga, surfing meditation, and volcanic hot springs.',
  'pending'::venue_status,
  'USA',
  'Maui',
  'Beach Road, Maui',
  20.7984,
  -156.3319,
  8,
  16,
  1000,
  1700,
  'weekend'::price_code,
  10000,
  5,
  4,
  'https://pacificzen.com',
  'https://instagram.com/pacificzen',
  'New'::venue_label,
  '<p>Pacific serenity in Hawaii.</p><p>Pacific serenity in Hawaii.</p><p>Pacific serenity in Hawaii.</p>',
  '[
    { "title": "From Airport (OGG)", "text": "30 min drive from Maui Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Private car rentals widely available.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Shuttle buses operate to beaches.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Maui Beach", "distance": "2", "unit": "min", "note": "walk" },
    { "name": "Haleakalā Volcano", "distance": "1", "unit": "hr", "note": "drive" },
    { "name": "Lahaina Town", "distance": "40", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'Pacific Zen Bungalow – island wellness with Zen spirit.',
  null,
  '{"Sunrise yoga","Surf meditation","Hot springs"}'::text [],
  '{"Flights","Car rental"}'::text []
FROM venue_types vt
WHERE vt.name = 'Guesthouse / BnB'
UNION ALL
-- 46. Alpine Spirit Chalet
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Alpine Spirit Chalet',
  'Swiss chalet combining alpine skiing with wellness therapies, hot stone massages, and fire meditation.',
  'published'::venue_status,
  'Switzerland',
  'Zermatt',
  'Alpine Road, Zermatt',
  46.0207,
  7.7491,
  12,
  20,
  1600,
  2800,
  'per_night'::price_code,
  12000,
  8,
  6,
  'https://alpinespiritchalet.com',
  'https://instagram.com/alpinespiritchalet',
  'Verified'::venue_label,
  '<p>Ski, spa, and spirit in the Alps.</p><p>Ski, spa, and spirit in the Alps.</p><p>Ski, spa, and spirit in the Alps.</p>',
  '[
    { "title": "From Airport (GVA)", "text": "3h train from Geneva Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Scenic mountain routes available.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Trains and cable cars in Zermatt.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Matterhorn", "distance": "15", "unit": "min", "note": "walk" },
    { "name": "Zermatt Village", "distance": "10", "unit": "min", "note": "walk" },
    { "name": "Gornergrat", "distance": "30", "unit": "min", "note": "train" }
  ]'::jsonb,
  'Alpine Spirit Chalet – adventure meets mindfulness.',
  null,
  '{"Skiing","Spa therapy","Fire meditation"}'::text [],
  '{"Flights","Insurance"}'::text []
FROM venue_types vt
WHERE vt.name = 'Resort'
UNION ALL
-- 47. Savannah Zen Lodge
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Savannah Zen Lodge',
  'Lodge in South Africa combining safari drives with yoga, mindfulness, and indigenous ceremonies.',
  'published'::venue_status,
  'South Africa',
  'Kruger',
  'Safari Road, Kruger Park',
  -23.9884,
  31.5547,
  14,
  28,
  1200,
  2000,
  'week'::price_code,
  9000,
  7,
  5,
  'https://savannahzen.com',
  'https://instagram.com/savannahzen',
  'Popular'::venue_label,
  '<p>Safari and stillness in Kruger.</p><p>Safari and stillness in Kruger.</p><p>Safari and stillness in Kruger.</p>',
  '[
    { "title": "From Airport (MQP)", "text": "1h drive from Kruger Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Private safari transfers available.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Jeep safaris on-site.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Kruger Safari", "distance": "0", "unit": "on-site", "note": "on-site" },
    { "name": "Sabie River", "distance": "15", "unit": "min", "note": "drive" },
    { "name": "Elephant Plains", "distance": "30", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'Savannah Zen Lodge – wild wellness.',
  null,
  '{"Safari yoga","Indigenous rituals","Organic meals"}'::text [],
  '{"Flights","Insurance"}'::text []
FROM venue_types vt
WHERE vt.name = 'Eco-lodge / Retreat Camp'
UNION ALL
-- 48. Baltic Light Center
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Baltic Light Center',
  'Nordic retreat in Latvia offering sound healing, sauna therapy, and seaside meditation.',
  'draft'::venue_status,
  'Latvia',
  'Riga',
  'Seaside Path, Riga',
  56.9496,
  24.1052,
  10,
  18,
  900,
  1500,
  'per_person'::price_code,
  7000,
  6,
  4,
  'https://balticlight.com',
  'https://instagram.com/balticlight',
  'New'::venue_label,
  '<p>Find peace by the Baltic Sea.</p><p>Find peace by the Baltic Sea.</p><p>Find peace by the Baltic Sea.</p>',
  '[
    { "title": "From Airport (RIX)", "text": "30 min drive from Riga Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Car rentals and buses available.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Trams connect city to seaside.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Baltic Sea", "distance": "3", "unit": "min", "note": "walk" },
    { "name": "Old Town Riga", "distance": "20", "unit": "min", "note": "drive" },
    { "name": "Riga Central Market", "distance": "25", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'Baltic Light Center – sound and sea healing.',
  null,
  '{"Sound healing","Sauna","Meditation"}'::text [],
  '{"Flights","Alcohol"}'::text []
FROM venue_types vt
WHERE vt.name = 'Wellness Center'
UNION ALL
-- 49. Andes Crystal Retreat
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Andes Crystal Retreat',
  'Peruvian retreat specializing in crystal healing, shamanic rituals, and mountain meditation.',
  'pending'::venue_status,
  'Peru',
  'Sacred Valley',
  'Crystal Road, Sacred Valley',
  -13.3167,
  -72.1167,
  12,
  22,
  1100,
  1900,
  'custom'::price_code,
  8200,
  7,
  5,
  'https://andescrystal.com',
  'https://instagram.com/andescrystal',
  'Verified'::venue_label,
  '<p>Crystals and Andes energy.</p><p>Crystals and Andes energy.</p><p>Crystals and Andes energy.</p>',
  '[
    { "title": "From Airport (CUZ)", "text": "2h drive from Cusco Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Taxis and vans available to Sacred Valley.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Collectivos available in the valley.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Sacred Valley", "distance": "0", "unit": "on-site", "note": "on-site" },
    { "name": "Pisac Ruins", "distance": "45", "unit": "min", "note": "drive" },
    { "name": "Ollantaytambo", "distance": "1", "unit": "hr", "note": "drive" }
  ]'::jsonb,
  'Andes Crystal Retreat – shamanic wisdom and healing.',
  null,
  '{"Crystal therapy","Mountain meditation","Shamanic rituals"}'::text [],
  '{"Flights","Insurance"}'::text []
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 50. Pacific Healing Haven
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Pacific Healing Haven',
  'Oceanfront sanctuary in Fiji offering water ceremonies, coral reef meditations, and island detox cuisine.',
  'published'::venue_status,
  'Fiji',
  'Nadi',
  'Coral Coast Road, Nadi',
  -17.7775,
  177.4350,
  10,
  18,
  1400,
  2500,
  'per_night'::price_code,
  9500,
  6,
  4,
  'https://pacifichealing.com',
  'https://instagram.com/pacifichealing',
  'Popular'::venue_label,
  '<p>Pacific healing traditions in Fiji.</p><p>Pacific healing traditions in Fiji.</p><p>Pacific healing traditions in Fiji.</p>',
  '[
    { "title": "From Airport (NAN)", "text": "1h drive from Nadi Airport.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "By Car or Taxi", "text": "Private vans and taxis available.", "note": "Free secure parking available • Electric vehicle charging station on-site" },
    { "title": "Local Transport", "text": "Island ferries connect to nearby spots.", "note": "Free secure parking available • Electric vehicle charging station on-site" }
  ]'::jsonb,
  '[
    { "name": "Coral Coast", "distance": "0", "unit": "on-site", "note": "on-site" },
    { "name": "Mamanuca Islands", "distance": "1", "unit": "hr", "note": "boat" },
    { "name": "Garden of the Sleeping Giant", "distance": "30", "unit": "min", "note": "drive" }
  ]'::jsonb,
  'Pacific Healing Haven – island spirit and wellness.',
  null,
  '{"Coral meditation","Island detox","Water ceremonies"}'::text [],
  '{"Flights","Alcohol"}'::text []
FROM venue_types vt
WHERE vt.name = 'Resort';
-- Insert sample favorites (linking clients to venues dynamically by title)
INSERT INTO favorites (user_id, venue_id, created_at)
SELECT '11111111-1111-1111-1111-111111111111'::uuid,
  v.id,
  NOW()
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat'
UNION ALL
SELECT '11111111-1111-1111-1111-111111111111'::uuid,
  v.id,
  NOW()
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge'
UNION ALL
SELECT '55555555-5555-5555-5555-555555555555'::uuid,
  v.id,
  NOW()
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT '55555555-5555-5555-5555-555555555555'::uuid,
  v.id,
  NOW()
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary'
UNION ALL
SELECT '11111111-1111-1111-1111-111111111111'::uuid,
  v.id,
  NOW()
FROM venues v
WHERE v.title = 'Mediterranean Wellness Villa';
-- Insert sample food & dining options for venues
INSERT INTO food_dining (
    venue_id,
    meal_type,
    diet_options,
    description
  )
SELECT v.id,
  'Vegetarian',
  ARRAY ['Vegetarian','Vegan','Gluten-free'],
  'Healthy plant-based meals with locally sourced ingredients.'
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'Vegan',
  ARRAY ['Vegan','Raw','Organic'],
  'Delicious vegan meals made from organic produce.'
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'Gluten-Free',
  ARRAY ['Gluten-free','Dairy-free'],
  'Gluten-free options for sensitive diets.'
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'Ayurvedic',
  ARRAY ['Ayurvedic','Vegetarian'],
  'Balanced ayurvedic-inspired meals supporting wellness.'
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'International',
  ARRAY ['Vegetarian','Non-Vegetarian'],
  'A mix of international and local cuisine.'
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'Vegetarian',
  ARRAY ['Vegetarian','Vegan','Gluten-free'],
  'Fresh Mediterranean vegetarian meals.'
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'Vegan',
  ARRAY ['Vegan','Raw'],
  'Creative vegan dishes with Mediterranean flavors.'
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'Seafood',
  ARRAY ['Pescatarian'],
  'Locally caught seafood prepared with wellness in mind.'
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'Gluten-Free',
  ARRAY ['Gluten-free','Dairy-free'],
  'Mediterranean gluten-free options available.'
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'International',
  ARRAY ['Vegetarian','Non-Vegetarian'],
  'Fusion of global and coastal cuisines.'
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'Vegetarian',
  ARRAY ['Vegetarian','Vegan'],
  'Andean-inspired vegetarian meals with quinoa and legumes.'
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  'Vegan',
  ARRAY ['Vegan','Organic'],
  'Plant-based meals with native Andean ingredients.'
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  'Gluten-Free',
  ARRAY ['Gluten-free'],
  'Gluten-free meals with traditional corn and potato dishes.'
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  'Ayurvedic',
  ARRAY ['Ayurvedic'],
  'Meals infused with ayurvedic spices for balance.'
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  'International',
  ARRAY ['Vegetarian','Non-Vegetarian'],
  'Mix of local Andean and international dishes.'
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  'Vegetarian',
  ARRAY ['Vegetarian','Vegan'],
  'Light vegetarian meals perfect for high-altitude living.'
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'Vegan',
  ARRAY ['Vegan','Gluten-free'],
  'High-energy vegan meals for mountain retreats.'
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'Gluten-Free',
  ARRAY ['Gluten-free'],
  'Special gluten-free meals for sensitive guests.'
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'Ayurvedic',
  ARRAY ['Ayurvedic'],
  'Holistic ayurvedic-inspired meals with herbal teas.'
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'International',
  ARRAY ['Vegetarian','Non-Vegetarian'],
  'Blend of mountain cuisine and global dishes.'
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'Vegetarian',
  ARRAY ['Vegetarian','Vegan'],
  'Organic vegetarian meals sourced from the forest garden.'
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'Vegan',
  ARRAY ['Vegan','Raw'],
  'Raw and cooked vegan meals prepared daily.'
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'Gluten-Free',
  ARRAY ['Gluten-free'],
  'Gluten-free options with forest-foraged ingredients.'
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'Ayurvedic',
  ARRAY ['Ayurvedic'],
  'Wholesome ayurvedic dishes promoting balance and harmony.'
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'International',
  ARRAY ['Vegetarian','Non-Vegetarian'],
  'International cuisine with forest-inspired flavors.'
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'Vegetarian',
  ARRAY ['Vegetarian', 'Vegan', 'Gluten-free'],
  'Healthy plant-based meals with locally sourced ingredients.'
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'Organic',
  ARRAY ['Vegetarian', 'Vegan'],
  'Farm-to-table dining experience with seasonal organic produce.'
FROM venues v
WHERE v.title = 'Mountain View Sanctuary'
UNION ALL
SELECT v.id,
  'Seafood',
  ARRAY ['Vegetarian', 'Vegan'],
  'Freshly caught seafood dishes inspired by Mayan traditions.'
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat'
UNION ALL
SELECT v.id,
  'Gourmet',
  ARRAY ['Vegetarian', 'Vegan', 'Gluten-free'],
  'Five-course gourmet dinners with a focus on French alpine cuisine.'
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge'
UNION ALL
SELECT v.id,
  'Traditional',
  ARRAY ['Vegan'],
  'Authentic Peruvian cuisine infused with ancient Incan flavors.'
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary';
-- Insert sample photos for venues (5 per venue)
-- 1. Serenity Hills Retreat
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Serenity Hills Retreat - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Serenity Hills Retreat - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Serenity Hills Retreat - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Serenity Hills Retreat - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Serenity Hills Retreat - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Serenity Hills Retreat - View 6',
  'Luxurious tropical wellness facilities with natural materials',
  6
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Serenity Hills Retreat - View 7',
  'Luxurious tropical wellness facilities with natural materials',
  7
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Serenity Hills Retreat - View 8',
  'Luxurious tropical wellness facilities with natural materials',
  8
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Serenity Hills Retreat - View 9',
  'Luxurious tropical wellness facilities with natural materials',
  9
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Serenity Hills Retreat - View 10',
  'Luxurious tropical wellness facilities with natural materials',
  10
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-11.avif',
  'Serenity Hills Retreat - View 11',
  'Luxurious tropical wellness facilities with natural materials',
  11
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-12.avif',
  'Serenity Hills Retreat - View 12',
  'Luxurious tropical wellness facilities with natural materials',
  12
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-13.avif',
  'Serenity Hills Retreat - View 13',
  'Luxurious tropical wellness facilities with natural materials',
  13
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-14.avif',
  'Serenity Hills Retreat - View 14',
  'Luxurious tropical wellness facilities with natural materials',
  14
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-15.avif',
  'Serenity Hills Retreat - View 15',
  'Luxurious tropical wellness facilities with natural materials',
  15
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-16.avif',
  'Serenity Hills Retreat - View 16',
  'Luxurious tropical wellness facilities with natural materials',
  16
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-17.avif',
  'Serenity Hills Retreat - View 17',
  'Luxurious tropical wellness facilities with natural materials',
  17
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-18.avif',
  'Serenity Hills Retreat - View 18',
  'Luxurious tropical wellness facilities with natural materials',
  18
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-19.avif',
  'Serenity Hills Retreat - View 19',
  'Luxurious tropical wellness facilities with natural materials',
  19
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-20.avif',
  'Serenity Hills Retreat - View 20',
  'Luxurious tropical wellness facilities with natural materials',
  20
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-21.avif',
  'Serenity Hills Retreat - View 21',
  'Luxurious tropical wellness facilities with natural materials',
  21
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-22.avif',
  'Serenity Hills Retreat - View 22',
  'Luxurious tropical wellness facilities with natural materials',
  22
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-23.avif',
  'Serenity Hills Retreat - View 23',
  'Luxurious tropical wellness facilities with natural materials',
  23
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-24.avif',
  'Serenity Hills Retreat - View 24',
  'Luxurious tropical wellness facilities with natural materials',
  24
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-25.avif',
  'Serenity Hills Retreat - View 25',
  'Luxurious tropical wellness facilities with natural materials',
  25
FROM venues v
WHERE v.title = 'Serenity Hills Retreat';
-- 2. Mountain View Sanctuary
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Mountain View Sanctuary - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Mountain View Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Mountain View Sanctuary - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Mountain View Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Mountain View Sanctuary - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Mountain View Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Mountain View Sanctuary - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Mountain View Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Mountain View Sanctuary - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Mountain View Sanctuary';
-- 3. Ocean Bliss Retreat
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Ocean Bliss Retreat - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Ocean Bliss Retreat - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Ocean Bliss Retreat - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Ocean Bliss Retreat - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Ocean Bliss Retreat - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat';
-- 4. Sahara Moon Lodge
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Sahara Moon Lodge - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Sahara Moon Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Sahara Moon Lodge - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Sahara Moon Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Sahara Moon Lodge - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Sahara Moon Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Sahara Moon Lodge - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Sahara Moon Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Sahara Moon Lodge - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Sahara Moon Lodge';
-- 5. Alpine Wellness Lodge
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Alpine Wellness Lodge - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Alpine Wellness Lodge - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Alpine Wellness Lodge - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Alpine Wellness Lodge - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Alpine Wellness Lodge - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge';
-- 6. Sacred Valley Sanctuary
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Sacred Valley Sanctuary - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Sacred Valley Sanctuary - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Sacred Valley Sanctuary - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Sacred Valley Sanctuary - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Sacred Valley Sanctuary - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary';
-- 7. Mindful Mountain Retreat
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Mindful Mountain Retreat - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Mindful Mountain Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Mindful Mountain Retreat - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Mindful Mountain Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Mindful Mountain Retreat - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Mindful Mountain Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Mindful Mountain Retreat - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Mindful Mountain Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Mindful Mountain Retreat - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Mindful Mountain Retreat';
-- 8. Coastal Zen Retreat
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Coastal Zen Retreat - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Coastal Zen Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Coastal Zen Retreat - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Coastal Zen Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Coastal Zen Retreat - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Coastal Zen Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Coastal Zen Retreat - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Coastal Zen Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Coastal Zen Retreat - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Coastal Zen Retreat';
-- 9. Desert Oasis Center
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Desert Oasis Center - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Desert Oasis Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Desert Oasis Center - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Desert Oasis Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Desert Oasis Center - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Desert Oasis Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Desert Oasis Center - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Desert Oasis Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Desert Oasis Center - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Desert Oasis Center';
-- 10. Forest Healing Lodge
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Forest Healing Lodge - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Forest Healing Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Forest Healing Lodge - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Forest Healing Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Forest Healing Lodge - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Forest Healing Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Forest Healing Lodge - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Forest Healing Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Forest Healing Lodge - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Forest Healing Lodge';
-- 11. Island Paradise Retreat
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Island Paradise Retreat - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Island Paradise Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Island Paradise Retreat - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Island Paradise Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Island Paradise Retreat - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Island Paradise Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Island Paradise Retreat - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Island Paradise Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Island Paradise Retreat - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Island Paradise Retreat';
-- 12. Himalayan Bliss Center
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Himalayan Bliss Center - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Himalayan Bliss Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Himalayan Bliss Center - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Himalayan Bliss Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Himalayan Bliss Center - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Himalayan Bliss Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Himalayan Bliss Center - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Himalayan Bliss Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Himalayan Bliss Center - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Himalayan Bliss Center';
-- 13. Mediterranean Wellness Villa
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Mediterranean Wellness Villa - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Mediterranean Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Mediterranean Wellness Villa - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Mediterranean Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Mediterranean Wellness Villa - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Mediterranean Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Mediterranean Wellness Villa - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Mediterranean Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Mediterranean Wellness Villa - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Mediterranean Wellness Villa';
-- 14. Zen Garden Retreat
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Zen Garden Retreat - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Zen Garden Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Zen Garden Retreat - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Zen Garden Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Zen Garden Retreat - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Zen Garden Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Zen Garden Retreat - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Zen Garden Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Zen Garden Retreat - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Zen Garden Retreat';
-- 15. Tropical Healing Center
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Tropical Healing Center - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Tropical Healing Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Tropical Healing Center - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Tropical Healing Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Tropical Healing Center - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Tropical Healing Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Tropical Healing Center - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Tropical Healing Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Tropical Healing Center - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Tropical Healing Center';
-- 16. Arctic Wellness Lodge
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Arctic Wellness Lodge - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Arctic Wellness Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Arctic Wellness Lodge - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Arctic Wellness Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Arctic Wellness Lodge - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Arctic Wellness Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Arctic Wellness Lodge - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Arctic Wellness Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Arctic Wellness Lodge - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Arctic Wellness Lodge';
-- 17. Desert Rose Sanctuary
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Desert Rose Sanctuary - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Desert Rose Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Desert Rose Sanctuary - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Desert Rose Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Desert Rose Sanctuary - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Desert Rose Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Desert Rose Sanctuary - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Desert Rose Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Desert Rose Sanctuary - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Desert Rose Sanctuary';
-- 18. Mountain Spirit Lodge
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Mountain Spirit Lodge - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Mountain Spirit Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Mountain Spirit Lodge - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Mountain Spirit Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Mountain Spirit Lodge - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Mountain Spirit Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Mountain Spirit Lodge - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Mountain Spirit Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Mountain Spirit Lodge - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Mountain Spirit Lodge';
-- 19. Ocean Spirit Center
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Ocean Spirit Center - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Ocean Spirit Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Ocean Spirit Center - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Ocean Spirit Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Ocean Spirit Center - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Ocean Spirit Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Ocean Spirit Center - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Ocean Spirit Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Ocean Spirit Center - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Ocean Spirit Center';
-- 20. Forest Wisdom Retreat
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Forest Wisdom Retreat - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Forest Wisdom Retreat - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Forest Wisdom Retreat - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Forest Wisdom Retreat - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Forest Wisdom Retreat - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Forest Wisdom Retreat - View 6',
  'Luxurious tropical wellness facilities with natural materials',
  6
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Forest Wisdom Retreat - View 7',
  'Luxurious tropical wellness facilities with natural materials',
  7
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Forest Wisdom Retreat - View 8',
  'Luxurious tropical wellness facilities with natural materials',
  8
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Forest Wisdom Retreat - View 9',
  'Luxurious tropical wellness facilities with natural materials',
  9
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Forest Wisdom Retreat - View 10',
  'Luxurious tropical wellness facilities with natural materials',
  10
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-11.avif',
  'Forest Wisdom Retreat - View 11',
  'Luxurious tropical wellness facilities with natural materials',
  11
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-12.avif',
  'Forest Wisdom Retreat - View 12',
  'Luxurious tropical wellness facilities with natural materials',
  12
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-13.avif',
  'Forest Wisdom Retreat - View 13',
  'Luxurious tropical wellness facilities with natural materials',
  13
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-14.avif',
  'Forest Wisdom Retreat - View 14',
  'Luxurious tropical wellness facilities with natural materials',
  14
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-15.avif',
  'Forest Wisdom Retreat - View 15',
  'Luxurious tropical wellness facilities with natural materials',
  15
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-16.avif',
  'Forest Wisdom Retreat - View 16',
  'Luxurious tropical wellness facilities with natural materials',
  16
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-17.avif',
  'Forest Wisdom Retreat - View 17',
  'Luxurious tropical wellness facilities with natural materials',
  17
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-18.avif',
  'Forest Wisdom Retreat - View 18',
  'Luxurious tropical wellness facilities with natural materials',
  18
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-19.avif',
  'Forest Wisdom Retreat - View 19',
  'Luxurious tropical wellness facilities with natural materials',
  19
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-20.avif',
  'Forest Wisdom Retreat - View 20',
  'Luxurious tropical wellness facilities with natural materials',
  20
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-21.avif',
  'Forest Wisdom Retreat - View 21',
  'Luxurious tropical wellness facilities with natural materials',
  21
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-22.avif',
  'Forest Wisdom Retreat - View 22',
  'Luxurious tropical wellness facilities with natural materials',
  22
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-23.avif',
  'Forest Wisdom Retreat - View 23',
  'Luxurious tropical wellness facilities with natural materials',
  23
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-24.avif',
  'Forest Wisdom Retreat - View 24',
  'Luxurious tropical wellness facilities with natural materials',
  24
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-25.avif',
  'Forest Wisdom Retreat - View 25',
  'Luxurious tropical wellness facilities with natural materials',
  25
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat';
-- 21. Baltic Serenity Spa
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Baltic Serenity Spa - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Baltic Serenity Spa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Baltic Serenity Spa - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Baltic Serenity Spa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Baltic Serenity Spa - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Baltic Serenity Spa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Baltic Serenity Spa - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Baltic Serenity Spa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Baltic Serenity Spa - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Baltic Serenity Spa';
-- 22. Sky High Sanctuary
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Sky High Sanctuary - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Sky High Sanctuary - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Sky High Sanctuary - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Sky High Sanctuary - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Sky High Sanctuary - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Sky High Sanctuary - View 6',
  'Luxurious tropical wellness facilities with natural materials',
  6
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Sky High Sanctuary - View 7',
  'Luxurious tropical wellness facilities with natural materials',
  7
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Sky High Sanctuary - View 8',
  'Luxurious tropical wellness facilities with natural materials',
  8
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Sky High Sanctuary - View 9',
  'Luxurious tropical wellness facilities with natural materials',
  9
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Sky High Sanctuary - View 10',
  'Luxurious tropical wellness facilities with natural materials',
  10
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-11.avif',
  'Sky High Sanctuary - View 11',
  'Luxurious tropical wellness facilities with natural materials',
  11
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-12.avif',
  'Sky High Sanctuary - View 12',
  'Luxurious tropical wellness facilities with natural materials',
  12
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-13.avif',
  'Sky High Sanctuary - View 13',
  'Luxurious tropical wellness facilities with natural materials',
  13
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-14.avif',
  'Sky High Sanctuary - View 14',
  'Luxurious tropical wellness facilities with natural materials',
  14
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-15.avif',
  'Sky High Sanctuary - View 15',
  'Luxurious tropical wellness facilities with natural materials',
  15
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-16.avif',
  'Sky High Sanctuary - View 16',
  'Luxurious tropical wellness facilities with natural materials',
  16
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-17.avif',
  'Sky High Sanctuary - View 17',
  'Luxurious tropical wellness facilities with natural materials',
  17
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-18.avif',
  'Sky High Sanctuary - View 18',
  'Luxurious tropical wellness facilities with natural materials',
  18
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-19.avif',
  'Sky High Sanctuary - View 19',
  'Luxurious tropical wellness facilities with natural materials',
  19
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-20.avif',
  'Sky High Sanctuary - View 20',
  'Luxurious tropical wellness facilities with natural materials',
  20
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-21.avif',
  'Sky High Sanctuary - View 21',
  'Luxurious tropical wellness facilities with natural materials',
  21
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-22.avif',
  'Sky High Sanctuary - View 22',
  'Luxurious tropical wellness facilities with natural materials',
  22
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-23.avif',
  'Sky High Sanctuary - View 23',
  'Luxurious tropical wellness facilities with natural materials',
  23
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-24.avif',
  'Sky High Sanctuary - View 24',
  'Luxurious tropical wellness facilities with natural materials',
  24
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-25.avif',
  'Sky High Sanctuary - View 25',
  'Luxurious tropical wellness facilities with natural materials',
  25
FROM venues v
WHERE v.title = 'Sky High Sanctuary';
-- 23. Valley of Peace
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Valley of Peace - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Valley of Peace'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Valley of Peace - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Valley of Peace'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Valley of Peace - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Valley of Peace'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Valley of Peace - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Valley of Peace'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Valley of Peace - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Valley of Peace';
-- 24. Crystal Healing Center
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Crystal Healing Center - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Crystal Healing Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Crystal Healing Center - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Crystal Healing Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Crystal Healing Center - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Crystal Healing Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Crystal Healing Center - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Crystal Healing Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Crystal Healing Center - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Crystal Healing Center';
-- 25. Sunrise Wellness Resort
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Sunrise Wellness Resort - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Sunrise Wellness Resort'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Sunrise Wellness Resort - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Sunrise Wellness Resort'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Sunrise Wellness Resort - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Sunrise Wellness Resort'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Sunrise Wellness Resort - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Sunrise Wellness Resort'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Sunrise Wellness Resort - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Sunrise Wellness Resort';
-- 26. Alpine Zen Hut
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Alpine Zen Hut - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Alpine Zen Hut'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Alpine Zen Hut - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Alpine Zen Hut'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Alpine Zen Hut - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Alpine Zen Hut'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Alpine Zen Hut - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Alpine Zen Hut'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Alpine Zen Hut - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Alpine Zen Hut';
-- 27. Sacred Mountain Lodge
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Sacred Mountain Lodge - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Sacred Mountain Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Sacred Mountain Lodge - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Sacred Mountain Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Sacred Mountain Lodge - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Sacred Mountain Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Sacred Mountain Lodge - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Sacred Mountain Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Sacred Mountain Lodge - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Sacred Mountain Lodge';
-- 28. Eternal Spring Center
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Eternal Spring Center - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Eternal Spring Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Eternal Spring Center - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Eternal Spring Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Eternal Spring Center - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Eternal Spring Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Eternal Spring Center - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Eternal Spring Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Eternal Spring Center - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Eternal Spring Center';
-- 29. Rainforest Harmony Lodge
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Rainforest Harmony Lodge - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Rainforest Harmony Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Rainforest Harmony Lodge - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Rainforest Harmony Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Rainforest Harmony Lodge - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Rainforest Harmony Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Rainforest Harmony Lodge - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Rainforest Harmony Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Rainforest Harmony Lodge - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Rainforest Harmony Lodge';
-- 30. Nordic Aurora Retreat
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Nordic Aurora Retreat - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Nordic Aurora Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Nordic Aurora Retreat - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Nordic Aurora Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Nordic Aurora Retreat - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Nordic Aurora Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Nordic Aurora Retreat - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Nordic Aurora Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Nordic Aurora Retreat - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Nordic Aurora Retreat';
-- 31. Savannah Spirit Camp
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Savannah Spirit Camp - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Savannah Spirit Camp'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Savannah Spirit Camp - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Savannah Spirit Camp'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Savannah Spirit Camp - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Savannah Spirit Camp'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Savannah Spirit Camp - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Savannah Spirit Camp'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Savannah Spirit Camp - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Savannah Spirit Camp';
-- 32. Himalayan Zen Ashram
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Himalayan Zen Ashram - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Himalayan Zen Ashram'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Himalayan Zen Ashram - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Himalayan Zen Ashram'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Himalayan Zen Ashram - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Himalayan Zen Ashram'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Himalayan Zen Ashram - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Himalayan Zen Ashram'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Himalayan Zen Ashram - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Himalayan Zen Ashram';
-- 33. Mediterranean Bliss Villa
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Mediterranean Bliss Villa - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Mediterranean Bliss Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Mediterranean Bliss Villa - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Mediterranean Bliss Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Mediterranean Bliss Villa - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Mediterranean Bliss Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Mediterranean Bliss Villa - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Mediterranean Bliss Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Mediterranean Bliss Villa - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Mediterranean Bliss Villa';
-- 34. Andes Soul Retreat
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Andes Soul Retreat - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Andes Soul Retreat - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Andes Soul Retreat - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Andes Soul Retreat - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Andes Soul Retreat - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-11.avif',
  'Andes Soul Retreat - View 6',
  'Luxurious tropical wellness facilities with natural materials',
  6
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-12.avif',
  'Andes Soul Retreat - View 7',
  'Luxurious tropical wellness facilities with natural materials',
  7
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-13.avif',
  'Andes Soul Retreat - View 8',
  'Luxurious tropical wellness facilities with natural materials',
  8
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-14.avif',
  'Andes Soul Retreat - View 9',
  'Luxurious tropical wellness facilities with natural materials',
  9
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-15.avif',
  'Andes Soul Retreat - View 10',
  'Luxurious tropical wellness facilities with natural materials',
  10
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-16.avif',
  'Andes Soul Retreat - View 11',
  'Luxurious tropical wellness facilities with natural materials',
  11
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-17.avif',
  'Andes Soul Retreat - View 12',
  'Luxurious tropical wellness facilities with natural materials',
  12
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-18.avif',
  'Andes Soul Retreat - View 13',
  'Luxurious tropical wellness facilities with natural materials',
  13
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-19.avif',
  'Andes Soul Retreat - View 14',
  'Luxurious tropical wellness facilities with natural materials',
  14
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-20.avif',
  'Andes Soul Retreat - View 15',
  'Luxurious tropical wellness facilities with natural materials',
  15
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-21.avif',
  'Andes Soul Retreat - View 16',
  'Luxurious tropical wellness facilities with natural materials',
  16
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-22.avif',
  'Andes Soul Retreat - View 17',
  'Luxurious tropical wellness facilities with natural materials',
  17
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-23.avif',
  'Andes Soul Retreat - View 18',
  'Luxurious tropical wellness facilities with natural materials',
  18
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-24.avif',
  'Andes Soul Retreat - View 19',
  'Luxurious tropical wellness facilities with natural materials',
  19
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-25.avif',
  'Andes Soul Retreat - View 20',
  'Luxurious tropical wellness facilities with natural materials',
  20
FROM venues v
WHERE v.title = 'Andes Soul Retreat';
-- 35. Island Spirit Eco-Lodge
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Island Spirit Eco-Lodge - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Island Spirit Eco-Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Island Spirit Eco-Lodge - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Island Spirit Eco-Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Island Spirit Eco-Lodge - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Island Spirit Eco-Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Island Spirit Eco-Lodge - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Island Spirit Eco-Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Island Spirit Eco-Lodge - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Island Spirit Eco-Lodge';
-- 36. Kyoto Zen House
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Kyoto Zen House - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Kyoto Zen House'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Kyoto Zen House - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Kyoto Zen House'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Kyoto Zen House - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Kyoto Zen House'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Kyoto Zen House - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Kyoto Zen House'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Kyoto Zen House - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Kyoto Zen House';
-- 37. Caribbean Soul Villa
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Caribbean Soul Villa - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Caribbean Soul Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Caribbean Soul Villa - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Caribbean Soul Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Caribbean Soul Villa - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Caribbean Soul Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Caribbean Soul Villa - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Caribbean Soul Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Caribbean Soul Villa - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Caribbean Soul Villa';
-- 38. Patagonia Nature Lodge
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Patagonia Nature Lodge - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Patagonia Nature Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Patagonia Nature Lodge - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Patagonia Nature Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Patagonia Nature Lodge - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Patagonia Nature Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Patagonia Nature Lodge - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Patagonia Nature Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Patagonia Nature Lodge - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Patagonia Nature Lodge';
-- 39. Sahara Healing Dome
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Sahara Healing Dome - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Sahara Healing Dome'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Sahara Healing Dome - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Sahara Healing Dome'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Sahara Healing Dome - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Sahara Healing Dome'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Sahara Healing Dome - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Sahara Healing Dome'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Sahara Healing Dome - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Sahara Healing Dome';
-- 40. Arctic Light Retreat
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Arctic Light Retreat - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Arctic Light Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Arctic Light Retreat - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Arctic Light Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Arctic Light Retreat - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Arctic Light Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Arctic Light Retreat - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Arctic Light Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Arctic Light Retreat - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Arctic Light Retreat';
-- 41. Riviera Wellness Villa
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Riviera Wellness Villa - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Riviera Wellness Villa - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Riviera Wellness Villa - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Riviera Wellness Villa - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Riviera Wellness Villa - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-11.avif',
  'Riviera Wellness Villa - View 6',
  'Luxurious tropical wellness facilities with natural materials',
  6
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-12.avif',
  'Riviera Wellness Villa - View 7',
  'Luxurious tropical wellness facilities with natural materials',
  7
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-13.avif',
  'Riviera Wellness Villa - View 8',
  'Luxurious tropical wellness facilities with natural materials',
  8
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-14.avif',
  'Riviera Wellness Villa - View 9',
  'Luxurious tropical wellness facilities with natural materials',
  9
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-15.avif',
  'Riviera Wellness Villa - View 10',
  'Luxurious tropical wellness facilities with natural materials',
  10
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-16.avif',
  'Riviera Wellness Villa - View 11',
  'Luxurious tropical wellness facilities with natural materials',
  11
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-17.avif',
  'Riviera Wellness Villa - View 12',
  'Luxurious tropical wellness facilities with natural materials',
  12
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-18.avif',
  'Riviera Wellness Villa - View 13',
  'Luxurious tropical wellness facilities with natural materials',
  13
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-19.avif',
  'Riviera Wellness Villa - View 14',
  'Luxurious tropical wellness facilities with natural materials',
  14
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-20.avif',
  'Riviera Wellness Villa - View 15',
  'Luxurious tropical wellness facilities with natural materials',
  15
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-11.avif',
  'Riviera Wellness Villa - View 16',
  'Luxurious tropical wellness facilities with natural materials',
  16
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-11.avif',
  'Riviera Wellness Villa - View 17',
  'Luxurious tropical wellness facilities with natural materials',
  17
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-12.avif',
  'Riviera Wellness Villa - View 18',
  'Luxurious tropical wellness facilities with natural materials',
  18
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-13.avif',
  'Riviera Wellness Villa - View 19',
  'Luxurious tropical wellness facilities with natural materials',
  19
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-14.avif',
  'Riviera Wellness Villa - View 20',
  'Luxurious tropical wellness facilities with natural materials',
  20
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-15.avif',
  'Riviera Wellness Villa - View 21',
  'Luxurious tropical wellness facilities with natural materials',
  21
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-16.avif',
  'Riviera Wellness Villa - View 22',
  'Luxurious tropical wellness facilities with natural materials',
  22
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-17.avif',
  'Riviera Wellness Villa - View 23',
  'Luxurious tropical wellness facilities with natural materials',
  23
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-18.avif',
  'Riviera Wellness Villa - View 24',
  'Luxurious tropical wellness facilities with natural materials',
  24
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-19.avif',
  'Riviera Wellness Villa - View 25',
  'Luxurious tropical wellness facilities with natural materials',
  25
FROM venues v
WHERE v.title = 'Riviera Wellness Villa';
-- 42. Himalayan River Ashram
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Himalayan River Ashram - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Himalayan River Ashram'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Himalayan River Ashram - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Himalayan River Ashram'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Himalayan River Ashram - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Himalayan River Ashram'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Himalayan River Ashram - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Himalayan River Ashram'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Himalayan River Ashram - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Himalayan River Ashram';
-- 43. Amazon River Camp
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Amazon River Camp - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Amazon River Camp'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Amazon River Camp - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Amazon River Camp'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Amazon River Camp - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Amazon River Camp'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Amazon River Camp - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Amazon River Camp'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Amazon River Camp - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Amazon River Camp';
-- 44. Tuscany Harmony Farm
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Tuscany Harmony Farm - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Tuscany Harmony Farm'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Tuscany Harmony Farm - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Tuscany Harmony Farm'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Tuscany Harmony Farm - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Tuscany Harmony Farm'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Tuscany Harmony Farm - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Tuscany Harmony Farm'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Tuscany Harmony Farm - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Tuscany Harmony Farm';
-- 45. Pacific Zen Bungalow
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Pacific Zen Bungalow - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Pacific Zen Bungalow'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Pacific Zen Bungalow - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Pacific Zen Bungalow'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Pacific Zen Bungalow - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Pacific Zen Bungalow'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Pacific Zen Bungalow - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Pacific Zen Bungalow'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Pacific Zen Bungalow - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Pacific Zen Bungalow';
-- 46. Alpine Spirit Chalet
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Alpine Spirit Chalet - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Alpine Spirit Chalet'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Alpine Spirit Chalet - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Alpine Spirit Chalet'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Alpine Spirit Chalet - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Alpine Spirit Chalet'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Alpine Spirit Chalet - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Alpine Spirit Chalet'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Alpine Spirit Chalet - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Alpine Spirit Chalet';
-- 47. Savannah Zen Lodge
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Savannah Zen Lodge - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Savannah Zen Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Savannah Zen Lodge - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Savannah Zen Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Savannah Zen Lodge - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Savannah Zen Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Savannah Zen Lodge - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Savannah Zen Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Savannah Zen Lodge - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Savannah Zen Lodge';
-- 48. Baltic Light Center
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Baltic Light Center - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Baltic Light Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Baltic Light Center - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Baltic Light Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Baltic Light Center - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Baltic Light Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Baltic Light Center - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Baltic Light Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Baltic Light Center - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Baltic Light Center';
-- 49. Andes Crystal Retreat
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Andes Crystal Retreat - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Andes Crystal Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Andes Crystal Retreat - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Andes Crystal Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Andes Crystal Retreat - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Andes Crystal Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Andes Crystal Retreat - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Andes Crystal Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Andes Crystal Retreat - View 5',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Andes Crystal Retreat';
-- 50. Pacific Healing Haven
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Pacific Healing Haven - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Pacific Healing Haven'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Pacific Healing Haven - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Pacific Healing Haven'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Pacific Healing Haven - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Pacific Healing Haven'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Pacific Healing Haven - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Pacific Healing Haven'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Pacific Healing Haven - View 10',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Pacific Healing Haven';
-- 51. Zen Garden House
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Zen Garden House - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Zen Garden House'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Zen Garden House - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Zen Garden House'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Zen Garden House - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Zen Garden House'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Zen Garden House - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Zen Garden House'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Zen Garden House - View 10',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Zen Garden House';
-- 52. Desert Soul Sanctuary
INSERT INTO venue_photos (venue_id, url, alt_text, description, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Desert Soul Sanctuary - View 1',
  'Luxurious tropical wellness facilities with natural materials',
  1
FROM venues v
WHERE v.title = 'Desert Soul Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Desert Soul Sanctuary - View 2',
  'Luxurious tropical wellness facilities with natural materials',
  2
FROM venues v
WHERE v.title = 'Desert Soul Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Desert Soul Sanctuary - View 3',
  'Luxurious tropical wellness facilities with natural materials',
  3
FROM venues v
WHERE v.title = 'Desert Soul Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Desert Soul Sanctuary - View 4',
  'Luxurious tropical wellness facilities with natural materials',
  4
FROM venues v
WHERE v.title = 'Desert Soul Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Desert Soul Sanctuary - View 10',
  'Luxurious tropical wellness facilities with natural materials',
  5
FROM venues v
WHERE v.title = 'Desert Soul Sanctuary';
-- Insert sample reviews (10 reviews linking users to venues)
INSERT INTO reviews (venue_id, user_id, rating, comment)
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  5,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  5,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  1,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  5,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  5,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  4,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  2,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  3,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  4,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  5,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  4,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  5,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  4,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  3,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  2,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  1,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  5,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  5,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  5,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  5,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  5,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  5,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  4,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  3,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  2,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  5,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  2,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  4,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  3,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  5,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  5,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  5,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  5,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  5,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  5,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  4,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  3,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  2,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  1,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  5,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  3,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  2,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  1,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  5,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  3,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  2,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  1,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  5,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  5,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  2,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  1,
  'Absolutely magical experience! The yoga sessions were transformative and the staff was incredibly welcoming. The meditation garden is a true sanctuary.'
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  4,
  'Beautiful mountain views and authentic yoga experience. The food was delicious and the meditation sessions were deeply peaceful.'
FROM venues v
WHERE v.title = 'Mountain View Sanctuary'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  5,
  'Paradise on earth! The beachfront location is stunning, and the cenote swimming was unforgettable. Perfect blend of luxury and wellness.'
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  4,
  'Exquisite alpine setting with world-class spa treatments. The gourmet dining exceeded expectations and the mountain views are breathtaking.'
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  5,
  'Incredible spiritual journey in the Sacred Valley. The ancient Incan wisdom combined with modern wellness practices created a truly unique experience.'
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  4,
  'Authentic ashram experience in the Himalayas. The yoga masters are incredibly knowledgeable and the mountain setting is perfect for meditation.'
FROM venues v
WHERE v.title = 'Mindful Mountain Retreat'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  5,
  'Zen philosophy meets beachfront luxury perfectly. The tea ceremonies were authentic and the ocean-inspired wellness programs were rejuvenating.'
FROM venues v
WHERE v.title = 'Coastal Zen Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  4,
  'Unique desert experience with stargazing meditation. The spiritual ceremonies under the vast sky were truly transformative.'
FROM venues v
WHERE v.title = 'Desert Oasis Center'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  5,
  'Forest bathing and nature therapy at its finest. The eco-friendly accommodation was comfortable and the forest healing ceremonies were powerful.'
FROM venues v
WHERE v.title = 'Forest Healing Lodge'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  4,
  'Overwater bungalows with marine activities were incredible. The tropical wellness programs and island spa treatments were world-class.'
FROM venues v
WHERE v.title = 'Island Paradise Retreat';
-- Insert amenities for wellness retreats
INSERT INTO amenities (name, slug, "group", icon)
VALUES -- Practice & Wellness
  (
    'Yoga hall / shala',
    'yoga-hall',
    'Practice & Wellness',
    '{"library": "lucide-react", "name": "person-standing"}'
  ),
  (
    'Meditation space / hall',
    'meditation-space',
    'Practice & Wellness',
    '{"library": "lucide-react", "name": "moon-star"}'
  ),
  (
    'Spa / massage room',
    'spa-massage',
    'Practice & Wellness',
    '{"library": "lucide-react", "name": "spa"}'
  ),
  (
    'Event / Workshop space (AV/projector)',
    'event-workshop',
    'Practice & Wellness',
    '{"library": "lucide-react", "name": "presentation"}'
  ),
  (
    'Fitness / gym area',
    'fitness-gym',
    'Practice & Wellness',
    '{"library": "lucide-react", "name": "dumbbell"}'
  ),
  (
    'Sauna / steam / jacuzzi',
    'sauna-steam-jacuzzi',
    'Practice & Wellness',
    '{"library": "lucide-react", "name": "flame"}'
  ),
  -- Food & Dining
  (
    'Dining area',
    'dining-area',
    'Food & Dining',
    '{"library": "lucide-react", "name": "utensils-crossed"}'
  ),
  (
    'Kitchen (shared or professional)',
    'kitchen',
    'Food & Dining',
    '{"library": "lucide-react", "name": "chef-hat"}'
  ),
  (
    'Vegetarian / vegan meals available',
    'vegan-meals',
    'Food & Dining',
    '{"library": "lucide-react", "name": "leaf"}'
  ),
  (
    'Restaurant on site',
    'restaurant-on-site',
    'Food & Dining',
    '{"library": "lucide-react", "name": "utensils"}'
  ),
  (
    'Tea / Coffee station',
    'tea-coffee-station',
    'Food & Dining',
    '{"library": "lucide-react", "name": "coffee"}'
  ),
  (
    'Special diet meals (gluten-free/ayurvedic)',
    'special-diet-meals',
    'Food & Dining',
    '{"library": "lucide-react", "name": "salad"}'
  ),
  -- Living & Comfort
  (
    'Private rooms',
    'private-rooms',
    'Living & Comfort',
    '{"library": "lucide-react", "name": "bed-single"}'
  ),
  (
    'Shared rooms / Dorms',
    'shared-rooms',
    'Living & Comfort',
    '{"library": "lucide-react", "name": "users"}'
  ),
  (
    'En-suite bathrooms',
    'en-suite-bathrooms',
    'Living & Comfort',
    '{"library": "lucide-react", "name": "shower-head"}'
  ),
  (
    'Wi-Fi / Internet',
    'wifi',
    'Living & Comfort',
    '{"library": "lucide-react", "name": "wifi"}'
  ),
  (
    'Air conditioning',
    'air-conditioning',
    'Living & Comfort',
    '{"library": "lucide-react", "name": "snowflake"}'
  ),
  (
    'Heating (for cold regions)',
    'heating',
    'Living & Comfort',
    '{"library": "lucide-react", "name": "flame"}'
  ),
  -- Extras & Nature
  (
    'Swimming pool',
    'swimming-pool',
    'Extras & Nature',
    '{"library": "lucide-react", "name": "waves"}'
  ),
  (
    'Outdoor space / garden',
    'outdoor-space',
    'Extras & Nature',
    '{"library": "lucide-react", "name": "tree-palm"}'
  ),
  (
    'Parking on site',
    'parking',
    'Extras & Nature',
    '{"library": "lucide-react", "name": "parking-square"}'
  ),
  (
    'Airport transfer',
    'airport-transfer',
    'Extras & Nature',
    '{"library": "lucide-react", "name": "plane"}'
  ),
  (
    'Eco-friendly',
    'eco-friendly',
    'Extras & Nature',
    '{"library": "lucide-react", "name": "sprout"}'
  ),
  (
    'Activities (cooking class, tours, biking, etc.)',
    'activities',
    'Extras & Nature',
    '{"library": "lucide-react", "name": "bike"}'
  ),
  -- Infrastructure & Policies
  (
    'Accessibility / wheelchair friendly',
    'accessibility',
    'Infrastructure & Policies',
    '{"library": "lucide-react", "name": "accessibility"}'
  ),
  (
    'Alcohol-free policy',
    'alcohol-free',
    'Infrastructure & Policies',
    '{"library": "lucide-react", "name": "wine-off"}'
  ),
  (
    'Pet friendly',
    'pet-friendly',
    'Infrastructure & Policies',
    '{"library": "lucide-react", "name": "paw-print"}'
  ),
  (
    'Child-friendly',
    'child-friendly',
    'Infrastructure & Policies',
    '{"library": "lucide-react", "name": "baby"}'
  );
-- Link amenities to venues (each venue gets 8-12 amenities)
-- Serenity Hills Retreat
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Serenity Hills Retreat'
  AND a.name IN (
    'Yoga hall / shala',
    'Meditation space / hall',
    'Fitness / gym area',
    'Sauna / steam / jacuzzi',
    'Dining area',
    'Vegetarian / vegan meals available',
    'Swimming pool',
    'Airport transfer',
    'Eco-friendly',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Mountain View Sanctuary
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Mountain View Sanctuary'
  AND a.name IN (
    'Yoga hall / shala',
    'Meditation space / hall',
    'Shared accommodation',
    'En-suite bathrooms',
    'Special diet meals (gluten-free/ayurvedic)',
    'Outdoor space / garden',
    'Eco-friendly',
    'Activities (cooking class, tours, biking, etc.)',
    'Wi-Fi / Internet',
    'Parking on site'
  );
-- Ocean Bliss Retreat
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Ocean Bliss Retreat'
  AND a.name IN (
    'Yoga hall / shala',
    'Spa / massage room',
    'Swimming pool',
    'Outdoor space / garden',
    'Private accommodation',
    'Restaurant on site',
    'Wi-Fi / Internet',
    'Pet friendly',
    'Airport transfer',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Sahara Moon Lodge
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Sahara Moon Lodge'
  AND a.name IN (
    'Meditation space / hall',
    'Sauna / steam / jacuzzi',
    'Dining area',
    'Special diet meals (gluten-free/ayurvedic)',
    'Eco-friendly',
    'Outdoor space / garden',
    'Air conditioning',
    'Wi-Fi / Internet',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Alpine Wellness Lodge
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Alpine Wellness Lodge'
  AND a.name IN (
    'Spa / massage room',
    'Sauna / steam / jacuzzi',
    'Heating (for cold regions)',
    'Dining area',
    'Wi-Fi / Internet',
    'Private accommodation',
    'En-suite bathrooms',
    'Parking on site',
    'Eco-friendly',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Sacred Valley Sanctuary
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Sacred Valley Sanctuary'
  AND a.name IN (
    'Yoga hall / shala',
    'Meditation space / hall',
    'Vegetarian / vegan meals available',
    'Shared accommodation',
    'En-suite bathrooms',
    'Outdoor space / garden',
    'Eco-friendly',
    'Wi-Fi / Internet',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Mindful Mountain Retreat
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Mindful Mountain Retreat'
  AND a.name IN (
    'Yoga hall / shala',
    'Meditation space / hall',
    'Spa / massage room',
    'Shared accommodation',
    'Special diet meals (gluten-free/ayurvedic)',
    'Wi-Fi / Internet',
    'Eco-friendly',
    'Outdoor space / garden',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Coastal Zen Retreat
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Coastal Zen Retreat'
  AND a.name IN (
    'Yoga hall / shala',
    'Meditation space / hall',
    'Dining area',
    'Restaurant on site',
    'Private accommodation',
    'Swimming pool',
    'Airport transfer',
    'Eco-friendly',
    'Pet friendly',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Desert Oasis Center
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Desert Oasis Center'
  AND a.name IN (
    'Meditation space / hall',
    'Spa / massage room',
    'Outdoor space / garden',
    'Special diet meals (gluten-free/ayurvedic)',
    'Wi-Fi / Internet',
    'Air conditioning',
    'Airport transfer',
    'Eco-friendly',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Forest Healing Lodge
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Forest Healing Lodge'
  AND a.name IN (
    'Yoga hall / shala',
    'Meditation space / hall',
    'Spa / massage room',
    'Outdoor space / garden',
    'Eco-friendly',
    'Wi-Fi / Internet',
    'Special diet meals (gluten-free/ayurvedic)',
    'Shared accommodation',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Island Paradise Retreat
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Island Paradise Retreat'
  AND a.name IN (
    'Yoga hall / shala',
    'Spa / massage room',
    'Swimming pool',
    'Private accommodation',
    'Restaurant on site',
    'Outdoor space / garden',
    'Wi-Fi / Internet',
    'Airport transfer',
    'Eco-friendly',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Himalayan Bliss Center
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Himalayan Bliss Center'
  AND a.name IN (
    'Yoga hall / shala',
    'Meditation space / hall',
    'Shared accommodation',
    'Special diet meals (gluten-free/ayurvedic)',
    'En-suite bathrooms',
    'Outdoor space / garden',
    'Wi-Fi / Internet',
    'Eco-friendly',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Mediterranean Wellness Villa
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Mediterranean Wellness Villa'
  AND a.name IN (
    'Spa / massage room',
    'Dining area',
    'Restaurant on site',
    'Swimming pool',
    'Private accommodation',
    'Wi-Fi / Internet',
    'Air conditioning',
    'Airport transfer',
    'Eco-friendly',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Zen Garden Retreat
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Zen Garden Retreat'
  AND a.name IN (
    'Yoga hall / shala',
    'Meditation space / hall',
    'Spa / massage room',
    'Dining area',
    'Restaurant on site',
    'Shared accommodation',
    'Eco-friendly',
    'Wi-Fi / Internet',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Tropical Healing Center
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Tropical Healing Center'
  AND a.name IN (
    'Yoga hall / shala',
    'Spa / massage room',
    'Special diet meals (gluten-free/ayurvedic)',
    'Vegetarian / vegan meals available',
    'Outdoor space / garden',
    'Eco-friendly',
    'Airport transfer',
    'Wi-Fi / Internet',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Arctic Wellness Lodge
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Arctic Wellness Lodge'
  AND a.name IN (
    'Spa / massage room',
    'Sauna / steam / jacuzzi',
    'Heating (for cold regions)',
    'Private accommodation',
    'Dining area',
    'Wi-Fi / Internet',
    'Eco-friendly',
    'Parking on site',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Desert Rose Sanctuary
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Desert Rose Sanctuary'
  AND a.name IN (
    'Meditation space / hall',
    'Yoga hall / shala',
    'Special diet meals (gluten-free/ayurvedic)',
    'Private accommodation',
    'Outdoor space / garden',
    'Eco-friendly',
    'Air conditioning',
    'Wi-Fi / Internet',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Mountain Spirit Lodge
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Mountain Spirit Lodge'
  AND a.name IN (
    'Yoga hall / shala',
    'Meditation space / hall',
    'Dining area',
    'Shared accommodation',
    'En-suite bathrooms',
    'Wi-Fi / Internet',
    'Eco-friendly',
    'Outdoor space / garden',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Ocean Spirit Center
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Ocean Spirit Center'
  AND a.name IN (
    'Spa / massage room',
    'Swimming pool',
    'Dining area',
    'Restaurant on site',
    'Private accommodation',
    'Wi-Fi / Internet',
    'Eco-friendly',
    'Airport transfer',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Forest Wisdom Retreat
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Forest Wisdom Retreat'
  AND a.name IN (
    'Yoga hall / shala',
    'Meditation space / hall',
    'Eco-friendly',
    'Outdoor space / garden',
    'Shared accommodation',
    'En-suite bathrooms',
    'Special diet meals (gluten-free/ayurvedic)',
    'Wi-Fi / Internet',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Baltic Serenity Spa
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Baltic Serenity Spa'
  AND a.name IN (
    'Spa / massage room',
    'Sauna / steam / jacuzzi',
    'Dining area',
    'Special diet meals (gluten-free/ayurvedic)',
    'Private accommodation',
    'Wi-Fi / Internet',
    'Air conditioning',
    'Eco-friendly',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Sky High Sanctuary
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Sky High Sanctuary'
  AND a.name IN (
    'Yoga hall / shala',
    'Meditation space / hall',
    'Private accommodation',
    'En-suite bathrooms',
    'Dining area',
    'Wi-Fi / Internet',
    'Eco-friendly',
    'Heating (for cold regions)',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Valley of Peace
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Valley of Peace'
  AND a.name IN (
    'Meditation space / hall',
    'Yoga hall / shala',
    'Shared accommodation',
    'Special diet meals (gluten-free/ayurvedic)',
    'Outdoor space / garden',
    'Eco-friendly',
    'Wi-Fi / Internet',
    'Child-friendly / Adults-only policy',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Crystal Healing Center
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Crystal Healing Center'
  AND a.name IN (
    'Yoga hall / shala',
    'Meditation space / hall',
    'Spa / massage room',
    'Private accommodation',
    'Dining area',
    'Wi-Fi / Internet',
    'Eco-friendly',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Sunrise Wellness Resort
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Sunrise Wellness Resort'
  AND a.name IN (
    'Spa / massage room',
    'Swimming pool',
    'Restaurant on site',
    'Private accommodation',
    'Dining area',
    'Air conditioning',
    'Wi-Fi / Internet',
    'Airport transfer',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Alpine Zen Hut
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Alpine Zen Hut'
  AND a.name IN (
    'Yoga hall / shala',
    'Meditation space / hall',
    'Heating (for cold regions)',
    'Shared accommodation',
    'En-suite bathrooms',
    'Dining area',
    'Eco-friendly',
    'Wi-Fi / Internet',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Sacred Mountain Lodge
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Sacred Mountain Lodge'
  AND a.name IN (
    'Meditation space / hall',
    'Yoga hall / shala',
    'Spa / massage room',
    'Private accommodation',
    'Dining area',
    'Eco-friendly',
    'Wi-Fi / Internet',
    'Airport transfer',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Eternal Spring Center
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Eternal Spring Center'
  AND a.name IN (
    'Yoga hall / shala',
    'Meditation space / hall',
    'Shared accommodation',
    'Dining area',
    'Eco-friendly',
    'Special diet meals (gluten-free/ayurvedic)',
    'Outdoor space / garden',
    'Wi-Fi / Internet',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Rainforest Harmony Lodge
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Rainforest Harmony Lodge'
  AND a.name IN (
    'Yoga hall / shala',
    'Spa / massage room',
    'Vegetarian / vegan meals available',
    'Shared accommodation',
    'Outdoor space / garden',
    'Eco-friendly',
    'Airport transfer',
    'Wi-Fi / Internet',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Nordic Aurora Retreat
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Nordic Aurora Retreat'
  AND a.name IN (
    'Yoga hall / shala',
    'Sauna / steam / jacuzzi',
    'Heating (for cold regions)',
    'Private accommodation',
    'Dining area',
    'Eco-friendly',
    'Wi-Fi / Internet',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Savannah Spirit Camp
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Savannah Spirit Camp'
  AND a.name IN (
    'Meditation space / hall',
    'Yoga hall / shala',
    'Shared accommodation',
    'Outdoor space / garden',
    'Eco-friendly',
    'Special diet meals (gluten-free/ayurvedic)',
    'Wi-Fi / Internet',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Himalayan Zen Ashram
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Himalayan Zen Ashram'
  AND a.name IN (
    'Yoga hall / shala',
    'Meditation space / hall',
    'Shared accommodation',
    'Special diet meals (gluten-free/ayurvedic)',
    'Dining area',
    'Outdoor space / garden',
    'Eco-friendly',
    'Wi-Fi / Internet',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Mediterranean Bliss Villa
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Mediterranean Bliss Villa'
  AND a.name IN (
    'Spa / massage room',
    'Swimming pool',
    'Private accommodation',
    'Restaurant on site',
    'Dining area',
    'Air conditioning',
    'Wi-Fi / Internet',
    'Eco-friendly',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Andes Soul Retreat
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Andes Soul Retreat'
  AND a.name IN (
    'Yoga hall / shala',
    'Meditation space / hall',
    'Shared accommodation',
    'Dining area',
    'En-suite bathrooms',
    'Eco-friendly',
    'Wi-Fi / Internet',
    'Outdoor space / garden',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Island Spirit Eco-Lodge
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Island Spirit Eco-Lodge'
  AND a.name IN (
    'Yoga hall / shala',
    'Spa / massage room',
    'Private accommodation',
    'Outdoor space / garden',
    'Eco-friendly',
    'Wi-Fi / Internet',
    'Airport transfer',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Kyoto Zen House
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Kyoto Zen House'
  AND a.name IN (
    'Meditation space / hall',
    'Yoga hall / shala',
    'Tea / Coffee station',
    'Dining area',
    'Shared accommodation',
    'Eco-friendly',
    'Wi-Fi / Internet',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Caribbean Soul Villa
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Caribbean Soul Villa'
  AND a.name IN (
    'Spa / massage room',
    'Swimming pool',
    'Private accommodation',
    'Restaurant on site',
    'Outdoor space / garden',
    'Wi-Fi / Internet',
    'Eco-friendly',
    'Airport transfer',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Patagonia Nature Lodge
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Patagonia Nature Lodge'
  AND a.name IN (
    'Yoga hall / shala',
    'Meditation space / hall',
    'Shared accommodation',
    'Heating (for cold regions)',
    'Dining area',
    'Eco-friendly',
    'Wi-Fi / Internet',
    'Outdoor space / garden',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Sahara Healing Dome
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Sahara Healing Dome'
  AND a.name IN (
    'Meditation space / hall',
    'Yoga hall / shala',
    'Spa / massage room',
    'Private accommodation',
    'Special diet meals (gluten-free/ayurvedic)',
    'Eco-friendly',
    'Air conditioning',
    'Wi-Fi / Internet',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Arctic Light Retreat
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Arctic Light Retreat'
  AND a.name IN (
    'Spa / massage room',
    'Sauna / steam / jacuzzi',
    'Heating (for cold regions)',
    'Private accommodation',
    'Dining area',
    'Eco-friendly',
    'Wi-Fi / Internet',
    'Parking on site',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Riviera Wellness Villa
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Riviera Wellness Villa'
  AND a.name IN (
    'Spa / massage room',
    'Swimming pool',
    'Private accommodation',
    'Restaurant on site',
    'Dining area',
    'Air conditioning',
    'Wi-Fi / Internet',
    'Eco-friendly',
    'Airport transfer',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Himalayan River Ashram
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Himalayan River Ashram'
  AND a.name IN (
    'Meditation space / hall',
    'Yoga hall / shala',
    'Shared accommodation',
    'Special diet meals (gluten-free/ayurvedic)',
    'Outdoor space / garden',
    'Eco-friendly',
    'Wi-Fi / Internet',
    'Dining area',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Amazon River Camp
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Amazon River Camp'
  AND a.name IN (
    'Yoga hall / shala',
    'Meditation space / hall',
    'Shared rooms / Dorms',
    'Vegetarian / vegan meals available',
    'Outdoor space / garden',
    'Eco-friendly',
    'Wi-Fi / Internet',
    'Parking on site',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Tuscany Harmony Farm
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Tuscany Harmony Farm'
  AND a.name IN (
    'Yoga hall / shala',
    'Meditation space / hall',
    'Farm-to-table dining',
    'Special diet meals (gluten-free/ayurvedic)',
    'Private accommodation',
    'Eco-friendly',
    'Wi-Fi / Internet',
    'Outdoor space / garden',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Pacific Zen Bungalow
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Pacific Zen Bungalow'
  AND a.name IN (
    'Yoga hall / shala',
    'Meditation space / hall',
    'Private accommodation',
    'Dining area',
    'Wi-Fi / Internet',
    'Eco-friendly',
    'Air conditioning',
    'Airport transfer',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Alpine Spirit Chalet
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Alpine Spirit Chalet'
  AND a.name IN (
    'Yoga hall / shala',
    'Meditation space / hall',
    'Heating (for cold regions)',
    'Shared accommodation',
    'Dining area',
    'Eco-friendly',
    'Wi-Fi / Internet',
    'Outdoor space / garden',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Savannah Zen Lodge
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Savannah Zen Lodge'
  AND a.name IN (
    'Meditation space / hall',
    'Yoga hall / shala',
    'Shared accommodation',
    'Outdoor space / garden',
    'Eco-friendly',
    'Wi-Fi / Internet',
    'Special diet meals (gluten-free/ayurvedic)',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Baltic Light Center
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Baltic Light Center'
  AND a.name IN (
    'Spa / massage room',
    'Sauna / steam / jacuzzi',
    'Private accommodation',
    'Dining area',
    'Eco-friendly',
    'Wi-Fi / Internet',
    'Air conditioning',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Andes Crystal Retreat
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Andes Crystal Retreat'
  AND a.name IN (
    'Meditation space / hall',
    'Yoga hall / shala',
    'Spa / massage room',
    'Private accommodation',
    'Dining area',
    'Eco-friendly',
    'Wi-Fi / Internet',
    'Outdoor space / garden',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Pacific Healing Haven
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Pacific Healing Haven'
  AND a.name IN (
    'Yoga hall / shala',
    'Meditation space / hall',
    'Spa / massage room',
    'Private accommodation',
    'Restaurant on site',
    'Air conditioning',
    'Wi-Fi / Internet',
    'Eco-friendly',
    'Airport transfer',
    'Activities (cooking class, tours, biking, etc.)'
  );
-- Insert cancellation policies for venues
-- Each venue get only 1 cancellation policy with different timeframes
INSERT INTO cancellation_policies (venue_id, days_before, refund_percent, note)
SELECT v.id,
  60,
  100,
  'Refund applies if cancelled at least 60 days prior.'
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  30,
  80,
  'Refund applies if cancelled at least 30 days prior.'
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  14,
  50,
  'Refund applies if cancelled at least 14 days prior.'
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  7,
  25,
  'Refund applies if cancelled at least 7 days prior.'
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  1,
  0,
  'No refund if cancelled less than 1 day prior.'
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  60,
  100,
  'Refund applies if cancelled at least 60 days prior.'
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  30,
  80,
  'Refund applies if cancelled at least 30 days prior.'
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  14,
  50,
  'Refund applies if cancelled at least 14 days prior.'
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  7,
  25,
  'Refund applies if cancelled at least 7 days prior.'
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  1,
  0,
  'No refund if cancelled less than 1 day prior.'
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  60,
  100,
  'Refund applies if cancelled at least 60 days prior.'
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  30,
  80,
  'Refund applies if cancelled at least 30 days prior.'
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  14,
  50,
  'Refund applies if cancelled at least 14 days prior.'
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  7,
  25,
  'Refund applies if cancelled at least 7 days prior.'
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  1,
  0,
  'No refund if cancelled less than 1 day prior.'
FROM venues v
WHERE v.title = 'Andes Soul Retreat'
UNION ALL
SELECT v.id,
  60,
  100,
  'Refund applies if cancelled at least 60 days prior.'
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  30,
  80,
  'Refund applies if cancelled at least 30 days prior.'
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  14,
  50,
  'Refund applies if cancelled at least 14 days prior.'
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  7,
  25,
  'Refund applies if cancelled at least 7 days prior.'
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  1,
  0,
  'No refund if cancelled less than 1 day prior.'
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  60,
  100,
  'Refund applies if cancelled at least 60 days prior.'
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  30,
  80,
  'Refund applies if cancelled at least 30 days prior.'
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  14,
  50,
  'Refund applies if cancelled at least 14 days prior.'
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  7,
  25,
  'Refund applies if cancelled at least 7 days prior.'
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  1,
  0,
  'No refund if cancelled less than 1 day prior.'
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  30,
  100,
  'Refund applies if cancelled at least 30 days prior.'
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  14,
  75,
  'Refund applies if cancelled at least 14 days prior.'
FROM venues v
WHERE v.title = 'Mountain View Sanctuary'
UNION ALL
SELECT v.id,
  7,
  50,
  'Refund applies if cancelled at least 7 days prior.'
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat'
UNION ALL
SELECT v.id,
  21,
  100,
  'Refund applies if cancelled at least 21 days prior.'
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge'
UNION ALL
SELECT v.id,
  7,
  80,
  'Refund applies if cancelled at least 7 days prior.'
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary'
UNION ALL
SELECT v.id,
  3,
  30,
  'Refund applies if cancelled at least 30 days prior.'
FROM venues v
WHERE v.title = 'Mindful Mountain Retreat'
UNION ALL
SELECT v.id,
  45,
  100,
  'Refund applies if cancelled at least 45 days prior.'
FROM venues v
WHERE v.title = 'Coastal Zen Retreat'
UNION ALL
SELECT v.id,
  21,
  75,
  'Refund applies if cancelled at least 21 days prior.'
FROM venues v
WHERE v.title = 'Desert Oasis Center'
UNION ALL
SELECT v.id,
  14,
  50,
  'Refund applies if cancelled at least 14 days prior.'
FROM venues v
WHERE v.title = 'Forest Healing Lodge'
UNION ALL
SELECT v.id,
  60,
  100,
  'Refund applies if cancelled at least 60 days prior.'
FROM venues v
WHERE v.title = 'Island Paradise Retreat'
UNION ALL
SELECT v.id,
  30,
  80,
  'Refund applies if cancelled at least 30 days prior.'
FROM venues v
WHERE v.title = 'Himalayan Bliss Center'
UNION ALL
SELECT v.id,
  14,
  60,
  'Refund applies if cancelled at least 14 days prior.'
FROM venues v
WHERE v.title = 'Mediterranean Wellness Villa'
UNION ALL
SELECT v.id,
  21,
  100,
  'Refund applies if cancelled at least 21 days prior.'
FROM venues v
WHERE v.title = 'Zen Garden Retreat'
UNION ALL
SELECT v.id,
  14,
  75,
  'Refund applies if cancelled at least 14 days prior.'
FROM venues v
WHERE v.title = 'Tropical Healing Center'
UNION ALL
SELECT v.id,
  7,
  40,
  'Refund applies if cancelled at least 7 days prior.'
FROM venues v
WHERE v.title = 'Arctic Wellness Lodge'
UNION ALL
SELECT v.id,
  14,
  100,
  'Refund applies if cancelled at least 14 days prior.'
FROM venues v
WHERE v.title = 'Desert Rose Sanctuary'
UNION ALL
SELECT v.id,
  7,
  70,
  'Refund applies if cancelled at least 7 days prior.'
FROM venues v
WHERE v.title = 'Mountain Spirit Lodge'
UNION ALL
SELECT v.id,
  3,
  25,
  'Refund applies if cancelled at least 3 days prior.'
FROM venues v
WHERE v.title = 'Ocean Spirit Center'
UNION ALL
SELECT v.id,
  30,
  100,
  'Refund applies if cancelled at least 30 days prior.'
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  14,
  80,
  'Refund applies if cancelled at least 14 days prior.'
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  7,
  50,
  'Refund applies if cancelled at least 7 days prior.'
FROM venues v
WHERE v.title = 'Valley of Peace'
UNION ALL
SELECT v.id,
  21,
  100,
  'Refund applies if cancelled at least 21 days prior.'
FROM venues v
WHERE v.title = 'Crystal Healing Center'
UNION ALL
SELECT v.id,
  10,
  75,
  'Refund applies if cancelled at least 10 days prior.'
FROM venues v
WHERE v.title = 'Sunrise Wellness Resort'
UNION ALL
SELECT v.id,
  5,
  40,
  'Refund applies if cancelled at least 5 days prior.'
FROM venues v
WHERE v.title = 'Sacred Mountain Lodge'
UNION ALL
SELECT v.id,
  14,
  100,
  'Refund applies if cancelled at least 14 days prior.'
FROM venues v
WHERE v.title = 'Eternal Spring Center';
-- Insert sample inquiries from users to venues (10 random inquiries)
INSERT INTO inquiries (
    venue_id,
    user_id,
    user_email,
    user_name,
    message,
    status,
    created_at
  )
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  'alexandermori1218@gmail.com',
  'Alexander Mori',
  'Hi! I''m interested in booking a wellness retreat for my 40th birthday in March. I''d love to know more about your yoga and meditation programs, and whether you offer special packages for milestone celebrations. Also, what''s the best time to visit Bali?',
  'new'::inquiry_status,
  NOW() - INTERVAL '2 days'
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  'alexandermori1218@gmail.com',
  'Alexander Mori',
  'Hello! I''m planning a spiritual journey to Rishikesh and your sanctuary looks perfect. I have some questions about the ashram-style accommodation - are the rooms shared or private? Also, do you offer traditional Ayurvedic treatments?',
  'viewed'::inquiry_status,
  NOW() - INTERVAL '5 days'
FROM venues v
WHERE v.title = 'Mountain View Sanctuary'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  'alexandermori1218@gmail.com',
  'Alexander Mori',
  'I''m looking for a beachfront wellness retreat in Tulum for my honeymoon. Your cenote swimming and Mayan culture programs sound amazing! Do you offer couple''s packages? What''s the weather like in December?',
  'responded'::inquiry_status,
  NOW() - INTERVAL '1 week'
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  'alexandermori1218@gmail.com',
  'Alexander Mori',
  'Bonjour! I''m interested in your alpine wellness lodge for a winter retreat. I love skiing and spa treatments. Do you offer ski-in/ski-out access? Also, what wellness programs do you have during the winter months?',
  'closed'::inquiry_status,
  NOW() - INTERVAL '2 weeks'
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  'alexandermori1218@gmail.com',
  'Alexander Mori',
  'Hola! I''m fascinated by Incan culture and would love to experience your Sacred Valley sanctuary. I have some questions about the spiritual ceremonies - are they open to beginners? Also, what''s the altitude like there?',
  'new'::inquiry_status,
  NOW() - INTERVAL '3 weeks'
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  'alexandermori1218@gmail.com',
  'Alexander Mori',
  'Namaste! I''m a yoga teacher looking to deepen my practice in the Himalayas. Your ashram experience sounds perfect. Do you offer teacher training programs? Also, what''s the daily schedule like?',
  'viewed'::inquiry_status,
  NOW() - INTERVAL '1 month'
FROM venues v
WHERE v.title = 'Mindful Mountain Retreat'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  'alexandermori1218@gmail.com',
  'Alexander Mori',
  'I''m interested in your coastal zen retreat for a digital detox. The tea ceremonies and ocean meditation sound perfect. Do you have WiFi-free zones? Also, what''s the best time to see whales?',
  'responded'::inquiry_status,
  NOW() - INTERVAL '5 weeks'
FROM venues v
WHERE v.title = 'Coastal Zen Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  'alexandermori1218@gmail.com',
  'Alexander Mori',
  'Salaam! I''m looking for a unique desert experience. Your stargazing meditation and Sufi practices sound fascinating. Do you offer camel treks? Also, what''s the temperature like at night?',
  'new'::inquiry_status,
  NOW() - INTERVAL '6 weeks'
FROM venues v
WHERE v.title = 'Desert Oasis Center'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  'alexandermori1218@gmail.com',
  'Alexander Mori',
  'I''m interested in your forest healing lodge for a nature retreat. The forest bathing and eco-friendly accommodation sound perfect. Do you have guided nature walks? Also, what wildlife can I expect to see?',
  'viewed'::inquiry_status,
  NOW() - INTERVAL '2 months'
FROM venues v
WHERE v.title = 'Forest Healing Lodge'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  'alexandermori1218@gmail.com',
  'Alexander Mori',
  'I''m dreaming of an overwater bungalow experience! Your island paradise retreat looks incredible. Do you offer snorkeling equipment? Also, what''s the best time to avoid monsoon season?',
  'responded'::inquiry_status,
  NOW() - INTERVAL '2 months'
FROM venues v
WHERE v.title = 'Island Paradise Retreat';
-- Insert pricing tiers for venues
-- =====================================
-- Serenity Hills Retreat
-- =====================================
INSERT INTO venue_pricing (
    venue_id,
    amount,
    currency,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  150,
  '¥',
  'per night',
  'Basic Package: Shared room, breakfast included',
  1
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  250,
  '¥',
  'per night',
  'Standard Package: Private room, breakfast & dinner included',
  2
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  400,
  '$',
  'per night',
  'Premium Package: Private suite, all meals & spa access included',
  3
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  600,
  '$',
  'per night',
  'Luxury Package: Villa with gourmet meals, spa & yoga sessions',
  4
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  900,
  '$',
  'per night',
  'Exclusive Package: Entire retreat booking with all amenities',
  5
FROM venues v
WHERE v.title = 'Serenity Hills Retreat';
-- =====================================
-- Mountain View Sanctuary
-- =====================================
INSERT INTO venue_pricing (
    venue_id,
    amount,
    currency,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  150,
  '¥',
  'per night',
  'Basic Package: Shared room, breakfast included',
  1
FROM venues v
WHERE v.title = 'Mountain View Sanctuary'
UNION ALL
SELECT v.id,
  250,
  '¥',
  'per night',
  'Standard Package: Private room, breakfast & dinner included',
  2
FROM venues v
WHERE v.title = 'Mountain View Sanctuary'
UNION ALL
SELECT v.id,
  400,
  '$',
  'per night',
  'Premium Package: Private suite, all meals & spa access included',
  3
FROM venues v
WHERE v.title = 'Mountain View Sanctuary'
UNION ALL
SELECT v.id,
  600,
  '$',
  'per night',
  'Luxury Package: Villa with gourmet meals, spa & yoga sessions',
  4
FROM venues v
WHERE v.title = 'Mountain View Sanctuary'
UNION ALL
SELECT v.id,
  900,
  '$',
  'per night',
  'Exclusive Package: Entire retreat booking with all amenities',
  5
FROM venues v
WHERE v.title = 'Mountain View Sanctuary';
-- =====================================
-- Ocean Bliss Retreat
-- =====================================
INSERT INTO venue_pricing (
    venue_id,
    amount,
    currency,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  150,
  '¥',
  'per night',
  'Basic Package: Shared room, breakfast included',
  1
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat'
UNION ALL
SELECT v.id,
  250,
  '$',
  'per night',
  'Standard Package: Private room, breakfast & dinner included',
  2
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat'
UNION ALL
SELECT v.id,
  400,
  '$',
  'per night',
  'Premium Package: Private suite, all meals & spa access included',
  3
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat'
UNION ALL
SELECT v.id,
  600,
  '$',
  'per night',
  'Luxury Package: Villa with gourmet meals, spa & yoga sessions',
  4
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat'
UNION ALL
SELECT v.id,
  900,
  '$',
  'per night',
  'Exclusive Package: Entire retreat booking with all amenities',
  5
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat';
-- =====================================
-- Alpine Wellness Lodge
-- =====================================
INSERT INTO venue_pricing (
    venue_id,
    amount,
    currency,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  150,
  '¥',
  'per night',
  'Basic Package: Shared room, breakfast included',
  1
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge'
UNION ALL
SELECT v.id,
  250,
  '$',
  'per night',
  'Standard Package: Private room, breakfast & dinner included',
  2
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge'
UNION ALL
SELECT v.id,
  400,
  '¥',
  'per night',
  'Premium Package: Private suite, all meals & spa access included',
  3
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge'
UNION ALL
SELECT v.id,
  600,
  '$',
  'per night',
  'Luxury Package: Villa with gourmet meals, spa & yoga sessions',
  4
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge'
UNION ALL
SELECT v.id,
  900,
  '$',
  'per night',
  'Exclusive Package: Entire retreat booking with all amenities',
  5
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge';
-- =====================================
-- Sacred Valley Sanctuary
-- =====================================
INSERT INTO venue_pricing (
    venue_id,
    amount,
    currency,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  150,
  '$',
  'per night',
  'Basic Package: Shared room, breakfast included',
  1
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary'
UNION ALL
SELECT v.id,
  250,
  '¥',
  'per night',
  'Standard Package: Private room, breakfast & dinner included',
  2
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary'
UNION ALL
SELECT v.id,
  400,
  '$',
  'per night',
  'Premium Package: Private suite, all meals & spa access included',
  3
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary'
UNION ALL
SELECT v.id,
  600,
  '$',
  'per night',
  'Luxury Package: Villa with gourmet meals, spa & yoga sessions',
  4
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary'
UNION ALL
SELECT v.id,
  900,
  '$',
  'per night',
  'Exclusive Package: Entire retreat booking with all amenities',
  5
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary';
-- =====================================
-- Mindful Mountain Retreat
-- =====================================
INSERT INTO venue_pricing (
    venue_id,
    amount,
    currency,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  150,
  '¥',
  'per night',
  'Basic Package: Shared room, breakfast included',
  1
FROM venues v
WHERE v.title = 'Mindful Mountain Retreat'
UNION ALL
SELECT v.id,
  250,
  '$',
  'per night',
  'Standard Package: Private room, breakfast & dinner included',
  2
FROM venues v
WHERE v.title = 'Mindful Mountain Retreat'
UNION ALL
SELECT v.id,
  400,
  '$',
  'per night',
  'Premium Package: Private suite, all meals & spa access included',
  3
FROM venues v
WHERE v.title = 'Mindful Mountain Retreat'
UNION ALL
SELECT v.id,
  600,
  '$',
  'per night',
  'Luxury Package: Villa with gourmet meals, spa & yoga sessions',
  4
FROM venues v
WHERE v.title = 'Mindful Mountain Retreat'
UNION ALL
SELECT v.id,
  900,
  '¥',
  'per night',
  'Exclusive Package: Entire retreat booking with all amenities',
  5
FROM venues v
WHERE v.title = 'Mindful Mountain Retreat';
-- =====================================
-- Coastal Zen Retreat
-- =====================================
INSERT INTO venue_pricing (
    venue_id,
    amount,
    currency,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  150,
  '$',
  'per night',
  'Basic Package: Shared room, breakfast included',
  1
FROM venues v
WHERE v.title = 'Coastal Zen Retreat'
UNION ALL
SELECT v.id,
  250,
  '¥',
  'per night',
  'Standard Package: Private room, breakfast & dinner included',
  2
FROM venues v
WHERE v.title = 'Coastal Zen Retreat'
UNION ALL
SELECT v.id,
  400,
  '£',
  'per night',
  'Premium Package: Private suite, all meals & spa access included',
  3
FROM venues v
WHERE v.title = 'Coastal Zen Retreat'
UNION ALL
SELECT v.id,
  600,
  '£',
  'per night',
  'Luxury Package: Villa with gourmet meals, spa & yoga sessions',
  4
FROM venues v
WHERE v.title = 'Coastal Zen Retreat'
UNION ALL
SELECT v.id,
  900,
  '£',
  'per night',
  'Exclusive Package: Entire retreat booking with all amenities',
  5
FROM venues v
WHERE v.title = 'Coastal Zen Retreat';
-- =====================================
-- Desert Oasis Center
-- =====================================
INSERT INTO venue_pricing (
    venue_id,
    amount,
    currency,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  150,
  '$',
  'per night',
  'Basic Package: Shared room, breakfast included',
  1
FROM venues v
WHERE v.title = 'Desert Oasis Center'
UNION ALL
SELECT v.id,
  250,
  '$',
  'per night',
  'Standard Package: Private room, breakfast & dinner included',
  2
FROM venues v
WHERE v.title = 'Desert Oasis Center'
UNION ALL
SELECT v.id,
  400,
  '$',
  'per night',
  'Premium Package: Private suite, all meals & spa access included',
  3
FROM venues v
WHERE v.title = 'Desert Oasis Center'
UNION ALL
SELECT v.id,
  600,
  '$',
  'per night',
  'Luxury Package: Villa with gourmet meals, spa & yoga sessions',
  4
FROM venues v
WHERE v.title = 'Desert Oasis Center'
UNION ALL
SELECT v.id,
  900,
  '$',
  'per night',
  'Exclusive Package: Entire retreat booking with all amenities',
  5
FROM venues v
WHERE v.title = 'Desert Oasis Center';
-- =====================================
-- Forest Healing Lodge
-- =====================================
INSERT INTO venue_pricing (
    venue_id,
    amount,
    currency,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  150,
  '$',
  'per night',
  'Basic Package: Shared room, breakfast included',
  1
FROM venues v
WHERE v.title = 'Forest Healing Lodge'
UNION ALL
SELECT v.id,
  250,
  '$',
  'per night',
  'Standard Package: Private room, breakfast & dinner included',
  2
FROM venues v
WHERE v.title = 'Forest Healing Lodge'
UNION ALL
SELECT v.id,
  400,
  '$',
  'per night',
  'Premium Package: Private suite, all meals & spa access included',
  3
FROM venues v
WHERE v.title = 'Forest Healing Lodge'
UNION ALL
SELECT v.id,
  600,
  '$',
  'per night',
  'Luxury Package: Villa with gourmet meals, spa & yoga sessions',
  4
FROM venues v
WHERE v.title = 'Forest Healing Lodge'
UNION ALL
SELECT v.id,
  900,
  '$',
  'per night',
  'Exclusive Package: Entire retreat booking with all amenities',
  5
FROM venues v
WHERE v.title = 'Forest Healing Lodge';
-- =====================================
-- Island Paradise Retreat
-- =====================================
INSERT INTO venue_pricing (
    venue_id,
    amount,
    currency,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  150,
  '$',
  'per night',
  'Basic Package: Shared room, breakfast included',
  1
FROM venues v
WHERE v.title = 'Island Paradise Retreat'
UNION ALL
SELECT v.id,
  250,
  '$',
  'per night',
  'Standard Package: Private room, breakfast & dinner included',
  2
FROM venues v
WHERE v.title = 'Island Paradise Retreat'
UNION ALL
SELECT v.id,
  400,
  '$',
  'per night',
  'Premium Package: Private suite, all meals & spa access included',
  3
FROM venues v
WHERE v.title = 'Island Paradise Retreat'
UNION ALL
SELECT v.id,
  600,
  '$',
  'per night',
  'Luxury Package: Villa with gourmet meals, spa & yoga sessions',
  4
FROM venues v
WHERE v.title = 'Island Paradise Retreat'
UNION ALL
SELECT v.id,
  900,
  '$',
  'per night',
  'Exclusive Package: Entire retreat booking with all amenities',
  5
FROM venues v
WHERE v.title = 'Island Paradise Retreat';
-- =====================================
-- Himalayan Bliss Center
-- =====================================
INSERT INTO venue_pricing (
    venue_id,
    amount,
    currency,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  150,
  '$',
  'per night',
  'Basic Package: Shared room, breakfast included',
  1
FROM venues v
WHERE v.title = 'Himalayan Bliss Center'
UNION ALL
SELECT v.id,
  250,
  '$',
  'per night',
  'Standard Package: Private room, breakfast & dinner included',
  2
FROM venues v
WHERE v.title = 'Himalayan Bliss Center'
UNION ALL
SELECT v.id,
  400,
  '$',
  'per night',
  'Premium Package: Private suite, all meals & spa access included',
  3
FROM venues v
WHERE v.title = 'Himalayan Bliss Center'
UNION ALL
SELECT v.id,
  600,
  '$',
  'per night',
  'Luxury Package: Villa with gourmet meals, spa & yoga sessions',
  4
FROM venues v
WHERE v.title = 'Himalayan Bliss Center'
UNION ALL
SELECT v.id,
  900,
  '$',
  'per night',
  'Exclusive Package: Entire retreat booking with all amenities',
  5
FROM venues v
WHERE v.title = 'Himalayan Bliss Center';
-- =====================================
-- Mediterranean Wellness Villa
-- =====================================
INSERT INTO venue_pricing (
    venue_id,
    amount,
    currency,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  150,
  '$',
  'per night',
  'Basic Package: Shared room, breakfast included',
  1
FROM venues v
WHERE v.title = 'Mediterranean Wellness Villa'
UNION ALL
SELECT v.id,
  250,
  '$',
  'per night',
  'Standard Package: Private room, breakfast & dinner included',
  2
FROM venues v
WHERE v.title = 'Mediterranean Wellness Villa'
UNION ALL
SELECT v.id,
  400,
  '$',
  'per night',
  'Premium Package: Private suite, all meals & spa access included',
  3
FROM venues v
WHERE v.title = 'Mediterranean Wellness Villa'
UNION ALL
SELECT v.id,
  600,
  '$',
  'per night',
  'Luxury Package: Villa with gourmet meals, spa & yoga sessions',
  4
FROM venues v
WHERE v.title = 'Mediterranean Wellness Villa'
UNION ALL
SELECT v.id,
  900,
  '$',
  'per night',
  'Exclusive Package: Entire retreat booking with all amenities',
  5
FROM venues v
WHERE v.title = 'Mediterranean Wellness Villa';
-- =====================================
-- Zen Garden Retreat
-- =====================================
INSERT INTO venue_pricing (
    venue_id,
    amount,
    currency,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  150,
  '$',
  'per night',
  'Basic Package: Shared room, breakfast included',
  1
FROM venues v
WHERE v.title = 'Zen Garden Retreat'
UNION ALL
SELECT v.id,
  250,
  '$',
  'per night',
  'Standard Package: Private room, breakfast & dinner included',
  2
FROM venues v
WHERE v.title = 'Zen Garden Retreat'
UNION ALL
SELECT v.id,
  400,
  '$',
  'per night',
  'Premium Package: Private suite, all meals & spa access included',
  3
FROM venues v
WHERE v.title = 'Zen Garden Retreat'
UNION ALL
SELECT v.id,
  600,
  '$',
  'per night',
  'Luxury Package: Villa with gourmet meals, spa & yoga sessions',
  4
FROM venues v
WHERE v.title = 'Zen Garden Retreat'
UNION ALL
SELECT v.id,
  900,
  '$',
  'per night',
  'Exclusive Package: Entire retreat booking with all amenities',
  5
FROM venues v
WHERE v.title = 'Zen Garden Retreat';
-- =====================================
-- Tropical Healing Center
-- =====================================
INSERT INTO venue_pricing (
    venue_id,
    amount,
    currency,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  150,
  '$',
  'per night',
  'Basic Package: Shared room, breakfast included',
  1
FROM venues v
WHERE v.title = 'Tropical Healing Center'
UNION ALL
SELECT v.id,
  250,
  '$',
  'per night',
  'Standard Package: Private room, breakfast & dinner included',
  2
FROM venues v
WHERE v.title = 'Tropical Healing Center'
UNION ALL
SELECT v.id,
  400,
  '$',
  'per night',
  'Premium Package: Private suite, all meals & spa access included',
  3
FROM venues v
WHERE v.title = 'Tropical Healing Center'
UNION ALL
SELECT v.id,
  600,
  '£',
  'per night',
  'Luxury Package: Villa with gourmet meals, spa & yoga sessions',
  4
FROM venues v
WHERE v.title = 'Tropical Healing Center'
UNION ALL
SELECT v.id,
  900,
  '$',
  'per night',
  'Exclusive Package: Entire retreat booking with all amenities',
  5
FROM venues v
WHERE v.title = 'Tropical Healing Center';
-- =====================================
-- Arctic Wellness Lodge
-- =====================================
INSERT INTO venue_pricing (
    venue_id,
    amount,
    currency,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  150,
  '£',
  'per night',
  'Basic Package: Shared room, breakfast included',
  1
FROM venues v
WHERE v.title = 'Arctic Wellness Lodge'
UNION ALL
SELECT v.id,
  250,
  '$',
  'per night',
  'Standard Package: Private room, breakfast & dinner included',
  2
FROM venues v
WHERE v.title = 'Arctic Wellness Lodge'
UNION ALL
SELECT v.id,
  400,
  '$',
  'per night',
  'Premium Package: Private suite, all meals & spa access included',
  3
FROM venues v
WHERE v.title = 'Arctic Wellness Lodge'
UNION ALL
SELECT v.id,
  600,
  '£',
  'per night',
  'Luxury Package: Villa with gourmet meals, spa & yoga sessions',
  4
FROM venues v
WHERE v.title = 'Arctic Wellness Lodge'
UNION ALL
SELECT v.id,
  900,
  '$',
  'per night',
  'Exclusive Package: Entire retreat booking with all amenities',
  5
FROM venues v
WHERE v.title = 'Arctic Wellness Lodge';
-- =====================================
-- Desert Rose Sanctuary
-- =====================================
INSERT INTO venue_pricing (
    venue_id,
    amount,
    currency,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  150,
  '$',
  'per night',
  'Basic Package: Shared room, breakfast included',
  1
FROM venues v
WHERE v.title = 'Desert Rose Sanctuary'
UNION ALL
SELECT v.id,
  250,
  '$',
  'per night',
  'Standard Package: Private room, breakfast & dinner included',
  2
FROM venues v
WHERE v.title = 'Desert Rose Sanctuary'
UNION ALL
SELECT v.id,
  400,
  '$',
  'per night',
  'Premium Package: Private suite, all meals & spa access included',
  3
FROM venues v
WHERE v.title = 'Desert Rose Sanctuary'
UNION ALL
SELECT v.id,
  600,
  '$',
  'per night',
  'Luxury Package: Villa with gourmet meals, spa & yoga sessions',
  4
FROM venues v
WHERE v.title = 'Desert Rose Sanctuary'
UNION ALL
SELECT v.id,
  900,
  '$',
  'per night',
  'Exclusive Package: Entire retreat booking with all amenities',
  5
FROM venues v
WHERE v.title = 'Desert Rose Sanctuary';
-- =====================================
-- Kyoto Zen House
-- =====================================
INSERT INTO venue_pricing (
    venue_id,
    amount,
    currency,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  150,
  '£',
  'per night',
  'Basic Package: Shared room, breakfast included',
  1
FROM venues v
WHERE v.title = 'Kyoto Zen House'
UNION ALL
SELECT v.id,
  250,
  '$',
  'per night',
  'Standard Package: Private room, breakfast & dinner included',
  2
FROM venues v
WHERE v.title = 'Kyoto Zen House'
UNION ALL
SELECT v.id,
  400,
  '$',
  'per night',
  'Premium Package: Private suite, all meals & spa access included',
  3
FROM venues v
WHERE v.title = 'Kyoto Zen House'
UNION ALL
SELECT v.id,
  600,
  '£',
  'per night',
  'Luxury Package: Villa with gourmet meals, spa & yoga sessions',
  4
FROM venues v
WHERE v.title = 'Kyoto Zen House'
UNION ALL
SELECT v.id,
  900,
  '£',
  'per night',
  'Exclusive Package: Entire retreat booking with all amenities',
  5
FROM venues v
WHERE v.title = 'Kyoto Zen House';
-- =====================================
-- Mountain Spirit Lodge
-- =====================================
INSERT INTO venue_pricing (
    venue_id,
    amount,
    currency,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  150,
  '$',
  'per night',
  'Basic Package: Shared room, breakfast included',
  1
FROM venues v
WHERE v.title = 'Mountain Spirit Lodge'
UNION ALL
SELECT v.id,
  250,
  '$',
  'per night',
  'Standard Package: Private room, breakfast & dinner included',
  2
FROM venues v
WHERE v.title = 'Mountain Spirit Lodge'
UNION ALL
SELECT v.id,
  400,
  '$',
  'per night',
  'Premium Package: Private suite, all meals & spa access included',
  3
FROM venues v
WHERE v.title = 'Mountain Spirit Lodge'
UNION ALL
SELECT v.id,
  600,
  '$',
  'per night',
  'Luxury Package: Villa with gourmet meals, spa & yoga sessions',
  4
FROM venues v
WHERE v.title = 'Mountain Spirit Lodge'
UNION ALL
SELECT v.id,
  900,
  '$',
  'per night',
  'Exclusive Package: Entire retreat booking with all amenities',
  5
FROM venues v
WHERE v.title = 'Mountain Spirit Lodge';
-- =====================================
-- Ocean Spirit Center
-- =====================================
INSERT INTO venue_pricing (
    venue_id,
    amount,
    currency,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  150,
  '$',
  'per night',
  'Basic Package: Shared room, breakfast included',
  1
FROM venues v
WHERE v.title = 'Ocean Spirit Center'
UNION ALL
SELECT v.id,
  250,
  '£',
  'per night',
  'Standard Package: Private room, breakfast & dinner included',
  2
FROM venues v
WHERE v.title = 'Ocean Spirit Center'
UNION ALL
SELECT v.id,
  400,
  '$',
  'per night',
  'Premium Package: Private suite, all meals & spa access included',
  3
FROM venues v
WHERE v.title = 'Ocean Spirit Center'
UNION ALL
SELECT v.id,
  600,
  '$',
  'per night',
  'Luxury Package: Villa with gourmet meals, spa & yoga sessions',
  4
FROM venues v
WHERE v.title = 'Ocean Spirit Center'
UNION ALL
SELECT v.id,
  900,
  '£',
  'per night',
  'Exclusive Package: Entire retreat booking with all amenities',
  5
FROM venues v
WHERE v.title = 'Ocean Spirit Center';
-- =====================================
-- Forest Wisdom Retreat
-- =====================================
INSERT INTO venue_pricing (
    venue_id,
    amount,
    currency,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  150,
  '£',
  'per night',
  'Basic Package: Shared room, breakfast included',
  1
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  250,
  '$',
  'per night',
  'Standard Package: Private room, breakfast & dinner included',
  2
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  400,
  '$',
  'per night',
  'Premium Package: Private suite, all meals & spa access included',
  3
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  600,
  '£',
  'per night',
  'Luxury Package: Villa with gourmet meals, spa & yoga sessions',
  4
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  900,
  '$',
  'per night',
  'Exclusive Package: Entire retreat booking with all amenities',
  5
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat';
-- =====================================
-- Sky High Sanctuary
-- =====================================
INSERT INTO venue_pricing (
    venue_id,
    amount,
    currency,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  150,
  '$',
  'per night',
  'Basic Package: Shared room, breakfast included',
  1
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  250,
  '$',
  'per night',
  'Standard Package: Private room, breakfast & dinner included',
  2
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  400,
  '£',
  'per night',
  'Premium Package: Private suite, all meals & spa access included',
  3
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  600,
  '$',
  'per night',
  'Luxury Package: Villa with gourmet meals, spa & yoga sessions',
  4
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  900,
  '$',
  'per night',
  'Exclusive Package: Entire retreat booking with all amenities',
  5
FROM venues v
WHERE v.title = 'Sky High Sanctuary';
-- =====================================
-- Valley of Peace
-- =====================================
INSERT INTO venue_pricing (
    venue_id,
    amount,
    currency,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  150,
  '$',
  'per night',
  'Basic Package: Shared room, breakfast included',
  1
FROM venues v
WHERE v.title = 'Valley of Peace'
UNION ALL
SELECT v.id,
  250,
  '$',
  'per night',
  'Standard Package: Private room, breakfast & dinner included',
  2
FROM venues v
WHERE v.title = 'Valley of Peace'
UNION ALL
SELECT v.id,
  400,
  '$',
  'per night',
  'Premium Package: Private suite, all meals & spa access included',
  3
FROM venues v
WHERE v.title = 'Valley of Peace'
UNION ALL
SELECT v.id,
  600,
  '$',
  'per night',
  'Luxury Package: Villa with gourmet meals, spa & yoga sessions',
  4
FROM venues v
WHERE v.title = 'Valley of Peace'
UNION ALL
SELECT v.id,
  900,
  '$',
  'per night',
  'Exclusive Package: Entire retreat booking with all amenities',
  5
FROM venues v
WHERE v.title = 'Valley of Peace';
-- =====================================
-- Crystal Healing Center
-- =====================================
INSERT INTO venue_pricing (
    venue_id,
    amount,
    currency,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  150,
  '$',
  'per night',
  'Basic Package: Shared room, breakfast included',
  1
FROM venues v
WHERE v.title = 'Crystal Healing Center'
UNION ALL
SELECT v.id,
  250,
  '$',
  'per night',
  'Standard Package: Private room, breakfast & dinner included',
  2
FROM venues v
WHERE v.title = 'Crystal Healing Center'
UNION ALL
SELECT v.id,
  400,
  '$',
  'per night',
  'Premium Package: Private suite, all meals & spa access included',
  3
FROM venues v
WHERE v.title = 'Crystal Healing Center'
UNION ALL
SELECT v.id,
  600,
  '£',
  'per night',
  'Luxury Package: Villa with gourmet meals, spa & yoga sessions',
  4
FROM venues v
WHERE v.title = 'Crystal Healing Center'
UNION ALL
SELECT v.id,
  900,
  '$',
  'per night',
  'Exclusive Package: Entire retreat booking with all amenities',
  5
FROM venues v
WHERE v.title = 'Crystal Healing Center';
-- =====================================
-- Sunrise Wellness Resort
-- =====================================
INSERT INTO venue_pricing (
    venue_id,
    amount,
    currency,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  150,
  '£',
  'per night',
  'Basic Package: Shared room, breakfast included',
  1
FROM venues v
WHERE v.title = 'Sunrise Wellness Resort'
UNION ALL
SELECT v.id,
  250,
  '$',
  'per night',
  'Standard Package: Private room, breakfast & dinner included',
  2
FROM venues v
WHERE v.title = 'Sunrise Wellness Resort'
UNION ALL
SELECT v.id,
  400,
  '£',
  'per night',
  'Premium Package: Private suite, all meals & spa access included',
  3
FROM venues v
WHERE v.title = 'Sunrise Wellness Resort'
UNION ALL
SELECT v.id,
  600,
  '$',
  'per night',
  'Luxury Package: Villa with gourmet meals, spa & yoga sessions',
  4
FROM venues v
WHERE v.title = 'Sunrise Wellness Resort'
UNION ALL
SELECT v.id,
  900,
  '$',
  'per night',
  'Exclusive Package: Entire retreat booking with all amenities',
  5
FROM venues v
WHERE v.title = 'Sunrise Wellness Resort';
-- =====================================
-- Riviera Wellness Villa
-- =====================================
INSERT INTO venue_pricing (
    venue_id,
    amount,
    currency,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  150,
  '$',
  'per night',
  'Basic Package: Shared room, breakfast included',
  1
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  250,
  '$',
  'per night',
  'Standard Package: Private room, breakfast & dinner included',
  2
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  400,
  '£',
  'per night',
  'Premium Package: Private suite, all meals & spa access included',
  3
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  600,
  '$',
  'per night',
  'Luxury Package: Villa with gourmet meals, spa & yoga sessions',
  4
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  900,
  '£',
  'per night',
  'Exclusive Package: Entire retreat booking with all amenities',
  5
FROM venues v
WHERE v.title = 'Riviera Wellness Villa';
--insert rooms for venues
-- =====================================
-- Serenity Hills Retreat
-- =====================================
INSERT INTO rooms (
    venue_id,
    name,
    capacity_min,
    capacity_max,
    size_sqft,
    price_min,
    price_max,
    currency,
    amenities,
    description,
    photos,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  'Standard Room',
  1,
  2,
  250,
  100,
  150,
  '$',
  '{"WiFi","Balcony"}'::text [],
  'Cozy standard room with double bed.',
  '{"room-photos/room-1.avif","room-photos/room-2.avif","room-photos/room-3.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  1
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'Deluxe Room',
  1,
  3,
  350,
  180,
  250,
  '$',
  '{"WiFi","Balcony","Air Conditioning"}'::text [],
  'Spacious deluxe room with balcony and seating area.',
  '{"room-photos/room-4.avif","room-photos/room-5.avif","room-photos/room-6.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  2
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'Suite',
  1,
  4,
  500,
  300,
  450,
  '€',
  '{"WiFi","Balcony","Mini Bar","Jacuzzi"}'::text [],
  'Luxury suite with living area and private jacuzzi.',
  '{"room-photos/room-7.avif","room-photos/room-8.avif","room-photos/room-9.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  3
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'Family Room',
  2,
  5,
  600,
  250,
  350,
  '$',
  '{"WiFi","Balcony","Kitchenette"}'::text [],
  'Family-friendly room with kitchenette and multiple beds.',
  '{"room-photos/room-10.avif","room-photos/room-11.avif","room-photos/room-12.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  4
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'Eco Lodge',
  1,
  2,
  400,
  200,
  300,
  '€',
  '{"WiFi","Nature View","Private Deck"}'::text [],
  'Rustic eco-lodge cabin surrounded by nature.',
  '{"room-photos/room-13.avif","room-photos/room-14.avif","room-photos/room-15.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  5
FROM venues v
WHERE v.title = 'Serenity Hills Retreat';
-- =====================================
-- Mountain View Sanctuary
-- =====================================
INSERT INTO rooms (
    venue_id,
    name,
    capacity_min,
    capacity_max,
    size_sqft,
    price_min,
    price_max,
    currency,
    amenities,
    description,
    photos,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  'Standard Room',
  1,
  2,
  250,
  100,
  150,
  '$',
  '{"WiFi","Balcony"}'::text [],
  'Cozy standard room with double bed.',
  '{"room-photos/room-16.avif","room-photos/room-17.avif","room-photos/room-18.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  1
FROM venues v
WHERE v.title = 'Mountain View Sanctuary'
UNION ALL
SELECT v.id,
  'Deluxe Room',
  1,
  3,
  350,
  180,
  250,
  '₹',
  '{"WiFi","Balcony","Air Conditioning"}'::text [],
  'Spacious deluxe room with balcony and seating area.',
  '{"room-photos/room-19.avif","room-photos/room-20.avif","room-photos/room-21.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  2
FROM venues v
WHERE v.title = 'Mountain View Sanctuary'
UNION ALL
SELECT v.id,
  'Suite',
  1,
  4,
  500,
  300,
  450,
  '$',
  '{"WiFi","Balcony","Mini Bar","Jacuzzi"}'::text [],
  'Luxury suite with living area and private jacuzzi.',
  '{"room-photos/room-22.avif","room-photos/room-23.avif","room-photos/room-24.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  3
FROM venues v
WHERE v.title = 'Mountain View Sanctuary'
UNION ALL
SELECT v.id,
  'Family Room',
  2,
  5,
  600,
  250,
  350,
  '$',
  '{"WiFi","Balcony","Kitchenette"}'::text [],
  'Family-friendly room with kitchenette and multiple beds.',
  '{"room-photos/room-25.avif","room-photos/room-1.avif","room-photos/room-2.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  4
FROM venues v
WHERE v.title = 'Mountain View Sanctuary'
UNION ALL
SELECT v.id,
  'Eco Lodge',
  1,
  2,
  400,
  200,
  300,
  '₹',
  '{"WiFi","Nature View","Private Deck"}'::text [],
  'Rustic eco-lodge cabin surrounded by nature.',
  '{"room-photos/room-3.avif","room-photos/room-4.avif","room-photos/room-5.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  5
FROM venues v
WHERE v.title = 'Mountain View Sanctuary';
-- =====================================
-- Ocean Bliss Retreat
-- =====================================
INSERT INTO rooms (
    venue_id,
    name,
    capacity_min,
    capacity_max,
    size_sqft,
    price_min,
    price_max,
    currency,
    amenities,
    description,
    photos,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  'Standard Room',
  1,
  2,
  250,
  100,
  150,
  '$',
  '{"WiFi","Balcony"}'::text [],
  'Cozy standard room with double bed.',
  '{"room-photos/room-6.avif","room-photos/room-7.avif","room-photos/room-8.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  1
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat'
UNION ALL
SELECT v.id,
  'Deluxe Room',
  1,
  3,
  350,
  180,
  250,
  '$',
  '{"WiFi","Balcony","Air Conditioning"}'::text [],
  'Spacious deluxe room with balcony and seating area.',
  '{"room-photos/room-9.avif","room-photos/room-10.avif","room-photos/room-11.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  2
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat'
UNION ALL
SELECT v.id,
  'Suite',
  1,
  4,
  500,
  300,
  450,
  '$',
  '{"WiFi","Balcony","Mini Bar","Jacuzzi"}'::text [],
  'Luxury suite with living area and private jacuzzi.',
  '{"room-photos/room-12.avif","room-photos/room-13.avif","room-photos/room-14.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  3
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat'
UNION ALL
SELECT v.id,
  'Family Room',
  2,
  5,
  600,
  250,
  350,
  '$',
  '{"WiFi","Balcony","Kitchenette"}'::text [],
  'Family-friendly room with kitchenette and multiple beds.',
  '{"room-photos/room-15.avif","room-photos/room-16.avif","room-photos/room-17.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  4
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat'
UNION ALL
SELECT v.id,
  'Eco Lodge',
  1,
  2,
  400,
  200,
  300,
  '$',
  '{"WiFi","Nature View","Private Deck"}'::text [],
  'Rustic eco-lodge cabin surrounded by nature.',
  '{"room-photos/room-18.avif","room-photos/room-19.avif","room-photos/room-20.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  5
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat';
-- =====================================
-- Alpine Wellness Lodge
-- =====================================
INSERT INTO rooms (
    venue_id,
    name,
    capacity_min,
    capacity_max,
    size_sqft,
    price_min,
    price_max,
    currency,
    amenities,
    description,
    photos,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  'Standard Room',
  1,
  2,
  250,
  100,
  150,
  '$',
  '{"WiFi","Balcony"}'::text [],
  'Cozy standard room with double bed.',
  '{"room-photos/room-21.avif","room-photos/room-22.avif","room-photos/room-23.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  1
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge'
UNION ALL
SELECT v.id,
  'Deluxe Room',
  1,
  3,
  350,
  180,
  250,
  '$',
  '{"WiFi","Balcony","Air Conditioning"}'::text [],
  'Spacious deluxe room with balcony and seating area.',
  '{"room-photos/room-24.avif","room-photos/room-25.avif","room-photos/room-1.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  2
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge'
UNION ALL
SELECT v.id,
  'Suite',
  1,
  4,
  500,
  300,
  450,
  '$',
  '{"WiFi","Balcony","Mini Bar","Jacuzzi"}'::text [],
  'Luxury suite with living area and private jacuzzi.',
  '{"room-photos/room-2.avif","room-photos/room-3.avif","room-photos/room-4.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  3
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge'
UNION ALL
SELECT v.id,
  'Family Room',
  2,
  5,
  600,
  250,
  350,
  '$',
  '{"WiFi","Balcony","Kitchenette"}'::text [],
  'Family-friendly room with kitchenette and multiple beds.',
  '{"room-photos/room-5.avif","room-photos/room-6.avif","room-photos/room-7.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  4
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge'
UNION ALL
SELECT v.id,
  'Eco Lodge',
  1,
  2,
  400,
  200,
  300,
  '$',
  '{"WiFi","Nature View","Private Deck"}'::text [],
  'Rustic eco-lodge cabin surrounded by nature.',
  '{"room-photos/room-8.avif","room-photos/room-9.avif","room-photos/room-10.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  5
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge';
-- =====================================
-- Sacred Valley Sanctuary
-- =====================================
INSERT INTO rooms (
    venue_id,
    name,
    capacity_min,
    capacity_max,
    size_sqft,
    price_min,
    price_max,
    currency,
    amenities,
    description,
    photos,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  'Standard Room',
  1,
  2,
  250,
  100,
  150,
  '$',
  '{"WiFi","Balcony"}'::text [],
  'Cozy standard room with double bed.',
  '{"room-photos/room-11.avif","room-photos/room-12.avif","room-photos/room-13.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  1
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary'
UNION ALL
SELECT v.id,
  'Deluxe Room',
  1,
  3,
  350,
  180,
  250,
  '$',
  '{"WiFi","Balcony","Air Conditioning"}'::text [],
  'Spacious deluxe room with balcony and seating area.',
  '{"room-photos/room-14.avif","room-photos/room-15.avif","room-photos/room-16.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  2
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary'
UNION ALL
SELECT v.id,
  'Suite',
  1,
  4,
  500,
  300,
  450,
  '$',
  '{"WiFi","Balcony","Mini Bar","Jacuzzi"}'::text [],
  'Luxury suite with living area and private jacuzzi.',
  '{"room-photos/room-17.avif","room-photos/room-18.avif","room-photos/room-19.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  3
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary'
UNION ALL
SELECT v.id,
  'Family Room',
  2,
  5,
  600,
  250,
  350,
  '$',
  '{"WiFi","Balcony","Kitchenette"}'::text [],
  'Family-friendly room with kitchenette and multiple beds.',
  '{"room-photos/room-20.avif","room-photos/room-21.avif","room-photos/room-22.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  4
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary'
UNION ALL
SELECT v.id,
  'Eco Lodge',
  1,
  2,
  400,
  200,
  300,
  '$',
  '{"WiFi","Nature View","Private Deck"}'::text [],
  'Rustic eco-lodge cabin surrounded by nature.',
  '{"room-photos/room-23.avif","room-photos/room-24.avif","room-photos/room-25.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  5
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary';
-- =====================================
-- Mindful Mountain Retreat
-- =====================================
INSERT INTO rooms (
    venue_id,
    name,
    capacity_min,
    capacity_max,
    size_sqft,
    price_min,
    price_max,
    currency,
    amenities,
    description,
    photos,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  'Standard Room',
  1,
  2,
  250,
  100,
  150,
  '$',
  '{"WiFi","Balcony"}'::text [],
  'Cozy standard room with double bed.',
  '{"room-photos/room-1.avif","room-photos/room-2.avif","room-photos/room-3.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  1
FROM venues v
WHERE v.title = 'Mindful Mountain Retreat'
UNION ALL
SELECT v.id,
  'Deluxe Room',
  1,
  3,
  350,
  180,
  250,
  '$',
  '{"WiFi","Balcony","Air Conditioning"}'::text [],
  'Spacious deluxe room with balcony and seating area.',
  '{"room-photos/room-4.avif","room-photos/room-5.avif","room-photos/room-6.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  2
FROM venues v
WHERE v.title = 'Mindful Mountain Retreat'
UNION ALL
SELECT v.id,
  'Suite',
  1,
  4,
  500,
  300,
  450,
  '$',
  '{"WiFi","Balcony","Mini Bar","Jacuzzi"}'::text [],
  'Luxury suite with living area and private jacuzzi.',
  '{"room-photos/room-7.avif","room-photos/room-8.avif","room-photos/room-9.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  3
FROM venues v
WHERE v.title = 'Mindful Mountain Retreat'
UNION ALL
SELECT v.id,
  'Family Room',
  2,
  5,
  600,
  250,
  350,
  '$',
  '{"WiFi","Balcony","Kitchenette"}'::text [],
  'Family-friendly room with kitchenette and multiple beds.',
  '{"room-photos/room-10.avif","room-photos/room-11.avif","room-photos/room-12.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  4
FROM venues v
WHERE v.title = 'Mindful Mountain Retreat'
UNION ALL
SELECT v.id,
  'Eco Lodge',
  1,
  2,
  400,
  200,
  300,
  '$',
  '{"WiFi","Nature View","Private Deck"}'::text [],
  'Rustic eco-lodge cabin surrounded by nature.',
  '{"room-photos/room-13.avif","room-photos/room-14.avif","room-photos/room-15.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  5
FROM venues v
WHERE v.title = 'Mindful Mountain Retreat';
-- =====================================
-- Coastal Zen Retreat
-- =====================================
INSERT INTO rooms (
    venue_id,
    name,
    capacity_min,
    capacity_max,
    size_sqft,
    price_min,
    price_max,
    currency,
    amenities,
    description,
    photos,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  'Standard Room',
  1,
  2,
  250,
  100,
  150,
  '$',
  '{"WiFi","Balcony"}'::text [],
  'Cozy standard room with double bed.',
  '{"room-photos/room-16.avif","room-photos/room-17.avif","room-photos/room-18.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  1
FROM venues v
WHERE v.title = 'Coastal Zen Retreat'
UNION ALL
SELECT v.id,
  'Deluxe Room',
  1,
  3,
  350,
  180,
  250,
  '$',
  '{"WiFi","Balcony","Air Conditioning"}'::text [],
  'Spacious deluxe room with balcony and seating area.',
  '{"room-photos/room-19.avif","room-photos/room-20.avif","room-photos/room-21.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  2
FROM venues v
WHERE v.title = 'Coastal Zen Retreat'
UNION ALL
SELECT v.id,
  'Suite',
  1,
  4,
  500,
  300,
  450,
  '$',
  '{"WiFi","Balcony","Mini Bar","Jacuzzi"}'::text [],
  'Luxury suite with living area and private jacuzzi.',
  '{"room-photos/room-22.avif","room-photos/room-23.avif","room-photos/room-24.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  3
FROM venues v
WHERE v.title = 'Coastal Zen Retreat'
UNION ALL
SELECT v.id,
  'Family Room',
  2,
  5,
  600,
  250,
  350,
  '$',
  '{"WiFi","Balcony","Kitchenette"}'::text [],
  'Family-friendly room with kitchenette and multiple beds.',
  '{"room-photos/room-25.avif","room-photos/room-1.avif","room-photos/room-2.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  4
FROM venues v
WHERE v.title = 'Coastal Zen Retreat'
UNION ALL
SELECT v.id,
  'Eco Lodge',
  1,
  2,
  400,
  200,
  300,
  '$',
  '{"WiFi","Nature View","Private Deck"}'::text [],
  'Rustic eco-lodge cabin surrounded by nature.',
  '{"room-photos/room-3.avif","room-photos/room-4.avif","room-photos/room-5.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  5
FROM venues v
WHERE v.title = 'Coastal Zen Retreat';
-- =====================================
-- Desert Oasis Center
-- =====================================
INSERT INTO rooms (
    venue_id,
    name,
    capacity_min,
    capacity_max,
    size_sqft,
    price_min,
    price_max,
    currency,
    amenities,
    description,
    photos,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  'Standard Room',
  1,
  2,
  250,
  100,
  150,
  '$',
  '{"WiFi","Balcony"}'::text [],
  'Cozy standard room with double bed.',
  '{"room-photos/room-6.avif","room-photos/room-7.avif","room-photos/room-8.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  1
FROM venues v
WHERE v.title = 'Desert Oasis Center'
UNION ALL
SELECT v.id,
  'Deluxe Room',
  1,
  3,
  350,
  180,
  250,
  '$',
  '{"WiFi","Balcony","Air Conditioning"}'::text [],
  'Spacious deluxe room with balcony and seating area.',
  '{"room-photos/room-9.avif","room-photos/room-10.avif","room-photos/room-11.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  2
FROM venues v
WHERE v.title = 'Desert Oasis Center'
UNION ALL
SELECT v.id,
  'Suite',
  1,
  4,
  500,
  300,
  450,
  '$',
  '{"WiFi","Balcony","Mini Bar","Jacuzzi"}'::text [],
  'Luxury suite with living area and private jacuzzi.',
  '{"room-photos/room-12.avif","room-photos/room-13.avif","room-photos/room-14.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  3
FROM venues v
WHERE v.title = 'Desert Oasis Center'
UNION ALL
SELECT v.id,
  'Family Room',
  2,
  5,
  600,
  250,
  350,
  '$',
  '{"WiFi","Balcony","Kitchenette"}'::text [],
  'Family-friendly room with kitchenette and multiple beds.',
  '{"room-photos/room-15.avif","room-photos/room-16.avif","room-photos/room-17.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  4
FROM venues v
WHERE v.title = 'Desert Oasis Center'
UNION ALL
SELECT v.id,
  'Eco Lodge',
  1,
  2,
  400,
  200,
  300,
  '$',
  '{"WiFi","Nature View","Private Deck"}'::text [],
  'Rustic eco-lodge cabin surrounded by nature.',
  '{"room-photos/room-18.avif","room-photos/room-19.avif","room-photos/room-20.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  5
FROM venues v
WHERE v.title = 'Desert Oasis Center';
-- =====================================
-- Forest Healing Lodge
-- =====================================
INSERT INTO rooms (
    venue_id,
    name,
    capacity_min,
    capacity_max,
    size_sqft,
    price_min,
    price_max,
    currency,
    amenities,
    description,
    photos,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  'Standard Room',
  1,
  2,
  250,
  100,
  150,
  '$',
  '{"WiFi","Balcony"}'::text [],
  'Cozy standard room with double bed.',
  '{"room-photos/room-21.avif","room-photos/room-22.avif","room-photos/room-23.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  1
FROM venues v
WHERE v.title = 'Forest Healing Lodge'
UNION ALL
SELECT v.id,
  'Deluxe Room',
  1,
  3,
  350,
  180,
  250,
  '$',
  '{"WiFi","Balcony","Air Conditioning"}'::text [],
  'Spacious deluxe room with balcony and seating area.',
  '{"room-photos/room-24.avif","room-photos/room-25.avif","room-photos/room-1.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  2
FROM venues v
WHERE v.title = 'Forest Healing Lodge'
UNION ALL
SELECT v.id,
  'Suite',
  1,
  4,
  500,
  300,
  450,
  '$',
  '{"WiFi","Balcony","Mini Bar","Jacuzzi"}'::text [],
  'Luxury suite with living area and private jacuzzi.',
  '{"room-photos/room-2.avif","room-photos/room-3.avif","room-photos/room-4.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  3
FROM venues v
WHERE v.title = 'Forest Healing Lodge'
UNION ALL
SELECT v.id,
  'Family Room',
  2,
  5,
  600,
  250,
  350,
  '$',
  '{"WiFi","Balcony","Kitchenette"}'::text [],
  'Family-friendly room with kitchenette and multiple beds.',
  '{"room-photos/room-5.avif","room-photos/room-6.avif","room-photos/room-7.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  4
FROM venues v
WHERE v.title = 'Forest Healing Lodge'
UNION ALL
SELECT v.id,
  'Eco Lodge',
  1,
  2,
  400,
  200,
  300,
  '$',
  '{"WiFi","Nature View","Private Deck"}'::text [],
  'Rustic eco-lodge cabin surrounded by nature.',
  '{"room-photos/room-8.avif","room-photos/room-9.avif","room-photos/room-10.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  5
FROM venues v
WHERE v.title = 'Forest Healing Lodge';
-- =====================================
-- Island Paradise Retreat
-- =====================================
INSERT INTO rooms (
    venue_id,
    name,
    capacity_min,
    capacity_max,
    size_sqft,
    price_min,
    price_max,
    currency,
    amenities,
    description,
    photos,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  'Standard Room',
  1,
  2,
  250,
  100,
  150,
  '$',
  '{"WiFi","Balcony"}'::text [],
  'Cozy standard room with double bed.',
  '{"room-photos/room-11.avif","room-photos/room-12.avif","room-photos/room-13.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  1
FROM venues v
WHERE v.title = 'Island Paradise Retreat'
UNION ALL
SELECT v.id,
  'Deluxe Room',
  1,
  3,
  350,
  180,
  250,
  '$',
  '{"WiFi","Balcony","Air Conditioning"}'::text [],
  'Spacious deluxe room with balcony and seating area.',
  '{"room-photos/room-14.avif","room-photos/room-15.avif","room-photos/room-16.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  2
FROM venues v
WHERE v.title = 'Island Paradise Retreat'
UNION ALL
SELECT v.id,
  'Suite',
  1,
  4,
  500,
  300,
  450,
  '$',
  '{"WiFi","Balcony","Mini Bar","Jacuzzi"}'::text [],
  'Luxury suite with living area and private jacuzzi.',
  '{"room-photos/room-17.avif","room-photos/room-18.avif","room-photos/room-19.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  3
FROM venues v
WHERE v.title = 'Island Paradise Retreat'
UNION ALL
SELECT v.id,
  'Family Room',
  2,
  5,
  600,
  250,
  350,
  '$',
  '{"WiFi","Balcony","Kitchenette"}'::text [],
  'Family-friendly room with kitchenette and multiple beds.',
  '{"room-photos/room-20.avif","room-photos/room-21.avif","room-photos/room-22.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  4
FROM venues v
WHERE v.title = 'Island Paradise Retreat'
UNION ALL
SELECT v.id,
  'Eco Lodge',
  1,
  2,
  400,
  200,
  300,
  '$',
  '{"WiFi","Nature View","Private Deck"}'::text [],
  'Rustic eco-lodge cabin surrounded by nature.',
  '{"room-photos/room-23.avif","room-photos/room-24.avif","room-photos/room-25.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  5
FROM venues v
WHERE v.title = 'Island Paradise Retreat';
-- =====================================
-- Himalayan Bliss Center
-- =====================================
INSERT INTO rooms (
    venue_id,
    name,
    capacity_min,
    capacity_max,
    size_sqft,
    price_min,
    price_max,
    currency,
    amenities,
    description,
    photos,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  'Standard Room',
  1,
  2,
  250,
  100,
  150,
  '$',
  '{"WiFi","Balcony"}'::text [],
  'Cozy standard room with double bed.',
  '{"room-photos/room-1.avif","room-photos/room-2.avif","room-photos/room-3.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  1
FROM venues v
WHERE v.title = 'Himalayan Bliss Center'
UNION ALL
SELECT v.id,
  'Deluxe Room',
  1,
  3,
  350,
  180,
  250,
  '$',
  '{"WiFi","Balcony","Air Conditioning"}'::text [],
  'Spacious deluxe room with balcony and seating area.',
  '{"room-photos/room-4.avif","room-photos/room-5.avif","room-photos/room-6.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  2
FROM venues v
WHERE v.title = 'Himalayan Bliss Center'
UNION ALL
SELECT v.id,
  'Suite',
  1,
  4,
  500,
  300,
  450,
  '$',
  '{"WiFi","Balcony","Mini Bar","Jacuzzi"}'::text [],
  'Luxury suite with living area and private jacuzzi.',
  '{"room-photos/room-7.avif","room-photos/room-8.avif","room-photos/room-9.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  3
FROM venues v
WHERE v.title = 'Himalayan Bliss Center'
UNION ALL
SELECT v.id,
  'Family Room',
  2,
  5,
  600,
  250,
  350,
  '$',
  '{"WiFi","Balcony","Kitchenette"}'::text [],
  'Family-friendly room with kitchenette and multiple beds.',
  '{"room-photos/room-10.avif","room-photos/room-11.avif","room-photos/room-12.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  4
FROM venues v
WHERE v.title = 'Himalayan Bliss Center'
UNION ALL
SELECT v.id,
  'Eco Lodge',
  1,
  2,
  400,
  200,
  300,
  '$',
  '{"WiFi","Nature View","Private Deck"}'::text [],
  'Rustic eco-lodge cabin surrounded by nature.',
  '{"room-photos/room-13.avif","room-photos/room-14.avif","room-photos/room-15.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  5
FROM venues v
WHERE v.title = 'Himalayan Bliss Center';
-- =====================================
-- Mediterranean Wellness Villa
-- =====================================
INSERT INTO rooms (
    venue_id,
    name,
    capacity_min,
    capacity_max,
    size_sqft,
    price_min,
    price_max,
    currency,
    amenities,
    description,
    photos,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  'Standard Room',
  1,
  2,
  250,
  100,
  150,
  '$',
  '{"WiFi","Balcony"}'::text [],
  'Cozy standard room with double bed.',
  '{"room-photos/room-16.avif","room-photos/room-17.avif","room-photos/room-18.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  1
FROM venues v
WHERE v.title = 'Mediterranean Wellness Villa'
UNION ALL
SELECT v.id,
  'Deluxe Room',
  1,
  3,
  350,
  180,
  250,
  '$',
  '{"WiFi","Balcony","Air Conditioning"}'::text [],
  'Spacious deluxe room with balcony and seating area.',
  '{"room-photos/room-19.avif","room-photos/room-20.avif","room-photos/room-21.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  2
FROM venues v
WHERE v.title = 'Mediterranean Wellness Villa'
UNION ALL
SELECT v.id,
  'Suite',
  1,
  4,
  500,
  300,
  450,
  '$',
  '{"WiFi","Balcony","Mini Bar","Jacuzzi"}'::text [],
  'Luxury suite with living area and private jacuzzi.',
  '{"room-photos/room-22.avif","room-photos/room-23.avif","room-photos/room-24.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  3
FROM venues v
WHERE v.title = 'Mediterranean Wellness Villa'
UNION ALL
SELECT v.id,
  'Family Room',
  2,
  5,
  600,
  250,
  350,
  '$',
  '{"WiFi","Balcony","Kitchenette"}'::text [],
  'Family-friendly room with kitchenette and multiple beds.',
  '{"room-photos/room-25.avif","room-photos/room-1.avif","room-photos/room-2.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  4
FROM venues v
WHERE v.title = 'Mediterranean Wellness Villa'
UNION ALL
SELECT v.id,
  'Eco Lodge',
  1,
  2,
  400,
  200,
  300,
  '$',
  '{"WiFi","Nature View","Private Deck"}'::text [],
  'Rustic eco-lodge cabin surrounded by nature.',
  '{"room-photos/room-3.avif","room-photos/room-4.avif","room-photos/room-5.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  5
FROM venues v
WHERE v.title = 'Mediterranean Wellness Villa';
-- =====================================
-- Zen Garden Retreat
-- =====================================
INSERT INTO rooms (
    venue_id,
    name,
    capacity_min,
    capacity_max,
    size_sqft,
    price_min,
    price_max,
    currency,
    amenities,
    description,
    photos,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  'Standard Room',
  1,
  2,
  250,
  100,
  150,
  '$',
  '{"WiFi","Balcony"}'::text [],
  'Cozy standard room with double bed.',
  '{"room-photos/room-6.avif","room-photos/room-7.avif","room-photos/room-8.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  1
FROM venues v
WHERE v.title = 'Zen Garden Retreat'
UNION ALL
SELECT v.id,
  'Deluxe Room',
  1,
  3,
  350,
  180,
  250,
  '$',
  '{"WiFi","Balcony","Air Conditioning"}'::text [],
  'Spacious deluxe room with balcony and seating area.',
  '{"room-photos/room-9.avif","room-photos/room-10.avif","room-photos/room-11.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  2
FROM venues v
WHERE v.title = 'Zen Garden Retreat'
UNION ALL
SELECT v.id,
  'Suite',
  1,
  4,
  500,
  300,
  450,
  '$',
  '{"WiFi","Balcony","Mini Bar","Jacuzzi"}'::text [],
  'Luxury suite with living area and private jacuzzi.',
  '{"room-photos/room-12.avif","room-photos/room-13.avif","room-photos/room-14.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  3
FROM venues v
WHERE v.title = 'Zen Garden Retreat'
UNION ALL
SELECT v.id,
  'Family Room',
  2,
  5,
  600,
  250,
  350,
  '$',
  '{"WiFi","Balcony","Kitchenette"}'::text [],
  'Family-friendly room with kitchenette and multiple beds.',
  '{"room-photos/room-15.avif","room-photos/room-16.avif","room-photos/room-17.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  4
FROM venues v
WHERE v.title = 'Zen Garden Retreat'
UNION ALL
SELECT v.id,
  'Eco Lodge',
  1,
  2,
  400,
  200,
  300,
  '$',
  '{"WiFi","Nature View","Private Deck"}'::text [],
  'Rustic eco-lodge cabin surrounded by nature.',
  '{"room-photos/room-18.avif","room-photos/room-19.avif","room-photos/room-20.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  5
FROM venues v
WHERE v.title = 'Zen Garden Retreat';
-- =====================================
-- Tropical Healing Center
-- =====================================
INSERT INTO rooms (
    venue_id,
    name,
    capacity_min,
    capacity_max,
    size_sqft,
    price_min,
    price_max,
    currency,
    amenities,
    description,
    photos,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  'Standard Room',
  1,
  2,
  250,
  100,
  150,
  '$',
  '{"WiFi","Balcony"}'::text [],
  'Cozy standard room with double bed.',
  '{"room-photos/room-21.avif","room-photos/room-22.avif","room-photos/room-23.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  1
FROM venues v
WHERE v.title = 'Tropical Healing Center'
UNION ALL
SELECT v.id,
  'Deluxe Room',
  1,
  3,
  350,
  180,
  250,
  '$',
  '{"WiFi","Balcony","Air Conditioning"}'::text [],
  'Spacious deluxe room with balcony and seating area.',
  '{"room-photos/room-24.avif","room-photos/room-25.avif","room-photos/room-1.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  2
FROM venues v
WHERE v.title = 'Tropical Healing Center'
UNION ALL
SELECT v.id,
  'Suite',
  1,
  4,
  500,
  300,
  450,
  '$',
  '{"WiFi","Balcony","Mini Bar","Jacuzzi"}'::text [],
  'Luxury suite with living area and private jacuzzi.',
  '{"room-photos/room-2.avif","room-photos/room-3.avif","room-photos/room-4.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  3
FROM venues v
WHERE v.title = 'Tropical Healing Center'
UNION ALL
SELECT v.id,
  'Family Room',
  2,
  5,
  600,
  250,
  350,
  '$',
  '{"WiFi","Balcony","Kitchenette"}'::text [],
  'Family-friendly room with kitchenette and multiple beds.',
  '{"room-photos/room-5.avif","room-photos/room-6.avif","room-photos/room-7.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  4
FROM venues v
WHERE v.title = 'Tropical Healing Center'
UNION ALL
SELECT v.id,
  'Eco Lodge',
  1,
  2,
  400,
  200,
  300,
  '$',
  '{"WiFi","Nature View","Private Deck"}'::text [],
  'Rustic eco-lodge cabin surrounded by nature.',
  '{"room-photos/room-8.avif","room-photos/room-9.avif","room-photos/room-10.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  5
FROM venues v
WHERE v.title = 'Tropical Healing Center';
-- =====================================
-- Arctic Wellness Lodge
-- =====================================
INSERT INTO rooms (
    venue_id,
    name,
    capacity_min,
    capacity_max,
    size_sqft,
    price_min,
    price_max,
    currency,
    amenities,
    description,
    photos,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  'Standard Room',
  1,
  2,
  250,
  100,
  150,
  '$',
  '{"WiFi","Balcony"}'::text [],
  'Cozy standard room with double bed.',
  '{"room-photos/room-11.avif","room-photos/room-12.avif","room-photos/room-13.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  1
FROM venues v
WHERE v.title = 'Arctic Wellness Lodge'
UNION ALL
SELECT v.id,
  'Deluxe Room',
  1,
  3,
  350,
  180,
  250,
  '$',
  '{"WiFi","Balcony","Air Conditioning"}'::text [],
  'Spacious deluxe room with balcony and seating area.',
  '{"room-photos/room-14.avif","room-photos/room-15.avif","room-photos/room-16.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  2
FROM venues v
WHERE v.title = 'Arctic Wellness Lodge'
UNION ALL
SELECT v.id,
  'Suite',
  1,
  4,
  500,
  300,
  450,
  '$',
  '{"WiFi","Balcony","Mini Bar","Jacuzzi"}'::text [],
  'Luxury suite with living area and private jacuzzi.',
  '{"room-photos/room-17.avif","room-photos/room-18.avif","room-photos/room-19.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  3
FROM venues v
WHERE v.title = 'Arctic Wellness Lodge'
UNION ALL
SELECT v.id,
  'Family Room',
  2,
  5,
  600,
  250,
  350,
  '$',
  '{"WiFi","Balcony","Kitchenette"}'::text [],
  'Family-friendly room with kitchenette and multiple beds.',
  '{"room-photos/room-20.avif","room-photos/room-21.avif","room-photos/room-22.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  4
FROM venues v
WHERE v.title = 'Arctic Wellness Lodge'
UNION ALL
SELECT v.id,
  'Eco Lodge',
  1,
  2,
  400,
  200,
  300,
  '$',
  '{"WiFi","Nature View","Private Deck"}'::text [],
  'Rustic eco-lodge cabin surrounded by nature.',
  '{"room-photos/room-23.avif","room-photos/room-24.avif","room-photos/room-25.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  5
FROM venues v
WHERE v.title = 'Arctic Wellness Lodge';
-- =====================================
-- Desert Rose Sanctuary
-- =====================================
INSERT INTO rooms (
    venue_id,
    name,
    capacity_min,
    capacity_max,
    size_sqft,
    price_min,
    price_max,
    currency,
    amenities,
    description,
    photos,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  'Standard Room',
  1,
  2,
  250,
  100,
  150,
  '$',
  '{"WiFi","Balcony"}'::text [],
  'Cozy standard room with double bed.',
  '{"room-photos/room-1.avif","room-photos/room-2.avif","room-photos/room-3.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  1
FROM venues v
WHERE v.title = 'Desert Rose Sanctuary'
UNION ALL
SELECT v.id,
  'Deluxe Room',
  1,
  3,
  350,
  180,
  250,
  '$',
  '{"WiFi","Balcony","Air Conditioning"}'::text [],
  'Spacious deluxe room with balcony and seating area.',
  '{"room-photos/room-4.avif","room-photos/room-5.avif","room-photos/room-6.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  2
FROM venues v
WHERE v.title = 'Desert Rose Sanctuary'
UNION ALL
SELECT v.id,
  'Suite',
  1,
  4,
  500,
  300,
  450,
  '$',
  '{"WiFi","Balcony","Mini Bar","Jacuzzi"}'::text [],
  'Luxury suite with living area and private jacuzzi.',
  '{"room-photos/room-7.avif","room-photos/room-8.avif","room-photos/room-9.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  3
FROM venues v
WHERE v.title = 'Desert Rose Sanctuary'
UNION ALL
SELECT v.id,
  'Family Room',
  2,
  5,
  600,
  250,
  350,
  '$',
  '{"WiFi","Balcony","Kitchenette"}'::text [],
  'Family-friendly room with kitchenette and multiple beds.',
  '{"room-photos/room-10.avif","room-photos/room-11.avif","room-photos/room-12.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  4
FROM venues v
WHERE v.title = 'Desert Rose Sanctuary'
UNION ALL
SELECT v.id,
  'Eco Lodge',
  1,
  2,
  400,
  200,
  300,
  '$',
  '{"WiFi","Nature View","Private Deck"}'::text [],
  'Rustic eco-lodge cabin surrounded by nature.',
  '{"room-photos/room-13.avif","room-photos/room-14.avif","room-photos/room-15.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  5
FROM venues v
WHERE v.title = 'Desert Rose Sanctuary';
-- =====================================
-- Kyoto Zen House
-- =====================================
INSERT INTO rooms (
    venue_id,
    name,
    capacity_min,
    capacity_max,
    size_sqft,
    price_min,
    price_max,
    currency,
    amenities,
    description,
    photos,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  'Standard Room',
  1,
  2,
  250,
  100,
  150,
  '$',
  '{"WiFi","Balcony"}'::text [],
  'Cozy standard room with double bed.',
  '{"room-photos/room-16.avif","room-photos/room-17.avif","room-photos/room-18.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  1
FROM venues v
WHERE v.title = 'Kyoto Zen House'
UNION ALL
SELECT v.id,
  'Deluxe Room',
  1,
  3,
  350,
  180,
  250,
  '$',
  '{"WiFi","Balcony","Air Conditioning"}'::text [],
  'Spacious deluxe room with balcony and seating area.',
  '{"room-photos/room-19.avif","room-photos/room-20.avif","room-photos/room-21.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  2
FROM venues v
WHERE v.title = 'Kyoto Zen House'
UNION ALL
SELECT v.id,
  'Suite',
  1,
  4,
  500,
  300,
  450,
  '$',
  '{"WiFi","Balcony","Mini Bar","Jacuzzi"}'::text [],
  'Luxury suite with living area and private jacuzzi.',
  '{"room-photos/room-22.avif","room-photos/room-23.avif","room-photos/room-24.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  3
FROM venues v
WHERE v.title = 'Kyoto Zen House'
UNION ALL
SELECT v.id,
  'Family Room',
  2,
  5,
  600,
  250,
  350,
  '$',
  '{"WiFi","Balcony","Kitchenette"}'::text [],
  'Family-friendly room with kitchenette and multiple beds.',
  '{"room-photos/room-25.avif","room-photos/room-1.avif","room-photos/room-2.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  4
FROM venues v
WHERE v.title = 'Kyoto Zen House'
UNION ALL
SELECT v.id,
  'Eco Lodge',
  1,
  2,
  400,
  200,
  300,
  '$',
  '{"WiFi","Nature View","Private Deck"}'::text [],
  'Rustic eco-lodge cabin surrounded by nature.',
  '{"room-photos/room-3.avif","room-photos/room-4.avif","room-photos/room-5.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  5
FROM venues v
WHERE v.title = 'Kyoto Zen House';
-- =====================================
-- Mountain Spirit Lodge
-- =====================================
INSERT INTO rooms (
    venue_id,
    name,
    capacity_min,
    capacity_max,
    size_sqft,
    price_min,
    price_max,
    currency,
    amenities,
    description,
    photos,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  'Standard Room',
  1,
  2,
  250,
  100,
  150,
  '$',
  '{"WiFi","Balcony"}'::text [],
  'Cozy standard room with double bed.',
  '{"room-photos/room-6.avif","room-photos/room-7.avif","room-photos/room-8.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  1
FROM venues v
WHERE v.title = 'Mountain Spirit Lodge'
UNION ALL
SELECT v.id,
  'Deluxe Room',
  1,
  3,
  350,
  180,
  250,
  '$',
  '{"WiFi","Balcony","Air Conditioning"}'::text [],
  'Spacious deluxe room with balcony and seating area.',
  '{"room-photos/room-9.avif","room-photos/room-10.avif","room-photos/room-11.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  2
FROM venues v
WHERE v.title = 'Mountain Spirit Lodge'
UNION ALL
SELECT v.id,
  'Suite',
  1,
  4,
  500,
  300,
  450,
  '$',
  '{"WiFi","Balcony","Mini Bar","Jacuzzi"}'::text [],
  'Luxury suite with living area and private jacuzzi.',
  '{"room-photos/room-12.avif","room-photos/room-13.avif","room-photos/room-14.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  3
FROM venues v
WHERE v.title = 'Mountain Spirit Lodge'
UNION ALL
SELECT v.id,
  'Family Room',
  2,
  5,
  600,
  250,
  350,
  '$',
  '{"WiFi","Balcony","Kitchenette"}'::text [],
  'Family-friendly room with kitchenette and multiple beds.',
  '{"room-photos/room-15.avif","room-photos/room-16.avif","room-photos/room-17.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  4
FROM venues v
WHERE v.title = 'Mountain Spirit Lodge'
UNION ALL
SELECT v.id,
  'Eco Lodge',
  1,
  2,
  400,
  200,
  300,
  '$',
  '{"WiFi","Nature View","Private Deck"}'::text [],
  'Rustic eco-lodge cabin surrounded by nature.',
  '{"room-photos/room-18.avif","room-photos/room-19.avif","room-photos/room-20.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  5
FROM venues v
WHERE v.title = 'Mountain Spirit Lodge';
-- =====================================
-- Ocean Spirit Center
-- =====================================
INSERT INTO rooms (
    venue_id,
    name,
    capacity_min,
    capacity_max,
    size_sqft,
    price_min,
    price_max,
    currency,
    amenities,
    description,
    photos,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  'Standard Room',
  1,
  2,
  250,
  100,
  150,
  '$',
  '{"WiFi","Balcony"}'::text [],
  'Cozy standard room with double bed.',
  '{"room-photos/room-21.avif","room-photos/room-22.avif","room-photos/room-23.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  1
FROM venues v
WHERE v.title = 'Ocean Spirit Center'
UNION ALL
SELECT v.id,
  'Deluxe Room',
  1,
  3,
  350,
  180,
  250,
  '$',
  '{"WiFi","Balcony","Air Conditioning"}'::text [],
  'Spacious deluxe room with balcony and seating area.',
  '{"room-photos/room-24.avif","room-photos/room-25.avif","room-photos/room-1.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  2
FROM venues v
WHERE v.title = 'Ocean Spirit Center'
UNION ALL
SELECT v.id,
  'Suite',
  1,
  4,
  500,
  300,
  450,
  '$',
  '{"WiFi","Balcony","Mini Bar","Jacuzzi"}'::text [],
  'Luxury suite with living area and private jacuzzi.',
  '{"room-photos/room-2.avif","room-photos/room-3.avif","room-photos/room-4.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  3
FROM venues v
WHERE v.title = 'Ocean Spirit Center'
UNION ALL
SELECT v.id,
  'Family Room',
  2,
  5,
  600,
  250,
  350,
  '$',
  '{"WiFi","Balcony","Kitchenette"}'::text [],
  'Family-friendly room with kitchenette and multiple beds.',
  '{"room-photos/room-5.avif","room-photos/room-6.avif","room-photos/room-7.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  4
FROM venues v
WHERE v.title = 'Ocean Spirit Center'
UNION ALL
SELECT v.id,
  'Eco Lodge',
  1,
  2,
  400,
  200,
  300,
  '$',
  '{"WiFi","Nature View","Private Deck"}'::text [],
  'Rustic eco-lodge cabin surrounded by nature.',
  '{"room-photos/room-8.avif","room-photos/room-9.avif","room-photos/room-10.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  5
FROM venues v
WHERE v.title = 'Ocean Spirit Center';
-- =====================================
-- Forest Wisdom Retreat
-- =====================================
INSERT INTO rooms (
    venue_id,
    name,
    capacity_min,
    capacity_max,
    size_sqft,
    price_min,
    price_max,
    currency,
    amenities,
    description,
    photos,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  'Standard Room',
  1,
  2,
  250,
  100,
  150,
  '$',
  '{"WiFi","Balcony"}'::text [],
  'Cozy standard room with double bed.',
  '{"room-photos/room-11.avif","room-photos/room-12.avif","room-photos/room-13.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  1
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'Deluxe Room',
  1,
  3,
  350,
  180,
  250,
  '$',
  '{"WiFi","Balcony","Air Conditioning"}'::text [],
  'Spacious deluxe room with balcony and seating area.',
  '{"room-photos/room-14.avif","room-photos/room-15.avif","room-photos/room-16.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  2
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'Suite',
  1,
  4,
  500,
  300,
  450,
  '$',
  '{"WiFi","Balcony","Mini Bar","Jacuzzi"}'::text [],
  'Luxury suite with living area and private jacuzzi.',
  '{"room-photos/room-17.avif","room-photos/room-18.avif","room-photos/room-19.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  3
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'Family Room',
  2,
  5,
  600,
  250,
  350,
  '¥',
  '{"WiFi","Balcony","Kitchenette"}'::text [],
  'Family-friendly room with kitchenette and multiple beds.',
  '{"room-photos/room-20.avif","room-photos/room-21.avif","room-photos/room-22.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  4
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'Eco Lodge',
  1,
  2,
  400,
  200,
  300,
  '¥',
  '{"WiFi","Nature View","Private Deck"}'::text [],
  'Rustic eco-lodge cabin surrounded by nature.',
  '{"room-photos/room-23.avif","room-photos/room-24.avif","room-photos/room-25.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  5
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat';
-- =====================================
-- Sky High Sanctuary
-- =====================================
INSERT INTO rooms (
    venue_id,
    name,
    capacity_min,
    capacity_max,
    size_sqft,
    price_min,
    price_max,
    currency,
    amenities,
    description,
    photos,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  'Standard Room',
  1,
  2,
  250,
  100,
  150,
  '¥',
  '{"WiFi","Balcony"}'::text [],
  'Cozy standard room with double bed.',
  '{"room-photos/room-1.avif","room-photos/room-2.avif","room-photos/room-3.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  1
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'Deluxe Room',
  1,
  3,
  350,
  180,
  250,
  '$',
  '{"WiFi","Balcony","Air Conditioning"}'::text [],
  'Spacious deluxe room with balcony and seating area.',
  '{"room-photos/room-4.avif","room-photos/room-5.avif","room-photos/room-6.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  2
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'Suite',
  1,
  4,
  500,
  300,
  450,
  '$',
  '{"WiFi","Balcony","Mini Bar","Jacuzzi"}'::text [],
  'Luxury suite with living area and private jacuzzi.',
  '{"room-photos/room-7.avif","room-photos/room-8.avif","room-photos/room-9.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  3
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'Family Room',
  2,
  5,
  600,
  250,
  350,
  '$',
  '{"WiFi","Balcony","Kitchenette"}'::text [],
  'Family-friendly room with kitchenette and multiple beds.',
  '{"room-photos/room-10.avif","room-photos/room-11.avif","room-photos/room-12.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  4
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'Eco Lodge',
  1,
  2,
  400,
  200,
  300,
  '$',
  '{"WiFi","Nature View","Private Deck"}'::text [],
  'Rustic eco-lodge cabin surrounded by nature.',
  '{"room-photos/room-13.avif","room-photos/room-14.avif","room-photos/room-15.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  5
FROM venues v
WHERE v.title = 'Sky High Sanctuary';
-- =====================================
-- Valley of Peace
-- =====================================
INSERT INTO rooms (
    venue_id,
    name,
    capacity_min,
    capacity_max,
    size_sqft,
    price_min,
    price_max,
    currency,
    amenities,
    description,
    photos,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  'Standard Room',
  1,
  2,
  250,
  100,
  150,
  '$',
  '{"WiFi","Balcony"}'::text [],
  'Cozy standard room with double bed.',
  '{"room-photos/room-16.avif","room-photos/room-17.avif","room-photos/room-18.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  1
FROM venues v
WHERE v.title = 'Valley of Peace'
UNION ALL
SELECT v.id,
  'Deluxe Room',
  1,
  3,
  350,
  180,
  250,
  '$',
  '{"WiFi","Balcony","Air Conditioning"}'::text [],
  'Spacious deluxe room with balcony and seating area.',
  '{"room-photos/room-19.avif","room-photos/room-20.avif","room-photos/room-21.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  2
FROM venues v
WHERE v.title = 'Valley of Peace'
UNION ALL
SELECT v.id,
  'Suite',
  1,
  4,
  500,
  300,
  450,
  '$',
  '{"WiFi","Balcony","Mini Bar","Jacuzzi"}'::text [],
  'Luxury suite with living area and private jacuzzi.',
  '{"room-photos/room-22.avif","room-photos/room-23.avif","room-photos/room-24.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  3
FROM venues v
WHERE v.title = 'Valley of Peace'
UNION ALL
SELECT v.id,
  'Family Room',
  2,
  5,
  600,
  250,
  350,
  '$',
  '{"WiFi","Balcony","Kitchenette"}'::text [],
  'Family-friendly room with kitchenette and multiple beds.',
  '{"room-photos/room-25.avif","room-photos/room-1.avif","room-photos/room-2.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  4
FROM venues v
WHERE v.title = 'Valley of Peace'
UNION ALL
SELECT v.id,
  'Eco Lodge',
  1,
  2,
  400,
  200,
  300,
  '$',
  '{"WiFi","Nature View","Private Deck"}'::text [],
  'Rustic eco-lodge cabin surrounded by nature.',
  '{"room-photos/room-3.avif","room-photos/room-4.avif","room-photos/room-5.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  5
FROM venues v
WHERE v.title = 'Valley of Peace';
-- =====================================
-- Crystal Healing Center
-- =====================================
INSERT INTO rooms (
    venue_id,
    name,
    capacity_min,
    capacity_max,
    size_sqft,
    price_min,
    price_max,
    currency,
    amenities,
    description,
    photos,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  'Standard Room',
  1,
  2,
  250,
  100,
  150,
  '$',
  '{"WiFi","Balcony"}'::text [],
  'Cozy standard room with double bed.',
  '{"room-photos/room-6.avif","room-photos/room-7.avif","room-photos/room-8.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  1
FROM venues v
WHERE v.title = 'Crystal Healing Center'
UNION ALL
SELECT v.id,
  'Deluxe Room',
  1,
  3,
  350,
  180,
  250,
  '$',
  '{"WiFi","Balcony","Air Conditioning"}'::text [],
  'Spacious deluxe room with balcony and seating area.',
  '{"room-photos/room-9.avif","room-photos/room-10.avif","room-photos/room-11.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  2
FROM venues v
WHERE v.title = 'Crystal Healing Center'
UNION ALL
SELECT v.id,
  'Suite',
  1,
  4,
  500,
  300,
  450,
  '¥',
  '{"WiFi","Balcony","Mini Bar","Jacuzzi"}'::text [],
  'Luxury suite with living area and private jacuzzi.',
  '{"room-photos/room-12.avif","room-photos/room-13.avif","room-photos/room-14.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  3
FROM venues v
WHERE v.title = 'Crystal Healing Center'
UNION ALL
SELECT v.id,
  'Family Room',
  2,
  5,
  600,
  250,
  350,
  '$',
  '{"WiFi","Balcony","Kitchenette"}'::text [],
  'Family-friendly room with kitchenette and multiple beds.',
  '{"room-photos/room-15.avif","room-photos/room-16.avif","room-photos/room-17.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  4
FROM venues v
WHERE v.title = 'Crystal Healing Center'
UNION ALL
SELECT v.id,
  'Eco Lodge',
  1,
  2,
  400,
  200,
  300,
  '$',
  '{"WiFi","Nature View","Private Deck"}'::text [],
  'Rustic eco-lodge cabin surrounded by nature.',
  '{"room-photos/room-18.avif","room-photos/room-19.avif","room-photos/room-20.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  5
FROM venues v
WHERE v.title = 'Crystal Healing Center';
-- =====================================
-- Sunrise Wellness Resort
-- =====================================
INSERT INTO rooms (
    venue_id,
    name,
    capacity_min,
    capacity_max,
    size_sqft,
    price_min,
    price_max,
    currency,
    amenities,
    description,
    photos,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  'Standard Room',
  1,
  2,
  250,
  100,
  150,
  '$',
  '{"WiFi","Balcony"}'::text [],
  'Cozy standard room with double bed.',
  '{"room-photos/room-21.avif","room-photos/room-22.avif","room-photos/room-23.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  1
FROM venues v
WHERE v.title = 'Sunrise Wellness Resort'
UNION ALL
SELECT v.id,
  'Deluxe Room',
  1,
  3,
  350,
  180,
  250,
  '$',
  '{"WiFi","Balcony","Air Conditioning"}'::text [],
  'Spacious deluxe room with balcony and seating area.',
  '{"room-photos/room-24.avif","room-photos/room-25.avif","room-photos/room-1.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  2
FROM venues v
WHERE v.title = 'Sunrise Wellness Resort'
UNION ALL
SELECT v.id,
  'Suite',
  1,
  4,
  500,
  300,
  450,
  '¥',
  '{"WiFi","Balcony","Mini Bar","Jacuzzi"}'::text [],
  'Luxury suite with living area and private jacuzzi.',
  '{"room-photos/room-2.avif","room-photos/room-3.avif","room-photos/room-4.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  3
FROM venues v
WHERE v.title = 'Sunrise Wellness Resort'
UNION ALL
SELECT v.id,
  'Family Room',
  2,
  5,
  600,
  250,
  350,
  '$',
  '{"WiFi","Balcony","Kitchenette"}'::text [],
  'Family-friendly room with kitchenette and multiple beds.',
  '{"room-photos/room-5.avif","room-photos/room-6.avif","room-photos/room-7.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  4
FROM venues v
WHERE v.title = 'Sunrise Wellness Resort'
UNION ALL
SELECT v.id,
  'Eco Lodge',
  1,
  2,
  400,
  200,
  300,
  '£',
  '{"WiFi","Nature View","Private Deck"}'::text [],
  'Rustic eco-lodge cabin surrounded by nature.',
  '{"room-photos/room-8.avif","room-photos/room-9.avif","room-photos/room-10.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  5
FROM venues v
WHERE v.title = 'Sunrise Wellness Resort';
-- =====================================
-- Riviera Wellness Villa
-- =====================================
INSERT INTO rooms (
    venue_id,
    name,
    capacity_min,
    capacity_max,
    size_sqft,
    price_min,
    price_max,
    currency,
    amenities,
    description,
    photos,
    billing_unit,
    note,
    sort_order
  )
SELECT v.id,
  'Standard Room',
  1,
  2,
  250,
  100,
  150,
  '£',
  '{"WiFi","Balcony"}'::text [],
  'Cozy standard room with double bed.',
  '{"room-photos/room-11.avif","room-photos/room-12.avif","room-photos/room-13.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  1
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'Deluxe Room',
  1,
  3,
  350,
  180,
  250,
  '£',
  '{"WiFi","Balcony","Air Conditioning"}'::text [],
  'Spacious deluxe room with balcony and seating area.',
  '{"room-photos/room-14.avif","room-photos/room-15.avif","room-photos/room-16.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  2
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'Suite',
  1,
  4,
  500,
  300,
  450,
  '£',
  '{"WiFi","Balcony","Mini Bar","Jacuzzi"}'::text [],
  'Luxury suite with living area and private jacuzzi.',
  '{"room-photos/room-17.avif","room-photos/room-18.avif","room-photos/room-19.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  3
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'Family Room',
  2,
  5,
  600,
  250,
  350,
  '$',
  '{"WiFi","Balcony","Kitchenette"}'::text [],
  'Family-friendly room with kitchenette and multiple beds.',
  '{"room-photos/room-20.avif","room-photos/room-21.avif","room-photos/room-22.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  4
FROM venues v
WHERE v.title = 'Riviera Wellness Villa'
UNION ALL
SELECT v.id,
  'Eco Lodge',
  1,
  2,
  400,
  200,
  300,
  '£',
  '{"WiFi","Nature View","Private Deck"}'::text [],
  'Rustic eco-lodge cabin surrounded by nature.',
  '{"room-photos/room-23.avif","room-photos/room-24.avif","room-photos/room-25.avif"}'::text [],
  'per_person/night',
  'Rates vary by season and booking length',
  5
FROM venues v
WHERE v.title = 'Riviera Wellness Villa';
--insert site copy
INSERT INTO site_copy (key, blocks)
VALUES (
    'why_facilitators_love_us',
    '[
      { "title": "Secure contracts & escrow", "text": "Protected payments and professional agreements" },
      { "title": "Save 50+ hours of planning", "text": "Full-service support from booking to checkout" },
      { "title": "Verified by real retreat leaders", "text": "Trusted by 200+ successful facilitators" },
      { "title": "Repeat-ready bookings", "text": "Streamlined rebooking for returning groups" }
    ]'::jsonb
  ),
  (
    'special_policies',
    '[
      { "title": "Travel Insurance", "text": "Guests are strongly encouraged to purchase travel insurance to cover unexpected cancellations, medical emergencies, or travel disruptions.", "icon": {"library": "lucide-react", "name": "shield"} },
      { "title": "Force Majeure", "text": "In the event of natural disasters, pandemics, or other circumstances beyond our control, the retreat reserves the right to reschedule or cancel bookings without liability.", "icon": {"library": "lucide-react", "name": "triangle-alert"} },
      { "title": "Rescheduling Policy", "text": "Bookings may be rescheduled up to 30 days before the retreat start date, subject to availability.", "icon": {"library": "lucide-react", "name": "refresh-cw"} },
      { "title": "Group Size", "text": "Minimum 10 participants are required. Maximum group size is 25 participants.", "icon": {"library": "lucide-react", "name": "clock"} }
    ]'::jsonb
  ),
  (
    'included',
    '[
      { "title": "Professional retreat coordination" },
      { "title": "All organic meals (breakfast, lunch, dinner)" },
      { "title": "Use of yoga shala and meditation spaces" },
      { "title": "Accommodation for up to 25 participants" },
      { "title": "High-speed Wi-Fi throughout property" },
      { "title": "Professional AV equipment and sound system" },
      { "title": "24/7 on-site staff support" },
      { "title": "Airport transfer coordination" },
      { "title": "Complimentary bicycle rental" },
      { "title": "Use of all common areas and terraces" },
      { "title": "Photography assistance for group photos "}
    ]'::jsonb
  ),
  (
    'excluded',
    '[
      { "title": "International flights to/from Bali" },
      { "title": "Visa fees and travel insurance" },
      { "title": "Personal spa treatments and massages" },
      { "title": "Alcoholic beverages (available for purchase)" },
      { "title": "Personal retreat facilitator or teacher" },
      { "title": "Private chef services (available on request)" },
      { "title": "Laundry services (available for fee)" },
      { "title": "Travel to local attractions and temples" },
      { "title": "Tips and gratuities for staff" },
      { "title": "Personal travel guide services" },
      { "title": "Extended accommodation beyond retreat dates "}
    ]'::jsonb
  ) ON CONFLICT (key) DO
UPDATE
SET blocks = EXCLUDED.blocks;