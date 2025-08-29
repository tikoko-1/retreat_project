import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerComponentClient()
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://localhost:3000'

    // Get all published venues
    const { data: venues } = await supabase
      .from('venues')
      .select('slug, updated_at')
      .eq('status', 'published')
      .order('updated_at', { ascending: false })

    // Get all published guides
    const { data: guides } = await supabase
      .from('guides')
      .select('slug, updated_at')
      .eq('is_published', true)
      .order('updated_at', { ascending: false })

    // Get all published blog articles
    const { data: articles } = await supabase
      .from('blog_articles')
      .select('slug, updated_at')
      .eq('is_published', true)
      .order('updated_at', { ascending: false })

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static pages -->
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/centers</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/guides</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/host</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/how</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/faq</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/support</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/terms</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

  <!-- Venue pages -->
${venues?.map(venue => `  <url>
    <loc>${baseUrl}/centers/${venue.slug}</loc>
    <lastmod>${new Date(venue.updated_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n') || ''}

  <!-- Guide pages -->
${guides?.map(guide => `  <url>
    <loc>${baseUrl}/guides/${guide.slug}</loc>
    <lastmod>${new Date(guide.updated_at).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n') || ''}

  <!-- Blog pages -->
${articles?.map(article => `  <url>
    <loc>${baseUrl}/blog/${article.slug}</loc>
    <lastmod>${new Date(article.updated_at).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n') || ''}
</urlset>`

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    })

  } catch (error) {
    console.error('Error generating sitemap:', error)
    return NextResponse.json(
      { error: 'Failed to generate sitemap' },
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
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

