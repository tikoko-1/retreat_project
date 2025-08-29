'use server'

import { revalidatePath } from 'next/cache'
import { createServerActionClient } from '@/lib/supabase'
import { inquiryCreateSchema, inquiryUpdateSchema } from '@/lib/validations'
import { rateLimitInquiry, getClientIP } from '@/lib/rate-limit'
import { 
  generateInquiryConfirmationEmail, 
  generateInquiryNotificationEmail, 
  sendEmailSafe 
} from '@/lib/email'
import type { Inquiry, InquiryStatus } from '@/types/database'

export interface InquiryFormData {
  venue_id: string
  guest_name: string
  guest_email: string
  guest_phone?: string
  group_size: number
  check_in_date?: string
  check_out_date?: string
  message?: string
}

export interface ActionResult<T = any> {
  success: boolean
  data?: T
  error?: string
  errors?: Record<string, string[]>
}

export async function createInquiry(
  formData: InquiryFormData
): Promise<ActionResult<Inquiry>> {
  try {
    // Validate input data
    const validationResult = inquiryCreateSchema.safeParse(formData)
    if (!validationResult.success) {
      return {
        success: false,
        error: 'Invalid input data',
        errors: validationResult.error.flatten().fieldErrors
      }
    }

    const data = validationResult.data

    // Rate limiting check
    const rateLimitResult = rateLimitInquiry(data.guest_email)
    if (!rateLimitResult.success) {
      return {
        success: false,
        error: 'Too many inquiries. Please try again later.',
      }
    }

    const supabase = createServerActionClient()

    // Get venue details with owner information
    const { data: venue, error: venueError } = await supabase
      .from('venues')
      .select(`
        *,
        owner:profiles!venues_owner_id_fkey(*)
      `)
      .eq('id', data.venue_id)
      .eq('status', 'published')
      .single()

    if (venueError || !venue) {
      return {
        success: false,
        error: 'Venue not found or not available'
      }
    }

    // Check if user is authenticated and get user ID
    const { data: { user } } = await supabase.auth.getUser()
    
    // Create inquiry
    const { data: inquiry, error: inquiryError } = await supabase
      .from('inquiries')
      .insert({
        venue_id: data.venue_id,
        user_id: user?.id || null,
        guest_name: data.guest_name,
        guest_email: data.guest_email,
        guest_phone: data.guest_phone,
        group_size: data.group_size,
        check_in_date: data.check_in_date,
        check_out_date: data.check_out_date,
        message: data.message,
        status: 'new'
      })
      .select()
      .single()

    if (inquiryError) {
      console.error('Error creating inquiry:', inquiryError)
      return {
        success: false,
        error: 'Failed to create inquiry. Please try again.'
      }
    }

    // Send confirmation email to guest
    const confirmationEmail = generateInquiryConfirmationEmail(inquiry, venue)
    await sendEmailSafe(confirmationEmail, 'inquiry confirmation')

    // Send notification email to venue owner
    if (venue.owner?.email) {
      const notificationEmail = generateInquiryNotificationEmail(
        inquiry, 
        venue, 
        venue.owner
      )
      await sendEmailSafe(notificationEmail, 'inquiry notification')
    }

    // Revalidate relevant pages
    revalidatePath('/centers/[slug]', 'page')
    revalidatePath('/account/inquiries')
    revalidatePath('/host/inquiries')

    return {
      success: true,
      data: inquiry
    }
  } catch (error) {
    console.error('Error in createInquiry:', error)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    }
  }
}

export async function updateInquiryStatus(
  inquiryId: string,
  status: InquiryStatus,
  hostResponse?: string
): Promise<ActionResult<Inquiry>> {
  try {
    // Validate input
    const validationResult = inquiryUpdateSchema.safeParse({
      id: inquiryId,
      status,
      host_response: hostResponse
    })

    if (!validationResult.success) {
      return {
        success: false,
        error: 'Invalid input data',
        errors: validationResult.error.flatten().fieldErrors
      }
    }

    const supabase = createServerActionClient()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return {
        success: false,
        error: 'Authentication required'
      }
    }

    // Check if user owns the venue for this inquiry
    const { data: inquiry, error: inquiryError } = await supabase
      .from('inquiries')
      .select(`
        *,
        venue:venues!inquiries_venue_id_fkey(
          owner_id,
          title
        )
      `)
      .eq('id', inquiryId)
      .single()

    if (inquiryError || !inquiry) {
      return {
        success: false,
        error: 'Inquiry not found'
      }
    }

    // Check authorization
    if (inquiry.venue.owner_id !== user.id) {
      return {
        success: false,
        error: 'Unauthorized to update this inquiry'
      }
    }

    // Update inquiry
    const updateData: any = { status }
    if (hostResponse) {
      updateData.host_response = hostResponse
      updateData.responded_at = new Date().toISOString()
    }

    const { data: updatedInquiry, error: updateError } = await supabase
      .from('inquiries')
      .update(updateData)
      .eq('id', inquiryId)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating inquiry:', updateError)
      return {
        success: false,
        error: 'Failed to update inquiry'
      }
    }

    // Revalidate relevant pages
    revalidatePath('/host/inquiries')
    revalidatePath('/account/inquiries')

    return {
      success: true,
      data: updatedInquiry
    }
  } catch (error) {
    console.error('Error in updateInquiryStatus:', error)
    return {
      success: false,
      error: 'An unexpected error occurred'
    }
  }
}

export async function getInquiriesForHost(
  userId: string,
  status?: InquiryStatus,
  page: number = 1,
  limit: number = 20
): Promise<ActionResult<{ inquiries: Inquiry[], total: number }>> {
  try {
    const supabase = createServerActionClient()

    // Build query
    let query = supabase
      .from('inquiries')
      .select(`
        *,
        venue:venues!inquiries_venue_id_fkey(
          id,
          title,
          city,
          country,
          owner_id
        )
      `)
      .eq('venue.owner_id', userId)
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    // Get total count
    const { count } = await supabase
      .from('inquiries')
      .select('*', { count: 'exact', head: true })
      .eq('venue.owner_id', userId)

    // Get paginated results
    const offset = (page - 1) * limit
    const { data: inquiries, error } = await query
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Error fetching host inquiries:', error)
      return {
        success: false,
        error: 'Failed to fetch inquiries'
      }
    }

    return {
      success: true,
      data: {
        inquiries: inquiries || [],
        total: count || 0
      }
    }
  } catch (error) {
    console.error('Error in getInquiriesForHost:', error)
    return {
      success: false,
      error: 'An unexpected error occurred'
    }
  }
}

export async function getInquiriesForUser(
  userId: string,
  page: number = 1,
  limit: number = 20
): Promise<ActionResult<{ inquiries: Inquiry[], total: number }>> {
  try {
    const supabase = createServerActionClient()

    // Get user email for matching guest inquiries
    const { data: profile } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', userId)
      .single()

    if (!profile?.email) {
      return {
        success: false,
        error: 'User profile not found'
      }
    }

    // Build query to get inquiries by user_id or guest_email
    let query = supabase
      .from('inquiries')
      .select(`
        *,
        venue:venues!inquiries_venue_id_fkey(
          id,
          title,
          city,
          country,
          slug
        )
      `)
      .or(`user_id.eq.${userId},guest_email.eq.${profile.email}`)
      .order('created_at', { ascending: false })

    // Get total count
    const { count } = await supabase
      .from('inquiries')
      .select('*', { count: 'exact', head: true })
      .or(`user_id.eq.${userId},guest_email.eq.${profile.email}`)

    // Get paginated results
    const offset = (page - 1) * limit
    const { data: inquiries, error } = await query
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Error fetching user inquiries:', error)
      return {
        success: false,
        error: 'Failed to fetch inquiries'
      }
    }

    return {
      success: true,
      data: {
        inquiries: inquiries || [],
        total: count || 0
      }
    }
  } catch (error) {
    console.error('Error in getInquiriesForUser:', error)
    return {
      success: false,
      error: 'An unexpected error occurred'
    }
  }
}

export async function deleteInquiry(inquiryId: string): Promise<ActionResult> {
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

    // Check if user owns the venue or is the inquirer
    const { data: inquiry, error: inquiryError } = await supabase
      .from('inquiries')
      .select(`
        *,
        venue:venues!inquiries_venue_id_fkey(owner_id)
      `)
      .eq('id', inquiryId)
      .single()

    if (inquiryError || !inquiry) {
      return {
        success: false,
        error: 'Inquiry not found'
      }
    }

    // Check authorization (venue owner or inquirer can delete)
    const isOwner = inquiry.venue.owner_id === user.id
    const isInquirer = inquiry.user_id === user.id

    if (!isOwner && !isInquirer) {
      return {
        success: false,
        error: 'Unauthorized to delete this inquiry'
      }
    }

    // Delete inquiry
    const { error: deleteError } = await supabase
      .from('inquiries')
      .delete()
      .eq('id', inquiryId)

    if (deleteError) {
      console.error('Error deleting inquiry:', deleteError)
      return {
        success: false,
        error: 'Failed to delete inquiry'
      }
    }

    // Revalidate relevant pages
    revalidatePath('/host/inquiries')
    revalidatePath('/account/inquiries')

    return {
      success: true
    }
  } catch (error) {
    console.error('Error in deleteInquiry:', error)
    return {
      success: false,
      error: 'An unexpected error occurred'
    }
  }
}

