import { NextRequest, NextResponse } from 'next/server'
import { searchVenues } from '@/app/actions/venue'
import { venueSearchSchema } from '@/lib/validations'
import { getClientIP, rateLimitAPI } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimitAPI(clientIP, 'venue-search')
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          limit: rateLimitResult.limit,
          remaining: rateLimitResult.remaining,
          resetTime: rateLimitResult.resetTime
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
          }
        }
      )
    }

    // Parse search parameters
    const { searchParams } = new URL(request.url)
    
    const searchData = {
      query: searchParams.get('query') || undefined,
      country: searchParams.get('country') || undefined,
      city: searchParams.get('city') || undefined,
      capacity_min: searchParams.get('capacity_min') ? parseInt(searchParams.get('capacity_min')!) : undefined,
      capacity_max: searchParams.get('capacity_max') ? parseInt(searchParams.get('capacity_max')!) : undefined,
      price_min: searchParams.get('price_min') ? parseFloat(searchParams.get('price_min')!) : undefined,
      price_max: searchParams.get('price_max') ? parseFloat(searchParams.get('price_max')!) : undefined,
      amenity_ids: searchParams.get('amenity_ids')?.split(',').filter(Boolean) || undefined,
      property_types: searchParams.get('property_types')?.split(',').filter(Boolean) || undefined,
      sort_by: searchParams.get('sort_by') as any || 'relevance',
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20,
    }

    // Validate search parameters
    const validationResult = venueSearchSchema.safeParse(searchData)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid search parameters',
          errors: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      )
    }

    // Perform search using server action
    const result = await searchVenues(validationResult.data)

    if (!result.success) {
      return NextResponse.json(
        {
          error: result.error,
          errors: result.errors
        },
        { status: 400 }
      )
    }

    // Calculate pagination metadata
    const { venues, total } = result.data
    const page = validationResult.data.page || 1
    const limit = validationResult.data.limit || 20
    const totalPages = Math.ceil(total / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    // Add rate limit headers to successful response
    const response = NextResponse.json({
      success: true,
      data: venues,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage,
        hasPrevPage
      }
    })

    response.headers.set('X-RateLimit-Limit', rateLimitResult.limit.toString())
    response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString())
    response.headers.set('X-RateLimit-Reset', rateLimitResult.resetTime.toString())

    return response

  } catch (error) {
    console.error('Error in venue search API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

