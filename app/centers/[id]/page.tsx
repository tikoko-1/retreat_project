import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StickyPricingBar from '@/components/StickyPricingBar'
import HeroSection from '@/components/HeroSection'
import LocationSection from '@/components/LocationSection'
import GallerySection from '@/components/GallerySection'
import FeaturesSection from '@/components/FeaturesSection'
import RoomsSection from '@/components/RoomsSection'
import FoodSection from '@/components/FoodSection'
import IncludedSection from '@/components/IncludedSection'
import CancellationSection from '@/components/CancellationSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import CallToActionSection from '@/components/CallToActionSection'
import { heroImages, allGalleryImages } from '@/components/constants/images'
import { useState } from 'react'

interface RetreatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: RetreatPageProps) {
  // In a real app, you would fetch retreat data here
  return {
    title: `Retreat Center - ${params.id}`,
    description: 'Premium retreat center for yoga teachers and wellness professionals.',
  }
}

export default function RetreatPage({ params }: RetreatPageProps) {
  // In a real app, you would validate the retreat exists
  // const retreat = await getRetreat(params.id)
  // if (!retreat) {
  //   notFound()
  // }
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <StickyPricingBar />
      <HeroSection 
        heroImages={heroImages}
      />
      <LocationSection />
      <GallerySection galleryImages={allGalleryImages} />
      <FeaturesSection />
      <RoomsSection />
      <FoodSection />
      <IncludedSection />
      <CancellationSection />
      <TestimonialsSection />
      <CallToActionSection />
      <Footer />
    </div>
  )
}