DROP FUNCTION IF EXISTS public.get_filtered_venues_count;
DROP FUNCTION IF EXISTS public.get_filtered_venues;
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