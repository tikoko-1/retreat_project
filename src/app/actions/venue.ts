'use server'

import { revalidatePath } from 'next/cache'
import { createServerActionClient, createAdminClient } from '@/lib/supabase'
import { venueCreateSchema, venueUpdateSchema, venueSearchSchema } from '@/lib/validations'
import type { Venue, VenueWithDetails, VenueStatus } from '@/types/database'

export interface VenueFormData {
  title: string
  description: string
  short_description?: string
  country: string
  city: string
  address?: string
  latitude?: number
  longitude?: number
  capacity_min: number
  capacity_max: number
  price_min?: number
  price_max?: number
  price_unit: 'weekend' | 'per_night' | 'per_person' | 'week' | 'custom'
  currency?: string
  area_sqft?: number
  bedrooms?: number
  bathrooms?: number
  property_type?: string
  website_url?: string
  instagram_url?: string
  house_rules?: string
  cancellation_policy?: 'flexible' | 'moderate' | 'strict' | 'custom'
  check_in_time?: string
  check_out_time?: string
  minimum_stay?: number
}

export interface VenueSearchParams {
  query?: string
  country?: string
  city?: string
  capacity_min?: number
  capacity_max?: number
  price_min?: number
  price_max?: number
  amenity_ids?: string[]
  property_types?: string[]
  sort_by?: 'relevance' | 'price_low' | 'price_high' | 'rating' | 'newest' | 'featured'
  page?: number
  limit?: number
}

export interface ActionResult<T = any> {
  success: boolean
  data?: T
  error?: string
  errors?: Record<string, string[]>
}

export async function createVenue(
  formData: VenueFormData
): Promise<ActionResult<Venue>> {
  try {
    // Validate input data
    const validationResult = venueCreateSchema.safeParse(formData)
    if (!validationResult.success) {
      return {
        success: false,
        error: 'Invalid input data',
        errors: validationResult.error.flatten().fieldErrors
      }
    }

    const data = validationResult.data
    const supabase = createServerActionClient()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return {
        success: false,
        error: 'Authentication required'
      }
    }

    // Create venue
    const { data: venue, error: venueError } = await supabase
      .from('venues')
      .insert({
        ...data,
        owner_id: user.id,
        status: 'draft'
      })
      .select()
      .single()

    if (venueError) {
      console.error('Error creating venue:', venueError)
      return {
        success: false,
        error: 'Failed to create venue. Please try again.'
      }
    }

    // Revalidate relevant pages
    revalidatePath('/host/venues')
    revalidatePath('/centers')

    return {
      success: true,
      data: venue
    }
  } catch (error) {
    console.error('Error in createVenue:', error)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    }
  }
}

export async function updateVenue(
  venueId: string,
  formData: Partial<VenueFormData>
): Promise<ActionResult<Venue>> {
  try {
    // Validate input data
    const validationResult = venueUpdateSchema.safeParse({
      id: venueId,
      ...formData
    })
    
    if (!validationResult.success) {
      return {
        success: false,
        error: 'Invalid input data',
        errors: validationResult.error.flatten().fieldErrors
      }
    }

    const { id, ...data } = validationResult.data
    const supabase = createServerActionClient()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return {
        success: false,
        error: 'Authentication required'
      }
    }

    // Check if user owns the venue
    const { data: existingVenue, error: fetchError } = await supabase
      .from('venues')
      .select('owner_id')
      .eq('id', venueId)
      .single()

    if (fetchError || !existingVenue) {
      return {
        success: false,
        error: 'Venue not found'
      }
    }

    if (existingVenue.owner_id !== user.id) {
      return {
        success: false,
        error: 'Unauthorized to update this venue'
      }
    }

    // Update venue
    const { data: venue, error: updateError } = await supabase
      .from('venues')
      .update(data)
      .eq('id', venueId)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating venue:', updateError)
      return {
        success: false,
        error: 'Failed to update venue'
      }
    }

    // Revalidate relevant pages
    revalidatePath('/host/venues')
    revalidatePath('/centers')
    revalidatePath(`/centers/${venue.slug}`)

    return {
      success: true,
      data: venue
    }
  } catch (error) {
    console.error('Error in updateVenue:', error)
    return {
      success: false,
      error: 'An unexpected error occurred'
    }
  }
}

export async function updateVenueStatus(
  venueId: string,
  status: VenueStatus
): Promise<ActionResult<Venue>> {
  try {
    const supabase = createServerActionClient()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return {
        success: false,
        error: 'Authentication required'
      }
    }

    // Check user permissions
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    const isAdmin = profile?.role === 'admin'

    // For non-admin users, only allow certain status transitions
    if (!isAdmin) {
      const allowedStatuses: VenueStatus[] = ['draft', 'pending']
      if (!allowedStatuses.includes(status)) {
        return {
          success: false,
          error: 'Unauthorized status change'
        }
      }

      // Check if user owns the venue
      const { data: venue, error: fetchError } = await supabase
        .from('venues')
        .select('owner_id')
        .eq('id', venueId)
        .single()

      if (fetchError || !venue) {
        return {
          success: false,
          error: 'Venue not found'
        }
      }

      if (venue.owner_id !== user.id) {
        return {
          success: false,
          error: 'Unauthorized to update this venue'
        }
      }
    }

    // Update venue status
    const { data: updatedVenue, error: updateError } = await supabase
      .from('venues')
      .update({ status })
      .eq('id', venueId)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating venue status:', updateError)
      return {
        success: false,
        error: 'Failed to update venue status'
      }
    }

    // Revalidate relevant pages
    revalidatePath('/host/venues')
    revalidatePath('/admin/venues')
    revalidatePath('/centers')
    if (updatedVenue.slug) {
      revalidatePath(`/centers/${updatedVenue.slug}`)
    }

    return {
      success: true,
      data: updatedVenue
    }
  } catch (error) {
    console.error('Error in updateVenueStatus:', error)
    return {
      success: false,
      error: 'An unexpected error occurred'
    }
  }
}

export async function deleteVenue(venueId: string): Promise<ActionResult> {
  try {
    const supabase = createServerActionClient()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return {
        success: false,
        error: 'Authentication required'
      }
    }

    // Check if user owns the venue
    const { data: venue, error: fetchError } = await supabase
      .from('venues')
      .select('owner_id, slug')
      .eq('id', venueId)
      .single()

    if (fetchError || !venue) {
      return {
        success: false,
        error: 'Venue not found'
      }
    }

    if (venue.owner_id !== user.id) {
      return {
        success: false,
        error: 'Unauthorized to delete this venue'
      }
    }

    // Delete venue (cascade will handle related records)
    const { error: deleteError } = await supabase
      .from('venues')
      .delete()
      .eq('id', venueId)

    if (deleteError) {
      console.error('Error deleting venue:', deleteError)
      return {
        success: false,
        error: 'Failed to delete venue'
      }
    }

    // Revalidate relevant pages
    revalidatePath('/host/venues')
    revalidatePath('/centers')

    return {
      success: true
    }
  } catch (error) {
    console.error('Error in deleteVenue:', error)
    return {
      success: false,
      error: 'An unexpected error occurred'
    }
  }
}

export async function searchVenues(
  params: VenueSearchParams
): Promise<ActionResult<{ venues: VenueWithDetails[], total: number }>> {
  try {
    // Validate search parameters
    const validationResult = venueSearchSchema.safeParse(params)
    if (!validationResult.success) {
      return {
        success: false,
        error: 'Invalid search parameters',
        errors: validationResult.error.flatten().fieldErrors
      }
    }

    const {
      query,
      country,
      city,
      capacity_min,
      capacity_max,
      price_min,
      price_max,
      amenity_ids,
      property_types,
      sort_by = 'relevance',
      page = 1,
      limit = 20
    } = validationResult.data

    const supabase = createServerActionClient()

    // Build the base query
    let queryBuilder = supabase
      .from('venues')
      .select(`
        *,
        venue_photos!inner(url, alt_text, position, is_cover),
        amenities!venue_amenities(id, name, group_type, icon_url),
        reviews!inner(rating, comment, reviewer_name, is_published),
        owner:profiles!venues_owner_id_fkey(name, avatar_url, is_verified)
      `)
      .eq('status', 'published')

    // Apply filters
    if (country) {
      queryBuilder = queryBuilder.eq('country', country)
    }

    if (city) {
      queryBuilder = queryBuilder.eq('city', city)
    }

    if (capacity_min) {
      queryBuilder = queryBuilder.gte('capacity_max', capacity_min)
    }

    if (capacity_max) {
      queryBuilder = queryBuilder.lte('capacity_min', capacity_max)
    }

    if (price_min) {
      queryBuilder = queryBuilder.gte('price_max', price_min)
    }

    if (price_max) {
      queryBuilder = queryBuilder.lte('price_min', price_max)
    }

    if (property_types && property_types.length > 0) {
      queryBuilder = queryBuilder.in('property_type', property_types)
    }

    // Text search
    if (query) {
      queryBuilder = queryBuilder.textSearch('title', query, {
        type: 'websearch',
        config: 'english'
      })
    }

    // Amenity filtering (if specified)
    if (amenity_ids && amenity_ids.length > 0) {
      // This requires a more complex query with joins
      // For now, we'll handle this in a separate query
    }

    // Apply sorting
    switch (sort_by) {
      case 'price_low':
        queryBuilder = queryBuilder.order('price_min', { ascending: true, nullsLast: true })
        break
      case 'price_high':
        queryBuilder = queryBuilder.order('price_max', { ascending: false, nullsLast: true })
        break
      case 'newest':
        queryBuilder = queryBuilder.order('created_at', { ascending: false })
        break
      case 'featured':
        queryBuilder = queryBuilder.order('is_featured', { ascending: false })
        break
      case 'rating':
        // This would require calculating average rating
        queryBuilder = queryBuilder.order('created_at', { ascending: false })
        break
      default: // relevance
        queryBuilder = queryBuilder.order('view_count', { ascending: false })
        break
    }

    // Get total count for pagination
    const { count } = await supabase
      .from('venues')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published')

    // Apply pagination
    const offset = (page - 1) * limit
    const { data: venues, error } = await queryBuilder
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Error searching venues:', error)
      return {
        success: false,
        error: 'Failed to search venues'
      }
    }

    return {
      success: true,
      data: {
        venues: venues || [],
        total: count || 0
      }
    }
  } catch (error) {
    console.error('Error in searchVenues:', error)
    return {
      success: false,
      error: 'An unexpected error occurred'
    }
  }
}

export async function getVenueBySlug(
  slug: string
): Promise<ActionResult<VenueWithDetails>> {
  try {
    const supabase = createServerActionClient()

    const { data: venue, error } = await supabase
      .from('venues')
      .select(`
        *,
        venue_photos(url, alt_text, position, is_cover),
        amenities!venue_amenities(id, name, group_type, icon_url, description),
        reviews!inner(rating, comment, reviewer_name, reviewer_title, is_published, created_at),
        owner:profiles!venues_owner_id_fkey(name, avatar_url, bio, is_verified, website_url, instagram_url),
        price_packages(name, price, duration_days, description, is_active),
        food_dining(meal_type, diet_options, description, price, is_included),
        cancellation_policies(days_before, refund_percent, description)
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .eq('reviews.is_published', true)
      .single()

    if (error) {
      console.error('Error fetching venue by slug:', error)
      return {
        success: false,
        error: 'Venue not found'
      }
    }

    // Increment view count
    await supabase.rpc('increment_venue_views', { venue_uuid: venue.id })

    return {
      success: true,
      data: venue
    }
  } catch (error) {
    console.error('Error in getVenueBySlug:', error)
    return {
      success: false,
      error: 'An unexpected error occurred'
    }
  }
}

export async function getVenuesForHost(
  userId: string,
  status?: VenueStatus,
  page: number = 1,
  limit: number = 20
): Promise<ActionResult<{ venues: Venue[], total: number }>> {
  try {
    const supabase = createServerActionClient()

    // Build query
    let query = supabase
      .from('venues')
      .select(`
        *,
        venue_photos(url, alt_text, is_cover),
        _count:inquiries(count)
      `)
      .eq('owner_id', userId)
      .order('updated_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    // Get total count
    const { count } = await supabase
      .from('venues')
      .select('*', { count: 'exact', head: true })
      .eq('owner_id', userId)

    // Get paginated results
    const offset = (page - 1) * limit
    const { data: venues, error } = await query
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Error fetching host venues:', error)
      return {
        success: false,
        error: 'Failed to fetch venues'
      }
    }

    return {
      success: true,
      data: {
        venues: venues || [],
        total: count || 0
      }
    }
  } catch (error) {
    console.error('Error in getVenuesForHost:', error)
    return {
      success: false,
      error: 'An unexpected error occurred'
    }
  }
}

export async function getVenuesForAdmin(
  status?: VenueStatus,
  page: number = 1,
  limit: number = 20
): Promise<ActionResult<{ venues: Venue[], total: number }>> {
  try {
    const supabase = createServerActionClient()

    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return {
        success: false,
        error: 'Authentication required'
      }
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return {
        success: false,
        error: 'Admin access required'
      }
    }

    // Build query
    let query = supabase
      .from('venues')
      .select(`
        *,
        owner:profiles!venues_owner_id_fkey(name, email),
        venue_photos(url, alt_text, is_cover)
      `)
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    // Get total count
    const { count } = await supabase
      .from('venues')
      .select('*', { count: 'exact', head: true })

    // Get paginated results
    const offset = (page - 1) * limit
    const { data: venues, error } = await query
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Error fetching admin venues:', error)
      return {
        success: false,
        error: 'Failed to fetch venues'
      }
    }

    return {
      success: true,
      data: {
        venues: venues || [],
        total: count || 0
      }
    }
  } catch (error) {
    console.error('Error in getVenuesForAdmin:', error)
    return {
      success: false,
      error: 'An unexpected error occurred'
    }
  }
}

export async function getFeaturedVenues(
  limit: number = 6
): Promise<ActionResult<VenueWithDetails[]>> {
  try {
    const supabase = createServerActionClient()

    const { data: venues, error } = await supabase
      .from('venues')
      .select(`
        *,
        venue_photos(url, alt_text, is_cover),
        amenities!venue_amenities(name, group_type),
        owner:profiles!venues_owner_id_fkey(name, is_verified)
      `)
      .eq('status', 'published')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching featured venues:', error)
      return {
        success: false,
        error: 'Failed to fetch featured venues'
      }
    }

    return {
      success: true,
      data: venues || []
    }
  } catch (error) {
    console.error('Error in getFeaturedVenues:', error)
    return {
      success: false,
      error: 'An unexpected error occurred'
    }
  }
}

export async function getVenueStats(
  venueId: string
): Promise<ActionResult<{
  inquiries: number
  views: number
  favorites: number
  averageRating: number
  totalReviews: number
}>> {
  try {
    const supabase = createServerActionClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return {
        success: false,
        error: 'Authentication required'
      }
    }

    // Check if user owns the venue
    const { data: venue } = await supabase
      .from('venues')
      .select('owner_id, view_count')
      .eq('id', venueId)
      .single()

    if (!venue || venue.owner_id !== user.id) {
      return {
        success: false,
        error: 'Unauthorized or venue not found'
      }
    }

    // Get inquiry count
    const { count: inquiryCount } = await supabase
      .from('inquiries')
      .select('*', { count: 'exact', head: true })
      .eq('venue_id', venueId)

    // Get favorites count
    const { count: favoritesCount } = await supabase
      .from('favorites')
      .select('*', { count: 'exact', head: true })
      .eq('venue_id', venueId)

    // Get reviews stats
    const { data: reviewStats } = await supabase
      .from('reviews')
      .select('rating')
      .eq('venue_id', venueId)
      .eq('is_published', true)

    const totalReviews = reviewStats?.length || 0
    const averageRating = totalReviews > 0 
      ? reviewStats.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0

    return {
      success: true,
      data: {
        inquiries: inquiryCount || 0,
        views: venue.view_count || 0,
        favorites: favoritesCount || 0,
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews
      }
    }
  } catch (error) {
    console.error('Error in getVenueStats:', error)
    return {
      success: false,
      error: 'An unexpected error occurred'
    }
  }
}

