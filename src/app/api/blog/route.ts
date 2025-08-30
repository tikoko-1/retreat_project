import { NextRequest, NextResponse } from 'next/server'

// Mock blog data
const mockBlogPosts = [
  {
    id: '1',
    title: 'The Complete Guide to Planning Your First Yoga Retreat',
    slug: 'complete-guide-planning-first-yoga-retreat',
    excerpt: 'Everything you need to know about organizing a successful yoga retreat.',
    content: 'Full blog post content would go here...',
    image: 'https://images.unsplash.com/photo-1529693662653-9d480530a697?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwcmV0cmVhdCUyMHdlbGxuZXNzJTIwYmxvZ3xlbnwxfHx8fDE3NTU4NzY5MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Planning',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9ca4e16?w=150&h=150&fit=crop&crop=face'
    },
    publishedAt: '2024-01-15T10:00:00Z',
    readTime: '8 min read',
  },
  {
    id: '2',
    title: '5 Essential Meditation Techniques for Deeper Experiences',
    slug: '5-essential-meditation-techniques',
    excerpt: 'Discover powerful meditation practices for your retreat offerings.',
    content: 'Full blog post content would go here...',
    image: 'https://images.unsplash.com/photo-1626991561417-bd18407656fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5kZnVsbmVzcyUyMG1lZGl0YXRpb24lMjBndWlkZXxlbnwxfHx8fDE3NTU4NzgyMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Teaching',
    author: {
      name: 'Marcus Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    publishedAt: '2024-01-12T10:00:00Z',
    readTime: '6 min read',
  },
  // Add more mock blog posts...
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  const category = searchParams.get('category')
  const limit = parseInt(searchParams.get('limit') || '10')
  const offset = parseInt(searchParams.get('offset') || '0')
  
  let filteredPosts = mockBlogPosts
  
  if (category) {
    filteredPosts = filteredPosts.filter(post => 
      post.category.toLowerCase() === category.toLowerCase()
    )
  }
  
  const paginatedPosts = filteredPosts.slice(offset, offset + limit)
  
  return NextResponse.json({
    posts: paginatedPosts,
    total: filteredPosts.length,
    hasMore: offset + limit < filteredPosts.length
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // In a real app, you would validate and save to database
    const newPost = {
      id: Math.random().toString(36).substring(7),
      ...body,
      publishedAt: new Date().toISOString()
    }
    
    return NextResponse.json({
      success: true,
      message: 'Blog post created successfully',
      post: newPost
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}