import { useState } from "react";
import SearchFilters, { FilterState } from "./SearchFilters";
import ActiveFilters from "./ActiveFilters";
import RetreatCenterCard, { RetreatCenter } from "./RetreatCenterCard";
import { MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface CatalogPageProps {
  onSelectRetreat: (id: string) => void;
}

// Mock data - in real app this would come from API  
const mockRetreatCenters: RetreatCenter[] = [
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
  {
    id: '4',
    name: 'Desert Oasis Center',
    location: 'Sedona, United States',
    image: 'https://images.unsplash.com/photo-1720087448033-db1904db294b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdoaXRlJTIwYmVkcm9vbSUyMG1pbmltYWx8ZW58MXx8fHwxNzU1Njk3OTczfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    reviewCount: 92,
    capacity: 30,
    priceRange: '$200-380',
    amenities: ['meditation-hall', 'professional-av', 'spa-massage', 'nature-trails'],
    highlights: ['Red Rocks', 'Vortex Energy'],
    bedrooms: 10,
    bathrooms: 7,
  },
  {
    id: '5',
    name: 'Rainforest Haven',
    location: 'Nosara, Costa Rica',
    image: 'https://images.unsplash.com/photo-1613645695125-0c87bb48e9e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwdGVycmFjZSUyMGNsZWFuJTIwbGluZXN8ZW58MXx8fHwxNzU1Njk3OTc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 134,
    capacity: 40,
    priceRange: '$150-300',
    amenities: ['pool-heated', 'yoga-hall', 'nature-trails', 'commercial-kitchen'],
    highlights: ['Eco-Friendly', 'Wildlife'],
    bedrooms: 14,
    bathrooms: 10,
  },
  {
    id: '6',
    name: 'Coastal Zen Retreat',
    location: 'Byron Bay, Australia',
    image: 'https://images.unsplash.com/photo-1622015663319-e97e697503ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMG1pbmltYWwlMjBsb3VuZ2V8ZW58MXx8fHwxNzU1Njk3OTgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviewCount: 78,
    capacity: 18,
    priceRange: '$280-520',
    amenities: ['pool-heated', 'yoga-hall', 'fitness-gym', 'professional-av'],
    highlights: ['Boutique', 'Surf Nearby'],
    bedrooms: 6,
    bathrooms: 4,
  },
  {
    id: '7',
    name: 'Sacred Valley Lodge',
    location: 'Sacred Valley, Peru',
    image: 'https://images.unsplash.com/photo-1609850280339-b85f1fd5d351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcm9vbSUyMG1pbmltYWx8ZW58MXx8fHwxNzU1Njk4MjI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviewCount: 64,
    capacity: 22,
    priceRange: '$140-280',
    amenities: ['meditation-hall', 'spa-massage', 'nature-trails', 'high-speed-wifi'],
    highlights: ['Ancient Energy', 'Mountain Views'],
    bedrooms: 7,
    bathrooms: 5,
    isVerified: true,
  },
  {
    id: '8',
    name: 'Forest Sanctuary',
    location: 'Sintra, Portugal',
    image: 'https://images.unsplash.com/photo-1682278763092-a16f9a5e484d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6ZW4lMjBnYXJkZW4lMjBtaW5pbWFsfGVufDF8fHx8MTc1NTY5ODIyOXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 95,
    capacity: 28,
    priceRange: '$160-320',
    amenities: ['yoga-hall', 'meditation-hall', 'nature-trails', 'commercial-kitchen'],
    highlights: ['Fairy Tale Setting', 'Ancient Forest'],
    bedrooms: 9,
    bathrooms: 6,
    isNew: true,
  },
  {
    id: '9',
    name: 'Lake Atitlan Retreat',
    location: 'San Marcos, Guatemala',
    image: 'https://images.unsplash.com/photo-1725940889761-35d90aead72d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwc3BhJTIwYmF0aHJvb218ZW58MXx8fHwxNzU1Njk4MjMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    reviewCount: 73,
    capacity: 16,
    priceRange: '$110-220',
    amenities: ['yoga-hall', 'meditation-hall', 'spa-massage', 'nature-trails'],
    highlights: ['Lake Views', 'Mayan Culture'],
    bedrooms: 5,
    bathrooms: 3,
  },
  // Additional 16 retreats to reach 25 total
  {
    id: '10',
    name: 'Alpine Wellness Lodge',
    location: 'Chamonix, France',
    image: 'https://images.unsplash.com/photo-1523138107646-53619d5f5ce3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMGtpdGNoZW4lMjBkaW5pbmclMjBtaW5pbWFsfGVufDF8fHx8MTc1NTY5ODIzNnww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 112,
    capacity: 32,
    priceRange: '$220-400',
    amenities: ['yoga-hall', 'spa-massage', 'fitness-gym', 'heating-system'],
    highlights: ['Mountain Views', 'Ski Access'],
    bedrooms: 11,
    bathrooms: 8,
  },
  {
    id: '11',
    name: 'Tropical Paradise Resort',
    location: 'Koh Samui, Thailand',
    image: 'https://images.unsplash.com/photo-1703783028657-5905a1662aa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwdGVycmFjZSUyMG1vZGVybnxlbnwxfHx8fDE3NTU2OTgyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviewCount: 89,
    capacity: 24,
    priceRange: '$190-350',
    amenities: ['pool-infinity', 'beach-access', 'spa-massage', 'yoga-hall'],
    highlights: ['Beachfront', 'Infinity Pool'],
    bedrooms: 8,
    bathrooms: 6,
    isVerified: true,
  },
  {
    id: '12',
    name: 'Desert Rose Sanctuary',
    location: 'Marrakech, Morocco',
    image: 'https://images.unsplash.com/photo-1514593214839-ce1849100055?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwcmVhZGluZyUyMHJvb20lMjBtaW5pbWFsfGVufDF8fHx8MTc1NTY5ODI0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    reviewCount: 76,
    capacity: 18,
    priceRange: '$130-280',
    amenities: ['meditation-hall', 'nature-trails', 'professional-av', 'air-conditioning'],
    highlights: ['Desert Views', 'Traditional Riad'],
    bedrooms: 6,
    bathrooms: 4,
  },
  {
    id: '13',
    name: 'Coastal Cliffs Retreat',
    location: 'Big Sur, United States',
    image: 'https://images.unsplash.com/photo-1695809584828-1ee251170805?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNlcHRpb24lMjBsb2JieSUyMG1pbmltYWx8ZW58MXx8fHwxNzU1Njk4MjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviewCount: 143,
    capacity: 26,
    priceRange: '$280-520',
    amenities: ['yoga-hall', 'hot-tub', 'nature-trails', 'professional-av'],
    highlights: ['Ocean Views', 'Redwood Forest'],
    bedrooms: 9,
    bathrooms: 7,
    isNew: true,
  },
  {
    id: '14',
    name: 'Himalayan Heights Lodge',
    location: 'Pokhara, Nepal',
    image: 'https://images.unsplash.com/photo-1612073584622-335da5fadd8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBmaXRuZXNzJTIwbWluaW1hbHxlbnwxfHx8fDE3NTU2OTgyNDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviewCount: 67,
    capacity: 20,
    priceRange: '$100-200',
    amenities: ['meditation-hall', 'yoga-hall', 'nature-trails', 'heating-system'],
    highlights: ['Mountain Views', 'Trekking Base'],
    bedrooms: 7,
    bathrooms: 5,
  },
  {
    id: '15',
    name: 'Mediterranean Villa Retreat',
    location: 'Mykonos, Greece',
    image: 'https://images.unsplash.com/photo-1665150200731-fecf2b2b4160?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxjb255JTIwdmlldyUyMG1vZGVybnxlbnwxfHx8fDE3NTU2OTgyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 98,
    capacity: 22,
    priceRange: '$350-650',
    amenities: ['pool-infinity', 'yoga-hall', 'high-speed-wifi', 'air-conditioning'],
    highlights: ['Aegean Views', 'Luxury Villa'],
    bedrooms: 8,
    bathrooms: 6,
    isVerified: true,
  },
  {
    id: '16',
    name: 'Bamboo Forest Retreat',
    location: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1562672753-989b09b0939b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwcG9vbCUyMGRlY2t8ZW58MXx8fHwxNzU1Njk4MjU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviewCount: 124,
    capacity: 16,
    priceRange: '$200-380',
    amenities: ['meditation-hall', 'tea-ceremony', 'nature-trails', 'heating-system'],
    highlights: ['Zen Garden', 'Traditional Ryokan'],
    bedrooms: 5,
    bathrooms: 3,
  },
  {
    id: '17',
    name: 'Patagonia Wilderness Camp',
    location: 'Torres del Paine, Chile',
    image: 'https://images.unsplash.com/photo-1687945727613-a4d06cc41024?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwcm9vbSUyMG1vZGVybnxlbnwxfHx8fDE3NTU2OTgyNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    reviewCount: 54,
    capacity: 14,
    priceRange: '$180-320',
    amenities: ['yoga-hall', 'nature-trails', 'heating-system', 'backup-generator'],
    highlights: ['Glacier Views', 'Adventure Base'],
    bedrooms: 4,
    bathrooms: 3,
  },
  {
    id: '18',
    name: 'Savanna Spirit Lodge',
    location: 'Maasai Mara, Kenya',
    image: 'https://images.unsplash.com/photo-1652961221362-4ea2d7af5b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3VuZ2UlMjBhcmVhJTIwbWluaW1hbHxlbnwxfHx8fDE3NTU2OTgyNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviewCount: 81,
    capacity: 20,
    priceRange: '$250-450',
    amenities: ['yoga-hall', 'nature-trails', 'backup-generator', 'safari-access'],
    highlights: ['Wildlife Views', 'Safari Experience'],
    bedrooms: 6,
    bathrooms: 4,
  },
  {
    id: '19',
    name: 'Northern Lights Sanctuary',
    location: 'Lapland, Finland',
    image: 'https://images.unsplash.com/photo-1743519525325-9ab6ae5882ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwdGVycmFjZSUyMG1pbmltYWx8ZW58MXx8fHwxNzU1Njk4MjY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 92,
    capacity: 18,
    priceRange: '$300-550',
    amenities: ['yoga-hall', 'sauna-steam', 'heating-system', 'aurora-viewing'],
    highlights: ['Northern Lights', 'Glass Igloos'],
    bedrooms: 6,
    bathrooms: 4,
    isNew: true,
  },
  {
    id: '20',
    name: 'Amazon Riverfront Lodge',
    location: 'Iquitos, Peru',
    image: 'https://images.unsplash.com/photo-1668532043381-b242ff52b8a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjBjb3VydHlhcmQlMjBtb2Rlcm58ZW58MXx8fHwxNzU1Njk4MjY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    reviewCount: 48,
    capacity: 16,
    priceRange: '$120-240',
    amenities: ['meditation-hall', 'nature-trails', 'commercial-kitchen', 'water-filtration'],
    highlights: ['Rainforest', 'River Views'],
    bedrooms: 5,
    bathrooms: 3,
  },
  {
    id: '21',
    name: 'Swiss Alpine Wellness',
    location: 'Zermatt, Switzerland',
    image: 'https://images.unsplash.com/photo-1661514840916-5aad01b6290d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyYW5jZSUyMGhhbGx3YXklMjBtb2Rlcm58ZW58MXx8fHwxNzU1Njk4MjcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviewCount: 156,
    capacity: 30,
    priceRange: '$400-750',
    amenities: ['spa-massage', 'yoga-hall', 'fitness-gym', 'heating-system'],
    highlights: ['Matterhorn Views', 'Luxury Spa'],
    bedrooms: 10,
    bathrooms: 8,
    isVerified: true,
  },
  {
    id: '22',
    name: 'Caribbean Beach Villa',
    location: 'Barbados',
    image: 'https://images.unsplash.com/photo-1630449255710-fee6f188bad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwbW9kZXJuJTIwYXJjaGl0ZWN0dXJlJTIwd2hpdGV8ZW58MXx8fHwxNzU1Njk3OTU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviewCount: 87,
    capacity: 24,
    priceRange: '$280-480',
    amenities: ['pool-heated', 'beach-access', 'yoga-hall', 'air-conditioning'],
    highlights: ['Private Beach', 'Coral Reef'],
    bedrooms: 8,
    bathrooms: 6,
  },
  {
    id: '23',
    name: 'Tuscany Vineyard Retreat',
    location: 'Chianti, Italy',
    image: 'https://images.unsplash.com/photo-1646239646963-b0b9be56d6b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMG1pbmltYWwlMjB5b2dhJTIwc3BhY2V8ZW58MXx8fHwxNzU1Njk3OTYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 134,
    capacity: 28,
    priceRange: '$250-450',
    amenities: ['yoga-hall', 'wine-tasting', 'cooking-classes', 'nature-trails'],
    highlights: ['Vineyard Views', 'Wine Cellar'],
    bedrooms: 9,
    bathrooms: 7,
  },
  {
    id: '24',
    name: 'Australian Outback Lodge',
    location: 'Uluru, Australia',
    image: 'https://images.unsplash.com/photo-1670589953903-b4e2f17a70a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwb29sJTIwbWluaW1hbCUyMGRlc2lnbnxlbnwxfHx8fDE3NTU2OTc5NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    reviewCount: 73,
    capacity: 22,
    priceRange: '$200-380',
    amenities: ['yoga-hall', 'nature-trails', 'backup-generator', 'star-gazing'],
    highlights: ['Desert Views', 'Sacred Sites'],
    bedrooms: 7,
    bathrooms: 5,
  },
  {
    id: '25',
    name: 'Canadian Rockies Retreat',
    location: 'Banff, Canada',
    image: 'https://images.unsplash.com/photo-1720087448033-db1904db294b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdoaXRlJTIwYmVkcm9vbSUyMG1pbmltYWx8ZW58MXx8fHwxNzU1Njk3OTczfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviewCount: 165,
    capacity: 32,
    priceRange: '$300-550',
    amenities: ['yoga-hall', 'spa-massage', 'fitness-gym', 'heating-system'],
    highlights: ['Mountain Lakes', 'Glacier Views'],
    bedrooms: 11,
    bathrooms: 8,
    isVerified: true,
  },
];

export default function CatalogPage({ onSelectRetreat }: CatalogPageProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    guests: '',
    priceRange: '',
    sortBy: 'relevance',
    amenities: [],
    area: [100, 10000],
    bedrooms: '',
    bathrooms: '',
    venueTypes: [],
    foodOptions: [],
    cancellationPolicy: '',
    hasReviews: false,
    topRated: false,
  });

  // Pagination state
  const [displayedCount, setDisplayedCount] = useState(9);

  // Helper function to update filters
  function updateFilters(updates: Partial<FilterState>) {
    setFilters({ ...filters, ...updates });
    // Reset pagination when filters change
    if (Object.keys(updates).some(key => key !== 'sortBy')) {
      setDisplayedCount(9);
    }
  }

  // Filter logic
  const filteredCenters = mockRetreatCenters.filter(center => {
    // Search filter - matches name, location, highlights
    const matchesSearch = !filters.search || 
      center.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      center.location.toLowerCase().includes(filters.search.toLowerCase()) ||
      center.highlights.some(h => h.toLowerCase().includes(filters.search.toLowerCase()));
    
    // Guest capacity filter
    let matchesGuests = true;
    if (filters.guests) {
      const [min, max] = filters.guests.includes('+') 
        ? [parseInt(filters.guests.replace('+', '')), Infinity]
        : filters.guests.split('-').map(n => parseInt(n));
      matchesGuests = center.capacity >= min && (max === Infinity || center.capacity <= max);
    }
    
    // Price range filter - Updated for new ranges
    let matchesPrice = true;
    if (filters.priceRange) {
      const centerPriceMin = parseInt(center.priceRange.split('-')[0].replace('$', ''));
      const centerPriceMax = parseInt(center.priceRange.split('-')[1].replace('$', ''));
      
      if (filters.priceRange === '0-100') {
        matchesPrice = centerPriceMin >= 0 && centerPriceMax <= 100;
      } else if (filters.priceRange === '100-300') {
        matchesPrice = centerPriceMin >= 100 && centerPriceMax <= 300;
      } else if (filters.priceRange === '300-600') {
        matchesPrice = centerPriceMin >= 300 && centerPriceMax <= 600;
      } else if (filters.priceRange === '600-1000') {
        matchesPrice = centerPriceMin >= 600 && centerPriceMax <= 1000;
      } else if (filters.priceRange === '1000+') {
        matchesPrice = centerPriceMin >= 1000;
      }
    }
    
    // Amenities filter - center must have ALL selected amenities
    const matchesAmenities = filters.amenities.length === 0 || 
      filters.amenities.every(amenity => center.amenities.includes(amenity));

    return matchesSearch && matchesGuests && matchesPrice && matchesAmenities;
  });

  // Sort results
  const sortedCenters = [...filteredCenters].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return parseInt(a.priceRange.split('-')[0].replace('$', '')) - parseInt(b.priceRange.split('-')[0].replace('$', ''));
      case 'price-high':
        return parseInt(b.priceRange.split('-')[0].replace('$', '')) - parseInt(a.priceRange.split('-')[0].replace('$', ''));
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
        return b.reviewCount - a.reviewCount;
      default:
        return 0; // relevance - keep original order
    }
  });

  // Get displayed centers (for pagination)
  const displayedCenters = sortedCenters.slice(0, displayedCount);
  const hasMoreResults = displayedCount < sortedCenters.length;

  // Handle load more
  const handleLoadMore = () => {
    setDisplayedCount(prev => prev + 20);
  };

  const EmptyState = () => (
    <div className="text-center py-24">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <MapPin className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold mb-4">No venues match your filters.</h3>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Try adjusting your search criteria to discover more retreat centers.
        </p>
        <button 
          onClick={() => setFilters({
            search: '',
            guests: '',
            priceRange: '',
            sortBy: 'relevance',
            amenities: [],
            area: [100, 10000],
            bedrooms: '',
            bathrooms: '',
            venueTypes: [],
            foodOptions: [],
            cancellationPolicy: '',
            hasReviews: false,
            topRated: false,
          })}
          className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium"
        >
          Reset filters
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Header with Search - Don't touch header */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Clean Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl lg:text-7xl tracking-tight font-extralight text-gray-900 mb-0">
              The World’s Finest Retreat Centers
            </h1>
          </div>
          
          {/* Filter Bar */}
          <div className="flex justify-center">
            <SearchFilters 
              filters={filters}
              onFiltersChange={setFilters}
              resultCount={sortedCenters.length}
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Results Header - Clean Apple Style */}
        <div className="py-6 border-b border-gray-50">
          {/* Top row with results count and fixed Sort By */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-lg text-gray-900">
              <span className="font-semibold">{sortedCenters.length}</span> venues found
            </p>
            
            {/* Sort By - Always fixed width and right aligned */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-sm text-gray-600 font-medium whitespace-nowrap">Sort by:</span>
              <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value })}>
                <SelectTrigger className="w-44 h-10 bg-white border border-gray-200 rounded-md text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all font-medium flex-shrink-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters row - separate and wrappable */}
          <div className="w-full">
            <ActiveFilters 
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>
        </div>

        {/* Main Results Grid - 2 cards per row */}
        <section className="py-8">
          {sortedCenters.length > 0 ? (
            <>
              <div className="grid grid-cols-1 min-[700px]:grid-cols-2 gap-6">
                {displayedCenters.map((center) => (
                  <RetreatCenterCard 
                    key={center.id}
                    retreat={center}
                    onSelect={onSelectRetreat}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {hasMoreResults && (
                <div className="text-center mt-8">
                  <button
                    onClick={handleLoadMore}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span>Load 20 more</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <EmptyState />
          )}
        </section>
      </div>
    </div>
  );
}