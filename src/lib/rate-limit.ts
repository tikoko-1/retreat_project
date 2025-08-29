import { NextRequest } from 'next/server'

// Simple in-memory rate limiter (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export interface RateLimitConfig {
  identifier: string
  limit: number
  window: number // in seconds
}

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  resetTime: number
}

export function rateLimit(config: RateLimitConfig): RateLimitResult {
  const { identifier, limit, window } = config
  const now = Date.now()
  const windowStart = now - (window * 1000)

  // Clean up old entries
  for (const [key, value] of rateLimitMap.entries()) {
    if (value.resetTime < now) {
      rateLimitMap.delete(key)
    }
  }

  const current = rateLimitMap.get(identifier)
  
  if (!current || current.resetTime < now) {
    // First request or window has reset
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + (window * 1000)
    })
    
    return {
      success: true,
      limit,
      remaining: limit - 1,
      resetTime: now + (window * 1000)
    }
  }

  if (current.count >= limit) {
    // Rate limit exceeded
    return {
      success: false,
      limit,
      remaining: 0,
      resetTime: current.resetTime
    }
  }

  // Increment count
  current.count++
  rateLimitMap.set(identifier, current)

  return {
    success: true,
    limit,
    remaining: limit - current.count,
    resetTime: current.resetTime
  }
}

// Get client IP address from request
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  
  return request.ip || 'unknown'
}

// Rate limit for inquiries
export function rateLimitInquiry(identifier: string): RateLimitResult {
  const hourlyLimit = parseInt(process.env.INQUIRY_RATE_LIMIT_PER_HOUR || '10')
  const dailyLimit = parseInt(process.env.INQUIRY_RATE_LIMIT_PER_DAY || '50')
  
  // Check hourly limit
  const hourlyResult = rateLimit({
    identifier: `inquiry_hourly_${identifier}`,
    limit: hourlyLimit,
    window: 3600 // 1 hour
  })
  
  if (!hourlyResult.success) {
    return hourlyResult
  }
  
  // Check daily limit
  const dailyResult = rateLimit({
    identifier: `inquiry_daily_${identifier}`,
    limit: dailyLimit,
    window: 86400 // 24 hours
  })
  
  return dailyResult
}

// Rate limit for general API requests
export function rateLimitAPI(identifier: string, endpoint: string): RateLimitResult {
  return rateLimit({
    identifier: `api_${endpoint}_${identifier}`,
    limit: 100, // 100 requests per minute
    window: 60
  })
}

// Rate limit for authentication attempts
export function rateLimitAuth(identifier: string): RateLimitResult {
  return rateLimit({
    identifier: `auth_${identifier}`,
    limit: 5, // 5 attempts per 15 minutes
    window: 900
  })
}

// Rate limit for file uploads
export function rateLimitUpload(identifier: string): RateLimitResult {
  return rateLimit({
    identifier: `upload_${identifier}`,
    limit: 20, // 20 uploads per hour
    window: 3600
  })
}

// Middleware helper to apply rate limiting
export function withRateLimit(
  handler: (request: NextRequest) => Promise<Response>,
  getRateLimitConfig: (request: NextRequest) => RateLimitConfig
) {
  return async (request: NextRequest): Promise<Response> => {
    const config = getRateLimitConfig(request)
    const result = rateLimit(config)
    
    if (!result.success) {
      return new Response(
        JSON.stringify({
          error: 'Rate limit exceeded',
          limit: result.limit,
          remaining: result.remaining,
          resetTime: result.resetTime
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': result.limit.toString(),
            'X-RateLimit-Remaining': result.remaining.toString(),
            'X-RateLimit-Reset': result.resetTime.toString(),
            'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString()
          }
        }
      )
    }
    
    const response = await handler(request)
    
    // Add rate limit headers to successful responses
    response.headers.set('X-RateLimit-Limit', result.limit.toString())
    response.headers.set('X-RateLimit-Remaining', result.remaining.toString())
    response.headers.set('X-RateLimit-Reset', result.resetTime.toString())
    
    return response
  }
}

