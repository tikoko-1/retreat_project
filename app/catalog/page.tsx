import { Suspense } from 'react'
import CatalogClientPage from './CatalogClientPage'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Mock data that would normally come from a database/API
const mockRetreatCenters = [
  {
    id: '1',
    name: 'Serenity Hills Retreat',
    location: 'Ubud, Indonesia',
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
  },
  {
    id: '2',
    name: 'Mountain View Sanctuary',
    location: 'Rishikesh, India',
    image: 'https://images.unsplash.com/photo-1646239646963-b0b9be56d6b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMG1pbmltYWwlMjB5b2dhJTIwc3BhY2V8ZW58MXx8fHwxNzU1Njk3OTYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 89,
    capacity: 35,
    priceRange: '$120-250',
    amenities: ['meditation-hall', 'yoga-hall', 'nature-trails', 'spa-massage'],
    highlights: ['River Views', 'Traditional'],
    bedrooms: 12,
    bathrooms: 8,
  },
  {
    id: '3',
    name: 'Ocean Bliss Retreat',
    location: 'Tulum, Mexico',
    image: 'https://images.unsplash.com/photo-1670589953903-b4e2f17a70a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwb29sJTIwbWluaW1hbCUyMGRlc2lnbnxlbnwxfHx8fDE3NTU2OTc5NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviewCount: 156,
    capacity: 20,
    priceRange: '$250-450',
    amenities: ['pool-heated', 'yoga-hall', 'beach-access', 'nature-trails'],
    highlights: ['Beachfront', 'Cenote Access'],
    bedrooms: 6,
    bathrooms: 4,
    isNew: true,
  },
  // Add more mock data as needed...
]

// This runs on the server and provides initial data
export default async function CatalogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // In a real app, you would fetch data here based on searchParams
  // For now, we'll pass the mock data
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Suspense fallback={<CatalogSkeleton />}>
        <CatalogClientPage 
          initialRetreatCenters={mockRetreatCenters}
          initialSearchParams={searchParams}
        />
      </Suspense>
      <Footer />
    </div>
  )
}

// Loading skeleton component
function CatalogSkeleton() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <div className="h-16 bg-gray-200 rounded animate-pulse mb-4"></div>
          </div>
          <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </section>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="py-6 border-b border-gray-50">
          <div className="flex items-center justify-between mb-3">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-44 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        
        <section className="py-8">
          <div className="grid grid-cols-1 min-[700px]:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-96 animate-pulse"></div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}