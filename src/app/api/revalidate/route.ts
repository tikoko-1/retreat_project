import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    // Verify the request is authorized (you might want to add a secret token)
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.REVALIDATE_TOKEN
    
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { path, tag, type = 'path' } = body

    if (type === 'path' && path) {
      // Revalidate specific path
      revalidatePath(path)
      console.log(`Revalidated path: ${path}`)
      
      return NextResponse.json({
        success: true,
        message: `Revalidated path: ${path}`,
        timestamp: new Date().toISOString()
      })
    }

    if (type === 'tag' && tag) {
      // Revalidate by tag
      revalidateTag(tag)
      console.log(`Revalidated tag: ${tag}`)
      
      return NextResponse.json({
        success: true,
        message: `Revalidated tag: ${tag}`,
        timestamp: new Date().toISOString()
      })
    }

    // Revalidate common paths if no specific path/tag provided
    const commonPaths = [
      '/',
      '/centers',
      '/guides',
      '/blog'
    ]

    for (const commonPath of commonPaths) {
      revalidatePath(commonPath)
    }

    console.log('Revalidated common paths:', commonPaths)

    return NextResponse.json({
      success: true,
      message: 'Revalidated common paths',
      paths: commonPaths,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error in revalidate API:', error)
    return NextResponse.json(
      { 
        error: 'Failed to revalidate',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Handle preflight OPTIONS request
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

// GET endpoint for manual revalidation (useful for debugging)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const path = searchParams.get('path')
    const tag = searchParams.get('tag')
    const secret = searchParams.get('secret')

    // Simple secret check for GET requests
    if (process.env.REVALIDATE_SECRET && secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      )
    }

    if (path) {
      revalidatePath(path)
      return NextResponse.json({
        success: true,
        message: `Revalidated path: ${path}`,
        timestamp: new Date().toISOString()
      })
    }

    if (tag) {
      revalidateTag(tag)
      return NextResponse.json({
        success: true,
        message: `Revalidated tag: ${tag}`,
        timestamp: new Date().toISOString()
      })
    }

    return NextResponse.json({
      error: 'Missing path or tag parameter',
      usage: {
        path: '/api/revalidate?path=/centers&secret=your_secret',
        tag: '/api/revalidate?tag=venues&secret=your_secret'
      }
    }, { status: 400 })

  } catch (error) {
    console.error('Error in revalidate GET:', error)
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500 }
    )
  }
}

