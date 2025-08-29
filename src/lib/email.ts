import { Resend } from 'resend'
import type { Inquiry, Venue, Profile } from '@/types/database'

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailConfig {
  to: string | string[]
  subject: string
  html?: string
  text?: string
  from?: string
  replyTo?: string
}

export async function sendEmail(config: EmailConfig) {
  try {
    const { data, error } = await resend.emails.send({
      from: config.from || `${process.env.NEXT_PUBLIC_APP_NAME} <noreply@${process.env.NEXT_PUBLIC_APP_DOMAIN || 'localhost'}>`,
      to: Array.isArray(config.to) ? config.to : [config.to],
      subject: config.subject,
      html: config.html,
      text: config.text,
      reply_to: config.replyTo,
    })

    if (error) {
      console.error('Email sending error:', error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    return { success: true, data }
  } catch (error) {
    console.error('Email service error:', error)
    throw error
  }
}

// Email templates
export function generateInquiryConfirmationEmail(
  inquiry: Inquiry,
  venue: Venue
): EmailConfig {
  const subject = `Inquiry Confirmation - ${venue.title}`
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .content { padding: 20px 0; }
        .venue-info { background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .inquiry-details { background-color: #e9ecef; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; font-size: 14px; color: #6c757d; }
        .button { display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 6px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Thank you for your inquiry!</h1>
        <p>We've received your request and will get back to you soon.</p>
      </div>
      
      <div class="content">
        <div class="venue-info">
          <h2>${venue.title}</h2>
          <p><strong>Location:</strong> ${venue.city}, ${venue.country}</p>
          <p><strong>Capacity:</strong> ${venue.capacity_min}-${venue.capacity_max} guests</p>
          ${venue.price_min ? `<p><strong>Price:</strong> From ${venue.currency || 'USD'} ${venue.price_min}/${venue.price_unit.replace('_', ' ')}</p>` : ''}
        </div>
        
        <div class="inquiry-details">
          <h3>Your Inquiry Details</h3>
          <p><strong>Name:</strong> ${inquiry.guest_name}</p>
          <p><strong>Email:</strong> ${inquiry.guest_email}</p>
          ${inquiry.guest_phone ? `<p><strong>Phone:</strong> ${inquiry.guest_phone}</p>` : ''}
          <p><strong>Group Size:</strong> ${inquiry.group_size} guests</p>
          ${inquiry.check_in_date ? `<p><strong>Check-in:</strong> ${inquiry.check_in_date}</p>` : ''}
          ${inquiry.check_out_date ? `<p><strong>Check-out:</strong> ${inquiry.check_out_date}</p>` : ''}
          ${inquiry.message ? `<p><strong>Message:</strong><br>${inquiry.message}</p>` : ''}
        </div>
        
        <p>The venue owner will review your inquiry and respond directly to your email address. This typically happens within 24-48 hours.</p>
        
        <p>In the meantime, you can:</p>
        <ul>
          <li>Browse similar venues on our platform</li>
          <li>Read our guides for planning your retreat</li>
          <li>Contact us if you have any questions</li>
        </ul>
      </div>
      
      <div class="footer">
        <p>Best regards,<br>The ${process.env.NEXT_PUBLIC_APP_NAME} Team</p>
        <p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}">Visit our website</a> | 
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/support">Contact Support</a>
        </p>
      </div>
    </body>
    </html>
  `
  
  const text = `
Thank you for your inquiry!

We've received your request for ${venue.title} in ${venue.city}, ${venue.country}.

Your inquiry details:
- Name: ${inquiry.guest_name}
- Email: ${inquiry.guest_email}
${inquiry.guest_phone ? `- Phone: ${inquiry.guest_phone}` : ''}
- Group Size: ${inquiry.group_size} guests
${inquiry.check_in_date ? `- Check-in: ${inquiry.check_in_date}` : ''}
${inquiry.check_out_date ? `- Check-out: ${inquiry.check_out_date}` : ''}
${inquiry.message ? `- Message: ${inquiry.message}` : ''}

The venue owner will review your inquiry and respond directly to your email address within 24-48 hours.

Best regards,
The ${process.env.NEXT_PUBLIC_APP_NAME} Team

Visit our website: ${process.env.NEXT_PUBLIC_APP_URL}
Contact Support: ${process.env.NEXT_PUBLIC_APP_URL}/support
  `
  
  return {
    to: inquiry.guest_email,
    subject,
    html,
    text
  }
}

export function generateInquiryNotificationEmail(
  inquiry: Inquiry,
  venue: Venue,
  owner: Profile
): EmailConfig {
  const subject = `New Inquiry for ${venue.title}`
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #28a745; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .content { padding: 20px 0; }
        .inquiry-details { background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .guest-info { background-color: #e9ecef; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; font-size: 14px; color: #6c757d; }
        .button { display: inline-block; padding: 12px 24px; background-color: #28a745; color: white; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        .urgent { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 10px; border-radius: 6px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>New Inquiry Received!</h1>
        <p>You have a new inquiry for your venue: ${venue.title}</p>
      </div>
      
      <div class="content">
        <div class="urgent">
          <strong>⏰ Action Required:</strong> Please respond to this inquiry within 24-48 hours to maintain your response rate.
        </div>
        
        <div class="guest-info">
          <h3>Guest Information</h3>
          <p><strong>Name:</strong> ${inquiry.guest_name}</p>
          <p><strong>Email:</strong> <a href="mailto:${inquiry.guest_email}">${inquiry.guest_email}</a></p>
          ${inquiry.guest_phone ? `<p><strong>Phone:</strong> <a href="tel:${inquiry.guest_phone}">${inquiry.guest_phone}</a></p>` : ''}
          <p><strong>Group Size:</strong> ${inquiry.group_size} guests</p>
          ${inquiry.check_in_date ? `<p><strong>Preferred Check-in:</strong> ${inquiry.check_in_date}</p>` : ''}
          ${inquiry.check_out_date ? `<p><strong>Preferred Check-out:</strong> ${inquiry.check_out_date}</p>` : ''}
        </div>
        
        ${inquiry.message ? `
        <div class="inquiry-details">
          <h3>Guest Message</h3>
          <p>${inquiry.message}</p>
        </div>
        ` : ''}
        
        <div class="inquiry-details">
          <h3>Venue Details</h3>
          <p><strong>Venue:</strong> ${venue.title}</p>
          <p><strong>Location:</strong> ${venue.city}, ${venue.country}</p>
          <p><strong>Your Capacity:</strong> ${venue.capacity_min}-${venue.capacity_max} guests</p>
        </div>
        
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/host/inquiries" class="button">
          Manage Inquiry in Dashboard
        </a>
        
        <h3>Next Steps:</h3>
        <ol>
          <li>Review the guest's requirements and dates</li>
          <li>Check your venue availability</li>
          <li>Respond directly to the guest's email or through your dashboard</li>
          <li>Provide pricing, availability, and any additional information</li>
        </ol>
        
        <div class="urgent">
          <strong>💡 Pro Tip:</strong> Quick responses lead to higher booking rates. Consider setting up email notifications on your phone.
        </div>
      </div>
      
      <div class="footer">
        <p>Best regards,<br>The ${process.env.NEXT_PUBLIC_APP_NAME} Team</p>
        <p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/host">Host Dashboard</a> | 
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/support">Contact Support</a>
        </p>
      </div>
    </body>
    </html>
  `
  
  const text = `
New Inquiry Received!

You have a new inquiry for your venue: ${venue.title}

Guest Information:
- Name: ${inquiry.guest_name}
- Email: ${inquiry.guest_email}
${inquiry.guest_phone ? `- Phone: ${inquiry.guest_phone}` : ''}
- Group Size: ${inquiry.group_size} guests
${inquiry.check_in_date ? `- Preferred Check-in: ${inquiry.check_in_date}` : ''}
${inquiry.check_out_date ? `- Preferred Check-out: ${inquiry.check_out_date}` : ''}

${inquiry.message ? `Guest Message:\n${inquiry.message}\n` : ''}

Venue: ${venue.title}
Location: ${venue.city}, ${venue.country}
Capacity: ${venue.capacity_min}-${venue.capacity_max} guests

Please respond within 24-48 hours to maintain your response rate.

Manage this inquiry: ${process.env.NEXT_PUBLIC_APP_URL}/host/inquiries

Best regards,
The ${process.env.NEXT_PUBLIC_APP_NAME} Team
  `
  
  return {
    to: owner.email!,
    subject,
    html,
    text,
    replyTo: inquiry.guest_email
  }
}

export function generateWelcomeEmail(user: Profile): EmailConfig {
  const subject = `Welcome to ${process.env.NEXT_PUBLIC_APP_NAME}!`
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #007bff; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .content { padding: 20px 0; }
        .feature-box { background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; font-size: 14px; color: #6c757d; }
        .button { display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 6px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Welcome to ${process.env.NEXT_PUBLIC_APP_NAME}!</h1>
        <p>Thank you for joining our community of retreat organizers and venue owners.</p>
      </div>
      
      <div class="content">
        <p>Hi ${user.name || 'there'},</p>
        
        <p>We're excited to have you on board! Whether you're looking to host transformative retreats or list your beautiful venue, you're in the right place.</p>
        
        <div class="feature-box">
          <h3>🔍 Discover Amazing Venues</h3>
          <p>Browse our curated collection of retreat centers, villas, and unique spaces perfect for your next event.</p>
        </div>
        
        <div class="feature-box">
          <h3>📝 Easy Inquiries</h3>
          <p>Connect directly with venue owners and get personalized quotes for your retreat needs.</p>
        </div>
        
        <div class="feature-box">
          <h3>❤️ Save Favorites</h3>
          <p>Keep track of venues you love and compare them easily when planning your retreat.</p>
        </div>
        
        ${user.role === 'host' ? `
        <div class="feature-box">
          <h3>🏠 List Your Venue</h3>
          <p>As a host, you can showcase your property to retreat organizers worldwide and grow your business.</p>
        </div>
        ` : ''}
        
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/centers" class="button">
          Start Exploring Venues
        </a>
        
        <p>If you have any questions or need help getting started, don't hesitate to reach out to our support team.</p>
      </div>
      
      <div class="footer">
        <p>Happy retreat planning!<br>The ${process.env.NEXT_PUBLIC_APP_NAME} Team</p>
        <p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}">Visit Website</a> | 
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/guides">Read Guides</a> | 
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/support">Get Support</a>
        </p>
      </div>
    </body>
    </html>
  `
  
  const text = `
Welcome to ${process.env.NEXT_PUBLIC_APP_NAME}!

Hi ${user.name || 'there'},

Thank you for joining our community of retreat organizers and venue owners. We're excited to have you on board!

What you can do:
- Discover amazing venues for your retreats
- Connect directly with venue owners
- Save your favorite venues
${user.role === 'host' ? '- List and manage your own venues' : ''}

Start exploring: ${process.env.NEXT_PUBLIC_APP_URL}/centers

If you have any questions, our support team is here to help.

Happy retreat planning!
The ${process.env.NEXT_PUBLIC_APP_NAME} Team

${process.env.NEXT_PUBLIC_APP_URL}
  `
  
  return {
    to: user.email!,
    subject,
    html,
    text
  }
}

// Email sending wrapper with error handling and logging
export async function sendEmailSafe(config: EmailConfig, context?: string) {
  try {
    const result = await sendEmail(config)
    console.log(`Email sent successfully${context ? ` (${context})` : ''}:`, {
      to: config.to,
      subject: config.subject
    })
    return result
  } catch (error) {
    console.error(`Failed to send email${context ? ` (${context})` : ''}:`, {
      to: config.to,
      subject: config.subject,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    // Don't throw error to prevent breaking the main flow
    return { success: false, error }
  }
}

