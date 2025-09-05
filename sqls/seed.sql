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
-- Insert venues (25 retreat centers) - Let Supabase generate UUIDs
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
    instagram_url
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
  180,
  320,
  'per_night'::price_code,
  8500,
  8,
  6,
  'https://serenityhills.com',
  'https://google.com'
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
  120,
  250,
  'per_night'::price_code,
  12000,
  12,
  8,
  'https://mountainviewsanctuary.com',
  'https://google.com'
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
  250,
  450,
  'per_night'::price_code,
  6500,
  6,
  4,
  'https://oceanblissretreat.com',
  'https://google.com'
FROM venue_types vt
WHERE vt.name = 'Ashram / Monastery'
UNION ALL
-- 4. Alpine Wellness Lodge
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Alpine Wellness Lodge',
  'Luxurious mountain retreat in the French Alps offering world-class spa treatments, gourmet dining, and breathtaking alpine views. Perfect for both relaxation and adventure.',
  'rejected'::venue_status,
  'France',
  'Chamonix',
  '123 Chemin des Aiguilles, Chamonix-Mont-Blanc',
  45.9237,
  6.8694,
  20,
  30,
  350,
  650,
  'per_night'::price_code,
  15000,
  10,
  8,
  'https://alpinewellness.com',
  'https://google.com'
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 5. Sacred Valley Sanctuary
SELECT '22222222-2222-2222-2222-222222222222'::uuid,
  vt.id,
  'Sacred Valley Sanctuary',
  'Immerse yourself in the mystical energy of the Sacred Valley. This retreat combines ancient Incan wisdom with modern wellness practices in a stunning mountain setting.',
  'draft'::venue_status,
  'Peru',
  'Ollantaytambo',
  'Camino Inca, Ollantaytambo, Cusco',
  -13.2583,
  -72.2647,
  10,
  18,
  200,
  380,
  'per_night'::price_code,
  8000,
  5,
  3,
  'https://sacredvalleysanctuary.com',
  'https://google.com'
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 6. Mindful Mountain Retreat
SELECT '22222222-2222-2222-2222-222222222222'::uuid,
  vt.id,
  'Mindful Mountain Retreat',
  'Authentic ashram experience in the foothills of the Himalayas. Learn traditional yoga, meditation, and Ayurvedic practices from certified masters.',
  'draft'::venue_status,
  'India',
  'Rishikesh',
  'Neelkanth Road, Rishikesh, Uttarakhand',
  30.0869,
  78.2676,
  15,
  24,
  120,
  250,
  'per_night'::price_code,
  9000,
  7,
  5,
  'https://mindfulmountain.com',
  'https://google.com'
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 7. Coastal Zen Retreat
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Coastal Zen Retreat',
  'Peaceful coastal retreat combining Japanese Zen philosophy with beachfront luxury. Experience traditional tea ceremonies, meditation, and ocean-inspired wellness programs.',
  'published'::venue_status,
  'Mexico',
  'Puerto Escondido',
  'Playa Carrizalillo, Puerto Escondido',
  15.8500,
  -97.0667,
  8,
  15,
  180,
  320,
  'per_night'::price_code,
  5000,
  4,
  3,
  'https://coastalzen.com',
  'https://google.com'
FROM venue_types vt
WHERE vt.name = 'Ashram / Monastery'
UNION ALL
-- 8. Desert Oasis Center
SELECT '22222222-2222-2222-2222-222222222222'::uuid,
  vt.id,
  'Desert Oasis Center',
  'Transformative retreat in the heart of the desert offering unique experiences like stargazing meditation, desert yoga, and spiritual ceremonies under the vast sky.',
  'published'::venue_status,
  'Morocco',
  'Marrakech',
  'Route de l''Ourika, Marrakech',
  31.6295,
  -7.9811,
  12,
  20,
  150,
  280,
  'per_night'::price_code,
  7000,
  6,
  4,
  'https://desertoasis.com',
  'https://google.com'
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 9. Forest Healing Lodge
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Forest Healing Lodge',
  'Nestled in ancient forests, this lodge offers forest bathing, nature therapy, and eco-friendly accommodation. Perfect for reconnecting with nature and finding inner peace.',
  'rejected'::venue_status,
  'Canada',
  'Whistler',
  '123 Forest Road, Whistler, BC',
  50.1163,
  -122.9574,
  10,
  18,
  200,
  350,
  'per_night'::price_code,
  6000,
  5,
  4,
  'https://foresthealing.com',
  'https://google.com'
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 10. Island Paradise Retreat
SELECT '44444444-4444-4444-4444-444444444444',
  vt.id,
  'Island Paradise Retreat',
  'Exclusive island retreat offering overwater bungalows, marine activities, and tropical wellness programs. Experience ultimate luxury in a pristine island setting.',
  'draft'::venue_status,
  'Maldives',
  'Maafushi',
  'Maafushi Island, Kaafu Atoll',
  3.2028,
  73.2207,
  6,
  12,
  400,
  800,
  'per_night'::price_code,
  8000,
  4,
  3,
  'https://islandparadise.com',
  'https://google.com'
FROM venue_types vt
WHERE vt.name = 'Ashram / Monastery'
UNION ALL
-- 11. Himalayan Bliss Center
SELECT '44444444-4444-4444-4444-444444444444',
  vt.id,
  'Himalayan Bliss Center',
  'High-altitude retreat in the Himalayas offering advanced yoga practices, meditation techniques, and spiritual teachings from Tibetan masters.',
  'draft'::venue_status,
  'Nepal',
  'Pokhara',
  'Lakeside, Pokhara, Nepal',
  28.2096,
  83.9856,
  15,
  25,
  100,
  200,
  'per_night'::price_code,
  7500,
  8,
  6,
  'https://himalayanbliss.com',
  'https://google.com'
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 12. Mediterranean Wellness Villa
SELECT '44444444-4444-4444-4444-444444444444',
  vt.id,
  'Mediterranean Wellness Villa',
  'Luxurious villa overlooking the Mediterranean Sea offering personalized wellness programs, gourmet Mediterranean cuisine, and private beach access.',
  'published'::venue_status,
  'Greece',
  'Santorini',
  'Oia, Santorini, Greece',
  36.4621,
  25.3761,
  8,
  16,
  300,
  550,
  'per_night'::price_code,
  10000,
  6,
  5,
  'https://mediterraneanwellness.com',
  'https://google.com'
FROM venue_types vt
WHERE vt.name = 'Ashram / Monastery'
UNION ALL
-- 13. Zen Garden Retreat
SELECT '22222222-2222-2222-2222-222222222222'::uuid,
  vt.id,
  'Zen Garden Retreat',
  'Traditional Japanese-style retreat featuring authentic Zen gardens, tea ceremonies, and mindfulness practices in a serene mountain setting.',
  'published'::venue_status,
  'Japan',
  'Kyoto',
  'Arashiyama, Kyoto, Japan',
  35.0094,
  135.6772,
  6,
  12,
  250,
  450,
  'per_night'::price_code,
  4000,
  3,
  2,
  'https://zengardenretreat.com',
  'https://google.com'
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 14. Tropical Healing Center
SELECT '22222222-2222-2222-2222-222222222222'::uuid,
  vt.id,
  'Tropical Healing Center',
  'Holistic healing center in the tropics offering traditional healing practices, organic farming, and sustainable living workshops.',
  'published'::venue_status,
  'Costa Rica',
  'Nosara',
  'Playa Guiones, Nosara, Guanacaste',
  9.9281,
  -85.6508,
  20,
  35,
  150,
  280,
  'per_night'::price_code,
  12000,
  10,
  8,
  'https://tropicalhealing.com',
  'https://google.com'
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 15. Arctic Wellness Lodge
SELECT '44444444-4444-4444-4444-444444444444',
  vt.id,
  'Arctic Wellness Lodge',
  'Unique wellness experience in the Arctic offering northern lights viewing, ice meditation, and traditional Sami healing practices.',
  'published'::venue_status,
  'Norway',
  'Tromsø',
  'Tromsø, Norway',
  69.6492,
  18.9553,
  8,
  15,
  350,
  600,
  'per_night'::price_code,
  8000,
  5,
  4,
  'https://arcticwellness.com',
  'https://google.com'
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 16. Desert Rose Sanctuary
SELECT '22222222-2222-2222-2222-222222222222',
  vt.id,
  'Desert Rose Sanctuary',
  'Spiritual retreat in the heart of the desert offering Sufi practices, desert meditation, and traditional Middle Eastern healing.',
  'published'::venue_status,
  'Jordan',
  'Wadi Rum',
  'Wadi Rum Protected Area, Jordan',
  29.5803,
  35.4192,
  10,
  18,
  120,
  220,
  'per_night'::price_code,
  6000,
  6,
  4,
  'https://desertrose.com',
  'https://google.com'
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 17. Mountain Spirit Lodge
SELECT '22222222-2222-2222-2222-222222222222',
  vt.id,
  'Mountain Spirit Lodge',
  'High-altitude lodge offering Andean spiritual practices, mountain meditation, and traditional Peruvian healing ceremonies.',
  'published'::venue_status,
  'Peru',
  'Cusco',
  'Sacred Valley, Cusco, Peru',
  -13.5167,
  -71.9789,
  12,
  20,
  180,
  320,
  'per_night'::price_code,
  7000,
  7,
  5,
  'https://mountainspirit.com',
  'https://google.com'
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 18. Ocean Spirit Center
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Ocean Spirit Center',
  'Oceanfront center specializing in marine therapy, water meditation, and coastal wellness programs with certified marine therapists.',
  'published'::venue_status,
  'Australia',
  'Byron Bay',
  'Byron Bay, New South Wales',
  -28.6474,
  153.6020,
  15,
  25,
  220,
  380,
  'per_night'::price_code,
  9000,
  8,
  6,
  'https://oceanspirit.com',
  'https://google.com'
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 19. Forest Wisdom Retreat
SELECT '22222222-2222-2222-2222-222222222222'::uuid,
  vt.id,
  'Forest Wisdom Retreat',
  'Ancient forest retreat offering shamanic practices, nature connection workshops, and traditional forest healing ceremonies.',
  'published'::venue_status,
  'Brazil',
  'Chapada dos Veadeiros',
  'Chapada dos Veadeiros, Goiás',
  -14.2350,
  -47.8113,
  8,
  15,
  100,
  180,
  'per_night'::price_code,
  5000,
  4,
  3,
  'https://forestwisdom.com',
  'https://google.com'
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 20. Sky High Sanctuary
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Sky High Sanctuary',
  'Mountain-top sanctuary offering high-altitude yoga, cloud meditation, and panoramic mountain views for ultimate spiritual elevation.',
  'published'::venue_status,
  'Switzerland',
  'Zermatt',
  'Zermatt, Valais, Switzerland',
  46.0207,
  7.7491,
  6,
  12,
  400,
  700,
  'per_night'::price_code,
  6000,
  4,
  3,
  'https://skyhighsanctuary.com',
  'https://google.com'
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 21. Valley of Peace
SELECT '22222222-2222-2222-2222-222222222222'::uuid,
  vt.id,
  'Valley of Peace',
  'Peaceful valley retreat offering silent meditation, peace workshops, and conflict resolution programs in a serene natural setting.',
  'published'::venue_status,
  'India',
  'Dharamshala',
  'McLeod Ganj, Dharamshala, Himachal Pradesh',
  32.2190,
  76.3234,
  20,
  30,
  80,
  150,
  'per_night'::price_code,
  10000,
  12,
  8,
  'https://valleyofpeace.com',
  'https://google.com'
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 22. Crystal Healing Center
SELECT '22222222-2222-2222-2222-222222222222'::uuid,
  vt.id,
  'Crystal Healing Center',
  'Specialized center offering crystal therapy, energy healing, and vibrational medicine in a crystal-rich environment.',
  'published'::venue_status,
  'Brazil',
  'Minas Gerais',
  'Cristalina, Minas Gerais',
  -16.7677,
  -47.6138,
  10,
  18,
  150,
  280,
  'per_night'::price_code,
  7000,
  6,
  4,
  'https://crystalhealing.com',
  'https://google.com'
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 23. Sunrise Wellness Resort
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Sunrise Wellness Resort',
  'Luxury wellness resort offering sunrise yoga, premium spa treatments, and gourmet wellness cuisine with ocean views.',
  'published'::venue_status,
  'Thailand',
  'Koh Samui',
  'Chaweng Beach, Koh Samui',
  9.5120,
  100.0136,
  25,
  40,
  200,
  400,
  'per_night'::price_code,
  15000,
  15,
  12,
  'https://sunrisewellness.com',
  'https://google.com'
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 24. Sacred Mountain Lodge
SELECT '22222222-2222-2222-2222-222222222222'::uuid,
  vt.id,
  'Sacred Mountain Lodge',
  'Sacred mountain retreat offering spiritual pilgrimages, mountain worship ceremonies, and traditional indigenous healing practices.',
  'draft'::venue_status,
  'Nepal',
  'Mount Kailash',
  'Mount Kailash, Tibet',
  31.0668,
  81.3125,
  15,
  25,
  120,
  220,
  'per_night'::price_code,
  8000,
  8,
  6,
  'https://sacredmountain.com',
  'https://google.com'
FROM venue_types vt
WHERE vt.name = 'Retreat Center'
UNION ALL
-- 25. Eternal Spring Center
SELECT '44444444-4444-4444-4444-444444444444'::uuid,
  vt.id,
  'Eternal Spring Center',
  'Year-round spring retreat offering seasonal wellness programs, nature cycles workshops, and sustainable living practices.',
  'rejected'::venue_status,
  'New Zealand',
  'Rotorua',
  'Rotorua, Bay of Plenty',
  -38.1368,
  176.2497,
  18,
  28,
  180,
  320,
  'per_night'::price_code,
  11000,
  9,
  7,
  'https://eternalspring.com',
  'https://google.com'
FROM venue_types vt
WHERE vt.name = 'Retreat Center';
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
INSERT INTO venue_photos (venue_id, url, alt_text, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Serenity Hills Retreat - Yoga Hall',
  1
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Serenity Hills Retreat - Meditation Garden',
  2
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Serenity Hills Retreat - Private Room',
  3
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Serenity Hills Retreat - Dining Area',
  4
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Serenity Hills Retreat - Poolside View',
  5
FROM venues v
WHERE v.title = 'Serenity Hills Retreat';
INSERT INTO venue_photos (venue_id, url, alt_text, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Mountain View Sanctuary - Yoga Hall',
  1
FROM venues v
WHERE v.title = 'Mountain View Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Mountain View Sanctuary - Meditation Garden',
  2
FROM venues v
WHERE v.title = 'Mountain View Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Mountain View Sanctuary - Private Room',
  3
FROM venues v
WHERE v.title = 'Mountain View Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Mountain View Sanctuary - Dining Area',
  4
FROM venues v
WHERE v.title = 'Mountain View Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Mountain View Sanctuary - Poolside View',
  5
FROM venues v
WHERE v.title = 'Mountain View Sanctuary';
INSERT INTO venue_photos (venue_id, url, alt_text, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Ocean Bliss Retreat - Beachfront View',
  1
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Ocean Bliss Retreat - Ocean View Room',
  2
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Ocean Bliss Retreat - Beach Yoga Area',
  3
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Ocean Bliss Retreat - Cenote Swimming',
  4
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Ocean Bliss Retreat - Sunset Terrace',
  5
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat';
INSERT INTO venue_photos (venue_id, url, alt_text, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Alpine Wellness Lodge - Mountain View',
  1
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Alpine Wellness Lodge - Spa Treatment Room',
  2
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Alpine Wellness Lodge - Gourmet Restaurant',
  3
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Alpine Wellness Lodge - Wellness Center',
  4
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Alpine Wellness Lodge - Alpine Terrace',
  5
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge';
INSERT INTO venue_photos (venue_id, url, alt_text, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Sacred Valley Sanctuary - Mountain Vista',
  1
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Sacred Valley Sanctuary - Sacred Garden',
  2
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Sacred Valley Sanctuary - Meditation Temple',
  3
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Sacred Valley Sanctuary - Traditional Lodge',
  4
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Sacred Valley Sanctuary - Valley Overlook',
  5
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary';
INSERT INTO venue_photos (venue_id, url, alt_text, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Mindful Mountain Retreat - Himalayan View',
  1
FROM venues v
WHERE v.title = 'Mindful Mountain Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Mindful Mountain Retreat - Ashram Courtyard',
  2
FROM venues v
WHERE v.title = 'Mindful Mountain Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Mindful Mountain Retreat - Yoga Shala',
  3
FROM venues v
WHERE v.title = 'Mindful Mountain Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Mindful Mountain Retreat - Meditation Hall',
  4
FROM venues v
WHERE v.title = 'Mindful Mountain Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Mindful Mountain Retreat - Mountain Path',
  5
FROM venues v
WHERE v.title = 'Mindful Mountain Retreat';
INSERT INTO venue_photos (venue_id, url, alt_text, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Coastal Zen Retreat - Ocean View',
  1
FROM venues v
WHERE v.title = 'Coastal Zen Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Coastal Zen Retreat - Zen Garden',
  2
FROM venues v
WHERE v.title = 'Coastal Zen Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Coastal Zen Retreat - Tea Ceremony Room',
  3
FROM venues v
WHERE v.title = 'Coastal Zen Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Coastal Zen Retreat - Beach Meditation',
  4
FROM venues v
WHERE v.title = 'Coastal Zen Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Coastal Zen Retreat - Coastal Walkway',
  5
FROM venues v
WHERE v.title = 'Coastal Zen Retreat';
INSERT INTO venue_photos (venue_id, url, alt_text, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Desert Oasis Center - Desert Landscape',
  1
FROM venues v
WHERE v.title = 'Desert Oasis Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Desert Oasis Center - Stargazing Platform',
  2
FROM venues v
WHERE v.title = 'Desert Oasis Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Desert Oasis Center - Desert Yoga Area',
  3
FROM venues v
WHERE v.title = 'Desert Oasis Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Desert Oasis Center - Oasis Garden',
  4
FROM venues v
WHERE v.title = 'Desert Oasis Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Desert Oasis Center - Sunset View',
  5
FROM venues v
WHERE v.title = 'Desert Oasis Center';
INSERT INTO venue_photos (venue_id, url, alt_text, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Forest Healing Lodge - Forest Entrance',
  1
FROM venues v
WHERE v.title = 'Forest Healing Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Forest Healing Lodge - Nature Therapy Path',
  2
FROM venues v
WHERE v.title = 'Forest Healing Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Forest Healing Lodge - Forest Meditation',
  3
FROM venues v
WHERE v.title = 'Forest Healing Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Forest Healing Lodge - Eco Lodge',
  4
FROM venues v
WHERE v.title = 'Forest Healing Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Forest Healing Lodge - Forest Canopy',
  5
FROM venues v
WHERE v.title = 'Forest Healing Lodge';
INSERT INTO venue_photos (venue_id, url, alt_text, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Island Paradise Retreat - Overwater Bungalow',
  1
FROM venues v
WHERE v.title = 'Island Paradise Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Island Paradise Retreat - Tropical Beach',
  2
FROM venues v
WHERE v.title = 'Island Paradise Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Island Paradise Retreat - Marine Activities',
  3
FROM venues v
WHERE v.title = 'Island Paradise Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Island Paradise Retreat - Island Spa',
  4
FROM venues v
WHERE v.title = 'Island Paradise Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Island Paradise Retreat - Sunset Lagoon',
  5
FROM venues v
WHERE v.title = 'Island Paradise Retreat';
INSERT INTO venue_photos (venue_id, url, alt_text, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Himalayan Bliss Center - Mountain Peak View',
  1
FROM venues v
WHERE v.title = 'Himalayan Bliss Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Himalayan Bliss Center - Advanced Yoga Hall',
  2
FROM venues v
WHERE v.title = 'Himalayan Bliss Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Himalayan Bliss Center - Tibetan Temple',
  3
FROM venues v
WHERE v.title = 'Himalayan Bliss Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Himalayan Bliss Center - Mountain Lodge',
  4
FROM venues v
WHERE v.title = 'Himalayan Bliss Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Himalayan Bliss Center - Lakeside View',
  5
FROM venues v
WHERE v.title = 'Himalayan Bliss Center';
INSERT INTO venue_photos (venue_id, url, alt_text, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Mediterranean Wellness Villa - Sea View',
  1
FROM venues v
WHERE v.title = 'Mediterranean Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Mediterranean Wellness Villa - Private Beach',
  2
FROM venues v
WHERE v.title = 'Mediterranean Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Mediterranean Wellness Villa - Wellness Suite',
  3
FROM venues v
WHERE v.title = 'Mediterranean Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Mediterranean Wellness Villa - Gourmet Kitchen',
  4
FROM venues v
WHERE v.title = 'Mediterranean Wellness Villa'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Mediterranean Wellness Villa - Sunset Terrace',
  5
FROM venues v
WHERE v.title = 'Mediterranean Wellness Villa';
INSERT INTO venue_photos (venue_id, url, alt_text, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Zen Garden Retreat - Traditional Garden',
  1
FROM venues v
WHERE v.title = 'Zen Garden Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Zen Garden Retreat - Tea House',
  2
FROM venues v
WHERE v.title = 'Zen Garden Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Zen Garden Retreat - Meditation Pavilion',
  3
FROM venues v
WHERE v.title = 'Zen Garden Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Zen Garden Retreat - Mountain Setting',
  4
FROM venues v
WHERE v.title = 'Zen Garden Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Zen Garden Retreat - Zen Courtyard',
  5
FROM venues v
WHERE v.title = 'Zen Garden Retreat';
INSERT INTO venue_photos (venue_id, url, alt_text, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Tropical Healing Center - Jungle Setting',
  1
FROM venues v
WHERE v.title = 'Tropical Healing Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Tropical Healing Center - Healing Garden',
  2
FROM venues v
WHERE v.title = 'Tropical Healing Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Tropical Healing Center - Organic Farm',
  3
FROM venues v
WHERE v.title = 'Tropical Healing Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Tropical Healing Center - Wellness Center',
  4
FROM venues v
WHERE v.title = 'Tropical Healing Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Tropical Healing Center - Beach Access',
  5
FROM venues v
WHERE v.title = 'Tropical Healing Center';
INSERT INTO venue_photos (venue_id, url, alt_text, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Arctic Wellness Lodge - Northern Lights View',
  1
FROM venues v
WHERE v.title = 'Arctic Wellness Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Arctic Wellness Lodge - Ice Meditation Room',
  2
FROM venues v
WHERE v.title = 'Arctic Wellness Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Arctic Wellness Lodge - Sami Healing Center',
  3
FROM venues v
WHERE v.title = 'Arctic Wellness Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Arctic Wellness Lodge - Arctic Landscape',
  4
FROM venues v
WHERE v.title = 'Arctic Wellness Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Arctic Wellness Lodge - Aurora Observatory',
  5
FROM venues v
WHERE v.title = 'Arctic Wellness Lodge';
INSERT INTO venue_photos (venue_id, url, alt_text, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Desert Rose Sanctuary - Desert Valley',
  1
FROM venues v
WHERE v.title = 'Desert Rose Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Desert Rose Sanctuary - Sufi Meditation Hall',
  2
FROM venues v
WHERE v.title = 'Desert Rose Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Desert Rose Sanctuary - Traditional Healing',
  3
FROM venues v
WHERE v.title = 'Desert Rose Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Desert Rose Sanctuary - Desert Oasis',
  4
FROM venues v
WHERE v.title = 'Desert Rose Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Desert Rose Sanctuary - Starry Night View',
  5
FROM venues v
WHERE v.title = 'Desert Rose Sanctuary';
INSERT INTO venue_photos (venue_id, url, alt_text, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Mountain Spirit Lodge - Andean Peak View',
  1
FROM venues v
WHERE v.title = 'Mountain Spirit Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Mountain Spirit Lodge - Mountain Meditation',
  2
FROM venues v
WHERE v.title = 'Mountain Spirit Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Mountain Spirit Lodge - Peruvian Temple',
  3
FROM venues v
WHERE v.title = 'Mountain Spirit Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Mountain Spirit Lodge - Sacred Valley',
  4
FROM venues v
WHERE v.title = 'Mountain Spirit Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Mountain Spirit Lodge - Mountain Lodge',
  5
FROM venues v
WHERE v.title = 'Mountain Spirit Lodge';
INSERT INTO venue_photos (venue_id, url, alt_text, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Ocean Spirit Center - Oceanfront View',
  1
FROM venues v
WHERE v.title = 'Ocean Spirit Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Ocean Spirit Center - Marine Therapy Pool',
  2
FROM venues v
WHERE v.title = 'Ocean Spirit Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Ocean Spirit Center - Water Meditation',
  3
FROM venues v
WHERE v.title = 'Ocean Spirit Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Ocean Spirit Center - Coastal Wellness',
  4
FROM venues v
WHERE v.title = 'Ocean Spirit Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Ocean Spirit Center - Beachfront Center',
  5
FROM venues v
WHERE v.title = 'Ocean Spirit Center';
INSERT INTO venue_photos (venue_id, url, alt_text, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Forest Wisdom Retreat - Ancient Forest',
  1
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Forest Wisdom Retreat - Shamanic Circle',
  2
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Forest Wisdom Retreat - Nature Connection',
  3
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Forest Wisdom Retreat - Forest Ceremony',
  4
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Forest Wisdom Retreat - Wisdom Lodge',
  5
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat';
INSERT INTO venue_photos (venue_id, url, alt_text, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Sky High Sanctuary - Mountain Peak',
  1
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Sky High Sanctuary - High Altitude Yoga',
  2
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Sky High Sanctuary - Cloud Meditation',
  3
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Sky High Sanctuary - Panoramic View',
  4
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Sky High Sanctuary - Alpine Sanctuary',
  5
FROM venues v
WHERE v.title = 'Sky High Sanctuary';
INSERT INTO venue_photos (venue_id, url, alt_text, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Valley of Peace - Peaceful Valley',
  1
FROM venues v
WHERE v.title = 'Valley of Peace'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Valley of Peace - Silent Meditation Hall',
  2
FROM venues v
WHERE v.title = 'Valley of Peace'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Valley of Peace - Peace Workshop',
  3
FROM venues v
WHERE v.title = 'Valley of Peace'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Valley of Peace - Conflict Resolution',
  4
FROM venues v
WHERE v.title = 'Valley of Peace'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Valley of Peace - Serene Setting',
  5
FROM venues v
WHERE v.title = 'Valley of Peace';
INSERT INTO venue_photos (venue_id, url, alt_text, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Crystal Healing Center - Crystal Garden',
  1
FROM venues v
WHERE v.title = 'Crystal Healing Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Crystal Healing Center - Energy Healing Room',
  2
FROM venues v
WHERE v.title = 'Crystal Healing Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Crystal Healing Center - Vibrational Medicine',
  3
FROM venues v
WHERE v.title = 'Crystal Healing Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Crystal Healing Center - Crystal Rich',
  4
FROM venues v
WHERE v.title = 'Crystal Healing Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Crystal Healing Center - Healing Sanctuary',
  5
FROM venues v
WHERE v.title = 'Crystal Healing Center';
INSERT INTO venue_photos (venue_id, url, alt_text, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Sunrise Wellness Resort - Sunrise View',
  1
FROM venues v
WHERE v.title = 'Sunrise Wellness Resort'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Sunrise Wellness Resort - Premium Spa',
  2
FROM venues v
WHERE v.title = 'Sunrise Wellness Resort'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Sunrise Wellness Resort - Wellness Cuisine',
  3
FROM venues v
WHERE v.title = 'Sunrise Wellness Resort'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Sunrise Wellness Resort - Ocean Views',
  4
FROM venues v
WHERE v.title = 'Sunrise Wellness Resort'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Sunrise Wellness Resort - Luxury Resort',
  5
FROM venues v
WHERE v.title = 'Sunrise Wellness Resort';
INSERT INTO venue_photos (venue_id, url, alt_text, position)
SELECT v.id,
  'venue_photos/venue-6.avif',
  'Sacred Mountain Lodge - Sacred Peak',
  1
FROM venues v
WHERE v.title = 'Sacred Mountain Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-7.avif',
  'Sacred Mountain Lodge - Spiritual Pilgrimage',
  2
FROM venues v
WHERE v.title = 'Sacred Mountain Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-8.avif',
  'Sacred Mountain Lodge - Mountain Worship',
  3
FROM venues v
WHERE v.title = 'Sacred Mountain Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-9.avif',
  'Sacred Mountain Lodge - Indigenous Healing',
  4
FROM venues v
WHERE v.title = 'Sacred Mountain Lodge'
UNION ALL
SELECT v.id,
  'venue_photos/venue-10.avif',
  'Sacred Mountain Lodge - Sacred Lodge',
  5
FROM venues v
WHERE v.title = 'Sacred Mountain Lodge';
INSERT INTO venue_photos (venue_id, url, alt_text, position)
SELECT v.id,
  'venue_photos/venue-1.avif',
  'Eternal Spring Center - Spring Gardens',
  1
FROM venues v
WHERE v.title = 'Eternal Spring Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-2.avif',
  'Eternal Spring Center - Seasonal Wellness',
  2
FROM venues v
WHERE v.title = 'Eternal Spring Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-3.avif',
  'Eternal Spring Center - Nature Cycles',
  3
FROM venues v
WHERE v.title = 'Eternal Spring Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-4.avif',
  'Eternal Spring Center - Sustainable Living',
  4
FROM venues v
WHERE v.title = 'Eternal Spring Center'
UNION ALL
SELECT v.id,
  'venue_photos/venue-5.avif',
  'Eternal Spring Center - Year-round Spring',
  5
FROM venues v
WHERE v.title = 'Eternal Spring Center';
-- Insert sample reviews (10 reviews linking users to venues)
INSERT INTO reviews (venue_id, user_id, rating, comment)
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
    'Fitness / gym area',
    'Tea / Coffee station',
    'Swimming pool',
    'Airport transfer',
    'Vegetarian / vegan meals available',
    'Shared rooms / Dorms',
    'Special diet meals (gluten-free/ayurvedic)',
    'Yoga hall / shala',
    'Activities (cooking class, tours, biking, etc.)',
    'Parking on site'
  );
-- Mountain View Sanctuary
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Mountain View Sanctuary'
  AND a.name IN (
    'Child-friendly',
    'Eco-friendly',
    'Pet friendly',
    'Alcohol-free policy',
    'Shared rooms / Dorms',
    'Spa / massage room',
    'Air conditioning',
    'Fitness / gym area',
    'Restaurant on site',
    'Special diet meals (gluten-free/ayurvedic)'
  );
-- Ocean Bliss Retreat
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Ocean Bliss Retreat'
  AND a.name IN (
    'Shared rooms / Dorms',
    'Swimming pool',
    'Kitchen (shared or professional)',
    'Accessibility / wheelchair friendly',
    'Vegetarian / vegan meals available',
    'Special diet meals (gluten-free/ayurvedic)',
    'Spa / massage room',
    'Wi-Fi / Internet',
    'Tea / Coffee station',
    'Event / Workshop space (AV/projector)'
  );
-- Alpine Wellness Lodge
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Alpine Wellness Lodge'
  AND a.name IN (
    'Dining area',
    'Alcohol-free policy',
    'Eco-friendly',
    'Meditation space / hall',
    'Sauna / steam / jacuzzi',
    'Yoga hall / shala',
    'Vegetarian / vegan meals available',
    'Event / Workshop space (AV/projector)',
    'Air conditioning',
    'Wi-Fi / Internet'
  );
-- Sacred Valley Sanctuary
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Sacred Valley Sanctuary'
  AND a.name IN (
    'Parking on site',
    'Wi-Fi / Internet',
    'Spa / massage room',
    'Accessibility / wheelchair friendly',
    'Sauna / steam / jacuzzi',
    'Private rooms',
    'Shared rooms / Dorms',
    'Dining area',
    'Heating (for cold regions)',
    'Eco-friendly'
  );
-- Mindful Mountain Retreat
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Mindful Mountain Retreat'
  AND a.name IN (
    'Restaurant on site',
    'Outdoor space / garden',
    'Shared rooms / Dorms',
    'Private rooms',
    'Eco-friendly',
    'Parking on site',
    'Tea / Coffee station',
    'Kitchen (shared or professional)',
    'Air conditioning',
    'Vegetarian / vegan meals available'
  );
-- Coastal Zen Retreat
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Coastal Zen Retreat'
  AND a.name IN (
    'Pet friendly',
    'Spa / massage room',
    'Air conditioning',
    'Activities (cooking class, tours, biking, etc.)',
    'Wi-Fi / Internet',
    'Vegetarian / vegan meals available',
    'En-suite bathrooms',
    'Fitness / gym area',
    'Event / Workshop space (AV/projector)',
    'Kitchen (shared or professional)'
  );
-- Desert Oasis Center
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Desert Oasis Center'
  AND a.name IN (
    'Pet friendly',
    'Tea / Coffee station',
    'Meditation space / hall',
    'Shared rooms / Dorms',
    'Activities (cooking class, tours, biking, etc.)',
    'Wi-Fi / Internet',
    'Vegetarian / vegan meals available',
    'Airport transfer',
    'Dining area',
    'Child-friendly'
  );
-- Forest Healing Lodge
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Forest Healing Lodge'
  AND a.name IN (
    'Wi-Fi / Internet',
    'Tea / Coffee station',
    'Air conditioning',
    'Swimming pool',
    'Parking on site',
    'Vegetarian / vegan meals available',
    'Private rooms',
    'Accessibility / wheelchair friendly',
    'Event / Workshop space (AV/projector)',
    'En-suite bathrooms'
  );
-- Island Paradise Retreat
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Island Paradise Retreat'
  AND a.name IN (
    'Wi-Fi / Internet',
    'Activities (cooking class, tours, biking, etc.)',
    'Dining area',
    'Vegetarian / vegan meals available',
    'Parking on site',
    'Outdoor space / garden',
    'Fitness / gym area',
    'Yoga hall / shala',
    'Air conditioning',
    'Airport transfer'
  );
-- Himalayan Bliss Center
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Himalayan Bliss Center'
  AND a.name IN (
    'Swimming pool',
    'Meditation space / hall',
    'Alcohol-free policy',
    'Accessibility / wheelchair friendly',
    'Eco-friendly',
    'Sauna / steam / jacuzzi',
    'Restaurant on site',
    'Wi-Fi / Internet',
    'Kitchen (shared or professional)',
    'Shared rooms / Dorms'
  );
-- Mediterranean Wellness Villa
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Mediterranean Wellness Villa'
  AND a.name IN (
    'En-suite bathrooms',
    'Fitness / gym area',
    'Private rooms',
    'Eco-friendly',
    'Special diet meals (gluten-free/ayurvedic)',
    'Event / Workshop space (AV/projector)',
    'Tea / Coffee station',
    'Airport transfer',
    'Parking on site',
    'Shared rooms / Dorms'
  );
-- Zen Garden Retreat
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Zen Garden Retreat'
  AND a.name IN (
    'Pet friendly',
    'Spa / massage room',
    'Heating (for cold regions)',
    'Wi-Fi / Internet',
    'Tea / Coffee station',
    'Alcohol-free policy',
    'Accessibility / wheelchair friendly',
    'Air conditioning',
    'Fitness / gym area',
    'Parking on site'
  );
-- Tropical Healing Center
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Tropical Healing Center'
  AND a.name IN (
    'En-suite bathrooms',
    'Accessibility / wheelchair friendly',
    'Dining area',
    'Air conditioning',
    'Private rooms',
    'Yoga hall / shala',
    'Heating (for cold regions)',
    'Child-friendly',
    'Fitness / gym area',
    'Airport transfer'
  );
-- Arctic Wellness Lodge
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Arctic Wellness Lodge'
  AND a.name IN (
    'Child-friendly',
    'Meditation space / hall',
    'Air conditioning',
    'Heating (for cold regions)',
    'Parking on site',
    'Eco-friendly',
    'Private rooms',
    'Vegetarian / vegan meals available',
    'Restaurant on site',
    'Dining area'
  );
-- Desert Rose Sanctuary
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Desert Rose Sanctuary'
  AND a.name IN (
    'Child-friendly',
    'Shared rooms / Dorms',
    'Dining area',
    'Heating (for cold regions)',
    'Airport transfer',
    'En-suite bathrooms',
    'Eco-friendly',
    'Restaurant on site',
    'Kitchen (shared or professional)',
    'Sauna / steam / jacuzzi'
  );
-- Mountain Spirit Lodge
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Mountain Spirit Lodge'
  AND a.name IN (
    'Air conditioning',
    'Spa / massage room',
    'Pet friendly',
    'Private rooms',
    'Kitchen (shared or professional)',
    'Restaurant on site',
    'Child-friendly',
    'Alcohol-free policy',
    'Swimming pool',
    'Dining area'
  );
-- Ocean Spirit Center
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Ocean Spirit Center'
  AND a.name IN (
    'Private rooms',
    'Special diet meals (gluten-free/ayurvedic)',
    'Outdoor space / garden',
    'Wi-Fi / Internet',
    'Event / Workshop space (AV/projector)',
    'Activities (cooking class, tours, biking, etc.)',
    'Fitness / gym area',
    'Yoga hall / shala',
    'Airport transfer',
    'Meditation space / hall'
  );
-- Forest Wisdom Retreat
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Forest Wisdom Retreat'
  AND a.name IN (
    'Fitness / gym area',
    'Spa / massage room',
    'Event / Workshop space (AV/projector)',
    'Dining area',
    'Activities (cooking class, tours, biking, etc.)',
    'Vegetarian / vegan meals available',
    'Outdoor space / garden',
    'Eco-friendly',
    'Child-friendly',
    'Sauna / steam / jacuzzi'
  );
-- Sky High Sanctuary
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Sky High Sanctuary'
  AND a.name IN (
    'Accessibility / wheelchair friendly',
    'Dining area',
    'Sauna / steam / jacuzzi',
    'Fitness / gym area',
    'Special diet meals (gluten-free/ayurvedic)',
    'Vegetarian / vegan meals available',
    'Wi-Fi / Internet',
    'Outdoor space / garden',
    'Shared rooms / Dorms',
    'Alcohol-free policy'
  );
-- Valley of Peace
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Valley of Peace'
  AND a.name IN (
    'Outdoor space / garden',
    'Alcohol-free policy',
    'Private rooms',
    'Child-friendly',
    'Shared rooms / Dorms',
    'Event / Workshop space (AV/projector)',
    'Airport transfer',
    'Activities (cooking class, tours, biking, etc.)',
    'Swimming pool',
    'Eco-friendly'
  );
-- Crystal Healing Center
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Crystal Healing Center'
  AND a.name IN (
    'Private rooms',
    'Tea / Coffee station',
    'Pet friendly',
    'En-suite bathrooms',
    'Event / Workshop space (AV/projector)',
    'Air conditioning',
    'Parking on site',
    'Kitchen (shared or professional)',
    'Vegetarian / vegan meals available',
    'Wi-Fi / Internet'
  );
-- Sunrise Wellness Resort
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Sunrise Wellness Resort'
  AND a.name IN (
    'Parking on site',
    'Sauna / steam / jacuzzi',
    'Kitchen (shared or professional)',
    'Vegetarian / vegan meals available',
    'Restaurant on site',
    'Spa / massage room',
    'Private rooms',
    'Activities (cooking class, tours, biking, etc.)',
    'Accessibility / wheelchair friendly',
    'Wi-Fi / Internet'
  );
-- Sacred Mountain Lodge
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Sacred Mountain Lodge'
  AND a.name IN (
    'Alcohol-free policy',
    'Wi-Fi / Internet',
    'Activities (cooking class, tours, biking, etc.)',
    'Outdoor space / garden',
    'Tea / Coffee station',
    'Accessibility / wheelchair friendly',
    'Swimming pool',
    'Fitness / gym area',
    'Eco-friendly',
    'Meditation space / hall'
  );
-- Eternal Spring Center
INSERT INTO venue_amenities (venue_id, amenity_id)
SELECT v.id,
  a.id
FROM venues v,
  amenities a
WHERE v.title = 'Eternal Spring Center'
  AND a.name IN (
    'Activities (cooking class, tours, biking, etc.)',
    'Pet friendly',
    'Restaurant on site',
    'Sauna / steam / jacuzzi',
    'Parking on site',
    'Spa / massage room',
    'Yoga hall / shala',
    'Accessibility / wheelchair friendly',
    'Shared rooms / Dorms',
    'Air conditioning'
  );
-- Insert cancellation policies for venues
-- Each venue get only 1 cancellation policy with different timeframes
INSERT INTO cancellation_policies (venue_id, days_before, refund_percent)
SELECT v.id,
  30,
  100
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  14,
  75
FROM venues v
WHERE v.title = 'Mountain View Sanctuary'
UNION ALL
SELECT v.id,
  7,
  50
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat'
UNION ALL
SELECT v.id,
  21,
  100
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge'
UNION ALL
SELECT v.id,
  7,
  80
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary'
UNION ALL
SELECT v.id,
  3,
  30
FROM venues v
WHERE v.title = 'Mindful Mountain Retreat'
UNION ALL
SELECT v.id,
  45,
  100
FROM venues v
WHERE v.title = 'Coastal Zen Retreat'
UNION ALL
SELECT v.id,
  21,
  75
FROM venues v
WHERE v.title = 'Desert Oasis Center'
UNION ALL
SELECT v.id,
  14,
  50
FROM venues v
WHERE v.title = 'Forest Healing Lodge'
UNION ALL
SELECT v.id,
  60,
  100
FROM venues v
WHERE v.title = 'Island Paradise Retreat'
UNION ALL
SELECT v.id,
  30,
  80
FROM venues v
WHERE v.title = 'Himalayan Bliss Center'
UNION ALL
SELECT v.id,
  14,
  60
FROM venues v
WHERE v.title = 'Mediterranean Wellness Villa'
UNION ALL
SELECT v.id,
  21,
  100
FROM venues v
WHERE v.title = 'Zen Garden Retreat'
UNION ALL
SELECT v.id,
  14,
  75
FROM venues v
WHERE v.title = 'Tropical Healing Center'
UNION ALL
SELECT v.id,
  7,
  40
FROM venues v
WHERE v.title = 'Arctic Wellness Lodge'
UNION ALL
SELECT v.id,
  14,
  100
FROM venues v
WHERE v.title = 'Desert Rose Sanctuary'
UNION ALL
SELECT v.id,
  7,
  70
FROM venues v
WHERE v.title = 'Mountain Spirit Lodge'
UNION ALL
SELECT v.id,
  3,
  25
FROM venues v
WHERE v.title = 'Ocean Spirit Center'
UNION ALL
SELECT v.id,
  30,
  100
FROM venues v
WHERE v.title = 'Forest Wisdom Retreat'
UNION ALL
SELECT v.id,
  14,
  80
FROM venues v
WHERE v.title = 'Sky High Sanctuary'
UNION ALL
SELECT v.id,
  7,
  50
FROM venues v
WHERE v.title = 'Valley of Peace'
UNION ALL
SELECT v.id,
  21,
  100
FROM venues v
WHERE v.title = 'Crystal Healing Center'
UNION ALL
SELECT v.id,
  10,
  75
FROM venues v
WHERE v.title = 'Sunrise Wellness Resort'
UNION ALL
SELECT v.id,
  5,
  40
FROM venues v
WHERE v.title = 'Sacred Mountain Lodge'
UNION ALL
SELECT v.id,
  14,
  100
FROM venues v
WHERE v.title = 'Eternal Spring Center';
-- Insert sample inquiries from users to venues (10 random inquiries)
INSERT INTO inquiries (venue_id, user_id, message, status, created_at)
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  'Hi! I''m interested in booking a wellness retreat for my 40th birthday in March. I''d love to know more about your yoga and meditation programs, and whether you offer special packages for milestone celebrations. Also, what''s the best time to visit Bali?',
  'new'::inquiry_status,
  NOW() - INTERVAL '2 days'
FROM venues v
WHERE v.title = 'Serenity Hills Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  'Hello! I''m planning a spiritual journey to Rishikesh and your sanctuary looks perfect. I have some questions about the ashram-style accommodation - are the rooms shared or private? Also, do you offer traditional Ayurvedic treatments?',
  'viewed'::inquiry_status,
  NOW() - INTERVAL '5 days'
FROM venues v
WHERE v.title = 'Mountain View Sanctuary'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  'I''m looking for a beachfront wellness retreat in Tulum for my honeymoon. Your cenote swimming and Mayan culture programs sound amazing! Do you offer couple''s packages? What''s the weather like in December?',
  'responded'::inquiry_status,
  NOW() - INTERVAL '1 week'
FROM venues v
WHERE v.title = 'Ocean Bliss Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  'Bonjour! I''m interested in your alpine wellness lodge for a winter retreat. I love skiing and spa treatments. Do you offer ski-in/ski-out access? Also, what wellness programs do you have during the winter months?',
  'closed'::inquiry_status,
  NOW() - INTERVAL '2 weeks'
FROM venues v
WHERE v.title = 'Alpine Wellness Lodge'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  'Hola! I''m fascinated by Incan culture and would love to experience your Sacred Valley sanctuary. I have some questions about the spiritual ceremonies - are they open to beginners? Also, what''s the altitude like there?',
  'new'::inquiry_status,
  NOW() - INTERVAL '3 weeks'
FROM venues v
WHERE v.title = 'Sacred Valley Sanctuary'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  'Namaste! I''m a yoga teacher looking to deepen my practice in the Himalayas. Your ashram experience sounds perfect. Do you offer teacher training programs? Also, what''s the daily schedule like?',
  'viewed'::inquiry_status,
  NOW() - INTERVAL '1 month'
FROM venues v
WHERE v.title = 'Mindful Mountain Retreat'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  'I''m interested in your coastal zen retreat for a digital detox. The tea ceremonies and ocean meditation sound perfect. Do you have WiFi-free zones? Also, what''s the best time to see whales?',
  'responded'::inquiry_status,
  NOW() - INTERVAL '5 weeks'
FROM venues v
WHERE v.title = 'Coastal Zen Retreat'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  'Salaam! I''m looking for a unique desert experience. Your stargazing meditation and Sufi practices sound fascinating. Do you offer camel treks? Also, what''s the temperature like at night?',
  'new'::inquiry_status,
  NOW() - INTERVAL '6 weeks'
FROM venues v
WHERE v.title = 'Desert Oasis Center'
UNION ALL
SELECT v.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  'I''m interested in your forest healing lodge for a nature retreat. The forest bathing and eco-friendly accommodation sound perfect. Do you have guided nature walks? Also, what wildlife can I expect to see?',
  'viewed'::inquiry_status,
  NOW() - INTERVAL '2 months'
FROM venues v
WHERE v.title = 'Forest Healing Lodge'
UNION ALL
SELECT v.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  'I''m dreaming of an overwater bungalow experience! Your island paradise retreat looks incredible. Do you offer snorkeling equipment? Also, what''s the best time to avoid monsoon season?',
  'responded'::inquiry_status,
  NOW() - INTERVAL '2 months'
FROM venues v
WHERE v.title = 'Island Paradise Retreat';