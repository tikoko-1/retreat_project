import { NextRequest, NextResponse } from 'next/server'
import { createInquiry } from '@/app/actions/inquiry'
import { getClientIP, rateLimitInquiry } from '@/lib/rate-limit'
import { inquiryCreateSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    
    // Rate limiting
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimitInquiry(body.guest_email || clientIP)
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Too many inquiries. Please try again later.',
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

    // Validate input
    const validationResult = inquiryCreateSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid input data',
          errors: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      )
    }

    // Create inquiry using server action
    const result = await createInquiry(validationResult.data)

    if (!result.success) {
      return NextResponse.json(
        {
          error: result.error,
          errors: result.errors
        },
        { status: result.error?.includes('not found') ? 404 : 400 }
      )
    }

    // Add rate limit headers to successful response
    const response = NextResponse.json(
      {
        success: true,
        data: result.data
      },
      { status: 201 }
    )

    response.headers.set('X-RateLimit-Limit', rateLimitResult.limit.toString())
    response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString())
    response.headers.set('X-RateLimit-Reset', rateLimitResult.resetTime.toString())

    return response

  } catch (error) {
    console.error('Error in inquiry API:', error)
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

