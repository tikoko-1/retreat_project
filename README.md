# Venue Platform Backend

A comprehensive backend for a venue listing platform built with Next.js 14, Supabase, and TypeScript. This backend provides APIs and server actions for managing venues, inquiries, user authentication, and more.

## Features

- **Authentication & Authorization**: Supabase Auth with custom profiles and role-based access control
- **Venue Management**: Full CRUD operations for venue listings with photos, amenities, and pricing
- **Inquiry System**: Guest inquiries with email notifications and status tracking
- **Search & Filtering**: Advanced venue search with multiple filters and sorting options
- **Rate Limiting**: Built-in rate limiting for API endpoints and critical operations
- **Email Notifications**: Automated emails for inquiries, confirmations, and notifications
- **File Storage**: Supabase Storage integration for photos and media
- **SEO Optimization**: Sitemap generation and meta tag management
- **Admin Panel**: Administrative functions for venue moderation and user management

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Email**: Resend
- **Validation**: Zod
- **TypeScript**: Full type safety
- **Storage**: Supabase Storage

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/369CODE/retreatcenters.git
cd retreatcenters
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Email Service
RESEND_API_KEY=your_resend_api_key

# Application Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Venue Platform"

# Rate Limiting
INQUIRY_RATE_LIMIT_PER_HOUR=10
INQUIRY_RATE_LIMIT_PER_DAY=50
```

4. Set up the database:
   - Run the migration scripts in `supabase_migrations.sql` in your Supabase SQL editor
   - Or use the Supabase CLI to apply migrations

5. Start the development server:
```bash
npm run dev
```

The server will start at `http://localhost:3000`.

## Database Setup

### Running Migrations

1. **Option 1: Supabase Dashboard**
   - Open your Supabase project dashboard
   - Go to the SQL Editor
   - Copy and paste the contents of `supabase_migrations.sql`
   - Run the script

2. **Option 2: Supabase CLI**
   ```bash
   supabase db reset
   supabase db push
   ```

### Storage Buckets

Create the following storage buckets in your Supabase dashboard:
- `venue-photos` (public)
- `avatars` (public)
- `blog-images` (public)

### Initial Admin User

After setting up authentication, create an admin user:
1. Register a user through your application
2. In Supabase dashboard, go to Authentication > Users
3. Find your user and note the UUID
4. In the SQL Editor, run:
```sql
UPDATE profiles SET role = 'admin' WHERE id = 'your-user-uuid';
```

## API Endpoints

### Public Endpoints

- `GET /api/venues/search` - Search and filter venues
- `POST /api/inquiry` - Submit venue inquiry
- `GET /api/sitemap` - Generate sitemap XML

### Authentication Required

Most server actions require authentication. Use Supabase Auth to authenticate users.

### Rate Limiting

The following endpoints have rate limiting:
- Inquiry submission: 10/hour, 50/day per email
- API requests: 100/minute per IP
- File uploads: 20/hour per user

## Server Actions

### Venue Actions (`/app/actions/venue.ts`)

- `createVenue(formData)` - Create new venue
- `updateVenue(id, formData)` - Update venue
- `deleteVenue(id)` - Delete venue
- `searchVenues(params)` - Search venues
- `getVenueBySlug(slug)` - Get venue details
- `updateVenueStatus(id, status)` - Update venue status (admin)

### Inquiry Actions (`/app/actions/inquiry.ts`)

- `createInquiry(formData)` - Submit inquiry
- `updateInquiryStatus(id, status, response)` - Update inquiry
- `getInquiriesForHost(userId)` - Get host inquiries
- `getInquiriesForUser(userId)` - Get user inquiries

## Email Templates

The system includes email templates for:
- Inquiry confirmation (to guest)
- Inquiry notification (to venue owner)
- Welcome email (to new users)

Templates are responsive and include both HTML and plain text versions.

## File Structure

```
src/
├── app/
│   ├── actions/          # Server actions
│   │   ├── inquiry.ts
│   │   └── venue.ts
│   └── api/              # API routes
│       ├── inquiry/
│       ├── venues/
│       ├── sitemap/
│       └── revalidate/
├── lib/
│   ├── supabase.ts       # Supabase client configuration
│   ├── validations.ts    # Zod schemas
│   ├── rate-limit.ts     # Rate limiting utilities
│   └── email.ts          # Email service
├── types/
│   └── database.ts       # TypeScript database types
└── utils/                # Utility functions
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `RESEND_API_KEY` | Resend email service API key | Yes |
| `NEXT_PUBLIC_APP_URL` | Application base URL | Yes |
| `NEXT_PUBLIC_APP_NAME` | Application name | No |
| `INQUIRY_RATE_LIMIT_PER_HOUR` | Inquiry rate limit per hour | No |
| `INQUIRY_RATE_LIMIT_PER_DAY` | Inquiry rate limit per day | No |
| `REVALIDATE_TOKEN` | Token for revalidation API | No |

## Security Features

- **Row Level Security (RLS)**: Database-level security policies
- **Input Validation**: Zod schemas for all inputs
- **Rate Limiting**: Prevents abuse and spam
- **CSRF Protection**: Built-in Next.js CSRF protection
- **Authentication**: Supabase Auth with JWT tokens
- **Authorization**: Role-based access control

## Performance Optimizations

- **Database Indexes**: Optimized for common query patterns
- **Connection Pooling**: Supabase handles connection pooling
- **Caching**: Next.js caching for static content
- **Image Optimization**: Automatic image optimization
- **Query Optimization**: Efficient database queries

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Monitoring and Logging

- Server actions include comprehensive error logging
- Rate limiting events are logged
- Email sending results are logged
- Database errors are captured and logged

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

[Your License Here]

## Support

For support, please contact [your-email@domain.com] or create an issue in the repository.

## Changelog

### v1.0.0
- Initial release
- Venue management system
- Inquiry system with email notifications
- User authentication and authorization
- Search and filtering
- Admin panel
- Rate limiting
- SEO optimization

