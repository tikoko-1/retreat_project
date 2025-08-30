'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import DashboardOverview from '@/components/dashboard/DashboardOverview'
import RetreatsSection from '@/components/dashboard/RetreatsSection'
import EditRetreatForm from '@/components/dashboard/EditRetreatForm'
import AccommodationSection from '@/components/dashboard/AccommodationSection'
import AmenitiesSection from '@/components/dashboard/AmenitiesSection'
import MediaSection from '@/components/dashboard/MediaSection'
import CalendarSection from '@/components/dashboard/CalendarSection'
import InquiriesSection from '@/components/dashboard/InquiriesSection'
import ReviewsSection from '@/components/dashboard/ReviewsSection'
import SettingsSection from '@/components/dashboard/SettingsSection'

export type DashboardSection = 
  | 'dashboard' 
  | 'my-retreats' 
  | 'edit-retreat'
  | 'accommodation' 
  | 'amenities' 
  | 'media' 
  | 'calendar' 
  | 'inquiries' 
  | 'reviews' 
  | 'settings'

// In a real app, you would check authentication here
export default function Dashboard() {
  const [currentSection, setCurrentSection] = useState<DashboardSection>('dashboard')
  const [editRetreatId, setEditRetreatId] = useState<string | null>(null)

  const handleEditRetreat = (retreatId: string) => {
    setEditRetreatId(retreatId)
    setCurrentSection('edit-retreat')
  }

  const handleBackToRetreats = () => {
    setEditRetreatId(null)
    setCurrentSection('my-retreats')
  }

  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return <DashboardOverview onNavigate={setCurrentSection} />
      case 'my-retreats':
        return <RetreatsSection onEditRetreat={handleEditRetreat} />
      case 'edit-retreat':
        return <EditRetreatForm retreatId={editRetreatId} onBack={handleBackToRetreats} />
      case 'accommodation':
        return <AccommodationSection />
      case 'amenities':
        return <AmenitiesSection />
      case 'media':
        return <MediaSection />
      case 'calendar':
        return <CalendarSection />
      case 'inquiries':
        return <InquiriesSection />
      case 'reviews':
        return <ReviewsSection />
      case 'settings':
        return <SettingsSection />
      default:
        return <DashboardOverview onNavigate={setCurrentSection} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardLayout 
        currentSection={currentSection} 
        onNavigate={setCurrentSection}
      >
        {renderContent()}
      </DashboardLayout>
    </div>
  )
}