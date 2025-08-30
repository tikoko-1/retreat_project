import { NextRequest, NextResponse } from 'next/server'
import { notFound } from 'next/navigation'

// Mock data for a single retreat
const mockRetreatDetail = {
  id: '1',
  name: 'Serenity Hills Retreat',
  location: 'Ubud, Indonesia',
  description: 'A tranquil retreat center nestled in the lush hills of Ubud, perfect for yoga retreats and wellness programs.',
  image: 'https://images.unsplash.com/photo-1630449255710-fee6f188bad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwbW9kZXJuJTIwYXJjaGl0ZWN0dXJlJTIwd2hpdGV8ZW58MXx8fHwxNzU1Njk3OTU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  rating: 4.9,
  reviewCount: 127,
  capacity: 25,
  priceRange: '$180-320',
  amenities: ['yoga-hall', 'pool-heated', 'high-speed-wifi', 'nature-trails'],
  highlights: ['Jungle Views', 'Yoga Hall'],
  bedrooms: 8,
  bathrooms: 6,
  isVerified: true,
  coordinates: {
    lat: -8.5069,
    lng: 115.2625
  },
  host: {
    name: 'Made Sutrisna',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    joinedYear: 2018,
    reviewCount: 127,
    rating: 4.9
  },
  policies: {
    checkIn: '3:00 PM - 10:00 PM',
    checkOut: '11:00 AM',
    cancellation: 'Free cancellation up to 14 days before arrival',
    houseRules: [
      'No smoking inside',
      'No pets allowed',
      'Quiet hours: 10 PM - 7 AM'
    ]
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // In a real app, you would fetch from database
    // const retreat = await db.retreats.findUnique({ where: { id } })
    
    if (id !== '1') {
      return NextResponse.json(
        { error: 'Retreat not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(mockRetreatDetail)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    // In a real app, you would update the database
    // const updatedRetreat = await db.retreats.update({
    //   where: { id },
    //   data: body
    // })

    return NextResponse.json({
      success: true,
      message: 'Retreat updated successfully',
      retreat: { ...mockRetreatDetail, ...body }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // In a real app, you would delete from database
    // await db.retreats.delete({ where: { id } })

    return NextResponse.json({
      success: true,
      message: 'Retreat deleted successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete retreat' },
      { status: 500 }
    )
  }
}