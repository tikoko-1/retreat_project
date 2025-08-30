'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Users, Calendar, CheckCircle, Clock, Shield, Globe, Star, TrendingUp, Heart, ArrowRight, Award, Zap, Target, Eye, DollarSign, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import SearchFilters, { FilterState } from "./SearchFilters";
import RetreatCenterCard, { RetreatCenter } from "./RetreatCenterCard";
import Link from "next/link";

// Extended featured venues data - 20 venues for 2-column grid
const featuredVenues: RetreatCenter[] = [
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
    name: 'Alpine Wellness Lodge',
    location: 'Chamonix, France',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHBpbmUlMjBsb2RnZSUyMG1vdW50YWlufGVufDF8fHx8MTc1NTg3ODI1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 89,
    capacity: 30,
    priceRange: '$350-650',
    amenities: ['spa-massage', 'fitness-gym', 'heating-system', 'yoga-hall'],
    highlights: ['Mountain Views', 'Luxury Spa'],
    bedrooms: 10,
    bathrooms: 8,
    isVerified: true,
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
    name: 'Sacred Valley Sanctuary',
    location: 'Ollantaytambo, Peru',
    image: 'https://images.unsplash.com/photo-1541256721793-d652dbe1fce2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJ1JTIwc2FjcmVkJTIwdmFsbGV5fGVufDF8fHx8MTc1NTg3ODI1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviewCount: 98,
    capacity: 18,
    priceRange: '$200-380',
    amenities: ['meditation-hall', 'nature-trails', 'yoga-hall', 'therapy-rooms'],
    highlights: ['Ancient Energy', 'Sacred Sites'],
    bedrooms: 5,
    bathrooms: 3,
    isVerified: true,
  },
  {
    id: '5',
    name: 'Mindful Mountain Retreat',
    location: 'Rishikesh, India',
    image: 'https://images.unsplash.com/photo-1579531403068-8d6fd2b3f45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMGxhbmRzY2FwZSUyMG1vdW50YWlucyUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTU4NzgyMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 203,
    capacity: 24,
    priceRange: '$120-250',
    amenities: ['yoga-hall', 'meditation-hall', 'nature-trails', 'tea-ceremony'],
    highlights: ['Ganges Views', 'Authentic Ashram'],
    bedrooms: 7,
    bathrooms: 5,
    isVerified: true,
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
];

// 9 Regions data with beautiful landscape images
const regions = [
  {
    id: 'europe',
    name: 'Europe',
    image: 'https://images.unsplash.com/photo-1665212095162-08a89b567021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldXJvcGUlMjBsYW5kc2NhcGUlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzU1ODc2OTA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    venueCount: 185,
  },
  {
    id: 'asia',
    name: 'Asia',
    image: 'https://images.unsplash.com/photo-1592758205417-03c52fd3229e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhJTIwYmFsaSUyMHRlbXBsZXxlbnwxfHx8fDE3NTU4NzY5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    venueCount: 148,
  },
  {
    id: 'north-america',
    name: 'North America',
    image: 'https://images.unsplash.com/photo-1516141535911-e3b982713e61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aCUyMGFtZXJpY2ElMjBuYXR1cmUlMjBmb3Jlc3R8ZW58MXx8fHwxNzU1ODc2OTEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    venueCount: 94,
  },
  {
    id: 'south-america',
    name: 'South America',
    image: 'https://images.unsplash.com/photo-1718620086079-c567f5e90583?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3V0aCUyMGFtZXJpY2ElMjBsYW5kc2NhcGUlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzU1ODc4MjE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    venueCount: 72,
  },
  {
    id: 'central-america',
    name: 'Central America',
    image: 'https://images.unsplash.com/photo-1711885751606-5108ca9ac91b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZW50cmFsJTIwYW1lcmljYSUyMGxhbmRzY2FwZSUyMHRyb3BpY2FsfGVufDF8fHx8MTc1NTg3ODIyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    venueCount: 38,
  },
  {
    id: 'africa',
    name: 'Africa',
    image: 'https://images.unsplash.com/photo-1553683700-cb04c63e144a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2ElMjBzYWZhcmklMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU1ODc2OTExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    venueCount: 26,
  },
  {
    id: 'oceania',
    name: 'Oceania',
    image: 'https://images.unsplash.com/photo-1543539409-f5828ed17c2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbmlhJTIwYXVzdHJhbGlhJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc1NTg3ODIyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    venueCount: 34,
  },
  {
    id: 'middle-east',
    name: 'Middle East',
    image: 'https://images.unsplash.com/photo-1679263475972-476e62a54f5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBlYXN0JTIwZGVzZXJ0JTIwbGFuZHNjYXBlfGVufDF8fHx8MTc1NTg3ODIyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    venueCount: 19,
  },
  {
    id: 'india',
    name: 'India',
    image: 'https://images.unsplash.com/photo-1579531403068-8d6fd2b3f45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMGxhbmRzY2FwZSUyMG1vdW50YWlucyUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTU4NzgyMzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    venueCount: 87,
  },
];

// Popular countries data with venue counts
const popularCountries = [
  { name: 'Indonesia', count: 87 },
  { name: 'India', count: 62 },
  { name: 'Mexico', count: 45 },
  { name: 'United States', count: 94 },
  { name: 'Costa Rica', count: 38 },
  { name: 'Australia', count: 34 },
  { name: 'Peru', count: 28 },
  { name: 'Portugal', count: 42 },
  { name: 'Thailand', count: 55 },
  { name: 'Greece', count: 33 },
  { name: 'France', count: 51 },
  { name: 'Italy', count: 47 },
  { name: 'Spain', count: 39 },
  { name: 'Morocco', count: 19 },
  { name: 'Guatemala', count: 16 },
  { name: 'Nepal', count: 23 },
  { name: 'Sri Lanka', count: 18 },
  { name: 'Japan', count: 29 },
  { name: 'Brazil', count: 31 },
  { name: 'Canada', count: 26 }
];

// Blog posts for Resources section (6 posts in 2 rows of 3)
const blogPosts = [
  {
    id: '1',
    title: 'The Complete Guide to Planning Your First Yoga Retreat',
    excerpt: 'Everything you need to know about organizing a successful yoga retreat.',
    image: 'https://images.unsplash.com/photo-1529693662653-9d480530a697?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwcmV0cmVhdCUyMHdlbGxuZXNzJTIwYmxvZ3xlbnwxfHx8fDE3NTU4NzY5MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Planning',
    author: 'Sarah Chen',
    readTime: '8 min read',
  },
  {
    id: '2',
    title: '5 Essential Meditation Techniques for Deeper Experiences',
    excerpt: 'Discover powerful meditation practices for your retreat offerings.',
    image: 'https://images.unsplash.com/photo-1626991561417-bd18407656fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5kZnVsbmVzcyUyMG1lZGl0YXRpb24lMjBndWlkZXxlbnwxfHx8fDE3NTU4NzgyMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Teaching',
    author: 'Marcus Rodriguez',
    readTime: '6 min read',
  },
  {
    id: '3',
    title: 'Building Community: Creating Meaningful Connections',
    excerpt: 'Learn the art of fostering deep connections at retreats.',
    image: 'https://images.unsplash.com/photo-1673334562088-ad76500431ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRyZWF0JTIwbGVhZGVyJTIwY29tbXVuaXR5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzU1ODc4MjQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Community',
    author: 'Elena Kowalski',
    readTime: '5 min read',
  },
  {
    id: '4',
    title: 'Teaching Yoga: Essential Tips for New Instructors',
    excerpt: 'Master the fundamentals of yoga instruction and student engagement.',
    image: 'https://images.unsplash.com/photo-1652347141247-5788de175766?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwdGVhY2hlciUyMHRyYWluaW5nJTIwdGlwc3xlbnwxfHx8fDE3NTU4NzgyNDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Teaching',
    author: 'David Park',
    readTime: '7 min read',
  },
  {
    id: '5',
    title: 'Retreat Planning Checklist: 90 Days to Success',
    excerpt: 'A comprehensive timeline and checklist for flawless retreat planning.',
    image: 'https://images.unsplash.com/photo-1654931799020-ce7cf3f4a2c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRyZWF0JTIwcGxhbm5pbmclMjBjaGVja2xpc3R8ZW58MXx8fHwxNzU1ODc4MjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Planning',
    author: 'Aria Patel',
    readTime: '10 min read',
  },
  {
    id: '6',
    title: 'Marketing Your Wellness Business: Digital Strategies',
    excerpt: 'Proven digital marketing strategies to grow your wellness business.',
    image: 'https://images.unsplash.com/photo-1627808869239-e68ec6e9b63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMGJ1c2luZXNzJTIwbWFya2V0aW5nfGVufDF8fHx8MTc1NTg3ODI1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Business',
    author: 'James Wilson',
    readTime: '9 min read',
  },
];

export default function HomePage() {
  const router = useRouter();
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

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '' && !(Array.isArray(value) && value.length === 0)) {
        if (Array.isArray(value)) {
          value.forEach(v => params.append(key, v));
        } else {
          params.set(key, value.toString());
        }
      }
    });

    const queryString = params.toString();
    const catalogUrl = queryString ? `/catalog?${queryString}` : '/catalog';
    router.push(catalogUrl);
  };

  const handleRegionClick = (regionId: string) => {
    const searchTerm = regionId.replace('-', ' ');
    router.push(`/catalog?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleCountryClick = (country: string) => {
    router.push(`/catalog?search=${encodeURIComponent(country)}`);
  };

  const handleSelectRetreat = (id: string) => {
    router.push(`/retreat/${id}`);
  };

  const handleNavigateToHostPortal = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative py-16 lg:py-24 min-h-[40vh] flex items-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1571268493589-ec822cf5206c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNvcnQlMjB0cm9waWNhbCUyMHN1bnNldCUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTU5NDY2MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Luxury Resort Background"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="text-center mb-12">
            {/* Large bold headline */}
            <h1 className="text-5xl lg:text-7xl tracking-tight font-extralight text-white mb-6">
              500+ Verified Retreat Venues
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-white mb-12 max-w-4xl mx-auto leading-relaxed">
              From Bali to Costa Rica — trusted retreat venues worldwide.
            </p>
            
            {/* Search bar directly below headline */}
            <div className="flex justify-center mb-12">
              <div className="w-full max-w-4xl">
                <SearchFilters 
                  filters={filters}
                  onFiltersChange={setFilters}
                  resultCount={508}
                  onSearch={handleSearch}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXPLORE BY REGION - 9 regions in 3x3 grid - Refined Airbnb style */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl tracking-tight font-light text-gray-900 mb-4">
              Explore by Region
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover amazing retreat destinations across nine diverse regions worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 gap-4">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => handleRegionClick(region.id)}
                className="group relative overflow-hidden rounded-lg aspect-video transition-all duration-300 hover:scale-[1.02]"
              >
                <ImageWithFallback
                  src={region.image}
                  alt={region.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                
                {/* Content positioned at bottom center */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <h3 className="text-xl lg:text-2xl font-normal text-white mb-1">{region.name}</h3>
                  <p className="text-white/75 text-sm font-normal">{region.venueCount} venues</p>
                </div>
                
                {/* Centered "Explore" text on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer hover:bg-black/90 hover:text-white transition-all duration-200">
                    <span className="text-sm font-normal">Explore</span>
                    <ArrowRight className="w-4 h-4 transform translate-x-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. POPULAR COUNTRIES - Tag-based layout */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl tracking-tight font-light text-gray-900 mb-4">
              Popular Countries
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Browse our most sought-after retreat destinations with verified venues
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {popularCountries.map((country) => (
                <button
                  key={country.name}
                  onClick={() => handleCountryClick(country.name)}
                  className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                >
                  <span>{country.name}</span>
                  <span className="text-gray-500 text-xs">{country.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED VENUES - 6 venues in 2-column grid using RetreatCenterCard */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl tracking-tight font-light text-gray-900 mb-4">
              Featured Venues
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Curated collection of the world's finest retreat destinations
            </p>
          </div>
          
          <div className="grid grid-cols-1 min-[680px]:grid-cols-2 gap-6 mb-12">
            {featuredVenues.map((venue) => (
              <RetreatCenterCard
                key={venue.id}
                retreat={venue}
                onSelect={handleSelectRetreat}
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/catalog"
              className="bg-gray-900 text-white px-10 py-4 rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center gap-2 font-medium"
            >
              <span>View All Centers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. BUSINESS FEATURES - 3 columns */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl tracking-tight font-light text-gray-900 mb-4">
              Built for Retreat Leaders
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to find, book, and manage your perfect retreat venue
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Advanced Search
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Filter by capacity, amenities, location, and price to find venues that perfectly match your retreat vision.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Verified Venues
              </h3>
              <p className="text-gray-600 leading-relaxed">
                All venues are personally vetted by our team to ensure quality, safety, and authenticity for your participants.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Expert Support
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get personalized assistance from our retreat planning experts throughout your booking and planning process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. RESOURCES SECTION - Blog posts */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl tracking-tight font-light text-gray-900 mb-4">
              Expert Resources
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Insights and guides to help you create transformational retreat experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group block bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-md border border-gray-100">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-black transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <p className="text-xs font-medium text-gray-700">
                    By {post.author}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/blog"
              className="bg-white border border-gray-300 text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center gap-2 font-medium"
            >
              <span>View All Resources</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CTA SECTION - Join Platform */}
      <section className="py-16 lg:py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl lg:text-5xl tracking-tight font-light mb-6">
            Ready to List Your Retreat Center?
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
            Join thousands of retreat centers worldwide and connect with passionate retreat leaders.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={handleNavigateToHostPortal}
              className="bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold flex items-center gap-2"
            >
              <span>Start Listing</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <Link
              href="/guides"
              className="text-white/80 hover:text-white underline underline-offset-4 transition-colors font-medium"
            >
              Learn How It Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}