DROP FUNCTION IF EXISTS public.get_filtered_venues_count;
DROP FUNCTION IF EXISTS public.get_filtered_venues;
DROP FUNCTION IF EXISTS public.get_venue_by_id;
DROP FUNCTION IF EXISTS public.get_reviews_by_venue_id;
CREATE OR REPLACE FUNCTION public.get_filtered_venues_count(
    p_search TEXT DEFAULT '',
    p_guests TEXT DEFAULT '',
    p_bedrooms TEXT DEFAULT '',
    p_bathrooms TEXT DEFAULT '',
    p_venue_types UUID [] DEFAULT '{}',
    p_amenities UUID [] DEFAULT '{}'
  ) RETURNS INTEGER LANGUAGE plpgsql AS $$
DECLARE v_count INTEGER := 0;
BEGIN -- Base query
WITH filtered AS (
  SELECT v.id
  FROM venues v
  WHERE v.status = 'published' -- search
    AND (
      p_search = ''
      OR v.title ILIKE '%' || p_search || '%'
      OR v.city ILIKE '%' || p_search || '%'
      OR v.country ILIKE '%' || p_search || '%'
    ) -- guests
    AND (
      p_guests = ''
      OR (
        p_guests LIKE '%+%'
        AND v.capacity_max >= (REPLACE(p_guests, '+', ''))::INT
      )
      OR (
        p_guests LIKE '%-%'
        AND (
          v.capacity_max >= SPLIT_PART(p_guests, '-', 1)::INT
          AND v.capacity_min <= SPLIT_PART(p_guests, '-', 2)::INT
        )
      )
    ) -- bedrooms
    AND (
      p_bedrooms = ''
      OR (
        p_bedrooms LIKE '%+%'
        AND v.bedrooms >= (REPLACE(p_bedrooms, '+', ''))::INT
      )
      OR (
        p_bedrooms LIKE '%-%'
        AND (
          v.bedrooms BETWEEN SPLIT_PART(p_bedrooms, '-', 1)::INT AND SPLIT_PART(p_bedrooms, '-', 2)::INT
        )
      )
      OR (
        p_bedrooms ~ '^[0-9]+$'
        AND v.bedrooms >= p_bedrooms::INT
      )
    ) -- bathrooms
    AND (
      p_bathrooms = ''
      OR (
        p_bathrooms LIKE '%+%'
        AND v.bathrooms >= (REPLACE(p_bathrooms, '+', ''))::INT
      )
      OR (
        p_bathrooms LIKE '%-%'
        AND (
          v.bathrooms BETWEEN SPLIT_PART(p_bathrooms, '-', 1)::INT AND SPLIT_PART(p_bathrooms, '-', 2)::INT
        )
      )
      OR (
        p_bathrooms ~ '^[0-9]+$'
        AND v.bathrooms >= p_bathrooms::INT
      )
    ) -- venue types
    AND (
      array_length(p_venue_types, 1) IS NULL
      OR v.type_id = ANY(p_venue_types)
    )
)
SELECT COUNT(*) INTO v_count
FROM filtered f
WHERE -- amenities filter
  (
    array_length(p_amenities, 1) IS NULL
    OR NOT EXISTS (
      SELECT 1
      FROM unnest(p_amenities) a
      WHERE NOT EXISTS (
          SELECT 1
          FROM venue_amenities va
          WHERE va.venue_id = f.id
            AND va.amenity_id = a
        )
    )
  );
RETURN v_count;
END;
$$;
CREATE OR REPLACE FUNCTION public.get_filtered_venues(
    p_search TEXT DEFAULT '',
    p_guests TEXT DEFAULT '',
    p_bedrooms TEXT DEFAULT '',
    p_bathrooms TEXT DEFAULT '',
    p_venue_types UUID [] DEFAULT '{}',
    p_amenities UUID [] DEFAULT '{}',
    p_sort_by TEXT DEFAULT 'relevance',
    p_limit INT DEFAULT 20,
    p_offset INT DEFAULT 0
  ) RETURNS TABLE (
    id UUID,
    title TEXT,
    description TEXT,
    country TEXT,
    city TEXT,
    address TEXT,
    capacity_min INT,
    capacity_max INT,
    price_min NUMERIC,
    price_max NUMERIC,
    price_unit price_code,
    label venue_label,
    bedrooms INT,
    bathrooms INT,
    created_at TIMESTAMPTZ,
    avg_rating NUMERIC,
    review_count BIGINT,
    total_count BIGINT,
    photos TEXT [],
    amenity_names TEXT []
  ) LANGUAGE plpgsql AS $$ BEGIN RETURN QUERY WITH base AS (
    SELECT v.*,
      COALESCE(AVG(r.rating), 0) AS avg_rating,
      COUNT(r.*) AS review_count
    FROM venues v
      LEFT JOIN reviews r ON r.venue_id = v.id
    WHERE v.status = 'published' -- search filter
      AND (
        p_search = ''
        OR v.title ILIKE '%' || p_search || '%'
        OR v.city ILIKE '%' || p_search || '%'
        OR v.country ILIKE '%' || p_search || '%'
      ) -- guests filter
      AND (
        p_guests = ''
        OR (
          p_guests LIKE '%+%'
          AND v.capacity_max >= (REPLACE(p_guests, '+', ''))::INT
        )
        OR (
          p_guests LIKE '%-%'
          AND (
            v.capacity_max >= SPLIT_PART(p_guests, '-', 1)::INT
            AND v.capacity_min <= SPLIT_PART(p_guests, '-', 2)::INT
          )
        )
      ) -- bedrooms filter
      AND (
        p_bedrooms = ''
        OR (
          p_bedrooms LIKE '%+%'
          AND v.bedrooms >= (REPLACE(p_bedrooms, '+', ''))::INT
        )
        OR (
          p_bedrooms LIKE '%-%'
          AND (
            v.bedrooms BETWEEN SPLIT_PART(p_bedrooms, '-', 1)::INT AND SPLIT_PART(p_bedrooms, '-', 2)::INT
          )
        )
        OR (
          p_bedrooms ~ '^[0-9]+$'
          AND v.bedrooms = p_bedrooms::INT
        )
      ) -- bathrooms filter
      AND (
        p_bathrooms = ''
        OR (
          p_bathrooms LIKE '%+%'
          AND v.bathrooms >= (REPLACE(p_bathrooms, '+', ''))::INT
        )
        OR (
          p_bathrooms LIKE '%-%'
          AND (
            v.bathrooms BETWEEN SPLIT_PART(p_bathrooms, '-', 1)::INT AND SPLIT_PART(p_bathrooms, '-', 2)::INT
          )
        )
        OR (
          p_bathrooms ~ '^[0-9]+$'
          AND v.bathrooms = p_bathrooms::INT
        )
      ) -- venue types
      AND (
        array_length(p_venue_types, 1) IS NULL
        OR v.type_id = ANY(p_venue_types)
      )
    GROUP BY v.id
  ),
  with_amenities AS (
    SELECT b.*
    FROM base b
    WHERE array_length(p_amenities, 1) IS NULL
      OR NOT EXISTS (
        SELECT 1
        FROM unnest(p_amenities) a
        WHERE NOT EXISTS (
            SELECT 1
            FROM venue_amenities va
            WHERE va.venue_id = b.id
              AND va.amenity_id = a
          )
      )
  ),
  counted AS (
    SELECT COUNT(*) AS total_count
    FROM with_amenities
  )
SELECT w.id,
  w.title,
  w.description,
  w.country,
  w.city,
  w.address,
  w.capacity_min,
  w.capacity_max,
  w.price_min,
  w.price_max,
  w.price_unit,
  w.label,
  w.bedrooms,
  w.bathrooms,
  w.created_at,
  w.avg_rating,
  w.review_count,
  c.total_count,
  -- photos
  COALESCE(
    (
      SELECT ARRAY_AGG(
          vp.url
          ORDER BY vp.position ASC
        )
      FROM venue_photos vp
      WHERE vp.venue_id = w.id
      LIMIT 5
    ), '{}'
  ) AS photos,
  -- amenity names
  COALESCE(
    ARRAY(
      SELECT DISTINCT a.name
      FROM venue_amenities va
        JOIN amenities a ON a.id = va.amenity_id
      WHERE va.venue_id = w.id
    ),
    '{}'
  ) AS amenity_names
FROM with_amenities w,
  counted c
ORDER BY CASE
    WHEN p_sort_by = 'price-low' THEN w.price_min
  END ASC,
  CASE
    WHEN p_sort_by = 'price-high' THEN w.price_min
  END DESC,
  CASE
    WHEN p_sort_by = 'rating' THEN w.avg_rating
  END DESC,
  CASE
    WHEN p_sort_by = 'popular' THEN w.review_count
  END DESC,
  w.created_at DESC
LIMIT p_limit OFFSET p_offset;
END;
$$;
-- =====================================================
-- Function: get_venue_by_id
-- =====================================================
CREATE OR REPLACE FUNCTION public.get_venue_by_id(p_venue_id UUID) RETURNS JSONB LANGUAGE plpgsql AS $$
DECLARE result JSONB;
BEGIN
SELECT jsonb_build_object(
    -- Core fields
    'id',
    v.id,
    'title',
    v.title,
    'description',
    v.description,
    'status',
    v.status,
    'country',
    v.country,
    'city',
    v.city,
    'address',
    v.address,
    'latitude',
    v.latitude,
    'longitude',
    v.longitude,
    'capacity_min',
    v.capacity_min,
    'capacity_max',
    v.capacity_max,
    'price_min',
    v.price_min,
    'price_max',
    v.price_max,
    'price_unit',
    v.price_unit,
    'area_sqft',
    v.area_sqft,
    'bedrooms',
    v.bedrooms,
    'bathrooms',
    v.bathrooms,
    'website_url',
    v.website_url,
    'instagram_url',
    v.instagram_url,
    'label',
    v.label,
    'location_about',
    v.location_about,
    'how_to_get_here',
    COALESCE(v.how_to_get_here, '{}'::jsonb),
    'nearby_attractions',
    COALESCE(v.nearby_attractions, '{}'::jsonb),
    'hero_subline',
    v.hero_subline,
    'special_policies',
    COALESCE(v.special_policies, '{}'::jsonb),
    'included_items',
    COALESCE(v.included_items, '{}'::text []),
    'excluded_items',
    COALESCE(v.excluded_items, '{}'::text []),
    'created_at',
    v.created_at,
    'updated_at',
    v.updated_at,
    -- Venue Type
    'type',
    jsonb_build_object(
      'id',
      vt.id,
      'name',
      vt.name,
      'slug',
      vt.slug,
      'icon',
      vt.icon
    ),
    -- Owner
    'owner',
    jsonb_build_object(
      'id',
      p.id,
      'name',
      p.name,
      'avatar_url',
      p.avatar_url,
      'email',
      p.email,
      'phone',
      p.phone,
      'bio',
      p.bio
    ),
    -- Photos
    'photos',
    COALESCE(
      (
        SELECT jsonb_agg(
            jsonb_build_object(
              'id',
              vp.id,
              'url',
              vp.url,
              'alt_text',
              vp.alt_text,
              'position',
              vp.position
            )
            ORDER BY vp.position
          )
        FROM venue_photos vp
        WHERE vp.venue_id = v.id
      ),
      '[]'::jsonb
    ),
    -- Amenities
    'amenities',
    COALESCE(
      (
        SELECT jsonb_agg(
            jsonb_build_object(
              'id',
              a.id,
              'name',
              a.name,
              'group',
              a."group",
              'slug',
              a.slug,
              'icon',
              a.icon
            )
            ORDER BY a.name
          )
        FROM venue_amenities va
          JOIN amenities a ON a.id = va.amenity_id
        WHERE va.venue_id = v.id
      ),
      '[]'::jsonb
    ),
    -- Food & Dining
    'food_dining',
    COALESCE(
      (
        SELECT jsonb_agg(
            jsonb_build_object(
              'id',
              fd.id,
              'meal_type',
              fd.meal_type,
              'diet_options',
              COALESCE(fd.diet_options, '{}'::text []),
              'description',
              fd.description
            )
            ORDER BY fd.meal_type
          )
        FROM food_dining fd
        WHERE fd.venue_id = v.id
      ),
      '[]'::jsonb
    ),
    -- Cancellation Policies
    'cancellation_policies',
    COALESCE(
      (
        SELECT jsonb_agg(
            jsonb_build_object(
              'id',
              cp.id,
              'days_before',
              cp.days_before,
              'refund_percent',
              cp.refund_percent,
              'note',
              cp.note
            )
            ORDER BY cp.days_before DESC
          )
        FROM cancellation_policies cp
        WHERE cp.venue_id = v.id
      ),
      '[]'::jsonb
    ),
    -- Pricing (updated: removed label)
    'pricing',
    COALESCE(
      (
        SELECT jsonb_agg(
            jsonb_build_object(
              'id',
              vpz.id,
              'amount',
              vpz.amount,
              'currency',
              vpz.currency,
              'billing_unit',
              vpz.billing_unit,
              'note',
              vpz.note,
              'sort_order',
              vpz.sort_order,
              'created_at',
              vpz.created_at
            )
          )
        FROM (
            SELECT vpz.id,
              vpz.amount,
              vpz.currency,
              vpz.billing_unit,
              vpz.note,
              vpz.sort_order,
              vpz.created_at
            FROM venue_pricing vpz
            WHERE vpz.venue_id = v.id
            ORDER BY vpz.sort_order,
              vpz.created_at
            LIMIT 3
          ) vpz
      ), '[]'::jsonb
    ), -- Rooms (updated: added billing_unit, note, sort_order)
    'rooms', COALESCE(
      (
        SELECT jsonb_agg(
            jsonb_build_object(
              'id',
              r.id,
              'name',
              r.name,
              'capacity_min',
              r.capacity_min,
              'capacity_max',
              r.capacity_max,
              'size_sqft',
              r.size_sqft,
              'price_min',
              r.price_min,
              'price_max',
              r.price_max,
              'currency',
              r.currency,
              'amenities',
              COALESCE(r.amenities, '{}'::text []),
              'description',
              r.description,
              'photos',
              COALESCE(r.photos, '{}'::text []),
              'billing_unit',
              r.billing_unit,
              'note',
              r.note,
              'sort_order',
              r.sort_order,
              'created_at',
              r.created_at
            )
            ORDER BY r.sort_order
          )
        FROM rooms r
        WHERE r.venue_id = v.id
      ),
      '[]'::jsonb
    ),
    -- Reviews (latest 3)
    'reviews',
    COALESCE(
      (
        SELECT jsonb_agg(
            jsonb_build_object(
              'id',
              rr.id,
              'rating',
              rr.rating,
              'comment',
              rr.comment,
              'created_at',
              rr.created_at,
              'user',
              jsonb_build_object(
                'id',
                pr.id,
                'name',
                pr.name,
                'avatar_url',
                pr.avatar_url
              )
            )
            ORDER BY rr.created_at DESC
          )
        FROM (
            SELECT r.id,
              r.rating,
              r.comment,
              r.created_at,
              r.user_id
            FROM reviews r
            WHERE r.venue_id = v.id
            ORDER BY r.created_at DESC
            LIMIT 3
          ) rr
          JOIN profiles pr ON pr.id = rr.user_id
      ),
      '[]'::jsonb
    ),
    -- Review stats
    'review_stats',
    jsonb_build_object(
      'avg_rating',
      COALESCE(
        (
          SELECT ROUND(AVG(r.rating)::numeric, 2)
          FROM reviews r
          WHERE r.venue_id = v.id
        ),
        0
      ),
      'review_count',
      COALESCE(
        (
          SELECT COUNT(*)
          FROM reviews r
          WHERE r.venue_id = v.id
        ),
        0
      )
    )
  ) INTO result
FROM venues v
  JOIN venue_types vt ON vt.id = v.type_id
  JOIN profiles p ON p.id = v.owner_id
WHERE v.id = p_venue_id;
RETURN result;
END;
$$;
-- =====================================================
-- Function: get_reviews_by_venue_id
-- =====================================================
create or replace function public.get_reviews_by_venue_id(p_venue_id uuid, offset_count int default 0) returns jsonb language plpgsql as $$
declare result jsonb;
begin
select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'id',
        r.id,
        'rating',
        r.rating,
        'comment',
        r.comment,
        'created_at',
        r.created_at,
        'user',
        jsonb_build_object(
          'id',
          p.id,
          'name',
          p.name,
          'avatar_url',
          p.avatar_url
        )
      )
      order by r.created_at desc
    ),
    '[]'::jsonb
  ) into result
from reviews r
  join profiles p on p.id = r.user_id
where r.venue_id = p_venue_id
order by r.created_at desc
offset offset_count;
return result;
end;
$$;