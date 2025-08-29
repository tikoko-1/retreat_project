import { z } from 'zod'

// User/Profile validations
export const profileUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  bio: z.string().max(500, 'Bio too long').optional(),
  phone: z.string().max(20, 'Phone number too long').optional(),
  website_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  instagram_url: z.string().url('Invalid URL').optional().or(z.literal('')),
})

// Venue validations
export const venueCreateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(5000, 'Description too long'),
  short_description: z.string().max(300, 'Short description too long').optional(),
  country: z.string().min(1, 'Country is required').max(100, 'Country name too long'),
  city: z.string().min(1, 'City is required').max(100, 'City name too long'),
  address: z.string().max(300, 'Address too long').optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  capacity_min: z.number().min(1, 'Minimum capacity must be at least 1').max(1000, 'Capacity too high'),
  capacity_max: z.number().min(1, 'Maximum capacity must be at least 1').max(1000, 'Capacity too high'),
  price_min: z.number().min(0, 'Price cannot be negative').max(100000, 'Price too high').optional(),
  price_max: z.number().min(0, 'Price cannot be negative').max(100000, 'Price too high').optional(),
  price_unit: z.enum(['weekend', 'per_night', 'per_person', 'week', 'custom']),
  currency: z.string().length(3, 'Currency must be 3 characters').optional(),
  area_sqft: z.number().min(0, 'Area cannot be negative').max(1000000, 'Area too large').optional(),
  bedrooms: z.number().min(0, 'Bedrooms cannot be negative').max(100, 'Too many bedrooms').optional(),
  bathrooms: z.number().min(0, 'Bathrooms cannot be negative').max(100, 'Too many bathrooms').optional(),
  property_type: z.string().max(50, 'Property type too long').optional(),
  website_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  instagram_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  house_rules: z.string().max(2000, 'House rules too long').optional(),
  cancellation_policy: z.enum(['flexible', 'moderate', 'strict', 'custom']).optional(),
  check_in_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format').optional(),
  check_out_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format').optional(),
  minimum_stay: z.number().min(1, 'Minimum stay must be at least 1 day').max(365, 'Minimum stay too long').optional(),
}).refine(data => data.capacity_max >= data.capacity_min, {
  message: 'Maximum capacity must be greater than or equal to minimum capacity',
  path: ['capacity_max']
}).refine(data => !data.price_min || !data.price_max || data.price_max >= data.price_min, {
  message: 'Maximum price must be greater than or equal to minimum price',
  path: ['price_max']
})

export const venueUpdateSchema = venueCreateSchema.partial().extend({
  id: z.string().uuid('Invalid venue ID'),
  status: z.enum(['draft', 'pending', 'published', 'rejected']).optional(),
})

// Venue photo validations
export const venuePhotoSchema = z.object({
  venue_id: z.string().uuid('Invalid venue ID'),
  url: z.string().url('Invalid image URL'),
  alt_text: z.string().max(200, 'Alt text too long').optional(),
  position: z.number().min(0, 'Position cannot be negative').max(100, 'Position too high').optional(),
  is_cover: z.boolean().optional(),
})

// Inquiry validations
export const inquiryCreateSchema = z.object({
  venue_id: z.string().uuid('Invalid venue ID'),
  guest_name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  guest_email: z.string().email('Invalid email address'),
  guest_phone: z.string().max(20, 'Phone number too long').optional(),
  group_size: z.number().min(1, 'Group size must be at least 1').max(1000, 'Group size too large'),
  check_in_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format').optional(),
  check_out_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format').optional(),
  message: z.string().max(2000, 'Message too long').optional(),
}).refine(data => {
  if (data.check_in_date && data.check_out_date) {
    return new Date(data.check_out_date) > new Date(data.check_in_date)
  }
  return true
}, {
  message: 'Check-out date must be after check-in date',
  path: ['check_out_date']
})

export const inquiryUpdateSchema = z.object({
  id: z.string().uuid('Invalid inquiry ID'),
  status: z.enum(['new', 'viewed', 'responded', 'closed']).optional(),
  host_response: z.string().max(2000, 'Response too long').optional(),
})

// Review validations
export const reviewCreateSchema = z.object({
  venue_id: z.string().uuid('Invalid venue ID'),
  reviewer_name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  reviewer_title: z.string().max(100, 'Title too long').optional(),
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
  comment: z.string().min(10, 'Comment must be at least 10 characters').max(1000, 'Comment too long'),
})

export const reviewUpdateSchema = z.object({
  id: z.string().uuid('Invalid review ID'),
  is_verified: z.boolean().optional(),
  is_published: z.boolean().optional(),
})

// Favorite validations
export const favoriteToggleSchema = z.object({
  venue_id: z.string().uuid('Invalid venue ID'),
})

// Search and filter validations
export const venueSearchSchema = z.object({
  query: z.string().max(200, 'Search query too long').optional(),
  country: z.string().max(100, 'Country name too long').optional(),
  city: z.string().max(100, 'City name too long').optional(),
  capacity_min: z.number().min(1).max(1000).optional(),
  capacity_max: z.number().min(1).max(1000).optional(),
  price_min: z.number().min(0).max(100000).optional(),
  price_max: z.number().min(0).max(100000).optional(),
  amenity_ids: z.array(z.string().uuid()).optional(),
  property_types: z.array(z.string().max(50)).optional(),
  sort_by: z.enum(['relevance', 'price_low', 'price_high', 'rating', 'newest', 'featured']).optional(),
  page: z.number().min(1).max(1000).optional(),
  limit: z.number().min(1).max(100).optional(),
})

// Blog and guide validations
export const blogArticleCreateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  content: z.string().min(10, 'Content must be at least 10 characters').max(50000, 'Content too long'),
  excerpt: z.string().max(500, 'Excerpt too long').optional(),
  cover_image: z.string().url('Invalid image URL').optional(),
  tags: z.array(z.string().max(50, 'Tag too long')).max(10, 'Too many tags').optional(),
  is_published: z.boolean().optional(),
})

export const guideCreateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  category: z.enum(['destination', 'wellness', 'yoga', 'meditation', 'marketing', 'operations', 'other']),
  content: z.string().min(10, 'Content must be at least 10 characters').max(50000, 'Content too long'),
  excerpt: z.string().max(500, 'Excerpt too long').optional(),
  cover_image: z.string().url('Invalid image URL').optional(),
  region: z.string().max(100, 'Region name too long').optional(),
  read_time_minutes: z.number().min(1).max(300).optional(),
  is_published: z.boolean().optional(),
})

// Price package validations
export const pricePackageSchema = z.object({
  venue_id: z.string().uuid('Invalid venue ID'),
  name: z.string().min(1, 'Package name is required').max(100, 'Package name too long'),
  price: z.number().min(0, 'Price cannot be negative').max(100000, 'Price too high'),
  duration_days: z.number().min(1, 'Duration must be at least 1 day').max(365, 'Duration too long').optional(),
  description: z.string().max(500, 'Description too long').optional(),
  is_active: z.boolean().optional(),
})

// Food & dining validations
export const foodDiningSchema = z.object({
  venue_id: z.string().uuid('Invalid venue ID'),
  meal_type: z.string().max(50, 'Meal type too long').optional(),
  diet_options: z.array(z.string().max(50, 'Diet option too long')).max(20, 'Too many diet options').optional(),
  description: z.string().max(500, 'Description too long').optional(),
  price: z.number().min(0, 'Price cannot be negative').max(10000, 'Price too high').optional(),
  is_included: z.boolean().optional(),
})

// Cancellation policy validations
export const cancellationPolicySchema = z.object({
  venue_id: z.string().uuid('Invalid venue ID'),
  days_before: z.number().min(0, 'Days before cannot be negative').max(365, 'Days before too high'),
  refund_percent: z.number().min(0, 'Refund percent cannot be negative').max(100, 'Refund percent cannot exceed 100'),
  description: z.string().max(500, 'Description too long').optional(),
})

// Availability block validations
export const availabilityBlockSchema = z.object({
  venue_id: z.string().uuid('Invalid venue ID'),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  is_available: z.boolean().optional(),
  reason: z.string().max(200, 'Reason too long').optional(),
}).refine(data => new Date(data.end_date) >= new Date(data.start_date), {
  message: 'End date must be on or after start date',
  path: ['end_date']
})

// Rate limiting validation
export const rateLimitSchema = z.object({
  identifier: z.string().min(1, 'Identifier is required'),
  action: z.string().min(1, 'Action is required'),
  limit: z.number().min(1, 'Limit must be at least 1'),
  window: z.number().min(1, 'Window must be at least 1 second'),
})

// File upload validation
export const fileUploadSchema = z.object({
  file: z.instanceof(File, 'Invalid file'),
  bucket: z.string().min(1, 'Bucket is required'),
  path: z.string().min(1, 'Path is required'),
  maxSize: z.number().min(1, 'Max size must be at least 1 byte').optional(),
  allowedTypes: z.array(z.string()).optional(),
})

// Email validation
export const emailSchema = z.object({
  to: z.string().email('Invalid email address').or(z.array(z.string().email('Invalid email address'))),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject too long'),
  html: z.string().min(1, 'HTML content is required').optional(),
  text: z.string().min(1, 'Text content is required').optional(),
  from: z.string().email('Invalid from email address').optional(),
  reply_to: z.string().email('Invalid reply-to email address').optional(),
}).refine(data => data.html || data.text, {
  message: 'Either HTML or text content is required',
  path: ['html']
})

